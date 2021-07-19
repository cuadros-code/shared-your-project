import { useContext, useState } from 'react';
import useStyles from './drawerStyle';
import styled from 'styled-components'
import clsx from 'clsx';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon  from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useTheme } from '@material-ui/core/styles';
import { routes } from '../../constants/routes';
import { ListItem, ListItemIcon, ListItemText, Avatar, InputBase, MenuItem, Menu } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';
import { Drawer, AppBar, Toolbar, List, Typography, IconButton } from '@material-ui/core'
import { AuthContext } from '../../context/auth/AuthContext';


const DrawerLeft = () => {
  const { authState: { user }, logoutUser } = useContext(AuthContext)
  const history = useHistory()
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { 
        handleMenuClose() 
        history.push(routes.profile)
      }}>
        Perfil
      </MenuItem>
      <MenuItem onClick={() => {
        handleMenuClose()
        history.push(routes.dashboard)
      }}>Panel de control</MenuItem>
      <MenuItem onClick={()=> {
        handleMenuClose()
        logoutUser()
      }}>Cerrar sesión</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {
        user ?
        <span>
        <MenuItem onClick={() => {
            handleMenuClose()
            history.push(routes.profile)
        }}>
          Perfil
        </MenuItem>
        <MenuItem onClick={() => {
          handleMenuClose()
          history.push(routes.dashboard)
         }}>
           Panel de control
        </MenuItem>

        <MenuItem onClick={()=> {
          handleMenuClose()
          logoutUser()
        }}>
          Cerrar sesión
        </MenuItem>
        </span>
        :
        <span>
          <MenuItem onClick={() => history.push(routes.login)} >
            Iniciar sesión
          </MenuItem>
          <MenuItem onClick={() => history.push(routes.register)} >
            Registrarse
          </MenuItem>
        </span>
      }
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            <Link to={routes.home} style={{color: 'white'}} >
              Shared
            </Link>
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar proyecto..."
              style={{paddingLeft: '45px'}}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {
              user
              ? 
              <>
                
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar src="http://javadesde0.com/wp-content/uploads/480px-Unofficial_JavaScript_logo_2.svg_.png"  />
                </IconButton>
              </>
              :
              <>
                <LinkItem to={routes.login} >Iniciar sesión</LinkItem>
                <LinkItem to={routes.register} >Registrarse</LinkItem>
              </>
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>

      </AppBar>
      <Drawer
        className={`${classes.drawer}`}
        id="drawer"
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div id="drawer" className={`${classes.drawerHeader}`}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <List id="drawer" className={classes.list} >
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {renderMobileMenu}
      {user && renderMenu}
    </div>
  );
}

export default DrawerLeft

const LinkItem = styled(Link)`
  color: white;
  font-weight: 500;
  font-size: 1.1rem;
  margin-right: 15px;
  padding: 10px;
  transition: ease-in .2s;
  :hover{
    border-radius: 10px;
    background-color: rgba(0,0,0,0.3);
  }
`