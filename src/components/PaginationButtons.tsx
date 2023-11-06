type TPaginationButtonProps = {
   handlePageChange: (p: number) => void
   pageState: number
   hasMore?: boolean
   hasLess?: boolean
   pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
   }
}

const PaginationButtons = ({
   pagination,
   hasMore,
   hasLess,
   handlePageChange,
   pageState,
}: TPaginationButtonProps) => {
   console.log(pagination, hasMore, hasLess)
   const buttonArray = Array.from(
      { length: pagination?.pageCount ?? 0 },
      (_, index) => {
         return index + 1
      }
   )
   return (
      <div className='mt-8 p-8 flex justify-center items-center join'>
         <button
            className='join-item btn'
            disabled={!hasLess}
            onClick={() => {
               const newPage = pageState - 1
               handlePageChange(newPage)
            }}
         >
            Previous
         </button>
         {buttonArray.map((el, index) => {
            return (
               <button onClick={() => handlePageChange(el)} disabled={pagination?.page === el} className="join-item btn" key={index}>{el}</button>
            )
         })}
         <button
            className='join-item btn'
            disabled={!hasMore}
            onClick={() => {
               const newPage = pageState === 0 ? pageState + 2 : pageState + 1
               handlePageChange(newPage)
            }}
         >
            Next
         </button>
      </div>
   )
}

export default PaginationButtons
