import { useState, useEffect } from 'react';
import './App.css';
import Books from './components/Books/Books';
import Login from './components/Login/Login';

function App() {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    document.title = 'Panel administracyjny';
  });

  return (
    <div className="App">
      {auth ? <Books /> : <Login isAdmin={(admin) => setAuth(admin)} />}
    </div>
  );
}

export default App;
