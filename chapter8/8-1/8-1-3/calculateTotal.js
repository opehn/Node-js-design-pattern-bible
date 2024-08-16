import { createObservable } from "./createObservable.js";

const invoice = {
  subtotal: 100,
  discount: 10,
  tax: 20,
};

function calculateTotal(invoice) {
  return invoice.subtotal - invoice.discount + invoice.tax;
}

let total = calculateTotal(invoice);
console.log(`Starting total: ${total}`);

const obsInvoice = createObservable(invoice, ({ prop, prev, curr }) => {
  total = calculateTotal(invoice);
  console.log(`${prop}이/가 ${prev}에서 ${curr}로 변경되었습니다.`);
  console.log(`total : ${total}`);
});

obsInvoice.subtotal = 200;
obsInvoice.discount = 20;
obsInvoice.discount = 20;
obsInvoice.tax = 30;

console.log(`Final total: ${total}`);
