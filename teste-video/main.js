// import {mockWithVideo} from "./camera-mock.js"
import {loadVideo} from "./loader.js"

const THREE = window.MINDAR.IMAGE.THREE

document.addEventListener('DOMContentLoaded', () => {

    const start = async() => {

        // mockWithVideo("./sintel.mp4");
        
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./sintel.mind"
        })

        const {scene, camera, renderer} = mindarThree;

        const video = await loadVideo("./sintel.mp4");
        const texture = new THREE.VideoTexture(video);

        const geometry = new THREE.PlaneGeometry(1, 204/480);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.Mesh(geometry, material);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);

        anchor.onTargetFound = () => {
            video.play();
        }

        anchor.onTargetLost = () => {
            video.pause();
        }

        // uncomment commented section below, if video must always be played from start (each time target is lost and found again).
        // else, video will resume from where it stops...

        /* 

        video.addEventListener('play', () => {     //  Video frame (target image) captured on 6th second.      
            video.currentTime = 6                  //  Whenever video plays, it begins at 6th second (when the still image becomes a video).      
        })                                         
        
        */

        await mindarThree.start();

        renderer.setAnimationLoop( () => {
            renderer.render(scene, camera);
        })        
    }

    start();
})