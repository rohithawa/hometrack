'use strict'

const Validator = require('jsonschema').Validator
const jv = new Validator()

class Util {

    concatAddress(address) {
        var concatAdd = ''
        concatAdd = concatAdd.concat(this.buildConcatAddress(address.unitNumber, concatAdd))
        concatAdd = concatAdd.concat(this.buildConcatAddress(address.buildingNumber, concatAdd))
        concatAdd = concatAdd.concat(this.buildConcatAddress(address.street, concatAdd))
        concatAdd = concatAdd.concat(this.buildConcatAddress(address.suburb, concatAdd))
        concatAdd = concatAdd.concat(this.buildConcatAddress(address.state, concatAdd))
        concatAdd = concatAdd.concat(this.buildConcatAddress(address.postcode, concatAdd))
        return concatAdd
    }

    buildConcatAddress(addressPart, concatAdd) {
        return (addressPart)?(((concatAdd.length > 0)?' ':'') + addressPart):''
    }

    schemaValidation(object){
        let addressSchema = {
            'id': '/SimpleAddress',
            'type': 'object',
            'properties': {
                'buildingNumber': {'type': 'string'},
                'lat': {'type': 'number'},
                'lon': {'type': 'number'},
                'postcode': {'type': 'string', 'required': true},
                'state': {'type': 'string', 'required': true},
                'street': {'type': 'string', 'required': true},
                'suburb': {'type': 'string', 'required': true}
            }
        }

        let propertySchema = {
            'id': '/SimpleProperty',
            'type': 'object',
            'properties': {
                'address': {'$ref': '/SimpleAddress', 'required': true},
                'propertyTypeId': {'type': 'number'},
                'readyState': {'type': 'string'},
                'reference': {'type': 'string'},
                'shortId': {'type': 'string'},
                'status': {'type': 'number'},
                'type': {'type': 'string', 'required': true},
                'workflow': {'type': 'string', 'required': true}
            }
        }

        let payloadSchema = {
            'id': '/SimplePayload',
            'type': 'object',
            'properties': {
                'payload': {
                    'type': 'array',
                    'items':{'$ref': '/SimpleProperty'},
                    'required': true
                }
            }
        }
        jv.addSchema(addressSchema, '/SimpleAddress')
        jv.addSchema(propertySchema, '/SimpleProperty')
        return jv.validate(object, payloadSchema)
    }
}

module.exports = Util
