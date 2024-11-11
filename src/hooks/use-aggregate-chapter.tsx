import { useParams, useSearchParams } from 'react-router-dom'

import { chapterApi } from './chapter'

const useAggregateChapter = () => {
  const router = useParams()
  const [searchParams] = useSearchParams()
  const lang = searchParams.get('lang') as string
  const manga = searchParams.get('manga') as string
  console.log('AGGREROUTER', router)
  // const lang = router.query?.lang as string
  // const manga = router.query?.manga as string

  const { data: aggregate } = chapterApi.useMangaAggregate(manga, lang)

  const flatAggregate = Object.values(aggregate?.volumes || {})
    .map(volume => Object.values(volume.chapters || {}))
    .reduce((acc, chapters) => acc.concat(chapters), [])

  const currentChapterIndex = flatAggregate.findIndex(
    chap => chap.id === router.id,
  )

  // const prewChapter =
  //   currentChapterIndex > 0 ? flatAggregate[currentChapterIndex - 1] : undefined

  const nextChapter =
    currentChapterIndex < flatAggregate.length - 1
      ? flatAggregate[currentChapterIndex + 1]
      : undefined

  return { aggregate, nextChapter }
}

export default useAggregateChapter
