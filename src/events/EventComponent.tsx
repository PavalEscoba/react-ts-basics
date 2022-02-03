import React from 'react';

const EventComponent: React.FC = () => {
  const onChange = (event: React.ChangeEvent<HTMLElement>) => {
    console.log(event);
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("i'm being dragged");
  };

  return (
    <div>
      <input onChange={onChange} />
      <div
        className='drag'
        draggable
        style={{ border: '1px solid red' }}
        onDragStart={onDragStart}
      >
        Drag me
      </div>
    </div>
  );
};

export default EventComponent;
