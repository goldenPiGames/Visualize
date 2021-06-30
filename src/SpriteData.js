function isWaitingForLoad() {
	return false;
}

const SPRITE_DATA = {
	"ButtonBevelGrey" : {
		cornerUL : {x:0, y:0, width:10, height:10},
		cornerUR : {x:20, y:0, width:10, height:10},
		cornerDL : {x:0, y:20, width:10, height:10},
		cornerDR : {x:20, y:20, width:10, height:10},
		edgeU : {x:10, y:0, width:10, height:10},
		edgeL : {x:0, y:10, width:10, height:10},
		edgeR : {x:20, y:10, width:10, height:10},
		edgeD : {x:10, y:20, width:10, height:10},
	},
}

const SPRITES_LOADED = {};

function getSpriteSheet(name) {
	if (!SPRITES_LOADED[name]) {
		let dat = SPRITE_DATA[name];
		SPRITES_LOADED[name] = new SpriteSheet("src/Sprites/"+name+"."+(dat&&dat._ext||"png"), dat, true);
	}
	return SPRITES_LOADED[name];
}

function getSinglePicture(name) {
	return makeImage("src/Pictures/"+name+".jpg");
}

function makeImage(sauce) {
	var img = new Image();
	//loadingTotal++;
	img.onload = function() {
		//loadedYet++;
		//console.log("shub");
		//img.crossOrigin = "anonymous";
	};
	img.src = sauce;
	return img;
}