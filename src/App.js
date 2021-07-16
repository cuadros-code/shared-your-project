import CombineContext from "./context/CombineContext"
import AppRouter from "./routes/AppRouter"

const App = () => {
  return (
    <>
      <CombineContext>
        <AppRouter />
      </CombineContext>
    </>
  );
}

export default App;
