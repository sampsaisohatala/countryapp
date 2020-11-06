import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './Home.css';
import CountryTable from '../../components/countryTable/CountryTable';

function CountryList(props) {
   return <div>{props.countries ? <CountryTable countries={props.countries} /> : ''}</div>;
}

export default CountryList;

/*
function CountryList(props) {
   console.log(props.countries);

   const handleCountyClick = (e) => {
      console.log('clicked' + e);
   };

   return (
      <div>
         <h1>Country list</h1>
         <div>
            <table className="countries">
               <thead>
                  <tr>
                     <th>Flag</th>
                     <th>Name</th>
                     <th>Sub region</th>
                     <th>Population</th>
                  </tr>
               </thead>
               <tbody>
                  {props.countries ? (
                     props.countries.map((country, i) => (
                        <tr key={i} onClick={handleCountyClick}>
                           <td>
                              <img src={country.flag} className="flag-image"></img>
                           </td>
                           <td>{country.name}</td>
                           <td>{country.subregion}</td>
                           <td>{country.population}</td>
                        </tr>
                     ))
                  ) : (
                     <tr></tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default CountryList;
*/
