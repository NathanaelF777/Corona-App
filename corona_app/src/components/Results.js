import React from 'react';

class Results extends React.Component {
  render() {
    return (
      <div className="results">
        <iframe src="https://www.cdc.gov/coronavirus/2019-ncov/about/index.html"/>
        <iframe src="https://www.who.int/news-room/q-a-detail/q-a-coronaviruses"/>
        <iframe src="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"/>
      </div>
      )
  }
}

export default Results;
