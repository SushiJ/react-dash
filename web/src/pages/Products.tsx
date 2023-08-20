import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Header from "../components/Header";
import useThemeWrapper from "../hooks/useThemeWrapper";
import { useGetProductsQuery } from "../features/api";
import { ProductProps } from "../types/props";

function Product({ props }: { props: ProductProps }): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useThemeWrapper();

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.5ren",
      }}
    >
      <CardContent>
        <Typography
          fontSize="14"
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {props.category}
        </Typography>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography mb="1.5rem" color={theme.palette.secondary[400]}>
          {"$" + props.price.toFixed(2)}
        </Typography>
        <Rating value={props.rating} readOnly />
        <Typography variant="body2">{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More...
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        color={theme.palette.neutral[300]}
      >
        <Box p="1rem">
          <Typography>
            Supply left:
            <span
              style={{
                color: theme.palette.secondary[400],
                marginLeft: "0.25rem",
              }}
            >
              {props.supply}
            </span>
          </Typography>
          <Typography>
            Yearly Sales this year:
            <span
              style={{
                color: theme.palette.secondary[400],
                marginLeft: "0.25rem",
              }}
            >
              {props.productStats["yearlySalesTotal"]}
            </span>
          </Typography>
          <Typography>
            Yearly units sold this year:
            <span
              style={{
                color: theme.palette.secondary[400],
                marginLeft: "0.25rem",
              }}
            >
              {props.productStats["yearlyTotalSoldUnits"]}
            </span>
          </Typography>
        </Box>
      </Collapse>
    </Card>
  );
}

export default function Products() {
  const { data, isLoading, error } = useGetProductsQuery();
  const isMobile = useMediaQuery("(max-width: 1000px)");

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
        <p>Welp...</p>
      </Box>
    );
  }

  if (data && !isLoading) {
    return (
      <Box p="1rem">
        <Header title="PRODUCTS" subTitle="See your list of Products" />
        <Box
          py="1rem"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          gap="1rem"
          sx={{
            "& > div": {
              gridColumn: !isMobile ? "" : "span 4",
            },
          }}
        >
          {data.map((product) => (
            <Product props={product} key={product.productStats.productId} />
          ))}
        </Box>
      </Box>
    );
  }
}
