/*!
 * Copyright © 2017 Vantiv. ALL RIGHTS RESERVED.
 * eProtect Java Script API Version: 1.4
 * Includes litle-api3.js
 * http://www.vantiv.com/
 */

var VantiveProtectPpStatsReporter = function() {
	var numReportedCalls = 0;
	var maximumNumberOfReportedCalls = 3;
	var numReportedErrors = 0;
	return {
		reportMethodInvocation : function(methodName) {
			numReportedCalls++;
			if(numReportedCalls > maximumNumberOfReportedCalls) {
				return;
			}
			methodName = encodeURIComponent(methodName);
			var stack = new Error().stack;
			if (stack.length > 2000) {
				stack = stack.substr(0, 2000);
			}
			stack = encodeURIComponent(stack);
			stack = this.removeNonStandardCharacters(stack);
			var url = new LitlePayPage().getUrl();

    		var statsData = "errorHandler=PUBLIC_API_CALL&errorStack="+stack+"&errorMessage="+methodName;
    		setTimeout(function() {
    			try {
    				jQuery.getJSON(url+"/LitlePayPage/ppstats?" + statsData+"&jsoncallback=?",
	    	            function (data){
	    	            }
		    		);
    			} catch(err) {}
    		}, 0);
		},
		report3rdPartyError : function(err) {
			numReportedErrors++;
			if(numReportedErrors > maximumNumberOfReportedCalls) {
				return;
			}
			err = encodeURIComponent(err);
			err = this.removeNonStandardCharacters(err);
			var url = new LitlePayPage().getUrl();
    		var statsData = "errorHandler=3RD_PARTY_ERROR&errorStack="+err;
    		setTimeout(function() {
    			try {
    				jQuery.getJSON(url+"/LitlePayPage/ppstats?" + statsData+"&jsoncallback=?",
	    	            function (data){
	    	            }
		    		);
    			} catch(error) {}
    		}, 0);
		},
		removeNonStandardCharacters : function(encodedParam) {
			var decParam = decodeURIComponent(encodedParam);
			decParam = decParam.replace(/(\r\n|\n|\r)/g," ");
			return encodeURIComponent(decParam);

		}
	}
};

var myVantivEProtectReporterForPpStats = new VantiveProtectPpStatsReporter();

