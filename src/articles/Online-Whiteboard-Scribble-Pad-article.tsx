import React from 'react';

const OnlineWhiteboardScribblePadArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-cyan-400">
            <h2>The Technology Behind an Online Whiteboard: Using the HTML Canvas API</h2>
            <p>
                An online whiteboard or scribble pad is a perfect example of the power of modern web technologies to create rich, interactive experiences directly in the browser. What might seem like a complex application can be built using a single, powerful element: the HTML <code>&lt;canvas&gt;</code>. The Canvas API provides a blank slate and a set of drawing functions in JavaScript that allow a developer to create a fully functional drawing application without any server-side processing or external plugins.
            </p>

            <h3>The <code>&lt;canvas&gt;</code> Element: A Digital Drawing Surface</h3>
            <p>
                The <code>&lt;canvas&gt;</code> element itself is just a container. The real magic happens in its "rendering context," which is accessed via JavaScript. For a 2D drawing application, we get the `2d` context, which provides a rich API for drawing shapes, lines, text, and images.
            </p>
            <p><code>const context = canvas.getContext('2d');</code></p>
            <p>This context object is where we define properties like the brush color (<code>strokeStyle</code>), brush size (<code>lineWidth</code>), and line style (<code>lineCap</code>).</p>

            <h3>Bringing it to Life with Event Listeners</h3>
            <p>
                To create an interactive drawing experience, we listen for mouse (or touch) events on the canvas element:
            </p>
            <ol className="list-decimal list-inside">
                <li><strong><code>onMouseDown</code>:</strong> When the user presses the mouse button down, this event fires. We use this to signal the start of a drawing action. We record the starting coordinates (<code>moveTo(x, y)</code>) and set a flag, like <code>isDrawing</code>, to <code>true</code>.</li>
                <li><strong><code>onMouseMove</code>:</strong> As the user moves the mouse across the canvas with the button held down, this event fires continuously. If <code>isDrawing</code> is <code>true</code>, we draw a line from the last recorded point to the current mouse coordinates (<code>lineTo(x, y)</code>) and then call <code>stroke()</code> to make the line visible.</li>
                <li><strong><code>onMouseUp</code> / <code>onMouseLeave</code>:</strong> When the user releases the mouse button or the cursor leaves the canvas area, we set the <code>isDrawing</code> flag to <code>false</code>. This stops the drawing action until the next <code>mousedown</code> event.</li>
            </ol>
            <p>
                By combining the canvas's drawing capabilities with these fundamental JavaScript event listeners, we can create a smooth, responsive, and intuitive digital whiteboard that runs entirely on the client-side.
            </p>
        </article>
    );
};

export default OnlineWhiteboardScribblePadArticle;