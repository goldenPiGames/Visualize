const INPUT_INFO = {
	left : {
		keyboard : ["KeyA", "ArrowLeft"],
	},
	right : {
		keyboard : ["KeyD", "ArrowRight"],
	},
	up : {
		keyboard : ["KeyW", "ArrowUp"],
	},
	down : {
		keyboard : ["KeyS", "ArrowDown"],
	},
	zoomIn : {
		keyboard : ["KeyR", "Equal"],
	},
	zoomOut : {
		keyboard : ["KeyF", "Minus"],
	},
	interact : {
		keyboard : ["KeyZ", "Space"],
	},
	mute : {
		keyboard : ["KeyM"],
	},
	/*gear : {
		keyboard : 16,
		keyboard : 96,
	},*/
	/*pause : {
		keyboard : 80,
		defaultGamepad : 9,
	},*/
}

var keysPressed = {};
var keysHeld = {};

/*class GamepadInput extends Input {
	constructor(gpindex, binds, stickbinds, stickbindNames) {
		super();
		this.gpindex = gpindex;
		this.setBinds(binds, stickbinds, stickbindNames);
	}
	updateBefore() {
		
	}
	getMoveVector() {
		var gp = getGamepad(this.gpindex);
		return new VectorRect(gp.axes[0], gp.axes[1]).capR(1);
	}
}*/

function isHotkeyPressed(nom) {
	if (!INPUT_INFO[nom]) {
		throwMaybe(nom+" isn't a hotkey, dumbnuts");
		return false;
	}
	return INPUT_INFO[nom].keyboard.find(f=>keysPressed[f]>=globalTimer);
}

function isHotkeyHeld(nom) {
	if (!INPUT_INFO[nom]) {
		throwMaybe(nom+" isn't a hotkey, dumbnuts");
		return false;
	}
	return INPUT_INFO[nom].keyboard.find(f=>keysHeld[f]);
}

document.addEventListener("keydown", function(e) {
	if (document.activeElement.type != "text" && e.code != "KeyI")
		e.preventDefault();
	keysPressed[e.code] = globalTimer;
	keysHeld[e.code] = globalTimer;
});

document.addEventListener("keyup", function(e) {
	keysHeld[e.code] = false;
});

/*window.addEventListener("gamepadconnected", function(e) {
	gp = e.gamepad;
	if (gp.buttons.length >= 4 && !controllers.find(co => co.gpindex == gp.index))
		controllers.push(new GamepadInput(gp.index, controlSettings.gamepad));
});*/