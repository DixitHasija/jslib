var isABTestEnabled = true;
var promiseABVersion = "A";
var isInternational = 0;
var edd_displayed = "";
var edd_days = 0;
var isPromiseViewed = false;
var globalAuthToken = "";
var globalSellerDetails = "";
var globalCheckActiveDetails = "";
var trackingGAId = "G-XC7PYWS9EK";
var is_whitelabeling_enabled = false;
var hideSovaURLs = [
  "gut-microbiome-test",
  "guthealconsult",
  "fix-acidity-gutheal21",
  "gut-x-bloating",
  "gut-x-constipation",
  "gut-x-ibs",
  "sova-gutheal",
  "plug-the-flow-synbiotic-supplement-for-diarrhoea-ibs-relief",
  "one-swift-motion-supplement-for-constipation-relief",
  "metabolic-fuel-synbiotic-supplement",
  "fat-loss-support",
];
var widgetTypeMap = {
  edd: "promise-product-page",
  promise_feature: "promise-company-features",
};
var badge_list = {
  1: {
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-1.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-1-dark.svg",
    key: "delivery_guaranteed",
    text: "Delivery Guaranteed",
  },
  2: {
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-2.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-2-dark.svg",
    key: "secure_transactions",
    text: "Secure Transaction",
  },
  5: {
    key: "easy_order_tracking",
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-4.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-4-dark.svg",
    text: "Easy Order Tracking",
  },
  3: {
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-5.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-5-dark.svg",
    key: "five_star",
    text: "5 Star Rated",
  },
  4: {
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-3.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-3-dark.svg",
    key: "refund_return",
    text: "Easy {{X}} Days Return",
  },
  6: {
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-6.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-6-dark.svg",
    key: "india_first",
    text: "India's First {{Y}}",
  },
  7: {
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-7.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-7-dark.svg",
    key: "india_first",
    text: "X Year warranty",
  },
  8: {
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-8.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-8-dark.svg",
    key: "india_first",
    text: "Pay on Delivery",
  },
  9: {
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-10.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-10-dark.svg",
    key: "india_first",
    text: "Free Delivery",
  },
  10: {
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-9.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-9-dark.svg",
    key: "india_first",
    text: "Installation available on request",
  },
  11: {
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-11.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-11-dark.svg",
    key: "india_first",
    text: "Eco friendly product",
  },
  12: {
    icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-12.svg",
    dark_icon: "https://sr-cdn.shiprocket.in/sr-promise/images/feature-12-dark.svg",
    key: "india_first",
    text: "Best selling product",
  },
};

function getSellerDetailsFromScript() {
  return document.currentScript.src
    .split("?")[1]
    .split("&")
    .reduce(
      (obj, pair) => ((obj[pair.split("=")[0]] = pair.split("=")[1]), obj),
      {}
    );
}

var sellerDetails = getSellerDetailsFromScript();
var sellerEmail = sellerDetails["uuid"];
var isPreviewRequest = sellerDetails["preview"] == 1;

const promisePopUpContent = {
  delivery_guaranteed: {
    title: "Delivery Guaranteed",
    content: `We deliver most of our orders within the promised delivery days. In some cases, it can take more time than usual. Please sign up on <a href='http://my.shiprocket.in/' style='color: blue;text-decoration: underline;font-size: 14px;font-weight: 400;'>myShiprocket App</a> to track the order.`,
  },
  secure_transactions: {
    title: "Secure Transactions",
    content: "Shiprocket approved safe and secure payment guaranteed.",
  },
  refund_return: {
    title: "{{X}} Days Easy Return & Refund",
    content:
      "Return/Exchange request for refunds are accepted only for unused products which have defects or in case of damages during delivery, missing or wrong product delivered. Return/Exchange request can be placed within {{X}} days of delivery from <a href='http://my.shiprocket.in/' style='color: blue;text-decoration: underline;font-size: 14px;font-weight: 400;'>myShiprocket App</a>",
  },
  easy_order_tracking: {
    title: "Easy Order Tracking",
    content:
      "You will receive a real time Whatsapp message on every order movement. You can also track your order from <a href='http://my.shiprocket.in/' style='color: blue;text-decoration: underline;font-size: 14px;font-weight: 400;'>myShiprocket App</a>",
  },
  default: {
    title: "Shiprocket Verified Seller",
    content: `<div class="promise-flexbox" style="margin: 21px 0px;"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/tick-pointer.png" style="height: 15px;
    margin-right: 12px;width: auto;"/> <div>{{happy_customers}} Happy Customers.</div></div>
   <div class="promise-flexbox" style="margin: 21px 0px;"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/tick-pointer.png" style="height: 15px;width: auto;
    margin-right: 12px;"/> <div>{{successful_shipments}} Successful Shipments.</div></div>
   <div class="promise-flexbox" style="margin: 21px 0px;"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/tick-pointer.png" style="height: 15px;width: auto;
    margin-right: 12px;"/> <div>{{years}} Years of Expertise.</div></div>`,
  },
  five_star: {
    title: "Shiprocket Verified Seller",
    content: `Join the ranks of delighted customers who have experienced the best with this exceptional product.`,
  },
};

function initializePromiseABVersion() {
  if (localStorage.getItem("_p_version_theme__")) {
    promiseABVersion = localStorage.getItem("_p_version_theme__");
  } else {
    let randomValue =
      isABTestEnabled === false ? 1 : Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (randomValue == 1) {
      promiseABVersion = "A";
      localStorage.setItem("_p_version_theme__", "A");
    } else {
      promiseABVersion = "B";
      localStorage.setItem("_p_version_theme__", "B");
    }
  }
}

initializePromiseABVersion();

