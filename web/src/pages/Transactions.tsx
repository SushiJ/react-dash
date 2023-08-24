import { SetStateAction, useCallback, useState } from "react";

import { GridRenderCellParams } from "@mui/x-data-grid/models/params/gridCellParams";
import {
  DataGrid,
  GridSortModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

import Header from "../components/Header";
import useThemeWrapper from "../hooks/useThemeWrapper";
import { useGetTransactionsQuery } from "../features/api";
import { MagnifyingGlass } from "@phosphor-icons/react";

const TOTAL_TRANSACTIONS = 500;

function CustomToolbar(props: {
  searchInput: string;
  setSearchInput: React.Dispatch<SetStateAction<string>>;
  setSearch: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <GridToolbarColumnsButton size="medium" />
        <GridToolbarDensitySelector size="medium" />
        <GridToolbarExport size="medium" />
      </Box>
      <Box>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => props.setSearchInput(e.target.value)}
          value={props.searchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    props.setSearch(props.searchInput);
                    props.setSearchInput("");
                  }}
                >
                  <MagnifyingGlass />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </GridToolbarContainer>
  );
}
export default function Transactions() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({});
  const handleSort = useCallback(
    (sort: GridSortModel) =>
      setSort({
        sort,
      }),
    []
  );

  const [searchInput, setSearchInput] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize,
    page,
  });

  const theme = useThemeWrapper();

  const { data, isLoading, error } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

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
        <p>{JSON.stringify(error, null, 2)}</p>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box p="1rem">
        <p>No data bruh</p>
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
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => params.value.toFixed(2),
    },
  ];

  return (
    <Box p="1rem">
      <Header title="TRANSACTIONS" subTitle="List of transactions" />
      <Box
        height="80vh"
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
          getRowId={(row) => row._id}
          rows={data ?? []}
          columns={columns}
          rowCount={TOTAL_TRANSACTIONS}
          pagination
          paginationMode="server"
          sortingMode="server"
          pageSizeOptions={[20, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={({ page, pageSize }) => {
            setPaginationModel({ page, pageSize });
            setPage(page);
            setPageSize(pageSize);
          }}
          onSortModelChange={handleSort}
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
}
