import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { ShoppingBagProduct } from "../store/shoppingBag";
import MenuBar from "./MenuBar";

interface MenuBarContainerProps {
  readonly shoppingBag: readonly ShoppingBagProduct[];
}

const MenuBarContainer: FunctionComponent<MenuBarContainerProps> = ({
  shoppingBag
}) => <MenuBar products={shoppingBag} />;

const mapStateToProps = state => {
  return {
    shoppingBag: state.shoppingBag
  };
};

const MenuBarConnected = connect(mapStateToProps, null)(MenuBarContainer);

export default MenuBarConnected;
