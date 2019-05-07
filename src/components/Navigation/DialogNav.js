import React, { useState } from 'react';
import {
  Paper,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from '@material-ui/core';
import { ArrowBack, Add, MoreVert } from '@material-ui/icons';

export const DialogNav = props => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      elevation={0}
      style={{
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <IconButton onClick={props.handleClose}>
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
        {props.title}
      </Typography>
      {props.notes ? (
        <div>
          <IconButton
            disableRipple
            style={{ paddingRight: 28 }}
            aria-label='More'
            aria-owns={Boolean(anchorEl) ? 'long-menu' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id='long-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: 200
              }
            }}
          >
            <MenuItem
              onClick={() => {
                props.handleAddNote();
                setAnchorEl(null);
              }}
            >
              Add Note
            </MenuItem>
            <MenuItem>Rename</MenuItem>
            <MenuItem>Archive</MenuItem>
            <MenuItem onClick={props.handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
      ) : (
        <div style={{ paddingRight: 48 }} />
      )}
    </Paper>
  );
};
