import React, { useEffect, useState, useRef } from 'react';
import './Filter.css';

function Filter(props) {
   const [nameFilter, setNameFilter] = useState('');
   const [subregions, setSubregions] = useState(null);
   const [subregionFilter, setSubregionFilter] = useState('all');

   const clearBtn = useRef();
   const nameInput = useRef();
   const subregionInput = useRef();

   // functions
   const getSubregions = () => {
      let regions = [];
      props.countries.forEach((country) => {
         if (!regions.includes(country.subregion) && country.subregion !== '') {
            regions.push(country.subregion);
         }
      });

      setSubregions(regions);
   };

   const handleNameFilter = (e) => {
      setNameFilter(e.target.value);
   };

   const handleSubregionsFilter = (e) => {
      setSubregionFilter(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const filteredCountriesByRegion = props.countries.filter((country) => subregionFilter === 'all' || subregionFilter === country.subregion);
      const filteredCountries = filteredCountriesByRegion.filter((country) => nameFilter === '' || country.name.toLowerCase().includes(nameFilter.toLowerCase()));
      props.setFilteredCountries(filteredCountries);
   };

   useEffect(() => {
      getSubregions();
   }, []);

   const handleClear = () => {
      // reset filter values to default
      nameInput.current.value = '';
      subregionInput.current.value = 'all';
      setNameFilter('');
      props.setFilteredCountries(props.countries);
   };

   return (
      <form onSubmit={handleSubmit}>
         <h3>Search</h3>
         <div className="select">
            <span>Filter by name</span>
            <input ref={nameInput} type="text" onChange={handleNameFilter} className="inputField" />
            <span>Filter by sub-region</span>
            <select ref={subregionInput} name="subregions" onChange={handleSubregionsFilter} className="inputField">
               <option value="all">All</option>
               {subregions
                  ? subregions.map((region) => (
                       <option key={region} value={region}>
                          {region}
                       </option>
                    ))
                  : ''}
            </select>
            <input ref={clearBtn} type="button" onClick={handleClear} value="Clear" className="btn"></input>
            <input type="submit" value="Submit" className="btn"></input>
         </div>
      </form>
   );
}

export default React.memo(Filter);
