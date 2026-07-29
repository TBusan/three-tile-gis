var Ou=Object.defineProperty;var Fu=(n,t,e)=>t in n?Ou(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var O=(n,t,e)=>Fu(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const nh="168",Cn={ROTATE:0,DOLLY:1,PAN:2},zi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Gu=0,Bh=1,Bu=2,vc=1,zu=2,An=3,qn=0,ze=1,en=2,Wn=0,$i=1,zh=2,kh=3,Hh=4,ku=5,hi=100,Hu=101,Vu=102,Wu=103,Xu=104,qu=200,Yu=201,$u=202,ju=203,ro=204,ao=205,Ku=206,Zu=207,Ju=208,Qu=209,tf=210,ef=211,nf=212,sf=213,rf=214,af=0,of=1,hf=2,Xr=3,lf=4,cf=5,uf=6,ff=7,Mc=0,df=1,pf=2,Xn=0,mf=1,_f=2,gf=3,vf=4,Mf=5,xf=6,yf=7,xc=300,es=301,ns=302,oo=303,ho=304,pa=306,lo=1e3,ci=1001,co=1002,nn=1003,Sf=1004,nr=1005,$e=1006,wa=1007,ui=1008,Ln=1009,yc=1010,Sc=1011,Us=1012,ih=1013,fi=1014,Pn=1015,Ws=1016,sh=1017,rh=1018,is=1020,Ec=35902,wc=1021,bc=1022,fn=1023,Tc=1024,Ac=1025,ji=1026,ss=1027,Pc=1028,ah=1029,Rc=1030,oh=1031,hh=1033,Ur=33776,Or=33777,Fr=33778,Gr=33779,uo=35840,fo=35841,po=35842,mo=35843,_o=36196,go=37492,vo=37496,Mo=37808,xo=37809,yo=37810,So=37811,Eo=37812,wo=37813,bo=37814,To=37815,Ao=37816,Po=37817,Ro=37818,Co=37819,Lo=37820,Io=37821,Br=36492,No=36494,Do=36495,Cc=36283,Uo=36284,Oo=36285,Fo=36286,Ef=3200,wf=3201,bf=0,Tf=1,Hn="",un="srgb",Kn="srgb-linear",lh="display-p3",ma="display-p3-linear",qr="linear",ee="srgb",Yr="rec709",$r="p3",yi=7680,Vh=519,Af=512,Pf=513,Rf=514,Lc=515,Cf=516,Lf=517,If=518,Nf=519,Wh=35044,Xh="300 es",Rn=2e3,jr=2001;class vi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const we=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qh=1234567;const ws=Math.PI/180,Os=180/Math.PI;function Mi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(we[n&255]+we[n>>8&255]+we[n>>16&255]+we[n>>24&255]+"-"+we[t&255]+we[t>>8&255]+"-"+we[t>>16&15|64]+we[t>>24&255]+"-"+we[e&63|128]+we[e>>8&255]+"-"+we[e>>16&255]+we[e>>24&255]+we[i&255]+we[i>>8&255]+we[i>>16&255]+we[i>>24&255]).toLowerCase()}function Me(n,t,e){return Math.max(t,Math.min(e,n))}function ch(n,t){return(n%t+t)%t}function Df(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Uf(n,t,e){return n!==t?(e-n)/(t-n):0}function bs(n,t,e){return(1-e)*n+e*t}function Of(n,t,e,i){return bs(n,t,1-Math.exp(-e*i))}function Ff(n,t=1){return t-Math.abs(ch(n,t*2)-t)}function Gf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Bf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function zf(n,t){return n+Math.floor(Math.random()*(t-n+1))}function kf(n,t){return n+Math.random()*(t-n)}function Hf(n){return n*(.5-Math.random())}function Vf(n){n!==void 0&&(qh=n);let t=qh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Wf(n){return n*ws}function Xf(n){return n*Os}function qf(n){return(n&n-1)===0&&n!==0}function Yf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function $f(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function jf(n,t,e,i,s){const r=Math.cos,a=Math.sin,o=r(e/2),h=a(e/2),l=r((t+i)/2),c=a((t+i)/2),u=r((t-i)/2),d=a((t-i)/2),f=r((i-t)/2),_=a((i-t)/2);switch(s){case"XYX":n.set(o*c,h*u,h*d,o*l);break;case"YZY":n.set(h*d,o*c,h*u,o*l);break;case"ZXZ":n.set(h*u,h*d,o*c,o*l);break;case"XZX":n.set(o*c,h*_,h*f,o*l);break;case"YXY":n.set(h*f,o*c,h*_,o*l);break;case"ZYZ":n.set(h*_,h*f,o*c,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Gi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ce(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Go={DEG2RAD:ws,RAD2DEG:Os,generateUUID:Mi,clamp:Me,euclideanModulo:ch,mapLinear:Df,inverseLerp:Uf,lerp:bs,damp:Of,pingpong:Ff,smoothstep:Gf,smootherstep:Bf,randInt:zf,randFloat:kf,randFloatSpread:Hf,seededRandom:Vf,degToRad:Wf,radToDeg:Xf,isPowerOfTwo:qf,ceilPowerOfTwo:Yf,floorPowerOfTwo:$f,setQuaternionFromProperEuler:jf,normalize:Ce,denormalize:Gi};class mt{constructor(t=0,e=0){mt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Me(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,i,s,r,a,o,h,l){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,h,l)}set(t,e,i,s,r,a,o,h,l){const c=this.elements;return c[0]=t,c[1]=s,c[2]=o,c[3]=e,c[4]=r,c[5]=h,c[6]=i,c[7]=a,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],h=i[6],l=i[1],c=i[4],u=i[7],d=i[2],f=i[5],_=i[8],g=s[0],p=s[3],m=s[6],x=s[1],v=s[4],y=s[7],L=s[2],T=s[5],b=s[8];return r[0]=a*g+o*x+h*L,r[3]=a*p+o*v+h*T,r[6]=a*m+o*y+h*b,r[1]=l*g+c*x+u*L,r[4]=l*p+c*v+u*T,r[7]=l*m+c*y+u*b,r[2]=d*g+f*x+_*L,r[5]=d*p+f*v+_*T,r[8]=d*m+f*y+_*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8];return e*a*c-e*o*l-i*r*c+i*o*h+s*r*l-s*a*h}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8],u=c*a-o*l,d=o*h-c*r,f=l*r-a*h,_=e*u+i*d+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=u*g,t[1]=(s*l-c*i)*g,t[2]=(o*i-s*a)*g,t[3]=d*g,t[4]=(c*e-s*h)*g,t[5]=(s*r-o*e)*g,t[6]=f*g,t[7]=(i*h-l*e)*g,t[8]=(a*e-i*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const h=Math.cos(r),l=Math.sin(r);return this.set(i*h,i*l,-i*(h*a+l*o)+a+t,-s*l,s*h,-s*(-l*a+h*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ba.makeScale(t,e)),this}rotate(t){return this.premultiply(ba.makeRotation(-t)),this}translate(t,e){return this.premultiply(ba.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ba=new Gt;function Ic(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Kr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Kf(){const n=Kr("canvas");return n.style.display="block",n}const Yh={};function Ts(n){n in Yh||(Yh[n]=!0,console.warn(n))}function Zf(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const $h=new Gt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),jh=new Gt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fs={[Kn]:{transfer:qr,primaries:Yr,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[un]:{transfer:ee,primaries:Yr,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ma]:{transfer:qr,primaries:$r,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(jh),fromReference:n=>n.applyMatrix3($h)},[lh]:{transfer:ee,primaries:$r,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(jh),fromReference:n=>n.applyMatrix3($h).convertLinearToSRGB()}},Jf=new Set([Kn,ma]),Kt={enabled:!0,_workingColorSpace:Kn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Jf.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=fs[t].toReference,s=fs[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return fs[n].primaries},getTransfer:function(n){return n===Hn?qr:fs[n].transfer},getLuminanceCoefficients:function(n,t=this._workingColorSpace){return n.fromArray(fs[t].luminanceCoefficients)}};function Ki(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ta(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Si;class Qf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Si===void 0&&(Si=Kr("canvas")),Si.width=t.width,Si.height=t.height;const i=Si.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Si}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Kr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ki(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ki(e[i]/255)*255):e[i]=Ki(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let td=0;class Nc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=Mi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Aa(s[a].image)):r.push(Aa(s[a]))}else r=Aa(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Aa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ed=0;class De extends vi{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,i=ci,s=ci,r=$e,a=ui,o=fn,h=Ln,l=De.DEFAULT_ANISOTROPY,c=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Mi(),this.name="",this.source=new Nc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=h,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==xc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case lo:t.x=t.x-Math.floor(t.x);break;case ci:t.x=t.x<0?0:1;break;case co:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case lo:t.y=t.y-Math.floor(t.y);break;case ci:t.y=t.y<0?0:1;break;case co:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null;De.DEFAULT_MAPPING=xc;De.DEFAULT_ANISOTROPY=1;class xe{constructor(t=0,e=0,i=0,s=1){xe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const h=t.elements,l=h[0],c=h[4],u=h[8],d=h[1],f=h[5],_=h[9],g=h[2],p=h[6],m=h[10];if(Math.abs(c-d)<.01&&Math.abs(u-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(c+d)<.1&&Math.abs(u+g)<.1&&Math.abs(_+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,y=(f+1)/2,L=(m+1)/2,T=(c+d)/4,b=(u+g)/4,C=(_+p)/4;return v>y&&v>L?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=T/i,r=b/i):y>L?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=T/s,r=C/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=b/r,s=C/r),this.set(i,s,r,e),this}let x=Math.sqrt((p-_)*(p-_)+(u-g)*(u-g)+(d-c)*(d-c));return Math.abs(x)<.001&&(x=1),this.x=(p-_)/x,this.y=(u-g)/x,this.z=(d-c)/x,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nd extends vi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new De(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Nc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class di extends nd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Dc extends De{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class id extends De{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pi{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let h=i[s+0],l=i[s+1],c=i[s+2],u=i[s+3];const d=r[a+0],f=r[a+1],_=r[a+2],g=r[a+3];if(o===0){t[e+0]=h,t[e+1]=l,t[e+2]=c,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=_,t[e+3]=g;return}if(u!==g||h!==d||l!==f||c!==_){let p=1-o;const m=h*d+l*f+c*_+u*g,x=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const L=Math.sqrt(v),T=Math.atan2(L,m*x);p=Math.sin(p*T)/L,o=Math.sin(o*T)/L}const y=o*x;if(h=h*p+d*y,l=l*p+f*y,c=c*p+_*y,u=u*p+g*y,p===1-o){const L=1/Math.sqrt(h*h+l*l+c*c+u*u);h*=L,l*=L,c*=L,u*=L}}t[e]=h,t[e+1]=l,t[e+2]=c,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],h=i[s+1],l=i[s+2],c=i[s+3],u=r[a],d=r[a+1],f=r[a+2],_=r[a+3];return t[e]=o*_+c*u+h*f-l*d,t[e+1]=h*_+c*d+l*u-o*f,t[e+2]=l*_+c*f+o*d-h*u,t[e+3]=c*_-o*u-h*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,h=Math.sin,l=o(i/2),c=o(s/2),u=o(r/2),d=h(i/2),f=h(s/2),_=h(r/2);switch(a){case"XYZ":this._x=d*c*u+l*f*_,this._y=l*f*u-d*c*_,this._z=l*c*_+d*f*u,this._w=l*c*u-d*f*_;break;case"YXZ":this._x=d*c*u+l*f*_,this._y=l*f*u-d*c*_,this._z=l*c*_-d*f*u,this._w=l*c*u+d*f*_;break;case"ZXY":this._x=d*c*u-l*f*_,this._y=l*f*u+d*c*_,this._z=l*c*_+d*f*u,this._w=l*c*u-d*f*_;break;case"ZYX":this._x=d*c*u-l*f*_,this._y=l*f*u+d*c*_,this._z=l*c*_-d*f*u,this._w=l*c*u+d*f*_;break;case"YZX":this._x=d*c*u+l*f*_,this._y=l*f*u+d*c*_,this._z=l*c*_-d*f*u,this._w=l*c*u-d*f*_;break;case"XZY":this._x=d*c*u-l*f*_,this._y=l*f*u-d*c*_,this._z=l*c*_+d*f*u,this._w=l*c*u+d*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],h=e[9],l=e[2],c=e[6],u=e[10],d=i+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(c-h)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(i>o&&i>u){const f=2*Math.sqrt(1+i-o-u);this._w=(c-h)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-i-u);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(h+c)/f}else{const f=2*Math.sqrt(1+u-i-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(h+c)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,h=e._y,l=e._z,c=e._w;return this._x=i*c+a*o+s*l-r*h,this._y=s*c+a*h+r*o-i*l,this._z=r*c+a*l+i*h-s*o,this._w=a*c-i*o-s*h-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const h=1-o*o;if(h<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(h),c=Math.atan2(l,o),u=Math.sin((1-e)*c)/l,d=Math.sin(e*c)/l;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,i=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,h=t.w,l=2*(a*s-o*i),c=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+h*l+a*u-o*c,this.y=i+h*c+o*l-r*u,this.z=s+h*u+r*c-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,h=e.z;return this.x=s*h-r*o,this.y=r*a-i*h,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Pa.copy(this).projectOnVector(t),this.sub(Pa)}reflect(t){return this.sub(Pa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Me(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pa=new I,Kh=new pi;class Xs{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,an):an.fromBufferAttribute(r,a),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ir.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ir.copy(i.boundingBox)),ir.applyMatrix4(t.matrixWorld),this.union(ir)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ds),sr.subVectors(this.max,ds),Ei.subVectors(t.a,ds),wi.subVectors(t.b,ds),bi.subVectors(t.c,ds),Un.subVectors(wi,Ei),On.subVectors(bi,wi),Qn.subVectors(Ei,bi);let e=[0,-Un.z,Un.y,0,-On.z,On.y,0,-Qn.z,Qn.y,Un.z,0,-Un.x,On.z,0,-On.x,Qn.z,0,-Qn.x,-Un.y,Un.x,0,-On.y,On.x,0,-Qn.y,Qn.x,0];return!Ra(e,Ei,wi,bi,sr)||(e=[1,0,0,0,1,0,0,0,1],!Ra(e,Ei,wi,bi,sr))?!1:(rr.crossVectors(Un,On),e=[rr.x,rr.y,rr.z],Ra(e,Ei,wi,bi,sr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Sn=[new I,new I,new I,new I,new I,new I,new I,new I],an=new I,ir=new Xs,Ei=new I,wi=new I,bi=new I,Un=new I,On=new I,Qn=new I,ds=new I,sr=new I,rr=new I,ti=new I;function Ra(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){ti.fromArray(n,r);const o=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),h=t.dot(ti),l=e.dot(ti),c=i.dot(ti);if(Math.max(-Math.max(h,l,c),Math.min(h,l,c))>o)return!1}return!0}const sd=new Xs,ps=new I,Ca=new I;class qs{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):sd.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);const e=ps.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ps,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ca.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(Ca)),this.expandByPoint(ps.copy(t.center).sub(Ca))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const En=new I,La=new I,ar=new I,Fn=new I,Ia=new I,or=new I,Na=new I;class _a{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,En)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=En.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(En.copy(this.origin).addScaledVector(this.direction,e),En.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){La.copy(t).add(e).multiplyScalar(.5),ar.copy(e).sub(t).normalize(),Fn.copy(this.origin).sub(La);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ar),o=Fn.dot(this.direction),h=-Fn.dot(ar),l=Fn.lengthSq(),c=Math.abs(1-a*a);let u,d,f,_;if(c>0)if(u=a*h-o,d=a*o-h,_=r*c,u>=0)if(d>=-_)if(d<=_){const g=1/c;u*=g,d*=g,f=u*(u+a*d+2*o)+d*(a*u+d+2*h)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*h)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*h)+l;else d<=-_?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-h),r),f=-u*u+d*(d+2*h)+l):d<=_?(u=0,d=Math.min(Math.max(-r,-h),r),f=d*(d+2*h)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-h),r),f=-u*u+d*(d+2*h)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*h)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(La).addScaledVector(ar,d),f}intersectSphere(t,e){En.subVectors(t.center,this.origin);const i=En.dot(this.direction),s=En.dot(En)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,h=i+a;return h<0?null:o<0?this.at(h,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,h;const l=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),c>=0?(r=(t.min.y-d.y)*c,a=(t.max.y-d.y)*c):(r=(t.max.y-d.y)*c,a=(t.min.y-d.y)*c),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,h=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,h=(t.min.z-d.z)*u),i>h||o>s)||((o>i||i!==i)&&(i=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,En)!==null}intersectTriangle(t,e,i,s,r){Ia.subVectors(e,t),or.subVectors(i,t),Na.crossVectors(Ia,or);let a=this.direction.dot(Na),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Fn.subVectors(this.origin,t);const h=o*this.direction.dot(or.crossVectors(Fn,or));if(h<0)return null;const l=o*this.direction.dot(Ia.cross(Fn));if(l<0||h+l>a)return null;const c=-o*Fn.dot(Na);return c<0?null:this.at(c/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,i,s,r,a,o,h,l,c,u,d,f,_,g,p){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,h,l,c,u,d,f,_,g,p)}set(t,e,i,s,r,a,o,h,l,c,u,d,f,_,g,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=h,m[2]=l,m[6]=c,m[10]=u,m[14]=d,m[3]=f,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Ti.setFromMatrixColumn(t,0).length(),r=1/Ti.setFromMatrixColumn(t,1).length(),a=1/Ti.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),h=Math.cos(s),l=Math.sin(s),c=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*c,f=a*u,_=o*c,g=o*u;e[0]=h*c,e[4]=-h*u,e[8]=l,e[1]=f+_*l,e[5]=d-g*l,e[9]=-o*h,e[2]=g-d*l,e[6]=_+f*l,e[10]=a*h}else if(t.order==="YXZ"){const d=h*c,f=h*u,_=l*c,g=l*u;e[0]=d+g*o,e[4]=_*o-f,e[8]=a*l,e[1]=a*u,e[5]=a*c,e[9]=-o,e[2]=f*o-_,e[6]=g+d*o,e[10]=a*h}else if(t.order==="ZXY"){const d=h*c,f=h*u,_=l*c,g=l*u;e[0]=d-g*o,e[4]=-a*u,e[8]=_+f*o,e[1]=f+_*o,e[5]=a*c,e[9]=g-d*o,e[2]=-a*l,e[6]=o,e[10]=a*h}else if(t.order==="ZYX"){const d=a*c,f=a*u,_=o*c,g=o*u;e[0]=h*c,e[4]=_*l-f,e[8]=d*l+g,e[1]=h*u,e[5]=g*l+d,e[9]=f*l-_,e[2]=-l,e[6]=o*h,e[10]=a*h}else if(t.order==="YZX"){const d=a*h,f=a*l,_=o*h,g=o*l;e[0]=h*c,e[4]=g-d*u,e[8]=_*u+f,e[1]=u,e[5]=a*c,e[9]=-o*c,e[2]=-l*c,e[6]=f*u+_,e[10]=d-g*u}else if(t.order==="XZY"){const d=a*h,f=a*l,_=o*h,g=o*l;e[0]=h*c,e[4]=-u,e[8]=l*c,e[1]=d*u+g,e[5]=a*c,e[9]=f*u-_,e[2]=_*u-f,e[6]=o*c,e[10]=g*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(rd,t,ad)}lookAt(t,e,i){const s=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),Gn.crossVectors(i,Xe),Gn.lengthSq()===0&&(Math.abs(i.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),Gn.crossVectors(i,Xe)),Gn.normalize(),hr.crossVectors(Xe,Gn),s[0]=Gn.x,s[4]=hr.x,s[8]=Xe.x,s[1]=Gn.y,s[5]=hr.y,s[9]=Xe.y,s[2]=Gn.z,s[6]=hr.z,s[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],h=i[8],l=i[12],c=i[1],u=i[5],d=i[9],f=i[13],_=i[2],g=i[6],p=i[10],m=i[14],x=i[3],v=i[7],y=i[11],L=i[15],T=s[0],b=s[4],C=s[8],w=s[12],S=s[1],P=s[5],k=s[9],B=s[13],q=s[2],Y=s[6],W=s[10],j=s[14],H=s[3],rt=s[7],ot=s[11],ct=s[15];return r[0]=a*T+o*S+h*q+l*H,r[4]=a*b+o*P+h*Y+l*rt,r[8]=a*C+o*k+h*W+l*ot,r[12]=a*w+o*B+h*j+l*ct,r[1]=c*T+u*S+d*q+f*H,r[5]=c*b+u*P+d*Y+f*rt,r[9]=c*C+u*k+d*W+f*ot,r[13]=c*w+u*B+d*j+f*ct,r[2]=_*T+g*S+p*q+m*H,r[6]=_*b+g*P+p*Y+m*rt,r[10]=_*C+g*k+p*W+m*ot,r[14]=_*w+g*B+p*j+m*ct,r[3]=x*T+v*S+y*q+L*H,r[7]=x*b+v*P+y*Y+L*rt,r[11]=x*C+v*k+y*W+L*ot,r[15]=x*w+v*B+y*j+L*ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],h=t[9],l=t[13],c=t[2],u=t[6],d=t[10],f=t[14],_=t[3],g=t[7],p=t[11],m=t[15];return _*(+r*h*u-s*l*u-r*o*d+i*l*d+s*o*f-i*h*f)+g*(+e*h*f-e*l*d+r*a*d-s*a*f+s*l*c-r*h*c)+p*(+e*l*u-e*o*f-r*a*u+i*a*f+r*o*c-i*l*c)+m*(-s*o*c-e*h*u+e*o*d+s*a*u-i*a*d+i*h*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8],u=t[9],d=t[10],f=t[11],_=t[12],g=t[13],p=t[14],m=t[15],x=u*p*l-g*d*l+g*h*f-o*p*f-u*h*m+o*d*m,v=_*d*l-c*p*l-_*h*f+a*p*f+c*h*m-a*d*m,y=c*g*l-_*u*l+_*o*f-a*g*f-c*o*m+a*u*m,L=_*u*h-c*g*h-_*o*d+a*g*d+c*o*p-a*u*p,T=e*x+i*v+s*y+r*L;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/T;return t[0]=x*b,t[1]=(g*d*r-u*p*r-g*s*f+i*p*f+u*s*m-i*d*m)*b,t[2]=(o*p*r-g*h*r+g*s*l-i*p*l-o*s*m+i*h*m)*b,t[3]=(u*h*r-o*d*r-u*s*l+i*d*l+o*s*f-i*h*f)*b,t[4]=v*b,t[5]=(c*p*r-_*d*r+_*s*f-e*p*f-c*s*m+e*d*m)*b,t[6]=(_*h*r-a*p*r-_*s*l+e*p*l+a*s*m-e*h*m)*b,t[7]=(a*d*r-c*h*r+c*s*l-e*d*l-a*s*f+e*h*f)*b,t[8]=y*b,t[9]=(_*u*r-c*g*r-_*i*f+e*g*f+c*i*m-e*u*m)*b,t[10]=(a*g*r-_*o*r+_*i*l-e*g*l-a*i*m+e*o*m)*b,t[11]=(c*o*r-a*u*r-c*i*l+e*u*l+a*i*f-e*o*f)*b,t[12]=L*b,t[13]=(c*g*s-_*u*s+_*i*d-e*g*d-c*i*p+e*u*p)*b,t[14]=(_*o*s-a*g*s-_*i*h+e*g*h+a*i*p-e*o*p)*b,t[15]=(a*u*s-c*o*s+c*i*h-e*u*h-a*i*d+e*o*d)*b,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,h=t.z,l=r*a,c=r*o;return this.set(l*a+i,l*o-s*h,l*h+s*o,0,l*o+s*h,c*o+i,c*h-s*a,0,l*h-s*o,c*h+s*a,r*h*h+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,h=e._w,l=r+r,c=a+a,u=o+o,d=r*l,f=r*c,_=r*u,g=a*c,p=a*u,m=o*u,x=h*l,v=h*c,y=h*u,L=i.x,T=i.y,b=i.z;return s[0]=(1-(g+m))*L,s[1]=(f+y)*L,s[2]=(_-v)*L,s[3]=0,s[4]=(f-y)*T,s[5]=(1-(d+m))*T,s[6]=(p+x)*T,s[7]=0,s[8]=(_+v)*b,s[9]=(p-x)*b,s[10]=(1-(d+g))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Ti.set(s[0],s[1],s[2]).length();const a=Ti.set(s[4],s[5],s[6]).length(),o=Ti.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],on.copy(this);const l=1/r,c=1/a,u=1/o;return on.elements[0]*=l,on.elements[1]*=l,on.elements[2]*=l,on.elements[4]*=c,on.elements[5]*=c,on.elements[6]*=c,on.elements[8]*=u,on.elements[9]*=u,on.elements[10]*=u,e.setFromRotationMatrix(on),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=Rn){const h=this.elements,l=2*r/(e-t),c=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s);let f,_;if(o===Rn)f=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===jr)f=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return h[0]=l,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=c,h[9]=d,h[13]=0,h[2]=0,h[6]=0,h[10]=f,h[14]=_,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Rn){const h=this.elements,l=1/(e-t),c=1/(i-s),u=1/(a-r),d=(e+t)*l,f=(i+s)*c;let _,g;if(o===Rn)_=(a+r)*u,g=-2*u;else if(o===jr)_=r*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return h[0]=2*l,h[4]=0,h[8]=0,h[12]=-d,h[1]=0,h[5]=2*c,h[9]=0,h[13]=-f,h[2]=0,h[6]=0,h[10]=g,h[14]=-_,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ti=new I,on=new he,rd=new I(0,0,0),ad=new I(1,1,1),Gn=new I,hr=new I,Xe=new I,Zh=new he,Jh=new pi;class In{constructor(t=0,e=0,i=0,s=In.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],h=s[1],l=s[5],c=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Me(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(h,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Me(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-Me(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Me(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Zh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Zh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Jh.setFromEuler(this),this.setFromQuaternion(Jh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}In.DEFAULT_ORDER="XYZ";class Uc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let od=0;const Qh=new I,Ai=new pi,wn=new he,lr=new I,ms=new I,hd=new I,ld=new pi,tl=new I(1,0,0),el=new I(0,1,0),nl=new I(0,0,1),il={type:"added"},cd={type:"removed"},Pi={type:"childadded",child:null},Da={type:"childremoved",child:null};class Pe extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=Mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new I,e=new In,i=new pi,s=new I(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new Gt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ai.setFromAxisAngle(t,e),this.quaternion.multiply(Ai),this}rotateOnWorldAxis(t,e){return Ai.setFromAxisAngle(t,e),this.quaternion.premultiply(Ai),this}rotateX(t){return this.rotateOnAxis(tl,t)}rotateY(t){return this.rotateOnAxis(el,t)}rotateZ(t){return this.rotateOnAxis(nl,t)}translateOnAxis(t,e){return Qh.copy(t).applyQuaternion(this.quaternion),this.position.add(Qh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(tl,t)}translateY(t){return this.translateOnAxis(el,t)}translateZ(t){return this.translateOnAxis(nl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?lr.copy(t):lr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(ms,lr,this.up):wn.lookAt(lr,ms,this.up),this.quaternion.setFromRotationMatrix(wn),s&&(wn.extractRotation(s.matrixWorld),Ai.setFromRotationMatrix(wn),this.quaternion.premultiply(Ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(il),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(cd),Da.child=t,this.dispatchEvent(Da),Da.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(il),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,hd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,ld,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let l=0,c=h.length;l<c;l++){const u=h[l];r(t.shapes,u)}else r(t.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,l=this.material.length;h<l;h++)o.push(r(t.materials,this.material[h]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(t.animations,h))}}if(e){const o=a(t.geometries),h=a(t.materials),l=a(t.textures),c=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),_=a(t.nodes);o.length>0&&(i.geometries=o),h.length>0&&(i.materials=h),l.length>0&&(i.textures=l),c.length>0&&(i.images=c),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const h=[];for(const l in o){const c=o[l];delete c.metadata,h.push(c)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Pe.DEFAULT_UP=new I(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hn=new I,bn=new I,Ua=new I,Tn=new I,Ri=new I,Ci=new I,sl=new I,Oa=new I,Fa=new I,Ga=new I;class _n{constructor(t=new I,e=new I,i=new I){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),hn.subVectors(t,e),s.cross(hn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){hn.subVectors(s,e),bn.subVectors(i,e),Ua.subVectors(t,e);const a=hn.dot(hn),o=hn.dot(bn),h=hn.dot(Ua),l=bn.dot(bn),c=bn.dot(Ua),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*h-o*c)*d,_=(a*c-o*h)*d;return r.set(1-f-_,_,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(t,e,i,s,r,a,o,h){return this.getBarycoord(t,e,i,s,Tn)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,Tn.x),h.addScaledVector(a,Tn.y),h.addScaledVector(o,Tn.z),h)}static isFrontFacing(t,e,i,s){return hn.subVectors(i,e),bn.subVectors(t,e),hn.cross(bn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return hn.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),hn.cross(bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return _n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return _n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return _n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return _n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return _n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;Ri.subVectors(s,i),Ci.subVectors(r,i),Oa.subVectors(t,i);const h=Ri.dot(Oa),l=Ci.dot(Oa);if(h<=0&&l<=0)return e.copy(i);Fa.subVectors(t,s);const c=Ri.dot(Fa),u=Ci.dot(Fa);if(c>=0&&u<=c)return e.copy(s);const d=h*u-c*l;if(d<=0&&h>=0&&c<=0)return a=h/(h-c),e.copy(i).addScaledVector(Ri,a);Ga.subVectors(t,r);const f=Ri.dot(Ga),_=Ci.dot(Ga);if(_>=0&&f<=_)return e.copy(r);const g=f*l-h*_;if(g<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(i).addScaledVector(Ci,o);const p=c*_-f*u;if(p<=0&&u-c>=0&&f-_>=0)return sl.subVectors(r,s),o=(u-c)/(u-c+(f-_)),e.copy(s).addScaledVector(sl,o);const m=1/(p+g+d);return a=g*m,o=d*m,e.copy(i).addScaledVector(Ri,a).addScaledVector(Ci,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Oc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},cr={h:0,s:0,l:0};function Ba(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Vt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Kt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Kt.workingColorSpace){if(t=ch(t,1),e=Me(e,0,1),i=Me(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Ba(a,r,t+1/3),this.g=Ba(a,r,t),this.b=Ba(a,r,t-1/3)}return Kt.toWorkingColorSpace(this,s),this}setStyle(t,e=un){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=un){const i=Oc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ki(t.r),this.g=Ki(t.g),this.b=Ki(t.b),this}copyLinearToSRGB(t){return this.r=Ta(t.r),this.g=Ta(t.g),this.b=Ta(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=un){return Kt.fromWorkingColorSpace(be.copy(this),t),Math.round(Me(be.r*255,0,255))*65536+Math.round(Me(be.g*255,0,255))*256+Math.round(Me(be.b*255,0,255))}getHexString(t=un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(be.copy(this),e);const i=be.r,s=be.g,r=be.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let h,l;const c=(o+a)/2;if(o===a)h=0,l=0;else{const u=a-o;switch(l=c<=.5?u/(a+o):u/(2-a-o),a){case i:h=(s-r)/u+(s<r?6:0);break;case s:h=(r-i)/u+2;break;case r:h=(i-s)/u+4;break}h/=6}return t.h=h,t.s=l,t.l=c,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(be.copy(this),e),t.r=be.r,t.g=be.g,t.b=be.b,t}getStyle(t=un){Kt.fromWorkingColorSpace(be.copy(this),t);const e=be.r,i=be.g,s=be.b;return t!==un?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Bn),this.setHSL(Bn.h+t,Bn.s+e,Bn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Bn),t.getHSL(cr);const i=bs(Bn.h,cr.h,e),s=bs(Bn.s,cr.s,e),r=bs(Bn.l,cr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const be=new Vt;Vt.NAMES=Oc;let ud=0;class hs extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=Mi(),this.name="",this.type="Material",this.blending=$i,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ro,this.blendDst=ao,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=Xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yi,this.stencilZFail=yi,this.stencilZPass=yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(i.blending=this.blending),this.side!==qn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ro&&(i.blendSrc=this.blendSrc),this.blendDst!==ao&&(i.blendDst=this.blendDst),this.blendEquation!==hi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Xr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==yi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==yi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==yi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ys extends hs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pe=new I,ur=new mt;class je{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Wh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Ts("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ur.fromBufferAttribute(this,e),ur.applyMatrix3(t),this.setXY(e,ur.x,ur.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Gi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ce(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Gi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Gi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Gi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Gi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ce(e,this.array),i=Ce(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ce(e,this.array),i=Ce(i,this.array),s=Ce(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ce(e,this.array),i=Ce(i,this.array),s=Ce(s,this.array),r=Ce(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Wh&&(t.usage=this.usage),t}}class Fc extends je{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Gc extends je{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class ke extends je{constructor(t,e,i){super(new Float32Array(t),e,i)}}let fd=0;const Ze=new he,za=new Pe,Li=new I,qe=new Xs,_s=new Xs,ve=new I;class Re extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Mi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ic(t)?Gc:Fc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Gt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,i){return Ze.makeTranslation(t,e,i),this.applyMatrix4(Ze),this}scale(t,e,i){return Ze.makeScale(t,e,i),this.applyMatrix4(Ze),this}lookAt(t){return za.lookAt(t),za.updateMatrix(),this.applyMatrix4(za.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Li).negate(),this.translate(Li.x,Li.y,Li.z),this}setFromPoints(t){const e=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ke(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];qe.setFromBufferAttribute(r),this.morphTargetsRelative?(ve.addVectors(this.boundingBox.min,qe.min),this.boundingBox.expandByPoint(ve),ve.addVectors(this.boundingBox.max,qe.max),this.boundingBox.expandByPoint(ve)):(this.boundingBox.expandByPoint(qe.min),this.boundingBox.expandByPoint(qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const i=this.boundingSphere.center;if(qe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];_s.setFromBufferAttribute(o),this.morphTargetsRelative?(ve.addVectors(qe.min,_s.min),qe.expandByPoint(ve),ve.addVectors(qe.max,_s.max),qe.expandByPoint(ve)):(qe.expandByPoint(_s.min),qe.expandByPoint(_s.max))}qe.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)ve.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(ve));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],h=this.morphTargetsRelative;for(let l=0,c=o.count;l<c;l++)ve.fromBufferAttribute(o,l),h&&(Li.fromBufferAttribute(t,l),ve.add(Li)),s=Math.max(s,i.distanceToSquared(ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new je(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],h=[];for(let C=0;C<i.count;C++)o[C]=new I,h[C]=new I;const l=new I,c=new I,u=new I,d=new mt,f=new mt,_=new mt,g=new I,p=new I;function m(C,w,S){l.fromBufferAttribute(i,C),c.fromBufferAttribute(i,w),u.fromBufferAttribute(i,S),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,w),_.fromBufferAttribute(r,S),c.sub(l),u.sub(l),f.sub(d),_.sub(d);const P=1/(f.x*_.y-_.x*f.y);isFinite(P)&&(g.copy(c).multiplyScalar(_.y).addScaledVector(u,-f.y).multiplyScalar(P),p.copy(u).multiplyScalar(f.x).addScaledVector(c,-_.x).multiplyScalar(P),o[C].add(g),o[w].add(g),o[S].add(g),h[C].add(p),h[w].add(p),h[S].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let C=0,w=x.length;C<w;++C){const S=x[C],P=S.start,k=S.count;for(let B=P,q=P+k;B<q;B+=3)m(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const v=new I,y=new I,L=new I,T=new I;function b(C){L.fromBufferAttribute(s,C),T.copy(L);const w=o[C];v.copy(w),v.sub(L.multiplyScalar(L.dot(w))).normalize(),y.crossVectors(T,w);const P=y.dot(h[C])<0?-1:1;a.setXYZW(C,v.x,v.y,v.z,P)}for(let C=0,w=x.length;C<w;++C){const S=x[C],P=S.start,k=S.count;for(let B=P,q=P+k;B<q;B+=3)b(t.getX(B+0)),b(t.getX(B+1)),b(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const s=new I,r=new I,a=new I,o=new I,h=new I,l=new I,c=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){const _=t.getX(d+0),g=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,p),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),o.fromBufferAttribute(i,_),h.fromBufferAttribute(i,g),l.fromBufferAttribute(i,p),o.add(c),h.add(c),l.add(c),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,h.x,h.y,h.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),i.setXYZ(d+0,c.x,c.y,c.z),i.setXYZ(d+1,c.x,c.y,c.z),i.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ve.fromBufferAttribute(t,e),ve.normalize(),t.setXYZ(e,ve.x,ve.y,ve.z)}toNonIndexed(){function t(o,h){const l=o.array,c=o.itemSize,u=o.normalized,d=new l.constructor(h.length*c);let f=0,_=0;for(let g=0,p=h.length;g<p;g++){o.isInterleavedBufferAttribute?f=h[g]*o.data.stride+o.offset:f=h[g]*c;for(let m=0;m<c;m++)d[_++]=l[f++]}return new je(d,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Re,i=this.index.array,s=this.attributes;for(const o in s){const h=s[o],l=t(h,i);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const h=[],l=r[o];for(let c=0,u=l.length;c<u;c++){const d=l[c],f=t(d,i);h.push(f)}e.morphAttributes[o]=h}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const l in h)h[l]!==void 0&&(t[l]=h[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const h in i){const l=i[h];t.data.attributes[h]=l.toJSON(t.data)}const s={};let r=!1;for(const h in this.morphAttributes){const l=this.morphAttributes[h],c=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];c.push(f.toJSON(t.data))}c.length>0&&(s[h]=c,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const l in s){const c=s[l];this.setAttribute(l,c.clone(e))}const r=t.morphAttributes;for(const l in r){const c=[],u=r[l];for(let d=0,f=u.length;d<f;d++)c.push(u[d].clone(e));this.morphAttributes[l]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,c=a.length;l<c;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rl=new he,ei=new _a,fr=new qs,al=new I,Ii=new I,Ni=new I,Di=new I,ka=new I,dr=new I,pr=new mt,mr=new mt,_r=new mt,ol=new I,hl=new I,ll=new I,gr=new I,vr=new I;class Ie extends Pe{constructor(t=new Re,e=new Ys){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){dr.set(0,0,0);for(let h=0,l=r.length;h<l;h++){const c=o[h],u=r[h];c!==0&&(ka.fromBufferAttribute(u,t),a?dr.addScaledVector(ka,c):dr.addScaledVector(ka.sub(e),c))}e.add(dr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),fr.copy(i.boundingSphere),fr.applyMatrix4(r),ei.copy(t.ray).recast(t.near),!(fr.containsPoint(ei.origin)===!1&&(ei.intersectSphere(fr,al)===null||ei.origin.distanceToSquared(al)>(t.far-t.near)**2))&&(rl.copy(r).invert(),ei.copy(t.ray).applyMatrix4(rl),!(i.boundingBox!==null&&ei.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ei)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],m=a[p.materialIndex],x=Math.max(p.start,f.start),v=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let y=x,L=v;y<L;y+=3){const T=o.getX(y),b=o.getX(y+1),C=o.getX(y+2);s=Mr(this,m,t,i,l,c,u,T,b,C),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const x=o.getX(p),v=o.getX(p+1),y=o.getX(p+2);s=Mr(this,a,t,i,l,c,u,x,v,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const p=d[_],m=a[p.materialIndex],x=Math.max(p.start,f.start),v=Math.min(h.count,Math.min(p.start+p.count,f.start+f.count));for(let y=x,L=v;y<L;y+=3){const T=y,b=y+1,C=y+2;s=Mr(this,m,t,i,l,c,u,T,b,C),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(h.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const x=p,v=p+1,y=p+2;s=Mr(this,a,t,i,l,c,u,x,v,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function dd(n,t,e,i,s,r,a,o){let h;if(t.side===ze?h=i.intersectTriangle(a,r,s,!0,o):h=i.intersectTriangle(s,r,a,t.side===qn,o),h===null)return null;vr.copy(o),vr.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(vr);return l<e.near||l>e.far?null:{distance:l,point:vr.clone(),object:n}}function Mr(n,t,e,i,s,r,a,o,h,l){n.getVertexPosition(o,Ii),n.getVertexPosition(h,Ni),n.getVertexPosition(l,Di);const c=dd(n,t,e,i,Ii,Ni,Di,gr);if(c){s&&(pr.fromBufferAttribute(s,o),mr.fromBufferAttribute(s,h),_r.fromBufferAttribute(s,l),c.uv=_n.getInterpolation(gr,Ii,Ni,Di,pr,mr,_r,new mt)),r&&(pr.fromBufferAttribute(r,o),mr.fromBufferAttribute(r,h),_r.fromBufferAttribute(r,l),c.uv1=_n.getInterpolation(gr,Ii,Ni,Di,pr,mr,_r,new mt)),a&&(ol.fromBufferAttribute(a,o),hl.fromBufferAttribute(a,h),ll.fromBufferAttribute(a,l),c.normal=_n.getInterpolation(gr,Ii,Ni,Di,ol,hl,ll,new I),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const u={a:o,b:h,c:l,normal:new I,materialIndex:0};_n.getNormal(Ii,Ni,Di,u.normal),c.face=u}return c}class $s extends Re{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],l=[],c=[],u=[];let d=0,f=0;_("z","y","x",-1,-1,i,e,t,a,r,0),_("z","y","x",1,-1,i,e,-t,a,r,1),_("x","z","y",1,1,t,i,e,s,a,2),_("x","z","y",1,-1,t,i,-e,s,a,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(h),this.setAttribute("position",new ke(l,3)),this.setAttribute("normal",new ke(c,3)),this.setAttribute("uv",new ke(u,2));function _(g,p,m,x,v,y,L,T,b,C,w){const S=y/b,P=L/C,k=y/2,B=L/2,q=T/2,Y=b+1,W=C+1;let j=0,H=0;const rt=new I;for(let ot=0;ot<W;ot++){const ct=ot*P-B;for(let wt=0;wt<Y;wt++){const Dt=wt*S-k;rt[g]=Dt*x,rt[p]=ct*v,rt[m]=q,l.push(rt.x,rt.y,rt.z),rt[g]=0,rt[p]=0,rt[m]=T>0?1:-1,c.push(rt.x,rt.y,rt.z),u.push(wt/b),u.push(1-ot/C),j+=1}}for(let ot=0;ot<C;ot++)for(let ct=0;ct<b;ct++){const wt=d+ct+Y*ot,Dt=d+ct+Y*(ot+1),V=d+(ct+1)+Y*(ot+1),tt=d+(ct+1)+Y*ot;h.push(wt,Dt,tt),h.push(Dt,V,tt),H+=6}o.addGroup(f,H,w),f+=H,d+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function rs(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Le(n){const t={};for(let e=0;e<n.length;e++){const i=rs(n[e]);for(const s in i)t[s]=i[s]}return t}function pd(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Bc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const md={clone:rs,merge:Le};var _d=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yn extends hs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_d,this.fragmentShader=gd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=rs(t.uniforms),this.uniformsGroups=pd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class zc extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=Rn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zn=new I,cl=new mt,ul=new mt;class tn extends zc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Os*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ws*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Os*2*Math.atan(Math.tan(ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zn.x,zn.y).multiplyScalar(-t/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(zn.x,zn.y).multiplyScalar(-t/zn.z)}getViewSize(t,e){return this.getViewBounds(t,cl,ul),e.subVectors(ul,cl)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ws*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/h,e-=a.offsetY*i/l,s*=a.width/h,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ui=-90,Oi=1;class vd extends Pe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new tn(Ui,Oi,t,e);s.layers=this.layers,this.add(s);const r=new tn(Ui,Oi,t,e);r.layers=this.layers,this.add(r);const a=new tn(Ui,Oi,t,e);a.layers=this.layers,this.add(a);const o=new tn(Ui,Oi,t,e);o.layers=this.layers,this.add(o);const h=new tn(Ui,Oi,t,e);h.layers=this.layers,this.add(h);const l=new tn(Ui,Oi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,h]=e;for(const l of e)this.remove(l);if(t===Rn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(t===jr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,l,c]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,h),t.setRenderTarget(i,4,s),t.render(e,l),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(e,c),t.setRenderTarget(u,d,f),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class kc extends De{constructor(t,e,i,s,r,a,o,h,l,c){t=t!==void 0?t:[],e=e!==void 0?e:es,super(t,e,i,s,r,a,o,h,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Md extends di{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new kc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:$e}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new $s(5,5,5),r=new Yn({name:"CubemapFromEquirect",uniforms:rs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ze,blending:Wn});r.uniforms.tEquirect.value=e;const a=new Ie(s,r),o=e.minFilter;return e.minFilter===ui&&(e.minFilter=$e),new vd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}const Ha=new I,xd=new I,yd=new Gt;class kn{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Ha.subVectors(i,e).cross(xd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ha),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||yd.getNormalMatrix(t),s=this.coplanarPoint(Ha).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new qs,xr=new I;class Hc{constructor(t=new kn,e=new kn,i=new kn,s=new kn,r=new kn,a=new kn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Rn){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],h=s[3],l=s[4],c=s[5],u=s[6],d=s[7],f=s[8],_=s[9],g=s[10],p=s[11],m=s[12],x=s[13],v=s[14],y=s[15];if(i[0].setComponents(h-r,d-l,p-f,y-m).normalize(),i[1].setComponents(h+r,d+l,p+f,y+m).normalize(),i[2].setComponents(h+a,d+c,p+_,y+x).normalize(),i[3].setComponents(h-a,d-c,p-_,y-x).normalize(),i[4].setComponents(h-o,d-u,p-g,y-v).normalize(),e===Rn)i[5].setComponents(h+o,d+u,p+g,y+v).normalize();else if(e===jr)i[5].setComponents(o,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(t){return ni.center.set(0,0,0),ni.radius=.7071067811865476,ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(xr.x=s.normal.x>0?t.max.x:t.min.x,xr.y=s.normal.y>0?t.max.y:t.min.y,xr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(xr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Vc(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Sd(n){const t=new WeakMap;function e(o,h){const l=o.array,c=o.usage,u=l.byteLength,d=n.createBuffer();n.bindBuffer(h,d),n.bufferData(h,l,c),o.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,h,l){const c=h.array,u=h._updateRange,d=h.updateRanges;if(n.bindBuffer(l,o),u.count===-1&&d.length===0&&n.bufferSubData(l,0,c),d.length!==0){for(let f=0,_=d.length;f<_;f++){const g=d[f];n.bufferSubData(l,g.start*c.BYTES_PER_ELEMENT,c,g.start,g.count)}h.clearUpdateRanges()}u.count!==-1&&(n.bufferSubData(l,u.offset*c.BYTES_PER_ELEMENT,c,u.offset,u.count),u.count=-1),h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=t.get(o);h&&(n.deleteBuffer(h.buffer),t.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,h));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,h),l.version=o.version}}return{get:s,remove:r,update:a}}class ls extends Re{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),h=Math.floor(s),l=o+1,c=h+1,u=t/o,d=e/h,f=[],_=[],g=[],p=[];for(let m=0;m<c;m++){const x=m*d-a;for(let v=0;v<l;v++){const y=v*u-r;_.push(y,-x,0),g.push(0,0,1),p.push(v/o),p.push(1-m/h)}}for(let m=0;m<h;m++)for(let x=0;x<o;x++){const v=x+l*m,y=x+l*(m+1),L=x+1+l*(m+1),T=x+1+l*m;f.push(v,y,T),f.push(y,L,T)}this.setIndex(f),this.setAttribute("position",new ke(_,3)),this.setAttribute("normal",new ke(g,3)),this.setAttribute("uv",new ke(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ls(t.width,t.height,t.widthSegments,t.heightSegments)}}var Ed=`#ifdef USE_ALPHAHASH
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
#endif`,bd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Td=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ad=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rd=`#ifdef USE_AOMAP
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
#endif`,Cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ld=`#ifdef USE_BATCHING
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
#endif`,Id=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Nd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ud=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Od=`#ifdef USE_IRIDESCENCE
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
#endif`,Fd=`#ifdef USE_BUMPMAP
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
#endif`,Gd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Xd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,qd=`#define PI 3.141592653589793
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
} // validated`,Yd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$d=`vec3 transformedNormal = objectNormal;
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
#endif`,jd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qd="gl_FragColor = linearToOutputTexel( gl_FragColor );",tp=`
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
}`,ep=`#ifdef USE_ENVMAP
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
#endif`,np=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ip=`#ifdef USE_ENVMAP
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
#endif`,sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rp=`#ifdef USE_ENVMAP
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
#endif`,ap=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,op=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cp=`#ifdef USE_GRADIENTMAP
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
}`,up=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pp=`uniform bool receiveShadow;
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
#endif`,mp=`#ifdef USE_ENVMAP
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
#endif`,_p=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Mp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xp=`PhysicalMaterial material;
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
#endif`,yp=`struct PhysicalMaterial {
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
}`,Sp=`
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
#endif`,Ep=`#if defined( RE_IndirectDiffuse )
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
#endif`,bp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ip=`#if defined( USE_POINTS_UV )
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
#endif`,Np=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Up=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Op=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gp=`#ifdef USE_MORPHTARGETS
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
#endif`,Bp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xp=`#ifdef USE_NORMALMAP
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
#endif`,qp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$p=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Jp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,em=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,im=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,am=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,om=`float getShadowMask() {
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
}`,hm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lm=`#ifdef USE_SKINNING
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
#endif`,cm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,um=`#ifdef USE_SKINNING
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
#endif`,fm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,_m=`#ifdef USE_TRANSMISSION
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
#endif`,gm=`#ifdef USE_TRANSMISSION
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
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ym=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Em=`uniform sampler2D t2D;
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
}`,bm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Am=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pm=`#include <common>
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
}`,Rm=`#if DEPTH_PACKING == 3200
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
}`,Cm=`#define DISTANCE
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
}`,Lm=`#define DISTANCE
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
}`,Im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dm=`uniform float scale;
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
}`,Um=`uniform vec3 diffuse;
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
}`,Om=`#include <common>
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
}`,Fm=`uniform vec3 diffuse;
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
}`,Gm=`#define LAMBERT
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
}`,Bm=`#define LAMBERT
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
}`,zm=`#define MATCAP
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
}`,km=`#define MATCAP
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
}`,Hm=`#define NORMAL
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
}`,Vm=`#define NORMAL
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
}`,Wm=`#define PHONG
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
}`,Xm=`#define PHONG
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
}`,qm=`#define STANDARD
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
}`,Ym=`#define STANDARD
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
}`,$m=`#define TOON
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
}`,jm=`#define TOON
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
}`,Km=`uniform float size;
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
}`,Zm=`uniform vec3 diffuse;
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
}`,Jm=`#include <common>
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
}`,Qm=`uniform vec3 color;
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
}`,t0=`uniform float rotation;
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
}`,e0=`uniform vec3 diffuse;
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
}`,Ft={alphahash_fragment:Ed,alphahash_pars_fragment:wd,alphamap_fragment:bd,alphamap_pars_fragment:Td,alphatest_fragment:Ad,alphatest_pars_fragment:Pd,aomap_fragment:Rd,aomap_pars_fragment:Cd,batching_pars_vertex:Ld,batching_vertex:Id,begin_vertex:Nd,beginnormal_vertex:Dd,bsdfs:Ud,iridescence_fragment:Od,bumpmap_pars_fragment:Fd,clipping_planes_fragment:Gd,clipping_planes_pars_fragment:Bd,clipping_planes_pars_vertex:zd,clipping_planes_vertex:kd,color_fragment:Hd,color_pars_fragment:Vd,color_pars_vertex:Wd,color_vertex:Xd,common:qd,cube_uv_reflection_fragment:Yd,defaultnormal_vertex:$d,displacementmap_pars_vertex:jd,displacementmap_vertex:Kd,emissivemap_fragment:Zd,emissivemap_pars_fragment:Jd,colorspace_fragment:Qd,colorspace_pars_fragment:tp,envmap_fragment:ep,envmap_common_pars_fragment:np,envmap_pars_fragment:ip,envmap_pars_vertex:sp,envmap_physical_pars_fragment:mp,envmap_vertex:rp,fog_vertex:ap,fog_pars_vertex:op,fog_fragment:hp,fog_pars_fragment:lp,gradientmap_pars_fragment:cp,lightmap_pars_fragment:up,lights_lambert_fragment:fp,lights_lambert_pars_fragment:dp,lights_pars_begin:pp,lights_toon_fragment:_p,lights_toon_pars_fragment:gp,lights_phong_fragment:vp,lights_phong_pars_fragment:Mp,lights_physical_fragment:xp,lights_physical_pars_fragment:yp,lights_fragment_begin:Sp,lights_fragment_maps:Ep,lights_fragment_end:wp,logdepthbuf_fragment:bp,logdepthbuf_pars_fragment:Tp,logdepthbuf_pars_vertex:Ap,logdepthbuf_vertex:Pp,map_fragment:Rp,map_pars_fragment:Cp,map_particle_fragment:Lp,map_particle_pars_fragment:Ip,metalnessmap_fragment:Np,metalnessmap_pars_fragment:Dp,morphinstance_vertex:Up,morphcolor_vertex:Op,morphnormal_vertex:Fp,morphtarget_pars_vertex:Gp,morphtarget_vertex:Bp,normal_fragment_begin:zp,normal_fragment_maps:kp,normal_pars_fragment:Hp,normal_pars_vertex:Vp,normal_vertex:Wp,normalmap_pars_fragment:Xp,clearcoat_normal_fragment_begin:qp,clearcoat_normal_fragment_maps:Yp,clearcoat_pars_fragment:$p,iridescence_pars_fragment:jp,opaque_fragment:Kp,packing:Zp,premultiplied_alpha_fragment:Jp,project_vertex:Qp,dithering_fragment:tm,dithering_pars_fragment:em,roughnessmap_fragment:nm,roughnessmap_pars_fragment:im,shadowmap_pars_fragment:sm,shadowmap_pars_vertex:rm,shadowmap_vertex:am,shadowmask_pars_fragment:om,skinbase_vertex:hm,skinning_pars_vertex:lm,skinning_vertex:cm,skinnormal_vertex:um,specularmap_fragment:fm,specularmap_pars_fragment:dm,tonemapping_fragment:pm,tonemapping_pars_fragment:mm,transmission_fragment:_m,transmission_pars_fragment:gm,uv_pars_fragment:vm,uv_pars_vertex:Mm,uv_vertex:xm,worldpos_vertex:ym,background_vert:Sm,background_frag:Em,backgroundCube_vert:wm,backgroundCube_frag:bm,cube_vert:Tm,cube_frag:Am,depth_vert:Pm,depth_frag:Rm,distanceRGBA_vert:Cm,distanceRGBA_frag:Lm,equirect_vert:Im,equirect_frag:Nm,linedashed_vert:Dm,linedashed_frag:Um,meshbasic_vert:Om,meshbasic_frag:Fm,meshlambert_vert:Gm,meshlambert_frag:Bm,meshmatcap_vert:zm,meshmatcap_frag:km,meshnormal_vert:Hm,meshnormal_frag:Vm,meshphong_vert:Wm,meshphong_frag:Xm,meshphysical_vert:qm,meshphysical_frag:Ym,meshtoon_vert:$m,meshtoon_frag:jm,points_vert:Km,points_frag:Zm,shadow_vert:Jm,shadow_frag:Qm,sprite_vert:t0,sprite_frag:e0},lt={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},mn={basic:{uniforms:Le([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Le([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Le([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Le([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Le([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Le([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Le([lt.points,lt.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Le([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Le([lt.common,lt.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Le([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Le([lt.sprite,lt.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:Le([lt.common,lt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:Le([lt.lights,lt.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};mn.physical={uniforms:Le([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const yr={r:0,b:0,g:0},ii=new In,n0=new he;function i0(n,t,e,i,s,r,a){const o=new Vt(0);let h=r===!0?0:1,l,c,u=null,d=0,f=null;function _(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?e:t).get(v)),v}function g(x){let v=!1;const y=_(x);y===null?m(o,h):y&&y.isColor&&(m(y,1),v=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(x,v){const y=_(v);y&&(y.isCubeTexture||y.mapping===pa)?(c===void 0&&(c=new Ie(new $s(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:rs(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(L,T,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),ii.copy(v.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(n0.makeRotationFromEuler(ii)),c.material.toneMapped=Kt.getTransfer(y.colorSpace)!==ee,(u!==y||d!==y.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Ie(new ls(2,2),new Yn({name:"BackgroundMaterial",uniforms:rs(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(y.colorSpace)!==ee,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,f=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,v){x.getRGB(yr,Bc(n)),i.buffers.color.setClear(yr.r,yr.g,yr.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(x,v=1){o.set(x),h=v,m(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(x){h=x,m(o,h)},render:g,addToRenderList:p}}function s0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,a=!1;function o(S,P,k,B,q){let Y=!1;const W=u(B,k,P);r!==W&&(r=W,l(r.object)),Y=f(S,B,k,q),Y&&_(S,B,k,q),q!==null&&t.update(q,n.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,y(S,P,k,B),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function h(){return n.createVertexArray()}function l(S){return n.bindVertexArray(S)}function c(S){return n.deleteVertexArray(S)}function u(S,P,k){const B=k.wireframe===!0;let q=i[S.id];q===void 0&&(q={},i[S.id]=q);let Y=q[P.id];Y===void 0&&(Y={},q[P.id]=Y);let W=Y[B];return W===void 0&&(W=d(h()),Y[B]=W),W}function d(S){const P=[],k=[],B=[];for(let q=0;q<e;q++)P[q]=0,k[q]=0,B[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:k,attributeDivisors:B,object:S,attributes:{},index:null}}function f(S,P,k,B){const q=r.attributes,Y=P.attributes;let W=0;const j=k.getAttributes();for(const H in j)if(j[H].location>=0){const ot=q[H];let ct=Y[H];if(ct===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(ct=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(ct=S.instanceColor)),ot===void 0||ot.attribute!==ct||ct&&ot.data!==ct.data)return!0;W++}return r.attributesNum!==W||r.index!==B}function _(S,P,k,B){const q={},Y=P.attributes;let W=0;const j=k.getAttributes();for(const H in j)if(j[H].location>=0){let ot=Y[H];ot===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(ot=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(ot=S.instanceColor));const ct={};ct.attribute=ot,ot&&ot.data&&(ct.data=ot.data),q[H]=ct,W++}r.attributes=q,r.attributesNum=W,r.index=B}function g(){const S=r.newAttributes;for(let P=0,k=S.length;P<k;P++)S[P]=0}function p(S){m(S,0)}function m(S,P){const k=r.newAttributes,B=r.enabledAttributes,q=r.attributeDivisors;k[S]=1,B[S]===0&&(n.enableVertexAttribArray(S),B[S]=1),q[S]!==P&&(n.vertexAttribDivisor(S,P),q[S]=P)}function x(){const S=r.newAttributes,P=r.enabledAttributes;for(let k=0,B=P.length;k<B;k++)P[k]!==S[k]&&(n.disableVertexAttribArray(k),P[k]=0)}function v(S,P,k,B,q,Y,W){W===!0?n.vertexAttribIPointer(S,P,k,q,Y):n.vertexAttribPointer(S,P,k,B,q,Y)}function y(S,P,k,B){g();const q=B.attributes,Y=k.getAttributes(),W=P.defaultAttributeValues;for(const j in Y){const H=Y[j];if(H.location>=0){let rt=q[j];if(rt===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(rt=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(rt=S.instanceColor)),rt!==void 0){const ot=rt.normalized,ct=rt.itemSize,wt=t.get(rt);if(wt===void 0)continue;const Dt=wt.buffer,V=wt.type,tt=wt.bytesPerElement,ft=V===n.INT||V===n.UNSIGNED_INT||rt.gpuType===ih;if(rt.isInterleavedBufferAttribute){const dt=rt.data,Tt=dt.stride,Rt=rt.offset;if(dt.isInstancedInterleavedBuffer){for(let Bt=0;Bt<H.locationSize;Bt++)m(H.location+Bt,dt.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Bt=0;Bt<H.locationSize;Bt++)p(H.location+Bt);n.bindBuffer(n.ARRAY_BUFFER,Dt);for(let Bt=0;Bt<H.locationSize;Bt++)v(H.location+Bt,ct/H.locationSize,V,ot,Tt*tt,(Rt+ct/H.locationSize*Bt)*tt,ft)}else{if(rt.isInstancedBufferAttribute){for(let dt=0;dt<H.locationSize;dt++)m(H.location+dt,rt.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let dt=0;dt<H.locationSize;dt++)p(H.location+dt);n.bindBuffer(n.ARRAY_BUFFER,Dt);for(let dt=0;dt<H.locationSize;dt++)v(H.location+dt,ct/H.locationSize,V,ot,ct*tt,ct/H.locationSize*dt*tt,ft)}}else if(W!==void 0){const ot=W[j];if(ot!==void 0)switch(ot.length){case 2:n.vertexAttrib2fv(H.location,ot);break;case 3:n.vertexAttrib3fv(H.location,ot);break;case 4:n.vertexAttrib4fv(H.location,ot);break;default:n.vertexAttrib1fv(H.location,ot)}}}}x()}function L(){C();for(const S in i){const P=i[S];for(const k in P){const B=P[k];for(const q in B)c(B[q].object),delete B[q];delete P[k]}delete i[S]}}function T(S){if(i[S.id]===void 0)return;const P=i[S.id];for(const k in P){const B=P[k];for(const q in B)c(B[q].object),delete B[q];delete P[k]}delete i[S.id]}function b(S){for(const P in i){const k=i[P];if(k[S.id]===void 0)continue;const B=k[S.id];for(const q in B)c(B[q].object),delete B[q];delete k[S.id]}}function C(){w(),a=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:w,dispose:L,releaseStatesOfGeometry:T,releaseStatesOfProgram:b,initAttributes:g,enableAttribute:p,disableUnusedAttributes:x}}function r0(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let _=0;_<u;_++)f+=c[_];e.update(f,i,1)}function h(l,c,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<l.length;_++)a(l[_],c[_],d[_]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,c,0,d,0,u);let _=0;for(let g=0;g<u;g++)_+=c[g];for(let g=0;g<d.length;g++)e.update(_,i,d[g])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=h}function a0(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==fn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const b=T===Ws&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Ln&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Pn&&!b)}function h(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=h(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const u=e.logarithmicDepthBuffer===!0,d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,L=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:m,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:y,maxSamples:L}}function o0(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new kn,o=new Gt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=c(u,d,0)},this.setState=function(u,d,f){const _=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,m=n.get(u);if(!s||_===null||_.length===0||r&&!p)r?c(null):l();else{const x=r?0:i,v=x*4;let y=m.clippingState||null;h.value=y,y=c(_,d,v,f);for(let L=0;L!==v;++L)y[L]=e[L];m.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function l(){h.value!==e&&(h.value=e,h.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function c(u,d,f,_){const g=u!==null?u.length:0;let p=null;if(g!==0){if(p=h.value,_!==!0||p===null){const m=f+g*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,y=f;v!==g;++v,y+=4)a.copy(u[v]).applyMatrix4(x,o),a.normal.toArray(p,y),p[y+3]=a.constant}h.value=p,h.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}function h0(n){let t=new WeakMap;function e(a,o){return o===oo?a.mapping=es:o===ho&&(a.mapping=ns),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===oo||o===ho)if(t.has(a)){const h=t.get(a).texture;return e(h,a.mapping)}else{const h=a.image;if(h&&h.height>0){const l=new Md(h.height);return l.fromEquirectangularTexture(n,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const h=t.get(o);h!==void 0&&(t.delete(o),h.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class l0 extends zc{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,h=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=c*this.view.offsetY,h=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ki=4,fl=[.125,.215,.35,.446,.526,.582],li=20,Va=new l0,dl=new Vt;let Wa=null,Xa=0,qa=0,Ya=!1;const ri=(1+Math.sqrt(5))/2,Fi=1/ri,pl=[new I(-ri,Fi,0),new I(ri,Fi,0),new I(-Fi,0,ri),new I(Fi,0,ri),new I(0,ri,-Fi),new I(0,ri,Fi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class ml{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Wa,Xa,qa),this._renderer.xr.enabled=Ya,t.scissorTest=!1,Sr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===es||t.mapping===ns?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:Ws,format:fn,colorSpace:Kn,depthBuffer:!1},s=_l(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_l(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=c0(r)),this._blurMaterial=u0(r,t,e)}return s}_compileMaterial(t){const e=new Ie(this._lodPlanes[0],t);this._renderer.compile(e,Va)}_sceneToCubeUV(t,e,i,s){const o=new tn(90,1,e,i),h=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,d=c.toneMapping;c.getClearColor(dl),c.toneMapping=Xn,c.autoClear=!1;const f=new Ys({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1}),_=new Ie(new $s,f);let g=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,g=!0):(f.color.copy(dl),g=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(o.up.set(0,h[m],0),o.lookAt(l[m],0,0)):x===1?(o.up.set(0,0,h[m]),o.lookAt(0,l[m],0)):(o.up.set(0,h[m],0),o.lookAt(0,0,l[m]));const v=this._cubeSize;Sr(s,x*v,m>2?v:0,v,v),c.setRenderTarget(s),g&&c.render(_,o),c.render(t,o)}_.geometry.dispose(),_.material.dispose(),c.toneMapping=d,c.autoClear=u,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===es||t.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=vl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ie(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const h=this._cubeSize;Sr(e,0,0,3*h,2*h),i.setRenderTarget(e),i.render(a,Va)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=pl[(s-r-1)%pl.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const h=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new Ie(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*li-1),g=r/_,p=isFinite(r)?1+Math.floor(c*g):li;p>li&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${li}`);const m=[];let x=0;for(let b=0;b<li;++b){const C=b/g,w=Math.exp(-C*C/2);m.push(w),b===0?x+=w:b<p&&(x+=2*w)}for(let b=0;b<m.length;b++)m[b]=m[b]/x;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=_,d.mipInt.value=v-i;const y=this._sizeLods[s],L=3*y*(s>v-ki?s-v+ki:0),T=4*(this._cubeSize-y);Sr(e,L,T,3*y,2*y),h.setRenderTarget(e),h.render(u,Va)}}function c0(n){const t=[],e=[],i=[];let s=n;const r=n-ki+1+fl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let h=1/o;a>n-ki?h=fl[a-n+ki-1]:a===0&&(h=0),i.push(h);const l=1/(o-2),c=-l,u=1+l,d=[c,c,u,c,u,u,c,c,u,u,c,u],f=6,_=6,g=3,p=2,m=1,x=new Float32Array(g*_*f),v=new Float32Array(p*_*f),y=new Float32Array(m*_*f);for(let T=0;T<f;T++){const b=T%3*2/3-1,C=T>2?0:-1,w=[b,C,0,b+2/3,C,0,b+2/3,C+1,0,b,C,0,b+2/3,C+1,0,b,C+1,0];x.set(w,g*_*T),v.set(d,p*_*T);const S=[T,T,T,T,T,T];y.set(S,m*_*T)}const L=new Re;L.setAttribute("position",new je(x,g)),L.setAttribute("uv",new je(v,p)),L.setAttribute("faceIndex",new je(y,m)),t.push(L),s>ki&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function _l(n,t,e){const i=new di(n,t,e);return i.texture.mapping=pa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Sr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function u0(n,t,e){const i=new Float32Array(li),s=new I(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:li,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:uh(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function gl(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uh(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function vl(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function uh(){return`

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
	`}function f0(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const h=o.mapping,l=h===oo||h===ho,c=h===es||h===ns;if(l||c){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new ml(n)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||c&&f&&s(f)?(e===null&&(e=new ml(n)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let h=0;const l=6;for(let c=0;c<l;c++)o[c]!==void 0&&h++;return h===l}function r(o){const h=o.target;h.removeEventListener("dispose",r);const l=t.get(h);l!==void 0&&(t.delete(h),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function d0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Ts("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function p0(n,t,e,i){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let p=0,m=g.length;p<m;p++)t.remove(g[p])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function h(u){const d=u.attributes;for(const _ in d)t.update(d[_],n.ARRAY_BUFFER);const f=u.morphAttributes;for(const _ in f){const g=f[_];for(let p=0,m=g.length;p<m;p++)t.update(g[p],n.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,_=u.attributes.position;let g=0;if(f!==null){const x=f.array;g=f.version;for(let v=0,y=x.length;v<y;v+=3){const L=x[v+0],T=x[v+1],b=x[v+2];d.push(L,T,T,b,b,L)}}else if(_!==void 0){const x=_.array;g=_.version;for(let v=0,y=x.length/3-1;v<y;v+=3){const L=v+0,T=v+1,b=v+2;d.push(L,T,T,b,b,L)}}else return;const p=new(Ic(d)?Gc:Fc)(d,1);p.version=g;const m=r.get(u);m&&t.remove(m),r.set(u,p)}function c(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:h,getWireframeAttribute:c}}function m0(n,t,e){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function h(d,f){n.drawElements(i,f,r,d*a),e.update(f,i,1)}function l(d,f,_){_!==0&&(n.drawElementsInstanced(i,f,r,d*a,_),e.update(f,i,_))}function c(d,f,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,_);let p=0;for(let m=0;m<_;m++)p+=f[m];e.update(p,i,1)}function u(d,f,_,g){if(_===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)l(d[m]/a,f[m],g[m]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,g,0,_);let m=0;for(let x=0;x<_;x++)m+=f[x];for(let x=0;x<g.length;x++)e.update(m,i,g[x])}}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=l,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function _0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function g0(n,t,e){const i=new WeakMap,s=new xe;function r(a,o,h){const l=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let S=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",S)};var f=S;d!==void 0&&d.texture.dispose();const _=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let y=0;_===!0&&(y=1),g===!0&&(y=2),p===!0&&(y=3);let L=o.attributes.position.count*y,T=1;L>t.maxTextureSize&&(T=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const b=new Float32Array(L*T*4*u),C=new Dc(b,L,T,u);C.type=Pn,C.needsUpdate=!0;const w=y*4;for(let P=0;P<u;P++){const k=m[P],B=x[P],q=v[P],Y=L*T*4*P;for(let W=0;W<k.count;W++){const j=W*w;_===!0&&(s.fromBufferAttribute(k,W),b[Y+j+0]=s.x,b[Y+j+1]=s.y,b[Y+j+2]=s.z,b[Y+j+3]=0),g===!0&&(s.fromBufferAttribute(B,W),b[Y+j+4]=s.x,b[Y+j+5]=s.y,b[Y+j+6]=s.z,b[Y+j+7]=0),p===!0&&(s.fromBufferAttribute(q,W),b[Y+j+8]=s.x,b[Y+j+9]=s.y,b[Y+j+10]=s.z,b[Y+j+11]=q.itemSize===4?s.w:1)}}d={count:u,texture:C,size:new mt(L,T)},i.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let _=0;for(let p=0;p<l.length;p++)_+=l[p];const g=o.morphTargetsRelative?1:1-_;h.getUniforms().setValue(n,"morphTargetBaseInfluence",g),h.getUniforms().setValue(n,"morphTargetInfluences",l)}h.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),h.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function v0(n,t,e,i){let s=new WeakMap;function r(h){const l=i.render.frame,c=h.geometry,u=t.get(h,c);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),h.isInstancedMesh&&(h.hasEventListener("dispose",o)===!1&&h.addEventListener("dispose",o),s.get(h)!==l&&(e.update(h.instanceMatrix,n.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,n.ARRAY_BUFFER),s.set(h,l))),h.isSkinnedMesh){const d=h.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function a(){s=new WeakMap}function o(h){const l=h.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class Wc extends De{constructor(t,e,i,s,r,a,o,h,l,c=ji){if(c!==ji&&c!==ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===ji&&(i=fi),i===void 0&&c===ss&&(i=is),super(null,s,r,a,o,h,c,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:nn,this.minFilter=h!==void 0?h:nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Xc=new De,Ml=new Wc(1,1),qc=new Dc,Yc=new id,$c=new kc,xl=[],yl=[],Sl=new Float32Array(16),El=new Float32Array(9),wl=new Float32Array(4);function cs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=xl[s];if(r===void 0&&(r=new Float32Array(s),xl[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function _e(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ge(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ga(n,t){let e=yl[t];e===void 0&&(e=new Int32Array(t),yl[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function M0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function x0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;n.uniform2fv(this.addr,t),ge(e,t)}}function y0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;n.uniform3fv(this.addr,t),ge(e,t)}}function S0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;n.uniform4fv(this.addr,t),ge(e,t)}}function E0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ge(e,t)}else{if(_e(e,i))return;wl.set(i),n.uniformMatrix2fv(this.addr,!1,wl),ge(e,i)}}function w0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ge(e,t)}else{if(_e(e,i))return;El.set(i),n.uniformMatrix3fv(this.addr,!1,El),ge(e,i)}}function b0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ge(e,t)}else{if(_e(e,i))return;Sl.set(i),n.uniformMatrix4fv(this.addr,!1,Sl),ge(e,i)}}function T0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function A0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;n.uniform2iv(this.addr,t),ge(e,t)}}function P0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;n.uniform3iv(this.addr,t),ge(e,t)}}function R0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;n.uniform4iv(this.addr,t),ge(e,t)}}function C0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function L0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;n.uniform2uiv(this.addr,t),ge(e,t)}}function I0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;n.uniform3uiv(this.addr,t),ge(e,t)}}function N0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;n.uniform4uiv(this.addr,t),ge(e,t)}}function D0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ml.compareFunction=Lc,r=Ml):r=Xc,e.setTexture2D(t||r,s)}function U0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Yc,s)}function O0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||$c,s)}function F0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||qc,s)}function G0(n){switch(n){case 5126:return M0;case 35664:return x0;case 35665:return y0;case 35666:return S0;case 35674:return E0;case 35675:return w0;case 35676:return b0;case 5124:case 35670:return T0;case 35667:case 35671:return A0;case 35668:case 35672:return P0;case 35669:case 35673:return R0;case 5125:return C0;case 36294:return L0;case 36295:return I0;case 36296:return N0;case 35678:case 36198:case 36298:case 36306:case 35682:return D0;case 35679:case 36299:case 36307:return U0;case 35680:case 36300:case 36308:case 36293:return O0;case 36289:case 36303:case 36311:case 36292:return F0}}function B0(n,t){n.uniform1fv(this.addr,t)}function z0(n,t){const e=cs(t,this.size,2);n.uniform2fv(this.addr,e)}function k0(n,t){const e=cs(t,this.size,3);n.uniform3fv(this.addr,e)}function H0(n,t){const e=cs(t,this.size,4);n.uniform4fv(this.addr,e)}function V0(n,t){const e=cs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function W0(n,t){const e=cs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function X0(n,t){const e=cs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function q0(n,t){n.uniform1iv(this.addr,t)}function Y0(n,t){n.uniform2iv(this.addr,t)}function $0(n,t){n.uniform3iv(this.addr,t)}function j0(n,t){n.uniform4iv(this.addr,t)}function K0(n,t){n.uniform1uiv(this.addr,t)}function Z0(n,t){n.uniform2uiv(this.addr,t)}function J0(n,t){n.uniform3uiv(this.addr,t)}function Q0(n,t){n.uniform4uiv(this.addr,t)}function t_(n,t,e){const i=this.cache,s=t.length,r=ga(e,s);_e(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Xc,r[a])}function e_(n,t,e){const i=this.cache,s=t.length,r=ga(e,s);_e(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Yc,r[a])}function n_(n,t,e){const i=this.cache,s=t.length,r=ga(e,s);_e(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||$c,r[a])}function i_(n,t,e){const i=this.cache,s=t.length,r=ga(e,s);_e(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||qc,r[a])}function s_(n){switch(n){case 5126:return B0;case 35664:return z0;case 35665:return k0;case 35666:return H0;case 35674:return V0;case 35675:return W0;case 35676:return X0;case 5124:case 35670:return q0;case 35667:case 35671:return Y0;case 35668:case 35672:return $0;case 35669:case 35673:return j0;case 5125:return K0;case 36294:return Z0;case 36295:return J0;case 36296:return Q0;case 35678:case 36198:case 36298:case 36306:case 35682:return t_;case 35679:case 36299:case 36307:return e_;case 35680:case 36300:case 36308:case 36293:return n_;case 36289:case 36303:case 36311:case 36292:return i_}}class r_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=G0(e.type)}}class a_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=s_(e.type)}}class o_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const $a=/(\w+)(\])?(\[|\.)?/g;function bl(n,t){n.seq.push(t),n.map[t.id]=t}function h_(n,t,e){const i=n.name,s=i.length;for($a.lastIndex=0;;){const r=$a.exec(i),a=$a.lastIndex;let o=r[1];const h=r[2]==="]",l=r[3];if(h&&(o=o|0),l===void 0||l==="["&&a+2===s){bl(e,l===void 0?new r_(o,n,t):new a_(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new o_(o),bl(e,u)),e=u}}}class zr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);h_(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],h=i[o.id];h.needsUpdate!==!1&&o.setValue(t,h.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function Tl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const l_=37297;let c_=0;function u_(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function f_(n){const t=Kt.getPrimaries(Kt.workingColorSpace),e=Kt.getPrimaries(n);let i;switch(t===e?i="":t===$r&&e===Yr?i="LinearDisplayP3ToLinearSRGB":t===Yr&&e===$r&&(i="LinearSRGBToLinearDisplayP3"),n){case Kn:case ma:return[i,"LinearTransferOETF"];case un:case lh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Al(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+u_(n.getShaderSource(t),a)}else return s}function d_(n,t){const e=f_(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function p_(n,t){let e;switch(t){case mf:e="Linear";break;case _f:e="Reinhard";break;case gf:e="Cineon";break;case vf:e="ACESFilmic";break;case xf:e="AgX";break;case yf:e="Neutral";break;case Mf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Er=new I;function m_(){Kt.getLuminanceCoefficients(Er);const n=Er.x.toFixed(4),t=Er.y.toFixed(4),e=Er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function __(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ms).join(`
`)}function g_(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function v_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Ms(n){return n!==""}function Pl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Rl(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const M_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bo(n){return n.replace(M_,y_)}const x_=new Map;function y_(n,t){let e=Ft[t];if(e===void 0){const i=x_.get(t);if(i!==void 0)e=Ft[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Bo(e)}const S_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cl(n){return n.replace(S_,E_)}function E_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ll(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function w_(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===vc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===zu?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===An&&(t="SHADOWMAP_TYPE_VSM"),t}function b_(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case es:case ns:t="ENVMAP_TYPE_CUBE";break;case pa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function T_(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ns:t="ENVMAP_MODE_REFRACTION";break}return t}function A_(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Mc:t="ENVMAP_BLENDING_MULTIPLY";break;case df:t="ENVMAP_BLENDING_MIX";break;case pf:t="ENVMAP_BLENDING_ADD";break}return t}function P_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function R_(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const h=w_(e),l=b_(e),c=T_(e),u=A_(e),d=P_(e),f=__(e),_=g_(r),g=s.createProgram();let p,m,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ms).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ms).join(`
`),m.length>0&&(m+=`
`)):(p=[Ll(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),m=[Ll(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xn?"#define TONE_MAPPING":"",e.toneMapping!==Xn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==Xn?p_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,d_("linearToOutputTexel",e.outputColorSpace),m_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ms).join(`
`)),a=Bo(a),a=Pl(a,e),a=Rl(a,e),o=Bo(o),o=Pl(o,e),o=Rl(o,e),a=Cl(a),o=Cl(o),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Xh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Xh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=x+p+a,y=x+m+o,L=Tl(s,s.VERTEX_SHADER,v),T=Tl(s,s.FRAGMENT_SHADER,y);s.attachShader(g,L),s.attachShader(g,T),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function b(P){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(g).trim(),B=s.getShaderInfoLog(L).trim(),q=s.getShaderInfoLog(T).trim();let Y=!0,W=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,L,T);else{const j=Al(s,L,"vertex"),H=Al(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+j+`
`+H)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(B===""||q==="")&&(W=!1);W&&(P.diagnostics={runnable:Y,programLog:k,vertexShader:{log:B,prefix:p},fragmentShader:{log:q,prefix:m}})}s.deleteShader(L),s.deleteShader(T),C=new zr(s,g),w=v_(s,g)}let C;this.getUniforms=function(){return C===void 0&&b(this),C};let w;this.getAttributes=function(){return w===void 0&&b(this),w};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(g,l_)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=c_++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=L,this.fragmentShader=T,this}let C_=0;class L_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new I_(t),e.set(t,i)),i}}class I_{constructor(t){this.id=C_++,this.code=t,this.usedTimes=0}}function N_(n,t,e,i,s,r,a){const o=new Uc,h=new L_,l=new Set,c=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return l.add(w),w===0?"uv":`uv${w}`}function p(w,S,P,k,B){const q=k.fog,Y=B.geometry,W=w.isMeshStandardMaterial?k.environment:null,j=(w.isMeshStandardMaterial?e:t).get(w.envMap||W),H=j&&j.mapping===pa?j.image.height:null,rt=_[w.type];w.precision!==null&&(f=s.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const ot=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ct=ot!==void 0?ot.length:0;let wt=0;Y.morphAttributes.position!==void 0&&(wt=1),Y.morphAttributes.normal!==void 0&&(wt=2),Y.morphAttributes.color!==void 0&&(wt=3);let Dt,V,tt,ft;if(rt){const Wt=mn[rt];Dt=Wt.vertexShader,V=Wt.fragmentShader}else Dt=w.vertexShader,V=w.fragmentShader,h.update(w),tt=h.getVertexShaderID(w),ft=h.getFragmentShaderID(w);const dt=n.getRenderTarget(),Tt=B.isInstancedMesh===!0,Rt=B.isBatchedMesh===!0,Bt=!!w.map,Jt=!!w.matcap,R=!!j,ce=!!w.aoMap,Zt=!!w.lightMap,Qt=!!w.bumpMap,Et=!!w.normalMap,ue=!!w.displacementMap,It=!!w.emissiveMap,Ut=!!w.metalnessMap,A=!!w.roughnessMap,M=w.anisotropy>0,z=w.clearcoat>0,K=w.dispersion>0,Q=w.iridescence>0,Z=w.sheen>0,bt=w.transmission>0,ut=M&&!!w.anisotropyMap,gt=z&&!!w.clearcoatMap,Ot=z&&!!w.clearcoatNormalMap,et=z&&!!w.clearcoatRoughnessMap,_t=Q&&!!w.iridescenceMap,kt=Q&&!!w.iridescenceThicknessMap,Lt=Z&&!!w.sheenColorMap,vt=Z&&!!w.sheenRoughnessMap,Nt=!!w.specularMap,zt=!!w.specularColorMap,ne=!!w.specularIntensityMap,N=bt&&!!w.transmissionMap,nt=bt&&!!w.thicknessMap,X=!!w.gradientMap,$=!!w.alphaMap,at=w.alphaTest>0,At=!!w.alphaHash,Ht=!!w.extensions;let fe=Xn;w.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(fe=n.toneMapping);const ye={shaderID:rt,shaderType:w.type,shaderName:w.name,vertexShader:Dt,fragmentShader:V,defines:w.defines,customVertexShaderID:tt,customFragmentShaderID:ft,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Rt,batchingColor:Rt&&B._colorsTexture!==null,instancing:Tt,instancingColor:Tt&&B.instanceColor!==null,instancingMorph:Tt&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:dt===null?n.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:Kn,alphaToCoverage:!!w.alphaToCoverage,map:Bt,matcap:Jt,envMap:R,envMapMode:R&&j.mapping,envMapCubeUVHeight:H,aoMap:ce,lightMap:Zt,bumpMap:Qt,normalMap:Et,displacementMap:d&&ue,emissiveMap:It,normalMapObjectSpace:Et&&w.normalMapType===Tf,normalMapTangentSpace:Et&&w.normalMapType===bf,metalnessMap:Ut,roughnessMap:A,anisotropy:M,anisotropyMap:ut,clearcoat:z,clearcoatMap:gt,clearcoatNormalMap:Ot,clearcoatRoughnessMap:et,dispersion:K,iridescence:Q,iridescenceMap:_t,iridescenceThicknessMap:kt,sheen:Z,sheenColorMap:Lt,sheenRoughnessMap:vt,specularMap:Nt,specularColorMap:zt,specularIntensityMap:ne,transmission:bt,transmissionMap:N,thicknessMap:nt,gradientMap:X,opaque:w.transparent===!1&&w.blending===$i&&w.alphaToCoverage===!1,alphaMap:$,alphaTest:at,alphaHash:At,combine:w.combine,mapUv:Bt&&g(w.map.channel),aoMapUv:ce&&g(w.aoMap.channel),lightMapUv:Zt&&g(w.lightMap.channel),bumpMapUv:Qt&&g(w.bumpMap.channel),normalMapUv:Et&&g(w.normalMap.channel),displacementMapUv:ue&&g(w.displacementMap.channel),emissiveMapUv:It&&g(w.emissiveMap.channel),metalnessMapUv:Ut&&g(w.metalnessMap.channel),roughnessMapUv:A&&g(w.roughnessMap.channel),anisotropyMapUv:ut&&g(w.anisotropyMap.channel),clearcoatMapUv:gt&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:Ot&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:kt&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:Lt&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:vt&&g(w.sheenRoughnessMap.channel),specularMapUv:Nt&&g(w.specularMap.channel),specularColorMapUv:zt&&g(w.specularColorMap.channel),specularIntensityMapUv:ne&&g(w.specularIntensityMap.channel),transmissionMapUv:N&&g(w.transmissionMap.channel),thicknessMapUv:nt&&g(w.thicknessMap.channel),alphaMapUv:$&&g(w.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Et||M),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Y.attributes.uv&&(Bt||$),fog:!!q,useFog:w.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:B.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:ct,morphTextureStride:wt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:fe,decodeVideoTexture:Bt&&w.map.isVideoTexture===!0&&Kt.getTransfer(w.map.colorSpace)===ee,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===en,flipSided:w.side===ze,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ht&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&w.extensions.multiDraw===!0||Rt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return ye.vertexUv1s=l.has(1),ye.vertexUv2s=l.has(2),ye.vertexUv3s=l.has(3),l.clear(),ye}function m(w){const S=[];if(w.shaderID?S.push(w.shaderID):(S.push(w.customVertexShaderID),S.push(w.customFragmentShaderID)),w.defines!==void 0)for(const P in w.defines)S.push(P),S.push(w.defines[P]);return w.isRawShaderMaterial===!1&&(x(S,w),v(S,w),S.push(n.outputColorSpace)),S.push(w.customProgramCacheKey),S.join()}function x(w,S){w.push(S.precision),w.push(S.outputColorSpace),w.push(S.envMapMode),w.push(S.envMapCubeUVHeight),w.push(S.mapUv),w.push(S.alphaMapUv),w.push(S.lightMapUv),w.push(S.aoMapUv),w.push(S.bumpMapUv),w.push(S.normalMapUv),w.push(S.displacementMapUv),w.push(S.emissiveMapUv),w.push(S.metalnessMapUv),w.push(S.roughnessMapUv),w.push(S.anisotropyMapUv),w.push(S.clearcoatMapUv),w.push(S.clearcoatNormalMapUv),w.push(S.clearcoatRoughnessMapUv),w.push(S.iridescenceMapUv),w.push(S.iridescenceThicknessMapUv),w.push(S.sheenColorMapUv),w.push(S.sheenRoughnessMapUv),w.push(S.specularMapUv),w.push(S.specularColorMapUv),w.push(S.specularIntensityMapUv),w.push(S.transmissionMapUv),w.push(S.thicknessMapUv),w.push(S.combine),w.push(S.fogExp2),w.push(S.sizeAttenuation),w.push(S.morphTargetsCount),w.push(S.morphAttributeCount),w.push(S.numDirLights),w.push(S.numPointLights),w.push(S.numSpotLights),w.push(S.numSpotLightMaps),w.push(S.numHemiLights),w.push(S.numRectAreaLights),w.push(S.numDirLightShadows),w.push(S.numPointLightShadows),w.push(S.numSpotLightShadows),w.push(S.numSpotLightShadowsWithMaps),w.push(S.numLightProbes),w.push(S.shadowMapType),w.push(S.toneMapping),w.push(S.numClippingPlanes),w.push(S.numClipIntersection),w.push(S.depthPacking)}function v(w,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.skinning&&o.enable(4),S.morphTargets&&o.enable(5),S.morphNormals&&o.enable(6),S.morphColors&&o.enable(7),S.premultipliedAlpha&&o.enable(8),S.shadowMapEnabled&&o.enable(9),S.doubleSided&&o.enable(10),S.flipSided&&o.enable(11),S.useDepthPacking&&o.enable(12),S.dithering&&o.enable(13),S.transmission&&o.enable(14),S.sheen&&o.enable(15),S.opaque&&o.enable(16),S.pointsUvs&&o.enable(17),S.decodeVideoTexture&&o.enable(18),S.alphaToCoverage&&o.enable(19),w.push(o.mask)}function y(w){const S=_[w.type];let P;if(S){const k=mn[S];P=md.clone(k.uniforms)}else P=w.uniforms;return P}function L(w,S){let P;for(let k=0,B=c.length;k<B;k++){const q=c[k];if(q.cacheKey===S){P=q,++P.usedTimes;break}}return P===void 0&&(P=new R_(n,S,w,r),c.push(P)),P}function T(w){if(--w.usedTimes===0){const S=c.indexOf(w);c[S]=c[c.length-1],c.pop(),w.destroy()}}function b(w){h.remove(w)}function C(){h.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:y,acquireProgram:L,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:C}}function D_(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,h){n.get(a)[o]=h}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function U_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Il(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Nl(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,d,f,_,g,p){let m=n[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:_,renderOrder:u.renderOrder,z:g,group:p},n[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=_,m.renderOrder=u.renderOrder,m.z=g,m.group=p),t++,m}function o(u,d,f,_,g,p){const m=a(u,d,f,_,g,p);f.transmission>0?i.push(m):f.transparent===!0?s.push(m):e.push(m)}function h(u,d,f,_,g,p){const m=a(u,d,f,_,g,p);f.transmission>0?i.unshift(m):f.transparent===!0?s.unshift(m):e.unshift(m)}function l(u,d){e.length>1&&e.sort(u||U_),i.length>1&&i.sort(d||Il),s.length>1&&s.sort(d||Il)}function c(){for(let u=t,d=n.length;u<d;u++){const f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:h,finish:c,sort:l}}function O_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new Nl,n.set(i,[a])):s>=r.length?(a=new Nl,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function F_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Vt};break;case"SpotLight":e={position:new I,direction:new I,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new I,halfWidth:new I,halfHeight:new I};break}return n[t.id]=e,e}}}function G_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let B_=0;function z_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function k_(n){const t=new F_,e=G_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new I);const s=new I,r=new he,a=new he;function o(l){let c=0,u=0,d=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let f=0,_=0,g=0,p=0,m=0,x=0,v=0,y=0,L=0,T=0,b=0;l.sort(z_);for(let w=0,S=l.length;w<S;w++){const P=l[w],k=P.color,B=P.intensity,q=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)c+=k.r*B,u+=k.g*B,d+=k.b*B;else if(P.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(P.sh.coefficients[W],B);b++}else if(P.isDirectionalLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const j=P.shadow,H=e.get(P);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,i.directionalShadow[f]=H,i.directionalShadowMap[f]=Y,i.directionalShadowMatrix[f]=P.shadow.matrix,x++}i.directional[f]=W,f++}else if(P.isSpotLight){const W=t.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(k).multiplyScalar(B),W.distance=q,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,i.spot[g]=W;const j=P.shadow;if(P.map&&(i.spotLightMap[L]=P.map,L++,j.updateMatrices(P),P.castShadow&&T++),i.spotLightMatrix[g]=j.matrix,P.castShadow){const H=e.get(P);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,i.spotShadow[g]=H,i.spotShadowMap[g]=Y,y++}g++}else if(P.isRectAreaLight){const W=t.get(P);W.color.copy(k).multiplyScalar(B),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),i.rectArea[p]=W,p++}else if(P.isPointLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const j=P.shadow,H=e.get(P);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,H.shadowCameraNear=j.camera.near,H.shadowCameraFar=j.camera.far,i.pointShadow[_]=H,i.pointShadowMap[_]=Y,i.pointShadowMatrix[_]=P.shadow.matrix,v++}i.point[_]=W,_++}else if(P.isHemisphereLight){const W=t.get(P);W.skyColor.copy(P.color).multiplyScalar(B),W.groundColor.copy(P.groundColor).multiplyScalar(B),i.hemi[m]=W,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=lt.LTC_FLOAT_1,i.rectAreaLTC2=lt.LTC_FLOAT_2):(i.rectAreaLTC1=lt.LTC_HALF_1,i.rectAreaLTC2=lt.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=u,i.ambient[2]=d;const C=i.hash;(C.directionalLength!==f||C.pointLength!==_||C.spotLength!==g||C.rectAreaLength!==p||C.hemiLength!==m||C.numDirectionalShadows!==x||C.numPointShadows!==v||C.numSpotShadows!==y||C.numSpotMaps!==L||C.numLightProbes!==b)&&(i.directional.length=f,i.spot.length=g,i.rectArea.length=p,i.point.length=_,i.hemi.length=m,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=y+L-T,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=b,C.directionalLength=f,C.pointLength=_,C.spotLength=g,C.rectAreaLength=p,C.hemiLength=m,C.numDirectionalShadows=x,C.numPointShadows=v,C.numSpotShadows=y,C.numSpotMaps=L,C.numLightProbes=b,i.version=B_++)}function h(l,c){let u=0,d=0,f=0,_=0,g=0;const p=c.matrixWorldInverse;for(let m=0,x=l.length;m<x;m++){const v=l[m];if(v.isDirectionalLight){const y=i.directional[u];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),u++}else if(v.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),f++}else if(v.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(v.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),_++}else if(v.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),d++}else if(v.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:o,setupView:h,state:i}}function Dl(n){const t=new k_(n),e=[],i=[];function s(c){l.camera=c,e.length=0,i.length=0}function r(c){e.push(c)}function a(c){i.push(c)}function o(){t.setup(e)}function h(c){t.setupView(e,c)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:h,pushLight:r,pushShadow:a}}function H_(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Dl(n),t.set(s,[o])):r>=a.length?(o=new Dl(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class V_ extends hs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ef,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class W_ extends hs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const X_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,q_=`uniform sampler2D shadow_pass;
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
}`;function Y_(n,t,e){let i=new Hc;const s=new mt,r=new mt,a=new xe,o=new V_({depthPacking:wf}),h=new W_,l={},c=e.maxTextureSize,u={[qn]:ze,[ze]:qn,[en]:en},d=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:X_,fragmentShader:q_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const _=new Re;_.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Ie(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vc;let m=this.type;this.render=function(T,b,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const w=n.getRenderTarget(),S=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Wn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const B=m!==An&&this.type===An,q=m===An&&this.type!==An;for(let Y=0,W=T.length;Y<W;Y++){const j=T[Y],H=j.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const rt=H.getFrameExtents();if(s.multiply(rt),r.copy(H.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/rt.x),s.x=r.x*rt.x,H.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/rt.y),s.y=r.y*rt.y,H.mapSize.y=r.y)),H.map===null||B===!0||q===!0){const ct=this.type!==An?{minFilter:nn,magFilter:nn}:{};H.map!==null&&H.map.dispose(),H.map=new di(s.x,s.y,ct),H.map.texture.name=j.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const ot=H.getViewportCount();for(let ct=0;ct<ot;ct++){const wt=H.getViewport(ct);a.set(r.x*wt.x,r.y*wt.y,r.x*wt.z,r.y*wt.w),k.viewport(a),H.updateMatrices(j,ct),i=H.getFrustum(),y(b,C,H.camera,j,this.type)}H.isPointLightShadow!==!0&&this.type===An&&x(H,C),H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(w,S,P)};function x(T,b){const C=t.update(g);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new di(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(b,null,C,d,g,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(b,null,C,f,g,null)}function v(T,b,C,w){let S=null;const P=C.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)S=P;else if(S=C.isPointLight===!0?h:o,n.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const k=S.uuid,B=b.uuid;let q=l[k];q===void 0&&(q={},l[k]=q);let Y=q[B];Y===void 0&&(Y=S.clone(),q[B]=Y,b.addEventListener("dispose",L)),S=Y}if(S.visible=b.visible,S.wireframe=b.wireframe,w===An?S.side=b.shadowSide!==null?b.shadowSide:b.side:S.side=b.shadowSide!==null?b.shadowSide:u[b.side],S.alphaMap=b.alphaMap,S.alphaTest=b.alphaTest,S.map=b.map,S.clipShadows=b.clipShadows,S.clippingPlanes=b.clippingPlanes,S.clipIntersection=b.clipIntersection,S.displacementMap=b.displacementMap,S.displacementScale=b.displacementScale,S.displacementBias=b.displacementBias,S.wireframeLinewidth=b.wireframeLinewidth,S.linewidth=b.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const k=n.properties.get(S);k.light=C}return S}function y(T,b,C,w,S){if(T.visible===!1)return;if(T.layers.test(b.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===An)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld);const B=t.update(T),q=T.material;if(Array.isArray(q)){const Y=B.groups;for(let W=0,j=Y.length;W<j;W++){const H=Y[W],rt=q[H.materialIndex];if(rt&&rt.visible){const ot=v(T,rt,w,S);T.onBeforeShadow(n,T,b,C,B,ot,H),n.renderBufferDirect(C,null,B,ot,T,H),T.onAfterShadow(n,T,b,C,B,ot,H)}}}else if(q.visible){const Y=v(T,q,w,S);T.onBeforeShadow(n,T,b,C,B,Y,null),n.renderBufferDirect(C,null,B,Y,T,null),T.onAfterShadow(n,T,b,C,B,Y,null)}}const k=T.children;for(let B=0,q=k.length;B<q;B++)y(k[B],b,C,w,S)}function L(T){T.target.removeEventListener("dispose",L);for(const C in l){const w=l[C],S=T.target.uuid;S in w&&(w[S].dispose(),delete w[S])}}}function $_(n){function t(){let N=!1;const nt=new xe;let X=null;const $=new xe(0,0,0,0);return{setMask:function(at){X!==at&&!N&&(n.colorMask(at,at,at,at),X=at)},setLocked:function(at){N=at},setClear:function(at,At,Ht,fe,ye){ye===!0&&(at*=fe,At*=fe,Ht*=fe),nt.set(at,At,Ht,fe),$.equals(nt)===!1&&(n.clearColor(at,At,Ht,fe),$.copy(nt))},reset:function(){N=!1,X=null,$.set(-1,0,0,0)}}}function e(){let N=!1,nt=null,X=null,$=null;return{setTest:function(at){at?ft(n.DEPTH_TEST):dt(n.DEPTH_TEST)},setMask:function(at){nt!==at&&!N&&(n.depthMask(at),nt=at)},setFunc:function(at){if(X!==at){switch(at){case af:n.depthFunc(n.NEVER);break;case of:n.depthFunc(n.ALWAYS);break;case hf:n.depthFunc(n.LESS);break;case Xr:n.depthFunc(n.LEQUAL);break;case lf:n.depthFunc(n.EQUAL);break;case cf:n.depthFunc(n.GEQUAL);break;case uf:n.depthFunc(n.GREATER);break;case ff:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}X=at}},setLocked:function(at){N=at},setClear:function(at){$!==at&&(n.clearDepth(at),$=at)},reset:function(){N=!1,nt=null,X=null,$=null}}}function i(){let N=!1,nt=null,X=null,$=null,at=null,At=null,Ht=null,fe=null,ye=null;return{setTest:function(Wt){N||(Wt?ft(n.STENCIL_TEST):dt(n.STENCIL_TEST))},setMask:function(Wt){nt!==Wt&&!N&&(n.stencilMask(Wt),nt=Wt)},setFunc:function(Wt,yn,pn){(X!==Wt||$!==yn||at!==pn)&&(n.stencilFunc(Wt,yn,pn),X=Wt,$=yn,at=pn)},setOp:function(Wt,yn,pn){(At!==Wt||Ht!==yn||fe!==pn)&&(n.stencilOp(Wt,yn,pn),At=Wt,Ht=yn,fe=pn)},setLocked:function(Wt){N=Wt},setClear:function(Wt){ye!==Wt&&(n.clearStencil(Wt),ye=Wt)},reset:function(){N=!1,nt=null,X=null,$=null,at=null,At=null,Ht=null,fe=null,ye=null}}}const s=new t,r=new e,a=new i,o=new WeakMap,h=new WeakMap;let l={},c={},u=new WeakMap,d=[],f=null,_=!1,g=null,p=null,m=null,x=null,v=null,y=null,L=null,T=new Vt(0,0,0),b=0,C=!1,w=null,S=null,P=null,k=null,B=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,W=0;const j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(j)[1]),Y=W>=1):j.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),Y=W>=2);let H=null,rt={};const ot=n.getParameter(n.SCISSOR_BOX),ct=n.getParameter(n.VIEWPORT),wt=new xe().fromArray(ot),Dt=new xe().fromArray(ct);function V(N,nt,X,$){const at=new Uint8Array(4),At=n.createTexture();n.bindTexture(N,At),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ht=0;Ht<X;Ht++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(nt,0,n.RGBA,1,1,$,0,n.RGBA,n.UNSIGNED_BYTE,at):n.texImage2D(nt+Ht,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,at);return At}const tt={};tt[n.TEXTURE_2D]=V(n.TEXTURE_2D,n.TEXTURE_2D,1),tt[n.TEXTURE_CUBE_MAP]=V(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[n.TEXTURE_2D_ARRAY]=V(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),tt[n.TEXTURE_3D]=V(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),ft(n.DEPTH_TEST),r.setFunc(Xr),Qt(!1),Et(Bh),ft(n.CULL_FACE),ce(Wn);function ft(N){l[N]!==!0&&(n.enable(N),l[N]=!0)}function dt(N){l[N]!==!1&&(n.disable(N),l[N]=!1)}function Tt(N,nt){return c[N]!==nt?(n.bindFramebuffer(N,nt),c[N]=nt,N===n.DRAW_FRAMEBUFFER&&(c[n.FRAMEBUFFER]=nt),N===n.FRAMEBUFFER&&(c[n.DRAW_FRAMEBUFFER]=nt),!0):!1}function Rt(N,nt){let X=d,$=!1;if(N){X=u.get(nt),X===void 0&&(X=[],u.set(nt,X));const at=N.textures;if(X.length!==at.length||X[0]!==n.COLOR_ATTACHMENT0){for(let At=0,Ht=at.length;At<Ht;At++)X[At]=n.COLOR_ATTACHMENT0+At;X.length=at.length,$=!0}}else X[0]!==n.BACK&&(X[0]=n.BACK,$=!0);$&&n.drawBuffers(X)}function Bt(N){return f!==N?(n.useProgram(N),f=N,!0):!1}const Jt={[hi]:n.FUNC_ADD,[Hu]:n.FUNC_SUBTRACT,[Vu]:n.FUNC_REVERSE_SUBTRACT};Jt[Wu]=n.MIN,Jt[Xu]=n.MAX;const R={[qu]:n.ZERO,[Yu]:n.ONE,[$u]:n.SRC_COLOR,[ro]:n.SRC_ALPHA,[tf]:n.SRC_ALPHA_SATURATE,[Ju]:n.DST_COLOR,[Ku]:n.DST_ALPHA,[ju]:n.ONE_MINUS_SRC_COLOR,[ao]:n.ONE_MINUS_SRC_ALPHA,[Qu]:n.ONE_MINUS_DST_COLOR,[Zu]:n.ONE_MINUS_DST_ALPHA,[ef]:n.CONSTANT_COLOR,[nf]:n.ONE_MINUS_CONSTANT_COLOR,[sf]:n.CONSTANT_ALPHA,[rf]:n.ONE_MINUS_CONSTANT_ALPHA};function ce(N,nt,X,$,at,At,Ht,fe,ye,Wt){if(N===Wn){_===!0&&(dt(n.BLEND),_=!1);return}if(_===!1&&(ft(n.BLEND),_=!0),N!==ku){if(N!==g||Wt!==C){if((p!==hi||v!==hi)&&(n.blendEquation(n.FUNC_ADD),p=hi,v=hi),Wt)switch(N){case $i:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case zh:n.blendFunc(n.ONE,n.ONE);break;case kh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hh:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case $i:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case zh:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case kh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hh:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}m=null,x=null,y=null,L=null,T.set(0,0,0),b=0,g=N,C=Wt}return}at=at||nt,At=At||X,Ht=Ht||$,(nt!==p||at!==v)&&(n.blendEquationSeparate(Jt[nt],Jt[at]),p=nt,v=at),(X!==m||$!==x||At!==y||Ht!==L)&&(n.blendFuncSeparate(R[X],R[$],R[At],R[Ht]),m=X,x=$,y=At,L=Ht),(fe.equals(T)===!1||ye!==b)&&(n.blendColor(fe.r,fe.g,fe.b,ye),T.copy(fe),b=ye),g=N,C=!1}function Zt(N,nt){N.side===en?dt(n.CULL_FACE):ft(n.CULL_FACE);let X=N.side===ze;nt&&(X=!X),Qt(X),N.blending===$i&&N.transparent===!1?ce(Wn):ce(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),s.setMask(N.colorWrite);const $=N.stencilWrite;a.setTest($),$&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),It(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ft(n.SAMPLE_ALPHA_TO_COVERAGE):dt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Qt(N){w!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),w=N)}function Et(N){N!==Gu?(ft(n.CULL_FACE),N!==S&&(N===Bh?n.cullFace(n.BACK):N===Bu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):dt(n.CULL_FACE),S=N}function ue(N){N!==P&&(Y&&n.lineWidth(N),P=N)}function It(N,nt,X){N?(ft(n.POLYGON_OFFSET_FILL),(k!==nt||B!==X)&&(n.polygonOffset(nt,X),k=nt,B=X)):dt(n.POLYGON_OFFSET_FILL)}function Ut(N){N?ft(n.SCISSOR_TEST):dt(n.SCISSOR_TEST)}function A(N){N===void 0&&(N=n.TEXTURE0+q-1),H!==N&&(n.activeTexture(N),H=N)}function M(N,nt,X){X===void 0&&(H===null?X=n.TEXTURE0+q-1:X=H);let $=rt[X];$===void 0&&($={type:void 0,texture:void 0},rt[X]=$),($.type!==N||$.texture!==nt)&&(H!==X&&(n.activeTexture(X),H=X),n.bindTexture(N,nt||tt[N]),$.type=N,$.texture=nt)}function z(){const N=rt[H];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function K(){try{n.compressedTexImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{n.compressedTexImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{n.texSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function bt(){try{n.texSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ut(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function gt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ot(){try{n.texStorage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function et(){try{n.texStorage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(){try{n.texImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function kt(){try{n.texImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Lt(N){wt.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),wt.copy(N))}function vt(N){Dt.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),Dt.copy(N))}function Nt(N,nt){let X=h.get(nt);X===void 0&&(X=new WeakMap,h.set(nt,X));let $=X.get(N);$===void 0&&($=n.getUniformBlockIndex(nt,N.name),X.set(N,$))}function zt(N,nt){const $=h.get(nt).get(N);o.get(nt)!==$&&(n.uniformBlockBinding(nt,$,N.__bindingPointIndex),o.set(nt,$))}function ne(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},H=null,rt={},c={},u=new WeakMap,d=[],f=null,_=!1,g=null,p=null,m=null,x=null,v=null,y=null,L=null,T=new Vt(0,0,0),b=0,C=!1,w=null,S=null,P=null,k=null,B=null,wt.set(0,0,n.canvas.width,n.canvas.height),Dt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:ft,disable:dt,bindFramebuffer:Tt,drawBuffers:Rt,useProgram:Bt,setBlending:ce,setMaterial:Zt,setFlipSided:Qt,setCullFace:Et,setLineWidth:ue,setPolygonOffset:It,setScissorTest:Ut,activeTexture:A,bindTexture:M,unbindTexture:z,compressedTexImage2D:K,compressedTexImage3D:Q,texImage2D:_t,texImage3D:kt,updateUBOMapping:Nt,uniformBlockBinding:zt,texStorage2D:Ot,texStorage3D:et,texSubImage2D:Z,texSubImage3D:bt,compressedTexSubImage2D:ut,compressedTexSubImage3D:gt,scissor:Lt,viewport:vt,reset:ne}}function Ul(n,t,e,i){const s=j_(i);switch(e){case wc:return n*t;case Tc:return n*t;case Ac:return n*t*2;case Pc:return n*t/s.components*s.byteLength;case ah:return n*t/s.components*s.byteLength;case Rc:return n*t*2/s.components*s.byteLength;case oh:return n*t*2/s.components*s.byteLength;case bc:return n*t*3/s.components*s.byteLength;case fn:return n*t*4/s.components*s.byteLength;case hh:return n*t*4/s.components*s.byteLength;case Ur:case Or:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Fr:case Gr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case fo:case mo:return Math.max(n,16)*Math.max(t,8)/4;case uo:case po:return Math.max(n,8)*Math.max(t,8)/2;case _o:case go:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case vo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Mo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case yo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case So:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Eo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case wo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case bo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case To:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Ao:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Po:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ro:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Co:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Lo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Io:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Br:case No:case Do:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Cc:case Uo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Oo:case Fo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function j_(n){switch(n){case Ln:case yc:return{byteLength:1,components:1};case Us:case Sc:case Ws:return{byteLength:2,components:1};case sh:case rh:return{byteLength:2,components:4};case fi:case ih:case Pn:return{byteLength:4,components:1};case Ec:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function K_(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new mt,c=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,M){return f?new OffscreenCanvas(A,M):Kr("canvas")}function g(A,M,z){let K=1;const Q=Ut(A);if((Q.width>z||Q.height>z)&&(K=z/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Z=Math.floor(K*Q.width),bt=Math.floor(K*Q.height);u===void 0&&(u=_(Z,bt));const ut=M?_(Z,bt):u;return ut.width=Z,ut.height=bt,ut.getContext("2d").drawImage(A,0,0,Z,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Z+"x"+bt+")."),ut}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function p(A){return A.generateMipmaps&&A.minFilter!==nn&&A.minFilter!==$e}function m(A){n.generateMipmap(A)}function x(A,M,z,K,Q=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Z=M;if(M===n.RED&&(z===n.FLOAT&&(Z=n.R32F),z===n.HALF_FLOAT&&(Z=n.R16F),z===n.UNSIGNED_BYTE&&(Z=n.R8)),M===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.R8UI),z===n.UNSIGNED_SHORT&&(Z=n.R16UI),z===n.UNSIGNED_INT&&(Z=n.R32UI),z===n.BYTE&&(Z=n.R8I),z===n.SHORT&&(Z=n.R16I),z===n.INT&&(Z=n.R32I)),M===n.RG&&(z===n.FLOAT&&(Z=n.RG32F),z===n.HALF_FLOAT&&(Z=n.RG16F),z===n.UNSIGNED_BYTE&&(Z=n.RG8)),M===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RG8UI),z===n.UNSIGNED_SHORT&&(Z=n.RG16UI),z===n.UNSIGNED_INT&&(Z=n.RG32UI),z===n.BYTE&&(Z=n.RG8I),z===n.SHORT&&(Z=n.RG16I),z===n.INT&&(Z=n.RG32I)),M===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),M===n.RGBA){const bt=Q?qr:Kt.getTransfer(K);z===n.FLOAT&&(Z=n.RGBA32F),z===n.HALF_FLOAT&&(Z=n.RGBA16F),z===n.UNSIGNED_BYTE&&(Z=bt===ee?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function v(A,M){let z;return A?M===null||M===fi||M===is?z=n.DEPTH24_STENCIL8:M===Pn?z=n.DEPTH32F_STENCIL8:M===Us&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===fi||M===is?z=n.DEPTH_COMPONENT24:M===Pn?z=n.DEPTH_COMPONENT32F:M===Us&&(z=n.DEPTH_COMPONENT16),z}function y(A,M){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==nn&&A.minFilter!==$e?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function L(A){const M=A.target;M.removeEventListener("dispose",L),b(M),M.isVideoTexture&&c.delete(M)}function T(A){const M=A.target;M.removeEventListener("dispose",T),w(M)}function b(A){const M=i.get(A);if(M.__webglInit===void 0)return;const z=A.source,K=d.get(z);if(K){const Q=K[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&C(A),Object.keys(K).length===0&&d.delete(z)}i.remove(A)}function C(A){const M=i.get(A);n.deleteTexture(M.__webglTexture);const z=A.source,K=d.get(z);delete K[M.__cacheKey],a.memory.textures--}function w(A){const M=i.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(M.__webglFramebuffer[K]))for(let Q=0;Q<M.__webglFramebuffer[K].length;Q++)n.deleteFramebuffer(M.__webglFramebuffer[K][Q]);else n.deleteFramebuffer(M.__webglFramebuffer[K]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[K])}else{if(Array.isArray(M.__webglFramebuffer))for(let K=0;K<M.__webglFramebuffer.length;K++)n.deleteFramebuffer(M.__webglFramebuffer[K]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let K=0;K<M.__webglColorRenderbuffer.length;K++)M.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[K]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const z=A.textures;for(let K=0,Q=z.length;K<Q;K++){const Z=i.get(z[K]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),a.memory.textures--),i.remove(z[K])}i.remove(A)}let S=0;function P(){S=0}function k(){const A=S;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),S+=1,A}function B(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function q(A,M){const z=i.get(A);if(A.isVideoTexture&&ue(A),A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Dt(z,A,M);return}}e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+M)}function Y(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){Dt(z,A,M);return}e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+M)}function W(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){Dt(z,A,M);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+M)}function j(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){V(z,A,M);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+M)}const H={[lo]:n.REPEAT,[ci]:n.CLAMP_TO_EDGE,[co]:n.MIRRORED_REPEAT},rt={[nn]:n.NEAREST,[Sf]:n.NEAREST_MIPMAP_NEAREST,[nr]:n.NEAREST_MIPMAP_LINEAR,[$e]:n.LINEAR,[wa]:n.LINEAR_MIPMAP_NEAREST,[ui]:n.LINEAR_MIPMAP_LINEAR},ot={[Af]:n.NEVER,[Nf]:n.ALWAYS,[Pf]:n.LESS,[Lc]:n.LEQUAL,[Rf]:n.EQUAL,[If]:n.GEQUAL,[Cf]:n.GREATER,[Lf]:n.NOTEQUAL};function ct(A,M){if(M.type===Pn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===$e||M.magFilter===wa||M.magFilter===nr||M.magFilter===ui||M.minFilter===$e||M.minFilter===wa||M.minFilter===nr||M.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,H[M.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,H[M.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,H[M.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,rt[M.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,rt[M.minFilter]),M.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ot[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===nn||M.minFilter!==nr&&M.minFilter!==ui||M.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function wt(A,M){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",L));const K=M.source;let Q=d.get(K);Q===void 0&&(Q={},d.set(K,Q));const Z=B(M);if(Z!==A.__cacheKey){Q[Z]===void 0&&(Q[Z]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Q[Z].usedTimes++;const bt=Q[A.__cacheKey];bt!==void 0&&(Q[A.__cacheKey].usedTimes--,bt.usedTimes===0&&C(M)),A.__cacheKey=Z,A.__webglTexture=Q[Z].texture}return z}function Dt(A,M,z){let K=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(K=n.TEXTURE_3D);const Q=wt(A,M),Z=M.source;e.bindTexture(K,A.__webglTexture,n.TEXTURE0+z);const bt=i.get(Z);if(Z.version!==bt.__version||Q===!0){e.activeTexture(n.TEXTURE0+z);const ut=Kt.getPrimaries(Kt.workingColorSpace),gt=M.colorSpace===Hn?null:Kt.getPrimaries(M.colorSpace),Ot=M.colorSpace===Hn||ut===gt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot);let et=g(M.image,!1,s.maxTextureSize);et=It(M,et);const _t=r.convert(M.format,M.colorSpace),kt=r.convert(M.type);let Lt=x(M.internalFormat,_t,kt,M.colorSpace,M.isVideoTexture);ct(K,M);let vt;const Nt=M.mipmaps,zt=M.isVideoTexture!==!0,ne=bt.__version===void 0||Q===!0,N=Z.dataReady,nt=y(M,et);if(M.isDepthTexture)Lt=v(M.format===ss,M.type),ne&&(zt?e.texStorage2D(n.TEXTURE_2D,1,Lt,et.width,et.height):e.texImage2D(n.TEXTURE_2D,0,Lt,et.width,et.height,0,_t,kt,null));else if(M.isDataTexture)if(Nt.length>0){zt&&ne&&e.texStorage2D(n.TEXTURE_2D,nt,Lt,Nt[0].width,Nt[0].height);for(let X=0,$=Nt.length;X<$;X++)vt=Nt[X],zt?N&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,vt.width,vt.height,_t,kt,vt.data):e.texImage2D(n.TEXTURE_2D,X,Lt,vt.width,vt.height,0,_t,kt,vt.data);M.generateMipmaps=!1}else zt?(ne&&e.texStorage2D(n.TEXTURE_2D,nt,Lt,et.width,et.height),N&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,et.width,et.height,_t,kt,et.data)):e.texImage2D(n.TEXTURE_2D,0,Lt,et.width,et.height,0,_t,kt,et.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){zt&&ne&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,Lt,Nt[0].width,Nt[0].height,et.depth);for(let X=0,$=Nt.length;X<$;X++)if(vt=Nt[X],M.format!==fn)if(_t!==null)if(zt){if(N)if(M.layerUpdates.size>0){const at=Ul(vt.width,vt.height,M.format,M.type);for(const At of M.layerUpdates){const Ht=vt.data.subarray(At*at/vt.data.BYTES_PER_ELEMENT,(At+1)*at/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,At,vt.width,vt.height,1,_t,Ht,0,0)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,vt.width,vt.height,et.depth,_t,vt.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,X,Lt,vt.width,vt.height,et.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?N&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,vt.width,vt.height,et.depth,_t,kt,vt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,X,Lt,vt.width,vt.height,et.depth,0,_t,kt,vt.data)}else{zt&&ne&&e.texStorage2D(n.TEXTURE_2D,nt,Lt,Nt[0].width,Nt[0].height);for(let X=0,$=Nt.length;X<$;X++)vt=Nt[X],M.format!==fn?_t!==null?zt?N&&e.compressedTexSubImage2D(n.TEXTURE_2D,X,0,0,vt.width,vt.height,_t,vt.data):e.compressedTexImage2D(n.TEXTURE_2D,X,Lt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?N&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,vt.width,vt.height,_t,kt,vt.data):e.texImage2D(n.TEXTURE_2D,X,Lt,vt.width,vt.height,0,_t,kt,vt.data)}else if(M.isDataArrayTexture)if(zt){if(ne&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,Lt,et.width,et.height,et.depth),N)if(M.layerUpdates.size>0){const X=Ul(et.width,et.height,M.format,M.type);for(const $ of M.layerUpdates){const at=et.data.subarray($*X/et.data.BYTES_PER_ELEMENT,($+1)*X/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,et.width,et.height,1,_t,kt,at)}M.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,_t,kt,et.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Lt,et.width,et.height,et.depth,0,_t,kt,et.data);else if(M.isData3DTexture)zt?(ne&&e.texStorage3D(n.TEXTURE_3D,nt,Lt,et.width,et.height,et.depth),N&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,_t,kt,et.data)):e.texImage3D(n.TEXTURE_3D,0,Lt,et.width,et.height,et.depth,0,_t,kt,et.data);else if(M.isFramebufferTexture){if(ne)if(zt)e.texStorage2D(n.TEXTURE_2D,nt,Lt,et.width,et.height);else{let X=et.width,$=et.height;for(let at=0;at<nt;at++)e.texImage2D(n.TEXTURE_2D,at,Lt,X,$,0,_t,kt,null),X>>=1,$>>=1}}else if(Nt.length>0){if(zt&&ne){const X=Ut(Nt[0]);e.texStorage2D(n.TEXTURE_2D,nt,Lt,X.width,X.height)}for(let X=0,$=Nt.length;X<$;X++)vt=Nt[X],zt?N&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,_t,kt,vt):e.texImage2D(n.TEXTURE_2D,X,Lt,_t,kt,vt);M.generateMipmaps=!1}else if(zt){if(ne){const X=Ut(et);e.texStorage2D(n.TEXTURE_2D,nt,Lt,X.width,X.height)}N&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,kt,et)}else e.texImage2D(n.TEXTURE_2D,0,Lt,_t,kt,et);p(M)&&m(K),bt.__version=Z.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function V(A,M,z){if(M.image.length!==6)return;const K=wt(A,M),Q=M.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+z);const Z=i.get(Q);if(Q.version!==Z.__version||K===!0){e.activeTexture(n.TEXTURE0+z);const bt=Kt.getPrimaries(Kt.workingColorSpace),ut=M.colorSpace===Hn?null:Kt.getPrimaries(M.colorSpace),gt=M.colorSpace===Hn||bt===ut?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const Ot=M.isCompressedTexture||M.image[0].isCompressedTexture,et=M.image[0]&&M.image[0].isDataTexture,_t=[];for(let $=0;$<6;$++)!Ot&&!et?_t[$]=g(M.image[$],!0,s.maxCubemapSize):_t[$]=et?M.image[$].image:M.image[$],_t[$]=It(M,_t[$]);const kt=_t[0],Lt=r.convert(M.format,M.colorSpace),vt=r.convert(M.type),Nt=x(M.internalFormat,Lt,vt,M.colorSpace),zt=M.isVideoTexture!==!0,ne=Z.__version===void 0||K===!0,N=Q.dataReady;let nt=y(M,kt);ct(n.TEXTURE_CUBE_MAP,M);let X;if(Ot){zt&&ne&&e.texStorage2D(n.TEXTURE_CUBE_MAP,nt,Nt,kt.width,kt.height);for(let $=0;$<6;$++){X=_t[$].mipmaps;for(let at=0;at<X.length;at++){const At=X[at];M.format!==fn?Lt!==null?zt?N&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,at,0,0,At.width,At.height,Lt,At.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,at,Nt,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,at,0,0,At.width,At.height,Lt,vt,At.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,at,Nt,At.width,At.height,0,Lt,vt,At.data)}}}else{if(X=M.mipmaps,zt&&ne){X.length>0&&nt++;const $=Ut(_t[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,nt,Nt,$.width,$.height)}for(let $=0;$<6;$++)if(et){zt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,_t[$].width,_t[$].height,Lt,vt,_t[$].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Nt,_t[$].width,_t[$].height,0,Lt,vt,_t[$].data);for(let at=0;at<X.length;at++){const Ht=X[at].image[$].image;zt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,at+1,0,0,Ht.width,Ht.height,Lt,vt,Ht.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,at+1,Nt,Ht.width,Ht.height,0,Lt,vt,Ht.data)}}else{zt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Lt,vt,_t[$]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Nt,Lt,vt,_t[$]);for(let at=0;at<X.length;at++){const At=X[at];zt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,at+1,0,0,Lt,vt,At.image[$]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,at+1,Nt,Lt,vt,At.image[$])}}}p(M)&&m(n.TEXTURE_CUBE_MAP),Z.__version=Q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function tt(A,M,z,K,Q,Z){const bt=r.convert(z.format,z.colorSpace),ut=r.convert(z.type),gt=x(z.internalFormat,bt,ut,z.colorSpace);if(!i.get(M).__hasExternalTextures){const et=Math.max(1,M.width>>Z),_t=Math.max(1,M.height>>Z);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?e.texImage3D(Q,Z,gt,et,_t,M.depth,0,bt,ut,null):e.texImage2D(Q,Z,gt,et,_t,0,bt,ut,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),Et(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,Q,i.get(z).__webglTexture,0,Qt(M)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,Q,i.get(z).__webglTexture,Z),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ft(A,M,z){if(n.bindRenderbuffer(n.RENDERBUFFER,A),M.depthBuffer){const K=M.depthTexture,Q=K&&K.isDepthTexture?K.type:null,Z=v(M.stencilBuffer,Q),bt=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=Qt(M);Et(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ut,Z,M.width,M.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,ut,Z,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,Z,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,bt,n.RENDERBUFFER,A)}else{const K=M.textures;for(let Q=0;Q<K.length;Q++){const Z=K[Q],bt=r.convert(Z.format,Z.colorSpace),ut=r.convert(Z.type),gt=x(Z.internalFormat,bt,ut,Z.colorSpace),Ot=Qt(M);z&&Et(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ot,gt,M.width,M.height):Et(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ot,gt,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,gt,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function dt(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),q(M.depthTexture,0);const K=i.get(M.depthTexture).__webglTexture,Q=Qt(M);if(M.depthTexture.format===ji)Et(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(M.depthTexture.format===ss)Et(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Tt(A){const M=i.get(A),z=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const K=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),K){const Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=K}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");dt(M.__webglFramebuffer,A)}else if(z){M.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[K]),M.__webglDepthbuffer[K]===void 0)M.__webglDepthbuffer[K]=n.createRenderbuffer(),ft(M.__webglDepthbuffer[K],A,!1);else{const Q=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),ft(M.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,Q)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Rt(A,M,z){const K=i.get(A);M!==void 0&&tt(K.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Tt(A)}function Bt(A){const M=A.texture,z=i.get(A),K=i.get(M);A.addEventListener("dispose",T);const Q=A.textures,Z=A.isWebGLCubeRenderTarget===!0,bt=Q.length>1;if(bt||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=M.version,a.memory.textures++),Z){z.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[ut]=[];for(let gt=0;gt<M.mipmaps.length;gt++)z.__webglFramebuffer[ut][gt]=n.createFramebuffer()}else z.__webglFramebuffer[ut]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let ut=0;ut<M.mipmaps.length;ut++)z.__webglFramebuffer[ut]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(bt)for(let ut=0,gt=Q.length;ut<gt;ut++){const Ot=i.get(Q[ut]);Ot.__webglTexture===void 0&&(Ot.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Et(A)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ut=0;ut<Q.length;ut++){const gt=Q[ut];z.__webglColorRenderbuffer[ut]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[ut]);const Ot=r.convert(gt.format,gt.colorSpace),et=r.convert(gt.type),_t=x(gt.internalFormat,Ot,et,gt.colorSpace,A.isXRRenderTarget===!0),kt=Qt(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,kt,_t,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.RENDERBUFFER,z.__webglColorRenderbuffer[ut])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),ft(z.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),ct(n.TEXTURE_CUBE_MAP,M);for(let ut=0;ut<6;ut++)if(M.mipmaps&&M.mipmaps.length>0)for(let gt=0;gt<M.mipmaps.length;gt++)tt(z.__webglFramebuffer[ut][gt],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,gt);else tt(z.__webglFramebuffer[ut],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);p(M)&&m(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let ut=0,gt=Q.length;ut<gt;ut++){const Ot=Q[ut],et=i.get(Ot);e.bindTexture(n.TEXTURE_2D,et.__webglTexture),ct(n.TEXTURE_2D,Ot),tt(z.__webglFramebuffer,A,Ot,n.COLOR_ATTACHMENT0+ut,n.TEXTURE_2D,0),p(Ot)&&m(n.TEXTURE_2D)}e.unbindTexture()}else{let ut=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ut=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ut,K.__webglTexture),ct(ut,M),M.mipmaps&&M.mipmaps.length>0)for(let gt=0;gt<M.mipmaps.length;gt++)tt(z.__webglFramebuffer[gt],A,M,n.COLOR_ATTACHMENT0,ut,gt);else tt(z.__webglFramebuffer,A,M,n.COLOR_ATTACHMENT0,ut,0);p(M)&&m(ut),e.unbindTexture()}A.depthBuffer&&Tt(A)}function Jt(A){const M=A.textures;for(let z=0,K=M.length;z<K;z++){const Q=M[z];if(p(Q)){const Z=A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,bt=i.get(Q).__webglTexture;e.bindTexture(Z,bt),m(Z),e.unbindTexture()}}}const R=[],ce=[];function Zt(A){if(A.samples>0){if(Et(A)===!1){const M=A.textures,z=A.width,K=A.height;let Q=n.COLOR_BUFFER_BIT;const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,bt=i.get(A),ut=M.length>1;if(ut)for(let gt=0;gt<M.length;gt++)e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let gt=0;gt<M.length;gt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),ut){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,bt.__webglColorRenderbuffer[gt]);const Ot=i.get(M[gt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ot,0)}n.blitFramebuffer(0,0,z,K,0,0,z,K,Q,n.NEAREST),h===!0&&(R.length=0,ce.length=0,R.push(n.COLOR_ATTACHMENT0+gt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(R.push(Z),ce.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ce)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,R))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ut)for(let gt=0;gt<M.length;gt++){e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,bt.__webglColorRenderbuffer[gt]);const Ot=i.get(M[gt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,Ot,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&h){const M=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Qt(A){return Math.min(s.maxSamples,A.samples)}function Et(A){const M=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ue(A){const M=a.render.frame;c.get(A)!==M&&(c.set(A,M),A.update())}function It(A,M){const z=A.colorSpace,K=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==Kn&&z!==Hn&&(Kt.getTransfer(z)===ee?(K!==fn||Q!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}function Ut(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=P,this.setTexture2D=q,this.setTexture2DArray=Y,this.setTexture3D=W,this.setTextureCube=j,this.rebindTextures=Rt,this.setupRenderTarget=Bt,this.updateRenderTargetMipmap=Jt,this.updateMultisampleRenderTarget=Zt,this.setupDepthRenderbuffer=Tt,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=Et}function Z_(n,t){function e(i,s=Hn){let r;const a=Kt.getTransfer(s);if(i===Ln)return n.UNSIGNED_BYTE;if(i===sh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===rh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ec)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===yc)return n.BYTE;if(i===Sc)return n.SHORT;if(i===Us)return n.UNSIGNED_SHORT;if(i===ih)return n.INT;if(i===fi)return n.UNSIGNED_INT;if(i===Pn)return n.FLOAT;if(i===Ws)return n.HALF_FLOAT;if(i===wc)return n.ALPHA;if(i===bc)return n.RGB;if(i===fn)return n.RGBA;if(i===Tc)return n.LUMINANCE;if(i===Ac)return n.LUMINANCE_ALPHA;if(i===ji)return n.DEPTH_COMPONENT;if(i===ss)return n.DEPTH_STENCIL;if(i===Pc)return n.RED;if(i===ah)return n.RED_INTEGER;if(i===Rc)return n.RG;if(i===oh)return n.RG_INTEGER;if(i===hh)return n.RGBA_INTEGER;if(i===Ur||i===Or||i===Fr||i===Gr)if(a===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ur)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ur)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Gr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===uo||i===fo||i===po||i===mo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===uo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===fo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===po)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===mo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_o||i===go||i===vo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===_o||i===go)return a===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===vo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Mo||i===xo||i===yo||i===So||i===Eo||i===wo||i===bo||i===To||i===Ao||i===Po||i===Ro||i===Co||i===Lo||i===Io)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Mo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===xo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===yo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===So)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Eo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===wo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===bo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===To)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ao)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Po)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ro)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Co)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Lo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Io)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Br||i===No||i===Do)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Br)return a===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===No)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Do)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Cc||i===Uo||i===Oo||i===Fo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Br)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Uo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Oo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Fo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===is?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class J_ extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class gn extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Q_={type:"move"};class ja{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const g of t.hand.values()){const p=e.getJointPose(g,i),m=this._getHandJoint(l,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const c=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=c.position.distanceTo(u.position),f=.02,_=.005;l.inputState.pinching&&d>f+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Q_)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new gn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const tg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,eg=`
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

}`;class ng{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new De,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Yn({vertexShader:tg,fragmentShader:eg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ie(new ls(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ig extends vi{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",h=1,l=null,c=null,u=null,d=null,f=null,_=null;const g=new ng,p=e.getContextAttributes();let m=null,x=null;const v=[],y=[],L=new mt;let T=null;const b=new tn;b.layers.enable(1),b.viewport=new xe;const C=new tn;C.layers.enable(2),C.viewport=new xe;const w=[b,C],S=new J_;S.layers.enable(1),S.layers.enable(2);let P=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let tt=v[V];return tt===void 0&&(tt=new ja,v[V]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(V){let tt=v[V];return tt===void 0&&(tt=new ja,v[V]=tt),tt.getGripSpace()},this.getHand=function(V){let tt=v[V];return tt===void 0&&(tt=new ja,v[V]=tt),tt.getHandSpace()};function B(V){const tt=y.indexOf(V.inputSource);if(tt===-1)return;const ft=v[tt];ft!==void 0&&(ft.update(V.inputSource,V.frame,l||a),ft.dispatchEvent({type:V.type,data:V.inputSource}))}function q(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",Y);for(let V=0;V<v.length;V++){const tt=y[V];tt!==null&&(y[V]=null,v[V].disconnect(tt))}P=null,k=null,g.reset(),t.setRenderTarget(m),f=null,d=null,u=null,s=null,x=null,Dt.stop(),i.isPresenting=!1,t.setPixelRatio(T),t.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",q),s.addEventListener("inputsourceschange",Y),p.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const tt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new di(f.framebufferWidth,f.framebufferHeight,{format:fn,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let tt=null,ft=null,dt=null;p.depth&&(dt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=p.stencil?ss:ji,ft=p.stencil?is:fi);const Tt={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Tt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new di(d.textureWidth,d.textureHeight,{format:fn,type:Ln,depthTexture:new Wc(d.textureWidth,d.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(h),l=null,a=await s.requestReferenceSpace(o),Dt.setContext(s),Dt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Y(V){for(let tt=0;tt<V.removed.length;tt++){const ft=V.removed[tt],dt=y.indexOf(ft);dt>=0&&(y[dt]=null,v[dt].disconnect(ft))}for(let tt=0;tt<V.added.length;tt++){const ft=V.added[tt];let dt=y.indexOf(ft);if(dt===-1){for(let Rt=0;Rt<v.length;Rt++)if(Rt>=y.length){y.push(ft),dt=Rt;break}else if(y[Rt]===null){y[Rt]=ft,dt=Rt;break}if(dt===-1)break}const Tt=v[dt];Tt&&Tt.connect(ft)}}const W=new I,j=new I;function H(V,tt,ft){W.setFromMatrixPosition(tt.matrixWorld),j.setFromMatrixPosition(ft.matrixWorld);const dt=W.distanceTo(j),Tt=tt.projectionMatrix.elements,Rt=ft.projectionMatrix.elements,Bt=Tt[14]/(Tt[10]-1),Jt=Tt[14]/(Tt[10]+1),R=(Tt[9]+1)/Tt[5],ce=(Tt[9]-1)/Tt[5],Zt=(Tt[8]-1)/Tt[0],Qt=(Rt[8]+1)/Rt[0],Et=Bt*Zt,ue=Bt*Qt,It=dt/(-Zt+Qt),Ut=It*-Zt;if(tt.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Ut),V.translateZ(It),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),Tt[10]===-1)V.projectionMatrix.copy(tt.projectionMatrix),V.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const A=Bt+It,M=Jt+It,z=Et-Ut,K=ue+(dt-Ut),Q=R*Jt/M*A,Z=ce*Jt/M*A;V.projectionMatrix.makePerspective(z,K,Q,Z,A,M),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function rt(V,tt){tt===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(tt.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let tt=V.near,ft=V.far;g.texture!==null&&(g.depthNear>0&&(tt=g.depthNear),g.depthFar>0&&(ft=g.depthFar)),S.near=C.near=b.near=tt,S.far=C.far=b.far=ft,(P!==S.near||k!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),P=S.near,k=S.far);const dt=V.parent,Tt=S.cameras;rt(S,dt);for(let Rt=0;Rt<Tt.length;Rt++)rt(Tt[Rt],dt);Tt.length===2?H(S,b,C):S.projectionMatrix.copy(b.projectionMatrix),ot(V,S,dt)};function ot(V,tt,ft){ft===null?V.matrix.copy(tt.matrixWorld):(V.matrix.copy(ft.matrixWorld),V.matrix.invert(),V.matrix.multiply(tt.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(tt.projectionMatrix),V.projectionMatrixInverse.copy(tt.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Os*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&f===null))return h},this.setFoveation=function(V){h=V,d!==null&&(d.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(S)};let ct=null;function wt(V,tt){if(c=tt.getViewerPose(l||a),_=tt,c!==null){const ft=c.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let dt=!1;ft.length!==S.cameras.length&&(S.cameras.length=0,dt=!0);for(let Rt=0;Rt<ft.length;Rt++){const Bt=ft[Rt];let Jt=null;if(f!==null)Jt=f.getViewport(Bt);else{const ce=u.getViewSubImage(d,Bt);Jt=ce.viewport,Rt===0&&(t.setRenderTargetTextures(x,ce.colorTexture,d.ignoreDepthValues?void 0:ce.depthStencilTexture),t.setRenderTarget(x))}let R=w[Rt];R===void 0&&(R=new tn,R.layers.enable(Rt),R.viewport=new xe,w[Rt]=R),R.matrix.fromArray(Bt.transform.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale),R.projectionMatrix.fromArray(Bt.projectionMatrix),R.projectionMatrixInverse.copy(R.projectionMatrix).invert(),R.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),Rt===0&&(S.matrix.copy(R.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),dt===!0&&S.cameras.push(R)}const Tt=s.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")){const Rt=u.getDepthInformation(ft[0]);Rt&&Rt.isValid&&Rt.texture&&g.init(t,Rt,s.renderState)}}for(let ft=0;ft<v.length;ft++){const dt=y[ft],Tt=v[ft];dt!==null&&Tt!==void 0&&Tt.update(dt,tt,l||a)}ct&&ct(V,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),_=null}const Dt=new Vc;Dt.setAnimationLoop(wt),this.setAnimationLoop=function(V){ct=V},this.dispose=function(){}}}const si=new In,sg=new he;function rg(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Bc(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,x,v,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),c(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,y)):m.isMeshMatcapMaterial?(r(p,m),_(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),g(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?h(p,m,x,v):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===ze&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===ze&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=t.get(m),v=x.envMap,y=x.envMapRotation;v&&(p.envMap.value=v,si.copy(y),si.x*=-1,si.y*=-1,si.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),p.envMapRotation.value.setFromMatrix4(sg.makeRotationFromEuler(si)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function h(p,m,x,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ze&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const x=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ag(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function h(x,v){const y=v.program;i.uniformBlockBinding(x,y)}function l(x,v){let y=s[x.id];y===void 0&&(_(x),y=c(x),s[x.id]=y,x.addEventListener("dispose",p));const L=v.program;i.updateUBOMapping(x,L);const T=t.render.frame;r[x.id]!==T&&(d(x),r[x.id]=T)}function c(x){const v=u();x.__bindingPointIndex=v;const y=n.createBuffer(),L=x.__size,T=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,L,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,y),y}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const v=s[x.id],y=x.uniforms,L=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let T=0,b=y.length;T<b;T++){const C=Array.isArray(y[T])?y[T]:[y[T]];for(let w=0,S=C.length;w<S;w++){const P=C[w];if(f(P,T,w,L)===!0){const k=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let q=0;for(let Y=0;Y<B.length;Y++){const W=B[Y],j=g(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,k+q,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,q),q+=j.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(x,v,y,L){const T=x.value,b=v+"_"+y;if(L[b]===void 0)return typeof T=="number"||typeof T=="boolean"?L[b]=T:L[b]=T.clone(),!0;{const C=L[b];if(typeof T=="number"||typeof T=="boolean"){if(C!==T)return L[b]=T,!0}else if(C.equals(T)===!1)return C.copy(T),!0}return!1}function _(x){const v=x.uniforms;let y=0;const L=16;for(let b=0,C=v.length;b<C;b++){const w=Array.isArray(v[b])?v[b]:[v[b]];for(let S=0,P=w.length;S<P;S++){const k=w[S],B=Array.isArray(k.value)?k.value:[k.value];for(let q=0,Y=B.length;q<Y;q++){const W=B[q],j=g(W),H=y%L,rt=H%j.boundary,ot=H+rt;y+=rt,ot!==0&&L-ot<j.storage&&(y+=L-ot),k.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=j.storage}}}const T=y%L;return T>0&&(y+=L-T),x.__size=y,x.__cache={},this}function g(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const y=a.indexOf(v.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function m(){for(const x in s)n.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:h,update:l,dispose:m}}class og{constructor(t={}){const{canvas:e=Kf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=a;const f=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=un,this.toneMapping=Xn,this.toneMappingExposure=1;const v=this;let y=!1,L=0,T=0,b=null,C=-1,w=null;const S=new xe,P=new xe;let k=null;const B=new Vt(0);let q=0,Y=e.width,W=e.height,j=1,H=null,rt=null;const ot=new xe(0,0,Y,W),ct=new xe(0,0,Y,W);let wt=!1;const Dt=new Hc;let V=!1,tt=!1;const ft=new he,dt=new I,Tt=new xe,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Bt=!1;function Jt(){return b===null?j:1}let R=i;function ce(E,D){return e.getContext(E,D)}try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${nh}`),e.addEventListener("webglcontextlost",X,!1),e.addEventListener("webglcontextrestored",$,!1),e.addEventListener("webglcontextcreationerror",at,!1),R===null){const D="webgl2";if(R=ce(D,E),R===null)throw ce(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Zt,Qt,Et,ue,It,Ut,A,M,z,K,Q,Z,bt,ut,gt,Ot,et,_t,kt,Lt,vt,Nt,zt,ne;function N(){Zt=new d0(R),Zt.init(),Nt=new Z_(R,Zt),Qt=new a0(R,Zt,t,Nt),Et=new $_(R),ue=new _0(R),It=new D_,Ut=new K_(R,Zt,Et,It,Qt,Nt,ue),A=new h0(v),M=new f0(v),z=new Sd(R),zt=new s0(R,z),K=new p0(R,z,ue,zt),Q=new v0(R,K,z,ue),kt=new g0(R,Qt,Ut),Ot=new o0(It),Z=new N_(v,A,M,Zt,Qt,zt,Ot),bt=new rg(v,It),ut=new O_,gt=new H_(Zt),_t=new i0(v,A,M,Et,Q,d,h),et=new Y_(v,Q,Qt),ne=new ag(R,ue,Qt,Et),Lt=new r0(R,Zt,ue),vt=new m0(R,Zt,ue),ue.programs=Z.programs,v.capabilities=Qt,v.extensions=Zt,v.properties=It,v.renderLists=ut,v.shadowMap=et,v.state=Et,v.info=ue}N();const nt=new ig(v,R);this.xr=nt,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const E=Zt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Zt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(E){E!==void 0&&(j=E,this.setSize(Y,W,!1))},this.getSize=function(E){return E.set(Y,W)},this.setSize=function(E,D,F=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=E,W=D,e.width=Math.floor(E*j),e.height=Math.floor(D*j),F===!0&&(e.style.width=E+"px",e.style.height=D+"px"),this.setViewport(0,0,E,D)},this.getDrawingBufferSize=function(E){return E.set(Y*j,W*j).floor()},this.setDrawingBufferSize=function(E,D,F){Y=E,W=D,j=F,e.width=Math.floor(E*F),e.height=Math.floor(D*F),this.setViewport(0,0,E,D)},this.getCurrentViewport=function(E){return E.copy(S)},this.getViewport=function(E){return E.copy(ot)},this.setViewport=function(E,D,F,G){E.isVector4?ot.set(E.x,E.y,E.z,E.w):ot.set(E,D,F,G),Et.viewport(S.copy(ot).multiplyScalar(j).round())},this.getScissor=function(E){return E.copy(ct)},this.setScissor=function(E,D,F,G){E.isVector4?ct.set(E.x,E.y,E.z,E.w):ct.set(E,D,F,G),Et.scissor(P.copy(ct).multiplyScalar(j).round())},this.getScissorTest=function(){return wt},this.setScissorTest=function(E){Et.setScissorTest(wt=E)},this.setOpaqueSort=function(E){H=E},this.setTransparentSort=function(E){rt=E},this.getClearColor=function(E){return E.copy(_t.getClearColor())},this.setClearColor=function(){_t.setClearColor.apply(_t,arguments)},this.getClearAlpha=function(){return _t.getClearAlpha()},this.setClearAlpha=function(){_t.setClearAlpha.apply(_t,arguments)},this.clear=function(E=!0,D=!0,F=!0){let G=0;if(E){let U=!1;if(b!==null){const it=b.texture.format;U=it===hh||it===oh||it===ah}if(U){const it=b.texture.type,pt=it===Ln||it===fi||it===Us||it===is||it===sh||it===rh,Mt=_t.getClearColor(),xt=_t.getClearAlpha(),Pt=Mt.r,Ct=Mt.g,yt=Mt.b;pt?(f[0]=Pt,f[1]=Ct,f[2]=yt,f[3]=xt,R.clearBufferuiv(R.COLOR,0,f)):(_[0]=Pt,_[1]=Ct,_[2]=yt,_[3]=xt,R.clearBufferiv(R.COLOR,0,_))}else G|=R.COLOR_BUFFER_BIT}D&&(G|=R.DEPTH_BUFFER_BIT),F&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",X,!1),e.removeEventListener("webglcontextrestored",$,!1),e.removeEventListener("webglcontextcreationerror",at,!1),ut.dispose(),gt.dispose(),It.dispose(),A.dispose(),M.dispose(),Q.dispose(),zt.dispose(),ne.dispose(),Z.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",pn),nt.removeEventListener("sessionend",Ih),Jn.stop()};function X(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const E=ue.autoReset,D=et.enabled,F=et.autoUpdate,G=et.needsUpdate,U=et.type;N(),ue.autoReset=E,et.enabled=D,et.autoUpdate=F,et.needsUpdate=G,et.type=U}function at(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function At(E){const D=E.target;D.removeEventListener("dispose",At),Ht(D)}function Ht(E){fe(E),It.remove(E)}function fe(E){const D=It.get(E).programs;D!==void 0&&(D.forEach(function(F){Z.releaseProgram(F)}),E.isShaderMaterial&&Z.releaseShaderCache(E))}this.renderBufferDirect=function(E,D,F,G,U,it){D===null&&(D=Rt);const pt=U.isMesh&&U.matrixWorld.determinant()<0,Mt=Iu(E,D,F,G,U);Et.setMaterial(G,pt);let xt=F.index,Pt=1;if(G.wireframe===!0){if(xt=K.getWireframeAttribute(F),xt===void 0)return;Pt=2}const Ct=F.drawRange,yt=F.attributes.position;let Xt=Ct.start*Pt,re=(Ct.start+Ct.count)*Pt;it!==null&&(Xt=Math.max(Xt,it.start*Pt),re=Math.min(re,(it.start+it.count)*Pt)),xt!==null?(Xt=Math.max(Xt,0),re=Math.min(re,xt.count)):yt!=null&&(Xt=Math.max(Xt,0),re=Math.min(re,yt.count));const ae=re-Xt;if(ae<0||ae===1/0)return;zt.setup(U,G,Mt,F,xt);let Ve,qt=Lt;if(xt!==null&&(Ve=z.get(xt),qt=vt,qt.setIndex(Ve)),U.isMesh)G.wireframe===!0?(Et.setLineWidth(G.wireframeLinewidth*Jt()),qt.setMode(R.LINES)):qt.setMode(R.TRIANGLES);else if(U.isLine){let St=G.linewidth;St===void 0&&(St=1),Et.setLineWidth(St*Jt()),U.isLineSegments?qt.setMode(R.LINES):U.isLineLoop?qt.setMode(R.LINE_LOOP):qt.setMode(R.LINE_STRIP)}else U.isPoints?qt.setMode(R.POINTS):U.isSprite&&qt.setMode(R.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)qt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))qt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const St=U._multiDrawStarts,Se=U._multiDrawCounts,Yt=U._multiDrawCount,rn=xt?z.get(xt).bytesPerElement:1,xi=It.get(G).currentProgram.getUniforms();for(let We=0;We<Yt;We++)xi.setValue(R,"_gl_DrawID",We),qt.render(St[We]/rn,Se[We])}else if(U.isInstancedMesh)qt.renderInstances(Xt,ae,U.count);else if(F.isInstancedBufferGeometry){const St=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Se=Math.min(F.instanceCount,St);qt.renderInstances(Xt,ae,Se)}else qt.render(Xt,ae)};function ye(E,D,F){E.transparent===!0&&E.side===en&&E.forceSinglePass===!1?(E.side=ze,E.needsUpdate=!0,er(E,D,F),E.side=qn,E.needsUpdate=!0,er(E,D,F),E.side=en):er(E,D,F)}this.compile=function(E,D,F=null){F===null&&(F=E),p=gt.get(F),p.init(D),x.push(p),F.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),E!==F&&E.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();const G=new Set;return E.traverse(function(U){const it=U.material;if(it)if(Array.isArray(it))for(let pt=0;pt<it.length;pt++){const Mt=it[pt];ye(Mt,F,U),G.add(Mt)}else ye(it,F,U),G.add(it)}),x.pop(),p=null,G},this.compileAsync=function(E,D,F=null){const G=this.compile(E,D,F);return new Promise(U=>{function it(){if(G.forEach(function(pt){It.get(pt).currentProgram.isReady()&&G.delete(pt)}),G.size===0){U(E);return}setTimeout(it,10)}Zt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Wt=null;function yn(E){Wt&&Wt(E)}function pn(){Jn.stop()}function Ih(){Jn.start()}const Jn=new Vc;Jn.setAnimationLoop(yn),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(E){Wt=E,nt.setAnimationLoop(E),E===null?Jn.stop():Jn.start()},nt.addEventListener("sessionstart",pn),nt.addEventListener("sessionend",Ih),this.render=function(E,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(D),D=nt.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,D,b),p=gt.get(E,x.length),p.init(D),x.push(p),ft.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Dt.setFromProjectionMatrix(ft),tt=this.localClippingEnabled,V=Ot.init(this.clippingPlanes,tt),g=ut.get(E,m.length),g.init(),m.push(g),nt.enabled===!0&&nt.isPresenting===!0){const it=v.xr.getDepthSensingMesh();it!==null&&xa(it,D,-1/0,v.sortObjects)}xa(E,D,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(H,rt),Bt=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,Bt&&_t.addToRenderList(g,E),this.info.render.frame++,V===!0&&Ot.beginShadows();const F=p.state.shadowsArray;et.render(F,E,D),V===!0&&Ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=g.opaque,U=g.transmissive;if(p.setupLights(),D.isArrayCamera){const it=D.cameras;if(U.length>0)for(let pt=0,Mt=it.length;pt<Mt;pt++){const xt=it[pt];Dh(G,U,E,xt)}Bt&&_t.render(E);for(let pt=0,Mt=it.length;pt<Mt;pt++){const xt=it[pt];Nh(g,E,xt,xt.viewport)}}else U.length>0&&Dh(G,U,E,D),Bt&&_t.render(E),Nh(g,E,D);b!==null&&(Ut.updateMultisampleRenderTarget(b),Ut.updateRenderTargetMipmap(b)),E.isScene===!0&&E.onAfterRender(v,E,D),zt.resetDefaultState(),C=-1,w=null,x.pop(),x.length>0?(p=x[x.length-1],V===!0&&Ot.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function xa(E,D,F,G){if(E.visible===!1)return;if(E.layers.test(D.layers)){if(E.isGroup)F=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(D);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Dt.intersectsSprite(E)){G&&Tt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ft);const pt=Q.update(E),Mt=E.material;Mt.visible&&g.push(E,pt,Mt,F,Tt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Dt.intersectsObject(E))){const pt=Q.update(E),Mt=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Tt.copy(E.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),Tt.copy(pt.boundingSphere.center)),Tt.applyMatrix4(E.matrixWorld).applyMatrix4(ft)),Array.isArray(Mt)){const xt=pt.groups;for(let Pt=0,Ct=xt.length;Pt<Ct;Pt++){const yt=xt[Pt],Xt=Mt[yt.materialIndex];Xt&&Xt.visible&&g.push(E,pt,Xt,F,Tt.z,yt)}}else Mt.visible&&g.push(E,pt,Mt,F,Tt.z,null)}}const it=E.children;for(let pt=0,Mt=it.length;pt<Mt;pt++)xa(it[pt],D,F,G)}function Nh(E,D,F,G){const U=E.opaque,it=E.transmissive,pt=E.transparent;p.setupLightsView(F),V===!0&&Ot.setGlobalState(v.clippingPlanes,F),G&&Et.viewport(S.copy(G)),U.length>0&&tr(U,D,F),it.length>0&&tr(it,D,F),pt.length>0&&tr(pt,D,F),Et.buffers.depth.setTest(!0),Et.buffers.depth.setMask(!0),Et.buffers.color.setMask(!0),Et.setPolygonOffset(!1)}function Dh(E,D,F,G){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new di(1,1,{generateMipmaps:!0,type:Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float")?Ws:Ln,minFilter:ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const it=p.state.transmissionRenderTarget[G.id],pt=G.viewport||S;it.setSize(pt.z,pt.w);const Mt=v.getRenderTarget();v.setRenderTarget(it),v.getClearColor(B),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),Bt&&_t.render(F);const xt=v.toneMapping;v.toneMapping=Xn;const Pt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),V===!0&&Ot.setGlobalState(v.clippingPlanes,G),tr(E,F,G),Ut.updateMultisampleRenderTarget(it),Ut.updateRenderTargetMipmap(it),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let yt=0,Xt=D.length;yt<Xt;yt++){const re=D[yt],ae=re.object,Ve=re.geometry,qt=re.material,St=re.group;if(qt.side===en&&ae.layers.test(G.layers)){const Se=qt.side;qt.side=ze,qt.needsUpdate=!0,Uh(ae,F,G,Ve,qt,St),qt.side=Se,qt.needsUpdate=!0,Ct=!0}}Ct===!0&&(Ut.updateMultisampleRenderTarget(it),Ut.updateRenderTargetMipmap(it))}v.setRenderTarget(Mt),v.setClearColor(B,q),Pt!==void 0&&(G.viewport=Pt),v.toneMapping=xt}function tr(E,D,F){const G=D.isScene===!0?D.overrideMaterial:null;for(let U=0,it=E.length;U<it;U++){const pt=E[U],Mt=pt.object,xt=pt.geometry,Pt=G===null?pt.material:G,Ct=pt.group;Mt.layers.test(F.layers)&&Uh(Mt,D,F,xt,Pt,Ct)}}function Uh(E,D,F,G,U,it){E.onBeforeRender(v,D,F,G,U,it),E.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),U.onBeforeRender(v,D,F,G,E,it),U.transparent===!0&&U.side===en&&U.forceSinglePass===!1?(U.side=ze,U.needsUpdate=!0,v.renderBufferDirect(F,D,G,U,E,it),U.side=qn,U.needsUpdate=!0,v.renderBufferDirect(F,D,G,U,E,it),U.side=en):v.renderBufferDirect(F,D,G,U,E,it),E.onAfterRender(v,D,F,G,U,it)}function er(E,D,F){D.isScene!==!0&&(D=Rt);const G=It.get(E),U=p.state.lights,it=p.state.shadowsArray,pt=U.state.version,Mt=Z.getParameters(E,U.state,it,D,F),xt=Z.getProgramCacheKey(Mt);let Pt=G.programs;G.environment=E.isMeshStandardMaterial?D.environment:null,G.fog=D.fog,G.envMap=(E.isMeshStandardMaterial?M:A).get(E.envMap||G.environment),G.envMapRotation=G.environment!==null&&E.envMap===null?D.environmentRotation:E.envMapRotation,Pt===void 0&&(E.addEventListener("dispose",At),Pt=new Map,G.programs=Pt);let Ct=Pt.get(xt);if(Ct!==void 0){if(G.currentProgram===Ct&&G.lightsStateVersion===pt)return Fh(E,Mt),Ct}else Mt.uniforms=Z.getUniforms(E),E.onBeforeCompile(Mt,v),Ct=Z.acquireProgram(Mt,xt),Pt.set(xt,Ct),G.uniforms=Mt.uniforms;const yt=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(yt.clippingPlanes=Ot.uniform),Fh(E,Mt),G.needsLights=Du(E),G.lightsStateVersion=pt,G.needsLights&&(yt.ambientLightColor.value=U.state.ambient,yt.lightProbe.value=U.state.probe,yt.directionalLights.value=U.state.directional,yt.directionalLightShadows.value=U.state.directionalShadow,yt.spotLights.value=U.state.spot,yt.spotLightShadows.value=U.state.spotShadow,yt.rectAreaLights.value=U.state.rectArea,yt.ltc_1.value=U.state.rectAreaLTC1,yt.ltc_2.value=U.state.rectAreaLTC2,yt.pointLights.value=U.state.point,yt.pointLightShadows.value=U.state.pointShadow,yt.hemisphereLights.value=U.state.hemi,yt.directionalShadowMap.value=U.state.directionalShadowMap,yt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,yt.spotShadowMap.value=U.state.spotShadowMap,yt.spotLightMatrix.value=U.state.spotLightMatrix,yt.spotLightMap.value=U.state.spotLightMap,yt.pointShadowMap.value=U.state.pointShadowMap,yt.pointShadowMatrix.value=U.state.pointShadowMatrix),G.currentProgram=Ct,G.uniformsList=null,Ct}function Oh(E){if(E.uniformsList===null){const D=E.currentProgram.getUniforms();E.uniformsList=zr.seqWithValue(D.seq,E.uniforms)}return E.uniformsList}function Fh(E,D){const F=It.get(E);F.outputColorSpace=D.outputColorSpace,F.batching=D.batching,F.batchingColor=D.batchingColor,F.instancing=D.instancing,F.instancingColor=D.instancingColor,F.instancingMorph=D.instancingMorph,F.skinning=D.skinning,F.morphTargets=D.morphTargets,F.morphNormals=D.morphNormals,F.morphColors=D.morphColors,F.morphTargetsCount=D.morphTargetsCount,F.numClippingPlanes=D.numClippingPlanes,F.numIntersection=D.numClipIntersection,F.vertexAlphas=D.vertexAlphas,F.vertexTangents=D.vertexTangents,F.toneMapping=D.toneMapping}function Iu(E,D,F,G,U){D.isScene!==!0&&(D=Rt),Ut.resetTextureUnits();const it=D.fog,pt=G.isMeshStandardMaterial?D.environment:null,Mt=b===null?v.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Kn,xt=(G.isMeshStandardMaterial?M:A).get(G.envMap||pt),Pt=G.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ct=!!F.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),yt=!!F.morphAttributes.position,Xt=!!F.morphAttributes.normal,re=!!F.morphAttributes.color;let ae=Xn;G.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(ae=v.toneMapping);const Ve=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,qt=Ve!==void 0?Ve.length:0,St=It.get(G),Se=p.state.lights;if(V===!0&&(tt===!0||E!==w)){const Ke=E===w&&G.id===C;Ot.setState(G,E,Ke)}let Yt=!1;G.version===St.__version?(St.needsLights&&St.lightsStateVersion!==Se.state.version||St.outputColorSpace!==Mt||U.isBatchedMesh&&St.batching===!1||!U.isBatchedMesh&&St.batching===!0||U.isBatchedMesh&&St.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&St.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&St.instancing===!1||!U.isInstancedMesh&&St.instancing===!0||U.isSkinnedMesh&&St.skinning===!1||!U.isSkinnedMesh&&St.skinning===!0||U.isInstancedMesh&&St.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&St.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&St.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&St.instancingMorph===!1&&U.morphTexture!==null||St.envMap!==xt||G.fog===!0&&St.fog!==it||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==Ot.numPlanes||St.numIntersection!==Ot.numIntersection)||St.vertexAlphas!==Pt||St.vertexTangents!==Ct||St.morphTargets!==yt||St.morphNormals!==Xt||St.morphColors!==re||St.toneMapping!==ae||St.morphTargetsCount!==qt)&&(Yt=!0):(Yt=!0,St.__version=G.version);let rn=St.currentProgram;Yt===!0&&(rn=er(G,D,U));let xi=!1,We=!1,ya=!1;const de=rn.getUniforms(),Dn=St.uniforms;if(Et.useProgram(rn.program)&&(xi=!0,We=!0,ya=!0),G.id!==C&&(C=G.id,We=!0),xi||w!==E){de.setValue(R,"projectionMatrix",E.projectionMatrix),de.setValue(R,"viewMatrix",E.matrixWorldInverse);const Ke=de.map.cameraPosition;Ke!==void 0&&Ke.setValue(R,dt.setFromMatrixPosition(E.matrixWorld)),Qt.logarithmicDepthBuffer&&de.setValue(R,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&de.setValue(R,"isOrthographic",E.isOrthographicCamera===!0),w!==E&&(w=E,We=!0,ya=!0)}if(U.isSkinnedMesh){de.setOptional(R,U,"bindMatrix"),de.setOptional(R,U,"bindMatrixInverse");const Ke=U.skeleton;Ke&&(Ke.boneTexture===null&&Ke.computeBoneTexture(),de.setValue(R,"boneTexture",Ke.boneTexture,Ut))}U.isBatchedMesh&&(de.setOptional(R,U,"batchingTexture"),de.setValue(R,"batchingTexture",U._matricesTexture,Ut),de.setOptional(R,U,"batchingIdTexture"),de.setValue(R,"batchingIdTexture",U._indirectTexture,Ut),de.setOptional(R,U,"batchingColorTexture"),U._colorsTexture!==null&&de.setValue(R,"batchingColorTexture",U._colorsTexture,Ut));const Sa=F.morphAttributes;if((Sa.position!==void 0||Sa.normal!==void 0||Sa.color!==void 0)&&kt.update(U,F,rn),(We||St.receiveShadow!==U.receiveShadow)&&(St.receiveShadow=U.receiveShadow,de.setValue(R,"receiveShadow",U.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Dn.envMap.value=xt,Dn.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&D.environment!==null&&(Dn.envMapIntensity.value=D.environmentIntensity),We&&(de.setValue(R,"toneMappingExposure",v.toneMappingExposure),St.needsLights&&Nu(Dn,ya),it&&G.fog===!0&&bt.refreshFogUniforms(Dn,it),bt.refreshMaterialUniforms(Dn,G,j,W,p.state.transmissionRenderTarget[E.id]),zr.upload(R,Oh(St),Dn,Ut)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(zr.upload(R,Oh(St),Dn,Ut),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&de.setValue(R,"center",U.center),de.setValue(R,"modelViewMatrix",U.modelViewMatrix),de.setValue(R,"normalMatrix",U.normalMatrix),de.setValue(R,"modelMatrix",U.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Ke=G.uniformsGroups;for(let Ea=0,Uu=Ke.length;Ea<Uu;Ea++){const Gh=Ke[Ea];ne.update(Gh,rn),ne.bind(Gh,rn)}}return rn}function Nu(E,D){E.ambientLightColor.needsUpdate=D,E.lightProbe.needsUpdate=D,E.directionalLights.needsUpdate=D,E.directionalLightShadows.needsUpdate=D,E.pointLights.needsUpdate=D,E.pointLightShadows.needsUpdate=D,E.spotLights.needsUpdate=D,E.spotLightShadows.needsUpdate=D,E.rectAreaLights.needsUpdate=D,E.hemisphereLights.needsUpdate=D}function Du(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(E,D,F){It.get(E.texture).__webglTexture=D,It.get(E.depthTexture).__webglTexture=F;const G=It.get(E);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=F===void 0,G.__autoAllocateDepthBuffer||Zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,D){const F=It.get(E);F.__webglFramebuffer=D,F.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(E,D=0,F=0){b=E,L=D,T=F;let G=!0,U=null,it=!1,pt=!1;if(E){const xt=It.get(E);if(xt.__useDefaultFramebuffer!==void 0)Et.bindFramebuffer(R.FRAMEBUFFER,null),G=!1;else if(xt.__webglFramebuffer===void 0)Ut.setupRenderTarget(E);else if(xt.__hasExternalTextures)Ut.rebindTextures(E,It.get(E.texture).__webglTexture,It.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const yt=E.depthTexture;if(xt.__boundDepthTexture!==yt){if(yt!==null&&It.has(yt)&&(E.width!==yt.image.width||E.height!==yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ut.setupDepthRenderbuffer(E)}}const Pt=E.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(pt=!0);const Ct=It.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ct[D])?U=Ct[D][F]:U=Ct[D],it=!0):E.samples>0&&Ut.useMultisampledRTT(E)===!1?U=It.get(E).__webglMultisampledFramebuffer:Array.isArray(Ct)?U=Ct[F]:U=Ct,S.copy(E.viewport),P.copy(E.scissor),k=E.scissorTest}else S.copy(ot).multiplyScalar(j).floor(),P.copy(ct).multiplyScalar(j).floor(),k=wt;if(Et.bindFramebuffer(R.FRAMEBUFFER,U)&&G&&Et.drawBuffers(E,U),Et.viewport(S),Et.scissor(P),Et.setScissorTest(k),it){const xt=It.get(E.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+D,xt.__webglTexture,F)}else if(pt){const xt=It.get(E.texture),Pt=D||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,xt.__webglTexture,F||0,Pt)}C=-1},this.readRenderTargetPixels=function(E,D,F,G,U,it,pt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=It.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pt!==void 0&&(Mt=Mt[pt]),Mt){Et.bindFramebuffer(R.FRAMEBUFFER,Mt);try{const xt=E.texture,Pt=xt.format,Ct=xt.type;if(!Qt.textureFormatReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Qt.textureTypeReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=E.width-G&&F>=0&&F<=E.height-U&&R.readPixels(D,F,G,U,Nt.convert(Pt),Nt.convert(Ct),it)}finally{const xt=b!==null?It.get(b).__webglFramebuffer:null;Et.bindFramebuffer(R.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(E,D,F,G,U,it,pt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=It.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pt!==void 0&&(Mt=Mt[pt]),Mt){Et.bindFramebuffer(R.FRAMEBUFFER,Mt);try{const xt=E.texture,Pt=xt.format,Ct=xt.type;if(!Qt.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Qt.textureTypeReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=E.width-G&&F>=0&&F<=E.height-U){const yt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,yt),R.bufferData(R.PIXEL_PACK_BUFFER,it.byteLength,R.STREAM_READ),R.readPixels(D,F,G,U,Nt.convert(Pt),Nt.convert(Ct),0),R.flush();const Xt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);await Zf(R,Xt,4);try{R.bindBuffer(R.PIXEL_PACK_BUFFER,yt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,it)}finally{R.deleteBuffer(yt),R.deleteSync(Xt)}return it}}finally{const xt=b!==null?It.get(b).__webglFramebuffer:null;Et.bindFramebuffer(R.FRAMEBUFFER,xt)}}},this.copyFramebufferToTexture=function(E,D=null,F=0){E.isTexture!==!0&&(Ts("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,E=arguments[1]);const G=Math.pow(2,-F),U=Math.floor(E.image.width*G),it=Math.floor(E.image.height*G),pt=D!==null?D.x:0,Mt=D!==null?D.y:0;Ut.setTexture2D(E,0),R.copyTexSubImage2D(R.TEXTURE_2D,F,0,0,pt,Mt,U,it),Et.unbindTexture()},this.copyTextureToTexture=function(E,D,F=null,G=null,U=0){E.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,E=arguments[1],D=arguments[2],U=arguments[3]||0,F=null);let it,pt,Mt,xt,Pt,Ct;F!==null?(it=F.max.x-F.min.x,pt=F.max.y-F.min.y,Mt=F.min.x,xt=F.min.y):(it=E.image.width,pt=E.image.height,Mt=0,xt=0),G!==null?(Pt=G.x,Ct=G.y):(Pt=0,Ct=0);const yt=Nt.convert(D.format),Xt=Nt.convert(D.type);Ut.setTexture2D(D,0),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,D.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,D.unpackAlignment);const re=R.getParameter(R.UNPACK_ROW_LENGTH),ae=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Ve=R.getParameter(R.UNPACK_SKIP_PIXELS),qt=R.getParameter(R.UNPACK_SKIP_ROWS),St=R.getParameter(R.UNPACK_SKIP_IMAGES),Se=E.isCompressedTexture?E.mipmaps[U]:E.image;R.pixelStorei(R.UNPACK_ROW_LENGTH,Se.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Se.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Mt),R.pixelStorei(R.UNPACK_SKIP_ROWS,xt),E.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,U,Pt,Ct,it,pt,yt,Xt,Se.data):E.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,U,Pt,Ct,Se.width,Se.height,yt,Se.data):R.texSubImage2D(R.TEXTURE_2D,U,Pt,Ct,it,pt,yt,Xt,Se),R.pixelStorei(R.UNPACK_ROW_LENGTH,re),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ae),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ve),R.pixelStorei(R.UNPACK_SKIP_ROWS,qt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,St),U===0&&D.generateMipmaps&&R.generateMipmap(R.TEXTURE_2D),Et.unbindTexture()},this.copyTextureToTexture3D=function(E,D,F=null,G=null,U=0){E.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,G=arguments[1]||null,E=arguments[2],D=arguments[3],U=arguments[4]||0);let it,pt,Mt,xt,Pt,Ct,yt,Xt,re;const ae=E.isCompressedTexture?E.mipmaps[U]:E.image;F!==null?(it=F.max.x-F.min.x,pt=F.max.y-F.min.y,Mt=F.max.z-F.min.z,xt=F.min.x,Pt=F.min.y,Ct=F.min.z):(it=ae.width,pt=ae.height,Mt=ae.depth,xt=0,Pt=0,Ct=0),G!==null?(yt=G.x,Xt=G.y,re=G.z):(yt=0,Xt=0,re=0);const Ve=Nt.convert(D.format),qt=Nt.convert(D.type);let St;if(D.isData3DTexture)Ut.setTexture3D(D,0),St=R.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)Ut.setTexture2DArray(D,0),St=R.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,D.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,D.unpackAlignment);const Se=R.getParameter(R.UNPACK_ROW_LENGTH),Yt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),rn=R.getParameter(R.UNPACK_SKIP_PIXELS),xi=R.getParameter(R.UNPACK_SKIP_ROWS),We=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ae.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ae.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,xt),R.pixelStorei(R.UNPACK_SKIP_ROWS,Pt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ct),E.isDataTexture||E.isData3DTexture?R.texSubImage3D(St,U,yt,Xt,re,it,pt,Mt,Ve,qt,ae.data):D.isCompressedArrayTexture?R.compressedTexSubImage3D(St,U,yt,Xt,re,it,pt,Mt,Ve,ae.data):R.texSubImage3D(St,U,yt,Xt,re,it,pt,Mt,Ve,qt,ae),R.pixelStorei(R.UNPACK_ROW_LENGTH,Se),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Yt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,rn),R.pixelStorei(R.UNPACK_SKIP_ROWS,xi),R.pixelStorei(R.UNPACK_SKIP_IMAGES,We),U===0&&D.generateMipmaps&&R.generateMipmap(St),Et.unbindTexture()},this.initRenderTarget=function(E){It.get(E).__webglFramebuffer===void 0&&Ut.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Ut.setTextureCube(E,0):E.isData3DTexture?Ut.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Ut.setTexture2DArray(E,0):Ut.setTexture2D(E,0),Et.unbindTexture()},this.resetState=function(){L=0,T=0,b=null,Et.reset(),zt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===lh?"display-p3":"srgb",e.unpackColorSpace=Kt.workingColorSpace===ma?"display-p3":"srgb"}}class hg extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class fh extends hs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Zr=new I,Jr=new I,Ol=new he,gs=new _a,wr=new qs,Ka=new I,Fl=new I;class Zi extends Pe{constructor(t=new Re,e=new fh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Zr.fromBufferAttribute(e,s-1),Jr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Zr.distanceTo(Jr);t.setAttribute("lineDistance",new ke(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wr.copy(i.boundingSphere),wr.applyMatrix4(s),wr.radius+=r,t.ray.intersectsSphere(wr)===!1)return;Ol.copy(s).invert(),gs.copy(t.ray).applyMatrix4(Ol);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=this.isLineSegments?2:1,c=i.index,d=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),_=Math.min(c.count,a.start+a.count);for(let g=f,p=_-1;g<p;g+=l){const m=c.getX(g),x=c.getX(g+1),v=br(this,t,gs,h,m,x);v&&e.push(v)}if(this.isLineLoop){const g=c.getX(_-1),p=c.getX(f),m=br(this,t,gs,h,g,p);m&&e.push(m)}}else{const f=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let g=f,p=_-1;g<p;g+=l){const m=br(this,t,gs,h,g,g+1);m&&e.push(m)}if(this.isLineLoop){const g=br(this,t,gs,h,_-1,f);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function br(n,t,e,i,s,r){const a=n.geometry.attributes.position;if(Zr.fromBufferAttribute(a,s),Jr.fromBufferAttribute(a,r),e.distanceSqToSegment(Zr,Jr,Ka,Fl)>i)return;Ka.applyMatrix4(n.matrixWorld);const h=t.ray.origin.distanceTo(Ka);if(!(h<t.near||h>t.far))return{distance:h,point:Fl.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,object:n}}class jc extends hs{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Gl=new he,zo=new _a,Tr=new qs,Ar=new I;class xs extends Pe{constructor(t=new Re,e=new jc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Tr.copy(i.boundingSphere),Tr.applyMatrix4(s),Tr.radius+=r,t.ray.intersectsSphere(Tr)===!1)return;Gl.copy(s).invert(),zo.copy(t.ray).applyMatrix4(Gl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=i.index,u=i.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let _=d,g=f;_<g;_++){const p=l.getX(_);Ar.fromBufferAttribute(u,p),Bl(Ar,p,h,s,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let _=d,g=f;_<g;_++)Ar.fromBufferAttribute(u,_),Bl(Ar,_,h,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Bl(n,t,e,i,s,r,a){const o=zo.distanceSqToPoint(n);if(o<e){const h=new I;zo.closestPointToPoint(n,h),h.applyMatrix4(i);const l=s.ray.origin.distanceTo(h);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:h,index:t,face:null,object:a})}}class xn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const r=i.length;let a;e?a=e:a=t*i[r-1];let o=0,h=r-1,l;for(;o<=h;)if(s=Math.floor(o+(h-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)h=s-1;else{h=s;break}if(s=h,i[s]===a)return s/(r-1);const c=i[s],d=i[s+1]-c,f=(a-c)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),h=e||(a.isVector2?new mt:new I);return h.copy(o).sub(a).normalize(),h}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new I,s=[],r=[],a=[],o=new I,h=new he;for(let f=0;f<=t;f++){const _=f/t;s[f]=this.getTangentAt(_,new I)}r[0]=new I,a[0]=new I;let l=Number.MAX_VALUE;const c=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);c<=l&&(l=c,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),d<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(Me(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(h.makeRotationAxis(o,_))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Me(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let _=1;_<=t;_++)r[_].applyMatrix4(h.makeRotationAxis(s[_],f*_)),a[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class dh extends xn{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=h}getPoint(t,e=new mt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let h=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const c=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=h-this.aX,f=l-this.aY;h=d*c-f*u+this.aX,l=d*u+f*c+this.aY}return i.set(h,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class lg extends dh{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ph(){let n=0,t=0,e=0,i=0;function s(r,a,o,h){n=r,t=o,e=-3*r+3*a-2*o-h,i=2*r-2*a+o+h}return{initCatmullRom:function(r,a,o,h,l){s(a,o,l*(o-r),l*(h-a))},initNonuniformCatmullRom:function(r,a,o,h,l,c,u){let d=(a-r)/l-(o-r)/(l+c)+(o-a)/c,f=(o-a)/c-(h-a)/(c+u)+(h-o)/u;d*=c,f*=c,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return n+t*r+e*a+i*o}}}const Pr=new I,Za=new ph,Ja=new ph,Qa=new ph;class cg extends xn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new I){const i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),h=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:h===0&&o===r-1&&(o=r-2,h=1);let l,c;this.closed||o>0?l=s[(o-1)%r]:(Pr.subVectors(s[0],s[1]).add(s[0]),l=Pr);const u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?c=s[(o+2)%r]:(Pr.subVectors(s[r-1],s[r-2]).add(s[r-1]),c=Pr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let _=Math.pow(l.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(c),f);g<1e-4&&(g=1),_<1e-4&&(_=g),p<1e-4&&(p=g),Za.initNonuniformCatmullRom(l.x,u.x,d.x,c.x,_,g,p),Ja.initNonuniformCatmullRom(l.y,u.y,d.y,c.y,_,g,p),Qa.initNonuniformCatmullRom(l.z,u.z,d.z,c.z,_,g,p)}else this.curveType==="catmullrom"&&(Za.initCatmullRom(l.x,u.x,d.x,c.x,this.tension),Ja.initCatmullRom(l.y,u.y,d.y,c.y,this.tension),Qa.initCatmullRom(l.z,u.z,d.z,c.z,this.tension));return i.set(Za.calc(h),Ja.calc(h),Qa.calc(h)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function zl(n,t,e,i,s){const r=(i-t)*.5,a=(s-e)*.5,o=n*n,h=n*o;return(2*e-2*i+r+a)*h+(-3*e+3*i-2*r-a)*o+r*n+e}function ug(n,t){const e=1-n;return e*e*t}function fg(n,t){return 2*(1-n)*n*t}function dg(n,t){return n*n*t}function As(n,t,e,i){return ug(n,t)+fg(n,e)+dg(n,i)}function pg(n,t){const e=1-n;return e*e*e*t}function mg(n,t){const e=1-n;return 3*e*e*n*t}function _g(n,t){return 3*(1-n)*n*n*t}function gg(n,t){return n*n*n*t}function Ps(n,t,e,i,s){return pg(n,t)+mg(n,e)+_g(n,i)+gg(n,s)}class Kc extends xn{constructor(t=new mt,e=new mt,i=new mt,s=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new mt){const i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ps(t,s.x,r.x,a.x,o.x),Ps(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vg extends xn{constructor(t=new I,e=new I,i=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new I){const i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ps(t,s.x,r.x,a.x,o.x),Ps(t,s.y,r.y,a.y,o.y),Ps(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Zc extends xn{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Mg extends xn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jc extends xn{constructor(t=new mt,e=new mt,i=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new mt){const i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(As(t,s.x,r.x,a.x),As(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xg extends xn{constructor(t=new I,e=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new I){const i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(As(t,s.x,r.x,a.x),As(t,s.y,r.y,a.y),As(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qc extends xn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){const i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,h=s[a===0?a:a-1],l=s[a],c=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return i.set(zl(o,h.x,l.x,c.x,u.x),zl(o,h.y,l.y,c.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new mt().fromArray(s))}return this}}var kl=Object.freeze({__proto__:null,ArcCurve:lg,CatmullRomCurve3:cg,CubicBezierCurve:Kc,CubicBezierCurve3:vg,EllipseCurve:dh,LineCurve:Zc,LineCurve3:Mg,QuadraticBezierCurve:Jc,QuadraticBezierCurve3:xg,SplineCurve:Qc});class yg extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new kl[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const a=s[r]-i,o=this.curves[r],h=o.getLength(),l=h===0?0:1-a/h;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,h=a.getPoints(o);for(let l=0;l<h.length;l++){const c=h[l];i&&i.equals(c)||(e.push(c),i=c)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new kl[s.type]().fromJSON(s))}return this}}class ko extends yg{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Zc(this.currentPoint.clone(),new mt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new Jc(this.currentPoint.clone(),new mt(t,e),new mt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){const o=new Kc(this.currentPoint.clone(),new mt(t,e),new mt(i,s),new mt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Qc(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){const o=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(t+o,e+h,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,h){const l=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(t+l,e+c,i,s,r,a,o,h),this}absellipse(t,e,i,s,r,a,o,h){const l=new dh(t,e,i,s,r,a,o,h);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const c=l.getPoint(1);return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class tu extends ko{constructor(t){super(t),this.uuid=Mi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new ko().fromJSON(s))}return this}}const Sg={triangulate:function(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=eu(n,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,h,l,c,u,d,f;if(i&&(r=Ag(n,t,r,e)),n.length>80*e){o=l=n[0],h=c=n[1];for(let _=e;_<s;_+=e)u=n[_],d=n[_+1],u<o&&(o=u),d<h&&(h=d),u>l&&(l=u),d>c&&(c=d);f=Math.max(l-o,c-h),f=f!==0?32767/f:0}return Fs(r,a,e,o,h,f,0),a}};function eu(n,t,e,i,s){let r,a;if(s===Gg(n,t,e,i)>0)for(r=t;r<e;r+=i)a=Hl(r,n[r],n[r+1],a);else for(r=e-i;r>=t;r-=i)a=Hl(r,n[r],n[r+1],a);return a&&va(a,a.next)&&(Bs(a),a=a.next),a}function mi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(va(e,e.next)||se(e.prev,e,e.next)===0)){if(Bs(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Fs(n,t,e,i,s,r,a){if(!n)return;!a&&r&&Ig(n,i,s,r);let o=n,h,l;for(;n.prev!==n.next;){if(h=n.prev,l=n.next,r?wg(n,i,s,r):Eg(n)){t.push(h.i/e|0),t.push(n.i/e|0),t.push(l.i/e|0),Bs(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=bg(mi(n),t,e),Fs(n,t,e,i,s,r,2)):a===2&&Tg(n,t,e,i,s,r):Fs(mi(n),t,e,i,s,r,1);break}}}function Eg(n){const t=n.prev,e=n,i=n.next;if(se(t,e,i)>=0)return!1;const s=t.x,r=e.x,a=i.x,o=t.y,h=e.y,l=i.y,c=s<r?s<a?s:a:r<a?r:a,u=o<h?o<l?o:l:h<l?h:l,d=s>r?s>a?s:a:r>a?r:a,f=o>h?o>l?o:l:h>l?h:l;let _=i.next;for(;_!==t;){if(_.x>=c&&_.x<=d&&_.y>=u&&_.y<=f&&Hi(s,o,r,h,a,l,_.x,_.y)&&se(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function wg(n,t,e,i){const s=n.prev,r=n,a=n.next;if(se(s,r,a)>=0)return!1;const o=s.x,h=r.x,l=a.x,c=s.y,u=r.y,d=a.y,f=o<h?o<l?o:l:h<l?h:l,_=c<u?c<d?c:d:u<d?u:d,g=o>h?o>l?o:l:h>l?h:l,p=c>u?c>d?c:d:u>d?u:d,m=Ho(f,_,t,e,i),x=Ho(g,p,t,e,i);let v=n.prevZ,y=n.nextZ;for(;v&&v.z>=m&&y&&y.z<=x;){if(v.x>=f&&v.x<=g&&v.y>=_&&v.y<=p&&v!==s&&v!==a&&Hi(o,c,h,u,l,d,v.x,v.y)&&se(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=f&&y.x<=g&&y.y>=_&&y.y<=p&&y!==s&&y!==a&&Hi(o,c,h,u,l,d,y.x,y.y)&&se(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=m;){if(v.x>=f&&v.x<=g&&v.y>=_&&v.y<=p&&v!==s&&v!==a&&Hi(o,c,h,u,l,d,v.x,v.y)&&se(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=x;){if(y.x>=f&&y.x<=g&&y.y>=_&&y.y<=p&&y!==s&&y!==a&&Hi(o,c,h,u,l,d,y.x,y.y)&&se(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function bg(n,t,e){let i=n;do{const s=i.prev,r=i.next.next;!va(s,r)&&nu(s,i,i.next,r)&&Gs(s,r)&&Gs(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),Bs(i),Bs(i.next),i=n=r),i=i.next}while(i!==n);return mi(i)}function Tg(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ug(a,o)){let h=iu(a,o);a=mi(a,a.next),h=mi(h,h.next),Fs(a,t,e,i,s,r,0),Fs(h,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function Ag(n,t,e,i){const s=[];let r,a,o,h,l;for(r=0,a=t.length;r<a;r++)o=t[r]*i,h=r<a-1?t[r+1]*i:n.length,l=eu(n,o,h,i,!1),l===l.next&&(l.steiner=!0),s.push(Dg(l));for(s.sort(Pg),r=0;r<s.length;r++)e=Rg(s[r],e);return e}function Pg(n,t){return n.x-t.x}function Rg(n,t){const e=Cg(n,t);if(!e)return t;const i=iu(e,n);return mi(i,i.next),mi(e,e.next)}function Cg(n,t){let e=t,i=-1/0,s;const r=n.x,a=n.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const d=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>i&&(i=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const o=s,h=s.x,l=s.y;let c=1/0,u;e=s;do r>=e.x&&e.x>=h&&r!==e.x&&Hi(a<l?r:i,a,h,l,a<l?i:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),Gs(e,n)&&(u<c||u===c&&(e.x>s.x||e.x===s.x&&Lg(s,e)))&&(s=e,c=u)),e=e.next;while(e!==o);return s}function Lg(n,t){return se(n.prev,n,t.prev)<0&&se(t.next,n,n.next)<0}function Ig(n,t,e,i){let s=n;do s.z===0&&(s.z=Ho(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Ng(s)}function Ng(n){let t,e,i,s,r,a,o,h,l=1;do{for(e=n,n=null,r=null,a=0;e;){for(a++,i=e,o=0,t=0;t<l&&(o++,i=i.nextZ,!!i);t++);for(h=l;o>0||h>0&&i;)o!==0&&(h===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,o--):(s=i,i=i.nextZ,h--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,l*=2}while(a>1);return n}function Ho(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Dg(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Hi(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function Ug(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Og(n,t)&&(Gs(n,t)&&Gs(t,n)&&Fg(n,t)&&(se(n.prev,n,t.prev)||se(n,t.prev,t))||va(n,t)&&se(n.prev,n,n.next)>0&&se(t.prev,t,t.next)>0)}function se(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function va(n,t){return n.x===t.x&&n.y===t.y}function nu(n,t,e,i){const s=Cr(se(n,t,e)),r=Cr(se(n,t,i)),a=Cr(se(e,i,n)),o=Cr(se(e,i,t));return!!(s!==r&&a!==o||s===0&&Rr(n,e,t)||r===0&&Rr(n,i,t)||a===0&&Rr(e,n,i)||o===0&&Rr(e,t,i))}function Rr(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Cr(n){return n>0?1:n<0?-1:0}function Og(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&nu(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Gs(n,t){return se(n.prev,n,n.next)<0?se(n,t,n.next)>=0&&se(n,n.prev,t)>=0:se(n,t,n.prev)<0||se(n,n.next,t)<0}function Fg(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function iu(n,t){const e=new Vo(n.i,n.x,n.y),i=new Vo(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Hl(n,t,e,i){const s=new Vo(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Bs(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Vo(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Gg(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}class Rs{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return Rs.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];Vl(t),Wl(i,t);let a=t.length;e.forEach(Vl);for(let h=0;h<e.length;h++)s.push(a),a+=e[h].length,Wl(i,e[h]);const o=Sg.triangulate(i,s);for(let h=0;h<o.length;h+=3)r.push(o.slice(h,h+3));return r}}function Vl(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Wl(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class mh extends Re{constructor(t=new tu([new mt(0,.5),new mt(-.5,-.5),new mt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],a=[];let o=0,h=0;if(Array.isArray(t)===!1)l(t);else for(let c=0;c<t.length;c++)l(t[c]),this.addGroup(o,h,c),o+=h,h=0;this.setIndex(i),this.setAttribute("position",new ke(s,3)),this.setAttribute("normal",new ke(r,3)),this.setAttribute("uv",new ke(a,2));function l(c){const u=s.length/3,d=c.extractPoints(e);let f=d.shape;const _=d.holes;Rs.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=_.length;p<m;p++){const x=_[p];Rs.isClockWise(x)===!0&&(_[p]=x.reverse())}const g=Rs.triangulateShape(f,_);for(let p=0,m=_.length;p<m;p++){const x=_[p];f=f.concat(x)}for(let p=0,m=f.length;p<m;p++){const x=f[p];s.push(x.x,x.y,0),r.push(0,0,1),a.push(x.x,x.y)}for(let p=0,m=g.length;p<m;p++){const x=g[p],v=x[0]+u,y=x[1]+u,L=x[2]+u;i.push(v,y,L),h+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Bg(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const a=e[t.shapes[s]];i.push(a)}return new mh(i,t.curveSegments)}}function Bg(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class Xl{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Me(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class zg extends vi{constructor(t,e){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nh);class _h{constructor(){O(this,"_disposed",!1)}get disposed(){return this._disposed}markDisposed(){this._disposed=!0}assertNotDisposed(){if(this._disposed)throw new Error(`[${this.constructor.name}] Object already disposed.`)}}class kg{constructor(){O(this,"_groups",[]);O(this,"_layerIndex",new Map)}get groups(){return this._groups}addGroup(t){if(this._groups.find(e=>e.id===t.id))throw new Error(`Group "${t.id}" already exists`);this._groups.push(t)}removeGroup(t){const e=this._groups.findIndex(s=>s.id===t);if(e===-1)return;const i=this._groups[e];for(const s of i.layers)this._layerIndex.delete(s.id);this._groups.splice(e,1)}addLayerToGroup(t,e){const i=this._groups.find(s=>s.id===e);if(!i)throw new Error(`Group "${e}" not found`);if(this._layerIndex.has(t.id))throw new Error(`Layer "${t.id}" already exists`);i.layers.push(t),this._layerIndex.set(t.id,t)}removeLayer(t){for(const e of this._groups){const i=e.layers.findIndex(s=>s.id===t);if(i!==-1){e.layers.splice(i,1),this._layerIndex.delete(t);return}}}getLayer(t){return this._layerIndex.get(t)}getVisibleLayers(){const t=[];for(const e of this._groups)if(e.visible)for(const i of e.layers)i.visible&&t.push(i);return t.sort((e,i)=>e.zIndex-i.zIndex),t}moveUp(t){const e=this._layerIndex.get(t);if(!e)return;const i=this._getAllFlat(),s=i.indexOf(e);if(s>0){const r=i[s-1],a=e.zIndex;e.zIndex=r.zIndex,r.zIndex=a}}moveDown(t){const e=this._layerIndex.get(t);if(!e)return;const i=this._getAllFlat(),s=i.indexOf(e);if(s<i.length-1){const r=i[s+1],a=e.zIndex;e.zIndex=r.zIndex,r.zIndex=a}}moveToGroup(t,e){const i=this._layerIndex.get(t);if(!i)return;for(const r of this._groups){const a=r.layers.findIndex(o=>o.id===t);if(a!==-1){r.layers.splice(a,1);break}}const s=this._groups.find(r=>r.id===e);if(!s)throw new Error(`Group "${e}" not found`);s.layers.push(i)}clear(){this._groups=[],this._layerIndex.clear()}_getAllFlat(){const t=[];for(const e of this._groups)for(const i of e.layers)t.push(i);return t.sort((e,i)=>e.zIndex-i.zIndex),t}}class Hg{constructor(){O(this,"_map",new Map);O(this,"_totalBytes",0)}get count(){return this._map.size}get byteSize(){return this._totalBytes}get(t){const e=this._map.get(t);return e?(this._map.delete(t),this._map.set(t,e),e.value):null}set(t,e,i){if(this._map.has(t)){const s=this._map.get(t);this._totalBytes-=s.byteSize,this._map.delete(t)}this._map.set(t,{value:e,byteSize:i}),this._totalBytes+=i}has(t){return this._map.has(t)}delete(t){const e=this._map.get(t);e&&(this._totalBytes-=e.byteSize,this._map.delete(t))}trim(t){for(;this._totalBytes>t&&this._map.size>0;){const[e,i]=this._map.entries().next().value;this._totalBytes-=i.byteSize,this._map.delete(e),i.value.disposed||i.value.dispose()}}clear(){for(const t of this._map.values())t.value.disposed||t.value.dispose();this._map.clear(),this._totalBytes=0}}class Vg{constructor(t){O(this,"_current");O(this,"_dirty",!1);O(this,"threshold");this.threshold=(t==null?void 0:t.threshold)??500,this._current=(t==null?void 0:t.initial)??{x:0,y:0,z:0}}get current(){return{...this._current}}get dirty(){return this._dirty}update(t){const e=t.x-this._current.x,i=t.y-this._current.y;return Math.sqrt(e*e+i*i)>this.threshold?(this._current={x:t.x,y:t.y,z:0},this._dirty=!0,!0):(this._dirty=!1,!1)}reset(){this._current={x:0,y:0,z:0},this._dirty=!1}}class Wg{constructor(t){O(this,"_x",0);O(this,"_y",0);O(this,"_zoom",1);O(this,"_width",800);O(this,"_height",600);O(this,"_container",null);O(this,"_dragging",!1);O(this,"_lastMouseX",0);O(this,"_lastMouseY",0);O(this,"_onMouseDown");O(this,"_onMouseMove");O(this,"_onMouseUp");O(this,"_onWheel");O(this,"_onResize");this._x=(t==null?void 0:t.x)??0,this._y=(t==null?void 0:t.y)??0,this._zoom=(t==null?void 0:t.zoom)??1,this._onMouseDown=e=>{this._dragging=!0,this._lastMouseX=e.clientX,this._lastMouseY=e.clientY},this._onMouseMove=e=>{if(!this._dragging)return;const i=e.clientX-this._lastMouseX,s=e.clientY-this._lastMouseY;this._x-=i*this._zoom,this._y+=s*this._zoom,this._lastMouseX=e.clientX,this._lastMouseY=e.clientY},this._onMouseUp=()=>{this._dragging=!1},this._onWheel=e=>{e.preventDefault();const i=e.deltaY>0?1.1:.9;this._zoom*=i,this._zoom=Math.max(.01,Math.min(1e3,this._zoom))},this._onResize=()=>{this._container&&(this._width=this._container.clientWidth,this._height=this._container.clientHeight)}}get cameraWorldPos(){return{x:this._x,y:this._y,z:0}}get extent(){const t=this._width/2*this._zoom,e=this._height/2*this._zoom;return[this._x-t,this._y-e,this._x+t,this._y+e]}attach(t){this._container=t,this._width=t.clientWidth,this._height=t.clientHeight,t.addEventListener("mousedown",this._onMouseDown),window.addEventListener("mousemove",this._onMouseMove),window.addEventListener("mouseup",this._onMouseUp),t.addEventListener("wheel",this._onWheel,{passive:!1}),window.addEventListener("resize",this._onResize)}detach(){this._container&&(this._container.removeEventListener("mousedown",this._onMouseDown),this._container.removeEventListener("wheel",this._onWheel)),window.removeEventListener("mousemove",this._onMouseMove),window.removeEventListener("mouseup",this._onMouseUp),window.removeEventListener("resize",this._onResize),this._container=null}setCenter(t,e){this._x=t,this._y=e}setZoom(t){this._zoom=Math.max(.01,Math.min(1e3,t))}get zoom(){return this._zoom}get resolution(){return this._zoom}update(t){}dispose(){this.detach()}}function Ji(n,t,e){return{schemeId:n,id:t,level:e}}function Te(n){return`${n.schemeId}:${n.id}`}class ql extends _h{constructor(e,i,s){super();O(this,"id");O(this,"key");O(this,"bounds");O(this,"origin");O(this,"reprojector");O(this,"state");O(this,"contents",[]);O(this,"failCount",0);O(this,"lastAccessTime",0);O(this,"priority",0);this.id=`${e.schemeId}:${e.id}`,this.key=e,this.bounds=i,this.origin=s,this.state="unloaded"}reset(){this.state="unloaded",this.contents.length=0,this.failCount=0,this.priority=0}dispose(){for(const e of this.contents)e.disposed||e.dispose();this.contents.length=0,this.markDisposed()}}const Xg={screenArea:.4,distance:.3,inFrustum:.2,parentReady:.1};class qg{constructor(){O(this,"maxPerFrame",2);O(this,"weights",{...Xg});O(this,"_loading",new Map);O(this,"_loadedParents",new Set);O(this,"_queue",[])}markLoaded(t){const e=Te(t);this._loading.delete(e),this._loadedParents.add(e)}markFailed(t){this._loading.delete(Te(t))}abort(t){const e=Te(t);this.abortByKey(e)}abortByKey(t){const e=this._loading.get(t);e&&(e.abort(),this._loading.delete(t))}cancelOffscreen(t){this._queue=this._queue.filter(e=>t.has(Te(e.tileKey)))}abortAll(){for(const[,t]of this._loading)t.abort();this._loading.clear(),this._queue=[]}schedule(t){const e=new Set,i=[];for(const s of t){const r=Te(s.tileKey);e.has(r)||this._loading.has(r)||(e.add(r),i.push(s))}return i.sort((s,r)=>this._computePriority(r)-this._computePriority(s)),this._queue=i,i}takeNext(){const t=[];for(;t.length<this.maxPerFrame&&this._queue.length>0;){const e=this._queue.shift(),i=Te(e.tileKey);this._loading.has(i)||t.push(e)}return t}startLoading(t,e){const i=Te(t);this._loading.set(i,e)}get queueLength(){return this._queue.length}get loadingCount(){return this._loading.size}_computePriority(t){const{weights:e}=this,i=e.screenArea*t.screenArea,s=e.distance*(1/Math.max(t.distanceToCamera,1)),r=e.inFrustum*(t.inFrustum?1:.1),a=e.parentReady*(this._loadedParents.has(Te(t.tileKey))?1:0);return i+s+r+a}}const ln=class ln{constructor(t,e,i){O(this,"scheduler",new qg);O(this,"cache");O(this,"floatingOrigin");O(this,"_loadFn");O(this,"_loadedTiles",new Map);O(this,"_loading",new Map);O(this,"_lastExtent",null);O(this,"_lastResolution",null);this.cache=t,this.floatingOrigin=e,this._loadFn=i}get loadedTiles(){return this._loadedTiles}update(t,e,i,s,r){let a=!0;if(this._lastExtent&&this._lastResolution!=null){const[h,l,c,u]=this._lastExtent,d=c-h,f=u-l,_=Math.abs(t[0]-h),g=Math.abs(t[1]-l);!(r!=null&&Math.abs(r-this._lastResolution)/this._lastResolution>.2)&&_<d*ln.EXTENT_MOVE_FACTOR&&g<f*ln.EXTENT_MOVE_FACTOR&&(a=!1)}if(a){this._lastExtent=[...t],this._lastResolution=r??null;const h=this._sortByDeps(s),l=new Map;for(const g of h){const p=g.getVisibleTiles(t,i,r);if(g.dependsOn.length>0){const m=new Set;for(const v of g.dependsOn){if(!h.includes(v))continue;const y=v.getVisibleTiles(t,i,r);for(const L of y)m.add(Te(L))}const x=p.filter(v=>{const y=Te(v);return m.has(y)&&this._loadedTiles.has(y)});if(x.length===0)continue;for(const v of x){if(l.size>=ln.MAX_TOTAL_TILES)break;this._addKeyRequest(v,g,l)}continue}for(const m of p){if(l.size>=ln.MAX_TOTAL_TILES)break;this._addKeyRequest(m,g,l)}if(l.size>=ln.MAX_TOTAL_TILES)break}const c=new Set(l.keys());for(const[g,p]of this._loading)c.has(g)||(p.controller.abort(),this._loading.delete(g),this.scheduler.abortByKey(g));this.scheduler.cancelOffscreen(c);const u=[];for(const[g,{key:p,layerIds:m,bounds:x}]of l){const v=(x[0]+x[2])/2,y=(x[1]+x[3])/2,L=v-e.x,T=y-e.y,b=Math.sqrt(L*L+T*T),C=(x[2]-x[0])*(x[3]-x[1]);u.push({tileKey:p,layerIds:[...m],distanceToCamera:b,screenArea:Math.min(C/1e6,1),inFrustum:!0})}const d=[],f=new Set;for(const g of u){const p=s.find(v=>v.id===g.layerIds[0]);if(!p)continue;const m=p.tileScheme.getParentKey(g.tileKey);if(!m)continue;const x=Te(m);if(!this._loadedTiles.has(x)&&!this.cache.has(x)&&!l.has(x)&&!d.some(v=>Te(v.tileKey)===x)&&!this._loading.has(x)){const v=p.tileScheme.getTileBounds(m),y=(v[0]+v[2])/2,L=(v[1]+v[3])/2,T=y-e.x,b=L-e.y,C=Math.sqrt(T*T+b*b),w=(v[2]-v[0])*(v[3]-v[1]);d.push({tileKey:m,layerIds:g.layerIds,distanceToCamera:C,screenArea:Math.min(w/1e6,1),inFrustum:!0}),f.add(Te(g.tileKey))}}const _=[...d,...u];this.scheduler.schedule(_)}const o=this.scheduler.takeNext();for(const h of o)this._loadTile(h,s)}async loadTileNow(t,e){var l;const i=e.tileScheme,s=i.getTileBounds(t),r=ln._snapOrigin(s),a=new ql(t,s,r);a.reprojector=((l=i.getReprojector)==null?void 0:l.call(i,t))??void 0;const o=new AbortController,h=await this._loadFn(a,e,o.signal);if(h){a.state="loaded",a.contents.push(h);const c=Te(t);this._loadedTiles.set(c,a),this.cache.set(c,a,this._estimateBytes(a))}return h}evict(t){this.cache.trim(t);for(const[e,i]of this._loadedTiles)this.cache.has(e)||this._loadedTiles.delete(e)}dispose(){this.scheduler.abortAll();for(const[,t]of this._loading)t.controller.abort();this._loading.clear(),this.cache.clear(),this._loadedTiles.clear()}_sortByDeps(t){const e=new Set,i=[],s=r=>{if(!e.has(r.id)){e.add(r.id);for(const a of r.dependsOn)t.includes(a)&&s(a);i.push(r)}};for(const r of t)s(r);return i}_addKeyRequest(t,e,i){const s=Te(t);if(this._loading.has(s)){this._loading.get(s).layerIds.add(e.id);return}if(this._loadedTiles.has(s)){const r=this._loadedTiles.get(s);if(r.lastAccessTime=Date.now(),r.contents.some(a=>a.layerId===e.id))return}if(this.cache.has(s)){const r=this.cache.get(s);if(this._loadedTiles.set(s,r),r.lastAccessTime=Date.now(),r.contents.some(a=>a.layerId===e.id))return}if(i.has(s))i.get(s).layerIds.add(e.id);else{const r=e.tileScheme.getTileBounds(t);i.set(s,{key:t,layerIds:new Set([e.id]),bounds:r})}}async _loadTile(t,e){var o;const i=Te(t.tileKey);let s=this._loadedTiles.get(i),r=!1;if(!s){const h=e.find(d=>t.layerIds.includes(d.id));if(!h)return;const l=h.tileScheme,c=l.getTileBounds(t.tileKey),u=ln._snapOrigin(c);s=new ql(t.tileKey,c,u),s.reprojector=((o=l.getReprojector)==null?void 0:o.call(l,t.tileKey))??void 0,r=!0}const a=new AbortController;this._loading.set(i,{controller:a,layerIds:new Set(t.layerIds)}),this.scheduler.startLoading(t.tileKey,a);try{s.state="loading";for(const h of t.layerIds){const l=e.find(d=>d.id===h);if(!l||s.contents.some(d=>d.layerId===h))continue;const u=await this._loadFn(s,l,a.signal);u&&s.contents.push(u)}s.contents.length>0?(s.state="loaded",r&&(this._loadedTiles.set(i,s),this.cache.set(i,s,this._estimateBytes(s))),this.scheduler.markLoaded(t.tileKey)):(s.state="failed",this.scheduler.markFailed(t.tileKey))}catch(h){if((h==null?void 0:h.name)==="AbortError")return;s.state="failed",s.failCount++,this.scheduler.markFailed(t.tileKey)}finally{this._loading.delete(i)}}_estimateBytes(t){let e=1024;for(const i of t.contents)e+=i.renderObjects.length*1024;return e}static _snapOrigin(t){const e=t[2]-t[0],i=t[3]-t[1],s=Math.max(1,Math.min(e,i)/4);return{x:Math.floor(t[0]/s)*s,y:Math.floor(t[1]/s)*s,z:0}}};O(ln,"EXTENT_MOVE_FACTOR",.05),O(ln,"MAX_TOTAL_TILES",8192);let Wo=ln;const la=class la{constructor(t){O(this,"crs");O(this,"layerManager",new kg);O(this,"floatingOrigin");O(this,"tileManager");O(this,"cameraController");O(this,"_container");O(this,"_maxCacheBytes");O(this,"_running",!1);O(this,"_rafId",0);O(this,"_lastTime",0);O(this,"_mapUpdateTime",0);O(this,"_tick",()=>{if(!this._running)return;const t=performance.now(),e=(t-this._lastTime)/1e3;if(this._lastTime=t,this.cameraController.update(e),t-this._mapUpdateTime>=la.UPDATE_INTERVAL_MS){this._mapUpdateTime=t;const s=this.cameraController.extent,r=this.cameraController.cameraWorldPos;this.floatingOrigin.update(r);const a=this.layerManager.getVisibleLayers();this.tileManager.update(s,r,this.crs,a,this.cameraController.resolution),this.tileManager.evict(this._maxCacheBytes)}this._rafId=requestAnimationFrame(this._tick)});if(this.crs=t.crs,this._container=t.container,this._maxCacheBytes=t.maxCacheBytes??256*1024*1024,this.floatingOrigin=t.floatingOrigin??new Vg({threshold:500}),this.tileManager=new Wo(t.tileCache??new Hg,this.floatingOrigin,t.tileLoadFn),this.cameraController=t.cameraController??new Wg,t.groups)for(const e of t.groups)this.layerManager.addGroup(e)}get tileCache(){return this.tileManager.cache}start(){this._running||(this._running=!0,this.cameraController.attach(this._container),this._lastTime=performance.now(),this._tick())}stop(){this._running=!1,this._rafId&&(cancelAnimationFrame(this._rafId),this._rafId=0),this.cameraController.detach()}dispose(){this.stop(),this.tileManager.dispose(),this.cameraController.dispose(),this.layerManager.clear()}crsToWorld(t){return{x:t.x-this.floatingOrigin.current.x,y:t.y-this.floatingOrigin.current.y,z:t.z}}worldToCrs(t){return{x:t.x+this.floatingOrigin.current.x,y:t.y+this.floatingOrigin.current.y,z:t.z}}screenToCrs(t,e,i,s){const r=e.x/i*2-1,a=-(e.y/s)*2+1,o=t.left+(r+1)/2*(t.right-t.left),h=t.bottom+(a+1)/2*(t.top-t.bottom);return this.worldToCrs({x:o,y:h,z:0})}};O(la,"UPDATE_INTERVAL_MS",100);let Xo=la;const Ye=class Ye{constructor(t){O(this,"name");O(this,"units","meter");O(this,"centralMeridian");O(this,"falseEasting",5e5);O(this,"falseNorthing",0);this.centralMeridian=3*t,this.name=`CGCS2000_GK_${t}`}project(t,e){const i=this.toRadians(t-this.centralMeridian),s=this.toRadians(e),{a:r,e2:a,eP2:o}=Ye,h=Math.sin(s),l=Math.cos(s),c=Math.tan(s),u=r/Math.sqrt(1-a*h*h),d=c*c,f=o*l*l,_=i*l,g=a*a,p=g*a,m=r*((1-a/4-3*g/64-5*p/256)*s-(3*a/8+3*g/32+45*p/1024)*Math.sin(2*s)+(15*g/256+45*p/1024)*Math.sin(4*s)-35*p/3072*Math.sin(6*s)),x=this.falseEasting+u*(_+(1-d+f)*_*_*_/6+(5-18*d+d*d+72*f-58*o)*_*_*_*_*_/120),v=this.falseNorthing+m+u*c*(_*_/2+(5-d+9*f+4*f*f)*_*_*_*_/24+(61-58*d+d*d+600*f-330*o)*_*_*_*_*_*_/720);return{x,y:v}}unproject(t,e){const{a:i,e2:s,eP2:r}=Ye,a=s*s,o=a*s,h=1-s/4-3*a/64-5*o/256,l=(e-this.falseNorthing)/(i*h),c=(1-Math.sqrt(1-s))/(1+Math.sqrt(1-s)),u=Math.sin(2*l),d=Math.sin(4*l),f=Math.sin(6*l),_=Math.sin(8*l),g=c*c,p=g*c,m=p*c,x=l+(3*c/2-27*p/32)*u+(21*g/16-55*m/32)*d+151*p/96*f+1097*m/512*_,v=Math.sin(x),y=Math.cos(x),L=Math.tan(x),T=i/Math.sqrt(1-s*v*v),b=L*L,C=r*y*y,w=(t-this.falseEasting)/T,S=i*(1-s)/Math.pow(1-s*v*v,1.5),P=T*L/S*(w*w/2-(5+3*b+10*C-4*C*C-9*r)*w*w*w*w/24+(61+90*b+298*C+45*b*b-252*r-3*C*C)*w*w*w*w*w*w/720),k=x-P,B=this.toRadians(this.centralMeridian)+(w-(1+2*b+C)*w*w*w/6+(5-2*C+28*b-3*C*C+8*r+24*b*b)*w*w*w*w*w/120)/y;return{lon:this.toDegrees(B),lat:this.toDegrees(k)}}toRadians(t){return t*Math.PI/180}toDegrees(t){return t*180/Math.PI}};O(Ye,"a",6378137),O(Ye,"f",1/298.257222101),O(Ye,"e2",2*Ye.f-Ye.f*Ye.f),O(Ye,"eP2",Ye.e2/(1-Ye.e2));let Yl=Ye;const Yi=class Yi{constructor(){O(this,"name","EPSG:3857");O(this,"units","meter")}project(t,e){const i=t*Math.PI/180,s=e*Math.PI/180,r=Yi.R,a=i*r,o=r*Math.log(Math.tan(Math.PI/4+s/2));return{x:a,y:o}}unproject(t,e){const i=Yi.R,s=t/i*(180/Math.PI),r=Math.atan(Math.sinh(e/i))*(180/Math.PI);return{lon:s,lat:r}}static clampLat(t){return Math.max(-this.MAX_LAT,Math.min(this.MAX_LAT,t))}};O(Yi,"R",6378137),O(Yi,"MAX_LAT",85.0511287798066);let as=Yi;function Yg(n){n("EPSG:4326","+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"),n("EPSG:4269","+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"),n("EPSG:3857","+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");for(var t=1;t<=60;++t)n("EPSG:"+(32600+t),"+proj=utm +zone="+t+" +datum=WGS84 +units=m"),n("EPSG:"+(32700+t),"+proj=utm +zone="+t+" +south +datum=WGS84 +units=m");n("EPSG:5041","+title=WGS 84 / UPS North (E,N) +proj=stere +lat_0=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m"),n("EPSG:5042","+title=WGS 84 / UPS South (E,N) +proj=stere +lat_0=-90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m"),n.WGS84=n["EPSG:4326"],n["EPSG:3785"]=n["EPSG:3857"],n.GOOGLE=n["EPSG:3857"],n["EPSG:900913"]=n["EPSG:3857"],n["EPSG:102113"]=n["EPSG:3857"]}var _i=1,gi=2,Qi=3,$g=4,qo=5,$l=6378137,jg=6356752314e-3,jl=.0066943799901413165,Cs=484813681109536e-20,J=Math.PI/2,Kg=.16666666666666666,Zg=.04722222222222222,Jg=.022156084656084655,st=1e-10,oe=.017453292519943295,Be=57.29577951308232,$t=Math.PI/4,zs=Math.PI*2,le=3.14159265359,He={};He.greenwich=0;He.lisbon=-9.131906111111;He.paris=2.337229166667;He.bogota=-74.080916666667;He.madrid=-3.687938888889;He.rome=12.452333333333;He.bern=7.439583333333;He.jakarta=106.807719444444;He.ferro=-17.666666666667;He.brussels=4.367975;He.stockholm=18.058277777778;He.athens=23.7163375;He.oslo=10.722916666667;const Qg={mm:{to_meter:.001},cm:{to_meter:.01},ft:{to_meter:.3048},"us-ft":{to_meter:1200/3937},fath:{to_meter:1.8288},kmi:{to_meter:1852},"us-ch":{to_meter:20.1168402336805},"us-mi":{to_meter:1609.34721869444},km:{to_meter:1e3},"ind-ft":{to_meter:.30479841},"ind-yd":{to_meter:.91439523},mi:{to_meter:1609.344},yd:{to_meter:.9144},ch:{to_meter:20.1168},link:{to_meter:.201168},dm:{to_meter:.1},in:{to_meter:.0254},"ind-ch":{to_meter:20.11669506},"us-in":{to_meter:.025400050800101},"us-yd":{to_meter:.914401828803658}};var Kl=/[\s_\-\/\(\)]/g;function $n(n,t){if(n[t])return n[t];for(var e=Object.keys(n),i=t.toLowerCase().replace(Kl,""),s=-1,r,a;++s<e.length;)if(r=e[s],a=r.toLowerCase().replace(Kl,""),a===i)return n[r]}function Yo(n){var t={},e=n.split("+").map(function(o){return o.trim()}).filter(function(o){return o}).reduce(function(o,h){var l=h.split("=");return l.push(!0),o[l[0].toLowerCase()]=l[1],o},{}),i,s,r,a={proj:"projName",datum:"datumCode",rf:function(o){t.rf=parseFloat(o)},lat_0:function(o){t.lat0=o*oe},lat_1:function(o){t.lat1=o*oe},lat_2:function(o){t.lat2=o*oe},lat_ts:function(o){t.lat_ts=o*oe},lon_0:function(o){t.long0=o*oe},lon_1:function(o){t.long1=o*oe},lon_2:function(o){t.long2=o*oe},alpha:function(o){t.alpha=parseFloat(o)*oe},gamma:function(o){t.rectified_grid_angle=parseFloat(o)*oe},lonc:function(o){t.longc=o*oe},x_0:function(o){t.x0=parseFloat(o)},y_0:function(o){t.y0=parseFloat(o)},k_0:function(o){t.k0=parseFloat(o)},k:function(o){t.k0=parseFloat(o)},a:function(o){t.a=parseFloat(o)},b:function(o){t.b=parseFloat(o)},r:function(o){t.a=t.b=parseFloat(o)},r_a:function(){t.R_A=!0},zone:function(o){t.zone=parseInt(o,10)},south:function(){t.utmSouth=!0},towgs84:function(o){t.datum_params=o.split(",").map(function(h){return parseFloat(h)})},to_meter:function(o){t.to_meter=parseFloat(o)},units:function(o){t.units=o;var h=$n(Qg,o);h&&(t.to_meter=h.to_meter)},from_greenwich:function(o){t.from_greenwich=o*oe},pm:function(o){var h=$n(He,o);t.from_greenwich=(h||parseFloat(o))*oe},nadgrids:function(o){o==="@null"?t.datumCode="none":t.nadgrids=o},axis:function(o){var h="ewnsud";o.length===3&&h.indexOf(o.substr(0,1))!==-1&&h.indexOf(o.substr(1,1))!==-1&&h.indexOf(o.substr(2,1))!==-1&&(t.axis=o)},approx:function(){t.approx=!0},over:function(){t.over=!0}};for(i in e)s=e[i],i in a?(r=a[i],typeof r=="function"?r(s):t[r]=s):t[i]=s;return typeof t.datumCode=="string"&&t.datumCode!=="WGS84"&&(t.datumCode=t.datumCode.toLowerCase()),t.projStr=n,t}class tv{static getId(t){const e=t.find(i=>Array.isArray(i)&&i[0]==="ID");return e&&e.length>=3?{authority:e[1],code:parseInt(e[2],10)}:null}static convertUnit(t,e="unit"){if(!t||t.length<3)return{type:e,name:"unknown",conversion_factor:null};const i=t[1],s=parseFloat(t[2])||null,r=t.find(o=>Array.isArray(o)&&o[0]==="ID"),a=r?{authority:r[1],code:parseInt(r[2],10)}:null;return{type:e,name:i,conversion_factor:s,id:a}}static convertAxis(t){const e=t[1]||"Unknown";let i;const s=e.match(/^\((.)\)$/);if(s){const l=s[1].toUpperCase();if(l==="E")i="east";else if(l==="N")i="north";else if(l==="U")i="up";else if(t[2])i=t[2];else throw new Error(`Unknown axis abbreviation: ${l}`)}else i=t[2]||"unknown";const r=t.find(l=>Array.isArray(l)&&l[0]==="ORDER"),a=r?parseInt(r[1],10):null,o=t.find(l=>Array.isArray(l)&&(l[0]==="LENGTHUNIT"||l[0]==="ANGLEUNIT"||l[0]==="SCALEUNIT")),h=this.convertUnit(o);return{name:e,direction:i,unit:h,order:a}}static extractAxes(t){return t.filter(e=>Array.isArray(e)&&e[0]==="AXIS").map(e=>this.convertAxis(e)).sort((e,i)=>(e.order||0)-(i.order||0))}static convert(t,e={}){switch(t[0]){case"PROJCRS":e.type="ProjectedCRS",e.name=t[1],e.base_crs=t.find(f=>Array.isArray(f)&&f[0]==="BASEGEOGCRS")?this.convert(t.find(f=>Array.isArray(f)&&f[0]==="BASEGEOGCRS")):null,e.conversion=t.find(f=>Array.isArray(f)&&f[0]==="CONVERSION")?this.convert(t.find(f=>Array.isArray(f)&&f[0]==="CONVERSION")):null;const i=t.find(f=>Array.isArray(f)&&f[0]==="CS");i&&(e.coordinate_system={subtype:i[1],axis:this.extractAxes(t)});const s=t.find(f=>Array.isArray(f)&&f[0]==="LENGTHUNIT");if(s){const f=this.convertUnit(s);e.coordinate_system.unit=f}e.id=this.getId(t);break;case"BASEGEOGCRS":case"GEOGCRS":case"GEODCRS":e.type=t[0]==="GEODCRS"?"GeodeticCRS":"GeographicCRS",e.name=t[1];const r=t.find(f=>Array.isArray(f)&&(f[0]==="DATUM"||f[0]==="ENSEMBLE"));if(r){const f=this.convert(r);r[0]==="ENSEMBLE"?e.datum_ensemble=f:e.datum=f;const _=t.find(g=>Array.isArray(g)&&g[0]==="PRIMEM");_&&_[1]!=="Greenwich"&&(f.prime_meridian={name:_[1],longitude:parseFloat(_[2])})}const a=t.find(f=>Array.isArray(f)&&f[0]==="CS");e.coordinate_system={subtype:a?a[1]:"ellipsoidal",axis:this.extractAxes(t)},e.id=this.getId(t);break;case"DATUM":e.type="GeodeticReferenceFrame",e.name=t[1],e.ellipsoid=t.find(f=>Array.isArray(f)&&f[0]==="ELLIPSOID")?this.convert(t.find(f=>Array.isArray(f)&&f[0]==="ELLIPSOID")):null;break;case"ENSEMBLE":e.type="DatumEnsemble",e.name=t[1],e.members=t.filter(f=>Array.isArray(f)&&f[0]==="MEMBER").map(f=>({type:"DatumEnsembleMember",name:f[1],id:this.getId(f)}));const o=t.find(f=>Array.isArray(f)&&f[0]==="ENSEMBLEACCURACY");o&&(e.accuracy=parseFloat(o[1]));const h=t.find(f=>Array.isArray(f)&&f[0]==="ELLIPSOID");h&&(e.ellipsoid=this.convert(h)),e.id=this.getId(t);break;case"ELLIPSOID":e.type="Ellipsoid",e.name=t[1],e.semi_major_axis=parseFloat(t[2]),e.inverse_flattening=parseFloat(t[3]),t.find(f=>Array.isArray(f)&&f[0]==="LENGTHUNIT")&&this.convert(t.find(f=>Array.isArray(f)&&f[0]==="LENGTHUNIT"),e);break;case"CONVERSION":e.type="Conversion",e.name=t[1],e.method=t.find(f=>Array.isArray(f)&&f[0]==="METHOD")?this.convert(t.find(f=>Array.isArray(f)&&f[0]==="METHOD")):null,e.parameters=t.filter(f=>Array.isArray(f)&&f[0]==="PARAMETER").map(f=>this.convert(f));break;case"METHOD":e.type="Method",e.name=t[1],e.id=this.getId(t);break;case"PARAMETER":e.type="Parameter",e.name=t[1],e.value=parseFloat(t[2]),e.unit=this.convertUnit(t.find(f=>Array.isArray(f)&&(f[0]==="LENGTHUNIT"||f[0]==="ANGLEUNIT"||f[0]==="SCALEUNIT"))),e.id=this.getId(t);break;case"BOUNDCRS":e.type="BoundCRS";const l=t.find(f=>Array.isArray(f)&&f[0]==="SOURCECRS");if(l){const f=l.find(_=>Array.isArray(_));e.source_crs=f?this.convert(f):null}const c=t.find(f=>Array.isArray(f)&&f[0]==="TARGETCRS");if(c){const f=c.find(_=>Array.isArray(_));e.target_crs=f?this.convert(f):null}const u=t.find(f=>Array.isArray(f)&&f[0]==="ABRIDGEDTRANSFORMATION");u?e.transformation=this.convert(u):e.transformation=null;break;case"ABRIDGEDTRANSFORMATION":if(e.type="Transformation",e.name=t[1],e.method=t.find(f=>Array.isArray(f)&&f[0]==="METHOD")?this.convert(t.find(f=>Array.isArray(f)&&f[0]==="METHOD")):null,e.parameters=t.filter(f=>Array.isArray(f)&&(f[0]==="PARAMETER"||f[0]==="PARAMETERFILE")).map(f=>{if(f[0]==="PARAMETER")return this.convert(f);if(f[0]==="PARAMETERFILE")return{name:f[1],value:f[2],id:{authority:"EPSG",code:8656}}}),e.parameters.length===7){const f=e.parameters[6];f.name==="Scale difference"&&(f.value=Math.round((f.value-1)*1e12)/1e6)}e.id=this.getId(t);break;case"AXIS":e.coordinate_system||(e.coordinate_system={type:"unspecified",axis:[]}),e.coordinate_system.axis.push(this.convertAxis(t));break;case"LENGTHUNIT":const d=this.convertUnit(t,"LinearUnit");e.coordinate_system&&e.coordinate_system.axis&&e.coordinate_system.axis.forEach(f=>{f.unit||(f.unit=d)}),d.conversion_factor&&d.conversion_factor!==1&&e.semi_major_axis&&(e.semi_major_axis={value:e.semi_major_axis,unit:d});break;default:e.keyword=t[0];break}return e}}function ev(n){return tv.convert(n)}function nv(n){const t=n.toUpperCase();return t.includes("PROJCRS")||t.includes("GEOGCRS")||t.includes("BOUNDCRS")||t.includes("VERTCRS")||t.includes("LENGTHUNIT")||t.includes("ANGLEUNIT")||t.includes("SCALEUNIT")?"WKT2":(t.includes("PROJCS")||t.includes("GEOGCS")||t.includes("LOCAL_CS")||t.includes("VERT_CS")||t.includes("UNIT"),"WKT1")}var ks=1,su=2,ru=3,Qr=4,au=5,gh=-1,iv=/\s/,sv=/[A-Za-z]/,rv=/[A-Za-z84_]/,Ma=/[,\]]/,ou=/[\d\.E\-\+]/;function Nn(n){if(typeof n!="string")throw new Error("not a string");this.text=n.trim(),this.level=0,this.place=0,this.root=null,this.stack=[],this.currentObject=null,this.state=ks}Nn.prototype.readCharicter=function(){var n=this.text[this.place++];if(this.state!==Qr)for(;iv.test(n);){if(this.place>=this.text.length)return;n=this.text[this.place++]}switch(this.state){case ks:return this.neutral(n);case su:return this.keyword(n);case Qr:return this.quoted(n);case au:return this.afterquote(n);case ru:return this.number(n);case gh:return}};Nn.prototype.afterquote=function(n){if(n==='"'){this.word+='"',this.state=Qr;return}if(Ma.test(n)){this.word=this.word.trim(),this.afterItem(n);return}throw new Error(`havn't handled "`+n+'" in afterquote yet, index '+this.place)};Nn.prototype.afterItem=function(n){if(n===","){this.word!==null&&this.currentObject.push(this.word),this.word=null,this.state=ks;return}if(n==="]"){this.level--,this.word!==null&&(this.currentObject.push(this.word),this.word=null),this.state=ks,this.currentObject=this.stack.pop(),this.currentObject||(this.state=gh);return}};Nn.prototype.number=function(n){if(ou.test(n)){this.word+=n;return}if(Ma.test(n)){this.word=parseFloat(this.word),this.afterItem(n);return}throw new Error(`havn't handled "`+n+'" in number yet, index '+this.place)};Nn.prototype.quoted=function(n){if(n==='"'){this.state=au;return}this.word+=n};Nn.prototype.keyword=function(n){if(rv.test(n)){this.word+=n;return}if(n==="["){var t=[];t.push(this.word),this.level++,this.root===null?this.root=t:this.currentObject.push(t),this.stack.push(this.currentObject),this.currentObject=t,this.state=ks;return}if(Ma.test(n)){this.afterItem(n);return}throw new Error(`havn't handled "`+n+'" in keyword yet, index '+this.place)};Nn.prototype.neutral=function(n){if(sv.test(n)){this.word=n,this.state=su;return}if(n==='"'){this.word="",this.state=Qr;return}if(ou.test(n)){this.word=n,this.state=ru;return}if(Ma.test(n)){this.afterItem(n);return}throw new Error(`havn't handled "`+n+'" in neutral yet, index '+this.place)};Nn.prototype.output=function(){for(;this.place<this.text.length;)this.readCharicter();if(this.state===gh)return this.root;throw new Error('unable to parse string "'+this.text+'". State is '+this.state)};function av(n){var t=new Nn(n);return t.output()}function to(n,t,e){Array.isArray(t)&&(e.unshift(t),t=null);var i=t?{}:n,s=e.reduce(function(r,a){return Vi(a,r),r},i);t&&(n[t]=s)}function Vi(n,t){if(!Array.isArray(n)){t[n]=!0;return}var e=n.shift();if(e==="PARAMETER"&&(e=n.shift()),n.length===1){if(Array.isArray(n[0])){t[e]={},Vi(n[0],t[e]);return}t[e]=n[0];return}if(!n.length){t[e]=!0;return}if(e==="TOWGS84"){t[e]=n;return}if(e==="AXIS"){e in t||(t[e]=[]),t[e].push(n);return}Array.isArray(e)||(t[e]={});var i;switch(e){case"UNIT":case"PRIMEM":case"VERT_DATUM":t[e]={name:n[0].toLowerCase(),convert:n[1]},n.length===3&&Vi(n[2],t[e]);return;case"SPHEROID":case"ELLIPSOID":t[e]={name:n[0],a:n[1],rf:n[2]},n.length===4&&Vi(n[3],t[e]);return;case"EDATUM":case"ENGINEERINGDATUM":case"LOCAL_DATUM":case"DATUM":case"VERT_CS":case"VERTCRS":case"VERTICALCRS":n[0]=["name",n[0]],to(t,e,n);return;case"COMPD_CS":case"COMPOUNDCRS":case"FITTED_CS":case"PROJECTEDCRS":case"PROJCRS":case"GEOGCS":case"GEOCCS":case"PROJCS":case"LOCAL_CS":case"GEODCRS":case"GEODETICCRS":case"GEODETICDATUM":case"ENGCRS":case"ENGINEERINGCRS":n[0]=["name",n[0]],to(t,e,n),t[e].type=e;return;default:for(i=-1;++i<n.length;)if(!Array.isArray(n[i]))return Vi(n,t[e]);return to(t,e,n)}}var ov=.017453292519943295;function Je(n){return n*ov}function hu(n){const t=(n.projName||"").toLowerCase().replace(/_/g," ");n.long0===void 0&&n.longc!==void 0&&(n.long0=n.longc),!n.lat_ts&&n.lat1&&(t==="stereographic south pole"||t==="polar stereographic (variant b)")?(n.lat0=Je(n.lat1>0?90:-90),n.lat_ts=n.lat1,delete n.lat1):!n.lat_ts&&n.lat0&&(t==="polar stereographic"||t==="polar stereographic (variant a)")&&(n.lat_ts=n.lat0,n.lat0=Je(n.lat0>0?90:-90),delete n.lat1)}function Zl(n){let t={units:null,to_meter:void 0};return typeof n=="string"?(t.units=n.toLowerCase(),t.units==="metre"&&(t.units="meter"),t.units==="meter"&&(t.to_meter=1)):n&&n.name&&(t.units=n.name.toLowerCase(),t.units==="metre"&&(t.units="meter"),t.to_meter=n.conversion_factor),t}function Jl(n){return typeof n=="object"?n.value*n.unit.conversion_factor:n}function Ql(n,t){n.ellipsoid.radius?(t.a=n.ellipsoid.radius,t.rf=0):(t.a=Jl(n.ellipsoid.semi_major_axis),n.ellipsoid.inverse_flattening!==void 0?t.rf=n.ellipsoid.inverse_flattening:n.ellipsoid.semi_major_axis!==void 0&&n.ellipsoid.semi_minor_axis!==void 0&&(t.rf=t.a/(t.a-Jl(n.ellipsoid.semi_minor_axis))))}function ta(n,t={}){return!n||typeof n!="object"?n:n.type==="BoundCRS"?(ta(n.source_crs,t),n.transformation&&(n.transformation.method&&n.transformation.method.name==="NTv2"?t.nadgrids=n.transformation.parameters[0].value:t.datum_params=n.transformation.parameters.map(e=>e.value)),t):(Object.keys(n).forEach(e=>{const i=n[e];if(i!==null)switch(e){case"name":if(t.srsCode)break;t.name=i,t.srsCode=i;break;case"type":i==="GeographicCRS"?t.projName="longlat":i==="GeodeticCRS"?n.coordinate_system&&n.coordinate_system.subtype==="Cartesian"?t.projName="geocent":t.projName="longlat":i==="ProjectedCRS"&&n.conversion&&n.conversion.method&&(t.projName=n.conversion.method.name);break;case"datum":case"datum_ensemble":i.ellipsoid&&(t.ellps=i.ellipsoid.name,Ql(i,t)),i.prime_meridian&&(t.from_greenwich=i.prime_meridian.longitude*Math.PI/180);break;case"ellipsoid":t.ellps=i.name,Ql(i,t);break;case"prime_meridian":t.long0=(i.longitude||0)*Math.PI/180;break;case"coordinate_system":if(i.axis){const s={east:"e",north:"n",west:"w",south:"s",up:"u",down:"d",geocentricx:"e",geocentricy:"n",geocentricz:"u"},r=i.axis.map(a=>s[a.direction.toLowerCase()]);if(r.every(Boolean)&&(t.axis=r.join(""),t.axis.length===2&&(t.axis+="u")),i.unit){const{units:a,to_meter:o}=Zl(i.unit);t.units=a,t.to_meter=o}else if(i.axis[0]&&i.axis[0].unit){const{units:a,to_meter:o}=Zl(i.axis[0].unit);t.units=a,t.to_meter=o}}break;case"id":i.authority&&i.code&&(t.title=i.authority+":"+i.code);break;case"conversion":i.method&&i.method.name&&(t.projName=i.method.name),i.parameters&&i.parameters.forEach(s=>{const r=s.name.toLowerCase().replace(/\s+/g,"_"),a=s.value;s.unit&&s.unit.conversion_factor?t[r]=a*s.unit.conversion_factor:s.unit==="degree"?t[r]=a*Math.PI/180:t[r]=a});break;case"unit":i.name&&(t.units=i.name.toLowerCase(),t.units==="metre"&&(t.units="meter")),i.conversion_factor&&(t.to_meter=i.conversion_factor);break;case"base_crs":ta(i,t),t.datumCode=i.id?i.id.authority+"_"+i.id.code:i.name;break}}),t.latitude_of_false_origin!==void 0&&(t.lat0=t.latitude_of_false_origin),t.longitude_of_false_origin!==void 0&&(t.long0=t.longitude_of_false_origin),t.latitude_of_standard_parallel!==void 0&&(t.lat0=t.latitude_of_standard_parallel,t.lat1=t.latitude_of_standard_parallel),t.latitude_of_1st_standard_parallel!==void 0&&(t.lat1=t.latitude_of_1st_standard_parallel),t.latitude_of_2nd_standard_parallel!==void 0&&(t.lat2=t.latitude_of_2nd_standard_parallel),t.latitude_of_projection_centre!==void 0&&(t.lat0=t.latitude_of_projection_centre),t.longitude_of_projection_centre!==void 0&&(t.longc=t.longitude_of_projection_centre),t.easting_at_false_origin!==void 0&&(t.x0=t.easting_at_false_origin),t.northing_at_false_origin!==void 0&&(t.y0=t.northing_at_false_origin),t.latitude_of_natural_origin!==void 0&&(t.lat0=t.latitude_of_natural_origin),t.longitude_of_natural_origin!==void 0&&(t.long0=t.longitude_of_natural_origin),t.longitude_of_origin!==void 0&&(t.long0=t.longitude_of_origin),t.false_easting!==void 0&&(t.x0=t.false_easting),t.easting_at_projection_centre&&(t.x0=t.easting_at_projection_centre),t.false_northing!==void 0&&(t.y0=t.false_northing),t.northing_at_projection_centre&&(t.y0=t.northing_at_projection_centre),t.standard_parallel_1!==void 0&&(t.lat1=t.standard_parallel_1),t.standard_parallel_2!==void 0&&(t.lat2=t.standard_parallel_2),t.scale_factor_at_natural_origin!==void 0&&(t.k0=t.scale_factor_at_natural_origin),t.scale_factor_at_projection_centre!==void 0&&(t.k0=t.scale_factor_at_projection_centre),t.scale_factor_on_pseudo_standard_parallel!==void 0&&(t.k0=t.scale_factor_on_pseudo_standard_parallel),t.azimuth!==void 0&&(t.alpha=t.azimuth),t.azimuth_at_projection_centre!==void 0&&(t.alpha=t.azimuth_at_projection_centre),t.angle_from_rectified_to_skew_grid&&(t.rectified_grid_angle=t.angle_from_rectified_to_skew_grid),hu(t),t)}var hv=["PROJECTEDCRS","PROJCRS","GEOGCS","GEOCCS","PROJCS","LOCAL_CS","GEODCRS","GEODETICCRS","GEODETICDATUM","ENGCRS","ENGINEERINGCRS"];function lv(n,t){var e=t[0],i=t[1];!(e in n)&&i in n&&(n[e]=n[i],t.length===3&&(n[e]=t[2](n[e])))}function lu(n){for(var t=Object.keys(n),e=0,i=t.length;e<i;++e){var s=t[e];hv.indexOf(s)!==-1&&cv(n[s]),typeof n[s]=="object"&&lu(n[s])}}function cv(n){if(n.AUTHORITY){var t=Object.keys(n.AUTHORITY)[0];t&&t in n.AUTHORITY&&(n.title=t+":"+n.AUTHORITY[t])}if(n.type==="GEOGCS"?n.projName="longlat":n.type==="LOCAL_CS"?(n.projName="identity",n.local=!0):typeof n.PROJECTION=="object"?n.projName=Object.keys(n.PROJECTION)[0]:n.projName=n.PROJECTION,n.AXIS){for(var e="",i=0,s=n.AXIS.length;i<s;++i){var r=[n.AXIS[i][0].toLowerCase(),n.AXIS[i][1].toLowerCase()];r[0].indexOf("north")!==-1||(r[0]==="y"||r[0]==="lat")&&r[1]==="north"?e+="n":r[0].indexOf("south")!==-1||(r[0]==="y"||r[0]==="lat")&&r[1]==="south"?e+="s":r[0].indexOf("east")!==-1||(r[0]==="x"||r[0]==="lon")&&r[1]==="east"?e+="e":(r[0].indexOf("west")!==-1||(r[0]==="x"||r[0]==="lon")&&r[1]==="west")&&(e+="w")}e.length===2&&(e+="u"),e.length===3&&(n.axis=e)}n.UNIT&&(n.units=n.UNIT.name.toLowerCase(),n.units==="metre"&&(n.units="meter"),n.UNIT.convert&&(n.type==="GEOGCS"?n.DATUM&&n.DATUM.SPHEROID&&(n.to_meter=n.UNIT.convert*n.DATUM.SPHEROID.a):n.to_meter=n.UNIT.convert));var a=n.GEOGCS;n.type==="GEOGCS"&&(a=n),a&&(a.PRIMEM&&a.PRIMEM.convert&&(n.from_greenwich=Je(a.PRIMEM.convert)),a.DATUM?n.datumCode=a.DATUM.name.toLowerCase():n.datumCode=a.name.toLowerCase(),n.datumCode.slice(0,2)==="d_"&&(n.datumCode=n.datumCode.slice(2)),n.datumCode==="new_zealand_1949"&&(n.datumCode="nzgd49"),(n.datumCode==="wgs_1984"||n.datumCode==="world_geodetic_system_1984")&&(n.PROJECTION==="Mercator_Auxiliary_Sphere"&&(n.sphere=!0),n.datumCode="wgs84"),n.datumCode==="belge_1972"&&(n.datumCode="rnb72"),a.DATUM&&a.DATUM.SPHEROID&&(n.ellps=a.DATUM.SPHEROID.name.replace("_19","").replace(/[Cc]larke\_18/,"clrk"),n.ellps.toLowerCase().slice(0,13)==="international"&&(n.ellps="intl"),n.a=a.DATUM.SPHEROID.a,n.rf=parseFloat(a.DATUM.SPHEROID.rf)),a.DATUM&&a.DATUM.TOWGS84&&(n.datum_params=a.DATUM.TOWGS84),~n.datumCode.indexOf("osgb_1936")&&(n.datumCode="osgb36"),~n.datumCode.indexOf("osni_1952")&&(n.datumCode="osni52"),(~n.datumCode.indexOf("tm65")||~n.datumCode.indexOf("geodetic_datum_of_1965"))&&(n.datumCode="ire65"),n.datumCode==="ch1903+"&&(n.datumCode="ch1903"),~n.datumCode.indexOf("israel")&&(n.datumCode="isr93")),n.b&&!isFinite(n.b)&&(n.b=n.a),n.rectified_grid_angle&&(n.rectified_grid_angle=Je(n.rectified_grid_angle));function o(c){var u=n.to_meter||1;return c*u}var h=function(c){return lv(n,c)},l=[["standard_parallel_1","Standard_Parallel_1"],["standard_parallel_1","Latitude of 1st standard parallel"],["standard_parallel_2","Standard_Parallel_2"],["standard_parallel_2","Latitude of 2nd standard parallel"],["false_easting","False_Easting"],["false_easting","False easting"],["false-easting","Easting at false origin"],["false_northing","False_Northing"],["false_northing","False northing"],["false_northing","Northing at false origin"],["central_meridian","Central_Meridian"],["central_meridian","Longitude of natural origin"],["central_meridian","Longitude of false origin"],["latitude_of_origin","Latitude_Of_Origin"],["latitude_of_origin","Central_Parallel"],["latitude_of_origin","Latitude of natural origin"],["latitude_of_origin","Latitude of false origin"],["scale_factor","Scale_Factor"],["k0","scale_factor"],["latitude_of_center","Latitude_Of_Center"],["latitude_of_center","Latitude_of_center"],["lat0","latitude_of_center",Je],["longitude_of_center","Longitude_Of_Center"],["longitude_of_center","Longitude_of_center"],["longc","longitude_of_center",Je],["x0","false_easting",o],["y0","false_northing",o],["long0","central_meridian",Je],["lat0","latitude_of_origin",Je],["lat0","standard_parallel_1",Je],["lat1","standard_parallel_1",Je],["lat2","standard_parallel_2",Je],["azimuth","Azimuth"],["alpha","azimuth",Je],["srsCode","name"]];l.forEach(h),hu(n)}function ea(n){if(typeof n=="object")return ta(n);const t=nv(n);var e=av(n);if(t==="WKT2"){const r=ev(e);return ta(r)}var i=e[0],s={};return Vi(e,s),lu(s),s[i]}function Ee(n){var t=this;if(arguments.length===2){var e=arguments[1];typeof e=="string"?e.charAt(0)==="+"?Ee[n]=Yo(arguments[1]):Ee[n]=ea(arguments[1]):e&&typeof e=="object"&&!("projName"in e)?Ee[n]=ea(arguments[1]):(Ee[n]=e,e||delete Ee[n])}else if(arguments.length===1){if(Array.isArray(n))return n.map(function(i){return Array.isArray(i)?Ee.apply(t,i):Ee(i)});if(typeof n=="string"){if(n in Ee)return Ee[n]}else"EPSG"in n?Ee["EPSG:"+n.EPSG]=n:"ESRI"in n?Ee["ESRI:"+n.ESRI]=n:"IAU2000"in n?Ee["IAU2000:"+n.IAU2000]=n:console.log(n);return}}Yg(Ee);function uv(n){return typeof n=="string"}function fv(n){return n in Ee}function dv(n){return n.indexOf("+")!==0&&n.indexOf("[")!==-1||typeof n=="object"&&!("srsCode"in n)}var tc=["3857","900913","3785","102113"];function pv(n){if(n.title)return n.title.toLowerCase().indexOf("epsg:")===0&&tc.indexOf(n.title.substr(5))>-1;var t=$n(n,"authority");if(t){var e=$n(t,"epsg");return e&&tc.indexOf(e)>-1}}function mv(n){var t=$n(n,"extension");if(t)return $n(t,"proj4")}function _v(n){return n[0]==="+"}function gv(n){let t;if(uv(n))if(fv(n))t=Ee[n];else if(dv(n)){t=ea(n);var e=mv(t);e&&(t=Yo(e))}else _v(n)&&(t=Yo(n));else"projName"in n?t=n:t=ea(n);return t&&pv(t)?Ee["EPSG:3857"]:t}function ec(n,t){n=n||{};var e,i;if(!t)return n;for(i in t)e=t[i],e!==void 0&&(n[i]=e);return n}function Mn(n,t,e){var i=n*t;return e/Math.sqrt(1-i*i)}function js(n){return n<0?-1:1}function ht(n,t){return t||Math.abs(n)<=le?n:n-js(n)*zs}function dn(n,t,e){var i=n*e,s=.5*n;return i=Math.pow((1-i)/(1+i),s),Math.tan(.5*(J-t))/i}function Hs(n,t){for(var e=.5*n,i,s,r=J-2*Math.atan(t),a=0;a<=15;a++)if(i=n*Math.sin(r),s=J-2*Math.atan(t*Math.pow((1-i)/(1+i),e))-r,r+=s,Math.abs(s)<=1e-10)return r;return-9999}function vv(){var n=this.b/this.a;this.es=1-n*n,"x0"in this||(this.x0=0),"y0"in this||(this.y0=0),this.e=Math.sqrt(this.es),this.lat_ts?this.sphere?this.k0=Math.cos(this.lat_ts):this.k0=Mn(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts)):this.k0||(this.k?this.k0=this.k:this.k0=1)}function Mv(n){var t=n.x,e=n.y;if(e*Be>90&&e*Be<-90&&t*Be>180&&t*Be<-180)return null;var i,s;if(Math.abs(Math.abs(e)-J)<=st)return null;if(this.sphere)i=this.x0+this.a*this.k0*ht(t-this.long0,this.over),s=this.y0+this.a*this.k0*Math.log(Math.tan($t+.5*e));else{var r=Math.sin(e),a=dn(this.e,e,r);i=this.x0+this.a*this.k0*ht(t-this.long0,this.over),s=this.y0-this.a*this.k0*Math.log(a)}return n.x=i,n.y=s,n}function xv(n){var t=n.x-this.x0,e=n.y-this.y0,i,s;if(this.sphere)s=J-2*Math.atan(Math.exp(-e/(this.a*this.k0)));else{var r=Math.exp(-e/(this.a*this.k0));if(s=Hs(this.e,r),s===-9999)return null}return i=ht(this.long0+t/(this.a*this.k0),this.over),n.x=i,n.y=s,n}var yv=["Mercator","Popular Visualisation Pseudo Mercator","Mercator_1SP","Mercator_Auxiliary_Sphere","Mercator_Variant_A","merc"];const Sv={init:vv,forward:Mv,inverse:xv,names:yv};function Ev(){}function nc(n){return n}var cu=["longlat","identity"];const wv={init:Ev,forward:nc,inverse:nc,names:cu};var bv=[Sv,wv],ai={},Wi=[];function uu(n,t){var e=Wi.length;return n.names?(Wi[e]=n,n.names.forEach(function(i){ai[i.toLowerCase()]=e}),this):(console.log(t),!0)}function fu(n){return n.replace(/[-\(\)\s]+/g," ").trim().replace(/ /g,"_")}function Tv(n){if(!n)return!1;var t=n.toLowerCase();if(typeof ai[t]<"u"&&Wi[ai[t]]||(t=fu(t),t in ai&&Wi[ai[t]]))return Wi[ai[t]]}function Av(){bv.forEach(uu)}const Pv={start:Av,add:uu,get:Tv};var du={MERIT:{a:6378137,rf:298.257,ellipseName:"MERIT 1983"},SGS85:{a:6378136,rf:298.257,ellipseName:"Soviet Geodetic System 85"},GRS80:{a:6378137,rf:298.257222101,ellipseName:"GRS 1980(IUGG, 1980)"},IAU76:{a:6378140,rf:298.257,ellipseName:"IAU 1976"},airy:{a:6377563396e-3,b:635625691e-2,ellipseName:"Airy 1830"},APL4:{a:6378137,rf:298.25,ellipseName:"Appl. Physics. 1965"},NWL9D:{a:6378145,rf:298.25,ellipseName:"Naval Weapons Lab., 1965"},mod_airy:{a:6377340189e-3,b:6356034446e-3,ellipseName:"Modified Airy"},andrae:{a:637710443e-2,rf:300,ellipseName:"Andrae 1876 (Den., Iclnd.)"},aust_SA:{a:6378160,rf:298.25,ellipseName:"Australian Natl & S. Amer. 1969"},GRS67:{a:6378160,rf:298.247167427,ellipseName:"GRS 67(IUGG 1967)"},bessel:{a:6377397155e-3,rf:299.1528128,ellipseName:"Bessel 1841"},bess_nam:{a:6377483865e-3,rf:299.1528128,ellipseName:"Bessel 1841 (Namibia)"},clrk66:{a:63782064e-1,b:63565838e-1,ellipseName:"Clarke 1866"},clrk80:{a:6378249145e-3,rf:293.4663,ellipseName:"Clarke 1880 mod."},clrk80ign:{a:63782492e-1,b:6356515,rf:293.4660213,ellipseName:"Clarke 1880 (IGN)"},clrk58:{a:6378293645208759e-9,rf:294.2606763692654,ellipseName:"Clarke 1858"},CPM:{a:63757387e-1,rf:334.29,ellipseName:"Comm. des Poids et Mesures 1799"},delmbr:{a:6376428,rf:311.5,ellipseName:"Delambre 1810 (Belgium)"},engelis:{a:637813605e-2,rf:298.2566,ellipseName:"Engelis 1985"},evrst30:{a:6377276345e-3,rf:300.8017,ellipseName:"Everest 1830"},evrst48:{a:6377304063e-3,rf:300.8017,ellipseName:"Everest 1948"},evrst56:{a:6377301243e-3,rf:300.8017,ellipseName:"Everest 1956"},evrst69:{a:6377295664e-3,rf:300.8017,ellipseName:"Everest 1969"},evrstSS:{a:6377298556e-3,rf:300.8017,ellipseName:"Everest (Sabah & Sarawak)"},fschr60:{a:6378166,rf:298.3,ellipseName:"Fischer (Mercury Datum) 1960"},fschr60m:{a:6378155,rf:298.3,ellipseName:"Fischer 1960"},fschr68:{a:6378150,rf:298.3,ellipseName:"Fischer 1968"},helmert:{a:6378200,rf:298.3,ellipseName:"Helmert 1906"},hough:{a:6378270,rf:297,ellipseName:"Hough"},intl:{a:6378388,rf:297,ellipseName:"International 1909 (Hayford)"},kaula:{a:6378163,rf:298.24,ellipseName:"Kaula 1961"},lerch:{a:6378139,rf:298.257,ellipseName:"Lerch 1979"},mprts:{a:6397300,rf:191,ellipseName:"Maupertius 1738"},new_intl:{a:63781575e-1,b:63567722e-1,ellipseName:"New International 1967"},plessis:{a:6376523,rf:6355863,ellipseName:"Plessis 1817 (France)"},krass:{a:6378245,rf:298.3,ellipseName:"Krassovsky, 1942"},SEasia:{a:6378155,b:63567733205e-4,ellipseName:"Southeast Asia"},walbeck:{a:6376896,b:63558348467e-4,ellipseName:"Walbeck"},WGS60:{a:6378165,rf:298.3,ellipseName:"WGS 60"},WGS66:{a:6378145,rf:298.25,ellipseName:"WGS 66"},WGS7:{a:6378135,rf:298.26,ellipseName:"WGS 72"},WGS84:{a:6378137,rf:298.257223563,ellipseName:"WGS 84"},sphere:{a:6370997,b:6370997,ellipseName:"Normal Sphere (r=6370997)"}};const Rv=du.WGS84;function Cv(n,t,e,i){var s=n*n,r=t*t,a=(s-r)/s,o=0;i?(n*=1-a*(Kg+a*(Zg+a*Jg)),s=n*n,a=0):o=Math.sqrt(a);var h=(s-r)/r;return{es:a,e:o,ep2:h}}function Lv(n,t,e,i,s){if(!n){var r=$n(du,i);r||(r=Rv),n=r.a,t=r.b,e=r.rf}return e&&!t&&(t=(1-1/e)*n),(e===0||Math.abs(n-t)<st)&&(s=!0,t=n),{a:n,b:t,rf:e,sphere:s}}var kr={wgs84:{towgs84:"0,0,0",ellipse:"WGS84",datumName:"WGS84"},ch1903:{towgs84:"674.374,15.056,405.346",ellipse:"bessel",datumName:"swiss"},ggrs87:{towgs84:"-199.87,74.79,246.62",ellipse:"GRS80",datumName:"Greek_Geodetic_Reference_System_1987"},nad83:{towgs84:"0,0,0",ellipse:"GRS80",datumName:"North_American_Datum_1983"},nad27:{nadgrids:"@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",ellipse:"clrk66",datumName:"North_American_Datum_1927"},potsdam:{towgs84:"598.1,73.7,418.2,0.202,0.045,-2.455,6.7",ellipse:"bessel",datumName:"Potsdam Rauenberg 1950 DHDN"},carthage:{towgs84:"-263.0,6.0,431.0",ellipse:"clark80",datumName:"Carthage 1934 Tunisia"},hermannskogel:{towgs84:"577.326,90.129,463.919,5.137,1.474,5.297,2.4232",ellipse:"bessel",datumName:"Hermannskogel"},mgi:{towgs84:"577.326,90.129,463.919,5.137,1.474,5.297,2.4232",ellipse:"bessel",datumName:"Militar-Geographische Institut"},osni52:{towgs84:"482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",ellipse:"airy",datumName:"Irish National"},ire65:{towgs84:"482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",ellipse:"mod_airy",datumName:"Ireland 1965"},rassadiran:{towgs84:"-133.63,-157.5,-158.62",ellipse:"intl",datumName:"Rassadiran"},nzgd49:{towgs84:"59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",ellipse:"intl",datumName:"New Zealand Geodetic Datum 1949"},osgb36:{towgs84:"446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",ellipse:"airy",datumName:"Ordnance Survey of Great Britain 1936"},s_jtsk:{towgs84:"589,76,480",ellipse:"bessel",datumName:"S-JTSK (Ferro)"},beduaram:{towgs84:"-106,-87,188",ellipse:"clrk80",datumName:"Beduaram"},gunung_segara:{towgs84:"-403,684,41",ellipse:"bessel",datumName:"Gunung Segara Jakarta"},rnb72:{towgs84:"106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",ellipse:"intl",datumName:"Reseau National Belge 1972"},EPSG_5451:{towgs84:"6.41,-49.05,-11.28,1.5657,0.5242,6.9718,-5.7649"},IGNF_LURESG:{towgs84:"-192.986,13.673,-39.309,-0.4099,-2.9332,2.6881,0.43"},EPSG_4614:{towgs84:"-119.4248,-303.65872,-11.00061,1.164298,0.174458,1.096259,3.657065"},EPSG_4615:{towgs84:"-494.088,-312.129,279.877,-1.423,-1.013,1.59,-0.748"},ESRI_37241:{towgs84:"-76.822,257.457,-12.817,2.136,-0.033,-2.392,-0.031"},ESRI_37249:{towgs84:"-440.296,58.548,296.265,1.128,10.202,4.559,-0.438"},ESRI_37245:{towgs84:"-511.151,-181.269,139.609,1.05,2.703,1.798,3.071"},EPSG_4178:{towgs84:"24.9,-126.4,-93.2,-0.063,-0.247,-0.041,1.01"},EPSG_4622:{towgs84:"-472.29,-5.63,-304.12,0.4362,-0.8374,0.2563,1.8984"},EPSG_4625:{towgs84:"126.93,547.94,130.41,-2.7867,5.1612,-0.8584,13.8227"},EPSG_5252:{towgs84:"0.023,0.036,-0.068,0.00176,0.00912,-0.01136,0.00439"},EPSG_4314:{towgs84:"597.1,71.4,412.1,0.894,0.068,-1.563,7.58"},EPSG_4282:{towgs84:"-178.3,-316.7,-131.5,5.278,6.077,10.979,19.166"},EPSG_4231:{towgs84:"-83.11,-97.38,-117.22,0.005693,-0.044698,0.044285,0.1218"},EPSG_4274:{towgs84:"-230.994,102.591,25.199,0.633,-0.239,0.9,1.95"},EPSG_4134:{towgs84:"-180.624,-225.516,173.919,-0.81,-1.898,8.336,16.71006"},EPSG_4254:{towgs84:"18.38,192.45,96.82,0.056,-0.142,-0.2,-0.0013"},EPSG_4159:{towgs84:"-194.513,-63.978,-25.759,-3.4027,3.756,-3.352,-0.9175"},EPSG_4687:{towgs84:"0.072,-0.507,-0.245,0.0183,-0.0003,0.007,-0.0093"},EPSG_4227:{towgs84:"-83.58,-397.54,458.78,-17.595,-2.847,4.256,3.225"},EPSG_4746:{towgs84:"599.4,72.4,419.2,-0.062,-0.022,-2.723,6.46"},EPSG_4745:{towgs84:"612.4,77,440.2,-0.054,0.057,-2.797,2.55"},EPSG_6311:{towgs84:"8.846,-4.394,-1.122,-0.00237,-0.146528,0.130428,0.783926"},EPSG_4289:{towgs84:"565.7381,50.4018,465.2904,-0.395026,0.330772,-1.876073,4.07244"},EPSG_4230:{towgs84:"-68.863,-134.888,-111.49,-0.53,-0.14,0.57,-3.4"},EPSG_4154:{towgs84:"-123.02,-158.95,-168.47"},EPSG_4156:{towgs84:"570.8,85.7,462.8,4.998,1.587,5.261,3.56"},EPSG_4299:{towgs84:"482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"},EPSG_4179:{towgs84:"33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84"},EPSG_4313:{towgs84:"-106.8686,52.2978,-103.7239,0.3366,-0.457,1.8422,-1.2747"},EPSG_4194:{towgs84:"163.511,127.533,-159.789"},EPSG_4195:{towgs84:"105,326,-102.5"},EPSG_4196:{towgs84:"-45,417,-3.5"},EPSG_4611:{towgs84:"-162.619,-276.959,-161.764,0.067753,-2.243648,-1.158828,-1.094246"},EPSG_4633:{towgs84:"137.092,131.66,91.475,-1.9436,-11.5993,-4.3321,-7.4824"},EPSG_4641:{towgs84:"-408.809,366.856,-412.987,1.8842,-0.5308,2.1655,-121.0993"},EPSG_4643:{towgs84:"-480.26,-438.32,-643.429,16.3119,20.1721,-4.0349,-111.7002"},EPSG_4300:{towgs84:"482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"},EPSG_4188:{towgs84:"482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"},EPSG_4660:{towgs84:"982.6087,552.753,-540.873,6.681627,-31.611492,-19.848161,16.805"},EPSG_4662:{towgs84:"97.295,-263.247,310.882,-1.5999,0.8386,3.1409,13.3259"},EPSG_3906:{towgs84:"577.88891,165.22205,391.18289,4.9145,-0.94729,-13.05098,7.78664"},EPSG_4307:{towgs84:"-209.3622,-87.8162,404.6198,0.0046,3.4784,0.5805,-1.4547"},EPSG_6892:{towgs84:"-76.269,-16.683,68.562,-6.275,10.536,-4.286,-13.686"},EPSG_4690:{towgs84:"221.597,152.441,176.523,2.403,1.3893,0.884,11.4648"},EPSG_4691:{towgs84:"218.769,150.75,176.75,3.5231,2.0037,1.288,10.9817"},EPSG_4629:{towgs84:"72.51,345.411,79.241,-1.5862,-0.8826,-0.5495,1.3653"},EPSG_4630:{towgs84:"165.804,216.213,180.26,-0.6251,-0.4515,-0.0721,7.4111"},EPSG_4692:{towgs84:"217.109,86.452,23.711,0.0183,-0.0003,0.007,-0.0093"},EPSG_9333:{towgs84:"0,0,0,-0.008393,0.000749,-0.010276,0"},EPSG_9059:{towgs84:"0,0,0"},EPSG_4312:{towgs84:"601.705,84.263,485.227,4.7354,1.3145,5.393,-2.3887"},EPSG_4123:{towgs84:"-96.062,-82.428,-121.753,4.801,0.345,-1.376,1.496"},EPSG_4309:{towgs84:"-124.45,183.74,44.64,-0.4384,0.5446,-0.9706,-2.1365"},ESRI_104106:{towgs84:"-283.088,-70.693,117.445,-1.157,0.059,-0.652,-4.058"},EPSG_4281:{towgs84:"-219.247,-73.802,269.529"},EPSG_4322:{towgs84:"0,0,4.5"},EPSG_4324:{towgs84:"0,0,1.9"},EPSG_4284:{towgs84:"43.822,-108.842,-119.585,1.455,-0.761,0.737,0.549"},EPSG_4277:{towgs84:"446.448,-125.157,542.06,0.15,0.247,0.842,-20.489"},EPSG_4207:{towgs84:"-282.1,-72.2,120,-1.529,0.145,-0.89,-4.46"},EPSG_4688:{towgs84:"347.175,1077.618,2623.677,33.9058,-70.6776,9.4013,186.0647"},EPSG_4689:{towgs84:"410.793,54.542,80.501,-2.5596,-2.3517,-0.6594,17.3218"},EPSG_4720:{towgs84:"0,0,4.5"},EPSG_4273:{towgs84:"278.3,93,474.5,7.889,0.05,-6.61,6.21"},EPSG_4240:{towgs84:"204.64,834.74,293.8"},EPSG_4817:{towgs84:"278.3,93,474.5,7.889,0.05,-6.61,6.21"},ESRI_104131:{towgs84:"426.62,142.62,460.09,4.98,4.49,-12.42,-17.1"},EPSG_4265:{towgs84:"-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68"},EPSG_4263:{towgs84:"-111.92,-87.85,114.5,1.875,0.202,0.219,0.032"},EPSG_4298:{towgs84:"-689.5937,623.84046,-65.93566,-0.02331,1.17094,-0.80054,5.88536"},EPSG_4270:{towgs84:"-253.4392,-148.452,386.5267,0.15605,0.43,-0.1013,-0.0424"},EPSG_4229:{towgs84:"-121.8,98.1,-10.7"},EPSG_4220:{towgs84:"-55.5,-348,-229.2"},EPSG_4214:{towgs84:"12.646,-155.176,-80.863"},EPSG_4232:{towgs84:"-345,3,223"},EPSG_4238:{towgs84:"-1.977,-13.06,-9.993,0.364,0.254,0.689,-1.037"},EPSG_4168:{towgs84:"-170,33,326"},EPSG_4131:{towgs84:"199,931,318.9"},EPSG_4152:{towgs84:"-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"},EPSG_5228:{towgs84:"572.213,85.334,461.94,4.9732,1.529,5.2484,3.5378"},EPSG_8351:{towgs84:"485.021,169.465,483.839,7.786342,4.397554,4.102655,0"},EPSG_4683:{towgs84:"-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06"},EPSG_4133:{towgs84:"0,0,0"},EPSG_7373:{towgs84:"0.819,-0.5762,-1.6446,-0.00378,-0.03317,0.00318,0.0693"},EPSG_9075:{towgs84:"-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"},EPSG_9072:{towgs84:"-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"},EPSG_9294:{towgs84:"1.16835,-1.42001,-2.24431,-0.00822,-0.05508,0.01818,0.23388"},EPSG_4212:{towgs84:"-267.434,173.496,181.814,-13.4704,8.7154,7.3926,14.7492"},EPSG_4191:{towgs84:"-44.183,-0.58,-38.489,2.3867,2.7072,-3.5196,-8.2703"},EPSG_4237:{towgs84:"52.684,-71.194,-13.975,-0.312,-0.1063,-0.3729,1.0191"},EPSG_4740:{towgs84:"-1.08,-0.27,-0.9"},EPSG_4124:{towgs84:"419.3836,99.3335,591.3451,0.850389,1.817277,-7.862238,-0.99496"},EPSG_5681:{towgs84:"584.9636,107.7175,413.8067,1.1155,0.2824,-3.1384,7.9922"},EPSG_4141:{towgs84:"23.772,17.49,17.859,-0.3132,-1.85274,1.67299,-5.4262"},EPSG_4204:{towgs84:"-85.645,-273.077,-79.708,2.289,-1.421,2.532,3.194"},EPSG_4319:{towgs84:"226.702,-193.337,-35.371,-2.229,-4.391,9.238,0.9798"},EPSG_4200:{towgs84:"24.82,-131.21,-82.66"},EPSG_4130:{towgs84:"0,0,0"},EPSG_4127:{towgs84:"-82.875,-57.097,-156.768,-2.158,1.524,-0.982,-0.359"},EPSG_4149:{towgs84:"674.374,15.056,405.346"},EPSG_4617:{towgs84:"-0.991,1.9072,0.5129,0.02579,0.00965,0.01166,0"},EPSG_4663:{towgs84:"-210.502,-66.902,-48.476,2.094,-15.067,-5.817,0.485"},EPSG_4664:{towgs84:"-211.939,137.626,58.3,-0.089,0.251,0.079,0.384"},EPSG_4665:{towgs84:"-105.854,165.589,-38.312,-0.003,-0.026,0.024,-0.048"},EPSG_4666:{towgs84:"631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"},EPSG_4756:{towgs84:"-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188"},EPSG_4723:{towgs84:"-179.483,-69.379,-27.584,-7.862,8.163,6.042,-13.925"},EPSG_4726:{towgs84:"8.853,-52.644,180.304,-0.393,-2.323,2.96,-24.081"},EPSG_4267:{towgs84:"-8.0,160.0,176.0"},EPSG_5365:{towgs84:"-0.16959,0.35312,0.51846,0.03385,-0.16325,0.03446,0.03693"},EPSG_4218:{towgs84:"304.5,306.5,-318.1"},EPSG_4242:{towgs84:"-33.722,153.789,94.959,-8.581,-4.478,4.54,8.95"},EPSG_4216:{towgs84:"-292.295,248.758,429.447,4.9971,2.99,6.6906,1.0289"},ESRI_104105:{towgs84:"631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"},ESRI_104129:{towgs84:"0,0,0"},EPSG_4673:{towgs84:"174.05,-25.49,112.57"},EPSG_4202:{towgs84:"-124,-60,154"},EPSG_4203:{towgs84:"-117.763,-51.51,139.061,0.292,0.443,0.277,-0.191"},EPSG_3819:{towgs84:"595.48,121.69,515.35,4.115,-2.9383,0.853,-3.408"},EPSG_8694:{towgs84:"-93.799,-132.737,-219.073,-1.844,0.648,-6.37,-0.169"},EPSG_4145:{towgs84:"275.57,676.78,229.6"},EPSG_4283:{towgs84:"0.06155,-0.01087,-0.04019,0.039492,0.032722,0.032898,-0.009994"},EPSG_4317:{towgs84:"2.3287,-147.0425,-92.0802,-0.309248,0.324822,0.497299,5.689063"},EPSG_4272:{towgs84:"59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993"},EPSG_4248:{towgs84:"-307.7,265.3,-363.5"},EPSG_5561:{towgs84:"24,-121,-76"},EPSG_5233:{towgs84:"-0.293,766.95,87.713,0.195704,1.695068,3.473016,-0.039338"},ESRI_104130:{towgs84:"-86,-98,-119"},ESRI_104102:{towgs84:"682,-203,480"},ESRI_37207:{towgs84:"7,-10,-26"},EPSG_4675:{towgs84:"59.935,118.4,-10.871"},ESRI_104109:{towgs84:"-89.121,-348.182,260.871"},ESRI_104112:{towgs84:"-185.583,-230.096,281.361"},ESRI_104113:{towgs84:"25.1,-275.6,222.6"},IGNF_WGS72G:{towgs84:"0,12,6"},IGNF_NTFG:{towgs84:"-168,-60,320"},IGNF_EFATE57G:{towgs84:"-127,-769,472"},IGNF_PGP50G:{towgs84:"324.8,153.6,172.1"},IGNF_REUN47G:{towgs84:"94,-948,-1262"},IGNF_CSG67G:{towgs84:"-186,230,110"},IGNF_GUAD48G:{towgs84:"-467,-16,-300"},IGNF_TAHI51G:{towgs84:"162,117,154"},IGNF_TAHAAG:{towgs84:"65,342,77"},IGNF_NUKU72G:{towgs84:"84,274,65"},IGNF_PETRELS72G:{towgs84:"365,194,166"},IGNF_WALL78G:{towgs84:"253,-133,-127"},IGNF_MAYO50G:{towgs84:"-382,-59,-262"},IGNF_TANNAG:{towgs84:"-139,-967,436"},IGNF_IGN72G:{towgs84:"-13,-348,292"},IGNF_ATIGG:{towgs84:"1118,23,66"},IGNF_FANGA84G:{towgs84:"150.57,158.33,118.32"},IGNF_RUSAT84G:{towgs84:"202.13,174.6,-15.74"},IGNF_KAUE70G:{towgs84:"126.74,300.1,-75.49"},IGNF_MOP90G:{towgs84:"-10.8,-1.8,12.77"},IGNF_MHPF67G:{towgs84:"338.08,212.58,-296.17"},IGNF_TAHI79G:{towgs84:"160.61,116.05,153.69"},IGNF_ANAA92G:{towgs84:"1.5,3.84,4.81"},IGNF_MARQUI72G:{towgs84:"330.91,-13.92,58.56"},IGNF_APAT86G:{towgs84:"143.6,197.82,74.05"},IGNF_TUBU69G:{towgs84:"237.17,171.61,-77.84"},IGNF_STPM50G:{towgs84:"11.363,424.148,373.13"},EPSG_4150:{towgs84:"674.374,15.056,405.346"},EPSG_4754:{towgs84:"-208.4058,-109.8777,-2.5764"},ESRI_104101:{towgs84:"372.87,149.23,585.29"},EPSG_4693:{towgs84:"0,-0.15,0.68"},EPSG_6207:{towgs84:"293.17,726.18,245.36"},EPSG_4153:{towgs84:"-133.63,-157.5,-158.62"},EPSG_4132:{towgs84:"-241.54,-163.64,396.06"},EPSG_4221:{towgs84:"-154.5,150.7,100.4"},EPSG_4266:{towgs84:"-80.7,-132.5,41.1"},EPSG_4193:{towgs84:"-70.9,-151.8,-41.4"},EPSG_5340:{towgs84:"-0.41,0.46,-0.35"},EPSG_4246:{towgs84:"-294.7,-200.1,525.5"},EPSG_4318:{towgs84:"-3.2,-5.7,2.8"},EPSG_4121:{towgs84:"-199.87,74.79,246.62"},EPSG_4223:{towgs84:"-260.1,5.5,432.2"},EPSG_4158:{towgs84:"-0.465,372.095,171.736"},EPSG_4285:{towgs84:"-128.16,-282.42,21.93"},EPSG_4613:{towgs84:"-404.78,685.68,45.47"},EPSG_4607:{towgs84:"195.671,332.517,274.607"},EPSG_4475:{towgs84:"-381.788,-57.501,-256.673"},EPSG_4208:{towgs84:"-157.84,308.54,-146.6"},EPSG_4743:{towgs84:"70.995,-335.916,262.898"},EPSG_4710:{towgs84:"-323.65,551.39,-491.22"},EPSG_7881:{towgs84:"-0.077,0.079,0.086"},EPSG_4682:{towgs84:"283.729,735.942,261.143"},EPSG_4739:{towgs84:"-156,-271,-189"},EPSG_4679:{towgs84:"-80.01,253.26,291.19"},EPSG_4750:{towgs84:"-56.263,16.136,-22.856"},EPSG_4644:{towgs84:"-10.18,-350.43,291.37"},EPSG_4695:{towgs84:"-103.746,-9.614,-255.95"},EPSG_4292:{towgs84:"-355,21,72"},EPSG_4302:{towgs84:"-61.702,284.488,472.052"},EPSG_4143:{towgs84:"-124.76,53,466.79"},EPSG_4606:{towgs84:"-153,153,307"},EPSG_4699:{towgs84:"-770.1,158.4,-498.2"},EPSG_4247:{towgs84:"-273.5,110.6,-357.9"},EPSG_4160:{towgs84:"8.88,184.86,106.69"},EPSG_4161:{towgs84:"-233.43,6.65,173.64"},EPSG_9251:{towgs84:"-9.5,122.9,138.2"},EPSG_9253:{towgs84:"-78.1,101.6,133.3"},EPSG_4297:{towgs84:"-198.383,-240.517,-107.909"},EPSG_4269:{towgs84:"0,0,0"},EPSG_4301:{towgs84:"-147,506,687"},EPSG_4618:{towgs84:"-59,-11,-52"},EPSG_4612:{towgs84:"0,0,0"},EPSG_4678:{towgs84:"44.585,-131.212,-39.544"},EPSG_4250:{towgs84:"-130,29,364"},EPSG_4144:{towgs84:"214,804,268"},EPSG_4147:{towgs84:"-17.51,-108.32,-62.39"},EPSG_4259:{towgs84:"-254.1,-5.36,-100.29"},EPSG_4164:{towgs84:"-76,-138,67"},EPSG_4211:{towgs84:"-378.873,676.002,-46.255"},EPSG_4182:{towgs84:"-422.651,-172.995,84.02"},EPSG_4224:{towgs84:"-143.87,243.37,-33.52"},EPSG_4225:{towgs84:"-205.57,168.77,-4.12"},EPSG_5527:{towgs84:"-67.35,3.88,-38.22"},EPSG_4752:{towgs84:"98,390,-22"},EPSG_4310:{towgs84:"-30,190,89"},EPSG_9248:{towgs84:"-192.26,65.72,132.08"},EPSG_4680:{towgs84:"124.5,-63.5,-281"},EPSG_4701:{towgs84:"-79.9,-158,-168.9"},EPSG_4706:{towgs84:"-146.21,112.63,4.05"},EPSG_4805:{towgs84:"682,-203,480"},EPSG_4201:{towgs84:"-165,-11,206"},EPSG_4210:{towgs84:"-157,-2,-299"},EPSG_4183:{towgs84:"-104,167,-38"},EPSG_4139:{towgs84:"11,72,-101"},EPSG_4668:{towgs84:"-86,-98,-119"},EPSG_4717:{towgs84:"-2,151,181"},EPSG_4732:{towgs84:"102,52,-38"},EPSG_4280:{towgs84:"-377,681,-50"},EPSG_4209:{towgs84:"-138,-105,-289"},EPSG_4261:{towgs84:"31,146,47"},EPSG_4658:{towgs84:"-73,46,-86"},EPSG_4721:{towgs84:"265.025,384.929,-194.046"},EPSG_4222:{towgs84:"-136,-108,-292"},EPSG_4601:{towgs84:"-255,-15,71"},EPSG_4602:{towgs84:"725,685,536"},EPSG_4603:{towgs84:"72,213.7,93"},EPSG_4605:{towgs84:"9,183,236"},EPSG_4621:{towgs84:"137,248,-430"},EPSG_4657:{towgs84:"-28,199,5"},EPSG_4316:{towgs84:"103.25,-100.4,-307.19"},EPSG_4642:{towgs84:"-13,-348,292"},EPSG_4698:{towgs84:"145,-187,103"},EPSG_4192:{towgs84:"-206.1,-174.7,-87.7"},EPSG_4311:{towgs84:"-265,120,-358"},EPSG_4135:{towgs84:"58,-283,-182"},ESRI_104138:{towgs84:"198,-226,-347"},EPSG_4245:{towgs84:"-11,851,5"},EPSG_4142:{towgs84:"-125,53,467"},EPSG_4213:{towgs84:"-106,-87,188"},EPSG_4253:{towgs84:"-133,-77,-51"},EPSG_4129:{towgs84:"-132,-110,-335"},EPSG_4713:{towgs84:"-77,-128,142"},EPSG_4239:{towgs84:"217,823,299"},EPSG_4146:{towgs84:"295,736,257"},EPSG_4155:{towgs84:"-83,37,124"},EPSG_4165:{towgs84:"-173,253,27"},EPSG_4672:{towgs84:"175,-38,113"},EPSG_4236:{towgs84:"-637,-549,-203"},EPSG_4251:{towgs84:"-90,40,88"},EPSG_4271:{towgs84:"-2,374,172"},EPSG_4175:{towgs84:"-88,4,101"},EPSG_4716:{towgs84:"298,-304,-375"},EPSG_4315:{towgs84:"-23,259,-9"},EPSG_4744:{towgs84:"-242.2,-144.9,370.3"},EPSG_4244:{towgs84:"-97,787,86"},EPSG_4293:{towgs84:"616,97,-251"},EPSG_4714:{towgs84:"-127,-769,472"},EPSG_4736:{towgs84:"260,12,-147"},EPSG_6883:{towgs84:"-235,-110,393"},EPSG_6894:{towgs84:"-63,176,185"},EPSG_4205:{towgs84:"-43,-163,45"},EPSG_4256:{towgs84:"41,-220,-134"},EPSG_4262:{towgs84:"639,405,60"},EPSG_4604:{towgs84:"174,359,365"},EPSG_4169:{towgs84:"-115,118,426"},EPSG_4620:{towgs84:"-106,-129,165"},EPSG_4184:{towgs84:"-203,141,53"},EPSG_4616:{towgs84:"-289,-124,60"},EPSG_9403:{towgs84:"-307,-92,127"},EPSG_4684:{towgs84:"-133,-321,50"},EPSG_4708:{towgs84:"-491,-22,435"},EPSG_4707:{towgs84:"114,-116,-333"},EPSG_4709:{towgs84:"145,75,-272"},EPSG_4712:{towgs84:"-205,107,53"},EPSG_4711:{towgs84:"124,-234,-25"},EPSG_4718:{towgs84:"230,-199,-752"},EPSG_4719:{towgs84:"211,147,111"},EPSG_4724:{towgs84:"208,-435,-229"},EPSG_4725:{towgs84:"189,-79,-202"},EPSG_4735:{towgs84:"647,1777,-1124"},EPSG_4722:{towgs84:"-794,119,-298"},EPSG_4728:{towgs84:"-307,-92,127"},EPSG_4734:{towgs84:"-632,438,-609"},EPSG_4727:{towgs84:"912,-58,1227"},EPSG_4729:{towgs84:"185,165,42"},EPSG_4730:{towgs84:"170,42,84"},EPSG_4733:{towgs84:"276,-57,149"},ESRI_37218:{towgs84:"230,-199,-752"},ESRI_37240:{towgs84:"-7,215,225"},ESRI_37221:{towgs84:"252,-209,-751"},ESRI_4305:{towgs84:"-123,-206,219"},ESRI_104139:{towgs84:"-73,-247,227"},EPSG_4748:{towgs84:"51,391,-36"},EPSG_4219:{towgs84:"-384,664,-48"},EPSG_4255:{towgs84:"-333,-222,114"},EPSG_4257:{towgs84:"-587.8,519.75,145.76"},EPSG_4646:{towgs84:"-963,510,-359"},EPSG_6881:{towgs84:"-24,-203,268"},EPSG_6882:{towgs84:"-183,-15,273"},EPSG_4715:{towgs84:"-104,-129,239"},IGNF_RGF93GDD:{towgs84:"0,0,0"},IGNF_RGM04GDD:{towgs84:"0,0,0"},IGNF_RGSPM06GDD:{towgs84:"0,0,0"},IGNF_RGTAAF07GDD:{towgs84:"0,0,0"},IGNF_RGFG95GDD:{towgs84:"0,0,0"},IGNF_RGNCG:{towgs84:"0,0,0"},IGNF_RGPFGDD:{towgs84:"0,0,0"},IGNF_ETRS89G:{towgs84:"0,0,0"},IGNF_RGR92GDD:{towgs84:"0,0,0"},EPSG_4173:{towgs84:"0,0,0"},EPSG_4180:{towgs84:"0,0,0"},EPSG_4619:{towgs84:"0,0,0"},EPSG_4667:{towgs84:"0,0,0"},EPSG_4075:{towgs84:"0,0,0"},EPSG_6706:{towgs84:"0,0,0"},EPSG_7798:{towgs84:"0,0,0"},EPSG_4661:{towgs84:"0,0,0"},EPSG_4669:{towgs84:"0,0,0"},EPSG_8685:{towgs84:"0,0,0"},EPSG_4151:{towgs84:"0,0,0"},EPSG_9702:{towgs84:"0,0,0"},EPSG_4758:{towgs84:"0,0,0"},EPSG_4761:{towgs84:"0,0,0"},EPSG_4765:{towgs84:"0,0,0"},EPSG_8997:{towgs84:"0,0,0"},EPSG_4023:{towgs84:"0,0,0"},EPSG_4670:{towgs84:"0,0,0"},EPSG_4694:{towgs84:"0,0,0"},EPSG_4148:{towgs84:"0,0,0"},EPSG_4163:{towgs84:"0,0,0"},EPSG_4167:{towgs84:"0,0,0"},EPSG_4189:{towgs84:"0,0,0"},EPSG_4190:{towgs84:"0,0,0"},EPSG_4176:{towgs84:"0,0,0"},EPSG_4659:{towgs84:"0,0,0"},EPSG_3824:{towgs84:"0,0,0"},EPSG_3889:{towgs84:"0,0,0"},EPSG_4046:{towgs84:"0,0,0"},EPSG_4081:{towgs84:"0,0,0"},EPSG_4558:{towgs84:"0,0,0"},EPSG_4483:{towgs84:"0,0,0"},EPSG_5013:{towgs84:"0,0,0"},EPSG_5264:{towgs84:"0,0,0"},EPSG_5324:{towgs84:"0,0,0"},EPSG_5354:{towgs84:"0,0,0"},EPSG_5371:{towgs84:"0,0,0"},EPSG_5373:{towgs84:"0,0,0"},EPSG_5381:{towgs84:"0,0,0"},EPSG_5393:{towgs84:"0,0,0"},EPSG_5489:{towgs84:"0,0,0"},EPSG_5593:{towgs84:"0,0,0"},EPSG_6135:{towgs84:"0,0,0"},EPSG_6365:{towgs84:"0,0,0"},EPSG_5246:{towgs84:"0,0,0"},EPSG_7886:{towgs84:"0,0,0"},EPSG_8431:{towgs84:"0,0,0"},EPSG_8427:{towgs84:"0,0,0"},EPSG_8699:{towgs84:"0,0,0"},EPSG_8818:{towgs84:"0,0,0"},EPSG_4757:{towgs84:"0,0,0"},EPSG_9140:{towgs84:"0,0,0"},EPSG_8086:{towgs84:"0,0,0"},EPSG_4686:{towgs84:"0,0,0"},EPSG_4737:{towgs84:"0,0,0"},EPSG_4702:{towgs84:"0,0,0"},EPSG_4747:{towgs84:"0,0,0"},EPSG_4749:{towgs84:"0,0,0"},EPSG_4674:{towgs84:"0,0,0"},EPSG_4755:{towgs84:"0,0,0"},EPSG_4759:{towgs84:"0,0,0"},EPSG_4762:{towgs84:"0,0,0"},EPSG_4763:{towgs84:"0,0,0"},EPSG_4764:{towgs84:"0,0,0"},EPSG_4166:{towgs84:"0,0,0"},EPSG_4170:{towgs84:"0,0,0"},EPSG_5546:{towgs84:"0,0,0"},EPSG_7844:{towgs84:"0,0,0"},EPSG_4818:{towgs84:"589,76,480"},EPSG_10328:{towgs84:"0,0,0"},EPSG_9782:{towgs84:"0,0,0"},EPSG_9777:{towgs84:"0,0,0"},EPSG_10690:{towgs84:"0,0,0"},EPSG_10639:{towgs84:"0,0,0"},EPSG_10739:{towgs84:"0,0,0"},EPSG_7686:{towgs84:"0,0,0"},EPSG_8900:{towgs84:"0,0,0"},EPSG_5886:{towgs84:"0,0,0"},EPSG_7683:{towgs84:"0,0,0"},EPSG_6668:{towgs84:"0,0,0"},EPSG_20046:{towgs84:"0,0,0"},EPSG_10299:{towgs84:"0,0,0"},EPSG_10310:{towgs84:"0,0,0"},EPSG_10475:{towgs84:"0,0,0"},EPSG_4742:{towgs84:"0,0,0"},EPSG_10671:{towgs84:"0,0,0"},EPSG_10762:{towgs84:"0,0,0"},EPSG_10725:{towgs84:"0,0,0"},EPSG_10791:{towgs84:"0,0,0"},EPSG_10800:{towgs84:"0,0,0"},EPSG_10305:{towgs84:"0,0,0"},EPSG_10941:{towgs84:"0,0,0"},EPSG_10968:{towgs84:"0,0,0"},EPSG_10875:{towgs84:"0,0,0"},EPSG_6318:{towgs84:"0,0,0"},EPSG_10910:{towgs84:"0,0,0"}};for(var Iv in kr){var eo=kr[Iv];eo.datumName&&(kr[eo.datumName]=eo)}function Nv(n,t,e,i,s,r,a){var o={};return o.datum_type=qo,t&&(o.datum_type=$g,o.datum_params=t.map(parseFloat),(o.datum_params[0]!==0||o.datum_params[1]!==0||o.datum_params[2]!==0)&&(o.datum_type=_i),o.datum_params.length>3&&(o.datum_params[3]!==0||o.datum_params[4]!==0||o.datum_params[5]!==0||o.datum_params[6]!==0)&&(o.datum_type=gi,o.datum_params[3]*=Cs,o.datum_params[4]*=Cs,o.datum_params[5]*=Cs,o.datum_params[6]=o.datum_params[6]/1e6+1)),a&&(o.datum_type=Qi,o.grids=a),o.a=e,o.b=i,o.es=s,o.ep2=r,o}var vh={};function Dv(n,t,e){return t instanceof ArrayBuffer?Uv(n,t,e):{ready:Ov(n,t)}}function Uv(n,t,e){var i=!0;e!==void 0&&e.includeErrorFields===!1&&(i=!1);var s=new DataView(t),r=Bv(s),a=zv(s,r),o=kv(s,a,r,i),h={header:a,subgrids:o};return vh[n]=h,h}async function Ov(n,t){for(var e=[],i=await t.getImageCount(),s=i-1;s>=0;s--){var r=await t.getImage(s),a=await r.readRasters(),o=a,h=[r.getWidth(),r.getHeight()],l=r.getBoundingBox().map(ic),c=typeof r.fileDirectory.getValue=="function"?r.fileDirectory.getValue("ModelPixelScale"):r.fileDirectory.ModelPixelScale,u=[c[0],c[1]].map(ic),d=l[0]+(h[0]-1)*u[0],f=l[3]-(h[1]-1)*u[1],_=o[0],g=o[1],p=[];for(let v=h[1]-1;v>=0;v--)for(let y=h[0]-1;y>=0;y--){var m=v*h[0]+y;p.push([-Vn(g[m]),Vn(_[m])])}e.push({del:u,lim:h,ll:[-d,f],cvs:p})}var x={header:{nSubgrids:i},subgrids:e};return vh[n]=x,x}function Fv(n){if(n===void 0)return null;var t=n.split(",");return t.map(Gv)}function Gv(n){if(n.length===0)return null;var t=n[0]==="@";return t&&(n=n.slice(1)),n==="null"?{name:"null",mandatory:!t,grid:null,isNull:!0}:{name:n,mandatory:!t,grid:vh[n]||null,isNull:!1}}function ic(n){return n*Math.PI/180}function Vn(n){return n/3600*Math.PI/180}function Bv(n){var t=n.getInt32(8,!1);return t===11?!1:(t=n.getInt32(8,!0),t!==11&&console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian"),!0)}function zv(n,t){return{nFields:n.getInt32(8,t),nSubgridFields:n.getInt32(24,t),nSubgrids:n.getInt32(40,t),shiftType:$o(n,56,64).trim(),fromSemiMajorAxis:n.getFloat64(120,t),fromSemiMinorAxis:n.getFloat64(136,t),toSemiMajorAxis:n.getFloat64(152,t),toSemiMinorAxis:n.getFloat64(168,t)}}function $o(n,t,e){return String.fromCharCode.apply(null,new Uint8Array(n.buffer.slice(t,e)))}function kv(n,t,e,i){for(var s=176,r=[],a=0;a<t.nSubgrids;a++){var o=Vv(n,s,e),h=Wv(n,s,o,e,i),l=Math.round(1+(o.upperLongitude-o.lowerLongitude)/o.longitudeInterval),c=Math.round(1+(o.upperLatitude-o.lowerLatitude)/o.latitudeInterval);r.push({ll:[Vn(o.lowerLongitude),Vn(o.lowerLatitude)],del:[Vn(o.longitudeInterval),Vn(o.latitudeInterval)],lim:[l,c],count:o.gridNodeCount,cvs:Hv(h)});var u=16;i===!1&&(u=8),s+=176+o.gridNodeCount*u}return r}function Hv(n){return n.map(function(t){return[Vn(t.longitudeShift),Vn(t.latitudeShift)]})}function Vv(n,t,e){return{name:$o(n,t+8,t+16).trim(),parent:$o(n,t+24,t+24+8).trim(),lowerLatitude:n.getFloat64(t+72,e),upperLatitude:n.getFloat64(t+88,e),lowerLongitude:n.getFloat64(t+104,e),upperLongitude:n.getFloat64(t+120,e),latitudeInterval:n.getFloat64(t+136,e),longitudeInterval:n.getFloat64(t+152,e),gridNodeCount:n.getInt32(t+168,e)}}function Wv(n,t,e,i,s){var r=t+176,a=16;s===!1&&(a=8);for(var o=[],h=0;h<e.gridNodeCount;h++){var l={latitudeShift:n.getFloat32(r+h*a,i),longitudeShift:n.getFloat32(r+h*a+4,i)};s!==!1&&(l.latitudeAccuracy=n.getFloat32(r+h*a+8,i),l.longitudeAccuracy=n.getFloat32(r+h*a+12,i)),o.push(l)}return o}function sn(n,t){if(!(this instanceof sn))return new sn(n);this.forward=null,this.inverse=null,this.init=null,this.name,this.axis,this.names=null,this.title,t=t||function(l){if(l)throw l};var e=gv(n);if(typeof e!="object"){t("Could not parse to valid json: "+n);return}var i=sn.projections.get(e.projName);if(!i){t("Could not get projection name from: "+n);return}if(e.datumCode&&e.datumCode!=="none"){var s=$n(kr,e.datumCode);s&&(e.datum_params=e.datum_params||(s.towgs84?s.towgs84.split(","):null),e.ellps=s.ellipse,e.datumName=s.datumName?s.datumName:e.datumCode)}e.k0=e.k0||1,e.axis=e.axis||"enu",e.ellps=e.ellps||"wgs84",e.lat1=e.lat1||e.lat0;var r=Lv(e.a,e.b,e.rf,e.ellps,e.sphere),a=Cv(r.a,r.b,r.rf,e.R_A),o=Fv(e.nadgrids),h=e.datum||Nv(e.datumCode,e.datum_params,r.a,r.b,a.es,a.ep2,o);ec(this,e),ec(this,i),this.a=r.a,this.b=r.b,this.rf=r.rf,this.sphere=r.sphere,this.es=a.es,this.e=a.e,this.ep2=a.ep2,this.datum=h,"init"in this&&typeof this.init=="function"&&this.init(),t(null,this)}sn.projections=Pv;sn.projections.start();function Xv(n,t){return n.datum_type!==t.datum_type||n.a!==t.a||Math.abs(n.es-t.es)>5e-11?!1:n.datum_type===_i?n.datum_params[0]===t.datum_params[0]&&n.datum_params[1]===t.datum_params[1]&&n.datum_params[2]===t.datum_params[2]:n.datum_type===gi?n.datum_params[0]===t.datum_params[0]&&n.datum_params[1]===t.datum_params[1]&&n.datum_params[2]===t.datum_params[2]&&n.datum_params[3]===t.datum_params[3]&&n.datum_params[4]===t.datum_params[4]&&n.datum_params[5]===t.datum_params[5]&&n.datum_params[6]===t.datum_params[6]:!0}function pu(n,t,e){var i=n.x,s=n.y,r=n.z?n.z:0,a,o,h,l;if(s<-J&&s>-1.001*J)s=-J;else if(s>J&&s<1.001*J)s=J;else{if(s<-J)return{x:-1/0,y:-1/0,z:n.z};if(s>J)return{x:1/0,y:1/0,z:n.z}}return i>Math.PI&&(i-=2*Math.PI),o=Math.sin(s),l=Math.cos(s),h=o*o,a=e/Math.sqrt(1-t*h),{x:(a+r)*l*Math.cos(i),y:(a+r)*l*Math.sin(i),z:(a*(1-t)+r)*o}}function mu(n,t,e,i){var s=1e-12,r=s*s,a=30,o,h,l,c,u,d,f,_,g,p,m,x,v,y=n.x,L=n.y,T=n.z?n.z:0,b,C,w;if(o=Math.sqrt(y*y+L*L),h=Math.sqrt(y*y+L*L+T*T),o/e<s){if(b=0,h/e<s)return C=J,w=-i,{x:n.x,y:n.y,z:n.z}}else b=Math.atan2(L,y);l=T/h,c=o/h,u=1/Math.sqrt(1-t*(2-t)*c*c),_=c*(1-t)*u,g=l*u,v=0;do v++,f=e/Math.sqrt(1-t*g*g),w=o*_+T*g-f*(1-t*g*g),d=t*f/(f+w),u=1/Math.sqrt(1-d*(2-d)*c*c),p=c*(1-d)*u,m=l*u,x=m*_-p*g,_=p,g=m;while(x*x>r&&v<a);return C=Math.atan(m/Math.abs(p)),{x:b,y:C,z:w}}function qv(n,t,e){if(t===_i)return{x:n.x+e[0],y:n.y+e[1],z:n.z+e[2]};if(t===gi){var i=e[0],s=e[1],r=e[2],a=e[3],o=e[4],h=e[5],l=e[6];return{x:l*(n.x-h*n.y+o*n.z)+i,y:l*(h*n.x+n.y-a*n.z)+s,z:l*(-o*n.x+a*n.y+n.z)+r}}}function Yv(n,t,e){if(t===_i)return{x:n.x-e[0],y:n.y-e[1],z:n.z-e[2]};if(t===gi){var i=e[0],s=e[1],r=e[2],a=e[3],o=e[4],h=e[5],l=e[6],c=(n.x-i)/l,u=(n.y-s)/l,d=(n.z-r)/l;return{x:c+h*u-o*d,y:-h*c+u+a*d,z:o*c-a*u+d}}}function Lr(n){return n===_i||n===gi}function $v(n,t,e){if(Xv(n,t)||n.datum_type===qo||t.datum_type===qo)return e;var i=n.a,s=n.es;if(n.datum_type===Qi){var r=sc(n,!1,e);if(r!==0)return;i=$l,s=jl}var a=t.a,o=t.b,h=t.es;if(t.datum_type===Qi&&(a=$l,o=jg,h=jl),s===h&&i===a&&!Lr(n.datum_type)&&!Lr(t.datum_type))return e;if(e=pu(e,s,i),Lr(n.datum_type)&&(e=qv(e,n.datum_type,n.datum_params)),Lr(t.datum_type)&&(e=Yv(e,t.datum_type,t.datum_params)),e=mu(e,h,a,o),t.datum_type===Qi){var l=sc(t,!0,e);if(l!==0)return}return e}function sc(n,t,e){if(n.grids===null||n.grids.length===0)return console.log("Grid shift grids not found"),-1;var i={x:-e.x,y:e.y},s={x:Number.NaN,y:Number.NaN},r=[];t:for(var a=0;a<n.grids.length;a++){var o=n.grids[a];if(r.push(o.name),o.isNull){s=i;break}if(o.grid===null){if(o.mandatory)return console.log("Unable to find mandatory grid '"+o.name+"'"),-1;continue}for(var h=o.grid.subgrids,l=0,c=h.length;l<c;l++){var u=h[l],d=(Math.abs(u.del[1])+Math.abs(u.del[0]))/1e4,f=u.ll[0]-d,_=u.ll[1]-d,g=u.ll[0]+(u.lim[0]-1)*u.del[0]+d,p=u.ll[1]+(u.lim[1]-1)*u.del[1]+d;if(!(_>i.y||f>i.x||p<i.y||g<i.x)&&(s=jv(i,t,u),!isNaN(s.x)))break t}}return isNaN(s.x)?(console.log("Failed to find a grid shift table for location '"+-i.x*Be+" "+i.y*Be+" tried: '"+r+"'"),-1):(e.x=-s.x,e.y=s.y,0)}function jv(n,t,e){var i={x:Number.NaN,y:Number.NaN};if(isNaN(n.x))return i;var s={x:n.x,y:n.y};s.x-=e.ll[0],s.y-=e.ll[1],s.x=ht(s.x-Math.PI)+Math.PI;var r=rc(s,e);if(t){if(isNaN(r.x))return i;r.x=s.x-r.x,r.y=s.y-r.y;var a=9,o=1e-12,h,l;do{if(l=rc(r,e),isNaN(l.x)){console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");break}h={x:s.x-(l.x+r.x),y:s.y-(l.y+r.y)},r.x+=h.x,r.y+=h.y}while(a--&&Math.abs(h.x)>o&&Math.abs(h.y)>o);if(a<0)return console.log("Inverse grid shift iterator failed to converge."),i;i.x=ht(r.x+e.ll[0]),i.y=r.y+e.ll[1]}else isNaN(r.x)||(i.x=n.x+r.x,i.y=n.y+r.y);return i}function rc(n,t){var e={x:n.x/t.del[0],y:n.y/t.del[1]},i={x:Math.floor(e.x),y:Math.floor(e.y)},s={x:e.x-1*i.x,y:e.y-1*i.y},r={x:Number.NaN,y:Number.NaN},a;if(i.x<0||i.x>=t.lim[0]||i.y<0||i.y>=t.lim[1])return r;a=i.y*t.lim[0]+i.x;var o={x:t.cvs[a][0],y:t.cvs[a][1]};a++;var h={x:t.cvs[a][0],y:t.cvs[a][1]};a+=t.lim[0];var l={x:t.cvs[a][0],y:t.cvs[a][1]};a--;var c={x:t.cvs[a][0],y:t.cvs[a][1]},u=s.x*s.y,d=s.x*(1-s.y),f=(1-s.x)*(1-s.y),_=(1-s.x)*s.y;return r.x=f*o.x+d*h.x+_*c.x+u*l.x,r.y=f*o.y+d*h.y+_*c.y+u*l.y,r}var oi=["x","y","z"];function Kv(n,t){const e={};for(let i=0,s=n.axis.length;i<s;i++){if(i===2&&t.z===void 0)continue;let r=t[oi[i]];switch(n.axis[i]){case"e":e.x=r;break;case"w":e.x=-r;break;case"n":e.y=r;break;case"s":e.y=-r;break;case"u":e.z=r;break;case"d":e.z=-r;break;default:return null}}return e}function Zv(n,t){const e={};for(let i=0,s=n.axis.length;i<s;i++)if(!(i===2&&t.z===void 0))switch(n.axis[i]){case"e":e[oi[i]]=t.x;break;case"w":e[oi[i]]=-t.x;break;case"n":e[oi[i]]=t.y;break;case"s":e[oi[i]]=-t.y;break;case"u":e[oi[i]]=t.z;break;case"d":e[oi[i]]=-t.z;break;default:return null}return e}function Mh(n){var t={x:n[0],y:n[1]};return n.length>2&&(t.z=n[2]),n.length>3&&(t.m=n[3]),t}function Jv(n){ac(n.x),ac(n.y)}function ac(n){if(typeof Number.isFinite=="function"){if(Number.isFinite(n))return;throw new TypeError("coordinates must be finite numbers")}if(typeof n!="number"||n!==n||!isFinite(n))throw new TypeError("coordinates must be finite numbers")}function Qv(n,t){return(n.datum.datum_type===_i||n.datum.datum_type===gi||n.datum.datum_type===Qi)&&t.datumCode!=="WGS84"||(t.datum.datum_type===_i||t.datum.datum_type===gi||t.datum.datum_type===Qi)&&n.datumCode!=="WGS84"}function na(n,t,e,i){var s,r=e.z!==void 0;if(Jv(e),n.datum&&t.datum&&Qv(n,t)&&(s=new sn("WGS84"),e=na(n,s,e,i),n=s),i&&n.axis!=="enu"&&(e=Kv(n,e)),n.projName==="longlat")e={x:e.x*oe,y:e.y*oe,z:e.z||0};else if(n.to_meter&&(e={x:e.x*n.to_meter,y:e.y*n.to_meter,z:e.z||0}),e=n.inverse(e),!e)return;if(n.from_greenwich&&(e.x+=n.from_greenwich),e=$v(n.datum,t.datum,e),!!e)return e=e,t.from_greenwich&&(e={x:e.x-t.from_greenwich,y:e.y,z:e.z||0}),t.projName==="longlat"?e={x:e.x*Be,y:e.y*Be,z:e.z||0}:(e=t.forward(e),t.to_meter&&(e={x:e.x/t.to_meter,y:e.y/t.to_meter,z:e.z||0})),i&&t.axis!=="enu"?Zv(t,e):(e&&!r&&t.projName!=="geocent"&&delete e.z,e)}function tM(n,t,e,i){var s;return Array.isArray(e)?s=Mh(e):s={x:e.x,y:e.y,z:e.z,m:e.m},na(n,t,s,i)}var oc=sn("WGS84");function no(n,t,e,i){var s,r,a;return Array.isArray(e)?(s=na(n,t,Mh(e),i)||{x:NaN,y:NaN},e.length>2?(r=typeof n.name<"u"&&n.name==="geocent"||typeof t.name<"u"&&t.name==="geocent",r?typeof s.z=="number"?[s.x,s.y,s.z].concat(e.slice(3)):[s.x,s.y,e[2]].concat(e.slice(3)):i&&typeof s.z=="number"?[s.x,s.y,s.z].concat(e.slice(3)):[s.x,s.y].concat(e.slice(2))):[s.x,s.y]):(s=na(n,t,{x:e.x,y:e.y,z:e.z,m:e.m},i)||{x:NaN,y:NaN},a=Object.keys(e),a.length===2||(r=typeof n.name<"u"&&n.name==="geocent"||typeof t.name<"u"&&t.name==="geocent",a.forEach(function(o){o==="x"||o==="y"||o==="z"&&(r||i)||(s[o]=e[o])})),s)}function Ir(n){return n instanceof sn?n:typeof n=="object"&&"oProj"in n?n.oProj:sn(n)}function eM(n,t,e){var i,s,r=!1,a;return typeof t>"u"?(s=Ir(n),i=oc,r=!0):(typeof t.x<"u"||Array.isArray(t))&&(e=t,s=Ir(n),i=oc,r=!0),i||(i=Ir(n)),s||(s=Ir(t)),e?no(i,s,e):(a={forward:function(o,h){return no(i,s,o,h)},inverse:function(o,h){return no(s,i,o,h)}},r&&(a.oProj=s),a)}var hc=6,_u="AJSAJS",gu="AFAFAF",Xi=65,Oe=73,Qe=79,ys=86,Ss=90;const nM={forward:vu,inverse:iM,toPoint:Mu};function vu(n,t){return t=t||5,aM(sM({lat:n[1],lon:n[0]}),t)}function iM(n){var t=xh(yu(n.toUpperCase()));return t.lat&&t.lon?[t.lon,t.lat,t.lon,t.lat]:[t.left,t.bottom,t.right,t.top]}function Mu(n){var t=xh(yu(n.toUpperCase()));return t.lat&&t.lon?[t.lon,t.lat]:[(t.left+t.right)/2,(t.top+t.bottom)/2]}function io(n){return n*(Math.PI/180)}function lc(n){return 180*(n/Math.PI)}function sM(n){var t=n.lat,e=n.lon,i=6378137,s=.00669438,r=.9996,a,o,h,l,c,u,d,f=io(t),_=io(e),g,p;p=Math.floor((e+180)/6)+1,e===180&&(p=60),t>=56&&t<64&&e>=3&&e<12&&(p=32),t>=72&&t<84&&(e>=0&&e<9?p=31:e>=9&&e<21?p=33:e>=21&&e<33?p=35:e>=33&&e<42&&(p=37)),a=(p-1)*6-180+3,g=io(a),o=s/(1-s),h=i/Math.sqrt(1-s*Math.sin(f)*Math.sin(f)),l=Math.tan(f)*Math.tan(f),c=o*Math.cos(f)*Math.cos(f),u=Math.cos(f)*(_-g),d=i*((1-s/4-3*s*s/64-5*s*s*s/256)*f-(3*s/8+3*s*s/32+45*s*s*s/1024)*Math.sin(2*f)+(15*s*s/256+45*s*s*s/1024)*Math.sin(4*f)-35*s*s*s/3072*Math.sin(6*f));var m=r*h*(u+(1-l+c)*u*u*u/6+(5-18*l+l*l+72*c-58*o)*u*u*u*u*u/120)+5e5,x=r*(d+h*Math.tan(f)*(u*u/2+(5-l+9*c+4*c*c)*u*u*u*u/24+(61-58*l+l*l+600*c-330*o)*u*u*u*u*u*u/720));return t<0&&(x+=1e7),{northing:Math.round(x),easting:Math.round(m),zoneNumber:p,zoneLetter:rM(t)}}function xh(n){var t=n.northing,e=n.easting,i=n.zoneLetter,s=n.zoneNumber;if(s<0||s>60)return null;var r=.9996,a=6378137,o=.00669438,h,l=(1-Math.sqrt(1-o))/(1+Math.sqrt(1-o)),c,u,d,f,_,g,p,m,x,v=e-5e5,y=t;i<"N"&&(y-=1e7),p=(s-1)*6-180+3,h=o/(1-o),g=y/r,m=g/(a*(1-o/4-3*o*o/64-5*o*o*o/256)),x=m+(3*l/2-27*l*l*l/32)*Math.sin(2*m)+(21*l*l/16-55*l*l*l*l/32)*Math.sin(4*m)+151*l*l*l/96*Math.sin(6*m),c=a/Math.sqrt(1-o*Math.sin(x)*Math.sin(x)),u=Math.tan(x)*Math.tan(x),d=h*Math.cos(x)*Math.cos(x),f=a*(1-o)/Math.pow(1-o*Math.sin(x)*Math.sin(x),1.5),_=v/(c*r);var L=x-c*Math.tan(x)/f*(_*_/2-(5+3*u+10*d-4*d*d-9*h)*_*_*_*_/24+(61+90*u+298*d+45*u*u-252*h-3*d*d)*_*_*_*_*_*_/720);L=lc(L);var T=(_-(1+2*u+d)*_*_*_/6+(5-2*d+28*u-3*d*d+8*h+24*u*u)*_*_*_*_*_/120)/Math.cos(x);T=p+lc(T);var b;if(n.accuracy){var C=xh({northing:n.northing+n.accuracy,easting:n.easting+n.accuracy,zoneLetter:n.zoneLetter,zoneNumber:n.zoneNumber});b={top:C.lat,right:C.lon,bottom:L,left:T}}else b={lat:L,lon:T};return b}function rM(n){var t="Z";return 84>=n&&n>=72?t="X":72>n&&n>=64?t="W":64>n&&n>=56?t="V":56>n&&n>=48?t="U":48>n&&n>=40?t="T":40>n&&n>=32?t="S":32>n&&n>=24?t="R":24>n&&n>=16?t="Q":16>n&&n>=8?t="P":8>n&&n>=0?t="N":0>n&&n>=-8?t="M":-8>n&&n>=-16?t="L":-16>n&&n>=-24?t="K":-24>n&&n>=-32?t="J":-32>n&&n>=-40?t="H":-40>n&&n>=-48?t="G":-48>n&&n>=-56?t="F":-56>n&&n>=-64?t="E":-64>n&&n>=-72?t="D":-72>n&&n>=-80&&(t="C"),t}function aM(n,t){var e="00000"+n.easting,i="00000"+n.northing;return n.zoneNumber+n.zoneLetter+oM(n.easting,n.northing,n.zoneNumber)+e.substr(e.length-5,t)+i.substr(i.length-5,t)}function oM(n,t,e){var i=xu(e),s=Math.floor(n/1e5),r=Math.floor(t/1e5)%20;return hM(s,r,i)}function xu(n){var t=n%hc;return t===0&&(t=hc),t}function hM(n,t,e){var i=e-1,s=_u.charCodeAt(i),r=gu.charCodeAt(i),a=s+n-1,o=r+t,h=!1;a>Ss&&(a=a-Ss+Xi-1,h=!0),(a===Oe||s<Oe&&a>Oe||(a>Oe||s<Oe)&&h)&&a++,(a===Qe||s<Qe&&a>Qe||(a>Qe||s<Qe)&&h)&&(a++,a===Oe&&a++),a>Ss&&(a=a-Ss+Xi-1),o>ys?(o=o-ys+Xi-1,h=!0):h=!1,(o===Oe||r<Oe&&o>Oe||(o>Oe||r<Oe)&&h)&&o++,(o===Qe||r<Qe&&o>Qe||(o>Qe||r<Qe)&&h)&&(o++,o===Oe&&o++),o>ys&&(o=o-ys+Xi-1);var l=String.fromCharCode(a)+String.fromCharCode(o);return l}function yu(n){if(n&&n.length===0)throw"MGRSPoint coverting from nothing";for(var t=n.length,e=null,i="",s,r=0;!/[A-Z]/.test(s=n.charAt(r));){if(r>=2)throw"MGRSPoint bad conversion from: "+n;i+=s,r++}var a=parseInt(i,10);if(r===0||r+3>t)throw"MGRSPoint bad conversion from: "+n;var o=n.charAt(r++);if(o<="A"||o==="B"||o==="Y"||o>="Z"||o==="I"||o==="O")throw"MGRSPoint zone letter "+o+" not handled: "+n;e=n.substring(r,r+=2);for(var h=xu(a),l=lM(e.charAt(0),h),c=cM(e.charAt(1),h);c<uM(o);)c+=2e6;var u=t-r;if(u%2!==0)throw`MGRSPoint has to have an even number 
of digits after the zone letter and two 100km letters - front 
half for easting meters, second half for 
northing meters`+n;var d=u/2,f=0,_=0,g,p,m,x,v;return d>0&&(g=1e5/Math.pow(10,d),p=n.substring(r,r+d),f=parseFloat(p)*g,m=n.substring(r+d),_=parseFloat(m)*g),x=f+l,v=_+c,{easting:x,northing:v,zoneLetter:o,zoneNumber:a,accuracy:g}}function lM(n,t){for(var e=_u.charCodeAt(t-1),i=1e5,s=!1;e!==n.charCodeAt(0);){if(e++,e===Oe&&e++,e===Qe&&e++,e>Ss){if(s)throw"Bad character: "+n;e=Xi,s=!0}i+=1e5}return i}function cM(n,t){if(n>"V")throw"MGRSPoint given invalid Northing "+n;for(var e=gu.charCodeAt(t-1),i=0,s=!1;e!==n.charCodeAt(0);){if(e++,e===Oe&&e++,e===Qe&&e++,e>ys){if(s)throw"Bad character: "+n;e=Xi,s=!0}i+=1e5}return i}function uM(n){var t;switch(n){case"C":t=11e5;break;case"D":t=2e6;break;case"E":t=28e5;break;case"F":t=37e5;break;case"G":t=46e5;break;case"H":t=55e5;break;case"J":t=64e5;break;case"K":t=73e5;break;case"L":t=82e5;break;case"M":t=91e5;break;case"N":t=0;break;case"P":t=8e5;break;case"Q":t=17e5;break;case"R":t=26e5;break;case"S":t=35e5;break;case"T":t=44e5;break;case"U":t=53e5;break;case"V":t=62e5;break;case"W":t=7e6;break;case"X":t=79e5;break;default:t=-1}if(t>=0)return t;throw"Invalid zone letter: "+n}function os(n,t,e){if(!(this instanceof os))return new os(n,t,e);if(Array.isArray(n))this.x=n[0],this.y=n[1],this.z=n[2]||0;else if(typeof n=="object")this.x=n.x,this.y=n.y,this.z=n.z||0;else if(typeof n=="string"&&typeof t>"u"){var i=n.split(",");this.x=parseFloat(i[0]),this.y=parseFloat(i[1]),this.z=parseFloat(i[2])||0}else this.x=n,this.y=t,this.z=e||0;console.warn("proj4.Point will be removed in version 3, use proj4.toPoint")}os.fromMGRS=function(n){return new os(Mu(n))};os.prototype.toMGRS=function(n){return vu([this.x,this.y],n)};var fM=1,dM=.25,cc=.046875,uc=.01953125,fc=.01068115234375,pM=.75,mM=.46875,_M=.013020833333333334,gM=.007120768229166667,vM=.3645833333333333,MM=.005696614583333333,xM=.3076171875;function yh(n){var t=[];t[0]=fM-n*(dM+n*(cc+n*(uc+n*fc))),t[1]=n*(pM-n*(cc+n*(uc+n*fc)));var e=n*n;return t[2]=e*(mM-n*(_M+n*gM)),e*=n,t[3]=e*(vM-n*MM),t[4]=e*n*xM,t}function us(n,t,e,i){return e*=t,t*=t,i[0]*n-e*(i[1]+t*(i[2]+t*(i[3]+t*i[4])))}var yM=20;function Sh(n,t,e){for(var i=1/(1-t),s=n,r=yM;r;--r){var a=Math.sin(s),o=1-t*a*a;if(o=(us(s,a,Math.cos(s),e)-n)*(o*Math.sqrt(o))*i,s-=o,Math.abs(o)<st)return s}return s}function SM(){this.x0=this.x0!==void 0?this.x0:0,this.y0=this.y0!==void 0?this.y0:0,this.long0=this.long0!==void 0?this.long0:0,this.lat0=this.lat0!==void 0?this.lat0:0,this.es&&(this.en=yh(this.es),this.ml0=us(this.lat0,Math.sin(this.lat0),Math.cos(this.lat0),this.en))}function EM(n){var t=n.x,e=n.y,i=ht(t-this.long0,this.over),s,r,a,o=Math.sin(e),h=Math.cos(e);if(this.es){var c=h*i,u=Math.pow(c,2),d=this.ep2*Math.pow(h,2),f=Math.pow(d,2),_=Math.abs(h)>st?Math.tan(e):0,g=Math.pow(_,2),p=Math.pow(g,2);s=1-this.es*Math.pow(o,2),c=c/Math.sqrt(s);var m=us(e,o,h,this.en);r=this.a*(this.k0*c*(1+u/6*(1-g+d+u/20*(5-18*g+p+14*d-58*g*d+u/42*(61+179*p-p*g-479*g)))))+this.x0,a=this.a*(this.k0*(m-this.ml0+o*i*c/2*(1+u/12*(5-g+9*d+4*f+u/30*(61+p-58*g+270*d-330*g*d+u/56*(1385+543*p-p*g-3111*g))))))+this.y0}else{var l=h*Math.sin(i);if(Math.abs(Math.abs(l)-1)<st)return 93;if(r=.5*this.a*this.k0*Math.log((1+l)/(1-l))+this.x0,a=h*Math.cos(i)/Math.sqrt(1-Math.pow(l,2)),l=Math.abs(a),l>=1){if(l-1>st)return 93;a=0}else a=Math.acos(a);e<0&&(a=-a),a=this.a*this.k0*(a-this.lat0)+this.y0}return n.x=r,n.y=a,n}function wM(n){var t,e,i,s,r=(n.x-this.x0)*(1/this.a),a=(n.y-this.y0)*(1/this.a);if(this.es)if(t=this.ml0+a/this.k0,e=Sh(t,this.es,this.en),Math.abs(e)<J){var u=Math.sin(e),d=Math.cos(e),f=Math.abs(d)>st?Math.tan(e):0,_=this.ep2*Math.pow(d,2),g=Math.pow(_,2),p=Math.pow(f,2),m=Math.pow(p,2);t=1-this.es*Math.pow(u,2);var x=r*Math.sqrt(t)/this.k0,v=Math.pow(x,2);t=t*f,i=e-t*v/(1-this.es)*.5*(1-v/12*(5+3*p-9*_*p+_-4*g-v/30*(61+90*p-252*_*p+45*m+46*_-v/56*(1385+3633*p+4095*m+1574*m*p)))),s=ht(this.long0+x*(1-v/6*(1+2*p+_-v/20*(5+28*p+24*m+8*_*p+6*_-v/42*(61+662*p+1320*m+720*m*p))))/d,this.over)}else i=J*js(a),s=0;else{var o=Math.exp(r/this.k0),h=.5*(o-1/o),l=this.lat0+a/this.k0,c=Math.cos(l);t=Math.sqrt((1-Math.pow(c,2))/(1+Math.pow(h,2))),i=Math.asin(t),a<0&&(i=-i),h===0&&c===0?s=0:s=ht(Math.atan2(h,c)+this.long0,this.over)}return n.x=s,n.y=i,n}var bM=["Fast_Transverse_Mercator","Fast Transverse Mercator"];const Hr={init:SM,forward:EM,inverse:wM,names:bM};function Su(n){var t=Math.exp(n);return t=(t-1/t)/2,t}function Ge(n,t){n=Math.abs(n),t=Math.abs(t);var e=Math.max(n,t),i=Math.min(n,t)/(e||1);return e*Math.sqrt(1+Math.pow(i,2))}function TM(n){var t=1+n,e=t-1;return e===0?n:n*Math.log(t)/e}function AM(n){var t=Math.abs(n);return t=TM(t*(1+t/(Ge(1,t)+1))),n<0?-t:t}function Eh(n,t){for(var e=2*Math.cos(2*t),i=n.length-1,s=n[i],r=0,a;--i>=0;)a=-r+e*s+n[i],r=s,s=a;return t+a*Math.sin(2*t)}function PM(n,t){for(var e=2*Math.cos(t),i=n.length-1,s=n[i],r=0,a;--i>=0;)a=-r+e*s+n[i],r=s,s=a;return Math.sin(t)*a}function RM(n){var t=Math.exp(n);return t=(t+1/t)/2,t}function Eu(n,t,e){for(var i=Math.sin(t),s=Math.cos(t),r=Su(e),a=RM(e),o=2*s*a,h=-2*i*r,l=n.length-1,c=n[l],u=0,d=0,f=0,_,g;--l>=0;)_=d,g=u,d=c,u=f,c=-_+o*d-h*u+n[l],f=-g+h*d+o*u;return o=i*a,h=s*r,[o*c-h*f,o*f+h*c]}function CM(){if(!this.approx&&(isNaN(this.es)||this.es<=0))throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');this.approx&&(Hr.init.apply(this),this.forward=Hr.forward,this.inverse=Hr.inverse),this.x0=this.x0!==void 0?this.x0:0,this.y0=this.y0!==void 0?this.y0:0,this.long0=this.long0!==void 0?this.long0:0,this.lat0=this.lat0!==void 0?this.lat0:0,this.cgb=[],this.cbg=[],this.utg=[],this.gtu=[];var n=this.es/(1+Math.sqrt(1-this.es)),t=n/(2-n),e=t;this.cgb[0]=t*(2+t*(-2/3+t*(-2+t*(116/45+t*(26/45+t*(-2854/675)))))),this.cbg[0]=t*(-2+t*(2/3+t*(4/3+t*(-82/45+t*(32/45+t*(4642/4725)))))),e=e*t,this.cgb[1]=e*(7/3+t*(-8/5+t*(-227/45+t*(2704/315+t*(2323/945))))),this.cbg[1]=e*(5/3+t*(-16/15+t*(-13/9+t*(904/315+t*(-1522/945))))),e=e*t,this.cgb[2]=e*(56/15+t*(-136/35+t*(-1262/105+t*(73814/2835)))),this.cbg[2]=e*(-26/15+t*(34/21+t*(8/5+t*(-12686/2835)))),e=e*t,this.cgb[3]=e*(4279/630+t*(-332/35+t*(-399572/14175))),this.cbg[3]=e*(1237/630+t*(-12/5+t*(-24832/14175))),e=e*t,this.cgb[4]=e*(4174/315+t*(-144838/6237)),this.cbg[4]=e*(-734/315+t*(109598/31185)),e=e*t,this.cgb[5]=e*(601676/22275),this.cbg[5]=e*(444337/155925),e=Math.pow(t,2),this.Qn=this.k0/(1+t)*(1+e*(1/4+e*(1/64+e/256))),this.utg[0]=t*(-.5+t*(2/3+t*(-37/96+t*(1/360+t*(81/512+t*(-96199/604800)))))),this.gtu[0]=t*(.5+t*(-2/3+t*(5/16+t*(41/180+t*(-127/288+t*(7891/37800)))))),this.utg[1]=e*(-1/48+t*(-1/15+t*(437/1440+t*(-46/105+t*(1118711/3870720))))),this.gtu[1]=e*(13/48+t*(-3/5+t*(557/1440+t*(281/630+t*(-1983433/1935360))))),e=e*t,this.utg[2]=e*(-17/480+t*(37/840+t*(209/4480+t*(-5569/90720)))),this.gtu[2]=e*(61/240+t*(-103/140+t*(15061/26880+t*(167603/181440)))),e=e*t,this.utg[3]=e*(-4397/161280+t*(11/504+t*(830251/7257600))),this.gtu[3]=e*(49561/161280+t*(-179/168+t*(6601661/7257600))),e=e*t,this.utg[4]=e*(-4583/161280+t*(108847/3991680)),this.gtu[4]=e*(34729/80640+t*(-3418889/1995840)),e=e*t,this.utg[5]=e*(-20648693/638668800),this.gtu[5]=e*(212378941/319334400);var i=Eh(this.cbg,this.lat0);this.Zb=-this.Qn*(i+PM(this.gtu,2*i))}function LM(n){var t=ht(n.x-this.long0,this.over),e=n.y;e=Eh(this.cbg,e);var i=Math.sin(e),s=Math.cos(e),r=Math.sin(t),a=Math.cos(t);e=Math.atan2(i,a*s),t=Math.atan2(r*s,Ge(i,s*a)),t=AM(Math.tan(t));var o=Eu(this.gtu,2*e,2*t);e=e+o[0],t=t+o[1];var h,l;return Math.abs(t)<=2.623395162778?(h=this.a*(this.Qn*t)+this.x0,l=this.a*(this.Qn*e+this.Zb)+this.y0):(h=1/0,l=1/0),n.x=h,n.y=l,n}function IM(n){var t=(n.x-this.x0)*(1/this.a),e=(n.y-this.y0)*(1/this.a);e=(e-this.Zb)/this.Qn,t=t/this.Qn;var i,s;if(Math.abs(t)<=2.623395162778){var r=Eu(this.utg,2*e,2*t);e=e+r[0],t=t+r[1],t=Math.atan(Su(t));var a=Math.sin(e),o=Math.cos(e),h=Math.sin(t),l=Math.cos(t);e=Math.atan2(a*l,Ge(h,l*o)),t=Math.atan2(h,l*o),i=ht(t+this.long0,this.over),s=Eh(this.cgb,e)}else i=1/0,s=1/0;return n.x=i,n.y=s,n}var NM=["Extended_Transverse_Mercator","Extended Transverse Mercator","etmerc","Transverse_Mercator","Transverse Mercator","Gauss Kruger","Gauss_Kruger","tmerc"];const Vr={init:CM,forward:LM,inverse:IM,names:NM};function DM(n,t){if(n===void 0){if(n=Math.floor((ht(t)+Math.PI)*30/Math.PI)+1,n<0)return 0;if(n>60)return 60}return n}var UM="etmerc";function OM(){var n=DM(this.zone,this.long0);if(n===void 0)throw new Error("unknown utm zone");this.lat0=0,this.long0=(6*Math.abs(n)-183)*oe,this.x0=5e5,this.y0=this.utmSouth?1e7:0,this.k0=.9996,Vr.init.apply(this),this.forward=Vr.forward,this.inverse=Vr.inverse}var FM=["Universal Transverse Mercator System","utm"];const GM={init:OM,names:FM,dependsOn:UM};function wh(n,t){return Math.pow((1-n)/(1+n),t)}var BM=20;function zM(){var n=Math.sin(this.lat0),t=Math.cos(this.lat0);t*=t,this.rc=Math.sqrt(1-this.es)/(1-this.es*n*n),this.C=Math.sqrt(1+this.es*t*t/(1-this.es)),this.phic0=Math.asin(n/this.C),this.ratexp=.5*this.C*this.e,this.K=Math.tan(.5*this.phic0+$t)/(Math.pow(Math.tan(.5*this.lat0+$t),this.C)*wh(this.e*n,this.ratexp))}function kM(n){var t=n.x,e=n.y;return n.y=2*Math.atan(this.K*Math.pow(Math.tan(.5*e+$t),this.C)*wh(this.e*Math.sin(e),this.ratexp))-J,n.x=this.C*t,n}function HM(n){for(var t=1e-14,e=n.x/this.C,i=n.y,s=Math.pow(Math.tan(.5*i+$t)/this.K,1/this.C),r=BM;r>0&&(i=2*Math.atan(s*wh(this.e*Math.sin(n.y),-.5*this.e))-J,!(Math.abs(i-n.y)<t));--r)n.y=i;return r?(n.x=e,n.y=i,n):null}const bh={init:zM,forward:kM,inverse:HM};function VM(){bh.init.apply(this),this.rc&&(this.sinc0=Math.sin(this.phic0),this.cosc0=Math.cos(this.phic0),this.R2=2*this.rc,this.title||(this.title="Oblique Stereographic Alternative"))}function WM(n){var t,e,i,s;return n.x=ht(n.x-this.long0,this.over),bh.forward.apply(this,[n]),t=Math.sin(n.y),e=Math.cos(n.y),i=Math.cos(n.x),s=this.k0*this.R2/(1+this.sinc0*t+this.cosc0*e*i),n.x=s*e*Math.sin(n.x),n.y=s*(this.cosc0*t-this.sinc0*e*i),n.x=this.a*n.x+this.x0,n.y=this.a*n.y+this.y0,n}function XM(n){var t,e,i,s,r;if(n.x=(n.x-this.x0)/this.a,n.y=(n.y-this.y0)/this.a,n.x/=this.k0,n.y/=this.k0,r=Ge(n.x,n.y)){var a=2*Math.atan2(r,this.R2);t=Math.sin(a),e=Math.cos(a),s=Math.asin(e*this.sinc0+n.y*t*this.cosc0/r),i=Math.atan2(n.x*t,r*this.cosc0*e-n.y*this.sinc0*t)}else s=this.phic0,i=0;return n.x=i,n.y=s,bh.inverse.apply(this,[n]),n.x=ht(n.x+this.long0,this.over),n}var qM=["Stereographic_North_Pole","Oblique_Stereographic","sterea","Oblique Stereographic Alternative","Double_Stereographic"];const YM={init:VM,forward:WM,inverse:XM,names:qM};function Th(n,t,e){return t*=e,Math.tan(.5*(J+n))*Math.pow((1-t)/(1+t),.5*e)}function $M(){this.x0=this.x0||0,this.y0=this.y0||0,this.lat0=this.lat0||0,this.long0=this.long0||0,this.coslat0=Math.cos(this.lat0),this.sinlat0=Math.sin(this.lat0),this.sphere?this.k0===1&&!isNaN(this.lat_ts)&&Math.abs(this.coslat0)<=st&&(this.k0=.5*(1+js(this.lat0)*Math.sin(this.lat_ts))):(Math.abs(this.coslat0)<=st&&(this.lat0>0?this.con=1:this.con=-1),this.cons=Math.sqrt(Math.pow(1+this.e,1+this.e)*Math.pow(1-this.e,1-this.e)),this.k0===1&&!isNaN(this.lat_ts)&&Math.abs(this.coslat0)<=st&&Math.abs(Math.cos(this.lat_ts))>st&&(this.k0=.5*this.cons*Mn(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts))/dn(this.e,this.con*this.lat_ts,this.con*Math.sin(this.lat_ts))),this.ms1=Mn(this.e,this.sinlat0,this.coslat0),this.X0=2*Math.atan(Th(this.lat0,this.sinlat0,this.e))-J,this.cosX0=Math.cos(this.X0),this.sinX0=Math.sin(this.X0))}function jM(n){var t=n.x,e=n.y,i=Math.sin(e),s=Math.cos(e),r,a,o,h,l,c,u=ht(t-this.long0,this.over);return Math.abs(Math.abs(t-this.long0)-Math.PI)<=st&&Math.abs(e+this.lat0)<=st?(n.x=NaN,n.y=NaN,n):this.sphere?(r=2*this.k0/(1+this.sinlat0*i+this.coslat0*s*Math.cos(u)),n.x=this.a*r*s*Math.sin(u)+this.x0,n.y=this.a*r*(this.coslat0*i-this.sinlat0*s*Math.cos(u))+this.y0,n):(a=2*Math.atan(Th(e,i,this.e))-J,h=Math.cos(a),o=Math.sin(a),Math.abs(this.coslat0)<=st?(l=dn(this.e,e*this.con,this.con*i),c=2*this.a*this.k0*l/this.cons,n.x=this.x0+c*Math.sin(t-this.long0),n.y=this.y0-this.con*c*Math.cos(t-this.long0),n):(Math.abs(this.sinlat0)<st?(r=2*this.a*this.k0/(1+h*Math.cos(u)),n.y=r*o):(r=2*this.a*this.k0*this.ms1/(this.cosX0*(1+this.sinX0*o+this.cosX0*h*Math.cos(u))),n.y=r*(this.cosX0*o-this.sinX0*h*Math.cos(u))+this.y0),n.x=r*h*Math.sin(u)+this.x0,n))}function KM(n){n.x-=this.x0,n.y-=this.y0;var t,e,i,s,r,a=Math.sqrt(n.x*n.x+n.y*n.y);if(this.sphere){var o=2*Math.atan(a/(2*this.a*this.k0));return t=this.long0,e=this.lat0,a<=st?(n.x=t,n.y=e,n):(e=Math.asin(Math.cos(o)*this.sinlat0+n.y*Math.sin(o)*this.coslat0/a),Math.abs(this.coslat0)<st?this.lat0>0?t=ht(this.long0+Math.atan2(n.x,-1*n.y),this.over):t=ht(this.long0+Math.atan2(n.x,n.y),this.over):t=ht(this.long0+Math.atan2(n.x*Math.sin(o),a*this.coslat0*Math.cos(o)-n.y*this.sinlat0*Math.sin(o)),this.over),n.x=t,n.y=e,n)}else if(Math.abs(this.coslat0)<=st){if(a<=st)return e=this.lat0,t=this.long0,n.x=t,n.y=e,n;n.x*=this.con,n.y*=this.con,i=a*this.cons/(2*this.a*this.k0),e=this.con*Hs(this.e,i),t=this.con*ht(this.con*this.long0+Math.atan2(n.x,-1*n.y),this.over)}else s=2*Math.atan(a*this.cosX0/(2*this.a*this.k0*this.ms1)),t=this.long0,a<=st?r=this.X0:(r=Math.asin(Math.cos(s)*this.sinX0+n.y*Math.sin(s)*this.cosX0/a),t=ht(this.long0+Math.atan2(n.x*Math.sin(s),a*this.cosX0*Math.cos(s)-n.y*this.sinX0*Math.sin(s)),this.over)),e=-1*Hs(this.e,Math.tan(.5*(J+r)));return n.x=t,n.y=e,n}var ZM=["stere","Stereographic_South_Pole","Polar_Stereographic_variant_A","Polar_Stereographic_variant_B","Polar_Stereographic"];const JM={init:$M,forward:jM,inverse:KM,names:ZM,ssfn_:Th};function QM(){var n=this.lat0;this.lambda0=this.long0;var t=Math.sin(n),e=this.a,i=this.rf,s=1/i,r=2*s-Math.pow(s,2),a=this.e=Math.sqrt(r);this.R=this.k0*e*Math.sqrt(1-r)/(1-r*Math.pow(t,2)),this.alpha=Math.sqrt(1+r/(1-r)*Math.pow(Math.cos(n),4)),this.b0=Math.asin(t/this.alpha);var o=Math.log(Math.tan(Math.PI/4+this.b0/2)),h=Math.log(Math.tan(Math.PI/4+n/2)),l=Math.log((1+a*t)/(1-a*t));this.K=o-this.alpha*h+this.alpha*a/2*l}function t1(n){var t=Math.log(Math.tan(Math.PI/4-n.y/2)),e=this.e/2*Math.log((1+this.e*Math.sin(n.y))/(1-this.e*Math.sin(n.y))),i=-this.alpha*(t+e)+this.K,s=2*(Math.atan(Math.exp(i))-Math.PI/4),r=this.alpha*(n.x-this.lambda0),a=Math.atan(Math.sin(r)/(Math.sin(this.b0)*Math.tan(s)+Math.cos(this.b0)*Math.cos(r))),o=Math.asin(Math.cos(this.b0)*Math.sin(s)-Math.sin(this.b0)*Math.cos(s)*Math.cos(r));return n.y=this.R/2*Math.log((1+Math.sin(o))/(1-Math.sin(o)))+this.y0,n.x=this.R*a+this.x0,n}function e1(n){for(var t=n.x-this.x0,e=n.y-this.y0,i=t/this.R,s=2*(Math.atan(Math.exp(e/this.R))-Math.PI/4),r=Math.asin(Math.cos(this.b0)*Math.sin(s)+Math.sin(this.b0)*Math.cos(s)*Math.cos(i)),a=Math.atan(Math.sin(i)/(Math.cos(this.b0)*Math.cos(i)-Math.sin(this.b0)*Math.tan(s))),o=this.lambda0+a/this.alpha,h=0,l=r,c=-1e3,u=0;Math.abs(l-c)>1e-7;){if(++u>20)return;h=1/this.alpha*(Math.log(Math.tan(Math.PI/4+r/2))-this.K)+this.e*Math.log(Math.tan(Math.PI/4+Math.asin(this.e*Math.sin(l))/2)),c=l,l=2*Math.atan(Math.exp(h))-Math.PI/2}return n.x=o,n.y=l,n}var n1=["somerc"];const i1={init:QM,forward:t1,inverse:e1,names:n1};var Bi=1e-7;function s1(n){var t=["Hotine_Oblique_Mercator","Hotine_Oblique_Mercator_variant_A","Hotine_Oblique_Mercator_Azimuth_Natural_Origin"],e=typeof n.projName=="object"?Object.keys(n.projName)[0]:n.projName;return"no_uoff"in n||"no_off"in n||t.indexOf(e)!==-1||t.indexOf(fu(e))!==-1}function r1(){var n,t,e,i,s,r,a,o,h,l,c=0,u,d=0,f=0,_=0,g=0,p=0,m=0;this.no_off=s1(this),this.no_rot="no_rot"in this;var x=!1;"alpha"in this&&(x=!0);var v=!1;if("rectified_grid_angle"in this&&(v=!0),x&&(m=this.alpha),v&&(c=this.rectified_grid_angle,x||(m=0,x=!0)),x||v)d=this.longc;else if(f=this.long1,g=this.lat1,_=this.long2,p=this.lat2,Math.abs(g-p)<=Bi||(n=Math.abs(g))<=Bi||Math.abs(n-J)<=Bi||Math.abs(Math.abs(this.lat0)-J)<=Bi||Math.abs(Math.abs(p)-J)<=Bi)throw new Error;var y=1-this.es;t=Math.sqrt(y),Math.abs(this.lat0)>st?(o=Math.sin(this.lat0),e=Math.cos(this.lat0),n=1-this.es*o*o,this.B=e*e,this.B=Math.sqrt(1+this.es*this.B*this.B/y),this.A=this.B*this.k0*t/n,i=this.B*t/(e*Math.sqrt(n)),s=i*i-1,s<=0?s=0:(s=Math.sqrt(s),this.lat0<0&&(s=-s)),this.E=s+=i,this.E*=Math.pow(dn(this.e,this.lat0,o),this.B)):(this.B=1/t,this.A=this.k0,this.E=i=s=1),x||v?(x?(u=Math.asin(Math.sin(m)/i),v||(c=m)):(u=c,m=Math.asin(i*Math.sin(u))),this.lam0=d-Math.asin(.5*(s-1/s)*Math.tan(u))/this.B):(r=Math.pow(dn(this.e,g,Math.sin(g)),this.B),a=Math.pow(dn(this.e,p,Math.sin(p)),this.B),s=this.E/r,h=(a-r)/(a+r),l=this.E*this.E,l=(l-a*r)/(l+a*r),n=f-_,n<-Math.PI?_-=zs:n>Math.PI&&(_+=zs),this.lam0=ht(.5*(f+_)-Math.atan(l*Math.tan(.5*this.B*(f-_))/h)/this.B,this.over),u=Math.atan(2*Math.sin(this.B*ht(f-this.lam0,this.over))/(s-1/s)),c=m=Math.asin(i*Math.sin(u))),this.singam=Math.sin(u),this.cosgam=Math.cos(u),this.sinrot=Math.sin(c),this.cosrot=Math.cos(c),this.rB=1/this.B,this.ArB=this.A*this.rB,this.BrA=1/this.ArB,this.no_off?this.u_0=0:(this.u_0=Math.abs(this.ArB*Math.atan(Math.sqrt(i*i-1)/Math.cos(m))),this.lat0<0&&(this.u_0=-this.u_0)),s=.5*u,this.v_pole_n=this.ArB*Math.log(Math.tan($t-s)),this.v_pole_s=this.ArB*Math.log(Math.tan($t+s))}function a1(n){var t={},e,i,s,r,a,o,h,l;if(n.x=n.x-this.lam0,Math.abs(Math.abs(n.y)-J)>st){if(a=this.E/Math.pow(dn(this.e,n.y,Math.sin(n.y)),this.B),o=1/a,e=.5*(a-o),i=.5*(a+o),r=Math.sin(this.B*n.x),s=(e*this.singam-r*this.cosgam)/i,Math.abs(Math.abs(s)-1)<st)throw new Error;l=.5*this.ArB*Math.log((1-s)/(1+s)),o=Math.cos(this.B*n.x),Math.abs(o)<Bi?h=this.A*n.x:h=this.ArB*Math.atan2(e*this.cosgam+r*this.singam,o)}else l=n.y>0?this.v_pole_n:this.v_pole_s,h=this.ArB*n.y;return this.no_rot?(t.x=h,t.y=l):(h-=this.u_0,t.x=l*this.cosrot+h*this.sinrot,t.y=h*this.cosrot-l*this.sinrot),t.x=this.a*t.x+this.x0,t.y=this.a*t.y+this.y0,t}function o1(n){var t,e,i,s,r,a,o,h={};if(n.x=(n.x-this.x0)*(1/this.a),n.y=(n.y-this.y0)*(1/this.a),this.no_rot?(e=n.y,t=n.x):(e=n.x*this.cosrot-n.y*this.sinrot,t=n.y*this.cosrot+n.x*this.sinrot+this.u_0),i=Math.exp(-this.BrA*e),s=.5*(i-1/i),r=.5*(i+1/i),a=Math.sin(this.BrA*t),o=(a*this.cosgam+s*this.singam)/r,Math.abs(Math.abs(o)-1)<st)h.x=0,h.y=o<0?-J:J;else{if(h.y=this.E/Math.sqrt((1+o)/(1-o)),h.y=Hs(this.e,Math.pow(h.y,1/this.B)),h.y===1/0)throw new Error;h.x=-this.rB*Math.atan2(s*this.cosgam-a*this.singam,Math.cos(this.BrA*t))}return h.x+=this.lam0,h}var h1=["Hotine_Oblique_Mercator","Hotine Oblique Mercator","Hotine_Oblique_Mercator_variant_A","Hotine_Oblique_Mercator_Variant_B","Hotine_Oblique_Mercator_Azimuth_Natural_Origin","Hotine_Oblique_Mercator_Two_Point_Natural_Origin","Hotine_Oblique_Mercator_Azimuth_Center","Oblique_Mercator","omerc"];const l1={init:r1,forward:a1,inverse:o1,names:h1};function c1(){if(this.lat2||(this.lat2=this.lat1),this.k0||(this.k0=1),this.x0=this.x0||0,this.y0=this.y0||0,!(Math.abs(this.lat1+this.lat2)<st)){var n=this.b/this.a;this.e=Math.sqrt(1-n*n);var t=Math.sin(this.lat1),e=Math.cos(this.lat1),i=Mn(this.e,t,e),s=dn(this.e,this.lat1,t),r=Math.sin(this.lat2),a=Math.cos(this.lat2),o=Mn(this.e,r,a),h=dn(this.e,this.lat2,r),l=Math.abs(Math.abs(this.lat0)-J)<st?0:dn(this.e,this.lat0,Math.sin(this.lat0));Math.abs(this.lat1-this.lat2)>st?this.ns=Math.log(i/o)/Math.log(s/h):this.ns=t,isNaN(this.ns)&&(this.ns=t),this.f0=i/(this.ns*Math.pow(s,this.ns)),this.rh=this.a*this.f0*Math.pow(l,this.ns),this.title||(this.title="Lambert Conformal Conic")}}function u1(n){var t=n.x,e=n.y;Math.abs(2*Math.abs(e)-Math.PI)<=st&&(e=js(e)*(J-2*st));var i=Math.abs(Math.abs(e)-J),s,r;if(i>st)s=dn(this.e,e,Math.sin(e)),r=this.a*this.f0*Math.pow(s,this.ns);else{if(i=e*this.ns,i<=0)return null;r=0}var a=this.ns*ht(t-this.long0,this.over);return n.x=this.k0*(r*Math.sin(a))+this.x0,n.y=this.k0*(this.rh-r*Math.cos(a))+this.y0,n}function f1(n){var t,e,i,s,r,a=(n.x-this.x0)/this.k0,o=this.rh-(n.y-this.y0)/this.k0;this.ns>0?(t=Math.sqrt(a*a+o*o),e=1):(t=-Math.sqrt(a*a+o*o),e=-1);var h=0;if(t!==0&&(h=Math.atan2(e*a,e*o)),t!==0||this.ns>0){if(e=1/this.ns,i=Math.pow(t/(this.a*this.f0),e),s=Hs(this.e,i),s===-9999)return null}else s=-J;return r=ht(h/this.ns+this.long0,this.over),n.x=r,n.y=s,n}var d1=["Lambert Tangential Conformal Conic Projection","Lambert_Conformal_Conic","Lambert_Conformal_Conic_1SP","Lambert_Conformal_Conic_2SP","lcc","Lambert Conic Conformal (1SP)","Lambert Conic Conformal (2SP)"];const p1={init:c1,forward:u1,inverse:f1,names:d1};function m1(){this.a=6377397155e-3,this.es=.006674372230614,this.e=Math.sqrt(this.es),this.lat0||(this.lat0=.863937979737193),this.long0||(this.long0=.7417649320975901-.308341501185665),this.k0||(this.k0=.9999),this.s45=.785398163397448,this.s90=2*this.s45,this.fi0=this.lat0,this.e2=this.es,this.e=Math.sqrt(this.e2),this.alfa=Math.sqrt(1+this.e2*Math.pow(Math.cos(this.fi0),4)/(1-this.e2)),this.uq=1.04216856380474,this.u0=Math.asin(Math.sin(this.fi0)/this.alfa),this.g=Math.pow((1+this.e*Math.sin(this.fi0))/(1-this.e*Math.sin(this.fi0)),this.alfa*this.e/2),this.k=Math.tan(this.u0/2+this.s45)/Math.pow(Math.tan(this.fi0/2+this.s45),this.alfa)*this.g,this.k1=this.k0,this.n0=this.a*Math.sqrt(1-this.e2)/(1-this.e2*Math.pow(Math.sin(this.fi0),2)),this.s0=1.37008346281555,this.n=Math.sin(this.s0),this.ro0=this.k1*this.n0/Math.tan(this.s0),this.ad=this.s90-this.uq}function _1(n){var t,e,i,s,r,a,o,h=n.x,l=n.y,c=ht(h-this.long0,this.over);return t=Math.pow((1+this.e*Math.sin(l))/(1-this.e*Math.sin(l)),this.alfa*this.e/2),e=2*(Math.atan(this.k*Math.pow(Math.tan(l/2+this.s45),this.alfa)/t)-this.s45),i=-c*this.alfa,s=Math.asin(Math.cos(this.ad)*Math.sin(e)+Math.sin(this.ad)*Math.cos(e)*Math.cos(i)),r=Math.asin(Math.cos(e)*Math.sin(i)/Math.cos(s)),a=this.n*r,o=this.ro0*Math.pow(Math.tan(this.s0/2+this.s45),this.n)/Math.pow(Math.tan(s/2+this.s45),this.n),n.y=o*Math.cos(a)/1,n.x=o*Math.sin(a)/1,this.czech||(n.y*=-1,n.x*=-1),n}function g1(n){var t,e,i,s,r,a,o,h,l=n.x;n.x=n.y,n.y=l,this.czech||(n.y*=-1,n.x*=-1),a=Math.sqrt(n.x*n.x+n.y*n.y),r=Math.atan2(n.y,n.x),s=r/Math.sin(this.s0),i=2*(Math.atan(Math.pow(this.ro0/a,1/this.n)*Math.tan(this.s0/2+this.s45))-this.s45),t=Math.asin(Math.cos(this.ad)*Math.sin(i)-Math.sin(this.ad)*Math.cos(i)*Math.cos(s)),e=Math.asin(Math.cos(i)*Math.sin(s)/Math.cos(t)),n.x=this.long0-e/this.alfa,o=t,h=0;var c=0;do n.y=2*(Math.atan(Math.pow(this.k,-1/this.alfa)*Math.pow(Math.tan(t/2+this.s45),1/this.alfa)*Math.pow((1+this.e*Math.sin(o))/(1-this.e*Math.sin(o)),this.e/2))-this.s45),Math.abs(o-n.y)<1e-10&&(h=1),o=n.y,c+=1;while(h===0&&c<15);return c>=15?null:n}var v1=["Krovak","Krovak Modified","Krovak (North Orientated)","Krovak Modified (North Orientated)","krovak"];const M1={init:m1,forward:_1,inverse:g1,names:v1};function Ne(n,t,e,i,s){return n*s-t*Math.sin(2*s)+e*Math.sin(4*s)-i*Math.sin(6*s)}function Ks(n){return 1-.25*n*(1+n/16*(3+1.25*n))}function Zs(n){return .375*n*(1+.25*n*(1+.46875*n))}function Js(n){return .05859375*n*n*(1+.75*n)}function Qs(n){return n*n*n*(35/3072)}function Ah(n,t,e){var i=t*e;return n/Math.sqrt(1-i*i)}function Zn(n){return Math.abs(n)<J?n:n-js(n)*Math.PI}function ia(n,t,e,i,s){var r,a;r=n/t;for(var o=0;o<15;o++)if(a=(n-(t*r-e*Math.sin(2*r)+i*Math.sin(4*r)-s*Math.sin(6*r)))/(t-2*e*Math.cos(2*r)+4*i*Math.cos(4*r)-6*s*Math.cos(6*r)),r+=a,Math.abs(a)<=1e-10)return r;return NaN}function x1(){this.sphere||(this.e0=Ks(this.es),this.e1=Zs(this.es),this.e2=Js(this.es),this.e3=Qs(this.es),this.ml0=this.a*Ne(this.e0,this.e1,this.e2,this.e3,this.lat0))}function y1(n){var t,e,i=n.x,s=n.y;if(i=ht(i-this.long0,this.over),this.sphere)t=this.a*Math.asin(Math.cos(s)*Math.sin(i)),e=this.a*(Math.atan2(Math.tan(s),Math.cos(i))-this.lat0);else{var r=Math.sin(s),a=Math.cos(s),o=Ah(this.a,this.e,r),h=Math.tan(s)*Math.tan(s),l=i*Math.cos(s),c=l*l,u=this.es*a*a/(1-this.es),d=this.a*Ne(this.e0,this.e1,this.e2,this.e3,s);t=o*l*(1-c*h*(1/6-(8-h+8*u)*c/120)),e=d-this.ml0+o*r/a*c*(.5+(5-h+6*u)*c/24)}return n.x=t+this.x0,n.y=e+this.y0,n}function S1(n){n.x-=this.x0,n.y-=this.y0;var t=n.x/this.a,e=n.y/this.a,i,s;if(this.sphere){var r=e+this.lat0;i=Math.asin(Math.sin(r)*Math.cos(t)),s=Math.atan2(Math.tan(t),Math.cos(r))}else{var a=this.ml0/this.a+e,o=ia(a,this.e0,this.e1,this.e2,this.e3);if(Math.abs(Math.abs(o)-J)<=st)return n.x=this.long0,n.y=J,e<0&&(n.y*=-1),n;var h=Ah(this.a,this.e,Math.sin(o)),l=h*h*h/this.a/this.a*(1-this.es),c=Math.pow(Math.tan(o),2),u=t*this.a/h,d=u*u;i=o-h*Math.tan(o)/l*u*u*(.5-(1+3*c)*u*u/24),s=u*(1-d*(c/3+(1+3*c)*c*d/15))/Math.cos(o)}return n.x=ht(s+this.long0,this.over),n.y=Zn(i),n}var E1=["Cassini","Cassini_Soldner","cass"];const w1={init:x1,forward:y1,inverse:S1,names:E1};function vn(n,t){var e;return n>1e-7?(e=n*t,(1-n*n)*(t/(1-e*e)-.5/n*Math.log((1-e)/(1+e)))):2*t}var b1=.3333333333333333,T1=.17222222222222222,A1=.10257936507936508,P1=.06388888888888888,R1=.0664021164021164,C1=.016415012942191543;function wu(n){var t,e=[];return e[0]=n*b1,t=n*n,e[0]+=t*T1,e[1]=t*P1,t*=n,e[0]+=t*A1,e[1]+=t*R1,e[2]=t*C1,e}function bu(n,t){var e=n+n;return n+t[0]*Math.sin(e)+t[1]*Math.sin(e+e)+t[2]*Math.sin(e+e+e)}var jo=1,Ko=2,Zo=3,Wr=4;function L1(){var n=Math.abs(this.lat0);if(Math.abs(n-J)<st?this.mode=this.lat0<0?jo:Ko:Math.abs(n)<st?this.mode=Zo:this.mode=Wr,this.es>0){var t;switch(this.qp=vn(this.e,1),this.mmf=.5/(1-this.es),this.apa=wu(this.es),this.mode){case Ko:this.dd=1;break;case jo:this.dd=1;break;case Zo:this.rq=Math.sqrt(.5*this.qp),this.dd=1/this.rq,this.xmf=1,this.ymf=.5*this.qp;break;case Wr:this.rq=Math.sqrt(.5*this.qp),t=Math.sin(this.lat0),this.sinb1=vn(this.e,t)/this.qp,this.cosb1=Math.sqrt(1-this.sinb1*this.sinb1),this.dd=Math.cos(this.lat0)/(Math.sqrt(1-this.es*t*t)*this.rq*this.cosb1),this.ymf=(this.xmf=this.rq)/this.dd,this.xmf*=this.dd;break}}else this.mode===Wr&&(this.sinph0=Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0))}function I1(n){var t,e,i,s,r,a,o,h,l,c,u=n.x,d=n.y;if(u=ht(u-this.long0,this.over),this.sphere){if(r=Math.sin(d),c=Math.cos(d),i=Math.cos(u),this.mode===this.OBLIQ||this.mode===this.EQUIT){if(e=this.mode===this.EQUIT?1+c*i:1+this.sinph0*r+this.cosph0*c*i,e<=st)return null;e=Math.sqrt(2/e),t=e*c*Math.sin(u),e*=this.mode===this.EQUIT?r:this.cosph0*r-this.sinph0*c*i}else if(this.mode===this.N_POLE||this.mode===this.S_POLE){if(this.mode===this.N_POLE&&(i=-i),Math.abs(d+this.lat0)<st)return null;e=$t-d*.5,e=2*(this.mode===this.S_POLE?Math.cos(e):Math.sin(e)),t=e*Math.sin(u),e*=i}}else{switch(o=0,h=0,l=0,i=Math.cos(u),s=Math.sin(u),r=Math.sin(d),a=vn(this.e,r),(this.mode===this.OBLIQ||this.mode===this.EQUIT)&&(o=a/this.qp,h=Math.sqrt(1-o*o)),this.mode){case this.OBLIQ:l=1+this.sinb1*o+this.cosb1*h*i;break;case this.EQUIT:l=1+h*i;break;case this.N_POLE:l=J+d,a=this.qp-a;break;case this.S_POLE:l=d-J,a=this.qp+a;break}if(Math.abs(l)<st)return null;switch(this.mode){case this.OBLIQ:case this.EQUIT:l=Math.sqrt(2/l),this.mode===this.OBLIQ?e=this.ymf*l*(this.cosb1*o-this.sinb1*h*i):e=(l=Math.sqrt(2/(1+h*i)))*o*this.ymf,t=this.xmf*l*h*s;break;case this.N_POLE:case this.S_POLE:a>=0?(t=(l=Math.sqrt(a))*s,e=i*(this.mode===this.S_POLE?l:-l)):t=e=0;break}}return n.x=this.a*t+this.x0,n.y=this.a*e+this.y0,n}function N1(n){n.x-=this.x0,n.y-=this.y0;var t=n.x/this.a,e=n.y/this.a,i,s,r,a,o,h,l;if(this.sphere){var c=0,u,d=0;if(u=Math.sqrt(t*t+e*e),s=u*.5,s>1)return null;switch(s=2*Math.asin(s),(this.mode===this.OBLIQ||this.mode===this.EQUIT)&&(d=Math.sin(s),c=Math.cos(s)),this.mode){case this.EQUIT:s=Math.abs(u)<=st?0:Math.asin(e*d/u),t*=d,e=c*u;break;case this.OBLIQ:s=Math.abs(u)<=st?this.lat0:Math.asin(c*this.sinph0+e*d*this.cosph0/u),t*=d*this.cosph0,e=(c-Math.sin(s)*this.sinph0)*u;break;case this.N_POLE:e=-e,s=J-s;break;case this.S_POLE:s-=J;break}i=e===0&&(this.mode===this.EQUIT||this.mode===this.OBLIQ)?0:Math.atan2(t,e)}else{if(l=0,this.mode===this.OBLIQ||this.mode===this.EQUIT){if(t/=this.dd,e*=this.dd,h=Math.sqrt(t*t+e*e),h<st)return n.x=this.long0,n.y=this.lat0,n;a=2*Math.asin(.5*h/this.rq),r=Math.cos(a),t*=a=Math.sin(a),this.mode===this.OBLIQ?(l=r*this.sinb1+e*a*this.cosb1/h,o=this.qp*l,e=h*this.cosb1*r-e*this.sinb1*a):(l=e*a/h,o=this.qp*l,e=h*r)}else if(this.mode===this.N_POLE||this.mode===this.S_POLE){if(this.mode===this.N_POLE&&(e=-e),o=t*t+e*e,!o)return n.x=this.long0,n.y=this.lat0,n;l=1-o/this.qp,this.mode===this.S_POLE&&(l=-l)}i=Math.atan2(t,e),s=bu(Math.asin(l),this.apa)}return n.x=ht(this.long0+i,this.over),n.y=s,n}var D1=["Lambert Azimuthal Equal Area","Lambert_Azimuthal_Equal_Area","laea"];const U1={init:L1,forward:I1,inverse:N1,names:D1,S_POLE:jo,N_POLE:Ko,EQUIT:Zo,OBLIQ:Wr};function jn(n){return Math.abs(n)>1&&(n=n>1?1:-1),Math.asin(n)}function O1(){Math.abs(this.lat1+this.lat2)<st||(this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e3=Math.sqrt(this.es),this.sin_po=Math.sin(this.lat1),this.cos_po=Math.cos(this.lat1),this.t1=this.sin_po,this.con=this.sin_po,this.ms1=Mn(this.e3,this.sin_po,this.cos_po),this.qs1=vn(this.e3,this.sin_po),this.sin_po=Math.sin(this.lat2),this.cos_po=Math.cos(this.lat2),this.t2=this.sin_po,this.ms2=Mn(this.e3,this.sin_po,this.cos_po),this.qs2=vn(this.e3,this.sin_po),this.sin_po=Math.sin(this.lat0),this.cos_po=Math.cos(this.lat0),this.t3=this.sin_po,this.qs0=vn(this.e3,this.sin_po),Math.abs(this.lat1-this.lat2)>st?this.ns0=(this.ms1*this.ms1-this.ms2*this.ms2)/(this.qs2-this.qs1):this.ns0=this.con,this.c=this.ms1*this.ms1+this.ns0*this.qs1,this.rh=this.a*Math.sqrt(this.c-this.ns0*this.qs0)/this.ns0)}function F1(n){var t=n.x,e=n.y;this.sin_phi=Math.sin(e),this.cos_phi=Math.cos(e);var i=vn(this.e3,this.sin_phi),s=this.a*Math.sqrt(this.c-this.ns0*i)/this.ns0,r=this.ns0*ht(t-this.long0,this.over),a=s*Math.sin(r)+this.x0,o=this.rh-s*Math.cos(r)+this.y0;return n.x=a,n.y=o,n}function G1(n){var t,e,i,s,r,a;return n.x-=this.x0,n.y=this.rh-n.y+this.y0,this.ns0>=0?(t=Math.sqrt(n.x*n.x+n.y*n.y),i=1):(t=-Math.sqrt(n.x*n.x+n.y*n.y),i=-1),s=0,t!==0&&(s=Math.atan2(i*n.x,i*n.y)),i=t*this.ns0/this.a,this.sphere?a=Math.asin((this.c-i*i)/(2*this.ns0)):(e=(this.c-i*i)/this.ns0,a=this.phi1z(this.e3,e)),r=ht(s/this.ns0+this.long0,this.over),n.x=r,n.y=a,n}function B1(n,t){var e,i,s,r,a,o=jn(.5*t);if(n<st)return o;for(var h=n*n,l=1;l<=25;l++)if(e=Math.sin(o),i=Math.cos(o),s=n*e,r=1-s*s,a=.5*r*r/i*(t/(1-h)-e/r+.5/n*Math.log((1-s)/(1+s))),o=o+a,Math.abs(a)<=1e-7)return o;return null}var z1=["Albers_Conic_Equal_Area","Albers_Equal_Area","Albers","aea"];const k1={init:O1,forward:F1,inverse:G1,names:z1,phi1z:B1};function H1(){this.sin_p14=Math.sin(this.lat0),this.cos_p14=Math.cos(this.lat0),this.infinity_dist=1e3*this.a,this.rc=1}function V1(n){var t,e,i,s,r,a,o,h,l=n.x,c=n.y;return i=ht(l-this.long0,this.over),t=Math.sin(c),e=Math.cos(c),s=Math.cos(i),a=this.sin_p14*t+this.cos_p14*e*s,r=1,a>0||Math.abs(a)<=st?(o=this.x0+this.a*r*e*Math.sin(i)/a,h=this.y0+this.a*r*(this.cos_p14*t-this.sin_p14*e*s)/a):(o=this.x0+this.infinity_dist*e*Math.sin(i),h=this.y0+this.infinity_dist*(this.cos_p14*t-this.sin_p14*e*s)),n.x=o,n.y=h,n}function W1(n){var t,e,i,s,r,a;return n.x=(n.x-this.x0)/this.a,n.y=(n.y-this.y0)/this.a,n.x/=this.k0,n.y/=this.k0,(t=Math.sqrt(n.x*n.x+n.y*n.y))?(s=Math.atan2(t,this.rc),e=Math.sin(s),i=Math.cos(s),a=jn(i*this.sin_p14+n.y*e*this.cos_p14/t),r=Math.atan2(n.x*e,t*this.cos_p14*i-n.y*this.sin_p14*e),r=ht(this.long0+r,this.over)):(a=this.phic0,r=0),n.x=r,n.y=a,n}var X1=["gnom"];const q1={init:H1,forward:V1,inverse:W1,names:X1};function Y1(n,t){var e=1-(1-n*n)/(2*n)*Math.log((1-n)/(1+n));if(Math.abs(Math.abs(t)-e)<1e-6)return t<0?-1*J:J;for(var i=Math.asin(.5*t),s,r,a,o,h=0;h<30;h++)if(r=Math.sin(i),a=Math.cos(i),o=n*r,s=Math.pow(1-o*o,2)/(2*a)*(t/(1-n*n)-r/(1-o*o)+.5/n*Math.log((1-o)/(1+o))),i+=s,Math.abs(s)<=1e-10)return i;return NaN}function $1(){this.sphere||(this.k0=Mn(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts)))}function j1(n){var t=n.x,e=n.y,i,s,r=ht(t-this.long0,this.over);if(this.sphere)i=this.x0+this.a*r*Math.cos(this.lat_ts),s=this.y0+this.a*Math.sin(e)/Math.cos(this.lat_ts);else{var a=vn(this.e,Math.sin(e));i=this.x0+this.a*this.k0*r,s=this.y0+this.a*a*.5/this.k0}return n.x=i,n.y=s,n}function K1(n){n.x-=this.x0,n.y-=this.y0;var t,e;return this.sphere?(t=ht(this.long0+n.x/this.a/Math.cos(this.lat_ts),this.over),e=Math.asin(n.y/this.a*Math.cos(this.lat_ts))):(e=Y1(this.e,2*n.y*this.k0/this.a),t=ht(this.long0+n.x/(this.a*this.k0),this.over)),n.x=t,n.y=e,n}var Z1=["cea"];const J1={init:$1,forward:j1,inverse:K1,names:Z1};function Q1(){this.x0=this.x0||0,this.y0=this.y0||0,this.lat0=this.lat0||0,this.long0=this.long0||0,this.lat_ts=this.lat_ts||0,this.title=this.title||"Equidistant Cylindrical (Plate Carre)",this.rc=Math.cos(this.lat_ts)}function tx(n){var t=n.x,e=n.y,i=ht(t-this.long0,this.over),s=Zn(e-this.lat0);return n.x=this.x0+this.a*i*this.rc,n.y=this.y0+this.a*s,n}function ex(n){var t=n.x,e=n.y;return n.x=ht(this.long0+(t-this.x0)/(this.a*this.rc),this.over),n.y=Zn(this.lat0+(e-this.y0)/this.a),n}var nx=["Equirectangular","Equidistant_Cylindrical","Equidistant_Cylindrical_Spherical","eqc"];const ix={init:Q1,forward:tx,inverse:ex,names:nx};var dc=20;function sx(){this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=Ks(this.es),this.e1=Zs(this.es),this.e2=Js(this.es),this.e3=Qs(this.es),this.ml0=this.a*Ne(this.e0,this.e1,this.e2,this.e3,this.lat0)}function rx(n){var t=n.x,e=n.y,i,s,r,a=ht(t-this.long0,this.over);if(r=a*Math.sin(e),this.sphere)Math.abs(e)<=st?(i=this.a*a,s=-1*this.a*this.lat0):(i=this.a*Math.sin(r)/Math.tan(e),s=this.a*(Zn(e-this.lat0)+(1-Math.cos(r))/Math.tan(e)));else if(Math.abs(e)<=st)i=this.a*a,s=-1*this.ml0;else{var o=Ah(this.a,this.e,Math.sin(e))/Math.tan(e);i=o*Math.sin(r),s=this.a*Ne(this.e0,this.e1,this.e2,this.e3,e)-this.ml0+o*(1-Math.cos(r))}return n.x=i+this.x0,n.y=s+this.y0,n}function ax(n){var t,e,i,s,r,a,o,h,l;if(i=n.x-this.x0,s=n.y-this.y0,this.sphere)if(Math.abs(s+this.a*this.lat0)<=st)t=ht(i/this.a+this.long0,this.over),e=0;else{a=this.lat0+s/this.a,o=i*i/this.a/this.a+a*a,h=a;var c;for(r=dc;r;--r)if(c=Math.tan(h),l=-1*(a*(h*c+1)-h-.5*(h*h+o)*c)/((h-a)/c-1),h+=l,Math.abs(l)<=st){e=h;break}t=ht(this.long0+Math.asin(i*Math.tan(h)/this.a)/Math.sin(e),this.over)}else if(Math.abs(s+this.ml0)<=st)e=0,t=ht(this.long0+i/this.a,this.over);else{a=(this.ml0+s)/this.a,o=i*i/this.a/this.a+a*a,h=a;var u,d,f,_,g;for(r=dc;r;--r)if(g=this.e*Math.sin(h),u=Math.sqrt(1-g*g)*Math.tan(h),d=this.a*Ne(this.e0,this.e1,this.e2,this.e3,h),f=this.e0-2*this.e1*Math.cos(2*h)+4*this.e2*Math.cos(4*h)-6*this.e3*Math.cos(6*h),_=d/this.a,l=(a*(u*_+1)-_-.5*u*(_*_+o))/(this.es*Math.sin(2*h)*(_*_+o-2*a*_)/(4*u)+(a-_)*(u*f-2/Math.sin(2*h))-f),h-=l,Math.abs(l)<=st){e=h;break}u=Math.sqrt(1-this.es*Math.pow(Math.sin(e),2))*Math.tan(e),t=ht(this.long0+Math.asin(i*u/this.a)/Math.sin(e),this.over)}return n.x=t,n.y=e,n}var ox=["Polyconic","American_Polyconic","poly"];const hx={init:sx,forward:rx,inverse:ax,names:ox};function lx(){this.A=[],this.A[1]=.6399175073,this.A[2]=-.1358797613,this.A[3]=.063294409,this.A[4]=-.02526853,this.A[5]=.0117879,this.A[6]=-.0055161,this.A[7]=.0026906,this.A[8]=-.001333,this.A[9]=67e-5,this.A[10]=-34e-5,this.B_re=[],this.B_im=[],this.B_re[1]=.7557853228,this.B_im[1]=0,this.B_re[2]=.249204646,this.B_im[2]=.003371507,this.B_re[3]=-.001541739,this.B_im[3]=.04105856,this.B_re[4]=-.10162907,this.B_im[4]=.01727609,this.B_re[5]=-.26623489,this.B_im[5]=-.36249218,this.B_re[6]=-.6870983,this.B_im[6]=-1.1651967,this.C_re=[],this.C_im=[],this.C_re[1]=1.3231270439,this.C_im[1]=0,this.C_re[2]=-.577245789,this.C_im[2]=-.007809598,this.C_re[3]=.508307513,this.C_im[3]=-.112208952,this.C_re[4]=-.15094762,this.C_im[4]=.18200602,this.C_re[5]=1.01418179,this.C_im[5]=1.64497696,this.C_re[6]=1.9660549,this.C_im[6]=2.5127645,this.D=[],this.D[1]=1.5627014243,this.D[2]=.5185406398,this.D[3]=-.03333098,this.D[4]=-.1052906,this.D[5]=-.0368594,this.D[6]=.007317,this.D[7]=.0122,this.D[8]=.00394,this.D[9]=-.0013}function cx(n){var t,e=n.x,i=n.y,s=i-this.lat0,r=e-this.long0,a=s/Cs*1e-5,o=r,h=1,l=0;for(t=1;t<=10;t++)h=h*a,l=l+this.A[t]*h;var c=l,u=o,d=1,f=0,_,g,p=0,m=0;for(t=1;t<=6;t++)_=d*c-f*u,g=f*c+d*u,d=_,f=g,p=p+this.B_re[t]*d-this.B_im[t]*f,m=m+this.B_im[t]*d+this.B_re[t]*f;return n.x=m*this.a+this.x0,n.y=p*this.a+this.y0,n}function ux(n){var t,e=n.x,i=n.y,s=e-this.x0,r=i-this.y0,a=r/this.a,o=s/this.a,h=1,l=0,c,u,d=0,f=0;for(t=1;t<=6;t++)c=h*a-l*o,u=l*a+h*o,h=c,l=u,d=d+this.C_re[t]*h-this.C_im[t]*l,f=f+this.C_im[t]*h+this.C_re[t]*l;for(var _=0;_<this.iterations;_++){var g=d,p=f,m,x,v=a,y=o;for(t=2;t<=6;t++)m=g*d-p*f,x=p*d+g*f,g=m,p=x,v=v+(t-1)*(this.B_re[t]*g-this.B_im[t]*p),y=y+(t-1)*(this.B_im[t]*g+this.B_re[t]*p);g=1,p=0;var L=this.B_re[1],T=this.B_im[1];for(t=2;t<=6;t++)m=g*d-p*f,x=p*d+g*f,g=m,p=x,L=L+t*(this.B_re[t]*g-this.B_im[t]*p),T=T+t*(this.B_im[t]*g+this.B_re[t]*p);var b=L*L+T*T;d=(v*L+y*T)/b,f=(y*L-v*T)/b}var C=d,w=f,S=1,P=0;for(t=1;t<=9;t++)S=S*C,P=P+this.D[t]*S;var k=this.lat0+P*Cs*1e5,B=this.long0+w;return n.x=B,n.y=k,n}var fx=["New_Zealand_Map_Grid","nzmg"];const dx={init:lx,forward:cx,inverse:ux,names:fx};function px(){}function mx(n){var t=n.x,e=n.y,i=ht(t-this.long0,this.over),s=this.x0+this.a*i,r=this.y0+this.a*Math.log(Math.tan(Math.PI/4+e/2.5))*1.25;return n.x=s,n.y=r,n}function _x(n){n.x-=this.x0,n.y-=this.y0;var t=ht(this.long0+n.x/this.a,this.over),e=2.5*(Math.atan(Math.exp(.8*n.y/this.a))-Math.PI/4);return n.x=t,n.y=e,n}var gx=["Miller_Cylindrical","mill"];const vx={init:px,forward:mx,inverse:_x,names:gx};var Mx=20;function xx(){this.long0=this.long0||0,this.sphere?(this.n=1,this.m=0,this.es=0,this.C_y=Math.sqrt((this.m+1)/this.n),this.C_x=this.C_y/(this.m+1)):this.en=yh(this.es)}function Tu(n){var t,e,i=n.x,s=n.y;if(i=ht(i-this.long0,this.over),this.sphere){if(!this.m)s=this.n!==1?Math.asin(this.n*Math.sin(s)):s;else for(var r=this.n*Math.sin(s),a=Mx;a;--a){var o=(this.m*s+Math.sin(s)-r)/(this.m+Math.cos(s));if(s-=o,Math.abs(o)<st)break}t=this.a*this.C_x*i*(this.m+Math.cos(s)),e=this.a*this.C_y*s}else{var h=Math.sin(s),l=Math.cos(s);e=this.a*us(s,h,l,this.en),t=this.a*i*l/Math.sqrt(1-this.es*h*h)}return n.x=t,n.y=e,n}function Au(n){var t,e,i,s;return n.x-=this.x0,i=n.x/this.a,n.y-=this.y0,t=n.y/this.a,this.sphere?(t/=this.C_y,i=i/(this.C_x*(this.m+Math.cos(t))),this.m?t=jn((this.m*t+Math.sin(t))/this.n):this.n!==1&&(t=jn(Math.sin(t)/this.n)),i=ht(i+this.long0,this.over),t=Zn(t)):(t=Sh(n.y/this.a,this.es,this.en),s=Math.abs(t),s<J?(s=Math.sin(t),e=this.long0+n.x*Math.sqrt(1-this.es*s*s)/(this.a*Math.cos(t)),i=ht(e,this.over)):s-st<J&&(i=this.long0)),n.x=i,n.y=t,n}var yx=["Sinusoidal","sinu"];const Sx={init:xx,forward:Tu,inverse:Au,names:yx};function Ex(){this.sphere=!0,this.b=this.a,this.m=1,this.n=2.5707963267948966,this.es=0,this.C_y=Math.sqrt((this.m+1)/this.n),this.C_x=this.C_y/(this.m+1)}var wx=Tu,bx=Au,Tx=["Eckert_VI","eck6"];const Ax={init:Ex,forward:wx,inverse:bx,names:Tx};function Px(){this.x0=this.x0!==void 0?this.x0:0,this.y0=this.y0!==void 0?this.y0:0,this.long0=this.long0!==void 0?this.long0:0}function Rx(n){for(var t=n.x,e=n.y,i=ht(t-this.long0,this.over),s=e,r=Math.PI*Math.sin(e);;){var a=-(s+Math.sin(s)-r)/(1+Math.cos(s));if(s+=a,Math.abs(a)<st)break}s/=2,Math.PI/2-Math.abs(e)<st&&(i=0);var o=.900316316158*this.a*i*Math.cos(s)+this.x0,h=1.4142135623731*this.a*Math.sin(s)+this.y0;return n.x=o,n.y=h,n}function Cx(n){var t,e;n.x-=this.x0,n.y-=this.y0,e=n.y/(1.4142135623731*this.a),Math.abs(e)>.999999999999&&(e=.999999999999),t=Math.asin(e);var i=ht(this.long0+n.x/(.900316316158*this.a*Math.cos(t)),this.over);i<-Math.PI&&(i=-Math.PI),i>Math.PI&&(i=Math.PI),e=(2*t+Math.sin(2*t))/Math.PI,Math.abs(e)>1&&(e=1);var s=Math.asin(e);return n.x=i,n.y=s,n}var Lx=["Mollweide","moll"];const Ix={init:Px,forward:Rx,inverse:Cx,names:Lx};function Nx(){Math.abs(this.lat1+this.lat2)<st||(this.lat2=this.lat2||this.lat1,this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=Ks(this.es),this.e1=Zs(this.es),this.e2=Js(this.es),this.e3=Qs(this.es),this.sin_phi=Math.sin(this.lat1),this.cos_phi=Math.cos(this.lat1),this.ms1=Mn(this.e,this.sin_phi,this.cos_phi),this.ml1=Ne(this.e0,this.e1,this.e2,this.e3,this.lat1),Math.abs(this.lat1-this.lat2)<st?this.ns=this.sin_phi:(this.sin_phi=Math.sin(this.lat2),this.cos_phi=Math.cos(this.lat2),this.ms2=Mn(this.e,this.sin_phi,this.cos_phi),this.ml2=Ne(this.e0,this.e1,this.e2,this.e3,this.lat2),this.ns=(this.ms1-this.ms2)/(this.ml2-this.ml1)),this.g=this.ml1+this.ms1/this.ns,this.ml0=Ne(this.e0,this.e1,this.e2,this.e3,this.lat0),this.rh=this.a*(this.g-this.ml0))}function Dx(n){var t=n.x,e=n.y,i;if(this.sphere)i=this.a*(this.g-e);else{var s=Ne(this.e0,this.e1,this.e2,this.e3,e);i=this.a*(this.g-s)}var r=this.ns*ht(t-this.long0,this.over),a=this.x0+i*Math.sin(r),o=this.y0+this.rh-i*Math.cos(r);return n.x=a,n.y=o,n}function Ux(n){n.x-=this.x0,n.y=this.rh-n.y+this.y0;var t,e,i,s;this.ns>=0?(e=Math.sqrt(n.x*n.x+n.y*n.y),t=1):(e=-Math.sqrt(n.x*n.x+n.y*n.y),t=-1);var r=0;if(e!==0&&(r=Math.atan2(t*n.x,t*n.y)),this.sphere)return s=ht(this.long0+r/this.ns,this.over),i=Zn(this.g-e/this.a),n.x=s,n.y=i,n;var a=this.g-e/this.a;return i=ia(a,this.e0,this.e1,this.e2,this.e3),s=ht(this.long0+r/this.ns,this.over),n.x=s,n.y=i,n}var Ox=["Equidistant_Conic","eqdc"];const Fx={init:Nx,forward:Dx,inverse:Ux,names:Ox};function Gx(){this.R=this.a}function Bx(n){var t=n.x,e=n.y,i=ht(t-this.long0,this.over),s,r;Math.abs(e)<=st&&(s=this.x0+this.R*i,r=this.y0);var a=jn(2*Math.abs(e/Math.PI));(Math.abs(i)<=st||Math.abs(Math.abs(e)-J)<=st)&&(s=this.x0,e>=0?r=this.y0+Math.PI*this.R*Math.tan(.5*a):r=this.y0+Math.PI*this.R*-Math.tan(.5*a));var o=.5*Math.abs(Math.PI/i-i/Math.PI),h=o*o,l=Math.sin(a),c=Math.cos(a),u=c/(l+c-1),d=u*u,f=u*(2/l-1),_=f*f,g=Math.PI*this.R*(o*(u-_)+Math.sqrt(h*(u-_)*(u-_)-(_+h)*(d-_)))/(_+h);i<0&&(g=-g),s=this.x0+g;var p=h+u;return g=Math.PI*this.R*(f*p-o*Math.sqrt((_+h)*(h+1)-p*p))/(_+h),e>=0?r=this.y0+g:r=this.y0-g,n.x=s,n.y=r,n}function zx(n){var t,e,i,s,r,a,o,h,l,c,u,d,f;return n.x-=this.x0,n.y-=this.y0,u=Math.PI*this.R,i=n.x/u,s=n.y/u,r=i*i+s*s,a=-Math.abs(s)*(1+r),o=a-2*s*s+i*i,h=-2*a+1+2*s*s+r*r,f=s*s/h+(2*o*o*o/h/h/h-9*a*o/h/h)/27,l=(a-o*o/3/h)/h,c=2*Math.sqrt(-l/3),u=3*f/l/c,Math.abs(u)>1&&(u>=0?u=1:u=-1),d=Math.acos(u)/3,n.y>=0?e=(-c*Math.cos(d+Math.PI/3)-o/3/h)*Math.PI:e=-(-c*Math.cos(d+Math.PI/3)-o/3/h)*Math.PI,Math.abs(i)<st?t=this.long0:t=ht(this.long0+Math.PI*(r-1+Math.sqrt(1+2*(i*i-s*s)+r*r))/2/i,this.over),n.x=t,n.y=e,n}var kx=["Van_der_Grinten_I","VanDerGrinten","Van_der_Grinten","vandg"];const Hx={init:Gx,forward:Bx,inverse:zx,names:kx};function Vx(n,t,e,i,s,r){const a=i-t,o=Math.atan((1-r)*Math.tan(n)),h=Math.atan((1-r)*Math.tan(e)),l=Math.sin(o),c=Math.cos(o),u=Math.sin(h),d=Math.cos(h);let f=a,_,g=100,p,m,x,v,y,L,T,b,C,w,S,P,k,B;do{if(p=Math.sin(f),m=Math.cos(f),x=Math.sqrt(d*p*(d*p)+(c*u-l*d*m)*(c*u-l*d*m)),x===0)return{azi1:0,s12:0};v=l*u+c*d*m,y=Math.atan2(x,v),L=c*d*p/x,T=1-L*L,b=T!==0?v-2*l*u/T:0,C=r/16*T*(4+r*(4-3*T)),_=f,f=a+(1-C)*r*L*(y+C*x*(b+C*v*(-1+2*b*b)))}while(Math.abs(f-_)>1e-12&&--g>0);return g===0?{azi1:NaN,s12:NaN}:(w=T*(s*s-s*(1-r)*(s*(1-r)))/(s*(1-r)*(s*(1-r))),S=1+w/16384*(4096+w*(-768+w*(320-175*w))),P=w/1024*(256+w*(-128+w*(74-47*w))),k=P*x*(b+P/4*(v*(-1+2*b*b)-P/6*b*(-3+4*x*x)*(-3+4*b*b))),B=s*(1-r)*S*(y-k),{azi1:Math.atan2(d*p,c*u-l*d*m),s12:B})}function Wx(n,t,e,i,s,r){const a=Math.atan((1-r)*Math.tan(n)),o=Math.sin(a),h=Math.cos(a),l=Math.sin(e),c=Math.cos(e),u=Math.atan2(o,h*c),d=h*l,f=1-d*d,_=f*(s*s-s*(1-r)*(s*(1-r)))/(s*(1-r)*(s*(1-r))),g=1+_/16384*(4096+_*(-768+_*(320-175*_))),p=_/1024*(256+_*(-128+_*(74-47*_)));let m=i/(s*(1-r)*g),x,v=100,y,L,T,b;do y=Math.cos(2*u+m),L=Math.sin(m),T=Math.cos(m),b=p*L*(y+p/4*(T*(-1+2*y*y)-p/6*y*(-3+4*L*L)*(-3+4*y*y))),x=m,m=i/(s*(1-r)*g)+b;while(Math.abs(m-x)>1e-12&&--v>0);if(v===0)return{lat2:NaN,lon2:NaN};const C=o*L-h*T*c,w=Math.atan2(o*T+h*L*c,(1-r)*Math.sqrt(d*d+C*C)),S=Math.atan2(L*l,h*T-o*L*c),P=r/16*f*(4+r*(4-3*f)),k=S-(1-P)*r*d*(m+P*L*(y+P*T*(-1+2*y*y))),B=t+k;return{lat2:w,lon2:B}}function Xx(){this.sin_p12=Math.sin(this.lat0),this.cos_p12=Math.cos(this.lat0),this.f=this.es/(1+Math.sqrt(1-this.es))}function qx(n){var t=n.x,e=n.y,i=Math.sin(n.y),s=Math.cos(n.y),r=ht(t-this.long0,this.over),a,o,h,l,c,u,d,f,_,g,p;return this.sphere?Math.abs(this.sin_p12-1)<=st?(n.x=this.x0+this.a*(J-e)*Math.sin(r),n.y=this.y0-this.a*(J-e)*Math.cos(r),n):Math.abs(this.sin_p12+1)<=st?(n.x=this.x0+this.a*(J+e)*Math.sin(r),n.y=this.y0+this.a*(J+e)*Math.cos(r),n):(_=this.sin_p12*i+this.cos_p12*s*Math.cos(r),d=Math.acos(_),f=d?d/Math.sin(d):1,n.x=this.x0+this.a*f*s*Math.sin(r),n.y=this.y0+this.a*f*(this.cos_p12*i-this.sin_p12*s*Math.cos(r)),n):(a=Ks(this.es),o=Zs(this.es),h=Js(this.es),l=Qs(this.es),Math.abs(this.sin_p12-1)<=st?(c=this.a*Ne(a,o,h,l,J),u=this.a*Ne(a,o,h,l,e),n.x=this.x0+(c-u)*Math.sin(r),n.y=this.y0-(c-u)*Math.cos(r),n):Math.abs(this.sin_p12+1)<=st?(c=this.a*Ne(a,o,h,l,J),u=this.a*Ne(a,o,h,l,e),n.x=this.x0+(c+u)*Math.sin(r),n.y=this.y0+(c+u)*Math.cos(r),n):Math.abs(t)<st&&Math.abs(e-this.lat0)<st?(n.x=n.y=0,n):(g=Vx(this.lat0,this.long0,e,t,this.a,this.f),p=g.azi1,n.x=g.s12*Math.sin(p),n.y=g.s12*Math.cos(p),n))}function Yx(n){n.x-=this.x0,n.y-=this.y0;var t,e,i,s,r,a,o,h,l,c,u,d,f,_,g,p;return this.sphere?(t=Math.sqrt(n.x*n.x+n.y*n.y),t>2*J*this.a?void 0:(e=t/this.a,i=Math.sin(e),s=Math.cos(e),r=this.long0,Math.abs(t)<=st?a=this.lat0:(a=jn(s*this.sin_p12+n.y*i*this.cos_p12/t),o=Math.abs(this.lat0)-J,Math.abs(o)<=st?this.lat0>=0?r=ht(this.long0+Math.atan2(n.x,-n.y),this.over):r=ht(this.long0-Math.atan2(-n.x,n.y),this.over):r=ht(this.long0+Math.atan2(n.x*i,t*this.cos_p12*s-n.y*this.sin_p12*i),this.over)),n.x=r,n.y=a,n)):(h=Ks(this.es),l=Zs(this.es),c=Js(this.es),u=Qs(this.es),Math.abs(this.sin_p12-1)<=st?(d=this.a*Ne(h,l,c,u,J),t=Math.sqrt(n.x*n.x+n.y*n.y),f=d-t,a=ia(f/this.a,h,l,c,u),r=ht(this.long0+Math.atan2(n.x,-1*n.y),this.over),n.x=r,n.y=a,n):Math.abs(this.sin_p12+1)<=st?(d=this.a*Ne(h,l,c,u,J),t=Math.sqrt(n.x*n.x+n.y*n.y),f=t-d,a=ia(f/this.a,h,l,c,u),r=ht(this.long0+Math.atan2(n.x,n.y),this.over),n.x=r,n.y=a,n):(_=Math.atan2(n.x,n.y),g=Math.sqrt(n.x*n.x+n.y*n.y),p=Wx(this.lat0,this.long0,_,g,this.a,this.f),n.x=p.lon2,n.y=p.lat2,n))}var $x=["Azimuthal_Equidistant","aeqd"];const jx={init:Xx,forward:qx,inverse:Yx,names:$x};function Kx(){this.sin_p14=Math.sin(this.lat0||0),this.cos_p14=Math.cos(this.lat0||0)}function Zx(n){var t,e,i,s,r,a,o,h,l=n.x,c=n.y;return i=ht(l-(this.long0||0),this.over),t=Math.sin(c),e=Math.cos(c),s=Math.cos(i),a=this.sin_p14*t+this.cos_p14*e*s,r=1,(a>0||Math.abs(a)<=st)&&(o=this.a*r*e*Math.sin(i),h=(this.y0||0)+this.a*r*(this.cos_p14*t-this.sin_p14*e*s)),n.x=o,n.y=h,n}function Jx(n){var t,e,i,s,r,a,o,h,l;return n.x-=this.x0||0,n.y-=this.y0||0,t=Math.sqrt(n.x*n.x+n.y*n.y),e=jn(t/this.a),i=Math.sin(e),s=Math.cos(e),h=this.long0||0,l=this.lat0||0,a=h,Math.abs(t)<=st?(o=l,n.x=a,n.y=o,n):(o=jn(s*this.sin_p14+n.y*i*this.cos_p14/t),r=Math.abs(l)-J,Math.abs(r)<=st?(l>=0?a=ht(h+Math.atan2(n.x,-n.y),this.over):a=ht(h-Math.atan2(-n.x,n.y),this.over),n.x=a,n.y=o,n):(a=ht(h+Math.atan2(n.x*i,t*this.cos_p14*s-n.y*this.sin_p14*i),this.over),n.x=a,n.y=o,n))}var Qx=["ortho"];const ty={init:Kx,forward:Zx,inverse:Jx,names:Qx};var ie={FRONT:1,RIGHT:2,BACK:3,LEFT:4,TOP:5,BOTTOM:6},jt={AREA_0:1,AREA_1:2,AREA_2:3,AREA_3:4};function ey(){this.x0=this.x0||0,this.y0=this.y0||0,this.lat0=this.lat0||0,this.long0=this.long0||0,this.lat_ts=this.lat_ts||0,this.title=this.title||"Quadrilateralized Spherical Cube",this.lat0>=J-$t/2?this.face=ie.TOP:this.lat0<=-(J-$t/2)?this.face=ie.BOTTOM:Math.abs(this.long0)<=$t?this.face=ie.FRONT:Math.abs(this.long0)<=J+$t?this.face=this.long0>0?ie.RIGHT:ie.LEFT:this.face=ie.BACK,this.es!==0&&(this.one_minus_f=1-(this.a-this.b)/this.a,this.one_minus_f_squared=this.one_minus_f*this.one_minus_f)}function ny(n){var t={x:0,y:0},e,i,s,r,a,o,h={value:0};if(n.x-=this.long0,this.es!==0?e=Math.atan(this.one_minus_f_squared*Math.tan(n.y)):e=n.y,i=n.x,this.face===ie.TOP)r=J-e,i>=$t&&i<=J+$t?(h.value=jt.AREA_0,s=i-J):i>J+$t||i<=-(J+$t)?(h.value=jt.AREA_1,s=i>0?i-le:i+le):i>-(J+$t)&&i<=-$t?(h.value=jt.AREA_2,s=i+J):(h.value=jt.AREA_3,s=i);else if(this.face===ie.BOTTOM)r=J+e,i>=$t&&i<=J+$t?(h.value=jt.AREA_0,s=-i+J):i<$t&&i>=-$t?(h.value=jt.AREA_1,s=-i):i<-$t&&i>=-(J+$t)?(h.value=jt.AREA_2,s=-i-J):(h.value=jt.AREA_3,s=i>0?-i+le:-i-le);else{var l,c,u,d,f,_,g;this.face===ie.RIGHT?i=ts(i,+J):this.face===ie.BACK?i=ts(i,+le):this.face===ie.LEFT&&(i=ts(i,-J)),d=Math.sin(e),f=Math.cos(e),_=Math.sin(i),g=Math.cos(i),l=f*g,c=f*_,u=d,this.face===ie.FRONT?(r=Math.acos(l),s=Nr(r,u,c,h)):this.face===ie.RIGHT?(r=Math.acos(c),s=Nr(r,u,-l,h)):this.face===ie.BACK?(r=Math.acos(-l),s=Nr(r,u,-c,h)):this.face===ie.LEFT?(r=Math.acos(-c),s=Nr(r,u,l,h)):(r=s=0,h.value=jt.AREA_0)}return o=Math.atan(12/le*(s+Math.acos(Math.sin(s)*Math.cos($t))-J)),a=Math.sqrt((1-Math.cos(r))/(Math.cos(o)*Math.cos(o))/(1-Math.cos(Math.atan(1/Math.cos(s))))),h.value===jt.AREA_1?o+=J:h.value===jt.AREA_2?o+=le:h.value===jt.AREA_3&&(o+=1.5*le),t.x=a*Math.cos(o),t.y=a*Math.sin(o),t.x=t.x*this.a+this.x0,t.y=t.y*this.a+this.y0,n.x=t.x,n.y=t.y,n}function iy(n){var t={lam:0,phi:0},e,i,s,r,a,o,h,l,c,u={value:0};if(n.x=(n.x-this.x0)/this.a,n.y=(n.y-this.y0)/this.a,i=Math.atan(Math.sqrt(n.x*n.x+n.y*n.y)),e=Math.atan2(n.y,n.x),n.x>=0&&n.x>=Math.abs(n.y)?u.value=jt.AREA_0:n.y>=0&&n.y>=Math.abs(n.x)?(u.value=jt.AREA_1,e-=J):n.x<0&&-n.x>=Math.abs(n.y)?(u.value=jt.AREA_2,e=e<0?e+le:e-le):(u.value=jt.AREA_3,e+=J),c=le/12*Math.tan(e),a=Math.sin(c)/(Math.cos(c)-1/Math.sqrt(2)),o=Math.atan(a),s=Math.cos(e),r=Math.tan(i),h=1-s*s*r*r*(1-Math.cos(Math.atan(1/Math.cos(o)))),h<-1?h=-1:h>1&&(h=1),this.face===ie.TOP)l=Math.acos(h),t.phi=J-l,u.value===jt.AREA_0?t.lam=o+J:u.value===jt.AREA_1?t.lam=o<0?o+le:o-le:u.value===jt.AREA_2?t.lam=o-J:t.lam=o;else if(this.face===ie.BOTTOM)l=Math.acos(h),t.phi=l-J,u.value===jt.AREA_0?t.lam=-o+J:u.value===jt.AREA_1?t.lam=-o:u.value===jt.AREA_2?t.lam=-o-J:t.lam=o<0?-o-le:-o+le;else{var d,f,_;d=h,c=d*d,c>=1?_=0:_=Math.sqrt(1-c)*Math.sin(o),c+=_*_,c>=1?f=0:f=Math.sqrt(1-c),u.value===jt.AREA_1?(c=f,f=-_,_=c):u.value===jt.AREA_2?(f=-f,_=-_):u.value===jt.AREA_3&&(c=f,f=_,_=-c),this.face===ie.RIGHT?(c=d,d=-f,f=c):this.face===ie.BACK?(d=-d,f=-f):this.face===ie.LEFT&&(c=d,d=f,f=-c),t.phi=Math.acos(-_)-J,t.lam=Math.atan2(f,d),this.face===ie.RIGHT?t.lam=ts(t.lam,-J):this.face===ie.BACK?t.lam=ts(t.lam,-le):this.face===ie.LEFT&&(t.lam=ts(t.lam,+J))}if(this.es!==0){var g,p,m;g=t.phi<0?1:0,p=Math.tan(t.phi),m=this.b/Math.sqrt(p*p+this.one_minus_f_squared),t.phi=Math.atan(Math.sqrt(this.a*this.a-m*m)/(this.one_minus_f*m)),g&&(t.phi=-t.phi)}return t.lam+=this.long0,n.x=t.lam,n.y=t.phi,n}function Nr(n,t,e,i){var s;return n<st?(i.value=jt.AREA_0,s=0):(s=Math.atan2(t,e),Math.abs(s)<=$t?i.value=jt.AREA_0:s>$t&&s<=J+$t?(i.value=jt.AREA_1,s-=J):s>J+$t||s<=-(J+$t)?(i.value=jt.AREA_2,s=s>=0?s-le:s+le):(i.value=jt.AREA_3,s+=J)),s}function ts(n,t){var e=n+t;return e<-le?e+=zs:e>+le&&(e-=zs),e}var sy=["Quadrilateralized Spherical Cube","Quadrilateralized_Spherical_Cube","qsc"];const ry={init:ey,forward:ny,inverse:iy,names:sy};var Jo=[[1,22199e-21,-715515e-10,31103e-10],[.9986,-482243e-9,-24897e-9,-13309e-10],[.9954,-83103e-8,-448605e-10,-986701e-12],[.99,-.00135364,-59661e-9,36777e-10],[.9822,-.00167442,-449547e-11,-572411e-11],[.973,-.00214868,-903571e-10,18736e-12],[.96,-.00305085,-900761e-10,164917e-11],[.9427,-.00382792,-653386e-10,-26154e-10],[.9216,-.00467746,-10457e-8,481243e-11],[.8962,-.00536223,-323831e-10,-543432e-11],[.8679,-.00609363,-113898e-9,332484e-11],[.835,-.00698325,-640253e-10,934959e-12],[.7986,-.00755338,-500009e-10,935324e-12],[.7597,-.00798324,-35971e-9,-227626e-11],[.7186,-.00851367,-701149e-10,-86303e-10],[.6732,-.00986209,-199569e-9,191974e-10],[.6213,-.010418,883923e-10,624051e-11],[.5722,-.00906601,182e-6,624051e-11],[.5322,-.00677797,275608e-9,624051e-11]],Es=[[-520417e-23,.0124,121431e-23,-845284e-16],[.062,.0124,-126793e-14,422642e-15],[.124,.0124,507171e-14,-160604e-14],[.186,.0123999,-190189e-13,600152e-14],[.248,.0124002,710039e-13,-224e-10],[.31,.0123992,-264997e-12,835986e-13],[.372,.0124029,988983e-12,-311994e-12],[.434,.0123893,-369093e-11,-435621e-12],[.4958,.0123198,-102252e-10,-345523e-12],[.5571,.0121916,-154081e-10,-582288e-12],[.6176,.0119938,-241424e-10,-525327e-12],[.6769,.011713,-320223e-10,-516405e-12],[.7346,.0113541,-397684e-10,-609052e-12],[.7903,.0109107,-489042e-10,-104739e-11],[.8435,.0103431,-64615e-9,-140374e-14],[.8936,.00969686,-64636e-9,-8547e-9],[.9394,.00840947,-192841e-9,-42106e-10],[.9761,.00616527,-256e-6,-42106e-10],[1,.00328947,-319159e-9,-42106e-10]],Pu=.8487,Ru=1.3523,Cu=Be/5,ay=1/Cu,qi=18,sa=function(n,t){return n[0]+t*(n[1]+t*(n[2]+t*n[3]))},oy=function(n,t){return n[1]+t*(2*n[2]+t*3*n[3])};function hy(n,t,e,i){for(var s=t;i;--i){var r=n(s);if(s-=r,Math.abs(r)<e)break}return s}function ly(){this.x0=this.x0||0,this.y0=this.y0||0,this.long0=this.long0||0,this.es=0,this.title=this.title||"Robinson"}function cy(n){var t=ht(n.x-this.long0,this.over),e=Math.abs(n.y),i=Math.floor(e*Cu);i<0?i=0:i>=qi&&(i=qi-1),e=Be*(e-ay*i);var s={x:sa(Jo[i],e)*t,y:sa(Es[i],e)};return n.y<0&&(s.y=-s.y),s.x=s.x*this.a*Pu+this.x0,s.y=s.y*this.a*Ru+this.y0,s}function uy(n){var t={x:(n.x-this.x0)/(this.a*Pu),y:Math.abs(n.y-this.y0)/(this.a*Ru)};if(t.y>=1)t.x/=Jo[qi][0],t.y=n.y<0?-J:J;else{var e=Math.floor(t.y*qi);for(e<0?e=0:e>=qi&&(e=qi-1);;)if(Es[e][0]>t.y)--e;else if(Es[e+1][0]<=t.y)++e;else break;var i=Es[e],s=5*(t.y-i[0])/(Es[e+1][0]-i[0]);s=hy(function(r){return(sa(i,r)-t.y)/oy(i,r)},s,st,100),t.x/=sa(Jo[e],s),t.y=(5*e+s)*oe,n.y<0&&(t.y=-t.y)}return t.x=ht(t.x+this.long0,this.over),t}var fy=["Robinson","robin"];const dy={init:ly,forward:cy,inverse:uy,names:fy};function py(){this.name="geocent"}function my(n){var t=pu(n,this.es,this.a);return t}function _y(n){var t=mu(n,this.es,this.a,this.b);return t}var gy=["Geocentric","geocentric","geocent","Geocent"];const vy={init:py,forward:my,inverse:_y,names:gy};var Ae={N_POLE:0,S_POLE:1,EQUIT:2,OBLIQ:3},vs={h:{def:1e5,num:!0},azi:{def:0,num:!0,degrees:!0},tilt:{def:0,num:!0,degrees:!0},long0:{def:0,num:!0},lat0:{def:0,num:!0}};function My(){if(Object.keys(vs).forEach((function(e){if(typeof this[e]>"u")this[e]=vs[e].def;else{if(vs[e].num&&isNaN(this[e]))throw new Error("Invalid parameter value, must be numeric "+e+" = "+this[e]);vs[e].num&&(this[e]=parseFloat(this[e]))}vs[e].degrees&&(this[e]=this[e]*oe)}).bind(this)),Math.abs(Math.abs(this.lat0)-J)<st?this.mode=this.lat0<0?Ae.S_POLE:Ae.N_POLE:Math.abs(this.lat0)<st?this.mode=Ae.EQUIT:(this.mode=Ae.OBLIQ,this.sinph0=Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0)),this.pn1=this.h/this.a,this.pn1<=0||this.pn1>1e10)throw new Error("Invalid height");this.p=1+this.pn1,this.rp=1/this.p,this.h1=1/this.pn1,this.pfact=(this.p+1)*this.h1,this.es=0;var n=this.tilt,t=this.azi;this.cg=Math.cos(t),this.sg=Math.sin(t),this.cw=Math.cos(n),this.sw=Math.sin(n)}function xy(n){n.x-=this.long0;var t=Math.sin(n.y),e=Math.cos(n.y),i=Math.cos(n.x),s,r;switch(this.mode){case Ae.OBLIQ:r=this.sinph0*t+this.cosph0*e*i;break;case Ae.EQUIT:r=e*i;break;case Ae.S_POLE:r=-t;break;case Ae.N_POLE:r=t;break}switch(r=this.pn1/(this.p-r),s=r*e*Math.sin(n.x),this.mode){case Ae.OBLIQ:r*=this.cosph0*t-this.sinph0*e*i;break;case Ae.EQUIT:r*=t;break;case Ae.N_POLE:r*=-(e*i);break;case Ae.S_POLE:r*=e*i;break}var a,o;return a=r*this.cg+s*this.sg,o=1/(a*this.sw*this.h1+this.cw),s=(s*this.cg-r*this.sg)*this.cw*o,r=a*o,n.x=s*this.a,n.y=r*this.a,n}function yy(n){n.x/=this.a,n.y/=this.a;var t={x:n.x,y:n.y},e,i,s;s=1/(this.pn1-n.y*this.sw),e=this.pn1*n.x*s,i=this.pn1*n.y*this.cw*s,n.x=e*this.cg+i*this.sg,n.y=i*this.cg-e*this.sg;var r=Ge(n.x,n.y);if(Math.abs(r)<st)t.x=0,t.y=n.y;else{var a,o;switch(o=1-r*r*this.pfact,o=(this.p-Math.sqrt(o))/(this.pn1/r+r/this.pn1),a=Math.sqrt(1-o*o),this.mode){case Ae.OBLIQ:t.y=Math.asin(a*this.sinph0+n.y*o*this.cosph0/r),n.y=(a-this.sinph0*Math.sin(t.y))*r,n.x*=o*this.cosph0;break;case Ae.EQUIT:t.y=Math.asin(n.y*o/r),n.y=a*r,n.x*=o;break;case Ae.N_POLE:t.y=Math.asin(a),n.y=-n.y;break;case Ae.S_POLE:t.y=-Math.asin(a);break}t.x=Math.atan2(n.x,n.y)}return n.x=t.x+this.long0,n.y=t.y,n}var Sy=["Tilted_Perspective","tpers"];const Ey={init:My,forward:xy,inverse:yy,names:Sy};function wy(){if(this.flip_axis=this.sweep==="x"?1:0,this.h=Number(this.h),this.radius_g_1=this.h/this.a,this.radius_g_1<=0||this.radius_g_1>1e10)throw new Error;if(this.radius_g=1+this.radius_g_1,this.C=this.radius_g*this.radius_g-1,this.es!==0){var n=1-this.es,t=1/n;this.radius_p=Math.sqrt(n),this.radius_p2=n,this.radius_p_inv2=t,this.shape="ellipse"}else this.radius_p=1,this.radius_p2=1,this.radius_p_inv2=1,this.shape="sphere";this.title||(this.title="Geostationary Satellite View")}function by(n){var t=n.x,e=n.y,i,s,r,a;if(t=t-this.long0,this.shape==="ellipse"){e=Math.atan(this.radius_p2*Math.tan(e));var o=this.radius_p/Ge(this.radius_p*Math.cos(e),Math.sin(e));if(s=o*Math.cos(t)*Math.cos(e),r=o*Math.sin(t)*Math.cos(e),a=o*Math.sin(e),(this.radius_g-s)*s-r*r-a*a*this.radius_p_inv2<0)return n.x=Number.NaN,n.y=Number.NaN,n;i=this.radius_g-s,this.flip_axis?(n.x=this.radius_g_1*Math.atan(r/Ge(a,i)),n.y=this.radius_g_1*Math.atan(a/i)):(n.x=this.radius_g_1*Math.atan(r/i),n.y=this.radius_g_1*Math.atan(a/Ge(r,i)))}else this.shape==="sphere"&&(i=Math.cos(e),s=Math.cos(t)*i,r=Math.sin(t)*i,a=Math.sin(e),i=this.radius_g-s,this.flip_axis?(n.x=this.radius_g_1*Math.atan(r/Ge(a,i)),n.y=this.radius_g_1*Math.atan(a/i)):(n.x=this.radius_g_1*Math.atan(r/i),n.y=this.radius_g_1*Math.atan(a/Ge(r,i))));return n.x=n.x*this.a,n.y=n.y*this.a,n}function Ty(n){var t=-1,e=0,i=0,s,r,a,o;if(n.x=n.x/this.a,n.y=n.y/this.a,this.shape==="ellipse"){this.flip_axis?(i=Math.tan(n.y/this.radius_g_1),e=Math.tan(n.x/this.radius_g_1)*Ge(1,i)):(e=Math.tan(n.x/this.radius_g_1),i=Math.tan(n.y/this.radius_g_1)*Ge(1,e));var h=i/this.radius_p;if(s=e*e+h*h+t*t,r=2*this.radius_g*t,a=r*r-4*s*this.C,a<0)return n.x=Number.NaN,n.y=Number.NaN,n;o=(-r-Math.sqrt(a))/(2*s),t=this.radius_g+o*t,e*=o,i*=o,n.x=Math.atan2(e,t),n.y=Math.atan(i*Math.cos(n.x)/t),n.y=Math.atan(this.radius_p_inv2*Math.tan(n.y))}else if(this.shape==="sphere"){if(this.flip_axis?(i=Math.tan(n.y/this.radius_g_1),e=Math.tan(n.x/this.radius_g_1)*Math.sqrt(1+i*i)):(e=Math.tan(n.x/this.radius_g_1),i=Math.tan(n.y/this.radius_g_1)*Math.sqrt(1+e*e)),s=e*e+i*i+t*t,r=2*this.radius_g*t,a=r*r-4*s*this.C,a<0)return n.x=Number.NaN,n.y=Number.NaN,n;o=(-r-Math.sqrt(a))/(2*s),t=this.radius_g+o*t,e*=o,i*=o,n.x=Math.atan2(e,t),n.y=Math.atan(i*Math.cos(n.x)/t)}return n.x=n.x+this.long0,n}var Ay=["Geostationary Satellite View","Geostationary_Satellite","geos"];const Py={init:wy,forward:by,inverse:Ty,names:Ay};var Ls=1.340264,Is=-.081106,Ns=893e-6,Ds=.003796,ra=Math.sqrt(3)/2;function Ry(){this.long0=this.long0!==void 0?this.long0:0,this.x0=this.x0!==void 0?this.x0:0,this.y0=this.y0!==void 0?this.y0:0,this.es!==0&&(this.apa=wu(this.es),this.qp=vn(this.e,1),this.rqda=Math.sqrt(.5*this.qp))}function Cy(n){var t=ht(n.x-this.long0,this.over),e=n.y,i=Math.sin(e);this.es!==0&&(i=vn(this.e,i)/this.qp);var s=Math.asin(ra*i),r=s*s,a=r*r*r;return n.x=t*Math.cos(s)/(ra*(Ls+3*Is*r+a*(7*Ns+9*Ds*r))),n.y=s*(Ls+Is*r+a*(Ns+Ds*r)),this.es!==0&&(n.x*=this.rqda,n.y*=this.rqda),n.x=this.a*n.x+this.x0,n.y=this.a*n.y+this.y0,n}function Ly(n){n.x=(n.x-this.x0)/this.a,n.y=(n.y-this.y0)/this.a,this.es!==0&&(n.x/=this.rqda,n.y/=this.rqda);var t=1e-9,e=12,i=n.y,s,r,a,o,h,l;for(l=0;l<e&&(s=i*i,r=s*s*s,a=i*(Ls+Is*s+r*(Ns+Ds*s))-n.y,o=Ls+3*Is*s+r*(7*Ns+9*Ds*s),i-=h=a/o,!(Math.abs(h)<t));++l);return s=i*i,r=s*s*s,n.x=ra*n.x*(Ls+3*Is*s+r*(7*Ns+9*Ds*s))/Math.cos(i),n.y=Math.asin(Math.sin(i)/ra),this.es!==0&&(n.y=bu(n.y,this.apa)),n.x=ht(n.x+this.long0,this.over),n}var Iy=["eqearth","Equal Earth","Equal_Earth"];const Ny={init:Ry,forward:Cy,inverse:Ly,names:Iy};var Vs=1e-10;function Dy(){var n;if(this.phi1=this.lat1,Math.abs(this.phi1)<Vs)throw new Error;this.es?(this.en=yh(this.es),this.m1=us(this.phi1,this.am1=Math.sin(this.phi1),n=Math.cos(this.phi1),this.en),this.am1=n/(Math.sqrt(1-this.es*this.am1*this.am1)*this.am1),this.inverse=Oy,this.forward=Uy):(Math.abs(this.phi1)+Vs>=J?this.cphi1=0:this.cphi1=1/Math.tan(this.phi1),this.inverse=Gy,this.forward=Fy)}function Uy(n){var t=ht(n.x-(this.long0||0),this.over),e=n.y,i,s,r;return i=this.am1+this.m1-us(e,s=Math.sin(e),r=Math.cos(e),this.en),s=r*t/(i*Math.sqrt(1-this.es*s*s)),n.x=i*Math.sin(s),n.y=this.am1-i*Math.cos(s),n.x=this.a*n.x+(this.x0||0),n.y=this.a*n.y+(this.y0||0),n}function Oy(n){n.x=(n.x-(this.x0||0))/this.a,n.y=(n.y-(this.y0||0))/this.a;var t,e,i,s;if(e=Ge(n.x,n.y=this.am1-n.y),s=Sh(this.am1+this.m1-e,this.es,this.en),(t=Math.abs(s))<J)t=Math.sin(s),i=e*Math.atan2(n.x,n.y)*Math.sqrt(1-this.es*t*t)/Math.cos(s);else if(Math.abs(t-J)<=Vs)i=0;else throw new Error;return n.x=ht(i+(this.long0||0),this.over),n.y=Zn(s),n}function Fy(n){var t=ht(n.x-(this.long0||0),this.over),e=n.y,i,s;return s=this.cphi1+this.phi1-e,Math.abs(s)>Vs?(n.x=s*Math.sin(i=t*Math.cos(e)/s),n.y=this.cphi1-s*Math.cos(i)):n.x=n.y=0,n.x=this.a*n.x+(this.x0||0),n.y=this.a*n.y+(this.y0||0),n}function Gy(n){n.x=(n.x-(this.x0||0))/this.a,n.y=(n.y-(this.y0||0))/this.a;var t,e,i=Ge(n.x,n.y=this.cphi1-n.y);if(e=this.cphi1+this.phi1-i,Math.abs(e)>J)throw new Error;return Math.abs(Math.abs(e)-J)<=Vs?t=0:t=i*Math.atan2(n.x,n.y)/Math.cos(e),n.x=ht(t+(this.long0||0),this.over),n.y=Zn(e),n}var By=["bonne","Bonne (Werner lat_1=90)"];const zy={init:Dy,names:By},pc={OBLIQUE:{forward:Xy,inverse:Yy},TRANSVERSE:{forward:qy,inverse:$y}},aa={ROTATE:{o_alpha:"oAlpha",o_lon_c:"oLongC",o_lat_c:"oLatC"},NEW_POLE:{o_lat_p:"oLatP",o_lon_p:"oLongP"},NEW_EQUATOR:{o_lon_1:"oLong1",o_lat_1:"oLat1",o_lon_2:"oLong2",o_lat_2:"oLat2"}};function ky(){if(this.x0=this.x0||0,this.y0=this.y0||0,this.long0=this.long0||0,this.title=this.title||"General Oblique Transformation",this.isIdentity=cu.includes(this.o_proj),!this.o_proj)throw new Error("Missing parameter: o_proj");if(this.o_proj==="ob_tran")throw new Error("Invalid value for o_proj: "+this.o_proj);const n=this.projStr.replace("+proj=ob_tran","").replace("+o_proj=","+proj=").trim(),t=sn(n);if(!t)throw new Error("Invalid parameter: o_proj. Unknown projection "+this.o_proj);t.long0=0,this.obliqueProjection=t;let e;const i=Object.keys(aa),s=o=>{if(typeof this[o]>"u")return;const h=parseFloat(this[o])*oe;if(isNaN(h))throw new Error("Invalid value for "+o+": "+this[o]);return h};for(let o=0;o<i.length;o++){const h=i[o],l=aa[h],c=Object.entries(l);if(c.some(([d])=>typeof this[d]<"u")){e=l;for(let d=0;d<c.length;d++){const[f,_]=c[d],g=s(f);if(typeof g>"u")throw new Error("Missing parameter: "+f+".");this[_]=g}break}}if(!e)throw new Error("No valid parameters provided for ob_tran projection.");const{lamp:r,phip:a}=Wy(this,e);this.lamp=r,Math.abs(a)>st?(this.cphip=Math.cos(a),this.sphip=Math.sin(a),this.projectionType=pc.OBLIQUE):this.projectionType=pc.TRANSVERSE}function Hy(n){return this.projectionType.forward(this,n)}function Vy(n){return this.projectionType.inverse(this,n)}function Wy(n,t){let e,i;if(t===aa.ROTATE){let s=n.oLongC,r=n.oLatC,a=n.oAlpha;if(Math.abs(Math.abs(r)-J)<=st)throw new Error("Invalid value for o_lat_c: "+n.o_lat_c+" should be < 90°");i=s+Math.atan2(-1*Math.cos(a),-1*Math.sin(a)*Math.sin(r)),e=Math.asin(Math.cos(r)*Math.sin(a))}else if(t===aa.NEW_POLE)i=n.oLongP,e=n.oLatP;else{let s=n.oLong1,r=n.oLat1,a=n.oLong2,o=n.oLat2,h=Math.abs(r);if(Math.abs(r)>J-st)throw new Error("Invalid value for o_lat_1: "+n.o_lat_1+" should be < 90°");if(Math.abs(o)>J-st)throw new Error("Invalid value for o_lat_2: "+n.o_lat_2+" should be < 90°");if(Math.abs(r-o)<st)throw new Error("Invalid value for o_lat_1 and o_lat_2: o_lat_1 should be different from o_lat_2");if(h<st)throw new Error("Invalid value for o_lat_1: o_lat_1 should be different from zero");i=Math.atan2(Math.cos(r)*Math.sin(o)*Math.cos(s)-Math.sin(r)*Math.cos(o)*Math.cos(a),Math.sin(r)*Math.cos(o)*Math.sin(a)-Math.cos(r)*Math.sin(o)*Math.sin(s)),e=Math.atan(-1*Math.cos(i-s)/Math.tan(r))}return{lamp:i,phip:e}}function Xy(n,t){let{x:e,y:i}=t;e=ht(e-n.long0,n.over);const s=Math.cos(e),r=Math.sin(i),a=Math.cos(i);t.x=ht(Math.atan2(a*Math.sin(e),n.sphip*a*s+n.cphip*r)+n.lamp),t.y=Math.asin(n.sphip*r-n.cphip*a*s);const o=n.obliqueProjection.forward(t);return n.isIdentity&&(o.x*=Be,o.y*=Be),o}function qy(n,t){let{x:e,y:i}=t;e=ht(e-n.long0,n.over);const s=Math.cos(i),r=Math.cos(e);t.x=ht(Math.atan2(s*Math.sin(e),Math.sin(i))+n.lamp),t.y=Math.asin(-1*s*r);const a=n.obliqueProjection.forward(t);return n.isIdentity&&(a.x*=Be,a.y*=Be),a}function Yy(n,t){n.isIdentity&&(t.x*=oe,t.y*=oe);const e=n.obliqueProjection.inverse(t);let{x:i,y:s}=e;if(i<Number.MAX_VALUE){i-=n.lamp;const r=Math.cos(i),a=Math.sin(s),o=Math.cos(s);t.x=Math.atan2(o*Math.sin(i),n.sphip*o*r-n.cphip*a),t.y=Math.asin(n.sphip*a+n.cphip*o*r)}return t.x=ht(t.x+n.long0),t}function $y(n,t){n.isIdentity&&(t.x*=oe,t.y*=oe);const e=n.obliqueProjection.inverse(t);let{x:i,y:s}=e;if(i<Number.MAX_VALUE){const r=Math.cos(s);i-=n.lamp,t.x=Math.atan2(r*Math.sin(i),-1*Math.sin(s)),t.y=Math.asin(r*Math.cos(i))}return t.x=ht(t.x+n.long0),t}var jy=["General Oblique Transformation","General_Oblique_Transformation","ob_tran"];const Ky={init:ky,forward:Hy,inverse:Vy,names:jy};function Zy(n){n.Proj.projections.add(Hr),n.Proj.projections.add(Vr),n.Proj.projections.add(GM),n.Proj.projections.add(YM),n.Proj.projections.add(JM),n.Proj.projections.add(i1),n.Proj.projections.add(l1),n.Proj.projections.add(p1),n.Proj.projections.add(M1),n.Proj.projections.add(w1),n.Proj.projections.add(U1),n.Proj.projections.add(k1),n.Proj.projections.add(q1),n.Proj.projections.add(J1),n.Proj.projections.add(ix),n.Proj.projections.add(hx),n.Proj.projections.add(dx),n.Proj.projections.add(vx),n.Proj.projections.add(Sx),n.Proj.projections.add(Ax),n.Proj.projections.add(Ix),n.Proj.projections.add(Fx),n.Proj.projections.add(Hx),n.Proj.projections.add(jx),n.Proj.projections.add(ty),n.Proj.projections.add(ry),n.Proj.projections.add(dy),n.Proj.projections.add(vy),n.Proj.projections.add(Ey),n.Proj.projections.add(Py),n.Proj.projections.add(Ny),n.Proj.projections.add(zy),n.Proj.projections.add(Ky)}const Jy=Object.assign(eM,{defaultDatum:"WGS84",Proj:sn,WGS84:new sn("WGS84"),Point:os,toPoint:Mh,defs:Ee,nadgrid:Dv,transform:tM,mgrs:nM,version:"__VERSION__"});Zy(Jy);const Fe=class Fe{constructor(t,e=!0){O(this,"units","meter");O(this,"name");O(this,"centralMeridian");O(this,"falseEasting",5e5);O(this,"falseNorthing");if(t<1||t>60||!Number.isInteger(t))throw new Error(`UTMCRS: invalid zone ${t}, must be integer 1–60`);this.centralMeridian=t*6-183,this.falseNorthing=e?0:1e7,this.name=`UTM_Zone_${t}${e?"N":"S"}`}project(t,e){const i=this.toRadians(t-this.centralMeridian),s=this.toRadians(e),{a:r,e2:a,eP2:o,k0:h}=Fe,l=Math.sin(s),c=Math.cos(s),u=Math.tan(s),d=r/Math.sqrt(1-a*l*l),f=u*u,_=o*c*c,g=i*c,p=Qy(r,a,s),m=this.falseEasting+h*d*(g+(1-f+_)*g*g*g/6+(5-18*f+f*f+72*_-58*o)*g*g*g*g*g/120),x=this.falseNorthing+h*(p+d*u*(g*g/2+(5-f+9*_+4*_*_)*g*g*g*g/24+(61-58*f+f*f+600*_-330*o)*g*g*g*g*g*g/720));return{x:m,y:x}}unproject(t,e){const{a:i,e2:s,eP2:r,k0:a}=Fe,o=(e-this.falseNorthing)/a,h=(1-Math.sqrt(1-s))/(1+Math.sqrt(1-s)),l=o/(i*(1-s/4-3*s*s/64-5*s*s*s/256)),c=Math.sin(2*l),u=Math.sin(4*l),d=Math.sin(6*l),f=Math.sin(8*l),_=h*h,g=_*h,p=g*h,m=l+(3*h/2-27*g/32)*c+(21*_/16-55*p/32)*u+151*g/96*d+1097*p/512*f,x=Math.sin(m),v=Math.cos(m),y=Math.tan(m),L=i/Math.sqrt(1-s*x*x),T=y*y,b=r*v*v,C=(t-this.falseEasting)/(a*L),w=i*(1-s)/Math.pow(1-s*x*x,1.5),S=L*y/w*(C*C/2-(5+3*T+10*b-4*b*b-9*r)*C*C*C*C/24+(61+90*T+298*b+45*T*T-252*r-3*b*b)*C*C*C*C*C*C/720),P=m-S,k=this.toRadians(this.centralMeridian)+(C-(1+2*T+b)*C*C*C/6+(5-2*b+28*T-3*b*b+8*r+24*T*T)*C*C*C*C*C/120)/v;return{lon:this.toDegrees(k),lat:this.toDegrees(P)}}toRadians(t){return t*Math.PI/180}toDegrees(t){return t*180/Math.PI}};O(Fe,"a",6378137),O(Fe,"f",1/298.257223563),O(Fe,"k0",.9996),O(Fe,"e2",2*Fe.f-Fe.f*Fe.f),O(Fe,"eP2",Fe.e2/(1-Fe.e2));let mc=Fe;function Qy(n,t,e){const i=t*t,s=i*t;return n*((1-t/4-3*i/64-5*s/256)*e-(3*t/8+3*i/32+45*s/1024)*Math.sin(2*e)+(15*i/256+45*s/1024)*Math.sin(4*e)-35*s/3072*Math.sin(6*e))}class Ph extends _h{constructor(e,i){super();O(this,"object");O(this,"_disposeFn");this.object=e,this._disposeFn=i}dispose(){this._disposeFn(this.object),this.markDisposed()}}class Rh extends _h{constructor(e,i,s){super();O(this,"id");O(this,"tileKey");O(this,"layerId");O(this,"data");O(this,"renderObjects",[]);O(this,"state");O(this,"createdAt");this.id=e,this.tileKey=i,this.layerId=s,this.state="pending",this.createdAt=performance.now()}dispose(){for(const e of this.renderObjects)e.disposed||e.dispose();this.renderObjects=[],this.markDisposed()}}const ca=class ca{constructor(t){O(this,"baseTileSize");O(this,"name");O(this,"schemeId");this.baseTileSize=t,this.schemeId=`project-${t}`,this.name=`ProjectTileScheme(${t}m)`}tileSizeAtLevel(t){return this.baseTileSize*Math.pow(2,t)}getTilesInView(t,e,i){const s=this.pickLevel(i??0);return this._getTilesAtLevel(t,s)}pickLevel(t){if(t<=0)return 0;const i=t*256,s=Math.round(Math.log2(i/this.baseTileSize));return Math.max(0,s)}getTileBounds(t){if(t.schemeId!==this.schemeId)throw new Error(`TileKey scheme mismatch: expected "${this.schemeId}", got "${t.schemeId}"`);const[e,i]=this._parseId(t.id),s=this.tileSizeAtLevel(t.level),r=e*s,a=i*s,o=(e+1)*s,h=(i+1)*s;return[r,a,o,h]}getParentKey(t){if(t.level<=0)return null;const[e,i]=this._parseId(t.id);return Ji(this.schemeId,`${Math.floor(e/2)}-${Math.floor(i/2)}`,t.level-1)}getChildKeys(t){const[e,i]=this._parseId(t.id),s=e*2,r=i*2,a=[];for(let o=0;o<2;o++)for(let h=0;h<2;h++)a.push(Ji(this.schemeId,`${s+h}-${r+o}`,t.level+1));return a}snapOrigin(t){const e=this.baseTileSize;return{x:Math.floor(t.x/e)*e,y:Math.floor(t.y/e)*e,z:0}}_getTilesAtLevel(t,e){const i=this.tileSizeAtLevel(e),s=t[0],r=t[1],a=t[2],o=t[3],h=Math.floor(s/i),l=Math.floor(a/i),c=Math.floor(r/i),u=Math.floor(o/i),d=l-h+1,f=u-c+1;if(d*f>ca.MAX_TILES_PER_LAYER)return this._getTilesAtLevel(t,e+1);const _=[];for(let g=c;g<=u;g++)for(let p=h;p<=l;p++)_.push(Ji(this.schemeId,`${p}-${g}`,e));return _}_parseId(t){const e=/^(-?\d+)-(-?\d+)$/.exec(t);if(!e)throw new Error(`Invalid ProjectTileKey id: "${t}"`);return[parseInt(e[1],10),parseInt(e[2],10)]}};O(ca,"MAX_TILES_PER_LAYER",4096);let oa=ca;const cn=class cn{constructor(t,e=0,i=18){O(this,"name");O(this,"schemeId","xyz");O(this,"targetCrs");O(this,"minZoom");O(this,"maxZoom");O(this,"_stableZoom",null);O(this,"_wm",new as);this.targetCrs=t,this.minZoom=e,this.maxZoom=i,this.name=`XYZTileScheme(${t.name})`}tileSizeAtZoom(t){return cn.WORLD_SIZE/Math.pow(2,t)}getTilesInView(t,e,i){const s=e,[r,a,o,h]=t,l=[{x:r,y:a},{x:o,y:a},{x:r,y:h},{x:o,y:h},{x:(r+o)/2,y:(a+h)/2}],c=this._wm,u=[];for(const P of l){const k=s.unproject(P.x,P.y);if(isNaN(k.lon)||isNaN(k.lat))continue;const B=Math.max(-180,Math.min(180,k.lon)),q=Math.max(-85.06,Math.min(85.06,k.lat)),Y=c.project(B,q);u.push(Y)}if(u.length===0)return[];let d=1/0,f=1/0,_=-1/0,g=-1/0;for(const P of u)P.x<d&&(d=P.x),P.y<f&&(f=P.y),P.x>_&&(_=P.x),P.y>g&&(g=P.y);const p=_-d,m=this._pickZoom(p),{WORLD_HALF:x,WORLD_SIZE:v}=cn,y=v/Math.pow(2,m),L=Math.pow(2,m),T=Math.max(0,Math.floor((d+x)/y)),b=Math.min(L-1,Math.floor((_+x)/y)),C=Math.max(0,Math.floor((x-g)/y)),w=Math.min(L-1,Math.floor((x-f)/y)),S=[];for(let P=C;P<=w;P++)for(let k=T;k<=b;k++)S.push(Ji(this.schemeId,`${m}/${k}/${P}`,m));return S}getTileBounds(t){if(t.schemeId!==this.schemeId)throw new Error(`TileKey scheme mismatch: expected "${this.schemeId}", got "${t.schemeId}"`);const{z:e,x:i,y:s}=this._parseId(t.id),{WORLD_HALF:r,WORLD_SIZE:a,SAMPLE_GRID:o}=cn,h=a/Math.pow(2,e),l=-r+i*h,u=r-s*h-h,d=this._wm;let f=1/0,_=1/0,g=-1/0,p=-1/0;const m=h/(o-1),x=h/(o-1);for(let v=0;v<o;v++)for(let y=0;y<o;y++){const L=l+v*m,T=u+y*x,b=d.unproject(L,T),C=this.targetCrs.project(b.lon,b.lat);C.x<f&&(f=C.x),C.y<_&&(_=C.y),C.x>g&&(g=C.x),C.y>p&&(p=C.y)}return[f,_,g,p]}getParentKey(t){if(t.level<=this.minZoom)return null;const{z:e,x:i,y:s}=this._parseId(t.id),r=e-1;return Ji(this.schemeId,`${r}/${Math.floor(i/2)}/${Math.floor(s/2)}`,r)}getChildKeys(t){const{z:e,x:i,y:s}=this._parseId(t.id),r=e+1,a=i*2,o=s*2,h=[];for(let l=0;l<2;l++)for(let c=0;c<2;c++)h.push(Ji(this.schemeId,`${r}/${a+c}/${o+l}`,r));return h}getReprojector(t){const{z:e,x:i,y:s}=this._parseId(t.id),{WORLD_HALF:r,WORLD_SIZE:a}=cn,o=a/Math.pow(2,e),h=-r+i*o,c=r-s*o-o,u=this._wm,d=this.targetCrs;return(f,_)=>{const g=h+f*o,p=c+_*o,m=u.unproject(g,p);return d.project(m.lon,m.lat)}}_pickZoom(t){if(t<=0)return this.maxZoom;const{WORLD_SIZE:e}=cn,i=Math.log2(4*e/t),s=Math.round(i);if(this._stableZoom!==null){const a=s-this._stableZoom;if(Math.abs(a)===1){const o=this._stableZoom+a*.5;if(Math.abs(i-o)<.3)return this._stableZoom}}const r=Math.max(this.minZoom,Math.min(this.maxZoom,s));return this._stableZoom=r,r}_parseId(t){const e=t.split("/");if(e.length!==3)throw new Error(`Invalid XYZ tile id: "${t}" (expected "z/x/y")`);return{z:parseInt(e[0],10),x:parseInt(e[1],10),y:parseInt(e[2],10)}}};O(cn,"WORLD_HALF",Math.PI*as.R),O(cn,"WORLD_SIZE",2*cn.WORLD_HALF),O(cn,"SAMPLE_GRID",5);let Qo=cn;class tS{constructor(t,e){O(this,"dataType","image");O(this,"crs");O(this,"bounds");O(this,"urlTemplate");O(this,"minZoom");O(this,"maxZoom");O(this,"timeout");this.urlTemplate=t,this.crs=new as,this.minZoom=(e==null?void 0:e.minZoom)??0,this.maxZoom=(e==null?void 0:e.maxZoom)??18,this.timeout=(e==null?void 0:e.timeout)??15e3;const s=Math.PI*6378137;this.bounds=[-s,-s,s,s]}async fetch(t,e,i){const s=this.buildUrl(t),r=new AbortController,a=setTimeout(()=>r.abort(),this.timeout),o=()=>r.abort();i==null||i.addEventListener("abort",o,{once:!0});try{const h=await fetch(s,{signal:r.signal});if(!h.ok)throw new Error(`XYZTileSource: HTTP ${h.status} for ${s}`);const l=await h.blob();return createImageBitmap(l)}finally{clearTimeout(a),i==null||i.removeEventListener("abort",o)}}dispose(t){t.close()}buildUrl(t){const{z:e,x:i,y:s}=this._parseId(t.id),r=Math.pow(2,e)-1-s;return this.urlTemplate.replace(/\{z\}/g,String(e)).replace(/\{x\}/g,String(i)).replace(/\{-y\}/g,String(r)).replace(/\{y\}/g,String(s))}_parseId(t){const e=t.split("/");if(e.length!==3)throw new Error(`XYZTileSource: invalid tile id "${t}" (expected "z/x/y")`);return{z:parseInt(e[0],10),x:parseInt(e[1],10),y:parseInt(e[2],10)}}}class eS{constructor(t,e){O(this,"dataType","geojson");O(this,"crs");O(this,"bounds");O(this,"_url");O(this,"_features",null);O(this,"_loadPromise",null);this._url=t,this.crs=e,this.bounds=[0,0,0,0]}async fetch(t,e,i){const s=await this._loadAll();return this._clip(s,e)}dispose(t){}async _loadAll(){return this._features?this._features:this._loadPromise?this._loadPromise:(this._loadPromise=(async()=>{const t=await fetch(this._url);if(!t.ok)throw new Error(`GeoJSONSource: HTTP ${t.status} for ${this._url}`);const e=await t.json();if(this._features=this._parse(e),this._features.length>0){let i=1/0,s=1/0,r=-1/0,a=-1/0;for(const o of this._features)o.bbox[0]<i&&(i=o.bbox[0]),o.bbox[1]<s&&(s=o.bbox[1]),o.bbox[2]>r&&(r=o.bbox[2]),o.bbox[3]>a&&(a=o.bbox[3]);this.bounds=[i,s,r,a]}return this._features})(),this._loadPromise)}_parse(t){const e=[];if(t.type==="FeatureCollection")for(const i of t.features??[]){const s=this._parseFeature(i);s&&e.push(s)}else if(t.type==="Feature"){const i=this._parseFeature(t);i&&e.push(i)}return e}_parseFeature(t){if(!t.geometry||!t.geometry.type)return null;const e=t.geometry.type,i=t.geometry.coordinates;if(!i)return null;const s=t.properties??{},r=this._computeBbox(e,i);return{type:e,coordinates:i,properties:s,bbox:r}}_computeBbox(t,e){let i=1/0,s=1/0,r=-1/0,a=-1/0;const o=(h,l)=>{h<i&&(i=h),l<s&&(s=l),h>r&&(r=h),l>a&&(a=l)};if(t==="Point")o(e[0],e[1]);else if(t==="MultiPoint"||t==="LineString")for(const h of e)o(h[0],h[1]);else if(t==="MultiLineString"||t==="Polygon")for(const h of e)for(const l of h)o(l[0],l[1]);else if(t==="MultiPolygon")for(const h of e)for(const l of h)for(const c of l)o(c[0],c[1]);return isFinite(i)?[i,s,r,a]:[0,0,0,0]}_clip(t,e){const[i,s,r,a]=e;return t.filter(o=>{const[h,l,c,u]=o.bbox;return!(c<i||h>r||u<s||l>a)})}}class nS{constructor(){O(this,"type","simple")}createGeometry(t,e){const[i,s,r,a]=t,o=r-i,h=a-s,l=new ls(o,h),c=(i+r)/2-e.x,u=(s+a)/2-e.y;return l.translate(c,u,0),l}}class iS{constructor(t={}){O(this,"name");O(this,"quality");this.name=t.name??"raster-renderer",this.quality=t.quality??new nS}async createContent(t,e){const i=new Rh(`raster-${e.key.id}`,e.key,"raster-layer"),s=new De(t);s.needsUpdate=!0,s.minFilter=$e,s.magFilter=$e,s.colorSpace=un;const r=this.quality.createGeometry(e.bounds,e.origin,e.reprojector,e.key.level),a=new Ys({map:s,side:en}),o=new Ie(r,a),h=new Ph(o,l=>{const c=l;if(c.geometry.dispose(),Array.isArray(c.material))for(const u of c.material)u.dispose();else c.material.dispose()});return i.renderObjects.push(h),i.data=t,i.state="ready",i}disposeContent(t){var i,s,r;const e=(r=(s=(i=t.renderObjects[0])==null?void 0:i.object)==null?void 0:s.material)==null?void 0:r.map;e&&e.dispose()}}class sS{constructor(t,e="vector-renderer"){O(this,"name");O(this,"_materialFactory");this._materialFactory=t,this.name=e}async createContent(t,e){const i=new Rh(`vector-${e.key.id}`,e.key,"vector-layer"),s=e.origin.x,r=e.origin.y;for(const a of t){const o=this._createObject(a,s,r);if(!o)continue;const h=new Ph(o,l=>{this._disposeGeometry(l)});i.renderObjects.push(h)}return i.data=t,i.state="ready",i}disposeContent(t){for(const e of t.renderObjects)e.disposed||e.dispose()}_createObject(t,e,i){switch(t.type){case"Point":return this._createPoint(t.coordinates,e,i,this._materialFactory.createPointMaterial(t));case"MultiPoint":return this._createMultiPoint(t.coordinates,e,i,this._materialFactory.createPointMaterial(t));case"LineString":return this._createLine(t.coordinates,e,i,this._materialFactory.createLineMaterial(t));case"MultiLineString":return this._createMultiLine(t.coordinates,e,i,this._materialFactory.createLineMaterial(t));case"Polygon":return this._createPolygon(t.coordinates,e,i,this._materialFactory.createFillMaterial(t));case"MultiPolygon":return this._createMultiPolygon(t.coordinates,e,i,this._materialFactory.createFillMaterial(t));default:return null}}_toLocal(t,e,i){return[t[0]-e,t[1]-i,0]}_createPoint(t,e,i,s){const[r,a,o]=this._toLocal(t,e,i),h=new Re;return h.setAttribute("position",new ke([r,a,o],3)),new xs(h,s)}_createMultiPoint(t,e,i,s){const r=[];for(const o of t){const[h,l,c]=this._toLocal(o,e,i);r.push(h,l,c)}const a=new Re;return a.setAttribute("position",new ke(r,3)),new xs(a,s)}_createLine(t,e,i,s){const r=[];for(const o of t){const[h,l,c]=this._toLocal(o,e,i);r.push(h,l,c)}const a=new Re;return a.setAttribute("position",new ke(r,3)),new Zi(a,s)}_createMultiLine(t,e,i,s){const r=new gn;for(const a of t){const o=this._createLine(a,e,i,s);r.add(o)}return r}_createPolygon(t,e,i,s){const r=this._ringToShape(t[0],e,i);for(let o=1;o<t.length;o++)r.holes.push(this._ringToPath(t[o],e,i));const a=new mh(r);return new Ie(a,s)}_createMultiPolygon(t,e,i,s){const r=new gn;for(const a of t){const o=this._createPolygon(a,e,i,s);r.add(o)}return r}_ringToShape(t,e,i){const s=new tu,[r,a]=this._toLocal(t[0],e,i);s.moveTo(r,a);for(let o=1;o<t.length;o++){const[h,l]=this._toLocal(t[o],e,i);s.lineTo(h,l)}return s.closePath(),s}_ringToPath(t,e,i){const s=new ko,[r,a]=this._toLocal(t[0],e,i);s.moveTo(r,a);for(let o=1;o<t.length;o++){const[h,l]=this._toLocal(t[o],e,i);s.lineTo(h,l)}return s.closePath(),s}_disposeGeometry(t){const e=t;e instanceof xs||e instanceof Zi||e instanceof Ie?e.geometry.dispose():e instanceof gn&&e.traverse(i=>{(i instanceof xs||i instanceof Zi||i instanceof Ie)&&i.geometry.dispose()})}}class rS{constructor(t){O(this,"_pointMat");O(this,"_lineMat");O(this,"_fillMat");this._pointMat=new jc({color:(t==null?void 0:t.pointColor)??15158332,size:5,sizeAttenuation:!1}),this._lineMat=new fh({color:(t==null?void 0:t.lineColor)??3066993}),this._fillMat=new Ys({color:(t==null?void 0:t.fillColor)??3447003,side:en})}createPointMaterial(t){return this._pointMat}createLineMaterial(t){return this._lineMat}createFillMaterial(t){return this._fillMat}}class Ch{constructor(t=4,e=!1){O(this,"type","subdivided");O(this,"gridSize");O(this,"adaptive");this.gridSize=Math.max(2,Math.min(64,Math.floor(t))),this.adaptive=e}static gridSizeForZoom(t){return t<=1?48:t<=3?32:t<=5?16:t<=8?8:t<=11?4:2}createGeometry(t,e,i,s){const r=this.adaptive&&s!=null?Ch.gridSizeForZoom(s):this.gridSize,[a,o,h,l]=t,c=(h-a)/r,u=(l-o)/r,d=(r+1)*(r+1),f=new Float32Array(d*3),_=new Float32Array(d*2);for(let v=0;v<=r;v++)for(let y=0;y<=r;y++){const L=v*(r+1)+y,T=y/r,b=v/r;let C,w;if(i){const S=i(T,b);C=S.x,w=S.y}else C=a+y*c,w=o+v*u;f[L*3]=C-e.x,f[L*3+1]=w-e.y,f[L*3+2]=0,_[L*2]=T,_[L*2+1]=b}const g=r*r*2,p=new Uint16Array(g*3);let m=0;for(let v=0;v<r;v++)for(let y=0;y<r;y++){const L=v*(r+1)+y,T=L+1,b=L+(r+1),C=b+1;p[m++]=L,p[m++]=T,p[m++]=C,p[m++]=L,p[m++]=C,p[m++]=b}const x=new Re;return x.setAttribute("position",new je(f,3)),x.setAttribute("uv",new je(_,2)),x.setIndex(new je(p,1)),x.computeVertexNormals(),x}}const ua=class ua{constructor(t){O(this,"id");O(this,"name");O(this,"type");O(this,"visible");O(this,"opacity");O(this,"zIndex");O(this,"tileScheme");O(this,"dataSource");O(this,"renderer");O(this,"dependsOn");O(this,"_idCounter",0);this.id=t.id??`raster-${++ua._nextId}`,this.name=t.name,this.type=t.type??"raster",this.tileScheme=t.tileScheme,this.dataSource=t.dataSource,this.renderer=t.renderer,this.visible=t.visible??!0,this.opacity=t.opacity??1,this.zIndex=t.zIndex??0,this.dependsOn=t.dependsOn??[]}getVisibleTiles(t,e,i){return this.visible?this.tileScheme.getTilesInView(t,e,i):[]}};O(ua,"_nextId",0);let ha=ua;const fa=class fa{constructor(t){O(this,"id");O(this,"name");O(this,"type");O(this,"visible");O(this,"opacity");O(this,"zIndex");O(this,"tileScheme");O(this,"dataSource");O(this,"renderer");O(this,"dependsOn");this.id=t.id??`vector-${++fa._nextId}`,this.name=t.name,this.type=t.type??"vector",this.tileScheme=t.tileScheme,this.dataSource=t.dataSource,this.renderer=t.renderer,this.visible=t.visible??!0,this.opacity=t.opacity??1,this.zIndex=t.zIndex??0,this.dependsOn=t.dependsOn??[]}getVisibleTiles(t,e,i){if(!this.visible)return[];const s=this.dataSource.bounds;if(!(s[2]>s[0]&&s[3]>s[1]))return this.tileScheme.getTilesInView(t,e,i);const a=[Math.max(t[0],s[0]),Math.max(t[1],s[1]),Math.min(t[2],s[2]),Math.min(t[3],s[3])];return a[2]<=a[0]||a[3]<=a[1]?[]:this.tileScheme.getTilesInView(a,e,i)}};O(fa,"_nextId",0);let th=fa;const _c={type:"change"},Lh={type:"start"},Lu={type:"end"},Dr=new _a,gc=new kn,aS=Math.cos(70*Go.DEG2RAD),me=new I,Ue=2*Math.PI,te={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},so=1e-6;class oS extends zg{constructor(t,e=null){super(t,e),this.state=te.NONE,this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Cn.ROTATE,MIDDLE:Cn.DOLLY,RIGHT:Cn.PAN},this.touches={ONE:zi.ROTATE,TWO:zi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new pi,this._lastTargetPosition=new I,this._quat=new pi().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Xl,this._sphericalDelta=new Xl,this._scale=1,this._panOffset=new I,this._rotateStart=new mt,this._rotateEnd=new mt,this._rotateDelta=new mt,this._panStart=new mt,this._panEnd=new mt,this._panDelta=new mt,this._dollyStart=new mt,this._dollyEnd=new mt,this._dollyDelta=new mt,this._dollyDirection=new I,this._mouse=new mt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=lS.bind(this),this._onPointerDown=hS.bind(this),this._onPointerUp=cS.bind(this),this._onContextMenu=gS.bind(this),this._onMouseWheel=dS.bind(this),this._onKeyDown=pS.bind(this),this._onTouchStart=mS.bind(this),this._onTouchMove=_S.bind(this),this._onMouseDown=uS.bind(this),this._onMouseMove=fS.bind(this),this._interceptControlDown=vS.bind(this),this._interceptControlUp=MS.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(_c),this.update(),this.state=te.NONE}update(t=null){const e=this.object.position;me.copy(e).sub(this.target),me.applyQuaternion(this._quat),this._spherical.setFromVector3(me),this.autoRotate&&this.state===te.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ue:i>Math.PI&&(i-=Ue),s<-Math.PI?s+=Ue:s>Math.PI&&(s-=Ue),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(me.setFromSpherical(this._spherical),me.applyQuaternion(this._quatInverse),e.copy(this.target).add(me),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=me.length();a=this._clampDistance(o*this._scale);const h=o-a;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),r=!!h}else if(this.object.isOrthographicCamera){const o=new I(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=h!==this.object.zoom;const l=new I(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=me.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Dr.origin.copy(this.object.position),Dr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Dr.direction))<aS?this.object.lookAt(this.target):(gc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Dr.intersectPlane(gc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>so||8*(1-this._lastQuaternion.dot(this.object.quaternion))>so||this._lastTargetPosition.distanceToSquared(this.target)>so?(this.dispatchEvent(_c),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ue/60*this.autoRotateSpeed*t:Ue/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){me.setFromMatrixColumn(e,0),me.multiplyScalar(-t),this._panOffset.add(me)}_panUp(t,e){this.screenSpacePanning===!0?me.setFromMatrixColumn(e,1):(me.setFromMatrixColumn(e,0),me.crossVectors(this.object.up,me)),me.multiplyScalar(t),this._panOffset.add(me)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;me.copy(s).sub(this.target);let r=me.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ue*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ue*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ue*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ue*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new mt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function hS(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function lS(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function cS(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Lu),this.state=te.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function uS(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Cn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=te.DOLLY;break;case Cn.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=te.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=te.ROTATE}break;case Cn.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=te.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=te.PAN}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(Lh)}function fS(n){switch(this.state){case te.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case te.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case te.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function dS(n){this.enabled===!1||this.enableZoom===!1||this.state!==te.NONE||(n.preventDefault(),this.dispatchEvent(Lh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Lu))}function pS(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function mS(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case zi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=te.TOUCH_ROTATE;break;case zi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=te.TOUCH_PAN;break;default:this.state=te.NONE}break;case 2:switch(this.touches.TWO){case zi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=te.TOUCH_DOLLY_PAN;break;case zi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=te.TOUCH_DOLLY_ROTATE;break;default:this.state=te.NONE}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(Lh)}function _S(n){switch(this._trackPointer(n),this.state){case te.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case te.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case te.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case te.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=te.NONE}}function gS(n){this.enabled!==!1&&n.preventDefault()}function vS(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function MS(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const da=class da{constructor(t={}){O(this,"camera");O(this,"controls");O(this,"_container",null);O(this,"_resizeObserver",null);const{center:e={x:0,y:0},distance:i=2e5,maxPolarAngle:s=Math.PI/2.4,fov:r=70,near:a=100,far:o=5e7}=t;this.camera=new tn(r,1,a,o),this.camera.position.set(e.x,e.y,i),this.camera.lookAt(e.x,e.y,0),this.controls=new oS(this.camera),this.controls.target.set(e.x,e.y,0),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.maxPolarAngle=s,this.controls.mouseButtons={LEFT:Cn.PAN,MIDDLE:Cn.DOLLY,RIGHT:Cn.ROTATE},this.controls.minDistance=100,this.controls.maxDistance=3e7,this.controls.panSpeed=1,this.controls.rotateSpeed=.5,this.controls.zoomSpeed=1.2}get cameraWorldPos(){return{x:this.camera.position.x,y:this.camera.position.y,z:this.camera.position.z}}get extent(){const t=this.controls.target,e=this.camera.position.distanceTo(t),i=Go.degToRad(this.camera.fov),s=Math.tan(i/2)*e,r=this.camera.aspect,a=s*r,o=da.MAX_EXTENT_HALF;return[Math.max(t.x-o,t.x-a),Math.max(t.y-o,t.y-s),Math.min(t.x+o,t.x+a),Math.min(t.y+o,t.y+s)]}get resolution(){var r;const t=this.camera.position.distanceTo(this.controls.target),e=Go.degToRad(this.camera.fov),i=2*Math.tan(e/2)*t,s=((r=this._container)==null?void 0:r.clientHeight)??600;return i/Math.max(s,1)}attach(t){this._container=t,this.controls.domElement=t,this.controls.connect(t),this._resizeObserver=new ResizeObserver(()=>{const e=t.clientWidth,i=t.clientHeight;this.camera.aspect=e/Math.max(i,1),this.camera.updateProjectionMatrix()}),this._resizeObserver.observe(t)}detach(){this.controls.disconnect(),this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._container=null}update(t){const e=this.camera.position.distanceTo(this.controls.target),i=Math.min(Math.pow(1e7/Math.max(e,100),2),Math.PI/2.2);this.controls.maxPolarAngle=i,this.controls.update()}dispose(){this.detach(),this.controls.dispose()}setCenter(t,e){this.controls.target.set(t,e,0),this.camera.lookAt(t,e,0)}setDistance(t){const e=this.camera.position.clone().sub(this.controls.target).normalize();this.camera.position.copy(this.controls.target.clone().addScaledVector(e,t))}};O(da,"MAX_EXTENT_HALF",2003750834e-2);let eh=da;class xS{constructor(t){O(this,"dataType","checkerboard");O(this,"crs");O(this,"bounds",[1295e4,485e4,12965e3,487e4]);this.crs=t}async fetch(t){const[e,i]=t.id.split("-").map(Number);return{color:(e+i)%2===0?"#2a3f5f":"#3a5f7f",row:i,col:e}}dispose(){}}class yS{constructor(){O(this,"name","checkerboard-renderer")}async createContent(t,e){const i=new Rh(`cb-${e.key.id}`,e.key,"cb-layer"),[s,r,a,o]=e.bounds,h=a-s,l=o-r,c=new ls(h,l),u=(s+a)/2-e.origin.x,d=(r+o)/2-e.origin.y;c.translate(u,d,0);const f=new Ys({color:new Vt(t.color),side:en,transparent:!0,opacity:.65}),_=new Ie(c,f),g=new Ph(_,p=>{const m=p;if(m.geometry.dispose(),Array.isArray(m.material))for(const x of m.material)x.dispose();else m.material.dispose()});return i.renderObjects.push(g),i.data=t,i.state="ready",i}disposeContent(){}}function SS(n,t,e,i,s,r,a){const o=h=>document.getElementById(h);o("crs-name").textContent=n,o("crs-pos").textContent=`(${t.toFixed(0)}, ${e.toFixed(0)}) m`,o("crs-zoom").textContent=`${i.toFixed(1)} m/px`,o("tile-count").textContent=`${s}`,o("scheduler-stats").textContent=`${r} queued / ${a} loading`}async function ES(){const n=new as,t=document.getElementById("app"),e=new og({antialias:!0});e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.setClearColor(1710638),t.appendChild(e.domElement);const i=new hg,s=new gn;i.add(s);const r=new eh({center:{x:12957e3,y:486e4},distance:5e4,maxPolarAngle:Math.PI/2.4,fov:70,near:100,far:5e7}),a=r.camera,o=wS();s.add(o);function h(){const rt=t.clientWidth||window.innerWidth,ot=t.clientHeight||window.innerHeight;e.setSize(rt,ot,!1),a.aspect=rt/Math.max(ot,1),a.updateProjectionMatrix()}new ResizeObserver(h).observe(t),h();const l=new Qo(n,0,18),c=new tS("https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{minZoom:0,maxZoom:18}),u=new iS({name:"osm-renderer",quality:new Ch(1)}),d=new ha({name:"OSM Basemap",tileScheme:l,dataSource:c,renderer:u,zIndex:0}),f=new oa(1e3),_=new xS(n),g=new yS,p=new ha({name:"Checkerboard",tileScheme:f,dataSource:_,renderer:g,zIndex:10}),m={type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"LineString",coordinates:[[12956500,4859500],[12957500,4859500],[12957500,4860500],[12956500,4860500],[12956500,4859500]]},properties:{name:"Ring Road",highway:"primary"}},{type:"Feature",geometry:{type:"LineString",coordinates:[[12957e3,4859e3],[12957e3,4861e3]]},properties:{name:"Main Street",highway:"secondary"}},{type:"Feature",geometry:{type:"LineString",coordinates:[[12956e3,486e4],[12958e3,486e4]]},properties:{name:"East-West Ave",highway:"secondary"}},{type:"Feature",geometry:{type:"Polygon",coordinates:[[[12956800,4859800],[12957e3,4859800],[12957e3,486e4],[12956800,486e4],[12956800,4859800]]]},properties:{name:"Building A",floors:3}},{type:"Feature",geometry:{type:"Polygon",coordinates:[[[12957100,4859700],[12957300,4859700],[12957300,4859900],[12957100,4859900],[12957100,4859700]]]},properties:{name:"Building B",floors:5}},{type:"Feature",geometry:{type:"Polygon",coordinates:[[[12956700,4860100],[12956900,4860100],[12956900,4860300],[12956700,4860300],[12956700,4860100]],[[12956750,4860150],[12956850,4860150],[12956850,4860250],[12956750,4860250],[12956750,4860150]]]},properties:{name:"Building C (with courtyard)",floors:2}},{type:"Feature",geometry:{type:"Point",coordinates:[12957e3,486e4]},properties:{name:"City Center",type:"landmark"}},{type:"Feature",geometry:{type:"Point",coordinates:[12957200,4860200]},properties:{name:"Tower",type:"landmark"}},{type:"Feature",geometry:{type:"Point",coordinates:[12956600,4859600]},properties:{name:"Entrance",type:"gate"}}]},x=new Blob([JSON.stringify(m)],{type:"application/json"}),v=URL.createObjectURL(x),y=new eS(v,n),L=new oa(500),T=new rS({pointColor:15158332,lineColor:15965202,fillColor:3447003}),b=new sS(T,"vector-renderer"),C=new th({name:"Sample Vectors",tileScheme:L,dataSource:y,renderer:b,zIndex:20}),w=async(rt,ot,ct)=>{const wt=ot.dataSource,Dt=ot.renderer,V=await wt.fetch(rt.key,rt.bounds,ct);return ct.aborted||Array.isArray(V)&&V.length===0?null:Dt.createContent(V,rt)},S=new Xo({crs:n,container:t,tileLoadFn:w,groups:[{id:"default",name:"Default",visible:!0,opacity:1,layers:[d,p,C]}],cameraController:r});S.start();const P=new Map;function k(rt,ot){rt.traverse(ct=>{if(ct instanceof Ie||ct instanceof Zi||ct instanceof xs){const wt=ct.material;wt&&"opacity"in wt&&ot(wt)}})}function B(){const rt=S.tileManager.loadedTiles,ot=S.floatingOrigin.current;s.position.set(-ot.x,-ot.y,0);for(const[ct,wt]of rt){if(P.has(ct)||wt.contents.length===0)continue;const Dt=new gn;let V=!1;for(const tt of wt.contents)for(const ft of tt.renderObjects)ft.object instanceof Pe&&(Dt.add(ft.object),V=!0);V&&(Dt.position.set(wt.origin.x,wt.origin.y,0),s.add(Dt),P.set(ct,Dt),k(Dt,tt=>{tt.__targetOpacity=tt.opacity,tt.transparent=!0,tt.opacity=0}),Dt.__fadeContent=wt.contents[0])}for(const[ct,wt]of P)rt.has(ct)||(s.remove(wt),P.delete(ct))}const q=document.getElementById("fps-value"),Y=document.getElementById("frame-time");let W=0,j=performance.now();function H(){W++;const rt=performance.now(),ot=rt-j;if(ot>=500){const ft=W*1e3/ot,dt=ot/W;q.textContent=ft.toFixed(0),q.style.color=ft>=50?"#7CFC00":ft>=30?"#FFD700":"#FF6B6B",Y.textContent=`(${dt.toFixed(1)} ms/帧)`,W=0,j=rt}const ct=r.controls.target;o.position.set(ct.x,ct.y,90);const wt=Math.max(r.resolution,1)*.9;o.scale.setScalar(wt),B();const Dt=S.floatingOrigin.current;a.position.x-=Dt.x,a.position.y-=Dt.y,e.render(i,a),a.position.x+=Dt.x,a.position.y+=Dt.y;const V=300,tt=performance.now();for(const[,ft]of P){const dt=ft.__fadeContent;if(!dt)continue;const Tt=tt-dt.createdAt,Rt=Tt>=V,Bt=Rt?1:Math.min(1,Tt/V);k(ft,Jt=>{const R=Jt.__targetOpacity??1;Jt.opacity=R*Bt,Rt&&(Jt.opacity=R,Jt.transparent=R<1,delete Jt.__targetOpacity)}),Rt&&delete ft.__fadeContent}SS(n.name,r.controls.target.x,r.controls.target.y,r.resolution,S.tileManager.loadedTiles.size,S.tileManager.scheduler.queueLength,S.tileManager.scheduler.loadingCount),requestAnimationFrame(H)}requestAnimationFrame(H)}function wS(){const t=new fh({color:16777215,transparent:!0,opacity:.6}),e=[new I(-16,0,0),new I(16,0,0)],i=[new I(0,-16,0),new I(0,16,0)],s=new Re().setFromPoints(e),r=new Re().setFromPoints(i),a=new gn;return a.add(new Zi(s,t)),a.add(new Zi(r,t)),a.position.z=90,a}ES();
