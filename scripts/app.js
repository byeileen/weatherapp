//DOM manipulation

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    //desctructure properties
    const{ cityDets, weather } = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the night and day, and icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none'); 
    }
}

const updateCity = async (city) => {
    const cityDets = await getCity(city); //city details
    const weather = await getWeather(cityDets.Key); //key property from what we get back from the request

    return {
        cityDets, weather}; //shortcut - property name is the same as the value
};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value - what the user types in
    const city = cityForm.city.value.trim();
    cityForm.reset(); //clear form fields

    //update ui with the new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);
});

//if a certain item exist
if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}