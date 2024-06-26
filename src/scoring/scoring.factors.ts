/**
 * Score asigned to indicator
 */
let puntajes = {
  interest: 30,
  purshaseCapacity: 10,
  paymentCapacity: 10,
  monthOfDebts: 20,
  realSavings: 30,
};

/**
 * Vector with the factors table
 */
export type VectorFactor = {
  /**
   * Calculation of the factor associated with the purchase interest.
   * @remarks
   * If the indicator is greater or equal to 0.8, then we assign all the score of the indicator. Otherwise, `indicator * score`.
   *
   * @param n value of indicator
   * @returns score related to the indicator.
   */
  interest(n): number;
  /**
   * Calculation of the factor associated with the purchase capacity.
   *
   * @remarks
   * If the indicator is greater than 1, then we assign all the score of the indicator.
   * If the indicator is less or equals to 0, then we assing 0 score.
   *
   * Otherwise, `indicator * score`.
   *
   * @param n value of indicator
   * @returns score related to the indicator.
   */
  purshaseCapacity(n): number;
  /**
   * Calculation of the factor associated with the monthlt percentege salary.
   *
   * @remarks
   * If the indicator is greater than 0.8, then we assing 0 score.
   * If the indicator is less or equals to 0.3, then we assign all the score of the indicator.
   *
   * Otherwise, `indicator * score`.
   *
   * @param n value of indicator
   * @returns score related to the indicator.
   */
  monthlyPercentegeSalary(n): number;
  /**
   * Calculation of the factor associated with the month of debts.
   *
   * @remarks
   * If the indicator is greater or equals to 2, then we assing 0 points.
   * If the indicator is less or equals to 1, then we assign all the score of the indicator.
   *
   * Otherwise, `(1 - indicator) * score`.
   *
   * @param n value of indicator
   * @returns score related to the indicator.
   */
  monthOfDebts(n): number;
  /**
   * Calculation of the factor associated with the purchase capacity including the total amount of debts.
   *
   * @remarks
   * If the indicator is greater than 0.8, then we assign all the score of the indicator.
   * If the indicator is less or equals to 0, then we assing 0 score.
   *
   * Otherwise, `indicator * score`.
   *
   * @param n value of indicator
   * @returns score related to the indicator.
   */
  realSavings(n): number;
};

/**
 * @see {@link VectorFactor.interest}
 */
const interest = (n): number => {
  if (n >= 0.8) return puntajes.interest;

  return puntajes.interest * n;
};

/**
 * @see {@link VectorFactor.monthOfDebts}
 */
const monthOfDebts = (n): number => {
  if (n > 2) return 0;
  if (n <= 1) return puntajes.monthOfDebts;

  return puntajes.monthOfDebts * (1 - n);
};

/**
 * @see {@link VectorFactor.purshaseCapacity}
 */
const purshaseCapacity = (n): number => {
  if (n > 1) return puntajes.purshaseCapacity;
  if (n <= 0) return 0;

  return puntajes.purshaseCapacity * n;
};

/**
 * @see {@link VectorFactor.realSavings}
 */
const realSavings = (n): number => {
  if (n > 0.8) return puntajes.realSavings;
  if (n <= 0) return 0;

  return puntajes.realSavings * n;
};

/**
 * @see {@link VectorFactor.monthlyPercentegeSalary}
 */
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
