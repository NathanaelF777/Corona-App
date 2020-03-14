import React from "react";
import Profiles from "./components/Profiles";
import NewProfile from "./components/NewProfile";

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'heroku backend url:'
}

console.log('current base URL:', baseURL)



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        addProfile: false,
        data: [],
        changed: false
    };
    this.handleAddProfile = this.handleAddProfile.bind(this);
    this.handleProfileAdded = this.handleProfileAdded.bind(this);
    this.setChanged = this.setChanged.bind(this);
  }

  // Function to set the parent's state
  setChanged() {
    this.setState({ changed: true });
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
            <Profiles setChanged={this.setChanged}/>
          </div>
        )}
      </div>
    );
  }

}

export default App;
