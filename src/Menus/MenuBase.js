class Screen {
	
}

function getFont() {
	return "monospace";
}

/*class OverScreen extends Screen {
	constructor() {
		super();
	}
	clickedOutside() {
		return mouse.clicked && !this.intersectsMouse();
	}
	fillBackAndFrame(alphaAll, alphaBack) {
		mainCtx.fillStyle = palette.background;
		mainCtx.globalAlpha = alphaAll;
		mainCtx.fillRect(0, 0, WIDTH, HEIGHT);
		mainCtx.globalAlpha = alphaBack;
		mainCtx.fillRect(this.x, this.y, this.width, this.height);
		mainCtx.globalAlpha = 1;
		mainCtx.lineWidth = 4;
		mainCtx.strokeStyle = palette.normal;
		mainCtx.strokeRect(this.x, this.y, this.width, this.height);
	}
}
OverScreen.prototype.overrideTouch = false;
OverScreen.prototype.intersectsMouse = UIObject.prototype.intersectsMouse;*/

function switchScreen(to) {
	if (typeof to == "function") {
		to = new to();
	}
	if (!isWaitingForLoad()) {
		runnee = to;
		if (to.switchin)
			to.switchin();
	} else {
		runnee = new LoadingScreen(to);
	}
	runnee.resize();
	//particles.push(new ColorFade(4, 0, 0));
}