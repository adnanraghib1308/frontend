import axios from 'axios';

export const checkResult = async (rollnumbers) => {
    const rollnos = rollnumbers.split(',');
    var arr = [];
    rollnos.forEach((r) => {
        arr.push("https://backendrollno2.herokuapp.com/test/"+r)
    })

    var requests = [];
    arr.forEach((r) => {
        requests.push(axios.get(r))
    })

    return axios.all(requests).then(axios.spread((...responses) => {
        var res = [];
        for(let i=0;i<responses.length;++i){
            res.push({
                rollNumber: rollnos[i],
                result: responses[i].data.result
            })
        }
        return res;
      }))
      .catch(errors => {
        console.log(errors)
      })   
}

