/* =========================================================
   FUTURE PAGE FILENAMES (Mother Page only)
   These are kept as explicit names for the later external pages.
   This Mother Page does not require those files to render.
========================================================= */
const YEADI_PAGE_FILES = Object.freeze({
    about: "about.html",
    edit: "edit.html",
    admin: "admin.html",
    database: "database.html",
    more: "more.html",
    saved: "saved.html"
});

/* =========================================================
   MOTION DATABASE
========================================================= */

let MOTIONS = [

    {
        id:"cascade",

        title:"Cascading Identity",

        category:"Featured",

        tag:"Text / Glow / Clean",

        accent:"#00e5ff",

        duration:3200,

        kind:"cascade",

        image:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85",

        description:
        "A cinematic three-step identity reveal.",

        supports:{
            mainText:true,
            subtitle:true,
            mainSize:true,
            crossSize:true,
            motionSize:true,
            crossX:true,
            crossY:true,
            motionY:true,
            color:true,
            image:false
        },

        defaults:{
            mainText:"YEADI",
            subtitle:"MOTION",
            mainSize:86,
            crossSize:64,
            motionSize:23,
            crossX:0,
            crossY:0,
            motionY:0,
            color:"#00e5ff"
        }
    },


    {
        id:"neon",

        title:"Neon Pulse",

        category:"Neon",

        tag:"Pulse / Electric",

        accent:"#945cff",

        duration:3000,

        kind:"pulse",

        image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85",

        description:
        "A pulsing electric identity treatment.",

        supports:{
            mainText:true,
            subtitle:true,
            mainSize:true,
            crossSize:false,
            motionSize:true,
            crossX:false,
            crossY:false,
            motionY:true,
            color:true,
            image:false
        },

        defaults:{
            mainText:"NOVA",
            subtitle:"DIGITAL",
            mainSize:84,
            crossSize:64,
            motionSize:23,
            crossX:0,
            crossY:0,
            motionY:0,
            color:"#945cff"
        }
    },


    {
        id:"orbit",

        title:"Orbit Mark",

        category:"Logo",

        tag:"Orbit / Logo",

        accent:"#ffb51e",

        duration:3800,

        kind:"orbit",

        image:
        "https://images.unsplash.com/photo-1447433819943-74a20887a81e?auto=format&fit=crop&w=1000&q=85",

        description:
        "An orbital reveal with optional logo image.",

        supports:{
            mainText:true,
            subtitle:false,
            mainSize:true,
            crossSize:false,
            motionSize:false,
            crossX:false,
            crossY:false,
            motionY:false,
            color:true,
            image:true
        },

        defaults:{
            mainText:"ORBIT",
            subtitle:"",
            mainSize:82,
            crossSize:64,
            motionSize:23,
            crossX:0,
            crossY:0,
            motionY:0,
            color:"#ffb51e"
        }
    },


    {
        id:"quantum",

        title:"Quantum Reveal",

        category:"Minimal",

        tag:"Line / Reveal",

        accent:"#22d7ff",

        duration:3500,

        kind:"quantum",

        image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=85",

        description:
        "A minimal line-driven reveal.",

        supports:{
            mainText:true,
            subtitle:true,
            mainSize:true,
            crossSize:false,
            motionSize:true,
            crossX:false,
            crossY:false,
            motionY:true,
            color:true,
            image:false
        },

        defaults:{
            mainText:"QUANTUM",
            subtitle:"SERIES 01",
            mainSize:80,
            crossSize:64,
            motionSize:22,
            crossX:0,
            crossY:0,
            motionY:0,
            color:"#22d7ff"
        }
    },


    {
        id:"prism",

        title:"Prism Shift",

        category:"Abstract",

        tag:"Prism / Chromatic",

        accent:"#ff478d",

        duration:3400,

        kind:"prism",

        image:
        "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1000&q=85",

        description:
        "Layered chromatic motion with shifting planes.",

        supports:{
            mainText:true,
            subtitle:true,
            mainSize:true,
            crossSize:false,
            motionSize:true,
            crossX:false,
            crossY:false,
            motionY:true,
            color:true,
            image:false
        },

        defaults:{
            mainText:"PRISM",
            subtitle:"SHIFT",
            mainSize:88,
            crossSize:64,
            motionSize:23,
            crossX:0,
            crossY:0,
            motionY:0,
            color:"#ff478d"
        }
    },


    {
        id:"profile",

        title:"Profile Rise",

        category:"Photo",

        tag:"Picture / Nameplate",

        accent:"#38e58e",

        duration:3900,

        kind:"profile",

        image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85",

        description:
        "A profile identity animation with a custom picture.",

        supports:{
            mainText:true,
            subtitle:true,
            mainSize:true,
            crossSize:false,
            motionSize:true,
            crossX:false,
            crossY:false,
            motionY:true,
            color:true,
            image:true
        },

        defaults:{
            mainText:"YOUR NAME",
            subtitle:"CREATOR",
            mainSize:72,
            crossSize:64,
            motionSize:21,
            crossX:0,
            crossY:0,
            motionY:0,
            color:"#38e58e"
        }
    },


    {
        id:"scan",

        title:"Signal Scan",

        category:"Glitch",

        tag:"Scan / Tech",

        accent:"#ff3448",

        duration:3100,

        kind:"scan",

        image:
        "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=1000&q=85",

        description:
        "A technical scan-line identity animation.",

        supports:{
            mainText:true,
            subtitle:true,
            mainSize:true,
            crossSize:false,
            motionSize:true,
            crossX:false,
            crossY:false,
            motionY:true,
            color:true,
            image:false
        },

        defaults:{
            mainText:"SIGNAL",
            subtitle:"ONLINE",
            mainSize:88,
            crossSize:64,
            motionSize:22,
            crossX:0,
            crossY:0,
            motionY:0,
            color:"#ff3448"
        }
    },


    {
        id:"kinetic",

        title:"Kinetic Type",

        category:"Typography",

        tag:"Letters / Motion",

        accent:"#f5c430",

        duration:3000,

        kind:"kinetic",

        image:
        "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=85",

        description:
        "A kinetic typography reveal.",

        supports:{
            mainText:true,
            subtitle:true,
            mainSize:true,
            crossSize:false,
            motionSize:true,
            crossX:false,
            crossY:false,
            motionY:true,
            color:true,
            image:false
        },

        defaults:{
            mainText:"KINETIC",
            subtitle:"TYPE SYSTEM",
            mainSize:88,
            crossSize:64,
            motionSize:22,
            crossX:0,
            crossY:0,
            motionY:0,
            color:"#f5c430"
        }
    },


    {
        id:"ember",

        title:"Ember Logo",

        category:"Logo",

        tag:"Particles / Logo",

        accent:"#ff6e2e",

        duration:3600,

        kind:"ember",

        image:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",

        description:
        "A warm particle-driven logo animation.",

        supports:{
            mainText:true,
            subtitle:false,
            mainSize:true,
            crossSize:false,
            motionSize:false,
            crossX:false,
            crossY:false,
            motionY:false,
            color:true,
            image:true
        },

        defaults:{
            mainText:"EMBER",
            subtitle:"",
            mainSize:82,
            crossSize:64,
            motionSize:23,
            crossX:0,
            crossY:0,
            motionY:0,
            color:"#ff6e2e"
        }
    },


    {
        id:"empty",

        title:"Empty Motion Slot",

        category:"Blank",

        tag:"Ready for Your Code",

        accent:"#55555f",

        duration:3000,

        kind:"empty",

        image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",

        description:
        "A reserved empty slot for a future animation.",

        supports:{
            mainText:false,
            subtitle:false,
            mainSize:false,
            crossSize:false,
            motionSize:false,
            crossX:false,
            crossY:false,
            motionY:false,
            color:false,
            image:false
        },

        defaults:{
            mainText:"",
            subtitle:"",
            mainSize:80,
            crossSize:64,
            motionSize:23,
            crossX:0,
            crossY:0,
            motionY:0,
            color:"#55555f"
        }
    }

];


