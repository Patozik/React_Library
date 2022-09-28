import { useEffect, useReducer } from 'react';
import './App.css';
import Books from './components/Books/Books';
import Login from './components/Login/Login';
import AuthContext from './context/authContext';
import { reducer, intialState } from './reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    document.title = 'Panel administracyjny';
  });

  return (
    <AuthContext.Provider value={{
      user: state.user,
      login: (user) => dispatch({ type: 'login', user }),
      logout: () => dispatch({ type: 'logout' }),
    }}>
      <div className="App">
        {state.user ? <Books /> : <Login />}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