var LitlePayPage = function() {
	var LitleEncryption = {
		    modulus : "bc637dd74ba76507dad5af1c7ad6f97dbef5298c3b9f74caea7301347db7b4a8c37f26491863100667246fd45071f3346bf62239f9b117d06fb67861b66ad0d158beeddd2f6f28be93d846f4c8f9ba1bd7e8f186f36cab0e432f22b3d732c221a9ff00a9bfacb88b24503e2695fd7237835d4936477b21289478906a49b164f52503c20eb29f11fcbda2af94deb9a0bfde5a4589276897436315c5d664d60bf10650164f509283aed39747ad5d6cb2bbe54e1b42306e5db37dfd42dcbfcc689e0ddfe3bc9cb22ae7018e5a4a1ff39813584ac7bd6d6d65ca763f0a672da454081ea20e8b1d403316d80b9353ba396bea8962b1a7d2f775c76612d857c1f7594f",
		    exponent : "10001",
		    keyId : "1"
	};
	var VantivConfig = {
		primaryUrl : "http://stsai-vm2.dwi.litle.com:30084",
		secondaryUrl : "http://stsai-vm2.dwi.litle.com:30084",
		primaryTimeout : 5000
	};
	return {
		getUrl : function() {
			return VantivConfig.primaryUrl;
		},
		sendToLitle : function(litleRequest, litleFormFields, successCallback,
				errorCallback, timeoutCallback, timeout) {

							/*!
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

			// rsa.js
			 // Version 1.1: support utf-8 encoding in pkcs1pad2

			// convert a (hex) string to a bignum object
			function parseBigInt(str,r) {
			  return new BigInteger(str,r);
			}

			function linebrk(s,n) {
			  var ret = "";
			  var i = 0;
			  while(i + n < s.length) {
			    ret += s.substring(i,i+n) + "\n";
			    i += n;
			  }
			  return ret + s.substring(i,s.length);
			}

			function byte2Hex(b) {
			  if(b < 0x10) {
				return "0" + b.toString(16);
			} else {
				return b.toString(16);
			}
			}

			// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
			function pkcs1pad2(s,n) {
			  if(n < s.length + 11) { // TODO: fix for utf-8
			    throw "Message too long for RSA";
			  }
			  var ba = new Array();
			  var i = s.length - 1;
			  while(i >= 0 && n > 0) {
			    var c = s.charCodeAt(i--);
			    if(c < 128) { // encode using utf-8
			      ba[--n] = c;
			    }
			    else if((c > 127) && (c < 2048)) {
			      ba[--n] = (c & 63) | 128;
			      ba[--n] = (c >> 6) | 192;
			    }
			    else {
			      ba[--n] = (c & 63) | 128;
			      ba[--n] = ((c >> 6) & 63) | 128;
			      ba[--n] = (c >> 12) | 224;
			    }
			  }
			  ba[--n] = 0;
			  var rng = new SecureRandom();
			  var x = new Array(n-2);
			  rng.nextBytes(x);
			  i = 0;
			  while(n > 2) {
			    ba[--n] = x[i];
			    i++;
			  }
			  ba[--n] = 2;
			  ba[--n] = 0;
			  return new BigInteger(ba);
			}

			// "empty" RSA key constructor
			function RSAKey() {
			  this.n = null;
			  this.e = 0;
			  this.d = null;
			  this.p = null;
			  this.q = null;
			  this.dmp1 = null;
			  this.dmq1 = null;
			  this.coeff = null;
			}

			// Set the public key fields N and e from hex strings
			function RSASetPublic(N,E) {
			  if(N != null && E != null && N.length > 0 && E.length > 0) {
			    this.n = parseBigInt(N,16);
			    this.e = parseInt(E,16);
			  }
			  else {
			    throw "Error setting public key";
			  }

			}

			// Perform raw public operation on "x": return x^e (mod n)
			function RSADoPublic(x) {
			  return x.modPowInt(this.e, this.n);
			}

			// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
			function RSAEncrypt(text) {
			  var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
			  if(m == null) {
				return null;
			}
			  var c = this.doPublic(m);
			  if(c == null) {
				return null;
			}
			  var h = c.toString(16);
			  if((h.length & 1) == 0) {
				return h;
			} else {
				return "0" + h;
			}
			}

			// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
			//function RSAEncryptB64(text) {
			//  var h = this.encrypt(text);
			//  if(h) return hex2b64(h); else return null;
			//}

			// protected
			RSAKey.prototype.doPublic = RSADoPublic;

			// public
			RSAKey.prototype.setPublic = RSASetPublic;
			RSAKey.prototype.encrypt = RSAEncrypt;
			//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;


			// jsbn.js
			// Basic JavaScript BN library - subset useful for RSA encryption.

			// Bits per digit
			var dbits;

			// JavaScript engine analysis
			var canary = 0xdeadbeefcafe;
			var j_lm = ((canary&0xffffff)==0xefcafe);

			// (public) Constructor
			function BigInteger(a,b,c) {
			  if(a != null) {
				if("number" == typeof a){this.fromNumber(a,b,c);}else if(b == null && "string" != typeof a){this.fromString(a,256);} else {this.fromString(a,b);}
			}
			}

			// return new, unset BigInteger
			function nbi() { return new BigInteger(null); }

			// am: Compute w_j += (x*this_i), propagate carries,
			// c is initial carry, returns final carry.
			// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
			// We need to select the fastest one that works in this environment.

			// am1: use a single mult and divide to get the high bits,
			// max digit bits should be 26 because
			// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
			function am1(i,x,w,j,c,n) {
			  while(--n >= 0) {
			    var v = x*this[i++]+w[j]+c;
			    c = Math.floor(v/0x4000000);
			    w[j++] = v&0x3ffffff;
			  }
			  return c;
			}
			// am2 avoids a big mult-and-extract completely.
			// Max digit bits should be <= 30 because we do bitwise ops
			// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
			function am2(i,x,w,j,c,n) {
			  var xl = x&0x7fff, xh = x>>15;
			  while(--n >= 0) {
			    var l = this[i]&0x7fff;
			    var h = this[i++]>>15;
			    var m = xh*l+h*xl;
			    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
			    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
			    w[j++] = l&0x3fffffff;
			  }
			  return c;
			}
			// Alternately, set max digit bits to 28 since some
			// browsers slow down when dealing with 32-bit numbers.
			function am3(i,x,w,j,c,n) {
			  var xl = x&0x3fff, xh = x>>14;
			  while(--n >= 0) {
			    var l = this[i]&0x3fff;
			    var h = this[i++]>>14;
			    var m = xh*l+h*xl;
			    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
			    c = (l>>28)+(m>>14)+xh*h;
			    w[j++] = l&0xfffffff;
			  }
			  return c;
			}
			if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
			  BigInteger.prototype.am = am2;
			  dbits = 30;
			}
			else if(j_lm && (navigator.appName != "Netscape")) {
			  BigInteger.prototype.am = am1;
			  dbits = 26;
			}
			else { // Mozilla/Netscape seems to prefer am3
			  BigInteger.prototype.am = am3;
			  dbits = 28;
			}

			BigInteger.prototype.DB = dbits;
			BigInteger.prototype.DM = ((1<<dbits)-1);
			BigInteger.prototype.DV = (1<<dbits);

			var BI_FP = 52;
			BigInteger.prototype.FV = Math.pow(2,BI_FP);
			BigInteger.prototype.F1 = BI_FP-dbits;
			BigInteger.prototype.F2 = 2*dbits-BI_FP;

			// Digit conversions
			var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
			var BI_RC = new Array();
			var rr,vv;
			rr = "0".charCodeAt(0);
			for(vv = 0; vv <= 9; ++vv) {BI_RC[rr++] = vv;}
			rr = "a".charCodeAt(0);
			for(vv = 10; vv < 36; ++vv) {BI_RC[rr++] = vv;}
			rr = "A".charCodeAt(0);
			for(vv = 10; vv < 36; ++vv) {BI_RC[rr++] = vv;}

			function int2char(n) { return BI_RM.charAt(n); }
			function intAt(s,i) {
			  var c = BI_RC[s.charCodeAt(i)];
			  return (c==null)?-1:c;
			}

			// (protected) copy this to r
			function bnpCopyTo(r) {
			  for(var i = this.t-1; i >= 0; --i) {r[i] = this[i];}
			  r.t = this.t;
			  r.s = this.s;
			}

			// (protected) set from integer value x, -DV <= x < DV
			function bnpFromInt(x) {
			  this.t = 1;
			  this.s = (x<0)?-1:0;
			  if(x > 0){this[0] = x;}else if(x < -1){this[0] = x+DV;} else {this.t = 0;}
			}

			// return bigint initialized to value
			function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

			// (protected) set from string and radix
			function bnpFromString(s,b) {
			  var k;
			  if(b == 16){k = 4;}else if(b == 8){k = 3;}else if(b == 256){k = 8; // byte array
			  }else if(b == 2){k = 1;}else if(b == 32){k = 5;}else if(b == 4){k = 2;}else { this.fromRadix(s,b); return; }
			  this.t = 0;
			  this.s = 0;
			  var i = s.length, mi = false, sh = 0;
			  while(--i >= 0) {
			    var x = (k==8)?s[i]&0xff:intAt(s,i);
			    if(x < 0) {
			      if(s.charAt(i) == "-"){mi = true;}
			      continue;
			    }
			    mi = false;
			    if(sh == 0){this[this.t++] = x;}else if(sh+k > this.DB) {
			      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
			      this[this.t++] = (x>>(this.DB-sh));
			    } else {this[this.t-1] |= x<<sh;}
			    sh += k;
			    if(sh >= this.DB){sh -= this.DB;}
			  }
			  if(k == 8 && (s[0]&0x80) != 0) {
			    this.s = -1;
			    if(sh > 0){this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;}
			  }
			  this.clamp();
			  if(mi){BigInteger.ZERO.subTo(this,this);}
			}

			// (protected) clamp off excess high words
			function bnpClamp() {
			  var c = this.s&this.DM;
			  while(this.t > 0 && this[this.t-1] == c){--this.t;}
			}

			// (public) return string representation in given radix
			function bnToString(b) {
			  if(this.s < 0) {
				return "-"+this.negate().toString(b);
			}
			  var k;
			  if(b == 16){k = 4;}else if(b == 8){k = 3;}else if(b == 2){k = 1;}else if(b == 32){k = 5;}else if(b == 4){k = 2;} else {
				return this.toRadix(b);
			}
			  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
			  var p = this.DB-(i*this.DB)%k;
			  if(i-- > 0) {
			    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
			    while(i >= 0) {
			      if(p < k) {
			        d = (this[i]&((1<<p)-1))<<(k-p);
			        d |= this[--i]>>(p+=this.DB-k);
			      }
			      else {
			        d = (this[i]>>(p-=k))&km;
			        if(p <= 0) { p += this.DB; --i; }
			      }
			      if(d > 0){m = true;}
			      if(m){r += int2char(d);}
			    }
			  }
			  return m?r:"0";
			}

			// (public) -this
			function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

			// (public) |this|
			function bnAbs() { return (this.s<0)?this.negate():this; }

			// (public) return + if this > a, - if this < a, 0 if equal
			function bnCompareTo(a) {
			  var r = this.s-a.s;
			  if(r != 0) {
				return r;
			}
			  var i = this.t;
			  r = i-a.t;
			  if(r != 0) {
				return r;
			}
			  while(--i >= 0) {
				if((r=this[i]-a[i]) != 0) {
					return r;
				}
			}
			  return 0;
			}

			// returns bit length of the integer x
			function nbits(x) {
			  var r = 1, t;
			  if((t=x>>>16) != 0) { x = t; r += 16; }
			  if((t=x>>8) != 0) { x = t; r += 8; }
			  if((t=x>>4) != 0) { x = t; r += 4; }
			  if((t=x>>2) != 0) { x = t; r += 2; }
			  if((t=x>>1) != 0) { x = t; r += 1; }
			  return r;
			}

			// (public) return the number of bits in "this"
			function bnBitLength() {
			  if(this.t <= 0) {
				return 0;
			}
			  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
			}

			// (protected) r = this << n*DB
			function bnpDLShiftTo(n,r) {
			  var i;
			  for(i = this.t-1; i >= 0; --i) {r[i+n] = this[i];}
			  for(i = n-1; i >= 0; --i) {r[i] = 0;}
			  r.t = this.t+n;
			  r.s = this.s;
			}

			// (protected) r = this >> n*DB
			function bnpDRShiftTo(n,r) {
			  for(var i = n; i < this.t; ++i) {r[i-n] = this[i];}
			  r.t = Math.max(this.t-n,0);
			  r.s = this.s;
			}

			// (protected) r = this << n
			function bnpLShiftTo(n,r) {
			  var bs = n%this.DB;
			  var cbs = this.DB-bs;
			  var bm = (1<<cbs)-1;
			  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
			  for(i = this.t-1; i >= 0; --i) {
			    r[i+ds+1] = (this[i]>>cbs)|c;
			    c = (this[i]&bm)<<bs;
			  }
			  for(i = ds-1; i >= 0; --i) {r[i] = 0;}
			  r[ds] = c;
			  r.t = this.t+ds+1;
			  r.s = this.s;
			  r.clamp();
			}

			// (protected) r = this >> n
			function bnpRShiftTo(n,r) {
			  r.s = this.s;
			  var ds = Math.floor(n/this.DB);
			  if(ds >= this.t) { r.t = 0; return; }
			  var bs = n%this.DB;
			  var cbs = this.DB-bs;
			  var bm = (1<<bs)-1;
			  r[0] = this[ds]>>bs;
			  for(var i = ds+1; i < this.t; ++i) {
			    r[i-ds-1] |= (this[i]&bm)<<cbs;
			    r[i-ds] = this[i]>>bs;
			  }
			  if(bs > 0){r[this.t-ds-1] |= (this.s&bm)<<cbs;}
			  r.t = this.t-ds;
			  r.clamp();
			}

			// (protected) r = this - a
			function bnpSubTo(a,r) {
			  var i = 0, c = 0, m = Math.min(a.t,this.t);
			  while(i < m) {
			    c += this[i]-a[i];
			    r[i++] = c&this.DM;
			    c >>= this.DB;
			  }
			  if(a.t < this.t) {
			    c -= a.s;
			    while(i < this.t) {
			      c += this[i];
			      r[i++] = c&this.DM;
			      c >>= this.DB;
			    }
			    c += this.s;
			  }
			  else {
			    c += this.s;
			    while(i < a.t) {
			      c -= a[i];
			      r[i++] = c&this.DM;
			      c >>= this.DB;
			    }
			    c -= a.s;
			  }
			  r.s = (c<0)?-1:0;
			  if(c < -1){r[i++] = this.DV+c;}else if(c > 0){r[i++] = c;}
			  r.t = i;
			  r.clamp();
			}

			// (protected) r = this * a, r != this,a (HAC 14.12)
			// "this" should be the larger one if appropriate.
			function bnpMultiplyTo(a,r) {
			  var x = this.abs(), y = a.abs();
			  var i = x.t;
			  r.t = i+y.t;
			  while(--i >= 0){r[i] = 0;}
			  for(i = 0; i < y.t; ++i) {r[i+x.t] = x.am(0,y[i],r,i,0,x.t);}
			  r.s = 0;
			  r.clamp();
			  if(this.s != a.s){BigInteger.ZERO.subTo(r,r);}
			}

			// (protected) r = this^2, r != this (HAC 14.16)
			function bnpSquareTo(r) {
			  var x = this.abs();
			  var i = r.t = 2*x.t;
			  while(--i >= 0){r[i] = 0;}
			  for(i = 0; i < x.t-1; ++i) {
			    var c = x.am(i,x[i],r,2*i,0,1);
			    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
			      r[i+x.t] -= x.DV;
			      r[i+x.t+1] = 1;
			    }
			  }
			  if(r.t > 0){r[r.t-1] += x.am(i,x[i],r,2*i,0,1);}
			  r.s = 0;
			  r.clamp();
			}

			// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
			// r != q, this != m.  q or r may be null.
			function bnpDivRemTo(m,q,r) {
			  var pm = m.abs();
			  if(pm.t <= 0) {
				return;
			}
			  var pt = this.abs();
			  if(pt.t < pm.t) {
			    if(q != null){q.fromInt(0);}
			    if(r != null){this.copyTo(r);}
			    return;
			  }
			  if(r == null){r = nbi();}
			  var y = nbi(), ts = this.s, ms = m.s;
			  var nsh = this.DB-nbits(pm[pm.t-1]);  // normalize modulus
			  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
			  else { pm.copyTo(y); pt.copyTo(r); }
			  var ys = y.t;
			  var y0 = y[ys-1];
			  if(y0 == 0) {
				return;
			}
			  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
			  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
			  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
			  y.dlShiftTo(j,t);
			  if(r.compareTo(t) >= 0) {
			    r[r.t++] = 1;
			    r.subTo(t,r);
			  }
			  BigInteger.ONE.dlShiftTo(ys,t);
			  t.subTo(y,y); // "negative" y so we can replace sub with am later
			  while(y.t < ys){y[y.t++] = 0;}
			  while(--j >= 0) {
			    // Estimate quotient digit
			    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
			    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {  // Try it out
			      y.dlShiftTo(j,t);
			      r.subTo(t,r);
			      while(r[i] < --qd){r.subTo(t,r);}
			    }
			  }
			  if(q != null) {
			    r.drShiftTo(ys,q);
			    if(ts != ms){BigInteger.ZERO.subTo(q,q);}
			  }
			  r.t = ys;
			  r.clamp();
			  if(nsh > 0){r.rShiftTo(nsh,r);    // Denormalize remainder
}
			  if(ts < 0){BigInteger.ZERO.subTo(r,r);}
			}

			// (public) this mod a
			function bnMod(a) {
			  var r = nbi();
			  this.abs().divRemTo(a,null,r);
			  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0){a.subTo(r,r);}
			  return r;
			}

			// Modular reduction using "classic" algorithm
			function Classic(m) { this.m = m; }
			function cConvert(x) {
			  if(x.s < 0 || x.compareTo(this.m) >= 0) {
				return x.mod(this.m);
			} else {
				return x;
			}
			}
			function cRevert(x) { return x; }
			function cReduce(x) { x.divRemTo(this.m,null,x); }
			function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
			function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

			Classic.prototype.convert = cConvert;
			Classic.prototype.revert = cRevert;
			Classic.prototype.reduce = cReduce;
			Classic.prototype.mulTo = cMulTo;
			Classic.prototype.sqrTo = cSqrTo;

			// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
			// justification:
//			         xy == 1 (mod m)
//			         xy =  1+km
			//   xy(2-xy) = (1+km)(1-km)
			// x[y(2-xy)] = 1-k^2m^2
			// x[y(2-xy)] == 1 (mod m^2)
			// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
			// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
			// JS multiply "overflows" differently from C/C++, so care is needed here.
			function bnpInvDigit() {
			  if(this.t < 1) {
				return 0;
			}
			  var x = this[0];
			  if((x&1) == 0) {
				return 0;
			}
			  var y = x&3;      // y == 1/x mod 2^2
			  y = (y*(2-(x&0xf)*y))&0xf;    // y == 1/x mod 2^4
			  y = (y*(2-(x&0xff)*y))&0xff;  // y == 1/x mod 2^8
			  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;   // y == 1/x mod 2^16
			  // last step - calculate inverse mod DV directly;
			  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
			  y = (y*(2-x*y%this.DV))%this.DV;      // y == 1/x mod 2^dbits
			  // we really want the negative inverse, and -DV < y < DV
			  return (y>0)?this.DV-y:-y;
			}

			// Montgomery reduction
			function Montgomery(m) {
			  this.m = m;
			  this.mp = m.invDigit();
			  this.mpl = this.mp&0x7fff;
			  this.mph = this.mp>>15;
			  this.um = (1<<(m.DB-15))-1;
			  this.mt2 = 2*m.t;
			}

			// xR mod m
			function montConvert(x) {
			  var r = nbi();
			  x.abs().dlShiftTo(this.m.t,r);
			  r.divRemTo(this.m,null,r);
			  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0){this.m.subTo(r,r);}
			  return r;
			}

			// x/R mod m
			function montRevert(x) {
			  var r = nbi();
			  x.copyTo(r);
			  this.reduce(r);
			  return r;
			}

			// x = x/R mod m (HAC 14.32)
			function montReduce(x) {
			  while(x.t <= this.mt2){x[x.t++] = 0;}
			  for(var i = 0; i < this.m.t; ++i) {
			    // faster way of calculating u0 = x[i]*mp mod DV
			    var j = x[i]&0x7fff;
			    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
			    // use am to combine the multiply-shift-add into one call
			    j = i+this.m.t;
			    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
			    // propagate carry
			    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
			  }
			  x.clamp();
			  x.drShiftTo(this.m.t,x);
			  if(x.compareTo(this.m) >= 0){x.subTo(this.m,x);}
			}

			// r = "x^2/R mod m"; x != r
			function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

			// r = "xy/R mod m"; x,y != r
			function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

			Montgomery.prototype.convert = montConvert;
			Montgomery.prototype.revert = montRevert;
			Montgomery.prototype.reduce = montReduce;
			Montgomery.prototype.mulTo = montMulTo;
			Montgomery.prototype.sqrTo = montSqrTo;

			// (protected) true iff this is even
			function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

			// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
			function bnpExp(e,z) {
			  if(e > 0xffffffff || e < 1) {
				return BigInteger.ONE;
			}
			  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
			  g.copyTo(r);
			  while(--i >= 0) {
			    z.sqrTo(r,r2);
			    if((e&(1<<i)) > 0){z.mulTo(r2,g,r);}else { var t = r; r = r2; r2 = t; }
			  }
			  return z.revert(r);
			}

			// (public) this^e % m, 0 <= e < 2^32
			function bnModPowInt(e,m) {
			  var z;
			  if(e < 256 || m.isEven()){z = new Classic(m);} else {z = new Montgomery(m);}
			  return this.exp(e,z);
			}

			// protected
			BigInteger.prototype.copyTo = bnpCopyTo;
			BigInteger.prototype.fromInt = bnpFromInt;
			BigInteger.prototype.fromString = bnpFromString;
			BigInteger.prototype.clamp = bnpClamp;
			BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
			BigInteger.prototype.drShiftTo = bnpDRShiftTo;
			BigInteger.prototype.lShiftTo = bnpLShiftTo;
			BigInteger.prototype.rShiftTo = bnpRShiftTo;
			BigInteger.prototype.subTo = bnpSubTo;
			BigInteger.prototype.multiplyTo = bnpMultiplyTo;
			BigInteger.prototype.squareTo = bnpSquareTo;
			BigInteger.prototype.divRemTo = bnpDivRemTo;
			BigInteger.prototype.invDigit = bnpInvDigit;
			BigInteger.prototype.isEven = bnpIsEven;
			BigInteger.prototype.exp = bnpExp;

			// public
			BigInteger.prototype.toString = bnToString;
			BigInteger.prototype.negate = bnNegate;
			BigInteger.prototype.abs = bnAbs;
			BigInteger.prototype.compareTo = bnCompareTo;
			BigInteger.prototype.bitLength = bnBitLength;
			BigInteger.prototype.mod = bnMod;
			BigInteger.prototype.modPowInt = bnModPowInt;

			// "constants"
			BigInteger.ZERO = nbv(0);
			BigInteger.ONE = nbv(1);

			function SecureRandom() {}

			SecureRandom.prototype.nextBytes = rng_get_bytes;

			// base64.js
			var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			var b64pad="=";

			function hex2b64(h) {
			  var i;
			  var c;
			  var ret = "";
			  for(i = 0; i+3 <= h.length; i+=3) {
			    c = parseInt(h.substring(i,i+3),16);
			    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
			  }
			  if(i+1 == h.length) {
			    c = parseInt(h.substring(i,i+1),16);
			    ret += b64map.charAt(c << 2);
			  }
			  else if(i+2 == h.length) {
			    c = parseInt(h.substring(i,i+2),16);
			    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
			  }
			  while((ret.length & 3) > 0){ret += b64pad;}
			  return ret;
			}

			// convert a base64 string to hex
			function b64tohex(s) {
			  var ret = ""
			  var i;
			  var k = 0; // b64 state, 0-3
			  var slop;
			  for(i = 0; i < s.length; ++i) {
			    if(s.charAt(i) == b64pad) {
					break;
				}
			    v = b64map.indexOf(s.charAt(i));
			    if(v < 0) {
					continue;
				}
			    if(k == 0) {
			      ret += int2char(v >> 2);
			      slop = v & 3;
			      k = 1;
			    }
			    else if(k == 1) {
			      ret += int2char((slop << 2) | (v >> 4));
			      slop = v & 0xf;
			      k = 2;
			    }
			    else if(k == 2) {
			      ret += int2char(slop);
			      ret += int2char(v >> 2);
			      slop = v & 3;
			      k = 3;
			    }
			    else {
			      ret += int2char((slop << 2) | (v >> 4));
			      ret += int2char(v & 0xf);
			      k = 0;
			    }
			  }
			  if(k == 1){ret += int2char(slop << 2);}
			  return ret;
			}

			// convert a base64 string to a byte/number array
			function b64toBA(s) {
			  //piggyback on b64tohex for now, optimize later
			  var h = b64tohex(s);
			  var i;
			  var a = new Array();
			  for(i = 0; 2*i < h.length; ++i) {
			    a[i] = parseInt(h.substring(2*i,2*i+2),16);
			  }
			  return a;
			}

							var secondaryResponse = null;
			var primaryResponse = null;
			var useMultiSite = true;
			var timedOut = false;

			try {

			    var start = new Date().getTime();
			    var elapsedTime = 0;
			    var processState = 0;
			    var requestDetail = null;
			    var localErrorResponse = null;
			    var requestTimeout = determineTimeout(timeout);

			    determineMode(litleRequest);

			    setTimeout(
			       asynchResponseHandler
			        , 10
			    );

			    buildAndSendRequestDetail();

				var encPaypageId = null;
		        var encReportGroup = null;
		        var encOrderId = null;
		        var encId = null;
	        	var accountNumber;
				var hasCvv2;
				var useAccountNum;
				var hasApplePay;

	        } catch(err) {
	        	globalErrorHandler(err);
	        }

		    function sendRequest(primary) {
		    	var request;
		    	if ( primary) {
		        	request = VantivConfig.primaryUrl+"/LitlePayPage/paypage?" + requestDetail + "&targetServer=primary";
			    	jQuery.getJSON(request + "&jsoncallback=?",
		    	            function (data){
	    						primaryResponse = data;
		    	            }
		    	    );
		    	}
		    	else {
		        	request = VantivConfig.secondaryUrl+"/LitlePayPage/paypage?" + requestDetail + "&targetServer=secondary";
			    	jQuery.getJSON(request + "&jsoncallback=?",
		    	            function (data) {
	    						secondaryResponse = data;
		    	            }
		    	    );
		    	}
		    }

		    function reportRespTime(startTime,responseCode,timeout,litleRequest,primary) {
		    	try {
		    		var endDate = new Date();
		    		var endTime = endDate.getTime();
		    		var respTime = endTime - startTime;
		    		var t = 0;
		    		if ( timeout ) {
		    			t = timeout;
		    		}
		    		var ppId = encodeURIComponent(litleRequest.paypageId);
			        var encReportGroup = encodeURIComponent(litleRequest.reportGroup);
			        var encOrderId = encodeURIComponent(litleRequest.orderId);
			        var encId = encodeURIComponent(litleRequest.id);

			    	var url;
			    	var targetServer = "secondary";
			    	if ( primary) {
			        	url = VantivConfig.primaryUrl;
				    	console.log("litle-api3: received primary response - code=" + responseCode);
				    	targetServer = "primary";
			    	}
			    	else {
			        	url = VantivConfig.secondaryUrl;
				    	console.log("litle-api3: received secondary response - code=" + responseCode);
			    	}

		    		var statsData = "paypageId="+ppId+"&responseTime="+respTime+"&responseCode="+responseCode+"&tzOffset="+endDate.getTimezoneOffset()+"&timeout="+t;
		    		statsData += "&reportGroup="+encReportGroup+"&txnId="+encId+"&orderId="+encOrderId+"&startTime="+start+"&targetServer="+targetServer;
		    		setTimeout(function() {
		    			try {
		    				jQuery.getJSON(url+"/LitlePayPage/ppstats?" + statsData+"&jsoncallback=?",
			    	            function (data){
			    	            }
				    		);
		    			} catch(err) {}
		    		}, 0);
		    	} catch(err) {
		    		// do nothing
		    	}
		    }

		    function determineMode(litleRequest) {
			    if (litleRequest !== undefined && litleRequest.url != undefined && litleRequest.url != null && litleRequest.url.length > 0) {
			    	VantivConfig.primaryUrl = litleRequest.url;
			    	console.log("litle-api3: set primary url to " + litleRequest.url);
			    	if ( litleRequest.secondaryUrl != undefined && litleRequest.secondaryUrl !=  null && litleRequest.secondaryUrl.length > 0 ) {
			    		VantivConfig.secondaryUrl = litleRequest.secondaryUrl;
				    	console.log("litle-api3: set secondary url to " + litleRequest.secondaryUrl);
			    	}
			    }
			    useMultiSite = true;
		    	if ( (requestTimeout > 0 && requestTimeout <= VantivConfig.primaryTimeout) ||
		    			(VantivConfig.secondaryUrl == undefined || VantivConfig.secondaryUrl == null || VantivConfig.secondaryUrl.length == 0 ) ) {
		    		useMultiSite = false;
	                console.log("litle-api3: not using MultiSite because timeout too short or no secondary url");
			    }
		    }

		    function asynchResponseHandler(){
		    	try {
		            elapsedTime = new Date().getTime() - start;

		            if ( localErrorResponse != null ) {
		            	onFail(localErrorResponse);
		                return;
		            }

		            if(requestTimeout > 0 && elapsedTime > requestTimeout) {
		            	timedOut = true;
		            }
		            if ( useMultiSite ) {
		            	switch(processState) {
		            		case 0:		// initial state
		            			break;
		            		case 1:		// waiting for primary response, request not sent to secondary
				        		if ( primaryResponse != null ) {
				            		reportRespTime(start,primaryResponse.response, requestTimeout, litleRequest, true);
					                if (primaryResponse.response == '889') {
					                	processState = 3;
					                	sendRequest(false);
					                }
					                else {
					                	deliverLitleResponse(primaryResponse);
						                return;
					                }
					            }
				        		else if (elapsedTime > VantivConfig.primaryTimeout) {
								    console.log("litle-api3: timed out on primary response - sending request to secondary url");
								    processState = 2;
				        			sendRequest(false);
				        		}
		            			break;
		            		case 2:		// waiting for primary and secondary responses
				        		if ( primaryResponse != null ) {
				            		reportRespTime(start,primaryResponse.response, requestTimeout, litleRequest, true);
					                if (primaryResponse.response == '889') {
					                	processState = 3;
					                }
					                else {
					                	deliverLitleResponse(primaryResponse);
					                	return;
					                }
					            }
				        		else if ( secondaryResponse != null) {
				            		reportRespTime(start,secondaryResponse.response, requestTimeout, litleRequest, false);
					                if (secondaryResponse.response != '887' && secondaryResponse.response != '889') {
					                	deliverLitleResponse(secondaryResponse);
					                	return;
					                }
					                else {
					                	processState = 4;
					                }
				        		}
		            			break;
		            		case 3:		// received bad response from primary, waiting for secondary response
				        		if ( secondaryResponse != null) {
				            		reportRespTime(start,secondaryResponse.response, requestTimeout, litleRequest, false);
							    	if ( secondaryResponse.response == '887' ) {
					                	deliverLitleResponse(primaryResponse);
							    	}
							    	else {
							    		deliverLitleResponse(secondaryResponse);
							    	}
				                	return;
				        		}
				        		else if ( timedOut ) {
					                deliverLitleResponse(primaryResponse);
					            	return;
				        		}
		            			break;
		            		case 4:		// received bad response from secondary, waiting for primary response
				        		if ( primaryResponse != null ) {
				            		reportRespTime(start,primaryResponse.response, requestTimeout, litleRequest, true);
				                	deliverLitleResponse(primaryResponse);
				                	return;
				        		}
				        		else if ( timedOut ) {
								    if ( secondaryResponse.response == '887' ) {
								   		onTimeout();
								   	}
								   	else {
								   		deliverLitleResponse(secondaryResponse);
								   	}
					            	return;
				        		}
		            			break;
		            		default:
		            			break;
		            	}
		            }
		            else {
		                if (primaryResponse!=null) {
		                	reportRespTime(start,primaryResponse.response, timeout, litleRequest, true);
		                	deliverLitleResponse(primaryResponse);
		                	return;
		                }
		            }

		            if(timedOut) {
		            	if ( processState == 0 ) {
		            		// no request has been sent
		            		reportRespTime(start,'900',requestTimeout, litleRequest, true);
			            }
			            else {
			            	reportRespTime(start,'901',requestTimeout, litleRequest, true);
		            	}
	            		onTimeout();
		            }
		            else {
		                setTimeout(arguments.callee, 10);
		            }
		    	} catch(err) {
		    		globalErrorHandler(err);
		    		if ( localErrorResponse != null ) {
		    			deliverLitleResponse(localErrorResponse);
		    			return;
		    		}
		    	}
	        }




			function globalErrorHandler(err) {
				try {
					var errorHandler = encodeURIComponent("GLOBAL_TRY_CATCH"); // 16
					// alpha-numeric

					var lineNumber = encodeURIComponent(0); // 6 Integer
					var columnNumber = encodeURIComponent(0); // 6 Integer

					var errorMessage = encodeURIComponent("A"); // 64 alpha-numeric
					var errorStack = encodeURIComponent("NOT_A_STRING");
					if (typeof err === 'object') {
						try {
							if (typeof err.message === 'undefined') {
								errorMessage = "undefined";
							} else if (typeof err.message === 'string') {
								errorMessage = err.message;
								if (errorMessage.length > 1024) {
									errorMessage = errorMessage.substr(0, 1024);
								}
							} else {
								errorMessage = "NOT_A_STRING";
							}
						} catch (e) {
							errorMessage = "UNABLE_TO_GET_ERROR_FROM_OBJECT";
						} finally {
							errorMessage = encodeURIComponent(errorMessage);
						}

						try {
							// make sure this is a number and will fit in 6 digits
							// too big a number is TOO_BIG
							// not a number is NaN
							// undefined stack is UNDEFINED
							// exception getting value is EXCEPTION
							if (typeof err.stack === 'undefined') {
								lineNumber = encodeURIComponent("UNDEFINED"); // line
																				// number
								columnNumber = encodeURIComponent("UNDEFINED"); // column
																				// number
								errorStack = encodeURIComponent("UNDEFINED");
							} else if (typeof err.stack === 'string') {
								errorStack = err.stack;
								console.log(errorStack);

								if (errorStack.length > 3072) {
									errorStack = errorStack.substr(0, 3072);
								}

								var arr = /.*?litle-api.*?\.js:(\d+):(\d+)/
										.exec(errorStack);

								errorStack = encodeURIComponent(errorStack);

								if (!/^\d+$/.test(arr[1])) {
									lineNumber = "NaN";
								} else if (!/^\d{0,6}$/.test(arr[1])) {
									lineNumber = "TOO_BIG";
								} else {
									lineNumber = arr[1];
								}
								lineNumber = encodeURIComponent(lineNumber);

								if (!/^\d+$/.test(arr[2])) {
									columnNumber = "NaN";
								} else if (!/^\d{0,6}$/.test(arr[2])) {
									columnNumber = "TOO_BIG";
								} else {
									columnNumber = arr[2];
								}
								columnNumber = encodeURIComponent(columnNumber);
							}
						} catch (e) {
							lineNumber = encodeURIComponent("EXCEPTION");
							columnNumber = encodeURIComponent("EXCEPTION");
							if (errorStack.length > 2000) {
								errorStack = errorStack.substr(0, 2000);
							}
							errorStack = encodeURIComponent(errorStack);
						}
					} else if (typeof err === 'string') {
						if (err.length > 1024) {
							err = err.substr(0, 1024);
						}
						errorMessage = encodeURIComponent(err);
					}

					if (typeof litleRequest === 'object') {
						try {
							var paypageId = "undefined"; // 50 alpha-numeric
							if (typeof litleRequest.paypageId === 'undefined') {
								paypageId = "undefined";
							} else if (typeof litleRequest.paypageId === 'string') {
								paypageId = litleRequest.paypageId;
								if (paypageId.length > 50) {
									paypageId = paypageId.substr(0, 50);
								}
							} else {
								paypageId = "NOT_A_STRING";
							}
						} catch (e) {
							paypageId = "UNABLE_TO_GET_PAYPAGE_ID"
						} finally {
							paypageId = encodeURIComponent(paypageId);
						}

						var orderId = "undefined"; // 32 alpha-numeric
						try {
							if (typeof litleRequest.orderId === 'undefined') {
								orderId = 'undefined';
							} else if (typeof litleRequest.orderId === 'string') {
								orderId = litleRequest.orderId;
								if (orderId.length > 32) {
									orderId = orderId.substr(0, 32);
								}
							} else {
								orderId = "NOT_A_STRING";
							}
						} catch (e) {
							orderId = "UNABLE_TO_GET_ORDER_ID";
						} finally {
							orderId = encodeURIComponent(orderId);
						}

						var reportGroup = "undefined"; // 32 alpha-numeric
						try {
							if (typeof litleRequest.reportGroup === 'undefined') {
								reportGroup = 'undefined';
							} else if (typeof litleRequest.reportGroup === 'string') {
								reportGroup = litleRequest.reportGroup;
								if (reportGroup.length > 32) {
									reportGroup = reportGroup.substr(0, 32);
								}
							} else {
								reportGroup = "NOT_A_STRING";
							}
						} catch (e) {
							reportGroup = "UNABLE_TO_GET_REPORT_GROUP";
						} finally {
							reportGroup = encodeURIComponent(reportGroup);
						}
					}
					errorMessage = myVantivEProtectReporterForPpStats.removeNonStandardCharacters(errorMessage);
					errorStack = myVantivEProtectReporterForPpStats.removeNonStandardCharacters(errorStack);

					var errorData = "errorHandler=" + errorHandler + "&columnNumber="
							+ columnNumber + "&errorMessage=" + errorMessage
							+ "&lineNumber=" + lineNumber + "&paypageId=" + paypageId
							+ "&orderId=" + orderId + "&reportGroup=" + reportGroup
							+ "&errorStack=" + errorStack;

					var message = "http://stsai-vm2.dwi.litle.com:30084/LitlePayPage/ppstats?" + errorData
							+ "&jsoncallback=?";

					setTimeout(function() {
						try {
							jQuery.getJSON(message, function(data) {
							});
						} catch (err) {
						}
					}, 0);
				} catch (err1) {
				} finally {
					javascriptError("889", err);
				}

			}

			function buildAndSendRequestDetail() {

				if(litleFormFields === undefined) {
					return javascriptError("889", "Missing litleFormFields");
				}
				if(litleRequest === undefined) {
					return javascriptError("889", "Missing litleRequest");
				}


				if(litleFormFields.paypageRegistrationId){
					litleFormFields.paypageRegistrationId.value = "";
				}
			    if(litleFormFields.bin){
			    	litleFormFields.bin.value = "";
			    }

			    useAccountNum = true;
			    hasApplePay = false;
			    if (litleRequest.applepay !== undefined){
			    	if(litleRequest.applepay.data !== undefined
			    			&& litleRequest.applepay.signature !== undefined
			    			&& litleRequest.applepay.version !== undefined
			    			&& litleRequest.applepay.header.ephemeralPublicKey !== undefined
			    			&& litleRequest.applepay.header.publicKeyHash !== undefined
			    			&& litleRequest.applepay.header.transactionId !== undefined){
			    		useAccountNum = false;
			    		hasApplePay = true;
			    	}else{
			    		return javascriptError("889", "Missing ApplePay elements");
			    	}
			    }

			    if(useAccountNum){
			        try {
			        	validateParam("accountNum",litleFormFields.accountNum, REQUIRED_VALIDATOR, REASONABLE_PARAM_LENGTH_VALIDATOR);
			        } catch(er) {
			            return javascriptError("889", er);
			        }
			    	accountNumber = litleFormFields.accountNum.value;
			    	accountNumber = removeSpacesHyphens(accountNumber);

			    	hasCvv2 = (jQuery(litleFormFields.cvv2).length > 0);
			    	if (hasCvv2) {
			    		var cvv2 = litleFormFields.cvv2.value;
			    		cvv2 = removeSpacesHyphens(cvv2);
			    	}

			    	if (litleRequest.pciNonSensitive === undefined){
			    		litleRequest.pciNonSensitive = false;
			    	}

			    	var returnCode = isValid(accountNumber, litleRequest.pciNonSensitive);
			    	if(returnCode != "870") {
			    		return javascriptError(returnCode);
			    	}
			    	if(hasCvv2) {
			    		returnCode = isValidCvv2(cvv2);
			    		if(returnCode != "870") {
			    			return javascriptError(returnCode);
			    		}
			    	}

			    	try {
			    		var rsa = new RSAKey();
			    		var validKey = rsa.setPublic(LitleEncryption.modulus, LitleEncryption.exponent);
			    		var encryptedHex = rsa.encrypt(accountNumber);
			    		if (hasCvv2) {
							var encryptedCvv2Hex = rsa.encrypt(cvv2);
						}
			    	} catch(er) {
			    		myVantivEProtectReporterForPpStats.report3rdPartyError(er);
			    		return javascriptError("875");
			    	}

			    	if(encryptedHex) {
			    		var b64Account = hex2b64(encryptedHex);
			    		var encAccount = encodeURIComponent(b64Account);

			    		if (hasCvv2) {
			    			var b64Cvv2 = hex2b64(encryptedCvv2Hex);
			    			var encCvv2 = encodeURIComponent(b64Cvv2);
			    		}
			    	} else{
			    		return javascriptError("875");
			    	}
			    }

		        try {
		            validateParam("paypageId",litleRequest.paypageId, REQUIRED_VALIDATOR, REASONABLE_PARAM_LENGTH_VALIDATOR, ALPHANUMERIC_VALIDATOR);
		            validateParam("reportGroup",litleRequest.reportGroup, REQUIRED_VALIDATOR, REASONABLE_PARAM_LENGTH_VALIDATOR);
		            validateParam("id",litleRequest.id,REQUIRED_VALIDATOR, REASONABLE_PARAM_LENGTH_VALIDATOR);
		        } catch(er) {
		            return javascriptError("889", er);
		        }

		        encPaypageId = encodeURIComponent(litleRequest.paypageId);
		        encReportGroup = encodeURIComponent(litleRequest.reportGroup);
		        encOrderId = encodeURIComponent(litleRequest.orderId);
		        encId = encodeURIComponent(litleRequest.id);

		        requestDetail = "paypageId="+encPaypageId+"&reportGroup="+encReportGroup+"&id="+encId+"&orderId="+encOrderId;

		        if(useAccountNum){
		        	var encPciNonSensitive = encodeURIComponent(litleRequest.pciNonSensitive);
		        	requestDetail += "&encryptedAccount="+encAccount+"&publicKeyId="+LitleEncryption.keyId+"&pciNonSensitive=" + encPciNonSensitive;
		        }
		        if(hasApplePay){
		        	requestDetail += "&applepay.data=" + encodeURIComponent(litleRequest.applepay.data);
		        	requestDetail += "&applepay.signature=" + encodeURIComponent(litleRequest.applepay.signature);
		        	requestDetail += "&applepay.version=" + encodeURIComponent(litleRequest.applepay.version);
		        	requestDetail += "&applepay.header.ephemeralPublicKey=" + encodeURIComponent(litleRequest.applepay.header.ephemeralPublicKey);
		        	requestDetail += "&applepay.header.publicKeyHash=" + encodeURIComponent(litleRequest.applepay.header.publicKeyHash);
		        	requestDetail += "&applepay.header.transactionId=" + encodeURIComponent(litleRequest.applepay.header.transactionId);
	    			if(litleRequest.applepay.header.applicationData !== undefined) {
	    				requestDetail += "&applepay.header.applicationData=" + encodeURIComponent(litleRequest.applepay.header.applicationData);
	    			}
		        }
		        if (hasCvv2) {
			        requestDetail +="&encryptedCvv="+encCvv2;
		        }
		        processState = 1;
		        sendRequest(true);
		    }

		    function determineTimeout(timeoutParm) {
		    	if ( timeoutParm != undefined ) {
		    		if ( typeof timeoutParm == 'number') {
		    			return timeoutParm;
		    		}
		    		else if ( typeof timeoutParm == 'string') {
		    			var isNumber = /^[0-9]+$/.test(timeoutParm);
		    			if ( isNumber ) {
		    				return parseInt(timeoutParm);
		    			}
		    			return 15000;
		    		}
		    	}
		    	return 0;
		    }

		    function onSuccess(data) {
		    	if(useAccountNum){
		    		var cleanAccountNumber = removeSpacesHyphens(accountNumber);
		    		litleFormFields.accountNum.value = maskAccountNum(accountNumber);
		    		data.firstSix = cleanAccountNumber.substring(0,6);
		    		data.lastFour = cleanAccountNumber.substring(cleanAccountNumber.length-4, cleanAccountNumber.length);
		    		if(litleFormFields.extraAccountNums) {
		    			for(var key in litleFormFields.extraAccountNums) {
		    				var extra = litleFormFields.extraAccountNums[key];
		    				extra.value=maskAccountNum(removeSpacesHyphens(extra.value));
		    			}
		    		}
		    		if (hasCvv2){
		    			litleFormFields.cvv2.value="000";
		    		}
		    	}
		    	if(litleFormFields.bin){
			    	litleFormFields.bin.value = data.bin;
			    }
		    	if(litleFormFields.paypageRegistrationId){
			    	litleFormFields.paypageRegistrationId.value = data.paypageRegistrationId;
			    }
		    	if(successCallback === undefined) {
		    		throw "successCallback undefined";
		    	}
		    	if(typeof successCallback !== 'function') {
		    		throw "successCallback not a function";
		    	}

		        successCallback(data);
		    }

		    function onFail(data) {
		    	if(errorCallback === undefined) {
		    		throw "errorCallback undefined";
		    	}
		    	if(typeof errorCallback !== 'function') {
		    		throw "errorCallback not a function";
		    	}
		        errorCallback(data);
		    }

		    function onTimeout() {
		    	console.log("timed out");
		        timeoutCallback();
		    }

		    function deliverLitleResponse(litleResponse) {
		    	console.log("deliver response with code: " + litleResponse.response);
                if (litleResponse.response == '870') {
                    onSuccess(litleResponse);
                }
                else {
                    onFail(litleResponse);
                }
                return;
		    }

		    function maskAccountNum(accountNumber) {
		        if(!accountNumber) {
		            return accountNumber;
		        }
		        accountNumber = accountNumber.substring(0,accountNumber.length-4).replace(/./g,"X").concat(accountNumber.substring(accountNumber.length-4));
		        return accountNumber;
		    }

		    function isMod10(num) {
		        num = (num + '').split('').reverse();
		        if (!num.length) {
					return false;
				}
		        var total = 0, i;
		        for (i = 0; i < num.length; i++) {
		            num[i] = parseInt(num[i])
		            total += i % 2 ? 2 * num[i] - (num[i] > 4 ? 9 : 0) : num[i];
		        }
		        return (total % 10) == 0;
		    }

		    function isValid(accountNumber, pciNonSensitive) {
		    	
		        if(accountNumber.length < 13) {
		            return "872";
		        }
		        else if(accountNumber.length > 19) {
		            return "873";
		        }
		        else if(!accountNumber.match(/^[0-9]{13,19}$/)) {
		            return "874";
		        }
		        else if(!pciNonSensitive && !isMod10(accountNumber)) {
		            return "871";
		        }
		        else {
		            return "870";
		        }
		    }

		    function isValidCvv2(cvv2) {
		    	if(cvv2.length < 3) {
		    		return "882";
		    	}
		    	else if(cvv2.length > 4) {
		    		return "883";
		    	}
		    	else if(!cvv2.match(/^\d\d\d\d?$/)) {
		    		return "881";
		    	}
		    	else {
		    		return "870";
		    	}
		    }

		    function validateParam() {
		        var paramName = arguments[0];
		        var paramValue = arguments[1];
		        if(paramValue === undefined) {
		        	throw "Parameter " + paramName + " is undefined";
		        }
		        for(var i = 2; i < arguments.length; i++) {
		            arguments[i](paramName,paramValue);
		        }
		    }

		    function REQUIRED_VALIDATOR(paramName,paramValue) {
		        if(paramValue.length == 0) {
		            throw "Parameter " + paramName + " is required";
		        }
		    }

		    function REASONABLE_PARAM_LENGTH_VALIDATOR(paramName,paramValue) {
		        if(paramValue.length > 1024) {
		            throw "Parameter " + paramName + " is too long.  Length is " + paramValue.length;
		        }
		    }

		    function ALPHANUMERIC_VALIDATOR(paramName,paramValue) {
		        if(!paramValue.match(/^[0-9a-zA-Z]+$/)) {
		            throw "Parameter " + paramName + " with value " + paramValue + " is not alphanumeric";
		        }
		    }

		    function javascriptError(code, message) {
		        var jsError = {
		            "response" : null,
		            "message" : null
		        };

		        var returnCodeMap = {
		            "870" : "Success",
		            "871" : "Account number not mod10",
		            "872" : "Account number too short",
		            "873" : "Account number too long",
		            "874" : "Account number not numeric",
		            "875" : "Unable to encrypt field",
		            "876" : "Account number invalid",
		            "881" : "Card validation num not numeric",
		            "882" : "Card validation num too short",
		            "883" : "Card validation num too long",
		            "889" : "Failure"
		        };

		        function padzero(n) {
		            return n < 10 ? '0' + n : n;
		        }
		        function toISOString(d) {
		            return d.getUTCFullYear() + '-' +  padzero(d.getUTCMonth() + 1) + '-' + padzero(d.getUTCDate()) + 'T' + padzero(d.getUTCHours()) + ':' +  padzero(d.getUTCMinutes()) + ':' + padzero(d.getUTCSeconds());
		        }

		        jsError.response = code;
		        if(message == undefined) {
		            jsError.message = returnCodeMap[code];
		        }
		        else {
		            jsError.message = message;
		        }
		        jsError.responseTime = toISOString(new Date());
		        if(litleRequest !== undefined) {
		        	jsError.reportGroup = litleRequest.reportGroup;
		        	jsError.id = litleRequest.id;
		        	jsError.orderId = litleRequest.orderId;
		        }
		        localErrorResponse = jsError;
		    }

		    function removeSpacesHyphens(txt) {
		        return txt.replace(/[ -]/gi,"");
		    }

		}
	};
};
function rng_get_bytes(ba) {
    var rng_pptr = 0;
    var int8Array;
    var t;
    var sjcl_pool;
    var int8SingleValueArray;
    var int32SingleValueArray;

    try {
      if(window.crypto && window.crypto.getRandomValues) {
        int8Array = new Int8Array(ba.length);
        window.crypto.getRandomValues(int8Array);
        for(t = 0; t < int8Array.length; ++t) {
            while(int8Array[t] == 0) {
                int8SingleValueArray = new Int8Array(1);
                window.crypto.getRandomValues(int8SingleValueArray);
                int8Array[t] = int8SingleValueArray[0];
            }
          ba[rng_pptr++] = int8Array[t];
        }
      }
      else if(window.msCrypto && window.msCrypto.getRandomValues) {
        int8Array = new Int8Array(ba.length);
        window.msCrypto.getRandomValues(int8Array);
        for(t = 0; t < int8Array.length; ++t) {
            while(int8Array[t] == 0) {
                int8SingleValueArray = new Int8Array(1);
                window.msCrypto.getRandomValues(int8SingleValueArray);
                int8Array[t] = int8SingleValueArray[0];
            }
          ba[rng_pptr++] = int8Array[t];
        }
      }
      else {
        sjcl_pool = sjcl.random.randomWords((ba.length/4)+1, 0);
        var index = 0;
        while(rng_pptr < sjcl_pool.length) {
          var randomWord = sjcl_pool[rng_pptr++];
          var firstByte = randomWord >> 0 & 255;
          var secondByte = randomWord >> 8 & 255;
          var thirdByte = randomWord >> 16 & 255;
          var fourthByte = randomWord >> 24 & 255;
          while(firstByte == 0 || secondByte == 0 || thirdByte == 0 || fourthByte == 0) {
              int32SingleValueArray = new Array();
              int32SingleValueArray = sjcl.random.randomWords(1, 0);
              randomWord = int32SingleValueArray[0];
              firstByte = randomWord >> 0 & 255;
              secondByte = randomWord >> 8 & 255;
              thirdByte = randomWord >> 16 & 255;
              fourthByte = randomWord >> 24 & 255;
          }

          if(index < ba.length) {
            ba[index++] = firstByte;
          }
          if(index < ba.length) {
            ba[index++] = secondByte;
          }
          if(index < ba.length) {
            ba[index++] = thirdByte;
          }
          if(index < ba.length) {
            ba[index++] = fourthByte;
          }
        }
      }
    } catch(e) {
      //Something went wrong - Math.random is better than nothing
      for(t = 0; t < ba.length; ++t) {
          var randomByte = Math.floor((Math.random() * 255) + 1);
          while(randomByte == 0) {
              randomByte = Math.floor((Math.random() * 255) + 1);
          }
        ba[rng_pptr++] = randomByte;
      }
    }
    return 1;
  }
/** @fileOverview Javascript cryptography implementation.
*
* Crush to remove comments, shorten variable names and
* generally reduce transmission size.
*
* @author Emily Stark
* @author Mike Hamburg
* @author Dan Boneh
*/

"use strict";
/*jslint indent: 2, bitwise: false, nomen: false, plusplus: false, white: false, regexp: false */
/*global document, window, escape, unescape, Uint32Array */

/** @namespace The Stanford Javascript Crypto Library, top-level namespace. */
var sjcl = {
 /** @namespace Symmetric ciphers. */
 cipher: {},

 /** @namespace Hash functions.  Right now only SHA256 is implemented. */
 hash: {},

 /** @namespace Key exchange functions.  Right now only SRP is implemented. */
 keyexchange: {},

 /** @namespace Block cipher modes of operation. */
 mode: {},

 /** @namespace Miscellaneous.  HMAC and PBKDF2. */
 misc: {},

 /**
  * @namespace Bit array encoders and decoders.
  *
  * @description
  * The members of this namespace are functions which translate between
  * SJCL's bitArrays and other objects (usually strings).  Because it
  * isn't always clear which direction is encoding and which is decoding,
  * the method names are "fromBits" and "toBits".
  */
 codec: {},

 /** @namespace Exceptions. */
 exception: {
   /** @constructor Ciphertext is corrupt. */
   corrupt: function(message) {
     this.toString = function() { return "CORRUPT: "+this.message; };
     this.message = message;
   },

   /** @constructor Invalid parameter. */
   invalid: function(message) {
     this.toString = function() { return "INVALID: "+this.message; };
     this.message = message;
   },

   /** @constructor Bug or missing feature in SJCL. @constructor */
   bug: function(message) {
     this.toString = function() { return "BUG: "+this.message; };
     this.message = message;
   },

   /** @constructor Something isn't ready. */
   notReady: function(message) {
     this.toString = function() { return "NOT READY: "+this.message; };
     this.message = message;
   }
 }
};
/** @fileOverview Low-level AES implementation.
*
* This file contains a low-level implementation of AES, optimized for
* size and for efficiency on several browsers.  It is based on
* OpenSSL's aes_core.c, a public-domain implementation by Vincent
* Rijmen, Antoon Bosselaers and Paulo Barreto.
*
* An older version of this implementation is available in the public
* domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
* Stanford University 2008-2010 and BSD-licensed for liability
* reasons.
*
* @author Emily Stark
* @author Mike Hamburg
* @author Dan Boneh
*/

/**
* Schedule out an AES key for both encryption and decryption.  This
* is a low-level class.  Use a cipher mode to do bulk encryption.
*
* @constructor
* @param {Array} key The key as an array of 4, 6 or 8 words.
*
* @class Advanced Encryption Standard (low-level interface)
*/
sjcl.cipher.aes = function (key) {
 if (!this._tables[0][0][0]) {
   this._precompute();
 }

 var i, j, tmp,
   encKey, decKey,
   sbox = this._tables[0][4], decTable = this._tables[1],
   keyLen = key.length, rcon = 1;

 if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
   throw new sjcl.exception.invalid("invalid aes key size");
 }

 this._key = [encKey = key.slice(0), decKey = []];

 // schedule encryption keys
 for (i = keyLen; i < 4 * keyLen + 28; i++) {
   tmp = encKey[i-1];

   // apply sbox
   if (i%keyLen === 0 || (keyLen === 8 && i%keyLen === 4)) {
     tmp = sbox[tmp>>>24]<<24 ^ sbox[tmp>>16&255]<<16 ^ sbox[tmp>>8&255]<<8 ^ sbox[tmp&255];

     // shift rows and add rcon
     if (i%keyLen === 0) {
       tmp = tmp<<8 ^ tmp>>>24 ^ rcon<<24;
       rcon = rcon<<1 ^ (rcon>>7)*283;
     }
   }

   encKey[i] = encKey[i-keyLen] ^ tmp;
 }

 // schedule decryption keys
 for (j = 0; i; j++, i--) {
   tmp = encKey[j&3 ? i : i - 4];
   if (i<=4 || j<4) {
     decKey[j] = tmp;
   } else {
     decKey[j] = decTable[0][sbox[tmp>>>24      ]] ^
                 decTable[1][sbox[tmp>>16  & 255]] ^
                 decTable[2][sbox[tmp>>8   & 255]] ^
                 decTable[3][sbox[tmp      & 255]];
   }
 }
};

sjcl.cipher.aes.prototype = {
 // public
 /* Something like this might appear here eventually
 name: "AES",
 blockSize: 4,
 keySizes: [4,6,8],
 */

 /**
  * Encrypt an array of 4 big-endian words.
  * @param {Array} data The plaintext.
  * @return {Array} The ciphertext.
  */
 encrypt:function (data) { return this._crypt(data,0); },

 /**
  * Decrypt an array of 4 big-endian words.
  * @param {Array} data The ciphertext.
  * @return {Array} The plaintext.
  */
 decrypt:function (data) { return this._crypt(data,1); },

 /**
  * The expanded S-box and inverse S-box tables.  These will be computed
  * on the client so that we don't have to send them down the wire.
  *
  * There are two tables, _tables[0] is for encryption and
  * _tables[1] is for decryption.
  *
  * The first 4 sub-tables are the expanded S-box with MixColumns.  The
  * last (_tables[01][4]) is the S-box itself.
  *
  * @private
  */
 _tables: [[[],[],[],[],[]],[[],[],[],[],[]]],

 /**
  * Expand the S-box tables.
  *
  * @private
  */
 _precompute: function () {
  var encTable = this._tables[0], decTable = this._tables[1],
      sbox = encTable[4], sboxInv = decTable[4],
      i, x, xInv, d=[], th=[], x2, x4, x8, s, tEnc, tDec;

   // Compute double and third tables
  for (i = 0; i < 256; i++) {
    th[( d[i] = i<<1 ^ (i>>7)*283 )^i]=i;
  }

  for (x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
    // Compute sbox
    s = xInv ^ xInv<<1 ^ xInv<<2 ^ xInv<<3 ^ xInv<<4;
    s = s>>8 ^ s&255 ^ 99;
    sbox[x] = s;
    sboxInv[s] = x;

    // Compute MixColumns
    x8 = d[x4 = d[x2 = d[x]]];
    tDec = x8*0x1010101 ^ x4*0x10001 ^ x2*0x101 ^ x*0x1010100;
    tEnc = d[s]*0x101 ^ s*0x1010100;

    for (i = 0; i < 4; i++) {
      encTable[i][x] = tEnc = tEnc<<24 ^ tEnc>>>8;
      decTable[i][s] = tDec = tDec<<24 ^ tDec>>>8;
    }
  }

  // Compactify.  Considerable speedup on Firefox.
  for (i = 0; i < 5; i++) {
    encTable[i] = encTable[i].slice(0);
    decTable[i] = decTable[i].slice(0);
  }
 },

 /**
  * Encryption and decryption core.
  * @param {Array} input Four words to be encrypted or decrypted.
  * @param dir The direction, 0 for encrypt and 1 for decrypt.
  * @return {Array} The four encrypted or decrypted words.
  * @private
  */
 _crypt:function (input, dir) {
   if (input.length !== 4) {
     throw new sjcl.exception.invalid("invalid aes block size");
   }

   var key = this._key[dir],
       // state variables a,b,c,d are loaded with pre-whitened data
       a = input[0]           ^ key[0],
       b = input[dir ? 3 : 1] ^ key[1],
       c = input[2]           ^ key[2],
       d = input[dir ? 1 : 3] ^ key[3],
       a2, b2, c2,

       nInnerRounds = key.length/4 - 2,
       i,
       kIndex = 4,
       out = [0,0,0,0],
       table = this._tables[dir],

       // load up the tables
       t0    = table[0],
       t1    = table[1],
       t2    = table[2],
       t3    = table[3],
       sbox  = table[4];

   // Inner rounds.  Cribbed from OpenSSL.
   for (i = 0; i < nInnerRounds; i++) {
     a2 = t0[a>>>24] ^ t1[b>>16 & 255] ^ t2[c>>8 & 255] ^ t3[d & 255] ^ key[kIndex];
     b2 = t0[b>>>24] ^ t1[c>>16 & 255] ^ t2[d>>8 & 255] ^ t3[a & 255] ^ key[kIndex + 1];
     c2 = t0[c>>>24] ^ t1[d>>16 & 255] ^ t2[a>>8 & 255] ^ t3[b & 255] ^ key[kIndex + 2];
     d  = t0[d>>>24] ^ t1[a>>16 & 255] ^ t2[b>>8 & 255] ^ t3[c & 255] ^ key[kIndex + 3];
     kIndex += 4;
     a=a2; b=b2; c=c2;
   }

   // Last round.
   for (i = 0; i < 4; i++) {
     out[dir ? 3&-i : i] =
       sbox[a>>>24      ]<<24 ^
       sbox[b>>16  & 255]<<16 ^
       sbox[c>>8   & 255]<<8  ^
       sbox[d      & 255]     ^
       key[kIndex++];
     a2=a; a=b; b=c; c=d; d=a2;
   }

   return out;
 }
};

/** @fileOverview Arrays of bits, encoded as arrays of Numbers.
*
* @author Emily Stark
* @author Mike Hamburg
* @author Dan Boneh
*/

/** @namespace Arrays of bits, encoded as arrays of Numbers.
*
* @description
* <p>
* These objects are the currency accepted by SJCL's crypto functions.
* </p>
*
* <p>
* Most of our crypto primitives operate on arrays of 4-byte words internally,
* but many of them can take arguments that are not a multiple of 4 bytes.
* This library encodes arrays of bits (whose size need not be a multiple of 8
* bits) as arrays of 32-bit words.  The bits are packed, big-endian, into an
* array of words, 32 bits at a time.  Since the words are double-precision
* floating point numbers, they fit some extra data.  We use this (in a private,
* possibly-changing manner) to encode the number of bits actually  present
* in the last word of the array.
* </p>
*
* <p>
* Because bitwise ops clear this out-of-band data, these arrays can be passed
* to ciphers like AES which want arrays of words.
* </p>
*/
sjcl.bitArray = {
 /**
  * Array slices in units of bits.
  * @param {bitArray} a The array to slice.
  * @param {Number} bstart The offset to the start of the slice, in bits.
  * @param {Number} bend The offset to the end of the slice, in bits.  If this is undefined,
  * slice until the end of the array.
  * @return {bitArray} The requested slice.
  */
 bitSlice: function (a, bstart, bend) {
   a = sjcl.bitArray._shiftRight(a.slice(bstart/32), 32 - (bstart & 31)).slice(1);
   return (bend === undefined) ? a : sjcl.bitArray.clamp(a, bend-bstart);
 },

 /**
  * Extract a number packed into a bit array.
  * @param {bitArray} a The array to slice.
  * @param {Number} bstart The offset to the start of the slice, in bits.
  * @param {Number} length The length of the number to extract.
  * @return {Number} The requested slice.
  */
 extract: function(a, bstart, blength) {
   // FIXME: this Math.floor is not necessary at all, but for some reason
   // seems to suppress a bug in the Chromium JIT.
   var x, sh = Math.floor((-bstart-blength) & 31);
   if ((bstart + blength - 1 ^ bstart) & -32) {
     // it crosses a boundary
     x = (a[bstart/32|0] << (32 - sh)) ^ (a[bstart/32+1|0] >>> sh);
   } else {
     // within a single word
     x = a[bstart/32|0] >>> sh;
   }
   return x & ((1<<blength) - 1);
 },

 /**
  * Concatenate two bit arrays.
  * @param {bitArray} a1 The first array.
  * @param {bitArray} a2 The second array.
  * @return {bitArray} The concatenation of a1 and a2.
  */
 concat: function (a1, a2) {
   if (a1.length === 0 || a2.length === 0) {
     return a1.concat(a2);
   }

   var last = a1[a1.length-1], shift = sjcl.bitArray.getPartial(last);
   if (shift === 32) {
     return a1.concat(a2);
   } else {
     return sjcl.bitArray._shiftRight(a2, shift, last|0, a1.slice(0,a1.length-1));
   }
 },

 /**
  * Find the length of an array of bits.
  * @param {bitArray} a The array.
  * @return {Number} The length of a, in bits.
  */
 bitLength: function (a) {
   var l = a.length, x;
   if (l === 0) { return 0; }
   x = a[l - 1];
   return (l-1) * 32 + sjcl.bitArray.getPartial(x);
 },

 /**
  * Truncate an array.
  * @param {bitArray} a The array.
  * @param {Number} len The length to truncate to, in bits.
  * @return {bitArray} A new array, truncated to len bits.
  */
 clamp: function (a, len) {
   if (a.length * 32 < len) { return a; }
   a = a.slice(0, Math.ceil(len / 32));
   var l = a.length;
   len = len & 31;
   if (l > 0 && len) {
     a[l-1] = sjcl.bitArray.partial(len, a[l-1] & 0x80000000 >> (len-1), 1);
   }
   return a;
 },

 /**
  * Make a partial word for a bit array.
  * @param {Number} len The number of bits in the word.
  * @param {Number} x The bits.
  * @param {Number} [0] _end Pass 1 if x has already been shifted to the high side.
  * @return {Number} The partial word.
  */
 partial: function (len, x, _end) {
   if (len === 32) { return x; }
   return (_end ? x|0 : x << (32-len)) + len * 0x10000000000;
 },

 /**
  * Get the number of bits used by a partial word.
  * @param {Number} x The partial word.
  * @return {Number} The number of bits used by the partial word.
  */
 getPartial: function (x) {
   return Math.round(x/0x10000000000) || 32;
 },

 /**
  * Compare two arrays for equality in a predictable amount of time.
  * @param {bitArray} a The first array.
  * @param {bitArray} b The second array.
  * @return {boolean} true if a == b; false otherwise.
  */
 equal: function (a, b) {
   if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b)) {
     return false;
   }
   var x = 0, i;
   for (i=0; i<a.length; i++) {
     x |= a[i]^b[i];
   }
   return (x === 0);
 },

 /** Shift an array right.
  * @param {bitArray} a The array to shift.
  * @param {Number} shift The number of bits to shift.
  * @param {Number} [carry=0] A byte to carry in
  * @param {bitArray} [out=[]] An array to prepend to the output.
  * @private
  */
 _shiftRight: function (a, shift, carry, out) {
   var i, last2=0, shift2;
   if (out === undefined) { out = []; }

   for (; shift >= 32; shift -= 32) {
     out.push(carry);
     carry = 0;
   }
   if (shift === 0) {
     return out.concat(a);
   }

   for (i=0; i<a.length; i++) {
     out.push(carry | a[i]>>>shift);
     carry = a[i] << (32-shift);
   }
   last2 = a.length ? a[a.length-1] : 0;
   shift2 = sjcl.bitArray.getPartial(last2);
   out.push(sjcl.bitArray.partial(shift+shift2 & 31, (shift + shift2 > 32) ? carry : out.pop(),1));
   return out;
 },

 /** xor a block of 4 words together.
  * @private
  */
 _xor4: function(x,y) {
   return [x[0]^y[0],x[1]^y[1],x[2]^y[2],x[3]^y[3]];
 },

 /** byteswap a word array inplace.
  * (does not handle partial words)
  * @param {sjcl.bitArray} a word array
  * @return {sjcl.bitArray} byteswapped array
  */
 byteswapM: function(a) {
   var i, v, m = 0xff00;
   for (i = 0; i < a.length; ++i) {
     v = a[i];
     a[i] = (v >>> 24) | ((v >>> 8) & m) | ((v & m) << 8) | (v << 24);
   }
   return a;
 }
};
/** @fileOverview Bit array codec implementations.
*
* @author Emily Stark
* @author Mike Hamburg
* @author Dan Boneh
*/

