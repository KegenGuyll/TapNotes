import React, { useState, useRef } from 'react';
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
  Button,
  InputBase,
  Paper
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
import { withRouter } from 'react-router-dom';
import { CreateCategory } from '../Category/CreateCategory';

const Navigation = props => {
  let [details, setDetails] = useState(false);
  let [account, setAccount] = useState(false);

  const childRef = useRef();

  const toggleDetails = open => {
    setDetails((details = !open));
  };

  const toggleAccount = open => {
    setAccount((account = !open));
  };

  const route = path => {
    props.history.push(path);
    toggleDetails(true);
  };

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <Grid>
      <Grid container justify='center' direction='row'>
        {
          <Paper
            style={{
              padding: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '85%'
            }}
            elevation={2}
          >
            <Grid item container direction='row'>
              <IconButton
                aria-label='Menu'
                style={{ padding: 10 }}
                onClick={() => toggleDetails(false)}
              >
                <Menu />
              </IconButton>
              <InputBase
                style={{
                  marginLeft: 8,
                  flex: 1
                }}
                placeholder='Search your Notes'
              />
              <IconButton
                style={{ padding: 10 }}
                onClick={() => toggleAccount(false)}
                aria-label='Profile'
              >
                <Avatar
                  style={{
                    width: 30,
                    height: 30
                  }}
                  alt={props.user.displayName}
                  src={props.user.photoURL}
                />
              </IconButton>
            </Grid>
          </Paper>
        }
      </Grid>

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
          <ListItem button>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText>Notes</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NotificationsActiveOutlined />
            </ListItemIcon>
            <ListItemText>Reminders</ListItemText>
          </ListItem>
          <Divider />
          <ListItem onClick={() => childRef.current.activeCategory()} button>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText>Create new category</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <MoveToInbox />
            </ListItemIcon>
            <ListItemText>Archive</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText>Trash</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button>
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
      <CreateCategory user={props.user} ref={childRef} />
      {props.children}
    </Grid>
  );
};

export default withRouter(Navigation);
