import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import NoPage from "./Components/NoPage";
import Loader from "./Components/Loader";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/loader" element={<Loader />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
