var scene, camera, renderer, controls;

function resize(mesh_to_resize) {
    'use strict';
    var dimensionList = ['length', 'width', 'height'];
    for (dimension in dimensionList) {
        var dimension = document.getElementById(dimension);
        })
    var length, width, height;
    length.value = 30;
    width.value = 10;
    height.value = 10;
    length.addEventListener('change', function() {
        mesh_to_resize.scale.set(length.value / 100, height.value /
            100, width.value / 100);
    });
    width.addEventListener('change', function() {
        mesh_to_resize.scale.set(length.value / 100, height.value /
            100, width.value / 100);
    });
    height.addEventListener('change', function() {
        mesh_to_resize.scale.set(length.value / 100, height.value /
            100, width.value / 100);
    });
}
    /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs = saveAs || function(e) {
    "use strict";
    if (typeof e === "undefined" || typeof navigator !== "undefined" &&
        /MSIE [1-9]\./.test(navigator.userAgent)) {
        return
    }
    var t = e.document,
        n = function() {
            return e.URL || e.webkitURL || e
        },
        r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
        o = "download" in r,
        i = function(e) {
            var t = new MouseEvent("click");
            e.dispatchEvent(t)
        },
        a = /constructor/i.test(e.HTMLElement),
        f = /CriOS\/[\d]+/.test(navigator.userAgent),
        u = function(t) {
            (e.setImmediate || e.setTimeout)(function() {
                throw t
            }, 0)
        },
        d = "application/octet-stream",
        s = 1e3 * 40,
        c = function(e) {
            var t = function() {
                if (typeof e === "string") {
                    n().revokeObjectURL(e)
                } else {
                    e.remove()
                }
            };
            setTimeout(t, s)
        },
        l = function(e, t, n) {
            t = [].concat(t);
            var r = t.length;
            while (r--) {
                var o = e["on" + t[r]];
                if (typeof o === "function") {
                    try {
                        o.call(e, n || e)
                    } catch (i) {
                        u(i)
                    }
                }
            }
        },
        p = function(e) {
            if (
                /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i
                .test(e.type)) {
                return new Blob([String.fromCharCode(65279), e], {
                    type: e.type
                })
            }
            return e
        },
        v = function(t, u, s) {
            if (!s) {
                t = p(t)
            }
            var v = this,
                w = t.type,
                m = w === d,
                y, h = function() {
                    l(v, "writestart progress write writeend".split(" "))
                },
                S = function() {
                    if ((f || m && a) && e.FileReader) {
                        var r = new FileReader;
                        r.onloadend = function() {
                            var t = f ? r.result : r.result.replace(
                                /^data:[^;]*;/,
                                "data:attachment/file;");
                            var n = e.open(t, "_blank");
                            if (!n) e.location.href = t;
                            t = undefined;
                            v.readyState = v.DONE;
                            h()
                        };
                        r.readAsDataURL(t);
                        v.readyState = v.INIT;
                        return
                    }
                    if (!y) {
                        y = n().createObjectURL(t)
                    }
                    if (m) {
                        e.location.href = y
                    } else {
                        var o = e.open(y, "_blank");
                        if (!o) {
                            e.location.href = y
                        }
                    }
                    v.readyState = v.DONE;
                    h();
                    c(y)
                };
            v.readyState = v.INIT;
            if (o) {
                y = n().createObjectURL(t);
                setTimeout(function() {
                    r.href = y;
                    r.download = u;
                    i(r);
                    h();
                    c(y);
                    v.readyState = v.DONE
                });
                return
            }
            S()
        },
        w = v.prototype,
        m = function(e, t, n) {
            return new v(e, t || e.name || "download", n)
        };
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        return function(e, t, n) {
            t = t || e.name || "download";
            if (!n) {
                e = p(e)
            }
            return navigator.msSaveOrOpenBlob(e, t)
        }
    }
    w.abort = function() {};
    w.readyState = w.INIT = 0;
    w.WRITING = 1;
    w.DONE = 2;
    w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror =
        w.onwriteend = null;
    return m
}(typeof self !== "undefined" && self || typeof window !== "undefined" &&
    window || this.content);
