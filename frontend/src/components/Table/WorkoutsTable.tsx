import React, {
  useState,
  useRef,
  useContext,
  ChangeEvent,
  useMemo,
} from "react";
import { Table, TableContainer, Paper, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { getSortedWorkouts } from "../../utils/sort/sortFunctions";
import Actions from "./Actions/Actions";
import TableRows from "./TableRows/TableRows";
import HeaderRow from "./HeaderRow/HeaderRow";
import Loading from "../../shared/components/Loading/Loading";
import ModalWindows from "./ModalWindows/ModalWindows";
import AlertCustom from "../../shared/components/AlertError/AlertError";
import "./Table.scss";
import { useSelectRows } from "../../shared/hooks/useSelectRows";
import { DarkOrLightThemeContext } from "../../context";
import { TableStyle } from "../../DarkMode";
import {
  Workout,
  ErrorRequest,
  SortOrder,
  TypeModal,
  Filter,
} from "../../shared/types";
import { workoutValidationErrorMessages } from "../../constants";
import {
  useDeleteWorkoutsMutation,
  useGetAllWorkoutsQuery,
} from "../../api/workoutApi";
import Filters from "../../shared/components/Filter/Filters";

type ContentType = {
  workouts: Workout[];
  error: ErrorRequest;
  isLoading: boolean;
  deleteWorkoutById: (ids: string[]) => void;
  totalPages: number;
};

// const Content: React.FC<ContentType> = ({ workouts, error, isLoading, deleteWorkoutById, totalPages }) => {
export const WorkoutsTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [typeModal, setTypeModal] = useState<TypeModal>("");
  const [comment, setComment] = useState("");
  const [order, setOrder] = useState<SortOrder>("asc");
  const [orderBy, setOrderBy] = useState<keyof Workout>("date");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [errorState, setErrorState] = useState<null | string>(null);
  const [page, setPage] = useState<number>(1);

  const {
    data,
    isLoading,
    error = {},
  } = useGetAllWorkoutsQuery({ page, size: 5, filters: selectedFilters });
  const [deleteWorkouts] = useDeleteWorkoutsMutation();

  const workouts = useMemo(
    () => data?.workouts || ([] as Workout[]),
    [data?.workouts]
  );
  const totalPages = useMemo(() => data?.totalPages || 1, [data?.totalPages]);
  const typesWorkout = useMemo(
    () => data?.typesWorkout || [],
    [data?.typesWorkout]
  );

  const { darkMode } = useContext(DarkOrLightThemeContext);

  const selectedRow = useRef<any>({});

  const [handleSelect, setSelected, selected] = useSelectRows();

  const isSelected = (id: string) => {
    return selected.indexOf(id) !== -1;
  };

  const handleChangePage = (event: ChangeEvent<any>, value: number) => {
    setPage(value);
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
    deleteWorkouts({ ids: selected });
    setSelected([]);
    selectedRow.current.value = {};
  };

  const onAdd = () => {
    setTypeModal("add");
    setOpen(true);
  };

  const onEdit = () => {
    if (selected.length > 1) {
      setErrorState(workoutValidationErrorMessages.onlyElement);
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

  const onToggleFilters = (selected: Filter[]) => {
    setSelectedFilters(selected);
  };

  return (
    <Grid container item xs={12}>
      <Grid item xs={2}>
        <Filters
            labels={typesWorkout}
            onToggleFilters={onToggleFilters}
            selectedFilters={selectedFilters}
          />
      </Grid>
      <Grid item md={10} xs={12}>
        <Actions
          selected={selected}
          onDelete={onDelete}
          onAdd={onAdd}
          onEdit={onEdit}
        />
        <Grid item md={12} xs={12}>
          <AlertCustom error={"data" in error ? (error?.data as string) : errorState} />
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
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handleChangePage}
          page={page}
        />
        <ModalWindows
          handleClose={handleClose}
          selected={selectedRow.current.value}
          text={comment}
          open={open}
          type={typeModal}
        />
      </Grid>
    </Grid>
  );
};