/** @namespace UTF-8 strings */
sjcl.codec.utf8String = {
 /** Convert from a bitArray to a UTF-8 string. */
 fromBits: function (arr) {
   var out = "", bl = sjcl.bitArray.bitLength(arr), i, tmp;
   for (i=0; i<bl/8; i++) {
     if ((i&3) === 0) {
       tmp = arr[i/4];
     }
     out += String.fromCharCode(tmp >>> 24);
     tmp <<= 8;
   }
   return decodeURIComponent(escape(out));
 },

 /** Convert from a UTF-8 string to a bitArray. */
 toBits: function (str) {
   str = unescape(encodeURIComponent(str));
   var out = [], i, tmp=0;
   for (i=0; i<str.length; i++) {
     tmp = tmp << 8 | str.charCodeAt(i);
     if ((i&3) === 3) {
       out.push(tmp);
       tmp = 0;
     }
   }
   if (i&3) {
     out.push(sjcl.bitArray.partial(8*(i&3), tmp));
   }
   return out;
 }
};
/** @fileOverview Javascript SHA-256 implementation.
*
* An older version of this implementation is available in the public
* domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
* Stanford University 2008-2010 and BSD-licensed for liability
* reasons.
*
* Special thanks to Aldo Cortesi for pointing out several bugs in
* this code.
*
* @author Emily Stark
* @author Mike Hamburg
* @author Dan Boneh
*/

