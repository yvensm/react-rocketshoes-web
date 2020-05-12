import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { ProductList } from "./styles";
import { MdShoppingBasket } from "react-icons/md";
import { formatPrice } from "../../util/format";
import { useSelector, useDispatch } from "react-redux";
import * as CartActions from "../../store/modules/cart/actions";

function Home() {
    const [products, setProducts] = useState([]);
    // const [amount,setAmount] = useState({});
    const dispatch = useDispatch();

    const amount = useSelector((store) => {
        return store.cart.reduce((amount, product) => {
            amount[product.id] = product.amount;
            return amount;
        }, {});
    });

    useEffect(() => {
        const getProducts = async () => {
            const response = await api.get("products");
            const data = response.data.map((product) => ({
                ...product,
                priceFormated: formatPrice(product.price),
            }));
            setProducts(data);
        };
        getProducts();
    }, []);

    function handleAddProduct(id) {
        dispatch(CartActions.addToCartRequest(id));
    }

    return (
        <ProductList>
            {products.map((product) => (
                <li key={product.id}>
                    <img src={product.image} alt={product.title} />
                    <strong>{product.title}</strong>
                    <span>{product.priceFormated}</span>

                    <button
                        type="button"
                        onClick={() => {
                            handleAddProduct(product.id);
                        }}
                    >
                        <div>
                            <MdShoppingBasket size={16} color="#fff" />
                            {amount[product.id] || 0}
                        </div>
                        <span>ADICIONAR AO CARRINHO</span>
                    </button>
                </li>
            ))}
        </ProductList>
    );
}

export default Home;
