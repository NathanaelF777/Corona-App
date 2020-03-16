import React from "react";
import "./Profiles.css";

class Profiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };

    this.updateCount = this.updateCount.bind(this);
    this.showProfile = this.showProfile.bind(this);
  }

  updateCount() {
    //Need to run this function whenever a new patient is submitted.
    let tempCount = this.state.count;
    for (const p of this.props.data) {
      if (p.diagnosed) {
        tempCount = tempCount + 1;
      }
    }
    this.setState({
      count: tempCount
    });
  }

  componentDidMount() {
    this.updateCount();
  }

  showProfile(event, index) {
    event.preventDefault();
    this.props.handleShowProfile(index);
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
              <th>{" "}</th>
            </tr>
          </thead>

          <tbody>
            {this.props.data.map((profile, i) => {
              const currentIndex = i;
              return (
                <tr key={profile._id}>
                  <td className="gender">
                    <a href="#show" onClick={event => this.showProfile(event, currentIndex)}>
                      {profile.gender}
                    </a>
                  </td>
                  <td className="age">{profile.age}</td>
                  <td className="location">{profile.location}</td>
                  <td className="diagnosed">{profile.diagnosed ? "Positive" : " "}</td>
                  <td className="commands">
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        this.props.handleEditProfile(currentIndex);
                      }}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.props.deleteData(profile._id);
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-warning font-weight-bolder">
            <tr>
              <td colSpan="3">Total diagnosed:</td>
              <td>{this.state.count}</td>
              <td> </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Profiles;
