import { useMemo } from "react";
import { Box } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

import Header from "../components/Header";
import useThemeWrapper from "../hooks/useThemeWrapper";
import { useGetSalesQuery } from "../features/api";

export function Monthly() {
  const { data, isLoading, error } = useGetSalesQuery();
  const theme = useThemeWrapper();

  const formattedData = useMemo(() => {
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

    return [totalSalesLine, totalUnitsLine];
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

  if (!data || !formattedData) {
    return (
      <Box p="1rem">
        <p>Data modCheck</p>
      </Box>
    );
  }

  return (
    <Box p="1rem" maxWidth="100vw">
      <Header title="MONTHLY SALES" subTitle="Monthly sales chart" />
      <Box height="75vh">
        <ResponsiveLine
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
          colors={{ datum: "color" }}
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
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: "Month",
            legendOffset: 60,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Total",
            legendOffset: -50,
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
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              justify: false,
              translateX: 50,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
}
