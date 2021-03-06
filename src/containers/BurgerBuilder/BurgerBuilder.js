import React, {Component} from "react";
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.5,
    cheese: 0.5,
    meat: 1.5
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 2,
        purchasable: false,
        purchasing: false,
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key] //the array of ingredient values
            })
            .reduce((newSum, el) => {
                return newSum + el;
            }, 0);
        this.setState({purchasable: sum > 0})
    }

    //method

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    };
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount;
        if (oldCount > 0) {
            updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
            this.updatePurchaseState(updatedIngredients);
        } else {
            return null
        }
    };
    purchaseHandler = () => {
        this.setState({purchasing: true})
    };
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };
    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  purchaseCancelled={this.purchaseCancelHandler}
                                  purchaseContinued={this.purchaseContinueHandler}
                                  price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
};
export default BurgerBuilder;