import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header1 from "./components/header/Header1";
import Footer from "./components/footer/Footer";
import Header2 from "./components/header/Header2";
import { Toaster } from "react-hot-toast";
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

    const dataAPI = await dataResponse.json();

    if (dataAPI.success) {
      dispatch(setUserDetails(dataAPI.data));
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
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  //ẩn component với các page:.....
  const location = useLocation();
  const excludePaths = [
    "/admin-panel",
    "/login",
    "/sign-up",
    "/admin-panel/all-products",
    "/admin-panel/all-users",
  ];
  const hideHeaderAndFooter = excludePaths.includes(location.pathname);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <Toaster />
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
