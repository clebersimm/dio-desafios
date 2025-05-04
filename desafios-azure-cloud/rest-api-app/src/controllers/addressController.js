class AddressController {
    constructor() {
        this.addresses = require('../data/addresses.json');
    }

    getAllAddresses(req, res) {
        res.json(this.addresses);
    }

    getAddressById(req, res) {
        const id = parseInt(req.params.id, 10);
        const address = this.addresses.find(addr => addr.id === id);
        if (address) {
            res.json(address);
        } else {
            res.status(404).send('Address not found');
        }
    }
}

module.exports = new AddressController();