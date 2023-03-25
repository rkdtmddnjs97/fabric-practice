import "./App.css";
import { fabric } from "fabric";
import { ChromePicker } from "react-color";
import React, { useState, useEffect, useRef, useCallback } from "react";
import initCanvas from "./utils/initCanvas";

const App = () => {
  // 초기 캔버스 셋팅
  const canvas = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [objName, setObjName] = useState([]);
  const [fillColor, setFillColor] = useState("");
  const [strokeColor, setStrokeColor] = useState("");
  const [objectId, setObjectId] = useState(0);
  const [selectedObj, setSelectedObj] = useState(null);
  const [stroke, setStroke] = useState(0);
  useEffect(() => {
    canvas.current = initCanvas(canvasSize);
    canvas.current.on("mouse:over", () => {
      console.log("hello");
    });
    // canvas.current.on("object:scaling", (e) => {
    //   var obj = e.target;
    //   obj.strokeWidth
    //   obj.strokeWidth = obj.strokeWidth / ((obj.scaleX + obj.scaleY) / 2);
    //   var activeObject = canvas.current.getActiveObject();
    //   activeObject.set("strokeWidth", obj.strokeWidth);
    //   canvas.current.renderAll();
    // }); 개쓸모없는코드

    return () => {
      canvas.current.dispose();
      canvas.current = null;
    };
  }, []);

  const addRect = () => {
    let rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "#039BE5",
      width: 100,
      height: 100,
      angle: 0,
      kindOf: "rect" + objectId,
    });
    rect.on("selected", (e) => {
      console.log("제발", e.target);
      console.log(e.target.fill, e.target.stroke, e.target.kindOf);
      setSelectedObj(e.target.kindOf);
      setFillColor(e.target.fill);
      setStrokeColor(e.target.stroke ? e.target.stroke : "#000000");
      setStroke(e.target.strokeWidth);
    });
    setObjectId(objectId + 1);
    canvas.current.add(rect);
    canvas.current.renderAll();
  };
  const addCircle = () => {
    let circle = new fabric.Circle({
      radius: 65,
      fill: "#039BE5",
      left: 0,
      stroke: "#123456",
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

  const handlefillColorChange = useCallback(
    (color) => {
      console.log("getActiveObject", canvas.current.getActiveObject());
      if (canvas.current.getActiveObject()) {
        const activeObj = canvas.current.getActiveObject();
        activeObj.set("fill", color);
        canvas.current.renderAll();
        setFillColor(color);
      }
    },
    [fillColor]
  );
  const handleStrokeColorChange = useCallback(
    (color) => {
      // const objects = canvas.current.getObjects();
      // for (const object in objects) {
      //   if (objects[object].kindOf === selectedObj) {
      //     // objects[object].setFill(color)
      //   }
      // }
      // console.log("objects", objects);
      if (canvas.current.getActiveObject()) {
        console.log("getActiveObject", canvas.current.getActiveObject());
        const activeObj = canvas.current.getActiveObject();
        activeObj.set("stroke", color);
        canvas.current.renderAll();
        setStrokeColor(color);
      }
    },
    [strokeColor]
  );
  const handleStrokeWidth = useCallback(
    (e) => {
      const activeObj = canvas.current.getActiveObject();
      console.log("??", e.target.value, activeObj.setStrokeWidth);
      activeObj.set("strokeWidth", Number(e.target.value));
      canvas.current.renderAll();
      // activeObj.set("padding", 0);
      setStroke(e.target.value);
    },
    [stroke]
  );

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
      <div style={{ display: "flex" }}>
        <ChromePicker
          color={fillColor}
          onChange={(color) => handlefillColorChange(color.hex)}
        />
        <div>
          stroke 설정
          <ChromePicker
            color={strokeColor}
            onChange={(color) => handleStrokeColorChange(color.hex)}
          />
          <p>굵기 : {stroke}px</p>
          <input
            type="range"
            min="1"
            max="50"
            value={stroke}
            onChange={handleStrokeWidth}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
