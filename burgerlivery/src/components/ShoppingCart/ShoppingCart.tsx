import React, { useContext } from "react";
import OrderContext from "../../context/OrderContext";
import { Link } from "react-router-dom";
import { ShoppingCartElement, CheckoutButton, DeleteButton, Prod, ProdOne, Ptotal } from "./ShoppingCart.style";
import { priceFormat } from "../../helpers/priceFormat";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const { hamburgerOrder, appettizerOrder, beveregeOrder, comboOrder, dessertOrder, order,
    setAppettizerOrder, setHamburgerOrder, setBeveregeOrder, setComboOrder, setDessertOrder } = useContext(OrderContext);

  const removeItem = (index: number, itemType: string) => {
    if (itemType === "appettizer") {
      const updatedAppettizerOrder = [...appettizerOrder];
      updatedAppettizerOrder.splice(index, 1);
      setAppettizerOrder(updatedAppettizerOrder);
    } else if (itemType === "hamburger") {
      const updatedHamburgerOrder = [...hamburgerOrder];
      updatedHamburgerOrder.splice(index, 1);
      setHamburgerOrder(updatedHamburgerOrder);
    } else if (itemType === "combo") {
      const updatedComboOrder = [...comboOrder];
      updatedComboOrder.splice(index, 1);
      setComboOrder(updatedComboOrder)
    } else if (itemType === "beverege") {
      const updatedBeverageOrder = [...beveregeOrder];
      updatedBeverageOrder.splice(index, 1);
      setBeveregeOrder(updatedBeverageOrder)
    } else if (itemType === "dessert") {
      const updatedDessertOrder = [...dessertOrder];
      updatedDessertOrder.splice(index, 1);
      setDessertOrder(updatedDessertOrder)
    }
  };

  return (
    <ShoppingCartElement open={isOpen}>
      <h1>Carrinho de compras</h1>
      <div>
        {appettizerOrder.map((appettizer, index) => (
          <Prod>
            <p key={index}>
              {appettizer.name} - {appettizer.size}{" "}
              {priceFormat(appettizer.value)}
            </p>
            <DeleteButton onClick={() => removeItem(index, "appettizer")}>
              Excluir
            </DeleteButton>
          </Prod>
        ))}
      </div>
      <div>
        {hamburgerOrder.map((hamburger, index) => (
          <Prod>
            <p key={index}>
              {hamburger.name} {priceFormat(hamburger.value)}
            </p>
            <DeleteButton onClick={() => removeItem(index, "hamburger")}>
              Excluir
            </DeleteButton>
          </Prod>
        ))}
      </div>
      <div>
        {comboOrder.map((combo, index) => (
          <Prod>
            <p key={index}>
              {combo.name} - {combo.size}{" "}
              {priceFormat(combo.value)}
            </p>
            <DeleteButton onClick={() => removeItem(index, "combo")}>
              Excluir
            </DeleteButton>
          </Prod>
        ))}
      </div>
      <div>
        {beveregeOrder.map((beverage, index) => (
          <Prod>
            <p key={index}>
              {beverage.name} - {beverage.size}{" "}
              {priceFormat(beverage.value)}
            </p>
            <DeleteButton onClick={() => removeItem(index, "beverage")}>
              Excluir
            </DeleteButton>
          </Prod>
        ))}
      </div>
      <div>
        {dessertOrder.map((dessert, index) => (
          <Prod>
            <p key={index}>
              {dessert.name} - {dessert.size}{" "}
              {priceFormat(dessert.value)}
            </p>
            <DeleteButton onClick={() => removeItem(index, "dessert")}>
              Excluir
            </DeleteButton>
          </Prod>
        ))}
      </div>
      <ProdOne>
        <Ptotal>Total: {priceFormat(order.totalValue)}</Ptotal>
      </ProdOne>
      {order.totalValue > 0 && (
        <CheckoutButton as={Link} to="/checkout">
          Checkout
        </CheckoutButton>
      )}
    </ShoppingCartElement>
  );
};
