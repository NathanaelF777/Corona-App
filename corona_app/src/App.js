import React from 'react';
import Profiles from './components/Profiles';

class App extends React.Component {
  constructor() {
    super();

    this.state = {};
    this.state.data = [
      {
        _id: "1",
        gender: "Male",
        age: "70",
        location: "Kirkland",
        diagnosed: true
      },
      {
        _id: "2",
        gender: "Female",
        age: "50",
        location: "Kirkland",
        diagnosed: false
      },
      {
        _id: "3",
        gender: "Female",
        age: "60",
        location: "New York",
        diagnosed: true
      }
    ]
  }

  render() {
    return (
        <div className="container">
            <h1> Corona Stats </h1>

            <Profiles data={this.state.data} />
            {/* <h3>Name</h3>
            <h3>Age</h3>
            <h3>Gender</h3>
            <h3>Location</h3>
            <h3>
                Symptons
                <h4>New</h4>
                <h4>Fever</h4>
                <h4>SOB</h4>
                <h4>Cough</h4>
            </h3>
            <h3>Tested</h3> */}
        </div>
    )
  }
}

export default App;
