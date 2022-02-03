import React from 'react';
import { ChildAsFC } from './Child';

const Parent = () => {
  return (
    <ChildAsFC color='blue' onClick={()=> console.log('clicked')}>
      <p> I'm a 'chilren' of child</p> 
    </ChildAsFC>
    );
};

export default Parent;
