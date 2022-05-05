import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Start from './components/Start';
import Timer from './components/Timer';
import Trivia from './components/Trivia';

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0")

  const data = [
    {
      id: 1,
      question: "Who of this guys is not actively working in the company",
      answers: [
        {
          text: "Yan",
          correct: false
        },
        {
          text: "Yan",
          correct: false
        },
        {
          text: "Yan",
          correct: false
        },
        {
          text: "Yan",
          correct: true
        },
      ]
    },
    {
      id: 2,
      question: "How many Jokers are currently working in the company",
      answers: [
        {
          text: "2",
          correct: false
        },
        {
          text: "5",
          correct: false
        },
        {
          text: "4",
          correct: true
        },
        {
          text: "8",
          correct: false
        },
      ]
    },
    {
      id: 3,
      question: "When the new website will be officially launched",
      answers: [
        {
          text: "April-May/2022",
          correct: true
        },
        {
          text: "June/2022",
          correct: false
        },
        {
          text: "January/2023",
          correct: false
        },
        {
          text: "February-March/2022",
          correct: false
        },
      ]
    }
  ]
  const moneyPyramid = useMemo(() =>
    [{ id: 1, amount: "$100" },
    { id: 2, amount: "$200" },
    { id: 3, amount: "$300" },
    { id: 4, amount: "$500" },
    { id: 5, amount: "$1000" },
    { id: 6, amount: "$2000" },
    { id: 7, amount: "$4000" },
    { id: 8, amount: "$8000" },
    { id: 9, amount: "$16000" },
    { id: 10, amount: "$32000" },
    { id: 11, amount: "$64000" },
    { id: 12, amount: "$125000" },
    { id: 13, amount: "$250000" },
    { id: 14, amount: "$500000" },
    { id: 15, amount: "$1000000" },
    ].reverse(),
    []
  );


  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount)
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
  {username ? (
    <>
    <div className="main">
        {stop ? <h1 className='endText'>You earned: {earned}</h1> : (<>

          <div className="top">

            <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber}/></div>
          </div>
          <div className="bottom">
            <Trivia
              data={data}
              setStop={setStop}
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber} />
          </div>
        </>
        )}

      </div>
      <div className="pyramid">
        <ul className='moneyList'>
          {moneyPyramid.map(i => (
            <li className={questionNumber === i.id ? 'moneyListItem active' : 'moneyListItem'}>
              <span className='moneyListItemNumber'>{i.id}</span>
              <span className='moneyListItemAmount'>{i.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </>

  ): <Start setUsername={setUsername}/>}

    </div>

  );
}

export default App;
