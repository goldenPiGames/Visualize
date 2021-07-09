const CAMERA_SCROLL_ZOOM = 2**(1/6);
const CAMERA_KEY_MOVE = 10;
const CAMERA_KEY_ZOOM = 2**(1/12);
const ZOOM_MAX = 314;

class PictureCamera extends UIObject {
	constructor(args) {
		super();
		this.zoom = 1;
	}
	resize(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.screenCenterX = this.x + this.width/2;
		this.screenCenterY = this.y + this.height/2;
		this.zoomMin = Math.min(this.width/this.worldWidth, this.height/this.worldHeight);
		this.updateBounds();
	}
	setMax(w, h) {
		this.worldWidth = w;
		this.worldHeight = h;
		this.updateBounds();
	}
	showFull() {
		this.centerX = this.worldWidth/2;
		this.centerY = this.worldHeight/2;
		this.zoom = this.zoomMin;
		this.updateBounds();
	}
	setScreenCenter(x, y) {
		this.screenCenterX = x;
		this.screenCenterY = y;
	}
	update() {
		this.updateMouse();
		this.move();
		this.moveMouse();
	}
	move() {
		let lastZoom = this.zoom;
		//Mouse
		if (mouse.middleDown || mouse.rightDown) {
			this.centerX -= mouse.movedX / this.zoom || 0;
			this.centerY -= mouse.movedY / this.zoom || 0;
		}
		if (mouse.scrolled) {
			if (mouse.scrolled < 0)
				this.zoom *= CAMERA_SCROLL_ZOOM;
			else
				this.zoom /= CAMERA_SCROLL_ZOOM;
		}
		//Keyboard
		if (isHotkeyHeld("left"))
			this.centerX -= CAMERA_KEY_MOVE / this.zoom;
		if (isHotkeyHeld("right"))
			this.centerX += CAMERA_KEY_MOVE / this.zoom;
		if (isHotkeyHeld("up"))
			this.centerY -= CAMERA_KEY_MOVE / this.zoom;
		if (isHotkeyHeld("down"))
			this.centerY += CAMERA_KEY_MOVE / this.zoom;
		if (isHotkeyHeld("zoomIn"))
			this.zoom *= CAMERA_KEY_ZOOM;
		if (isHotkeyHeld("zoomOut"))
			this.zoom /= CAMERA_KEY_ZOOM;
		//Bounds
		if (this.zoom > ZOOM_MAX)
			this.zoom = ZOOM_MAX;
		else if (this.zoom < this.zoomMin)
			this.zoom = this.zoomMin;
		if (this.zoom != lastZoom)
			this.updateBounds();
		if (this.centerX < this.centerBoundLeft)
			this.centerX = this.centerBoundLeft;
		else if (this.centerX > this.centerBoundRight)
			this.centerX = this.centerBoundRight;
		if (this.centerY < this.centerBoundTop)
			this.centerY = this.centerBoundTop;
		else if (this.centerY > this.centerBoundBottom)
			this.centerY = this.centerBoundBottom;
	}
	drawFullPicture(pic) {
		ctx.drawImage(pic, this.worldToScreenX(0), this.worldToScreenY(0), this.worldToScreenWidth(pic.width), this.worldToScreenHeight(pic.height));
	}
	transfer() {
		setImageSmoothing(mainCtx, this.zoom < 1);
		mainCtx.translate(Math.floor(this.screenCenterX), Math.floor(this.screenCenterY));
		mainCtx.rotate(-this.rotation);
		mainCtx.drawImage(worldCanvas, -this.centerX * this.zoom, -this.centerY * this.zoom, worldCanvas.width*this.zoom, worldCanvas.height*this.zoom);
		mainCtx.setTransform(1, 0, 0, 1, 0, 0);
	}
	moveMouse() {
		this.mouseX = this.screenToWorldX(mouse.x);
		this.mouseY = this.screenToWorldY(mouse.y);
	}
	updateBounds() {
		if (this.worldWidth * this.zoom > this.width) {
			this.centerBoundLeft = (this.screenCenterX - this.x) / this.zoom;
			this.centerBoundRight = this.worldWidth - (this.x + this.width - this.screenCenterX) / this.zoom;
		} else {
			this.centerBoundLeft = this.worldWidth / 2;
			this.centerBoundRight = this.worldWidth / 2;
		}
		if (this.worldHeight * this.zoom > this.height) {
			this.centerBoundTop = (this.screenCenterY - this.y) / this.zoom;
			this.centerBoundBottom = this.worldHeight - (this.y + this.height - this.screenCenterY) / this.zoom;
		} else {
			this.centerBoundTop = this.worldHeight / 2;
			this.centerBoundBottom = this.worldHeight / 2;
		}
	}
	screenToWorldX(x) {
		return this.centerX + (x - this.screenCenterX) / this.zoom;
	}
	screenToWorldY(y) {
		return this.centerY + (y - this.screenCenterY) / this.zoom;
	}
	worldToScreenX(x) {
		return this.screenCenterX + (x - this.centerX) * this.zoom;
	}
	worldToScreenY(y) {
		return this.screenCenterY + (y - this.centerY) * this.zoom;
	}
	worldToScreenWidth(width) {
		return width * this.zoom;
	}
	worldToScreenHeight(height) {
		return height * this.zoom;
	}
}