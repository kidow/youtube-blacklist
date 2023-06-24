import {} from 'react'
import type { FC } from 'react'
import classnames from 'classnames'

export interface Props {
  text: string
  onClick?: () => void
  theme?: 'outlined' | 'contained'
}
interface State {}

const Button: FC<Props> = ({ text, onClick, theme }) => {
  return (
    <button
      type="button"
      className={classnames(
        'cursor-pointer rounded-md border-none py-2 px-4 duration-150 hover:ring hover:ring-blue-500/70',
        {
          'bg-transparent text-blue-500': theme === 'outlined',
          'bg-blue-500 text-neutral-50': theme === 'contained'
        }
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
