import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import Skeleton from '../../components/ui/skeleton'
import { chapterApi } from '../../hooks/chapter'
import useAggregateChapter from '../../hooks/use-aggregate-chapter'
import s from './chapter.module.css'

function Chapter() {
  const router = useParams()
  const [searchParams] = useSearchParams()
  const lang = searchParams.get('lang')
  const manga = searchParams.get('manga')

  const navigate = useNavigate()
  // const lang = router.query?.lang as string
  // const manga = router.query?.manga as string
  const { aggregate, nextChapter } = useAggregateChapter()

  const { data: chapters, isFetching } = chapterApi.useMangaChapterByID(
    router?.id as string,
  )
  const [currentPage, setCurrentPage] = useState(() => ({
    page: 1,
    chapterId: router.id,
  }))
  const totalPages = chapters?.chapter?.data?.length || 0

  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const [imageLoaded, setImageLoaded] = useState<boolean[]>([])
  console.log('ImGLOAd', imageLoaded)

  useEffect(() => {
    if (chapters?.chapter?.data) {
      setImageLoaded(new Array(chapters.chapter.data.length).fill(false))
      // setImageLoaded([false])
    }
  }, [chapters?.chapter?.data, router.id])

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newImageLoaded = [...prev]
      newImageLoaded[index] = true
      return newImageLoaded
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const newChapterId = router.id
      if (newChapterId !== currentPage.chapterId) {
        setCurrentPage({ page: 1, chapterId: newChapterId })
        return
      }

      for (let i = 0; i < imageRefs.current.length; i++) {
        const imageRef = imageRefs.current[i]
        if (imageRef) {
          const rect = imageRef.getBoundingClientRect()
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setCurrentPage(prev => ({ ...prev, page: i + 1 }))
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage.chapterId, router.id, totalPages])
  console.log('NEXT chap', nextChapter)

  return (
    <div className={s.chap}>
      <p className={s.current}>
        Img {currentPage.page} / {totalPages}
      </p>
      {chapters?.chapter?.data?.map((chapter, index) => (
        <div
          className={s.chapImg}
          key={chapter}
          ref={el => {
            imageRefs.current[index] = el
          }}
        >
          {!imageLoaded[index] && (
            <Skeleton width={1200} height={1100} speed={'slow'} />
          )}
          <img
            // src={`http://localhost:8080/img/${chapters.baseUrl}/data/${chapters.chapter?.hash}/${chapter}`}

            src={`${import.meta.env.VITE_IMG_PROXY}/img/${chapters.baseUrl}/data/${chapters.chapter?.hash}/${chapter}`}
            loading="lazy"
            alt="Manga page"
            onLoad={() => handleImageLoad(index)}
          />
        </div>
      ))}
      {!isFetching && nextChapter ? (
        <Link
          className={s.navigateChapterBtn}
          to={`/chapter/${nextChapter?.id}?manga=${manga}&lang=${lang}`}
          style={{
            display: imageLoaded.some(loaded => loaded) ? 'flex' : 'none',
          }}
        >
          Next
        </Link>
      ) : (
        <Link
          className={s.navigateChapterBtn}
          style={{
            display: imageLoaded.some(loaded => loaded) ? 'flex' : 'none',
          }}
          to={`/title/${manga}`}
        >
          Return to Manga
        </Link>
      )}
    </div>
  )
}

export default Chapter
