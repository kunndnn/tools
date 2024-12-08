// import {  BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import NoPage from "./Components/NoPage";
import React, { Suspense, lazy } from "react";

const Loading = () => <div>Loading ...</div>;
const Loader = lazy(() => import("./Components/Loader"));
const FileToBuffer = lazy(() => import("./Components/FileToBuffer"));
const BarCodeGenerator = lazy(() => import("./Components/BarCodeGenerator"));
const QRCodeGenerator = lazy(() => import("./Components/QRCodeGenerator"));
const TextToSpeech = lazy(() => import("./Components/TextToSpeech"));
const LiveCamera = lazy(() => import("./Components/LiveCamera"));
// const ChatBot = lazy(() => import("./Components/ChatBot"));
const DropzoneComponent = lazy(() => import("./Components/DropzoneComponent"));
const Weather = lazy(() => import("./Components/Weather/Weather"));
const ImageConverter = lazy(() => import("./Components/ImageConverter"));
// const ImageEnhancer = lazy(() => import("./Components/ImageEnhancer"));
const PasswordGenerator = lazy(() => import("./Components/PasswordGenerator"));

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
  // {
  //   path: "/image-enhancer",
  //   component: <ImageEnhancer />,
  // },
  {
    path: "/password-generator",
    component: <PasswordGenerator />,
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
          {/* all the routes  */}
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
