function main(){

	var canvas = document.getElementById("canvas");
	if (!canvas) {
		console.log("Fallo al recuperar el canvas");
		return;
	}
	var pincel = canvas.getContext("2d");
	pincel.fillStyle = "rgba(0, 0, 255, 1.0)";
	pincel.fillRect(120, 70, 150, 150);
}