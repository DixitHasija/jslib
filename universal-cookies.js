<script type="module" crossorigin>(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
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
  THIRD_PARTY_COOKIE_BLOCKED: "third_party_cookie_block",
  TEMPORARY_COOKIE: "temporary_cookie"
};
const DOMAIN = "sr-cdn.shiprocket.in";
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
function getRandomUUID() {
  var _a;
  if (self && (self == null ? void 0 : self.crypto) && ((_a = self == null ? void 0 : self.crypto) == null ? void 0 : _a.randomUUID)) ;
  else {
    self.crypto.randomUUID = function() {
      const crypto = self.crypto || self.msCrypto;
      if (!crypto || !crypto.getRandomValues) {
        throw new Error(
          "crypto.getRandomValues() not supported by this browser"
        );
      }
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
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
function setCookie(name, value, days = 365) {
  let expires = "";
  if (days) {
    const date = /* @__PURE__ */ new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=None; Secure;domain=" + DOMAIN;
}
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c2) => c2.trim());
    if (cookieName === name) {
      setCookie(name, cookieValue);
      return decodeURIComponent(cookieValue);
    }
  }
}
function removeCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;; path=/; SameSite=None; Secure;domain=" + DOMAIN;
}
var FingerprintJS = function(exports) {
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
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            results = Array(items.length);
            lastLoopReleaseTime = Date.now();
            i2 = 0;
            _a.label = 1;
          case 1:
            if (!(i2 < items.length)) return [3, 4];
            results[i2] = callback(items[i2], i2);
            now = Date.now();
            if (!(now >= lastLoopReleaseTime + loopReleaseInterval))
              return [3, 3];
            lastLoopReleaseTime = now;
            return [4, wait(0)];
          case 2:
            _a.sent();
            _a.label = 3;
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
    var _a;
    return __assign(
      {
        name: error.name,
        message: error.message,
        stack: (_a = error.stack) === null || _a === void 0 ? void 0 : _a.split("\n")
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
    var _a, _b;
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
              (_b = (_a = attributeMatch[4]) !== null && _a !== void 0 ? _a : attributeMatch[5]) !== null && _b !== void 0 ? _b : ""
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
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, sourceGettersPromise];
            case 1:
              sourceGetters = _a.sent();
              return [
                4,
                mapWithBreaks(sourceGetters, function(sourceGetter) {
                  var componentPromise = sourceGetter();
                  suppressUnhandledRejectionWarning(componentPromise);
                  return componentPromise;
                })
              ];
            case 2:
              componentPromises = _a.sent();
              return [
                4,
                Promise.all(componentPromises)
                // Keeping the component keys order the same as the source keys order
              ];
            case 3:
              componentArray = _a.sent();
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
    var _a, _b;
    var w2 = window;
    return countTruthy([
      "buildID" in navigator,
      "MozAppearance" in ((_b = (_a = document.documentElement) === null || _a === void 0 ? void 0 : _a.style) !== null && _b !== void 0 ? _b : {}),
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
    var _a = startRenderingAudio(context), renderPromise = _a[0], finishRendering = _a[1];
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
    var _a, _b, _c;
    if (domPollInterval === void 0) {
      domPollInterval = 50;
    }
    return __awaiter(this, void 0, void 0, function() {
      var d2, iframe;
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
            iframe = d2.createElement("iframe");
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
                iframe.onload = resolve;
                iframe.onerror = reject;
                var style = iframe.style;
                style.setProperty("display", "block", "important");
                style.position = "absolute";
                style.top = "0";
                style.left = "0";
                style.visibility = "hidden";
                if (initialHtml && "srcdoc" in iframe) {
                  iframe.srcdoc = initialHtml;
                } else {
                  iframe.src = "about:blank";
                }
                d2.body.appendChild(iframe);
                var checkReadyState = function() {
                  var _a2, _b2;
                  if (isComplete) {
                    return;
                  }
                  if (((_b2 = (_a2 = iframe.contentWindow) === null || _a2 === void 0 ? void 0 : _a2.document) === null || _b2 === void 0 ? void 0 : _b2.readyState) === "complete") {
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
            if (!!((_b = (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body))
              return [3, 8];
            return [4, wait(domPollInterval)];
          case 7:
            _d.sent();
            return [3, 6];
          case 8:
            return [4, action(iframe, iframe.contentWindow)];
          case 9:
            return [2, _d.sent()];
          case 10:
            (_c = iframe.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(iframe);
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
    var _a = parseSimpleCssSelector(selector), tag = _a[0], attributes = _a[1];
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
    for (var _i = 0, _a = source.split(";"); _i < _a.length; _i++) {
      var property = _a[_i];
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
    return withIframe(function(_2, _a) {
      var document2 = _a.document;
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
    var _a = makeCanvasContext(), canvas = _a[0], context = _a[1];
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
    for (var _i = 0, _a = [
      ["#f2f", 40, 40],
      ["#2ff", 80, 40],
      ["#ff2", 60, 80]
    ]; _i < _a.length; _i++) {
      var _b = _a[_i], color = _b[0], x2 = _b[1], y2 = _b[2];
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
    } catch (_a) {
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
        return __generator(this, function(_a) {
          switch (_a.label) {
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
              _a.sent();
              frameSize = getCurrentScreenFrame();
              _a.label = 2;
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
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, screenFrameGetter()];
            case 1:
              frameSize = _a.sent();
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
    var _a;
    var DateTimeFormat = (_a = window.Intl) === null || _a === void 0 ? void 0 : _a.DateTimeFormat;
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
    for (var _i = 0, _a = [
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
    ]; _i < _a.length; _i++) {
      var key = _a[_i];
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
  function getDomBlockers(_a) {
    var _b = _a === void 0 ? {} : _a, debug = _b.debug;
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
    var _a;
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
              (_a = root.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(root);
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
    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
      var filterName = _a[_i];
      message += "\n".concat(filterName, ":");
      for (var _b = 0, _c = filters[filterName]; _b < _c.length; _b++) {
        var selector = _c[_b];
        message += "\n  ".concat(blockedSelectors[selector] ? "🚫" : "➡️", " ").concat(selector);
      }
    }
    console.log("".concat(message, "\n```"));
  }
  function getColorGamut() {
    for (var _i = 0, _a = ["rec2020", "p3", "srgb"]; _i < _a.length; _i++) {
      var gamut = _a[_i];
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
      for (var _i = 0, _a = Object.keys(presets); _i < _a.length; _i++) {
        var key = _a[_i];
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
    var _a;
    var canvas = document.createElement("canvas");
    var gl = (_a = canvas.getContext("webgl")) !== null && _a !== void 0 ? _a : canvas.getContext("experimental-webgl");
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
    for (var _i = 0, _a = Object.keys(components).sort(); _i < _a.length; _i++) {
      var componentKey = _a[_i];
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
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                startTime = Date.now();
                return [4, getComponents()];
              case 1:
                components = _a.sent();
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
  function load(_a) {
    var _b = _a === void 0 ? {} : _a, delayFallback = _b.delayFallback, debug = _b.debug, _c = _b.monitoring, monitoring = _c === void 0 ? true : _c;
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
  exports.componentsToDebugString = componentsToDebugString;
  exports.default = index;
  exports.getFullscreenElement = getFullscreenElement;
  exports.getScreenFrame = getScreenFrame;
  exports.hashComponents = hashComponents;
  exports.isAndroid = isAndroid;
  exports.isChromium = isChromium;
  exports.isDesktopSafari = isDesktopSafari;
  exports.isEdgeHTML = isEdgeHTML;
  exports.isGecko = isGecko;
  exports.isTrident = isTrident;
  exports.isWebKit = isWebKit;
  exports.load = load;
  exports.loadSources = loadSources;
  exports.murmurX64Hash128 = murmurX64Hash128;
  exports.prepareForSources = prepareForSources;
  exports.sources = sources;
  exports.transformSource = transformSource;
  exports.withIframe = withIframe;
  Object.defineProperty(exports, "__esModule", { value: true });
  return exports;
}({});
function e(e2, r2, n2, t2) {
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
function r(e2, r2) {
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
var n = { exclude: [] };
function t(e2, r2) {
  if (!["exclude", "permissions_to_check", "retries", "timeout"].includes(e2)) throw new Error("Unknown option " + e2);
  if (["exclude", "permissions_to_check"].includes(e2) && (!Array.isArray(r2) || !r2.every(function(e3) {
    return "string" == typeof e3;
  }))) throw new Error("The value of the exclude and permissions_to_check must be an array of strings");
  if (["retries", "timeout"].includes(e2) && "number" != typeof r2) throw new Error("The value of retries must be a number");
  n[e2] = r2;
}
var o = {}, a = { timeout: "true" }, i = function(e2, r2) {
  "undefined" != typeof window && (o[e2] = r2);
}, u = function() {
  return Object.fromEntries(Object.entries(o).filter(function(e2) {
    var r2, t2 = e2[0];
    return !(null === (r2 = null == n ? void 0 : n.exclude) || void 0 === r2 ? void 0 : r2.includes(t2));
  }).map(function(e2) {
    return [e2[0], (0, e2[1])()];
  }));
}, c = 3432918353, s = 461845907, l = 3864292196, d = 2246822507, f = 3266489909;
function h(e2, r2) {
  return e2 << r2 | e2 >>> 32 - r2;
}
function m(e2, r2) {
  void 0 === r2 && (r2 = 0);
  for (var n2 = r2, t2 = 0, o2 = 3 & e2.length, a2 = e2.length - o2, i2 = 0; i2 < a2; ) t2 = 255 & e2.charCodeAt(i2) | (255 & e2.charCodeAt(++i2)) << 8 | (255 & e2.charCodeAt(++i2)) << 16 | (255 & e2.charCodeAt(++i2)) << 24, ++i2, t2 = h(t2 = Math.imul(t2, c), 15), n2 = h(n2 ^= t2 = Math.imul(t2, s), 13), n2 = Math.imul(n2, 5) + l;
  switch (t2 = 0, o2) {
    case 3:
      t2 ^= (255 & e2.charCodeAt(i2 + 2)) << 16;
    case 2:
      t2 ^= (255 & e2.charCodeAt(i2 + 1)) << 8;
    case 1:
      t2 ^= 255 & e2.charCodeAt(i2), t2 = h(t2 = Math.imul(t2, c), 15), n2 ^= t2 = Math.imul(t2, s);
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
  return e(this, void 0, void 0, function() {
    var e2, t2, o2, i2, c2;
    return r(this, function(r2) {
      switch (r2.label) {
        case 0:
          return r2.trys.push([0, 2, , 3]), e2 = u(), t2 = Object.keys(e2), [4, g(Object.values(e2), (null == n ? void 0 : n.timeout) || 1e3, a)];
        case 1:
          return o2 = r2.sent(), i2 = o2.filter(function(e3) {
            return void 0 !== e3;
          }), c2 = {}, i2.forEach(function(e3, r3) {
            c2[t2[r3]] = e3;
          }), [2, S(c2, n.exclude || [])];
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
  return e(this, void 0, void 0, function() {
    var e2, t2;
    return r(this, function(r2) {
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
i("audio", function() {
  return e(this, void 0, void 0, function() {
    return r(this, function(e2) {
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
"Firefox" != A().name && i("canvas", function() {
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
"Firefox" != A().name && i("fonts", function() {
  var n2 = this;
  return new Promise(function(t2, o2) {
    try {
      !function(n3) {
        var t3;
        e(this, void 0, void 0, function() {
          var e2, o3, a2;
          return r(this, function(r2) {
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
        return e(n2, void 0, void 0, function() {
          var e2, n3, o4, i2;
          return r(this, function(r2) {
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
}), i("hardware", function() {
  return new Promise(function(e2, r2) {
    var n2 = void 0 !== navigator.deviceMemory ? navigator.deviceMemory : 0, t2 = window.performance && window.performance.memory ? window.performance.memory : 0;
    e2({ videocard: _(), architecture: D(), deviceMemory: n2.toString() || "undefined", jsHeapSizeLimit: t2.jsHeapSizeLimit || 0 });
  });
}), i("locales", function() {
  return new Promise(function(e2) {
    e2({ languages: navigator.language, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  });
}), i("permissions", function() {
  return e(this, void 0, void 0, function() {
    var t2;
    return r(this, function(o2) {
      return T = (null == n ? void 0 : n.permissions_to_check) || ["accelerometer", "accessibility", "accessibility-events", "ambient-light-sensor", "background-fetch", "background-sync", "bluetooth", "camera", "clipboard-read", "clipboard-write", "device-info", "display-capture", "gyroscope", "geolocation", "local-fonts", "magnetometer", "microphone", "midi", "nfc", "notifications", "payment-handler", "persistent-storage", "push", "speaker", "storage-access", "top-level-storage-access", "window-management", "query"], t2 = Array.from({ length: (null == n ? void 0 : n.retries) || 3 }, function() {
        return function() {
          return e(this, void 0, void 0, function() {
            var e2, n2, t3, o3, a2;
            return r(this, function(r2) {
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
}), i("plugins", function() {
  var e2 = [];
  if (navigator.plugins) for (var r2 = 0; r2 < navigator.plugins.length; r2++) {
    var n2 = navigator.plugins[r2];
    e2.push([n2.name, n2.filename, n2.description].join("|"));
  }
  return new Promise(function(r3) {
    r3({ plugins: e2 });
  });
}), i("screen", function() {
  return new Promise(function(e2) {
    e2({ is_touchscreen: navigator.maxTouchPoints > 0, maxTouchPoints: navigator.maxTouchPoints, colorDepth: screen.colorDepth, mediaMatches: L() });
  });
}), i("system", function() {
  return new Promise(function(e2) {
    var r2 = A();
    e2({ platform: window.navigator.platform, cookieEnabled: window.navigator.cookieEnabled, productSub: navigator.productSub, product: navigator.product, useragent: navigator.userAgent, browser: { name: r2.name, version: r2.version }, applePayVersion: F() });
  });
});
var N, U = "SamsungBrowser" !== A().name ? 1 : 3, G = null;
"undefined" != typeof document && ((N = document.createElement("canvas")).width = 200, N.height = 100, G = N.getContext("webgl")), i("webgl", function() {
  return e(this, void 0, void 0, function() {
    var e2;
    return r(this, function(r2) {
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
i("math", function() {
  return e(void 0, void 0, void 0, function() {
    return r(this, function(e2) {
      return [2, { acos: Math.acos(0.5), asin: j(Math.asin, -1, 1, 97), atan: j(Math.atan, -1, 1, 97), cos: j(Math.cos, 0, Math.PI, 97), cosh: Math.cosh(9 / 7), e: Math.E, largeCos: Math.cos(1e20), largeSin: Math.sin(1e20), largeTan: Math.tan(1e20), log: Math.log(1e3), pi: Math.PI, sin: j(Math.sin, -Math.PI, Math.PI, 97), sinh: j(Math.sinh, -9 / 7, 7 / 9, 97), sqrt: Math.sqrt(2), tan: j(Math.tan, 0, 2 * Math.PI, 97), tanh: j(Math.tanh, -9 / 7, 7 / 9, 97) }];
    });
  });
});
window.addEventListener("message", async function(event) {
  var _a, _b, _c;
  if (event.origin !== window.location.origin) ;
  switch ((_a = event == null ? void 0 : event.data) == null ? void 0 : _a.name) {
    case MESSAGE_EVENT_LIST.GET_USER_PROFILE_FROM_IFRAME: {
      getUserProfile();
      break;
    }
    case MESSAGE_EVENT_LIST.SEND_USER_PROFILE_TO_PARENT: {
      break;
    }
    case MESSAGE_EVENT_LIST.SET_USER_PROFILE_TO_IFRAME: {
      setData((_b = event == null ? void 0 : event.data) == null ? void 0 : _b.data);
      break;
    }
    case MESSAGE_EVENT_LIST.GET_UDID_FROM_IFRAME: {
      let UDID = getCookie(CONSTANTS.UDID);
      if (!UDID) {
        UDID = getRandomUUID();
        setCookie(CONSTANTS.UDID, UDID);
      }
      postMessageMethod(MESSAGE_EVENT_LIST.SEND_UDID_TO_PARENT, UDID);
      break;
    }
    case MESSAGE_EVENT_LIST.SEND_UDID_TO_IFRAME: {
      let UDID = (_c = event == null ? void 0 : event.data) == null ? void 0 : _c.data;
      if (UDID) {
        setCookie(CONSTANTS.UDID, UDID);
      }
      break;
    }
    case MESSAGE_EVENT_LIST.GET_UTID_FROM_IFRAME: {
      let UTID = getCookie(CONSTANTS.UTID);
      if (!UTID) {
        const ThumbmarkJsObject = await getThumbmarkJs();
        UTID = ThumbmarkJsObject.hash;
        setCookie(CONSTANTS.UTID, UTID);
      }
      postMessageMethod(MESSAGE_EVENT_LIST.SEND_UTID_TO_PARENT, UTID);
      break;
    }
    case MESSAGE_EVENT_LIST.GET_UFID_FROM_IFRAME: {
      let UFID = getCookie(CONSTANTS.UFID);
      if (!UFID) {
        const FingerprintObject = await getFingerprintObject();
        UFID = FingerprintObject == null ? void 0 : FingerprintObject.visitorId;
        setCookie(CONSTANTS.UFID, UFID);
      }
      postMessageMethod(MESSAGE_EVENT_LIST.SEND_UFID_TO_PARENT, UFID);
      break;
    }
    case GET_THIRD_PARTY_COOKIE_STATUS_FROM_IFRAME: {
      setCookie(CONSTANTS.TEMPORARY_COOKIE, "1");
      if (document.cookie.indexOf("test_cookie") !== -1) {
        postMessageMethod(MESSAGE_EVENT_LIST.SEND_THIRD_PARTY_COOKIE_STATUS_TO_PARENT, true);
        removeCookie(CONSTANTS.TEMPORARY_COOKIE);
      } else {
        postMessageMethod(MESSAGE_EVENT_LIST.SEND_THIRD_PARTY_COOKIE_STATUS_TO_PARENT, false);
      }
    }
  }
});
let getUserProfile = () => {
  let userProfile = "";
  userProfile = getCookie(CONSTANTS.USER_PROFILE);
  if (userProfile) {
    postMessageMethod(
      MESSAGE_EVENT_LIST.SEND_USER_PROFILE_TO_PARENT,
      JSON.parse(userProfile)
    );
  }
};
let setData = (data) => {
  setCookie(CONSTANTS.USER_PROFILE, JSON.stringify(data));
};
let postMessageMethod = (name, data) => {
  var _a;
  (_a = self == null ? void 0 : self.parent) == null ? void 0 : _a.postMessage(
    {
      name,
      data
    },
    "*"
  );
};
let getFingerprintObject = async () => {
  const fp = await FingerprintJS.load({
    apiKey: "w19U95D41ZRuBaTVhebA",
    region: "ap"
  });
  const result = await fp.get();
  return result;
};
async function getThumbmarkJs() {
  t("exclude", ["permissions"]);
  return y().then((fp) => fp);
}
</script>
Universal Cookies
<!-- <button onclick="sendData()">Send Data</button> -->
