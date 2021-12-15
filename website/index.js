const url = 'https://api.openweathermap.org/data/2.5/weather';
const APIKey = 'ecb665a91d16b58f2b41c7d1b69f9697';

const zip = document.getElementById('zip')
const feelings = document.getElementById('feelings')

let d = new Date()
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear()

const btn = document.getElementById('generate')

btn.addEventListener('click', performAction)

function performAction(event) {
    event.preventDefault();

    const date = document.getElementById('date')
    const temp = document.getElementById('temp')
    const content = document.getElementById('content')

    fetchWeather(url, zip.value, APIKey)
        .then(temp => {
            return { date: newDate, temp, content: feelings.value }
        })
        .then(data => {
            postData('/api/projectdata', data)
            return data
        })
        .then(({ temp, date, content }) => updateUI(temp, date, content))
        .catch(e => {
            console.error(e)

        })
}

//function to get data from openweather website
const fetchWeather = async(baseURL, zip, apiKey) => {
    try {
        const request = await fetch(
            `${baseURL}?zip=${zip},us&units=metric&APPID=${apiKey}`,
        )
        const result = await request.json()
        const {
            main: { temp },
        } = result
        return temp
    } catch (e) {
        throw e
    }
}

//function to send data to server
const postData = async(path, data) => {
    try {
        await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    } catch (e) {
        throw e
    }
}

//function to get data from server
const updateUI = async(temperature, newDate, feelings) => {
    date.innerText = newDate
    temp.innerText = `${temperature} deg`
    content.innerText = feelings
}