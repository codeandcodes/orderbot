// bestbuy.js

const fetch = require('node-fetch');
const email = require('./email')

const URL = "https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149";

var found = false;

function checkStatus(res) {
  if (res.ok) { // res.status >= 200 && res.status < 300
    return res;
  } else {
    console.log(res);
    throw Error(res.statusText);
  }
}

function checkBestBuy(availCb, unavailCb, counter, email) {
  fetch("https://www.bestbuy.com/button-state/api/v5/button-state?skus=6426149&conditions=&storeId=&destinationZipCode=&context=pdp&consolidated=false&source=buttonView&xboxAllAccess=false", {
    "headers": {
      "authority": "www.bestbuy.com",
      "accept": "application/json",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
      "x-client-id": "FRV",
      "x-request-id": "BROWSE",
      "cookie": "UID=11da0de8-f5ff-491a-8797-0afbb65702d3; pst2=685|N; physical_dma=807; customerZipCode=94085|N; ltc=%20; oid=840116229; vt=250fb815-79e9-11eb-b802-0248d085bd2f; bm_sz=17C31EEA29946DABF2454BD9D5B17C8F~YAAQ5zLFF3mu4bV3AQAA9Cen6QrI99GXcwgoZOz4I3L11cIIXq/q1X27/Brel7vmeb+rdcugJmLtENcwDaAkagQICQSNUi2nAQsj8J8YW3BEYZYE8OHMxxSntTL8V0vYuaGmFU1t+LaNHMiQ4EEZd5IW+0RHnPDjUsfVqbbzaoxa3P4RO1Gnp1GOVq7O8dkc4R+nnNIN9ZOpxrmgt2razcmeJicCvFsCiehWYxAyA91/ndvxeBevJe5zxtaht9LZfyCoRHXbn0wQIdfa/Dpr7iIrV8cNTuq/NBNSEaS2iKZquQ==; bby_rdp=l; bby_cbc_lb=p-browse-w; CTT=45e19043e3104e296119c760fad773a6; SID=772e58bc-9dda-42f3-a8cd-60aa106ac970; optimizelyEndUserId=oeu1614532782849r0.8471773976869503; dtCookie=-11$A4B1ML37LFTH9FNBA237TQMIP5LT5U2B; rxVisitor=1614532782904QIMQFPM8UM5BUALGCFS5ATU9NODG6P42; dtSa=-; dtLatC=70; rxvt=1614534582913|1614532782906; dtPC=-11$532782899_456h1vTBHKRDMVWAILKVTPUGLHRAICJFQQMNGH-0e1; _abck=88079246E19FEBC22E707B0F4953B646~-1~YAAQ5zLFF4uu4bV3AQAAIC6n6QVF4+q/FpEw7yeU+fcL6z0Jh+ATpd6QERG9c9kC2a29qLSxTwmSqp48SJ6DIeVRky+NG781Jkw0ZmS6e0/mwkuPFrwqb1tqBw3KzFL/J3Rp4iPDotv839ShiBhxOabKL5IA5Dm7ta4ZPq2SYuK3eZvEh7YiUGZeJCrboJjpbsbOCZWif+Jd4eY/KiGYpmZtudPlBoHfV/koMvuDU56NWNaaLYZByx3a0OwsqYRmDuJNGzq8gIkYLAqj8QNtANGWiAgxbPlfI/6rGxWs22GWRd0DnQM6mATSi8TnD4Oqv3D34PYkABMBCwZRxQmJZ9Umma1zTRxxb7zSIacQU8lp0wIW7AYIBDPmtnBwzmxQJi6c+q5yTyw66KWXWDeX3A/BczzOKPfoYl+l~-1~-1~-1; COM_TEST_FIX=2021-02-28T17%3A19%3A43.899Z"
    },
    "referrer": "https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
   .then(checkStatus)
   .then(res => res.json())
   .then(json => handleResponse(json, availCb, unavailCb, counter, email))
   .catch(error => { console.log('request failed', error); });
}

function handleResponse(res, availCb, unavailCb, counter, email) {
  var states = res.buttonStateResponseInfos.map(r => r.buttonState);
  if (states.length > 0 && states[0] != "SOLD_OUT" && found == false) {
    found = true; // send email just once
    availCb(states[0], URL, 
      " *********************************\nAvailable at Bestbuy NOW!!!\n*********************************");
  } 
  if (counter % 60 == 0) {
    unavailCb([], URL, "");
  }
  if (counter % 3600 == 0) {
    found = false;
    unavailCb([], URL, "");
    email.sendEmail(email, "", "Checked " + counter + " times @ " + Date.now());
  }
}

exports.CheckSite = checkBestBuy;

/*
curl 'https://www.bestbuy.com/button-state/api/v5/button-state?skus=6426149&conditions=&storeId=&destinationZipCode=&context=pdp&consolidated=false&source=buttonView&xboxAllAccess=false' \
  -H 'authority: www.bestbuy.com' \
  -H 'accept: application/json' \
  -H 'x-client-id: FRV' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36' \
  -H 'x-request-id: BROWSE' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149' \
  -H 'accept-language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7' \
  -H 'cookie: UID=11da0de8-f5ff-491a-8797-0afbb65702d3; pst2=685|N; physical_dma=807; customerZipCode=94085|N; ltc=%20; oid=840116229; vt=250fb815-79e9-11eb-b802-0248d085bd2f; bm_sz=17C31EEA29946DABF2454BD9D5B17C8F~YAAQ5zLFF3mu4bV3AQAA9Cen6QrI99GXcwgoZOz4I3L11cIIXq/q1X27/Brel7vmeb+rdcugJmLtENcwDaAkagQICQSNUi2nAQsj8J8YW3BEYZYE8OHMxxSntTL8V0vYuaGmFU1t+LaNHMiQ4EEZd5IW+0RHnPDjUsfVqbbzaoxa3P4RO1Gnp1GOVq7O8dkc4R+nnNIN9ZOpxrmgt2razcmeJicCvFsCiehWYxAyA91/ndvxeBevJe5zxtaht9LZfyCoRHXbn0wQIdfa/Dpr7iIrV8cNTuq/NBNSEaS2iKZquQ==; bby_rdp=l; bby_cbc_lb=p-browse-w; CTT=45e19043e3104e296119c760fad773a6; SID=772e58bc-9dda-42f3-a8cd-60aa106ac970; optimizelyEndUserId=oeu1614532782849r0.8471773976869503; dtCookie=-11$A4B1ML37LFTH9FNBA237TQMIP5LT5U2B; rxVisitor=1614532782904QIMQFPM8UM5BUALGCFS5ATU9NODG6P42; dtSa=-; dtLatC=70; rxvt=1614534582913|1614532782906; dtPC=-11$532782899_456h1vTBHKRDMVWAILKVTPUGLHRAICJFQQMNGH-0e1; _abck=88079246E19FEBC22E707B0F4953B646~-1~YAAQ5zLFF4uu4bV3AQAAIC6n6QVF4+q/FpEw7yeU+fcL6z0Jh+ATpd6QERG9c9kC2a29qLSxTwmSqp48SJ6DIeVRky+NG781Jkw0ZmS6e0/mwkuPFrwqb1tqBw3KzFL/J3Rp4iPDotv839ShiBhxOabKL5IA5Dm7ta4ZPq2SYuK3eZvEh7YiUGZeJCrboJjpbsbOCZWif+Jd4eY/KiGYpmZtudPlBoHfV/koMvuDU56NWNaaLYZByx3a0OwsqYRmDuJNGzq8gIkYLAqj8QNtANGWiAgxbPlfI/6rGxWs22GWRd0DnQM6mATSi8TnD4Oqv3D34PYkABMBCwZRxQmJZ9Umma1zTRxxb7zSIacQU8lp0wIW7AYIBDPmtnBwzmxQJi6c+q5yTyw66KWXWDeX3A/BczzOKPfoYl+l~-1~-1~-1; COM_TEST_FIX=2021-02-28T17%3A19%3A43.899Z' \
  --compressed
*/