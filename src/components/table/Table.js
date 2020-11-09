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
                  {headerGroup.headers.map((column) => (
                     <th {...column.getHeaderProps()} className={column.Header}>
                        {column.render('Header')}
                     </th>
                  ))}
               </tr>
            ))}
         </thead>
         <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
               prepareRow(row);
               return (
                  <tr
                     {...row.getRowProps()}
                     onClick={() => {
                        handleRowClick(row.original.alpha3Code);
                     }}
                  >
                     {row.cells.map((cell) => {
                        if (cell.column.Header === 'Flag')
                           return (
                              <td {...cell.getCellProps()} className={cell.column.Header}>
                                 <img src={cell.value} alt="" className="flag-image"></img>
                              </td>
                           );
                        else if (cell.column.Header === 'Population')
                           return (
                              <td {...cell.getCellProps()} className={cell.column.Header}>
                                 {numberWithSpaces(cell.value)}
                              </td>
                           );
                        else {
                           return (
                              <td {...cell.getCellProps()} className={cell.column.Header}>
                                 {cell.render('Cell')}
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

export default memo(Table);
