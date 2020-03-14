import React from "react";
import "./Profiles.css";

class Profiles extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count: 0
        }
        this.updateCount = this.updateCount.bind(this)
    }

updateCount(){ //Need to run this function whenever a new patient is submitted.
    let tempCount = this.state.count
    for (const p of this.props.data) {
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
            {this.props.data.map(profile => {
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
                    <button className="btn btn-danger">
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
