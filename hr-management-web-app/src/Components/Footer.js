import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from "@material-ui/icons/Facebook"
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
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: '50px',
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
        <Container style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <Typography variant="body1">
            Code by 
            <Link href="https://sahilgoyal.herokuapp.com/"> Sahil </Link> 
            and 
            <Link href="https://ritikgupta.herokuapp.com/"> Ritik </Link>
          </Typography>
          <Copyright />
        </Container>
        <Container maxWidth="xs" style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <LinkedInIcon />
          <GitHubIcon />
          <InstagramIcon />
          <FacebookIcon />
        </Container>
      </footer>
  </div>
  );
}

export default Footer;