"use client";
import React, { useEffect, useRef, useCallback } from "react";

// Types
interface Point {
  x: number;
  y: number;
}

interface Snake {
  points: Point[];
  direction: Point;
  quadrant: number;
}

// Constants
const GRID_SIZE = 5;
const MAX_LENGTH = 120;
const DIRECTION_CHANGE_PROBABILITY = 0.97;
const VIEWPORT_MARGIN = 50;
const LINE_STYLE = {
  color: "rgba(0, 140, 255, 0.6)",
  width: 1.5,
  glow: {
    color: "blue-primary",
    blur: 20,
  },
} as const;

// Utility function
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | undefined;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
};

const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const snakesRef = useRef<Snake[]>([]);

  const createSnake = (
    canvas: HTMLCanvasElement,
    preferredQuadrant?: number
  ): Snake => {
    const width = canvas.width;
    const height = canvas.height;
    const quadrant = preferredQuadrant ?? Math.floor(Math.random() * 4);

    // Calculate starting position based on quadrant
    const x = (quadrant % 2) * (width / 2) + Math.random() * (width / 2);
    const y =
      Math.floor(quadrant / 2) * (height / 2) + Math.random() * (height / 2);

    // Direction towards center of quadrant
    const centerX = (quadrant % 2) * width + width / 4;
    const centerY = Math.floor(quadrant / 2) * height + height / 4;

    return {
      points: [{ x, y }],
      direction: {
        x: Math.sign(centerX - x) || (Math.random() > 0.5 ? 1 : -1),
        y: Math.sign(centerY - y) || (Math.random() > 0.5 ? 1 : -1),
      },
      quadrant,
    };
  };

  const isOutsideViewport = (
    point: Point,
    canvas: HTMLCanvasElement
  ): boolean => {
    return (
      point.x < -VIEWPORT_MARGIN ||
      point.x > canvas.width + VIEWPORT_MARGIN ||
      point.y < -VIEWPORT_MARGIN ||
      point.y > canvas.height + VIEWPORT_MARGIN
    );
  };

  const updateSnake = (snake: Snake, canvas: HTMLCanvasElement) => {
    const lastPoint = snake.points[snake.points.length - 1];

    // Randomly change direction
    if (Math.random() > DIRECTION_CHANGE_PROBABILITY) {
      const isHorizontal = snake.direction.x !== 0;
      const centerX = (snake.quadrant % 2) * canvas.width + canvas.width / 4;
      const centerY =
        Math.floor(snake.quadrant / 2) * canvas.height + canvas.height / 4;

      snake.direction = isHorizontal
        ? {
            x: 0,
            y:
              Math.sign(centerY - lastPoint.y) ||
              (Math.random() > 0.5 ? 1 : -1),
          }
        : {
            x:
              Math.sign(centerX - lastPoint.x) ||
              (Math.random() > 0.5 ? 1 : -1),
            y: 0,
          };
    }

    // Add new point
    snake.points.push({
      x: lastPoint.x + snake.direction.x * GRID_SIZE,
      y: lastPoint.y + snake.direction.y * GRID_SIZE,
    });

    // Remove old points if too long
    if (snake.points.length > MAX_LENGTH) {
      snake.points.shift();
    }

    // Reset if outside viewport
    if (snake.points.every((point) => isOutsideViewport(point, canvas))) {
      Object.assign(snake, createSnake(canvas));
    }
  };

  const drawSnake = (ctx: CanvasRenderingContext2D, snake: Snake) => {
    if (snake.points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(snake.points[0].x, snake.points[0].y);
    snake.points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));

    // Draw main line
    ctx.strokeStyle = LINE_STYLE.color;
    ctx.lineWidth = LINE_STYLE.width;
    ctx.lineCap = "butt";
    ctx.stroke();

    // Add glow
    ctx.shadowColor = LINE_STYLE.glow.color;
    ctx.shadowBlur = LINE_STYLE.glow.blur;
    ctx.stroke();
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0;

    snakesRef.current.forEach((snake) => {
      updateSnake(snake, canvas);
      drawSnake(ctx, snake);
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getSnakeCount = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) return 5;
      if (window.matchMedia("(min-width: 1024px)").matches) return 4;
      if (window.matchMedia("(min-width: 640px)").matches) return 3;
      return 2;
    };

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      snakesRef.current = Array.from({ length: getSnakeCount() }, (_, i) =>
        createSnake(canvas, i % 4)
      );
    };

    updateSize();
    window.addEventListener("resize", debounce(updateSize, 250));
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", debounce(updateSize, 250));
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 h-screen w-screen"
      style={{
        background: "linear-gradient(to bottom, #000000, #1a1a1a)",
      }}
    />
  );
};

export default BackgroundEffects;
