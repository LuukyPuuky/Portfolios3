"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111111, 10, 35);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.enableZoom = false;
    controls.enablePan = false;

    // Load GLB Model
    let model: THREE.Group | null = null;
    const loader = new GLTFLoader();

    loader.load(
      "/Luuk-st-LOGO.glb",
      // eslint-disable-next-line
      (gltf: any) => {
        const object = gltf.scene;
        model = object;

        object.scale.set(2, 2, 2);

        // Center the model
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center); // Center the model at (0,0,0)

        const color2 = new THREE.Color("#0039cf");

        // Apply material to all meshes in the model
        // eslint-disable-next-line
        object.traverse((child: any) => {
          if (child.isMesh) {
            const geometry = child.geometry;
            geometry.computeBoundingBox();
            const boundingBox = geometry.boundingBox;

            if (boundingBox) {
              const positions = geometry.attributes.position;
              const colors = new Float32Array(positions.count * 3);
              const tempColor = new THREE.Color();

              for (let i = 0; i < positions.count; i++) {
                const y = positions.getY(i);
                const mixFactor =
                  (y - boundingBox.min.y) /
                  (boundingBox.max.y - boundingBox.min.y);

                tempColor.copy(color2).lerp(color2, mixFactor);

                colors[i * 3] = tempColor.r;
                colors[i * 3 + 1] = tempColor.g;
                colors[i * 3 + 2] = tempColor.b;
              }
              geometry.setAttribute(
                "color",
                new THREE.BufferAttribute(colors, 3)
              );
            }

            child.material = new THREE.MeshStandardMaterial({
              vertexColors: true,
              metalness: 0.9,
              roughness: 0.2,
            });
          }
        });

        scene.add(object);
      },
      // eslint-disable-next-line
      (xhr: any) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // eslint-disable-next-line
      (error: any) => {
        console.error("An error happened loading the GLB:", error);
      }
    );

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 3);
    frontLight.position.set(0, 0, 10);
    scene.add(frontLight);

    const pointLight1 = new THREE.PointLight(0x00bfff, 50, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 50, 100);
    pointLight2.position.set(-10, -10, 5);
    scene.add(pointLight2);

    const handleResize = () => {
      if (mountRef.current) {
        const container = mountRef.current;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (model) {
        model.rotation.y += 0.005; // Rotate the model
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (model) {
        scene.remove(model);
        // Traverse and dispose geometries/materials to avoid leaks
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        });
      }

      if (container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default ThreeScene;
