import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js'
import { FontLoader } from './three.js/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from './three.js/examples/jsm/geometries/TextGeometry.js'
// ! loaders

// ! NOTES
// ganti camera pencet (c)
// gerakin itachi ( W A S D )
// click buat gerakin camera
// ray cast (cone yang muter2)
// animasi object muter2 cone

const fontLoader = new FontLoader()
const raycaster = new THREE.Raycaster()
const mousePointer = new THREE.Vector2()

const modelLoader = new GLTFLoader()

// Camera Controls

let firstCameraOn = true
let secondCameraOn = false 

// width and height
const width = window.innerWidth
const height = window.innerHeight

// camera renderer scene

const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 1000)
camera.position.z = 25

const secondCamera = new THREE.PerspectiveCamera(80, width / height, 0.1, 1000)
secondCamera.position.x = 50
secondCamera.position.z = 50
secondCamera.position.y = 50 

secondCamera.lookAt(0,0,0)

const renderer = new THREE.WebGLRenderer({
    antialias : true
})

document.body.appendChild(renderer.domElement)

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(width, height)

renderer.shadowMap.enabled = true

const orbitControl = new OrbitControls(camera, renderer.domElement)
const secondOrbitControl = new OrbitControls(secondCamera, renderer.domElement)

// lightning

const directionalLight = new THREE.DirectionalLight('white', 0.25)

directionalLight.position.y = 5 
directionalLight.position.z = 5 
directionalLight.position.x = 5

directionalLight.castShadow = true


scene.add(directionalLight)

directionalLight.lookAt(0,0,0)

const secondDirectionalLight = new THREE.DirectionalLight('white', 0.25)

secondDirectionalLight.position.y = 5
secondDirectionalLight.position.z = -5
secondDirectionalLight.position.x = 5

secondDirectionalLight.castShadow = true
secondDirectionalLight.lookAt(0,0,0)

scene.add(secondDirectionalLight)

const thirdLight = new THREE.DirectionalLight('white', 0.25)

thirdLight.position.y = 5
thirdLight.position.z = 5
thirdLight.position.x = -5

thirdLight.castShadow = true

scene.add(thirdLight)


const fourthLight = new THREE.DirectionalLight('white', 0.251)

fourthLight.position.y = 5
fourthLight.position.z = -5
fourthLight.position.x = -5

fourthLight.castShadow = true

scene.add(fourthLight)

const front = new THREE.DirectionalLight('white', 0.251)

front.position.z = 5

front.castShadow = true

scene.add(fourthLight)

const hemiSphere = new THREE.HemisphereLight('blue', 'white',  0.5);
// ntar atas bawah beda warnanya
scene.add(hemiSphere);

const ambientLight = new THREE.AmbientLight('white', 0.4)

scene.add(ambientLight)

let itachi

modelLoader.load('./Assets/itachi/scene.gltf', (model) => {
    itachi = model.scene
    itachi.scale.set(8,8,8)

    scene.add(itachi)

    itachi.traverse((child) => {
        child.castShadow = true
    })
})

// skybox
const textureLoader = new THREE.TextureLoader()

const skyBoxMaterial = [
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/front.png'),
        side : THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/back.png'),
        side : THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/up.png'),
        side : THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/down.png'),
        side : THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/right.png'),
        side : THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/left.png'),
        side : THREE.DoubleSide
    })
]

const skyBoxGeometry = new THREE.BoxGeometry(400,400,400)
const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial)

skyBox.receiveShadow = true
skyBox.castShadow= true


scene.add(skyBox)

// text box

fontLoader.load('./three.js/examples/fonts/helvetiker_bold.typeface.json', (helvetiker) => {
    let textGeo = new TextGeometry("William Christian", {
        font : helvetiker,
        size : 25,
        height : 0.5
    })
    let textMaterial = new THREE.MeshStandardMaterial()
    let text = new THREE.Mesh(textGeo, textMaterial)
    text.position.y = 20 
    text.position.x = -100 
    text.position.z = -100 
    text.receiveShadow = true
    text.castShadow = true
    scene.add(text)
})

