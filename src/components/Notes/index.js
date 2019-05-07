import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect
} from 'react';
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
import { toast } from 'react-toastify';

export const Transition = props => {
  return <Slide direction='up' {...props} />;
};

export const Notes = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState('');
  const [addNote, setAddNote] = useState(false);
  const [data, setData] = useState(null);
  const user = props.user;
  const [categoryList, setCategoryList] = useState(props.categoryList);
  const docRef = db.collection('users').doc(user.uid);

  useImperativeHandle(ref, () => ({
    activeNotes(index) {
      setActiveIndex(index);
      setOpen(true);
    }
  }));

  useEffect(() => {
    onListener();
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const onListener = () => {
    docRef.onSnapshot(doc => {
      setData(doc.data());
    });
  };

  const unsubscribe = docRef.onSnapshot(() => {});

  const handleDelete = async () => {
    //await setData(null);
    // await props.handleDelete(props.index);
    //await handleClose();
    toast.error('This feature is a WIP, Sorry :(', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
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
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <DialogNav
          title={props.data.title}
          notes={true}
          handleClose={handleClose}
          handleDelete={handleDelete}
          handleAddNote={handleAddNote}
        />
        <DialogContent>
          {data
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
});
