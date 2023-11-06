import { useRef } from 'react'
import { cn } from '../utility/utility'

const Steps = () => {
   const stepRef = useRef<HTMLUListElement>(null)
   const handleClick = () => {
      const children = [...stepRef.current!.children]
      console.log(children)
      for (const child of children) {
         if (child.className.includes('step-primary')) {
            continue
         } else {
            child.classList.add('step-primary')
            return
         }
      }
   }
   const handleClick2 = () => {
      const children = [...stepRef.current!.children].reverse()
      console.log(children)
      for (const child of children) {
         if (child.className.includes('step-primary')) {
            child.classList.remove('step-primary')
            return
         }
      }
   }
   return (
      <div className='flex flex-col gap-8'>
         <ul ref={stepRef} className='steps steps-horizontal'>
            <li
               className={cn(
                  'step step-primary',
                  stepRef.current?.children[0].className.includes(
                     'step-primary'
                  )
                     ? 'text-teal-700'
                     : null
               )}
            >
               Register
            </li>
            <li
               className={cn(
                  'step step-primary',
                  stepRef.current?.children[1].className.includes(
                     'step-primary'
                  )
                     ? 'text-teal-700'
                     : null
               )}
            >
               Choose plan
            </li>
            <li
               className={cn(
                  'step',
                  stepRef.current?.children[2].className.includes(
                     'step-primary'
                  )
                     ? 'text-teal-700'
                     : null
               )}
            >
               Purchase
            </li>
            <li
               className={cn(
                  'step',
                  stepRef.current?.children[3].className.includes(
                     'step-primary'
                  )
                     ? 'text-teal-700'
                     : null
               )}
            >
               Receive Product
            </li>
         </ul>
         <button onClick={handleClick}>Step forward</button>
         <button onClick={handleClick2}>Step backwards</button>
      </div>
   )
}

export default Steps
