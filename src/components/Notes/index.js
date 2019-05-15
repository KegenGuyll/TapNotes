import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Slide,
  Grid,
  DialogContent,
  Typography,
  Card,
  CardContent,
  IconButton,
  Zoom
} from '@material-ui/core';
import db from '../../firebaseConfig';
import { DialogNav } from '../Navigation/DialogNav';
import { Close } from '@material-ui/icons';
import { CreateNote } from './CreateNote';

export const Transition = props => {
  return <Slide direction='up' {...props} />;
};

export const Notes = props => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(props.index);
  const [addNote, setAddNote] = useState(false);
  const [data, setData] = useState(props.data);
  const [content, setContent] = useState(false);
  const user = props.user;
  const [categoryList, setCategoryList] = useState(props.categoryList);
  const docRef = db.collection('users').doc(user.uid);

  useEffect(() => {
    onListener();
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  const handleClose = async () => {
    await setOpen(false);
    await setTimeout(() => {
      props.close();
    }, 250);
  };

  const onListener = async () => {
    await docRef.onSnapshot(doc => {
      setData(doc.data());
    });
    await setContent(true);
  };

  const unsubscribe = docRef.onSnapshot(() => {});

  const handleDelete = async () => {
    await props.handleDelete(props.index);
    await handleClose();
  };

  const handleAddNote = async () => {
    await setAddNote(!addNote);
  };

  const handleRemoveNote = async index => {
    await categoryList.categories[activeIndex].Notes.splice(index, 1);
    await docRef.update({
      categories: categoryList.categories
    });
    await handleClose();
  };

  return (
    <Grid container justify='center'>
      <Dialog fullScreen open={true} TransitionComponent={Transition}>
        <DialogNav
          title={props.data.title}
          notes={true}
          handleClose={props.close}
          handleDelete={handleDelete}
          handleAddNote={handleAddNote}
        />
        <DialogContent>
          {categoryList.categories[activeIndex]
            ? categoryList.categories[activeIndex].Notes.map((note, index) => (
                <Zoom
                  key={index}
                  style={{ transitionDelay: '250ms' }}
                  in={true}
                >
                  <Card style={{ marginTop: '10px' }}>
                    <IconButton
                      onClick={() => handleRemoveNote(index)}
                      style={{ float: 'right' }}
                    >
                      <Close />
                    </IconButton>
                    <CardContent>
                      <Typography>{note.title}</Typography>
                      <Typography variant='caption'>
                        {note.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              ))
            : null}
        </DialogContent>
      </Dialog>
      {addNote ? (
        <CreateNote
          defalutValue={activeIndex}
          handleNotes={handleAddNote}
          open={true}
          user={props.user}
        />
      ) : null}
    </Grid>
  );
};
