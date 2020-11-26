const util = require('./util.js');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const chaiResponseValidator = require('chai-openapi-response-validator');

const spec = path.resolve("./test/app/api.json");
chai.use(chaiResponseValidator(spec));

before(util.install);

after(util.uninstall);

describe('Path parameters', function () {
    it('passes parameter in last component of path', async function () {
        const res = await util.axios.get('api/paths/my-path');
        expect(res.status).to.equal(200);
        expect(res.data.parameters.path).to.equal('my-path');

        // expect(res).to.satisfyApiSpec;
    });
    it('handles get of path including $', async function () {
        const res = await util.axios.get('api/$op-er+ation*!');
        expect(res.status).to.equal(200);
        // expect(res).to.satisfyApiSpec;
    });
    it('handles post to path including $', async function () {
        const res = await util.axios.post('api/$op-er+ation*!');
        expect(res.status).to.equal(200);
        // expect(res).to.satisfyApiSpec;
    });
});

describe('Query parameters', function () {
    it('passes query parameters in GET', async function () {
        const res = await util.axios.get('api/parameters', {
            params: {
                num: 165.75,
                int: 776,
                bool: true,
                string: '&a=22'
            },
            headers: {
                "X-start": 22
            }
        });
        expect(res.status).to.equal(200);
        console.log(res.data.parameters);
        expect(res.data.parameters.num).to.be.a('number');
        expect(res.data.parameters.num).to.equal(165.75);
        expect(res.data.parameters.bool).to.be.a('boolean');
        expect(res.data.parameters.bool).to.be.true;
        expect(res.data.parameters.int).to.be.a('number');
        expect(res.data.parameters.int).to.equal(776);
        expect(res.data.parameters.string).to.equal('&a=22');
        expect(res.data.parameters.defaultParam).to.equal('abcdefg');
        expect(res.data.parameters['X-start']).to.equal(22);
    });

    it('passes query parameters in POST', async function () {
        const res = await util.axios.request({
            url: 'api/parameters',
            method: 'post',
            params: {
                'num': 165.75,
                'int': 776,
                'bool': true,
                'string': '&a=22'
            },
            headers: {
                "X-start": 22
            }
        });
        expect(res.status).to.equal(200);
        console.log(res.data);
        expect(res.data.method).to.equal('POST');
        expect(res.data.parameters.num).to.be.a('number');
        expect(res.data.parameters.num).to.equal(165.75);
        expect(res.data.parameters.bool).to.be.a('boolean');
        expect(res.data.parameters.bool).to.be.true;
        expect(res.data.parameters.int).to.be.a('number');
        expect(res.data.parameters.int).to.equal(776);
        expect(res.data.parameters.string).to.equal('&a=22');
        expect(res.data.parameters.defaultParam).to.equal('abcdefg');
        expect(res.data.parameters['X-start']).to.equal(22);
    });

    it('handles date parameters', async function () {
        const res = await util.axios.get('api/dates', {
            params: {
                date: "2020-11-24Z",
                dateTime: "2020-11-24T20:22:41.975Z"
            }
        });
        expect(res.status).to.equal(200);
        expect(res.data).to.be.true;
    });
});