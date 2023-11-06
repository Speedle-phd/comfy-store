type TFormElementSelectProps = {
   optionArray?: string[]
   name: string
   title: string
}

const FormElementSelect = ({ optionArray = [], name, title }: TFormElementSelectProps) => {
   return (
      <div className='form-control'>
         <label htmlFor={name} className='label font-semibold capitalize'>
            {title}
         </label>
         <select
            name={name}
            className='select select-bordered border-secondary-focus'
         >
            {optionArray?.map((el, index) => {
               return (
                  <option key={index} value={el}>
                     {el}
                  </option>
               )
            })}
         </select>
      </div>
   )
}

export default FormElementSelect
