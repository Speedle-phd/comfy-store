type TFromInputProps = {
   label: string
   name: string
   type: string
   defaultValue?: string
}

const FormInput = ({ label, name, type, defaultValue } : TFromInputProps) => {
   return (
      <div className='form-control '>
         <label className='label'>
            <span className='label-text capitalize'>{label}</span>
         </label>
         <input
            type={type}
            name={name}
            defaultValue={defaultValue}
            className='input input-bordered '
         />
      </div>
   )
}
export default FormInput
