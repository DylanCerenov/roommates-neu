import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]); // the list of our users 

  // each variable in the User object 
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [frequentStudier, setFrequentStudier] = useState(false);
  const [extroverted, setExtroverted] = useState(false); 
  const [neat, setNeat] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  // Function that calls the createUser api endpoint with the data inputted from the user 
  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name, 
      age, 
      frequentStudier,
      extroverted,
      neat
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers, 
        {
          name, 
          age, 
          frequentStudier,
          extroverted,
          neat
        },
      ]);
    });
  }

  return (
    <div className="App">

      <div className="Title">
        <h1>RoommatesNEU</h1>
        <h2>A roommate search engine</h2>
      </div>

      <div className="UsersDisplay">
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Frequent Studier</th>
              <th>Extroverted</th>
              <th>Neat</th>
            </tr>
            {listOfUsers.map((user, i) => (
              <tr key={i}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.frequentStudier.toString()}</td>
                <td>{user.extroverted.toString()}</td>
                <td>{user.neat.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>
          Post yourself in our system!<br></br>
          Fill out the questionnaire below!
        </h3>
      </div>

      <div>
        <input type="text" placeHolder="Name..." onChange={(event) => { setName(event.target.value); }}/> <br></br>

        <input type="number" placeHolder="Age..." onChange={(event) => { setAge(event.target.value); }}/> <br></br>

        <input type="checkbox" id="studyHuh" onChange={(event) => { setFrequentStudier(event.target.checked); }}/>
        <label for="studyHuh"> I tend to study frequently </label> <br></br>

        <input type="checkbox" id="extrovertedHuh" onChange={(event) => { setExtroverted(event.target.checked); }}/>
        <label for="extrovertedHuh"> I am generally an outgoing person </label> <br></br>

        <input type="checkbox" id="neatHuh" onChange={(event) => { setNeat(event.target.checked); }}/>
        <label for="neatHuh"> I consider myself a neat person </label> <br></br>

        <button onClick={createUser}> Create User </button>
      </div>
    </div>
  );
}

export default App;