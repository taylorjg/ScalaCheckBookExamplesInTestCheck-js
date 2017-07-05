import { expect } from 'chai';
import { check, gen } from 'mocha-testcheck';
import { interleave, interleaveWithBug } from './interleaving';

describe('interleave', () => {

    it('propInterleave', check(gen.array(gen.int), gen.array(gen.int), (xs, ys) => {
        const res = interleave(xs, ys);
        expect(res.length).to.equal(xs.length + ys.length);
    }));

    it('propInterleave (with deliberate bug)', check(gen.array(gen.int), gen.array(gen.int), (xs, ys) => {
        const res = interleaveWithBug(xs, ys);
        expect(res.length).to.equal(xs.length + ys.length);
    }));
});
