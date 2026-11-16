import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function createRoundedArrowShape(): THREE.Shape {
  const s = new THREE.Shape();
  // Chunky isometric cursor arrow silhouette pointing up-left
  s.moveTo(-0.92, 0.96);
  s.lineTo(1.05, 0.34);
  s.quadraticCurveTo(1.18, 0.29, 1.07, 0.16);
  s.lineTo(0.42, -0.24);
  s.lineTo(0.96, -0.78);
  s.quadraticCurveTo(1.06, -0.88, 0.94, -1.0);
  s.lineTo(0.62, -1.26);
  s.quadraticCurveTo(0.5, -1.36, 0.38, -1.24);
  s.lineTo(-0.14, -0.68);
  s.lineTo(-0.48, -1.22);
  s.quadraticCurveTo(-0.57, -1.34, -0.68, -1.16);
  s.lineTo(-1.02, 0.84);
  s.quadraticCurveTo(-1.04, 0.98, -0.92, 0.96);
  return s;
}

export function ThreeCursorArrow() {
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

    const width = container.clientWidth || 200;
    const height = container.clientHeight || 200;
    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileViewport ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const hemiLight = new THREE.HemisphereLight(0xf6ffbf, 0x3b6ef8, 1.6);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.75);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x88b0ff, 1.0);
    rimLight.position.set(-4, -3, 3);
    scene.add(rimLight);

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#DCF06A'),
      roughness: 0.65,
      metalness: 0.03,
    });

    const geometry = new THREE.ExtrudeGeometry(createRoundedArrowShape(), {
      depth: 0.48,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.12,
      curveSegments: 24,
    });
    geometry.center();

    const mesh = new THREE.Mesh(geometry, material);
    const baseRotX = 0.24;
    const baseRotY = -0.36;
    const baseRotZ = 0.15;
    mesh.rotation.set(baseRotX, baseRotY, baseRotZ);
    scene.add(mesh);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
      pointer.tx = Math.max(-1, Math.min(1, nx));
      pointer.ty = Math.max(-1, Math.min(1, ny));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

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
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      if (!prefersReducedMotion) {
        mesh.position.y = Math.sin(t * 1.8) * 0.1;
        mesh.rotation.x = baseRotX + pointer.y * 0.22 + Math.cos(t * 1.1) * 0.04;
        mesh.rotation.y = baseRotY + pointer.x * 0.28 + Math.sin(t * 0.9) * 0.05;
        mesh.rotation.z = baseRotZ - pointer.x * 0.08;
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
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
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
      <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 140 140" className="w-36 h-36 drop-shadow-lg">
          <path
            d="M28 24 L118 58 L78 76 L108 106 L90 124 L60 94 L42 132 Z"
            fill="#DCF06A"
            stroke="#C7DD50"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
}
