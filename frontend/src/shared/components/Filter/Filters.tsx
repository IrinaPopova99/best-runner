import React, { useContext, MouseEvent } from "react";
import "./Filter.scss";
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useSelectRows } from "../../../utils/useSelectRows";
import { FilterStyle } from "../../../DarkMode";
import { DarkOrLightThemeContext } from "../../../context";
import { Filter } from "../../types";

type FilterType = {
  onToggleFilters(selected: Filter[]): void;
  labels: string[];
  selectedFilters: string[];
}

const Filters: React.FC<FilterType> = ({ onToggleFilters, labels, selectedFilters }) => {
  const { darkMode } = useContext(DarkOrLightThemeContext);

  const [handleSelect] = useSelectRows();

  const isSelected = (id: string) => {
    return selectedFilters.indexOf(id) !== -1;
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // const data = handleSelect(event);
    onToggleFilters(handleSelect(null, event));
  };

  if (labels) {
    labels = labels.filter((v, i, a) => a.indexOf(v, i + 1) === -1);
  }

  return (
    <FilterStyle theme={darkMode}>
      <FormControl component="fieldset" className="form-control">
        <FormLabel component="legend">Фильтр&nbsp;по:</FormLabel>
        <FormGroup>
          {labels
            ? labels.map((item) => {
                const isItemSelected = isSelected(item);
                return (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        // selected={isItemSelected}
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event)}
                        name={item}
                        key={item}
                      />
                    }
                    label={item}
                  />
                );
              })
            : null}
        </FormGroup>
      </FormControl>
    </FilterStyle>
  );
};

export default Filters;
