import {CSS3DObject} from "./CSS3DRenderer.js"
import {mockWithImage} from "./camera-mock.js"
import {loadGLTF, loadTexture, loadTextures, loadVideo, /* loadAudio */} from "./loader.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {

    const start = async() => {

        // mockWithImage("./imgs/poetisa-mosaico.jpg");    // texture size: 2882 x 3836

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./assets/target/alejandra.mind"
        })        
        
        const {camera, scene, renderer, cssScene, cssRenderer} = mindarThree;
        
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        
        
        
        // ============   TEXTURES, GEOMETRIES, MATERIALS, MESHES   =============
        
        
        const [
            emailTexture, 
            locationTexture, 
            webTexture, 
            profileTexture, 
            leftTexture, 
            rightTexture,
            portfolioItem0Texture, 
            portfolioItem1Texture,
            ] = await loadTextures([
                "./assets/icons/email.png",
                "./assets/icons/location.png", 
                "./assets/icons/web.png", 
                "./assets/icons/profile.png", 
                "./assets/icons/left.png", 
                "./assets/icons/right.png",
                "./assets/imgs/alejandra-pizarnik(edited).png",
                "./assets/imgs/alejandra-pizarnik-2-play.jpeg", 
              ])       
              

        const planeGeometry = new THREE.PlaneGeometry(652/896, 1);
        const videoPlaneGeometry = new THREE.PlaneGeometry(1, 360/482);

        const iconGeometry = new THREE.CircleGeometry(0.075, 32);         

        const emailMaterial = new THREE.MeshBasicMaterial(({ map: emailTexture}));
        const webMaterial = new THREE.MeshBasicMaterial(({ map: webTexture}));
        const profileMaterial = new THREE.MeshBasicMaterial(({ map: profileTexture}));
        const locationMaterial = new THREE.MeshBasicMaterial(({ map: locationTexture}));
        const leftMaterial = new THREE.MeshBasicMaterial(({ map: leftTexture, transparent: true}));
        const rightMaterial = new THREE.MeshBasicMaterial(({ map: rightTexture, transparent: true}));


        const emailIcon = new THREE.Mesh(iconGeometry, emailMaterial);
        const webIcon = new THREE.Mesh(iconGeometry, webMaterial);
        const profileIcon = new THREE.Mesh(iconGeometry, profileMaterial);
        const locationIcon = new THREE.Mesh(iconGeometry, locationMaterial);
        const leftIcon = new THREE.Mesh(iconGeometry, leftMaterial);
        const rightIcon = new THREE.Mesh(iconGeometry, rightMaterial);


        const portfolioItem1Video = await loadVideo("./assets/videos/Alejandra Pizarnik - Yo no soy de este mundo.mp4");
        portfolioItem1Video.muted = true;

        const portfolioItem1VideoTexture = new THREE.VideoTexture(portfolioItem1Video);
        const portfolioItem1VideoMaterial = new THREE.MeshBasicMaterial({map: portfolioItem1VideoTexture});

        const portfolioItem0Material = new THREE.MeshBasicMaterial({map: portfolioItem0Texture});
        const portfolioItem1Material = new THREE.MeshBasicMaterial({map: portfolioItem1Texture});
        
        const portfolioItem1V = new THREE.Mesh(videoPlaneGeometry, portfolioItem1VideoMaterial); 
        const portfolioItem0 = new THREE.Mesh(planeGeometry, portfolioItem0Material); 
        const portfolioItem1 = new THREE.Mesh(planeGeometry, portfolioItem1Material);
        
                        
        
        // ====================   POSITION, SCALE, GROUP, GLTF   ====================
        

        profileIcon.position.set(-0.42, -0.535, 0.02);
        webIcon.position.set(-0.14, -0.535, 0.02);   
        emailIcon.position.set(0.14, -0.535, 0.02);
        locationIcon.position.set(0.42, -0.535, 0.02);
        
        const portfolioGroup = new THREE.Group();
        portfolioGroup.position.set(0, 0.6, 0.01);

        portfolioGroup.scale.set(1.3, 1.3, 1.3);

        portfolioGroup.add(portfolioItem0);
        // portfolioGroup.add(portfolioItem1);
        
        portfolioGroup.add(leftIcon);
        portfolioGroup.add(rightIcon);

        leftIcon.position.set(-0.6, -0.4, 0);
        rightIcon.position.set(0.6, -0.4, 0);
        
        portfolioItem0.position.set(0, -0.4, 0);
        portfolioItem0.scale.set(1.1, 1.1, 1.1);

        portfolioItem1.position.set(0, -0.4, 0);
        portfolioItem1.scale.set(1.1, 1.1, 1.1);

        portfolioItem1V.position.set(0, -0.4, 0);
        
        const pen = await loadGLTF("./assets/gltf/pen2.gltf");
        pen.scene.scale.set(0.12, 0.12, 0.12);
        pen.scene.position.set(0, -0.76, 0);
        pen.scene.rotation.z = Math.PI/2;

        webIcon.scale.set(0.75, 0.75, 0.75);
        profileIcon.scale.set(0.75, 0.75, 0.75);
        locationIcon.scale.set(0.75, 0.75, 0.75);
        emailIcon.scale.set(0.75, 0.75, 0.75);
        leftIcon.scale.set(0.75, 0.75, 0.75);
        rightIcon.scale.set(0.75, 0.75, 0.75);


        // ====================   ANCHOR   ====================


        const anchor = mindarThree.addAnchor(0);
       
        anchor.group.add(pen.scene)       
        anchor.group.add(emailIcon);
        anchor.group.add(webIcon);
        anchor.group.add(profileIcon);
        anchor.group.add(locationIcon);
        anchor.group.add(portfolioGroup);

        /* const penAnchor = mindarThree.addAnchor(0)
        penAnchor.group.add(pen.scene) */


        // ====================   CSS3DOBJECT & CSSANCHOR   ===================

        
        const textElement = document.createElement("div");
        const textObj = new CSS3DObject(textElement);

        textObj.position.set(0, -1000, 0);
        textObj.visible = false;
        
        textElement.style.background = "#ffffff";
        textElement.style.padding = "30px";
        textElement.style.fontSize = "60px";

        const cssAnchor = mindarThree.addCSSAnchor(0);
        cssAnchor.group.add(textObj);

        
        
        // ====================   HANDLE BUTTONS   ====================
        
        
        leftIcon.userData.clickable = true;
        rightIcon.userData.clickable = true;
        emailIcon.userData.clickable = true;
        webIcon.userData.clickable = true;
        profileIcon.userData.clickable = true;
        locationIcon.userData.clickable = true;
        
        // portfolioItem0.userData.clickable = true;    // Item0 has no interactions 
        portfolioItem1.userData.clickable = true;       // Item1 has interaction
        portfolioItem1V.userData.clickable = true;

        // pen.userData.clickable = true;


        // ====================   SOUND  ====================

        /*      
        const sound = await loadAudio("./assets/sounds/Alejandra Pizarnik - Yo no soy de este mundo.mp3");
        const listener = new THREE.AudioListener();
        const audio = new THREE.PositionalAudio(listener); 

        camera.add(listener);

        anchor.group.add(audio);
        // penAnchor.group.add(audio);
        
        audio.setRefDistance(400);
        audio.setBuffer(sound);
        audio.setLoop(true);
        */


        // ====================   INTERACTION LOGIC   ====================

        const portfolioItems = [portfolioItem0, portfolioItem1];
        let currentPortfolio = 0;
        
        document.addEventListener("pointerdown", (e) => {

            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -1 * (e.clientY / window.innerHeight) * 2 + 1;
            const mouse = new THREE.Vector2(mouseX, mouseY);
            
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children, true);

            // audio.pause();

            if (intersects.length > 0) {

                let o = intersects[0].object;

                while (o.parent && !o.userData.clickable) {
                    o = o.parent;
                }

                if (o.userData.clickable) {                    
                    if (o === leftIcon || o === rightIcon) {
                        if (o === leftIcon) {
                            currentPortfolio = (currentPortfolio - 1 + portfolioItems.length) 
                                           % portfolioItems.length;
                        }
                        else {
                            currentPortfolio = (currentPortfolio + 1) % portfolioItems.length;
                        }
                        
                        // portfolioItem1Video.pause();                        

                        for (let i = 0; i < portfolioItems.length; i++) {
                            portfolioGroup.remove(portfolioItems[i]);
                        }

                        portfolioGroup.add(portfolioItems[currentPortfolio]);
                    }

                    else if (o === portfolioItem1) {
                        portfolioGroup.remove(portfolioItem1);
                        portfolioGroup.add(portfolioItem1V);
                        portfolioItems[0] = portfolioItem1V;
                        portfolioItem1Video.play();
                        }

                        else if (o === portfolioItem1V) {
                            if (portfolioItem1Video.paused) {
                                portfolioItem1Video.play();
                            }
                            else {
                                portfolioItem1Video.pause();
                                }
                            }                            
                            else if (o === webIcon) {
                                textObj.visible = true;
                                textElement.innerHTML = "https://amenteemaravilhosa.com.br/biografia-de-alejandra-pizarnik/";
                                }
                                else if (o === emailIcon) {
                                    textObj.visible = true;
                                    textElement.innerHTML = "pizarnik@gmail.com";
                                    }
                                    else if (o === profileIcon) {
                                        textObj.visible = true;
                                        textElement.innerHTML = "https://ar.linkedin.com/in/alejandra-pizarnik-b95a1a86"
                                        }
                                        else if (o === locationIcon) {
                                            textObj.visible = true;
                                            textElement.innerHTML = "Buenos Aires, Argentina"; 
                                        }                 
                                           /* else if (o == pen.scene) {
                                                if (audio.paused) {
                                                    audio.play();         
                                                }
                                                else
                                                    audio.paused();
                                            } */
                }
            } 
           
        }); 

        
        
        // ====================   RENDER LOOP  ===============================


        const clock = new THREE.Clock();
        
        await mindarThree.start();        

        renderer.setAnimationLoop( () => {
            
            
            const delta = clock.getDelta();
            const elapsed = clock.getElapsedTime(delta);

            const iconScale = 1 + 0.15 * Math.sin(elapsed*3);

            [webIcon, emailIcon, profileIcon, locationIcon]
            .forEach( (icon) => {
                icon.scale.set(iconScale, iconScale, iconScale);
            });

            // [leftIcon, rightIcon].forEach((icon2) => {
            //     icon2.rotation.x = icon2.rotation.x + 0.01 * Math.sin(elapsed);
            // })

            // const penZ = Math.min(0.3, -0.3 + elapsed * 0.5);

            pen.scene.rotation.y = 1 + Math.sin(elapsed*3);

            renderer.render(scene, camera);
            cssRenderer.render(cssScene, camera);
        })
    }        

    start();

})
