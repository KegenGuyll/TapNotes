import React, { useState, useEffect, useRef } from 'react';
import db from '../../firebaseConfig';
import { Card, CardContent, Typography, Badge } from '@material-ui/core';
import { Notes } from '../Notes';
import { toast } from 'react-toastify';

export const Home = props => {
  const [categoryList, setCategoryList] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [data, setData] = useState('');
  const [activeIndex, setActiveIndex] = useState('');
  const user = props.user;
  const docRef = db.collection('users').doc(user.uid);

  const handleDelete = index => {
    categoryList.categories.splice(index, 1);
    docRef.update({
      categories: categoryList.categories
    });
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

  const passingData = async (card, index) => {
    await setData(card);
    await setActiveIndex(index);
    await childRef.current.activeNotes(index);
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
                  description: 'Click Me to find out more :)',
                  Notes: [
                    {
                      title: 'Welcome to TapNotes',
                      description: 'Thank your for downloading our app!!!'
                    },
                    {
                      title: 'Notes',
                      description:
                        'This is where all of your notes will be displayed'
                    },
                    {
                      title: 'Delete Categories',
                      description:
                        'To delete categories you just press the 3 dots in the corner :)'
                    },
                    {
                      title: 'Delete Notes',
                      description: 'Just click the X attached to the card'
                    },
                    {
                      title: 'Create Notes',
                      description:
                        'Select Notes in the menu, It is the first in the list'
                    },
                    {
                      title: 'Create Categories',
                      description:
                        'Select "Create new category" in the menu, It is the third in the list'
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
          <Card
            onClick={() => passingData(card, index)}
            key={index}
            style={{ margin: 10 }}
          >
            <CardContent>
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
      {data !== '' ? (
        <Notes
          ref={childRef}
          index={activeIndex}
          categoryList={categoryList}
          data={data}
          user={user}
          handleDelete={handleDelete}
        />
      ) : null}
    </div>
  );
};
