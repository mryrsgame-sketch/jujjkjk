/* =========================================================
   CARD VIEWPORT LOADING + PREVIEW
========================================================= */

function drawCardPreview(card, motion, now){

    const canvas =
        card.querySelector(".motion-preview-canvas");

    if(!canvas){
        return;
    }

    const ctx =
        canvas.getContext("2d");

    const w =
        canvas.width;

    const h =
        canvas.height;

    const duration =
        Math.max(900, Number(motion.duration || 3000));

    const p =
        (now % duration) /
        duration;

    const t =
        p * Math.PI * 2;

    const color =
        motion.accent ||
        "#58d8ff";

    const grad =
        ctx.createLinearGradient(0,0,w,h);

    grad.addColorStop(0,"#111827");
    grad.addColorStop(.55,"#090c14");
    grad.addColorStop(1,"#160f1d");

    ctx.fillStyle = grad;
    ctx.fillRect(0,0,w,h);

    const cx = w/2;
    const cy = h/2;

    ctx.save();

    ctx.translate(cx,cy);
    ctx.rotate(Math.sin(t*.6)*.08);

    ctx.strokeStyle = color;
    ctx.globalAlpha = .35;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(
        0,0,
        135 + Math.sin(t)*12,
        55 + Math.cos(t)*8,
        0,0,Math.PI*2
    );
    ctx.stroke();

    ctx.rotate(t*.25);

    ctx.globalAlpha = .55;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(-48,-48,96,96);
    ctx.stroke();

    ctx.restore();

    const main =
        motion.defaults?.mainText ||
        motion.title ||
        "MOTION";

    let alpha = .95;
    let scale = 1;
    let x = cx;
    let y = cy;

    const kind =
        motion.kind ||
        "default";

    if(kind === "fade"){
        alpha = .28 + (.72 * (Math.sin(t*.5)+1)/2);
    }

    if(kind === "zoom"){
        scale = .83 + (.22 * (Math.sin(t)+1)/2);
    }

    if(kind === "slide" || kind === "cascade"){
        x += Math.sin(t) * 45;
    }

    if(kind === "pulse"){
        scale = .9 + (.18 * (Math.sin(t*1.8)+1)/2);
        alpha = .55 + (.45 * (Math.sin(t*1.8)+1)/2);
    }

    if(kind === "orbit"){
        x += Math.cos(t) * 30;
        y += Math.sin(t) * 16;
    }

    if(kind === "glitch"){
        x += ((Math.random()-.5) * 8);
        y += ((Math.random()-.5) * 5);
    }

    ctx.save();
    ctx.translate(x,y);
    ctx.scale(scale,scale);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 46px Inter,Arial,sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = alpha;
    ctx.shadowColor = color;
    ctx.shadowBlur = 26;
    ctx.fillText(main,0,-5);

    ctx.font = "800 16px Inter,Arial,sans-serif";
    ctx.fillStyle = color;
    ctx.shadowBlur = 15;
    ctx.fillText(
        motion.defaults?.subtitle ||
        motion.category ||
        "MOTION",
        0,42
    );
    ctx.restore();
}


function startCardPreview(card){

    const motion =
        getMotion(card.dataset.motion);

    if(!motion){
        return;
    }

    stopCardPreview();

    if(
        card.dataset.inViewport !== "true" ||
        document.hidden
    ){
        return;
    }

    card.classList.add("preview-active");

    const start =
        performance.now();

    cardPreview.card =
        card;

    cardPreview.started =
        start;

    function frame(now){

        if(
            cardPreview.card !== card ||
            !card.isConnected ||
            !card.classList.contains("preview-active")
        ){
            return;
        }

        drawCardPreview(
            card,
            motion,
            now - start
        );

        cardPreview.frame =
            requestAnimationFrame(frame);
    }

    cardPreview.frame =
        requestAnimationFrame(frame);
}