/* =========================================================
   SEARCH TAGS
========================================================= */

const SEARCH_TAGS = [
    "YouTube",
    "YouTube Video Analysis",
    "Website Analysis",
    "Facebook Video Analysis",
    "Intro Animation",
    "Fade In",
    "Fade Out",
    "Slide Down",
    "Unique",
    "Action",
    "Logo",
    "Typography",
    "Minimal",
    "Abstract",
    "Photo",
    "Glitch",
    "Neon",
    "Particles"
];

const MOTION_TAG_MAP = {
    cascade:[
        "YouTube",
        "YouTube Video Analysis",
        "Website Analysis",
        "Facebook Video Analysis",
        "Intro Animation",
        "Fade In",
        "Fade Out",
        "Slide Down",
        "Unique",
        "Action"
    ],
    neon:[
        "YouTube",
        "Facebook Video Analysis",
        "Intro Animation",
        "Fade In",
        "Action",
        "Unique",
        "Neon"
    ],
    orbit:[
        "Website Analysis",
        "YouTube Video Analysis",
        "Intro Animation",
        "Fade In",
        "Slide Down",
        "Unique",
        "Logo"
    ],
    quantum:[
        "Website Analysis",
        "Intro Animation",
        "Fade In",
        "Fade Out",
        "Slide Down",
        "Unique",
        "Minimal"
    ],
    prism:[
        "YouTube",
        "Facebook Video Analysis",
        "Intro Animation",
        "Fade Out",
        "Slide Down",
        "Unique",
        "Abstract"
    ],
    profile:[
        "YouTube",
        "Website Analysis",
        "Facebook Video Analysis",
        "Intro Animation",
        "Slide Down",
        "Action",
        "Photo"
    ],
    scan:[
        "YouTube Video Analysis",
        "Website Analysis",
        "Facebook Video Analysis",
        "Intro Animation",
        "Action",
        "Unique",
        "Glitch"
    ],
    kinetic:[
        "YouTube",
        "Facebook Video Analysis",
        "Intro Animation",
        "Fade In",
        "Slide Down",
        "Action",
        "Typography"
    ],
    ember:[
        "YouTube",
        "Website Analysis",
        "Intro Animation",
        "Fade In",
        "Fade Out",
        "Unique",
        "Logo",
        "Particles"
    ],
    empty:[
        "Unique",
        "Action"
    ]
};


