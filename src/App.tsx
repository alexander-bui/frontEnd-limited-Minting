import React, { useEffect, useState } from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const mintButton = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  }
});
function App() {
  const [userId, setUserId] = useState(null);
  const [counter, setCounter] = useState("");
  const [max, setMaxCounter] = useState("");
  const [maxleft, setleft] = useState("");
  var start;
  var left;

  useEffect(() => {
    getData();
  }, [])
  function getData() {
    fetch("http://localhost:8000/mintCount").then((result) => {
      result.json().then((resp => {
        console.log(resp[0].max)
        setCounter(resp[0].start)
        setMaxCounter(resp[0].max)
        setleft(resp[0].left)
        setUserId(resp[0].id)
      }))
    })
  }
  function updateUser()
  {
    if (counter >= max) {
      alert("Cannot mint anymore!")
      return;
    }

    start = counter + 1;
    setCounter(start);
    
    left = parseInt(maxleft) - 1;

    let item={start, left, max}
    console.warn("item",item)
    fetch(`http://localhost:8000/mintCount/${userId}`, {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getData()
      })
    })
  }



  const classes = mintButton();

  return (
    <div className="App">
      <header className="App-header">
          <Button className={classes.root} 
            onClick={() => {
              updateUser();
            }}>
            Click Here</Button>
          <p>Only: {maxleft} left!</p>
      </header>
    </div>
  );
}

export default App;
