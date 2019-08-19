(function(){var charSize=8,b64pad="",hexCase=0,Int_64=function(a,b){this.highOrder=a;this.lowOrder=b},str2binb=function(a){var b=[],mask=(1<<charSize)-1,length=a.length*charSize,i;for(i=0;i<length;i+=charSize){b[i>>5]|=(a.charCodeAt(i/charSize)&mask)<<(32-charSize-(i%32))}return b},hex2binb=function(a){var b=[],length=a.length,i,num;for(i=0;i<length;i+=2){num=parseInt(a.substr(i,2),16);if(!isNaN(num)){b[i>>3]|=num<<(24-(4*(i%8)))}else{return"INVALID HEX STRING"}}return b},binb2hex=function(a){var b=(hexCase)?"0123456789ABCDEF":"0123456789abcdef",str="",length=a.length*4,i,srcByte;for(i=0;i<length;i+=1){srcByte=a[i>>2]>>((3-(i%4))*8);str+=b.charAt((srcByte>>4)&0xF)+b.charAt(srcByte&0xF)}return str},binb2b64=function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"+"0123456789+/",str="",length=a.length*4,i,j,triplet;for(i=0;i<length;i+=3){triplet=(((a[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((a[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((a[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(j=0;j<4;j+=1){if(i*8+j*6<=a.length*32){str+=b.charAt((triplet>>6*(3-j))&0x3F)}else{str+=b64pad}}}return str},rotl_32=function(x,n){return(x<<n)|(x>>>(32-n))},rotr_32=function(x,n){return(x>>>n)|(x<<(32-n))},rotr_64=function(x,n){if(n<=32){return new Int_64((x.highOrder>>>n)|(x.lowOrder<<(32-n)),(x.lowOrder>>>n)|(x.highOrder<<(32-n)))}else{return new Int_64((x.lowOrder>>>n)|(x.highOrder<<(32-n)),(x.highOrder>>>n)|(x.lowOrder<<(32-n)))}},shr_32=function(x,n){return x>>>n},shr_64=function(x,n){if(n<=32){return new Int_64(x.highOrder>>>n,x.lowOrder>>>n|(x.highOrder<<(32-n)))}else{return new Int_64(0,x.highOrder<<(32-n))}},parity_32=function(x,y,z){return x^y^z},ch_32=function(x,y,z){return(x&y)^(~x&z)},ch_64=function(x,y,z){return new Int_64((x.highOrder&y.highOrder)^(~x.highOrder&z.highOrder),(x.lowOrder&y.lowOrder)^(~x.lowOrder&z.lowOrder))},maj_32=function(x,y,z){return(x&y)^(x&z)^(y&z)},maj_64=function(x,y,z){return new Int_64((x.highOrder&y.highOrder)^(x.highOrder&z.highOrder)^(y.highOrder&z.highOrder),(x.lowOrder&y.lowOrder)^(x.lowOrder&z.lowOrder)^(y.lowOrder&z.lowOrder))},sigma0_32=function(x){return rotr_32(x,2)^rotr_32(x,13)^rotr_32(x,22)},sigma0_64=function(x){var a=rotr_64(x,28),rotr34=rotr_64(x,34),rotr39=rotr_64(x,39);return new Int_64(a.highOrder^rotr34.highOrder^rotr39.highOrder,a.lowOrder^rotr34.lowOrder^rotr39.lowOrder)},sigma1_32=function(x){return rotr_32(x,6)^rotr_32(x,11)^rotr_32(x,25)},sigma1_64=function(x){var a=rotr_64(x,14),rotr18=rotr_64(x,18),rotr41=rotr_64(x,41);return new Int_64(a.highOrder^rotr18.highOrder^rotr41.highOrder,a.lowOrder^rotr18.lowOrder^rotr41.lowOrder)},gamma0_32=function(x){return rotr_32(x,7)^rotr_32(x,18)^shr_32(x,3)},gamma0_64=function(x){var a=rotr_64(x,1),rotr8=rotr_64(x,8),shr7=shr_64(x,7);return new Int_64(a.highOrder^rotr8.highOrder^shr7.highOrder,a.lowOrder^rotr8.lowOrder^shr7.lowOrder)},gamma1_32=function(x){return rotr_32(x,17)^rotr_32(x,19)^shr_32(x,10)},gamma1_64=function(x){var a=rotr_64(x,19),rotr61=rotr_64(x,61),shr6=shr_64(x,6);return new Int_64(a.highOrder^rotr61.highOrder^shr6.highOrder,a.lowOrder^rotr61.lowOrder^shr6.lowOrder)},safeAdd_32_2=function(x,y){var a=(x&0xFFFF)+(y&0xFFFF),msw=(x>>>16)+(y>>>16)+(a>>>16);return((msw&0xFFFF)<<16)|(a&0xFFFF)},safeAdd_32_4=function(a,b,c,d){var e=(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(e>>>16);return((msw&0xFFFF)<<16)|(e&0xFFFF)},safeAdd_32_5=function(a,b,c,d,e){var f=(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF)+(e&0xFFFF),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(e>>>16)+(f>>>16);return((msw&0xFFFF)<<16)|(f&0xFFFF)},safeAdd_64_2=function(x,y){var a,msw,lowOrder,highOrder;a=(x.lowOrder&0xFFFF)+(y.lowOrder&0xFFFF);msw=(x.lowOrder>>>16)+(y.lowOrder>>>16)+(a>>>16);lowOrder=((msw&0xFFFF)<<16)|(a&0xFFFF);a=(x.highOrder&0xFFFF)+(y.highOrder&0xFFFF)+(msw>>>16);msw=(x.highOrder>>>16)+(y.highOrder>>>16)+(a>>>16);highOrder=((msw&0xFFFF)<<16)|(a&0xFFFF);return new Int_64(highOrder,lowOrder)},safeAdd_64_4=function(a,b,c,d){var e,msw,lowOrder,highOrder;e=(a.lowOrder&0xFFFF)+(b.lowOrder&0xFFFF)+(c.lowOrder&0xFFFF)+(d.lowOrder&0xFFFF);msw=(a.lowOrder>>>16)+(b.lowOrder>>>16)+(c.lowOrder>>>16)+(d.lowOrder>>>16)+(e>>>16);lowOrder=((msw&0xFFFF)<<16)|(e&0xFFFF);e=(a.highOrder&0xFFFF)+(b.highOrder&0xFFFF)+(c.highOrder&0xFFFF)+(d.highOrder&0xFFFF)+(msw>>>16);msw=(a.highOrder>>>16)+(b.highOrder>>>16)+(c.highOrder>>>16)+(d.highOrder>>>16)+(e>>>16);highOrder=((msw&0xFFFF)<<16)|(e&0xFFFF);return new Int_64(highOrder,lowOrder)},safeAdd_64_5=function(a,b,c,d,e){var f,msw,lowOrder,highOrder;f=(a.lowOrder&0xFFFF)+(b.lowOrder&0xFFFF)+(c.lowOrder&0xFFFF)+(d.lowOrder&0xFFFF)+(e.lowOrder&0xFFFF);msw=(a.lowOrder>>>16)+(b.lowOrder>>>16)+(c.lowOrder>>>16)+(d.lowOrder>>>16)+(e.lowOrder>>>16)+(f>>>16);lowOrder=((msw&0xFFFF)<<16)|(f&0xFFFF);f=(a.highOrder&0xFFFF)+(b.highOrder&0xFFFF)+(c.highOrder&0xFFFF)+(d.highOrder&0xFFFF)+(e.highOrder&0xFFFF)+(msw>>>16);msw=(a.highOrder>>>16)+(b.highOrder>>>16)+(c.highOrder>>>16)+(d.highOrder>>>16)+(e.highOrder>>>16)+(f>>>16);highOrder=((msw&0xFFFF)<<16)|(f&0xFFFF);return new Int_64(highOrder,lowOrder)},coreSHA1=function(f,g){var W=[],a,b,c,d,e,T,ch=ch_32,parity=parity_32,maj=maj_32,rotl=rotl_32,safeAdd_2=safeAdd_32_2,i,t,safeAdd_5=safeAdd_32_5,appendedMessageLength,H=[0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0],K=[0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6];f[g>>5]|=0x80<<(24-(g%32));f[(((g+65)>>9)<<4)+15]=g;appendedMessageLength=f.length;for(i=0;i<appendedMessageLength;i+=16){a=H[0];b=H[1];c=H[2];d=H[3];e=H[4];for(t=0;t<80;t+=1){if(t<16){W[t]=f[t+i]}else{W[t]=rotl(W[t-3]^W[t-8]^W[t-14]^W[t-16],1)}if(t<20){T=safeAdd_5(rotl(a,5),ch(b,c,d),e,K[t],W[t])}else if(t<40){T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}else if(t<60){T=safeAdd_5(rotl(a,5),maj(b,c,d),e,K[t],W[t])}else{T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}e=d;d=c;c=rotl(b,30);b=a;a=T}H[0]=safeAdd_2(a,H[0]);H[1]=safeAdd_2(b,H[1]);H[2]=safeAdd_2(c,H[2]);H[3]=safeAdd_2(d,H[3]);H[4]=safeAdd_2(e,H[4])}return H},coreSHA2=function(j,k,l){var a,b,c,d,e,f,g,h,T1,T2,H,numRounds,lengthPosition,i,t,binaryStringInc,binaryStringMult,safeAdd_2,safeAdd_4,safeAdd_5,gamma0,gamma1,sigma0,sigma1,ch,maj,Int,K,W=[],appendedMessageLength;if(l==="SHA-224"||l==="SHA-256"){numRounds=64;lengthPosition=(((k+65)>>9)<<4)+15;binaryStringInc=16;binaryStringMult=1;Int=Number;safeAdd_2=safeAdd_32_2;safeAdd_4=safeAdd_32_4;safeAdd_5=safeAdd_32_5;gamma0=gamma0_32;gamma1=gamma1_32;sigma0=sigma0_32;sigma1=sigma1_32;maj=maj_32;ch=ch_32;K=[0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0x0FC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x06CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2];if(l==="SHA-224"){H=[0xc1059ed8,0x367cd507,0x3070dd17,0xf70e5939,0xffc00b31,0x68581511,0x64f98fa7,0xbefa4fa4]}else{H=[0x6A09E667,0xBB67AE85,0x3C6EF372,0xA54FF53A,0x510E527F,0x9B05688C,0x1F83D9AB,0x5BE0CD19]}}else if(l==="SHA-384"||l==="SHA-512"){numRounds=80;lengthPosition=(((k+128)>>10)<<5)+31;binaryStringInc=32;binaryStringMult=2;Int=Int_64;safeAdd_2=safeAdd_64_2;safeAdd_4=safeAdd_64_4;safeAdd_5=safeAdd_64_5;gamma0=gamma0_64;gamma1=gamma1_64;sigma0=sigma0_64;sigma1=sigma1_64;maj=maj_64;ch=ch_64;K=[new Int(0x428a2f98,0xd728ae22),new Int(0x71374491,0x23ef65cd),new Int(0xb5c0fbcf,0xec4d3b2f),new Int(0xe9b5dba5,0x8189dbbc),new Int(0x3956c25b,0xf348b538),new Int(0x59f111f1,0xb605d019),new Int(0x923f82a4,0xaf194f9b),new Int(0xab1c5ed5,0xda6d8118),new Int(0xd807aa98,0xa3030242),new Int(0x12835b01,0x45706fbe),new Int(0x243185be,0x4ee4b28c),new Int(0x550c7dc3,0xd5ffb4e2),new Int(0x72be5d74,0xf27b896f),new Int(0x80deb1fe,0x3b1696b1),new Int(0x9bdc06a7,0x25c71235),new Int(0xc19bf174,0xcf692694),new Int(0xe49b69c1,0x9ef14ad2),new Int(0xefbe4786,0x384f25e3),new Int(0x0fc19dc6,0x8b8cd5b5),new Int(0x240ca1cc,0x77ac9c65),new Int(0x2de92c6f,0x592b0275),new Int(0x4a7484aa,0x6ea6e483),new Int(0x5cb0a9dc,0xbd41fbd4),new Int(0x76f988da,0x831153b5),new Int(0x983e5152,0xee66dfab),new Int(0xa831c66d,0x2db43210),new Int(0xb00327c8,0x98fb213f),new Int(0xbf597fc7,0xbeef0ee4),new Int(0xc6e00bf3,0x3da88fc2),new Int(0xd5a79147,0x930aa725),new Int(0x06ca6351,0xe003826f),new Int(0x14292967,0x0a0e6e70),new Int(0x27b70a85,0x46d22ffc),new Int(0x2e1b2138,0x5c26c926),new Int(0x4d2c6dfc,0x5ac42aed),new Int(0x53380d13,0x9d95b3df),new Int(0x650a7354,0x8baf63de),new Int(0x766a0abb,0x3c77b2a8),new Int(0x81c2c92e,0x47edaee6),new Int(0x92722c85,0x1482353b),new Int(0xa2bfe8a1,0x4cf10364),new Int(0xa81a664b,0xbc423001),new Int(0xc24b8b70,0xd0f89791),new Int(0xc76c51a3,0x0654be30),new Int(0xd192e819,0xd6ef5218),new Int(0xd6990624,0x5565a910),new Int(0xf40e3585,0x5771202a),new Int(0x106aa070,0x32bbd1b8),new Int(0x19a4c116,0xb8d2d0c8),new Int(0x1e376c08,0x5141ab53),new Int(0x2748774c,0xdf8eeb99),new Int(0x34b0bcb5,0xe19b48a8),new Int(0x391c0cb3,0xc5c95a63),new Int(0x4ed8aa4a,0xe3418acb),new Int(0x5b9cca4f,0x7763e373),new Int(0x682e6ff3,0xd6b2b8a3),new Int(0x748f82ee,0x5defb2fc),new Int(0x78a5636f,0x43172f60),new Int(0x84c87814,0xa1f0ab72),new Int(0x8cc70208,0x1a6439ec),new Int(0x90befffa,0x23631e28),new Int(0xa4506ceb,0xde82bde9),new Int(0xbef9a3f7,0xb2c67915),new Int(0xc67178f2,0xe372532b),new Int(0xca273ece,0xea26619c),new Int(0xd186b8c7,0x21c0c207),new Int(0xeada7dd6,0xcde0eb1e),new Int(0xf57d4f7f,0xee6ed178),new Int(0x06f067aa,0x72176fba),new Int(0x0a637dc5,0xa2c898a6),new Int(0x113f9804,0xbef90dae),new Int(0x1b710b35,0x131c471b),new Int(0x28db77f5,0x23047d84),new Int(0x32caab7b,0x40c72493),new Int(0x3c9ebe0a,0x15c9bebc),new Int(0x431d67c4,0x9c100d4c),new Int(0x4cc5d4be,0xcb3e42b6),new Int(0x597f299c,0xfc657e2a),new Int(0x5fcb6fab,0x3ad6faec),new Int(0x6c44198c,0x4a475817)];if(l==="SHA-384"){H=[new Int(0xcbbb9d5d,0xc1059ed8),new Int(0x0629a292a,0x367cd507),new Int(0x9159015a,0x3070dd17),new Int(0x0152fecd8,0xf70e5939),new Int(0x67332667,0xffc00b31),new Int(0x98eb44a87,0x68581511),new Int(0xdb0c2e0d,0x64f98fa7),new Int(0x047b5481d,0xbefa4fa4)]}else{H=[new Int(0x6a09e667,0xf3bcc908),new Int(0xbb67ae85,0x84caa73b),new Int(0x3c6ef372,0xfe94f82b),new Int(0xa54ff53a,0x5f1d36f1),new Int(0x510e527f,0xade682d1),new Int(0x9b05688c,0x2b3e6c1f),new Int(0x1f83d9ab,0xfb41bd6b),new Int(0x5be0cd19,0x137e2179)]}}j[k>>5]|=0x80<<(24-k%32);j[lengthPosition]=k;appendedMessageLength=j.length;for(i=0;i<appendedMessageLength;i+=binaryStringInc){a=H[0];b=H[1];c=H[2];d=H[3];e=H[4];f=H[5];g=H[6];h=H[7];for(t=0;t<numRounds;t+=1){if(t<16){W[t]=new Int(j[t*binaryStringMult+i],j[t*binaryStringMult+i+1])}else{W[t]=safeAdd_4(gamma1(W[t-2]),W[t-7],gamma0(W[t-15]),W[t-16])}T1=safeAdd_5(h,sigma1(e),ch(e,f,g),K[t],W[t]);T2=safeAdd_2(sigma0(a),maj(a,b,c));h=g;g=f;f=e;e=safeAdd_2(d,T1);d=c;c=b;b=a;a=safeAdd_2(T1,T2)}H[0]=safeAdd_2(a,H[0]);H[1]=safeAdd_2(b,H[1]);H[2]=safeAdd_2(c,H[2]);H[3]=safeAdd_2(d,H[3]);H[4]=safeAdd_2(e,H[4]);H[5]=safeAdd_2(f,H[5]);H[6]=safeAdd_2(g,H[6]);H[7]=safeAdd_2(h,H[7])}switch(l){case"SHA-224":return[H[0],H[1],H[2],H[3],H[4],H[5],H[6]];case"SHA-256":return H;case"SHA-384":return[H[0].highOrder,H[0].lowOrder,H[1].highOrder,H[1].lowOrder,H[2].highOrder,H[2].lowOrder,H[3].highOrder,H[3].lowOrder,H[4].highOrder,H[4].lowOrder,H[5].highOrder,H[5].lowOrder];case"SHA-512":return[H[0].highOrder,H[0].lowOrder,H[1].highOrder,H[1].lowOrder,H[2].highOrder,H[2].lowOrder,H[3].highOrder,H[3].lowOrder,H[4].highOrder,H[4].lowOrder,H[5].highOrder,H[5].lowOrder,H[6].highOrder,H[6].lowOrder,H[7].highOrder,H[7].lowOrder];default:return[]}},jsSHA=function(a,b){this.sha1=null;this.sha224=null;this.sha256=null;this.sha384=null;this.sha512=null;this.strBinLen=null;this.strToHash=null;if("HEX"===b){if(0!==(a.length%2)){return"TEXT MUST BE IN BYTE INCREMENTS"}this.strBinLen=a.length*4;this.strToHash=hex2binb(a)}else if(("ASCII"===b)||('undefined'===typeof(b))){this.strBinLen=a.length*charSize;this.strToHash=str2binb(a)}else{return"UNKNOWN TEXT INPUT TYPE"}};jsSHA.prototype={getHash:function(a,b){var c=null,message=this.strToHash.slice();switch(b){case"HEX":c=binb2hex;break;case"B64":c=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}switch(a){case"SHA-1":if(null===this.sha1){this.sha1=coreSHA1(message,this.strBinLen)}return c(this.sha1);case"SHA-224":if(null===this.sha224){this.sha224=coreSHA2(message,this.strBinLen,a)}return c(this.sha224);case"SHA-256":if(null===this.sha256){this.sha256=coreSHA2(message,this.strBinLen,a)}return c(this.sha256);case"SHA-384":if(null===this.sha384){this.sha384=coreSHA2(message,this.strBinLen,a)}return c(this.sha384);case"SHA-512":if(null===this.sha512){this.sha512=coreSHA2(message,this.strBinLen,a)}return c(this.sha512);default:return"HASH NOT RECOGNIZED"}},getHMAC:function(a,b,c,d){var e,keyToUse,blockByteSize,blockBitSize,i,retVal,lastArrayIndex,keyBinLen,hashBitSize,keyWithIPad=[],keyWithOPad=[];switch(d){case"HEX":e=binb2hex;break;case"B64":e=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}switch(c){case"SHA-1":blockByteSize=64;hashBitSize=160;break;case"SHA-224":blockByteSize=64;hashBitSize=224;break;case"SHA-256":blockByteSize=64;hashBitSize=256;break;case"SHA-384":blockByteSize=128;hashBitSize=384;break;case"SHA-512":blockByteSize=128;hashBitSize=512;break;default:return"HASH NOT RECOGNIZED"}if("HEX"===b){if(0!==(a.length%2)){return"KEY MUST BE IN BYTE INCREMENTS"}keyToUse=hex2binb(a);keyBinLen=a.length*4}else if("ASCII"===b){keyToUse=str2binb(a);keyBinLen=a.length*charSize}else{return"UNKNOWN KEY INPUT TYPE"}blockBitSize=blockByteSize*8;lastArrayIndex=(blockByteSize/4)-1;if(blockByteSize<(keyBinLen/8)){if("SHA-1"===c){keyToUse=coreSHA1(keyToUse,keyBinLen)}else{keyToUse=coreSHA2(keyToUse,keyBinLen,c)}keyToUse[lastArrayIndex]&=0xFFFFFF00}else if(blockByteSize>(keyBinLen/8)){keyToUse[lastArrayIndex]&=0xFFFFFF00}for(i=0;i<=lastArrayIndex;i+=1){keyWithIPad[i]=keyToUse[i]^0x36363636;keyWithOPad[i]=keyToUse[i]^0x5C5C5C5C}if("SHA-1"===c){retVal=coreSHA1(keyWithIPad.concat(this.strToHash),blockBitSize+this.strBinLen);retVal=coreSHA1(keyWithOPad.concat(retVal),blockBitSize+hashBitSize)}else{retVal=coreSHA2(keyWithIPad.concat(this.strToHash),blockBitSize+this.strBinLen,c);retVal=coreSHA2(keyWithOPad.concat(retVal),blockBitSize+hashBitSize,c)}return(e(retVal))}};window.jsSHA=jsSHA}());
var gaCampaign='';
var gaMedium='';

function timestampPdfs()
{
 	var ts=new Date().getTime();
	$('a[href$=".pdf"]').each(function(i) 
	{
		var link = $(this).attr('href');
		if (link.indexOf('/') > -1)
		{
			link = link.substr(link.lastIndexOf('/')+1);
		}
		
		$(this).attr('href',
		$(this).attr('href') + '?ts='+ts);
		$(this).removeAttr('onclick');
		$(this).attr('onclick'," ga('send','event', 'PDF download', '"+link + "');return true");	});
}
function getCookie(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start=c_start + c_name.length + 1;
			c_end=document.cookie.indexOf(";", c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}
var key = 'trial1rishLif3';

function getHash(inputStr) {
var hashObj = new jsSHA(inputStr, 'ASCII');
return hashObj.getHash('SHA-1', 'HEX');
}

function mkVisitWebPage(pagename)
{
 	if (isFunction()){
	mktoMunchkinFunction('visitWebPage', {url: pagename});
	updateFreeCover();
	}
}

/**
Record a callback
*/
function mkAssociateLead(firstName, lastName, emailAddress, phoneNumber, contacttime, areaofinterest)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,LeadSourceDetail:'Website Callback',
	FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true, 
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,
	PerferredTimeToContact:contacttime, CallbackAreaOfInterest: areaofinterest},hash);
}

