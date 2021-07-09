function doPictureSelect() {
	switchScreen(new PictureSelect());
}

class PictureSelect extends Screen {
	constructor() {
		super();
		//recommendSongs(SONGREC.mainMenu);
		this.pictureButtons = PICTURE_LIST.map(pid => new PictureSelectButton({picture:pid}));
		this.buttons = [
			...this.pictureButtons,
		];
	}
	update() {
		this.buttons.forEach(oj=>oj.update());
	}
	draw() {
		drawTextInRect(lg("PictureSelect-Heading"), 0, 0, canvas.width, canvas.height/6, {fill:palette.normal, stroke:palette.background});
		
		this.buttons.forEach(oj=>oj.draw());
	}
	resize() {
		this.pictureButtons.forEach((b, i)=>b.resize(canvas.width/20, canvas.height/2 + canvas.height/10*i, canvas.width*2/5, canvas.height/15));
	}
}
MainMenu.prototype.overrideTouch = false;

class PictureSelectButton extends Button {
	constructor(args) {
		super({
			lText : "Picture-"+args.picture,
			func : () => this.start(),
		});
		this.picture = args.picture;
	}
	start() {
		switchScreen(new PuzzleScreen({
			picture : this.picture,
			riddle : "Original" //TODO make adjustible
		}));
	}
}