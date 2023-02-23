
import React, { createContext, FC, ForwardRefRenderFunction, useEffect, useRef, useState } from 'react'
// import './textswitch.css'
import classnames from 'classnames'
import { ChangeSwitcherType, SwitcherContextType, TextSwitchProps } from './textswitch.types';
import { Option } from './textSwitchOption';


export const TextSwitchContext = createContext<SwitcherContextType | null>(null);


const TextSwitchDefault: ForwardRefRenderFunction<HTMLInputElement, TextSwitchProps> = ({ children }, ref) => {

  const [ selectedValue, setSelectedValue ] = useState('')

  const onChangeSwitcher: ChangeSwitcherType = (value) => (e) => {
    e.target.checked && setSelectedValue(value)
  }


  React.useImperativeHandle(
    ref,
    () => ({
      value: selectedValue,
      onChange: onChangeSwitcher,
      key: selectedValue
    }),
    [selectedValue]
  )

  return (
    <TextSwitchContext.Provider value={{currentCheked: selectedValue, onChangeSwitcher}}>
      <fieldset className="multiswitch">
        <div className = "slide-container ">
          
          {children}

          <a className="slide" aria-hidden="true"></a>
        </div>
      </fieldset>
    </TextSwitchContext.Provider>
  )
}

export const TextSwitch = React.forwardRef(TextSwitchDefault)