function motionSearchText(motion){

    return [
        motion.title,
        motion.category,
        motion.tag,
        motion.description,
        ...(MOTION_TAG_MAP[motion.id] || [])
    ]
    .join(" ")
    .toLowerCase();
}


function matchesMotionSearch(motion,q){

    return motionSearchText(motion)
        .includes(
            String(q || "")
                .trim()
                .toLowerCase()
        );

}


/* =========================================================
   STATE
========================================================= */

let currentMotionId =
    "cascade";

let motionValues = {};

let currentCategory =
    "All";

let currentSearch =
    "";

let saved =
    new Set(
        JSON.parse(
            localStorage.getItem(
                "yeadiMotionSaved"
            ) || "[]"
        )
    );

let uploadedImage =
    null;

let uploadedImageName =
    "";

let studioPlaying =
    true;

let studioTime =
    0;

let studioFrame =
    null;

let studioLast =
    0;

let heroTime =
    0;

let heroFrame =
    null;

let toastTimer =
    null;


/* =========================================================
   INIT VALUES
========================================================= */

MOTIONS.forEach(
    motion => {

        motionValues[
            motion.id
        ] = {
            ...motion.defaults
        };

    }
);


/* =========================================================
   DOM
========================================================= */

const $ =
    selector =>
        document.querySelector(
            selector
        );

const intro =
    $("#intro");

const header =
    $("#header");

const homePage =
    $("#homePage");

const aboutPage =
    $("#aboutPage");

const savedPage =
    $("#savedPage");

const allMotionsPage =
    $("#allMotionsPage");

const studioPage =
    $("#studioPage");

const motionRow =
    $("#motionRow");

const filters =
    $("#filters");

const categoryButtons =
    $("#categoryButtons");

const searchTags =
    $("#searchTags");

const savedGrid =
    $("#savedGrid");


const allMotionsGrid =
    $("#allMotionsGrid");

const allMotionFilters =
    $("#allMotionFilters");

const savedCount =
    $("#savedCount");

const heroCanvas =
    $("#heroCanvas");

const heroCtx =
    heroCanvas.getContext(
        "2d"
    );

const studioCanvas =
    $("#studioCanvas");

const studioCtx =
    studioCanvas.getContext(
        "2d"
    );