function setLocalStorageItem(key, value) {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

var promiseApiUrl = "https://promise.shiprocket.in";

async function getPromiseClarityId() {
  const authToken = await getAuthToken();
  globalAuthToken = authToken;
  const sellerDetails = await getSellerDetails(authToken);
  globalSellerDetails = sellerDetails;
  const clarityId = sellerDetails?.promise_company_stats?.clarity_id;
  return clarityId;
}

async function getAuthToken() {
  return globalAuthToken
    ? globalAuthToken
    : localStorage.getItem("_p_token") &&
      new Date().getTime() <
        JSON.parse(localStorage.getItem("_p_token"))?.expirationTime
    ? JSON.parse(localStorage.getItem("_p_token"))?.value
    : await getSellerAuthToken(sellerEmail);
}

async function getSellerDetails(authToken) {
  return globalSellerDetails
    ? globalSellerDetails
    : localStorage.getItem("_p_buzz_info") &&
      new Date().getTime() <
        JSON.parse(localStorage.getItem("_p_buzz_info"))?.expirationTime
    ? JSON.parse(localStorage.getItem("_p_buzz_info"))?.value
    : await fetchSellerDetails(authToken);
}

async function fetchSellerDetails(token) {
  const response = await makeAPIRequest(
    `${promiseApiUrl}/api/v1/shopify/seller/stats`,
    token,
    "GET",
    ""
  );
  const sellerDetails = response;
  if (sellerDetails?.data[0]) {
    const sellerData = {
      value: sellerDetails?.data[0],
      expirationTime: new Date().getTime() + 86400000,
    };
    await setLocalStorageItem("_p_buzz_info", JSON.stringify(sellerData));
  }
  return sellerDetails?.data[0];
}

async function makeAPIRequest(url, token, method, body) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      ...(body && { body }),
    });
    const data = await response.json();
    if (data?.errors[0]?.message === "Token Signature could not be verified.") {
      const newToken = await getSellerAuthToken(sellerEmail);
      return makeAPIRequest(url, newToken, method, body);
    }
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getSellerAuthToken(email) {
  const data = {
    uuid: email,
  };
  try {
    const response = await fetch(
      `${promiseApiUrl}/api/v1/shopify/seller/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const authData = await response.json();
    if (authData?.data[0]?.token) {
      const authDetails = {
        value: authData?.data[0]?.token,
        expirationTime: new Date().getTime() + 86400000,
      };
      await setLocalStorageItem("_p_token", JSON.stringify(authDetails));
    }

    return authData?.data[0]?.token;
  } catch (e) {
    return undefined;
  }
}

function getPromiseNumberOfDays(d_date) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const inputDate = new Date(d_date);
  const timeDifferenceMs = inputDate - currentDate;
  const daysLeft = Math.ceil(timeDifferenceMs / (1000 * 60 * 60 * 24));
  return daysLeft;
}

function getDateFourDaysLater() {
  const today = new Date();
  const futureDate = new Date(today.setDate(today.getDate() + 4));
  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = futureDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

async function getServicibilityDetails(authToken, buyerPincode, is_manual) {
  let data = {};
  try {
    data = {
      delivery_postcode: buyerPincode,
      cod: "0",
      weight: "0.1",
      sku: ShopifyAnalytics.meta.product.variants[0].sku || "",
      product_id: ShopifyAnalytics.meta.product.id.toString() || "",
      session_id: getCookie("_shopify_s") || "",
      atc_token: decodeURIComponent(getCookie("cart"))?.split("?key=")[0] || "",
      company_id: document.getElementById("zopcompanyId")?.innerText || undefined,
    };
  } catch (e) {
    data = {
      delivery_postcode: buyerPincode,
      cod: "0",
      weight: "0.1",
      company_id: document.getElementById("zopcompanyId")?.innerText || undefined,
    };
  }
  const apiloadTime = is_manual ? 25000 : 2000;
  const response = await Promise.race([
    makeAPIRequest(
      `${promiseApiUrl}/api/v1/shopify/seller/serviceability`,
      authToken,
      "POST",
      JSON.stringify(data)
    ),
    new Promise((resolve) => setTimeout(() => resolve("404"), apiloadTime)),
  ]);
  if (response === "404") {
    const responseData = {
      data: [
        {
          data: {
            available_courier_companies: [
              {
                cod: 0,
                etd: getDateFourDaysLater(),
              },
            ],
          },
          postcode_info: { city: "" },
        },
      ],
    };
    return responseData;
  } else {
    return response;
  }
}

async function getPromiseSystemIP() {
  const response = await Promise.race([
    fetch("https://pro.ip-api.com/json/?key=I1yEhXr3bbNUGGA"),
    new Promise((resolve) => setTimeout(() => resolve("404"), 3000)),
  ]);
  if (response === "404") {
    return false;
  } else {
    const ipInfo = await response.json();
    if (ipInfo.query === "14.194.36.134") ipInfo.zip = "122008";
    if (ipInfo.countryCode && ipInfo.countryCode != "IN") {
      isInternational = 1;
      ipInfo.zip = "122008";
    }
    return ipInfo;
  }
}

function removePromiseWidgets() {
  if (document.querySelectorAll(".promise-product-page")) {
    const orderDetails = document.querySelectorAll(".promise-product-page");
    orderDetails.forEach((image) => {
      image.innerHTML = "";
    });
  }
  if (document.getElementById("promise-head-banner"))
    document.getElementById("promise-head-banner").innerHTML = "";
}

function renderHeadJSCode() {
  const headJsCode = `<div class="promise-custom-header" >
  <img src="${promiseImgUrl}sr-promise.png" style="height:24px;vertical-align: baseline;width: auto;" height="24" />
  <div style="font-size:11px; color: #2C1566;margin: 0px 11px; line-height: 13px;"> <img src="${promiseImgUrl}five-star.png" style="height:10px;width: auto;vertical-align: baseline;"height="10"/><div>Complete Purchase Protection</div></div>
  <div onclick="openPromisePopup('banner')" style="font-size:12px; display: flex;margin-top: 7px;    cursor: pointer;"><div style="padding-bottom: 0px; color:#2C1566;
    border-bottom: 1px dashed #2C1566; white-space: nowrap;">Know more</div><img src="${promiseImgUrl}know-more.png" style="height: 12px;width: auto;vertical-align: baseline;
    margin-left: 4px; margin-top:2px"/> </div>
    </div> `;
  if (document.getElementById("promise-head-banner") && promiseABVersion != "C")
    document.getElementById("promise-head-banner").innerHTML = headJsCode;
}

function applyStylesBasedOnWidth() {
  const myDiv = document.getElementById("promise-tag-box");
  if (myDiv) {
    const divWidth = myDiv.offsetWidth;
    const myClasses = document.getElementsByClassName("pro-tag-box-small");
    const myTextClasses = document.getElementsByClassName("pro-features-text");
    if (divWidth > 480) {
      for (let i = 0; i < myClasses.length; i++) {
        myClasses[i].classList.add("promise-width-large");
        myTextClasses[i].classList.add("mg-10-px");
      }
    } else {
      for (let i = 0; i < myClasses.length; i++) {
        myClasses[i].classList.remove("promise-width-large");
        myTextClasses[i].classList.remove("mg-10-px");
      }
    }
  }
}

function moveToPromiseEDD() {
  callGAEvent("Clicked on Check EDD Sticky Icon", {});
  var element = document.getElementById("PromiseEddSection");
  var offset =
    window.innerHeight / 2 - element.getBoundingClientRect().height / 2;
  element.scrollIntoView({ behavior: "smooth", block: "center" });
}

function scrollBadges() {
  document.getElementById("promise-badges-scroll").scrollLeft += 320;
}

function renderPromisePageWithShimmer() {
  if (promiseABVersion === "A") {
    const PDPjsCode = `  <div class="promise-pdp-page" id="PromiseEddSection" style="    font-family: Arial, Helvetica, sans-serif !important;
  letter-spacing: 0px;
  line-height: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-transform: none;
  background: transparent;
  font-weight: 400;
  text-align: initial;color: #313652;">
          <hr style="border: 1px solid #f7f7f7; margin: 0px;" />
          <div id="sr-icon">
          <div class="shine shimmer-lines"></div>
          </div>
          <div id="delivery-msg">
          <div class="shine shimmer-lines"></div>
          </div>
          <div id="enter-pincode" style="font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"].font} !important">
          <div class="shine shimmer-lines"></div>
          </div>
          <hr style="border: 1px solid #f7f7f7; margin: 0px;margin-top:15px" />
      </div>`;
    let companyFeature = ``;
    for (
      let i = 0;
      i < globalCheckActiveDetails?.data?.[0]?.seller_badges?.length;
      i++
    ) {
      companyFeature += `<div class="promise-trust-center-align" style="width:80px;" onclick="openPromisePopup('${
        badge_list[
          globalCheckActiveDetails?.data?.[0]?.seller_badges[
            i
          ]?.badge_id?.toString()
        ].key
      }')">
     <div class="shine img-shimmer-box">
      <img src="${
        badge_list[
          globalCheckActiveDetails?.data?.[0]?.seller_badges[
            i
          ]?.badge_id?.toString()
        ].icon
      }" style="height: 34px;width: auto;cursor: pointer;    display: inline;width: 34px; background:white" />
      </div> 
      <div style="font-size: ${globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"]?.["font-size"]=="default"?"10px":globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"]?.["font-size"]=="sm"?"9px":globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"]?.["font-size"]=="md"?"11px":"12px"};
  line-height: 12px;
  margin-top: 6px;max-width: 75px;cursor: pointer;text-align: center;">${
    badge_list[
      globalCheckActiveDetails?.data?.[0]?.seller_badges[
        i
      ]?.badge_id?.toString()
    ].text
  }</div>
  </div>`;
    }
    let companyFeaturesJsCode =
      `<div  class="promise-flexbox" style="align-items: baseline;"> <div id="promise-badges-scroll" style="overflow-x: scroll;
      width: 320px;scroll-behavior: smooth;"><div class="promise-flexbox promise-space-between" style="font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"].font}, Helvetica, sans-serif !important;
  letter-spacing: 0px;
  line-height: 16px;
  margin-top: 10px;
  margin-bottom: 30px;
  text-transform: none;
  background: transparent;
  font-weight: 400;
  text-align: initial;
  width:${globalCheckActiveDetails?.data?.[0]?.seller_badges?.length*80}px;
  color: ${globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"].color=="default"?"#5968BE":globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"].color};">` +
      companyFeature +
      `</div></div>` + (globalCheckActiveDetails?.data?.[0]?.seller_badges?.length > 4 ? `<div onclick="scrollBadges()" style="width:6px;height:10px;cursor:pointer;    margin-left: 20px;"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/scrollLeft.svg" style="height:100%;width:100%;"/></div></div>`:`</div>`);
    companyFeaturesJsCode = companyFeaturesJsCode.replace(
      "{{X}}",
      globalCheckActiveDetails?.data?.[0]?.extra_settings?.return_days
    );
    let badge6Text = globalCheckActiveDetails?.data?.[0]?.seller_badges?.filter(
      (item) => item.badge_id === 6
    )[0]?.customization?.icon_text;
    companyFeaturesJsCode = companyFeaturesJsCode.replace("{{Y}}", badge6Text);
    if (
      document.querySelectorAll(".promise-product-page") &&
      promiseABVersion != "C"
    ) {
      const orderDetails = document.querySelectorAll(".promise-product-page");
      orderDetails.forEach((image) => {
        image.innerHTML = PDPjsCode;
      });
    }
    if (
      document.querySelectorAll(".promise-company-features") &&
      promiseABVersion != "C" && globalCheckActiveDetails?.data?.[0]?.extra_settings?.show_badges == 1
    ) {
      const orderDetails = document.querySelectorAll(
        ".promise-company-features"
      );
      orderDetails.forEach((image) => {
        image.innerHTML = companyFeaturesJsCode;
      });
    }
  } else {
    const PDPjsCode = `  <div class="promise-pdp-page" id="PromiseEddSection" style="    font-family: Arial, Helvetica, sans-serif !important;
  letter-spacing: 0px;
  line-height: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-transform: none;
  background: transparent;
  font-weight: 400;
  text-align: initial;color: #313652;">
          <hr style="border: 1px solid #f7f7f7; margin: 0px;" />
          <div id="sr-icon">
          <div class="shine shimmer-lines"></div>
          </div>
          <div id="delivery-msg">
          <div class="shine shimmer-lines"></div>
          </div>
          <div id="enter-pincode" style="font-family : ${globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"].font} !important">
          <div class="shine shimmer-lines"></div>
          </div>
          <hr style="border: 1px solid #f7f7f7; margin: 0px;margin-top:15px" />
      </div>`;
    let companyFeature = ``;
    for (
      let i = 0;
      i < globalCheckActiveDetails?.data?.[0]?.seller_badges?.length;
      i++
    ) {
      companyFeature += `<div class="promise-trust-center-align" style="width:80px;" onclick="openPromisePopup('${
        badge_list[
          globalCheckActiveDetails?.data?.[0]?.seller_badges[
            i
          ]?.badge_id?.toString()
        ].key
      }')">
      <div class="shine img-shimmer-box">
      <img src="${
        badge_list[
          globalCheckActiveDetails?.data?.[0]?.seller_badges[
            i
          ]?.badge_id?.toString()
        ].dark_icon
      }" style="height: 34px;width: auto;cursor: pointer;    display: inline;width: 34px; background:black" />
      </div>
      <div style="font-size: ${globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"]?.["font-size"]=="default"?"10px":globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"]?.["font-size"]=="sm"?"9px":globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"]?.["font-size"]=="md"?"11px":"12px"};
  line-height: 12px;
  margin-top: 6px;max-width: 75px;cursor: pointer;text-align: center;">${
    badge_list[
      globalCheckActiveDetails?.data?.[0]?.seller_badges[
        i
      ]?.badge_id?.toString()
    ].text
  }</div>
  </div>`;
    }
    let companyFeaturesJsCode =
      ` <div  class="promise-flexbox" style="align-items: baseline;"> <div id="promise-badges-scroll" style="overflow-x: scroll;
        width: 320px;scroll-behavior: smooth;"><div class="promise-flexbox promise-space-between" style="font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"].font}, Helvetica, sans-serif !important;
  letter-spacing: 0px;
  line-height: 16px;
  margin-top: 10px;
  margin-bottom: 30px;
  text-transform: none;
  background: transparent;
  font-weight: 400;
  text-align: initial;
  width:${globalCheckActiveDetails?.data?.[0]?.seller_badges?.length*80}px;
  color: ${globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"].color=="default"?"#5968BE":globalCheckActiveDetails?.data?.[0]?.extra_info?.["icon-text"].color};">` +
        companyFeature +
        `</div></div>` + (globalCheckActiveDetails?.data?.[0]?.seller_badges?.length > 4 ? `<div onclick="scrollBadges()" style="width:6px;height:10px;cursor:pointer;    margin-left: 20px;"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/scrollLeft.svg" style="height:100%;width:100%;"/></div></div>`:`</div>`);
    companyFeaturesJsCode = companyFeaturesJsCode.replace(
      "{{X}}",
      globalCheckActiveDetails?.data?.[0]?.extra_settings?.return_days
    );
    let badge6Text = globalCheckActiveDetails?.data?.[0]?.seller_badges?.filter(
      (item) => item.badge_id === 6
    )[0]?.customization?.icon_text;
    companyFeaturesJsCode = companyFeaturesJsCode.replace("{{Y}}", badge6Text);
    if (
      document.querySelectorAll(".promise-product-page") &&
      promiseABVersion != "C"
    ) {
      const orderDetails = document.querySelectorAll(".promise-product-page");
      orderDetails.forEach((image) => {
        image.innerHTML = PDPjsCode;
      });
    }
    if (
      document.querySelectorAll(".promise-company-features") &&
      promiseABVersion != "C" && globalCheckActiveDetails?.data?.[0]?.extra_settings?.show_badges == 1
    ) {
      const orderDetails = document.querySelectorAll(
        ".promise-company-features"
      );
      orderDetails.forEach((image) => {
        image.innerHTML = companyFeaturesJsCode;
      });
    }
  }
}

