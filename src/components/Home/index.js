import React, { useState, useEffect, useRef } from 'react';
import db from '../../firebaseConfig';
import {
  Card,
  CardContent,
  Typography,
  Badge,
  Slide,
  Chip
} from '@material-ui/core';
import { Notes } from '../Notes';
import { toast } from 'react-toastify';
import help from '../../Common/help.json';

export const Home = props => {
  const [categoryList, setCategoryList] = useState([]);
  const [data, setData] = useState('');
  const [activeIndex, setActiveIndex] = useState('');
  const [showNote, setShowNote] = useState(false);
  const user = props.user;
  const docRef = db.collection('users').doc(user.uid);

  const handleDelete = index => {
    categoryList.categories.splice(index, 1);
    docRef.update({
      categories: categoryList.categories
    });
  };

  const handleNoteClose = () => {
    setShowNote(false);
  };

  const onListener = () => {
    docRef.onSnapshot(doc => {
      setCategoryList(doc.data());
    });
  };

  const unsubscribe = () => {
    docRef.onSnapshot(() => {});
  };

  const passingData = async (card, index) => {
    await setData(card);
    await setActiveIndex(index);
    await setShowNote(true);
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
              categories: [help]
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
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {categoryList.categories &&
        categoryList.categories.map((card, index) => (
          <Slide
            key={index}
            direction={index & 1 ? 'right' : 'left'}
            in={true}
            mountOnEnter
            unmountOnExit
          >
            <Card
              onClick={() => passingData(card, index)}
              style={{ margin: 10 }}
            >
              <CardContent>
                {card.Notes.length > 0 ? (
                  <Chip
                    style={{ float: 'right' }}
                    label={`${card.Notes.length} Notes`}
                    color='primary'
                  />
                ) : null}

                <div>
                  <Typography
                    style={{ padding: '0 10px 0 0' }}
                    align='left'
                    inline={true}
                    variant='subheading'
                  >
                    {card.title}
                  </Typography>
                </div>
                <Typography variant='caption'>{card.description}</Typography>
              </CardContent>
            </Card>
          </Slide>
        ))}
      {showNote ? (
        <Notes
          close={handleNoteClose}
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
