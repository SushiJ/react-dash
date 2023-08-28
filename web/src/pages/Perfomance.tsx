import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnMenuContainer,
  GridRenderCellParams,
  GridColumnMenuFilterItem,
  GridColumnMenuHideItem,
} from "@mui/x-data-grid";

import { useGetUserPerformanceQuery } from "../features/api";
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

const USER_ID = "63701cc1f03239b7f700000e";

export default function Perfomance() {
  const { data, isLoading, error } = useGetUserPerformanceQuery(USER_ID);
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
      field: "userId",
      headerName: "User Id",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      renderCell: (params: GridRenderCellParams) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.4,
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
