const chai = require('chai')
const server = require('../app')
const chaiHttp = require('chai-http')
const should = chai.should()
chai.use(chaiHttp)

describe('POST', () => {
    it('should respond with a success message along with 2 properties', (done) => {
        let request = {
            'payload': [
                {
                    'address': {
                        'buildingNumber': '28',
                        'lat': -33.912542000000002,
                        'lon': 151.00293199999999,
                        'postcode': '2198',
                        'state': 'NSW',
                        'street': 'Donington Ave',
                        'suburb': 'Georges Hall'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'init',
                    'reference': 'aqsdasd',
                    'shortId': '6Laj49N3PiwZ',
                    'status': 0,
                    'type': 'htv',
                    'workflow': 'pending'
                },
                {
                    'address': {
                        'buildingNumber': 'Level 6',
                        'postcode': '2060',
                        'state': 'NSW',
                        'street': '146 Arthur Street',
                        'suburb': 'North Sydney'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'init',
                    'reference': 'asdasd',
                    'shortId': 'E9eQVYEMkub2',
                    'status': 4,
                    'type': 'htv',
                    'valfirm': null,
                    'workflow': 'completed'
                },
                {
                    'address': {
                        'buildingNumber': '25',
                        'postcode': '4000',
                        'state': 'QLD',
                        'street': 'Mary St',
                        'suburb': 'Brisbane'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'init',
                    'reference': 'asdas',
                    'shortId': 'nQMyWWLBvu4A',
                    'status': 1,
                    'type': 'avm',
                    'workflow': 'pending'
                },
                {
                    'address': {
                        'buildingNumber': '92',
                        'postcode': '2000',
                        'state': 'NSW',
                        'street': 'Pitt Street',
                        'suburb': 'Sydney',
                        'unitNumber': 'Suite 1 Level 8'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'complete',
                    'reference': 'asdasd',
                    'shortId': 'ZM73nE4nKH56',
                    'status': 4,
                    'type': 'avm',
                    'workflow': 'cancelled'
                },
                {
                    'address': {
                        'buildingNumber': '28',
                        'lat': -33.912542000000002,
                        'lon': 151.00293199999999,
                        'postcode': '2198',
                        'state': 'NSW',
                        'street': 'Donington Ave',
                        'suburb': 'Georges Hall'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'complete',
                    'reference': 'asdasdas',
                    'shortId': 'AQzAB5xMXFNx',
                    'status': 3,
                    'type': 'avm',
                    'workflow': 'completed'
                },
                {
                    'address': {
                        'buildingNumber': '360',
                        'postcode': '3000',
                        'state': 'VIC',
                        'street': 'Elizabeth St',
                        'suburb': 'Melbourne',
                        'unitNumber': 'Level 28'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'complete',
                    'reference': 'asdas',
                    'shortId': 'yebZvgdA7FRk',
                    'status': 1,
                    'type': 'htv',
                    'workflow': 'completed'
                },
                {
                    'address': {
                        'buildingNumber': '153',
                        'postcode': '2229',
                        'state': 'NSW',
                        'street': 'Denman Avenue',
                        'suburb': 'CARINGBAH',
                        'unitNumber': 'Suite 7'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'complete',
                    'reference': 'asdas',
                    'shortId': 'YP7NJVNpVCdr',
                    'status': 4,
                    'type': 'htv',
                    'workflow': 'cancelled'
                }
            ]
        }

        chai.request(server)
            .post('/')
            .send(request)
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err)
                // there should be a 200 status code
                res.status.should.equal(200)
                // the response should be JSON
                res.type.should.equal('application/json')
                // the JSON response body should have a
                // key-value pair of {"data": [2 property objects]}
                res.body.response.length.should.eql(2)
                // the first object in the response array should
                // have the right keys
                res.body.response[0].should.include.keys(
                    'concataddress', 'type', 'workflow'
                )
                // the second object in the response array should
                // have the right keys
                res.body.response[1].should.include.keys(
                    'concataddress', 'type', 'workflow'
                )
                done()
            })
    })

    it('Mandatory fields - should respond with a error message along Could not decode request: JSON parsing failed', (done) => {
        let requests = []
        // Empty payload
        requests.push({})
        // Mandatory workflow
        requests.push({
            'payload': [
                {
                    'address': {
                        'buildingNumber': '28',
                        'lat': -33.912542000000002,
                        'lon': 151.00293199999999,
                        'postcode': '2198',
                        'state': 'NSW',
                        'street': 'Donington Ave',
                        'suburb': 'Georges Hall'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'init',
                    'reference': 'aqsdasd',
                    'shortId': '6Laj49N3PiwZ',
                    'status': 0,
                    'type': 'htv'
                }
            ]
        })
        // Mandatory type
        requests.push({
            'payload': [
                {
                    'address': {
                        'buildingNumber': '28',
                        'lat': -33.912542000000002,
                        'lon': 151.00293199999999,
                        'postcode': '2198',
                        'state': 'NSW',
                        'street': 'Donington Ave',
                        'suburb': 'Georges Hall'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'init',
                    'reference': 'aqsdasd',
                    'shortId': '6Laj49N3PiwZ',
                    'status': 0,
                    'workflow': 'completed'
                }
            ]
        })
        // Mandatory suburb
        requests.push({
            'payload': [
                {
                    'address': {
                        'buildingNumber': '28',
                        'lat': -33.912542000000002,
                        'lon': 151.00293199999999,
                        'postcode': '2198',
                        'state': 'NSW',
                        'street': 'Donington Ave'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'init',
                    'reference': 'aqsdasd',
                    'shortId': '6Laj49N3PiwZ',
                    'status': 0,
                    'type': 'htv',
                    'workflow': 'completed'
                }
            ]
        })
        // Mandatory street
        requests.push({
            'payload': [
                {
                    'address': {
                        'buildingNumber': '28',
                        'lat': -33.912542000000002,
                        'lon': 151.00293199999999,
                        'postcode': '2198',
                        'state': 'NSW',
                        'suburb': 'Georges Hall'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'init',
                    'reference': 'aqsdasd',
                    'shortId': '6Laj49N3PiwZ',
                    'status': 0,
                    'type': 'htv',
                    'workflow': 'completed'
                }
            ]
        })
        // Mandatory state
        requests.push({
            'payload': [
                {
                    'address': {
                        'buildingNumber': '28',
                        'lat': -33.912542000000002,
                        'lon': 151.00293199999999,
                        'postcode': '2198',
                        'street': 'Donington Ave',
                        'suburb': 'Georges Hall'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'init',
                    'reference': 'aqsdasd',
                    'shortId': '6Laj49N3PiwZ',
                    'status': 0,
                    'type': 'htv',
                    'workflow': 'completed'
                }
            ]
        })
        // Mandatory postcode
        requests.push({
            'payload': [
                {
                    'address': {
                        'buildingNumber': '28',
                        'lat': -33.912542000000002,
                        'lon': 151.00293199999999,
                        'state': 'NSW',
                        'street': 'Donington Ave',
                        'suburb': 'Georges Hall'
                    },
                    'propertyTypeId': 3,
                    'readyState': 'init',
                    'reference': 'aqsdasd',
                    'shortId': '6Laj49N3PiwZ',
                    'status': 0,
                    'type': 'htv',
                    'workflow': 'completed'
                }
            ]
        })
        for (let request of requests) {
            chai.request(server)
                .post('/')
                .send(request)
                .end((err, res) => {
                    should.exist(err)
                    res.status.should.equal(400)
                    res.type.should.equal('application/json')
                    res.body.should.include.keys(
                        'error'
                    )
                    res.body.error.should.eql('Could not decode request: JSON parsing failed')
                })
        }
        done()
    })
})
