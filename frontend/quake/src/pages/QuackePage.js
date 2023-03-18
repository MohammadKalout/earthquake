import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

  

export default function QuakePage() {
    const [earthquakeData, setEarthquakeData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  // Code to fetch data from the API and set the earthquakeData state
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-01-10&limit=50');
      setEarthquakeData(response.data.features);
    };
    fetchData();
  }, []);
  
  // Code to filter the earthquake data based on the selected country
  const filteredData = earthquakeData.filter(data => {
    const place = data.properties.place;
    const country = place.substring(place.lastIndexOf(',') + 2).toLowerCase();
    return country === selectedCountry.toLowerCase();
  });

  // Code to create the options for the select element
  const countryOptions = [...new Set(earthquakeData.map(data => {
    const place = data.properties.place;
    return place.substring(place.lastIndexOf(',') + 2);
  }))].sort().map(country => (
    <option key={country} value={country}>{country}</option>
  ));
  



  return (


<div>
<nav className="p-3 border-gray-200 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-full fixed top-0 left-0">

  <div className="container flex flex-wrap items-center justify-between mx-auto">
    <a href="#" className="flex items-center">
        {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-10" alt="Flowbite Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
    </a>
    <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
        <Link to={`/`}>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">SignOut</a>
        </li>
        </Link>
      </ul>
    </div>
  </div>
</nav>


<label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
<select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
  <option selected>Choose a country</option>
      {countryOptions}
  {/* <option value="US">United States</option>
  <option value="CA">Canada</option>
  <option value="FR">France</option>
  <option value="DE">Germany</option> */}
</select>



<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
        <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
            <tr>
                <th scope="col" className="px-6 py-3">
                Magnitude
                </th>
                <th scope="col" className="px-6 py-3">
                Place
                </th>
                <th scope="col" className="px-6 py-3">
                Coordinates
                </th>
            </tr>
        </thead>
        <tbody>
        {filteredData.map(data => (
            <tr className="bg-blue-500 border-b border-blue-400" key={data.id}>
                {/* <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                {data.properties.mag}
                </th> */}
                <td className="px-6 py-4">
                {data.properties.mag}
                </td>
                <td className="px-6 py-4">
                {data.properties.place}
                </td>
                <td className="px-6 py-4">
                {data.geometry.coordinates.join(', ')}
                </td>
            </tr>
             ))}
            {/* <tr class="bg-blue-600 border-b border-blue-400">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-white hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-blue-500 border-b border-blue-400">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-white hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-blue-600 border-b border-blue-400">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Google Pixel Phone
                </th>
                <td class="px-6 py-4">
                    Gray
                </td>
                <td class="px-6 py-4">
                    Phone
                </td>
                <td class="px-6 py-4">
                    $799
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-white hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-blue-500 border-blue-40">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Apple Watch 5
                </th>
                <td class="px-6 py-4">
                    Red
                </td>
                <td class="px-6 py-4">
                    Wearables
                </td>
                <td class="px-6 py-4">
                    $999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-white hover:underline">Edit</a>
                </td>
            </tr> */}
        </tbody>
    </table>
</div>
</div>

  )}