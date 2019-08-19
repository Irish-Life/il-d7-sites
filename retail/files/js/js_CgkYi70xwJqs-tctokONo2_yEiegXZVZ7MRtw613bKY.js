(function(){var charSize=8,b64pad="",hexCase=0,Int_64=function(a,b){this.highOrder=a;this.lowOrder=b},str2binb=function(a){var b=[],mask=(1<<charSize)-1,length=a.length*charSize,i;for(i=0;i<length;i+=charSize){b[i>>5]|=(a.charCodeAt(i/charSize)&mask)<<(32-charSize-(i%32))}return b},hex2binb=function(a){var b=[],length=a.length,i,num;for(i=0;i<length;i+=2){num=parseInt(a.substr(i,2),16);if(!isNaN(num)){b[i>>3]|=num<<(24-(4*(i%8)))}else{return"INVALID HEX STRING"}}return b},binb2hex=function(a){var b=(hexCase)?"0123456789ABCDEF":"0123456789abcdef",str="",length=a.length*4,i,srcByte;for(i=0;i<length;i+=1){srcByte=a[i>>2]>>((3-(i%4))*8);str+=b.charAt((srcByte>>4)&0xF)+b.charAt(srcByte&0xF)}return str},binb2b64=function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"+"0123456789+/",str="",length=a.length*4,i,j,triplet;for(i=0;i<length;i+=3){triplet=(((a[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((a[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((a[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(j=0;j<4;j+=1){if(i*8+j*6<=a.length*32){str+=b.charAt((triplet>>6*(3-j))&0x3F)}else{str+=b64pad}}}return str},rotl_32=function(x,n){return(x<<n)|(x>>>(32-n))},rotr_32=function(x,n){return(x>>>n)|(x<<(32-n))},rotr_64=function(x,n){if(n<=32){return new Int_64((x.highOrder>>>n)|(x.lowOrder<<(32-n)),(x.lowOrder>>>n)|(x.highOrder<<(32-n)))}else{return new Int_64((x.lowOrder>>>n)|(x.highOrder<<(32-n)),(x.highOrder>>>n)|(x.lowOrder<<(32-n)))}},shr_32=function(x,n){return x>>>n},shr_64=function(x,n){if(n<=32){return new Int_64(x.highOrder>>>n,x.lowOrder>>>n|(x.highOrder<<(32-n)))}else{return new Int_64(0,x.highOrder<<(32-n))}},parity_32=function(x,y,z){return x^y^z},ch_32=function(x,y,z){return(x&y)^(~x&z)},ch_64=function(x,y,z){return new Int_64((x.highOrder&y.highOrder)^(~x.highOrder&z.highOrder),(x.lowOrder&y.lowOrder)^(~x.lowOrder&z.lowOrder))},maj_32=function(x,y,z){return(x&y)^(x&z)^(y&z)},maj_64=function(x,y,z){return new Int_64((x.highOrder&y.highOrder)^(x.highOrder&z.highOrder)^(y.highOrder&z.highOrder),(x.lowOrder&y.lowOrder)^(x.lowOrder&z.lowOrder)^(y.lowOrder&z.lowOrder))},sigma0_32=function(x){return rotr_32(x,2)^rotr_32(x,13)^rotr_32(x,22)},sigma0_64=function(x){var a=rotr_64(x,28),rotr34=rotr_64(x,34),rotr39=rotr_64(x,39);return new Int_64(a.highOrder^rotr34.highOrder^rotr39.highOrder,a.lowOrder^rotr34.lowOrder^rotr39.lowOrder)},sigma1_32=function(x){return rotr_32(x,6)^rotr_32(x,11)^rotr_32(x,25)},sigma1_64=function(x){var a=rotr_64(x,14),rotr18=rotr_64(x,18),rotr41=rotr_64(x,41);return new Int_64(a.highOrder^rotr18.highOrder^rotr41.highOrder,a.lowOrder^rotr18.lowOrder^rotr41.lowOrder)},gamma0_32=function(x){return rotr_32(x,7)^rotr_32(x,18)^shr_32(x,3)},gamma0_64=function(x){var a=rotr_64(x,1),rotr8=rotr_64(x,8),shr7=shr_64(x,7);return new Int_64(a.highOrder^rotr8.highOrder^shr7.highOrder,a.lowOrder^rotr8.lowOrder^shr7.lowOrder)},gamma1_32=function(x){return rotr_32(x,17)^rotr_32(x,19)^shr_32(x,10)},gamma1_64=function(x){var a=rotr_64(x,19),rotr61=rotr_64(x,61),shr6=shr_64(x,6);return new Int_64(a.highOrder^rotr61.highOrder^shr6.highOrder,a.lowOrder^rotr61.lowOrder^shr6.lowOrder)},safeAdd_32_2=function(x,y){var a=(x&0xFFFF)+(y&0xFFFF),msw=(x>>>16)+(y>>>16)+(a>>>16);return((msw&0xFFFF)<<16)|(a&0xFFFF)},safeAdd_32_4=function(a,b,c,d){var e=(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(e>>>16);return((msw&0xFFFF)<<16)|(e&0xFFFF)},safeAdd_32_5=function(a,b,c,d,e){var f=(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF)+(e&0xFFFF),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(e>>>16)+(f>>>16);return((msw&0xFFFF)<<16)|(f&0xFFFF)},safeAdd_64_2=function(x,y){var a,msw,lowOrder,highOrder;a=(x.lowOrder&0xFFFF)+(y.lowOrder&0xFFFF);msw=(x.lowOrder>>>16)+(y.lowOrder>>>16)+(a>>>16);lowOrder=((msw&0xFFFF)<<16)|(a&0xFFFF);a=(x.highOrder&0xFFFF)+(y.highOrder&0xFFFF)+(msw>>>16);msw=(x.highOrder>>>16)+(y.highOrder>>>16)+(a>>>16);highOrder=((msw&0xFFFF)<<16)|(a&0xFFFF);return new Int_64(highOrder,lowOrder)},safeAdd_64_4=function(a,b,c,d){var e,msw,lowOrder,highOrder;e=(a.lowOrder&0xFFFF)+(b.lowOrder&0xFFFF)+(c.lowOrder&0xFFFF)+(d.lowOrder&0xFFFF);msw=(a.lowOrder>>>16)+(b.lowOrder>>>16)+(c.lowOrder>>>16)+(d.lowOrder>>>16)+(e>>>16);lowOrder=((msw&0xFFFF)<<16)|(e&0xFFFF);e=(a.highOrder&0xFFFF)+(b.highOrder&0xFFFF)+(c.highOrder&0xFFFF)+(d.highOrder&0xFFFF)+(msw>>>16);msw=(a.highOrder>>>16)+(b.highOrder>>>16)+(c.highOrder>>>16)+(d.highOrder>>>16)+(e>>>16);highOrder=((msw&0xFFFF)<<16)|(e&0xFFFF);return new Int_64(highOrder,lowOrder)},safeAdd_64_5=function(a,b,c,d,e){var f,msw,lowOrder,highOrder;f=(a.lowOrder&0xFFFF)+(b.lowOrder&0xFFFF)+(c.lowOrder&0xFFFF)+(d.lowOrder&0xFFFF)+(e.lowOrder&0xFFFF);msw=(a.lowOrder>>>16)+(b.lowOrder>>>16)+(c.lowOrder>>>16)+(d.lowOrder>>>16)+(e.lowOrder>>>16)+(f>>>16);lowOrder=((msw&0xFFFF)<<16)|(f&0xFFFF);f=(a.highOrder&0xFFFF)+(b.highOrder&0xFFFF)+(c.highOrder&0xFFFF)+(d.highOrder&0xFFFF)+(e.highOrder&0xFFFF)+(msw>>>16);msw=(a.highOrder>>>16)+(b.highOrder>>>16)+(c.highOrder>>>16)+(d.highOrder>>>16)+(e.highOrder>>>16)+(f>>>16);highOrder=((msw&0xFFFF)<<16)|(f&0xFFFF);return new Int_64(highOrder,lowOrder)},coreSHA1=function(f,g){var W=[],a,b,c,d,e,T,ch=ch_32,parity=parity_32,maj=maj_32,rotl=rotl_32,safeAdd_2=safeAdd_32_2,i,t,safeAdd_5=safeAdd_32_5,appendedMessageLength,H=[0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0],K=[0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6];f[g>>5]|=0x80<<(24-(g%32));f[(((g+65)>>9)<<4)+15]=g;appendedMessageLength=f.length;for(i=0;i<appendedMessageLength;i+=16){a=H[0];b=H[1];c=H[2];d=H[3];e=H[4];for(t=0;t<80;t+=1){if(t<16){W[t]=f[t+i]}else{W[t]=rotl(W[t-3]^W[t-8]^W[t-14]^W[t-16],1)}if(t<20){T=safeAdd_5(rotl(a,5),ch(b,c,d),e,K[t],W[t])}else if(t<40){T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}else if(t<60){T=safeAdd_5(rotl(a,5),maj(b,c,d),e,K[t],W[t])}else{T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}e=d;d=c;c=rotl(b,30);b=a;a=T}H[0]=safeAdd_2(a,H[0]);H[1]=safeAdd_2(b,H[1]);H[2]=safeAdd_2(c,H[2]);H[3]=safeAdd_2(d,H[3]);H[4]=safeAdd_2(e,H[4])}return H},coreSHA2=function(j,k,l){var a,b,c,d,e,f,g,h,T1,T2,H,numRounds,lengthPosition,i,t,binaryStringInc,binaryStringMult,safeAdd_2,safeAdd_4,safeAdd_5,gamma0,gamma1,sigma0,sigma1,ch,maj,Int,K,W=[],appendedMessageLength;if(l==="SHA-224"||l==="SHA-256"){numRounds=64;lengthPosition=(((k+65)>>9)<<4)+15;binaryStringInc=16;binaryStringMult=1;Int=Number;safeAdd_2=safeAdd_32_2;safeAdd_4=safeAdd_32_4;safeAdd_5=safeAdd_32_5;gamma0=gamma0_32;gamma1=gamma1_32;sigma0=sigma0_32;sigma1=sigma1_32;maj=maj_32;ch=ch_32;K=[0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0x0FC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x06CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2];if(l==="SHA-224"){H=[0xc1059ed8,0x367cd507,0x3070dd17,0xf70e5939,0xffc00b31,0x68581511,0x64f98fa7,0xbefa4fa4]}else{H=[0x6A09E667,0xBB67AE85,0x3C6EF372,0xA54FF53A,0x510E527F,0x9B05688C,0x1F83D9AB,0x5BE0CD19]}}else if(l==="SHA-384"||l==="SHA-512"){numRounds=80;lengthPosition=(((k+128)>>10)<<5)+31;binaryStringInc=32;binaryStringMult=2;Int=Int_64;safeAdd_2=safeAdd_64_2;safeAdd_4=safeAdd_64_4;safeAdd_5=safeAdd_64_5;gamma0=gamma0_64;gamma1=gamma1_64;sigma0=sigma0_64;sigma1=sigma1_64;maj=maj_64;ch=ch_64;K=[new Int(0x428a2f98,0xd728ae22),new Int(0x71374491,0x23ef65cd),new Int(0xb5c0fbcf,0xec4d3b2f),new Int(0xe9b5dba5,0x8189dbbc),new Int(0x3956c25b,0xf348b538),new Int(0x59f111f1,0xb605d019),new Int(0x923f82a4,0xaf194f9b),new Int(0xab1c5ed5,0xda6d8118),new Int(0xd807aa98,0xa3030242),new Int(0x12835b01,0x45706fbe),new Int(0x243185be,0x4ee4b28c),new Int(0x550c7dc3,0xd5ffb4e2),new Int(0x72be5d74,0xf27b896f),new Int(0x80deb1fe,0x3b1696b1),new Int(0x9bdc06a7,0x25c71235),new Int(0xc19bf174,0xcf692694),new Int(0xe49b69c1,0x9ef14ad2),new Int(0xefbe4786,0x384f25e3),new Int(0x0fc19dc6,0x8b8cd5b5),new Int(0x240ca1cc,0x77ac9c65),new Int(0x2de92c6f,0x592b0275),new Int(0x4a7484aa,0x6ea6e483),new Int(0x5cb0a9dc,0xbd41fbd4),new Int(0x76f988da,0x831153b5),new Int(0x983e5152,0xee66dfab),new Int(0xa831c66d,0x2db43210),new Int(0xb00327c8,0x98fb213f),new Int(0xbf597fc7,0xbeef0ee4),new Int(0xc6e00bf3,0x3da88fc2),new Int(0xd5a79147,0x930aa725),new Int(0x06ca6351,0xe003826f),new Int(0x14292967,0x0a0e6e70),new Int(0x27b70a85,0x46d22ffc),new Int(0x2e1b2138,0x5c26c926),new Int(0x4d2c6dfc,0x5ac42aed),new Int(0x53380d13,0x9d95b3df),new Int(0x650a7354,0x8baf63de),new Int(0x766a0abb,0x3c77b2a8),new Int(0x81c2c92e,0x47edaee6),new Int(0x92722c85,0x1482353b),new Int(0xa2bfe8a1,0x4cf10364),new Int(0xa81a664b,0xbc423001),new Int(0xc24b8b70,0xd0f89791),new Int(0xc76c51a3,0x0654be30),new Int(0xd192e819,0xd6ef5218),new Int(0xd6990624,0x5565a910),new Int(0xf40e3585,0x5771202a),new Int(0x106aa070,0x32bbd1b8),new Int(0x19a4c116,0xb8d2d0c8),new Int(0x1e376c08,0x5141ab53),new Int(0x2748774c,0xdf8eeb99),new Int(0x34b0bcb5,0xe19b48a8),new Int(0x391c0cb3,0xc5c95a63),new Int(0x4ed8aa4a,0xe3418acb),new Int(0x5b9cca4f,0x7763e373),new Int(0x682e6ff3,0xd6b2b8a3),new Int(0x748f82ee,0x5defb2fc),new Int(0x78a5636f,0x43172f60),new Int(0x84c87814,0xa1f0ab72),new Int(0x8cc70208,0x1a6439ec),new Int(0x90befffa,0x23631e28),new Int(0xa4506ceb,0xde82bde9),new Int(0xbef9a3f7,0xb2c67915),new Int(0xc67178f2,0xe372532b),new Int(0xca273ece,0xea26619c),new Int(0xd186b8c7,0x21c0c207),new Int(0xeada7dd6,0xcde0eb1e),new Int(0xf57d4f7f,0xee6ed178),new Int(0x06f067aa,0x72176fba),new Int(0x0a637dc5,0xa2c898a6),new Int(0x113f9804,0xbef90dae),new Int(0x1b710b35,0x131c471b),new Int(0x28db77f5,0x23047d84),new Int(0x32caab7b,0x40c72493),new Int(0x3c9ebe0a,0x15c9bebc),new Int(0x431d67c4,0x9c100d4c),new Int(0x4cc5d4be,0xcb3e42b6),new Int(0x597f299c,0xfc657e2a),new Int(0x5fcb6fab,0x3ad6faec),new Int(0x6c44198c,0x4a475817)];if(l==="SHA-384"){H=[new Int(0xcbbb9d5d,0xc1059ed8),new Int(0x0629a292a,0x367cd507),new Int(0x9159015a,0x3070dd17),new Int(0x0152fecd8,0xf70e5939),new Int(0x67332667,0xffc00b31),new Int(0x98eb44a87,0x68581511),new Int(0xdb0c2e0d,0x64f98fa7),new Int(0x047b5481d,0xbefa4fa4)]}else{H=[new Int(0x6a09e667,0xf3bcc908),new Int(0xbb67ae85,0x84caa73b),new Int(0x3c6ef372,0xfe94f82b),new Int(0xa54ff53a,0x5f1d36f1),new Int(0x510e527f,0xade682d1),new Int(0x9b05688c,0x2b3e6c1f),new Int(0x1f83d9ab,0xfb41bd6b),new Int(0x5be0cd19,0x137e2179)]}}j[k>>5]|=0x80<<(24-k%32);j[lengthPosition]=k;appendedMessageLength=j.length;for(i=0;i<appendedMessageLength;i+=binaryStringInc){a=H[0];b=H[1];c=H[2];d=H[3];e=H[4];f=H[5];g=H[6];h=H[7];for(t=0;t<numRounds;t+=1){if(t<16){W[t]=new Int(j[t*binaryStringMult+i],j[t*binaryStringMult+i+1])}else{W[t]=safeAdd_4(gamma1(W[t-2]),W[t-7],gamma0(W[t-15]),W[t-16])}T1=safeAdd_5(h,sigma1(e),ch(e,f,g),K[t],W[t]);T2=safeAdd_2(sigma0(a),maj(a,b,c));h=g;g=f;f=e;e=safeAdd_2(d,T1);d=c;c=b;b=a;a=safeAdd_2(T1,T2)}H[0]=safeAdd_2(a,H[0]);H[1]=safeAdd_2(b,H[1]);H[2]=safeAdd_2(c,H[2]);H[3]=safeAdd_2(d,H[3]);H[4]=safeAdd_2(e,H[4]);H[5]=safeAdd_2(f,H[5]);H[6]=safeAdd_2(g,H[6]);H[7]=safeAdd_2(h,H[7])}switch(l){case"SHA-224":return[H[0],H[1],H[2],H[3],H[4],H[5],H[6]];case"SHA-256":return H;case"SHA-384":return[H[0].highOrder,H[0].lowOrder,H[1].highOrder,H[1].lowOrder,H[2].highOrder,H[2].lowOrder,H[3].highOrder,H[3].lowOrder,H[4].highOrder,H[4].lowOrder,H[5].highOrder,H[5].lowOrder];case"SHA-512":return[H[0].highOrder,H[0].lowOrder,H[1].highOrder,H[1].lowOrder,H[2].highOrder,H[2].lowOrder,H[3].highOrder,H[3].lowOrder,H[4].highOrder,H[4].lowOrder,H[5].highOrder,H[5].lowOrder,H[6].highOrder,H[6].lowOrder,H[7].highOrder,H[7].lowOrder];default:return[]}},jsSHA=function(a,b){this.sha1=null;this.sha224=null;this.sha256=null;this.sha384=null;this.sha512=null;this.strBinLen=null;this.strToHash=null;if("HEX"===b){if(0!==(a.length%2)){return"TEXT MUST BE IN BYTE INCREMENTS"}this.strBinLen=a.length*4;this.strToHash=hex2binb(a)}else if(("ASCII"===b)||('undefined'===typeof(b))){this.strBinLen=a.length*charSize;this.strToHash=str2binb(a)}else{return"UNKNOWN TEXT INPUT TYPE"}};jsSHA.prototype={getHash:function(a,b){var c=null,message=this.strToHash.slice();switch(b){case"HEX":c=binb2hex;break;case"B64":c=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}switch(a){case"SHA-1":if(null===this.sha1){this.sha1=coreSHA1(message,this.strBinLen)}return c(this.sha1);case"SHA-224":if(null===this.sha224){this.sha224=coreSHA2(message,this.strBinLen,a)}return c(this.sha224);case"SHA-256":if(null===this.sha256){this.sha256=coreSHA2(message,this.strBinLen,a)}return c(this.sha256);case"SHA-384":if(null===this.sha384){this.sha384=coreSHA2(message,this.strBinLen,a)}return c(this.sha384);case"SHA-512":if(null===this.sha512){this.sha512=coreSHA2(message,this.strBinLen,a)}return c(this.sha512);default:return"HASH NOT RECOGNIZED"}},getHMAC:function(a,b,c,d){var e,keyToUse,blockByteSize,blockBitSize,i,retVal,lastArrayIndex,keyBinLen,hashBitSize,keyWithIPad=[],keyWithOPad=[];switch(d){case"HEX":e=binb2hex;break;case"B64":e=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}switch(c){case"SHA-1":blockByteSize=64;hashBitSize=160;break;case"SHA-224":blockByteSize=64;hashBitSize=224;break;case"SHA-256":blockByteSize=64;hashBitSize=256;break;case"SHA-384":blockByteSize=128;hashBitSize=384;break;case"SHA-512":blockByteSize=128;hashBitSize=512;break;default:return"HASH NOT RECOGNIZED"}if("HEX"===b){if(0!==(a.length%2)){return"KEY MUST BE IN BYTE INCREMENTS"}keyToUse=hex2binb(a);keyBinLen=a.length*4}else if("ASCII"===b){keyToUse=str2binb(a);keyBinLen=a.length*charSize}else{return"UNKNOWN KEY INPUT TYPE"}blockBitSize=blockByteSize*8;lastArrayIndex=(blockByteSize/4)-1;if(blockByteSize<(keyBinLen/8)){if("SHA-1"===c){keyToUse=coreSHA1(keyToUse,keyBinLen)}else{keyToUse=coreSHA2(keyToUse,keyBinLen,c)}keyToUse[lastArrayIndex]&=0xFFFFFF00}else if(blockByteSize>(keyBinLen/8)){keyToUse[lastArrayIndex]&=0xFFFFFF00}for(i=0;i<=lastArrayIndex;i+=1){keyWithIPad[i]=keyToUse[i]^0x36363636;keyWithOPad[i]=keyToUse[i]^0x5C5C5C5C}if("SHA-1"===c){retVal=coreSHA1(keyWithIPad.concat(this.strToHash),blockBitSize+this.strBinLen);retVal=coreSHA1(keyWithOPad.concat(retVal),blockBitSize+hashBitSize)}else{retVal=coreSHA2(keyWithIPad.concat(this.strToHash),blockBitSize+this.strBinLen,c);retVal=coreSHA2(keyWithOPad.concat(retVal),blockBitSize+hashBitSize,c)}return(e(retVal))}};window.jsSHA=jsSHA}());
var gaCampaign='';
var gaMedium='';

function testingCall()
{
	return "function called";
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


(function($){

	$(document).ready(function () {
/*		Munchkin.init('450-GHO-121');	*/
		getCampaign();	
		timestampPdfs();
	});

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
		$(this).attr('onclick'," ga('send','event', 'PDF download', '"+link + "');return true");
		$(this).attr('target','_blank');
		});
	}

})(jQuery);

