import React, { useState } from 'react';
import {
  InputAdornment,
  IconButton,
  Grid,
  TextField,
  FormControl,
  Button,
  Typography
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import './style.css';
import firebase from 'firebase';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const color = '#FFF';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  cssLabel: {
    color: '#f9f9f95c',
    '&$cssFocused': {
      color: color
    }
  },
  cssFocused: {},
  cssUnderline: {
    color: color,
    '&:before': { borderBottomColor: color },
    '&:after': {
      borderBottomColor: color
    }
  },
  cssOutlinedInput: {
    borderColor: color,
    '&$cssFocused $notchedOutline': {
      borderColor: color
    }
  },
  notchedOutline: {}
});

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [switchPage, setSwitchPage] = useState(false);
  const [error, setError] = useState('');
  const Googleprovider = new firebase.auth.GoogleAuthProvider();

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const ShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const page = () => {
    setSwitchPage(!switchPage);
  };

  const handleSignIn = provider => {
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const attemptAuth = async () => {
    try {
      const auth = await firebase.auth();
      if (switchPage !== true) {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setError(err.message);
      toast.error(error, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  const { classes } = props;

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: 'linear-gradient(to bottom, #0583F2 , #66BCF2)'
      }}
    >
      <Typography
        align='center'
        variant='h2'
        style={{ color: 'white', paddingTop: '10vh' }}
      >
        {switchPage === false ? 'Login' : 'Register'}
      </Typography>
      <Grid container justify='center'>
        <div style={{ paddingTop: '30vh' }}>
          <FormControl>
            <TextField
              className='inputForm'
              value={email}
              label='Email'
              type='email'
              onChange={handleEmail}
              variant='outlined'
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }
              }}
            />
            <div style={{ height: '2vh' }} />
            <TextField
              label='Password'
              value={password}
              type={showPassword ? 'text' : 'password'}
              onChange={handlePassword}
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      aria-label='Toggle password visibility'
                      onClick={ShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }
              }}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }
              }}
            />
            <div style={{ height: '2vh' }} />
            <Button
              onClick={attemptAuth}
              style={{
                background: 'rgb(7, 131, 208)',
                color: 'white'
              }}
              variant='contained'
            >
              {switchPage === false ? 'Login' : 'Sign Up'}
            </Button>
            <div style={{ height: '2vh' }} />
            <Button
              onClick={page}
              style={{
                background: '#30348C',
                color: 'white'
              }}
              variant='contained'
            >
              {switchPage === true ? 'Login' : 'Sign Up'}
            </Button>
            <Button
              onClick={() => handleSignIn(Googleprovider)}
              style={{ backgroundColor: 'white', margin: '12px' }}
            >
              <img
                src='https://img.icons8.com/color/24/000000/google-logo.png'
                alt='Google Sign In'
              />
            </Button>
          </FormControl>
        </div>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default withStyles(styles)(Login);
