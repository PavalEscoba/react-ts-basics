import React, { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();

  const onSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    searchRepositories(term);
  };

  const { data, loading, error } = useTypedSelector(
    (state) => state.repositories
  );

  return (
    <>
      <h1>RepositoriesList</h1>
      <form onSubmit={onSubmit}>
        <input
          value={term}
          onChange={(evt) => {
            setTerm(evt.target.value);
          }}
        />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading ...</h3>}
      {!error && !loading && data.map((name) => <div key={name}>{name}</div>)}
    </>
  );
};

export default RepositoriesList;
