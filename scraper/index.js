const sabesp = require('./sabesp')
const sabespConfig = require('../config/sabesp')
const edp = require('./edp')
const edpConfig = require('../config/edp')

Promise.all([sabesp(sabespConfig), edp(edpConfig)])