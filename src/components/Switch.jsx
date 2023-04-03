import React from 'react'
import Switch from "react-switch";

function CustomSwitch(props) {

  return (
    <Switch height={22} handleDiameter={15} onChange={props.handleChange} checked={props.checked}  disabled={props.disabled}/>
  )
}

export default CustomSwitch