import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Slide,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputBase,
  FilledInput
} from '@material-ui/core';
import { DialogNav } from '../Navigation/DialogNav';
import db from '../../firebaseConfig';

export const Transition = props => {
  return <Slide direction='up' {...props} />;
};

export const CreateNote = props => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState('');
  const [description, setDescription] = useState('');
  const user = props.user;
  const docRef = db.collection('users').doc(user.uid);

  const handleChange = event => {
    setSelectCategory(event.target.value);
    setActiveIndex(event.target.value);
  };

  const onListener = () => {
    docRef.onSnapshot(doc => {
      setData(doc.data());
    });
  };

  useEffect(() => {
    setOpen(props.open);
    onListener();
  }, []);

  const handleClose = async () => {
    await setOpen(false);
    await setTimeout(() => {
      props.handleNotes();
    }, 250);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const createNote = async () => {
    await setData(
      data.categories[activeIndex].Notes.push({
        title: title,
        description: description
      })
    );
    await docRef.update({
      categories: data.categories
    });
    await setOpen(false);
  };

  const handleDescription = event => {
    setDescription(event.target.value);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby='form-dialog-title'
    >
      <DialogNav title={'Create Note'} handleClose={handleClose} />
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
          placeholder='Note'
          multiline
        />
        <div style={{ height: '2vh' }} />
      </DialogContent>
      <DialogActions>
        <FormControl fullWidth>
          <InputLabel htmlFor='demo-controlled-open-select'>
            Category
          </InputLabel>
          <Select
            native
            value={selectCategory}
            onChange={handleChange}
            input={
              <FilledInput name='Category' id='demo-controlled-open-select' />
            }
          >
            <option value='' />
            {data.categories &&
              data.categories.map((value, index) => (
                <option key={index} value={index}>
                  {value.title}
                </option>
              ))}
          </Select>
        </FormControl>
        <Button
          disabled={selectCategory === '' || title === '' || description === ''}
          onClick={createNote}
          variant='outlined'
          color='primary'
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
