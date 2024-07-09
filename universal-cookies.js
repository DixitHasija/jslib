(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.uc = {}));
})(this, function(exports2) {
  "use strict";
  var _a;
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
        } else if (typeof combined[key] === "string" && typeof obj2[key] === "string") {
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
      (obj, index, self2) => index === self2.findIndex((t) => deepEqual(t, obj))
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
    UWID: "uwid"
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
    UWID: "uwid"
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
    SEND_UDID_TO_PARENT: "sendUDIDToParent"
  };
  const LOCALSTORAGE_KEY = "__uc_site";
  var FingerprintJS = function(e2) {
    var n2 = function() {
      return n2 = Object.assign || function(e3) {
        for (var n3, t2 = 1, r3 = arguments.length; t2 < r3; t2++)
          for (var o3 in n3 = arguments[t2])
            Object.prototype.hasOwnProperty.call(n3, o3) && (e3[o3] = n3[o3]);
        return e3;
      }, n2.apply(this, arguments);
    };
    function t(e3, n3, t2, r3) {
      return new (t2 || (t2 = Promise))(function(o3, i3) {
        function a3(e4) {
          try {
            u3(r3.next(e4));
          } catch (n4) {
            i3(n4);
          }
        }
        function c3(e4) {
          try {
            u3(r3.throw(e4));
          } catch (n4) {
            i3(n4);
          }
        }
        function u3(e4) {
          var n4;
          e4.done ? o3(e4.value) : (n4 = e4.value, n4 instanceof t2 ? n4 : new t2(function(e5) {
            e5(n4);
          })).then(a3, c3);
        }
        u3((r3 = r3.apply(e3, [])).next());
      });
    }
    function r2(e3, n3) {
      var t2, r3, o3, i3, a3 = {
        label: 0,
        sent: function() {
          if (1 & o3[0]) throw o3[1];
          return o3[1];
        },
        trys: [],
        ops: []
      };
      return i3 = { next: c3(0), throw: c3(1), return: c3(2) }, "function" == typeof Symbol && (i3[Symbol.iterator] = function() {
        return this;
      }), i3;
      function c3(c4) {
        return function(u3) {
          return function(c5) {
            if (t2) throw new TypeError("Generator is already executing.");
            for (; i3 && (i3 = 0, c5[0] && (a3 = 0)), a3; )
              try {
                if (t2 = 1, r3 && (o3 = 2 & c5[0] ? r3.return : c5[0] ? r3.throw || ((o3 = r3.return) && o3.call(r3), 0) : r3.next) && !(o3 = o3.call(r3, c5[1])).done)
                  return o3;
                switch (r3 = 0, o3 && (c5 = [2 & c5[0], o3.value]), c5[0]) {
                  case 0:
                  case 1:
                    o3 = c5;
                    break;
                  case 4:
                    return a3.label++, { value: c5[1], done: false };
                  case 5:
                    a3.label++, r3 = c5[1], c5 = [0];
                    continue;
                  case 7:
                    c5 = a3.ops.pop(), a3.trys.pop();
                    continue;
                  default:
                    if (!(o3 = a3.trys, (o3 = o3.length > 0 && o3[o3.length - 1]) || 6 !== c5[0] && 2 !== c5[0])) {
                      a3 = 0;
                      continue;
                    }
                    if (3 === c5[0] && (!o3 || c5[1] > o3[0] && c5[1] < o3[3])) {
                      a3.label = c5[1];
                      break;
                    }
                    if (6 === c5[0] && a3.label < o3[1]) {
                      a3.label = o3[1], o3 = c5;
                      break;
                    }
                    if (o3 && a3.label < o3[2]) {
                      a3.label = o3[2], a3.ops.push(c5);
                      break;
                    }
                    o3[2] && a3.ops.pop(), a3.trys.pop();
                    continue;
                }
                c5 = n3.call(e3, a3);
              } catch (u4) {
                c5 = [6, u4], r3 = 0;
              } finally {
                t2 = o3 = 0;
              }
            if (5 & c5[0]) throw c5[1];
            return { value: c5[0] ? c5[1] : void 0, done: true };
          }([c4, u3]);
        };
      }
    }
    function o2(e3, n3, t2) {
      for (var r3, o3 = 0, i3 = n3.length; o3 < i3; o3++)
        !r3 && o3 in n3 || (r3 || (r3 = Array.prototype.slice.call(n3, 0, o3)), r3[o3] = n3[o3]);
      return e3.concat(r3 || Array.prototype.slice.call(n3));
    }
    var i2 = "4.3.0";
    function a2(e3, n3) {
      return new Promise(function(t2) {
        return setTimeout(t2, e3, n3);
      });
    }
    function c2() {
      return a2(0);
    }
    function u2(e3) {
      return !!e3 && "function" == typeof e3.then;
    }
    function s2(e3, n3) {
      try {
        var t2 = e3();
        u2(t2) ? t2.then(
          function(e4) {
            return n3(true, e4);
          },
          function(e4) {
            return n3(false, e4);
          }
        ) : n3(true, t2);
      } catch (r3) {
        n3(false, r3);
      }
    }
    function l2(e3, n3, o3) {
      return void 0 === o3 && (o3 = 16), t(this, void 0, void 0, function() {
        var t2, i3, c3, u3;
        return r2(this, function(r3) {
          switch (r3.label) {
            case 0:
              t2 = Array(e3.length), i3 = Date.now(), c3 = 0, r3.label = 1;
            case 1:
              return c3 < e3.length ? (t2[c3] = n3(e3[c3], c3), (u3 = Date.now()) >= i3 + o3 ? (i3 = u3, [4, a2(0)]) : [3, 3]) : [3, 4];
            case 2:
              r3.sent(), r3.label = 3;
            case 3:
              return ++c3, [3, 1];
            case 4:
              return [2, t2];
          }
        });
      });
    }
    function d2(e3) {
      e3.then(void 0, function() {
      });
    }
    function f2(e3) {
      return parseInt(e3);
    }
    function m2(e3) {
      return parseFloat(e3);
    }
    function v2(e3, n3) {
      return "number" == typeof e3 && isNaN(e3) ? n3 : e3;
    }
    function h2(e3) {
      return e3.reduce(function(e4, n3) {
        return e4 + (n3 ? 1 : 0);
      }, 0);
    }
    function p(e3, n3) {
      if (void 0 === n3 && (n3 = 1), Math.abs(n3) >= 1)
        return Math.round(e3 / n3) * n3;
      var t2 = 1 / n3;
      return Math.round(e3 * t2) / t2;
    }
    function b(e3, n3) {
      var t2 = e3[0] >>> 16, r3 = 65535 & e3[0], o3 = e3[1] >>> 16, i3 = 65535 & e3[1], a3 = n3[0] >>> 16, c3 = 65535 & n3[0], u3 = n3[1] >>> 16, s3 = 0, l3 = 0, d3 = 0, f3 = 0;
      d3 += (f3 += i3 + (65535 & n3[1])) >>> 16, f3 &= 65535, l3 += (d3 += o3 + u3) >>> 16, d3 &= 65535, s3 += (l3 += r3 + c3) >>> 16, l3 &= 65535, s3 += t2 + a3, s3 &= 65535, e3[0] = s3 << 16 | l3, e3[1] = d3 << 16 | f3;
    }
    function y2(e3, n3) {
      var t2 = e3[0] >>> 16, r3 = 65535 & e3[0], o3 = e3[1] >>> 16, i3 = 65535 & e3[1], a3 = n3[0] >>> 16, c3 = 65535 & n3[0], u3 = n3[1] >>> 16, s3 = 65535 & n3[1], l3 = 0, d3 = 0, f3 = 0, m3 = 0;
      f3 += (m3 += i3 * s3) >>> 16, m3 &= 65535, d3 += (f3 += o3 * s3) >>> 16, f3 &= 65535, d3 += (f3 += i3 * u3) >>> 16, f3 &= 65535, l3 += (d3 += r3 * s3) >>> 16, d3 &= 65535, l3 += (d3 += o3 * u3) >>> 16, d3 &= 65535, l3 += (d3 += i3 * c3) >>> 16, d3 &= 65535, l3 += t2 * s3 + r3 * u3 + o3 * c3 + i3 * a3, l3 &= 65535, e3[0] = l3 << 16 | d3, e3[1] = f3 << 16 | m3;
    }
    function g2(e3, n3) {
      var t2 = e3[0];
      32 === (n3 %= 64) ? (e3[0] = e3[1], e3[1] = t2) : n3 < 32 ? (e3[0] = t2 << n3 | e3[1] >>> 32 - n3, e3[1] = e3[1] << n3 | t2 >>> 32 - n3) : (n3 -= 32, e3[0] = e3[1] << n3 | t2 >>> 32 - n3, e3[1] = t2 << n3 | e3[1] >>> 32 - n3);
    }
    function w2(e3, n3) {
      0 !== (n3 %= 64) && (n3 < 32 ? (e3[0] = e3[1] >>> 32 - n3, e3[1] = e3[1] << n3) : (e3[0] = e3[1] << n3 - 32, e3[1] = 0));
    }
    function L2(e3, n3) {
      e3[0] ^= n3[0], e3[1] ^= n3[1];
    }
    var k2 = [4283543511, 3981806797], V = [3301882366, 444984403];
    function S2(e3) {
      var n3 = [0, e3[0] >>> 1];
      L2(e3, n3), y2(e3, k2), n3[1] = e3[0] >>> 1, L2(e3, n3), y2(e3, V), n3[1] = e3[0] >>> 1, L2(e3, n3);
    }
    var W = [2277735313, 289559509], Z = [1291169091, 658871167], x2 = [0, 5], M2 = [0, 1390208809], F2 = [0, 944331445];
    function R2(e3, n3) {
      var t2 = function(e4) {
        for (var n4 = new Uint8Array(e4.length), t3 = 0; t3 < e4.length; t3++) {
          var r4 = e4.charCodeAt(t3);
          if (r4 > 127) return new TextEncoder().encode(e4);
          n4[t3] = r4;
        }
        return n4;
      }(e3);
      n3 = n3 || 0;
      var r3, o3 = [0, t2.length], i3 = o3[1] % 16, a3 = o3[1] - i3, c3 = [0, n3], u3 = [0, n3], s3 = [0, 0], l3 = [0, 0];
      for (r3 = 0; r3 < a3; r3 += 16)
        s3[0] = t2[r3 + 4] | t2[r3 + 5] << 8 | t2[r3 + 6] << 16 | t2[r3 + 7] << 24, s3[1] = t2[r3] | t2[r3 + 1] << 8 | t2[r3 + 2] << 16 | t2[r3 + 3] << 24, l3[0] = t2[r3 + 12] | t2[r3 + 13] << 8 | t2[r3 + 14] << 16 | t2[r3 + 15] << 24, l3[1] = t2[r3 + 8] | t2[r3 + 9] << 8 | t2[r3 + 10] << 16 | t2[r3 + 11] << 24, y2(s3, W), g2(s3, 31), y2(s3, Z), L2(c3, s3), g2(c3, 27), b(c3, u3), y2(c3, x2), b(c3, M2), y2(l3, Z), g2(l3, 33), y2(l3, W), L2(u3, l3), g2(u3, 31), b(u3, c3), y2(u3, x2), b(u3, F2);
      s3[0] = 0, s3[1] = 0, l3[0] = 0, l3[1] = 0;
      var d3 = [0, 0];
      switch (i3) {
        case 15:
          d3[1] = t2[r3 + 14], w2(d3, 48), L2(l3, d3);
        case 14:
          d3[1] = t2[r3 + 13], w2(d3, 40), L2(l3, d3);
        case 13:
          d3[1] = t2[r3 + 12], w2(d3, 32), L2(l3, d3);
        case 12:
          d3[1] = t2[r3 + 11], w2(d3, 24), L2(l3, d3);
        case 11:
          d3[1] = t2[r3 + 10], w2(d3, 16), L2(l3, d3);
        case 10:
          d3[1] = t2[r3 + 9], w2(d3, 8), L2(l3, d3);
        case 9:
          d3[1] = t2[r3 + 8], L2(l3, d3), y2(l3, Z), g2(l3, 33), y2(l3, W), L2(u3, l3);
        case 8:
          d3[1] = t2[r3 + 7], w2(d3, 56), L2(s3, d3);
        case 7:
          d3[1] = t2[r3 + 6], w2(d3, 48), L2(s3, d3);
        case 6:
          d3[1] = t2[r3 + 5], w2(d3, 40), L2(s3, d3);
        case 5:
          d3[1] = t2[r3 + 4], w2(d3, 32), L2(s3, d3);
        case 4:
          d3[1] = t2[r3 + 3], w2(d3, 24), L2(s3, d3);
        case 3:
          d3[1] = t2[r3 + 2], w2(d3, 16), L2(s3, d3);
        case 2:
          d3[1] = t2[r3 + 1], w2(d3, 8), L2(s3, d3);
        case 1:
          d3[1] = t2[r3], L2(s3, d3), y2(s3, W), g2(s3, 31), y2(s3, Z), L2(c3, s3);
      }
      return L2(c3, o3), L2(u3, o3), b(c3, u3), b(u3, c3), S2(c3), S2(u3), b(c3, u3), b(u3, c3), ("00000000" + (c3[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (c3[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (u3[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (u3[1] >>> 0).toString(16)).slice(-8);
    }
    function G2(e3) {
      return "function" != typeof e3;
    }
    function I2(e3, n3, o3) {
      var i3 = Object.keys(e3).filter(function(e4) {
        return !function(e5, n4) {
          for (var t2 = 0, r3 = e5.length; t2 < r3; ++t2) if (e5[t2] === n4) return true;
          return false;
        }(o3, e4);
      }), a3 = l2(i3, function(t2) {
        return function(e4, n4) {
          var t3 = new Promise(function(t4) {
            var r3 = Date.now();
            s2(e4.bind(null, n4), function() {
              for (var e5 = [], n5 = 0; n5 < arguments.length; n5++)
                e5[n5] = arguments[n5];
              var o4 = Date.now() - r3;
              if (!e5[0])
                return t4(function() {
                  return { error: e5[1], duration: o4 };
                });
              var i4 = e5[1];
              if (G2(i4))
                return t4(function() {
                  return { value: i4, duration: o4 };
                });
              t4(function() {
                return new Promise(function(e6) {
                  var n6 = Date.now();
                  s2(i4, function() {
                    for (var t5 = [], r4 = 0; r4 < arguments.length; r4++)
                      t5[r4] = arguments[r4];
                    var i5 = o4 + Date.now() - n6;
                    if (!t5[0]) return e6({ error: t5[1], duration: i5 });
                    e6({ value: t5[1], duration: i5 });
                  });
                });
              });
            });
          });
          return d2(t3), function() {
            return t3.then(function(e5) {
              return e5();
            });
          };
        }(e3[t2], n3);
      });
      return d2(a3), function() {
        return t(this, void 0, void 0, function() {
          var e4, n4, t2, o4;
          return r2(this, function(r3) {
            switch (r3.label) {
              case 0:
                return [4, a3];
              case 1:
                return [
                  4,
                  l2(r3.sent(), function(e5) {
                    var n5 = e5();
                    return d2(n5), n5;
                  })
                ];
              case 2:
                return e4 = r3.sent(), [4, Promise.all(e4)];
              case 3:
                for (n4 = r3.sent(), t2 = {}, o4 = 0; o4 < i3.length; ++o4)
                  t2[i3[o4]] = n4[o4];
                return [2, t2];
            }
          });
        });
      };
    }
    function Y() {
      var e3 = window, n3 = navigator;
      return h2([
        "MSCSSMatrix" in e3,
        "msSetImmediate" in e3,
        "msIndexedDB" in e3,
        "msMaxTouchPoints" in n3,
        "msPointerEnabled" in n3
      ]) >= 4;
    }
    function j2() {
      var e3 = window, n3 = navigator;
      return h2([
        "msWriteProfilerMark" in e3,
        "MSStream" in e3,
        "msLaunchUri" in n3,
        "msSaveBlob" in n3
      ]) >= 3 && !Y();
    }
    function X() {
      var e3 = window, n3 = navigator;
      return h2([
        "webkitPersistentStorage" in n3,
        "webkitTemporaryStorage" in n3,
        0 === n3.vendor.indexOf("Google"),
        "webkitResolveLocalFileSystemURL" in e3,
        "BatteryManager" in e3,
        "webkitMediaStream" in e3,
        "webkitSpeechGrammar" in e3
      ]) >= 5;
    }
    function P2() {
      var e3 = window, n3 = navigator;
      return h2([
        "ApplePayError" in e3,
        "CSSPrimitiveValue" in e3,
        "Counter" in e3,
        0 === n3.vendor.indexOf("Apple"),
        "getStorageUpdates" in n3,
        "WebKitMediaKeys" in e3
      ]) >= 4;
    }
    function C2() {
      var e3 = window, n3 = e3.HTMLElement, t2 = e3.Document;
      return h2([
        "safari" in e3,
        !("ongestureend" in e3),
        !("TouchEvent" in e3),
        !("orientation" in e3),
        n3 && !("autocapitalize" in n3.prototype),
        t2 && "pointerLockElement" in t2.prototype
      ]) >= 4;
    }
    function E2() {
      var e3, n3 = window;
      return e3 = n3.print, !!/^function\s.*?\{\s*\[native code]\s*}$/.test(String(e3)) && h2([
        "[object WebPageNamespace]" === String(n3.browser),
        "MicrodataExtractor" in n3
      ]) >= 1;
    }
    function H() {
      var e3, n3, t2 = window;
      return h2([
        "buildID" in navigator,
        "MozAppearance" in (null !== (n3 = null === (e3 = document.documentElement) || void 0 === e3 ? void 0 : e3.style) && void 0 !== n3 ? n3 : {}),
        "onmozfullscreenchange" in t2,
        "mozInnerScreenX" in t2,
        "CSSMozDocumentRule" in t2,
        "CanvasCaptureMediaStream" in t2
      ]) >= 4;
    }
    function A2() {
      var e3 = window, n3 = navigator, t2 = e3.CSS, r3 = e3.HTMLButtonElement;
      return h2([
        !("getStorageUpdates" in n3),
        r3 && "popover" in r3.prototype,
        "CSSCounterStyleRule" in e3,
        t2.supports("font-size-adjust: ex-height 0.5"),
        t2.supports("text-transform: full-width")
      ]) >= 4;
    }
    function N2() {
      var e3 = document;
      return e3.fullscreenElement || e3.msFullscreenElement || e3.mozFullScreenElement || e3.webkitFullscreenElement || null;
    }
    function J() {
      var e3 = X(), n3 = H(), t2 = window, r3 = navigator, o3 = "connection";
      return e3 ? h2([
        !("SharedWorker" in t2),
        r3[o3] && "ontypechange" in r3[o3],
        !("sinkId" in new window.Audio())
      ]) >= 2 : !!n3 && h2([
        "onorientationchange" in t2,
        "orientation" in t2,
        /android/i.test(navigator.appVersion)
      ]) >= 2;
    }
    function T2(e3, n3, o3) {
      var i3, c3, u3;
      return void 0 === o3 && (o3 = 50), t(this, void 0, void 0, function() {
        var t2, s3;
        return r2(this, function(r3) {
          switch (r3.label) {
            case 0:
              t2 = document, r3.label = 1;
            case 1:
              return t2.body ? [3, 3] : [4, a2(o3)];
            case 2:
              return r3.sent(), [3, 1];
            case 3:
              s3 = t2.createElement("iframe"), r3.label = 4;
            case 4:
              return r3.trys.push([4, , 10, 11]), [
                4,
                new Promise(function(e4, r4) {
                  var o4 = false, i4 = function() {
                    o4 = true, e4();
                  };
                  s3.onload = i4, s3.onerror = function(e5) {
                    o4 = true, r4(e5);
                  };
                  var a3 = s3.style;
                  a3.setProperty("display", "block", "important"), a3.position = "absolute", a3.top = "0", a3.left = "0", a3.visibility = "hidden", n3 && "srcdoc" in s3 ? s3.srcdoc = n3 : s3.src = "about:blank", t2.body.appendChild(s3);
                  var c4 = function() {
                    var e5, n4;
                    o4 || ("complete" === (null === (n4 = null === (e5 = s3.contentWindow) || void 0 === e5 ? void 0 : e5.document) || void 0 === n4 ? void 0 : n4.readyState) ? i4() : setTimeout(c4, 10));
                  };
                  c4();
                })
              ];
            case 5:
              r3.sent(), r3.label = 6;
            case 6:
              return (null === (c3 = null === (i3 = s3.contentWindow) || void 0 === i3 ? void 0 : i3.document) || void 0 === c3 ? void 0 : c3.body) ? [3, 8] : [4, a2(o3)];
            case 7:
              return r3.sent(), [3, 6];
            case 8:
              return [4, e3(s3, s3.contentWindow)];
            case 9:
              return [2, r3.sent()];
            case 10:
              return null === (u3 = s3.parentNode) || void 0 === u3 || u3.removeChild(s3), [7];
            case 11:
              return [2];
          }
        });
      });
    }
    function _2(e3) {
      for (var n3 = function(e4) {
        for (var n4, t3, r4 = "Unexpected syntax '".concat(e4, "'"), o4 = /^\s*([a-z-]*)(.*)$/i.exec(e4), i4 = o4[1] || void 0, a4 = {}, c4 = /([.:#][\w-]+|\[.+?\])/gi, u4 = function(e5, n5) {
          a4[e5] = a4[e5] || [], a4[e5].push(n5);
        }; ; ) {
          var s3 = c4.exec(o4[2]);
          if (!s3) break;
          var l3 = s3[0];
          switch (l3[0]) {
            case ".":
              u4("class", l3.slice(1));
              break;
            case "#":
              u4("id", l3.slice(1));
              break;
            case "[":
              var d3 = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(
                l3
              );
              if (!d3) throw new Error(r4);
              u4(
                d3[1],
                null !== (t3 = null !== (n4 = d3[4]) && void 0 !== n4 ? n4 : d3[5]) && void 0 !== t3 ? t3 : ""
              );
              break;
            default:
              throw new Error(r4);
          }
        }
        return [i4, a4];
      }(e3), t2 = n3[0], r3 = n3[1], o3 = document.createElement(null != t2 ? t2 : "div"), i3 = 0, a3 = Object.keys(r3); i3 < a3.length; i3++) {
        var c3 = a3[i3], u3 = r3[c3].join(" ");
        "style" === c3 ? D2(o3.style, u3) : o3.setAttribute(c3, u3);
      }
      return o3;
    }
    function D2(e3, n3) {
      for (var t2 = 0, r3 = n3.split(";"); t2 < r3.length; t2++) {
        var o3 = r3[t2], i3 = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(o3);
        if (i3) {
          var a3 = i3[1], c3 = i3[2], u3 = i3[4];
          e3.setProperty(a3, c3, u3 || "");
        }
      }
    }
    var z = 44100;
    function B2() {
      return t(this, void 0, void 0, function() {
        var e3, n3, o3;
        return r2(this, function(i3) {
          switch (i3.label) {
            case 0:
              return n3 = new Promise(function(e4) {
                var n4 = document, t2 = "visibilitychange", r3 = function() {
                  n4.hidden || (n4.removeEventListener(t2, r3), e4());
                };
                n4.addEventListener(t2, r3), r3();
              }).then(function() {
                return a2(500);
              }), o3 = function() {
                return t(this, void 0, void 0, function() {
                  var e4, n4, t2, o4, i4, a3, c3;
                  return r2(this, function(r3) {
                    switch (r3.label) {
                      case 0:
                        return e4 = window, (n4 = e4.OfflineAudioContext || e4.webkitOfflineAudioContext) ? O2() ? [2, -1] : [4, U2(n4)] : [2, -2];
                      case 1:
                        return (t2 = r3.sent()) ? (o4 = new n4(1, t2.length - 1 + 4e4, z), (i4 = o4.createBufferSource()).buffer = t2, i4.loop = true, i4.loopStart = (t2.length - 1) / z, i4.loopEnd = t2.length / z, i4.connect(o4.destination), i4.start(), [4, Q(o4)]) : [2, -3];
                      case 2:
                        return (a3 = r3.sent()) ? (c3 = function(e5, n5) {
                          for (var t3 = void 0, r4 = false, o5 = 0; o5 < n5.length; o5 += Math.floor(n5.length / 10))
                            if (0 === n5[o5]) ;
                            else if (void 0 === t3) t3 = n5[o5];
                            else if (t3 !== n5[o5]) {
                              r4 = true;
                              break;
                            }
                          void 0 === t3 ? t3 = e5.getChannelData(0)[e5.length - 1] : r4 && (t3 = function(e6) {
                            for (var n6 = 1 / 0, t4 = -1 / 0, r5 = 0; r5 < e6.length; r5++) {
                              var o6 = e6[r5];
                              0 !== o6 && (o6 < n6 && (n6 = o6), o6 > t4 && (t4 = o6));
                            }
                            return (n6 + t4) / 2;
                          }(n5));
                          return t3;
                        }(t2, a3.getChannelData(0).subarray(t2.length - 1)), [2, Math.abs(c3)]) : [2, -3];
                    }
                  });
                });
              }().then(
                function(n4) {
                  return e3 = [true, n4];
                },
                function(n4) {
                  return e3 = [false, n4];
                }
              ), [4, Promise.race([n3, o3])];
            case 1:
              return i3.sent(), [
                2,
                function() {
                  if (!e3) return -3;
                  if (!e3[0]) throw e3[1];
                  return e3[1];
                }
              ];
          }
        });
      });
    }
    function O2() {
      return P2() && !C2() && !(h2([
        "DOMRectList" in (e3 = window),
        "RTCPeerConnectionIceEvent" in e3,
        "SVGGeometryElement" in e3,
        "ontransitioncancel" in e3
      ]) >= 3);
      var e3;
    }
    function U2(e3) {
      return t(this, void 0, void 0, function() {
        var n3, t2, o3, i3;
        return r2(this, function(r3) {
          switch (r3.label) {
            case 0:
              return n3 = new e3(1, 3396, z), (t2 = n3.createOscillator()).type = "square", t2.frequency.value = 1e3, (o3 = n3.createDynamicsCompressor()).threshold.value = -70, o3.knee.value = 40, o3.ratio.value = 12, o3.attack.value = 0, o3.release.value = 0.25, (i3 = n3.createBiquadFilter()).type = "allpass", i3.frequency.value = 5.239622852977861, i3.Q.value = 0.1, t2.connect(o3), o3.connect(i3), i3.connect(n3.destination), t2.start(0), [4, Q(n3)];
            case 1:
              return [2, r3.sent()];
          }
        });
      });
    }
    function Q(e3) {
      return new Promise(function(n3, t2) {
        var r3 = 25;
        e3.oncomplete = function(e4) {
          return n3(e4.renderedBuffer);
        };
        var o3 = function() {
          try {
            var i3 = e3.startRendering();
            u2(i3) && d2(i3), "suspended" === e3.state && (document.hidden || r3--, r3 > 0 ? setTimeout(o3, 200) : n3(null));
          } catch (a3) {
            t2(a3);
          }
        };
        o3();
      });
    }
    var K = ["monospace", "sans-serif", "serif"], q = [
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
    function $(e3) {
      return t(this, void 0, void 0, function() {
        var n3, t2, o3, i3, a3, c3, u3;
        return r2(this, function(r3) {
          switch (r3.label) {
            case 0:
              return n3 = false, i3 = function() {
                var e4 = document.createElement("canvas");
                return e4.width = 1, e4.height = 1, [e4, e4.getContext("2d")];
              }(), a3 = i3[0], c3 = i3[1], function(e4, n4) {
                return !(!n4 || !e4.toDataURL);
              }(a3, c3) ? [3, 1] : (t2 = o3 = "unsupported", [3, 4]);
            case 1:
              return n3 = function(e4) {
                return e4.rect(0, 0, 10, 10), e4.rect(2, 2, 6, 6), !e4.isPointInPath(5, 5, "evenodd");
              }(c3), e3 ? (t2 = o3 = "skipped", [3, 4]) : [3, 2];
            case 2:
              return [4, ee(a3, c3)];
            case 3:
              u3 = r3.sent(), t2 = u3[0], o3 = u3[1], r3.label = 4;
            case 4:
              return [2, { winding: n3, geometry: t2, text: o3 }];
          }
        });
      });
    }
    function ee(e3, n3) {
      return t(this, void 0, void 0, function() {
        var t2, o3;
        return r2(this, function(r3) {
          switch (r3.label) {
            case 0:
              return function(e4, n4) {
                e4.width = 240, e4.height = 60, n4.textBaseline = "alphabetic", n4.fillStyle = "#f60", n4.fillRect(100, 1, 62, 20), n4.fillStyle = "#069", n4.font = '11pt "Times New Roman"';
                var t3 = "Cwm fjordbank gly ".concat(
                  String.fromCharCode(55357, 56835)
                );
                n4.fillText(t3, 2, 15), n4.fillStyle = "rgba(102, 204, 0, 0.2)", n4.font = "18pt Arial", n4.fillText(t3, 4, 45);
              }(e3, n3), [4, c2()];
            case 1:
              return r3.sent(), t2 = ne(e3), o3 = ne(e3), t2 !== o3 ? [2, ["unstable", "unstable"]] : (function(e4, n4) {
                e4.width = 122, e4.height = 110, n4.globalCompositeOperation = "multiply";
                for (var t3 = 0, r4 = [
                  ["#f2f", 40, 40],
                  ["#2ff", 80, 40],
                  ["#ff2", 60, 80]
                ]; t3 < r4.length; t3++) {
                  var o4 = r4[t3], i3 = o4[0], a3 = o4[1], c3 = o4[2];
                  n4.fillStyle = i3, n4.beginPath(), n4.arc(a3, c3, 40, 0, 2 * Math.PI, true), n4.closePath(), n4.fill();
                }
                n4.fillStyle = "#f9c", n4.arc(60, 60, 60, 0, 2 * Math.PI, true), n4.arc(60, 60, 20, 0, 2 * Math.PI, true), n4.fill("evenodd");
              }(e3, n3), [4, c2()]);
            case 2:
              return r3.sent(), [2, [ne(e3), t2]];
          }
        });
      });
    }
    function ne(e3) {
      return e3.toDataURL();
    }
    function te() {
      var e3 = screen, n3 = function(e4) {
        return v2(f2(e4), null);
      }, t2 = [n3(e3.width), n3(e3.height)];
      return t2.sort().reverse(), t2;
    }
    var re, oe;
    function ie() {
      var e3 = this;
      return function() {
        if (void 0 === oe) {
          var e4 = function() {
            var n3 = ae();
            ce(n3) ? oe = setTimeout(e4, 2500) : (re = n3, oe = void 0);
          };
          e4();
        }
      }(), function() {
        return t(e3, void 0, void 0, function() {
          var e4;
          return r2(this, function(n3) {
            switch (n3.label) {
              case 0:
                return ce(e4 = ae()) ? re ? [2, o2([], re)] : N2() ? [
                  4,
                  (t2 = document, (t2.exitFullscreen || t2.msExitFullscreen || t2.mozCancelFullScreen || t2.webkitExitFullscreen).call(t2))
                ] : [3, 2] : [3, 2];
              case 1:
                n3.sent(), e4 = ae(), n3.label = 2;
              case 2:
                return ce(e4) || (re = e4), [2, e4];
            }
            var t2;
          });
        });
      };
    }
    function ae() {
      var e3 = screen;
      return [
        v2(m2(e3.availTop), null),
        v2(m2(e3.width) - m2(e3.availWidth) - v2(m2(e3.availLeft), 0), null),
        v2(m2(e3.height) - m2(e3.availHeight) - v2(m2(e3.availTop), 0), null),
        v2(m2(e3.availLeft), null)
      ];
    }
    function ce(e3) {
      for (var n3 = 0; n3 < 4; ++n3) if (e3[n3]) return false;
      return true;
    }
    function ue(e3) {
      var n3;
      return t(this, void 0, void 0, function() {
        var t2, o3, i3, u3, s3, l3, d3;
        return r2(this, function(r3) {
          switch (r3.label) {
            case 0:
              for (t2 = document, o3 = t2.createElement("div"), i3 = new Array(e3.length), u3 = {}, se(o3), d3 = 0; d3 < e3.length; ++d3)
                "DIALOG" === (s3 = _2(e3[d3])).tagName && s3.show(), se(l3 = t2.createElement("div")), l3.appendChild(s3), o3.appendChild(l3), i3[d3] = s3;
              r3.label = 1;
            case 1:
              return t2.body ? [3, 3] : [4, a2(50)];
            case 2:
              return r3.sent(), [3, 1];
            case 3:
              return t2.body.appendChild(o3), [4, c2()];
            case 4:
              r3.sent();
              try {
                for (d3 = 0; d3 < e3.length; ++d3)
                  i3[d3].offsetParent || (u3[e3[d3]] = true);
              } finally {
                null === (n3 = o3.parentNode) || void 0 === n3 || n3.removeChild(o3);
              }
              return [2, u3];
          }
        });
      });
    }
    function se(e3) {
      e3.style.setProperty("visibility", "hidden", "important"), e3.style.setProperty("display", "block", "important");
    }
    function le(e3) {
      return matchMedia("(inverted-colors: ".concat(e3, ")")).matches;
    }
    function de(e3) {
      return matchMedia("(forced-colors: ".concat(e3, ")")).matches;
    }
    function fe(e3) {
      return matchMedia("(prefers-contrast: ".concat(e3, ")")).matches;
    }
    function me(e3) {
      return matchMedia("(prefers-reduced-motion: ".concat(e3, ")")).matches;
    }
    function ve(e3) {
      return matchMedia("(prefers-reduced-transparency: ".concat(e3, ")")).matches;
    }
    function he(e3) {
      return matchMedia("(dynamic-range: ".concat(e3, ")")).matches;
    }
    var pe = Math, be = function() {
      return 0;
    };
    var ye = {
      default: [],
      apple: [{ font: "-apple-system-body" }],
      serif: [{ fontFamily: "serif" }],
      sans: [{ fontFamily: "sans-serif" }],
      mono: [{ fontFamily: "monospace" }],
      min: [{ fontSize: "1px" }],
      system: [{ fontFamily: "system-ui" }]
    };
    function ge(e3) {
      if (e3 instanceof Error) {
        if ("InvalidAccessError" === e3.name) {
          if (/\bfrom\b.*\binsecure\b/i.test(e3.message)) return -2;
          if (/\bdifferent\b.*\borigin\b.*top.level\b.*\bframe\b/i.test(e3.message))
            return -3;
        }
        if ("SecurityError" === e3.name && /\bthird.party iframes?.*\bnot.allowed\b/i.test(e3.message))
          return -3;
      }
      throw e3;
    }
    var we = /* @__PURE__ */ new Set([
      10752,
      2849,
      2884,
      2885,
      2886,
      2928,
      2929,
      2930,
      2931,
      2932,
      2960,
      2961,
      2962,
      2963,
      2964,
      2965,
      2966,
      2967,
      2968,
      2978,
      3024,
      3042,
      3088,
      3089,
      3106,
      3107,
      32773,
      32777,
      32777,
      32823,
      32824,
      32936,
      32937,
      32938,
      32939,
      32968,
      32969,
      32970,
      32971,
      3317,
      33170,
      3333,
      3379,
      3386,
      33901,
      33902,
      34016,
      34024,
      34076,
      3408,
      3410,
      3411,
      3412,
      3413,
      3414,
      3415,
      34467,
      34816,
      34817,
      34818,
      34819,
      34877,
      34921,
      34930,
      35660,
      35661,
      35724,
      35738,
      35739,
      36003,
      36004,
      36005,
      36347,
      36348,
      36349,
      37440,
      37441,
      37443,
      7936,
      7937,
      7938
    ]), Le = /* @__PURE__ */ new Set([
      34047,
      35723,
      36063,
      34852,
      34853,
      34854,
      34229,
      36392,
      36795,
      38449
    ]), ke = ["FRAGMENT_SHADER", "VERTEX_SHADER"], Ve = [
      "LOW_FLOAT",
      "MEDIUM_FLOAT",
      "HIGH_FLOAT",
      "LOW_INT",
      "MEDIUM_INT",
      "HIGH_INT"
    ], Se = "WEBGL_debug_renderer_info";
    function We(e3) {
      if (e3.webgl) return e3.webgl.context;
      var n3, t2 = document.createElement("canvas");
      t2.addEventListener("webglCreateContextError", function() {
        return n3 = void 0;
      });
      for (var r3 = 0, o3 = ["webgl", "experimental-webgl"]; r3 < o3.length; r3++) {
        var i3 = o3[r3];
        try {
          n3 = t2.getContext(i3);
        } catch (a3) {
        }
        if (n3) break;
      }
      return e3.webgl = { context: n3 }, n3;
    }
    function Ze(e3, n3, t2) {
      var r3 = e3.getShaderPrecisionFormat(e3[n3], e3[t2]);
      return r3 ? [r3.rangeMin, r3.rangeMax, r3.precision] : [];
    }
    function xe(e3) {
      return Object.keys(e3.__proto__).filter(Me);
    }
    function Me(e3) {
      return "string" == typeof e3 && !e3.match(/[^A-Z0-9_x]/);
    }
    function Fe() {
      return H();
    }
    function Re(e3) {
      return "function" == typeof e3.getParameter;
    }
    var Ge = {
      fonts: function() {
        var e3 = this;
        return T2(function(n3, o3) {
          var i3 = o3.document;
          return t(e3, void 0, void 0, function() {
            var e4, n4, t2, o4, a3, u3, s3, l3, d3, f3, m3;
            return r2(this, function(r3) {
              switch (r3.label) {
                case 0:
                  return (e4 = i3.body).style.fontSize = "48px", (n4 = i3.createElement("div")).style.setProperty(
                    "visibility",
                    "hidden",
                    "important"
                  ), t2 = {}, o4 = {}, a3 = function(e5) {
                    var t3 = i3.createElement("span"), r4 = t3.style;
                    return r4.position = "absolute", r4.top = "0", r4.left = "0", r4.fontFamily = e5, t3.textContent = "mmMwWLliI0O&1", n4.appendChild(t3), t3;
                  }, u3 = function(e5, n5) {
                    return a3("'".concat(e5, "',").concat(n5));
                  }, s3 = function() {
                    for (var e5 = {}, n5 = function(n6) {
                      e5[n6] = K.map(function(e6) {
                        return u3(n6, e6);
                      });
                    }, t3 = 0, r4 = q; t3 < r4.length; t3++) {
                      n5(r4[t3]);
                    }
                    return e5;
                  }, l3 = function(e5) {
                    return K.some(function(n5, r4) {
                      return e5[r4].offsetWidth !== t2[n5] || e5[r4].offsetHeight !== o4[n5];
                    });
                  }, d3 = function() {
                    return K.map(a3);
                  }(), f3 = s3(), e4.appendChild(n4), [4, c2()];
                case 1:
                  for (r3.sent(), m3 = 0; m3 < K.length; m3++)
                    t2[K[m3]] = d3[m3].offsetWidth, o4[K[m3]] = d3[m3].offsetHeight;
                  return [
                    2,
                    q.filter(function(e5) {
                      return l3(f3[e5]);
                    })
                  ];
              }
            });
          });
        });
      },
      domBlockers: function(e3) {
        var n3 = (void 0 === e3 ? {} : e3).debug;
        return t(this, void 0, void 0, function() {
          var e4, t2, o3, i3, a3;
          return r2(this, function(r3) {
            switch (r3.label) {
              case 0:
                return P2() || J() ? (c3 = atob, e4 = {
                  abpIndo: [
                    "#Iklan-Melayang",
                    "#Kolom-Iklan-728",
                    "#SidebarIklan-wrapper",
                    '[title="ALIENBOLA" i]',
                    c3("I0JveC1CYW5uZXItYWRz")
                  ],
                  abpvn: [
                    ".quangcao",
                    "#mobileCatfish",
                    c3("LmNsb3NlLWFkcw=="),
                    '[id^="bn_bottom_fixed_"]',
                    "#pmadv"
                  ],
                  adBlockFinland: [
                    ".mainostila",
                    c3("LnNwb25zb3JpdA=="),
                    ".ylamainos",
                    c3("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"),
                    c3("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")
                  ],
                  adBlockPersian: [
                    "#navbar_notice_50",
                    ".kadr",
                    'TABLE[width="140px"]',
                    "#divAgahi",
                    c3("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd")
                  ],
                  adBlockWarningRemoval: [
                    "#adblock-honeypot",
                    ".adblocker-root",
                    ".wp_adblock_detect",
                    c3("LmhlYWRlci1ibG9ja2VkLWFk"),
                    c3("I2FkX2Jsb2NrZXI=")
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
                    c3("I2FkXzMwMFgyNTA="),
                    c3("I2Jhbm5lcmZsb2F0MjI="),
                    c3("I2NhbXBhaWduLWJhbm5lcg=="),
                    c3("I0FkLUNvbnRlbnQ=")
                  ],
                  adGuardChinese: [
                    c3("LlppX2FkX2FfSA=="),
                    c3("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"),
                    "#widget-quan",
                    c3("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"),
                    c3("YVtocmVmKj0iLjE5NTZobC5jb20vIl0=")
                  ],
                  adGuardFrench: [
                    "#pavePub",
                    c3("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"),
                    ".mobile_adhesion",
                    ".widgetadv",
                    c3("LmFkc19iYW4=")
                  ],
                  adGuardGerman: ['aside[data-portal-id="leaderboard"]'],
                  adGuardJapanese: [
                    "#kauli_yad_1",
                    c3("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="),
                    c3("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="),
                    c3("LmFkZ29vZ2xl"),
                    c3("Ll9faXNib29zdFJldHVybkFk")
                  ],
                  adGuardMobile: [
                    c3("YW1wLWF1dG8tYWRz"),
                    c3("LmFtcF9hZA=="),
                    'amp-embed[type="24smi"]',
                    "#mgid_iframe1",
                    c3("I2FkX2ludmlld19hcmVh")
                  ],
                  adGuardRussian: [
                    c3("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="),
                    c3("LnJlY2xhbWE="),
                    'div[id^="smi2adblock"]',
                    c3("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"),
                    "#psyduckpockeball"
                  ],
                  adGuardSocial: [
                    c3(
                      "YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="
                    ),
                    c3("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="),
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
                    c3("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="),
                    c3(
                      "YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="
                    ),
                    c3("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="),
                    "#top100counter"
                  ],
                  adGuardTurkish: [
                    "#backkapat",
                    c3("I3Jla2xhbWk="),
                    c3("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="),
                    c3("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"),
                    c3("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")
                  ],
                  bulgarian: [
                    c3("dGQjZnJlZW5ldF90YWJsZV9hZHM="),
                    "#ea_intext_div",
                    ".lapni-pop-over",
                    "#xenium_hot_offers"
                  ],
                  easyList: [
                    ".yb-floorad",
                    c3("LndpZGdldF9wb19hZHNfd2lkZ2V0"),
                    c3("LnRyYWZmaWNqdW5reS1hZA=="),
                    ".textad_headline",
                    c3("LnNwb25zb3JlZC10ZXh0LWxpbmtz")
                  ],
                  easyListChina: [
                    c3("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="),
                    c3("LmZyb250cGFnZUFkdk0="),
                    "#taotaole",
                    "#aafoot.top_box",
                    ".cfa_popup"
                  ],
                  easyListCookie: [
                    ".ezmob-footer",
                    ".cc-CookieWarning",
                    "[data-cookie-number]",
                    c3("LmF3LWNvb2tpZS1iYW5uZXI="),
                    ".sygnal24-gdpr-modal-wrap"
                  ],
                  easyListCzechSlovak: [
                    "#onlajny-stickers",
                    c3("I3Jla2xhbW5pLWJveA=="),
                    c3("LnJla2xhbWEtbWVnYWJvYXJk"),
                    ".sklik",
                    c3("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")
                  ],
                  easyListDutch: [
                    c3("I2FkdmVydGVudGll"),
                    c3("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="),
                    ".adstekst",
                    c3("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="),
                    "#semilo-lrectangle"
                  ],
                  easyListGermany: [
                    "#SSpotIMPopSlider",
                    c3("LnNwb25zb3JsaW5rZ3J1ZW4="),
                    c3("I3dlcmJ1bmdza3k="),
                    c3("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"),
                    c3("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=")
                  ],
                  easyListItaly: [
                    c3("LmJveF9hZHZfYW5udW5jaQ=="),
                    ".sb-box-pubbliredazionale",
                    c3(
                      "YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"
                    ),
                    c3("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"),
                    c3(
                      "YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ=="
                    )
                  ],
                  easyListLithuania: [
                    c3("LnJla2xhbW9zX3RhcnBhcw=="),
                    c3("LnJla2xhbW9zX251b3JvZG9z"),
                    c3("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"),
                    c3("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"),
                    c3("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")
                  ],
                  estonian: [
                    c3("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")
                  ],
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
                    c3(
                      "YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="
                    ),
                    c3("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="),
                    "article.category-samarbete",
                    c3("ZGl2LmhvbGlkQWRz"),
                    "ul.adsmodern"
                  ],
                  greekAdBlock: [
                    c3("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"),
                    c3(
                      "QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="
                    ),
                    c3(
                      "QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"
                    ),
                    "DIV.agores300",
                    "TABLE.advright"
                  ],
                  hungarian: [
                    "#cemp_doboz",
                    ".optimonk-iframe-container",
                    c3("LmFkX19tYWlu"),
                    c3("W2NsYXNzKj0iR29vZ2xlQWRzIl0="),
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
                    c3(
                      "QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ=="
                    )
                  ],
                  latvian: [
                    c3(
                      "YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="
                    ),
                    c3(
                      "YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ=="
                    )
                  ],
                  listKr: [
                    c3("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="),
                    c3("I2xpdmVyZUFkV3JhcHBlcg=="),
                    c3("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="),
                    c3("aW5zLmZhc3R2aWV3LWFk"),
                    ".revenue_unit_item.dable"
                  ],
                  listeAr: [
                    c3("LmdlbWluaUxCMUFk"),
                    ".right-and-left-sponsers",
                    c3("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="),
                    c3("YVtocmVmKj0iYm9vcmFxLm9yZyJd"),
                    c3("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")
                  ],
                  listeFr: [
                    c3("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="),
                    c3("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="),
                    c3("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="),
                    ".site-pub-interstitiel",
                    'div[id^="crt-"][data-criteo-id]'
                  ],
                  officialPolish: [
                    "#ceneo-placeholder-ceneo-12",
                    c3("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"),
                    c3(
                      "YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="
                    ),
                    c3(
                      "YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="
                    ),
                    c3("ZGl2I3NrYXBpZWNfYWQ=")
                  ],
                  ro: [
                    c3(
                      "YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"
                    ),
                    c3(
                      "YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"
                    ),
                    c3(
                      "YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="
                    ),
                    c3("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"),
                    'a[href^="/url/"]'
                  ],
                  ruAd: [
                    c3("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"),
                    c3("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="),
                    c3("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="),
                    "#pgeldiz",
                    ".yandex-rtb-block"
                  ],
                  thaiAds: [
                    "a[href*=macau-uta-popup]",
                    c3("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="),
                    c3("LmFkczMwMHM="),
                    ".bumq",
                    ".img-kosana"
                  ],
                  webAnnoyancesUltralist: [
                    "#mod-social-share-2",
                    "#social-tools",
                    c3("LmN0cGwtZnVsbGJhbm5lcg=="),
                    ".zergnet-recommend",
                    ".yt.btn-link.btn-md.btn"
                  ]
                }, t2 = Object.keys(e4), [
                  4,
                  ue(
                    (a3 = []).concat.apply(
                      a3,
                      t2.map(function(n4) {
                        return e4[n4];
                      })
                    )
                  )
                ]) : [2, void 0];
              case 1:
                return o3 = r3.sent(), n3 && function(e5, n4) {
                  for (var t3 = "DOM blockers debug:\n```", r4 = 0, o4 = Object.keys(e5); r4 < o4.length; r4++) {
                    var i4 = o4[r4];
                    t3 += "\n".concat(i4, ":");
                    for (var a4 = 0, c4 = e5[i4]; a4 < c4.length; a4++) {
                      var u3 = c4[a4];
                      t3 += "\n  ".concat(n4[u3] ? "🚫" : "➡️", " ").concat(u3);
                    }
                  }
                  console.log("".concat(t3, "\n```"));
                }(e4, o3), (i3 = t2.filter(function(n4) {
                  var t3 = e4[n4];
                  return h2(
                    t3.map(function(e5) {
                      return o3[e5];
                    })
                  ) > 0.6 * t3.length;
                })).sort(), [2, i3];
            }
            var c3;
          });
        });
      },
      fontPreferences: function() {
        return function(e3, n3) {
          void 0 === n3 && (n3 = 4e3);
          return T2(function(t2, r3) {
            var i3 = r3.document, a3 = i3.body, c3 = a3.style;
            c3.width = "".concat(n3, "px"), c3.webkitTextSizeAdjust = c3.textSizeAdjust = "none", X() ? a3.style.zoom = "".concat(1 / r3.devicePixelRatio) : P2() && (a3.style.zoom = "reset");
            var u3 = i3.createElement("div");
            return u3.textContent = o2([], Array(n3 / 20 << 0)).map(function() {
              return "word";
            }).join(" "), a3.appendChild(u3), e3(i3, a3);
          }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">');
        }(function(e3, n3) {
          for (var t2 = {}, r3 = {}, o3 = 0, i3 = Object.keys(ye); o3 < i3.length; o3++) {
            var a3 = i3[o3], c3 = ye[a3], u3 = c3[0], s3 = void 0 === u3 ? {} : u3, l3 = c3[1], d3 = void 0 === l3 ? "mmMwWLliI0fiflO&1" : l3, f3 = e3.createElement("span");
            f3.textContent = d3, f3.style.whiteSpace = "nowrap";
            for (var m3 = 0, v3 = Object.keys(s3); m3 < v3.length; m3++) {
              var h3 = v3[m3], p2 = s3[h3];
              void 0 !== p2 && (f3.style[h3] = p2);
            }
            t2[a3] = f3, n3.append(e3.createElement("br"), f3);
          }
          for (var b2 = 0, y3 = Object.keys(ye); b2 < y3.length; b2++) {
            r3[a3 = y3[b2]] = t2[a3].getBoundingClientRect().width;
          }
          return r3;
        });
      },
      audio: function() {
        return t(this, void 0, void 0, function() {
          var e3;
          return r2(this, function(n3) {
            switch (n3.label) {
              case 0:
                return [4, B2()];
              case 1:
                return e3 = n3.sent(), [
                  2,
                  function() {
                    return function(e4, n4) {
                      if (0 === e4) return e4;
                      var t2 = Math.floor(Math.log10(Math.abs(e4))) - Math.floor(n4) + 1, r3 = Math.pow(10, -t2) * (10 * n4 % 10);
                      return Math.round(e4 * r3) / r3;
                    }(e3(), 6.2);
                  }
                ];
            }
          });
        });
      },
      screenFrame: function() {
        var e3 = this;
        if (P2() && A2() && E2())
          return function() {
            return Promise.resolve(void 0);
          };
        var n3 = ie();
        return function() {
          return t(e3, void 0, void 0, function() {
            var e4, t2;
            return r2(this, function(r3) {
              switch (r3.label) {
                case 0:
                  return [4, n3()];
                case 1:
                  return e4 = r3.sent(), [
                    2,
                    [
                      (t2 = function(e5) {
                        return null === e5 ? null : p(e5, 10);
                      })(e4[0]),
                      t2(e4[1]),
                      t2(e4[2]),
                      t2(e4[3])
                    ]
                  ];
              }
            });
          });
        };
      },
      canvas: function() {
        return $(P2() && A2() && E2());
      },
      osCpu: function() {
        return navigator.oscpu;
      },
      languages: function() {
        var e3, n3 = navigator, t2 = [], r3 = n3.language || n3.userLanguage || n3.browserLanguage || n3.systemLanguage;
        if (void 0 !== r3 && t2.push([r3]), Array.isArray(n3.languages))
          X() && h2([
            !("MediaSettingsRange" in (e3 = window)),
            "RTCEncodedAudioFrame" in e3,
            "" + e3.Intl == "[object Intl]",
            "" + e3.Reflect == "[object Reflect]"
          ]) >= 3 || t2.push(n3.languages);
        else if ("string" == typeof n3.languages) {
          var o3 = n3.languages;
          o3 && t2.push(o3.split(","));
        }
        return t2;
      },
      colorDepth: function() {
        return window.screen.colorDepth;
      },
      deviceMemory: function() {
        return v2(m2(navigator.deviceMemory), void 0);
      },
      screenResolution: function() {
        if (!(P2() && A2() && E2())) return te();
      },
      hardwareConcurrency: function() {
        return v2(f2(navigator.hardwareConcurrency), void 0);
      },
      timezone: function() {
        var e3, n3 = null === (e3 = window.Intl) || void 0 === e3 ? void 0 : e3.DateTimeFormat;
        if (n3) {
          var t2 = new n3().resolvedOptions().timeZone;
          if (t2) return t2;
        }
        var r3, o3 = (r3 = (/* @__PURE__ */ new Date()).getFullYear(), -Math.max(
          m2(new Date(r3, 0, 1).getTimezoneOffset()),
          m2(new Date(r3, 6, 1).getTimezoneOffset())
        ));
        return "UTC".concat(o3 >= 0 ? "+" : "").concat(o3);
      },
      sessionStorage: function() {
        try {
          return !!window.sessionStorage;
        } catch (e3) {
          return true;
        }
      },
      localStorage: function() {
        try {
          return !!window.localStorage;
        } catch (e3) {
          return true;
        }
      },
      indexedDB: function() {
        if (!Y() && !j2())
          try {
            return !!window.indexedDB;
          } catch (e3) {
            return true;
          }
      },
      openDatabase: function() {
        return !!window.openDatabase;
      },
      cpuClass: function() {
        return navigator.cpuClass;
      },
      platform: function() {
        var e3 = navigator.platform;
        return "MacIntel" === e3 && P2() && !C2() ? function() {
          if ("iPad" === navigator.platform) return true;
          var e4 = screen, n3 = e4.width / e4.height;
          return h2([
            "MediaSource" in window,
            !!Element.prototype.webkitRequestFullscreen,
            n3 > 0.65 && n3 < 1.53
          ]) >= 2;
        }() ? "iPad" : "iPhone" : e3;
      },
      plugins: function() {
        var e3 = navigator.plugins;
        if (e3) {
          for (var n3 = [], t2 = 0; t2 < e3.length; ++t2) {
            var r3 = e3[t2];
            if (r3) {
              for (var o3 = [], i3 = 0; i3 < r3.length; ++i3) {
                var a3 = r3[i3];
                o3.push({ type: a3.type, suffixes: a3.suffixes });
              }
              n3.push({ name: r3.name, description: r3.description, mimeTypes: o3 });
            }
          }
          return n3;
        }
      },
      touchSupport: function() {
        var e3, n3 = navigator, t2 = 0;
        void 0 !== n3.maxTouchPoints ? t2 = f2(n3.maxTouchPoints) : void 0 !== n3.msMaxTouchPoints && (t2 = n3.msMaxTouchPoints);
        try {
          document.createEvent("TouchEvent"), e3 = true;
        } catch (r3) {
          e3 = false;
        }
        return {
          maxTouchPoints: t2,
          touchEvent: e3,
          touchStart: "ontouchstart" in window
        };
      },
      vendor: function() {
        return navigator.vendor || "";
      },
      vendorFlavors: function() {
        for (var e3 = [], n3 = 0, t2 = [
          "chrome",
          "safari",
          "__crWeb",
          "__gCrWeb",
          "yandex",
          "__yb",
          "__ybro",
          "__firefox__",
          "__edgeTrackingPreventionStatistics",
          "webkit",
          "oprt",
          "samsungAr",
          "ucweb",
          "UCShellJava",
          "puffinDevice"
        ]; n3 < t2.length; n3++) {
          var r3 = t2[n3], o3 = window[r3];
          o3 && "object" == typeof o3 && e3.push(r3);
        }
        return e3.sort();
      },
      cookiesEnabled: function() {
        var e3 = document;
        try {
          e3.cookie = "cookietest=1; SameSite=Strict;";
          var n3 = -1 !== e3.cookie.indexOf("cookietest=");
          return e3.cookie = "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT", n3;
        } catch (t2) {
          return false;
        }
      },
      colorGamut: function() {
        for (var e3 = 0, n3 = ["rec2020", "p3", "srgb"]; e3 < n3.length; e3++) {
          var t2 = n3[e3];
          if (matchMedia("(color-gamut: ".concat(t2, ")")).matches) return t2;
        }
      },
      invertedColors: function() {
        return !!le("inverted") || !le("none") && void 0;
      },
      forcedColors: function() {
        return !!de("active") || !de("none") && void 0;
      },
      monochrome: function() {
        if (matchMedia("(min-monochrome: 0)").matches) {
          for (var e3 = 0; e3 <= 100; ++e3)
            if (matchMedia("(max-monochrome: ".concat(e3, ")")).matches) return e3;
          throw new Error("Too high value");
        }
      },
      contrast: function() {
        return fe("no-preference") ? 0 : fe("high") || fe("more") ? 1 : fe("low") || fe("less") ? -1 : fe("forced") ? 10 : void 0;
      },
      reducedMotion: function() {
        return !!me("reduce") || !me("no-preference") && void 0;
      },
      reducedTransparency: function() {
        return !!ve("reduce") || !ve("no-preference") && void 0;
      },
      hdr: function() {
        return !!he("high") || !he("standard") && void 0;
      },
      math: function() {
        var e3, n3 = pe.acos || be, t2 = pe.acosh || be, r3 = pe.asin || be, o3 = pe.asinh || be, i3 = pe.atanh || be, a3 = pe.atan || be, c3 = pe.sin || be, u3 = pe.sinh || be, s3 = pe.cos || be, l3 = pe.cosh || be, d3 = pe.tan || be, f3 = pe.tanh || be, m3 = pe.exp || be, v3 = pe.expm1 || be, h3 = pe.log1p || be;
        return {
          acos: n3(0.12312423423423424),
          acosh: t2(1e308),
          acoshPf: (e3 = 1e154, pe.log(e3 + pe.sqrt(e3 * e3 - 1))),
          asin: r3(0.12312423423423424),
          asinh: o3(1),
          asinhPf: function(e4) {
            return pe.log(e4 + pe.sqrt(e4 * e4 + 1));
          }(1),
          atanh: i3(0.5),
          atanhPf: function(e4) {
            return pe.log((1 + e4) / (1 - e4)) / 2;
          }(0.5),
          atan: a3(0.5),
          sin: c3(-1e300),
          sinh: u3(1),
          sinhPf: function(e4) {
            return pe.exp(e4) - 1 / pe.exp(e4) / 2;
          }(1),
          cos: s3(10.000000000123),
          cosh: l3(1),
          coshPf: function(e4) {
            return (pe.exp(e4) + 1 / pe.exp(e4)) / 2;
          }(1),
          tan: d3(-1e300),
          tanh: f3(1),
          tanhPf: function(e4) {
            return (pe.exp(2 * e4) - 1) / (pe.exp(2 * e4) + 1);
          }(1),
          exp: m3(1),
          expm1: v3(1),
          expm1Pf: function(e4) {
            return pe.exp(e4) - 1;
          }(1),
          log1p: h3(10),
          log1pPf: function(e4) {
            return pe.log(1 + e4);
          }(10),
          powPI: function(e4) {
            return pe.pow(pe.PI, e4);
          }(-100)
        };
      },
      pdfViewerEnabled: function() {
        return navigator.pdfViewerEnabled;
      },
      architecture: function() {
        var e3 = new Float32Array(1), n3 = new Uint8Array(e3.buffer);
        return e3[0] = 1 / 0, e3[0] = e3[0] - e3[0], n3[3];
      },
      applePay: function() {
        var e3 = window.ApplePaySession;
        if ("function" != typeof (null == e3 ? void 0 : e3.canMakePayments))
          return -1;
        try {
          return e3.canMakePayments() ? 1 : 0;
        } catch (n3) {
          return ge(n3);
        }
      },
      privateClickMeasurement: function() {
        var e3, n3 = document.createElement("a"), t2 = null !== (e3 = n3.attributionSourceId) && void 0 !== e3 ? e3 : n3.attributionsourceid;
        return void 0 === t2 ? void 0 : String(t2);
      },
      webGlBasics: function(e3) {
        var n3, t2, r3, o3, i3, a3, c3 = We(e3.cache);
        if (!c3) return -1;
        if (!Re(c3)) return -2;
        var u3 = Fe() ? null : c3.getExtension(Se);
        return {
          version: (null === (n3 = c3.getParameter(c3.VERSION)) || void 0 === n3 ? void 0 : n3.toString()) || "",
          vendor: (null === (t2 = c3.getParameter(c3.VENDOR)) || void 0 === t2 ? void 0 : t2.toString()) || "",
          vendorUnmasked: u3 ? null === (r3 = c3.getParameter(u3.UNMASKED_VENDOR_WEBGL)) || void 0 === r3 ? void 0 : r3.toString() : "",
          renderer: (null === (o3 = c3.getParameter(c3.RENDERER)) || void 0 === o3 ? void 0 : o3.toString()) || "",
          rendererUnmasked: u3 ? null === (i3 = c3.getParameter(u3.UNMASKED_RENDERER_WEBGL)) || void 0 === i3 ? void 0 : i3.toString() : "",
          shadingLanguageVersion: (null === (a3 = c3.getParameter(c3.SHADING_LANGUAGE_VERSION)) || void 0 === a3 ? void 0 : a3.toString()) || ""
        };
      },
      webGlExtensions: function(e3) {
        var n3 = We(e3.cache);
        if (!n3) return -1;
        if (!Re(n3)) return -2;
        var t2 = n3.getSupportedExtensions(), r3 = n3.getContextAttributes(), o3 = [], i3 = [], a3 = [], c3 = [];
        if (r3)
          for (var u3 = 0, s3 = Object.keys(r3); u3 < s3.length; u3++) {
            var l3 = s3[u3];
            o3.push("".concat(l3, "=").concat(r3[l3]));
          }
        for (var d3 = 0, f3 = xe(n3); d3 < f3.length; d3++) {
          var m3 = n3[w3 = f3[d3]];
          i3.push(
            "".concat(w3, "=").concat(m3).concat(we.has(m3) ? "=".concat(n3.getParameter(m3)) : "")
          );
        }
        if (t2)
          for (var v3 = 0, h3 = t2; v3 < h3.length; v3++) {
            var p2 = h3[v3];
            if (!(p2 === Se && Fe() || "WEBGL_polygon_mode" === p2 && (X() || P2()))) {
              var b2 = n3.getExtension(p2);
              if (b2)
                for (var y3 = 0, g3 = xe(b2); y3 < g3.length; y3++) {
                  var w3;
                  m3 = b2[w3 = g3[y3]];
                  a3.push(
                    "".concat(w3, "=").concat(m3).concat(Le.has(m3) ? "=".concat(n3.getParameter(m3)) : "")
                  );
                }
            }
          }
        for (var L3 = 0, k3 = ke; L3 < k3.length; L3++)
          for (var V2 = k3[L3], S3 = 0, W2 = Ve; S3 < W2.length; S3++) {
            var Z2 = W2[S3], x3 = Ze(n3, V2, Z2);
            c3.push("".concat(V2, ".").concat(Z2, "=").concat(x3.join(",")));
          }
        return a3.sort(), i3.sort(), {
          contextAttributes: o3,
          parameters: i3,
          shaderPrecisions: c3,
          extensions: t2,
          extensionParameters: a3
        };
      }
    };
    function Ie(e3) {
      var n3 = function(e4) {
        if (J()) return 0.4;
        if (P2()) return !C2() || A2() && E2() ? 0.3 : 0.5;
        var n4 = "value" in e4.platform ? e4.platform.value : "";
        if (/^Win/.test(n4)) return 0.6;
        if (/^Mac/.test(n4)) return 0.5;
        return 0.7;
      }(e3), t2 = function(e4) {
        return p(0.99 + 0.01 * e4, 1e-4);
      }(n3);
      return {
        score: n3,
        comment: "$ if upgrade to Pro: https://fpjs.dev/pro".replace(
          /\$/g,
          "".concat(t2)
        )
      };
    }
    function Ye(e3) {
      return JSON.stringify(
        e3,
        function(e4, t2) {
          return t2 instanceof Error ? n2(
            {
              name: (r3 = t2).name,
              message: r3.message,
              stack: null === (o3 = r3.stack) || void 0 === o3 ? void 0 : o3.split("\n")
            },
            r3
          ) : t2;
          var r3, o3;
        },
        2
      );
    }
    function je(e3) {
      return R2(
        function(e4) {
          for (var n3 = "", t2 = 0, r3 = Object.keys(e4).sort(); t2 < r3.length; t2++) {
            var o3 = r3[t2], i3 = e4[o3], a3 = "error" in i3 ? "error" : JSON.stringify(i3.value);
            n3 += "".concat(n3 ? "|" : "").concat(o3.replace(/([:|\\])/g, "\\$1"), ":").concat(a3);
          }
          return n3;
        }(e3)
      );
    }
    function Xe(e3) {
      return void 0 === e3 && (e3 = 50), function(e4, n3) {
        void 0 === n3 && (n3 = 1 / 0);
        var t2 = window.requestIdleCallback;
        return t2 ? new Promise(function(e5) {
          return t2.call(
            window,
            function() {
              return e5();
            },
            { timeout: n3 }
          );
        }) : a2(Math.min(e4, n3));
      }(e3, 2 * e3);
    }
    function Pe(e3, n3) {
      var o3 = Date.now();
      return {
        get: function(a3) {
          return t(this, void 0, void 0, function() {
            var t2, c3, u3;
            return r2(this, function(r3) {
              switch (r3.label) {
                case 0:
                  return t2 = Date.now(), [4, e3()];
                case 1:
                  return c3 = r3.sent(), u3 = function(e4) {
                    var n4;
                    return {
                      get visitorId() {
                        return void 0 === n4 && (n4 = je(this.components)), n4;
                      },
                      set visitorId(e5) {
                        n4 = e5;
                      },
                      confidence: Ie(e4),
                      components: e4,
                      version: i2
                    };
                  }(c3), (n3 || (null == a3 ? void 0 : a3.debug)) && console.log(
                    "Copy the text below to get the debug data:\n\n```\nversion: ".concat(u3.version, "\nuserAgent: ").concat(
                      navigator.userAgent,
                      "\ntimeBetweenLoadAndGet: "
                    ).concat(t2 - o3, "\nvisitorId: ").concat(u3.visitorId, "\ncomponents: ").concat(Ye(c3), "\n```")
                  ), [2, u3];
              }
            });
          });
        }
      };
    }
    function Ce(e3) {
      var n3;
      return void 0 === e3 && (e3 = {}), t(this, void 0, void 0, function() {
        var t2, o3, a3;
        return r2(this, function(r3) {
          switch (r3.label) {
            case 0:
              return (null === (n3 = e3.monitoring) || void 0 === n3 || n3) && function() {
                if (!(window.__fpjs_d_m || Math.random() >= 1e-3))
                  try {
                    var e4 = new XMLHttpRequest();
                    e4.open(
                      "get",
                      "https://m1.openfpcdn.io/fingerprintjs/v".concat(
                        i2,
                        "/npm-monitoring"
                      ),
                      true
                    ), e4.send();
                  } catch (n4) {
                    console.error(n4);
                  }
              }(), t2 = e3.delayFallback, o3 = e3.debug, [4, Xe(t2)];
            case 1:
              return r3.sent(), a3 = function(e4) {
                return I2(Ge, e4, []);
              }({ cache: {}, debug: o3 }), [2, Pe(a3, o3)];
          }
        });
      });
    }
    var Ee = { load: Ce, hashComponents: je, componentsToDebugString: Ye }, He = R2;
    return e2.componentsToDebugString = Ye, e2.default = Ee, e2.doesBrowserSuspendAudioContext = O2, e2.getFullscreenElement = N2, e2.getUnstableAudioFingerprint = B2, e2.getUnstableCanvasFingerprint = $, e2.getUnstableScreenFrame = ie, e2.getUnstableScreenResolution = te, e2.getWebGLContext = We, e2.handleApplePayError = ge, e2.hashComponents = je, e2.isAndroid = J, e2.isChromium = X, e2.isDesktopWebKit = C2, e2.isEdgeHTML = j2, e2.isGecko = H, e2.isTrident = Y, e2.isWebKit = P2, e2.load = Ce, e2.loadSources = I2, e2.murmurX64Hash128 = He, e2.prepareForSources = Xe, e2.renderAudio = Q, e2.sources = Ge, e2.transformSource = function(e3, n3) {
      var t2 = function(e4) {
        return G2(e4) ? n3(e4) : function() {
          var t3 = e4();
          return u2(t3) ? t3.then(n3) : n3(t3);
        };
      };
      return function(n4) {
        var r3 = e3(n4);
        return u2(r3) ? r3.then(t2) : t2(r3);
      };
    }, e2.withIframe = T2, Object.defineProperty(e2, "__esModule", { value: true }), e2;
  }({});
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
  function getUserMobileValue() {
    return LocalStorageService.directGet(CONSTANTS.USER_MOBILE_KEY);
  }
  function setUserMobileValue(value) {
    LocalStorageService.directSet(CONSTANTS.USER_MOBILE_KEY, value);
  }
  function getUWID() {
    return LocalStorageService.get(CONSTANTS.UWID);
  }
  function setUWID(value) {
    LocalStorageService.set(CONSTANTS.UWID, value);
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
    getUserMobileValue,
    setUserMobileValue,
    getUWID,
    setUWID
  };
  function e(e2, r2, n2, t) {
    return new (n2 || (n2 = Promise))(function(o2, a2) {
      function i2(e3) {
        try {
          c2(t.next(e3));
        } catch (e4) {
          a2(e4);
        }
      }
      function u2(e3) {
        try {
          c2(t.throw(e3));
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
      c2((t = t.apply(e2, [])).next());
    });
  }
  function r(e2, r2) {
    var n2, t, o2, a2, i2 = { label: 0, sent: function() {
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
            if (n2 = 1, t && (o2 = 2 & u4[0] ? t.return : u4[0] ? t.throw || ((o2 = t.return) && o2.call(t), 0) : t.next) && !(o2 = o2.call(t, u4[1])).done) return o2;
            switch (t = 0, o2 && (u4 = [2 & u4[0], o2.value]), u4[0]) {
              case 0:
              case 1:
                o2 = u4;
                break;
              case 4:
                return i2.label++, { value: u4[1], done: false };
              case 5:
                i2.label++, t = u4[1], u4 = [0];
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
            u4 = [6, e3], t = 0;
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
  var o = {}, a = { timeout: "true" }, i = function(e2, r2) {
    "undefined" != typeof window && (o[e2] = r2);
  }, u = function() {
    return Object.fromEntries(Object.entries(o).filter(function(e2) {
      var r2, t = e2[0];
      return !(null === (r2 = null == n ? void 0 : n.exclude) || void 0 === r2 ? void 0 : r2.includes(t));
    }).map(function(e2) {
      return [e2[0], (0, e2[1])()];
    }));
  }, c = 3432918353, s = 461845907, l = 3864292196, d = 2246822507, f = 3266489909;
  function h(e2, r2) {
    return e2 << r2 | e2 >>> 32 - r2;
  }
  function m(e2, r2) {
    void 0 === r2 && (r2 = 0);
    for (var n2 = r2, t = 0, o2 = 3 & e2.length, a2 = e2.length - o2, i2 = 0; i2 < a2; ) t = 255 & e2.charCodeAt(i2) | (255 & e2.charCodeAt(++i2)) << 8 | (255 & e2.charCodeAt(++i2)) << 16 | (255 & e2.charCodeAt(++i2)) << 24, ++i2, t = h(t = Math.imul(t, c), 15), n2 = h(n2 ^= t = Math.imul(t, s), 13), n2 = Math.imul(n2, 5) + l;
    switch (t = 0, o2) {
      case 3:
        t ^= (255 & e2.charCodeAt(i2 + 2)) << 16;
      case 2:
        t ^= (255 & e2.charCodeAt(i2 + 1)) << 8;
      case 1:
        t ^= 255 & e2.charCodeAt(i2), t = h(t = Math.imul(t, c), 15), n2 ^= t = Math.imul(t, s);
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
      var e2, t, o2, i2, c2;
      return r(this, function(r2) {
        switch (r2.label) {
          case 0:
            return r2.trys.push([0, 2, , 3]), e2 = u(), t = Object.keys(e2), [4, g(Object.values(e2), (null == n ? void 0 : n.timeout) || 1e3, a)];
          case 1:
            return o2 = r2.sent(), i2 = o2.filter(function(e3) {
              return void 0 !== e3;
            }), c2 = {}, i2.forEach(function(e3, r3) {
              c2[t[r3]] = e3;
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
    var n2 = {}, t = function(t2) {
      if (e2.hasOwnProperty(t2)) {
        var o3 = e2[t2];
        if ("object" != typeof o3 || Array.isArray(o3)) r2.includes(t2) || (n2[t2] = o3);
        else {
          var a2 = S(o3, r2.map(function(e3) {
            return e3.startsWith(t2 + ".") ? e3.slice(t2.length + 1) : e3;
          }));
          Object.keys(a2).length > 0 && (n2[t2] = a2);
        }
      }
    };
    for (var o2 in e2) t(o2);
    return n2;
  }
  function y(n2) {
    return e(this, void 0, void 0, function() {
      var e2, t;
      return r(this, function(r2) {
        switch (r2.label) {
          case 0:
            return r2.trys.push([0, 2, , 3]), [4, w()];
          case 1:
            return e2 = r2.sent(), t = m(JSON.stringify(e2)), [2, { hash: t.toString(), data: e2 }];
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
    for (var t = [], o2 = 0; o2 < e2[0].data.length; o2++) {
      for (var a2 = [], i2 = 0; i2 < e2.length; i2++) a2.push(e2[i2].data[o2]);
      t.push(M(a2));
    }
    var u2 = new Uint8ClampedArray(t);
    return new ImageData(u2, r2, n2);
  }
  function M(e2) {
    if (0 === e2.length) return 0;
    for (var r2 = {}, n2 = 0, t = e2; n2 < t.length; n2++) {
      r2[a2 = t[n2]] = (r2[a2] || 0) + 1;
    }
    var o2 = e2[0];
    for (var a2 in r2) r2[a2] > r2[o2] && (o2 = parseInt(a2, 10));
    return o2;
  }
  function A() {
    if ("undefined" == typeof navigator) return { name: "unknown", version: "unknown" };
    for (var e2 = navigator.userAgent, r2 = { Edg: "Edge", OPR: "Opera" }, n2 = 0, t = [/(?<name>Edge|Edg)\/(?<version>\d+(?:\.\d+)?)/, /(?<name>(?:Chrome|Chromium|OPR|Opera|Vivaldi|Brave))\/(?<version>\d+(?:\.\d+)?)/, /(?<name>(?:Firefox|Waterfox|Iceweasel|IceCat))\/(?<version>\d+(?:\.\d+)?)/, /(?<name>Safari)\/(?<version>\d+(?:\.\d+)?)/, /(?<name>MSIE|Trident|IEMobile).+?(?<version>\d+(?:\.\d+)?)/, /(?<name>[A-Za-z]+)\/(?<version>\d+(?:\.\d+)?)/, /(?<name>SamsungBrowser)\/(?<version>\d+(?:\.\d+)?)/]; n2 < t.length; n2++) {
      var o2 = t[n2], a2 = e2.match(o2);
      if (a2 && a2.groups) return { name: r2[a2.groups.name] || a2.groups.name, version: a2.groups.version };
    }
    return { name: "unknown", version: "unknown" };
  }
  i("audio", function() {
    return e(this, void 0, void 0, function() {
      return r(this, function(e2) {
        return [2, new Promise(function(e3, r2) {
          try {
            var n2 = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 5e3, 44100), t = n2.createBufferSource(), o2 = n2.createOscillator();
            o2.frequency.value = 1e3;
            var a2, i2 = n2.createDynamicsCompressor();
            i2.threshold.value = -50, i2.knee.value = 40, i2.ratio.value = 12, i2.attack.value = 0, i2.release.value = 0.2, o2.connect(i2), i2.connect(n2.destination), o2.start(), n2.oncomplete = function(r3) {
              a2 = r3.renderedBuffer.getChannelData(0), e3({ sampleHash: E(a2), oscillator: o2.type, maxChannels: n2.destination.maxChannelCount, channelCountMode: t.channelCountMode });
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
          var t = "Random Text WMwmil10Oo";
          r3.font = "23.123px Arial", r3.fillStyle = "black", r3.fillText(t, -5, 15), r3.fillStyle = "rgba(0, 0, 255, 0.5)", r3.fillText(t, -3.3, 17.7), r3.beginPath(), r3.moveTo(0, 0), r3.lineTo(2 * e3.width / 7, e3.height), r3.strokeStyle = "white", r3.lineWidth = 2, r3.stroke();
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
      var t = n2.getExtension("WEBGL_debug_renderer_info");
      return { vendor: (n2.getParameter(n2.VENDOR) || "").toString(), vendorUnmasked: t ? (n2.getParameter(t.UNMASKED_VENDOR_WEBGL) || "").toString() : "", renderer: (n2.getParameter(n2.RENDERER) || "").toString(), rendererUnmasked: t ? (n2.getParameter(t.UNMASKED_RENDERER_WEBGL) || "").toString() : "", version: (n2.getParameter(n2.VERSION) || "").toString(), shadingLanguageVersion: (n2.getParameter(n2.SHADING_LANGUAGE_VERSION) || "").toString() };
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
      var t = function(e3) {
        if (0 === e3.length) return null;
        var r4 = {};
        e3.forEach(function(e4) {
          var n4 = String(e4);
          r4[n4] = (r4[n4] || 0) + 1;
        });
        var n3 = e3[0], t2 = 1;
        return Object.keys(r4).forEach(function(e4) {
          r4[e4] > t2 && (n3 = e4, t2 = r4[e4]);
        }), n3;
      }(e2.map(function(e3) {
        return r3 in e3 ? e3[r3] : void 0;
      }).filter(function(e3) {
        return void 0 !== e3;
      }));
      t && (n2[r3] = t);
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
    return new Promise(function(t, o2) {
      try {
        !function(n3) {
          var t2;
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
                  if ((e2 = document.createElement("iframe")).setAttribute("frameBorder", "0"), (o3 = e2.style).setProperty("position", "fixed"), o3.setProperty("display", "block", "important"), o3.setProperty("visibility", "visible"), o3.setProperty("border", "0"), o3.setProperty("opacity", "0"), e2.src = "about:blank", document.body.appendChild(e2), !(a2 = e2.contentDocument || (null === (t2 = e2.contentWindow) || void 0 === t2 ? void 0 : t2.document))) throw new Error("Iframe document is not accessible");
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
              }), t(i2), [2];
            });
          });
        });
      } catch (e2) {
        o2({ error: "unsupported" });
      }
    });
  }), i("hardware", function() {
    return new Promise(function(e2, r2) {
      var n2 = void 0 !== navigator.deviceMemory ? navigator.deviceMemory : 0, t = window.performance && window.performance.memory ? window.performance.memory : 0;
      e2({ videocard: _(), architecture: D(), deviceMemory: n2.toString() || "undefined", jsHeapSizeLimit: t.jsHeapSizeLimit || 0 });
    });
  }), i("locales", function() {
    return new Promise(function(e2) {
      e2({ languages: navigator.language, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    });
  }), i("permissions", function() {
    return e(this, void 0, void 0, function() {
      var t;
      return r(this, function(o2) {
        return T = (null == n ? void 0 : n.permissions_to_check) || ["accelerometer", "accessibility", "accessibility-events", "ambient-light-sensor", "background-fetch", "background-sync", "bluetooth", "camera", "clipboard-read", "clipboard-write", "device-info", "display-capture", "gyroscope", "geolocation", "local-fonts", "magnetometer", "microphone", "midi", "nfc", "notifications", "payment-handler", "persistent-storage", "push", "speaker", "storage-access", "top-level-storage-access", "window-management", "query"], t = Array.from({ length: (null == n ? void 0 : n.retries) || 3 }, function() {
          return function() {
            return e(this, void 0, void 0, function() {
              var e2, n2, t2, o3, a2;
              return r(this, function(r2) {
                switch (r2.label) {
                  case 0:
                    e2 = {}, n2 = 0, t2 = T, r2.label = 1;
                  case 1:
                    if (!(n2 < t2.length)) return [3, 6];
                    o3 = t2[n2], r2.label = 2;
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
        }), [2, Promise.all(t).then(function(e2) {
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
                var e3 = "\n          attribute vec2 position;\n          void main() {\n              gl_Position = vec4(position, 0.0, 1.0);\n          }\n      ", r3 = "\n          precision mediump float;\n          void main() {\n              gl_FragColor = vec4(0.812, 0.195, 0.553, 0.921); // Set line color\n          }\n      ", n2 = G.createShader(G.VERTEX_SHADER), t = G.createShader(G.FRAGMENT_SHADER);
                if (!n2 || !t) throw new Error("Failed to create shaders");
                if (G.shaderSource(n2, e3), G.shaderSource(t, r3), G.compileShader(n2), !G.getShaderParameter(n2, G.COMPILE_STATUS)) throw new Error("Vertex shader compilation failed: " + G.getShaderInfoLog(n2));
                if (G.compileShader(t), !G.getShaderParameter(t, G.COMPILE_STATUS)) throw new Error("Fragment shader compilation failed: " + G.getShaderInfoLog(t));
                var o2 = G.createProgram();
                if (!o2) throw new Error("Failed to create shader program");
                if (G.attachShader(o2, n2), G.attachShader(o2, t), G.linkProgram(o2), !G.getProgramParameter(o2, G.LINK_STATUS)) throw new Error("Shader program linking failed: " + G.getProgramInfoLog(o2));
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
  var j = function(e2, r2, n2, t) {
    for (var o2 = (n2 - r2) / t, a2 = 0, i2 = 0; i2 < t; i2++) {
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
  function sendEvent(apiData) {
    console.table(apiData);
    if (intersectionInTwoArrays(BLOCKED_CHANNELS, gsService.getChannels()).length === 0) {
      let base_url = "https://universal-cookies-qa-1.kartrocket.com";
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
      [CONSTANTS_MAPPING.UEID]: gsService.getUEID(),
      [CONSTANTS_MAPPING.UMID]: gsService.getUMID()
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
      console.log("Iframe loaded successfully", self.iframe);
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
  let handleMessageEvent = (event) => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (event.origin !== window.location.origin) ;
    switch ((_a2 = event == null ? void 0 : event.data) == null ? void 0 : _a2.name) {
      case MESSAGE_EVENT_LIST.SEND_USER_PROFILE_TO_PARENT: {
        if (((_b = event == null ? void 0 : event.data) == null ? void 0 : _b.data) && Object.keys((_c = event == null ? void 0 : event.data) == null ? void 0 : _c.data).length && !gsService.getUserMobileValue() && FLAGS.OVERRIDE_UC_SESSION) {
          _triggerEvent(EVENTS_NAME.UPDATE_USER_PROFILE, event.data.data);
          if ((_e = (_d = event == null ? void 0 : event.data) == null ? void 0 : _d.data) == null ? void 0 : _e.mobile) {
            gsService.setUserMobileValue((_g = (_f = event == null ? void 0 : event.data) == null ? void 0 : _f.data) == null ? void 0 : _g.mobile);
          }
        }
        break;
      }
      case MESSAGE_EVENT_LIST.SEND_UDID_TO_PARENT: {
        debugger;
        gsService.setUDID((_h = event == null ? void 0 : event.data) == null ? void 0 : _h.data);
      }
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
        let mobileEnumsList = ["mobile", "mobile_no"];
        let emailEnumsList = ["email", "email_id"];
        let isMobileIsPresent = false;
        let isEmailIsPresent = false;
        Object.keys(payload).forEach(async (key) => {
          if (!isMobileIsPresent && mobileEnumsList.includes(key)) {
            isMobileIsPresent = true;
            gsService.setUMID(await get_SHA_256(payload[key]));
          }
          if (!isEmailIsPresent && emailEnumsList.includes(key)) {
            isEmailIsPresent = true;
            gsService.setUEID(await get_SHA_256(payload[key]));
          }
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
  let UFID = "";
  let UWID = "";
  let UTID = "";
  let intervalId = "";
  async function getFingerprintObject() {
    const fp = await FingerprintJS.load({
      apiKey: "w19U95D41ZRuBaTVhebA",
      region: "ap"
    });
    const result = await fp.get();
    return result;
  }
  async function getThumbmarkJs() {
    return y().then((fp) => fp);
  }
  async function onLoad() {
    registerChannelId();
    const FingerprintObject = await getFingerprintObject();
    const ThumbmarkJsObject = await getThumbmarkJs();
    UFID = FingerprintObject == null ? void 0 : FingerprintObject.visitorId;
    UWID = gsService.getUWID(CONSTANTS.UWID);
    UTID = gsService.getUTID(CONSTANTS.UTID);
    if (!UWID) {
      UWID = getRandomUUID();
      gsService.setUWID(UWID);
    }
    if (!UTID) {
      UTID = gsService.setUTID(ThumbmarkJsObject.hash);
    }
    if (gsService.getUFID() && gsService.getUFID() !== UFID) {
      console.info("UFID is changed.");
    }
    gsService.setUFID(UFID);
    _triggerEvent(EVENTS_NAME.ON_LOAD, {});
    intervalId = setInterval(() => {
      triggerExpireEvent(0);
    }, EVENT_AUTO_TRIGGER_TTL * 1e3);
    await createIframe();
    debugger;
    console.log(gsService.getUDID(CONSTANTS.UDID), "gsService.getUDID(CONSTANTS.UDID)");
    getUDIDFromIframe();
    const userMobileValue = gsService.getUserMobileValue();
    if (userMobileValue) {
      getUserData(userMobileValue);
    } else {
      getCookie();
    }
  }
  function registerChannelId() {
    var _a2, _b, _c;
    const script = document.getElementById("uc_shiprocket");
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
    let base_url = "https://universal-cookies-qa-1.kartrocket.com";
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
    initialize: onLoad
  };
  const ua = window.SHIPROCKET_ANALYTICS;
  window.ua = ua;
  exports2.ua = ua;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
