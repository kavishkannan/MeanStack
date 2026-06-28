import { useEffect, useState } from "react";
import { getBooks } from "../../services/book.service";
import BookRow from "./BookRow";
import Modal from "../../components/common/Modal";
import BookForm from "./BookForm";
import { getAuthors } from "../../services/author.service";
import { getCategories } from "../../services/category.service";

function BookList() {
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [authors, setAuthors] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const totalPages = Math.ceil(totalRecords / pageSize);

  const loadMasterData = async () => {
    try {
      const [authorsResponse, categoriesResponse] = await Promise.allSettled([
        getAuthors(),
        getCategories(),
      ]);

      setAuthors(authorsResponse.value.data);
      setCategories(categoriesResponse.value.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setSelectedBookId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (book) => {
    setSelectedBookId(book.id);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedBookId(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {};

  useEffect(() => {
    loadBooks();
    loadMasterData();
  }, [search, page]);

  const loadBooks = async () => {
    handleClose();
    try {
      const response = await getBooks({
        search,
        page,
        pageSize,
      });
      setBooks(response.data.books);
      setTotalRecords(response.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Books</h1>
      </div>
      <div className="flex justify-between items-center mb-5">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search books..."
          className="border rounded-lg px-4 py-2 w-80"
        />
        <button
          onClick={handleAdd}
          className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
    "
        >
          + Add Book
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Author</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Year</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Copies</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <BookRow
                key={book.id}
                book={book}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="text-sm text-gray-500">Total Records : {totalRecords}</p>

        <div className="flex items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="border px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="border px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {/* Add and Edit Dialog */}
      <Modal
        open={isModalOpen}
        title={selectedBookId == null ? "Add New Book" : "Edit Book details"}
        onClose={() => setIsModalOpen(false)}
      >
        <BookForm
          bookId={selectedBookId}
          authors={authors}
          categories={categories}
          onClose={handleClose}
          onSuccess={loadBooks}
        />
      </Modal>
    </>
  );
}

export default BookList;
