import React, { FC } from 'react';
import { searchInputComponent } from '@/interfaces/availabilityPanel.type';

const SearchInputComponent: FC<searchInputComponent> = (
  {
    value, placeholder, type, onChangeMethod,
  },
) => (
  <div>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChangeMethod}
    />
  </div>
);

export default SearchInputComponent;
