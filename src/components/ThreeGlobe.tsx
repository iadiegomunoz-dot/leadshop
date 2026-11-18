import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { COVERAGE_CITIES, type CityTarget } from '../data/siteData';

interface ThreeGlobeProps {
  selectedCity: CityTarget;
  onSelectCity: (city: CityTarget) => void;
}

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export function ThreeGlobe({ selectedCity, onSelectCity }: ThreeGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const targetRotRef = useRef({ x: 0.35, y: 0.8 });

  // Rotate globe toward selected city when user clicks a city chip
  useEffect(() => {
    const phi = (selectedCity.lat * Math.PI) / 180;
    const theta = ((selectedCity.lon + 90) * Math.PI) / 180;
    targetRotRef.current = {
      x: Math.max(-0.85, Math.min(0.85, phi * 0.7)),
      y: -theta,
    };
  }, [selectedCity]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;
    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileViewport ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    // Lighting matching matte clay + electric cobalt aesthetic
    const hemiLight = new THREE.HemisphereLight(0xf6ffbe, 0x2456ea, 1.5);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xeafc66, 1.1);
    rimLight.position.set(-4, -3, 3);
    scene.add(rimLight);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const RADIUS = 1.38;

    // Core matte cobalt sphere
    const sphereGeo = new THREE.SphereGeometry(RADIUS, isMobileViewport ? 28 : 48, isMobileViewport ? 28 : 48);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2E64F6'),
      roughness: 0.55,
      metalness: 0.06,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // Subtle latitude & longitude wireframe ring shell
    const wireGeo = new THREE.SphereGeometry(RADIUS * 1.008, 22, 14);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#8FB0FF'),
      wireframe: true,
      transparent: true,
      opacity: 0.24,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // Outer orbital acid-lime ring
    const ringGeo = new THREE.TorusGeometry(RADIUS * 1.24, 0.022, 16, 96);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EAFC66'),
      roughness: 0.45,
      metalness: 0.05,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.35;
    ringMesh.rotation.y = 0.28;
    globeGroup.add(ringMesh);

    // City beacon pins in matte acid lime
    const pinGeo = new THREE.SphereGeometry(0.055, 16, 16);
    const pinMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EAFC66'),
      emissive: new THREE.Color('#C5DB32'),
      emissiveIntensity: 0.35,
      roughness: 0.35,
    });

    const haloGeo = new THREE.RingGeometry(0.075, 0.115, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#EAFC66'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });

    COVERAGE_CITIES.forEach((city) => {
      const pos = latLonToVector3(city.lat, city.lon, RADIUS * 1.02);
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(pos);
      globeGroup.add(pin);

      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(pos.clone().multiplyScalar(1.01));
      halo.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(halo);
    });

    // Pointer drag controls
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let currentRotX = targetRotRef.current.x;
    let currentRotY = targetRotRef.current.y;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      container.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      targetRotRef.current.y += dx * 0.0085;
      targetRotRef.current.x = Math.max(
        -1.0,
        Math.min(1.0, targetRotRef.current.x + dy * 0.0065)
      );
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      container.releasePointerCapture?.(e.pointerId);
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let inView = true;
    const viewObserver = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    viewObserver.observe(container);

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!inView) return;
      if (!isDragging && !prefersReducedMotion) {
        targetRotRef.current.y += 0.0022;
      }
      currentRotX += (targetRotRef.current.x - currentRotX) * 0.08;
      currentRotY += (targetRotRef.current.y - currentRotY) * 0.08;

      globeGroup.rotation.x = currentRotX;
      globeGroup.rotation.y = currentRotY;
      renderer?.render(scene, camera);
    };
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(rafId);
      viewObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      sphereGeo.dispose();
      sphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [onSelectCity]);

  if (webglFailed) {
    return (
      <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
        <div className="relative h-56 w-56 rounded-full blue-card-gradient shadow-xl flex items-center justify-center border-2 border-[#EAFC66]/70">
          <div className="h-40 w-40 rounded-full border border-white/25" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      role="img"
      className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      aria-label="Globo 3D interactivo de cobertura global"
    />
  );
}
