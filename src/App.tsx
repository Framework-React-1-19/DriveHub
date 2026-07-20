import { BrowserRouter, Routes, Route} from 'react-router-dom'; //https://www.w3schools.com/React/react_router.asp
import Drivehub from './home/Drivehub'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Drivehub />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
