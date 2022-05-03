import { Pwgen } from '@/components/Pwgen'

export default function App () {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Pwgen
          </a>
        </div>
      </nav>
      <main className="container-pwgen mt-5">
        <Pwgen />
      </main>
    </>
  )
}