import { Pencil, Trash2 } from "lucide-react";

function BookRow({ book, onEdit, onDelete }) {
  return (
    <tr className="border-b hover:bg-slate-50">
      <td className="px-4 py-3">{book.title}</td>
      <td className="px-4 py-3">{book.author_name}</td>
      <td className="px-4 py-3">{book.category_name}</td>
      <td className="px-4 py-3">{book.published_year}</td>
      <td className="px-4 py-3">₹ {book.price}</td>
      <td className="px-4 py-3">{book.copies}</td>
      <td className="px-4 py-3">
        <button onClick={() => onEdit(book)} className="text-blue-600 mr-3">
          <Pencil size={18} />
        </button>

        <button onClick={() => onDelete(book)} className="text-red-600">
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}

export default BookRow;
