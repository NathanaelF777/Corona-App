import React from 'react';
import Results from './components/Results.js'

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'your heroku backend url here'
}

// baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
console.log('current base URL:', baseURL)



class App extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
     fields: []
   }
   this.getFields = this.getFields.bind(this)
 }

 componentDidMount() {
  this.getFields()
  }


 async getFields() {
   try {
     let response = await fetch(`${baseURL}/corona-app`);
     let data = await response.json()
     this.setState({fields: data})
    } catch(e){
       this.setState({fields: []})
       console.error(e)
    }
 }

  render() {
    return (
      <div>
        Hey!

        <Results/>

      </div>
    )
  }
}


export default App;
