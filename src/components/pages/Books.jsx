import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBooks, deleteBooks } from "../../services/api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Books Component
 *
 * - Fetches books with React Query
 * - Displays books in a Material UI DataGrid
 * - Provides search filter by title
 * - Includes row actions: Edit and Delete
 */
export default function Books() {
  const [filter, setFilter] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch books with React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  const books = data || [];

  // Apply filter by title
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Mutation for deleting a book (calls deleteContacts)
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBooks(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err) => {
      console.error("Error deleting book:", err);
    },
  });

  // Define DataGrid columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 200 },
    { field: "contact_id", headerName: "Contact ID", width: 120 },
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 200,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => navigate(`/books/edit/${params.row.id}`)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Handler for delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h2>Books List</h2>

      <input
        type="text"
        placeholder="Search by title..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          marginBottom: "16px",
          padding: "8px",
          width: "300px",
        }}
      />

      <DataGrid
        rows={filteredBooks}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        loading={isLoading || deleteMutation.isLoading}
        disableRowSelectionOnClick
        sx={{
          border: "none",
          fontSize: "14px",
          "& .MuiDataGrid-cell": {
            padding: "8px 12px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      />
      {error && <p style={{ color: "red" }}>Error loading books</p>}
    </div>
  );
}
