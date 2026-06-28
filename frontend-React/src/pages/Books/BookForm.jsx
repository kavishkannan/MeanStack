import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema } from "../../utils/book.validation";
import { useEffect, useState } from "react";

import {
  createBook,
  getBookById,
  updateBook,
} from "../../services/book.service";
import toast from "react-hot-toast";

function BookForm({ bookId, authors, categories, onClose, onSuccess }) {
  useEffect(() => {
    if (bookId) {
      loadBook();
    } else {
      reset();
    }
  }, [bookId]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author_id: "",
      category_id: "",
      published_year: "",
      isbn: "",
      price: "",
      copies: "",
      location: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (bookId) {
        await updateBook(bookId, data);
        toast.success("Book Updated Successfully");
      } else {
        await createBook(data);
        toast.success("Book Added Successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Unable to Save Book");
      console.log(error);
    }
  };

  const loadBook = async () => {
    try {
      const response = await getBookById(bookId);
      reset(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Title */}

      <div>
        <label className="block mb-1 font-medium">Title</label>

        <input
          {...register("title")}
          className="border rounded-lg w-full p-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Author */}

      <div>
        <label className="block mb-1 font-medium">Author</label>

        <select
          {...register("author_id")}
          className="border rounded-lg w-full p-2"
        >
          <option value="">Select Author</option>

          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        {errors.author_id && (
          <p className="text-red-500 text-sm mt-1">
            {errors.author_id.message}
          </p>
        )}
      </div>

      {/* Category */}

      <div>
        <label className="block mb-1 font-medium">Category</label>

        <select
          {...register("category_id")}
          className="border rounded-lg w-full p-2"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="text-red-500 text-sm mt-1">
            {errors.category_id.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Published Year</label>

          <input
            type="number"
            {...register("published_year")}
            className="border rounded-lg w-full p-2"
          />
          {errors.published_year && (
            <p className="text-red-500 text-sm mt-1">
              {errors.published_year.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">ISBN</label>

          <input
            {...register("isbn")}
            className="border rounded-lg w-full p-2"
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-1">Price</label>

          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="border rounded-lg w-full p-2"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Copies</label>

          <input
            type="number"
            {...register("copies")}
            className="border rounded-lg w-full p-2"
          />
          {errors.copies && (
            <p className="text-red-500 text-sm mt-1">{errors.copies.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Location</label>

          <input
            {...register("location")}
            className="border rounded-lg w-full p-2"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-300"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          {bookId ? "Update Book" : "Save Book"}
        </button>
      </div>
    </form>
  );
}

export default BookForm;
