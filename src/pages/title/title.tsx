import { Link, useParams, useSearchParams } from 'react-router-dom'

import { feedApi } from '../../hooks/feeds'
import s from './title.module.css'

function Title() {
  const path = useParams()
  // const [searchParams] = useSearchParams()
  // const id = searchParams.get('page')
  const { data: chapters } = feedApi.useMangaFeed(path.id as string)
  // const setChapterLang = useChapterStore().setChapterLanguage

  console.log('LIAST', chapters)
  return (
    <div className={s.constainer}>
      <div className={s.list}>
        {chapters?.data?.map(chapter => (
          <Link
            to={
              chapter.attributes?.externalUrl ??
              `/chapter/${chapter.id}?manga=${path.id}&lang=${chapter.attributes?.translatedLanguage}`
            }
            key={chapter.id}
          >
            <div>chapter :{chapter.id}</div>
            <div>& :{chapter.attributes?.chapter}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Title
