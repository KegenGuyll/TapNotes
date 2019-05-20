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
import { Close, Create } from '@material-ui/icons';
import { CreateNote } from './CreateNote';

export const Transition = props => {
  return <Slide direction='up' {...props} />;
};

export const Notes = props => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(props.index);
  const [addNote, setAddNote] = useState(false);
  const [data, setData] = useState(null);
  const [viewNote, setViewNote] = useState(false);
  const [note, setNote] = useState({});
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
  };

  const unsubscribe = docRef.onSnapshot(() => {});

  const handleDelete = async () => {
    await props.handleDelete(props.index);
    await handleClose();
  };

  const handleAddNoteClose = async () => {
    await setAddNote(!addNote);
  };

  const handleViewNote = async (title, description) => {
    await setNote({
      title,
      description
    });
    await setViewNote(!viewNote);
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
          handleAddNote={handleAddNoteClose}
        />
        <DialogContent>
          {data !== null
            ? data.categories[activeIndex]
              ? data.categories[activeIndex].Notes.map((note, index) => (
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
                      <CardContent
                        onClick={() =>
                          handleViewNote(note.title, note.description)
                        }
                      >
                        <Typography>{note.title}</Typography>
                        <Typography variant='caption'>
                          {note.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                ))
              : null
            : null}
        </DialogContent>
      </Dialog>
      {addNote ? (
        <CreateNote
          defalutValue={activeIndex}
          handleNotes={handleAddNoteClose}
          open={true}
          user={props.user}
        />
      ) : null}
      {viewNote ? (
        <CreateNote
          defalutValue={activeIndex}
          handleNotes={handleViewNote}
          open={true}
          user={props.user}
          note={note}
        />
      ) : null}
    </Grid>
  );
};
