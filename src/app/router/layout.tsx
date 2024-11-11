import { Link, Outlet } from 'react-router-dom'


export default function Layout() {
  return (
    <>
      <div>
        <Link to={`/search`}>Find Manga</Link>
      </div>
      <div></div>
      <main>
        <Outlet />
      </main>
    </>
  )
}
