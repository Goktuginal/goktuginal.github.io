let scene, camera, renderer, torus;
let ADD = 0.0003;

let createSaturn = function () {
	//Planet Body
	let body_geo = new THREE.SphereGeometry(3, 20, 20);
	let body_mat = new THREE.MeshBasicMaterial({color: 0xc4765e});
	body = new THREE.Mesh(body_geo, body_mat);

	//Ring 1
	let ring_1_geo = new THREE.TorusGeometry(4.2, 0.5, 2, 60);
	let ring_1_mat = new THREE.MeshBasicMaterial({color: 0xf3e3df});
	ring_1 = new THREE.Mesh(ring_1_geo, ring_1_mat);
	ring_1.rotation.x = -1.4;
	ring_1.rotation.y = -0.4;

	//Ring 2
	let ring_2_geo = new THREE.TorusGeometry(5.4, 0.5, 2, 60);
	let ring_2_mat = new THREE.MeshBasicMaterial({color: 0xd9ada0});
	ring_2 = new THREE.Mesh(ring_2_geo, ring_2_mat);
	ring_2.rotation.x = -1.4;
	ring_2.rotation.y = -0.4;

	//Ring 3
	let ring_3_geo = new THREE.TorusGeometry(6.6, 0.5, 2, 60);
	let ring_3_mat = new THREE.MeshBasicMaterial({color: 0x8d503e});
	ring_3 = new THREE.Mesh(ring_3_geo, ring_3_mat);
	ring_3.rotation.x = -1.4;
	ring_3.rotation.y = -0.4;

	scene.add(body);
	scene.add(ring_1);
	scene.add(ring_2);
	scene.add(ring_3);
};

// initiallize scene, camera, objects and renderer
let init = function () {

	// info
	info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '30px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.style.color = '#f00';
	info.style.backgroundColor = 'transparent';
	info.style.zIndex = '1';
	info.innerHTML = 'INTERSECT Count: ';
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

	//let axes = new THREE.AxesHelper(10);
	//scene.add(axes);

	createSaturn();

	// create the renderer
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
	renderer.setClearColor( 0x000000, 0);
	renderer.setSize(window.innerWidth/2, window.innerHeight);
	document.getElementById( 'canvas' ).appendChild( renderer.domElement );

	document.body.appendChild(renderer.domElement);
};

// main animation loop - calls every 50-60 ms.
let mainLoop = function () {
	body.position.y -= ADD * 5;
	body.rotation.x += ADD;
	ring_1.position.y -= ADD * 5;
	ring_1.rotation.x += ADD;
	ring_2.position.y -= ADD * 5;
	ring_2.rotation.x += ADD;
	ring_3.position.y -= ADD * 5;
	ring_3.rotation.x += ADD;

	if (body.rotation.x <= -0.4 || body.rotation.x >= 0.2) ADD *= -1;

	renderer.render(scene, camera);
	requestAnimationFrame(mainLoop);
};

///////////////////////////////////////////////
init();
mainLoop();