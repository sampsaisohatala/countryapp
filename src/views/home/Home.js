import { useEffect, useState, useCallback, memo } from 'react';
import './Home.css';
import Table from '../../components/table/Table';
import Filter from '../../components/filter/Filter';
import Loading from '../../components/loadingScreen/LoadingScreen';

function Home(props) {
   const [filteredCountries, setFilteredCountries] = useState(null);
   const setFiltersCallback = useCallback((filters) => setFilteredCountries(filters), []);

   useEffect(() => {
      setFilteredCountries(props.countries);
   }, [props.countries]);

   return (
      <div>
         {
            // if countries arent yet loaded, display loading spinner
            filteredCountries ? <Filter countries={props.countries} setFilteredCountries={setFiltersCallback} /> : ''
         }

         {
            // if filteredCountries arent yet loaded, display loading spinner
            filteredCountries ? <Table filteredCountries={filteredCountries} /> : ''
         }
         {/* loading mask */}
         <Loading loading={!filteredCountries} />
      </div>
   );
}

export default memo(Home);
