(this["webpackJsonpmr-grocery-front-end"]=this["webpackJsonpmr-grocery-front-end"]||[]).push([[0],{29:function(e,t,a){e.exports=a(39)},39:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(6),o=a.n(c),l=a(15),u=a.n(l),s=a(21),i=a(8),m=a(9),d=a(13),f=a(11),p=a(22),y=function(e){return r.a.createElement(p.a,null,r.a.createElement("h1",null,"Mr Grocery"),r.a.createElement("p",null,"Welcome to Mr Grocery"))},v=a(41),E=(a(35),a(45)),h=a(42),b=a(44),g=a(43),j=function(e){var t;switch(e.inventoryStatus){case"Well Stocked":t="success";break;case"Could Get More":t="warning";break;default:t="danger"}return r.a.createElement(g.a,{horizontal:!0},r.a.createElement(g.a.Item,{key:Object(E.a)(),style:{flexBasis:"50%"},variant:t},e.item),r.a.createElement(g.a.Item,{key:Object(E.a)(),style:{flexBasis:"50%"},variant:"info"},"Notes: ".concat(e.notes)))},k=function(e){var t=e.data;return r.a.createElement(h.a,{defaultActiveKey:"0"},r.a.createElement(b.a,null,r.a.createElement(h.a.Toggle,{as:b.a.Header,eventKey:toString(e.index)},e.category),r.a.createElement(h.a.Collapse,{eventKey:toString(e.index)},r.a.createElement(r.a.Fragment,null,t.map((function(e){return r.a.createElement(j,{key:Object(E.a)(),item:e.item,inventoryStatus:e.inventoryStatus,notes:e.notes})}))))))},O=function(e){Object(d.a)(a,e);var t=Object(f.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props.data,t=Object.keys(e);return r.a.createElement(r.a.Fragment,null,t.map((function(t){return r.a.createElement(k,{key:Object(E.a)(),category:t,data:e[t]})})))}}]),a}(r.a.Component),S=function(e){Object(d.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={data:{}},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=Object(s.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://mr-grocery.herokuapp.com/api/v2/data",{method:"GET"});case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,a=JSON.parse(a),console.log(a),this.setState({data:a});case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(y,null),r.a.createElement(v.a,{fluid:"sm"},r.a.createElement(O,{data:this.state.data})))}}]),a}(r.a.Component);o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(S,null)),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.d482cba2.chunk.js.map