import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
