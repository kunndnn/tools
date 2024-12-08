import Router from "./Router";
import { ThemeProvider } from "./Components/Common/ThemeContext";
const App = () => (
  <>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </>
);

export default App;
