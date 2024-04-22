import { styled } from "styled-components";
import { colors } from "../../styles/colors";

export const ShoppingCartElement = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 450px;
  height: 100vh;
  padding: 16px;
  background-color: ${colors.commom.white};
  transform: translateX(100%);
  transition: transform 0.2s ease-out;

  ${(props) =>
    props.open === true &&
    `
    transform: translateX(0);
    `}
`;

export const CheckoutButton = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background-color: green;
  color: ${colors.commom.white};
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;


  &:hover {
    background-color: darkgreen;
  }
`;

export const DeleteButton = styled.a`
  padding: 3px 6px;
  background-color: red;
  color: ${colors.commom.white};
  border-radius: 8px;
  text-decoration: none;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;

  &:hover {
    background-color: darkred;
  }
`;

export const Prod = styled.a`
  display: flex;
  padding: 6px 0px;
  border-bottom: 1.5px solid black;
 
  & > p {
    flex-grow: 1;
  }
`;

export const ProdOne = styled.div`
  padding-top: 35px;
  display: flex;
  justify-content: center;
`;

export const Ptotal = styled.p`
  font-weight: 600;
  position: fixed;
  bottom: 70px;
  right: 22px;
`;

export const Payselect = styled.div`
  position: fixed;
  bottom: 200px;
  right: 22px;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
  border-right: 1px solid black; 
  
`;

export const Listselect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid green;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  margin-bottom: 16px;
  width: 300px; 
  margin-right: 10px;
`;
