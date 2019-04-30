import React, { useState } from 'react';
import {
  Card,
  Grid,
  IconButton,
  Avatar,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button
} from '@material-ui/core';
import {
  Menu,
  Create,
  NotificationsActiveOutlined,
  Add,
  MoveToInbox,
  Delete,
  Settings
} from '@material-ui/icons';

const Navigation = props => {
  let [details, setDetails] = useState(false);
  let [account, setAccount] = useState(false);

  const toggleDetails = open => {
    setDetails((details = !open));
  };

  const toggleAccount = open => {
    setAccount((account = !open));
  };

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <Grid container justify='center'>
      <Card style={{ width: '85%', marginTop: '2vh' }} elevation={2}>
        <Grid item container direction='row'>
          <IconButton onClick={() => toggleDetails(false)}>
            <Menu />
          </IconButton>
          <input
            style={{
              border: 'unset',
              color: 'black',
              outline: 'none',
              fontFamily: 'Roboto',
              fontWeight: 600,
              fontSize: 'medium',
              margin: 10,
              width: '45vw'
            }}
            placeholder='Search your Notes'
          />
          <Avatar
            onClick={() => toggleAccount(false)}
            style={{ margin: '10px 10px 10px 10px', width: 30, height: 30 }}
            alt={props.user.displayName}
            src={props.user.photoURL}
          />
        </Grid>
      </Card>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor='left'
        open={details}
        onClose={() => toggleDetails(true)}
        onOpen={() => toggleDetails(false)}
      >
        <List>
          <Typography style={{ padding: 20 }} variant='h6'>
            TapNotes
          </Typography>
          <ListItem>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText>Notes</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <NotificationsActiveOutlined />
            </ListItemIcon>
            <ListItemText>Reminders</ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText>Create new category</ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <MoveToInbox />
            </ListItemIcon>
            <ListItemText>Archive</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText>Trash</ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor='bottom'
        open={account}
        onClose={() => toggleAccount(true)}
        onOpen={() => toggleAccount(false)}
      >
        <List>
          <ListItem>
            <ListItemText style={{ textAlign: 'center' }}>
              <Typography variant='h6'>TapNotes</Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Avatar
                style={{ width: 40, height: 40 }}
                alt={props.user.displayName}
                src={props.user.photoURL}
              />
            </ListItemIcon>
            <ListItemText style={{ padding: 'unset' }}>
              <Typography>{props.user.displayName}</Typography>
              <Typography variant='caption'>{props.user.email}</Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Button
                style={{ borderRadius: 20, textTransform: 'unset' }}
                variant='outlined'
              >
                Manage your TapNotes Account
              </Button>
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      {props.children}
    </Grid>
  );
};

export default Navigation;
