const majomfejSzel = 80;
const majomfejMag = 80;
const canvasSzel = 500;
const canvasMag = 500;
let tickID;
const g = 98.1;
let deltaTime = 0;
let elobb;
const akadalySzel = 20;
const akadalyMag = 50;

const BLUE = "rgb(0, 0, 255)";
const WHITE = "rgb(255, 255, 255)";
const LIGHTBLUE = "rgb(0, 255, 255)";
const GRAY = "rgb(67, 67, 67)";

const majomfejImg = new Image()
majomfejImg.src = "kepek/majomfej.png";
/*
const canvas = document.getElementById("majomCanvas");
canvas.style.width = `${canvasSzel}px`;
canvas.style.height = `${canvasMag}px`;
const ctx = canvas.getContext("2d");
*/
const ugrasGomb = document.getElementById("ugrasGomb");
//const uvoltesGomb = document.getElementById("uvoltesGomb");
const jatekGomb = document.getElementById("jatekGomb")

const uvoltesAudiok = document.getElementById("uvoltesAudiok").children;
const uvoltesAudio = uvoltesAudiok[0];
const soundBoard = document.getElementById("soundBoard");
const uvoltesTablazat = document.getElementById("uvoltesTablazat")
const vonal = document.getElementById("vonal");
const gombSzamInput = document.getElementById("gombSzam");
const csuszka = document.getElementById("csuszka");
//const sorok = uvoltesTablazat.children[0].children;
let lenyomva = []

let majomfejX = 150;
let majomfejY = canvasMag - majomfejMag;
let deltaY = 10;
let deltaX = 90;
let ugorhat = true;
let akadalyok = [canvasSzel - 50];
let tavolsag = Math.floor(Math.random() * 300) + 200;
/*
majomfejImg.addEventListener("load", function() {
    majomfejImg.style.width = `${majomfejSzel}px`;
    majomfejImg.style.height = `${majomfejMag}px`;
    canvas.width = majomfejImg.width * canvasSzel / majomfejSzel;
    canvas.height = majomfejImg.height * canvasMag / majomfejMag;
    draw();
    elobb = Date.now();
    //tickID = setInterval(tick, 5);
});
*/
/*
uvoltesGomb.addEventListener("click", function() {
    uvoltesAudio.play();
})
*/

let gombSzam = 10;
const gombSzel = 20;
const gombMag = 10;
let gombok = [];
let minBal = 1e5;
let maxJobb = -1e5;

gombSzamInput.addEventListener("input", function() {
    gombSzam = gombSzamInput.value;
    setUvoltes();
});

setUvoltes();

function setUvoltes() {
    lenyomva = []
    gombok = []
    minBal = 1e5;
    maxJobb = -1e5;
    uvoltesTablazat.innerHTML = "";
    for(let j = 0; j < uvoltesAudiok.length; j++) {
        lenyomva.push([]);
        gombok.push([]);
        const sor = document.createElement("tr");
        uvoltesTablazat.append(sor);
        const kepTd = document.createElement("td");
        sor.append(kepTd)
        const kep = document.createElement("img");
        kepTd.append(kep);
        kep.src = "kepek/majomfej.png";
        kep.style.width = `${gombSzel}px`;
        kep.style.height = `${gombSzel}px`;
        kep.style.verticalAlign = "middle";
        kep.addEventListener("click", function() {
            console.log("kep");
            uvoltesAudiok[j].currentTime = 0;
            uvoltesAudiok[j].play();
        });
        for(let i = 0; i < gombSzam; i++) {
            const gomb = document.createElement("button");
            gombok[j].push(gomb);
            const td = document.createElement("td");
            sor.append(td);
            td.append(gomb);
            lenyomva[j].push(false);
            gomb.style.width = `${gombSzel}px`;
            gomb.style.height = `${gombMag}px`;
            gomb.style.background = GRAY;
            gomb.style.verticalAlign = "middle";
            gomb.style.borderStyle = "none";
            const rect = gomb.getBoundingClientRect();
            minBal = Math.min(minBal, rect.left);
            maxJobb = Math.max(maxJobb, rect.right);
            gomb.addEventListener("click", function() {
                if(lenyomva[j][i]) gomb.style.background = GRAY;
                else gomb.style.background = BLUE;
                lenyomva[j][i] = !lenyomva[j][i];
            });
        }
    }

    const divRect = soundBoard.getBoundingClientRect();
    vonal.style.height = `${divRect.bottom - divRect.top}px`;
    vonal.style.left = `${minBal}px`;
    soundBoard.style.width = `${Math.max(divRect.right - divRect.left, maxJobb - divRect.left + 3)}px`;

    console.log(csuszka.style.marginLeft);
    csuszka.style.marginLeft = `${minBal - 15}px`;
    csuszka.style.width = `${maxJobb - minBal + 15}px`;
}

