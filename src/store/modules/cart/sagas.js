import { call, put, select, all, takeLatest } from "redux-saga/effects";
import api from "../../../services/api";
import { formatPrice } from "../../../util/format";
import { addToCartSuccess, updateAmount } from "./actions";
import { toast } from "react-toastify";
function* addToCart({ id }) {
    const porductExists = yield select((state) =>
        state.cart.find((p) => p.id === id)
    );
    const stock = yield call(api.get, `/stock/${id}`);

    const stockAmount = stock.data.amount;
    const currentAmount = porductExists ? porductExists.amount : 0;

    const amount = currentAmount + 1;
    if (amount > stockAmount) {
        toast.error("Quantidade solicitada fora de estoque.")
        return;
    }
    if (porductExists) {
        yield put(updateAmount(id, amount));
    } else {
        const response = yield call(api.get, `/products/${id}`);
        const data = {
            ...response.data,
            amount: 1,
            formatedPrice: formatPrice(response.data.price),
        };
        yield put(addToCartSuccess(data));
    }
}

export default all([takeLatest("@cart/ADD_REQUEST", addToCart)]);
