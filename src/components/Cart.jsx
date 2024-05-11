import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import UserProgressContext from '../store/UserProgressContext';
import Button from './UI/Button';

export default function Cart() {
    const userProgressContext = useContext(UserProgressContext);
    const cartContext = useContext(CartContext);

    const cartTotal = cartContext.items.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)

    function handleCloseCart() {
        userProgressContext.hideCart();
    }

    return (
        <Modal className='cart' open={userProgressContext.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartContext.items.map(item => (
                    <li key={item.id}>{item.name} - {item.quantity}</li>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button onClick={handleCloseCart}>Go to Checkout</Button>
            </p>
        </Modal>
    )
}
