import { Component } from 'react';
interface User {
  name: string;
  age: number;
}

interface UserSearchProps {
  users: User[];
}

interface UserSearchState {
  name: string;
  user: User | undefined;
}

class UserSearchClass extends Component<UserSearchProps> {
  state: UserSearchState = {
    name: '',
    user: undefined,
  };

  onClickHandler = () => {
    const foundUser = this.props.users.find(
      (user) => user.name === this.state.name
    );
    this.setState({ user: foundUser });
  };

  render() {
    const { name } = this.state;
    return (
      <>
        <h3 className='class'> User Search</h3>
        <input
          value={name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <button onClick={this.onClickHandler}> Find User</button>
        {this.state.user ? (
          <>
            <p>user name: {this.state.user.name}</p>
            <p>user age: {this.state.user.age}</p>
          </>
        ) : null}
      </>
    );
  }
}

export default UserSearchClass;
