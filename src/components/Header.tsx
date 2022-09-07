import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, useTheme, Menu, MenuItem, Box, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export default function Header() {
  const theme = useTheme()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  interface PagesProps {
    id: string;
    name: string;
    to: string;
  }

  const pages: PagesProps[] = [
    {
      id: 'view-mode',
      name: 'View mode',
      to: 'charts',
    },
    {
      id: 'settings-mode',
      name: 'Settings',
      to: 'settings',
    },
  ]

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const Pages = ({ pages }: { pages: PagesProps[] }) => (
    <>
      {pages.map((page: PagesProps) => (
        <MenuItem
          key={page.id}
          onClick={handleCloseNavMenu}
          component={NavLink as React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLAnchorElement>>}
          to={page.to}
          sx={{
            [theme.breakpoints.up('md')]: {
              borderBottom: 2,
              borderColor: 'transparent',
              '&.active': { borderColor: 'inherit' },
            }
          }}
        >
          <Typography textAlign="center">{page.name}</Typography>
        </MenuItem>
      ))}
    </>
  )

  return (
    <AppBar sx={{ position: 'static' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <Pages pages={pages} />
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Pages pages={pages} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}