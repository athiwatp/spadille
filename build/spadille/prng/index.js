'use strict';/* eslint-env node *//* eslint
  comma-dangle: off,
  semi: off */function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{return Promise.resolve(value).then(function(value){step('next',value)},function(err){step('throw',err)})}}return step('next')})}}const hmac=require('../hmac');var _require=require('../utils');const makeRandomGen=_require.makeRandomGen,option=_require.option,splitInPieces=_require.splitInPieces,computeNumber=_require.computeNumber;const generate=(()=>{var _ref=_asyncToGenerator(function*(options){let secret=options.secret,payload=options.payload,minimum=options.minimum,maximum=options.maximum,amount=options.amount,distinct=options.distinct;minimum=option(minimum,1);maximum=option(maximum,60);amount=option(amount,6);distinct=option(distinct,true);if(distinct&&amount>maximum-minimum){throw Error('The number of balls [amount] must not be greater than the [maximum - minimum] number of RNG when [distinct] flag is on!')}const seed=yield hmac.sign(secret,payload);const randomGen=makeRandomGen(minimum,maximum);const stream=yield splitInPieces(seed);const result=[];if(distinct){const cache={};let index=0;while(index<amount){const data=yield stream.generate();const number=computeNumber(randomGen,data);// no detected duplicate
if(!cache[number.toString()]){cache[number.toString()]=true;index+=1;result.push(number)}}}else{for(let index=0;index<amount;index+=1){const data=yield stream.generate();const number=computeNumber(randomGen,data);result.push(number)}}return result});return function generate(_x){return _ref.apply(this,arguments)}})();module.exports.generate=generate;