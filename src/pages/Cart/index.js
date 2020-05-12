import React from "react";
import {
    MdRemoveCircleOutline,
    MdAddCircleOutline,
    MdDelete,
} from "react-icons/md";
import { Container, ProductTable, Total } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../util/format";
import * as CartActions from "../../store/modules/cart/actions";

function Cart() {
    const [cart, formatedTotal] = useSelector((store) => {
        return [
            store.cart.map((product)=>({
              ...product,
              formatedSubtotal: formatPrice(product.amount*product.price), 
            })),
            formatPrice(
                store.cart.reduce((total, product) => {
                    return total + product.amount * product.price;
                }, 0)
            )
        ];
    });

    const dispatch = useDispatch();
    function handleDeleteProduct(product) {
        dispatch(CartActions.removeFromCart(product.id));
    }
    function handleIncreaseAmount(id, amount) {
        dispatch(CartActions.updateAmount(id, amount + 1));
    }
    function handleDecreaseAmount(id, amount) {
        dispatch(CartActions.updateAmount(id, amount - 1));
    }
    return (
        <Container>
            <ProductTable>
                <thead>
                    <tr>
                        <th />
                        <th>PRODUTO</th>
                        <th>QTD</th>
                        <th>SUBTOTAL</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {cart.map((product) => (
                        <tr>
                            <td>
                                <img src={product.image} alt="Tenis" />
                            </td>
                            <td>
                                <strong>{product.title}</strong>
                                <span>{product.priceFormated}</span>
                            </td>
                            <td>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDecreaseAmount(
                                                product.id,
                                                product.amount
                                            )
                                        }
                                    >
                                        <MdRemoveCircleOutline
                                            color="#7159c1"
                                            size={20}
                                        />
                                    </button>
                                    <input
                                        type="number"
                                        readOnly
                                        value={product.amount}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleIncreaseAmount(
                                                product.id,
                                                product.amount
                                            )
                                        }
                                    >
                                        <MdAddCircleOutline
                                            color="#7159c1"
                                            size={20}
                                        />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <strong>
                                    {product.formatedSubtotal}
                                </strong>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteProduct(product)}
                                >
                                    <MdDelete color="#7159c1" size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ProductTable>
            <footer>
                <button>Finalizar pedido</button>
                <Total>
                    <span>TOTAL</span>
                    <strong>{formatedTotal}</strong>
                </Total>
            </footer>
        </Container>
    );
}

export default Cart;
