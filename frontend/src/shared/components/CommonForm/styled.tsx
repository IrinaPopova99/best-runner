import styled from "@emotion/styled";
import { KeyboardDatePicker } from "@material-ui/pickers";

export const KeyboardDatePickerCustom = styled(KeyboardDatePicker)`
  & > .MuiPaper-root {
    background: #f8f8f8 !important;
    box-shadow: -5px -5px 10px #ffffff, 5px 5px 10px #e8e8e8 !important;
    border-radius: 10px !important;
  }
  & > .MuiPaper-rounded {
    background: #f8f8f8 !important;
    box-shadow: -5px -5px 10px #ffffff, 5px 5px 10px #e8e8e8 !important;
    border-radius: 10px !important;
  }
  & > .MuiPaper-elevation8 {
    background: #f8f8f8 !important;
    box-shadow: -5px -5px 10px #ffffff, 5px 5px 10px #e8e8e8 !important;
    border-radius: 10px !important;
  }
  & > .MuiPickersDay-daySelected {
    background-color: #f8f8f8 !important;
  }
`;

export const Custom = styled.div`
  & > .MuiPickersDay-daySelected {
    background-color: #f8f8f8 !important;
  }
  & div {
    background: green !important;
    box-shadow: -5px -5px 10px #ffffff, 5px 5px 10px #e8e8e8 !important;
    border-radius: 10px !important;
  }
  & .MuiPaper-rounded {
    background: #f8f8f8 !important;
    box-shadow: -5px -5px 10px #ffffff, 5px 5px 10px #e8e8e8 !important;
    border-radius: 10px !important;
  }
  & .MuiPaper-elevation8 {
    background: #f8f8f8 !important;
    box-shadow: -5px -5px 10px #ffffff, 5px 5px 10px #e8e8e8 !important;
    border-radius: 10px !important;
  }
`;
