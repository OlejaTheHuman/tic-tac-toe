(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{11:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),r=n(4),a=n.n(r),o=(n(9),n(2)),s=n(1);var u=function(e){var t=e.children,n=e.index,c=e.state,i=e.figure,r=Object(o.a)(c,2),a=r[0],u=r[1],l=Object(o.a)(i,2),d=l[0],f=l[1];return Object(s.jsx)("div",{onClick:function(){if(""===a[n]){var e=a.slice();e[n]=d,u(e),f(d),console.log("clicked",n)}},className:"cell",children:t})},l=["","","","","","","","",""],d=["111000000","000111000","000000111","100010001","001010100","010010010","100100100","001001001"];var f=function(){var e=i.a.useState(l),t=Object(o.a)(e,2),n=t[0],c=t[1],r=i.a.useState("x"),a=Object(o.a)(r,2),f=a[0],j=a[1];function x(e){return j("x"===e?"o":"x"),e}return i.a.useEffect((function(){var e="x"===f?"o":"x";!function(e){for(var t,i=0;i<d.length;i++){t=d[i].split("");for(var r=void 0,a=[],o=0;o<3;o++)r=t.indexOf("1"),n[r]===e?a.push(!0):n[r]!==e&&a.push(!1),t[r]=0;if(!a.includes(!1))return alert("".concat(e," is winner!")),c(l),!0}}(e)?n.includes("")||(alert("So... try one more time"),c(l)):console.log(e," is winner!")}),[n]),Object(s.jsx)("div",{className:"board",children:n.map((function(e,t){return Object(s.jsx)(u,{index:t,figure:[f,x],state:[n,c],children:e},"".concat(e,"_").concat(t))}))})};a.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(f,{})}),document.getElementById("root"))},9:function(e,t,n){}},[[11,1,2]]]);
//# sourceMappingURL=main.7f293f18.chunk.js.map