const toast =
    $("#toast");


const quickMenu =
    $("#quickMenu");

const reportModal =
    $("#reportModal");

const reportSubmitButton =
    $("#reportSubmitButton");

const reportContext =
    $("#reportContext");

const globalBackButton =
    $("#globalBackButton");

const stepsPage =
    $("#stepsPage");

const heroLine1 =
    $("#heroLine1");

const heroLine2 =
    $("#heroLine2");

const heroLine3 =
    $("#heroLine3");

const moreInfoTitle =
    $("#moreInfoTitle");

const moreInfoBody =
    $("#moreInfoBody");

const moreInfoBullets =
    $("#moreInfoBullets");

const stepsTitle =
    $("#stepsTitle");

const stepsIntro =
    $("#stepsIntro");

const stepsGrid =
    $("#stepsGrid");

let HERO_SLIDES = [
    {
        line1:"Make the",
        line2:"intro.",
        line3:"Make it yours."
    },
    {
        line1:"Build the",
        line2:"motion.",
        line3:"Make it yours."
    },
    {
        line1:"Shape your",
        line2:"idea.",
        line3:"Use your motion."
    },
    {
        line1:"Create the",
        line2:"story.",
        line3:"Move it forward."
    }
];

let heroTextIndex = -1;
let cardPreview = {
    card:null,
    frame:null,
    started:0
};

const EMPTY_PIXEL =
    "data:image/gif;base64,R0lGODlhAQABAAAAACw=";


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(
    value
){

    return String(
        value ?? ""
    )
    .replaceAll(
        "&",
        "&amp;"
    )
    .replaceAll(
        "<",
        "&lt;"
    )
    .replaceAll(
        ">",
        "&gt;"
    )
    .replaceAll(
        '"',
        "&quot;"
    )
    .replaceAll(
        "'",
        "&#039;"
    );

}


function clamp(
    value,
    min,
    max
){

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

}


function lerp(
    a,
    b,
    t
){

    return a +
        (
            b-a
        ) *
        t;

}


function easeOutCubic(
    t
){

    return 1 -
        Math.pow(
            1-t,
            3
        );

}


function easeInOutCubic(
    t
){

    return t < .5
        ? 4*t*t*t
        : 1 -
            Math.pow(
                -2*t+2,
                3
            ) /
            2;

}


function getMotion(
    id
){

    return MOTIONS.find(
        motion =>
            motion.id === id
    );

}


function currentMotion(){

    return getMotion(
        currentMotionId
    );

}


function values(){

    return motionValues[
        currentMotionId
    ];

}


function showToast(
    message
){

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================================================
   COLOR
========================================================= */

function rgba(
    hex,
    alpha
){

    let value =
        String(
            hex
        )
        .replace(
            "#",
            ""
        );

    if(
        value.length !==
        6
    ){

        return `
            rgba(
                255,
                255,
                255,
                ${alpha}
            )
        `.replaceAll(
            /\s+/g,
            " "
        );

    }

    const number =
        parseInt(
            value,
            16
        );

    const r =
        (
            number >>
            16
        ) &
        255;

    const g =
        (
            number >>
            8
        ) &
        255;

    const b =
        number &
        255;

    return `
        rgba(
            ${r},
            ${g},
            ${b},
            ${alpha}
        )
    `.replaceAll(
        /\s+/g,
        " "
    );

}

/* =========================================================
   MOTHER PAGE BOOTSTRAP
========================================================= */
function initMotherPage(){
    saveState();
    buildFilters();
    buildSearchTags();
    renderCards();
    renderSaved();
    renderAllMotions();
    renderMoreInfo();
    renderSteps();

    if(!history.state){
        history.replaceState({route:"home"}, "", "#home");
    }

    syncGlobalBackButton();
    fitCanvas(heroCanvas);
    fitCanvas(studioCanvas);
    startHero();

    setTimeout(() => {
        if(intro) intro.classList.add("hide");
    },3300);
}

if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initMotherPage, {once:true});
}else{
    initMotherPage();
}

window.yeadiSiteContent = {
    moreInformation: {},
    training: {}
};

