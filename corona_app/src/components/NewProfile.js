import React from "react";

class NewProfile extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddProfile = this.handleAddProfile.bind(this);
  }

  render() {
    return (
      <div>
        <form>
          <table className="table table-info">
            <tbody>
              <tr>
                <th>Name (leave blank if you want to be anonymous)</th>
                <td>
                  <input size="60" type="text" name="name" />
                </td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>
                  <select name="gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>Age</th>
                <td>
                  <input type="number" name="age" />
                </td>
              </tr>
              <tr>
                <th>Location (City, State)</th>
                <td>
                  <input type="text" placeholder="New York, NY" name="location" />
                </td>
              </tr>
              <tr>
                <th>Symptoms</th>
                <td>
                  <div>
                    <label>
                      Cough
                      <input type="checkbox" name="sym_cough" id="sym_cough" />
                    </label>
                  </div>
                  <div>
                    <label>
                      Fever
                      <input type="checkbox" name="sym_fever" id="sym_fever" />
                    </label>
                  </div>
                  <div className="form-check">
                    <label>
                      Shortness of breath
                      <input type="checkbox" name="sym_sob" id="sym_sob" />
                    </label>
                  </div>
                  <div>
                    <input type="text" size="60" name="sym_others" placeholder="comma, separated, symptoms" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>Tested</th>
                <td>
                  <label>
                    Tested
                    <input type="checkbox" name="tested" />
                  </label>
                </td>
              </tr>
              <tr>
                <th>Diagnosed</th>
                <td>
                  <select name="diagnosed">
                    <option value="true">Positive</option>
                    <option value="false">Negative</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <button className="btn btn-primary" onClick={this.handleAddProfile}>
          Add Profile
        </button>
      </div>
    );
  }

  handleAddProfile() {
    const profile = {
      // Fill this up with real data ...
      gender: "Male",
      age: 55,
      location: "General Assembly",
      diagnosed: true
    };

    this.props.handleProfileAdded(profile);
  }
}

export default NewProfile;