/**
* Context for a SHA-256 operation in progress.
* @constructor
* @class Secure Hash Algorithm, 256 bits.
*/
sjcl.hash.sha256 = function (hash) {
 if (!this._key[0]) { this._precompute(); }
 if (hash) {
   this._h = hash._h.slice(0);
   this._buffer = hash._buffer.slice(0);
   this._length = hash._length;
 } else {
   this.reset();
 }
};

/**
* Hash a string or an array of words.
* @static
* @param {bitArray|String} data the data to hash.
* @return {bitArray} The hash value, an array of 16 big-endian words.
*/
sjcl.hash.sha256.hash = function (data) {
 return (new sjcl.hash.sha256()).update(data).finalize();
};

sjcl.hash.sha256.prototype = {
 /**
  * The hash's block size, in bits.
  * @constant
  */
 blockSize: 512,

 /**
  * Reset the hash state.
  * @return this
  */
 reset:function () {
   this._h = this._init.slice(0);
   this._buffer = [];
   this._length = 0;
   return this;
 },

 /**
  * Input several words to the hash.
  * @param {bitArray|String} data the data to hash.
  * @return this
  */
 update: function (data) {
   if (typeof data === "string") {
     data = sjcl.codec.utf8String.toBits(data);
   }
   var i, b = this._buffer = sjcl.bitArray.concat(this._buffer, data),
       ol = this._length,
       nl = this._length = ol + sjcl.bitArray.bitLength(data);
   for (i = 512+ol & -512; i <= nl; i+= 512) {
     this._block(b.splice(0,16));
   }
   return this;
 },

 /**
  * Complete hashing and output the hash value.
  * @return {bitArray} The hash value, an array of 8 big-endian words.
  */
 finalize:function () {
   var i, b = this._buffer, h = this._h;

   // Round out and push the buffer
   b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1,1)]);

   // Round out the buffer to a multiple of 16 words, less the 2 length words.
   for (i = b.length + 2; i & 15; i++) {
     b.push(0);
   }

   // append the length
   b.push(Math.floor(this._length / 0x100000000));
   b.push(this._length | 0);

   while (b.length) {
     this._block(b.splice(0,16));
   }

   this.reset();
   return h;
 },

 /**
  * The SHA-256 initialization vector, to be precomputed.
  * @private
  */
 _init:[],
 /*
 _init:[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19],
 */

 /**
  * The SHA-256 hash key, to be precomputed.
  * @private
  */
 _key:[],
 /*
 _key:
   [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2],
 */


 /**
  * Function to precompute _init and _key.
  * @private
  */
 _precompute: function () {
   var i = 0, prime = 2, factor;

   function frac(x) { return (x-Math.floor(x)) * 0x100000000 | 0; }

   outer: for (; i<64; prime++) {
     for (factor=2; factor*factor <= prime; factor++) {
       if (prime % factor === 0) {
         // not a prime
         continue outer;
       }
     }

     if (i<8) {
       this._init[i] = frac(Math.pow(prime, 1/2));
     }
     this._key[i] = frac(Math.pow(prime, 1/3));
     i++;
   }
 },

 /**
  * Perform one cycle of SHA-256.
  * @param {bitArray} words one block of words.
  * @private
  */
 _block:function (words) {
   var i, tmp, a, b,
     w = words.slice(0),
     h = this._h,
     k = this._key,
     h0 = h[0], h1 = h[1], h2 = h[2], h3 = h[3],
     h4 = h[4], h5 = h[5], h6 = h[6], h7 = h[7];

   /* Rationale for placement of |0 :
    * If a value can overflow is original 32 bits by a factor of more than a few
    * million (2^23 ish), there is a possibility that it might overflow the
    * 53-bit mantissa and lose precision.
    *
    * To avoid this, we clamp back to 32 bits by |'ing with 0 on any value that
    * propagates around the loop, and on the hash state h[].  I don't believe
    * that the clamps on h4 and on h0 are strictly necessary, but it's close
    * (for h4 anyway), and better safe than sorry.
    *
    * The clamps on h[] are necessary for the output to be correct even in the
    * common case and for short inputs.
    */
   for (i=0; i<64; i++) {
     // load up the input word for this round
     if (i<16) {
       tmp = w[i];
     } else {
       a   = w[(i+1 ) & 15];
       b   = w[(i+14) & 15];
       tmp = w[i&15] = ((a>>>7  ^ a>>>18 ^ a>>>3  ^ a<<25 ^ a<<14) +
                        (b>>>17 ^ b>>>19 ^ b>>>10 ^ b<<15 ^ b<<13) +
                        w[i&15] + w[(i+9) & 15]) | 0;
     }

     tmp = (tmp + h7 + (h4>>>6 ^ h4>>>11 ^ h4>>>25 ^ h4<<26 ^ h4<<21 ^ h4<<7) +  (h6 ^ h4&(h5^h6)) + k[i]); // | 0;

     // shift register
     h7 = h6; h6 = h5; h5 = h4;
     h4 = h3 + tmp | 0;
     h3 = h2; h2 = h1; h1 = h0;

     h0 = (tmp +  ((h1&h2) ^ (h3&(h1^h2))) + (h1>>>2 ^ h1>>>13 ^ h1>>>22 ^ h1<<30 ^ h1<<19 ^ h1<<10)) | 0;
   }

   h[0] = h[0]+h0 | 0;
   h[1] = h[1]+h1 | 0;
   h[2] = h[2]+h2 | 0;
   h[3] = h[3]+h3 | 0;
   h[4] = h[4]+h4 | 0;
   h[5] = h[5]+h5 | 0;
   h[6] = h[6]+h6 | 0;
   h[7] = h[7]+h7 | 0;
 }
};


