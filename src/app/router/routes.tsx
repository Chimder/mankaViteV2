import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Chapter from '../../pages/chapter'
import Home from '../../pages/home'
import SearchManga from '../../pages/search'
import Title from '../../pages/title/title'
import Layout from './layout'
import { PATH } from './path-constants'

export default function Routes() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: PATH.HOME,
          element: <Home />,
          // async lazy() {
          //   let { loader, Home } = await import('../../pages/home')
          //   return { loader: loader(queryClient), Component: Home }
          // },
        },
        {
          path: PATH.SEARCH,
          element: <SearchManga />,
          // async lazy() {
          //   let { loader, Streamer } = await import('../../pages/streamer')
          //   return { loader: loader(queryClient), Component: Streamer }
          // },
        },
        {
          path: PATH.TITLEID,
          element: <Title />,
          // async lazy() {
          //   let { loader, Streamer } = await import('../../pages/streamer')
          //   return { loader: loader(queryClient), Component: Streamer }
          // },
        },
        {
          path: PATH.CHAPTER,
          element: <Chapter />,
          // async lazy() {
          //   let { loader, Streamer } = await import('../../pages/streamer')
          //   return { loader: loader(queryClient), Component: Streamer }
          // },
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
