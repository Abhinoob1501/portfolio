"use client";

import React, { useEffect, useRef, useState } from "react";

type Cell = string | null;
type Board = Cell[][];
type Tetromino = { shape: number[][]; color: string };

const ROWS = 20;
const COLS = 10;

const TETROMINOS: Tetromino[] = [
  { shape: [[1, 1, 1, 1]], color: "#00e5ff" }, // I
  { shape: [[1, 1], [1, 1]], color: "#ffd400" }, // O
  { shape: [[0, 1, 0], [1, 1, 1]], color: "#ff2079" }, // T
  { shape: [[1, 0, 0], [1, 1, 1]], color: "#8a2be2" }, // J
  { shape: [[0, 0, 1], [1, 1, 1]], color: "#ff00a0" }, // L
  { shape: [[1, 1, 0], [0, 1, 1]], color: "#ff4d00" }, // Z
  { shape: [[0, 1, 1], [1, 1, 0]], color: "#39ff14" }, // S
];

function cloneShape(shape: number[][]) {
  return shape.map((r) => r.slice());
}
function freshTetromino(): Tetromino {
  const t = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
  return { shape: cloneShape(t.shape), color: t.color };
}
function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}
function rotateMatrix(shape: number[][]) {
  const rows = shape.length;
  const cols = shape[0].length;
  const out: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      out[x][rows - 1 - y] = shape[y][x];
    }
  }
  return out;
}

