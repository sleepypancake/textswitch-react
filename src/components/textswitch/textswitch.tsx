
import React, { createContext, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { multiswitch, multiswitchContainer, multiswitchSlide } from './textswitch.bem';
import { ChangeSwitcherType, SwitcherContextType, TextSwitchHandle, TextSwitchProps } from './textswitch.types';


export const TextSwitchContext = createContext<SwitcherContextType | null>(null);


const TextSwitchDefault: ForwardRefRenderFunction<TextSwitchHandle, TextSwitchProps> = ({ children }, ref) => {
  const [ selectedValue, setSelectedValue ] = useState('')

  const onChangeSwitcher: ChangeSwitcherType = (value) => (e) => {
    e.target.checked && setSelectedValue(value)
  }

  useImperativeHandle(
    ref,
    () => ({
      value: selectedValue,
      onChange: onChangeSwitcher,
      key: selectedValue
    }),
    [selectedValue]
  )

  /* 
  TODO: this part of code will be responsible for the animation. 
   I'm a little confused by this point, but I think I need to toggle the 
   slideRef position to link to the selected option.  
   But the question is how to implement the option reference if the number of options is unknown. 
   Maybe I can somehow pass prop through the context api 
  */

  const slideRef = useRef<HTMLAnchorElement>(null)

  // useEffect(() => {
  //   console.log(children, selectedValue)
  // }, [selectedValue, children])

  return (
    <TextSwitchContext.Provider value={{currentCheked: selectedValue, onChangeSwitcher}}>
      <fieldset className={multiswitch}>
        <div className={multiswitchContainer}>
          
          {children}
          <a className={multiswitchSlide} ref={slideRef} aria-hidden="true"></a>
        </div>
      </fieldset>
    </TextSwitchContext.Provider>
  )
}

export const TextSwitch = React.forwardRef(TextSwitchDefault)
