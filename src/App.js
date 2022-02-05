// App.js
import React from 'react';
import DatePicker from 'react-datepicker';
import subDays from 'date-fns/subDays';
import {Button} from '@material-ui/core';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import { TextField } from '@material-ui/core';

function PrintPrice(props) {
  if (props.yesWeekday.includes('Sat') || props.yesWeekday.includes('Sun')) {
    return <p> Hourly price is $150<br></br>Estimated total price of: ${props.yeshours*150} <br></br>for {props.yesWeekday}</p>;
  }
  return <p> Hourly price is $100<br></br>Estimated total price of: ${props.yeshours*100} <br></br>for {props.yesWeekday}</p>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      value: ''
    };
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangehours = this.handleChangehours.bind(this);
}

handleChange(date) {
  this.setState({
    startDate: date,
  });
}

handleChangehours(e){
  this.setState({
    value: e.target.value
  });
}

handleSubmit(e) {
  e.preventDefault();
  console.log(this.state.startDate, this.state.value)
}

  render() {
    const weekday = this.state.startDate;
    const hours = this.state.value;

    return (
      <React.Fragment>
      <CssBaseline />
      <br></br>
      <Container maxWidth="sm">
        <Typography variant="h3" gutterBottom component="div">Book your dates</Typography>
        <form onSubmit={ this.handleSubmit }>
        <div className="number-inputs" >
          <Typography variant="h5" gutterBottom component="div">Number of hours needed:</Typography>
            <TextField 
              type="number"
              id="outlined-textarea"
              label="Hours"
              value={this.state.value}
              onChange={this.handleChangehours}
              placeholder="0"
              />    
              <p></p>
          <Typography variant="h5" gutterBottom component="div"> Select a day and time: </Typography>
            <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleChange }
              name="startDate"
              minDate={subDays(new Date(),-1)}
              timeInputLabel="Time:"
              dateFormat="EEE MM/dd/yyyy h:mm aa"
              minTime={new Date(0,0,0,8,0)}//8:00am
              maxTime={new Date(0,0,0,20,0)}//8:00pm
              showTimeSelect
              timeFormat="hh:mm a"
              timeIntervals={30}  
            /> 
        </div>
        </form>
        <br></br>
        <Button color="primary" variant="contained"> Select Date</Button>
        <Typography variant="h5" gutterBottom component="div">
        <br></br>
        <PrintPrice
          yesWeekday={String(weekday)}
            yeshours = {hours}
          />
        </Typography>
      </Container>
    </React.Fragment>
    );
  }
}

export default App;
