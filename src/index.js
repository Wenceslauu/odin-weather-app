import './style.css';

const body = document.querySelector('body')
const cityName = document.querySelector('.city-name')
const temp = document.querySelector('.temp')
const form = document.querySelector('form')
const city = document.querySelector('#city')

async function getCityData() {
    const cityQueried = city.value.charAt(0).toUpperCase() + city.value.slice(1).toLowerCase()
    const desiredData = { cityName: cityQueried, temp: null, condition: null }
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityQueried}&appid=af4f5211f98b080629c07abca5b4776b&units=metric`, {mode: 'cors'})
        const cityData = await response.json()
        desiredData.temp = cityData.main.temp
        desiredData.condition = cityData.weather[0].id
    } catch (err) {
        body.style.backgroundImage = 'url(../src/error.jpg)'
        console.log(err)
    }
    
    return desiredData
}

async function changeStyle(data) {
    const resolvedData = await data 
    console.log(resolvedData)

    cityName.innerHTML = ''
    temp.innerHTML = ''

    cityName.textContent = resolvedData.cityName
    temp.textContent = `${resolvedData.temp}ºC`

    const i = resolvedData.condition
    switch(true) {
        case (i < 300):
            body.style.backgroundImage = 'url(../src/thunderstorm.jpg)'
            break        
        case (i < 500):
            body.style.backgroundImage = 'url(../src/drizzle.jpg)'
            break
        case (i < 600):
            body.style.backgroundImage = 'url(../src/rain.jpg)'
            break
        case (i < 700):
            body.style.backgroundImage = 'url(../src/snow.jpg)'
            break
        case (i < 800):
            body.style.backgroundImage = 'url(../src/atmosphere.jpg)'
            break
        case (i === 800):
            body.style.backgroundImage = 'url(../src/clear.jpg)'
            break
        case (i < 900):
            body.style.backgroundImage = 'url(../src/clouds.jpg)'
            break
        default:
            body.style.backgroundImage = 'url(../src/error.jpg)'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    changeStyle(getCityData())
})