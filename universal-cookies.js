(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.uc = {}));
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
    UEID_IDENTIFICATION_SOURCE: "ueid_identification_source",
    UEID_IDENTIFICATION_VERIFIED: "ueid_identification_verified",
    UEID_IDENTIFICATION_TIME: "ueid_identification_time",
    UMID: "umid",
    UMID_IDENTIFICATION_SOURCE: "umid_identification_source",
    UMID_IDENTIFICATION_VERIFIED: "umid_identification_verified",
    UMID_IDENTIFICATION_TIME: "umid_identification_time",
    USER_PROFILE: "_uc_session_v1",
    USER_MOBILE_KEY: "sc_mid",
    UWID: "uwid",
    INCOGNITO: "incognito",
    OLD_USER_PROFILE: "_uc_session",
    THIRD_PARTY_COOKIE_BLOCKED: "third_party_cookie_blocked",
    TEMPORARY_COOKIE: "temporary_cookie",
    BROWSER_NAME: "browser_name",
    DEVICE_TYPE: "device_type"
  };
  const CONSTANTS_MAPPING = {
    UDID: "udid",
    UFID: "ufid",
    PAYLOAD: "payload",
    UTID: "utid",
    EVENT_NAME: "event_name",
    CHANNEL: "channel",
    URL: "url",
    UEID: "ueid",
    UEID_IDENTIFICATION_SOURCE: "ueid_identification_source",
    UEID_IDENTIFICATION_VERIFIED: "ueid_identification_verified",
    UEID_IDENTIFICATION_TIME: "ueid_identification_time",
    UMID: "umid",
    UMID_IDENTIFICATION_SOURCE: "umid_identification_source",
    UMID_IDENTIFICATION_VERIFIED: "umid_identification_verified",
    UMID_IDENTIFICATION_TIME: "umid_identification_time",
    UWID: "uwid",
    INCOGNITO: "incognito",
    THIRD_PARTY_COOKIE_BLOCKED: "third_party_cookie_blocked",
    DEVICE_TYPE: "device_type"
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
  const CHANNEL_BINARY_VALUE = {
    wigzo: 1,
    promise: 2,
    engage: 4,
    tracking_page: 8,
    checkout: 16,
    my_sr: 32
  };
  const FLAGS = {
    EVENT_DETAILS_MODE: true,
    CALL_API: true,
    OVERRIDE_UC_SESSION: true,
    REMOVE_PII: true,
    REMOVE_OLD_USER_PROFILE: true
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
    SEND_UDID_TO_IFRAME: "sendUDIDToIframe",
    GET_UTID_FROM_IFRAME: "getUTIDFromIframe",
    SEND_UTID_TO_PARENT: "sendUTIDToParent",
    GET_UFID_FROM_IFRAME: "getUFIDFromIframe",
    SEND_UFID_TO_PARENT: "sendUFIDToParent",
    GET_THIRD_PARTY_COOKIE_STATUS_FROM_IFRAME: "getThirdPartyCookieStatusFromIframe",
    SEND_THIRD_PARTY_COOKIE_STATUS_TO_PARENT: "sendThirdPartyCookieStatusToParent"
  };
  const NOTIFICATION_EVENT_LIST = {
    OTP_VERIFIED: "otp_verified"
  };
  const LOCALSTORAGE_KEY = "__uc_site";
  const UMID_IDENTIFICATION_VERIFICATION_CHANNEL_MAP = {
    WIGZO: false,
    PROMISE: false,
    ENGAGE: false,
    TRACKING_PAGE: true,
    CHECKOUT: true,
    MY_SR: true
  };
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
  function directRemove(_key) {
    localStorage.removeItem(_key);
  }
  const LocalStorageService = {
    set: wSet,
    get: wget,
    clear,
    remove: wRemove,
    len,
    directSet,
    directGet,
    directRemove
  };
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
  function getChannelNameFromId(channel_id) {
    const foundKey = Object.keys(CHANNEL_BINARY_VALUE).find(
      (key) => CHANNEL_BINARY_VALUE[key].toString() === channel_id.toString()
    );
    return foundKey;
  }
  function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome")) return "Chrome";
    else if (userAgent.includes("Firefox")) return "Firefox";
    else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
    else if (userAgent.includes("Edge")) return "Edge";
    else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) return "Internet Explorer";
    else return "Unknown";
  }
  function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|tablet/i.test(userAgent)) return "Mobile";
    return "Laptop";
  }
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
  function getUMIDIdentificationSource() {
    return LocalStorageService.get(CONSTANTS.UMID_IDENTIFICATION_SOURCE);
  }
  function setUMIDIdentificationSource(value) {
    LocalStorageService.set(CONSTANTS.UMID_IDENTIFICATION_SOURCE, value);
  }
  function setUMIDIdentificationTime(value) {
    LocalStorageService.set(CONSTANTS.UMID_IDENTIFICATION_TIME, value);
  }
  function getUMIDIdentificationTime(value) {
    return LocalStorageService.get(CONSTANTS.UMID_IDENTIFICATION_TIME);
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
  function getOldUserProfile() {
    return LocalStorageService.directGet(CONSTANTS.OLD_USER_PROFILE);
  }
  function removeOldUserProfile() {
    return LocalStorageService.directRemove(CONSTANTS.OLD_USER_PROFILE);
  }
  function getThirdPartyCookieStatus() {
    return LocalStorageService.get(CONSTANTS.THIRD_PARTY_COOKIE_BLOCKED);
  }
  function setThirdPartyCookieStatus(value) {
    LocalStorageService.set(CONSTANTS.THIRD_PARTY_COOKIE_BLOCKED, value);
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
    getUMIDIdentificationSource,
    setUMIDIdentificationSource,
    getUMIDIdentificationTime,
    setUMIDIdentificationTime,
    getUEID,
    setUEID,
    removeTrackInfo,
    setUP,
    getUP,
    getUserMobileValue,
    getUWID,
    setUWID,
    getPrivateMode,
    setPrivateMode,
    getOldUserProfile,
    removeOldUserProfile,
    getThirdPartyCookieStatus,
    setThirdPartyCookieStatus
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
    var _a2;
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
      [CONSTANTS_MAPPING.INCOGNITO]: gsService.getPrivateMode(),
      [CONSTANTS_MAPPING.THIRD_PARTY_COOKIE_BLOCKED]: gsService.getThirdPartyCookieStatus(),
      [CONSTANTS_MAPPING.BROWSER_NAME]: getBrowserName(),
      [CONSTANTS_MAPPING.BROWSER_NAME]: getDeviceType()
    };
    const UMIDIS = gsService.getUMIDIdentificationSource();
    if (UMIDIS) {
      apiData[CONSTANTS_MAPPING.UMID_IDENTIFICATION_SOURCE] = UMIDIS;
      const UMIDIT = gsService.getUMIDIdentificationTime();
      if (UMIDIT) {
        apiData[CONSTANTS_MAPPING.UMID_IDENTIFICATION_TIME] = UMIDIT;
      }
      const channelVerifiedStatus = (_a2 = getChannelNameFromId(UMIDIS)) == null ? void 0 : _a2.toUpperCase();
      if (channelVerifiedStatus) {
        apiData[CONSTANTS_MAPPING.UMID_IDENTIFICATION_VERIFIED] = UMID_IDENTIFICATION_VERIFICATION_CHANNEL_MAP[channelVerifiedStatus];
      }
    }
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
      self.iframe.src = "https://sr-cdn.shiprocket.in/sr-promise/static/iframe.html";
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
  let sendUDIDToIframe = (udid) => {
    postMessageMethod(MESSAGE_EVENT_LIST.SEND_UDID_TO_IFRAME, udid);
  };
  let getUTIDFromIframe = () => {
    postMessageMethod(MESSAGE_EVENT_LIST.GET_UTID_FROM_IFRAME);
  };
  let getUFIDFromIframe = () => {
    postMessageMethod(MESSAGE_EVENT_LIST.GET_UFID_FROM_IFRAME);
  };
  let getThirdPartyCookieStatusFromIframe = () => {
    postMessageMethod(
      MESSAGE_EVENT_LIST.GET_THIRD_PARTY_COOKIE_STATUS_FROM_IFRAME
    );
  };
  let handleMessageEvent = (event) => {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
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
      case MESSAGE_EVENT_LIST.SEND_THIRD_PARTY_COOKIE_STATUS_TO_PARENT: {
        gsService.setThirdPartyCookieStatus((_k = event == null ? void 0 : event.data) == null ? void 0 : _k.data);
        break;
      }
    }
  };
  function getUserInfo(userMobileValue) {
    return new Promise((resolve, reject) => {
      let base_url = "https://uc.shiprocket.in";
      let url = base_url + "/v1/user/info?mid=" + userMobileValue;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      }).then((response) => {
        if (!response.ok) {
          reject(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }).then((data) => resolve(data)).catch((error) => reject(error));
    });
  }
  function getUserInfoWithCallback(userMobileValue, successCallback, errorCallback) {
    var base_url = "https://uc.shiprocket.in";
    var url = base_url + "/v1/user/info?mid=" + userMobileValue;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            var data = JSON.parse(xhr.responseText);
            successCallback(data);
          } catch (error) {
            errorCallback(error);
          }
        } else {
          errorCallback("HTTP error! status: " + xhr.status);
        }
      }
    };
    xhr.send();
  }
  var FingerprintJS = function(exports3) {
    var __assign = function() {
      __assign = Object.assign || function __assign2(t2) {
        for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
          s2 = arguments[i2];
          for (var p in s2)
            if (Object.prototype.hasOwnProperty.call(s2, p)) t2[p] = s2[p];
        }
        return t2;
      };
      return __assign.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve) {
          resolve(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, [])).next());
      });
    }
    function __generator(thisArg, body) {
      var _2 = {
        label: 0,
        sent: function() {
          if (t2[0] & 1) throw t2[1];
          return t2[1];
        },
        trys: [],
        ops: []
      }, f2, y2, t2, g2;
      return g2 = { next: verb(0), throw: verb(1), return: verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
        return this;
      }), g2;
      function verb(n2) {
        return function(v2) {
          return step([n2, v2]);
        };
      }
      function step(op) {
        if (f2) throw new TypeError("Generator is already executing.");
        while (g2 && (g2 = 0, op[0] && (_2 = 0)), _2)
          try {
            if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
              return t2;
            if (y2 = 0, t2) op = [op[0] & 2, t2.value];
            switch (op[0]) {
              case 0:
              case 1:
                t2 = op;
                break;
              case 4:
                _2.label++;
                return { value: op[1], done: false };
              case 5:
                _2.label++;
                y2 = op[1];
                op = [0];
                continue;
              case 7:
                op = _2.ops.pop();
                _2.trys.pop();
                continue;
              default:
                if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _2 = 0;
                  continue;
                }
                if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                  _2.label = op[1];
                  break;
                }
                if (op[0] === 6 && _2.label < t2[1]) {
                  _2.label = t2[1];
                  t2 = op;
                  break;
                }
                if (t2 && _2.label < t2[2]) {
                  _2.label = t2[2];
                  _2.ops.push(op);
                  break;
                }
                if (t2[2]) _2.ops.pop();
                _2.trys.pop();
                continue;
            }
            op = body.call(thisArg, _2);
          } catch (e2) {
            op = [6, e2];
            y2 = 0;
          } finally {
            f2 = t2 = 0;
          }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    }
    function __spreadArray(to, from, pack) {
      for (var i2 = 0, l2 = from.length, ar; i2 < l2; i2++) {
        if (ar || !(i2 in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
          ar[i2] = from[i2];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    }
    var version = "3.4.2";
    function wait(durationMs, resolveWith) {
      return new Promise(function(resolve) {
        return setTimeout(resolve, durationMs, resolveWith);
      });
    }
    function requestIdleCallbackIfAvailable(fallbackTimeout, deadlineTimeout) {
      if (deadlineTimeout === void 0) {
        deadlineTimeout = Infinity;
      }
      var requestIdleCallback = window.requestIdleCallback;
      if (requestIdleCallback) {
        return new Promise(function(resolve) {
          return requestIdleCallback.call(
            window,
            function() {
              return resolve();
            },
            { timeout: deadlineTimeout }
          );
        });
      } else {
        return wait(Math.min(fallbackTimeout, deadlineTimeout));
      }
    }
    function isPromise(value) {
      return !!value && typeof value.then === "function";
    }
    function awaitIfAsync(action, callback) {
      try {
        var returnedValue = action();
        if (isPromise(returnedValue)) {
          returnedValue.then(
            function(result) {
              return callback(true, result);
            },
            function(error) {
              return callback(false, error);
            }
          );
        } else {
          callback(true, returnedValue);
        }
      } catch (error) {
        callback(false, error);
      }
    }
    function mapWithBreaks(items, callback, loopReleaseInterval) {
      if (loopReleaseInterval === void 0) {
        loopReleaseInterval = 16;
      }
      return __awaiter(this, void 0, void 0, function() {
        var results, lastLoopReleaseTime, i2, now;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              results = Array(items.length);
              lastLoopReleaseTime = Date.now();
              i2 = 0;
              _a2.label = 1;
            case 1:
              if (!(i2 < items.length)) return [3, 4];
              results[i2] = callback(items[i2], i2);
              now = Date.now();
              if (!(now >= lastLoopReleaseTime + loopReleaseInterval))
                return [3, 3];
              lastLoopReleaseTime = now;
              return [4, wait(0)];
            case 2:
              _a2.sent();
              _a2.label = 3;
            case 3:
              ++i2;
              return [3, 1];
            case 4:
              return [2, results];
          }
        });
      });
    }
    function suppressUnhandledRejectionWarning(promise) {
      promise.then(void 0, function() {
        return void 0;
      });
    }
    function x64Add(m2, n2) {
      m2 = [m2[0] >>> 16, m2[0] & 65535, m2[1] >>> 16, m2[1] & 65535];
      n2 = [n2[0] >>> 16, n2[0] & 65535, n2[1] >>> 16, n2[1] & 65535];
      var o2 = [0, 0, 0, 0];
      o2[3] += m2[3] + n2[3];
      o2[2] += o2[3] >>> 16;
      o2[3] &= 65535;
      o2[2] += m2[2] + n2[2];
      o2[1] += o2[2] >>> 16;
      o2[2] &= 65535;
      o2[1] += m2[1] + n2[1];
      o2[0] += o2[1] >>> 16;
      o2[1] &= 65535;
      o2[0] += m2[0] + n2[0];
      o2[0] &= 65535;
      return [o2[0] << 16 | o2[1], o2[2] << 16 | o2[3]];
    }
    function x64Multiply(m2, n2) {
      m2 = [m2[0] >>> 16, m2[0] & 65535, m2[1] >>> 16, m2[1] & 65535];
      n2 = [n2[0] >>> 16, n2[0] & 65535, n2[1] >>> 16, n2[1] & 65535];
      var o2 = [0, 0, 0, 0];
      o2[3] += m2[3] * n2[3];
      o2[2] += o2[3] >>> 16;
      o2[3] &= 65535;
      o2[2] += m2[2] * n2[3];
      o2[1] += o2[2] >>> 16;
      o2[2] &= 65535;
      o2[2] += m2[3] * n2[2];
      o2[1] += o2[2] >>> 16;
      o2[2] &= 65535;
      o2[1] += m2[1] * n2[3];
      o2[0] += o2[1] >>> 16;
      o2[1] &= 65535;
      o2[1] += m2[2] * n2[2];
      o2[0] += o2[1] >>> 16;
      o2[1] &= 65535;
      o2[1] += m2[3] * n2[1];
      o2[0] += o2[1] >>> 16;
      o2[1] &= 65535;
      o2[0] += m2[0] * n2[3] + m2[1] * n2[2] + m2[2] * n2[1] + m2[3] * n2[0];
      o2[0] &= 65535;
      return [o2[0] << 16 | o2[1], o2[2] << 16 | o2[3]];
    }
    function x64Rotl(m2, n2) {
      n2 %= 64;
      if (n2 === 32) {
        return [m2[1], m2[0]];
      } else if (n2 < 32) {
        return [
          m2[0] << n2 | m2[1] >>> 32 - n2,
          m2[1] << n2 | m2[0] >>> 32 - n2
        ];
      } else {
        n2 -= 32;
        return [
          m2[1] << n2 | m2[0] >>> 32 - n2,
          m2[0] << n2 | m2[1] >>> 32 - n2
        ];
      }
    }
    function x64LeftShift(m2, n2) {
      n2 %= 64;
      if (n2 === 0) {
        return m2;
      } else if (n2 < 32) {
        return [m2[0] << n2 | m2[1] >>> 32 - n2, m2[1] << n2];
      } else {
        return [m2[1] << n2 - 32, 0];
      }
    }
    function x64Xor(m2, n2) {
      return [m2[0] ^ n2[0], m2[1] ^ n2[1]];
    }
    function x64Fmix(h2) {
      h2 = x64Xor(h2, [0, h2[0] >>> 1]);
      h2 = x64Multiply(h2, [4283543511, 3981806797]);
      h2 = x64Xor(h2, [0, h2[0] >>> 1]);
      h2 = x64Multiply(h2, [3301882366, 444984403]);
      h2 = x64Xor(h2, [0, h2[0] >>> 1]);
      return h2;
    }
    function x64hash128(key, seed) {
      key = key || "";
      seed = seed || 0;
      var remainder = key.length % 16;
      var bytes = key.length - remainder;
      var h1 = [0, seed];
      var h2 = [0, seed];
      var k1 = [0, 0];
      var k2 = [0, 0];
      var c1 = [2277735313, 289559509];
      var c2 = [1291169091, 658871167];
      var i2;
      for (i2 = 0; i2 < bytes; i2 = i2 + 16) {
        k1 = [
          key.charCodeAt(i2 + 4) & 255 | (key.charCodeAt(i2 + 5) & 255) << 8 | (key.charCodeAt(i2 + 6) & 255) << 16 | (key.charCodeAt(i2 + 7) & 255) << 24,
          key.charCodeAt(i2) & 255 | (key.charCodeAt(i2 + 1) & 255) << 8 | (key.charCodeAt(i2 + 2) & 255) << 16 | (key.charCodeAt(i2 + 3) & 255) << 24
        ];
        k2 = [
          key.charCodeAt(i2 + 12) & 255 | (key.charCodeAt(i2 + 13) & 255) << 8 | (key.charCodeAt(i2 + 14) & 255) << 16 | (key.charCodeAt(i2 + 15) & 255) << 24,
          key.charCodeAt(i2 + 8) & 255 | (key.charCodeAt(i2 + 9) & 255) << 8 | (key.charCodeAt(i2 + 10) & 255) << 16 | (key.charCodeAt(i2 + 11) & 255) << 24
        ];
        k1 = x64Multiply(k1, c1);
        k1 = x64Rotl(k1, 31);
        k1 = x64Multiply(k1, c2);
        h1 = x64Xor(h1, k1);
        h1 = x64Rotl(h1, 27);
        h1 = x64Add(h1, h2);
        h1 = x64Add(x64Multiply(h1, [0, 5]), [0, 1390208809]);
        k2 = x64Multiply(k2, c2);
        k2 = x64Rotl(k2, 33);
        k2 = x64Multiply(k2, c1);
        h2 = x64Xor(h2, k2);
        h2 = x64Rotl(h2, 31);
        h2 = x64Add(h2, h1);
        h2 = x64Add(x64Multiply(h2, [0, 5]), [0, 944331445]);
      }
      k1 = [0, 0];
      k2 = [0, 0];
      switch (remainder) {
        case 15:
          k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i2 + 14)], 48));
        case 14:
          k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i2 + 13)], 40));
        case 13:
          k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i2 + 12)], 32));
        case 12:
          k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i2 + 11)], 24));
        case 11:
          k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i2 + 10)], 16));
        case 10:
          k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i2 + 9)], 8));
        case 9:
          k2 = x64Xor(k2, [0, key.charCodeAt(i2 + 8)]);
          k2 = x64Multiply(k2, c2);
          k2 = x64Rotl(k2, 33);
          k2 = x64Multiply(k2, c1);
          h2 = x64Xor(h2, k2);
        case 8:
          k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i2 + 7)], 56));
        case 7:
          k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i2 + 6)], 48));
        case 6:
          k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i2 + 5)], 40));
        case 5:
          k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i2 + 4)], 32));
        case 4:
          k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i2 + 3)], 24));
        case 3:
          k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i2 + 2)], 16));
        case 2:
          k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i2 + 1)], 8));
        case 1:
          k1 = x64Xor(k1, [0, key.charCodeAt(i2)]);
          k1 = x64Multiply(k1, c1);
          k1 = x64Rotl(k1, 31);
          k1 = x64Multiply(k1, c2);
          h1 = x64Xor(h1, k1);
      }
      h1 = x64Xor(h1, [0, key.length]);
      h2 = x64Xor(h2, [0, key.length]);
      h1 = x64Add(h1, h2);
      h2 = x64Add(h2, h1);
      h1 = x64Fmix(h1);
      h2 = x64Fmix(h2);
      h1 = x64Add(h1, h2);
      h2 = x64Add(h2, h1);
      return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
    }
    function errorToObject(error) {
      var _a2;
      return __assign(
        {
          name: error.name,
          message: error.message,
          stack: (_a2 = error.stack) === null || _a2 === void 0 ? void 0 : _a2.split("\n")
        },
        error
      );
    }
    function includes(haystack, needle) {
      for (var i2 = 0, l2 = haystack.length; i2 < l2; ++i2) {
        if (haystack[i2] === needle) {
          return true;
        }
      }
      return false;
    }
    function excludes(haystack, needle) {
      return !includes(haystack, needle);
    }
    function toInt(value) {
      return parseInt(value);
    }
    function toFloat(value) {
      return parseFloat(value);
    }
    function replaceNaN(value, replacement) {
      return typeof value === "number" && isNaN(value) ? replacement : value;
    }
    function countTruthy(values) {
      return values.reduce(function(sum, value) {
        return sum + (value ? 1 : 0);
      }, 0);
    }
    function round(value, base) {
      if (base === void 0) {
        base = 1;
      }
      if (Math.abs(base) >= 1) {
        return Math.round(value / base) * base;
      } else {
        var counterBase = 1 / base;
        return Math.round(value * counterBase) / counterBase;
      }
    }
    function parseSimpleCssSelector(selector) {
      var _a2, _b;
      var errorMessage = "Unexpected syntax '".concat(selector, "'");
      var tagMatch = /^\s*([a-z-]*)(.*)$/i.exec(selector);
      var tag = tagMatch[1] || void 0;
      var attributes = {};
      var partsRegex = /([.:#][\w-]+|\[.+?\])/gi;
      var addAttribute = function(name, value) {
        attributes[name] = attributes[name] || [];
        attributes[name].push(value);
      };
      for (; ; ) {
        var match = partsRegex.exec(tagMatch[2]);
        if (!match) {
          break;
        }
        var part = match[0];
        switch (part[0]) {
          case ".":
            addAttribute("class", part.slice(1));
            break;
          case "#":
            addAttribute("id", part.slice(1));
            break;
          case "[": {
            var attributeMatch = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(part);
            if (attributeMatch) {
              addAttribute(
                attributeMatch[1],
                (_b = (_a2 = attributeMatch[4]) !== null && _a2 !== void 0 ? _a2 : attributeMatch[5]) !== null && _b !== void 0 ? _b : ""
              );
            } else {
              throw new Error(errorMessage);
            }
            break;
          }
          default:
            throw new Error(errorMessage);
        }
      }
      return [tag, attributes];
    }
    function ensureErrorWithMessage(error) {
      return error && typeof error === "object" && "message" in error ? error : { message: error };
    }
    function isFinalResultLoaded(loadResult) {
      return typeof loadResult !== "function";
    }
    function loadSource(source, sourceOptions) {
      var sourceLoadPromise = new Promise(function(resolveLoad) {
        var loadStartTime = Date.now();
        awaitIfAsync(source.bind(null, sourceOptions), function() {
          var loadArgs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            loadArgs[_i] = arguments[_i];
          }
          var loadDuration = Date.now() - loadStartTime;
          if (!loadArgs[0]) {
            return resolveLoad(function() {
              return {
                error: ensureErrorWithMessage(loadArgs[1]),
                duration: loadDuration
              };
            });
          }
          var loadResult = loadArgs[1];
          if (isFinalResultLoaded(loadResult)) {
            return resolveLoad(function() {
              return { value: loadResult, duration: loadDuration };
            });
          }
          resolveLoad(function() {
            return new Promise(function(resolveGet) {
              var getStartTime = Date.now();
              awaitIfAsync(loadResult, function() {
                var getArgs = [];
                for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                  getArgs[_i2] = arguments[_i2];
                }
                var duration = loadDuration + Date.now() - getStartTime;
                if (!getArgs[0]) {
                  return resolveGet({
                    error: ensureErrorWithMessage(getArgs[1]),
                    duration
                  });
                }
                resolveGet({ value: getArgs[1], duration });
              });
            });
          });
        });
      });
      suppressUnhandledRejectionWarning(sourceLoadPromise);
      return function getComponent() {
        return sourceLoadPromise.then(function(finalizeSource) {
          return finalizeSource();
        });
      };
    }
    function loadSources(sources2, sourceOptions, excludeSources) {
      var includedSources = Object.keys(sources2).filter(function(sourceKey) {
        return excludes(excludeSources, sourceKey);
      });
      var sourceGettersPromise = mapWithBreaks(
        includedSources,
        function(sourceKey) {
          return loadSource(sources2[sourceKey], sourceOptions);
        }
      );
      suppressUnhandledRejectionWarning(sourceGettersPromise);
      return function getComponents() {
        return __awaiter(this, void 0, void 0, function() {
          var sourceGetters, componentPromises, componentArray, components, index2;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                return [4, sourceGettersPromise];
              case 1:
                sourceGetters = _a2.sent();
                return [
                  4,
                  mapWithBreaks(sourceGetters, function(sourceGetter) {
                    var componentPromise = sourceGetter();
                    suppressUnhandledRejectionWarning(componentPromise);
                    return componentPromise;
                  })
                ];
              case 2:
                componentPromises = _a2.sent();
                return [
                  4,
                  Promise.all(componentPromises)
                  // Keeping the component keys order the same as the source keys order
                ];
              case 3:
                componentArray = _a2.sent();
                components = {};
                for (index2 = 0; index2 < includedSources.length; ++index2) {
                  components[includedSources[index2]] = componentArray[index2];
                }
                return [2, components];
            }
          });
        });
      };
    }
    function transformSource(source, transformValue) {
      var transformLoadResult = function(loadResult) {
        if (isFinalResultLoaded(loadResult)) {
          return transformValue(loadResult);
        }
        return function() {
          var getResult = loadResult();
          if (isPromise(getResult)) {
            return getResult.then(transformValue);
          }
          return transformValue(getResult);
        };
      };
      return function(options) {
        var loadResult = source(options);
        if (isPromise(loadResult)) {
          return loadResult.then(transformLoadResult);
        }
        return transformLoadResult(loadResult);
      };
    }
    function isTrident() {
      var w2 = window;
      var n2 = navigator;
      return countTruthy([
        "MSCSSMatrix" in w2,
        "msSetImmediate" in w2,
        "msIndexedDB" in w2,
        "msMaxTouchPoints" in n2,
        "msPointerEnabled" in n2
      ]) >= 4;
    }
    function isEdgeHTML() {
      var w2 = window;
      var n2 = navigator;
      return countTruthy([
        "msWriteProfilerMark" in w2,
        "MSStream" in w2,
        "msLaunchUri" in n2,
        "msSaveBlob" in n2
      ]) >= 3 && !isTrident();
    }
    function isChromium() {
      var w2 = window;
      var n2 = navigator;
      return countTruthy([
        "webkitPersistentStorage" in n2,
        "webkitTemporaryStorage" in n2,
        n2.vendor.indexOf("Google") === 0,
        "webkitResolveLocalFileSystemURL" in w2,
        "BatteryManager" in w2,
        "webkitMediaStream" in w2,
        "webkitSpeechGrammar" in w2
      ]) >= 5;
    }
    function isWebKit() {
      var w2 = window;
      var n2 = navigator;
      return countTruthy([
        "ApplePayError" in w2,
        "CSSPrimitiveValue" in w2,
        "Counter" in w2,
        n2.vendor.indexOf("Apple") === 0,
        "getStorageUpdates" in n2,
        "WebKitMediaKeys" in w2
      ]) >= 4;
    }
    function isDesktopSafari() {
      var w2 = window;
      return countTruthy([
        "safari" in w2,
        !("DeviceMotionEvent" in w2),
        !("ongestureend" in w2),
        !("standalone" in navigator)
      ]) >= 3;
    }
    function isGecko() {
      var _a2, _b;
      var w2 = window;
      return countTruthy([
        "buildID" in navigator,
        "MozAppearance" in ((_b = (_a2 = document.documentElement) === null || _a2 === void 0 ? void 0 : _a2.style) !== null && _b !== void 0 ? _b : {}),
        "onmozfullscreenchange" in w2,
        "mozInnerScreenX" in w2,
        "CSSMozDocumentRule" in w2,
        "CanvasCaptureMediaStream" in w2
      ]) >= 4;
    }
    function isChromium86OrNewer() {
      var w2 = window;
      return countTruthy([
        !("MediaSettingsRange" in w2),
        "RTCEncodedAudioFrame" in w2,
        "" + w2.Intl === "[object Intl]",
        "" + w2.Reflect === "[object Reflect]"
      ]) >= 3;
    }
    function isWebKit606OrNewer() {
      var w2 = window;
      return countTruthy([
        "DOMRectList" in w2,
        "RTCPeerConnectionIceEvent" in w2,
        "SVGGeometryElement" in w2,
        "ontransitioncancel" in w2
      ]) >= 3;
    }
    function isIPad() {
      if (navigator.platform === "iPad") {
        return true;
      }
      var s2 = screen;
      var screenRatio = s2.width / s2.height;
      return countTruthy([
        "MediaSource" in window,
        !!Element.prototype.webkitRequestFullscreen,
        // iPhone 4S that runs iOS 9 matches this. But it won't match the criteria above, so it won't be detected as iPad.
        screenRatio > 0.65 && screenRatio < 1.53
      ]) >= 2;
    }
    function getFullscreenElement() {
      var d2 = document;
      return d2.fullscreenElement || d2.msFullscreenElement || d2.mozFullScreenElement || d2.webkitFullscreenElement || null;
    }
    function exitFullscreen() {
      var d2 = document;
      return (d2.exitFullscreen || d2.msExitFullscreen || d2.mozCancelFullScreen || d2.webkitExitFullscreen).call(d2);
    }
    function isAndroid() {
      var isItChromium = isChromium();
      var isItGecko = isGecko();
      if (!isItChromium && !isItGecko) {
        return false;
      }
      var w2 = window;
      return countTruthy([
        "onorientationchange" in w2,
        "orientation" in w2,
        isItChromium && !("SharedWorker" in w2),
        isItGecko && /android/i.test(navigator.appVersion)
      ]) >= 2;
    }
    function getAudioFingerprint() {
      var w2 = window;
      var AudioContext = w2.OfflineAudioContext || w2.webkitOfflineAudioContext;
      if (!AudioContext) {
        return -2;
      }
      if (doesCurrentBrowserSuspendAudioContext()) {
        return -1;
      }
      var hashFromIndex = 4500;
      var hashToIndex = 5e3;
      var context = new AudioContext(1, hashToIndex, 44100);
      var oscillator = context.createOscillator();
      oscillator.type = "triangle";
      oscillator.frequency.value = 1e4;
      var compressor = context.createDynamicsCompressor();
      compressor.threshold.value = -50;
      compressor.knee.value = 40;
      compressor.ratio.value = 12;
      compressor.attack.value = 0;
      compressor.release.value = 0.25;
      oscillator.connect(compressor);
      compressor.connect(context.destination);
      oscillator.start(0);
      var _a2 = startRenderingAudio(context), renderPromise = _a2[0], finishRendering = _a2[1];
      var fingerprintPromise = renderPromise.then(
        function(buffer) {
          return getHash(buffer.getChannelData(0).subarray(hashFromIndex));
        },
        function(error) {
          if (error.name === "timeout" || error.name === "suspended") {
            return -3;
          }
          throw error;
        }
      );
      suppressUnhandledRejectionWarning(fingerprintPromise);
      return function() {
        finishRendering();
        return fingerprintPromise;
      };
    }
    function doesCurrentBrowserSuspendAudioContext() {
      return isWebKit() && !isDesktopSafari() && !isWebKit606OrNewer();
    }
    function startRenderingAudio(context) {
      var renderTryMaxCount = 3;
      var renderRetryDelay = 500;
      var runningMaxAwaitTime = 500;
      var runningSufficientTime = 5e3;
      var finalize = function() {
        return void 0;
      };
      var resultPromise = new Promise(function(resolve, reject) {
        var isFinalized = false;
        var renderTryCount = 0;
        var startedRunningAt = 0;
        context.oncomplete = function(event) {
          return resolve(event.renderedBuffer);
        };
        var startRunningTimeout = function() {
          setTimeout(
            function() {
              return reject(
                makeInnerError(
                  "timeout"
                  /* InnerErrorName.Timeout */
                )
              );
            },
            Math.min(
              runningMaxAwaitTime,
              startedRunningAt + runningSufficientTime - Date.now()
            )
          );
        };
        var tryRender = function() {
          try {
            var renderingPromise = context.startRendering();
            if (isPromise(renderingPromise)) {
              suppressUnhandledRejectionWarning(renderingPromise);
            }
            switch (context.state) {
              case "running":
                startedRunningAt = Date.now();
                if (isFinalized) {
                  startRunningTimeout();
                }
                break;
              case "suspended":
                if (!document.hidden) {
                  renderTryCount++;
                }
                if (isFinalized && renderTryCount >= renderTryMaxCount) {
                  reject(
                    makeInnerError(
                      "suspended"
                      /* InnerErrorName.Suspended */
                    )
                  );
                } else {
                  setTimeout(tryRender, renderRetryDelay);
                }
                break;
            }
          } catch (error) {
            reject(error);
          }
        };
        tryRender();
        finalize = function() {
          if (!isFinalized) {
            isFinalized = true;
            if (startedRunningAt > 0) {
              startRunningTimeout();
            }
          }
        };
      });
      return [resultPromise, finalize];
    }
    function getHash(signal) {
      var hash = 0;
      for (var i2 = 0; i2 < signal.length; ++i2) {
        hash += Math.abs(signal[i2]);
      }
      return hash;
    }
    function makeInnerError(name) {
      var error = new Error(name);
      error.name = name;
      return error;
    }
    function withIframe(action, initialHtml, domPollInterval) {
      var _a2, _b, _c;
      if (domPollInterval === void 0) {
        domPollInterval = 50;
      }
      return __awaiter(this, void 0, void 0, function() {
        var d2, iframe2;
        return __generator(this, function(_d) {
          switch (_d.label) {
            case 0:
              d2 = document;
              _d.label = 1;
            case 1:
              if (!!d2.body) return [3, 3];
              return [4, wait(domPollInterval)];
            case 2:
              _d.sent();
              return [3, 1];
            case 3:
              iframe2 = d2.createElement("iframe");
              _d.label = 4;
            case 4:
              _d.trys.push([4, , 10, 11]);
              return [
                4,
                new Promise(function(_resolve, _reject) {
                  var isComplete = false;
                  var resolve = function() {
                    isComplete = true;
                    _resolve();
                  };
                  var reject = function(error) {
                    isComplete = true;
                    _reject(error);
                  };
                  iframe2.onload = resolve;
                  iframe2.onerror = reject;
                  var style = iframe2.style;
                  style.setProperty("display", "block", "important");
                  style.position = "absolute";
                  style.top = "0";
                  style.left = "0";
                  style.visibility = "hidden";
                  if (initialHtml && "srcdoc" in iframe2) {
                    iframe2.srcdoc = initialHtml;
                  } else {
                    iframe2.src = "about:blank";
                  }
                  d2.body.appendChild(iframe2);
                  var checkReadyState = function() {
                    var _a3, _b2;
                    if (isComplete) {
                      return;
                    }
                    if (((_b2 = (_a3 = iframe2.contentWindow) === null || _a3 === void 0 ? void 0 : _a3.document) === null || _b2 === void 0 ? void 0 : _b2.readyState) === "complete") {
                      resolve();
                    } else {
                      setTimeout(checkReadyState, 10);
                    }
                  };
                  checkReadyState();
                })
              ];
            case 5:
              _d.sent();
              _d.label = 6;
            case 6:
              if (!!((_b = (_a2 = iframe2.contentWindow) === null || _a2 === void 0 ? void 0 : _a2.document) === null || _b === void 0 ? void 0 : _b.body))
                return [3, 8];
              return [4, wait(domPollInterval)];
            case 7:
              _d.sent();
              return [3, 6];
            case 8:
              return [4, action(iframe2, iframe2.contentWindow)];
            case 9:
              return [2, _d.sent()];
            case 10:
              (_c = iframe2.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(iframe2);
              return [
                7
                /*endfinally*/
              ];
            case 11:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }
    function selectorToElement(selector) {
      var _a2 = parseSimpleCssSelector(selector), tag = _a2[0], attributes = _a2[1];
      var element = document.createElement(
        tag !== null && tag !== void 0 ? tag : "div"
      );
      for (var _i = 0, _b = Object.keys(attributes); _i < _b.length; _i++) {
        var name_1 = _b[_i];
        var value = attributes[name_1].join(" ");
        if (name_1 === "style") {
          addStyleString(element.style, value);
        } else {
          element.setAttribute(name_1, value);
        }
      }
      return element;
    }
    function addStyleString(style, source) {
      for (var _i = 0, _a2 = source.split(";"); _i < _a2.length; _i++) {
        var property = _a2[_i];
        var match = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(property);
        if (match) {
          var name_2 = match[1], value = match[2], priority = match[4];
          style.setProperty(name_2, value, priority || "");
        }
      }
    }
    var testString = "mmMwWLliI0O&1";
    var textSize = "48px";
    var baseFonts = ["monospace", "sans-serif", "serif"];
    var fontList = [
      // This is android-specific font from "Roboto" family
      "sans-serif-thin",
      "ARNO PRO",
      "Agency FB",
      "Arabic Typesetting",
      "Arial Unicode MS",
      "AvantGarde Bk BT",
      "BankGothic Md BT",
      "Batang",
      "Bitstream Vera Sans Mono",
      "Calibri",
      "Century",
      "Century Gothic",
      "Clarendon",
      "EUROSTILE",
      "Franklin Gothic",
      "Futura Bk BT",
      "Futura Md BT",
      "GOTHAM",
      "Gill Sans",
      "HELV",
      "Haettenschweiler",
      "Helvetica Neue",
      "Humanst521 BT",
      "Leelawadee",
      "Letter Gothic",
      "Levenim MT",
      "Lucida Bright",
      "Lucida Sans",
      "Menlo",
      "MS Mincho",
      "MS Outlook",
      "MS Reference Specialty",
      "MS UI Gothic",
      "MT Extra",
      "MYRIAD PRO",
      "Marlett",
      "Meiryo UI",
      "Microsoft Uighur",
      "Minion Pro",
      "Monotype Corsiva",
      "PMingLiU",
      "Pristina",
      "SCRIPTINA",
      "Segoe UI Light",
      "Serifa",
      "SimHei",
      "Small Fonts",
      "Staccato222 BT",
      "TRAJAN PRO",
      "Univers CE 55 Medium",
      "Vrinda",
      "ZWAdobeF"
    ];
    function getFonts() {
      return withIframe(function(_2, _a2) {
        var document2 = _a2.document;
        var holder = document2.body;
        holder.style.fontSize = textSize;
        var spansContainer = document2.createElement("div");
        var defaultWidth = {};
        var defaultHeight = {};
        var createSpan = function(fontFamily) {
          var span = document2.createElement("span");
          var style = span.style;
          style.position = "absolute";
          style.top = "0";
          style.left = "0";
          style.fontFamily = fontFamily;
          span.textContent = testString;
          spansContainer.appendChild(span);
          return span;
        };
        var createSpanWithFonts = function(fontToDetect, baseFont) {
          return createSpan("'".concat(fontToDetect, "',").concat(baseFont));
        };
        var initializeBaseFontsSpans = function() {
          return baseFonts.map(createSpan);
        };
        var initializeFontsSpans = function() {
          var spans = {};
          var _loop_1 = function(font2) {
            spans[font2] = baseFonts.map(function(baseFont) {
              return createSpanWithFonts(font2, baseFont);
            });
          };
          for (var _i = 0, fontList_1 = fontList; _i < fontList_1.length; _i++) {
            var font = fontList_1[_i];
            _loop_1(font);
          }
          return spans;
        };
        var isFontAvailable = function(fontSpans) {
          return baseFonts.some(function(baseFont, baseFontIndex) {
            return fontSpans[baseFontIndex].offsetWidth !== defaultWidth[baseFont] || fontSpans[baseFontIndex].offsetHeight !== defaultHeight[baseFont];
          });
        };
        var baseFontsSpans = initializeBaseFontsSpans();
        var fontsSpans = initializeFontsSpans();
        holder.appendChild(spansContainer);
        for (var index2 = 0; index2 < baseFonts.length; index2++) {
          defaultWidth[baseFonts[index2]] = baseFontsSpans[index2].offsetWidth;
          defaultHeight[baseFonts[index2]] = baseFontsSpans[index2].offsetHeight;
        }
        return fontList.filter(function(font) {
          return isFontAvailable(fontsSpans[font]);
        });
      });
    }
    function getPlugins() {
      var rawPlugins = navigator.plugins;
      if (!rawPlugins) {
        return void 0;
      }
      var plugins = [];
      for (var i2 = 0; i2 < rawPlugins.length; ++i2) {
        var plugin = rawPlugins[i2];
        if (!plugin) {
          continue;
        }
        var mimeTypes = [];
        for (var j2 = 0; j2 < plugin.length; ++j2) {
          var mimeType = plugin[j2];
          mimeTypes.push({
            type: mimeType.type,
            suffixes: mimeType.suffixes
          });
        }
        plugins.push({
          name: plugin.name,
          description: plugin.description,
          mimeTypes
        });
      }
      return plugins;
    }
    function getCanvasFingerprint() {
      var winding = false;
      var geometry;
      var text;
      var _a2 = makeCanvasContext(), canvas = _a2[0], context = _a2[1];
      if (!isSupported(canvas, context)) {
        geometry = text = "";
      } else {
        winding = doesSupportWinding(context);
        renderTextImage(canvas, context);
        var textImage1 = canvasToString(canvas);
        var textImage2 = canvasToString(canvas);
        if (textImage1 !== textImage2) {
          geometry = text = "unstable";
        } else {
          text = textImage1;
          renderGeometryImage(canvas, context);
          geometry = canvasToString(canvas);
        }
      }
      return { winding, geometry, text };
    }
    function makeCanvasContext() {
      var canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      return [canvas, canvas.getContext("2d")];
    }
    function isSupported(canvas, context) {
      return !!(context && canvas.toDataURL);
    }
    function doesSupportWinding(context) {
      context.rect(0, 0, 10, 10);
      context.rect(2, 2, 6, 6);
      return !context.isPointInPath(5, 5, "evenodd");
    }
    function renderTextImage(canvas, context) {
      canvas.width = 240;
      canvas.height = 60;
      context.textBaseline = "alphabetic";
      context.fillStyle = "#f60";
      context.fillRect(100, 1, 62, 20);
      context.fillStyle = "#069";
      context.font = '11pt "Times New Roman"';
      var printedText = "Cwm fjordbank gly ".concat(
        String.fromCharCode(55357, 56835)
      );
      context.fillText(printedText, 2, 15);
      context.fillStyle = "rgba(102, 204, 0, 0.2)";
      context.font = "18pt Arial";
      context.fillText(printedText, 4, 45);
    }
    function renderGeometryImage(canvas, context) {
      canvas.width = 122;
      canvas.height = 110;
      context.globalCompositeOperation = "multiply";
      for (var _i = 0, _a2 = [
        ["#f2f", 40, 40],
        ["#2ff", 80, 40],
        ["#ff2", 60, 80]
      ]; _i < _a2.length; _i++) {
        var _b = _a2[_i], color = _b[0], x2 = _b[1], y2 = _b[2];
        context.fillStyle = color;
        context.beginPath();
        context.arc(x2, y2, 40, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      }
      context.fillStyle = "#f9c";
      context.arc(60, 60, 60, 0, Math.PI * 2, true);
      context.arc(60, 60, 20, 0, Math.PI * 2, true);
      context.fill("evenodd");
    }
    function canvasToString(canvas) {
      return canvas.toDataURL();
    }
    function getTouchSupport() {
      var n2 = navigator;
      var maxTouchPoints = 0;
      var touchEvent;
      if (n2.maxTouchPoints !== void 0) {
        maxTouchPoints = toInt(n2.maxTouchPoints);
      } else if (n2.msMaxTouchPoints !== void 0) {
        maxTouchPoints = n2.msMaxTouchPoints;
      }
      try {
        document.createEvent("TouchEvent");
        touchEvent = true;
      } catch (_a2) {
        touchEvent = false;
      }
      var touchStart = "ontouchstart" in window;
      return {
        maxTouchPoints,
        touchEvent,
        touchStart
      };
    }
    function getOsCpu() {
      return navigator.oscpu;
    }
    function getLanguages() {
      var n2 = navigator;
      var result = [];
      var language = n2.language || n2.userLanguage || n2.browserLanguage || n2.systemLanguage;
      if (language !== void 0) {
        result.push([language]);
      }
      if (Array.isArray(n2.languages)) {
        if (!(isChromium() && isChromium86OrNewer())) {
          result.push(n2.languages);
        }
      } else if (typeof n2.languages === "string") {
        var languages = n2.languages;
        if (languages) {
          result.push(languages.split(","));
        }
      }
      return result;
    }
    function getColorDepth() {
      return window.screen.colorDepth;
    }
    function getDeviceMemory() {
      return replaceNaN(toFloat(navigator.deviceMemory), void 0);
    }
    function getScreenResolution() {
      var s2 = screen;
      var parseDimension = function(value) {
        return replaceNaN(toInt(value), null);
      };
      var dimensions = [parseDimension(s2.width), parseDimension(s2.height)];
      dimensions.sort().reverse();
      return dimensions;
    }
    var screenFrameCheckInterval = 2500;
    var roundingPrecision = 10;
    var screenFrameBackup;
    var screenFrameSizeTimeoutId;
    function watchScreenFrame() {
      if (screenFrameSizeTimeoutId !== void 0) {
        return;
      }
      var checkScreenFrame = function() {
        var frameSize = getCurrentScreenFrame();
        if (isFrameSizeNull(frameSize)) {
          screenFrameSizeTimeoutId = setTimeout(
            checkScreenFrame,
            screenFrameCheckInterval
          );
        } else {
          screenFrameBackup = frameSize;
          screenFrameSizeTimeoutId = void 0;
        }
      };
      checkScreenFrame();
    }
    function getScreenFrame() {
      var _this = this;
      watchScreenFrame();
      return function() {
        return __awaiter(_this, void 0, void 0, function() {
          var frameSize;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                frameSize = getCurrentScreenFrame();
                if (!isFrameSizeNull(frameSize)) return [3, 2];
                if (screenFrameBackup) {
                  return [
                    2,
                    __spreadArray([], screenFrameBackup)
                  ];
                }
                if (!getFullscreenElement()) return [3, 2];
                return [4, exitFullscreen()];
              case 1:
                _a2.sent();
                frameSize = getCurrentScreenFrame();
                _a2.label = 2;
              case 2:
                if (!isFrameSizeNull(frameSize)) {
                  screenFrameBackup = frameSize;
                }
                return [2, frameSize];
            }
          });
        });
      };
    }
    function getRoundedScreenFrame() {
      var _this = this;
      var screenFrameGetter = getScreenFrame();
      return function() {
        return __awaiter(_this, void 0, void 0, function() {
          var frameSize, processSize;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                return [4, screenFrameGetter()];
              case 1:
                frameSize = _a2.sent();
                processSize = function(sideSize) {
                  return sideSize === null ? null : round(sideSize, roundingPrecision);
                };
                return [
                  2,
                  [
                    processSize(frameSize[0]),
                    processSize(frameSize[1]),
                    processSize(frameSize[2]),
                    processSize(frameSize[3])
                  ]
                ];
            }
          });
        });
      };
    }
    function getCurrentScreenFrame() {
      var s2 = screen;
      return [
        replaceNaN(toFloat(s2.availTop), null),
        replaceNaN(
          toFloat(s2.width) - toFloat(s2.availWidth) - replaceNaN(toFloat(s2.availLeft), 0),
          null
        ),
        replaceNaN(
          toFloat(s2.height) - toFloat(s2.availHeight) - replaceNaN(toFloat(s2.availTop), 0),
          null
        ),
        replaceNaN(toFloat(s2.availLeft), null)
      ];
    }
    function isFrameSizeNull(frameSize) {
      for (var i2 = 0; i2 < 4; ++i2) {
        if (frameSize[i2]) {
          return false;
        }
      }
      return true;
    }
    function getHardwareConcurrency() {
      return replaceNaN(toInt(navigator.hardwareConcurrency), void 0);
    }
    function getTimezone() {
      var _a2;
      var DateTimeFormat = (_a2 = window.Intl) === null || _a2 === void 0 ? void 0 : _a2.DateTimeFormat;
      if (DateTimeFormat) {
        var timezone = new DateTimeFormat().resolvedOptions().timeZone;
        if (timezone) {
          return timezone;
        }
      }
      var offset = -getTimezoneOffset();
      return "UTC".concat(offset >= 0 ? "+" : "").concat(Math.abs(offset));
    }
    function getTimezoneOffset() {
      var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      return Math.max(
        // `getTimezoneOffset` returns a number as a string in some unidentified cases
        toFloat(new Date(currentYear, 0, 1).getTimezoneOffset()),
        toFloat(new Date(currentYear, 6, 1).getTimezoneOffset())
      );
    }
    function getSessionStorage() {
      try {
        return !!window.sessionStorage;
      } catch (error) {
        return true;
      }
    }
    function getLocalStorage() {
      try {
        return !!window.localStorage;
      } catch (e2) {
        return true;
      }
    }
    function getIndexedDB() {
      if (isTrident() || isEdgeHTML()) {
        return void 0;
      }
      try {
        return !!window.indexedDB;
      } catch (e2) {
        return true;
      }
    }
    function getOpenDatabase() {
      return !!window.openDatabase;
    }
    function getCpuClass() {
      return navigator.cpuClass;
    }
    function getPlatform() {
      var platform = navigator.platform;
      if (platform === "MacIntel") {
        if (isWebKit() && !isDesktopSafari()) {
          return isIPad() ? "iPad" : "iPhone";
        }
      }
      return platform;
    }
    function getVendor() {
      return navigator.vendor || "";
    }
    function getVendorFlavors() {
      var flavors = [];
      for (var _i = 0, _a2 = [
        // Blink and some browsers on iOS
        "chrome",
        // Safari on macOS
        "safari",
        // Chrome on iOS (checked in 85 on 13 and 87 on 14)
        "__crWeb",
        "__gCrWeb",
        // Yandex Browser on iOS, macOS and Android (checked in 21.2 on iOS 14, macOS and Android)
        "yandex",
        // Yandex Browser on iOS (checked in 21.2 on 14)
        "__yb",
        "__ybro",
        // Firefox on iOS (checked in 32 on 14)
        "__firefox__",
        // Edge on iOS (checked in 46 on 14)
        "__edgeTrackingPreventionStatistics",
        "webkit",
        // Opera Touch on iOS (checked in 2.6 on 14)
        "oprt",
        // Samsung Internet on Android (checked in 11.1)
        "samsungAr",
        // UC Browser on Android (checked in 12.10 and 13.0)
        "ucweb",
        "UCShellJava",
        // Puffin on Android (checked in 9.0)
        "puffinDevice"
        // UC on iOS and Opera on Android have no specific global variables
        // Edge for Android isn't checked
      ]; _i < _a2.length; _i++) {
        var key = _a2[_i];
        var value = window[key];
        if (value && typeof value === "object") {
          flavors.push(key);
        }
      }
      return flavors.sort();
    }
    function areCookiesEnabled() {
      var d2 = document;
      try {
        d2.cookie = "cookietest=1; SameSite=Strict;";
        var result = d2.cookie.indexOf("cookietest=") !== -1;
        d2.cookie = "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT";
        return result;
      } catch (e2) {
        return false;
      }
    }
    function getFilters() {
      var fromB64 = atob;
      return {
        abpIndo: [
          "#Iklan-Melayang",
          "#Kolom-Iklan-728",
          "#SidebarIklan-wrapper",
          '[title="ALIENBOLA" i]',
          fromB64("I0JveC1CYW5uZXItYWRz")
        ],
        abpvn: [
          ".quangcao",
          "#mobileCatfish",
          fromB64("LmNsb3NlLWFkcw=="),
          '[id^="bn_bottom_fixed_"]',
          "#pmadv"
        ],
        adBlockFinland: [
          ".mainostila",
          fromB64("LnNwb25zb3JpdA=="),
          ".ylamainos",
          fromB64("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"),
          fromB64("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")
        ],
        adBlockPersian: [
          "#navbar_notice_50",
          ".kadr",
          'TABLE[width="140px"]',
          "#divAgahi",
          fromB64("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd")
        ],
        adBlockWarningRemoval: [
          "#adblock-honeypot",
          ".adblocker-root",
          ".wp_adblock_detect",
          fromB64("LmhlYWRlci1ibG9ja2VkLWFk"),
          fromB64("I2FkX2Jsb2NrZXI=")
        ],
        adGuardAnnoyances: [
          ".hs-sosyal",
          "#cookieconsentdiv",
          'div[class^="app_gdpr"]',
          ".as-oil",
          '[data-cypress="soft-push-notification-modal"]'
        ],
        adGuardBase: [
          ".BetterJsPopOverlay",
          fromB64("I2FkXzMwMFgyNTA="),
          fromB64("I2Jhbm5lcmZsb2F0MjI="),
          fromB64("I2NhbXBhaWduLWJhbm5lcg=="),
          fromB64("I0FkLUNvbnRlbnQ=")
        ],
        adGuardChinese: [
          fromB64("LlppX2FkX2FfSA=="),
          fromB64("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"),
          "#widget-quan",
          fromB64("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"),
          fromB64("YVtocmVmKj0iLjE5NTZobC5jb20vIl0=")
        ],
        adGuardFrench: [
          "#pavePub",
          fromB64("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"),
          ".mobile_adhesion",
          ".widgetadv",
          fromB64("LmFkc19iYW4=")
        ],
        adGuardGerman: ['aside[data-portal-id="leaderboard"]'],
        adGuardJapanese: [
          "#kauli_yad_1",
          fromB64("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="),
          fromB64("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="),
          fromB64("LmFkZ29vZ2xl"),
          fromB64("Ll9faXNib29zdFJldHVybkFk")
        ],
        adGuardMobile: [
          fromB64("YW1wLWF1dG8tYWRz"),
          fromB64("LmFtcF9hZA=="),
          'amp-embed[type="24smi"]',
          "#mgid_iframe1",
          fromB64("I2FkX2ludmlld19hcmVh")
        ],
        adGuardRussian: [
          fromB64("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="),
          fromB64("LnJlY2xhbWE="),
          'div[id^="smi2adblock"]',
          fromB64("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"),
          "#psyduckpockeball"
        ],
        adGuardSocial: [
          fromB64("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="),
          fromB64("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="),
          ".etsy-tweet",
          "#inlineShare",
          ".popup-social"
        ],
        adGuardSpanishPortuguese: [
          "#barraPublicidade",
          "#Publicidade",
          "#publiEspecial",
          "#queTooltip",
          ".cnt-publi"
        ],
        adGuardTrackingProtection: [
          "#qoo-counter",
          fromB64("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="),
          fromB64("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="),
          fromB64("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="),
          "#top100counter"
        ],
        adGuardTurkish: [
          "#backkapat",
          fromB64("I3Jla2xhbWk="),
          fromB64("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="),
          fromB64("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"),
          fromB64("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")
        ],
        bulgarian: [
          fromB64("dGQjZnJlZW5ldF90YWJsZV9hZHM="),
          "#ea_intext_div",
          ".lapni-pop-over",
          "#xenium_hot_offers"
        ],
        easyList: [
          ".yb-floorad",
          fromB64("LndpZGdldF9wb19hZHNfd2lkZ2V0"),
          fromB64("LnRyYWZmaWNqdW5reS1hZA=="),
          ".textad_headline",
          fromB64("LnNwb25zb3JlZC10ZXh0LWxpbmtz")
        ],
        easyListChina: [
          fromB64("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="),
          fromB64("LmZyb250cGFnZUFkdk0="),
          "#taotaole",
          "#aafoot.top_box",
          ".cfa_popup"
        ],
        easyListCookie: [
          ".ezmob-footer",
          ".cc-CookieWarning",
          "[data-cookie-number]",
          fromB64("LmF3LWNvb2tpZS1iYW5uZXI="),
          ".sygnal24-gdpr-modal-wrap"
        ],
        easyListCzechSlovak: [
          "#onlajny-stickers",
          fromB64("I3Jla2xhbW5pLWJveA=="),
          fromB64("LnJla2xhbWEtbWVnYWJvYXJk"),
          ".sklik",
          fromB64("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")
        ],
        easyListDutch: [
          fromB64("I2FkdmVydGVudGll"),
          fromB64("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="),
          ".adstekst",
          fromB64("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="),
          "#semilo-lrectangle"
        ],
        easyListGermany: [
          "#SSpotIMPopSlider",
          fromB64("LnNwb25zb3JsaW5rZ3J1ZW4="),
          fromB64("I3dlcmJ1bmdza3k="),
          fromB64("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"),
          fromB64("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=")
        ],
        easyListItaly: [
          fromB64("LmJveF9hZHZfYW5udW5jaQ=="),
          ".sb-box-pubbliredazionale",
          fromB64("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"),
          fromB64("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"),
          fromB64("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")
        ],
        easyListLithuania: [
          fromB64("LnJla2xhbW9zX3RhcnBhcw=="),
          fromB64("LnJla2xhbW9zX251b3JvZG9z"),
          fromB64("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"),
          fromB64("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"),
          fromB64("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")
        ],
        estonian: [fromB64("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],
        fanboyAnnoyances: [
          "#ac-lre-player",
          ".navigate-to-top",
          "#subscribe_popup",
          ".newsletter_holder",
          "#back-top"
        ],
        fanboyAntiFacebook: [".util-bar-module-firefly-visible"],
        fanboyEnhancedTrackers: [
          ".open.pushModal",
          "#issuem-leaky-paywall-articles-zero-remaining-nag",
          "#sovrn_container",
          'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',
          ".BlockNag__Card"
        ],
        fanboySocial: [
          "#FollowUs",
          "#meteored_share",
          "#social_follow",
          ".article-sharer",
          ".community__social-desc"
        ],
        frellwitSwedish: [
          fromB64("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="),
          fromB64("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="),
          "article.category-samarbete",
          fromB64("ZGl2LmhvbGlkQWRz"),
          "ul.adsmodern"
        ],
        greekAdBlock: [
          fromB64("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"),
          fromB64("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="),
          fromB64(
            "QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"
          ),
          "DIV.agores300",
          "TABLE.advright"
        ],
        hungarian: [
          "#cemp_doboz",
          ".optimonk-iframe-container",
          fromB64("LmFkX19tYWlu"),
          fromB64("W2NsYXNzKj0iR29vZ2xlQWRzIl0="),
          "#hirdetesek_box"
        ],
        iDontCareAboutCookies: [
          '.alert-info[data-block-track*="CookieNotice"]',
          ".ModuleTemplateCookieIndicator",
          ".o--cookies--container",
          "#cookies-policy-sticky",
          "#stickyCookieBar"
        ],
        icelandicAbp: [
          fromB64(
            "QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ=="
          )
        ],
        latvian: [
          fromB64(
            "YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="
          ),
          fromB64(
            "YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ=="
          )
        ],
        listKr: [
          fromB64("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="),
          fromB64("I2xpdmVyZUFkV3JhcHBlcg=="),
          fromB64("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="),
          fromB64("aW5zLmZhc3R2aWV3LWFk"),
          ".revenue_unit_item.dable"
        ],
        listeAr: [
          fromB64("LmdlbWluaUxCMUFk"),
          ".right-and-left-sponsers",
          fromB64("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="),
          fromB64("YVtocmVmKj0iYm9vcmFxLm9yZyJd"),
          fromB64("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")
        ],
        listeFr: [
          fromB64("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="),
          fromB64("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="),
          fromB64("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="),
          ".site-pub-interstitiel",
          'div[id^="crt-"][data-criteo-id]'
        ],
        officialPolish: [
          "#ceneo-placeholder-ceneo-12",
          fromB64("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"),
          fromB64(
            "YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="
          ),
          fromB64("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="),
          fromB64("ZGl2I3NrYXBpZWNfYWQ=")
        ],
        ro: [
          fromB64("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"),
          fromB64(
            "YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"
          ),
          fromB64(
            "YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="
          ),
          fromB64("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"),
          'a[href^="/url/"]'
        ],
        ruAd: [
          fromB64("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"),
          fromB64("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="),
          fromB64("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="),
          "#pgeldiz",
          ".yandex-rtb-block"
        ],
        thaiAds: [
          "a[href*=macau-uta-popup]",
          fromB64("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="),
          fromB64("LmFkczMwMHM="),
          ".bumq",
          ".img-kosana"
        ],
        webAnnoyancesUltralist: [
          "#mod-social-share-2",
          "#social-tools",
          fromB64("LmN0cGwtZnVsbGJhbm5lcg=="),
          ".zergnet-recommend",
          ".yt.btn-link.btn-md.btn"
        ]
      };
    }
    function getDomBlockers(_a2) {
      var _b = _a2 === void 0 ? {} : _a2, debug = _b.debug;
      return __awaiter(this, void 0, void 0, function() {
        var filters, filterNames, allSelectors, blockedSelectors, activeBlockers;
        var _c;
        return __generator(this, function(_d) {
          switch (_d.label) {
            case 0:
              if (!isApplicable()) {
                return [2, void 0];
              }
              filters = getFilters();
              filterNames = Object.keys(filters);
              allSelectors = (_c = []).concat.apply(
                _c,
                filterNames.map(function(filterName) {
                  return filters[filterName];
                })
              );
              return [4, getBlockedSelectors(allSelectors)];
            case 1:
              blockedSelectors = _d.sent();
              if (debug) {
                printDebug(filters, blockedSelectors);
              }
              activeBlockers = filterNames.filter(function(filterName) {
                var selectors = filters[filterName];
                var blockedCount = countTruthy(
                  selectors.map(function(selector) {
                    return blockedSelectors[selector];
                  })
                );
                return blockedCount > selectors.length * 0.6;
              });
              activeBlockers.sort();
              return [2, activeBlockers];
          }
        });
      });
    }
    function isApplicable() {
      return isWebKit() || isAndroid();
    }
    function getBlockedSelectors(selectors) {
      var _a2;
      return __awaiter(this, void 0, void 0, function() {
        var d2, root, elements, blockedSelectors, i2, element, holder, i2;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              d2 = document;
              root = d2.createElement("div");
              elements = new Array(selectors.length);
              blockedSelectors = {};
              forceShow(root);
              for (i2 = 0; i2 < selectors.length; ++i2) {
                element = selectorToElement(selectors[i2]);
                if (element.tagName === "DIALOG") {
                  element.show();
                }
                holder = d2.createElement("div");
                forceShow(holder);
                holder.appendChild(element);
                root.appendChild(holder);
                elements[i2] = element;
              }
              _b.label = 1;
            case 1:
              if (!!d2.body) return [3, 3];
              return [4, wait(50)];
            case 2:
              _b.sent();
              return [3, 1];
            case 3:
              d2.body.appendChild(root);
              try {
                for (i2 = 0; i2 < selectors.length; ++i2) {
                  if (!elements[i2].offsetParent) {
                    blockedSelectors[selectors[i2]] = true;
                  }
                }
              } finally {
                (_a2 = root.parentNode) === null || _a2 === void 0 ? void 0 : _a2.removeChild(root);
              }
              return [2, blockedSelectors];
          }
        });
      });
    }
    function forceShow(element) {
      element.style.setProperty("display", "block", "important");
    }
    function printDebug(filters, blockedSelectors) {
      var message = "DOM blockers debug:\n```";
      for (var _i = 0, _a2 = Object.keys(filters); _i < _a2.length; _i++) {
        var filterName = _a2[_i];
        message += "\n".concat(filterName, ":");
        for (var _b = 0, _c = filters[filterName]; _b < _c.length; _b++) {
          var selector = _c[_b];
          message += "\n  ".concat(blockedSelectors[selector] ? "🚫" : "➡️", " ").concat(selector);
        }
      }
      console.log("".concat(message, "\n```"));
    }
    function getColorGamut() {
      for (var _i = 0, _a2 = ["rec2020", "p3", "srgb"]; _i < _a2.length; _i++) {
        var gamut = _a2[_i];
        if (matchMedia("(color-gamut: ".concat(gamut, ")")).matches) {
          return gamut;
        }
      }
      return void 0;
    }
    function areColorsInverted() {
      if (doesMatch$4("inverted")) {
        return true;
      }
      if (doesMatch$4("none")) {
        return false;
      }
      return void 0;
    }
    function doesMatch$4(value) {
      return matchMedia("(inverted-colors: ".concat(value, ")")).matches;
    }
    function areColorsForced() {
      if (doesMatch$3("active")) {
        return true;
      }
      if (doesMatch$3("none")) {
        return false;
      }
      return void 0;
    }
    function doesMatch$3(value) {
      return matchMedia("(forced-colors: ".concat(value, ")")).matches;
    }
    var maxValueToCheck = 100;
    function getMonochromeDepth() {
      if (!matchMedia("(min-monochrome: 0)").matches) {
        return void 0;
      }
      for (var i2 = 0; i2 <= maxValueToCheck; ++i2) {
        if (matchMedia("(max-monochrome: ".concat(i2, ")")).matches) {
          return i2;
        }
      }
      throw new Error("Too high value");
    }
    function getContrastPreference() {
      if (doesMatch$2("no-preference")) {
        return 0;
      }
      if (doesMatch$2("high") || doesMatch$2("more")) {
        return 1;
      }
      if (doesMatch$2("low") || doesMatch$2("less")) {
        return -1;
      }
      if (doesMatch$2("forced")) {
        return 10;
      }
      return void 0;
    }
    function doesMatch$2(value) {
      return matchMedia("(prefers-contrast: ".concat(value, ")")).matches;
    }
    function isMotionReduced() {
      if (doesMatch$1("reduce")) {
        return true;
      }
      if (doesMatch$1("no-preference")) {
        return false;
      }
      return void 0;
    }
    function doesMatch$1(value) {
      return matchMedia("(prefers-reduced-motion: ".concat(value, ")")).matches;
    }
    function isHDR() {
      if (doesMatch("high")) {
        return true;
      }
      if (doesMatch("standard")) {
        return false;
      }
      return void 0;
    }
    function doesMatch(value) {
      return matchMedia("(dynamic-range: ".concat(value, ")")).matches;
    }
    var M2 = Math;
    var fallbackFn = function() {
      return 0;
    };
    function getMathFingerprint() {
      var acos = M2.acos || fallbackFn;
      var acosh = M2.acosh || fallbackFn;
      var asin = M2.asin || fallbackFn;
      var asinh = M2.asinh || fallbackFn;
      var atanh = M2.atanh || fallbackFn;
      var atan = M2.atan || fallbackFn;
      var sin = M2.sin || fallbackFn;
      var sinh = M2.sinh || fallbackFn;
      var cos = M2.cos || fallbackFn;
      var cosh = M2.cosh || fallbackFn;
      var tan = M2.tan || fallbackFn;
      var tanh = M2.tanh || fallbackFn;
      var exp = M2.exp || fallbackFn;
      var expm1 = M2.expm1 || fallbackFn;
      var log1p = M2.log1p || fallbackFn;
      var powPI = function(value) {
        return M2.pow(M2.PI, value);
      };
      var acoshPf = function(value) {
        return M2.log(value + M2.sqrt(value * value - 1));
      };
      var asinhPf = function(value) {
        return M2.log(value + M2.sqrt(value * value + 1));
      };
      var atanhPf = function(value) {
        return M2.log((1 + value) / (1 - value)) / 2;
      };
      var sinhPf = function(value) {
        return M2.exp(value) - 1 / M2.exp(value) / 2;
      };
      var coshPf = function(value) {
        return (M2.exp(value) + 1 / M2.exp(value)) / 2;
      };
      var expm1Pf = function(value) {
        return M2.exp(value) - 1;
      };
      var tanhPf = function(value) {
        return (M2.exp(2 * value) - 1) / (M2.exp(2 * value) + 1);
      };
      var log1pPf = function(value) {
        return M2.log(1 + value);
      };
      return {
        acos: acos(0.12312423423423424),
        acosh: acosh(1e308),
        acoshPf: acoshPf(1e154),
        asin: asin(0.12312423423423424),
        asinh: asinh(1),
        asinhPf: asinhPf(1),
        atanh: atanh(0.5),
        atanhPf: atanhPf(0.5),
        atan: atan(0.5),
        sin: sin(-1e300),
        sinh: sinh(1),
        sinhPf: sinhPf(1),
        cos: cos(10.000000000123),
        cosh: cosh(1),
        coshPf: coshPf(1),
        tan: tan(-1e300),
        tanh: tanh(1),
        tanhPf: tanhPf(1),
        exp: exp(1),
        expm1: expm1(1),
        expm1Pf: expm1Pf(1),
        log1p: log1p(10),
        log1pPf: log1pPf(10),
        powPI: powPI(-100)
      };
    }
    var defaultText = "mmMwWLliI0fiflO&1";
    var presets = {
      /**
       * The default font. User can change it in desktop Chrome, desktop Firefox, IE 11,
       * Android Chrome (but only when the size is ≥ than the default) and Android Firefox.
       */
      default: [],
      /** OS font on macOS. User can change its size and weight. Applies after Safari restart. */
      apple: [{ font: "-apple-system-body" }],
      /** User can change it in desktop Chrome and desktop Firefox. */
      serif: [{ fontFamily: "serif" }],
      /** User can change it in desktop Chrome and desktop Firefox. */
      sans: [{ fontFamily: "sans-serif" }],
      /** User can change it in desktop Chrome and desktop Firefox. */
      mono: [{ fontFamily: "monospace" }],
      /**
       * Check the smallest allowed font size. User can change it in desktop Chrome, desktop Firefox and desktop Safari.
       * The height can be 0 in Chrome on a retina display.
       */
      min: [{ fontSize: "1px" }],
      /** Tells one OS from another in desktop Chrome. */
      system: [{ fontFamily: "system-ui" }]
    };
    function getFontPreferences() {
      return withNaturalFonts(function(document2, container) {
        var elements = {};
        var sizes = {};
        for (var _i = 0, _a2 = Object.keys(presets); _i < _a2.length; _i++) {
          var key = _a2[_i];
          var _b = presets[key], _c = _b[0], style = _c === void 0 ? {} : _c, _d = _b[1], text = _d === void 0 ? defaultText : _d;
          var element = document2.createElement("span");
          element.textContent = text;
          element.style.whiteSpace = "nowrap";
          for (var _e = 0, _f = Object.keys(style); _e < _f.length; _e++) {
            var name_1 = _f[_e];
            var value = style[name_1];
            if (value !== void 0) {
              element.style[name_1] = value;
            }
          }
          elements[key] = element;
          container.appendChild(document2.createElement("br"));
          container.appendChild(element);
        }
        for (var _g = 0, _h = Object.keys(presets); _g < _h.length; _g++) {
          var key = _h[_g];
          sizes[key] = elements[key].getBoundingClientRect().width;
        }
        return sizes;
      });
    }
    function withNaturalFonts(action, containerWidthPx) {
      if (containerWidthPx === void 0) {
        containerWidthPx = 4e3;
      }
      return withIframe(function(_2, iframeWindow) {
        var iframeDocument = iframeWindow.document;
        var iframeBody = iframeDocument.body;
        var bodyStyle = iframeBody.style;
        bodyStyle.width = "".concat(containerWidthPx, "px");
        bodyStyle.webkitTextSizeAdjust = bodyStyle.textSizeAdjust = "none";
        if (isChromium()) {
          iframeBody.style.zoom = "".concat(1 / iframeWindow.devicePixelRatio);
        } else if (isWebKit()) {
          iframeBody.style.zoom = "reset";
        }
        var linesOfText = iframeDocument.createElement("div");
        linesOfText.textContent = __spreadArray(
          [],
          Array(containerWidthPx / 20 << 0)
        ).map(function() {
          return "word";
        }).join(" ");
        iframeBody.appendChild(linesOfText);
        return action(iframeDocument, iframeBody);
      }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">');
    }
    function getVideoCard() {
      var _a2;
      var canvas = document.createElement("canvas");
      var gl = (_a2 = canvas.getContext("webgl")) !== null && _a2 !== void 0 ? _a2 : canvas.getContext("experimental-webgl");
      if (gl && "getExtension" in gl) {
        var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          return {
            vendor: (gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "").toString(),
            renderer: (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "").toString()
          };
        }
      }
      return void 0;
    }
    function isPdfViewerEnabled() {
      return navigator.pdfViewerEnabled;
    }
    function getArchitecture() {
      var f2 = new Float32Array(1);
      var u8 = new Uint8Array(f2.buffer);
      f2[0] = Infinity;
      f2[0] = f2[0] - f2[0];
      return u8[3];
    }
    var sources = {
      // READ FIRST:
      // See https://github.com/fingerprintjs/fingerprintjs/blob/master/contributing.md#how-to-make-an-entropy-source
      // to learn how entropy source works and how to make your own.
      // The sources run in this exact order.
      // The asynchronous sources are at the start to run in parallel with other sources.
      fonts: getFonts,
      domBlockers: getDomBlockers,
      fontPreferences: getFontPreferences,
      audio: getAudioFingerprint,
      screenFrame: getRoundedScreenFrame,
      osCpu: getOsCpu,
      languages: getLanguages,
      colorDepth: getColorDepth,
      deviceMemory: getDeviceMemory,
      screenResolution: getScreenResolution,
      hardwareConcurrency: getHardwareConcurrency,
      timezone: getTimezone,
      sessionStorage: getSessionStorage,
      localStorage: getLocalStorage,
      indexedDB: getIndexedDB,
      openDatabase: getOpenDatabase,
      cpuClass: getCpuClass,
      platform: getPlatform,
      plugins: getPlugins,
      canvas: getCanvasFingerprint,
      touchSupport: getTouchSupport,
      vendor: getVendor,
      vendorFlavors: getVendorFlavors,
      cookiesEnabled: areCookiesEnabled,
      colorGamut: getColorGamut,
      invertedColors: areColorsInverted,
      forcedColors: areColorsForced,
      monochrome: getMonochromeDepth,
      contrast: getContrastPreference,
      reducedMotion: isMotionReduced,
      hdr: isHDR,
      math: getMathFingerprint,
      videoCard: getVideoCard,
      pdfViewerEnabled: isPdfViewerEnabled,
      architecture: getArchitecture
    };
    function loadBuiltinSources(options) {
      return loadSources(sources, options, []);
    }
    var commentTemplate = "$ if upgrade to Pro: https://fpjs.dev/pro";
    function getConfidence(components) {
      var openConfidenceScore = getOpenConfidenceScore(components);
      var proConfidenceScore = deriveProConfidenceScore(openConfidenceScore);
      return {
        score: openConfidenceScore,
        comment: commentTemplate.replace(/\$/g, "".concat(proConfidenceScore))
      };
    }
    function getOpenConfidenceScore(components) {
      if (isAndroid()) {
        return 0.4;
      }
      if (isWebKit()) {
        return isDesktopSafari() ? 0.5 : 0.3;
      }
      var platform = components.platform.value || "";
      if (/^Win/.test(platform)) {
        return 0.6;
      }
      if (/^Mac/.test(platform)) {
        return 0.5;
      }
      return 0.7;
    }
    function deriveProConfidenceScore(openConfidenceScore) {
      return round(0.99 + 0.01 * openConfidenceScore, 1e-4);
    }
    function componentsToCanonicalString(components) {
      var result = "";
      for (var _i = 0, _a2 = Object.keys(components).sort(); _i < _a2.length; _i++) {
        var componentKey = _a2[_i];
        var component = components[componentKey];
        var value = component.error ? "error" : JSON.stringify(component.value);
        result += "".concat(result ? "|" : "").concat(componentKey.replace(/([:|\\])/g, "\\$1"), ":").concat(value);
      }
      return result;
    }
    function componentsToDebugString(components) {
      return JSON.stringify(
        components,
        function(_key, value) {
          if (value instanceof Error) {
            return errorToObject(value);
          }
          return value;
        },
        2
      );
    }
    function hashComponents(components) {
      return x64hash128(componentsToCanonicalString(components));
    }
    function makeLazyGetResult(components) {
      var visitorIdCache;
      var confidence = getConfidence(components);
      return {
        get visitorId() {
          if (visitorIdCache === void 0) {
            visitorIdCache = hashComponents(this.components);
          }
          return visitorIdCache;
        },
        set visitorId(visitorId) {
          visitorIdCache = visitorId;
        },
        confidence,
        components,
        version
      };
    }
    function prepareForSources(delayFallback) {
      if (delayFallback === void 0) {
        delayFallback = 50;
      }
      return requestIdleCallbackIfAvailable(delayFallback, delayFallback * 2);
    }
    function makeAgent(getComponents, debug) {
      var creationTime = Date.now();
      return {
        get: function(options) {
          return __awaiter(this, void 0, void 0, function() {
            var startTime, components, result;
            return __generator(this, function(_a2) {
              switch (_a2.label) {
                case 0:
                  startTime = Date.now();
                  return [4, getComponents()];
                case 1:
                  components = _a2.sent();
                  result = makeLazyGetResult(components);
                  if (debug || (options === null || options === void 0 ? void 0 : options.debug)) {
                    console.log(
                      "Copy the text below to get the debug data:\n\n```\nversion: ".concat(result.version, "\nuserAgent: ").concat(navigator.userAgent, "\ntimeBetweenLoadAndGet: ").concat(startTime - creationTime, "\nvisitorId: ").concat(result.visitorId, "\ncomponents: ").concat(componentsToDebugString(components), "\n```")
                    );
                  }
                  return [2, result];
              }
            });
          });
        }
      };
    }
    function monitor() {
      if (window.__fpjs_d_m || Math.random() >= 1e-3) {
        return;
      }
      try {
        var request = new XMLHttpRequest();
        request.open(
          "get",
          "https://m1.openfpcdn.io/fingerprintjs/v".concat(
            version,
            "/npm-monitoring"
          ),
          true
        );
        request.send();
      } catch (error) {
        console.error(error);
      }
    }
    function load(_a2) {
      var _b = _a2 === void 0 ? {} : _a2, delayFallback = _b.delayFallback, debug = _b.debug, _c = _b.monitoring, monitoring = _c === void 0 ? true : _c;
      return __awaiter(this, void 0, void 0, function() {
        var getComponents;
        return __generator(this, function(_d) {
          switch (_d.label) {
            case 0:
              if (monitoring) {
                monitor();
              }
              return [4, prepareForSources(delayFallback)];
            case 1:
              _d.sent();
              getComponents = loadBuiltinSources({ debug });
              return [2, makeAgent(getComponents, debug)];
          }
        });
      });
    }
    var index = {
      load,
      hashComponents,
      componentsToDebugString
    };
    var murmurX64Hash128 = x64hash128;
    exports3.componentsToDebugString = componentsToDebugString;
    exports3.default = index;
    exports3.getFullscreenElement = getFullscreenElement;
    exports3.getScreenFrame = getScreenFrame;
    exports3.hashComponents = hashComponents;
    exports3.isAndroid = isAndroid;
    exports3.isChromium = isChromium;
    exports3.isDesktopSafari = isDesktopSafari;
    exports3.isEdgeHTML = isEdgeHTML;
    exports3.isGecko = isGecko;
    exports3.isTrident = isTrident;
    exports3.isWebKit = isWebKit;
    exports3.load = load;
    exports3.loadSources = loadSources;
    exports3.murmurX64Hash128 = murmurX64Hash128;
    exports3.prepareForSources = prepareForSources;
    exports3.sources = sources;
    exports3.transformSource = transformSource;
    exports3.withIframe = withIframe;
    Object.defineProperty(exports3, "__esModule", { value: true });
    return exports3;
  }({});
  function e$1(e2, r2, n2, t2) {
    return new (n2 || (n2 = Promise))(function(o2, a2) {
      function i2(e3) {
        try {
          c2(t2.next(e3));
        } catch (e4) {
          a2(e4);
        }
      }
      function u2(e3) {
        try {
          c2(t2.throw(e3));
        } catch (e4) {
          a2(e4);
        }
      }
      function c2(e3) {
        var r3;
        e3.done ? o2(e3.value) : (r3 = e3.value, r3 instanceof n2 ? r3 : new n2(function(e4) {
          e4(r3);
        })).then(i2, u2);
      }
      c2((t2 = t2.apply(e2, [])).next());
    });
  }
  function r$1(e2, r2) {
    var n2, t2, o2, a2, i2 = { label: 0, sent: function() {
      if (1 & o2[0]) throw o2[1];
      return o2[1];
    }, trys: [], ops: [] };
    return a2 = { next: u2(0), throw: u2(1), return: u2(2) }, "function" == typeof Symbol && (a2[Symbol.iterator] = function() {
      return this;
    }), a2;
    function u2(u3) {
      return function(c2) {
        return function(u4) {
          if (n2) throw new TypeError("Generator is already executing.");
          for (; a2 && (a2 = 0, u4[0] && (i2 = 0)), i2; ) try {
            if (n2 = 1, t2 && (o2 = 2 & u4[0] ? t2.return : u4[0] ? t2.throw || ((o2 = t2.return) && o2.call(t2), 0) : t2.next) && !(o2 = o2.call(t2, u4[1])).done) return o2;
            switch (t2 = 0, o2 && (u4 = [2 & u4[0], o2.value]), u4[0]) {
              case 0:
              case 1:
                o2 = u4;
                break;
              case 4:
                return i2.label++, { value: u4[1], done: false };
              case 5:
                i2.label++, t2 = u4[1], u4 = [0];
                continue;
              case 7:
                u4 = i2.ops.pop(), i2.trys.pop();
                continue;
              default:
                if (!(o2 = i2.trys, (o2 = o2.length > 0 && o2[o2.length - 1]) || 6 !== u4[0] && 2 !== u4[0])) {
                  i2 = 0;
                  continue;
                }
                if (3 === u4[0] && (!o2 || u4[1] > o2[0] && u4[1] < o2[3])) {
                  i2.label = u4[1];
                  break;
                }
                if (6 === u4[0] && i2.label < o2[1]) {
                  i2.label = o2[1], o2 = u4;
                  break;
                }
                if (o2 && i2.label < o2[2]) {
                  i2.label = o2[2], i2.ops.push(u4);
                  break;
                }
                o2[2] && i2.ops.pop(), i2.trys.pop();
                continue;
            }
            u4 = r2.call(e2, i2);
          } catch (e3) {
            u4 = [6, e3], t2 = 0;
          } finally {
            n2 = o2 = 0;
          }
          if (5 & u4[0]) throw u4[1];
          return { value: u4[0] ? u4[1] : void 0, done: true };
        }([u3, c2]);
      };
    }
  }
  "function" == typeof SuppressedError && SuppressedError;
  var n$1 = { exclude: [] };
  function t$1(e2, r2) {
    if (!["exclude", "permissions_to_check", "retries", "timeout"].includes(e2)) throw new Error("Unknown option " + e2);
    if (["exclude", "permissions_to_check"].includes(e2) && (!Array.isArray(r2) || !r2.every(function(e3) {
      return "string" == typeof e3;
    }))) throw new Error("The value of the exclude and permissions_to_check must be an array of strings");
    if (["retries", "timeout"].includes(e2) && "number" != typeof r2) throw new Error("The value of retries must be a number");
    n$1[e2] = r2;
  }
  var o$1 = {}, a = { timeout: "true" }, i$1 = function(e2, r2) {
    "undefined" != typeof window && (o$1[e2] = r2);
  }, u = function() {
    return Object.fromEntries(Object.entries(o$1).filter(function(e2) {
      var r2, t2 = e2[0];
      return !(null === (r2 = null == n$1 ? void 0 : n$1.exclude) || void 0 === r2 ? void 0 : r2.includes(t2));
    }).map(function(e2) {
      return [e2[0], (0, e2[1])()];
    }));
  }, c$1 = 3432918353, s = 461845907, l = 3864292196, d = 2246822507, f = 3266489909;
  function h(e2, r2) {
    return e2 << r2 | e2 >>> 32 - r2;
  }
  function m(e2, r2) {
    void 0 === r2 && (r2 = 0);
    for (var n2 = r2, t2 = 0, o2 = 3 & e2.length, a2 = e2.length - o2, i2 = 0; i2 < a2; ) t2 = 255 & e2.charCodeAt(i2) | (255 & e2.charCodeAt(++i2)) << 8 | (255 & e2.charCodeAt(++i2)) << 16 | (255 & e2.charCodeAt(++i2)) << 24, ++i2, t2 = h(t2 = Math.imul(t2, c$1), 15), n2 = h(n2 ^= t2 = Math.imul(t2, s), 13), n2 = Math.imul(n2, 5) + l;
    switch (t2 = 0, o2) {
      case 3:
        t2 ^= (255 & e2.charCodeAt(i2 + 2)) << 16;
      case 2:
        t2 ^= (255 & e2.charCodeAt(i2 + 1)) << 8;
      case 1:
        t2 ^= 255 & e2.charCodeAt(i2), t2 = h(t2 = Math.imul(t2, c$1), 15), n2 ^= t2 = Math.imul(t2, s);
    }
    return ((n2 = function(e3) {
      return e3 ^= e3 >>> 16, e3 = Math.imul(e3, d), e3 ^= e3 >>> 13, e3 = Math.imul(e3, f), e3 ^ e3 >>> 16;
    }(n2 ^= e2.length)) >>> 0).toString(36);
  }
  function v(e2, r2) {
    return new Promise(function(n2) {
      setTimeout(function() {
        return n2(r2);
      }, e2);
    });
  }
  function g(e2, r2, n2) {
    return Promise.all(e2.map(function(e3) {
      return Promise.race([e3, v(r2, n2)]);
    }));
  }
  function w() {
    return e$1(this, void 0, void 0, function() {
      var e2, t2, o2, i2, c2;
      return r$1(this, function(r2) {
        switch (r2.label) {
          case 0:
            return r2.trys.push([0, 2, , 3]), e2 = u(), t2 = Object.keys(e2), [4, g(Object.values(e2), (null == n$1 ? void 0 : n$1.timeout) || 1e3, a)];
          case 1:
            return o2 = r2.sent(), i2 = o2.filter(function(e3) {
              return void 0 !== e3;
            }), c2 = {}, i2.forEach(function(e3, r3) {
              c2[t2[r3]] = e3;
            }), [2, S(c2, n$1.exclude || [])];
          case 2:
            throw r2.sent();
          case 3:
            return [2];
        }
      });
    });
  }
  function S(e2, r2) {
    var n2 = {}, t2 = function(t3) {
      if (e2.hasOwnProperty(t3)) {
        var o3 = e2[t3];
        if ("object" != typeof o3 || Array.isArray(o3)) r2.includes(t3) || (n2[t3] = o3);
        else {
          var a2 = S(o3, r2.map(function(e3) {
            return e3.startsWith(t3 + ".") ? e3.slice(t3.length + 1) : e3;
          }));
          Object.keys(a2).length > 0 && (n2[t3] = a2);
        }
      }
    };
    for (var o2 in e2) t2(o2);
    return n2;
  }
  function y(n2) {
    return e$1(this, void 0, void 0, function() {
      var e2, t2;
      return r$1(this, function(r2) {
        switch (r2.label) {
          case 0:
            return r2.trys.push([0, 2, , 3]), [4, w()];
          case 1:
            return e2 = r2.sent(), t2 = m(JSON.stringify(e2)), [2, { hash: t2.toString(), data: e2 }];
          case 2:
            throw r2.sent();
          case 3:
            return [2];
        }
      });
    });
  }
  function E(e2) {
    for (var r2 = 0, n2 = 0; n2 < e2.length; ++n2) r2 += Math.abs(e2[n2]);
    return r2;
  }
  function P(e2, r2, n2) {
    for (var t2 = [], o2 = 0; o2 < e2[0].data.length; o2++) {
      for (var a2 = [], i2 = 0; i2 < e2.length; i2++) a2.push(e2[i2].data[o2]);
      t2.push(M(a2));
    }
    var u2 = new Uint8ClampedArray(t2);
    return new ImageData(u2, r2, n2);
  }
  function M(e2) {
    if (0 === e2.length) return 0;
    for (var r2 = {}, n2 = 0, t2 = e2; n2 < t2.length; n2++) {
      r2[a2 = t2[n2]] = (r2[a2] || 0) + 1;
    }
    var o2 = e2[0];
    for (var a2 in r2) r2[a2] > r2[o2] && (o2 = parseInt(a2, 10));
    return o2;
  }
  function A() {
    if ("undefined" == typeof navigator) return { name: "unknown", version: "unknown" };
    for (var e2 = navigator.userAgent, r2 = { Edg: "Edge", OPR: "Opera" }, n2 = 0, t2 = [/(?<name>Edge|Edg)\/(?<version>\d+(?:\.\d+)?)/, /(?<name>(?:Chrome|Chromium|OPR|Opera|Vivaldi|Brave))\/(?<version>\d+(?:\.\d+)?)/, /(?<name>(?:Firefox|Waterfox|Iceweasel|IceCat))\/(?<version>\d+(?:\.\d+)?)/, /(?<name>Safari)\/(?<version>\d+(?:\.\d+)?)/, /(?<name>MSIE|Trident|IEMobile).+?(?<version>\d+(?:\.\d+)?)/, /(?<name>[A-Za-z]+)\/(?<version>\d+(?:\.\d+)?)/, /(?<name>SamsungBrowser)\/(?<version>\d+(?:\.\d+)?)/]; n2 < t2.length; n2++) {
      var o2 = t2[n2], a2 = e2.match(o2);
      if (a2 && a2.groups) return { name: r2[a2.groups.name] || a2.groups.name, version: a2.groups.version };
    }
    return { name: "unknown", version: "unknown" };
  }
  i$1("audio", function() {
    return e$1(this, void 0, void 0, function() {
      return r$1(this, function(e2) {
        return [2, new Promise(function(e3, r2) {
          try {
            var n2 = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 5e3, 44100), t2 = n2.createBufferSource(), o2 = n2.createOscillator();
            o2.frequency.value = 1e3;
            var a2, i2 = n2.createDynamicsCompressor();
            i2.threshold.value = -50, i2.knee.value = 40, i2.ratio.value = 12, i2.attack.value = 0, i2.release.value = 0.2, o2.connect(i2), i2.connect(n2.destination), o2.start(), n2.oncomplete = function(r3) {
              a2 = r3.renderedBuffer.getChannelData(0), e3({ sampleHash: E(a2), oscillator: o2.type, maxChannels: n2.destination.maxChannelCount, channelCountMode: t2.channelCountMode });
            }, n2.startRendering();
          } catch (e4) {
            console.error("Error creating audio fingerprint:", e4), r2(e4);
          }
        })];
      });
    });
  });
  var C = "SamsungBrowser" !== A().name ? 1 : 3, x = 280, k = 20;
  "Firefox" != A().name && i$1("canvas", function() {
    return document.createElement("canvas").getContext("2d"), new Promise(function(e2) {
      var r2 = Array.from({ length: C }, function() {
        return function() {
          var e3 = document.createElement("canvas"), r3 = e3.getContext("2d");
          if (!r3) return new ImageData(1, 1);
          e3.width = x, e3.height = k;
          var n2 = r3.createLinearGradient(0, 0, e3.width, e3.height);
          n2.addColorStop(0, "red"), n2.addColorStop(1 / 6, "orange"), n2.addColorStop(2 / 6, "yellow"), n2.addColorStop(0.5, "green"), n2.addColorStop(4 / 6, "blue"), n2.addColorStop(5 / 6, "indigo"), n2.addColorStop(1, "violet"), r3.fillStyle = n2, r3.fillRect(0, 0, e3.width, e3.height);
          var t2 = "Random Text WMwmil10Oo";
          r3.font = "23.123px Arial", r3.fillStyle = "black", r3.fillText(t2, -5, 15), r3.fillStyle = "rgba(0, 0, 255, 0.5)", r3.fillText(t2, -3.3, 17.7), r3.beginPath(), r3.moveTo(0, 0), r3.lineTo(2 * e3.width / 7, e3.height), r3.strokeStyle = "white", r3.lineWidth = 2, r3.stroke();
          var o2 = r3.getImageData(0, 0, e3.width, e3.height);
          return o2;
        }();
      });
      e2({ commonImageDataHash: m(P(r2, x, k).data.toString()).toString() });
    });
  });
  var T, R = ["Arial", "Arial Black", "Arial Narrow", "Arial Rounded MT", "Arimo", "Archivo", "Barlow", "Bebas Neue", "Bitter", "Bookman", "Calibri", "Cabin", "Candara", "Century", "Century Gothic", "Comic Sans MS", "Constantia", "Courier", "Courier New", "Crimson Text", "DM Mono", "DM Sans", "DM Serif Display", "DM Serif Text", "Dosis", "Droid Sans", "Exo", "Fira Code", "Fira Sans", "Franklin Gothic Medium", "Garamond", "Geneva", "Georgia", "Gill Sans", "Helvetica", "Impact", "Inconsolata", "Indie Flower", "Inter", "Josefin Sans", "Karla", "Lato", "Lexend", "Lucida Bright", "Lucida Console", "Lucida Sans Unicode", "Manrope", "Merriweather", "Merriweather Sans", "Montserrat", "Myriad", "Noto Sans", "Nunito", "Nunito Sans", "Open Sans", "Optima", "Orbitron", "Oswald", "Pacifico", "Palatino", "Perpetua", "PT Sans", "PT Serif", "Poppins", "Prompt", "Public Sans", "Quicksand", "Rajdhani", "Recursive", "Roboto", "Roboto Condensed", "Rockwell", "Rubik", "Segoe Print", "Segoe Script", "Segoe UI", "Sora", "Source Sans Pro", "Space Mono", "Tahoma", "Taviraj", "Times", "Times New Roman", "Titillium Web", "Trebuchet MS", "Ubuntu", "Varela Round", "Verdana", "Work Sans"], I = ["monospace", "sans-serif", "serif"];
  function O(e2, r2) {
    if (!e2) throw new Error("Canvas context not supported");
    return e2.font, e2.font = "72px ".concat(r2), e2.measureText("WwMmLli0Oo").width;
  }
  function _() {
    var e2, r2 = document.createElement("canvas"), n2 = null !== (e2 = r2.getContext("webgl")) && void 0 !== e2 ? e2 : r2.getContext("experimental-webgl");
    if (n2 && "getParameter" in n2) {
      var t2 = n2.getExtension("WEBGL_debug_renderer_info");
      return { vendor: (n2.getParameter(n2.VENDOR) || "").toString(), vendorUnmasked: t2 ? (n2.getParameter(t2.UNMASKED_VENDOR_WEBGL) || "").toString() : "", renderer: (n2.getParameter(n2.RENDERER) || "").toString(), rendererUnmasked: t2 ? (n2.getParameter(t2.UNMASKED_RENDERER_WEBGL) || "").toString() : "", version: (n2.getParameter(n2.VERSION) || "").toString(), shadingLanguageVersion: (n2.getParameter(n2.SHADING_LANGUAGE_VERSION) || "").toString() };
    }
    return "undefined";
  }
  function D() {
    var e2 = new Float32Array(1), r2 = new Uint8Array(e2.buffer);
    return e2[0] = 1 / 0, e2[0] = e2[0] - e2[0], r2[3];
  }
  function B(e2, r2) {
    var n2 = {};
    return r2.forEach(function(r3) {
      var t2 = function(e3) {
        if (0 === e3.length) return null;
        var r4 = {};
        e3.forEach(function(e4) {
          var n4 = String(e4);
          r4[n4] = (r4[n4] || 0) + 1;
        });
        var n3 = e3[0], t3 = 1;
        return Object.keys(r4).forEach(function(e4) {
          r4[e4] > t3 && (n3 = e4, t3 = r4[e4]);
        }), n3;
      }(e2.map(function(e3) {
        return r3 in e3 ? e3[r3] : void 0;
      }).filter(function(e3) {
        return void 0 !== e3;
      }));
      t2 && (n2[r3] = t2);
    }), n2;
  }
  function L() {
    var e2 = [], r2 = { "prefers-contrast": ["high", "more", "low", "less", "forced", "no-preference"], "any-hover": ["hover", "none"], "any-pointer": ["none", "coarse", "fine"], pointer: ["none", "coarse", "fine"], hover: ["hover", "none"], update: ["fast", "slow"], "inverted-colors": ["inverted", "none"], "prefers-reduced-motion": ["reduce", "no-preference"], "prefers-reduced-transparency": ["reduce", "no-preference"], scripting: ["none", "initial-only", "enabled"], "forced-colors": ["active", "none"] };
    return Object.keys(r2).forEach(function(n2) {
      r2[n2].forEach(function(r3) {
        matchMedia("(".concat(n2, ": ").concat(r3, ")")).matches && e2.push("".concat(n2, ": ").concat(r3));
      });
    }), e2;
  }
  function F() {
    if ("https:" === window.location.protocol && "function" == typeof window.ApplePaySession) try {
      for (var e2 = window.ApplePaySession.supportsVersion, r2 = 15; r2 > 0; r2--) if (e2(r2)) return r2;
    } catch (e3) {
      return 0;
    }
    return 0;
  }
  "Firefox" != A().name && i$1("fonts", function() {
    var n2 = this;
    return new Promise(function(t2, o2) {
      try {
        !function(n3) {
          var t3;
          e$1(this, void 0, void 0, function() {
            var e2, o3, a2;
            return r$1(this, function(r2) {
              switch (r2.label) {
                case 0:
                  return document.body ? [3, 2] : [4, (i2 = 50, new Promise(function(e3) {
                    return setTimeout(e3, i2, u2);
                  }))];
                case 1:
                  return r2.sent(), [3, 0];
                case 2:
                  if ((e2 = document.createElement("iframe")).setAttribute("frameBorder", "0"), (o3 = e2.style).setProperty("position", "fixed"), o3.setProperty("display", "block", "important"), o3.setProperty("visibility", "visible"), o3.setProperty("border", "0"), o3.setProperty("opacity", "0"), e2.src = "about:blank", document.body.appendChild(e2), !(a2 = e2.contentDocument || (null === (t3 = e2.contentWindow) || void 0 === t3 ? void 0 : t3.document))) throw new Error("Iframe document is not accessible");
                  return n3({ iframe: a2 }), setTimeout(function() {
                    document.body.removeChild(e2);
                  }, 0), [2];
              }
              var i2, u2;
            });
          });
        }(function(o3) {
          var a2 = o3.iframe;
          return e$1(n2, void 0, void 0, function() {
            var e2, n3, o4, i2;
            return r$1(this, function(r2) {
              return "Hello, world!", e2 = a2.createElement("canvas"), n3 = e2.getContext("2d"), o4 = I.map(function(e3) {
                return O(n3, e3);
              }), i2 = {}, R.forEach(function(e3) {
                var r3 = O(n3, e3);
                o4.includes(r3) || (i2[e3] = r3);
              }), t2(i2), [2];
            });
          });
        });
      } catch (e2) {
        o2({ error: "unsupported" });
      }
    });
  }), i$1("hardware", function() {
    return new Promise(function(e2, r2) {
      var n2 = void 0 !== navigator.deviceMemory ? navigator.deviceMemory : 0, t2 = window.performance && window.performance.memory ? window.performance.memory : 0;
      e2({ videocard: _(), architecture: D(), deviceMemory: n2.toString() || "undefined", jsHeapSizeLimit: t2.jsHeapSizeLimit || 0 });
    });
  }), i$1("locales", function() {
    return new Promise(function(e2) {
      e2({ languages: navigator.language, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    });
  }), i$1("permissions", function() {
    return e$1(this, void 0, void 0, function() {
      var t2;
      return r$1(this, function(o2) {
        return T = (null == n$1 ? void 0 : n$1.permissions_to_check) || ["accelerometer", "accessibility", "accessibility-events", "ambient-light-sensor", "background-fetch", "background-sync", "bluetooth", "camera", "clipboard-read", "clipboard-write", "device-info", "display-capture", "gyroscope", "geolocation", "local-fonts", "magnetometer", "microphone", "midi", "nfc", "notifications", "payment-handler", "persistent-storage", "push", "speaker", "storage-access", "top-level-storage-access", "window-management", "query"], t2 = Array.from({ length: (null == n$1 ? void 0 : n$1.retries) || 3 }, function() {
          return function() {
            return e$1(this, void 0, void 0, function() {
              var e2, n2, t3, o3, a2;
              return r$1(this, function(r2) {
                switch (r2.label) {
                  case 0:
                    e2 = {}, n2 = 0, t3 = T, r2.label = 1;
                  case 1:
                    if (!(n2 < t3.length)) return [3, 6];
                    o3 = t3[n2], r2.label = 2;
                  case 2:
                    return r2.trys.push([2, 4, , 5]), [4, navigator.permissions.query({ name: o3 })];
                  case 3:
                    return a2 = r2.sent(), e2[o3] = a2.state.toString(), [3, 5];
                  case 4:
                    return r2.sent(), [3, 5];
                  case 5:
                    return n2++, [3, 1];
                  case 6:
                    return [2, e2];
                }
              });
            });
          }();
        }), [2, Promise.all(t2).then(function(e2) {
          return B(e2, T);
        })];
      });
    });
  }), i$1("plugins", function() {
    var e2 = [];
    if (navigator.plugins) for (var r2 = 0; r2 < navigator.plugins.length; r2++) {
      var n2 = navigator.plugins[r2];
      e2.push([n2.name, n2.filename, n2.description].join("|"));
    }
    return new Promise(function(r3) {
      r3({ plugins: e2 });
    });
  }), i$1("screen", function() {
    return new Promise(function(e2) {
      e2({ is_touchscreen: navigator.maxTouchPoints > 0, maxTouchPoints: navigator.maxTouchPoints, colorDepth: screen.colorDepth, mediaMatches: L() });
    });
  }), i$1("system", function() {
    return new Promise(function(e2) {
      var r2 = A();
      e2({ platform: window.navigator.platform, cookieEnabled: window.navigator.cookieEnabled, productSub: navigator.productSub, product: navigator.product, useragent: navigator.userAgent, browser: { name: r2.name, version: r2.version }, applePayVersion: F() });
    });
  });
  var N, U = "SamsungBrowser" !== A().name ? 1 : 3, G = null;
  "undefined" != typeof document && ((N = document.createElement("canvas")).width = 200, N.height = 100, G = N.getContext("webgl")), i$1("webgl", function() {
    return e$1(this, void 0, void 0, function() {
      var e2;
      return r$1(this, function(r2) {
        try {
          if (!G) throw new Error("WebGL not supported");
          return e2 = Array.from({ length: U }, function() {
            return function() {
              try {
                if (!G) throw new Error("WebGL not supported");
                var e3 = "\n          attribute vec2 position;\n          void main() {\n              gl_Position = vec4(position, 0.0, 1.0);\n          }\n      ", r3 = "\n          precision mediump float;\n          void main() {\n              gl_FragColor = vec4(0.812, 0.195, 0.553, 0.921); // Set line color\n          }\n      ", n2 = G.createShader(G.VERTEX_SHADER), t2 = G.createShader(G.FRAGMENT_SHADER);
                if (!n2 || !t2) throw new Error("Failed to create shaders");
                if (G.shaderSource(n2, e3), G.shaderSource(t2, r3), G.compileShader(n2), !G.getShaderParameter(n2, G.COMPILE_STATUS)) throw new Error("Vertex shader compilation failed: " + G.getShaderInfoLog(n2));
                if (G.compileShader(t2), !G.getShaderParameter(t2, G.COMPILE_STATUS)) throw new Error("Fragment shader compilation failed: " + G.getShaderInfoLog(t2));
                var o2 = G.createProgram();
                if (!o2) throw new Error("Failed to create shader program");
                if (G.attachShader(o2, n2), G.attachShader(o2, t2), G.linkProgram(o2), !G.getProgramParameter(o2, G.LINK_STATUS)) throw new Error("Shader program linking failed: " + G.getProgramInfoLog(o2));
                G.useProgram(o2);
                for (var a2 = 137, i2 = new Float32Array(4 * a2), u2 = 2 * Math.PI / a2, c2 = 0; c2 < a2; c2++) {
                  var s2 = c2 * u2;
                  i2[4 * c2] = 0, i2[4 * c2 + 1] = 0, i2[4 * c2 + 2] = Math.cos(s2) * (N.width / 2), i2[4 * c2 + 3] = Math.sin(s2) * (N.height / 2);
                }
                var l2 = G.createBuffer();
                G.bindBuffer(G.ARRAY_BUFFER, l2), G.bufferData(G.ARRAY_BUFFER, i2, G.STATIC_DRAW);
                var d2 = G.getAttribLocation(o2, "position");
                G.enableVertexAttribArray(d2), G.vertexAttribPointer(d2, 2, G.FLOAT, false, 0, 0), G.viewport(0, 0, N.width, N.height), G.clearColor(0, 0, 0, 1), G.clear(G.COLOR_BUFFER_BIT), G.drawArrays(G.LINES, 0, 2 * a2);
                var f2 = new Uint8ClampedArray(N.width * N.height * 4);
                return G.readPixels(0, 0, N.width, N.height, G.RGBA, G.UNSIGNED_BYTE, f2), new ImageData(f2, N.width, N.height);
              } catch (e4) {
                return new ImageData(1, 1);
              } finally {
                G && (G.bindBuffer(G.ARRAY_BUFFER, null), G.useProgram(null), G.viewport(0, 0, G.drawingBufferWidth, G.drawingBufferHeight), G.clearColor(0, 0, 0, 0));
              }
            }();
          }), [2, { commonImageHash: m(P(e2, N.width, N.height).data.toString()).toString() }];
        } catch (e3) {
          return [2, { webgl: "unsupported" }];
        }
        return [2];
      });
    });
  });
  var j = function(e2, r2, n2, t2) {
    for (var o2 = (n2 - r2) / t2, a2 = 0, i2 = 0; i2 < t2; i2++) {
      a2 += e2(r2 + (i2 + 0.5) * o2);
    }
    return a2 * o2;
  };
  i$1("math", function() {
    return e$1(void 0, void 0, void 0, function() {
      return r$1(this, function(e2) {
        return [2, { acos: Math.acos(0.5), asin: j(Math.asin, -1, 1, 97), atan: j(Math.atan, -1, 1, 97), cos: j(Math.cos, 0, Math.PI, 97), cosh: Math.cosh(9 / 7), e: Math.E, largeCos: Math.cos(1e20), largeSin: Math.sin(1e20), largeTan: Math.tan(1e20), log: Math.log(1e3), pi: Math.PI, sin: j(Math.sin, -Math.PI, Math.PI, 97), sinh: j(Math.sinh, -9 / 7, 7 / 9, 97), sqrt: Math.sqrt(2), tan: j(Math.tan, 0, 2 * Math.PI, 97), tanh: j(Math.tanh, -9 / 7, 7 / 9, 97) }];
      });
    });
  });
  const getUTIDHash = async () => {
    const ThumbmarkJsObject = await getThumbmarkJs();
    return ThumbmarkJsObject.hash;
  };
  async function getThumbmarkJs() {
    t$1("exclude", ["permissions"]);
    return y().then((fp) => fp);
  }
  const getFingerprintObjectFromFingerprintJs = async () => {
    const fp = await FingerprintJS.load({
      apiKey: "w19U95D41ZRuBaTVhebA",
      region: "ap"
    });
    const result = await fp.get();
    return result;
  };
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getAugmentedNamespace(n2) {
    if (n2.__esModule) return n2;
    var f2 = n2.default;
    if (typeof f2 == "function") {
      var a2 = function a3() {
        if (this instanceof a3) {
          return Reflect.construct(f2, arguments, this.constructor);
        }
        return f2.apply(this, arguments);
      };
      a2.prototype = f2.prototype;
    } else a2 = {};
    Object.defineProperty(a2, "__esModule", { value: true });
    Object.keys(n2).forEach(function(k2) {
      var d2 = Object.getOwnPropertyDescriptor(n2, k2);
      Object.defineProperty(a2, k2, d2.get ? d2 : {
        enumerable: true,
        get: function() {
          return n2[k2];
        }
      });
    });
    return a2;
  }
  var md5 = { exports: {} };
  const __viteBrowserExternal = {};
  const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: __viteBrowserExternal
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$1 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
  /**
   * [js-md5]{@link https://github.com/emn178/js-md5}
   *
   * @namespace md5
   * @version 0.8.3
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2023
   * @license MIT
   */
  (function(module2) {
    (function() {
      var INPUT_ERROR = "input is invalid type";
      var FINALIZE_ERROR = "finalize already called";
      var WINDOW = typeof window === "object";
      var root = WINDOW ? window : {};
      if (root.JS_MD5_NO_WINDOW) {
        WINDOW = false;
      }
      var WEB_WORKER = !WINDOW && typeof self === "object";
      var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = commonjsGlobal;
      } else if (WEB_WORKER) {
        root = self;
      }
      var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && true && module2.exports;
      var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS = "0123456789abcdef".split("");
      var EXTRA = [128, 32768, 8388608, -2147483648];
      var SHIFT = [0, 8, 16, 24];
      var OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"];
      var BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
      var blocks = [], buffer8;
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        buffer8 = new Uint8Array(buffer);
        blocks = new Uint32Array(buffer);
      }
      var isArray = Array.isArray;
      if (root.JS_MD5_NO_NODE_JS || !isArray) {
        isArray = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      var isView = ArrayBuffer.isView;
      if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !isView)) {
        isView = function(obj) {
          return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
      }
      var formatMessage = function(message) {
        var type = typeof message;
        if (type === "string") {
          return [message, true];
        }
        if (type !== "object" || message === null) {
          throw new Error(INPUT_ERROR);
        }
        if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          return [new Uint8Array(message), false];
        }
        if (!isArray(message) && !isView(message)) {
          throw new Error(INPUT_ERROR);
        }
        return [message, false];
      };
      var createOutputMethod = function(outputType) {
        return function(message) {
          return new Md5(true).update(message)[outputType]();
        };
      };
      var createMethod = function() {
        var method = createOutputMethod("hex");
        if (NODE_JS) {
          method = nodeWrap(method);
        }
        method.create = function() {
          return new Md5();
        };
        method.update = function(message) {
          return method.create().update(message);
        };
        for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
          var type = OUTPUT_TYPES[i2];
          method[type] = createOutputMethod(type);
        }
        return method;
      };
      var nodeWrap = function(method) {
        var crypto2 = require$$1;
        var Buffer = require$$1.Buffer;
        var bufferFrom;
        if (Buffer.from && !root.JS_MD5_NO_BUFFER_FROM) {
          bufferFrom = Buffer.from;
        } else {
          bufferFrom = function(message) {
            return new Buffer(message);
          };
        }
        var nodeMethod = function(message) {
          if (typeof message === "string") {
            return crypto2.createHash("md5").update(message, "utf8").digest("hex");
          } else {
            if (message === null || message === void 0) {
              throw new Error(INPUT_ERROR);
            } else if (message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            }
          }
          if (isArray(message) || isView(message) || message.constructor === Buffer) {
            return crypto2.createHash("md5").update(bufferFrom(message)).digest("hex");
          } else {
            return method(message);
          }
        };
        return nodeMethod;
      };
      var createHmacOutputMethod = function(outputType) {
        return function(key, message) {
          return new HmacMd5(key, true).update(message)[outputType]();
        };
      };
      var createHmacMethod = function() {
        var method = createHmacOutputMethod("hex");
        method.create = function(key) {
          return new HmacMd5(key);
        };
        method.update = function(key, message) {
          return method.create(key).update(message);
        };
        for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
          var type = OUTPUT_TYPES[i2];
          method[type] = createHmacOutputMethod(type);
        }
        return method;
      };
      function Md5(sharedMemory) {
        if (sharedMemory) {
          blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
          this.blocks = blocks;
          this.buffer8 = buffer8;
        } else {
          if (ARRAY_BUFFER) {
            var buffer2 = new ArrayBuffer(68);
            this.buffer8 = new Uint8Array(buffer2);
            this.blocks = new Uint32Array(buffer2);
          } else {
            this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
        }
        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
        this.finalized = this.hashed = false;
        this.first = true;
      }
      Md5.prototype.update = function(message) {
        if (this.finalized) {
          throw new Error(FINALIZE_ERROR);
        }
        var result = formatMessage(message);
        message = result[0];
        var isString = result[1];
        var code, index = 0, i2, length = message.length, blocks2 = this.blocks;
        var buffer82 = this.buffer8;
        while (index < length) {
          if (this.hashed) {
            this.hashed = false;
            blocks2[0] = blocks2[16];
            blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
          }
          if (isString) {
            if (ARRAY_BUFFER) {
              for (i2 = this.start; index < length && i2 < 64; ++index) {
                code = message.charCodeAt(index);
                if (code < 128) {
                  buffer82[i2++] = code;
                } else if (code < 2048) {
                  buffer82[i2++] = 192 | code >>> 6;
                  buffer82[i2++] = 128 | code & 63;
                } else if (code < 55296 || code >= 57344) {
                  buffer82[i2++] = 224 | code >>> 12;
                  buffer82[i2++] = 128 | code >>> 6 & 63;
                  buffer82[i2++] = 128 | code & 63;
                } else {
                  code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                  buffer82[i2++] = 240 | code >>> 18;
                  buffer82[i2++] = 128 | code >>> 12 & 63;
                  buffer82[i2++] = 128 | code >>> 6 & 63;
                  buffer82[i2++] = 128 | code & 63;
                }
              }
            } else {
              for (i2 = this.start; index < length && i2 < 64; ++index) {
                code = message.charCodeAt(index);
                if (code < 128) {
                  blocks2[i2 >>> 2] |= code << SHIFT[i2++ & 3];
                } else if (code < 2048) {
                  blocks2[i2 >>> 2] |= (192 | code >>> 6) << SHIFT[i2++ & 3];
                  blocks2[i2 >>> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
                } else if (code < 55296 || code >= 57344) {
                  blocks2[i2 >>> 2] |= (224 | code >>> 12) << SHIFT[i2++ & 3];
                  blocks2[i2 >>> 2] |= (128 | code >>> 6 & 63) << SHIFT[i2++ & 3];
                  blocks2[i2 >>> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
                } else {
                  code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                  blocks2[i2 >>> 2] |= (240 | code >>> 18) << SHIFT[i2++ & 3];
                  blocks2[i2 >>> 2] |= (128 | code >>> 12 & 63) << SHIFT[i2++ & 3];
                  blocks2[i2 >>> 2] |= (128 | code >>> 6 & 63) << SHIFT[i2++ & 3];
                  blocks2[i2 >>> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
                }
              }
            }
          } else {
            if (ARRAY_BUFFER) {
              for (i2 = this.start; index < length && i2 < 64; ++index) {
                buffer82[i2++] = message[index];
              }
            } else {
              for (i2 = this.start; index < length && i2 < 64; ++index) {
                blocks2[i2 >>> 2] |= message[index] << SHIFT[i2++ & 3];
              }
            }
          }
          this.lastByteIndex = i2;
          this.bytes += i2 - this.start;
          if (i2 >= 64) {
            this.start = i2 - 64;
            this.hash();
            this.hashed = true;
          } else {
            this.start = i2;
          }
        }
        if (this.bytes > 4294967295) {
          this.hBytes += this.bytes / 4294967296 << 0;
          this.bytes = this.bytes % 4294967296;
        }
        return this;
      };
      Md5.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks2 = this.blocks, i2 = this.lastByteIndex;
        blocks2[i2 >>> 2] |= EXTRA[i2 & 3];
        if (i2 >= 56) {
          if (!this.hashed) {
            this.hash();
          }
          blocks2[0] = blocks2[16];
          blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
        }
        blocks2[14] = this.bytes << 3;
        blocks2[15] = this.hBytes << 3 | this.bytes >>> 29;
        this.hash();
      };
      Md5.prototype.hash = function() {
        var a2, b, c2, d2, bc, da, blocks2 = this.blocks;
        if (this.first) {
          a2 = blocks2[0] - 680876937;
          a2 = (a2 << 7 | a2 >>> 25) - 271733879 << 0;
          d2 = (-1732584194 ^ a2 & 2004318071) + blocks2[1] - 117830708;
          d2 = (d2 << 12 | d2 >>> 20) + a2 << 0;
          c2 = (-271733879 ^ d2 & (a2 ^ -271733879)) + blocks2[2] - 1126478375;
          c2 = (c2 << 17 | c2 >>> 15) + d2 << 0;
          b = (a2 ^ c2 & (d2 ^ a2)) + blocks2[3] - 1316259209;
          b = (b << 22 | b >>> 10) + c2 << 0;
        } else {
          a2 = this.h0;
          b = this.h1;
          c2 = this.h2;
          d2 = this.h3;
          a2 += (d2 ^ b & (c2 ^ d2)) + blocks2[0] - 680876936;
          a2 = (a2 << 7 | a2 >>> 25) + b << 0;
          d2 += (c2 ^ a2 & (b ^ c2)) + blocks2[1] - 389564586;
          d2 = (d2 << 12 | d2 >>> 20) + a2 << 0;
          c2 += (b ^ d2 & (a2 ^ b)) + blocks2[2] + 606105819;
          c2 = (c2 << 17 | c2 >>> 15) + d2 << 0;
          b += (a2 ^ c2 & (d2 ^ a2)) + blocks2[3] - 1044525330;
          b = (b << 22 | b >>> 10) + c2 << 0;
        }
        a2 += (d2 ^ b & (c2 ^ d2)) + blocks2[4] - 176418897;
        a2 = (a2 << 7 | a2 >>> 25) + b << 0;
        d2 += (c2 ^ a2 & (b ^ c2)) + blocks2[5] + 1200080426;
        d2 = (d2 << 12 | d2 >>> 20) + a2 << 0;
        c2 += (b ^ d2 & (a2 ^ b)) + blocks2[6] - 1473231341;
        c2 = (c2 << 17 | c2 >>> 15) + d2 << 0;
        b += (a2 ^ c2 & (d2 ^ a2)) + blocks2[7] - 45705983;
        b = (b << 22 | b >>> 10) + c2 << 0;
        a2 += (d2 ^ b & (c2 ^ d2)) + blocks2[8] + 1770035416;
        a2 = (a2 << 7 | a2 >>> 25) + b << 0;
        d2 += (c2 ^ a2 & (b ^ c2)) + blocks2[9] - 1958414417;
        d2 = (d2 << 12 | d2 >>> 20) + a2 << 0;
        c2 += (b ^ d2 & (a2 ^ b)) + blocks2[10] - 42063;
        c2 = (c2 << 17 | c2 >>> 15) + d2 << 0;
        b += (a2 ^ c2 & (d2 ^ a2)) + blocks2[11] - 1990404162;
        b = (b << 22 | b >>> 10) + c2 << 0;
        a2 += (d2 ^ b & (c2 ^ d2)) + blocks2[12] + 1804603682;
        a2 = (a2 << 7 | a2 >>> 25) + b << 0;
        d2 += (c2 ^ a2 & (b ^ c2)) + blocks2[13] - 40341101;
        d2 = (d2 << 12 | d2 >>> 20) + a2 << 0;
        c2 += (b ^ d2 & (a2 ^ b)) + blocks2[14] - 1502002290;
        c2 = (c2 << 17 | c2 >>> 15) + d2 << 0;
        b += (a2 ^ c2 & (d2 ^ a2)) + blocks2[15] + 1236535329;
        b = (b << 22 | b >>> 10) + c2 << 0;
        a2 += (c2 ^ d2 & (b ^ c2)) + blocks2[1] - 165796510;
        a2 = (a2 << 5 | a2 >>> 27) + b << 0;
        d2 += (b ^ c2 & (a2 ^ b)) + blocks2[6] - 1069501632;
        d2 = (d2 << 9 | d2 >>> 23) + a2 << 0;
        c2 += (a2 ^ b & (d2 ^ a2)) + blocks2[11] + 643717713;
        c2 = (c2 << 14 | c2 >>> 18) + d2 << 0;
        b += (d2 ^ a2 & (c2 ^ d2)) + blocks2[0] - 373897302;
        b = (b << 20 | b >>> 12) + c2 << 0;
        a2 += (c2 ^ d2 & (b ^ c2)) + blocks2[5] - 701558691;
        a2 = (a2 << 5 | a2 >>> 27) + b << 0;
        d2 += (b ^ c2 & (a2 ^ b)) + blocks2[10] + 38016083;
        d2 = (d2 << 9 | d2 >>> 23) + a2 << 0;
        c2 += (a2 ^ b & (d2 ^ a2)) + blocks2[15] - 660478335;
        c2 = (c2 << 14 | c2 >>> 18) + d2 << 0;
        b += (d2 ^ a2 & (c2 ^ d2)) + blocks2[4] - 405537848;
        b = (b << 20 | b >>> 12) + c2 << 0;
        a2 += (c2 ^ d2 & (b ^ c2)) + blocks2[9] + 568446438;
        a2 = (a2 << 5 | a2 >>> 27) + b << 0;
        d2 += (b ^ c2 & (a2 ^ b)) + blocks2[14] - 1019803690;
        d2 = (d2 << 9 | d2 >>> 23) + a2 << 0;
        c2 += (a2 ^ b & (d2 ^ a2)) + blocks2[3] - 187363961;
        c2 = (c2 << 14 | c2 >>> 18) + d2 << 0;
        b += (d2 ^ a2 & (c2 ^ d2)) + blocks2[8] + 1163531501;
        b = (b << 20 | b >>> 12) + c2 << 0;
        a2 += (c2 ^ d2 & (b ^ c2)) + blocks2[13] - 1444681467;
        a2 = (a2 << 5 | a2 >>> 27) + b << 0;
        d2 += (b ^ c2 & (a2 ^ b)) + blocks2[2] - 51403784;
        d2 = (d2 << 9 | d2 >>> 23) + a2 << 0;
        c2 += (a2 ^ b & (d2 ^ a2)) + blocks2[7] + 1735328473;
        c2 = (c2 << 14 | c2 >>> 18) + d2 << 0;
        b += (d2 ^ a2 & (c2 ^ d2)) + blocks2[12] - 1926607734;
        b = (b << 20 | b >>> 12) + c2 << 0;
        bc = b ^ c2;
        a2 += (bc ^ d2) + blocks2[5] - 378558;
        a2 = (a2 << 4 | a2 >>> 28) + b << 0;
        d2 += (bc ^ a2) + blocks2[8] - 2022574463;
        d2 = (d2 << 11 | d2 >>> 21) + a2 << 0;
        da = d2 ^ a2;
        c2 += (da ^ b) + blocks2[11] + 1839030562;
        c2 = (c2 << 16 | c2 >>> 16) + d2 << 0;
        b += (da ^ c2) + blocks2[14] - 35309556;
        b = (b << 23 | b >>> 9) + c2 << 0;
        bc = b ^ c2;
        a2 += (bc ^ d2) + blocks2[1] - 1530992060;
        a2 = (a2 << 4 | a2 >>> 28) + b << 0;
        d2 += (bc ^ a2) + blocks2[4] + 1272893353;
        d2 = (d2 << 11 | d2 >>> 21) + a2 << 0;
        da = d2 ^ a2;
        c2 += (da ^ b) + blocks2[7] - 155497632;
        c2 = (c2 << 16 | c2 >>> 16) + d2 << 0;
        b += (da ^ c2) + blocks2[10] - 1094730640;
        b = (b << 23 | b >>> 9) + c2 << 0;
        bc = b ^ c2;
        a2 += (bc ^ d2) + blocks2[13] + 681279174;
        a2 = (a2 << 4 | a2 >>> 28) + b << 0;
        d2 += (bc ^ a2) + blocks2[0] - 358537222;
        d2 = (d2 << 11 | d2 >>> 21) + a2 << 0;
        da = d2 ^ a2;
        c2 += (da ^ b) + blocks2[3] - 722521979;
        c2 = (c2 << 16 | c2 >>> 16) + d2 << 0;
        b += (da ^ c2) + blocks2[6] + 76029189;
        b = (b << 23 | b >>> 9) + c2 << 0;
        bc = b ^ c2;
        a2 += (bc ^ d2) + blocks2[9] - 640364487;
        a2 = (a2 << 4 | a2 >>> 28) + b << 0;
        d2 += (bc ^ a2) + blocks2[12] - 421815835;
        d2 = (d2 << 11 | d2 >>> 21) + a2 << 0;
        da = d2 ^ a2;
        c2 += (da ^ b) + blocks2[15] + 530742520;
        c2 = (c2 << 16 | c2 >>> 16) + d2 << 0;
        b += (da ^ c2) + blocks2[2] - 995338651;
        b = (b << 23 | b >>> 9) + c2 << 0;
        a2 += (c2 ^ (b | ~d2)) + blocks2[0] - 198630844;
        a2 = (a2 << 6 | a2 >>> 26) + b << 0;
        d2 += (b ^ (a2 | ~c2)) + blocks2[7] + 1126891415;
        d2 = (d2 << 10 | d2 >>> 22) + a2 << 0;
        c2 += (a2 ^ (d2 | ~b)) + blocks2[14] - 1416354905;
        c2 = (c2 << 15 | c2 >>> 17) + d2 << 0;
        b += (d2 ^ (c2 | ~a2)) + blocks2[5] - 57434055;
        b = (b << 21 | b >>> 11) + c2 << 0;
        a2 += (c2 ^ (b | ~d2)) + blocks2[12] + 1700485571;
        a2 = (a2 << 6 | a2 >>> 26) + b << 0;
        d2 += (b ^ (a2 | ~c2)) + blocks2[3] - 1894986606;
        d2 = (d2 << 10 | d2 >>> 22) + a2 << 0;
        c2 += (a2 ^ (d2 | ~b)) + blocks2[10] - 1051523;
        c2 = (c2 << 15 | c2 >>> 17) + d2 << 0;
        b += (d2 ^ (c2 | ~a2)) + blocks2[1] - 2054922799;
        b = (b << 21 | b >>> 11) + c2 << 0;
        a2 += (c2 ^ (b | ~d2)) + blocks2[8] + 1873313359;
        a2 = (a2 << 6 | a2 >>> 26) + b << 0;
        d2 += (b ^ (a2 | ~c2)) + blocks2[15] - 30611744;
        d2 = (d2 << 10 | d2 >>> 22) + a2 << 0;
        c2 += (a2 ^ (d2 | ~b)) + blocks2[6] - 1560198380;
        c2 = (c2 << 15 | c2 >>> 17) + d2 << 0;
        b += (d2 ^ (c2 | ~a2)) + blocks2[13] + 1309151649;
        b = (b << 21 | b >>> 11) + c2 << 0;
        a2 += (c2 ^ (b | ~d2)) + blocks2[4] - 145523070;
        a2 = (a2 << 6 | a2 >>> 26) + b << 0;
        d2 += (b ^ (a2 | ~c2)) + blocks2[11] - 1120210379;
        d2 = (d2 << 10 | d2 >>> 22) + a2 << 0;
        c2 += (a2 ^ (d2 | ~b)) + blocks2[2] + 718787259;
        c2 = (c2 << 15 | c2 >>> 17) + d2 << 0;
        b += (d2 ^ (c2 | ~a2)) + blocks2[9] - 343485551;
        b = (b << 21 | b >>> 11) + c2 << 0;
        if (this.first) {
          this.h0 = a2 + 1732584193 << 0;
          this.h1 = b - 271733879 << 0;
          this.h2 = c2 - 1732584194 << 0;
          this.h3 = d2 + 271733878 << 0;
          this.first = false;
        } else {
          this.h0 = this.h0 + a2 << 0;
          this.h1 = this.h1 + b << 0;
          this.h2 = this.h2 + c2 << 0;
          this.h3 = this.h3 + d2 << 0;
        }
      };
      Md5.prototype.hex = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
        return HEX_CHARS[h0 >>> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h0 >>> 12 & 15] + HEX_CHARS[h0 >>> 8 & 15] + HEX_CHARS[h0 >>> 20 & 15] + HEX_CHARS[h0 >>> 16 & 15] + HEX_CHARS[h0 >>> 28 & 15] + HEX_CHARS[h0 >>> 24 & 15] + HEX_CHARS[h1 >>> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h1 >>> 12 & 15] + HEX_CHARS[h1 >>> 8 & 15] + HEX_CHARS[h1 >>> 20 & 15] + HEX_CHARS[h1 >>> 16 & 15] + HEX_CHARS[h1 >>> 28 & 15] + HEX_CHARS[h1 >>> 24 & 15] + HEX_CHARS[h2 >>> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h2 >>> 12 & 15] + HEX_CHARS[h2 >>> 8 & 15] + HEX_CHARS[h2 >>> 20 & 15] + HEX_CHARS[h2 >>> 16 & 15] + HEX_CHARS[h2 >>> 28 & 15] + HEX_CHARS[h2 >>> 24 & 15] + HEX_CHARS[h3 >>> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h3 >>> 12 & 15] + HEX_CHARS[h3 >>> 8 & 15] + HEX_CHARS[h3 >>> 20 & 15] + HEX_CHARS[h3 >>> 16 & 15] + HEX_CHARS[h3 >>> 28 & 15] + HEX_CHARS[h3 >>> 24 & 15];
      };
      Md5.prototype.toString = Md5.prototype.hex;
      Md5.prototype.digest = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
        return [
          h0 & 255,
          h0 >>> 8 & 255,
          h0 >>> 16 & 255,
          h0 >>> 24 & 255,
          h1 & 255,
          h1 >>> 8 & 255,
          h1 >>> 16 & 255,
          h1 >>> 24 & 255,
          h2 & 255,
          h2 >>> 8 & 255,
          h2 >>> 16 & 255,
          h2 >>> 24 & 255,
          h3 & 255,
          h3 >>> 8 & 255,
          h3 >>> 16 & 255,
          h3 >>> 24 & 255
        ];
      };
      Md5.prototype.array = Md5.prototype.digest;
      Md5.prototype.arrayBuffer = function() {
        this.finalize();
        var buffer2 = new ArrayBuffer(16);
        var blocks2 = new Uint32Array(buffer2);
        blocks2[0] = this.h0;
        blocks2[1] = this.h1;
        blocks2[2] = this.h2;
        blocks2[3] = this.h3;
        return buffer2;
      };
      Md5.prototype.buffer = Md5.prototype.arrayBuffer;
      Md5.prototype.base64 = function() {
        var v1, v2, v3, base64Str = "", bytes = this.array();
        for (var i2 = 0; i2 < 15; ) {
          v1 = bytes[i2++];
          v2 = bytes[i2++];
          v3 = bytes[i2++];
          base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] + BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] + BASE64_ENCODE_CHAR[v3 & 63];
        }
        v1 = bytes[i2];
        base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[v1 << 4 & 63] + "==";
        return base64Str;
      };
      function HmacMd5(key, sharedMemory) {
        var i2, result = formatMessage(key);
        key = result[0];
        if (result[1]) {
          var bytes = [], length = key.length, index = 0, code;
          for (i2 = 0; i2 < length; ++i2) {
            code = key.charCodeAt(i2);
            if (code < 128) {
              bytes[index++] = code;
            } else if (code < 2048) {
              bytes[index++] = 192 | code >>> 6;
              bytes[index++] = 128 | code & 63;
            } else if (code < 55296 || code >= 57344) {
              bytes[index++] = 224 | code >>> 12;
              bytes[index++] = 128 | code >>> 6 & 63;
              bytes[index++] = 128 | code & 63;
            } else {
              code = 65536 + ((code & 1023) << 10 | key.charCodeAt(++i2) & 1023);
              bytes[index++] = 240 | code >>> 18;
              bytes[index++] = 128 | code >>> 12 & 63;
              bytes[index++] = 128 | code >>> 6 & 63;
              bytes[index++] = 128 | code & 63;
            }
          }
          key = bytes;
        }
        if (key.length > 64) {
          key = new Md5(true).update(key).array();
        }
        var oKeyPad = [], iKeyPad = [];
        for (i2 = 0; i2 < 64; ++i2) {
          var b = key[i2] || 0;
          oKeyPad[i2] = 92 ^ b;
          iKeyPad[i2] = 54 ^ b;
        }
        Md5.call(this, sharedMemory);
        this.update(iKeyPad);
        this.oKeyPad = oKeyPad;
        this.inner = true;
        this.sharedMemory = sharedMemory;
      }
      HmacMd5.prototype = new Md5();
      HmacMd5.prototype.finalize = function() {
        Md5.prototype.finalize.call(this);
        if (this.inner) {
          this.inner = false;
          var innerHash = this.array();
          Md5.call(this, this.sharedMemory);
          this.update(this.oKeyPad);
          this.update(innerHash);
          Md5.prototype.finalize.call(this);
        }
      };
      var exports3 = createMethod();
      exports3.md5 = exports3;
      exports3.md5.hmac = createHmacMethod();
      if (COMMON_JS) {
        module2.exports = exports3;
      } else {
        root.md5 = exports3;
      }
    })();
  })(md5);
  var md5Exports = md5.exports;
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
          if (payload == null ? void 0 : payload.channel_id) {
            gsService.setUMIDIdentificationSource(payload == null ? void 0 : payload.channel_id);
            gsService.setUMIDIdentificationTime(/* @__PURE__ */ new Date());
          }
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
  async function triggerExpireEvent(_EVENT_TTL = EVENT_TTL) {
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
        if (!gsService.getUFID()) {
          const UFIDObj = await getFingerprintObjectFromFingerprintJs();
          gsService.setUFID(UFIDObj.visitorId);
        }
        if (!gsService.getUTID()) {
          const ThumbmarkJsObject = await getUTIDHash();
          gsService.setUTID(ThumbmarkJsObject);
        }
        if (!gsService.getUDID()) ;
        expiredObjectList = validateEventListAndRemoveUnwantedEvents(expiredObjectList);
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
        let { mobile, channel_id } = _data;
        if (channel_id) {
          channel_id = channel_id.toString();
        }
        const userMobileValue = gsService.getUserMobileValue() || md5Exports.md5(mobile);
        if (userMobileValue) {
          _triggerEvent(EVENTS_NAME.UPDATE_UMID, {
            mobile: userMobileValue,
            channel_id
          });
          {
            let userInfo = { u_mid: userMobileValue };
            setCookies(userInfo);
            _triggerEvent(EVENTS_NAME.UPDATE_USER_PROFILE, userInfo);
          }
          break;
        }
      }
    }
  }
  function validateEventListAndRemoveUnwantedEvents(_expiredObjectList) {
    const keys = Object.keys(_expiredObjectList);
    if ((keys.includes(EVENTS_NAME.PDP_VIEW) || keys.includes(EVENTS_NAME.ORDER_TRACK)) && keys.includes(EVENTS_NAME.ON_LOAD)) {
      delete _expiredObjectList[EVENTS_NAME.ON_LOAD];
    }
    return _expiredObjectList;
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
      function a2(e3) {
        try {
          u2(o2.next(e3));
        } catch (e4) {
          i2(e4);
        }
      }
      function c2(e3) {
        try {
          u2(o2.throw(e3));
        } catch (e4) {
          i2(e4);
        }
      }
      function u2(e3) {
        var n3;
        e3.done ? r2(e3.value) : (n3 = e3.value, n3 instanceof t2 ? n3 : new t2(function(e4) {
          e4(n3);
        })).then(a2, c2);
      }
      u2((o2 = o2.apply(e2, [])).next());
    });
  }, o = function(e2, n2) {
    var t2, o2, r2, i2, a2 = { label: 0, sent: function() {
      if (1 & r2[0]) throw r2[1];
      return r2[1];
    }, trys: [], ops: [] };
    return i2 = { next: c2(0), throw: c2(1), return: c2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
      return this;
    }), i2;
    function c2(c3) {
      return function(u2) {
        return function(c4) {
          if (t2) throw new TypeError("Generator is already executing.");
          for (; i2 && (i2 = 0, c4[0] && (a2 = 0)), a2; ) try {
            if (t2 = 1, o2 && (r2 = 2 & c4[0] ? o2.return : c4[0] ? o2.throw || ((r2 = o2.return) && r2.call(o2), 0) : o2.next) && !(r2 = r2.call(o2, c4[1])).done) return r2;
            switch (o2 = 0, r2 && (c4 = [2 & c4[0], r2.value]), c4[0]) {
              case 0:
              case 1:
                r2 = c4;
                break;
              case 4:
                return a2.label++, { value: c4[1], done: false };
              case 5:
                a2.label++, o2 = c4[1], c4 = [0];
                continue;
              case 7:
                c4 = a2.ops.pop(), a2.trys.pop();
                continue;
              default:
                if (!(r2 = a2.trys, (r2 = r2.length > 0 && r2[r2.length - 1]) || 6 !== c4[0] && 2 !== c4[0])) {
                  a2 = 0;
                  continue;
                }
                if (3 === c4[0] && (!r2 || c4[1] > r2[0] && c4[1] < r2[3])) {
                  a2.label = c4[1];
                  break;
                }
                if (6 === c4[0] && a2.label < r2[1]) {
                  a2.label = r2[1], r2 = c4;
                  break;
                }
                if (r2 && a2.label < r2[2]) {
                  a2.label = r2[2], a2.ops.push(c4);
                  break;
                }
                r2[2] && a2.ops.pop(), a2.trys.pop();
                continue;
            }
            c4 = n2.call(e2, a2);
          } catch (e3) {
            c4 = [6, e3], o2 = 0;
          } finally {
            t2 = r2 = 0;
          }
          if (5 & c4[0]) throw c4[1];
          return { value: c4[0] ? c4[1] : void 0, done: true };
        }([c3, u2]);
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
              function a2(e4) {
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
                        var a3 = e5;
                        return e5 instanceof Error && (a3 = null !== (o3 = e5.message) && void 0 !== o3 ? o3 : e5), "string" != typeof a3 ? void i2(false) : void i2(a3.includes("BlobURLs are not yet supported"));
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
              function u2() {
                navigator.webkitTemporaryStorage.queryUsageAndQuota(function(e4, n3) {
                  var t3;
                  i2(Math.round(n3 / 1048576) < 2 * Math.round((void 0 !== (t3 = window).performance && void 0 !== t3.performance.memory && void 0 !== t3.performance.memory.jsHeapSizeLimit ? performance.memory.jsHeapSizeLimit : 1073741824) / 1048576));
                }, function(e4) {
                  n2(new Error("detectIncognito somehow failed to query storage quota: " + e4.message));
                });
              }
              function l2() {
                void 0 !== self.Promise && void 0 !== self.Promise.allSettled ? u2() : (0, window.webkitRequestFileSystem)(0, 1, function() {
                  i2(false);
                }, function() {
                  i2(true);
                });
              }
              void 0 !== (o2 = navigator.vendor) && 0 === o2.indexOf("Apple") && a2(37) ? (r2 = "Safari", c2()) : function() {
                var e4 = navigator.vendor;
                return void 0 !== e4 && 0 === e4.indexOf("Google") && a2(33);
              }() ? (t2 = navigator.userAgent, r2 = t2.match(/Chrome/) ? void 0 !== navigator.brave ? "Brave" : t2.match(/Edg/) ? "Edge" : t2.match(/OPR/) ? "Opera" : "Chrome" : "Chromium", l2()) : void 0 !== document.documentElement && void 0 !== document.documentElement.style.MozAppearance && a2(37) ? (r2 = "Firefox", i2(void 0 === navigator.serviceWorker)) : void 0 !== navigator.msSaveBlob && a2(39) ? (r2 = "Internet Explorer", i2(void 0 === window.indexedDB)) : n2(new Error("detectIncognito cannot determine the browser"));
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
  let UDID = "";
  let UWID = "";
  let intervalId = "";
  async function onLoad() {
    registerChannelId();
    gsService.getUFID();
    UWID = gsService.getUWID();
    UDID = gsService.getUDID();
    gsService.getUTID();
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
    if (!UDID) {
      getUDIDFromIframe();
    }
    getUFIDFromIframe();
    getUTIDFromIframe();
    getThirdPartyCookieStatusFromIframe();
    const userMobileValue = gsService.getUserMobileValue();
    let savedUserProfile = gsService.getUP();
    if (savedUserProfile) {
      savedUserProfile = JSON.parse(savedUserProfile);
    }
    const userMobileNumberSession = savedUserProfile && savedUserProfile.u_mid ? savedUserProfile.u_mid : null;
    if (userMobileValue && (userMobileNumberSession && userMobileNumberSession !== userMobileValue || !userMobileNumberSession)) {
      {
        let userInfo = { u_mid: userMobileValue };
        setCookies(userInfo);
        _triggerEvent(EVENTS_NAME.UPDATE_USER_PROFILE, userInfo);
      }
    } else {
      getCookie();
    }
    UDID && sendUDIDToIframe(UDID);
    if (gsService.getOldUserProfile()) {
      gsService.removeOldUserProfile();
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
    notify: notificationService,
    profile: getUserInfo,
    profileCallback: getUserInfoWithCallback
  };
  const ua = window.SHIPROCKET_ANALYTICS;
  window.ua = ua;
  exports2.ua = ua;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
