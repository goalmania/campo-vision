import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PitchCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 8, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const mat = new THREE.LineBasicMaterial({ color: 0xc8f000, transparent: true, opacity: 0.15 });
    const group = new THREE.Group();

    const w = 10, h = 6;
    const rect = (x: number, y: number, w2: number, h2: number) => {
      const pts = [
        new THREE.Vector3(x, 0, y),
        new THREE.Vector3(x + w2, 0, y),
        new THREE.Vector3(x + w2, 0, y + h2),
        new THREE.Vector3(x, 0, y + h2),
        new THREE.Vector3(x, 0, y),
      ];
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
    };
    group.add(rect(-w/2, -h/2, w, h));

    // halfway line
    const half = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -h/2), new THREE.Vector3(0, 0, h/2),
    ]);
    group.add(new THREE.Line(half, mat));

    // center circle
    const segs = 64;
    const cc: THREE.Vector3[] = [];
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      cc.push(new THREE.Vector3(Math.cos(a) * 1, 0, Math.sin(a) * 1));
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(cc), mat));

    // penalty areas
    group.add(rect(-w/2, -2, 1.6, 4));
    group.add(rect(w/2 - 1.6, -2, 1.6, 4));
    // 6-yard
    group.add(rect(-w/2, -1, 0.6, 2));
    group.add(rect(w/2 - 0.6, -1, 0.6, 2));

    scene.add(group);

    let raf = 0;
    const start = performance.now();
    const animate = () => {
      const t = (performance.now() - start) / 1000;
      group.rotation.y = t * 0.1;
      const s = 1 + Math.sin(t * 0.6) * 0.02;
      group.scale.set(s, s, s);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="absolute inset-0 pointer-events-none" />;
}
