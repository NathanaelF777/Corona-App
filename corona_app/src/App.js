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
        count: 0
    };
    this.getData = this.getData.bind(this)
    this.handleAddProfile = this.handleAddProfile.bind(this);
    this.handleProfileAdded = this.handleProfileAdded.bind(this);
    this.deleteData = this.deleteData.bind(this)
    this.updateCount = this.updateCount.bind(this)
  }

  componentDidMount(){
      this.getData()
  }

  updateCount() { //Need to run this function whenever a new patient is submitted.
    let tempCount = 0
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].diagnosed) {
        tempCount++
      }
    }
    this.setState({count: tempCount})
  }

  async getData () {
    try {
      let response = await fetch(`${baseURL}/corona-app`)
      let data = await response.json();
      this.setState({data: data});
      this.updateCount()
    } catch(e) {
      this.setState({data: []})
      console.error(e);
    }
  }

  // Function to set the parent's state

  handleAddProfile() {
    this.setState({
      addProfile: true,
      data: this.state.data
    });
  }

  async handleProfileAdded (profile) {
    this.setState({addProfile: false})

    try {
      let response =   await fetch(baseURL + '/corona-app', {
        method: 'POST',
        body: JSON.stringify(profile),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      let newData =  await response.json()
      this.state.data.unshift(newData)
      this.setState({data: this.state.data})
      this.updateCount()
    } catch(e) {
      console.error(e)
    }
  }

  async deleteData (id){
   try {
   let response = await fetch(baseURL + '/corona-app/' +  id, {
      method: 'DELETE'
      })
      let data = await response.json()
      const selectedData = this.state.data.findIndex(profile => profile._id === id)
      this.state.data.splice(selectedData, 1)
      this.setState({data: this.state.data})
      this.updateCount()
   } catch(e){
     console.error(e)
   }
  }

  render() {
    return (
      <div className="container">
        <h1>Corona Stats</h1>
        {this.state.addProfile ? (
          <NewProfile
          handleProfileAdded={this.handleProfileAdded}
          data={this.state.data}/>
        ) : (
          <div>
            <button className="btn btn-info" onClick={this.handleAddProfile}>
              Add new profile
            </button>
            <Profiles
            setChanged={this.setChanged}
            deleteData={this.deleteData}
            data={this.state.data}
            count={this.state.count}/>
          </div>
        )}
      </div>
    );
  }

}

export default App;
