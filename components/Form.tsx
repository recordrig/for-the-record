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

  textarea {
    height: 160px;
    font-size: 16px;
    line-height: 21px;
    padding-bottom: 10px;
    padding-top: 10px;
  }

  input,
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
    -webkit-appearance: none;
  }

  input:focus,
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
