import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Backdrop = () => {
  return <div className="backdrop" />;
};

const Overlay = (props) => {
  return <div className="overlay">{props.children}</div>;
};

const Modal = (props) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop />
      <Overlay>{props.children}</Overlay>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
