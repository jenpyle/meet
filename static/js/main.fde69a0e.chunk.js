(this.webpackJsonpmeet=this.webpackJsonpmeet||[]).push([[0],{47:function(e,t,n){},48:function(e,t,n){},71:function(e,t,n){},73:function(e,t,n){"use strict";n.r(t);n(42);var a=n(0),r=n.n(a),o=n(15),s=n.n(o),i=(n(47),n(6)),c=n(11),l=n(8),u=n(7),d=(n(48),n(75)),h=n(76),f=n(36),m=n(77),b=n(80),p=n(81),v=n(3),j=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={buttonLabel:"Show Details"},e.toggleshowingDetails=function(){"Show Details"===e.state.buttonLabel?e.setState({buttonLabel:"Hide Details"}):e.setState({buttonLabel:"Show Details"})},e}return Object(c.a)(n,[{key:"render",value:function(){var e=this.props.eventData,t=this.state.buttonLabel;return Object(v.jsx)(d.a,{children:Object(v.jsx)(h.a,{children:Object(v.jsx)(f.a,{children:Object(v.jsx)(m.a,{children:Object(v.jsxs)(b.a,{className:"Event",children:[Object(v.jsxs)(b.a.Body,{className:"details",children:[Object(v.jsx)(b.a.Title,{className:"title",children:e.summary}),Object(v.jsxs)(b.a.Text,{children:["Start: ",e.start.dateTime,Object(v.jsx)("br",{}),"End: ",e.end.dateTime,Object(v.jsx)("br",{}),"TimeZone: ",e.start.timeZone]}),Object(v.jsx)(m.a.Toggle,{as:p.a,variant:"link",eventKey:"0",className:"detailsButton",onClick:this.toggleshowingDetails,children:t})]}),Object(v.jsx)(m.a.Collapse,{eventKey:"0",children:Object(v.jsxs)(b.a.Body,{className:"moreDetails",children:[Object(v.jsx)(b.a.Title,{children:"About Event"}),Object(v.jsxs)(b.a.Text,{children:[e.description,Object(v.jsxs)(b.a.Subtitle,{children:["Contact:"," ",Object(v.jsx)("a",{href:"mailto:{eventData.organizer.email}",target:"_blank",rel:"noreferrer",children:e.organizer.email})]}),Object(v.jsx)(p.a,{variant:"primary",className:"calendarLink",href:e.htmlLink,target:"_blank",children:"View in Google Calendar"})]})]})})]})})})})})}}]),n}(a.Component),g=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=this.props,t=e.events,n=e.number;return Object(v.jsx)("ul",{className:"EventList",children:t.slice(0,n).map((function(e){return Object(v.jsx)("li",{children:Object(v.jsx)(j,{eventData:e})},e.id)}))})}}]),n}(a.Component),w=n(78),O=n(79),x=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).getStyle=function(){return{color:a.color}},a.color=null,a}return Object(c.a)(n,[{key:"render",value:function(){return Object(v.jsx)("div",{className:"Alert",children:Object(v.jsx)("p",{style:this.getStyle(),children:this.props.text})})}}]),n}(a.Component),y=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).getStyle=function(){return{color:a.color,fontWeight:"bold",fontSize:"63%"}},a.color="blue",a}return n}(x),k=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).getStyle=function(){return{color:a.color,fontWeight:"bold",fontSize:"75%"}},a.color="red",a}return n}(x),S=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={query:"",suggestions:[],showSuggestions:void 0,infoText:""},e.handleInputChanged=function(t){var n=t.target.value;e.setState({showSuggestions:!0});var a=e.props.locations.filter((function(e){return e.toUpperCase().indexOf(n.toUpperCase())>-1}));if(0!==a.length)return e.setState({query:n,suggestions:a,infoText:""});e.setState({query:n,infoText:"We can not find the city you are looking for. Please try another city"})},e.handleItemClicked=function(t){e.setState({query:t,suggestions:[],showSuggestions:!1,infoText:""}),e.props.updateEvents(t)},e}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return Object(v.jsxs)("div",{className:"CitySearch",children:[Object(v.jsx)(w.a,{children:Object(v.jsxs)(w.a.Group,{as:h.a,controlId:"formPlaintextPassword",children:[""===this.state.infoText?Object(v.jsx)(w.a.Label,{column:!0,md:"6",className:"resize",children:"Search for events near you:"}):Object(v.jsx)(w.a.Label,{column:!0,md:"6",className:"resize",children:Object(v.jsx)(y,{text:this.state.infoText})}),Object(v.jsx)(f.a,{md:"6",children:Object(v.jsx)(w.a.Control,{type:"text",className:"city",placeholder:"Search cities",value:this.state.query,onChange:this.handleInputChanged,onFocus:function(){e.setState({showSuggestions:!0})},onBlur:function(){e.setState({showSuggestions:!1})}})})]})}),Object(v.jsxs)(O.a,{className:"suggestions",style:this.state.showSuggestions?{}:{display:"none"},children:[this.state.suggestions.map((function(t){return Object(v.jsx)(O.a.Item,{className:"list-item",action:!0,onClick:function(){return e.handleItemClicked(t)},children:t},t)})),Object(v.jsx)(O.a.Item,{className:"list-item",action:!0,onClick:function(){return e.handleItemClicked("all")},children:"See all cities"})]})]})}}]),n}(a.Component),T=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={numberEvents:5},e.handleInputChanged=function(t){var n=t.target.value;e.setState({numberEvents:n<1?0:n}),e.props.updateEventNumber(t.target.value)},e}return Object(c.a)(n,[{key:"render",value:function(){var e=this.state.numberEvents;return Object(v.jsx)("div",{className:"NumberOfEvents",children:Object(v.jsx)(w.a,{className:"numberEventsInput",children:Object(v.jsxs)(w.a.Group,{as:h.a,controlId:"formPlaintextPassword",children:[this.state.numberEvents>=1?Object(v.jsx)(w.a.Label,{column:!0,md:"6",className:"resize",children:"Number of Events:"}):Object(v.jsx)(w.a.Label,{column:!0,md:"6",className:"resize",children:Object(v.jsx)(k,{text:"Set number from 1 to 32"})}),Object(v.jsx)(f.a,{md:"6",children:Object(v.jsx)(w.a.Control,{className:"numEventInput",min:"0",max:"32",type:"number",placeholder:"Enter number of events to view",value:e,onChange:this.handleInputChanged})})]})})})}}]),n}(a.Component),N=n(13),C=n.n(N),E=n(17),Z=n(40),I=JSON.parse(JSON.stringify([{kind:"calendar#event",etag:'"3181161784712000"',id:"4eahs9ghkhrvkld72hogu9ph3e_20200519T140000Z",status:"confirmed",htmlLink:"https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",created:"2020-05-19T19:17:46.000Z",updated:"2020-05-27T12:01:32.356Z",summary:"Learn JavaScript",description:"Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.",location:"London, UK",creator:{email:"fullstackwebdev@careerfoundry.com",self:!0},organizer:{email:"fullstackwebdev@careerfoundry.com",self:!0},start:{dateTime:"2020-05-19T16:00:00+02:00",timeZone:"Europe/Berlin"},end:{dateTime:"2020-05-19T17:00:00+02:00",timeZone:"Europe/Berlin"},recurringEventId:"4eahs9ghkhrvkld72hogu9ph3e",originalStartTime:{dateTime:"2020-05-19T16:00:00+02:00",timeZone:"Europe/Berlin"},iCalUID:"4eahs9ghkhrvkld72hogu9ph3e@google.com",sequence:0,reminders:{useDefault:!0},eventType:"default"},{kind:"calendar#event",etag:'"3181159875584000"',id:"3qtd6uscq4tsi6gc7nmmtpqlct_20200520T120000Z",status:"confirmed",htmlLink:"https://www.google.com/calendar/event?eid=M3F0ZDZ1c2NxNHRzaTZnYzdubW10cHFsY3RfMjAyMDA1MjBUMTIwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",created:"2020-05-19T19:14:30.000Z",updated:"2020-05-27T11:45:37.792Z",summary:"React is Fun",description:"Love HTML, CSS, and JS? Want to become a cool front-end developer? \n\nReact is one of the most popular front-end frameworks. There is a huge number of job openings for React developers in most cities. \n\nJoin us in our free React training sessions and give your career a new direction. ",location:"Berlin, Germany",creator:{email:"fullstackwebdev@careerfoundry.com",self:!0},organizer:{email:"fullstackwebdev@careerfoundry.com",self:!0},start:{dateTime:"2020-05-20T14:00:00+02:00",timeZone:"Europe/Berlin"},end:{dateTime:"2020-05-20T15:00:00+02:00",timeZone:"Europe/Berlin"},recurringEventId:"3qtd6uscq4tsi6gc7nmmtpqlct",originalStartTime:{dateTime:"2020-05-20T14:00:00+02:00",timeZone:"Europe/Berlin"},iCalUID:"3qtd6uscq4tsi6gc7nmmtpqlct@google.com",sequence:0,reminders:{useDefault:!0},eventType:"default"}])),L=n(26),W=n.n(L),D=n(21),z=n.n(D),A=function(e){var t=e.map((function(e){return e.location}));return Object(Z.a)(new Set(t))},B=function(){var e=Object(E.a)(C.a.mark((function e(t){var n;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=".concat(t)).then((function(e){return e.json()})).catch((function(e){return e.json()}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=function(){var e=Object(E.a)(C.a.mark((function e(t){var n,a,r;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=encodeURIComponent(t),e.next=3,fetch("https://1hjwzwtdhj.execute-api.us-west-1.amazonaws.com/dev/api/token/"+n).then((function(e){return e.json()})).catch((function(e){return e}));case 3:return a=e.sent,(r=a.access_token)&&localStorage.setItem("access_token",r),e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(){if(window.history.pushState&&window.location.pathname){var e=window.location.protocol+"//"+window.location.host+window.location.pathname;window.history.pushState("","",e)}else e=window.location.protocol+"//"+window.location.host,window.history.pushState("","",e)},M=function(){var e=Object(E.a)(C.a.mark((function e(){var t,n,a,r;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(z.a.start(),!window.location.href.startsWith("http://localhost")){e.next=4;break}return z.a.done(),e.abrupt("return",I);case 4:return e.next=6,U();case 6:if(!(t=e.sent)){e.next=16;break}return J(),n="https://1hjwzwtdhj.execute-api.us-west-1.amazonaws.com/dev/api/get-events/"+t,e.next=12,W.a.get(n);case 12:return(a=e.sent).data&&(r=A(a.data.events),localStorage.setItem("lastEvents",JSON.stringify(a.data)),localStorage.setItem("locations",JSON.stringify(r))),z.a.done(),e.abrupt("return",a.data.events);case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),U=function(){var e=Object(E.a)(C.a.mark((function e(){var t,n,a,r,o,s;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=localStorage.getItem("access_token"),e.t0=t,!e.t0){e.next=6;break}return e.next=5,B(t);case 5:e.t0=e.sent;case 6:if(n=e.t0,t&&!n.error){e.next=21;break}return e.next=10,localStorage.removeItem("access_token");case 10:return a=new URLSearchParams(window.location.search),e.next=13,a.get("code");case 13:if(r=e.sent){e.next=20;break}return e.next=17,W.a.get("https://1hjwzwtdhj.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url");case 17:return o=e.sent,s=o.data.authUrl,e.abrupt("return",window.location.href=s);case 20:return e.abrupt("return",r&&q(r));case 21:return e.abrupt("return",t);case 22:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=(n(71),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={events:[],locations:[],number:5},e.updateEvents=function(t){M().then((function(n){var a="all"===t?n:n.filter((function(e){return e.location===t}));e.setState({events:a})}))},e.updateEventNumber=function(t){e.setState({number:t})},e}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.mounted=!0,M().then((function(t){e.mounted&&e.setState({events:t,locations:A(t)})}))}},{key:"componentWillUnmount",value:function(){this.mounted=!1}},{key:"render",value:function(){var e=this;return Object(v.jsx)(d.a,{children:Object(v.jsx)(h.a,{children:Object(v.jsx)(f.a,{children:Object(v.jsxs)("div",{className:"App",children:[Object(v.jsx)(S,{locations:this.state.locations,updateEvents:this.updateEvents}),Object(v.jsx)(T,{updateEventNumber:function(t){return e.updateEventNumber(t)}}),Object(v.jsx)(g,{events:this.state.events,number:this.state.number})]})})})})}}]),n}(a.Component)),F=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function P(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var _=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,82)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),o(e),s(e)}))},H=n(39);s.a.render(Object(v.jsx)(r.a.StrictMode,{children:Object(v.jsx)(R,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/meet",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/meet","/service-worker.js");F?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):P(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):P(t,e)}))}}(),_(),H.config("51ec6f3cfee249b5814f2bf3b1417d8b").install()}},[[73,1,2]]]);
//# sourceMappingURL=main.fde69a0e.chunk.js.map