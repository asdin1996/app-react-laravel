import React, { useEffect, useState } from "react";
import { getBooks } from "../../services/api"; // tu llamada a backend

export default function Books() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error("Error cargando libros:", err);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="books-container">
      <h2>Lista de Libros</h2>
      <input
        type="text"
        placeholder="Search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Contact ID</th>
            <th>Creado</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.contact_id}</td>
                <td>{new Date(book.created_at).toLocaleString()}</td>
                <td>{new Date(book.updated_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No results</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
