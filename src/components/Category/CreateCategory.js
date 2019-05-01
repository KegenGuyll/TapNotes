import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Dialog,
  Slide,
  Button,
  TextField,
  Grid,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Divider,
  Toolbar,
  AppBar,
  IconButton,
  Typography
} from '@material-ui/core';
import db from '../../firebaseConfig';
import firebase from 'firebase';
import { ArrowBack } from '@material-ui/icons';

export const Transition = props => {
  return <Slide direction='up' {...props} />;
};

export const CreateCategory = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const docRef = db.collection('users').doc(props.user.uid);

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
    if (title === '' || description === '') {
      await console.log('you must have a title or/and description');
      await handleClose();
    } else {
      await docRef.update({
        categories: firebase.firestore.FieldValue.arrayUnion({
          title: title,
          description: description,
          Notes: []
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
          <Toolbar
            style={{
              border: 'unset'
            }}
          >
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
