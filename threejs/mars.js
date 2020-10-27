var scene, camera, renderer;
var flag = 0.0003;

fucntion planet() {
	//Planet-Mars Body
	var body_geo = new THREE.SphereGeometry(3, 20, 20);
	var body_mat = new THREE.MeshBasicMaterial({color: 0xe77d11});
	body = new THREE.Mesh(body_geo, body_mat);

	//Orbit 1
	var orbit1_geo = new THREE.TorusGeometry(4.2, 0.5, 2, 60);
	var orbit1_mat = new THREE.MeshBasicMaterial({color: 0xfda600});
	orbit1 = new THREE.Mesh(orbit1_geo, orbit1_mat);
	orbit1.rotation.x = -1.4;
	orbit1.rotation.y = -0.4;

	//Orbit 2
	var orbit2_geo = new THREE.TorusGeometry(5.4, 0.5, 2, 60);
	var orbit2_mat = new THREE.MeshBasicMaterial({color: 0x451804});
	orbit2 = new THREE.Mesh(orbit2_geo, orbit2_mat);
	orbit2.rotation.x = -1.4;
	orbit2.rotation.y = -0.4;

	//Orbit 3
	var orbit3_geo = new THREE.TorusGeometry(6.6, 0.5, 2, 60);
	var orbit3_mat = new THREE.MeshBasicMaterial({color: 0xc1440e});
	orbit3 = new THREE.Mesh(orbit3_geo, orbit3_mat);
	orbit3.rotation.x = -1.4;
	orbit3.rotation.y = -0.4;

	scene.add(body);
	scene.add(orbit1);
	scene.add(orbit2);
	scene.add(orbit3);
}

// initiallize scene, camera, objects and renderer
function init() {

	// info
	info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '30px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.style.color = '#f00';
	info.style.backgroundColor = 'transparent';
	info.style.zIndex = '1';
	info.style.fontFamily = 'Monospace';
	info.style.userSelect = "none";
	info.style.webkitUserSelect = "none";
	info.style.MozUserSelect = "none";
	document.body.appendChild( info );

	// create the scene
	scene = new THREE.Scene();

	// create an locate the camera
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	camera.position.z = 20;

	planet();

	// create the renderer
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
	renderer.setClearColor( 0x000000, 0);
	renderer.setSize(window.innerWidth/2, window.innerHeight);
	document.getElementById( 'canvas' ).appendChild( renderer.domElement );

	document.body.appendChild(renderer.domElement);
}

// main animation loop - calls every 50-60 ms.
fucntion mainLoop() {
	body.position.y -= flag * 5;
	body.rotation.x += flag;
	orbit1.position.y -= flag * 5;
	orbit1.rotation.x += flag;
	orbit2.position.y -= flag * 5;
	orbit2.rotation.x += flag;
	orbit3.position.y -= flag * 5;
	orbit3.rotation.x += flag;

	if (body.rotation.x <= -0.4 || body.rotation.x >= 0.2) flag *= -1;

	renderer.render(scene, camera);
	requestAnimationFrame(mainLoop);
}

init();
mainLoop();