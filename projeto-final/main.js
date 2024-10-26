// import {mockWithImage} from "./camera-mock.js"
import {loadGLTF} from "./loader.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {

    const start = async() => {

        // mockWithImage("./poetas-de-america.jpg");

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./poetas.mind"
        })        

        const {scene, camera, renderer} = mindarThree;

        const geometry = new THREE.CircleGeometry(0.2, 64);   // for circles: (radius, segments)
        const material = new THREE.MeshBasicMaterial({
            color:0x00ff00,
            transparent: true,
            opacity: 0.5
        });
        const circle = new THREE.Mesh(geometry, material);

        // circle.scale.set(0.5, 0.5, 0.5);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(circle);

        await mindarThree.start();

        renderer.setAnimationLoop( () => {
            renderer.render(scene, camera)
        })

    }        

    start();

})
