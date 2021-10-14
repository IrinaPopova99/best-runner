import { useCallback, useState } from "react";

type HandleSelectType = (selectedRow: any, event?: any, id?: any, row?: any) => string[];
type SetSelectedType = (selected: string[]) => void;

export function useSelectRows(): [HandleSelectType, SetSelectedType, string[]] {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = useCallback(
    (selectedRow, event = null, id = null, row = null) => {
      const element = id ? id : event.target.name;
      const selectedIndex = selected.indexOf(element);
      let newSelected: string[] = [];

      if (row) selectedRow.current.value = row;
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, element)
        setSelected(newSelected);
      }
      if (selectedIndex >= 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1));
        setSelected(newSelected);
      }
      return newSelected;
    },
    [selected]
  );
  return [handleSelect, setSelected, selected];
}
