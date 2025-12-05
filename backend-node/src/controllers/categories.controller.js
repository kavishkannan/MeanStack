import * as categoryService from "../services/categories.service.js";
import { success, failure } from "../utils/response.js";

export async function listCategories(req, res) {
    try {
        const data = await categoryService.listCategories();
        return success(res, data);
    } catch (err) {
        return failure(res, err.message);
    }
}

export async function createCategory(req, res) {
    try {
        const data = await categoryService.createCategory(req.body);
        return success(res, data);
    } catch (err) {
        return failure(res, err.message);
    }
}
