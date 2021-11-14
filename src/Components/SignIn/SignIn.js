import React, { useRef, useState } from "react";

function SignIn({ onRouteChange, loadUser }) {
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  function onSignIn() {
    setLoading(true);

    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user !== "No user found") {
          loadUser(user);
          emailRef.current.value = "";
          passwordRef.current.value = "";
          setLoading(false);
          onRouteChange("Home");
        } else {
          setLoading(false);
        }
      });
  }

  return (
    <div>
      <article className="br3 ba b--white-20 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
              <div className="mt3">
                <label
                  className="white b db fw6 lh-copy f6"
                  htmlFor="email-address"
                >
                  Email
                </label>
                <input
                  autoFocus
                  placeholder="email"
                  className="pa2 br3 input-reset ba bg-transparent hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="current-email"
                  ref={emailRef}
                />
              </div>
              <div className="mv3">
                <label className="b white db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  placeholder="pasword"
                  className="br3 pa2 input-reset ba bg-transparent hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  ref={passwordRef}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="white br3 b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                disabled={loading}
                type="submit"
                value="Sign In"
                data="Home"
                onClick={() => onSignIn()}
              />
            </div>
            <div className="lh-copy mt3">
              <a
                onClick={() => onRouteChange("register")}
                href="#0"
                className="br3 white f6 link dim black db"
              >
                Register
              </a>
            </div>
          </div>
        </main>
      </article>
    </div>
  );
}

export default SignIn;
