
import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer: React.FC = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const totalSecondsRef = useRef(0);

    useEffect(() => {
        let interval: number | null = null;
        if (isActive && totalSecondsRef.current > 0) {
            interval = window.setInterval(() => {
                totalSecondsRef.current -= 1;
                setMinutes(Math.floor(totalSecondsRef.current / 60));
                setSeconds(totalSecondsRef.current % 60);
                if (totalSecondsRef.current <= 0) {
                    setIsActive(false);
                    setIsFinished(true);
                    // Simple alarm sound
                    new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YV_OT19').play();
                }
            }, 1000);
        } else if (!isActive && totalSecondsRef.current !== 0) {
            if (interval) clearInterval(interval);
        }
        return () => { if(interval) clearInterval(interval) };
    }, [isActive]);
    
    const startTimer = () => {
        totalSecondsRef.current = minutes * 60 + seconds;
        if(totalSecondsRef.current > 0) {
            setIsActive(true);
            setIsFinished(false);
        }
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsFinished(false);
        totalSecondsRef.current = 25 * 60;
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center mb-8">Countdown Timer</h2>
            
            <div className={`font-mono text-8xl md:text-9xl font-bold transition-colors ${isFinished ? 'text-red-500' : 'text-cyan-400'}`}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            <div className="flex gap-4 my-8">
                <div>
                    <label>Minutes</label>
                    <input type="number" value={minutes} onChange={e => setMinutes(Math.max(0, parseInt(e.target.value) || 0))} disabled={isActive} className="w-24 bg-gray-800 p-2 rounded-md text-center text-xl"/>
                </div>
                <div>
                    <label>Seconds</label>
                    <input type="number" value={seconds} onChange={e => setSeconds(Math.max(0, parseInt(e.target.value) || 0))} disabled={isActive} className="w-24 bg-gray-800 p-2 rounded-md text-center text-xl"/>
                </div>
            </div>
            
             <div className="flex gap-4">
                <button onClick={isActive ? () => setIsActive(false) : startTimer} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg">
                    {isActive ? 'Pause' : 'Start'}
                </button>
                 <button onClick={resetTimer} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-md text-lg">
                    Reset
                </button>
            </div>
        </div>
    );
};

export default CountdownTimer;
