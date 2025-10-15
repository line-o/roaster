const util = require('./util.js')
const chai = require('chai')
const expect = chai.expect

// render array parameter names without square brackets
const paramsSerializer = {
    indexes: null
}


describe('endpoint with an object parameter in query', function () {
    const params = {
        obj: { key: 'value' }
    }

    let res, parameters

    before(async function () {
        try {
            res = await util.axios.get('api/objects', {
                params,
                paramsSerializer
            })
            parameters = res?.data?.parameters
        } catch (err) {
            res = err.response
            parameters = null
        }
    })

    it('the query fails with error not implmented', async function () {
        expect(res.status).to.equal(501)
    })

    it('has an actionable error message', function () {
        expect(res.data.description).to.include('The query-parameter "obj" is of type "object", which is not supported yet.')
    })
});

