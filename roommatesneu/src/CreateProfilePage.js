import React from 'react'
import { Checkbox } from '@mui/material';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { TextField } from '@mui/material';

function CreateProfilePage() {
  return (
    <div classname="profileCreator">
      <h1>RoommatesNEU</h1>
      <h2>Profile Creator:</h2>

      <TextField id="outlined-basic" label="Name" variant="outlined"/>

      <h2>Preferences</h2>
      <FormGroup>
        <FormControlLabel control={<Checkbox/>} label="Morning Person"/>
        <FormControlLabel control={<Checkbox/>} label="Overnight Guests"/>
        <FormControlLabel control={<Checkbox/>} label="Out Late"/>
        <FormControlLabel control={<Checkbox/>} label="Neat Freak"/>
      </FormGroup>


    </div>
  )
}

export default CreateProfilePage