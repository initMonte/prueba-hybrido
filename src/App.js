import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [counter, setCounter] = useState(0)
  const [inputValue, setInputValue] = useState()
  const [inputError, setInputError] = useState('')
  const [users, setUsers] = useState([])

  const API_URL = 'https://jsonplaceholder.typicode.com/users'

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setUsers(res.data.map(x => ({
          id: x.id,
          email: x.email,
          username: x.username
        })))
      })
      .catch(err => {
        console.error('Error recuperando los datos:', err)
      })
  }, [])

  const handlePlus = () => {
    setCounter(counter + 1)
  }

  //Pude hacerlo con el event finalmente, en vez de manipular el DOM
  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSet = () => {
    const intValue = parseInt(inputValue, 10);

    if (!isNaN(inputValue)) {
      setCounter(intValue);
      setInputError('');
    } else {
      setInputError('Solo se aceptan números enteros');
    }
  }

  return (
    <main className="App">
      <section className='top-section'>
        <h1 className='top-section_h1'>Test Text</h1>
        <p className='top-section_p'>{counter}</p>
      </section>
      <aside className='aside-50'>
        {users && (<ul>{
          users.map(user => (
            <li key={user.id} className='aside-50_li'>{user.email} - {user.username}</li>
          ))
        }</ul>)}
      </aside>
      <section className='bottom-row'>
        <div className='bottom-row_left'>
          <h2 className='bottom-row_left_h2'>Counter Start</h2>
          <input className='bottom-row_left_input' id='input' name='input' onChange={handleChange} value={inputValue}></input>
          {inputError !== '' ? (
            <p className='bottom-row_left_error'>{inputError}</p>
          ) : null}
        </div>
        <div className='bottom-row_center'>
          <button className='button bottom-row_center_button' type='submit' onClick={() => handleSet()}>Set</button>
        </div>
        <div className='bottom-row_right'>
          <button className='button bottom-row_right_button' onClick={() => handlePlus()}>+</button>
        </div>
      </section>
    </main>
  );
}

export default App;
