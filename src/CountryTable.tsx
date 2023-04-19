import React, { useMemo, useState } from 'react';
import countries, { Country } from './countries';
import HeaderCell from './HeaderCell';
import { SortOrder } from './util';

const columns: Array<{ label: string, key: keyof Country }> = [
  { label: 'Country', key: 'country' },
  { label: 'Population', key: 'population' },
  { label: 'Deaths', key: 'deaths' },
  { label: 'Recovered', key: 'recovered' },
  { label: 'Lat.', key: 'lat' },
  { label: 'Lng.', key: 'lng' },
];

function CountryTable() {
  const [sortKey, setSortKey] = useState<keyof Country>();
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.None);

  const sortedCountries = useMemo(() => {
    const result = countries.slice();

    if (sortKey === undefined || sortOrder === SortOrder.None) {
      return result;
    }

    result.sort((countryA: Country, countryB: Country) => {
      if (countryA[sortKey] < countryB[sortKey]) {
        return -sortOrder;
      }

      if (countryA[sortKey] > countryB[sortKey]) {
        return sortOrder;
      }

      return 0;
    });

    return result;
  }, [sortKey, sortOrder]);

  const handleSort = (clickedSortKey: keyof Country) => {
    if (sortKey === clickedSortKey) {
      // cycle through the sort orders.
      setSortOrder({
        [SortOrder.Ascending]: SortOrder.Descending,
        [SortOrder.Descending]: SortOrder.None,
        [SortOrder.None]: SortOrder.Ascending,
      }[sortOrder]);
    } else {
      setSortKey(clickedSortKey);
      setSortOrder(SortOrder.Ascending);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ label, key }) => (
            <HeaderCell
              key={key}
              label={label}
              onClick={handleSort}
              sortKey={key}
              sortOrder={key === sortKey ? sortOrder : undefined}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedCountries.map((country) => (
          <tr key={country.abbreviation}>
            {columns.map(({ key }) => (
              <td key={key}>
                {country[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryTable;
