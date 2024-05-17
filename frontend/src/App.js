import { Outlet } from "react-router-dom";
import "./App.css";
import { Container, Typography } from "@mui/material";
import Header1 from "./components/header/Header1";
import Footer from "./components/footer/Footer";
import Header2 from "./components/header/Header2";

function App() {
  return (
    <>
      <Header1 />
      <Header2 />
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;
