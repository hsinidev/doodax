import React, { useState, useMemo } from 'react';

// --- TypeScript Interfaces ---
interface RGB {
    r: number;
    g: number;
    b: number;
}

interface WcagRatings {
    aaNormal: boolean;
    aaLarge: boolean;
    aaaNormal: boolean;
    aaaLarge: boolean;
}

// --- Core Logic ---

/**
 * Converts a hex color string to an RGB object.
 * Handles 3-digit and 6-digit hex codes.
 */
const hexToRgb = (hex: string): RGB | null => {
    if (!hex) return null;
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

/**
 * Calculates the relative luminance of a color.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
const getLuminance = (rgb: RGB): number => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Calculates the contrast ratio between two RGB colors.
 */
const calculateContrastRatio = (rgb1: RGB, rgb2: RGB): number => {
    const lum1 = getLuminance(rgb1);
    const lum2 = getLuminance(rgb2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
};

// --- UI Components ---

const RatingBadge: React.FC<{ label: string; pass: boolean }> = ({ label, pass }) => (
    <div className={`text-center p-3 rounded-lg ${pass ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
        <p className="font-bold text-2xl">{pass ? 'PASS' : 'FAIL'}</p>
        <p className="text-xs uppercase">{label}</p>
    </div>
);

// --- Main Component ---
const ColorContrastChecker: React.FC = () => {
    const [fgColor, setFgColor] = useState<string>('#FFFFFF');
    const [bgColor, setBgColor] = useState<string>('#2563EB');

    const { contrastRatio, wcagRatings } = useMemo(() => {
        const fgRgb = hexToRgb(fgColor);
        const bgRgb = hexToRgb(bgColor);

        if (!fgRgb || !bgRgb) {
            return { contrastRatio: 1, wcagRatings: { aaNormal: false, aaLarge: false, aaaNormal: false, aaaLarge: false } };
        }

        const ratio = calculateContrastRatio(fgRgb, bgRgb);
        const ratings: WcagRatings = {
            aaNormal: ratio >= 4.5,
            aaLarge: ratio >= 3,
            aaaNormal: ratio >= 7,
            aaaLarge: ratio >= 4.5,
        };
        return { contrastRatio: ratio, wcagRatings: ratings };
    }, [fgColor, bgColor]);

    const getRatioColor = () => {
        if (contrastRatio >= 7) return 'text-green-400';
        if (contrastRatio >= 4.5) return 'text-lime-400';
        if (contrastRatio >= 3) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Color Contrast Checker</h2>
            <p className="text-center text-gray-400 mb-8">Check if your color combinations meet WCAG accessibility standards.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Color Inputs */}
                <div className="space-y-4">
                     <div>
                        <label htmlFor="fg-color" className="block text-lg font-semibold text-gray-300 mb-2">Foreground Color</label>
                        <div className="flex gap-2">
                            <input id="fg-color-picker" type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-12 h-12 p-1 bg-gray-800 border-gray-700 rounded-md cursor-pointer"/>
                            <input id="fg-color" type="text" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-full bg-gray-800 p-2 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 font-mono"/>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="bg-color" className="block text-lg font-semibold text-gray-300 mb-2">Background Color</label>
                        <div className="flex gap-2">
                             <input id="bg-color-picker" type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-12 h-12 p-1 bg-gray-800 border-gray-700 rounded-md cursor-pointer"/>
                            <input id="bg-color" type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full bg-gray-800 p-2 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 font-mono"/>
                        </div>
                    </div>
                </div>

                {/* Results Dashboard */}
                <div className="text-center bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-lg text-gray-400">Contrast Ratio</p>
                    <p className={`text-6xl font-bold my-2 ${getRatioColor()}`}>{contrastRatio.toFixed(2)}:1</p>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                        <RatingBadge label="AA Normal Text" pass={wcagRatings.aaNormal} />
                        <RatingBadge label="AA Large Text" pass={wcagRatings.aaLarge} />
                        <RatingBadge label="AAA Normal Text" pass={wcagRatings.aaaNormal} />
                        <RatingBadge label="AAA Large Text" pass={wcagRatings.aaaLarge} />
                    </div>
                </div>
            </div>

            {/* Preview */}
            <div>
                 <h3 className="text-lg font-semibold text-gray-300 mb-2 text-center">Live Preview</h3>
                 <div style={{ backgroundColor: bgColor, color: fgColor }} className="p-6 rounded-lg border-2 border-gray-700 transition-colors duration-300">
                    <p className="text-lg">This is an example of normal text. The quick brown fox jumps over the lazy dog. Designers and developers use this to check readability and contrast.</p>
                    <p className="text-xl font-bold mt-4">This is an example of large, bold text. It requires a lower contrast ratio to be considered accessible according to WCAG guidelines.</p>
                 </div>
            </div>
        </div>
    );
};

export default ColorContrastChecker;
