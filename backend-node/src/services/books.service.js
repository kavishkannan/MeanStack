import * as bookRepo from "../repositories/books.repo.js";

export async function listBooks(params) {
    return bookRepo.listBooks({
        search: params.search || "",
        category_id: params.category_id || null,
        author_id: params.author_id || null,
        sort_by: params.sort_by || "title",
        sort_dir: params.sort_dir || "ASC",
        page: parseInt(params.page || 1),
        pageSize: parseInt(params.pageSize || 10),
    });
}


export async function getBookById(id) {
    if (!id) throw new Error("Book ID is required");
    return bookRepo.getBookById(id);
}

export async function createBook(data) {
    if (!data.title) throw new Error("Title is required");

    return bookRepo.createBook(data);
}

export async function updateBook(id, data) {
    if (!id) throw new Error("Book ID is required");

    return bookRepo.updateBook(id, data);
}

export async function deleteBook(id) {
    if (!id) throw new Error("Book ID is required");

    return bookRepo.deleteBook(id);
}