export default function NeonTetris(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [board, setBoard] = useState<Board>(() => emptyBoard());
  const [piece, setPiece] = useState<Tetromino | null>(null);
  const [pos, setPos] = useState({ x: 3, y: -1 }); // spawn slightly above
  const [nextPiece, setNextPiece] = useState<Tetromino | null>(null);
  const [paused, setPaused] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);

  // border/glow matching Card
  const borderColor = "border-cyan-500";
  const glowColor = "#06b6d4";
  const glowStyle: React.CSSProperties = {
    boxShadow: `0 0 4px ${glowColor}, 0 0 8px ${glowColor}, inset 0 0 3px ${glowColor}`,
  };

  // className={`border-4 ${borderColor} ${sizeClasses[size]} rounded bg-gray-900/50 pixelify-font ${className}`
  // collision: checks bounds and board occupancy (only uses board when ny >= 0)
  const collides = (shape: number[][], atX: number, atY: number) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (!shape[y][x]) continue;
        const nx = atX + x;
        const ny = atY + y;
        if (nx < 0 || nx >= COLS) return true; // left/right out-of-bounds
        if (ny >= ROWS) return true; // below bottom
        if (ny >= 0 && board[ny][nx] !== null) return true; // occupied
      }
    }
    return false;
  };

  // lock piece safely and spawn next
  const lockPieceAndSpawn = (p: Tetromino, atPos: { x: number; y: number }) => {
    const newBoard = board.map((r) => r.slice());
    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape[y].length; x++) {
        if (!p.shape[y][x]) continue;
        const nx = atPos.x + x;
        const ny = atPos.y + y;
        // if part of piece is above top, game over
        if (ny < 0) {
          setGameOver(true);
          setPaused(true);
          return;
        }
        // safe write (nx,ny should be in bounds because collides prevented out-of-bounds)
        newBoard[ny][nx] = p.color;
      }
    }
    // clear lines + score
    const clearedBoard = clearLines(newBoard);
    setBoard(clearedBoard);
    spawnPiece();
  };

  // clear full rows
  const clearLines = (b: Board) => {
    let cleared = 0;
    const filtered = b.filter((row) => {
      const full = row.every((cell) => cell !== null);
      if (full) {
        cleared++;
        return false;
      }
      return true;
    });
    while (filtered.length < ROWS) filtered.unshift(Array(COLS).fill(null));
    if (cleared > 0) {
      setScore((s) => s + cleared * 100);
      setLines((l) => {
        const total = l + cleared;
        setLevel(1 + Math.floor(total / 10));
        return total;
      });
    }
    return filtered;
  };

  const spawnPiece = () => {
    const nxt = nextPiece ?? freshTetromino();
    const after = freshTetromino();
    setPiece({ shape: cloneShape(nxt.shape), color: nxt.color });
    setNextPiece(after);
    const spawnX = Math.floor((COLS - nxt.shape[0].length) / 2);
    const spawnY = -1;
    setPos({ x: spawnX, y: spawnY });

    // immediate collision -> game over
    if (collides(nxt.shape, spawnX, spawnY)) {
      setGameOver(true);
      setPaused(true);
    }
  };

  const reset = () => {
    setBoard(emptyBoard());
    setPiece(null);
    setNextPiece(null);
    setPos({ x: 3, y: -1 });
    setPaused(true);
    setGameOver(false);
    setScore(0);
    setLines(0);
    setLevel(1);
    // lazy spawn so state settles
    setTimeout(() => {
      setNextPiece(freshTetromino());
      spawnPiece();
    }, 0);
  };

  // rotation with small kicks
  const tryRotate = () => {
    if (!piece) return;
    const rotated = rotateMatrix(piece.shape);
    const kicks = [0, -1, 1, -2, 2];
    for (const k of kicks) {
      const nx = pos.x + k;
      const ny = pos.y;
      if (!collides(rotated, nx, ny)) {
        setPiece({ shape: rotated, color: piece.color });
        setPos({ x: nx, y: ny });
        return;
      }
    }
  };

  // hard drop
  const hardDrop = () => {
    if (!piece) return;
    let y = pos.y;
    while (!collides(piece.shape, pos.x, y + 1)) y++;
    setPos({ x: pos.x, y });
    lockPieceAndSpawn(piece, { x: pos.x, y });
  };

  // gravity tick
  useEffect(() => {
    if (paused || gameOver) return;
    if (!piece) return;
    const tickMs = Math.max(80, 500 - (level - 1) * 30);
    const id = setInterval(() => {
      if (!piece) return;
      const newY = pos.y + 1;
      if (!collides(piece.shape, pos.x, newY)) {
        setPos((p) => ({ ...p, y: p.y + 1 }));
      } else {
        lockPieceAndSpawn(piece, pos);
      }
    }, tickMs);
    return () => clearInterval(id);
  }, [paused, piece, pos, board, level, gameOver]);

  // keyboard controls
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (gameOver && e.key.toLowerCase() === "r") {
        reset();
        return;
      }
      if (paused || gameOver) return;
      if (!piece) return;
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        const nx = pos.x - 1;
        if (!collides(piece.shape, nx, pos.y)) setPos({ x: nx, y: pos.y });
      } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        const nx = pos.x + 1;
        if (!collides(piece.shape, nx, pos.y)) setPos({ x: nx, y: pos.y });
      } else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        const ny = pos.y + 1;
        if (!collides(piece.shape, pos.x, ny)) setPos({ x: pos.x, y: ny });
        else lockPieceAndSpawn(piece, pos);
      } else if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        tryRotate();
      } else if (e.code === "Space") {
        e.preventDefault();
        hardDrop();
      } else if (e.key.toLowerCase() === "r") {
        reset();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [piece, pos, paused, board, gameOver]);

  // initial spawn
  useEffect(() => {
    setBoard(emptyBoard());
    setNextPiece(freshTetromino());
    setTimeout(spawnPiece, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // drawing: fill container, keep square cells, center grid
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssW = container.clientWidth;
      const cssH = container.clientHeight;
      // set canvas buffer to CSS dims * dpr
      canvas.width = Math.max(1, Math.floor(cssW * dpr));
      canvas.height = Math.max(1, Math.floor(cssH * dpr));
      // set CSS size to fill container
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      // use transform so drawing can use CSS pixel coordinates
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Make grid always use full width, and align to bottom
      const cellSize = cssW / COLS;
      const gridW = cssW;
      const gridH = cellSize * ROWS;
      const offsetX = 0; // flush left
      // Align grid to bottom, but ensure it fits within canvas
      const offsetY = Math.max(0, cssH - gridH);

      // background + subtle scanlines
      ctx.fillStyle = "#04020a";
      ctx.fillRect(0, 0, cssW, cssH);
      ctx.globalAlpha = 0.05;
      for (let y = 0; y < cssH; y += 2) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, y, cssW, 1);
      }
      ctx.globalAlpha = 1;

      // draw grid background (optional subtle border)
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;

      // draw settled cells
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const col = board[y][x];
          if (col) {
            const px = offsetX + x * cellSize;
            const py = offsetY + y * cellSize;
            ctx.fillStyle = col;
            ctx.shadowBlur = 2;
            ctx.shadowColor = col;
            ctx.fillRect(px, py, cellSize, cellSize);
            ctx.shadowBlur = 0;
            ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);
          } else {
            // optional faint grid square background for style (comment if unwanted)
            // ctx.fillStyle = 'rgba(255,255,255,0.01)';
            // ctx.fillRect(offsetX + x*cellSize, offsetY + y*cellSize, cellSize, cellSize);
          }
        }
      }

      // draw ghost and active piece
      if (piece) {
        // ghost drop
        let gy = pos.y;
        while (!collides(piece.shape, pos.x, gy + 1)) gy++;
        ctx.globalAlpha = 0.18;
        for (let py = 0; py < piece.shape.length; py++) {
          for (let px = 0; px < piece.shape[py].length; px++) {
            if (!piece.shape[py][px]) continue;
            const gx = pos.x + px;
            const gyAbs = gy + py;
            if (gyAbs >= 0 && gyAbs < ROWS && gx >= 0 && gx < COLS) {
              ctx.fillStyle = piece.color;
              ctx.fillRect(offsetX + gx * cellSize, offsetY + gyAbs * cellSize, cellSize, cellSize);
            }
          }
        }
        ctx.globalAlpha = 1;

        // active
        for (let py = 0; py < piece.shape.length; py++) {
          for (let px = 0; px < piece.shape[py].length; px++) {
            if (!piece.shape[py][px]) continue;
            const ax = pos.x + px;
            const ay = pos.y + py;
            if (ay >= 0 && ay < ROWS && ax >= 0 && ax < COLS) {
              const pxPos = offsetX + ax * cellSize;
              const pyPos = offsetY + ay * cellSize;
              ctx.fillStyle = piece.color;
              ctx.shadowBlur = 2;
              ctx.shadowColor = piece.color;
              ctx.fillRect(pxPos, pyPos, cellSize, cellSize);
              ctx.shadowBlur = 0;
              ctx.strokeRect(pxPos + 0.5, pyPos + 0.5, cellSize - 1, cellSize - 1);
            }
          }
        }
      }

      // small border around the play area
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      ctx.strokeRect(offsetX - 0.5, offsetY - 0.5, gridW + 1, gridH + 1);

      raf = requestAnimationFrame(() => {}); // keep rAF handle (no continuous animation necessary)
    };

    draw();
    const obs = new ResizeObserver(draw);
    obs.observe(container);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [board, piece, pos]);

  // redraw on state changes (trigger effect above via dependencies)
  useEffect(() => {
    // no-op: the drawing effect depends on board/piece/pos and container size
  }, [board, piece, pos]);

  return (
    <div
      ref={containerRef}
      className={`relative border-4 ${borderColor} rounded bg-gray-900/70 pixelify-font flex items-center justify-center aspect-[1/2] w-full`}
      style={{ ...glowStyle, minHeight: 320 }}
      onMouseEnter={() => { if (!gameOver) setPaused(false); }}
      onMouseLeave={() => { if (!gameOver) setPaused(true); }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />

      {/* Overlay: PLAY TETRIS (flashing) / GAME OVER */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        {!gameOver && paused && (
          <div className="text-center">
            <div className="text-[#00e5ff] text-3xl md:text-4xl font-extrabold animate-pulse pixelify-font">
              PLAY TETRIS
            </div>
            <div className="mt-2 ml-1 mr-1 text-xs text-[#bfefff] font-mono">
              Hover to play · ← → move · ↑ rotate · ↓ soft · Space hard drop · R reset
            </div>
          </div>
        )}

        {gameOver && (
          <div className="text-center pointer-events-auto">
            <div className="text-[#ff4d4d] text-3xl md:text-4xl font-extrabold pixelify-font animate-pulse">
              GAME OVER
            </div>
            <button
              onClick={reset}
              className="mt-3 px-4 py-2 rounded bg-[#ff4d4d]/20 border border-[#ff4d4d] text-[#ffdddd] font-mono"
            >
              Restart (R)
            </button>
          </div>
        )}
      </div>

      {/* HUD top-left */}
      <div className="absolute top-2 left-2 text-xs pixelify-font text-[#bfefff]">
        <div>Score: {score}</div>
        <div>Lines: {lines}</div>
        <div>Level: {level}</div>
      </div>
    </div>
  );
}
