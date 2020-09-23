function main(){

	var canvas = document.getElementById("canvas");
	if (!canvas) {
		console.log("Fallo al recuperar el canvas");
		return;
	}
	var gl = getWebGLContext(canvas);

	if (!gl) {

		console.log("Fallo al recuperar el contexto WebGL");
		return;
	}
	gl.clearColor(0.0, 0.0, 0.3, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}