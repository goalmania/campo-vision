import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Animated 3D football pitch background.
 * Wireframe pitch lines on a dark plane with slow Y-rotation + breathing scale.
 */
export default function PitchCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 18, 26);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Pitch group
    const pitch = new THREE.Group();
    scene.add(pitch);

    const GREEN = 0xc8f000;
    const lineMat = new THREE.LineBasicMaterial({
      color: GREEN,
      transparent: true,
      opacity: 0.55,
    });
    const dimMat = new THREE.LineBasicMaterial({
      color: GREEN,
      transparent: true,
      opacity: 0.22,
    });

    // Pitch dimensions (proportions ~ 105x68)
    const W = 32;
    const H = 20;

    const addLine = (pts: [number, number, number][], mat = lineMat) => {
      const g = new THREE.BufferGeometry().setFromPoints(
        pts.map((p) => new THREE.Vector3(...p))
      );
      pitch.add(new THREE.Line(g, mat));
    };

    // Outer rectangle
    addLine([
      [-W / 2, 0, -H / 2], [ W / 2, 0, -H / 2],
      [ W / 2, 0,  H / 2], [-W / 2, 0,  H / 2],
      [-W / 2, 0, -H / 2],
    ]);

    // Halfway line
    addLine([[0, 0, -H / 2], [0, 0, H / 2]]);

    // Center circle
    const circlePts: [number, number, number][] = [];
    const R = 3.2;
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      circlePts.push([Math.cos(a) * R, 0, Math.sin(a) * R]);
    }
    addLine(circlePts);

    // Center spot
    const spotGeo = new THREE.CircleGeometry(0.18, 24);
    const spotMat = new THREE.MeshBasicMaterial({ color: GREEN, transparent: true, opacity: 0.9 });
    const spot = new THREE.Mesh(spotGeo, spotMat);
    spot.rotation.x = -Math.PI / 2;
    pitch.add(spot);

    // Penalty boxes
    const pbW = 10, pbH = 12;
    const gbW = 4, gbH = 6;
    [-1, 1].forEach((side) => {
      const x0 = side * (W / 2);
      const x1 = side * (W / 2 - pbW);
      addLine([
        [x0, 0, -pbH / 2], [x1, 0, -pbH / 2],
        [x1, 0,  pbH / 2], [x0, 0,  pbH / 2],
      ]);
      const gx1 = side * (W / 2 - gbW);
      addLine([
        [x0, 0, -gbH / 2], [gx1, 0, -gbH / 2],
        [gx1, 0,  gbH / 2], [x0, 0,  gbH / 2],
      ], dimMat);

      // penalty arc
      const arcPts: [number, number, number][] = [];
      const ax = side * (W / 2 - 7.5);
      for (let i = 0; i <= 32; i++) {
        const a = -Math.PI / 2 + (i / 32) * Math.PI;
        const px = ax + Math.cos(a) * 1.6 * -side;
        const pz = Math.sin(a) * 1.6;
        arcPts.push([px, 0, pz]);
      }
      addLine(arcPts, dimMat);
    });

    // Subtle ground glow plane
    const glowGeo = new THREE.PlaneGeometry(W * 1.8, H * 1.8);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xc8f000,
      transparent: true,
      opacity: 0.04,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -0.02;
    scene.add(glow);

    // Tilt the pitch
    pitch.rotation.x = -0.15;

    let raf = 0;
    let t = 0;
    const baseTiltX = -0.15;
    const animate = () => {
      t += 0.005;
      // wider Y sweep + subtle X tilt oscillation for a more evident motion
      pitch.rotation.y = Math.sin(t * 0.55) * 0.75;
      pitch.rotation.x = baseTiltX + Math.sin(t * 0.35) * 0.06;
      pitch.rotation.z = Math.sin(t * 0.25) * 0.04;
      // pronounced breathing scale
      const s = 1 + Math.sin(t * 1.1) * 0.06;
      pitch.scale.set(s, s, s);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.85 }}
      aria-hidden
    />
  );
}
