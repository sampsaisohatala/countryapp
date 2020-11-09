import React, { useState, useEffect, memo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './Country.css';
import Loading from '../../components/loadingScreen/LoadingScreen';

function Country() {
   const apiUrl = 'https://restcountries.eu/rest/v2/alpha';
   const [country, setCountry] = useState(null);
   const [pageFound, setPageFound] = useState(false);
   const [loading, setLoading] = useState(true);
   const history = useHistory();

   // get url
   const location = useLocation();
   const pathname = location.pathname;
   const query = `${apiUrl}${pathname}`;

   function handleReturnClick() {
      history.push('/');
   }

   function numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
   }

   async function handleFetch() {
      const response = await fetch(query);
      const data = await response.json();

      if (response.status === 200) {
         setCountry(data);
         setPageFound(true);
         setLoading(false);
      } else {
         setLoading(false);
      }
   }

   // fetch country data
   useEffect(() => {
      handleFetch();
   }, []);

   return (
      <div className="country-container">
         <button onClick={handleReturnClick}>
            <i className="fas fa-arrow-left"></i>
         </button>
         {pageFound ? (
            <div className="country">
               <img src={country.flag} alt="" className="country-flag" />
               <div>
                  <h2>{country.name}</h2>
                  <h3>
                     Capital city : <span>{country.capital}</span>
                  </h3>
                  <h3>
                     Population : <span>{numberWithSpaces(country.population)}</span>
                  </h3>
                  <h3>
                     Languages :{' '}
                     {country.languages.map((lang, i) => {
                        return (
                           <span key={i}>
                              {lang.name}
                              {i < country.languages.length - 1 ? ', ' : ''}{' '}
                           </span>
                        );
                     })}
                  </h3>
                  <h3>
                     Currencies :{' '}
                     {country.currencies.map((cur, i) => {
                        return (
                           <span key={i}>
                              {cur.name}
                              {i < country.currencies.length - 1 ? ', ' : ''}{' '}
                           </span>
                        );
                     })}
                  </h3>
               </div>
            </div>
         ) : (
            <div className="notFound">
               <h1>Country not found</h1>
            </div>
         )}
         {/* loading mask */}
         <Loading loading={loading} />
      </div>
   );
}

export default memo(Country);
