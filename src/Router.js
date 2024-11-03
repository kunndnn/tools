import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import NoPage from "./Components/NoPage";
import React, { Suspense } from "react";

const Loader = React.lazy(() => import("./Components/Loader"));
const FileToBuffer = React.lazy(() => import("./Components/FileToBuffer"));
const BarCodeGenerator = React.lazy(() =>
  import("./Components/BarCodeGenerator")
);
const QRCodeGenerator = React.lazy(() =>
  import("./Components/QRCodeGenerator")
);
const TextToSpeech = React.lazy(() => import("./Components/TextToSpeech"));
const LiveCamera = React.lazy(() => import("./Components/LiveCamera"));
const ChatBot = React.lazy(() => import("./Components/ChatBot"));
const DropzoneComponent = React.lazy(() =>
  import("./Components/DropzoneComponent")
);

const Weather = React.lazy(() => import("./Components/Weather/Weather"));
function Router() {
  return (
    <HashRouter>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/loader"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Loader />
              </Suspense>
            }
          />
          <Route
            path="/file-to-buffer"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <FileToBuffer />
              </Suspense>
            }
          />
          <Route
            path="/bar-code"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <BarCodeGenerator />
              </Suspense>
            }
          />
          <Route
            path="/qr-code"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <QRCodeGenerator />
              </Suspense>
            }
          />
          <Route
            path="/text-to-speech"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <TextToSpeech />
              </Suspense>
            }
          />
          <Route
            path="/live-camera"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LiveCamera />
              </Suspense>
            }
          />
          <Route
            path="/drop-zone"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <DropzoneComponent />
              </Suspense>
            }
          />
          <Route
            path="/weather"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Weather />
              </Suspense>
            }
          />
          {/* <Route
              path="/chat-bot"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ChatBot />
                </Suspense>
              }
            /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      {/* </BrowserRouter> */}
    </HashRouter>
  );
}

export default Router;
