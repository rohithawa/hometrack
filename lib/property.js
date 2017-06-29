'use strict'

const Util = require('./util')
const util = new Util()

class Property {

    filter(req, res) {
        var result = util.schemaValidation(req.body)
        if (result.valid) {
            let response = []
            for (let add of req.body.payload) {
                if (add.type === 'htv' && add.workflow === 'completed'){
                    response.push({concataddress: util.concatAddress(add.address),
                        type: add.type,
                        workflow: add.workflow
                    })
                }
            }

            res.status(200).json({response})
        }
        else {
            console.error('Could not decode request: JSON parsing failed:', result)
            res.status(400).json({error: 'Could not decode request: JSON parsing failed'})
        }
    }
}

module.exports = Property
