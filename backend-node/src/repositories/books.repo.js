import { pool } from "../config/db.js";

export async function listBooks({
  search = "",
  category_id = null,
  author_id = null,
  sort_by = "title",
  sort_dir = "ASC",
  page = 1,
  pageSize = 10
}) {
  const [rows] = await pool.query(
    "CALL sp_list_books(?, ?, ?, ?, ?, ?, ?)",
    [
      search,
      category_id,
      author_id,
      sort_by,
      sort_dir,
      page,
      pageSize
    ]
  );

  return {
    books: rows[0],          // first result set
    total: rows[1][0].total_count  // second result set (FOUND_ROWS)
  };
}


export async function getBookById(id) {
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
    return rows[0];
}

export async function createBook(data) {
    const {
        title,
        isbn,
        author_id,
        category_id,
        published_year,
        price,
        copies,
        location
    } = data;

    await pool.query(
        "CALL sp_insert_book(?, ?, ?, ?, ?, ?, ?, ?)",
        [
            title,
            isbn,
            author_id,
            category_id,
            published_year,
            price,
            copies,
            location
        ]
    );

    return { message: "Book created successfully" };
}

export async function updateBook(id, data) {
    const {
        title,
        isbn,
        author_id,
        category_id,
        published_year,
        price,
        copies,
        location
    } = data;

    await pool.query(
        `UPDATE books SET 
      title=?,
      isbn=?,
      author_id=?,
      category_id=?,
      published_year=?,
      price=?,
      copies=?,
      location=?
     WHERE id=?`,
        [
            title,
            isbn,
            author_id,
            category_id,
            published_year,
            price,
            copies,
            location,
            id
        ]
    );

    return { message: "Book updated successfully" };
}

export async function deleteBook(id) {
    await pool.query("DELETE FROM books WHERE id=?", [id]);
    return { message: "Book deleted successfully" };
}
