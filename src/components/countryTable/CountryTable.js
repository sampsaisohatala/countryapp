import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useTable } from 'react-table';
import './CountryTable.css';

const COLUMNS = [
   {
      Header: 'Flag',
      accessor: 'flag',
   },
   {
      Header: 'Name',
      accessor: 'name',
   },
   {
      Header: 'Sub region',
      accessor: 'subregion',
   },
   {
      Header: 'Population',
      accessor: 'population',
   },
];

const DATA = [
   {
      name: 'Afghanistan',
      topLevelDomain: ['.af'],
      alpha2Code: 'AF',
      alpha3Code: 'AFG',
      callingCodes: ['93'],
      capital: 'Kabul',
      altSpellings: ['AF', 'Afġānistān'],
      region: 'Asia',
      subregion: 'Southern Asia',
      population: 27657145,
      latlng: [33, 65],
      demonym: 'Afghan',
      area: 652230,
      gini: 27.8,
      timezones: ['UTC+04:30'],
      borders: ['IRN', 'PAK', 'TKM', 'UZB', 'TJK', 'CHN'],
      nativeName: 'افغانستان',
      numericCode: '004',
      currencies: [
         {
            code: 'AFN',
            name: 'Afghan afghani',
            symbol: '؋',
         },
      ],
      languages: [
         {
            iso639_1: 'ps',
            iso639_2: 'pus',
            name: 'Pashto',
            nativeName: 'پښتو',
         },
         {
            iso639_1: 'uz',
            iso639_2: 'uzb',
            name: 'Uzbek',
            nativeName: 'Oʻzbek',
         },
         {
            iso639_1: 'tk',
            iso639_2: 'tuk',
            name: 'Turkmen',
            nativeName: 'Türkmen',
         },
      ],
      translations: {
         de: 'Afghanistan',
         es: 'Afganistán',
         fr: 'Afghanistan',
         ja: 'アフガニスタン',
         it: 'Afghanistan',
         br: 'Afeganistão',
         pt: 'Afeganistão',
         nl: 'Afghanistan',
         hr: 'Afganistan',
         fa: 'افغانستان',
      },
      flag: 'https://restcountries.eu/data/afg.svg',
      regionalBlocs: [
         {
            acronym: 'SAARC',
            name: 'South Asian Association for Regional Cooperation',
            otherAcronyms: [],
            otherNames: [],
         },
      ],
      cioc: 'AFG',
   },
   {
      name: 'Åland Islands',
      topLevelDomain: ['.ax'],
      alpha2Code: 'AX',
      alpha3Code: 'ALA',
      callingCodes: ['358'],
      capital: 'Mariehamn',
      altSpellings: ['AX', 'Aaland', 'Aland', 'Ahvenanmaa'],
      region: 'Europe',
      subregion: 'Northern Europe',
      population: 28875,
      latlng: [60.11667, 19.9],
      demonym: 'Ålandish',
      area: 1580,
      gini: null,
      timezones: ['UTC+02:00'],
      borders: [],
      nativeName: 'Åland',
      numericCode: '248',
      currencies: [
         {
            code: 'EUR',
            name: 'Euro',
            symbol: '€',
         },
      ],
      languages: [
         {
            iso639_1: 'sv',
            iso639_2: 'swe',
            name: 'Swedish',
            nativeName: 'svenska',
         },
      ],
      translations: {
         de: 'Åland',
         es: 'Alandia',
         fr: 'Åland',
         ja: 'オーランド諸島',
         it: 'Isole Aland',
         br: 'Ilhas de Aland',
         pt: 'Ilhas de Aland',
         nl: 'Ålandeilanden',
         hr: 'Ålandski otoci',
         fa: 'جزایر الند',
      },
      flag: 'https://restcountries.eu/data/ala.svg',
      regionalBlocs: [
         {
            acronym: 'EU',
            name: 'European Union',
            otherAcronyms: [],
            otherNames: [],
         },
      ],
      cioc: '',
   },
];

function CountryTable(props) {
   const columns = useMemo(() => COLUMNS, []);

   const data = useMemo(() => props.countries, []);

   console.log('table render');

   const tableInstance = useTable({
      columns,
      data,
   });

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

   return (
      <table {...getTableProps()}>
         <thead>
            {headerGroups.map((headerGroup) => (
               <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                     <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
               </tr>
            ))}
         </thead>
         <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
               prepareRow(row);
               return (
                  <tr {...row.getRowProps()} onClick={() => console.log(row.original)}>
                     {row.cells.map((cell) => {
                        if (cell.column.Header != 'Flag') return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        else {
                           return (
                              <td {...cell.getCellProps()}>
                                 <img src={cell.value} alt="" className="flag-image"></img>
                              </td>
                           );
                        }
                     })}
                  </tr>
               );
            })}
         </tbody>
      </table>
   );
}

export default CountryTable;
