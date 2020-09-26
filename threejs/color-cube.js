// Variables de consenso
// Motor, escena y la camara
var renderer, scene, camera;

// Otras globales
//var esferaCubo, angulo = 0;

// Acciones
init();
loadScene();
render();

function init() {

	// Configurar el motor de render y el canvas
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x0000AA));
	document.getElementById("container").appendChild(renderer.domElement);

	// Escena
	scene = new THREE.Scene();

	// Camara
	var ar = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(50, ar, 0.1, 100);
	scene.add(camera);
	camera.position.set(0.5, 3, 9);
	camera.lookAt(new THREE.Vector3(0, 2, 0));
}

function loadScene() {
	
	var malla = new THREE.Geometry();
	var semilado = 16.0/2.0;
	var coordenadas = [
					semilado,  -semilado,  semilado,
					semilado,  -semilado, -semilado,
					semilado,   semilado, -semilado,
					semilado,   semilado,  semilado,
					-semilado,  semilado,  semilado,
					-semilado,  semilado, -semilado,
					-semilado, -semilado, -semilado,
					-semilado, -semilado,  semilado		];

	var colores = [
				0xFF0000,
				0xFF00FF,
				0xFFFFFF,
				0xFFFF00,
				0x00FF00,
				0x00FFFF,
				0x0000FF,
				0x000000	];

	var indices = [
				0,3,7, 7,3,4, 0,1,2,
				0,2,3, 4,3,2, 4,2,5,
				6,7,4, 6,4,5, 1,5,2,
				1,6,5, 7,6,1, ,7,1,0	];

    for (var i = 0; i < indices.length; i+=3) {
    	var triangulo = new THREE.Face3(indices[i], indices[i+1], indices[i+2]);
    	for (var j = 0; j < 3; j++) {
    		var color = new THREE.Color(colores[indices[i+j]]);
    		triangulo.vertexColors.push(color);
    	}
    	malla.faces.push(triangulo);
    }

    var material = new THREE.MeshBasicMaterial({vertexColors: THREE.vertexColors});
    cubo = new THREE.Mesh(malla, material);

    scene.add(cubo);
}

function update() {

	// Variacion de la escena entre frames
	/*angulo += Math.PI/100;
	esferacubo.rotation.y = angulo;*/
}

function render() {
	
	// Construir el frame y mostrarlo
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
}







