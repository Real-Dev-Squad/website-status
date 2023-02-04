import React, { FC } from 'react';
import { searchInputComponent } from '@/interfaces/availabilityPanel.type';

const SearchInputComponent: FC<searchInputComponent> = (
  {
    value, placeholder, type, onChangeMethod,onkeydown,
  },
) => (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChangeMethod}
      onKeyDown={onkeydown}
    />
);

export default SearchInputComponent;