;
/*
 * SimpleModal 1.4.3 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2012 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sat, Sep 8 2012 07:52:31 -0700
 */
(function($){


	$(document).ready(function($) {

		$(document).on('click', '.anyCallbackButton', function(event) {
			event.preventDefault();
			$('#callback-modal-content').modal();
		});

		 function setGAPageView (p,t) {
			try{
				//tag manager
				dataLayer.push({
				'event':'pageview',
				'pageTitle':t,
				'virtualURL':p
				});
			}
			catch(err){
			//Do nothing
			}
			//return "user set";
		}


		// validate email address format
		function isEmail(email) {
		  var regex = /^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/;
		  return regex.test(email);
		}

		function beClickTalkPop(){
			$("#progressBoxPopupContents").hide();
			$("#loadingboxpopup").show();
		}

		function seClickTalkPop(){
			$("#loadingboxpopup").hide();
			$("#progressBoxPopupContents").hide();

			$("#loadingcompletepopup").show();
			setTimeout( function(){
				$.modal.close();
			}, 4000);
		}

		function eeClickTalkPop(){
			alert("error ");
		}

		// Submitting a RHS callback
		$('#sendAdvisorCallbackPopupForm').click(function(){
			var n,e,p,t,z,a,ae;
			z = 0;
			n = $("#callbackPopupName").val()
			e = $('#callbackPopupEmail').val();
			p = $("#callbackPopupPhone").val()
			ae = $('#callbackAreaInterest').val();
			t = $('#callbackPopupCalltime').val();
			
			if(p.length<6){
				z =z+1;
				alert("Please enter a valid PHONE NUMBER.");
			}

			if(isEmail(e) == false){
				e ="N/A";
			}
			if (z==0)
			{
				// no errors
				// send the callback anc change the screen
				mkAssociateLead('', n, e, p, t, ae);
				seClickTalkPop();
				setGAPageView('/financial-advice/callback-requested','Callback Requested callback RHS');
			}
		});
	});
	
	$(window ).load(function() {
		jQuery('#callbackTab').animate({left: 0},2000);
	});

})(jQuery);

