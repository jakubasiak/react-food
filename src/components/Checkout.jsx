import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
}

export default function Checkout() {
    const userProgressContext = useContext(UserProgressContext);
    const cartContext = useContext(CartContext);

    const {
        isLoading,
        data,
        error,
        sendRequest
    } = useHttp('http://localhost:3000/orders', null, requestConfig);

    const cartTotal = cartContext.items.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)

    function handleCloseCartCheckout() {
        userProgressContext.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartContext.items,
                customer: customerData
            }
        }));
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleCloseCartCheckout}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isLoading) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return <Modal open={userProgressContext.progress === 'checkout'} onClose={handleCloseCartCheckout}>
            <h2>Success!</h2>
            <p>Your order was submited successfully.</p>
            <p className="modal-actions">
                <Button onClick={handleCloseCartCheckout}>Ok</Button>
            </p>
        </Modal>
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
                {error && <Error title="Failed to submit order" message={error} />}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    )
}
