import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const GLTFViewer2 = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const modelRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Transparent background - no scene.background set
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.01,
      1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    // Add camera to scene (important for camera-attached lights)
    scene.add(camera);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Enable transparency
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.LinearToneMapping; // Changed to Linear from ACESFilmic
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0); // Transparent clear color
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting - using the reference viewer's default parameters
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // ambientIntensity: 0.3
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8 * Math.PI); // directIntensity: 0.8 * Math.PI
    directionalLight.position.set(0.5, 0, 0.866); // Default position from the reference
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    
    // Attach the directional light to the camera for consistent lighting
    cameraRef.current.add(directionalLight);

    // Add grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Simple orbit controls
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 30 * Math.PI / 180; // Positive angle to look from above
    let targetRotationY = 0;
    let mouseDown = false;
    let distance = 10;
    let autoRotate = true;

    const handleMouseDown = (e) => {
      mouseDown = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      autoRotate = false; // Stop auto-rotation when user interacts
    };

    const handleMouseUp = () => {
      mouseDown = false;
    };

    const handleMouseMove = (e) => {
      if (!mouseDown) return;
      
      const deltaX = e.clientX - mouseX;
      const deltaY = e.clientY - mouseY;
      
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      
      // Limit vertical rotation to look from above
      targetRotationX = Math.max(0, Math.min(Math.PI / 2 - 0.1, targetRotationX));
      
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      distance += e.deltaY * 0.01;
      distance = Math.max(2, Math.min(50, distance));
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Auto-rotate if enabled
      if (autoRotate && modelRef.current) {
        modelRef.current.rotation.y += 0.005; // Slow rotation
      }
      
      // Update camera position
      camera.position.x = distance * Math.sin(targetRotationY) * Math.cos(targetRotationX);
      camera.position.y = distance * Math.sin(targetRotationX);
      camera.position.z = distance * Math.cos(targetRotationY) * Math.cos(targetRotationX);
      camera.lookAt(0, 0, 0);
      
      // Update animations
      if (mixerRef.current) {
        const delta = clockRef.current.getDelta();
        mixerRef.current.update(delta);
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  // Load default model on mount
  useEffect(() => {
    if (sceneRef.current && !modelLoaded) {
      loadModel('/scene/evershapes_scene2.gltf');
      setModelLoaded(true);
    }
  }, [sceneRef.current, modelLoaded]);

  const loadModel = (url) => {
    
    // Clear existing model
    const scene = sceneRef.current;
    if (modelRef.current) {
      scene.remove(modelRef.current);
      
      // Dispose of geometries and materials
      modelRef.current.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }

    // Stop existing animations
    if (mixerRef.current) {
      mixerRef.current.stopAllAction();
      mixerRef.current = null;
    }

    // Load GLTF
    const loader = new GLTFLoader();
    
    loader.load(
      url,
      (gltf) => {
        console.log('GLTF loaded:', gltf);
        
        const model = gltf.scene;
        modelRef.current = model;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5 / maxDim; // Scale to fit in a 5-unit cube
        
        model.scale.setScalar(scale);
        
        // Center the model horizontally and place it on top of the grid
        box.setFromObject(model);
        box.getCenter(center);
        model.position.x = -center.x;
        model.position.z = -center.z;
        // Place the bottom of the model at y=0 (on the grid)
        model.position.y = -box.min.y * scale;
        
        // Rotate the model by 90 degrees on Y axis
        model.rotation.y = Math.PI / 2;
        
        // Enable shadows
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Ensure materials are properly set up
            if (child.material) {
              child.material.needsUpdate = true;
            }
          }
        });
        
        scene.add(model);
        
        // Set up animations if any
        if (gltf.animations && gltf.animations.length > 0) {
          mixerRef.current = new THREE.AnimationMixer(model);
          
          // Play all animations
          gltf.animations.forEach((clip) => {
            const action = mixerRef.current.clipAction(clip);
            action.play();
          });
          
          console.log(`Playing ${gltf.animations.length} animations`);
        }
        
        // Adjust camera distance based on model size
        const distance = maxDim * 2.5;
        const camera = cameraRef.current;
        camera.position.set(distance, distance * 0.5, distance);
        camera.lookAt(0, 0, 0);
        
        setIsLoading(false);
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      },
      (progress) => {
        if (progress.total > 0) {
          console.log('Loading progress:', (progress.loaded / progress.total * 100).toFixed(2) + '%');
        }
      },
      (error) => {
        console.error('Error loading GLTF:', error);
        setError('Failed to load GLTF: ' + error.message);
        setIsLoading(false);
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      }
    );
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const url = URL.createObjectURL(file);
    loadModel(url);
  };

  return (
    <div className="relative" style={{ width: '90vw', height: '90vh', margin: '5vh 5vw' }}>
      <div ref={containerRef} className="w-full h-full" />
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".gltf,.glb"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute top-4 left-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-lg transition-colors"
      >
        Load GLTF/GLB
      </button>
      
      <div className="absolute top-4 right-4 text-white text-sm bg-black bg-opacity-50 p-2 rounded">
        <p>🖱️ Drag to rotate</p>
        <p>🎚️ Scroll to zoom</p>
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-xl">Loading model...</div>
        </div>
      )}
      
      {error && (
        <div className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded max-w-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default GLTFViewer2;