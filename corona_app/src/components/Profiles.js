import React from 'react';
import './Profiles.css';

class Profiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data
    };
  }

  render() {
    return (
      <div class="profiles-list">
        <table class="table table-striped">
          <thead>
            <th>Gender</th>
            <th>Age</th>
            <th>Location</th>
            <th>Diagnosed</th>
            <th>{" "}</th>
          </thead>
          <tbody>
            {this.state.data.map(profile => {
              return (
                <tr key={profile._id}>
                  <td class="gender">{profile.gender}</td>
                  <td class="age">{profile.age}</td>
                  <td class="location">{profile.location}</td>
                  <td class="diagnosed">{profile.diagnosed ? "Y" : " "}</td>
                  <td class="commands">
                    <button class="btn btn-danger">X</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Profiles;
