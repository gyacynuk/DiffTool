(this["webpackJsonpdiff-tool"]=this["webpackJsonpdiff-tool"]||[]).push([[0],{51:function(e,t,n){e.exports=n(62)},56:function(e,t,n){},62:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(34),i=n.n(o),l=(n(56),n(13)),c=n(21),u=n(24),s=n(30),m=n(27),d=n(35),f=n(29),h=n(20),p=n(15),g=(a.Component,n(14));function E(){var e=Object(h.a)(["\n    color: #17A2B8;\n    text-decoration: none;\n"]);return E=function(){return e},e}function b(){var e=Object(h.a)(["\n    color: #FFF;\n    text-align: center;\n"]);return b=function(){return e},e}var v=Object(p.d)(g.f)(b()),y=Object(p.d)(g.f)(E()),w=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(p.a,{backgroundColor:"#333",width:1,p:5},r.a.createElement(v,{variant:"h1"},"Text Comparison Tool"),r.a.createElement(v,{variant:"h4"},"Project by ",r.a.createElement(y,{forwardedAs:"a",href:"https://www.linkedin.com/in/griffin-yacynuk/",target:"_blank",rel:"noopener noreferrer"},"Griffin Yacynuk")))}}]),t}(a.Component);function O(){var e=Object(h.a)([" \n    font-family: 'Inconsolata', monospace;\n    white-space: nowrap;\n    overflow: auto;\n"]);return O=function(){return e},e}var j=Object(p.d)(g.g)(O()),D=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{row:!0},r.a.createElement(p.a,{col:{xs:1,md:.5},p:2},r.a.createElement(g.f,{variant:"h4"},"New Document"),r.a.createElement(j,{scale:"base",rows:8,defaultValue:this.props.newDocument,onChange:function(t){return e.props.updateDocument(t.target,!0)}})),r.a.createElement(p.a,{col:{xs:1,md:.5},p:2},r.a.createElement(g.f,{variant:"h4"},"Old Document"),r.a.createElement(j,{scale:"base",rows:8,defaultValue:this.props.oldDocument,onChange:function(t){return e.props.updateDocument(t.target,!1)}}))))}}]),t}(a.Component);function k(){var e=Object(h.a)(["\n    color: #09d3ac;\n    text-decoration: none;\n"]);return k=function(){return e},e}p.d.a(k());var I=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.f,{variant:"h2"},"Background"),r.a.createElement(g.d,null),r.a.createElement(g.f,{variant:"p"},"Reading ",r.a.createElement("em",null,"Algorithms")," by DVP during my morning commute. Had been thinking about the dynamic programming approach to solving the minimum edit distance between two strings. Colleage was having trouble with a third-party diff tool where the tool was not smart enough to line up mathcing lines. I thought I could solve it, and decided to take this oppourtinuty to also make my first forray into React."),r.a.createElement(g.f,{variant:"h2",mt:5},"Algorithm Overview"),r.a.createElement(g.d,null),r.a.createElement(g.f,{variant:"p"},"What is edit distance, levenschtein distance.",r.a.createElement("br",null),"The DP algorithm outlined in the book does not work for document comparison, since it has no way of measuring similarity between lines. This makes sense, as with single characters, they either are equal or not. However when comparing entire strings, things are not so black and white. We can have varying degrees of similarity, and I needed a way to concretely define this. So I use compare levenshtein distance between strings as a measure of similarity, and then use a modified edit distance algorithm to try and minimize cost across the whole document."),r.a.createElement(g.f,{variant:"h2",mt:5},"Try it Out!"),r.a.createElement(g.d,null))}}]),t}(a.Component),T=n(37),N=n(44),C=n(45),x=Object.freeze({INSERT:1,DELETE:2,REPLACE:3,NONE:4});function S(e,t){for(var n=new Array(t),a=0;a<t;a++)n[a]=new Array(e);return n}function R(e,t,n){return n<0||n>=e.length?Number.POSITIVE_INFINITY:t<0||t>=e[0].length?Number.POSITIVE_INFINITY:e[n][t]}var A=function e(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;Object(c.a)(this,e),this.operation=t,this.symbol=n,this.secondarySymbol=a},L=function(){function e(t,n){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];Object(c.a)(this,e),this.newWord=t,this.oldWord=n;var r=a?function(e,t){var n=e.length+1,a=t.length+1,r=S(n,a);r[0][0]=0;for(var o=1;o<n;o++)r[0][o]=r[0][o-1]+e[o-1].length+1;for(var i=1;i<a;i++)r[i][0]=r[i-1][0]+t[i-1].length+1;for(var l=1;l<n;l++)for(var c=1;c<a;c++){var u=0;u=e[l-1]!==t[c-1]?new L(e[l-1],t[c-1],!1).minEditDistance:-r[c-1][l-1]-1,r[c][l]=Math.min(r[c-1][l]+t[c-1].length,r[c][l-1]+e[l-1].length,r[c-1][l-1]+u)+1}return r}(t,n):function(e,t){var n=e.length+1,a=t.length+1,r=S(n,a);r[0][0]=0;for(var o=1;o<n;o++)r[0][o]=r[0][o-1]+1;for(var i=1;i<a;i++)r[i][0]=r[i-1][0]+1;for(var l=1;l<n;l++)for(var c=1;c<a;c++){var u=0;e[l-1]!==t[c-1]&&(u=1),r[c][l]=Math.min(r[c-1][l],r[c][l-1],r[c-1][l-1])+u}return r}(t,n);this.minEditDistance=r[n.length][t.length],this.fullEdits=function(e,t,n){for(var a=[],r=t.length,o=n.length;0!==o||0!==r;)if(0!==R(e,r,o)){var i=R(e,r-1,o),l=R(e,r,o-1),c=R(e,r-1,o-1),u=Math.min(i,l,c);if(u===c){var s=R(e,r,o);r--,o--,c<s?a.push(new A(x.REPLACE,t[r],n[o])):a.push(new A(x.NONE,t[r]))}else u===i?(r--,a.push(new A(x.INSERT,t[r]))):(o--,a.push(new A(x.DELETE,n[o])))}else r--,o--,a.push(new A(x.NONE,t[r]));return a.reverse()}(r,t,n),this.edits=this.fullEdits.filter((function(e){return e.operation!==x.NONE}))}return Object(u.a)(e,[{key:"getNumDisjointReplacements",value:function(){if(0===this.fullEdits.length)return 0;for(var e=0,t=null,n=0;n<this.fullEdits.length;n++){var a=this.fullEdits[n].operation;a===x.REPLACE&&t!==x.REPLACE&&e++,t=a}return e}}]),e}();function P(e){return e.length>0?e[e.length-1].entityNumber:Number.NEGATIVE_INFINITY}function F(e,t){var n=P(e[x.DELETE]),a=P(e[x.INSERT]),r=P(e[x.NONE]),o=Math.max(n,a,r);return n===t-1?e[x.DELETE].pop():a===t-1?e[x.INSERT].pop():o===n?e[x.DELETE].pop():o===a?e[x.INSERT].pop():e[x.NONE].pop()}function W(e){var t=[],n=1;return e.fullEdits.forEach((function(e){t.push.apply(t,Object(C.a)(function(e,t){var n=e.operation,a=e.symbol,r=e.secondarySymbol;if(n===x.REPLACE){var o=new L(a,r,!1),i=o.fullEdits.map((function(e){return e.operation===x.REPLACE?new A(x.INSERT,e.symbol):e})).filter((function(e){return e.operation!==x.DELETE})),l=o.fullEdits.map((function(e){return e.operation===x.REPLACE?new A(x.DELETE,e.secondarySymbol):e})).filter((function(e){return e.operation!==x.INSERT}));return[new V(x.INSERT,a,t,i),new V(x.DELETE,r,t,l)]}return x.INSERT,[new V(n,a,t)]}(e,n))),n++})),function(e){for(var t=e.reduce((function(e,t){return e[t.operation].push(t),e}),{1:[],2:[],3:[],4:[]}),n=[],a=e.length+1,r=0;r<e.length;r++){var o=F(t,a);n.push(o),a=o.entityNumber}return n.reverse()}(t)}var V=function e(t,n,a){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;Object(c.a)(this,e),this.operation=t,this.symbol=n,this.entityNumber=a,this.subEditEntities=r};function B(){var e=Object(h.a)(["\n    display: inline-block;\n    ",";\n"]);return B=function(){return e},e}function z(){var e=Object(h.a)(["\n    width: 32px;\n    min-width: 32px;\n    padding-right: 8px;\n    padding-left: 0px;\n    text-align: right;\n    color: #AAA;\n    background-color: rgba(0, 0, 0, .1);\n"]);return z=function(){return e},e}function H(){var e=Object(h.a)(["\n    display: inline-block;\n    padding: 2px 8px;\n    white-space: pre;\n"]);return H=function(){return e},e}function M(){var e=Object(h.a)(["\n    width: 100%;\n    height: auto;\n    display: inline-flex;\n    overflow: scroll;\n    text-align: left;\n    font-family: 'Inconsolata', monospace;\n    font-size: 16px;\n\n    ",";\n"]);return M=function(){return e},e}var Y=l.e.div(M(),(function(e){return e.operation===x.INSERT?"background-color: #daffd9":e.operation===x.DELETE?"background-color: #ffd9df":void 0})),_=l.e.div(H()),q=Object(l.e)(_)(z()),G=l.e.div(B(),(function(e){return e.operation===x.INSERT?"background-color: #a8f7a6":e.operation===x.DELETE?"background-color: #f7a6a6":void 0})),J=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.editEntity,t=e.operation,n=e.symbol,a=e.entityNumber,o=e.subEditEntities,i=r.a.createElement("div",null,"\xa0");t===x.INSERT?i="+":t===x.DELETE&&(i="-");var l=r.a.createElement(_,{operation:t},n);return o&&(l=r.a.createElement(_,{operation:t},o.map((function(e,t){return r.a.createElement(G,{operation:e.operation,key:t},e.symbol)})))),r.a.createElement(Y,{operation:t},r.a.createElement(q,{operation:t},a),r.a.createElement(_,{operation:t},i),l)}}]),t}(a.Component);function $(){var e=Object(h.a)(["\n    border: 1px solid rgba(0, 0, 0, 0.125);\n    border-radius: 4px;\n    overflow: scroll;\n"]);return $=function(){return e},e}function K(){var e=Object(h.a)(["\n    margin-left: 16px;\n"]);return K=function(){return e},e}var Q=p.d.label(K()),U=Object(p.d)(p.a)($());var X=function(e){var t=Object(T.a)({state:"viewInline"});return Object(N.a)({state:!0}),r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{row:!0,mt:2},r.a.createElement(p.a,{col:!0},r.a.createElement(Q,{mx:1},r.a.createElement(g.e,{checked:e.delayedComputation,onChange:e.toggleDelayedComputation,scale:"sm",name:"xs"})," Delayed Computation"),r.a.createElement(g.c,Object.assign({},t,{"aria-label":"display options",py:1}),r.a.createElement(Q,null,r.a.createElement(g.b,Object.assign({},t,{value:"viewInline"}))," Inline Comparison"),r.a.createElement(Q,null,r.a.createElement(g.b,Object.assign({},t,{value:"viewSide"}))," Side Comparison")))),r.a.createElement(U,{row:!0,m:2,mb:5},W(e.editDistance).map((function(e,t){return r.a.createElement(J,{editEntity:e,key:t})}))))};function Z(){var e=Object(h.a)(["\n    width: 100%;\n    height: 180px;\n    font-family: 'Inconsolata', monospace;\n    font-size: 16px;\n    white-space: nowrap;\n    overflow: auto;\n"]);return Z=function(){return e},e}function ee(){var e=Object(h.a)(["\n    display: inline-block;\n    width: 50%;\n"]);return ee=function(){return e},e}var te=["Hello World!","Please enjoy playing around with my attempt at a text diff tool!","It will try to display differences in an easy-to-read format,","by doing things such as grouping blocks of contiguous edits together (as seen above),","or by highlighting micro-differences between lines (as seen here).","If a line requires more than 3 replacements, then it will not be highlighted, as things can get messy.  long line long long lone","Instead, the two lines will be treated as disjoint insertions and deletions, as seen below:","I have fixed typos here as an example ;)","This heuristic seems to work well in most cases."],ne=["Hello!","Please enjoy trying out my attempt at a text diff tool!","It will try to display differences in an easy-to-read format,","by doing things such as grouping blocks of contiguous edits together (as seen above),","or by highlighting small differences between lines (as seen here).","If a line requires more than 3 replacements, then it will not be highlighted, as things can get messy.","Instead, the two lines will be treated as disjoint insertions and deletions, as seen below:","i ficed typos ans an excmple :)","This hueristic seeems to wok well in most caces."],ae=(p.d.div(ee()),p.d.textarea(Z()),function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(m.a)(t).call(this))).state={newDocument:te,oldDocument:ne,editDistance:new L(te,ne),delayedComputation:!0},e.computeDiffTimer=null,e.toggleDelayedComputation=e.toggleDelayedComputation.bind(Object(d.a)(e)),e.triggerDiffComputation=e.triggerDiffComputation.bind(Object(d.a)(e)),e.recomputeDiff=e.recomputeDiff.bind(Object(d.a)(e)),e.updateDocument=e.updateDocument.bind(Object(d.a)(e)),e}return Object(f.a)(t,e),Object(u.a)(t,[{key:"triggerDiffComputation",value:function(){var e=this;clearTimeout(this.computeDiffTimer),this.state.delayedComputation?this.computeDiffTimer=setTimeout((function(){e.recomputeDiff()}),1e3):this.recomputeDiff()}},{key:"recomputeDiff",value:function(){var e=this.state,t=e.newDocument,n=e.oldDocument;this.setState({editDistance:new L(t,n)})}},{key:"updateDocument",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.state,a=n.newDocument,r=n.oldDocument;n.editDistance;this.setState({newDocument:t?e.value.split("\n"):a,oldDocument:t?r:e.value.split("\n")}),this.triggerDiffComputation()}},{key:"toggleDelayedComputation",value:function(){this.setState({delayedComputation:!this.state.delayedComputation})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,null),r.a.createElement(r.a.Fragment,null,r.a.createElement(w,null),r.a.createElement(p.a,{width:1,height:100,p:5},r.a.createElement(I,null),r.a.createElement(D,{newDocument:te.join("\n"),oldDocument:ne.join("\n"),updateDocument:this.updateDocument}),r.a.createElement(X,{editDistance:this.state.editDistance,delayedComputation:this.state.delayedComputation,toggleDelayedComputation:this.toggleDelayedComputation}))))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(l.b,{theme:{colors:{text:"#000",background:"#fff",primary:"#17A2B8",modes:{dark:{text:"#fff",background:"#000",primary:"#0cf"}}}}},r.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[51,1,2]]]);
//# sourceMappingURL=main.95827b7f.chunk.js.map