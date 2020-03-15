import React from "react";
import "./New|EditProfile.css";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.currentProfile.name,
      age: this.props.currentProfile.age,
      gender: this.props.currentProfile.gender,
      location: this.props.currentProfile.location,
      symptoms: [],
      tested: this.props.currentProfile.tested,
      diagnosed: this.props.currentProfile.diagnosed,
      symptomsClickValue: {}
    };

    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddMore = this.handleAddMore.bind(this)
  }

  componentDidMount () {
    this.props.currentProfile.symptoms.map(symptom => {this.state.symptoms.push(symptom)})
  }

  handleInputChange(event) {
    event.preventDefault()
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(value);
    // Allow for clicking and 'unclicking.' Push into array if clicked, remove if 'unclicked'
    const controlSymptomsArrayInput = () => {
      // Change button clicked state
      this.state.symptomsClickValue[value] = !this.state.symptomsClickValue[value]
      this.setState({symptomsClickValue: this.state.symptomsClickValue})
      // If button is clicked
      if (this.state.symptomsClickValue[value]) {
        event.target.style.backgroundColor = '#ddd'
        const index = this.state.symptoms.findIndex((symptom => symptom === value))
        this.state.symptoms.splice(index, 1);
      // If button is 'unclicked'
      } else {
        event.target.style.backgroundColor = '#8eedaf'
        this.state.symptoms.push(value)
      }
      this.setState({sypmtoms: this.state.symptoms})
    }


    // Set state of symptoms
    if (name === '') {
      controlSymptomsArrayInput()
    // Set state of 'other' symptoms
  } else if (name === 'other') {
    this.state.symptomsClickValue[value] = !this.state.symptomsClickValue[value]
    this.setState({symptomsClickValue: this.state.symptomsClickValue})
    if (!this.state.symptomsClickValue[value]) {
      event.target.style.backgroundColor = '#ddd'
    } else {
      event.target.style.backgroundColor = '#8eedaf'
    }
      this.setState({otherSymptomsInput: !this.state.otherSymptomsInput})
    // Set state of all other inputs
    } else {
      this.setState({[name]: value});
    }
  }

  handleAddMore(event) {
    event.preventDefault()
    // Push value into symptoms array
    const oldInput = document.querySelector('.additionalSymptoms')
    this.state.symptoms.push(oldInput.value)
    this.setState({symptoms: this.state.symptoms})

    // Create new input and remove old input
    const newInput = document.createElement("INPUT")
    newInput.style.width = `${oldInput.offsetWidth}px`
    oldInput.remove()
    const addMore = document.querySelector('#addMore')
    setTimeout(function(){
      newInput.className = 'additionalSymptoms'
      newInput.placeholder = 'Type other symptom here'
      addMore.insertAdjacentElement('beforebegin', newInput)
    }, 500);
  }

  handleEditProfile(event) {
    event.preventDefault()

    const profile = {
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender,
      location: this.state.location,
      symptoms: this.state.symptoms,
      tested: this.state.tested,
      diagnosed: this.state.diagnosed,
    }

    this.props.editData(profile);
  }

  render() {

    return (
      <div>
        <h1>Profile: {this.props.currentProfile._id}</h1>

        <form onSubmit={this.handleEditProfile}>
          <table className="table table-info">
            <tbody>
              <tr>
                <th>Name</th>
                <td>
                  <input
                  size="60"
                  type="text"
                  name="name"
                  value={this.state.name}
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
                  style={{backgroundColor: "#8eedaf"}}
                  name="gender"
                  onChange={this.handleInputChange}
                  required>
                    <option value={this.state.gender}>
                    {this.props.currentProfile.gender}
                    </option>
                    {this.state.gender === "Male" ?
                      <option value="Female">Female</option>
                    : <option value="Male">Male</option>}

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
                  value={this.state.location}
                  onChange={this.handleInputChange}/>
                </td>
              </tr>

              <tr>
                <th>Symptoms</th>
                <td>
                  <div>
                    {this.props.currentProfile.symptoms.map((symptom, i) => {
                      return (
                        <input
                        style={{backgroundColor: "#8eedaf"}}
                        key={i}
                        type="button"
                        id={symptom}
                        value={symptom}
                        className="btn"
                        onClick={this.handleInputChange}/>)
                      })}
                      <input
                      className="btn"
                      name="other"
                      type="button"
                      value="Other"
                      onClick={this.handleInputChange}/>
                    </div>
                    {this.state.otherSymptomsInput
                      ? <div style={{marginTop: "2vw"}}>
                          <input
                          className="additionalSymptoms"
                          style={{width: 290}}
                          type="text"
                          placeholder="Type other symptom here"/>
                          <button
                          style={{
                            padding: '2px',
                            marginTop: 0
                          }}
                          id="addMore"
                          className="btn"
                          onClick={this.handleAddMore}>
                            Add
                          </button>
                        </div>
                      : <div/>
                    }
                </td>
              </tr>

              <tr>
                <th>Tested</th>
                <td>
                  <select
                  style={{backgroundColor: "#8eedaf"}}
                  className="btn"
                  name="tested"
                  onChange={this.handleInputChange}>
                  <option value={this.state.tested}>
                    {this.state.tested ?
                      'Yes'
                    : 'No'}
                  </option>
                  {this.state.tested ?
                    <option value={false}>No</option>
                  : <option value={true}>Yes</option>}
                  </select>
                </td>
              </tr>

              <tr>
                <th>Diagnosed</th>
                <td>
                  <select
                  className="btn"
                  style={{backgroundColor: "#8eedaf"}}
                  name="diagnosed"
                  onChange={this.handleInputChange}>
                  <option value={this.state.diagnosed}>
                    {this.state.diagnosed ?
                      'Positive'
                    : 'Negative'}
                  </option>
                  {this.state.diagnosed ?
                    <option value={false}>Negative</option>
                  : <option value={true}>Positive</option>}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <input
          type="submit"
          className="btn btn-primary"
          value="Edit Profile"/>
        </form>

      </div>
    );
  }

}

export default EditProfile;
