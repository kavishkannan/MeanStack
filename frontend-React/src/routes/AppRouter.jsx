import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import BookList from "../pages/Books/BookList";
import AuthorList from "../pages/Authors/AuthorList";
import CategoryList from "../pages/Categories/CategoryList";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<BookList />} />
          <Route path="authors" element={<AuthorList />} />
          <Route path="categories" element={<CategoryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
