import React from "react";
import "./Profiles.css";

class Profiles extends React.Component {

  render() {

    return (
      <div className="profiles-list">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">Gender</th>
              <th className="text-center">Age</th>
              <th className="text-center">Location</th>
              <th className="text-center">Diagnosed</th>
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
                    <button
                    className="btn btn-info"
                    onClick={() => {this.props.handleEditProfile(profile)}}>
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                    className="btn btn-danger"
                    onClick={() => {this.props.deleteData(profile._id)}}>
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
              <td>{this.props.count}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Profiles;
