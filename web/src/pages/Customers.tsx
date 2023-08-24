import { Box } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

import Header from "../components/Header";

import { useGetCustomersQuery } from "../features/api";
import useThemeWrapper from "../hooks/useThemeWrapper";

export default function Customers() {
  const { data, isLoading, error } = useGetCustomersQuery();
  const theme = useThemeWrapper();

  if (isLoading) {
    return (
      <Box p="1rem">
        <p>Loading...</p>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box p="1rem">
        <p>welp</p>
      </Box>
    );
  }

  if (!isLoading && error) {
    return (
      <Box p="1rem">
        <p>Welp...</p>
      </Box>
    );
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone No.",
      flex: 0.5,
      renderCell: (params: GridRenderCellParams) =>
        params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"),
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box p="1rem">
      <Header title="CUSTOMERS" subTitle="List of Customers" />
      <Box
        height="75vh"
        maxWidth="100vw"
        py="1rem"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: theme.palette.secondary[200],
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          rows={data ?? []}
          getRowId={(row) => row._id}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
