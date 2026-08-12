import React from 'react';

const ColorPickerHexConverterArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-amber-400">
            <h2>Understanding Web Color Models: HEX, RGB, and HSL Explained</h2>
            <p>
                Color is a fundamental element of web design, but the way we define color in code can sometimes be confusing. Developers and designers primarily work with three color models: HEX, RGB, and HSL. Each model represents color in a different way, and each has its own strengths and use cases. A color converter tool is essential for quickly translating between these formats, streamlining the design and development workflow.
            </p>

            <h3>HEX (Hexadecimal Color Codes)</h3>
            <p>
                Hexadecimal color codes are the most common way to represent color in web development. A HEX code is a six-digit (or sometimes three-digit) hexadecimal number preceded by a hash (<code>#</code>). The format is <code>#RRGGBB</code>, where <code>RR</code> represents the red value, <code>GG</code> the green, and <code>BB</code> the blue. Each pair of values ranges from <code>00</code> (0) to <code>FF</code> (255).
            </p>
            <p>
                For example, <code>#FFFFFF</code> is pure white, <code>#000000</code> is pure black, and <code>#FF0000</code> is pure red. HEX is popular because it's a compact and universally supported way to define a specific color.
            </p>

            <h3>RGB and RGBA (Red, Green, Blue, Alpha)</h3>
            <p>
                The RGB color model is the basis for all colors displayed on screens. It defines a color by specifying the intensity of its red, green, and blue components, with each value ranging from 0 to 255. The CSS syntax is <code>rgb(red, green, blue)</code>.
            </p>
            <p>
                For example, <code>rgb(255, 255, 255)</code> is white, and <code>rgb(255, 0, 0)</code> is red. The main advantage of RGB over HEX is the addition of an alpha channel for transparency, known as RGBA. The <code>rgba(red, green, blue, alpha)</code> format includes an <code>alpha</code> value from 0.0 (fully transparent) to 1.0 (fully opaque), which is something HEX codes traditionally couldn't do (though modern CSS now supports 8-digit HEX codes for this).
            </p>
            
            <h3>HSL and HSLA (Hue, Saturation, Lightness, Alpha)</h3>
            <p>
                HSL is often considered the most intuitive color model for humans to understand. Instead of defining a color by its components, HSL defines it by its characteristics:
            </p>
            <ul className="list-disc pl-5">
                <li><strong>Hue:</strong> The type of color, represented as an angle on the color wheel (0 to 360 degrees). 0 is red, 120 is green, and 240 is blue.</li>
                <li><strong>Saturation:</strong> The intensity or purity of the color, represented as a percentage (0% is grayscale, 100% is full color).</li>
                <li><strong>Lightness:</strong> The brightness of the color, also a percentage (0% is black, 50% is the pure color, and 100% is white).</li>
            </ul>
            <p>
                The CSS syntax is <code>hsl(hue, saturation, lightness)</code>. HSL is incredibly powerful for creating color palettes. For example, you can easily create a lighter or darker shade of a color by simply adjusting the <code>lightness</code> value, without having to recalculate complex RGB or HEX values. Like RGB, HSL also supports an alpha channel for transparency (HSLA).
            </p>
        
                    <div className="bg-gray-900/70 p-4 rounded-md my-4 border border-cyan-500/30">
                        <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{/* Example code will vary per article */}</code>
                        </pre>
                    </div>
                </article>
    );
};

export default ColorPickerHexConverterArticle;