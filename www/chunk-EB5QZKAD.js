import{b as p}from"./chunk-OHRAIMKX.js";import{q as l,r as d}from"./chunk-IFNCDCK6.js";import{a as e}from"./chunk-MM5QLNJM.js";import{c as f}from"./chunk-FZNGTKS7.js";import{b as c,f as s,g as u,i as h}from"./chunk-NGCJV2CD.js";import"./chunk-JHI3MBHO.js";var I="",m=I,P="",C=P,v=(()=>{let n=class{constructor(t){c(this,t),this.togglePasswordVisibility=()=>{let{inputElRef:o}=this;o&&(o.type=o.type==="text"?"password":"text")},this.color=void 0,this.showIcon=void 0,this.hideIcon=void 0,this.type="password"}onTypeChange(t){if(t!=="text"&&t!=="password"){e(`ion-input-password-toggle only supports inputs of type "text" or "password". Input of type "${t}" is not compatible.`,this.el);return}}connectedCallback(){let{el:t}=this,o=this.inputElRef=t.closest("ion-input");if(!o){e("No ancestor ion-input found for ion-input-password-toggle. This component must be slotted inside of an ion-input.",t);return}this.type=o.type}disconnectedCallback(){this.inputElRef=null}render(){var t,o;let{color:i,type:g}=this,r=f(this),y=(t=this.showIcon)!==null&&t!==void 0?t:l,w=(o=this.hideIcon)!==null&&o!==void 0?o:d,a=g==="text";return s(u,{key:"d9811e25bfeb2aa197352bb9be852e9e420739d5",class:p(i,{[r]:!0})},s("ion-button",{key:"1eaea1442b248fb2b8d61538b27274e647a07804",mode:r,color:i,fill:"clear",shape:"round","aria-checked":a?"true":"false","aria-label":"show password",role:"switch",type:"button",onPointerDown:b=>{b.preventDefault()},onClick:this.togglePasswordVisibility},s("ion-icon",{key:"9c88de8f4631d9bde222ce2edf6950d639e04773",slot:"icon-only","aria-hidden":"true",icon:a?w:y})))}get el(){return h(this)}static get watchers(){return{type:["onTypeChange"]}}};return n.style={ios:m,md:C},n})();export{v as ion_input_password_toggle};
