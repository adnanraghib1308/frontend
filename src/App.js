import React, { useState } from 'react'
import { checkResult } from './api/test'
import Table from './Table'


function App() {
  var done = true;

  const [rollno, setRollno] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState([]);

  const handleChange = (event) => {
    setRollno(event.target.value)
  }

  const isError = () => {
    var x = rollno.split(',')
    var check = false;
    x.forEach((r) => {
      if(isNaN(r) || r == ''){
        check = true;
      }
    })
    return check;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    if(isError()){
      setError(true);
      setLoading(false);
    }
    else{
      checkResult(rollno)
      .then(response => {
        setLoading(false)
        setResult(true)
        setRes(response)
      })
    }
  }

  const loadingComp = () => {
    return (
      <div>
        <p>Loading......</p>
      </div>
    )
  }

  const form = () => {
    return (
      <div>
        <form>
          <label className="form-label">Roll Numbers</label>
          <input type='text' className='form-control' onChange={handleChange} value={rollno} />
          <button className="btn btn-primary my-2" onClick={onSubmit}>Submit</button>
        </form>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div className="alert alert-danger mt-3">
      <h4>Invalid input. Please give input in comma separated values.</h4>
    </div>
    )
  }

  const tableResult = () => {
   return (
      <div>
        <table className = "table table-success table-striped my-4">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Roll Number</th>
            <th scope="col">Result</th>
          </tr>
        <tbody>
          {res.map((num, index) => (
            <Table key = {index} seqno = {index} rollnumber = {num.rollNumber} result = {num.result}></Table>
          ))}
        </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="row py-5">
      <div className="col-sm-8 mx-auto">
        {error && errorMessage()}
        {form()}
        {loading && loadingComp()}
        {result && !loading && tableResult()}
      </div>
    </div>
  );
}

export default App;
