var backDiv;
var canvas;
var ctx;
var mainCanvas;
var mainCtx;

function getDOM() {
	backDiv = document.getElementById("BackgroundBox");
	mainCanvas = document.getElementById("MainCanvas");
	mainCtx = mainCanvas.getContext("2d");
	canvas = document.getElementById("MainCanvas");
	ctx = canvas.getContext("2d");
	initMusic();
	backDiv.style.backgroundColor = palette.background;
}

function resize() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	//console.log(width, height);
	//backgroundBox.style.width = width + "px";
	//backgroundBox.style.height = height + "px";
	canvas.width = width;
	canvas.height = height;
	if (runnee)
		runnee.resize();
}