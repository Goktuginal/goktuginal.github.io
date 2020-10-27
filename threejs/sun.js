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
    
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
    renderer.setClearColor( 0x000000, 0);
    renderer.setSize(window.innerWidth/2, window.innerHeight);
    document.getElementById( 'canvas' ).appendChild( renderer.domElement );

    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    // an array of objects whose rotation to update
    var objects = [];
     
    // use just one sphere for everything
    var radius = 1;
    var widthSegments = 32;
    var heightSegments = 32;
    var sphereGeometry = new THREE.SphereBufferGeometry(
        radius, widthSegments, heightSegments);

    // Solar system
    var solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    // Sun
    var sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
    var sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);

    // Bigger sun
    sunMesh.scale.set(5, 5, 5);  
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    // Light parameters
    var color = 0xFFFFFF;
    var intensity = 3;
    var light = new THREE.PointLight(color, intensity);
    scene.add(light);
  
    // Earth
    var earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    var earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
    var earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.add(earthMesh);
    objects.push(earthMesh);

    // moon
    var moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);
     
    var moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
    var moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(.5, .5, .5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);  


    // create an locate the camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 20;

  function resizeRendererToDisplaySize(renderer) {
      var canvas = renderer.domElement;
      var pixelRatio = window.devicePixelRatio;
      var width  = canvas.clientWidth  * pixelRatio | 0;
      var height = canvas.clientHeight * pixelRatio | 0;
      var needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
  }

  // render
  function render(time) {
    time *= 0.001;
   
    if (resizeRendererToDisplaySize(renderer)) {
      var canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    
    objects.forEach((obj) => {
      obj.rotation.y = time;
    });
    
    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

