function addOldEffectImage(element) {
    let old = document.createElement("img");
    old.className = 'old';
    old.src = "images/old.jpg";
    element.appendChild(old)
}

const scale = 0.4;
const w1=[110, 100, 180, 126, 80].map(x => x*scale),
    h1 = [150, 238, 206, 156, 277].map(x => x*scale),
    w2 = [154, 132, 57, 113, 140].map(x => x*scale),
    h2 = [224, 64, 156, 381, 202].map(x => x*scale),
    w3 = [301, 168, 81, 46].map(x => x*scale),
    h3 = [100, 368, 196, 158, 205].map(x => x*scale),
    w4 = [60, 155, 254, 127].map(x => x*scale),
    h4 = [204, 92, 164, 340, 227].map(x => x*scale);

let grd = document.getElementsByClassName('face-grid2')[0]
for (let r = 1; r <= 5; r++) {
    for (let c = 1; c <= 4; c++) {
        let block = document.createElement("div")
        block.innerHTML = `<img src='images/IMG3-${r}${c}.png'> <img src='images/IMG4-${r}${c}.png' class="opa"'>`;
        block.style = `grid-row:${r}; grid-column:${c}; animation: morph-col2${c} 5s ease-in-out infinite, morph-row2${r} 5s ease-in-out infinite;`;
        grd.appendChild(block);
    }
}
addOldEffectImage(grd);

grd = document.getElementsByClassName('face-grid')[0]
for (let r = 1; r <= 5; r++) {
    for (let c = 1; c <= 5; c++) {
        let block = document.createElement("div")
        block.innerHTML = `<img src='images/IMG1-${r}${c}.png'> <img src='images/IMG2-${r}${c}.png' class="opa">`;
        block.style = `grid-row:${r}; grid-column:${c}; animation: morph-col${c} 5s ease-in-out infinite, morph-row${r} 5s ease-in-out infinite;`;
        grd.appendChild(block);
    }
}
addOldEffectImage(grd);

let style = document.createElement('style');
document.head.appendChild(style);
for (let i=1; i<=4; i++) {
    style.sheet.insertRule(`@keyframes morph-col2${i} { 0%, 100% {width: ${w3[i - 1]}px;}45%, 55% {width: ${w4[i - 1]}px;}`);
}
for (let i=1; i<=5; i++) {
    style.sheet.insertRule(`@keyframes morph-row2${i} { 0%, 100% {height: ${h3[i - 1]}px;;}45%, 55% {height: ${h4[i - 1]}px;}}`);
}
for (let i=1; i<=5; i++) {
    style.sheet.insertRule(`@keyframes morph-col${i} { 0%, 100% {width: ${w1[i - 1]}px;}45%, 55% {width: ${w2[i - 1]}px;}`);
    style.sheet.insertRule(`@keyframes morph-row${i} { 0%, 100% {height: ${h1[i - 1]}px;;}45%, 55% {height: ${h2[i - 1]}px;}}`);
}

