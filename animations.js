/* =========================================================
   OPEN STUDIO
========================================================= */

function openMotion(
    id,
    options={pushHistory:true}
){

    const motion =
        getMotion(id);

    if(!motion){
        return;
    }

    currentMotionId = id;

    closeSearch();
    stopStudio();

    showToast("Edit page will be connected later.");
}



/* =========================================================
   EDITOR
========================================================= */

function buildEditor(){

    const motion =
        currentMotion();

    const v =
        values();


    if(
        motion.kind ===
        "empty"
    ){

        editor.innerHTML = `

            <div class="empty-editor">

                <i
                    class="fa-solid fa-code"
                    style="
                        font-size:19px;
                        display:block;
                        margin-bottom:10px;
                    "
                ></i>


                This is the empty motion slot.

                <br><br>

                Later you can connect
                your own animation code here.

            </div>

        `;

        return;

    }


    let html =
        "";


    /* MAIN TEXT */

    if(
        motion.supports.mainText
    ){

        html += `

            <div class="editor-group">

                <label class="editor-label">
                    MAIN TEXT
                </label>


                <input
                    id="mainText"
                    class="text-input"
                    type="text"
                    maxlength="120"
                    value="${escapeHTML(
                        v.mainText
                    )}"
                    placeholder="Your main text"
                >

            </div>

        `;

    }


    /* SUBTITLE */

    if(
        motion.supports.subtitle
    ){

        html += `

            <div class="editor-group">

                <label class="editor-label">
                    MOTION TEXT
                </label>


                <input
                    id="subtitle"
                    class="text-input"
                    type="text"
                    maxlength="120"
                    value="${escapeHTML(
                        v.subtitle
                    )}"
                    placeholder="Motion / subtitle"
                >

            </div>

        `;

    }


    /* MAIN FONT SIZE */

    if(
        motion.supports.mainSize
    ){

        html += `

            <div class="editor-group">

                <label class="editor-label">
                    YEADI FONT SIZE
                </label>


                <div class="range-grid">

                    <input
                        id="mainSize"
                        type="range"
                        min="34"
                        max="150"
                        step="1"
                        value="${Number(
                            v.mainSize
                        )}"
                    >


                    <div
                        class="range-value"
                        id="mainSizeValue"
                    >

                        ${Number(
                            v.mainSize
                        )}px

                    </div>

                </div>

            </div>

        `;

    }


    /* X FONT SIZE */

    if(
        motion.supports.crossSize
    ){

        html += `

            <div class="editor-group">

                <label class="editor-label">
                    X FONT SIZE
                </label>


                <div class="range-grid">

                    <input
                        id="crossSize"
                        type="range"
                        min="28"
                        max="120"
                        step="1"
                        value="${Number(
                            v.crossSize
                        )}"
                    >


                    <div
                        class="range-value"
                        id="crossSizeValue"
                    >

                        ${Number(
                            v.crossSize
                        )}px

                    </div>

                </div>

            </div>

        `;

    }


    /* MOTION FONT SIZE */

    if(
        motion.supports.motionSize
    ){

        html += `

            <div class="editor-group">

                <label class="editor-label">
                    MOTION FONT SIZE
                </label>


                <div class="range-grid">

                    <input
                        id="motionSize"
                        type="range"
                        min="12"
                        max="55"
                        step="1"
                        value="${Number(
                            v.motionSize
                        )}"
                    >


                    <div
                        class="range-value"
                        id="motionSizeValue"
                    >

                        ${Number(
                            v.motionSize
                        )}px

                    </div>

                </div>

            </div>

        `;

    }


    /* X HORIZONTAL */

    if(
        motion.supports.crossX
    ){

        html += `

            <div class="editor-group">

                <label class="editor-label">
                    X HORIZONTAL POSITION
                </label>


                <div class="range-grid">

                    <input
                        id="crossX"
                        type="range"
                        min="-250"
                        max="250"
                        step="1"
                        value="${Number(
                            v.crossX
                        )}"
                    >


                    <div
                        class="range-value"
                        id="crossXValue"
                    >

                        ${Number(
                            v.crossX
                        )}px

                    </div>

                </div>

            </div>

        `;

    }


    /* X VERTICAL */

    if(
        motion.supports.crossY
    ){

        html += `

            <div class="editor-group">

                <label class="editor-label">
                    X VERTICAL POSITION
                </label>


                <div class="range-grid">

                    <input
                        id="crossY"
                        type="range"
                        min="-220"
                        max="220"
                        step="1"
                        value="${Number(
                            v.crossY
                        )}"
                    >


                    <div
                        class="range-value"
                        id="crossYValue"
                    >

                        ${Number(
                            v.crossY
                        )}px

                    </div>

                </div>

            </div>

        `;

    }


    /* MOTION VERTICAL */

    if(
        motion.supports.motionY
    ){

        html += `

            <div class="editor-group">

                <label class="editor-label">
                    MOTION VERTICAL POSITION
                </label>


                <div class="range-grid">

                    <input
                        id="motionY"
                        type="range"
                        min="-180"
                        max="180"
                        step="1"
                        value="${Number(
                            v.motionY
                        )}"
                    >


                    <div
                        class="range-value"
                        id="motionYValue"
                    >

                        ${Number(
                            v.motionY
                        )}px

                    </div>

                </div>

            </div>

        `;

    }


    /* COLOR */

    if(
        motion.supports.color
    ){

        html += `

            <div class="editor-group">

                <label class="editor-label">
                    ACCENT COLOR
                </label>


                <div class="color-grid">

                    <input
                        id="colorPicker"
                        class="color-picker"
                        type="color"
                        value="${escapeHTML(
                            v.color
                        )}"
                    >


                    <input
                        id="colorText"
                        class="text-input"
                        value="${escapeHTML(
                            v.color
                        )}"
                        spellcheck="false"
                    >

                </div>

            </div>

        `;

    }


    /* IMAGE */

    if(
        motion.supports.image
    ){

        html += `

            <div class="editor-group">

                <label class="editor-label">
                    PICTURE / LOGO
                </label>


                <div class="upload-box">

                    <label
                        class="upload-label"
                        for="imageUpload"
                    >

                        <i
                            class="
                                fa-solid
                                fa-arrow-up-from-bracket
                            "
                        ></i>

                        UPLOAD IMAGE

                    </label>


                    <input
                        id="imageUpload"
                        class="upload-input"
                        type="file"
                        accept="image/*"
                    >


                    <div
                        class="file-name"
                        id="fileName"
                    >

                        No image selected

                    </div>


                </div>


                <div class="editor-note">

                    The image is used directly inside
                    the browser preview. It is not
                    uploaded to a server in this demo.

                </div>


            </div>

        `;

    }


    /* NOTE */

    html += `

        <div class="editor-group">

            <div class="editor-note">

                Background is part of the template
                and cannot be changed here.

                <br><br>

                Every control above belongs only
                to this specific animation.

            </div>

        </div>

    `;


    editor.innerHTML =
        html;


    bindEditor();


}


