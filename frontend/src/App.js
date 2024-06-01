import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header1 from "./components/header/Header1";
import Footer from "./components/footer/Footer";
import Header2 from "./components/header/Header2";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Transition } from "react-transition-group";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    //user Details
    fetchUserDetails();
    // user Details cart product
    fetchUserAddToCart();
  }, []);

  //hide component with page:.....
  const location = useLocation();
  const excludePaths = [
    "/admin-panel",
    "/login",
    "/sign-up",
    "/admin-panel/all-products",
    "/admin-panel/all-users",
  ];
  const hideHeaderAndFooter = excludePaths.includes(location.pathname);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 20); // Set isScrolled to true if scrollTop is greater than 0
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Transition in={isScrolled}>
        {(state) => (
          <ToastContainer
            style={{
              top: state === "entered" ? "85px" : "135px",
              transition: "top 0.3s ease",
            }}
            pauseOnHover={false}
            autoClose={1000}
          />
        )}
      </Transition>
      <Toaster />

      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        {!hideHeaderAndFooter && <Header1 />}
        {!hideHeaderAndFooter && <Header2 />}

        <main>
          <Outlet />
        </main>

        {!hideHeaderAndFooter && <Footer />}
      </Context.Provider>
    </>
  );
}

export default App;
