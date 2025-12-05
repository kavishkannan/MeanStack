import * as userService from "../services/users.service.js";
import { success, failure } from "../utils/response.js";

export async function registerUser(req, res) {
    try {
        const data = await userService.registerUser(req.body);
        return success(res, data);
    } catch (err) {
        return failure(res, err.message);
    }
}

export async function loginUser(req, res) {
    try {
        const data = await userService.loginUser(req.body);
        return success(res, data);
    } catch (err) {
        return failure(res, err.message);
    }
}
