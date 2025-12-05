import * as authorRepo from "../repositories/authors.repo.js";

export function listAuthors() {
    return authorRepo.listAuthors();
}

export function createAuthor(data) {
    if (!data.name) throw new Error("Author name is required");
    return authorRepo.createAuthor(data);
}
