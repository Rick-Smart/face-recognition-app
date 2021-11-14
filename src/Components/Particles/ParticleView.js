import React from "react";
import Particles from "react-particles-js";
import "./particles.css";

const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

function ParticleView() {
  return (
    <div>
      <Particles className="particles" params={particleOptions} />
    </div>
  );
}

export default ParticleView;
