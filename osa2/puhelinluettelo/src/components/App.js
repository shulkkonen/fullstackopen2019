import React, { useState, useEffect } from "react";
import Notes from "../services/Notes";
import PersonForm from "./PersonForm";
import Notification from "./Notification";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);

  useEffect(() => {
    Notes.getAll().then(initialNotes => {
      setPersons(initialNotes);
    });
  }, []);

  const findDuplicate = () => {
    let i = false;
    persons.forEach(element => {
      if (element.name === newName) {
        i = true;
      }
    });
    return i;
  };

  const removePerson = name => {
    const element = persons.find(element => element.id === name)
    if (window.confirm(`Remove ${element.name}?`)) {
      Notes.remove(name);
      setPersons(persons.filter(person => person.id !== name));
      setNotifMessage(`Removed ${element.name}`);
      setTimeout(() => {
        setNotifMessage(null);
      }, 3000);
    }
  };

  const addName = event => {
    event.preventDefault();
    if (findDuplicate()) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      const noteObject = {
        name: newName,
        number: newNumber,
        id: newName
      };
      Notes.create(noteObject).then(returnedNote => {
        setPersons(persons.concat(returnedNote));
        setNotifMessage("Added " + returnedNote.name);
        setTimeout(() => {
          setNotifMessage(null);
        }, 3000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} />
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} removePerson={removePerson} />
      </div>
    </div>
  );
};

export default App;
