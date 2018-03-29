import { ReadOnlyPipe } from './readonly.pipe';

describe(`ReadOnly.pipe`, () => {
    let readOnlyPipe: ReadOnlyPipe;

    // synchronous beforeEach
    beforeEach(() => {
        readOnlyPipe = new ReadOnlyPipe();
    });

    it('Should be null', () => {
        expect(readOnlyPipe.transform(null)).toBeNull();
    });

    it('Should be jsut a string', () => {
        expect(readOnlyPipe.transform('just a string')).toEqual('just a string');
    });

    it('Should transform simple object into composed object', () => {
        let obj = {
            a: 'a1',
            b: 'b2',
            c: 'c3'
        };

        let res = readOnlyPipe.transform(obj);

        expect(res[0]).toEqual({ value: 'a1', key: 'a' });
        expect(res[1]).toEqual({ value: 'b2', key: 'b' });
        expect(res[2]).toEqual({ value: 'c3', key: 'c' });
    });

    it('Should transform deep object into array', () => {
        let obj = {
            a: { a: 'a1', b: 'b1', c: 'c1' },
            b: { a: 'a2', b: 'b2', c: 'c2' },
            c: { a: 'a3', b: 'b3', c: 'c3' }
        };

        let res = readOnlyPipe.transform(obj);

        expect(res[0]['c']).toEqual('c1');
        expect(res[1]['b']).toEqual('b2');
        expect(res[2]['a']).toEqual('a3');
    });

    it('Should transform deeper object into array', () => {
        let obj = {
            a: { a: { aa: 'aa1', ab: 'ab1' }, b: { ba: 'ba1', bb: 'bb1' }, c: { ca: 'ca1', cb: 'cb1' } },
            b: { a: { aa: 'aa2', ab: 'ab2' }, b: { ba: 'ba2', bb: 'bb2' }, c: { ca: 'ca2', cb: 'cb2' } }
        };

        let res = readOnlyPipe.transform(obj);

        expect(res[0]['c']['cb']).toEqual('cb1');
        expect(res[1]['b']['ba']).toEqual('ba2');
    });

    it('Should transform array into array with specific key', () => {

        let obj = { eleC: 'c3' };

        let res = readOnlyPipe.transform(obj, ['myKey']);

        expect(res[0]).toEqual({ value: 'c3', myKey: 'eleC'});
    });

    it('Should transform simple Map into array', () => {
        let mapObj = new Map();
        mapObj.set('eleA', 'a1');
        mapObj.set('eleB', 'b2');
        mapObj.set('eleC', 'c3');

        let res = readOnlyPipe.transform(mapObj);

        expect(res[0]).toEqual({ key: 'eleA', obj: 'a1' });
        expect(res[1]).toEqual({ key: 'eleB', obj: 'b2' });
        expect(res[2]).toEqual({ key: 'eleC', obj: 'c3' });
    });

    it('Should transform deep Map into array', () => {
        let mapObj = new Map();
        mapObj.set('eleA', { a: 'a1', b: 'b1', c: 'c1' });
        mapObj.set('eleB', { a: 'a2', b: 'b2', c: 'c2' });
        mapObj.set('eleC', { a: 'a3', b: 'b3', c: 'c3' });

        let res = readOnlyPipe.transform(mapObj);

        expect(res[0]).toEqual({ a: 'a1', b: 'b1', c: 'c1' });
        expect(res[1]).toEqual({ a: 'a2', b: 'b2', c: 'c2' });
        expect(res[2]).toEqual({ a: 'a3', b: 'b3', c: 'c3' });
    });

    it('Should transform complex Map into array', () => {

        let cyclicObj = {a: 'a1', b: 'b2'};
        cyclicObj['c'] = cyclicObj;

        let mapObj = new Map();
        mapObj.set('eleA', { a: 'a1', b: 'b1', c: 'c1' });
        mapObj.set('eleB', cyclicObj);
        mapObj.set('eleC', 'c3');

        let res = readOnlyPipe.transform(mapObj);

        expect(res[0]).toEqual({ a: 'a1', b: 'b1', c: 'c1' });
        expect(res[1]['c']['c']['b']).toEqual('b2');
        expect(res[2]).toEqual({ key: 'eleC', obj: 'c3' });
    });
});