function mkAssociateLeadNoCallback(emailAddress,source)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,LeadSourceDetail:source,
		LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
	Callbackrequested: false},hash);
}

function isFunction()
{
	return typeof(mktoMunchkinFunction) == "function";
}


/**
Callback requested with a quote.

*/
function mkAssociateLeadWithQuote(firstName, lastName, emailAddress, phoneNumber, type, term, prem,
sumAssured,sex1,sex2,age1,age2,smoker1,smoker2, contacttime)
{
	/*

	type=M/T/W
	term=number of years or zero
	sex1/sex2=M/F	
	parseFloat(Math.round(num3 * 100) / 100).toFixed(2);
	*/	
	var hash = getHash(key+emailAddress);
	
	if (type == 'M')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSourceDetail:'Website Quote and Callback',
			QuoteLifeMortAge1: age1,QuoteLifeMortAge2:age2,QuoteLifeMortPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeMortSmoker1:smoker1,QuoteLifeMortSmoker2: smoker2, 
			QuoteLifeMortSex1:sex1,QuoteLifeMortSex2:sex2,PerferredTimeToContact:contacttime,
			CallbackAreaOfInterest: 'New Plan',
				LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeMortSumAssured:sumAssured,QuoteLifeMortTerm:term,QuoteType:type},hash);
	}
	else if (type=='T')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSourceDetail:'Website Quote and Callback',
			QuoteLifeTermAge1: age1,QuoteLifeTermAge2:age2,QuoteLifeTermPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeTermSmoker1: smoker1, QuoteLifeTermSmoker2:smoker2,PerferredTimeToContact:contacttime,
			CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,			
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeTermSex1:sex1,QuoteLifeTermSex2:sex2,QuoteLifeTermSumAssured:sumAssured,QuoteLifeTermTerm:term,QuoteType:type},hash);	
	}
	else if (type == 'W')
	{
		if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSourceDetail:'Website Quote and Callback',
		QuoteLifeWholeAge1: age1,QuoteLifeWholeAge2:age2,QuoteLifeWholePremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		QuoteLifeWholeSmoker1:smoker1,QuoteLifeWholeSmoker2:smoker2,PerferredTimeToContact:contacttime,
		CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteLifeWholeSex1:sex1,QuoteLifeWholeSex2:sex2,QuoteLifeWholeSumAssured:sumAssured,QuoteLifeWholeTerm:term,QuoteType:type},hash);	
	}
}

