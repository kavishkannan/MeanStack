import * as bookService from "../services/books.service.js";
import { success, failure } from "../utils/response.js";

export async function listBooks(req, res) {
    try {
        const data = await bookService.listBooks(req.query);
        return success(res, data);
    } catch (err) {
        return failure(res, err.message);
    }
}

export async function getBookById(req, res) {
    try {
        const data = await bookService.getBookById(req.params.id);
        return success(res, data);
    } catch (err) {
        return failure(res, err.message);
    }
}

export async function createBook(req, res) {
    try {
        const data = await bookService.createBook(req.body);
        return success(res, data);
    } catch (err) {
        return failure(res, err.message);
    }
}

export async function updateBook(req, res) {
    try {
        const data = await bookService.updateBook(req.params.id, req.body);
        return success(res, data);
    } catch (err) {
        return failure(res, err.message);
    }
}

export async function deleteBook(req, res) {
    try {
        const data = await bookService.deleteBook(req.params.id);
        return success(res, data);
    } catch (err) {
        return failure(res, err.message);
    }
}
