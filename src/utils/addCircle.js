import { fabric } from "fabric";

const addCircle = (params, selectFn, callback) => {
  let circle = new fabric.Circle({ ...params });
  circle.on("selected", selectFn);
  callback(ci);
};

export default addCircle;
