import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Link, CssBaseline } from "@material-ui/core";

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
    marginTop: '60px',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

function Footer() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
    <CssBaseline />
    <footer className={classes.footer}>
      <Container maxWidth="sm">
          <Typography variant="body1">
            Code by Ritik and Sahil.
          </Typography>
        <Copyright />
      </Container>
    </footer>
  </div>
  );
}

export default Footer;