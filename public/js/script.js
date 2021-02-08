const weaterForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weaterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = "Loading.....";
    message2.textContent = "";
    fetch(`/weather?address=${search.value}`).then((response) => {
        response.json().then((weatherData) => {
            if(weatherData.error)
                message1.textContent = weatherData.error;
            else
            {
                message1.textContent = weatherData.location;
                message2.textContent = weatherData.forecast;
            }
        })
    });
})