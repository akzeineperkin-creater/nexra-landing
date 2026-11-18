"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, TrendingUp, Lightbulb, Sparkles, Shield } from "lucide-react";

export interface HeroProps {
  headline?: {
    line1: string;
    line2: string;
  };
  subtitle?: string;
  trustBadge?: {
    text: string;
    icons?: string[];
    icon?: React.ReactNode;
  };
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  className?: string;
}

export default function Hero({
  headline = {
    line1: "Nexra",
    line2: "Инвестициялық симулятор",
  },
  subtitle = "Қаржылық сауаттылықты дамытатын виртуалды платформа. Автор: Еркін Ақзейнеп, 11 сынып",
  trustBadge = {
    text: "ҒЫЛЫМИ ЖОБА",
  },
  buttons,
  className = "",
}: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // WebGL Shader Background setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      let frameId: number;
      let t = 0;
      const render2D = () => {
        t += 0.01;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const gradient = ctx.createRadialGradient(
          canvas.width * 0.5 + Math.sin(t) * 100,
          canvas.height * 0.5 + Math.cos(t) * 60,
          50,
          canvas.width * 0.5,
          canvas.height * 0.5,
          canvas.width * 0.8
        );
        gradient.addColorStop(0, "rgba(255, 107, 0, 0.35)");
        gradient.addColorStop(0.4, "rgba(217, 119, 6, 0.15)");
        gradient.addColorStop(1, "#090A0F");
        ctx.fillStyle = "#090A0F";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        frameId = requestAnimationFrame(render2D);
      };
      render2D();
      return () => cancelAnimationFrame(frameId);
    }

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        vec2 mouse = u_mouse;
        mouse.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.25;

        vec2 q = vec2(0.0);
        q.x = snoise(st + vec2(0.0, 0.5 * t));
        q.y = snoise(st + vec2(t * 0.3, 0.0));

        vec2 r = vec2(0.0);
        r.x = snoise(st + 1.2 * q + vec2(1.7, 9.2) + 0.15 * t);
        r.y = snoise(st + 1.2 * q + vec2(8.3, 2.8) + 0.126 * t);

        float f = snoise(st + 1.5 * r + (mouse - 0.5) * 0.3);
        f = (f + 1.0) * 0.5;

        vec3 colorBg = vec3(0.035, 0.039, 0.055);
        vec3 colorAmber = vec3(0.78, 0.32, 0.08);
        vec3 colorOrange = vec3(1.0, 0.42, 0.0); // #FF6B00
        vec3 colorGold = vec3(1.0, 0.76, 0.25);
        vec3 colorDeepNavy = vec3(0.05, 0.07, 0.14);

        vec3 color = mix(colorBg, colorDeepNavy, clamp(length(q), 0.0, 1.0));
        color = mix(color, colorAmber, clamp(length(r.x), 0.0, 1.0) * 0.7);
        color = mix(color, colorOrange, clamp(pow(f, 3.5), 0.0, 1.0) * 0.9);
        color += colorGold * pow(clamp(f, 0.0, 1.0), 6.0) * 0.5;

        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.4), 0.0, 1.0);
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (
      type: number,
      source: string
    ): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position"
    );
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    let animationFrameId: number;
    let startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const currentTime = (performance.now() - startTime) * 0.001;

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(mouseLocation, mousePos.x, mousePos.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: 1.0 - (e.clientY - rect.top) / rect.height,
    });
  };

  const handlePrimaryClick = () => {
    if (buttons?.primary?.onClick) {
      buttons.primary.onClick();
    } else {
      const target = document.getElementById("scrollytelling");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#090A0F] text-white ${className}`}
    >
      {/* Background WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Subtle Overlay Gradients & Grid */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-[1] bg-gradient-to-b from-[#090A0F]/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-[2]" />

      {/* =========================================================================
          SMOOTH TRANSITION MASK: Deep Dark Hero -> Clean Light Mode (#f8fafc)
          ========================================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-b from-transparent via-[#090A0F]/60 to-[#f8fafc] pointer-events-none z-10" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 pt-24 pb-32 flex flex-col items-center text-center">
        {/* Trust Badge (STRICT VECTOR ICONS - ZERO EMOJIS) */}
        {trustBadge && (
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 shadow-[0_0_25px_rgba(255,107,0,0.2)] mb-8 transition-transform hover:scale-105 duration-300">
            <TrendingUp className="w-4 h-4 text-[#FF6B00]" />
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-amber-300">
              {trustBadge.text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse ml-1" />
          </div>
        )}

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] mb-6 drop-shadow-xl">
          <span className="block bg-gradient-to-r from-[#FF6B00] via-amber-400 to-yellow-300 bg-clip-text text-transparent">
            {headline.line1}
          </span>
          <span className="block text-white/95 mt-1 sm:mt-2 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-normal">
            {headline.line2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-neutral-300/90 leading-relaxed font-normal mb-10 text-balance">
          {subtitle}
        </p>

        {/* Primary CTA Button (Vibrant Orange #FF6B00) */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handlePrimaryClick}
            type="button"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-[#FF6B00] hover:bg-[#e66000] transition-all duration-300 shadow-[0_4px_30px_rgba(255,107,0,0.45)] hover:shadow-[0_6px_40px_rgba(255,107,0,0.65)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>{buttons?.primary?.text || "Жобамен танысу"}</span>
            <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1 duration-300 text-white" />
            <span className="absolute -inset-0.5 rounded-xl bg-[#FF6B00]/40 -z-10 blur-sm group-hover:opacity-100 opacity-60 transition duration-300" />
          </button>

          {buttons?.secondary && (
            <button
              onClick={buttons.secondary.onClick}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-medium text-base text-neutral-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{buttons.secondary.text}</span>
            </button>
          )}
        </div>

        {/* Scientific Metadata Micro-bar (Strict Vector Icons - Zero Emojis) */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-neutral-300">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Тақырып: Қаржылық сауаттылық</span>
          </div>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Зерттеу: 6 апталық эксперимент</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Нәтиже: +1.7x тиімділік</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator Pill */}
      <div
        onClick={handlePrimaryClick}
        className="absolute bottom-8 z-20 flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
      >
        <span className="text-[11px] uppercase tracking-widest text-slate-700 font-semibold drop-shadow-sm">
          Төмен қарай скролл
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-slate-400 flex items-start justify-center p-1 bg-white/70 shadow-sm">
          <div className="w-1.5 h-2.5 rounded-full bg-[#FF6B00] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
