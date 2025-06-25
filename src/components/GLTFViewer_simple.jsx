import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const GLTFViewer = ({ config = {} }) => {
  // Default configuration
  const defaultConfig = {
    modelPath: '/scene/evershapes_scene1.gltf',
    cameraAngle: 30,
    cameraDistance: 5,
    autoRotateSpeed: 0.005,
    modelRotation: 90, // degrees
    modelScale: 5 // size of the bounding cube
  };
  
  // Merge provided config with defaults
  const settings = { ...defaultConfig, ...config };
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

    // Camera setup with better near/far ratio to reduce z-fighting
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1, // Increased from 0.01 to reduce z-fighting
      100  // Reduced from 1000 for better depth precision
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    // Add camera to scene (important for camera-attached lights)
    scene.add(camera);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true, // Enable transparency
      logarithmicDepthBuffer: true // Helps with z-fighting on overlapping surfaces
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softest shadows
    renderer.shadowMap.autoUpdate = true; // Ensure shadows update with animations
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
    camera.add(directionalLight);

    // Fixed camera settings (no mouse controls)
    const targetRotationX = settings.cameraAngle * Math.PI / 180; // Convert degrees to radians
    const targetRotationY = 0;
    const distance = settings.cameraDistance;

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Auto-rotate the model
      if (modelRef.current) {
        modelRef.current.rotation.y += settings.autoRotateSpeed;
      }
      
      // Fixed camera position
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
      
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  // Load default model on mount
  useEffect(() => {
    if (sceneRef.current && !modelLoaded) {
      loadModel(settings.modelPath);
      setModelLoaded(true);
    }
  }, [sceneRef.current, modelLoaded, settings.modelPath]);

  const loadModel = (url) => {
    setIsLoading(true);
    setError(null);
    
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
        const scale = settings.modelScale / maxDim; // Scale to fit in configured cube size
        
        model.scale.setScalar(scale);
        
        // Center the model horizontally and place it on top of the grid
        box.setFromObject(model);
        box.getCenter(center);
        model.position.x = -center.x;
        model.position.z = -center.z;
        // Place the bottom of the model at y=0 (on the grid)
        model.position.y = -box.min.y * scale;
        
        // Rotate the model by configured degrees on Y axis
        model.rotation.y = settings.modelRotation * Math.PI / 180;
        
        // Enable shadows and fix z-fighting
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Ensure materials are properly set up
            if (child.material) {
              child.material.needsUpdate = true;
              
              // Fix z-fighting for overlapping surfaces
              child.material.polygonOffset = true;
              child.material.polygonOffsetFactor = 1; // Positive values push geometry away
              child.material.polygonOffsetUnits = 1;
              
              // Ensure proper rendering order
              child.material.depthWrite = true;
              child.material.depthTest = true;
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
        
        // Adjust camera distance based on model size or use configured distance
        const calculatedDistance = maxDim * 2.5;
        const finalDistance = settings.cameraDistance === 10 ? calculatedDistance : settings.cameraDistance;
        const camera = cameraRef.current;
        camera.position.set(finalDistance, finalDistance * 0.5, finalDistance);
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
    <div className="relative" style={{ width: '100vw', height: '100vh'}}>
      <div ref={containerRef} className="w-full h-full" />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xxl">Loading model...</div>
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

export default GLTFViewer;