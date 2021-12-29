import { searchInputComponent } from "@/interfaces/availabilityPanel.type";
import React, { FC }  from "react";

const SearchInputComponent: FC<searchInputComponent> = ({ value, placeholder, type, onChangeMethod }) => (
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