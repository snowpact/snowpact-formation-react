import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/pages/Home'
import FormBasic from './components/pages/FormBasic'
import FormRHFEvolved from './components/pages/FormRHFEvolved'
import FormRHF from './components/pages/FormRHF'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/basic" element={<FormBasic />} />
        <Route path="/form/rhf" element={<FormRHF />} />
        <Route path="/form/rhf-evolved" element={<FormRHFEvolved />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
