const csvToJson = require("csvtojson");
processLineItems = (lineItems) =>
  lineItems.map((lineItem) => ({
    ...lineItem,
    rate: Number(lineItem.rate),
    unit: Number(lineItem.unit),
  }));
processProducts = (products) =>
  products.map((product) => ({
    ...product,
    discount: Number(product.discount),
    tax: Number(product.tax),
  }));

const getUnitPrice = (item, product) => {
  const discount = (item.rate * product.discount) / 100;
  const tax = (item.rate * product.tax) / 100;
  const unitPrice = item.rate - discount + tax;
  return unitPrice;
};
const findProduct = (lineItem, convertedProducts) =>
  convertedProducts.find((product) => product.item === lineItem.item);
const addFields = (convertedLineItems, convertedProducts) =>
  convertedLineItems.map((lineItem) => ({
    ...lineItem,
    discount: findProduct(lineItem, convertedProducts).discount,
    tax: findProduct(lineItem, convertedProducts).tax,
    unitPrice: getUnitPrice(lineItem, findProduct(lineItem, convertedProducts)),
    lineItemPrice:
      lineItem.unit *
      getUnitPrice(lineItem, findProduct(lineItem, convertedProducts)),
  }));
const getTotal = (extendedLineItems) =>
  extendedLineItems
    .map((extendedLineItem) => extendedLineItem.lineItemPrice)
    .reduce((a, b) => a + b, 0);

const main = async () => {
  const lineItems = await csvToJson().fromFile("./lineItem.csv");
  const convertedLineItems = processLineItems(lineItems);
  const products = await csvToJson().fromFile("./product.csv");
  const convertedProducts = processProducts(products);
  const extendedLineItems = addFields(convertedLineItems, convertedProducts);
  const total = getTotal(extendedLineItems);
  console.table(extendedLineItems);

  console.log("total-", total);
};
main();
