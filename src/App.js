import React, {useEffect, useState} from "react";
import Webcam from "react-webcam";
import "./App.css";

function App() {

 
  const webcamRef = React.useRef(null);
 
   
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

    
    const [imgSrc, setImgSrc] = useState(null);
    const [start, setStart] = useState(false);
    const [counter, setCounter] = useState(10);
    
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);  

    useEffect(() => {
      if(start) {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }

    }, [start, counter]);
  
    return (
      
      <div className="App">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="video"
        />
        <div className="overlay">
        <div className="text">{counter}</div>
        </div>
        <button onClick={()=>{setStart(true)}}>Start</button>
       <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <img
          src={imgSrc}
          alt=""
        />
      )}
        </div>
        
    );
  
}

export default App;



