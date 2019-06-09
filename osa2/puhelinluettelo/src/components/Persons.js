import React from "react";

const Persons = ({ persons, removePerson }) => {
  return persons.map(person => (
    <div key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={event => removePerson(person.id)}>delete</button>
    </div>
  ));
};

export default Persons;
