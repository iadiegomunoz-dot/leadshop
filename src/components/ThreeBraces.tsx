import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function createLeftBraceShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0.82, 2.32);
  s.bezierCurveTo(0.08, 2.32, -0.22, 1.98, -0.22, 1.32);
  s.lineTo(-0.22, 0.44);
  s.bezierCurveTo(-0.22, 0.14, -0.44, 0.04, -0.78, 0.0);
  s.bezierCurveTo(-0.44, -0.04, -0.22, -0.14, -0.22, -0.44);
  s.lineTo(-0.22, -1.32);
  s.bezierCurveTo(-0.22, -1.98, 0.08, -2.32, 0.82, -2.32);
  s.lineTo(0.82, -1.78);
  s.bezierCurveTo(0.42, -1.78, 0.28, -1.58, 0.28, -1.16);
  s.lineTo(0.28, -0.34);
  s.bezierCurveTo(0.28, -0.06, 0.12, 0.0, -0.1, 0.0);
  s.bezierCurveTo(0.12, 0.0, 0.28, 0.06, 0.28, 0.34);
  s.lineTo(0.28, 1.16);
  s.bezierCurveTo(0.28, 1.58, 0.42, 1.78, 0.82, 1.78);
  s.closePath();
  return s;
}

function createRightBraceShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-0.82, 2.32);
  s.bezierCurveTo(-0.08, 2.32, 0.22, 1.98, 0.22, 1.32);
  s.lineTo(0.22, 0.44);
  s.bezierCurveTo(0.22, 0.14, 0.44, 0.04, 0.78, 0.0);
  s.bezierCurveTo(0.44, -0.04, 0.22, -0.14, 0.22, -0.44);
  s.lineTo(0.22, -1.32);
  s.bezierCurveTo(0.22, -1.98, -0.08, -2.32, -0.82, -2.32);
  s.lineTo(-0.82, -1.78);
  s.bezierCurveTo(-0.42, -1.78, -0.28, -1.58, -0.28, -1.16);
  s.lineTo(-0.28, -0.34);
  s.bezierCurveTo(-0.28, -0.06, -0.12, 0.0, 0.1, 0.0);
  s.bezierCurveTo(-0.12, 0.0, -0.28, 0.06, -0.28, 0.34);
  s.lineTo(-0.28, 1.16);
  s.bezierCurveTo(-0.28, 1.58, -0.42, 1.78, -0.82, 1.78);
  s.closePath();
  return s;
}

export function ThreeBraces() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

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

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;
    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileViewport ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0.2, 0.1, 8.6);

    const hemiLight = new THREE.HemisphereLight(0xf6ffba, 0x3b6bf2, 1.55);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffde6, 1.85);
    keyLight.position.set(4.5, 5.5, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x88aeff, 1.1);
    fillLight.position.set(-5, -3.5, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xeafc66, 0.85);
    rimLight.position.set(2, -5, -3);
    scene.add(rimLight);

    const clayMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D5E764'),
      roughness: 0.62,
      metalness: 0.04,
    });

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.54,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.09,
      bevelThickness: 0.11,
      curveSegments: 40,
    };

    const group = new THREE.Group();

    const leftGeo = new THREE.ExtrudeGeometry(createLeftBraceShape(), extrudeSettings);
    leftGeo.center();
    const leftMesh = new THREE.Mesh(leftGeo, clayMaterial);
    leftMesh.position.set(-1.12, -0.04, 0.1);
    group.add(leftMesh);

    const rightGeo = new THREE.ExtrudeGeometry(createRightBraceShape(), extrudeSettings);
    rightGeo.center();
    const rightMesh = new THREE.Mesh(rightGeo, clayMaterial);
    rightMesh.position.set(1.08, 0.06, -0.12);
    group.add(rightMesh);

    // Match the signature perspective tilt from the reference hero
    const baseRotX = 0.08;
    const baseRotY = -0.52;
    const baseRotZ = -0.06;
    group.rotation.set(baseRotX, baseRotY, baseRotZ);
    scene.add(group);

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
      pointer.targetX = Math.max(-1, Math.min(1, nx));
      pointer.targetY = Math.max(-1, Math.min(1, ny));
    };

    const handlePointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);

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

    let inView = true;
    const viewObserver = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    viewObserver.observe(container);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!inView) return;
      const t = clock.getElapsedTime();

      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      if (!prefersReducedMotion) {
        group.position.y = Math.sin(t * 1.45) * 0.14;
        group.rotation.x = baseRotX + pointer.y * 0.18 + Math.cos(t * 0.9) * 0.03;
        group.rotation.y = baseRotY + pointer.x * 0.25 + Math.sin(t * 0.7) * 0.04;
        group.rotation.z = baseRotZ - pointer.x * 0.05;
      }

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
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      leftGeo.dispose();
      rightGeo.dispose();
      clayMaterial.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="w-full h-full flex items-center justify-center select-none" aria-hidden="true">
        <svg viewBox="0 0 320 320" className="w-72 h-72 drop-shadow-xl">
          <defs>
            <linearGradient id="limeBraceFallback" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EAFC75" />
              <stop offset="100%" stopColor="#BFD443" />
            </linearGradient>
          </defs>
          <text
            x="44"
            y="225"
            fill="url(#limeBraceFallback)"
            fontSize="220"
            fontWeight="700"
            fontFamily="Onest, sans-serif"
          >
            {'{ }'}
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  );
}