/* =========================================================
   EDITOR EVENTS
========================================================= */

function bindEditor(){

    const v =
        values();


    const mainText =
        $("#mainText");

    if(mainText){

        mainText.addEventListener(
            "input",
            event => {

                v.mainText =
                    event.target.value;

            }
        );

    }


    const subtitle =
        $("#subtitle");

    if(subtitle){

        subtitle.addEventListener(
            "input",
            event => {

                v.subtitle =
                    event.target.value;

            }
        );

    }


    bindRange(
        "mainSize",
        "mainSizeValue",
        value => {

            v.mainSize =
                Number(value);

        },
        "px"
    );


    bindRange(
        "crossSize",
        "crossSizeValue",
        value => {

            v.crossSize =
                Number(value);

        },
        "px"
    );


    bindRange(
        "motionSize",
        "motionSizeValue",
        value => {

            v.motionSize =
                Number(value);

        },
        "px"
    );


    bindRange(
        "crossX",
        "crossXValue",
        value => {

            v.crossX =
                Number(value);

        },
        "px"
    );


    bindRange(
        "crossY",
        "crossYValue",
        value => {

            v.crossY =
                Number(value);

        },
        "px"
    );


    bindRange(
        "motionY",
        "motionYValue",
        value => {

            v.motionY =
                Number(value);

        },
        "px"
    );


    const colorPicker =
        $("#colorPicker");

    const colorText =
        $("#colorText");


    if(
        colorPicker
    ){

        colorPicker.addEventListener(
            "input",
            event => {

                v.color =
                    event.target.value;

                colorText.value =
                    event.target.value;

            }
        );

    }


    if(
        colorText
    ){

        colorText.addEventListener(
            "input",
            event => {

                const color =
                    event.target.value;

                if(
                    /^#[0-9a-fA-F]{6}$/
                    .test(
                        color
                    )
                ){

                    v.color =
                        color;

                    if(
                        colorPicker
                    ){

                        colorPicker.value =
                            color;

                    }

                }

            }
        );

    }


    const upload =
        $("#imageUpload");


    if(
        upload
    ){

        upload.addEventListener(
            "change",
            handleImageUpload
        );

    }

}


function bindRange(
    inputId,
    displayId,
    callback,
    suffix
){

    const input =
        $("#"+inputId);

    const display =
        $("#"+displayId);


    if(
        !input ||
        !display
    ){

        return;

    }


    input.addEventListener(
        "input",
        event => {

            const value =
                event.target.value;

            callback(
                value
            );

            display.textContent =
                `${value}${suffix}`;

        }
    );

}


/* =========================================================
   IMAGE
========================================================= */

