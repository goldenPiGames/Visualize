class PuzzleScreen extends Screen {
	constructor(args) {
		super();
		this.pictureID = args.picture;
		this.riddleID = args.riddle;
		this.pictureImg = getSinglePicture(this.pictureID);
		this.pictureData = PICTURE_REGISTRY[this.pictureID];
		this.cam = new PictureCamera();
		this.cam.setMax(this.pictureData.width, this.pictureData.height);
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