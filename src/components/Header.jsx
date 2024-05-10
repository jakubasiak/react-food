import React from 'react'
import logoImage from '../assets/logo.jpg'

export default function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImage} alt="A restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <button>Cart (0)</button>
            </nav>
        </header>
    )
}
