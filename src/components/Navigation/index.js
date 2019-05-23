import React, { useState } from 'react';
import {
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
  Paper,
  Drawer
} from '@material-ui/core';
import {
  Menu,
  Create,
  NotificationsActiveOutlined,
  Add,
  MoveToInbox,
  Delete,
  Settings,
  CheckBoxOutlined,
  Brush,
  Mic,
  Image
} from '@material-ui/icons';
import { CreateCategory } from '../Category/CreateCategory';
import { CreateNote } from '../Notes/CreateNote';

const Navigation = props => {
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const handleCategory = async () => {
    await setMenu(false);
    await setShowCategory(!showCategory);
  };

  const handleNotes = async () => {
    await setMenu(false);
    await setShowNotes(!showNotes);
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
                onClick={() => setMenu(true)}
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
                onClick={() => setProfile(true)}
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
        open={menu}
        onClose={() => setMenu(false)}
        onOpen={() => setMenu(true)}
      >
        <List>
          <Typography style={{ padding: 20 }} variant='h6'>
            TapNotes
          </Typography>
          <ListItem onClick={handleNotes} button>
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
          <ListItem onClick={handleCategory} button>
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
      <Drawer anchor='bottom' open={profile} onClose={() => setProfile(false)}>
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
      </Drawer>
      {showCategory ? (
        <CreateCategory
          handleCategory={handleCategory}
          open={true}
          user={props.user}
        />
      ) : null}
      {showNotes ? (
        <CreateNote handleNotes={handleNotes} open={true} user={props.user} />
      ) : null}

      {props.children}
      <Paper
        elevation={0}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '5vh',
          bottom: 0,
          position: 'absolute'
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Grid alignItems='baseline' container>
              <Grid item>
                <Typography
                  onClick={handleNotes}
                  variant='caption'
                  style={{
                    marginLeft: 8,
                    flex: 1,
                    fontSize: '1rem',
                    paddingRight: 95
                  }}
                >
                  Take a Note...
                </Typography>
              </Grid>
              <Grid item>
                <IconButton>
                  <CheckBoxOutlined />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <Brush />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <Mic />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <Image />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Navigation;
