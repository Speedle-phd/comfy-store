type TRadioColorButtonsProps = {
   checked: boolean
   color: string
} & React.HTMLAttributes<HTMLElement>

const RadioColorButtons = ({ checked, color, className, ...props }: TRadioColorButtonsProps) => {
   return (
      <input
         style={{ backgroundColor: color }}
         type='radio'
         name={`radio-2`}
         className={className}
         defaultChecked={checked}
         {...props}
      />
   )
}

export default RadioColorButtons
