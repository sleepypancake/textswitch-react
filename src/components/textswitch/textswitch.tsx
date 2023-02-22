// import './textswitch.css'
import { FC, HTMLAttributes } from 'react'
import classnames from 'classnames'
import React from 'react'

export interface TextSwitchProps extends HTMLAttributes<HTMLButtonElement> {
  label1?: string
  label2?: string,
  key1?: string,
  key2?: string,
  initialState?: boolean
}

const TextSwitchDefault: FC<TextSwitchProps> = ({ label1, label2, key1, key2, initialState = false }, ref) => {
  let [checked, setChecked] = React.useState(initialState);
  let sw = classnames({
    switch: true
  })
  let inp = classnames({
    input: true,
    'input:checked': true,
    'input:focus': true
  })
  let slider = classnames({
    slider: true,
    round: true
  })

  let myRef = React.useRef<HTMLInputElement | null>(null)
  React.useEffect(() => {
    if (myRef.current) {
      myRef.current.onclick = (e) => {
        e.target && setChecked(e.target?.checked)
      }
    }

  }, [myRef])

  React.useImperativeHandle(
    ref,
    () => ({
      value: () => myRef.current?.checked ? label2 : label1,
      onChange: (lambda) => myRef.current.onchange = lambda,
      key: () => myRef.current?.checked ? key2 : key1
    }),
    [myRef]
  )

  return (
    <label className={sw}>
      <input className={inp} defaultChecked={checked} type='checkbox' ref={myRef} />
      <span className={slider} placeholder={label2 || 'Buy'} data-value={label1 || 'Sell'}>
        <div>{label1 || 'Sell'}</div>
        <div>{label2 || 'Buy'}</div>
      </span>
    </label>
  )
}

export const TextSwitch = React.forwardRef(TextSwitchDefault)