/** @fileOverview Random number generator.
*
* @author Emily Stark
* @author Mike Hamburg
* @author Dan Boneh
* @author Michael Brooks
*/

/** @constructor
* @class Random number generator
* @description
* <b>Use sjcl.random as a singleton for this class!</b>
* <p>
* This random number generator is a derivative of Ferguson and Schneier's
* generator Fortuna.  It collects entropy from various events into several
* pools, implemented by streaming SHA-256 instances.  It differs from
* ordinary Fortuna in a few ways, though.
* </p>
*
* <p>
* Most importantly, it has an entropy estimator.  This is present because
* there is a strong conflict here between making the generator available
* as soon as possible, and making sure that it doesn't "run on empty".
* In Fortuna, there is a saved state file, and the system is likely to have
* time to warm up.
* </p>
*
* <p>
* Second, because users are unlikely to stay on the page for very long,
* and to speed startup time, the number of pools increases logarithmically:
* a new pool is created when the previous one is actually used for a reseed.
* This gives the same asymptotic guarantees as Fortuna, but gives more
* entropy to early reseeds.
* </p>
*
* <p>
* The entire mechanism here feels pretty klunky.  Furthermore, there are
* several improvements that should be made, including support for
* dedicated cryptographic functions that may be present in some browsers;
* state files in local storage; cookies containing randomness; etc.  So
* look for improvements in future versions.
* </p>
*/
sjcl.prng = function(defaultParanoia) {

 /* private */
 this._pools                   = [new sjcl.hash.sha256()];
 this._poolEntropy             = [0];
 this._reseedCount             = 0;
 this._robins                  = {};
 this._eventId                 = 0;

 this._collectorIds            = {};
 this._collectorIdNext         = 0;

 this._strength                = 0;
 this._poolStrength            = 0;
 this._nextReseed              = 0;
 this._key                     = [0,0,0,0,0,0,0,0];
 this._counter                 = [0,0,0,0];
 this._cipher                  = undefined;
 this._defaultParanoia         = defaultParanoia;

 /* event listener stuff */
 this._collectorsStarted       = false;
 this._callbacks               = {progress: {}, seeded: {}};
 this._callbackI               = 0;

 /* constants */
 this._NOT_READY               = 0;
 this._READY                   = 1;
 this._REQUIRES_RESEED         = 2;

 this._MAX_WORDS_PER_BURST     = 65536;
 this._PARANOIA_LEVELS         = [0,48,64,96,128,192,256,384,512,768,1024];
 this._MILLISECONDS_PER_RESEED = 30000;
 this._BITS_PER_RESEED         = 80;
};

