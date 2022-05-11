import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("init text");

  function handleClick() {
    window.electron.sendBack("returnData", (data) => setText(data));
    window.electron.get("getData", "sending data from React");
    //console.log("Return value in react: ", returnValue);
  }

  return (
    <div className="App">
      <div className="flex">
        <h1 className="text-purple-700">Hello react</h1>
        <h1>Test</h1>
        <h1>Test2</h1>¨<button onClick={() => handleClick()}>Press me </button>
      </div>
      <h2>{text}</h2>
    </div>
  );
}

export default App;
