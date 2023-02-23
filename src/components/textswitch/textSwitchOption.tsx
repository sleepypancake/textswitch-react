
import React, { FC } from 'react'
import classnames from 'classnames'
import { TextSwitchContext } from './textswitch'
import { SwitcherContextType } from './textswitch.types'
import { useCheckIsNullableContext } from '@/hooks/useCheckIsNullableContext'

type textSwitchOptionProps = {
    value: string
    children: string
}

const TextSwitchOption: FC< textSwitchOptionProps> = ({ value, children }) => {
    
    const switcherContext = useCheckIsNullableContext<SwitcherContextType>(TextSwitchContext);


    return (
      <>
        <input 
            type="radio" 
            name="textSelectOption" 
            id={value}
            checked={switcherContext.currentCheked === value}
            onChange={switcherContext.onChangeSwitcher(value)}
        />
    
        <label htmlFor={value}>{children}</label>
      </>
    )
};

export const Option = TextSwitchOption