function handleImageUpload(
    event
){

    const file =
        event.target.files?.[0];


    if(!file){
        return;
    }


    if(
        !file.type.startsWith(
            "image/"
        )
    ){

        showToast(
            "Please choose an image."
        );

        return;

    }


    if(
        file.size >
        8*1024*1024
    ){

        showToast(
            "Keep the image under 8 MB."
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        () => {

            uploadedImage =
                reader.result;

            uploadedImageName =
                file.name;


            const name =
                $("#fileName");


            if(name){

                name.textContent =
                    file.name;

            }


            showToast(
                "Image added."
            );

        };


    reader.readAsDataURL(
        file
    );

}


/* =========================================================
   RESET
========================================================= */

function resetEditor(){

    const motion =
        currentMotion();


    motionValues[
        motion.id
    ] = {
        ...motion.defaults
    };


    uploadedImage =
        null;

    uploadedImageName =
        "";


    buildEditor();


    studioTime =
        0;

    studioPlaying =
        true;


    startStudio();


    showToast(
        "Motion reset."
    );

}


/* =========================================================
   CANVAS SIZING
========================================================= */

function fitCanvas(
    canvas
){

    const rect =
        canvas.getBoundingClientRect();


    const ratio =
        Math.max(
            1,
            Math.min(
                window.devicePixelRatio ||
                1,
                2
            )
        );


    const width =
        Math.max(
            640,
            Math.round(
                rect.width *
                ratio
            )
        );


    const height =
        Math.max(
            360,
            Math.round(
                rect.height *
                ratio
            )
        );


    if(
        canvas.width !== width ||
        canvas.height !== height
    ){

        canvas.width =
            width;

        canvas.height =
            height;

    }

}


window.addEventListener(
    "resize",
    () => {

        fitCanvas(
            heroCanvas
        );

        fitCanvas(
            studioCanvas
        );

    }
);


/* =========================================================
   CANVAS BASE
========================================================= */

function drawBackground(
    ctx,
    canvas,
    seconds,
    accent
){

    const w =
        canvas.width;

    const h =
        canvas.height;


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            w,
            h
        );


    gradient.addColorStop(
        0,
        "#07090d"
    );

    gradient.addColorStop(
        .5,
        "#0b0d13"
    );

    gradient.addColorStop(
        1,
        "#05070a"
    );


    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        w,
        h
    );


    const glow =
        ctx.createRadialGradient(
            w*.5,
            h*.45,
            0,
            w*.5,
            h*.45,
            Math.min(w,h)*.62
        );


    const pulse =
        .5+
        .5*
        Math.sin(
            seconds*
            1.25
        );


    glow.addColorStop(
        0,
        rgba(
            accent,
            .065+
            pulse*.025
        )
    );


    glow.addColorStop(
        1,
        rgba(
            accent,
            0
        )
    );


    ctx.fillStyle =
        glow;

    ctx.fillRect(
        0,
        0,
        w,
        h
    );


    ctx.strokeStyle =
        "rgba(255,255,255,.035)";

    ctx.lineWidth = 1;


    for(
        let x=0;
        x<w;
        x+=w/12
    ){

        ctx.beginPath();

        ctx.moveTo(
            x,
            0
        );

        ctx.lineTo(
            x,
            h
        );

        ctx.stroke();

    }


    for(
        let y=0;
        y<h;
        y+=h/8
    ){

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            w,
            y
        );

        ctx.stroke();

    }

}


/* =========================================================
   TEXT
========================================================= */

function drawText(
    ctx,
    canvas,
    text,
    x,
    y,
    size,
    color,
    alpha=1,
    blur=20,
    weight=900
){

    const scale =
        canvas.width /
        1280;


    ctx.save();


    ctx.globalAlpha =
        alpha;


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.font =
        `${weight}
        ${Math.max(
            12,
            size *
            scale
        )}px
        Inter,Arial,sans-serif`;


    ctx.fillStyle =
        color;


    ctx.shadowColor =
        color;


    ctx.shadowBlur =
        blur *
        scale;


    ctx.fillText(
        text,
        x,
        y
    );


    ctx.restore();

}


/* =========================================================
   IMAGE
========================================================= */

function getImageObject(){

    if(
        !uploadedImage
    ){

        return null;

    }


    if(
        !getImageObject.img ||
        getImageObject.src !==
        uploadedImage
    ){

        const image =
            new Image();

        image.src =
            uploadedImage;

        getImageObject.img =
            image;

        getImageObject.src =
            uploadedImage;

    }


    return getImageObject.img;

}


/* =========================================================
   RENDER MOTION
========================================================= */

