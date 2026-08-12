
import React, { useState, useMemo, useCallback } from 'react';

// --- Type Definitions ---
interface RGB { r: number; g: number; b: number; }
interface HSL { h: number; s: number; l: number; }

// --- Conversion Logic ---

const hexToRgb = (hex: string): RGB | null => {
    if (!hex.startsWith('#')) return null;
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
};

const rgbToHex = (rgb: RGB): string => {
    const toHex = (c: number) => ('0' + c.toString(16)).slice(-2);
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
};

const rgbToHsl = (rgb: RGB): HSL => {
    let { r, g, b } = rgb;
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const ColorValue: React.FC<{ label: string; value: string }> = ({ label, value }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    return (
        <div className="bg-gray-800 p-3 rounded-md flex items-center justify-between">
            <div>
                <span className="text-xs text-gray-400 uppercase">{label}</span>
                <p className="font-mono text-lg">{value}</p>
            </div>
            <button onClick={handleCopy} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-md text-sm transition-colors">
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};

const ColorPickerHexConverter: React.FC = () => {
    const [hexColor, setHexColor] = useState('#16A34A');

    const { rgb, hsl } = useMemo(() => {
        const rgbValue = hexToRgb(hexColor);
        if (!rgbValue) return { rgb: null, hsl: null };
        const hslValue = rgbToHsl(rgbValue);
        return { rgb: rgbValue, hsl: hslValue };
    }, [hexColor]);
    
    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^#?[0-9a-fA-F]{0,6}$/.test(value)) {
            setHexColor(value.startsWith('#') ? value : `#${value}`);
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Color Picker & Converter</h2>
            <p className="text-center text-gray-400 mb-8">Convert HEX to RGB and HSL instantly.</p>

            <div className="flex justify-center mb-6">
                <input
                    type="color"
                    value={hexColor}
                    onChange={e => setHexColor(e.target.value)}
                    className="w-48 h-48 p-0 border-none rounded-full cursor-pointer bg-transparent"
                    style={{'WebkitAppearance': 'none', 'MozAppearance': 'none', 'appearance': 'none'}}
                />
            </div>
            
            <div className="space-y-4">
                <ColorValue label="HEX" value={hexColor.toUpperCase()} />
                {rgb && <ColorValue label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />}
                {hsl && <ColorValue label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />}
            </div>
        </div>
    );
};

export default ColorPickerHexConverter;