window.yeadiApplyRemoteContent = function(payload){

    const data =
        payload || {};

    window.yeadiSiteContent = {
        ...window.yeadiSiteContent,
        ...data
    };

    if(
        Array.isArray(data.heroSlides) &&
        data.heroSlides.length
    ){
        HERO_SLIDES =
            data.heroSlides
                .map(slide => ({
                    line1:String(slide.line1 || ""),
                    line2:String(slide.line2 || ""),
                    line3:String(slide.line3 || "")
                }))
                .filter(slide =>
                    slide.line1 ||
                    slide.line2 ||
                    slide.line3
                );

        if(!HERO_SLIDES.length){
            HERO_SLIDES = [
                {
                    line1:"Make the",
                    line2:"intro.",
                    line3:"Make it yours."
                }
            ];
        }

        heroTextIndex = -1;
    }

    if(
        moreInfoTitle
    ){
        renderMoreInfo();
    }

    if(
        stepsTitle
    ){
        renderSteps();
    }
};

window.yeadiApplyRemoteMotions = function(remoteList){

    if(
        !Array.isArray(remoteList) ||
        !remoteList.length
    ){
        return;
    }

    const byId =
        new Map(
            MOTIONS.map(
                motion => [
                    String(motion.id),
                    motion
                ]
            )
        );

    remoteList.forEach(remote => {

        if(
            !remote ||
            !remote.id
        ){
            return;
        }

        const normalized = {
            ...remote,
            id:String(remote.id),
            duration:Number(remote.duration || 3000),
            supports:remote.supports || {
                mainText:true,
                subtitle:true,
                mainSize:false,
                crossSize:false,
                motionSize:false,
                crossX:false,
                crossY:false,
                motionY:false,
                color:true,
                image:false
            },
            defaults:remote.defaults || {
                mainText:remote.title || "MOTION",
                subtitle:remote.category || "MOTION",
                color:remote.accent || "#00e5ff"
            }
        };

        byId.set(
            normalized.id,
            normalized
        );

    });

    MOTIONS =
        Array.from(
            byId.values()
        );

    buildFilters();
    renderCards();
    renderSaved();
    renderAllMotions();
};

/* =========================================================
   FIREBASE PUBLIC READ + REPORTS
========================================================= */
async function bootFirebase(){
    try{
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js");
        const { getFirestore, addDoc, collection, serverTimestamp, getDoc, getDocs, doc } =
            await import("https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js");

        const firebaseConfig = {
            apiKey: "AIzaSyByRA1OkAK2217KWLrx1NqfOYbQ4EdjbIY",
            authDomain: "yeadi-stream.firebaseapp.com",
            projectId: "yeadi-stream",
            storageBucket: "yeadi-stream.firebasestorage.app",
            messagingSenderId: "394984956630",
            appId: "1:394984956630:web:4483e209c4ea285b189f77",
            measurementId: "G-ZG6WRZMKQP"
        };

        const firebaseApp = initializeApp(firebaseConfig);
        const db = getFirestore(firebaseApp);

        try{
            const snap = await getDoc(doc(db,"siteContent","mother"));
            if(snap.exists()) window.yeadiApplyRemoteContent(snap.data());
        }catch(error){
            console.warn("YEADI siteContent read skipped:",error);
        }

        try{
            const snap = await getDocs(collection(db,"motions"));
            const remote=[];
            snap.forEach(item => remote.push({id:item.id,...item.data()}));
            window.yeadiApplyRemoteMotions(remote);
        }catch(error){
            console.warn("YEADI motions read skipped:",error);
        }

        window.yeadiSubmitReport = async function(payload){
            return addDoc(collection(db,"reports"),{
                reason:String(payload?.reason || "Other"),
                message:String(payload?.message || ""),
                route:String(payload?.context?.route || "unknown"),
                path:String(payload?.context?.path || window.location.pathname),
                url:String(payload?.context?.url || window.location.href),
                motionId:payload?.context?.motionId || null,
                motionTitle:payload?.context?.motionTitle || null,
                userAgent:String(payload?.context?.userAgent || navigator.userAgent),
                clientTimestamp:payload?.context?.timestamp || new Date().toISOString(),
                createdAt:serverTimestamp()
            });
        };
    }catch(error){
        console.warn("YEADI Firebase module skipped:",error);
    }
}

if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bootFirebase, {once:true});
}else{
    bootFirebase();
}