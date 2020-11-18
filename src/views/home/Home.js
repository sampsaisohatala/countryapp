import React, { useEffect, useState, useCallback } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import './Home.css';
import Table from '../../components/table/Table';
import Filter from '../../components/filter/Filter';
import Loading from '../../components/loadingScreen/LoadingScreen';

function Home(props) {
   const [filteredCountries, setFilteredCountries] = useState(null);
   const [nameFilter, setNameFilter] = useState('');
   const [subregionFilter, setSubregionFilter] = useState('all');

   const setFiltersCallback = useCallback((nameFilter, subregionFilter) => {
      setNameFilter(nameFilter);
      setSubregionFilter(subregionFilter);
   }, []);

   function errorMessage() {
      return <h1 className="error-message">No data available...</h1>;
   }

   useEffect(() => {
      if (!props.countries) return;

      function handleFiltering() {
         // when filters are at their default values, skip filtering
         if (nameFilter === '' && subregionFilter === 'all') {
            setFilteredCountries(props.countries);
            return;
         }

         const filteredCountriesByRegion = props.countries.filter((country) => subregionFilter === 'all' || subregionFilter === country.subregion);
         const filteredCountries = filteredCountriesByRegion.filter((country) => nameFilter === '' || country.name.toLowerCase().includes(nameFilter.toLowerCase()));
         setFilteredCountries(filteredCountries);
      }

      handleFiltering();
   }, [props.countries, nameFilter, subregionFilter]);

   return (
      <div>
         {filteredCountries ? <Filter countries={props.countries} setFiltersCallback={setFiltersCallback} /> : ''}
         {filteredCountries ? <Table filteredCountries={filteredCountries} /> : ''}
         <div className="goToTop ">
            <button onClick={() => scroll.scrollToTop()}>
               <i className="fas fa-arrow-up"></i>
            </button>
         </div>
         {/* loading mask */}
         <Loading loading={!filteredCountries} />
         {/* error mask */}
         {props.error ? errorMessage() : ''}
      </div>
   );
}

export default Home;
