import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { Card, CardContent, Typography, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import LongPressable from 'react-longpressable';

export const Home = props => {
  const [categoryList, setCategoryList] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const user = props.user;
  const docRef = db.collection('users').doc(user.uid);

  const handleDelete = index => {
    categoryList.categories.splice(index, 1);
    docRef.update({
      categories: categoryList.categories
    });
  };

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
                  description: 'Hold Category to delete them :)'
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
          <LongPressable
            key={card}
            longPressTime={700}
            onLongPress={handleLongPress}
            onShortPress={none}
          >
            <Card style={{ margin: 10 }}>
              <CardContent>
                {toggleDelete ? (
                  <IconButton
                    color='secondary'
                    onClick={() => handleDelete(index)}
                    aria-haspopup='true'
                    disableRipple={true}
                    style={{ padding: 'unset', float: 'right' }}
                  >
                    <Close />
                  </IconButton>
                ) : null}
                <div>
                  <Typography align='left' inline={true} variant='subheading'>
                    {card.title}
                  </Typography>
                </div>
                <Typography variant='caption'>{card.description}</Typography>
              </CardContent>
            </Card>
          </LongPressable>
        ))}
    </div>
  );
};
