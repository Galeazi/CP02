import React, { useContext, useEffect, useState } from "react";
import OrderContext from "../../context/OrderContext";
import { Layout } from "../../components";
import { CheckoutButton, DeleteButton, Prod, Payselect, Ptotal, Listselect } from "../../components/ShoppingCart/ShoppingCart.style";
import { priceFormat } from "../../helpers/priceFormat";

const Checkout = () => {
  const { hamburgerOrder, appettizerOrder, beveregeOrder, comboOrder, dessertOrder, order,
    setAppettizerOrder, setHamburgerOrder, setBeveregeOrder, setComboOrder, setDessertOrder } = useContext(OrderContext);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const getPaymentOptions = async () => {
    const url = "http://localhost:8000/payment/options";
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPaymentOptions();
  }, []);

  const removeItem = (index: number, itemType: string) => {
    const updatedOrder = { ...order };
    let updatedAppettizerOrder = [...appettizerOrder];
    let updatedBeverageOrder = [...beveregeOrder];
    let updatedComboOrder = [...comboOrder];
    let updatedDessertOrder = [...dessertOrder];

    if (itemType === "appettizer") {
      updatedAppettizerOrder = updatedAppettizerOrder.filter((_, i) => i !== index);
      setAppettizerOrder(updatedAppettizerOrder);
    } else if (itemType === "hamburger") {
      updatedHamburgerOrder = updatedHamburgerOrder.filter((_, i) => i !== index);
      setHamburgerOrder(updatedHamburgerOrder);
    } else if (itemType === "combo") {
      updatedComboOrder = updatedComboOrder.filter((_, i) => i !== index);
      setComboOrder(updatedComboOrder);
    } else if (itemType === "beverege") {
      updatedBeverageOrder = updatedBeverageOrder.filter((_, i) => i !== index);
      setBeveregeOrder(updatedBeverageOrder);
    } else if (itemType === "dessert") {
      updatedDessertOrder = updatedDessertOrder.filter((_, i) => i !== index);
      setDessertOrder(updatedDessertOrder);
    }

    setOrder(updatedOrder);
  };

  const handleCheckout = () => {
    if (!selectedPaymentOption) {
      console.error("Selecione uma forma de pagamento.");
      return;
    }
    console.log("Produtos:", order);
    console.log("Valor total:", priceFormat(order.totalValue));
    console.log("Forma de pagamento:", selectedPaymentOption);
  };

  return (
    <Layout>
      <h1>Checkout</h1>
      <div>
        {appettizerOrder.map((appettizer, index) => (
          <Prod key={index}>
            <p>
              {appettizer.name} - {appettizer.size} {priceFormat(appettizer.value)}
            </p>
            <DeleteButton onClick={() => removeItem(index, "appettizer")}>Excluir</DeleteButton>
          </Prod>
        ))}
        {hamburgerOrder.map((hamburger, index) => (
          <Prod key={index}>
            <p>
              {hamburger.name} {priceFormat(hamburger.value)}
            </p>
            <DeleteButton onClick={() => removeItem(index, "hamburger")}>Excluir</DeleteButton>
          </Prod>
        ))}
        {comboOrder.map((combo, index) => (
          <Prod key={index}>
            <p>
              {combo.name} {priceFormat(combo.value)}
            </p>
            <DeleteButton onClick={() => removeItem(index, "combo")}>Excluir</DeleteButton>
          </Prod>
        ))}
        {beveregeOrder.map((beverege, index) => (
          <Prod key={index}>
            <p>
              {beverege.name} {priceFormat(beverege.value)}
            </p>
            <DeleteButton onClick={() => removeItem(index, "beverege")}>Excluir</DeleteButton>
          </Prod>
        ))}
        {dessertOrder.map((dessert, index) => (
          <Prod key={index}>
            <p>
              {dessert.name} {priceFormat(dessert.value)}
            </p>
            <DeleteButton onClick={() => removeItem(index, "dessert")}>Excluir</DeleteButton>
          </Prod>
        ))}
      </div>
      <Payselect>
        <Ptotal>Total: {priceFormat(order.totalValue)}</Ptotal>
        <h2>Opções de Pagamento</h2>
        {isLoading ? (
          <p>Carregando opções de pagamento...</p>
        ) : (
          <Listselect onChange={(e) => setSelectedPaymentOption(e.target.value)}>
            <option value="">Selecione uma opção de pagamento</option>
            {products.map((paymentOption) => (
              <option key={paymentOption.id} value={paymentOption.id}>
                {paymentOption.text}
              </option>
            ))}
          </Listselect>
        )}
      </Payselect>
      <CheckoutButton onClick={handleCheckout} disabled={isCheckoutLoading}>
        {isCheckoutLoading ? "Finalizando..." : "Finalizar Compra"}
      </CheckoutButton>
    </Layout>
  );
};

export default Checkout;
