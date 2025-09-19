import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookById, updateBook } from "../../services/api";
import { TextField, Button, Paper, Typography, CircularProgress, Alert } from "@mui/material";

/**
 * BookEdit Component
 *
 * - Fetches a single book by ID
 * - Displays a form with prefilled data
 * - Allows editing and saving changes
 */
export default function BookEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Local form state with default empty strings to avoid controlled/uncontrolled warning
  const [formData, setFormData] = useState({
    title: "",
    contact_id: "",
  });

  // Fetch book data
  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
    retry: 1,
  });

  // Update form state when data loads
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        contact_id: book.contact_id || "",
      });
    }
  }, [book]);

  // Mutation for updating book
  const mutation = useMutation({
    mutationFn: (updatedBook) => updateBook(id, updatedBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/books");
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const value = e.target.name === "contact_id" ? Number(e.target.value) : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value || "",
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
    mutation.mutate(formData);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error loading book data</Alert>;

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "20px auto", backgroundColor: "white" }}>
      <Typography variant="h5" gutterBottom>
        Edit Book
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />
    
        <TextField
          name="contact_id"
          label="Contact ID"
          value={formData.contact_id}
          onChange={handleChange}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Saving..." : "Save"}
        </Button>
        {mutation.isError && <Alert severity="error">Failed to update book</Alert>}
      </form>
    </Paper>
  );
}
