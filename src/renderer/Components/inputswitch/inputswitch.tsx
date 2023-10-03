import React, { ChangeEvent } from 'react';

import "./inputswitch.scss";

function InputSwitch(props:{value:boolean, onChange?:(e:ChangeEvent)=>void, id?:string,
    className?:string, disabled?:boolean, style?:{[key:string]: string}}) {

  return (
    <label className={props.className}>
      <input type="checkbox" value={props.value} onChange={props.onChange} id={props.id}
      className={props.className} disabled={props.disabled} style={props.style} />
      <span className="r-inputswitch-slider"/>
    </label>
  );
};

InputSwitch.defaultProps = {
  disabled: false,
  value: false,
  className: 'r-inputswitch'
};

export default InputSwitch;
