import * as React from "react";
import * as ReactDOM from "react-dom";

const App = () => {
    return <div>mafia</div>
};

const div = document.createElement("div");
document.body.appendChild(div);

console.log(React);

window.onload = () => {
    ReactDOM.render(<App></App>, div);
}