function renderPromiseSellerDetails() {
  let constStatsHtml = ``;
  let companyStats = [
    {
      bold_text: "Many Years",
      normal_text: "of Expertise",
    },
    {
      bold_text: "Huge Happy",
      normal_text: "Customers",
    },
    {
      bold_text: "Lacs of Successful",
      normal_text: "Shipments",
    },
  ];
  for (let i = 0; i < companyStats.length; i++) {
    const html = ` <div style=" border: 1px solid #DFF0F5; border-radius:10px; width: 200px; height: 50px;    margin-right: 15px; padding: 5px 30px;
      white-space: nowrap;
      text-align: center;padding-top: 10px;">
              <div style="font-size: 14px;
color: #2C1566;
line-height: 16px;
font-weight: 600;">${companyStats[i].bold_text}</div>
              <div style="font-size: 12px ; color: #3B3B3B;
              line-height: 14px;">${companyStats[i].normal_text}</div>
          </div>`;
    constStatsHtml += html;
  }
  const sellerDetailsHTML = ` <div style="margin:0 2.5%;font-size: 16px;line-height: 18px; color:#2C1566">Why Shop from <span style="font-weight: 600;">${globalCheckActiveDetails?.data?.[0]?.info?.brand_name}</span>
      </div>
      <div class="promise-flexbox" style="margin:
    0 2.5%;    margin-right: 0px;">
          <img src="${promiseImgUrl}trusted.png" height="64px" style="margin: 10px 0px; height:64px;width: auto;vertical-align: baseline;" />
          <div style="height: 60px;
      overflow-x: scroll;
      margin: 17px;margin-right: 0px; margin-bottom:10px;" class="promise-x-scroll promise-flexbox">${constStatsHtml}
             
          </div>
      </div>`;
  if (
    document.getElementById("promise-seller-details") &&
    promiseABVersion != "C"
  )
    document.getElementById("promise-seller-details").innerHTML =
      sellerDetailsHTML;

  let constFeatureHtml = ``;
  let companyFeatures = [
    {
      bold: "Money back",
      normal: "guarantee",
      icon: "https://kr-shipmultichannel-mum.s3.ap-south-1.amazonaws.com/promise/static/money-back.png",
    },
    {
      bold: "Fraud-free",
      normal: "Payments",
      icon: "https://kr-shipmultichannel-mum.s3.ap-south-1.amazonaws.com/promise/static/fraud.png",
    },
    {
      bold:
        globalCheckActiveDetails?.data?.[0]?.settings?.return?.max_days != "0"
          ? globalCheckActiveDetails?.data?.[0]?.settings?.return?.max_days +
            " Days"
          : "No",
      normal: "Return & Refund",
      icon:
        globalCheckActiveDetails?.data?.[0]?.settings?.return?.max_days != "0"
          ? "https://kr-shipmultichannel-mum.s3.ap-south-1.amazonaws.com/promise/static/return.png"
          : "https://kr-shipmultichannel-mum.s3.ap-south-1.amazonaws.com/promise/static/no-return.png",
    },
  ];
  for (let i = 0; i < companyFeatures.length; i++) {
    const html = ` <div style="width:30%;     margin-left: 2.5%;" class="pro-tag-box-small   ">
      <img style="height:22px;width: auto;vertical-align: baseline;" src="${companyFeatures[i].icon}" height="22" />
      <div  class="pro-tag-text pro-features-text"><span
              style="font-weight: 600;">${companyFeatures[i].bold}</span> ${companyFeatures[i].normal}</div>
  </div>`;
    constFeatureHtml += html;
  }
  if (
    document.getElementById("promise-company-features") &&
    promiseABVersion != "C"
  )
    document.getElementById("promise-company-features").innerHTML =
      constFeatureHtml;

  applyStylesBasedOnWidth();
}

