import React, { useMemo, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { useTable } from 'react-table';
import './Table.css';

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
      Header: 'Sub-region',
      accessor: 'subregion',
   },
   {
      Header: 'Population',
      accessor: 'population',
   },
];

function Table(props) {
   const columns = useMemo(() => COLUMNS, []);
   const data = useMemo(() => props.filteredCountries, [props.filteredCountries]);
   const history = useHistory();

   const tableInstance = useTable({
      columns,
      data,
   });

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

   function handleRowClick(countrycode) {
      history.push(`/${countrycode}`);
   }

   function numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
   }

   return (
      <table {...getTableProps()}>
         <thead>
            {headerGroups.map((headerGroup) => (
               <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                     // create column headers
                     headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()} className={column.Header}>
                           {column.render('Header')}
                        </th>
                     ))
                  }
               </tr>
            ))}
         </thead>
         <tbody {...getTableBodyProps()}>
            {
               // create row for each country
               rows.map((row) => {
                  prepareRow(row);
                  return (
                     <tr
                        {...row.getRowProps()}
                        onClick={() => {
                           handleRowClick(row.original.alpha3Code);
                        }}
                     >
                        {
                           // create each cell for country row
                           row.cells.map((cell) => {
                              // handle flag column
                              if (cell.column.Header === 'Flag')
                                 return (
                                    <td {...cell.getCellProps()} className={cell.column.Header}>
                                       <img src={cell.value} alt="" className="flag-image"></img>
                                    </td>
                                 );
                              // handle population column
                              else if (cell.column.Header === 'Population')
                                 return (
                                    <td {...cell.getCellProps()} className={cell.column.Header}>
                                       {numberWithSpaces(cell.value)}
                                    </td>
                                 );
                              // handle rest of the columnss
                              else {
                                 return (
                                    <td {...cell.getCellProps()} className={cell.column.Header}>
                                       {cell.render('Cell')}
                                    </td>
                                 );
                              }
                           })
                        }
                     </tr>
                  );
               })
            }
         </tbody>
      </table>
   );
}

export default memo(Table);
