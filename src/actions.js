import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import * as mobilenetModule from "@tensorflow-models/mobilenet";



let KNN = null;
let MBNET = null;
let CAMERA = null;
let TOPK = 10;
let train;
export let output = "";

export const loadmodels = () => {
    return async (dispatch) => {
        dispatch({
          type: "LOADMODELS",
        });
    KNN = knnClassifier.create();
    MBNET = await mobilenetModule.load();
    let videoElement = document.getElementById("webcam");
    CAMERA = await tf.data.webcam(videoElement);
  }
} 



export function run() {

    return async (dispatch) => {
        dispatch({
          type: "RUN",
        });

    setInterval(async () => {

        const image = await CAMERA.capture();
        let logits = MBNET.infer(image, "conv_preds");
        const res = await KNN.predictClass(logits, TOPK);
        console.log(res);
        // Will display the match image/text
        dispatch({
            type: "UPDATE_LABEL",
            payload:res.label ,
          });
        // Delete memory
        image.dispose();
        if (logits != null) {
          logits.dispose();
        }
        
    }, 100)
  }
}

  export const Training = (text) => {
    return async (dispatch) => {
        dispatch({
          type: "START_TRAINING",
        });
    train = setInterval(async () => {
    const image = await CAMERA.capture();
    const logits = MBNET.infer(image, "conv_preds");
    KNN.addExample(logits, text);
    // Delete memory
    image.dispose();
    if (logits != null) {
      logits.dispose();
    }
  }, 200);
}
  }

export const StopTraining = () => {
    return async (dispatch) => {
        dispatch({
          type: "STOP_TRAINING",
        });
  clearTimeout(train);
}
}