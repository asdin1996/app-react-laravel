import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../../services/api";

/**
 * Contacts Component
 *
 * Fetches and displays a paginated list of contacts using Material-UI DataGrid.
 * Features:
 * - Server-side Pagination
 * - Loading and Error states
 * - Responsive table layout
 *
 * @component
 */
export default function Contacts() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Fetch contacts using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts", page, pageSize],
    queryFn: ({ queryKey }) => {
      const [_key, pageNumber, perPage] = queryKey;
      return getContacts(pageNumber, perPage);
    },
    keepPreviousData: true,
  });

  const contacts = data?.data || [];
  const rowCount = data?.total ?? 0;

  // Define DataGrid columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <h2>Contacts</h2>

      <DataGrid
        rows={contacts}
        columns={columns}
        rowCount={rowCount}
        page={page}
        pageSize={pageSize}
        pagination
        paginationMode="server"
        onPageChange={(newPage, details) => {
          console.log("Page clicked:", newPage);
          setPage(newPage);
        }} 
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 20]}
        sx={{
          border: "none",
          padding: "15px",
          fontSize: "14px",
          "& .MuiDataGrid-cell": {
            padding: "8px 16px",
            color: "#fffcfcff",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#ffffffff",
            color: "#000000ff",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#ffffffff",
            "& .MuiDataGrid-cell": {
              color: "#000000ff",
            },
          },
        }}
      />

      {error && <p style={{ color: "red" }}>Error loading contacts</p>}
    </div>
  );
}
