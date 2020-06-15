import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled, { css } from "styled-components";
import { CheckIcon, ErrorIcon, InfoIcon, WarnIcon } from "./Icon";

interface StyledNotificationProps {
  readonly type: "error" | "info" | "success" | "warning";
}

const StyledNotification = styled.div<StyledNotificationProps>`
  border-style: solid;
  border-left-width: 3px;
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  padding-left: 46px;
  padding-right: 32px;
  position: relative;

  ${({ type }) =>
    type === "error" &&
    css`
      background-color: #fff1f1;
      border-left-color: #da1e28;
      border-top-color: #feacb3;
      border-right-color: #feacb3;
      border-bottom-color: #feacb3;
    `}

  ${({ type }) =>
    type === "info" &&
    css`
      background-color: #edf5ff;
      border-left-color: #0043ce;
      border-top-color: #a2c0f8;
      border-right-color: #a2c0f8;
      border-bottom-color: #a2c0f8;
    `}

  ${({ type }) =>
    type === "success" &&
    css`
      background-color: #defbe6;
      border-left-color: #24a148;
      border-top-color: #90e3b1;
      border-right-color: #90e3b1;
      border-bottom-color: #90e3b1;
    `}
  
  ${({ type }) =>
    type === "warning" &&
    css`
      background-color: #fdf6dd;
      border-left-color: #f1c21b;
      border-top-color: #f9d965;
      border-right-color: #f9d965;
      border-bottom-color: #f9d965;
    `}
`;

interface NotificationProps {
  readonly children: ReactNode | ReactNodeArray;
  readonly type?: "error" | "info" | "success" | "warning";
}

const Notification: FunctionComponent<NotificationProps> = ({
  children,
  type = "info"
}) => (
  <StyledNotification type={type}>
    {children}
    <div
      style={{
        height: "20px",
        position: "absolute",
        left: "13px",
        top: "15px",
        width: "20px"
      }}
    >
      {type === "error" && <ErrorIcon color="#da1e28" type="filled" />}
      {type === "info" && <InfoIcon color="#0043ce" type="filled" />}
      {type === "success" && <CheckIcon color="#24a148" type="filled" />}
      {type === "warning" && <WarnIcon color="#f1c21b" type="filled" />}
    </div>
  </StyledNotification>
);

export default Notification;
