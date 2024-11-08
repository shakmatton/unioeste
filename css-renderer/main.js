import {CSS3DObject} from "./CSS3DRenderer.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './pedra-verso.mind' 
        })

        const {scene, camera, renderer, cssScene, cssRenderer} = mindarThree;

        /*
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.5,
            color: 0xff0000
        });        
        const plane = new THREE.Mesh(geometry, material);

        const planeAnchor = mindarThree.addAnchor(0);
        planeAnchor.group.add(plane);
        */

        const obj = new CSS3DObject(document.querySelector("#ar-div"));    // wrapping an HTML element into a THREE.js object

        const cssAnchor = mindarThree.addCSSAnchor(0);
        cssAnchor.group.add(obj);

        await mindarThree.start();

        // renderer.setAnimationLoop(() => {
        //     renderer.render(scene, camera);
        // })

        renderer.setAnimationLoop(() => {
            cssRenderer.render(cssScene, camera);
        })
    } 

    start();
})