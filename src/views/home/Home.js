import { useEffect, useState, useCallback } from 'react';
import { animateScroll as scroll } from 'react-scroll';
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
         {filteredCountries ? <Filter countries={props.countries} setFilteredCountries={setFiltersCallback} /> : ''}
         {filteredCountries ? <Table filteredCountries={filteredCountries} /> : ''}
         <div className={window.scrollY > 1 ? 'goToTop active' : 'goToTop'}>
            <button onClick={() => scroll.scrollToTop()}>
               <i className="fas fa-arrow-up"></i>
            </button>
         </div>
         {/* loading mask */}
         <Loading loading={!filteredCountries} />
      </div>
   );
}

export default Home;
