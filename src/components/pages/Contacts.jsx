import React, { useEffect, useState } from "react";
import { getContacts } from "../../services/api";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts(page, perPage);
        setContacts(data.data || data);
        setTotalPages(data.last_page || 1);
      } catch (err) {
        console.error("Error cargando contacts:", err);
      }
    };

    fetchContacts();
  }, [page, perPage]);

  return (
    <div className="contacts-container">
      <h2>Contacts (Página {page})</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Creado</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{new Date(c.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay contactos</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Anterior
        </button>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
