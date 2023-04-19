import React from 'react';
import './App.css';
import { type Country } from './countries';
import { SortOrder } from './util';

function HeaderCell({
  label,
  onClick,
  sortKey,
  sortOrder,
}: {
  label: string,
  onClick: (sortKey: keyof Country) => void,
  sortKey: keyof Country,
  sortOrder?: SortOrder | undefined,
}) {
  return (
    <th onClick={() => onClick(sortKey)}>
      {label}
      {sortOrder === SortOrder.Ascending && <> &#x25B2;</>}
      {sortOrder === SortOrder.Descending && <> &#x25BC;</>}
    </th>
  );
}

export default HeaderCell;
