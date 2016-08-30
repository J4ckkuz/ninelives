"use strict";
var scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();
    var width = window.innerWidth,
        height = window.innerHeight,
        container = document.getElementById("container");
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0.5, 0.4, 0.5);
    scene.add(camera);

    window.addEventListener('resize', function () {
        var width = window.innerWidth,
            height = window.innerHeight;
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Set the background colour.
    renderer.setClearColor(0x333F47, 1);

    //LIGHTS
    
    var ambient = new THREE.AmbientLight(0xfff7ee, 0.15),
        light1 = new THREE.PointLight(0xffffff, 0.6),
        light2 = new THREE.PointLight(0xffffff, 0.7),
        light3 = new THREE.PointLight(0xffffff, 0.3);
    
    light1.position.set(20, 20, -20);
    light2.position.set(0, -50, -30);
    light3.position.set(0, 0, 30);
    
    scene.add(ambient);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);
    
    var loader = new THREE.JSONLoader();
    loader.load("https://api.myjson.com/bins/4m6ew", function (geometry) {
        //old: https://api.myjson.com/bins/55954
        var material = new THREE.MeshPhongMaterial({color: 0xefefef, side: THREE.DoubleSide, overdraw: 0.5}),
            mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.scale.set(0.30, 0.07, 0.10);
    });

    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

init();
animate();