function mkAssociateLeadPensionQuote(lastName, firstName, emailAddress, phoneNumber,
QuotePensionAge,QuotePensionCurrentSalary,QuotePensionEmployersContribution,
QuotePensionGapPerAnnum,QuotePensionRetirementAge,QuotePensionSPTransfer,
QuotePensionTargetPensionPerAnnum,QuotePensionYourMonthlyContribution,contacttime)
{

var hash = getHash(key+emailAddress);

	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,
		MobilePhone: phoneNumber,
		LastName: lastName, 
		Callbackrequested: true,
		LeadSourceDetail:'Website Quote and Callback',
		quotePensionAge:QuotePensionAge,
		quotePensionCurrentSalary:QuotePensionCurrentSalary,
		quotePensionEmployersContribution:QuotePensionEmployersContribution,
		quotePensionGapPerAnnum:QuotePensionGapPerAnnum,
		quotePensionRetirementAge:QuotePensionRetirementAge,
		quotePensionSPTransfer:QuotePensionSPTransfer,
		quotePensionTargetPensionPerAnnum:QuotePensionTargetPensionPerAnnum,
		quotePensionYourMonthlyContribution:QuotePensionYourMonthlyContribution,
		PerferredTimeToContact:contacttime,
		CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteType:'I'},hash);

}


