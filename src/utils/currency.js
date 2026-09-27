export function pkr(amount) {
  if (amount === null || amount === undefined) return '—';
  return 'Rs ' + Math.round(amount).toLocaleString('en-PK');
}

export function pkrShort(amount) {
  if (amount >= 100000) return 'Rs ' + (amount / 100000).toFixed(1).replace(/\.0$/, '') + ' lac';
  return pkr(amount);
}
