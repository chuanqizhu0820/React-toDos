import React from "react";
import ReactDom from "react-dom";
import TodoContainer from "./components/TodoContainer";
import "./app.css"

ReactDom.render(
<TodoContainer />
, document.querySelector("#root"))