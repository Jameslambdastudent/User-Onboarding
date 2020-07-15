import React from "react";

 function Input(props) {
  const errorMessage = props.errors[props.name];
  return (
    <label htmlFor="name">
      {props.label}
      <input {...props} />
     
    </label>
  )
 }
 export default Input
