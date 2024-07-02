// @ts-check

const CONSTANTS_BACKUP = {
  UDID: 'UDID',
  UFID: 'UFID',
  PAYLOAD: 'PAYLOAD',
  UTID: 'UTID',
  CHANNEL: 'CHANNEL',
  TRACK_INFO: 'TRACK_INFO',
  UEID: 'UEID',
  UMID: 'UMID',
  USER_PROFILE: '_uc_session',
  USER_MOBILE_KEY: 'sc_mid',
};
const CONSTANTS = {
  UDID: 'udid',
  UFID: 'ufid',
  PAYLOAD: 'payload',
  UTID: 'utid',
  CHANNEL: 'channel',
  TRACK_INFO: 'track_info',
  UEID: 'ueid',
  UMID: 'umid',
  USER_PROFILE: '_uc_session',
  USER_MOBILE_KEY: 'sc_mid',
};
const CONSTANTS_MAPPING = {
  UDID: 'udid',
  UFID: 'ufid',
  PAYLOAD: 'payload',
  UTID: 'utid',
  EVENT_NAME: 'event_name',
  CHANNEL: 'channel',
  URL: 'url',
  UMID: 'umid',
  UEID: 'ueid',
};
const EVENTS_NAME = {
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
};

const CHANNEL_BINARY_VALUE = {
  wigzo: 1,
  promise: 2,
  engage: 4,
  tracking_page: 8,
};
const FLAGS = {
  EVENT_DETAILS_MODE: true,
  CALL_API: true,
  OVERRIDE_UC_SESSION: true,
};
/**
 * @constant {number} EVENT_TTL constant in Seconds.
 * @description This is event time to live. Event will expires after this time.
 * @type number
 */
const EVENT_TTL = 5;
const EVENT_AUTO_TRIGGER_TTL = 10;
const I_FRAME_ID = '__uc_iframe';
/**
 * BLOCKED_CHANNELS will block API call if channel is present in the localstorage .
 * IMP: Make sure to pass string values only
 */
const BLOCKED_CHANNELS = [];
const MESSAGE_EVENT_LIST = {
  GET_USER_PROFILE_FROM_IFRAME: 'getUserProfileFromIframe',
  SET_USER_PROFILE_TO_IFRAME: 'setUserProfileToIframe',
  SEND_USER_PROFILE_TO_PARENT: 'sendUserProfileToParent',
};
const LOCALSTORAGE_KEY = '__uc_site';
export {
  CONSTANTS,
  CONSTANTS_MAPPING,
  EVENTS_NAME,
  CHANNEL_BINARY_VALUE,
  FLAGS,
  EVENT_TTL,
  EVENT_AUTO_TRIGGER_TTL,
  BLOCKED_CHANNELS,
  I_FRAME_ID,
  MESSAGE_EVENT_LIST,
  LOCALSTORAGE_KEY,
};