(function ($) {

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }


    /*
    ###################
    #
    # Return an array of gradient colours for use with charts etc
    # Ensure the colours are not the same and are not too bright
    # or dark.
    */
    function colorLuminance(hex) {

      // convert to decimal and change luminosity
      var rgb = "#",c,i,r,g,b,rl,gl,bl;
      
      r = hexToRgb(hex).r;//parseInt(hex.substr(0,2), 16);
      g = hexToRgb(hex).g;//parseInt(hex.substr(2,2), 16);
      b = hexToRgb(hex).b;//parseInt(hex.substr(4,2), 16);
      
      var a = []; // the resulting array
      for(i=0;i<20;i++){
       var lum = (i-10)/10;
        rl = Math.round(Math.min(Math.max(0, r + ( r * lum)), 255));
        gl = Math.round(Math.min(Math.max(0, g + ( g * lum)), 255));
        bl = Math.round(Math.min(Math.max(0, b + ( b * lum)), 255))
        var luma = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl; // per ITU-R BT.709 http://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
      
         
        if (luma > 40 && luma < 212) {
          // The new hex which has been brightened or darkens based on lum value
          var myHex = rgbToHex(rl, gl, bl);
      
          // from 0 to 510
          // Dark to bright
          //
          a.push(myHex);
         
         
          // pick a different colour
        }
      }
      
      // if in the resulting array the initial hex is 
      // in the 2nd half of the array then flip it
      // so that it is likely gets used in any charts
      
      var initialLoc = a.indexOf(hex);
       if (a.length >=10){
            var extras = a.length - 10;
            for(x=0;x<extras;x++)
            {
              if((x+1) == a.indexOf(hex))
              {
                a.splice(x, 1);
              }
              else{ 
              
                a.splice((x+1), 1);
              }
            }
          }
      
      if(a.indexOf(hex) > (a.length/2)){
        a.reverse();
      }
      
      // a.reverse();
      return a;
    }
    
  $( document ).ready(function() {
    var selectedID = "4";
    var fload = new Array();
    var splitCount = allAssetsData[0].length;
   // var universalColors = ['#425399', '#f49d1d', '#4d4e53', '#5fc048', '#00a9d4', '#87607f', '#748433', '#3f92df', '#007b58', '#748433'];
    var mapColors = ['#c3e088', '#8fd5bd', '#49c3b1', '#5d89b4', '#515ba1'];
    var universalColors = colorLuminance(mapColors[selectedID-2]);
    

    //var universalColors = [colorLuminance('#c3e088',1), '#1a5774', '#356b84', '#4e7d94', '#6991a4', '#6991a4', '#72a6c2', '#c3d3da', '#d9e3e8', '#b5cfdf', '#6AF9C4'];
    // var universalColors = ['#005a8c', '#0badd5', '#26739e', '#7b87c0', '#5792b3', '#56c6e2', '#8cb4ca', '#87d7ea', '#abb0ca', '#c5c9db'];
    fload[0] = toObject(allAssetsData[0]);
    fload[1] = toObject(allAssetsData[1]);
    fload[2] = toObject(allAssetsData[2]);
    fload[3] = toObject(allAssetsData[3]);
    fload[4] = toObject(allAssetsData[4]);
    
    
      $('.irishlife-fc-asset-group-spinner-holder').hide();
      $('.irishlife-fc-asset-group-holder').show();
    getCustomPieChart('irishlife-fc-asset-group-holder','Asset Splits',allAssetsData[selectedID], universalColors);
    addAssetBars(fload, universalColors); // add the bars to the screen
    
    //universalColors = colorLuminance(mapColors[selectedID-2]);
    //setAssetBars(fload[selectedID],colorLuminance[mapColors[selectedID]]);

    var chart= $("#irishlife-fc-asset-group-holder").highcharts();


    function toObject(arr) {
      var table = [],
      keys = arr; // get & remove the first row
      
      for (var i=0; i<arr.length; i++) {
        
        
        var row = {};
          for (var j=0; j<arr[i].length; j++)
            {
              row[ j ] = arr[i][j];
                
            }
           table[i] = row;
        }
        return table;
      }
    
    
    
      function switchAsset(id){
      var c = colorLuminance(mapColors[id]);
      setAssetBars(fload[id],c);
      setAssetText(id);
      
        for(i=0; i<splitCount; i++)
        {
          chart.series[0].data[i].update({y:fload[id][i][1],name:fload[id][i][0]});
          chart.series[0].data[i].update({color:c[i]});
          //chart.series[0].data[i].graphic.attr({fill: c[i]});
        }
      
      }
    
    
               
       $(".switch-asset-2").hover(function () {
        switchAsset(0);
      });
       $(".switch-asset-3").hover(function () {
        switchAsset(1);
      });
       $(".switch-asset-4").hover(function () {
        switchAsset(2);
      });
       $(".switch-asset-5").hover(function () {
        switchAsset(3);
      });
       $(".switch-asset-6").hover(function () {
        switchAsset(4);
      });
          
       $(".circle").hover(function () {
        $(".circle").removeClass('hover');
        $(this).addClass('hover');
      });
      switchAsset((selectedID-2)); // selectedID starts at 2 & asset starts at 0
      $('.switch-asset-'+selectedID).addClass('hover');
      
  });
  
  
  
  function addAssetBars(arr, colors){
    
    var split = Math.round((arr[0].length/2));
    var rightBuildHTML ="",leftBuildHTML ="";
    for(i=0; i<arr[0].length; i++){
      if (i>=split)
      {
        rightBuildHTML += '<h6 class="asset-'+i+'-title">'+i+'</h6><div class="bar-holder bar-holder-'+i+'" style="border-bottom: 1px solid '+colors[i]+';"><div class="bar asset-'+i+'-bar" style="width: 38%;background:'+colors[i]+';"></div></div>';
        }
        else
        {
        leftBuildHTML += '<h6 class="asset-'+i+'-title">'+i+'</h6><div class="bar-holder bar-holder-'+i+'" style="border-bottom: 1px solid '+colors[i]+';"><div class="bar asset-'+i+'-bar" style="width: 38%;background:'+colors[i]+';"></div></div>';
        }
    }
     $('.asset-split-bars-left').html(leftBuildHTML);
     $('.asset-split-bars-right').html(rightBuildHTML);
     
     
  }
  function setAssetBars(obj,colors){
  for(i=0; i<obj.length; i++){
        $('.asset-'+i+'-title').html(obj[i][0]);
        $('.asset-'+i+'-bar').width(obj[i][1]+"%");
        $('.asset-'+i+'-bar').css('background', colors[i]);
        $('.bar-holder-'+i).css('border-color', colors[i]);
       
    }
  }
  
  
  //##########################
  //
  // This is the text for each of the MAP Funds
  //
  
  function setAssetText(id){

    var title = Drupal.settings.fund_charting.title;
    var url = Drupal.settings.fund_charting.url;
    
    var text = Drupal.settings.fund_charting.text;
    
    var html = "<h2><a target=\"_top\" href='"+url[id].trim()+
	"'>"+title[id].trim()+"</a></h2><p class='hide-for-small'>"+
	text[id].trim()+"&nbsp;</p><p ><a target=\"_top\" class='assetSplitCTABtn' href='"+
	url[id].trim()+"'>More Info</a></p>";
    $('#irishlife-fc-asset-group-text').html(html);
  }
  
  
  
  
  
  
  function getCustomPieChart(divTitle, chartTitle, chartData, colors ){

    // Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
    //  return ['#0F154F', '#252C6D', '#3C4384', '#5E65A0','#8C91BF', '#6268A2', '#8C91BF', '#BABDDC', '#E3E4F2','#B9AB97']
      // return colors;//['#5261ac', '#f19c2b', '#5cc151', '#cc092f', '#333333', '#4d4e53', '#435399', '#FF9655', '#FFF263', '#6AF9C4']
      
      /*
        var colors = [];
      
        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(startColor).brighten((i - 3) / 10).get());
        }
      */
      
        return colors;
      
    }());

    // Build the chart
    $('#'+divTitle).highcharts({
        chart: {
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        height: 240,
        style: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
			},
			margin:[30,0,0,0]
        },
		credits:{enabled:false},
        title: {
            text: ''
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b>';
            }
        },
        plotOptions: {
            pie: {
					allowPointSelect: true,
                    cursor: 'pointer',
					size:200,
					center: ["50%", "40%"],
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: false,
					
            }
			
        },
		legend: {
						align: 'center',
						 verticalAlign: 'top',
						 floating: true,
						 y: 255,
						 layout: 'vertical',
            labelFormatter: function () {
              var y = this.y; // get the value
               if (y == 0) // if the value is zero then hide
                return null    
                else
                return this.name
              }
						},
        series: [{
            type: 'pie',
            name: '',
            data: chartData
        }],
        
    });
    }



  
})(jQuery);;
(function ($) {
	Highcharts.setOptions({
     colors: ['#69923A', '#C9DD03', '#9ADCC6', '#5582AB', '#002664', '#50C9B5']
    });
    $('#emerging-markets-pie').highcharts({
        chart: {
            type: 'pie',
			backgroundColor: '#F1F6FC',
            options3d: {
                enabled: false,
                alpha: 45
            }
        },
        title: {
            text: ''
        },
		credits: {
				enabled: false
			},
		exporting: { 
				enabled: false 
			},
        plotOptions: {
            pie: {
               innerSize: 80,
			   size:150
            }
        },
        series: [{
            name: 'Geographic Split',
            data: [
				['China 23.16%', 23.16],
				 ['South Korea 16.18%', 16.18],
				 ['Taiwan 13.21%', 3.85],
				 ['India 9.27%', 9.27],
                ['South Africa 7.54%', 7.54],
			    ['Other 30.64%', 30.64],
            ]
        }]
    });
})(jQuery);;
(function ($) {	
   $('#developed-markets-pie').highcharts({
        chart: {
            type: 'pie',
			backgroundColor: '#F1F6FC',
			marginTop: 0,
			spacingTop: 0
        },
        title: {
            text: null,
			margin:0
        },
		credits: {
				enabled: false
			},
		exporting: { 
				enabled: false 
			},
        plotOptions: {
            pie: {
               innerSize: 80,
			   size:150
            }
        },
        series: [{
            name: 'Geographic Split',
            data: [
				['Japan 8.1%', 8.1],
				 ['United Kingdom 6.7%', 6.7],
				 ['France 3.37%', 3.37],
				 ['Switzerland 3.25%', 3.25],
                ['Other 25.53%', 25.53],
			    ['United States 53.6%', 53.6],
            ]
        }]
    });
})(jQuery);



