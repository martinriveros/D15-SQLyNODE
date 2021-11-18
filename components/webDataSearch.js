const { default: axios } = require('axios');

let data;

async function getData(){
        let data = await axios.get("localhost:8080/chat/rerender.js")
              .then(response => {if(response.status===200) return response.data})
              .catch( e =>console.log('some shit happened'))
        return data  
}; 

module.exports = getData

