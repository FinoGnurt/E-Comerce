import { Outlet } from "react-router-dom";
import "./App.css";
import { Container, Typography } from "@mui/material";
import Header1 from "./components/header/Header1";
import Footer from "./components/footer/Footer";
import Header2 from "./components/header/Header2";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
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
