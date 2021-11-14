import React, { useRef, useEffect } from "react";
import "./faceRecognition.css";

function FaceRecognition({ hasImage, url, setImage, box, noFace }) {
  const imgRef = useRef();

  useEffect(() => {
    setImage(imgRef);
  });

  return (
    <>
      <div
        style={{ display: !hasImage ? "none" : "flex" }}
        className="center ma"
      >
        <div className="absolute mt2">
          <img src={url} alt="" width="500px" height="auto" ref={imgRef} />
          <div
            className="bounding-box"
            style={{
              display: !hasImage ? "none" : "block",
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        </div>
      </div>
      <div className="center white" style={{ display: noFace ? "none" : "flex" }}>
        <h2>{"No human faces detected"}</h2>
      </div>
    </>
  );
}

export default FaceRecognition;
