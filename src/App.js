import "./App.css";
import { fabric } from "fabric";
import { SketchPicker } from "react-color";
import React, { useState, useEffect, useRef, useCallback } from "react";
import initCanvas from "./utils/initCanvas";

const App = () => {
  // 초기 캔버스 셋팅
  const canvas = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [objName, setObjName] = useState([]);
  const [fillColor, setFillColor] = useState("");
  const [strokeColor, setStrokeColor] = useState("");
  const [textBgColor, setTextBgColor] = useState("");
  const [objectId, setObjectId] = useState(0);
  const [selectedObj, setSelectedObj] = useState(null);
  const [stroke, setStroke] = useState(0);
  const fontFamilyList = [
    "serif",
    // "Comic Sans",
    // "Hoefler Text",
    // "Delicious",
    // "Impact",
    "monoSpace",
    "cursive",
    // "fantasy",
    "normal",
    // "Pacifico",
    // "VT323",
    // "Quicksand",
    // "Inconsolata",
  ];
  const fontStyleList = ["normal", "italic", "oblique"];
  const [selectedText, setSelectedText] = useState({
    text: "",
    textBackgroundColor: "",
    fontSize: 40,
    fontStyle: "normal",
    fontFamily: "serif",
    fontWeight: "normal",
    underline: false,
    linethrough: null,
    overline: false,
    stroke: "",
    strokeWith: null,
    textAlign: "center",
    lineHeight: null,
  });
  const [selectedShadow, setSelectedShadow] = useState({
    blur: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const [selectedObjectIndex, setSelectedObjectIndex] = useState(null);
  const [objects, setObjects] = useState([]);
  useEffect(() => {
    canvas.current = initCanvas(canvasSize);
    canvas.current.on("mouse:over", () => {});
    canvas.current.on("selection", onObjectSelected);
    canvas.current.on("selection:cleared", onSelectionCleared);
    // canvas.current.on("object:scaling", (e) => {
    //   var obj = e.target;
    //   obj.strokeWidth
    //   obj.strokeWidth = obj.strokeWidth / ((obj.scaleX + obj.scaleY) / 2);
    //   var activeObject = canvas.current.getActiveObject();
    //   activeObject.set("strokeWidth", obj.strokeWidth);
    //   canvas.current.renderAll();
    // }); 개쓸모없는코드
    objects.forEach((object) => {
      canvas.current.add(object);
    });
    return () => {
      canvas.current.dispose();
      canvas.current = null;
    };
  }, []);

  const onObjectSelected = (event) => {
    setSelectedObjectIndex(
      event.selected[0].canvas.getObjects().indexOf(event.selected[0])
    );
  };

  const onSelectionCleared = () => {
    setSelectedObjectIndex(null);
  };
  const handleObjectSelect = (index) => {
    if (index === selectedObjectIndex) {
      return;
    }
    const canva = canvas.current;
    const objectList = canva.getObjects();
    if (index < objectList.length) {
      console.log("object", objectList);
      canva.setActiveObject(canva.item(index));
      setSelectedObjectIndex(index);
      canva.renderAll();
    }
  };

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
      setSelectedObj(e.target.kindOf);
      setFillColor(e.target.fill);
      setStrokeColor(e.target.stroke ? e.target.stroke : "#000000");
      setStroke(e.target.strokeWidth);
    });
    setObjectId(objectId + 1);
    setObjects([...objects, rect]);
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
      kindOf: "rect" + objectId,
    });
    circle.on("selected", (e) => {
      setSelectedObj(e.target.kindOf);
      setFillColor(e.target.fill);
      setStrokeColor(e.target.stroke ? e.target.stroke : "#000000");
      setStroke(e.target.strokeWidth);
    });
    setObjectId(objectId + 1);
    setObjects([...objects, circle]);
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
      activeObj.set("strokeWidth", Number(e.target.value));
      canvas.current.renderAll();
      // activeObj.set("padding", 0);
      setStroke(e.target.value);
    },
    [stroke]
  );
  const addText = () => {
    // Textbox
    let text = new fabric.IText("Text", {
      fontSize: 100,
      fontStyle: "normal",
      fontFamily: "Comic Sans",
      fontWeight: 900,
      underline: true,
      linethrough: true,
      overline: true,
      stroke: "#ff1318",
      strokeWith: 1,
      textAlign: "right",
      lineHeight: 20,
      textBackgroundColor: "rgb(0, 200, 0)",
      kindOf: "text" + objectId,
    });
    text.on("selected", (e) => {
      setSelectedObj(e.target.kindOf);
      setFillColor(e.target.fill);
      setStrokeColor(e.target.stroke ? e.target.stroke : "#000000");
      setStroke(e.target.strokeWidth);
      setTextBgColor(e.target.textBackgroundColor);
      setSelectedText({
        fontSize: e.target.fontSize,
        fontStyle: e.target.fontStyle,
        fontWeight: e.target.fontWeight,
        underline: e.target.underline,
        linethrough: e.target.linethrough,
        overline: e.target.overline,
        stroke: e.target.stroke,
        strokeWith: e.target.strokeWith,
        textAlign: e.target.textAlign,
        lineHeight: e.target.lineHeight,
        text: e.target.text,
      });
    });
    text.on("selected:cleared", (e) => {
      setSelectedText({ ...selectedText, text: "" });
    });
    setObjects([...objects, text]);
    canvas.current.add(text);
    canvas.current.renderAll();
  };
  const handleTextBgColorChange = useCallback(
    (color) => {
      if (canvas.current.getActiveObject()) {
        const activeObj = canvas.current.getActiveObject();
        activeObj.set("textBackgroundColor", color);
        canvas.current.renderAll();
        setTextBgColor(color);
      }
    },
    [strokeColor]
  );
  const handleText = (e) => {
    const { name, value } = e.target;
    const activeObj = canvas.current.getActiveObject();

    if (activeObj) {
      activeObj.set(name, value);

      canvas.current.renderAll();
      setSelectedText({ ...selectedText, [name]: value });
    }
  };
  const addShadow = () => {
    const activeObj = canvas.current.getActiveObject();
    if (activeObj) {
      activeObj.set("shadow", {
        blur: 15,
        offsetX: 0,
        offsetY: 0,
        skewY: 100,
        skewX: 100,
        skew: 100,
        opacity: 10,
      });
      setSelectedShadow({ blur: 15, offsetX: 20, offsetY: 20, opacity: 10 });
      canvas.current.renderAll();
    }
  };
  const deleteShadow = () => {
    const activeObj = canvas.current.getActiveObject();
    if (activeObj) {
      activeObj.set("shadow", null);
      canvas.current.renderAll();
    }
  };
  const handleShadow = (e) => {
    const { name, value } = e.target;
    const activeObj = canvas.current.getActiveObject();
    if (activeObj) {
      setSelectedShadow({ ...selectedShadow, [name]: value });
      activeObj.set("shadow", { ...selectedShadow, [name]: value });
      canvas.current.renderAll();
    }
  };
  return (
    <div className="App">
      <div>
        <ul>
          {objects.map((object, index) => (
            <li
              key={index}
              onClick={() => handleObjectSelect(index)}
              style={{
                fontWeight: index === selectedObjectIndex ? "bold" : "normal",
              }}
            >
              {`Object ${index + 1}`}
            </li>
          ))}
        </ul>
      </div>
      <canvas id="canvas" />
      <button onClick={addRect}>Add Rect</button>
      <button onClick={viewCanvas}>canvas data</button>
      <button onClick={addCircle}>Add Circle</button>
      <button onClick={addRect}>Add Rect</button>
      <button onClick={reduceWidth}>캔버스 가로 줄이기</button>
      <button onClick={increaseWidth}>캔버스 가로 늘이기</button>
      <button onClick={reduceHeight}>캔버스 세로 줄이기</button>
      <button onClick={increaseHeight}>캔버스 세로 늘이기</button>
      <button onClick={addText}>텍스트 추가</button>
      <div style={{ display: "flex" }}>
        <SketchPicker
          color={fillColor}
          onChange={(color) => handlefillColorChange(color.hex)}
        />
        <div>
          stroke 설정
          <SketchPicker
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
        <div style={{ display: "flex" }}>
          <p>글자 툴</p>
          <div>
            textBackgroundColor설정
            <SketchPicker
              color={textBgColor}
              onChange={(color) => handleTextBgColorChange(color.hex)}
            />
            폰트:
            <select
              name="fontFamily"
              onChange={handleText}
              value={selectedText.fontFamily}
            >
              {fontFamilyList.map((item) => {
                let selected = false;
                if (item === selectedText.fontFamily) selected = true;
                return (
                  <option
                    style={{ fontFamily: { item } }}
                    checked={selected}
                    value={item}
                  >
                    {item}
                  </option>
                );
              })}
            </select>
            <select
              name="fontStyle"
              onChange={handleText}
              value={selectedText.fontStyle}
            >
              {fontStyleList.map((item) => {
                return (
                  <option style={{ fontStyle: { item } }} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            글자:
            <input
              value={selectedText.text}
              name="text"
              onChange={handleText}
            />
            <p>fontWeight : {selectedText.fontWeight}px</p>
            <input
              type="range"
              min="100"
              max="900"
              name="fontWeight"
              value={selectedText.fontWeight}
              onChange={handleText}
            />
            <p>fontSize : {selectedText.fontSize}px</p>
            <input
              type="range"
              min="10"
              max="200"
              name="fontSize"
              value={selectedText.fontSize}
              onChange={handleText}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <p>그림자</p>
          <button onClick={addShadow}>추가하기</button>
          <button onClick={deleteShadow}>제거하기</button>
          <input
            type="range"
            min="10"
            max="100"
            name="blur"
            value={selectedShadow.blur}
            onChange={handleShadow}
          />
          <input
            type="range"
            min="-100"
            max="100"
            name="offsetX"
            value={selectedShadow.offsetX}
            onChange={handleShadow}
          />
          <input
            type="range"
            min="-100"
            max="100"
            name="offsetY"
            value={selectedShadow.offsetY}
            onChange={handleShadow}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
