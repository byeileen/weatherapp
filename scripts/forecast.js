//interaction with the APIs

const key = 'kbmlam5A6VNcu1mC6ACb3P3z4RzWsB0G';

//get weather information
const getWeather = async(id) => {
     const base = '//dataservice.accuweather.com/currentconditions/v1/';
     const query = `${id}?apikey=${key}`;

     const response = await fetch(base + query);
     const data = await response.json(); 

     return data [0];
};

//get city information
const getCity = async (city) =>{

    const base = '//dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0]; //closest match

};


