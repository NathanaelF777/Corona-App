import React from "react";

class ShowProfile extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
      <div>
        <h1>Profile: {profile.name || "Anonymous"}</h1>
        <table className="table table-info">
          <tbody>
            <tr>
              <th>Age</th>
              <td>{profile.age}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{profile.gender}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{profile.location}</td>
            </tr>
            <tr>
              <th>Symptoms</th>
              <td>{profile.symptoms.join(", ")}</td>
            </tr>
            <tr>
              <th>Tested</th>
              <td>{profile.tested ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th>Diagnosed</th>
              <td>{profile.diagnosed ? "Positive" : "Negative"}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-warning" onClick={this.props.handleBack}>
          Cancel
        </button>
      </div>
    );
  }
}

export default ShowProfile;
