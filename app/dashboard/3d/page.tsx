"use client";
import {useEffect} from "react";

export default function Cistern() {

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = document.getElementById("myCanvas") as HTMLCanvasElement;
        const ctx = canvas?.getContext("2d");

        function roundBottomRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + height - radius);
            ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
            ctx.lineTo(x + width - radius, y + height);
            ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
            ctx.lineTo(x + width, y);
            ctx.closePath();
            ctx.stroke();
        }

        function resizeCanvasToDisplaySize(canvas) {
            const dpr = window.devicePixelRatio;
            const {width, height} = canvas.getBoundingClientRect();
            const displayWidth = Math.round(width * dpr);
            const displayHeight = Math.round(height * dpr);
            const needResize = canvas.width != displayWidth || canvas.height != displayHeight;
            if (needResize) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
            }
            return needResize;
        }
        const G = [
            [1, 1], [-1, 1], [1, -1], [-1, -1],
            [1, 0], [-1, 0], [1, 0], [-1, 0],
            [0, 1], [0, -1], [0, 1], [0, -1]
        ];

        const P: number[] = [];
        for (let i = 0; i < 256; i++) {
            P[i] = i;
        }
        for (let i = 0; i < 256; i++) {
            const j = Math.floor(Math.random() * (256 - i)) + i;
            const temp = P[i];
            P[i] = P[j];
            P[j] = temp;
        }
        const perm = P.concat(P);

        function dot(g: number[], x: number, y: number): number {
            return g[0] * x + g[1] * y;
        }

        function mix(a: number, b: number, t: number): number {
            return (1 - t) * a + t * b;
        }

        function fade(t: number): number {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        function perlin(x: number, y: number): number {
            const X = Math.floor(x) & 255;
            const Y = Math.floor(y) & 255;
            x -= Math.floor(x);
            y -= Math.floor(y);
            const u = fade(x);
            const v = fade(y);
            const A = perm[X] + Y;
            const B = perm[X + 1] + Y;
            return mix(mix(dot(G[perm[A] % 12], x, y), dot(G[perm[B] % 12], x - 1, y), u),
                mix(dot(G[perm[A + 1] % 12], x, y - 1), dot(G[perm[B + 1] % 12], x - 1, y - 1), u), v);
        }

        function drawWaterLevel(ctx, x, y, width, height, radius, percent, t) {
            const waterHeight = height * (1 - percent / 100);
            ctx.beginPath();
            ctx.moveTo(x, y + waterHeight);
            for (let i = 0; i < width; i++) {
                const noiseValue = perlin(i * 0.05, t * 0.005);
                const waveHeight = 2 + noiseValue * 5;
                const frequency = 0.06 + noiseValue * 0.0005;
                const wave = waveHeight * Math.sin(frequency * (i + t));
                ctx.lineTo(x + i, y + waterHeight + wave);
            }
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + waterHeight);
            ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
            ctx.fill();
        }
        function animate(t) {
            ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
            roundBottomRect(ctx, 0, 0, canvas!.width, canvas!.height, 20);
            drawWaterLevel(ctx, 0, 0, canvas?.width, canvas?.height, 20, 80, t * 0.05);
            requestAnimationFrame(animate);
            resizeCanvasToDisplaySize(canvas!);
        }

        animate(0);
    }, []);
    return (
        <canvas id="myCanvas" className={"w-full h-full"}/>
    );
}