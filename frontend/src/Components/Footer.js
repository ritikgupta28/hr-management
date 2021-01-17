import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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