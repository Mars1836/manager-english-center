import React from "react";

import Signup from "./component/sign-up";
import Login from "./component/login";

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the "active" class from all tab links
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the selected tab content and add the "active" class to the clicked tab link
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

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