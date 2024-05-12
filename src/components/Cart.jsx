import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import UserProgressContext from '../store/UserProgressContext';
import Button from './UI/Button';
import CartItem from './CartItem';

export default function Cart() {
    const userProgressContext = useContext(UserProgressContext);
    const cartContext = useContext(CartContext);

    const cartTotal = cartContext.items.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)

    function handleCloseCart() {
        userProgressContext.hideCart();
    }

    function handleGoToCheckout() {
        userProgressContext.showCheckout()
    }

    return (
        <Modal className='cart' open={userProgressContext.progress === 'cart'}
            onClose={userProgressContext.progress === 'cart' ? handleCloseCart : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {cartContext.items.map(item => (
                    <CartItem key={item.id}
                        item={item}
                        onIncrease={() => cartContext.addItem(item)}
                        onDecrease={() => cartContext.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartContext.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}
