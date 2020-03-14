import React from "react";
import "./Profiles.css";

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'heroku backend url:'
}


class Profiles extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count: 0,
            data: []
        }
        this.updateCount = this.updateCount.bind(this)
        this.getData = this.getData.bind(this)
        this.deleteData = this.deleteData.bind(this)
    }

updateCount(){ //Need to run this function whenever a new patient is submitted.
    let tempCount = this.state.count
    for (const p of this.state.data) {
      if (p.diagnosed) {
          tempCount = tempCount + 1
      }
    }
    this.setState({
        count: tempCount
    })
}

componentDidMount(){
    this.updateCount()
    this.getData()
}

async getData () {
  try {
    let response = await fetch(`${baseURL}/corona-app`)
    let data = await response.json();
    this.setState({data: data});
  } catch(e) {
    this.setState({data: []})
    console.error(e);
  }
}

async deleteData (id){
 console.log(`I made a delete request to here: ${baseURL}/corona-app/${id}`)
 try {
 let response = await fetch(baseURL + '/corona-app/' +  id, {
    method: 'DELETE'
    })
    let data = await response.json()
    const foundData = this.state.data.findIndex(profile => profile._id === id)
    const copyData = [...this.state.data]
    copyData.splice(foundData, 1)
    this.setState({data: copyData})
    this.props.setChanged()
 } catch(e){
   console.error(e)
 }
}

  render() {
    return (
      <div className="profiles-list">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Gender</th>
              <th>Age</th>
              <th>Location</th>
              <th>Diagnosed</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(profile => {
              return (
                <tr key={profile._id}>
                  <td className="gender">{profile.gender}</td>
                  <td className="age">{profile.age}</td>
                  <td className="location">{profile.location}</td>
                  <td className="diagnosed">{profile.diagnosed ? "Y" : " "}</td>
                  <td className="commands">
                    <button className="btn btn-info">
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                    className="btn btn-danger"
                    onClick={()=>{ this.deleteData(profile._id)}}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total diagnosed:</td>
              <td>{this.state.count}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Profiles;
