import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleGoodClick = () => {
    setAll(allClicks.concat("good"));
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setAll(allClicks.concat("neutral"));
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setAll(allClicks.concat("bad"));
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        <div>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            allClicks={allClicks}
          />
        </div>
      </div>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = props => (
  <tr>
    <td>
      {props.text} {props.value}
    </td>
  </tr>
);

const Statistics = props => {
  const average = () => {
    let hyvat = 0;
    props.allClicks.forEach(value => {
      if (value === "good") {
        hyvat++;
      } else if (value === "bad") {
        hyvat--;
      }
    });
    return hyvat / props.allClicks.length;
  };

  const positive = () => {
    let hyvat = 0;
    props.allClicks.forEach(value => {
      if (value === "good") {
        hyvat++;
      }
    });
    return (hyvat / props.allClicks.length) * 100 + " %";
  };

  if (props.allClicks.length === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={props.good} />
        <Statistic text="neutral" value={props.neutral} />
        <Statistic text="bad" value={props.bad} />
        <Statistic text="all" value={props.allClicks.length} />
        <Statistic text="average" value={average()} />
        <Statistic text="positive" value={positive()} />
      </tbody>
    </table>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
