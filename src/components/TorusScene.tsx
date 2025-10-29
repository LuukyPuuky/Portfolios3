"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
    camera.position.z = 15;

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
    controls.enablePan = true;
    const initialDistance = camera.position.length();
    controls.minDistance = initialDistance;
    controls.maxDistance = initialDistance;

    // Geometry
    const geometry = new THREE.TorusKnotGeometry(4, 1.2, 150, 20, 2, 3);

    // Apply vertex colors for gradient effect
    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox;
    if (boundingBox) {
      const positions = geometry.attributes.position;
      const colors = new Float32Array(positions.count * 3);
      const color1 = new THREE.Color("#000000");
      const color2 = new THREE.Color("#0039cf");

      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        const mixFactor =
          (y - boundingBox.min.y) / (boundingBox.max.y - boundingBox.min.y);

        const mixedColor = color1.clone().lerp(color2, mixFactor);

        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
      }
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    }

    // Material
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      metalness: 0.9,
      roughness: 0.2,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00bfff, 30, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 30, 100);
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

      torusKnot.rotation.x += 0.001;
      torusKnot.rotation.y += 0.005;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      scene.remove(torusKnot);
      geometry.dispose();
      material.dispose();

      if (container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default ThreeScene;
