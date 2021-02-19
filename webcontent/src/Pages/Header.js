import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Icon,
  Button
} from '@material-ui/core/';
import {Link} from "react-router-dom";
import purple from '@material-ui/core/colors/purple';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  Bar: {
    marginTop: 10,
    boxShadow: 'none',
    backgroundColor : 'rgba(255, 255, 255, 0)',
    color: 'white',
    //position: 'absolute',
    top:0,
    zIndex:-1,
  },
  hello: {
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
  },
  buttonNav: {
    marginRight: 10,
    color: 'white',
    fontSize: '20px',
    textTransform: 'inherit',
  },
}));
const accent = purple['A200'];

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <AppBar position="static" color={accent} className={classes.Bar}>
          <Toolbar variant="dense">{/** 
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Icon>menu</Icon>
            </IconButton>*/
            }<div className='container'>     
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button color="primary" className={classes.buttonNav} style={{border:"none",outline:"none"}}>
                SpaceX
              </Button>
            </Link>
            <Link to="/rocket" style={{ textDecoration: 'none' }}>
              <Button color="primary" className={classes.buttonNav} style={{border:"none",outline:"none"}}>
                Rocket
              </Button>
            </Link>
            <Link to="/launch" style={{ textDecoration: 'none' }}>
              <Button color="primary" className={classes.buttonNav} style={{border:"none",outline:"none"}}>
                Launch
              </Button>
            </Link></div>
          </Toolbar>
        </AppBar>
    </div>
  );
}
