import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import FormBasic from './components/pages/Forms/FormBasic';
import FormRHFEvolved from './components/pages/Forms/FormRHFEvolved';
import FormRHF from './components/pages/Forms/FormRHF';

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
  );
}

export default App;
