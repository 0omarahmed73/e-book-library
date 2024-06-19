import { Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/404/404";
import Search from "./Pages/Search/Search";
import Categories from "./Pages/Categories/Categories";
import Category from "./Pages/Category/Category";
import Login from "./Pages/Login/Login";
import { BooksContext } from "./Contexts/BookContext";
import { useContext, useEffect } from "react";
import SignUp from "./Pages/SignUp/SignUp";
import Cart from "./Pages/Cart/Cart";
import Favorite from "./Pages/Favorites/Favorites";
function App() {
  const { userLogged } = useContext(BooksContext);
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route
          path="cart"
          element={userLogged ? <Cart /> : <Navigate to={"/login"} />}
        />
        <Route path="search" element={<Search />} />
        <Route path="categories" element={<Categories />}></Route>
        <Route path="/categories/:category" element={<Category />} />
        <Route
          path="sign-up"
          element={!userLogged ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="favorite"
          element={userLogged ? <Favorite /> : <Navigate to={"/login"} />}
        />
        <Route
          path="login"
          element={!userLogged ? <Login /> : <Navigate to={"/"} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
