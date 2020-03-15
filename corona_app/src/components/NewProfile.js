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
      otherSymptomsInput: false,
      otherSymptomsText: '',
      otherSymptoms: [],
      tested: true,
      diagnosed: true,
      symptomsClickValue: {},
    };

    this.handleAddProfile = this.handleAddProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addOther = this.addOther.bind(this);
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
    // Set state of 'other' symptoms
} else if (name === '+') {
      this.setState({otherSymptomsInput: !this.state.otherSymptomsInput})
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

  addOther(event){
      const newSymptom = this.state.otherSymptomsText;
      const newSymptomArray = this.state.otherSymptoms;
      newSymptomArray.push(newSymptom)
      this.setState({
          otherSymptomsInput: false,
          otherSymptomsText: '',
          otherSymptoms: newSymptomArray
      })
  }

  render() {
    return (
      <div>
        <h1>Create new profile</h1>
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
                  placeholder="(leave blank to remain anonymous)"
                  onChange={this.handleInputChange}/>
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
                  <div>
                  <input
                  className="btn"
                  id="Cough"
                  type="button"
                  value="Cough"
                  onClick={this.handleInputChange}/>
                  <input
                  className="btn"
                  id="Fever"
                  type="button"
                  value="Fever"
                  onClick={this.handleInputChange}/>
                  <input
                  className="btn"
                  id="Shortness of breath"
                  type="button"
                  value="Shortness of breath"
                  onClick={this.handleInputChange}/>
              {this.state.otherSymptoms.map((symptom, i) => {
                  return(
                      <>
                      <input
                      className="btn other-symptom"
                      id="other-symptom"
                      type="button"
                      value={symptom}
                      key={i}
                      />
                      </>
                  )
              })}
                  <input
                  className="btn"
                  name="+"
                  type="button"
                  value="+"
                  onClick={this.handleInputChange}/>
                  </div>
                  {this.state.otherSymptomsInput
                    ? <div style={{marginTop: "1vw"}}>
                        <input
                        style={{width:
                          document.getElementById('Cough').offsetWidth +
                          document.getElementById('Fever').offsetWidth +
                          document.getElementsByName('+')[0].offsetWidth}}
                        type="text"
                        id="other-symptoms"
                        name="otherSymptomsText"
                        value={this.state.otherSymptomsText}
                        onChange={this.handleInputChange}
                        placeholder="Other Symptoms:"/>
                    <button type="button" className="btn" onClick={this.addOther} >Add</button>
                      </div>
                    : <div/>
                  }
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
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
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
                    <option value={true}>Positive</option>
                    <option value={false}>Negative</option>
                    <option value={false}>Unknown</option>
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
