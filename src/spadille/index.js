'use strict';

/* eslint-env browser, env */
/* eslint
  semi: off */

const lottery = require('./lottery');
const prng = require('./prng');
const secret = require('./secret');

module.exports.lottery = lottery;
module.exports.prng = prng;
module.exports.secret = secret;
