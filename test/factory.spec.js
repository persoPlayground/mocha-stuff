const { expect} = require('chai');

const factoryWithConfig = require('../lib/factory');

describe('validation', () => {
    let validator;
    let validatorConfig;
    context('using the `default` validator rules', () => {
        beforeEach(() => {
            validatorConfig =function () { 
                validatorConfig.callCount++;
                validatorConfig.args = Array.prototype.slice.call(arguments);
                return [
                    { type: 'nonPositive'},
                    { type: 'nonDivisible', options: { divisior: 3, error: 'error.three'}},
                    { type: 'nonDivisible', options: { divisior: 5, error: 'error.five'}},
                ];
            }
            validatorConfig.callCount = 0;
            const newValidator = factoryWithConfig(validatorConfig);
            validator = newValidator('default');

        });

        it('it will access the config to get the validation rule ', () => {
            expect(validatorConfig.callCount).to.be.equal(1);
            expect(validatorConfig.args).to.be.deep.equal(['default']);
        });
        it('it include error.three', () => {
            expect(validator(3)).to.include('error.three');
        });
    });

    context('using the `alternative` validator rules', () => {
        beforeEach(() => {
            validatorConfig =function () { 
                validatorConfig.callCount++;
                validatorConfig.args = Array.prototype.slice.call(arguments);
                return [
                    { type: 'nonPositive'},
                    { type: 'nonDivisible', options: { divisior: 11, error: 'error.eleven'}}
                ];
            }
            validatorConfig.callCount = 0;
            const newValidator = factoryWithConfig(validatorConfig);
            validator = newValidator('alternative');

        });

        it('it will access the config to get the validation rule ', () => {
            expect(validatorConfig.callCount).to.be.equal(1);
            expect(validatorConfig.args).to.be.deep.equal(['alternative']);
        });
        it('it include error.eleven', () => {
            expect(validator(11)).to.include('error.eleven');
        });
    });
})