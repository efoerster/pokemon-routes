(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{119:function(e,t,a){"use strict";const n=(e,{target:t=document.body}={})=>{const a=document.createElement("textarea"),n=document.activeElement;a.value=e,a.setAttribute("readonly",""),a.style.contain="strict",a.style.position="absolute",a.style.left="-9999px",a.style.fontSize="12pt";const r=document.getSelection();let l=!1;r.rangeCount>0&&(l=r.getRangeAt(0)),t.append(a),a.select(),a.selectionStart=0,a.selectionEnd=e.length;let c=!1;try{c=document.execCommand("copy")}catch(o){}return a.remove(),l&&(r.removeAllRanges(),r.addRange(l)),n&&n.focus(),c};e.exports=n,e.exports.default=n},120:function(e,t){e.exports.parse=function(e){var t=e.split(",").map((function(e){return function(e){if(/^-?\d+$/.test(e))return parseInt(e,10);var t;if(t=e.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){var a=t[1],n=t[2],r=t[3];if(a&&r){var l=[],c=(a=parseInt(a))<(r=parseInt(r))?1:-1;"-"!=n&&".."!=n&&"\u2025"!=n||(r+=c);for(var o=a;o!=r;o+=c)l.push(o);return l}}return[]}(e)}));return 0===t.length?[]:1===t.length?Array.isArray(t[0])?t[0]:t:t.reduce((function(e,t){return Array.isArray(e)||(e=[e]),Array.isArray(t)||(t=[t]),e.concat(t)}))}},63:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(78),c=a(68),o=a(23),s=a(102),i=a(2),u=a(6),p=a(67),m=a(66),d=a(90),y=a(83),h=a(87),b=a(88),f=a(89),g=a(86),v=a(70),k=a(73),j=a(54),O=a.n(j);var E=function e(t,a){return"link"===t.type?Object(d.a)(t.href,a):"category"===t.type&&t.items.some((function(t){return e(t,a)}))};function N(e){var t,a,l,c=e.item,o=e.onItemClick,s=e.collapsible,m=e.activePath,d=Object(u.a)(e,["item","onItemClick","collapsible","activePath"]),y=c.items,h=c.label,b=E(c,m),f=(a=b,l=Object(n.useRef)(a),Object(n.useEffect)((function(){l.current=a}),[a]),l.current),g=Object(n.useState)((function(){return!!s&&(!b&&c.collapsed)})),v=g[0],k=g[1];Object(n.useEffect)((function(){b&&!f&&v&&k(!1)}),[b,f,v]);var j=Object(n.useCallback)((function(e){e.preventDefault(),k((function(e){return!e}))}),[k]);return 0===y.length?null:r.a.createElement("li",{className:Object(p.a)("menu__list-item",{"menu__list-item--collapsed":v}),key:h},r.a.createElement("a",Object(i.a)({className:Object(p.a)("menu__link",(t={"menu__link--sublist":s,"menu__link--active":s&&b},t[O.a.menuLinkText]=!s,t)),onClick:s?j:void 0,href:s?"#!":void 0},d),h),r.a.createElement("ul",{className:"menu__list"},y.map((function(e){return r.a.createElement(x,{tabIndex:v?"-1":"0",key:e.label,item:e,onItemClick:o,collapsible:s,activePath:m})}))))}function C(e){var t=e.item,a=e.onItemClick,n=e.activePath,l=(e.collapsible,Object(u.a)(e,["item","onItemClick","activePath","collapsible"])),c=t.href,o=t.label,s=E(t,n);return r.a.createElement("li",{className:"menu__list-item",key:o},r.a.createElement(v.a,Object(i.a)({className:Object(p.a)("menu__link",{"menu__link--active":s}),to:c},Object(k.a)(c)?{isNavLink:!0,exact:!0,onClick:a}:{target:"_blank",rel:"noreferrer noopener"},l),o))}function x(e){switch(e.item.type){case"category":return r.a.createElement(N,e);case"link":default:return r.a.createElement(C,e)}}var _=function(e){var t,a,l=e.path,o=e.sidebar,s=e.sidebarCollapsible,u=void 0===s||s,d=Object(n.useState)(!1),k=d[0],j=d[1],E=Object(m.a)().navbar,N=E.title,C=E.hideOnScroll,_=Object(c.a)().isClient,w=Object(f.a)(),P=w.logoLink,T=w.logoLinkProps,I=w.logoImageUrl,S=w.logoAlt,L=Object(y.a)().isAnnouncementBarClosed,B=Object(g.a)().scrollY;Object(h.a)(k);var M=Object(b.a)();return Object(n.useEffect)((function(){M===b.b.desktop&&j(!1)}),[M]),r.a.createElement("div",{className:Object(p.a)(O.a.sidebar,(t={},t[O.a.sidebarWithHideableNavbar]=C,t))},C&&r.a.createElement(v.a,Object(i.a)({tabIndex:-1,className:O.a.sidebarLogo,to:P},T),null!=I&&r.a.createElement("img",{key:_,src:I,alt:S}),null!=N&&r.a.createElement("strong",null,N)),r.a.createElement("div",{className:Object(p.a)("menu","menu--responsive",O.a.menu,(a={"menu--show":k},a[O.a.menuWithAnnouncementBar]=!L&&0===B,a))},r.a.createElement("button",{"aria-label":k?"Close Menu":"Open Menu","aria-haspopup":"true",className:"button button--secondary button--sm menu__button",type:"button",onClick:function(){j(!k)}},k?r.a.createElement("span",{className:Object(p.a)(O.a.sidebarMenuIcon,O.a.sidebarMenuCloseIcon)},"\xd7"):r.a.createElement("svg",{"aria-label":"Menu",className:O.a.sidebarMenuIcon,xmlns:"http://www.w3.org/2000/svg",height:24,width:24,viewBox:"0 0 32 32",role:"img",focusable:"false"},r.a.createElement("title",null,"Menu"),r.a.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"2",d:"M4 7h22M4 15h22M4 23h22"}))),r.a.createElement("ul",{className:"menu__list"},o.map((function(e){return r.a.createElement(x,{key:e.label,item:e,onItemClick:function(e){e.target.blur(),j(!1)},collapsible:u,activePath:l})})))))},w={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},P={Prism:a(20).a,theme:w};function T(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function I(){return(I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var S=/\r\n|\r|\n/,L=function(e){0===e.length?e.push({types:["plain"],content:"",empty:!0}):1===e.length&&""===e[0].content&&(e[0].empty=!0)},B=function(e,t){var a=e.length;return a>0&&e[a-1]===t?e:e.concat(t)},M=function(e,t){var a=e.plain,n=Object.create(null),r=e.styles.reduce((function(e,a){var n=a.languages,r=a.style;return n&&!n.includes(t)||a.types.forEach((function(t){var a=I({},e[t],r);e[t]=a})),e}),n);return r.root=a,r.plain=I({},a,{backgroundColor:null}),r};function D(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===t.indexOf(n)&&(a[n]=e[n]);return a}var A=function(e){function t(){for(var t=this,a=[],n=arguments.length;n--;)a[n]=arguments[n];e.apply(this,a),T(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var a=e.theme?M(e.theme,e.language):void 0;return t.themeDict=a})),T(this,"getLineProps",(function(e){var a=e.key,n=e.className,r=e.style,l=I({},D(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),c=t.getThemeDict(t.props);return void 0!==c&&(l.style=c.plain),void 0!==r&&(l.style=void 0!==l.style?I({},l.style,r):r),void 0!==a&&(l.key=a),n&&(l.className+=" "+n),l})),T(this,"getStyleForToken",(function(e){var a=e.types,n=e.empty,r=a.length,l=t.getThemeDict(t.props);if(void 0!==l){if(1===r&&"plain"===a[0])return n?{display:"inline-block"}:void 0;if(1===r&&!n)return l[a[0]];var c=n?{display:"inline-block"}:{},o=a.map((function(e){return l[e]}));return Object.assign.apply(Object,[c].concat(o))}})),T(this,"getTokenProps",(function(e){var a=e.key,n=e.className,r=e.style,l=e.token,c=I({},D(e,["key","className","style","token"]),{className:"token "+l.types.join(" "),children:l.content,style:t.getStyleForToken(l),key:void 0});return void 0!==r&&(c.style=void 0!==c.style?I({},c.style,r):r),void 0!==a&&(c.key=a),n&&(c.className+=" "+n),c}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,a=e.language,n=e.code,r=e.children,l=this.getThemeDict(this.props),c=t.languages[a];return r({tokens:function(e){for(var t=[[]],a=[e],n=[0],r=[e.length],l=0,c=0,o=[],s=[o];c>-1;){for(;(l=n[c]++)<r[c];){var i=void 0,u=t[c],p=a[c][l];if("string"==typeof p?(u=c>0?u:["plain"],i=p):(u=B(u,p.type),p.alias&&(u=B(u,p.alias)),i=p.content),"string"==typeof i){var m=i.split(S),d=m.length;o.push({types:u,content:m[0]});for(var y=1;y<d;y++)L(o),s.push(o=[]),o.push({types:u,content:m[y]})}else c++,t.push(u),a.push(i),n.push(0),r.push(i.length)}c--,t.pop(),a.pop(),n.pop(),r.pop()}return L(o),s}(void 0!==c?t.tokenize(n,c,a):[n]),className:"prism-code language-"+a,style:void 0!==l?l.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(n.Component),R=a(119),W=a.n(R),$=a(120),F=a.n($),z={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]},J=a(76),H=function(){var e=Object(m.a)().prism,t=Object(J.a)().isDarkTheme,a=e.theme||z,n=e.darkTheme||a;return t?n:a},U=a(55),Y=a.n(U),q=/{([\d,-]+)}/,G=function(e){void 0===e&&(e=["js","jsBlock","jsx","python","html"]);var t={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},python:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},a=["highlight-next-line","highlight-start","highlight-end"].join("|"),n=e.map((function(e){return"(?:"+t[e].start+"\\s*("+a+")\\s*"+t[e].end+")"})).join("|");return new RegExp("^\\s*(?:"+n+")\\s*$")},K=/title=".*"/,Q=function(e){var t=e.children,a=e.className,l=e.metastring,c=Object(m.a)().prism,o=Object(n.useState)(!1),s=o[0],u=o[1],d=Object(n.useState)(!1),y=d[0],h=d[1];Object(n.useEffect)((function(){h(!0)}),[]);var b=Object(n.useRef)(null),f=[],g="",v=H();if(l&&q.test(l)){var k=l.match(q)[1];f=F.a.parse(k).filter((function(e){return e>0}))}l&&K.test(l)&&(g=l.match(K)[0].split("title=")[1].replace(/"+/g,""));var j=a&&a.replace(/language-/,"");!j&&c.defaultLanguage&&(j=c.defaultLanguage);var O=t.replace(/\n$/,"");if(0===f.length&&void 0!==j){for(var E,N="",C=function(e){switch(e){case"js":case"javascript":case"ts":case"typescript":return G(["js","jsBlock"]);case"jsx":case"tsx":return G(["js","jsBlock","jsx"]);case"html":return G(["js","jsBlock","html"]);case"python":case"py":return G(["python"]);default:return G()}}(j),x=t.replace(/\n$/,"").split("\n"),_=0;_<x.length;){var w=_+1,T=x[_].match(C);if(null!==T){switch(T.slice(1).reduce((function(e,t){return e||t}),void 0)){case"highlight-next-line":N+=w+",";break;case"highlight-start":E=w;break;case"highlight-end":N+=E+"-"+(w-1)+","}x.splice(_,1)}else _+=1}f=F.a.parse(N),O=x.join("\n")}var I=function(){W()(O),u(!0),setTimeout((function(){return u(!1)}),2e3)};return r.a.createElement(A,Object(i.a)({},P,{key:String(y),theme:v,code:O,language:j}),(function(e){var t,a,n=e.className,l=e.style,c=e.tokens,o=e.getLineProps,u=e.getTokenProps;return r.a.createElement(r.a.Fragment,null,g&&r.a.createElement("div",{style:l,className:Y.a.codeBlockTitle},g),r.a.createElement("div",{className:Y.a.codeBlockContent},r.a.createElement("button",{tabIndex:0,ref:b,type:"button","aria-label":"Copy code to clipboard",className:Object(p.a)(Y.a.copyButton,(t={},t[Y.a.copyButtonWithTitle]=g,t)),onClick:I},s?"Copied":"Copy"),r.a.createElement("div",{className:Object(p.a)(n,Y.a.codeBlock,(a={},a[Y.a.codeBlockWithTitle]=g,a))},r.a.createElement("div",{className:Y.a.codeBlockLines,style:l},c.map((function(e,t){1===e.length&&""===e[0].content&&(e[0].content="\n");var a=o({line:e,key:t});return f.includes(t+1)&&(a.className=a.className+" docusaurus-highlight-code-line"),r.a.createElement("div",Object(i.a)({key:t},a),e.map((function(e,t){return r.a.createElement("span",Object(i.a)({key:t},u({token:e,key:t})))})))}))))))}))},V=(a(56),a(57)),X=a.n(V),Z=function(e){return function(t){var a,n=t.id,l=Object(u.a)(t,["id"]),c=Object(m.a)().navbar.hideOnScroll;return n?r.a.createElement(e,l,r.a.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:Object(p.a)("anchor",(a={},a[X.a.enhancedAnchor]=!c,a)),id:n}),l.children,r.a.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:"hash-link",href:"#"+n,title:"Direct link to heading"},"#")):r.a.createElement(e,l)}},ee=a(58),te=a.n(ee),ae={code:function(e){var t=e.children;return"string"==typeof t?t.includes("\n")?r.a.createElement(Q,e):r.a.createElement("code",e):t},a:function(e){return r.a.createElement(v.a,e)},pre:function(e){return r.a.createElement("div",Object(i.a)({className:te.a.mdxCodeBlock},e))},h1:Z("h1"),h2:Z("h2"),h3:Z("h3"),h4:Z("h4"),h5:Z("h5"),h6:Z("h6")},ne=a(104),re=a(72),le=a(59),ce=a.n(le),oe=a(91);function se(e){var t,a,n=e.currentDocRoute,o=e.versionMetadata,i=e.children,u=Object(c.a)(),p=u.siteConfig,m=u.isClient,d=o.pluginId,y=o.permalinkToSidebar,h=o.docsSidebars,b=o.version,f=y[n.path],g=h[f];return r.a.createElement(s.a,{key:m,searchMetadatas:{version:b,tag:Object(oe.b)(d,b)}},r.a.createElement("div",{className:ce.a.docPage},g&&r.a.createElement("div",{className:ce.a.docSidebarContainer,role:"complementary"},r.a.createElement(_,{key:f,sidebar:g,path:n.path,sidebarCollapsible:null===(t=null===(a=p.themeConfig)||void 0===a?void 0:a.sidebarCollapsible)||void 0===t||t})),r.a.createElement("main",{className:ce.a.docMainContainer},r.a.createElement(l.a,{components:ae},i))))}t.default=function(e){var t=e.route.routes,a=e.versionMetadata,n=e.location,l=t.find((function(e){return Object(re.matchPath)(n.pathname,e)}));return l?r.a.createElement(se,{currentDocRoute:l,versionMetadata:a},Object(o.a)(t)):r.a.createElement(ne.default,e)}}}]);