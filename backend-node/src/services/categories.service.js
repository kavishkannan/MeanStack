import * as categoryRepo from "../repositories/categories.repo.js";

export function listCategories() {
    return categoryRepo.listCategories();
}

export function createCategory(data) {
    if (!data.name) throw new Error("Category name is required");
    return categoryRepo.createCategory(data);
}
