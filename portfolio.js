const scale = 0.4;
const animation_duration = 7;
const w2=[110, 100, 180, 126, 80],
    h2 = [150, 238, 206, 156, 277],
    w1 = [154, 132, 57, 113, 140],
    h1 = [224, 64, 156, 381, 202],
    w4 = [301, 168, 81, 46],
    h4 = [100, 368, 196, 158, 205],
    w3 = [60, 155, 254, 127],
    h3 = [204, 92, 164, 340, 227];

function addOldEffectImage(element) {
    let old = document.createElement("img");
    old.className = 'old';
    old.src = "images/old.jpg";
    element.appendChild(old)
}

function getImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}

async function setImagePiece(canvas, image, x, y, w, h, scale = 1) {
    canvas.width = w * scale;
    canvas.height = h * scale;
    const ctx = canvas.getContext('2d');
    let img = await image;
    ctx.drawImage(img, x, y, w, h, 0, 0, w*scale, h*scale);
}

image3 = getImage('images/img3.jpg');
image4 = getImage('images/img4.jpg');
let grd = document.getElementsByClassName('grid2')[0]
grd.style.backgroundImage = "url('images/img3.jpg')"
for (let r = 1, y1 = 0, y2 = 0; r <= 5; y1 += h3[r-1], y2 += h4[r-1], r++) {
    for (let c = 1, x1 = 0, x2 = 0; c <= 4; x1 += w3[c-1], x2 += w4[c-1], c++) {
        let block = document.createElement("div");
        let img1 = document.createElement('canvas');
        let img2 = document.createElement('canvas');
        img2.className="opa"
        block.appendChild(img1);
        block.appendChild(img2);
        setImagePiece(img1, image3, x1, y1, w3[c-1], h3[r-1],scale);
        setImagePiece(img2, image4, x2, y2, w4[c-1], h4[r-1],scale);
        block.style = `grid-row:${r}; grid-column:${c}; animation: morph-col2${c} ${animation_duration}s ease-in-out infinite, morph-row2${r} ${animation_duration}s ease-in-out infinite;`;
        grd.appendChild(block);
    }
}
addOldEffectImage(grd);

image1 = getImage('images/img1.jpg');
image2 = getImage('images/img2.jpg');
grd = document.getElementsByClassName('grid')[0]
grd.style.backgroundImage = "url('images/img1.jpg')"
for (let r = 1, y1 = 0, y2 = 0; r <= 5; y1 += h1[r-1], y2 += h2[r-1], r++) {
    for (let c = 1, x1 = 0, x2 = 0; c <= 5; x1 += w1[c-1], x2 += w2[c-1], c++) {
        let block = document.createElement("div");
        let img1 = document.createElement('canvas');
        let img2 = document.createElement('canvas');
        img2.className="opa";
        block.appendChild(img1);
        block.appendChild(img2);
        setImagePiece(img1, image1, x1, y1, w1[c-1], h1[r-1],scale);
        setImagePiece(img2, image2, x2, y2, w2[c-1], h2[r-1],scale);
        block.style = `grid-row:${r}; grid-column:${c}; animation: morph-col${c} ${animation_duration}s ease-in-out infinite, morph-row${r} ${animation_duration}s ease-in-out infinite;`;
        grd.appendChild(block);
    }
}
addOldEffectImage(grd);

let style = document.createElement('style');
document.head.appendChild(style);
for (let i=1; i<=4; i++) {
    style.sheet.insertRule(`@keyframes morph-col2${i} { 0%, 5%, 95%, 100% {width: ${w3[i - 1]*scale}px;} 45%, 55% {width: ${w4[i - 1]*scale}px;}`);
}
for (let i=1; i<=5; i++) {
    style.sheet.insertRule(`@keyframes morph-row2${i} { 0%, 5%, 95%, 100% {height: ${h3[i - 1]*scale}px;;} 45%, 55% {height: ${h4[i - 1]*scale}px;}}`);
}
for (let i=1; i<=5; i++) {
    style.sheet.insertRule(`@keyframes morph-col${i} { 0%, 5%, 95%, 100% {width: ${w1[i - 1]*scale}px;} 45%, 55% {width: ${w2[i - 1]*scale}px;}`);
    style.sheet.insertRule(`@keyframes morph-row${i} { 0%, 5%, 95%, 100% {height: ${h1[i - 1]*scale}px;;} 45%, 55% {height: ${h2[i - 1]*scale}px;}}`);
}
style.sheet.insertRule(`body { --animation-duration: ${animation_duration}s}`);
