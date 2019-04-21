const nonPositive = (n, errors) => n <= 0 && errors.push('error.nonpositive');
const nonDivisableBy = (divisor, errorMessage) => (n, errors) => n % divisor === 0 && errors.push(errorMessage);

module.exports = {
    validatorWith: (validationRules) =>  (n) =>
    validationRules.reduce((result, validator) => {
    validator(n,result);
    return result;
   }, []),
   nonPositive,
   nonDivisableBy
};
