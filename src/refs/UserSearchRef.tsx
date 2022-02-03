import { useState, useRef, useEffect } from 'react';

const users = [
  { name: 'Paval', age: 36 },
  { name: 'Nadzeya', age: 37 },
  { name: 'Uladzislau', age: 12 },
  { name: 'Tadevush', age: 6 },
  { name: 'Maciej', age: 4 },
];

const UserSearchRef: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }, []);

  const onClick = () => {
    const foundUser = users.find((user) => user.name === name);
    setUser(foundUser);
    setName('');
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  };

  return (
    <>
      <h3> User Search</h3>
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onClick}> Find User</button>
      {user ? (
        <>
          <p>user name: {user.name}</p>
          <p>user age: {user.age}</p>
        </>
      ) : (
        <p>Nothing found</p>
      )}
    </>
  );
};

export default UserSearchRef;
