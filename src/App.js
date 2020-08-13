import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadmodels, Run, Training, StopTraining, StopRun } from "./actions"
import useSound from 'use-sound';
import Webcam from "react-webcam";
import soundUrl from './sounds/rising-pops.mp3'

import "./App.css";

function App() {

  const dispatch = useDispatch();
  const { output, isLoading } = useSelector((state) => state.output);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const [instructions, setinstructions] = useState("Move your head to the right");
  const [flag, setFlag] = useState(0);
  const [start, setStart] = useState(false);
  const [counter, setCounter] = useState(5);
  const [view, setView] = useState(false);
  const [label, setLabel] = useState("Right");


  const [play] = useSound(
    soundUrl,
    { volume: 0.5 }
  );

  const Reset = () => {
    setStart(false);
    setView(false);
    dispatch(StopRun());
    setLabel("Right");
    setCounter(5);
    setFlag(0);
    setinstructions("Move your head to the Right")

  }

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
        setView(false);
        dispatch(Run());
      }

      if (counter < 1 && flag === 0) {
        dispatch(StopTraining());
        play();
        setLabel("Left");
        setinstructions("Move your head to the Left")
        setCounter(5);
        setFlag(flag + 1);
      }

    }
  }, [start, counter, flag, label, dispatch, play]);






  return (


    <div className="App" >
      <div id="loader" style={isLoading ? {} : { display: "none" }}></div>
      <Webcam
        audio={false}
        id="webcam"
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="animate-bottom"
        style={isLoading ? { display: "none" } : {}}
      />
      <div className="overlay">
        <div className="CountN">{view && counter}</div>
        <h3 >{view && instructions}</h3>
        <h2>{!view && output}</h2>
      </div>
      <div style={isLoading ? { display: "none" } : {}} >
        <span>
          <button className="btn" onClick={() => {
            setStart(true);
            setView(true);
          }}>Start</button>
        </span>
        <span>
          <button className="btn" onClick={() => Reset()}>Reset</button>
        </span>
      </div>
    </div>

  );

}

export default App;



