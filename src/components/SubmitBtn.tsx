import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({label} : {label: string}) => {
   const navigation = useNavigation()
   const isSubmitting = navigation.state === 'submitting'
   return (
      <div className='mt-4'>
         <button type='submit' className='btn btn-primary btn-block'>
            {isSubmitting ? <div className="loading loading-ring loading-sm"></div>: label}
         </button>
      </div>
   )
}

export default SubmitBtn