;
(function ($) {
    // Age categories
    var categories = ['Technology', 'Industrials', 'Financials', 'Consumer Discetionary',
            'Materials', 'Telecoms', 'Energy', 'Utilities', 'Healthcare/Pharma',
            'Consumer Staples'];
    $(document).ready(function () {
		Highcharts.setOptions({
     colors: ['#69923A']
    });
		
        $('#low-volatility-shares-pie').highcharts({
            chart: {
                type: 'bar',
				backgroundColor: '#F1F6FC'
            },
            title: {
                text: ''
            },
			credits: {
				enabled: false
			},
			exporting: { 
				enabled: false 
			},
			colors: [
            '#002664'
            ],
			
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '%';
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', ' + this.point.category + '</b><br/>' +
                        'Weighting: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },

            series: [{
				showInLegend: false,
                data: [-7.5, -6.5, -6, -4.5, -2, 1, 3, 5,
                    10, 11]
            }]
        });
    });

})(jQuery);;
(function ($) {
	 $('#government-bonds-pie').highcharts({
        chart: {
            type: 'pie',
			backgroundColor: '#F1F6FC',
            options3d: {
                enabled: false,
                alpha: 45
            }
        },
        title: {
            text: ''
        },
		credits: {
				enabled: false
			},
		exporting: { 
				enabled: false 
			},
        plotOptions: {
            pie: {
               innerSize: 80,
			   size:150
            }
        },
        series: [{
            name: 'Geographic Split',
            data: [
				['Lithuania 0.06%', 0.06],
				 ['Luxembourg 0.12%', 0.12],
				 ['Netherlands 6.96%', 6.96],
				 ['Slovenia 0.29%', 0.29],
                ['Slovakia 0.51%', 0.51],
				['Austria 3.76%', 3.76],
				['Belgium 4.92%', 4.92],
				['Germany 19.79%', 19.79],
				['Spain 14.01%', 14.01],
				['Finland 1.52%', 1.52],
				['France 22.7%', 22.7],
				['Ireland 2.23%', 2.23],
			    ['Italy 23.13%', 23.13],
            ]
        }]
    });
})(jQuery);



