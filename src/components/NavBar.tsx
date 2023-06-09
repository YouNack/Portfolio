import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { css } from "@emotion/react";
import Link from "next/link";

const drawerWidth = 240;
const navItems = [
  ["概要", "/about"],
  ["生産物", "/products"],
  ["学んだもの", "/techs"],
  ["早押し", "/hayaoshi"],
  ["俳句", "/haiku"],
  ["即席の銘", "/zayunomei"],
];

export default function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const HeaderStyle = css`
    color: white;
    text-decoration: none;
  `;

  const TitleStyle = css`
    letter-spacing: -1px;
    font-family: "Zen Kurenaido", serif;
    color: white;
  `;

  const LinkStyle = css`
    text-decoration: none;
  `;

  const LinkTextStyle = css`
    font-family: "Zen Kurenaido";
    color: white;
  `;

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "secondary.main", minHeight: "100%" }}
    >
      <Typography variant="h6" sx={{ my: 2 }} css={TitleStyle}>
        <Link href="/" css={HeaderStyle}>
          Enilimo&apos;s Atelimo
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item[0]} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} href={item[1]}>
              <ListItemText primary={item[0]} css={LinkTextStyle} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar elevation={0} color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            css={TitleStyle}
          >
            <Link href="/" css={HeaderStyle}>
              Enilimo&apos;s Atelimo
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link href={item[1]} key={item[0]} css={LinkStyle}>
                <Button key={item[0]} sx={{ color: "#fff" }} css={LinkTextStyle}>
                  {item[0]}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
