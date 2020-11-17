import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICE = {
  salad: 0.4,
  cheese: 0.3,
  meat: 1.4,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 0,
    purchaseable: false,
    purchasing: false,
  };
  updatePurchaseState() {
    const ingredients = {
      ...this.state.ingredients,
    };
    const sum = Object.keys(ingredients)
      .map((igKeg) => {
        return ingredients[igKeg];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    const updateCount = oldCount + 1;
    const updateIngredient = {
      ...this.state.ingredients, //spread operator
    };
    updateIngredient[type] = updateCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updateIngredient }); // using setState to set up new state of the ingredient
    this.updatePurchaseState(updateIngredient);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredient = {
      ...this.state.ingredients, //spread operator
    };
    updateIngredient[type] = updateCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updateIngredient }); // using setState to set up new state of the ingredient
    this.updatePurchaseState(updateIngredient);
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    alert('You continue!!');
  };
  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
