import styled from "@emotion/styled";

export const BodyStyle = styled.div`
  background-color: ${(props) => (props.theme ? "#000c2a" : "#ffffff")};
  box-sizing: border-box;
  min-height: 100vh;
  & th,
  td {
    color: ${(props) => (props.theme ? "#dae4fb" : "#000")};
    & .sort-cell__arrow {
      color: #333333 !important;
    }
  }
  & .Mui-disabled {
    background-color: ${(props) =>
      props.theme ? "#989898" : "rgba(0, 0, 0, 0.12)"} !important;
  }
`;

export const TableStyle = styled.div`
  margin-bottom: 20px;

  & table {
    ${(props) =>
      props.theme
        ? "background-color: #011138; border: 1px solid #dae4fb !important;"
        : "background-color: #ffffff; border: 1px solid #dae4fb;"}
  }
  & span {
    color: ${(props) => (props.theme ? "#dae4fb" : "rgba(0, 0, 0, 0.60)")} !important;
  }
  & .MuiInputBase-root,
  label {
    color: ${(props) => (props.theme ? "#dae4fb" : "rgba(0, 0, 0, 0.60)")};
  }
`;

export const ChangeThemeButton = styled.div`
  color: ${(props) => (props.theme ? "#dae4fb" : "#000")} !important;
  margin: 0 0 40px 50px;
`;

export const ModalStyle = styled.div`
  & .fade-content {
    background-color: #001957;
    color: ${(props) => (props.theme ? "#dae4fb" : "#000")};
  }
  & .form-container {
    color: ${(props) => (props.theme ? "#dae4fb" : "#000")};
  }
`;

export const FilterStyle = styled.div`
  & .MuiInputBase-root,
  label,
  legend,
  span {
    color: ${(props) =>
      props.theme ? "#dae4fb" : "rgba(0, 0, 0)"} !important;
  }
`;

//
