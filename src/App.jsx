import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserNewForm from "./Components/UserNewForm"

import Edit from "./Pages/Edit";
import FourOFour from "./Pages/FourOFour";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import New from "./Pages/New";
import Show from "./Pages/Show";


import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Index />} />
          <Route path="/users/new" element={<New />} />
          <Route exact path="/users/:id" element={<Show />} />
          <Route path="/users/:id/edit" element={<Edit />} />
          <Route path="/signup" element={<UserNewForm />} /> 
          {/* <Route path="/login" element={<LoginForm />} /> */}
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </main>
    </Router>
  </div>
  )
}

export default App
