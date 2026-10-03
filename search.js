/* =========================================================
   SEARCH
========================================================= */

function openSearch(){

    $("#searchOverlay")
        .classList.add(
            "open"
        );


    document.body.classList.add(
        "lock"
    );


    setTimeout(
        () => {

            $("#globalSearch")
                .focus();

        },
        70
    );

}


function closeSearch(){

    $("#searchOverlay")
        .classList.remove(
            "open"
        );


    document.body.classList.remove(
        "lock"
    );


    currentSearch =
        "";


    $("#globalSearch")
        .value =
        "";


    $("#searchGrid")
        .innerHTML =
        "";

}


function renderSearch(){

    currentSearch =
        $("#globalSearch")
            .value;


    const q =
        currentSearch
            .trim()
            .toLowerCase();


    if(!q){

        $("#searchGrid")
            .innerHTML =
            "";

        return;

    }


    const results =
        MOTIONS.filter(
            motion =>
                matchesMotionSearch(
                    motion,
                    q
                )
        );


    if(
        !results.length
    ){

        $("#searchGrid")
            .innerHTML = `

                <div
                    style="
                        color:#5a5a63;
                        font-size:12px;
                    "
                >

                    No motions found.

                </div>

            `;

        return;

    }


    $("#searchGrid")
        .innerHTML =
        results
        .map(
            motionCard
        )
        .join("");


    bindCards(
        $("#searchGrid")
    );

}


$("#globalSearch")
    .addEventListener(
        "input",
        renderSearch
    );


searchTags.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest("[data-search-tag]");

        if(!button){
            return;
        }

        applySearchTag(
            button.dataset.searchTag
        );

    }
);


/* =========================================================
   FILTER EVENTS
========================================================= */

filters.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-filter]"
            );


        if(!button){
            return;
        }


        currentCategory =
            button.dataset.filter;


        buildFilters();

        renderCards();

    }
);


categoryButtons.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-category]"
            );


        if(!button){
            return;
        }


        currentCategory =
            button.dataset.category;


        buildFilters();

        renderCards();


        $("#motions")
            .scrollIntoView({
                behavior:"smooth",
                block:"start"
            });

    }
);


/* =========================================================
   AUTO OPEN MORE PAGE AFTER REACHING THE MOTION-CARD SECTION
========================================================= */
let autoMoreTriggered = false;

function maybeOpenMoreAfterScroll(){
    if(autoMoreTriggered || currentRoute !== "home") return;

    const motionSection = $("#motions");
    if(!motionSection) return;

    const sectionBottom = motionSection.offsetTop + motionSection.offsetHeight;
    const viewportBottom = window.scrollY + window.innerHeight;

    if(
        window.scrollY > motionSection.offsetTop + 240 &&
        viewportBottom >= sectionBottom - 50
    ){
        autoMoreTriggered = true;
        window.location.href = YEADI_PAGE_FILES.more;
    }
}

/* =========================================================
   HEADER SCROLL
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 25
        );

        maybeOpenMoreAfterScroll();

    }
);


/* =========================================================
   QUICK MENU
========================================================= */

function toggleQuickMenu(){

    if(!quickMenu){
        return;
    }

    const open =
        quickMenu.classList.toggle("open");

    quickMenu.setAttribute(
        "aria-hidden",
        String(!open)
    );

    const button =
        $("#optionsButton");

    if(button){
        button.setAttribute(
            "aria-expanded",
            String(open)
        );
    }

}

function closeQuickMenu(){

    if(!quickMenu){
        return;
    }

    quickMenu.classList.remove("open");
    quickMenu.setAttribute("aria-hidden","true");

    const button =
        $("#optionsButton");

    if(button){
        button.setAttribute(
            "aria-expanded",
            "false"
        );
    }
}

function quickAction(action){

    closeQuickMenu();

    if(action === "home"){
        goHome();
        return;
    }

    if(action === "motions"){
        goMotions();
        return;
    }

    if(action === "saved"){
        showSaved();
        return;
    }

    if(action === "about"){
        showAbout();
    }
}


/* =========================================================
   REPORT
========================================================= */

function collectReportContext(){

    const motion =
        currentMotionId
            ? getMotion(currentMotionId)
            : null;

    return {
        route:currentRoute,
        path:window.location.pathname,
        url:window.location.href,
        motionId:currentMotionId || null,
        motionTitle:motion ? motion.title : null,
        timestamp:new Date().toISOString(),
        userAgent:navigator.userAgent
    };
}

function openReport(){

    closeQuickMenu();

    if(!reportModal){
        return;
    }

    const ctx = collectReportContext();

    if(reportContext){
        reportContext.textContent =
            `Page: ${ctx.route}${ctx.motionTitle ? ` • Motion: ${ctx.motionTitle}` : ""}`;
    }

    reportModal.classList.add("open");
    reportModal.setAttribute("aria-hidden","false");
    document.body.classList.add("lock");

    setTimeout(() => {
        const input = $("#reportMessage");
        if(input){
            input.focus();
        }
    },70);
}

function closeReport(){

    if(!reportModal){
        return;
    }

    reportModal.classList.remove("open");
    reportModal.setAttribute("aria-hidden","true");

    document.body.classList.remove("lock");
}

async function submitReport(){

    if(!window.yeadiSubmitReport){
        showToast("Firebase report system is not ready.");
        return;
    }

    const message =
        String($("#reportMessage")?.value || "").trim();

    const reason =
        String($("#reportReason")?.value || "Other");

    if(message.length < 5){
        showToast("Please describe the issue first.");
        return;
    }

    if(reportSubmitButton){
        reportSubmitButton.disabled = true;
        reportSubmitButton.textContent = "SENDING...";
    }

    try{

        await window.yeadiSubmitReport({
            reason,
            message,
            context:collectReportContext()
        });

        $("#reportMessage").value = "";
        closeReport();
        showToast("Report sent successfully.");

    }
    catch(error){

        console.error("Report submission failed:",error);
        showToast("Report could not be sent. Check Firebase Firestore.");

    }
    finally{

        if(reportSubmitButton){
            reportSubmitButton.disabled = false;
            reportSubmitButton.textContent = "SEND REPORT";
        }

    }
}

/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if(
            event.key ===
            "Escape"
        ){

            closeSearch();

            closeCodePreview();

        }

    }
);


document.addEventListener("click", event => {

    if(
        quickMenu &&
        !quickMenu.contains(event.target)
    ){
        closeQuickMenu();
    }

});

if(reportModal){
    reportModal.addEventListener("click", event => {
        if(event.target === reportModal){
            closeReport();
        }
    });
}