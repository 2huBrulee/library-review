(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"67aa5f8be7defe950000":function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,o=Array.isArray,a=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),i=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!==typeof e[n]&&(r[n]=e[n]);return r};e.exports={arrayToObject:i,assign:function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var a=t[n],i=a.obj[a.prop],c=Object.keys(i),f=0;f<c.length;++f){var s=c[f],l=i[s];"object"===typeof l&&null!==l&&-1===r.indexOf(l)&&(t.push({obj:i,prop:s}),r.push(l))}return function(e){for(;e.length>1;){var t=e.pop(),r=t.obj[t.prop];if(o(r)){for(var n=[],a=0;a<r.length;++a)"undefined"!==typeof r[a]&&n.push(r[a]);t.obj[t.prop]=n}}}(t),e},decode:function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(e){return n}},encode:function(e,t,r){if(0===e.length)return e;var n=e;if("symbol"===typeof e?n=Symbol.prototype.toString.call(e):"string"!==typeof e&&(n=String(e)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"});for(var o="",i=0;i<n.length;++i){var c=n.charCodeAt(i);45===c||46===c||95===c||126===c||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122?o+=n.charAt(i):c<128?o+=a[c]:c<2048?o+=a[192|c>>6]+a[128|63&c]:c<55296||c>=57344?o+=a[224|c>>12]+a[128|c>>6&63]+a[128|63&c]:(i+=1,c=65536+((1023&c)<<10|1023&n.charCodeAt(i)),o+=a[240|c>>18]+a[128|c>>12&63]+a[128|c>>6&63]+a[128|63&c])}return o},isBuffer:function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(t,r,a){if(!r)return t;if("object"!==typeof r){if(o(t))t.push(r);else{if(!t||"object"!==typeof t)return[t,r];(a&&(a.plainObjects||a.allowPrototypes)||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(r);var c=t;return o(t)&&!o(r)&&(c=i(t,a)),o(t)&&o(r)?(r.forEach(function(r,o){if(n.call(t,o)){var i=t[o];i&&"object"===typeof i&&r&&"object"===typeof r?t[o]=e(i,r,a):t.push(r)}else t[o]=r}),t):Object.keys(r).reduce(function(t,o){var i=r[o];return n.call(t,o)?t[o]=e(t[o],i,a):t[o]=i,t},c)}}},"7eb0cd39a18592f659db":function(e,t,r){"use strict";var n=r("67aa5f8be7defe950000"),o=Object.prototype.hasOwnProperty,a=Array.isArray,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},c=function(e){return e.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(parseInt(t,10))})},f=function(e,t,r){if(e){var n=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/g,i=r.depth>0&&/(\[[^[\]]*])/.exec(n),c=i?n.slice(0,i.index):n,f=[];if(c){if(!r.plainObjects&&o.call(Object.prototype,c)&&!r.allowPrototypes)return;f.push(c)}for(var s=0;r.depth>0&&null!==(i=a.exec(n))&&s<r.depth;){if(s+=1,!r.plainObjects&&o.call(Object.prototype,i[1].slice(1,-1))&&!r.allowPrototypes)return;f.push(i[1])}return i&&f.push("["+n.slice(i.index)+"]"),function(e,t,r){for(var n=t,o=e.length-1;o>=0;--o){var a,i=e[o];if("[]"===i&&r.parseArrays)a=[].concat(n);else{a=r.plainObjects?Object.create(null):{};var c="["===i.charAt(0)&&"]"===i.charAt(i.length-1)?i.slice(1,-1):i,f=parseInt(c,10);r.parseArrays||""!==c?!isNaN(f)&&i!==c&&String(f)===c&&f>=0&&r.parseArrays&&f<=r.arrayLimit?(a=[])[f]=n:a[c]=n:a={0:n}}n=a}return n}(f,t,r)}};e.exports=function(e,t){var r=function(e){if(!e)return i;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?i.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?i.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:i.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:i.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:i.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:i.comma,decoder:"function"===typeof e.decoder?e.decoder:i.decoder,delimiter:"string"===typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:i.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:i.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:i.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:i.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:i.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:i.strictNullHandling}}(t);if(""===e||null===e||"undefined"===typeof e)return r.plainObjects?Object.create(null):{};for(var s="string"===typeof e?function(e,t){var r,f={},s=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,l=t.parameterLimit===1/0?void 0:t.parameterLimit,u=s.split(t.delimiter,l),d=-1,p=t.charset;if(t.charsetSentinel)for(r=0;r<u.length;++r)0===u[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===u[r]?p="utf-8":"utf8=%26%2310003%3B"===u[r]&&(p="iso-8859-1"),d=r,r=u.length);for(r=0;r<u.length;++r)if(r!==d){var b,y,m=u[r],h=m.indexOf("]="),v=-1===h?m.indexOf("="):h+1;-1===v?(b=t.decoder(m,i.decoder,p,"key"),y=t.strictNullHandling?null:""):(b=t.decoder(m.slice(0,v),i.decoder,p,"key"),y=t.decoder(m.slice(v+1),i.decoder,p,"value")),y&&t.interpretNumericEntities&&"iso-8859-1"===p&&(y=c(y)),y&&"string"===typeof y&&t.comma&&y.indexOf(",")>-1&&(y=y.split(",")),m.indexOf("[]=")>-1&&(y=a(y)?[y]:y),o.call(f,b)?f[b]=n.combine(f[b],y):f[b]=y}return f}(e,r):e,l=r.plainObjects?Object.create(null):{},u=Object.keys(s),d=0;d<u.length;++d){var p=u[d],b=f(p,s[p],r);l=n.merge(l,b,r)}return n.compact(l)}},a03d603565a8ba1e5da0:function(e,t,r){"use strict";var n=r("67aa5f8be7defe950000"),o=r("e1e29c334e706016b447"),a=Object.prototype.hasOwnProperty,i={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Array.isArray,f=Array.prototype.push,s=function(e,t){f.apply(e,c(t)?t:[t])},l=Date.prototype.toISOString,u=o.default,d={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:u,formatter:o.formatters[u],indices:!1,serializeDate:function(e){return l.call(e)},skipNulls:!1,strictNullHandling:!1},p=function e(t,r,o,a,i,f,l,u,p,b,y,m,h){var v,g=t;if("function"===typeof l?g=l(r,g):g instanceof Date?g=b(g):"comma"===o&&c(g)&&(g=g.join(",")),null===g){if(a)return f&&!m?f(r,d.encoder,h,"key"):r;g=""}if("string"===typeof(v=g)||"number"===typeof v||"boolean"===typeof v||"symbol"===typeof v||"bigint"===typeof v||n.isBuffer(g))return f?[y(m?r:f(r,d.encoder,h,"key"))+"="+y(f(g,d.encoder,h,"value"))]:[y(r)+"="+y(String(g))];var j,O=[];if("undefined"===typeof g)return O;if(c(l))j=l;else{var k=Object.keys(g);j=u?k.sort(u):k}for(var x=0;x<j.length;++x){var w=j[x];i&&null===g[w]||(c(g)?s(O,e(g[w],"function"===typeof o?o(r,w):r,o,a,i,f,l,u,p,b,y,m,h)):s(O,e(g[w],r+(p?"."+w:"["+w+"]"),o,a,i,f,l,u,p,b,y,m,h)))}return O};e.exports=function(e,t){var r,n=e,f=function(e){if(!e)return d;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||d.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=o.default;if("undefined"!==typeof e.format){if(!a.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=o.formatters[r],i=d.filter;return("function"===typeof e.filter||c(e.filter))&&(i=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:d.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?d.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:d.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?d.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:d.encode,encoder:"function"===typeof e.encoder?e.encoder:d.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:d.encodeValuesOnly,filter:i,formatter:n,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:d.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:d.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:d.strictNullHandling}}(t);"function"===typeof f.filter?n=(0,f.filter)("",n):c(f.filter)&&(r=f.filter);var l,u=[];if("object"!==typeof n||null===n)return"";l=t&&t.arrayFormat in i?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var b=i[l];r||(r=Object.keys(n)),f.sort&&r.sort(f.sort);for(var y=0;y<r.length;++y){var m=r[y];f.skipNulls&&null===n[m]||s(u,p(n[m],m,b,f.strictNullHandling,f.skipNulls,f.encode?f.encoder:null,f.filter,f.sort,f.allowDots,f.serializeDate,f.formatter,f.encodeValuesOnly,f.charset))}var h=u.join(f.delimiter),v=!0===f.addQueryPrefix?"?":"";return f.charsetSentinel&&("iso-8859-1"===f.charset?v+="utf8=%26%2310003%3B&":v+="utf8=%E2%9C%93&"),h.length>0?v+h:""}},a63b0d047588ea783f61:function(e,t,r){"use strict";var n=r("a03d603565a8ba1e5da0"),o=r("7eb0cd39a18592f659db"),a=r("e1e29c334e706016b447");e.exports={formats:a,parse:o,stringify:n}},adc20f99e57c573c589c:function(e,t,r){"use strict";var n=r("8af190b70a6bc55c6f1b"),o=r.n(n),a=(r("5ef9de3df8d92ea0e41c"),r("d7dd51e1bf6bfc2c9c3d")),i=r("f2873ecf7390fe7d7c89"),c=r.n(i),f=r("5fa3f8487e09c6182715"),s=r.n(f),l=r("f3b0ff1628e56352bcbf"),u=r.n(l),d=r("a1cf5d6fa4ed65a6ddd5"),p=r.n(d),b=r("6a4f9c383785f9168266"),y=r.n(b),m=r("cc13decd9f9c09598c2f"),h="@@saga-injector/daemon",v="@@saga-injector/once-till-unmount";function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){j(e,t,r[t])})}return e}function j(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var O=["@@saga-injector/restart-on-remount",h,v],k=function(e){return y()(s()(e)&&!p()(e),"(app/utils...) injectSaga: Expected `key` to be a non empty string")},x=function(e){var t={saga:u.a,mode:function(e){return s()(e)&&O.includes(e)}};y()(c()(e,t),"(app/utils...) injectSaga: Expected a valid saga descriptor")};function w(e,t){return function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=arguments.length>2?arguments[2]:void 0;t||Object(m.a)(e);var a=g({},n,{mode:n.mode||h}),i=a.saga,c=a.mode;k(r),x(a);var f=Reflect.has(e.injectedSagas,r);(!f||f&&c!==h&&c!==v)&&(e.injectedSagas[r]=g({},a,{task:e.runSaga(i,o)}))}}function S(e,t){return function(r){if(t||Object(m.a)(e),k(r),Reflect.has(e.injectedSagas,r)){var n=e.injectedSagas[r];n.mode&&n.mode!==h&&(n.task.cancel(),e.injectedSagas[r]="done")}}}function L(e){return Object(m.a)(e),{injectSaga:w(e,!0),ejectSaga:S(e,!0)}}r.d(t,"a",function(){return N});var N=function(e){var t=e.key,r=e.saga,n=e.mode,i=o.a.useContext(a.ReactReduxContext);o.a.useEffect(function(){var e=L(i.store);return e.injectSaga(t,{saga:r,mode:n}),function(){e.ejectSaga(t)}},[])}},cc13decd9f9c09598c2f:function(e,t,r){"use strict";r.d(t,"a",function(){return u});var n=r("d3a850c4000d77bccc89"),o=r.n(n),a=r("f3b0ff1628e56352bcbf"),i=r.n(a),c=r("f2873ecf7390fe7d7c89"),f=r.n(c),s=r("6a4f9c383785f9168266"),l=r.n(s);function u(e){var t={dispatch:i.a,subscribe:i.a,getState:i.a,replaceReducer:i.a,runSaga:i.a,injectedReducers:o.a,injectedSagas:o.a};l()(f()(e,t),"(app/utils...) injectors: Expected a valid redux store")}},d95b0cf107403b178365:function(e,t,r){"use strict";var n=r("8af190b70a6bc55c6f1b"),o=r.n(n),a=(r("5ef9de3df8d92ea0e41c"),r("d7dd51e1bf6bfc2c9c3d")),i=r("5fa3f8487e09c6182715"),c=r.n(i),f=r("f3b0ff1628e56352bcbf"),s=r.n(f),l=r("a1cf5d6fa4ed65a6ddd5"),u=r.n(l),d=r("6a4f9c383785f9168266"),p=r.n(d),b=r("cc13decd9f9c09598c2f"),y=r("491cc2e27aa2b4221847");function m(e,t){return function(r,n){t||Object(b.a)(e),p()(c()(r)&&!u()(r)&&s()(n),"(app/utils...) injectReducer: Expected `reducer` to be a reducer function"),Reflect.has(e.injectedReducers,r)&&e.injectedReducers[r]===n||(e.injectedReducers[r]=n,e.replaceReducer(Object(y.a)(e.injectedReducers)))}}function h(e){return Object(b.a)(e),{injectReducer:m(e,!0)}}r.d(t,"a",function(){return v});var v=function(e){var t=e.key,r=e.reducer,n=o.a.useContext(a.ReactReduxContext);o.a.useEffect(function(){h(n.store).injectReducer(t,r)},[])}},e1e29c334e706016b447:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g,a=r("67aa5f8be7defe950000"),i={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports=a.assign({default:i.RFC3986,formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return String(e)}}},i)},e6fbbce5a25b15857fe2:function(e,t,r){"use strict";r.r(t);var n=r("8af190b70a6bc55c6f1b"),o=r.n(n),a=(r("8a2d1b95e05b6a321e74"),r("d7dd51e1bf6bfc2c9c3d")),i=r("a28fc3c963a1d4d1a2e5"),c=r("ab4cb61bcb2dc161defb"),f=r("a63b0d047588ea783f61"),s=r.n(f),l=r("adc20f99e57c573c589c"),u=r("d95b0cf107403b178365"),d=r("7edf83707012a871cdfb"),p="app/Books/LOAD_BOOKS_FOUND",b={bookList:[],loading:!1,error:!1},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;return Object(d.a)(e,function(e){switch(t.type){case p:console.log("searching books",t),e.loading=!0,e.error=!1;break;case"app/Books/LOAD_BOOKS_FOUND_SUCCESS":console.log("book search success",t),e.loading=!1,e.error=!1,e.bookList=t.bookList;break;case"app/Books/LOAD_BOOKS_FOUND_FAILED":console.log("book search failed",t),e.loading=!1,e.error=t.error}})},m=function(e){return e.books||b},h=r("d782b72bc5b680c7122c"),v=r("bd183afcc37eabd79225"),g=r.n(v),j=function(e){return{type:p,bookQuery:e}},O=function(e){return{type:"app/Books/LOAD_BOOKS_FOUND_SUCCESS",bookList:e}},k=regeneratorRuntime.mark(S),x=regeneratorRuntime.mark(L),w=function(e){return g.a.get("https://matilda.whooosreading.org/api/v1/search",{params:{q:e,embed:"author.books,book.trusted,book.series,book.series_index,book.hidden,book.reassigned"}})};function S(e){var t,r;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(h.call)(w,e.bookQuery);case 3:return t=n.sent,r=t.data,n.next=7,Object(h.put)(O(r.results));case 7:n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),console.log(n.t0);case 12:case"end":return n.stop()}},k,null,[[0,9]])}function L(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(h.takeLatest)(p,S);case 2:case"end":return e.stop()}},x)}var N,D=r("0b3cb19af78752326f59"),_=r("e95a63b25fb92ed15721");function R(e,t,r,n){N||(N="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),t&&o)for(var i in o)void 0===t[i]&&(t[i]=o[i]);else t||(t=o||{});if(1===a)t.children=n;else if(a>1){for(var c=new Array(a),f=0;f<a;f++)c[f]=arguments[f+3];t.children=c}return{$$typeof:N,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}var E=D.b.div.withConfig({displayName:"BookListItem__Container",componentId:"sc-1x8192p-0"})(["max-height:170px;margin:10px 20px;padding:10px 25px;border-width:0px;border-top-color:lightgray;border-top-style:solid;display:flex;flex-direction:row;",""],function(e){return!e.first&&"border-top-width: thin;"}),C=D.b.img.withConfig({displayName:"BookListItem__BookImg",componentId:"sc-1x8192p-1"})(["height:100%;"]),P=D.b.div.withConfig({displayName:"BookListItem__Details",componentId:"sc-1x8192p-2"})(["flex:1;display:flex;padding:0 0 0 15px;flex-direction:column;"]),A=D.b.div.withConfig({displayName:"BookListItem__DetailLine",componentId:"sc-1x8192p-3"})(["margin:5px;"]),B=D.b.span.withConfig({displayName:"BookListItem__BoldSpan",componentId:"sc-1x8192p-4"})(["font-weight:bold;"]),I=R(B,{},void 0,"TEXT ID: "),F=R(B,{},void 0,"Author: "),Q=R(B,{},void 0," Lexile: "),H=R(B,{},void 0,"Title: "),T=R(B,{},void 0,"Series Name: "),U=R(B,{},void 0," Series Index: "),V=R(B,{},void 0,"Variety: ");var $,z=Object(_.withRouter)(function(e){var t,r=e.title,n=e.text_id,o=e.cover_url,a=e.lexile_score,i=e.series,c=e.series_index,f=e.text_variety,s=e.author_full_name,l=e.history;return R(E,{first:e.first},void 0,R(C,{src:o||"http://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png"}),R(P,{},void 0,R(A,{},void 0,I,R("span",{},void 0,n)),R(A,{onClick:(t=s,function(){return l.push({pathname:"/authors",search:"?full_name=".concat(t)})})},void 0,F,R("span",{},void 0,s),Q,R("span",{},void 0,a)),R(A,{},void 0,H,R("span",{},void 0,r)),i?R(A,{},void 0,T,R("span",{},void 0,i),U,R("span",{},void 0,c)):null,R(A,{},void 0,V,R("span",{},void 0,f))))});function K(){return(K=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var J,q=function(e){var t=e.bookList;return function(e,t,r,n){$||($="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),t&&o)for(var i in o)void 0===t[i]&&(t[i]=o[i]);else t||(t=o||{});if(1===a)t.children=n;else if(a>1){for(var c=new Array(a),f=0;f<a;f++)c[f]=arguments[f+3];t.children=c}return{$$typeof:$,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}("div",{},void 0,t.length>0?t.map(function(e,t){return o.a.createElement(z,K({first:0===t},e,{key:e.gr_id}))}):null)};function X(e,t,r,n){J||(J="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),t&&o)for(var i in o)void 0===t[i]&&(t[i]=o[i]);else t||(t=o||{});if(1===a)t.children=n;else if(a>1){for(var c=new Array(a),f=0;f<a;f++)c[f]=arguments[f+3];t.children=c}return{$$typeof:J,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function G(e){Object(u.a)({key:"books",reducer:y}),Object(l.a)({key:"books",saga:L});var t=e.bookList,r=e.dispatchLoadBooksFound,o=e.location,a=s.a.parse(o.search,{ignoreQueryPrefix:!0}).name;return Object(n.useEffect)(function(){a&&a.trim().length>0&&r(a)},[a]),X("div",{},void 0,X(q,{bookList:t},a))}r.d(t,"Books",function(){return G});var M=Object(i.b)({bookList:Object(i.a)(m,function(e){return e.bookList})});var W=Object(a.connect)(M,function(e){return{dispatchLoadBooksFound:function(t){return e(j(t))}}});t.default=Object(c.compose)(W)(G)}}]);