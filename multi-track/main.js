/* 
Here is the table for the theory of computational resources and algorithms (Detection and Tracking):

                                DETECTION     TRACKING

Computational intensive           high          low     (Detection is more resource expensive. Tracking is cheaper: it only needs to take into account the average position valus of the last frames)  

Speed tolerance                   high          low     (Humans can accept waiting half a sec/one sec for the image to appear (detection time), but don't tolerate delays in tracking time)

Accuracy tolerance                low           high    (In detection time, tolerance must be low for wrong images. This is not a problem in tracking time, when frames are always updating the image)

Scalable to multiple targets      high          low     (Computational cost is higher when Tracking, and lower when scanning multiple targets)
    MindAR limits                  30            3
    8th Wall limits               1000           10


PS.: Notice the application runs slower when detecting and tracking at same time. This is because there are two algorithms running at the same time.
     So, when a raccoon is shown, the application is tracking its image while detecting the missing bear (higher computational cost).
     If both are detected, there will be only one algorithm running (2 tracking images), which is faster (lower computational cost).

*/


import {loadGLTF} from "./loader.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './targets.mind',
      maxTrack: 2                                       // We only need 2 targets: the bear and the raccoon. MindAR can support until 3 targets with full performance.
    });
    const {renderer, scene, camera} = mindarThree;
    
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
    scene.add(light)

    const raccoon = await loadGLTF("./musicband-raccoon/scene.gltf")
    raccoon.scene.scale.set(0.1, 0.1, 0.1)
    raccoon.scene.position.set(0, -0.4, 0)

    const bear = await loadGLTF("./musicband-bear/scene.gltf")
    bear.scene.scale.set(0.1, 0.1, 0.1)
    bear.scene.position.set(0, -0.4, 0)

    const raccoonAnchor = mindarThree.addAnchor(0)    
    raccoonAnchor.group.add(raccoon.scene)            

    const bearAnchor = mindarThree.addAnchor(1)       
    bearAnchor.group.add(bear.scene)

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});

