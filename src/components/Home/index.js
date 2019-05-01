import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { Card, CardContent, Typography, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

export const Home = props => {
  const [categoryList, setCategoryList] = useState([]);
  const user = props.user;
  const docRef = db.collection('users').doc(user.uid);

  useEffect(() => {
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          docRef.onSnapshot(doc => {
            setCategoryList(doc.data());
          });
        } else {
          docRef.set({
            categories: []
          });
          console.log('Welcome new User');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {categoryList.categories &&
        categoryList.categories.map(card => (
          <Card style={{ margin: 10 }} key={card.title}>
            <CardContent>
              <IconButton
                disableRipple={true}
                style={{ padding: 'unset', float: 'right' }}
              >
                <MoreVert />
              </IconButton>
              <div>
                <Typography align='left' inline={true} variant='subheading'>
                  {card.title}
                </Typography>
              </div>
              <Typography variant='caption'>{card.description}</Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};
