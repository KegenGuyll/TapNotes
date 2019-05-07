import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Slide,
  Button,
  TextField,
  InputBase,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import db from '../../firebaseConfig';
import firebase from 'firebase';
import { toast } from 'react-toastify';
import { DialogNav } from '../Navigation/DialogNav';

export const Transition = props => {
  return <Slide direction='up' {...props} />;
};

export const CreateCategory = props => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const user = props.user;
  const [description, setDescription] = useState('');
  const docRef = db.collection('users').doc(user.uid);

  useEffect(() => {
    setOpen(props.open);
  }, []);

  const handleClose = async () => {
    await setOpen(false);
    await setTimeout(() => {
      props.handleCategory();
    }, 250);
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
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby='form-dialog-title'
    >
      <DialogNav title={'Create a category'} handleClose={handleClose} />
      <div style={{ marginBottom: 35 }} />
      <DialogContent>
        <InputBase
          style={{
            flex: 1,
            fontSize: '1.5em',
            fontFamily: 'Montserrat',
            fontWeight: 600
          }}
          value={title}
          onChange={handleTitle}
          fullWidth
          placeholder='Title'
        />
        <InputBase
          style={{
            flex: 1,
            fontSize: '1em',
            fontFamily: 'Montserrat',
            fontWeight: 600
          }}
          value={description}
          onChange={handleDescription}
          fullWidth
          placeholder='Description'
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={title === ''}
          variant='outlined'
          color='primary'
          onClick={addCategory}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
