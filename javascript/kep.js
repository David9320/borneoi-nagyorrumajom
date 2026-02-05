const canvasSzel = 500;
const canvasMag = 500;
const imgSzel = 200;
const imgMag = 200;
let emberPixels;
let majomPixels;

const emberImg = new Image();
emberImg.src = "kepek/kutya.png";
const majomImg = new Image();
majomImg.src = "kepek/majomfej2.png";

const emberCanvas = document.getElementById("emberCanvas");
const emberCtx = emberCanvas.getContext("2d");
emberCanvas.style.width = `${canvasSzel}px`;
emberCanvas.style.height = `${canvasMag}px`;

const majomCanvas = document.getElementById("majomCanvas");
const majomCtx = majomCanvas.getContext("2d");
majomCanvas.style.width = `${canvasSzel}px`;
majomCanvas.style.height = `${canvasMag}px`;

const animCanvas = document.getElementById("animCanvas");
const animCtx = animCanvas.getContext("2d");
animCanvas.style.width = `${canvasSzel}px`;
animCanvas.style.height = `${canvasMag}px`;

emberImg.addEventListener("load", function() {
    emberCanvas.width = imgSzel;
    emberCanvas.height = imgMag;
    emberCtx.drawImage(emberImg, 0, 0, imgSzel, imgMag);
    emberPixels = emberCtx.getImageData(0, 0, imgSzel, imgMag).data;
    animCanvas.width = imgSzel;
    animCanvas.height = imgMag;
    animCtx.drawImage(emberImg, 0, 0, imgSzel, imgMag);
});

majomImg.addEventListener("load", function() {
    majomCanvas.width = imgSzel;
    majomCanvas.height = imgMag;
    majomCtx.drawImage(majomImg, 0, 0, imgSzel, imgMag);
    majomPixels = majomCtx.getImageData(0, 0, imgSzel, imgMag).data;
});

let legutobb;
let animID;
const animHossz = 3;
let ido;

const animGomb = document.getElementById("animGomb");
animGomb.addEventListener("click", function() {
    lerp(0.7);
});

const tSlider = document.getElementById("tSlider");
tSlider.addEventListener("input", function() {
    lerp(tSlider.value);
});

function lerp(t) {
    for(let x = 0; x < imgSzel; x++) {
        for(let y = 0; y < imgMag; y++) {
            const emberPixel = getPixel(x, y, emberPixels);
            const majomPixel = getPixel(x, y, majomPixels);
            szin = [0, 0, 0];
            for(let i = 0; i < 3; i++) szin[i] = (majomPixel[i] - emberPixel[i]) * t + emberPixel[i];
            animCtx.fillStyle = `rgb(${szin[0]}, ${szin[1]}, ${szin[2]})`;
            animCtx.fillRect(x, y, 1, 1);
        }
    }
}

function frame() {
    const deltaTime = (Date.now() - legutobb) / 1000;
    if(ido >= animHossz) clearInterval(animID);
    else {
        
    }
    ido += deltaTime;
}

function getPixel(x, y, pixels) {
    let coord = y * imgSzel + x;
    return [pixels[coord * 4], pixels[coord * 4 + 1], pixels[coord * 4 + 2]]
}