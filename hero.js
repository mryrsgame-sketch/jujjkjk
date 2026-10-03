/* =========================================================
   HERO CONNECTED 3 STEP PREVIEW
========================================================= */

function renderHero(
    time
){

    const w = heroCanvas.width;
    const h = heroCanvas.height;
    const scale = w / 1280;
    const total = 6.4;
    const t = time % total;

    const ctx = heroCtx;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0,0,w,h);

    /* Deep cinematic background */
    const bg = ctx.createRadialGradient(
        cx,
        cy * .82,
        20,
        cx,
        cy,
        Math.max(w,h) * .72
    );
    bg.addColorStop(0,"#13151d");
    bg.addColorStop(.45,"#090b11");
    bg.addColorStop(1,"#050506");
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,w,h);

    /* Slow moving perspective grid */
    ctx.save();
    ctx.globalAlpha = .13;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(1,scale);
    const drift = (t * 22 * scale) % (38 * scale);
    for(let i=-12;i<=12;i++){
        const x = cx + i * 58 * scale + drift - 40 * scale;
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(cx + (x-cx)*.2,h);
        ctx.stroke();
    }
    for(let i=0;i<11;i++){
        const y = i * 42 * scale + drift;
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
        ctx.stroke();
    }
    ctx.restore();

    /* Orbiting light rings */
    const pulse = (Math.sin(t * 1.7) + 1) / 2;
    ctx.save();
    ctx.translate(cx,cy);
    ctx.rotate(t * .38);
    [170,240,315].forEach((r,idx) => {
        ctx.globalAlpha = .10 + pulse * .09 - idx * .018;
        ctx.strokeStyle = idx === 1 ? "#ff3348" : "#67e8ff";
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.ellipse(0,0,r*scale,(r*.34)*scale,0,0,Math.PI*2);
        ctx.stroke();
    });
    ctx.restore();

    /* Three motion phases */
    const phase = t / total;
    const ease = v => 1 - Math.pow(1-clamp(v,0,1),3);

    const leftP = ease(Math.min(1,t/1.25));
    const centerP = ease(Math.max(0,Math.min(1,(t-1.0)/1.45)));
    const rightP = ease(Math.max(0,Math.min(1,(t-2.2)/1.35)));
    const exitP = ease(Math.max(0,Math.min(1,(t-5.2)/1.2)));

    /* side labels */
    ctx.textBaseline = "middle";
    ctx.font = `800 ${14*scale}px Inter, Arial, sans-serif`;
    ctx.letterSpacing = `${3*scale}px`;

    const drawLabel = (label,x,y,alpha,color) => {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 18 * scale;
        ctx.textAlign = "center";
        ctx.fillText(label,x,y);
        ctx.restore();
    };

    drawLabel("INTRO",lerp(-80*scale,cx*.55,leftP),h*.76,leftP*.75,"#747780");
    drawLabel("CREATE",lerp(w+80*scale,cx*1.45,rightP),h*.22,rightP*.72,"#747780");

    /* Multi-style text animation showcase. The preview cycles through
       several distinct text-animation treatments instead of showing one
       fixed reveal. Each 3-second hero slide uses a different style. */
    const slideIndex = Math.floor((heroTime / 3) % HERO_SLIDES.length);
    const currentSlide = HERO_SLIDES[slideIndex] || {};
    const previewWord = String(currentSlide.line2 || "YEADI").trim() || "YEADI";
    const previewSub = String(currentSlide.line3 || "MOTION").trim() || "MOTION";
    const wordY = cy + Math.sin(t*1.25) * 4 * scale;
    const wordAlpha = centerP * (1-exitP*.92);
    const local = (heroTime % 3) / 3;
    const mode = slideIndex % 5;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if(mode === 0){
        // Soft fade + upward rise
        const p = ease(local);
        ctx.globalAlpha = wordAlpha * p;
        ctx.font = `900 ${Math.max(30,Math.min(92,88*scale))}px Inter, Arial, sans-serif`;
        ctx.fillStyle = "#f8f8fa";
        ctx.shadowColor = "#44e9ff";
        ctx.shadowBlur = 28 * scale;
        ctx.fillText(previewWord,cx,wordY + lerp(38*scale,-10*scale,p));

    }else if(mode === 1){
        // Elastic scale-in
        const p = ease(clamp(local*1.15,0,1));
        const scaleIn = .72 + .28*p;
        ctx.translate(cx,wordY - 8*scale);
        ctx.scale(scaleIn,scaleIn);
        ctx.globalAlpha = wordAlpha * p;
        ctx.font = `900 ${Math.max(30,Math.min(92,88*scale))}px Inter, Arial, sans-serif`;
        ctx.fillStyle = "#f8f8fa";
        ctx.shadowColor = "#945cff";
        ctx.shadowBlur = 32 * scale;
        ctx.fillText(previewWord,0,0);

    }else if(mode === 2){
        // Tracking / letter-spread reveal
        const p = ease(clamp(local*1.18,0,1));
        const spread = lerp(26*scale,0,p);
        ctx.globalAlpha = wordAlpha * p;
        ctx.font = `900 ${Math.max(28,Math.min(86,82*scale))}px Inter, Arial, sans-serif`;
        ctx.fillStyle = "#f8f8fa";
        ctx.shadowColor = "#ff3448";
        ctx.shadowBlur = 26 * scale;
        const chars = [...previewWord];
        const widths = chars.map(ch => ctx.measureText(ch).width);
        const total = widths.reduce((a,b)=>a+b,0) + spread*Math.max(0,chars.length-1);
        let x = cx - total/2;
        chars.forEach((ch,i)=>{
            const xx = x + widths[i]/2;
            const yy = wordY - 10*scale + Math.sin((i+1)*.7 + t*3)*2*scale;
            ctx.fillText(ch,xx,yy);
            x += widths[i] + spread;
        });

    }else if(mode === 3){
        // Split / wipe reveal
        const p = ease(clamp(local*1.1,0,1));
        ctx.globalAlpha = wordAlpha * p;
        ctx.font = `900 ${Math.max(30,Math.min(92,88*scale))}px Inter, Arial, sans-serif`;
        ctx.fillStyle = "#f8f8fa";
        ctx.shadowColor = "#44e9ff";
        ctx.shadowBlur = 30 * scale;
        ctx.save();
        ctx.beginPath();
        const clipW = Math.max(1, w * p);
        ctx.rect(cx-clipW/2,0,clipW,h);
        ctx.clip();
        ctx.fillText(previewWord,cx - (1-p)*90*scale,wordY - 10*scale);
        ctx.restore();

    }else{
        // Blur-like glow pulse with subtitle sweep
        const p = ease(clamp(local*1.15,0,1));
        const pulse2 = (Math.sin(local*Math.PI*2)+1)/2;
        ctx.globalAlpha = wordAlpha * p;
        ctx.font = `900 ${Math.max(30,Math.min(92,88*scale))}px Inter, Arial, sans-serif`;
        ctx.fillStyle = "#f8f8fa";
        ctx.shadowColor = "#62e7ff";
        ctx.shadowBlur = (24 + 18*pulse2) * scale;
        ctx.fillText(previewWord,cx,wordY - 10*scale);
        ctx.globalAlpha = wordAlpha * p * .72;
        ctx.font = `800 ${Math.max(12,22*scale)}px Inter, Arial, sans-serif`;
        ctx.fillStyle = "#ff3448";
        ctx.shadowColor = "#ff3448";
        ctx.shadowBlur = 16 * scale;
        ctx.fillText(previewSub,cx,wordY + 40*scale);
    }

    // Always show a small brand mark beneath the animated text.
    ctx.globalAlpha = wordAlpha * .88;
    ctx.font = `900 ${Math.max(18,34*scale)}px Inter, Arial, sans-serif`;
    ctx.fillStyle = "#ff3448";
    ctx.shadowColor = "#ff3448";
    ctx.shadowBlur = 22 * scale;
    ctx.fillText("X",cx,wordY + 66*scale);
    ctx.restore();

    /* Sweeping action line */
    const sweep = ((t*0.82) % 1.4) - .2;
    if(sweep < 1){
        const sx = -w*.2 + w*1.4*sweep;
        const line = ctx.createLinearGradient(sx-w*.16,0,sx+w*.16,0);
        line.addColorStop(0,"rgba(255,255,255,0)");
        line.addColorStop(.5,"rgba(75,231,255,.95)");
        line.addColorStop(1,"rgba(255,52,72,0)");
        ctx.save();
        ctx.globalAlpha = .7;
        ctx.fillStyle = line;
        ctx.fillRect(sx,h*.66,Math.max(2,5*scale),h*.006);
        ctx.restore();
    }

    /* Particle halo */
    for(let i=0;i<26;i++){
        const a = i * 0.43 + t * (0.55 + (i%3)*.08);
        const r = (120 + (i%5)*28 + Math.sin(t*1.2+i)*10) * scale;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r * .42;
        const apha = .12 + .1*((Math.sin(a*1.7)+1)/2);
        ctx.beginPath();
        ctx.fillStyle = i%4 === 0 ? "#ff3448" : "#62e7ff";
        ctx.globalAlpha = apha;
        ctx.arc(x,y,Math.max(1.5,3.2*scale),0,Math.PI*2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;

    if(
        slideIndex !==
        heroTextIndex
    ){
        heroTextIndex =
            slideIndex;

        const slide =
            HERO_SLIDES[slideIndex];

        [heroLine1,heroLine2,heroLine3]
            .forEach(el => {
                if(el){
                    el.classList.add("swap-out");
                }
            });

        setTimeout(() => {

            if(heroLine1){
                heroLine1.textContent =
                    slide.line1 || "";
            }

            if(heroLine2){
                heroLine2.textContent =
                    slide.line2 || "";
            }

            if(heroLine3){
                heroLine3.textContent =
                    slide.line3 || "";
            }

            [heroLine1,heroLine2,heroLine3]
                .forEach(el => {
                    if(el){
                        el.classList.remove("swap-out");
                    }
                });

        },180);
    }

    const stage =
        t < 1.4 ? 1 :
        t < 3.0 ? 2 :
        t < 5.2 ? 3 : 4;

    ["heroBar1","heroBar2","heroBar3"].forEach((id,index) => {
        const el = $("#"+id);
        if(el){
            el.classList.toggle("active",Math.min(stage,3) === index+1);
        }
    });

    $("#heroTime").textContent =
        `${t.toFixed(1)}s`;

}



/* =========================================================
   HERO LOOP
========================================================= */

function startHero(){

    if(
        heroFrame
    ){

        cancelAnimationFrame(
            heroFrame
        );

    }


    let previous =
        0;


    function frame(
        now
    ){

        if(
            !previous
        ){

            previous =
                now;

        }


        heroTime +=
            (
                now-
                previous
            )/
            1000;


        previous =
            now;


        fitCanvas(
            heroCanvas
        );


        renderHero(
            heroTime
        );


        heroFrame =
            requestAnimationFrame(
                frame
            );

    }


    heroFrame =
        requestAnimationFrame(
            frame
        );

}