import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import NoPage from "./Components/NoPage";
import React, { Suspense } from "react";

const Loading = () => <div>Loading ...</div>;
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
const ImageConverter = React.lazy(() => import("./Components/ImageConverter"));

const routesArray = [
  {
    path: "/loader",
    component: <Loader />,
  },
  {
    path: "/file-to-buffer",
    component: <FileToBuffer />,
  },
  {
    path: "/bar-code",
    component: <BarCodeGenerator />,
  },
  {
    path: "/qr-code",
    component: <QRCodeGenerator />,
  },
  {
    path: "/text-to-speech",
    component: <TextToSpeech />,
  },
  {
    path: "/live-camera",
    component: <LiveCamera />,
  },
  {
    path: "/drop-zone",
    component: <DropzoneComponent />,
  },
  {
    path: "/weather",
    component: <Weather />,
  },
  {
    path: "/image-converter",
    component: <ImageConverter />,
  },
];

const routes = routesArray.map(({ path, component }) => (
  <Route
    path={path}
    element={<Suspense fallback={<Loading />}>{component}</Suspense>}
  />
));
function Router() {
  return (
    <HashRouter>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes}
          {/* <Route
              path="/chat-bot"
              element={
                <Suspense fallback={<Loading/>}>
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
