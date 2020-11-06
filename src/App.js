import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './views/home/Home';

function App() {
   const apiUrl = 'https://restcountries.eu/rest/v2/all';
   const [countries, setCountries] = useState(null);

   useEffect(() => {
      fetch(apiUrl)
         .then((res) => res.json())
         .then((json) => setCountries(json));
   }, []);

   return (
      <div>
         <BrowserRouter>
            <Switch>
               <Route exact path="/">
                  <Home countries={countries} />
               </Route>
            </Switch>
         </BrowserRouter>
      </div>
   );
}

export default App;