function renderMotion(
    ctx,
    canvas,
    seconds,
    motion,
    v
){

    const w =
        canvas.width;

    const h =
        canvas.height;


    if(
        motion.kind ===
        "empty"
    ){

        ctx.clearRect(
            0,
            0,
            w,
            h
        );


        drawBackground(
            ctx,
            canvas,
            seconds,
            "#55555f"
        );


        ctx.save();


        ctx.strokeStyle =
            "rgba(255,255,255,.06)";

        ctx.lineWidth = 2;


        roundRect(
            ctx,
            w*.25,
            h*.22,
            w*.50,
            h*.56,
            18
        );


        ctx.stroke();


        drawText(
            ctx,
            canvas,
            "EMPTY MOTION",
            w/2,
            h*.47,
            30,
            "#4b4b54",
            1,
            0,
            900
        );


        drawText(
            ctx,
            canvas,
            "READY FOR YOUR CODE",
            w/2,
            h*.57,
            12,
            "#414149",
            1,
            0,
            700
        );


        ctx.restore();


        return;

    }


    drawBackground(
        ctx,
        canvas,
        seconds,
        v.color ||
        motion.accent
    );


    const accent =
        v.color ||
        motion.accent;


    const duration =
        motion.duration /
        1000;


    const progress =
        clamp(
            seconds /
            duration,
            0,
            1
        );


    /* =====================================================
       CASCADE
    ===================================================== */

    if(
        motion.kind ===
        "cascade"
    ){

        const mainIn =
            easeOutCubic(
                clamp(
                    progress/.30,
                    0,
                    1
                )
            );


        const xIn =
            easeOutCubic(
                clamp(
                    (
                        progress-.16
                    )/.24,
                    0,
                    1
                )
            );


        const motionIn =
            easeOutCubic(
                clamp(
                    (
                        progress-.41
                    )/.30,
                    0,
                    1
                )
            );


        /* Main text */

        const mainY =
            lerp(
                h*.74,
                h*.40,
                mainIn
            );


        drawText(
            ctx,
            canvas,
            v.mainText || "",
            w/2,
            mainY,
            v.mainSize,
            accent,
            mainIn,
            v.mainSize*.33,
            900
        );


        /*
           X is a REAL FONT CHARACTER now.
           Not two manually drawn lines.
        */

        const xScale =
            .25 +
            .75 *
            xIn;


        const xPosition =
            w/2 +
            (
                v.crossX ||
                0
            ) *
            (
                w/
                1280
            );


        const xPositionY =
            h*.53 +
            (
                v.crossY ||
                0
            ) *
            (
                h/
                720
            );


        ctx.save();


        ctx.translate(
            xPosition,
            xPositionY
        );


        ctx.scale(
            xScale,
            xScale
        );


        drawText(
            ctx,
            canvas,
            "X",
            0,
            0,
            v.crossSize,
            "#f4f4f7",
            xIn,
            v.crossSize*.25,
            900
        );


        ctx.restore();


        /* Motion */

        const motionY =
            h*.67 +
            (
                v.motionY ||
                0
            ) *
            (
                h/
                720
            );


        drawText(
            ctx,
            canvas,
            v.subtitle || "",
            w/2,
            motionY,
            v.motionSize,
            "#e8ebef",
            motionIn,
            7,
            700
        );

    }


    /* =====================================================
       PULSE
    ===================================================== */

    if(
        motion.kind ===
        "pulse"
    ){

        const enter =
            easeOutCubic(
                clamp(
                    progress/.30,
                    0,
                    1
                )
            );


        const pulse =
            .5+
            .5*
            Math.sin(
                seconds*9
            );


        ctx.save();


        ctx.translate(
            w/2,
            h*.48
        );


        const scale =
            .90 +
            .10 *
            enter +
            .035 *
            pulse;


        ctx.scale(
            scale,
            scale
        );


        drawText(
            ctx,
            canvas,
            v.mainText,
            0,
            0,
            v.mainSize,
            accent,
            enter,
            22 +
            pulse*25,
            900
        );


        ctx.restore();


        drawText(
            ctx,
            canvas,
            v.subtitle,
            w/2,
            h*.69 +
            (
                v.motionY ||
                0
            ) *
            (
                h/
                720
            ),
            v.motionSize,
            "#eceff3",
            enter,
            7,
            700
        );

    }


    /* =====================================================
       ORBIT
    ===================================================== */

    if(
        motion.kind ===
        "orbit"
    ){

        const enter =
            easeOutCubic(
                clamp(
                    progress/.35,
                    0,
                    1
                )
            );


        const radius =
            Math.min(
                w,
                h
            ) *
            .25 *
            enter;


        ctx.save();


        ctx.translate(
            w/2,
            h/2
        );


        ctx.strokeStyle =
            rgba(
                accent,
                .52
            );


        ctx.lineWidth =
            2 *
            (
                w/
                1280
            );


        ctx.setLineDash([
            10,
            13
        ]);


        ctx.beginPath();


        ctx.arc(
            0,
            0,
            radius,
            0,
            Math.PI*2
        );


        ctx.stroke();


        ctx.setLineDash([]);


        const angle =
            seconds*4;


        ctx.fillStyle =
            accent;


        ctx.shadowColor =
            accent;


        ctx.shadowBlur =
            20;


        ctx.beginPath();


        ctx.arc(
            Math.cos(angle)*
                radius,
            Math.sin(angle)*
                radius,
            7*
            (
                w/
                1280
            ),
            0,
            Math.PI*2
        );


        ctx.fill();


        ctx.restore();


        drawText(
            ctx,
            canvas,
            v.mainText,
            w/2,
            h/2,
            v.mainSize,
            accent,
            enter,
            v.mainSize*.3,
            900
        );


        const image =
            getImageObject();


        if(
            image &&
            image.complete
        ){

            const side =
                Math.min(
                    w,
                    h
                )*.22;


            ctx.save();


            ctx.globalAlpha =
                .20 *
                enter;


            ctx.beginPath();


            ctx.arc(
                w/2,
                h/2,
                side,
                0,
                Math.PI*2
            );


            ctx.clip();


            ctx.drawImage(
                image,
                w/2-side,
                h/2-side,
                side*2,
                side*2
            );


            ctx.restore();

        }

    }


    /* =====================================================
       QUANTUM
    ===================================================== */

    if(
        motion.kind ===
        "quantum"
    ){

        const enter =
            easeOutCubic(
                clamp(
                    progress/.78,
                    0,
                    1
                )
            );


        const line =
            w*.70*
            enter;


        ctx.strokeStyle =
            rgba(
                accent,
                .65
            );


        ctx.lineWidth =
            2 *
            (
                w/
                1280
            );


        ctx.beginPath();


        ctx.moveTo(
            w/2 -
            line/2,
            h*.51
        );


        ctx.lineTo(
            w/2 +
            line/2,
            h*.51
        );


        ctx.stroke();


        drawText(
            ctx,
            canvas,
            v.mainText,
            w/2,
            h*.45,
            v.mainSize,
            accent,
            enter,
            v.mainSize*.28,
            900
        );


        drawText(
            ctx,
            canvas,
            v.subtitle,
            w/2,
            h*.62 +
            (
                v.motionY ||
                0
            ) *
            (
                h/
                720
            ),
            v.motionSize,
            "#eceff3",
            enter,
            7,
            700
        );

    }


    /* =====================================================
       PRISM
    ===================================================== */

    if(
        motion.kind ===
        "prism"
    ){

        const enter =
            easeInOutCubic(
                clamp(
                    progress/.85,
                    0,
                    1
                )
            );


        for(
            let i=-3;
            i<=3;
            i++
        ){

            const offset =
                i*42*
                (
                    w/
                    1280
                ) +
                Math.sin(
                    seconds*3+i
                ) *
                15*
                (
                    w/
                    1280
                );


            ctx.save();


            ctx.translate(
                w/2+
                offset,
                h/2
            );


            ctx.rotate(
                i*.055
            );


            ctx.fillStyle =
                rgba(
                    accent,
                    .025 +
                    Math.abs(i)*.006
                );


            ctx.fillRect(
                -w*.29,
                -h*.56,
                w*.58,
                h*1.12
            );


            ctx.restore();

        }


        drawText(
            ctx,
            canvas,
            v.mainText,
            w/2,
            lerp(
                h*.60,
                h*.46,
                enter
            ),
            v.mainSize,
            accent,
            enter,
            v.mainSize*.34,
            900
        );


        drawText(
            ctx,
            canvas,
            v.subtitle,
            w/2,
            h*.64 +
            (
                v.motionY ||
                0
            ) *
            (
                h/
                720
            ),
            v.motionSize,
            "#eceff3",
            enter,
            7,
            700
        );

    }


    /* =====================================================
       PROFILE
    ===================================================== */

    if(
        motion.kind ===
        "profile"
    ){

        const enter =
            easeOutCubic(
                clamp(
                    progress/.50,
                    0,
                    1
                )
            );


        const x =
            w*.58;

        const y =
            h*.17;

        const boxW =
            w*.33;

        const boxH =
            h*.62;


        const image =
            getImageObject();


        if(
            image &&
            image.complete
        ){

            const scale =
                Math.min(
                    boxW/
                    image.naturalWidth,
                    boxH/
                    image.naturalHeight
                );


            const iw =
                image.naturalWidth *
                scale;


            const ih =
                image.naturalHeight *
                scale;


            ctx.save();


            ctx.globalAlpha =
                enter;


            roundRect(
                ctx,
                x,
                y,
                boxW,
                boxH,
                18
            );


            ctx.clip();


            ctx.drawImage(
                image,
                x +
                (
                    boxW-iw
                )/2,
                y +
                (
                    boxH-ih
                )/2,
                iw,
                ih
            );


            ctx.restore();

        }
        else{

            ctx.save();


            ctx.strokeStyle =
                rgba(
                    accent,
                    .28
                );


            ctx.lineWidth = 2;


            roundRect(
                ctx,
                x,
                y,
                boxW,
                boxH,
                18
            );


            ctx.stroke();


            drawText(
                ctx,
                canvas,
                "UPLOAD PHOTO",
                x+boxW/2,
                y+boxH/2,
                12,
                "#65656f",
                1,
                0,
                700
            );


            ctx.restore();

        }


        drawText(
            ctx,
            canvas,
            v.mainText,
            w*.28,
            lerp(
                h*.60,
                h*.46,
                enter
            ),
            v.mainSize,
            accent,
            enter,
            v.mainSize*.28,
            900
        );


        drawText(
            ctx,
            canvas,
            v.subtitle,
            w*.28,
            h*.60 +
            (
                v.motionY ||
                0
            ) *
            (
                h/
                720
            ),
            v.motionSize,
            "#e7eaf0",
            enter,
            7,
            700
        );

    }


    /* =====================================================
       SCAN
    ===================================================== */

    if(
        motion.kind ===
        "scan"
    ){

        const enter =
            easeOutCubic(
                clamp(
                    progress/.32,
                    0,
                    1
                )
            );


        drawText(
            ctx,
            canvas,
            v.mainText,
            w/2,
            h*.49,
            v.mainSize,
            accent,
            enter,
            v.mainSize*.22,
            900
        );


        const scanY =
            h *
            (
                .22+
                (
                    (
                        seconds*
                        1.15
                    )%1
                )*.56
            );


        ctx.strokeStyle =
            rgba(
                accent,
                .72
            );


        ctx.lineWidth =
            2 *
            (
                w/
                1280
            );


        ctx.beginPath();


        ctx.moveTo(
            w*.14,
            scanY
        );


        ctx.lineTo(
            w*.86,
            scanY
        );


        ctx.stroke();


        drawText(
            ctx,
            canvas,
            v.subtitle,
            w/2,
            h*.65 +
            (
                v.motionY ||
                0
            ) *
            (
                h/
                720
            ),
            v.motionSize,
            "#e6e9ee",
            enter,
            7,
            700
        );

    }


    /* =====================================================
       KINETIC
    ===================================================== */

    if(
        motion.kind ===
        "kinetic"
    ){

        const enter =
            easeOutCubic(
                clamp(
                    progress/.60,
                    0,
                    1
                )
            );


        drawText(
            ctx,
            canvas,
            v.mainText,
            w/2,
            h*.47,
            v.mainSize,
            accent,
            enter,
            v.mainSize*.20,
            900
        );


        drawText(
            ctx,
            canvas,
            v.subtitle,
            w/2,
            h*.65 +
            (
                v.motionY ||
                0
            ) *
            (
                h/
                720
            ),
            v.motionSize,
            "#ebedf1",
            enter,
            7,
            700
        );

    }


    /* =====================================================
       EMBER
    ===================================================== */

    if(
        motion.kind ===
        "ember"
    ){

        const enter =
            easeOutCubic(
                clamp(
                    progress/.55,
                    0,
                    1
                )
            );


        for(
            let i=0;
            i<50;
            i++
        ){

            const angle =
                i*2.399+
                seconds*2.2;


            const radius =
                Math.min(
                    w,
                    h
                )*.29*
                (
                    1-
                    i/58
                );


            const x =
                w/2+
                Math.cos(angle)*
                radius;


            const y =
                h/2+
                Math.sin(angle)*
                radius;


            ctx.fillStyle =
                rgba(
                    accent,
                    .10+
                    (
                        i%5
                    )*.015
                );


            ctx.beginPath();


            ctx.arc(
                x,
                y,
                2*
                (
                    w/
                    1280
                ),
                0,
                Math.PI*2
            );


            ctx.fill();

        }


        const image =
            getImageObject();


        if(
            image &&
            image.complete
        ){

            const bw =
                w*.25;

            const bh =
                h*.45;

            const x =
                w*.375;

            const y =
                h*.18;


            const scale =
                Math.min(
                    bw/
                    image.naturalWidth,
                    bh/
                    image.naturalHeight
                );


            const iw =
                image.naturalWidth*
                scale;


            const ih =
                image.naturalHeight*
                scale;


            ctx.save();


            ctx.globalAlpha =
                enter;


            roundRect(
                ctx,
                x,
                y,
                bw,
                bh,
                15
            );


            ctx.clip();


            ctx.drawImage(
                image,
                x+
                (
                    bw-iw
                )/2,
                y+
                (
                    bh-ih
                )/2,
                iw,
                ih
            );


            ctx.restore();

        }


        drawText(
            ctx,
            canvas,
            v.mainText,
            w/2,
            h*.72,
            Math.max(
                42,
                v.mainSize*.68
            ),
            accent,
            enter,
            v.mainSize*.25,
            900
        );

    }

}


