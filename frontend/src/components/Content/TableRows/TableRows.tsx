import React from "react";
import { Checkbox, TableCell, TableRow, TableBody } from "@material-ui/core";
import CommentIconButton from "./CommentIconButton";
import { Workout } from "../../../shared/types";

type TableRowsType = {
  rows: Workout[];
  isSelected(id: string): boolean;
  handleClick(event: React.MouseEvent, id: string, row: Workout): void;
  handleOpen(comment: string): void;
};

const TableRows: React.FC<TableRowsType> = ({
  rows,
  isSelected,
  handleClick,
  handleOpen,
}) => (
  <>
    {rows.map((row) => {
      const isItemSelected: boolean = isSelected(row?.id || "");
      return (
        <TableBody key={row.id}>
          <TableRow>
            <TableCell padding="checkbox" align="center">
              <Checkbox
                onClick={(event) => handleClick(event, row?.id || "", row)}
                // selected={isItemSelected}
                checked={isItemSelected}
              />
            </TableCell>
            <TableCell align="center">{row.date}</TableCell>
            <TableCell align="center">{row.kilometrage}</TableCell>
            <TableCell align="center">{row.typeWorkout}</TableCell>
            <TableCell align="center">
              <CommentIconButton
                handleOpen={handleOpen}
                comment={row.comment}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      );
    })}
  </>
);

export default TableRows;
