import React from "react";
import "./NewProfile.css";

class NewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      gender: '',
      location: 'Not given',
      symptoms: [],
      tested: true,
      diagnosed: true
    };

    this.handleAddProfile = this.handleAddProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault()
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const buttonClick = () => {
        event.target.style.color = 'black'
        event.target.style.backgroundColor = '#8eedaf'
    }

    if (target.className === 'btn') {
      buttonClick()
    }

    if (name === '') {
      this.state.symptoms.push(value)
      this.setState({symptoms: this.state.symptoms})
    } else {
      this.setState({[name]: value});
    }
  }

  handleAddProfile(event) {
    event.preventDefault()

    const profile = {
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender,
      location: this.state.location,
      symptoms: this.state.symptoms,
      tested: this.state.tested,
      diagnosed: this.state.diagnosed,
      condition: this.state.condition
    }

    this.props.handleProfileAdded(profile);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddProfile}>
          <table className="table table-info">
            <tbody>
              <tr>
                <th>Name</th>
                <td>
                  <input
                  size="60"
                  type="text"
                  name="name"
                  placeholder="(leave blank to remain anonymous)"/>
                </td>
              </tr>

              <tr>
                <th>Gender</th>
                <td>
                  <select
                  className="btn"
                  name="gender"
                  onChange={this.handleInputChange}
                  required>
                    <option value=''/>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </td>
              </tr>

              <tr>
                <th>Age</th>
                <td>
                  <input
                  type="number"
                  name="age"
                  value={this.state.age}
                  onChange={this.handleInputChange}
                  required/>
                </td>
              </tr>

              <tr>
                <th>Location (City, State)</th>
                <td>
                  <input
                  type="text"
                  placeholder="New York, NY"
                  name="location"

                  onChange={this.handleInputChange}/>
                </td>
              </tr>

              <tr>
                <th>Symptoms</th>
                <td>
                <a href="">
                  <input
                  className="btn"
                  type="button"
                  value="Cough"
                  onClick={this.handleInputChange}/>
                  <input
                  className="btn"
                  type="button"
                  value="Fever"
                  onClick={this.handleInputChange}/>
                  <input
                  className="btn"
                  type="button"
                  value="Shortness of breath"
                  onClick={this.handleInputChange}/>
                  <input
                  className="btn"
                  name="other"
                  type="button"
                  value="Other"
                  onClick={this.handleInputChange}/>
                  </a>
                  {/*<input
                  type="text"
                  size="60"
                  name="symptoms"
                  placeholder="symptoms, separated, by, commas"
                  value={this.state.value}
                  onChange={this.handleInputChange}/>*/}
                </td>
              </tr>

              <tr>
                <th>Tested</th>
                <td>
                  <label>
                    Tested
                    <input
                    type="checkbox"
                    name="tested"
                    value={this.state.tested}
                    onChange={this.handleInputChange}/>
                  </label>
                </td>
              </tr>
              <tr>
                <th>Diagnosed</th>
                <td>
                  <select
                  className="btn"
                  name="diagnosed"
                  value={this.state.diagnosed}
                  onChange={this.handleInputChange}>
                    <option value="true">Positive</option>
                    <option value="false">Negative</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <input
          type="submit"
          className="btn btn-primary"
          value="Add Profile"/>
        </form>

      </div>
    );
  }

}

export default NewProfile;