function stopCardPreview(){

    if(cardPreview.frame){
        cancelAnimationFrame(cardPreview.frame);
    }

    if(cardPreview.card){
        const canvas =
            cardPreview.card.querySelector(
                ".motion-preview-canvas"
            );

        if(canvas){
            const ctx =
                canvas.getContext("2d");

            ctx.clearRect(
                0,0,canvas.width,canvas.height
            );
        }

        cardPreview.card.classList.remove(
            "preview-active"
        );
    }

    cardPreview = {
        card:null,
        frame:null,
        started:0
    };
}


function observeMotionViewport(container){

    if(
        !container ||
        !("IntersectionObserver" in window)
    ){
        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    const card =
                        entry.target;

                    card.dataset.inViewport =
                        entry.isIntersecting
                            ? "true"
                            : "false";

                    const img =
                        card.querySelector(
                            "img[data-src]"
                        );

                    if(
                        entry.isIntersecting
                    ){

                        if(
                            img &&
                            !img.getAttribute("srcset")
                        ){
                            const src =
                                img.dataset.src;

                            if(src){
                                img.src =
                                    src;
                                img.dataset.loaded =
                                    "true";
                            }
                        }

                    }
                    else{

                        if(
                            cardPreview.card ===
                            card
                        ){
                            stopCardPreview();
                        }

                        if(
                            img &&
                            img.dataset.src
                        ){
                            img.src =
                                EMPTY_PIXEL;
                            delete img.dataset.loaded;
                        }

                    }

                });

            },
            {
                rootMargin:"140px 0px",
                threshold:.01
            }
        );

    container
        .querySelectorAll(".motion-card")
        .forEach(card => {

            observer.observe(card);

            card.dataset.inViewport =
                "false";

        });
}


function renderSaved(){

    const list =
        MOTIONS.filter(
            motion =>
                saved.has(
                    motion.id
                )
        );

    if(savedCount){
        savedCount.textContent =
            `${list.length} SAVED`;
    }

    if(!list.length){

        savedGrid.innerHTML = `
            <div class="saved-empty" style="grid-column:1/-1">
                No saved motions yet. Use the bookmark icon on any motion card.
            </div>
        `;

        return;

    }

    savedGrid.innerHTML =
        list.map(motionCard).join("");

    bindCards(savedGrid);

}


function showSaved(){
    closeSearch();
    stopStudio();

    setHistory("saved");
    activateRoute("saved");
}


/* =========================================================
   FILTERS
========================================================= */

function buildFilters(){

    const categories = [

        "All",

        ...new Set(
            MOTIONS.map(
                motion =>
                    motion.category
            )
        )

    ];


    filters.innerHTML =
        categories.map(
            category => `

                <button
                    class="filter ${
                        currentCategory ===
                        category
                            ? "active"
                            : ""
                    }"
                    data-filter="${
                        escapeHTML(
                            category
                        )
                    }"
                >

                    ${escapeHTML(
                        category
                    )}

                </button>

            `
        )
        .join("");


    categoryButtons.innerHTML =
        categories
        .filter(
            category =>
                category !==
                "All"
        )
        .map(
            category => `

                <button
                    class="filter"
                    data-category="${
                        escapeHTML(
                            category
                        )
                    }"
                >

                    ${escapeHTML(
                        category
                    )}

                </button>

            `
        )
        .join("");

}


function buildSearchTags(){

    if(!searchTags){
        return;
    }

    searchTags.innerHTML = [
        "All",
        ...SEARCH_TAGS
    ]
    .map(tag => `
        <button
            class="search-tag"
            data-search-tag="${escapeHTML(tag)}"
        >
            #${escapeHTML(tag)}
        </button>
    `)
    .join("");

}


function applySearchTag(tag){

    const input = $("#globalSearch");

    if(!input){
        return;
    }

    if(tag === "All"){
        input.value = "";
    }
    else{
        input.value = tag;
    }

    renderSearch();

}


/* =========================================================
   FILTERED MOTIONS
========================================================= */

