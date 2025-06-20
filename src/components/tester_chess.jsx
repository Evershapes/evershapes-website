import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

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

  useEffect(() => {
    // Step 1: Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Step 2: Set up the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(6, 7, 6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Step 3: Set up the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Step 4: Create the base/table with outline
    const baseSize = 5.5; // Slightly larger than board
    const baseGeometry = new THREE.BoxGeometry(baseSize, 0.5, baseSize);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xF07167,  // Coral/salmon color
      shininess: 30
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.25;
    base.receiveShadow = true;
    base.castShadow = true;
    scene.add(base);

    // Add outline to the base
    const baseOutlineGeometry = new THREE.BoxGeometry(baseSize + 0.1, 0.52, baseSize + 0.1);
    const baseOutlineMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xF07167,  // Same coral/salmon color for uniform appearance
      shininess: 50
    });
    const baseOutline = new THREE.Mesh(baseOutlineGeometry, baseOutlineMaterial);
    baseOutline.position.y = -0.25;
    scene.add(baseOutline);

    // Step 5: Create the chessboard (larger relative to base)
    const boardSize = 4;
    const squareSize = 1.2; // Increased square size
    const boardGroup = new THREE.Group();
    boardGroup.position.y = 0.05; // Position board on top of base

    // Create materials for white and black squares
    const whiteMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      shininess: 100
    });
    const blackMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      shininess: 100
    });

    // Step 6: Create the board squares with position tracking
    squaresRef.current = [];
    const boardPositions = {}; // Store square positions by notation

    // Create border material
    const borderMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c1810,
      shininess: 80
    });

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        // Position for this square
        const xPos = (col - boardSize / 2 + 0.5) * squareSize;
        const zPos = (row - boardSize / 2 + 0.5) * squareSize;
        
        // Create border/outline for the square
        const borderGeometry = new THREE.BoxGeometry(squareSize, 0.08, squareSize);
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.x = xPos;
        border.position.z = zPos;
        border.position.y = -0.01; // Slightly below the main square
        border.receiveShadow = true;
        boardGroup.add(border);
        
        // Create main square geometry (slightly smaller for border effect)
        const innerSquareSize = squareSize * 0.92;
        const squareGeometry = new THREE.BoxGeometry(innerSquareSize, 0.1, innerSquareSize);
        
        // Alternate colors
        const isWhite = (row + col) % 2 === 0;
        const material = isWhite ? whiteMaterial : blackMaterial;
        
        // Create mesh
        const square = new THREE.Mesh(squareGeometry, material);
        square.position.x = xPos;
        square.position.z = zPos;
        square.position.y = 0;
        
        // Store grid position for piece placement
        square.userData = { row, col, occupied: false };
        
        // Create chess notation (A1, B2, etc.)
        const colLetter = String.fromCharCode(65 + col); // A, B, C, D
        const rowNumber = row + 1; // 1, 2, 3, 4
        const notation = colLetter + rowNumber;
        boardPositions[notation] = { x: xPos, z: zPos, square };
        
        // Enable shadows
        square.castShadow = true;
        square.receiveShadow = true;
        
        boardGroup.add(square);
        squaresRef.current.push(square);
      }
    }

    // Add board to scene
    scene.add(boardGroup);

    // Add outer frame around the entire board
    const frameThickness = 0.15;
    const frameHeight = 0.2;
    const boardTotalSize = boardSize * squareSize;
    
    // Create frame pieces
    const frameMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c1810,
      shininess: 100
    });
    
    // Top and bottom frame pieces
    const horizontalFrameGeometry = new THREE.BoxGeometry(
      boardTotalSize + frameThickness * 2, 
      frameHeight, 
      frameThickness
    );
    
    // Top frame
    const topFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
    topFrame.position.z = boardTotalSize / 2 + frameThickness / 2;
    topFrame.position.y = frameHeight / 2 - 0.05;
    topFrame.castShadow = true;
    boardGroup.add(topFrame);
    
    // Bottom frame
    const bottomFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
    bottomFrame.position.z = -boardTotalSize / 2 - frameThickness / 2;
    bottomFrame.position.y = frameHeight / 2 - 0.05;
    bottomFrame.castShadow = true;
    boardGroup.add(bottomFrame);
    
    // Left and right frame pieces
    const verticalFrameGeometry = new THREE.BoxGeometry(
      frameThickness, 
      frameHeight, 
      boardTotalSize
    );
    
    // Left frame
    const leftFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
    leftFrame.position.x = -boardTotalSize / 2 - frameThickness / 2;
    leftFrame.position.y = frameHeight / 2 - 0.05;
    leftFrame.castShadow = true;
    boardGroup.add(leftFrame);
    
    // Right frame
    const rightFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
    rightFrame.position.x = boardTotalSize / 2 + frameThickness / 2;
    rightFrame.position.y = frameHeight / 2 - 0.05;
    rightFrame.castShadow = true;
    boardGroup.add(rightFrame);

    // Step 7: Create piece geometries and materials
    const createPiece = (type, color, position) => {
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
      
      // Position piece on the board
      piece.position.x = position.x;
      piece.position.y = 0.4; // Height above board
      piece.position.z = position.z;
      
      return piece;
    };

    // Step 8: Place example pieces at A3, D3, and D4
    const placeExamplePieces = () => {
      // A3 - Pawn (white piece)
      if (boardPositions['A3']) {
        const pawn = createPiece('pawn', 'white', boardPositions['A3']);
        scene.add(pawn);
        piecesRef.current.push(pawn);
        boardPositions['A3'].square.userData.occupied = true;
      }

      // D3 - Rook (black piece)
      if (boardPositions['D3']) {
        const rook = createPiece('rook', 'black', boardPositions['D3']);
        scene.add(rook);
        piecesRef.current.push(rook);
        boardPositions['D3'].square.userData.occupied = true;
      }

      // D4 - King (white piece)
      if (boardPositions['D4']) {
        const king = createPiece('king', 'white', boardPositions['D4']);
        scene.add(king);
        piecesRef.current.push(king);
        boardPositions['D4'].square.userData.occupied = true;
      }
    };

    // Place the example pieces
    placeExamplePieces();

    // Step 9: Add lighting
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

    // Step 10: Add helper light for better visibility
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Step 11: Handle click events for piece placement (no removal)
    const handleClick = (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update the picking ray with the camera and mouse position
      raycasterRef.current.setFromCamera(mouseRef.current, camera);

      // Calculate objects intersecting the picking ray
      const intersects = raycasterRef.current.intersectObjects(squaresRef.current);

      if (intersects.length > 0) {
        const square = intersects[0].object;
        const { row, col, occupied } = square.userData;

        if (!occupied) {
          // Place a piece only on empty squares
          const worldPos = new THREE.Vector3();
          // Use the stored position from boardPositions for accuracy
          const colLetter = String.fromCharCode(65 + col);
          const rowNumber = row + 1;
          const notation = colLetter + rowNumber;
          const position = boardPositions[notation];
          
          const piece = createPiece(
            selectedPieceType, 
            (row + col) % 2 === 0 ? 'black' : 'white',
            { x: position.x, z: position.z }
          );
          
          scene.add(piece);
          piecesRef.current.push(piece);
          square.userData.occupied = true;

          // Add placement animation
          piece.scale.set(0, 0, 0);
          const startTime = Date.now();
          const animatePlacement = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / 300, 1);
            const scale = progress;
            piece.scale.set(scale, scale, scale);
            piece.position.y = 0.4 + Math.sin(progress * Math.PI) * 0.2;
            
            if (progress < 1) {
              requestAnimationFrame(animatePlacement);
            } else {
              piece.position.y = 0.4;
            }
          };
          animatePlacement();
        }
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    // Step 12: Mouse movement for rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event) => {
      if (event.shiftKey) { // Only rotate when shift is held
        mouseX = (event.clientX - window.innerWidth / 2) / 100;
        mouseY = (event.clientY - window.innerHeight / 2) / 100;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Step 13: Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Smooth rotation based on mouse position (only when shift is held)
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.3;
      
      boardGroup.rotation.y += (targetRotationY - boardGroup.rotation.y) * 0.05;
      boardGroup.rotation.x += (targetRotationX - boardGroup.rotation.x) * 0.05;

      // Rotate pieces with the board
      piecesRef.current.forEach(piece => {
        piece.rotation.y = boardGroup.rotation.y;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Step 14: Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

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
    <div style={{ position: 'relative', width: '100vw', height: '90vh' }}>
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          overflow: 'hidden',
          cursor: 'pointer'
        }} 
      />
      
      {/* UI Controls */}
      <div style={{ 
        position: 'absolute', 
        top: 20, 
        left: 20, 
        background: 'rgba(255,255,255,0.9)',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Chess Piece Selector</h3>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="radio" 
              value="pawn" 
              checked={selectedPieceType === 'pawn'}
              onChange={(e) => setSelectedPieceType(e.target.value)}
              style={{ marginRight: '8px' }}
            />
            Pawn (Small Cylinder)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="radio" 
              value="rook" 
              checked={selectedPieceType === 'rook'}
              onChange={(e) => setSelectedPieceType(e.target.value)}
              style={{ marginRight: '8px' }}
            />
            Rook (Medium Cylinder)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="radio" 
              value="king" 
              checked={selectedPieceType === 'king'}
              onChange={(e) => setSelectedPieceType(e.target.value)}
              style={{ marginRight: '8px' }}
            />
            King (Tall Cylinder)
          </label>
        </div>
        <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
          <p style={{ margin: '5px 0' }}>• Click empty squares to place pieces</p>
          <p style={{ margin: '5px 0' }}>• Hold Shift + Move mouse to rotate</p>
          <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Example pieces: A3, D3, D4</p>
        </div>
      </div>
      
      {/* Board position guide */}
      <div style={{ 
        position: 'absolute', 
        bottom: 20, 
        left: 20, 
        background: 'rgba(255,255,255,0.9)',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        <div style={{ marginBottom: '5px' }}>Board Positions:</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 30px)', gap: '2px' }}>
          {['D4', 'C4', 'B4', 'A4'].map(pos => (
            <div key={pos} style={{ 
              textAlign: 'center', 
              padding: '2px',
              background: pos === 'D4' ? '#ffeb3b' : 'transparent'
            }}>{pos}</div>
          ))}
          {['D3', 'C3', 'B3', 'A3'].map(pos => (
            <div key={pos} style={{ 
              textAlign: 'center', 
              padding: '2px',
              background: (pos === 'D3' || pos === 'A3') ? '#ffeb3b' : 'transparent'
            }}>{pos}</div>
          ))}
          {['D2', 'C2', 'B2', 'A2'].map(pos => (
            <div key={pos} style={{ textAlign: 'center', padding: '2px' }}>{pos}</div>
          ))}
          {['D1', 'C1', 'B1', 'A1'].map(pos => (
            <div key={pos} style={{ textAlign: 'center', padding: '2px' }}>{pos}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard4x4;