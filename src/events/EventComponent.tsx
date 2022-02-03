import React from "react";

const EventComponent: React.FC = () => {
  const onChange = (event:React.ChangeEvent<HTMLElement>) => {
    console.log(event);
  };

  return (
    <div>
      <input onChange={onChange}/>
    </div>
  );
};

export default EventComponent;