function filteredMotions(){

    let list =
        [...MOTIONS];


    if(
        currentCategory !==
        "All"
    ){

        list =
            list.filter(
                motion =>
                    motion.category ===
                    currentCategory
            );

    }


    if(
        currentSearch.trim()
    ){

        const q =
            currentSearch
                .trim()
                .toLowerCase();


        list =
            list.filter(
                motion =>
                    matchesMotionSearch(
                        motion,
                        q
                    )
            );

    }


    return list;

}


/* =========================================================
   CARD
========================================================= */

function motionCard(
    motion
){

    const isEmpty =
        motion.kind ===
        "empty";

    const isSaved =
        saved.has(
            motion.id
        );


    /*
       IMPORTANT:
       The card ALWAYS shows default preview text.
       User editing inside Studio does not permanently
       change the library card.
    */

    const previewLabel =
        motion.defaults
            .mainText ||
        motion.title;


    return `

        <article
            class="motion-card"
            data-motion="${escapeHTML(
                motion.id
            )}"
        >


            <div class="motion-poster">


                <img
                    src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
                    data-src="${escapeHTML(
                        motion.thumbnail ||
                        motion.image ||
                        ""
                    )}"
                    alt="${escapeHTML(
                        motion.title
                    )}"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                >

                <canvas
                    class="motion-preview-canvas"
                    width="640"
                    height="360"
                    aria-hidden="true"
                ></canvas>

                <span class="motion-preview-hint">PREVIEW</span>


                <div class="motion-badge">

                    ${escapeHTML(
                        motion.category
                    )}

                </div>


                <button
                    class="
                        motion-bookmark
                        ${
                            isSaved
                                ? "saved"
                                : ""
                        }
                    "
                    data-save="${escapeHTML(
                        motion.id
                    )}"
                >

                    <i class="${
                        isSaved
                            ? "fa-solid"
                            : "fa-regular"
                    } fa-bookmark"></i>

                </button>


                <div
                    class="
                        motion-center
                        ${
                            isEmpty
                                ? "empty"
                                : ""
                        }
                    "
                    style="
                        --card-color:
                            ${escapeHTML(
                                motion.accent
                            )};
                    "
                >

                    <strong>

                        ${
                            isEmpty
                                ? "?"
                                : escapeHTML(
                                    previewLabel
                                )
                        }

                    </strong>

                </div>


            </div>


            <div class="motion-info">


                <div class="motion-title">

                    ${escapeHTML(
                        motion.title
                    )}

                </div>


                <div class="motion-meta">

                    ${escapeHTML(
                        motion.tag
                    )}

                    &nbsp; • &nbsp;

                    ${(
                        motion.duration /
                        1000
                    ).toFixed(1)}s

                </div>

            <!-- Mother Page card intentionally has no open/edit link. -->

            </div>

        </article>

    `;

}


function renderAllMotions(){

    if(!allMotionsGrid){
        return;
    }

    const categories = [
        "All",
        ...new Set(
            MOTIONS.map(motion => motion.category)
        )
    ];

    if(allMotionFilters){
        allMotionFilters.innerHTML = categories.map(category => `
            <button
                class="filter ${currentCategory === category ? "active" : ""}"
                data-all-category="${escapeHTML(category)}"
            >
                ${escapeHTML(category)}
            </button>
        `).join("");

        allMotionFilters.querySelectorAll("[data-all-category]").forEach(btn => {
            btn.addEventListener("click", () => {
                currentCategory = btn.dataset.allCategory;
                renderAllMotions();
            });
        });
    }

    let list = [...MOTIONS];

    if(currentCategory !== "All"){
        list = list.filter(motion => motion.category === currentCategory);
    }

    allMotionsGrid.innerHTML = list.length
        ? list.map(motionCard).join("")
        : `<div class="saved-empty">No motions found.</div>`;

    bindCards(allMotionsGrid);
}


function renderCards(){

    const list =
        filteredMotions().slice(0,10);


    if(
        !list.length
    ){

        motionRow.innerHTML = `

            <div
                style="
                    color:#575760;
                    font-size:11px;
                    padding:12px 0;
                "
            >

                No motions found.

            </div>

        `;

        return;

    }


    motionRow.innerHTML =
        list.map(
            motionCard
        )
        .join("");


    bindCards();
    observeMotionViewport(motionRow);

}