/* =========================================================
   ROUNDED RECT
========================================================= */

function roundRect(
    ctx,
    x,
    y,
    width,
    height,
    radius
){

    const r =
        Math.min(
            radius,
            width/2,
            height/2
        );


    ctx.beginPath();


    ctx.moveTo(
        x+r,
        y
    );


    ctx.arcTo(
        x+width,
        y,
        x+width,
        y+height,
        r
    );


    ctx.arcTo(
        x+width,
        y+height,
        x,
        y+height,
        r
    );


    ctx.arcTo(
        x,
        y+height,
        x,
        y,
        r
    );


    ctx.arcTo(
        x,
        y,
        x+width,
        y,
        r
    );


    ctx.closePath();

}


/* =========================================================
   STUDIO LOOP
========================================================= */

function startStudio(){

    stopStudio();


    studioPlaying =
        true;

    studioLast =
        0;


    $("#pauseButton")
        .innerHTML = `
            <i class="fa-solid fa-pause"></i>
            PAUSE
        `;


    function frame(
        now
    ){

        if(
            !studioPage.classList.contains(
                "active"
            )
        ){

            studioFrame =
                null;

            return;

        }


        if(
            !studioLast
        ){

            studioLast =
                now;

        }


        const delta =
            Math.min(
                60,
                now-
                studioLast
            );


        studioLast =
            now;


        if(
            studioPlaying
        ){

            studioTime +=
                delta/
                1000;


            const duration =
                currentMotion()
                    .duration/
                1000;


            if(
                studioTime >
                duration
            ){

                studioTime =
                    0;

            }

        }


        fitCanvas(
            studioCanvas
        );


        renderMotion(
            studioCtx,
            studioCanvas,
            studioTime,
            currentMotion(),
            values()
        );


        const duration =
            currentMotion()
                .duration/
            1000;


        $("#studioTime")
            .textContent =
            `${studioTime.toFixed(2)}s / ${duration.toFixed(2)}s`;


        studioFrame =
            requestAnimationFrame(
                frame
            );

    }


    studioFrame =
        requestAnimationFrame(
            frame
        );

}


