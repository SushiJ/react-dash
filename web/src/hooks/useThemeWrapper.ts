import { useTheme } from "@mui/material";
import { ThemeSettingType } from "../theme";

export default function useThemeWrapper() {
  const theme = useTheme<ThemeSettingType>();
  return theme;
}
