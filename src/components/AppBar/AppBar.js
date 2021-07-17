import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon  from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MailIcon from '@material-ui/icons/Mail';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AppBarMaterial from '@material-ui/core/AppBar';
import { useStyles } from './appBarStyle';
import { useState, useContext } from 'react';
import { routes } from '../../constants/routes';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { AuthContext } from '../../context/auth/AuthContext';

const AppBar = () => {

  const { authState: { user }, logoutUser } = useContext(AuthContext)
  const classes = useStyles();
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
      <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Panel de control</MenuItem>
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
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBarMaterial position="static">
        <Toolbar>
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
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={1} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
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
      </AppBarMaterial>
      {renderMobileMenu}
      {user && renderMenu}
    </div>
  );
}

export default AppBar

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