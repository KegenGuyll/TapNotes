import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Grid,
  Dialog,
  DialogContent,
  ListItem,
  ListItemIcon,
  Slide,
  ListItemText,
  List
} from '@material-ui/core';
import { DialogNav } from '../Navigation/DialogNav';
import { MoveToInbox, Delete, Edit } from '@material-ui/icons';

export const Transition = props => {
  return <Slide direction='up' {...props} />;
};

export const SettingsCategory = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    activeSettings() {
      setOpen(true);
    }
  }));
  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <Grid container justify='center'>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <DialogNav
          title={`${props.data.title} Settings`}
          handleClose={handleClose}
        />
        <DialogContent>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText>Rename</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MoveToInbox />
              </ListItemIcon>
              <ListItemText>Archive</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon onClick={() => props.handleDelete(props.index)}>
                <Delete />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </Grid>
  );
});