function renderOnlyServicableData(servicibilityDetails, buyerPincode) {
  if (promiseABVersion === "A") {
    document.getElementById(
      "enter-pincode"
    ).innerHTML = ` <div class="promise-flexbox" style="color:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"].color === "default"?"#5968BE":globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"].color};margin-top:13px;margin-bottom: 13px;"><img
  src="https://sr-cdn.shiprocket.in/sr-promise/images/location.png" style="height: 14px;width: auto;
  margin-top: 1px;    margin-left: 8px;
  " />
  <div style="font-size:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"]?.["font-size"]==="default"?"13px":globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"]?.["font-size"]==="sm"?"12px":globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"]?.["font-size"]==="md"?"14px":"15px"};margin-left: 6px;font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"].font} !important ">Deliver to ${ 
    servicibilityDetails?.data[0]?.postcode_info?.city ? 
    servicibilityDetails?.data[0]?.postcode_info?.city.charAt(0).toUpperCase() +
    servicibilityDetails?.data[0]?.postcode_info?.city.slice(1) + " - " : ""
  }${buyerPincode}</div><img src="https://sr-cdn.shiprocket.in/sr-promise/images/edit-icon.png" style="height: 13px;
  margin-left: 6px;
  margin-top: 1px;cursor: pointer;width: auto;" onclick="editPromisePincode()" />
  </div>`;
    callGAEvent("EDD displayed", {
      delivery_pincode: buyerPincode,
      edd_presented:
        servicibilityDetails?.data[0]?.courier_response?.promise_edd,
    });
    document.getElementById(
      "delivery-msg"
    ).innerHTML = ` <div class="promise-flexbox" style="margin-top:13px"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/box-icon.png" style="
  height: 14px;
  margin-top: 1px;
  margin-right: 5px;
  width: auto;
  " />
  <div class="promise-theme2-text" style="color:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].color=="default"?"black":globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].color};font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].font} !important">Get it by <span style="font-weight:600;float:inherit;font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].font} !important">${getDayOfWeek(
    servicibilityDetails?.data[0]?.courier_response?.promise_edd
  )},
      ${
        servicibilityDetails?.data[0]?.courier_response?.promise_edd
      }</span>${is_whitelabeling_enabled? "" : "with"} </div>${is_whitelabeling_enabled ?"": '<div class="promise-flexbox" style="cursor: pointer;" onclick="openPromisePopup("default")" ><div class="circle-container"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/with-bg.svg" style="margin: 2px;height: 16px;margin-top: 0px;width: auto;"><div class="circle-animation"></div></div><img src="https://sr-cdn.shiprocket.in/sr-promise/images/sr-text.svg" style="height: 9px;margin-top: 5px;margin-left: 2px;width: auto;"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/info.png" style="height: 9px;margin-top: 5px;margin-left: 4px;width: auto;"></div>'}
  </div>`;
    document.getElementById("sr-icon").innerHTML = null;
  } else {
    document.getElementById(
      "enter-pincode"
    ).innerHTML = ` <div class="promise-flexbox" style="color:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"].color === "default"?"#5968BE":globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"].color};margin-top:13px;margin-bottom: 13px;"><img
  src="https://sr-cdn.shiprocket.in/sr-promise/images/location.png" style="height: 14px;width: auto;
  margin-top: 1px;    margin-left: 8px;
  " />
  <div style="font-size:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"]?.["font-size"]==="default"?"13px":globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"]?.["font-size"]==="sm"?"12px":globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"]?.["font-size"]==="md"?"14px":"15px"};margin-left: 6px;font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"].font} !important ">Deliver to ${ 
    servicibilityDetails?.data[0]?.postcode_info?.city ? 
    servicibilityDetails?.data[0]?.postcode_info?.city.charAt(0).toUpperCase() +
    servicibilityDetails?.data[0]?.postcode_info?.city.slice(1) + " - " : ""
  }${buyerPincode}</div><img src="https://sr-cdn.shiprocket.in/sr-promise/images/edit-icon.png" style="height: 13px;
  margin-left: 6px;
  margin-top: 1px;cursor: pointer;width: auto;" onclick="editPromisePincode()" />
  </div>`;
    callGAEvent("EDD displayed", {
      delivery_pincode: buyerPincode,
      edd_presented:
        servicibilityDetails?.data[0]?.courier_response?.promise_edd,
    });
    document.getElementById(
      "delivery-msg"
    ).innerHTML = ` <div class="promise-flexbox" style="margin-top:13px"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/box-icon.png" style="
  height: 14px;
  margin-top: 1px;
  margin-right: 5px;
  width: auto;
  " />
  <div class="promise-theme2-text" style="color:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].color=="default"?"white":globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].color};font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].font} !important">Get it by <span style="font-weight:600;float:inherit;font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].font} !important">${getDayOfWeek(
    servicibilityDetails?.data[0]?.courier_response?.promise_edd
  )},
      
 
      ${
        servicibilityDetails?.data[0]?.courier_response?.promise_edd
      }</span> ${is_whitelabeling_enabled ? "" : "with"} </div>${is_whitelabeling_enabled ? "" : '<div class="promise-flexbox"  style="cursor: pointer;" onclick="openPromisePopup("default")"><div class="circle-container"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/with-bg.svg" style="margin: 2px;height: 16px;margin-top: 0px; width: auto;"><div class="circle-animation"></div></div><img src="https://sr-cdn.shiprocket.in/sr-promise/images/sr-text.svg" style="height: 9px;margin-top: 5px;margin-left: 2px; width: auto;"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/info.png" style="height: 9px;margin-top: 5px;margin-left: 4px; width: auto;"></div>'}
    </div>`;
    document.getElementById("sr-icon").innerHTML = null;
  }
}

