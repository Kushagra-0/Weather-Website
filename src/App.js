import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=3c4454366c1f2146d45c9904d4d75bc0`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app h-screen bg-gray-800 px-4 flex flex-col justify-center items-center">

      <div className="search rounded-2xl pt-5">
          <input
          className='bg-blue-600 text-white rounded-2xl px-4 mb-3 h-9 focus:outline-none w-72'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      {data.name !== undefined &&
      <div className="main bg-blue-600 text-white pt-3 px-4 w-72 rounded-2xl">
        <div className="top">
          <div className="location mb-16 font-medium text-xl">
            <p>{data.name}</p>
          </div>
          <div className="temp text-8xl font-bold mb-3">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description font-medium pb-3">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
           </div>
        </div>
      </div>
      }

      <div className='bg-blue-600 text-white mt-3 rounded-2xl w-72'>
          {data.name !== undefined &&
            <div className="bottom flex flex-row pt-3 pb-3">
              <div className="feels px-4">
                {data.main ? <p className='font-bold text-xl'>{data.main.feels_like.toFixed()}°C</p> : null}
                <p className='font-medium'>Feels Like</p>
              </div>
              <div className="humidity px-4">
                {data.main ? <p className='font-bold text-xl'>{data.main.humidity}%</p> : null}
                <p className='font-medium'>Humidity</p>
              </div>
              <div className="wind px-4">
                {data.wind ? <p className='font-bold text-xl'>{data.wind.speed.toFixed()} MPH</p> : null}
                <p className='font-medium'>Wind Speed</p>
              </div>
            </div>
          }
        </div>

        {data.name !== undefined &&
        <div className='bg-blue-600 text-white mt-3 pt-3 pb-3 rounded-2xl px-4 w-72'>
          <p className='font-medium mb-1'>Pressure</p>
          {data.main ? <p className='font-bold text-2xl'>{data.main.pressure}MB</p> : null}
        </div>
        }

    </div>
  );
}

export default App;