function begin() {
	getDOM();
	initSFX();
	loadSettings();
	addEvents();
	switchScreen(new MainMenu());
	coreEngine.run();
}

function throwMaybe(...args) {
	if (ERROR_THROW) {
		throw args[0];
	} else {
		console.log(...args);
		return false;
	}
}

function openNewTab(href) {
	window.open(href);
	mouse.down = false;
}