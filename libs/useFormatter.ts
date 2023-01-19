export const useFormatter = () => ({
  formatPrice: (price: number) => {
    return price.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL'
    });
  },

  // Se qtde for menor que 10 repete com zero senão retorna qtde
  formatQuantity: (qt: number, minDigits: number) => {
    if(qt.toString().length >= minDigits) return qt;

    const remain = minDigits - qt.toString().length;
    return `${'0'.repeat(remain)}${qt}`;
  }
});