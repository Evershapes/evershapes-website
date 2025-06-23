import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ChessBoard4x4 = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const frameIdRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const cameraRef = useRef(null);
  const piecesRef = useRef([]);
  const squaresRef = useRef([]);
  
  const [selectedPieceType, setSelectedPieceType] = useState('pawn');
  const [modelLoadStatus, setModelLoadStatus] = useState('not-started');
  const [debugInfo, setDebugInfo] = useState([]);
  
  // Store loaded GLTF models
  const loadedModelsRef = useRef({});
  const gltfLoaderRef = useRef(null);

  // Debug logging function
  const addDebugLog = (message, type = 'info') => {
    console.log(`[${type.toUpperCase()}] ${message}`);
    setDebugInfo(prev => [...prev, { message, type, timestamp: new Date().toISOString() }]);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    addDebugLog('Initializing scene setup');

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const radius = 4.32;
    const angleY = Math.PI / 9;
    camera.position.set(
      radius * Math.sin(angleY), 
      5.04,
      radius * Math.cos(angleY)
    );
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    addDebugLog('Basic scene components created');

    // Initialize GLTF Loader
    addDebugLog('Initializing GLTF Loader');
    gltfLoaderRef.current = new GLTFLoader();
    
    // Load GLTF models
    const loadGLTFModels = async () => {
      addDebugLog('Starting GLTF model loading process');
      setModelLoadStatus('loading');
      
      try {
        // Load rooster model - try both .gltf and .glb
        addDebugLog('Attempting to load rooster model');
        
        const tryLoadModel = (path, format) => {
          return new Promise((resolve, reject) => {
            addDebugLog(`Trying to load ${path} as ${format}`);
            gltfLoaderRef.current.load(
              path,
              (gltf) => {
                addDebugLog(`Successfully loaded ${path}!`, 'success');
                resolve(gltf);
              },
              (xhr) => {
                if (xhr.total > 0) {
                  const percentComplete = (xhr.loaded / xhr.total) * 100;
                  addDebugLog(`Loading progress: ${percentComplete.toFixed(2)}%`);
                }
              },
              (error) => {
                addDebugLog(`Failed to load ${path}: ${error.message}`, 'warning');
                reject(error);
              }
            );
          });
        };
        
        // Try .gltf first, then .glb
        tryLoadModel('/assets/rooster.gltf', 'GLTF')
          .catch((error) => {
            addDebugLog('Failed to load GLTF, checking file...', 'warning');
            // Try to fetch and inspect the file
            return fetch('/assets/rooster.gltf')
              .then(response => {
                addDebugLog(`Response status: ${response.status}`, 'info');
                addDebugLog(`Content-Type: ${response.headers.get('content-type')}`, 'info');
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
              })
              .then(text => {
                addDebugLog(`File length: ${text.length} characters`, 'info');
                addDebugLog(`First 100 chars: ${text.substring(0, 100)}`, 'info');
                // Try loading as GLB instead
                return tryLoadModel('/assets/rooster.glb', 'GLB');
              });
          })
          .then((gltf) => {
            addDebugLog('Rooster GLTF loaded successfully!', 'success');
            addDebugLog(`GLTF contains ${gltf.scene.children.length} children`);
            
            // Store the loaded model
            loadedModelsRef.current['rooster'] = gltf.scene;
            
            // Process all meshes and apply proper scaling
            let meshCount = 0;
            let totalVertices = 0;
            
            gltf.scene.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                meshCount++;
                const vertexCount = child.geometry.attributes.position.count;
                totalVertices += vertexCount;
                addDebugLog(`Mesh ${meshCount}: ${child.name || 'unnamed'} (${vertexCount} vertices)`);
              }
            });
            
            addDebugLog(`Total: ${meshCount} meshes, ${totalVertices} vertices`);
            
            // Calculate model bounds for scaling
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            addDebugLog(`Model bounds: ${size.x.toFixed(3)} x ${size.y.toFixed(3)} x ${size.z.toFixed(3)}`);
            addDebugLog(`Model center: ${center.x.toFixed(3)}, ${center.y.toFixed(3)}, ${center.z.toFixed(3)}`);
            
            // Center the model at origin for proper scaling
            gltf.scene.position.sub(center);
            
            setModelLoadStatus('loaded');
          })
          .catch((error) => {
            addDebugLog('Failed to load model in either format', 'error');
            addDebugLog('Will fall back to placeholder pieces', 'warning');
            setModelLoadStatus('error');
          });
      } catch (error) {
        addDebugLog(`Caught error during model loading: ${error.message}`, 'error');
        setModelLoadStatus('error');
      }
    };

    // Start loading models
    loadGLTFModels();

    // Create the base/table
    const baseSize = 5.5;
    const baseGeometry = new THREE.BoxGeometry(baseSize, 0.5, baseSize);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      shininess: 30
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -3.25;
    base.receiveShadow = true;
    base.castShadow = true;
    scene.add(base);

    // Base outline
    const baseOutlineGeometry = new THREE.BoxGeometry(baseSize + 0.1, 0.52, baseSize + 0.1);
    const baseOutlineMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x654321,
      shininess: 50
    });
    const baseOutline = new THREE.Mesh(baseOutlineGeometry, baseOutlineMaterial);
    baseOutline.position.y = -3.25;
    scene.add(baseOutline);

    // Create the chessboard
    const boardSize = 4;
    const squareSize = 1.2;
    const boardGroup = new THREE.Group();
    boardGroup.position.y = -2.95;

    // Materials for squares
    const whiteMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      shininess: 100
    });
    const blackMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      shininess: 100
    });

    // Board squares with position tracking
    squaresRef.current = [];
    const boardPositions = {};

    // Border material
    const borderMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c1810,
      shininess: 80
    });

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const xPos = (col - boardSize / 2 + 0.5) * squareSize;
        const zPos = (row - boardSize / 2 + 0.5) * squareSize;
        
        // Square border
        const borderGeometry = new THREE.BoxGeometry(squareSize, 0.08, squareSize);
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.x = xPos;
        border.position.z = zPos;
        border.position.y = -0.01;
        border.receiveShadow = true;
        boardGroup.add(border);
        
        // Main square
        const innerSquareSize = squareSize * 0.92;
        const squareGeometry = new THREE.BoxGeometry(innerSquareSize, 0.1, innerSquareSize);
        const isWhite = (row + col) % 2 === 0;
        const material = isWhite ? whiteMaterial : blackMaterial;
        
        const square = new THREE.Mesh(squareGeometry, material);
        square.position.x = xPos;
        square.position.z = zPos;
        square.position.y = 0;
        square.userData = { row, col, occupied: false };
        
        // Chess notation
        const colLetter = String.fromCharCode(65 + col);
        const rowNumber = row + 1;
        const notation = colLetter + rowNumber;
        boardPositions[notation] = { x: xPos, z: zPos, square };
        
        square.castShadow = true;
        square.receiveShadow = true;
        
        boardGroup.add(square);
        squaresRef.current.push(square);
      }
    }

    scene.add(boardGroup);

    // Board frame
    const frameThickness = 0.15;
    const frameHeight = 0.2;
    const boardTotalSize = boardSize * squareSize;
    
    const frameMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c1810,
      shininess: 100
    });
    
    // Frame pieces
    const horizontalFrameGeometry = new THREE.BoxGeometry(
      boardTotalSize + frameThickness * 2, 
      frameHeight, 
      frameThickness
    );
    
    const topFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
    topFrame.position.z = boardTotalSize / 2 + frameThickness / 2;
    topFrame.position.y = frameHeight / 2 - 0.05;
    topFrame.castShadow = true;
    boardGroup.add(topFrame);
    
    const bottomFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
    bottomFrame.position.z = -boardTotalSize / 2 - frameThickness / 2;
    bottomFrame.position.y = frameHeight / 2 - 0.05;
    bottomFrame.castShadow = true;
    boardGroup.add(bottomFrame);
    
    const verticalFrameGeometry = new THREE.BoxGeometry(
      frameThickness, 
      frameHeight, 
      boardTotalSize
    );
    
    const leftFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
    leftFrame.position.x = -boardTotalSize / 2 - frameThickness / 2;
    leftFrame.position.y = frameHeight / 2 - 0.05;
    leftFrame.castShadow = true;
    boardGroup.add(leftFrame);
    
    const rightFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
    rightFrame.position.x = boardTotalSize / 2 + frameThickness / 2;
    rightFrame.position.y = frameHeight / 2 - 0.05;
    rightFrame.castShadow = true;
    boardGroup.add(rightFrame);

    // Enhanced piece creation function with GLTF support
    const createPiece = (type, color, position) => {
      addDebugLog(`Creating piece: ${type} (${color}) at position ${position.x.toFixed(2)}, ${position.z.toFixed(2)}`);
      
      // Check if we should use GLTF model
      if (type === 'rooster' && loadedModelsRef.current['rooster']) {
        addDebugLog('Using GLTF model for rooster piece');
        
        try {
          // Clone the loaded model
          const piece = loadedModelsRef.current['rooster'].clone();
          
          // Calculate bounds of the cloned piece
          const box = new THREE.Box3().setFromObject(piece);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          
          // Scale the model to fit the board
          const maxDim = Math.max(size.x, size.y, size.z);
          const targetHeight = 0.6; // Adjust this to fit your board scale
          const scale = targetHeight / maxDim;
          piece.scale.set(scale, scale, scale);
          
          addDebugLog(`Scaled rooster by factor: ${scale.toFixed(3)}`);
          
          // Apply color tinting to the textured model
          piece.traverse((child) => {
            if (child.isMesh && child.material) {
              // Clone the material to avoid affecting other pieces
              child.material = child.material.clone();
              
              // For textured models, we'll tint the texture
              if (child.material.map) {
                if (color === 'white') {
                  // Keep original texture colors for white pieces
                  child.material.color = new THREE.Color(1, 1, 1);
                } else {
                  // Darken the texture for black pieces
                  child.material.color = new THREE.Color(0.2, 0.2, 0.2);
                }
              } else {
                // For non-textured parts, apply solid colors
                if (color === 'white') {
                  child.material.color = new THREE.Color(0.9, 0.9, 0.9);
                } else {
                  child.material.color = new THREE.Color(0.1, 0.1, 0.1);
                }
              }
            }
          });
          
          // Create a group to properly position the piece
          const pieceGroup = new THREE.Group();
          pieceGroup.add(piece);
          
          // Center the piece at origin and position at board level
          const scaledBox = new THREE.Box3().setFromObject(piece);
          const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
          piece.position.sub(scaledCenter);
          piece.position.y = -scaledBox.min.y;
          
          pieceGroup.userData = { type, color };
          pieceGroup.position.x = position.x;
          pieceGroup.position.y = -2.6;
          pieceGroup.position.z = position.z;
          
          addDebugLog('GLTF rooster piece created successfully', 'success');
          return pieceGroup;
        } catch (error) {
          addDebugLog(`Error creating GLTF piece: ${error.message}`, 'error');
          addDebugLog('Falling back to placeholder piece', 'warning');
        }
      }
      
      // Fallback to placeholder pieces
      addDebugLog(`Using placeholder geometry for ${type}`);
      let geometry;
      
      switch(type) {
        case 'pawn':
          geometry = new THREE.CylinderGeometry(0.25, 0.3, 0.5, 16);
          break;
        case 'rook':
          geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.7, 8);
          break;
        case 'king':
          geometry = new THREE.CylinderGeometry(0.27, 0.35, 1, 16);
          break;
        case 'rooster':
          // Placeholder for rooster if GLTF fails
          geometry = new THREE.ConeGeometry(0.25, 0.8, 8);
          break;
        default:
          geometry = new THREE.CylinderGeometry(0.25, 0.3, 0.5, 16);
      }

      const material = new THREE.MeshPhongMaterial({
        color: color === 'white' ? 0xffffff : 0x111111,
        shininess: 100
      });

      const piece = new THREE.Mesh(geometry, material);
      piece.castShadow = true;
      piece.receiveShadow = true;
      piece.userData = { type, color };
      
      piece.position.x = position.x;
      piece.position.y = -2.6;
      piece.position.z = position.z;
      
      return piece;
    };

    // Place example pieces
    const placeExamplePieces = () => {
      addDebugLog('Placing example pieces on board');
      
      if (boardPositions['A3']) {
        const pawn = createPiece('pawn', 'white', boardPositions['A3']);
        scene.add(pawn);
        piecesRef.current.push(pawn);
        boardPositions['A3'].square.userData.occupied = true;
      }

      if (boardPositions['D3']) {
        const rook = createPiece('rook', 'black', boardPositions['D3']);
        scene.add(rook);
        piecesRef.current.push(rook);
        boardPositions['D3'].square.userData.occupied = true;
      }

      if (boardPositions['D4']) {
        const king = createPiece('king', 'white', boardPositions['D4']);
        scene.add(king);
        piecesRef.current.push(king);
        boardPositions['D4'].square.userData.occupied = true;
      }

      // Add a rooster piece as example if model is loaded
      if (boardPositions['B2']) {
        const rooster = createPiece('rooster', 'black', boardPositions['B2']);
        scene.add(rooster);
        piecesRef.current.push(rooster);
        boardPositions['B2'].square.userData.occupied = true;
      }
    };

    // Wait a bit for models to potentially load before placing pieces
    setTimeout(() => {
      placeExamplePieces();
    }, 1000);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Click handler for piece placement
    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(squaresRef.current);

      if (intersects.length > 0) {
        const square = intersects[0].object;
        const { row, col, occupied } = square.userData;

        if (!occupied) {
          const colLetter = String.fromCharCode(65 + col);
          const rowNumber = row + 1;
          const notation = colLetter + rowNumber;
          const position = boardPositions[notation];
          
          addDebugLog(`Placing ${selectedPieceType} at ${notation}`);
          
          const piece = createPiece(
            selectedPieceType, 
            (row + col) % 2 === 0 ? 'black' : 'white',
            { x: position.x, z: position.z }
          );
          
          scene.add(piece);
          piecesRef.current.push(piece);
          square.userData.occupied = true;

          // Placement animation
          piece.scale.set(0, 0, 0);
          const startTime = Date.now();
          const animatePlacement = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / 300, 1);
            const scale = progress;
            piece.scale.set(scale, scale, scale);
            piece.position.y = -2.6 + Math.sin(progress * Math.PI) * 0.2;
            
            if (progress < 1) {
              requestAnimationFrame(animatePlacement);
            } else {
              piece.position.y = -2.6;
            }
          };
          animatePlacement();
        }
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    // Mouse movement for rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event) => {
      if (event.shiftKey) {
        mouseX = (event.clientX - window.innerWidth / 2) / 100;
        mouseY = (event.clientY - window.innerHeight / 2) / 100;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.3;
      
      boardGroup.rotation.y += (targetRotationY - boardGroup.rotation.y) * 0.05;
      boardGroup.rotation.x += (targetRotationX - boardGroup.rotation.x) * 0.05;

      piecesRef.current.forEach(piece => {
        piece.rotation.y = boardGroup.rotation.y;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    addDebugLog('Scene setup complete', 'success');

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedPieceType]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-4xl aspect-video overflow-hidden">
        <div 
          ref={mountRef} 
          className="w-full h-full cursor-pointer"
        />
        
        {/* Piece selector */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 p-4 rounded">
          <h3 className="text-white mb-2">Select Piece Type:</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setSelectedPieceType('pawn')}
              className={`px-3 py-1 rounded ${selectedPieceType === 'pawn' ? 'bg-blue-500' : 'bg-gray-600'} text-white`}
            >
              Pawn
            </button>
            <button 
              onClick={() => setSelectedPieceType('rook')}
              className={`px-3 py-1 rounded ${selectedPieceType === 'rook' ? 'bg-blue-500' : 'bg-gray-600'} text-white`}
            >
              Rook
            </button>
            <button 
              onClick={() => setSelectedPieceType('king')}
              className={`px-3 py-1 rounded ${selectedPieceType === 'king' ? 'bg-blue-500' : 'bg-gray-600'} text-white`}
            >
              King
            </button>
            <button 
              onClick={() => setSelectedPieceType('rooster')}
              className={`px-3 py-1 rounded ${selectedPieceType === 'rooster' ? 'bg-blue-500' : 'bg-gray-600'} text-white`}
            >
              Rooster
            </button>
          </div>
        </div>

        {/* Model load status */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 p-4 rounded text-white">
          <h3 className="mb-2">Model Status:</h3>
          <p className={`${
            modelLoadStatus === 'loaded' ? 'text-green-400' : 
            modelLoadStatus === 'error' ? 'text-red-400' : 
            'text-yellow-400'
          }`}>
            {modelLoadStatus === 'not-started' && 'Not started'}
            {modelLoadStatus === 'loading' && 'Loading rooster.gltf...'}
            {modelLoadStatus === 'loaded' && '✓ Rooster model loaded'}
            {modelLoadStatus === 'error' && '✗ Failed to load model'}
          </p>
        </div>

        {/* Debug console */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 p-4 rounded text-white max-w-md max-h-48 overflow-y-auto">
          <h3 className="mb-2 text-sm font-bold">Debug Console:</h3>
          <div className="text-xs font-mono space-y-1">
            {debugInfo.slice(-10).map((log, index) => (
              <div 
                key={index} 
                className={`${
                  log.type === 'error' ? 'text-red-400' : 
                  log.type === 'warning' ? 'text-yellow-400' : 
                  log.type === 'success' ? 'text-green-400' : 
                  'text-gray-300'
                }`}
              >
                [{log.timestamp.split('T')[1].split('.')[0]}] {log.message}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 p-4 rounded text-white text-sm">
          <p>Click on empty squares to place pieces</p>
          <p>Hold Shift + Move mouse to rotate board</p>
        </div>
      </div>
    </div>
  );
};

export default ChessBoard4x4;