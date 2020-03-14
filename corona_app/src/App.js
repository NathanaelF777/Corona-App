import React from "react";
import Profiles from "./components/Profiles";
import NewProfile from "./components/NewProfile";

class App extends React.Component {
  constructor() {
    super();

    this.state = {};
    this.state.addProfile = false;
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
    ];

    this.handleAddProfile = this.handleAddProfile.bind(this);
    this.handleProfileAdded = this.handleProfileAdded.bind(this);
  }

  render() {
    return (
      <div className="container">
        <h1>Corona Stats</h1>
        {this.state.addProfile ? (
          <NewProfile handleProfileAdded={this.handleProfileAdded} />
        ) : (
          <div>
            <button className="btn btn-info" onClick={this.handleAddProfile}>
              Add new profile
            </button>
            <Profiles data={this.state.data} />
          </div>
        )}
      </div>
    );
  }

  handleAddProfile() {
    this.setState({
      addProfile: true
    });
  }

  handleProfileAdded(profile) {
    console.log(profile);
    this.setState({
      data: [profile, ...this.state.data],
      addProfile: false
    });
  }
}

export default App;
