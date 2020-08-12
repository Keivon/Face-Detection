import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadmodels, run, Training, StopTraining } from "./actions"
import Webcam from "react-webcam";

import "./App.css";

function App() {

  const dispatch = useDispatch();
  const {output}  = useSelector((state) => state.output);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };


  const [flag, setFlag] = useState(0);
  const [start, setStart] = useState(false);
  const [counter, setCounter] = useState(5);
  const [label, setLabel] = useState("Right");



  useEffect(() => {
    dispatch(loadmodels())
  }, [dispatch]);




  useEffect(() => {
    if (start) {

      if (counter === 5) {
        dispatch(Training(label))
      }
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

      if (counter < 1 && flag === 1) {
        dispatch(StopTraining());
        dispatch(run())
      }

      if (counter < 1 && flag === 0) {
        dispatch(StopTraining());
        setLabel("Left");
        setCounter(5);
        setFlag(flag + 1);
      }
      
    }
  }, [start, counter, flag, label, dispatch ]);


  



  return (

    <div className="App">
      <Webcam
          audio={false}
          id= "webcam"
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="video"
        />


      <div className="overlay">
        <div className="text">{counter > 0 && counter}</div>
      </div>
      <button onClick={() => { setStart(true) }}>Start</button>

      <label>{output}</label>
    </div>

  );

}

export default App;



