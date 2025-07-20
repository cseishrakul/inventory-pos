import { BrowserRouter as Router } from "react-router";
import { useEffect, useState } from "react";
import { ScrollToTop } from "./components/common/ScrollToTop";
import PublicRouter from "./router/PublicRouter";
import ProtectedRouter from "./router/ProtectedRouter";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (localStorage.token != undefined) {
      setAuth(true);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {auth ?   <ProtectedRouter /> : <PublicRouter />}
    </Router>
  );
}

export default App;