let index = 0;
let hangID;
let vonalID;
let vonalIdo = 0;
let vonalElobb;


jatekGomb.addEventListener("click", function() {
    index = 0;
    elobb = Date.now();
    clearInterval(hangID);
    hangID = setInterval(hangTick, uvoltesAudio.duration * 1000);
    clearInterval(vonalID);
    setTimeout(function() {
        vonalIdo = 0;
        vonalElobb = Date.now();
        vonalID = setInterval(vonalTick, 0);
    }, uvoltesAudio.duration * 1000);
});

csuszka.addEventListener("input", function() {
    vonal.style.left = `${(maxJobb - minBal) * csuszka.value + minBal}px`;
});

function hangTick() {
    if(index >= lenyomva[0].length) clearInterval(hangID);
    else {
        for(let i = 0; i < uvoltesAudiok.length; i++) {
            if(lenyomva[i][index]) {
                uvoltesAudiok[i].currentTime = 0;
                uvoltesAudiok[i].play();
                gombok[i][index].style.background = LIGHTBLUE;
            }
        }
    }
    for(let i = 0; i < uvoltesAudiok.length; i++) if(index > 0) if(lenyomva[i][index - 1]) gombok[i][index - 1].style.background = BLUE;
    index++;
}

function vonalTick() {
    vonalIdo += (Date.now() - vonalElobb) / 1000;
    vonalElobb = Date.now();
    const teljesIdo = lenyomva[0].length * uvoltesAudio.duration;
    const szel = maxJobb - minBal;
    if(vonalIdo > teljesIdo) {
        clearInterval(vonalID);
        //vonal.style.display = "none";
    } else {
        vonal.style.left = `${szel * vonalIdo / teljesIdo + minBal}px`;
        //vonal.style.display = "flex";
    }
}
/*
ugrasGomb.addEventListener("click", function() {
    if(!ugorhat) return;
    deltaY = -150;
    ugorhat = false;
    uvoltesAudio.play();
});

function tick() {
    deltaTime = (Date.now() - elobb) / 1000;
    elobb = Date.now();
    deltaY += g * deltaTime;
    majomfejY += deltaY * deltaTime;
    if(majomfejY + majomfejMag >= canvasMag) {
        majomfejY = canvasMag - majomfejMag;
        ugorhat = true;
    }
    if(akadalyok[akadalyok.length - 1] < canvasSzel - tavolsag) {
        akadalyok.push(canvasSzel);
        tavolsag = Math.floor(Math.random() * 300) + 200;
    }
    for(let i = 0; i < akadalyok.length; i++) {
        akadalyok[i] -= deltaX * deltaTime;
        if(akadalyok[i] <= -akadalySzel) akadalyok.shift();
    }
    draw();
}

function draw() {
    ctx.fillStyle = "rgb(0, 0, 0, 255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(majomfejImg, majomfejX * canvas.width / canvasSzel, majomfejY * canvas.height / canvasMag);
    ctx.fillStyle = "rgb(0, 255, 0, 255)";
    for(let i = 0; i < akadalyok.length; i++) {
        const x = akadalyok[i] * canvas.width / canvasSzel;
        const y = (canvasMag - akadalyMag) * canvas.height / canvasMag;
        const w = akadalySzel * canvas.width / canvasSzel;
        const h = akadalyMag * canvas.height / canvasMag;
        ctx.fillRect(x, y, w, h);
    }
}
*/