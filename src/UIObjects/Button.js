class Button extends UIObject {
	constructor(args) {
		super();
		this.text = args.text || lg(args.lText);
		this.func = args.func || doNothing;
		this.active = args.active || true;
	}
	resize(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	update() {
		this.updateMouse();
		if (this.hovered)
			hovered = true;
		if (this.clicked && this.active)
			this.func();
	}
	draw() {
		ctx.globalAlpha = 1;
		var color = this.active ? (this.clicked ? palette.click : (this.hovered ? palette.hover : palette.normal)) : palette.disabled;
		ctx.lineWidth = BUTTON_BORDER_WIDTH;
		ctx.strokeStyle = color;
		
		ctx.fillStyle = palette.background;
		this.fill();
		
		this.stroke();
		
		ctx.fillStyle = color;
		drawTextInRect(this.text, this.x+BUTTON_BORDER_WIDTH*2, this.y+BUTTON_BORDER_WIDTH*2, this.width-BUTTON_BORDER_WIDTH*4, this.height-BUTTON_BORDER_WIDTH*4);
	}
}
