export const formatPrice = (price) =>
    `R$ ${price.toFixed(2).toString().replace(/\./g, ",")}`;