function stopStudio(){

    if(
        studioFrame
    ){

        cancelAnimationFrame(
            studioFrame
        );

    }


    studioFrame =
        null;

    studioLast =
        0;

}


function replayMotion(){

    studioTime =
        0;

    studioPlaying =
        true;

    startStudio();

}


function togglePause(){

    studioPlaying =
        !studioPlaying;


    $("#pauseButton")
        .innerHTML =
        studioPlaying

        ? `
            <i class="fa-solid fa-pause"></i>
            PAUSE
          `

        : `
            <i class="fa-solid fa-play"></i>
            PLAY
          `;

}




/* =========================================================
   STANDALONE CODE
========================================================= */

function standaloneCode(){

    const motion =
        currentMotion();


    const v =
        values();


    const image =
        uploadedImage
            ? JSON.stringify(
                uploadedImage
            )
            : "null";


    return `<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width,initial-scale=1.0"
>

<title>
${escapeHTML(
    motion.title
)}
 • YEADI X MOTION
</title>

<style>

html,body{
    margin:0;
    width:100%;
    height:100%;
    overflow:hidden;
    background:#06080c;
}

body{
    display:grid;
    place-items:center;
    font-family:Arial,sans-serif;
}

canvas{
    display:block;
    width:100vw;
    height:56.25vw;
    max-width:100vw;
    max-height:100vh;
}

</style>

</head>

<body>

<canvas
    id="canvas"
    width="1280"
    height="720"
></canvas>

<script>

const CONFIG =
${JSON.stringify(
    {
        kind:
            motion.kind,

        mainText:
            v.mainText,

        subtitle:
            v.subtitle,

        mainSize:
            v.mainSize,

        crossSize:
            v.crossSize,

        motionSize:
            v.motionSize,

        crossX:
            v.crossX,

        crossY:
            v.crossY,

        motionY:
            v.motionY,

        color:
            v.color,

        duration:
            motion.duration
    },
    null,
    2
)};

const USER_IMAGE =
${image};


const canvas =
document.getElementById("canvas");

const ctx =
canvas.getContext("2d");


function clamp(
    v,
    a,
    b
){

    return Math.max(
        a,
        Math.min(
            b,
            v
        )
    );

}


function ease(
    t
){

    return 1-
        Math.pow(
            1-t,
            3
        );

}


function rgba(
    hex,
    a
){

    const h =
        hex.replace(
            "#",
            ""
        );

    const n =
        parseInt(
            h,
            16
        );

    return "rgba("+
        ((n>>16)&255)+
        ","+
        ((n>>8)&255)+
        ","+
        (n&255)+
        ","+
        a+
        ")";

}


function text(
    value,
    x,
    y,
    size,
    color,
    alpha,
    blur
){

    ctx.save();

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.font =
        "900 "+
        size+
        "px Arial,sans-serif";

    ctx.fillStyle =
        color;

    ctx.globalAlpha =
        alpha;

    ctx.shadowColor =
        color;

    ctx.shadowBlur =
        blur;

    ctx.fillText(
        value,
        x,
        y
    );

    ctx.restore();

}


function background(){

    ctx.fillStyle =
        "#07090d";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


let image =
    null;


if(
    USER_IMAGE
){

    image =
        new Image();

    image.src =
        USER_IMAGE;

}


function draw(
    now
){

    const seconds =
        (
            now/
            1000
        ) %
        (
            CONFIG.duration/
            1000
        );


    const duration =
        CONFIG.duration/
        1000;


    const progress =
        clamp(
            seconds/
            duration,
            0,
            1
        );


    const w =
        canvas.width;

    const h =
        canvas.height;


    background();


    if(
        CONFIG.kind ===
        "cascade"
    ){

        const mainIn =
            ease(
                clamp(
                    progress/.30,
                    0,
                    1
                )
            );


        const xIn =
            ease(
                clamp(
                    (
                        progress-.16
                    )/.24,
                    0,
                    1
                )
            );


        const motionIn =
            ease(
                clamp(
                    (
                        progress-.41
                    )/.30,
                    0,
                    1
                )
            );


        text(
            CONFIG.mainText,
            w/2,
            h*.74-
            h*.34*
            mainIn,
            CONFIG.mainSize*
            (w/1280),
            CONFIG.color,
            mainIn,
            CONFIG.mainSize*
            .30
        );


        text(
            "X",
            w/2+
            CONFIG.crossX*
            (w/1280),
            h*.53+
            CONFIG.crossY*
            (h/720),
            CONFIG.crossSize,
            "#ffffff",
            xIn,
            CONFIG.crossSize*.25
        );


        text(
            CONFIG.subtitle,
            w/2,
            h*.67+
            CONFIG.motionY*
            (h/720),
            CONFIG.motionSize,
            "#e8ebef",
            motionIn,
            7
        );

    }


    if(
        CONFIG.kind ===
        "pulse"
    ){

        const pulse =
            .5+
            .5*
            Math.sin(
                seconds*9
            );


        ctx.save();

        ctx.translate(
            w/2,
            h*.48
        );

        ctx.scale(
            .90+
            .10*pulse,
            .90+
            .10*pulse
        );


        text(
            CONFIG.mainText,
            0,
            0,
            CONFIG.mainSize*
            (w/1280),
            CONFIG.color,
            1,
            25+
            pulse*20
        );


        ctx.restore();


        text(
            CONFIG.subtitle,
            w/2,
            h*.69+
            CONFIG.motionY*
            (h/720),
            CONFIG.motionSize,
            "#edf0f4",
            1,
            7
        );

    }


    requestAnimationFrame(
        draw
    );

}


requestAnimationFrame(
    draw
);

<\/script>



</body>
</html>`;

}


