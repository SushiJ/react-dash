import { Box } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

import Header from "../components/Header";

import { useGetCustomersQuery } from "../features/api";
import useThemeWrapper from "../hooks/useThemeWrapper";

export default function Customers() {
  const { data, isLoading, error } = useGetCustomersQuery();
  const theme = useThemeWrapper();

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
        params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3"),
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
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
  return (
    <Box p="1rem">
      <Header title="CUSTOMERS" subTitle="List of Customers" />
      <Box>
        <DataGrid
          loading={isLoading || !data}
          rows={data ?? []}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
}
