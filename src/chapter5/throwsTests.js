import { expect } from 'chai';
import { check, gen } from 'mocha-testcheck';

describe('throws', () => {

    // Dividing by zero in JavaScript results in Infinity rather than an exception.
    // https://stackoverflow.com/questions/8072323/best-way-to-prevent-handle-divide-by-0-in-javascript/8072369#8072369
    function notZero(n) {
        n = +n;  // Coerce to number.
        if (!n) {  // Matches +0, -0, NaN
            throw new Error('Invalid dividend ' + n);
        }
        return n;
    }

    it('propDivByZero', check(gen.int, n => {
        expect(() => n / notZero(0)).to.throw(Error);
    }));
});
