import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


// import React from "react";
// import ReactDOM from "react-dom";
// import { ApolloProvider } from "@apollo/client";
// import client from "./api/apollo-client";
// import App from "./App";
//
// ReactDOM.render(
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>,
//     document.getElementById("root")
// );