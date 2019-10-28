const width = 2200;
const height = 376;
const effectScale = 1.8; // wielkość efektu

const playground = document.querySelector(".intro");

const renderer = PIXI.autoDetectRenderer(width, height, {
	transparent: true
});
renderer.autoResize = true;

let animateCount = 0;
let preview, displacementSprite, displacementFilter, stage;

const setScene = url => {
	playground.appendChild(renderer.view);

	stage = new PIXI.Container();

	preview = new PIXI.Sprite(
		PIXI.loader.resources["img/michel-hops.png"].texture
	);

	displacementSprite = new PIXI.Sprite(
		PIXI.loader.resources["img/clouds.jpg"].texture
	);
	displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

	displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

	displacementSprite.scale.y = effectScale;
	displacementSprite.scale.x = effectScale;

	stage.addChild(displacementSprite);
	stage.addChild(preview);

	animate();
};

const animate = () => {
	requestAnimationFrame(animate);

	displacementSprite.x = animateCount * 30;
	displacementSprite.y = animateCount * 30;
	animateCount += 0.02;

	stage.filters = [displacementFilter];
	renderer.render(stage);
};

PIXI.loader.add(["img/michel-hops.png", "img/clouds.jpg"]).load(setScene);
