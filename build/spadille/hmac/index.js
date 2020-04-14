'use strict';var _require=require('../utils/environment');const isNode=_require.isNode,isBrowser=_require.isBrowser;let hmac=null;(function(){if(isBrowser()){hmac=require('./browser').init().hmac}else if(isNode()){hmac=require('./node').init().hmac}else{throw Error('Could not detect execution context!')}})();const sign=hmac;module.exports.sign=sign;