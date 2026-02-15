// import {  BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import NoPage from "./Components/NoPage";
import { Suspense, lazy } from "react";

const Loading = () => <div>Loading ...</div>;
const Loader = lazy(() => import("./Components/Loader")),
  FileToBuffer = lazy(() => import("./Components/FileToBuffer")),
  BarCodeGenerator = lazy(() => import("./Components/BarCodeGenerator")),
  QRCodeGenerator = lazy(() => import("./Components/QRCodeGenerator")),
  TextToSpeech = lazy(() => import("./Components/TextToSpeech")),
  LiveCamera = lazy(() => import("./Components/LiveCamera")),
  ChatBot = lazy(() => import("./Components/ChatBot")),
  DropzoneComponent = lazy(() => import("./Components/DropzoneComponent")),
  Weather = lazy(() => import("./Components/Weather/Weather")),
  ImageConverter = lazy(() => import("./Components/ImageConverter")),
  ImageEnhancer = lazy(() => import("./Components/ImageEnhancer")),
  PasswordGenerator = lazy(() => import("./Components/PasswordGenerator")),
  Quote = lazy(() => import("./Components/Quote")),
  MarkdownPreviewer = lazy(() => import("./Components/Markdown")),
  TexttoImage = lazy(() => import("./Components/TexttoImage")),
  SMTP = lazy(() => import("./Components/SMTP")),
  Home = lazy(() => import("./Components/Home")),
  SpeechToText = lazy(() => import("./Components/SpeechToText")),
  HTMLViewer = lazy(() => import("./Components/HTMLViewer"));
const routesArray = [
  {
    path: "/loader",
    component: <Loader />,
  },
  {
    path: "/",
    component: <Home />,
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
  {
    path: "/image-enhancer",
    component: <ImageEnhancer />,
  },
  {
    path: "/password-generator",
    component: <PasswordGenerator />,
  },
  {
    path: "/quote",
    component: <Quote />,
  },
  {
    path: "/markdown-editor",
    component: <MarkdownPreviewer />,
  },
  {
    path: "/text-to-image",
    component: <TexttoImage />,
  },
  {
    path: "/chat-bot",
    component: <ChatBot />,
  },
  {
    path: "/smtp-test",
    component: <SMTP />,
  },
  {
    path: "/speech-to-text",
    component: <SpeechToText />,
  },
  {
    path: "/html-viewer",
    component: <HTMLViewer />,
  },
];

const routes = routesArray.map(({ path, component }) => (
  <Route
    path={path}
    key={Date.now().toString()}
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
              <Suspense fallback={<Loading />}>
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
