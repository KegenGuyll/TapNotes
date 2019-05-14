import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Slide,
  Button,
  InputBase,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import db from '../../firebaseConfig';
import firebase from 'firebase';
import { DialogNav } from '../Navigation/DialogNav';

export const Transition = props => {
  return <Slide direction='up' {...props} />;
};

export const CreateCategory = props => {
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState('');
  const user = props.user;
  const [description, setDescription] = useState('');
  const docRef = db.collection('users').doc(user.uid);

  useEffect(() => {
    setOpen(props.open);

    return function cleanup() {
      console.log('unmonut');
    };
  }, []);

  const handleClose = async () => {
    await setTimeout(() => {
      props.handleCategory();
    }, 250);
    await setOpen(false);
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const addCategory = async () => {
    await docRef.update({
      categories: firebase.firestore.FieldValue.arrayUnion({
        title: title,
        description: description,
        Notes: [],
        owner: user.uid,
        shared: []
      })
    });
    await setTitle('');
    await setDescription('');
    await handleClose();
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
