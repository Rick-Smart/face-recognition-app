import React, { useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import Logo from "../Components/Logo/Logo";
import ImageLinkForm from "../Components/ImageLinkFrom/ImageLinkForm";
import FaceRecognition from "../Components/FaceRecognition/FaceRecognition";
import Rank from "../Components/Rank/Rank";
import ParticleView from "../Components/Particles/ParticleView";
import Clarifai from "clarifai";
require("dotenv").config();

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API,
});

function HomeScreen({ onRouteChange, currentUser, setUser }) {
  const [hasImage, setHasImage] = useState(false);
  const [picUrl, setPicUrl] = useState();
  const [box, setBox] = useState({});
  const [image, setImage] = useState();
  const [noFace, setNoFace] = useState(true);

  function onInputChange(event) {
    setPicUrl(event.target.value);
  }

  function onSubmit() {
    setHasImage(true);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, picUrl)
      .then((response) => {
        if (response) {
          fetch("https://face-recognition-5000.herokuapp.com/image", {
            method: "put",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              id: currentUser.id,
            }),
          })
            .then((data) => data.json())
            .then((data) => {
              setUser({
                ...currentUser,
                entries: data,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
        const responseData =
          response.outputs[0].data.regions[0].region_info.bounding_box;

        displayFaceBox(calculateFaceLocation(responseData));
      })
      .catch((err) => {
        console.log(err);
        setHasImage(false);
        setNoFace(false);
      });
  }

  function calculateFaceLocation(data) {
    const width = image.current.width;
    const height = image.current.height;

    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - data.right_col * width,
      bottomRow: height - data.bottom_row * height,
    };
  }

  function displayFaceBox(boxData) {
    setBox(boxData);
  }

  return (
    <div>
      <ParticleView />
      <Navigation onRouteChange={onRouteChange} />
      <Rank currentUser={currentUser} />
      <Logo />
      <ImageLinkForm onInputChanged={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition
        hasImage={hasImage}
        url={picUrl}
        setImage={setImage}
        box={box}
        noFace={noFace}
      />
    </div>
  );
}

export default HomeScreen;
