import { useRef, useEffect } from "react";
import Draw from "../../features/Draw";
import "./canvas.css";

export const Canvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const darw = new Draw(canvas);
    }
  }, [Draw]);

  return <canvas ref={canvasRef} />;
};
