import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppContext from "./AppContext";

function Index() {
  const [isNewOrder, setIsNewOrder] = useState(false);

  return (
    <AppContext.Provider value={{ isNewOrder, setIsNewOrder }}>
      <App />
    </AppContext.Provider>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
