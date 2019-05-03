import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Dialog,
  Slide,
  Button,
  TextField,
  Grid,
  DialogContent,
  DialogActions,
  Toolbar,
  AppBar,
  IconButton,
  Typography
} from '@material-ui/core';
import db from '../../firebaseConfig';
import firebase from 'firebase';
import { ArrowBack } from '@material-ui/icons';
import { toast } from 'react-toastify';

export const Transition = props => {
  return <Slide direction='up' {...props} />;
};

export const CreateCategory = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const user = props.user;
  const [description, setDescription] = useState('');
  const docRef = db.collection('users').doc(user.uid);

  useImperativeHandle(ref, () => ({
    activeCategory() {
      setOpen(true);
    }
  }));

  const handleClose = async () => {
    setOpen(false);
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const addCategory = async () => {
    if (title === '') {
      await toast.error('A category must contain a proper title', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } else {
      await docRef.update({
        categories: firebase.firestore.FieldValue.arrayUnion({
          title: title,
          description: description,
          Notes: [],
          owner: user.uid,
          shared: []
        })
      });
      await setOpen(false);
      await setTitle('');
      await setDescription('');
    }
  };

  return (
    <Grid container justify='center'>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby='form-dialog-title'
      >
        <AppBar
          style={{
            backgroundColor: 'white',
            boxShadow: 'unset'
          }}
          position='static'
        >
          <Toolbar>
            <IconButton onClick={handleClose}>
              <ArrowBack />
            </IconButton>
            <Typography
              style={{
                fontFamily: 'Montserrat',
                paddingLeft: 55,
                fontWeight: 600
              }}
              variant='h6'
            >
              Create a category
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginBottom: 35 }} />
        <DialogContent>
          <TextField
            label='Title'
            value={title}
            onChange={handleTitle}
            fullWidth
          />
          <div style={{ height: '2vh' }} />
          <TextField
            label='Description'
            value={description}
            onChange={handleDescription}
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='primary' onClick={addCategory}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
});
