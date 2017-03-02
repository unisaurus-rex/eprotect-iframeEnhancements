/*
 * Litle & Co. Pay Page Java Script API Version: 3.2
 * Copyright © 2003-2016, Litle & Co. ALL RIGHTS RESERVED.
 * Includes litle-api3.js
 * http://www.vantiv.com/
 */
var VantiveProtectPpStatsReporter=function(){var b=0;
var c=3;var a=0;return{reportMethodInvocation:function(e){b++;if(b>c){return}e=encodeURIComponent(e);var d=new Error().stack;
if(d.length>2000){d=d.substr(0,2000)}d=encodeURIComponent(d);d=this.removeNonStandardCharacters(d);var f=new LitlePayPage().getUrl();
var g="errorHandler=PUBLIC_API_CALL&errorStack="+d+"&errorMessage="+e;setTimeout(function(){try{jQuery.getJSON(f+"/LitlePayPage/ppstats?"+g+"&jsoncallback=?",function(i){})
}catch(h){}},0)},report3rdPartyError:function(e){a++;if(a>c){return}e=encodeURIComponent(e);e=this.removeNonStandardCharacters(e);
var d=new LitlePayPage().getUrl();var f="errorHandler=3RD_PARTY_ERROR&errorStack="+e;setTimeout(function(){try{jQuery.getJSON(d+"/LitlePayPage/ppstats?"+f+"&jsoncallback=?",function(h){})
}catch(g){}},0)},removeNonStandardCharacters:function(e){var d=decodeURIComponent(e);d=d.replace(/(\r\n|\n|\r)/g," ");return encodeURIComponent(d)
}}};var myVantivEProtectReporterForPpStats=new VantiveProtectPpStatsReporter();var LitlePayPage=function(){var a={modulus:"ddaabab4a3d1df0534829d1ba0cf2253744653df3ae963727d854ef1b2e6a144ba0bd3eb958881f15829fec8b314f16321dcd1a96fe49e50f9e1069ee5fb0cb5ba85f288bcd9f4d52510142ea0a32c7bf3999fe19fc7548b004e664377b5c6c82ed14b485647b6b48434e44a919a872065e82e0b7db2d4548260e11ed4cb3267c4b22bec4df72655c6725e92b83e13b1864fd373c421fc389ce31c560f8ec5c403d9ea4e53705e826af042fa366982a3ff43e2c09b45491a14a7b5385de4c78d9584c628212d35ce4bdccfe83015c8e3f05d5416f0b7609ab2830fb4859cc6c0f1f05f0dca46796e4a4aaf55e325a7e392f17d215afbd0a16e8326c8c6892029",exponent:"10001",keyId:"27106200044"};
var b={primaryUrl:"https://request.securepaypage-litle.com",secondaryUrl:"https://secondary.securepaypage-litle.com",primaryTimeout:5000};
return{getUrl:function(){return b.primaryUrl},sendToLitle:function(aN,aq,ak,ah,L,at){
/*
			 * Copyright (c) 2003-2005  Tom Wu
			 * All Rights Reserved.
			 *
			 * Permission is hereby granted, free of charge, to any person obtaining
			 * a copy of this software and associated documentation files (the
			 * "Software"), to deal in the Software without restriction, including
			 * without limitation the rights to use, copy, modify, merge, publish,
			 * distribute, sublicense, and/or sell copies of the Software, and to
			 * permit persons to whom the Software is furnished to do so, subject to
			 * the following conditions:
			 *
			 * The above copyright notice and this permission notice shall be
			 * included in all copies or substantial portions of the Software.
			 *
			 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND,
			 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY
			 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
			 *
			 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
			 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
			 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
			 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
			 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
			 *
			 * In addition, the following condition applies:
			 *
			 * All redistributions must retain an intact copy of this copyright notice
			 * and disclaimer.
			 */
function h(bc,bb){return new a1(bc,bb)
}function aQ(bd,be){var bb="";var bc=0;while(bc+be<bd.length){bb+=bd.substring(bc,bc+be)+"\n";bc+=be}return bb+bd.substring(bc,bd.length)
}function x(bb){if(bb<16){return"0"+bb.toString(16)}else{return bb.toString(16)}}function aM(be,bh){if(bh<be.length+11){throw"Message too long for RSA"
}var bg=new Array();var bd=be.length-1;while(bd>=0&&bh>0){var bf=be.charCodeAt(bd--);if(bf<128){bg[--bh]=bf}else{if((bf>127)&&(bf<2048)){bg[--bh]=(bf&63)|128;
bg[--bh]=(bf>>6)|192}else{bg[--bh]=(bf&63)|128;bg[--bh]=((bf>>6)&63)|128;bg[--bh]=(bf>>12)|224}}}bg[--bh]=0;var bc=new aG();
var bb=new Array(bh-2);bc.nextBytes(bb);bd=0;while(bh>2){bg[--bh]=bb[bd];bd++}bg[--bh]=2;bg[--bh]=0;return new a1(bg)}function W(){this.n=null;
this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null}function s(bc,bb){if(bc!=null&&bb!=null&&bc.length>0&&bb.length>0){this.n=h(bc,16);
this.e=parseInt(bb,16)}else{throw"Error setting public key"}}function au(bb){return bb.modPowInt(this.e,this.n)}function u(bd){var bb=aM(bd,(this.n.bitLength()+7)>>3);
if(bb==null){return null}var be=this.doPublic(bb);if(be==null){return null}var bc=be.toString(16);if((bc.length&1)==0){return bc
}else{return"0"+bc}}W.prototype.doPublic=au;W.prototype.setPublic=s;W.prototype.encrypt=u;var a7;var aR=244837814094590;var ay=((aR&16777215)==15715070);
function a1(bc,bb,bd){if(bc!=null){if("number"==typeof bc){this.fromNumber(bc,bb,bd)}else{if(bb==null&&"string"!=typeof bc){this.fromString(bc,256)
}else{this.fromString(bc,bb)}}}}function k(){return new a1(null)}function c(bf,bb,bc,be,bh,bg){while(--bg>=0){var bd=bb*this[bf++]+bc[be]+bh;
bh=Math.floor(bd/67108864);bc[be++]=bd&67108863}return bh}function a9(bf,bk,bl,be,bi,bb){var bh=bk&32767,bj=bk>>15;while(--bb>=0){var bd=this[bf]&32767;
var bg=this[bf++]>>15;var bc=bj*bd+bg*bh;bd=bh*bd+((bc&32767)<<15)+bl[be]+(bi&1073741823);bi=(bd>>>30)+(bc>>>15)+bj*bg+(bi>>>30);
bl[be++]=bd&1073741823}return bi}function a8(bf,bk,bl,be,bi,bb){var bh=bk&16383,bj=bk>>14;while(--bb>=0){var bd=this[bf]&16383;
var bg=this[bf++]>>14;var bc=bj*bd+bg*bh;bd=bh*bd+((bc&16383)<<14)+bl[be]+bi;bi=(bd>>28)+(bc>>14)+bj*bg;bl[be++]=bd&268435455
}return bi}if(ay&&(navigator.appName=="Microsoft Internet Explorer")){a1.prototype.am=a9;a7=30}else{if(ay&&(navigator.appName!="Netscape")){a1.prototype.am=c;
a7=26}else{a1.prototype.am=a8;a7=28}}a1.prototype.DB=a7;a1.prototype.DM=((1<<a7)-1);a1.prototype.DV=(1<<a7);var aB=52;a1.prototype.FV=Math.pow(2,aB);
a1.prototype.F1=aB-a7;a1.prototype.F2=2*a7-aB;var aJ="0123456789abcdefghijklmnopqrstuvwxyz";var aP=new Array();var aY,D;aY="0".charCodeAt(0);
for(D=0;D<=9;++D){aP[aY++]=D}aY="a".charCodeAt(0);for(D=10;D<36;++D){aP[aY++]=D}aY="A".charCodeAt(0);for(D=10;D<36;++D){aP[aY++]=D
}function ba(bb){return aJ.charAt(bb)}function H(bc,bb){var bd=aP[bc.charCodeAt(bb)];return(bd==null)?-1:bd}function ax(bc){for(var bb=this.t-1;
bb>=0;--bb){bc[bb]=this[bb]}bc.t=this.t;bc.s=this.s}function r(bb){this.t=1;this.s=(bb<0)?-1:0;if(bb>0){this[0]=bb}else{if(bb<-1){this[0]=bb+DV
}else{this.t=0}}}function f(bb){var bc=k();bc.fromInt(bb);return bc}function E(bh,bc){var be;if(bc==16){be=4}else{if(bc==8){be=3
}else{if(bc==256){be=8}else{if(bc==2){be=1}else{if(bc==32){be=5}else{if(bc==4){be=2}else{this.fromRadix(bh,bc);return}}}}}}this.t=0;
this.s=0;var bg=bh.length,bd=false,bf=0;while(--bg>=0){var bb=(be==8)?bh[bg]&255:H(bh,bg);if(bb<0){if(bh.charAt(bg)=="-"){bd=true
}continue}bd=false;if(bf==0){this[this.t++]=bb}else{if(bf+be>this.DB){this[this.t-1]|=(bb&((1<<(this.DB-bf))-1))<<bf;this[this.t++]=(bb>>(this.DB-bf))
}else{this[this.t-1]|=bb<<bf}}bf+=be;if(bf>=this.DB){bf-=this.DB}}if(be==8&&(bh[0]&128)!=0){this.s=-1;if(bf>0){this[this.t-1]|=((1<<(this.DB-bf))-1)<<bf
}}this.clamp();if(bd){a1.ZERO.subTo(this,this)}}function Y(){var bb=this.s&this.DM;while(this.t>0&&this[this.t-1]==bb){--this.t
}}function w(bc){if(this.s<0){return"-"+this.negate().toString(bc)}var bd;if(bc==16){bd=4}else{if(bc==8){bd=3}else{if(bc==2){bd=1
}else{if(bc==32){bd=5}else{if(bc==4){bd=2}else{return this.toRadix(bc)}}}}}var bf=(1<<bd)-1,bi,bb=false,bg="",be=this.t;var bh=this.DB-(be*this.DB)%bd;
if(be-->0){if(bh<this.DB&&(bi=this[be]>>bh)>0){bb=true;bg=ba(bi)}while(be>=0){if(bh<bd){bi=(this[be]&((1<<bh)-1))<<(bd-bh);
bi|=this[--be]>>(bh+=this.DB-bd)}else{bi=(this[be]>>(bh-=bd))&bf;if(bh<=0){bh+=this.DB;--be}}if(bi>0){bb=true}if(bb){bg+=ba(bi)
}}}return bb?bg:"0"}function ae(){var bb=k();a1.ZERO.subTo(this,bb);return bb}function aV(){return(this.s<0)?this.negate():this
}function Q(bb){var bd=this.s-bb.s;if(bd!=0){return bd}var bc=this.t;bd=bc-bb.t;if(bd!=0){return bd}while(--bc>=0){if((bd=this[bc]-bb[bc])!=0){return bd
}}return 0}function m(bb){var bd=1,bc;if((bc=bb>>>16)!=0){bb=bc;bd+=16}if((bc=bb>>8)!=0){bb=bc;bd+=8}if((bc=bb>>4)!=0){bb=bc;
bd+=4}if((bc=bb>>2)!=0){bb=bc;bd+=2}if((bc=bb>>1)!=0){bb=bc;bd+=1}return bd}function B(){if(this.t<=0){return 0}return this.DB*(this.t-1)+m(this[this.t-1]^(this.s&this.DM))
}function aZ(bd,bc){var bb;for(bb=this.t-1;bb>=0;--bb){bc[bb+bd]=this[bb]}for(bb=bd-1;bb>=0;--bb){bc[bb]=0}bc.t=this.t+bd;
bc.s=this.s}function aw(bd,bc){for(var bb=bd;bb<this.t;++bb){bc[bb-bd]=this[bb]}bc.t=Math.max(this.t-bd,0);bc.s=this.s}function A(bi,be){var bc=bi%this.DB;
var bb=this.DB-bc;var bg=(1<<bb)-1;var bf=Math.floor(bi/this.DB),bh=(this.s<<bc)&this.DM,bd;for(bd=this.t-1;bd>=0;--bd){be[bd+bf+1]=(this[bd]>>bb)|bh;
bh=(this[bd]&bg)<<bc}for(bd=bf-1;bd>=0;--bd){be[bd]=0}be[bf]=bh;be.t=this.t+bf+1;be.s=this.s;be.clamp()}function n(bh,be){be.s=this.s;
var bf=Math.floor(bh/this.DB);if(bf>=this.t){be.t=0;return}var bc=bh%this.DB;var bb=this.DB-bc;var bg=(1<<bc)-1;be[0]=this[bf]>>bc;
for(var bd=bf+1;bd<this.t;++bd){be[bd-bf-1]|=(this[bd]&bg)<<bb;be[bd-bf]=this[bd]>>bc}if(bc>0){be[this.t-bf-1]|=(this.s&bg)<<bb
}be.t=this.t-bf;be.clamp()}function aC(bc,be){var bd=0,bf=0,bb=Math.min(bc.t,this.t);while(bd<bb){bf+=this[bd]-bc[bd];be[bd++]=bf&this.DM;
bf>>=this.DB}if(bc.t<this.t){bf-=bc.s;while(bd<this.t){bf+=this[bd];be[bd++]=bf&this.DM;bf>>=this.DB}bf+=this.s}else{bf+=this.s;
while(bd<bc.t){bf-=bc[bd];be[bd++]=bf&this.DM;bf>>=this.DB}bf-=bc.s}be.s=(bf<0)?-1:0;if(bf<-1){be[bd++]=this.DV+bf}else{if(bf>0){be[bd++]=bf
}}be.t=bd;be.clamp()}function N(bc,be){var bb=this.abs(),bf=bc.abs();var bd=bb.t;be.t=bd+bf.t;while(--bd>=0){be[bd]=0}for(bd=0;
bd<bf.t;++bd){be[bd+bb.t]=bb.am(0,bf[bd],be,bd,0,bb.t)}be.s=0;be.clamp();if(this.s!=bc.s){a1.ZERO.subTo(be,be)}}function aa(bd){var bb=this.abs();
var bc=bd.t=2*bb.t;while(--bc>=0){bd[bc]=0}for(bc=0;bc<bb.t-1;++bc){var be=bb.am(bc,bb[bc],bd,2*bc,0,1);if((bd[bc+bb.t]+=bb.am(bc+1,2*bb[bc],bd,2*bc+1,be,bb.t-bc-1))>=bb.DV){bd[bc+bb.t]-=bb.DV;
bd[bc+bb.t+1]=1}}if(bd.t>0){bd[bd.t-1]+=bb.am(bc,bb[bc],bd,2*bc,0,1)}bd.s=0;bd.clamp()}function O(bk,bh,bg){var bq=bk.abs();
if(bq.t<=0){return}var bi=this.abs();if(bi.t<bq.t){if(bh!=null){bh.fromInt(0)}if(bg!=null){this.copyTo(bg)}return}if(bg==null){bg=k()
}var be=k(),bb=this.s,bj=bk.s;var bp=this.DB-m(bq[bq.t-1]);if(bp>0){bq.lShiftTo(bp,be);bi.lShiftTo(bp,bg)}else{bq.copyTo(be);
bi.copyTo(bg)}var bm=be.t;var bc=be[bm-1];if(bc==0){return}var bl=bc*(1<<this.F1)+((bm>1)?be[bm-2]>>this.F2:0);var bt=this.FV/bl,bs=(1<<this.F1)/bl,br=1<<this.F2;
var bo=bg.t,bn=bo-bm,bf=(bh==null)?k():bh;be.dlShiftTo(bn,bf);if(bg.compareTo(bf)>=0){bg[bg.t++]=1;bg.subTo(bf,bg)}a1.ONE.dlShiftTo(bm,bf);
bf.subTo(be,be);while(be.t<bm){be[be.t++]=0}while(--bn>=0){var bd=(bg[--bo]==bc)?this.DM:Math.floor(bg[bo]*bt+(bg[bo-1]+br)*bs);
if((bg[bo]+=be.am(0,bd,bg,bn,0,bm))<bd){be.dlShiftTo(bn,bf);bg.subTo(bf,bg);while(bg[bo]<--bd){bg.subTo(bf,bg)}}}if(bh!=null){bg.drShiftTo(bm,bh);
if(bb!=bj){a1.ZERO.subTo(bh,bh)}}bg.t=bm;bg.clamp();if(bp>0){bg.rShiftTo(bp,bg)}if(bb<0){a1.ZERO.subTo(bg,bg)}}function X(bb){var bc=k();
this.abs().divRemTo(bb,null,bc);if(this.s<0&&bc.compareTo(a1.ZERO)>0){bb.subTo(bc,bc)}return bc}function U(bb){this.m=bb}function an(bb){if(bb.s<0||bb.compareTo(this.m)>=0){return bb.mod(this.m)
}else{return bb}}function aU(bb){return bb}function T(bb){bb.divRemTo(this.m,null,bb)}function R(bb,bd,bc){bb.multiplyTo(bd,bc);
this.reduce(bc)}function a4(bb,bc){bb.squareTo(bc);this.reduce(bc)}U.prototype.convert=an;U.prototype.revert=aU;U.prototype.reduce=T;
U.prototype.mulTo=R;U.prototype.sqrTo=a4;function J(){if(this.t<1){return 0}var bb=this[0];if((bb&1)==0){return 0}var bc=bb&3;
bc=(bc*(2-(bb&15)*bc))&15;bc=(bc*(2-(bb&255)*bc))&255;bc=(bc*(2-(((bb&65535)*bc)&65535)))&65535;bc=(bc*(2-bb*bc%this.DV))%this.DV;
return(bc>0)?this.DV-bc:-bc}function g(bb){this.m=bb;this.mp=bb.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<(bb.DB-15))-1;
this.mt2=2*bb.t}function aT(bb){var bc=k();bb.abs().dlShiftTo(this.m.t,bc);bc.divRemTo(this.m,null,bc);if(bb.s<0&&bc.compareTo(a1.ZERO)>0){this.m.subTo(bc,bc)
}return bc}function a2(bb){var bc=k();bb.copyTo(bc);this.reduce(bc);return bc}function Z(bb){while(bb.t<=this.mt2){bb[bb.t++]=0
}for(var bd=0;bd<this.m.t;++bd){var bc=bb[bd]&32767;var be=(bc*this.mpl+(((bc*this.mph+(bb[bd]>>15)*this.mpl)&this.um)<<15))&bb.DM;
bc=bd+this.m.t;bb[bc]+=this.m.am(0,be,bb,bd,0,this.m.t);while(bb[bc]>=bb.DV){bb[bc]-=bb.DV;bb[++bc]++}}bb.clamp();bb.drShiftTo(this.m.t,bb);
if(bb.compareTo(this.m)>=0){bb.subTo(this.m,bb)}}function aW(bb,bc){bb.squareTo(bc);this.reduce(bc)}function G(bb,bd,bc){bb.multiplyTo(bd,bc);
this.reduce(bc)}g.prototype.convert=aT;g.prototype.revert=a2;g.prototype.reduce=Z;g.prototype.mulTo=G;g.prototype.sqrTo=aW;
function l(){return((this.t>0)?(this[0]&1):this.s)==0}function F(bg,bh){if(bg>4294967295||bg<1){return a1.ONE}var bf=k(),bb=k(),be=bh.convert(this),bd=m(bg)-1;
be.copyTo(bf);while(--bd>=0){bh.sqrTo(bf,bb);if((bg&(1<<bd))>0){bh.mulTo(bb,be,bf)}else{var bc=bf;bf=bb;bb=bc}}return bh.revert(bf)
}function aX(bc,bb){var bd;if(bc<256||bb.isEven()){bd=new U(bb)}else{bd=new g(bb)}return this.exp(bc,bd)}a1.prototype.copyTo=ax;
a1.prototype.fromInt=r;a1.prototype.fromString=E;a1.prototype.clamp=Y;a1.prototype.dlShiftTo=aZ;a1.prototype.drShiftTo=aw;
a1.prototype.lShiftTo=A;a1.prototype.rShiftTo=n;a1.prototype.subTo=aC;a1.prototype.multiplyTo=N;a1.prototype.squareTo=aa;
a1.prototype.divRemTo=O;a1.prototype.invDigit=J;a1.prototype.isEven=l;a1.prototype.exp=F;a1.prototype.toString=w;a1.prototype.negate=ae;
a1.prototype.abs=aV;a1.prototype.compareTo=Q;a1.prototype.bitLength=B;a1.prototype.mod=X;a1.prototype.modPowInt=aX;a1.ZERO=f(0);
a1.ONE=f(1);function aG(){}aG.prototype.nextBytes=rng_get_bytes;var aA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var ar="=";function aH(bd){var bc;var be;var bb="";for(bc=0;bc+3<=bd.length;bc+=3){be=parseInt(bd.substring(bc,bc+3),16);
bb+=aA.charAt(be>>6)+aA.charAt(be&63)}if(bc+1==bd.length){be=parseInt(bd.substring(bc,bc+1),16);bb+=aA.charAt(be<<2)}else{if(bc+2==bd.length){be=parseInt(bd.substring(bc,bc+2),16);
bb+=aA.charAt(be>>2)+aA.charAt((be&3)<<4)}}while((bb.length&3)>0){bb+=ar}return bb}function d(bf){var bd="";var be;var bb=0;
var bc;for(be=0;be<bf.length;++be){if(bf.charAt(be)==ar){break}v=aA.indexOf(bf.charAt(be));if(v<0){continue}if(bb==0){bd+=ba(v>>2);
bc=v&3;bb=1}else{if(bb==1){bd+=ba((bc<<2)|(v>>4));bc=v&15;bb=2}else{if(bb==2){bd+=ba(bc);bd+=ba(v>>2);bc=v&3;bb=3}else{bd+=ba((bc<<2)|(v>>4));
bd+=ba(v&15);bb=0}}}}if(bb==1){bd+=ba(bc<<2)}return bd}function am(be){var bd=d(be);var bc;var bb=new Array();for(bc=0;2*bc<bd.length;
++bc){bb[bc]=parseInt(bd.substring(2*bc,2*bc+2),16)}return bb}var q=null;var p=null;var j=true;var aS=false;try{var z=new Date().getTime();
var aO=0;var ac=0;var i=null;var V=null;var ap=o(at);y(aN);setTimeout(S,10);t();var ad=null;var az=null;var aF=null;var P=null;
var a6;var af;var ai;var ag}catch(aE){aK(aE)}function ab(bb){var bc;if(bb){bc=b.primaryUrl+"/LitlePayPage/paypage?"+i+"&targetServer=primary";
jQuery.getJSON(bc+"&jsoncallback=?",function(bd){p=bd})}else{bc=b.secondaryUrl+"/LitlePayPage/paypage?"+i+"&targetServer=secondary";
jQuery.getJSON(bc+"&jsoncallback=?",function(bd){q=bd})}}function aj(be,bp,bo,bk,bf){try{var bl=new Date();var bm=bl.getTime();
var bj=bm-be;var br=0;if(bo){br=bo}var bi=encodeURIComponent(bk.paypageId);var bn=encodeURIComponent(bk.reportGroup);var bd=encodeURIComponent(bk.orderId);
var bg=encodeURIComponent(bk.id);var bc;var bq="secondary";if(bf){bc=b.primaryUrl;bq="primary"}else{bc=b.secondaryUrl}var bb="paypageId="+bi+"&responseTime="+bj+"&responseCode="+bp+"&tzOffset="+bl.getTimezoneOffset()+"&timeout="+br;
bb+="&reportGroup="+bn+"&txnId="+bg+"&orderId="+bd+"&startTime="+z+"&targetServer="+bq;setTimeout(function(){try{jQuery.getJSON(bc+"/LitlePayPage/ppstats?"+bb+"&jsoncallback=?",function(bt){})
}catch(bs){}},0)}catch(bh){}}function y(bb){if(bb!==undefined&&bb.url!=undefined&&bb.url!=null&&bb.url.length>0){b.primaryUrl=bb.url;
if(bb.secondaryUrl!=undefined&&bb.secondaryUrl!=null&&bb.secondaryUrl.length>0){b.secondaryUrl=bb.secondaryUrl}}j=true;if((ap>0&&ap<=b.primaryTimeout)||(b.secondaryUrl==undefined||b.secondaryUrl==null||b.secondaryUrl.length==0)){j=false
}}function S(){try{aO=new Date().getTime()-z;if(V!=null){aI(V);return}if(ap>0&&aO>ap){aS=true}if(j){switch(ac){case 0:break;
case 1:if(p!=null){aj(z,p.response,ap,aN,true);if(p.response=="889"){ac=3;ab(false)}else{a0(p);return}}else{if(aO>b.primaryTimeout){ac=2;
ab(false)}}break;case 2:if(p!=null){aj(z,p.response,ap,aN,true);if(p.response=="889"){ac=3}else{a0(p);return}}else{if(q!=null){aj(z,q.response,ap,aN,false);
if(q.response!="887"&&q.response!="889"){a0(q);return}else{ac=4}}}break;case 3:if(q!=null){aj(z,q.response,ap,aN,false);if(q.response=="887"){a0(p)
}else{a0(q)}return}else{if(aS){a0(p);return}}break;case 4:if(p!=null){aj(z,p.response,ap,aN,true);a0(p);return}else{if(aS){if(q.response=="887"){aD()
}else{a0(q)}return}}break;default:break}}else{if(p!=null){aj(z,p.response,at,aN,true);a0(p);return}}if(aS){if(ac==0){aj(z,"900",ap,aN,true)
}else{aj(z,"901",ap,aN,true)}aD()}else{setTimeout(arguments.callee,10)}}catch(bb){aK(bb);if(V!=null){a0(V);return}}}function aK(bg){try{var bi=encodeURIComponent("GLOBAL_TRY_CATCH");
var bf=encodeURIComponent(0);var bc=encodeURIComponent(0);var bj=encodeURIComponent("A");var bo=encodeURIComponent("NOT_A_STRING");
if(typeof bg==="object"){try{if(typeof bg.message==="undefined"){bj="undefined"}else{if(typeof bg.message==="string"){bj=bg.message;
if(bj.length>1024){bj=bj.substr(0,1024)}}else{bj="NOT_A_STRING"}}}catch(bk){bj="UNABLE_TO_GET_ERROR_FROM_OBJECT"}finally{bj=encodeURIComponent(bj)
}try{if(typeof bg.stack==="undefined"){bf=encodeURIComponent("UNDEFINED");bc=encodeURIComponent("UNDEFINED");bo=encodeURIComponent("UNDEFINED")
}else{if(typeof bg.stack==="string"){bo=bg.stack;if(bo.length>3072){bo=bo.substr(0,3072)}var bh=/.*?litle-api.*?\.js:(\d+):(\d+)/.exec(bo);
bo=encodeURIComponent(bo);if(!/^\d+$/.test(bh[1])){bf="NaN"}else{if(!/^\d{0,6}$/.test(bh[1])){bf="TOO_BIG"}else{bf=bh[1]}}bf=encodeURIComponent(bf);
if(!/^\d+$/.test(bh[2])){bc="NaN"}else{if(!/^\d{0,6}$/.test(bh[2])){bc="TOO_BIG"}else{bc=bh[2]}}bc=encodeURIComponent(bc)
}}}catch(bk){bf=encodeURIComponent("EXCEPTION");bc=encodeURIComponent("EXCEPTION");if(bo.length>2000){bo=bo.substr(0,2000)
}bo=encodeURIComponent(bo)}}else{if(typeof bg==="string"){if(bg.length>1024){bg=bg.substr(0,1024)}bj=encodeURIComponent(bg)
}}if(typeof aN==="object"){try{var bm="undefined";if(typeof aN.paypageId==="undefined"){bm="undefined"}else{if(typeof aN.paypageId==="string"){bm=aN.paypageId;
if(bm.length>50){bm=bm.substr(0,50)}}else{bm="NOT_A_STRING"}}}catch(bk){bm="UNABLE_TO_GET_PAYPAGE_ID"}finally{bm=encodeURIComponent(bm)
}var be="undefined";try{if(typeof aN.orderId==="undefined"){be="undefined"}else{if(typeof aN.orderId==="string"){be=aN.orderId;
if(be.length>32){be=be.substr(0,32)}}else{be="NOT_A_STRING"}}}catch(bk){be="UNABLE_TO_GET_ORDER_ID"}finally{be=encodeURIComponent(be)
}var bd="undefined";try{if(typeof aN.reportGroup==="undefined"){bd="undefined"}else{if(typeof aN.reportGroup==="string"){bd=aN.reportGroup;
if(bd.length>32){bd=bd.substr(0,32)}}else{bd="NOT_A_STRING"}}}catch(bk){bd="UNABLE_TO_GET_REPORT_GROUP"}finally{bd=encodeURIComponent(bd)
}}bj=myVantivEProtectReporterForPpStats.removeNonStandardCharacters(bj);bo=myVantivEProtectReporterForPpStats.removeNonStandardCharacters(bo);
var bb="errorHandler="+bi+"&columnNumber="+bc+"&errorMessage="+bj+"&lineNumber="+bf+"&paypageId="+bm+"&orderId="+be+"&reportGroup="+bd+"&errorStack="+bo;
var bn="https://request.securepaypage-litle.com/LitlePayPage/ppstats?"+bb+"&jsoncallback=?";setTimeout(function(){try{jQuery.getJSON(bn,function(bq){})
}catch(bp){}},0)}catch(bl){}finally{e("889",bg)}}function t(){if(aq===undefined){return e("889","Missing litleFormFields")
}if(aN===undefined){return e("889","Missing litleRequest")}if(aq.paypageRegistrationId){aq.paypageRegistrationId.value=""
}if(aq.bin){aq.bin.value=""}ai=true;ag=false;if(aN.applepay!==undefined){if(aN.applepay.data!==undefined&&aN.applepay.signature!==undefined&&aN.applepay.version!==undefined&&aN.applepay.header.ephemeralPublicKey!==undefined&&aN.applepay.header.publicKeyHash!==undefined&&aN.applepay.header.transactionId!==undefined){ai=false;
ag=true}else{return e("889","Missing ApplePay elements")}}if(ai){try{a3("accountNum",aq.accountNum,aL,M)}catch(bl){return e("889",bl)
}a6=aq.accountNum.value;a6=ao(a6);af=(jQuery(aq.cvv2).length>0);if(af){var bh=aq.cvv2.value;bh=ao(bh)}if(aN.pciNonSensitive===undefined){aN.pciNonSensitive=false
}var bb=al(a6,aN.pciNonSensitive);if(bb!="870"){return e(bb)}if(af){bb=av(bh);if(bb!="870"){return e(bb)}}try{var bg=new W();
var be=bg.setPublic(a.modulus,a.exponent);var bk=bg.encrypt(a6);if(af){var bj=bg.encrypt(bh)}}catch(bl){myVantivEProtectReporterForPpStats.report3rdPartyError(bl);
return e("875")}if(bk){var bi=aH(bk);var bf=encodeURIComponent(bi);if(af){var bd=aH(bj);var bm=encodeURIComponent(bd)}}else{return e("875")
}}try{a3("paypageId",aN.paypageId,aL,M,a5);a3("reportGroup",aN.reportGroup,aL,M);a3("id",aN.id,aL,M)}catch(bl){return e("889",bl)
}ad=encodeURIComponent(aN.paypageId);az=encodeURIComponent(aN.reportGroup);aF=encodeURIComponent(aN.orderId);P=encodeURIComponent(aN.id);
i="paypageId="+ad+"&reportGroup="+az+"&id="+P+"&orderId="+aF;if(ai){var bc=encodeURIComponent(aN.pciNonSensitive);i+="&encryptedAccount="+bf+"&publicKeyId="+a.keyId+"&pciNonSensitive="+bc
}if(ag){i+="&applepay.data="+encodeURIComponent(aN.applepay.data);i+="&applepay.signature="+encodeURIComponent(aN.applepay.signature);
i+="&applepay.version="+encodeURIComponent(aN.applepay.version);i+="&applepay.header.ephemeralPublicKey="+encodeURIComponent(aN.applepay.header.ephemeralPublicKey);
i+="&applepay.header.publicKeyHash="+encodeURIComponent(aN.applepay.header.publicKeyHash);i+="&applepay.header.transactionId="+encodeURIComponent(aN.applepay.header.transactionId);
if(aN.applepay.header.applicationData!==undefined){i+="&applepay.header.applicationData="+encodeURIComponent(aN.applepay.header.applicationData)
}}if(af){i+="&encryptedCvv="+bm}ac=1;ab(true)}function o(bc){if(bc!=undefined){if(typeof bc=="number"){return bc}else{if(typeof bc=="string"){var bb=/^[0-9]+$/.test(bc);
if(bb){return parseInt(bc)}return 15000}}}return 0}function K(bd){if(ai){var be=ao(a6);aq.accountNum.value=C(a6);bd.firstSix=be.substring(0,6);
bd.lastFour=be.substring(be.length-4,be.length);if(aq.extraAccountNums){for(var bc in aq.extraAccountNums){var bb=aq.extraAccountNums[bc];
bb.value=C(ao(bb.value))}}if(af){aq.cvv2.value="000"}}if(aq.bin){aq.bin.value=bd.bin}if(aq.paypageRegistrationId){aq.paypageRegistrationId.value=bd.paypageRegistrationId
}if(ak===undefined){throw"successCallback undefined"}if(typeof ak!=="function"){throw"successCallback not a function"}ak(bd)
}function aI(bb){if(ah===undefined){throw"errorCallback undefined"}if(typeof ah!=="function"){throw"errorCallback not a function"
}ah(bb)}function aD(){L()}function a0(bb){if(bb.response=="870"){K(bb)}else{aI(bb)}return}function C(bb){if(!bb){return bb
}bb=bb.substring(0,bb.length-4).replace(/./g,"X").concat(bb.substring(bb.length-4));return bb}function I(bb){bb=(bb+"").split("").reverse();
if(!bb.length){return false}var bd=0,bc;for(bc=0;bc<bb.length;bc++){bb[bc]=parseInt(bb[bc]);bd+=bc%2?2*bb[bc]-(bb[bc]>4?9:0):bb[bc]
}return(bd%10)==0}function al(bc,bb){if(bc.length<13){return"872"}else{if(bc.length>19){return"873"}else{if(!bc.match(/^[0-9]{13,19}$/)){return"874"
}else{if(!bb&&!I(bc)){return"871"}else{return"870"}}}}}function av(bb){if(bb.length<3){return"882"}else{if(bb.length>4){return"883"
}else{if(!bb.match(/^\d\d\d\d?$/)){return"881"}else{return"870"}}}}function a3(){var bc=arguments[0];var bd=arguments[1];
if(bd===undefined){throw"Parameter "+bc+" is undefined"}for(var bb=2;bb<arguments.length;bb++){arguments[bb](bc,bd)}}function aL(bb,bc){if(bc.length==0){throw"Parameter "+bb+" is required"
}}function M(bb,bc){if(bc.length>1024){throw"Parameter "+bb+" is too long.  Length is "+bc.length}}function a5(bb,bc){if(!bc.match(/^[0-9a-zA-Z]+$/)){throw"Parameter "+bb+" with value "+bc+" is not alphanumeric"
}}function e(bf,be){var bg={response:null,message:null};var bc={"870":"Success","871":"Account number not mod10","872":"Account number too short","873":"Account number too long","874":"Account number not numeric","875":"Unable to encrypt field","876":"Account number invalid","881":"Card validation num not numeric","882":"Card validation num too short","883":"Card validation num too long","889":"Failure"};
function bb(bh){return bh<10?"0"+bh:bh}function bd(bh){return bh.getUTCFullYear()+"-"+bb(bh.getUTCMonth()+1)+"-"+bb(bh.getUTCDate())+"T"+bb(bh.getUTCHours())+":"+bb(bh.getUTCMinutes())+":"+bb(bh.getUTCSeconds())
}bg.response=bf;if(be==undefined){bg.message=bc[bf]}else{bg.message=be}bg.responseTime=bd(new Date());if(aN!==undefined){bg.reportGroup=aN.reportGroup;
bg.id=aN.id;bg.orderId=aN.orderId}V=bg}function ao(bb){return bb.replace(/[ -]/gi,"")}}}};function rng_get_bytes(l){var d=0;
var b;var p;var o;var j;var k;try{if(window.crypto&&window.crypto.getRandomValues){b=new Int8Array(l.length);window.crypto.getRandomValues(b);
for(p=0;p<b.length;++p){while(b[p]==0){j=new Int8Array(1);window.crypto.getRandomValues(j);b[p]=j[0]}l[d++]=b[p]}}else{if(window.msCrypto&&window.msCrypto.getRandomValues){b=new Int8Array(l.length);
window.msCrypto.getRandomValues(b);for(p=0;p<b.length;++p){while(b[p]==0){j=new Int8Array(1);window.msCrypto.getRandomValues(j);
b[p]=j[0]}l[d++]=b[p]}}else{o=sjcl.random.randomWords((l.length/4)+1,0);var h=0;while(d<o.length){var f=o[d++];var m=f>>0&255;
var n=f>>8&255;var a=f>>16&255;var g=f>>24&255;while(m==0||n==0||a==0||g==0){k=new Array();k=sjcl.random.randomWords(1,0);
f=k[0];m=f>>0&255;n=f>>8&255;a=f>>16&255;g=f>>24&255}if(h<l.length){l[h++]=m}if(h<l.length){l[h++]=n}if(h<l.length){l[h++]=a
}if(h<l.length){l[h++]=g}}}}}catch(i){for(p=0;p<l.length;++p){var c=Math.floor((Math.random()*255)+1);while(c==0){c=Math.floor((Math.random()*255)+1)
}l[d++]=c}}return 1}"use strict";var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message
};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message
};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};sjcl.cipher.aes=function(h){if(!this._tables[0][0][0]){this._precompute()
}var d,c,e,g,l,f=this._tables[0][4],k=this._tables[1],a=h.length,b=1;if(a!==4&&a!==6&&a!==8){throw new sjcl.exception.invalid("invalid aes key size")
}this._key=[g=h.slice(0),l=[]];for(d=a;d<4*a+28;d++){e=g[d-1];if(d%a===0||(a===8&&d%a===4)){e=f[e>>>24]<<24^f[e>>16&255]<<16^f[e>>8&255]<<8^f[e&255];
if(d%a===0){e=e<<8^e>>>24^b<<24;b=b<<1^(b>>7)*283}}g[d]=g[d-a]^e}for(c=0;d;c++,d--){e=g[c&3?d:d-4];if(d<=4||c<4){l[c]=e}else{l[c]=k[0][f[e>>>24]]^k[1][f[e>>16&255]]^k[2][f[e>>8&255]]^k[3][f[e&255]]
}}};sjcl.cipher.aes.prototype={encrypt:function(a){return this._crypt(a,0)},decrypt:function(a){return this._crypt(a,1)},_tables:[[[],[],[],[],[]],[[],[],[],[],[]]],_precompute:function(){var j=this._tables[0],q=this._tables[1],h=j[4],n=q[4],g,l,f,k=[],c=[],b,p,m,o,e,a;
for(g=0;g<256;g++){c[(k[g]=g<<1^(g>>7)*283)^g]=g}for(l=f=0;!h[l];l^=b||1,f=c[f]||1){o=f^f<<1^f<<2^f<<3^f<<4;o=o>>8^o&255^99;
h[l]=o;n[o]=l;m=k[p=k[b=k[l]]];a=m*16843009^p*65537^b*257^l*16843008;e=k[o]*257^o*16843008;for(g=0;g<4;g++){j[g][l]=e=e<<24^e>>>8;
q[g][o]=a=a<<24^a>>>8}}for(g=0;g<5;g++){j[g]=j[g].slice(0);q[g]=q[g].slice(0)}},_crypt:function(k,n){if(k.length!==4){throw new sjcl.exception.invalid("invalid aes block size")
}var z=this._key[n],w=k[0]^z[0],u=k[n?3:1]^z[1],t=k[2]^z[2],s=k[n?1:3]^z[3],x,e,m,y=z.length/4-2,p,o=4,q=[0,0,0,0],r=this._tables[n],j=r[0],h=r[1],g=r[2],f=r[3],l=r[4];
for(p=0;p<y;p++){x=j[w>>>24]^h[u>>16&255]^g[t>>8&255]^f[s&255]^z[o];e=j[u>>>24]^h[t>>16&255]^g[s>>8&255]^f[w&255]^z[o+1];
m=j[t>>>24]^h[s>>16&255]^g[w>>8&255]^f[u&255]^z[o+2];s=j[s>>>24]^h[w>>16&255]^g[u>>8&255]^f[t&255]^z[o+3];o+=4;w=x;u=e;t=m
}for(p=0;p<4;p++){q[n?3&-p:p]=l[w>>>24]<<24^l[u>>16&255]<<16^l[t>>8&255]<<8^l[s&255]^z[o++];x=w;w=u;u=t;t=s;s=x}return q}};
sjcl.bitArray={bitSlice:function(b,c,d){b=sjcl.bitArray._shiftRight(b.slice(c/32),32-(c&31)).slice(1);return(d===undefined)?b:sjcl.bitArray.clamp(b,d-c)
},extract:function(c,d,f){var b,e=Math.floor((-d-f)&31);if((d+f-1^d)&-32){b=(c[d/32|0]<<(32-e))^(c[d/32+1|0]>>>e)}else{b=c[d/32|0]>>>e
}return b&((1<<f)-1)},concat:function(c,a){if(c.length===0||a.length===0){return c.concat(a)}var d=c[c.length-1],b=sjcl.bitArray.getPartial(d);
if(b===32){return c.concat(a)}else{return sjcl.bitArray._shiftRight(a,b,d|0,c.slice(0,c.length-1))}},bitLength:function(d){var c=d.length,b;
if(c===0){return 0}b=d[c-1];return(c-1)*32+sjcl.bitArray.getPartial(b)},clamp:function(d,b){if(d.length*32<b){return d}d=d.slice(0,Math.ceil(b/32));
var c=d.length;b=b&31;if(c>0&&b){d[c-1]=sjcl.bitArray.partial(b,d[c-1]&2147483648>>(b-1),1)}return d},partial:function(b,a,c){if(b===32){return a
}return(c?a|0:a<<(32-b))+b*1099511627776},getPartial:function(a){return Math.round(a/1099511627776)||32},equal:function(e,d){if(sjcl.bitArray.bitLength(e)!==sjcl.bitArray.bitLength(d)){return false
}var c=0,f;for(f=0;f<e.length;f++){c|=e[f]^d[f]}return(c===0)},_shiftRight:function(d,c,h,f){var g,b=0,e;if(f===undefined){f=[]
}for(;c>=32;c-=32){f.push(h);h=0}if(c===0){return f.concat(d)}for(g=0;g<d.length;g++){f.push(h|d[g]>>>c);h=d[g]<<(32-c)}b=d.length?d[d.length-1]:0;
e=sjcl.bitArray.getPartial(b);f.push(sjcl.bitArray.partial(c+e&31,(c+e>32)?h:f.pop(),1));return f},_xor4:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]
},byteswapM:function(c){var e,d,b=65280;for(e=0;e<c.length;++e){d=c[e];c[e]=(d>>>24)|((d>>>8)&b)|((d&b)<<8)|(d<<24)}return c
}};sjcl.codec.utf8String={fromBits:function(a){var b="",e=sjcl.bitArray.bitLength(a),d,c;for(d=0;d<e/8;d++){if((d&3)===0){c=a[d/4]
}b+=String.fromCharCode(c>>>24);c<<=8}return decodeURIComponent(escape(b))},toBits:function(d){d=unescape(encodeURIComponent(d));
var a=[],c,b=0;for(c=0;c<d.length;c++){b=b<<8|d.charCodeAt(c);if((c&3)===3){a.push(b);b=0}}if(c&3){a.push(sjcl.bitArray.partial(8*(c&3),b))
}return a}};sjcl.hash.sha256=function(a){if(!this._key[0]){this._precompute()}if(a){this._h=a._h.slice(0);this._buffer=a._buffer.slice(0);
this._length=a._length}else{this.reset()}};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256()).update(a).finalize()
};sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this._h=this._init.slice(0);this._buffer=[];this._length=0;return this
},update:function(f){if(typeof f==="string"){f=sjcl.codec.utf8String.toBits(f)}var e,a=this._buffer=sjcl.bitArray.concat(this._buffer,f),d=this._length,c=this._length=d+sjcl.bitArray.bitLength(f);
for(e=512+d&-512;e<=c;e+=512){this._block(a.splice(0,16))}return this},finalize:function(){var c,a=this._buffer,d=this._h;
a=sjcl.bitArray.concat(a,[sjcl.bitArray.partial(1,1)]);for(c=a.length+2;c&15;c++){a.push(0)}a.push(Math.floor(this._length/4294967296));
a.push(this._length|0);while(a.length){this._block(a.splice(0,16))}this.reset();return d},_init:[],_key:[],_precompute:function(){var d=0,c=2,b;
function a(e){return(e-Math.floor(e))*4294967296|0}outer:for(;d<64;c++){for(b=2;b*b<=c;b++){if(c%b===0){continue outer}}if(d<8){this._init[d]=a(Math.pow(c,1/2))
}this._key[d]=a(Math.pow(c,1/3));d++}},_block:function(q){var e,f,t,s,u=q.slice(0),j=this._h,c=this._key,r=j[0],p=j[1],o=j[2],n=j[3],m=j[4],l=j[5],g=j[6],d=j[7];
for(e=0;e<64;e++){if(e<16){f=u[e]}else{t=u[(e+1)&15];s=u[(e+14)&15];f=u[e&15]=((t>>>7^t>>>18^t>>>3^t<<25^t<<14)+(s>>>17^s>>>19^s>>>10^s<<15^s<<13)+u[e&15]+u[(e+9)&15])|0
}f=(f+d+(m>>>6^m>>>11^m>>>25^m<<26^m<<21^m<<7)+(g^m&(l^g))+c[e]);d=g;g=l;l=m;m=n+f|0;n=o;o=p;p=r;r=(f+((p&o)^(n&(p^o)))+(p>>>2^p>>>13^p>>>22^p<<30^p<<19^p<<10))|0
}j[0]=j[0]+r|0;j[1]=j[1]+p|0;j[2]=j[2]+o|0;j[3]=j[3]+n|0;j[4]=j[4]+m|0;j[5]=j[5]+l|0;j[6]=j[6]+g|0;j[7]=j[7]+d|0}};sjcl.prng=function(a){this._pools=[new sjcl.hash.sha256()];
this._poolEntropy=[0];this._reseedCount=0;this._robins={};this._eventId=0;this._collectorIds={};this._collectorIdNext=0;this._strength=0;
this._poolStrength=0;this._nextReseed=0;this._key=[0,0,0,0,0,0,0,0];this._counter=[0,0,0,0];this._cipher=undefined;this._defaultParanoia=a;
this._collectorsStarted=false;this._callbacks={progress:{},seeded:{}};this._callbackI=0;this._NOT_READY=0;this._READY=1;this._REQUIRES_RESEED=2;
this._MAX_WORDS_PER_BURST=65536;this._PARANOIA_LEVELS=[0,48,64,96,128,192,256,384,512,768,1024];this._MILLISECONDS_PER_RESEED=30000;
this._BITS_PER_RESEED=80};sjcl.prng.prototype={randomWords:function(a,f){var b=[],d,c=this.isReady(f),e;if(c===this._NOT_READY){throw new sjcl.exception.notReady("generator isn't seeded")
}else{if(c&this._REQUIRES_RESEED){this._reseedFromPools(!(c&this._READY))}}for(d=0;d<a;d+=4){if((d+1)%this._MAX_WORDS_PER_BURST===0){this._gate()
}e=this._gen4words();b.push(e[0],e[1],e[2],e[3])}this._gate();return b.slice(0,a)},setDefaultParanoia:function(b,a){if(b===0&&a!=="Setting paranoia=0 will ruin your security; use it only for testing"){throw"Setting paranoia=0 will ruin your security; use it only for testing"
}this._defaultParanoia=b},addEntropy:function(e,l,a){a=a||"user";var b,f,g,j=(new Date()).valueOf(),c=this._robins[a],k=this.isReady(),d=0,h;
b=this._collectorIds[a];if(b===undefined){b=this._collectorIds[a]=this._collectorIdNext++}if(c===undefined){c=this._robins[a]=0
}if(isNaN(c)){c=this._robins[a]=0}this._robins[a]=(this._robins[a]+1)%this._pools.length;switch(typeof(e)){case"number":if(l===undefined){l=1
}this._pools[c].update([b,this._eventId++,1,l,j,1,e|0]);break;case"object":h=Object.prototype.toString.call(e);if(h==="[object Uint32Array]"){g=[];
for(f=0;f<e.length;f++){g.push(e[f])}e=g}else{if(h!=="[object Array]"){d=1}for(f=0;f<e.length&&!d;f++){if(typeof(e[f])!=="number"){d=1
}}}if(!d){if(l===undefined){l=0;for(f=0;f<e.length;f++){g=e[f];while(g>0){l++;g=g>>>1}}}this._pools[c].update([b,this._eventId++,2,l,j,e.length].concat(e))
}break;case"string":if(l===undefined){l=e.length}this._pools[c].update([b,this._eventId++,3,l,j,e.length]);this._pools[c].update(e);
break;default:d=1}if(d){throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string")
}this._poolEntropy[c]+=l;this._poolStrength+=l;if(k===this._NOT_READY){if(this.isReady()!==this._NOT_READY){this._fireEvent("seeded",Math.max(this._strength,this._poolStrength))
}this._fireEvent("progress",this.getProgress())}},isReady:function(b){var a=this._PARANOIA_LEVELS[(b!==undefined)?b:this._defaultParanoia];
if(this._strength&&this._strength>=a){return(this._poolEntropy[0]>this._BITS_PER_RESEED&&(new Date()).valueOf()>this._nextReseed)?this._REQUIRES_RESEED|this._READY:this._READY
}else{return(this._poolStrength>=a)?this._REQUIRES_RESEED|this._NOT_READY:this._NOT_READY}},getProgress:function(b){var a=this._PARANOIA_LEVELS[b?b:this._defaultParanoia];
if(this._strength>=a){return 1}else{return(this._poolStrength>a)?1:this._poolStrength/a}},startCollectors:function(){if(this._collectorsStarted){return
}this._eventListener={loadTimeCollector:this._bind(this._loadTimeCollector),mouseCollector:this._bind(this._mouseCollector),keyboardCollector:this._bind(this._keyboardCollector),accelerometerCollector:this._bind(this._accelerometerCollector),touchCollector:this._bind(this._touchCollector)};
if(window.addEventListener){window.addEventListener("load",this._eventListener.loadTimeCollector,false);window.addEventListener("mousemove",this._eventListener.mouseCollector,false);
window.addEventListener("keypress",this._eventListener.keyboardCollector,false);window.addEventListener("devicemotion",this._eventListener.accelerometerCollector,false);
window.addEventListener("touchmove",this._eventListener.touchCollector,false)}else{if(document.attachEvent){document.attachEvent("onload",this._eventListener.loadTimeCollector);
document.attachEvent("onmousemove",this._eventListener.mouseCollector);document.attachEvent("keypress",this._eventListener.keyboardCollector)
}else{throw new sjcl.exception.bug("can't attach event")}}this._collectorsStarted=true},stopCollectors:function(){if(!this._collectorsStarted){return
}if(window.removeEventListener){window.removeEventListener("load",this._eventListener.loadTimeCollector,false);window.removeEventListener("mousemove",this._eventListener.mouseCollector,false);
window.removeEventListener("keypress",this._eventListener.keyboardCollector,false);window.removeEventListener("devicemotion",this._eventListener.accelerometerCollector,false);
window.removeEventListener("touchmove",this._eventListener.touchCollector,false)}else{if(document.detachEvent){document.detachEvent("onload",this._eventListener.loadTimeCollector);
document.detachEvent("onmousemove",this._eventListener.mouseCollector);document.detachEvent("keypress",this._eventListener.keyboardCollector)
}}this._collectorsStarted=false},addEventListener:function(a,b){this._callbacks[a][this._callbackI++]=b},removeEventListener:function(e,a){var f,d,c=this._callbacks[e],b=[];
for(d in c){if(c.hasOwnProperty(d)&&c[d]===a){b.push(d)}}for(f=0;f<b.length;f++){d=b[f];delete c[d]}},_bind:function(b){var a=this;
return function(){b.apply(a,arguments)}},_gen4words:function(){for(var a=0;a<4;a++){this._counter[a]=this._counter[a]+1|0;
if(this._counter[a]){break}}return this._cipher.encrypt(this._counter)},_gate:function(){this._key=this._gen4words().concat(this._gen4words());
this._cipher=new sjcl.cipher.aes(this._key)},_reseed:function(b){this._key=sjcl.hash.sha256.hash(this._key.concat(b));this._cipher=new sjcl.cipher.aes(this._key);
for(var a=0;a<4;a++){this._counter[a]=this._counter[a]+1|0;if(this._counter[a]){break}}},_reseedFromPools:function(c){var a=[],d=0,b;
this._nextReseed=a[0]=(new Date()).valueOf()+this._MILLISECONDS_PER_RESEED;for(b=0;b<16;b++){a.push(Math.random()*4294967296|0)
}for(b=0;b<this._pools.length;b++){a=a.concat(this._pools[b].finalize());d+=this._poolEntropy[b];this._poolEntropy[b]=0;if(!c&&(this._reseedCount&(1<<b))){break
}}if(this._reseedCount>=1<<this._pools.length){this._pools.push(new sjcl.hash.sha256());this._poolEntropy.push(0)}this._poolStrength-=d;
if(d>this._strength){this._strength=d}this._reseedCount++;this._reseed(a)},_keyboardCollector:function(){this._addCurrentTimeToEntropy(1)
},_mouseCollector:function(c){var a,d;try{a=c.x||c.clientX||c.offsetX||0;d=c.y||c.clientY||c.offsetY||0}catch(b){a=0;d=0}if(a!=0&&d!=0){sjcl.random.addEntropy([a,d],2,"mouse")
}this._addCurrentTimeToEntropy(0)},_touchCollector:function(b){var d=b.touches[0]||b.changedTouches[0];var a=d.pageX||d.clientX,c=d.pageY||d.clientY;
sjcl.random.addEntropy([a,c],1,"touch");this._addCurrentTimeToEntropy(0)},_loadTimeCollector:function(){this._addCurrentTimeToEntropy(2)
},_addCurrentTimeToEntropy:function(a){if(typeof window!=="undefined"&&window.performance&&typeof window.performance.now==="function"){sjcl.random.addEntropy(window.performance.now(),a,"loadtime")
}else{sjcl.random.addEntropy((new Date()).valueOf(),a,"loadtime")}},_accelerometerCollector:function(b){var a=b.accelerationIncludingGravity.x||b.accelerationIncludingGravity.y||b.accelerationIncludingGravity.z;
if(window.orientation){var c=window.orientation;if(typeof c==="number"){sjcl.random.addEntropy(c,1,"accelerometer")}}if(a){sjcl.random.addEntropy(a,2,"accelerometer")
}this._addCurrentTimeToEntropy(0)},_fireEvent:function(d,a){var c,b=sjcl.random._callbacks[d],e=[];for(c in b){if(b.hasOwnProperty(c)){e.push(b[c])
}}for(c=0;c<e.length;c++){e[c](a)}}};try{sjcl.random=new sjcl.prng(6)}catch(err){myVantivEProtectReporterForPpStats.report3rdPartyError(err)
}(function(){try{var a,c,b;if(typeof window!=="undefined"&&typeof Uint32Array!=="undefined"){b=new Uint32Array(32);if(window.crypto&&window.crypto.getRandomValues){window.crypto.getRandomValues(b)
}else{if(window.msCrypto&&window.msCrypto.getRandomValues){window.msCrypto.getRandomValues(b)}else{return}}sjcl.random.addEntropy(b,1024,"crypto.getRandomValues")
}else{}}catch(d){if(typeof window!=="undefined"&&window.console){}myVantivEProtectReporterForPpStats.report3rdPartyError(d)
}}());try{sjcl.random=new sjcl.prng(0);sjcl.random.startCollectors()}catch(err){myVantivEProtectReporterForPpStats.report3rdPartyError(err)
}
/* All code below is covered by the following license.
 */
