import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Start from "./pages/Start"
import { lazy, Suspense } from "react"
import Loader from "./components/Loader"

const Game = lazy(() => import("./pages/Game"))

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/game" element={
            <Suspense fallback={<Loader />}>
              <Game />
            </Suspense>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
