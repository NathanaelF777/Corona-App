import React from 'react';

class App extends React.Component {
  render() {
    return (
        <div className="container">
            <h1> Corona Stats </h1>
            <h3>Name</h3>
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
            <h3>Tested</h3>
        </div>
    )
  }
}

export default App;
