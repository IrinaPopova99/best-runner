import React from "react";
import {
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@material-ui/core";
import "./HeaderRow.scss";
import { SortOrder, Workout } from "../../../shared/types";
import { useTranslation } from 'react-i18next';

export type HeaderCellsType = { id: string; label: string };

const headCells: HeaderCellsType[] = [
  { id: "date", label: "Дата" },
  { id: "distance", label: "Дистанция" },
];

type HeaderRowType = {
  order: SortOrder;
  orderBy: keyof Workout;
  onRequestSort(property: string): void;
};

const HeaderRow: React.FC<HeaderRowType> = ({
  order,
  orderBy,
  onRequestSort,
}) => {
  const { t } = useTranslation('workout');
  const createSortHandler = (property: string) => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">{t('choose')}</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : undefined}
            align="center"
            className="sort-cell"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={() => createSortHandler(headCell.id)}
              className="sort-cell__arrow"
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className="visually-hidden">
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">{t('typeWorkout')}</TableCell>
        <TableCell align="center">{t('comment')}</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default HeaderRow;
