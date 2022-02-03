import { useState } from 'react';

const GuestList:React.FC = () => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState<string[]>([]); 
  // <string[]> important to show TS that it will be array of strings otherwise it will think that it's an empty array with 'never' type

  const onClick = () => {
    setName('');
    setGuests([...guests, name])
  };

  return (
    <div>
      <h1>
        Guest List
      </h1>
      <ul>
        {guests.map(guest => (
          <li key={guest}>{guest}</li>
        ))}
      </ul>
      <input value={name} onChange={(e)=> setName(e.target.value)} />
      <button onClick={onClick}>Add Guest</button>
    </div>
  );
};

export default GuestList;

