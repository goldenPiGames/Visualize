class PuzzleScreen extends Screen {
	constructor(args) {
		super();
		this.pictureID = args.picture;
		this.riddleID = args.riddle;
		this.pictureImg = getSinglePicture(this.pictureID);
		this.pictureData = PICTURE_REGISTRY[this.pictureID];
		this.riddleData = this.pictureData;
		this.cam = new PictureCamera();
		this.cam.setMax(this.pictureData.width, this.pictureData.height);
		this.rhyme = new PuzzleScreenRhyme(this);
		if (settings.lang != "en") {
			this.riddleLinesAlt = lg("Picture-"+this.pictureID+"-"+this.riddleID+"-Rhyme");
		}
	}
	resize() {
		this.cam.resize(0, 0, canvas.width, canvas.height);
		if (!this.shownFull) {
			this.cam.showFull();
			this.shownFull = true;
		}
	}
	update() {
		this.cam.update();
	}
	draw() {
		this.cam.drawFullPicture(this.pictureImg);
	}
}

class PuzzleScreenRhyme extends UIObject {
	constructor(parr) {
		super();
		this.parent = parr;
		this.rhymeData = this.parent.pictureData.rhyme
	}
}