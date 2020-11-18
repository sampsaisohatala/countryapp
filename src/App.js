import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './views/home/Home';
import Country from './views/country/Country';

function App() {
   const apiUrl = 'https://restcountries.eu/rest/v2/all/';
   const [countries, setCountries] = useState(null);
   const [error, setError] = useState(false);

   async function handleFetch() {
      try {
         const response = await fetch(apiUrl);
         const data = await response.json();
         setCountries(data);
      } catch {
         console.error('data fetch failed');
         setError(true);
      }
   }

   useEffect(() => {
      handleFetch();
   }, []);

   return (
      <div className="app">
         <BrowserRouter>
            <div className="heading">
               <img src={process.env.PUBLIC_URL + `/images/worldwide.svg`} alt="" />
               <h1>countryapp</h1>
            </div>

            <Switch>
               <Route exact path="/">
                  <Home countries={countries} error={error} />
               </Route>
               <Route path="/:country">
                  <Country />
               </Route>
            </Switch>
         </BrowserRouter>
      </div>
   );
}

export default App;