// mouse interaction 

window.addEventListener('click', () => {
    camera.position.z += 5
    secondCamera.position.z += 5
})


// Tempat Jalan Itachi

let itachiX = 0
let itachiZ = 0

const itachiFloor = new THREE.Mesh(
    new THREE.CylinderGeometry(30, 30, 300, 10),
    new THREE.MeshStandardMaterial({color : 'skyblue'})
)


scene.add(itachiFloor)
itachiFloor.position.y = -158
itachiFloor.receiveShadow = true
itachiFloor.castShadow = true

// tambahin bintang

const addStar = (x,y,z) => {
    const sphereGeo = new THREE.SphereGeometry(0.5,25,24) 
    const shadowMaterial = new THREE.MeshPhongMaterial()


    const star = new THREE.Mesh(sphereGeo, shadowMaterial)
    star.castShadow = true
    star.receiveShadow = true
    scene.add(star)
    star.position.x = x;
    star.position.y = y;
    star.position.z = z;
}



for(let i = 0; i < 500; i++){
    addStar(THREE.MathUtils.randFloat(-100, 100),THREE.MathUtils.randFloat(-100, 100),THREE.MathUtils.randFloat(-100, 100))
}

// 

for(let i = 0; i < 10; i++){
    const shuriken = new THREE.Mesh(
        new THREE.CircleGeometry(1, 3),
        new THREE.MeshBasicMaterial({ map : textureLoader.load('./Assets/shuriken.png'), color : 'darkgrey'})
    )

    shuriken.castShadow= true
    shuriken.position.x = THREE.MathUtils.randFloat(-20, 20)
    shuriken.position.y = THREE.MathUtils.randFloat(5, 10)

    scene.add(shuriken)
}

// switchCamera

window.addEventListener('keypress', (key) => {
    if(key.key == 'c') {
        if(firstCameraOn) {
            firstCameraOn = false
            secondCameraOn = true
        }
        else if(secondCameraOn){
            firstCameraOn = true 
            secondCameraOn = false 
        }
    }
    else if(key.key == 'w') {
        itachiZ--
    }
    else if(key.key == 's') {
        itachiZ++
    }
    else if(key.key == 'a') {
        itachiX--
    }
    else if(key.key == 'd') {
        itachiX++
    }
})

// cone geo + raycasting

const cone = new THREE.Mesh(
    new THREE.ConeGeometry(5, 20),
    new THREE.MeshStandardMaterial({color : 'white'})
)

scene.add(cone)

cone.position.x = 10 
cone.position.y = 0 
cone.receiveShadow = true
cone.castShadow = true

const onPointerMove = (event) => {
    mousePointer.x = (event.clientX / window.innerWidth) * 2 - 1
    mousePointer.y = - (event.clientY / window.innerHeight) * 2 + 1
}

window.addEventListener('mousemove', onPointerMove)

// ! ANIMATE EVERYTHING

const animate = () => {
    if(firstCameraOn) {
        raycaster.setFromCamera(mousePointer, camera)    
    }
    else {
        raycaster.setFromCamera(mousePointer, secondCamera)    
    }

    const intersectingObject = raycaster.intersectObjects(scene.children)

    if(itachi) {
        itachi.position.x = itachiX
        itachi.position.z = itachiZ
    }

    cone.rotation.x += 0.1

    cone.material.color.set('white')
    for(let i = 0; i < intersectingObject.length; i++){
        if(cone == intersectingObject[i].object) {
            cone.material.color.set(0xFF0000)
        }        
    }    

    if(firstCameraOn && !secondCameraOn) {
        renderer.render(scene, camera)
    }
    else {
        renderer.render(scene, secondCamera)
    }

    orbitControl.update()

    requestAnimationFrame(animate)
}


animate()
