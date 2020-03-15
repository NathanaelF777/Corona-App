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
      diagnosed: true,
      symptomsClickValue: {
      }
    };

    this.handleAddProfile = this.handleAddProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault()
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // Change background of clicked button
    const buttonClick = () => {
      event.target.style.color = 'black'
      event.target.style.backgroundColor = '#8eedaf'
    }
    // Allow for clicking and 'unclicking.' Push into array if clicked, remove if 'unclicked'
    const controlSymptomsArrayInput = () => {
      // If button is clicked
      if (this.state.symptomsClickValue[value]) {
        event.target.style.backgroundColor = '#ddd'
        const index = this.state.symptoms.findIndex((symptom => symptom === value))
        this.state.symptoms.splice(index, 1)

      // If button is not clicked
      } else {
        // If there are no symptoms, push first symptom into the array
        if (this.state.symptoms.length === 0) {
          this.state.symptoms.push(value)

        // Ensure that each symptom is pushed only once
        } else {
          for (let i = 0; i < this.state.symptoms.length; i++) {
            if (value !== this.state.symptoms[i]) {
            this.state.symptoms.push(value)
            }
          }
        }
      }
      // Change button clicked state
      this.state.symptomsClickValue[value] = !this.state.symptomsClickValue[value]
      this.setState({
        symptomsClickValue: this.state.symptomsClickValue,
        symptoms: this.state.symptoms
      })
    }

    if (target.className === 'btn') {
      buttonClick()
    }

    // Set state of symptoms
    if (name === '') {
      controlSymptomsArrayInput()
    // Set state of other symptoms
    } else if (name === 'other') {
      console.log('other');
    // Set state of all other inputs
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
                  <label>*</label>
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
                  <label>*</label>
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
                  <label>*</label>
                  <select
                  className="btn"
                  name="tested"
                  onChange={this.handleInputChange}
                  required>
                  <option value=""/>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>Diagnosed</th>
                <td>
                  <label>*</label>
                  <select
                  className="btn"
                  name="diagnosed"
                  onChange={this.handleInputChange}
                  required>
                    <option value=""/>
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
