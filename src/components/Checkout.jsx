import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

export default function Checkout() {
    const userProgressContext = useContext(UserProgressContext);
    const cartContext = useContext(CartContext);
    const cartTotal = cartContext.items.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)

    function handleCloseCartCheckout() {
        userProgressContext.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartContext.items,
                    customer: customerData
                }
            })
        });
    }

    return (
        <Modal open={userProgressContext.progress === 'checkout'} onClose={handleCloseCartCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full name" type="text" id="name" />
                <Input label="E-mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="city" id="city" />
                </div>
                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleCloseCartCheckout}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}
