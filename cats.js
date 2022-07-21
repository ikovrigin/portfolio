function preprocess(coords) {
    let res = [coords[0]]
    for(let i=0; i<coords.length; i++) {
        res.push(coords[i+1] - coords[i]);
    }
    return res;
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

const scale = 1;
const animation_duration = 7;
let root = document.documentElement;
let grd = document.getElementsByClassName('grid')[0]
root.style.setProperty('--animation-duration', `${animation_duration}s`);

cats= [
    {url: 'images/cat1.jpg', x:[35, 156, 345, 464, 490], y:[90, 220, 336, 425, 490]},
    {url: 'images/cat2.jpg', x:[19, 153, 329, 458, 490], y:[97, 330, 457, 482, 490]},
    {url: 'images/cat3.jpg', x:[66, 104, 278, 386, 490], y:[114, 292, 444, 482, 490]},
    {url: 'images/cat4.jpg', x:[50, 150, 312, 418, 490], y:[64, 262, 386, 416, 490]},
    {url: 'images/cat5.jpg', x:[66, 160, 330, 434, 490], y:[84, 256, 398, 426, 490]},
    {url: 'images/cat6.jpg', x:[46, 180, 334, 452, 490], y:[98, 240, 374, 430, 490]},
]

cats.forEach((cat, idx) => {
    cat.idx = idx;
    cat.w = preprocess(cat.x);
    cat.h = preprocess(cat.y);
    cat.image = getImage(cat.url);
})

for (let r = 1; r <= 5; r++) {
    for (let c = 1; c <= 5; c++) {
        let block = document.createElement("div");
        cats.forEach(cat => {
            let img = document.createElement('canvas');
            block.appendChild(img);
            setImagePiece(img, cat.image, cat.x[c-1] - cat.w[c-1], cat.y[r-1] - cat.h[r-1], cat.w[c-1], cat.h[r-1], scale);
            img.hidden = true;
            img.className = `cat${cat.idx}`
        });
        block.style = `grid-row:${r}; grid-column:${c}; animation: morph-col${c} ${animation_duration}s ease-in-out  infinite, morph-row${r} ${animation_duration}s ease-in-out  infinite;`;
        grd.appendChild(block);
    }
}

let style = document.createElement('style');
document.head.appendChild(style);
for (let i=1; i<=5; i++) {
    style.sheet.insertRule(`@keyframes morph-col${i} { 0%, 5% {width: var(--start-col${i});} 95%, 100% {width: var(--end-col${i});}`);
    style.sheet.insertRule(`@keyframes morph-row${i} { 0%, 5% {height: var(--start-row${i});} 95%, 100% {height: var(--end-row${i});}`);
}

let current_cat = rand_cat();
let next_cat = rand_cat(current_cat);
grd.style.backgroundImage = `url('${cats[current_cat].url}')`

function clear_cat(idx) {
    [...document.getElementsByClassName(`cat${idx}`)]
        .forEach((canvas) => {
            canvas.classList.remove("current_second", "next_second");
            canvas.hidden = true;
        });
}

function setup_animation() {
    grd.style.backgroundImage = `url('${cats[current_cat].url}')`;
    [...document.getElementsByClassName(`cat${current_cat}`)]
        .forEach((canvas) => {
            canvas.classList.remove("current_second", "next_second");
            if (next_cat < current_cat) {
                canvas.classList.add("current_second");
            }
            canvas.hidden = false;
        });

    [...document.getElementsByClassName(`cat${next_cat}`)]
        .forEach((canvas) => {
            canvas.classList.remove("current_second", "next_second");
            if (current_cat < next_cat) {
                canvas.classList.add("next_second");
            }
            canvas.hidden = false;
        });

    for(let i= 1; i<=5; i++) {
        root.style.setProperty(`--start-col${i}`, `${cats[current_cat].w[i-1]}px`);
        root.style.setProperty(`--start-row${i}`, `${cats[current_cat].h[i-1]}px`);
        root.style.setProperty(`--end-col${i}`, `${cats[next_cat].w[i-1]}px`);
        root.style.setProperty(`--end-row${i}`, `${cats[next_cat].h[i-1]}px`);
    }

    [...document.querySelectorAll('.grid div')]
    .forEach((cell) => {
        let a = cell.style.animation;
        cell.style.animation = null;
        cell.style.animation = a;
    });
}

setup_animation();

function rand_cat(exclude) {
    if (typeof exclude == 'number') {
        let res = Math.random() * 5 | 0;
        return res + (res >= exclude ? 1 : 0);
    }
    return Math.random() * 6 | 0;
}

const animated = document.querySelector('.face div');
animated.onanimationiteration = event =>  {
    if (event.animationName === "morph-row1") {
        clear_cat(current_cat);
        current_cat = next_cat;
        next_cat = rand_cat(current_cat);
        setup_animation();
        console.log([current_cat, next_cat]);
    }
};