import React from "react";

function Rank({ currentUser }) {
  return (
    <div>
      <div className="white f3">{`${currentUser.name}, your curent rank is...`}</div>
      <div className="white f3">{currentUser.entries}</div>
    </div>
  );
}

export default Rank;
