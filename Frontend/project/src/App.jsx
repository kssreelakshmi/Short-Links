import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import UserWrapper from './components/User/UserWrapper';
function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path="/*" element={<UserWrapper />} />
      {/* <Route path="/admin/*" element={<AdminWrapper />} /> */}
      </Routes>
    </Router>
    </>
  )
}

export default App
