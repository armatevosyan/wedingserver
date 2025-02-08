const { Guests } = require('../models');
const addGuests = async (req, res) => {
    try {
        const { body } = req;

        await Guests.create(body);

        return res.status(200).json({
            message: 'Success'
        })
    } catch (e) {
        console.log('Catch for addGuests, ERROR', e);

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = { addGuests };