/* =========================================================
   COPY CODE
========================================================= */

async function copyCode(){

    const source =
        standaloneCode();


    try{

        await navigator.clipboard.writeText(
            source
        );


        showToast(
            "Standalone code copied."
        );

    }
    catch{

        const area =
            document.createElement(
                "textarea"
            );


        area.value =
            source;


        document.body.appendChild(
            area
        );


        area.select();


        document.execCommand(
            "copy"
        );


        area.remove();


        showToast(
            "Standalone code copied."
        );

    }

}


/* =========================================================
   CODE PREVIEW
========================================================= */

function showCodePreview(){

    $("#codePreview")
        .textContent =
        standaloneCode();


    $("#codeModal")
        .style.display =
        "flex";


    document.body.classList.add(
        "lock"
    );

}


function closeCodePreview(){

    $("#codeModal")
        .style.display =
        "none";


    document.body.classList.remove(
        "lock"
    );

}


/* =========================================================
   VIDEO RECORDING
   TRUE REAL-TIME 30 FPS
   STARTS AT EXACT 0
========================================================= */

function sleep(
    ms
){

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}


function supportedVideoMime(){

    const types = [

        "video/mp4;codecs=\"avc1.42E01E\"",

        "video/mp4",

        "video/webm;codecs=vp9",

        "video/webm;codecs=vp8",

        "video/webm"

    ];


    for(
        const type
        of types
    ){

        if(
            window.MediaRecorder &&
            MediaRecorder.isTypeSupported(
                type
            )
        ){

            return type;

        }

    }


    return "";

}