sjcl.prng.prototype = {
 /** Generate several random words, and return them in an array.
  * A word consists of 32 bits (4 bytes)
  * @param {Number} nwords The number of words to generate.
  */
 randomWords: function (nwords, paranoia) {
   var out = [], i, readiness = this.isReady(paranoia), g;

   if (readiness === this._NOT_READY) {
     throw new sjcl.exception.notReady("generator isn't seeded");
   } else if (readiness & this._REQUIRES_RESEED) {
     this._reseedFromPools(!(readiness & this._READY));
   }

   for (i=0; i<nwords; i+= 4) {
     if ((i+1) % this._MAX_WORDS_PER_BURST === 0) {
       this._gate();
     }

     g = this._gen4words();
     out.push(g[0],g[1],g[2],g[3]);
   }
   this._gate();

   return out.slice(0,nwords);
 },

 setDefaultParanoia: function (paranoia, allowZeroParanoia) {
   if (paranoia === 0 && allowZeroParanoia !== "Setting paranoia=0 will ruin your security; use it only for testing") {
     throw "Setting paranoia=0 will ruin your security; use it only for testing";
   }

   this._defaultParanoia = paranoia;
 },

 /**
  * Add entropy to the pools.
  * @param data The entropic value.  Should be a 32-bit integer, array of 32-bit integers, or string
  * @param {Number} estimatedEntropy The estimated entropy of data, in bits
  * @param {String} source The source of the entropy, eg "mouse"
  */
 addEntropy: function (data, estimatedEntropy, source) {
   source = source || "user";

   var id,
     i, tmp,
     t = (new Date()).valueOf(),
     robin = this._robins[source],
     oldReady = this.isReady(), err = 0, objName;

   id = this._collectorIds[source];
   if (id === undefined) { id = this._collectorIds[source] = this._collectorIdNext ++; }

   if (robin === undefined) { robin = this._robins[source] = 0; }
   if (isNaN(robin)) { robin = this._robins[source] = 0; }
   this._robins[source] = ( this._robins[source] + 1 ) % this._pools.length;

   switch(typeof(data)) {

   case "number":
     if (estimatedEntropy === undefined) {
       estimatedEntropy = 1;
     }
     this._pools[robin].update([id,this._eventId++,1,estimatedEntropy,t,1,data|0]);
     break;

   case "object":
     objName = Object.prototype.toString.call(data);
     if (objName === "[object Uint32Array]") {
       tmp = [];
       for (i = 0; i < data.length; i++) {
         tmp.push(data[i]);
       }
       data = tmp;
     } else {
       if (objName !== "[object Array]") {
         err = 1;
       }
       for (i=0; i<data.length && !err; i++) {
         if (typeof(data[i]) !== "number") {
           err = 1;
         }
       }
     }
     if (!err) {
       if (estimatedEntropy === undefined) {
         /* horrible entropy estimator */
         estimatedEntropy = 0;
         for (i=0; i<data.length; i++) {
           tmp= data[i];
           while (tmp>0) {
             estimatedEntropy++;
             tmp = tmp >>> 1;
           }
         }
       }
       this._pools[robin].update([id,this._eventId++,2,estimatedEntropy,t,data.length].concat(data));
     }
     break;

   case "string":
     if (estimatedEntropy === undefined) {
      /* English text has just over 1 bit per character of entropy.
       * But this might be HTML or something, and have far less
       * entropy than English...  Oh well, let's just say one bit.
       */
      estimatedEntropy = data.length;
     }
     this._pools[robin].update([id,this._eventId++,3,estimatedEntropy,t,data.length]);
     this._pools[robin].update(data);
     break;

   default:
     err=1;
   }
   if (err) {
     throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");
   }

   /* record the new strength */
   this._poolEntropy[robin] += estimatedEntropy;
   this._poolStrength += estimatedEntropy;

   /* fire off events */
   if (oldReady === this._NOT_READY) {
     if (this.isReady() !== this._NOT_READY) {
       this._fireEvent("seeded", Math.max(this._strength, this._poolStrength));
     }
     this._fireEvent("progress", this.getProgress());
   }
 },

 /** Is the generator ready? */
 isReady: function (paranoia) {
   var entropyRequired = this._PARANOIA_LEVELS[ (paranoia !== undefined) ? paranoia : this._defaultParanoia ];

   if (this._strength && this._strength >= entropyRequired) {
     return (this._poolEntropy[0] > this._BITS_PER_RESEED && (new Date()).valueOf() > this._nextReseed) ?
       this._REQUIRES_RESEED | this._READY :
       this._READY;
   } else {
     return (this._poolStrength >= entropyRequired) ?
       this._REQUIRES_RESEED | this._NOT_READY :
       this._NOT_READY;
   }
 },

 /** Get the generator's progress toward readiness, as a fraction */
 getProgress: function (paranoia) {
   var entropyRequired = this._PARANOIA_LEVELS[ paranoia ? paranoia : this._defaultParanoia ];

   if (this._strength >= entropyRequired) {
     return 1.0;
   } else {
     return (this._poolStrength > entropyRequired) ?
       1.0 :
       this._poolStrength / entropyRequired;
   }
 },

 /** start the built-in entropy collectors */
 startCollectors: function () {
   if (this._collectorsStarted) { return; }

   this._eventListener = {
     loadTimeCollector: this._bind(this._loadTimeCollector),
     mouseCollector: this._bind(this._mouseCollector),
     keyboardCollector: this._bind(this._keyboardCollector),
     accelerometerCollector: this._bind(this._accelerometerCollector),
     touchCollector: this._bind(this._touchCollector)
   };

   if (window.addEventListener) {
     window.addEventListener("load", this._eventListener.loadTimeCollector, false);
     window.addEventListener("mousemove", this._eventListener.mouseCollector, false);
     window.addEventListener("keypress", this._eventListener.keyboardCollector, false);
     window.addEventListener("devicemotion", this._eventListener.accelerometerCollector, false);
     window.addEventListener("touchmove", this._eventListener.touchCollector, false);
   } else if (document.attachEvent) {
     document.attachEvent("onload", this._eventListener.loadTimeCollector);
     document.attachEvent("onmousemove", this._eventListener.mouseCollector);
     document.attachEvent("keypress", this._eventListener.keyboardCollector);
   } else {
     throw new sjcl.exception.bug("can't attach event");
   }

   this._collectorsStarted = true;
 },

 /** stop the built-in entropy collectors */
 stopCollectors: function () {
   if (!this._collectorsStarted) { return; }

   if (window.removeEventListener) {
     window.removeEventListener("load", this._eventListener.loadTimeCollector, false);
     window.removeEventListener("mousemove", this._eventListener.mouseCollector, false);
     window.removeEventListener("keypress", this._eventListener.keyboardCollector, false);
     window.removeEventListener("devicemotion", this._eventListener.accelerometerCollector, false);
     window.removeEventListener("touchmove", this._eventListener.touchCollector, false);
   } else if (document.detachEvent) {
     document.detachEvent("onload", this._eventListener.loadTimeCollector);
     document.detachEvent("onmousemove", this._eventListener.mouseCollector);
     document.detachEvent("keypress", this._eventListener.keyboardCollector);
   }

   this._collectorsStarted = false;
 },

 /* use a cookie to store entropy.
 useCookie: function (all_cookies) {
     throw new sjcl.exception.bug("random: useCookie is unimplemented");
 },*/

 /** add an event listener for progress or seeded-ness. */
 addEventListener: function (name, callback) {
   this._callbacks[name][this._callbackI++] = callback;
 },

 /** remove an event listener for progress or seeded-ness */
 removeEventListener: function (name, cb) {
   var i, j, cbs=this._callbacks[name], jsTemp=[];

   /* I'm not sure if this is necessary; in C++, iterating over a
    * collection and modifying it at the same time is a no-no.
    */

   for (j in cbs) {
     if (cbs.hasOwnProperty(j) && cbs[j] === cb) {
       jsTemp.push(j);
     }
   }

   for (i=0; i<jsTemp.length; i++) {
     j = jsTemp[i];
     delete cbs[j];
   }
 },

 _bind: function (func) {
   var that = this;
   return function () {
     func.apply(that, arguments);
   };
 },

 /** Generate 4 random words, no reseed, no gate.
  * @private
  */
 _gen4words: function () {
   for (var i=0; i<4; i++) {
     this._counter[i] = this._counter[i]+1 | 0;
     if (this._counter[i]) { break; }
   }
   return this._cipher.encrypt(this._counter);
 },

 /* Rekey the AES instance with itself after a request, or every _MAX_WORDS_PER_BURST words.
  * @private
  */
 _gate: function () {
   this._key = this._gen4words().concat(this._gen4words());
   this._cipher = new sjcl.cipher.aes(this._key);
 },

 /** Reseed the generator with the given words
  * @private
  */
 _reseed: function (seedWords) {
   this._key = sjcl.hash.sha256.hash(this._key.concat(seedWords));
   this._cipher = new sjcl.cipher.aes(this._key);
   for (var i=0; i<4; i++) {
     this._counter[i] = this._counter[i]+1 | 0;
     if (this._counter[i]) { break; }
   }
 },

 /** reseed the data from the entropy pools
  * @param full If set, use all the entropy pools in the reseed.
  */
 _reseedFromPools: function (full) {
   var reseedData = [], strength = 0, i;

   this._nextReseed = reseedData[0] =
     (new Date()).valueOf() + this._MILLISECONDS_PER_RESEED;

   for (i=0; i<16; i++) {
     /* On some browsers, this is cryptographically random.  So we might
      * as well toss it in the pot and stir...
      */
     reseedData.push(Math.random()*0x100000000|0);
   }

   for (i=0; i<this._pools.length; i++) {
    reseedData = reseedData.concat(this._pools[i].finalize());
    strength += this._poolEntropy[i];
    this._poolEntropy[i] = 0;

    if (!full && (this._reseedCount & (1<<i))) { break; }
   }

   /* if we used the last pool, push a new one onto the stack */
   if (this._reseedCount >= 1 << this._pools.length) {
    this._pools.push(new sjcl.hash.sha256());
    this._poolEntropy.push(0);
   }

   /* how strong was this reseed? */
   this._poolStrength -= strength;
   if (strength > this._strength) {
     this._strength = strength;
   }

   this._reseedCount ++;
   this._reseed(reseedData);
 },

 _keyboardCollector: function () {
   this._addCurrentTimeToEntropy(1);
 },

 _mouseCollector: function (ev) {
   var x, y;

   try {
     x = ev.x || ev.clientX || ev.offsetX || 0;
     y = ev.y || ev.clientY || ev.offsetY || 0;
   } catch (err) {
     // Event originated from a secure element. No mouse position available.
     x = 0;
     y = 0;
   }

   if (x != 0 && y!= 0) {
     sjcl.random.addEntropy([x,y], 2, "mouse");
   }

   this._addCurrentTimeToEntropy(0);
 },

 _touchCollector: function(ev) {
   var touch = ev.touches[0] || ev.changedTouches[0];
   var x = touch.pageX || touch.clientX,
       y = touch.pageY || touch.clientY;

   sjcl.random.addEntropy([x,y],1,"touch");

   this._addCurrentTimeToEntropy(0);
 },

 _loadTimeCollector: function () {
   this._addCurrentTimeToEntropy(2);
 },

 _addCurrentTimeToEntropy: function (estimatedEntropy) {
   if (typeof window !== 'undefined' && window.performance && typeof window.performance.now === "function") {
     //how much entropy do we want to add here?
     sjcl.random.addEntropy(window.performance.now(), estimatedEntropy, "loadtime");
   } else {
     sjcl.random.addEntropy((new Date()).valueOf(), estimatedEntropy, "loadtime");
   }
 },
 _accelerometerCollector: function (ev) {
   var ac = ev.accelerationIncludingGravity.x||ev.accelerationIncludingGravity.y||ev.accelerationIncludingGravity.z;
   if(window.orientation){
     var or = window.orientation;
     if (typeof or === "number") {
       sjcl.random.addEntropy(or, 1, "accelerometer");
     }
   }
   if (ac) {
     sjcl.random.addEntropy(ac, 2, "accelerometer");
   }
   this._addCurrentTimeToEntropy(0);
 },

 _fireEvent: function (name, arg) {
   var j, cbs=sjcl.random._callbacks[name], cbsTemp=[];
   /* TODO: there is a race condition between removing collectors and firing them */

   /* I'm not sure if this is necessary; in C++, iterating over a
    * collection and modifying it at the same time is a no-no.
    */

   for (j in cbs) {
     if (cbs.hasOwnProperty(j)) {
       cbsTemp.push(cbs[j]);
     }
   }

   for (j=0; j<cbsTemp.length; j++) {
     cbsTemp[j](arg);
   }
 }
};

