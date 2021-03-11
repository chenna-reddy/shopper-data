const mocker = require('mocker-data-generator').default;
const util = require('util');
const fs = require('fs')


const ip = {
    id: {
        faker: 'internet.ip'
    }
};

const card = {
    id: {
        faker: 'finance.creditCardNumber'
    }
};


const user = {
    id: {
        chance: 'guid'
    },
    name: {
        faker: 'name.findName'
    },
    email: {
        faker: 'internet.email'
    },
    dob: {
        faker: 'date.past'
    }
};

const family = {
    id: {
        chance: 'guid'
    },
    address: {
        faker: 'address.zipCode'
    },
    members: [{
        function: function() {
            return this.faker.random.arrayElement(this.db.users)
        },
        length: 3,
        fixedLength: false
    }],
    cards: [{
        function: function() {
            return this.faker.random.arrayElement(this.db.cards).id
        },
        length: 3,
        fixedLength: false
    }],
    ips: [{
        function: function() {
            return this.faker.random.arrayElement(this.db.ips).id
        },
        length: 3,
        fixedLength: false
    }]
};

const shopEvent = {
    id: {
        chance: 'guid'
    },
    family: {
        function: function() {
            return this.faker.random.arrayElement(this.db.families);
        },
        virtual: true
    },
    date: {
        faker: 'date.recent'
    },
    amount: {
        faker: 'finance.amount'
    },
    card: {
        function: function() {
            return this.faker.random.arrayElement(this.object.family.cards);
        }
    },
    name: {
        function: function() {
            return this.faker.random.arrayElement(this.object.family.members).name;
        }
    },
    ip: {
        function: function() {
            var r = Math.floor(Math.random() * 10);
            if (r < 3) {
                return null;
            } else if (r < 5) {
                return '127.0.0.1';
            } else {
                return this.faker.random.arrayElement(this.object.family.ips);
            }
        }
    },
    email: {
        function: function() {
            var r = Math.floor(Math.random() * 10);
            if (r < 5) {
                return null;
            } else {
                return this.faker.random.arrayElement(this.object.family.members).email;
            }
        }
    },
    dob: {
        function: function() {
            var r = Math.floor(Math.random() * 10);
            if (r < 6) {
                return null;
            } else {
                return this.faker.random.arrayElement(this.object.family.members).dob;
            }
        }
    },
    address: {
        function: function() {
            var r = Math.floor(Math.random() * 10);
            if (r < 5) {
                return null;
            } else {
                return this.object.family.address;
            }
        }
    }
};


var data = mocker()
    .schema('ips', ip, 20000)
    .schema('cards', card, 20000)
    .schema('users', user, 10000)
    .schema('families', family, 10)
    .schema('events', shopEvent, 20)
    .buildSync()

fs.writeFileSync('shopper-data.json', JSON.stringify(data.events, null, ' '));
