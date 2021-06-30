const PICTURE_REGISTRY = {};
const PICTURE_LIST = [];

function registerPicture(id, data) {
	PICTURE_REGISTRY[id] = data;
	PICTURE_LIST.push(id);
}