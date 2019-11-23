(this["webpackJsonpdiff-tool"]=this["webpackJsonpdiff-tool"]||[]).push([[0],{44:function(e,t,n){e.exports=n.p+"static/media/edit_distance.6aca0a77.png"},45:function(e,t,n){e.exports=n.p+"static/media/matrix.6478087f.png"},52:function(e,t,n){e.exports=n(63)},57:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(35),o=n.n(i),c=(n(57),n(14)),l=n(23),u=n(26),s=n(31),f=n(29),m=n(34),d=n(30),h=n(20),p=n(13),g=n(15);function E(){var e=Object(h.a)(["\n    color: #17A2B8;\n    text-decoration: none;\n"]);return E=function(){return e},e}function b(){var e=Object(h.a)(["\n    color: #FFF;\n    text-align: center;\n"]);return b=function(){return e},e}var v=Object(g.d)(p.f)(b()),y=Object(g.d)(p.f)(E()),w=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(g.a,{backgroundColor:"#333",width:1,p:5},r.a.createElement(v,{variant:"h1"},"Text Comparison Tool"),r.a.createElement(v,{variant:"h4"},"Project by ",r.a.createElement(y,{forwardedAs:"a",href:"https://www.linkedin.com/in/griffin-yacynuk/",target:"_blank",rel:"noopener noreferrer"},"Griffin Yacynuk")))}}]),t}(a.Component);function D(){var e=Object(h.a)([" \n    font-family: 'Inconsolata', monospace;\n    white-space: nowrap;\n    overflow: auto;\n"]);return D=function(){return e},e}var O=Object(g.d)(p.g)(D()),j=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{row:!0},r.a.createElement(g.a,{col:{xs:1,md:.5},p:2},r.a.createElement(p.f,{variant:"h4"},"New Document"),r.a.createElement(O,{scale:"base",rows:10,defaultValue:this.props.newDocument,onChange:function(t){return e.props.updateDocument(t.target,!0)}})),r.a.createElement(g.a,{col:{xs:1,md:.5},p:2},r.a.createElement(p.f,{variant:"h4"},"Old Document"),r.a.createElement(O,{scale:"base",rows:10,defaultValue:this.props.oldDocument,onChange:function(t){return e.props.updateDocument(t.target,!1)}}))))}}]),t}(a.Component);function k(){var e=Object(h.a)(["\n    border: 1px solid rgba(0, 0, 0, 0.125);\n    border-radius: 4px;\n    overflow: scroll;\n"]);return k=function(){return e},e}var S=Object(g.d)(g.a)(k()),N=n(44),T=n.n(N),x=n(45),C=n.n(x);function I(){var e=Object(h.a)(["\n    max-width: 440px;\n    width: 100%;\n    height: auto;\n    object-fit: contain; \n    margin-bottom: -3px;\n"]);return I=function(){return e},e}var R=g.d.img(I()),A=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.f,{variant:"h2"},"Background"),r.a.createElement(p.d,null),r.a.createElement(p.f,{variant:"p"},"Reading ",r.a.createElement("em",null,"Algorithms")," by DVP during my morning commute. Had been thinking about the dynamic programming approach to solving the minimum edit distance between two strings. Colleage was having trouble with a third-party diff tool where the tool was not smart enough to line up mathcing lines. I thought I could solve it, and decided to take this oppourtinuty to also make my first forray into React."),r.a.createElement(p.f,{variant:"h2",mt:5},"Algorithm Overview"),r.a.createElement(p.d,null),r.a.createElement(p.f,{variant:"p"},"What is edit distance, levenschtein distance."),r.a.createElement(g.a,{row:!0,justifyContent:"center",p:3},r.a.createElement(S,{col:{xs:1,md:"auto"}},r.a.createElement(R,{src:T.a}))),r.a.createElement(p.f,{variant:"p"},"The DP algorithm outlined in the book does not work for document comparison, since it has no way of measuring similarity between lines. This makes sense, as with single characters, they either are equal or not. However when comparing entire strings, things are not so black and white. We can have varying degrees of similarity, and I needed a way to concretely define this. So I use compare levenshtein distance between strings as a measure of similarity, and then use a modified edit distance algorithm to try and minimize cost across the whole document."),r.a.createElement(g.a,{row:!0,justifyContent:"center",p:3},r.a.createElement(S,{col:{xs:1,md:"auto"}},r.a.createElement(R,{src:C.a}))),r.a.createElement(p.f,{variant:"h2",mt:5},"Try it Out!"),r.a.createElement(p.d,null))}}]),t}(a.Component),L=n(37),F=n(46),P=Object.freeze({INSERT:1,DELETE:2,REPLACE:3,NONE:4});function W(e,t){for(var n=new Array(t),a=0;a<t;a++)n[a]=new Array(e);return n}function B(e,t,n){return n<0||n>=e.length?Number.POSITIVE_INFINITY:t<0||t>=e[0].length?Number.POSITIVE_INFINITY:e[n][t]}var H=function e(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;Object(l.a)(this,e),this.operation=t,this.symbol=n,this.secondarySymbol=a},V=function(){function e(t,n){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];Object(l.a)(this,e),this.newWord=t,this.oldWord=n;var r=a?function(e,t){var n=e.length+1,a=t.length+1,r=W(n,a);r[0][0]=0;for(var i=1;i<n;i++)r[0][i]=r[0][i-1]+e[i-1].length+1;for(var o=1;o<a;o++)r[o][0]=r[o-1][0]+t[o-1].length+1;for(var c=1;c<n;c++)for(var l=1;l<a;l++){var u=0;u=e[c-1]!==t[l-1]?new V(e[c-1],t[l-1],!1).minEditDistance:-r[l-1][c-1]-1,r[l][c]=Math.min(r[l-1][c]+t[l-1].length,r[l][c-1]+e[c-1].length,r[l-1][c-1]+u)+1}return r}(t,n):function(e,t){var n=e.length+1,a=t.length+1,r=W(n,a);r[0][0]=0;for(var i=1;i<n;i++)r[0][i]=r[0][i-1]+1;for(var o=1;o<a;o++)r[o][0]=r[o-1][0]+1;for(var c=1;c<n;c++)for(var l=1;l<a;l++){var u=0;e[c-1]!==t[l-1]&&(u=1),r[l][c]=Math.min(r[l-1][c],r[l][c-1],r[l-1][c-1])+u}return r}(t,n);this.minEditDistance=r[n.length][t.length],this.fullEdits=function(e,t,n){for(var a=[],r=t.length,i=n.length;0!==i||0!==r;)if(0!==B(e,r,i)){var o=B(e,r-1,i),c=B(e,r,i-1),l=B(e,r-1,i-1),u=Math.min(o,c,l);if(u===l){var s=B(e,r,i);r--,i--,l<s?a.push(new H(P.REPLACE,t[r],n[i])):a.push(new H(P.NONE,t[r]))}else u===o?(r--,a.push(new H(P.INSERT,t[r]))):(i--,a.push(new H(P.DELETE,n[i])))}else r--,i--,a.push(new H(P.NONE,t[r]));return a.reverse()}(r,t,n),this.edits=this.fullEdits.filter((function(e){return e.operation!==P.NONE}))}return Object(u.a)(e,[{key:"getNumDisjointReplacements",value:function(){if(0===this.fullEdits.length)return 0;for(var e=0,t=null,n=0;n<this.fullEdits.length;n++){var a=this.fullEdits[n].operation;a===P.REPLACE&&t!==P.REPLACE&&e++,t=a}return e}}]),e}();function _(e){return e.length>0?e[e.length-1].entityNumber:Number.NEGATIVE_INFINITY}function z(e,t){var n=_(e[P.DELETE]),a=_(e[P.INSERT]),r=_(e[P.NONE]),i=Math.max(n,a,r);return n===t-1?e[P.DELETE].pop():a===t-1?e[P.INSERT].pop():i===n?e[P.DELETE].pop():i===a?e[P.INSERT].pop():e[P.NONE].pop()}function M(e){var t=[],n=1;return e.fullEdits.forEach((function(e){t.push.apply(t,Object(F.a)(function(e,t){var n=e.operation,a=e.symbol,r=e.secondarySymbol;if(n===P.REPLACE){var i=new V(a,r,!1),o=i.fullEdits.map((function(e){return e.operation===P.REPLACE?new H(P.INSERT,e.symbol):e})).filter((function(e){return e.operation!==P.DELETE})),c=i.fullEdits.map((function(e){return e.operation===P.REPLACE?new H(P.DELETE,e.secondarySymbol):e})).filter((function(e){return e.operation!==P.INSERT}));return[new G(P.INSERT,a,t,o),new G(P.DELETE,r,t,c)]}return P.INSERT,[new G(n,a,t)]}(e,n))),n++})),t}function Y(e){var t=[],n=[];return e.forEach((function(e){var a=e.operation,r=e.subEditEntities;a===P.INSERT?(t.push(e),null===r&&n.push(new G(P.NONE,"","*"))):a===P.DELETE?(n.push(e),null===r&&t.push(new G(P.NONE,"","*"))):(t.push(e),n.push(e))})),[t,n]}var G=function e(t,n,a){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;Object(l.a)(this,e),this.operation=t,this.symbol=n,this.entityNumber=a,this.subEditEntities=r};function J(){var e=Object(h.a)(["\n    display: inline-block;\n    ",";\n"]);return J=function(){return e},e}function q(){var e=Object(h.a)(["\n    width: 32px;\n    min-width: 32px;\n    padding-right: 8px;\n    padding-left: 0px;\n    text-align: right;\n    color: #AAA;\n    background-color: rgba(0, 0, 0, .1);\n"]);return q=function(){return e},e}function $(){var e=Object(h.a)(["\n    display: inline-block;\n    padding: 2px 8px;\n    white-space: pre;\n"]);return $=function(){return e},e}function K(){var e=Object(h.a)(["\n    width: 100%;\n    height: auto;\n    display: inline-flex;\n    overflow: scroll;\n    text-align: left;\n    font-family: 'Inconsolata', monospace;\n    font-size: 16px;\n\n    ",";\n"]);return K=function(){return e},e}var Q=c.e.div(K(),(function(e){return e.operation===P.INSERT?"background-color: #daffd9":e.operation===P.DELETE?"background-color: #ffd9df":void 0})),U=c.e.div($()),X=Object(c.e)(U)(q()),Z=c.e.div(J(),(function(e){return e.operation===P.INSERT?"background-color: #a8f7a6":e.operation===P.DELETE?"background-color: #f7a6a6":void 0})),ee=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.editEntity,t=e.operation,n=e.symbol,a=e.entityNumber,i=e.subEditEntities,o=r.a.createElement("div",null,"\xa0");t===P.INSERT?o="+":t===P.DELETE&&(o="-");var c=r.a.createElement(U,{operation:t},n);return i&&(c=r.a.createElement(U,{operation:t},i.map((function(e,t){return r.a.createElement(Z,{operation:e.operation,key:t},e.symbol)})))),r.a.createElement(Q,{operation:t},r.a.createElement(X,{operation:t},a),r.a.createElement(U,{operation:t},o),c)}}]),t}(a.Component);function te(){var e=Object(h.a)(["\n    display: inline-block;\n    border: 2px solid ",";\n    color: ",";\n    border-radius: 16px;\n    padding: 4px 8px;\n    margin-left: 16px;\n    font-size: 12px;\n"]);return te=function(){return e},e}function ne(){var e=Object(h.a)(["\n    border: 1px solid rgba(0, 0, 0, 0.125);\n    border-radius: 4px;\n    overflow: scroll;\n"]);return ne=function(){return e},e}function ae(){var e=Object(h.a)(["\n    margin-left: 16px;\n"]);return ae=function(){return e},e}var re=g.d.label(ae()),ie=Object(g.d)(g.a)(ne()),oe=g.d.div(te(),(function(e){return e.color}),(function(e){return e.color}));var ce=function(e){var t,n=Object(L.a)({state:"viewInline"}),a=M(e.editDistance),i=r.a.createElement(ie,{row:!0,m:2,mb:5},function(e){for(var t=e.reduce((function(e,t){return e[t.operation].push(t),e}),{1:[],2:[],3:[],4:[]}),n=[],a=e.length+1,r=0;r<e.length;r++){var i=z(t,a);n.push(i),a=i.entityNumber}return n.reverse()}(M(e.editDistance)).map((function(e,t){return r.a.createElement(ee,{editEntity:e,key:t})}))),o=r.a.createElement(ie,{row:!0,m:2,mb:5},r.a.createElement(g.a,{col:.5},Y(a)[0].map((function(e,t){return r.a.createElement(ee,{editEntity:e,key:t})}))),r.a.createElement(g.a,{col:.5},Y(a)[1].map((function(e,t){return r.a.createElement(ee,{editEntity:e,key:t})})))),c=[i];return"viewSide"===n.state&&(c=[o]),r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{row:!0,mt:2},r.a.createElement(g.a,{col:!0},r.a.createElement(re,{mx:1},r.a.createElement(p.e,{checked:e.delayedComputation,onChange:e.toggleDelayedComputation,scale:"sm",name:"xs",verticalAlign:"middle"})," Delayed Computation"),r.a.createElement(oe,{color:(t=e.diffStateString,"Done"===t?"#3bd12e":"Waiting"===t?"#17A2B8":"Processing"===t?"#AF1213":"#333")},r.a.createElement("strong",null,e.diffStateString)),r.a.createElement(p.d,null),r.a.createElement(p.c,Object.assign({},n,{"aria-label":"display options",py:1}),r.a.createElement(g.a,{row:!0,justifyContent:{md:"left"}},r.a.createElement(g.a,{col:{xs:1,md:"auto"}},r.a.createElement(re,null,r.a.createElement(p.b,Object.assign({},n,{value:"viewInline"}))," Inline")),r.a.createElement(g.a,{col:{xs:1,md:"auto"},mt:{xs:2,md:0}},r.a.createElement(re,null,r.a.createElement(p.b,Object.assign({},n,{value:"viewSide"}))," Side")))))),c.map((function(e){return e})))},le=["Hello World!","Have fun playing around with my implementation of a text comparison tool,","based off of the Wagner\u2013Fischer dynamic programming algorithm for calculating","the Levenshtein distance between two strings.","I have tried to display differences in an easy-to-read format, by grouping","contiguous operations together, and by highlighting small differences between","similar lines (as seen above).","New lines appear like this","(with no per-character highlighting)","(again, with no per-character highlighting)","Finally, if you're working with large documents, consider keeping",'"Delayed Computation" on, as it will wait until you stop typing before',"recomputing the differences, instead of after each keystroke."],ue=["Hello World!","Have fun playing around with my implementation of a text diff tool,","based off of the Wagner\u2013Fischer DP algorithm for calculating","the edit distance between two strings.","I have tried to display differences in an easy-to-read format, by grouping","contiguous operations together, and by highlighting small differences between","similar lines (as seen above).","(with no per-character highlighting)","And deleted lines appear like this","(again, with no per-character highlighting)","Finally, if you're working with large documents, consider keeping",'"Delayed Computation" on, as it will wait until you stop typing before',"recomputing the differences, instead of after each keystroke."],se=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(f.a)(t).call(this))).state={newDocument:le,oldDocument:ue,editDistance:new V(le,ue),delayedComputation:!0,diffStateString:"Done"},e.computeDiffTimer=null,e.processingTimer=null,e.toggleDelayedComputation=e.toggleDelayedComputation.bind(Object(m.a)(e)),e.triggerDiffComputation=e.triggerDiffComputation.bind(Object(m.a)(e)),e.recomputeDiff=e.recomputeDiff.bind(Object(m.a)(e)),e.updateDocument=e.updateDocument.bind(Object(m.a)(e)),e.updateDiffStateString=e.updateDiffStateString.bind(Object(m.a)(e)),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"triggerDiffComputation",value:function(){var e=this;clearTimeout(this.computeDiffTimer),this.state.delayedComputation?(this.updateDiffStateString("Waiting"),this.computeDiffTimer=setTimeout((function(){e.recomputeDiff()}),1e3)):this.recomputeDiff()}},{key:"recomputeDiff",value:function(){var e=this;this.updateDiffStateString("Processing"),clearTimeout(this.processingTimer),this.processingTimer=setTimeout((function(){var t=e.state,n=t.newDocument,a=t.oldDocument,r=new V(n,a);e.setState({editDistance:r}),e.updateDiffStateString("Done")}),100)}},{key:"updateDocument",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.state,a=n.newDocument,r=n.oldDocument;this.setState({newDocument:t?e.value.split("\n"):a,oldDocument:t?r:e.value.split("\n")}),this.triggerDiffComputation()}},{key:"toggleDelayedComputation",value:function(){this.setState({delayedComputation:!this.state.delayedComputation})}},{key:"updateDiffStateString",value:function(e){this.setState({diffStateString:e})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,null),r.a.createElement(r.a.Fragment,null,r.a.createElement(w,null),r.a.createElement(g.a,{width:1,height:100,p:4},r.a.createElement(A,null),r.a.createElement(j,{newDocument:le.join("\n"),oldDocument:ue.join("\n"),updateDocument:this.updateDocument}),r.a.createElement(ce,{editDistance:this.state.editDistance,delayedComputation:this.state.delayedComputation,toggleDelayedComputation:this.toggleDelayedComputation,diffStateString:this.state.diffStateString}))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(c.b,{theme:{colors:{text:"#000",background:"#fff",primary:"#17A2B8",modes:{dark:{text:"#fff",background:"#000",primary:"#0cf"}}}}},r.a.createElement(se,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[52,1,2]]]);
//# sourceMappingURL=main.1447c76c.chunk.js.map