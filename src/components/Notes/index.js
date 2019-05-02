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
  Typography,
  Paper,
  Card,
  CardContent
} from '@material-ui/core';
import db from '../../firebaseConfig';
import firebase from 'firebase';
import { ArrowBack, Add } from '@material-ui/icons';

export const Transition = props => {
  return <Slide direction='up' {...props} />;
};

export const Notes = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  //const docRef = db.collection('users').doc(props.user.uid);

  useImperativeHandle(ref, () => ({
    activeNotes() {
      setOpen(true);
    }
  }));

  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <Grid container justify='center'>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <Paper
          elevation={0}
          style={{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <IconButton style={{ padding: 10 }} onClick={handleClose}>
            <ArrowBack />
          </IconButton>
          <Typography
            style={{
              fontFamily: 'Montserrat',
              fontWeight: 600,
              textAlign: 'center',
              flexGrow: 1
            }}
            variant='h6'
          >
            {props.data.title}
          </Typography>
          <IconButton disableRipple style={{ paddingRight: 28 }}>
            <Add />
          </IconButton>
        </Paper>
        <DialogContent>
          {props.data.Notes &&
            props.data.Notes.map((note, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography>{note.title}</Typography>
                  <Typography variant='caption'>{note.description}</Typography>
                </CardContent>
              </Card>
            ))}
        </DialogContent>
      </Dialog>
    </Grid>
  );
});