function mkAssociateLeadIncomeProtection(lastName, firstName, emailAddress, phoneNumber, prem,
age,retAge,occupation,salary,coverAmt,deferredWeeks,inflation,smoker,selfEmployed,contacttime)
{

	var hash = getHash(key+emailAddress);

	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,
		MobilePhone: phoneNumber,
		LastName: lastName, 
		Callbackrequested: true,
		LeadSourceDetail:'Website Quote and Callback',
		quoteIncProtAge:age,
		quoteIncProtRetAge:retAge,
		quoteIncProtOcc:occupation,
		quoteIncProtSalary:salary,
		quoteIncProtCover:coverAmt,
		quoteIncProtSmoker:smoker,
		quoteIncProtDefPeriod:deferredWeeks,
		quoteIncProtInflation:inflation,
		quoteIncProtPrem:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		PerferredTimeToContact:contacttime,
		quoteIncProtSelfEmployed:selfEmployed,
		CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteType:'I'},hash);
	
}

/**
Record signup for help on financial products
* 'General Sign up'
* 'Make a will'
* 'Pension guide'
* 'Life insurance guide'
*/
function mkAssociateLeadEarlyStage(emailAddress, guide)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,'Permissions-Email':true,
		LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
	LeadSourceDetail: guide},hash);
	mkVisitWebPage('/download-a-guide-submitted');
	ga('send','pageview','/customer-service/download-a-guide-submitted');
}


