import React from 'react';
import ReactDOM from 'react-dom';
// import Parent from './props/Parent';
import GuestList from './state/GuestList';
import UserSearch from './state/UserSearch';
import UserSearchClass from './classes/UserSearchClass';
import UserSearchRef from './refs/UserSearchRef';
import EventComponent from './events/EventComponent';
import PackageSearch from './redux/Redux';

const App = () => {
  const users = [
    { name: 'Paval', age: 36 },
    { name: 'Nadzeya', age: 37 },
    { name: 'Uladzislau', age: 12 },
    { name: 'Tadevush', age: 6 },
    { name: 'Maciej', age: 4 },
  ];
  return (
    <div>
      <h1>React TS App</h1>
      {/* <Parent /> */}
      {/* <GuestList /> */}
      {/* <UserSearch /> */}
      {/* <EventComponent /> */}
      {/* <UserSearchClass users={users} /> */}
      {/* <UserSearchRef /> */}
      <PackageSearch />
    </div>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
