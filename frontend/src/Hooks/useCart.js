import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

const CartContext = createContext(null);
const cart_key = 'cart';
const empty_cart = {
    items: [],
    totalPrice: 0,
    totalcount: 0,
};

export default function Provider({ children }) {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState(empty_cart.items);
    const [totalPrice, setTotalPrice] = useState(empty_cart.totalPrice);
    const [totalCount, setTotalCount] = useState(empty_cart.totalCount);

    useEffect(() => {
        if (user) {
            const initCart = getCartFromLocal();
            setCartItems(initCart.items);
            setTotalPrice(initCart.totalPrice);
            setTotalCount(initCart.totalCount);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const totalPrice = sum(cartItems.map(item => item.price));
            const totalCount = sum(cartItems.map(item => item.quantity));
            setTotalPrice(totalPrice);
            setTotalCount(totalCount);

            localStorage.setItem(cart_key + user.id, JSON.stringify({
                items: cartItems,
                totalPrice,
                totalCount,
            }));
        }
    }, [cartItems, user]);

    function getCartFromLocal() {
        const stored = localStorage.getItem(cart_key + user.id);
        return stored ? JSON.parse(stored) : empty_cart;
    }

    const sum = items => {
        return items.reduce((prev, cur) => prev + cur, 0);
    };

    const removeitem = foodId => {
        const filteredcart = cartItems.filter(item => item.food.id !== foodId);
        setCartItems(filteredcart);
        toast.success("Removed from cart");
    };

    const changequant = (cartItem, newquant) => {
        const { food } = cartItem;

        const changes = {
            ...cartItem,
            quantity: newquant,
            price: food.price * newquant,
        };
        const updatedItems = cartItems.map(item => (item.food.id === cartItem.food.id ? changes : item));

        setCartItems(updatedItems);
        toast.success(<Link to='/cart'>Cart Updated</Link>)
    };

    const addmore = food => {
        const cartItem = cartItems.find(item => item.food.id === food.id);
        if (cartItem) {
            changequant(cartItem, cartItem.quantity + 1);
        } else {
            toast.success(<Link to='/cart'>Added to cart</Link>);
            setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
        }
    };

    
    const clearCart = () => {
        localStorage.removeItem(cart_key + user.id);
        const { items, totalPrice, totalCount } = empty_cart;
        setCartItems(items);
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);
    };

    return (
        <CartContext.Provider value={{ cart: { items: cartItems, totalPrice, totalCount }, removeitem, changequant, addmore, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);