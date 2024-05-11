import React, { useContext } from 'react'
import logoImage from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);
    const totalCartItems = cartContext.items.reduce((acc, cur) => acc + cur.quantity, 0);

    function handleShowCart() {
        userProgressContext.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImage} alt="A restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}
