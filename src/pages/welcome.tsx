import React from 'react';
import { useWelcomeStyles } from '@/static/stylesheets';

const Welcome = () => {
  const classes = useWelcomeStyles();

  return (
    <div className={classes.root}>
      Hello
    </div>
  );
};

export default Welcome;
