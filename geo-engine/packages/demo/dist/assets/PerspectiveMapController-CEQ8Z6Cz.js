var Gu=Object.defineProperty;var Bu=(n,t,e)=>t in n?Gu(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var U=(n,t,e)=>Bu(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qo="168",Rn={ROTATE:0,DOLLY:1,PAN:2},zi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},zu=0,Ih=1,ku=2,_c=1,Hu=2,wn=3,Xn=0,ze=1,un=2,Vn=0,$i=1,Nh=2,Dh=3,Uh=4,Vu=5,oi=100,Wu=101,Xu=102,qu=103,Yu=104,$u=200,Ku=201,ju=202,Zu=203,so=204,ro=205,Ju=206,Qu=207,tf=208,ef=209,nf=210,sf=211,rf=212,af=213,of=214,hf=0,lf=1,cf=2,Vr=3,uf=4,ff=5,df=6,pf=7,gc=0,mf=1,_f=2,Wn=0,gf=1,vf=2,Mf=3,xf=4,yf=5,Sf=6,Ef=7,vc=300,ts=301,es=302,ao=303,oo=304,ua=306,ho=1e3,li=1001,lo=1002,sn=1003,Tf=1004,Qs=1005,Ke=1006,Sa=1007,ci=1008,Cn=1009,Mc=1010,xc=1011,Ls=1012,th=1013,fi=1014,An=1015,ks=1016,eh=1017,nh=1018,ns=1020,yc=35902,Sc=1021,Ec=1022,fn=1023,Tc=1024,bc=1025,Ki=1026,is=1027,wc=1028,ih=1029,Ac=1030,sh=1031,rh=1033,Nr=33776,Dr=33777,Ur=33778,Or=33779,co=35840,uo=35841,fo=35842,po=35843,mo=36196,_o=37492,go=37496,vo=37808,Mo=37809,xo=37810,yo=37811,So=37812,Eo=37813,To=37814,bo=37815,wo=37816,Ao=37817,Po=37818,Ro=37819,Co=37820,Lo=37821,Fr=36492,Io=36494,No=36495,Pc=36283,Do=36284,Uo=36285,Oo=36286,bf=3200,wf=3201,Af=0,Pf=1,kn="",cn="srgb",Kn="srgb-linear",ah="display-p3",fa="display-p3-linear",Wr="linear",te="srgb",Xr="rec709",qr="p3",yi=7680,Oh=519,Rf=512,Cf=513,Lf=514,Rc=515,If=516,Nf=517,Df=518,Uf=519,Fh=35044,Gh="300 es",Pn=2e3,Yr=2001;class vi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Bh=1234567;const xs=Math.PI/180,Is=180/Math.PI;function Mi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[i&255]+be[i>>8&255]+be[i>>16&255]+be[i>>24&255]).toLowerCase()}function xe(n,t,e){return Math.max(t,Math.min(e,n))}function oh(n,t){return(n%t+t)%t}function Of(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Ff(n,t,e){return n!==t?(e-n)/(t-n):0}function ys(n,t,e){return(1-e)*n+e*t}function Gf(n,t,e,i){return ys(n,t,1-Math.exp(-e*i))}function Bf(n,t=1){return t-Math.abs(oh(n,t*2)-t)}function zf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function kf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Hf(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Vf(n,t){return n+Math.random()*(t-n)}function Wf(n){return n*(.5-Math.random())}function Xf(n){n!==void 0&&(Bh=n);let t=Bh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function qf(n){return n*xs}function Yf(n){return n*Is}function $f(n){return(n&n-1)===0&&n!==0}function Kf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function jf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Zf(n,t,e,i,s){const r=Math.cos,a=Math.sin,o=r(e/2),h=a(e/2),l=r((t+i)/2),c=a((t+i)/2),u=r((t-i)/2),d=a((t-i)/2),f=r((i-t)/2),_=a((i-t)/2);switch(s){case"XYX":n.set(o*c,h*u,h*d,o*l);break;case"YZY":n.set(h*d,o*c,h*u,o*l);break;case"ZXZ":n.set(h*u,h*d,o*c,o*l);break;case"XZX":n.set(o*c,h*_,h*f,o*l);break;case"YXY":n.set(h*f,o*c,h*_,o*l);break;case"ZYZ":n.set(h*_,h*f,o*c,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Gi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Re(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Fo={DEG2RAD:xs,RAD2DEG:Is,generateUUID:Mi,clamp:xe,euclideanModulo:oh,mapLinear:Of,inverseLerp:Ff,lerp:ys,damp:Gf,pingpong:Bf,smoothstep:zf,smootherstep:kf,randInt:Hf,randFloat:Vf,randFloatSpread:Wf,seededRandom:Xf,degToRad:qf,radToDeg:Yf,isPowerOfTwo:$f,ceilPowerOfTwo:Kf,floorPowerOfTwo:jf,setQuaternionFromProperEuler:Zf,normalize:Re,denormalize:Gi};class ct{constructor(t=0,e=0){ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(xe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ot{constructor(t,e,i,s,r,a,o,h,l){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,h,l)}set(t,e,i,s,r,a,o,h,l){const c=this.elements;return c[0]=t,c[1]=s,c[2]=o,c[3]=e,c[4]=r,c[5]=h,c[6]=i,c[7]=a,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],h=i[6],l=i[1],c=i[4],u=i[7],d=i[2],f=i[5],_=i[8],g=s[0],p=s[3],m=s[6],x=s[1],v=s[4],S=s[7],L=s[2],b=s[5],w=s[8];return r[0]=a*g+o*x+h*L,r[3]=a*p+o*v+h*b,r[6]=a*m+o*S+h*w,r[1]=l*g+c*x+u*L,r[4]=l*p+c*v+u*b,r[7]=l*m+c*S+u*w,r[2]=d*g+f*x+_*L,r[5]=d*p+f*v+_*b,r[8]=d*m+f*S+_*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8];return e*a*c-e*o*l-i*r*c+i*o*h+s*r*l-s*a*h}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8],u=c*a-o*l,d=o*h-c*r,f=l*r-a*h,_=e*u+i*d+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=u*g,t[1]=(s*l-c*i)*g,t[2]=(o*i-s*a)*g,t[3]=d*g,t[4]=(c*e-s*h)*g,t[5]=(s*r-o*e)*g,t[6]=f*g,t[7]=(i*h-l*e)*g,t[8]=(a*e-i*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const h=Math.cos(r),l=Math.sin(r);return this.set(i*h,i*l,-i*(h*a+l*o)+a+t,-s*l,s*h,-s*(-l*a+h*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ea.makeScale(t,e)),this}rotate(t){return this.premultiply(Ea.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ea.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ea=new Ot;function Cc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function $r(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Jf(){const n=$r("canvas");return n.style.display="block",n}const zh={};function Ss(n){n in zh||(zh[n]=!0,console.warn(n))}function Qf(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const kh=new Ot().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Hh=new Ot().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ls={[Kn]:{transfer:Wr,primaries:Xr,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[cn]:{transfer:te,primaries:Xr,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[fa]:{transfer:Wr,primaries:qr,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(Hh),fromReference:n=>n.applyMatrix3(kh)},[ah]:{transfer:te,primaries:qr,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(Hh),fromReference:n=>n.applyMatrix3(kh).convertLinearToSRGB()}},td=new Set([Kn,fa]),$t={enabled:!0,_workingColorSpace:Kn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!td.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=ls[t].toReference,s=ls[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return ls[n].primaries},getTransfer:function(n){return n===kn?Wr:ls[n].transfer},getLuminanceCoefficients:function(n,t=this._workingColorSpace){return n.fromArray(ls[t].luminanceCoefficients)}};function ji(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ta(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Si;class ed{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Si===void 0&&(Si=$r("canvas")),Si.width=t.width,Si.height=t.height;const i=Si.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Si}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=$r("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ji(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ji(e[i]/255)*255):e[i]=ji(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let nd=0;class Lc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=Mi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ba(s[a].image)):r.push(ba(s[a]))}else r=ba(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function ba(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ed.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let id=0;class Ne extends vi{constructor(t=Ne.DEFAULT_IMAGE,e=Ne.DEFAULT_MAPPING,i=li,s=li,r=Ke,a=ci,o=fn,h=Cn,l=Ne.DEFAULT_ANISOTROPY,c=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=Mi(),this.name="",this.source=new Lc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=h,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==vc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ho:t.x=t.x-Math.floor(t.x);break;case li:t.x=t.x<0?0:1;break;case lo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ho:t.y=t.y-Math.floor(t.y);break;case li:t.y=t.y<0?0:1;break;case lo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=vc;Ne.DEFAULT_ANISOTROPY=1;class ye{constructor(t=0,e=0,i=0,s=1){ye.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const h=t.elements,l=h[0],c=h[4],u=h[8],d=h[1],f=h[5],_=h[9],g=h[2],p=h[6],m=h[10];if(Math.abs(c-d)<.01&&Math.abs(u-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(c+d)<.1&&Math.abs(u+g)<.1&&Math.abs(_+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,S=(f+1)/2,L=(m+1)/2,b=(c+d)/4,w=(u+g)/4,C=(_+p)/4;return v>S&&v>L?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=b/i,r=w/i):S>L?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=b/s,r=C/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=w/r,s=C/r),this.set(i,s,r,e),this}let x=Math.sqrt((p-_)*(p-_)+(u-g)*(u-g)+(d-c)*(d-c));return Math.abs(x)<.001&&(x=1),this.x=(p-_)/x,this.y=(u-g)/x,this.z=(d-c)/x,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sd extends vi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ye(0,0,t,e),this.scissorTest=!1,this.viewport=new ye(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ke,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Ne(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Lc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class di extends sd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Ic extends Ne{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class rd extends Ne{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pi{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let h=i[s+0],l=i[s+1],c=i[s+2],u=i[s+3];const d=r[a+0],f=r[a+1],_=r[a+2],g=r[a+3];if(o===0){t[e+0]=h,t[e+1]=l,t[e+2]=c,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=_,t[e+3]=g;return}if(u!==g||h!==d||l!==f||c!==_){let p=1-o;const m=h*d+l*f+c*_+u*g,x=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const L=Math.sqrt(v),b=Math.atan2(L,m*x);p=Math.sin(p*b)/L,o=Math.sin(o*b)/L}const S=o*x;if(h=h*p+d*S,l=l*p+f*S,c=c*p+_*S,u=u*p+g*S,p===1-o){const L=1/Math.sqrt(h*h+l*l+c*c+u*u);h*=L,l*=L,c*=L,u*=L}}t[e]=h,t[e+1]=l,t[e+2]=c,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],h=i[s+1],l=i[s+2],c=i[s+3],u=r[a],d=r[a+1],f=r[a+2],_=r[a+3];return t[e]=o*_+c*u+h*f-l*d,t[e+1]=h*_+c*d+l*u-o*f,t[e+2]=l*_+c*f+o*d-h*u,t[e+3]=c*_-o*u-h*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,h=Math.sin,l=o(i/2),c=o(s/2),u=o(r/2),d=h(i/2),f=h(s/2),_=h(r/2);switch(a){case"XYZ":this._x=d*c*u+l*f*_,this._y=l*f*u-d*c*_,this._z=l*c*_+d*f*u,this._w=l*c*u-d*f*_;break;case"YXZ":this._x=d*c*u+l*f*_,this._y=l*f*u-d*c*_,this._z=l*c*_-d*f*u,this._w=l*c*u+d*f*_;break;case"ZXY":this._x=d*c*u-l*f*_,this._y=l*f*u+d*c*_,this._z=l*c*_+d*f*u,this._w=l*c*u-d*f*_;break;case"ZYX":this._x=d*c*u-l*f*_,this._y=l*f*u+d*c*_,this._z=l*c*_-d*f*u,this._w=l*c*u+d*f*_;break;case"YZX":this._x=d*c*u+l*f*_,this._y=l*f*u+d*c*_,this._z=l*c*_-d*f*u,this._w=l*c*u-d*f*_;break;case"XZY":this._x=d*c*u-l*f*_,this._y=l*f*u-d*c*_,this._z=l*c*_+d*f*u,this._w=l*c*u+d*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],h=e[9],l=e[2],c=e[6],u=e[10],d=i+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(c-h)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(i>o&&i>u){const f=2*Math.sqrt(1+i-o-u);this._w=(c-h)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-i-u);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(h+c)/f}else{const f=2*Math.sqrt(1+u-i-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(h+c)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(xe(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,h=e._y,l=e._z,c=e._w;return this._x=i*c+a*o+s*l-r*h,this._y=s*c+a*h+r*o-i*l,this._z=r*c+a*l+i*h-s*o,this._w=a*c-i*o-s*h-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const h=1-o*o;if(h<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(h),c=Math.atan2(l,o),u=Math.sin((1-e)*c)/l,d=Math.sin(e*c)/l;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,i=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Vh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Vh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,h=t.w,l=2*(a*s-o*i),c=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+h*l+a*u-o*c,this.y=i+h*c+o*l-r*u,this.z=s+h*u+r*c-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,h=e.z;return this.x=s*h-r*o,this.y=r*a-i*h,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return wa.copy(this).projectOnVector(t),this.sub(wa)}reflect(t){return this.sub(wa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(xe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wa=new D,Vh=new pi;class Hs{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,on):on.fromBufferAttribute(r,a),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),tr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),tr.copy(i.boundingBox)),tr.applyMatrix4(t.matrixWorld),this.union(tr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(cs),er.subVectors(this.max,cs),Ei.subVectors(t.a,cs),Ti.subVectors(t.b,cs),bi.subVectors(t.c,cs),Dn.subVectors(Ti,Ei),Un.subVectors(bi,Ti),Jn.subVectors(Ei,bi);let e=[0,-Dn.z,Dn.y,0,-Un.z,Un.y,0,-Jn.z,Jn.y,Dn.z,0,-Dn.x,Un.z,0,-Un.x,Jn.z,0,-Jn.x,-Dn.y,Dn.x,0,-Un.y,Un.x,0,-Jn.y,Jn.x,0];return!Aa(e,Ei,Ti,bi,er)||(e=[1,0,0,0,1,0,0,0,1],!Aa(e,Ei,Ti,bi,er))?!1:(nr.crossVectors(Dn,Un),e=[nr.x,nr.y,nr.z],Aa(e,Ei,Ti,bi,er))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const yn=[new D,new D,new D,new D,new D,new D,new D,new D],on=new D,tr=new Hs,Ei=new D,Ti=new D,bi=new D,Dn=new D,Un=new D,Jn=new D,cs=new D,er=new D,nr=new D,Qn=new D;function Aa(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Qn.fromArray(n,r);const o=s.x*Math.abs(Qn.x)+s.y*Math.abs(Qn.y)+s.z*Math.abs(Qn.z),h=t.dot(Qn),l=e.dot(Qn),c=i.dot(Qn);if(Math.max(-Math.max(h,l,c),Math.min(h,l,c))>o)return!1}return!0}const ad=new Hs,us=new D,Pa=new D;class Vs{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):ad.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;us.subVectors(t,this.center);const e=us.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(us,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Pa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(us.copy(t.center).add(Pa)),this.expandByPoint(us.copy(t.center).sub(Pa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Sn=new D,Ra=new D,ir=new D,On=new D,Ca=new D,sr=new D,La=new D;class da{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Sn.copy(this.origin).addScaledVector(this.direction,e),Sn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Ra.copy(t).add(e).multiplyScalar(.5),ir.copy(e).sub(t).normalize(),On.copy(this.origin).sub(Ra);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ir),o=On.dot(this.direction),h=-On.dot(ir),l=On.lengthSq(),c=Math.abs(1-a*a);let u,d,f,_;if(c>0)if(u=a*h-o,d=a*o-h,_=r*c,u>=0)if(d>=-_)if(d<=_){const g=1/c;u*=g,d*=g,f=u*(u+a*d+2*o)+d*(a*u+d+2*h)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*h)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*h)+l;else d<=-_?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-h),r),f=-u*u+d*(d+2*h)+l):d<=_?(u=0,d=Math.min(Math.max(-r,-h),r),f=d*(d+2*h)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-h),r),f=-u*u+d*(d+2*h)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*h)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ra).addScaledVector(ir,d),f}intersectSphere(t,e){Sn.subVectors(t.center,this.origin);const i=Sn.dot(this.direction),s=Sn.dot(Sn)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,h=i+a;return h<0?null:o<0?this.at(h,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,h;const l=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),c>=0?(r=(t.min.y-d.y)*c,a=(t.max.y-d.y)*c):(r=(t.max.y-d.y)*c,a=(t.min.y-d.y)*c),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,h=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,h=(t.min.z-d.z)*u),i>h||o>s)||((o>i||i!==i)&&(i=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Sn)!==null}intersectTriangle(t,e,i,s,r){Ca.subVectors(e,t),sr.subVectors(i,t),La.crossVectors(Ca,sr);let a=this.direction.dot(La),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;On.subVectors(this.origin,t);const h=o*this.direction.dot(sr.crossVectors(On,sr));if(h<0)return null;const l=o*this.direction.dot(Ca.cross(On));if(l<0||h+l>a)return null;const c=-o*On.dot(La);return c<0?null:this.at(c/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,i,s,r,a,o,h,l,c,u,d,f,_,g,p){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,h,l,c,u,d,f,_,g,p)}set(t,e,i,s,r,a,o,h,l,c,u,d,f,_,g,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=h,m[2]=l,m[6]=c,m[10]=u,m[14]=d,m[3]=f,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/wi.setFromMatrixColumn(t,0).length(),r=1/wi.setFromMatrixColumn(t,1).length(),a=1/wi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),h=Math.cos(s),l=Math.sin(s),c=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*c,f=a*u,_=o*c,g=o*u;e[0]=h*c,e[4]=-h*u,e[8]=l,e[1]=f+_*l,e[5]=d-g*l,e[9]=-o*h,e[2]=g-d*l,e[6]=_+f*l,e[10]=a*h}else if(t.order==="YXZ"){const d=h*c,f=h*u,_=l*c,g=l*u;e[0]=d+g*o,e[4]=_*o-f,e[8]=a*l,e[1]=a*u,e[5]=a*c,e[9]=-o,e[2]=f*o-_,e[6]=g+d*o,e[10]=a*h}else if(t.order==="ZXY"){const d=h*c,f=h*u,_=l*c,g=l*u;e[0]=d-g*o,e[4]=-a*u,e[8]=_+f*o,e[1]=f+_*o,e[5]=a*c,e[9]=g-d*o,e[2]=-a*l,e[6]=o,e[10]=a*h}else if(t.order==="ZYX"){const d=a*c,f=a*u,_=o*c,g=o*u;e[0]=h*c,e[4]=_*l-f,e[8]=d*l+g,e[1]=h*u,e[5]=g*l+d,e[9]=f*l-_,e[2]=-l,e[6]=o*h,e[10]=a*h}else if(t.order==="YZX"){const d=a*h,f=a*l,_=o*h,g=o*l;e[0]=h*c,e[4]=g-d*u,e[8]=_*u+f,e[1]=u,e[5]=a*c,e[9]=-o*c,e[2]=-l*c,e[6]=f*u+_,e[10]=d-g*u}else if(t.order==="XZY"){const d=a*h,f=a*l,_=o*h,g=o*l;e[0]=h*c,e[4]=-u,e[8]=l*c,e[1]=d*u+g,e[5]=a*c,e[9]=f*u-_,e[2]=_*u-f,e[6]=o*c,e[10]=g*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(od,t,hd)}lookAt(t,e,i){const s=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),Fn.crossVectors(i,qe),Fn.lengthSq()===0&&(Math.abs(i.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),Fn.crossVectors(i,qe)),Fn.normalize(),rr.crossVectors(qe,Fn),s[0]=Fn.x,s[4]=rr.x,s[8]=qe.x,s[1]=Fn.y,s[5]=rr.y,s[9]=qe.y,s[2]=Fn.z,s[6]=rr.z,s[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],h=i[8],l=i[12],c=i[1],u=i[5],d=i[9],f=i[13],_=i[2],g=i[6],p=i[10],m=i[14],x=i[3],v=i[7],S=i[11],L=i[15],b=s[0],w=s[4],C=s[8],E=s[12],y=s[1],P=s[5],k=s[9],B=s[13],W=s[2],Z=s[6],V=s[10],Q=s[14],H=s[3],ut=s[7],mt=s[11],xt=s[15];return r[0]=a*b+o*y+h*W+l*H,r[4]=a*w+o*P+h*Z+l*ut,r[8]=a*C+o*k+h*V+l*mt,r[12]=a*E+o*B+h*Q+l*xt,r[1]=c*b+u*y+d*W+f*H,r[5]=c*w+u*P+d*Z+f*ut,r[9]=c*C+u*k+d*V+f*mt,r[13]=c*E+u*B+d*Q+f*xt,r[2]=_*b+g*y+p*W+m*H,r[6]=_*w+g*P+p*Z+m*ut,r[10]=_*C+g*k+p*V+m*mt,r[14]=_*E+g*B+p*Q+m*xt,r[3]=x*b+v*y+S*W+L*H,r[7]=x*w+v*P+S*Z+L*ut,r[11]=x*C+v*k+S*V+L*mt,r[15]=x*E+v*B+S*Q+L*xt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],h=t[9],l=t[13],c=t[2],u=t[6],d=t[10],f=t[14],_=t[3],g=t[7],p=t[11],m=t[15];return _*(+r*h*u-s*l*u-r*o*d+i*l*d+s*o*f-i*h*f)+g*(+e*h*f-e*l*d+r*a*d-s*a*f+s*l*c-r*h*c)+p*(+e*l*u-e*o*f-r*a*u+i*a*f+r*o*c-i*l*c)+m*(-s*o*c-e*h*u+e*o*d+s*a*u-i*a*d+i*h*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8],u=t[9],d=t[10],f=t[11],_=t[12],g=t[13],p=t[14],m=t[15],x=u*p*l-g*d*l+g*h*f-o*p*f-u*h*m+o*d*m,v=_*d*l-c*p*l-_*h*f+a*p*f+c*h*m-a*d*m,S=c*g*l-_*u*l+_*o*f-a*g*f-c*o*m+a*u*m,L=_*u*h-c*g*h-_*o*d+a*g*d+c*o*p-a*u*p,b=e*x+i*v+s*S+r*L;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/b;return t[0]=x*w,t[1]=(g*d*r-u*p*r-g*s*f+i*p*f+u*s*m-i*d*m)*w,t[2]=(o*p*r-g*h*r+g*s*l-i*p*l-o*s*m+i*h*m)*w,t[3]=(u*h*r-o*d*r-u*s*l+i*d*l+o*s*f-i*h*f)*w,t[4]=v*w,t[5]=(c*p*r-_*d*r+_*s*f-e*p*f-c*s*m+e*d*m)*w,t[6]=(_*h*r-a*p*r-_*s*l+e*p*l+a*s*m-e*h*m)*w,t[7]=(a*d*r-c*h*r+c*s*l-e*d*l-a*s*f+e*h*f)*w,t[8]=S*w,t[9]=(_*u*r-c*g*r-_*i*f+e*g*f+c*i*m-e*u*m)*w,t[10]=(a*g*r-_*o*r+_*i*l-e*g*l-a*i*m+e*o*m)*w,t[11]=(c*o*r-a*u*r-c*i*l+e*u*l+a*i*f-e*o*f)*w,t[12]=L*w,t[13]=(c*g*s-_*u*s+_*i*d-e*g*d-c*i*p+e*u*p)*w,t[14]=(_*o*s-a*g*s-_*i*h+e*g*h+a*i*p-e*o*p)*w,t[15]=(a*u*s-c*o*s+c*i*h-e*u*h-a*i*d+e*o*d)*w,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,h=t.z,l=r*a,c=r*o;return this.set(l*a+i,l*o-s*h,l*h+s*o,0,l*o+s*h,c*o+i,c*h-s*a,0,l*h-s*o,c*h+s*a,r*h*h+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,h=e._w,l=r+r,c=a+a,u=o+o,d=r*l,f=r*c,_=r*u,g=a*c,p=a*u,m=o*u,x=h*l,v=h*c,S=h*u,L=i.x,b=i.y,w=i.z;return s[0]=(1-(g+m))*L,s[1]=(f+S)*L,s[2]=(_-v)*L,s[3]=0,s[4]=(f-S)*b,s[5]=(1-(d+m))*b,s[6]=(p+x)*b,s[7]=0,s[8]=(_+v)*w,s[9]=(p-x)*w,s[10]=(1-(d+g))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=wi.set(s[0],s[1],s[2]).length();const a=wi.set(s[4],s[5],s[6]).length(),o=wi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],hn.copy(this);const l=1/r,c=1/a,u=1/o;return hn.elements[0]*=l,hn.elements[1]*=l,hn.elements[2]*=l,hn.elements[4]*=c,hn.elements[5]*=c,hn.elements[6]*=c,hn.elements[8]*=u,hn.elements[9]*=u,hn.elements[10]*=u,e.setFromRotationMatrix(hn),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=Pn){const h=this.elements,l=2*r/(e-t),c=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s);let f,_;if(o===Pn)f=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Yr)f=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return h[0]=l,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=c,h[9]=d,h[13]=0,h[2]=0,h[6]=0,h[10]=f,h[14]=_,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Pn){const h=this.elements,l=1/(e-t),c=1/(i-s),u=1/(a-r),d=(e+t)*l,f=(i+s)*c;let _,g;if(o===Pn)_=(a+r)*u,g=-2*u;else if(o===Yr)_=r*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return h[0]=2*l,h[4]=0,h[8]=0,h[12]=-d,h[1]=0,h[5]=2*c,h[9]=0,h[13]=-f,h[2]=0,h[6]=0,h[10]=g,h[14]=-_,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const wi=new D,hn=new he,od=new D(0,0,0),hd=new D(1,1,1),Fn=new D,rr=new D,qe=new D,Wh=new he,Xh=new pi;class Ln{constructor(t=0,e=0,i=0,s=Ln.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],h=s[1],l=s[5],c=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-xe(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(h,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(xe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-xe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(xe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Wh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Wh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Xh.setFromEuler(this),this.setFromQuaternion(Xh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ln.DEFAULT_ORDER="XYZ";class Nc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ld=0;const qh=new D,Ai=new pi,En=new he,ar=new D,fs=new D,cd=new D,ud=new pi,Yh=new D(1,0,0),$h=new D(0,1,0),Kh=new D(0,0,1),jh={type:"added"},fd={type:"removed"},Pi={type:"childadded",child:null},Ia={type:"childremoved",child:null};class De extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=Mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new D,e=new Ln,i=new pi,s=new D(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new Ot}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ai.setFromAxisAngle(t,e),this.quaternion.multiply(Ai),this}rotateOnWorldAxis(t,e){return Ai.setFromAxisAngle(t,e),this.quaternion.premultiply(Ai),this}rotateX(t){return this.rotateOnAxis(Yh,t)}rotateY(t){return this.rotateOnAxis($h,t)}rotateZ(t){return this.rotateOnAxis(Kh,t)}translateOnAxis(t,e){return qh.copy(t).applyQuaternion(this.quaternion),this.position.add(qh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Yh,t)}translateY(t){return this.translateOnAxis($h,t)}translateZ(t){return this.translateOnAxis(Kh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ar.copy(t):ar.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),fs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(fs,ar,this.up):En.lookAt(ar,fs,this.up),this.quaternion.setFromRotationMatrix(En),s&&(En.extractRotation(s.matrixWorld),Ai.setFromRotationMatrix(En),this.quaternion.premultiply(Ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(jh),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(fd),Ia.child=t,this.dispatchEvent(Ia),Ia.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),En.multiply(t.parent.matrixWorld)),t.applyMatrix4(En),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(jh),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fs,t,cd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fs,ud,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let l=0,c=h.length;l<c;l++){const u=h[l];r(t.shapes,u)}else r(t.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,l=this.material.length;h<l;h++)o.push(r(t.materials,this.material[h]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(t.animations,h))}}if(e){const o=a(t.geometries),h=a(t.materials),l=a(t.textures),c=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),_=a(t.nodes);o.length>0&&(i.geometries=o),h.length>0&&(i.materials=h),l.length>0&&(i.textures=l),c.length>0&&(i.images=c),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const h=[];for(const l in o){const c=o[l];delete c.metadata,h.push(c)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}De.DEFAULT_UP=new D(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new D,Tn=new D,Na=new D,bn=new D,Ri=new D,Ci=new D,Zh=new D,Da=new D,Ua=new D,Oa=new D;class _n{constructor(t=new D,e=new D,i=new D){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),ln.subVectors(t,e),s.cross(ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){ln.subVectors(s,e),Tn.subVectors(i,e),Na.subVectors(t,e);const a=ln.dot(ln),o=ln.dot(Tn),h=ln.dot(Na),l=Tn.dot(Tn),c=Tn.dot(Na),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*h-o*c)*d,_=(a*c-o*h)*d;return r.set(1-f-_,_,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(t,e,i,s,r,a,o,h){return this.getBarycoord(t,e,i,s,bn)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,bn.x),h.addScaledVector(a,bn.y),h.addScaledVector(o,bn.z),h)}static isFrontFacing(t,e,i,s){return ln.subVectors(i,e),Tn.subVectors(t,e),ln.cross(Tn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ln.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),ln.cross(Tn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return _n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return _n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return _n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return _n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return _n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;Ri.subVectors(s,i),Ci.subVectors(r,i),Da.subVectors(t,i);const h=Ri.dot(Da),l=Ci.dot(Da);if(h<=0&&l<=0)return e.copy(i);Ua.subVectors(t,s);const c=Ri.dot(Ua),u=Ci.dot(Ua);if(c>=0&&u<=c)return e.copy(s);const d=h*u-c*l;if(d<=0&&h>=0&&c<=0)return a=h/(h-c),e.copy(i).addScaledVector(Ri,a);Oa.subVectors(t,r);const f=Ri.dot(Oa),_=Ci.dot(Oa);if(_>=0&&f<=_)return e.copy(r);const g=f*l-h*_;if(g<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(i).addScaledVector(Ci,o);const p=c*_-f*u;if(p<=0&&u-c>=0&&f-_>=0)return Zh.subVectors(r,s),o=(u-c)/(u-c+(f-_)),e.copy(s).addScaledVector(Zh,o);const m=1/(p+g+d);return a=g*m,o=d*m,e.copy(i).addScaledVector(Ri,a).addScaledVector(Ci,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Dc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},or={h:0,s:0,l:0};function Fa(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Kt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=cn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=$t.workingColorSpace){if(t=oh(t,1),e=xe(e,0,1),i=xe(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Fa(a,r,t+1/3),this.g=Fa(a,r,t),this.b=Fa(a,r,t-1/3)}return $t.toWorkingColorSpace(this,s),this}setStyle(t,e=cn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=cn){const i=Dc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ji(t.r),this.g=ji(t.g),this.b=ji(t.b),this}copyLinearToSRGB(t){return this.r=Ta(t.r),this.g=Ta(t.g),this.b=Ta(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=cn){return $t.fromWorkingColorSpace(we.copy(this),t),Math.round(xe(we.r*255,0,255))*65536+Math.round(xe(we.g*255,0,255))*256+Math.round(xe(we.b*255,0,255))}getHexString(t=cn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(we.copy(this),e);const i=we.r,s=we.g,r=we.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let h,l;const c=(o+a)/2;if(o===a)h=0,l=0;else{const u=a-o;switch(l=c<=.5?u/(a+o):u/(2-a-o),a){case i:h=(s-r)/u+(s<r?6:0);break;case s:h=(r-i)/u+2;break;case r:h=(i-s)/u+4;break}h/=6}return t.h=h,t.s=l,t.l=c,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(we.copy(this),e),t.r=we.r,t.g=we.g,t.b=we.b,t}getStyle(t=cn){$t.fromWorkingColorSpace(we.copy(this),t);const e=we.r,i=we.g,s=we.b;return t!==cn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Gn),this.setHSL(Gn.h+t,Gn.s+e,Gn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Gn),t.getHSL(or);const i=ys(Gn.h,or.h,e),s=ys(Gn.s,or.s,e),r=ys(Gn.l,or.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const we=new Kt;Kt.NAMES=Dc;let dd=0;class as extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Mi(),this.name="",this.type="Material",this.blending=$i,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=so,this.blendDst=ro,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=Vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yi,this.stencilZFail=yi,this.stencilZPass=yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(i.blending=this.blending),this.side!==Xn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==so&&(i.blendSrc=this.blendSrc),this.blendDst!==ro&&(i.blendDst=this.blendDst),this.blendEquation!==oi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==yi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==yi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==yi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class pa extends as{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=gc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pe=new D,hr=new ct;class Ze{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Fh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Ss("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)hr.fromBufferAttribute(this,e),hr.applyMatrix3(t),this.setXY(e,hr.x,hr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Gi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Re(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Gi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Gi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Gi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Gi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),s=Re(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),s=Re(s,this.array),r=Re(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Fh&&(t.usage=this.usage),t}}class Uc extends Ze{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Oc extends Ze{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class ke extends Ze{constructor(t,e,i){super(new Float32Array(t),e,i)}}let pd=0;const Qe=new he,Ga=new De,Li=new D,Ye=new Hs,ds=new Hs,ve=new D;class He extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=Mi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Cc(t)?Oc:Uc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ot().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,e,i){return Qe.makeTranslation(t,e,i),this.applyMatrix4(Qe),this}scale(t,e,i){return Qe.makeScale(t,e,i),this.applyMatrix4(Qe),this}lookAt(t){return Ga.lookAt(t),Ga.updateMatrix(),this.applyMatrix4(Ga.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Li).negate(),this.translate(Li.x,Li.y,Li.z),this}setFromPoints(t){const e=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ke(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(ve.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(ve),ve.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(ve)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const i=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ds.setFromBufferAttribute(o),this.morphTargetsRelative?(ve.addVectors(Ye.min,ds.min),Ye.expandByPoint(ve),ve.addVectors(Ye.max,ds.max),Ye.expandByPoint(ve)):(Ye.expandByPoint(ds.min),Ye.expandByPoint(ds.max))}Ye.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)ve.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(ve));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],h=this.morphTargetsRelative;for(let l=0,c=o.count;l<c;l++)ve.fromBufferAttribute(o,l),h&&(Li.fromBufferAttribute(t,l),ve.add(Li)),s=Math.max(s,i.distanceToSquared(ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ze(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],h=[];for(let C=0;C<i.count;C++)o[C]=new D,h[C]=new D;const l=new D,c=new D,u=new D,d=new ct,f=new ct,_=new ct,g=new D,p=new D;function m(C,E,y){l.fromBufferAttribute(i,C),c.fromBufferAttribute(i,E),u.fromBufferAttribute(i,y),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,E),_.fromBufferAttribute(r,y),c.sub(l),u.sub(l),f.sub(d),_.sub(d);const P=1/(f.x*_.y-_.x*f.y);isFinite(P)&&(g.copy(c).multiplyScalar(_.y).addScaledVector(u,-f.y).multiplyScalar(P),p.copy(u).multiplyScalar(f.x).addScaledVector(c,-_.x).multiplyScalar(P),o[C].add(g),o[E].add(g),o[y].add(g),h[C].add(p),h[E].add(p),h[y].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let C=0,E=x.length;C<E;++C){const y=x[C],P=y.start,k=y.count;for(let B=P,W=P+k;B<W;B+=3)m(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const v=new D,S=new D,L=new D,b=new D;function w(C){L.fromBufferAttribute(s,C),b.copy(L);const E=o[C];v.copy(E),v.sub(L.multiplyScalar(L.dot(E))).normalize(),S.crossVectors(b,E);const P=S.dot(h[C])<0?-1:1;a.setXYZW(C,v.x,v.y,v.z,P)}for(let C=0,E=x.length;C<E;++C){const y=x[C],P=y.start,k=y.count;for(let B=P,W=P+k;B<W;B+=3)w(t.getX(B+0)),w(t.getX(B+1)),w(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ze(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const s=new D,r=new D,a=new D,o=new D,h=new D,l=new D,c=new D,u=new D;if(t)for(let d=0,f=t.count;d<f;d+=3){const _=t.getX(d+0),g=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,p),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),o.fromBufferAttribute(i,_),h.fromBufferAttribute(i,g),l.fromBufferAttribute(i,p),o.add(c),h.add(c),l.add(c),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,h.x,h.y,h.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),i.setXYZ(d+0,c.x,c.y,c.z),i.setXYZ(d+1,c.x,c.y,c.z),i.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ve.fromBufferAttribute(t,e),ve.normalize(),t.setXYZ(e,ve.x,ve.y,ve.z)}toNonIndexed(){function t(o,h){const l=o.array,c=o.itemSize,u=o.normalized,d=new l.constructor(h.length*c);let f=0,_=0;for(let g=0,p=h.length;g<p;g++){o.isInterleavedBufferAttribute?f=h[g]*o.data.stride+o.offset:f=h[g]*c;for(let m=0;m<c;m++)d[_++]=l[f++]}return new Ze(d,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,i=this.index.array,s=this.attributes;for(const o in s){const h=s[o],l=t(h,i);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const h=[],l=r[o];for(let c=0,u=l.length;c<u;c++){const d=l[c],f=t(d,i);h.push(f)}e.morphAttributes[o]=h}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const l in h)h[l]!==void 0&&(t[l]=h[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const h in i){const l=i[h];t.data.attributes[h]=l.toJSON(t.data)}const s={};let r=!1;for(const h in this.morphAttributes){const l=this.morphAttributes[h],c=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];c.push(f.toJSON(t.data))}c.length>0&&(s[h]=c,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const l in s){const c=s[l];this.setAttribute(l,c.clone(e))}const r=t.morphAttributes;for(const l in r){const c=[],u=r[l];for(let d=0,f=u.length;d<f;d++)c.push(u[d].clone(e));this.morphAttributes[l]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,c=a.length;l<c;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jh=new he,ti=new da,lr=new Vs,Qh=new D,Ii=new D,Ni=new D,Di=new D,Ba=new D,cr=new D,ur=new ct,fr=new ct,dr=new ct,tl=new D,el=new D,nl=new D,pr=new D,mr=new D;class je extends De{constructor(t=new He,e=new pa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){cr.set(0,0,0);for(let h=0,l=r.length;h<l;h++){const c=o[h],u=r[h];c!==0&&(Ba.fromBufferAttribute(u,t),a?cr.addScaledVector(Ba,c):cr.addScaledVector(Ba.sub(e),c))}e.add(cr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),lr.copy(i.boundingSphere),lr.applyMatrix4(r),ti.copy(t.ray).recast(t.near),!(lr.containsPoint(ti.origin)===!1&&(ti.intersectSphere(lr,Qh)===null||ti.origin.distanceToSquared(Qh)>(t.far-t.near)**2))&&(Jh.copy(r).invert(),ti.copy(t.ray).applyMatrix4(Jh),!(i.boundingBox!==null&&ti.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ti)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],m=a[p.materialIndex],x=Math.max(p.start,f.start),v=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let S=x,L=v;S<L;S+=3){const b=o.getX(S),w=o.getX(S+1),C=o.getX(S+2);s=_r(this,m,t,i,l,c,u,b,w,C),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const x=o.getX(p),v=o.getX(p+1),S=o.getX(p+2);s=_r(this,a,t,i,l,c,u,x,v,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],m=a[p.materialIndex],x=Math.max(p.start,f.start),v=Math.min(h.count,Math.min(p.start+p.count,f.start+f.count));for(let S=x,L=v;S<L;S+=3){const b=S,w=S+1,C=S+2;s=_r(this,m,t,i,l,c,u,b,w,C),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(h.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const x=p,v=p+1,S=p+2;s=_r(this,a,t,i,l,c,u,x,v,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function md(n,t,e,i,s,r,a,o){let h;if(t.side===ze?h=i.intersectTriangle(a,r,s,!0,o):h=i.intersectTriangle(s,r,a,t.side===Xn,o),h===null)return null;mr.copy(o),mr.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(mr);return l<e.near||l>e.far?null:{distance:l,point:mr.clone(),object:n}}function _r(n,t,e,i,s,r,a,o,h,l){n.getVertexPosition(o,Ii),n.getVertexPosition(h,Ni),n.getVertexPosition(l,Di);const c=md(n,t,e,i,Ii,Ni,Di,pr);if(c){s&&(ur.fromBufferAttribute(s,o),fr.fromBufferAttribute(s,h),dr.fromBufferAttribute(s,l),c.uv=_n.getInterpolation(pr,Ii,Ni,Di,ur,fr,dr,new ct)),r&&(ur.fromBufferAttribute(r,o),fr.fromBufferAttribute(r,h),dr.fromBufferAttribute(r,l),c.uv1=_n.getInterpolation(pr,Ii,Ni,Di,ur,fr,dr,new ct)),a&&(tl.fromBufferAttribute(a,o),el.fromBufferAttribute(a,h),nl.fromBufferAttribute(a,l),c.normal=_n.getInterpolation(pr,Ii,Ni,Di,tl,el,nl,new D),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const u={a:o,b:h,c:l,normal:new D,materialIndex:0};_n.getNormal(Ii,Ni,Di,u.normal),c.face=u}return c}class Ws extends He{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],l=[],c=[],u=[];let d=0,f=0;_("z","y","x",-1,-1,i,e,t,a,r,0),_("z","y","x",1,-1,i,e,-t,a,r,1),_("x","z","y",1,1,t,i,e,s,a,2),_("x","z","y",1,-1,t,i,-e,s,a,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(h),this.setAttribute("position",new ke(l,3)),this.setAttribute("normal",new ke(c,3)),this.setAttribute("uv",new ke(u,2));function _(g,p,m,x,v,S,L,b,w,C,E){const y=S/w,P=L/C,k=S/2,B=L/2,W=b/2,Z=w+1,V=C+1;let Q=0,H=0;const ut=new D;for(let mt=0;mt<V;mt++){const xt=mt*P-B;for(let Bt=0;Bt<Z;Bt++){const Zt=Bt*y-k;ut[g]=Zt*x,ut[p]=xt*v,ut[m]=W,l.push(ut.x,ut.y,ut.z),ut[g]=0,ut[p]=0,ut[m]=b>0?1:-1,c.push(ut.x,ut.y,ut.z),u.push(Bt/w),u.push(1-mt/C),Q+=1}}for(let mt=0;mt<C;mt++)for(let xt=0;xt<w;xt++){const Bt=d+xt+Z*mt,Zt=d+xt+Z*(mt+1),X=d+(xt+1)+Z*(mt+1),tt=d+(xt+1)+Z*mt;h.push(Bt,Zt,tt),h.push(Zt,X,tt),H+=6}o.addGroup(f,H,E),f+=H,d+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ws(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ss(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ce(n){const t={};for(let e=0;e<n.length;e++){const i=ss(n[e]);for(const s in i)t[s]=i[s]}return t}function _d(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Fc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const gd={clone:ss,merge:Ce};var vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Md=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qn extends as{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vd,this.fragmentShader=Md,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ss(t.uniforms),this.uniformsGroups=_d(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Gc extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=Pn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new D,il=new ct,sl=new ct;class nn extends Gc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Is*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(xs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Is*2*Math.atan(Math.tan(xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Bn.x,Bn.y).multiplyScalar(-t/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Bn.x,Bn.y).multiplyScalar(-t/Bn.z)}getViewSize(t,e){return this.getViewBounds(t,il,sl),e.subVectors(sl,il)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(xs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/h,e-=a.offsetY*i/l,s*=a.width/h,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ui=-90,Oi=1;class xd extends De{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new nn(Ui,Oi,t,e);s.layers=this.layers,this.add(s);const r=new nn(Ui,Oi,t,e);r.layers=this.layers,this.add(r);const a=new nn(Ui,Oi,t,e);a.layers=this.layers,this.add(a);const o=new nn(Ui,Oi,t,e);o.layers=this.layers,this.add(o);const h=new nn(Ui,Oi,t,e);h.layers=this.layers,this.add(h);const l=new nn(Ui,Oi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,h]=e;for(const l of e)this.remove(l);if(t===Pn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(t===Yr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,l,c]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,h),t.setRenderTarget(i,4,s),t.render(e,l),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(e,c),t.setRenderTarget(u,d,f),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Bc extends Ne{constructor(t,e,i,s,r,a,o,h,l,c){t=t!==void 0?t:[],e=e!==void 0?e:ts,super(t,e,i,s,r,a,o,h,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class yd extends di{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Bc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ke}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ws(5,5,5),r=new qn({name:"CubemapFromEquirect",uniforms:ss(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ze,blending:Vn});r.uniforms.tEquirect.value=e;const a=new je(s,r),o=e.minFilter;return e.minFilter===ci&&(e.minFilter=Ke),new xd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}const za=new D,Sd=new D,Ed=new Ot;class zn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=za.subVectors(i,e).cross(Sd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(za),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Ed.getNormalMatrix(t),s=this.coplanarPoint(za).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new Vs,gr=new D;class zc{constructor(t=new zn,e=new zn,i=new zn,s=new zn,r=new zn,a=new zn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Pn){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],h=s[3],l=s[4],c=s[5],u=s[6],d=s[7],f=s[8],_=s[9],g=s[10],p=s[11],m=s[12],x=s[13],v=s[14],S=s[15];if(i[0].setComponents(h-r,d-l,p-f,S-m).normalize(),i[1].setComponents(h+r,d+l,p+f,S+m).normalize(),i[2].setComponents(h+a,d+c,p+_,S+x).normalize(),i[3].setComponents(h-a,d-c,p-_,S-x).normalize(),i[4].setComponents(h-o,d-u,p-g,S-v).normalize(),e===Pn)i[5].setComponents(h+o,d+u,p+g,S+v).normalize();else if(e===Yr)i[5].setComponents(o,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(t){return ei.center.set(0,0,0),ei.radius=.7071067811865476,ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(gr.x=s.normal.x>0?t.max.x:t.min.x,gr.y=s.normal.y>0?t.max.y:t.min.y,gr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(gr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function kc(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Td(n){const t=new WeakMap;function e(o,h){const l=o.array,c=o.usage,u=l.byteLength,d=n.createBuffer();n.bindBuffer(h,d),n.bufferData(h,l,c),o.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,h,l){const c=h.array,u=h._updateRange,d=h.updateRanges;if(n.bindBuffer(l,o),u.count===-1&&d.length===0&&n.bufferSubData(l,0,c),d.length!==0){for(let f=0,_=d.length;f<_;f++){const g=d[f];n.bufferSubData(l,g.start*c.BYTES_PER_ELEMENT,c,g.start,g.count)}h.clearUpdateRanges()}u.count!==-1&&(n.bufferSubData(l,u.offset*c.BYTES_PER_ELEMENT,c,u.offset,u.count),u.count=-1),h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=t.get(o);h&&(n.deleteBuffer(h.buffer),t.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,h));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,h),l.version=o.version}}return{get:s,remove:r,update:a}}class Xs extends He{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),h=Math.floor(s),l=o+1,c=h+1,u=t/o,d=e/h,f=[],_=[],g=[],p=[];for(let m=0;m<c;m++){const x=m*d-a;for(let v=0;v<l;v++){const S=v*u-r;_.push(S,-x,0),g.push(0,0,1),p.push(v/o),p.push(1-m/h)}}for(let m=0;m<h;m++)for(let x=0;x<o;x++){const v=x+l*m,S=x+l*(m+1),L=x+1+l*(m+1),b=x+1+l*m;f.push(v,S,b),f.push(S,L,b)}this.setIndex(f),this.setAttribute("position",new ke(_,3)),this.setAttribute("normal",new ke(g,3)),this.setAttribute("uv",new ke(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xs(t.width,t.height,t.widthSegments,t.heightSegments)}}var bd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ad=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ld=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Id=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Dd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ud=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Od=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Yd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,$d=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Kd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ep="gl_FragColor = linearToOutputTexel( gl_FragColor );",np=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ip=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,sp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,rp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ap=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,op=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,up=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,dp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_p=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Sp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ep=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Tp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ap=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ip=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Np=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Up=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Op=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,kp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Vp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Yp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$p=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,tm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,em=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,im=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,am=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,om=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,um=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_m=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Mm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Em=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Am=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Lm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Im=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Nm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Um=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Om=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,km=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Vm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ym=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Km=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,t0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,n0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,i0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ut={alphahash_fragment:bd,alphahash_pars_fragment:wd,alphamap_fragment:Ad,alphamap_pars_fragment:Pd,alphatest_fragment:Rd,alphatest_pars_fragment:Cd,aomap_fragment:Ld,aomap_pars_fragment:Id,batching_pars_vertex:Nd,batching_vertex:Dd,begin_vertex:Ud,beginnormal_vertex:Od,bsdfs:Fd,iridescence_fragment:Gd,bumpmap_pars_fragment:Bd,clipping_planes_fragment:zd,clipping_planes_pars_fragment:kd,clipping_planes_pars_vertex:Hd,clipping_planes_vertex:Vd,color_fragment:Wd,color_pars_fragment:Xd,color_pars_vertex:qd,color_vertex:Yd,common:$d,cube_uv_reflection_fragment:Kd,defaultnormal_vertex:jd,displacementmap_pars_vertex:Zd,displacementmap_vertex:Jd,emissivemap_fragment:Qd,emissivemap_pars_fragment:tp,colorspace_fragment:ep,colorspace_pars_fragment:np,envmap_fragment:ip,envmap_common_pars_fragment:sp,envmap_pars_fragment:rp,envmap_pars_vertex:ap,envmap_physical_pars_fragment:gp,envmap_vertex:op,fog_vertex:hp,fog_pars_vertex:lp,fog_fragment:cp,fog_pars_fragment:up,gradientmap_pars_fragment:fp,lightmap_pars_fragment:dp,lights_lambert_fragment:pp,lights_lambert_pars_fragment:mp,lights_pars_begin:_p,lights_toon_fragment:vp,lights_toon_pars_fragment:Mp,lights_phong_fragment:xp,lights_phong_pars_fragment:yp,lights_physical_fragment:Sp,lights_physical_pars_fragment:Ep,lights_fragment_begin:Tp,lights_fragment_maps:bp,lights_fragment_end:wp,logdepthbuf_fragment:Ap,logdepthbuf_pars_fragment:Pp,logdepthbuf_pars_vertex:Rp,logdepthbuf_vertex:Cp,map_fragment:Lp,map_pars_fragment:Ip,map_particle_fragment:Np,map_particle_pars_fragment:Dp,metalnessmap_fragment:Up,metalnessmap_pars_fragment:Op,morphinstance_vertex:Fp,morphcolor_vertex:Gp,morphnormal_vertex:Bp,morphtarget_pars_vertex:zp,morphtarget_vertex:kp,normal_fragment_begin:Hp,normal_fragment_maps:Vp,normal_pars_fragment:Wp,normal_pars_vertex:Xp,normal_vertex:qp,normalmap_pars_fragment:Yp,clearcoat_normal_fragment_begin:$p,clearcoat_normal_fragment_maps:Kp,clearcoat_pars_fragment:jp,iridescence_pars_fragment:Zp,opaque_fragment:Jp,packing:Qp,premultiplied_alpha_fragment:tm,project_vertex:em,dithering_fragment:nm,dithering_pars_fragment:im,roughnessmap_fragment:sm,roughnessmap_pars_fragment:rm,shadowmap_pars_fragment:am,shadowmap_pars_vertex:om,shadowmap_vertex:hm,shadowmask_pars_fragment:lm,skinbase_vertex:cm,skinning_pars_vertex:um,skinning_vertex:fm,skinnormal_vertex:dm,specularmap_fragment:pm,specularmap_pars_fragment:mm,tonemapping_fragment:_m,tonemapping_pars_fragment:gm,transmission_fragment:vm,transmission_pars_fragment:Mm,uv_pars_fragment:xm,uv_pars_vertex:ym,uv_vertex:Sm,worldpos_vertex:Em,background_vert:Tm,background_frag:bm,backgroundCube_vert:wm,backgroundCube_frag:Am,cube_vert:Pm,cube_frag:Rm,depth_vert:Cm,depth_frag:Lm,distanceRGBA_vert:Im,distanceRGBA_frag:Nm,equirect_vert:Dm,equirect_frag:Um,linedashed_vert:Om,linedashed_frag:Fm,meshbasic_vert:Gm,meshbasic_frag:Bm,meshlambert_vert:zm,meshlambert_frag:km,meshmatcap_vert:Hm,meshmatcap_frag:Vm,meshnormal_vert:Wm,meshnormal_frag:Xm,meshphong_vert:qm,meshphong_frag:Ym,meshphysical_vert:$m,meshphysical_frag:Km,meshtoon_vert:jm,meshtoon_frag:Zm,points_vert:Jm,points_frag:Qm,shadow_vert:t0,shadow_frag:e0,sprite_vert:n0,sprite_frag:i0},ot={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},mn={basic:{uniforms:Ce([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:Ce([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:Ce([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:Ce([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:Ce([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:Ce([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:Ce([ot.points,ot.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:Ce([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:Ce([ot.common,ot.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:Ce([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:Ce([ot.sprite,ot.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distanceRGBA:{uniforms:Ce([ot.common,ot.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distanceRGBA_vert,fragmentShader:Ut.distanceRGBA_frag},shadow:{uniforms:Ce([ot.lights,ot.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};mn.physical={uniforms:Ce([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};const vr={r:0,b:0,g:0},ni=new Ln,s0=new he;function r0(n,t,e,i,s,r,a){const o=new Kt(0);let h=r===!0?0:1,l,c,u=null,d=0,f=null;function _(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?e:t).get(v)),v}function g(x){let v=!1;const S=_(x);S===null?m(o,h):S&&S.isColor&&(m(S,1),v=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(x,v){const S=_(v);S&&(S.isCubeTexture||S.mapping===ua)?(c===void 0&&(c=new je(new Ws(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:ss(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(L,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),ni.copy(v.backgroundRotation),ni.x*=-1,ni.y*=-1,ni.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),c.material.uniforms.envMap.value=S,c.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(s0.makeRotationFromEuler(ni)),c.material.toneMapped=$t.getTransfer(S.colorSpace)!==te,(u!==S||d!==S.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new je(new Xs(2,2),new qn({name:"BackgroundMaterial",uniforms:ss(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=$t.getTransfer(S.colorSpace)!==te,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,f=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,v){x.getRGB(vr,Fc(n)),i.buffers.color.setClear(vr.r,vr.g,vr.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(x,v=1){o.set(x),h=v,m(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(x){h=x,m(o,h)},render:g,addToRenderList:p}}function a0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,a=!1;function o(y,P,k,B,W){let Z=!1;const V=u(B,k,P);r!==V&&(r=V,l(r.object)),Z=f(y,B,k,W),Z&&_(y,B,k,W),W!==null&&t.update(W,n.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,S(y,P,k,B),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function h(){return n.createVertexArray()}function l(y){return n.bindVertexArray(y)}function c(y){return n.deleteVertexArray(y)}function u(y,P,k){const B=k.wireframe===!0;let W=i[y.id];W===void 0&&(W={},i[y.id]=W);let Z=W[P.id];Z===void 0&&(Z={},W[P.id]=Z);let V=Z[B];return V===void 0&&(V=d(h()),Z[B]=V),V}function d(y){const P=[],k=[],B=[];for(let W=0;W<e;W++)P[W]=0,k[W]=0,B[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:k,attributeDivisors:B,object:y,attributes:{},index:null}}function f(y,P,k,B){const W=r.attributes,Z=P.attributes;let V=0;const Q=k.getAttributes();for(const H in Q)if(Q[H].location>=0){const mt=W[H];let xt=Z[H];if(xt===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(xt=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(xt=y.instanceColor)),mt===void 0||mt.attribute!==xt||xt&&mt.data!==xt.data)return!0;V++}return r.attributesNum!==V||r.index!==B}function _(y,P,k,B){const W={},Z=P.attributes;let V=0;const Q=k.getAttributes();for(const H in Q)if(Q[H].location>=0){let mt=Z[H];mt===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(mt=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(mt=y.instanceColor));const xt={};xt.attribute=mt,mt&&mt.data&&(xt.data=mt.data),W[H]=xt,V++}r.attributes=W,r.attributesNum=V,r.index=B}function g(){const y=r.newAttributes;for(let P=0,k=y.length;P<k;P++)y[P]=0}function p(y){m(y,0)}function m(y,P){const k=r.newAttributes,B=r.enabledAttributes,W=r.attributeDivisors;k[y]=1,B[y]===0&&(n.enableVertexAttribArray(y),B[y]=1),W[y]!==P&&(n.vertexAttribDivisor(y,P),W[y]=P)}function x(){const y=r.newAttributes,P=r.enabledAttributes;for(let k=0,B=P.length;k<B;k++)P[k]!==y[k]&&(n.disableVertexAttribArray(k),P[k]=0)}function v(y,P,k,B,W,Z,V){V===!0?n.vertexAttribIPointer(y,P,k,W,Z):n.vertexAttribPointer(y,P,k,B,W,Z)}function S(y,P,k,B){g();const W=B.attributes,Z=k.getAttributes(),V=P.defaultAttributeValues;for(const Q in Z){const H=Z[Q];if(H.location>=0){let ut=W[Q];if(ut===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(ut=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(ut=y.instanceColor)),ut!==void 0){const mt=ut.normalized,xt=ut.itemSize,Bt=t.get(ut);if(Bt===void 0)continue;const Zt=Bt.buffer,X=Bt.type,tt=Bt.bytesPerElement,Mt=X===n.INT||X===n.UNSIGNED_INT||ut.gpuType===th;if(ut.isInterleavedBufferAttribute){const dt=ut.data,At=dt.stride,It=ut.offset;if(dt.isInstancedInterleavedBuffer){for(let Gt=0;Gt<H.locationSize;Gt++)m(H.location+Gt,dt.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Gt=0;Gt<H.locationSize;Gt++)p(H.location+Gt);n.bindBuffer(n.ARRAY_BUFFER,Zt);for(let Gt=0;Gt<H.locationSize;Gt++)v(H.location+Gt,xt/H.locationSize,X,mt,At*tt,(It+xt/H.locationSize*Gt)*tt,Mt)}else{if(ut.isInstancedBufferAttribute){for(let dt=0;dt<H.locationSize;dt++)m(H.location+dt,ut.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let dt=0;dt<H.locationSize;dt++)p(H.location+dt);n.bindBuffer(n.ARRAY_BUFFER,Zt);for(let dt=0;dt<H.locationSize;dt++)v(H.location+dt,xt/H.locationSize,X,mt,xt*tt,xt/H.locationSize*dt*tt,Mt)}}else if(V!==void 0){const mt=V[Q];if(mt!==void 0)switch(mt.length){case 2:n.vertexAttrib2fv(H.location,mt);break;case 3:n.vertexAttrib3fv(H.location,mt);break;case 4:n.vertexAttrib4fv(H.location,mt);break;default:n.vertexAttrib1fv(H.location,mt)}}}}x()}function L(){C();for(const y in i){const P=i[y];for(const k in P){const B=P[k];for(const W in B)c(B[W].object),delete B[W];delete P[k]}delete i[y]}}function b(y){if(i[y.id]===void 0)return;const P=i[y.id];for(const k in P){const B=P[k];for(const W in B)c(B[W].object),delete B[W];delete P[k]}delete i[y.id]}function w(y){for(const P in i){const k=i[P];if(k[y.id]===void 0)continue;const B=k[y.id];for(const W in B)c(B[W].object),delete B[W];delete k[y.id]}}function C(){E(),a=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:b,releaseStatesOfProgram:w,initAttributes:g,enableAttribute:p,disableUnusedAttributes:x}}function o0(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let _=0;_<u;_++)f+=c[_];e.update(f,i,1)}function h(l,c,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<l.length;_++)a(l[_],c[_],d[_]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,c,0,d,0,u);let _=0;for(let g=0;g<u;g++)_+=c[g];for(let g=0;g<d.length;g++)e.update(_,i,d[g])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=h}function h0(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(b){return!(b!==fn&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const w=b===ks&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==Cn&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==An&&!w)}function h(b){if(b==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=h(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const u=e.logarithmicDepthBuffer===!0,d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,L=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:m,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:S,maxSamples:L}}function l0(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new zn,o=new Ot,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=c(u,d,0)},this.setState=function(u,d,f){const _=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,m=n.get(u);if(!s||_===null||_.length===0||r&&!p)r?c(null):l();else{const x=r?0:i,v=x*4;let S=m.clippingState||null;h.value=S,S=c(_,d,v,f);for(let L=0;L!==v;++L)S[L]=e[L];m.clippingState=S,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function l(){h.value!==e&&(h.value=e,h.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function c(u,d,f,_){const g=u!==null?u.length:0;let p=null;if(g!==0){if(p=h.value,_!==!0||p===null){const m=f+g*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,S=f;v!==g;++v,S+=4)a.copy(u[v]).applyMatrix4(x,o),a.normal.toArray(p,S),p[S+3]=a.constant}h.value=p,h.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}function c0(n){let t=new WeakMap;function e(a,o){return o===ao?a.mapping=ts:o===oo&&(a.mapping=es),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===ao||o===oo)if(t.has(a)){const h=t.get(a).texture;return e(h,a.mapping)}else{const h=a.image;if(h&&h.height>0){const l=new yd(h.height);return l.fromEquirectangularTexture(n,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const h=t.get(o);h!==void 0&&(t.delete(o),h.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class u0 extends Gc{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,h=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=c*this.view.offsetY,h=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ki=4,rl=[.125,.215,.35,.446,.526,.582],hi=20,ka=new u0,al=new Kt;let Ha=null,Va=0,Wa=0,Xa=!1;const si=(1+Math.sqrt(5))/2,Fi=1/si,ol=[new D(-si,Fi,0),new D(si,Fi,0),new D(-Fi,0,si),new D(Fi,0,si),new D(0,si,-Fi),new D(0,si,Fi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class hl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Ha=this._renderer.getRenderTarget(),Va=this._renderer.getActiveCubeFace(),Wa=this._renderer.getActiveMipmapLevel(),Xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ha,Va,Wa),this._renderer.xr.enabled=Xa,t.scissorTest=!1,Mr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ts||t.mapping===es?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ha=this._renderer.getRenderTarget(),Va=this._renderer.getActiveCubeFace(),Wa=this._renderer.getActiveMipmapLevel(),Xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ke,minFilter:Ke,generateMipmaps:!1,type:ks,format:fn,colorSpace:Kn,depthBuffer:!1},s=ll(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ll(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=f0(r)),this._blurMaterial=d0(r,t,e)}return s}_compileMaterial(t){const e=new je(this._lodPlanes[0],t);this._renderer.compile(e,ka)}_sceneToCubeUV(t,e,i,s){const o=new nn(90,1,e,i),h=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,d=c.toneMapping;c.getClearColor(al),c.toneMapping=Wn,c.autoClear=!1;const f=new pa({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1}),_=new je(new Ws,f);let g=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,g=!0):(f.color.copy(al),g=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(o.up.set(0,h[m],0),o.lookAt(l[m],0,0)):x===1?(o.up.set(0,0,h[m]),o.lookAt(0,l[m],0)):(o.up.set(0,h[m],0),o.lookAt(0,0,l[m]));const v=this._cubeSize;Mr(s,x*v,m>2?v:0,v,v),c.setRenderTarget(s),g&&c.render(_,o),c.render(t,o)}_.geometry.dispose(),_.material.dispose(),c.toneMapping=d,c.autoClear=u,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===ts||t.mapping===es;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new je(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const h=this._cubeSize;Mr(e,0,0,3*h,2*h),i.setRenderTarget(e),i.render(a,ka)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ol[(s-r-1)%ol.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const h=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new je(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*hi-1),g=r/_,p=isFinite(r)?1+Math.floor(c*g):hi;p>hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${hi}`);const m=[];let x=0;for(let w=0;w<hi;++w){const C=w/g,E=Math.exp(-C*C/2);m.push(E),w===0?x+=E:w<p&&(x+=2*E)}for(let w=0;w<m.length;w++)m[w]=m[w]/x;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=_,d.mipInt.value=v-i;const S=this._sizeLods[s],L=3*S*(s>v-ki?s-v+ki:0),b=4*(this._cubeSize-S);Mr(e,L,b,3*S,2*S),h.setRenderTarget(e),h.render(u,ka)}}function f0(n){const t=[],e=[],i=[];let s=n;const r=n-ki+1+rl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let h=1/o;a>n-ki?h=rl[a-n+ki-1]:a===0&&(h=0),i.push(h);const l=1/(o-2),c=-l,u=1+l,d=[c,c,u,c,u,u,c,c,u,u,c,u],f=6,_=6,g=3,p=2,m=1,x=new Float32Array(g*_*f),v=new Float32Array(p*_*f),S=new Float32Array(m*_*f);for(let b=0;b<f;b++){const w=b%3*2/3-1,C=b>2?0:-1,E=[w,C,0,w+2/3,C,0,w+2/3,C+1,0,w,C,0,w+2/3,C+1,0,w,C+1,0];x.set(E,g*_*b),v.set(d,p*_*b);const y=[b,b,b,b,b,b];S.set(y,m*_*b)}const L=new He;L.setAttribute("position",new Ze(x,g)),L.setAttribute("uv",new Ze(v,p)),L.setAttribute("faceIndex",new Ze(S,m)),t.push(L),s>ki&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function ll(n,t,e){const i=new di(n,t,e);return i.texture.mapping=ua,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Mr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function d0(n,t,e){const i=new Float32Array(hi),s=new D(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function cl(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function ul(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function hh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function p0(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const h=o.mapping,l=h===ao||h===oo,c=h===ts||h===es;if(l||c){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new hl(n)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||c&&f&&s(f)?(e===null&&(e=new hl(n)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let h=0;const l=6;for(let c=0;c<l;c++)o[c]!==void 0&&h++;return h===l}function r(o){const h=o.target;h.removeEventListener("dispose",r);const l=t.get(h);l!==void 0&&(t.delete(h),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function m0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Ss("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function _0(n,t,e,i){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let p=0,m=g.length;p<m;p++)t.remove(g[p])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function h(u){const d=u.attributes;for(const _ in d)t.update(d[_],n.ARRAY_BUFFER);const f=u.morphAttributes;for(const _ in f){const g=f[_];for(let p=0,m=g.length;p<m;p++)t.update(g[p],n.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,_=u.attributes.position;let g=0;if(f!==null){const x=f.array;g=f.version;for(let v=0,S=x.length;v<S;v+=3){const L=x[v+0],b=x[v+1],w=x[v+2];d.push(L,b,b,w,w,L)}}else if(_!==void 0){const x=_.array;g=_.version;for(let v=0,S=x.length/3-1;v<S;v+=3){const L=v+0,b=v+1,w=v+2;d.push(L,b,b,w,w,L)}}else return;const p=new(Cc(d)?Oc:Uc)(d,1);p.version=g;const m=r.get(u);m&&t.remove(m),r.set(u,p)}function c(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:h,getWireframeAttribute:c}}function g0(n,t,e){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function h(d,f){n.drawElements(i,f,r,d*a),e.update(f,i,1)}function l(d,f,_){_!==0&&(n.drawElementsInstanced(i,f,r,d*a,_),e.update(f,i,_))}function c(d,f,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,_);let p=0;for(let m=0;m<_;m++)p+=f[m];e.update(p,i,1)}function u(d,f,_,g){if(_===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)l(d[m]/a,f[m],g[m]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,g,0,_);let m=0;for(let x=0;x<_;x++)m+=f[x];for(let x=0;x<g.length;x++)e.update(m,i,g[x])}}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=l,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function v0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function M0(n,t,e){const i=new WeakMap,s=new ye;function r(a,o,h){const l=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let E=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let v=0;f===!0&&(v=1),_===!0&&(v=2),g===!0&&(v=3);let S=o.attributes.position.count*v,L=1;S>t.maxTextureSize&&(L=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const b=new Float32Array(S*L*4*u),w=new Ic(b,S,L,u);w.type=An,w.needsUpdate=!0;const C=v*4;for(let y=0;y<u;y++){const P=p[y],k=m[y],B=x[y],W=S*L*4*y;for(let Z=0;Z<P.count;Z++){const V=Z*C;f===!0&&(s.fromBufferAttribute(P,Z),b[W+V+0]=s.x,b[W+V+1]=s.y,b[W+V+2]=s.z,b[W+V+3]=0),_===!0&&(s.fromBufferAttribute(k,Z),b[W+V+4]=s.x,b[W+V+5]=s.y,b[W+V+6]=s.z,b[W+V+7]=0),g===!0&&(s.fromBufferAttribute(B,Z),b[W+V+8]=s.x,b[W+V+9]=s.y,b[W+V+10]=s.z,b[W+V+11]=B.itemSize===4?s.w:1)}}d={count:u,texture:w,size:new ct(S,L)},i.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let f=0;for(let g=0;g<l.length;g++)f+=l[g];const _=o.morphTargetsRelative?1:1-f;h.getUniforms().setValue(n,"morphTargetBaseInfluence",_),h.getUniforms().setValue(n,"morphTargetInfluences",l)}h.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),h.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function x0(n,t,e,i){let s=new WeakMap;function r(h){const l=i.render.frame,c=h.geometry,u=t.get(h,c);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),h.isInstancedMesh&&(h.hasEventListener("dispose",o)===!1&&h.addEventListener("dispose",o),s.get(h)!==l&&(e.update(h.instanceMatrix,n.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,n.ARRAY_BUFFER),s.set(h,l))),h.isSkinnedMesh){const d=h.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function a(){s=new WeakMap}function o(h){const l=h.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class Hc extends Ne{constructor(t,e,i,s,r,a,o,h,l,c=Ki){if(c!==Ki&&c!==is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===Ki&&(i=fi),i===void 0&&c===is&&(i=ns),super(null,s,r,a,o,h,c,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:sn,this.minFilter=h!==void 0?h:sn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Vc=new Ne,fl=new Hc(1,1),Wc=new Ic,Xc=new rd,qc=new Bc,dl=[],pl=[],ml=new Float32Array(16),_l=new Float32Array(9),gl=new Float32Array(4);function os(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=dl[s];if(r===void 0&&(r=new Float32Array(s),dl[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function _e(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ge(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ma(n,t){let e=pl[t];e===void 0&&(e=new Int32Array(t),pl[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function y0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function S0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;n.uniform2fv(this.addr,t),ge(e,t)}}function E0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;n.uniform3fv(this.addr,t),ge(e,t)}}function T0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;n.uniform4fv(this.addr,t),ge(e,t)}}function b0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ge(e,t)}else{if(_e(e,i))return;gl.set(i),n.uniformMatrix2fv(this.addr,!1,gl),ge(e,i)}}function w0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ge(e,t)}else{if(_e(e,i))return;_l.set(i),n.uniformMatrix3fv(this.addr,!1,_l),ge(e,i)}}function A0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ge(e,t)}else{if(_e(e,i))return;ml.set(i),n.uniformMatrix4fv(this.addr,!1,ml),ge(e,i)}}function P0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function R0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;n.uniform2iv(this.addr,t),ge(e,t)}}function C0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;n.uniform3iv(this.addr,t),ge(e,t)}}function L0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;n.uniform4iv(this.addr,t),ge(e,t)}}function I0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function N0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;n.uniform2uiv(this.addr,t),ge(e,t)}}function D0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;n.uniform3uiv(this.addr,t),ge(e,t)}}function U0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;n.uniform4uiv(this.addr,t),ge(e,t)}}function O0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(fl.compareFunction=Rc,r=fl):r=Vc,e.setTexture2D(t||r,s)}function F0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Xc,s)}function G0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||qc,s)}function B0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Wc,s)}function z0(n){switch(n){case 5126:return y0;case 35664:return S0;case 35665:return E0;case 35666:return T0;case 35674:return b0;case 35675:return w0;case 35676:return A0;case 5124:case 35670:return P0;case 35667:case 35671:return R0;case 35668:case 35672:return C0;case 35669:case 35673:return L0;case 5125:return I0;case 36294:return N0;case 36295:return D0;case 36296:return U0;case 35678:case 36198:case 36298:case 36306:case 35682:return O0;case 35679:case 36299:case 36307:return F0;case 35680:case 36300:case 36308:case 36293:return G0;case 36289:case 36303:case 36311:case 36292:return B0}}function k0(n,t){n.uniform1fv(this.addr,t)}function H0(n,t){const e=os(t,this.size,2);n.uniform2fv(this.addr,e)}function V0(n,t){const e=os(t,this.size,3);n.uniform3fv(this.addr,e)}function W0(n,t){const e=os(t,this.size,4);n.uniform4fv(this.addr,e)}function X0(n,t){const e=os(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function q0(n,t){const e=os(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Y0(n,t){const e=os(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function $0(n,t){n.uniform1iv(this.addr,t)}function K0(n,t){n.uniform2iv(this.addr,t)}function j0(n,t){n.uniform3iv(this.addr,t)}function Z0(n,t){n.uniform4iv(this.addr,t)}function J0(n,t){n.uniform1uiv(this.addr,t)}function Q0(n,t){n.uniform2uiv(this.addr,t)}function t_(n,t){n.uniform3uiv(this.addr,t)}function e_(n,t){n.uniform4uiv(this.addr,t)}function n_(n,t,e){const i=this.cache,s=t.length,r=ma(e,s);_e(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Vc,r[a])}function i_(n,t,e){const i=this.cache,s=t.length,r=ma(e,s);_e(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Xc,r[a])}function s_(n,t,e){const i=this.cache,s=t.length,r=ma(e,s);_e(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||qc,r[a])}function r_(n,t,e){const i=this.cache,s=t.length,r=ma(e,s);_e(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Wc,r[a])}function a_(n){switch(n){case 5126:return k0;case 35664:return H0;case 35665:return V0;case 35666:return W0;case 35674:return X0;case 35675:return q0;case 35676:return Y0;case 5124:case 35670:return $0;case 35667:case 35671:return K0;case 35668:case 35672:return j0;case 35669:case 35673:return Z0;case 5125:return J0;case 36294:return Q0;case 36295:return t_;case 36296:return e_;case 35678:case 36198:case 36298:case 36306:case 35682:return n_;case 35679:case 36299:case 36307:return i_;case 35680:case 36300:case 36308:case 36293:return s_;case 36289:case 36303:case 36311:case 36292:return r_}}class o_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=z0(e.type)}}class h_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=a_(e.type)}}class l_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const qa=/(\w+)(\])?(\[|\.)?/g;function vl(n,t){n.seq.push(t),n.map[t.id]=t}function c_(n,t,e){const i=n.name,s=i.length;for(qa.lastIndex=0;;){const r=qa.exec(i),a=qa.lastIndex;let o=r[1];const h=r[2]==="]",l=r[3];if(h&&(o=o|0),l===void 0||l==="["&&a+2===s){vl(e,l===void 0?new o_(o,n,t):new h_(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new l_(o),vl(e,u)),e=u}}}class Gr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);c_(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],h=i[o.id];h.needsUpdate!==!1&&o.setValue(t,h.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function Ml(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const u_=37297;let f_=0;function d_(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function p_(n){const t=$t.getPrimaries($t.workingColorSpace),e=$t.getPrimaries(n);let i;switch(t===e?i="":t===qr&&e===Xr?i="LinearDisplayP3ToLinearSRGB":t===Xr&&e===qr&&(i="LinearSRGBToLinearDisplayP3"),n){case Kn:case fa:return[i,"LinearTransferOETF"];case cn:case ah:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function xl(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+d_(n.getShaderSource(t),a)}else return s}function m_(n,t){const e=p_(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function __(n,t){let e;switch(t){case gf:e="Linear";break;case vf:e="Reinhard";break;case Mf:e="Cineon";break;case xf:e="ACESFilmic";break;case Sf:e="AgX";break;case Ef:e="Neutral";break;case yf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const xr=new D;function g_(){$t.getLuminanceCoefficients(xr);const n=xr.x.toFixed(4),t=xr.y.toFixed(4),e=xr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function v_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_s).join(`
`)}function M_(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function x_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function _s(n){return n!==""}function yl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sl(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const y_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Go(n){return n.replace(y_,E_)}const S_=new Map;function E_(n,t){let e=Ut[t];if(e===void 0){const i=S_.get(t);if(i!==void 0)e=Ut[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Go(e)}const T_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function El(n){return n.replace(T_,b_)}function b_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tl(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function w_(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===_c?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Hu?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===wn&&(t="SHADOWMAP_TYPE_VSM"),t}function A_(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ts:case es:t="ENVMAP_TYPE_CUBE";break;case ua:t="ENVMAP_TYPE_CUBE_UV";break}return t}function P_(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case es:t="ENVMAP_MODE_REFRACTION";break}return t}function R_(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case gc:t="ENVMAP_BLENDING_MULTIPLY";break;case mf:t="ENVMAP_BLENDING_MIX";break;case _f:t="ENVMAP_BLENDING_ADD";break}return t}function C_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function L_(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const h=w_(e),l=A_(e),c=P_(e),u=R_(e),d=C_(e),f=v_(e),_=M_(r),g=s.createProgram();let p,m,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(_s).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(_s).join(`
`),m.length>0&&(m+=`
`)):(p=[Tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_s).join(`
`),m=[Tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wn?"#define TONE_MAPPING":"",e.toneMapping!==Wn?Ut.tonemapping_pars_fragment:"",e.toneMapping!==Wn?__("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,m_("linearToOutputTexel",e.outputColorSpace),g_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_s).join(`
`)),a=Go(a),a=yl(a,e),a=Sl(a,e),o=Go(o),o=yl(o,e),o=Sl(o,e),a=El(a),o=El(o),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Gh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Gh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=x+p+a,S=x+m+o,L=Ml(s,s.VERTEX_SHADER,v),b=Ml(s,s.FRAGMENT_SHADER,S);s.attachShader(g,L),s.attachShader(g,b),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function w(P){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(g).trim(),B=s.getShaderInfoLog(L).trim(),W=s.getShaderInfoLog(b).trim();let Z=!0,V=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,L,b);else{const Q=xl(s,L,"vertex"),H=xl(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+Q+`
`+H)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(B===""||W==="")&&(V=!1);V&&(P.diagnostics={runnable:Z,programLog:k,vertexShader:{log:B,prefix:p},fragmentShader:{log:W,prefix:m}})}s.deleteShader(L),s.deleteShader(b),C=new Gr(s,g),E=x_(s,g)}let C;this.getUniforms=function(){return C===void 0&&w(this),C};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(g,u_)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=f_++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=L,this.fragmentShader=b,this}let I_=0;class N_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new D_(t),e.set(t,i)),i}}class D_{constructor(t){this.id=I_++,this.code=t,this.usedTimes=0}}function U_(n,t,e,i,s,r,a){const o=new Nc,h=new N_,l=new Set,c=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(E){return l.add(E),E===0?"uv":`uv${E}`}function p(E,y,P,k,B){const W=k.fog,Z=B.geometry,V=E.isMeshStandardMaterial?k.environment:null,Q=(E.isMeshStandardMaterial?e:t).get(E.envMap||V),H=Q&&Q.mapping===ua?Q.image.height:null,ut=_[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const mt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,xt=mt!==void 0?mt.length:0;let Bt=0;Z.morphAttributes.position!==void 0&&(Bt=1),Z.morphAttributes.normal!==void 0&&(Bt=2),Z.morphAttributes.color!==void 0&&(Bt=3);let Zt,X,tt,Mt;if(ut){const Ht=mn[ut];Zt=Ht.vertexShader,X=Ht.fragmentShader}else Zt=E.vertexShader,X=E.fragmentShader,h.update(E),tt=h.getVertexShaderID(E),Mt=h.getFragmentShaderID(E);const dt=n.getRenderTarget(),At=B.isInstancedMesh===!0,It=B.isBatchedMesh===!0,Gt=!!E.map,se=!!E.matcap,R=!!Q,ce=!!E.aoMap,jt=!!E.lightMap,Jt=!!E.bumpMap,Et=!!E.normalMap,ue=!!E.displacementMap,Ct=!!E.emissiveMap,Nt=!!E.metalnessMap,A=!!E.roughnessMap,M=E.anisotropy>0,z=E.clearcoat>0,$=E.dispersion>0,J=E.iridescence>0,K=E.sheen>0,Tt=E.transmission>0,ht=M&&!!E.anisotropyMap,pt=z&&!!E.clearcoatMap,Dt=z&&!!E.clearcoatNormalMap,et=z&&!!E.clearcoatRoughnessMap,ft=J&&!!E.iridescenceMap,zt=J&&!!E.iridescenceThicknessMap,Rt=K&&!!E.sheenColorMap,_t=K&&!!E.sheenRoughnessMap,Lt=!!E.specularMap,Ft=!!E.specularColorMap,ee=!!E.specularIntensityMap,I=Tt&&!!E.transmissionMap,nt=Tt&&!!E.thicknessMap,q=!!E.gradientMap,Y=!!E.alphaMap,rt=E.alphaTest>0,bt=!!E.alphaHash,kt=!!E.extensions;let fe=Wn;E.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(fe=n.toneMapping);const Se={shaderID:ut,shaderType:E.type,shaderName:E.name,vertexShader:Zt,fragmentShader:X,defines:E.defines,customVertexShaderID:tt,customFragmentShaderID:Mt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:It,batchingColor:It&&B._colorsTexture!==null,instancing:At,instancingColor:At&&B.instanceColor!==null,instancingMorph:At&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:dt===null?n.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:Kn,alphaToCoverage:!!E.alphaToCoverage,map:Gt,matcap:se,envMap:R,envMapMode:R&&Q.mapping,envMapCubeUVHeight:H,aoMap:ce,lightMap:jt,bumpMap:Jt,normalMap:Et,displacementMap:d&&ue,emissiveMap:Ct,normalMapObjectSpace:Et&&E.normalMapType===Pf,normalMapTangentSpace:Et&&E.normalMapType===Af,metalnessMap:Nt,roughnessMap:A,anisotropy:M,anisotropyMap:ht,clearcoat:z,clearcoatMap:pt,clearcoatNormalMap:Dt,clearcoatRoughnessMap:et,dispersion:$,iridescence:J,iridescenceMap:ft,iridescenceThicknessMap:zt,sheen:K,sheenColorMap:Rt,sheenRoughnessMap:_t,specularMap:Lt,specularColorMap:Ft,specularIntensityMap:ee,transmission:Tt,transmissionMap:I,thicknessMap:nt,gradientMap:q,opaque:E.transparent===!1&&E.blending===$i&&E.alphaToCoverage===!1,alphaMap:Y,alphaTest:rt,alphaHash:bt,combine:E.combine,mapUv:Gt&&g(E.map.channel),aoMapUv:ce&&g(E.aoMap.channel),lightMapUv:jt&&g(E.lightMap.channel),bumpMapUv:Jt&&g(E.bumpMap.channel),normalMapUv:Et&&g(E.normalMap.channel),displacementMapUv:ue&&g(E.displacementMap.channel),emissiveMapUv:Ct&&g(E.emissiveMap.channel),metalnessMapUv:Nt&&g(E.metalnessMap.channel),roughnessMapUv:A&&g(E.roughnessMap.channel),anisotropyMapUv:ht&&g(E.anisotropyMap.channel),clearcoatMapUv:pt&&g(E.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&g(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&g(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&g(E.iridescenceMap.channel),iridescenceThicknessMapUv:zt&&g(E.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&g(E.sheenColorMap.channel),sheenRoughnessMapUv:_t&&g(E.sheenRoughnessMap.channel),specularMapUv:Lt&&g(E.specularMap.channel),specularColorMapUv:Ft&&g(E.specularColorMap.channel),specularIntensityMapUv:ee&&g(E.specularIntensityMap.channel),transmissionMapUv:I&&g(E.transmissionMap.channel),thicknessMapUv:nt&&g(E.thicknessMap.channel),alphaMapUv:Y&&g(E.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Et||M),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Z.attributes.uv&&(Gt||Y),fog:!!W,useFog:E.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:B.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:Bt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:fe,decodeVideoTexture:Gt&&E.map.isVideoTexture===!0&&$t.getTransfer(E.map.colorSpace)===te,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===un,flipSided:E.side===ze,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:kt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(kt&&E.extensions.multiDraw===!0||It)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Se.vertexUv1s=l.has(1),Se.vertexUv2s=l.has(2),Se.vertexUv3s=l.has(3),l.clear(),Se}function m(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const P in E.defines)y.push(P),y.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(x(y,E),v(y,E),y.push(n.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function x(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function v(E,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.skinning&&o.enable(4),y.morphTargets&&o.enable(5),y.morphNormals&&o.enable(6),y.morphColors&&o.enable(7),y.premultipliedAlpha&&o.enable(8),y.shadowMapEnabled&&o.enable(9),y.doubleSided&&o.enable(10),y.flipSided&&o.enable(11),y.useDepthPacking&&o.enable(12),y.dithering&&o.enable(13),y.transmission&&o.enable(14),y.sheen&&o.enable(15),y.opaque&&o.enable(16),y.pointsUvs&&o.enable(17),y.decodeVideoTexture&&o.enable(18),y.alphaToCoverage&&o.enable(19),E.push(o.mask)}function S(E){const y=_[E.type];let P;if(y){const k=mn[y];P=gd.clone(k.uniforms)}else P=E.uniforms;return P}function L(E,y){let P;for(let k=0,B=c.length;k<B;k++){const W=c[k];if(W.cacheKey===y){P=W,++P.usedTimes;break}}return P===void 0&&(P=new L_(n,y,E,r),c.push(P)),P}function b(E){if(--E.usedTimes===0){const y=c.indexOf(E);c[y]=c[c.length-1],c.pop(),E.destroy()}}function w(E){h.remove(E)}function C(){h.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:S,acquireProgram:L,releaseProgram:b,releaseShaderCache:w,programs:c,dispose:C}}function O_(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,h){n.get(a)[o]=h}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function F_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function bl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function wl(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,d,f,_,g,p){let m=n[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:_,renderOrder:u.renderOrder,z:g,group:p},n[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=_,m.renderOrder=u.renderOrder,m.z=g,m.group=p),t++,m}function o(u,d,f,_,g,p){const m=a(u,d,f,_,g,p);f.transmission>0?i.push(m):f.transparent===!0?s.push(m):e.push(m)}function h(u,d,f,_,g,p){const m=a(u,d,f,_,g,p);f.transmission>0?i.unshift(m):f.transparent===!0?s.unshift(m):e.unshift(m)}function l(u,d){e.length>1&&e.sort(u||F_),i.length>1&&i.sort(d||bl),s.length>1&&s.sort(d||bl)}function c(){for(let u=t,d=n.length;u<d;u++){const f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:h,finish:c,sort:l}}function G_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new wl,n.set(i,[a])):s>=r.length?(a=new wl,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function B_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Kt};break;case"SpotLight":e={position:new D,direction:new D,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new D,halfWidth:new D,halfHeight:new D};break}return n[t.id]=e,e}}}function z_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let k_=0;function H_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function V_(n){const t=new B_,e=z_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new D);const s=new D,r=new he,a=new he;function o(l){let c=0,u=0,d=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let f=0,_=0,g=0,p=0,m=0,x=0,v=0,S=0,L=0,b=0,w=0;l.sort(H_);for(let E=0,y=l.length;E<y;E++){const P=l[E],k=P.color,B=P.intensity,W=P.distance,Z=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)c+=k.r*B,u+=k.g*B,d+=k.b*B;else if(P.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(P.sh.coefficients[V],B);w++}else if(P.isDirectionalLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Q=P.shadow,H=e.get(P);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,i.directionalShadow[f]=H,i.directionalShadowMap[f]=Z,i.directionalShadowMatrix[f]=P.shadow.matrix,x++}i.directional[f]=V,f++}else if(P.isSpotLight){const V=t.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(k).multiplyScalar(B),V.distance=W,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,i.spot[g]=V;const Q=P.shadow;if(P.map&&(i.spotLightMap[L]=P.map,L++,Q.updateMatrices(P),P.castShadow&&b++),i.spotLightMatrix[g]=Q.matrix,P.castShadow){const H=e.get(P);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,i.spotShadow[g]=H,i.spotShadowMap[g]=Z,S++}g++}else if(P.isRectAreaLight){const V=t.get(P);V.color.copy(k).multiplyScalar(B),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),i.rectArea[p]=V,p++}else if(P.isPointLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),V.distance=P.distance,V.decay=P.decay,P.castShadow){const Q=P.shadow,H=e.get(P);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,H.shadowCameraNear=Q.camera.near,H.shadowCameraFar=Q.camera.far,i.pointShadow[_]=H,i.pointShadowMap[_]=Z,i.pointShadowMatrix[_]=P.shadow.matrix,v++}i.point[_]=V,_++}else if(P.isHemisphereLight){const V=t.get(P);V.skyColor.copy(P.color).multiplyScalar(B),V.groundColor.copy(P.groundColor).multiplyScalar(B),i.hemi[m]=V,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ot.LTC_FLOAT_1,i.rectAreaLTC2=ot.LTC_FLOAT_2):(i.rectAreaLTC1=ot.LTC_HALF_1,i.rectAreaLTC2=ot.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=u,i.ambient[2]=d;const C=i.hash;(C.directionalLength!==f||C.pointLength!==_||C.spotLength!==g||C.rectAreaLength!==p||C.hemiLength!==m||C.numDirectionalShadows!==x||C.numPointShadows!==v||C.numSpotShadows!==S||C.numSpotMaps!==L||C.numLightProbes!==w)&&(i.directional.length=f,i.spot.length=g,i.rectArea.length=p,i.point.length=_,i.hemi.length=m,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=S+L-b,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=w,C.directionalLength=f,C.pointLength=_,C.spotLength=g,C.rectAreaLength=p,C.hemiLength=m,C.numDirectionalShadows=x,C.numPointShadows=v,C.numSpotShadows=S,C.numSpotMaps=L,C.numLightProbes=w,i.version=k_++)}function h(l,c){let u=0,d=0,f=0,_=0,g=0;const p=c.matrixWorldInverse;for(let m=0,x=l.length;m<x;m++){const v=l[m];if(v.isDirectionalLight){const S=i.directional[u];S.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),u++}else if(v.isSpotLight){const S=i.spot[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),f++}else if(v.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),a.identity(),r.copy(v.matrixWorld),r.premultiply(p),a.extractRotation(r),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(v.isPointLight){const S=i.point[d];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),d++}else if(v.isHemisphereLight){const S=i.hemi[g];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(p),g++}}}return{setup:o,setupView:h,state:i}}function Al(n){const t=new V_(n),e=[],i=[];function s(c){l.camera=c,e.length=0,i.length=0}function r(c){e.push(c)}function a(c){i.push(c)}function o(){t.setup(e)}function h(c){t.setupView(e,c)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:h,pushLight:r,pushShadow:a}}function W_(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Al(n),t.set(s,[o])):r>=a.length?(o=new Al(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class X_ extends as{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class q_ extends as{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Y_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function K_(n,t,e){let i=new zc;const s=new ct,r=new ct,a=new ye,o=new X_({depthPacking:wf}),h=new q_,l={},c=e.maxTextureSize,u={[Xn]:ze,[ze]:Xn,[un]:un},d=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:Y_,fragmentShader:$_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const _=new He;_.setAttribute("position",new Ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new je(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_c;let m=this.type;this.render=function(b,w,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;const E=n.getRenderTarget(),y=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Vn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const B=m!==wn&&this.type===wn,W=m===wn&&this.type!==wn;for(let Z=0,V=b.length;Z<V;Z++){const Q=b[Z],H=Q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const ut=H.getFrameExtents();if(s.multiply(ut),r.copy(H.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/ut.x),s.x=r.x*ut.x,H.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/ut.y),s.y=r.y*ut.y,H.mapSize.y=r.y)),H.map===null||B===!0||W===!0){const xt=this.type!==wn?{minFilter:sn,magFilter:sn}:{};H.map!==null&&H.map.dispose(),H.map=new di(s.x,s.y,xt),H.map.texture.name=Q.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const mt=H.getViewportCount();for(let xt=0;xt<mt;xt++){const Bt=H.getViewport(xt);a.set(r.x*Bt.x,r.y*Bt.y,r.x*Bt.z,r.y*Bt.w),k.viewport(a),H.updateMatrices(Q,xt),i=H.getFrustum(),S(w,C,H.camera,Q,this.type)}H.isPointLightShadow!==!0&&this.type===wn&&x(H,C),H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(E,y,P)};function x(b,w){const C=t.update(g);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new di(s.x,s.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(w,null,C,d,g,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(w,null,C,f,g,null)}function v(b,w,C,E){let y=null;const P=C.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)y=P;else if(y=C.isPointLight===!0?h:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const k=y.uuid,B=w.uuid;let W=l[k];W===void 0&&(W={},l[k]=W);let Z=W[B];Z===void 0&&(Z=y.clone(),W[B]=Z,w.addEventListener("dispose",L)),y=Z}if(y.visible=w.visible,y.wireframe=w.wireframe,E===wn?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:u[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const k=n.properties.get(y);k.light=C}return y}function S(b,w,C,E,y){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&y===wn)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,b.matrixWorld);const B=t.update(b),W=b.material;if(Array.isArray(W)){const Z=B.groups;for(let V=0,Q=Z.length;V<Q;V++){const H=Z[V],ut=W[H.materialIndex];if(ut&&ut.visible){const mt=v(b,ut,E,y);b.onBeforeShadow(n,b,w,C,B,mt,H),n.renderBufferDirect(C,null,B,mt,b,H),b.onAfterShadow(n,b,w,C,B,mt,H)}}}else if(W.visible){const Z=v(b,W,E,y);b.onBeforeShadow(n,b,w,C,B,Z,null),n.renderBufferDirect(C,null,B,Z,b,null),b.onAfterShadow(n,b,w,C,B,Z,null)}}const k=b.children;for(let B=0,W=k.length;B<W;B++)S(k[B],w,C,E,y)}function L(b){b.target.removeEventListener("dispose",L);for(const C in l){const E=l[C],y=b.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}function j_(n){function t(){let I=!1;const nt=new ye;let q=null;const Y=new ye(0,0,0,0);return{setMask:function(rt){q!==rt&&!I&&(n.colorMask(rt,rt,rt,rt),q=rt)},setLocked:function(rt){I=rt},setClear:function(rt,bt,kt,fe,Se){Se===!0&&(rt*=fe,bt*=fe,kt*=fe),nt.set(rt,bt,kt,fe),Y.equals(nt)===!1&&(n.clearColor(rt,bt,kt,fe),Y.copy(nt))},reset:function(){I=!1,q=null,Y.set(-1,0,0,0)}}}function e(){let I=!1,nt=null,q=null,Y=null;return{setTest:function(rt){rt?Mt(n.DEPTH_TEST):dt(n.DEPTH_TEST)},setMask:function(rt){nt!==rt&&!I&&(n.depthMask(rt),nt=rt)},setFunc:function(rt){if(q!==rt){switch(rt){case hf:n.depthFunc(n.NEVER);break;case lf:n.depthFunc(n.ALWAYS);break;case cf:n.depthFunc(n.LESS);break;case Vr:n.depthFunc(n.LEQUAL);break;case uf:n.depthFunc(n.EQUAL);break;case ff:n.depthFunc(n.GEQUAL);break;case df:n.depthFunc(n.GREATER);break;case pf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}q=rt}},setLocked:function(rt){I=rt},setClear:function(rt){Y!==rt&&(n.clearDepth(rt),Y=rt)},reset:function(){I=!1,nt=null,q=null,Y=null}}}function i(){let I=!1,nt=null,q=null,Y=null,rt=null,bt=null,kt=null,fe=null,Se=null;return{setTest:function(Ht){I||(Ht?Mt(n.STENCIL_TEST):dt(n.STENCIL_TEST))},setMask:function(Ht){nt!==Ht&&!I&&(n.stencilMask(Ht),nt=Ht)},setFunc:function(Ht,xn,pn){(q!==Ht||Y!==xn||rt!==pn)&&(n.stencilFunc(Ht,xn,pn),q=Ht,Y=xn,rt=pn)},setOp:function(Ht,xn,pn){(bt!==Ht||kt!==xn||fe!==pn)&&(n.stencilOp(Ht,xn,pn),bt=Ht,kt=xn,fe=pn)},setLocked:function(Ht){I=Ht},setClear:function(Ht){Se!==Ht&&(n.clearStencil(Ht),Se=Ht)},reset:function(){I=!1,nt=null,q=null,Y=null,rt=null,bt=null,kt=null,fe=null,Se=null}}}const s=new t,r=new e,a=new i,o=new WeakMap,h=new WeakMap;let l={},c={},u=new WeakMap,d=[],f=null,_=!1,g=null,p=null,m=null,x=null,v=null,S=null,L=null,b=new Kt(0,0,0),w=0,C=!1,E=null,y=null,P=null,k=null,B=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,V=0;const Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Z=V>=1):Q.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Z=V>=2);let H=null,ut={};const mt=n.getParameter(n.SCISSOR_BOX),xt=n.getParameter(n.VIEWPORT),Bt=new ye().fromArray(mt),Zt=new ye().fromArray(xt);function X(I,nt,q,Y){const rt=new Uint8Array(4),bt=n.createTexture();n.bindTexture(I,bt),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let kt=0;kt<q;kt++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(nt,0,n.RGBA,1,1,Y,0,n.RGBA,n.UNSIGNED_BYTE,rt):n.texImage2D(nt+kt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,rt);return bt}const tt={};tt[n.TEXTURE_2D]=X(n.TEXTURE_2D,n.TEXTURE_2D,1),tt[n.TEXTURE_CUBE_MAP]=X(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[n.TEXTURE_2D_ARRAY]=X(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),tt[n.TEXTURE_3D]=X(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),Mt(n.DEPTH_TEST),r.setFunc(Vr),Jt(!1),Et(Ih),Mt(n.CULL_FACE),ce(Vn);function Mt(I){l[I]!==!0&&(n.enable(I),l[I]=!0)}function dt(I){l[I]!==!1&&(n.disable(I),l[I]=!1)}function At(I,nt){return c[I]!==nt?(n.bindFramebuffer(I,nt),c[I]=nt,I===n.DRAW_FRAMEBUFFER&&(c[n.FRAMEBUFFER]=nt),I===n.FRAMEBUFFER&&(c[n.DRAW_FRAMEBUFFER]=nt),!0):!1}function It(I,nt){let q=d,Y=!1;if(I){q=u.get(nt),q===void 0&&(q=[],u.set(nt,q));const rt=I.textures;if(q.length!==rt.length||q[0]!==n.COLOR_ATTACHMENT0){for(let bt=0,kt=rt.length;bt<kt;bt++)q[bt]=n.COLOR_ATTACHMENT0+bt;q.length=rt.length,Y=!0}}else q[0]!==n.BACK&&(q[0]=n.BACK,Y=!0);Y&&n.drawBuffers(q)}function Gt(I){return f!==I?(n.useProgram(I),f=I,!0):!1}const se={[oi]:n.FUNC_ADD,[Wu]:n.FUNC_SUBTRACT,[Xu]:n.FUNC_REVERSE_SUBTRACT};se[qu]=n.MIN,se[Yu]=n.MAX;const R={[$u]:n.ZERO,[Ku]:n.ONE,[ju]:n.SRC_COLOR,[so]:n.SRC_ALPHA,[nf]:n.SRC_ALPHA_SATURATE,[tf]:n.DST_COLOR,[Ju]:n.DST_ALPHA,[Zu]:n.ONE_MINUS_SRC_COLOR,[ro]:n.ONE_MINUS_SRC_ALPHA,[ef]:n.ONE_MINUS_DST_COLOR,[Qu]:n.ONE_MINUS_DST_ALPHA,[sf]:n.CONSTANT_COLOR,[rf]:n.ONE_MINUS_CONSTANT_COLOR,[af]:n.CONSTANT_ALPHA,[of]:n.ONE_MINUS_CONSTANT_ALPHA};function ce(I,nt,q,Y,rt,bt,kt,fe,Se,Ht){if(I===Vn){_===!0&&(dt(n.BLEND),_=!1);return}if(_===!1&&(Mt(n.BLEND),_=!0),I!==Vu){if(I!==g||Ht!==C){if((p!==oi||v!==oi)&&(n.blendEquation(n.FUNC_ADD),p=oi,v=oi),Ht)switch(I){case $i:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nh:n.blendFunc(n.ONE,n.ONE);break;case Dh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Uh:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case $i:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nh:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Dh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Uh:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}m=null,x=null,S=null,L=null,b.set(0,0,0),w=0,g=I,C=Ht}return}rt=rt||nt,bt=bt||q,kt=kt||Y,(nt!==p||rt!==v)&&(n.blendEquationSeparate(se[nt],se[rt]),p=nt,v=rt),(q!==m||Y!==x||bt!==S||kt!==L)&&(n.blendFuncSeparate(R[q],R[Y],R[bt],R[kt]),m=q,x=Y,S=bt,L=kt),(fe.equals(b)===!1||Se!==w)&&(n.blendColor(fe.r,fe.g,fe.b,Se),b.copy(fe),w=Se),g=I,C=!1}function jt(I,nt){I.side===un?dt(n.CULL_FACE):Mt(n.CULL_FACE);let q=I.side===ze;nt&&(q=!q),Jt(q),I.blending===$i&&I.transparent===!1?ce(Vn):ce(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),r.setFunc(I.depthFunc),r.setTest(I.depthTest),r.setMask(I.depthWrite),s.setMask(I.colorWrite);const Y=I.stencilWrite;a.setTest(Y),Y&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Ct(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Mt(n.SAMPLE_ALPHA_TO_COVERAGE):dt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Jt(I){E!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),E=I)}function Et(I){I!==zu?(Mt(n.CULL_FACE),I!==y&&(I===Ih?n.cullFace(n.BACK):I===ku?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):dt(n.CULL_FACE),y=I}function ue(I){I!==P&&(Z&&n.lineWidth(I),P=I)}function Ct(I,nt,q){I?(Mt(n.POLYGON_OFFSET_FILL),(k!==nt||B!==q)&&(n.polygonOffset(nt,q),k=nt,B=q)):dt(n.POLYGON_OFFSET_FILL)}function Nt(I){I?Mt(n.SCISSOR_TEST):dt(n.SCISSOR_TEST)}function A(I){I===void 0&&(I=n.TEXTURE0+W-1),H!==I&&(n.activeTexture(I),H=I)}function M(I,nt,q){q===void 0&&(H===null?q=n.TEXTURE0+W-1:q=H);let Y=ut[q];Y===void 0&&(Y={type:void 0,texture:void 0},ut[q]=Y),(Y.type!==I||Y.texture!==nt)&&(H!==q&&(n.activeTexture(q),H=q),n.bindTexture(I,nt||tt[I]),Y.type=I,Y.texture=nt)}function z(){const I=ut[H];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function $(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Tt(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ht(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Dt(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function et(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ft(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function zt(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Rt(I){Bt.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Bt.copy(I))}function _t(I){Zt.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Zt.copy(I))}function Lt(I,nt){let q=h.get(nt);q===void 0&&(q=new WeakMap,h.set(nt,q));let Y=q.get(I);Y===void 0&&(Y=n.getUniformBlockIndex(nt,I.name),q.set(I,Y))}function Ft(I,nt){const Y=h.get(nt).get(I);o.get(nt)!==Y&&(n.uniformBlockBinding(nt,Y,I.__bindingPointIndex),o.set(nt,Y))}function ee(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},H=null,ut={},c={},u=new WeakMap,d=[],f=null,_=!1,g=null,p=null,m=null,x=null,v=null,S=null,L=null,b=new Kt(0,0,0),w=0,C=!1,E=null,y=null,P=null,k=null,B=null,Bt.set(0,0,n.canvas.width,n.canvas.height),Zt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:Mt,disable:dt,bindFramebuffer:At,drawBuffers:It,useProgram:Gt,setBlending:ce,setMaterial:jt,setFlipSided:Jt,setCullFace:Et,setLineWidth:ue,setPolygonOffset:Ct,setScissorTest:Nt,activeTexture:A,bindTexture:M,unbindTexture:z,compressedTexImage2D:$,compressedTexImage3D:J,texImage2D:ft,texImage3D:zt,updateUBOMapping:Lt,uniformBlockBinding:Ft,texStorage2D:Dt,texStorage3D:et,texSubImage2D:K,texSubImage3D:Tt,compressedTexSubImage2D:ht,compressedTexSubImage3D:pt,scissor:Rt,viewport:_t,reset:ee}}function Pl(n,t,e,i){const s=Z_(i);switch(e){case Sc:return n*t;case Tc:return n*t;case bc:return n*t*2;case wc:return n*t/s.components*s.byteLength;case ih:return n*t/s.components*s.byteLength;case Ac:return n*t*2/s.components*s.byteLength;case sh:return n*t*2/s.components*s.byteLength;case Ec:return n*t*3/s.components*s.byteLength;case fn:return n*t*4/s.components*s.byteLength;case rh:return n*t*4/s.components*s.byteLength;case Nr:case Dr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ur:case Or:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case uo:case po:return Math.max(n,16)*Math.max(t,8)/4;case co:case fo:return Math.max(n,8)*Math.max(t,8)/2;case mo:case _o:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case go:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case vo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Mo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case xo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case yo:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case So:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Eo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case To:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case bo:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case wo:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Po:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Ro:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Co:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Lo:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Fr:case Io:case No:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Pc:case Do:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Uo:case Oo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Z_(n){switch(n){case Cn:case Mc:return{byteLength:1,components:1};case Ls:case xc:case ks:return{byteLength:2,components:1};case eh:case nh:return{byteLength:2,components:4};case fi:case th:case An:return{byteLength:4,components:1};case yc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function J_(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ct,c=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,M){return f?new OffscreenCanvas(A,M):$r("canvas")}function g(A,M,z){let $=1;const J=Nt(A);if((J.width>z||J.height>z)&&($=z/Math.max(J.width,J.height)),$<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const K=Math.floor($*J.width),Tt=Math.floor($*J.height);u===void 0&&(u=_(K,Tt));const ht=M?_(K,Tt):u;return ht.width=K,ht.height=Tt,ht.getContext("2d").drawImage(A,0,0,K,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+K+"x"+Tt+")."),ht}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),A;return A}function p(A){return A.generateMipmaps&&A.minFilter!==sn&&A.minFilter!==Ke}function m(A){n.generateMipmap(A)}function x(A,M,z,$,J=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=M;if(M===n.RED&&(z===n.FLOAT&&(K=n.R32F),z===n.HALF_FLOAT&&(K=n.R16F),z===n.UNSIGNED_BYTE&&(K=n.R8)),M===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.R8UI),z===n.UNSIGNED_SHORT&&(K=n.R16UI),z===n.UNSIGNED_INT&&(K=n.R32UI),z===n.BYTE&&(K=n.R8I),z===n.SHORT&&(K=n.R16I),z===n.INT&&(K=n.R32I)),M===n.RG&&(z===n.FLOAT&&(K=n.RG32F),z===n.HALF_FLOAT&&(K=n.RG16F),z===n.UNSIGNED_BYTE&&(K=n.RG8)),M===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.RG8UI),z===n.UNSIGNED_SHORT&&(K=n.RG16UI),z===n.UNSIGNED_INT&&(K=n.RG32UI),z===n.BYTE&&(K=n.RG8I),z===n.SHORT&&(K=n.RG16I),z===n.INT&&(K=n.RG32I)),M===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),M===n.RGBA){const Tt=J?Wr:$t.getTransfer($);z===n.FLOAT&&(K=n.RGBA32F),z===n.HALF_FLOAT&&(K=n.RGBA16F),z===n.UNSIGNED_BYTE&&(K=Tt===te?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function v(A,M){let z;return A?M===null||M===fi||M===ns?z=n.DEPTH24_STENCIL8:M===An?z=n.DEPTH32F_STENCIL8:M===Ls&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===fi||M===ns?z=n.DEPTH_COMPONENT24:M===An?z=n.DEPTH_COMPONENT32F:M===Ls&&(z=n.DEPTH_COMPONENT16),z}function S(A,M){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==sn&&A.minFilter!==Ke?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function L(A){const M=A.target;M.removeEventListener("dispose",L),w(M),M.isVideoTexture&&c.delete(M)}function b(A){const M=A.target;M.removeEventListener("dispose",b),E(M)}function w(A){const M=i.get(A);if(M.__webglInit===void 0)return;const z=A.source,$=d.get(z);if($){const J=$[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&C(A),Object.keys($).length===0&&d.delete(z)}i.remove(A)}function C(A){const M=i.get(A);n.deleteTexture(M.__webglTexture);const z=A.source,$=d.get(z);delete $[M.__cacheKey],a.memory.textures--}function E(A){const M=i.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(M.__webglFramebuffer[$]))for(let J=0;J<M.__webglFramebuffer[$].length;J++)n.deleteFramebuffer(M.__webglFramebuffer[$][J]);else n.deleteFramebuffer(M.__webglFramebuffer[$]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[$])}else{if(Array.isArray(M.__webglFramebuffer))for(let $=0;$<M.__webglFramebuffer.length;$++)n.deleteFramebuffer(M.__webglFramebuffer[$]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let $=0;$<M.__webglColorRenderbuffer.length;$++)M.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[$]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const z=A.textures;for(let $=0,J=z.length;$<J;$++){const K=i.get(z[$]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),a.memory.textures--),i.remove(z[$])}i.remove(A)}let y=0;function P(){y=0}function k(){const A=y;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),y+=1,A}function B(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function W(A,M){const z=i.get(A);if(A.isVideoTexture&&ue(A),A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){const $=A.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Zt(z,A,M);return}}e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+M)}function Z(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){Zt(z,A,M);return}e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+M)}function V(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){Zt(z,A,M);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+M)}function Q(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){X(z,A,M);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+M)}const H={[ho]:n.REPEAT,[li]:n.CLAMP_TO_EDGE,[lo]:n.MIRRORED_REPEAT},ut={[sn]:n.NEAREST,[Tf]:n.NEAREST_MIPMAP_NEAREST,[Qs]:n.NEAREST_MIPMAP_LINEAR,[Ke]:n.LINEAR,[Sa]:n.LINEAR_MIPMAP_NEAREST,[ci]:n.LINEAR_MIPMAP_LINEAR},mt={[Rf]:n.NEVER,[Uf]:n.ALWAYS,[Cf]:n.LESS,[Rc]:n.LEQUAL,[Lf]:n.EQUAL,[Df]:n.GEQUAL,[If]:n.GREATER,[Nf]:n.NOTEQUAL};function xt(A,M){if(M.type===An&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Ke||M.magFilter===Sa||M.magFilter===Qs||M.magFilter===ci||M.minFilter===Ke||M.minFilter===Sa||M.minFilter===Qs||M.minFilter===ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,H[M.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,H[M.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,H[M.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ut[M.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ut[M.minFilter]),M.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,mt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===sn||M.minFilter!==Qs&&M.minFilter!==ci||M.type===An&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Bt(A,M){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",L));const $=M.source;let J=d.get($);J===void 0&&(J={},d.set($,J));const K=B(M);if(K!==A.__cacheKey){J[K]===void 0&&(J[K]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),J[K].usedTimes++;const Tt=J[A.__cacheKey];Tt!==void 0&&(J[A.__cacheKey].usedTimes--,Tt.usedTimes===0&&C(M)),A.__cacheKey=K,A.__webglTexture=J[K].texture}return z}function Zt(A,M,z){let $=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&($=n.TEXTURE_3D);const J=Bt(A,M),K=M.source;e.bindTexture($,A.__webglTexture,n.TEXTURE0+z);const Tt=i.get(K);if(K.version!==Tt.__version||J===!0){e.activeTexture(n.TEXTURE0+z);const ht=$t.getPrimaries($t.workingColorSpace),pt=M.colorSpace===kn?null:$t.getPrimaries(M.colorSpace),Dt=M.colorSpace===kn||ht===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let et=g(M.image,!1,s.maxTextureSize);et=Ct(M,et);const ft=r.convert(M.format,M.colorSpace),zt=r.convert(M.type);let Rt=x(M.internalFormat,ft,zt,M.colorSpace,M.isVideoTexture);xt($,M);let _t;const Lt=M.mipmaps,Ft=M.isVideoTexture!==!0,ee=Tt.__version===void 0||J===!0,I=K.dataReady,nt=S(M,et);if(M.isDepthTexture)Rt=v(M.format===is,M.type),ee&&(Ft?e.texStorage2D(n.TEXTURE_2D,1,Rt,et.width,et.height):e.texImage2D(n.TEXTURE_2D,0,Rt,et.width,et.height,0,ft,zt,null));else if(M.isDataTexture)if(Lt.length>0){Ft&&ee&&e.texStorage2D(n.TEXTURE_2D,nt,Rt,Lt[0].width,Lt[0].height);for(let q=0,Y=Lt.length;q<Y;q++)_t=Lt[q],Ft?I&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,_t.width,_t.height,ft,zt,_t.data):e.texImage2D(n.TEXTURE_2D,q,Rt,_t.width,_t.height,0,ft,zt,_t.data);M.generateMipmaps=!1}else Ft?(ee&&e.texStorage2D(n.TEXTURE_2D,nt,Rt,et.width,et.height),I&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,et.width,et.height,ft,zt,et.data)):e.texImage2D(n.TEXTURE_2D,0,Rt,et.width,et.height,0,ft,zt,et.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ft&&ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,Rt,Lt[0].width,Lt[0].height,et.depth);for(let q=0,Y=Lt.length;q<Y;q++)if(_t=Lt[q],M.format!==fn)if(ft!==null)if(Ft){if(I)if(M.layerUpdates.size>0){const rt=Pl(_t.width,_t.height,M.format,M.type);for(const bt of M.layerUpdates){const kt=_t.data.subarray(bt*rt/_t.data.BYTES_PER_ELEMENT,(bt+1)*rt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,bt,_t.width,_t.height,1,ft,kt,0,0)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,_t.width,_t.height,et.depth,ft,_t.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,q,Rt,_t.width,_t.height,et.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?I&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,_t.width,_t.height,et.depth,ft,zt,_t.data):e.texImage3D(n.TEXTURE_2D_ARRAY,q,Rt,_t.width,_t.height,et.depth,0,ft,zt,_t.data)}else{Ft&&ee&&e.texStorage2D(n.TEXTURE_2D,nt,Rt,Lt[0].width,Lt[0].height);for(let q=0,Y=Lt.length;q<Y;q++)_t=Lt[q],M.format!==fn?ft!==null?Ft?I&&e.compressedTexSubImage2D(n.TEXTURE_2D,q,0,0,_t.width,_t.height,ft,_t.data):e.compressedTexImage2D(n.TEXTURE_2D,q,Rt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?I&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,_t.width,_t.height,ft,zt,_t.data):e.texImage2D(n.TEXTURE_2D,q,Rt,_t.width,_t.height,0,ft,zt,_t.data)}else if(M.isDataArrayTexture)if(Ft){if(ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,Rt,et.width,et.height,et.depth),I)if(M.layerUpdates.size>0){const q=Pl(et.width,et.height,M.format,M.type);for(const Y of M.layerUpdates){const rt=et.data.subarray(Y*q/et.data.BYTES_PER_ELEMENT,(Y+1)*q/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Y,et.width,et.height,1,ft,zt,rt)}M.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ft,zt,et.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Rt,et.width,et.height,et.depth,0,ft,zt,et.data);else if(M.isData3DTexture)Ft?(ee&&e.texStorage3D(n.TEXTURE_3D,nt,Rt,et.width,et.height,et.depth),I&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ft,zt,et.data)):e.texImage3D(n.TEXTURE_3D,0,Rt,et.width,et.height,et.depth,0,ft,zt,et.data);else if(M.isFramebufferTexture){if(ee)if(Ft)e.texStorage2D(n.TEXTURE_2D,nt,Rt,et.width,et.height);else{let q=et.width,Y=et.height;for(let rt=0;rt<nt;rt++)e.texImage2D(n.TEXTURE_2D,rt,Rt,q,Y,0,ft,zt,null),q>>=1,Y>>=1}}else if(Lt.length>0){if(Ft&&ee){const q=Nt(Lt[0]);e.texStorage2D(n.TEXTURE_2D,nt,Rt,q.width,q.height)}for(let q=0,Y=Lt.length;q<Y;q++)_t=Lt[q],Ft?I&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,ft,zt,_t):e.texImage2D(n.TEXTURE_2D,q,Rt,ft,zt,_t);M.generateMipmaps=!1}else if(Ft){if(ee){const q=Nt(et);e.texStorage2D(n.TEXTURE_2D,nt,Rt,q.width,q.height)}I&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ft,zt,et)}else e.texImage2D(n.TEXTURE_2D,0,Rt,ft,zt,et);p(M)&&m($),Tt.__version=K.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function X(A,M,z){if(M.image.length!==6)return;const $=Bt(A,M),J=M.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+z);const K=i.get(J);if(J.version!==K.__version||$===!0){e.activeTexture(n.TEXTURE0+z);const Tt=$t.getPrimaries($t.workingColorSpace),ht=M.colorSpace===kn?null:$t.getPrimaries(M.colorSpace),pt=M.colorSpace===kn||Tt===ht?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Dt=M.isCompressedTexture||M.image[0].isCompressedTexture,et=M.image[0]&&M.image[0].isDataTexture,ft=[];for(let Y=0;Y<6;Y++)!Dt&&!et?ft[Y]=g(M.image[Y],!0,s.maxCubemapSize):ft[Y]=et?M.image[Y].image:M.image[Y],ft[Y]=Ct(M,ft[Y]);const zt=ft[0],Rt=r.convert(M.format,M.colorSpace),_t=r.convert(M.type),Lt=x(M.internalFormat,Rt,_t,M.colorSpace),Ft=M.isVideoTexture!==!0,ee=K.__version===void 0||$===!0,I=J.dataReady;let nt=S(M,zt);xt(n.TEXTURE_CUBE_MAP,M);let q;if(Dt){Ft&&ee&&e.texStorage2D(n.TEXTURE_CUBE_MAP,nt,Lt,zt.width,zt.height);for(let Y=0;Y<6;Y++){q=ft[Y].mipmaps;for(let rt=0;rt<q.length;rt++){const bt=q[rt];M.format!==fn?Rt!==null?Ft?I&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,rt,0,0,bt.width,bt.height,Rt,bt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,rt,Lt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?I&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,rt,0,0,bt.width,bt.height,Rt,_t,bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,rt,Lt,bt.width,bt.height,0,Rt,_t,bt.data)}}}else{if(q=M.mipmaps,Ft&&ee){q.length>0&&nt++;const Y=Nt(ft[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,nt,Lt,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(et){Ft?I&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ft[Y].width,ft[Y].height,Rt,_t,ft[Y].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Lt,ft[Y].width,ft[Y].height,0,Rt,_t,ft[Y].data);for(let rt=0;rt<q.length;rt++){const kt=q[rt].image[Y].image;Ft?I&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,rt+1,0,0,kt.width,kt.height,Rt,_t,kt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,rt+1,Lt,kt.width,kt.height,0,Rt,_t,kt.data)}}else{Ft?I&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Rt,_t,ft[Y]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Lt,Rt,_t,ft[Y]);for(let rt=0;rt<q.length;rt++){const bt=q[rt];Ft?I&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,rt+1,0,0,Rt,_t,bt.image[Y]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,rt+1,Lt,Rt,_t,bt.image[Y])}}}p(M)&&m(n.TEXTURE_CUBE_MAP),K.__version=J.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function tt(A,M,z,$,J,K){const Tt=r.convert(z.format,z.colorSpace),ht=r.convert(z.type),pt=x(z.internalFormat,Tt,ht,z.colorSpace);if(!i.get(M).__hasExternalTextures){const et=Math.max(1,M.width>>K),ft=Math.max(1,M.height>>K);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?e.texImage3D(J,K,pt,et,ft,M.depth,0,Tt,ht,null):e.texImage2D(J,K,pt,et,ft,0,Tt,ht,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),Et(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,J,i.get(z).__webglTexture,0,Jt(M)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,J,i.get(z).__webglTexture,K),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Mt(A,M,z){if(n.bindRenderbuffer(n.RENDERBUFFER,A),M.depthBuffer){const $=M.depthTexture,J=$&&$.isDepthTexture?$.type:null,K=v(M.stencilBuffer,J),Tt=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=Jt(M);Et(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ht,K,M.width,M.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,ht,K,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,K,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Tt,n.RENDERBUFFER,A)}else{const $=M.textures;for(let J=0;J<$.length;J++){const K=$[J],Tt=r.convert(K.format,K.colorSpace),ht=r.convert(K.type),pt=x(K.internalFormat,Tt,ht,K.colorSpace),Dt=Jt(M);z&&Et(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Dt,pt,M.width,M.height):Et(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Dt,pt,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,pt,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function dt(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),W(M.depthTexture,0);const $=i.get(M.depthTexture).__webglTexture,J=Jt(M);if(M.depthTexture.format===Ki)Et(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0);else if(M.depthTexture.format===is)Et(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function At(A){const M=i.get(A),z=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const $=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),$){const J=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,$.removeEventListener("dispose",J)};$.addEventListener("dispose",J),M.__depthDisposeCallback=J}M.__boundDepthTexture=$}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");dt(M.__webglFramebuffer,A)}else if(z){M.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[$]),M.__webglDepthbuffer[$]===void 0)M.__webglDepthbuffer[$]=n.createRenderbuffer(),Mt(M.__webglDepthbuffer[$],A,!1);else{const J=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=M.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,K)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),Mt(M.__webglDepthbuffer,A,!1);else{const $=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,J)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function It(A,M,z){const $=i.get(A);M!==void 0&&tt($.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&At(A)}function Gt(A){const M=A.texture,z=i.get(A),$=i.get(M);A.addEventListener("dispose",b);const J=A.textures,K=A.isWebGLCubeRenderTarget===!0,Tt=J.length>1;if(Tt||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=M.version,a.memory.textures++),K){z.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[ht]=[];for(let pt=0;pt<M.mipmaps.length;pt++)z.__webglFramebuffer[ht][pt]=n.createFramebuffer()}else z.__webglFramebuffer[ht]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let ht=0;ht<M.mipmaps.length;ht++)z.__webglFramebuffer[ht]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(Tt)for(let ht=0,pt=J.length;ht<pt;ht++){const Dt=i.get(J[ht]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Et(A)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ht=0;ht<J.length;ht++){const pt=J[ht];z.__webglColorRenderbuffer[ht]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[ht]);const Dt=r.convert(pt.format,pt.colorSpace),et=r.convert(pt.type),ft=x(pt.internalFormat,Dt,et,pt.colorSpace,A.isXRRenderTarget===!0),zt=Jt(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,zt,ft,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,z.__webglColorRenderbuffer[ht])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Mt(z.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),xt(n.TEXTURE_CUBE_MAP,M);for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0)for(let pt=0;pt<M.mipmaps.length;pt++)tt(z.__webglFramebuffer[ht][pt],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,pt);else tt(z.__webglFramebuffer[ht],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);p(M)&&m(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let ht=0,pt=J.length;ht<pt;ht++){const Dt=J[ht],et=i.get(Dt);e.bindTexture(n.TEXTURE_2D,et.__webglTexture),xt(n.TEXTURE_2D,Dt),tt(z.__webglFramebuffer,A,Dt,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,0),p(Dt)&&m(n.TEXTURE_2D)}e.unbindTexture()}else{let ht=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ht=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ht,$.__webglTexture),xt(ht,M),M.mipmaps&&M.mipmaps.length>0)for(let pt=0;pt<M.mipmaps.length;pt++)tt(z.__webglFramebuffer[pt],A,M,n.COLOR_ATTACHMENT0,ht,pt);else tt(z.__webglFramebuffer,A,M,n.COLOR_ATTACHMENT0,ht,0);p(M)&&m(ht),e.unbindTexture()}A.depthBuffer&&At(A)}function se(A){const M=A.textures;for(let z=0,$=M.length;z<$;z++){const J=M[z];if(p(J)){const K=A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Tt=i.get(J).__webglTexture;e.bindTexture(K,Tt),m(K),e.unbindTexture()}}}const R=[],ce=[];function jt(A){if(A.samples>0){if(Et(A)===!1){const M=A.textures,z=A.width,$=A.height;let J=n.COLOR_BUFFER_BIT;const K=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Tt=i.get(A),ht=M.length>1;if(ht)for(let pt=0;pt<M.length;pt++)e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let pt=0;pt<M.length;pt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),ht){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Tt.__webglColorRenderbuffer[pt]);const Dt=i.get(M[pt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Dt,0)}n.blitFramebuffer(0,0,z,$,0,0,z,$,J,n.NEAREST),h===!0&&(R.length=0,ce.length=0,R.push(n.COLOR_ATTACHMENT0+pt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(R.push(K),ce.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ce)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,R))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ht)for(let pt=0;pt<M.length;pt++){e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,Tt.__webglColorRenderbuffer[pt]);const Dt=i.get(M[pt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.TEXTURE_2D,Dt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&h){const M=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Jt(A){return Math.min(s.maxSamples,A.samples)}function Et(A){const M=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ue(A){const M=a.render.frame;c.get(A)!==M&&(c.set(A,M),A.update())}function Ct(A,M){const z=A.colorSpace,$=A.format,J=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==Kn&&z!==kn&&($t.getTransfer(z)===te?($!==fn||J!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}function Nt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=P,this.setTexture2D=W,this.setTexture2DArray=Z,this.setTexture3D=V,this.setTextureCube=Q,this.rebindTextures=It,this.setupRenderTarget=Gt,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=At,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=Et}function Q_(n,t){function e(i,s=kn){let r;const a=$t.getTransfer(s);if(i===Cn)return n.UNSIGNED_BYTE;if(i===eh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===nh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===yc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Mc)return n.BYTE;if(i===xc)return n.SHORT;if(i===Ls)return n.UNSIGNED_SHORT;if(i===th)return n.INT;if(i===fi)return n.UNSIGNED_INT;if(i===An)return n.FLOAT;if(i===ks)return n.HALF_FLOAT;if(i===Sc)return n.ALPHA;if(i===Ec)return n.RGB;if(i===fn)return n.RGBA;if(i===Tc)return n.LUMINANCE;if(i===bc)return n.LUMINANCE_ALPHA;if(i===Ki)return n.DEPTH_COMPONENT;if(i===is)return n.DEPTH_STENCIL;if(i===wc)return n.RED;if(i===ih)return n.RED_INTEGER;if(i===Ac)return n.RG;if(i===sh)return n.RG_INTEGER;if(i===rh)return n.RGBA_INTEGER;if(i===Nr||i===Dr||i===Ur||i===Or)if(a===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Nr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Nr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===co||i===uo||i===fo||i===po)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===co)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===uo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===po)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===mo||i===_o||i===go)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===mo||i===_o)return a===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===go)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===vo||i===Mo||i===xo||i===yo||i===So||i===Eo||i===To||i===bo||i===wo||i===Ao||i===Po||i===Ro||i===Co||i===Lo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===vo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Mo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===yo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===So)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Eo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===To)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===bo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===wo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ao)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Po)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ro)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Co)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Lo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Fr||i===Io||i===No)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Fr)return a===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Io)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===No)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Pc||i===Do||i===Uo||i===Oo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Fr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Do)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Uo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Oo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ns?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class tg extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ui extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const eg={type:"move"};class Ya{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const g of t.hand.values()){const p=e.getJointPose(g,i),m=this._getHandJoint(l,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const c=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=c.position.distanceTo(u.position),f=.02,_=.005;l.inputState.pinching&&d>f+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(eg)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new ui;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const ng=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ig=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class sg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Ne,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new qn({vertexShader:ng,fragmentShader:ig,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new je(new Xs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rg extends vi{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",h=1,l=null,c=null,u=null,d=null,f=null,_=null;const g=new sg,p=e.getContextAttributes();let m=null,x=null;const v=[],S=[],L=new ct;let b=null;const w=new nn;w.layers.enable(1),w.viewport=new ye;const C=new nn;C.layers.enable(2),C.viewport=new ye;const E=[w,C],y=new tg;y.layers.enable(1),y.layers.enable(2);let P=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let tt=v[X];return tt===void 0&&(tt=new Ya,v[X]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(X){let tt=v[X];return tt===void 0&&(tt=new Ya,v[X]=tt),tt.getGripSpace()},this.getHand=function(X){let tt=v[X];return tt===void 0&&(tt=new Ya,v[X]=tt),tt.getHandSpace()};function B(X){const tt=S.indexOf(X.inputSource);if(tt===-1)return;const Mt=v[tt];Mt!==void 0&&(Mt.update(X.inputSource,X.frame,l||a),Mt.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Z);for(let X=0;X<v.length;X++){const tt=S[X];tt!==null&&(S[X]=null,v[X].disconnect(tt))}P=null,k=null,g.reset(),t.setRenderTarget(m),f=null,d=null,u=null,s=null,x=null,Zt.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Z),p.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const tt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new di(f.framebufferWidth,f.framebufferHeight,{format:fn,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let tt=null,Mt=null,dt=null;p.depth&&(dt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=p.stencil?is:Ki,Mt=p.stencil?ns:fi);const At={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(At),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new di(d.textureWidth,d.textureHeight,{format:fn,type:Cn,depthTexture:new Hc(d.textureWidth,d.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(h),l=null,a=await s.requestReferenceSpace(o),Zt.setContext(s),Zt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Z(X){for(let tt=0;tt<X.removed.length;tt++){const Mt=X.removed[tt],dt=S.indexOf(Mt);dt>=0&&(S[dt]=null,v[dt].disconnect(Mt))}for(let tt=0;tt<X.added.length;tt++){const Mt=X.added[tt];let dt=S.indexOf(Mt);if(dt===-1){for(let It=0;It<v.length;It++)if(It>=S.length){S.push(Mt),dt=It;break}else if(S[It]===null){S[It]=Mt,dt=It;break}if(dt===-1)break}const At=v[dt];At&&At.connect(Mt)}}const V=new D,Q=new D;function H(X,tt,Mt){V.setFromMatrixPosition(tt.matrixWorld),Q.setFromMatrixPosition(Mt.matrixWorld);const dt=V.distanceTo(Q),At=tt.projectionMatrix.elements,It=Mt.projectionMatrix.elements,Gt=At[14]/(At[10]-1),se=At[14]/(At[10]+1),R=(At[9]+1)/At[5],ce=(At[9]-1)/At[5],jt=(At[8]-1)/At[0],Jt=(It[8]+1)/It[0],Et=Gt*jt,ue=Gt*Jt,Ct=dt/(-jt+Jt),Nt=Ct*-jt;if(tt.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Nt),X.translateZ(Ct),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),At[10]===-1)X.projectionMatrix.copy(tt.projectionMatrix),X.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const A=Gt+Ct,M=se+Ct,z=Et-Nt,$=ue+(dt-Nt),J=R*se/M*A,K=ce*se/M*A;X.projectionMatrix.makePerspective(z,$,J,K,A,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ut(X,tt){tt===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(tt.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let tt=X.near,Mt=X.far;g.texture!==null&&(g.depthNear>0&&(tt=g.depthNear),g.depthFar>0&&(Mt=g.depthFar)),y.near=C.near=w.near=tt,y.far=C.far=w.far=Mt,(P!==y.near||k!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,k=y.far);const dt=X.parent,At=y.cameras;ut(y,dt);for(let It=0;It<At.length;It++)ut(At[It],dt);At.length===2?H(y,w,C):y.projectionMatrix.copy(w.projectionMatrix),mt(X,y,dt)};function mt(X,tt,Mt){Mt===null?X.matrix.copy(tt.matrixWorld):(X.matrix.copy(Mt.matrixWorld),X.matrix.invert(),X.matrix.multiply(tt.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(tt.projectionMatrix),X.projectionMatrixInverse.copy(tt.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Is*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return h},this.setFoveation=function(X){h=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(y)};let xt=null;function Bt(X,tt){if(c=tt.getViewerPose(l||a),_=tt,c!==null){const Mt=c.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let dt=!1;Mt.length!==y.cameras.length&&(y.cameras.length=0,dt=!0);for(let It=0;It<Mt.length;It++){const Gt=Mt[It];let se=null;if(f!==null)se=f.getViewport(Gt);else{const ce=u.getViewSubImage(d,Gt);se=ce.viewport,It===0&&(t.setRenderTargetTextures(x,ce.colorTexture,d.ignoreDepthValues?void 0:ce.depthStencilTexture),t.setRenderTarget(x))}let R=E[It];R===void 0&&(R=new nn,R.layers.enable(It),R.viewport=new ye,E[It]=R),R.matrix.fromArray(Gt.transform.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale),R.projectionMatrix.fromArray(Gt.projectionMatrix),R.projectionMatrixInverse.copy(R.projectionMatrix).invert(),R.viewport.set(se.x,se.y,se.width,se.height),It===0&&(y.matrix.copy(R.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),dt===!0&&y.cameras.push(R)}const At=s.enabledFeatures;if(At&&At.includes("depth-sensing")){const It=u.getDepthInformation(Mt[0]);It&&It.isValid&&It.texture&&g.init(t,It,s.renderState)}}for(let Mt=0;Mt<v.length;Mt++){const dt=S[Mt],At=v[Mt];dt!==null&&At!==void 0&&At.update(dt,tt,l||a)}xt&&xt(X,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),_=null}const Zt=new kc;Zt.setAnimationLoop(Bt),this.setAnimationLoop=function(X){xt=X},this.dispose=function(){}}}const ii=new Ln,ag=new he;function og(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Fc(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,x,v,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),c(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,S)):m.isMeshMatcapMaterial?(r(p,m),_(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),g(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?h(p,m,x,v):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===ze&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===ze&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=t.get(m),v=x.envMap,S=x.envMapRotation;v&&(p.envMap.value=v,ii.copy(S),ii.x*=-1,ii.y*=-1,ii.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),p.envMapRotation.value.setFromMatrix4(ag.makeRotationFromEuler(ii)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function h(p,m,x,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ze&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const x=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function hg(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function h(x,v){const S=v.program;i.uniformBlockBinding(x,S)}function l(x,v){let S=s[x.id];S===void 0&&(_(x),S=c(x),s[x.id]=S,x.addEventListener("dispose",p));const L=v.program;i.updateUBOMapping(x,L);const b=t.render.frame;r[x.id]!==b&&(d(x),r[x.id]=b)}function c(x){const v=u();x.__bindingPointIndex=v;const S=n.createBuffer(),L=x.__size,b=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,L,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,S),S}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const v=s[x.id],S=x.uniforms,L=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let b=0,w=S.length;b<w;b++){const C=Array.isArray(S[b])?S[b]:[S[b]];for(let E=0,y=C.length;E<y;E++){const P=C[E];if(f(P,b,E,L)===!0){const k=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let W=0;for(let Z=0;Z<B.length;Z++){const V=B[Z],Q=g(V);typeof V=="number"||typeof V=="boolean"?(P.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,k+W,P.__data)):V.isMatrix3?(P.__data[0]=V.elements[0],P.__data[1]=V.elements[1],P.__data[2]=V.elements[2],P.__data[3]=0,P.__data[4]=V.elements[3],P.__data[5]=V.elements[4],P.__data[6]=V.elements[5],P.__data[7]=0,P.__data[8]=V.elements[6],P.__data[9]=V.elements[7],P.__data[10]=V.elements[8],P.__data[11]=0):(V.toArray(P.__data,W),W+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(x,v,S,L){const b=x.value,w=v+"_"+S;if(L[w]===void 0)return typeof b=="number"||typeof b=="boolean"?L[w]=b:L[w]=b.clone(),!0;{const C=L[w];if(typeof b=="number"||typeof b=="boolean"){if(C!==b)return L[w]=b,!0}else if(C.equals(b)===!1)return C.copy(b),!0}return!1}function _(x){const v=x.uniforms;let S=0;const L=16;for(let w=0,C=v.length;w<C;w++){const E=Array.isArray(v[w])?v[w]:[v[w]];for(let y=0,P=E.length;y<P;y++){const k=E[y],B=Array.isArray(k.value)?k.value:[k.value];for(let W=0,Z=B.length;W<Z;W++){const V=B[W],Q=g(V),H=S%L,ut=H%Q.boundary,mt=H+ut;S+=ut,mt!==0&&L-mt<Q.storage&&(S+=L-mt),k.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=S,S+=Q.storage}}}const b=S%L;return b>0&&(S+=L-b),x.__size=S,x.__cache={},this}function g(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const S=a.indexOf(v.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function m(){for(const x in s)n.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:h,update:l,dispose:m}}class mS{constructor(t={}){const{canvas:e=Jf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=a;const f=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=cn,this.toneMapping=Wn,this.toneMappingExposure=1;const v=this;let S=!1,L=0,b=0,w=null,C=-1,E=null;const y=new ye,P=new ye;let k=null;const B=new Kt(0);let W=0,Z=e.width,V=e.height,Q=1,H=null,ut=null;const mt=new ye(0,0,Z,V),xt=new ye(0,0,Z,V);let Bt=!1;const Zt=new zc;let X=!1,tt=!1;const Mt=new he,dt=new D,At=new ye,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function se(){return w===null?Q:1}let R=i;function ce(T,N){return e.getContext(T,N)}try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Qo}`),e.addEventListener("webglcontextlost",q,!1),e.addEventListener("webglcontextrestored",Y,!1),e.addEventListener("webglcontextcreationerror",rt,!1),R===null){const N="webgl2";if(R=ce(N,T),R===null)throw ce(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let jt,Jt,Et,ue,Ct,Nt,A,M,z,$,J,K,Tt,ht,pt,Dt,et,ft,zt,Rt,_t,Lt,Ft,ee;function I(){jt=new m0(R),jt.init(),Lt=new Q_(R,jt),Jt=new h0(R,jt,t,Lt),Et=new j_(R),ue=new v0(R),Ct=new O_,Nt=new J_(R,jt,Et,Ct,Jt,Lt,ue),A=new c0(v),M=new p0(v),z=new Td(R),Ft=new a0(R,z),$=new _0(R,z,ue,Ft),J=new x0(R,$,z,ue),zt=new M0(R,Jt,Nt),Dt=new l0(Ct),K=new U_(v,A,M,jt,Jt,Ft,Dt),Tt=new og(v,Ct),ht=new G_,pt=new W_(jt),ft=new r0(v,A,M,Et,J,d,h),et=new K_(v,J,Jt),ee=new hg(R,ue,Jt,Et),Rt=new o0(R,jt,ue),_t=new g0(R,jt,ue),ue.programs=K.programs,v.capabilities=Jt,v.extensions=jt,v.properties=Ct,v.renderLists=ht,v.shadowMap=et,v.state=Et,v.info=ue}I();const nt=new rg(v,R);this.xr=nt,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const T=jt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=jt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(T){T!==void 0&&(Q=T,this.setSize(Z,V,!1))},this.getSize=function(T){return T.set(Z,V)},this.setSize=function(T,N,F=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=T,V=N,e.width=Math.floor(T*Q),e.height=Math.floor(N*Q),F===!0&&(e.style.width=T+"px",e.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(Z*Q,V*Q).floor()},this.setDrawingBufferSize=function(T,N,F){Z=T,V=N,Q=F,e.width=Math.floor(T*F),e.height=Math.floor(N*F),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(y)},this.getViewport=function(T){return T.copy(mt)},this.setViewport=function(T,N,F,G){T.isVector4?mt.set(T.x,T.y,T.z,T.w):mt.set(T,N,F,G),Et.viewport(y.copy(mt).multiplyScalar(Q).round())},this.getScissor=function(T){return T.copy(xt)},this.setScissor=function(T,N,F,G){T.isVector4?xt.set(T.x,T.y,T.z,T.w):xt.set(T,N,F,G),Et.scissor(P.copy(xt).multiplyScalar(Q).round())},this.getScissorTest=function(){return Bt},this.setScissorTest=function(T){Et.setScissorTest(Bt=T)},this.setOpaqueSort=function(T){H=T},this.setTransparentSort=function(T){ut=T},this.getClearColor=function(T){return T.copy(ft.getClearColor())},this.setClearColor=function(){ft.setClearColor.apply(ft,arguments)},this.getClearAlpha=function(){return ft.getClearAlpha()},this.setClearAlpha=function(){ft.setClearAlpha.apply(ft,arguments)},this.clear=function(T=!0,N=!0,F=!0){let G=0;if(T){let O=!1;if(w!==null){const it=w.texture.format;O=it===rh||it===sh||it===ih}if(O){const it=w.texture.type,lt=it===Cn||it===fi||it===Ls||it===ns||it===eh||it===nh,gt=ft.getClearColor(),vt=ft.getClearAlpha(),wt=gt.r,Pt=gt.g,yt=gt.b;lt?(f[0]=wt,f[1]=Pt,f[2]=yt,f[3]=vt,R.clearBufferuiv(R.COLOR,0,f)):(_[0]=wt,_[1]=Pt,_[2]=yt,_[3]=vt,R.clearBufferiv(R.COLOR,0,_))}else G|=R.COLOR_BUFFER_BIT}N&&(G|=R.DEPTH_BUFFER_BIT),F&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",q,!1),e.removeEventListener("webglcontextrestored",Y,!1),e.removeEventListener("webglcontextcreationerror",rt,!1),ht.dispose(),pt.dispose(),Ct.dispose(),A.dispose(),M.dispose(),J.dispose(),Ft.dispose(),ee.dispose(),K.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",pn),nt.removeEventListener("sessionend",bh),Zn.stop()};function q(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function Y(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const T=ue.autoReset,N=et.enabled,F=et.autoUpdate,G=et.needsUpdate,O=et.type;I(),ue.autoReset=T,et.enabled=N,et.autoUpdate=F,et.needsUpdate=G,et.type=O}function rt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function bt(T){const N=T.target;N.removeEventListener("dispose",bt),kt(N)}function kt(T){fe(T),Ct.remove(T)}function fe(T){const N=Ct.get(T).programs;N!==void 0&&(N.forEach(function(F){K.releaseProgram(F)}),T.isShaderMaterial&&K.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,F,G,O,it){N===null&&(N=It);const lt=O.isMesh&&O.matrixWorld.determinant()<0,gt=Du(T,N,F,G,O);Et.setMaterial(G,lt);let vt=F.index,wt=1;if(G.wireframe===!0){if(vt=$.getWireframeAttribute(F),vt===void 0)return;wt=2}const Pt=F.drawRange,yt=F.attributes.position;let Vt=Pt.start*wt,re=(Pt.start+Pt.count)*wt;it!==null&&(Vt=Math.max(Vt,it.start*wt),re=Math.min(re,(it.start+it.count)*wt)),vt!==null?(Vt=Math.max(Vt,0),re=Math.min(re,vt.count)):yt!=null&&(Vt=Math.max(Vt,0),re=Math.min(re,yt.count));const ae=re-Vt;if(ae<0||ae===1/0)return;Ft.setup(O,G,gt,F,vt);let We,Wt=Rt;if(vt!==null&&(We=z.get(vt),Wt=_t,Wt.setIndex(We)),O.isMesh)G.wireframe===!0?(Et.setLineWidth(G.wireframeLinewidth*se()),Wt.setMode(R.LINES)):Wt.setMode(R.TRIANGLES);else if(O.isLine){let St=G.linewidth;St===void 0&&(St=1),Et.setLineWidth(St*se()),O.isLineSegments?Wt.setMode(R.LINES):O.isLineLoop?Wt.setMode(R.LINE_LOOP):Wt.setMode(R.LINE_STRIP)}else O.isPoints?Wt.setMode(R.POINTS):O.isSprite&&Wt.setMode(R.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Wt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))Wt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const St=O._multiDrawStarts,Ee=O._multiDrawCounts,Xt=O._multiDrawCount,an=vt?z.get(vt).bytesPerElement:1,xi=Ct.get(G).currentProgram.getUniforms();for(let Xe=0;Xe<Xt;Xe++)xi.setValue(R,"_gl_DrawID",Xe),Wt.render(St[Xe]/an,Ee[Xe])}else if(O.isInstancedMesh)Wt.renderInstances(Vt,ae,O.count);else if(F.isInstancedBufferGeometry){const St=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Ee=Math.min(F.instanceCount,St);Wt.renderInstances(Vt,ae,Ee)}else Wt.render(Vt,ae)};function Se(T,N,F){T.transparent===!0&&T.side===un&&T.forceSinglePass===!1?(T.side=ze,T.needsUpdate=!0,Js(T,N,F),T.side=Xn,T.needsUpdate=!0,Js(T,N,F),T.side=un):Js(T,N,F)}this.compile=function(T,N,F=null){F===null&&(F=T),p=pt.get(F),p.init(N),x.push(p),F.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),T!==F&&T.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const G=new Set;return T.traverse(function(O){const it=O.material;if(it)if(Array.isArray(it))for(let lt=0;lt<it.length;lt++){const gt=it[lt];Se(gt,F,O),G.add(gt)}else Se(it,F,O),G.add(it)}),x.pop(),p=null,G},this.compileAsync=function(T,N,F=null){const G=this.compile(T,N,F);return new Promise(O=>{function it(){if(G.forEach(function(lt){Ct.get(lt).currentProgram.isReady()&&G.delete(lt)}),G.size===0){O(T);return}setTimeout(it,10)}jt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Ht=null;function xn(T){Ht&&Ht(T)}function pn(){Zn.stop()}function bh(){Zn.start()}const Zn=new kc;Zn.setAnimationLoop(xn),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(T){Ht=T,nt.setAnimationLoop(T),T===null?Zn.stop():Zn.start()},nt.addEventListener("sessionstart",pn),nt.addEventListener("sessionend",bh),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(N),N=nt.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,N,w),p=pt.get(T,x.length),p.init(N),x.push(p),Mt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Zt.setFromProjectionMatrix(Mt),tt=this.localClippingEnabled,X=Dt.init(this.clippingPlanes,tt),g=ht.get(T,m.length),g.init(),m.push(g),nt.enabled===!0&&nt.isPresenting===!0){const it=v.xr.getDepthSensingMesh();it!==null&&va(it,N,-1/0,v.sortObjects)}va(T,N,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(H,ut),Gt=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,Gt&&ft.addToRenderList(g,T),this.info.render.frame++,X===!0&&Dt.beginShadows();const F=p.state.shadowsArray;et.render(F,T,N),X===!0&&Dt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=g.opaque,O=g.transmissive;if(p.setupLights(),N.isArrayCamera){const it=N.cameras;if(O.length>0)for(let lt=0,gt=it.length;lt<gt;lt++){const vt=it[lt];Ah(G,O,T,vt)}Gt&&ft.render(T);for(let lt=0,gt=it.length;lt<gt;lt++){const vt=it[lt];wh(g,T,vt,vt.viewport)}}else O.length>0&&Ah(G,O,T,N),Gt&&ft.render(T),wh(g,T,N);w!==null&&(Nt.updateMultisampleRenderTarget(w),Nt.updateRenderTargetMipmap(w)),T.isScene===!0&&T.onAfterRender(v,T,N),Ft.resetDefaultState(),C=-1,E=null,x.pop(),x.length>0?(p=x[x.length-1],X===!0&&Dt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function va(T,N,F,G){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)F=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Zt.intersectsSprite(T)){G&&At.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Mt);const lt=J.update(T),gt=T.material;gt.visible&&g.push(T,lt,gt,F,At.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Zt.intersectsObject(T))){const lt=J.update(T),gt=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),At.copy(T.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),At.copy(lt.boundingSphere.center)),At.applyMatrix4(T.matrixWorld).applyMatrix4(Mt)),Array.isArray(gt)){const vt=lt.groups;for(let wt=0,Pt=vt.length;wt<Pt;wt++){const yt=vt[wt],Vt=gt[yt.materialIndex];Vt&&Vt.visible&&g.push(T,lt,Vt,F,At.z,yt)}}else gt.visible&&g.push(T,lt,gt,F,At.z,null)}}const it=T.children;for(let lt=0,gt=it.length;lt<gt;lt++)va(it[lt],N,F,G)}function wh(T,N,F,G){const O=T.opaque,it=T.transmissive,lt=T.transparent;p.setupLightsView(F),X===!0&&Dt.setGlobalState(v.clippingPlanes,F),G&&Et.viewport(y.copy(G)),O.length>0&&Zs(O,N,F),it.length>0&&Zs(it,N,F),lt.length>0&&Zs(lt,N,F),Et.buffers.depth.setTest(!0),Et.buffers.depth.setMask(!0),Et.buffers.color.setMask(!0),Et.setPolygonOffset(!1)}function Ah(T,N,F,G){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new di(1,1,{generateMipmaps:!0,type:jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float")?ks:Cn,minFilter:ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const it=p.state.transmissionRenderTarget[G.id],lt=G.viewport||y;it.setSize(lt.z,lt.w);const gt=v.getRenderTarget();v.setRenderTarget(it),v.getClearColor(B),W=v.getClearAlpha(),W<1&&v.setClearColor(16777215,.5),v.clear(),Gt&&ft.render(F);const vt=v.toneMapping;v.toneMapping=Wn;const wt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),X===!0&&Dt.setGlobalState(v.clippingPlanes,G),Zs(T,F,G),Nt.updateMultisampleRenderTarget(it),Nt.updateRenderTargetMipmap(it),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let yt=0,Vt=N.length;yt<Vt;yt++){const re=N[yt],ae=re.object,We=re.geometry,Wt=re.material,St=re.group;if(Wt.side===un&&ae.layers.test(G.layers)){const Ee=Wt.side;Wt.side=ze,Wt.needsUpdate=!0,Ph(ae,F,G,We,Wt,St),Wt.side=Ee,Wt.needsUpdate=!0,Pt=!0}}Pt===!0&&(Nt.updateMultisampleRenderTarget(it),Nt.updateRenderTargetMipmap(it))}v.setRenderTarget(gt),v.setClearColor(B,W),wt!==void 0&&(G.viewport=wt),v.toneMapping=vt}function Zs(T,N,F){const G=N.isScene===!0?N.overrideMaterial:null;for(let O=0,it=T.length;O<it;O++){const lt=T[O],gt=lt.object,vt=lt.geometry,wt=G===null?lt.material:G,Pt=lt.group;gt.layers.test(F.layers)&&Ph(gt,N,F,vt,wt,Pt)}}function Ph(T,N,F,G,O,it){T.onBeforeRender(v,N,F,G,O,it),T.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),O.onBeforeRender(v,N,F,G,T,it),O.transparent===!0&&O.side===un&&O.forceSinglePass===!1?(O.side=ze,O.needsUpdate=!0,v.renderBufferDirect(F,N,G,O,T,it),O.side=Xn,O.needsUpdate=!0,v.renderBufferDirect(F,N,G,O,T,it),O.side=un):v.renderBufferDirect(F,N,G,O,T,it),T.onAfterRender(v,N,F,G,O,it)}function Js(T,N,F){N.isScene!==!0&&(N=It);const G=Ct.get(T),O=p.state.lights,it=p.state.shadowsArray,lt=O.state.version,gt=K.getParameters(T,O.state,it,N,F),vt=K.getProgramCacheKey(gt);let wt=G.programs;G.environment=T.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(T.isMeshStandardMaterial?M:A).get(T.envMap||G.environment),G.envMapRotation=G.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,wt===void 0&&(T.addEventListener("dispose",bt),wt=new Map,G.programs=wt);let Pt=wt.get(vt);if(Pt!==void 0){if(G.currentProgram===Pt&&G.lightsStateVersion===lt)return Ch(T,gt),Pt}else gt.uniforms=K.getUniforms(T),T.onBeforeCompile(gt,v),Pt=K.acquireProgram(gt,vt),wt.set(vt,Pt),G.uniforms=gt.uniforms;const yt=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(yt.clippingPlanes=Dt.uniform),Ch(T,gt),G.needsLights=Ou(T),G.lightsStateVersion=lt,G.needsLights&&(yt.ambientLightColor.value=O.state.ambient,yt.lightProbe.value=O.state.probe,yt.directionalLights.value=O.state.directional,yt.directionalLightShadows.value=O.state.directionalShadow,yt.spotLights.value=O.state.spot,yt.spotLightShadows.value=O.state.spotShadow,yt.rectAreaLights.value=O.state.rectArea,yt.ltc_1.value=O.state.rectAreaLTC1,yt.ltc_2.value=O.state.rectAreaLTC2,yt.pointLights.value=O.state.point,yt.pointLightShadows.value=O.state.pointShadow,yt.hemisphereLights.value=O.state.hemi,yt.directionalShadowMap.value=O.state.directionalShadowMap,yt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,yt.spotShadowMap.value=O.state.spotShadowMap,yt.spotLightMatrix.value=O.state.spotLightMatrix,yt.spotLightMap.value=O.state.spotLightMap,yt.pointShadowMap.value=O.state.pointShadowMap,yt.pointShadowMatrix.value=O.state.pointShadowMatrix),G.currentProgram=Pt,G.uniformsList=null,Pt}function Rh(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=Gr.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function Ch(T,N){const F=Ct.get(T);F.outputColorSpace=N.outputColorSpace,F.batching=N.batching,F.batchingColor=N.batchingColor,F.instancing=N.instancing,F.instancingColor=N.instancingColor,F.instancingMorph=N.instancingMorph,F.skinning=N.skinning,F.morphTargets=N.morphTargets,F.morphNormals=N.morphNormals,F.morphColors=N.morphColors,F.morphTargetsCount=N.morphTargetsCount,F.numClippingPlanes=N.numClippingPlanes,F.numIntersection=N.numClipIntersection,F.vertexAlphas=N.vertexAlphas,F.vertexTangents=N.vertexTangents,F.toneMapping=N.toneMapping}function Du(T,N,F,G,O){N.isScene!==!0&&(N=It),Nt.resetTextureUnits();const it=N.fog,lt=G.isMeshStandardMaterial?N.environment:null,gt=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Kn,vt=(G.isMeshStandardMaterial?M:A).get(G.envMap||lt),wt=G.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Pt=!!F.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),yt=!!F.morphAttributes.position,Vt=!!F.morphAttributes.normal,re=!!F.morphAttributes.color;let ae=Wn;G.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(ae=v.toneMapping);const We=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Wt=We!==void 0?We.length:0,St=Ct.get(G),Ee=p.state.lights;if(X===!0&&(tt===!0||T!==E)){const Je=T===E&&G.id===C;Dt.setState(G,T,Je)}let Xt=!1;G.version===St.__version?(St.needsLights&&St.lightsStateVersion!==Ee.state.version||St.outputColorSpace!==gt||O.isBatchedMesh&&St.batching===!1||!O.isBatchedMesh&&St.batching===!0||O.isBatchedMesh&&St.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&St.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&St.instancing===!1||!O.isInstancedMesh&&St.instancing===!0||O.isSkinnedMesh&&St.skinning===!1||!O.isSkinnedMesh&&St.skinning===!0||O.isInstancedMesh&&St.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&St.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&St.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&St.instancingMorph===!1&&O.morphTexture!==null||St.envMap!==vt||G.fog===!0&&St.fog!==it||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==Dt.numPlanes||St.numIntersection!==Dt.numIntersection)||St.vertexAlphas!==wt||St.vertexTangents!==Pt||St.morphTargets!==yt||St.morphNormals!==Vt||St.morphColors!==re||St.toneMapping!==ae||St.morphTargetsCount!==Wt)&&(Xt=!0):(Xt=!0,St.__version=G.version);let an=St.currentProgram;Xt===!0&&(an=Js(G,N,O));let xi=!1,Xe=!1,Ma=!1;const de=an.getUniforms(),Nn=St.uniforms;if(Et.useProgram(an.program)&&(xi=!0,Xe=!0,Ma=!0),G.id!==C&&(C=G.id,Xe=!0),xi||E!==T){de.setValue(R,"projectionMatrix",T.projectionMatrix),de.setValue(R,"viewMatrix",T.matrixWorldInverse);const Je=de.map.cameraPosition;Je!==void 0&&Je.setValue(R,dt.setFromMatrixPosition(T.matrixWorld)),Jt.logarithmicDepthBuffer&&de.setValue(R,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&de.setValue(R,"isOrthographic",T.isOrthographicCamera===!0),E!==T&&(E=T,Xe=!0,Ma=!0)}if(O.isSkinnedMesh){de.setOptional(R,O,"bindMatrix"),de.setOptional(R,O,"bindMatrixInverse");const Je=O.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),de.setValue(R,"boneTexture",Je.boneTexture,Nt))}O.isBatchedMesh&&(de.setOptional(R,O,"batchingTexture"),de.setValue(R,"batchingTexture",O._matricesTexture,Nt),de.setOptional(R,O,"batchingIdTexture"),de.setValue(R,"batchingIdTexture",O._indirectTexture,Nt),de.setOptional(R,O,"batchingColorTexture"),O._colorsTexture!==null&&de.setValue(R,"batchingColorTexture",O._colorsTexture,Nt));const xa=F.morphAttributes;if((xa.position!==void 0||xa.normal!==void 0||xa.color!==void 0)&&zt.update(O,F,an),(Xe||St.receiveShadow!==O.receiveShadow)&&(St.receiveShadow=O.receiveShadow,de.setValue(R,"receiveShadow",O.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Nn.envMap.value=vt,Nn.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&(Nn.envMapIntensity.value=N.environmentIntensity),Xe&&(de.setValue(R,"toneMappingExposure",v.toneMappingExposure),St.needsLights&&Uu(Nn,Ma),it&&G.fog===!0&&Tt.refreshFogUniforms(Nn,it),Tt.refreshMaterialUniforms(Nn,G,Q,V,p.state.transmissionRenderTarget[T.id]),Gr.upload(R,Rh(St),Nn,Nt)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Gr.upload(R,Rh(St),Nn,Nt),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&de.setValue(R,"center",O.center),de.setValue(R,"modelViewMatrix",O.modelViewMatrix),de.setValue(R,"normalMatrix",O.normalMatrix),de.setValue(R,"modelMatrix",O.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Je=G.uniformsGroups;for(let ya=0,Fu=Je.length;ya<Fu;ya++){const Lh=Je[ya];ee.update(Lh,an),ee.bind(Lh,an)}}return an}function Uu(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function Ou(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(T,N,F){Ct.get(T.texture).__webglTexture=N,Ct.get(T.depthTexture).__webglTexture=F;const G=Ct.get(T);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=F===void 0,G.__autoAllocateDepthBuffer||jt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,N){const F=Ct.get(T);F.__webglFramebuffer=N,F.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,F=0){w=T,L=N,b=F;let G=!0,O=null,it=!1,lt=!1;if(T){const vt=Ct.get(T);if(vt.__useDefaultFramebuffer!==void 0)Et.bindFramebuffer(R.FRAMEBUFFER,null),G=!1;else if(vt.__webglFramebuffer===void 0)Nt.setupRenderTarget(T);else if(vt.__hasExternalTextures)Nt.rebindTextures(T,Ct.get(T.texture).__webglTexture,Ct.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const yt=T.depthTexture;if(vt.__boundDepthTexture!==yt){if(yt!==null&&Ct.has(yt)&&(T.width!==yt.image.width||T.height!==yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Nt.setupDepthRenderbuffer(T)}}const wt=T.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(lt=!0);const Pt=Ct.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Pt[N])?O=Pt[N][F]:O=Pt[N],it=!0):T.samples>0&&Nt.useMultisampledRTT(T)===!1?O=Ct.get(T).__webglMultisampledFramebuffer:Array.isArray(Pt)?O=Pt[F]:O=Pt,y.copy(T.viewport),P.copy(T.scissor),k=T.scissorTest}else y.copy(mt).multiplyScalar(Q).floor(),P.copy(xt).multiplyScalar(Q).floor(),k=Bt;if(Et.bindFramebuffer(R.FRAMEBUFFER,O)&&G&&Et.drawBuffers(T,O),Et.viewport(y),Et.scissor(P),Et.setScissorTest(k),it){const vt=Ct.get(T.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,vt.__webglTexture,F)}else if(lt){const vt=Ct.get(T.texture),wt=N||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,vt.__webglTexture,F||0,wt)}C=-1},this.readRenderTargetPixels=function(T,N,F,G,O,it,lt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=Ct.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&lt!==void 0&&(gt=gt[lt]),gt){Et.bindFramebuffer(R.FRAMEBUFFER,gt);try{const vt=T.texture,wt=vt.format,Pt=vt.type;if(!Jt.textureFormatReadable(wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Jt.textureTypeReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-G&&F>=0&&F<=T.height-O&&R.readPixels(N,F,G,O,Lt.convert(wt),Lt.convert(Pt),it)}finally{const vt=w!==null?Ct.get(w).__webglFramebuffer:null;Et.bindFramebuffer(R.FRAMEBUFFER,vt)}}},this.readRenderTargetPixelsAsync=async function(T,N,F,G,O,it,lt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=Ct.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&lt!==void 0&&(gt=gt[lt]),gt){Et.bindFramebuffer(R.FRAMEBUFFER,gt);try{const vt=T.texture,wt=vt.format,Pt=vt.type;if(!Jt.textureFormatReadable(wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Jt.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=T.width-G&&F>=0&&F<=T.height-O){const yt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,yt),R.bufferData(R.PIXEL_PACK_BUFFER,it.byteLength,R.STREAM_READ),R.readPixels(N,F,G,O,Lt.convert(wt),Lt.convert(Pt),0),R.flush();const Vt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);await Qf(R,Vt,4);try{R.bindBuffer(R.PIXEL_PACK_BUFFER,yt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,it)}finally{R.deleteBuffer(yt),R.deleteSync(Vt)}return it}}finally{const vt=w!==null?Ct.get(w).__webglFramebuffer:null;Et.bindFramebuffer(R.FRAMEBUFFER,vt)}}},this.copyFramebufferToTexture=function(T,N=null,F=0){T.isTexture!==!0&&(Ss("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,T=arguments[1]);const G=Math.pow(2,-F),O=Math.floor(T.image.width*G),it=Math.floor(T.image.height*G),lt=N!==null?N.x:0,gt=N!==null?N.y:0;Nt.setTexture2D(T,0),R.copyTexSubImage2D(R.TEXTURE_2D,F,0,0,lt,gt,O,it),Et.unbindTexture()},this.copyTextureToTexture=function(T,N,F=null,G=null,O=0){T.isTexture!==!0&&(Ss("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,T=arguments[1],N=arguments[2],O=arguments[3]||0,F=null);let it,lt,gt,vt,wt,Pt;F!==null?(it=F.max.x-F.min.x,lt=F.max.y-F.min.y,gt=F.min.x,vt=F.min.y):(it=T.image.width,lt=T.image.height,gt=0,vt=0),G!==null?(wt=G.x,Pt=G.y):(wt=0,Pt=0);const yt=Lt.convert(N.format),Vt=Lt.convert(N.type);Nt.setTexture2D(N,0),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const re=R.getParameter(R.UNPACK_ROW_LENGTH),ae=R.getParameter(R.UNPACK_IMAGE_HEIGHT),We=R.getParameter(R.UNPACK_SKIP_PIXELS),Wt=R.getParameter(R.UNPACK_SKIP_ROWS),St=R.getParameter(R.UNPACK_SKIP_IMAGES),Ee=T.isCompressedTexture?T.mipmaps[O]:T.image;R.pixelStorei(R.UNPACK_ROW_LENGTH,Ee.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Ee.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,gt),R.pixelStorei(R.UNPACK_SKIP_ROWS,vt),T.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,O,wt,Pt,it,lt,yt,Vt,Ee.data):T.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,O,wt,Pt,Ee.width,Ee.height,yt,Ee.data):R.texSubImage2D(R.TEXTURE_2D,O,wt,Pt,it,lt,yt,Vt,Ee),R.pixelStorei(R.UNPACK_ROW_LENGTH,re),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ae),R.pixelStorei(R.UNPACK_SKIP_PIXELS,We),R.pixelStorei(R.UNPACK_SKIP_ROWS,Wt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,St),O===0&&N.generateMipmaps&&R.generateMipmap(R.TEXTURE_2D),Et.unbindTexture()},this.copyTextureToTexture3D=function(T,N,F=null,G=null,O=0){T.isTexture!==!0&&(Ss("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,G=arguments[1]||null,T=arguments[2],N=arguments[3],O=arguments[4]||0);let it,lt,gt,vt,wt,Pt,yt,Vt,re;const ae=T.isCompressedTexture?T.mipmaps[O]:T.image;F!==null?(it=F.max.x-F.min.x,lt=F.max.y-F.min.y,gt=F.max.z-F.min.z,vt=F.min.x,wt=F.min.y,Pt=F.min.z):(it=ae.width,lt=ae.height,gt=ae.depth,vt=0,wt=0,Pt=0),G!==null?(yt=G.x,Vt=G.y,re=G.z):(yt=0,Vt=0,re=0);const We=Lt.convert(N.format),Wt=Lt.convert(N.type);let St;if(N.isData3DTexture)Nt.setTexture3D(N,0),St=R.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)Nt.setTexture2DArray(N,0),St=R.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const Ee=R.getParameter(R.UNPACK_ROW_LENGTH),Xt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),an=R.getParameter(R.UNPACK_SKIP_PIXELS),xi=R.getParameter(R.UNPACK_SKIP_ROWS),Xe=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ae.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ae.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,vt),R.pixelStorei(R.UNPACK_SKIP_ROWS,wt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Pt),T.isDataTexture||T.isData3DTexture?R.texSubImage3D(St,O,yt,Vt,re,it,lt,gt,We,Wt,ae.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(St,O,yt,Vt,re,it,lt,gt,We,ae.data):R.texSubImage3D(St,O,yt,Vt,re,it,lt,gt,We,Wt,ae),R.pixelStorei(R.UNPACK_ROW_LENGTH,Ee),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Xt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,an),R.pixelStorei(R.UNPACK_SKIP_ROWS,xi),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Xe),O===0&&N.generateMipmaps&&R.generateMipmap(St),Et.unbindTexture()},this.initRenderTarget=function(T){Ct.get(T).__webglFramebuffer===void 0&&Nt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Nt.setTextureCube(T,0):T.isData3DTexture?Nt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Nt.setTexture2DArray(T,0):Nt.setTexture2D(T,0),Et.unbindTexture()},this.resetState=function(){L=0,b=0,w=null,Et.reset(),Ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ah?"display-p3":"srgb",e.unpackColorSpace=$t.workingColorSpace===fa?"display-p3":"srgb"}}class _S extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ln,this.environmentIntensity=1,this.environmentRotation=new Ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Yc extends as{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Kr=new D,jr=new D,Rl=new he,ps=new da,yr=new Vs,$a=new D,Cl=new D;class Ka extends De{constructor(t=new He,e=new Yc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Kr.fromBufferAttribute(e,s-1),jr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Kr.distanceTo(jr);t.setAttribute("lineDistance",new ke(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yr.copy(i.boundingSphere),yr.applyMatrix4(s),yr.radius+=r,t.ray.intersectsSphere(yr)===!1)return;Rl.copy(s).invert(),ps.copy(t.ray).applyMatrix4(Rl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=this.isLineSegments?2:1,c=i.index,d=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),_=Math.min(c.count,a.start+a.count);for(let g=f,p=_-1;g<p;g+=l){const m=c.getX(g),x=c.getX(g+1),v=Sr(this,t,ps,h,m,x);v&&e.push(v)}if(this.isLineLoop){const g=c.getX(_-1),p=c.getX(f),m=Sr(this,t,ps,h,g,p);m&&e.push(m)}}else{const f=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let g=f,p=_-1;g<p;g+=l){const m=Sr(this,t,ps,h,g,g+1);m&&e.push(m)}if(this.isLineLoop){const g=Sr(this,t,ps,h,_-1,f);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Sr(n,t,e,i,s,r){const a=n.geometry.attributes.position;if(Kr.fromBufferAttribute(a,s),jr.fromBufferAttribute(a,r),e.distanceSqToSegment(Kr,jr,$a,Cl)>i)return;$a.applyMatrix4(n.matrixWorld);const h=t.ray.origin.distanceTo($a);if(!(h<t.near||h>t.far))return{distance:h,point:Cl.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,object:n}}class $c extends as{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Kt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Ll=new he,Bo=new da,Er=new Vs,Tr=new D;class br extends De{constructor(t=new He,e=new $c){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Er.copy(i.boundingSphere),Er.applyMatrix4(s),Er.radius+=r,t.ray.intersectsSphere(Er)===!1)return;Ll.copy(s).invert(),Bo.copy(t.ray).applyMatrix4(Ll);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=i.index,u=i.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let _=d,g=f;_<g;_++){const p=l.getX(_);Tr.fromBufferAttribute(u,p),Il(Tr,p,h,s,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let _=d,g=f;_<g;_++)Tr.fromBufferAttribute(u,_),Il(Tr,_,h,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Il(n,t,e,i,s,r,a){const o=Bo.distanceSqToPoint(n);if(o<e){const h=new D;Bo.closestPointToPoint(n,h),h.applyMatrix4(i);const l=s.ray.origin.distanceTo(h);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:h,index:t,face:null,object:a})}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const r=i.length;let a;e?a=e:a=t*i[r-1];let o=0,h=r-1,l;for(;o<=h;)if(s=Math.floor(o+(h-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)h=s-1;else{h=s;break}if(s=h,i[s]===a)return s/(r-1);const c=i[s],d=i[s+1]-c,f=(a-c)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),h=e||(a.isVector2?new ct:new D);return h.copy(o).sub(a).normalize(),h}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new D,s=[],r=[],a=[],o=new D,h=new he;for(let f=0;f<=t;f++){const _=f/t;s[f]=this.getTangentAt(_,new D)}r[0]=new D,a[0]=new D;let l=Number.MAX_VALUE;const c=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);c<=l&&(l=c,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),d<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(xe(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(h.makeRotationAxis(o,_))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(xe(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let _=1;_<=t;_++)r[_].applyMatrix4(h.makeRotationAxis(s[_],f*_)),a[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class lh extends Mn{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=h}getPoint(t,e=new ct){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let h=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const c=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=h-this.aX,f=l-this.aY;h=d*c-f*u+this.aX,l=d*u+f*c+this.aY}return i.set(h,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class lg extends lh{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ch(){let n=0,t=0,e=0,i=0;function s(r,a,o,h){n=r,t=o,e=-3*r+3*a-2*o-h,i=2*r-2*a+o+h}return{initCatmullRom:function(r,a,o,h,l){s(a,o,l*(o-r),l*(h-a))},initNonuniformCatmullRom:function(r,a,o,h,l,c,u){let d=(a-r)/l-(o-r)/(l+c)+(o-a)/c,f=(o-a)/c-(h-a)/(c+u)+(h-o)/u;d*=c,f*=c,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return n+t*r+e*a+i*o}}}const wr=new D,ja=new ch,Za=new ch,Ja=new ch;class cg extends Mn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new D){const i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),h=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:h===0&&o===r-1&&(o=r-2,h=1);let l,c;this.closed||o>0?l=s[(o-1)%r]:(wr.subVectors(s[0],s[1]).add(s[0]),l=wr);const u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?c=s[(o+2)%r]:(wr.subVectors(s[r-1],s[r-2]).add(s[r-1]),c=wr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let _=Math.pow(l.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(c),f);g<1e-4&&(g=1),_<1e-4&&(_=g),p<1e-4&&(p=g),ja.initNonuniformCatmullRom(l.x,u.x,d.x,c.x,_,g,p),Za.initNonuniformCatmullRom(l.y,u.y,d.y,c.y,_,g,p),Ja.initNonuniformCatmullRom(l.z,u.z,d.z,c.z,_,g,p)}else this.curveType==="catmullrom"&&(ja.initCatmullRom(l.x,u.x,d.x,c.x,this.tension),Za.initCatmullRom(l.y,u.y,d.y,c.y,this.tension),Ja.initCatmullRom(l.z,u.z,d.z,c.z,this.tension));return i.set(ja.calc(h),Za.calc(h),Ja.calc(h)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Nl(n,t,e,i,s){const r=(i-t)*.5,a=(s-e)*.5,o=n*n,h=n*o;return(2*e-2*i+r+a)*h+(-3*e+3*i-2*r-a)*o+r*n+e}function ug(n,t){const e=1-n;return e*e*t}function fg(n,t){return 2*(1-n)*n*t}function dg(n,t){return n*n*t}function Es(n,t,e,i){return ug(n,t)+fg(n,e)+dg(n,i)}function pg(n,t){const e=1-n;return e*e*e*t}function mg(n,t){const e=1-n;return 3*e*e*n*t}function _g(n,t){return 3*(1-n)*n*n*t}function gg(n,t){return n*n*n*t}function Ts(n,t,e,i,s){return pg(n,t)+mg(n,e)+_g(n,i)+gg(n,s)}class Kc extends Mn{constructor(t=new ct,e=new ct,i=new ct,s=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new ct){const i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ts(t,s.x,r.x,a.x,o.x),Ts(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vg extends Mn{constructor(t=new D,e=new D,i=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new D){const i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ts(t,s.x,r.x,a.x,o.x),Ts(t,s.y,r.y,a.y,o.y),Ts(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class jc extends Mn{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Mg extends Mn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zc extends Mn{constructor(t=new ct,e=new ct,i=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ct){const i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Es(t,s.x,r.x,a.x),Es(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xg extends Mn{constructor(t=new D,e=new D,i=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new D){const i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Es(t,s.x,r.x,a.x),Es(t,s.y,r.y,a.y),Es(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jc extends Mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){const i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,h=s[a===0?a:a-1],l=s[a],c=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return i.set(Nl(o,h.x,l.x,c.x,u.x),Nl(o,h.y,l.y,c.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new ct().fromArray(s))}return this}}var Dl=Object.freeze({__proto__:null,ArcCurve:lg,CatmullRomCurve3:cg,CubicBezierCurve:Kc,CubicBezierCurve3:vg,EllipseCurve:lh,LineCurve:jc,LineCurve3:Mg,QuadraticBezierCurve:Zc,QuadraticBezierCurve3:xg,SplineCurve:Jc});class yg extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Dl[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const a=s[r]-i,o=this.curves[r],h=o.getLength(),l=h===0?0:1-a/h;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,h=a.getPoints(o);for(let l=0;l<h.length;l++){const c=h[l];i&&i.equals(c)||(e.push(c),i=c)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new Dl[s.type]().fromJSON(s))}return this}}class zo extends yg{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new jc(this.currentPoint.clone(),new ct(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new Zc(this.currentPoint.clone(),new ct(t,e),new ct(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){const o=new Kc(this.currentPoint.clone(),new ct(t,e),new ct(i,s),new ct(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Jc(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){const o=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(t+o,e+h,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,h){const l=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(t+l,e+c,i,s,r,a,o,h),this}absellipse(t,e,i,s,r,a,o,h){const l=new lh(t,e,i,s,r,a,o,h);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const c=l.getPoint(1);return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Qc extends zo{constructor(t){super(t),this.uuid=Mi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new zo().fromJSON(s))}return this}}const Sg={triangulate:function(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=tu(n,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,h,l,c,u,d,f;if(i&&(r=Ag(n,t,r,e)),n.length>80*e){o=l=n[0],h=c=n[1];for(let _=e;_<s;_+=e)u=n[_],d=n[_+1],u<o&&(o=u),d<h&&(h=d),u>l&&(l=u),d>c&&(c=d);f=Math.max(l-o,c-h),f=f!==0?32767/f:0}return Ns(r,a,e,o,h,f,0),a}};function tu(n,t,e,i,s){let r,a;if(s===Gg(n,t,e,i)>0)for(r=t;r<e;r+=i)a=Ul(r,n[r],n[r+1],a);else for(r=e-i;r>=t;r-=i)a=Ul(r,n[r],n[r+1],a);return a&&_a(a,a.next)&&(Us(a),a=a.next),a}function mi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(_a(e,e.next)||ie(e.prev,e,e.next)===0)){if(Us(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Ns(n,t,e,i,s,r,a){if(!n)return;!a&&r&&Ig(n,i,s,r);let o=n,h,l;for(;n.prev!==n.next;){if(h=n.prev,l=n.next,r?Tg(n,i,s,r):Eg(n)){t.push(h.i/e|0),t.push(n.i/e|0),t.push(l.i/e|0),Us(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=bg(mi(n),t,e),Ns(n,t,e,i,s,r,2)):a===2&&wg(n,t,e,i,s,r):Ns(mi(n),t,e,i,s,r,1);break}}}function Eg(n){const t=n.prev,e=n,i=n.next;if(ie(t,e,i)>=0)return!1;const s=t.x,r=e.x,a=i.x,o=t.y,h=e.y,l=i.y,c=s<r?s<a?s:a:r<a?r:a,u=o<h?o<l?o:l:h<l?h:l,d=s>r?s>a?s:a:r>a?r:a,f=o>h?o>l?o:l:h>l?h:l;let _=i.next;for(;_!==t;){if(_.x>=c&&_.x<=d&&_.y>=u&&_.y<=f&&Hi(s,o,r,h,a,l,_.x,_.y)&&ie(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function Tg(n,t,e,i){const s=n.prev,r=n,a=n.next;if(ie(s,r,a)>=0)return!1;const o=s.x,h=r.x,l=a.x,c=s.y,u=r.y,d=a.y,f=o<h?o<l?o:l:h<l?h:l,_=c<u?c<d?c:d:u<d?u:d,g=o>h?o>l?o:l:h>l?h:l,p=c>u?c>d?c:d:u>d?u:d,m=ko(f,_,t,e,i),x=ko(g,p,t,e,i);let v=n.prevZ,S=n.nextZ;for(;v&&v.z>=m&&S&&S.z<=x;){if(v.x>=f&&v.x<=g&&v.y>=_&&v.y<=p&&v!==s&&v!==a&&Hi(o,c,h,u,l,d,v.x,v.y)&&ie(v.prev,v,v.next)>=0||(v=v.prevZ,S.x>=f&&S.x<=g&&S.y>=_&&S.y<=p&&S!==s&&S!==a&&Hi(o,c,h,u,l,d,S.x,S.y)&&ie(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;v&&v.z>=m;){if(v.x>=f&&v.x<=g&&v.y>=_&&v.y<=p&&v!==s&&v!==a&&Hi(o,c,h,u,l,d,v.x,v.y)&&ie(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;S&&S.z<=x;){if(S.x>=f&&S.x<=g&&S.y>=_&&S.y<=p&&S!==s&&S!==a&&Hi(o,c,h,u,l,d,S.x,S.y)&&ie(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function bg(n,t,e){let i=n;do{const s=i.prev,r=i.next.next;!_a(s,r)&&eu(s,i,i.next,r)&&Ds(s,r)&&Ds(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),Us(i),Us(i.next),i=n=r),i=i.next}while(i!==n);return mi(i)}function wg(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ug(a,o)){let h=nu(a,o);a=mi(a,a.next),h=mi(h,h.next),Ns(a,t,e,i,s,r,0),Ns(h,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function Ag(n,t,e,i){const s=[];let r,a,o,h,l;for(r=0,a=t.length;r<a;r++)o=t[r]*i,h=r<a-1?t[r+1]*i:n.length,l=tu(n,o,h,i,!1),l===l.next&&(l.steiner=!0),s.push(Dg(l));for(s.sort(Pg),r=0;r<s.length;r++)e=Rg(s[r],e);return e}function Pg(n,t){return n.x-t.x}function Rg(n,t){const e=Cg(n,t);if(!e)return t;const i=nu(e,n);return mi(i,i.next),mi(e,e.next)}function Cg(n,t){let e=t,i=-1/0,s;const r=n.x,a=n.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const d=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>i&&(i=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const o=s,h=s.x,l=s.y;let c=1/0,u;e=s;do r>=e.x&&e.x>=h&&r!==e.x&&Hi(a<l?r:i,a,h,l,a<l?i:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),Ds(e,n)&&(u<c||u===c&&(e.x>s.x||e.x===s.x&&Lg(s,e)))&&(s=e,c=u)),e=e.next;while(e!==o);return s}function Lg(n,t){return ie(n.prev,n,t.prev)<0&&ie(t.next,n,n.next)<0}function Ig(n,t,e,i){let s=n;do s.z===0&&(s.z=ko(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Ng(s)}function Ng(n){let t,e,i,s,r,a,o,h,l=1;do{for(e=n,n=null,r=null,a=0;e;){for(a++,i=e,o=0,t=0;t<l&&(o++,i=i.nextZ,!!i);t++);for(h=l;o>0||h>0&&i;)o!==0&&(h===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,o--):(s=i,i=i.nextZ,h--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,l*=2}while(a>1);return n}function ko(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Dg(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Hi(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function Ug(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Og(n,t)&&(Ds(n,t)&&Ds(t,n)&&Fg(n,t)&&(ie(n.prev,n,t.prev)||ie(n,t.prev,t))||_a(n,t)&&ie(n.prev,n,n.next)>0&&ie(t.prev,t,t.next)>0)}function ie(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function _a(n,t){return n.x===t.x&&n.y===t.y}function eu(n,t,e,i){const s=Pr(ie(n,t,e)),r=Pr(ie(n,t,i)),a=Pr(ie(e,i,n)),o=Pr(ie(e,i,t));return!!(s!==r&&a!==o||s===0&&Ar(n,e,t)||r===0&&Ar(n,i,t)||a===0&&Ar(e,n,i)||o===0&&Ar(e,t,i))}function Ar(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Pr(n){return n>0?1:n<0?-1:0}function Og(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&eu(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Ds(n,t){return ie(n.prev,n,n.next)<0?ie(n,t,n.next)>=0&&ie(n,n.prev,t)>=0:ie(n,t,n.prev)<0||ie(n,n.next,t)<0}function Fg(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function nu(n,t){const e=new Ho(n.i,n.x,n.y),i=new Ho(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Ul(n,t,e,i){const s=new Ho(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Us(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ho(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Gg(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}class bs{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return bs.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];Ol(t),Fl(i,t);let a=t.length;e.forEach(Ol);for(let h=0;h<e.length;h++)s.push(a),a+=e[h].length,Fl(i,e[h]);const o=Sg.triangulate(i,s);for(let h=0;h<o.length;h+=3)r.push(o.slice(h,h+3));return r}}function Ol(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Fl(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class uh extends He{constructor(t=new Qc([new ct(0,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],a=[];let o=0,h=0;if(Array.isArray(t)===!1)l(t);else for(let c=0;c<t.length;c++)l(t[c]),this.addGroup(o,h,c),o+=h,h=0;this.setIndex(i),this.setAttribute("position",new ke(s,3)),this.setAttribute("normal",new ke(r,3)),this.setAttribute("uv",new ke(a,2));function l(c){const u=s.length/3,d=c.extractPoints(e);let f=d.shape;const _=d.holes;bs.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=_.length;p<m;p++){const x=_[p];bs.isClockWise(x)===!0&&(_[p]=x.reverse())}const g=bs.triangulateShape(f,_);for(let p=0,m=_.length;p<m;p++){const x=_[p];f=f.concat(x)}for(let p=0,m=f.length;p<m;p++){const x=f[p];s.push(x.x,x.y,0),r.push(0,0,1),a.push(x.x,x.y)}for(let p=0,m=g.length;p<m;p++){const x=g[p],v=x[0]+u,S=x[1]+u,L=x[2]+u;i.push(v,S,L),h+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Bg(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const a=e[t.shapes[s]];i.push(a)}return new uh(i,t.curveSegments)}}function Bg(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class Gl{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(xe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class zg extends vi{constructor(t,e){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qo);class fh{constructor(){U(this,"_disposed",!1)}get disposed(){return this._disposed}markDisposed(){this._disposed=!0}assertNotDisposed(){if(this._disposed)throw new Error(`[${this.constructor.name}] Object already disposed.`)}}class kg{constructor(){U(this,"_groups",[]);U(this,"_layerIndex",new Map)}get groups(){return this._groups}addGroup(t){if(this._groups.find(e=>e.id===t.id))throw new Error(`Group "${t.id}" already exists`);this._groups.push(t)}removeGroup(t){const e=this._groups.findIndex(s=>s.id===t);if(e===-1)return;const i=this._groups[e];for(const s of i.layers)this._layerIndex.delete(s.id);this._groups.splice(e,1)}addLayerToGroup(t,e){const i=this._groups.find(s=>s.id===e);if(!i)throw new Error(`Group "${e}" not found`);if(this._layerIndex.has(t.id))throw new Error(`Layer "${t.id}" already exists`);i.layers.push(t),this._layerIndex.set(t.id,t)}removeLayer(t){for(const e of this._groups){const i=e.layers.findIndex(s=>s.id===t);if(i!==-1){e.layers.splice(i,1),this._layerIndex.delete(t);return}}}getLayer(t){return this._layerIndex.get(t)}getVisibleLayers(){const t=[];for(const e of this._groups)if(e.visible)for(const i of e.layers)i.visible&&t.push(i);return t.sort((e,i)=>e.zIndex-i.zIndex),t}moveUp(t){const e=this._layerIndex.get(t);if(!e)return;const i=this._getAllFlat(),s=i.indexOf(e);if(s>0){const r=i[s-1],a=e.zIndex;e.zIndex=r.zIndex,r.zIndex=a}}moveDown(t){const e=this._layerIndex.get(t);if(!e)return;const i=this._getAllFlat(),s=i.indexOf(e);if(s<i.length-1){const r=i[s+1],a=e.zIndex;e.zIndex=r.zIndex,r.zIndex=a}}moveToGroup(t,e){const i=this._layerIndex.get(t);if(!i)return;for(const r of this._groups){const a=r.layers.findIndex(o=>o.id===t);if(a!==-1){r.layers.splice(a,1);break}}const s=this._groups.find(r=>r.id===e);if(!s)throw new Error(`Group "${e}" not found`);s.layers.push(i)}clear(){this._groups=[],this._layerIndex.clear()}_getAllFlat(){const t=[];for(const e of this._groups)for(const i of e.layers)t.push(i);return t.sort((e,i)=>e.zIndex-i.zIndex),t}}class Hg{constructor(){U(this,"_map",new Map);U(this,"_totalBytes",0)}get count(){return this._map.size}get byteSize(){return this._totalBytes}get(t){const e=this._map.get(t);return e?(this._map.delete(t),this._map.set(t,e),e.value):null}set(t,e,i){if(this._map.has(t)){const s=this._map.get(t);this._totalBytes-=s.byteSize,this._map.delete(t)}this._map.set(t,{value:e,byteSize:i}),this._totalBytes+=i}has(t){return this._map.has(t)}delete(t){const e=this._map.get(t);e&&(this._totalBytes-=e.byteSize,this._map.delete(t))}trim(t){for(;this._totalBytes>t&&this._map.size>0;){const[e,i]=this._map.entries().next().value;this._totalBytes-=i.byteSize,this._map.delete(e),i.value.disposed||i.value.dispose()}}clear(){for(const t of this._map.values())t.value.disposed||t.value.dispose();this._map.clear(),this._totalBytes=0}}class Vg{constructor(t){U(this,"_current");U(this,"_dirty",!1);U(this,"threshold");this.threshold=(t==null?void 0:t.threshold)??500,this._current=(t==null?void 0:t.initial)??{x:0,y:0,z:0}}get current(){return this._current}get dirty(){return this._dirty}update(t){const e=t.x-this._current.x,i=t.y-this._current.y;return Math.sqrt(e*e+i*i)>this.threshold?(this._current={x:t.x,y:t.y,z:0},this._dirty=!0,!0):(this._dirty=!1,!1)}reset(){this._current={x:0,y:0,z:0},this._dirty=!1}}class Wg{constructor(t){U(this,"_x",0);U(this,"_y",0);U(this,"_zoom",1);U(this,"_width",800);U(this,"_height",600);U(this,"_container",null);U(this,"_dragging",!1);U(this,"_lastMouseX",0);U(this,"_lastMouseY",0);U(this,"_onMouseDown");U(this,"_onMouseMove");U(this,"_onMouseUp");U(this,"_onWheel");U(this,"_onResize");this._x=(t==null?void 0:t.x)??0,this._y=(t==null?void 0:t.y)??0,this._zoom=(t==null?void 0:t.zoom)??1,this._onMouseDown=e=>{this._dragging=!0,this._lastMouseX=e.clientX,this._lastMouseY=e.clientY},this._onMouseMove=e=>{if(!this._dragging)return;const i=e.clientX-this._lastMouseX,s=e.clientY-this._lastMouseY;this._x-=i*this._zoom,this._y+=s*this._zoom,this._lastMouseX=e.clientX,this._lastMouseY=e.clientY},this._onMouseUp=()=>{this._dragging=!1},this._onWheel=e=>{e.preventDefault();const i=e.deltaY>0?1.1:.9;this._zoom*=i,this._zoom=Math.max(.1,Math.min(1e5,this._zoom))},this._onResize=()=>{this._container&&(this._width=this._container.clientWidth,this._height=this._container.clientHeight)}}get cameraWorldPos(){return{x:this._x,y:this._y,z:0}}get extent(){const t=this._width/2*this._zoom,e=this._height/2*this._zoom;return[this._x-t,this._y-e,this._x+t,this._y+e]}attach(t){this._container=t,this._width=t.clientWidth,this._height=t.clientHeight,t.addEventListener("mousedown",this._onMouseDown),window.addEventListener("mousemove",this._onMouseMove),window.addEventListener("mouseup",this._onMouseUp),t.addEventListener("wheel",this._onWheel,{passive:!1}),window.addEventListener("resize",this._onResize)}detach(){this._container&&(this._container.removeEventListener("mousedown",this._onMouseDown),this._container.removeEventListener("wheel",this._onWheel)),window.removeEventListener("mousemove",this._onMouseMove),window.removeEventListener("mouseup",this._onMouseUp),window.removeEventListener("resize",this._onResize),this._container=null}setCenter(t,e){this._x=t,this._y=e}setZoom(t){this._zoom=Math.max(.1,Math.min(1e5,t))}get zoom(){return this._zoom}get resolution(){return this._zoom}update(t){}dispose(){this.detach()}}function Zi(n,t,e){return{schemeId:n,id:t,level:e}}function Me(n){return`${n.schemeId}:${n.id}`}class Bl extends fh{constructor(e,i,s){super();U(this,"id");U(this,"key");U(this,"bounds");U(this,"origin");U(this,"reprojector");U(this,"state");U(this,"contents",[]);U(this,"failCount",0);U(this,"lastAccessTime",0);U(this,"priority",0);this.id=`${e.schemeId}:${e.id}`,this.key=e,this.bounds=i,this.origin=s,this.state="unloaded"}reset(){this.state="unloaded",this.contents.length=0,this.failCount=0,this.priority=0}dispose(){for(const e of this.contents)e.disposed||e.dispose();this.contents.length=0,this.markDisposed()}}const Xg={screenArea:.4,distance:.3,inFrustum:.2,parentReady:.1},ra=class ra{constructor(){U(this,"maxPerFrame",4);U(this,"burstPerFrame",8);U(this,"weights",{...Xg});U(this,"_loading",new Map);U(this,"_loadedParents",new Set);U(this,"_queue",[])}markLoaded(t){const e=Me(t);this._loading.delete(e),this._loadedParents.size>=ra.LOADED_PARENTS_MAX&&this._loadedParents.clear(),this._loadedParents.add(e)}markFailed(t){this._loading.delete(Me(t))}abort(t){const e=Me(t);this.abortByKey(e)}abortByKey(t){const e=this._loading.get(t);e&&(e.abort(),this._loading.delete(t))}cancelOffscreen(t){this._queue=this._queue.filter(e=>t.has(Me(e.tileKey)))}abortAll(){for(const[,t]of this._loading)t.abort();this._loading.clear(),this._queue=[]}schedule(t){const e=new Set,i=[];for(const s of t){const r=Me(s.tileKey);e.has(r)||this._loading.has(r)||(e.add(r),i.push(s))}return i.sort((s,r)=>this._computePriority(r)-this._computePriority(s)),this._queue=i,i}takeNext(){const t=this._queue.length>8?this.burstPerFrame:this.maxPerFrame,e=[];for(;e.length<t&&this._queue.length>0;){const i=this._queue.shift(),s=Me(i.tileKey);this._loading.has(s)||e.push(i)}return e}startLoading(t,e){const i=Me(t);this._loading.set(i,e)}get queueLength(){return this._queue.length}get loadingCount(){return this._loading.size}_computePriority(t){const{weights:e}=this,i=e.screenArea*t.screenArea,s=e.distance*(1/Math.max(t.distanceToCamera,1)),r=e.inFrustum*(t.inFrustum?1:.1),a=e.parentReady*(t.parentKey&&this._loadedParents.has(t.parentKey)?1:0);return i+s+r+a}};U(ra,"LOADED_PARENTS_MAX",4096);let Vo=ra;const Yi=class Yi{constructor(){U(this,"name","EPSG:3857");U(this,"units","meter")}project(t,e){const i=t*Math.PI/180,s=e*Math.PI/180,r=Yi.R,a=i*r,o=r*Math.log(Math.tan(Math.PI/4+s/2));return{x:a,y:o}}unproject(t,e){const i=Yi.R,s=t/i*(180/Math.PI),r=Math.atan(Math.sinh(e/i))*(180/Math.PI);return{lon:s,lat:r}}static clampLat(t){return Math.max(-this.MAX_LAT,Math.min(this.MAX_LAT,t))}};U(Yi,"R",6378137),U(Yi,"MAX_LAT",85.0511287798066);let Os=Yi;const Le=class Le{constructor(t,e=0,i=18){U(this,"name");U(this,"schemeId","xyz");U(this,"targetCrs");U(this,"minZoom");U(this,"maxZoom");U(this,"_stableZoom",null);U(this,"_wm",new Os);U(this,"_boundsCache",new Map);this.targetCrs=t,this.minZoom=e,this.maxZoom=i,this.name=`XYZTileScheme(${t.name})`}get currentZoom(){return this._stableZoom}tileSizeAtZoom(t){return Le.WORLD_SIZE/Math.pow(2,t)}getTilesInView(t,e,i){const s=e,[r,a,o,h]=t,l=[{x:r,y:a},{x:o,y:a},{x:r,y:h},{x:o,y:h},{x:(r+o)/2,y:(a+h)/2}],c=this._wm,u=[];for(const P of l){const k=s.unproject(P.x,P.y);if(isNaN(k.lon)||isNaN(k.lat))continue;const B=Math.max(-180,Math.min(180,k.lon)),W=Math.max(-85.06,Math.min(85.06,k.lat)),Z=c.project(B,W);u.push(Z)}if(u.length===0)return[];let d=1/0,f=1/0,_=-1/0,g=-1/0;for(const P of u)P.x<d&&(d=P.x),P.y<f&&(f=P.y),P.x>_&&(_=P.x),P.y>g&&(g=P.y);const p=_-d,m=this._pickZoom(p),{WORLD_HALF:x,WORLD_SIZE:v}=Le,S=v/Math.pow(2,m),L=Math.pow(2,m),b=Math.max(0,Math.floor((d+x)/S)),w=Math.min(L-1,Math.floor((_+x)/S)),C=Math.max(0,Math.floor((x-g)/S)),E=Math.min(L-1,Math.floor((x-f)/S)),y=[];for(let P=C;P<=E;P++)for(let k=b;k<=w;k++)if(y.push(Zi(this.schemeId,`${m}/${k}/${P}`,m)),y.length>=Le.MAX_TILES_PER_VIEW)return y;return y}getTileBounds(t){if(t.schemeId!==this.schemeId)throw new Error(`TileKey scheme mismatch: expected "${this.schemeId}", got "${t.schemeId}"`);const e=this._boundsCache.get(t.id);if(e)return e;const{z:i,x:s,y:r}=this._parseId(t.id),{WORLD_HALF:a,WORLD_SIZE:o,SAMPLE_GRID:h}=Le,l=o/Math.pow(2,i),c=-a+s*l,d=a-r*l-l,f=this._wm;let _=1/0,g=1/0,p=-1/0,m=-1/0;const x=l/(h-1),v=l/(h-1);for(let L=0;L<h;L++)for(let b=0;b<h;b++){const w=c+L*x,C=d+b*v,E=f.unproject(w,C),y=this.targetCrs.project(E.lon,E.lat);y.x<_&&(_=y.x),y.y<g&&(g=y.y),y.x>p&&(p=y.x),y.y>m&&(m=y.y)}const S=[_,g,p,m];return this._boundsCache.size>=Le.BOUNDS_CACHE_MAX&&this._boundsCache.clear(),this._boundsCache.set(t.id,S),S}getParentKey(t){if(t.level<=this.minZoom)return null;const{z:e,x:i,y:s}=this._parseId(t.id),r=e-1;return Zi(this.schemeId,`${r}/${Math.floor(i/2)}/${Math.floor(s/2)}`,r)}getChildKeys(t){const{z:e,x:i,y:s}=this._parseId(t.id),r=e+1,a=i*2,o=s*2,h=[];for(let l=0;l<2;l++)for(let c=0;c<2;c++)h.push(Zi(this.schemeId,`${r}/${a+c}/${o+l}`,r));return h}getReprojector(t){const{z:e,x:i,y:s}=this._parseId(t.id),{WORLD_HALF:r,WORLD_SIZE:a}=Le,o=a/Math.pow(2,e),h=-r+i*o,c=r-s*o-o,u=this._wm,d=this.targetCrs;return(f,_)=>{const g=h+f*o,p=c+_*o,m=u.unproject(g,p);return d.project(m.lon,m.lat)}}_pickZoom(t){if(t<=0)return this.maxZoom;const{WORLD_SIZE:e}=Le,i=Math.log2(4*e/t),s=Math.round(i);if(this._stableZoom!==null){const a=s-this._stableZoom;if(Math.abs(a)===1){const o=this._stableZoom+a*.5;if(Math.abs(i-o)<.3)return this._stableZoom}}const r=Math.max(this.minZoom,Math.min(this.maxZoom,s));return this._stableZoom=r,r}_parseId(t){const e=t.split("/");if(e.length!==3)throw new Error(`Invalid XYZ tile id: "${t}" (expected "z/x/y")`);return{z:parseInt(e[0],10),x:parseInt(e[1],10),y:parseInt(e[2],10)}}};U(Le,"WORLD_HALF",Math.PI*Os.R),U(Le,"WORLD_SIZE",2*Le.WORLD_HALF),U(Le,"SAMPLE_GRID",5),U(Le,"MAX_TILES_PER_VIEW",512),U(Le,"BOUNDS_CACHE_MAX",1024);let Wo=Le;const Ae=class Ae{constructor(t,e,i){U(this,"scheduler",new Vo);U(this,"cache");U(this,"floatingOrigin");U(this,"_loadFn");U(this,"_loadedTiles",new Map);U(this,"_loading",new Map);U(this,"_failCounts",new Map);U(this,"_lastExtent",null);U(this,"_lastResolution",null);U(this,"_schemeZooms",new Map);U(this,"_parentPlaceholders",new Set);this.cache=t,this.floatingOrigin=e,this._loadFn=i}get loadedTiles(){return this._loadedTiles}update(t,e,i,s,r){let a=!0;if(this._lastExtent&&this._lastResolution!=null){const[h,l,c,u]=this._lastExtent,d=c-h,f=u-l,_=Math.abs(t[0]-h),g=Math.abs(t[1]-l);!(r!=null&&Math.abs(r-this._lastResolution)/this._lastResolution>.2)&&_<d*Ae.EXTENT_MOVE_FACTOR&&g<f*Ae.EXTENT_MOVE_FACTOR&&(a=!1)}if(a){this._lastExtent=[...t],this._lastResolution=r??null;const h=this._sortByDeps(s),l=new Map;for(const g of h){const p=g.getVisibleTiles(t,i,r);if(g.dependsOn.length>0){const m=new Set;for(const v of g.dependsOn){if(!h.includes(v))continue;const S=v.getVisibleTiles(t,i,r);for(const L of S)m.add(Me(L))}const x=p.filter(v=>{const S=Me(v);return m.has(S)&&this._loadedTiles.has(S)});if(x.length===0)continue;for(const v of x){if(l.size>=Ae.MAX_TOTAL_TILES)break;this._addKeyRequest(v,g,l)}continue}for(const m of p){if(l.size>=Ae.MAX_TOTAL_TILES)break;this._addKeyRequest(m,g,l)}if(l.size>=Ae.MAX_TOTAL_TILES)break}const c=new Set(l.keys());for(const[g,p]of this._loading)c.has(g)||(p.controller.abort(),this._loading.delete(g),this.scheduler.abortByKey(g));this.scheduler.cancelOffscreen(c);const u=[];for(const[g,{key:p,layerIds:m,bounds:x}]of l){const v=(x[0]+x[2])/2,S=(x[1]+x[3])/2,L=v-e.x,b=S-e.y,w=Math.sqrt(L*L+b*b),C=(x[2]-x[0])*(x[3]-x[1]),E=s.find(k=>m.has(k.id)),y=E==null?void 0:E.tileScheme.getParentKey(p),P=y?Me(y):void 0;u.push({tileKey:p,layerIds:[...m],distanceToCamera:w,screenArea:Math.min(C/1e6,1),inFrustum:!0,parentKey:P})}const d=[],f=new Set;for(const g of u){const p=s.find(v=>v.id===g.layerIds[0]);if(!p)continue;const m=p.tileScheme.getParentKey(g.tileKey);if(!m)continue;const x=Me(m);if(!this._loadedTiles.has(x)&&!this.cache.has(x)&&!l.has(x)&&!d.some(v=>Me(v.tileKey)===x)&&!this._loading.has(x)){const v=p.tileScheme.getTileBounds(m),S=(v[0]+v[2])/2,L=(v[1]+v[3])/2,b=S-e.x,w=L-e.y,C=Math.sqrt(b*b+w*w),E=(v[2]-v[0])*(v[3]-v[1]);d.push({tileKey:m,layerIds:g.layerIds,distanceToCamera:C,screenArea:Math.min(E/1e6,1),inFrustum:!0}),f.add(Me(g.tileKey)),this._parentPlaceholders.add(x)}}const _=[...d,...u];this.scheduler.schedule(_),this._evictStaleZoomLevels(s,c)}this._evictRefinedParents();const o=this.scheduler.takeNext();for(const h of o)this._loadTile(h,s)}async loadTileNow(t,e){var l;const i=e.tileScheme,s=i.getTileBounds(t),r=Ae._snapOrigin(s),a=new Bl(t,s,r);a.reprojector=((l=i.getReprojector)==null?void 0:l.call(i,t))??void 0;const o=new AbortController,h=await this._loadFn(a,e,o.signal);if(h){a.state="loaded",a.contents.push(h);const c=Me(t);this._loadedTiles.set(c,a),this.cache.set(c,a,this._estimateBytes(a))}return h}evict(t){this.cache.trim(t);for(const[e,i]of this._loadedTiles)this.cache.has(e)||(this._loadedTiles.delete(e),this._parentPlaceholders.delete(e))}dispose(){this.scheduler.abortAll();for(const[,t]of this._loading)t.controller.abort();this._loading.clear(),this.cache.clear(),this._loadedTiles.clear(),this._failCounts.clear(),this._schemeZooms.clear(),this._parentPlaceholders.clear()}_evictStaleZoomLevels(t,e){for(const i of t){const s=i.tileScheme;if(!(s instanceof Wo))continue;const r=s.schemeId,a=s.currentZoom;if(a==null)continue;const o=this._schemeZooms.get(r);if(this._schemeZooms.set(r,a),o==null||o===a)continue;const h=a>o,l=Date.now();for(const[c,u]of this._loadedTiles)if(u.key.schemeId===r&&u.key.level===o&&!e.has(c))if(h){const d=s.getChildKeys(u.key);let f=0;for(const _ of d)this._loadedTiles.has(Me(_))&&f++;f>=2?(this._loadedTiles.delete(c),this._parentPlaceholders.delete(c)):l-(u.lastAccessTime||l)>Ae.TRANSITION_TIMEOUT_MS&&(this._loadedTiles.delete(c),this._parentPlaceholders.delete(c))}else{const d=s.getParentKey(u.key);d&&this._loadedTiles.has(Me(d))?(this._loadedTiles.delete(c),this._parentPlaceholders.delete(c)):l-(u.lastAccessTime||l)>Ae.TRANSITION_TIMEOUT_MS&&(this._loadedTiles.delete(c),this._parentPlaceholders.delete(c))}}}_evictRefinedParents(){for(const t of this._parentPlaceholders){const e=this._loadedTiles.get(t);if(!e){this._parentPlaceholders.delete(t);continue}const i=e.key.id.split("/");if(i.length!==3)continue;const s=parseInt(i[0],10),r=parseInt(i[1],10),a=parseInt(i[2],10);let o=0;for(let h=0;h<2;h++)for(let l=0;l<2;l++){const c=`${e.key.schemeId}:${s+1}/${r*2+l}/${a*2+h}`;this._loadedTiles.has(c)&&o++}o>=2&&(this._loadedTiles.delete(t),this._parentPlaceholders.delete(t))}}_evictOldZoomTilesAfterLoad(t){const e=t.id.split("/");if(e.length!==3)return;const i=parseInt(e[0],10),s=parseInt(e[1],10),r=parseInt(e[2],10);if(i<=0)return;const a=`${t.schemeId}:${i-1}/${Math.floor(s/2)}/${Math.floor(r/2)}`;if(!this._loadedTiles.has(a))return;const o=Math.floor(s/2),h=Math.floor(r/2);let l=0;for(let c=0;c<2;c++)for(let u=0;u<2;u++){const d=`${t.schemeId}:${i}/${o*2+u}/${h*2+c}`;this._loadedTiles.has(d)&&l++}if(l>=2){this._loadedTiles.delete(a),this._parentPlaceholders.delete(a);const c=a.split(":");if(c.length===2){const[u,d]=c,f=d.split("/");if(f.length===3){const _=parseInt(f[0],10);if(_>1){const g=Math.floor(parseInt(f[1],10)/2),p=Math.floor(parseInt(f[2],10)/2),m=`${u}:${_-1}/${g}/${p}`;this._loadedTiles.has(m)&&this._parentPlaceholders.has(m)&&(this._loadedTiles.delete(m),this._parentPlaceholders.delete(m))}}}}}_sortByDeps(t){const e=new Set,i=[],s=r=>{if(!e.has(r.id)){e.add(r.id);for(const a of r.dependsOn)t.includes(a)&&s(a);i.push(r)}};for(const r of t)s(r);return i}_addKeyRequest(t,e,i){const s=Me(t);if(!((this._failCounts.get(s)??0)>=Ae.MAX_FAIL_COUNT)){if(this._loading.has(s)){this._loading.get(s).layerIds.add(e.id);return}if(this._loadedTiles.has(s)){const r=this._loadedTiles.get(s);if(r.lastAccessTime=Date.now(),r.contents.some(a=>a.layerId===e.id))return}if(this.cache.has(s)){const r=this.cache.get(s);if(this._loadedTiles.set(s,r),r.lastAccessTime=Date.now(),r.contents.some(a=>a.layerId===e.id))return}if(i.has(s))i.get(s).layerIds.add(e.id);else{const r=e.tileScheme.getTileBounds(t);i.set(s,{key:t,layerIds:new Set([e.id]),bounds:r})}}}async _loadTile(t,e){var o;const i=Me(t.tileKey);let s=this._loadedTiles.get(i),r=!1;if(!s){const h=e.find(d=>t.layerIds.includes(d.id));if(!h)return;const l=h.tileScheme,c=l.getTileBounds(t.tileKey),u=Ae._snapOrigin(c);s=new Bl(t.tileKey,c,u),s.reprojector=((o=l.getReprojector)==null?void 0:o.call(l,t.tileKey))??void 0,r=!0}const a=new AbortController;this._loading.set(i,{controller:a,layerIds:new Set(t.layerIds)}),this.scheduler.startLoading(t.tileKey,a);try{s.state="loading";const h=t.layerIds.map(async c=>{const u=e.find(_=>_.id===c);return!u||s.contents.some(_=>_.layerId===c)?null:await this._loadFn(s,u,a.signal)}),l=await Promise.allSettled(h);for(const c of l)c.status==="fulfilled"&&c.value&&s.contents.push(c.value);s.contents.length>0?(s.state="loaded",r&&(this._loadedTiles.set(i,s),this.cache.set(i,s,this._estimateBytes(s))),this.scheduler.markLoaded(t.tileKey),this._evictRefinedParents(),this._evictOldZoomTilesAfterLoad(t.tileKey)):(s.state="failed",this.scheduler.markFailed(t.tileKey))}catch(h){if((h==null?void 0:h.name)==="AbortError"){s.state=s.contents.length>0?"loaded":"unloaded";return}s.state="failed",s.failCount++,this._failCounts.set(i,(this._failCounts.get(i)??0)+1),this.scheduler.markFailed(t.tileKey)}finally{this._loading.delete(i)}}_estimateBytes(t){var i,s,r,a,o,h,l,c;let e=1024;for(const u of t.contents){for(const d of u.renderObjects){const f=d.object;if(f!=null&&f.geometry){const _=(s=(i=f.geometry).getAttribute)==null?void 0:s.call(i,"position");if(_){e+=_.array.byteLength;const g=(a=(r=f.geometry).getAttribute)==null?void 0:a.call(r,"uv");g&&(e+=g.array.byteLength);const p=(h=(o=f.geometry).getIndex)==null?void 0:h.call(o);p&&(e+=p.array.byteLength)}}if((c=(l=f==null?void 0:f.material)==null?void 0:l.map)!=null&&c.image){const _=f.material.map.image;e+=(_.width??256)*(_.height??256)*4}}e=Math.max(e,4096)}return e}static _snapOrigin(t){const e=t[2]-t[0],i=t[3]-t[1],s=Math.max(1,Math.min(e,i)/4);return{x:Math.floor(t[0]/s)*s,y:Math.floor(t[1]/s)*s,z:0}}};U(Ae,"EXTENT_MOVE_FACTOR",.05),U(Ae,"MAX_TOTAL_TILES",8192),U(Ae,"MAX_FAIL_COUNT",3),U(Ae,"TRANSITION_TIMEOUT_MS",5e3);let Xo=Ae;const aa=class aa{constructor(t){U(this,"crs");U(this,"layerManager",new kg);U(this,"floatingOrigin");U(this,"tileManager");U(this,"cameraController");U(this,"_container");U(this,"_maxCacheBytes");U(this,"_onOriginShift");U(this,"_running",!1);U(this,"_rafId",0);U(this,"_lastTime",0);U(this,"_mapUpdateTime",0);U(this,"_tick",()=>{if(!this._running)return;const t=performance.now(),e=(t-this._lastTime)/1e3;if(this._lastTime=t,this.cameraController.update(e),t-this._mapUpdateTime>=aa.UPDATE_INTERVAL_MS){this._mapUpdateTime=t;const s=this.cameraController.extent,r=this.cameraController.cameraWorldPos,a=this.floatingOrigin.current;this.floatingOrigin.update(r)&&this._onOriginShift&&this._onOriginShift(this.floatingOrigin.current,a);const h=this.layerManager.getVisibleLayers();this.tileManager.update(s,r,this.crs,h,this.cameraController.resolution),this.tileManager.evict(this._maxCacheBytes)}this._rafId=requestAnimationFrame(this._tick)});if(this.crs=t.crs,this._container=t.container,this._maxCacheBytes=t.maxCacheBytes??256*1024*1024,this._onOriginShift=t.onOriginShift,this.floatingOrigin=t.floatingOrigin??new Vg({threshold:500}),this.tileManager=new Xo(t.tileCache??new Hg,this.floatingOrigin,t.tileLoadFn),this.cameraController=t.cameraController??new Wg,t.groups)for(const e of t.groups)this.layerManager.addGroup(e)}get tileCache(){return this.tileManager.cache}start(){this._running||(this._running=!0,this.cameraController.attach(this._container),this._lastTime=performance.now(),this._tick())}stop(){this._running=!1,this._rafId&&(cancelAnimationFrame(this._rafId),this._rafId=0),this.cameraController.detach()}dispose(){this.stop(),this.tileManager.dispose(),this.cameraController.dispose(),this.layerManager.clear()}crsToWorld(t){return{x:t.x-this.floatingOrigin.current.x,y:t.y-this.floatingOrigin.current.y,z:t.z}}worldToCrs(t){return{x:t.x+this.floatingOrigin.current.x,y:t.y+this.floatingOrigin.current.y,z:t.z}}screenToCrs(t,e,i,s){const r=e.x/i*2-1,a=-(e.y/s)*2+1,o=t.left+(r+1)/2*(t.right-t.left),h=t.bottom+(a+1)/2*(t.top-t.bottom);return this.worldToCrs({x:o,y:h,z:0})}};U(aa,"UPDATE_INTERVAL_MS",100);let zl=aa;const $e=class $e{constructor(t){U(this,"name");U(this,"units","meter");U(this,"centralMeridian");U(this,"falseEasting",5e5);U(this,"falseNorthing",0);this.centralMeridian=3*t,this.name=`CGCS2000_GK_${t}`}project(t,e){const i=this.toRadians(t-this.centralMeridian),s=this.toRadians(e),{a:r,e2:a,eP2:o}=$e,h=Math.sin(s),l=Math.cos(s),c=Math.tan(s),u=r/Math.sqrt(1-a*h*h),d=c*c,f=o*l*l,_=i*l,g=a*a,p=g*a,m=r*((1-a/4-3*g/64-5*p/256)*s-(3*a/8+3*g/32+45*p/1024)*Math.sin(2*s)+(15*g/256+45*p/1024)*Math.sin(4*s)-35*p/3072*Math.sin(6*s)),x=this.falseEasting+u*(_+(1-d+f)*_*_*_/6+(5-18*d+d*d+72*f-58*o)*_*_*_*_*_/120),v=this.falseNorthing+m+u*c*(_*_/2+(5-d+9*f+4*f*f)*_*_*_*_/24+(61-58*d+d*d+600*f-330*o)*_*_*_*_*_*_/720);return{x,y:v}}unproject(t,e){const{a:i,e2:s,eP2:r}=$e,a=s*s,o=a*s,h=1-s/4-3*a/64-5*o/256,l=(e-this.falseNorthing)/(i*h),c=(1-Math.sqrt(1-s))/(1+Math.sqrt(1-s)),u=Math.sin(2*l),d=Math.sin(4*l),f=Math.sin(6*l),_=Math.sin(8*l),g=c*c,p=g*c,m=p*c,x=l+(3*c/2-27*p/32)*u+(21*g/16-55*m/32)*d+151*p/96*f+1097*m/512*_,v=Math.sin(x),S=Math.cos(x),L=Math.tan(x),b=i/Math.sqrt(1-s*v*v),w=L*L,C=r*S*S,E=(t-this.falseEasting)/b,y=i*(1-s)/Math.pow(1-s*v*v,1.5),P=b*L/y*(E*E/2-(5+3*w+10*C-4*C*C-9*r)*E*E*E*E/24+(61+90*w+298*C+45*w*w-252*r-3*C*C)*E*E*E*E*E*E/720),k=x-P,B=this.toRadians(this.centralMeridian)+(E-(1+2*w+C)*E*E*E/6+(5-2*C+28*w-3*C*C+8*r+24*w*w)*E*E*E*E*E/120)/S;return{lon:this.toDegrees(B),lat:this.toDegrees(k)}}toRadians(t){return t*Math.PI/180}toDegrees(t){return t*180/Math.PI}};U($e,"a",6378137),U($e,"f",1/298.257222101),U($e,"e2",2*$e.f-$e.f*$e.f),U($e,"eP2",$e.e2/(1-$e.e2));let kl=$e;function qg(n){n("EPSG:4326","+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"),n("EPSG:4269","+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"),n("EPSG:3857","+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");for(var t=1;t<=60;++t)n("EPSG:"+(32600+t),"+proj=utm +zone="+t+" +datum=WGS84 +units=m"),n("EPSG:"+(32700+t),"+proj=utm +zone="+t+" +south +datum=WGS84 +units=m");n("EPSG:5041","+title=WGS 84 / UPS North (E,N) +proj=stere +lat_0=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m"),n("EPSG:5042","+title=WGS 84 / UPS South (E,N) +proj=stere +lat_0=-90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m"),n.WGS84=n["EPSG:4326"],n["EPSG:3785"]=n["EPSG:3857"],n.GOOGLE=n["EPSG:3857"],n["EPSG:900913"]=n["EPSG:3857"],n["EPSG:102113"]=n["EPSG:3857"]}var _i=1,gi=2,Ji=3,Yg=4,qo=5,Hl=6378137,$g=6356752314e-3,Vl=.0066943799901413165,ws=484813681109536e-20,j=Math.PI/2,Kg=.16666666666666666,jg=.04722222222222222,Zg=.022156084656084655,st=1e-10,oe=.017453292519943295,Be=57.29577951308232,qt=Math.PI/4,Fs=Math.PI*2,le=3.14159265359,Ve={};Ve.greenwich=0;Ve.lisbon=-9.131906111111;Ve.paris=2.337229166667;Ve.bogota=-74.080916666667;Ve.madrid=-3.687938888889;Ve.rome=12.452333333333;Ve.bern=7.439583333333;Ve.jakarta=106.807719444444;Ve.ferro=-17.666666666667;Ve.brussels=4.367975;Ve.stockholm=18.058277777778;Ve.athens=23.7163375;Ve.oslo=10.722916666667;const Jg={mm:{to_meter:.001},cm:{to_meter:.01},ft:{to_meter:.3048},"us-ft":{to_meter:1200/3937},fath:{to_meter:1.8288},kmi:{to_meter:1852},"us-ch":{to_meter:20.1168402336805},"us-mi":{to_meter:1609.34721869444},km:{to_meter:1e3},"ind-ft":{to_meter:.30479841},"ind-yd":{to_meter:.91439523},mi:{to_meter:1609.344},yd:{to_meter:.9144},ch:{to_meter:20.1168},link:{to_meter:.201168},dm:{to_meter:.1},in:{to_meter:.0254},"ind-ch":{to_meter:20.11669506},"us-in":{to_meter:.025400050800101},"us-yd":{to_meter:.914401828803658}};var Wl=/[\s_\-\/\(\)]/g;function Yn(n,t){if(n[t])return n[t];for(var e=Object.keys(n),i=t.toLowerCase().replace(Wl,""),s=-1,r,a;++s<e.length;)if(r=e[s],a=r.toLowerCase().replace(Wl,""),a===i)return n[r]}function Yo(n){var t={},e=n.split("+").map(function(o){return o.trim()}).filter(function(o){return o}).reduce(function(o,h){var l=h.split("=");return l.push(!0),o[l[0].toLowerCase()]=l[1],o},{}),i,s,r,a={proj:"projName",datum:"datumCode",rf:function(o){t.rf=parseFloat(o)},lat_0:function(o){t.lat0=o*oe},lat_1:function(o){t.lat1=o*oe},lat_2:function(o){t.lat2=o*oe},lat_ts:function(o){t.lat_ts=o*oe},lon_0:function(o){t.long0=o*oe},lon_1:function(o){t.long1=o*oe},lon_2:function(o){t.long2=o*oe},alpha:function(o){t.alpha=parseFloat(o)*oe},gamma:function(o){t.rectified_grid_angle=parseFloat(o)*oe},lonc:function(o){t.longc=o*oe},x_0:function(o){t.x0=parseFloat(o)},y_0:function(o){t.y0=parseFloat(o)},k_0:function(o){t.k0=parseFloat(o)},k:function(o){t.k0=parseFloat(o)},a:function(o){t.a=parseFloat(o)},b:function(o){t.b=parseFloat(o)},r:function(o){t.a=t.b=parseFloat(o)},r_a:function(){t.R_A=!0},zone:function(o){t.zone=parseInt(o,10)},south:function(){t.utmSouth=!0},towgs84:function(o){t.datum_params=o.split(",").map(function(h){return parseFloat(h)})},to_meter:function(o){t.to_meter=parseFloat(o)},units:function(o){t.units=o;var h=Yn(Jg,o);h&&(t.to_meter=h.to_meter)},from_greenwich:function(o){t.from_greenwich=o*oe},pm:function(o){var h=Yn(Ve,o);t.from_greenwich=(h||parseFloat(o))*oe},nadgrids:function(o){o==="@null"?t.datumCode="none":t.nadgrids=o},axis:function(o){var h="ewnsud";o.length===3&&h.indexOf(o.substr(0,1))!==-1&&h.indexOf(o.substr(1,1))!==-1&&h.indexOf(o.substr(2,1))!==-1&&(t.axis=o)},approx:function(){t.approx=!0},over:function(){t.over=!0}};for(i in e)s=e[i],i in a?(r=a[i],typeof r=="function"?r(s):t[r]=s):t[i]=s;return typeof t.datumCode=="string"&&t.datumCode!=="WGS84"&&(t.datumCode=t.datumCode.toLowerCase()),t.projStr=n,t}class Qg{static getId(t){const e=t.find(i=>Array.isArray(i)&&i[0]==="ID");return e&&e.length>=3?{authority:e[1],code:parseInt(e[2],10)}:null}static convertUnit(t,e="unit"){if(!t||t.length<3)return{type:e,name:"unknown",conversion_factor:null};const i=t[1],s=parseFloat(t[2])||null,r=t.find(o=>Array.isArray(o)&&o[0]==="ID"),a=r?{authority:r[1],code:parseInt(r[2],10)}:null;return{type:e,name:i,conversion_factor:s,id:a}}static convertAxis(t){const e=t[1]||"Unknown";let i;const s=e.match(/^\((.)\)$/);if(s){const l=s[1].toUpperCase();if(l==="E")i="east";else if(l==="N")i="north";else if(l==="U")i="up";else if(t[2])i=t[2];else throw new Error(`Unknown axis abbreviation: ${l}`)}else i=t[2]||"unknown";const r=t.find(l=>Array.isArray(l)&&l[0]==="ORDER"),a=r?parseInt(r[1],10):null,o=t.find(l=>Array.isArray(l)&&(l[0]==="LENGTHUNIT"||l[0]==="ANGLEUNIT"||l[0]==="SCALEUNIT")),h=this.convertUnit(o);return{name:e,direction:i,unit:h,order:a}}static extractAxes(t){return t.filter(e=>Array.isArray(e)&&e[0]==="AXIS").map(e=>this.convertAxis(e)).sort((e,i)=>(e.order||0)-(i.order||0))}static convert(t,e={}){switch(t[0]){case"PROJCRS":e.type="ProjectedCRS",e.name=t[1],e.base_crs=t.find(f=>Array.isArray(f)&&f[0]==="BASEGEOGCRS")?this.convert(t.find(f=>Array.isArray(f)&&f[0]==="BASEGEOGCRS")):null,e.conversion=t.find(f=>Array.isArray(f)&&f[0]==="CONVERSION")?this.convert(t.find(f=>Array.isArray(f)&&f[0]==="CONVERSION")):null;const i=t.find(f=>Array.isArray(f)&&f[0]==="CS");i&&(e.coordinate_system={subtype:i[1],axis:this.extractAxes(t)});const s=t.find(f=>Array.isArray(f)&&f[0]==="LENGTHUNIT");if(s){const f=this.convertUnit(s);e.coordinate_system.unit=f}e.id=this.getId(t);break;case"BASEGEOGCRS":case"GEOGCRS":case"GEODCRS":e.type=t[0]==="GEODCRS"?"GeodeticCRS":"GeographicCRS",e.name=t[1];const r=t.find(f=>Array.isArray(f)&&(f[0]==="DATUM"||f[0]==="ENSEMBLE"));if(r){const f=this.convert(r);r[0]==="ENSEMBLE"?e.datum_ensemble=f:e.datum=f;const _=t.find(g=>Array.isArray(g)&&g[0]==="PRIMEM");_&&_[1]!=="Greenwich"&&(f.prime_meridian={name:_[1],longitude:parseFloat(_[2])})}const a=t.find(f=>Array.isArray(f)&&f[0]==="CS");e.coordinate_system={subtype:a?a[1]:"ellipsoidal",axis:this.extractAxes(t)},e.id=this.getId(t);break;case"DATUM":e.type="GeodeticReferenceFrame",e.name=t[1],e.ellipsoid=t.find(f=>Array.isArray(f)&&f[0]==="ELLIPSOID")?this.convert(t.find(f=>Array.isArray(f)&&f[0]==="ELLIPSOID")):null;break;case"ENSEMBLE":e.type="DatumEnsemble",e.name=t[1],e.members=t.filter(f=>Array.isArray(f)&&f[0]==="MEMBER").map(f=>({type:"DatumEnsembleMember",name:f[1],id:this.getId(f)}));const o=t.find(f=>Array.isArray(f)&&f[0]==="ENSEMBLEACCURACY");o&&(e.accuracy=parseFloat(o[1]));const h=t.find(f=>Array.isArray(f)&&f[0]==="ELLIPSOID");h&&(e.ellipsoid=this.convert(h)),e.id=this.getId(t);break;case"ELLIPSOID":e.type="Ellipsoid",e.name=t[1],e.semi_major_axis=parseFloat(t[2]),e.inverse_flattening=parseFloat(t[3]),t.find(f=>Array.isArray(f)&&f[0]==="LENGTHUNIT")&&this.convert(t.find(f=>Array.isArray(f)&&f[0]==="LENGTHUNIT"),e);break;case"CONVERSION":e.type="Conversion",e.name=t[1],e.method=t.find(f=>Array.isArray(f)&&f[0]==="METHOD")?this.convert(t.find(f=>Array.isArray(f)&&f[0]==="METHOD")):null,e.parameters=t.filter(f=>Array.isArray(f)&&f[0]==="PARAMETER").map(f=>this.convert(f));break;case"METHOD":e.type="Method",e.name=t[1],e.id=this.getId(t);break;case"PARAMETER":e.type="Parameter",e.name=t[1],e.value=parseFloat(t[2]),e.unit=this.convertUnit(t.find(f=>Array.isArray(f)&&(f[0]==="LENGTHUNIT"||f[0]==="ANGLEUNIT"||f[0]==="SCALEUNIT"))),e.id=this.getId(t);break;case"BOUNDCRS":e.type="BoundCRS";const l=t.find(f=>Array.isArray(f)&&f[0]==="SOURCECRS");if(l){const f=l.find(_=>Array.isArray(_));e.source_crs=f?this.convert(f):null}const c=t.find(f=>Array.isArray(f)&&f[0]==="TARGETCRS");if(c){const f=c.find(_=>Array.isArray(_));e.target_crs=f?this.convert(f):null}const u=t.find(f=>Array.isArray(f)&&f[0]==="ABRIDGEDTRANSFORMATION");u?e.transformation=this.convert(u):e.transformation=null;break;case"ABRIDGEDTRANSFORMATION":if(e.type="Transformation",e.name=t[1],e.method=t.find(f=>Array.isArray(f)&&f[0]==="METHOD")?this.convert(t.find(f=>Array.isArray(f)&&f[0]==="METHOD")):null,e.parameters=t.filter(f=>Array.isArray(f)&&(f[0]==="PARAMETER"||f[0]==="PARAMETERFILE")).map(f=>{if(f[0]==="PARAMETER")return this.convert(f);if(f[0]==="PARAMETERFILE")return{name:f[1],value:f[2],id:{authority:"EPSG",code:8656}}}),e.parameters.length===7){const f=e.parameters[6];f.name==="Scale difference"&&(f.value=Math.round((f.value-1)*1e12)/1e6)}e.id=this.getId(t);break;case"AXIS":e.coordinate_system||(e.coordinate_system={type:"unspecified",axis:[]}),e.coordinate_system.axis.push(this.convertAxis(t));break;case"LENGTHUNIT":const d=this.convertUnit(t,"LinearUnit");e.coordinate_system&&e.coordinate_system.axis&&e.coordinate_system.axis.forEach(f=>{f.unit||(f.unit=d)}),d.conversion_factor&&d.conversion_factor!==1&&e.semi_major_axis&&(e.semi_major_axis={value:e.semi_major_axis,unit:d});break;default:e.keyword=t[0];break}return e}}function tv(n){return Qg.convert(n)}function ev(n){const t=n.toUpperCase();return t.includes("PROJCRS")||t.includes("GEOGCRS")||t.includes("BOUNDCRS")||t.includes("VERTCRS")||t.includes("LENGTHUNIT")||t.includes("ANGLEUNIT")||t.includes("SCALEUNIT")?"WKT2":(t.includes("PROJCS")||t.includes("GEOGCS")||t.includes("LOCAL_CS")||t.includes("VERT_CS")||t.includes("UNIT"),"WKT1")}var Gs=1,iu=2,su=3,Zr=4,ru=5,dh=-1,nv=/\s/,iv=/[A-Za-z]/,sv=/[A-Za-z84_]/,ga=/[,\]]/,au=/[\d\.E\-\+]/;function In(n){if(typeof n!="string")throw new Error("not a string");this.text=n.trim(),this.level=0,this.place=0,this.root=null,this.stack=[],this.currentObject=null,this.state=Gs}In.prototype.readCharicter=function(){var n=this.text[this.place++];if(this.state!==Zr)for(;nv.test(n);){if(this.place>=this.text.length)return;n=this.text[this.place++]}switch(this.state){case Gs:return this.neutral(n);case iu:return this.keyword(n);case Zr:return this.quoted(n);case ru:return this.afterquote(n);case su:return this.number(n);case dh:return}};In.prototype.afterquote=function(n){if(n==='"'){this.word+='"',this.state=Zr;return}if(ga.test(n)){this.word=this.word.trim(),this.afterItem(n);return}throw new Error(`havn't handled "`+n+'" in afterquote yet, index '+this.place)};In.prototype.afterItem=function(n){if(n===","){this.word!==null&&this.currentObject.push(this.word),this.word=null,this.state=Gs;return}if(n==="]"){this.level--,this.word!==null&&(this.currentObject.push(this.word),this.word=null),this.state=Gs,this.currentObject=this.stack.pop(),this.currentObject||(this.state=dh);return}};In.prototype.number=function(n){if(au.test(n)){this.word+=n;return}if(ga.test(n)){this.word=parseFloat(this.word),this.afterItem(n);return}throw new Error(`havn't handled "`+n+'" in number yet, index '+this.place)};In.prototype.quoted=function(n){if(n==='"'){this.state=ru;return}this.word+=n};In.prototype.keyword=function(n){if(sv.test(n)){this.word+=n;return}if(n==="["){var t=[];t.push(this.word),this.level++,this.root===null?this.root=t:this.currentObject.push(t),this.stack.push(this.currentObject),this.currentObject=t,this.state=Gs;return}if(ga.test(n)){this.afterItem(n);return}throw new Error(`havn't handled "`+n+'" in keyword yet, index '+this.place)};In.prototype.neutral=function(n){if(iv.test(n)){this.word=n,this.state=iu;return}if(n==='"'){this.word="",this.state=Zr;return}if(au.test(n)){this.word=n,this.state=su;return}if(ga.test(n)){this.afterItem(n);return}throw new Error(`havn't handled "`+n+'" in neutral yet, index '+this.place)};In.prototype.output=function(){for(;this.place<this.text.length;)this.readCharicter();if(this.state===dh)return this.root;throw new Error('unable to parse string "'+this.text+'". State is '+this.state)};function rv(n){var t=new In(n);return t.output()}function Qa(n,t,e){Array.isArray(t)&&(e.unshift(t),t=null);var i=t?{}:n,s=e.reduce(function(r,a){return Vi(a,r),r},i);t&&(n[t]=s)}function Vi(n,t){if(!Array.isArray(n)){t[n]=!0;return}var e=n.shift();if(e==="PARAMETER"&&(e=n.shift()),n.length===1){if(Array.isArray(n[0])){t[e]={},Vi(n[0],t[e]);return}t[e]=n[0];return}if(!n.length){t[e]=!0;return}if(e==="TOWGS84"){t[e]=n;return}if(e==="AXIS"){e in t||(t[e]=[]),t[e].push(n);return}Array.isArray(e)||(t[e]={});var i;switch(e){case"UNIT":case"PRIMEM":case"VERT_DATUM":t[e]={name:n[0].toLowerCase(),convert:n[1]},n.length===3&&Vi(n[2],t[e]);return;case"SPHEROID":case"ELLIPSOID":t[e]={name:n[0],a:n[1],rf:n[2]},n.length===4&&Vi(n[3],t[e]);return;case"EDATUM":case"ENGINEERINGDATUM":case"LOCAL_DATUM":case"DATUM":case"VERT_CS":case"VERTCRS":case"VERTICALCRS":n[0]=["name",n[0]],Qa(t,e,n);return;case"COMPD_CS":case"COMPOUNDCRS":case"FITTED_CS":case"PROJECTEDCRS":case"PROJCRS":case"GEOGCS":case"GEOCCS":case"PROJCS":case"LOCAL_CS":case"GEODCRS":case"GEODETICCRS":case"GEODETICDATUM":case"ENGCRS":case"ENGINEERINGCRS":n[0]=["name",n[0]],Qa(t,e,n),t[e].type=e;return;default:for(i=-1;++i<n.length;)if(!Array.isArray(n[i]))return Vi(n,t[e]);return Qa(t,e,n)}}var av=.017453292519943295;function tn(n){return n*av}function ou(n){const t=(n.projName||"").toLowerCase().replace(/_/g," ");n.long0===void 0&&n.longc!==void 0&&(n.long0=n.longc),!n.lat_ts&&n.lat1&&(t==="stereographic south pole"||t==="polar stereographic (variant b)")?(n.lat0=tn(n.lat1>0?90:-90),n.lat_ts=n.lat1,delete n.lat1):!n.lat_ts&&n.lat0&&(t==="polar stereographic"||t==="polar stereographic (variant a)")&&(n.lat_ts=n.lat0,n.lat0=tn(n.lat0>0?90:-90),delete n.lat1)}function Xl(n){let t={units:null,to_meter:void 0};return typeof n=="string"?(t.units=n.toLowerCase(),t.units==="metre"&&(t.units="meter"),t.units==="meter"&&(t.to_meter=1)):n&&n.name&&(t.units=n.name.toLowerCase(),t.units==="metre"&&(t.units="meter"),t.to_meter=n.conversion_factor),t}function ql(n){return typeof n=="object"?n.value*n.unit.conversion_factor:n}function Yl(n,t){n.ellipsoid.radius?(t.a=n.ellipsoid.radius,t.rf=0):(t.a=ql(n.ellipsoid.semi_major_axis),n.ellipsoid.inverse_flattening!==void 0?t.rf=n.ellipsoid.inverse_flattening:n.ellipsoid.semi_major_axis!==void 0&&n.ellipsoid.semi_minor_axis!==void 0&&(t.rf=t.a/(t.a-ql(n.ellipsoid.semi_minor_axis))))}function Jr(n,t={}){return!n||typeof n!="object"?n:n.type==="BoundCRS"?(Jr(n.source_crs,t),n.transformation&&(n.transformation.method&&n.transformation.method.name==="NTv2"?t.nadgrids=n.transformation.parameters[0].value:t.datum_params=n.transformation.parameters.map(e=>e.value)),t):(Object.keys(n).forEach(e=>{const i=n[e];if(i!==null)switch(e){case"name":if(t.srsCode)break;t.name=i,t.srsCode=i;break;case"type":i==="GeographicCRS"?t.projName="longlat":i==="GeodeticCRS"?n.coordinate_system&&n.coordinate_system.subtype==="Cartesian"?t.projName="geocent":t.projName="longlat":i==="ProjectedCRS"&&n.conversion&&n.conversion.method&&(t.projName=n.conversion.method.name);break;case"datum":case"datum_ensemble":i.ellipsoid&&(t.ellps=i.ellipsoid.name,Yl(i,t)),i.prime_meridian&&(t.from_greenwich=i.prime_meridian.longitude*Math.PI/180);break;case"ellipsoid":t.ellps=i.name,Yl(i,t);break;case"prime_meridian":t.long0=(i.longitude||0)*Math.PI/180;break;case"coordinate_system":if(i.axis){const s={east:"e",north:"n",west:"w",south:"s",up:"u",down:"d",geocentricx:"e",geocentricy:"n",geocentricz:"u"},r=i.axis.map(a=>s[a.direction.toLowerCase()]);if(r.every(Boolean)&&(t.axis=r.join(""),t.axis.length===2&&(t.axis+="u")),i.unit){const{units:a,to_meter:o}=Xl(i.unit);t.units=a,t.to_meter=o}else if(i.axis[0]&&i.axis[0].unit){const{units:a,to_meter:o}=Xl(i.axis[0].unit);t.units=a,t.to_meter=o}}break;case"id":i.authority&&i.code&&(t.title=i.authority+":"+i.code);break;case"conversion":i.method&&i.method.name&&(t.projName=i.method.name),i.parameters&&i.parameters.forEach(s=>{const r=s.name.toLowerCase().replace(/\s+/g,"_"),a=s.value;s.unit&&s.unit.conversion_factor?t[r]=a*s.unit.conversion_factor:s.unit==="degree"?t[r]=a*Math.PI/180:t[r]=a});break;case"unit":i.name&&(t.units=i.name.toLowerCase(),t.units==="metre"&&(t.units="meter")),i.conversion_factor&&(t.to_meter=i.conversion_factor);break;case"base_crs":Jr(i,t),t.datumCode=i.id?i.id.authority+"_"+i.id.code:i.name;break}}),t.latitude_of_false_origin!==void 0&&(t.lat0=t.latitude_of_false_origin),t.longitude_of_false_origin!==void 0&&(t.long0=t.longitude_of_false_origin),t.latitude_of_standard_parallel!==void 0&&(t.lat0=t.latitude_of_standard_parallel,t.lat1=t.latitude_of_standard_parallel),t.latitude_of_1st_standard_parallel!==void 0&&(t.lat1=t.latitude_of_1st_standard_parallel),t.latitude_of_2nd_standard_parallel!==void 0&&(t.lat2=t.latitude_of_2nd_standard_parallel),t.latitude_of_projection_centre!==void 0&&(t.lat0=t.latitude_of_projection_centre),t.longitude_of_projection_centre!==void 0&&(t.longc=t.longitude_of_projection_centre),t.easting_at_false_origin!==void 0&&(t.x0=t.easting_at_false_origin),t.northing_at_false_origin!==void 0&&(t.y0=t.northing_at_false_origin),t.latitude_of_natural_origin!==void 0&&(t.lat0=t.latitude_of_natural_origin),t.longitude_of_natural_origin!==void 0&&(t.long0=t.longitude_of_natural_origin),t.longitude_of_origin!==void 0&&(t.long0=t.longitude_of_origin),t.false_easting!==void 0&&(t.x0=t.false_easting),t.easting_at_projection_centre&&(t.x0=t.easting_at_projection_centre),t.false_northing!==void 0&&(t.y0=t.false_northing),t.northing_at_projection_centre&&(t.y0=t.northing_at_projection_centre),t.standard_parallel_1!==void 0&&(t.lat1=t.standard_parallel_1),t.standard_parallel_2!==void 0&&(t.lat2=t.standard_parallel_2),t.scale_factor_at_natural_origin!==void 0&&(t.k0=t.scale_factor_at_natural_origin),t.scale_factor_at_projection_centre!==void 0&&(t.k0=t.scale_factor_at_projection_centre),t.scale_factor_on_pseudo_standard_parallel!==void 0&&(t.k0=t.scale_factor_on_pseudo_standard_parallel),t.azimuth!==void 0&&(t.alpha=t.azimuth),t.azimuth_at_projection_centre!==void 0&&(t.alpha=t.azimuth_at_projection_centre),t.angle_from_rectified_to_skew_grid&&(t.rectified_grid_angle=t.angle_from_rectified_to_skew_grid),ou(t),t)}var ov=["PROJECTEDCRS","PROJCRS","GEOGCS","GEOCCS","PROJCS","LOCAL_CS","GEODCRS","GEODETICCRS","GEODETICDATUM","ENGCRS","ENGINEERINGCRS"];function hv(n,t){var e=t[0],i=t[1];!(e in n)&&i in n&&(n[e]=n[i],t.length===3&&(n[e]=t[2](n[e])))}function hu(n){for(var t=Object.keys(n),e=0,i=t.length;e<i;++e){var s=t[e];ov.indexOf(s)!==-1&&lv(n[s]),typeof n[s]=="object"&&hu(n[s])}}function lv(n){if(n.AUTHORITY){var t=Object.keys(n.AUTHORITY)[0];t&&t in n.AUTHORITY&&(n.title=t+":"+n.AUTHORITY[t])}if(n.type==="GEOGCS"?n.projName="longlat":n.type==="LOCAL_CS"?(n.projName="identity",n.local=!0):typeof n.PROJECTION=="object"?n.projName=Object.keys(n.PROJECTION)[0]:n.projName=n.PROJECTION,n.AXIS){for(var e="",i=0,s=n.AXIS.length;i<s;++i){var r=[n.AXIS[i][0].toLowerCase(),n.AXIS[i][1].toLowerCase()];r[0].indexOf("north")!==-1||(r[0]==="y"||r[0]==="lat")&&r[1]==="north"?e+="n":r[0].indexOf("south")!==-1||(r[0]==="y"||r[0]==="lat")&&r[1]==="south"?e+="s":r[0].indexOf("east")!==-1||(r[0]==="x"||r[0]==="lon")&&r[1]==="east"?e+="e":(r[0].indexOf("west")!==-1||(r[0]==="x"||r[0]==="lon")&&r[1]==="west")&&(e+="w")}e.length===2&&(e+="u"),e.length===3&&(n.axis=e)}n.UNIT&&(n.units=n.UNIT.name.toLowerCase(),n.units==="metre"&&(n.units="meter"),n.UNIT.convert&&(n.type==="GEOGCS"?n.DATUM&&n.DATUM.SPHEROID&&(n.to_meter=n.UNIT.convert*n.DATUM.SPHEROID.a):n.to_meter=n.UNIT.convert));var a=n.GEOGCS;n.type==="GEOGCS"&&(a=n),a&&(a.PRIMEM&&a.PRIMEM.convert&&(n.from_greenwich=tn(a.PRIMEM.convert)),a.DATUM?n.datumCode=a.DATUM.name.toLowerCase():n.datumCode=a.name.toLowerCase(),n.datumCode.slice(0,2)==="d_"&&(n.datumCode=n.datumCode.slice(2)),n.datumCode==="new_zealand_1949"&&(n.datumCode="nzgd49"),(n.datumCode==="wgs_1984"||n.datumCode==="world_geodetic_system_1984")&&(n.PROJECTION==="Mercator_Auxiliary_Sphere"&&(n.sphere=!0),n.datumCode="wgs84"),n.datumCode==="belge_1972"&&(n.datumCode="rnb72"),a.DATUM&&a.DATUM.SPHEROID&&(n.ellps=a.DATUM.SPHEROID.name.replace("_19","").replace(/[Cc]larke\_18/,"clrk"),n.ellps.toLowerCase().slice(0,13)==="international"&&(n.ellps="intl"),n.a=a.DATUM.SPHEROID.a,n.rf=parseFloat(a.DATUM.SPHEROID.rf)),a.DATUM&&a.DATUM.TOWGS84&&(n.datum_params=a.DATUM.TOWGS84),~n.datumCode.indexOf("osgb_1936")&&(n.datumCode="osgb36"),~n.datumCode.indexOf("osni_1952")&&(n.datumCode="osni52"),(~n.datumCode.indexOf("tm65")||~n.datumCode.indexOf("geodetic_datum_of_1965"))&&(n.datumCode="ire65"),n.datumCode==="ch1903+"&&(n.datumCode="ch1903"),~n.datumCode.indexOf("israel")&&(n.datumCode="isr93")),n.b&&!isFinite(n.b)&&(n.b=n.a),n.rectified_grid_angle&&(n.rectified_grid_angle=tn(n.rectified_grid_angle));function o(c){var u=n.to_meter||1;return c*u}var h=function(c){return hv(n,c)},l=[["standard_parallel_1","Standard_Parallel_1"],["standard_parallel_1","Latitude of 1st standard parallel"],["standard_parallel_2","Standard_Parallel_2"],["standard_parallel_2","Latitude of 2nd standard parallel"],["false_easting","False_Easting"],["false_easting","False easting"],["false-easting","Easting at false origin"],["false_northing","False_Northing"],["false_northing","False northing"],["false_northing","Northing at false origin"],["central_meridian","Central_Meridian"],["central_meridian","Longitude of natural origin"],["central_meridian","Longitude of false origin"],["latitude_of_origin","Latitude_Of_Origin"],["latitude_of_origin","Central_Parallel"],["latitude_of_origin","Latitude of natural origin"],["latitude_of_origin","Latitude of false origin"],["scale_factor","Scale_Factor"],["k0","scale_factor"],["latitude_of_center","Latitude_Of_Center"],["latitude_of_center","Latitude_of_center"],["lat0","latitude_of_center",tn],["longitude_of_center","Longitude_Of_Center"],["longitude_of_center","Longitude_of_center"],["longc","longitude_of_center",tn],["x0","false_easting",o],["y0","false_northing",o],["long0","central_meridian",tn],["lat0","latitude_of_origin",tn],["lat0","standard_parallel_1",tn],["lat1","standard_parallel_1",tn],["lat2","standard_parallel_2",tn],["azimuth","Azimuth"],["alpha","azimuth",tn],["srsCode","name"]];l.forEach(h),ou(n)}function Qr(n){if(typeof n=="object")return Jr(n);const t=ev(n);var e=rv(n);if(t==="WKT2"){const r=tv(e);return Jr(r)}var i=e[0],s={};return Vi(e,s),hu(s),s[i]}function Te(n){var t=this;if(arguments.length===2){var e=arguments[1];typeof e=="string"?e.charAt(0)==="+"?Te[n]=Yo(arguments[1]):Te[n]=Qr(arguments[1]):e&&typeof e=="object"&&!("projName"in e)?Te[n]=Qr(arguments[1]):(Te[n]=e,e||delete Te[n])}else if(arguments.length===1){if(Array.isArray(n))return n.map(function(i){return Array.isArray(i)?Te.apply(t,i):Te(i)});if(typeof n=="string"){if(n in Te)return Te[n]}else"EPSG"in n?Te["EPSG:"+n.EPSG]=n:"ESRI"in n?Te["ESRI:"+n.ESRI]=n:"IAU2000"in n?Te["IAU2000:"+n.IAU2000]=n:console.log(n);return}}qg(Te);function cv(n){return typeof n=="string"}function uv(n){return n in Te}function fv(n){return n.indexOf("+")!==0&&n.indexOf("[")!==-1||typeof n=="object"&&!("srsCode"in n)}var $l=["3857","900913","3785","102113"];function dv(n){if(n.title)return n.title.toLowerCase().indexOf("epsg:")===0&&$l.indexOf(n.title.substr(5))>-1;var t=Yn(n,"authority");if(t){var e=Yn(t,"epsg");return e&&$l.indexOf(e)>-1}}function pv(n){var t=Yn(n,"extension");if(t)return Yn(t,"proj4")}function mv(n){return n[0]==="+"}function _v(n){let t;if(cv(n))if(uv(n))t=Te[n];else if(fv(n)){t=Qr(n);var e=pv(t);e&&(t=Yo(e))}else mv(n)&&(t=Yo(n));else"projName"in n?t=n:t=Qr(n);return t&&dv(t)?Te["EPSG:3857"]:t}function Kl(n,t){n=n||{};var e,i;if(!t)return n;for(i in t)e=t[i],e!==void 0&&(n[i]=e);return n}function vn(n,t,e){var i=n*t;return e/Math.sqrt(1-i*i)}function qs(n){return n<0?-1:1}function at(n,t){return t||Math.abs(n)<=le?n:n-qs(n)*Fs}function dn(n,t,e){var i=n*e,s=.5*n;return i=Math.pow((1-i)/(1+i),s),Math.tan(.5*(j-t))/i}function Bs(n,t){for(var e=.5*n,i,s,r=j-2*Math.atan(t),a=0;a<=15;a++)if(i=n*Math.sin(r),s=j-2*Math.atan(t*Math.pow((1-i)/(1+i),e))-r,r+=s,Math.abs(s)<=1e-10)return r;return-9999}function gv(){var n=this.b/this.a;this.es=1-n*n,"x0"in this||(this.x0=0),"y0"in this||(this.y0=0),this.e=Math.sqrt(this.es),this.lat_ts?this.sphere?this.k0=Math.cos(this.lat_ts):this.k0=vn(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts)):this.k0||(this.k?this.k0=this.k:this.k0=1)}function vv(n){var t=n.x,e=n.y;if(e*Be>90&&e*Be<-90&&t*Be>180&&t*Be<-180)return null;var i,s;if(Math.abs(Math.abs(e)-j)<=st)return null;if(this.sphere)i=this.x0+this.a*this.k0*at(t-this.long0,this.over),s=this.y0+this.a*this.k0*Math.log(Math.tan(qt+.5*e));else{var r=Math.sin(e),a=dn(this.e,e,r);i=this.x0+this.a*this.k0*at(t-this.long0,this.over),s=this.y0-this.a*this.k0*Math.log(a)}return n.x=i,n.y=s,n}function Mv(n){var t=n.x-this.x0,e=n.y-this.y0,i,s;if(this.sphere)s=j-2*Math.atan(Math.exp(-e/(this.a*this.k0)));else{var r=Math.exp(-e/(this.a*this.k0));if(s=Bs(this.e,r),s===-9999)return null}return i=at(this.long0+t/(this.a*this.k0),this.over),n.x=i,n.y=s,n}var xv=["Mercator","Popular Visualisation Pseudo Mercator","Mercator_1SP","Mercator_Auxiliary_Sphere","Mercator_Variant_A","merc"];const yv={init:gv,forward:vv,inverse:Mv,names:xv};function Sv(){}function jl(n){return n}var lu=["longlat","identity"];const Ev={init:Sv,forward:jl,inverse:jl,names:lu};var Tv=[yv,Ev],ri={},Wi=[];function cu(n,t){var e=Wi.length;return n.names?(Wi[e]=n,n.names.forEach(function(i){ri[i.toLowerCase()]=e}),this):(console.log(t),!0)}function uu(n){return n.replace(/[-\(\)\s]+/g," ").trim().replace(/ /g,"_")}function bv(n){if(!n)return!1;var t=n.toLowerCase();if(typeof ri[t]<"u"&&Wi[ri[t]]||(t=uu(t),t in ri&&Wi[ri[t]]))return Wi[ri[t]]}function wv(){Tv.forEach(cu)}const Av={start:wv,add:cu,get:bv};var fu={MERIT:{a:6378137,rf:298.257,ellipseName:"MERIT 1983"},SGS85:{a:6378136,rf:298.257,ellipseName:"Soviet Geodetic System 85"},GRS80:{a:6378137,rf:298.257222101,ellipseName:"GRS 1980(IUGG, 1980)"},IAU76:{a:6378140,rf:298.257,ellipseName:"IAU 1976"},airy:{a:6377563396e-3,b:635625691e-2,ellipseName:"Airy 1830"},APL4:{a:6378137,rf:298.25,ellipseName:"Appl. Physics. 1965"},NWL9D:{a:6378145,rf:298.25,ellipseName:"Naval Weapons Lab., 1965"},mod_airy:{a:6377340189e-3,b:6356034446e-3,ellipseName:"Modified Airy"},andrae:{a:637710443e-2,rf:300,ellipseName:"Andrae 1876 (Den., Iclnd.)"},aust_SA:{a:6378160,rf:298.25,ellipseName:"Australian Natl & S. Amer. 1969"},GRS67:{a:6378160,rf:298.247167427,ellipseName:"GRS 67(IUGG 1967)"},bessel:{a:6377397155e-3,rf:299.1528128,ellipseName:"Bessel 1841"},bess_nam:{a:6377483865e-3,rf:299.1528128,ellipseName:"Bessel 1841 (Namibia)"},clrk66:{a:63782064e-1,b:63565838e-1,ellipseName:"Clarke 1866"},clrk80:{a:6378249145e-3,rf:293.4663,ellipseName:"Clarke 1880 mod."},clrk80ign:{a:63782492e-1,b:6356515,rf:293.4660213,ellipseName:"Clarke 1880 (IGN)"},clrk58:{a:6378293645208759e-9,rf:294.2606763692654,ellipseName:"Clarke 1858"},CPM:{a:63757387e-1,rf:334.29,ellipseName:"Comm. des Poids et Mesures 1799"},delmbr:{a:6376428,rf:311.5,ellipseName:"Delambre 1810 (Belgium)"},engelis:{a:637813605e-2,rf:298.2566,ellipseName:"Engelis 1985"},evrst30:{a:6377276345e-3,rf:300.8017,ellipseName:"Everest 1830"},evrst48:{a:6377304063e-3,rf:300.8017,ellipseName:"Everest 1948"},evrst56:{a:6377301243e-3,rf:300.8017,ellipseName:"Everest 1956"},evrst69:{a:6377295664e-3,rf:300.8017,ellipseName:"Everest 1969"},evrstSS:{a:6377298556e-3,rf:300.8017,ellipseName:"Everest (Sabah & Sarawak)"},fschr60:{a:6378166,rf:298.3,ellipseName:"Fischer (Mercury Datum) 1960"},fschr60m:{a:6378155,rf:298.3,ellipseName:"Fischer 1960"},fschr68:{a:6378150,rf:298.3,ellipseName:"Fischer 1968"},helmert:{a:6378200,rf:298.3,ellipseName:"Helmert 1906"},hough:{a:6378270,rf:297,ellipseName:"Hough"},intl:{a:6378388,rf:297,ellipseName:"International 1909 (Hayford)"},kaula:{a:6378163,rf:298.24,ellipseName:"Kaula 1961"},lerch:{a:6378139,rf:298.257,ellipseName:"Lerch 1979"},mprts:{a:6397300,rf:191,ellipseName:"Maupertius 1738"},new_intl:{a:63781575e-1,b:63567722e-1,ellipseName:"New International 1967"},plessis:{a:6376523,rf:6355863,ellipseName:"Plessis 1817 (France)"},krass:{a:6378245,rf:298.3,ellipseName:"Krassovsky, 1942"},SEasia:{a:6378155,b:63567733205e-4,ellipseName:"Southeast Asia"},walbeck:{a:6376896,b:63558348467e-4,ellipseName:"Walbeck"},WGS60:{a:6378165,rf:298.3,ellipseName:"WGS 60"},WGS66:{a:6378145,rf:298.25,ellipseName:"WGS 66"},WGS7:{a:6378135,rf:298.26,ellipseName:"WGS 72"},WGS84:{a:6378137,rf:298.257223563,ellipseName:"WGS 84"},sphere:{a:6370997,b:6370997,ellipseName:"Normal Sphere (r=6370997)"}};const Pv=fu.WGS84;function Rv(n,t,e,i){var s=n*n,r=t*t,a=(s-r)/s,o=0;i?(n*=1-a*(Kg+a*(jg+a*Zg)),s=n*n,a=0):o=Math.sqrt(a);var h=(s-r)/r;return{es:a,e:o,ep2:h}}function Cv(n,t,e,i,s){if(!n){var r=Yn(fu,i);r||(r=Pv),n=r.a,t=r.b,e=r.rf}return e&&!t&&(t=(1-1/e)*n),(e===0||Math.abs(n-t)<st)&&(s=!0,t=n),{a:n,b:t,rf:e,sphere:s}}var Br={wgs84:{towgs84:"0,0,0",ellipse:"WGS84",datumName:"WGS84"},ch1903:{towgs84:"674.374,15.056,405.346",ellipse:"bessel",datumName:"swiss"},ggrs87:{towgs84:"-199.87,74.79,246.62",ellipse:"GRS80",datumName:"Greek_Geodetic_Reference_System_1987"},nad83:{towgs84:"0,0,0",ellipse:"GRS80",datumName:"North_American_Datum_1983"},nad27:{nadgrids:"@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",ellipse:"clrk66",datumName:"North_American_Datum_1927"},potsdam:{towgs84:"598.1,73.7,418.2,0.202,0.045,-2.455,6.7",ellipse:"bessel",datumName:"Potsdam Rauenberg 1950 DHDN"},carthage:{towgs84:"-263.0,6.0,431.0",ellipse:"clark80",datumName:"Carthage 1934 Tunisia"},hermannskogel:{towgs84:"577.326,90.129,463.919,5.137,1.474,5.297,2.4232",ellipse:"bessel",datumName:"Hermannskogel"},mgi:{towgs84:"577.326,90.129,463.919,5.137,1.474,5.297,2.4232",ellipse:"bessel",datumName:"Militar-Geographische Institut"},osni52:{towgs84:"482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",ellipse:"airy",datumName:"Irish National"},ire65:{towgs84:"482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",ellipse:"mod_airy",datumName:"Ireland 1965"},rassadiran:{towgs84:"-133.63,-157.5,-158.62",ellipse:"intl",datumName:"Rassadiran"},nzgd49:{towgs84:"59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",ellipse:"intl",datumName:"New Zealand Geodetic Datum 1949"},osgb36:{towgs84:"446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",ellipse:"airy",datumName:"Ordnance Survey of Great Britain 1936"},s_jtsk:{towgs84:"589,76,480",ellipse:"bessel",datumName:"S-JTSK (Ferro)"},beduaram:{towgs84:"-106,-87,188",ellipse:"clrk80",datumName:"Beduaram"},gunung_segara:{towgs84:"-403,684,41",ellipse:"bessel",datumName:"Gunung Segara Jakarta"},rnb72:{towgs84:"106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",ellipse:"intl",datumName:"Reseau National Belge 1972"},EPSG_5451:{towgs84:"6.41,-49.05,-11.28,1.5657,0.5242,6.9718,-5.7649"},IGNF_LURESG:{towgs84:"-192.986,13.673,-39.309,-0.4099,-2.9332,2.6881,0.43"},EPSG_4614:{towgs84:"-119.4248,-303.65872,-11.00061,1.164298,0.174458,1.096259,3.657065"},EPSG_4615:{towgs84:"-494.088,-312.129,279.877,-1.423,-1.013,1.59,-0.748"},ESRI_37241:{towgs84:"-76.822,257.457,-12.817,2.136,-0.033,-2.392,-0.031"},ESRI_37249:{towgs84:"-440.296,58.548,296.265,1.128,10.202,4.559,-0.438"},ESRI_37245:{towgs84:"-511.151,-181.269,139.609,1.05,2.703,1.798,3.071"},EPSG_4178:{towgs84:"24.9,-126.4,-93.2,-0.063,-0.247,-0.041,1.01"},EPSG_4622:{towgs84:"-472.29,-5.63,-304.12,0.4362,-0.8374,0.2563,1.8984"},EPSG_4625:{towgs84:"126.93,547.94,130.41,-2.7867,5.1612,-0.8584,13.8227"},EPSG_5252:{towgs84:"0.023,0.036,-0.068,0.00176,0.00912,-0.01136,0.00439"},EPSG_4314:{towgs84:"597.1,71.4,412.1,0.894,0.068,-1.563,7.58"},EPSG_4282:{towgs84:"-178.3,-316.7,-131.5,5.278,6.077,10.979,19.166"},EPSG_4231:{towgs84:"-83.11,-97.38,-117.22,0.005693,-0.044698,0.044285,0.1218"},EPSG_4274:{towgs84:"-230.994,102.591,25.199,0.633,-0.239,0.9,1.95"},EPSG_4134:{towgs84:"-180.624,-225.516,173.919,-0.81,-1.898,8.336,16.71006"},EPSG_4254:{towgs84:"18.38,192.45,96.82,0.056,-0.142,-0.2,-0.0013"},EPSG_4159:{towgs84:"-194.513,-63.978,-25.759,-3.4027,3.756,-3.352,-0.9175"},EPSG_4687:{towgs84:"0.072,-0.507,-0.245,0.0183,-0.0003,0.007,-0.0093"},EPSG_4227:{towgs84:"-83.58,-397.54,458.78,-17.595,-2.847,4.256,3.225"},EPSG_4746:{towgs84:"599.4,72.4,419.2,-0.062,-0.022,-2.723,6.46"},EPSG_4745:{towgs84:"612.4,77,440.2,-0.054,0.057,-2.797,2.55"},EPSG_6311:{towgs84:"8.846,-4.394,-1.122,-0.00237,-0.146528,0.130428,0.783926"},EPSG_4289:{towgs84:"565.7381,50.4018,465.2904,-0.395026,0.330772,-1.876073,4.07244"},EPSG_4230:{towgs84:"-68.863,-134.888,-111.49,-0.53,-0.14,0.57,-3.4"},EPSG_4154:{towgs84:"-123.02,-158.95,-168.47"},EPSG_4156:{towgs84:"570.8,85.7,462.8,4.998,1.587,5.261,3.56"},EPSG_4299:{towgs84:"482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"},EPSG_4179:{towgs84:"33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84"},EPSG_4313:{towgs84:"-106.8686,52.2978,-103.7239,0.3366,-0.457,1.8422,-1.2747"},EPSG_4194:{towgs84:"163.511,127.533,-159.789"},EPSG_4195:{towgs84:"105,326,-102.5"},EPSG_4196:{towgs84:"-45,417,-3.5"},EPSG_4611:{towgs84:"-162.619,-276.959,-161.764,0.067753,-2.243648,-1.158828,-1.094246"},EPSG_4633:{towgs84:"137.092,131.66,91.475,-1.9436,-11.5993,-4.3321,-7.4824"},EPSG_4641:{towgs84:"-408.809,366.856,-412.987,1.8842,-0.5308,2.1655,-121.0993"},EPSG_4643:{towgs84:"-480.26,-438.32,-643.429,16.3119,20.1721,-4.0349,-111.7002"},EPSG_4300:{towgs84:"482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"},EPSG_4188:{towgs84:"482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"},EPSG_4660:{towgs84:"982.6087,552.753,-540.873,6.681627,-31.611492,-19.848161,16.805"},EPSG_4662:{towgs84:"97.295,-263.247,310.882,-1.5999,0.8386,3.1409,13.3259"},EPSG_3906:{towgs84:"577.88891,165.22205,391.18289,4.9145,-0.94729,-13.05098,7.78664"},EPSG_4307:{towgs84:"-209.3622,-87.8162,404.6198,0.0046,3.4784,0.5805,-1.4547"},EPSG_6892:{towgs84:"-76.269,-16.683,68.562,-6.275,10.536,-4.286,-13.686"},EPSG_4690:{towgs84:"221.597,152.441,176.523,2.403,1.3893,0.884,11.4648"},EPSG_4691:{towgs84:"218.769,150.75,176.75,3.5231,2.0037,1.288,10.9817"},EPSG_4629:{towgs84:"72.51,345.411,79.241,-1.5862,-0.8826,-0.5495,1.3653"},EPSG_4630:{towgs84:"165.804,216.213,180.26,-0.6251,-0.4515,-0.0721,7.4111"},EPSG_4692:{towgs84:"217.109,86.452,23.711,0.0183,-0.0003,0.007,-0.0093"},EPSG_9333:{towgs84:"0,0,0,-0.008393,0.000749,-0.010276,0"},EPSG_9059:{towgs84:"0,0,0"},EPSG_4312:{towgs84:"601.705,84.263,485.227,4.7354,1.3145,5.393,-2.3887"},EPSG_4123:{towgs84:"-96.062,-82.428,-121.753,4.801,0.345,-1.376,1.496"},EPSG_4309:{towgs84:"-124.45,183.74,44.64,-0.4384,0.5446,-0.9706,-2.1365"},ESRI_104106:{towgs84:"-283.088,-70.693,117.445,-1.157,0.059,-0.652,-4.058"},EPSG_4281:{towgs84:"-219.247,-73.802,269.529"},EPSG_4322:{towgs84:"0,0,4.5"},EPSG_4324:{towgs84:"0,0,1.9"},EPSG_4284:{towgs84:"43.822,-108.842,-119.585,1.455,-0.761,0.737,0.549"},EPSG_4277:{towgs84:"446.448,-125.157,542.06,0.15,0.247,0.842,-20.489"},EPSG_4207:{towgs84:"-282.1,-72.2,120,-1.529,0.145,-0.89,-4.46"},EPSG_4688:{towgs84:"347.175,1077.618,2623.677,33.9058,-70.6776,9.4013,186.0647"},EPSG_4689:{towgs84:"410.793,54.542,80.501,-2.5596,-2.3517,-0.6594,17.3218"},EPSG_4720:{towgs84:"0,0,4.5"},EPSG_4273:{towgs84:"278.3,93,474.5,7.889,0.05,-6.61,6.21"},EPSG_4240:{towgs84:"204.64,834.74,293.8"},EPSG_4817:{towgs84:"278.3,93,474.5,7.889,0.05,-6.61,6.21"},ESRI_104131:{towgs84:"426.62,142.62,460.09,4.98,4.49,-12.42,-17.1"},EPSG_4265:{towgs84:"-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68"},EPSG_4263:{towgs84:"-111.92,-87.85,114.5,1.875,0.202,0.219,0.032"},EPSG_4298:{towgs84:"-689.5937,623.84046,-65.93566,-0.02331,1.17094,-0.80054,5.88536"},EPSG_4270:{towgs84:"-253.4392,-148.452,386.5267,0.15605,0.43,-0.1013,-0.0424"},EPSG_4229:{towgs84:"-121.8,98.1,-10.7"},EPSG_4220:{towgs84:"-55.5,-348,-229.2"},EPSG_4214:{towgs84:"12.646,-155.176,-80.863"},EPSG_4232:{towgs84:"-345,3,223"},EPSG_4238:{towgs84:"-1.977,-13.06,-9.993,0.364,0.254,0.689,-1.037"},EPSG_4168:{towgs84:"-170,33,326"},EPSG_4131:{towgs84:"199,931,318.9"},EPSG_4152:{towgs84:"-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"},EPSG_5228:{towgs84:"572.213,85.334,461.94,4.9732,1.529,5.2484,3.5378"},EPSG_8351:{towgs84:"485.021,169.465,483.839,7.786342,4.397554,4.102655,0"},EPSG_4683:{towgs84:"-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06"},EPSG_4133:{towgs84:"0,0,0"},EPSG_7373:{towgs84:"0.819,-0.5762,-1.6446,-0.00378,-0.03317,0.00318,0.0693"},EPSG_9075:{towgs84:"-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"},EPSG_9072:{towgs84:"-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"},EPSG_9294:{towgs84:"1.16835,-1.42001,-2.24431,-0.00822,-0.05508,0.01818,0.23388"},EPSG_4212:{towgs84:"-267.434,173.496,181.814,-13.4704,8.7154,7.3926,14.7492"},EPSG_4191:{towgs84:"-44.183,-0.58,-38.489,2.3867,2.7072,-3.5196,-8.2703"},EPSG_4237:{towgs84:"52.684,-71.194,-13.975,-0.312,-0.1063,-0.3729,1.0191"},EPSG_4740:{towgs84:"-1.08,-0.27,-0.9"},EPSG_4124:{towgs84:"419.3836,99.3335,591.3451,0.850389,1.817277,-7.862238,-0.99496"},EPSG_5681:{towgs84:"584.9636,107.7175,413.8067,1.1155,0.2824,-3.1384,7.9922"},EPSG_4141:{towgs84:"23.772,17.49,17.859,-0.3132,-1.85274,1.67299,-5.4262"},EPSG_4204:{towgs84:"-85.645,-273.077,-79.708,2.289,-1.421,2.532,3.194"},EPSG_4319:{towgs84:"226.702,-193.337,-35.371,-2.229,-4.391,9.238,0.9798"},EPSG_4200:{towgs84:"24.82,-131.21,-82.66"},EPSG_4130:{towgs84:"0,0,0"},EPSG_4127:{towgs84:"-82.875,-57.097,-156.768,-2.158,1.524,-0.982,-0.359"},EPSG_4149:{towgs84:"674.374,15.056,405.346"},EPSG_4617:{towgs84:"-0.991,1.9072,0.5129,0.02579,0.00965,0.01166,0"},EPSG_4663:{towgs84:"-210.502,-66.902,-48.476,2.094,-15.067,-5.817,0.485"},EPSG_4664:{towgs84:"-211.939,137.626,58.3,-0.089,0.251,0.079,0.384"},EPSG_4665:{towgs84:"-105.854,165.589,-38.312,-0.003,-0.026,0.024,-0.048"},EPSG_4666:{towgs84:"631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"},EPSG_4756:{towgs84:"-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188"},EPSG_4723:{towgs84:"-179.483,-69.379,-27.584,-7.862,8.163,6.042,-13.925"},EPSG_4726:{towgs84:"8.853,-52.644,180.304,-0.393,-2.323,2.96,-24.081"},EPSG_4267:{towgs84:"-8.0,160.0,176.0"},EPSG_5365:{towgs84:"-0.16959,0.35312,0.51846,0.03385,-0.16325,0.03446,0.03693"},EPSG_4218:{towgs84:"304.5,306.5,-318.1"},EPSG_4242:{towgs84:"-33.722,153.789,94.959,-8.581,-4.478,4.54,8.95"},EPSG_4216:{towgs84:"-292.295,248.758,429.447,4.9971,2.99,6.6906,1.0289"},ESRI_104105:{towgs84:"631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"},ESRI_104129:{towgs84:"0,0,0"},EPSG_4673:{towgs84:"174.05,-25.49,112.57"},EPSG_4202:{towgs84:"-124,-60,154"},EPSG_4203:{towgs84:"-117.763,-51.51,139.061,0.292,0.443,0.277,-0.191"},EPSG_3819:{towgs84:"595.48,121.69,515.35,4.115,-2.9383,0.853,-3.408"},EPSG_8694:{towgs84:"-93.799,-132.737,-219.073,-1.844,0.648,-6.37,-0.169"},EPSG_4145:{towgs84:"275.57,676.78,229.6"},EPSG_4283:{towgs84:"0.06155,-0.01087,-0.04019,0.039492,0.032722,0.032898,-0.009994"},EPSG_4317:{towgs84:"2.3287,-147.0425,-92.0802,-0.309248,0.324822,0.497299,5.689063"},EPSG_4272:{towgs84:"59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993"},EPSG_4248:{towgs84:"-307.7,265.3,-363.5"},EPSG_5561:{towgs84:"24,-121,-76"},EPSG_5233:{towgs84:"-0.293,766.95,87.713,0.195704,1.695068,3.473016,-0.039338"},ESRI_104130:{towgs84:"-86,-98,-119"},ESRI_104102:{towgs84:"682,-203,480"},ESRI_37207:{towgs84:"7,-10,-26"},EPSG_4675:{towgs84:"59.935,118.4,-10.871"},ESRI_104109:{towgs84:"-89.121,-348.182,260.871"},ESRI_104112:{towgs84:"-185.583,-230.096,281.361"},ESRI_104113:{towgs84:"25.1,-275.6,222.6"},IGNF_WGS72G:{towgs84:"0,12,6"},IGNF_NTFG:{towgs84:"-168,-60,320"},IGNF_EFATE57G:{towgs84:"-127,-769,472"},IGNF_PGP50G:{towgs84:"324.8,153.6,172.1"},IGNF_REUN47G:{towgs84:"94,-948,-1262"},IGNF_CSG67G:{towgs84:"-186,230,110"},IGNF_GUAD48G:{towgs84:"-467,-16,-300"},IGNF_TAHI51G:{towgs84:"162,117,154"},IGNF_TAHAAG:{towgs84:"65,342,77"},IGNF_NUKU72G:{towgs84:"84,274,65"},IGNF_PETRELS72G:{towgs84:"365,194,166"},IGNF_WALL78G:{towgs84:"253,-133,-127"},IGNF_MAYO50G:{towgs84:"-382,-59,-262"},IGNF_TANNAG:{towgs84:"-139,-967,436"},IGNF_IGN72G:{towgs84:"-13,-348,292"},IGNF_ATIGG:{towgs84:"1118,23,66"},IGNF_FANGA84G:{towgs84:"150.57,158.33,118.32"},IGNF_RUSAT84G:{towgs84:"202.13,174.6,-15.74"},IGNF_KAUE70G:{towgs84:"126.74,300.1,-75.49"},IGNF_MOP90G:{towgs84:"-10.8,-1.8,12.77"},IGNF_MHPF67G:{towgs84:"338.08,212.58,-296.17"},IGNF_TAHI79G:{towgs84:"160.61,116.05,153.69"},IGNF_ANAA92G:{towgs84:"1.5,3.84,4.81"},IGNF_MARQUI72G:{towgs84:"330.91,-13.92,58.56"},IGNF_APAT86G:{towgs84:"143.6,197.82,74.05"},IGNF_TUBU69G:{towgs84:"237.17,171.61,-77.84"},IGNF_STPM50G:{towgs84:"11.363,424.148,373.13"},EPSG_4150:{towgs84:"674.374,15.056,405.346"},EPSG_4754:{towgs84:"-208.4058,-109.8777,-2.5764"},ESRI_104101:{towgs84:"372.87,149.23,585.29"},EPSG_4693:{towgs84:"0,-0.15,0.68"},EPSG_6207:{towgs84:"293.17,726.18,245.36"},EPSG_4153:{towgs84:"-133.63,-157.5,-158.62"},EPSG_4132:{towgs84:"-241.54,-163.64,396.06"},EPSG_4221:{towgs84:"-154.5,150.7,100.4"},EPSG_4266:{towgs84:"-80.7,-132.5,41.1"},EPSG_4193:{towgs84:"-70.9,-151.8,-41.4"},EPSG_5340:{towgs84:"-0.41,0.46,-0.35"},EPSG_4246:{towgs84:"-294.7,-200.1,525.5"},EPSG_4318:{towgs84:"-3.2,-5.7,2.8"},EPSG_4121:{towgs84:"-199.87,74.79,246.62"},EPSG_4223:{towgs84:"-260.1,5.5,432.2"},EPSG_4158:{towgs84:"-0.465,372.095,171.736"},EPSG_4285:{towgs84:"-128.16,-282.42,21.93"},EPSG_4613:{towgs84:"-404.78,685.68,45.47"},EPSG_4607:{towgs84:"195.671,332.517,274.607"},EPSG_4475:{towgs84:"-381.788,-57.501,-256.673"},EPSG_4208:{towgs84:"-157.84,308.54,-146.6"},EPSG_4743:{towgs84:"70.995,-335.916,262.898"},EPSG_4710:{towgs84:"-323.65,551.39,-491.22"},EPSG_7881:{towgs84:"-0.077,0.079,0.086"},EPSG_4682:{towgs84:"283.729,735.942,261.143"},EPSG_4739:{towgs84:"-156,-271,-189"},EPSG_4679:{towgs84:"-80.01,253.26,291.19"},EPSG_4750:{towgs84:"-56.263,16.136,-22.856"},EPSG_4644:{towgs84:"-10.18,-350.43,291.37"},EPSG_4695:{towgs84:"-103.746,-9.614,-255.95"},EPSG_4292:{towgs84:"-355,21,72"},EPSG_4302:{towgs84:"-61.702,284.488,472.052"},EPSG_4143:{towgs84:"-124.76,53,466.79"},EPSG_4606:{towgs84:"-153,153,307"},EPSG_4699:{towgs84:"-770.1,158.4,-498.2"},EPSG_4247:{towgs84:"-273.5,110.6,-357.9"},EPSG_4160:{towgs84:"8.88,184.86,106.69"},EPSG_4161:{towgs84:"-233.43,6.65,173.64"},EPSG_9251:{towgs84:"-9.5,122.9,138.2"},EPSG_9253:{towgs84:"-78.1,101.6,133.3"},EPSG_4297:{towgs84:"-198.383,-240.517,-107.909"},EPSG_4269:{towgs84:"0,0,0"},EPSG_4301:{towgs84:"-147,506,687"},EPSG_4618:{towgs84:"-59,-11,-52"},EPSG_4612:{towgs84:"0,0,0"},EPSG_4678:{towgs84:"44.585,-131.212,-39.544"},EPSG_4250:{towgs84:"-130,29,364"},EPSG_4144:{towgs84:"214,804,268"},EPSG_4147:{towgs84:"-17.51,-108.32,-62.39"},EPSG_4259:{towgs84:"-254.1,-5.36,-100.29"},EPSG_4164:{towgs84:"-76,-138,67"},EPSG_4211:{towgs84:"-378.873,676.002,-46.255"},EPSG_4182:{towgs84:"-422.651,-172.995,84.02"},EPSG_4224:{towgs84:"-143.87,243.37,-33.52"},EPSG_4225:{towgs84:"-205.57,168.77,-4.12"},EPSG_5527:{towgs84:"-67.35,3.88,-38.22"},EPSG_4752:{towgs84:"98,390,-22"},EPSG_4310:{towgs84:"-30,190,89"},EPSG_9248:{towgs84:"-192.26,65.72,132.08"},EPSG_4680:{towgs84:"124.5,-63.5,-281"},EPSG_4701:{towgs84:"-79.9,-158,-168.9"},EPSG_4706:{towgs84:"-146.21,112.63,4.05"},EPSG_4805:{towgs84:"682,-203,480"},EPSG_4201:{towgs84:"-165,-11,206"},EPSG_4210:{towgs84:"-157,-2,-299"},EPSG_4183:{towgs84:"-104,167,-38"},EPSG_4139:{towgs84:"11,72,-101"},EPSG_4668:{towgs84:"-86,-98,-119"},EPSG_4717:{towgs84:"-2,151,181"},EPSG_4732:{towgs84:"102,52,-38"},EPSG_4280:{towgs84:"-377,681,-50"},EPSG_4209:{towgs84:"-138,-105,-289"},EPSG_4261:{towgs84:"31,146,47"},EPSG_4658:{towgs84:"-73,46,-86"},EPSG_4721:{towgs84:"265.025,384.929,-194.046"},EPSG_4222:{towgs84:"-136,-108,-292"},EPSG_4601:{towgs84:"-255,-15,71"},EPSG_4602:{towgs84:"725,685,536"},EPSG_4603:{towgs84:"72,213.7,93"},EPSG_4605:{towgs84:"9,183,236"},EPSG_4621:{towgs84:"137,248,-430"},EPSG_4657:{towgs84:"-28,199,5"},EPSG_4316:{towgs84:"103.25,-100.4,-307.19"},EPSG_4642:{towgs84:"-13,-348,292"},EPSG_4698:{towgs84:"145,-187,103"},EPSG_4192:{towgs84:"-206.1,-174.7,-87.7"},EPSG_4311:{towgs84:"-265,120,-358"},EPSG_4135:{towgs84:"58,-283,-182"},ESRI_104138:{towgs84:"198,-226,-347"},EPSG_4245:{towgs84:"-11,851,5"},EPSG_4142:{towgs84:"-125,53,467"},EPSG_4213:{towgs84:"-106,-87,188"},EPSG_4253:{towgs84:"-133,-77,-51"},EPSG_4129:{towgs84:"-132,-110,-335"},EPSG_4713:{towgs84:"-77,-128,142"},EPSG_4239:{towgs84:"217,823,299"},EPSG_4146:{towgs84:"295,736,257"},EPSG_4155:{towgs84:"-83,37,124"},EPSG_4165:{towgs84:"-173,253,27"},EPSG_4672:{towgs84:"175,-38,113"},EPSG_4236:{towgs84:"-637,-549,-203"},EPSG_4251:{towgs84:"-90,40,88"},EPSG_4271:{towgs84:"-2,374,172"},EPSG_4175:{towgs84:"-88,4,101"},EPSG_4716:{towgs84:"298,-304,-375"},EPSG_4315:{towgs84:"-23,259,-9"},EPSG_4744:{towgs84:"-242.2,-144.9,370.3"},EPSG_4244:{towgs84:"-97,787,86"},EPSG_4293:{towgs84:"616,97,-251"},EPSG_4714:{towgs84:"-127,-769,472"},EPSG_4736:{towgs84:"260,12,-147"},EPSG_6883:{towgs84:"-235,-110,393"},EPSG_6894:{towgs84:"-63,176,185"},EPSG_4205:{towgs84:"-43,-163,45"},EPSG_4256:{towgs84:"41,-220,-134"},EPSG_4262:{towgs84:"639,405,60"},EPSG_4604:{towgs84:"174,359,365"},EPSG_4169:{towgs84:"-115,118,426"},EPSG_4620:{towgs84:"-106,-129,165"},EPSG_4184:{towgs84:"-203,141,53"},EPSG_4616:{towgs84:"-289,-124,60"},EPSG_9403:{towgs84:"-307,-92,127"},EPSG_4684:{towgs84:"-133,-321,50"},EPSG_4708:{towgs84:"-491,-22,435"},EPSG_4707:{towgs84:"114,-116,-333"},EPSG_4709:{towgs84:"145,75,-272"},EPSG_4712:{towgs84:"-205,107,53"},EPSG_4711:{towgs84:"124,-234,-25"},EPSG_4718:{towgs84:"230,-199,-752"},EPSG_4719:{towgs84:"211,147,111"},EPSG_4724:{towgs84:"208,-435,-229"},EPSG_4725:{towgs84:"189,-79,-202"},EPSG_4735:{towgs84:"647,1777,-1124"},EPSG_4722:{towgs84:"-794,119,-298"},EPSG_4728:{towgs84:"-307,-92,127"},EPSG_4734:{towgs84:"-632,438,-609"},EPSG_4727:{towgs84:"912,-58,1227"},EPSG_4729:{towgs84:"185,165,42"},EPSG_4730:{towgs84:"170,42,84"},EPSG_4733:{towgs84:"276,-57,149"},ESRI_37218:{towgs84:"230,-199,-752"},ESRI_37240:{towgs84:"-7,215,225"},ESRI_37221:{towgs84:"252,-209,-751"},ESRI_4305:{towgs84:"-123,-206,219"},ESRI_104139:{towgs84:"-73,-247,227"},EPSG_4748:{towgs84:"51,391,-36"},EPSG_4219:{towgs84:"-384,664,-48"},EPSG_4255:{towgs84:"-333,-222,114"},EPSG_4257:{towgs84:"-587.8,519.75,145.76"},EPSG_4646:{towgs84:"-963,510,-359"},EPSG_6881:{towgs84:"-24,-203,268"},EPSG_6882:{towgs84:"-183,-15,273"},EPSG_4715:{towgs84:"-104,-129,239"},IGNF_RGF93GDD:{towgs84:"0,0,0"},IGNF_RGM04GDD:{towgs84:"0,0,0"},IGNF_RGSPM06GDD:{towgs84:"0,0,0"},IGNF_RGTAAF07GDD:{towgs84:"0,0,0"},IGNF_RGFG95GDD:{towgs84:"0,0,0"},IGNF_RGNCG:{towgs84:"0,0,0"},IGNF_RGPFGDD:{towgs84:"0,0,0"},IGNF_ETRS89G:{towgs84:"0,0,0"},IGNF_RGR92GDD:{towgs84:"0,0,0"},EPSG_4173:{towgs84:"0,0,0"},EPSG_4180:{towgs84:"0,0,0"},EPSG_4619:{towgs84:"0,0,0"},EPSG_4667:{towgs84:"0,0,0"},EPSG_4075:{towgs84:"0,0,0"},EPSG_6706:{towgs84:"0,0,0"},EPSG_7798:{towgs84:"0,0,0"},EPSG_4661:{towgs84:"0,0,0"},EPSG_4669:{towgs84:"0,0,0"},EPSG_8685:{towgs84:"0,0,0"},EPSG_4151:{towgs84:"0,0,0"},EPSG_9702:{towgs84:"0,0,0"},EPSG_4758:{towgs84:"0,0,0"},EPSG_4761:{towgs84:"0,0,0"},EPSG_4765:{towgs84:"0,0,0"},EPSG_8997:{towgs84:"0,0,0"},EPSG_4023:{towgs84:"0,0,0"},EPSG_4670:{towgs84:"0,0,0"},EPSG_4694:{towgs84:"0,0,0"},EPSG_4148:{towgs84:"0,0,0"},EPSG_4163:{towgs84:"0,0,0"},EPSG_4167:{towgs84:"0,0,0"},EPSG_4189:{towgs84:"0,0,0"},EPSG_4190:{towgs84:"0,0,0"},EPSG_4176:{towgs84:"0,0,0"},EPSG_4659:{towgs84:"0,0,0"},EPSG_3824:{towgs84:"0,0,0"},EPSG_3889:{towgs84:"0,0,0"},EPSG_4046:{towgs84:"0,0,0"},EPSG_4081:{towgs84:"0,0,0"},EPSG_4558:{towgs84:"0,0,0"},EPSG_4483:{towgs84:"0,0,0"},EPSG_5013:{towgs84:"0,0,0"},EPSG_5264:{towgs84:"0,0,0"},EPSG_5324:{towgs84:"0,0,0"},EPSG_5354:{towgs84:"0,0,0"},EPSG_5371:{towgs84:"0,0,0"},EPSG_5373:{towgs84:"0,0,0"},EPSG_5381:{towgs84:"0,0,0"},EPSG_5393:{towgs84:"0,0,0"},EPSG_5489:{towgs84:"0,0,0"},EPSG_5593:{towgs84:"0,0,0"},EPSG_6135:{towgs84:"0,0,0"},EPSG_6365:{towgs84:"0,0,0"},EPSG_5246:{towgs84:"0,0,0"},EPSG_7886:{towgs84:"0,0,0"},EPSG_8431:{towgs84:"0,0,0"},EPSG_8427:{towgs84:"0,0,0"},EPSG_8699:{towgs84:"0,0,0"},EPSG_8818:{towgs84:"0,0,0"},EPSG_4757:{towgs84:"0,0,0"},EPSG_9140:{towgs84:"0,0,0"},EPSG_8086:{towgs84:"0,0,0"},EPSG_4686:{towgs84:"0,0,0"},EPSG_4737:{towgs84:"0,0,0"},EPSG_4702:{towgs84:"0,0,0"},EPSG_4747:{towgs84:"0,0,0"},EPSG_4749:{towgs84:"0,0,0"},EPSG_4674:{towgs84:"0,0,0"},EPSG_4755:{towgs84:"0,0,0"},EPSG_4759:{towgs84:"0,0,0"},EPSG_4762:{towgs84:"0,0,0"},EPSG_4763:{towgs84:"0,0,0"},EPSG_4764:{towgs84:"0,0,0"},EPSG_4166:{towgs84:"0,0,0"},EPSG_4170:{towgs84:"0,0,0"},EPSG_5546:{towgs84:"0,0,0"},EPSG_7844:{towgs84:"0,0,0"},EPSG_4818:{towgs84:"589,76,480"},EPSG_10328:{towgs84:"0,0,0"},EPSG_9782:{towgs84:"0,0,0"},EPSG_9777:{towgs84:"0,0,0"},EPSG_10690:{towgs84:"0,0,0"},EPSG_10639:{towgs84:"0,0,0"},EPSG_10739:{towgs84:"0,0,0"},EPSG_7686:{towgs84:"0,0,0"},EPSG_8900:{towgs84:"0,0,0"},EPSG_5886:{towgs84:"0,0,0"},EPSG_7683:{towgs84:"0,0,0"},EPSG_6668:{towgs84:"0,0,0"},EPSG_20046:{towgs84:"0,0,0"},EPSG_10299:{towgs84:"0,0,0"},EPSG_10310:{towgs84:"0,0,0"},EPSG_10475:{towgs84:"0,0,0"},EPSG_4742:{towgs84:"0,0,0"},EPSG_10671:{towgs84:"0,0,0"},EPSG_10762:{towgs84:"0,0,0"},EPSG_10725:{towgs84:"0,0,0"},EPSG_10791:{towgs84:"0,0,0"},EPSG_10800:{towgs84:"0,0,0"},EPSG_10305:{towgs84:"0,0,0"},EPSG_10941:{towgs84:"0,0,0"},EPSG_10968:{towgs84:"0,0,0"},EPSG_10875:{towgs84:"0,0,0"},EPSG_6318:{towgs84:"0,0,0"},EPSG_10910:{towgs84:"0,0,0"}};for(var Lv in Br){var to=Br[Lv];to.datumName&&(Br[to.datumName]=to)}function Iv(n,t,e,i,s,r,a){var o={};return o.datum_type=qo,t&&(o.datum_type=Yg,o.datum_params=t.map(parseFloat),(o.datum_params[0]!==0||o.datum_params[1]!==0||o.datum_params[2]!==0)&&(o.datum_type=_i),o.datum_params.length>3&&(o.datum_params[3]!==0||o.datum_params[4]!==0||o.datum_params[5]!==0||o.datum_params[6]!==0)&&(o.datum_type=gi,o.datum_params[3]*=ws,o.datum_params[4]*=ws,o.datum_params[5]*=ws,o.datum_params[6]=o.datum_params[6]/1e6+1)),a&&(o.datum_type=Ji,o.grids=a),o.a=e,o.b=i,o.es=s,o.ep2=r,o}var ph={};function Nv(n,t,e){return t instanceof ArrayBuffer?Dv(n,t,e):{ready:Uv(n,t)}}function Dv(n,t,e){var i=!0;e!==void 0&&e.includeErrorFields===!1&&(i=!1);var s=new DataView(t),r=Gv(s),a=Bv(s,r),o=zv(s,a,r,i),h={header:a,subgrids:o};return ph[n]=h,h}async function Uv(n,t){for(var e=[],i=await t.getImageCount(),s=i-1;s>=0;s--){var r=await t.getImage(s),a=await r.readRasters(),o=a,h=[r.getWidth(),r.getHeight()],l=r.getBoundingBox().map(Zl),c=typeof r.fileDirectory.getValue=="function"?r.fileDirectory.getValue("ModelPixelScale"):r.fileDirectory.ModelPixelScale,u=[c[0],c[1]].map(Zl),d=l[0]+(h[0]-1)*u[0],f=l[3]-(h[1]-1)*u[1],_=o[0],g=o[1],p=[];for(let v=h[1]-1;v>=0;v--)for(let S=h[0]-1;S>=0;S--){var m=v*h[0]+S;p.push([-Hn(g[m]),Hn(_[m])])}e.push({del:u,lim:h,ll:[-d,f],cvs:p})}var x={header:{nSubgrids:i},subgrids:e};return ph[n]=x,x}function Ov(n){if(n===void 0)return null;var t=n.split(",");return t.map(Fv)}function Fv(n){if(n.length===0)return null;var t=n[0]==="@";return t&&(n=n.slice(1)),n==="null"?{name:"null",mandatory:!t,grid:null,isNull:!0}:{name:n,mandatory:!t,grid:ph[n]||null,isNull:!1}}function Zl(n){return n*Math.PI/180}function Hn(n){return n/3600*Math.PI/180}function Gv(n){var t=n.getInt32(8,!1);return t===11?!1:(t=n.getInt32(8,!0),t!==11&&console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian"),!0)}function Bv(n,t){return{nFields:n.getInt32(8,t),nSubgridFields:n.getInt32(24,t),nSubgrids:n.getInt32(40,t),shiftType:$o(n,56,64).trim(),fromSemiMajorAxis:n.getFloat64(120,t),fromSemiMinorAxis:n.getFloat64(136,t),toSemiMajorAxis:n.getFloat64(152,t),toSemiMinorAxis:n.getFloat64(168,t)}}function $o(n,t,e){return String.fromCharCode.apply(null,new Uint8Array(n.buffer.slice(t,e)))}function zv(n,t,e,i){for(var s=176,r=[],a=0;a<t.nSubgrids;a++){var o=Hv(n,s,e),h=Vv(n,s,o,e,i),l=Math.round(1+(o.upperLongitude-o.lowerLongitude)/o.longitudeInterval),c=Math.round(1+(o.upperLatitude-o.lowerLatitude)/o.latitudeInterval);r.push({ll:[Hn(o.lowerLongitude),Hn(o.lowerLatitude)],del:[Hn(o.longitudeInterval),Hn(o.latitudeInterval)],lim:[l,c],count:o.gridNodeCount,cvs:kv(h)});var u=16;i===!1&&(u=8),s+=176+o.gridNodeCount*u}return r}function kv(n){return n.map(function(t){return[Hn(t.longitudeShift),Hn(t.latitudeShift)]})}function Hv(n,t,e){return{name:$o(n,t+8,t+16).trim(),parent:$o(n,t+24,t+24+8).trim(),lowerLatitude:n.getFloat64(t+72,e),upperLatitude:n.getFloat64(t+88,e),lowerLongitude:n.getFloat64(t+104,e),upperLongitude:n.getFloat64(t+120,e),latitudeInterval:n.getFloat64(t+136,e),longitudeInterval:n.getFloat64(t+152,e),gridNodeCount:n.getInt32(t+168,e)}}function Vv(n,t,e,i,s){var r=t+176,a=16;s===!1&&(a=8);for(var o=[],h=0;h<e.gridNodeCount;h++){var l={latitudeShift:n.getFloat32(r+h*a,i),longitudeShift:n.getFloat32(r+h*a+4,i)};s!==!1&&(l.latitudeAccuracy=n.getFloat32(r+h*a+8,i),l.longitudeAccuracy=n.getFloat32(r+h*a+12,i)),o.push(l)}return o}function rn(n,t){if(!(this instanceof rn))return new rn(n);this.forward=null,this.inverse=null,this.init=null,this.name,this.axis,this.names=null,this.title,t=t||function(l){if(l)throw l};var e=_v(n);if(typeof e!="object"){t("Could not parse to valid json: "+n);return}var i=rn.projections.get(e.projName);if(!i){t("Could not get projection name from: "+n);return}if(e.datumCode&&e.datumCode!=="none"){var s=Yn(Br,e.datumCode);s&&(e.datum_params=e.datum_params||(s.towgs84?s.towgs84.split(","):null),e.ellps=s.ellipse,e.datumName=s.datumName?s.datumName:e.datumCode)}e.k0=e.k0||1,e.axis=e.axis||"enu",e.ellps=e.ellps||"wgs84",e.lat1=e.lat1||e.lat0;var r=Cv(e.a,e.b,e.rf,e.ellps,e.sphere),a=Rv(r.a,r.b,r.rf,e.R_A),o=Ov(e.nadgrids),h=e.datum||Iv(e.datumCode,e.datum_params,r.a,r.b,a.es,a.ep2,o);Kl(this,e),Kl(this,i),this.a=r.a,this.b=r.b,this.rf=r.rf,this.sphere=r.sphere,this.es=a.es,this.e=a.e,this.ep2=a.ep2,this.datum=h,"init"in this&&typeof this.init=="function"&&this.init(),t(null,this)}rn.projections=Av;rn.projections.start();function Wv(n,t){return n.datum_type!==t.datum_type||n.a!==t.a||Math.abs(n.es-t.es)>5e-11?!1:n.datum_type===_i?n.datum_params[0]===t.datum_params[0]&&n.datum_params[1]===t.datum_params[1]&&n.datum_params[2]===t.datum_params[2]:n.datum_type===gi?n.datum_params[0]===t.datum_params[0]&&n.datum_params[1]===t.datum_params[1]&&n.datum_params[2]===t.datum_params[2]&&n.datum_params[3]===t.datum_params[3]&&n.datum_params[4]===t.datum_params[4]&&n.datum_params[5]===t.datum_params[5]&&n.datum_params[6]===t.datum_params[6]:!0}function du(n,t,e){var i=n.x,s=n.y,r=n.z?n.z:0,a,o,h,l;if(s<-j&&s>-1.001*j)s=-j;else if(s>j&&s<1.001*j)s=j;else{if(s<-j)return{x:-1/0,y:-1/0,z:n.z};if(s>j)return{x:1/0,y:1/0,z:n.z}}return i>Math.PI&&(i-=2*Math.PI),o=Math.sin(s),l=Math.cos(s),h=o*o,a=e/Math.sqrt(1-t*h),{x:(a+r)*l*Math.cos(i),y:(a+r)*l*Math.sin(i),z:(a*(1-t)+r)*o}}function pu(n,t,e,i){var s=1e-12,r=s*s,a=30,o,h,l,c,u,d,f,_,g,p,m,x,v,S=n.x,L=n.y,b=n.z?n.z:0,w,C,E;if(o=Math.sqrt(S*S+L*L),h=Math.sqrt(S*S+L*L+b*b),o/e<s){if(w=0,h/e<s)return C=j,E=-i,{x:n.x,y:n.y,z:n.z}}else w=Math.atan2(L,S);l=b/h,c=o/h,u=1/Math.sqrt(1-t*(2-t)*c*c),_=c*(1-t)*u,g=l*u,v=0;do v++,f=e/Math.sqrt(1-t*g*g),E=o*_+b*g-f*(1-t*g*g),d=t*f/(f+E),u=1/Math.sqrt(1-d*(2-d)*c*c),p=c*(1-d)*u,m=l*u,x=m*_-p*g,_=p,g=m;while(x*x>r&&v<a);return C=Math.atan(m/Math.abs(p)),{x:w,y:C,z:E}}function Xv(n,t,e){if(t===_i)return{x:n.x+e[0],y:n.y+e[1],z:n.z+e[2]};if(t===gi){var i=e[0],s=e[1],r=e[2],a=e[3],o=e[4],h=e[5],l=e[6];return{x:l*(n.x-h*n.y+o*n.z)+i,y:l*(h*n.x+n.y-a*n.z)+s,z:l*(-o*n.x+a*n.y+n.z)+r}}}function qv(n,t,e){if(t===_i)return{x:n.x-e[0],y:n.y-e[1],z:n.z-e[2]};if(t===gi){var i=e[0],s=e[1],r=e[2],a=e[3],o=e[4],h=e[5],l=e[6],c=(n.x-i)/l,u=(n.y-s)/l,d=(n.z-r)/l;return{x:c+h*u-o*d,y:-h*c+u+a*d,z:o*c-a*u+d}}}function Rr(n){return n===_i||n===gi}function Yv(n,t,e){if(Wv(n,t)||n.datum_type===qo||t.datum_type===qo)return e;var i=n.a,s=n.es;if(n.datum_type===Ji){var r=Jl(n,!1,e);if(r!==0)return;i=Hl,s=Vl}var a=t.a,o=t.b,h=t.es;if(t.datum_type===Ji&&(a=Hl,o=$g,h=Vl),s===h&&i===a&&!Rr(n.datum_type)&&!Rr(t.datum_type))return e;if(e=du(e,s,i),Rr(n.datum_type)&&(e=Xv(e,n.datum_type,n.datum_params)),Rr(t.datum_type)&&(e=qv(e,t.datum_type,t.datum_params)),e=pu(e,h,a,o),t.datum_type===Ji){var l=Jl(t,!0,e);if(l!==0)return}return e}function Jl(n,t,e){if(n.grids===null||n.grids.length===0)return console.log("Grid shift grids not found"),-1;var i={x:-e.x,y:e.y},s={x:Number.NaN,y:Number.NaN},r=[];t:for(var a=0;a<n.grids.length;a++){var o=n.grids[a];if(r.push(o.name),o.isNull){s=i;break}if(o.grid===null){if(o.mandatory)return console.log("Unable to find mandatory grid '"+o.name+"'"),-1;continue}for(var h=o.grid.subgrids,l=0,c=h.length;l<c;l++){var u=h[l],d=(Math.abs(u.del[1])+Math.abs(u.del[0]))/1e4,f=u.ll[0]-d,_=u.ll[1]-d,g=u.ll[0]+(u.lim[0]-1)*u.del[0]+d,p=u.ll[1]+(u.lim[1]-1)*u.del[1]+d;if(!(_>i.y||f>i.x||p<i.y||g<i.x)&&(s=$v(i,t,u),!isNaN(s.x)))break t}}return isNaN(s.x)?(console.log("Failed to find a grid shift table for location '"+-i.x*Be+" "+i.y*Be+" tried: '"+r+"'"),-1):(e.x=-s.x,e.y=s.y,0)}function $v(n,t,e){var i={x:Number.NaN,y:Number.NaN};if(isNaN(n.x))return i;var s={x:n.x,y:n.y};s.x-=e.ll[0],s.y-=e.ll[1],s.x=at(s.x-Math.PI)+Math.PI;var r=Ql(s,e);if(t){if(isNaN(r.x))return i;r.x=s.x-r.x,r.y=s.y-r.y;var a=9,o=1e-12,h,l;do{if(l=Ql(r,e),isNaN(l.x)){console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");break}h={x:s.x-(l.x+r.x),y:s.y-(l.y+r.y)},r.x+=h.x,r.y+=h.y}while(a--&&Math.abs(h.x)>o&&Math.abs(h.y)>o);if(a<0)return console.log("Inverse grid shift iterator failed to converge."),i;i.x=at(r.x+e.ll[0]),i.y=r.y+e.ll[1]}else isNaN(r.x)||(i.x=n.x+r.x,i.y=n.y+r.y);return i}function Ql(n,t){var e={x:n.x/t.del[0],y:n.y/t.del[1]},i={x:Math.floor(e.x),y:Math.floor(e.y)},s={x:e.x-1*i.x,y:e.y-1*i.y},r={x:Number.NaN,y:Number.NaN},a;if(i.x<0||i.x>=t.lim[0]||i.y<0||i.y>=t.lim[1])return r;a=i.y*t.lim[0]+i.x;var o={x:t.cvs[a][0],y:t.cvs[a][1]};a++;var h={x:t.cvs[a][0],y:t.cvs[a][1]};a+=t.lim[0];var l={x:t.cvs[a][0],y:t.cvs[a][1]};a--;var c={x:t.cvs[a][0],y:t.cvs[a][1]},u=s.x*s.y,d=s.x*(1-s.y),f=(1-s.x)*(1-s.y),_=(1-s.x)*s.y;return r.x=f*o.x+d*h.x+_*c.x+u*l.x,r.y=f*o.y+d*h.y+_*c.y+u*l.y,r}var ai=["x","y","z"];function Kv(n,t){const e={};for(let i=0,s=n.axis.length;i<s;i++){if(i===2&&t.z===void 0)continue;let r=t[ai[i]];switch(n.axis[i]){case"e":e.x=r;break;case"w":e.x=-r;break;case"n":e.y=r;break;case"s":e.y=-r;break;case"u":e.z=r;break;case"d":e.z=-r;break;default:return null}}return e}function jv(n,t){const e={};for(let i=0,s=n.axis.length;i<s;i++)if(!(i===2&&t.z===void 0))switch(n.axis[i]){case"e":e[ai[i]]=t.x;break;case"w":e[ai[i]]=-t.x;break;case"n":e[ai[i]]=t.y;break;case"s":e[ai[i]]=-t.y;break;case"u":e[ai[i]]=t.z;break;case"d":e[ai[i]]=-t.z;break;default:return null}return e}function mh(n){var t={x:n[0],y:n[1]};return n.length>2&&(t.z=n[2]),n.length>3&&(t.m=n[3]),t}function Zv(n){tc(n.x),tc(n.y)}function tc(n){if(typeof Number.isFinite=="function"){if(Number.isFinite(n))return;throw new TypeError("coordinates must be finite numbers")}if(typeof n!="number"||n!==n||!isFinite(n))throw new TypeError("coordinates must be finite numbers")}function Jv(n,t){return(n.datum.datum_type===_i||n.datum.datum_type===gi||n.datum.datum_type===Ji)&&t.datumCode!=="WGS84"||(t.datum.datum_type===_i||t.datum.datum_type===gi||t.datum.datum_type===Ji)&&n.datumCode!=="WGS84"}function ta(n,t,e,i){var s,r=e.z!==void 0;if(Zv(e),n.datum&&t.datum&&Jv(n,t)&&(s=new rn("WGS84"),e=ta(n,s,e,i),n=s),i&&n.axis!=="enu"&&(e=Kv(n,e)),n.projName==="longlat")e={x:e.x*oe,y:e.y*oe,z:e.z||0};else if(n.to_meter&&(e={x:e.x*n.to_meter,y:e.y*n.to_meter,z:e.z||0}),e=n.inverse(e),!e)return;if(n.from_greenwich&&(e.x+=n.from_greenwich),e=Yv(n.datum,t.datum,e),!!e)return e=e,t.from_greenwich&&(e={x:e.x-t.from_greenwich,y:e.y,z:e.z||0}),t.projName==="longlat"?e={x:e.x*Be,y:e.y*Be,z:e.z||0}:(e=t.forward(e),t.to_meter&&(e={x:e.x/t.to_meter,y:e.y/t.to_meter,z:e.z||0})),i&&t.axis!=="enu"?jv(t,e):(e&&!r&&t.projName!=="geocent"&&delete e.z,e)}function Qv(n,t,e,i){var s;return Array.isArray(e)?s=mh(e):s={x:e.x,y:e.y,z:e.z,m:e.m},ta(n,t,s,i)}var ec=rn("WGS84");function eo(n,t,e,i){var s,r,a;return Array.isArray(e)?(s=ta(n,t,mh(e),i)||{x:NaN,y:NaN},e.length>2?(r=typeof n.name<"u"&&n.name==="geocent"||typeof t.name<"u"&&t.name==="geocent",r?typeof s.z=="number"?[s.x,s.y,s.z].concat(e.slice(3)):[s.x,s.y,e[2]].concat(e.slice(3)):i&&typeof s.z=="number"?[s.x,s.y,s.z].concat(e.slice(3)):[s.x,s.y].concat(e.slice(2))):[s.x,s.y]):(s=ta(n,t,{x:e.x,y:e.y,z:e.z,m:e.m},i)||{x:NaN,y:NaN},a=Object.keys(e),a.length===2||(r=typeof n.name<"u"&&n.name==="geocent"||typeof t.name<"u"&&t.name==="geocent",a.forEach(function(o){o==="x"||o==="y"||o==="z"&&(r||i)||(s[o]=e[o])})),s)}function Cr(n){return n instanceof rn?n:typeof n=="object"&&"oProj"in n?n.oProj:rn(n)}function tM(n,t,e){var i,s,r=!1,a;return typeof t>"u"?(s=Cr(n),i=ec,r=!0):(typeof t.x<"u"||Array.isArray(t))&&(e=t,s=Cr(n),i=ec,r=!0),i||(i=Cr(n)),s||(s=Cr(t)),e?eo(i,s,e):(a={forward:function(o,h){return eo(i,s,o,h)},inverse:function(o,h){return eo(s,i,o,h)}},r&&(a.oProj=s),a)}var nc=6,mu="AJSAJS",_u="AFAFAF",Xi=65,Oe=73,en=79,gs=86,vs=90;const eM={forward:gu,inverse:nM,toPoint:vu};function gu(n,t){return t=t||5,rM(iM({lat:n[1],lon:n[0]}),t)}function nM(n){var t=_h(xu(n.toUpperCase()));return t.lat&&t.lon?[t.lon,t.lat,t.lon,t.lat]:[t.left,t.bottom,t.right,t.top]}function vu(n){var t=_h(xu(n.toUpperCase()));return t.lat&&t.lon?[t.lon,t.lat]:[(t.left+t.right)/2,(t.top+t.bottom)/2]}function no(n){return n*(Math.PI/180)}function ic(n){return 180*(n/Math.PI)}function iM(n){var t=n.lat,e=n.lon,i=6378137,s=.00669438,r=.9996,a,o,h,l,c,u,d,f=no(t),_=no(e),g,p;p=Math.floor((e+180)/6)+1,e===180&&(p=60),t>=56&&t<64&&e>=3&&e<12&&(p=32),t>=72&&t<84&&(e>=0&&e<9?p=31:e>=9&&e<21?p=33:e>=21&&e<33?p=35:e>=33&&e<42&&(p=37)),a=(p-1)*6-180+3,g=no(a),o=s/(1-s),h=i/Math.sqrt(1-s*Math.sin(f)*Math.sin(f)),l=Math.tan(f)*Math.tan(f),c=o*Math.cos(f)*Math.cos(f),u=Math.cos(f)*(_-g),d=i*((1-s/4-3*s*s/64-5*s*s*s/256)*f-(3*s/8+3*s*s/32+45*s*s*s/1024)*Math.sin(2*f)+(15*s*s/256+45*s*s*s/1024)*Math.sin(4*f)-35*s*s*s/3072*Math.sin(6*f));var m=r*h*(u+(1-l+c)*u*u*u/6+(5-18*l+l*l+72*c-58*o)*u*u*u*u*u/120)+5e5,x=r*(d+h*Math.tan(f)*(u*u/2+(5-l+9*c+4*c*c)*u*u*u*u/24+(61-58*l+l*l+600*c-330*o)*u*u*u*u*u*u/720));return t<0&&(x+=1e7),{northing:Math.round(x),easting:Math.round(m),zoneNumber:p,zoneLetter:sM(t)}}function _h(n){var t=n.northing,e=n.easting,i=n.zoneLetter,s=n.zoneNumber;if(s<0||s>60)return null;var r=.9996,a=6378137,o=.00669438,h,l=(1-Math.sqrt(1-o))/(1+Math.sqrt(1-o)),c,u,d,f,_,g,p,m,x,v=e-5e5,S=t;i<"N"&&(S-=1e7),p=(s-1)*6-180+3,h=o/(1-o),g=S/r,m=g/(a*(1-o/4-3*o*o/64-5*o*o*o/256)),x=m+(3*l/2-27*l*l*l/32)*Math.sin(2*m)+(21*l*l/16-55*l*l*l*l/32)*Math.sin(4*m)+151*l*l*l/96*Math.sin(6*m),c=a/Math.sqrt(1-o*Math.sin(x)*Math.sin(x)),u=Math.tan(x)*Math.tan(x),d=h*Math.cos(x)*Math.cos(x),f=a*(1-o)/Math.pow(1-o*Math.sin(x)*Math.sin(x),1.5),_=v/(c*r);var L=x-c*Math.tan(x)/f*(_*_/2-(5+3*u+10*d-4*d*d-9*h)*_*_*_*_/24+(61+90*u+298*d+45*u*u-252*h-3*d*d)*_*_*_*_*_*_/720);L=ic(L);var b=(_-(1+2*u+d)*_*_*_/6+(5-2*d+28*u-3*d*d+8*h+24*u*u)*_*_*_*_*_/120)/Math.cos(x);b=p+ic(b);var w;if(n.accuracy){var C=_h({northing:n.northing+n.accuracy,easting:n.easting+n.accuracy,zoneLetter:n.zoneLetter,zoneNumber:n.zoneNumber});w={top:C.lat,right:C.lon,bottom:L,left:b}}else w={lat:L,lon:b};return w}function sM(n){var t="Z";return 84>=n&&n>=72?t="X":72>n&&n>=64?t="W":64>n&&n>=56?t="V":56>n&&n>=48?t="U":48>n&&n>=40?t="T":40>n&&n>=32?t="S":32>n&&n>=24?t="R":24>n&&n>=16?t="Q":16>n&&n>=8?t="P":8>n&&n>=0?t="N":0>n&&n>=-8?t="M":-8>n&&n>=-16?t="L":-16>n&&n>=-24?t="K":-24>n&&n>=-32?t="J":-32>n&&n>=-40?t="H":-40>n&&n>=-48?t="G":-48>n&&n>=-56?t="F":-56>n&&n>=-64?t="E":-64>n&&n>=-72?t="D":-72>n&&n>=-80&&(t="C"),t}function rM(n,t){var e="00000"+n.easting,i="00000"+n.northing;return n.zoneNumber+n.zoneLetter+aM(n.easting,n.northing,n.zoneNumber)+e.substr(e.length-5,t)+i.substr(i.length-5,t)}function aM(n,t,e){var i=Mu(e),s=Math.floor(n/1e5),r=Math.floor(t/1e5)%20;return oM(s,r,i)}function Mu(n){var t=n%nc;return t===0&&(t=nc),t}function oM(n,t,e){var i=e-1,s=mu.charCodeAt(i),r=_u.charCodeAt(i),a=s+n-1,o=r+t,h=!1;a>vs&&(a=a-vs+Xi-1,h=!0),(a===Oe||s<Oe&&a>Oe||(a>Oe||s<Oe)&&h)&&a++,(a===en||s<en&&a>en||(a>en||s<en)&&h)&&(a++,a===Oe&&a++),a>vs&&(a=a-vs+Xi-1),o>gs?(o=o-gs+Xi-1,h=!0):h=!1,(o===Oe||r<Oe&&o>Oe||(o>Oe||r<Oe)&&h)&&o++,(o===en||r<en&&o>en||(o>en||r<en)&&h)&&(o++,o===Oe&&o++),o>gs&&(o=o-gs+Xi-1);var l=String.fromCharCode(a)+String.fromCharCode(o);return l}function xu(n){if(n&&n.length===0)throw"MGRSPoint coverting from nothing";for(var t=n.length,e=null,i="",s,r=0;!/[A-Z]/.test(s=n.charAt(r));){if(r>=2)throw"MGRSPoint bad conversion from: "+n;i+=s,r++}var a=parseInt(i,10);if(r===0||r+3>t)throw"MGRSPoint bad conversion from: "+n;var o=n.charAt(r++);if(o<="A"||o==="B"||o==="Y"||o>="Z"||o==="I"||o==="O")throw"MGRSPoint zone letter "+o+" not handled: "+n;e=n.substring(r,r+=2);for(var h=Mu(a),l=hM(e.charAt(0),h),c=lM(e.charAt(1),h);c<cM(o);)c+=2e6;var u=t-r;if(u%2!==0)throw`MGRSPoint has to have an even number 
of digits after the zone letter and two 100km letters - front 
half for easting meters, second half for 
northing meters`+n;var d=u/2,f=0,_=0,g,p,m,x,v;return d>0&&(g=1e5/Math.pow(10,d),p=n.substring(r,r+d),f=parseFloat(p)*g,m=n.substring(r+d),_=parseFloat(m)*g),x=f+l,v=_+c,{easting:x,northing:v,zoneLetter:o,zoneNumber:a,accuracy:g}}function hM(n,t){for(var e=mu.charCodeAt(t-1),i=1e5,s=!1;e!==n.charCodeAt(0);){if(e++,e===Oe&&e++,e===en&&e++,e>vs){if(s)throw"Bad character: "+n;e=Xi,s=!0}i+=1e5}return i}function lM(n,t){if(n>"V")throw"MGRSPoint given invalid Northing "+n;for(var e=_u.charCodeAt(t-1),i=0,s=!1;e!==n.charCodeAt(0);){if(e++,e===Oe&&e++,e===en&&e++,e>gs){if(s)throw"Bad character: "+n;e=Xi,s=!0}i+=1e5}return i}function cM(n){var t;switch(n){case"C":t=11e5;break;case"D":t=2e6;break;case"E":t=28e5;break;case"F":t=37e5;break;case"G":t=46e5;break;case"H":t=55e5;break;case"J":t=64e5;break;case"K":t=73e5;break;case"L":t=82e5;break;case"M":t=91e5;break;case"N":t=0;break;case"P":t=8e5;break;case"Q":t=17e5;break;case"R":t=26e5;break;case"S":t=35e5;break;case"T":t=44e5;break;case"U":t=53e5;break;case"V":t=62e5;break;case"W":t=7e6;break;case"X":t=79e5;break;default:t=-1}if(t>=0)return t;throw"Invalid zone letter: "+n}function rs(n,t,e){if(!(this instanceof rs))return new rs(n,t,e);if(Array.isArray(n))this.x=n[0],this.y=n[1],this.z=n[2]||0;else if(typeof n=="object")this.x=n.x,this.y=n.y,this.z=n.z||0;else if(typeof n=="string"&&typeof t>"u"){var i=n.split(",");this.x=parseFloat(i[0]),this.y=parseFloat(i[1]),this.z=parseFloat(i[2])||0}else this.x=n,this.y=t,this.z=e||0;console.warn("proj4.Point will be removed in version 3, use proj4.toPoint")}rs.fromMGRS=function(n){return new rs(vu(n))};rs.prototype.toMGRS=function(n){return gu([this.x,this.y],n)};var uM=1,fM=.25,sc=.046875,rc=.01953125,ac=.01068115234375,dM=.75,pM=.46875,mM=.013020833333333334,_M=.007120768229166667,gM=.3645833333333333,vM=.005696614583333333,MM=.3076171875;function gh(n){var t=[];t[0]=uM-n*(fM+n*(sc+n*(rc+n*ac))),t[1]=n*(dM-n*(sc+n*(rc+n*ac)));var e=n*n;return t[2]=e*(pM-n*(mM+n*_M)),e*=n,t[3]=e*(gM-n*vM),t[4]=e*n*MM,t}function hs(n,t,e,i){return e*=t,t*=t,i[0]*n-e*(i[1]+t*(i[2]+t*(i[3]+t*i[4])))}var xM=20;function vh(n,t,e){for(var i=1/(1-t),s=n,r=xM;r;--r){var a=Math.sin(s),o=1-t*a*a;if(o=(hs(s,a,Math.cos(s),e)-n)*(o*Math.sqrt(o))*i,s-=o,Math.abs(o)<st)return s}return s}function yM(){this.x0=this.x0!==void 0?this.x0:0,this.y0=this.y0!==void 0?this.y0:0,this.long0=this.long0!==void 0?this.long0:0,this.lat0=this.lat0!==void 0?this.lat0:0,this.es&&(this.en=gh(this.es),this.ml0=hs(this.lat0,Math.sin(this.lat0),Math.cos(this.lat0),this.en))}function SM(n){var t=n.x,e=n.y,i=at(t-this.long0,this.over),s,r,a,o=Math.sin(e),h=Math.cos(e);if(this.es){var c=h*i,u=Math.pow(c,2),d=this.ep2*Math.pow(h,2),f=Math.pow(d,2),_=Math.abs(h)>st?Math.tan(e):0,g=Math.pow(_,2),p=Math.pow(g,2);s=1-this.es*Math.pow(o,2),c=c/Math.sqrt(s);var m=hs(e,o,h,this.en);r=this.a*(this.k0*c*(1+u/6*(1-g+d+u/20*(5-18*g+p+14*d-58*g*d+u/42*(61+179*p-p*g-479*g)))))+this.x0,a=this.a*(this.k0*(m-this.ml0+o*i*c/2*(1+u/12*(5-g+9*d+4*f+u/30*(61+p-58*g+270*d-330*g*d+u/56*(1385+543*p-p*g-3111*g))))))+this.y0}else{var l=h*Math.sin(i);if(Math.abs(Math.abs(l)-1)<st)return 93;if(r=.5*this.a*this.k0*Math.log((1+l)/(1-l))+this.x0,a=h*Math.cos(i)/Math.sqrt(1-Math.pow(l,2)),l=Math.abs(a),l>=1){if(l-1>st)return 93;a=0}else a=Math.acos(a);e<0&&(a=-a),a=this.a*this.k0*(a-this.lat0)+this.y0}return n.x=r,n.y=a,n}function EM(n){var t,e,i,s,r=(n.x-this.x0)*(1/this.a),a=(n.y-this.y0)*(1/this.a);if(this.es)if(t=this.ml0+a/this.k0,e=vh(t,this.es,this.en),Math.abs(e)<j){var u=Math.sin(e),d=Math.cos(e),f=Math.abs(d)>st?Math.tan(e):0,_=this.ep2*Math.pow(d,2),g=Math.pow(_,2),p=Math.pow(f,2),m=Math.pow(p,2);t=1-this.es*Math.pow(u,2);var x=r*Math.sqrt(t)/this.k0,v=Math.pow(x,2);t=t*f,i=e-t*v/(1-this.es)*.5*(1-v/12*(5+3*p-9*_*p+_-4*g-v/30*(61+90*p-252*_*p+45*m+46*_-v/56*(1385+3633*p+4095*m+1574*m*p)))),s=at(this.long0+x*(1-v/6*(1+2*p+_-v/20*(5+28*p+24*m+8*_*p+6*_-v/42*(61+662*p+1320*m+720*m*p))))/d,this.over)}else i=j*qs(a),s=0;else{var o=Math.exp(r/this.k0),h=.5*(o-1/o),l=this.lat0+a/this.k0,c=Math.cos(l);t=Math.sqrt((1-Math.pow(c,2))/(1+Math.pow(h,2))),i=Math.asin(t),a<0&&(i=-i),h===0&&c===0?s=0:s=at(Math.atan2(h,c)+this.long0,this.over)}return n.x=s,n.y=i,n}var TM=["Fast_Transverse_Mercator","Fast Transverse Mercator"];const zr={init:yM,forward:SM,inverse:EM,names:TM};function yu(n){var t=Math.exp(n);return t=(t-1/t)/2,t}function Ge(n,t){n=Math.abs(n),t=Math.abs(t);var e=Math.max(n,t),i=Math.min(n,t)/(e||1);return e*Math.sqrt(1+Math.pow(i,2))}function bM(n){var t=1+n,e=t-1;return e===0?n:n*Math.log(t)/e}function wM(n){var t=Math.abs(n);return t=bM(t*(1+t/(Ge(1,t)+1))),n<0?-t:t}function Mh(n,t){for(var e=2*Math.cos(2*t),i=n.length-1,s=n[i],r=0,a;--i>=0;)a=-r+e*s+n[i],r=s,s=a;return t+a*Math.sin(2*t)}function AM(n,t){for(var e=2*Math.cos(t),i=n.length-1,s=n[i],r=0,a;--i>=0;)a=-r+e*s+n[i],r=s,s=a;return Math.sin(t)*a}function PM(n){var t=Math.exp(n);return t=(t+1/t)/2,t}function Su(n,t,e){for(var i=Math.sin(t),s=Math.cos(t),r=yu(e),a=PM(e),o=2*s*a,h=-2*i*r,l=n.length-1,c=n[l],u=0,d=0,f=0,_,g;--l>=0;)_=d,g=u,d=c,u=f,c=-_+o*d-h*u+n[l],f=-g+h*d+o*u;return o=i*a,h=s*r,[o*c-h*f,o*f+h*c]}function RM(){if(!this.approx&&(isNaN(this.es)||this.es<=0))throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');this.approx&&(zr.init.apply(this),this.forward=zr.forward,this.inverse=zr.inverse),this.x0=this.x0!==void 0?this.x0:0,this.y0=this.y0!==void 0?this.y0:0,this.long0=this.long0!==void 0?this.long0:0,this.lat0=this.lat0!==void 0?this.lat0:0,this.cgb=[],this.cbg=[],this.utg=[],this.gtu=[];var n=this.es/(1+Math.sqrt(1-this.es)),t=n/(2-n),e=t;this.cgb[0]=t*(2+t*(-2/3+t*(-2+t*(116/45+t*(26/45+t*(-2854/675)))))),this.cbg[0]=t*(-2+t*(2/3+t*(4/3+t*(-82/45+t*(32/45+t*(4642/4725)))))),e=e*t,this.cgb[1]=e*(7/3+t*(-8/5+t*(-227/45+t*(2704/315+t*(2323/945))))),this.cbg[1]=e*(5/3+t*(-16/15+t*(-13/9+t*(904/315+t*(-1522/945))))),e=e*t,this.cgb[2]=e*(56/15+t*(-136/35+t*(-1262/105+t*(73814/2835)))),this.cbg[2]=e*(-26/15+t*(34/21+t*(8/5+t*(-12686/2835)))),e=e*t,this.cgb[3]=e*(4279/630+t*(-332/35+t*(-399572/14175))),this.cbg[3]=e*(1237/630+t*(-12/5+t*(-24832/14175))),e=e*t,this.cgb[4]=e*(4174/315+t*(-144838/6237)),this.cbg[4]=e*(-734/315+t*(109598/31185)),e=e*t,this.cgb[5]=e*(601676/22275),this.cbg[5]=e*(444337/155925),e=Math.pow(t,2),this.Qn=this.k0/(1+t)*(1+e*(1/4+e*(1/64+e/256))),this.utg[0]=t*(-.5+t*(2/3+t*(-37/96+t*(1/360+t*(81/512+t*(-96199/604800)))))),this.gtu[0]=t*(.5+t*(-2/3+t*(5/16+t*(41/180+t*(-127/288+t*(7891/37800)))))),this.utg[1]=e*(-1/48+t*(-1/15+t*(437/1440+t*(-46/105+t*(1118711/3870720))))),this.gtu[1]=e*(13/48+t*(-3/5+t*(557/1440+t*(281/630+t*(-1983433/1935360))))),e=e*t,this.utg[2]=e*(-17/480+t*(37/840+t*(209/4480+t*(-5569/90720)))),this.gtu[2]=e*(61/240+t*(-103/140+t*(15061/26880+t*(167603/181440)))),e=e*t,this.utg[3]=e*(-4397/161280+t*(11/504+t*(830251/7257600))),this.gtu[3]=e*(49561/161280+t*(-179/168+t*(6601661/7257600))),e=e*t,this.utg[4]=e*(-4583/161280+t*(108847/3991680)),this.gtu[4]=e*(34729/80640+t*(-3418889/1995840)),e=e*t,this.utg[5]=e*(-20648693/638668800),this.gtu[5]=e*(212378941/319334400);var i=Mh(this.cbg,this.lat0);this.Zb=-this.Qn*(i+AM(this.gtu,2*i))}function CM(n){var t=at(n.x-this.long0,this.over),e=n.y;e=Mh(this.cbg,e);var i=Math.sin(e),s=Math.cos(e),r=Math.sin(t),a=Math.cos(t);e=Math.atan2(i,a*s),t=Math.atan2(r*s,Ge(i,s*a)),t=wM(Math.tan(t));var o=Su(this.gtu,2*e,2*t);e=e+o[0],t=t+o[1];var h,l;return Math.abs(t)<=2.623395162778?(h=this.a*(this.Qn*t)+this.x0,l=this.a*(this.Qn*e+this.Zb)+this.y0):(h=1/0,l=1/0),n.x=h,n.y=l,n}function LM(n){var t=(n.x-this.x0)*(1/this.a),e=(n.y-this.y0)*(1/this.a);e=(e-this.Zb)/this.Qn,t=t/this.Qn;var i,s;if(Math.abs(t)<=2.623395162778){var r=Su(this.utg,2*e,2*t);e=e+r[0],t=t+r[1],t=Math.atan(yu(t));var a=Math.sin(e),o=Math.cos(e),h=Math.sin(t),l=Math.cos(t);e=Math.atan2(a*l,Ge(h,l*o)),t=Math.atan2(h,l*o),i=at(t+this.long0,this.over),s=Mh(this.cgb,e)}else i=1/0,s=1/0;return n.x=i,n.y=s,n}var IM=["Extended_Transverse_Mercator","Extended Transverse Mercator","etmerc","Transverse_Mercator","Transverse Mercator","Gauss Kruger","Gauss_Kruger","tmerc"];const kr={init:RM,forward:CM,inverse:LM,names:IM};function NM(n,t){if(n===void 0){if(n=Math.floor((at(t)+Math.PI)*30/Math.PI)+1,n<0)return 0;if(n>60)return 60}return n}var DM="etmerc";function UM(){var n=NM(this.zone,this.long0);if(n===void 0)throw new Error("unknown utm zone");this.lat0=0,this.long0=(6*Math.abs(n)-183)*oe,this.x0=5e5,this.y0=this.utmSouth?1e7:0,this.k0=.9996,kr.init.apply(this),this.forward=kr.forward,this.inverse=kr.inverse}var OM=["Universal Transverse Mercator System","utm"];const FM={init:UM,names:OM,dependsOn:DM};function xh(n,t){return Math.pow((1-n)/(1+n),t)}var GM=20;function BM(){var n=Math.sin(this.lat0),t=Math.cos(this.lat0);t*=t,this.rc=Math.sqrt(1-this.es)/(1-this.es*n*n),this.C=Math.sqrt(1+this.es*t*t/(1-this.es)),this.phic0=Math.asin(n/this.C),this.ratexp=.5*this.C*this.e,this.K=Math.tan(.5*this.phic0+qt)/(Math.pow(Math.tan(.5*this.lat0+qt),this.C)*xh(this.e*n,this.ratexp))}function zM(n){var t=n.x,e=n.y;return n.y=2*Math.atan(this.K*Math.pow(Math.tan(.5*e+qt),this.C)*xh(this.e*Math.sin(e),this.ratexp))-j,n.x=this.C*t,n}function kM(n){for(var t=1e-14,e=n.x/this.C,i=n.y,s=Math.pow(Math.tan(.5*i+qt)/this.K,1/this.C),r=GM;r>0&&(i=2*Math.atan(s*xh(this.e*Math.sin(n.y),-.5*this.e))-j,!(Math.abs(i-n.y)<t));--r)n.y=i;return r?(n.x=e,n.y=i,n):null}const yh={init:BM,forward:zM,inverse:kM};function HM(){yh.init.apply(this),this.rc&&(this.sinc0=Math.sin(this.phic0),this.cosc0=Math.cos(this.phic0),this.R2=2*this.rc,this.title||(this.title="Oblique Stereographic Alternative"))}function VM(n){var t,e,i,s;return n.x=at(n.x-this.long0,this.over),yh.forward.apply(this,[n]),t=Math.sin(n.y),e=Math.cos(n.y),i=Math.cos(n.x),s=this.k0*this.R2/(1+this.sinc0*t+this.cosc0*e*i),n.x=s*e*Math.sin(n.x),n.y=s*(this.cosc0*t-this.sinc0*e*i),n.x=this.a*n.x+this.x0,n.y=this.a*n.y+this.y0,n}function WM(n){var t,e,i,s,r;if(n.x=(n.x-this.x0)/this.a,n.y=(n.y-this.y0)/this.a,n.x/=this.k0,n.y/=this.k0,r=Ge(n.x,n.y)){var a=2*Math.atan2(r,this.R2);t=Math.sin(a),e=Math.cos(a),s=Math.asin(e*this.sinc0+n.y*t*this.cosc0/r),i=Math.atan2(n.x*t,r*this.cosc0*e-n.y*this.sinc0*t)}else s=this.phic0,i=0;return n.x=i,n.y=s,yh.inverse.apply(this,[n]),n.x=at(n.x+this.long0,this.over),n}var XM=["Stereographic_North_Pole","Oblique_Stereographic","sterea","Oblique Stereographic Alternative","Double_Stereographic"];const qM={init:HM,forward:VM,inverse:WM,names:XM};function Sh(n,t,e){return t*=e,Math.tan(.5*(j+n))*Math.pow((1-t)/(1+t),.5*e)}function YM(){this.x0=this.x0||0,this.y0=this.y0||0,this.lat0=this.lat0||0,this.long0=this.long0||0,this.coslat0=Math.cos(this.lat0),this.sinlat0=Math.sin(this.lat0),this.sphere?this.k0===1&&!isNaN(this.lat_ts)&&Math.abs(this.coslat0)<=st&&(this.k0=.5*(1+qs(this.lat0)*Math.sin(this.lat_ts))):(Math.abs(this.coslat0)<=st&&(this.lat0>0?this.con=1:this.con=-1),this.cons=Math.sqrt(Math.pow(1+this.e,1+this.e)*Math.pow(1-this.e,1-this.e)),this.k0===1&&!isNaN(this.lat_ts)&&Math.abs(this.coslat0)<=st&&Math.abs(Math.cos(this.lat_ts))>st&&(this.k0=.5*this.cons*vn(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts))/dn(this.e,this.con*this.lat_ts,this.con*Math.sin(this.lat_ts))),this.ms1=vn(this.e,this.sinlat0,this.coslat0),this.X0=2*Math.atan(Sh(this.lat0,this.sinlat0,this.e))-j,this.cosX0=Math.cos(this.X0),this.sinX0=Math.sin(this.X0))}function $M(n){var t=n.x,e=n.y,i=Math.sin(e),s=Math.cos(e),r,a,o,h,l,c,u=at(t-this.long0,this.over);return Math.abs(Math.abs(t-this.long0)-Math.PI)<=st&&Math.abs(e+this.lat0)<=st?(n.x=NaN,n.y=NaN,n):this.sphere?(r=2*this.k0/(1+this.sinlat0*i+this.coslat0*s*Math.cos(u)),n.x=this.a*r*s*Math.sin(u)+this.x0,n.y=this.a*r*(this.coslat0*i-this.sinlat0*s*Math.cos(u))+this.y0,n):(a=2*Math.atan(Sh(e,i,this.e))-j,h=Math.cos(a),o=Math.sin(a),Math.abs(this.coslat0)<=st?(l=dn(this.e,e*this.con,this.con*i),c=2*this.a*this.k0*l/this.cons,n.x=this.x0+c*Math.sin(t-this.long0),n.y=this.y0-this.con*c*Math.cos(t-this.long0),n):(Math.abs(this.sinlat0)<st?(r=2*this.a*this.k0/(1+h*Math.cos(u)),n.y=r*o):(r=2*this.a*this.k0*this.ms1/(this.cosX0*(1+this.sinX0*o+this.cosX0*h*Math.cos(u))),n.y=r*(this.cosX0*o-this.sinX0*h*Math.cos(u))+this.y0),n.x=r*h*Math.sin(u)+this.x0,n))}function KM(n){n.x-=this.x0,n.y-=this.y0;var t,e,i,s,r,a=Math.sqrt(n.x*n.x+n.y*n.y);if(this.sphere){var o=2*Math.atan(a/(2*this.a*this.k0));return t=this.long0,e=this.lat0,a<=st?(n.x=t,n.y=e,n):(e=Math.asin(Math.cos(o)*this.sinlat0+n.y*Math.sin(o)*this.coslat0/a),Math.abs(this.coslat0)<st?this.lat0>0?t=at(this.long0+Math.atan2(n.x,-1*n.y),this.over):t=at(this.long0+Math.atan2(n.x,n.y),this.over):t=at(this.long0+Math.atan2(n.x*Math.sin(o),a*this.coslat0*Math.cos(o)-n.y*this.sinlat0*Math.sin(o)),this.over),n.x=t,n.y=e,n)}else if(Math.abs(this.coslat0)<=st){if(a<=st)return e=this.lat0,t=this.long0,n.x=t,n.y=e,n;n.x*=this.con,n.y*=this.con,i=a*this.cons/(2*this.a*this.k0),e=this.con*Bs(this.e,i),t=this.con*at(this.con*this.long0+Math.atan2(n.x,-1*n.y),this.over)}else s=2*Math.atan(a*this.cosX0/(2*this.a*this.k0*this.ms1)),t=this.long0,a<=st?r=this.X0:(r=Math.asin(Math.cos(s)*this.sinX0+n.y*Math.sin(s)*this.cosX0/a),t=at(this.long0+Math.atan2(n.x*Math.sin(s),a*this.cosX0*Math.cos(s)-n.y*this.sinX0*Math.sin(s)),this.over)),e=-1*Bs(this.e,Math.tan(.5*(j+r)));return n.x=t,n.y=e,n}var jM=["stere","Stereographic_South_Pole","Polar_Stereographic_variant_A","Polar_Stereographic_variant_B","Polar_Stereographic"];const ZM={init:YM,forward:$M,inverse:KM,names:jM,ssfn_:Sh};function JM(){var n=this.lat0;this.lambda0=this.long0;var t=Math.sin(n),e=this.a,i=this.rf,s=1/i,r=2*s-Math.pow(s,2),a=this.e=Math.sqrt(r);this.R=this.k0*e*Math.sqrt(1-r)/(1-r*Math.pow(t,2)),this.alpha=Math.sqrt(1+r/(1-r)*Math.pow(Math.cos(n),4)),this.b0=Math.asin(t/this.alpha);var o=Math.log(Math.tan(Math.PI/4+this.b0/2)),h=Math.log(Math.tan(Math.PI/4+n/2)),l=Math.log((1+a*t)/(1-a*t));this.K=o-this.alpha*h+this.alpha*a/2*l}function QM(n){var t=Math.log(Math.tan(Math.PI/4-n.y/2)),e=this.e/2*Math.log((1+this.e*Math.sin(n.y))/(1-this.e*Math.sin(n.y))),i=-this.alpha*(t+e)+this.K,s=2*(Math.atan(Math.exp(i))-Math.PI/4),r=this.alpha*(n.x-this.lambda0),a=Math.atan(Math.sin(r)/(Math.sin(this.b0)*Math.tan(s)+Math.cos(this.b0)*Math.cos(r))),o=Math.asin(Math.cos(this.b0)*Math.sin(s)-Math.sin(this.b0)*Math.cos(s)*Math.cos(r));return n.y=this.R/2*Math.log((1+Math.sin(o))/(1-Math.sin(o)))+this.y0,n.x=this.R*a+this.x0,n}function t1(n){for(var t=n.x-this.x0,e=n.y-this.y0,i=t/this.R,s=2*(Math.atan(Math.exp(e/this.R))-Math.PI/4),r=Math.asin(Math.cos(this.b0)*Math.sin(s)+Math.sin(this.b0)*Math.cos(s)*Math.cos(i)),a=Math.atan(Math.sin(i)/(Math.cos(this.b0)*Math.cos(i)-Math.sin(this.b0)*Math.tan(s))),o=this.lambda0+a/this.alpha,h=0,l=r,c=-1e3,u=0;Math.abs(l-c)>1e-7;){if(++u>20)return;h=1/this.alpha*(Math.log(Math.tan(Math.PI/4+r/2))-this.K)+this.e*Math.log(Math.tan(Math.PI/4+Math.asin(this.e*Math.sin(l))/2)),c=l,l=2*Math.atan(Math.exp(h))-Math.PI/2}return n.x=o,n.y=l,n}var e1=["somerc"];const n1={init:JM,forward:QM,inverse:t1,names:e1};var Bi=1e-7;function i1(n){var t=["Hotine_Oblique_Mercator","Hotine_Oblique_Mercator_variant_A","Hotine_Oblique_Mercator_Azimuth_Natural_Origin"],e=typeof n.projName=="object"?Object.keys(n.projName)[0]:n.projName;return"no_uoff"in n||"no_off"in n||t.indexOf(e)!==-1||t.indexOf(uu(e))!==-1}function s1(){var n,t,e,i,s,r,a,o,h,l,c=0,u,d=0,f=0,_=0,g=0,p=0,m=0;this.no_off=i1(this),this.no_rot="no_rot"in this;var x=!1;"alpha"in this&&(x=!0);var v=!1;if("rectified_grid_angle"in this&&(v=!0),x&&(m=this.alpha),v&&(c=this.rectified_grid_angle,x||(m=0,x=!0)),x||v)d=this.longc;else if(f=this.long1,g=this.lat1,_=this.long2,p=this.lat2,Math.abs(g-p)<=Bi||(n=Math.abs(g))<=Bi||Math.abs(n-j)<=Bi||Math.abs(Math.abs(this.lat0)-j)<=Bi||Math.abs(Math.abs(p)-j)<=Bi)throw new Error;var S=1-this.es;t=Math.sqrt(S),Math.abs(this.lat0)>st?(o=Math.sin(this.lat0),e=Math.cos(this.lat0),n=1-this.es*o*o,this.B=e*e,this.B=Math.sqrt(1+this.es*this.B*this.B/S),this.A=this.B*this.k0*t/n,i=this.B*t/(e*Math.sqrt(n)),s=i*i-1,s<=0?s=0:(s=Math.sqrt(s),this.lat0<0&&(s=-s)),this.E=s+=i,this.E*=Math.pow(dn(this.e,this.lat0,o),this.B)):(this.B=1/t,this.A=this.k0,this.E=i=s=1),x||v?(x?(u=Math.asin(Math.sin(m)/i),v||(c=m)):(u=c,m=Math.asin(i*Math.sin(u))),this.lam0=d-Math.asin(.5*(s-1/s)*Math.tan(u))/this.B):(r=Math.pow(dn(this.e,g,Math.sin(g)),this.B),a=Math.pow(dn(this.e,p,Math.sin(p)),this.B),s=this.E/r,h=(a-r)/(a+r),l=this.E*this.E,l=(l-a*r)/(l+a*r),n=f-_,n<-Math.PI?_-=Fs:n>Math.PI&&(_+=Fs),this.lam0=at(.5*(f+_)-Math.atan(l*Math.tan(.5*this.B*(f-_))/h)/this.B,this.over),u=Math.atan(2*Math.sin(this.B*at(f-this.lam0,this.over))/(s-1/s)),c=m=Math.asin(i*Math.sin(u))),this.singam=Math.sin(u),this.cosgam=Math.cos(u),this.sinrot=Math.sin(c),this.cosrot=Math.cos(c),this.rB=1/this.B,this.ArB=this.A*this.rB,this.BrA=1/this.ArB,this.no_off?this.u_0=0:(this.u_0=Math.abs(this.ArB*Math.atan(Math.sqrt(i*i-1)/Math.cos(m))),this.lat0<0&&(this.u_0=-this.u_0)),s=.5*u,this.v_pole_n=this.ArB*Math.log(Math.tan(qt-s)),this.v_pole_s=this.ArB*Math.log(Math.tan(qt+s))}function r1(n){var t={},e,i,s,r,a,o,h,l;if(n.x=n.x-this.lam0,Math.abs(Math.abs(n.y)-j)>st){if(a=this.E/Math.pow(dn(this.e,n.y,Math.sin(n.y)),this.B),o=1/a,e=.5*(a-o),i=.5*(a+o),r=Math.sin(this.B*n.x),s=(e*this.singam-r*this.cosgam)/i,Math.abs(Math.abs(s)-1)<st)throw new Error;l=.5*this.ArB*Math.log((1-s)/(1+s)),o=Math.cos(this.B*n.x),Math.abs(o)<Bi?h=this.A*n.x:h=this.ArB*Math.atan2(e*this.cosgam+r*this.singam,o)}else l=n.y>0?this.v_pole_n:this.v_pole_s,h=this.ArB*n.y;return this.no_rot?(t.x=h,t.y=l):(h-=this.u_0,t.x=l*this.cosrot+h*this.sinrot,t.y=h*this.cosrot-l*this.sinrot),t.x=this.a*t.x+this.x0,t.y=this.a*t.y+this.y0,t}function a1(n){var t,e,i,s,r,a,o,h={};if(n.x=(n.x-this.x0)*(1/this.a),n.y=(n.y-this.y0)*(1/this.a),this.no_rot?(e=n.y,t=n.x):(e=n.x*this.cosrot-n.y*this.sinrot,t=n.y*this.cosrot+n.x*this.sinrot+this.u_0),i=Math.exp(-this.BrA*e),s=.5*(i-1/i),r=.5*(i+1/i),a=Math.sin(this.BrA*t),o=(a*this.cosgam+s*this.singam)/r,Math.abs(Math.abs(o)-1)<st)h.x=0,h.y=o<0?-j:j;else{if(h.y=this.E/Math.sqrt((1+o)/(1-o)),h.y=Bs(this.e,Math.pow(h.y,1/this.B)),h.y===1/0)throw new Error;h.x=-this.rB*Math.atan2(s*this.cosgam-a*this.singam,Math.cos(this.BrA*t))}return h.x+=this.lam0,h}var o1=["Hotine_Oblique_Mercator","Hotine Oblique Mercator","Hotine_Oblique_Mercator_variant_A","Hotine_Oblique_Mercator_Variant_B","Hotine_Oblique_Mercator_Azimuth_Natural_Origin","Hotine_Oblique_Mercator_Two_Point_Natural_Origin","Hotine_Oblique_Mercator_Azimuth_Center","Oblique_Mercator","omerc"];const h1={init:s1,forward:r1,inverse:a1,names:o1};function l1(){if(this.lat2||(this.lat2=this.lat1),this.k0||(this.k0=1),this.x0=this.x0||0,this.y0=this.y0||0,!(Math.abs(this.lat1+this.lat2)<st)){var n=this.b/this.a;this.e=Math.sqrt(1-n*n);var t=Math.sin(this.lat1),e=Math.cos(this.lat1),i=vn(this.e,t,e),s=dn(this.e,this.lat1,t),r=Math.sin(this.lat2),a=Math.cos(this.lat2),o=vn(this.e,r,a),h=dn(this.e,this.lat2,r),l=Math.abs(Math.abs(this.lat0)-j)<st?0:dn(this.e,this.lat0,Math.sin(this.lat0));Math.abs(this.lat1-this.lat2)>st?this.ns=Math.log(i/o)/Math.log(s/h):this.ns=t,isNaN(this.ns)&&(this.ns=t),this.f0=i/(this.ns*Math.pow(s,this.ns)),this.rh=this.a*this.f0*Math.pow(l,this.ns),this.title||(this.title="Lambert Conformal Conic")}}function c1(n){var t=n.x,e=n.y;Math.abs(2*Math.abs(e)-Math.PI)<=st&&(e=qs(e)*(j-2*st));var i=Math.abs(Math.abs(e)-j),s,r;if(i>st)s=dn(this.e,e,Math.sin(e)),r=this.a*this.f0*Math.pow(s,this.ns);else{if(i=e*this.ns,i<=0)return null;r=0}var a=this.ns*at(t-this.long0,this.over);return n.x=this.k0*(r*Math.sin(a))+this.x0,n.y=this.k0*(this.rh-r*Math.cos(a))+this.y0,n}function u1(n){var t,e,i,s,r,a=(n.x-this.x0)/this.k0,o=this.rh-(n.y-this.y0)/this.k0;this.ns>0?(t=Math.sqrt(a*a+o*o),e=1):(t=-Math.sqrt(a*a+o*o),e=-1);var h=0;if(t!==0&&(h=Math.atan2(e*a,e*o)),t!==0||this.ns>0){if(e=1/this.ns,i=Math.pow(t/(this.a*this.f0),e),s=Bs(this.e,i),s===-9999)return null}else s=-j;return r=at(h/this.ns+this.long0,this.over),n.x=r,n.y=s,n}var f1=["Lambert Tangential Conformal Conic Projection","Lambert_Conformal_Conic","Lambert_Conformal_Conic_1SP","Lambert_Conformal_Conic_2SP","lcc","Lambert Conic Conformal (1SP)","Lambert Conic Conformal (2SP)"];const d1={init:l1,forward:c1,inverse:u1,names:f1};function p1(){this.a=6377397155e-3,this.es=.006674372230614,this.e=Math.sqrt(this.es),this.lat0||(this.lat0=.863937979737193),this.long0||(this.long0=.7417649320975901-.308341501185665),this.k0||(this.k0=.9999),this.s45=.785398163397448,this.s90=2*this.s45,this.fi0=this.lat0,this.e2=this.es,this.e=Math.sqrt(this.e2),this.alfa=Math.sqrt(1+this.e2*Math.pow(Math.cos(this.fi0),4)/(1-this.e2)),this.uq=1.04216856380474,this.u0=Math.asin(Math.sin(this.fi0)/this.alfa),this.g=Math.pow((1+this.e*Math.sin(this.fi0))/(1-this.e*Math.sin(this.fi0)),this.alfa*this.e/2),this.k=Math.tan(this.u0/2+this.s45)/Math.pow(Math.tan(this.fi0/2+this.s45),this.alfa)*this.g,this.k1=this.k0,this.n0=this.a*Math.sqrt(1-this.e2)/(1-this.e2*Math.pow(Math.sin(this.fi0),2)),this.s0=1.37008346281555,this.n=Math.sin(this.s0),this.ro0=this.k1*this.n0/Math.tan(this.s0),this.ad=this.s90-this.uq}function m1(n){var t,e,i,s,r,a,o,h=n.x,l=n.y,c=at(h-this.long0,this.over);return t=Math.pow((1+this.e*Math.sin(l))/(1-this.e*Math.sin(l)),this.alfa*this.e/2),e=2*(Math.atan(this.k*Math.pow(Math.tan(l/2+this.s45),this.alfa)/t)-this.s45),i=-c*this.alfa,s=Math.asin(Math.cos(this.ad)*Math.sin(e)+Math.sin(this.ad)*Math.cos(e)*Math.cos(i)),r=Math.asin(Math.cos(e)*Math.sin(i)/Math.cos(s)),a=this.n*r,o=this.ro0*Math.pow(Math.tan(this.s0/2+this.s45),this.n)/Math.pow(Math.tan(s/2+this.s45),this.n),n.y=o*Math.cos(a)/1,n.x=o*Math.sin(a)/1,this.czech||(n.y*=-1,n.x*=-1),n}function _1(n){var t,e,i,s,r,a,o,h,l=n.x;n.x=n.y,n.y=l,this.czech||(n.y*=-1,n.x*=-1),a=Math.sqrt(n.x*n.x+n.y*n.y),r=Math.atan2(n.y,n.x),s=r/Math.sin(this.s0),i=2*(Math.atan(Math.pow(this.ro0/a,1/this.n)*Math.tan(this.s0/2+this.s45))-this.s45),t=Math.asin(Math.cos(this.ad)*Math.sin(i)-Math.sin(this.ad)*Math.cos(i)*Math.cos(s)),e=Math.asin(Math.cos(i)*Math.sin(s)/Math.cos(t)),n.x=this.long0-e/this.alfa,o=t,h=0;var c=0;do n.y=2*(Math.atan(Math.pow(this.k,-1/this.alfa)*Math.pow(Math.tan(t/2+this.s45),1/this.alfa)*Math.pow((1+this.e*Math.sin(o))/(1-this.e*Math.sin(o)),this.e/2))-this.s45),Math.abs(o-n.y)<1e-10&&(h=1),o=n.y,c+=1;while(h===0&&c<15);return c>=15?null:n}var g1=["Krovak","Krovak Modified","Krovak (North Orientated)","Krovak Modified (North Orientated)","krovak"];const v1={init:p1,forward:m1,inverse:_1,names:g1};function Ie(n,t,e,i,s){return n*s-t*Math.sin(2*s)+e*Math.sin(4*s)-i*Math.sin(6*s)}function Ys(n){return 1-.25*n*(1+n/16*(3+1.25*n))}function $s(n){return .375*n*(1+.25*n*(1+.46875*n))}function Ks(n){return .05859375*n*n*(1+.75*n)}function js(n){return n*n*n*(35/3072)}function Eh(n,t,e){var i=t*e;return n/Math.sqrt(1-i*i)}function jn(n){return Math.abs(n)<j?n:n-qs(n)*Math.PI}function ea(n,t,e,i,s){var r,a;r=n/t;for(var o=0;o<15;o++)if(a=(n-(t*r-e*Math.sin(2*r)+i*Math.sin(4*r)-s*Math.sin(6*r)))/(t-2*e*Math.cos(2*r)+4*i*Math.cos(4*r)-6*s*Math.cos(6*r)),r+=a,Math.abs(a)<=1e-10)return r;return NaN}function M1(){this.sphere||(this.e0=Ys(this.es),this.e1=$s(this.es),this.e2=Ks(this.es),this.e3=js(this.es),this.ml0=this.a*Ie(this.e0,this.e1,this.e2,this.e3,this.lat0))}function x1(n){var t,e,i=n.x,s=n.y;if(i=at(i-this.long0,this.over),this.sphere)t=this.a*Math.asin(Math.cos(s)*Math.sin(i)),e=this.a*(Math.atan2(Math.tan(s),Math.cos(i))-this.lat0);else{var r=Math.sin(s),a=Math.cos(s),o=Eh(this.a,this.e,r),h=Math.tan(s)*Math.tan(s),l=i*Math.cos(s),c=l*l,u=this.es*a*a/(1-this.es),d=this.a*Ie(this.e0,this.e1,this.e2,this.e3,s);t=o*l*(1-c*h*(1/6-(8-h+8*u)*c/120)),e=d-this.ml0+o*r/a*c*(.5+(5-h+6*u)*c/24)}return n.x=t+this.x0,n.y=e+this.y0,n}function y1(n){n.x-=this.x0,n.y-=this.y0;var t=n.x/this.a,e=n.y/this.a,i,s;if(this.sphere){var r=e+this.lat0;i=Math.asin(Math.sin(r)*Math.cos(t)),s=Math.atan2(Math.tan(t),Math.cos(r))}else{var a=this.ml0/this.a+e,o=ea(a,this.e0,this.e1,this.e2,this.e3);if(Math.abs(Math.abs(o)-j)<=st)return n.x=this.long0,n.y=j,e<0&&(n.y*=-1),n;var h=Eh(this.a,this.e,Math.sin(o)),l=h*h*h/this.a/this.a*(1-this.es),c=Math.pow(Math.tan(o),2),u=t*this.a/h,d=u*u;i=o-h*Math.tan(o)/l*u*u*(.5-(1+3*c)*u*u/24),s=u*(1-d*(c/3+(1+3*c)*c*d/15))/Math.cos(o)}return n.x=at(s+this.long0,this.over),n.y=jn(i),n}var S1=["Cassini","Cassini_Soldner","cass"];const E1={init:M1,forward:x1,inverse:y1,names:S1};function gn(n,t){var e;return n>1e-7?(e=n*t,(1-n*n)*(t/(1-e*e)-.5/n*Math.log((1-e)/(1+e)))):2*t}var T1=.3333333333333333,b1=.17222222222222222,w1=.10257936507936508,A1=.06388888888888888,P1=.0664021164021164,R1=.016415012942191543;function Eu(n){var t,e=[];return e[0]=n*T1,t=n*n,e[0]+=t*b1,e[1]=t*A1,t*=n,e[0]+=t*w1,e[1]+=t*P1,e[2]=t*R1,e}function Tu(n,t){var e=n+n;return n+t[0]*Math.sin(e)+t[1]*Math.sin(e+e)+t[2]*Math.sin(e+e+e)}var Ko=1,jo=2,Zo=3,Hr=4;function C1(){var n=Math.abs(this.lat0);if(Math.abs(n-j)<st?this.mode=this.lat0<0?Ko:jo:Math.abs(n)<st?this.mode=Zo:this.mode=Hr,this.es>0){var t;switch(this.qp=gn(this.e,1),this.mmf=.5/(1-this.es),this.apa=Eu(this.es),this.mode){case jo:this.dd=1;break;case Ko:this.dd=1;break;case Zo:this.rq=Math.sqrt(.5*this.qp),this.dd=1/this.rq,this.xmf=1,this.ymf=.5*this.qp;break;case Hr:this.rq=Math.sqrt(.5*this.qp),t=Math.sin(this.lat0),this.sinb1=gn(this.e,t)/this.qp,this.cosb1=Math.sqrt(1-this.sinb1*this.sinb1),this.dd=Math.cos(this.lat0)/(Math.sqrt(1-this.es*t*t)*this.rq*this.cosb1),this.ymf=(this.xmf=this.rq)/this.dd,this.xmf*=this.dd;break}}else this.mode===Hr&&(this.sinph0=Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0))}function L1(n){var t,e,i,s,r,a,o,h,l,c,u=n.x,d=n.y;if(u=at(u-this.long0,this.over),this.sphere){if(r=Math.sin(d),c=Math.cos(d),i=Math.cos(u),this.mode===this.OBLIQ||this.mode===this.EQUIT){if(e=this.mode===this.EQUIT?1+c*i:1+this.sinph0*r+this.cosph0*c*i,e<=st)return null;e=Math.sqrt(2/e),t=e*c*Math.sin(u),e*=this.mode===this.EQUIT?r:this.cosph0*r-this.sinph0*c*i}else if(this.mode===this.N_POLE||this.mode===this.S_POLE){if(this.mode===this.N_POLE&&(i=-i),Math.abs(d+this.lat0)<st)return null;e=qt-d*.5,e=2*(this.mode===this.S_POLE?Math.cos(e):Math.sin(e)),t=e*Math.sin(u),e*=i}}else{switch(o=0,h=0,l=0,i=Math.cos(u),s=Math.sin(u),r=Math.sin(d),a=gn(this.e,r),(this.mode===this.OBLIQ||this.mode===this.EQUIT)&&(o=a/this.qp,h=Math.sqrt(1-o*o)),this.mode){case this.OBLIQ:l=1+this.sinb1*o+this.cosb1*h*i;break;case this.EQUIT:l=1+h*i;break;case this.N_POLE:l=j+d,a=this.qp-a;break;case this.S_POLE:l=d-j,a=this.qp+a;break}if(Math.abs(l)<st)return null;switch(this.mode){case this.OBLIQ:case this.EQUIT:l=Math.sqrt(2/l),this.mode===this.OBLIQ?e=this.ymf*l*(this.cosb1*o-this.sinb1*h*i):e=(l=Math.sqrt(2/(1+h*i)))*o*this.ymf,t=this.xmf*l*h*s;break;case this.N_POLE:case this.S_POLE:a>=0?(t=(l=Math.sqrt(a))*s,e=i*(this.mode===this.S_POLE?l:-l)):t=e=0;break}}return n.x=this.a*t+this.x0,n.y=this.a*e+this.y0,n}function I1(n){n.x-=this.x0,n.y-=this.y0;var t=n.x/this.a,e=n.y/this.a,i,s,r,a,o,h,l;if(this.sphere){var c=0,u,d=0;if(u=Math.sqrt(t*t+e*e),s=u*.5,s>1)return null;switch(s=2*Math.asin(s),(this.mode===this.OBLIQ||this.mode===this.EQUIT)&&(d=Math.sin(s),c=Math.cos(s)),this.mode){case this.EQUIT:s=Math.abs(u)<=st?0:Math.asin(e*d/u),t*=d,e=c*u;break;case this.OBLIQ:s=Math.abs(u)<=st?this.lat0:Math.asin(c*this.sinph0+e*d*this.cosph0/u),t*=d*this.cosph0,e=(c-Math.sin(s)*this.sinph0)*u;break;case this.N_POLE:e=-e,s=j-s;break;case this.S_POLE:s-=j;break}i=e===0&&(this.mode===this.EQUIT||this.mode===this.OBLIQ)?0:Math.atan2(t,e)}else{if(l=0,this.mode===this.OBLIQ||this.mode===this.EQUIT){if(t/=this.dd,e*=this.dd,h=Math.sqrt(t*t+e*e),h<st)return n.x=this.long0,n.y=this.lat0,n;a=2*Math.asin(.5*h/this.rq),r=Math.cos(a),t*=a=Math.sin(a),this.mode===this.OBLIQ?(l=r*this.sinb1+e*a*this.cosb1/h,o=this.qp*l,e=h*this.cosb1*r-e*this.sinb1*a):(l=e*a/h,o=this.qp*l,e=h*r)}else if(this.mode===this.N_POLE||this.mode===this.S_POLE){if(this.mode===this.N_POLE&&(e=-e),o=t*t+e*e,!o)return n.x=this.long0,n.y=this.lat0,n;l=1-o/this.qp,this.mode===this.S_POLE&&(l=-l)}i=Math.atan2(t,e),s=Tu(Math.asin(l),this.apa)}return n.x=at(this.long0+i,this.over),n.y=s,n}var N1=["Lambert Azimuthal Equal Area","Lambert_Azimuthal_Equal_Area","laea"];const D1={init:C1,forward:L1,inverse:I1,names:N1,S_POLE:Ko,N_POLE:jo,EQUIT:Zo,OBLIQ:Hr};function $n(n){return Math.abs(n)>1&&(n=n>1?1:-1),Math.asin(n)}function U1(){Math.abs(this.lat1+this.lat2)<st||(this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e3=Math.sqrt(this.es),this.sin_po=Math.sin(this.lat1),this.cos_po=Math.cos(this.lat1),this.t1=this.sin_po,this.con=this.sin_po,this.ms1=vn(this.e3,this.sin_po,this.cos_po),this.qs1=gn(this.e3,this.sin_po),this.sin_po=Math.sin(this.lat2),this.cos_po=Math.cos(this.lat2),this.t2=this.sin_po,this.ms2=vn(this.e3,this.sin_po,this.cos_po),this.qs2=gn(this.e3,this.sin_po),this.sin_po=Math.sin(this.lat0),this.cos_po=Math.cos(this.lat0),this.t3=this.sin_po,this.qs0=gn(this.e3,this.sin_po),Math.abs(this.lat1-this.lat2)>st?this.ns0=(this.ms1*this.ms1-this.ms2*this.ms2)/(this.qs2-this.qs1):this.ns0=this.con,this.c=this.ms1*this.ms1+this.ns0*this.qs1,this.rh=this.a*Math.sqrt(this.c-this.ns0*this.qs0)/this.ns0)}function O1(n){var t=n.x,e=n.y;this.sin_phi=Math.sin(e),this.cos_phi=Math.cos(e);var i=gn(this.e3,this.sin_phi),s=this.a*Math.sqrt(this.c-this.ns0*i)/this.ns0,r=this.ns0*at(t-this.long0,this.over),a=s*Math.sin(r)+this.x0,o=this.rh-s*Math.cos(r)+this.y0;return n.x=a,n.y=o,n}function F1(n){var t,e,i,s,r,a;return n.x-=this.x0,n.y=this.rh-n.y+this.y0,this.ns0>=0?(t=Math.sqrt(n.x*n.x+n.y*n.y),i=1):(t=-Math.sqrt(n.x*n.x+n.y*n.y),i=-1),s=0,t!==0&&(s=Math.atan2(i*n.x,i*n.y)),i=t*this.ns0/this.a,this.sphere?a=Math.asin((this.c-i*i)/(2*this.ns0)):(e=(this.c-i*i)/this.ns0,a=this.phi1z(this.e3,e)),r=at(s/this.ns0+this.long0,this.over),n.x=r,n.y=a,n}function G1(n,t){var e,i,s,r,a,o=$n(.5*t);if(n<st)return o;for(var h=n*n,l=1;l<=25;l++)if(e=Math.sin(o),i=Math.cos(o),s=n*e,r=1-s*s,a=.5*r*r/i*(t/(1-h)-e/r+.5/n*Math.log((1-s)/(1+s))),o=o+a,Math.abs(a)<=1e-7)return o;return null}var B1=["Albers_Conic_Equal_Area","Albers_Equal_Area","Albers","aea"];const z1={init:U1,forward:O1,inverse:F1,names:B1,phi1z:G1};function k1(){this.sin_p14=Math.sin(this.lat0),this.cos_p14=Math.cos(this.lat0),this.infinity_dist=1e3*this.a,this.rc=1}function H1(n){var t,e,i,s,r,a,o,h,l=n.x,c=n.y;return i=at(l-this.long0,this.over),t=Math.sin(c),e=Math.cos(c),s=Math.cos(i),a=this.sin_p14*t+this.cos_p14*e*s,r=1,a>0||Math.abs(a)<=st?(o=this.x0+this.a*r*e*Math.sin(i)/a,h=this.y0+this.a*r*(this.cos_p14*t-this.sin_p14*e*s)/a):(o=this.x0+this.infinity_dist*e*Math.sin(i),h=this.y0+this.infinity_dist*(this.cos_p14*t-this.sin_p14*e*s)),n.x=o,n.y=h,n}function V1(n){var t,e,i,s,r,a;return n.x=(n.x-this.x0)/this.a,n.y=(n.y-this.y0)/this.a,n.x/=this.k0,n.y/=this.k0,(t=Math.sqrt(n.x*n.x+n.y*n.y))?(s=Math.atan2(t,this.rc),e=Math.sin(s),i=Math.cos(s),a=$n(i*this.sin_p14+n.y*e*this.cos_p14/t),r=Math.atan2(n.x*e,t*this.cos_p14*i-n.y*this.sin_p14*e),r=at(this.long0+r,this.over)):(a=this.phic0,r=0),n.x=r,n.y=a,n}var W1=["gnom"];const X1={init:k1,forward:H1,inverse:V1,names:W1};function q1(n,t){var e=1-(1-n*n)/(2*n)*Math.log((1-n)/(1+n));if(Math.abs(Math.abs(t)-e)<1e-6)return t<0?-1*j:j;for(var i=Math.asin(.5*t),s,r,a,o,h=0;h<30;h++)if(r=Math.sin(i),a=Math.cos(i),o=n*r,s=Math.pow(1-o*o,2)/(2*a)*(t/(1-n*n)-r/(1-o*o)+.5/n*Math.log((1-o)/(1+o))),i+=s,Math.abs(s)<=1e-10)return i;return NaN}function Y1(){this.sphere||(this.k0=vn(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts)))}function $1(n){var t=n.x,e=n.y,i,s,r=at(t-this.long0,this.over);if(this.sphere)i=this.x0+this.a*r*Math.cos(this.lat_ts),s=this.y0+this.a*Math.sin(e)/Math.cos(this.lat_ts);else{var a=gn(this.e,Math.sin(e));i=this.x0+this.a*this.k0*r,s=this.y0+this.a*a*.5/this.k0}return n.x=i,n.y=s,n}function K1(n){n.x-=this.x0,n.y-=this.y0;var t,e;return this.sphere?(t=at(this.long0+n.x/this.a/Math.cos(this.lat_ts),this.over),e=Math.asin(n.y/this.a*Math.cos(this.lat_ts))):(e=q1(this.e,2*n.y*this.k0/this.a),t=at(this.long0+n.x/(this.a*this.k0),this.over)),n.x=t,n.y=e,n}var j1=["cea"];const Z1={init:Y1,forward:$1,inverse:K1,names:j1};function J1(){this.x0=this.x0||0,this.y0=this.y0||0,this.lat0=this.lat0||0,this.long0=this.long0||0,this.lat_ts=this.lat_ts||0,this.title=this.title||"Equidistant Cylindrical (Plate Carre)",this.rc=Math.cos(this.lat_ts)}function Q1(n){var t=n.x,e=n.y,i=at(t-this.long0,this.over),s=jn(e-this.lat0);return n.x=this.x0+this.a*i*this.rc,n.y=this.y0+this.a*s,n}function tx(n){var t=n.x,e=n.y;return n.x=at(this.long0+(t-this.x0)/(this.a*this.rc),this.over),n.y=jn(this.lat0+(e-this.y0)/this.a),n}var ex=["Equirectangular","Equidistant_Cylindrical","Equidistant_Cylindrical_Spherical","eqc"];const nx={init:J1,forward:Q1,inverse:tx,names:ex};var oc=20;function ix(){this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=Ys(this.es),this.e1=$s(this.es),this.e2=Ks(this.es),this.e3=js(this.es),this.ml0=this.a*Ie(this.e0,this.e1,this.e2,this.e3,this.lat0)}function sx(n){var t=n.x,e=n.y,i,s,r,a=at(t-this.long0,this.over);if(r=a*Math.sin(e),this.sphere)Math.abs(e)<=st?(i=this.a*a,s=-1*this.a*this.lat0):(i=this.a*Math.sin(r)/Math.tan(e),s=this.a*(jn(e-this.lat0)+(1-Math.cos(r))/Math.tan(e)));else if(Math.abs(e)<=st)i=this.a*a,s=-1*this.ml0;else{var o=Eh(this.a,this.e,Math.sin(e))/Math.tan(e);i=o*Math.sin(r),s=this.a*Ie(this.e0,this.e1,this.e2,this.e3,e)-this.ml0+o*(1-Math.cos(r))}return n.x=i+this.x0,n.y=s+this.y0,n}function rx(n){var t,e,i,s,r,a,o,h,l;if(i=n.x-this.x0,s=n.y-this.y0,this.sphere)if(Math.abs(s+this.a*this.lat0)<=st)t=at(i/this.a+this.long0,this.over),e=0;else{a=this.lat0+s/this.a,o=i*i/this.a/this.a+a*a,h=a;var c;for(r=oc;r;--r)if(c=Math.tan(h),l=-1*(a*(h*c+1)-h-.5*(h*h+o)*c)/((h-a)/c-1),h+=l,Math.abs(l)<=st){e=h;break}t=at(this.long0+Math.asin(i*Math.tan(h)/this.a)/Math.sin(e),this.over)}else if(Math.abs(s+this.ml0)<=st)e=0,t=at(this.long0+i/this.a,this.over);else{a=(this.ml0+s)/this.a,o=i*i/this.a/this.a+a*a,h=a;var u,d,f,_,g;for(r=oc;r;--r)if(g=this.e*Math.sin(h),u=Math.sqrt(1-g*g)*Math.tan(h),d=this.a*Ie(this.e0,this.e1,this.e2,this.e3,h),f=this.e0-2*this.e1*Math.cos(2*h)+4*this.e2*Math.cos(4*h)-6*this.e3*Math.cos(6*h),_=d/this.a,l=(a*(u*_+1)-_-.5*u*(_*_+o))/(this.es*Math.sin(2*h)*(_*_+o-2*a*_)/(4*u)+(a-_)*(u*f-2/Math.sin(2*h))-f),h-=l,Math.abs(l)<=st){e=h;break}u=Math.sqrt(1-this.es*Math.pow(Math.sin(e),2))*Math.tan(e),t=at(this.long0+Math.asin(i*u/this.a)/Math.sin(e),this.over)}return n.x=t,n.y=e,n}var ax=["Polyconic","American_Polyconic","poly"];const ox={init:ix,forward:sx,inverse:rx,names:ax};function hx(){this.A=[],this.A[1]=.6399175073,this.A[2]=-.1358797613,this.A[3]=.063294409,this.A[4]=-.02526853,this.A[5]=.0117879,this.A[6]=-.0055161,this.A[7]=.0026906,this.A[8]=-.001333,this.A[9]=67e-5,this.A[10]=-34e-5,this.B_re=[],this.B_im=[],this.B_re[1]=.7557853228,this.B_im[1]=0,this.B_re[2]=.249204646,this.B_im[2]=.003371507,this.B_re[3]=-.001541739,this.B_im[3]=.04105856,this.B_re[4]=-.10162907,this.B_im[4]=.01727609,this.B_re[5]=-.26623489,this.B_im[5]=-.36249218,this.B_re[6]=-.6870983,this.B_im[6]=-1.1651967,this.C_re=[],this.C_im=[],this.C_re[1]=1.3231270439,this.C_im[1]=0,this.C_re[2]=-.577245789,this.C_im[2]=-.007809598,this.C_re[3]=.508307513,this.C_im[3]=-.112208952,this.C_re[4]=-.15094762,this.C_im[4]=.18200602,this.C_re[5]=1.01418179,this.C_im[5]=1.64497696,this.C_re[6]=1.9660549,this.C_im[6]=2.5127645,this.D=[],this.D[1]=1.5627014243,this.D[2]=.5185406398,this.D[3]=-.03333098,this.D[4]=-.1052906,this.D[5]=-.0368594,this.D[6]=.007317,this.D[7]=.0122,this.D[8]=.00394,this.D[9]=-.0013}function lx(n){var t,e=n.x,i=n.y,s=i-this.lat0,r=e-this.long0,a=s/ws*1e-5,o=r,h=1,l=0;for(t=1;t<=10;t++)h=h*a,l=l+this.A[t]*h;var c=l,u=o,d=1,f=0,_,g,p=0,m=0;for(t=1;t<=6;t++)_=d*c-f*u,g=f*c+d*u,d=_,f=g,p=p+this.B_re[t]*d-this.B_im[t]*f,m=m+this.B_im[t]*d+this.B_re[t]*f;return n.x=m*this.a+this.x0,n.y=p*this.a+this.y0,n}function cx(n){var t,e=n.x,i=n.y,s=e-this.x0,r=i-this.y0,a=r/this.a,o=s/this.a,h=1,l=0,c,u,d=0,f=0;for(t=1;t<=6;t++)c=h*a-l*o,u=l*a+h*o,h=c,l=u,d=d+this.C_re[t]*h-this.C_im[t]*l,f=f+this.C_im[t]*h+this.C_re[t]*l;for(var _=0;_<this.iterations;_++){var g=d,p=f,m,x,v=a,S=o;for(t=2;t<=6;t++)m=g*d-p*f,x=p*d+g*f,g=m,p=x,v=v+(t-1)*(this.B_re[t]*g-this.B_im[t]*p),S=S+(t-1)*(this.B_im[t]*g+this.B_re[t]*p);g=1,p=0;var L=this.B_re[1],b=this.B_im[1];for(t=2;t<=6;t++)m=g*d-p*f,x=p*d+g*f,g=m,p=x,L=L+t*(this.B_re[t]*g-this.B_im[t]*p),b=b+t*(this.B_im[t]*g+this.B_re[t]*p);var w=L*L+b*b;d=(v*L+S*b)/w,f=(S*L-v*b)/w}var C=d,E=f,y=1,P=0;for(t=1;t<=9;t++)y=y*C,P=P+this.D[t]*y;var k=this.lat0+P*ws*1e5,B=this.long0+E;return n.x=B,n.y=k,n}var ux=["New_Zealand_Map_Grid","nzmg"];const fx={init:hx,forward:lx,inverse:cx,names:ux};function dx(){}function px(n){var t=n.x,e=n.y,i=at(t-this.long0,this.over),s=this.x0+this.a*i,r=this.y0+this.a*Math.log(Math.tan(Math.PI/4+e/2.5))*1.25;return n.x=s,n.y=r,n}function mx(n){n.x-=this.x0,n.y-=this.y0;var t=at(this.long0+n.x/this.a,this.over),e=2.5*(Math.atan(Math.exp(.8*n.y/this.a))-Math.PI/4);return n.x=t,n.y=e,n}var _x=["Miller_Cylindrical","mill"];const gx={init:dx,forward:px,inverse:mx,names:_x};var vx=20;function Mx(){this.long0=this.long0||0,this.sphere?(this.n=1,this.m=0,this.es=0,this.C_y=Math.sqrt((this.m+1)/this.n),this.C_x=this.C_y/(this.m+1)):this.en=gh(this.es)}function bu(n){var t,e,i=n.x,s=n.y;if(i=at(i-this.long0,this.over),this.sphere){if(!this.m)s=this.n!==1?Math.asin(this.n*Math.sin(s)):s;else for(var r=this.n*Math.sin(s),a=vx;a;--a){var o=(this.m*s+Math.sin(s)-r)/(this.m+Math.cos(s));if(s-=o,Math.abs(o)<st)break}t=this.a*this.C_x*i*(this.m+Math.cos(s)),e=this.a*this.C_y*s}else{var h=Math.sin(s),l=Math.cos(s);e=this.a*hs(s,h,l,this.en),t=this.a*i*l/Math.sqrt(1-this.es*h*h)}return n.x=t,n.y=e,n}function wu(n){var t,e,i,s;return n.x-=this.x0,i=n.x/this.a,n.y-=this.y0,t=n.y/this.a,this.sphere?(t/=this.C_y,i=i/(this.C_x*(this.m+Math.cos(t))),this.m?t=$n((this.m*t+Math.sin(t))/this.n):this.n!==1&&(t=$n(Math.sin(t)/this.n)),i=at(i+this.long0,this.over),t=jn(t)):(t=vh(n.y/this.a,this.es,this.en),s=Math.abs(t),s<j?(s=Math.sin(t),e=this.long0+n.x*Math.sqrt(1-this.es*s*s)/(this.a*Math.cos(t)),i=at(e,this.over)):s-st<j&&(i=this.long0)),n.x=i,n.y=t,n}var xx=["Sinusoidal","sinu"];const yx={init:Mx,forward:bu,inverse:wu,names:xx};function Sx(){this.sphere=!0,this.b=this.a,this.m=1,this.n=2.5707963267948966,this.es=0,this.C_y=Math.sqrt((this.m+1)/this.n),this.C_x=this.C_y/(this.m+1)}var Ex=bu,Tx=wu,bx=["Eckert_VI","eck6"];const wx={init:Sx,forward:Ex,inverse:Tx,names:bx};function Ax(){this.x0=this.x0!==void 0?this.x0:0,this.y0=this.y0!==void 0?this.y0:0,this.long0=this.long0!==void 0?this.long0:0}function Px(n){for(var t=n.x,e=n.y,i=at(t-this.long0,this.over),s=e,r=Math.PI*Math.sin(e);;){var a=-(s+Math.sin(s)-r)/(1+Math.cos(s));if(s+=a,Math.abs(a)<st)break}s/=2,Math.PI/2-Math.abs(e)<st&&(i=0);var o=.900316316158*this.a*i*Math.cos(s)+this.x0,h=1.4142135623731*this.a*Math.sin(s)+this.y0;return n.x=o,n.y=h,n}function Rx(n){var t,e;n.x-=this.x0,n.y-=this.y0,e=n.y/(1.4142135623731*this.a),Math.abs(e)>.999999999999&&(e=.999999999999),t=Math.asin(e);var i=at(this.long0+n.x/(.900316316158*this.a*Math.cos(t)),this.over);i<-Math.PI&&(i=-Math.PI),i>Math.PI&&(i=Math.PI),e=(2*t+Math.sin(2*t))/Math.PI,Math.abs(e)>1&&(e=1);var s=Math.asin(e);return n.x=i,n.y=s,n}var Cx=["Mollweide","moll"];const Lx={init:Ax,forward:Px,inverse:Rx,names:Cx};function Ix(){Math.abs(this.lat1+this.lat2)<st||(this.lat2=this.lat2||this.lat1,this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=Ys(this.es),this.e1=$s(this.es),this.e2=Ks(this.es),this.e3=js(this.es),this.sin_phi=Math.sin(this.lat1),this.cos_phi=Math.cos(this.lat1),this.ms1=vn(this.e,this.sin_phi,this.cos_phi),this.ml1=Ie(this.e0,this.e1,this.e2,this.e3,this.lat1),Math.abs(this.lat1-this.lat2)<st?this.ns=this.sin_phi:(this.sin_phi=Math.sin(this.lat2),this.cos_phi=Math.cos(this.lat2),this.ms2=vn(this.e,this.sin_phi,this.cos_phi),this.ml2=Ie(this.e0,this.e1,this.e2,this.e3,this.lat2),this.ns=(this.ms1-this.ms2)/(this.ml2-this.ml1)),this.g=this.ml1+this.ms1/this.ns,this.ml0=Ie(this.e0,this.e1,this.e2,this.e3,this.lat0),this.rh=this.a*(this.g-this.ml0))}function Nx(n){var t=n.x,e=n.y,i;if(this.sphere)i=this.a*(this.g-e);else{var s=Ie(this.e0,this.e1,this.e2,this.e3,e);i=this.a*(this.g-s)}var r=this.ns*at(t-this.long0,this.over),a=this.x0+i*Math.sin(r),o=this.y0+this.rh-i*Math.cos(r);return n.x=a,n.y=o,n}function Dx(n){n.x-=this.x0,n.y=this.rh-n.y+this.y0;var t,e,i,s;this.ns>=0?(e=Math.sqrt(n.x*n.x+n.y*n.y),t=1):(e=-Math.sqrt(n.x*n.x+n.y*n.y),t=-1);var r=0;if(e!==0&&(r=Math.atan2(t*n.x,t*n.y)),this.sphere)return s=at(this.long0+r/this.ns,this.over),i=jn(this.g-e/this.a),n.x=s,n.y=i,n;var a=this.g-e/this.a;return i=ea(a,this.e0,this.e1,this.e2,this.e3),s=at(this.long0+r/this.ns,this.over),n.x=s,n.y=i,n}var Ux=["Equidistant_Conic","eqdc"];const Ox={init:Ix,forward:Nx,inverse:Dx,names:Ux};function Fx(){this.R=this.a}function Gx(n){var t=n.x,e=n.y,i=at(t-this.long0,this.over),s,r;Math.abs(e)<=st&&(s=this.x0+this.R*i,r=this.y0);var a=$n(2*Math.abs(e/Math.PI));(Math.abs(i)<=st||Math.abs(Math.abs(e)-j)<=st)&&(s=this.x0,e>=0?r=this.y0+Math.PI*this.R*Math.tan(.5*a):r=this.y0+Math.PI*this.R*-Math.tan(.5*a));var o=.5*Math.abs(Math.PI/i-i/Math.PI),h=o*o,l=Math.sin(a),c=Math.cos(a),u=c/(l+c-1),d=u*u,f=u*(2/l-1),_=f*f,g=Math.PI*this.R*(o*(u-_)+Math.sqrt(h*(u-_)*(u-_)-(_+h)*(d-_)))/(_+h);i<0&&(g=-g),s=this.x0+g;var p=h+u;return g=Math.PI*this.R*(f*p-o*Math.sqrt((_+h)*(h+1)-p*p))/(_+h),e>=0?r=this.y0+g:r=this.y0-g,n.x=s,n.y=r,n}function Bx(n){var t,e,i,s,r,a,o,h,l,c,u,d,f;return n.x-=this.x0,n.y-=this.y0,u=Math.PI*this.R,i=n.x/u,s=n.y/u,r=i*i+s*s,a=-Math.abs(s)*(1+r),o=a-2*s*s+i*i,h=-2*a+1+2*s*s+r*r,f=s*s/h+(2*o*o*o/h/h/h-9*a*o/h/h)/27,l=(a-o*o/3/h)/h,c=2*Math.sqrt(-l/3),u=3*f/l/c,Math.abs(u)>1&&(u>=0?u=1:u=-1),d=Math.acos(u)/3,n.y>=0?e=(-c*Math.cos(d+Math.PI/3)-o/3/h)*Math.PI:e=-(-c*Math.cos(d+Math.PI/3)-o/3/h)*Math.PI,Math.abs(i)<st?t=this.long0:t=at(this.long0+Math.PI*(r-1+Math.sqrt(1+2*(i*i-s*s)+r*r))/2/i,this.over),n.x=t,n.y=e,n}var zx=["Van_der_Grinten_I","VanDerGrinten","Van_der_Grinten","vandg"];const kx={init:Fx,forward:Gx,inverse:Bx,names:zx};function Hx(n,t,e,i,s,r){const a=i-t,o=Math.atan((1-r)*Math.tan(n)),h=Math.atan((1-r)*Math.tan(e)),l=Math.sin(o),c=Math.cos(o),u=Math.sin(h),d=Math.cos(h);let f=a,_,g=100,p,m,x,v,S,L,b,w,C,E,y,P,k,B;do{if(p=Math.sin(f),m=Math.cos(f),x=Math.sqrt(d*p*(d*p)+(c*u-l*d*m)*(c*u-l*d*m)),x===0)return{azi1:0,s12:0};v=l*u+c*d*m,S=Math.atan2(x,v),L=c*d*p/x,b=1-L*L,w=b!==0?v-2*l*u/b:0,C=r/16*b*(4+r*(4-3*b)),_=f,f=a+(1-C)*r*L*(S+C*x*(w+C*v*(-1+2*w*w)))}while(Math.abs(f-_)>1e-12&&--g>0);return g===0?{azi1:NaN,s12:NaN}:(E=b*(s*s-s*(1-r)*(s*(1-r)))/(s*(1-r)*(s*(1-r))),y=1+E/16384*(4096+E*(-768+E*(320-175*E))),P=E/1024*(256+E*(-128+E*(74-47*E))),k=P*x*(w+P/4*(v*(-1+2*w*w)-P/6*w*(-3+4*x*x)*(-3+4*w*w))),B=s*(1-r)*y*(S-k),{azi1:Math.atan2(d*p,c*u-l*d*m),s12:B})}function Vx(n,t,e,i,s,r){const a=Math.atan((1-r)*Math.tan(n)),o=Math.sin(a),h=Math.cos(a),l=Math.sin(e),c=Math.cos(e),u=Math.atan2(o,h*c),d=h*l,f=1-d*d,_=f*(s*s-s*(1-r)*(s*(1-r)))/(s*(1-r)*(s*(1-r))),g=1+_/16384*(4096+_*(-768+_*(320-175*_))),p=_/1024*(256+_*(-128+_*(74-47*_)));let m=i/(s*(1-r)*g),x,v=100,S,L,b,w;do S=Math.cos(2*u+m),L=Math.sin(m),b=Math.cos(m),w=p*L*(S+p/4*(b*(-1+2*S*S)-p/6*S*(-3+4*L*L)*(-3+4*S*S))),x=m,m=i/(s*(1-r)*g)+w;while(Math.abs(m-x)>1e-12&&--v>0);if(v===0)return{lat2:NaN,lon2:NaN};const C=o*L-h*b*c,E=Math.atan2(o*b+h*L*c,(1-r)*Math.sqrt(d*d+C*C)),y=Math.atan2(L*l,h*b-o*L*c),P=r/16*f*(4+r*(4-3*f)),k=y-(1-P)*r*d*(m+P*L*(S+P*b*(-1+2*S*S))),B=t+k;return{lat2:E,lon2:B}}function Wx(){this.sin_p12=Math.sin(this.lat0),this.cos_p12=Math.cos(this.lat0),this.f=this.es/(1+Math.sqrt(1-this.es))}function Xx(n){var t=n.x,e=n.y,i=Math.sin(n.y),s=Math.cos(n.y),r=at(t-this.long0,this.over),a,o,h,l,c,u,d,f,_,g,p;return this.sphere?Math.abs(this.sin_p12-1)<=st?(n.x=this.x0+this.a*(j-e)*Math.sin(r),n.y=this.y0-this.a*(j-e)*Math.cos(r),n):Math.abs(this.sin_p12+1)<=st?(n.x=this.x0+this.a*(j+e)*Math.sin(r),n.y=this.y0+this.a*(j+e)*Math.cos(r),n):(_=this.sin_p12*i+this.cos_p12*s*Math.cos(r),d=Math.acos(_),f=d?d/Math.sin(d):1,n.x=this.x0+this.a*f*s*Math.sin(r),n.y=this.y0+this.a*f*(this.cos_p12*i-this.sin_p12*s*Math.cos(r)),n):(a=Ys(this.es),o=$s(this.es),h=Ks(this.es),l=js(this.es),Math.abs(this.sin_p12-1)<=st?(c=this.a*Ie(a,o,h,l,j),u=this.a*Ie(a,o,h,l,e),n.x=this.x0+(c-u)*Math.sin(r),n.y=this.y0-(c-u)*Math.cos(r),n):Math.abs(this.sin_p12+1)<=st?(c=this.a*Ie(a,o,h,l,j),u=this.a*Ie(a,o,h,l,e),n.x=this.x0+(c+u)*Math.sin(r),n.y=this.y0+(c+u)*Math.cos(r),n):Math.abs(t)<st&&Math.abs(e-this.lat0)<st?(n.x=n.y=0,n):(g=Hx(this.lat0,this.long0,e,t,this.a,this.f),p=g.azi1,n.x=g.s12*Math.sin(p),n.y=g.s12*Math.cos(p),n))}function qx(n){n.x-=this.x0,n.y-=this.y0;var t,e,i,s,r,a,o,h,l,c,u,d,f,_,g,p;return this.sphere?(t=Math.sqrt(n.x*n.x+n.y*n.y),t>2*j*this.a?void 0:(e=t/this.a,i=Math.sin(e),s=Math.cos(e),r=this.long0,Math.abs(t)<=st?a=this.lat0:(a=$n(s*this.sin_p12+n.y*i*this.cos_p12/t),o=Math.abs(this.lat0)-j,Math.abs(o)<=st?this.lat0>=0?r=at(this.long0+Math.atan2(n.x,-n.y),this.over):r=at(this.long0-Math.atan2(-n.x,n.y),this.over):r=at(this.long0+Math.atan2(n.x*i,t*this.cos_p12*s-n.y*this.sin_p12*i),this.over)),n.x=r,n.y=a,n)):(h=Ys(this.es),l=$s(this.es),c=Ks(this.es),u=js(this.es),Math.abs(this.sin_p12-1)<=st?(d=this.a*Ie(h,l,c,u,j),t=Math.sqrt(n.x*n.x+n.y*n.y),f=d-t,a=ea(f/this.a,h,l,c,u),r=at(this.long0+Math.atan2(n.x,-1*n.y),this.over),n.x=r,n.y=a,n):Math.abs(this.sin_p12+1)<=st?(d=this.a*Ie(h,l,c,u,j),t=Math.sqrt(n.x*n.x+n.y*n.y),f=t-d,a=ea(f/this.a,h,l,c,u),r=at(this.long0+Math.atan2(n.x,n.y),this.over),n.x=r,n.y=a,n):(_=Math.atan2(n.x,n.y),g=Math.sqrt(n.x*n.x+n.y*n.y),p=Vx(this.lat0,this.long0,_,g,this.a,this.f),n.x=p.lon2,n.y=p.lat2,n))}var Yx=["Azimuthal_Equidistant","aeqd"];const $x={init:Wx,forward:Xx,inverse:qx,names:Yx};function Kx(){this.sin_p14=Math.sin(this.lat0||0),this.cos_p14=Math.cos(this.lat0||0)}function jx(n){var t,e,i,s,r,a,o,h,l=n.x,c=n.y;return i=at(l-(this.long0||0),this.over),t=Math.sin(c),e=Math.cos(c),s=Math.cos(i),a=this.sin_p14*t+this.cos_p14*e*s,r=1,(a>0||Math.abs(a)<=st)&&(o=this.a*r*e*Math.sin(i),h=(this.y0||0)+this.a*r*(this.cos_p14*t-this.sin_p14*e*s)),n.x=o,n.y=h,n}function Zx(n){var t,e,i,s,r,a,o,h,l;return n.x-=this.x0||0,n.y-=this.y0||0,t=Math.sqrt(n.x*n.x+n.y*n.y),e=$n(t/this.a),i=Math.sin(e),s=Math.cos(e),h=this.long0||0,l=this.lat0||0,a=h,Math.abs(t)<=st?(o=l,n.x=a,n.y=o,n):(o=$n(s*this.sin_p14+n.y*i*this.cos_p14/t),r=Math.abs(l)-j,Math.abs(r)<=st?(l>=0?a=at(h+Math.atan2(n.x,-n.y),this.over):a=at(h-Math.atan2(-n.x,n.y),this.over),n.x=a,n.y=o,n):(a=at(h+Math.atan2(n.x*i,t*this.cos_p14*s-n.y*this.sin_p14*i),this.over),n.x=a,n.y=o,n))}var Jx=["ortho"];const Qx={init:Kx,forward:jx,inverse:Zx,names:Jx};var ne={FRONT:1,RIGHT:2,BACK:3,LEFT:4,TOP:5,BOTTOM:6},Yt={AREA_0:1,AREA_1:2,AREA_2:3,AREA_3:4};function ty(){this.x0=this.x0||0,this.y0=this.y0||0,this.lat0=this.lat0||0,this.long0=this.long0||0,this.lat_ts=this.lat_ts||0,this.title=this.title||"Quadrilateralized Spherical Cube",this.lat0>=j-qt/2?this.face=ne.TOP:this.lat0<=-(j-qt/2)?this.face=ne.BOTTOM:Math.abs(this.long0)<=qt?this.face=ne.FRONT:Math.abs(this.long0)<=j+qt?this.face=this.long0>0?ne.RIGHT:ne.LEFT:this.face=ne.BACK,this.es!==0&&(this.one_minus_f=1-(this.a-this.b)/this.a,this.one_minus_f_squared=this.one_minus_f*this.one_minus_f)}function ey(n){var t={x:0,y:0},e,i,s,r,a,o,h={value:0};if(n.x-=this.long0,this.es!==0?e=Math.atan(this.one_minus_f_squared*Math.tan(n.y)):e=n.y,i=n.x,this.face===ne.TOP)r=j-e,i>=qt&&i<=j+qt?(h.value=Yt.AREA_0,s=i-j):i>j+qt||i<=-(j+qt)?(h.value=Yt.AREA_1,s=i>0?i-le:i+le):i>-(j+qt)&&i<=-qt?(h.value=Yt.AREA_2,s=i+j):(h.value=Yt.AREA_3,s=i);else if(this.face===ne.BOTTOM)r=j+e,i>=qt&&i<=j+qt?(h.value=Yt.AREA_0,s=-i+j):i<qt&&i>=-qt?(h.value=Yt.AREA_1,s=-i):i<-qt&&i>=-(j+qt)?(h.value=Yt.AREA_2,s=-i-j):(h.value=Yt.AREA_3,s=i>0?-i+le:-i-le);else{var l,c,u,d,f,_,g;this.face===ne.RIGHT?i=Qi(i,+j):this.face===ne.BACK?i=Qi(i,+le):this.face===ne.LEFT&&(i=Qi(i,-j)),d=Math.sin(e),f=Math.cos(e),_=Math.sin(i),g=Math.cos(i),l=f*g,c=f*_,u=d,this.face===ne.FRONT?(r=Math.acos(l),s=Lr(r,u,c,h)):this.face===ne.RIGHT?(r=Math.acos(c),s=Lr(r,u,-l,h)):this.face===ne.BACK?(r=Math.acos(-l),s=Lr(r,u,-c,h)):this.face===ne.LEFT?(r=Math.acos(-c),s=Lr(r,u,l,h)):(r=s=0,h.value=Yt.AREA_0)}return o=Math.atan(12/le*(s+Math.acos(Math.sin(s)*Math.cos(qt))-j)),a=Math.sqrt((1-Math.cos(r))/(Math.cos(o)*Math.cos(o))/(1-Math.cos(Math.atan(1/Math.cos(s))))),h.value===Yt.AREA_1?o+=j:h.value===Yt.AREA_2?o+=le:h.value===Yt.AREA_3&&(o+=1.5*le),t.x=a*Math.cos(o),t.y=a*Math.sin(o),t.x=t.x*this.a+this.x0,t.y=t.y*this.a+this.y0,n.x=t.x,n.y=t.y,n}function ny(n){var t={lam:0,phi:0},e,i,s,r,a,o,h,l,c,u={value:0};if(n.x=(n.x-this.x0)/this.a,n.y=(n.y-this.y0)/this.a,i=Math.atan(Math.sqrt(n.x*n.x+n.y*n.y)),e=Math.atan2(n.y,n.x),n.x>=0&&n.x>=Math.abs(n.y)?u.value=Yt.AREA_0:n.y>=0&&n.y>=Math.abs(n.x)?(u.value=Yt.AREA_1,e-=j):n.x<0&&-n.x>=Math.abs(n.y)?(u.value=Yt.AREA_2,e=e<0?e+le:e-le):(u.value=Yt.AREA_3,e+=j),c=le/12*Math.tan(e),a=Math.sin(c)/(Math.cos(c)-1/Math.sqrt(2)),o=Math.atan(a),s=Math.cos(e),r=Math.tan(i),h=1-s*s*r*r*(1-Math.cos(Math.atan(1/Math.cos(o)))),h<-1?h=-1:h>1&&(h=1),this.face===ne.TOP)l=Math.acos(h),t.phi=j-l,u.value===Yt.AREA_0?t.lam=o+j:u.value===Yt.AREA_1?t.lam=o<0?o+le:o-le:u.value===Yt.AREA_2?t.lam=o-j:t.lam=o;else if(this.face===ne.BOTTOM)l=Math.acos(h),t.phi=l-j,u.value===Yt.AREA_0?t.lam=-o+j:u.value===Yt.AREA_1?t.lam=-o:u.value===Yt.AREA_2?t.lam=-o-j:t.lam=o<0?-o-le:-o+le;else{var d,f,_;d=h,c=d*d,c>=1?_=0:_=Math.sqrt(1-c)*Math.sin(o),c+=_*_,c>=1?f=0:f=Math.sqrt(1-c),u.value===Yt.AREA_1?(c=f,f=-_,_=c):u.value===Yt.AREA_2?(f=-f,_=-_):u.value===Yt.AREA_3&&(c=f,f=_,_=-c),this.face===ne.RIGHT?(c=d,d=-f,f=c):this.face===ne.BACK?(d=-d,f=-f):this.face===ne.LEFT&&(c=d,d=f,f=-c),t.phi=Math.acos(-_)-j,t.lam=Math.atan2(f,d),this.face===ne.RIGHT?t.lam=Qi(t.lam,-j):this.face===ne.BACK?t.lam=Qi(t.lam,-le):this.face===ne.LEFT&&(t.lam=Qi(t.lam,+j))}if(this.es!==0){var g,p,m;g=t.phi<0?1:0,p=Math.tan(t.phi),m=this.b/Math.sqrt(p*p+this.one_minus_f_squared),t.phi=Math.atan(Math.sqrt(this.a*this.a-m*m)/(this.one_minus_f*m)),g&&(t.phi=-t.phi)}return t.lam+=this.long0,n.x=t.lam,n.y=t.phi,n}function Lr(n,t,e,i){var s;return n<st?(i.value=Yt.AREA_0,s=0):(s=Math.atan2(t,e),Math.abs(s)<=qt?i.value=Yt.AREA_0:s>qt&&s<=j+qt?(i.value=Yt.AREA_1,s-=j):s>j+qt||s<=-(j+qt)?(i.value=Yt.AREA_2,s=s>=0?s-le:s+le):(i.value=Yt.AREA_3,s+=j)),s}function Qi(n,t){var e=n+t;return e<-le?e+=Fs:e>+le&&(e-=Fs),e}var iy=["Quadrilateralized Spherical Cube","Quadrilateralized_Spherical_Cube","qsc"];const sy={init:ty,forward:ey,inverse:ny,names:iy};var Jo=[[1,22199e-21,-715515e-10,31103e-10],[.9986,-482243e-9,-24897e-9,-13309e-10],[.9954,-83103e-8,-448605e-10,-986701e-12],[.99,-.00135364,-59661e-9,36777e-10],[.9822,-.00167442,-449547e-11,-572411e-11],[.973,-.00214868,-903571e-10,18736e-12],[.96,-.00305085,-900761e-10,164917e-11],[.9427,-.00382792,-653386e-10,-26154e-10],[.9216,-.00467746,-10457e-8,481243e-11],[.8962,-.00536223,-323831e-10,-543432e-11],[.8679,-.00609363,-113898e-9,332484e-11],[.835,-.00698325,-640253e-10,934959e-12],[.7986,-.00755338,-500009e-10,935324e-12],[.7597,-.00798324,-35971e-9,-227626e-11],[.7186,-.00851367,-701149e-10,-86303e-10],[.6732,-.00986209,-199569e-9,191974e-10],[.6213,-.010418,883923e-10,624051e-11],[.5722,-.00906601,182e-6,624051e-11],[.5322,-.00677797,275608e-9,624051e-11]],Ms=[[-520417e-23,.0124,121431e-23,-845284e-16],[.062,.0124,-126793e-14,422642e-15],[.124,.0124,507171e-14,-160604e-14],[.186,.0123999,-190189e-13,600152e-14],[.248,.0124002,710039e-13,-224e-10],[.31,.0123992,-264997e-12,835986e-13],[.372,.0124029,988983e-12,-311994e-12],[.434,.0123893,-369093e-11,-435621e-12],[.4958,.0123198,-102252e-10,-345523e-12],[.5571,.0121916,-154081e-10,-582288e-12],[.6176,.0119938,-241424e-10,-525327e-12],[.6769,.011713,-320223e-10,-516405e-12],[.7346,.0113541,-397684e-10,-609052e-12],[.7903,.0109107,-489042e-10,-104739e-11],[.8435,.0103431,-64615e-9,-140374e-14],[.8936,.00969686,-64636e-9,-8547e-9],[.9394,.00840947,-192841e-9,-42106e-10],[.9761,.00616527,-256e-6,-42106e-10],[1,.00328947,-319159e-9,-42106e-10]],Au=.8487,Pu=1.3523,Ru=Be/5,ry=1/Ru,qi=18,na=function(n,t){return n[0]+t*(n[1]+t*(n[2]+t*n[3]))},ay=function(n,t){return n[1]+t*(2*n[2]+t*3*n[3])};function oy(n,t,e,i){for(var s=t;i;--i){var r=n(s);if(s-=r,Math.abs(r)<e)break}return s}function hy(){this.x0=this.x0||0,this.y0=this.y0||0,this.long0=this.long0||0,this.es=0,this.title=this.title||"Robinson"}function ly(n){var t=at(n.x-this.long0,this.over),e=Math.abs(n.y),i=Math.floor(e*Ru);i<0?i=0:i>=qi&&(i=qi-1),e=Be*(e-ry*i);var s={x:na(Jo[i],e)*t,y:na(Ms[i],e)};return n.y<0&&(s.y=-s.y),s.x=s.x*this.a*Au+this.x0,s.y=s.y*this.a*Pu+this.y0,s}function cy(n){var t={x:(n.x-this.x0)/(this.a*Au),y:Math.abs(n.y-this.y0)/(this.a*Pu)};if(t.y>=1)t.x/=Jo[qi][0],t.y=n.y<0?-j:j;else{var e=Math.floor(t.y*qi);for(e<0?e=0:e>=qi&&(e=qi-1);;)if(Ms[e][0]>t.y)--e;else if(Ms[e+1][0]<=t.y)++e;else break;var i=Ms[e],s=5*(t.y-i[0])/(Ms[e+1][0]-i[0]);s=oy(function(r){return(na(i,r)-t.y)/ay(i,r)},s,st,100),t.x/=na(Jo[e],s),t.y=(5*e+s)*oe,n.y<0&&(t.y=-t.y)}return t.x=at(t.x+this.long0,this.over),t}var uy=["Robinson","robin"];const fy={init:hy,forward:ly,inverse:cy,names:uy};function dy(){this.name="geocent"}function py(n){var t=du(n,this.es,this.a);return t}function my(n){var t=pu(n,this.es,this.a,this.b);return t}var _y=["Geocentric","geocentric","geocent","Geocent"];const gy={init:dy,forward:py,inverse:my,names:_y};var Pe={N_POLE:0,S_POLE:1,EQUIT:2,OBLIQ:3},ms={h:{def:1e5,num:!0},azi:{def:0,num:!0,degrees:!0},tilt:{def:0,num:!0,degrees:!0},long0:{def:0,num:!0},lat0:{def:0,num:!0}};function vy(){if(Object.keys(ms).forEach((function(e){if(typeof this[e]>"u")this[e]=ms[e].def;else{if(ms[e].num&&isNaN(this[e]))throw new Error("Invalid parameter value, must be numeric "+e+" = "+this[e]);ms[e].num&&(this[e]=parseFloat(this[e]))}ms[e].degrees&&(this[e]=this[e]*oe)}).bind(this)),Math.abs(Math.abs(this.lat0)-j)<st?this.mode=this.lat0<0?Pe.S_POLE:Pe.N_POLE:Math.abs(this.lat0)<st?this.mode=Pe.EQUIT:(this.mode=Pe.OBLIQ,this.sinph0=Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0)),this.pn1=this.h/this.a,this.pn1<=0||this.pn1>1e10)throw new Error("Invalid height");this.p=1+this.pn1,this.rp=1/this.p,this.h1=1/this.pn1,this.pfact=(this.p+1)*this.h1,this.es=0;var n=this.tilt,t=this.azi;this.cg=Math.cos(t),this.sg=Math.sin(t),this.cw=Math.cos(n),this.sw=Math.sin(n)}function My(n){n.x-=this.long0;var t=Math.sin(n.y),e=Math.cos(n.y),i=Math.cos(n.x),s,r;switch(this.mode){case Pe.OBLIQ:r=this.sinph0*t+this.cosph0*e*i;break;case Pe.EQUIT:r=e*i;break;case Pe.S_POLE:r=-t;break;case Pe.N_POLE:r=t;break}switch(r=this.pn1/(this.p-r),s=r*e*Math.sin(n.x),this.mode){case Pe.OBLIQ:r*=this.cosph0*t-this.sinph0*e*i;break;case Pe.EQUIT:r*=t;break;case Pe.N_POLE:r*=-(e*i);break;case Pe.S_POLE:r*=e*i;break}var a,o;return a=r*this.cg+s*this.sg,o=1/(a*this.sw*this.h1+this.cw),s=(s*this.cg-r*this.sg)*this.cw*o,r=a*o,n.x=s*this.a,n.y=r*this.a,n}function xy(n){n.x/=this.a,n.y/=this.a;var t={x:n.x,y:n.y},e,i,s;s=1/(this.pn1-n.y*this.sw),e=this.pn1*n.x*s,i=this.pn1*n.y*this.cw*s,n.x=e*this.cg+i*this.sg,n.y=i*this.cg-e*this.sg;var r=Ge(n.x,n.y);if(Math.abs(r)<st)t.x=0,t.y=n.y;else{var a,o;switch(o=1-r*r*this.pfact,o=(this.p-Math.sqrt(o))/(this.pn1/r+r/this.pn1),a=Math.sqrt(1-o*o),this.mode){case Pe.OBLIQ:t.y=Math.asin(a*this.sinph0+n.y*o*this.cosph0/r),n.y=(a-this.sinph0*Math.sin(t.y))*r,n.x*=o*this.cosph0;break;case Pe.EQUIT:t.y=Math.asin(n.y*o/r),n.y=a*r,n.x*=o;break;case Pe.N_POLE:t.y=Math.asin(a),n.y=-n.y;break;case Pe.S_POLE:t.y=-Math.asin(a);break}t.x=Math.atan2(n.x,n.y)}return n.x=t.x+this.long0,n.y=t.y,n}var yy=["Tilted_Perspective","tpers"];const Sy={init:vy,forward:My,inverse:xy,names:yy};function Ey(){if(this.flip_axis=this.sweep==="x"?1:0,this.h=Number(this.h),this.radius_g_1=this.h/this.a,this.radius_g_1<=0||this.radius_g_1>1e10)throw new Error;if(this.radius_g=1+this.radius_g_1,this.C=this.radius_g*this.radius_g-1,this.es!==0){var n=1-this.es,t=1/n;this.radius_p=Math.sqrt(n),this.radius_p2=n,this.radius_p_inv2=t,this.shape="ellipse"}else this.radius_p=1,this.radius_p2=1,this.radius_p_inv2=1,this.shape="sphere";this.title||(this.title="Geostationary Satellite View")}function Ty(n){var t=n.x,e=n.y,i,s,r,a;if(t=t-this.long0,this.shape==="ellipse"){e=Math.atan(this.radius_p2*Math.tan(e));var o=this.radius_p/Ge(this.radius_p*Math.cos(e),Math.sin(e));if(s=o*Math.cos(t)*Math.cos(e),r=o*Math.sin(t)*Math.cos(e),a=o*Math.sin(e),(this.radius_g-s)*s-r*r-a*a*this.radius_p_inv2<0)return n.x=Number.NaN,n.y=Number.NaN,n;i=this.radius_g-s,this.flip_axis?(n.x=this.radius_g_1*Math.atan(r/Ge(a,i)),n.y=this.radius_g_1*Math.atan(a/i)):(n.x=this.radius_g_1*Math.atan(r/i),n.y=this.radius_g_1*Math.atan(a/Ge(r,i)))}else this.shape==="sphere"&&(i=Math.cos(e),s=Math.cos(t)*i,r=Math.sin(t)*i,a=Math.sin(e),i=this.radius_g-s,this.flip_axis?(n.x=this.radius_g_1*Math.atan(r/Ge(a,i)),n.y=this.radius_g_1*Math.atan(a/i)):(n.x=this.radius_g_1*Math.atan(r/i),n.y=this.radius_g_1*Math.atan(a/Ge(r,i))));return n.x=n.x*this.a,n.y=n.y*this.a,n}function by(n){var t=-1,e=0,i=0,s,r,a,o;if(n.x=n.x/this.a,n.y=n.y/this.a,this.shape==="ellipse"){this.flip_axis?(i=Math.tan(n.y/this.radius_g_1),e=Math.tan(n.x/this.radius_g_1)*Ge(1,i)):(e=Math.tan(n.x/this.radius_g_1),i=Math.tan(n.y/this.radius_g_1)*Ge(1,e));var h=i/this.radius_p;if(s=e*e+h*h+t*t,r=2*this.radius_g*t,a=r*r-4*s*this.C,a<0)return n.x=Number.NaN,n.y=Number.NaN,n;o=(-r-Math.sqrt(a))/(2*s),t=this.radius_g+o*t,e*=o,i*=o,n.x=Math.atan2(e,t),n.y=Math.atan(i*Math.cos(n.x)/t),n.y=Math.atan(this.radius_p_inv2*Math.tan(n.y))}else if(this.shape==="sphere"){if(this.flip_axis?(i=Math.tan(n.y/this.radius_g_1),e=Math.tan(n.x/this.radius_g_1)*Math.sqrt(1+i*i)):(e=Math.tan(n.x/this.radius_g_1),i=Math.tan(n.y/this.radius_g_1)*Math.sqrt(1+e*e)),s=e*e+i*i+t*t,r=2*this.radius_g*t,a=r*r-4*s*this.C,a<0)return n.x=Number.NaN,n.y=Number.NaN,n;o=(-r-Math.sqrt(a))/(2*s),t=this.radius_g+o*t,e*=o,i*=o,n.x=Math.atan2(e,t),n.y=Math.atan(i*Math.cos(n.x)/t)}return n.x=n.x+this.long0,n}var wy=["Geostationary Satellite View","Geostationary_Satellite","geos"];const Ay={init:Ey,forward:Ty,inverse:by,names:wy};var As=1.340264,Ps=-.081106,Rs=893e-6,Cs=.003796,ia=Math.sqrt(3)/2;function Py(){this.long0=this.long0!==void 0?this.long0:0,this.x0=this.x0!==void 0?this.x0:0,this.y0=this.y0!==void 0?this.y0:0,this.es!==0&&(this.apa=Eu(this.es),this.qp=gn(this.e,1),this.rqda=Math.sqrt(.5*this.qp))}function Ry(n){var t=at(n.x-this.long0,this.over),e=n.y,i=Math.sin(e);this.es!==0&&(i=gn(this.e,i)/this.qp);var s=Math.asin(ia*i),r=s*s,a=r*r*r;return n.x=t*Math.cos(s)/(ia*(As+3*Ps*r+a*(7*Rs+9*Cs*r))),n.y=s*(As+Ps*r+a*(Rs+Cs*r)),this.es!==0&&(n.x*=this.rqda,n.y*=this.rqda),n.x=this.a*n.x+this.x0,n.y=this.a*n.y+this.y0,n}function Cy(n){n.x=(n.x-this.x0)/this.a,n.y=(n.y-this.y0)/this.a,this.es!==0&&(n.x/=this.rqda,n.y/=this.rqda);var t=1e-9,e=12,i=n.y,s,r,a,o,h,l;for(l=0;l<e&&(s=i*i,r=s*s*s,a=i*(As+Ps*s+r*(Rs+Cs*s))-n.y,o=As+3*Ps*s+r*(7*Rs+9*Cs*s),i-=h=a/o,!(Math.abs(h)<t));++l);return s=i*i,r=s*s*s,n.x=ia*n.x*(As+3*Ps*s+r*(7*Rs+9*Cs*s))/Math.cos(i),n.y=Math.asin(Math.sin(i)/ia),this.es!==0&&(n.y=Tu(n.y,this.apa)),n.x=at(n.x+this.long0,this.over),n}var Ly=["eqearth","Equal Earth","Equal_Earth"];const Iy={init:Py,forward:Ry,inverse:Cy,names:Ly};var zs=1e-10;function Ny(){var n;if(this.phi1=this.lat1,Math.abs(this.phi1)<zs)throw new Error;this.es?(this.en=gh(this.es),this.m1=hs(this.phi1,this.am1=Math.sin(this.phi1),n=Math.cos(this.phi1),this.en),this.am1=n/(Math.sqrt(1-this.es*this.am1*this.am1)*this.am1),this.inverse=Uy,this.forward=Dy):(Math.abs(this.phi1)+zs>=j?this.cphi1=0:this.cphi1=1/Math.tan(this.phi1),this.inverse=Fy,this.forward=Oy)}function Dy(n){var t=at(n.x-(this.long0||0),this.over),e=n.y,i,s,r;return i=this.am1+this.m1-hs(e,s=Math.sin(e),r=Math.cos(e),this.en),s=r*t/(i*Math.sqrt(1-this.es*s*s)),n.x=i*Math.sin(s),n.y=this.am1-i*Math.cos(s),n.x=this.a*n.x+(this.x0||0),n.y=this.a*n.y+(this.y0||0),n}function Uy(n){n.x=(n.x-(this.x0||0))/this.a,n.y=(n.y-(this.y0||0))/this.a;var t,e,i,s;if(e=Ge(n.x,n.y=this.am1-n.y),s=vh(this.am1+this.m1-e,this.es,this.en),(t=Math.abs(s))<j)t=Math.sin(s),i=e*Math.atan2(n.x,n.y)*Math.sqrt(1-this.es*t*t)/Math.cos(s);else if(Math.abs(t-j)<=zs)i=0;else throw new Error;return n.x=at(i+(this.long0||0),this.over),n.y=jn(s),n}function Oy(n){var t=at(n.x-(this.long0||0),this.over),e=n.y,i,s;return s=this.cphi1+this.phi1-e,Math.abs(s)>zs?(n.x=s*Math.sin(i=t*Math.cos(e)/s),n.y=this.cphi1-s*Math.cos(i)):n.x=n.y=0,n.x=this.a*n.x+(this.x0||0),n.y=this.a*n.y+(this.y0||0),n}function Fy(n){n.x=(n.x-(this.x0||0))/this.a,n.y=(n.y-(this.y0||0))/this.a;var t,e,i=Ge(n.x,n.y=this.cphi1-n.y);if(e=this.cphi1+this.phi1-i,Math.abs(e)>j)throw new Error;return Math.abs(Math.abs(e)-j)<=zs?t=0:t=i*Math.atan2(n.x,n.y)/Math.cos(e),n.x=at(t+(this.long0||0),this.over),n.y=jn(e),n}var Gy=["bonne","Bonne (Werner lat_1=90)"];const By={init:Ny,names:Gy},hc={OBLIQUE:{forward:Wy,inverse:qy},TRANSVERSE:{forward:Xy,inverse:Yy}},sa={ROTATE:{o_alpha:"oAlpha",o_lon_c:"oLongC",o_lat_c:"oLatC"},NEW_POLE:{o_lat_p:"oLatP",o_lon_p:"oLongP"},NEW_EQUATOR:{o_lon_1:"oLong1",o_lat_1:"oLat1",o_lon_2:"oLong2",o_lat_2:"oLat2"}};function zy(){if(this.x0=this.x0||0,this.y0=this.y0||0,this.long0=this.long0||0,this.title=this.title||"General Oblique Transformation",this.isIdentity=lu.includes(this.o_proj),!this.o_proj)throw new Error("Missing parameter: o_proj");if(this.o_proj==="ob_tran")throw new Error("Invalid value for o_proj: "+this.o_proj);const n=this.projStr.replace("+proj=ob_tran","").replace("+o_proj=","+proj=").trim(),t=rn(n);if(!t)throw new Error("Invalid parameter: o_proj. Unknown projection "+this.o_proj);t.long0=0,this.obliqueProjection=t;let e;const i=Object.keys(sa),s=o=>{if(typeof this[o]>"u")return;const h=parseFloat(this[o])*oe;if(isNaN(h))throw new Error("Invalid value for "+o+": "+this[o]);return h};for(let o=0;o<i.length;o++){const h=i[o],l=sa[h],c=Object.entries(l);if(c.some(([d])=>typeof this[d]<"u")){e=l;for(let d=0;d<c.length;d++){const[f,_]=c[d],g=s(f);if(typeof g>"u")throw new Error("Missing parameter: "+f+".");this[_]=g}break}}if(!e)throw new Error("No valid parameters provided for ob_tran projection.");const{lamp:r,phip:a}=Vy(this,e);this.lamp=r,Math.abs(a)>st?(this.cphip=Math.cos(a),this.sphip=Math.sin(a),this.projectionType=hc.OBLIQUE):this.projectionType=hc.TRANSVERSE}function ky(n){return this.projectionType.forward(this,n)}function Hy(n){return this.projectionType.inverse(this,n)}function Vy(n,t){let e,i;if(t===sa.ROTATE){let s=n.oLongC,r=n.oLatC,a=n.oAlpha;if(Math.abs(Math.abs(r)-j)<=st)throw new Error("Invalid value for o_lat_c: "+n.o_lat_c+" should be < 90°");i=s+Math.atan2(-1*Math.cos(a),-1*Math.sin(a)*Math.sin(r)),e=Math.asin(Math.cos(r)*Math.sin(a))}else if(t===sa.NEW_POLE)i=n.oLongP,e=n.oLatP;else{let s=n.oLong1,r=n.oLat1,a=n.oLong2,o=n.oLat2,h=Math.abs(r);if(Math.abs(r)>j-st)throw new Error("Invalid value for o_lat_1: "+n.o_lat_1+" should be < 90°");if(Math.abs(o)>j-st)throw new Error("Invalid value for o_lat_2: "+n.o_lat_2+" should be < 90°");if(Math.abs(r-o)<st)throw new Error("Invalid value for o_lat_1 and o_lat_2: o_lat_1 should be different from o_lat_2");if(h<st)throw new Error("Invalid value for o_lat_1: o_lat_1 should be different from zero");i=Math.atan2(Math.cos(r)*Math.sin(o)*Math.cos(s)-Math.sin(r)*Math.cos(o)*Math.cos(a),Math.sin(r)*Math.cos(o)*Math.sin(a)-Math.cos(r)*Math.sin(o)*Math.sin(s)),e=Math.atan(-1*Math.cos(i-s)/Math.tan(r))}return{lamp:i,phip:e}}function Wy(n,t){let{x:e,y:i}=t;e=at(e-n.long0,n.over);const s=Math.cos(e),r=Math.sin(i),a=Math.cos(i);t.x=at(Math.atan2(a*Math.sin(e),n.sphip*a*s+n.cphip*r)+n.lamp),t.y=Math.asin(n.sphip*r-n.cphip*a*s);const o=n.obliqueProjection.forward(t);return n.isIdentity&&(o.x*=Be,o.y*=Be),o}function Xy(n,t){let{x:e,y:i}=t;e=at(e-n.long0,n.over);const s=Math.cos(i),r=Math.cos(e);t.x=at(Math.atan2(s*Math.sin(e),Math.sin(i))+n.lamp),t.y=Math.asin(-1*s*r);const a=n.obliqueProjection.forward(t);return n.isIdentity&&(a.x*=Be,a.y*=Be),a}function qy(n,t){n.isIdentity&&(t.x*=oe,t.y*=oe);const e=n.obliqueProjection.inverse(t);let{x:i,y:s}=e;if(i<Number.MAX_VALUE){i-=n.lamp;const r=Math.cos(i),a=Math.sin(s),o=Math.cos(s);t.x=Math.atan2(o*Math.sin(i),n.sphip*o*r-n.cphip*a),t.y=Math.asin(n.sphip*a+n.cphip*o*r)}return t.x=at(t.x+n.long0),t}function Yy(n,t){n.isIdentity&&(t.x*=oe,t.y*=oe);const e=n.obliqueProjection.inverse(t);let{x:i,y:s}=e;if(i<Number.MAX_VALUE){const r=Math.cos(s);i-=n.lamp,t.x=Math.atan2(r*Math.sin(i),-1*Math.sin(s)),t.y=Math.asin(r*Math.cos(i))}return t.x=at(t.x+n.long0),t}var $y=["General Oblique Transformation","General_Oblique_Transformation","ob_tran"];const Ky={init:zy,forward:ky,inverse:Hy,names:$y};function jy(n){n.Proj.projections.add(zr),n.Proj.projections.add(kr),n.Proj.projections.add(FM),n.Proj.projections.add(qM),n.Proj.projections.add(ZM),n.Proj.projections.add(n1),n.Proj.projections.add(h1),n.Proj.projections.add(d1),n.Proj.projections.add(v1),n.Proj.projections.add(E1),n.Proj.projections.add(D1),n.Proj.projections.add(z1),n.Proj.projections.add(X1),n.Proj.projections.add(Z1),n.Proj.projections.add(nx),n.Proj.projections.add(ox),n.Proj.projections.add(fx),n.Proj.projections.add(gx),n.Proj.projections.add(yx),n.Proj.projections.add(wx),n.Proj.projections.add(Lx),n.Proj.projections.add(Ox),n.Proj.projections.add(kx),n.Proj.projections.add($x),n.Proj.projections.add(Qx),n.Proj.projections.add(sy),n.Proj.projections.add(fy),n.Proj.projections.add(gy),n.Proj.projections.add(Sy),n.Proj.projections.add(Ay),n.Proj.projections.add(Iy),n.Proj.projections.add(By),n.Proj.projections.add(Ky)}const Zy=Object.assign(tM,{defaultDatum:"WGS84",Proj:rn,WGS84:new rn("WGS84"),Point:rs,toPoint:mh,defs:Te,nadgrid:Nv,transform:Qv,mgrs:eM,version:"__VERSION__"});jy(Zy);const Fe=class Fe{constructor(t,e=!0){U(this,"units","meter");U(this,"name");U(this,"centralMeridian");U(this,"falseEasting",5e5);U(this,"falseNorthing");if(t<1||t>60||!Number.isInteger(t))throw new Error(`UTMCRS: invalid zone ${t}, must be integer 1–60`);this.centralMeridian=t*6-183,this.falseNorthing=e?0:1e7,this.name=`UTM_Zone_${t}${e?"N":"S"}`}project(t,e){const i=this.toRadians(t-this.centralMeridian),s=this.toRadians(e),{a:r,e2:a,eP2:o,k0:h}=Fe,l=Math.sin(s),c=Math.cos(s),u=Math.tan(s),d=r/Math.sqrt(1-a*l*l),f=u*u,_=o*c*c,g=i*c,p=Jy(r,a,s),m=this.falseEasting+h*d*(g+(1-f+_)*g*g*g/6+(5-18*f+f*f+72*_-58*o)*g*g*g*g*g/120),x=this.falseNorthing+h*(p+d*u*(g*g/2+(5-f+9*_+4*_*_)*g*g*g*g/24+(61-58*f+f*f+600*_-330*o)*g*g*g*g*g*g/720));return{x:m,y:x}}unproject(t,e){const{a:i,e2:s,eP2:r,k0:a}=Fe,o=(e-this.falseNorthing)/a,h=(1-Math.sqrt(1-s))/(1+Math.sqrt(1-s)),l=o/(i*(1-s/4-3*s*s/64-5*s*s*s/256)),c=Math.sin(2*l),u=Math.sin(4*l),d=Math.sin(6*l),f=Math.sin(8*l),_=h*h,g=_*h,p=g*h,m=l+(3*h/2-27*g/32)*c+(21*_/16-55*p/32)*u+151*g/96*d+1097*p/512*f,x=Math.sin(m),v=Math.cos(m),S=Math.tan(m),L=i/Math.sqrt(1-s*x*x),b=S*S,w=r*v*v,C=(t-this.falseEasting)/(a*L),E=i*(1-s)/Math.pow(1-s*x*x,1.5),y=L*S/E*(C*C/2-(5+3*b+10*w-4*w*w-9*r)*C*C*C*C/24+(61+90*b+298*w+45*b*b-252*r-3*w*w)*C*C*C*C*C*C/720),P=m-y,k=this.toRadians(this.centralMeridian)+(C-(1+2*b+w)*C*C*C/6+(5-2*w+28*b-3*w*w+8*r+24*b*b)*C*C*C*C*C/120)/v;return{lon:this.toDegrees(k),lat:this.toDegrees(P)}}toRadians(t){return t*Math.PI/180}toDegrees(t){return t*180/Math.PI}};U(Fe,"a",6378137),U(Fe,"f",1/298.257223563),U(Fe,"k0",.9996),U(Fe,"e2",2*Fe.f-Fe.f*Fe.f),U(Fe,"eP2",Fe.e2/(1-Fe.e2));let lc=Fe;function Jy(n,t,e){const i=t*t,s=i*t;return n*((1-t/4-3*i/64-5*s/256)*e-(3*t/8+3*i/32+45*s/1024)*Math.sin(2*e)+(15*i/256+45*s/1024)*Math.sin(4*e)-35*s/3072*Math.sin(6*e))}class Cu extends fh{constructor(e,i){super();U(this,"object");U(this,"_disposeFn");this.object=e,this._disposeFn=i}dispose(){this._disposeFn(this.object),this.markDisposed()}}class Lu extends fh{constructor(e,i,s){super();U(this,"id");U(this,"tileKey");U(this,"layerId");U(this,"data");U(this,"renderObjects",[]);U(this,"state");U(this,"createdAt");this.id=e,this.tileKey=i,this.layerId=s,this.state="pending",this.createdAt=performance.now()}dispose(){for(const e of this.renderObjects)e.disposed||e.dispose();this.renderObjects=[],this.markDisposed()}}const oa=class oa{constructor(t){U(this,"baseTileSize");U(this,"name");U(this,"schemeId");this.baseTileSize=t,this.schemeId=`project-${t}`,this.name=`ProjectTileScheme(${t}m)`}tileSizeAtLevel(t){return this.baseTileSize*Math.pow(2,t)}getTilesInView(t,e,i){const s=this.pickLevel(i??0);return this._getTilesAtLevel(t,s)}pickLevel(t){if(t<=0)return 0;const i=t*256,s=Math.round(Math.log2(i/this.baseTileSize));return Math.max(0,Math.min(20,s))}getTileBounds(t){if(t.schemeId!==this.schemeId)throw new Error(`TileKey scheme mismatch: expected "${this.schemeId}", got "${t.schemeId}"`);const[e,i]=this._parseId(t.id),s=this.tileSizeAtLevel(t.level),r=e*s,a=i*s,o=(e+1)*s,h=(i+1)*s;return[r,a,o,h]}getParentKey(t){if(t.level<=0)return null;const[e,i]=this._parseId(t.id);return Zi(this.schemeId,`${Math.floor(e/2)}-${Math.floor(i/2)}`,t.level-1)}getChildKeys(t){const[e,i]=this._parseId(t.id),s=e*2,r=i*2,a=[];for(let o=0;o<2;o++)for(let h=0;h<2;h++)a.push(Zi(this.schemeId,`${s+h}-${r+o}`,t.level+1));return a}snapOrigin(t){const e=this.baseTileSize;return{x:Math.floor(t.x/e)*e,y:Math.floor(t.y/e)*e,z:0}}_getTilesAtLevel(t,e){const i=this.tileSizeAtLevel(e),s=t[0],r=t[1],a=t[2],o=t[3],h=Math.floor(s/i),l=Math.floor(a/i),c=Math.floor(r/i),u=Math.floor(o/i),d=l-h+1,f=u-c+1;if(d*f>oa.MAX_TILES_PER_LAYER)return this._getTilesAtLevel(t,e+1);const _=[];for(let g=c;g<=u;g++)for(let p=h;p<=l;p++)_.push(Zi(this.schemeId,`${p}-${g}`,e));return _}_parseId(t){const e=/^(-?\d+)-(-?\d+)$/.exec(t);if(!e)throw new Error(`Invalid ProjectTileKey id: "${t}"`);return[parseInt(e[1],10),parseInt(e[2],10)]}};U(oa,"MAX_TILES_PER_LAYER",4096);let cc=oa;class gS{constructor(t,e){U(this,"dataType","image");U(this,"crs");U(this,"bounds");U(this,"urlTemplate");U(this,"minZoom");U(this,"maxZoom");U(this,"timeout");this.urlTemplate=t,this.crs=new Os,this.minZoom=(e==null?void 0:e.minZoom)??0,this.maxZoom=(e==null?void 0:e.maxZoom)??18,this.timeout=(e==null?void 0:e.timeout)??15e3;const s=Math.PI*6378137;this.bounds=[-s,-s,s,s]}async fetch(t,e,i){const s=this.buildUrl(t),r=new AbortController,a=setTimeout(()=>r.abort(),this.timeout),o=()=>r.abort();i==null||i.addEventListener("abort",o,{once:!0});try{const h=await fetch(s,{signal:r.signal});if(!h.ok)throw new Error(`XYZTileSource: HTTP ${h.status} for ${s}`);const l=await h.blob();return createImageBitmap(l)}finally{clearTimeout(a),i==null||i.removeEventListener("abort",o)}}dispose(t){t.close()}buildUrl(t){const{z:e,x:i,y:s}=this._parseId(t.id),r=Math.pow(2,e)-1-s;return this.urlTemplate.replace(/\{z\}/g,String(e)).replace(/\{x\}/g,String(i)).replace(/\{-y\}/g,String(r)).replace(/\{y\}/g,String(s))}_parseId(t){const e=t.split("/");if(e.length!==3)throw new Error(`XYZTileSource: invalid tile id "${t}" (expected "z/x/y")`);return{z:parseInt(e[0],10),x:parseInt(e[1],10),y:parseInt(e[2],10)}}}class vS{constructor(t,e){U(this,"dataType","geojson");U(this,"crs");U(this,"bounds");U(this,"_url");U(this,"_features",null);U(this,"_loadPromise",null);this._url=t,this.crs=e,this.bounds=[0,0,0,0]}async fetch(t,e,i){const s=await this._loadAll();return this._clip(s,e)}dispose(t){}async _loadAll(){return this._features?this._features:this._loadPromise?this._loadPromise:(this._loadPromise=(async()=>{const t=await fetch(this._url);if(!t.ok)throw new Error(`GeoJSONSource: HTTP ${t.status} for ${this._url}`);const e=await t.json();if(this._features=this._parse(e),this._features.length>0){let i=1/0,s=1/0,r=-1/0,a=-1/0;for(const o of this._features)o.bbox[0]<i&&(i=o.bbox[0]),o.bbox[1]<s&&(s=o.bbox[1]),o.bbox[2]>r&&(r=o.bbox[2]),o.bbox[3]>a&&(a=o.bbox[3]);this.bounds=[i,s,r,a]}return this._features})(),this._loadPromise)}_parse(t){const e=[];if(t.type==="FeatureCollection")for(const i of t.features??[]){const s=this._parseFeature(i);s&&e.push(s)}else if(t.type==="Feature"){const i=this._parseFeature(t);i&&e.push(i)}return e}_parseFeature(t){if(!t.geometry||!t.geometry.type)return null;const e=t.geometry.type,i=t.geometry.coordinates;if(!i)return null;const s=t.properties??{},r=this._computeBbox(e,i);return{type:e,coordinates:i,properties:s,bbox:r}}_computeBbox(t,e){let i=1/0,s=1/0,r=-1/0,a=-1/0;const o=(h,l)=>{h<i&&(i=h),l<s&&(s=l),h>r&&(r=h),l>a&&(a=l)};if(t==="Point")o(e[0],e[1]);else if(t==="MultiPoint"||t==="LineString")for(const h of e)o(h[0],h[1]);else if(t==="MultiLineString"||t==="Polygon")for(const h of e)for(const l of h)o(l[0],l[1]);else if(t==="MultiPolygon")for(const h of e)for(const l of h)for(const c of l)o(c[0],c[1]);return isFinite(i)?[i,s,r,a]:[0,0,0,0]}_clip(t,e){const[i,s,r,a]=e;return t.filter(o=>{const[h,l,c,u]=o.bbox;return!(c<i||h>r||u<s||l>a)})}}class Qy{constructor(){U(this,"type","simple")}createGeometry(t,e){const[i,s,r,a]=t,o=r-i,h=a-s,l=new Xs(o,h),c=(i+r)/2-e.x,u=(s+a)/2-e.y;return l.translate(c,u,0),l}}class MS{constructor(t={}){U(this,"name");U(this,"quality");this.name=t.name??"raster-renderer",this.quality=t.quality??new Qy}async createContent(t,e,i){const s=new Lu(`raster-${e.key.id}`,e.key,i??"raster-layer"),r=new Ne(t);r.needsUpdate=!0,r.minFilter=Ke,r.magFilter=Ke,r.colorSpace=cn;const a=this.quality.createGeometry(e.bounds,e.origin,e.reprojector,e.key.level),o=new pa({map:r,side:un,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),h=new je(a,o),l=new Cu(h,c=>{const u=c;if(u.geometry.dispose(),Array.isArray(u.material))for(const d of u.material)d.dispose();else u.material.dispose()});return s.renderObjects.push(l),s.data=t,s.state="ready",s}disposeContent(t){for(const e of t.renderObjects){const i=e.object;if(!(i!=null&&i.material))continue;const s=Array.isArray(i.material)?i.material:[i.material];for(const r of s)"map"in r&&r.map&&r.map.dispose()}}}class xS{constructor(t,e="vector-renderer"){U(this,"name");U(this,"_materialFactory");this._materialFactory=t,this.name=e}async createContent(t,e,i){const s=new Lu(`vector-${e.key.id}`,e.key,i??"vector-layer"),r=e.origin.x,a=e.origin.y;for(const o of t){const h=this._createObject(o,r,a);if(!h)continue;const l=new Cu(h,c=>{this._disposeGeometry(c)});s.renderObjects.push(l)}return s.data=t,s.state="ready",s}disposeContent(t){for(const e of t.renderObjects)e.disposed||e.dispose()}_createObject(t,e,i){switch(t.type){case"Point":return this._createPoint(t.coordinates,e,i,this._materialFactory.createPointMaterial(t));case"MultiPoint":return this._createMultiPoint(t.coordinates,e,i,this._materialFactory.createPointMaterial(t));case"LineString":return this._createLine(t.coordinates,e,i,this._materialFactory.createLineMaterial(t));case"MultiLineString":return this._createMultiLine(t.coordinates,e,i,this._materialFactory.createLineMaterial(t));case"Polygon":return this._createPolygon(t.coordinates,e,i,this._materialFactory.createFillMaterial(t));case"MultiPolygon":return this._createMultiPolygon(t.coordinates,e,i,this._materialFactory.createFillMaterial(t));default:return null}}_toLocal(t,e,i){return[t[0]-e,t[1]-i,0]}_createPoint(t,e,i,s){const[r,a,o]=this._toLocal(t,e,i),h=new He;return h.setAttribute("position",new ke([r,a,o],3)),new br(h,s)}_createMultiPoint(t,e,i,s){const r=[];for(const o of t){const[h,l,c]=this._toLocal(o,e,i);r.push(h,l,c)}const a=new He;return a.setAttribute("position",new ke(r,3)),new br(a,s)}_createLine(t,e,i,s){const r=[];for(const o of t){const[h,l,c]=this._toLocal(o,e,i);r.push(h,l,c)}const a=new He;return a.setAttribute("position",new ke(r,3)),new Ka(a,s)}_createMultiLine(t,e,i,s){const r=new ui;for(const a of t){const o=this._createLine(a,e,i,s);r.add(o)}return r}_createPolygon(t,e,i,s){const r=this._ringToShape(t[0],e,i);for(let o=1;o<t.length;o++)r.holes.push(this._ringToPath(t[o],e,i));const a=new uh(r);return new je(a,s)}_createMultiPolygon(t,e,i,s){const r=new ui;for(const a of t){const o=this._createPolygon(a,e,i,s);r.add(o)}return r}_ringToShape(t,e,i){const s=new Qc,[r,a]=this._toLocal(t[0],e,i);s.moveTo(r,a);for(let o=1;o<t.length;o++){const[h,l]=this._toLocal(t[o],e,i);s.lineTo(h,l)}return s.closePath(),s}_ringToPath(t,e,i){const s=new zo,[r,a]=this._toLocal(t[0],e,i);s.moveTo(r,a);for(let o=1;o<t.length;o++){const[h,l]=this._toLocal(t[o],e,i);s.lineTo(h,l)}return s.closePath(),s}_disposeGeometry(t){const e=t;e instanceof br||e instanceof Ka?(e.geometry.dispose(),this._disposeMaterial(e.material)):e instanceof je?(e.geometry.dispose(),this._disposeMaterial(e.material)):e instanceof ui&&e.traverse(i=>{(i instanceof br||i instanceof Ka||i instanceof je)&&(i.geometry.dispose(),this._disposeMaterial(i.material))})}_disposeMaterial(t){if(Array.isArray(t))for(const e of t)e.dispose();else t&&t.dispose()}}class yS{constructor(t){U(this,"_pointMat");U(this,"_lineMat");U(this,"_fillMat");this._pointMat=new $c({color:(t==null?void 0:t.pointColor)??15158332,size:5,sizeAttenuation:!1}),this._lineMat=new Yc({color:(t==null?void 0:t.lineColor)??3066993}),this._fillMat=new pa({color:(t==null?void 0:t.fillColor)??3447003,side:un})}createPointMaterial(t){return this._pointMat}createLineMaterial(t){return this._lineMat}createFillMaterial(t){return this._fillMat}}class Iu{constructor(t=4,e=!1){U(this,"type","subdivided");U(this,"gridSize");U(this,"adaptive");this.gridSize=Math.max(2,Math.min(64,Math.floor(t))),this.adaptive=e}static gridSizeForZoom(t){return t<=1?48:t<=3?32:t<=5?16:t<=8?8:t<=11?4:2}createGeometry(t,e,i,s){const r=this.adaptive&&s!=null?Iu.gridSizeForZoom(s):this.gridSize,[a,o,h,l]=t,c=(h-a)/r,u=(l-o)/r,d=(r+1)*(r+1),f=new Float32Array(d*3),_=new Float32Array(d*2);for(let v=0;v<=r;v++)for(let S=0;S<=r;S++){const L=v*(r+1)+S,b=S/r,w=v/r;let C,E;if(i){const y=i(b,w);C=y.x,E=y.y}else C=a+S*c,E=o+v*u;f[L*3]=C-e.x,f[L*3+1]=E-e.y,f[L*3+2]=0,_[L*2]=b,_[L*2+1]=w}const g=r*r*2,p=new Uint32Array(g*3);let m=0;for(let v=0;v<r;v++)for(let S=0;S<r;S++){const L=v*(r+1)+S,b=L+1,w=L+(r+1),C=w+1;p[m++]=L,p[m++]=b,p[m++]=C,p[m++]=L,p[m++]=C,p[m++]=w}const x=new He;return x.setAttribute("position",new Ze(f,3)),x.setAttribute("uv",new Ze(_,2)),x.setIndex(new Ze(p,1)),x.computeVertexNormals(),x}}const ha=class ha{constructor(t){U(this,"id");U(this,"name");U(this,"type");U(this,"visible");U(this,"opacity");U(this,"zIndex");U(this,"tileScheme");U(this,"dataSource");U(this,"renderer");U(this,"dependsOn");U(this,"_idCounter",0);this.id=t.id??`raster-${++ha._nextId}`,this.name=t.name,this.type=t.type??"raster",this.tileScheme=t.tileScheme,this.dataSource=t.dataSource,this.renderer=t.renderer,this.visible=t.visible??!0,this.opacity=t.opacity??1,this.zIndex=t.zIndex??0,this.dependsOn=t.dependsOn??[]}getVisibleTiles(t,e,i){return this.visible?this.tileScheme.getTilesInView(t,e,i):[]}};U(ha,"_nextId",0);let uc=ha;const la=class la{constructor(t){U(this,"id");U(this,"name");U(this,"type");U(this,"visible");U(this,"opacity");U(this,"zIndex");U(this,"tileScheme");U(this,"dataSource");U(this,"renderer");U(this,"dependsOn");this.id=t.id??`vector-${++la._nextId}`,this.name=t.name,this.type=t.type??"vector",this.tileScheme=t.tileScheme,this.dataSource=t.dataSource,this.renderer=t.renderer,this.visible=t.visible??!0,this.opacity=t.opacity??1,this.zIndex=t.zIndex??0,this.dependsOn=t.dependsOn??[]}getVisibleTiles(t,e,i){if(!this.visible)return[];const s=this.dataSource.bounds;if(!(s[2]>s[0]&&s[3]>s[1]))return this.tileScheme.getTilesInView(t,e,i);const a=[Math.max(t[0],s[0]),Math.max(t[1],s[1]),Math.min(t[2],s[2]),Math.min(t[3],s[3])];return a[2]<=a[0]||a[3]<=a[1]?[]:this.tileScheme.getTilesInView(a,e,i)}};U(la,"_nextId",0);let fc=la;const dc={type:"change"},Th={type:"start"},Nu={type:"end"},Ir=new da,pc=new zn,tS=Math.cos(70*Fo.DEG2RAD),me=new D,Ue=2*Math.PI,Qt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},io=1e-6;class eS extends zg{constructor(t,e=null){super(t,e),this.state=Qt.NONE,this.enabled=!0,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Rn.ROTATE,MIDDLE:Rn.DOLLY,RIGHT:Rn.PAN},this.touches={ONE:zi.ROTATE,TWO:zi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new pi,this._lastTargetPosition=new D,this._quat=new pi().setFromUnitVectors(t.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Gl,this._sphericalDelta=new Gl,this._scale=1,this._panOffset=new D,this._rotateStart=new ct,this._rotateEnd=new ct,this._rotateDelta=new ct,this._panStart=new ct,this._panEnd=new ct,this._panDelta=new ct,this._dollyStart=new ct,this._dollyEnd=new ct,this._dollyDelta=new ct,this._dollyDirection=new D,this._mouse=new ct,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=iS.bind(this),this._onPointerDown=nS.bind(this),this._onPointerUp=sS.bind(this),this._onContextMenu=uS.bind(this),this._onMouseWheel=oS.bind(this),this._onKeyDown=hS.bind(this),this._onTouchStart=lS.bind(this),this._onTouchMove=cS.bind(this),this._onMouseDown=rS.bind(this),this._onMouseMove=aS.bind(this),this._interceptControlDown=fS.bind(this),this._interceptControlUp=dS.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(dc),this.update(),this.state=Qt.NONE}update(t=null){const e=this.object.position;me.copy(e).sub(this.target),me.applyQuaternion(this._quat),this._spherical.setFromVector3(me),this.autoRotate&&this.state===Qt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ue:i>Math.PI&&(i-=Ue),s<-Math.PI?s+=Ue:s>Math.PI&&(s-=Ue),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(me.setFromSpherical(this._spherical),me.applyQuaternion(this._quatInverse),e.copy(this.target).add(me),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=me.length();a=this._clampDistance(o*this._scale);const h=o-a;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),r=!!h}else if(this.object.isOrthographicCamera){const o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=h!==this.object.zoom;const l=new D(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=me.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ir.origin.copy(this.object.position),Ir.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ir.direction))<tS?this.object.lookAt(this.target):(pc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ir.intersectPlane(pc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>io||8*(1-this._lastQuaternion.dot(this.object.quaternion))>io||this._lastTargetPosition.distanceToSquared(this.target)>io?(this.dispatchEvent(dc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ue/60*this.autoRotateSpeed*t:Ue/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){me.setFromMatrixColumn(e,0),me.multiplyScalar(-t),this._panOffset.add(me)}_panUp(t,e){this.screenSpacePanning===!0?me.setFromMatrixColumn(e,1):(me.setFromMatrixColumn(e,0),me.crossVectors(this.object.up,me)),me.multiplyScalar(t),this._panOffset.add(me)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;me.copy(s).sub(this.target);let r=me.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ue*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ue*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ue*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ue*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ct,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function nS(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function iS(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function sS(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Nu),this.state=Qt.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function rS(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Rn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Qt.DOLLY;break;case Rn.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Qt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Qt.ROTATE}break;case Rn.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Qt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Qt.PAN}break;default:this.state=Qt.NONE}this.state!==Qt.NONE&&this.dispatchEvent(Th)}function aS(n){switch(this.state){case Qt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Qt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Qt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function oS(n){this.enabled===!1||this.enableZoom===!1||this.state!==Qt.NONE||(n.preventDefault(),this.dispatchEvent(Th),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Nu))}function hS(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function lS(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case zi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Qt.TOUCH_ROTATE;break;case zi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Qt.TOUCH_PAN;break;default:this.state=Qt.NONE}break;case 2:switch(this.touches.TWO){case zi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Qt.TOUCH_DOLLY_PAN;break;case zi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Qt.TOUCH_DOLLY_ROTATE;break;default:this.state=Qt.NONE}break;default:this.state=Qt.NONE}this.state!==Qt.NONE&&this.dispatchEvent(Th)}function cS(n){switch(this._trackPointer(n),this.state){case Qt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Qt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Qt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Qt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Qt.NONE}}function uS(n){this.enabled!==!1&&n.preventDefault()}function fS(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function dS(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ca=class ca{constructor(t={}){U(this,"camera");U(this,"controls");U(this,"_container",null);U(this,"_resizeObserver",null);U(this,"_userMaxPolar");U(this,"_minPolarAngle");const{center:e={x:0,y:0},distance:i=2e5,maxPolarAngle:s=Math.PI/2.2,minPolarAngle:r=.15,fov:a=60,near:o=50,far:h=1e8}=t;this._userMaxPolar=s,this._minPolarAngle=r,this.camera=new nn(a,1,o,h),this.camera.position.set(e.x,e.y,i),this.camera.lookAt(e.x,e.y,0),this.controls=new eS(this.camera),this.controls.target.set(e.x,e.y,0),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.maxPolarAngle=s,this.controls.minPolarAngle=0,this.controls.mouseButtons={LEFT:Rn.PAN,MIDDLE:Rn.DOLLY,RIGHT:Rn.ROTATE},this.controls.minDistance=100,this.controls.maxDistance=5e7,this.controls.panSpeed=1,this.controls.rotateSpeed=.5,this.controls.zoomSpeed=1.2}get cameraWorldPos(){return{x:this.camera.position.x,y:this.camera.position.y,z:this.camera.position.z}}get extent(){const t=this.controls.target,e=this.camera.position.distanceTo(t),i=Fo.degToRad(this.camera.fov),s=Math.tan(i/2)*e,r=this.camera.aspect,a=s*r,o=ca.MAX_EXTENT_HALF;return[Math.max(t.x-o,t.x-a),Math.max(t.y-o,t.y-s),Math.min(t.x+o,t.x+a),Math.min(t.y+o,t.y+s)]}get resolution(){var r;const t=this.camera.position.distanceTo(this.controls.target),e=Fo.degToRad(this.camera.fov),i=2*Math.tan(e/2)*t,s=((r=this._container)==null?void 0:r.clientHeight)??600;return i/Math.max(s,1)}attach(t){this._container=t,this.controls.domElement=t,this.controls.connect(t),this._resizeObserver=new ResizeObserver(()=>{const e=t.clientWidth,i=t.clientHeight;this.camera.aspect=e/Math.max(i,1),this.camera.updateProjectionMatrix()}),this._resizeObserver.observe(t)}detach(){this.controls.disconnect(),this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._container=null}update(t){const e=this.camera.position.distanceTo(this.controls.target),i=this._userMaxPolar*Math.min(1,Math.sqrt(1e6/Math.max(e,100))),s=Math.max(this._minPolarAngle,Math.min(i,this._userMaxPolar));this.controls.maxPolarAngle=s,this.controls.update()}dispose(){this.detach(),this.controls.dispose()}setCenter(t,e){this.controls.target.set(t,e,0),this.camera.lookAt(t,e,0)}setDistance(t){const e=this.camera.position.clone().sub(this.controls.target).normalize();this.camera.position.copy(this.controls.target.clone().addScaledVector(e,t))}};U(ca,"MAX_EXTENT_HALF",2003750834e-2);let mc=ca;export{He as B,kl as C,yS as D,zl as E,ui as G,Ka as L,je as M,De as O,mc as P,MS as R,_S as S,Lu as T,fc as V,mS as W,Wo as X,gS as a,Iu as b,uc as c,xS as d,vS as e,cc as f,br as g,Os as h,Yc as i,D as j,Xs as k,pa as l,un as m,Kt as n,Cu as o};
