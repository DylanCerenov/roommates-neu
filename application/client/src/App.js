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

  // variables for searching for relevant roommates in the table 
  const [searchFrequentStudier, setSearchFrequentStudier] = useState(false);
  const [searchExtroverted, setSearchExtroverted] = useState(false);
  const [searchNeat, setSearchNeat] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data.sort(compatibilitySort));
    });
  }, [listOfUsers]);

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
      ].sort(compatibilitySort));
    });
  }

  // compares two user objects to the search requirements
  function compatibilitySort(a, b) {

    let numKeys = Object.keys(a).length - 2; 
    let aComparisonValue = 0.0;
    let bComparisonValue = 0.0; 

    // User A similarities
    if (a.frequentStudier === searchFrequentStudier) {
      aComparisonValue = aComparisonValue + (1.00 / numKeys);
    }

    if (a.extroverted === searchExtroverted) {
      aComparisonValue = aComparisonValue + (1.00 / numKeys);
    }

    if (a.neat === searchNeat) {
      aComparisonValue = aComparisonValue + (1.00 / numKeys);
    }

    // User B similariies 
    if (b.frequentStudier === searchFrequentStudier) {
      bComparisonValue = bComparisonValue + (1.00 / numKeys);
    }

    if (b.extroverted === searchExtroverted) {
      bComparisonValue = bComparisonValue + (1.00 / numKeys);
    }

    if (b.neat === searchNeat) {
      bComparisonValue = bComparisonValue + (1.00 / numKeys);
    }

    if (aComparisonValue > bComparisonValue) {
      return -1; 
    }
    return 1; 
  }

  return (
    <div className="App">

      <div className="Title">
        <h1>RoommatesNEU</h1>
        <h2>A roommate search engine</h2>
      </div>

      <div className="SearchCriteria">
        <h3>Enter your preferences below:</h3>

        <input type="checkbox" id="lookingForStudy" onChange={(event) => { setSearchFrequentStudier(event.target.checked); }}/>
        <label for="lookingForStudy"> I am looking for a roommate who tends to study frequently </label> <br></br>

        <input type="checkbox" id="lookingForExtrovert" onChange={(event) => { setSearchExtroverted(event.target.checked); }}/>
        <label for="lookingForExtrovert"> I am looking for a roommate who is generally outgoing </label> <br></br>

        <input type="checkbox" id="lookingForNeat" onChange={(event) => { setSearchNeat(event.target.checked); }}/>
        <label for="lookingForNeat"> I am looking for a roommate who is a neat person </label> <br></br>

        <br></br>
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