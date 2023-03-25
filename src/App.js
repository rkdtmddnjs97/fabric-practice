import "./App.css";
import { fabric } from "fabric";
import React, { useState, useEffect, useRef } from "react";
import initCanvas from "./utils/initCanvas";

const App = () => {
  // 초기 캔버스 셋팅
  const canvas = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 800 });
  useEffect(() => {
    canvas.current = initCanvas(canvasSize);

    canvas.current.on("mouse:over", () => {
      console.log("hello");
    });

    // destroy fabric on unmount
    return () => {
      canvas.current.dispose();
      canvas.current = null;
    };
  }, []);

  const addRect = () => {
    let rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 100,
      height: 100,
      angle: 0,
    });

    canvas.current.add(rect);
    canvas.current.renderAll();
  };
  const addCircle = () => {
    let circle = new fabric.Circle({
      radius: 65,
      fill: "#039BE5",
      left: 0,
      stroke: "red",
      strokeWidth: 3,
    });
    canvas.current.add(circle);
    canvas.current.renderAll();
  };
  const viewCanvas = () => {
    console.log("??", JSON.stringify(canvas.current.toDatalessJSON(["id"])));
  };
  const reduceHeight = () => {
    setCanvasSize({ ...canvasSize, height: canvasSize.height - 20 });
    canvas.current.setHeight(canvasSize.height - 20);
    canvas.current.renderAll();
  };
  const increaseHeight = () => {
    setCanvasSize({ ...canvasSize, height: canvasSize.height + 20 });
    canvas.current.setHeight(canvasSize.height + 20);
    canvas.current.renderAll();
  };
  const reduceWidth = () => {
    setCanvasSize({ ...canvasSize, width: canvasSize.width - 20 });
    canvas.current.setWidth(canvasSize.width - 20);
    canvas.current.renderAll();
  };
  const increaseWidth = () => {
    setCanvasSize({ ...canvasSize, width: canvasSize.width + 20 });
    canvas.current.setWidth(canvasSize.width + 20);
    canvas.current.renderAll();
  };

  return (
    <div className="App">
      <canvas id="canvas" />
      <button onClick={addRect}>Add Rect</button>
      <button onClick={viewCanvas}>canvas data</button>
      <button onClick={addCircle}>Add Circle</button>
      <button onClick={addRect}>Add Rect</button>
      <button onClick={reduceWidth}>캔버스 가로 줄이기</button>
      <button onClick={increaseWidth}>캔버스 가로 늘이기</button>
      <button onClick={reduceHeight}>캔버스 세로 줄이기</button>
      <button onClick={increaseHeight}>캔버스 세로 늘이기</button>
    </div>
  );
};

export default App;
