import React, { useRef, useEffect, useState, MouseEvent } from 'react';

const OnlineWhiteboardScribblePad: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#FFFFFF');
    const [brushSize, setBrushSize] = useState(5);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Adjust for device pixel ratio for sharper drawing
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.scale(ratio, ratio);
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = brushSize;
        contextRef.current = context;
    }, []);

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
        }
    }, [color]);

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.lineWidth = brushSize;
        }
    }, [brushSize]);

    const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = event.nativeEvent;
        contextRef.current?.beginPath();
        contextRef.current?.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current?.closePath();
        setIsDrawing(false);
    };

    const draw = (event: MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = event.nativeEvent;
        contextRef.current?.lineTo(offsetX, offsetY);
        contextRef.current?.stroke();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
    
    const setEraser = () => {
        setColor('#1F2937'); // Match the background color
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-4">Online Whiteboard</h2>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-4 p-2 bg-gray-800 rounded-lg">
                <label>Color: <input type="color" value={color} onChange={e => setColor(e.target.value)} className="bg-transparent border-none"/></label>
                <label>Brush Size: <input type="range" min="1" max="50" value={brushSize} onChange={e => setBrushSize(parseInt(e.target.value))} /></label>
                <button onClick={setEraser} className="bg-gray-700 p-2 rounded-md">Eraser</button>
                <button onClick={clearCanvas} className="bg-red-600 p-2 rounded-md">Clear All</button>
            </div>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                onMouseLeave={finishDrawing}
                className="w-full h-[60vh] bg-gray-800 rounded-lg cursor-crosshair"
            />
        </div>
    );
};

export default OnlineWhiteboardScribblePad;