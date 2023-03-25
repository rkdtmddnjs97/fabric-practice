import { fabric } from "fabric";

const initCanvas = (canvasSize) =>
  new fabric.Canvas("canvas", {
    height: canvasSize.height,
    width: canvasSize.width,
    backgroundColor: "pink",
    selection: false,
    renderOnAddRemove: true,
  });
export default initCanvas;
