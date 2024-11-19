import {mockWithImage} from "./camera-mock.js"
import {loadGLTF, loadTexture, loadTextures, loadVideo} from "./loader.js"
import {CSS3DObject} from "./CSS3DRenderer.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {

    const start = async() => {

        // mockWithImage("./imgs/poetisa-mosaico.jpg");    // texture size: 2882 x 3836

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./targets.mind"
        })        
        
        const {camera, scene, cssScene, renderer, cssRenderer} = mindarThree;
        
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        

        // ====================   VIDEO   ====================


        const portfolioItem0Video = await loadVideo("./assets/videos/Alejandra Pizarnik - Yo no soy de este mundo.mp4");
        portfolioItem0Video.muted = true;
        

        // ============   TEXTURES, GEOMETRIES, MATERIALS, MESHES   =============


        const [poetMosaicoTexture, 
               portfolioItem0Texture, 
               portfolioItem1Texture,
               webTexture, 
               profileTexture, 
               locationTexture, 
               emailTexture, 
               phoneTexture, 
               leftTexture, 
               rightTexture
              ] = await loadTextures([
                  "./assets/target/poetisa-mosaico.jpg", 
                  "./assets/imgs/alejandra-pizarnik.png",
                  "./assets/imgs/alejandra-pizarnik-2-play.jpeg", 
                  "./assets/icons/web.png", 
                  "./assets/icons/profile.png", 
                  "./assets/icons/location.png", 
                  "./assets/icons/email.png",
                  "./assets/icons/phone.png", 
                  "./assets/icons/left.png", 
                  "./assets/icons/right.png"
              ])       
               
        
        const emailMaterial = new THREE.MeshBasicMaterial(({ map: emailTexture}));
        const webMaterial = new THREE.MeshBasicMaterial(({ map: webTexture}));
        const profileMaterial = new THREE.MeshBasicMaterial(({ map: profileTexture}));
        const locationMaterial = new THREE.MeshBasicMaterial(({ map: locationTexture}));
        const phoneMaterial = new THREE.MeshBasicMaterial(({ map: phoneTexture}));
        const leftMaterial = new THREE.MeshBasicMaterial(({ map: leftTexture, transparent: true}));
        const rightMaterial = new THREE.MeshBasicMaterial(({ map: rightTexture, transparent: true}));

        
        const iconGeometry = new THREE.CircleGeometry(0.075, 32); 


        const emailIcon = new THREE.Mesh(iconGeometry, emailMaterial);
        const webIcon = new THREE.Mesh(iconGeometry, webMaterial);
        const profileIcon = new THREE.Mesh(iconGeometry, profileMaterial);
        const locationIcon = new THREE.Mesh(iconGeometry, locationMaterial);
        const phoneIcon = new THREE.Mesh(iconGeometry, phoneMaterial);
        const leftIcon = new THREE.Mesh(iconGeometry, leftMaterial);
        const rightIcon = new THREE.Mesh(iconGeometry, rightMaterial);
        
        
        const planeGeometry = new THREE.PlaneGeometry(481/484, 1);

        const poetMosaicMaterial = new THREE.MeshBasicMaterial({map: poetMosaicoTexture});
        const poetMosaic = new THREE.Mesh(planeGeometry, poetMosaicMaterial);
        
        
        // ----------------------------

        const portfolioItem0VideoTexture = new THREE.VideoTexture(portfolioItem0Video)             
        const portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: portfolioItem0VideoTexture});
        const portfolioItem0V = new THREE.Mesh(planeGeometry, portfolioItem0VideoMaterial); 
        
        // ----------------------------

        const portfolioItem0Material = new THREE.MeshBasicMaterial({map: portfolioItem0Texture});
        const portfolioItem1Material = new THREE.MeshBasicMaterial({map: portfolioItem1Texture});
    
        const portfolioItem0 = new THREE.Mesh(planeGeometry, portfolioItem0Material); 
        const portfolioItem1 = new THREE.Mesh(planeGeometry, portfolioItem1Material);

        
        
        // ====================   POSITION, SCALE, GROUP, GLTF   ====================


        profileIcon.position.set(-0.35, -0.55, 0);
        webIcon.position.set(0, -0.55, 0);
        emailIcon.position.set(0.175, -0.55, 0);
        locationIcon.position.set(-0.175, -0.55, 0);
        phoneIcon.position.set(0.35, -0.55, 0);
        
        webIcon.scale.set(0.75, 0.75, 0.75);
        profileIcon.scale.set(0.75, 0.75, 0.75);
        locationIcon.scale.set(0.75, 0.75, 0.75);
        emailIcon.scale.set(0.75, 0.75, 0.75);
        phoneIcon.scale.set(0.75, 0.75, 0.75);
        leftIcon.scale.set(0.75, 0.75, 0.75);
        rightIcon.scale.set(0.75, 0.75, 0.75);
        
        const portfolioGroup = new THREE.Group();
        portfolioGroup.position.set(0, 0.15, 0.015);

        portfolioGroup.add(portfolioItem0);
        portfolioGroup.add(portfolioItem1);
        portfolioGroup.add(leftIcon);
        portfolioGroup.add(rightIcon);

        // leftIcon.position.set(-0.12, -0.185, 0.1);
        // rightIcon.position.set(0.12, -0.185, 0.1);
        
        leftIcon.position.set(-0.7, 0, 0);
        rightIcon.position.set(0.7, 0, 0);
        
        const pen = await loadGLTF("./assets/gltf/pen2.gltf");
        pen.scene.scale.set(0.07, 0.07, 0.07);
        pen.scene.position.set(0, -0.425, 0.05);
        pen.scene.rotation.z = Math.PI/2;



        // ====================   ANCHOR   ====================


        const anchor = mindarThree.addAnchor(0);

        anchor.group.add(pen.scene);
        // anchor.group.add(poetMosaic);
        
        anchor.group.add(emailIcon);
        anchor.group.add(webIcon);
        anchor.group.add(profileIcon);
        anchor.group.add(locationIcon);
        anchor.group.add(phoneIcon);

        anchor.group.add(portfolioGroup);


        // ====================   CSS3DOBJECT & CSSANCHOR   ===================

        
        const textElement = document.createElement("div");
        const textObj = new CSS3DObject(textElement);

        textObj.position.set(0, -0.75, 0);
        textObj.visible = false;
        
        textElement.style.background = "#ffffff";
        textElement.style.padding = "30px";
        textElement.style.fontSize = "60px";

        const cssAnchor = mindarThree.addCSSAnchor(0);
        cssAnchor.group.add(textObj);



        // ====================   HANDLE BUTTONS & IMAGES  ====================

        
        leftIcon.userData.clickable = true;
        rightIcon.userData.clickable = true;
        emailIcon.userData.clickable = true;
        webIcon.userData.clickable = true;
        profileIcon.userData.clickable = true;
        locationIcon.userData.clickable = true;

        portfolioItem0.userData.clickable = true;
        portfolioItem1.userData.clickable = true;
        portfolioItem0V.userData.clickable = true;
        // portfolioGroup.userData.clickable = true;


        // ====================   INTERACTION LOGIC   ====================

        const portfolioItems = [portfolioItem0, portfolioItem1];
        let currentPortfolio = 0;
        
        document.addEventListener('click', (e) => {

            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -1 * (e.clientY / window.innerHeight) * 2 - 1;
            const mouse = new THREE.Vector2(mouseX, mouseY);
            
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children, true);

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
                        
                        portfolioItem0Video.pause();

                        for (let i = 0; i < portfolioItems.length; i++) {
                            portfolioGroup.remove(portfolioItems[i]);
                        }

                        portfolioGroup.add(portfolioItems[currentPortfolio]);
                    }

                    else if (o === portfolioItem0) {
                        portfolioGroup.remove(portfolioItem0);
                        portfolioGroup.add(portfolioItem0V);
                        portfolioItems[0] = portfolioItem0V;
                        portfolioItem0Video.play();
                        }

                        else if (o === portfolioItem0V) {
                            if (portfolioItem0Video.paused) {
                                portfolioItem0Video.play();
                            }
                            else {
                                portfolioItem0Video.pause();
                                }
                            }
                            
                            else if (o === webIcon) {
                                textObj.visible = true;
                                textElement.innerHTML = "https://amenteemaravilhosa.com.br/biografia-de-alejandra-pizarnik/";
                                }

                                else if (o === emailIcon) {
                                    textObj.visible = true;
                                    textElement.innerHTML = "pizarnik [at] gmail.com";
                                    }

                                    else if (o === profileIcon) {
                                        textObj.visible = true;
                                        textElement.innerHTML = "https://ar.linkedin.com/in/alejandra-pizarnik-b95a1a86"
                                        }

                                        else if (o === locationIcon) {
                                            textObj.visible = true;
                                            textElement.innerHTML = "Buenos Aires, Argentina"; 
                                        }

                                            else if (o === phoneIcon) {
                                                textObj.visible = true;
                                                textElement.innerHTML = "(54) 55 5555-5555";
                                            }

                }
            } 

            /*
 // ==================== INTERACTIVITY HANDLER ==================== 
 // Função para lidar com cliques nos objetos 
 
 const handleClickEvent = (event) => { 
    const mouse = new THREE.Vector2(); 
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1; 
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; 
    const raycaster = new THREE.Raycaster(); 
    raycaster.setFromCamera(mouse, camera); 
    const intersects = raycaster.intersectObjects(scene.children, true); 
    if (intersects.length > 0) { 
        intersects.forEach((intersect) => { 
            if (intersect.object.userData.clickable) { 
                // Ação ao clicar no objeto 
                if (intersect.object === leftIcon) {
                     console.log('Left icon clicked!'); 
                     // Ação para leftIcon 
                    } else if (intersect.object === rightIcon) { 
                        console.log('Right icon clicked!'); 
                        // Ação para rightIcon 
                    } else if (intersect.object === emailIcon) {
                         console.log('Email icon clicked!'); 
                         // Ação para emailIcon 
                        } else if (intersect.object === webIcon) {
                             console.log('Web icon clicked!'); 
                             // Ação para webIcon 
                            } else if (intersect.object === profileIcon) {
                                 console.log('Profile icon clicked!'); 
                                 // Ação para profileIcon 
                                } else if (intersect.object === locationIcon) {
                                     console.log('Location icon clicked!'); 
                                     // Ação para locationIcon 
                                    } } }); } }; 
                                    
                                    window.addEventListener('click', handleClickEvent);
            */
        }); 

        
        
        // ===================================================


        const clock = new THREE.Clock();
        
        await mindarThree.start();        

        renderer.setAnimationLoop( () => {
            
            /*
            const delta = clock.getDelta();
            const elapsed = clock.getElapsedTime();

            const iconScale = 1 + 0.2 * Math.sin(elapsed*5);

            [webIcon, emailIcon, profileIcon, locationIcon, phoneIcon]
            .forEach( (icon) => {
                icon.scale.set(iconScale, iconScale, iconScale);
            });

            const penZ = Math.min(0.3, -0.3 + elapsed * 0.5);
            pen.scene.position.set(0, -0.25, penZ);            
            
            */

            renderer.render(scene, camera);
            cssRenderer.render(cssScene, camera);
        })
    }        

    start();

})
