import React, { useState, useEffect } from "react";
import axios from "axios";


function QueryBox() {
    const [question,setQuestion] = useState("");
    const handleClick = (event) => {
        const newElement = document.createElement('div');
        newElement.textContent = question;
        document.getElementById('chatbox').appendChild(newElement);
        setQuestion("");

        const answer = document.createElement('div');
        answer.textContent = "calculating...";
        document.getElementById('chatbox').appendChild(answer);
        event.preventDefault();
    }
  return (
    <div>
      <div id="chatbox"></div>
      <form>
        <input
          type="text"
          placeholder="Question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></input>
        <button id="send" onClick={handleClick}>
          Send
        </button>
      </form>
    </div>
  );
}

export default QueryBox;
