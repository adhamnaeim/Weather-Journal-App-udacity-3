// Personal API Key for OpenWeatherMap API
const api_key = "&appid=58e4fa2378ed6539963e123d9862f380"
const base_url= 'http://api.openweathermap.org/data/2.5/weather?zip='

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',performaction);
/* Function called by event listener */
function performaction(e){
    const zip_code = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    // console.log("stop tickling me", "when clicking generate");
    get_temp(base_url,zip_code,api_key)
    .then(function(data){
        let d1 = new Date(data.dt * 1000)
        let d1_str = d1.getFullYear() + '-' + (d1.getMonth()+1) + '-' + d1.getDate();

        postdata('/add',{temperature:data.main.temp, feel_like:data.main.feels_like, usr_inp: feeling});
        dynamicUI('/all');
    })
}



/* Function to GET Web API Data*/
const get_temp =  async (base_url,code, key)=> {
    const result = await fetch(base_url+code+key);
    try{
        const data = await result.json();
        // console.log(data, 'data acquired from api');
        return data;
    }
    catch(error){
        console.log('error',error);
    }
}
/* Function to POST data */
const postdata = async (url= '', data={})=> //the postdata's function
{   
    // console.log(data, "data in postdata function")
    const response = await fetch(url, { // parameters for the datas fetched
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try{
        const newdata = await response.json();
        // console.log(newdata, "the new data that will get posted in the server");
        return newdata;
    }

    catch(error){
        console.log('error',error);
        
    }
    
}


/* Function to GET Project Data */
const dynamicUI = async(url='') => {
    const request = await fetch(url);
    try {
        const final_data = await request.json();
        document.getElementById('date').innerHTML = final_data[0].date;
        document.getElementById('temp').innerHTML = final_data[0].temperature;
        document.getElementById('content').innerHTML = final_data[0].userResponse;
    } catch(error) {
        console.log('error', error);
    };
};