/**
Record quote - send email to email address
*/
function mkAssociateLeadPerformQuote(firstName, lastName, emailAddress, phoneNumber, 
type, term, prem,sumAssured,sex1,sex2,age1,age2,smoker1,smoker2,emailPermission)
{	
	var hash = getHash(key+emailAddress);
	if (type == 'M')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'Quote',
			QuoteLifeMortAge1: age1,QuoteLifeMortAge2:age2,QuoteLifeMortPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeMortSmoker1:smoker1,QuoteLifeMortSmoker2: smoker2, 'Permissions-Email':emailPermission,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeMortSex1:sex1,QuoteLifeMortSex2:sex2,QuoteLifeMortSumAssured:sumAssured,QuoteLifeMortTerm:term,QuoteType:type},hash);
	}
	else if (type=='T')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'Quote',
			QuoteLifeTermAge1: age1,QuoteLifeTermAge2:age2,QuoteLifeTermPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeTermSmoker1:smoker1,QuoteLifeTermSmoker2: smoker2, 'Permissions-Email':emailPermission,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeTermSex1:sex1,QuoteLifeTermSex2:sex2,QuoteLifeTermSumAssured:sumAssured,QuoteLifeTermTerm:term,QuoteType:type},hash);	
	}
	else if (type == 'W')
	{
		if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'Quote',
		QuoteLifeWholeAge1: age1,QuoteLifeWholeAge2:age2,QuoteLifeWholePremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		QuoteLifeWholeSmoker1:smoker1,QuoteLifeWholeSmoker2: smoker2, 'Permissions-Email':emailPermission,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,		
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteLifeWholeSex1:sex1,QuoteLifeWholeSex2:sex2,QuoteLifeWholeSumAssured:sumAssured,QuoteLifeWholeTerm:term,QuoteType:type},hash);
	}
		mkVisitWebPage('/life-assurance-quote-email-to-self');

		ga('send','pageview','/life-assurance/quote-emailed');
		
	
	
}

/**Record a callback*/
function mkAssociateLeadFreeCover(firstName, lastName, emailAddress, channelId, sellerId)
{
	var hash = getHash(key+emailAddress);

if (sellerId=='4783'){

	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'FreeCoverTaken',
		LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,		
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		freeParentCoverPlanTaken:true,
		LastSalesReferrer: sellerId},hash);	
}
else {
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'FreeCoverTaken',
		'Permissions-Email':true,'Permissions-DirectMail':true,'Permissions-Landline':true,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,		
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		'Permissions-SMS_MMS':true,
	freeParentCoverPlanTaken:true,
		LastSalesReferrer: sellerId},hash);	
}
}

/**
Associate a broker lead
*/
function mkAssociateBroker(emailAddress, source)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,LeadSourceDetail:source,
	Callbackrequested: false,IsBroker:true  },hash);
}

function mkAssociateLeadKBC(emailAddress,firstName,lastName,phoneNumber,permissionEmail,areaOfInterest,followUpRating,timeToContact,kbcLeadSource,kbcExistingCustomer,kbcStaffId,kbcStaffName)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,LastName: lastName, Callbackrequested: true,LeadSource:'KBCReferral',
		'permissionsFollowupEmailKBC':permissionEmail,MobilePhone: phoneNumber,KBCAreaOfInterest: areaOfInterest,PerferredTimeToContact:timeToContact,
		KBCLeadSource: kbcLeadSource,
		LastDirectSalesAgentRating: followUpRating,
		KBCExistingCustomer:kbcExistingCustomer, KBCStaffID: kbcStaffId, KBCStaffName: kbcStaffName},hash);	
}

function mkAssociateLeadAIB(emailAddress,firstName,lastName,phoneNumber,permissionEmail,areaOfInterest,followUpRating,timeToContact,leadSource,existingCustomer,staffId,staffName)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,LastName: lastName, Callbackrequested: true,
		LeadSource:'Employee Referral',
		PermissionsFollowupEmail:permissionEmail,
		MobilePhone: phoneNumber,
		CallbackAreaOfInterest: areaOfInterest,
		PerferredTimeToContact:timeToContact,
		LeadSourceDetail:'AIB Internal Referral',
		LastDirectSalesAgentRating: followUpRating
		//KBCExistingCustomer:kbcExistingCustomer, KBCStaffID: kbcStaffId, KBCStaffName: kbcStaffName
		},hash);	
}
//##################################
// 123.ie marketo calls

function mkAssociateLead123(firstName, lastName, emailAddress, phoneNumber, contacttime, areaofinterest)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{
	Email: emailAddress,
	LeadSource:'123',
	FirstName: firstName,
	MobilePhone: phoneNumber,
	LastName: lastName,
	Callbackrequested: true, 
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,	
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
	PerferredTimeToContact:contacttime,
	CallbackAreaOfInterest: areaofinterest},hash);
}

// with quote
function mkAssociateLeadPerformQuote123(firstName, lastName, emailAddress, phoneNumber, type, term, prem,
sumAssured,age1,age2,smoker1,smoker2, contacttime,areaofinterest)
{

	var hash = getHash(key+emailAddress);
	
	if (type == 'M')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSource:'123',
			QuoteLifeMortAge1: age1,QuoteLifeMortAge2:age2,QuoteLifeMortPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeMortSmoker1:smoker1,QuoteLifeMortSmoker2: smoker2,PerferredTimeToContact:contacttime,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			CallbackAreaOfInterest: areaofinterest,
			QuoteLifeMortSumAssured:sumAssured,QuoteLifeMortTerm:term,QuoteType:type},hash);
	}
	else if (type=='T')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSource:'123',
			QuoteLifeTermAge1: age1,QuoteLifeTermAge2:age2,QuoteLifeTermPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeTermSmoker1: smoker1, QuoteLifeTermSmoker2:smoker2,PerferredTimeToContact:contacttime,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			CallbackAreaOfInterest: areaofinterest,
			QuoteLifeTermSumAssured:sumAssured,QuoteLifeTermTerm:term,QuoteType:type},hash);	
	}
	else if (type == 'W')
	{
		if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSource:'123',
		QuoteLifeWholeAge1: age1,QuoteLifeWholeAge2:age2,QuoteLifeWholePremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		QuoteLifeWholeSmoker1:smoker1,QuoteLifeWholeSmoker2:smoker2,PerferredTimeToContact:contacttime,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		CallbackAreaOfInterest: areaofinterest,
		QuoteLifeWholeSumAssured:sumAssured,QuoteLifeWholeTerm:term,QuoteType:type},hash);	
	}

}


