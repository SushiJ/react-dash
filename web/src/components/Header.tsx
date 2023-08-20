import { Box, Typography } from "@mui/material";
import useThemeWrapper from "../hooks/useThemeWrapper";

type HeaderProps = {
  title: string;
  subTitle: string;
};

export default function Header(props: HeaderProps): JSX.Element {
  const theme = useThemeWrapper();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {props.title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {props.subTitle}
      </Typography>
    </Box>
  );
}