;
(function ($) {
	 $('#corporate-bonds-pie').highcharts({
        chart: {
            type: 'pie',
			backgroundColor: '#F1F6FC',
            options3d: {
                enabled: false,
                alpha: 45
            }
        },
        title: {
            text: ''
        },
		credits: {
				enabled: false
			},
		exporting: { 
				enabled: false 
			},
        plotOptions: {
            pie: {
               innerSize: 80,
			   size:150
            }
        },
        series: [{
            name: 'Geographic Split',
            data: [
				['Utility 12.52%', 12.52],
				 ['Banking 34.26%', 34.26],
				 ['Basic Industry 5.12%', 5.12],
				 ['Automotive 5.22%', 5.22],
                ['Capital Goods 4.29%', 4.29],
				['Consumer Goods 5.31%', 5.31],
				['Leisure 0.06%', 0.06],
				['Energy 5.56%', 5.56],
				['Financial Services 1.02%', 1.02],
				['Insurance 4.78%', 4.78],
				['Media 1.03%', 1.03],
				['Retail 2.24%', 2.24],
				['Transportation 4.47%', 4.47],
				['Real Estate 1.71%', 1.71],
				['Services 0.66%', 0.66],
				['Healthcare 3.01%', 3.01],
				['Technology & Electronics 1.57%', 1.57],
			    ['Telecommunications 7.19%', 7.19],
            ]
        }]
    });
})(jQuery);