async function checkPromiseActiveStatus(token) {
  localStorage.removeItem("_p_active_status_");
  let showInPreview = isPreviewRequest && Shopify?.designMode === true;
  const promiseActiveData = await makeAPIRequest(
    `${promiseApiUrl}/api/v1/shopify/seller/details/view?is_preview=${showInPreview ? "1" : "0"}&purge_key=1`,
    token,
    "GET",
    ""
  );
  if (promiseActiveData?.data[0]?.promise_status || showInPreview) {
    let isBillingActive = promiseActiveData?.data[0]?.subscription_status !== 3 && promiseActiveData?.data[0]?.subscription_status !== 0;
    const promiseData = {
      status: true,
      details: promiseActiveData,
      expirationTime: new Date().getTime() + 900000,
    };
    globalCheckActiveDetails = promiseActiveData;
    is_whitelabeling_enabled = !!promiseActiveData?.data[0]?.extra_settings?.white_label_onboarding;
    promiseABVersion = globalCheckActiveDetails?.data?.[0]?.extra_settings?.widget_theme === "light" ? "A" : "B";
    localStorage.setItem("_p_version_theme__", promiseABVersion);
    localStorage.setItem("_p_active_status_", JSON.stringify(promiseData));
    return showInPreview ? true : isBillingActive ? promiseActiveData?.data[0]?.promise_status : false;
  } else {
    return showInPreview;
  }
}

