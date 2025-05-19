declare module "react-typewriter-effect";
declare module "formidable";

// Add custom element type for brush-ninja-drawing
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "brush-ninja-drawing": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { height?: string };
    }
  }
}