if (typeof module !== "undefined" && module.exports) {
    module.exports.saveAs = saveAs
} else if (typeof define !== "undefined" && define !== null && define.amd !==
    null) {
    define([], function() {
        return saveAs
    })
}

function saveSTL(scene, name) {
    var exporter = new THREE.STLBinaryExporter();
    var stlString = exporter.parse(scene);
    var blob = new Blob([stlString], {
        type: 'text/plain'
    });
    saveAs(blob, name + '.stl');
}

function init() {
    'use strict';
    scene = new THREE.Scene();
    var canvas = document.getElementById('canvas');
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    canvas.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight,
        0.1, 2000);
    camera.position.set(0.5, 0.4, 0.5);
    scene.add(camera);
    window.addEventListener('resize', function() {
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
    });
    renderer.setClearColor(0x263238, 1);
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
    loader.load('https://api.myjson.com/bins/3iqtc', function(geometry) {
        //old:https://api.myjson.com/bins/4m6ew
        //older: https://api.myjson.com/bins/55954
        var material = new THREE.MeshPhongMaterial({
                color: 0xefefef,
                side: THREE.DoubleSide,
                overdraw: 0.5
            }),
            mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.scale.set(0.30, 0.1, 0.1);
        resize(mesh);
    });
    controls = new THREE.OrbitControls(camera, renderer.domElement);
        var downloadButton;
        downloadButton = document.getElementById('download');
        downloadButton.addEventListener('click', function() {
            saveSTL(scene, "ninelivesForearm")
        });
}

function animate() {
        'use strict';
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }
    /**
     * @author kovacsv / http://kovacsv.hu/
     * @author mrdoob / http://mrdoob.com/
     * @author mudcube / http://mudcu.be/
     */
THREE.STLBinaryExporter = function() {};
THREE.STLBinaryExporter.prototype = {
    constructor: THREE.STLBinaryExporter,
    parse: (function() {
        var vector = new THREE.Vector3();
        var normalMatrixWorld = new THREE.Matrix3();
        return function parse(scene) {
            // We collect objects first, as we may need to convert from BufferGeometry to Geometry
            var objects = [];
            var triangles = 0;
            scene.traverse(function(object) {
                if (!(object instanceof THREE.Mesh)) {
                    return;
                }
                var geometry = object.geometry;
                if (geometry instanceof THREE.BufferGeometry) {
                    geometry = new THREE.Geometry().fromBufferGeometry(
                        geometry);
                }
                if (!(geometry instanceof THREE.Geometry)) {
                    return;
                }
                triangles += geometry.faces.length;
                objects.push({
                    geometry: geometry,
                    matrix: object.matrixWorld
                });
            });
            var offset = 80; // skip header
            var bufferLength = triangles * 2 + triangles * 3 *
                4 * 4 + 80 + 4;
            var arrayBuffer = new ArrayBuffer(bufferLength);
            var output = new DataView(arrayBuffer);
            output.setUint32(offset, triangles, true);
            offset += 4;
            // Traversing our collected objects
            objects.forEach(function(object) {
                var vertices = object.geometry.vertices;
                var faces = object.geometry.faces;
                normalMatrixWorld.getNormalMatrix(
                    object.matrix);
                for (var i = 0, l = faces.length; i < l; i++) {
                    var face = faces[i];
                    vector.copy(face.normal).applyMatrix3(
                        normalMatrixWorld).normalize();
                    output.setFloat32(offset, vector.x,
                        true);
                    offset += 4; // normal
                    output.setFloat32(offset, vector.y,
                        true);
                    offset += 4;
                    output.setFloat32(offset, vector.z,
                        true);
                    offset += 4;
                    var indices = [face.a, face.b, face
                        .c
                    ];
                    for (var j = 0; j < 3; j++) {
                        vector.copy(vertices[indices[j]])
                            .applyMatrix4(object.matrix);
                        output.setFloat32(offset,
                            vector.x, true);
                        offset += 4; // vertices
                        output.setFloat32(offset,
                            vector.y, true);
                        offset += 4;
                        output.setFloat32(offset,
                            vector.z, true);
                        offset += 4;
                    }
                    output.setUint16(offset, 0, true);
                    offset += 2; // attribute byte count
                }
            });
            return output;
        };
    }())
};
init();
animate();