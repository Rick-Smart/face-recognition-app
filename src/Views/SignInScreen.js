import React from "react";
import ParticleView from "../Components/Particles/ParticleView";
import SignIn from "../Components/SignIn/SignIn";
import Register from "../Components/Register/Register";

function SignInScreen({ route, onRouteChange, loadUser }) {
  if (route === "signIn") {
    return (
      <div className="vh-100 dt w-100">
        <div className="dtc v-mid">
          <ParticleView />
          <SignIn
            route={route}
            onRouteChange={onRouteChange}
            loadUser={loadUser}
          />
        </div>
      </div>
    );
  } else if (route === "register") {
    return (
      <div className="vh-100 dt w-100">
        <div className="dtc v-mid">
          <ParticleView />
          <Register
            route={route}
            onRouteChange={onRouteChange}
            loadUser={loadUser}
          />
        </div>
      </div>
    );
  }
}

export default SignInScreen;