function getCampaign()
{
	var retValue = '';
	var cookieValue = String(getCookie('__utmz'));
    var n = cookieValue.indexOf('utmccn=');
	var m = cookieValue.indexOf('utmcmd=');

    if (n > -1)
    {
        val2=cookieValue.substr(n);
        val3=val2.split('|');
        for (var i=0; i < val3.length;i++)
        {
            val4=val3[i].split('=');
            if (val4[0] == 'utmccn')
            {
                retValue=val4[1];
				if (retValue != null && retValue.length >1)
				{
					retValue=retValue.replace('(','');
					retValue=retValue.replace(')','');
				}
            }
        }   
	}
	gaCampaign=retValue;
	
	if (m > -1)
    {
        val2=cookieValue.substr(m);
        val3=val2.split('|');
        for (var i=0; i < val3.length;i++)
        {
            val4=val3[i].split('=');
            if (val4[0] == 'utmcmd')
            {
                retValue=val4[1];
				if (retValue != null && retValue.length >1)
				{
					retValue=retValue.replace('(','');
					retValue=retValue.replace(')','');
				}
            }
        }
   
	}
	gaMedium=retValue;
}
function log(message){ 
	try {
		console.log(consoleCounter++ + "\t" + message);
		return this;
	} catch(e) {
		try {
		if(document.getElementById("consoleDiv") != null)
			document.getElementById("consoleDiv").innerHTML += (consoleCounter++ + "      " + message + "<br />");
		} catch(e){}
	}
}

/** Some updates to text on free cover application for,
    This is a hack
*/

$(document).ready(function () {
		Munchkin.init('450-GHO-121');	
		getCampaign();	
		timestampPdfs();
});

function getStoredPlans()
{

}

