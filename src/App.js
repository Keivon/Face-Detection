import React from 'react';
import Webcam from "react-webcam";
import './App.css';

function App() {

  const webcamRef = React.useRef(null);
   
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  
   
  
    
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    
  
    return (
      <div className="App">
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={720}
          videoConstraints={videoConstraints}
        />
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



