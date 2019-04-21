const nonPositive = (n, errors) => n <= 0 && errors.push('error.nonpositive');
const nonDivisableBy = (divisor, errorMessage) => (n, errors) => n % divisor === 0 && errors.push(errorMessage);

const nonDivisibleFactory = (config) => {
    return config.reduce((acc, current) => {
        if(current.type === 'nonDivisible'){
            acc.push(nonDivisableBy(current.options.divisior, current.options.error));
        }
        return acc;
    }, []);
}
const validatorWith = (validationRules) =>  (n) =>
    validationRules.reduce((result, validator) => {
    validator(n,result);
    return result;
   }, []);

module.exports = (config) =>
    (ruleSetName) => {
    const rules = config(ruleSetName);
    console.log('dddd', nonDivisibleFactory(rules))
       return validatorWith([
            nonPositive,
            ...nonDivisibleFactory(rules)
        ])
    }