import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  console.log(props);
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
};

const Content = props => {
  console.log(props);
  return (
    <div>
      <Part
        osa={props.course.parts[0].name}
        tehtava={props.course.parts[0].exercises}
      />
      <Part
        osa={props.course.parts[1].name}
        tehtava={props.course.parts[1].exercises}
      />
      <Part
        osa={props.course.parts[2].name}
        tehtava={props.course.parts[2].exercises}
      />
    </div>
  );
};

const Total = props => {
  console.log(props);
  let yht = 0;
  props.course.parts.forEach(element => {
    yht += element.exercises;
  });
  return (
    <div>
      <p>yhteensä {yht} tehtävää</p>
    </div>
  );
};

const Part = props => {
  console.log(props);
  return (
    <p>
      {props.osa} {props.tehtava}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack -sovelluskehitys",
    parts: [
      {
        name: "Reactin perusteet",
        exercises: 10
      },
      {
        name: "Tiedonvälitys propseilla",
        exercises: 7
      },
      {
        name: "Komponenttien tila",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
