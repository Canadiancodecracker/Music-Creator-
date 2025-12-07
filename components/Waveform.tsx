import React, { useEffect, useRef } from 'react';

const Waveform: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
          // Set canvas resolution to match display size for sharpness
          const dpr = window.devicePixelRatio || 1;
          const rect = parent.getBoundingClientRect();
          
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          
          // Scale context to match
          ctx.scale(dpr, dpr);
          
          // Store CSS width/height for calculations
          canvas.style.width = `${rect.width}px`;
          canvas.style.height = `${rect.height}px`;
      }
    };
    
    // Initial resize
    resize();
    window.addEventListener('resize', resize);

    const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
        if (h < w) r = h / 2; // Cap radius
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.fill();
    };

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      
      ctx.clearRect(0, 0, width, height);
      
      const centerY = height / 2;
      
      // Configuration
      const barWidth = 6;
      const gap = 6;
      const totalBarWidth = barWidth + gap;
      const barCount = Math.floor(width / totalBarWidth);
      const startX = (width - (barCount * totalBarWidth)) / 2; // Center align

      // Create gradient for the bars
      const gradient = ctx.createLinearGradient(0, centerY - 100, 0, centerY + 100);
      gradient.addColorStop(0, '#2af0ea'); // Brand Cyan
      gradient.addColorStop(0.5, '#ffffff'); // White
      gradient.addColorStop(1, '#ff0050'); // Brand Pink

      ctx.fillStyle = gradient;

      for (let i = 0; i < barCount; i++) {
        // Calculate position from center (-1 to 1)
        const normalizedPos = (i - barCount / 2) / (barCount / 2);
        
        // Attenuation at edges
        const mask = Math.cos(normalizedPos * Math.PI / 2); // 1 at center, 0 at edges
        
        // Generate complex wave motion
        // Use multiple sine waves with different frequencies and speeds
        const t = offset * 0.05;
        const noise = Math.sin(i * 0.2 + t) * 1.0 + 
                      Math.sin(i * 0.5 - t * 2.5) * 0.5 + 
                      Math.sin(i * 0.1 + t * 0.5) * 0.2;
        
        // Base height modulated by mask and noise
        // Ensure minimum height of barWidth (circle)
        let barHeight = Math.max(barWidth, (Math.abs(noise) * (height * 0.4) + 10) * mask);
        
        // Add a "beat" kick effect occasionally
        const beat = Math.pow((Math.sin(t * 0.5) + 1) / 2, 8); 
        barHeight *= (1 + beat * 0.3);

        const x = startX + i * totalBarWidth;
        const y = centerY - barHeight / 2;
        
        // Draw
        ctx.globalAlpha = 0.6 + mask * 0.4; // Fade out edges opacity too
        drawRoundedRect(x, y, barWidth, barHeight, barWidth / 2);
      }
      ctx.globalAlpha = 1.0;

      offset += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default Waveform;