import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  author_id: z.string().min(1, "Please select an author"),
  category_id: z.string().min(1, "Please select a category"),
  published_year: z.string().min(4, "Published year is required"),
  isbn: z.string().min(10, "ISBN is required"),
  price: z.string().min(1, "Price is required"),
  copies: z.string().min(1, "Copies is required"),
  location: z.string().min(1, "Location is required"),
});
