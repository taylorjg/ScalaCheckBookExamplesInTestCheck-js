import 'babel-polyfill';
import { expect } from 'chai';
import { check, gen } from 'mocha-testcheck';
import { runLengthEnc, runLengthDec } from './runLengthEnc';

describe('run length encoding', () => {

    const rleItem =
        gen.intWithin(1, 20)
            .then(n => gen.alphaNumChar
                .then(c => [n, c]));

    const rleList = size => {
        if (size <= 1) return rleItem.then(item => [item]);
        return rleList(size - 1).then(tail => {
            const [[, c1],] = tail;
            return rleItem.suchThat(([, c2]) => c2 !== c1).then(head => [head, ...tail]);
        });
    };

    const genOutput = gen.sized(rleList);

    it('property test', check({ maxSize: 50 }, genOutput, r => {
        const decoded = Array.from(runLengthDec(r));
        const encoded = Array.from(runLengthEnc(decoded));
        expect(encoded).to.deep.equal(r);
    }));
});
