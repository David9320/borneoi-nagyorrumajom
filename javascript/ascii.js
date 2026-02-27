const majomCanvas = document.getElementById("majomCanvas");
const majomCtx = majomCanvas.getContext("2d");
const styleSzel = 500;
const styleMag = 500;
majomCanvas.style.width = `${styleSzel}px`;
majomCanvas.style.height = `${styleMag}px`;
const img = new Image();
img.src = "../kepek/majomfej.png";
let pixels;
let kepSzel;
let kepMag;
let szelSzam = 200;
let magSzam = 200;
const renderGomb = document.getElementById("renderGomb");
const kepSzelGomb = document.getElementById("kepSzel");
const kepMagGomb = document.getElementById("kepMag");
const masolasGom = document.getElementById("masolasGomb");
let text = "";

img.addEventListener("load", function() {
    kepSzel = img.width;
    kepMag = img.height;
    majomCanvas.width = img.width;
    majomCanvas.height = img.height;
    majomCtx.drawImage(img, 0, 0, majomCanvas.width, majomCanvas.height);
    const imageData = majomCtx.getImageData(0, 0, majomCanvas.width, majomCanvas.height);
    pixels = imageData.data;
    //console.log(pixels);
    //createACII();
    /*
    majomCtx.fillStyle = "black";
    console.log(majomCtx.fillStyle);
    majomCtx.fillRect(0, 0, kepSzel, kepMag);
    majomCtx.fillStyle = "white";
    majomCtx.font = "100px Arial";
    majomCtx.fillText("Hello World!", 100, 100);
    */
});

kepSzelGomb.addEventListener("input", function() {
    szelSzam = kepSzelGomb.value;
});

kepMagGomb.addEventListener("input", function() {
    magSzam = kepMagGomb.value;
});

masolasGom.addEventListener("click", function() {
    navigator.clipboard.writeText(text);
});

renderGomb.addEventListener("click", function() {
    createACII();
});

function createACII() {
    text = "";
    const chunks = getChunks();
    majomCtx.fillStyle = "black";
    console.log(majomCtx.fillStyle);
    majomCtx.fillRect(0, 0, kepSzel, kepMag);
    for(let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const x = chunk[0];
        const y = chunk[1];
        const color = chunk[2];
        const t = (color[0] + color[1] + color[2]) / 3;
        const karakter = getKarakter(t);
        majomCtx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        //majomCtx.fillStyle = "white";
        majomCtx.font = `${(styleSzel / szelSzam) * 5}px Arial`;
        majomCtx.fillText(karakter, x, y + (styleSzel / szelSzam) * 5);
        if(x == 0 && y != 0) text += "\n";
        text += karakter;
    }
}

function getKarakter(t) {
    const s = ".,*:/?#@";
    const delta = 100;
    return s[Math.max(0, Math.floor(Math.min(s.length - 1, (s.length - 1) * (t + delta) / 255)))];
}

function getChunks() {
    let chunks = [];
    const chunkSzel = kepSzel / szelSzam;
    const chunkMag = kepMag / magSzam;
    for(let y = 0; y < kepMag; y += chunkMag) {
        for(let x = 0; x < kepSzel; x += chunkSzel) {
            chunks.push([x, y, getPixel(x, y)]);
        }
    }
    return chunks;
}

function getPixel(x, y) {
    const koord = (y * kepSzel + x) * 4;
    return [pixels[koord], pixels[koord + 1], pixels[koord + 2]];
}