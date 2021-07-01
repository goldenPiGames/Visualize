function doMainMenu() {
	switchScreen(new MainMenu());
}

class MainMenu extends Screen {
	constructor() {
		super();
		//recommendSongs(SONGREC.mainMenu);
		this.playButton = new Button({lText:"MainMenu-Play", func:()=>doPictureSelect()}),
		this.visitZenonButton = new Button({lText:"MainMenu-VisitZenon", func:()=>window.open("http://practicalgeeks.com/photo/index.html")}),
		this.buttons = [
			this.playButton,
			this.visitZenonButton,
		];
	}
	update() {
		this.buttons.forEach(oj=>oj.update());
	}
	draw() {
		drawTextInRect(lg("Title"), 0, 0, canvas.width, canvas.height/6, {fill:palette.normal, stroke:palette.background});
		
		this.buttons.forEach(oj=>oj.draw());
		
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";
		ctx.font = "16px " + settings.font;
		drawTextInRect("©2021 goldenPiGames & L. Zenon", 3, canvas.height-20, mainCanvas.width/2, 20, {align:"left", fill:palette.normal, stroke:palette.background});
	}
	resize() {
		([this.playButton, this.visitZenonButton]).forEach((b, i)=>b.resize(canvas.width/20, canvas.height/2 + canvas.height/10*i, canvas.width*2/5, canvas.height/15));
	}
}
MainMenu.prototype.overrideTouch = false;
