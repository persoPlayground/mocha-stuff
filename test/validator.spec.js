const { expect} = require('chai')

const {nonPositive, nonDivisableBy, validatorWith }= require('../lib/validator');


describe('validator', () => {
    let validator;

    beforeEach(() => {
        const validationRules = [
            nonPositive,
            nonDivisableBy(3, 'error.three'),
            nonDivisableBy(5, 'error.five')
        ];
        validator = validatorWith(validationRules);
    })
    it('returns error.nonpositive for not strictly positive', () => {
        expect(validator(0)).to.include('error.nonpositive');
    });
    it('returns error.three ', () => {
        expect(validator(3)).to.include('error.three');
    });
    it('returns error.three and  error.five', () => {
        expect(validator(15)).to.include('error.three');
        expect(validator(15)).to.include('error.five');
    });
    it('returns no error ', () => {
        expect(validator(1)).to.be.empty;
    });
});