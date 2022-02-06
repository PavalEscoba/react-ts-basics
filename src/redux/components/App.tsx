import { Provider } from 'react-redux';
import { store } from '../state';
import RepositoriesList from '../components/RepositoriesList';

const App = () => {
  return (
    <Provider store={store}>
      <RepositoriesList />
    </Provider>
  );
};

export default App;
