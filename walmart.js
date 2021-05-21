const fetch = require('node-fetch');
const email = require('./email')

const URL = "https://www.walmart.com/ip/PlayStation-5-Console/363472942";

var found = false;

function checkStatus(res) {
  if (res.ok) { // res.status >= 200 && res.status < 300
    return res;
  } else {
    console.log("error: " + res);
    throw Error(res.statusText);
  }
}



function checkSite(availCb, unavailCb, counter) {
	//paste in copy as node.js fetch here
fetch("https://www.walmart.com/ip/PlayStation-5-Console/363472942?action=SignIn&rm=true", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
    "cache-control": "max-age=0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "service-worker-navigation-preload": "true",
    "upgrade-insecure-requests": "0",
    "cookie": "brwsr=d04eccac-2e92-11eb-b90e-42010a246fdd; DL=94087%2C%2C%2Cip%2C94087%2C%2C; vtc=QEQrq1HCqZQjaK6f2Hf1FY; _pxvid=3606557b-6738-11eb-88eb-0242ac120017; _gcl_au=1.1.301155158.1612477670; cart-item-count=0; adblocked=true; cbp=363472942-1612594786248|493824815-1612594800212|363472942-1615016090300; athrvi=RVI~h15aa282e-h22576c7b-h1d6f2b2f; s_sess_2=ps%3D1%3B%20prop32%3D; TS013ed49a=01538efd7cbe490d4be28172339f049cd324abd9d7c010d598c21300222f7cebd36b79d2f1669c4261374ba02edc4b43ca069684d1; s_pers_2=om_mv3d%3Daff%3Aadid-%3Asourceid-imp_VxXQeI2%3AmxyLToXwUx0Mo36FUkEQqz31Q3GgXk0%3Awmls-imp_1924488%3Acn-%7C1615313155036%3B%20%2Bom_mv7d%3Daff%3Aadid-%3Asourceid-imp_VxXQeI2%3AmxyLToXwUx0Mo36FUkEWWxXRQ3GgXk0%3Awmls-imp_1924488%3Acn-%7C1613086068749%3B%20%2Bom_mv14d%3Daff%3Aadid-%3Asourceid-imp_VxXQeI2%3AmxyLToXwUx0Mo36FUkEWWxXRQ3GgXk0%3Awmls-imp_1924488%3Acn-%7C1613690868750%3B%20%2Bom_mv30d%3Daff%3Aadid-%3Asourceid-imp_VxXQeI2%3AmxyLToXwUx0Mo36FUkEWWxXRQ3GgXk0%3Awmls-imp_1924488%3Acn-%7C1615073268750%3B%20useVTC%3DY%7C1675592868%3B%20om_mv7d%3Daff%3Aadid-%3Asourceid-imp_VxXQeI2%3AmxyLToXwUx0Mo36FUkEQqz31Q3GgXk0%3Awmls-imp_1924488%3Acn-%7C1615658755038%3B%20om_mv14d%3Daff%3Aadid-%3Asourceid-imp_VxXQeI2%3AmxyLToXwUx0Mo36FUkEQqz31Q3GgXk0%3Awmls-imp_1924488%3Acn-%7C1616259955038%3B%20om_mv30d%3Daff%3Aadid-%3Asourceid-imp_VxXQeI2%3AmxyLToXwUx0Mo36FUkEQqz31Q3GgXk0%3Awmls-imp_1924488%3Acn-%7C1617642355039; TB_Latency_Tracker_100=1; TB_Navigation_Preload_01=1; TB_DC_Flap_Test=0; bstc=dxe-KY-iJekPvrSgPfMr9E; mobileweb=0; xpa=1wERM|4ZRB4|5KNdl|Aa-Hd|MPUoC|YBSwL|YkdjI|qnjoe; exp-ck=Aa-Hd1YBSwL1YkdjI1; TBV=7; ndcache=d; tb_sw_supported=true; TB_SFOU-100=1; TS01b0be75=01538efd7cd61f1ab4e85db00d95f8ed78144511e0a182df3adeef0d76de6a68cdf79cd2c1a404b8355b5c7224a30dd9c30c7c0789; _pxff_fp=1; _abck=gno0mhw5ztijphrbkwdy_2081; _px3=5d2d8821819d9e1c985f598773ef64e826c1bc0fc732111acc529ebafcc038ac:OW/qpGhg9NHmrwvjhJsfa7LWVRn97fVhyN1xEhHX1XTNl/WFSwtPPpgikx0zTJmptVJUHbtiV+XpeKwSSkJ5DQ==:1000:MyNgdD8yc/s+nY4KlZXyZcJJ9sceLGfoo8gxQ6UAkmZSWON1UjVB3EKdo5XRKSkv4VYwhv/tKAI0sBhkDwaK+pqywLwPWbIEe1kfQdo65pNJVfZPicmtpdBch3gUXaOOJ/5q12jjMwR7gBcgBpem3uAGNFtz2a6j7DnFfEbax0k=; wm_ul_plus=INACTIVE|1616354625834; auth=MTAyOTYyMDE4VVnAa98coI5vCDtaz2GQj4YtyhuWKpL0FIH%2BNnZx%2FE%2BAKHn9txmqJgSpcVkpjzA7PAVem60%2BnUnTxddR4S8ih%2FRyqQBJx6T21nW1%2F%2F44nha%2BBQa8pFCjDXTZimH4eycIhbDF%2FQb%2F7svx%2FzMXvAdAgatck8b%2FBW3%2BQ%2Fx7nwxHsXY1vF7gYQ0NXn7cIh1I%2BrEjWieGzAD8sQSlI4oipAcVzpgiHb%2FRG8cLNx2xEKMFqfJr5nrnRxVKC6fgvbHsB%2FDtxOmydVWfzgugLFM7o5d%2BqxoItdC5YjQEK%2FQ61IXFJkdy2ywnAbbKy0qpj5xQt6o2rhc2NGU5rdy4k0cv8MEJGChyWS6xq8lTgqUAgpxmXIRB1WykJ3eBSXE%2F5NHDxemz; rtoken=MDgyNTUyMDE4HMSXYX2sh43Q9nuPNBes3DkIkTpJt2LRud6Jxy2E7EO1di8wgVNN6BQcAE4LjmMqalRwdthiwi%2Bh%2Fdmb4uqZD6p7hAuHaNyGcLWmq2w0ig0jn8TzRwttBiBzaIocx%2F5fdWM5crYM%2B3idgyTB30vPyCJ37tYJovLE3GNGmeukXJEV%2FCJpvBk1jwr3gBi7Z1c%2BWh2Lb7lWEOoytZ0WI91pHqbGyJ5JjDs%2FuhqLEB%2FD1tfCCbSznXRRhb16gFbtHGQldtDXb%2BSBIM9%2FhMzmW%2BQ5P7fzrYTXl35uYDSuWZxGQjSfbQTjvrV1IAVTttnx2ig7PA2bEwSqv03VrQUyCXA%2BngI1m4KzTaNx2oZrpgvpIF0urLeJQebpfJoxB5fsElV72qDkm87I2E70i%2FzacIRTSg%3D%3D; SPID=f5e868ccc9b59d6489a317d5b6e410e1b05bab5786146ea6ef7be93eb8caf8cfa9651f98363ecfe775a5c49e90578a79wmart; CID=3aa7784c-c811-459b-bd4b-3a4506dfe25c; hasCID=1; customer=%7B%22firstName%22%3A%22Albert%22%2C%22lastNameInitial%22%3A%22H%22%2C%22rememberme%22%3Atrue%7D; type=REGISTERED; WMP=4; com.wm.reflector=\"reflectorid:0000000000000000000000@lastupd:1616268226189@firstcreate:1616267501903\"; next-day=1616360400|true|false|1616414400|1616268226; location-data=94087%3ASunnyvale%3ACA%3A%3A8%3A1|1x2%3B%3B3.78%2C2er%3B%3B3.83%2C1rc%3B%3B5.54%2C1mv%3B%3B8.35%2C37y%3B%3B9.16%2C46z%3B%3B9.54%2C4jg%3B%3B10.59%2C46q%3B%3B12.09%2C2b1%3B%3B12.23%2C2bz%3B%3B14.47||7|1|1xg2%3B16%3B0%3B0.83%2C1xlx%3B16%3B1%3B0.97%2C1ype%3B16%3B2%3B1.9%2C1y8p%3B16%3B5%3B3.94%2C1xua%3B16%3B6%3B4.69; akavpau_p8=1616268826~id=97906eb43eec8f092039a3822f922e8d; xpm=1%2B1616268226%2BQEQrq1HCqZQjaK6f2Hf1FY~3aa7784c-c811-459b-bd4b-3a4506dfe25c%2B0; _uetsid=1b4419a089b011eba8b8edcc0392c137; _uetvid=6a65ef007e4e11ebb922a32816f68ec1; _pxde=191d8413de39bda238851c6648f25581b89ed690e1637c776dc7eb0725d976d0:eyJ0aW1lc3RhbXAiOjE2MTYyNjgyMzAzMDQsImZfa2IiOjAsImlwY19pZCI6W119"
  },
  "referrer": "https://www.walmart.com/account/login?tid=0&returnUrl=%2Fip%2FPlayStation-5-Console%2F363472942",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
})
   .then(checkStatus)
   .then(res => res.text())
   .then(text => handleResponse(text, availCb, unavailCb, counter))
   .catch(error => { console.log('request failed', error); });
}

function handleResponse(text, availCb, unavailCb, counter) {
  var oos = text.indexOf("This item is <b>out of stock</b>.");
  var verifyIdentity = text.indexOf("Verify your identity");
  if (verifyIdentity >= -1) {
  	unavailCb([], URL, "Need to login to walmart.");
  	if (counter % 720 == 3) {
  		email.sendEmail("rocketegg@gmail.com", "", "Need to relogin to walmart @ " + Date.now() + " <br/>" + text);
  	}
    return;
  } 
  if (oos == -1) {
    found = true; // send email just once
    availCb(text, URL, 
      " *********************************\nAvailable at WALMART NOW!!!\n*********************************");
  }
  if (counter % 12 == 0) {
    unavailCb([], URL, "");
  }
  if (counter % 720 == 0) {
    found = false;
    unavailCb([], URL, "");
    email.sendEmail("rocketegg@gmail.com", "", "Checked " + counter + " times @ " + Date.now());
  }
}

//checkSite();

exports.CheckSite = checkSite;

