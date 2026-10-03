/* =========================================================
   SAVED
========================================================= */

function saveState(){

    localStorage.setItem(
        "yeadiMotionSaved",
        JSON.stringify(
            [...saved]
        )
    );

}


function toggleSaved(
    id
){

    const motion =
        getMotion(id);

    if(saved.has(id)){

        saved.delete(id);

        try{
            const savedSnapshots = JSON.parse(localStorage.getItem("yeadiSavedMotionSnapshots") || "{}");
            delete savedSnapshots[id];
            localStorage.setItem("yeadiSavedMotionSnapshots", JSON.stringify(savedSnapshots));
        }catch(error){
            console.warn("Could not clean saved snapshot:", error);
        }

        showToast(
            "Motion removed from saved."
        );

    }
    else{

        saved.add(id);

        if(motion){
            const savedSnapshots =
                JSON.parse(
                    localStorage.getItem("yeadiSavedMotionSnapshots") || "{}"
                );

            savedSnapshots[id] = motion;

            localStorage.setItem(
                "yeadiSavedMotionSnapshots",
                JSON.stringify(savedSnapshots)
            );
        }

        showToast(
            "Motion saved."
        );

    }

    saveState();

    // Keep the clicked Save/Bookmark button in place.
    // Updating the whole card grid here caused the button to disappear briefly.
    updateSaveButtons(id);

    // Saved view can safely re-render because it is a separate list.
    renderSaved();

    syncStudioSave();

}


function updateSaveButtons(id){

    const isSaved = saved.has(id);

    document
        .querySelectorAll("[data-save]")
        .forEach(button => {

            if(button.dataset.save !== id){
                return;
            }

            button.classList.toggle("saved", isSaved);

            button.innerHTML = isSaved
                ? '<i class="fa-solid fa-bookmark"></i>'
                : '<i class="fa-regular fa-bookmark"></i>';

            button.setAttribute(
                "aria-label",
                isSaved ? "Remove from saved" : "Save animation"
            );

            button.setAttribute(
                "title",
                isSaved ? "Remove from saved" : "Save animation"
            );

        });

}



function syncStudioSave(){

    const button =
        $("#studioSaveButton");

    if(!button){
        return;
    }

    if(
        saved.has(
            currentMotionId
        )
    ){

        button.innerHTML = `
            <i class="fa-solid fa-bookmark"></i>
            SAVED
        `;

    }
    else{

        button.innerHTML = `
            <i class="fa-regular fa-bookmark"></i>
            SAVE
        `;

    }

}



function renderMoreInfo(){

    if(!moreInfoTitle){
        return;
    }

    const data =
        window.yeadiSiteContent?.moreInformation ||
        {};

    moreInfoTitle.textContent =
        data.title ||
        "YEADI X MOTION";

    const paragraphs =
        Array.isArray(data.paragraphs) &&
        data.paragraphs.length
            ? data.paragraphs
            : [
                "YEADI X MOTION is a motion-focused creative library for discovering, previewing, saving, and opening animations in the dedicated Edit studio.",
                "The information shown here can be changed later from the Admin Panel without rebuilding the Mother Page."
              ];

    moreInfoBody.innerHTML =
        paragraphs
            .map(text => `<p>${escapeHTML(text)}</p>`)
            .join("");

    const bullets =
        Array.isArray(data.bullets) &&
        data.bullets.length
            ? data.bullets
            : [
                "Browse motion categories and find a style quickly.",
                "Preview a motion directly on its card before opening Edit.",
                "Save favorite motions locally in this browser."
              ];

    moreInfoBullets.innerHTML =
        bullets
            .map(text => `<div class="more-bullet">${escapeHTML(text)}</div>`)
            .join("");
}


function renderSteps(){

    if(!stepsTitle){
        return;
    }

    const data =
        window.yeadiSiteContent?.training ||
        {};

    stepsTitle.textContent =
        data.title ||
        "How YEADI X MOTION works";

    stepsIntro.textContent =
        data.intro ||
        "A simple path from choosing a motion to opening the dedicated Edit studio.";

    const steps =
        Array.isArray(data.steps) &&
        data.steps.length
            ? data.steps
            : [
                {
                    title:"01 · CHOOSE",
                    body:"Pick a motion card from the library and preview it before opening the editor."
                },
                {
                    title:"02 · SAVE OR EDIT",
                    body:"Save a motion for later or open it in the dedicated Edit page for customization."
                },
                {
                    title:"03 · CREATE",
                    body:"Use Edit for the heavier tools so the Mother Page stays focused and lightweight."
                }
              ];

    stepsGrid.innerHTML =
        steps
            .map(step => `
                <article class="step-card">
                    <b>${escapeHTML(step.title || "")}</b>
                    <p>${escapeHTML(step.body || "")}</p>
                </article>
            `)
            .join("");
}