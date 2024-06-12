import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import AppRoute from "./routes/AppRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="inter-div">
      <ToastContainer />
      <AppRoute />
    </div>
  );
}

export default App;
