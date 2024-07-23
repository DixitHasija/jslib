(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.uc = {}));
})(this, function(exports2) {
  "use strict";
  var _a;
  const CONSTANTS = {
    UDID: "udid",
    UFID: "ufid",
    PAYLOAD: "payload",
    UTID: "utid",
    CHANNEL: "channel",
    TRACK_INFO: "track_info",
    UEID: "ueid",
    UMID: "umid",
    USER_PROFILE: "_uc_session",
    USER_MOBILE_KEY: "sc_mid",
    UWID: "uwid",
    INCOGNITO: "incognito"
  };
  const CONSTANTS_MAPPING = {
    UDID: "udid",
    UFID: "ufid",
    PAYLOAD: "payload",
    UTID: "utid",
    EVENT_NAME: "event_name",
    CHANNEL: "channel",
    URL: "url",
    UMID: "umid",
    UEID: "ueid",
    UWID: "uwid",
    INCOGNITO: "incognito"
  };
  const EVENTS_NAME = {
    ON_LOAD: "page_view",
    ATC: "atc",
    BUY: "buy",
    ORDER: "order",
    REGISTER: "register",
    LOGIN: "login",
    LOGOUT: "logout",
    PDP_VIEW: "pdp_view",
    UPDATE_UMID: "update_umid",
    UPDATE_UEID: "update_ueid",
    UPDATE_USER_PROFILE: "update_user_profile",
    ORDER_TRACK: "order_track"
  };
  const FLAGS = {
    EVENT_DETAILS_MODE: true,
    CALL_API: true,
    OVERRIDE_UC_SESSION: true
  };
  const EVENT_TTL = 5;
  const EVENT_AUTO_TRIGGER_TTL = 10;
  const I_FRAME_ID = "__uc_iframe";
  const BLOCKED_CHANNELS = [];
  const MESSAGE_EVENT_LIST = {
    GET_USER_PROFILE_FROM_IFRAME: "getUserProfileFromIframe",
    SET_USER_PROFILE_TO_IFRAME: "setUserProfileToIframe",
    SEND_USER_PROFILE_TO_PARENT: "sendUserProfileToParent",
    GET_UDID_FROM_IFRAME: "getUDIDFromIframe",
    SEND_UDID_TO_PARENT: "sendUDIDToParent",
    GET_UTID_FROM_IFRAME: "getUTIDFromIframe",
    SEND_UTID_TO_PARENT: "sendUTIDToParent",
    GET_UFID_FROM_IFRAME: "getUFIDFromIframe",
    SEND_UFID_TO_PARENT: "sendUFIDToParent"
  };
  const NOTIFICATION_EVENT_LIST = {
    OTP_VERIFIED: "otp_verified"
  };
  const LOCALSTORAGE_KEY = "__uc_site";
  function getRandomUUID() {
    var _a2;
    if (self && (self == null ? void 0 : self.crypto) && ((_a2 = self == null ? void 0 : self.crypto) == null ? void 0 : _a2.randomUUID)) ;
    else {
      self.crypto.randomUUID = function() {
        const crypto2 = self.crypto || self.msCrypto;
        if (!crypto2 || !crypto2.getRandomValues) {
          throw new Error(
            "crypto.getRandomValues() not supported by this browser"
          );
        }
        const bytes = new Uint8Array(16);
        crypto2.getRandomValues(bytes);
        bytes[6] = bytes[6] & 15 | 64;
        bytes[8] = bytes[8] & 63 | 128;
        const byteToHex = [];
        for (let i2 = 0; i2 < 256; ++i2) {
          byteToHex.push((i2 + 256).toString(16).substr(1));
        }
        const uuid = (byteToHex[bytes[0]] + byteToHex[bytes[1]] + byteToHex[bytes[2]] + byteToHex[bytes[3]] + "-" + byteToHex[bytes[4]] + byteToHex[bytes[5]] + "-" + byteToHex[bytes[6]] + byteToHex[bytes[7]] + "-" + byteToHex[bytes[8]] + byteToHex[bytes[9]] + "-" + byteToHex[bytes[10]] + byteToHex[bytes[11]] + byteToHex[bytes[12]] + byteToHex[bytes[13]] + byteToHex[bytes[14]] + byteToHex[bytes[15]]).toLowerCase();
        return uuid;
      };
    }
    return self.crypto.randomUUID();
  }
  function jsonStringify(json) {
    if (!json) return null;
    return JSON.stringify(json);
  }
  function jsonParse(string) {
    if (!string) return null;
    return JSON.parse(string);
  }
  function getURL() {
    return window.location.href;
  }
  const getCurrentTimeStamp = () => {
    return (/* @__PURE__ */ new Date()).getTime();
  };
  const differenceBetweenTwoTimestampsInSeconds = (timestamp1, timestamp2) => {
    if (!timestamp1 || !timestamp2) {
      return null;
    }
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    const differenceInMilliseconds = date2 - date1;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1e3);
    return differenceInSeconds;
  };
  const combineObjects = (obj1, obj2) => {
    let combined = { ...obj1 };
    for (let key in obj2) {
      if (combined.hasOwnProperty(key)) {
        if (Array.isArray(combined[key]) && Array.isArray(obj2[key])) {
          combined[key] = combineUniqueObjects(combined[key], obj2[key]);
        } else if (typeof combined[key] === "string" && typeof obj2[key] === "string" || typeof combined[key] === "number" && typeof obj2[key] === "number") {
          combined[key] = combined[key];
        } else {
          throw new Error(
            "Both values must be of the same type: either strings or arrays"
          );
        }
      } else {
        combined[key] = obj2[key];
      }
    }
    return combined;
  };
  function combineUniqueObjects(arr1, arr2) {
    const combinedArray = arr1.concat(arr2);
    function deepEqual(obj1, obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (let key of keys1) {
        const val1 = obj1[key];
        const val2 = obj2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2) {
          return false;
        }
      }
      return true;
    }
    function isObject(object) {
      return object != null && typeof object === "object";
    }
    const uniqueObjects = combinedArray.filter(
      (obj, index, self2) => index === self2.findIndex((t2) => deepEqual(t2, obj))
    );
    return uniqueObjects;
  }
  function intersectionInTwoArrays(list_one, list_two) {
    let list_one_set = new Set(list_one);
    let list_two_set = new Set(list_two);
    return [...list_one_set.intersection(list_two_set)];
  }
  function stringToBase64Url(str) {
    let base64 = btoa(unescape(encodeURIComponent(str)));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  const objectName = LOCALSTORAGE_KEY;
  let localStorageObject = {};
  function set(key, value) {
    localStorage.setItem(key, value);
    localStorageObject = jsonParse(value);
  }
  function get() {
    var _a2;
    if (localStorageObject && localStorageObject.key && ((_a2 = localStorageObject == null ? void 0 : localStorageObject.key) == null ? void 0 : _a2.length)) {
      localStorageObject = jsonParse(localStorage.getItem(objectName));
    } else {
      localStorageObject = jsonParse(localStorage.getItem(objectName));
    }
    return localStorageObject;
  }
  function clear() {
    localStorage.clear();
  }
  function len() {
    return localStorage.length;
  }
  function wget(_value) {
    const object = get();
    if (_value && object) {
      return object[_value];
    } else {
      return object;
    }
  }
  function wSet(_key, _value) {
    var _a2;
    let data = wget();
    if (data && ((_a2 = Object.keys(data)) == null ? void 0 : _a2.length)) ;
    else {
      data = {};
    }
    data[_key] = _value;
    set(objectName, jsonStringify(data));
  }
  function wRemove(_key) {
    let object = wget();
    delete object[_key];
    set(objectName, object);
  }
  function directSet(_key, _value) {
    set(_key, jsonStringify(_value));
  }
  function directGet(_key) {
    return localStorage.getItem(_key);
  }
  const LocalStorageService = {
    set: wSet,
    get: wget,
    clear,
    remove: wRemove,
    len,
    directSet,
    directGet
  };
  function getUDID() {
    return LocalStorageService.get(CONSTANTS.UDID);
  }
  function setUDID(value) {
    LocalStorageService.set(CONSTANTS.UDID, value);
  }
  function getPAYLOAD() {
    return LocalStorageService.get(CONSTANTS.PAYLOAD);
  }
  function setPAYLOAD(value) {
    LocalStorageService.set(CONSTANTS.PAYLOAD, value);
  }
  function getUTID() {
    return LocalStorageService.get(CONSTANTS.UTID);
  }
  function setUTID(value) {
    LocalStorageService.set(CONSTANTS.UTID, value);
  }
  function getUFID() {
    return LocalStorageService.get(CONSTANTS.UFID);
  }
  function setUFID(value) {
    LocalStorageService.set(CONSTANTS.UFID, value);
  }
  function getChannels() {
    return LocalStorageService.get(CONSTANTS.CHANNEL);
  }
  function getBitwiseChannelList() {
    let channelList = getChannels();
    let bitwiseChannelValue = 0;
    channelList == null ? void 0 : channelList.forEach((element) => {
      if (element) {
        bitwiseChannelValue += parseInt(element);
      }
    });
    return bitwiseChannelValue ? bitwiseChannelValue.toString() : "0";
  }
  function setChannel(newValue) {
    let list = getChannels();
    if (list && list.length) ;
    else {
      list = [newValue];
    }
    if (!(list == null ? void 0 : list.includes(newValue))) {
      list.push(newValue);
    }
    LocalStorageService.set(CONSTANTS.CHANNEL, list);
  }
  function getTrackInfo() {
    return LocalStorageService.get(CONSTANTS.TRACK_INFO);
  }
  function setTrackInfo(newInfo) {
    let info = LocalStorageService.get(CONSTANTS.TRACK_INFO);
    info = { ...info, ...newInfo };
    LocalStorageService.set(CONSTANTS.TRACK_INFO, info);
  }
  function removeTrackInfo(md5Name) {
    let info = LocalStorageService.get(CONSTANTS.TRACK_INFO);
    if (info.hasOwnProperty(md5Name)) {
      delete info[md5Name];
      LocalStorageService.set(CONSTANTS.TRACK_INFO, info);
    }
  }
  function getUMID() {
    return LocalStorageService.get(CONSTANTS.UMID);
  }
  function setUMID(value) {
    LocalStorageService.set(CONSTANTS.UMID, value);
  }
  function getUEID() {
    return LocalStorageService.get(CONSTANTS.UEID);
  }
  function setUEID(value) {
    LocalStorageService.set(CONSTANTS.UEID, value);
  }
  function setUP(value) {
    LocalStorageService.directSet(CONSTANTS.USER_PROFILE, value);
  }
  function getUP() {
    return LocalStorageService.directGet(CONSTANTS.USER_PROFILE);
  }
  function getUserMobileValue() {
    return LocalStorageService.directGet(CONSTANTS.USER_MOBILE_KEY);
  }
  function getUWID() {
    return LocalStorageService.get(CONSTANTS.UWID);
  }
  function setUWID(value) {
    LocalStorageService.set(CONSTANTS.UWID, value);
  }
  function getPrivateMode() {
    return LocalStorageService.get(CONSTANTS.INCOGNITO);
  }
  function setPrivateMode(value) {
    LocalStorageService.set(CONSTANTS.INCOGNITO, value);
  }
  const gsService = {
    getUDID,
    setUDID,
    getPAYLOAD,
    setPAYLOAD,
    getUTID,
    setUTID,
    getUFID,
    setUFID,
    getChannels,
    setChannel,
    getBitwiseChannelList,
    getTrackInfo,
    setTrackInfo,
    getUMID,
    setUMID,
    getUEID,
    setUEID,
    removeTrackInfo,
    setUP,
    getUP,
    getUserMobileValue,
    getUWID,
    setUWID,
    getPrivateMode,
    setPrivateMode
  };
  function sendEvent(apiData) {
    if (intersectionInTwoArrays(BLOCKED_CHANNELS, gsService.getChannels()).length === 0) {
      let base_url = "https://uc.shiprocket.in";
      let url = base_url + "/v1/track/user";
      try {
        fetch(url, {
          method: "POST",
          body: JSON.stringify(apiData),
          headers: {
            "Content-type": "application/json"
            // 'ngrok-skip-browser-warning': true,
          }
        }).then((response) => response.json()).then((json) => json);
      } catch (error) {
        console.log(error);
      }
    }
  }
  function apiBodyDataMapper(event_name, payload) {
    if (!Object.values(EVENTS_NAME).includes(event_name)) {
      return console.error(`Event ${event_name} is invalid`);
    }
    let apiData = {
      [CONSTANTS_MAPPING.EVENT_NAME]: event_name,
      [CONSTANTS_MAPPING.UFID]: gsService.getUFID(),
      [CONSTANTS_MAPPING.UDID]: gsService.getUDID(),
      [CONSTANTS_MAPPING.URL]: getURL(),
      [CONSTANTS_MAPPING.CHANNEL]: gsService.getBitwiseChannelList(),
      [CONSTANTS_MAPPING.UTID]: gsService.getUTID(),
      [CONSTANTS_MAPPING.PAYLOAD]: _payloadMapper(event_name, payload),
      [CONSTANTS_MAPPING.UWID]: gsService.getUWID(),
      [CONSTANTS_MAPPING.UEID]: gsService.getUEID(),
      [CONSTANTS_MAPPING.UMID]: gsService.getUMID(),
      [CONSTANTS_MAPPING.INCOGNITO]: gsService.getPrivateMode()
    };
    sendEvent(apiData);
    return apiData;
  }
  function _payloadMapper(event_name, payload) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    let data = {};
    switch (event_name) {
      case EVENTS_NAME.ON_LOAD: {
        data = {
          url: getURL(),
          page_type: "",
          referrer: ""
        };
        break;
      }
      case EVENTS_NAME.PDP_VIEW: {
        data = {
          name: payload == null ? void 0 : payload.name,
          mrp: payload == null ? void 0 : payload.mrp,
          selling_price: payload == null ? void 0 : payload.selling_price,
          product_id: payload == null ? void 0 : payload.product_id,
          variant_id: payload == null ? void 0 : payload.variant_id,
          qty: payload == null ? void 0 : payload.qty,
          category: payload == null ? void 0 : payload.category,
          out_of_stock: payload == null ? void 0 : payload.out_of_stock,
          image: payload == null ? void 0 : payload.image,
          description: payload == null ? void 0 : payload.description,
          referrer: payload == null ? void 0 : payload.referrer
        };
        break;
      }
      case EVENTS_NAME.ATC: {
        data = {
          cart_id: payload == null ? void 0 : payload.cart_id,
          name: payload == null ? void 0 : payload.name,
          mrp: payload == null ? void 0 : payload.mrp,
          selling_price: payload == null ? void 0 : payload.selling_price,
          variant_id: payload == null ? void 0 : payload.variant_id,
          qty: payload == null ? void 0 : payload.qty,
          category: payload == null ? void 0 : payload.category,
          product_id: payload == null ? void 0 : payload.product_id,
          referrer: payload == null ? void 0 : payload.referrer
        };
        break;
      }
      case EVENTS_NAME.BUY: {
        let _payloadList = [];
        for (let index = 0; index < ((_a2 = payload == null ? void 0 : payload.items) == null ? void 0 : _a2.length); index++) {
          const element = {
            product_id: (_b = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _b.product_id,
            name: (_c = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _c.name,
            mrp: (_d = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _d.mrp,
            selling_price: (_e = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _e.selling_price,
            variant_id: (_f = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _f.variant_id,
            qty: (_g = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _g.qty,
            category: (_h = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _h.category,
            image: (_i = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _i.image,
            description: (_j = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _j.description,
            sku: (_k = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _k.sku
          };
          _payloadList.push(element);
        }
        data = {
          source_channel: payload == null ? void 0 : payload.source_channel,
          items: _payloadList,
          referrer: payload == null ? void 0 : payload.referrer,
          order_total_amt: payload == null ? void 0 : payload.order_total_amt,
          order_qty: payload == null ? void 0 : payload.order_qty,
          cart_id: payload == null ? void 0 : payload.cart_id,
          couponData: payload == null ? void 0 : payload.couponData
        };
        break;
      }
      case EVENTS_NAME.ORDER: {
        let _payloadList = [];
        for (let index = 0; index < ((_l = payload == null ? void 0 : payload.items) == null ? void 0 : _l.length); index++) {
          const item = {
            id: (_m = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _m.id,
            name: (_n = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _n.name,
            mrp: (_o = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _o.mrp,
            selling_price: (_p = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _p.selling_price,
            variant_id: (_q = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _q.variant_id,
            qty: (_r = payload == null ? void 0 : payload.items[index]) == null ? void 0 : _r.qty
          };
          _payloadList.push(item);
        }
        data = {
          items: _payloadList,
          id: payload == null ? void 0 : payload.id,
          status: payload == null ? void 0 : payload.status,
          method: payload == null ? void 0 : payload.method,
          order_id: payload == null ? void 0 : payload.order_id,
          customer_id: payload == null ? void 0 : payload.customer_id,
          phone: payload == null ? void 0 : payload.phone,
          name: payload == null ? void 0 : payload.name,
          email: payload == null ? void 0 : payload.email,
          total_price: payload == null ? void 0 : payload.total_price,
          zip: payload == null ? void 0 : payload.zip,
          referrer: payload == null ? void 0 : payload.referrer,
          sla: payload == null ? void 0 : payload.sla,
          coupon_detail: payload == null ? void 0 : payload.coupon_detail
        };
        break;
      }
      case EVENTS_NAME.REGISTER: {
        data = {
          name: payload == null ? void 0 : payload.name,
          mobile: payload == null ? void 0 : payload.mobile,
          gender: payload == null ? void 0 : payload.gender,
          email: payload == null ? void 0 : payload.email,
          dob: payload == null ? void 0 : payload.dob
        };
        break;
      }
      case EVENTS_NAME.LOGIN: {
        data = {
          name: payload == null ? void 0 : payload.name,
          mobile: payload == null ? void 0 : payload.mobile
        };
        break;
      }
      case EVENTS_NAME.LOGOUT: {
        data = {
          name: payload == null ? void 0 : payload.name,
          mobile: payload == null ? void 0 : payload.mobile
        };
        break;
      }
      case EVENTS_NAME.ORDER_TRACK: {
        data = {
          awb: payload == null ? void 0 : payload.awb,
          channel_order_id: payload == null ? void 0 : payload.channel_order_id,
          sr_order_id: payload == null ? void 0 : payload.sr_order_id,
          channel: payload == null ? void 0 : payload.channel,
          edd: payload == null ? void 0 : payload.edd,
          order_date: payload == null ? void 0 : payload.order_date,
          order_status: payload == null ? void 0 : payload.order_status,
          order_amount: payload == null ? void 0 : payload.order_amount,
          payment_mode: payload == null ? void 0 : payload.payment_mode,
          pincode_pickup: payload == null ? void 0 : payload.pincode_pickup,
          pincode_delivery: payload == null ? void 0 : payload.pincode_delivery,
          user_info: payload == null ? void 0 : payload.user_info,
          courier_info: payload == null ? void 0 : payload.courier_info,
          return: payload == null ? void 0 : payload.return
        };
        break;
      }
    }
    return data;
  }
  let userInfoMapper = (data) => {
    let returnObject = {
      name: (data == null ? void 0 : data.first_name) + (data == null ? void 0 : data.last_name),
      u_mid: data.u_mid,
      mobile: stringToBase64Url(data == null ? void 0 : data.mobile_no),
      email: stringToBase64Url(data == null ? void 0 : data.email),
      address: stringToBase64Url((data == null ? void 0 : data.address_line_1) + (data == null ? void 0 : data.address_line_2)),
      pincode: data == null ? void 0 : data.pincode,
      city: data == null ? void 0 : data.city,
      state: data == null ? void 0 : data.state,
      country: data == null ? void 0 : data.country_code
    };
    return returnObject;
  };
  async function get_SHA_256(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }
  let loadIframeAsync = (iframe2) => {
    return new Promise((resolve, reject) => {
      iframe2.onload = () => resolve(iframe2);
      iframe2.onerror = () => reject(new Error("Failed to load iframe"));
    });
  };
  let createIframe = async () => {
    self.iframe = document.getElementById(I_FRAME_ID);
    if (self.iframe) ;
    else {
      self.iframe = document.createElement("iframe");
      self.iframe.width = "600";
      self.iframe.height = "400";
      self.iframe.style.border = "none";
      self.iframe.style.display = "none";
      self.iframe.src = "https://jslib-dixithasijas-projects.vercel.app/iframe.html";
      self.iframe.id = I_FRAME_ID;
      document.body.appendChild(self.iframe);
      await loadIframeAsync(iframe);
    }
    return self.iframe;
  };
  function setCookies(data) {
    postMessageMethod(MESSAGE_EVENT_LIST.SET_USER_PROFILE_TO_IFRAME, data);
  }
  let postMessageMethod = (name, data) => {
    self.iframe.contentWindow.postMessage(
      {
        name,
        data
      },
      "*"
    );
  };
  let getCookie = () => {
    postMessageMethod(MESSAGE_EVENT_LIST.GET_USER_PROFILE_FROM_IFRAME);
  };
  let getUDIDFromIframe = () => {
    postMessageMethod(MESSAGE_EVENT_LIST.GET_UDID_FROM_IFRAME);
  };
  let getUTIDFromIframe = () => {
    postMessageMethod(MESSAGE_EVENT_LIST.GET_UTID_FROM_IFRAME);
  };
  let getUFIDFromIframe = () => {
    postMessageMethod(MESSAGE_EVENT_LIST.GET_UFID_FROM_IFRAME);
  };
  let handleMessageEvent = (event) => {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    if (event.origin !== window.location.origin) ;
    switch ((_a2 = event == null ? void 0 : event.data) == null ? void 0 : _a2.name) {
      case MESSAGE_EVENT_LIST.SEND_USER_PROFILE_TO_PARENT: {
        if (((_b = event == null ? void 0 : event.data) == null ? void 0 : _b.data) && Object.keys((_c = event == null ? void 0 : event.data) == null ? void 0 : _c.data).length && FLAGS.OVERRIDE_UC_SESSION) {
          _triggerEvent(EVENTS_NAME.UPDATE_USER_PROFILE, event.data.data);
          if ((_e = (_d = event == null ? void 0 : event.data) == null ? void 0 : _d.data) == null ? void 0 : _e.u_mid) {
            gsService.setUMID((_g = (_f = event == null ? void 0 : event.data) == null ? void 0 : _f.data) == null ? void 0 : _g.u_mid);
          }
        }
        break;
      }
      case MESSAGE_EVENT_LIST.SEND_UDID_TO_PARENT: {
        gsService.setUDID((_h = event == null ? void 0 : event.data) == null ? void 0 : _h.data);
        break;
      }
      case MESSAGE_EVENT_LIST.SEND_UTID_TO_PARENT: {
        gsService.setUTID((_i = event == null ? void 0 : event.data) == null ? void 0 : _i.data);
        break;
      }
      case MESSAGE_EVENT_LIST.SEND_UFID_TO_PARENT: {
        gsService.setUFID((_j = event == null ? void 0 : event.data) == null ? void 0 : _j.data);
        break;
      }
    }
  };
  let getUserInfo = (userMobileValue) => {
    let base_url = "https://uc.shiprocket.in";
    let url = base_url + "/v1/user/info?mid=" + userMobileValue;
    try {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      }).then((response) => response.json()).then((json) => {
        let userInfo = userInfoMapper(
          Object.assign(json.data, { u_mid: userMobileValue })
        );
        setCookies(userInfo);
        _triggerEvent(EVENTS_NAME.UPDATE_USER_PROFILE, userInfo);
      });
    } catch (error) {
      console.log(error);
    }
  };
  async function _triggerEvent(event_name, payload = {}) {
    if (!await registerTrackEvent(event_name, payload)) {
      triggerExpireEvent();
    }
  }
  async function registerTrackEvent(event_name, payload) {
    var _a2;
    const skipEventList = [];
    let isNewMD5 = false;
    if (skipEventList == null ? void 0 : skipEventList.includes(event_name)) {
      return true;
    }
    let SHA_256_KEY = await get_SHA_256(getURL());
    let trackingInfoObject = gsService.getTrackInfo();
    let currentTrackingInfo = {};
    let savedEventNameList = [];
    if (trackingInfoObject && trackingInfoObject[SHA_256_KEY]) {
      currentTrackingInfo = trackingInfoObject[SHA_256_KEY];
      if (currentTrackingInfo && (currentTrackingInfo == null ? void 0 : currentTrackingInfo.eventsDetails)) {
        savedEventNameList = Object.keys(currentTrackingInfo.eventsDetails);
      } else {
        currentTrackingInfo["eventsDetails"] = {};
      }
    } else {
      isNewMD5 = true;
      currentTrackingInfo = {
        // channels: gsService.getChannels(),
        url: getURL()
        // events: [],
      };
      currentTrackingInfo["eventsDetails"] = {};
    }
    if (!savedEventNameList.includes(event_name)) {
      currentTrackingInfo.eventsDetails[event_name] = {
        payload,
        updatedAt: getCurrentTimeStamp()
      };
      if (!gsService.getUMID() || !gsService.getUEID()) {
        Object.keys(payload).forEach(async (key) => {
        });
      }
      const onlyTrackingInfoUpdatingEventsList = [
        EVENTS_NAME.UPDATE_UMID,
        EVENTS_NAME.UPDATE_UEID,
        EVENTS_NAME.UPDATE_USER_PROFILE
      ];
      if (onlyTrackingInfoUpdatingEventsList.includes(event_name)) {
        if (event_name === EVENTS_NAME.UPDATE_UEID) {
          gsService.setUEID(payload.email);
        } else if (event_name === EVENTS_NAME.UPDATE_UMID) {
          gsService.setUMID(payload.mobile);
        } else if (event_name === EVENTS_NAME.UPDATE_USER_PROFILE) {
          gsService.setUP(payload);
        }
        return true;
      }
      gsService.setTrackInfo({ [SHA_256_KEY]: currentTrackingInfo });
    } else {
      let existingPayload = ((_a2 = currentTrackingInfo.eventsDetails[event_name]) == null ? void 0 : _a2.payload) || {};
      existingPayload = combineObjects(existingPayload, payload);
      currentTrackingInfo.eventsDetails[event_name].payload = existingPayload;
      gsService.setTrackInfo({ [SHA_256_KEY]: currentTrackingInfo });
    }
    return isNewMD5;
  }
  function triggerExpireEvent(_EVENT_TTL = EVENT_TTL) {
    var _a2;
    let trackingInfoObject = gsService.getTrackInfo();
    if (trackingInfoObject && Object.keys(trackingInfoObject).length) {
      let expiredObjectList = [];
      let currentMD5 = Object.keys(trackingInfoObject).at(0);
      let currentMD5Object = trackingInfoObject[currentMD5];
      if (currentMD5Object && (currentMD5Object == null ? void 0 : currentMD5Object.eventsDetails)) {
        Object.keys(currentMD5Object == null ? void 0 : currentMD5Object.eventsDetails).forEach((event) => {
          if (differenceBetweenTwoTimestampsInSeconds(
            currentMD5Object == null ? void 0 : currentMD5Object.eventsDetails[event].updatedAt,
            getCurrentTimeStamp()
          ) >= _EVENT_TTL) {
            expiredObjectList[event] = currentMD5Object == null ? void 0 : currentMD5Object.eventsDetails[event];
          }
        });
      }
      if (expiredObjectList && Object.keys(expiredObjectList).length) {
        Object.keys(expiredObjectList).forEach((event) => {
          currentMD5Object == null ? true : delete currentMD5Object.eventsDetails[event];
        });
        if ((currentMD5Object == null ? void 0 : currentMD5Object.eventsDetails) && ((_a2 = Object.keys(currentMD5Object == null ? void 0 : currentMD5Object.eventsDetails)) == null ? void 0 : _a2.length)) {
          gsService.setTrackInfo({ [currentMD5]: currentMD5Object });
        } else {
          gsService.removeTrackInfo(currentMD5);
        }
        Object.keys(expiredObjectList).forEach((event_name) => {
          apiBodyDataMapper(event_name, expiredObjectList[event_name].payload);
        });
      }
    }
  }
  function notificationService(_name, _data) {
    switch (_name) {
      case NOTIFICATION_EVENT_LIST.OTP_VERIFIED: {
        console.log("Mobile Number Update notification received", _data);
        const userMobileValue = gsService.getUserMobileValue() || (_data == null ? void 0 : _data.mobile);
        if (userMobileValue) {
          _triggerEvent(EVENTS_NAME.UPDATE_UMID, { mobile: userMobileValue });
          getUserInfo(userMobileValue);
          break;
        }
      }
    }
  }
  /*!
   *
   * detectIncognito v1.3.5
   *
   * https://github.com/Joe12387/detectIncognito
   *
   * MIT License
   *
   * Copyright (c) 2021 - 2024 Joe Rutkowski <Joe@dreggle.com>
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   * Please keep this comment intact in order to properly abide by the MIT License.
   *
   **/
  var e = { d: (n2, t2) => {
    for (var o2 in t2) e.o(t2, o2) && !e.o(n2, o2) && Object.defineProperty(n2, o2, { enumerable: true, get: t2[o2] });
  }, o: (e2, n2) => Object.prototype.hasOwnProperty.call(e2, n2) }, n = {};
  e.d(n, { A: () => i, k: () => r });
  var t = function(e2, n2, t2, o2) {
    return new (t2 || (t2 = Promise))(function(r2, i2) {
      function a(e3) {
        try {
          u(o2.next(e3));
        } catch (e4) {
          i2(e4);
        }
      }
      function c2(e3) {
        try {
          u(o2.throw(e3));
        } catch (e4) {
          i2(e4);
        }
      }
      function u(e3) {
        var n3;
        e3.done ? r2(e3.value) : (n3 = e3.value, n3 instanceof t2 ? n3 : new t2(function(e4) {
          e4(n3);
        })).then(a, c2);
      }
      u((o2 = o2.apply(e2, [])).next());
    });
  }, o = function(e2, n2) {
    var t2, o2, r2, i2, a = { label: 0, sent: function() {
      if (1 & r2[0]) throw r2[1];
      return r2[1];
    }, trys: [], ops: [] };
    return i2 = { next: c2(0), throw: c2(1), return: c2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
      return this;
    }), i2;
    function c2(c3) {
      return function(u) {
        return function(c4) {
          if (t2) throw new TypeError("Generator is already executing.");
          for (; i2 && (i2 = 0, c4[0] && (a = 0)), a; ) try {
            if (t2 = 1, o2 && (r2 = 2 & c4[0] ? o2.return : c4[0] ? o2.throw || ((r2 = o2.return) && r2.call(o2), 0) : o2.next) && !(r2 = r2.call(o2, c4[1])).done) return r2;
            switch (o2 = 0, r2 && (c4 = [2 & c4[0], r2.value]), c4[0]) {
              case 0:
              case 1:
                r2 = c4;
                break;
              case 4:
                return a.label++, { value: c4[1], done: false };
              case 5:
                a.label++, o2 = c4[1], c4 = [0];
                continue;
              case 7:
                c4 = a.ops.pop(), a.trys.pop();
                continue;
              default:
                if (!(r2 = a.trys, (r2 = r2.length > 0 && r2[r2.length - 1]) || 6 !== c4[0] && 2 !== c4[0])) {
                  a = 0;
                  continue;
                }
                if (3 === c4[0] && (!r2 || c4[1] > r2[0] && c4[1] < r2[3])) {
                  a.label = c4[1];
                  break;
                }
                if (6 === c4[0] && a.label < r2[1]) {
                  a.label = r2[1], r2 = c4;
                  break;
                }
                if (r2 && a.label < r2[2]) {
                  a.label = r2[2], a.ops.push(c4);
                  break;
                }
                r2[2] && a.ops.pop(), a.trys.pop();
                continue;
            }
            c4 = n2.call(e2, a);
          } catch (e3) {
            c4 = [6, e3], o2 = 0;
          } finally {
            t2 = r2 = 0;
          }
          if (5 & c4[0]) throw c4[1];
          return { value: c4[0] ? c4[1] : void 0, done: true };
        }([c3, u]);
      };
    }
  };
  function r() {
    return t(this, void 0, Promise, function() {
      return o(this, function(e2) {
        switch (e2.label) {
          case 0:
            return [4, new Promise(function(e3, n2) {
              var t2, o2, r2 = "Unknown";
              function i2(n3) {
                e3({ isPrivate: n3, browserName: r2 });
              }
              function a(e4) {
                return e4 === eval.toString().length;
              }
              function c2() {
                void 0 !== navigator.maxTouchPoints ? function() {
                  var e4 = String(Math.random());
                  try {
                    window.indexedDB.open(e4, 1).onupgradeneeded = function(n3) {
                      var t3, o3, r3 = null === (t3 = n3.target) || void 0 === t3 ? void 0 : t3.result;
                      try {
                        r3.createObjectStore("test", { autoIncrement: true }).put(new Blob()), i2(false);
                      } catch (e5) {
                        var a2 = e5;
                        return e5 instanceof Error && (a2 = null !== (o3 = e5.message) && void 0 !== o3 ? o3 : e5), "string" != typeof a2 ? void i2(false) : void i2(a2.includes("BlobURLs are not yet supported"));
                      } finally {
                        r3.close(), window.indexedDB.deleteDatabase(e4);
                      }
                    };
                  } catch (e5) {
                    i2(false);
                  }
                }() : function() {
                  var e4 = window.openDatabase, n3 = window.localStorage;
                  try {
                    e4(null, null, null, null);
                  } catch (e5) {
                    return void i2(true);
                  }
                  try {
                    n3.setItem("test", "1"), n3.removeItem("test");
                  } catch (e5) {
                    return void i2(true);
                  }
                  i2(false);
                }();
              }
              function u() {
                navigator.webkitTemporaryStorage.queryUsageAndQuota(function(e4, n3) {
                  var t3;
                  i2(Math.round(n3 / 1048576) < 2 * Math.round((void 0 !== (t3 = window).performance && void 0 !== t3.performance.memory && void 0 !== t3.performance.memory.jsHeapSizeLimit ? performance.memory.jsHeapSizeLimit : 1073741824) / 1048576));
                }, function(e4) {
                  n2(new Error("detectIncognito somehow failed to query storage quota: " + e4.message));
                });
              }
              function l() {
                void 0 !== self.Promise && void 0 !== self.Promise.allSettled ? u() : (0, window.webkitRequestFileSystem)(0, 1, function() {
                  i2(false);
                }, function() {
                  i2(true);
                });
              }
              void 0 !== (o2 = navigator.vendor) && 0 === o2.indexOf("Apple") && a(37) ? (r2 = "Safari", c2()) : function() {
                var e4 = navigator.vendor;
                return void 0 !== e4 && 0 === e4.indexOf("Google") && a(33);
              }() ? (t2 = navigator.userAgent, r2 = t2.match(/Chrome/) ? void 0 !== navigator.brave ? "Brave" : t2.match(/Edg/) ? "Edge" : t2.match(/OPR/) ? "Opera" : "Chrome" : "Chromium", l()) : void 0 !== document.documentElement && void 0 !== document.documentElement.style.MozAppearance && a(37) ? (r2 = "Firefox", i2(void 0 === navigator.serviceWorker)) : void 0 !== navigator.msSaveBlob && a(39) ? (r2 = "Internet Explorer", i2(void 0 === window.indexedDB)) : n2(new Error("detectIncognito cannot determine the browser"));
            })];
          case 1:
            return [2, e2.sent()];
        }
      });
    });
  }
  "undefined" != typeof window && (window.detectIncognito = r);
  const i = r;
  n.A;
  var c = n.k;
  let UWID = "";
  let intervalId = "";
  async function onLoad() {
    registerChannelId();
    gsService.getUFID();
    UWID = gsService.getUWID(CONSTANTS.UWID);
    gsService.getUTID(CONSTANTS.UTID);
    if (!UWID) {
      UWID = getRandomUUID();
      gsService.setUWID(UWID);
    }
    c().then((result) => {
      gsService.setPrivateMode(result.isPrivate);
    });
    _triggerEvent(EVENTS_NAME.ON_LOAD, {});
    intervalId = setInterval(() => {
      triggerExpireEvent(0);
    }, EVENT_AUTO_TRIGGER_TTL * 1e3);
    await createIframe();
    getUDIDFromIframe();
    getUFIDFromIframe();
    getUTIDFromIframe();
    const userMobileValue = gsService.getUserMobileValue();
    let savedUserProfile = gsService.getUP();
    if (savedUserProfile) {
      savedUserProfile = JSON.parse(savedUserProfile);
    }
    const userMobileNumberSession = savedUserProfile && savedUserProfile.u_mid ? savedUserProfile.u_mid : null;
    if (userMobileValue && (userMobileNumberSession && userMobileNumberSession !== userMobileValue || !userMobileNumberSession)) {
      _triggerEvent(EVENTS_NAME.UPDATE_UMID, { mobile: userMobileValue });
      getUserData(userMobileValue);
    } else {
      getCookie();
    }
  }
  function registerChannelId() {
    var _a2, _b, _c;
    let script = document.getElementById("uc_shiprocket");
    if (!script && ((_a2 = document == null ? void 0 : document.currentScript) == null ? void 0 : _a2.src)) {
      script = document == null ? void 0 : document.currentScript;
    }
    if (script) {
      let src = script.src;
      if ((_b = document == null ? void 0 : document.currentScript) == null ? void 0 : _b.src) {
        src = (_c = document == null ? void 0 : document.currentScript) == null ? void 0 : _c.src;
      }
      const urlParams = new URLSearchParams(src.split("?")[1]);
      const channelId = urlParams.get("channel_id");
      if (channelId) {
        gsService.setChannel(channelId);
      }
    } else {
      console.error("Script element not found");
    }
  }
  let getUserData = (userMobileValue) => {
    let base_url = "https://uc.shiprocket.in";
    let url = base_url + "/v1/user/info?mid=" + userMobileValue;
    try {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
          // 'ngrok-skip-browser-warning': true,
        }
      }).then((response) => response.json()).then((json) => {
        let userInfo = userInfoMapper(
          Object.assign(json.data, { u_mid: userMobileValue })
        );
        _triggerEvent(EVENTS_NAME.UPDATE_UMID, { mobile: userMobileValue });
        setCookies(userInfo);
        _triggerEvent(EVENTS_NAME.UPDATE_USER_PROFILE, userInfo);
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onLoad);
  } else {
    onLoad();
  }
  window.addEventListener("beforeunload", async function(e2) {
    await triggerExpireEvent(0);
    clearInterval(intervalId);
    window.removeEventListener("load", () => {
    });
  });
  (_a = document == null ? void 0 : document.getElementById("addPost")) == null ? void 0 : _a.addEventListener("click", function() {
    _triggerEvent(EVENTS_NAME.ON_LOAD, {});
  });
  window.addEventListener("message", function(event) {
    handleMessageEvent(event);
  });
  window.SHIPROCKET_ANALYTICS = {
    event: _triggerEvent,
    register: gsService.setChannel,
    showRegisterChannels: gsService.getChannels,
    initialize: onLoad,
    notify: notificationService
  };
  const ua = window.SHIPROCKET_ANALYTICS;
  window.ua = ua;
  exports2.ua = ua;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
