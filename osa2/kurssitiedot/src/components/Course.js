import React from "react";

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Header = props => <h1>{props.course}</h1>;

const Content = props => {
  const kurssit = () =>
    props.parts.map(part => <Part key={part.id} part={part} />);
  return <div>{kurssit()}</div>;
};

const Total = props => {
  const total = props.parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return <b>total of {total} exercises</b>;
};

const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

export default Course;
