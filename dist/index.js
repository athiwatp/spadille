var spadille=function(n,t){"use strict";t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var e={isBrowser:new Function("\n  try {\n    return (\n      typeof window !== 'undefined' &&\n      this === window &&\n      this.window === this &&\n      typeof window.crypto !== 'undefined' &&\n      typeof window.crypto.subtle !== 'undefined' &&\n      ({}).toString.call(this) === '[object Window]'\n    );\n  } catch (_) {\n    return false;\n  }\n"),isNode:new Function("\n  try {\n    return (\n      typeof window === 'undefined' ||\n      this !== window ||\n      this.window !== this ||\n      typeof window.crypto === 'undefined' ||\n      typeof window.crypto.subtle === 'undefined' ||\n      ({}).toString.call(this) !== '[object Window]'\n    );\n  } catch (_) {\n    return false;\n  }\n")},r=function(){const n=window.crypto.subtle,t=new TextEncoder("utf-8"),e=function(n){return("00"+n.toString(16)).slice(-2)},r=function(n){return t.encode(n)};return{hmac:async function(t,o){const i=r(o),c=await async function(t,e){const o=r(t),i={name:"HMAC",hash:{name:"SHA-512"}};return await n.importKey("raw",o,i,!1,[e])}(t,"sign");return function(n){return[...new Uint8Array(n)].map(e).join("")}(await n.sign("HMAC",c,i))}}},o=function(){const n=t;return{hmac:async function(t,e){const r=n.createHmac("sha512",t);return r.update(e),r.digest("hex")}}};const{isNode:i,isBrowser:c}=e;let u=null;!function(){if(c())u=r().hmac;else{if(!i())throw Error("Could not detect execution context!");u=o().hmac}}();var a={sign:u};const s=function(n,t,e){return t+n%(e+1-t)},f=function(n,t){return n^t},m=function(n){return Number.parseInt(n,16)},d=function(n){return null==n},w=function(n,t){return n>t?1:n<t?-1:0};var l={cycle:s,splitInPieces:async function(n){return{index:-1,text:n,generate:function(){return this.index+=1,async function(n,t){const e=await a.sign(n,t.toString()),r=[];for(let n=0;n<64;n+=1)r.push(m(e.substr(8*n,8)));return r.reduce(f).toString(16)}(this.text,this.index)}}},fromHex:m,makeRandomGen:function(n,t){return function(e){return s(e,n,t)}},missing:d,option:function(n,t){return d(n)?t:n},sortArrayNumber:function(n){return n.sort(w)},computeNumber:function(n,t){return n(Math.abs(m(t)))}};const{makeRandomGen:y,option:p,splitInPieces:h,computeNumber:g}=l,b=async function(n){let{secret:t,payload:e,minimum:r,maximum:o,amount:i,distinct:c}=n;if(r=p(r,1),o=p(o,60),i=p(i,6),(c=p(c,!0))&&i>o-r+1)throw Error("The number of balls [amount] must not be greater than the [(maximum - minimum) + 1] number of RNG when [distinct] flag is on!");const u=await a.sign(t,e),s=y(r,o),f=await h(u),m=[];if(c){const n={};let t=0;for(;t<i;){const e=await f.generate(),r=g(s,e);n[r.toString()]||(n[r.toString()]=!0,t+=1,m.push(r))}}else for(let n=0;n<i;n+=1){const n=await f.generate(),t=g(s,n);m.push(t)}return m};var x={generate:b,permute:async function(n){const{secret:t,payload:e,inputSequence:r}=n;return(await b({secret:t,payload:e,minimum:0,maximum:r.length-1,amount:r.length,distinct:!0})).map(n=>r[n])},pick:async function(n){const{secret:t,payload:e,sequence:r}=n,o=p(n.distinct,!1),i=p(n.amount,1);return(await b({secret:t,payload:e,minimum:0,maximum:r.length-1,amount:i,distinct:o})).map(n=>r[n])},rand:async function(n,t){const e=Math.pow(2,31),[r]=await b({secret:n,payload:t,minimum:0,maximum:e-1,amount:1});return r/e}};var S={brazillian:{megaSena:async function(n,t){const e=await x.generate({secret:n,payload:t});return l.sortArrayNumber(e)},federal:async function(n,t){return(await x.generate({secret:n,payload:t,minimum:0,maximum:9,amount:5,distinct:!1})).map(function(n){return n.toString()}).join("")}}};var B={fromString:function(n){const t=(new TextEncoder).encode(n),e=JSON.parse(`[${t.toString()}]`),r=new Uint8Array(e.length);return e.forEach(function(n,t){r[t]=n}),r},toString:function(n,t){return t=t||"utf-8",new TextDecoder(t).decode(n)}},N=function(){const n=B,t=window.crypto;return{secret:async function(e){const r=t.getRandomValues(new Uint8Array(e));return n.toString(r,"ascii")}}},v=function(){const n=t;return{secret:async function(t){return n.randomBytes(t).toString("ascii")}}};const{isNode:E,isBrowser:A}=e;let C=null;!function(){if(A())C=N().secret;else{if(!E())throw Error("Could not detect execution context!");C=v().secret}}();var F={generate:C},R=function(){return{toBase64:new Function("return function (binary) {\n      return btoa (unescape (encodeURIComponent (binary)));\n    }")(),fromBase64:new Function("return function (base64) {\n      return decodeURIComponent (escape (atob (base64)));\n    }")()}},j=function(){return{toBase64:new Function("return function (binary) {\n    return Buffer.from(binary, 'utf-8').toString('base64');\n  };")(),fromBase64:new Function("return function (payload) {\n    return Buffer.from(payload, 'base64').toString('utf-8');\n  };")()}};const{isNode:H,isBrowser:I}=e;let U=null;!function(){if(I())U=R();else{if(!H())throw Error("Could not detect execution context!");U=j()}}();var M=(U=function(n){const t={toBase64:function(t){try{const e=n.toBase64(t);if(e)return e;throw Error("< error ignored >")}catch(n){throw n}},fromBase64:function(t){try{const e=n.fromBase64(t);if(e)return e;throw Error("< error ignored >")}catch(n){throw n}}};return t}(U)).toBase64,T=U.fromBase64,k=S,G=x,O=F,P={encode:M,decode:T},q={lottery:k,prng:G,secret:O,base64:P};return n.base64=P,n.default=q,n.lottery=k,n.prng=G,n.secret=O,n}({},crypto);