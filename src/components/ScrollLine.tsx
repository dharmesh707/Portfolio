import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";

type Size = { w: number; h: number };
type Curve = {
  d: string;
  xs: number[];
  ys: number[];
  cum: number[];
  total: number;
};

const STEP = 8;
const CHECKPOINTS = ["about", "projects", "achievements", "skills", "contact"];

const at = (list: number[], i: number): number => list[i] ?? 0;

// x position of the trace at page height y: a wide wave, plus raw-signal
// noise that dies out as you go down the page
function xAt(y: number, w: number, h: number): number {
  const period = Math.max(1500, Math.min(2400, h / 3.2));
  const t = (y / period) * Math.PI * 2;
  const base = 0.5 - 0.42 * Math.cos(t) + 0.05 * Math.sin(t * 2.3 + 1);
  const settle = Math.exp(-y / Math.max(1, h * 0.3));
  const noise =
    Math.sin(y * 0.045) * 7 +
    Math.sin(y * 0.11 + 1.3) * 4 +
    Math.sin(y * 0.27 + 2.1) * 2;
  const x = w * base + noise * settle * 2.2;
  return Math.min(w * 0.96, Math.max(w * 0.04, x));
}

function buildCurve({ w, h }: Size): Curve {
  const count = Math.max(2, Math.ceil(h / STEP));
  const xs: number[] = [];
  const ys: number[] = [];
  const cum: number[] = [];
  let d = "";
  for (let i = 0; i <= count; i += 1) {
    const y = Math.min(i * STEP, h);
    const x = xAt(y, w, h);
    xs.push(x);
    ys.push(y);
    if (i === 0) {
      cum.push(0);
      d += `M ${x.toFixed(1)} ${y}`;
    } else {
      cum.push(
        at(cum, i - 1) + Math.hypot(x - at(xs, i - 1), y - at(ys, i - 1)),
      );
      d += ` L ${x.toFixed(1)} ${y}`;
    }
  }
  return { d, xs, ys, cum, total: Math.max(1, at(cum, cum.length - 1)) };
}

// distance along the trace at page height y
function arcAtY(curve: Curve, y: number): number {
  const last = curve.ys.length - 2;
  const i = Math.max(0, Math.min(last, Math.floor(y / STEP)));
  const y0 = at(curve.ys, i);
  const span = at(curve.ys, i + 1) - y0;
  const t = span > 0 ? Math.min(1, Math.max(0, (y - y0) / span)) : 0;
  const c0 = at(curve.cum, i);
  return c0 + (at(curve.cum, i + 1) - c0) * t;
}

// point on the trace at a given distance along it
function pointAtArc(curve: Curve, s: number): { x: number; y: number } {
  let lo = 0;
  let hi = curve.cum.length - 1;
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    if (at(curve.cum, mid) < s) lo = mid;
    else hi = mid;
  }
  const c0 = at(curve.cum, lo);
  const span = at(curve.cum, hi) - c0;
  const t = span > 0 ? Math.min(1, Math.max(0, (s - c0) / span)) : 0;
  return {
    x: at(curve.xs, lo) + (at(curve.xs, hi) - at(curve.xs, lo)) * t,
    y: at(curve.ys, lo) + (at(curve.ys, hi) - at(curve.ys, lo)) * t,
  };
}

type CheckpointProps = {
  x: number;
  y: number;
  reachedAt: number;
  drawn: MotionValue<number>;
};

function Checkpoint({ x, y, reachedAt, drawn }: CheckpointProps) {
  const fill = useTransform(drawn, (f) =>
    f >= reachedAt ? "var(--brown)" : "var(--bg)",
  );
  return (
    <motion.circle className="node" cx={x} cy={y} r={6} style={{ fill }} />
  );
}

export default function ScrollLine() {
  const [size, setSize] = useState<Size>({ w: 0, h: 0 });
  const [marks, setMarks] = useState<number[]>([]);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const tick = useMotionValue(0);

  const curve = useMemo(() => buildCurve(size), [size]);
  const live = useRef({ curve, h: size.h });
  live.current = { curve, h: size.h };

  // how far down the page the trace is drawn: just below the middle of the
  // screen while scrolling, reaching the very bottom at the end
  const revealY = useTransform([scrollY, tick], (latest: number[]) => {
    const sy = latest[0] ?? 0;
    const { h } = live.current;
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, sy / Math.max(1, h - vh)));
    return Math.min(h, sy + vh * (0.55 + 0.45 * p));
  });
  const fraction = useTransform(revealY, (y) => {
    const c = live.current.curve;
    return arcAtY(c, y) / c.total;
  });
  const drawn = useSpring(fraction, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0005,
  });
  const tipX = useTransform(drawn, (f) => {
    const c = live.current.curve;
    return pointAtArc(c, f * c.total).x;
  });
  const tipY = useTransform(drawn, (f) => {
    const c = live.current.curve;
    return pointAtArc(c, f * c.total).y;
  });

  useEffect(() => {
    const update = () => {
      setSize({
        w: document.documentElement.clientWidth,
        h: document.body.offsetHeight,
      });
      setMarks(
        CHECKPOINTS.map((id) => document.getElementById(id)?.offsetTop ?? -1),
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    tick.set(tick.get() + 1);
  }, [curve, tick]);

  if (size.w === 0 || size.h === 0) return null;

  return (
    <svg
      className="scroll-line"
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      aria-hidden="true"
    >
      <path className="track" d={curve.d} />
      {reduceMotion ? null : (
        <>
          <motion.path
            className="trail"
            d={curve.d}
            style={{ pathLength: drawn }}
          />
          {marks.map((y, i) =>
            y >= 0 ? (
              <Checkpoint
                key={CHECKPOINTS[i] ?? i}
                x={xAt(y, size.w, size.h)}
                y={y}
                reachedAt={arcAtY(curve, y) / curve.total}
                drawn={drawn}
              />
            ) : null,
          )}
          <motion.circle
            className="tip"
            cx={0}
            cy={0}
            r={4.5}
            style={{ x: tipX, y: tipY }}
          />
        </>
      )}
    </svg>
  );
}