async function recordVideo(){

    if(
        !window.MediaRecorder ||
        !studioCanvas.captureStream
    ){

        showToast(
            "Video recording is not supported here."
        );

        return;

    }


    const motion =
        currentMotion();


    const durationSeconds =
        motion.duration/
        1000;


    fitCanvas(
        studioCanvas
    );


    /*
       Deterministic start frame:
       render t=0 BEFORE recording.
    */

    studioPlaying =
        false;


    studioTime =
        0;


    renderMotion(
        studioCtx,
        studioCanvas,
        0,
        motion,
        values()
    );


    /*
       captureStream(0) lets us manually
       request frames at exactly 30 FPS
       on browsers that support requestFrame().
    */

    let stream;


    try{

        stream =
            studioCanvas.captureStream(
                0
            );

    }
    catch{

        stream =
            studioCanvas.captureStream(
                30
            );

    }


    const track =
        stream
            .getVideoTracks()[0];


    const mime =
        supportedVideoMime();


    if(!mime){

        showToast(
            "No supported browser video format."
        );

        return;

    }


    const recorder =
        new MediaRecorder(
            stream,
            {
                mimeType:mime,

                videoBitsPerSecond:
                    8_000_000
            }
        );


    const chunks = [];


    recorder.ondataavailable =
        event => {

            if(
                event.data &&
                event.data.size
            ){

                chunks.push(
                    event.data
                );

            }

        };


    const stopped =
        new Promise(
            resolve => {

                recorder.onstop =
                    resolve;

            }
        );


    recorder.start(
        250
    );


    /*
       Give the recorder a moment to initialize,
       then request the EXACT zero frame.
    */

    await new Promise(
        resolve =>
            requestAnimationFrame(
                resolve
            )
    );


    renderMotion(
        studioCtx,
        studioCanvas,
        0,
        motion,
        values()
    );


    if(
        track &&
        typeof track.requestFrame ===
        "function"
    ){

        track.requestFrame();

    }


    showToast(
        "Recording 30 FPS from 0:00..."
    );


    const FPS =
        30;


    const totalFrames =
        Math.round(
            durationSeconds *
            FPS
        );


    const start =
        performance.now();


    for(
        let frame=1;
        frame<=totalFrames;
        frame++
    ){

        const target =
            start +
            (
                frame/
                FPS
            ) *
            1000;


        const wait =
            target -
            performance.now();


        if(
            wait > 0
        ){

            await sleep(
                wait
            );

        }


        const time =
            Math.min(
                durationSeconds,
                frame/FPS
            );


        renderMotion(
            studioCtx,
            studioCanvas,
            time,
            motion,
            values()
        );


        $("#studioTime")
            .textContent =
            `${time.toFixed(2)}s / ${durationSeconds.toFixed(2)}s`;


        if(
            track &&
            typeof track.requestFrame ===
            "function"
        ){

            track.requestFrame();

        }


    }


    /*
       Stop after the final frame has been sent.
    */

    await sleep(
        80
    );


    recorder.stop();


    await stopped;


    const isMP4 =
        mime.startsWith(
            "video/mp4"
        );


    const blob =
        new Blob(
            chunks,
            {
                type:
                    isMP4
                        ? "video/mp4"
                        : "video/webm"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        `${motion.id}.${
            isMP4
                ? "mp4"
                : "webm"
        }`;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    setTimeout(
        () => {

            URL.revokeObjectURL(
                url
            );

        },
        3000
    );


    stream
        .getTracks()
        .forEach(
            track =>
                track.stop()
        );


    studioTime =
        0;


    studioPlaying =
        true;


    startStudio();


    showToast(
        `Video saved • 30 FPS • ${
            isMP4
                ? "MP4"
                : "WEBM"
        }`
    );

}