;
(function ($) {
	 $('#emerging-market-debt-pie').highcharts({
        chart: {
            type: 'pie',
			backgroundColor: '#F1F6FC',
            options3d: {
                enabled: false,
                alpha: 45
            }
        },
        title: {
            text: ''
        },
		credits: {
				enabled: false
			},
		exporting: { 
				enabled: false 
			},
        plotOptions: {
            pie: {
               innerSize: 80,
			   size:150
            }
        },
        series: [{
            name: 'Geographic Split',
            data: [
				['Turkey 9.7%', 9.7],
				 ['Brazil 10%', 10],
				 ['Chile 0.11%', 0.11],
				 ['Colombia 6.83%', 6.83],
                ['Hungary 5.84%', 5.84],
				['Indonesia 8.60%', 8.60],
				['Malaysia 9.45%', 9.45],
				['Mexico 10%', 10],
				['Nigeria 0.79%', 0.79],
				['Peru 1.90%', 1.90],
				['Phillipines 0.48%', 0.48],
				['Poland 10%', 10],
				['Romania 3.09%', 3.09],
				['Russia 4.93%', 4.93],
				['South Africa 10%', 10],
			    ['Thailand 8.73%', 8.73],
            ]
        }]
    });
})(jQuery);



;
(function ($) {
	$('#dsc-signal-pie').highcharts({
        title: {
            text: '',
            x: -20 //center
        },
        subtitle: {
            x: -20
        },
		credits: {
				enabled: false
			},
		exporting: { 
				enabled: false 
			},
        xAxis: {
            categories: ['01-10-14', '12-11-14', '24-12-14', '04-02-15', '18-03-15', '29-04-15',
                '10-06-15', '22-07-15', '02-09-15', '30-09-15', '31-12-15']
        },
        yAxis: {
            title: {
                text: 'DSC Signal'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
       
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
			showInLegend: false,
            data: [0.657125763513038, 0.738031400609724, 1.0102555175885, 0.994640500308612, 1.42670892158713,  1.01948296068188, 0.952077008819924, 0.904075431986958, 0.164, 0.14, 0.279341096]
        }]
    });
})(jQuery);



;
