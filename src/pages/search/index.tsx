import { Link, useParams, useSearchParams } from 'react-router-dom'

import { FilterManga } from '../../components/filter-bar/filter'
import { PaginationButtons } from '../../components/pagination-button'
import { queryClient } from '../../components/providers/tanstack-query'
import Button from '../../components/ui/button'
import Skeleton from '../../components/ui/skeleton'
import { mangaApi } from '../../hooks/manga'
import { useFilterStore } from '../../store/filter-slice'
import s from './search.module.css'

function SearchManga() {
  // const router = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page')
  const currentPage = Number(page) || 1

  const input = useFilterStore().input
  const tags = useFilterStore().tags
  const status = useFilterStore().status
  const sortBy = useFilterStore().sortBy
  const reset = useFilterStore().reset

  const { data: mangas, isFetching } = mangaApi.useMangaSearch({
    status,
    tags,
    name: input,
    offset: (currentPage - 1) * 34,
    sortBy: { type: sortBy?.type, order: sortBy?.order },
  })

  const Search = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await queryClient.resetQueries({
      queryKey: [mangaApi.baseKey],
    })
  }

  // const resetSearch = async () => {
  //   reset()
  //   await queryClient.resetQueries({
  //     queryKey: [mangaApi.baseKey],
  //   })
  // }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <ul className={s.list}>
          {isFetching
            ? Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  width={280}
                  height={330}
                  speed={'slow'}
                  key={index}
                ></Skeleton>
              ))
            : mangas?.data?.map(manga => (
                <Link
                  className={s.item}
                  to={`/title/${manga?.id}`}
                  key={manga?.id}
                >
                  <img
                    // src={`http://localhost:8080/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    // src={`${import.meta.env.VITE_IMG_PROXY}/img/mangadex.org/covers/${manga.id}/${manga.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    src={`${import.meta.env.VITE_IMG_PROXY}?url=https://mangadex.org/covers/${manga?.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`}
                    width={280}
                    height={310}
                    loading="lazy"
                    alt=""
                  />
                  <div className={s.title}>{manga.attributes?.title?.en}</div>
                </Link>
              ))}
        </ul>

        <div className={s.filterBar}>
          <div className={s.wrap}>
            <div className={s.searchBtn}>
              <Button onClick={e => Search(e)}>Search</Button>
            </div>
            <FilterManga />
          </div>
        </div>
      </div>

      <PaginationButtons
        currentPage={currentPage}
        totalPages={Math.ceil(Number(mangas?.total) / 8)}
      />
    </div>
  )
}

export default SearchManga