function bindCards(container = motionRow){

    if(!container){
        return;
    }

    container
        .querySelectorAll(".motion-card")
        .forEach(card => {

            card.addEventListener(
                "mouseenter",
                event => {
                    if(event.target && event.target.closest?.("[data-save]")){
                        return;
                    }
                    startCardPreview(card);
                }
            );

            card.addEventListener(
                "mouseleave",
                () => stopCardPreview()
            );

            card.addEventListener(
                "focusin",
                event => {
                    if(event.target && event.target.closest?.("[data-save]")){
                        return;
                    }
                    startCardPreview(card);
                }
            );

            card.addEventListener(
                "focusout",
                () => {
                    if(cardPreview.card === card){
                        stopCardPreview();
                    }
                }
            );

            card.addEventListener(
                "pointerdown",
                event => {

                    // Save button is isolated: touching it must never start preview.
                    if(event.target && event.target.closest?.("[data-save]")){
                        return;
                    }

                    if(event.pointerType !== "touch"){
                        return;
                    }

                    card.dataset.previewTap = "preview";
                    startCardPreview(card);

                },
                {passive:true}
            );

            // Block the card's touch/pointer handlers from seeing Save taps.
            card.querySelectorAll("[data-save]").forEach(button => {
                button.addEventListener(
                    "pointerdown",
                    event => {
                        event.stopPropagation();
                        stopCardPreview();
                    },
                    {passive:true}
                );

                button.addEventListener(
                    "touchstart",
                    event => {
                        event.stopPropagation();
                        stopCardPreview();
                    },
                    {passive:true}
                );
            });

            // Mother Page cards no longer open an Edit/Open link.
            // Tap/click only previews the animation.
            card.addEventListener(
                "click",
                event => {

                    if(event.target && event.target.closest?.("[data-save]")){
                        return;
                    }

                    event.preventDefault();
                    event.stopPropagation();
                    startCardPreview(card);
                    card.dataset.previewTap = "";
                }
            );

        });

    container
        .querySelectorAll("[data-save]")
        .forEach(button => {

            button.addEventListener(
                "pointerdown",
                event => {
                    event.stopPropagation();
                },
                {passive:true}
            );

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    toggleSaved(
                        button.dataset.save
                    );

                }
            );

        });
}


function openMotionLink(id){

    const motion = getMotion(id);

    if(!motion){
        return;
    }

    openMotion(id, { pushHistory:true });

}


/* =========================================================
   DRAG SCROLL
========================================================= */

function enableDrag(
    slider
){

    if(
        slider.dataset.dragReady ===
        "true"
    ){

        return;

    }

    slider.dataset.dragReady =
        "true";


    let down = false;

    let startX = 0;

    let startScroll = 0;

    let moved = false;


    slider.addEventListener(
        "mousedown",
        event => {

            if(
                event.button !== 0
            ){

                return;

            }

            down = true;

            moved = false;

            slider.classList.add(
                "dragging"
            );

            startX =
                event.pageX -
                slider.offsetLeft;

            startScroll =
                slider.scrollLeft;

        }
    );


    slider.addEventListener(
        "mousemove",
        event => {

            if(
                !down
            ){

                return;

            }


            const x =
                event.pageX -
                slider.offsetLeft;

            const distance =
                x -
                startX;


            if(
                Math.abs(distance) >
                6
            ){

                moved = true;

            }


            slider.scrollLeft =
                startScroll -
                distance *
                1.2;

        }
    );


    function release(){

        down = false;

        slider.classList.remove(
            "dragging"
        );

        setTimeout(
            () => {

                moved = false;

            },
            40
        );

    }


    slider.addEventListener(
        "mouseup",
        release
    );

    slider.addEventListener(
        "mouseleave",
        release
    );


    slider.addEventListener(
        "click",
        event => {

            if(
                moved
            ){

                event.preventDefault();

                event.stopPropagation();

            }

        },
        true
    );


    let touchStart = 0;

    let touchScroll = 0;


    slider.addEventListener(
        "touchstart",
        event => {

            touchStart =
                event.touches[0].pageX;

            touchScroll =
                slider.scrollLeft;

        },
        {
            passive:true
        }
    );


    slider.addEventListener(
        "touchmove",
        event => {

            const x =
                event.touches[0].pageX;

            const distance =
                x -
                touchStart;

            slider.scrollLeft =
                touchScroll -
                distance;

        },
        {
            passive:true
        }
    );

}


