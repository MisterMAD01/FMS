import React, { useState, useCallback, createContext } from "react";
import "./App.css";
import Login from "./Login";
import User from "./User";
export const AppContext = createContext(null);
function App() {
  const [username, setUsername] = useState("");
  return (
    <div className="App">
      <AppContext.Provider value={{ username, setUsername }}>
        <Login />
        <User />
      </AppContext.Provider>
    </div>
  );
}
export default App;
