export default function calculateAmount(totalAmount) {
  if (totalAmount < 0) {
    return null;
  }

  const supplyAmount = Math.round(totalAmount / 1.1);
  const VAT = totalAmount - supplyAmount;

  return {
    supplyAmount,
    VAT,
  };
}

// Test
const result = calculateAmount("1100");
console.log(result); // { supplyAmount: 1000, VAT: 100 }