try {
/** an instance for the prng.
* @see sjcl.prng
*/
sjcl.random = new sjcl.prng(6);
} catch(err) {
	myVantivEProtectReporterForPpStats.report3rdPartyError(err);
}

(function(){
 // function for getting nodejs crypto module. catches and ignores errors.
 try {
   var buf, crypt, ab;

   // get cryptographically strong entropy depending on runtime environment
   if (typeof window !== 'undefined' && typeof Uint32Array !== 'undefined') {
     ab = new Uint32Array(32);
     if (window.crypto && window.crypto.getRandomValues) {
       window.crypto.getRandomValues(ab);
     } else if (window.msCrypto && window.msCrypto.getRandomValues) {
       window.msCrypto.getRandomValues(ab);
     } else {
       return;
     }

     // get cryptographically strong entropy in Webkit
     sjcl.random.addEntropy(ab, 1024, "crypto.getRandomValues");

   } else {
     // no getRandomValues :-(
   }
 } catch (e) {
   if (typeof window !== 'undefined' && window.console) {
     console.log("There was an error collecting entropy from the browser:");
     console.log(e);
     //we do not want the library to fail due to randomness not being maintained.
   }
   myVantivEProtectReporterForPpStats.report3rdPartyError(e);
 }
}());


try {
sjcl.random = new sjcl.prng(0);
sjcl.random.startCollectors();
} catch(err) {
	myVantivEProtectReporterForPpStats.report3rdPartyError(err);
}

/*! All code below is covered by the following license.
 */

