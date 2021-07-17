import { ToastContainer } from "react-toastify"
import CombineContext from "./context/CombineContext"
import AppRouter from "./routes/AppRouter"

const App = () => {
  return (
    <>
      <CombineContext>
        <AppRouter />
      </CombineContext>
      <ToastContainer />
    </>
  );
}

export default App;
