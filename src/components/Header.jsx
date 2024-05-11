import React, { useContext } from 'react'
import logoImage from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext';

export default function Header() {
    const cartContext = useContext(CartContext);
    const items = cartContext.items.reduce((acc, cur) => acc + cur.quantity, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImage} alt="A restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({items})</Button>
            </nav>
        </header>
    )
}
