var spadille=function(n,t){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t;var e={isBrowser:new Function("\n  try {\n    return (\n      typeof window !== 'undefined' &&\n      this === window &&\n      this.window === this &&\n      typeof window.crypto !== 'undefined' &&\n      typeof window.crypto.subtle !== 'undefined' &&\n      ({}).toString.call(this) === '[object Window]'\n    );\n  } catch (_) {\n    return false;\n  }\n"),isNode:new Function("\n  try {\n    return (\n      typeof window === 'undefined' ||\n      this !== window ||\n      this.window !== this ||\n      typeof window.crypto === 'undefined' ||\n      typeof window.crypto.subtle === 'undefined' ||\n      ({}).toString.call(this) !== '[object Window]'\n    );\n  } catch (_) {\n    return false;\n  }\n")},r=function(){const n=window.crypto.subtle,t=new TextEncoder("utf-8"),e=function(n){return("00"+n.toString(16)).slice(-2)},r=function(n){return t.encode(n)};return{hmac:async function(t,o){const i=r(o),c=await async function(t,e){const o=r(t),i={name:"HMAC",hash:{name:"SHA-512"}};return await n.importKey("raw",o,i,!1,[e])}(t,"sign");return function(n){return[...new Uint8Array(n)].map(e).join("")}(await n.sign("HMAC",c,i))}}},o=function(){const n=t;return{hmac:async function(t,e){const r=n.createHmac("sha512",t);return r.update(e),r.digest("hex")}}};const{isNode:i,isBrowser:c}=e;let u=null;!function(){if(c())u=r().hmac;else{if(!i())throw Error("Could not detect execution context!");u=o().hmac}}();var a={sign:u,verify:async function(n,t,e){return t===await u(n,e)}};const s=function(n,t,e){return t+n%(e+1-t)},f=function(n,t){return n^t},d=function(n){return Number.parseInt(n,16)},m=function(n){return null==n},l=function(n,t){return n>t?1:n<t?-1:0};var w={cycle:s,splitInPieces:async function(n){return{index:-1,text:n,generate:function(){return this.index+=1,async function(n,t){const e=await a.sign(n,t.toString()),r=[];for(let n=0;n<32;n+=1)r.push(d(e.substr(16*n,16)));return r.reduce(f).toString(16)}(this.text,this.index)}}},fromHex:d,makeRandomGen:function(n,t){return function(e){return s(e,n,t)}},missing:m,option:function(n,t){return m(n)?t:n},sortArrayNumber:function(n){return n.sort(l)},computeNumber:function(n,t){return n(Math.abs(d(t)))}};const{makeRandomGen:y,option:p,splitInPieces:h,computeNumber:g}=w,x=async function(n){let{secret:t,payload:e,minimum:r,maximum:o,amount:i,distinct:c}=n;if(r=p(r,1),o=p(o,60),i=p(i,6),(c=p(c,!0))&&i>o-r+1)throw Error("The number of balls [amount] must not be greater than the [(maximum - minimum) + 1] number of RNG when [distinct] flag is on!");const u=await a.sign(t,e),s=y(r,o),f=await h(u),d=[];if(c){const n={};let t=0;for(;t<i;){const e=await f.generate(),r=g(s,e);n[r.toString()]||(n[r.toString()]=!0,t+=1,d.push(r))}}else for(let n=0;n<i;n+=1){const n=await f.generate(),t=g(s,n);d.push(t)}return d};var b={generate:x,permute:async function(n){let{secret:t,payload:e,inputSequence:r}=n;const o=await x({secret:t,payload:e,minimum:0,maximum:r.length-1,amount:r.length,distinct:!0}),i=[];for(let n=0;n<r.length;n+=1)i[o[n]]=r[n];return i}};var S={brazillian:{megaSena:async function(n,t){const e=await b.generate({secret:n,payload:t});return w.sortArrayNumber(e)},federal:async function(n,t){return(await b.generate({secret:n,payload:t,minimum:0,maximum:9,amount:5,distinct:!1})).map(function(n){return n.toString()}).join("")}}};var N={fromString:function(n){const t=(new TextEncoder).encode(n),e=JSON.parse(`[${t.toString()}]`),r=new Uint8Array(e.length);return e.forEach(function(n,t){r[t]=n}),r},toString:function(n,t){return t=t||"utf-8",new TextDecoder(t).decode(n)}},v=function(){const n=N,t=window.crypto;return{secret:async function(e){const r=t.getRandomValues(new Uint8Array(e));return n.toString(r,"ascii")}}},A=function(){const n=t;return{secret:async function(t){return n.randomBytes(t).toString("ascii")}}};const{isNode:E,isBrowser:H}=e;let j=null;!function(){if(H())j=v().secret;else{if(!E())throw Error("Could not detect execution context!");j=A().secret}}();var B=S,C=b,R={generate:j},T={lottery:B,prng:C,secret:R};return n.default=T,n.lottery=B,n.prng=C,n.secret=R,n}({},crypto);