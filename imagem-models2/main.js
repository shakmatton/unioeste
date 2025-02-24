// import {mockWithImage} from "./camera-mock.js"
import {loadGLTF, loadTexture} from "./loader.js"

const THREE = window.MINDAR.IMAGE.THREE

document.addEventListener('DOMContentLoaded', () => {

    const start = async() => {

        // mockWithImage("./imagens/valvula_de_recalque.jpg");

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./recalque_size4.mind"
        })

        const {scene, camera, renderer} = mindarThree;

        // const recalqueTexture = await loadTexture("./imagens/recalque2.jpg");
        const recalqueTexture = await loadTexture("./imagens/recalque1.jpg");

        // const geometry = new THREE.PlaneGeometry(629/960, 1);
        const geometry = new THREE.PlaneGeometry(600/600, 1);
        const material = new THREE.MeshBasicMaterial({
            map: recalqueTexture
        });
        const plane = new THREE.Mesh(geometry, material);

        plane.scale.set(0.75, 0.75, 0.75);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        })        

    }

    start();
})