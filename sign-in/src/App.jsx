import React from "react";

import Signup from "./component/sign-up";
import Login from "./component/login";


function App() {
  return (
    <div>
      <h1>Welcome to the Last Leaf English Center</h1>
      <div className="form-wrap">
        <div class="tabs-content">
          <Signup />
          <Login />
        </div>
      </div>
    </div>
  );
}

export default App;