import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnMenuContainer,
  GridRenderCellParams,
  GridColumnMenuFilterItem,
  GridColumnMenuHideItem,
} from "@mui/x-data-grid";

import { useGetAdminsQuery } from "../features/api";
import useThemeWrapper from "../hooks/useThemeWrapper";
import Header from "../components/Header";

function CustomMenu(props: {
  hideMenu: (event: React.SyntheticEvent) => void;
  colDef: GridColDef;
  open: boolean;
}) {
  return (
    <GridColumnMenuContainer
      hideMenu={props.hideMenu}
      colDef={props.colDef}
      open={props.open}
    >
      <GridColumnMenuFilterItem
        onClick={props.hideMenu}
        colDef={props.colDef}
      />
      <GridColumnMenuHideItem colDef={props.colDef} onClick={props.hideMenu} />
    </GridColumnMenuContainer>
  );
}

export default function Admins() {
  const { data, isLoading, error } = useGetAdminsQuery();
  const theme = useThemeWrapper();

  if (isLoading) {
    return (
      <Box p="1rem">
        <p>Loading...</p>
      </Box>
    );
  }

  if (!isLoading && error) {
    return (
      <Box p="1rem">
        <p>Ehruhror...</p>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box p="1rem">
        <p>Data modCheck</p>
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
    <Box p="1rem" maxWidth="100vw">
      <Header title="ADMINS" subTitle="List of ADMINS" />
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
          loading={isLoading}
          rows={data}
          getRowId={(row) => row._id}
          columns={columns}
          disableRowSelectionOnClick
          slots={{ columnMenu: CustomMenu }}
        />
      </Box>
    </Box>
  );
}
