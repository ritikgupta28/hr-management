import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Link } from "@material-ui/core";

function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        HR-Manager
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: '80px',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

function Footer() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
        <footer className={classes.footer}>
          <Typography variant="body1">Code by Sahil and Ritik</Typography>
          <Copyright />
        </footer>
    </div>
  );
}

export default Footer;