import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../../services/api";

export default function Contacts() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "contacts",
      paginationModel.page + 1,
      paginationModel.pageSize,
    ],
    queryFn: () =>
      getContacts(
        paginationModel.page + 1,
        paginationModel.pageSize
      ),
    keepPreviousData: true,
  });

  const contacts = data?.data || [];
  const rowCount = data?.meta?.total ?? 0;

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
      valueFormatter: (params) =>
        params?.value
          ? new Date(params.value).toLocaleString()
          : "",
    },
  ];

  return (
    <div style={{ height: 650, width: "100%" }}>
      <h2>Contacts</h2>

      <DataGrid
        rows={contacts}
        columns={columns}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={(model) =>
          setPaginationModel(model)
        }
        pageSizeOptions={[5, 10, 20]}
        loading={isLoading}
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

      {error && (
        <p style={{ color: "red" }}>
          Error loading contacts
        </p>
      )}
    </div>
  );
}