function updateFreeCover()
{	
	if (window.location.href.indexOf('eBusinessApps') > -1)
	{	
		$(document).ready(function () {
		var mobPref = document.getElementById("life1MobilePhoneNo_Prefix");
		var mobPrefOption = document.createElement("option");
		mobPrefOption.text = "089";
		mobPrefOption.value="089";
		if (mobPref){mobPref.add(mobPrefOption);}

		
		Munchkin.init('450-GHO-121');	
		getCampaign();	
		timestampPdfs();
		$('.fieldColumnInnerText').each(function(i) 
		{
			if ($(this).html().indexOf('You agree that we may use your ') == 0)
			{
				$(this).html('You agree that we may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about our products and services within the Irish Life Group of companies. If you no longer wish to avail of this service you can opt out by writing to Irish Life at Lower Abbey St, Dublin 1, by clicking the unsubscribe link in any email or by following the unsubscribe instructions that will be in any texts that are sent to you.');
			}
		});
		
		$('.buttonToolTip').each(function(i) 
		{
		if (typeof $(this).attr('content') === "undefined")
		{
		 // do nothing
		}
		else
		{ 
			if ($(this).attr('content').indexOf('You will receive the welcome pack') == 0)
			{
				$(this).attr('content','You will receive the welcome pack and letters by email.');
			}
		}
		});

		$('.subLabel').each(function(i) 
		{
		if ($(this).html().indexOf('For information on how to withdraw') == 0)
		{
			$(this).html('');
		}
		});

		$('a[href$="ILFS.pdf"]').each(function(i) 
		{
			$(this).attr('href','/eBusinessApps/PDF/Terms-of-business-IL.pdf');
			$(this).html('Irish Life Terms of business (209KB)');
		});
		
		$('a[href$="/eBusinessApps/PDF/Plan-booklet.pdf"]').each(function(i) 
		{
			$(this).attr('href','http://www.irishlife.ie/uploadedFiles/free-cover.pdf ');
			$(this).html('Plan booklet, Terms &amp; Conditions)');
		});

		var refer = getCookie('FreeCover');
		
		if (refer == 'VG93')
		{
			$('.topLeftLogo').css('background','transparent url(https://www.irishlife.ie/eBusinessApps/Zip/Default/ChannelImage/logo/mainIrishLifeLogo.gif) no-repeat scroll 0');
			$('.topLeftLogo').css('width','150px');
			
			$('.labelTop').each(function(i) 
			{
				if ($(this).html().indexOf('1st Parent') == 0)
				{
					$(this).html('1st Person');
				}
			});
			$('.ui-button-text2').each(function(i) 
			{			
				if ($(this).html().indexOf('2nd Parent') == 0)
				{
					$(this).html('2nd Person');
				}
				
			});
			$('.text').each(function(i) 
			{			
				if ($(this).html().indexOf('Free Parent') == 0)
				{
					$(this).html('Free Life Insurance Application');
				}
				if ($(this).html().indexOf('Please complete this') == 0)
				{
					$(this).html('Please complete this short application form to get your free life insurance');
				}
			});
		
			$('#life1RelationshipWithChild').val('LEG');
			$('#life2RelationshipWithChild').val('LEG');		
			$('#life2RelationshipWithOtherParent').val('MAR');		
			$('#dependentChildrenNo').val(1);
		
			$('.formThreeColumnFullWidth').each(function(i) 
			{
				if ($(this).html().indexOf('Relationship') > -1)
				{
						$(this).addClass('hidden');
				}
				if ($(this).html().indexOf('Children') > -1)
				{
						$(this).addClass('hidden');
				}
			});
		
			$('.fieldColumnInnerText').each(function(i) 
				{
					if ($(this).html().indexOf('In order to provide you with your Free ') == 0)
					{
						$(this).html('In order to provide you with your Free Life Insurance plan, we need to gather some information about you to generate your free plan. The information will be held for that purpose by Irish Life and permanent tsb.');
					}
			});
		
			$('.fieldColumnInnerText').each(function(i) 
				{
					if ($(this).html().indexOf('You agree that ') == 0)
					{
						$(this).html('You agree that we may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about our products and services within the Irish Life Group of companies and permanent tsb plc. To opt out at any time please write to both Irish Life and permanent tsb or click on the unsubscribe link in any emails sent by Irish Life and permanent tsb or by following the unsubscribe instructions in any texts sent by Irish Life and permanent tsb.');
					}
			});
				
				
		
		}
		
		if (refer == 'Z402')
		{
			$('.fieldColumnInnerText').each(function(i) 
			{
				if ($(this).html().indexOf('You agree that we may use your ') == 0)
				{
					$(this).html('You agree that we may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about our products and services within the Irish Life Group of companies and GloHealth Financial Services ltd. To opt out at any time please write to both Irish Life and GloHealth or click on the unsubscribe link in any emails sent by Irish Life and GloHealth or by following the unsubscribe instructions in any texts sent by Irish Life and GloHealth.');
				}
			});		
		}
		else if (refer == '4785')
		{		
			if ($(".direct .topLeftLogo").length == 1)
			{	
				$(".direct .topLeftLogo").css("background","url(https://www.irishlife.ie/eBusinessApps/Zip/Default/ChannelImage/logo/mainIrishLifeLogo.gif) no-repeat scroll 0 0 rgba(0, 0, 0, 0)");
				$(".direct .topLeftLogo").css("height","45px");
				$(".direct .topLeftLogo").css("left","30px");
				$(".direct .topLeftLogo").css("top","65px");
				$(".direct .topLeftLogo").css("width","158px");
			}
			$('.fieldColumnInnerText').each(function(i) 
			{
			if ($(this).html().indexOf('You agree that we may use your ') == 0)
			{
				$(this).html('You agree that KBC Bank Ireland Plc may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about their products and services. If you no longer wish to avail of this service you can opt out by writing to KBC Bank Ireland at Sandwith St., Dublin 2, by clicking the unsubscribe link in any email or by following the unsubscribe instructions that will be in any texts that are sent to you.');
			}
			if ($(this).html().indexOf('In order to provide you with your Free Parent Life cover') == 0)
			{
				$(this).html('In order to provide you with your Free Parent Life cover plan, we need to gather some information about you to generate your free plan. The information will be held for that purpose by Irish Life and KBC Bank Ireland Plc.');
			}
			
			});		
			
			$('.bottomBoxItems').each(function(i)
			{
				$(this).html('<li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/terms-of-business-IL.pdf">Irish Life Terms of business (209KB)</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/KBC-Terms-of-Business.pdf">KBC Bank Ireland Plc Terms of business (209KB)</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/free-parent-cover-IL.pdf">Plan booklet, Terms &amp; Conditions</a></li>');
			});

		}
		else if (refer == '4783')
		{
			if (window.location.href.indexOf("eBusinessApps") > -1)
			{
			$(".direct .topLeftLogo").css("background","url(https://www.irishlife.ie/eBusinessApps/Zip/Default/ChannelImage/logo/mainIrishLifeLogo.gif) no-repeat scroll 0 0 rgba(0, 0, 0, 0)");
				$(".direct .topLeftLogo").css("height","45px");
				$(".direct .topLeftLogo").css("left","30px");
				$(".direct .topLeftLogo").css("top","65px");
				$(".direct .topLeftLogo").css("width","158px");
					
				$('.sectionHeading').each(function(i)
				{		
					if ($(this).html().indexOf('Free Parent Life Cover application') > 0)
					{
						$(this).html('<span class="text">Free Parent Life Insurance application</span><img src="https://www.irishlife.ie/secureWeb/uploadedImages/retail/123/img/free-life-heading.png" />');
					}
					if ($(this).html().indexOf('Please complete this short') > 0)
					{
						$(this).html('<div class="sectionHeading headingTextSmaller marginBottom0 row"><span class="text">Please complete this short application form to get your free parent life insurance</span></div>');
					}
				});
			
				$('.fieldColumnInnerText').each(function(i) 
				{
					if ($(this).html().indexOf('You agree that we may use your ') == 0)
					{
						$(this).html('You agree that 123.ie may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about their products and services. To opt out at any time please write to 123.ie at 123.ie, MountainView, Central Park, Leopardstown, Dublin 18, or click the unsubscribe link in any email sent by 123.ie, or follow the unsubscribe instructions in any texts sent by 123.ie.');
					}
					if ($(this).html().indexOf('In order to provide you with your Free Parent Life cover') == 0)
					{
						$(this).html('In order to provide you with your Free Parent Life Insurance plan, we need to gather some information about you to generate your free plan. The information will be held for that purpose by Irish Life and 123.ie.');
					}
				
				});		
				
				$('.bottomBoxItems').each(function(i)
				{
					$(this).html('<li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/terms-of-business-IL.pdf?121212">Irish Life Terms of business (209KB)</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/123.ie-terms-of-business.pdf?121212">123.ie Terms of business</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/free-parent-cover-IL.pdf?121212">Plan booklet, Terms &amp; Conditions</a></li>');
				});
			
				$( "#contactGrid_Div" ).html( '<div id="contactGrid_Div" class="grid"><table id="contactGrid" class="marginBottom30 tableOutput2 tableOutput tableBase"><tbody><tr><td width="100"><span class="textSize2">Name</span></td><td width="360"><span class="bold textSize3">123.ie</span></td></tr><tr><td width="130"><span class="textSize2">Email</span></td><td width="330"><a href="mailto:life@123.ie" class="anchor anchor anchor anchor anchor anchor anchor linkBig2">life@123.ie</a></td></tr></tbody></table><div class="sentence bold textSize4 row"><span class="text" style="text-decoration:underline">Return to <a href="http://www.123.ie">www.123.ie</a></span></div></div>' );
				
				
			}
			
					

			
		}else if (refer == '4786')
		{
			if (window.location.href.indexOf("123") > -1 || window.location.href.indexOf("eBusinessApps") > -1)
			{
				$('.containerBorders').css('background','none');
				$('.containerTop').css('display','none');
				$('.containerCenterer').css('width','auto');
				$('body').css('background-color','#fff');
				$('.contentRightFullWidth').css('padding','0px');
				$('.containerBorders').css('width','760px');
				$('.contentRightFullWidth .contentRightWidth').css('width','760px');
				$('.formThreeColumnFullWidth .fieldColumn').css('width','250px');
				$('.formThreeColumnFullWidth .labelColumn').css('width','200px');
				$('.formThreeColumnFullWidth').css('background','url("https://www.irishlife.ie/eBusinessApps/Zip/BaseImage/background/formThreeColumn.png") repeat-y scroll 0 0 rgba(0, 0, 0, 0)');
				$('.formThreeColumnFullWidth .label').css('width','175px');
				$('.formThreeColumnFullWidth .fieldColumnFirst').css('margin-right','20px');
				$('.footer').css('display','none');
				$('.inputDateDay').css('width','56px');
				$('.serverMessage').css('width','600px');
			
				$('.sectionHeading').each(function(i)
				{		
					if ($(this).html().indexOf('Free Parent Life Cover application') > 0)
					{
						$(this).html('<span class="text">Free Parent Life Insurance application</span><img src="https://www.irishlife.ie/secureWeb/uploadedImages/retail/123/img/free-life-heading.png" />');
					}
				});
			
				$('.fieldColumnInnerText').each(function(i) 
				{
					if ($(this).html().indexOf('You agree that we may use your ') == 0)
					{
						$(this).html('You agree that 123.ie may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about their products and services. To opt out at any time please write to 123.ie at RSA House, Dundrum Town Centre, Sandyford Road, Dundrum, Dublin 16, or click the unsubscribe link in any email sent by 123.ie, or follow the unsubscribe instructions in any texts sent by 123.ie.');
					}
					if ($(this).html().indexOf('In order to provide you with your Free Parent Life cover') == 0)
					{
						$(this).html('In order to provide you with your Free Parent Life Insurance plan, we need to gather some information about you to generate your free plan. The information will be held for that purpose by Irish Life and 123.ie.');
					}
				
				});
				
				$('.bottomBoxItems').each(function(i)
				{
					$(this).html('<li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/terms-of-business-IL.pdf">Irish Life Terms of business (209KB)</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/123.ie-terms-of-business.pdf?ts=1393507634280">123.ie Terms of business</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/free-parent-cover-IL.pdf">Plan booklet, Terms &amp; Conditions</a></li>');
				});
			
			}
			
		}
		
		if (localStorage['NPA2014'] == 'Y')
		{
			writePlansOnScreen();
		}
		
		
		});
	}
}

