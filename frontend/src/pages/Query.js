import React, { useState } from "react";
import axios from "axios";

function QueryBox() {
  const sendMessage = () => {
    const newMessageBox = document.createElement("div");
    const newMessage = document.createTextNode("Hi");
    const chatbox = document.getElementById("chatbox")

    newMessageBox.appendChild(newMessage);
    chatbox.appendChild(newMessageBox)
  };
  return (
    <div>
      <div id="chatbox"></div>
      <button id="send" onClick={sendMessage}>Send</button>
    </div>
  );
}

export default QueryBox;
