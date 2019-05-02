import React, { useState, useEffect, useRef } from 'react';
import db from '../../firebaseConfig';
import { Card, CardContent, Typography, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import LongPressable from 'react-longpressable';
import { Notes } from '../Notes';

export const Home = props => {
  const [categoryList, setCategoryList] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [data, setData] = useState('');
  const user = props.user;
  const docRef = db.collection('users').doc(user.uid);

  const handleDelete = index => {
    categoryList.categories.splice(index, 1);
    docRef.update({
      categories: categoryList.categories
    });
  };

  const childRef = useRef();

  const none = () => {};

  const handleLongPress = async () => {
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
                  ]
                }
              ]
            },
            onListener()
          );
          console.log('Welcome new User');
        }
      })
      .catch(error => {
        console.log(error);
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
            <CardContent>
              {toggleDelete ? (
                <IconButton
                  color='secondary'
                  onClick={() => handleDelete(index)}
                  aria-haspopup='true'
                  disableRipple={true}
                  style={{ padding: 'unset', float: 'right', zIndex: 1000 }}
                >
                  <Close />
                </IconButton>
              ) : null}
              <LongPressable
                longPressTime={700}
                onLongPress={handleLongPress}
                onShortPress={() => passingData(card)}
              >
                <div>
                  <Typography align='left' inline={true} variant='subheading'>
                    {card.title}
                  </Typography>
                </div>
                <Typography variant='caption'>{card.description}</Typography>
              </LongPressable>
            </CardContent>
            <Notes ref={childRef} data={data} />
          </Card>
        ))}
    </div>
  );
};