var numPlans=0;

function writePlansOnScreen()
{
	var plansHtml = '';
	var itemsStored=false;
for (var i = 0; i < localStorage.length; i++){
	if (localStorage.key(i) != 'currentSeller' &&
		localStorage.key(i) != 'numPlans' && 
		localStorage.key(i).indexOf('_') < 0 &&
		localStorage.key(i) != 'NPA2014')
    plansHtml+=(
	localStorage.key(i) + ' - <span style="cursor:pointer;text-decoration:underline" onclick="getPlanFromStorage(\''+localStorage.key(i) + '\');">Open</span>&nbsp;&nbsp;<span style="cursor:pointer;text-decoration:underline" onclick="clearPlanFromStorage(\''+localStorage.key(i) + '\');">Delete</span><br><br>');
	itemsStored=true;
}

if (itemsStored)
{
	plansHtml +='<br/><br /><a style="text-decoration:underline;cursor:pointer" href="https://www.irishlife.ie/secureWeb/life-assurance/get-25000-free-life-insurance.html?npa2014=Y&refer='+
	localStorage.currentSeller + '">Submit another plan</a><br /><br />';
	document.getElementById('tooltip').innerHTML=plansHtml;
	document.getElementById('tooltip').style.display='block';
	document.getElementById('tooltip').style.backgroundColor="#fff";
	document.getElementById('tooltip').style.fontSize="2.5em";
	document.getElementById('tooltip').style.fontWeight="bold";
	document.getElementById('tooltip').style.padding="50px";
}
}

function clearPlanFromStorage(keyIn)
{	
		localStorage.removeItem(keyIn);
		alert("item " + keyIn + " removed");
		writePlansOnScreen();
		
}

function getPlanFromStorage(keyIn)
{

		var storedPlan=localStorage[keyIn];
		var planArray = storedPlan.split(';');
		
		document.getElementById('life1TitleCd').value = planArray[0];
		document.getElementById('life1ForeName').value = planArray[1];
		document.getElementById('life1SurName').value = planArray[2];
		
		var life1Sex=planArray[3];
		if (life1Sex == 'M')
		{
			document.getElementById('life1SexCdM').checked = true;
		}
		else
		{
			document.getElementById('life1SexCdF').checked = true;
		}
		$('#life1SexCdButtonSet').buttonset('refresh');
		
		document.getElementById('life1RelationshipWithChild').value = planArray[4];
		document.getElementById('dependentChildrenNo').value = planArray[5];
		
		document.getElementById('life1Occupation1Cd').value = planArray[6];
		document.getElementById('life1Occupation1Cd_ExtInput').value = planArray[7];

		document.getElementById('life1GoodHealthCdY').checked=true;
		$('#life1GoodHealthCdButtonSet').buttonset('refresh');
		
		$('#life1BirthDt_Day').val(planArray[8]);
        $('#life1BirthDt_Month').val(planArray[9]);
        $('#life1BirthDt_Year').val(planArray[10]);
        inputDateChange($('#life1BirthDt_Day')[0]);
		
		document.getElementById('life1EmailAddressTxt').value = planArray[11];
		document.getElementById('life1ConfirmEmailAddress').value = planArray[12];
		document.getElementById('life1MobilePhoneNo').value = planArray[13];       
		document.getElementById('life1AddressLine1Txt').value = planArray[14];
		document.getElementById('life1AddressLine2Txt').value = planArray[15];
		document.getElementById('life1AddressLine3Txt').value = planArray[16];
		document.getElementById('life1CountyCd').value = planArray[17];

		$('#life1IrishLifeDataConsentCdY').attr('checked', true);
        $('#life1IrishLifeDataConsentCdButtonSet').buttonset('refresh');

        $('#life1MarketingConsentCdY').attr('checked', true);
        $('#life1MarketingConsentCdButtonSet').buttonset('refresh');

        $('#life1PlanDocumentsConsentCdY').attr('checked', true);
        $('#life1PlanDocumentsConsentCdButtonSet').buttonset('refresh');

        $('#life1EdocsIndicatorCdY').attr('checked', true);
        $('#life1EdocsIndicatorCdButtonSet').buttonset('refresh');
		
		
		
		var secondParent=planArray[18];
		document.getElementById('secondParentY').checked = (secondParent == 'true');
		
		if (secondParent)
        {$('#secondParentButtonSet').buttonset('refresh');
        secondParentClick();
		}
		document.getElementById('life2TitleCd').value = planArray[19];
		document.getElementById('life2ForeName').value = planArray[20];
		document.getElementById('life2SurName').value = planArray[21];
		
		var life2Sex=planArray[22];
		if (life2Sex == 'M')
		{
			document.getElementById('life2SexCdM').checked = true;
		}
		else
		{
			document.getElementById('life2SexCdF').checked = true;
		}
		$('#life2SexCdButtonSet').buttonset('refresh');
		
		document.getElementById('life2RelationshipWithChild').value = planArray[23];
		document.getElementById('life2RelationshipWithOtherParent').value = planArray[24];
		
		document.getElementById('life2Occupation1Cd').value = planArray[25];
		document.getElementById('life2Occupation1Cd_ExtInput').value = planArray[26];
				
		$('#life2GoodHealthCdY').attr('checked', true);
        $('#life2GoodHealthCdYButtonSet').buttonset('refresh');
		
		$('#life2BirthDt_Day').val(planArray[27]);
        $('#life2BirthDt_Month').val(planArray[28]);
        $('#life2BirthDt_Year').val(planArray[29]);
        inputDateChange($('#life2BirthDt_Day')[0]);

		
		
		document.getElementById('life2EmailAddressTxt').value = planArray[30];
		document.getElementById('life2ConfirmEmailAddress').value = planArray[31];
		document.getElementById('life2MobilePhoneNo').value = planArray[32];
		document.getElementById('life2AddressLine1Txt').value = planArray[33];
		document.getElementById('life2AddressLine2Txt').value = planArray[34];
		document.getElementById('life2AddressLine3Txt').value = planArray[35];
		document.getElementById('life2CountyCd').value = planArray[36];
		
		$('#life2IrishLifeDataConsentCdY').attr('checked', true);
        $('#life2IrishLifeDataConsentCdButtonSet').buttonset('refresh');

        $('#life2MarketingConsentCdY').attr('checked', true);
        $('#life2MarketingConsentCdButtonSet').buttonset('refresh');

        $('#life2PlanDocumentsConsentCdY').attr('checked', true);
        $('#life2PlanDocumentsConsentCdButtonSet').buttonset('refresh');

        $('#life2EdocsIndicatorCdY').attr('checked', true);
        $('#life2EdocsIndicatorCdButtonSet').buttonset('refresh');
		
		
}

if (window.addEventListener) {
  window.addEventListener("storage", handle_storage, false);
} else {
  window.attachEvent("onstorage", handle_storage);
};

function handle_storage(e) {
  if (!e) { e = window.event; }
}