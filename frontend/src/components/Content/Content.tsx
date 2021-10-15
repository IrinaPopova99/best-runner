import React, { useState, useRef, useContext } from "react";
import { Table, TableContainer, Paper, Grid } from "@material-ui/core";
import { getSortedWorkouts } from "../../utils/sortFunctions";
import Actions from "./Actions/Actions";
import TableRows from "./TableRows/TableRows";
import HeaderRow from "./HeaderRow/HeaderRow";
import Loading from "../../shared/components/Loading/Loading";
import ModalWindows from "./ModalWindows/ModalWindows";
import AlertCustom from "../../shared/components/AlertError/AlertError";
import "./Content.scss";
import { useSelectRows } from "../../utils/useSelectRows";
import { DarkOrLightThemeContext } from "../../context";
import { TableStyle } from "../../DarkMode";
import { Workout, ErrorRequest, SortOrder } from "../../shared/types";

type ContentType = {
  workouts: Workout[];
  error: ErrorRequest;
  isLoading: boolean;
  deleteWorkoutById: (ids: string[]) => void;
};

const Content: React.FC<ContentType> = ({ workouts, error, isLoading, deleteWorkoutById }) => {
  const [open, setOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [comment, setComment] = useState("");
  const [order, setOrder] = useState<SortOrder>("asc");
  const [orderBy, setOrderBy] = useState<keyof Workout>("date");
  const [errorState, setErrorState] = useState<null | string>(null);
  const { darkMode } = useContext(DarkOrLightThemeContext);

  const selectedRow = useRef<any>({});

  const [handleSelect, setSelected, selected] = useSelectRows();

  const isSelected = (id: string) => {
    return selected.indexOf(id) !== -1;
  };

  const handleClick = (event: React.MouseEvent, id: string, row: Workout) => {
    handleSelect(selectedRow, event, id, row);
  };

  const handleOpenComment = (comment: string) => {
    setComment(comment);
    setTypeModal("comment");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    selectedRow.current.value = {};
  };

  const onDelete = () => {
    deleteWorkoutById(selected);
    setSelected([]);
    selectedRow.current.value = {};
  };

  const onAdd = () => {
    setTypeModal("add");
    setOpen(true);
  };

  const onEdit = () => {
    if (selected.length > 1) {
      setErrorState("Можно выбрать только 1 элемент");
    } else {
      setErrorState(null);
      setTypeModal("edit");
      setOpen(true);
      setSelected([]);
    }
  };

  const handleRequestSort = (property: keyof Workout) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Grid item md={10} xs={12}>
      <Actions
        selected={selected}
        onDelete={onDelete}
        onAdd={onAdd}
        onEdit={onEdit}
      />
      <Grid item md={12} xs={12}>
        <AlertCustom error={error || errorState} />
        <Loading isLoading={isLoading} />
      </Grid>
      <TableStyle theme={darkMode}>
        <TableContainer component={Paper}>
          <Table className="table" aria-label="simple table">
            <HeaderRow
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableRows
              rows={getSortedWorkouts(workouts, order, orderBy)}
              isSelected={isSelected}
              handleClick={handleClick}
              handleOpen={handleOpenComment}
            />
          </Table>
        </TableContainer>
      </TableStyle>

      <ModalWindows
        handleClose={handleClose}
        selected={selectedRow.current.value}
        text={comment}
        open={open}
        type={typeModal}
      />
    </Grid>
  );
};

export default Content;
