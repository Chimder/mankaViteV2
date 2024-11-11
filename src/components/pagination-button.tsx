import { useNavigate, useParams } from 'react-router-dom'

export const PaginationButtons = ({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) => {
   const navigate = useNavigate();


  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      navigate(`/search?page=${page}`)
    }
  }

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          disabled={index + 1 === currentPage}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}
