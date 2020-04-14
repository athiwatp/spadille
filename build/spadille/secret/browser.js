'use strict';function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{return Promise.resolve(value).then(function(value){step('next',value)},function(err){step('throw',err)})}}return step('next')})}}module.exports.init=function(){const Bytes=require('../utils/bytes');const crypto=window.crypto;const secret=(()=>{var _ref=_asyncToGenerator(function*(bytes){const buffer=crypto.getRandomValues(new Uint8Array(bytes));return Bytes.toString(buffer,'ascii')});return function secret(_x){return _ref.apply(this,arguments)}})();return{secret}};