async function promiseDOMContentLoaded() {
  async function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      document.head.appendChild(script);
    });
  }

  try {
    await loadScript("https://sr-cdn.shiprocket.in/sr-promise/static/uc.js");
    console.log("uc.js has been loaded and executed");
    if (/^\/(?:products|collections\/[^/]+\/products)\/[^/]+/.test(window.location.pathname)) {
      callUCEvent("pdp_view", {
        name: String(ShopifyAnalytics?.meta?.product?.variants[0]?.name),
        mrp: String(ShopifyAnalytics.meta.product.variants[0].price / 100),
        selling_price: String(ShopifyAnalytics.meta.product.variants[0].price / 100),
        product_id: String(ShopifyAnalytics?.meta?.product?.id),
        variant_id: String(ShopifyAnalytics?.meta?.product?.variants[0]?.id),
        qty: String(ShopifyAnalytics?.meta?.product?.variants[0]?.quantity),
        category: "",
        out_of_stock: "0",
        image: "",
        description: "",
        referrer: "",
      });
    }
  } catch (error) {
    console.error(error);
  }

  let isBlockPresent = checkPromiseExtensionPresent();
  if (isBlockPresent) {
    try {
      const tempAuth = JSON.parse(localStorage.getItem("_p_token"));
    } catch {
      localStorage.removeItem("_p_token");
    }
    const authToken = await getAuthToken();
    const isPromiseActive = await checkPromiseActiveStatus(authToken);
    if (isPromiseActive) {
      handleSessionAndAtcData(authToken);
      addPromiseTagsOnSellerPage();
      renderHeadJSCode();
      renderPromisePageWithShimmer();
      if (authToken) {
        const buyerPincode = localStorage.getItem("_p_pcode");
        if (buyerPincode) {
          const servicibilityDetails = await getServicibilityDetails(authToken, buyerPincode, false);
          if (servicibilityDetails?.data[0]?.courier_response?.promise_edd && servicibilityDetails?.data[0]?.courier_response?.promise_edd !== "NA") {
            edd_days = getPromiseNumberOfDays(servicibilityDetails?.data[0]?.courier_response?.promise_edd);
            edd_displayed = getDayOfWeek(servicibilityDetails?.data[0]?.courier_response?.promise_edd) + ", " + servicibilityDetails?.data[0]?.courier_response?.promise_edd;
            renderOnlyServicableData(servicibilityDetails, buyerPincode);
            localStorage.setItem("_p_edd", getDayOfWeek(servicibilityDetails?.data[0]?.courier_response?.promise_edd) + ", " + servicibilityDetails?.data[0]?.courier_response?.promise_edd);
          } else {
            renderOnlyCheckServiceData();
          }
        } else if (!buyerPincode) {
          const systemIPAddress = await getPromiseSystemIP();
          if (systemIPAddress?.query) {
            if (systemIPAddress?.zip) {
              localStorage.setItem("_p_pcode", systemIPAddress?.zip);
              const servicibilityDetails = await getServicibilityDetails(authToken, systemIPAddress?.zip, false);
              if (servicibilityDetails?.data[0]?.courier_response?.promise_edd && servicibilityDetails?.data[0]?.courier_response?.promise_edd !== "NA") {
                edd_days = getPromiseNumberOfDays(servicibilityDetails?.data[0]?.courier_response?.promise_edd);
                edd_displayed = getDayOfWeek(servicibilityDetails?.data[0]?.courier_response?.promise_edd) + ", " + servicibilityDetails?.data[0]?.courier_response?.promise_edd;
                renderOnlyServicableData(servicibilityDetails, systemIPAddress?.zip);
                localStorage.setItem("_p_edd", getDayOfWeek(servicibilityDetails?.data[0]?.courier_response?.promise_edd) + ", " + servicibilityDetails?.data[0]?.courier_response?.promise_edd);
              } else {
                renderOnlyCheckServiceData();
              }
            }
          } else {
            renderOnlyCheckServiceData();
          }
        }
        if (/^\/(?:products|collections\/[^/]+\/products)\/[^/]+/.test(window.location.pathname)) {
          callGAEvent("PDP loaded", {});
          if (isABTestEnabled === true) {
            if (promiseABVersion === "A") {
              callGAEvent("PDP loaded with A", {});
            } else if (promiseABVersion === "B") {
              callGAEvent("PDP loaded with B", {});
            } else {
              callGAEvent("PDP loaded with C", {});
            }
          }
        }
      } else {
        if (document.querySelectorAll(".promise-product-page") && promiseABVersion != "C") {
          const orderDetails = document.querySelectorAll(".promise-product-page");
          orderDetails.forEach((image) => {
            image.innerHTML = null;
          });
          const featureDetails = document.querySelectorAll(".promise-company-features");
          featureDetails.forEach((image) => {
            image.innerHTML = null;
          });
        }
      }
    }
  }
}

