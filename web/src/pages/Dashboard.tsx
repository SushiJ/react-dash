import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Calculator,
  Calendar,
  DownloadSimple,
  Tag,
  UserPlus,
} from "@phosphor-icons/react";

import Header from "../components/Header";
import { useGetDashboardQuery, useGetSalesQuery } from "../features/api";
import useThemeWrapper from "../hooks/useThemeWrapper";
import { useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

function OverviewChart(): JSX.Element {
  const [view, setView] = useState("Units");
  const theme = useThemeWrapper();
  const { data, isLoading, error } = useGetSalesQuery();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;

    const totalSalesLine = {
      id: "totalSalesLine",
      color: theme.palette.secondary.main,
      data: [] as Array<{
        x: string;
        y: number;
      }>,
    };

    const totalUnitsLine = {
      id: "totalUnitsLine",
      color: theme.palette.secondary[600],
      data: [] as Array<{
        x: string;
        y: number;
      }>,
    };

    const acc = { sales: 0, units: 0 };

    for (const c of Object.values(monthlyData)) {
      acc.sales += c.totalSales;
      acc.units += c.totalUnits;

      totalSalesLine.data.push({ x: c.month, y: acc.sales });
      totalUnitsLine.data.push({ x: c.month, y: acc.units });
    }

    return [[totalSalesLine], [totalUnitsLine]];
  }, [data, theme]);

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

  if (!totalUnitsLine || !totalSalesLine) {
    return (
      <Box p="1rem">
        <p>Data modCheck</p>
      </Box>
    );
  }

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            color: theme.palette.secondary.main,
            outlineColor: theme.palette.secondary.main,
          }}
          onClick={() => setView("Sales")}
        >
          Sales
        </Button>
        <span
          style={{ color: theme.palette.secondary.main, padding: "0 0.5rem" }}
        >
          |
        </span>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            color: theme.palette.secondary.main,
          }}
          onClick={() => setView("Units")}
        >
          Units
        </Button>
      </Box>
      <ResponsiveLine
        data={view === "Sales" ? totalSalesLine : totalUnitsLine}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        enableArea={true}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (v) => {
            return v.slice(0, 3);
          },
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -60,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </Box>
  );
}
function BreakdownChart({
  theme,
}: {
  theme: ReturnType<typeof useThemeWrapper>;
}) {
  const { data, isLoading, error } = useGetSalesQuery();

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

  const { salesByCategory } = data;

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  type Format = {
    id: string;
    label: string;
    value: number;
    color: string;
  };

  const formattedData = [] as Array<Format>;
  let i = 0;

  for (const [k, v] of Object.entries(salesByCategory)) {
    formattedData.push({ id: k, label: k, value: v, color: colors[i] });
    i++;
  }

  return (
    <Box height="400px" minHeight="325px" minWidth="325px">
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={{ top: 40, right: 80, bottom: 100, left: 50 }}
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 20,
            translateY: 50,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
}

function StatBox(props: {
  theme: ReturnType<typeof useThemeWrapper>;
  title: string;
  value: number;
  increase: string;
  icon: JSX.Element;
  description: string;
}) {
  return (
    <Box
      p="1rem"
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      flex="1 1 100%"
      bgcolor={props.theme.palette.background.alt}
      borderRadius="0.5rem"
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" color={props.theme.palette.secondary[100]}>
          {props.title}
        </Typography>
        {props.icon}
      </Box>
      <Typography
        variant="h3"
        fontWeight="600"
        color={props.theme.palette.secondary[200]}
      >
        {props.value}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h5"
          fontStyle="italic"
          color={props.theme.palette.secondary.main}
        >
          {props.increase}
        </Typography>
        <Typography>{props.description}</Typography>
      </Box>
    </Box>
  );
}
export default function Dashboard() {
  const { data, isLoading, error } = useGetDashboardQuery();
  const theme = useThemeWrapper();
  const isMediumScreenSize = useMediaQuery("(max-width: 1200px)");

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
        <p>Ehrur..NotLikeThis</p>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box p="1rem">
        <p>modCheck Data...?</p>
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
      <Box display="flex" justifyContent="space-between" py="1rem">
        <Header title="DASHBOARD" subTitle="Dashboard" />
        <Box>
          <Button
            color="secondary"
            variant="outlined"
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
              p: "0.5rem 1.5rem",
            }}
          >
            <DownloadSimple style={{ marginRight: "10px" }} size="18px" />
            Download Reports
          </Button>
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridRow="160px"
        gap="1rem"
        sx={{
          "& > div": {
            gridColumn: !isMediumScreenSize ? undefined : "span 12",
          },
        }}
      >
        <StatBox
          title="Total Customers"
          value={data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <UserPlus color={`${theme.palette.secondary.main}`} size="24px" />
          }
          theme={theme}
        />
        <StatBox
          title="Sales Today"
          value={data.todayStat.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <Calendar color={`${theme.palette.secondary.main}`} size="24px" />
          }
          theme={theme}
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          bgcolor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.5rem"
          maxHeight="25vh"
        >
          <OverviewChart />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data.monthStat.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <Calculator color={`${theme.palette.secondary.main}`} size="24px" />
          }
          theme={theme}
        />
        <StatBox
          title="Yearly Sales"
          value={data.yearlySalesTotal}
          increase="+43%"
          description="Since last year"
          icon={<Tag color={`${theme.palette.secondary.main}`} size="24px" />}
          theme={theme}
        />
        <Box
          gridRow="span 3"
          gridColumn="span 8"
          height="40vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
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
            rows={data.transactions}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          bgcolor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.5rem"
        >
          <Typography variant="h6" color={theme.palette.secondary[100]}>
            Sales by category
          </Typography>
          <BreakdownChart theme={theme} />
          <Typography
            p="0 0.5rem"
            fontSize="0.8rem"
            color={theme.palette.secondary[200]}
          >
            Breakdown of sates and info via category for revenue made this year
            and total sales
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
