import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import NoPage from "./Components/NoPage";
import Loader from "./Components/Loader";
import FileToBuffer from "./Components/FileToBuffer";
import BarCodeGenerator from "./Components/BarCodeGenerator";
import QRCodeGenerator from "./Components/QRCodeGenerator";
import TextToSpeech from "./Components/TextToSpeech";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/loader" element={<Loader />} />
          <Route path="/file-to-buffer" element={<FileToBuffer />} />
          <Route path="/bar-code" element={<BarCodeGenerator />} />
          <Route path="/qr-code" element={<QRCodeGenerator />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;