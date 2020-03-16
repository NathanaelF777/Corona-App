import React from "react";
import "./New|EditProfile.css";

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
      symptomsClickValue: {}
    };
    this.addOther = this.addOther.bind(this);
    this.removeOther = this.removeOther.bind(this)
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
      event.target.style.backgroundColor = '#8eedaf'
    }
    // Allow for clicking and 'unclicking.' Push into array if clicked, remove if 'unclicked'
    const controlSymptomsArrayInput = () => {
      // Change button clicked state
      this.state.symptomsClickValue[value] = !this.state.symptomsClickValue[value]
      this.setState({symptomsClickValue: this.state.symptomsClickValue})
      // If button is 'unclicked'
      if (!this.state.symptomsClickValue[value]) {
        event.target.style.backgroundColor = '#ffffff'
        const index = this.state.symptoms.findIndex((symptom => symptom === value))
        this.state.symptoms.splice(index, 1)

      // If button is clicked
      } else {
        // If there are no symptoms, push first symptom into the array
        if (this.state.symptoms.length === 0) {
          this.state.symptoms.push(value)

        // Ensure that each symptom is pushed only once
        } else {
          let check = 1
          for (let i = 0; i < this.state.symptoms.length; i++) {
            if (value !== this.state.symptoms[i]) {
              check++
            }
          }
          if (check = this.state.symptoms.length) {
            this.state.symptoms.push(value)
          }
        }
      }
      this.setState({symptoms: this.state.symptoms})
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

  removeOther(value){
      console.log(value);
      const index = this.state.otherSymptoms.findIndex((symptom => symptom === value))
      console.log(index);
      this.state.otherSymptoms.splice(index, 1)
      this.setState({
          otherSymptoms: this.state.otherSymptoms
      })
  }

  handleAddProfile(event) {
    event.preventDefault();
    this.state.symptoms = [...this.state.symptoms, ...this.state.otherSymptoms];
    const profile = {
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender,
      location: this.state.location,
      symptoms: this.state.symptoms,
      tested: this.state.tested,
      diagnosed: this.state.diagnosed
    }
    console.log(profile);
    this.props.handleProfileAdded(profile);
  }

  render() {
    return (
      <div>
        <h1>Add new profile</h1>
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
                      <input
                      style={{backgroundColor: '#8eedaf'}}
                      className="btn"
                      id="other-symptom"
                      type="button"
                      value={symptom}
                      onClick={()=>{this.removeOther(symptom)}}
                      key={i}
                      />
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
                        style={{width:290}}
                        type="text"
                        id="other-symptoms"
                        name="otherSymptomsText"
                        value={this.state.otherSymptomsText}
                        onChange={this.handleInputChange}
                        placeholder="Other Symptoms:"/>
                    <button style={{marginTop: 0}} type="button" className="btn" onClick={this.addOther} >Add</button>
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
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <input
          type="submit"
          className="btn btn-primary"
          value="Add profile"/>
        </form>

      </div>
    );
  }

}

export default NewProfile;
