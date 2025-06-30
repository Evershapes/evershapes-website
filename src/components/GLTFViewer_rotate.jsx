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
    modelScale: 5, // size of the bounding cube
    enableMouseControls: true, // New option to enable/disable mouse controls
    preloadedModel: null, // Preloaded model data from GLTFManager
    shouldRender: true // Whether this viewer should actively render
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
  const animationIdRef = useRef(null);
  const [shouldPauseRendering, setShouldPauseRendering] = useState(false);

  // Mouse control state
  const mouseState = useRef({
    isMouseDown: false,
    mouseX: 0,
    mouseY: 0,
    rotationX: settings.cameraAngle * Math.PI / 180, // Initialize with default camera angle
    rotationY: 0,
    targetRotationX: settings.cameraAngle * Math.PI / 180,
    targetRotationY: 0
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup with better near/far ratio to reduce z-fighting
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    scene.add(camera);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8 * Math.PI);
    directionalLight.position.set(0.5, 0, 0.866);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    camera.add(directionalLight);

    // Mouse event handlers - Direct canvas event handling
    const handleMouseDown = (event) => {
      if (!settings.enableMouseControls) return;
      
      mouseState.current.isMouseDown = true;
      mouseState.current.mouseX = event.clientX;
      mouseState.current.mouseY = event.clientY;
      
      // Prevent default behavior and stop propagation
      event.preventDefault();
      event.stopPropagation();
      renderer.domElement.style.cursor = 'grabbing';
      
      // Capture mouse for better drag behavior
      renderer.domElement.setPointerCapture && renderer.domElement.setPointerCapture(event.pointerId);
    };

    const handleMouseMove = (event) => {
      if (!settings.enableMouseControls || !mouseState.current.isMouseDown) return;
      
      const deltaX = event.clientX - mouseState.current.mouseX;
      const deltaY = event.clientY - mouseState.current.mouseY;
      
      // Update rotation based on mouse movement
      mouseState.current.targetRotationY += deltaX * 0.01; // Horizontal rotation
      mouseState.current.targetRotationX += deltaY * 0.01; // Vertical rotation
      
      // Clamp vertical rotation to prevent flipping
      mouseState.current.targetRotationX = Math.max(
        -Math.PI / 2 + 0.1, 
        Math.min(Math.PI / 2 - 0.1, mouseState.current.targetRotationX)
      );
      
      mouseState.current.mouseX = event.clientX;
      mouseState.current.mouseY = event.clientY;
      
      event.preventDefault();
      event.stopPropagation();
    };

    const handleMouseUp = (event) => {
      if (!settings.enableMouseControls) return;
      
      mouseState.current.isMouseDown = false;
      renderer.domElement.style.cursor = 'grab';
      
      // Release pointer capture
      renderer.domElement.releasePointerCapture && renderer.domElement.releasePointerCapture(event.pointerId);
      
      event.preventDefault();
      event.stopPropagation();
    };

    // Handle mouse leave to stop dragging if mouse exits canvas
    const handleMouseLeave = (event) => {
      if (!settings.enableMouseControls) return;
      
      mouseState.current.isMouseDown = false;
      renderer.domElement.style.cursor = 'grab';
    };

    // Prevent context menu on right click
    const handleContextMenu = (event) => {
      event.preventDefault();
      return false;
    };

    // Add event listeners directly to canvas with proper options
    if (settings.enableMouseControls) {
      const canvas = renderer.domElement;
      
      // Set up canvas for interaction
      canvas.style.cursor = 'grab';
      canvas.style.userSelect = 'none'; // Prevent text selection
      canvas.style.touchAction = 'none'; // Prevent default touch behaviors
      
      // Add event listeners with proper options
      canvas.addEventListener('mousedown', handleMouseDown, { passive: false, capture: true });
      canvas.addEventListener('mousemove', handleMouseMove, { passive: false, capture: true });
      canvas.addEventListener('mouseup', handleMouseUp, { passive: false, capture: true });
      canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      canvas.addEventListener('contextmenu', handleContextMenu, { passive: false });
      
      // Also handle pointer events for better compatibility
      canvas.addEventListener('pointerdown', handleMouseDown, { passive: false, capture: true });
      canvas.addEventListener('pointermove', handleMouseMove, { passive: false, capture: true });
      canvas.addEventListener('pointerup', handleMouseUp, { passive: false, capture: true });
      canvas.addEventListener('pointerleave', handleMouseLeave, { passive: true });
    }

    // Animation loop with render pause capability
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      animationIdRef.current = animationId;
      
      // Skip rendering if should pause (for performance)
      if (shouldPauseRendering || !settings.shouldRender) {
        return;
      }
      
      // Auto-rotate the model (only if mouse controls are disabled or not actively dragging)
      if (modelRef.current && (!settings.enableMouseControls || !mouseState.current.isMouseDown)) {
        modelRef.current.rotation.y += settings.autoRotateSpeed;
      }
      
      // Smooth camera rotation interpolation
      const lerpFactor = 0.05; // Adjust for smoother/faster camera movement
      mouseState.current.rotationX = THREE.MathUtils.lerp(
        mouseState.current.rotationX, 
        mouseState.current.targetRotationX, 
        lerpFactor
      );
      mouseState.current.rotationY = THREE.MathUtils.lerp(
        mouseState.current.rotationY, 
        mouseState.current.targetRotationY, 
        lerpFactor
      );
      
      // Update camera position based on current rotation
      const distance = settings.cameraDistance;
      camera.position.x = distance * Math.sin(mouseState.current.rotationY) * Math.cos(mouseState.current.rotationX);
      camera.position.y = distance * Math.sin(mouseState.current.rotationX);
      camera.position.z = distance * Math.cos(mouseState.current.rotationY) * Math.cos(mouseState.current.rotationX);
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
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      
      if (settings.enableMouseControls) {
        const canvas = renderer.domElement;
        if (canvas) {
          // Remove mouse event listeners
          canvas.removeEventListener('mousedown', handleMouseDown);
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseup', handleMouseUp);
          canvas.removeEventListener('mouseleave', handleMouseLeave);
          canvas.removeEventListener('contextmenu', handleContextMenu);
          
          // Remove pointer event listeners
          canvas.removeEventListener('pointerdown', handleMouseDown);
          canvas.removeEventListener('pointermove', handleMouseMove);
          canvas.removeEventListener('pointerup', handleMouseUp);
          canvas.removeEventListener('pointerleave', handleMouseLeave);
        }
      }
      
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  // Handle preloaded model or load from path
  useEffect(() => {
    if (sceneRef.current && !modelLoaded) {
      if (settings.preloadedModel) {
        // Use preloaded model (standard approach)
        console.log('Using preloaded model:', settings.preloadedModel);
        setupPreloadedModel(settings.preloadedModel);
        setModelLoaded(true);
      } else if (settings.modelPath) {
        // Fallback: Load model from path
        console.log('Fallback: Loading model from path:', settings.modelPath);
        loadModel(settings.modelPath);
        setModelLoaded(true);
      }
    }
  }, [sceneRef.current, settings.preloadedModel, settings.modelPath]);

  // Monitor shouldRender changes
  useEffect(() => {
    setShouldPauseRendering(!settings.shouldRender);
  }, [settings.shouldRender]);

  const setupPreloadedModel = (preloadedModelData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const scene = sceneRef.current;
      
      // Clear existing model
      if (modelRef.current) {
        scene.remove(modelRef.current);
        disposeModel(modelRef.current);
      }

      // Stop existing animations
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }

      // Clone the preloaded model to avoid conflicts
      const model = preloadedModelData.scene.clone();
      modelRef.current = model;
      
      // Setup model (same as loadModel)
      setupModelInScene(model, preloadedModelData.animations);
      
      setIsLoading(false);
      console.log('Preloaded model setup complete');
      
    } catch (error) {
      console.error('Error setting up preloaded model:', error);
      setError('Failed to setup preloaded model: ' + error.message);
      setIsLoading(false);
    }
  };

  const setupModelInScene = (model, animations) => {
    const scene = sceneRef.current;
    
    // Center and scale the model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = settings.modelScale / maxDim;
    
    model.scale.setScalar(scale);
    
    // Center the model horizontally and place it on top of the grid
    box.setFromObject(model);
    box.getCenter(center);
    model.position.x = -center.x;
    model.position.z = -center.z;
    model.position.y = -box.min.y * scale;
    
    // Rotate the model by configured degrees on Y axis
    model.rotation.y = settings.modelRotation * Math.PI / 180;
    
    // Enable shadows and fix z-fighting
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          child.material.needsUpdate = true;
          child.material.polygonOffset = true;
          child.material.polygonOffsetFactor = 1;
          child.material.polygonOffsetUnits = 1;
          child.material.depthWrite = true;
          child.material.depthTest = true;
        }
      }
    });
    
    scene.add(model);
    
    // Set up animations if any
    if (animations && animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(model);
      
      animations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip);
        action.play();
      });
      
      console.log(`Playing ${animations.length} animations`);
    }
    
    // Adjust camera distance based on model size or use configured distance
    const calculatedDistance = maxDim * 2.5;
    const finalDistance = settings.cameraDistance === 10 ? calculatedDistance : settings.cameraDistance;
    const camera = cameraRef.current;
    camera.position.set(finalDistance, finalDistance * 0.5, finalDistance);
    camera.lookAt(0, 0, 0);
  };

  const disposeModel = (model) => {
    if (model) {
      model.traverse((child) => {
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
  };
  const loadModel = (url) => {
    setIsLoading(true);
    setError(null);
    
    // Clear existing model
    const scene = sceneRef.current;
    if (modelRef.current) {
      scene.remove(modelRef.current);
      disposeModel(modelRef.current);
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
        
        // Setup model in scene
        setupModelInScene(model, gltf.animations);
        
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
          <div className="text-white text-xl BriceSemiBoldSemiExpanded">Loading model...</div>
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