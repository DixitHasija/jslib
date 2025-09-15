(function () {
  'use strict';
  var _a2, _b, _c;
  const CONSTANTS = {
      UDID: 'udid',
      UFID: 'ufid',
      PAYLOAD: 'payload',
      UTID: 'utid',
      CHANNEL: 'channel',
      TRACK_INFO: 'track_info',
      UEID: 'ueid',
      UEID_IDENTIFICATION_SOURCE: 'ueid_identification_source',
      UEID_IDENTIFICATION_VERIFIED: 'ueid_identification_verified',
      UEID_IDENTIFICATION_TIME: 'ueid_identification_time',
      UMID: 'umid',
      UMID_IDENTIFICATION_SOURCE: 'umid_identification_source',
      UMID_IDENTIFICATION_VERIFIED: 'umid_identification_verified',
      UMID_IDENTIFICATION_TIME: 'umid_identification_time',
      USER_PROFILE: '_uc_session_v1',
      USER_MOBILE_KEY: 'sc_mid',
      USER_EMAIL_KEY: 'sc_eid',
      UWID: 'uwid',
      INCOGNITO: 'incognito',
      OLD_USER_PROFILE: '_uc_session',
      THIRD_PARTY_COOKIE_BLOCKED: 'third_party_cookie_blocked',
      TEMPORARY_COOKIE: 'temporary_cookie',
      BROWSER_NAME: 'browser_name',
      DEVICE_TYPE: 'device_type',
      SR_COMPANY_ID: 'sr_company_id',
      FINGERPRINT_V2: 'ufid_v2',
      DEVICE_OS_TYPE: 'device_os_type',
      SHOPIFY_LAST_CUSTOMER_INFO_FETCH: 'shopify_last_customer_info_fetch',
      SHOPIFY: 'SHOPIFY',
      WIGZO_LEARNER_ID: 'wigzo_learner_id',
      WIGZO_UMID_FETCHED_TIME: 'wigzo_umid_fetched_time',
      EVENT_SOURCE: 'event_source',
      UNIVERSAL_COOKIES: 'uc',
    },
    CONSTANTS_MAPPING = {
      UDID: 'udid',
      UFID: 'ufid',
      PAYLOAD: 'payload',
      UTID: 'utid',
      EVENT_NAME: 'event_name',
      CHANNEL: 'channel',
      URL: 'url',
      UEID: 'ueid',
      UEID_IDENTIFICATION_SOURCE: 'ueid_identification_source',
      UEID_IDENTIFICATION_VERIFIED: 'ueid_identification_verified',
      UEID_IDENTIFICATION_TIME: 'ueid_identification_time',
      UMID: 'umid',
      UMID_IDENTIFICATION_SOURCE: 'umid_identification_source',
      UMID_IDENTIFICATION_VERIFIED: 'umid_identification_verified',
      UMID_IDENTIFICATION_TIME: 'umid_identification_time',
      UWID: 'uwid',
      INCOGNITO: 'incognito',
      THIRD_PARTY_COOKIE_BLOCKED: 'third_party_cookie_blocked',
      BROWSER_NAME: 'browser_name',
      DEVICE_TYPE: 'device_type',
      DEVICE_OS_TYPE: 'device_os_type',
      SR_COMPANY_ID: 'sr_company_id',
      FINGERPRINT_V2: 'ufid_v2',
    },
    EVENTS_NAME = {
      ON_LOAD: 'page_view',
      ATC: 'atc',
      BUY: 'buy',
      ORDER: 'order',
      REGISTER: 'register',
      LOGIN: 'login',
      LOGOUT: 'logout',
      PDP_VIEW: 'pdp_view',
      UPDATE_UMID: 'update_umid',
      UPDATE_UEID: 'update_ueid',
      UPDATE_USER_PROFILE: 'update_user_profile',
      ORDER_TRACK: 'order_track',
    },
    CHANNEL_BINARY_VALUE = {
      wigzo: 1,
      promise: 2,
      engage: 4,
      tracking_page: 8,
      checkout: 16,
      my_sr: 32,
      shiprocket: 64,
    },
    FLAGS = { OVERRIDE_UC_SESSION: !0 },
    EVENT_TTL = 2,
    EVENT_AUTO_TRIGGER_TTL = 3,
    CUSTOMER_INFO_FETCH_INTERVAL = 3e5,
    I_FRAME_ID = '__uc_iframe',
    BLOCKED_CHANNELS = [],
    MESSAGE_EVENT_LIST = {
      GET_USER_PROFILE_FROM_IFRAME: 'getUserProfileFromIframe',
      SET_USER_PROFILE_TO_IFRAME: 'setUserProfileToIframe',
      SEND_USER_PROFILE_TO_PARENT: 'sendUserProfileToParent',
      GET_UDID_FROM_IFRAME: 'getUDIDFromIframe',
      SEND_UDID_TO_PARENT: 'sendUDIDToParent',
      SEND_UDID_TO_IFRAME: 'sendUDIDToIframe',
      GET_UTID_FROM_IFRAME: 'getUTIDFromIframe',
      SEND_UTID_TO_PARENT: 'sendUTIDToParent',
      GET_UFID_FROM_IFRAME: 'getUFIDFromIframe',
      SEND_UFID_TO_PARENT: 'sendUFIDToParent',
      GET_THIRD_PARTY_COOKIE_STATUS_FROM_IFRAME:
        'getThirdPartyCookieStatusFromIframe',
      SEND_THIRD_PARTY_COOKIE_STATUS_TO_PARENT:
        'sendThirdPartyCookieStatusToParent',
      GET_TEMPORARY_UFID_FROM_IFRAME: 'getTemporaryUFIDFromIframe',
      SEND_TEMPORARY_UFID_To_PARENT: 'sendTemporaryUFIDToParent',
    },
    NOTIFICATION_EVENT_LIST = {
      OTP_VERIFIED: 'otp_verified',
      USER_IDENTIFIER_STORAGE_REQUEST: 'user_identifier_storage_request',
    },
    LOCALSTORAGE_KEY = '__uc_site',
    UMID_IDENTIFICATION_VERIFICATION_CHANNEL_MAP = {
      WIGZO: !1,
      PROMISE: !1,
      ENGAGE: !1,
      TRACKING_PAGE: !0,
      CHECKOUT: !0,
      MY_SR: !0,
      SHIPROCKET: !1,
    },
    URL_CONFIG = {
      SCRIPT_ID: 'uc_shiprocket',
      ERROR_MESSAGE: 'Failed to parse URL parameters',
    };
  class URLParseError extends Error {
    constructor(e, t) {
      super(e), (this.name = 'URLParseError'), (this.context = t);
    }
  }
  const extractQueryString = (e) => e.split('?')[1] || '',
    getAllURLParams = () => {
      var e;
      try {
        const t =
          document.getElementById(URL_CONFIG.SCRIPT_ID) ||
          ((null == document ? void 0 : document.currentScript) instanceof
          HTMLScriptElement
            ? document.currentScript
            : null);
        if (t instanceof HTMLScriptElement) {
          const r =
              (null == (e = null == document ? void 0 : document.currentScript)
                ? void 0
                : e.src) || t.src,
            n = extractQueryString(r);
          return n ? new URLSearchParams(n) : new URLSearchParams();
        }
        return new URLSearchParams();
      } catch (t) {
        new URLParseError(URL_CONFIG.ERROR_MESSAGE, {
          originalError: t,
          timestamp: new Date().toISOString(),
        });
        return new URLSearchParams();
      }
    },
    getURLParam = (e) => {
      if (!e || 'string' != typeof e) return null;
      try {
        return getAllURLParams().get(e);
      } catch (t) {
        return null;
      }
    },
    _checkValueIsNotEmpty = (e) =>
      0 === e ||
      !1 === e ||
      (!!e &&
        ('string' == typeof e
          ? e.trim().length > 0
          : 'object' != typeof e || Object.keys(e).length > 0)),
    isShopifyStore = () => {
      const e = [
          document.querySelector('script[src*="shopify"]'),
          document.querySelector('link[href*="shopify"]'),
          document.querySelector('meta[name="shopify-checkout-api-token"]'),
          document.querySelector('meta[name="shopify-digital-wallet"]'),
          document.querySelector('meta[name="shopify-pay-terms"]'),
        ],
        t = [
          window.Shopify,
          window.ShopifyAnalytics,
          window.ShopifyCheckout,
          window.ShopifyPay,
        ],
        r = e.some((e) => null !== e),
        n = t.some((e) => void 0 !== e),
        i =
          document.body.classList.contains('shopify') ||
          document.body.classList.contains('shopify-theme');
      return r || n || i;
    },
    getShopifyCustomerId = () => {
      var e, t, r;
      return null ==
        (r =
          null ==
          (t =
            null == (e = null == window ? void 0 : window.ShopifyAnalytics)
              ? void 0
              : e.meta)
            ? void 0
            : t.page)
        ? void 0
        : r.customerId;
    },
    getShopifyStoreUrl = () => {
      var e;
      return null == (e = null == window ? void 0 : window.Shopify)
        ? void 0
        : e.shop;
    },
    getShopifyProductPrice = () => {
      var e, t, r;
      let n = '',
        i = '';
      const o =
        null ==
        (r =
          null ==
          (t =
            null ==
            (e = null == ShopifyAnalytics ? void 0 : ShopifyAnalytics.meta)
              ? void 0
              : e.product)
            ? void 0
            : t.variants)
          ? void 0
          : r[0];
      o && 'number' == typeof o.price && (n = (o.price / 100).toFixed(2));
      const a = document.querySelector(
          '.price-item--sale, .product__price, .price--highlight',
        ),
        c = document.querySelector(
          '.price-item--compare, .price__compare, s, del',
        );
      if (a) {
        const e = a.textContent.trim().replace(/[^\d.]/g, '');
        e && (n = e);
      }
      if (c) {
        const e = c.textContent.trim().replace(/[^\d.]/g, '');
        e && e !== n && (i = e);
      }
      if (!n || !i) {
        const e = [...document.querySelectorAll('span, div, s, del')]
            .map((e) => e.textContent.trim().replace(/[^\d.₹]/g, ''))
            .filter((e) => /^₹?\d{2,6}(\.\d{1,2})?$/.test(e))
            .map((e) => e.replace(/[^\d.]/g, '')),
          t = [...new Set(e.map(Number))].sort((e, t) => t - e);
        !n && t.length > 0 && (n = t[t.length - 1].toFixed(2)),
          !i && t.length > 1 && (i = t[0].toFixed(2));
      }
      return i || (i = n), { sellingPrice: n, mrp: i };
    };
  function getRandomUUID() {
    var e;
    return (
      (self &&
        (null == self ? void 0 : self.crypto) &&
        (null == (e = null == self ? void 0 : self.crypto)
          ? void 0
          : e.randomUUID)) ||
        (self.crypto.randomUUID = function () {
          const e = self.crypto || self.msCrypto;
          !e || e.getRandomValues;
          const t = new Uint8Array(16);
          e.getRandomValues(t),
            (t[6] = (15 & t[6]) | 64),
            (t[8] = (63 & t[8]) | 128);
          const r = [];
          for (let n = 0; n < 256; ++n)
            r.push((n + 256).toString(16).substr(1));
          return (
            r[t[0]] +
            r[t[1]] +
            r[t[2]] +
            r[t[3]] +
            '-' +
            r[t[4]] +
            r[t[5]] +
            '-' +
            r[t[6]] +
            r[t[7]] +
            '-' +
            r[t[8]] +
            r[t[9]] +
            '-' +
            r[t[10]] +
            r[t[11]] +
            r[t[12]] +
            r[t[13]] +
            r[t[14]] +
            r[t[15]]
          ).toLowerCase();
        }),
      self.crypto.randomUUID()
    );
  }
  function jsonStringify(e) {
    return e ? JSON.stringify(e) : null;
  }
  function jsonParse(e) {
    return e ? JSON.parse(e) : null;
  }
  function getURL() {
    return window.location.href;
  }
  const getCurrentTimeStamp = () => new Date().getTime(),
    differenceBetweenTwoTimestampsInSeconds = (e, t) => {
      if (!e || !t) return null;
      const r = new Date(e),
        n = new Date(t) - r;
      return Math.floor(n / 1e3);
    },
    combineObjects = (e, t) => {
      let r = { ...e };
      for (let n in t)
        r.hasOwnProperty(n)
          ? Array.isArray(r[n]) && Array.isArray(t[n])
            ? (r[n] = combineUniqueObjects(r[n], t[n]))
            : ('string' == typeof r[n] && 'string' == typeof t[n]) ||
                ('number' == typeof r[n] && 'number' == typeof t[n])
              ? (r[n] = r[n])
              : typeof r[n] != typeof t[n] &&
                ['string', 'number'].includes(typeof t[n]) &&
                ['string', 'number'].includes(typeof r[n]) &&
                (_checkValueIsNotEmpty(r[n])
                  ? (r[n] = String(r[n]))
                  : _checkValueIsNotEmpty(t[n]) && (r[n] = String(t[n])))
          : (r[n] = t[n]);
      return r;
    };
  function combineUniqueObjects(e, t) {
    function r(e, t) {
      const i = Object.keys(e),
        o = Object.keys(t);
      if (i.length !== o.length) return !1;
      for (let a of i) {
        const i = e[a],
          o = t[a],
          c = n(i) && n(o);
        if ((c && !r(i, o)) || (!c && i !== o)) return !1;
      }
      return !0;
    }
    function n(e) {
      return null != e && 'object' == typeof e;
    }
    return e.concat(t).filter((e, t, n) => t === n.findIndex((t) => r(t, e)));
  }
  function intersectionInTwoArrays(e, t) {
    let r = new Set(e),
      n = new Set(t);
    return [...r.intersection(n)];
  }
  function getChannelNameFromId(e) {
    return Object.keys(CHANNEL_BINARY_VALUE).find(
      (t) => CHANNEL_BINARY_VALUE[t].toString() === e.toString(),
    );
  }
  function detectBrowserInfo() {
    if ('undefined' == typeof navigator)
      return 'unknown browser (unknown version)';
    const e = navigator.userAgent,
      t = { Edg: 'Edge', OPR: 'Opera' },
      r = [
        /(?<name>Edge|Edg)\/(?<version>\d+(?:\.\d+)?)/,
        /(?<name>(?:Chrome|Chromium|OPR|Opera|Vivaldi|Brave))\/(?<version>\d+(?:\.\d+)?)/,
        /(?<name>(?:Firefox|Waterfox|Iceweasel|IceCat))\/(?<version>\d+(?:\.\d+)?)/,
        /(?<name>Safari)\/(?<version>\d+(?:\.\d+)?)/,
        /(?<name>MSIE|Trident|IEMobile).+?(?<version>\d+(?:\.\d+)?)/,
        /(?<name>[A-Za-z]+)\/(?<version>\d+(?:\.\d+)?)/,
        /(?<name>SamsungBrowser)\/(?<version>\d+(?:\.\d+)?)/,
      ];
    let n = 'unknown',
      i = 'unknown';
    for (const a of r) {
      const r = e.match(a);
      if (null == r ? void 0 : r.groups) {
        (n = t[r.groups.name] || r.groups.name), (i = r.groups.version);
        break;
      }
    }
    let o = '';
    return (
      /FBAN|FBAV/i.test(e)
        ? (o = ' (Facebook In-App Browser)')
        : /Instagram/i.test(e)
          ? (o = ' (Instagram In-App Browser)')
          : /Messenger|FB_IAB/i.test(e) && (o = ' (Messenger In-App Browser)'),
      `${n} (version ${i})${o}`
    );
  }
  function getDeviceType() {
    const e = navigator.userAgent.toLowerCase();
    return /mobile|android|iphone|ipad|tablet/i.test(e) ? 'Mobile' : 'Laptop';
  }
  function getDeviceOSType() {
    const e = navigator.userAgent.toLowerCase(),
      t = navigator.platform.toLowerCase();
    return /iphone|ipad|ipod/.test(e) ||
      (navigator.maxTouchPoints > 0 && /Macintosh/.test(e) && !window.MSStream)
      ? 'iOS'
      : /android/.test(e) || (navigator.maxTouchPoints > 0 && /Linux/.test(t))
        ? 'Android'
        : /win/.test(t) || /windows/.test(e) || 0 === navigator.plugins.length
          ? 'Windows'
          : /mac/.test(t) ||
              /macintosh/.test(e) ||
              (navigator.plugins.length > 0 && /Macintosh/.test(e))
            ? 'macOS'
            : /linux/.test(t) ||
                /linux/.test(e) ||
                (navigator.plugins.length > 0 && /Linux/.test(t))
              ? 'Linux'
              : 'Unknown';
  }
  const objectName = LOCALSTORAGE_KEY;
  let localStorageObject = {};
  function set(e, t) {
    localStorage.setItem(e, t), (localStorageObject = jsonParse(t));
  }
  function get() {
    var e;
    return (
      (localStorageObject =
        (localStorageObject &&
          localStorageObject.key &&
          (null ==
            (e =
              null == localStorageObject ? void 0 : localStorageObject.key) ||
            e.length),
        jsonParse(localStorage.getItem(objectName)))),
      localStorageObject
    );
  }
  function clear() {
    localStorage.clear();
  }
  function len() {
    return localStorage.length;
  }
  function wget(e) {
    const t = get();
    return e && t ? t[e] : t;
  }
  function wSet(e, t) {
    var r;
    let n = wget();
    (n && (null == (r = Object.keys(n)) ? void 0 : r.length)) || (n = {}),
      (n[e] = t),
      set(objectName, jsonStringify(n));
  }
  function wRemove(e) {
    let t = wget();
    delete t[e], set(objectName, t);
  }
  function directSet(e, t) {
    set(e, jsonStringify(t));
  }
  function directGet(e) {
    return localStorage.getItem(e);
  }
  function directRemove(e) {
    localStorage.removeItem(e);
  }
  const LocalStorageService = {
    set: wSet,
    get: wget,
    clear: clear,
    remove: wRemove,
    len: len,
    directSet: directSet,
    directGet: directGet,
    directRemove: directRemove,
  };
  function getUDID() {
    return LocalStorageService.get(CONSTANTS.UDID);
  }
  function setUDID(e) {
    LocalStorageService.set(CONSTANTS.UDID, e);
  }
  function getPAYLOAD() {
    return LocalStorageService.get(CONSTANTS.PAYLOAD);
  }
  function setPAYLOAD(e) {
    LocalStorageService.set(CONSTANTS.PAYLOAD, e);
  }
  function getUTID() {
    return LocalStorageService.get(CONSTANTS.UTID);
  }
  function setUTID(e) {
    LocalStorageService.set(CONSTANTS.UTID, e);
  }
  function getUFID() {
    return LocalStorageService.get(CONSTANTS.UFID);
  }
  function setUFID(e) {
    LocalStorageService.set(CONSTANTS.UFID, e);
  }
  function getChannels() {
    return LocalStorageService.get(CONSTANTS.CHANNEL);
  }
  function getBitwiseChannelList() {
    let e = getChannels(),
      t = 0;
    return (
      null == e ||
        e.forEach((e) => {
          e && (t += parseInt(e));
        }),
      t ? t.toString() : '0'
    );
  }
  function setChannel(e) {
    let t = getChannels();
    (t && t.length) || (t = [e]),
      (null == t ? void 0 : t.includes(e)) || t.push(e),
      LocalStorageService.set(CONSTANTS.CHANNEL, t);
  }
  function getTrackInfo() {
    return LocalStorageService.get(CONSTANTS.TRACK_INFO);
  }
  function setTrackInfo(e) {
    let t = LocalStorageService.get(CONSTANTS.TRACK_INFO);
    (t = { ...t, ...e }), LocalStorageService.set(CONSTANTS.TRACK_INFO, t);
  }
  function removeTrackInfo(e) {
    let t = LocalStorageService.get(CONSTANTS.TRACK_INFO);
    t.hasOwnProperty(e) &&
      (delete t[e], LocalStorageService.set(CONSTANTS.TRACK_INFO, t));
  }
  function getUMID() {
    return LocalStorageService.get(CONSTANTS.UMID);
  }
  function setUMID(e) {
    LocalStorageService.set(CONSTANTS.UMID, e);
  }
  function getUMIDIdentificationSource() {
    return LocalStorageService.get(CONSTANTS.UMID_IDENTIFICATION_SOURCE);
  }
  function setUMIDIdentificationSource(e) {
    LocalStorageService.set(CONSTANTS.UMID_IDENTIFICATION_SOURCE, e);
  }
  function setUMIDIdentificationTime(e) {
    LocalStorageService.set(CONSTANTS.UMID_IDENTIFICATION_TIME, e);
  }
  function getUMIDIdentificationTime(e) {
    return LocalStorageService.get(CONSTANTS.UMID_IDENTIFICATION_TIME);
  }
  function getUEIDIdentificationSource() {
    return LocalStorageService.get(CONSTANTS.UEID_IDENTIFICATION_SOURCE);
  }
  function setUEIDIdentificationSource(e) {
    LocalStorageService.set(CONSTANTS.UEID_IDENTIFICATION_SOURCE, e);
  }
  function setUEIDIdentificationTime(e) {
    LocalStorageService.set(CONSTANTS.UEID_IDENTIFICATION_TIME, e);
  }
  function getUEIDIdentificationTime(e) {
    return LocalStorageService.get(CONSTANTS.UEID_IDENTIFICATION_TIME);
  }
  function getUEID() {
    return LocalStorageService.get(CONSTANTS.UEID);
  }
  function setUEID(e) {
    LocalStorageService.set(CONSTANTS.UEID, e);
  }
  function setUP(e) {
    LocalStorageService.directSet(CONSTANTS.USER_PROFILE, e);
  }
  function getUP() {
    return LocalStorageService.directGet(CONSTANTS.USER_PROFILE);
  }
  function getUserMobileValue() {
    return LocalStorageService.directGet(CONSTANTS.USER_MOBILE_KEY);
  }
  function getUserEmailValue() {
    return LocalStorageService.directGet(CONSTANTS.USER_EMAIL_KEY);
  }
  function getUWID() {
    return LocalStorageService.get(CONSTANTS.UWID);
  }
  function setUWID(e) {
    LocalStorageService.set(CONSTANTS.UWID, e);
  }
  function getPrivateMode() {
    return LocalStorageService.get(CONSTANTS.INCOGNITO);
  }
  function setPrivateMode(e) {
    LocalStorageService.set(CONSTANTS.INCOGNITO, e);
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
  function setThirdPartyCookieStatus(e) {
    LocalStorageService.set(CONSTANTS.THIRD_PARTY_COOKIE_BLOCKED, e);
  }
  function getSrCompanyId() {
    return LocalStorageService.get(CONSTANTS.SR_COMPANY_ID);
  }
  function setSrCompanyId(e) {
    LocalStorageService.set(CONSTANTS.SR_COMPANY_ID, e);
  }
  function getTemporaryUfid() {
    return LocalStorageService.get(CONSTANTS.FINGERPRINT_V2);
  }
  function setTemporaryUfid(e) {
    LocalStorageService.set(CONSTANTS.FINGERPRINT_V2, e);
  }
  function getShopifyLastCustomerInfoFetch() {
    return LocalStorageService.get(CONSTANTS.SHOPIFY_LAST_CUSTOMER_INFO_FETCH);
  }
  function setShopifyLastCustomerInfoFetch(e) {
    LocalStorageService.set(CONSTANTS.SHOPIFY_LAST_CUSTOMER_INFO_FETCH, e);
  }
  function getWigzoLearnerId() {
    return LocalStorageService.get(CONSTANTS.WIGZO_LEARNER_ID);
  }
  function setWigzoLearnerId(e) {
    LocalStorageService.set(CONSTANTS.WIGZO_LEARNER_ID, e);
  }
  function getWigzoUmidFetchedTime() {
    return LocalStorageService.get(CONSTANTS.WIGZO_UMID_FETCHED_TIME);
  }
  function setWigzoUmidFetchedTime(e) {
    LocalStorageService.set(CONSTANTS.WIGZO_UMID_FETCHED_TIME, e);
  }
  const gsService = {
    getUDID: getUDID,
    setUDID: setUDID,
    getPAYLOAD: getPAYLOAD,
    setPAYLOAD: setPAYLOAD,
    getUTID: getUTID,
    setUTID: setUTID,
    getUFID: getUFID,
    setUFID: setUFID,
    getChannels: getChannels,
    setChannel: setChannel,
    getBitwiseChannelList: getBitwiseChannelList,
    getTrackInfo: getTrackInfo,
    setTrackInfo: setTrackInfo,
    getUMID: getUMID,
    setUMID: setUMID,
    getUMIDIdentificationSource: getUMIDIdentificationSource,
    setUMIDIdentificationSource: setUMIDIdentificationSource,
    getUMIDIdentificationTime: getUMIDIdentificationTime,
    setUMIDIdentificationTime: setUMIDIdentificationTime,
    getUEIDIdentificationSource: getUEIDIdentificationSource,
    setUEIDIdentificationSource: setUEIDIdentificationSource,
    getUEIDIdentificationTime: getUEIDIdentificationTime,
    setUEIDIdentificationTime: setUEIDIdentificationTime,
    getUEID: getUEID,
    setUEID: setUEID,
    removeTrackInfo: removeTrackInfo,
    setUP: setUP,
    getUP: getUP,
    getUserMobileValue: getUserMobileValue,
    getUserEmailValue: getUserEmailValue,
    getUWID: getUWID,
    setUWID: setUWID,
    getPrivateMode: getPrivateMode,
    setPrivateMode: setPrivateMode,
    getOldUserProfile: getOldUserProfile,
    removeOldUserProfile: removeOldUserProfile,
    getThirdPartyCookieStatus: getThirdPartyCookieStatus,
    setThirdPartyCookieStatus: setThirdPartyCookieStatus,
    getSrCompanyId: getSrCompanyId,
    setSrCompanyId: setSrCompanyId,
    getTemporaryUfid: getTemporaryUfid,
    setTemporaryUfid: setTemporaryUfid,
    getShopifyLastCustomerInfoFetch: getShopifyLastCustomerInfoFetch,
    setShopifyLastCustomerInfoFetch: setShopifyLastCustomerInfoFetch,
    getWigzoLearnerId: getWigzoLearnerId,
    setWigzoLearnerId: setWigzoLearnerId,
    getWigzoUmidFetchedTime: getWigzoUmidFetchedTime,
    setWigzoUmidFetchedTime: setWigzoUmidFetchedTime,
  };
  function sendEvent(e) {
    if (
      0 ===
      intersectionInTwoArrays(BLOCKED_CHANNELS, gsService.getChannels()).length
    ) {
      let r = 'https://uc.shiprocket.in' + '/v1/track/user';
      try {
        fetch(r, {
          method: 'POST',
          body: JSON.stringify(e),
          headers: { 'Content-type': 'application/json' },
        })
          .then((e) => e.json())
          .then((e) => e);
      } catch (t) {}
    }
  }
  function getShopifyCustomerInfo(e, t, r) {
    return new Promise((n, i) => {
      try {
        let o =
          'https://sr-engage-apiv2.shiprocket.in' +
          '/uc/shopify/customer/details';
        const a = new Headers();
        a.append('Content-Type', 'application/json');
        let c = 'WC1VQy1BQ0NFU1MtVE9LRU4=';
        a.append('X-UC-ACCESS-TOKEN', c);
        const s = {
            store_url: e,
            customer_id: String(t),
            sr_company_id: Number(r),
          },
          u = { method: 'POST', headers: a, body: JSON.stringify(s) };
        fetch(o, u)
          .then((e) => e.json())
          .then((e) => n(e))
          .catch((e) => i(e));
      } catch (o) {
        i(o);
      }
    });
  }
  function apiBodyDataMapper(e, t) {
    var r, n;
    if (!Object.values(EVENTS_NAME).includes(e)) return;
    let i = {
      [CONSTANTS_MAPPING.EVENT_NAME]: e,
      [CONSTANTS_MAPPING.UFID]: gsService.getUFID(),
      [CONSTANTS_MAPPING.UDID]: gsService.getUDID(),
      [CONSTANTS_MAPPING.URL]: getURL(),
      [CONSTANTS_MAPPING.CHANNEL]: gsService.getBitwiseChannelList(),
      [CONSTANTS_MAPPING.UTID]: gsService.getUTID(),
      [CONSTANTS_MAPPING.PAYLOAD]: _payloadMapper(e, t),
      [CONSTANTS_MAPPING.UWID]: gsService.getUWID(),
      [CONSTANTS_MAPPING.UEID]: gsService.getUEID(),
      [CONSTANTS_MAPPING.UMID]: gsService.getUMID(),
      [CONSTANTS_MAPPING.INCOGNITO]: gsService.getPrivateMode(),
      [CONSTANTS_MAPPING.THIRD_PARTY_COOKIE_BLOCKED]:
        gsService.getThirdPartyCookieStatus(),
      [CONSTANTS_MAPPING.BROWSER_NAME]: detectBrowserInfo(),
      [CONSTANTS_MAPPING.DEVICE_TYPE]: getDeviceType(),
      [CONSTANTS_MAPPING.DEVICE_OS_TYPE]: getDeviceOSType(),
    };
    const o = gsService.getUMIDIdentificationSource();
    if (o) {
      i[CONSTANTS_MAPPING.UMID_IDENTIFICATION_SOURCE] = o;
      const e = gsService.getUMIDIdentificationTime();
      e && (i[CONSTANTS_MAPPING.UMID_IDENTIFICATION_TIME] = e);
      const t =
        null == (r = getChannelNameFromId(o)) ? void 0 : r.toUpperCase();
      t &&
        (i[CONSTANTS_MAPPING.UMID_IDENTIFICATION_VERIFIED] =
          UMID_IDENTIFICATION_VERIFICATION_CHANNEL_MAP[t]);
    }
    const a = gsService.getUEIDIdentificationSource();
    if (a) {
      i[CONSTANTS_MAPPING.UEID_IDENTIFICATION_SOURCE] = a;
      const e = gsService.getUEIDIdentificationTime();
      e && (i[CONSTANTS_MAPPING.UEID_IDENTIFICATION_TIME] = e);
      const t =
        null == (n = getChannelNameFromId(a)) ? void 0 : n.toUpperCase();
      t &&
        (i[CONSTANTS_MAPPING.UEID_IDENTIFICATION_VERIFIED] =
          UMID_IDENTIFICATION_VERIFICATION_CHANNEL_MAP[t]);
    }
    const c = gsService.getSrCompanyId();
    c && (i[CONSTANTS_MAPPING.SR_COMPANY_ID] = c);
    const s = gsService.getTemporaryUfid();
    return s && (i[CONSTANTS_MAPPING.FINGERPRINT_V2] = s), sendEvent(i), i;
  }
  function _payloadMapper(e, t) {
    var r, n, i, o, a, c, s, u, l, d, m, f, p, v, g, h, _, S, I, E;
    let T = {};
    switch (e) {
      case EVENTS_NAME.ON_LOAD:
        T = { url: getURL(), page_type: '', referrer: '' };
        break;
      case EVENTS_NAME.PDP_VIEW: {
        const e = (null == t ? void 0 : t.mrp)
          ? null == t
            ? void 0
            : t.mrp
          : (isShopifyStore() &&
              (null == (r = getShopifyProductPrice()) ? void 0 : r.mrp)) ||
            0;
        T = {
          cart_id: null == t ? void 0 : t.cart_id,
          name: null == t ? void 0 : t.name,
          items: [
            {
              name: null == t ? void 0 : t.name,
              mrp: e,
              selling_price: null == t ? void 0 : t.selling_price,
              variant_id: null == t ? void 0 : t.variant_id,
              qty: (null == t ? void 0 : t.qty) || 1,
              category: null == t ? void 0 : t.category,
              product_id: null == t ? void 0 : t.product_id,
              image: null == t ? void 0 : t.image,
              description: null == t ? void 0 : t.description,
              sku: null == t ? void 0 : t.sku,
            },
          ],
          referrer: null == t ? void 0 : t.referrer,
          event_source: null == t ? void 0 : t.event_source,
        };
        break;
      }
      case EVENTS_NAME.ATC: {
        const e = (null == t ? void 0 : t.mrp)
          ? null == t
            ? void 0
            : t.mrp
          : (isShopifyStore() &&
              (null == (n = getShopifyProductPrice()) ? void 0 : n.mrp)) ||
            0;
        T = {
          cart_id: null == t ? void 0 : t.cart_id,
          name: null == t ? void 0 : t.name,
          items: [
            {
              name: null == t ? void 0 : t.name,
              mrp: e,
              selling_price: null == t ? void 0 : t.selling_price,
              variant_id: null == t ? void 0 : t.variant_id,
              qty: (null == t ? void 0 : t.qty) || 1,
              category: null == t ? void 0 : t.category,
              product_id: null == t ? void 0 : t.product_id,
              image: null == t ? void 0 : t.image,
              description: null == t ? void 0 : t.description,
              sku: null == t ? void 0 : t.sku,
            },
          ],
          referrer: null == t ? void 0 : t.referrer,
          event_source: null == t ? void 0 : t.event_source,
        };
        break;
      }
      case EVENTS_NAME.BUY: {
        let e = [];
        for (
          let r = 0;
          r < (null == (i = null == t ? void 0 : t.items) ? void 0 : i.length);
          r++
        ) {
          const n = {
            product_id:
              null == (o = null == t ? void 0 : t.items[r])
                ? void 0
                : o.product_id,
            name:
              null == (a = null == t ? void 0 : t.items[r]) ? void 0 : a.name,
            mrp: null == (c = null == t ? void 0 : t.items[r]) ? void 0 : c.mrp,
            selling_price:
              null == (s = null == t ? void 0 : t.items[r])
                ? void 0
                : s.selling_price,
            variant_id:
              null == (u = null == t ? void 0 : t.items[r])
                ? void 0
                : u.variant_id,
            qty: null == (l = null == t ? void 0 : t.items[r]) ? void 0 : l.qty,
            category:
              null == (d = null == t ? void 0 : t.items[r])
                ? void 0
                : d.category,
            image:
              null == (m = null == t ? void 0 : t.items[r]) ? void 0 : m.image,
            description:
              null == (f = null == t ? void 0 : t.items[r])
                ? void 0
                : f.description,
            sku: null == (p = null == t ? void 0 : t.items[r]) ? void 0 : p.sku,
          };
          e.push(n);
        }
        T = {
          source_channel: null == t ? void 0 : t.source_channel,
          items: e,
          referrer: null == t ? void 0 : t.referrer,
          order_total_amt: null == t ? void 0 : t.order_total_amt,
          order_qty: null == t ? void 0 : t.order_qty,
          cart_id: null == t ? void 0 : t.cart_id,
          couponData: null == t ? void 0 : t.couponData,
          event_source: null == t ? void 0 : t.event_source,
        };
        break;
      }
      case EVENTS_NAME.ORDER: {
        let e = [];
        for (
          let r = 0;
          r < (null == (v = null == t ? void 0 : t.items) ? void 0 : v.length);
          r++
        ) {
          const n = {
            id: null == (g = null == t ? void 0 : t.items[r]) ? void 0 : g.id,
            name:
              null == (h = null == t ? void 0 : t.items[r]) ? void 0 : h.name,
            mrp: null == (_ = null == t ? void 0 : t.items[r]) ? void 0 : _.mrp,
            selling_price:
              null == (S = null == t ? void 0 : t.items[r])
                ? void 0
                : S.selling_price,
            variant_id:
              null == (I = null == t ? void 0 : t.items[r])
                ? void 0
                : I.variant_id,
            qty: null == (E = null == t ? void 0 : t.items[r]) ? void 0 : E.qty,
          };
          e.push(n);
        }
        T = {
          items: e,
          id: null == t ? void 0 : t.id,
          status: null == t ? void 0 : t.status,
          method: null == t ? void 0 : t.method,
          order_id: null == t ? void 0 : t.order_id,
          customer_id: null == t ? void 0 : t.customer_id,
          phone: null == t ? void 0 : t.phone,
          name: null == t ? void 0 : t.name,
          email: null == t ? void 0 : t.email,
          total_price: null == t ? void 0 : t.total_price,
          zip: null == t ? void 0 : t.zip,
          referrer: null == t ? void 0 : t.referrer,
          sla: null == t ? void 0 : t.sla,
          coupon_detail: null == t ? void 0 : t.coupon_detail,
          event_source: null == t ? void 0 : t.event_source,
        };
        break;
      }
      case EVENTS_NAME.REGISTER:
        T = {
          name: null == t ? void 0 : t.name,
          mobile: null == t ? void 0 : t.mobile,
          gender: null == t ? void 0 : t.gender,
          email: null == t ? void 0 : t.email,
          dob: null == t ? void 0 : t.dob,
          source_channel: null == t ? void 0 : t.source_channel,
          event_source: null == t ? void 0 : t.event_source,
        };
        break;
      case EVENTS_NAME.LOGIN:
        T = {
          name: null == t ? void 0 : t.name,
          mobile: null == t ? void 0 : t.mobile,
          source_channel: null == t ? void 0 : t.source_channel,
          email: null == t ? void 0 : t.email,
          event_source: null == t ? void 0 : t.event_source,
        };
        break;
      case EVENTS_NAME.LOGOUT:
        T = {
          name: null == t ? void 0 : t.name,
          mobile: null == t ? void 0 : t.mobile,
          event_source: null == t ? void 0 : t.event_source,
        };
        break;
      case EVENTS_NAME.ORDER_TRACK:
        T = {
          awb: null == t ? void 0 : t.awb,
          channel_order_id: null == t ? void 0 : t.channel_order_id,
          sr_order_id: null == t ? void 0 : t.sr_order_id,
          channel: null == t ? void 0 : t.channel,
          edd: null == t ? void 0 : t.edd,
          order_date: null == t ? void 0 : t.order_date,
          order_status: null == t ? void 0 : t.order_status,
          order_amount: null == t ? void 0 : t.order_amount,
          payment_mode: null == t ? void 0 : t.payment_mode,
          pincode_pickup: null == t ? void 0 : t.pincode_pickup,
          pincode_delivery: null == t ? void 0 : t.pincode_delivery,
          user_info: null == t ? void 0 : t.user_info,
          courier_info: null == t ? void 0 : t.courier_info,
          return: null == t ? void 0 : t.return,
        };
    }
    return T;
  }
  async function get_SHA_256(e) {
    const t = new TextEncoder().encode(e),
      r = await crypto.subtle.digest('SHA-256', t);
    return Array.from(new Uint8Array(r))
      .map((e) => e.toString(16).padStart(2, '0'))
      .join('');
  }
  let loadIframeAsync = (e) =>
      new Promise((t, r) => {
        (e.onload = () => t(e)),
          (e.onerror = () => r(new Error('Failed to load iframe')));
      }),
    createIframe = async () => (
      (self.iframe = document.getElementById(I_FRAME_ID)),
      self.iframe ||
        ((self.iframe = document.createElement('iframe')),
        (self.iframe.width = '600'),
        (self.iframe.height = '400'),
        (self.iframe.style.border = 'none'),
        (self.iframe.style.display = 'none'),
        (self.iframe.src =
          'https://sr-promise-prod.s3.ap-south-1.amazonaws.com/sr-promise/static/iframe.html'),
        (self.iframe.id = I_FRAME_ID),
        document.body.appendChild(self.iframe),
        await loadIframeAsync(self.iframe)),
      self.iframe
    );
  function setCookies(e) {
    postMessageMethod(MESSAGE_EVENT_LIST.SET_USER_PROFILE_TO_IFRAME, e);
  }
  let postMessageMethod = (e, t) => {
      self.iframe.contentWindow.postMessage({ name: e, data: t }, '*');
    },
    getCookie = () => {
      postMessageMethod(MESSAGE_EVENT_LIST.GET_USER_PROFILE_FROM_IFRAME);
    },
    getUDIDFromIframe = () => {
      postMessageMethod(MESSAGE_EVENT_LIST.GET_UDID_FROM_IFRAME);
    },
    sendUDIDToIframe = (e) => {
      postMessageMethod(MESSAGE_EVENT_LIST.SEND_UDID_TO_IFRAME, e);
    },
    getUTIDFromIframe = () => {
      postMessageMethod(MESSAGE_EVENT_LIST.GET_UTID_FROM_IFRAME);
    },
    getUFIDFromIframe = () => {
      postMessageMethod(MESSAGE_EVENT_LIST.GET_UFID_FROM_IFRAME);
    },
    getThirdPartyCookieStatusFromIframe = () => {
      postMessageMethod(
        MESSAGE_EVENT_LIST.GET_THIRD_PARTY_COOKIE_STATUS_FROM_IFRAME,
      );
    },
    getTemporaryUFIDFromIframe = () => {
      postMessageMethod(MESSAGE_EVENT_LIST.GET_TEMPORARY_UFID_FROM_IFRAME);
    },
    handleMessageEvent = (e) => {
      var t, r, n, i, o, a, c, s, u, l, d, m, f, p, v, g;
      switch (null == (t = null == e ? void 0 : e.data) ? void 0 : t.name) {
        case MESSAGE_EVENT_LIST.SEND_USER_PROFILE_TO_PARENT:
          delete window.gettingCookiesFromIframe,
            (null == (r = null == e ? void 0 : e.data) ? void 0 : r.data) &&
              Object.keys(
                null == (n = null == e ? void 0 : e.data) ? void 0 : n.data,
              ).length &&
              FLAGS.OVERRIDE_UC_SESSION &&
              (_triggerEvent(EVENTS_NAME.UPDATE_USER_PROFILE, e.data.data),
              (null ==
              (o = null == (i = null == e ? void 0 : e.data) ? void 0 : i.data)
                ? void 0
                : o.u_mid) &&
                gsService.setUMID(
                  null ==
                    (c =
                      null == (a = null == e ? void 0 : e.data)
                        ? void 0
                        : a.data)
                    ? void 0
                    : c.u_mid,
                ),
              (null ==
              (u = null == (s = null == e ? void 0 : e.data) ? void 0 : s.data)
                ? void 0
                : u.u_eid) &&
                gsService.setUEID(
                  null ==
                    (d =
                      null == (l = null == e ? void 0 : e.data)
                        ? void 0
                        : l.data)
                    ? void 0
                    : d.u_eid,
                ));
          break;
        case MESSAGE_EVENT_LIST.SEND_UDID_TO_PARENT:
          gsService.setUDID(
            null == (m = null == e ? void 0 : e.data) ? void 0 : m.data,
          );
          break;
        case MESSAGE_EVENT_LIST.SEND_UTID_TO_PARENT:
          gsService.setUTID(
            null == (f = null == e ? void 0 : e.data) ? void 0 : f.data,
          );
          break;
        case MESSAGE_EVENT_LIST.SEND_UFID_TO_PARENT:
          gsService.setUFID(
            null == (p = null == e ? void 0 : e.data) ? void 0 : p.data,
          );
          break;
        case MESSAGE_EVENT_LIST.SEND_THIRD_PARTY_COOKIE_STATUS_TO_PARENT:
          gsService.setThirdPartyCookieStatus(
            null == (v = null == e ? void 0 : e.data) ? void 0 : v.data,
          );
          break;
        case MESSAGE_EVENT_LIST.SEND_TEMPORARY_UFID_To_PARENT:
          gsService.setTemporaryUfid(
            null == (g = null == e ? void 0 : e.data) ? void 0 : g.data,
          );
      }
    };
  function getUserInfo(e) {
    return new Promise((t, r) => {
      if (!e || '' === e) return void r('HTTP error! MID not found');
      fetch(
        'https://uc.shiprocket.in/v1/user/info?mid=' + e + '&referrer=frontend',
        { method: 'GET', headers: { 'Content-type': 'application/json' } },
      )
        .then((e) => (e.ok || r(`HTTP error! status: ${e.status}`), e.json()))
        .then((e) => t(e))
        .catch((e) => r(e));
    });
  }
  function getUserInfoWithCallback(e, t, r) {
    if (e && '' !== e) {
      var n =
          'https://uc.shiprocket.in/v1/user/info?mid=' +
          e +
          '&referrer=frontend',
        i = new XMLHttpRequest();
      i.open('GET', n, !0),
        i.setRequestHeader('Content-type', 'application/json'),
        (i.onreadystatechange = function () {
          if (4 === i.readyState)
            if (i.status >= 200 && i.status < 300)
              try {
                var e = JSON.parse(i.responseText);
                t(e);
              } catch (n) {
                r(n);
              }
            else r('HTTP error! status: ' + i.status);
        }),
        i.send();
    } else r('HTTP error! MID not found');
  }
  var FingerprintJS = (function (e) {
    var t = function () {
      return (
        (t =
          Object.assign ||
          function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
              for (var i in (t = arguments[r]))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }),
        t.apply(this, arguments)
      );
    };
    function r(e, t, r, n) {
      return new (r || (r = Promise))(function (t, i) {
        function o(e) {
          try {
            c(n.next(e));
          } catch (t) {
            i(t);
          }
        }
        function a(e) {
          try {
            c(n.throw(e));
          } catch (t) {
            i(t);
          }
        }
        function c(e) {
          var n;
          e.done
            ? t(e.value)
            : ((n = e.value),
              n instanceof r
                ? n
                : new r(function (e) {
                    e(n);
                  })).then(o, a);
        }
        c((n = n.apply(e, [])).next());
      });
    }
    function n(e, t) {
      var r,
        n,
        i,
        o,
        a = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: [],
        };
      return (
        (o = { next: c(0), throw: c(1), return: c(2) }),
        'function' == typeof Symbol &&
          (o[Symbol.iterator] = function () {
            return this;
          }),
        o
      );
      function c(c) {
        return function (s) {
          return (function (c) {
            if (r) throw new TypeError('Generator is already executing.');
            for (; o && ((o = 0), c[0] && (a = 0)), a; )
              try {
                if (
                  ((r = 1),
                  n &&
                    (i =
                      2 & c[0]
                        ? n.return
                        : c[0]
                          ? n.throw || ((i = n.return) && i.call(n), 0)
                          : n.next) &&
                    !(i = i.call(n, c[1])).done)
                )
                  return i;
                switch (((n = 0), i && (c = [2 & c[0], i.value]), c[0])) {
                  case 0:
                  case 1:
                    i = c;
                    break;
                  case 4:
                    return a.label++, { value: c[1], done: !1 };
                  case 5:
                    a.label++, (n = c[1]), (c = [0]);
                    continue;
                  case 7:
                    (c = a.ops.pop()), a.trys.pop();
                    continue;
                  default:
                    if (
                      !((i = a.trys),
                      (i = i.length > 0 && i[i.length - 1]) ||
                        (6 !== c[0] && 2 !== c[0]))
                    ) {
                      a = 0;
                      continue;
                    }
                    if (3 === c[0] && (!i || (c[1] > i[0] && c[1] < i[3]))) {
                      a.label = c[1];
                      break;
                    }
                    if (6 === c[0] && a.label < i[1]) {
                      (a.label = i[1]), (i = c);
                      break;
                    }
                    if (i && a.label < i[2]) {
                      (a.label = i[2]), a.ops.push(c);
                      break;
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue;
                }
                c = t.call(e, a);
              } catch (s) {
                (c = [6, s]), (n = 0);
              } finally {
                r = i = 0;
              }
            if (5 & c[0]) throw c[1];
            return { value: c[0] ? c[1] : void 0, done: !0 };
          })([c, s]);
        };
      }
    }
    function i(e, t, r) {
      for (var n, i = 0, o = t.length; i < o; i++)
        (!n && i in t) ||
          (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
      return e.concat(n || Array.prototype.slice.call(t));
    }
    var o = '3.4.2';
    function a(e, t) {
      return new Promise(function (r) {
        return setTimeout(r, e, t);
      });
    }
    function c(e) {
      return !!e && 'function' == typeof e.then;
    }
    function s(e, t) {
      try {
        var r = e();
        c(r)
          ? r.then(
              function (e) {
                return t(!0, e);
              },
              function (e) {
                return t(!1, e);
              },
            )
          : t(!0, r);
      } catch (n) {
        t(!1, n);
      }
    }
    function u(e, t, i) {
      return (
        void 0 === i && (i = 16),
        r(this, 0, void 0, function () {
          var r, o, c, s;
          return n(this, function (n) {
            switch (n.label) {
              case 0:
                (r = Array(e.length)), (o = Date.now()), (c = 0), (n.label = 1);
              case 1:
                return c < e.length
                  ? ((r[c] = t(e[c], c)),
                    (s = Date.now()) >= o + i ? ((o = s), [4, a(0)]) : [3, 3])
                  : [3, 4];
              case 2:
                n.sent(), (n.label = 3);
              case 3:
                return ++c, [3, 1];
              case 4:
                return [2, r];
            }
          });
        })
      );
    }
    function l(e) {
      e.then(void 0, function () {});
    }
    function d(e, t) {
      (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
        (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
      var r = [0, 0, 0, 0];
      return (
        (r[3] += e[3] + t[3]),
        (r[2] += r[3] >>> 16),
        (r[3] &= 65535),
        (r[2] += e[2] + t[2]),
        (r[1] += r[2] >>> 16),
        (r[2] &= 65535),
        (r[1] += e[1] + t[1]),
        (r[0] += r[1] >>> 16),
        (r[1] &= 65535),
        (r[0] += e[0] + t[0]),
        (r[0] &= 65535),
        [(r[0] << 16) | r[1], (r[2] << 16) | r[3]]
      );
    }
    function m(e, t) {
      (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
        (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
      var r = [0, 0, 0, 0];
      return (
        (r[3] += e[3] * t[3]),
        (r[2] += r[3] >>> 16),
        (r[3] &= 65535),
        (r[2] += e[2] * t[3]),
        (r[1] += r[2] >>> 16),
        (r[2] &= 65535),
        (r[2] += e[3] * t[2]),
        (r[1] += r[2] >>> 16),
        (r[2] &= 65535),
        (r[1] += e[1] * t[3]),
        (r[0] += r[1] >>> 16),
        (r[1] &= 65535),
        (r[1] += e[2] * t[2]),
        (r[0] += r[1] >>> 16),
        (r[1] &= 65535),
        (r[1] += e[3] * t[1]),
        (r[0] += r[1] >>> 16),
        (r[1] &= 65535),
        (r[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0]),
        (r[0] &= 65535),
        [(r[0] << 16) | r[1], (r[2] << 16) | r[3]]
      );
    }
    function f(e, t) {
      return 32 === (t %= 64)
        ? [e[1], e[0]]
        : t < 32
          ? [
              (e[0] << t) | (e[1] >>> (32 - t)),
              (e[1] << t) | (e[0] >>> (32 - t)),
            ]
          : ((t -= 32),
            [
              (e[1] << t) | (e[0] >>> (32 - t)),
              (e[0] << t) | (e[1] >>> (32 - t)),
            ]);
    }
    function p(e, t) {
      return 0 === (t %= 64)
        ? e
        : t < 32
          ? [(e[0] << t) | (e[1] >>> (32 - t)), e[1] << t]
          : [e[1] << (t - 32), 0];
    }
    function v(e, t) {
      return [e[0] ^ t[0], e[1] ^ t[1]];
    }
    function g(e) {
      return (
        (e = v(e, [0, e[0] >>> 1])),
        (e = v((e = m(e, [4283543511, 3981806797])), [0, e[0] >>> 1])),
        (e = v((e = m(e, [3301882366, 444984403])), [0, e[0] >>> 1]))
      );
    }
    function h(e, t) {
      t = t || 0;
      var r,
        n = (e = e || '').length % 16,
        i = e.length - n,
        o = [0, t],
        a = [0, t],
        c = [0, 0],
        s = [0, 0],
        u = [2277735313, 289559509],
        l = [1291169091, 658871167];
      for (r = 0; r < i; r += 16)
        (c = [
          (255 & e.charCodeAt(r + 4)) |
            ((255 & e.charCodeAt(r + 5)) << 8) |
            ((255 & e.charCodeAt(r + 6)) << 16) |
            ((255 & e.charCodeAt(r + 7)) << 24),
          (255 & e.charCodeAt(r)) |
            ((255 & e.charCodeAt(r + 1)) << 8) |
            ((255 & e.charCodeAt(r + 2)) << 16) |
            ((255 & e.charCodeAt(r + 3)) << 24),
        ]),
          (s = [
            (255 & e.charCodeAt(r + 12)) |
              ((255 & e.charCodeAt(r + 13)) << 8) |
              ((255 & e.charCodeAt(r + 14)) << 16) |
              ((255 & e.charCodeAt(r + 15)) << 24),
            (255 & e.charCodeAt(r + 8)) |
              ((255 & e.charCodeAt(r + 9)) << 8) |
              ((255 & e.charCodeAt(r + 10)) << 16) |
              ((255 & e.charCodeAt(r + 11)) << 24),
          ]),
          (c = f((c = m(c, u)), 31)),
          (o = d((o = f((o = v(o, (c = m(c, l)))), 27)), a)),
          (o = d(m(o, [0, 5]), [0, 1390208809])),
          (s = f((s = m(s, l)), 33)),
          (a = d((a = f((a = v(a, (s = m(s, u)))), 31)), o)),
          (a = d(m(a, [0, 5]), [0, 944331445]));
      switch (((c = [0, 0]), (s = [0, 0]), n)) {
        case 15:
          s = v(s, p([0, e.charCodeAt(r + 14)], 48));
        case 14:
          s = v(s, p([0, e.charCodeAt(r + 13)], 40));
        case 13:
          s = v(s, p([0, e.charCodeAt(r + 12)], 32));
        case 12:
          s = v(s, p([0, e.charCodeAt(r + 11)], 24));
        case 11:
          s = v(s, p([0, e.charCodeAt(r + 10)], 16));
        case 10:
          s = v(s, p([0, e.charCodeAt(r + 9)], 8));
        case 9:
          (s = m((s = v(s, [0, e.charCodeAt(r + 8)])), l)),
            (a = v(a, (s = m((s = f(s, 33)), u))));
        case 8:
          c = v(c, p([0, e.charCodeAt(r + 7)], 56));
        case 7:
          c = v(c, p([0, e.charCodeAt(r + 6)], 48));
        case 6:
          c = v(c, p([0, e.charCodeAt(r + 5)], 40));
        case 5:
          c = v(c, p([0, e.charCodeAt(r + 4)], 32));
        case 4:
          c = v(c, p([0, e.charCodeAt(r + 3)], 24));
        case 3:
          c = v(c, p([0, e.charCodeAt(r + 2)], 16));
        case 2:
          c = v(c, p([0, e.charCodeAt(r + 1)], 8));
        case 1:
          (c = m((c = v(c, [0, e.charCodeAt(r)])), u)),
            (o = v(o, (c = m((c = f(c, 31)), l))));
      }
      return (
        (o = d((o = v(o, [0, e.length])), (a = v(a, [0, e.length])))),
        (a = d(a, o)),
        (o = d((o = g(o)), (a = g(a)))),
        (a = d(a, o)),
        ('00000000' + (o[0] >>> 0).toString(16)).slice(-8) +
          ('00000000' + (o[1] >>> 0).toString(16)).slice(-8) +
          ('00000000' + (a[0] >>> 0).toString(16)).slice(-8) +
          ('00000000' + (a[1] >>> 0).toString(16)).slice(-8)
      );
    }
    function _(e) {
      return parseInt(e);
    }
    function S(e) {
      return parseFloat(e);
    }
    function I(e, t) {
      return 'number' == typeof e && isNaN(e) ? t : e;
    }
    function E(e) {
      return e.reduce(function (e, t) {
        return e + (t ? 1 : 0);
      }, 0);
    }
    function T(e, t) {
      if ((void 0 === t && (t = 1), Math.abs(t) >= 1))
        return Math.round(e / t) * t;
      var r = 1 / t;
      return Math.round(e * r) / r;
    }
    function y(e) {
      return e && 'object' == typeof e && 'message' in e ? e : { message: e };
    }
    function w(e) {
      return 'function' != typeof e;
    }
    function A(e, t, i) {
      var o = Object.keys(e).filter(function (e) {
          return !(function (e, t) {
            for (var r = 0, n = e.length; r < n; ++r) if (e[r] === t) return !0;
            return !1;
          })(i, e);
        }),
        a = u(o, function (r) {
          return (function (e, t) {
            var r = new Promise(function (r) {
              var n = Date.now();
              s(e.bind(null, t), function () {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                var i = Date.now() - n;
                if (!e[0])
                  return r(function () {
                    return { error: y(e[1]), duration: i };
                  });
                var o = e[1];
                if (w(o))
                  return r(function () {
                    return { value: o, duration: i };
                  });
                r(function () {
                  return new Promise(function (e) {
                    var t = Date.now();
                    s(o, function () {
                      for (var r = [], n = 0; n < arguments.length; n++)
                        r[n] = arguments[n];
                      var o = i + Date.now() - t;
                      if (!r[0]) return e({ error: y(r[1]), duration: o });
                      e({ value: r[1], duration: o });
                    });
                  });
                });
              });
            });
            return (
              l(r),
              function () {
                return r.then(function (e) {
                  return e();
                });
              }
            );
          })(e[r], t);
        });
      return (
        l(a),
        function () {
          return r(this, 0, void 0, function () {
            var e, t, r, i;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, a];
                case 1:
                  return [
                    4,
                    u(n.sent(), function (e) {
                      var t = e();
                      return l(t), t;
                    }),
                  ];
                case 2:
                  return (e = n.sent()), [4, Promise.all(e)];
                case 3:
                  for (t = n.sent(), r = {}, i = 0; i < o.length; ++i)
                    r[o[i]] = t[i];
                  return [2, r];
              }
            });
          });
        }
      );
    }
    function b() {
      var e = window,
        t = navigator;
      return (
        E([
          'MSCSSMatrix' in e,
          'msSetImmediate' in e,
          'msIndexedDB' in e,
          'msMaxTouchPoints' in t,
          'msPointerEnabled' in t,
        ]) >= 4
      );
    }
    function N() {
      var e = window,
        t = navigator;
      return (
        E([
          'msWriteProfilerMark' in e,
          'MSStream' in e,
          'msLaunchUri' in t,
          'msSaveBlob' in t,
        ]) >= 3 && !b()
      );
    }
    function C() {
      var e = window,
        t = navigator;
      return (
        E([
          'webkitPersistentStorage' in t,
          'webkitTemporaryStorage' in t,
          0 === t.vendor.indexOf('Google'),
          'webkitResolveLocalFileSystemURL' in e,
          'BatteryManager' in e,
          'webkitMediaStream' in e,
          'webkitSpeechGrammar' in e,
        ]) >= 5
      );
    }
    function D() {
      var e = window,
        t = navigator;
      return (
        E([
          'ApplePayError' in e,
          'CSSPrimitiveValue' in e,
          'Counter' in e,
          0 === t.vendor.indexOf('Apple'),
          'getStorageUpdates' in t,
          'WebKitMediaKeys' in e,
        ]) >= 4
      );
    }
    function O() {
      var e = window;
      return (
        E([
          'safari' in e,
          !('DeviceMotionEvent' in e),
          !('ongestureend' in e),
          !('standalone' in navigator),
        ]) >= 3
      );
    }
    function L() {
      var e,
        t,
        r = window;
      return (
        E([
          'buildID' in navigator,
          'MozAppearance' in
            (null !==
              (t =
                null === (e = document.documentElement) || void 0 === e
                  ? void 0
                  : e.style) && void 0 !== t
              ? t
              : {}),
          'onmozfullscreenchange' in r,
          'mozInnerScreenX' in r,
          'CSSMozDocumentRule' in r,
          'CanvasCaptureMediaStream' in r,
        ]) >= 4
      );
    }
    function U() {
      var e = document;
      return (
        e.fullscreenElement ||
        e.msFullscreenElement ||
        e.mozFullScreenElement ||
        e.webkitFullscreenElement ||
        null
      );
    }
    function R() {
      var e = C(),
        t = L();
      if (!e && !t) return !1;
      var r = window;
      return (
        E([
          'onorientationchange' in r,
          'orientation' in r,
          e && !('SharedWorker' in r),
          t && /android/i.test(navigator.appVersion),
        ]) >= 2
      );
    }
    function P(e) {
      var t = new Error(e);
      return (t.name = e), t;
    }
    function M(e, t, i) {
      var o, c, s;
      return (
        void 0 === i && (i = 50),
        r(this, 0, void 0, function () {
          var r, u;
          return n(this, function (n) {
            switch (n.label) {
              case 0:
                (r = document), (n.label = 1);
              case 1:
                return r.body ? [3, 3] : [4, a(i)];
              case 2:
                return n.sent(), [3, 1];
              case 3:
                (u = r.createElement('iframe')), (n.label = 4);
              case 4:
                return (
                  n.trys.push([4, , 10, 11]),
                  [
                    4,
                    new Promise(function (e, n) {
                      var i = !1,
                        o = function () {
                          (i = !0), e();
                        };
                      (u.onload = o),
                        (u.onerror = function (e) {
                          (i = !0), n(e);
                        });
                      var a = u.style;
                      a.setProperty('display', 'block', 'important'),
                        (a.position = 'absolute'),
                        (a.top = '0'),
                        (a.left = '0'),
                        (a.visibility = 'hidden'),
                        t && 'srcdoc' in u
                          ? (u.srcdoc = t)
                          : (u.src = 'about:blank'),
                        r.body.appendChild(u);
                      var c = function () {
                        var e, t;
                        i ||
                          ('complete' ===
                          (null ===
                            (t =
                              null === (e = u.contentWindow) || void 0 === e
                                ? void 0
                                : e.document) || void 0 === t
                            ? void 0
                            : t.readyState)
                            ? o()
                            : setTimeout(c, 10));
                      };
                      c();
                    }),
                  ]
                );
              case 5:
                n.sent(), (n.label = 6);
              case 6:
                return (
                  null ===
                    (c =
                      null === (o = u.contentWindow) || void 0 === o
                        ? void 0
                        : o.document) || void 0 === c
                    ? void 0
                    : c.body
                )
                  ? [3, 8]
                  : [4, a(i)];
              case 7:
                return n.sent(), [3, 6];
              case 8:
                return [4, e(u, u.contentWindow)];
              case 9:
                return [2, n.sent()];
              case 10:
                return (
                  null === (s = u.parentNode) ||
                    void 0 === s ||
                    s.removeChild(u),
                  [7]
                );
              case 11:
                return [2];
            }
          });
        })
      );
    }
    function F(e) {
      for (
        var t = (function (e) {
            for (
              var t,
                r,
                n = "Unexpected syntax '".concat(e, "'"),
                i = /^\s*([a-z-]*)(.*)$/i.exec(e),
                o = i[1] || void 0,
                a = {},
                c = /([.:#][\w-]+|\[.+?\])/gi,
                s = function (e, t) {
                  (a[e] = a[e] || []), a[e].push(t);
                };
              ;

            ) {
              var u = c.exec(i[2]);
              if (!u) break;
              var l = u[0];
              switch (l[0]) {
                case '.':
                  s('class', l.slice(1));
                  break;
                case '#':
                  s('id', l.slice(1));
                  break;
                case '[':
                  var d =
                    /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(
                      l,
                    );
                  if (!d) throw new Error(n);
                  s(
                    d[1],
                    null !==
                      (r = null !== (t = d[4]) && void 0 !== t ? t : d[5]) &&
                      void 0 !== r
                      ? r
                      : '',
                  );
                  break;
                default:
                  throw new Error(n);
              }
            }
            return [o, a];
          })(e),
          r = t[0],
          n = t[1],
          i = document.createElement(null != r ? r : 'div'),
          o = 0,
          a = Object.keys(n);
        o < a.length;
        o++
      ) {
        var c = a[o],
          s = n[c].join(' ');
        'style' === c ? k(i.style, s) : i.setAttribute(c, s);
      }
      return i;
    }
    function k(e, t) {
      for (var r = 0, n = t.split(';'); r < n.length; r++) {
        var i = n[r],
          o = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(i);
        if (o) {
          var a = o[1],
            c = o[2],
            s = o[4];
          e.setProperty(a, c, s || '');
        }
      }
    }
    var G = ['monospace', 'sans-serif', 'serif'],
      V = [
        'sans-serif-thin',
        'ARNO PRO',
        'Agency FB',
        'Arabic Typesetting',
        'Arial Unicode MS',
        'AvantGarde Bk BT',
        'BankGothic Md BT',
        'Batang',
        'Bitstream Vera Sans Mono',
        'Calibri',
        'Century',
        'Century Gothic',
        'Clarendon',
        'EUROSTILE',
        'Franklin Gothic',
        'Futura Bk BT',
        'Futura Md BT',
        'GOTHAM',
        'Gill Sans',
        'HELV',
        'Haettenschweiler',
        'Helvetica Neue',
        'Humanst521 BT',
        'Leelawadee',
        'Letter Gothic',
        'Levenim MT',
        'Lucida Bright',
        'Lucida Sans',
        'Menlo',
        'MS Mincho',
        'MS Outlook',
        'MS Reference Specialty',
        'MS UI Gothic',
        'MT Extra',
        'MYRIAD PRO',
        'Marlett',
        'Meiryo UI',
        'Microsoft Uighur',
        'Minion Pro',
        'Monotype Corsiva',
        'PMingLiU',
        'Pristina',
        'SCRIPTINA',
        'Segoe UI Light',
        'Serifa',
        'SimHei',
        'Small Fonts',
        'Staccato222 BT',
        'TRAJAN PRO',
        'Univers CE 55 Medium',
        'Vrinda',
        'ZWAdobeF',
      ];
    function x(e) {
      return e.toDataURL();
    }
    var j, W;
    function B() {
      var e = this;
      return (
        (function () {
          if (void 0 === W) {
            var e = function () {
              var t = Y();
              H(t) ? (W = setTimeout(e, 2500)) : ((j = t), (W = void 0));
            };
            e();
          }
        })(),
        function () {
          return r(e, 0, void 0, function () {
            var e;
            return n(this, function (t) {
              switch (t.label) {
                case 0:
                  return H((e = Y()))
                    ? j
                      ? [2, i([], j)]
                      : U()
                        ? [
                            4,
                            ((r = document),
                            (
                              r.exitFullscreen ||
                              r.msExitFullscreen ||
                              r.mozCancelFullScreen ||
                              r.webkitExitFullscreen
                            ).call(r)),
                          ]
                        : [3, 2]
                    : [3, 2];
                case 1:
                  t.sent(), (e = Y()), (t.label = 2);
                case 2:
                  return H(e) || (j = e), [2, e];
              }
              var r;
            });
          });
        }
      );
    }
    function Y() {
      var e = screen;
      return [
        I(S(e.availTop), null),
        I(S(e.width) - S(e.availWidth) - I(S(e.availLeft), 0), null),
        I(S(e.height) - S(e.availHeight) - I(S(e.availTop), 0), null),
        I(S(e.availLeft), null),
      ];
    }
    function H(e) {
      for (var t = 0; t < 4; ++t) if (e[t]) return !1;
      return !0;
    }
    function Z(e) {
      var t;
      return r(this, 0, void 0, function () {
        var r, i, o, c, s, u, l;
        return n(this, function (n) {
          switch (n.label) {
            case 0:
              for (
                r = document,
                  i = r.createElement('div'),
                  o = new Array(e.length),
                  c = {},
                  z(i),
                  l = 0;
                l < e.length;
                ++l
              )
                'DIALOG' === (s = F(e[l])).tagName && s.show(),
                  z((u = r.createElement('div'))),
                  u.appendChild(s),
                  i.appendChild(u),
                  (o[l] = s);
              n.label = 1;
            case 1:
              return r.body ? [3, 3] : [4, a(50)];
            case 2:
              return n.sent(), [3, 1];
            case 3:
              r.body.appendChild(i);
              try {
                for (l = 0; l < e.length; ++l)
                  o[l].offsetParent || (c[e[l]] = !0);
              } finally {
                null === (t = i.parentNode) || void 0 === t || t.removeChild(i);
              }
              return [2, c];
          }
        });
      });
    }
    function z(e) {
      e.style.setProperty('display', 'block', 'important');
    }
    function J(e) {
      return matchMedia('(inverted-colors: '.concat(e, ')')).matches;
    }
    function X(e) {
      return matchMedia('(forced-colors: '.concat(e, ')')).matches;
    }
    function q(e) {
      return matchMedia('(prefers-contrast: '.concat(e, ')')).matches;
    }
    function K(e) {
      return matchMedia('(prefers-reduced-motion: '.concat(e, ')')).matches;
    }
    function Q(e) {
      return matchMedia('(dynamic-range: '.concat(e, ')')).matches;
    }
    var $ = Math,
      ee = function () {
        return 0;
      };
    var te = {
      default: [],
      apple: [{ font: '-apple-system-body' }],
      serif: [{ fontFamily: 'serif' }],
      sans: [{ fontFamily: 'sans-serif' }],
      mono: [{ fontFamily: 'monospace' }],
      min: [{ fontSize: '1px' }],
      system: [{ fontFamily: 'system-ui' }],
    };
    var re = {
      fonts: function () {
        return M(function (e, t) {
          var r = t.document,
            n = r.body;
          n.style.fontSize = '48px';
          var i = r.createElement('div'),
            o = {},
            a = {},
            c = function (e) {
              var t = r.createElement('span'),
                n = t.style;
              return (
                (n.position = 'absolute'),
                (n.top = '0'),
                (n.left = '0'),
                (n.fontFamily = e),
                (t.textContent = 'mmMwWLliI0O&1'),
                i.appendChild(t),
                t
              );
            },
            s = G.map(c),
            u = (function () {
              for (
                var e = {},
                  t = function (t) {
                    e[t] = G.map(function (e) {
                      return (function (e, t) {
                        return c("'".concat(e, "',").concat(t));
                      })(t, e);
                    });
                  },
                  r = 0,
                  n = V;
                r < n.length;
                r++
              ) {
                t(n[r]);
              }
              return e;
            })();
          n.appendChild(i);
          for (var l = 0; l < G.length; l++)
            (o[G[l]] = s[l].offsetWidth), (a[G[l]] = s[l].offsetHeight);
          return V.filter(function (e) {
            return (
              (t = u[e]),
              G.some(function (e, r) {
                return t[r].offsetWidth !== o[e] || t[r].offsetHeight !== a[e];
              })
            );
            var t;
          });
        });
      },
      domBlockers: function (e) {
        var t = (void 0 === e ? {} : e).debug;
        return r(this, 0, void 0, function () {
          var e, r, i, o, a;
          return n(this, function (n) {
            switch (n.label) {
              case 0:
                return D() || R()
                  ? ((c = atob),
                    (e = {
                      abpIndo: [
                        '#Iklan-Melayang',
                        '#Kolom-Iklan-728',
                        '#SidebarIklan-wrapper',
                        '[title="ALIENBOLA" i]',
                        c('I0JveC1CYW5uZXItYWRz'),
                      ],
                      abpvn: [
                        '.quangcao',
                        '#mobileCatfish',
                        c('LmNsb3NlLWFkcw=='),
                        '[id^="bn_bottom_fixed_"]',
                        '#pmadv',
                      ],
                      adBlockFinland: [
                        '.mainostila',
                        c('LnNwb25zb3JpdA=='),
                        '.ylamainos',
                        c('YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd'),
                        c(
                          'YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd',
                        ),
                      ],
                      adBlockPersian: [
                        '#navbar_notice_50',
                        '.kadr',
                        'TABLE[width="140px"]',
                        '#divAgahi',
                        c('YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd'),
                      ],
                      adBlockWarningRemoval: [
                        '#adblock-honeypot',
                        '.adblocker-root',
                        '.wp_adblock_detect',
                        c('LmhlYWRlci1ibG9ja2VkLWFk'),
                        c('I2FkX2Jsb2NrZXI='),
                      ],
                      adGuardAnnoyances: [
                        '.hs-sosyal',
                        '#cookieconsentdiv',
                        'div[class^="app_gdpr"]',
                        '.as-oil',
                        '[data-cypress="soft-push-notification-modal"]',
                      ],
                      adGuardBase: [
                        '.BetterJsPopOverlay',
                        c('I2FkXzMwMFgyNTA='),
                        c('I2Jhbm5lcmZsb2F0MjI='),
                        c('I2NhbXBhaWduLWJhbm5lcg=='),
                        c('I0FkLUNvbnRlbnQ='),
                      ],
                      adGuardChinese: [
                        c('LlppX2FkX2FfSA=='),
                        c('YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd'),
                        '#widget-quan',
                        c('YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd'),
                        c('YVtocmVmKj0iLjE5NTZobC5jb20vIl0='),
                      ],
                      adGuardFrench: [
                        '#pavePub',
                        c('LmFkLWRlc2t0b3AtcmVjdGFuZ2xl'),
                        '.mobile_adhesion',
                        '.widgetadv',
                        c('LmFkc19iYW4='),
                      ],
                      adGuardGerman: ['aside[data-portal-id="leaderboard"]'],
                      adGuardJapanese: [
                        '#kauli_yad_1',
                        c(
                          'YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0=',
                        ),
                        c('Ll9wb3BJbl9pbmZpbml0ZV9hZA=='),
                        c('LmFkZ29vZ2xl'),
                        c('Ll9faXNib29zdFJldHVybkFk'),
                      ],
                      adGuardMobile: [
                        c('YW1wLWF1dG8tYWRz'),
                        c('LmFtcF9hZA=='),
                        'amp-embed[type="24smi"]',
                        '#mgid_iframe1',
                        c('I2FkX2ludmlld19hcmVh'),
                      ],
                      adGuardRussian: [
                        c('YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0='),
                        c('LnJlY2xhbWE='),
                        'div[id^="smi2adblock"]',
                        c('ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd'),
                        '#psyduckpockeball',
                      ],
                      adGuardSocial: [
                        c(
                          'YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0=',
                        ),
                        c('YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0='),
                        '.etsy-tweet',
                        '#inlineShare',
                        '.popup-social',
                      ],
                      adGuardSpanishPortuguese: [
                        '#barraPublicidade',
                        '#Publicidade',
                        '#publiEspecial',
                        '#queTooltip',
                        '.cnt-publi',
                      ],
                      adGuardTrackingProtection: [
                        '#qoo-counter',
                        c('YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=='),
                        c(
                          'YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0=',
                        ),
                        c('YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=='),
                        '#top100counter',
                      ],
                      adGuardTurkish: [
                        '#backkapat',
                        c('I3Jla2xhbWk='),
                        c(
                          'YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0=',
                        ),
                        c(
                          'YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd',
                        ),
                        c(
                          'YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==',
                        ),
                      ],
                      bulgarian: [
                        c('dGQjZnJlZW5ldF90YWJsZV9hZHM='),
                        '#ea_intext_div',
                        '.lapni-pop-over',
                        '#xenium_hot_offers',
                      ],
                      easyList: [
                        '.yb-floorad',
                        c('LndpZGdldF9wb19hZHNfd2lkZ2V0'),
                        c('LnRyYWZmaWNqdW5reS1hZA=='),
                        '.textad_headline',
                        c('LnNwb25zb3JlZC10ZXh0LWxpbmtz'),
                      ],
                      easyListChina: [
                        c(
                          'LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ==',
                        ),
                        c('LmZyb250cGFnZUFkdk0='),
                        '#taotaole',
                        '#aafoot.top_box',
                        '.cfa_popup',
                      ],
                      easyListCookie: [
                        '.ezmob-footer',
                        '.cc-CookieWarning',
                        '[data-cookie-number]',
                        c('LmF3LWNvb2tpZS1iYW5uZXI='),
                        '.sygnal24-gdpr-modal-wrap',
                      ],
                      easyListCzechSlovak: [
                        '#onlajny-stickers',
                        c('I3Jla2xhbW5pLWJveA=='),
                        c('LnJla2xhbWEtbWVnYWJvYXJk'),
                        '.sklik',
                        c('W2lkXj0ic2tsaWtSZWtsYW1hIl0='),
                      ],
                      easyListDutch: [
                        c('I2FkdmVydGVudGll'),
                        c('I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=='),
                        '.adstekst',
                        c('YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0='),
                        '#semilo-lrectangle',
                      ],
                      easyListGermany: [
                        '#SSpotIMPopSlider',
                        c('LnNwb25zb3JsaW5rZ3J1ZW4='),
                        c('I3dlcmJ1bmdza3k='),
                        c('I3Jla2xhbWUtcmVjaHRzLW1pdHRl'),
                        c('YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0='),
                      ],
                      easyListItaly: [
                        c('LmJveF9hZHZfYW5udW5jaQ=='),
                        '.sb-box-pubbliredazionale',
                        c(
                          'YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd',
                        ),
                        c('YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd'),
                        c(
                          'YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==',
                        ),
                      ],
                      easyListLithuania: [
                        c('LnJla2xhbW9zX3RhcnBhcw=='),
                        c('LnJla2xhbW9zX251b3JvZG9z'),
                        c('aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd'),
                        c('aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd'),
                        c('aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd'),
                      ],
                      estonian: [
                        c('QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ=='),
                      ],
                      fanboyAnnoyances: [
                        '#ac-lre-player',
                        '.navigate-to-top',
                        '#subscribe_popup',
                        '.newsletter_holder',
                        '#back-top',
                      ],
                      fanboyAntiFacebook: ['.util-bar-module-firefly-visible'],
                      fanboyEnhancedTrackers: [
                        '.open.pushModal',
                        '#issuem-leaky-paywall-articles-zero-remaining-nag',
                        '#sovrn_container',
                        'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',
                        '.BlockNag__Card',
                      ],
                      fanboySocial: [
                        '#FollowUs',
                        '#meteored_share',
                        '#social_follow',
                        '.article-sharer',
                        '.community__social-desc',
                      ],
                      frellwitSwedish: [
                        c(
                          'YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ==',
                        ),
                        c('YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=='),
                        'article.category-samarbete',
                        c('ZGl2LmhvbGlkQWRz'),
                        'ul.adsmodern',
                      ],
                      greekAdBlock: [
                        c('QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd'),
                        c(
                          'QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ==',
                        ),
                        c(
                          'QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd',
                        ),
                        'DIV.agores300',
                        'TABLE.advright',
                      ],
                      hungarian: [
                        '#cemp_doboz',
                        '.optimonk-iframe-container',
                        c('LmFkX19tYWlu'),
                        c('W2NsYXNzKj0iR29vZ2xlQWRzIl0='),
                        '#hirdetesek_box',
                      ],
                      iDontCareAboutCookies: [
                        '.alert-info[data-block-track*="CookieNotice"]',
                        '.ModuleTemplateCookieIndicator',
                        '.o--cookies--container',
                        '#cookies-policy-sticky',
                        '#stickyCookieBar',
                      ],
                      icelandicAbp: [
                        c(
                          'QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==',
                        ),
                      ],
                      latvian: [
                        c(
                          'YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0=',
                        ),
                        c(
                          'YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==',
                        ),
                      ],
                      listKr: [
                        c('YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0='),
                        c('I2xpdmVyZUFkV3JhcHBlcg=='),
                        c('YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=='),
                        c('aW5zLmZhc3R2aWV3LWFk'),
                        '.revenue_unit_item.dable',
                      ],
                      listeAr: [
                        c('LmdlbWluaUxCMUFk'),
                        '.right-and-left-sponsers',
                        c('YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=='),
                        c('YVtocmVmKj0iYm9vcmFxLm9yZyJd'),
                        c(
                          'YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd',
                        ),
                      ],
                      listeFr: [
                        c('YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=='),
                        c('I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=='),
                        c('YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0='),
                        '.site-pub-interstitiel',
                        'div[id^="crt-"][data-criteo-id]',
                      ],
                      officialPolish: [
                        '#ceneo-placeholder-ceneo-12',
                        c('W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd'),
                        c(
                          'YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ==',
                        ),
                        c(
                          'YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ==',
                        ),
                        c('ZGl2I3NrYXBpZWNfYWQ='),
                      ],
                      ro: [
                        c(
                          'YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd',
                        ),
                        c(
                          'YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd',
                        ),
                        c(
                          'YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0=',
                        ),
                        c('YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd'),
                        'a[href^="/url/"]',
                      ],
                      ruAd: [
                        c('YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd'),
                        c('YVtocmVmKj0iLy91dGltZy5ydS8iXQ=='),
                        c('YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0='),
                        '#pgeldiz',
                        '.yandex-rtb-block',
                      ],
                      thaiAds: [
                        'a[href*=macau-uta-popup]',
                        c('I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=='),
                        c('LmFkczMwMHM='),
                        '.bumq',
                        '.img-kosana',
                      ],
                      webAnnoyancesUltralist: [
                        '#mod-social-share-2',
                        '#social-tools',
                        c('LmN0cGwtZnVsbGJhbm5lcg=='),
                        '.zergnet-recommend',
                        '.yt.btn-link.btn-md.btn',
                      ],
                    }),
                    (r = Object.keys(e)),
                    [
                      4,
                      Z(
                        (a = []).concat.apply(
                          a,
                          r.map(function (t) {
                            return e[t];
                          }),
                        ),
                      ),
                    ])
                  : [2, void 0];
              case 1:
                return (
                  (i = n.sent()),
                  t &&
                    (function (e, t) {
                      for (var r = 0, n = Object.keys(e); r < n.length; r++) {
                        var i = n[r];
                        '\n'.concat(i, ':');
                        for (var o = 0, a = e[i]; o < a.length; o++) {
                          var c = a[o];
                          '\n  '.concat(t[c] ? '🚫' : '➡️', ' ').concat(c);
                        }
                      }
                    })(e, i),
                  (o = r.filter(function (t) {
                    var r = e[t];
                    return (
                      E(
                        r.map(function (e) {
                          return i[e];
                        }),
                      ) >
                      0.6 * r.length
                    );
                  })).sort(),
                  [2, o]
                );
            }
            var c;
          });
        });
      },
      fontPreferences: function () {
        return (function (e, t) {
          void 0 === t && (t = 4e3);
          return M(function (r, n) {
            var o = n.document,
              a = o.body,
              c = a.style;
            (c.width = ''.concat(t, 'px')),
              (c.webkitTextSizeAdjust = c.textSizeAdjust = 'none'),
              C()
                ? (a.style.zoom = ''.concat(1 / n.devicePixelRatio))
                : D() && (a.style.zoom = 'reset');
            var s = o.createElement('div');
            return (
              (s.textContent = i([], Array((t / 20) | 0))
                .map(function () {
                  return 'word';
                })
                .join(' ')),
              a.appendChild(s),
              e(o, a)
            );
          }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">');
        })(function (e, t) {
          for (
            var r = {}, n = {}, i = 0, o = Object.keys(te);
            i < o.length;
            i++
          ) {
            var a = o[i],
              c = te[a],
              s = c[0],
              u = void 0 === s ? {} : s,
              l = c[1],
              d = void 0 === l ? 'mmMwWLliI0fiflO&1' : l,
              m = e.createElement('span');
            (m.textContent = d), (m.style.whiteSpace = 'nowrap');
            for (var f = 0, p = Object.keys(u); f < p.length; f++) {
              var v = p[f],
                g = u[v];
              void 0 !== g && (m.style[v] = g);
            }
            (r[a] = m), t.appendChild(e.createElement('br')), t.appendChild(m);
          }
          for (var h = 0, _ = Object.keys(te); h < _.length; h++) {
            n[(a = _[h])] = r[a].getBoundingClientRect().width;
          }
          return n;
        });
      },
      audio: function () {
        var e = window,
          t = e.OfflineAudioContext || e.webkitOfflineAudioContext;
        if (!t) return -2;
        if (
          D() &&
          !O() &&
          !(function () {
            var e = window;
            return (
              E([
                'DOMRectList' in e,
                'RTCPeerConnectionIceEvent' in e,
                'SVGGeometryElement' in e,
                'ontransitioncancel' in e,
              ]) >= 3
            );
          })()
        )
          return -1;
        var r = new t(1, 5e3, 44100),
          n = r.createOscillator();
        (n.type = 'triangle'), (n.frequency.value = 1e4);
        var i = r.createDynamicsCompressor();
        (i.threshold.value = -50),
          (i.knee.value = 40),
          (i.ratio.value = 12),
          (i.attack.value = 0),
          (i.release.value = 0.25),
          n.connect(i),
          i.connect(r.destination),
          n.start(0);
        var o = (function (e) {
            var t = 3,
              r = 500,
              n = 500,
              i = 5e3,
              o = function () {},
              a = new Promise(function (a, s) {
                var u = !1,
                  d = 0,
                  m = 0;
                e.oncomplete = function (e) {
                  return a(e.renderedBuffer);
                };
                var f = function () {
                    setTimeout(
                      function () {
                        return s(P('timeout'));
                      },
                      Math.min(n, m + i - Date.now()),
                    );
                  },
                  p = function () {
                    try {
                      var n = e.startRendering();
                      switch ((c(n) && l(n), e.state)) {
                        case 'running':
                          (m = Date.now()), u && f();
                          break;
                        case 'suspended':
                          document.hidden || d++,
                            u && d >= t ? s(P('suspended')) : setTimeout(p, r);
                      }
                    } catch (i) {
                      s(i);
                    }
                  };
                p(),
                  (o = function () {
                    u || ((u = !0), m > 0 && f());
                  });
              });
            return [a, o];
          })(r),
          a = o[0],
          s = o[1],
          u = a.then(
            function (e) {
              return (function (e) {
                for (var t = 0, r = 0; r < e.length; ++r) t += Math.abs(e[r]);
                return t;
              })(e.getChannelData(0).subarray(4500));
            },
            function (e) {
              if ('timeout' === e.name || 'suspended' === e.name) return -3;
              throw e;
            },
          );
        return (
          l(u),
          function () {
            return s(), u;
          }
        );
      },
      screenFrame: function () {
        var e = this,
          t = B();
        return function () {
          return r(e, 0, void 0, function () {
            var e, r;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  return [4, t()];
                case 1:
                  return (
                    (e = n.sent()),
                    [
                      2,
                      [
                        (r = function (e) {
                          return null === e ? null : T(e, 10);
                        })(e[0]),
                        r(e[1]),
                        r(e[2]),
                        r(e[3]),
                      ],
                    ]
                  );
              }
            });
          });
        };
      },
      osCpu: function () {
        return navigator.oscpu;
      },
      languages: function () {
        var e,
          t = navigator,
          r = [],
          n =
            t.language ||
            t.userLanguage ||
            t.browserLanguage ||
            t.systemLanguage;
        if ((void 0 !== n && r.push([n]), Array.isArray(t.languages)))
          (C() &&
            E([
              !('MediaSettingsRange' in (e = window)),
              'RTCEncodedAudioFrame' in e,
              '' + e.Intl == '[object Intl]',
              '' + e.Reflect == '[object Reflect]',
            ]) >= 3) ||
            r.push(t.languages);
        else if ('string' == typeof t.languages) {
          var i = t.languages;
          i && r.push(i.split(','));
        }
        return r;
      },
      colorDepth: function () {
        return window.screen.colorDepth;
      },
      deviceMemory: function () {
        return I(S(navigator.deviceMemory), void 0);
      },
      screenResolution: function () {
        var e = screen,
          t = function (e) {
            return I(_(e), null);
          },
          r = [t(e.width), t(e.height)];
        return r.sort().reverse(), r;
      },
      hardwareConcurrency: function () {
        return I(_(navigator.hardwareConcurrency), void 0);
      },
      timezone: function () {
        var e,
          t =
            null === (e = window.Intl) || void 0 === e
              ? void 0
              : e.DateTimeFormat;
        if (t) {
          var r = new t().resolvedOptions().timeZone;
          if (r) return r;
        }
        var n,
          i =
            ((n = new Date().getFullYear()),
            -Math.max(
              S(new Date(n, 0, 1).getTimezoneOffset()),
              S(new Date(n, 6, 1).getTimezoneOffset()),
            ));
        return 'UTC'.concat(i >= 0 ? '+' : '').concat(Math.abs(i));
      },
      sessionStorage: function () {
        try {
          return !!window.sessionStorage;
        } catch (e) {
          return !0;
        }
      },
      localStorage: function () {
        try {
          return !!window.localStorage;
        } catch (e) {
          return !0;
        }
      },
      indexedDB: function () {
        if (!b() && !N())
          try {
            return !!window.indexedDB;
          } catch (e) {
            return !0;
          }
      },
      openDatabase: function () {
        return !!window.openDatabase;
      },
      cpuClass: function () {
        return navigator.cpuClass;
      },
      platform: function () {
        var e = navigator.platform;
        return 'MacIntel' === e && D() && !O()
          ? (function () {
              if ('iPad' === navigator.platform) return !0;
              var e = screen,
                t = e.width / e.height;
              return (
                E([
                  'MediaSource' in window,
                  !!Element.prototype.webkitRequestFullscreen,
                  t > 0.65 && t < 1.53,
                ]) >= 2
              );
            })()
            ? 'iPad'
            : 'iPhone'
          : e;
      },
      plugins: function () {
        var e = navigator.plugins;
        if (e) {
          for (var t = [], r = 0; r < e.length; ++r) {
            var n = e[r];
            if (n) {
              for (var i = [], o = 0; o < n.length; ++o) {
                var a = n[o];
                i.push({ type: a.type, suffixes: a.suffixes });
              }
              t.push({
                name: n.name,
                description: n.description,
                mimeTypes: i,
              });
            }
          }
          return t;
        }
      },
      canvas: function () {
        var e,
          t,
          r = !1,
          n = (function () {
            var e = document.createElement('canvas');
            return (e.width = 1), (e.height = 1), [e, e.getContext('2d')];
          })(),
          i = n[0],
          o = n[1];
        if (
          (function (e, t) {
            return !(!t || !e.toDataURL);
          })(i, o)
        ) {
          (r = (function (e) {
            return (
              e.rect(0, 0, 10, 10),
              e.rect(2, 2, 6, 6),
              !e.isPointInPath(5, 5, 'evenodd')
            );
          })(o)),
            (function (e, t) {
              (e.width = 240),
                (e.height = 60),
                (t.textBaseline = 'alphabetic'),
                (t.fillStyle = '#f60'),
                t.fillRect(100, 1, 62, 20),
                (t.fillStyle = '#069'),
                (t.font = '11pt "Times New Roman"');
              var r = 'Cwm fjordbank gly '.concat(
                String.fromCharCode(55357, 56835),
              );
              t.fillText(r, 2, 15),
                (t.fillStyle = 'rgba(102, 204, 0, 0.2)'),
                (t.font = '18pt Arial'),
                t.fillText(r, 4, 45);
            })(i, o);
          var a = x(i);
          a !== x(i)
            ? (e = t = 'unstable')
            : ((t = a),
              (function (e, t) {
                (e.width = 122),
                  (e.height = 110),
                  (t.globalCompositeOperation = 'multiply');
                for (
                  var r = 0,
                    n = [
                      ['#f2f', 40, 40],
                      ['#2ff', 80, 40],
                      ['#ff2', 60, 80],
                    ];
                  r < n.length;
                  r++
                ) {
                  var i = n[r],
                    o = i[0],
                    a = i[1],
                    c = i[2];
                  (t.fillStyle = o),
                    t.beginPath(),
                    t.arc(a, c, 40, 0, 2 * Math.PI, !0),
                    t.closePath(),
                    t.fill();
                }
                (t.fillStyle = '#f9c'),
                  t.arc(60, 60, 60, 0, 2 * Math.PI, !0),
                  t.arc(60, 60, 20, 0, 2 * Math.PI, !0),
                  t.fill('evenodd');
              })(i, o),
              (e = x(i)));
        } else e = t = '';
        return { winding: r, geometry: e, text: t };
      },
      touchSupport: function () {
        var e,
          t = navigator,
          r = 0;
        void 0 !== t.maxTouchPoints
          ? (r = _(t.maxTouchPoints))
          : void 0 !== t.msMaxTouchPoints && (r = t.msMaxTouchPoints);
        try {
          document.createEvent('TouchEvent'), (e = !0);
        } catch (n) {
          e = !1;
        }
        return {
          maxTouchPoints: r,
          touchEvent: e,
          touchStart: 'ontouchstart' in window,
        };
      },
      vendor: function () {
        return navigator.vendor || '';
      },
      vendorFlavors: function () {
        for (
          var e = [],
            t = 0,
            r = [
              'chrome',
              'safari',
              '__crWeb',
              '__gCrWeb',
              'yandex',
              '__yb',
              '__ybro',
              '__firefox__',
              '__edgeTrackingPreventionStatistics',
              'webkit',
              'oprt',
              'samsungAr',
              'ucweb',
              'UCShellJava',
              'puffinDevice',
            ];
          t < r.length;
          t++
        ) {
          var n = r[t],
            i = window[n];
          i && 'object' == typeof i && e.push(n);
        }
        return e.sort();
      },
      cookiesEnabled: function () {
        var e = document;
        try {
          e.cookie = 'cookietest=1; SameSite=Strict;';
          var t = -1 !== e.cookie.indexOf('cookietest=');
          return (
            (e.cookie =
              'cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT'),
            t
          );
        } catch (r) {
          return !1;
        }
      },
      colorGamut: function () {
        for (var e = 0, t = ['rec2020', 'p3', 'srgb']; e < t.length; e++) {
          var r = t[e];
          if (matchMedia('(color-gamut: '.concat(r, ')')).matches) return r;
        }
      },
      invertedColors: function () {
        return !!J('inverted') || (!J('none') && void 0);
      },
      forcedColors: function () {
        return !!X('active') || (!X('none') && void 0);
      },
      monochrome: function () {
        if (matchMedia('(min-monochrome: 0)').matches) {
          for (var e = 0; e <= 100; ++e)
            if (matchMedia('(max-monochrome: '.concat(e, ')')).matches)
              return e;
          throw new Error('Too high value');
        }
      },
      contrast: function () {
        return q('no-preference')
          ? 0
          : q('high') || q('more')
            ? 1
            : q('low') || q('less')
              ? -1
              : q('forced')
                ? 10
                : void 0;
      },
      reducedMotion: function () {
        return !!K('reduce') || (!K('no-preference') && void 0);
      },
      hdr: function () {
        return !!Q('high') || (!Q('standard') && void 0);
      },
      math: function () {
        var e,
          t = $.acos || ee,
          r = $.acosh || ee,
          n = $.asin || ee,
          i = $.asinh || ee,
          o = $.atanh || ee,
          a = $.atan || ee,
          c = $.sin || ee,
          s = $.sinh || ee,
          u = $.cos || ee,
          l = $.cosh || ee,
          d = $.tan || ee,
          m = $.tanh || ee,
          f = $.exp || ee,
          p = $.expm1 || ee,
          v = $.log1p || ee;
        return {
          acos: t(0.12312423423423424),
          acosh: r(1e308),
          acoshPf: ((e = 1e154), $.log(e + $.sqrt(e * e - 1))),
          asin: n(0.12312423423423424),
          asinh: i(1),
          asinhPf: (function (e) {
            return $.log(e + $.sqrt(e * e + 1));
          })(1),
          atanh: o(0.5),
          atanhPf: (function (e) {
            return $.log((1 + e) / (1 - e)) / 2;
          })(0.5),
          atan: a(0.5),
          sin: c(-1e300),
          sinh: s(1),
          sinhPf: (function (e) {
            return $.exp(e) - 1 / $.exp(e) / 2;
          })(1),
          cos: u(10.000000000123),
          cosh: l(1),
          coshPf: (function (e) {
            return ($.exp(e) + 1 / $.exp(e)) / 2;
          })(1),
          tan: d(-1e300),
          tanh: m(1),
          tanhPf: (function (e) {
            return ($.exp(2 * e) - 1) / ($.exp(2 * e) + 1);
          })(1),
          exp: f(1),
          expm1: p(1),
          expm1Pf: (function (e) {
            return $.exp(e) - 1;
          })(1),
          log1p: v(10),
          log1pPf: (function (e) {
            return $.log(1 + e);
          })(10),
          powPI: (function (e) {
            return $.pow($.PI, e);
          })(-100),
        };
      },
      videoCard: function () {
        var e,
          t = document.createElement('canvas'),
          r =
            null !== (e = t.getContext('webgl')) && void 0 !== e
              ? e
              : t.getContext('experimental-webgl');
        if (r && 'getExtension' in r) {
          var n = r.getExtension('WEBGL_debug_renderer_info');
          if (n)
            return {
              vendor: (
                r.getParameter(n.UNMASKED_VENDOR_WEBGL) || ''
              ).toString(),
              renderer: (
                r.getParameter(n.UNMASKED_RENDERER_WEBGL) || ''
              ).toString(),
            };
        }
      },
      pdfViewerEnabled: function () {
        return navigator.pdfViewerEnabled;
      },
      architecture: function () {
        var e = new Float32Array(1),
          t = new Uint8Array(e.buffer);
        return (e[0] = 1 / 0), (e[0] = e[0] - e[0]), t[3];
      },
    };
    function ne(e) {
      var t = (function (e) {
          if (R()) return 0.4;
          if (D()) return O() ? 0.5 : 0.3;
          var t = e.platform.value || '';
          if (/^Win/.test(t)) return 0.6;
          if (/^Mac/.test(t)) return 0.5;
          return 0.7;
        })(e),
        r = (function (e) {
          return T(0.99 + 0.01 * e, 1e-4);
        })(t);
      return {
        score: t,
        comment: '$ if upgrade to Pro: https://fpjs.dev/pro'.replace(
          /\$/g,
          ''.concat(r),
        ),
      };
    }
    function ie(e) {
      return JSON.stringify(
        e,
        function (e, r) {
          return r instanceof Error
            ? t(
                {
                  name: (n = r).name,
                  message: n.message,
                  stack:
                    null === (i = n.stack) || void 0 === i
                      ? void 0
                      : i.split('\n'),
                },
                n,
              )
            : r;
          var n, i;
        },
        2,
      );
    }
    function oe(e) {
      return h(
        (function (e) {
          for (
            var t = '', r = 0, n = Object.keys(e).sort();
            r < n.length;
            r++
          ) {
            var i = n[r],
              o = e[i],
              a = o.error ? 'error' : JSON.stringify(o.value);
            t += ''
              .concat(t ? '|' : '')
              .concat(i.replace(/([:|\\])/g, '\\$1'), ':')
              .concat(a);
          }
          return t;
        })(e),
      );
    }
    function ae(e) {
      return (
        void 0 === e && (e = 50),
        (function (e, t) {
          void 0 === t && (t = 1 / 0);
          var r = window.requestIdleCallback;
          return r
            ? new Promise(function (e) {
                return r.call(
                  window,
                  function () {
                    return e();
                  },
                  { timeout: t },
                );
              })
            : a(Math.min(e, t));
        })(e, 2 * e)
      );
    }
    function ce(e, t) {
      Date.now();
      return {
        get: function (i) {
          return r(this, 0, void 0, function () {
            var r, a;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  return Date.now(), [4, e()];
                case 1:
                  return (
                    (r = n.sent()),
                    (a = (function (e) {
                      var t,
                        r = ne(e);
                      return {
                        get visitorId() {
                          return void 0 === t && (t = oe(this.components)), t;
                        },
                        set visitorId(e) {
                          t = e;
                        },
                        confidence: r,
                        components: e,
                        version: o,
                      };
                    })(r)),
                    t || null == i || i.debug,
                    [2, a]
                  );
              }
            });
          });
        },
      };
    }
    function se(e) {
      var t = void 0 === e ? {} : e,
        i = t.delayFallback,
        a = t.debug,
        c = t.monitoring,
        s = void 0 === c || c;
      return r(this, 0, void 0, function () {
        return n(this, function (e) {
          switch (e.label) {
            case 0:
              return (
                s &&
                  (function () {
                    if (!(window.__fpjs_d_m || Math.random() >= 0.001))
                      try {
                        var e = new XMLHttpRequest();
                        e.open(
                          'get',
                          'https://m1.openfpcdn.io/fingerprintjs/v'.concat(
                            o,
                            '/npm-monitoring',
                          ),
                          !0,
                        ),
                          e.send();
                      } catch (t) {}
                  })(),
                [4, ae(i)]
              );
            case 1:
              return e.sent(), [2, ce(A(re, { debug: a }, []), a)];
          }
        });
      });
    }
    var ue = { load: se, hashComponents: oe, componentsToDebugString: ie },
      le = h;
    return (
      (e.componentsToDebugString = ie),
      (e.default = ue),
      (e.getFullscreenElement = U),
      (e.getScreenFrame = B),
      (e.hashComponents = oe),
      (e.isAndroid = R),
      (e.isChromium = C),
      (e.isDesktopSafari = O),
      (e.isEdgeHTML = N),
      (e.isGecko = L),
      (e.isTrident = b),
      (e.isWebKit = D),
      (e.load = se),
      (e.loadSources = A),
      (e.murmurX64Hash128 = le),
      (e.prepareForSources = ae),
      (e.sources = re),
      (e.transformSource = function (e, t) {
        var r = function (e) {
          return w(e)
            ? t(e)
            : function () {
                var r = e();
                return c(r) ? r.then(t) : t(r);
              };
        };
        return function (t) {
          var n = e(t);
          return c(n) ? n.then(r) : r(n);
        };
      }),
      (e.withIframe = M),
      Object.defineProperty(e, '__esModule', { value: !0 }),
      e
    );
  })({});
  function e(e, t, r, n) {
    return new (r || (r = Promise))(function (t, i) {
      function o(e) {
        try {
          c(n.next(e));
        } catch (t) {
          i(t);
        }
      }
      function a(e) {
        try {
          c(n.throw(e));
        } catch (t) {
          i(t);
        }
      }
      function c(e) {
        var n;
        e.done
          ? t(e.value)
          : ((n = e.value),
            n instanceof r
              ? n
              : new r(function (e) {
                  e(n);
                })).then(o, a);
      }
      c((n = n.apply(e, [])).next());
    });
  }
  function r(e, t) {
    var r,
      n,
      i,
      o,
      a = {
        label: 0,
        sent: function () {
          if (1 & i[0]) throw i[1];
          return i[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (o = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (o[Symbol.iterator] = function () {
          return this;
        }),
      o
    );
    function c(c) {
      return function (s) {
        return (function (c) {
          if (r) throw new TypeError('Generator is already executing.');
          for (; o && ((o = 0), c[0] && (a = 0)), a; )
            try {
              if (
                ((r = 1),
                n &&
                  (i =
                    2 & c[0]
                      ? n.return
                      : c[0]
                        ? n.throw || ((i = n.return) && i.call(n), 0)
                        : n.next) &&
                  !(i = i.call(n, c[1])).done)
              )
                return i;
              switch (((n = 0), i && (c = [2 & c[0], i.value]), c[0])) {
                case 0:
                case 1:
                  i = c;
                  break;
                case 4:
                  return a.label++, { value: c[1], done: !1 };
                case 5:
                  a.label++, (n = c[1]), (c = [0]);
                  continue;
                case 7:
                  (c = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !(
                      (i = (i = a.trys).length > 0 && i[i.length - 1]) ||
                      (6 !== c[0] && 2 !== c[0])
                    )
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === c[0] && (!i || (c[1] > i[0] && c[1] < i[3]))) {
                    a.label = c[1];
                    break;
                  }
                  if (6 === c[0] && a.label < i[1]) {
                    (a.label = i[1]), (i = c);
                    break;
                  }
                  if (i && a.label < i[2]) {
                    (a.label = i[2]), a.ops.push(c);
                    break;
                  }
                  i[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              c = t.call(e, a);
            } catch (s) {
              (c = [6, s]), (n = 0);
            } finally {
              r = i = 0;
            }
          if (5 & c[0]) throw c[1];
          return { value: c[0] ? c[1] : void 0, done: !0 };
        })([c, s]);
      };
    }
  }
  var n = { exclude: [] };
  function t(e, t) {
    if (!['exclude', 'permissions_to_check', 'retries', 'timeout'].includes(e))
      throw new Error('Unknown option ' + e);
    if (
      ['exclude', 'permissions_to_check'].includes(e) &&
      (!Array.isArray(t) ||
        !t.every(function (e) {
          return 'string' == typeof e;
        }))
    )
      throw new Error(
        'The value of the exclude and permissions_to_check must be an array of strings',
      );
    if (['retries', 'timeout'].includes(e) && 'number' != typeof t)
      throw new Error('The value of retries must be a number');
    n[e] = t;
  }
  var o = {},
    a = { timeout: 'true' },
    i = function (e, t) {
      'undefined' != typeof window && (o[e] = t);
    },
    u = function () {
      return Object.fromEntries(
        Object.entries(o)
          .filter(function (e) {
            var t,
              r = e[0];
            return !(null === (t = null == n ? void 0 : n.exclude) ||
            void 0 === t
              ? void 0
              : t.includes(r));
          })
          .map(function (e) {
            return [e[0], (0, e[1])()];
          }),
      );
    },
    c = 3432918353,
    s = 461845907,
    l = 3864292196,
    d = 2246822507,
    f = 3266489909;
  function h(e, t) {
    return (e << t) | (e >>> (32 - t));
  }
  function m(e, t) {
    void 0 === t && (t = 0);
    for (var r = t, n = 0, i = 3 & e.length, o = e.length - i, a = 0; a < o; )
      (n =
        (255 & e.charCodeAt(a)) |
        ((255 & e.charCodeAt(++a)) << 8) |
        ((255 & e.charCodeAt(++a)) << 16) |
        ((255 & e.charCodeAt(++a)) << 24)),
        ++a,
        (n = h((n = Math.imul(n, c)), 15)),
        (r = h((r ^= n = Math.imul(n, s)), 13)),
        (r = Math.imul(r, 5) + l);
    switch (((n = 0), i)) {
      case 3:
        n ^= (255 & e.charCodeAt(a + 2)) << 16;
      case 2:
        n ^= (255 & e.charCodeAt(a + 1)) << 8;
      case 1:
        (n ^= 255 & e.charCodeAt(a)),
          (n = h((n = Math.imul(n, c)), 15)),
          (r ^= n = Math.imul(n, s));
    }
    return ((u = r ^= e.length),
    (u ^= u >>> 16),
    (u = Math.imul(u, d)),
    (u ^= u >>> 13),
    (r = (u = Math.imul(u, f)) ^ (u >>> 16)) >>> 0).toString(36);
    var u;
  }
  function v(e, t) {
    return new Promise(function (r) {
      setTimeout(function () {
        return r(t);
      }, e);
    });
  }
  function g(e, t, r) {
    return Promise.all(
      e.map(function (e) {
        return Promise.race([e, v(t, r)]);
      }),
    );
  }
  function w() {
    return e(this, void 0, void 0, function () {
      var e, t, i, o, c;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            return (
              r.trys.push([0, 2, , 3]),
              (e = u()),
              (t = Object.keys(e)),
              [
                4,
                g(Object.values(e), (null == n ? void 0 : n.timeout) || 1e3, a),
              ]
            );
          case 1:
            return (
              (i = r.sent()),
              (o = i.filter(function (e) {
                return void 0 !== e;
              })),
              (c = {}),
              o.forEach(function (e, r) {
                c[t[r]] = e;
              }),
              [2, S(c, n.exclude || [])]
            );
          case 2:
            throw r.sent();
          case 3:
            return [2];
        }
      });
    });
  }
  function S(e, t) {
    var r = {},
      n = function (n) {
        if (e.hasOwnProperty(n)) {
          var i = e[n];
          if ('object' != typeof i || Array.isArray(i))
            t.includes(n) || (r[n] = i);
          else {
            var o = S(
              i,
              t.map(function (e) {
                return e.startsWith(n + '.') ? e.slice(n.length + 1) : e;
              }),
            );
            Object.keys(o).length > 0 && (r[n] = o);
          }
        }
      };
    for (var i in e) n(i);
    return r;
  }
  function y(t) {
    return e(this, void 0, void 0, function () {
      var e;
      return r(this, function (t) {
        switch (t.label) {
          case 0:
            return t.trys.push([0, 2, , 3]), [4, w()];
          case 1:
            return (
              (e = t.sent()),
              [2, { hash: m(JSON.stringify(e)).toString(), data: e }]
            );
          case 2:
            throw t.sent();
          case 3:
            return [2];
        }
      });
    });
  }
  function E(e) {
    for (var t = 0, r = 0; r < e.length; ++r) t += Math.abs(e[r]);
    return t;
  }
  function P(e, t, r) {
    for (var n = [], i = 0; i < e[0].data.length; i++) {
      for (var o = [], a = 0; a < e.length; a++) o.push(e[a].data[i]);
      n.push(M(o));
    }
    var c = new Uint8ClampedArray(n);
    return new ImageData(c, t, r);
  }
  function M(e) {
    if (0 === e.length) return 0;
    for (var t = {}, r = 0, n = e; r < n.length; r++)
      t[(o = n[r])] = (t[o] || 0) + 1;
    var i = e[0];
    for (var o in t) t[o] > t[i] && (i = parseInt(o, 10));
    return i;
  }
  function A() {
    if ('undefined' == typeof navigator)
      return { name: 'unknown', version: 'unknown' };
    for (
      var e = navigator.userAgent,
        t = { Edg: 'Edge', OPR: 'Opera' },
        r = 0,
        n = [
          /(?<name>Edge|Edg)\/(?<version>\d+(?:\.\d+)?)/,
          /(?<name>(?:Chrome|Chromium|OPR|Opera|Vivaldi|Brave))\/(?<version>\d+(?:\.\d+)?)/,
          /(?<name>(?:Firefox|Waterfox|Iceweasel|IceCat))\/(?<version>\d+(?:\.\d+)?)/,
          /(?<name>Safari)\/(?<version>\d+(?:\.\d+)?)/,
          /(?<name>MSIE|Trident|IEMobile).+?(?<version>\d+(?:\.\d+)?)/,
          /(?<name>[A-Za-z]+)\/(?<version>\d+(?:\.\d+)?)/,
          /(?<name>SamsungBrowser)\/(?<version>\d+(?:\.\d+)?)/,
        ];
      r < n.length;
      r++
    ) {
      var i = n[r],
        o = e.match(i);
      if (o && o.groups)
        return {
          name: t[o.groups.name] || o.groups.name,
          version: o.groups.version,
        };
    }
    return { name: 'unknown', version: 'unknown' };
  }
  i('audio', function () {
    return e(this, void 0, void 0, function () {
      return r(this, function (e) {
        return [
          2,
          new Promise(function (e, t) {
            try {
              var r = new (window.OfflineAudioContext ||
                  window.webkitOfflineAudioContext)(1, 5e3, 44100),
                n = r.createBufferSource(),
                i = r.createOscillator();
              i.frequency.value = 1e3;
              var o,
                a = r.createDynamicsCompressor();
              (a.threshold.value = -50),
                (a.knee.value = 40),
                (a.ratio.value = 12),
                (a.attack.value = 0),
                (a.release.value = 0.2),
                i.connect(a),
                a.connect(r.destination),
                i.start(),
                (r.oncomplete = function (t) {
                  (o = t.renderedBuffer.getChannelData(0)),
                    e({
                      sampleHash: E(o),
                      oscillator: i.type,
                      maxChannels: r.destination.maxChannelCount,
                      channelCountMode: n.channelCountMode,
                    });
                }),
                r.startRendering();
            } catch (c) {
              t(c);
            }
          }),
        ];
      });
    });
  });
  var C = 'SamsungBrowser' !== A().name ? 1 : 3,
    x = 280,
    k = 20;
  'Firefox' != A().name &&
    i('canvas', function () {
      return (
        document.createElement('canvas').getContext('2d'),
        new Promise(function (e) {
          e({
            commonImageDataHash: m(
              P(
                Array.from({ length: C }, function () {
                  return (function () {
                    var e = document.createElement('canvas'),
                      t = e.getContext('2d');
                    if (!t) return new ImageData(1, 1);
                    (e.width = x), (e.height = k);
                    var r = t.createLinearGradient(0, 0, e.width, e.height);
                    r.addColorStop(0, 'red'),
                      r.addColorStop(1 / 6, 'orange'),
                      r.addColorStop(2 / 6, 'yellow'),
                      r.addColorStop(0.5, 'green'),
                      r.addColorStop(4 / 6, 'blue'),
                      r.addColorStop(5 / 6, 'indigo'),
                      r.addColorStop(1, 'violet'),
                      (t.fillStyle = r),
                      t.fillRect(0, 0, e.width, e.height);
                    var n = 'Random Text WMwmil10Oo';
                    return (
                      (t.font = '23.123px Arial'),
                      (t.fillStyle = 'black'),
                      t.fillText(n, -5, 15),
                      (t.fillStyle = 'rgba(0, 0, 255, 0.5)'),
                      t.fillText(n, -3.3, 17.7),
                      t.beginPath(),
                      t.moveTo(0, 0),
                      t.lineTo((2 * e.width) / 7, e.height),
                      (t.strokeStyle = 'white'),
                      (t.lineWidth = 2),
                      t.stroke(),
                      t.getImageData(0, 0, e.width, e.height)
                    );
                  })();
                }),
                x,
                k,
              ).data.toString(),
            ).toString(),
          });
        })
      );
    });
  var T,
    R = [
      'Arial',
      'Arial Black',
      'Arial Narrow',
      'Arial Rounded MT',
      'Arimo',
      'Archivo',
      'Barlow',
      'Bebas Neue',
      'Bitter',
      'Bookman',
      'Calibri',
      'Cabin',
      'Candara',
      'Century',
      'Century Gothic',
      'Comic Sans MS',
      'Constantia',
      'Courier',
      'Courier New',
      'Crimson Text',
      'DM Mono',
      'DM Sans',
      'DM Serif Display',
      'DM Serif Text',
      'Dosis',
      'Droid Sans',
      'Exo',
      'Fira Code',
      'Fira Sans',
      'Franklin Gothic Medium',
      'Garamond',
      'Geneva',
      'Georgia',
      'Gill Sans',
      'Helvetica',
      'Impact',
      'Inconsolata',
      'Indie Flower',
      'Inter',
      'Josefin Sans',
      'Karla',
      'Lato',
      'Lexend',
      'Lucida Bright',
      'Lucida Console',
      'Lucida Sans Unicode',
      'Manrope',
      'Merriweather',
      'Merriweather Sans',
      'Montserrat',
      'Myriad',
      'Noto Sans',
      'Nunito',
      'Nunito Sans',
      'Open Sans',
      'Optima',
      'Orbitron',
      'Oswald',
      'Pacifico',
      'Palatino',
      'Perpetua',
      'PT Sans',
      'PT Serif',
      'Poppins',
      'Prompt',
      'Public Sans',
      'Quicksand',
      'Rajdhani',
      'Recursive',
      'Roboto',
      'Roboto Condensed',
      'Rockwell',
      'Rubik',
      'Segoe Print',
      'Segoe Script',
      'Segoe UI',
      'Sora',
      'Source Sans Pro',
      'Space Mono',
      'Tahoma',
      'Taviraj',
      'Times',
      'Times New Roman',
      'Titillium Web',
      'Trebuchet MS',
      'Ubuntu',
      'Varela Round',
      'Verdana',
      'Work Sans',
    ],
    I = ['monospace', 'sans-serif', 'serif'];
  function O(e, t) {
    if (!e) throw new Error('Canvas context not supported');
    return (e.font = '72px '.concat(t)), e.measureText('WwMmLli0Oo').width;
  }
  function _() {
    var e,
      t = document.createElement('canvas'),
      r =
        null !== (e = t.getContext('webgl')) && void 0 !== e
          ? e
          : t.getContext('experimental-webgl');
    if (r && 'getParameter' in r) {
      var n = r.getExtension('WEBGL_debug_renderer_info');
      return {
        vendor: (r.getParameter(r.VENDOR) || '').toString(),
        vendorUnmasked: n
          ? (r.getParameter(n.UNMASKED_VENDOR_WEBGL) || '').toString()
          : '',
        renderer: (r.getParameter(r.RENDERER) || '').toString(),
        rendererUnmasked: n
          ? (r.getParameter(n.UNMASKED_RENDERER_WEBGL) || '').toString()
          : '',
        version: (r.getParameter(r.VERSION) || '').toString(),
        shadingLanguageVersion: (
          r.getParameter(r.SHADING_LANGUAGE_VERSION) || ''
        ).toString(),
      };
    }
    return 'undefined';
  }
  function D() {
    var e = new Float32Array(1),
      t = new Uint8Array(e.buffer);
    return (e[0] = 1 / 0), (e[0] = e[0] - e[0]), t[3];
  }
  function B(e, t) {
    var r = {};
    return (
      t.forEach(function (t) {
        var n = (function (e) {
          if (0 === e.length) return null;
          var t = {};
          e.forEach(function (e) {
            var r = String(e);
            t[r] = (t[r] || 0) + 1;
          });
          var r = e[0],
            n = 1;
          return (
            Object.keys(t).forEach(function (e) {
              t[e] > n && ((r = e), (n = t[e]));
            }),
            r
          );
        })(
          e
            .map(function (e) {
              return t in e ? e[t] : void 0;
            })
            .filter(function (e) {
              return void 0 !== e;
            }),
        );
        n && (r[t] = n);
      }),
      r
    );
  }
  function L() {
    var e = [],
      t = {
        'prefers-contrast': [
          'high',
          'more',
          'low',
          'less',
          'forced',
          'no-preference',
        ],
        'any-hover': ['hover', 'none'],
        'any-pointer': ['none', 'coarse', 'fine'],
        pointer: ['none', 'coarse', 'fine'],
        hover: ['hover', 'none'],
        update: ['fast', 'slow'],
        'inverted-colors': ['inverted', 'none'],
        'prefers-reduced-motion': ['reduce', 'no-preference'],
        'prefers-reduced-transparency': ['reduce', 'no-preference'],
        scripting: ['none', 'initial-only', 'enabled'],
        'forced-colors': ['active', 'none'],
      };
    return (
      Object.keys(t).forEach(function (r) {
        t[r].forEach(function (t) {
          matchMedia('('.concat(r, ': ').concat(t, ')')).matches &&
            e.push(''.concat(r, ': ').concat(t));
        });
      }),
      e
    );
  }
  function F() {
    if (
      'https:' === window.location.protocol &&
      'function' == typeof window.ApplePaySession
    )
      try {
        for (var e = window.ApplePaySession.supportsVersion, t = 15; t > 0; t--)
          if (e(t)) return t;
      } catch (r) {
        return 0;
      }
    return 0;
  }
  'Firefox' != A().name &&
    i('fonts', function () {
      var t = this;
      return new Promise(function (n, i) {
        try {
          !(function () {
            var i;
            e(this, void 0, void 0, function () {
              var o, a, c;
              return r(this, function (s) {
                switch (s.label) {
                  case 0:
                    return document.body
                      ? [3, 2]
                      : [
                          4,
                          new Promise(function (e) {
                            return setTimeout(e, 50, undefined);
                          }),
                        ];
                  case 1:
                    return s.sent(), [3, 0];
                  case 2:
                    if (
                      ((o = document.createElement('iframe')).setAttribute(
                        'frameBorder',
                        '0',
                      ),
                      (a = o.style).setProperty('position', 'fixed'),
                      a.setProperty('display', 'block', 'important'),
                      a.setProperty('visibility', 'visible'),
                      a.setProperty('border', '0'),
                      a.setProperty('opacity', '0'),
                      (o.src = 'about:blank'),
                      document.body.appendChild(o),
                      !(c =
                        o.contentDocument ||
                        (null === (i = o.contentWindow) || void 0 === i
                          ? void 0
                          : i.document)))
                    )
                      throw new Error('Iframe document is not accessible');
                    return (
                      (function (i) {
                        var o = i.iframe;
                        e(t, void 0, void 0, function () {
                          var e, t, i, a;
                          return r(this, function (r) {
                            return (
                              (e = o.createElement('canvas')),
                              (t = e.getContext('2d')),
                              (i = I.map(function (e) {
                                return O(t, e);
                              })),
                              (a = {}),
                              R.forEach(function (e) {
                                var r = O(t, e);
                                i.includes(r) || (a[e] = r);
                              }),
                              n(a),
                              [2]
                            );
                          });
                        });
                      })({ iframe: c }),
                      setTimeout(function () {
                        document.body.removeChild(o);
                      }, 0),
                      [2]
                    );
                }
              });
            });
          })();
        } catch (o) {
          i({ error: 'unsupported' });
        }
      });
    }),
    i('hardware', function () {
      return new Promise(function (e, t) {
        var r = void 0 !== navigator.deviceMemory ? navigator.deviceMemory : 0,
          n =
            window.performance && window.performance.memory
              ? window.performance.memory
              : 0;
        e({
          videocard: _(),
          architecture: D(),
          deviceMemory: r.toString() || 'undefined',
          jsHeapSizeLimit: n.jsHeapSizeLimit || 0,
        });
      });
    }),
    i('locales', function () {
      return new Promise(function (e) {
        e({
          languages: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
      });
    }),
    i('permissions', function () {
      return e(this, void 0, void 0, function () {
        var t;
        return r(this, function (i) {
          return (
            (T = (null == n ? void 0 : n.permissions_to_check) || [
              'accelerometer',
              'accessibility',
              'accessibility-events',
              'ambient-light-sensor',
              'background-fetch',
              'background-sync',
              'bluetooth',
              'camera',
              'clipboard-read',
              'clipboard-write',
              'device-info',
              'display-capture',
              'gyroscope',
              'geolocation',
              'local-fonts',
              'magnetometer',
              'microphone',
              'midi',
              'nfc',
              'notifications',
              'payment-handler',
              'persistent-storage',
              'push',
              'speaker',
              'storage-access',
              'top-level-storage-access',
              'window-management',
              'query',
            ]),
            (t = Array.from(
              { length: (null == n ? void 0 : n.retries) || 3 },
              function () {
                return (function () {
                  return e(this, void 0, void 0, function () {
                    var e, t, n, i, o;
                    return r(this, function (r) {
                      switch (r.label) {
                        case 0:
                          (e = {}), (t = 0), (n = T), (r.label = 1);
                        case 1:
                          if (!(t < n.length)) return [3, 6];
                          (i = n[t]), (r.label = 2);
                        case 2:
                          return (
                            r.trys.push([2, 4, , 5]),
                            [4, navigator.permissions.query({ name: i })]
                          );
                        case 3:
                          return (
                            (o = r.sent()), (e[i] = o.state.toString()), [3, 5]
                          );
                        case 4:
                          return r.sent(), [3, 5];
                        case 5:
                          return t++, [3, 1];
                        case 6:
                          return [2, e];
                      }
                    });
                  });
                })();
              },
            )),
            [
              2,
              Promise.all(t).then(function (e) {
                return B(e, T);
              }),
            ]
          );
        });
      });
    }),
    i('plugins', function () {
      var e = [];
      if (navigator.plugins)
        for (var t = 0; t < navigator.plugins.length; t++) {
          var r = navigator.plugins[t];
          e.push([r.name, r.filename, r.description].join('|'));
        }
      return new Promise(function (t) {
        t({ plugins: e });
      });
    }),
    i('screen', function () {
      return new Promise(function (e) {
        e({
          is_touchscreen: navigator.maxTouchPoints > 0,
          maxTouchPoints: navigator.maxTouchPoints,
          colorDepth: screen.colorDepth,
          mediaMatches: L(),
        });
      });
    }),
    i('system', function () {
      return new Promise(function (e) {
        var t = A();
        e({
          platform: window.navigator.platform,
          cookieEnabled: window.navigator.cookieEnabled,
          productSub: navigator.productSub,
          product: navigator.product,
          useragent: navigator.userAgent,
          browser: { name: t.name, version: t.version },
          applePayVersion: F(),
        });
      });
    });
  var N,
    U = 'SamsungBrowser' !== A().name ? 1 : 3,
    G = null;
  'undefined' != typeof document &&
    (((N = document.createElement('canvas')).width = 200),
    (N.height = 100),
    (G = N.getContext('webgl'))),
    i('webgl', function () {
      return e(this, void 0, void 0, function () {
        return r(this, function (e) {
          try {
            if (!G) throw new Error('WebGL not supported');
            return [
              2,
              {
                commonImageHash: m(
                  P(
                    Array.from({ length: U }, function () {
                      return (function () {
                        try {
                          if (!G) throw new Error('WebGL not supported');
                          var e = G.createShader(G.VERTEX_SHADER),
                            t = G.createShader(G.FRAGMENT_SHADER);
                          if (!e || !t)
                            throw new Error('Failed to create shaders');
                          if (
                            (G.shaderSource(
                              e,
                              '\n          attribute vec2 position;\n          void main() {\n              gl_Position = vec4(position, 0.0, 1.0);\n          }\n      ',
                            ),
                            G.shaderSource(
                              t,
                              '\n          precision mediump float;\n          void main() {\n              gl_FragColor = vec4(0.812, 0.195, 0.553, 0.921); // Set line color\n          }\n      ',
                            ),
                            G.compileShader(e),
                            !G.getShaderParameter(e, G.COMPILE_STATUS))
                          )
                            throw new Error(
                              'Vertex shader compilation failed: ' +
                                G.getShaderInfoLog(e),
                            );
                          if (
                            (G.compileShader(t),
                            !G.getShaderParameter(t, G.COMPILE_STATUS))
                          )
                            throw new Error(
                              'Fragment shader compilation failed: ' +
                                G.getShaderInfoLog(t),
                            );
                          var r = G.createProgram();
                          if (!r)
                            throw new Error('Failed to create shader program');
                          if (
                            (G.attachShader(r, e),
                            G.attachShader(r, t),
                            G.linkProgram(r),
                            !G.getProgramParameter(r, G.LINK_STATUS))
                          )
                            throw new Error(
                              'Shader program linking failed: ' +
                                G.getProgramInfoLog(r),
                            );
                          G.useProgram(r);
                          for (
                            var n = 137,
                              i = new Float32Array(548),
                              o = (2 * Math.PI) / n,
                              a = 0;
                            a < n;
                            a++
                          ) {
                            var c = a * o;
                            (i[4 * a] = 0),
                              (i[4 * a + 1] = 0),
                              (i[4 * a + 2] = Math.cos(c) * (N.width / 2)),
                              (i[4 * a + 3] = Math.sin(c) * (N.height / 2));
                          }
                          var s = G.createBuffer();
                          G.bindBuffer(G.ARRAY_BUFFER, s),
                            G.bufferData(G.ARRAY_BUFFER, i, G.STATIC_DRAW);
                          var u = G.getAttribLocation(r, 'position');
                          G.enableVertexAttribArray(u),
                            G.vertexAttribPointer(u, 2, G.FLOAT, !1, 0, 0),
                            G.viewport(0, 0, N.width, N.height),
                            G.clearColor(0, 0, 0, 1),
                            G.clear(G.COLOR_BUFFER_BIT),
                            G.drawArrays(G.LINES, 0, 274);
                          var l = new Uint8ClampedArray(N.width * N.height * 4);
                          return (
                            G.readPixels(
                              0,
                              0,
                              N.width,
                              N.height,
                              G.RGBA,
                              G.UNSIGNED_BYTE,
                              l,
                            ),
                            new ImageData(l, N.width, N.height)
                          );
                        } catch (d) {
                          return new ImageData(1, 1);
                        } finally {
                          G &&
                            (G.bindBuffer(G.ARRAY_BUFFER, null),
                            G.useProgram(null),
                            G.viewport(
                              0,
                              0,
                              G.drawingBufferWidth,
                              G.drawingBufferHeight,
                            ),
                            G.clearColor(0, 0, 0, 0));
                        }
                      })();
                    }),
                    N.width,
                    N.height,
                  ).data.toString(),
                ).toString(),
              },
            ];
          } catch (t) {
            return [2, { webgl: 'unsupported' }];
          }
          return [2];
        });
      });
    });
  var j = function (e, t, r, n) {
    for (var i = (r - t) / n, o = 0, a = 0; a < n; a++)
      o += e(t + (a + 0.5) * i);
    return o * i;
  };
  i('math', function () {
    return e(void 0, void 0, void 0, function () {
      return r(this, function (e) {
        return [
          2,
          {
            acos: Math.acos(0.5),
            asin: j(Math.asin, -1, 1, 97),
            atan: j(Math.atan, -1, 1, 97),
            cos: j(Math.cos, 0, Math.PI, 97),
            cosh: Math.cosh(9 / 7),
            e: Math.E,
            largeCos: Math.cos(1e20),
            largeSin: Math.sin(1e20),
            largeTan: Math.tan(1e20),
            log: Math.log(1e3),
            pi: Math.PI,
            sin: j(Math.sin, -Math.PI, Math.PI, 97),
            sinh: j(Math.sinh, -9 / 7, 7 / 9, 97),
            sqrt: Math.sqrt(2),
            tan: j(Math.tan, 0, 2 * Math.PI, 97),
            tanh: j(Math.tanh, -9 / 7, 7 / 9, 97),
          },
        ];
      });
    });
  });
  const getUTIDHash = async () => (await getThumbmarkJs()).hash;
  async function getThumbmarkJs() {
    return t('exclude', ['permissions']), y().then((e) => e);
  }
  const getFingerprintObjectFromFingerprintJs = async () => {
    const e = await FingerprintJS.load({
      apiKey: 'w19U95D41ZRuBaTVhebA',
      region: 'ap',
    });
    return await e.get();
  };
  var commonjsGlobal =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
          ? global
          : 'undefined' != typeof self
            ? self
            : {};
  function getAugmentedNamespace(e) {
    if (e.__esModule) return e;
    var t = e.default;
    if ('function' == typeof t) {
      var r = function e() {
        return this instanceof e
          ? Reflect.construct(t, arguments, this.constructor)
          : t.apply(this, arguments);
      };
      r.prototype = t.prototype;
    } else r = {};
    return (
      Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.keys(e).forEach(function (t) {
        var n = Object.getOwnPropertyDescriptor(e, t);
        Object.defineProperty(
          r,
          t,
          n.get
            ? n
            : {
                enumerable: !0,
                get: function () {
                  return e[t];
                },
              },
        );
      }),
      r
    );
  }
  var md5 = { exports: {} };
  const __viteBrowserExternal = {},
    __viteBrowserExternal$1 = Object.freeze(
      Object.defineProperty(
        { __proto__: null, default: __viteBrowserExternal },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    require$$1 = getAugmentedNamespace(__viteBrowserExternal$1);
  /**
   * [js-md5]{@link https://github.com/emn178/js-md5}
   *
   * @namespace md5
   * @version 0.8.3
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2023
   * @license MIT
   */
  var module;
  (module = md5),
    (function () {
      var e = 'input is invalid type',
        t = 'object' == typeof window,
        r = t ? window : {};
      r.JS_MD5_NO_WINDOW && (t = !1);
      var n = !t && 'object' == typeof self,
        i =
          !r.JS_MD5_NO_NODE_JS &&
          'object' == typeof process &&
          process.versions &&
          process.versions.node;
      i ? (r = commonjsGlobal) : n && (r = self);
      var o,
        a = !r.JS_MD5_NO_COMMON_JS && module.exports,
        c = !r.JS_MD5_NO_ARRAY_BUFFER && 'undefined' != typeof ArrayBuffer,
        s = '0123456789abcdef'.split(''),
        u = [128, 32768, 8388608, -2147483648],
        l = [0, 8, 16, 24],
        d = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'],
        m =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(
            '',
          ),
        f = [];
      if (c) {
        var p = new ArrayBuffer(68);
        (o = new Uint8Array(p)), (f = new Uint32Array(p));
      }
      var v = Array.isArray;
      (!r.JS_MD5_NO_NODE_JS && v) ||
        (v = function (e) {
          return '[object Array]' === Object.prototype.toString.call(e);
        });
      var g = ArrayBuffer.isView;
      !c ||
        (!r.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && g) ||
        (g = function (e) {
          return (
            'object' == typeof e &&
            e.buffer &&
            e.buffer.constructor === ArrayBuffer
          );
        });
      var h = function (t) {
          var r = typeof t;
          if ('string' === r) return [t, !0];
          if ('object' !== r || null === t) throw new Error(e);
          if (c && t.constructor === ArrayBuffer)
            return [new Uint8Array(t), !1];
          if (!v(t) && !g(t)) throw new Error(e);
          return [t, !1];
        },
        _ = function (e) {
          return function (t) {
            return new E(!0).update(t)[e]();
          };
        },
        S = function (t) {
          var n,
            i = require$$1,
            o = require$$1.Buffer;
          return (
            (n =
              o.from && !r.JS_MD5_NO_BUFFER_FROM
                ? o.from
                : function (e) {
                    return new o(e);
                  }),
            function (r) {
              if ('string' == typeof r)
                return i.createHash('md5').update(r, 'utf8').digest('hex');
              if (null == r) throw new Error(e);
              return (
                r.constructor === ArrayBuffer && (r = new Uint8Array(r)),
                v(r) || g(r) || r.constructor === o
                  ? i.createHash('md5').update(n(r)).digest('hex')
                  : t(r)
              );
            }
          );
        },
        I = function (e) {
          return function (t, r) {
            return new T(t, !0).update(r)[e]();
          };
        };
      function E(e) {
        if (e)
          (f[0] =
            f[16] =
            f[1] =
            f[2] =
            f[3] =
            f[4] =
            f[5] =
            f[6] =
            f[7] =
            f[8] =
            f[9] =
            f[10] =
            f[11] =
            f[12] =
            f[13] =
            f[14] =
            f[15] =
              0),
            (this.blocks = f),
            (this.buffer8 = o);
        else if (c) {
          var t = new ArrayBuffer(68);
          (this.buffer8 = new Uint8Array(t)),
            (this.blocks = new Uint32Array(t));
        } else
          this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        (this.h0 =
          this.h1 =
          this.h2 =
          this.h3 =
          this.start =
          this.bytes =
          this.hBytes =
            0),
          (this.finalized = this.hashed = !1),
          (this.first = !0);
      }
      function T(e, t) {
        var r,
          n = h(e);
        if (((e = n[0]), n[1])) {
          var i,
            o = [],
            a = e.length,
            c = 0;
          for (r = 0; r < a; ++r)
            (i = e.charCodeAt(r)) < 128
              ? (o[c++] = i)
              : i < 2048
                ? ((o[c++] = 192 | (i >>> 6)), (o[c++] = 128 | (63 & i)))
                : i < 55296 || i >= 57344
                  ? ((o[c++] = 224 | (i >>> 12)),
                    (o[c++] = 128 | ((i >>> 6) & 63)),
                    (o[c++] = 128 | (63 & i)))
                  : ((i =
                      65536 +
                      (((1023 & i) << 10) | (1023 & e.charCodeAt(++r)))),
                    (o[c++] = 240 | (i >>> 18)),
                    (o[c++] = 128 | ((i >>> 12) & 63)),
                    (o[c++] = 128 | ((i >>> 6) & 63)),
                    (o[c++] = 128 | (63 & i)));
          e = o;
        }
        e.length > 64 && (e = new E(!0).update(e).array());
        var s = [],
          u = [];
        for (r = 0; r < 64; ++r) {
          var l = e[r] || 0;
          (s[r] = 92 ^ l), (u[r] = 54 ^ l);
        }
        E.call(this, t),
          this.update(u),
          (this.oKeyPad = s),
          (this.inner = !0),
          (this.sharedMemory = t);
      }
      (E.prototype.update = function (e) {
        if (this.finalized) throw new Error('finalize already called');
        var t = h(e);
        e = t[0];
        for (
          var r,
            n,
            i = t[1],
            o = 0,
            a = e.length,
            s = this.blocks,
            u = this.buffer8;
          o < a;

        ) {
          if (
            (this.hashed &&
              ((this.hashed = !1),
              (s[0] = s[16]),
              (s[16] =
                s[1] =
                s[2] =
                s[3] =
                s[4] =
                s[5] =
                s[6] =
                s[7] =
                s[8] =
                s[9] =
                s[10] =
                s[11] =
                s[12] =
                s[13] =
                s[14] =
                s[15] =
                  0)),
            i)
          )
            if (c)
              for (n = this.start; o < a && n < 64; ++o)
                (r = e.charCodeAt(o)) < 128
                  ? (u[n++] = r)
                  : r < 2048
                    ? ((u[n++] = 192 | (r >>> 6)), (u[n++] = 128 | (63 & r)))
                    : r < 55296 || r >= 57344
                      ? ((u[n++] = 224 | (r >>> 12)),
                        (u[n++] = 128 | ((r >>> 6) & 63)),
                        (u[n++] = 128 | (63 & r)))
                      : ((r =
                          65536 +
                          (((1023 & r) << 10) | (1023 & e.charCodeAt(++o)))),
                        (u[n++] = 240 | (r >>> 18)),
                        (u[n++] = 128 | ((r >>> 12) & 63)),
                        (u[n++] = 128 | ((r >>> 6) & 63)),
                        (u[n++] = 128 | (63 & r)));
            else
              for (n = this.start; o < a && n < 64; ++o)
                (r = e.charCodeAt(o)) < 128
                  ? (s[n >>> 2] |= r << l[3 & n++])
                  : r < 2048
                    ? ((s[n >>> 2] |= (192 | (r >>> 6)) << l[3 & n++]),
                      (s[n >>> 2] |= (128 | (63 & r)) << l[3 & n++]))
                    : r < 55296 || r >= 57344
                      ? ((s[n >>> 2] |= (224 | (r >>> 12)) << l[3 & n++]),
                        (s[n >>> 2] |= (128 | ((r >>> 6) & 63)) << l[3 & n++]),
                        (s[n >>> 2] |= (128 | (63 & r)) << l[3 & n++]))
                      : ((r =
                          65536 +
                          (((1023 & r) << 10) | (1023 & e.charCodeAt(++o)))),
                        (s[n >>> 2] |= (240 | (r >>> 18)) << l[3 & n++]),
                        (s[n >>> 2] |= (128 | ((r >>> 12) & 63)) << l[3 & n++]),
                        (s[n >>> 2] |= (128 | ((r >>> 6) & 63)) << l[3 & n++]),
                        (s[n >>> 2] |= (128 | (63 & r)) << l[3 & n++]));
          else if (c) for (n = this.start; o < a && n < 64; ++o) u[n++] = e[o];
          else
            for (n = this.start; o < a && n < 64; ++o)
              s[n >>> 2] |= e[o] << l[3 & n++];
          (this.lastByteIndex = n),
            (this.bytes += n - this.start),
            n >= 64
              ? ((this.start = n - 64), this.hash(), (this.hashed = !0))
              : (this.start = n);
        }
        return (
          this.bytes > 4294967295 &&
            ((this.hBytes += (this.bytes / 4294967296) | 0),
            (this.bytes = this.bytes % 4294967296)),
          this
        );
      }),
        (E.prototype.finalize = function () {
          if (!this.finalized) {
            this.finalized = !0;
            var e = this.blocks,
              t = this.lastByteIndex;
            (e[t >>> 2] |= u[3 & t]),
              t >= 56 &&
                (this.hashed || this.hash(),
                (e[0] = e[16]),
                (e[16] =
                  e[1] =
                  e[2] =
                  e[3] =
                  e[4] =
                  e[5] =
                  e[6] =
                  e[7] =
                  e[8] =
                  e[9] =
                  e[10] =
                  e[11] =
                  e[12] =
                  e[13] =
                  e[14] =
                  e[15] =
                    0)),
              (e[14] = this.bytes << 3),
              (e[15] = (this.hBytes << 3) | (this.bytes >>> 29)),
              this.hash();
          }
        }),
        (E.prototype.hash = function () {
          var e,
            t,
            r,
            n,
            i,
            o,
            a = this.blocks;
          this.first
            ? (t =
                ((((t =
                  ((e =
                    ((((e = a[0] - 680876937) << 7) | (e >>> 25)) - 271733879) |
                    0) ^
                    ((r =
                      ((((r =
                        (-271733879 ^
                          ((n =
                            ((((n =
                              (-1732584194 ^ (2004318071 & e)) +
                              a[1] -
                              117830708) <<
                              12) |
                              (n >>> 20)) +
                              e) |
                            0) &
                            (-271733879 ^ e))) +
                        a[2] -
                        1126478375) <<
                        17) |
                        (r >>> 15)) +
                        n) |
                      0) &
                      (n ^ e))) +
                  a[3] -
                  1316259209) <<
                  22) |
                  (t >>> 10)) +
                  r) |
                0)
            : ((e = this.h0),
              (t = this.h1),
              (r = this.h2),
              (t =
                ((((t +=
                  ((e =
                    ((((e +=
                      ((n = this.h3) ^ (t & (r ^ n))) + a[0] - 680876936) <<
                      7) |
                      (e >>> 25)) +
                      t) |
                    0) ^
                    ((r =
                      ((((r +=
                        (t ^
                          ((n =
                            ((((n += (r ^ (e & (t ^ r))) + a[1] - 389564586) <<
                              12) |
                              (n >>> 20)) +
                              e) |
                            0) &
                            (e ^ t))) +
                        a[2] +
                        606105819) <<
                        17) |
                        (r >>> 15)) +
                        n) |
                      0) &
                      (n ^ e))) +
                  a[3] -
                  1044525330) <<
                  22) |
                  (t >>> 10)) +
                  r) |
                0)),
            (t =
              ((((t +=
                ((e =
                  ((((e += (n ^ (t & (r ^ n))) + a[4] - 176418897) << 7) |
                    (e >>> 25)) +
                    t) |
                  0) ^
                  ((r =
                    ((((r +=
                      (t ^
                        ((n =
                          ((((n += (r ^ (e & (t ^ r))) + a[5] + 1200080426) <<
                            12) |
                            (n >>> 20)) +
                            e) |
                          0) &
                          (e ^ t))) +
                      a[6] -
                      1473231341) <<
                      17) |
                      (r >>> 15)) +
                      n) |
                    0) &
                    (n ^ e))) +
                a[7] -
                45705983) <<
                22) |
                (t >>> 10)) +
                r) |
              0),
            (t =
              ((((t +=
                ((e =
                  ((((e += (n ^ (t & (r ^ n))) + a[8] + 1770035416) << 7) |
                    (e >>> 25)) +
                    t) |
                  0) ^
                  ((r =
                    ((((r +=
                      (t ^
                        ((n =
                          ((((n += (r ^ (e & (t ^ r))) + a[9] - 1958414417) <<
                            12) |
                            (n >>> 20)) +
                            e) |
                          0) &
                          (e ^ t))) +
                      a[10] -
                      42063) <<
                      17) |
                      (r >>> 15)) +
                      n) |
                    0) &
                    (n ^ e))) +
                a[11] -
                1990404162) <<
                22) |
                (t >>> 10)) +
                r) |
              0),
            (t =
              ((((t +=
                ((e =
                  ((((e += (n ^ (t & (r ^ n))) + a[12] + 1804603682) << 7) |
                    (e >>> 25)) +
                    t) |
                  0) ^
                  ((r =
                    ((((r +=
                      (t ^
                        ((n =
                          ((((n += (r ^ (e & (t ^ r))) + a[13] - 40341101) <<
                            12) |
                            (n >>> 20)) +
                            e) |
                          0) &
                          (e ^ t))) +
                      a[14] -
                      1502002290) <<
                      17) |
                      (r >>> 15)) +
                      n) |
                    0) &
                    (n ^ e))) +
                a[15] +
                1236535329) <<
                22) |
                (t >>> 10)) +
                r) |
              0),
            (t =
              ((((t +=
                ((n =
                  ((((n +=
                    (t ^
                      (r &
                        ((e =
                          ((((e += (r ^ (n & (t ^ r))) + a[1] - 165796510) <<
                            5) |
                            (e >>> 27)) +
                            t) |
                          0) ^
                          t))) +
                    a[6] -
                    1069501632) <<
                    9) |
                    (n >>> 23)) +
                    e) |
                  0) ^
                  (e &
                    ((r =
                      ((((r += (e ^ (t & (n ^ e))) + a[11] + 643717713) << 14) |
                        (r >>> 18)) +
                        n) |
                      0) ^
                      n))) +
                a[0] -
                373897302) <<
                20) |
                (t >>> 12)) +
                r) |
              0),
            (t =
              ((((t +=
                ((n =
                  ((((n +=
                    (t ^
                      (r &
                        ((e =
                          ((((e += (r ^ (n & (t ^ r))) + a[5] - 701558691) <<
                            5) |
                            (e >>> 27)) +
                            t) |
                          0) ^
                          t))) +
                    a[10] +
                    38016083) <<
                    9) |
                    (n >>> 23)) +
                    e) |
                  0) ^
                  (e &
                    ((r =
                      ((((r += (e ^ (t & (n ^ e))) + a[15] - 660478335) << 14) |
                        (r >>> 18)) +
                        n) |
                      0) ^
                      n))) +
                a[4] -
                405537848) <<
                20) |
                (t >>> 12)) +
                r) |
              0),
            (t =
              ((((t +=
                ((n =
                  ((((n +=
                    (t ^
                      (r &
                        ((e =
                          ((((e += (r ^ (n & (t ^ r))) + a[9] + 568446438) <<
                            5) |
                            (e >>> 27)) +
                            t) |
                          0) ^
                          t))) +
                    a[14] -
                    1019803690) <<
                    9) |
                    (n >>> 23)) +
                    e) |
                  0) ^
                  (e &
                    ((r =
                      ((((r += (e ^ (t & (n ^ e))) + a[3] - 187363961) << 14) |
                        (r >>> 18)) +
                        n) |
                      0) ^
                      n))) +
                a[8] +
                1163531501) <<
                20) |
                (t >>> 12)) +
                r) |
              0),
            (t =
              ((((t +=
                ((n =
                  ((((n +=
                    (t ^
                      (r &
                        ((e =
                          ((((e += (r ^ (n & (t ^ r))) + a[13] - 1444681467) <<
                            5) |
                            (e >>> 27)) +
                            t) |
                          0) ^
                          t))) +
                    a[2] -
                    51403784) <<
                    9) |
                    (n >>> 23)) +
                    e) |
                  0) ^
                  (e &
                    ((r =
                      ((((r += (e ^ (t & (n ^ e))) + a[7] + 1735328473) << 14) |
                        (r >>> 18)) +
                        n) |
                      0) ^
                      n))) +
                a[12] -
                1926607734) <<
                20) |
                (t >>> 12)) +
                r) |
              0),
            (t =
              ((((t +=
                ((o =
                  (n =
                    ((((n +=
                      ((i = t ^ r) ^
                        (e =
                          ((((e += (i ^ n) + a[5] - 378558) << 4) |
                            (e >>> 28)) +
                            t) |
                          0)) +
                      a[8] -
                      2022574463) <<
                      11) |
                      (n >>> 21)) +
                      e) |
                    0) ^ e) ^
                  (r =
                    ((((r += (o ^ t) + a[11] + 1839030562) << 16) |
                      (r >>> 16)) +
                      n) |
                    0)) +
                a[14] -
                35309556) <<
                23) |
                (t >>> 9)) +
                r) |
              0),
            (t =
              ((((t +=
                ((o =
                  (n =
                    ((((n +=
                      ((i = t ^ r) ^
                        (e =
                          ((((e += (i ^ n) + a[1] - 1530992060) << 4) |
                            (e >>> 28)) +
                            t) |
                          0)) +
                      a[4] +
                      1272893353) <<
                      11) |
                      (n >>> 21)) +
                      e) |
                    0) ^ e) ^
                  (r =
                    ((((r += (o ^ t) + a[7] - 155497632) << 16) | (r >>> 16)) +
                      n) |
                    0)) +
                a[10] -
                1094730640) <<
                23) |
                (t >>> 9)) +
                r) |
              0),
            (t =
              ((((t +=
                ((o =
                  (n =
                    ((((n +=
                      ((i = t ^ r) ^
                        (e =
                          ((((e += (i ^ n) + a[13] + 681279174) << 4) |
                            (e >>> 28)) +
                            t) |
                          0)) +
                      a[0] -
                      358537222) <<
                      11) |
                      (n >>> 21)) +
                      e) |
                    0) ^ e) ^
                  (r =
                    ((((r += (o ^ t) + a[3] - 722521979) << 16) | (r >>> 16)) +
                      n) |
                    0)) +
                a[6] +
                76029189) <<
                23) |
                (t >>> 9)) +
                r) |
              0),
            (t =
              ((((t +=
                ((o =
                  (n =
                    ((((n +=
                      ((i = t ^ r) ^
                        (e =
                          ((((e += (i ^ n) + a[9] - 640364487) << 4) |
                            (e >>> 28)) +
                            t) |
                          0)) +
                      a[12] -
                      421815835) <<
                      11) |
                      (n >>> 21)) +
                      e) |
                    0) ^ e) ^
                  (r =
                    ((((r += (o ^ t) + a[15] + 530742520) << 16) | (r >>> 16)) +
                      n) |
                    0)) +
                a[2] -
                995338651) <<
                23) |
                (t >>> 9)) +
                r) |
              0),
            (t =
              ((((t +=
                ((n =
                  ((((n +=
                    (t ^
                      ((e =
                        ((((e += (r ^ (t | ~n)) + a[0] - 198630844) << 6) |
                          (e >>> 26)) +
                          t) |
                        0) |
                        ~r)) +
                    a[7] +
                    1126891415) <<
                    10) |
                    (n >>> 22)) +
                    e) |
                  0) ^
                  ((r =
                    ((((r += (e ^ (n | ~t)) + a[14] - 1416354905) << 15) |
                      (r >>> 17)) +
                      n) |
                    0) |
                    ~e)) +
                a[5] -
                57434055) <<
                21) |
                (t >>> 11)) +
                r) |
              0),
            (t =
              ((((t +=
                ((n =
                  ((((n +=
                    (t ^
                      ((e =
                        ((((e += (r ^ (t | ~n)) + a[12] + 1700485571) << 6) |
                          (e >>> 26)) +
                          t) |
                        0) |
                        ~r)) +
                    a[3] -
                    1894986606) <<
                    10) |
                    (n >>> 22)) +
                    e) |
                  0) ^
                  ((r =
                    ((((r += (e ^ (n | ~t)) + a[10] - 1051523) << 15) |
                      (r >>> 17)) +
                      n) |
                    0) |
                    ~e)) +
                a[1] -
                2054922799) <<
                21) |
                (t >>> 11)) +
                r) |
              0),
            (t =
              ((((t +=
                ((n =
                  ((((n +=
                    (t ^
                      ((e =
                        ((((e += (r ^ (t | ~n)) + a[8] + 1873313359) << 6) |
                          (e >>> 26)) +
                          t) |
                        0) |
                        ~r)) +
                    a[15] -
                    30611744) <<
                    10) |
                    (n >>> 22)) +
                    e) |
                  0) ^
                  ((r =
                    ((((r += (e ^ (n | ~t)) + a[6] - 1560198380) << 15) |
                      (r >>> 17)) +
                      n) |
                    0) |
                    ~e)) +
                a[13] +
                1309151649) <<
                21) |
                (t >>> 11)) +
                r) |
              0),
            (t =
              ((((t +=
                ((n =
                  ((((n +=
                    (t ^
                      ((e =
                        ((((e += (r ^ (t | ~n)) + a[4] - 145523070) << 6) |
                          (e >>> 26)) +
                          t) |
                        0) |
                        ~r)) +
                    a[11] -
                    1120210379) <<
                    10) |
                    (n >>> 22)) +
                    e) |
                  0) ^
                  ((r =
                    ((((r += (e ^ (n | ~t)) + a[2] + 718787259) << 15) |
                      (r >>> 17)) +
                      n) |
                    0) |
                    ~e)) +
                a[9] -
                343485551) <<
                21) |
                (t >>> 11)) +
                r) |
              0),
            this.first
              ? ((this.h0 = (e + 1732584193) | 0),
                (this.h1 = (t - 271733879) | 0),
                (this.h2 = (r - 1732584194) | 0),
                (this.h3 = (n + 271733878) | 0),
                (this.first = !1))
              : ((this.h0 = (this.h0 + e) | 0),
                (this.h1 = (this.h1 + t) | 0),
                (this.h2 = (this.h2 + r) | 0),
                (this.h3 = (this.h3 + n) | 0));
        }),
        (E.prototype.hex = function () {
          this.finalize();
          var e = this.h0,
            t = this.h1,
            r = this.h2,
            n = this.h3;
          return (
            s[(e >>> 4) & 15] +
            s[15 & e] +
            s[(e >>> 12) & 15] +
            s[(e >>> 8) & 15] +
            s[(e >>> 20) & 15] +
            s[(e >>> 16) & 15] +
            s[(e >>> 28) & 15] +
            s[(e >>> 24) & 15] +
            s[(t >>> 4) & 15] +
            s[15 & t] +
            s[(t >>> 12) & 15] +
            s[(t >>> 8) & 15] +
            s[(t >>> 20) & 15] +
            s[(t >>> 16) & 15] +
            s[(t >>> 28) & 15] +
            s[(t >>> 24) & 15] +
            s[(r >>> 4) & 15] +
            s[15 & r] +
            s[(r >>> 12) & 15] +
            s[(r >>> 8) & 15] +
            s[(r >>> 20) & 15] +
            s[(r >>> 16) & 15] +
            s[(r >>> 28) & 15] +
            s[(r >>> 24) & 15] +
            s[(n >>> 4) & 15] +
            s[15 & n] +
            s[(n >>> 12) & 15] +
            s[(n >>> 8) & 15] +
            s[(n >>> 20) & 15] +
            s[(n >>> 16) & 15] +
            s[(n >>> 28) & 15] +
            s[(n >>> 24) & 15]
          );
        }),
        (E.prototype.toString = E.prototype.hex),
        (E.prototype.digest = function () {
          this.finalize();
          var e = this.h0,
            t = this.h1,
            r = this.h2,
            n = this.h3;
          return [
            255 & e,
            (e >>> 8) & 255,
            (e >>> 16) & 255,
            (e >>> 24) & 255,
            255 & t,
            (t >>> 8) & 255,
            (t >>> 16) & 255,
            (t >>> 24) & 255,
            255 & r,
            (r >>> 8) & 255,
            (r >>> 16) & 255,
            (r >>> 24) & 255,
            255 & n,
            (n >>> 8) & 255,
            (n >>> 16) & 255,
            (n >>> 24) & 255,
          ];
        }),
        (E.prototype.array = E.prototype.digest),
        (E.prototype.arrayBuffer = function () {
          this.finalize();
          var e = new ArrayBuffer(16),
            t = new Uint32Array(e);
          return (
            (t[0] = this.h0),
            (t[1] = this.h1),
            (t[2] = this.h2),
            (t[3] = this.h3),
            e
          );
        }),
        (E.prototype.buffer = E.prototype.arrayBuffer),
        (E.prototype.base64 = function () {
          for (var e, t, r, n = '', i = this.array(), o = 0; o < 15; )
            (e = i[o++]),
              (t = i[o++]),
              (r = i[o++]),
              (n +=
                m[e >>> 2] +
                m[63 & ((e << 4) | (t >>> 4))] +
                m[63 & ((t << 2) | (r >>> 6))] +
                m[63 & r]);
          return (e = i[o]), (n += m[e >>> 2] + m[(e << 4) & 63] + '==');
        }),
        (T.prototype = new E()),
        (T.prototype.finalize = function () {
          if ((E.prototype.finalize.call(this), this.inner)) {
            this.inner = !1;
            var e = this.array();
            E.call(this, this.sharedMemory),
              this.update(this.oKeyPad),
              this.update(e),
              E.prototype.finalize.call(this);
          }
        });
      var y = (function () {
        var e = _('hex');
        i && (e = S(e)),
          (e.create = function () {
            return new E();
          }),
          (e.update = function (t) {
            return e.create().update(t);
          });
        for (var t = 0; t < d.length; ++t) {
          var r = d[t];
          e[r] = _(r);
        }
        return e;
      })();
      (y.md5 = y),
        (y.md5.hmac = (function () {
          var e = I('hex');
          (e.create = function (e) {
            return new T(e);
          }),
            (e.update = function (t, r) {
              return e.create(t).update(r);
            });
          for (var t = 0; t < d.length; ++t) {
            var r = d[t];
            e[r] = I(r);
          }
          return e;
        })()),
        a ? (module.exports = y) : (r.md5 = y);
    })();
  var md5Exports = md5.exports;
  async function _triggerEvent(e, t = {}) {
    (await registerTrackEvent(e, t)) || triggerExpireEvent();
  }
  async function registerTrackEvent(e, t) {
    var r;
    const n = [];
    let i = !1;
    if (null == n ? void 0 : n.includes(e)) return !0;
    let o = await get_SHA_256(getURL()),
      a = gsService.getTrackInfo(),
      c = {},
      s = [];
    if (
      (a && a[o]
        ? ((c = a[o]),
          c && (null == c ? void 0 : c.eventsDetails)
            ? (s = Object.keys(c.eventsDetails))
            : (c.eventsDetails = {}))
        : ((i = !0), (c = { url: getURL() }), (c.eventsDetails = {})),
      s.includes(e))
    ) {
      let n = (null == (r = c.eventsDetails[e]) ? void 0 : r.payload) || {};
      (n = combineObjects(n, t)),
        (c.eventsDetails[e].payload = n),
        gsService.setTrackInfo({ [o]: c });
    } else {
      (c.eventsDetails[e] = { payload: t, updatedAt: getCurrentTimeStamp() }),
        (gsService.getUMID() && gsService.getUEID()) ||
          Object.keys(t).forEach(async (e) => {});
      if (
        [
          EVENTS_NAME.UPDATE_UMID,
          EVENTS_NAME.UPDATE_UEID,
          EVENTS_NAME.UPDATE_USER_PROFILE,
        ].includes(e)
      ) {
        if (e === EVENTS_NAME.UPDATE_UEID)
          gsService.setUEID(t.email),
            (null == t ? void 0 : t.channel_id) &&
              (gsService.setUEIDIdentificationSource(
                null == t ? void 0 : t.channel_id,
              ),
              gsService.setUEIDIdentificationTime(new Date()));
        else if (e === EVENTS_NAME.UPDATE_UMID)
          gsService.setUMID(t.mobile),
            (null == t ? void 0 : t.channel_id) &&
              (gsService.setUMIDIdentificationSource(
                null == t ? void 0 : t.channel_id,
              ),
              gsService.setUMIDIdentificationTime(new Date()));
        else if (e === EVENTS_NAME.UPDATE_USER_PROFILE) {
          let e = gsService.getUP();
          e && (e = JSON.parse(e)), (e = { ...e, ...t }), gsService.setUP(e);
        }
        return !0;
      }
      gsService.setTrackInfo({ [o]: c });
    }
    return i;
  }
  async function triggerExpireEvent(e = EVENT_TTL) {
    var t;
    let r = gsService.getTrackInfo();
    if (r && Object.keys(r).length) {
      let n = [],
        i = Object.keys(r).at(0),
        o = r[i];
      if (
        (o &&
          (null == o ? void 0 : o.eventsDetails) &&
          Object.keys(null == o ? void 0 : o.eventsDetails).forEach((t) => {
            differenceBetweenTwoTimestampsInSeconds(
              null == o ? void 0 : o.eventsDetails[t].updatedAt,
              getCurrentTimeStamp(),
            ) >= e && (n[t] = null == o ? void 0 : o.eventsDetails[t]);
          }),
        n && Object.keys(n).length)
      ) {
        if (
          (Object.keys(n).forEach((e) => {
            null == o || delete o.eventsDetails[e];
          }),
          (null == o ? void 0 : o.eventsDetails) &&
          (null == (t = Object.keys(null == o ? void 0 : o.eventsDetails))
            ? void 0
            : t.length)
            ? gsService.setTrackInfo({ [i]: o })
            : gsService.removeTrackInfo(i),
          !gsService.getUFID())
        ) {
          const e = await getFingerprintObjectFromFingerprintJs();
          gsService.setUFID(e.visitorId);
        }
        if (!gsService.getUTID()) {
          const e = await getUTIDHash();
          gsService.setUTID(e);
        }
        gsService.getUDID(),
          (n = validateEventListAndRemoveUnwantedEvents(n)),
          Object.keys(n).forEach((e) => {
            apiBodyDataMapper(e, n[e].payload);
          });
      }
    }
  }
  function notificationService(e, t) {
    switch (e) {
      case NOTIFICATION_EVENT_LIST.OTP_VERIFIED: {
        let { mobile: e, channel_id: r } = t;
        r && (r = r.toString());
        const n = gsService.getUserMobileValue() || md5Exports.md5(e);
        if (n) {
          _triggerEvent(EVENTS_NAME.UPDATE_UMID, { mobile: n, channel_id: r });
          {
            let e = { u_mid: n };
            _triggerEvent(EVENTS_NAME.UPDATE_USER_PROFILE, e), setCookies(e);
          }
          break;
        }
      }
      case NOTIFICATION_EVENT_LIST.USER_IDENTIFIER_STORAGE_REQUEST: {
        !t.phone && t.email;
        let e = {};
        if (t.email) {
          let r = !1;
          if (
            ('string' != typeof t.email && (t.email = String(t.email).trim()),
            t && t.isEmailMD5)
          ) {
            /^[a-f0-9]{32}$/i.test(t.email) && (r = !0);
          } else {
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email) &&
              ((t.email = md5Exports.md5(t.email)), (r = !0));
          }
          r &&
            (_triggerEvent(EVENTS_NAME.UPDATE_UEID, { email: t.email }),
            (e.u_eid = t.email));
        }
        if (
          t.phone &&
          ('string' != typeof t.phone && (t.phone = String(t.phone)), t.phone)
        ) {
          'string' != typeof t.phone && (t.phone = String(t.phone).trim());
          /^[a-f0-9]{32}$/i.test(t.phone),
            _triggerEvent(EVENTS_NAME.UPDATE_UMID, { mobile: t.phone }),
            (e.u_mid = t.phone);
        }
        _triggerEvent(EVENTS_NAME.UPDATE_USER_PROFILE, e), setCookies(e);
        break;
      }
    }
  }
  function validateEventListAndRemoveUnwantedEvents(e) {
    const t = Object.keys(e);
    return (
      (t.includes(EVENTS_NAME.PDP_VIEW) ||
        t.includes(EVENTS_NAME.ORDER_TRACK)) &&
        t.includes(EVENTS_NAME.ON_LOAD) &&
        delete e[EVENTS_NAME.ON_LOAD],
      e
    );
  }
  /*!
   *
   * detectIncognito v1.3.7
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
   **/ var __webpack_require__ = {
      d: (e, t) => {
        for (var r in t)
          __webpack_require__.o(t, r) &&
            !__webpack_require__.o(e, r) &&
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
      },
      o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    },
    __webpack_exports__ = {};
  __webpack_require__.d(__webpack_exports__, {
    A: () => __WEBPACK_DEFAULT_EXPORT__,
    k: () => detectIncognito,
  });
  var __awaiter = function (e, t, r, n) {
      return new (r || (r = Promise))(function (t, i) {
        function o(e) {
          try {
            c(n.next(e));
          } catch (t) {
            i(t);
          }
        }
        function a(e) {
          try {
            c(n.throw(e));
          } catch (t) {
            i(t);
          }
        }
        function c(e) {
          var n;
          e.done
            ? t(e.value)
            : ((n = e.value),
              n instanceof r
                ? n
                : new r(function (e) {
                    e(n);
                  })).then(o, a);
        }
        c((n = n.apply(e, [])).next());
      });
    },
    __generator = function (e, t) {
      var r,
        n,
        i,
        o,
        a = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: [],
        };
      return (
        (o = { next: c(0), throw: c(1), return: c(2) }),
        'function' == typeof Symbol &&
          (o[Symbol.iterator] = function () {
            return this;
          }),
        o
      );
      function c(c) {
        return function (s) {
          return (function (c) {
            if (r) throw new TypeError('Generator is already executing.');
            for (; o && ((o = 0), c[0] && (a = 0)), a; )
              try {
                if (
                  ((r = 1),
                  n &&
                    (i =
                      2 & c[0]
                        ? n.return
                        : c[0]
                          ? n.throw || ((i = n.return) && i.call(n), 0)
                          : n.next) &&
                    !(i = i.call(n, c[1])).done)
                )
                  return i;
                switch (((n = 0), i && (c = [2 & c[0], i.value]), c[0])) {
                  case 0:
                  case 1:
                    i = c;
                    break;
                  case 4:
                    return a.label++, { value: c[1], done: !1 };
                  case 5:
                    a.label++, (n = c[1]), (c = [0]);
                    continue;
                  case 7:
                    (c = a.ops.pop()), a.trys.pop();
                    continue;
                  default:
                    if (
                      !(
                        (i = (i = a.trys).length > 0 && i[i.length - 1]) ||
                        (6 !== c[0] && 2 !== c[0])
                      )
                    ) {
                      a = 0;
                      continue;
                    }
                    if (3 === c[0] && (!i || (c[1] > i[0] && c[1] < i[3]))) {
                      a.label = c[1];
                      break;
                    }
                    if (6 === c[0] && a.label < i[1]) {
                      (a.label = i[1]), (i = c);
                      break;
                    }
                    if (i && a.label < i[2]) {
                      (a.label = i[2]), a.ops.push(c);
                      break;
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue;
                }
                c = t.call(e, a);
              } catch (s) {
                (c = [6, s]), (n = 0);
              } finally {
                r = i = 0;
              }
            if (5 & c[0]) throw c[1];
            return { value: c[0] ? c[1] : void 0, done: !0 };
          })([c, s]);
        };
      }
    };
  function detectIncognito() {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              new Promise(function (resolve, reject) {
                var browserName = 'Unknown';
                function __callback(e) {
                  resolve({ isPrivate: e, browserName: browserName });
                }
                function identifyChromium() {
                  var e = navigator.userAgent;
                  return e.match(/Chrome/)
                    ? void 0 !== navigator.brave
                      ? 'Brave'
                      : e.match(/Edg/)
                        ? 'Edge'
                        : e.match(/OPR/)
                          ? 'Opera'
                          : 'Chrome'
                    : 'Chromium';
                }
                function assertEvalToString(e) {
                  return e === eval.toString().length;
                }
                function feid() {
                  var toFixedEngineID = 0;
                  try {
                    eval('(-1).toFixed(-1);');
                  } catch (e2) {
                    toFixedEngineID = e2.message.length;
                  }
                  return toFixedEngineID;
                }
                function isSafari() {
                  return 44 === feid();
                }
                function isChrome() {
                  return 51 === feid();
                }
                function isFirefox() {
                  return 25 === feid();
                }
                function isMSIE() {
                  return (
                    void 0 !== navigator.msSaveBlob && assertEvalToString(39)
                  );
                }
                function newSafariTest() {
                  var e = String(Math.random());
                  try {
                    window.indexedDB.open(e, 1).onupgradeneeded = function (t) {
                      var r,
                        n,
                        i =
                          null === (r = t.target) || void 0 === r
                            ? void 0
                            : r.result;
                      try {
                        i
                          .createObjectStore('test', { autoIncrement: !0 })
                          .put(new Blob()),
                          __callback(!1);
                      } catch (a) {
                        var o = a;
                        return (
                          a instanceof Error &&
                            (o =
                              null !== (n = a.message) && void 0 !== n ? n : a),
                          'string' != typeof o
                            ? void __callback(!1)
                            : void __callback(
                                o.includes('BlobURLs are not yet supported'),
                              )
                        );
                      } finally {
                        i.close(), window.indexedDB.deleteDatabase(e);
                      }
                    };
                  } catch (t) {
                    __callback(!1);
                  }
                }
                function oldSafariTest() {
                  var e = window.openDatabase,
                    t = window.localStorage;
                  try {
                    e(null, null, null, null);
                  } catch (r) {
                    return void __callback(!0);
                  }
                  try {
                    t.setItem('test', '1'), t.removeItem('test');
                  } catch (r) {
                    return void __callback(!0);
                  }
                  __callback(!1);
                }
                function safariPrivateTest() {
                  void 0 !== navigator.maxTouchPoints
                    ? newSafariTest()
                    : oldSafariTest();
                }
                function getQuotaLimit() {
                  var e = window;
                  return void 0 !== e.performance &&
                    void 0 !== e.performance.memory &&
                    void 0 !== e.performance.memory.jsHeapSizeLimit
                    ? performance.memory.jsHeapSizeLimit
                    : 1073741824;
                }
                function storageQuotaChromePrivateTest() {
                  navigator.webkitTemporaryStorage.queryUsageAndQuota(
                    function (e, t) {
                      __callback(
                        Math.round(t / 1048576) <
                          2 * Math.round(getQuotaLimit() / 1048576),
                      );
                    },
                    function (e) {
                      reject(
                        new Error(
                          'detectIncognito somehow failed to query storage quota: ' +
                            e.message,
                        ),
                      );
                    },
                  );
                }
                function oldChromePrivateTest() {
                  (0, window.webkitRequestFileSystem)(
                    0,
                    1,
                    function () {
                      __callback(!1);
                    },
                    function () {
                      __callback(!0);
                    },
                  );
                }
                function chromePrivateTest() {
                  void 0 !== self.Promise && void 0 !== self.Promise.allSettled
                    ? storageQuotaChromePrivateTest()
                    : oldChromePrivateTest();
                }
                function firefoxPrivateTest() {
                  __callback(void 0 === navigator.serviceWorker);
                }
                function msiePrivateTest() {
                  __callback(void 0 === window.indexedDB);
                }
                function main() {
                  isSafari()
                    ? ((browserName = 'Safari'), safariPrivateTest())
                    : isChrome()
                      ? ((browserName = identifyChromium()),
                        chromePrivateTest())
                      : isFirefox()
                        ? ((browserName = 'Firefox'), firefoxPrivateTest())
                        : isMSIE()
                          ? ((browserName = 'Internet Explorer'),
                            msiePrivateTest())
                          : reject(
                              new Error(
                                'detectIncognito cannot determine the browser',
                              ),
                            );
                }
                main();
              }),
            ];
          case 1:
            return [2, _a.sent()];
        }
      });
    });
  }
  'undefined' != typeof window && (window.detectIncognito = detectIncognito);
  const __WEBPACK_DEFAULT_EXPORT__ = detectIncognito;
  var __webpack_exports__detectIncognito = __webpack_exports__.k;
  const API_TIMEOUT = 1e4,
    CACHE_EXPIRY = 3e5;
  let cachedProductData = null,
    lastCacheTime = 0;
  function getShopDomain() {
    return window.location.hostname;
  }
  function isCacheValid() {
    return cachedProductData && Date.now() - lastCacheTime < CACHE_EXPIRY;
  }
  function processProductData(e) {
    const t = e.variants[0];
    return {
      product_id: e.id.toString(),
      name: e.title,
      handle: e.handle,
      vendor: e.vendor,
      product_type: e.product_type,
      tags: e.tags || [],
      description: e.body_html,
      variant_id: t.id.toString(),
      variant_title: t.title,
      variant_sku: t.sku,
      variant_barcode: t.barcode,
      mrp: t.compare_at_price || t.price,
      selling_price: t.price,
      currency: 'USD',
      available: t.available,
      inventory_quantity: t.inventory_quantity,
      images: e.images || [],
      featured_image: e.featured_image,
      variants: e.variants,
      seo_title: e.seo_title,
      seo_description: e.seo_description,
      created_at: e.created_at,
      updated_at: e.updated_at,
      published_at: e.published_at,
      raw_data: e,
    };
  }
  async function fetchProductFromAPI(e, t = !1) {
    try {
      if (!e) throw new Error('Product handle is required');
      if (!t && isCacheValid()) return cachedProductData;
      const r = `https://${getShopDomain()}/products/${e}.json`,
        n = new AbortController(),
        i = setTimeout(() => n.abort(), API_TIMEOUT),
        o = await fetch(r, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: n.signal,
        });
      if ((clearTimeout(i), !o.ok))
        throw new Error(`HTTP error! status: ${o.status}`);
      const a = (await o.json()).product;
      if (!a) throw new Error('No product data found in response');
      const c = processProductData(a);
      return (cachedProductData = c), (lastCacheTime = Date.now()), c;
    } catch (r) {
      return null;
    }
  }
  function extractProductHandleFromGivenURL(e) {
    try {
      const t = new URL(e),
        r = t.pathname.match(/\/products\/([^\/\?]+)/);
      return r ? r[1] : null;
    } catch (t) {
      return null;
    }
  }
  async function getProductFromURL(e, t = !1) {
    try {
      if (!e) throw new Error('URL is required');
      const r = extractProductHandleFromGivenURL(e);
      if (!r) throw new Error('Could not extract product handle from URL');
      const n = await fetchProductFromAPI(r, t);
      if (!n) throw new Error('Failed to fetch product data');
      return {
        cart_id: String(n.product_id),
        name: String(n.name),
        mrp: String(n.mrp || n.selling_price),
        selling_price: String(n.selling_price),
        variant_id: String(n.variant_id),
        qty: String(1),
        category: String(n.product_type || ''),
        product_id: String(n.product_id),
        referrer: String(e),
        image: String(
          n.featured_image || (n.image && n.image.src)
            ? n.image.src
            : n.images && n.images[0]
              ? n.images[0].src
              : '',
        ),
        description: String(n.description),
      };
    } catch (r) {
      return null;
    }
  }
  function isCurrentPageProductPage() {
    try {
      const e = window.location.pathname;
      return null !== e.match(/^\/products\/[^\/]+$/);
    } catch (e) {
      return !1;
    }
  }
  async function getProductFromCurrentPage(e = !1) {
    try {
      if (!isCurrentPageProductPage()) return null;
      const t = window.location.href;
      return await getProductFromURL(t, e);
    } catch (t) {
      return null;
    }
  }
  async function autoDetectAndFetchProduct(e = !1) {
    const t = await getProductFromCurrentPage(e);
    if (t) {
      const e = {
        cart_id: String(t.product_id),
        name: String(t.name),
        mrp: String(t.mrp || t.selling_price),
        selling_price: String(t.selling_price),
        variant_id: String(t.variant_id),
        qty: String(1),
        category: String(t.product_type || ''),
        product_id: String(t.product_id),
        referrer: String(t.referrer),
        image: String(t.image),
        description: String(t.description),
        event_source: String(CONSTANTS.UNIVERSAL_COOKIES),
      };
      _triggerEvent(EVENTS_NAME.PDP_VIEW, e);
    }
  }
  const CART_SELECTORS = {
    ADD_TO_CART_FORM: 'form[action="/cart/add"], form[action*="/cart/add"]',
    ADD_TO_CART_BUTTON:
      'button[type="submit"], input[type="submit"], button[name="add"], input[name="add"]',
    PRODUCT_ID_INPUT:
      'input[name="id"], input[name="product-id"], input[name="variant_id"], input[name="variantId"]',
    QUANTITY_INPUT:
      'input[name="quantity"], input[name="qty"], select[name="quantity"], select[name="qty"]',
    PRODUCT_FORM:
      '.product-form, .product-single__form, .product__form, form.shopify-product-form',
  };
  let isAjaxMonitoringActive = !1,
    mutationObserver = null;
  const eventHistory = new Map();
  let lastEventTime = 0;
  const GLOBAL_BLOCK_MS = 2e3;
  let isEventInProgress = !1,
    lastButtonClickTime = 0;
  const BUTTON_TO_AJAX_SUPPRESS_MS = 1e3,
    extractProductDataFromForm = (e) => {
      var t, r, n;
      try {
        const o = {
            id: null,
            quantity: 1,
            properties: {},
            variant_id: null,
            product_id: null,
          },
          a = [
            e.querySelector('input[name="id"]'),
            e.querySelector('input[name="product-id"]'),
            e.querySelector('input[name="variant_id"]'),
            e.querySelector('input[name="variantId"]'),
            e.querySelector('select[name="id"]'),
          ].filter(Boolean);
        a.length > 0 && ((o.id = a[0].value), (o.variant_id = a[0].value));
        const c = [
          e.querySelector('input[name="quantity"]'),
          e.querySelector('input[name="qty"]'),
          e.querySelector('select[name="quantity"]'),
          e.querySelector('select[name="qty"]'),
        ].filter(Boolean);
        c.length > 0 && (o.quantity = parseInt(c[0].value) || 1);
        e.querySelectorAll(
          'input[name^="properties"], select[name^="properties"], textarea[name^="properties"]',
        ).forEach((e) => {
          const t = e.name.replace('properties[', '').replace(']', '');
          t && e.value && (o.properties[t] = e.value);
        });
        const s = e.dataset.product || e.dataset.productData;
        if (s)
          try {
            const e = JSON.parse(s);
            Object.assign(o, e);
          } catch (i) {}
        if (
          null == (r = null == (t = window.ShopifyAnalytics) ? void 0 : t.meta)
            ? void 0
            : r.product
        ) {
          const e = window.ShopifyAnalytics.meta.product;
          (o.product_id = e.id),
            (o.title = e.title),
            (o.vendor = e.vendor),
            (o.type = e.type),
            (o.sku = e.sku),
            e.price && (o.price = parseFloat(e.price) / 100),
            o.mrp ||
              (e.compare_at_price && e.compare_at_price > 0
                ? ((o.mrp = parseFloat(e.compare_at_price) / 100),
                  (o.compare_at_price = o.mrp))
                : e.compare_at_price_max && e.compare_at_price_max > 0
                  ? ((o.mrp = parseFloat(e.compare_at_price_max) / 100),
                    (o.compare_at_price = o.mrp))
                  : e.price_max && e.price_max > e.price
                    ? (o.mrp = parseFloat(e.price_max) / 100)
                    : e.compare_price &&
                      e.compare_price > 0 &&
                      ((o.mrp = parseFloat(e.compare_price) / 100),
                      (o.compare_at_price = o.mrp))),
            e.featured_image &&
              ((o.image = e.featured_image),
              (o.featured_image = e.featured_image));
        }
        if (
          window.product &&
          ((o.product_id = window.product.id),
          (o.title = window.product.title),
          (o.vendor = window.product.vendor),
          (o.type = window.product.product_type),
          !o.price &&
            window.product.price &&
            (o.price = parseFloat(window.product.price) / 100),
          o.mrp ||
            (window.product.compare_at_price &&
            window.product.compare_at_price > 0
              ? ((o.mrp = parseFloat(window.product.compare_at_price) / 100),
                (o.compare_at_price = o.mrp))
              : window.product.compare_at_price_max &&
                  window.product.compare_at_price_max > 0
                ? ((o.mrp =
                    parseFloat(window.product.compare_at_price_max) / 100),
                  (o.compare_at_price = o.mrp))
                : window.product.price_max &&
                    window.product.price_max > window.product.price
                  ? (o.mrp = parseFloat(window.product.price_max) / 100)
                  : window.product.compare_price &&
                    window.product.compare_price > 0 &&
                    ((o.mrp = parseFloat(window.product.compare_price) / 100),
                    (o.compare_at_price = o.mrp))),
          !o.image &&
            window.product.featured_image &&
            ((o.image = window.product.featured_image),
            (o.featured_image = window.product.featured_image)),
          !o.images &&
            (null == (n = window.product.images) ? void 0 : n.length) > 0 &&
            ((o.images = window.product.images),
            o.image || (o.image = window.product.images[0])),
          o.id && window.product.variants)
        ) {
          const e = window.product.variants.find(
            (e) => e.id.toString() === o.id.toString(),
          );
          e &&
            (e.price && (o.price = parseFloat(e.price) / 100),
            e.compare_at_price && e.compare_at_price > 0
              ? ((o.mrp = parseFloat(e.compare_at_price) / 100),
                (o.compare_at_price = o.mrp))
              : e.compare_price && e.compare_price > 0
                ? ((o.mrp = parseFloat(e.compare_price) / 100),
                  (o.compare_at_price = o.mrp))
                : e.original_price &&
                  e.original_price > e.price &&
                  (o.mrp = parseFloat(e.original_price) / 100),
            (o.sku = e.sku),
            (o.title = e.title || window.product.title),
            (o.variant_title = e.title),
            (o.weight = e.weight),
            (o.grams = e.grams),
            e.featured_image &&
              ((o.image = e.featured_image.src || e.featured_image),
              (o.variant_image = o.image)));
        }
        if (!o.product_id) {
          const e = document.querySelector('meta[property="product:id"]');
          e && (o.product_id = e.content);
        }
        return extractMrpFromAllSources(o), o;
      } catch (o) {
        return { id: null, quantity: 1, properties: {} };
      }
    },
    generateCartId = () =>
      `CART_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`.toUpperCase(),
    getCartId = () => {
      let e = sessionStorage.getItem('shopify_cart_id');
      return (
        e ||
          ((e = generateCartId()),
          sessionStorage.setItem('shopify_cart_id', e)),
        e
      );
    },
    shouldFireEvent = (e, t) => {
      const r = Date.now();
      return (
        !(
          'ajax' === t && r - lastButtonClickTime < BUTTON_TO_AJAX_SUPPRESS_MS
        ) &&
        !isEventInProgress &&
        !(r - lastEventTime < GLOBAL_BLOCK_MS) &&
        ('button_click' === t && (lastButtonClickTime = r),
        (isEventInProgress = !0),
        (lastEventTime = r),
        setTimeout(() => {
          isEventInProgress = !1;
        }, GLOBAL_BLOCK_MS),
        !0)
      );
    },
    fireAddToCartEvent = (e, t) => {
      try {
        if (!e.id) return;
        if (!shouldFireEvent(e, t)) return;
        getProductFromURL(window.location.href)
          .then((t) => {
            t && (e = t);
            const r = {
              cart_id: String(e.cart_id),
              name: String(e.name),
              mrp: String(e.mrp),
              selling_price: String(e.selling_price),
              variant_id: String(e.variant_id),
              qty: String(e.qty),
              category: String(e.category),
              product_id: String(e.product_id),
              referrer: String(e.referrer),
              image: String(e.image),
              description: String(e.description),
              event_source: String(CONSTANTS.UNIVERSAL_COOKIES),
            };
            _triggerEvent(EVENTS_NAME.ATC, r);
          })
          .catch(() => {
            const r = createGuaranteedEventData(e, t),
              n = {
                cart_id: String(r.cart_id),
                name: String(r.name),
                mrp: String(r.mrp),
                selling_price: String(r.selling_price),
                variant_id: String(r.variant_id),
                qty: String(r.qty),
                category: String(r.category),
                product_id: String(r.product_id),
                referrer: String(r.referrer),
                image: String(r.image),
                description: String(r.description),
                event_source: String(CONSTANTS.UNIVERSAL_COOKIES),
              };
            _triggerEvent(EVENTS_NAME.ATC, n);
          });
      } catch (r) {}
    },
    createGuaranteedEventData = (e, t) => {
      const r = extractPriceFromAllSources(e),
        n = extractMrpFromProductData(e),
        i = extractProductNameFromAllSources(e);
      return {
        cart_id: getCartId(),
        name: i,
        mrp: (n || r || 0).toString(),
        selling_price: (r || n || 0).toString(),
        price: r,
        variant_id: e.id || e.variant_id || 'unknown_variant',
        qty: (e.quantity || 1).toString(),
        category:
          e.type || e.product_type || extractCategoryFromPage() || 'general',
        product_id: e.product_id || e.id || 'unknown_product',
        referrer: document.referrer || window.location.origin,
        source_channel: CONSTANTS.SHOPIFY,
        method: t,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        ...(e.sku && { sku: e.sku }),
        ...(e.vendor && { vendor: e.vendor }),
        ...(e.image && { image: e.image }),
        ...(e.images && { images: e.images }),
        ...(e.weight && { weight: e.weight }),
        ...(e.grams && { grams: e.grams }),
        ...(e.properties &&
          Object.keys(e.properties).length > 0 && { properties: e.properties }),
      };
    },
    extractProductNameFromAllSources = (e) => {
      if (e.title && e.title.trim()) return e.title.trim();
      if (e.variant_title && e.variant_title.trim())
        return e.variant_title.trim();
      const t = [
        'h1.product-title',
        'h1.product__title',
        'h1.product-single__title',
        '.product-title h1',
        '.product__title h1',
        '.product-single__title h1',
        '[data-product-title]',
        '.product-meta__title',
        '.product__name',
        '.product-name',
        'h1[data-product-title]',
        'meta[property="og:title"]',
        'meta[name="title"]',
        'title',
      ];
      for (const r of t) {
        const e = document.querySelector(r);
        if (e) {
          let t = '';
          if (
            ((t = r.startsWith('meta')
              ? e.getAttribute('content') || ''
              : e.textContent || e.innerText || ''),
            (t = t.trim()),
            t && t !== document.title)
          )
            return t;
        }
      }
      return document.title && !document.title.toLowerCase().includes('cart')
        ? document.title.trim()
        : 'Product';
    },
    extractPriceFromAllSources = (e) => {
      var t, r, n, i, o, a, c, s;
      if (e.price && e.price > 0) return e.price;
      if (
        null ==
        (i =
          null ==
          (n =
            null ==
            (r = null == (t = window.ShopifyAnalytics) ? void 0 : t.meta)
              ? void 0
              : r.product)
            ? void 0
            : n.variants[0])
          ? void 0
          : i.price
      )
        return (
          parseFloat(window.ShopifyAnalytics.meta.product.variants[0].price) /
          100
        );
      const u = document.querySelectorAll(
        '[name="price"], [data-price], .price, .product-price',
      );
      for (const d of u) {
        const e = d.value || d.getAttribute('data-price') || d.textContent;
        if (e) {
          const t = parseFloat(e.replace(/[^0-9.]/g, ''));
          if (t > 0) return t;
        }
      }
      if (
        null ==
        (c =
          null == (a = null == (o = window.ShopifyAnalytics) ? void 0 : o.meta)
            ? void 0
            : a.product)
          ? void 0
          : c.price
      )
        return parseFloat(window.ShopifyAnalytics.meta.product.price) / 100;
      if (null == (s = window.product) ? void 0 : s.price)
        return parseFloat(window.product.price) / 100;
      const l = document.querySelectorAll(
        '.price, .current-price, .sale-price, [data-price]',
      );
      for (const d of l) {
        const e = d.textContent || d.getAttribute('data-price');
        if (e) {
          const t = e.match(/[\d,]+\.?\d*/);
          if (t) {
            const e = parseFloat(t[0].replace(',', ''));
            if (e > 0) return e;
          }
        }
      }
      return null;
    },
    extractMrpFromProductData = (e) => {
      var t, r, n, i;
      return e.mrp && e.mrp > 0
        ? e.mrp
        : e.compare_at_price && e.compare_at_price > 0
          ? e.compare_at_price
          : (
                null ==
                (n =
                  null ==
                  (r = null == (t = window.ShopifyAnalytics) ? void 0 : t.meta)
                    ? void 0
                    : r.product)
                  ? void 0
                  : n.compare_at_price
              )
            ? parseFloat(
                window.ShopifyAnalytics.meta.product.compare_at_price,
              ) / 100
            : (null == (i = window.product) ? void 0 : i.compare_at_price)
              ? parseFloat(window.product.compare_at_price) / 100
              : null;
    },
    extractCategoryFromPage = () => {
      try {
        const e = document.querySelectorAll(
          '.breadcrumb a, .breadcrumbs a, nav[aria-label="breadcrumb"] a',
        );
        if (e.length > 1) {
          const t = e[e.length - 2];
          if (t) return t.textContent.trim().toLowerCase();
        }
        const t = document.querySelector(
          'meta[property="product:category"], meta[name="category"], meta[property="og:section"]',
        );
        if (t) return t.getAttribute('content').toLowerCase();
        const r = window.location.pathname.split('/').filter(Boolean);
        if (r.length > 1) {
          const e = r.filter(
            (e) =>
              ![
                'products',
                'collections',
                'pages',
                'apps',
                'cart',
                'checkout',
                'account',
              ].includes(e),
          );
          if (e.length > 0) return e[0].replace(/-/g, ' ').toLowerCase();
        }
        return window.collection && window.collection.handle
          ? window.collection.handle.replace(/-/g, ' ').toLowerCase()
          : null;
      } catch (e) {
        return null;
      }
    },
    extractMrpFromAllSources = (e) => {
      if (!e.mrp)
        try {
          const r = [
            'product',
            'productData',
            'shopifyProduct',
            'currentProduct',
          ];
          for (const t of r) {
            const r = window[t];
            if (r && 'object' == typeof r) {
              if (r.compare_at_price && r.compare_at_price > 0)
                return (
                  (e.mrp = parseFloat(r.compare_at_price) / 100),
                  void (e.compare_at_price = e.mrp)
                );
              if (r.compareAtPrice && r.compareAtPrice > 0)
                return (
                  (e.mrp = parseFloat(r.compareAtPrice) / 100),
                  void (e.compare_at_price = e.mrp)
                );
            }
          }
          const n = document.querySelectorAll(
            'form[action*="cart"], form[data-product], .product-form',
          );
          for (const s of n) {
            const r =
              s.getAttribute('data-product') ||
              s.getAttribute('data-product-data') ||
              s.getAttribute('data-compare-price') ||
              s.getAttribute('data-mrp');
            if (r)
              try {
                if (r.startsWith('{')) {
                  const t = JSON.parse(r);
                  if (t.compare_at_price && t.compare_at_price > 0)
                    return (
                      (e.mrp = parseFloat(t.compare_at_price) / 100),
                      void (e.compare_at_price = e.mrp)
                    );
                } else {
                  const t = parseFloat(r);
                  if (t > 0 && (!e.price || t > e.price))
                    return (e.mrp = t), void (e.compare_at_price = t);
                }
              } catch (t) {}
          }
          const i = document.querySelectorAll(
            '[data-compare-price], [data-compare-at-price], [data-original-price], [data-mrp], [data-list-price], [data-was-price]',
          );
          for (const t of i) {
            const r = [
              'data-compare-price',
              'data-compare-at-price',
              'data-original-price',
              'data-mrp',
              'data-list-price',
              'data-was-price',
            ];
            for (const n of r) {
              const r = t.getAttribute(n);
              if (r) {
                const t = parseFloat(r);
                if (t > 0 && (!e.price || t > e.price))
                  return (e.mrp = t), void (e.compare_at_price = t);
              }
            }
          }
          const o = [
            '[data-compare-price]',
            '[data-compare-at-price]',
            '[data-original-price]',
            '[data-was-price]',
            '[data-mrp]',
            '[data-list-price]',
            '.compare-price',
            '.compare-at-price',
            '.original-price',
            '.was-price',
            '.mrp-price',
            '.list-price',
            '.regular-price',
            '.before-price',
            '.crossed-price',
            '.strike-price',
            '.old-price',
          ];
          for (const t of o) {
            const r = document.querySelector(t);
            if (r) {
              const t =
                r.getAttribute('data-compare-price') ||
                r.getAttribute('data-compare-at-price') ||
                r.getAttribute('data-original-price') ||
                r.getAttribute('data-was-price') ||
                r.getAttribute('data-mrp') ||
                r.getAttribute('data-list-price') ||
                r.textContent;
              if (t) {
                const r = t.match(/[\d,]+\.?\d*/);
                if (r) {
                  const t = parseFloat(r[0].replace(',', ''));
                  if (!e.price || t > e.price)
                    return (e.mrp = t), void (e.compare_at_price = t);
                }
              }
            }
          }
          const a = document.querySelectorAll(
            '.compare-price, .was-price, .original-price, .mrp, .list-price, .regular-price, .before-price',
          );
          for (const t of a) {
            const r = t.textContent || t.innerText;
            if (r) {
              const t = r.match(/[$€£¥₹]?[\d,]+\.?\d*/g);
              if ((null == t ? void 0 : t.length) > 0)
                for (const r of t) {
                  const t = r.replace(/[$€£¥₹,]/g, ''),
                    n = parseFloat(t);
                  if (n > 0 && (!e.price || n > e.price))
                    return (e.mrp = n), void (e.compare_at_price = n);
                }
            }
          }
          const c = document.querySelectorAll(
            '[style*="line-through"], [style*="text-decoration"], .strike, .crossed, s, del',
          );
          for (const t of c) {
            const r = t.textContent || t.innerText;
            if (r) {
              const t = r.match(/[\d,]+\.?\d*/);
              if (t) {
                const r = parseFloat(t[0].replace(',', ''));
                if (r > 0 && (!e.price || r > e.price))
                  return (e.mrp = r), void (e.compare_at_price = r);
              }
            }
          }
        } catch (r) {}
    },
    handleAddToCartSubmit = (e) => {
      try {
        const t = e.target,
          r = t.getAttribute('action');
        if (!r || (!r.includes('/cart/add') && !r.includes('cart/add'))) return;
        const n = extractProductDataFromForm(t);
        fireAddToCartEvent(n, 'form_submit');
      } catch (t) {}
    },
    initializeDynamicContentObserver = () => {
      mutationObserver ||
        ((mutationObserver = new MutationObserver((e) => {
          e.forEach((e) => {
            e.addedNodes.forEach((e) => {
              if (e.nodeType === Node.ELEMENT_NODE) {
                (e.querySelectorAll
                  ? e.querySelectorAll(CART_SELECTORS.ADD_TO_CART_FORM)
                  : []
                ).forEach(attachFormListener),
                  e.matches &&
                    e.matches(CART_SELECTORS.ADD_TO_CART_FORM) &&
                    attachFormListener(e);
              }
            });
          });
        })),
        mutationObserver.observe(document.body, {
          childList: !0,
          subtree: !0,
        }));
    },
    attachFormListener = (e) => {
      e.hasAttribute('data-uc-atc-tracked') ||
        (e.setAttribute('data-uc-atc-tracked', 'true'),
        e.addEventListener('submit', handleAddToCartSubmit));
    },
    initializeShopifyCartTracking = () => {
      try {
        document
          .querySelectorAll(CART_SELECTORS.ADD_TO_CART_FORM)
          .forEach(attachFormListener);
        return (
          document
            .querySelectorAll(CART_SELECTORS.PRODUCT_FORM)
            .forEach((e) => {
              e.querySelectorAll(CART_SELECTORS.ADD_TO_CART_BUTTON).length >
                0 && attachFormListener(e);
            }),
          initializeDynamicContentObserver(),
          initializeCustomButtonTracking(),
          cleanupShopifyCartEvents
        );
      } catch (e) {
        return () => {};
      }
    },
    initializeCustomButtonTracking = () => {
      document.addEventListener('click', (e) => {
        const t = e.target;
        if (isAddToCartButton(t)) {
          const e = t.closest('form');
          if (e) {
            const t = extractProductDataFromForm(e);
            fireAddToCartEvent(t, 'button_click');
          }
        }
      });
    },
    isAddToCartButton = (e) =>
      !!e.matches &&
      (e.matches('[data-add-to-cart]') ||
        e.matches('.add-to-cart') ||
        e.matches('.btn-addtocart') ||
        e.matches('.product-add-to-cart') ||
        e.matches('.shopify-add-to-cart') ||
        e.matches('[onclick*="add"]') ||
        e.matches('[onclick*="cart"]') ||
        (e.textContent &&
          (e.textContent.toLowerCase().includes('add to cart') ||
            e.textContent.toLowerCase().includes('add to bag') ||
            e.textContent.toLowerCase().includes('buy now')))),
    cleanupShopifyCartEvents = () => {
      try {
        document.querySelectorAll('[data-uc-atc-tracked]').forEach((e) => {
          e.removeEventListener('submit', handleAddToCartSubmit),
            e.removeAttribute('data-uc-atc-tracked');
        }),
          mutationObserver &&
            (mutationObserver.disconnect(), (mutationObserver = null)),
          (isAjaxMonitoringActive = !1),
          eventHistory.clear(),
          (lastEventTime = 0),
          (isEventInProgress = !1),
          (lastButtonClickTime = 0);
      } catch (e) {}
    },
    SELECTORS = {
      LOGIN_FORM: 'form[action="/account/login"]',
      REGISTER_FORM: 'form[action="/account"]',
      FIRST_NAME_INPUT: 'input[name="customer[first_name]"]',
      LAST_NAME_INPUT: 'input[name="customer[last_name]"]',
      EMAIL_INPUT: 'input[name="customer[email]"]',
    },
    handleLoginSubmit = (e) => {
      var t;
      const r =
        null == (t = e.target.querySelector(SELECTORS.EMAIL_INPUT))
          ? void 0
          : t.value;
      r &&
        _triggerEvent(EVENTS_NAME.LOGIN, {
          email: r,
          source_channel: CONSTANTS.SHOPIFY,
          name: '',
          mobile: '',
        });
    },
    handleRegisterSubmit = (e) => {
      var t, r, n;
      const i =
          null == (t = e.target.querySelector(SELECTORS.EMAIL_INPUT))
            ? void 0
            : t.value,
        o =
          null == (r = e.target.querySelector(SELECTORS.FIRST_NAME_INPUT))
            ? void 0
            : r.value,
        a =
          null == (n = e.target.querySelector(SELECTORS.LAST_NAME_INPUT))
            ? void 0
            : n.value;
      i &&
        _triggerEvent(EVENTS_NAME.REGISTER, {
          email: i,
          source_channel: CONSTANTS.SHOPIFY,
          name: `${o} ${a}`,
          mobile: '',
        });
    },
    loginForm = document.querySelector(SELECTORS.LOGIN_FORM),
    registerForm = document.querySelector(SELECTORS.REGISTER_FORM),
    mapShopifyRegisterAndLoginEvent = () => (
      loginForm && loginForm.addEventListener('submit', handleLoginSubmit),
      registerForm &&
        registerForm.addEventListener('submit', handleRegisterSubmit),
      cleanupShopifyEvents
    ),
    cleanupShopifyEvents = () => {
      const e = document.querySelector(SELECTORS.LOGIN_FORM);
      e && e.removeEventListener('submit', handleLoginSubmit),
        registerForm &&
          registerForm.removeEventListener('submit', handleRegisterSubmit),
        cleanupShopifyCartEvents();
    },
    initializeShopifyIntegration = async () => {
      let e = isShopifyStore();
      const t = gsService.getUMID(),
        r = gsService.getUEID();
      if (e) {
        mapShopifyRegisterAndLoginEvent(),
          initializeShopifyCartTracking(),
          autoDetectAndFetchProduct();
        const e = getShopifyCustomerId(),
          n = gsService.getSrCompanyId(),
          i = gsService.getShopifyLastCustomerInfoFetch();
        if (new Date().getTime() - i < CUSTOMER_INFO_FETCH_INTERVAL) return;
        if (e && n && (!t || !r)) {
          const t = await getShopifyCustomerInfo(getShopifyStoreUrl(), e, n);
          return (
            window.SHIPROCKET_ANALYTICS.ucObj ||
              (window.SHIPROCKET_ANALYTICS.ucObj = {}),
            window.SHIPROCKET_ANALYTICS.ucObj.shopifyCustomerId ||
              (window.SHIPROCKET_ANALYTICS.ucObj.shopifyCustomerId = e),
            gsService.setShopifyLastCustomerInfoFetch(new Date().getTime()),
            t.data &&
              notificationService(
                NOTIFICATION_EVENT_LIST.USER_IDENTIFIER_STORAGE_REQUEST,
                t.data,
              ),
            t.data
          );
        }
      }
      return !0;
    },
    getUMIDByLearnerId = async (e, t) => {
      var r, n;
      let i = `https://tracker.wigzopush.com/engage-wigzo/v1/cookie-to-phone/${e}/${t}`;
      const o = await fetch(i, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        }),
        a = await o.json();
      return (null == (r = null == a ? void 0 : a.data) ? void 0 : r.phone_md5)
        ? null == (n = null == a ? void 0 : a.data)
          ? void 0
          : n.phone_md5
        : null;
    },
    setupWigzo = async (e, t) => {
      e &&
        t &&
        setTimeout(async () => {
          if (gsService.getWigzoLearnerId() === e) return;
          if (gsService.getUMID()) return;
          const r = new Date().getTime(),
            n = gsService.getWigzoUmidFetchedTime();
          if (n) {
            if (r - n < 3e5) return;
          }
          gsService.setWigzoUmidFetchedTime(r);
          const i = await getUMIDByLearnerId(e, t);
          i && (gsService.setUMID(i), gsService.setWigzoLearnerId(e));
        }, 1e3);
    };
  let UDID = '',
    UWID = '',
    intervalId = '';
  async function onLoad() {
    var e, t, r, n;
    registerChannelId(),
      registerSrCompanyId(),
      window.ua &&
      (null ==
      (t = null == (e = null == window ? void 0 : window.ua) ? void 0 : e.ucObj)
        ? void 0
        : t.isUcScriptLoaded)
        ? (
            null ==
            (n =
              null == (r = null == window ? void 0 : window.ua)
                ? void 0
                : r.ucObj)
              ? void 0
              : n.scriptLoadedRetries
          )
          ? window.ua.ucObj.scriptLoadedRetries++
          : (window.ua.ucObj.scriptLoadedRetries = 1)
        : (window.ua.ucObj.isUcScriptLoaded = !0),
      gsService.getUFID(),
      (UWID = gsService.getUWID()),
      (UDID = gsService.getUDID()),
      gsService.getUTID(),
      UWID || ((UWID = getRandomUUID()), gsService.setUWID(UWID)),
      __webpack_exports__detectIncognito().then((e) => {
        gsService.setPrivateMode(e.isPrivate);
      }),
      _triggerEvent(EVENTS_NAME.ON_LOAD, {}),
      (intervalId = setInterval(() => {
        triggerExpireEvent(0);
      }, 1e3 * EVENT_AUTO_TRIGGER_TTL)),
      await createIframe(),
      UDID || getUDIDFromIframe(),
      getUFIDFromIframe(),
      getUTIDFromIframe(),
      getTemporaryUFIDFromIframe(),
      getThirdPartyCookieStatusFromIframe();
    const i = gsService.getUserMobileValue();
    let o = gsService.getUP();
    o && (o = JSON.parse(o));
    const a = o && o.u_mid ? o.u_mid : null;
    if (i || a) {
      const e = i || a;
      setCookies({ u_mid: e }),
        _triggerEvent(EVENTS_NAME.UPDATE_UMID, { mobile: e });
    }
    if (i && ((a && a !== i) || !a)) {
      let e = { u_mid: i };
      setCookies(e), _triggerEvent(EVENTS_NAME.UPDATE_USER_PROFILE, e);
    } else (window.gettingCookiesFromIframe = !0), getCookie();
    if (!gsService.getUEID()) {
      let e = gsService.getUP();
      e = JSON.parse(e);
      const t = gsService.getUserEmailValue();
      if (e && e.u_eid) {
        _triggerEvent(EVENTS_NAME.UPDATE_UEID, { email: e.u_eid }),
          setCookies({ u_eid: e.u_eid });
      } else if (t) {
        _triggerEvent(EVENTS_NAME.UPDATE_UEID, { email: t }),
          setCookies({ u_eid: t }),
          _triggerEvent(EVENTS_NAME.UPDATE_USER_PROFILE, { u_eid: t });
      } else window.gettingCookiesFromIframe || getCookie();
    }
    UDID && sendUDIDToIframe(UDID),
      gsService.getOldUserProfile() && gsService.removeOldUserProfile(),
      await initializeShopifyIntegration();
  }
  function registerChannelId() {
    const e = getURLParam('channel_id');
    e && gsService.setChannel(e);
  }
  function registerSrCompanyId(e) {
    e || (e = getURLParam(CONSTANTS.SR_COMPANY_ID)),
      e && gsService.setSrCompanyId(e);
  }
  window.addEventListener('beforeunload', async function (e) {
    await triggerExpireEvent(0),
      clearInterval(intervalId),
      window.removeEventListener('load', () => {});
  }),
    null ==
      (_a2 = null == document ? void 0 : document.getElementById('addPost')) ||
      _a2.addEventListener('click', function () {
        _triggerEvent(EVENTS_NAME.ON_LOAD, {});
      }),
    window.addEventListener('message', function (e) {
      handleMessageEvent(e);
    }),
    (window.SHIPROCKET_ANALYTICS = {
      event: _triggerEvent,
      register: gsService.setChannel,
      showRegisterChannels: gsService.getChannels,
      initialize: onLoad,
      notify: notificationService,
      profile: getUserInfo,
      profileCallback: getUserInfoWithCallback,
      registerSrCompanyId: registerSrCompanyId,
      ucObj: {
        isUcScriptLoaded: !!(null ==
        (_c =
          null == (_b = null == window ? void 0 : window.ua)
            ? void 0
            : _b.ucObj)
          ? void 0
          : _c.isUcScriptLoaded),
      },
      setupWigzo: setupWigzo,
    });
  const ua = window.SHIPROCKET_ANALYTICS;
  (window.ua = ua),
    'loading' === document.readyState
      ? document.addEventListener('DOMContentLoaded', onLoad)
      : onLoad();
})();
