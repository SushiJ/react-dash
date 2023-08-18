import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Calendar,
  CalendarBlank,
  CaretLeft,
  CaretRight,
  ChartPie,
  Gear,
  GlobeHemisphereWest,
  HouseSimple,
  Money,
  Receipt,
  ShoppingCartSimple,
  TrendUp,
  UserCircleGear,
  Users,
} from "@phosphor-icons/react";

import useThemeWrapper from "../hooks/useThemeWrapper";

type User = {
  email: string;
  city: string;
  country: string;
  createdAt: Date;
  name: string;
  occupation: string;
  password: string;
  phoneNumber: string;
  role: string;
  state: null;
  transactions: string[];
  updatedAt: Date;
};

type SidebarProps = {
  user: User;
  drawerWidth: string;
  isMobile: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navItems = [
  {
    text: "Dashboard",
    icon: <HouseSimple />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartSimple />,
  },
  {
    text: "Customers",
    icon: <Users />,
  },
  {
    text: "Transactions",
    icon: <Receipt />,
  },
  {
    text: "Geography",
    icon: <GlobeHemisphereWest />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <Money />,
  },
  {
    text: "Daily",
    icon: <Calendar />,
  },
  {
    text: "Monthly",
    icon: <CalendarBlank />,
  },
  {
    text: "Breakdown",
    icon: <ChartPie />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <UserCircleGear />,
  },
  {
    text: "Performance",
    icon: <TrendUp />,
  },
];

export default function Sidebar(props: SidebarProps) {
  const [active, setActive] = useState("");

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const theme = useThemeWrapper();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {!!props.sidebarOpen && (
        <Drawer
          open={props.sidebarOpen}
          onClose={() => props.setSidebarOpen(false)}
          variant="permanent"
          anchor="left"
          sx={{
            width: props.drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: !props.isMobile ? 0 : "2px",
              width: props.drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <Box
                color={theme.palette.secondary.main}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Ecom
                  </Typography>
                </Box>
                {props.isMobile && (
                  <IconButton
                    onClick={() => props.setSidebarOpen((prev) => !prev)}
                  >
                    <CaretLeft />
                  </IconButton>
                )}
              </Box>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const textLower = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${textLower}`);
                        setActive(textLower);
                      }}
                      sx={{
                        backgroundColor:
                          active === textLower
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === textLower
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === textLower
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                          fontSize: "1rem",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text}>
                        {active === textLower && (
                          <CaretRight style={{ marginLeft: "auto" }} />
                        )}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box position="absolute" bottom="2rem" p="0.5rem" width="100%">
            <Divider />
            <Box
              textTransform="none"
              gap="1rem"
              m="1.rem 2rem 0 3rem"
              pt="1rem"
            >
              <Box
                component="img"
                alt="profile"
                src="https://via.placeholder.com/150/56a8c2"
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box
                textAlign="left"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    fontWeight="bold"
                    fontSize="1.25rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {props.user.name}
                  </Typography>
                  <Typography sx={{ color: theme.palette.secondary[200] }}>
                    {props.user.occupation}
                  </Typography>
                </Box>
                <Gear size="30px" />
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}
