import React, { useEffect, useState, useRef } from 'react';
import './Filter.css';

function Filter(props) {
   const [subregions, setSubregions] = useState(null);

   const [nameFilter, setNameFilter] = useState('');
   const [subregionFilter, setSubregionFilter] = useState('all');

   const [prevRegion, setPrevRegion] = useState('all');
   const [prevName, setPrevName] = useState('');

   const clearBtn = useRef();
   const nameInput = useRef();
   const subregionInput = useRef();

   const handleNameFilter = (e) => {
      setNameFilter(e.target.value);
   };

   const handleSubregionsFilter = (e) => {
      setSubregionFilter(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // prevent function to be called if values havent changed
      if (subregionFilter === prevRegion && prevName === nameFilter) return;

      setPrevName(nameFilter);
      setPrevRegion(subregionFilter);

      props.setFiltersCallback(nameFilter, subregionFilter);
   };

   const handleClear = () => {
      if (nameFilter === '' && subregionFilter === 'all') return;

      // reset filter values to default
      nameInput.current.value = '';
      subregionInput.current.value = 'all';

      setNameFilter('');
      setSubregionFilter('all');
      setPrevName('');
      setPrevRegion('all');

      props.setFiltersCallback('', 'all');
   };

   // get subregions
   useEffect(() => {
      const getSubregions = () => {
         let regions = [];

         props.countries.forEach((country) => {
            if (!regions.includes(country.subregion) && country.subregion !== '') {
               regions.push(country.subregion);
            }
         });

         setSubregions(regions);
      };

      getSubregions();
   }, [props.countries]);

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
