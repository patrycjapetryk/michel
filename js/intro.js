// var width = window.offsetWidth;
const width = 2200;
// var height = window.offsetHeight;
const height = 376;

let playground = document.querySelector('.intro');
let canvas;
// var ratio = 150 / 830;
let count1 = 0;
let raf;
let effectScale = 1.8; // wielkość efektu

const renderer = PIXI.autoDetectRenderer(width, height, {
    transparent: true
});
renderer.autoResize = true;

let tp, preview;
let displacementSprite,
    displacementFilter,
    stage;

const setScene = (url) => {
    playground.appendChild(renderer.view);

    stage = new PIXI.Container();

    tp = PIXI.Texture.fromImage(url);
    preview = new PIXI.Sprite(tp);

    preview.anchor.x = 0;

    displacementSprite = PIXI.Sprite.fromImage('img/clouds.jpg');
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

    displacementSprite.scale.y = effectScale;
    displacementSprite.scale.x = effectScale;

    stage.addChild(displacementSprite);
    stage.addChild(preview);

    animate();
}

const removeScene = () => {
    cancelAnimationFrame(raf);
    stage.removeChildren();
    stage.destroy(true);
    playground.removeChild(canvas);
}

const animate = () => {
    raf = requestAnimationFrame(animate);

    displacementSprite.x = count1 * 30;
    displacementSprite.y = count1 * 30;

    count1 += 0.02;

    stage.filters = [displacementFilter];
    renderer.render(stage);

    canvas = playground.querySelector('canvas');
}

setScene('img/michel-hops.png');