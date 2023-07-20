import { fabric } from "fabric";

const addRect = (params, selectFn, callback) => {
  let rect = new fabric.Rect({ ...params });
  rect.on("selected", selectFn);
  callback(ci);
};

export default addRect;
