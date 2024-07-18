import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoute from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRealtime from "./assets/useRealtime";

function App() {
  useRealtime((data) => {
    console.log(data);
  });

  return (
    <div className="inter-div">
      <ToastContainer />
      <AppRoute />
    </div>
  );
}

export default App;
