import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  padding-bottom: 12px;
`;

const StyledForm = styled.div`
  label {
    color: #50565b;
    font-size: 14px;
    line-height: 28px;
    margin-bottom: 4px;
  }

  input {
    display: block;
    font-size: 16px;
    height: 42px;
    line-height: 16px;
    padding-top: 0;
  }

  select {
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9Imljb24iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDpub25lO30KPC9zdHlsZT4KPHBvbHlnb24gcG9pbnRzPSIxNiwyMiA2LDEyIDcuNCwxMC42IDE2LDE5LjIgMjQuNiwxMC42IDI2LDEyICIvPgo8cmVjdCBpZD0iX3gzQ19UcmFuc3BhcmVudF9SZWN0YW5nbGVfeDNFXyIgY2xhc3M9InN0MCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIi8+Cjwvc3ZnPgo=");
    background-position: right 4px center;
    background-repeat: no-repeat;
    background-size: 24px;
    display: block;
    font-size: 16px;
    height: 42px;
    line-height: 20px;
    padding-top: 0;
  }

  textarea {
    height: 160px;
    font-size: 16px;
    line-height: 21px;
    padding-bottom: 10px;
    padding-top: 10px;
  }

  input,
  select,
  textarea {
    background-color: #f2f4f8;
    border: 2px solid transparent;
    border-radius: 0;
    box-shadow: none;
    box-sizing: border-box;
    outline: none;
    padding-left: 12px;
    padding-right: 12px;
    width: 100%;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border: 2px solid #0062ff;
    box-shadow: none;
    outline: none;
  }

  button {
    background-color: #0062ff;
    border-radius: 2px;
    border: 0;
    color: #ffffff;
    display: block;
    font-size: 18px;
    height: 48px;
    outline: none;
    padding-left: 32px;
    padding-right: 32px;
    text-decoration: none;
  }
`;

interface FormRowProps {
  children: ReactNode | ReactNodeArray;
}

export const FormRow: FunctionComponent<FormRowProps> = ({
  children
}: FormRowProps) => <StyledFormRow>{children}</StyledFormRow>;

interface FormProps {
  children: ReactNode | ReactNodeArray;
}

const Form: FunctionComponent<FormProps> = ({ children }: FormProps) => (
  <StyledForm>{children}</StyledForm>
);

export default Form;
