let puntajes = {
  interest: 30,
  purshaseCapacity: 10,
  paymentCapacity: 10,
  monthOfDebts: 20,
  realSavings: 30,
};

export type VectorFactor = {
  interest(n): number;
  purshaseCapacity(n): number;
  monthlyPercentegeSalary(n): number;
  monthOfDebts(n): number;
  realSavings(n): number;
};

const interest = (n): number => {
  if (n >= 0.8) return puntajes.interest;

  return puntajes.interest * n;
};

const monthOfDebts = (n): number => {
  if (n > 2) return 0;
  if (n <= 1) return puntajes.monthOfDebts;

  return puntajes.monthOfDebts * (1 - n);
};

const purshaseCapacity = (n): number => {
  if (n > 1) return puntajes.purshaseCapacity;
  if (n <= 0) return 0;

  return puntajes.purshaseCapacity * n;
};

const realSavings = (n): number => {
  if (n > 0.8) return puntajes.realSavings;
  if (n <= 0) return 0;

  return puntajes.realSavings * n;
};

const monthlyPercentegeSalary = (n): number => {
  if (n <= 0.3) return puntajes.paymentCapacity;
  if (n >= 0.8) return 0;

  return puntajes.paymentCapacity * n;
};

export default {
  interest,
  purshaseCapacity,
  monthlyPercentegeSalary,
  monthOfDebts,
  realSavings,
} as VectorFactor;
