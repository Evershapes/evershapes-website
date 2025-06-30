import { useState, useEffect, useRef } from 'react';

/**
 * Standard model loading hook
 * Follows React best practices for async operations
 */
const useModelLoader = (modelPath, shouldLoad = false) => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // Reset state when modelPath changes
    setModel(null);
    setError(null);
    setProgress(0);
  }, [modelPath]);

  useEffect(() => {
    if (!shouldLoad || !modelPath || model) return;

    const loadModel = async () => {
      setLoading(true);
      setError(null);
      setProgress(0);

      // Create abort controller for cleanup
      abortControllerRef.current = new AbortController();

      try {
        // Dynamic import to avoid bundling issues
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader');
        const loader = new GLTFLoader();

        const gltf = await new Promise((resolve, reject) => {
          loader.load(
            modelPath,
            (gltf) => {
              if (abortControllerRef.current?.signal.aborted) {
                reject(new Error('Loading aborted'));
                return;
              }
              resolve(gltf);
            },
            (progressEvent) => {
              if (abortControllerRef.current?.signal.aborted) return;
              
              if (progressEvent.total > 0) {
                const progressPercent = progressEvent.loaded / progressEvent.total;
                setProgress(progressPercent);
              }
            },
            (error) => {
              if (abortControllerRef.current?.signal.aborted) return;
              reject(error);
            }
          );
        });

        if (!abortControllerRef.current?.signal.aborted) {
          setModel({
            scene: gltf.scene,
            animations: gltf.animations,
            metadata: {
              loadedAt: Date.now(),
              modelPath
            }
          });
          setProgress(1);
        }

      } catch (err) {
        if (!abortControllerRef.current?.signal.aborted) {
          console.error('Error loading GLTF model:', err);
          setError(err.message || 'Failed to load 3D model');
        }
      } finally {
        if (!abortControllerRef.current?.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadModel();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [shouldLoad, modelPath, model]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    model,
    loading,
    error,
    progress,
    // Helper methods
    isLoaded: !!model,
    progressPercent: Math.round(progress * 100)
  };
};

export default useModelLoader;