/*!
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

// rsa.js
 // Version 1.1: support utf-8 encoding in pkcs1pad2

// convert a (hex) string to a bignum object
function parseBigInt(str,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("parseBigInt");
  return new BigInteger(str,r);
}

function linebrk(s,n) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("linebrk");
  var ret = "";
  var i = 0;
  while(i + n < s.length) {
    ret += s.substring(i,i+n) + "\n";
    i += n;
  }
  return ret + s.substring(i,s.length);
}

function byte2Hex(b) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("byte2Hex");
  if(b < 0x10) {
	return "0" + b.toString(16);
} else {
	return b.toString(16);
}
}

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s,n) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("pkcs1pad2");
  if(n < s.length + 11) { // TODO: fix for utf-8
    throw "Message too long for RSA";
  }
  var ba = new Array();
  var i = s.length - 1;
  while(i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if(c < 128) { // encode using utf-8
      ba[--n] = c;
    }
    else if((c > 127) && (c < 2048)) {
      ba[--n] = (c & 63) | 128;
      ba[--n] = (c >> 6) | 192;
    }
    else {
      ba[--n] = (c & 63) | 128;
      ba[--n] = ((c >> 6) & 63) | 128;
      ba[--n] = (c >> 12) | 224;
    }
  }
  ba[--n] = 0;
  var rng = new SecureRandom();
  var x = new Array(n-2);
  rng.nextBytes(x);
  i = 0;
  while(n > 2) {
    ba[--n] = x[i];
    i++;
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new BigInteger(ba);
}

// "empty" RSA key constructor
function RSAKey() {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("RSAKey");
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
}

// Set the public key fields N and e from hex strings
function RSASetPublic(N,E) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("RSASetPublic");
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
  }
  else {
    throw "Error setting public key";
  }

}

// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("RSADoPublic");
  return x.modPowInt(this.e, this.n);
}

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
function RSAEncrypt(text) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("RSAEncrypt");
  var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
  if(m == null) {
	return null;
}
  var c = this.doPublic(m);
  if(c == null) {
	return null;
}
  var h = c.toString(16);
  if((h.length & 1) == 0) {
	return h;
} else {
	return "0" + h;
}
}

// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
//function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
//}

// protected
RSAKey.prototype.doPublic = RSADoPublic;

// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;


// jsbn.js
// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
function BigInteger(a,b,c) {
	if(a === "ZERO") {
		this.t = 0;
		this.s = 0;
		return;
	}
	else if(a === "ONE") {
		this.t = 1;
		this.s = 0;
		this[0] = 1;
		return;
	}
	myVantivEProtectReporterForPpStats.reportMethodInvocation("BigInteger");
  if(a != null) {
	if("number" == typeof a){
		this.fromNumber(a,b,c);
	}else if(b == null && "string" != typeof a) {
		this.fromString(a,256);
	} else {
		this.fromString(a,b);
	}
}
}

// return new, unset BigInteger
function nbi() { 
	myVantivEProtectReporterForPpStats.reportMethodInvocation("nbi");
	return new BigInteger(null); 
}

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i,x,w,j,c,n) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("am1");
  while(--n >= 0) {
    var v = x*this[i++]+w[j]+c;
    c = Math.floor(v/0x4000000);
    w[j++] = v&0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i,x,w,j,c,n) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("am2");
  var xl = x&0x7fff, xh = x>>15;
  while(--n >= 0) {
    var l = this[i]&0x7fff;
    var h = this[i++]>>15;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
    w[j++] = l&0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i,x,w,j,c,n) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("am3");
  var xl = x&0x3fff, xh = x>>14;
  while(--n >= 0) {
    var l = this[i]&0x3fff;
    var h = this[i++]>>14;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
    c = (l>>28)+(m>>14)+xh*h;
    w[j++] = l&0xfffffff;
  }
  return c;
}
if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
  BigInteger.prototype.am = am2;
  dbits = 30;
}
else if(j_lm && (navigator.appName != "Netscape")) {
  BigInteger.prototype.am = am1;
  dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1<<dbits)-1);
BigInteger.prototype.DV = (1<<dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2,BI_FP);
BigInteger.prototype.F1 = BI_FP-dbits;
BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr,vv;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv) {BI_RC[rr++] = vv;}
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) {BI_RC[rr++] = vv;}
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) {BI_RC[rr++] = vv;}

function int2char(n) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("int2char");
	return BI_RM.charAt(n); 
}
function intAt(s,i) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("intAt");
  var c = BI_RC[s.charCodeAt(i)];
  return (c==null)?-1:c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpCopyTo");
  for(var i = this.t-1; i >= 0; --i) {r[i] = this[i];}
  r.t = this.t;
  r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpFromInt");
  this.t = 1;
  this.s = (x<0)?-1:0;
  if(x > 0){this[0] = x;}else if(x < -1){this[0] = x+DV;} else {this.t = 0;}
}

// return bigint initialized to value
function nbv(i) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("nbv");
	var r = nbi(); 
	r.fromInt(i); 
	return r; 
}

// (protected) set from string and radix
function bnpFromString(s,b) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpFromString");
  var k;
  if(b == 16){k = 4;}else if(b == 8){k = 3;}else if(b == 256){k = 8; // byte array
}else if(b == 2){k = 1;}else if(b == 32){k = 5;}else if(b == 4){k = 2;}else { this.fromRadix(s,b); return; }
  this.t = 0;
  this.s = 0;
  var i = s.length, mi = false, sh = 0;
  while(--i >= 0) {
    var x = (k==8)?s[i]&0xff:intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-"){mi = true;}
      continue;
    }
    mi = false;
    if(sh == 0){this[this.t++] = x;}else if(sh+k > this.DB) {
      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
      this[this.t++] = (x>>(this.DB-sh));
    } else {this[this.t-1] |= x<<sh;}
    sh += k;
    if(sh >= this.DB){sh -= this.DB;}
  }
  if(k == 8 && (s[0]&0x80) != 0) {
    this.s = -1;
    if(sh > 0){this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;}
  }
  this.clamp();
  if(mi){BigInteger.ZERO.subTo(this,this);}
}

// (protected) clamp off excess high words
function bnpClamp() {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpClamp");
  var c = this.s&this.DM;
  while(this.t > 0 && this[this.t-1] == c){--this.t;}
}

// (public) return string representation in given radix
function bnToString(b) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnToString");
  if(this.s < 0) {
	return "-"+this.negate().toString(b);
}
  var k;
  if(b == 16){k = 4;}else if(b == 8){k = 3;}else if(b == 2){k = 1;}else if(b == 32){k = 5;}else if(b == 4){k = 2;} else {
	return this.toRadix(b);
}
  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
  var p = this.DB-(i*this.DB)%k;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
    while(i >= 0) {
      if(p < k) {
        d = (this[i]&((1<<p)-1))<<(k-p);
        d |= this[--i]>>(p+=this.DB-k);
      }
      else {
        d = (this[i]>>(p-=k))&km;
        if(p <= 0) { p += this.DB; --i; }
      }
      if(d > 0){m = true;}
      if(m){r += int2char(d);}
    }
  }
  return m?r:"0";
}

// (public) -this
function bnNegate() {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnNegate");
	var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; 
}

// (public) |this|
function bnAbs() { 
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnAbs");
	return (this.s<0)?this.negate():this; 
}

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnCompareTo");
  var r = this.s-a.s;
  if(r != 0) {
	return r;
}
  var i = this.t;
  r = i-a.t;
  if(r != 0) {
	return r;
}
  while(--i >= 0) {
	if((r=this[i]-a[i]) != 0) {
		return r;
	}
}
  return 0;
}

// returns bit length of the integer x
function nbits(x) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("nbits");
  var r = 1, t;
  if((t=x>>>16) != 0) { x = t; r += 16; }
  if((t=x>>8) != 0) { x = t; r += 8; }
  if((t=x>>4) != 0) { x = t; r += 4; }
  if((t=x>>2) != 0) { x = t; r += 2; }
  if((t=x>>1) != 0) { x = t; r += 1; }
  return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnBitLength");
  if(this.t <= 0) {
	return 0;
}
  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpDLShiftTo");
  var i;
  for(i = this.t-1; i >= 0; --i) {r[i+n] = this[i];}
  for(i = n-1; i >= 0; --i) {r[i] = 0;}
  r.t = this.t+n;
  r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpDRShiftTo");
  for(var i = n; i < this.t; ++i) {r[i-n] = this[i];}
  r.t = Math.max(this.t-n,0);
  r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpLShiftTo");
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<cbs)-1;
  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
  for(i = this.t-1; i >= 0; --i) {
    r[i+ds+1] = (this[i]>>cbs)|c;
    c = (this[i]&bm)<<bs;
  }
  for(i = ds-1; i >= 0; --i) {r[i] = 0;}
  r[ds] = c;
  r.t = this.t+ds+1;
  r.s = this.s;
  r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpRShiftTo");
  r.s = this.s;
  var ds = Math.floor(n/this.DB);
  if(ds >= this.t) { r.t = 0; return; }
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<bs)-1;
  r[0] = this[ds]>>bs;
  for(var i = ds+1; i < this.t; ++i) {
    r[i-ds-1] |= (this[i]&bm)<<cbs;
    r[i-ds] = this[i]>>bs;
  }
  if(bs > 0){r[this.t-ds-1] |= (this.s&bm)<<cbs;}
  r.t = this.t-ds;
  r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpSubTo");
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]-a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c -= a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c -= a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = (c<0)?-1:0;
  if(c < -1){r[i++] = this.DV+c;}else if(c > 0){r[i++] = c;}
  r.t = i;
  r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpMultiplyTo");
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i+y.t;
  while(--i >= 0){r[i] = 0;}
  for(i = 0; i < y.t; ++i) {r[i+x.t] = x.am(0,y[i],r,i,0,x.t);}
  r.s = 0;
  r.clamp();
  if(this.s != a.s){BigInteger.ZERO.subTo(r,r);}
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpSquareTo");
  var x = this.abs();
  var i = r.t = 2*x.t;
  while(--i >= 0){r[i] = 0;}
  for(i = 0; i < x.t-1; ++i) {
    var c = x.am(i,x[i],r,2*i,0,1);
    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
      r[i+x.t] -= x.DV;
      r[i+x.t+1] = 1;
    }
  }
  if(r.t > 0){r[r.t-1] += x.am(i,x[i],r,2*i,0,1);}
  r.s = 0;
  r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m,q,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpDivRemTo");
  var pm = m.abs();
  if(pm.t <= 0) {
	return;
}
  var pt = this.abs();
  if(pt.t < pm.t) {
    if(q != null){q.fromInt(0);}
    if(r != null){this.copyTo(r);}
    return;
  }
  if(r == null){r = nbi();}
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB-nbits(pm[pm.t-1]);  // normalize modulus
  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
  else { pm.copyTo(y); pt.copyTo(r); }
  var ys = y.t;
  var y0 = y[ys-1];
  if(y0 == 0) {
	return;
}
  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
  y.dlShiftTo(j,t);
  if(r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t,r);
  }
  BigInteger.ONE.dlShiftTo(ys,t);
  t.subTo(y,y); // "negative" y so we can replace sub with am later
  while(y.t < ys){y[y.t++] = 0;}
  while(--j >= 0) {
    // Estimate quotient digit
    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {  // Try it out
      y.dlShiftTo(j,t);
      r.subTo(t,r);
      while(r[i] < --qd){r.subTo(t,r);}
    }
  }
  if(q != null) {
    r.drShiftTo(ys,q);
    if(ts != ms){BigInteger.ZERO.subTo(q,q);}
  }
  r.t = ys;
  r.clamp();
  if(nsh > 0){r.rShiftTo(nsh,r);    // Denormalize remainder
}
  if(ts < 0){BigInteger.ZERO.subTo(r,r);}
}

// (public) this mod a
function bnMod(a) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnMod");
  var r = nbi();
  this.abs().divRemTo(a,null,r);
  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0){a.subTo(r,r);}
  return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("Classic");
	this.m = m; 
}
function cConvert(x) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("cConvert");
  if(x.s < 0 || x.compareTo(this.m) >= 0) {
	return x.mod(this.m);
} else {
	return x;
}
}
function cRevert(x) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("cRevert");
	return x; 
}
function cReduce(x) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("cReduce");
	x.divRemTo(this.m,null,x); 
}
function cMulTo(x,y,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("cMulTo");
	x.multiplyTo(y,r); this.reduce(r); 
}
function cSqrTo(x,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("cSqrTo");
	x.squareTo(r); this.reduce(r); 
}

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpInvDigit");
  if(this.t < 1) {
	return 0;
}
  var x = this[0];
  if((x&1) == 0) {
	return 0;
}
  var y = x&3;      // y == 1/x mod 2^2
  y = (y*(2-(x&0xf)*y))&0xf;    // y == 1/x mod 2^4
  y = (y*(2-(x&0xff)*y))&0xff;  // y == 1/x mod 2^8
  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;   // y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y*(2-x*y%this.DV))%this.DV;      // y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y>0)?this.DV-y:-y;
}

// Montgomery reduction
function Montgomery(m) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("Montgomery");
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp&0x7fff;
  this.mph = this.mp>>15;
  this.um = (1<<(m.DB-15))-1;
  this.mt2 = 2*m.t;
}

// xR mod m
function montConvert(x) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("montConvert");
  var r = nbi();
  x.abs().dlShiftTo(this.m.t,r);
  r.divRemTo(this.m,null,r);
  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0){this.m.subTo(r,r);}
  return r;
}

// x/R mod m
function montRevert(x) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("montRevert");
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("montReduce");
  while(x.t <= this.mt2){x[x.t++] = 0;}
  for(var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i]&0x7fff;
    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i+this.m.t;
    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
    // propagate carry
    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
  }
  x.clamp();
  x.drShiftTo(this.m.t,x);
  if(x.compareTo(this.m) >= 0){x.subTo(this.m,x);}
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("montSqrTo");
	x.squareTo(r); this.reduce(r); 
}

// r = "xy/R mod m"; x,y != r
function montMulTo(x,y,r) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("montMulTo");
	x.multiplyTo(y,r); this.reduce(r); 
}

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpIsEven");
	return ((this.t>0)?(this[0]&1):this.s) == 0; 
}

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e,z) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnpExp");
  if(e > 0xffffffff || e < 1) {
	return BigInteger.ONE;
}
  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
  g.copyTo(r);
  while(--i >= 0) {
    z.sqrTo(r,r2);
    if((e&(1<<i)) > 0){z.mulTo(r2,g,r);}else { var t = r; r = r2; r2 = t; }
  }
  return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e,m) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("bnModPowInt");
  var z;
  if(e < 256 || m.isEven()){z = new Classic(m);} else {z = new Montgomery(m);}
  return this.exp(e,z);
}

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;

// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;

// "constants"
//BigInteger.ZERO = nbv(0);
//BigInteger.ONE = nbv(1);
BigInteger.ZERO = new BigInteger("ZERO");
BigInteger.ONE = new BigInteger("ONE");

function SecureRandom() {}

SecureRandom.prototype.nextBytes = rng_get_bytes;

// base64.js
var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad="=";

function hex2b64(h) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("hex2b64");
  var i;
  var c;
  var ret = "";
  for(i = 0; i+3 <= h.length; i+=3) {
    c = parseInt(h.substring(i,i+3),16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if(i+1 == h.length) {
    c = parseInt(h.substring(i,i+1),16);
    ret += b64map.charAt(c << 2);
  }
  else if(i+2 == h.length) {
    c = parseInt(h.substring(i,i+2),16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while((ret.length & 3) > 0){ret += b64pad;}
  return ret;
}

// convert a base64 string to hex
function b64tohex(s) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("b64tohex");
  var ret = ""
  var i;
  var k = 0; // b64 state, 0-3
  var slop;
  for(i = 0; i < s.length; ++i) {
    if(s.charAt(i) == b64pad) {
		break;
	}
    v = b64map.indexOf(s.charAt(i));
    if(v < 0) {
		continue;
	}
    if(k == 0) {
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 1;
    }
    else if(k == 1) {
      ret += int2char((slop << 2) | (v >> 4));
      slop = v & 0xf;
      k = 2;
    }
    else if(k == 2) {
      ret += int2char(slop);
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 3;
    }
    else {
      ret += int2char((slop << 2) | (v >> 4));
      ret += int2char(v & 0xf);
      k = 0;
    }
  }
  if(k == 1){ret += int2char(slop << 2);}
  return ret;
}

// convert a base64 string to a byte/number array
function b64toBA(s) {
	myVantivEProtectReporterForPpStats.reportMethodInvocation("b64toBA");
  //piggyback on b64tohex for now, optimize later
  var h = b64tohex(s);
  var i;
  var a = new Array();
  for(i = 0; 2*i < h.length; ++i) {
    a[i] = parseInt(h.substring(2*i,2*i+2),16);
  }
  return a;
}
xxxEOFxxx