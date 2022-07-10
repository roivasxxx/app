import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";
import { HashRouter, Outlet } from "react-router-dom";
import Router from "./routing/Router";

function App() {
  const [text, setText] = useState("init text");
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.electron.sendBack("returnData", (data) => setText(data));
  }, []);
  function handleClick(type) {
    if (type === 0) window.electron.get("getData", "sending data from React");
    else if (type === 1) {
      // window.electron.set([
      //   {
      //     action: "addNew",
      //     collection: "tasks",
      //     data: [{ date: new Date(), desc: "test" }],
      //   },
      // ]);
      // window.electron.set([
      //   {
      //     action: "update",
      //     collection: "tasks",
      //     data: [{ date: new Date(), desc: "testing update function", id: 3 }],
      //   },
      // ]);
      window.electron.set([
        {
          action: "delete",
          collection: "tasks",
          data: [5, 8],
        },
      ]);
    }
    //console.log("Return value in react: ", returnValue);
  }

  return (
    <HashRouter>
      <div className="App bg-gray-600 w-full h-full">
        <Router />
        <div className="flex">
          <h1 className="text-purple-700">Hello react</h1>
          <h1>Test</h1>
          <h1>Test2</h1>
          <button onClick={() => handleClick(0)}>Get data </button>
        </div>
        <label>
          Text:
          <input
            type="text"
            name="text"
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button onClick={() => handleClick(1)}>Write data </button>
        <h2>{JSON.stringify(text)}</h2>
      </div>
    </HashRouter>
  );
}

export default App;
