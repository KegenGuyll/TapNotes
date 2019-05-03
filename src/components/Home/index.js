import React, { useState, useEffect, useRef } from 'react';
import db from '../../firebaseConfig';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Badge,
  MenuItem,
  Menu
} from '@material-ui/core';
import { MoreVert, Settings } from '@material-ui/icons';
import { Notes } from '../Notes';
import { toast } from 'react-toastify';

export const Home = props => {
  const [categoryList, setCategoryList] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [data, setData] = useState('');
  const user = props.user;
  const docRef = db.collection('users').doc(user.uid);

  const handleDelete = index => {
    console.log(index);
    // categoryList.categories.splice(index, 1);
    // docRef.update({
    //   categories: categoryList.categories
    // });
  };

  const childRef = useRef();

  const handleRemove = async () => {
    await setToggleDelete(true);
    await setTimeout(() => {
      setToggleDelete(false);
    }, 3000);
  };

  const onListener = () => {
    docRef.onSnapshot(doc => {
      setCategoryList(doc.data());
    });
  };

  const passingData = async card => {
    await setData(card);
    await childRef.current.activeNotes();
  };

  useEffect(() => {
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          onListener();
        } else {
          docRef.set(
            {
              categories: [
                {
                  title: 'Help',
                  description: 'Hold Category to delete them :)',
                  Notes: [
                    {
                      title: 'Welcome to TapNotes',
                      description: 'Thank your for downloading our app!!!'
                    }
                  ],
                  owner: `${user.uid}`,
                  shared: []
                }
              ]
            },
            onListener()
          );
          toast.success(`Welcome to TapNotes ${user.displayName}`, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        }
      })
      .catch(error => {
        toast.error(error.Message, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });

    return function cleanup() {
      console.log('unmount');
    };
  }, []);

  return (
    <div>
      {categoryList.categories &&
        categoryList.categories.map((card, index) => (
          <Card key={index} style={{ margin: 10 }}>
            <IconButton
              aria-haspopup='true'
              disableRipple={true}
              style={{ float: 'right' }}
            >
              <Settings />
            </IconButton>
            <CardContent onClick={() => passingData(card)}>
              <div>
                <Badge color='primary' badgeContent={card.Notes.length}>
                  <Typography
                    style={{ padding: '0 10px 0 0' }}
                    align='left'
                    inline={true}
                    variant='subheading'
                  >
                    {card.title}
                  </Typography>
                </Badge>
              </div>
              <Typography variant='caption'>{card.description}</Typography>
            </CardContent>
          </Card>
        ))}
      <Notes ref={childRef} data={data} />
    </div>
  );
};
