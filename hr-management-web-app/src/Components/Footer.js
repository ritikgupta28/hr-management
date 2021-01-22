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
      <Link color="inherit" href="https://hr-management-web-app.herokuapp.com/">
        HR-Management
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
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
          <Typography variant="body1">
            Code by
            <Link href="https://sahilgoyal.herokuapp.com/"> Sahil Goyal </Link>
             and
            <Link href="https://ritikgupta.herokuapp.com/"> Ritik Gupta </Link>
          </Typography>
          <Copyright />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <div>
                <Link href="https://sahilgoyal.herokuapp.com/"> Sahil Goyal </Link>
              </div>
              <div>
                <Link
                  href="https://www.linkedin.com/in/sahil-goyal-138b96175/"
                  style={{ color: 'black' }}
                >
                  <LinkedInIcon fontSize="small" />
                </Link>
                <Link
                  href="https://github.com/sahilgoyals1999"
                  style={{ color: 'black' }}
                >
                  <GitHubIcon fontSize="small" />
                </Link>
              </div>
          </div>
            <div>
              <div>
               <Link href="https://ritikgupta.herokuapp.com/"> Ritik Gupta </Link>
              </div>
              <div>
                <Link
                  href="https://www.linkedin.com/in/ritik-gupta-4756851a1/"
                  style={{ color: 'black' }}
                >
                  <LinkedInIcon fontSize="small" />
                </Link>
                <Link
                  href="https://github.com/ritikgupta28"
                  style={{ color: 'black' }}
                >
                  <GitHubIcon fontSize="small" />
                </Link>
              </div>
          </div>
          </div>
          </Container>
      </footer>
  </div>
  );
}

export default Footer;