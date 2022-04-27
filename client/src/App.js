import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [newSalary, setNewSalary] = useState(0);
  const lineBreak = "__________________________________________________________________________________________________________________________________"

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    console.log(name);
    Axios.post('http://localhost:3001/create', {
      name: name, 
      age: age, 
      location: location, 
      position: position, 
      salary: salary
    }).then(() => {
      setEmployeeList([...employeeList, 
        {
        name: name, 
        age: age, 
        location: location, 
        position: position, 
        salary: salary
        }, 
      ]);
    })
  };

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data);
    });
  }

  const updateEmployeeSalary = (id) => {
    Axios.put('http://localhost:3001/update', {
      salary: newSalary, 
      id: id,
      }).then((response) => {
        // setEmployeeList(response.data);
        alert("update");
      });
  };

  return (
    <div className="App">
      <div className='information'>
        <label>Name: </label>
        <input type="text" onChange={(event) => {
          setName(event.target.value)
        }}
        />
        <label>Age: </label>
        <input type="number" onChange={(event) => {
          setAge(event.target.value)
        }}
        />
        <label>Location: </label>
        <input type="text" onChange={(event) => {
          setLocation(event.target.value)
        }}
        />
        <label>Position: </label>
        <input type="text" onChange={(event) => {
          setPosition(event.target.value)
        }}
        />
        <label>Salary (per year): </label>
        <input type="number" onChange={(event) => {
          setSalary(event.target.value)
        }}
        />
        <button onClick={addEmployee}>Add New Employee</button>
      </div>
      {lineBreak}
      <div className='employees'>
        <button onClick={getEmployees}>Show All Employees</button>
        {employeeList.map((val, key) => {
          return <div className='employee'>
                    <h3>Name: {val.name}</h3>
                    <h3>Age: {val.age}</h3>
                    <h3>Location: {val.location}</h3>
                    <h3>Position: {val.position}</h3>
                    <h3>Salary: ${val.salary}</h3>
                    <div>
                      <input type="number" placeholder="update salary" onChange={(event) => {
                        setNewSalary(event.target.value)
                      }}></input>
                      <button onClick={updateEmployeeSalary(val.id)}>Update Salary</button>
                    </div>
                  </div>
        })}
      </div>
    </div> 
    
  );
}

export default App;
