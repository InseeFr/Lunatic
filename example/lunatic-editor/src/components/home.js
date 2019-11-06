import React, { useState } from 'react';
import { data as initD, questionnaire as initQ } from 'utils/default';
import Left from './left';
import Right from './right';
import './home.scss';

const Home = () => {
  const [context, setContext] = useState('questionnaire');
  const [data, setData] = useState(initD);
  const [questionnaire, setQuestionnaire] = useState(initQ);
  const [error, setError] = useState('');

  const handler = context === 'questionnaire' ? setQuestionnaire : setData;
  const json = context === 'questionnaire' ? questionnaire : data;

  return (
    <div className="container">
      <div>
        <button type="button" className="btn" onClick={() => setContext('questionnaire')}>
          Questionnaire
        </button>
        <button type="button" className="btn" onClick={() => setContext('data')}>
          Data
        </button>
      </div>
      <div className="panel-container">
        <div className="panel-left">
          <Left json={json} handler={handler} setError={setError} context={context} />
        </div>
        <div className="panel-right">
          <Right source={questionnaire} data={data} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Home;
