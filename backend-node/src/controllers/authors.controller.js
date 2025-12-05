import * as authorService from "../services/authors.service.js";
import { success, failure } from "../utils/response.js";

export async function listAuthors(req, res) {
    try {
        const data = await authorService.listAuthors();
        return success(res, data);
    } catch (err) {
        return failure(res, err.message);
    }
}

export async function createAuthor(req, res) {
    try {
        const data = await authorService.createAuthor(req.body);
        return success(res, data);
    } catch (err) {
        return failure(res, err.message);
    }
}