/* =========================================================
   ROUTING + HISTORY
========================================================= */

let currentRoute = "home";

function syncGlobalBackButton(){

    if(!globalBackButton){
        return;
    }

    globalBackButton.classList.toggle(
        "visible",
        currentRoute !== "home"
    );

}

function routePath(route){
    if(route === "home") return "#home";
    if(route === "motions") return "#motions";
    if(route === "saved") return "#saved";
    if(route === "more-info") return "#more-information";
    if(route === "steps") return "#steps";
    return "#home";
}

function setHistory(route, stateData={}){

    const state = {
        route,
        ...stateData
    };

    const query =
        route === "studio" && stateData.motionId
            ? `?motion=${encodeURIComponent(stateData.motionId)}`
            : "";

    const path =
        `${routePath(route)}${query}`;

    history.pushState(
        state,
        "",
        path
    );

}

function deactivatePages(){

    const pages = [
        homePage,
        aboutPage,
        savedPage,
        allMotionsPage,
        studioPage,
        stepsPage
    ];

    pages.forEach(page => {
        if(page){
            page.classList.remove("active");
        }
    });

}

function activateRoute(route){

    deactivatePages();

    if(route === "home"){
        homePage.classList.add("active");
    }
    else if(route === "about"){
        aboutPage.classList.add("active");
    }
    else if(route === "more-info"){
        aboutPage.classList.add("active");
        renderMoreInfo();
    }
    else if(route === "saved"){
        savedPage.classList.add("active");
        renderSaved();
    }
    else if(route === "steps"){
        stepsPage.classList.add("active");
        renderSteps();
    }
    else if(route === "motions"){
        homePage.classList.add("active");
        requestAnimationFrame(() => {
            const section = document.getElementById("motions");
            if(section){
                section.scrollIntoView({behavior:"smooth", block:"start"});
            }
        });
    }
    else if(route === "studio"){
        homePage.classList.add("active");
    }

    currentRoute = route;
    syncGlobalBackButton();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

function goBack(){

    if(history.length > 1){
        history.back();
        return;
    }

    goHome({pushHistory:false});
}

function showAbout(){
    showMoreInfo({pushHistory:true});
}

function showMoreInfo(options={pushHistory:true}){
    closeSearch();
    stopStudio();

    if(options.pushHistory){
        setHistory("more-info");
    }

    activateRoute("about");
}

function showSteps(options={pushHistory:true}){
    closeSearch();
    stopStudio();

    if(options.pushHistory){
        setHistory("steps");
    }

    activateRoute("steps");
}

function goHome(options={pushHistory:true}){

    closeSearch();
    closeQuickMenu();
    stopStudio();

    if(options.pushHistory){
        setHistory("home");
    }

    activateRoute("home");
}

function goMotions(){
    closeSearch();
    closeQuickMenu();
    stopStudio();
    // VIEW ALL / BROWSE MOTIONS opens the separate More page.
    window.location.href = YEADI_PAGE_FILES.more;
}

window.addEventListener("popstate", event => {

    const state = event.state || {};

    if(state.route === "motions"){
        activateRoute("motions");
        return;
    }

    if(state.route === "saved"){
        activateRoute("saved");
        return;
    }

    if(state.route === "more-info"){
        activateRoute("more-info");
        return;
    }

    if(state.route === "steps"){
        activateRoute("steps");
        return;
    }

    activateRoute("home");
});