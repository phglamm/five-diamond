import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoute from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRealtime from "./assets/useRealtime";
import ScrollToTop from "./routes/ScrollToTop";

function App() {
  useRealtime((data) => {
    // console.log(data);
  });

  return (
    <div className="inter-div">
      <ToastContainer />
      <ScrollToTop>
        <AppRoute />
      </ScrollToTop>
    </div>
  );
}

export default App;
