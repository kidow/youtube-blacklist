import type { FC } from 'react'
import classnames from 'classnames'

export interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

const Switch: FC<Props> = ({ checked, onChange, disabled = false }) => {
  return (
    <label className="relative inline-block h-8 w-14">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="h-0 w-0 opacity-0"
        onChange={() => {}}
      />
      <span
        onClick={() => {
          if (!disabled) onChange(!checked)
        }}
        className={classnames(
          'absolute inset-0 rounded-2xl transition duration-300 before:absolute before:left-1.5 before:bottom-1 before:h-6 before:w-6 before:rounded-full before:bg-white before:transition before:duration-300 before:content-[""]',
          checked ? 'bg-blue-500 before:translate-x-5' : 'bg-neutral-400',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        )}
      />
    </label>
  )
}

export default Switch