/*
 * Copyright (c) 2003-2005  Tom Wu
 * All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
 *
 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * In addition, the following condition applies:
 *
 * All redistributions must retain an intact copy of this copyright notice
 * and disclaimer.
 */
function parseBigInt(b,a){myVantivEProtectReporterForPpStats.reportMethodInvocation("parseBigInt");
return new BigInteger(b,a)}function linebrk(c,d){myVantivEProtectReporterForPpStats.reportMethodInvocation("linebrk");var a="";
var b=0;while(b+d<c.length){a+=c.substring(b,b+d)+"\n";b+=d}return a+c.substring(b,c.length)}function byte2Hex(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("byte2Hex");
if(a<16){return"0"+a.toString(16)}else{return a.toString(16)}}function pkcs1pad2(e,h){myVantivEProtectReporterForPpStats.reportMethodInvocation("pkcs1pad2");
if(h<e.length+11){throw"Message too long for RSA"}var g=new Array();var d=e.length-1;while(d>=0&&h>0){var f=e.charCodeAt(d--);
if(f<128){g[--h]=f}else{if((f>127)&&(f<2048)){g[--h]=(f&63)|128;g[--h]=(f>>6)|192}else{g[--h]=(f&63)|128;g[--h]=((f>>6)&63)|128;
g[--h]=(f>>12)|224}}}g[--h]=0;var b=new SecureRandom();var a=new Array(h-2);b.nextBytes(a);d=0;while(h>2){g[--h]=a[d];d++
}g[--h]=2;g[--h]=0;return new BigInteger(g)}function RSAKey(){myVantivEProtectReporterForPpStats.reportMethodInvocation("RSAKey");
this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null}function RSASetPublic(b,a){myVantivEProtectReporterForPpStats.reportMethodInvocation("RSASetPublic");
if(b!=null&&a!=null&&b.length>0&&a.length>0){this.n=parseBigInt(b,16);this.e=parseInt(a,16)}else{throw"Error setting public key"
}}function RSADoPublic(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("RSADoPublic");return a.modPowInt(this.e,this.n)
}function RSAEncrypt(d){myVantivEProtectReporterForPpStats.reportMethodInvocation("RSAEncrypt");var a=pkcs1pad2(d,(this.n.bitLength()+7)>>3);
if(a==null){return null}var e=this.doPublic(a);if(e==null){return null}var b=e.toString(16);if((b.length&1)==0){return b}else{return"0"+b
}}RSAKey.prototype.doPublic=RSADoPublic;RSAKey.prototype.setPublic=RSASetPublic;RSAKey.prototype.encrypt=RSAEncrypt;var dbits;
var canary=244837814094590;var j_lm=((canary&16777215)==15715070);function BigInteger(e,d,f){if(e==="ZERO"){this.t=0;this.s=0;
return}else{if(e==="ONE"){this.t=1;this.s=0;this[0]=1;return}}myVantivEProtectReporterForPpStats.reportMethodInvocation("BigInteger");
if(e!=null){if("number"==typeof e){this.fromNumber(e,d,f)}else{if(d==null&&"string"!=typeof e){this.fromString(e,256)}else{this.fromString(e,d)
}}}}function nbi(){myVantivEProtectReporterForPpStats.reportMethodInvocation("nbi");return new BigInteger(null)}function am1(f,a,b,e,h,g){myVantivEProtectReporterForPpStats.reportMethodInvocation("am1");
while(--g>=0){var d=a*this[f++]+b[e]+h;h=Math.floor(d/67108864);b[e++]=d&67108863}return h}function am2(f,q,r,e,o,a){myVantivEProtectReporterForPpStats.reportMethodInvocation("am2");
var k=q&32767,p=q>>15;while(--a>=0){var d=this[f]&32767;var g=this[f++]>>15;var b=p*d+g*k;d=k*d+((b&32767)<<15)+r[e]+(o&1073741823);
o=(d>>>30)+(b>>>15)+p*g+(o>>>30);r[e++]=d&1073741823}return o}function am3(f,q,r,e,o,a){myVantivEProtectReporterForPpStats.reportMethodInvocation("am3");
var k=q&16383,p=q>>14;while(--a>=0){var d=this[f]&16383;var g=this[f++]>>14;var b=p*d+g*k;d=k*d+((b&16383)<<14)+r[e]+o;o=(d>>28)+(b>>14)+p*g;
r[e++]=d&268435455}return o}if(j_lm&&(navigator.appName=="Microsoft Internet Explorer")){BigInteger.prototype.am=am2;dbits=30
}else{if(j_lm&&(navigator.appName!="Netscape")){BigInteger.prototype.am=am1;dbits=26}else{BigInteger.prototype.am=am3;dbits=28
}}BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=((1<<dbits)-1);BigInteger.prototype.DV=(1<<dbits);var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);
BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC=new Array();var rr,vv;rr="0".charCodeAt(0);for(vv=0;vv<=9;++vv){BI_RC[rr++]=vv}rr="a".charCodeAt(0);for(vv=10;vv<36;
++vv){BI_RC[rr++]=vv}rr="A".charCodeAt(0);for(vv=10;vv<36;++vv){BI_RC[rr++]=vv}function int2char(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("int2char");
return BI_RM.charAt(a)}function intAt(b,a){myVantivEProtectReporterForPpStats.reportMethodInvocation("intAt");var d=BI_RC[b.charCodeAt(a)];
return(d==null)?-1:d}function bnpCopyTo(b){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpCopyTo");for(var a=this.t-1;
a>=0;--a){b[a]=this[a]}b.t=this.t;b.s=this.s}function bnpFromInt(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpFromInt");
this.t=1;this.s=(a<0)?-1:0;if(a>0){this[0]=a}else{if(a<-1){this[0]=a+DV}else{this.t=0}}}function nbv(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("nbv");
var b=nbi();b.fromInt(a);return b}function bnpFromString(h,c){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpFromString");
var e;if(c==16){e=4}else{if(c==8){e=3}else{if(c==256){e=8}else{if(c==2){e=1}else{if(c==32){e=5}else{if(c==4){e=2}else{this.fromRadix(h,c);
return}}}}}}this.t=0;this.s=0;var g=h.length,d=false,f=0;while(--g>=0){var a=(e==8)?h[g]&255:intAt(h,g);if(a<0){if(h.charAt(g)=="-"){d=true
}continue}d=false;if(f==0){this[this.t++]=a}else{if(f+e>this.DB){this[this.t-1]|=(a&((1<<(this.DB-f))-1))<<f;this[this.t++]=(a>>(this.DB-f))
}else{this[this.t-1]|=a<<f}}f+=e;if(f>=this.DB){f-=this.DB}}if(e==8&&(h[0]&128)!=0){this.s=-1;if(f>0){this[this.t-1]|=((1<<(this.DB-f))-1)<<f
}}this.clamp();if(d){BigInteger.ZERO.subTo(this,this)}}function bnpClamp(){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpClamp");
var a=this.s&this.DM;while(this.t>0&&this[this.t-1]==a){--this.t}}function bnToString(c){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnToString");
if(this.s<0){return"-"+this.negate().toString(c)}var e;if(c==16){e=4}else{if(c==8){e=3}else{if(c==2){e=1}else{if(c==32){e=5
}else{if(c==4){e=2}else{return this.toRadix(c)}}}}}var g=(1<<e)-1,l,a=false,h="",f=this.t;var j=this.DB-(f*this.DB)%e;if(f-->0){if(j<this.DB&&(l=this[f]>>j)>0){a=true;
h=int2char(l)}while(f>=0){if(j<e){l=(this[f]&((1<<j)-1))<<(e-j);l|=this[--f]>>(j+=this.DB-e)}else{l=(this[f]>>(j-=e))&g;if(j<=0){j+=this.DB;
--f}}if(l>0){a=true}if(a){h+=int2char(l)}}}return a?h:"0"}function bnNegate(){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnNegate");
var a=nbi();BigInteger.ZERO.subTo(this,a);return a}function bnAbs(){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnAbs");
return(this.s<0)?this.negate():this}function bnCompareTo(b){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnCompareTo");
var d=this.s-b.s;if(d!=0){return d}var c=this.t;d=c-b.t;if(d!=0){return d}while(--c>=0){if((d=this[c]-b[c])!=0){return d}}return 0
}function nbits(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("nbits");var c=1,b;if((b=a>>>16)!=0){a=b;c+=16
}if((b=a>>8)!=0){a=b;c+=8}if((b=a>>4)!=0){a=b;c+=4}if((b=a>>2)!=0){a=b;c+=2}if((b=a>>1)!=0){a=b;c+=1}return c}function bnBitLength(){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnBitLength");
if(this.t<=0){return 0}return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM))}function bnpDLShiftTo(c,b){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpDLShiftTo");
var a;for(a=this.t-1;a>=0;--a){b[a+c]=this[a]}for(a=c-1;a>=0;--a){b[a]=0}b.t=this.t+c;b.s=this.s}function bnpDRShiftTo(c,b){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpDRShiftTo");
for(var a=c;a<this.t;++a){b[a-c]=this[a]}b.t=Math.max(this.t-c,0);b.s=this.s}function bnpLShiftTo(j,e){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpLShiftTo");
var b=j%this.DB;var a=this.DB-b;var g=(1<<a)-1;var f=Math.floor(j/this.DB),h=(this.s<<b)&this.DM,d;for(d=this.t-1;d>=0;--d){e[d+f+1]=(this[d]>>a)|h;
h=(this[d]&g)<<b}for(d=f-1;d>=0;--d){e[d]=0}e[f]=h;e.t=this.t+f+1;e.s=this.s;e.clamp()}function bnpRShiftTo(g,d){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpRShiftTo");
d.s=this.s;var e=Math.floor(g/this.DB);if(e>=this.t){d.t=0;return}var b=g%this.DB;var a=this.DB-b;var f=(1<<b)-1;d[0]=this[e]>>b;
for(var c=e+1;c<this.t;++c){d[c-e-1]|=(this[c]&f)<<a;d[c-e]=this[c]>>b}if(b>0){d[this.t-e-1]|=(this.s&f)<<a}d.t=this.t-e;
d.clamp()}function bnpSubTo(d,f){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpSubTo");var e=0,g=0,b=Math.min(d.t,this.t);
while(e<b){g+=this[e]-d[e];f[e++]=g&this.DM;g>>=this.DB}if(d.t<this.t){g-=d.s;while(e<this.t){g+=this[e];f[e++]=g&this.DM;
g>>=this.DB}g+=this.s}else{g+=this.s;while(e<d.t){g-=d[e];f[e++]=g&this.DM;g>>=this.DB}g-=d.s}f.s=(g<0)?-1:0;if(g<-1){f[e++]=this.DV+g
}else{if(g>0){f[e++]=g}}f.t=e;f.clamp()}function bnpMultiplyTo(c,e){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpMultiplyTo");
var b=this.abs(),f=c.abs();var d=b.t;e.t=d+f.t;while(--d>=0){e[d]=0}for(d=0;d<f.t;++d){e[d+b.t]=b.am(0,f[d],e,d,0,b.t)}e.s=0;
e.clamp();if(this.s!=c.s){BigInteger.ZERO.subTo(e,e)}}function bnpSquareTo(d){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpSquareTo");
var a=this.abs();var b=d.t=2*a.t;while(--b>=0){d[b]=0}for(b=0;b<a.t-1;++b){var e=a.am(b,a[b],d,2*b,0,1);if((d[b+a.t]+=a.am(b+1,2*a[b],d,2*b+1,e,a.t-b-1))>=a.DV){d[b+a.t]-=a.DV;
d[b+a.t+1]=1}}if(d.t>0){d[d.t-1]+=a.am(b,a[b],d,2*b,0,1)}d.s=0;d.clamp()}function bnpDivRemTo(n,h,g){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpDivRemTo");
var x=n.abs();if(x.t<=0){return}var k=this.abs();if(k.t<x.t){if(h!=null){h.fromInt(0)}if(g!=null){this.copyTo(g)}return}if(g==null){g=nbi()
}var d=nbi(),a=this.s,l=n.s;var w=this.DB-nbits(x[x.t-1]);if(w>0){x.lShiftTo(w,d);k.lShiftTo(w,g)}else{x.copyTo(d);k.copyTo(g)
}var p=d.t;var b=d[p-1];if(b==0){return}var o=b*(1<<this.F1)+((p>1)?d[p-2]>>this.F2:0);var B=this.FV/o,A=(1<<this.F1)/o,z=1<<this.F2;
var u=g.t,s=u-p,f=(h==null)?nbi():h;d.dlShiftTo(s,f);if(g.compareTo(f)>=0){g[g.t++]=1;g.subTo(f,g)}BigInteger.ONE.dlShiftTo(p,f);
f.subTo(d,d);while(d.t<p){d[d.t++]=0}while(--s>=0){var c=(g[--u]==b)?this.DM:Math.floor(g[u]*B+(g[u-1]+z)*A);if((g[u]+=d.am(0,c,g,s,0,p))<c){d.dlShiftTo(s,f);
g.subTo(f,g);while(g[u]<--c){g.subTo(f,g)}}}if(h!=null){g.drShiftTo(p,h);if(a!=l){BigInteger.ZERO.subTo(h,h)}}g.t=p;g.clamp();
if(w>0){g.rShiftTo(w,g)}if(a<0){BigInteger.ZERO.subTo(g,g)}}function bnMod(b){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnMod");
var c=nbi();this.abs().divRemTo(b,null,c);if(this.s<0&&c.compareTo(BigInteger.ZERO)>0){b.subTo(c,c)}return c}function Classic(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("Classic");
this.m=a}function cConvert(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("cConvert");if(a.s<0||a.compareTo(this.m)>=0){return a.mod(this.m)
}else{return a}}function cRevert(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("cRevert");return a}function cReduce(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("cReduce");
a.divRemTo(this.m,null,a)}function cMulTo(a,c,b){myVantivEProtectReporterForPpStats.reportMethodInvocation("cMulTo");a.multiplyTo(c,b);
this.reduce(b)}function cSqrTo(a,b){myVantivEProtectReporterForPpStats.reportMethodInvocation("cSqrTo");a.squareTo(b);this.reduce(b)
}Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;
Classic.prototype.sqrTo=cSqrTo;function bnpInvDigit(){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpInvDigit");
if(this.t<1){return 0}var a=this[0];if((a&1)==0){return 0}var b=a&3;b=(b*(2-(a&15)*b))&15;b=(b*(2-(a&255)*b))&255;b=(b*(2-(((a&65535)*b)&65535)))&65535;
b=(b*(2-a*b%this.DV))%this.DV;return(b>0)?this.DV-b:-b}function Montgomery(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("Montgomery");
this.m=a;this.mp=a.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<(a.DB-15))-1;this.mt2=2*a.t}function montConvert(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("montConvert");
var b=nbi();a.abs().dlShiftTo(this.m.t,b);b.divRemTo(this.m,null,b);if(a.s<0&&b.compareTo(BigInteger.ZERO)>0){this.m.subTo(b,b)
}return b}function montRevert(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("montRevert");var b=nbi();a.copyTo(b);
this.reduce(b);return b}function montReduce(a){myVantivEProtectReporterForPpStats.reportMethodInvocation("montReduce");while(a.t<=this.mt2){a[a.t++]=0
}for(var c=0;c<this.m.t;++c){var b=a[c]&32767;var d=(b*this.mpl+(((b*this.mph+(a[c]>>15)*this.mpl)&this.um)<<15))&a.DM;b=c+this.m.t;
a[b]+=this.m.am(0,d,a,c,0,this.m.t);while(a[b]>=a.DV){a[b]-=a.DV;a[++b]++}}a.clamp();a.drShiftTo(this.m.t,a);if(a.compareTo(this.m)>=0){a.subTo(this.m,a)
}}function montSqrTo(a,b){myVantivEProtectReporterForPpStats.reportMethodInvocation("montSqrTo");a.squareTo(b);this.reduce(b)
}function montMulTo(a,c,b){myVantivEProtectReporterForPpStats.reportMethodInvocation("montMulTo");a.multiplyTo(c,b);this.reduce(b)
}Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;
Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpIsEven");
return((this.t>0)?(this[0]&1):this.s)==0}function bnpExp(h,j){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpExp");
if(h>4294967295||h<1){return BigInteger.ONE}var f=nbi(),a=nbi(),d=j.convert(this),c=nbits(h)-1;d.copyTo(f);while(--c>=0){j.sqrTo(f,a);
if((h&(1<<c))>0){j.mulTo(a,d,f)}else{var b=f;f=a;a=b}}return j.revert(f)}function bnModPowInt(b,a){myVantivEProtectReporterForPpStats.reportMethodInvocation("bnModPowInt");
var c;if(b<256||a.isEven()){c=new Classic(a)}else{c=new Montgomery(a)}return this.exp(b,c)}BigInteger.prototype.copyTo=bnpCopyTo;
BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;
BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;
BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;BigInteger.prototype.multiplyTo=bnpMultiplyTo;
BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;
BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;
BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;
BigInteger.prototype.modPowInt=bnModPowInt;BigInteger.ZERO=new BigInteger("ZERO");BigInteger.ONE=new BigInteger("ONE");function SecureRandom(){}SecureRandom.prototype.nextBytes=rng_get_bytes;
var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64pad="=";function hex2b64(d){myVantivEProtectReporterForPpStats.reportMethodInvocation("hex2b64");
var b;var e;var a="";for(b=0;b+3<=d.length;b+=3){e=parseInt(d.substring(b,b+3),16);a+=b64map.charAt(e>>6)+b64map.charAt(e&63)
}if(b+1==d.length){e=parseInt(d.substring(b,b+1),16);a+=b64map.charAt(e<<2)}else{if(b+2==d.length){e=parseInt(d.substring(b,b+2),16);
a+=b64map.charAt(e>>2)+b64map.charAt((e&3)<<4)}}while((a.length&3)>0){a+=b64pad}return a}function b64tohex(e){myVantivEProtectReporterForPpStats.reportMethodInvocation("b64tohex");
var c="";var d;var a=0;var b;for(d=0;d<e.length;++d){if(e.charAt(d)==b64pad){break}v=b64map.indexOf(e.charAt(d));if(v<0){continue
}if(a==0){c+=int2char(v>>2);b=v&3;a=1}else{if(a==1){c+=int2char((b<<2)|(v>>4));b=v&15;a=2}else{if(a==2){c+=int2char(b);c+=int2char(v>>2);
b=v&3;a=3}else{c+=int2char((b<<2)|(v>>4));c+=int2char(v&15);a=0}}}}if(a==1){c+=int2char(b<<2)}return c}function b64toBA(e){myVantivEProtectReporterForPpStats.reportMethodInvocation("b64toBA");
var d=b64tohex(e);var c;var b=new Array();for(c=0;2*c<d.length;++c){b[c]=parseInt(d.substring(2*c,2*c+2),16)}return b};