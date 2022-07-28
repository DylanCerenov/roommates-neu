import './App.css';
import { useState, useEffect } from "react";
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Axios from "axios";

// theme for MUI
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#06283D'
    },
    secondary: {
      main: '#DFF6FF'
    }
  },
  spacing: 8,

});

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
    <ThemeProvider theme = {muiTheme}>
      <Box m={8} pt={0} pb={12}>
        <div className="App">

          <div className="Title">
            <Typography variant="h2" component="div" gutterBottom color="primary" style={{lineHeight: "24px"}}>
              RoommatesNEU
            </Typography>
            <Typography variant="h5" component="div" gutterBottom color="primary">
              A roommate search engine for students at Northeastern University
            </Typography>
          </div>

          <br></br>

          <Box pl={4} pr={4}>
            <div className="SearchCriteria">
              <Typography variant="h6" component="div" gutterBottom color="primary" style={{lineHeight: "24px"}}>
                Enter your preferences below:
              </Typography>
              <FormGroup >
                <FormControlLabel 
                  control={
                    <Checkbox 
                      color="primary" 
                      sx={{ color: "#06283D", '&.Mui-checked': { color: "#06283D", }, }}
                      onChange={(event) => { setSearchFrequentStudier(event.target.checked); }}/>
                  } 
                  label={<Typography color="primary">"I am looking for a roommate who tends to study frequently" </Typography>}
                />
                <FormControlLabel 
                  control={
                    <Checkbox 
                      color="primary" 
                      sx={{ color: "#06283D", '&.Mui-checked': { color: "#06283D", }, }}
                      onChange={(event) => { setSearchExtroverted(event.target.checked); }}/>
                  } 
                  label={<Typography color="primary">"I am looking for a roommate who is generally outgoing" </Typography>} 
                />
                <FormControlLabel 
                  control={
                    <Checkbox 
                      color="primary" 
                      sx={{ color: "#06283D", '&.Mui-checked': { color: "#06283D", }, }}
                      onChange={(event) => { setSearchNeat(event.target.checked); }}/>
                  } 
                  label={<Typography color="primary">"I am looking for a roommate who is a neat person" </Typography>} 
                />
              </FormGroup>
            </div>
          </Box>
          
          <Box pl={4} pr={4} pb={8}>
            <div className="UsersDisplay">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography bold>Name</Typography></TableCell>
                      <TableCell align="right"><Typography bold>Age</Typography></TableCell>
                      <TableCell align="right"><Typography bold>Frequent Studier</Typography></TableCell>
                      <TableCell align="right"><Typography bold>Extroverted</Typography></TableCell>
                      <TableCell align="right"><Typography bold>Neat</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listOfUsers.map((user) => (
                      <TableRow
                        key={user.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {user.name}
                        </TableCell>
                        <TableCell align="right">{user.age}</TableCell>
                        <TableCell align="right">{user.frequentStudier.toString()}</TableCell>
                        <TableCell align="right">{user.extroverted.toString()}</TableCell>
                        <TableCell align="right">{user.neat.toString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
          
          <Box pl={4}>
            <div>
              <Typography variant="h6" component="div" gutterBottom color="secondary">
                Post yourself in our system!<br></br>
                Fill out the questionnaire below!
              </Typography>
            </div>
          </Box>
          <br></br>
          
          <Box pl={4}>
            <div>
              <FormGroup>
                <Box pb={1}><TextField style={{width: '15%', scale: '10%'}} id="outlined-basic" label="Name" variant="outlined" onChange={(event) => { setName(event.target.value); }} color="secondary" sx={{ input: { color: "#DFF6FF" } }} focused/></Box>
                <TextField style ={{width: '15%', scale: '10%'}} id="outlined-basic" label="Age" type="number" variant="outlined" onChange={(event) => { setAge(event.target.value); }} color="secondary" sx={{ input: { color: "#DFF6FF" } }} focused/>
                <FormControlLabel control={<Checkbox color="secondary" sx={{ color: "#DFF6FF", '&.Mui-checked': { color: "#DFF6FF", }, }} onChange={(event) => { setFrequentStudier(event.target.checked); }}/>} label={<Typography color="secondary">"I tend to study frequently"</Typography>} />
                <FormControlLabel control={<Checkbox color="secondary" sx={{ color: "#DFF6FF", '&.Mui-checked': { color: "#DFF6FF", }, }} onChange={(event) => { setExtroverted(event.target.checked); }}/>} label={<Typography color="secondary">"I am generally an outgoing person"</Typography>} />
                <FormControlLabel control={<Checkbox color="secondary" sx={{ color: "#DFF6FF", '&.Mui-checked': { color: "#DFF6FF", }, }} onChange={(event) => { setNeat(event.target.checked); }}/>} label={<Typography color="secondary">"I consider myself a neat person"</Typography>} />
              </FormGroup>
              <br></br>
              <Button onClick={createUser} color="secondary" variant="contained" >
                Create User
              </Button>
            </div>
          </Box>
        </div>
      </Box>
      <Typography align="center" color="secondary">A Project by Dylan Cerenov, Victor Sunderland, and Dylan Dinio</Typography>
    </ThemeProvider>
  );
}

export default App;