promiseDOMContentLoaded();

function getDayOfWeek(date) {
  const inputDate = new Date(date);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  if (inputDate.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = inputDate.getDay();
  return daysOfWeek[dayIndex];
}

function closePromisePopup() {
  var element = document.getElementsByClassName("promise-overlay-bg")[0];
  element.classList.add("display-none");
}

function openPromisePopup(source) {
  if (source) {
    callGAEvent("Clicked On " + source, {});
    let promiseHeading = promisePopUpContent[source].title;
    let promiseContent = promisePopUpContent[source].content;
    if (source === "default") {
      promiseContent = promiseContent.replace(
        "{{years}}",
        globalCheckActiveDetails?.data?.[0]?.extra_settings?.years_of_experience
      );
      promiseContent = promiseContent.replace(
        "{{happy_customers}}",
        globalCheckActiveDetails?.data?.[0]?.extra_settings?.happy_customers
      );
      promiseContent = promiseContent.replace(
        "{{successful_shipments}}",
        globalCheckActiveDetails?.data?.[0]?.extra_settings?.products_sold
      );
    } else if (source === "refund_return") {
      promiseContent = promiseContent.replace(
        "{{X}}",
        globalCheckActiveDetails?.data?.[0]?.extra_settings?.return_days
      );
      promiseHeading = promiseHeading.replace(
        "{{X}}",
        globalCheckActiveDetails?.data?.[0]?.extra_settings?.return_days
      );
    }
    document.getElementById("promise-popup-heading").innerHTML =
      promiseHeading;
    document.getElementById("promise-popup-content").innerHTML =
      promiseContent;
  }
  var element = document.getElementsByClassName("promise-overlay-bg")[0];
  element.classList.remove("display-none");
}

function editPromisePincode() {
  callGAEvent("Clicked on Edit Pincode", {});
  document.getElementById(
    "enter-pincode"
  ).innerHTML = `<div style="font-size: 14px; font-weight: bold; margin-top: 12px;">Enter Pincode</div>
  <div class="promise-flexbox" style="align-items: baseline;">
    <div style="width: 250px;margin-top: 11px;">
      <input id="promise-enter-pincode-input" style="border: 1px solid gainsboro; width: 100%; height: 30px; font-family: Arial, Helvetica, sans-serif !important;" maxlength="6"/>
      <div id="promise-input-error-msg" style="font-size: 12px; color: #D82C0D; line-height: 22px;white-space: nowrap;"></div>
    </div>
    <div style="height: 27px; width: 71px; border: none; color: white; background: #6e7cc3; margin-left: 7px; padding: 6px 13px; font-size: 12px; border-radius: 2px; cursor: pointer; margin-right: 12px; white-space: nowrap; box-sizing: border-box;" onclick="applyPromisePincode()">Change</div>
  </div>`;
  document
    .getElementById("promise-enter-pincode-input")
    .addEventListener("keydown", handlePromiseInputKeyPress);
}

async function applyPromisePincode() {
  if (!/^[1-9][0-9]{5}$/.test(document.getElementById("promise-enter-pincode-input").value)) {
    setTimeout(() => {
      document.getElementById("promise-enter-pincode-input").style.border = "1px solid red";
      document.getElementById("promise-input-error-msg").innerHTML = "Invalid Pincode!";
    }, 100);
  } else {
    const sellerEmail = document.getElementById("promise-overlay")?.getAttribute("seller-email") || "";
    const authToken = await getAuthToken();
    const servicibilityDetails = await getServicibilityDetails(authToken, document.getElementById("promise-enter-pincode-input").value, true);
    if (servicibilityDetails?.data[0]?.courier_response?.promise_edd && servicibilityDetails?.data[0]?.courier_response?.promise_edd !== "NA") {
      localStorage.setItem("_p_pcode", document.getElementById("promise-enter-pincode-input").value);
      edd_days = getPromiseNumberOfDays(servicibilityDetails?.data[0]?.courier_response?.promise_edd);
      edd_displayed = getDayOfWeek(servicibilityDetails?.data[0]?.courier_response?.promise_edd) + ", " + servicibilityDetails?.data[0]?.courier_response?.promise_edd;
      localStorage.setItem("_p_edd", getDayOfWeek(servicibilityDetails?.data[0]?.courier_response?.promise_edd) + ", " + servicibilityDetails?.data[0]?.courier_response?.promise_edd);
      callGAEvent("EDD displayed", {
        delivery_pincode: document.getElementById("promise-enter-pincode-input").value,
        edd_presented: servicibilityDetails?.data[0]?.courier_response?.promise_edd,
      });
      document.getElementById("enter-pincode").innerHTML = `<div class="promise-flexbox" style="color:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"].color === "default"?"#5968BE":globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"].color};margin-top:13px;margin-bottom: 13px;">
        <img src="https://sr-cdn.shiprocket.in/sr-promise/images/location.png" style="height: 14px;width: auto; margin-top: 1px; margin-left: 8px;" />
        <div style="font-size:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"]?.["font-size"]==="default"?"13px":globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"]?.["font-size"]==="sm"?"12px":globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"]?.["font-size"]==="md"?"14px":"15px"};margin-left: 6px;font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["location_text"].font} !important ">Deliver to ${servicibilityDetails?.data[0]?.postcode_info?.city ? servicibilityDetails?.data[0]?.postcode_info?.city.charAt(0).toUpperCase() + servicibilityDetails?.data[0]?.postcode_info?.city.slice(1) + " - " : ""}${document.getElementById("promise-enter-pincode-input").value}</div>
        <img src="https://sr-cdn.shiprocket.in/sr-promise/images/edit-icon.png" style="height: 13px; margin-left: 6px; margin-top: 1px; cursor: pointer; width: auto;" onclick="editPromisePincode()" />
      </div>`;
      document.getElementById("delivery-msg").innerHTML = `<div class="promise-flexbox" style="margin-top:13px">
        <img src="https://sr-cdn.shiprocket.in/sr-promise/images/box-icon.png" style="height: 14px; margin-top: 1px; margin-right: 5px; width: auto;" />
        <div class="promise-theme2-text" style="color:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].color=="default"?"black":globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].color};font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].font} !important">Get it by <span style="font-weight:600;float:inherit;font-family:${globalCheckActiveDetails?.data?.[0]?.extra_info?.["serviceability_text"].font} !important">${getDayOfWeek(servicibilityDetails?.data[0]?.courier_response?.promise_edd)}, ${servicibilityDetails?.data[0]?.courier_response?.promise_edd}</span>${is_whitelabeling_enabled ? "" : "with"}</div>${is_whitelabeling_enabled ? "" : '<div class="promise-flexbox" style="cursor: pointer;" onclick="openPromisePopup("default")"><div class="circle-container"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/with-bg.svg" style="margin: 2px;height: 16px;margin-top: 0px;width: auto;"><div class="circle-animation"></div></div><img src="https://sr-cdn.shiprocket.in/sr-promise/images/sr-text.svg" style="height: 9px;margin-top: 5px;margin-left: 2px;width: auto;"><img src="https://sr-cdn.shiprocket.in/sr-promise/images/info.png" style="height: 9px;margin-top: 5px;margin-left: 4px;width: auto;"></div>'}
      </div>`;
      document.getElementById("sr-icon").innerHTML = null;
    } else {
      document.getElementById("promise-enter-pincode-input").style.border = "1px solid red";
      document.getElementById("promise-input-error-msg").innerHTML = "Pincode not serviceable!";
    }
  }
}