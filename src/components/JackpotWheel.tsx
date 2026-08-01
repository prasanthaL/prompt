"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, Volume2, VolumeX, RotateCcw, Clock, Lock } from "lucide-react";
import {
  WHEEL_SEGMENTS,
  executeSpin,
  getJackpotState,
  getNextResetTimestamp,
  DAILY_MAX_SPINS,
  SpinResult,
  JackpotState,
} from "@/lib/jackpot-engine";

interface JackpotWheelProps {
  onSpinComplete: (result: SpinResult) => void;
}

export const JackpotWheel: React.FC<JackpotWheelProps> = ({ onSpinComplete }) => {
  const [state, setState] = useState<JackpotState | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Web Audio API for ticking sound
  const playTickSound = useCallback(() => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio Context playback error:", e);
    }
  }, [isMuted]);

  // Load state on mount
  useEffect(() => {
    const initialState = getJackpotState();
    setState(initialState);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const updateCountdown = () => {
      const resetTime = getNextResetTimestamp();
      const diff = resetTime - Date.now();

      if (diff <= 0) {
        setTimeRemaining("00h 00m 00s");
        // Reload state on day rollover
        setState(getJackpotState());
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}h ${minutes
          .toString()
          .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Draw wheel on canvas
  const drawWheel = useCallback((currentAngleDeg: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(centerX, centerY) - 20;
    const innerRadius = 50;

    ctx.clearRect(0, 0, width, height);

    const segmentCount = WHEEL_SEGMENTS.length;
    const arcSize = (2 * Math.PI) / segmentCount;
    const startAngleRad = (currentAngleDeg * Math.PI) / 180;

    // Outer Glowing Shadow Ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = "#1E1B4B";
    ctx.shadowColor = "#818CF8";
    ctx.shadowBlur = 25;
    ctx.fill();
    ctx.restore();

    // Render Segments
    WHEEL_SEGMENTS.forEach((segment, i) => {
      const segStart = startAngleRad + i * arcSize;
      const segEnd = segStart + arcSize;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, outerRadius, segStart, segEnd);
      ctx.closePath();

      // Gradient Fill for each slice
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        innerRadius,
        centerX,
        centerY,
        outerRadius
      );
      gradient.addColorStop(0, segment.color);
      gradient.addColorStop(1, segment.accentColor);

      ctx.fillStyle = gradient;
      ctx.fill();

      // Divider Line
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.stroke();

      // Text Label Inside Segment
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(segStart + arcSize / 2);

      ctx.textAlign = "right";
      ctx.fillStyle = "#FFFFFF";

      // Label font
      ctx.font = "bold 13px Inter, sans-serif";
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 4;
      ctx.fillText(segment.label, outerRadius - 20, 0);

      // SubLabel font
      ctx.font = "600 10px Inter, sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillText(segment.subLabel, outerRadius - 20, 14);

      ctx.restore();
    });

    // Outer Decorative Studs / Lights
    const studCount = 24;
    for (let i = 0; i < studCount; i++) {
      const studAngle = (i * 2 * Math.PI) / studCount + startAngleRad * 0.2;
      const studX = centerX + (outerRadius + 4) * Math.cos(studAngle);
      const studY = centerY + (outerRadius + 4) * Math.sin(studAngle);

      ctx.beginPath();
      ctx.arc(studX, studY, 3.5, 0, 2 * Math.PI);
      ctx.fillStyle = i % 2 === 0 ? "#FCD34D" : "#FFFFFF";
      ctx.shadowColor = "#F59E0B";
      ctx.shadowBlur = 6;
      ctx.fill();
    }

    // Inner Center Hub Outer Ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#0F172A";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#F59E0B";
    ctx.fill();
    ctx.stroke();
  }, []);

  // Update canvas size and initial render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 450;
      canvas.height = 450;
      drawWheel(rotationAngle);
    }
  }, [drawWheel, rotationAngle]);

  // Spin Trigger Function
  const handleSpin = () => {
    if (isSpinning) return;

    const result = executeSpin();
    if (!result.success) {
      alert(result.message);
      return;
    }

    setIsSpinning(true);

    // Calculate Target Angle
    // Segment 0 starts at 0 deg (east in canvas). Pointer is at Top (270 deg / -90 deg).
    // Segment index target formula:
    const segCount = WHEEL_SEGMENTS.length;
    const segAngleDeg = 360 / segCount;
    const targetSegmentIndex = result.segmentIndex;

    // Pointer is at top (270 deg). Angle offset so center of target segment lands at 270 deg:
    const segmentCenterDeg = targetSegmentIndex * segAngleDeg + segAngleDeg / 2;
    let targetAngleDeg = 270 - segmentCenterDeg;

    // Add 5 to 7 full rotations for suspense
    const extraRotations = (5 + Math.floor(Math.random() * 3)) * 360;
    const finalAngle = rotationAngle + extraRotations + ((targetAngleDeg - (rotationAngle % 360) + 360) % 360);

    const startTime = performance.now();
    const duration = 4500; // 4.5 seconds spin duration
    const startAngle = rotationAngle;
    let lastTickSegment = -1;

    const animateSpin = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic deceleration curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentDeg = startAngle + (finalAngle - startAngle) * easeOut;

      setRotationAngle(currentDeg);
      drawWheel(currentDeg);

      // Calculate which segment is passing under top pointer (270 deg)
      const normalizedAngle = (270 - (currentDeg % 360) + 360) % 360;
      const currentSegmentPassing = Math.floor(normalizedAngle / segAngleDeg) % segCount;

      if (currentSegmentPassing !== lastTickSegment) {
        playTickSound();
        lastTickSegment = currentSegmentPassing;
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateSpin);
      } else {
        setIsSpinning(false);
        const updatedState = getJackpotState();
        setState(updatedState);

        // Delay popup slightly for visual suspense
        setTimeout(() => {
          onSpinComplete(result);
        }, 300);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateSpin);
  };

  const spinsUsed = state?.spinsUsed || 0;
  const remainingSpins = DAILY_MAX_SPINS - spinsUsed;
  const isExhausted = remainingSpins <= 0;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-lg mx-auto select-none">
      {/* Top Controls & Mute Button */}
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-2 bg-foreground/5 dark:bg-white/5 border border-foreground/10 px-3 py-1.5 rounded-full text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-foreground">Daily Limit: 3 Spins</span>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-colors text-foreground/80 hover:text-foreground"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
        </button>
      </div>

      {/* Wheel Container */}
      <div className="relative flex items-center justify-center p-2">
        {/* Top Pointer Pin */}
        <div className="absolute top-0 z-30 transform -translate-y-2 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-amber-400 drop-shadow-[0_4px_10px_rgba(245,158,11,0.8)]" />
        </div>

        {/* Canvas Wheel */}
        <canvas
          ref={canvasRef}
          className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[440px] md:h-[440px] drop-shadow-2xl transition-transform"
        />

        {/* Center Spin Button Overlay */}
        <button
          onClick={handleSpin}
          disabled={isSpinning || isExhausted}
          className={`absolute z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 font-bold ${
            isExhausted
              ? "bg-slate-800 text-slate-400 cursor-not-allowed border-4 border-slate-700"
              : isSpinning
              ? "bg-amber-600 text-white cursor-wait animate-pulse border-4 border-amber-400 shadow-amber-500/50"
              : "bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 hover:from-amber-400 hover:to-yellow-300 text-slate-950 hover:scale-105 active:scale-95 border-4 border-white shadow-amber-500/60 shadow-lg"
          }`}
        >
          {isExhausted ? (
            <div className="flex flex-col items-center text-center p-1">
              <Lock className="w-5 h-5 mb-0.5 text-slate-400" />
              <span className="text-[10px] uppercase tracking-wider">Locked</span>
            </div>
          ) : isSpinning ? (
            <div className="flex flex-col items-center">
              <RotateCcw className="w-6 h-6 animate-spin mb-1 text-white" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider">Spinning</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Sparkles className="w-6 h-6 mb-0.5 text-slate-950 animate-bounce" />
              <span className="text-sm font-black tracking-wider uppercase">SPIN</span>
              <span className="text-[10px] opacity-80">{remainingSpins} Left</span>
            </div>
          )}
        </button>
      </div>

      {/* Spin Status Indicators */}
      <div className="flex items-center justify-center gap-3 w-full">
        {[1, 2, 3].map((num) => {
          const isDone = spinsUsed >= num;
          return (
            <div
              key={num}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isDone
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : num === spinsUsed + 1
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300 animate-pulse"
                  : "bg-foreground/5 border-foreground/10 text-foreground/40"
              }`}
            >
              <span>Spin {num}</span>
              {isDone ? "✅" : "⏳"}
            </div>
          );
        })}
      </div>

      {/* Countdown Timer if Exhausted */}
      {isExhausted && (
        <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-full max-w-sm text-center animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Next Spins Unlock In</span>
          </div>
          <span className="text-2xl font-black font-mono tracking-widest text-amber-300">
            {timeRemaining || "23h 59m 59s"}
          </span>
          <p className="text-xs text-amber-400/80">
            Come back tomorrow to spin for more Legendary prompts!
          </p>
        </div>
      )}
    </div>
  );
};

export default JackpotWheel;
