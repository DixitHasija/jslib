if (typeof window.wigzo !== "function") {
    var wigzo_x = window.wigzo;
    window.wigzo = function() {
        (window.wigzo.q=window.wigzo.q||[]).push(arguments)
    }

    for (var wigzo_k in wigzo_x) {
        window.wigzo[wigzo_k] = wigzo_x[k];
    }
}


window.wigzo = (function(_module) {

    _module.html = {};

    _module.html.POST_HTML_PERMISSION_MODAL =
        '<div style="position:fixed;top:0px;left:0px;width:100%;height:100%;background:rgba(0, 0, 0, 0.32); z-index: 9999999"> \
            <div style="text-align: center;display:table-cell;vertical-align:middle;"> \
                <div style="position:absolute;top:50%;left:50%;max-width: 400px;transform:translate(-50%,-50%);text-align: center;display:inline-block;width: 100%;box-shadow: none !important;outline: none !important;border: 0 !important;"> \
                    <center> \
                        <div style="color: #000;padding: 15px 15px 0 15px !important;background: #fff;border-radius: 6px 6px 0 0;border: 0 !important;outline: none !important;box-shadow: none !important;"> \
                            <div style="font-size: 25px;line-height: normal;border: 0 !important;text-decoration: none !important;color: #263238 !important;margin: 0 !important;padding: 0 !important;outline: none !important;box-shadow: none !important;">__THANKS_FOR_SUB__</div> \
                        </div> \
                        \
                        <div style="text-align: right !important;display: block !important;position: relative !important;width: auto !important;background: #fff;border: 0 !important;box-shadow: none !important;padding: 5px;margin-top: -1px;"> \
                                    <a href="javascript:;" class="wigzologoclickable" target="_blank" style="display: block !important; text-decoration: none !important;cursor: pointer !important;color: #95A5A6 !important;font-size: 8px !important;line-height: normal;padding: 6px;font-weight: 100 !important;font-family: sans-serif;text-transform: uppercase !important;letter-spacing: 1px;"> Powered by #POWEREDBY# \
                                        <img src="#POWEREDBYLOGO#" style="display: inline-block !important; height: 18px !important;vertical-align: middle !important;padding-right: 0 !important;width: 18px !important;margin-top: -1px;"> \
                                    </a> \
                                </div> \
                         \
                        <a href="javascript:void(0);" class="wig-autoremove" style="color: #fff;text-decoration: none;font-size: 20px;border: 0;box-shadow: none;outline: none;"> \
                            <div style="background: #263238;padding: 20px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;">__CLOSE_NOW_SUB__</div> \
                        </a> \
                    </center> \
                </div> \
            </div> \
        </div>';

    _module.getMarkup = function (markup) {
        markup = markup.replace ("#HOST#", _module.APP);
        markup = _module.__ (markup);   /* For localization */
        markup = markup.replace ("#POWEREDBYLOGO#", _module.ENTITY_FAV_ICON_DARK);
        markup = markup.replace ("#POWEREDBY#", _module.ENTITY_NAME);
        return markup;
    }
    return _module;

}(window.wigzo|| {}));


window.wigzo = (function(_module) {
    _module.l10n = {};

    _module._ = function (text) {
        var langCode = "en";

        var htmlLang = _module.$("html").attr ("lang");
        if (!! htmlLang) {
            langCode = htmlLang.substr(0,2);
        }

        langCode = langCode.toLowerCase();

        _module.consoleDebug ("Using Language: " + langCode);

        var translations = {};
        if (_module.l10n.hasOwnProperty (langCode)) {
            translations = _module.l10n[langCode];
        }

        if (translations.hasOwnProperty (text)) {
            return translations[text];
        }

        if (langCode == "en") {
            _module.consoleDebug("No translation for - " + text + " - in " + langCode + ", Giving up!");
            return "";
        }

        _module.consoleDebug("No translation for - " + text + " - in " + langCode + ", trying English");
        if (_module.l10n.hasOwnProperty ("en")) {
            translations = _module.l10n["en"];
        }
        if (translations.hasOwnProperty (text)) {
            return translations[text];
        }

        _module.consoleDebug ("No translation for - " + text + " - in English, returning empty");
        return "";  /* Nothing found, cannot return anything */
    }

    _module.__ = function (text) {
        var re = /__[A-Z_]+__/g;
        var match;
        var params = {};

        while (match = re.exec (text)) {
            params[match[0]] = true;
        }

        for (var i in params) {
            text = text.replace (new RegExp (i, 'g'), _module._ (i));
        }
        return text;
    }

    return _module;

}(window.wigzo || {}));



/**
 * Created by wigzo on 24/6/17.
 */
window.wigzo = (function (_module) {

    window.addEventListener('message', function (event) {
        if(event.data.type ==='HTTPS' && event.data.registrationData.iframe){
            var data = event.data;
            _module.mapBrowserPushRegistrationId(data.registrationData.registrationId,data.registrationData.browserType,true,"");
            window.removeEventListener("message", function () {console.log('Removed iframe message listener after registeration of the browser');}, false);
        }
    }, false);


    return _module;
}(window.wigzo || {}));

window.wigzo = (function(_module) {

    _module.l10n.en = {
        "__LOGIN.EnterValidEmailAddress__" : "Enter valid Email Address",
        "__LOGIN.EnteryourPassword__" : "Enter Your password",
        "__LOGIN.EnterEmailAddress__" : "Enter your email address",
        "__FORGETPASSWORD.EnterEmailinproperformat__" : "Enter email in proper format",
        "__FORGETPASSWORD.EnterYourEmailId__" : "Enter Your Email id",
        "__REGISTRATION.Enterfirstname__" : "Enter your first name",
        "__REGISTRATION.Entermobilenumber__" : "Enter your mobile number",
        "__REGISTRATION.Entercorrectmobilenumber__" : "Enter correct mobile number",
        "__THANKS_FOR_SUB__": "Thank you for subscribing to push notification",
        "__INCOMPLETE_SUB__": "You have not completed the subscription for notification",
        "__CLOSE_NOW_SUB__": "Close Now",
        "__RESUME_SUB__": "Resume Subscription",
        "__NOT_NOW_SUB__": "Not Now",
        "__EXITINTENT_ENTEREMAILADRESS__" : "Enter Email Address Here",
        "__EXITINTENT_INVALIDEMAIL__": "Enter valid Email Address",
        "__EXITINTENT_ENTERPHONENO__" : "Enter Phone Here",
        "__EXITINTENT_INVALIDPHONE__" : "Enter correct mobile number",
        "__SEGMENTATION_ENTERSEGMENTNAME__" : "Enter Segment Name Here",
        "__SEGMENTATION_ENTERSEGMENTDESCRIPTION__" : "Enter Segment Description"
    }

    return _module;

}(window.wigzo || {}));



window.wigzo = (function(_module) {

    _module.l10n.pt = {
        "__LOGIN.EnterValidEmailAddress__" : "Digite um endereço de e-mail válido",
        "__LOGIN.EnteryourPassword__" : "Coloque sua senha",
        "__LOGIN.EnterEmailAddress__" : "Insira o seu endereço de email",
        "__FORGETPASSWORD.EnterEmailinproperformat__" : "Insira o e-mail no formato apropriado",
        "__FORGETPASSWORD.EnterYourEmailId__" : "Digite seu ID de e-mail",
        "__REGISTRATION.Enterfirstname__" : "Digite seu primeiro nome",
        "__REGISTRATION.Entermobilenumber__" : "Introduza o seu número de telemóvel",
        "__REGISTRATION.Entercorrectmobilenumber__" : "Introduza o número de telemóvel correcto",
        "__THANKS_FOR_SUB__": "Obrigado por subscrever nossas notificações push!",
        "__INCOMPLETE_SUB__": "Você não concluiu ainda a subscrição das notificações",
        "__CLOSE_NOW_SUB__": "Fechar",
        "__RESUME_SUB__": "Resuma subscrição",
        "__NOT_NOW_SUB__": "Agora não",
        "__EXITINTENT_ENTEREMAILADRESS__" : "Digite o endereço de e-mail aqui",
        "__EXITINTENT_INVALIDEMAIL__": "Digite um endereço de e-mail válido",
        "__EXITINTENT_ENTERPHONENO__" : "Digite o telefone aqui",
        "__EXITINTENT_INVALIDPHONE__" : "Introduza o número de telemóvel correcto",
        "__SEGMENTATION_ENTERSEGMENTNAME__" : "Digite o nome do segmento aqui",
        "__SEGMENTATION_ENTERSEGMENTDESCRIPTION__" : "Digite a Descrição do Segmento"
    }

    return _module;

}(window.wigzo || {}));



window.wigzo = (function(_module) {

    _module.l10n.ur = {
        "__LOGIN.EnterValidEmailAddress__" : "درست ای میل ایڈریس درج کریں",
        "__LOGIN.EnteryourPassword__" : "اپنا پاس ورڈ درج کریں",
        "__LOGIN.EnterEmailAddress__" : "ای میل ایڈریس درج کریں",
        "__FORGETPASSWORD.EnterEmailinproperformat__" : "مناسب شکل میں ای میل داخل کریں",
        "__FORGETPASSWORD.EnterYourEmailId__" : "اپنا ای میل آئی ڈی درج کریں",
        "__REGISTRATION.Enterfirstname__" : "اپنا پہلا نام درج کریں",
        "__REGISTRATION.Entermobilenumber__" : "اپنا موبائل نمبر درج کیجئے",
        "__REGISTRATION.Entercorrectmobilenumber__" : "صحیح موبائل نمبر درج کریں",
        "__THANKS_FOR_SUB__": "پش نوٹیفکیشن کو سبسکرائب کرنے کے لئے آپ کا شکریہ",
        "__INCOMPLETE_SUB__": "آپ نے نوٹفیکشن کے لئے سبسکرائب نہیں کی ہے",
        "__CLOSE_NOW_SUB__": "بند کریں",
        "__RESUME_SUB__": "سبسکرپشن جاری رکھیں",
        "__NOT_NOW_SUB__": "ابھی نہیں",
        "__EXITINTENT_ENTEREMAILADRESS__" : "یہاں ای میل پتہ درج کریں",
        "__EXITINTENT_INVALIDEMAIL__": "درست ای میل ایڈریس درج کریں",
        "__EXITINTENT_ENTERPHONENO__" : "یہاں فون درج کریں",
        "__EXITINTENT_INVALIDPHONE__" : "صحیح موبائل نمبر درج کریں",
        "__SEGMENTATION_ENTERSEGMENTNAME__" : "یہاں سیکشن کا نام درج کریں",
        "__SEGMENTATION_ENTERSEGMENTDESCRIPTION__" : "سیکشن تفصیل درج کریں"
    }

    return _module;

}(window.wigzo || {}));



window.wigzo = (function(_module) {
    /*!
     * jQuery JavaScript Library v1.10.2
     * http://jquery.com/
     *
     * Includes Sizzle.js
     * http://sizzlejs.com/
     *
     * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2013-07-03T13:48Z
     */
    (function (window, undefined) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
        var
        // The deferred used on DOM ready
            readyList,

        // A central reference to the root jQuery(document)
            rootjQuery,

        // Support: IE<10
        // For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
            core_strundefined = typeof undefined,

        // Use the correct document accordingly with window argument (sandbox)
            location = window.location,
            document = window.document,
            docElem = document.documentElement,

        // Map over jQuery in case of overwrite
            _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
            _$ = window.$,

        // [[Class]] -> type pairs
            class2type = {},

        // List of deleted data cache ids, so we can reuse them
            core_deletedIds = [],

            core_version = "1.10.2",

        // Save a reference to some core methods
            core_concat = core_deletedIds.concat,
            core_push = core_deletedIds.push,
            core_slice = core_deletedIds.slice,
            core_indexOf = core_deletedIds.indexOf,
            core_toString = class2type.toString,
            core_hasOwn = class2type.hasOwnProperty,
            core_trim = core_version.trim,

        // Define a local copy of jQuery
            jQuery = function (selector, context) {
                // The jQuery object is actually just the init constructor 'enhanced'
                return new jQuery.fn.init(selector, context, rootjQuery);
            },

        // Used for matching numbers
            core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

        // Used for splitting on whitespace
            core_rnotwhite = /\S+/g,

        // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
            rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

        // Match a standalone tag
            rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

        // JSON RegExp
            rvalidchars = /^[\],:{}\s]*$/,
            rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
            rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

        // Matches dashed string for camelizing
            rmsPrefix = /^-ms-/,
            rdashAlpha = /-([\da-z])/gi,

        // Used by jQuery.camelCase as callback to replace()
            fcamelCase = function (all, letter) {
                return letter.toUpperCase();
            },

        // The ready event handler
            completed = function (event) {

                // readyState === "complete" is good enough for us to call the dom ready in oldIE
                if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
                    detach();
                    jQuery.ready();
                }
            },
        // Clean-up method for dom ready events
            detach = function () {
                if (document.addEventListener) {
                    document.removeEventListener("DOMContentLoaded", completed, false);
                    window.removeEventListener("load", completed, false);

                } else {
                    document.detachEvent("onreadystatechange", completed);
                    window.detachEvent("onload", completed);
                }
            };

        jQuery.fn = jQuery.prototype = {
            // The current version of jQuery being used
            jquery: core_version,

            constructor: jQuery,
            init: function (selector, context, rootjQuery) {
                var match, elem;

                // HANDLE: $(""), $(null), $(undefined), $(false)
                if (!selector) {
                    return this;
                }

                // Handle HTML strings
                if (typeof selector === "string") {
                    if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                        // Assume that strings that start and end with <> are HTML and skip the regex check
                        match = [null, selector, null];

                    } else {
                        match = rquickExpr.exec(selector);
                    }

                    // Match html or make sure no context is specified for #id
                    if (match && (match[1] || !context)) {

                        // HANDLE: $(html) -> $(array)
                        if (match[1]) {
                            context = context instanceof jQuery ? context[0] : context;

                            // scripts is true for back-compat
                            jQuery.merge(this, jQuery.parseHTML(
                                match[1],
                                context && context.nodeType ? context.ownerDocument || context : document,
                                true
                            ));

                            // HANDLE: $(html, props)
                            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                                for (match in context) {
                                    // Properties of context are called as methods if possible
                                    if (jQuery.isFunction(this[match])) {
                                        this[match](context[match]);

                                        // ...and otherwise set as attributes
                                    } else {
                                        this.attr(match, context[match]);
                                    }
                                }
                            }

                            return this;

                            // HANDLE: $(#id)
                        } else {
                            elem = document.getElementById(match[2]);

                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            if (elem && elem.parentNode) {
                                // Handle the case where IE and Opera return items
                                // by name instead of ID
                                if (elem.id !== match[2]) {
                                    return rootjQuery.find(selector);
                                }

                                // Otherwise, we inject the element directly into the jQuery object
                                this.length = 1;
                                this[0] = elem;
                            }

                            this.context = document;
                            this.selector = selector;
                            return this;
                        }

                        // HANDLE: $(expr, $(...))
                    } else if (!context || context.jquery) {
                        return ( context || rootjQuery ).find(selector);

                        // HANDLE: $(expr, context)
                        // (which is just equivalent to: $(context).find(expr)
                    } else {
                        return this.constructor(context).find(selector);
                    }

                    // HANDLE: $(DOMElement)
                } else if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this;

                    // HANDLE: $(function)
                    // Shortcut for document ready
                } else if (jQuery.isFunction(selector)) {
                    return rootjQuery.ready(selector);
                }

                if (selector.selector !== undefined) {
                    this.selector = selector.selector;
                    this.context = selector.context;
                }

                return jQuery.makeArray(selector, this);
            },

            // Start with an empty selector
            selector: "",

            // The default length of a jQuery object is 0
            length: 0,

            toArray: function () {
                return core_slice.call(this);
            },

            // Get the Nth element in the matched element set OR
            // Get the whole matched element set as a clean array
            get: function (num) {
                return num == null ?

                    // Return a 'clean' array
                    this.toArray() :

                    // Return just the object
                    ( num < 0 ? this[this.length + num] : this[num] );
            },

            // Take an array of elements and push it onto the stack
            // (returning the new matched element set)
            pushStack: function (elems) {

                // Build a new jQuery matched element set
                var ret = jQuery.merge(this.constructor(), elems);

                // Add the old object onto the stack (as a reference)
                ret.prevObject = this;
                ret.context = this.context;

                // Return the newly-formed element set
                return ret;
            },

            // Execute a callback for every element in the matched set.
            // (You can seed the arguments with an array of args, but this is
            // only used internally.)
            each: function (callback, args) {
                return jQuery.each(this, callback, args);
            },

            ready: function (fn) {
                // Add the callback
                jQuery.ready.promise().done(fn);

                return this;
            },

            slice: function () {
                return this.pushStack(core_slice.apply(this, arguments));
            },

            first: function () {
                return this.eq(0);
            },

            last: function () {
                return this.eq(-1);
            },

            eq: function (i) {
                var len = this.length,
                    j = +i + ( i < 0 ? len : 0 );
                return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
            },

            map: function (callback) {
                return this.pushStack(jQuery.map(this, function (elem, i) {
                    return callback.call(elem, i, elem);
                }));
            },

            end: function () {
                return this.prevObject || this.constructor(null);
            },

            // For internal use only.
            // Behaves like an Array's method, not like a jQuery method.
            push: core_push,
            sort: [].sort,
            splice: [].splice
        };

// Give the init function the jQuery prototype for later instantiation
        jQuery.fn.init.prototype = jQuery.fn;

        jQuery.extend = jQuery.fn.extend = function () {
            var src, copyIsArray, copy, name, options, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            // Handle a deep copy situation
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }

            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {};
            }

            // extend jQuery itself if only one argument is passed
            if (length === i) {
                target = this;
                --i;
            }

            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                if ((options = arguments[i]) != null) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];

                        // Prevent never-ending loop
                        if (target === copy) {
                            continue;
                        }

                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) )) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : [];

                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }

                            // Never move original objects, clone them
                            target[name] = jQuery.extend(deep, clone, copy);

                            // Don't bring in undefined values
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }

            // Return the modified object
            return target;
        };

        jQuery.extend({
            // Unique for each copy of jQuery on the page
            // Non-digits removed to match rinlinejQuery
            expando: "jQuery" + ( core_version + Math.random() ).replace(/\D/g, ""),

            noConflict: function (deep) {
                if (window.$ === jQuery) {
                    window.$ = _$;
                }

                if (deep && window.jQuery === jQuery) {
                    window.jQuery = _jQuery;
                }

                return jQuery;
            },

            // Is the DOM ready to be used? Set to true once it occurs.
            isReady: false,

            // A counter to track how many items to wait for before
            // the ready event fires. See #6781
            readyWait: 1,

            // Hold (or release) the ready event
            holdReady: function (hold) {
                if (hold) {
                    jQuery.readyWait++;
                } else {
                    jQuery.ready(true);
                }
            },

            // Handle when the DOM is ready
            ready: function (wait) {

                // Abort if there are pending holds or we're already ready
                if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                    return;
                }

                // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                if (!document.body) {
                    return setTimeout(jQuery.ready);
                }

                // Remember that the DOM is ready
                jQuery.isReady = true;

                // If a normal DOM Ready event fired, decrement, and wait if need be
                if (wait !== true && --jQuery.readyWait > 0) {
                    return;
                }

                // If there are functions bound, to execute
                readyList.resolveWith(document, [jQuery]);

                // Trigger any bound ready events
                if (jQuery.fn.trigger) {
                    jQuery(document).trigger("ready").off("ready");
                }
            },

            // See test/unit/core.js for details concerning isFunction.
            // Since version 1.3, DOM methods and functions like alert
            // aren't supported. They return false on IE (#2968).
            isFunction: function (obj) {
                return jQuery.type(obj) === "function";
            },

            isArray: Array.isArray || function (obj) {
                return jQuery.type(obj) === "array";
            },

            isWindow: function (obj) {
                /* jshint eqeqeq: false */
                return obj != null && obj == obj.window;
            },

            isNumeric: function (obj) {
                return !isNaN(parseFloat(obj)) && isFinite(obj);
            },

            type: function (obj) {
                if (obj == null) {
                    return String(obj);
                }
                return typeof obj === "object" || typeof obj === "function" ?
                class2type[core_toString.call(obj)] || "object" :
                    typeof obj;
            },

            isPlainObject: function (obj) {
                var key;

                // Must be an Object.
                // Because of IE, we also have to check the presence of the constructor property.
                // Make sure that DOM nodes and window objects don't pass through, as well
                if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                    return false;
                }

                try {
                    // Not own constructor property must be Object
                    if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                        return false;
                    }
                } catch (e) {
                    // IE8,9 Will throw exceptions on certain host objects #9897
                    return false;
                }

                // Support: IE<9
                // Handle iteration over inherited properties before own properties.
                if (jQuery.support.ownLast) {
                    for (key in obj) {
                        return core_hasOwn.call(obj, key);
                    }
                }

                // Own properties are enumerated firstly, so to speed up,
                // if last one is own, then all properties are own.
                for (key in obj) {
                }

                return key === undefined || core_hasOwn.call(obj, key);
            },

            isEmptyObject: function (obj) {
                var name;
                for (name in obj) {
                    return false;
                }
                return true;
            },

            error: function (msg) {
                throw new Error(msg);
            },

            // data: string of html
            // context (optional): If specified, the fragment will be created in this context, defaults to document
            // keepScripts (optional): If true, will include scripts passed in the html string
            parseHTML: function (data, context, keepScripts) {
                if (!data || typeof data !== "string") {
                    return null;
                }
                if (typeof context === "boolean") {
                    keepScripts = context;
                    context = false;
                }
                context = context || document;

                var parsed = rsingleTag.exec(data),
                    scripts = !keepScripts && [];

                // Single tag
                if (parsed) {
                    return [context.createElement(parsed[1])];
                }

                parsed = jQuery.buildFragment([data], context, scripts);
                if (scripts) {
                    jQuery(scripts).remove();
                }
                return jQuery.merge([], parsed.childNodes);
            },

            parseJSON: function (data) {
                // Attempt to parse using the native JSON parser first
                if (window.JSON && window.JSON.parse) {
                    return window.JSON.parse(data);
                }

                if (data === null) {
                    return data;
                }

                if (typeof data === "string") {

                    // Make sure leading/trailing whitespace is removed (IE can't handle it)
                    data = jQuery.trim(data);

                    if (data) {
                        // Make sure the incoming data is actual JSON
                        // Logic borrowed from http://json.org/json2.js
                        if (rvalidchars.test(data.replace(rvalidescape, "@")
                                .replace(rvalidtokens, "]")
                                .replace(rvalidbraces, ""))) {

                            return ( new Function("return " + data) )();
                        }
                    }
                }

                jQuery.error("Invalid JSON: " + data);
            },

            // Cross-browser xml parsing
            parseXML: function (data) {
                var xml, tmp;
                if (!data || typeof data !== "string") {
                    return null;
                }
                try {
                    if (window.DOMParser) { // Standard
                        tmp = new DOMParser();
                        xml = tmp.parseFromString(data, "text/xml");
                    } else { // IE
                        xml = new ActiveXObject("Microsoft.XMLDOM");
                        xml.async = "false";
                        xml.loadXML(data);
                    }
                } catch (e) {
                    xml = undefined;
                }
                if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                    jQuery.error("Invalid XML: " + data);
                }
                return xml;
            },

            noop: function () {
            },

            // Evaluates a script in a global context
            // Workarounds based on findings by Jim Driscoll
            // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
            globalEval: function (data) {
                if (data && jQuery.trim(data)) {
                    // We use execScript on Internet Explorer
                    // We use an anonymous function so that context is window
                    // rather than jQuery in Firefox
                    ( window.execScript || function (data) {
                        window["eval"].call(window, data);
                    } )(data);
                }
            },

            // Convert dashed to camelCase; used by the css and data modules
            // Microsoft forgot to hump their vendor prefix (#9572)
            camelCase: function (string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
            },

            nodeName: function (elem, name) {
                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
            },

            // args is for internal usage only
            each: function (obj, callback, args) {
                var value,
                    i = 0,
                    length = obj.length,
                    isArray = isArraylike(obj);

                if (args) {
                    if (isArray) {
                        for (; i < length; i++) {
                            value = callback.apply(obj[i], args);

                            if (value === false) {
                                break;
                            }
                        }
                    } else {
                        for (i in obj) {
                            value = callback.apply(obj[i], args);

                            if (value === false) {
                                break;
                            }
                        }
                    }

                    // A special, fast, case for the most common use of each
                } else {
                    if (isArray) {
                        for (; i < length; i++) {
                            value = callback.call(obj[i], i, obj[i]);

                            if (value === false) {
                                break;
                            }
                        }
                    } else {
                        for (i in obj) {
                            value = callback.call(obj[i], i, obj[i]);

                            if (value === false) {
                                break;
                            }
                        }
                    }
                }

                return obj;
            },

            // Use native String.trim function wherever possible
            trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
                function (text) {
                    return text == null ?
                        "" :
                        core_trim.call(text);
                } :

                // Otherwise use our own trimming functionality
                function (text) {
                    return text == null ?
                        "" :
                        ( text + "" ).replace(rtrim, "");
                },

            // results is for internal usage only
            makeArray: function (arr, results) {
                var ret = results || [];

                if (arr != null) {
                    if (isArraylike(Object(arr))) {
                        jQuery.merge(ret,
                            typeof arr === "string" ?
                                [arr] : arr
                        );
                    } else {
                        core_push.call(ret, arr);
                    }
                }

                return ret;
            },

            inArray: function (elem, arr, i) {
                var len;

                if (arr) {
                    if (core_indexOf) {
                        return core_indexOf.call(arr, elem, i);
                    }

                    len = arr.length;
                    i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

                    for (; i < len; i++) {
                        // Skip accessing in sparse arrays
                        if (i in arr && arr[i] === elem) {
                            return i;
                        }
                    }
                }

                return -1;
            },

            merge: function (first, second) {
                var l = second.length,
                    i = first.length,
                    j = 0;

                if (typeof l === "number") {
                    for (; j < l; j++) {
                        first[i++] = second[j];
                    }
                } else {
                    while (second[j] !== undefined) {
                        first[i++] = second[j++];
                    }
                }

                first.length = i;

                return first;
            },

            grep: function (elems, callback, inv) {
                var retVal,
                    ret = [],
                    i = 0,
                    length = elems.length;
                inv = !!inv;

                // Go through the array, only saving the items
                // that pass the validator function
                for (; i < length; i++) {
                    retVal = !!callback(elems[i], i);
                    if (inv !== retVal) {
                        ret.push(elems[i]);
                    }
                }

                return ret;
            },

            // arg is for internal usage only
            map: function (elems, callback, arg) {
                var value,
                    i = 0,
                    length = elems.length,
                    isArray = isArraylike(elems),
                    ret = [];

                // Go through the array, translating each of the items to their
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback(elems[i], i, arg);

                        if (value != null) {
                            ret[ret.length] = value;
                        }
                    }

                    // Go through every key on the object,
                } else {
                    for (i in elems) {
                        value = callback(elems[i], i, arg);

                        if (value != null) {
                            ret[ret.length] = value;
                        }
                    }
                }

                // Flatten any nested arrays
                return core_concat.apply([], ret);
            },

            // A global GUID counter for objects
            guid: 1,

            // Bind a function to a context, optionally partially applying any
            // arguments.
            proxy: function (fn, context) {
                var args, proxy, tmp;

                if (typeof context === "string") {
                    tmp = fn[context];
                    context = fn;
                    fn = tmp;
                }

                // Quick check to determine if target is callable, in the spec
                // this throws a TypeError, but we will just return undefined.
                if (!jQuery.isFunction(fn)) {
                    return undefined;
                }

                // Simulated bind
                args = core_slice.call(arguments, 2);
                proxy = function () {
                    return fn.apply(context || this, args.concat(core_slice.call(arguments)));
                };

                // Set the guid of unique handler to the same of original handler, so it can be removed
                proxy.guid = fn.guid = fn.guid || jQuery.guid++;

                return proxy;
            },

            // Multifunctional method to get and set values of a collection
            // The value/s can optionally be executed if it's a function
            access: function (elems, fn, key, value, chainable, emptyGet, raw) {
                var i = 0,
                    length = elems.length,
                    bulk = key == null;

                // Sets many values
                if (jQuery.type(key) === "object") {
                    chainable = true;
                    for (i in key) {
                        jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
                    }

                    // Sets one value
                } else if (value !== undefined) {
                    chainable = true;

                    if (!jQuery.isFunction(value)) {
                        raw = true;
                    }

                    if (bulk) {
                        // Bulk operations run against the entire set
                        if (raw) {
                            fn.call(elems, value);
                            fn = null;

                            // ...except when executing function values
                        } else {
                            bulk = fn;
                            fn = function (elem, key, value) {
                                return bulk.call(jQuery(elem), value);
                            };
                        }
                    }

                    if (fn) {
                        for (; i < length; i++) {
                            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                        }
                    }
                }

                return chainable ?
                    elems :

                    // Gets
                    bulk ?
                        fn.call(elems) :
                        length ? fn(elems[0], key) : emptyGet;
            },

            now: function () {
                return ( new Date() ).getTime();
            },

            // A method for quickly swapping in/out CSS properties to get correct calculations.
            // Note: this method belongs to the css module but it's needed here for the support module.
            // If support gets modularized, this method should be moved back to the css module.
            swap: function (elem, options, callback, args) {
                var ret, name,
                    old = {};

                // Remember the old values, and insert the new ones
                for (name in options) {
                    old[name] = elem.style[name];
                    elem.style[name] = options[name];
                }

                ret = callback.apply(elem, args || []);

                // Revert the old values
                for (name in options) {
                    elem.style[name] = old[name];
                }

                return ret;
            }
        });

        jQuery.ready.promise = function (obj) {
            if (!readyList) {

                readyList = jQuery.Deferred();

                // Catch cases where $(document).ready() is called after the browser event has already occurred.
                // we once tried to use readyState "interactive" here, but it caused issues like the one
                // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
                if (document.readyState === "complete") {
                    // Handle it asynchronously to allow scripts the opportunity to delay ready
                    setTimeout(jQuery.ready);

                    // Standards-based browsers support DOMContentLoaded
                } else if (document.addEventListener) {
                    // Use the handy event callback
                    document.addEventListener("DOMContentLoaded", completed, false);

                    // A fallback to window.onload, that will always work
                    window.addEventListener("load", completed, false);

                    // If IE event model is used
                } else {
                    // Ensure firing before onload, maybe late but safe also for iframes
                    document.attachEvent("onreadystatechange", completed);

                    // A fallback to window.onload, that will always work
                    window.attachEvent("onload", completed);

                    // If IE and not a frame
                    // continually check to see if the document is ready
                    var top = false;

                    try {
                        top = window.frameElement == null && document.documentElement;
                    } catch (e) {
                    }

                    if (top && top.doScroll) {
                        (function doScrollCheck() {
                            if (!jQuery.isReady) {

                                try {
                                    // Use the trick by Diego Perini
                                    // http://javascript.nwbox.com/IEContentLoaded/
                                    top.doScroll("left");
                                } catch (e) {
                                    return setTimeout(doScrollCheck, 50);
                                }

                                // detach all dom ready events
                                detach();

                                // and execute any waiting functions
                                jQuery.ready();
                            }
                        })();
                    }
                }
            }
            return readyList.promise(obj);
        };

// Populate the class2type map
        jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });

        function isArraylike(obj) {
            var length = obj.length,
                type = jQuery.type(obj);

            if (jQuery.isWindow(obj)) {
                return false;
            }

            if (obj.nodeType === 1 && length) {
                return true;
            }

            return type === "array" || type !== "function" &&
                ( length === 0 ||
                typeof length === "number" && length > 0 && ( length - 1 ) in obj );
        }

// All jQuery objects should point back to these
        rootjQuery = jQuery(document);
        /*!
         * Sizzle CSS Selector Engine v1.10.2
         * http://sizzlejs.com/
         *
         * Copyright 2013 jQuery Foundation, Inc. and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2013-07-03
         */
        (function (window, undefined) {

            var i,
                support,
                cachedruns,
                Expr,
                getText,
                isXML,
                compile,
                outermostContext,
                sortInput,

            // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

            // Instance-specific data
                expando = "sizzle" + -(new Date()),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                hasDuplicate = false,
                sortOrder = function (a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                        return 0;
                    }
                    return 0;
                },

            // General-purpose constants
                strundefined = typeof undefined,
                MAX_NEGATIVE = 1 << 31,

            // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
            // Use a stripped-down indexOf if we can't use a native one
                indexOf = arr.indexOf || function (elem) {
                        var i = 0,
                            len = this.length;
                        for (; i < len; i++) {
                            if (this[i] === elem) {
                                return i;
                            }
                        }
                        return -1;
                    },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

            // Regular expressions

            // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",
            // http://www.w3.org/TR/css3-syntax/#characters
                characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

            // Loosely modeled on CSS identifier characters
            // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
            // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = characterEncoding.replace("w", "w#"),

            // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
                    "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

            // Prefer arguments quoted,
            //   then not containing pseudos/brackets,
            //   then attribute selectors/non-parenthetical expressions,
            //   then anything else
            // These preferences are here to reduce the number of selectors
            //   needing tokenize in the PSEUDO preFilter
                pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",

            // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

                rsibling = new RegExp(whitespace + "*[+~]"),
                rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g"),

                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),

                matchExpr = {
                    "ID": new RegExp("^#(" + characterEncoding + ")"),
                    "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                    "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                    "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                    "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },

                rnative = /^[^{]+\{\s*\[native \w/,

            // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rescape = /'|\\/g,

            // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                funescape = function (_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 0x10000;
                    // NaN means non-codepoint
                    // Support: Firefox
                    // Workaround erroneous numeric interpretation of +"0x"
                    return high !== high || escapedWhitespace ?
                        escaped :
                        // BMP codepoint
                        high < 0 ?
                            String.fromCharCode(high + 0x10000) :
                            // Supplemental Plane codepoint (surrogate pair)
                            String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
                };

// Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call(preferredDoc.childNodes)),
                    preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[preferredDoc.childNodes.length].nodeType;
            } catch (e) {
                push = {
                    apply: arr.length ?

                        // Leverage slice if possible
                        function (target, els) {
                            push_native.apply(target, slice.call(els));
                        } :

                        // Support: IE<9
                        // Otherwise append directly
                        function (target, els) {
                            var j = target.length,
                                i = 0;
                            // Can't trust NodeList.length
                            while ((target[j++] = els[i++])) {
                            }
                            target.length = j - 1;
                        }
                };
            }

            function Sizzle(selector, context, results, seed) {
                var match, elem, m, nodeType,
                // QSA vars
                    i, groups, old, nid, newContext, newSelector;

                if (( context ? context.ownerDocument || context : preferredDoc ) !== document) {
                    setDocument(context);
                }

                context = context || document;
                results = results || [];

                if (!selector || typeof selector !== "string") {
                    return results;
                }

                if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                    return [];
                }

                if (documentIsHTML && !seed) {

                    // Shortcuts
                    if ((match = rquickExpr.exec(selector))) {
                        // Speed-up: Sizzle("#ID")
                        if ((m = match[1])) {
                            if (nodeType === 9) {
                                elem = context.getElementById(m);
                                // Check parentNode to catch when Blackberry 4.6 returns
                                // nodes that are no longer in the document #6963
                                if (elem && elem.parentNode) {
                                    // Handle the case where IE, Opera, and Webkit return items
                                    // by name instead of ID
                                    if (elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                } else {
                                    return results;
                                }
                            } else {
                                // Context is not a document
                                if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
                                    contains(context, elem) && elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            }

                            // Speed-up: Sizzle("TAG")
                        } else if (match[2]) {
                            push.apply(results, context.getElementsByTagName(selector));
                            return results;

                            // Speed-up: Sizzle(".CLASS")
                        } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                            push.apply(results, context.getElementsByClassName(m));
                            return results;
                        }
                    }

                    // QSA path
                    if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        nid = old = expando;
                        newContext = context;
                        newSelector = nodeType === 9 && selector;

                        // qSA works strangely on Element-rooted queries
                        // We can work around this by specifying an extra ID on the root
                        // and working up from there (Thanks to Andrew Dupont for the technique)
                        // IE 8 doesn't work on object elements
                        if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            groups = tokenize(selector);

                            if ((old = context.getAttribute("id"))) {
                                nid = old.replace(rescape, "\\$&");
                            } else {
                                context.setAttribute("id", nid);
                            }
                            nid = "[id='" + nid + "'] ";

                            i = groups.length;
                            while (i--) {
                                groups[i] = nid + toSelector(groups[i]);
                            }
                            newContext = rsibling.test(selector) && context.parentNode || context;
                            newSelector = groups.join(",");
                        }

                        if (newSelector) {
                            try {
                                push.apply(results,
                                    newContext.querySelectorAll(newSelector)
                                );
                                return results;
                            } catch (qsaError) {
                            } finally {
                                if (!old) {
                                    context.removeAttribute("id");
                                }
                            }
                        }
                    }
                }

                // All others
                return select(selector.replace(rtrim, "$1"), context, results, seed);
            }

            /**
             * Create key-value caches of limited size
             * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
             *    property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *    deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache(key, value) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if (keys.push(key += " ") > Expr.cacheLength) {
                        // Only keep the most recent entries
                        delete cache[keys.shift()];
                    }
                    return (cache[key] = value);
                }

                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created div and expects a boolean result
             */
            function assert(fn) {
                var div = document.createElement("div");

                try {
                    return !!fn(div);
                } catch (e) {
                    return false;
                } finally {
                    // Remove from its parent by default
                    if (div.parentNode) {
                        div.parentNode.removeChild(div);
                    }
                    // release memory in IE
                    div = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle(attrs, handler) {
                var arr = attrs.split("|"),
                    i = attrs.length;

                while (i--) {
                    Expr.attrHandle[arr[i]] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck(a, b) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                        ( ~b.sourceIndex || MAX_NEGATIVE ) -
                        ( ~a.sourceIndex || MAX_NEGATIVE );

                // Use IE sourceIndex if available on both nodes
                if (diff) {
                    return diff;
                }

                // Check if b follows a
                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo(fn) {
                return markFunction(function (argument) {
                    argument = +argument;
                    return markFunction(function (seed, matches) {
                        var j,
                            matchIndexes = fn([], seed.length, argument),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Detect xml
             * @param {Element|Object} elem An element or a document
             */
            isXML = Sizzle.isXML = function (elem) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

// Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function (node) {
                var doc = node ? node.ownerDocument || node : preferredDoc,
                    parent = doc.defaultView;

                // If no document and documentElement is available, return
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document;
                }

                // Set our document
                document = doc;
                docElem = doc.documentElement;

                // Support tests
                documentIsHTML = !isXML(doc);

                // Support: IE>8
                // If iframe document is assigned to "document" variable and if iframe has been reloaded,
                // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
                // IE6-8 do not support the defaultView property so parent will be undefined
                if (parent && parent.attachEvent && parent !== parent.top) {
                    parent.attachEvent("onbeforeunload", function () {
                        setDocument();
                    });
                }

                /* Attributes
                 ---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
                support.attributes = assert(function (div) {
                    div.className = "i";
                    return !div.getAttribute("className");
                });

                /* getElement(s)By*
                 ---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function (div) {
                    div.appendChild(doc.createComment(""));
                    return !div.getElementsByTagName("*").length;
                });

                // Check if getElementsByClassName can be trusted
                support.getElementsByClassName = assert(function (div) {
                    div.innerHTML = "<div class='a'></div><div class='a i'></div>";

                    // Support: Safari<4
                    // Catch class over-caching
                    div.firstChild.className = "i";
                    // Support: Opera<10
                    // Catch gEBCN failure to find non-leading classes
                    return div.getElementsByClassName("i").length === 2;
                });

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function (div) {
                    docElem.appendChild(div).id = expando;
                    return !doc.getElementsByName || !doc.getElementsByName(expando).length;
                });

                // ID find and filter
                if (support.getById) {
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== strundefined && documentIsHTML) {
                            var m = context.getElementById(id);
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            return m && m.parentNode ? [m] : [];
                        }
                    };
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                } else {
                    // Support: IE6/7
                    // getElementById is not reliable as a find shortcut
                    delete Expr.find["ID"];

                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function (tag, context) {
                        if (typeof context.getElementsByTagName !== strundefined) {
                            return context.getElementsByTagName(tag);
                        }
                    } :
                    function (tag, context) {
                        var elem,
                            tmp = [],
                            i = 0,
                            results = context.getElementsByTagName(tag);

                        // Filter out possible comments
                        if (tag === "*") {
                            while ((elem = results[i++])) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem);
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
                    if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
                        return context.getElementsByClassName(className);
                    }
                };

                /* QSA/matchesSelector
                 ---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See http://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ((support.qsa = rnative.test(doc.querySelectorAll))) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function (div) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // http://bugs.jquery.com/ticket/12359
                        div.innerHTML = "<select><option selected=''></option></select>";

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if (!div.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if (!div.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked");
                        }
                    });

                    assert(function (div) {

                        // Support: Opera 10-12/IE8
                        // ^= $= *= and empty values
                        // Should not select anything
                        // Support: Windows 8 Native Apps
                        // The type attribute is restricted during .innerHTML assignment
                        var input = doc.createElement("input");
                        input.setAttribute("type", "hidden");
                        div.appendChild(input).setAttribute("t", "");

                        if (div.querySelectorAll("[t^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if (!div.querySelectorAll(":enabled").length) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }

                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        div.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ((support.matchesSelector = rnative.test((matches = docElem.webkitMatchesSelector ||
                    docElem.mozMatchesSelector ||
                    docElem.oMatchesSelector ||
                    docElem.msMatchesSelector)))) {

                    assert(function (div) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call(div, "div");

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call(div, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos);
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

                /* Contains
                 ---------------------------------------------------------------------- */

                // Element contains another
                // Purposefully does not implement inclusive descendent
                // As in, an element does not contain itself
                contains = rnative.test(docElem.contains) || docElem.compareDocumentPosition ?
                    function (a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!( bup && bup.nodeType === 1 && (
                                adown.contains ?
                                    adown.contains(bup) :
                                a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                            ));
                    } :
                    function (a, b) {
                        if (b) {
                            while ((b = b.parentNode)) {
                                if (b === a) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
                 ---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = docElem.compareDocumentPosition ?
                    function (a, b) {

                        // Flag for duplicate removal
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);

                        if (compare) {
                            // Disconnected nodes
                            if (compare & 1 ||
                                (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                                // Choose the first element that is related to our preferred document
                                if (a === doc || contains(preferredDoc, a)) {
                                    return -1;
                                }
                                if (b === doc || contains(preferredDoc, b)) {
                                    return 1;
                                }

                                // Maintain original order
                                return sortInput ?
                                    ( indexOf.call(sortInput, a) - indexOf.call(sortInput, b) ) :
                                    0;
                            }

                            return compare & 4 ? -1 : 1;
                        }

                        // Not directly comparable, sort on existence of method
                        return a.compareDocumentPosition ? -1 : 1;
                    } :
                    function (a, b) {
                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];

                        // Exit early if the nodes are identical
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;

                            // Parentless nodes are either documents or disconnected
                        } else if (!aup || !bup) {
                            return a === doc ? -1 :
                                b === doc ? 1 :
                                    aup ? -1 :
                                        bup ? 1 :
                                            sortInput ?
                                                ( indexOf.call(sortInput, a) - indexOf.call(sortInput, b) ) :
                                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if (aup === bup) {
                            return siblingCheck(a, b);
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ((cur = cur.parentNode)) {
                            ap.unshift(cur);
                        }
                        cur = b;
                        while ((cur = cur.parentNode)) {
                            bp.unshift(cur);
                        }

                        // Walk down the tree looking for a discrepancy
                        while (ap[i] === bp[i]) {
                            i++;
                        }

                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck(ap[i], bp[i]) :

                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                                bp[i] === preferredDoc ? 1 :
                                    0;
                    };

                return doc;
            };

            Sizzle.matches = function (expr, elements) {
                return Sizzle(expr, null, null, elements);
            };

            Sizzle.matchesSelector = function (elem, expr) {
                // Set document vars if needed
                if (( elem.ownerDocument || elem ) !== document) {
                    setDocument(elem);
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace(rattributeQuotes, "='$1']");

                if (support.matchesSelector && documentIsHTML &&
                    ( !rbuggyMatches || !rbuggyMatches.test(expr) ) &&
                    ( !rbuggyQSA || !rbuggyQSA.test(expr) )) {

                    try {
                        var ret = matches.call(elem, expr);

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if (ret || support.disconnectedMatch ||
                                // As well, disconnected nodes are said to be in a document
                                // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11) {
                            return ret;
                        }
                    } catch (e) {
                    }
                }

                return Sizzle(expr, document, null, [elem]).length > 0;
            };

            Sizzle.contains = function (context, elem) {
                // Set document vars if needed
                if (( context.ownerDocument || context ) !== document) {
                    setDocument(context);
                }
                return contains(context, elem);
            };

            Sizzle.attr = function (elem, name) {
                // Set document vars if needed
                if (( elem.ownerDocument || elem ) !== document) {
                    setDocument(elem);
                }

                var fn = Expr.attrHandle[name.toLowerCase()],
                // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                        fn(elem, name, !documentIsHTML) :
                        undefined;

                return val === undefined ?
                    support.attributes || !documentIsHTML ?
                        elem.getAttribute(name) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null :
                    val;
            };

            Sizzle.error = function (msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function (results) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);

                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i);
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1);
                    }
                }

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function (elem) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if (!nodeType) {
                    // If no nodeType, this is expected to be an array
                    for (; (node = elem[i]); i++) {
                        // Do not traverse comment nodes
                        ret += getText(node);
                    }
                } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (see #11153)
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": {dir: "parentNode", first: true},
                    " ": {dir: "parentNode"},
                    "+": {dir: "previousSibling", first: true},
                    "~": {dir: "previousSibling"}
                },

                preFilter: {
                    "ATTR": function (match) {
                        match[1] = match[1].replace(runescape, funescape);

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = ( match[4] || match[5] || "" ).replace(runescape, funescape);

                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice(0, 4);
                    },

                    "CHILD": function (match) {
                        /* matches from matchExpr["CHILD"]
                         1 type (only|nth|...)
                         2 what (child|of-type)
                         3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                         4 xn-component of xn+y argument ([+-]?\d*n|)
                         5 sign of xn-component
                         6 x of xn-component
                         7 sign of y-component
                         8 y of y-component
                         */
                        match[1] = match[1].toLowerCase();

                        if (match[1].slice(0, 3) === "nth") {
                            // nth-* requires argument
                            if (!match[3]) {
                                Sizzle.error(match[0]);
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                            match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

                            // other types prohibit arguments
                        } else if (match[3]) {
                            Sizzle.error(match[0]);
                        }

                        return match;
                    },

                    "PSEUDO": function (match) {
                        var excess,
                            unquoted = !match[5] && match[2];

                        if (matchExpr["CHILD"].test(match[0])) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if (match[3] && match[4] !== undefined) {
                            match[2] = match[4];

                            // Strip excess characters from unquoted arguments
                        } else if (unquoted && rpseudo.test(unquoted) &&
                                // Get excess from tokenize (recursively)
                            (excess = tokenize(unquoted, true)) &&
                                // advance to the next closing parenthesis
                            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                            // excess is a negative index
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess);
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice(0, 3);
                    }
                },

                filter: {

                    "TAG": function (nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function () {
                                return true;
                            } :
                            function (elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function (className) {
                        var pattern = classCache[className + " "];

                        return pattern ||
                            (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                            classCache(className, function (elem) {
                                return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                            });
                    },

                    "ATTR": function (name, operator, check) {
                        return function (elem) {
                            var result = Sizzle.attr(elem, name);

                            if (result == null) {
                                return operator === "!=";
                            }
                            if (!operator) {
                                return true;
                            }

                            result += "";

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf(check) === 0 :
                                        operator === "*=" ? check && result.indexOf(check) > -1 :
                                            operator === "$=" ? check && result.slice(-check.length) === check :
                                                operator === "~=" ? ( " " + result + " " ).indexOf(check) > -1 :
                                                    operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                                        false;
                        };
                    },

                    "CHILD": function (type, what, argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth",
                            forward = type.slice(-4) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function (elem) {
                                return !!elem.parentNode;
                            } :

                            function (elem, context, xml) {
                                var cache, outerCache, node, diff, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType;

                                if (parent) {

                                    // :(first|last|only)-(child|of-type)
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while ((node = node[dir])) {
                                                if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [forward ? parent.firstChild : parent.lastChild];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if (forward && useCache) {
                                        // Seek `elem` from a previously-cached index
                                        outerCache = parent[expando] || (parent[expando] = {});
                                        cache = outerCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = cache[0] === dirruns && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];

                                        while ((node = ++nodeIndex && node && node[dir] ||

                                            // Fallback to seeking `elem` from the start
                                        (diff = nodeIndex = 0) || start.pop())) {

                                            // When found, cache indexes on `parent` and break
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                outerCache[type] = [dirruns, nodeIndex, diff];
                                                break;
                                            }
                                        }

                                        // Use previously-cached element index if available
                                    } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                        diff = cache[1];

                                        // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                    } else {
                                        // Use the same loop as above to seek `elem` from the start
                                        while ((node = ++nodeIndex && node && node[dir] ||
                                        (diff = nodeIndex = 0) || start.pop())) {

                                            if (( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff) {
                                                // Cache the index of each encountered element
                                                if (useCache) {
                                                    (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                                                }

                                                if (node === elem) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || ( diff % first === 0 && diff / first >= 0 );
                                }
                            };
                    },

                    "PSEUDO": function (pseudo, argument) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                                Sizzle.error("unsupported pseudo: " + pseudo);

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if (fn[expando]) {
                            return fn(argument);
                        }

                        // But maintain support for old signatures
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                markFunction(function (seed, matches) {
                                    var idx,
                                        matched = fn(seed, argument),
                                        i = matched.length;
                                    while (i--) {
                                        idx = indexOf.call(seed, matched[i]);
                                        seed[idx] = !( matches[idx] = matched[i] );
                                    }
                                }) :
                                function (elem) {
                                    return fn(elem, 0, args);
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function (selector) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile(selector.replace(rtrim, "$1"));

                        return matcher[expando] ?
                            markFunction(function (seed, matches, context, xml) {
                                var elem,
                                    unmatched = matcher(seed, null, xml, []),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while (i--) {
                                    if ((elem = unmatched[i])) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function (elem, context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function (selector) {
                        return function (elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),

                    "contains": markFunction(function (text) {
                        return function (elem) {
                            return ( elem.textContent || elem.innerText || getText(elem) ).indexOf(text) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction(function (lang) {
                        // lang value must be a valid identifier
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang);
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function (elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ?
                                        elem.lang :
                                    elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function (elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },

                    "root": function (elem) {
                        return elem === docElem;
                    },

                    "focus": function (elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": function (elem) {
                        return elem.disabled === false;
                    },

                    "disabled": function (elem) {
                        return elem.disabled === true;
                    },

                    "checked": function (elem) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function (elem) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function (elem) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
                        //   not comment, processing instructions, or others
                        // Thanks to Diego Perini for the nodeName shortcut
                        //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function (elem) {
                        return !Expr.pseudos["empty"](elem);
                    },

                    // Element/input types
                    "header": function (elem) {
                        return rheader.test(elem.nodeName);
                    },

                    "input": function (elem) {
                        return rinputs.test(elem.nodeName);
                    },

                    "button": function (elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function (elem) {
                        var attr;
                        // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
                        // use getAttribute instead to test this case
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&
                            ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function () {
                        return [0];
                    }),

                    "last": createPositionalPseudo(function (matchIndexes, length) {
                        return [length - 1];
                    }),

                    "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                        return [argument < 0 ? argument + length : argument];
                    }),

                    "even": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; --i >= 0;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
            for (i in {radio: true, checkbox: true, file: true, password: true, image: true}) {
                Expr.pseudos[i] = createInputPseudo(i);
            }
            for (i in {submit: true, reset: true}) {
                Expr.pseudos[i] = createButtonPseudo(i);
            }

// Easy API for creating new setFilters
            function setFilters() {
            }

            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            function tokenize(selector, parseOnly) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[selector + " "];

                if (cached) {
                    return parseOnly ? 0 : cached.slice(0);
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while (soFar) {

                    // Comma and first run
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice(match[0].length) || soFar;
                        }
                        groups.push(tokens = []);
                    }

                    matched = false;

                    // Combinators
                    if ((match = rcombinators.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length);
                    }

                    // Filters
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                            (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length);
                        }
                    }

                    if (!matched) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                        Sizzle.error(selector) :
                        // Cache the tokens
                        tokenCache(selector, groups).slice(0);
            }

            function toSelector(tokens) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for (; i < len; i++) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                    checkNonElements = base && dir === "parentNode",
                    doneName = done++;

                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function (elem, context, xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml);
                            }
                        }
                    } :

                    // Check against all ancestor/preceding elements
                    function (elem, context, xml) {
                        var data, cache, outerCache,
                            dirkey = dirruns + " " + doneName;

                        // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                        if (xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});
                                    if ((cache = outerCache[dir]) && cache[0] === dirkey) {
                                        if ((data = cache[1]) === true || data === cachedruns) {
                                            return data === true;
                                        }
                                    } else {
                                        cache = outerCache[dir] = [dirkey];
                                        cache[1] = matcher(elem, context, xml) || cachedruns;
                                        if (cache[1] === true) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    };
            }

            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function (elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function condense(unmatched, map, filter, context, xml) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for (; i < len; i++) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i);
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function (seed, results, context, xml) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                    // Get initial elements from seed or context
                        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

                    // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && ( seed || !selector ) ?
                            condense(elems, preMap, preFilter, context, xml) :
                            elems,

                        matcherOut = matcher ?
                            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                            postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                                // ...intermediate processing is necessary
                                [] :

                                // ...otherwise use results directly
                                results :
                            matcherIn;

                    // Find primary matches
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml);
                    }

                    // Apply postFilter
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                            }
                        }
                    }

                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push((matcherIn[i] = elem));
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml);
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                                matcherOut.splice(preexisting, matcherOut.length) :
                                matcherOut
                        );
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml);
                        } else {
                            push.apply(results, matcherOut);
                        }
                    }
                });
            }

            function matcherFromTokens(tokens) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[tokens[0].type],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator(function (elem) {
                        return elem === checkContext;
                    }, implicitRelative, true),
                    matchAnyContext = addCombinator(function (elem) {
                        return indexOf.call(checkContext, elem) > -1;
                    }, implicitRelative, true),
                    matchers = [function (elem, context, xml) {
                        return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                                (checkContext = context).nodeType ?
                                    matchContext(elem, context, xml) :
                                    matchAnyContext(elem, context, xml) );
                    }];

                for (; i < len; i++) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)];
                    } else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

                        // Return special upon seeing a positional matcher
                        if (matcher[expando]) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for (; j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher(matchers),
                                i > 1 && toSelector(
                                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                    tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})
                                ).replace(rtrim, "$1"),
                                matcher,
                                i < j && matcherFromTokens(tokens.slice(i, j)),
                                j < len && matcherFromTokens((tokens = tokens.slice(j))),
                                j < len && toSelector(tokens)
                            );
                        }
                        matchers.push(matcher);
                    }
                }

                return elementMatcher(matchers);
            }

            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                // A counter to specify which element is currently being matched
                var matcherCachedRuns = 0,
                    bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function (seed, context, xml, results, expandContext) {
                        var elem, j, matcher,
                            setMatched = [],
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            outermost = expandContext != null,
                            contextBackup = outermostContext,
                        // We must always have either seed elements or context
                            elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
                        // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

                        if (outermost) {
                            outermostContext = context !== document && context;
                            cachedruns = matcherCachedRuns;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                        for (; (elem = elems[i]) != null; i++) {
                            if (byElement && elem) {
                                j = 0;
                                while ((matcher = elementMatchers[j++])) {
                                    if (matcher(elem, context, xml)) {
                                        results.push(elem);
                                        break;
                                    }
                                }
                                if (outermost) {
                                    dirruns = dirrunsUnique;
                                    cachedruns = ++matcherCachedRuns;
                                }
                            }

                            // Track unmatched elements for set filters
                            if (bySet) {
                                // They will have gone through all possible matchers
                                if ((elem = !matcher && elem)) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if (seed) {
                                    unmatched.push(elem);
                                }
                            }
                        }

                        // Apply set filters to unmatched elements
                        matchedCount += i;
                        if (bySet && i !== matchedCount) {
                            j = 0;
                            while ((matcher = setMatchers[j++])) {
                                matcher(unmatched, setMatched, context, xml);
                            }

                            if (seed) {
                                // Reintegrate element matches to eliminate the need for sorting
                                if (matchedCount > 0) {
                                    while (i--) {
                                        if (!(unmatched[i] || setMatched[i])) {
                                            setMatched[i] = pop.call(results);
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense(setMatched);
                            }

                            // Add matches to results
                            push.apply(results, setMatched);

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if (outermost && !seed && setMatched.length > 0 &&
                                ( matchedCount + setMatchers.length ) > 1) {

                                Sizzle.uniqueSort(results);
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction(superMatcher) :
                    superMatcher;
            }

            compile = Sizzle.compile = function (selector, group /* Internal Use Only */) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[selector + " "];

                if (!cached) {
                    // Generate a function of recursive functions that can be used to check each element
                    if (!group) {
                        group = tokenize(selector);
                    }
                    i = group.length;
                    while (i--) {
                        cached = matcherFromTokens(group[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached);
                        } else {
                            elementMatchers.push(cached);
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                }
                return cached;
            };

            function multipleContexts(selector, contexts, results) {
                var i = 0,
                    len = contexts.length;
                for (; i < len; i++) {
                    Sizzle(selector, contexts[i], results);
                }
                return results;
            }

            function select(selector, context, results, seed) {
                var i, tokens, token, type, find,
                    match = tokenize(selector);

                if (!seed) {
                    // Try to minimize operations if there is only one group
                    if (match.length === 1) {

                        // Take a shortcut and set the context if the root selector is an ID
                        tokens = match[0] = match[0].slice(0);
                        if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                            support.getById && context.nodeType === 9 && documentIsHTML &&
                            Expr.relative[tokens[1].type]) {

                            context = ( Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [] )[0];
                            if (!context) {
                                return results;
                            }
                            selector = selector.slice(tokens.shift().value.length);
                        }

                        // Fetch a seed set for right-to-left matching
                        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                        while (i--) {
                            token = tokens[i];

                            // Abort if we hit a combinator
                            if (Expr.relative[(type = token.type)]) {
                                break;
                            }
                            if ((find = Expr.find[type])) {
                                // Search, expanding context for leading sibling combinators
                                if ((seed = find(
                                        token.matches[0].replace(runescape, funescape),
                                        rsibling.test(tokens[0].type) && context.parentNode || context
                                    ))) {

                                    // If seed is empty or no tokens remain, we can return early
                                    tokens.splice(i, 1);
                                    selector = seed.length && toSelector(tokens);
                                    if (!selector) {
                                        push.apply(results, seed);
                                        return results;
                                    }

                                    break;
                                }
                            }
                        }
                    }
                }

                // Compile and execute a filtering function
                // Provide `match` to avoid retokenization if we modified the selector above
                compile(selector, match)(
                    seed,
                    context,
                    !documentIsHTML,
                    results,
                    rsibling.test(selector)
                );
                return results;
            }

// One-time assignments

// Sort stability
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = hasDuplicate;

// Initialize against the default document
            setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function (div1) {
                // Should return 1, but returns 4 (following)
                return div1.compareDocumentPosition(document.createElement("div")) & 1;
            });

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if (!assert(function (div) {
                    div.innerHTML = "<a href='#'></a>";
                    return div.firstChild.getAttribute("href") === "#";
                })) {
                addHandle("type|href|height|width", function (elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                    }
                });
            }

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
            if (!support.attributes || !assert(function (div) {
                    div.innerHTML = "<input/>";
                    div.firstChild.setAttribute("value", "");
                    return div.firstChild.getAttribute("value") === "";
                })) {
                addHandle("value", function (elem, name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue;
                    }
                });
            }

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
            if (!assert(function (div) {
                    return div.getAttribute("disabled") == null;
                })) {
                addHandle(booleans, function (elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            elem[name] === true ? name.toLowerCase() : null;
                    }
                });
            }

            jQuery.find = Sizzle;
            jQuery.expr = Sizzle.selectors;
            jQuery.expr[":"] = jQuery.expr.pseudos;
            jQuery.unique = Sizzle.uniqueSort;
            jQuery.text = Sizzle.getText;
            jQuery.isXMLDoc = Sizzle.isXML;
            jQuery.contains = Sizzle.contains;


        })(window);
// String to Object options format cache
        var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
        function createOptions(options) {
            var object = optionsCache[options] = {};
            jQuery.each(options.match(core_rnotwhite) || [], function (_, flag) {
                object[flag] = true;
            });
            return object;
        }

        /*
         * Create a callback list using the following parameters:
         *
         *	options: an optional list of space-separated options that will change how
         *			the callback list behaves or a more traditional option object
         *
         * By default a callback list will act like an event callback list and can be
         * "fired" multiple times.
         *
         * Possible options:
         *
         *	once:			will ensure the callback list can only be fired once (like a Deferred)
         *
         *	memory:			will keep track of previous values and will call any callback added
         *					after the list has been fired right away with the latest "memorized"
         *					values (like a Deferred)
         *
         *	unique:			will ensure a callback can only be added once (no duplicate in the list)
         *
         *	stopOnFalse:	interrupt callings when a callback returns false
         *
         */
        jQuery.Callbacks = function (options) {

            // Convert options from String-formatted to Object-formatted if needed
            // (we check in cache first)
            options = typeof options === "string" ?
                ( optionsCache[options] || createOptions(options) ) :
                jQuery.extend({}, options);

            var // Flag to know if list is currently firing
                firing,
            // Last fire value (for non-forgettable lists)
                memory,
            // Flag to know if list was already fired
                fired,
            // End of the loop when firing
                firingLength,
            // Index of currently firing callback (modified by remove if needed)
                firingIndex,
            // First callback to fire (used internally by add and fireWith)
                firingStart,
            // Actual callback list
                list = [],
            // Stack of fire calls for repeatable lists
                stack = !options.once && [],
            // Fire callbacks
                fire = function (data) {
                    memory = options.memory && data;
                    fired = true;
                    firingIndex = firingStart || 0;
                    firingStart = 0;
                    firingLength = list.length;
                    firing = true;
                    for (; list && firingIndex < firingLength; firingIndex++) {
                        if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                            memory = false; // To prevent further calls using add
                            break;
                        }
                    }
                    firing = false;
                    if (list) {
                        if (stack) {
                            if (stack.length) {
                                fire(stack.shift());
                            }
                        } else if (memory) {
                            list = [];
                        } else {
                            self.disable();
                        }
                    }
                },
            // Actual Callbacks object
                self = {
                    // Add a callback or a collection of callbacks to the list
                    add: function () {
                        if (list) {
                            // First, we save the current length
                            var start = list.length;
                            (function add(args) {
                                jQuery.each(args, function (_, arg) {
                                    var type = jQuery.type(arg);
                                    if (type === "function") {
                                        if (!options.unique || !self.has(arg)) {
                                            list.push(arg);
                                        }
                                    } else if (arg && arg.length && type !== "string") {
                                        // Inspect recursively
                                        add(arg);
                                    }
                                });
                            })(arguments);
                            // Do we need to add the callbacks to the
                            // current firing batch?
                            if (firing) {
                                firingLength = list.length;
                                // With memory, if we're not firing then
                                // we should call right away
                            } else if (memory) {
                                firingStart = start;
                                fire(memory);
                            }
                        }
                        return this;
                    },
                    // Remove a callback from the list
                    remove: function () {
                        if (list) {
                            jQuery.each(arguments, function (_, arg) {
                                var index;
                                while (( index = jQuery.inArray(arg, list, index) ) > -1) {
                                    list.splice(index, 1);
                                    // Handle firing indexes
                                    if (firing) {
                                        if (index <= firingLength) {
                                            firingLength--;
                                        }
                                        if (index <= firingIndex) {
                                            firingIndex--;
                                        }
                                    }
                                }
                            });
                        }
                        return this;
                    },
                    // Check if a given callback is in the list.
                    // If no argument is given, return whether or not list has callbacks attached.
                    has: function (fn) {
                        return fn ? jQuery.inArray(fn, list) > -1 : !!( list && list.length );
                    },
                    // Remove all callbacks from the list
                    empty: function () {
                        list = [];
                        firingLength = 0;
                        return this;
                    },
                    // Have the list do nothing anymore
                    disable: function () {
                        list = stack = memory = undefined;
                        return this;
                    },
                    // Is it disabled?
                    disabled: function () {
                        return !list;
                    },
                    // Lock the list in its current state
                    lock: function () {
                        stack = undefined;
                        if (!memory) {
                            self.disable();
                        }
                        return this;
                    },
                    // Is it locked?
                    locked: function () {
                        return !stack;
                    },
                    // Call all callbacks with the given context and arguments
                    fireWith: function (context, args) {
                        if (list && ( !fired || stack )) {
                            args = args || [];
                            args = [context, args.slice ? args.slice() : args];
                            if (firing) {
                                stack.push(args);
                            } else {
                                fire(args);
                            }
                        }
                        return this;
                    },
                    // Call all the callbacks with the given arguments
                    fire: function () {
                        self.fireWith(this, arguments);
                        return this;
                    },
                    // To know if the callbacks have already been called at least once
                    fired: function () {
                        return !!fired;
                    }
                };

            return self;
        };
        jQuery.extend({

            Deferred: function (func) {
                var tuples = [
                        // action, add listener, listener list, final state
                        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", jQuery.Callbacks("memory")]
                    ],
                    state = "pending",
                    promise = {
                        state: function () {
                            return state;
                        },
                        always: function () {
                            deferred.done(arguments).fail(arguments);
                            return this;
                        },
                        then: function (/* fnDone, fnFail, fnProgress */) {
                            var fns = arguments;
                            return jQuery.Deferred(function (newDefer) {
                                jQuery.each(tuples, function (i, tuple) {
                                    var action = tuple[0],
                                        fn = jQuery.isFunction(fns[i]) && fns[i];
                                    // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                    deferred[tuple[1]](function () {
                                        var returned = fn && fn.apply(this, arguments);
                                        if (returned && jQuery.isFunction(returned.promise)) {
                                            returned.promise()
                                                .done(newDefer.resolve)
                                                .fail(newDefer.reject)
                                                .progress(newDefer.notify);
                                        } else {
                                            newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                        }
                                    });
                                });
                                fns = null;
                            }).promise();
                        },
                        // Get a promise for this deferred
                        // If obj is provided, the promise aspect is added to the object
                        promise: function (obj) {
                            return obj != null ? jQuery.extend(obj, promise) : promise;
                        }
                    },
                    deferred = {};

                // Keep pipe for back-compat
                promise.pipe = promise.then;

                // Add list-specific methods
                jQuery.each(tuples, function (i, tuple) {
                    var list = tuple[2],
                        stateString = tuple[3];

                    // promise[ done | fail | progress ] = list.add
                    promise[tuple[1]] = list.add;

                    // Handle state
                    if (stateString) {
                        list.add(function () {
                            // state = [ resolved | rejected ]
                            state = stateString;

                            // [ reject_list | resolve_list ].disable; progress_list.lock
                        }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                    }

                    // deferred[ resolve | reject | notify ]
                    deferred[tuple[0]] = function () {
                        deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                        return this;
                    };
                    deferred[tuple[0] + "With"] = list.fireWith;
                });

                // Make the deferred a promise
                promise.promise(deferred);

                // Call given func if any
                if (func) {
                    func.call(deferred, deferred);
                }

                // All done!
                return deferred;
            },

            // Deferred helper
            when: function (subordinate /* , ..., subordinateN */) {
                var i = 0,
                    resolveValues = core_slice.call(arguments),
                    length = resolveValues.length,

                // the count of uncompleted subordinates
                    remaining = length !== 1 || ( subordinate && jQuery.isFunction(subordinate.promise) ) ? length : 0,

                // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                    deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

                // Update function for both resolve and progress values
                    updateFunc = function (i, contexts, values) {
                        return function (value) {
                            contexts[i] = this;
                            values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
                            if (values === progressValues) {
                                deferred.notifyWith(contexts, values);
                            } else if (!( --remaining )) {
                                deferred.resolveWith(contexts, values);
                            }
                        };
                    },

                    progressValues, progressContexts, resolveContexts;

                // add listeners to Deferred subordinates; treat others as resolved
                if (length > 1) {
                    progressValues = new Array(length);
                    progressContexts = new Array(length);
                    resolveContexts = new Array(length);
                    for (; i < length; i++) {
                        if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                            resolveValues[i].promise()
                                .done(updateFunc(i, resolveContexts, resolveValues))
                                .fail(deferred.reject)
                                .progress(updateFunc(i, progressContexts, progressValues));
                        } else {
                            --remaining;
                        }
                    }
                }

                // if we're not waiting on anything, resolve the master
                if (!remaining) {
                    deferred.resolveWith(resolveContexts, resolveValues);
                }

                return deferred.promise();
            }
        });
        jQuery.support = (function (support) {

            var all, a, input, select, fragment, opt, eventName, isSupported, i,
                div = document.createElement("div");

            // Setup
            div.setAttribute("className", "t");
            div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

            // Finish early in limited (non-browser) environments
            all = div.getElementsByTagName("*") || [];
            a = div.getElementsByTagName("a")[0];
            if (!a || !a.style || !all.length) {
                return support;
            }

            // First batch of tests
            select = document.createElement("select");
            opt = select.appendChild(document.createElement("option"));
            input = div.getElementsByTagName("input")[0];

            a.style.cssText = "top:1px;float:left;opacity:.5";

            // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
            support.getSetAttribute = div.className !== "t";

            // IE strips leading whitespace when .innerHTML is used
            support.leadingWhitespace = div.firstChild.nodeType === 3;

            // Make sure that tbody elements aren't automatically inserted
            // IE will insert them into empty tables
            support.tbody = !div.getElementsByTagName("tbody").length;

            // Make sure that link elements get serialized correctly by innerHTML
            // This requires a wrapper element in IE
            support.htmlSerialize = !!div.getElementsByTagName("link").length;

            // Get the style information from getAttribute
            // (IE uses .cssText instead)
            support.style = /top/.test(a.getAttribute("style"));

            // Make sure that URLs aren't manipulated
            // (IE normalizes it by default)
            support.hrefNormalized = a.getAttribute("href") === "/a";

            // Make sure that element opacity exists
            // (IE uses filter instead)
            // Use a regex to work around a WebKit issue. See #5145
            support.opacity = /^0.5/.test(a.style.opacity);

            // Verify style float existence
            // (IE uses styleFloat instead of cssFloat)
            support.cssFloat = !!a.style.cssFloat;

            // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
            support.checkOn = !!input.value;

            // Make sure that a selected-by-default option has a working selected property.
            // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
            support.optSelected = opt.selected;

            // Tests for enctype support on a form (#6743)
            support.enctype = !!document.createElement("form").enctype;

            // Makes sure cloning an html5 element does not cause problems
            // Where outerHTML is undefined, this still works
            support.html5Clone = document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";

            // Will be defined later
            support.inlineBlockNeedsLayout = false;
            support.shrinkWrapBlocks = false;
            support.pixelPosition = false;
            support.deleteExpando = true;
            support.noCloneEvent = true;
            support.reliableMarginRight = true;
            support.boxSizingReliable = true;

            // Make sure checked status is properly cloned
            input.checked = true;
            support.noCloneChecked = input.cloneNode(true).checked;

            // Make sure that the options inside disabled selects aren't marked as disabled
            // (WebKit marks them as disabled)
            select.disabled = true;
            support.optDisabled = !opt.disabled;

            // Support: IE<9
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = false;
            }

            // Check if we can trust getAttribute("value")
            input = document.createElement("input");
            input.setAttribute("value", "");
            support.input = input.getAttribute("value") === "";

            // Check if an input maintains its value after becoming a radio
            input.value = "t";
            input.setAttribute("type", "radio");
            support.radioValue = input.value === "t";

            // #11217 - WebKit loses check when the name is after the checked attribute
            input.setAttribute("checked", "t");
            input.setAttribute("name", "t");

            fragment = document.createDocumentFragment();
            fragment.appendChild(input);

            // Check if a disconnected checkbox will retain its checked
            // value of true after appended to the DOM (IE6/7)
            support.appendChecked = input.checked;

            // WebKit doesn't clone checked state correctly in fragments
            support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

            // Support: IE<9
            // Opera does not clone events (and typeof div.attachEvent === undefined).
            // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
            if (div.attachEvent) {
                div.attachEvent("onclick", function () {
                    support.noCloneEvent = false;
                });

                div.cloneNode(true).click();
            }

            // Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
            // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
            for (i in {submit: true, change: true, focusin: true}) {
                div.setAttribute(eventName = "on" + i, "t");

                support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === false;
            }

            div.style.backgroundClip = "content-box";
            div.cloneNode(true).style.backgroundClip = "";
            support.clearCloneStyle = div.style.backgroundClip === "content-box";

            // Support: IE<9
            // Iteration over object's inherited properties before its own.
            for (i in jQuery(support)) {
                break;
            }
            support.ownLast = i !== "0";

            // Run tests that need a body at doc ready
            jQuery(function () {
                var container, marginDiv, tds,
                    divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                    body = document.getElementsByTagName("body")[0];

                if (!body) {
                    // Return for frameset docs that don't have a body
                    return;
                }

                container = document.createElement("div");
                container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

                body.appendChild(container).appendChild(div);

                // Support: IE8
                // Check if table cells still have offsetWidth/Height when they are set
                // to display:none and there are still other visible table cells in a
                // table row; if so, offsetWidth/Height are not reliable for use when
                // determining if an element has been hidden directly using
                // display:none (it is still safe to use offsets if a parent element is
                // hidden; don safety goggles and see bug #4512 for more information).
                div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                tds = div.getElementsByTagName("td");
                tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
                isSupported = ( tds[0].offsetHeight === 0 );

                tds[0].style.display = "";
                tds[1].style.display = "none";

                // Support: IE8
                // Check if empty table cells still have offsetWidth/Height
                support.reliableHiddenOffsets = isSupported && ( tds[0].offsetHeight === 0 );

                // Check box-sizing and margin behavior.
                div.innerHTML = "";
                div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

                // Workaround failing boxSizing test due to offsetWidth returning wrong value
                // with some non-1 values of body zoom, ticket #13543
                jQuery.swap(body, body.style.zoom != null ? {zoom: 1} : {}, function () {
                    support.boxSizing = div.offsetWidth === 4;
                });

                // Use window.getComputedStyle because jsdom on node.js will break without it.
                if (window.getComputedStyle) {
                    support.pixelPosition = ( window.getComputedStyle(div, null) || {} ).top !== "1%";
                    support.boxSizingReliable = ( window.getComputedStyle(div, null) || {width: "4px"} ).width === "4px";

                    // Check if div with explicit width and no margin-right incorrectly
                    // gets computed margin-right based on width of container. (#3333)
                    // Fails in WebKit before Feb 2011 nightlies
                    // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                    marginDiv = div.appendChild(document.createElement("div"));
                    marginDiv.style.cssText = div.style.cssText = divReset;
                    marginDiv.style.marginRight = marginDiv.style.width = "0";
                    div.style.width = "1px";

                    support.reliableMarginRight = !parseFloat(( window.getComputedStyle(marginDiv, null) || {} ).marginRight);
                }

                if (typeof div.style.zoom !== core_strundefined) {
                    // Support: IE<8
                    // Check if natively block-level elements act like inline-block
                    // elements when setting their display to 'inline' and giving
                    // them layout
                    div.innerHTML = "";
                    div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
                    support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

                    // Support: IE6
                    // Check if elements with layout shrink-wrap their children
                    div.style.display = "block";
                    div.innerHTML = "<div></div>";
                    div.firstChild.style.width = "5px";
                    support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

                    if (support.inlineBlockNeedsLayout) {
                        // Prevent IE 6 from affecting layout for positioned elements #11048
                        // Prevent IE from shrinking the body in IE 7 mode #12869
                        // Support: IE<8
                        body.style.zoom = 1;
                    }
                }

                body.removeChild(container);

                // Null elements to avoid leaks in IE
                container = div = tds = marginDiv = null;
            });

            // Null elements to avoid leaks in IE
            all = select = fragment = opt = a = input = null;

            return support;
        })({});

        var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            rmultiDash = /([A-Z])/g;

        function internalData(elem, name, data, pvt /* Internal Use Only */) {
            if (!jQuery.acceptData(elem)) {
                return;
            }

            var ret, thisCache,
                internalKey = jQuery.expando,

            // We have to handle DOM nodes and JS objects differently because IE6-7
            // can't GC object references properly across the DOM-JS boundary
                isNode = elem.nodeType,

            // Only DOM nodes need the global jQuery cache; JS object data is
            // attached directly to the object so GC can occur automatically
                cache = isNode ? jQuery.cache : elem,

            // Only defining an ID for JS objects if its cache already exists allows
            // the code to shortcut on the same path as a DOM node with no cache
                id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

            // Avoid doing any more work than we need to when trying to get data on an
            // object that has no data at all
            if ((!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string") {
                return;
            }

            if (!id) {
                // Only DOM nodes need a new unique ID for each element since their data
                // ends up in the global cache
                if (isNode) {
                    id = elem[internalKey] = core_deletedIds.pop() || jQuery.guid++;
                } else {
                    id = internalKey;
                }
            }

            if (!cache[id]) {
                // Avoid exposing jQuery metadata on plain JS objects when the object
                // is serialized using JSON.stringify
                cache[id] = isNode ? {} : {toJSON: jQuery.noop};
            }

            // An object can be passed to jQuery.data instead of a key/value pair; this gets
            // shallow copied over onto the existing cache
            if (typeof name === "object" || typeof name === "function") {
                if (pvt) {
                    cache[id] = jQuery.extend(cache[id], name);
                } else {
                    cache[id].data = jQuery.extend(cache[id].data, name);
                }
            }

            thisCache = cache[id];

            // jQuery data() is stored in a separate object inside the object's internal data
            // cache in order to avoid key collisions between internal data and user-defined
            // data.
            if (!pvt) {
                if (!thisCache.data) {
                    thisCache.data = {};
                }

                thisCache = thisCache.data;
            }

            if (data !== undefined) {
                thisCache[jQuery.camelCase(name)] = data;
            }

            // Check for both converted-to-camel and non-converted data property names
            // If a data property was specified
            if (typeof name === "string") {

                // First Try to find as-is property data
                ret = thisCache[name];

                // Test for null|undefined property data
                if (ret == null) {

                    // Try to find the camelCased property
                    ret = thisCache[jQuery.camelCase(name)];
                }
            } else {
                ret = thisCache;
            }

            return ret;
        }

        function internalRemoveData(elem, name, pvt) {
            if (!jQuery.acceptData(elem)) {
                return;
            }

            var thisCache, i,
                isNode = elem.nodeType,

            // See jQuery.data for more information
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[jQuery.expando] : jQuery.expando;

            // If there is already no cache entry for this object, there is no
            // purpose in continuing
            if (!cache[id]) {
                return;
            }

            if (name) {

                thisCache = pvt ? cache[id] : cache[id].data;

                if (thisCache) {

                    // Support array or space separated string names for data keys
                    if (!jQuery.isArray(name)) {

                        // try the string as a key before any manipulation
                        if (name in thisCache) {
                            name = [name];
                        } else {

                            // split the camel cased version by spaces unless a key with the spaces exists
                            name = jQuery.camelCase(name);
                            if (name in thisCache) {
                                name = [name];
                            } else {
                                name = name.split(" ");
                            }
                        }
                    } else {
                        // If "name" is an array of keys...
                        // When data is initially created, via ("key", "val") signature,
                        // keys will be converted to camelCase.
                        // Since there is no way to tell _how_ a key was added, remove
                        // both plain key and camelCase key. #12786
                        // This will only penalize the array argument path.
                        name = name.concat(jQuery.map(name, jQuery.camelCase));
                    }

                    i = name.length;
                    while (i--) {
                        delete thisCache[name[i]];
                    }

                    // If there is no data left in the cache, we want to continue
                    // and let the cache object itself get destroyed
                    if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                        return;
                    }
                }
            }

            // See jQuery.data for more information
            if (!pvt) {
                delete cache[id].data;

                // Don't destroy the parent cache unless the internal data object
                // had been the only thing left in it
                if (!isEmptyDataObject(cache[id])) {
                    return;
                }
            }

            // Destroy the cache
            if (isNode) {
                jQuery.cleanData([elem], true);

                // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
                /* jshint eqeqeq: false */
            } else if (jQuery.support.deleteExpando || cache != cache.window) {
                /* jshint eqeqeq: true */
                delete cache[id];

                // When all else fails, null
            } else {
                cache[id] = null;
            }
        }

        jQuery.extend({
            cache: {},

            // The following elements throw uncatchable exceptions if you
            // attempt to add expando properties to them.
            noData: {
                "applet": true,
                "embed": true,
                // Ban all objects except for Flash (which handle expandos)
                "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },

            hasData: function (elem) {
                elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
                return !!elem && !isEmptyDataObject(elem);
            },

            data: function (elem, name, data) {
                return internalData(elem, name, data);
            },

            removeData: function (elem, name) {
                return internalRemoveData(elem, name);
            },

            // For internal use only.
            _data: function (elem, name, data) {
                return internalData(elem, name, data, true);
            },

            _removeData: function (elem, name) {
                return internalRemoveData(elem, name, true);
            },

            // A method for determining if a DOM node can handle the data expando
            acceptData: function (elem) {
                // Do not set data on non-element because it will not be cleared (#8335).
                if (elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9) {
                    return false;
                }

                var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];

                // nodes accept data unless otherwise specified; rejection can be conditional
                return !noData || noData !== true && elem.getAttribute("classid") === noData;
            }
        });

        jQuery.fn.extend({
            data: function (key, value) {
                var attrs, name,
                    data = null,
                    i = 0,
                    elem = this[0];

                // Special expections of .data basically thwart jQuery.access,
                // so implement the relevant behavior ourselves

                // Gets all values
                if (key === undefined) {
                    if (this.length) {
                        data = jQuery.data(elem);

                        if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                            attrs = elem.attributes;
                            for (; i < attrs.length; i++) {
                                name = attrs[i].name;

                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));

                                    dataAttr(elem, name, data[name]);
                                }
                            }
                            jQuery._data(elem, "parsedAttrs", true);
                        }
                    }

                    return data;
                }

                // Sets multiple values
                if (typeof key === "object") {
                    return this.each(function () {
                        jQuery.data(this, key);
                    });
                }

                return arguments.length > 1 ?

                    // Sets one value
                    this.each(function () {
                        jQuery.data(this, key, value);
                    }) :

                    // Gets one value
                    // Try to fetch any internally stored data first
                    elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null;
            },

            removeData: function (key) {
                return this.each(function () {
                    jQuery.removeData(this, key);
                });
            }
        });

        function dataAttr(elem, key, data) {
            // If nothing was found internally, try to fetch any
            // data from the HTML5 data-* attribute
            if (data === undefined && elem.nodeType === 1) {

                var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

                data = elem.getAttribute(name);

                if (typeof data === "string") {
                    try {
                        data = data === "true" ? true :
                            data === "false" ? false :
                                data === "null" ? null :
                                    // Only convert to a number if it doesn't change the string
                                    +data + "" === data ? +data :
                                        rbrace.test(data) ? jQuery.parseJSON(data) :
                                            data;
                    } catch (e) {
                    }

                    // Make sure we set the data so it isn't changed later
                    jQuery.data(elem, key, data);

                } else {
                    data = undefined;
                }
            }

            return data;
        }

// checks a cache object for emptiness
        function isEmptyDataObject(obj) {
            var name;
            for (name in obj) {

                // if the public data object is empty, the private is still empty
                if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                    continue;
                }
                if (name !== "toJSON") {
                    return false;
                }
            }

            return true;
        }

        jQuery.extend({
            queue: function (elem, type, data) {
                var queue;

                if (elem) {
                    type = ( type || "fx" ) + "queue";
                    queue = jQuery._data(elem, type);

                    // Speed up dequeue by getting out quickly if this is just a lookup
                    if (data) {
                        if (!queue || jQuery.isArray(data)) {
                            queue = jQuery._data(elem, type, jQuery.makeArray(data));
                        } else {
                            queue.push(data);
                        }
                    }
                    return queue || [];
                }
            },

            dequeue: function (elem, type) {
                type = type || "fx";

                var queue = jQuery.queue(elem, type),
                    startLength = queue.length,
                    fn = queue.shift(),
                    hooks = jQuery._queueHooks(elem, type),
                    next = function () {
                        jQuery.dequeue(elem, type);
                    };

                // If the fx queue is dequeued, always remove the progress sentinel
                if (fn === "inprogress") {
                    fn = queue.shift();
                    startLength--;
                }

                if (fn) {

                    // Add a progress sentinel to prevent the fx queue from being
                    // automatically dequeued
                    if (type === "fx") {
                        queue.unshift("inprogress");
                    }

                    // clear up the last queue stop function
                    delete hooks.stop;
                    fn.call(elem, next, hooks);
                }

                if (!startLength && hooks) {
                    hooks.empty.fire();
                }
            },

            // not intended for public consumption - generates a queueHooks object, or returns the current one
            _queueHooks: function (elem, type) {
                var key = type + "queueHooks";
                return jQuery._data(elem, key) || jQuery._data(elem, key, {
                        empty: jQuery.Callbacks("once memory").add(function () {
                            jQuery._removeData(elem, type + "queue");
                            jQuery._removeData(elem, key);
                        })
                    });
            }
        });

        jQuery.fn.extend({
            queue: function (type, data) {
                var setter = 2;

                if (typeof type !== "string") {
                    data = type;
                    type = "fx";
                    setter--;
                }

                if (arguments.length < setter) {
                    return jQuery.queue(this[0], type);
                }

                return data === undefined ?
                    this :
                    this.each(function () {
                        var queue = jQuery.queue(this, type, data);

                        // ensure a hooks for this queue
                        jQuery._queueHooks(this, type);

                        if (type === "fx" && queue[0] !== "inprogress") {
                            jQuery.dequeue(this, type);
                        }
                    });
            },
            dequeue: function (type) {
                return this.each(function () {
                    jQuery.dequeue(this, type);
                });
            },
            // Based off of the plugin by Clint Helfers, with permission.
            // http://blindsignals.com/index.php/2009/07/jquery-delay/
            delay: function (time, type) {
                time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
                type = type || "fx";

                return this.queue(type, function (next, hooks) {
                    var timeout = setTimeout(next, time);
                    hooks.stop = function () {
                        clearTimeout(timeout);
                    };
                });
            },
            clearQueue: function (type) {
                return this.queue(type || "fx", []);
            },
            // Get a promise resolved when queues of a certain type
            // are emptied (fx is the type by default)
            promise: function (type, obj) {
                var tmp,
                    count = 1,
                    defer = jQuery.Deferred(),
                    elements = this,
                    i = this.length,
                    resolve = function () {
                        if (!( --count )) {
                            defer.resolveWith(elements, [elements]);
                        }
                    };

                if (typeof type !== "string") {
                    obj = type;
                    type = undefined;
                }
                type = type || "fx";

                while (i--) {
                    tmp = jQuery._data(elements[i], type + "queueHooks");
                    if (tmp && tmp.empty) {
                        count++;
                        tmp.empty.add(resolve);
                    }
                }
                resolve();
                return defer.promise(obj);
            }
        });
        var nodeHook, boolHook,
            rclass = /[\t\r\n\f]/g,
            rreturn = /\r/g,
            rfocusable = /^(?:input|select|textarea|button|object)$/i,
            rclickable = /^(?:a|area)$/i,
            ruseDefault = /^(?:checked|selected)$/i,
            getSetAttribute = jQuery.support.getSetAttribute,
            getSetInput = jQuery.support.input;

        jQuery.fn.extend({
            attr: function (name, value) {
                return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
            },

            removeAttr: function (name) {
                return this.each(function () {
                    jQuery.removeAttr(this, name);
                });
            },

            prop: function (name, value) {
                return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
            },

            removeProp: function (name) {
                name = jQuery.propFix[name] || name;
                return this.each(function () {
                    // try/catch handles cases where IE balks (such as removing a property on window)
                    try {
                        this[name] = undefined;
                        delete this[name];
                    } catch (e) {
                    }
                });
            },

            addClass: function (value) {
                var classes, elem, cur, clazz, j,
                    i = 0,
                    len = this.length,
                    proceed = typeof value === "string" && value;

                if (jQuery.isFunction(value)) {
                    return this.each(function (j) {
                        jQuery(this).addClass(value.call(this, j, this.className));
                    });
                }

                if (proceed) {
                    // The disjunction here is for better compressibility (see removeClass)
                    classes = ( value || "" ).match(core_rnotwhite) || [];

                    for (; i < len; i++) {
                        elem = this[i];
                        cur = elem.nodeType === 1 && ( elem.className ?
                            ( " " + elem.className + " " ).replace(rclass, " ") :
                            " "
                        );

                        if (cur) {
                            j = 0;
                            while ((clazz = classes[j++])) {
                                if (cur.indexOf(" " + clazz + " ") < 0) {
                                    cur += clazz + " ";
                                }
                            }
                            elem.className = jQuery.trim(cur);

                        }
                    }
                }

                return this;
            },

            removeClass: function (value) {
                var classes, elem, cur, clazz, j,
                    i = 0,
                    len = this.length,
                    proceed = arguments.length === 0 || typeof value === "string" && value;

                if (jQuery.isFunction(value)) {
                    return this.each(function (j) {
                        jQuery(this).removeClass(value.call(this, j, this.className));
                    });
                }
                if (proceed) {
                    classes = ( value || "" ).match(core_rnotwhite) || [];

                    for (; i < len; i++) {
                        elem = this[i];
                        // This expression is here for better compressibility (see addClass)
                        cur = elem.nodeType === 1 && ( elem.className ?
                            ( " " + elem.className + " " ).replace(rclass, " ") :
                            ""
                        );

                        if (cur) {
                            j = 0;
                            while ((clazz = classes[j++])) {
                                // Remove *all* instances
                                while (cur.indexOf(" " + clazz + " ") >= 0) {
                                    cur = cur.replace(" " + clazz + " ", " ");
                                }
                            }
                            elem.className = value ? jQuery.trim(cur) : "";
                        }
                    }
                }

                return this;
            },

            toggleClass: function (value, stateVal) {
                var type = typeof value;

                if (typeof stateVal === "boolean" && type === "string") {
                    return stateVal ? this.addClass(value) : this.removeClass(value);
                }

                if (jQuery.isFunction(value)) {
                    return this.each(function (i) {
                        jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                    });
                }

                return this.each(function () {
                    if (type === "string") {
                        // toggle individual class names
                        var className,
                            i = 0,
                            self = jQuery(this),
                            classNames = value.match(core_rnotwhite) || [];

                        while ((className = classNames[i++])) {
                            // check each className given, space separated list
                            if (self.hasClass(className)) {
                                self.removeClass(className);
                            } else {
                                self.addClass(className);
                            }
                        }

                        // Toggle whole class name
                    } else if (type === core_strundefined || type === "boolean") {
                        if (this.className) {
                            // store className if set
                            jQuery._data(this, "__className__", this.className);
                        }

                        // If the element has a class name or if we're passed "false",
                        // then remove the whole classname (if there was one, the above saved it).
                        // Otherwise bring back whatever was previously saved (if anything),
                        // falling back to the empty string if nothing was stored.
                        this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                    }
                });
            },

            hasClass: function (selector) {
                var className = " " + selector + " ",
                    i = 0,
                    l = this.length;
                for (; i < l; i++) {
                    if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                        return true;
                    }
                }

                return false;
            },

            val: function (value) {
                var ret, hooks, isFunction,
                    elem = this[0];

                if (!arguments.length) {
                    if (elem) {
                        hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

                        if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                            return ret;
                        }

                        ret = elem.value;

                        return typeof ret === "string" ?
                            // handle most common string cases
                            ret.replace(rreturn, "") :
                            // handle cases where value is null/undef or number
                            ret == null ? "" : ret;
                    }

                    return;
                }

                isFunction = jQuery.isFunction(value);

                return this.each(function (i) {
                    var val;

                    if (this.nodeType !== 1) {
                        return;
                    }

                    if (isFunction) {
                        val = value.call(this, i, jQuery(this).val());
                    } else {
                        val = value;
                    }

                    // Treat null/undefined as ""; convert numbers to string
                    if (val == null) {
                        val = "";
                    } else if (typeof val === "number") {
                        val += "";
                    } else if (jQuery.isArray(val)) {
                        val = jQuery.map(val, function (value) {
                            return value == null ? "" : value + "";
                        });
                    }

                    hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

                    // If set returns undefined, fall back to normal setting
                    if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                        this.value = val;
                    }
                });
            }
        });

        jQuery.extend({
            valHooks: {
                option: {
                    get: function (elem) {
                        // Use proper attribute retrieval(#6932, #12072)
                        var val = jQuery.find.attr(elem, "value");
                        return val != null ?
                            val :
                            elem.text;
                    }
                },
                select: {
                    get: function (elem) {
                        var value, option,
                            options = elem.options,
                            index = elem.selectedIndex,
                            one = elem.type === "select-one" || index < 0,
                            values = one ? null : [],
                            max = one ? index + 1 : options.length,
                            i = index < 0 ?
                                max :
                                one ? index : 0;

                        // Loop through all the selected options
                        for (; i < max; i++) {
                            option = options[i];

                            // oldIE doesn't update selected after form reset (#2551)
                            if (( option.selected || i === index ) &&
                                    // Don't return options that are disabled or in a disabled optgroup
                                ( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
                                ( !option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup") )) {

                                // Get the specific value for the option
                                value = jQuery(option).val();

                                // We don't need an array for one selects
                                if (one) {
                                    return value;
                                }

                                // Multi-Selects return an array
                                values.push(value);
                            }
                        }

                        return values;
                    },

                    set: function (elem, value) {
                        var optionSet, option,
                            options = elem.options,
                            values = jQuery.makeArray(value),
                            i = options.length;

                        while (i--) {
                            option = options[i];
                            if ((option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0)) {
                                optionSet = true;
                            }
                        }

                        // force browsers to behave consistently when non-matching value is set
                        if (!optionSet) {
                            elem.selectedIndex = -1;
                        }
                        return values;
                    }
                }
            },

            attr: function (elem, name, value) {
                var hooks, ret,
                    nType = elem.nodeType;

                // don't get/set attributes on text, comment and attribute nodes
                if (!elem || nType === 3 || nType === 8 || nType === 2) {
                    return;
                }

                // Fallback to prop when attributes are not supported
                if (typeof elem.getAttribute === core_strundefined) {
                    return jQuery.prop(elem, name, value);
                }

                // All attributes are lowercase
                // Grab necessary hook if one is defined
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    name = name.toLowerCase();
                    hooks = jQuery.attrHooks[name] ||
                    ( jQuery.expr.match.bool.test(name) ? boolHook : nodeHook );
                }

                if (value !== undefined) {

                    if (value === null) {
                        jQuery.removeAttr(elem, name);

                    } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret;

                    } else {
                        elem.setAttribute(name, value + "");
                        return value;
                    }

                } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;

                } else {
                    ret = jQuery.find.attr(elem, name);

                    // Non-existent attributes return null, we normalize to undefined
                    return ret == null ?
                        undefined :
                        ret;
                }
            },

            removeAttr: function (elem, value) {
                var name, propName,
                    i = 0,
                    attrNames = value && value.match(core_rnotwhite);

                if (attrNames && elem.nodeType === 1) {
                    while ((name = attrNames[i++])) {
                        propName = jQuery.propFix[name] || name;

                        // Boolean attributes get special treatment (#10870)
                        if (jQuery.expr.match.bool.test(name)) {
                            // Set corresponding property to false
                            if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                                elem[propName] = false;
                                // Support: IE<9
                                // Also clear defaultChecked/defaultSelected (if appropriate)
                            } else {
                                elem[jQuery.camelCase("default-" + name)] =
                                    elem[propName] = false;
                            }

                            // See #9699 for explanation of this approach (setting first, then removal)
                        } else {
                            jQuery.attr(elem, name, "");
                        }

                        elem.removeAttribute(getSetAttribute ? name : propName);
                    }
                }
            },

            attrHooks: {
                type: {
                    set: function (elem, value) {
                        if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                            // Setting the type on a radio button after the value resets the value in IE6-9
                            // Reset value to default in case type is set after value during creation
                            var val = elem.value;
                            elem.setAttribute("type", value);
                            if (val) {
                                elem.value = val;
                            }
                            return value;
                        }
                    }
                }
            },

            propFix: {
                "for": "htmlFor",
                "class": "className"
            },

            prop: function (elem, name, value) {
                var ret, hooks, notxml,
                    nType = elem.nodeType;

                // don't get/set properties on text, comment and attribute nodes
                if (!elem || nType === 3 || nType === 8 || nType === 2) {
                    return;
                }

                notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

                if (notxml) {
                    // Fix name and attach hooks
                    name = jQuery.propFix[name] || name;
                    hooks = jQuery.propHooks[name];
                }

                if (value !== undefined) {
                    return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ?
                        ret :
                        ( elem[name] = value );

                } else {
                    return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ?
                        ret :
                        elem[name];
                }
            },

            propHooks: {
                tabIndex: {
                    get: function (elem) {
                        // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                        // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                        // Use proper attribute retrieval(#12072)
                        var tabindex = jQuery.find.attr(elem, "tabindex");

                        return tabindex ?
                            parseInt(tabindex, 10) :
                            rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ?
                                0 :
                                -1;
                    }
                }
            }
        });

// Hooks for boolean attributes
        boolHook = {
            set: function (elem, value, name) {
                if (value === false) {
                    // Remove boolean attributes when set to false
                    jQuery.removeAttr(elem, name);
                } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                    // IE<8 needs the *property* name
                    elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);

                    // Use defaultChecked and defaultSelected for oldIE
                } else {
                    elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
                }

                return name;
            }
        };
        jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
            var getter = jQuery.expr.attrHandle[name] || jQuery.find.attr;

            jQuery.expr.attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ?
                function (elem, name, isXML) {
                    var fn = jQuery.expr.attrHandle[name],
                        ret = isXML ?
                            undefined :
                            /* jshint eqeqeq: false */
                            (jQuery.expr.attrHandle[name] = undefined) !=
                            getter(elem, name, isXML) ?

                                name.toLowerCase() :
                                null;
                    jQuery.expr.attrHandle[name] = fn;
                    return ret;
                } :
                function (elem, name, isXML) {
                    return isXML ?
                        undefined :
                        elem[jQuery.camelCase("default-" + name)] ?
                            name.toLowerCase() :
                            null;
                };
        });

// fix oldIE attroperties
        if (!getSetInput || !getSetAttribute) {
            jQuery.attrHooks.value = {
                set: function (elem, value, name) {
                    if (jQuery.nodeName(elem, "input")) {
                        // Does not return so that setAttribute is also used
                        elem.defaultValue = value;
                    } else {
                        // Use nodeHook if defined (#1954); otherwise setAttribute is fine
                        return nodeHook && nodeHook.set(elem, value, name);
                    }
                }
            };
        }

// IE6/7 do not support getting/setting some attributes with get/setAttribute
        if (!getSetAttribute) {

            // Use this for any attribute in IE6/7
            // This fixes almost every IE6/7 issue
            nodeHook = {
                set: function (elem, value, name) {
                    // Set the existing or create a new attribute node
                    var ret = elem.getAttributeNode(name);
                    if (!ret) {
                        elem.setAttributeNode(
                            (ret = elem.ownerDocument.createAttribute(name))
                        );
                    }

                    ret.value = value += "";

                    // Break association with cloned elements by also using setAttribute (#9646)
                    return name === "value" || value === elem.getAttribute(name) ?
                        value :
                        undefined;
                }
            };
            jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords =
                // Some attributes are constructed with empty-string values when not defined
                function (elem, name, isXML) {
                    var ret;
                    return isXML ?
                        undefined :
                        (ret = elem.getAttributeNode(name)) && ret.value !== "" ?
                            ret.value :
                            null;
                };
            jQuery.valHooks.button = {
                get: function (elem, name) {
                    var ret = elem.getAttributeNode(name);
                    return ret && ret.specified ?
                        ret.value :
                        undefined;
                },
                set: nodeHook.set
            };

            // Set contenteditable to false on removals(#10429)
            // Setting to empty string throws an error as an invalid value
            jQuery.attrHooks.contenteditable = {
                set: function (elem, value, name) {
                    nodeHook.set(elem, value === "" ? false : value, name);
                }
            };

            // Set width and height to auto instead of 0 on empty string( Bug #8150 )
            // This is for removals
            jQuery.each(["width", "height"], function (i, name) {
                jQuery.attrHooks[name] = {
                    set: function (elem, value) {
                        if (value === "") {
                            elem.setAttribute(name, "auto");
                            return value;
                        }
                    }
                };
            });
        }


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
        if (!jQuery.support.hrefNormalized) {
            // href/src property should get the full normalized URL (#10299/#12915)
            jQuery.each(["href", "src"], function (i, name) {
                jQuery.propHooks[name] = {
                    get: function (elem) {
                        return elem.getAttribute(name, 4);
                    }
                };
            });
        }

        if (!jQuery.support.style) {
            jQuery.attrHooks.style = {
                get: function (elem) {
                    // Return undefined in the case of empty string
                    // Note: IE uppercases css property names, but if we were to .toLowerCase()
                    // .cssText, that would destroy case senstitivity in URL's, like in "background"
                    return elem.style.cssText || undefined;
                },
                set: function (elem, value) {
                    return ( elem.style.cssText = value + "" );
                }
            };
        }

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
        if (!jQuery.support.optSelected) {
            jQuery.propHooks.selected = {
                get: function (elem) {
                    var parent = elem.parentNode;

                    if (parent) {
                        parent.selectedIndex;

                        // Make sure that it also works with optgroups, see #5701
                        if (parent.parentNode) {
                            parent.parentNode.selectedIndex;
                        }
                    }
                    return null;
                }
            };
        }

        jQuery.each([
            "tabIndex",
            "readOnly",
            "maxLength",
            "cellSpacing",
            "cellPadding",
            "rowSpan",
            "colSpan",
            "useMap",
            "frameBorder",
            "contentEditable"
        ], function () {
            jQuery.propFix[this.toLowerCase()] = this;
        });

// IE6/7 call enctype encoding
        if (!jQuery.support.enctype) {
            jQuery.propFix.enctype = "encoding";
        }

// Radios and checkboxes getter/setter
        jQuery.each(["radio", "checkbox"], function () {
            jQuery.valHooks[this] = {
                set: function (elem, value) {
                    if (jQuery.isArray(value)) {
                        return ( elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 );
                    }
                }
            };
            if (!jQuery.support.checkOn) {
                jQuery.valHooks[this].get = function (elem) {
                    // Support: Webkit
                    // "" is returned instead of "on" if a value isn't specified
                    return elem.getAttribute("value") === null ? "on" : elem.value;
                };
            }
        });
        var rformElems = /^(?:input|select|textarea)$/i,
            rkeyEvent = /^key/,
            rmouseEvent = /^(?:mouse|contextmenu)|click/,
            rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
            rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

        function returnTrue() {
            return true;
        }

        function returnFalse() {
            return false;
        }

        function safeActiveElement() {
            try {
                return document.activeElement;
            } catch (err) {
            }
        }

        /*
         * Helper functions for managing events -- not part of the public interface.
         * Props to Dean Edwards' addEvent library for many of the ideas.
         */
        jQuery.event = {

            global: {},

            add: function (elem, types, handler, data, selector) {
                var tmp, events, t, handleObjIn,
                    special, eventHandle, handleObj,
                    handlers, type, namespaces, origType,
                    elemData = jQuery._data(elem);

                // Don't attach events to noData or text/comment nodes (but allow plain objects)
                if (!elemData) {
                    return;
                }

                // Caller can pass in an object of custom data in lieu of the handler
                if (handler.handler) {
                    handleObjIn = handler;
                    handler = handleObjIn.handler;
                    selector = handleObjIn.selector;
                }

                // Make sure that the handler has a unique ID, used to find/remove it later
                if (!handler.guid) {
                    handler.guid = jQuery.guid++;
                }

                // Init the element's event structure and main handler, if this is the first
                if (!(events = elemData.events)) {
                    events = elemData.events = {};
                }
                if (!(eventHandle = elemData.handle)) {
                    eventHandle = elemData.handle = function (e) {
                        // Discard the second event of a jQuery.event.trigger() and
                        // when an event is called after a page has unloaded
                        return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
                            jQuery.event.dispatch.apply(eventHandle.elem, arguments) :
                            undefined;
                    };
                    // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
                    eventHandle.elem = elem;
                }

                // Handle multiple events separated by a space
                types = ( types || "" ).match(core_rnotwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = ( tmp[2] || "" ).split(".").sort();

                    // There *must* be a type, no attaching namespace-only handlers
                    if (!type) {
                        continue;
                    }

                    // If event changes its type, use the special event handlers for the changed type
                    special = jQuery.event.special[type] || {};

                    // If selector defined, determine special event api type, otherwise given type
                    type = ( selector ? special.delegateType : special.bindType ) || type;

                    // Update special based on newly reset type
                    special = jQuery.event.special[type] || {};

                    // handleObj is passed to all event handlers
                    handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn);

                    // Init the event handler queue if we're the first
                    if (!(handlers = events[type])) {
                        handlers = events[type] = [];
                        handlers.delegateCount = 0;

                        // Only use addEventListener/attachEvent if the special events handler returns false
                        if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                            // Bind the global event handler to the element
                            if (elem.addEventListener) {
                                elem.addEventListener(type, eventHandle, false);

                            } else if (elem.attachEvent) {
                                elem.attachEvent("on" + type, eventHandle);
                            }
                        }
                    }

                    if (special.add) {
                        special.add.call(elem, handleObj);

                        if (!handleObj.handler.guid) {
                            handleObj.handler.guid = handler.guid;
                        }
                    }

                    // Add to the element's handler list, delegates in front
                    if (selector) {
                        handlers.splice(handlers.delegateCount++, 0, handleObj);
                    } else {
                        handlers.push(handleObj);
                    }

                    // Keep track of which events have ever been used, for event optimization
                    jQuery.event.global[type] = true;
                }

                // Nullify elem to prevent memory leaks in IE
                elem = null;
            },

            // Detach an event or set of events from an element
            remove: function (elem, types, handler, selector, mappedTypes) {
                var j, handleObj, tmp,
                    origCount, t, events,
                    special, handlers, type,
                    namespaces, origType,
                    elemData = jQuery.hasData(elem) && jQuery._data(elem);

                if (!elemData || !(events = elemData.events)) {
                    return;
                }

                // Once for each type.namespace in types; type may be omitted
                types = ( types || "" ).match(core_rnotwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = ( tmp[2] || "" ).split(".").sort();

                    // Unbind all events (on this namespace, if provided) for the element
                    if (!type) {
                        for (type in events) {
                            jQuery.event.remove(elem, type + types[t], handler, selector, true);
                        }
                        continue;
                    }

                    special = jQuery.event.special[type] || {};
                    type = ( selector ? special.delegateType : special.bindType ) || type;
                    handlers = events[type] || [];
                    tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

                    // Remove matching events
                    origCount = j = handlers.length;
                    while (j--) {
                        handleObj = handlers[j];

                        if (( mappedTypes || origType === handleObj.origType ) &&
                            ( !handler || handler.guid === handleObj.guid ) &&
                            ( !tmp || tmp.test(handleObj.namespace) ) &&
                            ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector )) {
                            handlers.splice(j, 1);

                            if (handleObj.selector) {
                                handlers.delegateCount--;
                            }
                            if (special.remove) {
                                special.remove.call(elem, handleObj);
                            }
                        }
                    }

                    // Remove generic event handler if we removed something and no more handlers exist
                    // (avoids potential for endless recursion during removal of special event handlers)
                    if (origCount && !handlers.length) {
                        if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                            jQuery.removeEvent(elem, type, elemData.handle);
                        }

                        delete events[type];
                    }
                }

                // Remove the expando if it's no longer used
                if (jQuery.isEmptyObject(events)) {
                    delete elemData.handle;

                    // removeData also checks for emptiness and clears the expando if empty
                    // so use it instead of delete
                    jQuery._removeData(elem, "events");
                }
            },

            trigger: function (event, data, elem, onlyHandlers) {
                var handle, ontype, cur,
                    bubbleType, special, tmp, i,
                    eventPath = [elem || document],
                    type = core_hasOwn.call(event, "type") ? event.type : event,
                    namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

                cur = tmp = elem = elem || document;

                // Don't do events on text and comment nodes
                if (elem.nodeType === 3 || elem.nodeType === 8) {
                    return;
                }

                // focus/blur morphs to focusin/out; ensure we're not firing them right now
                if (rfocusMorph.test(type + jQuery.event.triggered)) {
                    return;
                }

                if (type.indexOf(".") >= 0) {
                    // Namespaced trigger; create a regexp to match event type in handle()
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespaces.sort();
                }
                ontype = type.indexOf(":") < 0 && "on" + type;

                // Caller can pass in a jQuery.Event object, Object, or just an event type string
                event = event[jQuery.expando] ?
                    event :
                    new jQuery.Event(type, typeof event === "object" && event);

                // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
                event.isTrigger = onlyHandlers ? 2 : 3;
                event.namespace = namespaces.join(".");
                event.namespace_re = event.namespace ?
                    new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                    null;

                // Clean up the event in case it is being reused
                event.result = undefined;
                if (!event.target) {
                    event.target = elem;
                }

                // Clone any incoming data and prepend the event, creating the handler arg list
                data = data == null ?
                    [event] :
                    jQuery.makeArray(data, [event]);

                // Allow special events to draw outside the lines
                special = jQuery.event.special[type] || {};
                if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                    return;
                }

                // Determine event propagation path in advance, per W3C events spec (#9951)
                // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

                    bubbleType = special.delegateType || type;
                    if (!rfocusMorph.test(bubbleType + type)) {
                        cur = cur.parentNode;
                    }
                    for (; cur; cur = cur.parentNode) {
                        eventPath.push(cur);
                        tmp = cur;
                    }

                    // Only add window if we got to document (e.g., not plain obj or detached DOM)
                    if (tmp === (elem.ownerDocument || document)) {
                        eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                    }
                }

                // Fire handlers on the event path
                i = 0;
                while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

                    event.type = i > 1 ?
                        bubbleType :
                    special.bindType || type;

                    // jQuery handler
                    handle = ( jQuery._data(cur, "events") || {} )[event.type] && jQuery._data(cur, "handle");
                    if (handle) {
                        handle.apply(cur, data);
                    }

                    // Native handler
                    handle = ontype && cur[ontype];
                    if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
                        event.preventDefault();
                    }
                }
                event.type = type;

                // If nobody prevented the default action, do it now
                if (!onlyHandlers && !event.isDefaultPrevented()) {

                    if ((!special._default || special._default.apply(eventPath.pop(), data) === false) &&
                        jQuery.acceptData(elem)) {

                        // Call a native DOM method on the target with the same name name as the event.
                        // Can't use an .isFunction() check here because IE6/7 fails that test.
                        // Don't do default actions on window, that's where global variables be (#6170)
                        if (ontype && elem[type] && !jQuery.isWindow(elem)) {

                            // Don't re-trigger an onFOO event when we call its FOO() method
                            tmp = elem[ontype];

                            if (tmp) {
                                elem[ontype] = null;
                            }

                            // Prevent re-triggering of the same event, since we already bubbled it above
                            jQuery.event.triggered = type;
                            try {
                                elem[type]();
                            } catch (e) {
                                // IE<9 dies on focus/blur to hidden element (#1486,#12518)
                                // only reproducible on winXP IE8 native, not IE9 in IE8 mode
                            }
                            jQuery.event.triggered = undefined;

                            if (tmp) {
                                elem[ontype] = tmp;
                            }
                        }
                    }
                }

                return event.result;
            },

            dispatch: function (event) {

                // Make a writable jQuery.Event from the native event object
                event = jQuery.event.fix(event);

                var i, ret, handleObj, matched, j,
                    handlerQueue = [],
                    args = core_slice.call(arguments),
                    handlers = ( jQuery._data(this, "events") || {} )[event.type] || [],
                    special = jQuery.event.special[event.type] || {};

                // Use the fix-ed jQuery.Event rather than the (read-only) native event
                args[0] = event;
                event.delegateTarget = this;

                // Call the preDispatch hook for the mapped type, and let it bail if desired
                if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                    return;
                }

                // Determine handlers
                handlerQueue = jQuery.event.handlers.call(this, event, handlers);

                // Run delegates first; they may want to stop propagation beneath us
                i = 0;
                while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                    event.currentTarget = matched.elem;

                    j = 0;
                    while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

                        // Triggered event must either 1) have no namespace, or
                        // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                        if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {

                            event.handleObj = handleObj;
                            event.data = handleObj.data;

                            ret = ( (jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler )
                                .apply(matched.elem, args);

                            if (ret !== undefined) {
                                if ((event.result = ret) === false) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            }
                        }
                    }
                }

                // Call the postDispatch hook for the mapped type
                if (special.postDispatch) {
                    special.postDispatch.call(this, event);
                }

                return event.result;
            },

            handlers: function (event, handlers) {
                var sel, handleObj, matches, i,
                    handlerQueue = [],
                    delegateCount = handlers.delegateCount,
                    cur = event.target;

                // Find delegate handlers
                // Black-hole SVG <use> instance trees (#13180)
                // Avoid non-left-click bubbling in Firefox (#3861)
                if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {

                    /* jshint eqeqeq: false */
                    for (; cur != this; cur = cur.parentNode || this) {
                        /* jshint eqeqeq: true */

                        // Don't check non-elements (#13208)
                        // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                        if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                            matches = [];
                            for (i = 0; i < delegateCount; i++) {
                                handleObj = handlers[i];

                                // Don't conflict with Object.prototype properties (#13203)
                                sel = handleObj.selector + " ";

                                if (matches[sel] === undefined) {
                                    matches[sel] = handleObj.needsContext ?
                                    jQuery(sel, this).index(cur) >= 0 :
                                        jQuery.find(sel, this, null, [cur]).length;
                                }
                                if (matches[sel]) {
                                    matches.push(handleObj);
                                }
                            }
                            if (matches.length) {
                                handlerQueue.push({elem: cur, handlers: matches});
                            }
                        }
                    }
                }

                // Add the remaining (directly-bound) handlers
                if (delegateCount < handlers.length) {
                    handlerQueue.push({elem: this, handlers: handlers.slice(delegateCount)});
                }

                return handlerQueue;
            },

            fix: function (event) {
                if (event[jQuery.expando]) {
                    return event;
                }

                // Create a writable copy of the event object and normalize some properties
                var i, prop, copy,
                    type = event.type,
                    originalEvent = event,
                    fixHook = this.fixHooks[type];

                if (!fixHook) {
                    this.fixHooks[type] = fixHook =
                        rmouseEvent.test(type) ? this.mouseHooks :
                            rkeyEvent.test(type) ? this.keyHooks :
                            {};
                }
                copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

                event = new jQuery.Event(originalEvent);

                i = copy.length;
                while (i--) {
                    prop = copy[i];
                    event[prop] = originalEvent[prop];
                }

                // Support: IE<9
                // Fix target property (#1925)
                if (!event.target) {
                    event.target = originalEvent.srcElement || document;
                }

                // Support: Chrome 23+, Safari?
                // Target should not be a text node (#504, #13143)
                if (event.target.nodeType === 3) {
                    event.target = event.target.parentNode;
                }

                // Support: IE<9
                // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
                event.metaKey = !!event.metaKey;

                return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
            },

            // Includes some event props shared by KeyEvent and MouseEvent
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

            fixHooks: {},

            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (event, original) {

                    // Add which for key events
                    if (event.which == null) {
                        event.which = original.charCode != null ? original.charCode : original.keyCode;
                    }

                    return event;
                }
            },

            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (event, original) {
                    var body, eventDoc, doc,
                        button = original.button,
                        fromElement = original.fromElement;

                    // Calculate pageX/Y if missing and clientX/Y available
                    if (event.pageX == null && original.clientX != null) {
                        eventDoc = event.target.ownerDocument || document;
                        doc = eventDoc.documentElement;
                        body = eventDoc.body;

                        event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                        event.pageY = original.clientY + ( doc && doc.scrollTop || body && body.scrollTop || 0 ) - ( doc && doc.clientTop || body && body.clientTop || 0 );
                    }

                    // Add relatedTarget, if necessary
                    if (!event.relatedTarget && fromElement) {
                        event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                    }

                    // Add which for click: 1 === left; 2 === middle; 3 === right
                    // Note: button is not normalized, so don't use it
                    if (!event.which && button !== undefined) {
                        event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
                    }

                    return event;
                }
            },

            special: {
                load: {
                    // Prevent triggered image.load events from bubbling to window.load
                    noBubble: true
                },
                focus: {
                    // Fire native event if possible so blur/focus sequence is correct
                    trigger: function () {
                        if (this !== safeActiveElement() && this.focus) {
                            try {
                                this.focus();
                                return false;
                            } catch (e) {
                                // Support: IE<9
                                // If we error on focus to hidden element (#1486, #12518),
                                // let .trigger() run the handlers
                            }
                        }
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function () {
                        if (this === safeActiveElement() && this.blur) {
                            this.blur();
                            return false;
                        }
                    },
                    delegateType: "focusout"
                },
                click: {
                    // For checkbox, fire native event so checked state will be right
                    trigger: function () {
                        if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                            this.click();
                            return false;
                        }
                    },

                    // For cross-browser consistency, don't fire native .click() on links
                    _default: function (event) {
                        return jQuery.nodeName(event.target, "a");
                    }
                },

                beforeunload: {
                    postDispatch: function (event) {

                        // Even when returnValue equals to undefined Firefox will still show alert
                        if (event.result !== undefined) {
                            event.originalEvent.returnValue = event.result;
                        }
                    }
                }
            },

            simulate: function (type, elem, event, bubble) {
                // Piggyback on a donor event to simulate a different one.
                // Fake originalEvent to avoid donor's stopPropagation, but if the
                // simulated event prevents default then we do the same on the donor.
                var e = jQuery.extend(
                    new jQuery.Event(),
                    event,
                    {
                        type: type,
                        isSimulated: true,
                        originalEvent: {}
                    }
                );
                if (bubble) {
                    jQuery.event.trigger(e, null, elem);
                } else {
                    jQuery.event.dispatch.call(elem, e);
                }
                if (e.isDefaultPrevented()) {
                    event.preventDefault();
                }
            }
        };

        jQuery.removeEvent = document.removeEventListener ?
            function (elem, type, handle) {
                if (elem.removeEventListener) {
                    elem.removeEventListener(type, handle, false);
                }
            } :
            function (elem, type, handle) {
                var name = "on" + type;

                if (elem.detachEvent) {

                    // #8545, #7054, preventing memory leaks for custom events in IE6-8
                    // detachEvent needed property on element, by name of that event, to properly expose it to GC
                    if (typeof elem[name] === core_strundefined) {
                        elem[name] = null;
                    }

                    elem.detachEvent(name, handle);
                }
            };

        jQuery.Event = function (src, props) {
            // Allow instantiation without the 'new' keyword
            if (!(this instanceof jQuery.Event)) {
                return new jQuery.Event(src, props);
            }

            // Event object
            if (src && src.type) {
                this.originalEvent = src;
                this.type = src.type;

                // Events bubbling up the document may have been marked as prevented
                // by a handler lower down the tree; reflect the correct value.
                this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
                src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

                // Event type
            } else {
                this.type = src;
            }

            // Put explicitly provided properties onto the event object
            if (props) {
                jQuery.extend(this, props);
            }

            // Create a timestamp if incoming event doesn't have one
            this.timeStamp = src && src.timeStamp || jQuery.now();

            // Mark it as fixed
            this[jQuery.expando] = true;
        };

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
        jQuery.Event.prototype = {
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,

            preventDefault: function () {
                var e = this.originalEvent;

                this.isDefaultPrevented = returnTrue;
                if (!e) {
                    return;
                }

                // If preventDefault exists, run it on the original event
                if (e.preventDefault) {
                    e.preventDefault();

                    // Support: IE
                    // Otherwise set the returnValue property of the original event to false
                } else {
                    e.returnValue = false;
                }
            },
            stopPropagation: function () {
                var e = this.originalEvent;

                this.isPropagationStopped = returnTrue;
                if (!e) {
                    return;
                }
                // If stopPropagation exists, run it on the original event
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                // Support: IE
                // Set the cancelBubble property of the original event to true
                e.cancelBubble = true;
            },
            stopImmediatePropagation: function () {
                this.isImmediatePropagationStopped = returnTrue;
                this.stopPropagation();
            }
        };

// Create mouseenter/leave events using mouseover/out and event-time checks
        jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function (orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,

                handle: function (event) {
                    var ret,
                        target = this,
                        related = event.relatedTarget,
                        handleObj = event.handleObj;

                    // For mousenter/leave call the handler if related is outside the target.
                    // NB: No relatedTarget if the mouse left/entered the browser window
                    if (!related || (related !== target && !jQuery.contains(target, related))) {
                        event.type = handleObj.origType;
                        ret = handleObj.handler.apply(this, arguments);
                        event.type = fix;
                    }
                    return ret;
                }
            };
        });

// IE submit delegation
        if (!jQuery.support.submitBubbles) {

            jQuery.event.special.submit = {
                setup: function () {
                    // Only need this for delegated form submit events
                    if (jQuery.nodeName(this, "form")) {
                        return false;
                    }

                    // Lazy-add a submit handler when a descendant form may potentially be submitted
                    jQuery.event.add(this, "click._submit keypress._submit", function (e) {
                        // Node name check avoids a VML-related crash in IE (#9807)
                        var elem = e.target,
                            form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                        if (form && !jQuery._data(form, "submitBubbles")) {
                            jQuery.event.add(form, "submit._submit", function (event) {
                                event._submit_bubble = true;
                            });
                            jQuery._data(form, "submitBubbles", true);
                        }
                    });
                    // return undefined since we don't need an event listener
                },

                postDispatch: function (event) {
                    // If form was submitted by the user, bubble the event up the tree
                    if (event._submit_bubble) {
                        delete event._submit_bubble;
                        if (this.parentNode && !event.isTrigger) {
                            jQuery.event.simulate("submit", this.parentNode, event, true);
                        }
                    }
                },

                teardown: function () {
                    // Only need this for delegated form submit events
                    if (jQuery.nodeName(this, "form")) {
                        return false;
                    }

                    // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
                    jQuery.event.remove(this, "._submit");
                }
            };
        }

// IE change delegation and checkbox/radio fix
        if (!jQuery.support.changeBubbles) {

            jQuery.event.special.change = {

                setup: function () {

                    if (rformElems.test(this.nodeName)) {
                        // IE doesn't fire change on a check/radio until blur; trigger it on click
                        // after a propertychange. Eat the blur-change in special.change.handle.
                        // This still fires onchange a second time for check/radio after blur.
                        if (this.type === "checkbox" || this.type === "radio") {
                            jQuery.event.add(this, "propertychange._change", function (event) {
                                if (event.originalEvent.propertyName === "checked") {
                                    this._just_changed = true;
                                }
                            });
                            jQuery.event.add(this, "click._change", function (event) {
                                if (this._just_changed && !event.isTrigger) {
                                    this._just_changed = false;
                                }
                                // Allow triggered, simulated change events (#11500)
                                jQuery.event.simulate("change", this, event, true);
                            });
                        }
                        return false;
                    }
                    // Delegated event; lazy-add a change handler on descendant inputs
                    jQuery.event.add(this, "beforeactivate._change", function (e) {
                        var elem = e.target;

                        if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
                            jQuery.event.add(elem, "change._change", function (event) {
                                if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                    jQuery.event.simulate("change", this.parentNode, event, true);
                                }
                            });
                            jQuery._data(elem, "changeBubbles", true);
                        }
                    });
                },

                handle: function (event) {
                    var elem = event.target;

                    // Swallow native change events from checkbox/radio, we already triggered them above
                    if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                        return event.handleObj.handler.apply(this, arguments);
                    }
                },

                teardown: function () {
                    jQuery.event.remove(this, "._change");

                    return !rformElems.test(this.nodeName);
                }
            };
        }

// Create "bubbling" focus and blur events
        if (!jQuery.support.focusinBubbles) {
            jQuery.each({focus: "focusin", blur: "focusout"}, function (orig, fix) {

                // Attach a single capturing handler while someone wants focusin/focusout
                var attaches = 0,
                    handler = function (event) {
                        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
                    };

                jQuery.event.special[fix] = {
                    setup: function () {
                        if (attaches++ === 0) {
                            document.addEventListener(orig, handler, true);
                        }
                    },
                    teardown: function () {
                        if (--attaches === 0) {
                            document.removeEventListener(orig, handler, true);
                        }
                    }
                };
            });
        }

        jQuery.fn.extend({

            on: function (types, selector, data, fn, /*INTERNAL*/ one) {
                var type, origFn;

                // Types can be a map of types/handlers
                if (typeof types === "object") {
                    // ( types-Object, selector, data )
                    if (typeof selector !== "string") {
                        // ( types-Object, data )
                        data = data || selector;
                        selector = undefined;
                    }
                    for (type in types) {
                        this.on(type, selector, data, types[type], one);
                    }
                    return this;
                }

                if (data == null && fn == null) {
                    // ( types, fn )
                    fn = selector;
                    data = selector = undefined;
                } else if (fn == null) {
                    if (typeof selector === "string") {
                        // ( types, selector, fn )
                        fn = data;
                        data = undefined;
                    } else {
                        // ( types, data, fn )
                        fn = data;
                        data = selector;
                        selector = undefined;
                    }
                }
                if (fn === false) {
                    fn = returnFalse;
                } else if (!fn) {
                    return this;
                }

                if (one === 1) {
                    origFn = fn;
                    fn = function (event) {
                        // Can use an empty set, since event contains the info
                        jQuery().off(event);
                        return origFn.apply(this, arguments);
                    };
                    // Use same guid so caller can remove using origFn
                    fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
                }
                return this.each(function () {
                    jQuery.event.add(this, types, fn, data, selector);
                });
            },
            one: function (types, selector, data, fn) {
                return this.on(types, selector, data, fn, 1);
            },
            off: function (types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) {
                    // ( event )  dispatched jQuery.Event
                    handleObj = types.handleObj;
                    jQuery(types.delegateTarget).off(
                        handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                        handleObj.selector,
                        handleObj.handler
                    );
                    return this;
                }
                if (typeof types === "object") {
                    // ( types-object [, selector] )
                    for (type in types) {
                        this.off(type, selector, types[type]);
                    }
                    return this;
                }
                if (selector === false || typeof selector === "function") {
                    // ( types [, fn] )
                    fn = selector;
                    selector = undefined;
                }
                if (fn === false) {
                    fn = returnFalse;
                }
                return this.each(function () {
                    jQuery.event.remove(this, types, fn, selector);
                });
            },

            trigger: function (type, data) {
                return this.each(function () {
                    jQuery.event.trigger(type, data, this);
                });
            },
            triggerHandler: function (type, data) {
                var elem = this[0];
                if (elem) {
                    return jQuery.event.trigger(type, data, elem, true);
                }
            }
        });
        var isSimple = /^.[^:#\[\.,]*$/,
            rparentsprev = /^(?:parents|prev(?:Until|All))/,
            rneedsContext = jQuery.expr.match.needsContext,
        // methods guaranteed to produce a unique set when starting from a unique set
            guaranteedUnique = {
                children: true,
                contents: true,
                next: true,
                prev: true
            };

        jQuery.fn.extend({
            find: function (selector) {
                var i,
                    ret = [],
                    self = this,
                    len = self.length;

                if (typeof selector !== "string") {
                    return this.pushStack(jQuery(selector).filter(function () {
                        for (i = 0; i < len; i++) {
                            if (jQuery.contains(self[i], this)) {
                                return true;
                            }
                        }
                    }));
                }

                for (i = 0; i < len; i++) {
                    jQuery.find(selector, self[i], ret);
                }

                // Needed because $( selector, context ) becomes $( context ).find( selector )
                ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
                ret.selector = this.selector ? this.selector + " " + selector : selector;
                return ret;
            },

            has: function (target) {
                var i,
                    targets = jQuery(target, this),
                    len = targets.length;

                return this.filter(function () {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(this, targets[i])) {
                            return true;
                        }
                    }
                });
            },

            not: function (selector) {
                return this.pushStack(winnow(this, selector || [], true));
            },

            filter: function (selector) {
                return this.pushStack(winnow(this, selector || [], false));
            },

            is: function (selector) {
                return !!winnow(
                    this,

                    // If this is a positional/relative selector, check membership in the returned set
                    // so $("p:first").is("p:last") won't return true for a doc with two "p".
                    typeof selector === "string" && rneedsContext.test(selector) ?
                        jQuery(selector) :
                    selector || [],
                    false
                ).length;
            },

            closest: function (selectors, context) {
                var cur,
                    i = 0,
                    l = this.length,
                    ret = [],
                    pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
                        jQuery(selectors, context || this.context) :
                        0;

                for (; i < l; i++) {
                    for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                        // Always skip document fragments
                        if (cur.nodeType < 11 && (pos ?
                            pos.index(cur) > -1 :

                                // Don't pass non-elements to Sizzle
                            cur.nodeType === 1 &&
                            jQuery.find.matchesSelector(cur, selectors))) {

                            cur = ret.push(cur);
                            break;
                        }
                    }
                }

                return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret);
            },

            // Determine the position of an element within
            // the matched set of elements
            index: function (elem) {

                // No argument, return index in parent
                if (!elem) {
                    return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
                }

                // index in selector
                if (typeof elem === "string") {
                    return jQuery.inArray(this[0], jQuery(elem));
                }

                // Locate the position of the desired element
                return jQuery.inArray(
                    // If it receives a jQuery object, the first element is used
                    elem.jquery ? elem[0] : elem, this);
            },

            add: function (selector, context) {
                var set = typeof selector === "string" ?
                        jQuery(selector, context) :
                        jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                    all = jQuery.merge(this.get(), set);

                return this.pushStack(jQuery.unique(all));
            },

            addBack: function (selector) {
                return this.add(selector == null ?
                        this.prevObject : this.prevObject.filter(selector)
                );
            }
        });

        function sibling(cur, dir) {
            do {
                cur = cur[dir];
            } while (cur && cur.nodeType !== 1);

            return cur;
        }

        jQuery.each({
            parent: function (elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            },
            parents: function (elem) {
                return jQuery.dir(elem, "parentNode");
            },
            parentsUntil: function (elem, i, until) {
                return jQuery.dir(elem, "parentNode", until);
            },
            next: function (elem) {
                return sibling(elem, "nextSibling");
            },
            prev: function (elem) {
                return sibling(elem, "previousSibling");
            },
            nextAll: function (elem) {
                return jQuery.dir(elem, "nextSibling");
            },
            prevAll: function (elem) {
                return jQuery.dir(elem, "previousSibling");
            },
            nextUntil: function (elem, i, until) {
                return jQuery.dir(elem, "nextSibling", until);
            },
            prevUntil: function (elem, i, until) {
                return jQuery.dir(elem, "previousSibling", until);
            },
            siblings: function (elem) {
                return jQuery.sibling(( elem.parentNode || {} ).firstChild, elem);
            },
            children: function (elem) {
                return jQuery.sibling(elem.firstChild);
            },
            contents: function (elem) {
                return jQuery.nodeName(elem, "iframe") ?
                elem.contentDocument || elem.contentWindow.document :
                    jQuery.merge([], elem.childNodes);
            }
        }, function (name, fn) {
            jQuery.fn[name] = function (until, selector) {
                var ret = jQuery.map(this, fn, until);

                if (name.slice(-5) !== "Until") {
                    selector = until;
                }

                if (selector && typeof selector === "string") {
                    ret = jQuery.filter(selector, ret);
                }

                if (this.length > 1) {
                    // Remove duplicates
                    if (!guaranteedUnique[name]) {
                        ret = jQuery.unique(ret);
                    }

                    // Reverse order for parents* and prev-derivatives
                    if (rparentsprev.test(name)) {
                        ret = ret.reverse();
                    }
                }

                return this.pushStack(ret);
            };
        });

        jQuery.extend({
            filter: function (expr, elems, not) {
                var elem = elems[0];

                if (not) {
                    expr = ":not(" + expr + ")";
                }

                return elems.length === 1 && elem.nodeType === 1 ?
                    jQuery.find.matchesSelector(elem, expr) ? [elem] : [] :
                    jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
                        return elem.nodeType === 1;
                    }));
            },

            dir: function (elem, dir, until) {
                var matched = [],
                    cur = elem[dir];

                while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                    if (cur.nodeType === 1) {
                        matched.push(cur);
                    }
                    cur = cur[dir];
                }
                return matched;
            },

            sibling: function (n, elem) {
                var r = [];

                for (; n; n = n.nextSibling) {
                    if (n.nodeType === 1 && n !== elem) {
                        r.push(n);
                    }
                }

                return r;
            }
        });

// Implement the identical functionality for filter and not
        function winnow(elements, qualifier, not) {
            if (jQuery.isFunction(qualifier)) {
                return jQuery.grep(elements, function (elem, i) {
                    /* jshint -W018 */
                    return !!qualifier.call(elem, i, elem) !== not;
                });

            }

            if (qualifier.nodeType) {
                return jQuery.grep(elements, function (elem) {
                    return ( elem === qualifier ) !== not;
                });

            }

            if (typeof qualifier === "string") {
                if (isSimple.test(qualifier)) {
                    return jQuery.filter(qualifier, elements, not);
                }

                qualifier = jQuery.filter(qualifier, elements);
            }

            return jQuery.grep(elements, function (elem) {
                return ( jQuery.inArray(elem, qualifier) >= 0 ) !== not;
            });
        }

        function createSafeFragment(document) {
            var list = nodeNames.split("|"),
                safeFrag = document.createDocumentFragment();

            if (safeFrag.createElement) {
                while (list.length) {
                    safeFrag.createElement(
                        list.pop()
                    );
                }
            }
            return safeFrag;
        }

        var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
                "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
            rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
            rleadingWhitespace = /^\s+/,
            rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            rtbody = /<tbody/i,
            rhtml = /<|&#?\w+;/,
            rnoInnerhtml = /<(?:script|style|link)/i,
            manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
        // checked="checked" or checked
            rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rscriptType = /^$|\/(?:java|ecma)script/i,
            rscriptTypeMasked = /^true\/(.*)/,
            rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

        // We have to close these tags to support XHTML (#13200)
            wrapMap = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

                // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
                // unless wrapped in a div with non-breaking characters in front of it.
                _default: jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            safeFragment = createSafeFragment(document),
            fragmentDiv = safeFragment.appendChild(document.createElement("div"));

        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;

        jQuery.fn.extend({
            text: function (value) {
                return jQuery.access(this, function (value) {
                    return value === undefined ?
                        jQuery.text(this) :
                        this.empty().append(( this[0] && this[0].ownerDocument || document ).createTextNode(value));
                }, null, value, arguments.length);
            },

            append: function () {
                return this.domManip(arguments, function (elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.appendChild(elem);
                    }
                });
            },

            prepend: function () {
                return this.domManip(arguments, function (elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.insertBefore(elem, target.firstChild);
                    }
                });
            },

            before: function () {
                return this.domManip(arguments, function (elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this);
                    }
                });
            },

            after: function () {
                return this.domManip(arguments, function (elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this.nextSibling);
                    }
                });
            },

            // keepData is for internal use only--do not document
            remove: function (selector, keepData) {
                var elem,
                    elems = selector ? jQuery.filter(selector, this) : this,
                    i = 0;

                for (; (elem = elems[i]) != null; i++) {

                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(getAll(elem));
                    }

                    if (elem.parentNode) {
                        if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                            setGlobalEval(getAll(elem, "script"));
                        }
                        elem.parentNode.removeChild(elem);
                    }
                }

                return this;
            },

            empty: function () {
                var elem,
                    i = 0;

                for (; (elem = this[i]) != null; i++) {
                    // Remove element nodes and prevent memory leaks
                    if (elem.nodeType === 1) {
                        jQuery.cleanData(getAll(elem, false));
                    }

                    // Remove any remaining nodes
                    while (elem.firstChild) {
                        elem.removeChild(elem.firstChild);
                    }

                    // If this is a select, ensure that it displays empty (#12336)
                    // Support: IE<9
                    if (elem.options && jQuery.nodeName(elem, "select")) {
                        elem.options.length = 0;
                    }
                }

                return this;
            },

            clone: function (dataAndEvents, deepDataAndEvents) {
                dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
                deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

                return this.map(function () {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
                });
            },

            html: function (value) {
                return jQuery.access(this, function (value) {
                    var elem = this[0] || {},
                        i = 0,
                        l = this.length;

                    if (value === undefined) {
                        return elem.nodeType === 1 ?
                            elem.innerHTML.replace(rinlinejQuery, "") :
                            undefined;
                    }

                    // See if we can take a shortcut and just use innerHTML
                    if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                        ( jQuery.support.htmlSerialize || !rnoshimcache.test(value)  ) &&
                        ( jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value) ) && !wrapMap[( rtagName.exec(value) || ["", ""] )[1].toLowerCase()]) {

                        value = value.replace(rxhtmlTag, "<$1></$2>");

                        try {
                            for (; i < l; i++) {
                                // Remove element nodes and prevent memory leaks
                                elem = this[i] || {};
                                if (elem.nodeType === 1) {
                                    jQuery.cleanData(getAll(elem, false));
                                    elem.innerHTML = value;
                                }
                            }

                            elem = 0;

                            // If using innerHTML throws an exception, use the fallback method
                        } catch (e) {
                        }
                    }

                    if (elem) {
                        this.empty().append(value);
                    }
                }, null, value, arguments.length);
            },

            replaceWith: function () {
                var
                // Snapshot the DOM in case .domManip sweeps something relevant into its fragment
                    args = jQuery.map(this, function (elem) {
                        return [elem.nextSibling, elem.parentNode];
                    }),
                    i = 0;

                // Make the changes, replacing each context element with the new content
                this.domManip(arguments, function (elem) {
                    var next = args[i++],
                        parent = args[i++];

                    if (parent) {
                        // Don't use the snapshot next if it has moved (#13810)
                        if (next && next.parentNode !== parent) {
                            next = this.nextSibling;
                        }
                        jQuery(this).remove();
                        parent.insertBefore(elem, next);
                    }
                    // Allow new content to include elements from the context set
                }, true);

                // Force removal if there was no new content (e.g., from empty arguments)
                return i ? this : this.remove();
            },

            detach: function (selector) {
                return this.remove(selector, true);
            },

            domManip: function (args, callback, allowIntersection) {

                // Flatten any nested arrays
                args = core_concat.apply([], args);

                var first, node, hasScripts,
                    scripts, doc, fragment,
                    i = 0,
                    l = this.length,
                    set = this,
                    iNoClone = l - 1,
                    value = args[0],
                    isFunction = jQuery.isFunction(value);

                // We can't cloneNode fragments that contain checked, in WebKit
                if (isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test(value) )) {
                    return this.each(function (index) {
                        var self = set.eq(index);
                        if (isFunction) {
                            args[0] = value.call(this, index, self.html());
                        }
                        self.domManip(args, callback, allowIntersection);
                    });
                }

                if (l) {
                    fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, !allowIntersection && this);
                    first = fragment.firstChild;

                    if (fragment.childNodes.length === 1) {
                        fragment = first;
                    }

                    if (first) {
                        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                        hasScripts = scripts.length;

                        // Use the original fragment for the last item instead of the first because it can end up
                        // being emptied incorrectly in certain situations (#8070).
                        for (; i < l; i++) {
                            node = fragment;

                            if (i !== iNoClone) {
                                node = jQuery.clone(node, true, true);

                                // Keep references to cloned scripts for later restoration
                                if (hasScripts) {
                                    jQuery.merge(scripts, getAll(node, "script"));
                                }
                            }

                            callback.call(this[i], node, i);
                        }

                        if (hasScripts) {
                            doc = scripts[scripts.length - 1].ownerDocument;

                            // Reenable scripts
                            jQuery.map(scripts, restoreScript);

                            // Evaluate executable scripts on first document insertion
                            for (i = 0; i < hasScripts; i++) {
                                node = scripts[i];
                                if (rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {

                                    if (node.src) {
                                        // Hope ajax is available...
                                        jQuery._evalUrl(node.src);
                                    } else {
                                        jQuery.globalEval(( node.text || node.textContent || node.innerHTML || "" ).replace(rcleanScript, ""));
                                    }
                                }
                            }
                        }

                        // Fix #11809: Avoid leaking memory
                        fragment = first = null;
                    }
                }

                return this;
            }
        });

// Support: IE<8
// Manipulating tables requires a tbody
        function manipulationTarget(elem, content) {
            return jQuery.nodeName(elem, "table") &&
            jQuery.nodeName(content.nodeType === 1 ? content : content.firstChild, "tr") ?

            elem.getElementsByTagName("tbody")[0] ||
            elem.appendChild(elem.ownerDocument.createElement("tbody")) :
                elem;
        }

// Replace/restore the type attribute of script elements for safe DOM manipulation
        function disableScript(elem) {
            elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
            return elem;
        }

        function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);
            if (match) {
                elem.type = match[1];
            } else {
                elem.removeAttribute("type");
            }
            return elem;
        }

// Mark scripts as having already been evaluated
        function setGlobalEval(elems, refElements) {
            var elem,
                i = 0;
            for (; (elem = elems[i]) != null; i++) {
                jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
            }
        }

        function cloneCopyEvent(src, dest) {

            if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
                return;
            }

            var type, i, l,
                oldData = jQuery._data(src),
                curData = jQuery._data(dest, oldData),
                events = oldData.events;

            if (events) {
                delete curData.handle;
                curData.events = {};

                for (type in events) {
                    for (i = 0, l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type, events[type][i]);
                    }
                }
            }

            // make the cloned public data object a copy from the original
            if (curData.data) {
                curData.data = jQuery.extend({}, curData.data);
            }
        }

        function fixCloneNodeIssues(src, dest) {
            var nodeName, e, data;

            // We do not need to do anything for non-Elements
            if (dest.nodeType !== 1) {
                return;
            }

            nodeName = dest.nodeName.toLowerCase();

            // IE6-8 copies events bound via attachEvent when using cloneNode.
            if (!jQuery.support.noCloneEvent && dest[jQuery.expando]) {
                data = jQuery._data(dest);

                for (e in data.events) {
                    jQuery.removeEvent(dest, e, data.handle);
                }

                // Event data gets referenced instead of copied if the expando gets copied too
                dest.removeAttribute(jQuery.expando);
            }

            // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
            if (nodeName === "script" && dest.text !== src.text) {
                disableScript(dest).text = src.text;
                restoreScript(dest);

                // IE6-10 improperly clones children of object elements using classid.
                // IE10 throws NoModificationAllowedError if parent is null, #12132.
            } else if (nodeName === "object") {
                if (dest.parentNode) {
                    dest.outerHTML = src.outerHTML;
                }

                // This path appears unavoidable for IE9. When cloning an object
                // element in IE9, the outerHTML strategy above is not sufficient.
                // If the src has innerHTML and the destination does not,
                // copy the src.innerHTML into the dest.innerHTML. #10324
                if (jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) )) {
                    dest.innerHTML = src.innerHTML;
                }

            } else if (nodeName === "input" && manipulation_rcheckableType.test(src.type)) {
                // IE6-8 fails to persist the checked state of a cloned checkbox
                // or radio button. Worse, IE6-7 fail to give the cloned element
                // a checked appearance if the defaultChecked value isn't also set

                dest.defaultChecked = dest.checked = src.checked;

                // IE6-7 get confused and end up setting the value of a cloned
                // checkbox/radio button to an empty string instead of "on"
                if (dest.value !== src.value) {
                    dest.value = src.value;
                }

                // IE6-8 fails to return the selected option to the default selected
                // state when cloning options
            } else if (nodeName === "option") {
                dest.defaultSelected = dest.selected = src.defaultSelected;

                // IE6-8 fails to set the defaultValue to the correct value when
                // cloning other types of input fields
            } else if (nodeName === "input" || nodeName === "textarea") {
                dest.defaultValue = src.defaultValue;
            }
        }

        jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (name, original) {
            jQuery.fn[name] = function (selector) {
                var elems,
                    i = 0,
                    ret = [],
                    insert = jQuery(selector),
                    last = insert.length - 1;

                for (; i <= last; i++) {
                    elems = i === last ? this : this.clone(true);
                    jQuery(insert[i])[original](elems);

                    // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
                    core_push.apply(ret, elems.get());
                }

                return this.pushStack(ret);
            };
        });

        function getAll(context, tag) {
            var elems, elem,
                i = 0,
                found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") :
                    typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") :
                        undefined;

            if (!found) {
                for (found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++) {
                    if (!tag || jQuery.nodeName(elem, tag)) {
                        found.push(elem);
                    } else {
                        jQuery.merge(found, getAll(elem, tag));
                    }
                }
            }

            return tag === undefined || tag && jQuery.nodeName(context, tag) ?
                jQuery.merge([context], found) :
                found;
        }

// Used in buildFragment, fixes the defaultChecked property
        function fixDefaultChecked(elem) {
            if (manipulation_rcheckableType.test(elem.type)) {
                elem.defaultChecked = elem.checked;
            }
        }

        jQuery.extend({
            clone: function (elem, dataAndEvents, deepDataAndEvents) {
                var destElements, node, clone, i, srcElements,
                    inPage = jQuery.contains(elem.ownerDocument, elem);

                if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                    clone = elem.cloneNode(true);

                    // IE<=8 does not properly clone detached, unknown element nodes
                } else {
                    fragmentDiv.innerHTML = elem.outerHTML;
                    fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
                }

                if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
                    (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

                    // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
                    destElements = getAll(clone);
                    srcElements = getAll(elem);

                    // Fix all IE cloning issues
                    for (i = 0; (node = srcElements[i]) != null; ++i) {
                        // Ensure that the destination node is not null; Fixes #9587
                        if (destElements[i]) {
                            fixCloneNodeIssues(node, destElements[i]);
                        }
                    }
                }

                // Copy the events from the original to the clone
                if (dataAndEvents) {
                    if (deepDataAndEvents) {
                        srcElements = srcElements || getAll(elem);
                        destElements = destElements || getAll(clone);

                        for (i = 0; (node = srcElements[i]) != null; i++) {
                            cloneCopyEvent(node, destElements[i]);
                        }
                    } else {
                        cloneCopyEvent(elem, clone);
                    }
                }

                // Preserve script evaluation history
                destElements = getAll(clone, "script");
                if (destElements.length > 0) {
                    setGlobalEval(destElements, !inPage && getAll(elem, "script"));
                }

                destElements = srcElements = node = null;

                // Return the cloned set
                return clone;
            },

            buildFragment: function (elems, context, scripts, selection) {
                var j, elem, contains,
                    tmp, tag, tbody, wrap,
                    l = elems.length,

                // Ensure a safe fragment
                    safe = createSafeFragment(context),

                    nodes = [],
                    i = 0;

                for (; i < l; i++) {
                    elem = elems[i];

                    if (elem || elem === 0) {

                        // Add nodes directly
                        if (jQuery.type(elem) === "object") {
                            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

                            // Convert non-html into a text node
                        } else if (!rhtml.test(elem)) {
                            nodes.push(context.createTextNode(elem));

                            // Convert html into DOM nodes
                        } else {
                            tmp = tmp || safe.appendChild(context.createElement("div"));

                            // Deserialize a standard representation
                            tag = ( rtagName.exec(elem) || ["", ""] )[1].toLowerCase();
                            wrap = wrapMap[tag] || wrapMap._default;

                            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

                            // Descend through wrappers to the right content
                            j = wrap[0];
                            while (j--) {
                                tmp = tmp.lastChild;
                            }

                            // Manually add leading whitespace removed by IE
                            if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                                nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
                            }

                            // Remove IE's autoinserted <tbody> from table fragments
                            if (!jQuery.support.tbody) {

                                // String was a <table>, *may* have spurious <tbody>
                                elem = tag === "table" && !rtbody.test(elem) ?
                                    tmp.firstChild :

                                    // String was a bare <thead> or <tfoot>
                                    wrap[1] === "<table>" && !rtbody.test(elem) ?
                                        tmp :
                                        0;

                                j = elem && elem.childNodes.length;
                                while (j--) {
                                    if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) {
                                        elem.removeChild(tbody);
                                    }
                                }
                            }

                            jQuery.merge(nodes, tmp.childNodes);

                            // Fix #12392 for WebKit and IE > 9
                            tmp.textContent = "";

                            // Fix #12392 for oldIE
                            while (tmp.firstChild) {
                                tmp.removeChild(tmp.firstChild);
                            }

                            // Remember the top-level container for proper cleanup
                            tmp = safe.lastChild;
                        }
                    }
                }

                // Fix #11356: Clear elements from fragment
                if (tmp) {
                    safe.removeChild(tmp);
                }

                // Reset defaultChecked for any radios and checkboxes
                // about to be appended to the DOM in IE 6/7 (#8060)
                if (!jQuery.support.appendChecked) {
                    jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
                }

                i = 0;
                while ((elem = nodes[i++])) {

                    // #4087 - If origin and destination elements are the same, and this is
                    // that element, do not do anything
                    if (selection && jQuery.inArray(elem, selection) !== -1) {
                        continue;
                    }

                    contains = jQuery.contains(elem.ownerDocument, elem);

                    // Append to fragment
                    tmp = getAll(safe.appendChild(elem), "script");

                    // Preserve script evaluation history
                    if (contains) {
                        setGlobalEval(tmp);
                    }

                    // Capture executables
                    if (scripts) {
                        j = 0;
                        while ((elem = tmp[j++])) {
                            if (rscriptType.test(elem.type || "")) {
                                scripts.push(elem);
                            }
                        }
                    }
                }

                tmp = null;

                return safe;
            },

            cleanData: function (elems, /* internal */ acceptData) {
                var elem, type, id, data,
                    i = 0,
                    internalKey = jQuery.expando,
                    cache = jQuery.cache,
                    deleteExpando = jQuery.support.deleteExpando,
                    special = jQuery.event.special;

                for (; (elem = elems[i]) != null; i++) {

                    if (acceptData || jQuery.acceptData(elem)) {

                        id = elem[internalKey];
                        data = id && cache[id];

                        if (data) {
                            if (data.events) {
                                for (type in data.events) {
                                    if (special[type]) {
                                        jQuery.event.remove(elem, type);

                                        // This is a shortcut to avoid jQuery.event.remove's overhead
                                    } else {
                                        jQuery.removeEvent(elem, type, data.handle);
                                    }
                                }
                            }

                            // Remove cache only if it was not already removed by jQuery.event.remove
                            if (cache[id]) {

                                delete cache[id];

                                // IE does not allow us to delete expando properties from nodes,
                                // nor does it have a removeAttribute function on Document nodes;
                                // we must handle all of these cases
                                if (deleteExpando) {
                                    delete elem[internalKey];

                                } else if (typeof elem.removeAttribute !== core_strundefined) {
                                    elem.removeAttribute(internalKey);

                                } else {
                                    elem[internalKey] = null;
                                }

                                core_deletedIds.push(id);
                            }
                        }
                    }
                }
            },

            _evalUrl: function (url) {
                return jQuery.ajax({
                    url: url,
                    type: "GET",
                    dataType: "script",
                    async: false,
                    global: false,
                    "throws": true
                });
            }
        });
        jQuery.fn.extend({
            wrapAll: function (html) {
                if (jQuery.isFunction(html)) {
                    return this.each(function (i) {
                        jQuery(this).wrapAll(html.call(this, i));
                    });
                }

                if (this[0]) {
                    // The elements to wrap the target around
                    var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

                    if (this[0].parentNode) {
                        wrap.insertBefore(this[0]);
                    }

                    wrap.map(function () {
                        var elem = this;

                        while (elem.firstChild && elem.firstChild.nodeType === 1) {
                            elem = elem.firstChild;
                        }

                        return elem;
                    }).append(this);
                }

                return this;
            },

            wrapInner: function (html) {
                if (jQuery.isFunction(html)) {
                    return this.each(function (i) {
                        jQuery(this).wrapInner(html.call(this, i));
                    });
                }

                return this.each(function () {
                    var self = jQuery(this),
                        contents = self.contents();

                    if (contents.length) {
                        contents.wrapAll(html);

                    } else {
                        self.append(html);
                    }
                });
            },

            wrap: function (html) {
                var isFunction = jQuery.isFunction(html);

                return this.each(function (i) {
                    jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
                });
            },

            unwrap: function () {
                return this.parent().each(function () {
                    if (!jQuery.nodeName(this, "body")) {
                        jQuery(this).replaceWith(this.childNodes);
                    }
                }).end();
            }
        });
        var iframe, getStyles, curCSS,
            ralpha = /alpha\([^)]*\)/i,
            ropacity = /opacity\s*=\s*([^)]*)/,
            rposition = /^(top|right|bottom|left)$/,
        // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
        // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
            rdisplayswap = /^(none|table(?!-c[ea]).+)/,
            rmargin = /^margin/,
            rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
            rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
            rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
            elemdisplay = {BODY: "block"},

            cssShow = {position: "absolute", visibility: "hidden", display: "block"},
            cssNormalTransform = {
                letterSpacing: 0,
                fontWeight: 400
            },

            cssExpand = ["Top", "Right", "Bottom", "Left"],
            cssPrefixes = ["Webkit", "O", "Moz", "ms"];

// return a css property mapped to a potentially vendor prefixed property
        function vendorPropName(style, name) {

            // shortcut for names that are not vendor prefixed
            if (name in style) {
                return name;
            }

            // check for vendor prefixed names
            var capName = name.charAt(0).toUpperCase() + name.slice(1),
                origName = name,
                i = cssPrefixes.length;

            while (i--) {
                name = cssPrefixes[i] + capName;
                if (name in style) {
                    return name;
                }
            }

            return origName;
        }

        function isHidden(elem, el) {
            // isHidden might be called from jQuery#filter function;
            // in that case, element will be second argument
            elem = el || elem;
            return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
        }

        function showHide(elements, show) {
            var display, elem, hidden,
                values = [],
                index = 0,
                length = elements.length;

            for (; index < length; index++) {
                elem = elements[index];
                if (!elem.style) {
                    continue;
                }

                values[index] = jQuery._data(elem, "olddisplay");
                display = elem.style.display;
                if (show) {
                    // Reset the inline display of this element to learn if it is
                    // being hidden by cascaded rules or not
                    if (!values[index] && display === "none") {
                        elem.style.display = "";
                    }

                    // Set elements which have been overridden with display: none
                    // in a stylesheet to whatever the default browser style is
                    // for such an element
                    if (elem.style.display === "" && isHidden(elem)) {
                        values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName));
                    }
                } else {

                    if (!values[index]) {
                        hidden = isHidden(elem);

                        if (display && display !== "none" || !hidden) {
                            jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                        }
                    }
                }
            }

            // Set the display of most of the elements in a second loop
            // to avoid the constant reflow
            for (index = 0; index < length; index++) {
                elem = elements[index];
                if (!elem.style) {
                    continue;
                }
                if (!show || elem.style.display === "none" || elem.style.display === "") {
                    elem.style.display = show ? values[index] || "" : "none";
                }
            }

            return elements;
        }

        jQuery.fn.extend({
            css: function (name, value) {
                return jQuery.access(this, function (elem, name, value) {
                    var len, styles,
                        map = {},
                        i = 0;

                    if (jQuery.isArray(name)) {
                        styles = getStyles(elem);
                        len = name.length;

                        for (; i < len; i++) {
                            map[name[i]] = jQuery.css(elem, name[i], false, styles);
                        }

                        return map;
                    }

                    return value !== undefined ?
                        jQuery.style(elem, name, value) :
                        jQuery.css(elem, name);
                }, name, value, arguments.length > 1);
            },
            show: function () {
                return showHide(this, true);
            },
            hide: function () {
                return showHide(this);
            },
            toggle: function (state) {
                if (typeof state === "boolean") {
                    return state ? this.show() : this.hide();
                }

                return this.each(function () {
                    if (isHidden(this)) {
                        jQuery(this).show();
                    } else {
                        jQuery(this).hide();
                    }
                });
            }
        });

        jQuery.extend({
            // Add in style property hooks for overriding the default
            // behavior of getting and setting a style property
            cssHooks: {
                opacity: {
                    get: function (elem, computed) {
                        if (computed) {
                            // We should always get a number back from opacity
                            var ret = curCSS(elem, "opacity");
                            return ret === "" ? "1" : ret;
                        }
                    }
                }
            },

            // Don't automatically add "px" to these possibly-unitless properties
            cssNumber: {
                "columnCount": true,
                "fillOpacity": true,
                "fontWeight": true,
                "lineHeight": true,
                "opacity": true,
                "order": true,
                "orphans": true,
                "widows": true,
                "zIndex": true,
                "zoom": true
            },

            // Add in properties whose names you wish to fix before
            // setting or getting the value
            cssProps: {
                // normalize float css property
                "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
            },

            // Get and set the style property on a DOM Node
            style: function (elem, name, value, extra) {
                // Don't set styles on text and comment nodes
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                    return;
                }

                // Make sure that we're working with the right name
                var ret, type, hooks,
                    origName = jQuery.camelCase(name),
                    style = elem.style;

                name = jQuery.cssProps[origName] || ( jQuery.cssProps[origName] = vendorPropName(style, origName) );

                // gets hook for the prefixed version
                // followed by the unprefixed version
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

                // Check if we're setting a value
                if (value !== undefined) {
                    type = typeof value;

                    // convert relative number strings (+= or -=) to relative numbers. #7345
                    if (type === "string" && (ret = rrelNum.exec(value))) {
                        value = ( ret[1] + 1 ) * ret[2] + parseFloat(jQuery.css(elem, name));
                        // Fixes bug #9237
                        type = "number";
                    }

                    // Make sure that NaN and null values aren't set. See: #7116
                    if (value == null || type === "number" && isNaN(value)) {
                        return;
                    }

                    // If a number was passed in, add 'px' to the (except for certain CSS properties)
                    if (type === "number" && !jQuery.cssNumber[origName]) {
                        value += "px";
                    }

                    // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
                    // but it would mean to define eight (for every problematic property) identical functions
                    if (!jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                        style[name] = "inherit";
                    }

                    // If a hook was provided, use that value, otherwise just set the specified value
                    if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

                        // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
                        // Fixes bug #5509
                        try {
                            style[name] = value;
                        } catch (e) {
                        }
                    }

                } else {
                    // If a hook was provided get the non-computed value from there
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                        return ret;
                    }

                    // Otherwise just get the value from the style object
                    return style[name];
                }
            },

            css: function (elem, name, extra, styles) {
                var num, val, hooks,
                    origName = jQuery.camelCase(name);

                // Make sure that we're working with the right name
                name = jQuery.cssProps[origName] || ( jQuery.cssProps[origName] = vendorPropName(elem.style, origName) );

                // gets hook for the prefixed version
                // followed by the unprefixed version
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

                // If a hook was provided get the computed value from there
                if (hooks && "get" in hooks) {
                    val = hooks.get(elem, true, extra);
                }

                // Otherwise, if a way to get the computed value exists, use that
                if (val === undefined) {
                    val = curCSS(elem, name, styles);
                }

                //convert "normal" to computed value
                if (val === "normal" && name in cssNormalTransform) {
                    val = cssNormalTransform[name];
                }

                // Return, converting to number if forced or a qualifier was provided and val looks numeric
                if (extra === "" || extra) {
                    num = parseFloat(val);
                    return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
                }
                return val;
            }
        });

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
        if (window.getComputedStyle) {
            getStyles = function (elem) {
                return window.getComputedStyle(elem, null);
            };

            curCSS = function (elem, name, _computed) {
                var width, minWidth, maxWidth,
                    computed = _computed || getStyles(elem),

                // getPropertyValue is only needed for .css('filter') in IE9, see #12537
                    ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
                    style = elem.style;

                if (computed) {

                    if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                        ret = jQuery.style(elem, name);
                    }

                    // A tribute to the "awesome hack by Dean Edwards"
                    // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
                    // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
                    // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                    if (rnumnonpx.test(ret) && rmargin.test(name)) {

                        // Remember the original values
                        width = style.width;
                        minWidth = style.minWidth;
                        maxWidth = style.maxWidth;

                        // Put in the new values to get a computed value out
                        style.minWidth = style.maxWidth = style.width = ret;
                        ret = computed.width;

                        // Revert the changed values
                        style.width = width;
                        style.minWidth = minWidth;
                        style.maxWidth = maxWidth;
                    }
                }

                return ret;
            };
        } else if (document.documentElement.currentStyle) {
            getStyles = function (elem) {
                return elem.currentStyle;
            };

            curCSS = function (elem, name, _computed) {
                var left, rs, rsLeft,
                    computed = _computed || getStyles(elem),
                    ret = computed ? computed[name] : undefined,
                    style = elem.style;

                // Avoid setting ret to empty string here
                // so we don't default to auto
                if (ret == null && style && style[name]) {
                    ret = style[name];
                }

                // From the awesome hack by Dean Edwards
                // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

                // If we're not dealing with a regular pixel number
                // but a number that has a weird ending, we need to convert it to pixels
                // but not position css attributes, as those are proportional to the parent element instead
                // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
                if (rnumnonpx.test(ret) && !rposition.test(name)) {

                    // Remember the original values
                    left = style.left;
                    rs = elem.runtimeStyle;
                    rsLeft = rs && rs.left;

                    // Put in the new values to get a computed value out
                    if (rsLeft) {
                        rs.left = elem.currentStyle.left;
                    }
                    style.left = name === "fontSize" ? "1em" : ret;
                    ret = style.pixelLeft + "px";

                    // Revert the changed values
                    style.left = left;
                    if (rsLeft) {
                        rs.left = rsLeft;
                    }
                }

                return ret === "" ? "auto" : ret;
            };
        }

        function setPositiveNumber(elem, value, subtract) {
            var matches = rnumsplit.exec(value);
            return matches ?
                // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max(0, matches[1] - ( subtract || 0 )) + ( matches[2] || "px" ) :
                value;
        }

        function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
            var i = extra === ( isBorderBox ? "border" : "content" ) ?
                    // If we already have the right measurement, avoid augmentation
                    4 :
                    // Otherwise initialize for horizontal or vertical properties
                    name === "width" ? 1 : 0,

                val = 0;

            for (; i < 4; i += 2) {
                // both box models exclude margin, so add it if we want it
                if (extra === "margin") {
                    val += jQuery.css(elem, extra + cssExpand[i], true, styles);
                }

                if (isBorderBox) {
                    // border-box includes padding, so remove it if we want content
                    if (extra === "content") {
                        val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                    }

                    // at this point, extra isn't border nor margin, so remove border
                    if (extra !== "margin") {
                        val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                    }
                } else {
                    // at this point, extra isn't content, so add padding
                    val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

                    // at this point, extra isn't content nor padding, so add border
                    if (extra !== "padding") {
                        val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                    }
                }
            }

            return val;
        }

        function getWidthOrHeight(elem, name, extra) {

            // Start with offset property, which is equivalent to the border-box value
            var valueIsBorderBox = true,
                val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
                styles = getStyles(elem),
                isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";

            // some non-html elements return undefined for offsetWidth, so check for null/undefined
            // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
            // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
            if (val <= 0 || val == null) {
                // Fall back to computed then uncomputed css if necessary
                val = curCSS(elem, name, styles);
                if (val < 0 || val == null) {
                    val = elem.style[name];
                }

                // Computed unit is not pixels. Stop here and return.
                if (rnumnonpx.test(val)) {
                    return val;
                }

                // we need the check for style in case a browser which returns unreliable values
                // for getComputedStyle silently falls back to the reliable elem.style
                valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[name] );

                // Normalize "", auto, and prepare for extra
                val = parseFloat(val) || 0;
            }

            // use the active box-sizing model to add/subtract irrelevant styles
            return ( val +
                augmentWidthOrHeight(
                    elem,
                    name,
                    extra || ( isBorderBox ? "border" : "content" ),
                    valueIsBorderBox,
                    styles
                )
                ) + "px";
        }

// Try to determine the default display value of an element
        function css_defaultDisplay(nodeName) {
            var doc = document,
                display = elemdisplay[nodeName];

            if (!display) {
                display = actualDisplay(nodeName, doc);

                // If the simple way fails, read from inside an iframe
                if (display === "none" || !display) {
                    // Use the already-created iframe if possible
                    iframe = ( iframe ||
                    jQuery("<iframe frameborder='0' width='0' height='0'/>")
                        .css("cssText", "display:block !important")
                    ).appendTo(doc.documentElement);

                    // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
                    doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
                    doc.write("<!doctype html><html><body>");
                    doc.close();

                    display = actualDisplay(nodeName, doc);
                    iframe.detach();
                }

                // Store the correct default display
                elemdisplay[nodeName] = display;
            }

            return display;
        }

// Called ONLY from within css_defaultDisplay
        function actualDisplay(name, doc) {
            var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
                display = jQuery.css(elem[0], "display");
            elem.remove();
            return display;
        }

        jQuery.each(["height", "width"], function (i, name) {
            jQuery.cssHooks[name] = {
                get: function (elem, computed, extra) {
                    if (computed) {
                        // certain elements can have dimension info if we invisibly show them
                        // however, it must have a current display style that would benefit from this
                        return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, "display")) ?
                            jQuery.swap(elem, cssShow, function () {
                                return getWidthOrHeight(elem, name, extra);
                            }) :
                            getWidthOrHeight(elem, name, extra);
                    }
                },

                set: function (elem, value, extra) {
                    var styles = extra && getStyles(elem);
                    return setPositiveNumber(elem, value, extra ?
                            augmentWidthOrHeight(
                                elem,
                                name,
                                extra,
                                jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                                styles
                            ) : 0
                    );
                }
            };
        });

        if (!jQuery.support.opacity) {
            jQuery.cssHooks.opacity = {
                get: function (elem, computed) {
                    // IE uses filters for opacity
                    return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
                    ( 0.01 * parseFloat(RegExp.$1) ) + "" :
                        computed ? "1" : "";
                },

                set: function (elem, value) {
                    var style = elem.style,
                        currentStyle = elem.currentStyle,
                        opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                        filter = currentStyle && currentStyle.filter || style.filter || "";

                    // IE has trouble with opacity if it does not have layout
                    // Force it by setting the zoom level
                    style.zoom = 1;

                    // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
                    // if value === "", then remove inline opacity #12685
                    if (( value >= 1 || value === "" ) &&
                        jQuery.trim(filter.replace(ralpha, "")) === "" &&
                        style.removeAttribute) {

                        // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                        // if "filter:" is present at all, clearType is disabled, we want to avoid this
                        // style.removeAttribute is IE Only, but so apparently is this code path...
                        style.removeAttribute("filter");

                        // if there is no filter style applied in a css rule or unset inline opacity, we are done
                        if (value === "" || currentStyle && !currentStyle.filter) {
                            return;
                        }
                    }

                    // otherwise, set new filter values
                    style.filter = ralpha.test(filter) ?
                        filter.replace(ralpha, opacity) :
                    filter + " " + opacity;
                }
            };
        }

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
        jQuery(function () {
            if (!jQuery.support.reliableMarginRight) {
                jQuery.cssHooks.marginRight = {
                    get: function (elem, computed) {
                        if (computed) {
                            // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                            // Work around by temporarily setting element display to inline-block
                            return jQuery.swap(elem, {"display": "inline-block"},
                                curCSS, [elem, "marginRight"]);
                        }
                    }
                };
            }

            // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
            // getComputedStyle returns percent when specified for top/left/bottom/right
            // rather than make the css module depend on the offset module, we just check for it here
            if (!jQuery.support.pixelPosition && jQuery.fn.position) {
                jQuery.each(["top", "left"], function (i, prop) {
                    jQuery.cssHooks[prop] = {
                        get: function (elem, computed) {
                            if (computed) {
                                computed = curCSS(elem, prop);
                                // if curCSS returns percentage, fallback to offset
                                return rnumnonpx.test(computed) ?
                                jQuery(elem).position()[prop] + "px" :
                                    computed;
                            }
                        }
                    };
                });
            }

        });

        if (jQuery.expr && jQuery.expr.filters) {
            jQuery.expr.filters.hidden = function (elem) {
                // Support: Opera <= 12.12
                // Opera reports offsetWidths and offsetHeights less than zero on some elements
                return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
                    (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none");
            };

            jQuery.expr.filters.visible = function (elem) {
                return !jQuery.expr.filters.hidden(elem);
            };
        }

// These hooks are used by animate to expand properties
        jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function (value) {
                    var i = 0,
                        expanded = {},

                    // assumes a single number if not a string
                        parts = typeof value === "string" ? value.split(" ") : [value];

                    for (; i < 4; i++) {
                        expanded[prefix + cssExpand[i] + suffix] =
                            parts[i] || parts[i - 2] || parts[0];
                    }

                    return expanded;
                }
            };

            if (!rmargin.test(prefix)) {
                jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
            }
        });
        var r20 = /%20/g,
            rbracket = /\[\]$/,
            rCRLF = /\r?\n/g,
            rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
            rsubmittable = /^(?:input|select|textarea|keygen)/i;

        jQuery.fn.extend({
            serialize: function () {
                return jQuery.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    // Can add propHook for "elements" to filter or add form elements
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this;
                })
                    .filter(function () {
                        var type = this.type;
                        // Use .is(":disabled") so that fieldset[disabled] works
                        return this.name && !jQuery(this).is(":disabled") &&
                            rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                            ( this.checked || !manipulation_rcheckableType.test(type) );
                    })
                    .map(function (i, elem) {
                        var val = jQuery(this).val();

                        return val == null ?
                            null :
                            jQuery.isArray(val) ?
                                jQuery.map(val, function (val) {
                                    return {name: elem.name, value: val.replace(rCRLF, "\r\n")};
                                }) :
                            {name: elem.name, value: val.replace(rCRLF, "\r\n")};
                    }).get();
            }
        });

//Serialize an array of form elements or a set of
//key/values into a query string
        jQuery.param = function (a, traditional) {
            var prefix,
                s = [],
                add = function (key, value) {
                    // If value is a function, invoke it and return its value
                    value = jQuery.isFunction(value) ? value() : ( value == null ? "" : value );
                    s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                };

            // Set traditional to true for jQuery <= 1.3.2 behavior.
            if (traditional === undefined) {
                traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
            }

            // If an array was passed in, assume that it is an array of form elements.
            if (jQuery.isArray(a) || ( a.jquery && !jQuery.isPlainObject(a) )) {
                // Serialize the form elements
                jQuery.each(a, function () {
                    add(this.name, this.value);
                });

            } else {
                // If traditional, encode the "old" way (the way 1.3.2 or older
                // did it), otherwise encode params recursively.
                for (prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add);
                }
            }

            // Return the resulting serialization
            return s.join("&").replace(r20, "+");
        };

        function buildParams(prefix, obj, traditional, add) {
            var name;

            if (jQuery.isArray(obj)) {
                // Serialize array item.
                jQuery.each(obj, function (i, v) {
                    if (traditional || rbracket.test(prefix)) {
                        // Treat each array item as a scalar.
                        add(prefix, v);

                    } else {
                        // Item is non-scalar (array or object), encode its numeric index.
                        buildParams(prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add);
                    }
                });

            } else if (!traditional && jQuery.type(obj) === "object") {
                // Serialize object item.
                for (name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                }

            } else {
                // Serialize scalar item.
                add(prefix, obj);
            }
        }

        jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {

            // Handle event binding
            jQuery.fn[name] = function (data, fn) {
                return arguments.length > 0 ?
                    this.on(name, null, data, fn) :
                    this.trigger(name);
            };
        });

        jQuery.fn.extend({
            hover: function (fnOver, fnOut) {
                return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
            },

            bind: function (types, data, fn) {
                return this.on(types, null, data, fn);
            },
            unbind: function (types, fn) {
                return this.off(types, null, fn);
            },

            delegate: function (selector, types, data, fn) {
                return this.on(types, selector, data, fn);
            },
            undelegate: function (selector, types, fn) {
                // ( namespace ) or ( selector, types [, fn] )
                return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
            }
        });
        var
        // Document location
            ajaxLocParts,
            ajaxLocation,
            ajax_nonce = jQuery.now(),

            ajax_rquery = /\?/,
            rhash = /#.*$/,
            rts = /([?&])_=[^&]*/,
            rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
        // #7653, #8125, #8152: local protocol detection
            rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rnoContent = /^(?:GET|HEAD)$/,
            rprotocol = /^\/\//,
            rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

        // Keep a copy of the old load method
            _load = jQuery.fn.load,

        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
            prefilters = {},

        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
            transports = {},

        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
            allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
        try {
            ajaxLocation = location.href;
        } catch (e) {
            // Use the href attribute of an A element
            // since IE will modify it given document.location
            ajaxLocation = document.createElement("a");
            ajaxLocation.href = "";
            ajaxLocation = ajaxLocation.href;
        }

// Segment location into parts
        ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
        function addToPrefiltersOrTransports(structure) {

            // dataTypeExpression is optional and defaults to "*"
            return function (dataTypeExpression, func) {

                if (typeof dataTypeExpression !== "string") {
                    func = dataTypeExpression;
                    dataTypeExpression = "*";
                }

                var dataType,
                    i = 0,
                    dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];

                if (jQuery.isFunction(func)) {
                    // For each dataType in the dataTypeExpression
                    while ((dataType = dataTypes[i++])) {
                        // Prepend if requested
                        if (dataType[0] === "+") {
                            dataType = dataType.slice(1) || "*";
                            (structure[dataType] = structure[dataType] || []).unshift(func);

                            // Otherwise append
                        } else {
                            (structure[dataType] = structure[dataType] || []).push(func);
                        }
                    }
                }
            };
        }

// Base inspection function for prefilters and transports
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

            var inspected = {},
                seekingTransport = ( structure === transports );

            function inspect(dataType) {
                var selected;
                inspected[dataType] = true;
                jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                        options.dataTypes.unshift(dataTypeOrTransport);
                        inspect(dataTypeOrTransport);
                        return false;
                    } else if (seekingTransport) {
                        return !( selected = dataTypeOrTransport );
                    }
                });
                return selected;
            }

            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
        function ajaxExtend(target, src) {
            var deep, key,
                flatOptions = jQuery.ajaxSettings.flatOptions || {};

            for (key in src) {
                if (src[key] !== undefined) {
                    ( flatOptions[key] ? target : ( deep || (deep = {}) ) )[key] = src[key];
                }
            }
            if (deep) {
                jQuery.extend(true, target, deep);
            }

            return target;
        }

        jQuery.fn.load = function (url, params, callback) {
            if (typeof url !== "string" && _load) {
                return _load.apply(this, arguments);
            }

            var selector, response, type,
                self = this,
                off = url.indexOf(" ");

            if (off >= 0) {
                selector = url.slice(off, url.length);
                url = url.slice(0, off);
            }

            // If it's a function
            if (jQuery.isFunction(params)) {

                // We assume that it's the callback
                callback = params;
                params = undefined;

                // Otherwise, build a param string
            } else if (params && typeof params === "object") {
                type = "POST";
            }

            // If we have elements to modify, make the request
            if (self.length > 0) {
                jQuery.ajax({
                    url: url,

                    // if "type" variable is undefined, then "GET" method will be used
                    type: type,
                    dataType: "html",
                    data: params
                }).done(function (responseText) {

                    // Save response for use in complete callback
                    response = arguments;

                    self.html(selector ?

                        // If a selector was specified, locate the right elements in a dummy div
                        // Exclude scripts to avoid IE 'Permission Denied' errors
                        jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

                        // Otherwise use the full result
                        responseText);

                }).complete(callback && function (jqXHR, status) {
                    self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
                });
            }

            return this;
        };

// Attach a bunch of functions for handling common AJAX events
        jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
            jQuery.fn[type] = function (fn) {
                return this.on(type, fn);
            };
        });

        jQuery.extend({

            // Counter for holding the number of active queries
            active: 0,

            // Last-Modified header cache for next request
            lastModified: {},
            etag: {},

            ajaxSettings: {
                url: ajaxLocation,
                type: "GET",
                isLocal: rlocalProtocol.test(ajaxLocParts[1]),
                global: true,
                processData: true,
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                /*
                 timeout: 0,
                 data: null,
                 dataType: null,
                 username: null,
                 password: null,
                 cache: null,
                 throws: false,
                 traditional: false,
                 headers: {},
                 */

                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },

                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },

                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },

                // Data converters
                // Keys separate source (or catchall "*") and destination types with a single space
                converters: {

                    // Convert anything to text
                    "* text": String,

                    // Text to html (true = no transformation)
                    "text html": true,

                    // Evaluate text as a json expression
                    "text json": jQuery.parseJSON,

                    // Parse text as xml
                    "text xml": jQuery.parseXML
                },

                // For options that shouldn't be deep extended:
                // you can add your own custom options here if
                // and when you create one that shouldn't be
                // deep extended (see ajaxExtend)
                flatOptions: {
                    url: true,
                    context: true
                }
            },

            // Creates a full fledged settings object into target
            // with both ajaxSettings and settings fields.
            // If target is omitted, writes into ajaxSettings.
            ajaxSetup: function (target, settings) {
                return settings ?

                    // Building a settings object
                    ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

                    // Extending ajaxSettings
                    ajaxExtend(jQuery.ajaxSettings, target);
            },

            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),

            // Main method
            ajax: function (url, options) {

                // If url is an object, simulate pre-1.5 signature
                if (typeof url === "object") {
                    options = url;
                    url = undefined;
                }

                // Force options to be an object
                options = options || {};

                var // Cross-domain detection vars
                    parts,
                // Loop variable
                    i,
                // URL without anti-cache param
                    cacheURL,
                // Response headers as string
                    responseHeadersString,
                // timeout handle
                    timeoutTimer,

                // To know if global events are to be dispatched
                    fireGlobals,

                    transport,
                // Response headers
                    responseHeaders,
                // Create the final options object
                    s = jQuery.ajaxSetup({}, options),
                // Callbacks context
                    callbackContext = s.context || s,
                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                    globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
                        jQuery(callbackContext) :
                        jQuery.event,
                // Deferreds
                    deferred = jQuery.Deferred(),
                    completeDeferred = jQuery.Callbacks("once memory"),
                // Status-dependent callbacks
                    statusCode = s.statusCode || {},
                // Headers (they are sent all at once)
                    requestHeaders = {},
                    requestHeadersNames = {},
                // The jqXHR state
                    state = 0,
                // Default abort message
                    strAbort = "canceled",
                // Fake xhr
                    jqXHR = {
                        readyState: 0,

                        // Builds headers hashtable if needed
                        getResponseHeader: function (key) {
                            var match;
                            if (state === 2) {
                                if (!responseHeaders) {
                                    responseHeaders = {};
                                    while ((match = rheaders.exec(responseHeadersString))) {
                                        responseHeaders[match[1].toLowerCase()] = match[2];
                                    }
                                }
                                match = responseHeaders[key.toLowerCase()];
                            }
                            return match == null ? null : match;
                        },

                        // Raw string
                        getAllResponseHeaders: function () {
                            return state === 2 ? responseHeadersString : null;
                        },

                        // Caches the header
                        setRequestHeader: function (name, value) {
                            var lname = name.toLowerCase();
                            if (!state) {
                                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                                requestHeaders[name] = value;
                            }
                            return this;
                        },

                        // Overrides response content-type header
                        overrideMimeType: function (type) {
                            if (!state) {
                                s.mimeType = type;
                            }
                            return this;
                        },

                        // Status-dependent callbacks
                        statusCode: function (map) {
                            var code;
                            if (map) {
                                if (state < 2) {
                                    for (code in map) {
                                        // Lazy-add the new callback in a way that preserves old ones
                                        statusCode[code] = [statusCode[code], map[code]];
                                    }
                                } else {
                                    // Execute the appropriate callbacks
                                    jqXHR.always(map[jqXHR.status]);
                                }
                            }
                            return this;
                        },

                        // Cancel the request
                        abort: function (statusText) {
                            var finalText = statusText || strAbort;
                            if (transport) {
                                transport.abort(finalText);
                            }
                            done(0, finalText);
                            return this;
                        }
                    };

                // Attach deferreds
                deferred.promise(jqXHR).complete = completeDeferred.add;
                jqXHR.success = jqXHR.done;
                jqXHR.error = jqXHR.fail;

                // Remove hash character (#7531: and string promotion)
                // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
                // Handle falsy url in the settings object (#10093: consistency with old signature)
                // We also use the url parameter if available
                s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");

                // Alias method option to type as per ticket #12004
                s.type = options.method || options.type || s.method || s.type;

                // Extract dataTypes list
                s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [""];

                // A cross-domain request is in order when we have a protocol:host:port mismatch
                if (s.crossDomain == null) {
                    parts = rurl.exec(s.url.toLowerCase());
                    s.crossDomain = !!( parts &&
                    ( parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
                    ( parts[3] || ( parts[1] === "http:" ? "80" : "443" ) ) !==
                    ( ajaxLocParts[3] || ( ajaxLocParts[1] === "http:" ? "80" : "443" ) ) )
                    );
                }

                // Convert data if not already a string
                if (s.data && s.processData && typeof s.data !== "string") {
                    s.data = jQuery.param(s.data, s.traditional);
                }

                // Apply prefilters
                inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

                // If request was aborted inside a prefilter, stop there
                if (state === 2) {
                    return jqXHR;
                }

                // We can fire global events as of now if asked to
                fireGlobals = s.global;

                // Watch for a new set of requests
                if (fireGlobals && jQuery.active++ === 0) {
                    jQuery.event.trigger("ajaxStart");
                }

                // Uppercase the type
                s.type = s.type.toUpperCase();

                // Determine if request has content
                s.hasContent = !rnoContent.test(s.type);

                // Save the URL in case we're toying with the If-Modified-Since
                // and/or If-None-Match header later on
                cacheURL = s.url;

                // More options handling for requests with no content
                if (!s.hasContent) {

                    // If data is available, append data to url
                    if (s.data) {
                        cacheURL = ( s.url += ( ajax_rquery.test(cacheURL) ? "&" : "?" ) + s.data );
                        // #9682: remove data so that it's not used in an eventual retry
                        delete s.data;
                    }

                    // Add anti-cache in url if needed
                    if (s.cache === false) {
                        s.url = rts.test(cacheURL) ?

                            // If there is already a '_' parameter, set its value
                            cacheURL.replace(rts, "$1_=" + ajax_nonce++) :

                            // Otherwise add one to the end
                        cacheURL + ( ajax_rquery.test(cacheURL) ? "&" : "?" ) + "_=" + ajax_nonce++;
                    }
                }

                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                if (s.ifModified) {
                    if (jQuery.lastModified[cacheURL]) {
                        jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                    }
                    if (jQuery.etag[cacheURL]) {
                        jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                    }
                }

                // Set the correct header, if data is being sent
                if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                    jqXHR.setRequestHeader("Content-Type", s.contentType);
                }

                // Set the Accepts header for the server, depending on the dataType
                jqXHR.setRequestHeader(
                    "Accept",
                    s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                    s.accepts[s.dataTypes[0]] + ( s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                        s.accepts["*"]
                );

                // Check for headers option
                for (i in s.headers) {
                    jqXHR.setRequestHeader(i, s.headers[i]);
                }

                // Allow custom headers/mimetypes and early abort
                if (s.beforeSend && ( s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2 )) {
                    // Abort if not done already and return
                    return jqXHR.abort();
                }

                // aborting is no longer a cancellation
                strAbort = "abort";

                // Install callbacks on deferreds
                for (i in {success: 1, error: 1, complete: 1}) {
                    jqXHR[i](s[i]);
                }

                // Get transport
                transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

                // If no transport, we auto-abort
                if (!transport) {
                    done(-1, "No Transport");
                } else {
                    jqXHR.readyState = 1;

                    // Send global event
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                    }
                    // Timeout
                    if (s.async && s.timeout > 0) {
                        timeoutTimer = setTimeout(function () {
                            jqXHR.abort("timeout");
                        }, s.timeout);
                    }

                    try {
                        state = 1;
                        transport.send(requestHeaders, done);
                    } catch (e) {
                        // Propagate exception as error if not done
                        if (state < 2) {
                            done(-1, e);
                            // Simply rethrow otherwise
                        } else {
                            throw e;
                        }
                    }
                }

                // Callback for when everything is done
                function done(status, nativeStatusText, responses, headers) {
                    var isSuccess, success, error, response, modified,
                        statusText = nativeStatusText;

                    // Called once
                    if (state === 2) {
                        return;
                    }

                    // State is "done" now
                    state = 2;

                    // Clear timeout if it exists
                    if (timeoutTimer) {
                        clearTimeout(timeoutTimer);
                    }

                    // Dereference transport for early garbage collection
                    // (no matter how long the jqXHR object will be used)
                    transport = undefined;

                    // Cache response headers
                    responseHeadersString = headers || "";

                    // Set readyState
                    jqXHR.readyState = status > 0 ? 4 : 0;

                    // Determine if successful
                    isSuccess = status >= 200 && status < 300 || status === 304;

                    // Get response data
                    if (responses) {
                        response = ajaxHandleResponses(s, jqXHR, responses);
                    }

                    // Convert no matter what (that way responseXXX fields are always set)
                    response = ajaxConvert(s, response, jqXHR, isSuccess);

                    // If successful, handle type chaining
                    if (isSuccess) {

                        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                        if (s.ifModified) {
                            modified = jqXHR.getResponseHeader("Last-Modified");
                            if (modified) {
                                jQuery.lastModified[cacheURL] = modified;
                            }
                            modified = jqXHR.getResponseHeader("etag");
                            if (modified) {
                                jQuery.etag[cacheURL] = modified;
                            }
                        }

                        // if no content
                        if (status === 204 || s.type === "HEAD") {
                            statusText = "nocontent";

                            // if not modified
                        } else if (status === 304) {
                            statusText = "notmodified";

                            // If we have data, let's convert it
                        } else {
                            statusText = response.state;
                            success = response.data;
                            error = response.error;
                            isSuccess = !error;
                        }
                    } else {
                        // We extract error from statusText
                        // then normalize statusText and status for non-aborts
                        error = statusText;
                        if (status || !statusText) {
                            statusText = "error";
                            if (status < 0) {
                                status = 0;
                            }
                        }
                    }

                    // Set data for the fake xhr object
                    jqXHR.status = status;
                    jqXHR.statusText = ( nativeStatusText || statusText ) + "";

                    // Success/Error
                    if (isSuccess) {
                        deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                    } else {
                        deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                    }

                    // Status-dependent callbacks
                    jqXHR.statusCode(statusCode);
                    statusCode = undefined;

                    if (fireGlobals) {
                        globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
                            [jqXHR, s, isSuccess ? success : error]);
                    }

                    // Complete
                    completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                        // Handle the global AJAX counter
                        if (!( --jQuery.active )) {
                            jQuery.event.trigger("ajaxStop");
                        }
                    }
                }

                return jqXHR;
            },

            getJSON: function (url, data, callback) {
                return jQuery.get(url, data, callback, "json");
            },

            getScript: function (url, callback) {
                return jQuery.get(url, undefined, callback, "script");
            }
        });

        jQuery.each(["get", "post"], function (i, method) {
            jQuery[method] = function (url, data, callback, type) {
                // shift arguments if data argument was omitted
                if (jQuery.isFunction(data)) {
                    type = type || callback;
                    callback = data;
                    data = undefined;
                }

                return jQuery.ajax({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                });
            };
        });

        /* Handles responses to an ajax request:
         * - finds the right dataType (mediates between content-type and expected dataType)
         * - returns the corresponding response
         */
        function ajaxHandleResponses(s, jqXHR, responses) {
            var firstDataType, ct, finalDataType, type,
                contents = s.contents,
                dataTypes = s.dataTypes;

            // Remove auto dataType and get content-type in the process
            while (dataTypes[0] === "*") {
                dataTypes.shift();
                if (ct === undefined) {
                    ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
                }
            }

            // Check if we're dealing with a known content-type
            if (ct) {
                for (type in contents) {
                    if (contents[type] && contents[type].test(ct)) {
                        dataTypes.unshift(type);
                        break;
                    }
                }
            }

            // Check to see if we have a response for the expected dataType
            if (dataTypes[0] in responses) {
                finalDataType = dataTypes[0];
            } else {
                // Try convertible dataTypes
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break;
                    }
                    if (!firstDataType) {
                        firstDataType = type;
                    }
                }
                // Or just use first one
                finalDataType = finalDataType || firstDataType;
            }

            // If we found a dataType
            // We add the dataType to the list if needed
            // and return the corresponding response
            if (finalDataType) {
                if (finalDataType !== dataTypes[0]) {
                    dataTypes.unshift(finalDataType);
                }
                return responses[finalDataType];
            }
        }

        /* Chain conversions given the request and the original response
         * Also sets the responseXXX fields on the jqXHR instance
         */
        function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2, current, conv, tmp, prev,
                converters = {},
            // Work with a copy of dataTypes in case we need to modify it for conversion
                dataTypes = s.dataTypes.slice();

            // Create converters map with lowercased keys
            if (dataTypes[1]) {
                for (conv in s.converters) {
                    converters[conv.toLowerCase()] = s.converters[conv];
                }
            }

            current = dataTypes.shift();

            // Convert to each sequential dataType
            while (current) {

                if (s.responseFields[current]) {
                    jqXHR[s.responseFields[current]] = response;
                }

                // Apply the dataFilter if provided
                if (!prev && isSuccess && s.dataFilter) {
                    response = s.dataFilter(response, s.dataType);
                }

                prev = current;
                current = dataTypes.shift();

                if (current) {

                    // There's only work to do if current dataType is non-auto
                    if (current === "*") {

                        current = prev;

                        // Convert response if prev dataType is non-auto and differs from current
                    } else if (prev !== "*" && prev !== current) {

                        // Seek a direct converter
                        conv = converters[prev + " " + current] || converters["* " + current];

                        // If none found, seek a pair
                        if (!conv) {
                            for (conv2 in converters) {

                                // If conv2 outputs current
                                tmp = conv2.split(" ");
                                if (tmp[1] === current) {

                                    // If prev can be converted to accepted input
                                    conv = converters[prev + " " + tmp[0]] ||
                                    converters["* " + tmp[0]];
                                    if (conv) {
                                        // Condense equivalence converters
                                        if (conv === true) {
                                            conv = converters[conv2];

                                            // Otherwise, insert the intermediate dataType
                                        } else if (converters[conv2] !== true) {
                                            current = tmp[0];
                                            dataTypes.unshift(tmp[1]);
                                        }
                                        break;
                                    }
                                }
                            }
                        }

                        // Apply converter (if not an equivalence)
                        if (conv !== true) {

                            // Unless errors are allowed to bubble, catch and return them
                            if (conv && s["throws"]) {
                                response = conv(response);
                            } else {
                                try {
                                    response = conv(response);
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: conv ? e : "No conversion from " + prev + " to " + current
                                    };
                                }
                            }
                        }
                    }
                }
            }

            return {state: "success", data: response};
        }

// Install script dataType
        jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function (text) {
                    jQuery.globalEval(text);
                    return text;
                }
            }
        });

// Handle cache's special case and global
        jQuery.ajaxPrefilter("script", function (s) {
            if (s.cache === undefined) {
                s.cache = false;
            }
            if (s.crossDomain) {
                s.type = "GET";
                s.global = false;
            }
        });

// Bind script tag hack transport
        jQuery.ajaxTransport("script", function (s) {

            // This transport only deals with cross domain requests
            if (s.crossDomain) {

                var script,
                    head = document.head || jQuery("head")[0] || document.documentElement;

                return {

                    send: function (_, callback) {

                        script = document.createElement("script");

                        script.async = true;

                        if (s.scriptCharset) {
                            script.charset = s.scriptCharset;
                        }

                        script.src = s.url;

                        // Attach handlers for all browsers
                        script.onload = script.onreadystatechange = function (_, isAbort) {

                            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

                                // Handle memory leak in IE
                                script.onload = script.onreadystatechange = null;

                                // Remove the script
                                if (script.parentNode) {
                                    script.parentNode.removeChild(script);
                                }

                                // Dereference the script
                                script = null;

                                // Callback if not abort
                                if (!isAbort) {
                                    callback(200, "success");
                                }
                            }
                        };

                        // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
                        // Use native DOM manipulation to avoid our domManip AJAX trickery
                        head.insertBefore(script, head.firstChild);
                    },

                    abort: function () {
                        if (script) {
                            script.onload(undefined, true);
                        }
                    }
                };
            }
        });
        var oldCallbacks = [],
            rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
                this[callback] = true;
                return callback;
            }
        });

// Detect, normalize options and install callbacks for jsonp requests
        jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

            var callbackName, overwritten, responseContainer,
                jsonProp = s.jsonp !== false && ( rjsonp.test(s.url) ?
                        "url" :
                    typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data"
                    );

            // Handle iff the expected data type is "jsonp" or we have a parameter to set
            if (jsonProp || s.dataTypes[0] === "jsonp") {

                // Get callback name, remembering preexisting value associated with it
                callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
                    s.jsonpCallback() :
                    s.jsonpCallback;

                // Insert callback into url or form data
                if (jsonProp) {
                    s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
                } else if (s.jsonp !== false) {
                    s.url += ( ajax_rquery.test(s.url) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
                }

                // Use data converter to retrieve json after script execution
                s.converters["script json"] = function () {
                    if (!responseContainer) {
                        jQuery.error(callbackName + " was not called");
                    }
                    return responseContainer[0];
                };

                // force json dataType
                s.dataTypes[0] = "json";

                // Install callback
                overwritten = window[callbackName];
                window[callbackName] = function () {
                    responseContainer = arguments;
                };

                // Clean-up function (fires after converters)
                jqXHR.always(function () {
                    // Restore preexisting value
                    window[callbackName] = overwritten;

                    // Save back as free
                    if (s[callbackName]) {
                        // make sure that re-using the options doesn't screw things around
                        s.jsonpCallback = originalSettings.jsonpCallback;

                        // save the callback name for future use
                        oldCallbacks.push(callbackName);
                    }

                    // Call if it was a function and we have a response
                    if (responseContainer && jQuery.isFunction(overwritten)) {
                        overwritten(responseContainer[0]);
                    }

                    responseContainer = overwritten = undefined;
                });

                // Delegate to script
                return "script";
            }
        });
        var xhrCallbacks, xhrSupported,
            xhrId = 0,
        // #5280: Internet Explorer will keep connections alive if we don't abort on unload
            xhrOnUnloadAbort = window.ActiveXObject && function () {
                    // Abort all pending requests
                    var key;
                    for (key in xhrCallbacks) {
                        xhrCallbacks[key](undefined, true);
                    }
                };

// Functions to create xhrs
        function createStandardXHR() {
            try {
                return new window.XMLHttpRequest();
            } catch (e) {
            }
        }

        function createActiveXHR() {
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
            }
        }

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
        jQuery.ajaxSettings.xhr = window.ActiveXObject ?
            /* Microsoft failed to properly
             * implement the XMLHttpRequest in IE7 (can't request local files),
             * so we use the ActiveXObject when it is available
             * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
             * we need a fallback.
             */
            function () {
                return !this.isLocal && createStandardXHR() || createActiveXHR();
            } :
            // For all other browsers, use the standard XMLHttpRequest object
            createStandardXHR;

// Determine support properties
        xhrSupported = jQuery.ajaxSettings.xhr();
        jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
        xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
        if (xhrSupported) {

            jQuery.ajaxTransport(function (s) {
                // Cross domain only allowed if supported through XMLHttpRequest
                if (!s.crossDomain || jQuery.support.cors) {

                    var callback;

                    return {
                        send: function (headers, complete) {

                            // Get a new xhr
                            var handle, i,
                                xhr = s.xhr();

                            // Open the socket
                            // Passing null username, generates a login popup on Opera (#2865)
                            if (s.username) {
                                xhr.open(s.type, s.url, s.async, s.username, s.password);
                            } else {
                                xhr.open(s.type, s.url, s.async);
                            }

                            // Apply custom fields if provided
                            if (s.xhrFields) {
                                for (i in s.xhrFields) {
                                    xhr[i] = s.xhrFields[i];
                                }
                            }

                            // Override mime type if needed
                            if (s.mimeType && xhr.overrideMimeType) {
                                xhr.overrideMimeType(s.mimeType);
                            }

                            // X-Requested-With header
                            // For cross-domain requests, seeing as conditions for a preflight are
                            // akin to a jigsaw puzzle, we simply never set it to be sure.
                            // (it can always be set on a per-request basis or even using ajaxSetup)
                            // For same-domain requests, won't change header if already provided.
                            if (!s.crossDomain && !headers["X-Requested-With"]) {
                                headers["X-Requested-With"] = "XMLHttpRequest";
                            }

                            // Need an extra try/catch for cross domain requests in Firefox 3
                            try {
                                for (i in headers) {
                                    xhr.setRequestHeader(i, headers[i]);
                                }
                            } catch (err) {
                            }

                            // Do send the request
                            // This may raise an exception which is actually
                            // handled in jQuery.ajax (so no try/catch here)
                            xhr.send(( s.hasContent && s.data ) || null);

                            // Listener
                            callback = function (_, isAbort) {
                                var status, responseHeaders, statusText, responses;

                                // Firefox throws exceptions when accessing properties
                                // of an xhr when a network error occurred
                                // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
                                try {

                                    // Was never called and is aborted or complete
                                    if (callback && ( isAbort || xhr.readyState === 4 )) {

                                        // Only called once
                                        callback = undefined;

                                        // Do not keep as active anymore
                                        if (handle) {
                                            xhr.onreadystatechange = jQuery.noop;
                                            if (xhrOnUnloadAbort) {
                                                delete xhrCallbacks[handle];
                                            }
                                        }

                                        // If it's an abort
                                        if (isAbort) {
                                            // Abort it manually if needed
                                            if (xhr.readyState !== 4) {
                                                xhr.abort();
                                            }
                                        } else {
                                            responses = {};
                                            status = xhr.status;
                                            responseHeaders = xhr.getAllResponseHeaders();

                                            // When requesting binary data, IE6-9 will throw an exception
                                            // on any attempt to access responseText (#11426)
                                            if (typeof xhr.responseText === "string") {
                                                responses.text = xhr.responseText;
                                            }

                                            // Firefox throws an exception when accessing
                                            // statusText for faulty cross-domain requests
                                            try {
                                                statusText = xhr.statusText;
                                            } catch (e) {
                                                // We normalize with Webkit giving an empty statusText
                                                statusText = "";
                                            }

                                            // Filter status for non standard behaviors

                                            // If the request is local and we have data: assume a success
                                            // (success with no data won't get notified, that's the best we
                                            // can do given current implementations)
                                            if (!status && s.isLocal && !s.crossDomain) {
                                                status = responses.text ? 200 : 404;
                                                // IE - #1450: sometimes returns 1223 when it should be 204
                                            } else if (status === 1223) {
                                                status = 204;
                                            }
                                        }
                                    }
                                } catch (firefoxAccessException) {
                                    if (!isAbort) {
                                        complete(-1, firefoxAccessException);
                                    }
                                }

                                // Call complete if needed
                                if (responses) {
                                    complete(status, statusText, responses, responseHeaders);
                                }
                            };

                            if (!s.async) {
                                // if we're in sync mode we fire the callback
                                callback();
                            } else if (xhr.readyState === 4) {
                                // (IE6 & IE7) if it's in cache and has been
                                // retrieved directly we need to fire the callback
                                setTimeout(callback);
                            } else {
                                handle = ++xhrId;
                                if (xhrOnUnloadAbort) {
                                    // Create the active xhrs callbacks list if needed
                                    // and attach the unload handler
                                    if (!xhrCallbacks) {
                                        xhrCallbacks = {};
                                        jQuery(window).unload(xhrOnUnloadAbort);
                                    }
                                    // Add to list of active xhrs callbacks
                                    xhrCallbacks[handle] = callback;
                                }
                                xhr.onreadystatechange = callback;
                            }
                        },

                        abort: function () {
                            if (callback) {
                                callback(undefined, true);
                            }
                        }
                    };
                }
            });
        }
        var fxNow, timerId,
            rfxtypes = /^(?:toggle|show|hide)$/,
            rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
            rrun = /queueHooks$/,
            animationPrefilters = [defaultPrefilter],
            tweeners = {
                "*": [function (prop, value) {
                    var tween = this.createTween(prop, value),
                        target = tween.cur(),
                        parts = rfxnum.exec(value),
                        unit = parts && parts[3] || ( jQuery.cssNumber[prop] ? "" : "px" ),

                    // Starting value computation is required for potential unit mismatches
                        start = ( jQuery.cssNumber[prop] || unit !== "px" && +target ) &&
                            rfxnum.exec(jQuery.css(tween.elem, prop)),
                        scale = 1,
                        maxIterations = 20;

                    if (start && start[3] !== unit) {
                        // Trust units reported by jQuery.css
                        unit = unit || start[3];

                        // Make sure we update the tween properties later on
                        parts = parts || [];

                        // Iteratively approximate from a nonzero starting point
                        start = +target || 1;

                        do {
                            // If previous iteration zeroed out, double until we get *something*
                            // Use a string for doubling factor so we don't accidentally see scale as unchanged below
                            scale = scale || ".5";

                            // Adjust and apply
                            start = start / scale;
                            jQuery.style(tween.elem, prop, start + unit);

                            // Update scale, tolerating zero or NaN from tween.cur()
                            // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
                        } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
                    }

                    // Update tween properties
                    if (parts) {
                        start = tween.start = +start || +target || 0;
                        tween.unit = unit;
                        // If a +=/-= token was provided, we're doing a relative animation
                        tween.end = parts[1] ?
                        start + ( parts[1] + 1 ) * parts[2] :
                            +parts[2];
                    }

                    return tween;
                }]
            };

// Animations created synchronously will run synchronously
        function createFxNow() {
            setTimeout(function () {
                fxNow = undefined;
            });
            return ( fxNow = jQuery.now() );
        }

        function createTween(value, prop, animation) {
            var tween,
                collection = ( tweeners[prop] || [] ).concat(tweeners["*"]),
                index = 0,
                length = collection.length;
            for (; index < length; index++) {
                if ((tween = collection[index].call(animation, prop, value))) {

                    // we're done with this property
                    return tween;
                }
            }
        }

        function Animation(elem, properties, options) {
            var result,
                stopped,
                index = 0,
                length = animationPrefilters.length,
                deferred = jQuery.Deferred().always(function () {
                    // don't match elem in the :animated selector
                    delete tick.elem;
                }),
                tick = function () {
                    if (stopped) {
                        return false;
                    }
                    var currentTime = fxNow || createFxNow(),
                        remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
                        temp = remaining / animation.duration || 0,
                        percent = 1 - temp,
                        index = 0,
                        length = animation.tweens.length;

                    for (; index < length; index++) {
                        animation.tweens[index].run(percent);
                    }

                    deferred.notifyWith(elem, [animation, percent, remaining]);

                    if (percent < 1 && length) {
                        return remaining;
                    } else {
                        deferred.resolveWith(elem, [animation]);
                        return false;
                    }
                },
                animation = deferred.promise({
                    elem: elem,
                    props: jQuery.extend({}, properties),
                    opts: jQuery.extend(true, {specialEasing: {}}, options),
                    originalProperties: properties,
                    originalOptions: options,
                    startTime: fxNow || createFxNow(),
                    duration: options.duration,
                    tweens: [],
                    createTween: function (prop, end) {
                        var tween = jQuery.Tween(elem, animation.opts, prop, end,
                            animation.opts.specialEasing[prop] || animation.opts.easing);
                        animation.tweens.push(tween);
                        return tween;
                    },
                    stop: function (gotoEnd) {
                        var index = 0,
                        // if we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                            length = gotoEnd ? animation.tweens.length : 0;
                        if (stopped) {
                            return this;
                        }
                        stopped = true;
                        for (; index < length; index++) {
                            animation.tweens[index].run(1);
                        }

                        // resolve when we played the last frame
                        // otherwise, reject
                        if (gotoEnd) {
                            deferred.resolveWith(elem, [animation, gotoEnd]);
                        } else {
                            deferred.rejectWith(elem, [animation, gotoEnd]);
                        }
                        return this;
                    }
                }),
                props = animation.props;

            propFilter(props, animation.opts.specialEasing);

            for (; index < length; index++) {
                result = animationPrefilters[index].call(animation, elem, props, animation.opts);
                if (result) {
                    return result;
                }
            }

            jQuery.map(props, createTween, animation);

            if (jQuery.isFunction(animation.opts.start)) {
                animation.opts.start.call(elem, animation);
            }

            jQuery.fx.timer(
                jQuery.extend(tick, {
                    elem: elem,
                    anim: animation,
                    queue: animation.opts.queue
                })
            );

            // attach callbacks from options
            return animation.progress(animation.opts.progress)
                .done(animation.opts.done, animation.opts.complete)
                .fail(animation.opts.fail)
                .always(animation.opts.always);
        }

        function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;

            // camelCase, specialEasing and expand cssHook pass
            for (index in props) {
                name = jQuery.camelCase(index);
                easing = specialEasing[name];
                value = props[index];
                if (jQuery.isArray(value)) {
                    easing = value[1];
                    value = props[index] = value[0];
                }

                if (index !== name) {
                    props[name] = value;
                    delete props[index];
                }

                hooks = jQuery.cssHooks[name];
                if (hooks && "expand" in hooks) {
                    value = hooks.expand(value);
                    delete props[name];

                    // not quite $.extend, this wont overwrite keys already present.
                    // also - reusing 'index' from above because we have the correct "name"
                    for (index in value) {
                        if (!( index in props )) {
                            props[index] = value[index];
                            specialEasing[index] = easing;
                        }
                    }
                } else {
                    specialEasing[name] = easing;
                }
            }
        }

        jQuery.Animation = jQuery.extend(Animation, {

            tweener: function (props, callback) {
                if (jQuery.isFunction(props)) {
                    callback = props;
                    props = ["*"];
                } else {
                    props = props.split(" ");
                }

                var prop,
                    index = 0,
                    length = props.length;

                for (; index < length; index++) {
                    prop = props[index];
                    tweeners[prop] = tweeners[prop] || [];
                    tweeners[prop].unshift(callback);
                }
            },

            prefilter: function (callback, prepend) {
                if (prepend) {
                    animationPrefilters.unshift(callback);
                } else {
                    animationPrefilters.push(callback);
                }
            }
        });

        function defaultPrefilter(elem, props, opts) {
            /* jshint validthis: true */
            var prop, value, toggle, tween, hooks, oldfire,
                anim = this,
                orig = {},
                style = elem.style,
                hidden = elem.nodeType && isHidden(elem),
                dataShow = jQuery._data(elem, "fxshow");

            // handle queue: false promises
            if (!opts.queue) {
                hooks = jQuery._queueHooks(elem, "fx");
                if (hooks.unqueued == null) {
                    hooks.unqueued = 0;
                    oldfire = hooks.empty.fire;
                    hooks.empty.fire = function () {
                        if (!hooks.unqueued) {
                            oldfire();
                        }
                    };
                }
                hooks.unqueued++;

                anim.always(function () {
                    // doing this makes sure that the complete handler will be called
                    // before this completes
                    anim.always(function () {
                        hooks.unqueued--;
                        if (!jQuery.queue(elem, "fx").length) {
                            hooks.empty.fire();
                        }
                    });
                });
            }

            // height/width overflow pass
            if (elem.nodeType === 1 && ( "height" in props || "width" in props )) {
                // Make sure that nothing sneaks out
                // Record all 3 overflow attributes because IE does not
                // change the overflow attribute when overflowX and
                // overflowY are set to the same value
                opts.overflow = [style.overflow, style.overflowX, style.overflowY];

                // Set display property to inline-block for height/width
                // animations on inline elements that are having width/height animated
                if (jQuery.css(elem, "display") === "inline" &&
                    jQuery.css(elem, "float") === "none") {

                    // inline-level elements accept inline-block;
                    // block-level elements need to be inline with layout
                    if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
                        style.display = "inline-block";

                    } else {
                        style.zoom = 1;
                    }
                }
            }

            if (opts.overflow) {
                style.overflow = "hidden";
                if (!jQuery.support.shrinkWrapBlocks) {
                    anim.always(function () {
                        style.overflow = opts.overflow[0];
                        style.overflowX = opts.overflow[1];
                        style.overflowY = opts.overflow[2];
                    });
                }
            }


            // show/hide pass
            for (prop in props) {
                value = props[prop];
                if (rfxtypes.exec(value)) {
                    delete props[prop];
                    toggle = toggle || value === "toggle";
                    if (value === ( hidden ? "hide" : "show" )) {
                        continue;
                    }
                    orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
                }
            }

            if (!jQuery.isEmptyObject(orig)) {
                if (dataShow) {
                    if ("hidden" in dataShow) {
                        hidden = dataShow.hidden;
                    }
                } else {
                    dataShow = jQuery._data(elem, "fxshow", {});
                }

                // store state if its toggle - enables .stop().toggle() to "reverse"
                if (toggle) {
                    dataShow.hidden = !hidden;
                }
                if (hidden) {
                    jQuery(elem).show();
                } else {
                    anim.done(function () {
                        jQuery(elem).hide();
                    });
                }
                anim.done(function () {
                    var prop;
                    jQuery._removeData(elem, "fxshow");
                    for (prop in orig) {
                        jQuery.style(elem, prop, orig[prop]);
                    }
                });
                for (prop in orig) {
                    tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

                    if (!( prop in dataShow )) {
                        dataShow[prop] = tween.start;
                        if (hidden) {
                            tween.end = tween.start;
                            tween.start = prop === "width" || prop === "height" ? 1 : 0;
                        }
                    }
                }
            }
        }

        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing);
        }

        jQuery.Tween = Tween;

        Tween.prototype = {
            constructor: Tween,
            init: function (elem, options, prop, end, easing, unit) {
                this.elem = elem;
                this.prop = prop;
                this.easing = easing || "swing";
                this.options = options;
                this.start = this.now = this.cur();
                this.end = end;
                this.unit = unit || ( jQuery.cssNumber[prop] ? "" : "px" );
            },
            cur: function () {
                var hooks = Tween.propHooks[this.prop];

                return hooks && hooks.get ?
                    hooks.get(this) :
                    Tween.propHooks._default.get(this);
            },
            run: function (percent) {
                var eased,
                    hooks = Tween.propHooks[this.prop];

                if (this.options.duration) {
                    this.pos = eased = jQuery.easing[this.easing](
                        percent, this.options.duration * percent, 0, 1, this.options.duration
                    );
                } else {
                    this.pos = eased = percent;
                }
                this.now = ( this.end - this.start ) * eased + this.start;

                if (this.options.step) {
                    this.options.step.call(this.elem, this.now, this);
                }

                if (hooks && hooks.set) {
                    hooks.set(this);
                } else {
                    Tween.propHooks._default.set(this);
                }
                return this;
            }
        };

        Tween.prototype.init.prototype = Tween.prototype;

        Tween.propHooks = {
            _default: {
                get: function (tween) {
                    var result;

                    if (tween.elem[tween.prop] != null &&
                        (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                        return tween.elem[tween.prop];
                    }

                    // passing an empty string as a 3rd parameter to .css will automatically
                    // attempt a parseFloat and fallback to a string if the parse fails
                    // so, simple values such as "10px" are parsed to Float.
                    // complex values such as "rotate(1rad)" are returned as is.
                    result = jQuery.css(tween.elem, tween.prop, "");
                    // Empty strings, null, undefined and "auto" are converted to 0.
                    return !result || result === "auto" ? 0 : result;
                },
                set: function (tween) {
                    // use step hook for back compat - use cssHook if its there - use .style if its
                    // available and use plain properties where available
                    if (jQuery.fx.step[tween.prop]) {
                        jQuery.fx.step[tween.prop](tween);
                    } else if (tween.elem.style && ( tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop] )) {
                        jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                    } else {
                        tween.elem[tween.prop] = tween.now;
                    }
                }
            }
        };

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function (tween) {
                if (tween.elem.nodeType && tween.elem.parentNode) {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        };

        jQuery.each(["toggle", "show", "hide"], function (i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function (speed, easing, callback) {
                return speed == null || typeof speed === "boolean" ?
                    cssFn.apply(this, arguments) :
                    this.animate(genFx(name, true), speed, easing, callback);
            };
        });

        jQuery.fn.extend({
            fadeTo: function (speed, to, easing, callback) {

                // show any hidden elements after setting opacity to 0
                return this.filter(isHidden).css("opacity", 0).show()

                    // animate to the value specified
                    .end().animate({opacity: to}, speed, easing, callback);
            },
            animate: function (prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop),
                    optall = jQuery.speed(speed, easing, callback),
                    doAnimation = function () {
                        // Operate on a copy of prop so per-property easing won't be lost
                        var anim = Animation(this, jQuery.extend({}, prop), optall);

                        // Empty animations, or finishing resolves immediately
                        if (empty || jQuery._data(this, "finish")) {
                            anim.stop(true);
                        }
                    };
                doAnimation.finish = doAnimation;

                return empty || optall.queue === false ?
                    this.each(doAnimation) :
                    this.queue(optall.queue, doAnimation);
            },
            stop: function (type, clearQueue, gotoEnd) {
                var stopQueue = function (hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop;
                    stop(gotoEnd);
                };

                if (typeof type !== "string") {
                    gotoEnd = clearQueue;
                    clearQueue = type;
                    type = undefined;
                }
                if (clearQueue && type !== false) {
                    this.queue(type || "fx", []);
                }

                return this.each(function () {
                    var dequeue = true,
                        index = type != null && type + "queueHooks",
                        timers = jQuery.timers,
                        data = jQuery._data(this);

                    if (index) {
                        if (data[index] && data[index].stop) {
                            stopQueue(data[index]);
                        }
                    } else {
                        for (index in data) {
                            if (data[index] && data[index].stop && rrun.test(index)) {
                                stopQueue(data[index]);
                            }
                        }
                    }

                    for (index = timers.length; index--;) {
                        if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                            timers[index].anim.stop(gotoEnd);
                            dequeue = false;
                            timers.splice(index, 1);
                        }
                    }

                    // start the next in the queue if the last step wasn't forced
                    // timers currently will call their complete callbacks, which will dequeue
                    // but only if they were gotoEnd
                    if (dequeue || !gotoEnd) {
                        jQuery.dequeue(this, type);
                    }
                });
            },
            finish: function (type) {
                if (type !== false) {
                    type = type || "fx";
                }
                return this.each(function () {
                    var index,
                        data = jQuery._data(this),
                        queue = data[type + "queue"],
                        hooks = data[type + "queueHooks"],
                        timers = jQuery.timers,
                        length = queue ? queue.length : 0;

                    // enable finishing flag on private data
                    data.finish = true;

                    // empty the queue first
                    jQuery.queue(this, type, []);

                    if (hooks && hooks.stop) {
                        hooks.stop.call(this, true);
                    }

                    // look for any active animations, and finish them
                    for (index = timers.length; index--;) {
                        if (timers[index].elem === this && timers[index].queue === type) {
                            timers[index].anim.stop(true);
                            timers.splice(index, 1);
                        }
                    }

                    // look for any animations in the old queue and finish them
                    for (index = 0; index < length; index++) {
                        if (queue[index] && queue[index].finish) {
                            queue[index].finish.call(this);
                        }
                    }

                    // turn off finishing flag
                    delete data.finish;
                });
            }
        });

// Generate parameters to create a standard animation
        function genFx(type, includeWidth) {
            var which,
                attrs = {height: type},
                i = 0;

            // if we include width, step value is 1 to do all cssExpand values,
            // if we don't include width, step value is 2 to skip over Left and Right
            includeWidth = includeWidth ? 1 : 0;
            for (; i < 4; i += 2 - includeWidth) {
                which = cssExpand[i];
                attrs["margin" + which] = attrs["padding" + which] = type;
            }

            if (includeWidth) {
                attrs.opacity = attrs.width = type;
            }

            return attrs;
        }

// Generate shortcuts for custom animations
        jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {opacity: "show"},
            fadeOut: {opacity: "hide"},
            fadeToggle: {opacity: "toggle"}
        }, function (name, props) {
            jQuery.fn[name] = function (speed, easing, callback) {
                return this.animate(props, speed, easing, callback);
            };
        });

        jQuery.speed = function (speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing ||
                jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };

            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
                opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

            // normalize opt.queue - true/undefined/null -> "fx"
            if (opt.queue == null || opt.queue === true) {
                opt.queue = "fx";
            }

            // Queueing
            opt.old = opt.complete;

            opt.complete = function () {
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this);
                }

                if (opt.queue) {
                    jQuery.dequeue(this, opt.queue);
                }
            };

            return opt;
        };

        jQuery.easing = {
            linear: function (p) {
                return p;
            },
            swing: function (p) {
                return 0.5 - Math.cos(p * Math.PI) / 2;
            }
        };

        jQuery.timers = [];
        jQuery.fx = Tween.prototype.init;
        jQuery.fx.tick = function () {
            var timer,
                timers = jQuery.timers,
                i = 0;

            fxNow = jQuery.now();

            for (; i < timers.length; i++) {
                timer = timers[i];
                // Checks the timer has not already been removed
                if (!timer() && timers[i] === timer) {
                    timers.splice(i--, 1);
                }
            }

            if (!timers.length) {
                jQuery.fx.stop();
            }
            fxNow = undefined;
        };

        jQuery.fx.timer = function (timer) {
            if (timer() && jQuery.timers.push(timer)) {
                jQuery.fx.start();
            }
        };

        jQuery.fx.interval = 13;

        jQuery.fx.start = function () {
            if (!timerId) {
                timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
            }
        };

        jQuery.fx.stop = function () {
            clearInterval(timerId);
            timerId = null;
        };

        jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            // Default speed
            _default: 400
        };

// Back Compat <1.8 extension point
        jQuery.fx.step = {};

        if (jQuery.expr && jQuery.expr.filters) {
            jQuery.expr.filters.animated = function (elem) {
                return jQuery.grep(jQuery.timers, function (fn) {
                    return elem === fn.elem;
                }).length;
            };
        }
        jQuery.fn.offset = function (options) {
            if (arguments.length) {
                return options === undefined ?
                    this :
                    this.each(function (i) {
                        jQuery.offset.setOffset(this, options, i);
                    });
            }

            var docElem, win,
                box = {top: 0, left: 0},
                elem = this[0],
                doc = elem && elem.ownerDocument;

            if (!doc) {
                return;
            }

            docElem = doc.documentElement;

            // Make sure it's not a disconnected DOM node
            if (!jQuery.contains(docElem, elem)) {
                return box;
            }

            // If we don't have gBCR, just use 0,0 rather than error
            // BlackBerry 5, iOS 3 (original iPhone)
            if (typeof elem.getBoundingClientRect !== core_strundefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + ( win.pageYOffset || docElem.scrollTop ) - ( docElem.clientTop || 0 ),
                left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
            };
        };

        jQuery.offset = {

            setOffset: function (elem, options, i) {
                var position = jQuery.css(elem, "position");

                // set position first, in-case top/left are set even on static elem
                if (position === "static") {
                    elem.style.position = "relative";
                }

                var curElem = jQuery(elem),
                    curOffset = curElem.offset(),
                    curCSSTop = jQuery.css(elem, "top"),
                    curCSSLeft = jQuery.css(elem, "left"),
                    calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                    props = {}, curPosition = {}, curTop, curLeft;

                // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
                if (calculatePosition) {
                    curPosition = curElem.position();
                    curTop = curPosition.top;
                    curLeft = curPosition.left;
                } else {
                    curTop = parseFloat(curCSSTop) || 0;
                    curLeft = parseFloat(curCSSLeft) || 0;
                }

                if (jQuery.isFunction(options)) {
                    options = options.call(elem, i, curOffset);
                }

                if (options.top != null) {
                    props.top = ( options.top - curOffset.top ) + curTop;
                }
                if (options.left != null) {
                    props.left = ( options.left - curOffset.left ) + curLeft;
                }

                if ("using" in options) {
                    options.using.call(elem, props);
                } else {
                    curElem.css(props);
                }
            }
        };


        jQuery.fn.extend({

            position: function () {
                if (!this[0]) {
                    return;
                }

                var offsetParent, offset,
                    parentOffset = {top: 0, left: 0},
                    elem = this[0];

                // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
                if (jQuery.css(elem, "position") === "fixed") {
                    // we assume that getBoundingClientRect is available when computed position is fixed
                    offset = elem.getBoundingClientRect();
                } else {
                    // Get *real* offsetParent
                    offsetParent = this.offsetParent();

                    // Get correct offsets
                    offset = this.offset();
                    if (!jQuery.nodeName(offsetParent[0], "html")) {
                        parentOffset = offsetParent.offset();
                    }

                    // Add offsetParent borders
                    parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                    parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
                }

                // Subtract parent offsets and element margins
                // note: when an element has margin: auto the offsetLeft and marginLeft
                // are the same in Safari causing offset.left to incorrectly be 0
                return {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
                };
            },

            offsetParent: function () {
                return this.map(function () {
                    var offsetParent = this.offsetParent || docElem;
                    while (offsetParent && ( !jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static" )) {
                        offsetParent = offsetParent.offsetParent;
                    }
                    return offsetParent || docElem;
                });
            }
        });


// Create scrollLeft and scrollTop methods
        jQuery.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (method, prop) {
            var top = /Y/.test(prop);

            jQuery.fn[method] = function (val) {
                return jQuery.access(this, function (elem, method, val) {
                    var win = getWindow(elem);

                    if (val === undefined) {
                        return win ? (prop in win) ? win[prop] :
                            win.document.documentElement[method] :
                            elem[method];
                    }

                    if (win) {
                        win.scrollTo(
                            !top ? val : jQuery(win).scrollLeft(),
                            top ? val : jQuery(win).scrollTop()
                        );

                    } else {
                        elem[method] = val;
                    }
                }, method, val, arguments.length, null);
            };
        });

        function getWindow(elem) {
            return jQuery.isWindow(elem) ?
                elem :
                elem.nodeType === 9 ?
                elem.defaultView || elem.parentWindow :
                    false;
        }

// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
        jQuery.each({Height: "height", Width: "width"}, function (name, type) {
            jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            }, function (defaultExtra, funcName) {
                // margin is only for outerHeight, outerWidth
                jQuery.fn[funcName] = function (margin, value) {
                    var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                        extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

                    return jQuery.access(this, function (elem, type, value) {
                        var doc;

                        if (jQuery.isWindow(elem)) {
                            // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                            // isn't a whole lot we can do. See pull request at this URL for discussion:
                            // https://github.com/jquery/jquery/pull/764
                            return elem.document.documentElement["client" + name];
                        }

                        // Get document width or height
                        if (elem.nodeType === 9) {
                            doc = elem.documentElement;

                            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
                            // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
                            return Math.max(
                                elem.body["scroll" + name], doc["scroll" + name],
                                elem.body["offset" + name], doc["offset" + name],
                                doc["client" + name]
                            );
                        }

                        return value === undefined ?
                            // Get width or height on the element, requesting but not forcing parseFloat
                            jQuery.css(elem, type, extra) :

                            // Set width or height on the element
                            jQuery.style(elem, type, value, extra);
                    }, type, chainable ? margin : undefined, chainable, null);
                };
            });
        });
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
        jQuery.fn.size = function () {
            return this.length;
        };

        jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
        if (typeof module === "object" && module && typeof module.exports === "object") {
            // Expose jQuery as module.exports in loaders that implement the Node
            // module pattern (including browserify). Do not create the global, since
            // the user will be storing it themselves locally, and globals are frowned
            // upon in the Node module world.
            module.exports = jQuery;
        } else {
            // Otherwise expose jQuery to the global object as usual

        /*==================================================
	WARNING: CHOKING HAZARD: SMALL PARTS.
	Not for children under 21 years.

	Highly volatile patch detected. Stay away!!
	In case of confrontation, inform the authorities.
	===================================================*/
            _module.$ = jQuery;
            _module.$.noConflict();

            // Register as a named AMD module, since jQuery can be concatenated with other
            // files that may use define, but not via a proper concatenation script that
            // understands anonymous AMD modules. A named AMD is safest and most robust
            // way to register. Lowercase jquery is used because AMD module names are
            // derived from file names, and jQuery is normally delivered in a lowercase
            // file name. Do this after creating the global so that if an AMD module wants
            // to call noConflict to hide this version of jQuery, it will work.
            /*if (typeof define === "function" && define.amd) {
                define("jquery", [], function () {
                    return jQuery
                });
            }*/

        }

    })(window);

    return _module;

}(window.wigzo || {}));


window.wigzo = (function(_module) {
    /*!
     * jQuery Cookie Plugin v1.4.1
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2013 Klaus Hartl
     * Released under the MIT license
     */
    (function (factory) {
	factory(wigzo.$);
    }(function ($) {

        var pluses = /\+/g;

        function encode(s) {
            return config.raw ? s : encodeURIComponent(s);
        }

        function decode(s) {
            return config.raw ? s : decodeURIComponent(s);
        }

        function stringifyCookieValue(value) {
            return encode(config.json ? JSON.stringify(value) : String(value));
        }

        function parseCookieValue(s) {
            if (s.indexOf('"') === 0) {
                // This is a quoted cookie as according to RFC2068, unescape...
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }

            try {
                // Replace server-side written pluses with spaces.
                // If we can't decode the cookie, ignore it, it's unusable.
                // If we can't parse the cookie, ignore it, it's unusable.
                s = decodeURIComponent(s.replace(pluses, ' '));
                return config.json ? JSON.parse(s) : s;
            } catch (e) {
            }
        }

        function read(s, converter) {
            var value = config.raw ? s : parseCookieValue(s);
            return $.isFunction(converter) ? converter(value) : value;
        }

        var config = $.cookie = function (key, value, options) {

            // Write

            if (value !== undefined && !$.isFunction(value)) {
                options = $.extend({}, config.defaults, options);

                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setTime(+t + days * 864e+5);
                }

                return (document.cookie = [
                    encode(key), '=', stringifyCookieValue(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            }

            // Read

            var result = key ? undefined : {};

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling $.cookie().
            var cookies = document.cookie ? document.cookie.split('; ') : [];

            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var name = decode(parts.shift());
                var cookie = parts.join('=');

                if (key && key === name) {
                    // If second argument (value) is a function it's a converter...
                    result = read(cookie, value);
                    break;
                }

                // Prevent storing a cookie that we couldn't decode.
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }

            return result;
        };

        config.defaults = {};

        $.removeCookie = function (key, options) {
            if ($.cookie(key) === undefined) {
                return false;
            }

            // Must not alter options, thus extending a fresh object...
            $.cookie(key, '', $.extend({}, options, {expires: -1}));
            return !$.cookie(key);
        };

    }));

    return _module;

}(window.wigzo || {}));


window.wigzo = (function(_module) {

    _module.onsitePush = (function(api) {
        api.init = function (WIGZO_NOTIFICATION_CENTER_ENDPOINT, ORG_TOKEN, COOKIE_ID, onNotifyCallback, onConnectCallback, onDisconnectCallback) {
            if('WebSocket' in window || 'MozWebSocket' in window) {
                if (typeof (_module.io) === "undefined") {
                    console.log("Node is down... Please check!!");
                    return;
                }

                var socket = _module.io(WIGZO_NOTIFICATION_CENTER_ENDPOINT, {transports: ['websocket'], upgrade: false});
                var retryInterval;

                socket.on("notify", function (data) {
                    if(!data) {
                        console.log('No pending message found!');
                        return;
                    }
                    data.cookie_id = COOKIE_ID;
                    //console.log(data);
                    if (onNotifyCallback) {
                        onNotifyCallback(data);
                    }
                    //var messageArea = document.getElementById('message');
                    //messageArea.insertAdjacentHTML('beforeend', '<p>' + JSON.stringify(data) + '</p><br/>');
                    socket.emit('acknowledge', data);
                });

                socket.on('connect', function (sc) {
                    socket.emit('join', {cookie_id: COOKIE_ID, org_token: ORG_TOKEN});
                    if (onConnectCallback) {
                        onConnectCallback(socket);
                    }
                });

                /*socket.io.engine.on('heartbeat', function() {
                 console.log('Getting heartbeat');
                 socket.emit('heartbeat', {'notificationCenter': WIGZO_NOTIFICATION_CENTER_ENDPOINT, 'orgToken': ORG_TOKEN, 'username': username});
                 });

                 /*socket.on ('heartbeat', function(obj) {
                 console.log(obj);
                 });*/

                /*var reconnectSocketIO = function () {
                 console.log ("Trying to reconnect socket.io..", socketConnected);
                 if (socketConnected) {
                 clearInterval (retryInterval);
                 }
                 }*/

                socket.on('disconnect', function () {
                    console.log("Disconnedted from: " + WIGZO_NOTIFICATION_CENTER_ENDPOINT);
                    if (onDisconnectCallback) {
                        onDisconnectCallback(socket);
                    }
                });
            } else {
                console.info("This library requires WebSocket support.");
            }
        }


        api.getProfileBlocking = function getProfileBlocking(data,iframeSrc,deviceType,ucSessionData) {
            var result = null;
            var error = null;
            var mid = JSON.parse(ucSessionData).u_mid;
            // Simulate an asynchronous profile retrieval
            ua.profileCallback(mid, function(res) {
                result = res;
                var encodedPrefilledData = encodeURIComponent(JSON.stringify(res.data));
                iframeSrc += "&ucSessionData=" + encodedPrefilledData;
                generateIframe(data,iframeSrc,deviceType);
            }, function(err) {
                generateIframe(data,iframeSrc,deviceType);
            });
        }

        function generateIframe(data,iframeSrc,deviceType){
            if(wigzo.$('#wigzo-onsite-notif-iframe-div').length>0) {
                wigzo.$('#wigzo-onsite-notif-iframe-div').remove();
            }
            var wigzoOnsiteNotifIframeDiv = document.createElement('div');
            wigzoOnsiteNotifIframeDiv.setAttribute('id', "wigzo-onsite-notif-iframe-div");
            wigzoOnsiteNotifIframeDiv.setAttribute("style", "opacity: 0; position: fixed; outline: 0 !important; border: 0 !important; z-index: 2147483000!important; margin: 0 !important; padding: 0 !important; width: 100%; height: 100%; max-width: 0px; max-height: 0px");
            document.body.appendChild(wigzoOnsiteNotifIframeDiv);

            var notificationIframe = document.createElement('iframe');
            notificationIframe.setAttribute('src', iframeSrc);
            notificationIframe.setAttribute('id', data.layoutId);
            notificationIframe.setAttribute('class', 'WigzoOnsiteNotificationIframe');
            notificationIframe.setAttribute('style', "position: absolute; top:0; left:0; right:0; bottom:0; width: 100% !important; height: 100% !important; outline: 0 !important; border: 0 !important; z-index: 2147483000!important; margin: 0 !important; padding: 0 !important;");
            notificationIframe.setAttribute('scrolling', "no");
            wigzoOnsiteNotifIframeDiv.appendChild(notificationIframe);

            api.globalData = data;
            api.globalDeviceType = deviceType;
            api.initialiseListener(data, deviceType);
        }

        api.showNotification = function (data) {
        if(data.hasOwnProperty("org_token") && data.org_token === wigzo.ORGANIZATIONID) {
            if (data.hasOwnProperty('message') && data.message.type === 'InAppNotification') {
              if(!data.settings) return;
              //data.settings = JSON.parse(data.settings);
              if (!(typeof (data.settings.showToMappedUsers) === "undefined")) {
                  if (!data.settings.showToMappedUsers && (_module.isMapped('USER') || _module.isMapped('PHONE'))) {
                      _module.consoleDebug("User is mapped.");
                      return;
                  }
              }
                var locationAndSytemTargeting = true;
                if (data.settings.hasOwnProperty("locationAndDeviceTargeting") && !!data.settings.locationAndDeviceTargeting && data.settings.locationAndDeviceTargeting.status) {
                    locationAndSytemTargeting = _module.exitIntent.evaluateAgainstCriteria(data.settings.locationAndDeviceTargeting.criteria, data.settings.locationAndDeviceTargeting.globalOperator);
                }
                var urlTargetingResult = _module.helpers.checkAgainstUrlCriteria(data.settings.urlSettings.urlTargeting);
                var deviceType = _module.helpers.getDeviceType();
                var deviceTargetingResult = (deviceType=='desktop' && data.settings.device.screen.desktop.show) ||
                    (deviceType=='mobile' && data.settings.device.screen.mobile.show) ||
                    (deviceType=='tablet' && data.settings.device.screen.tablet.show);

                if(urlTargetingResult && deviceTargetingResult && locationAndSytemTargeting) {
                    data.langAlign = wigzo.getAlignmentByLang();
                    var iframeSrc = '';
                    var ucSessionData = localStorage.getItem('_uc_session_v1');

                    wigzo.getOrCreateCookie(function(cookieId) {
                        var bm = wigzo.isMapped('BROWSER');
                        var um = wigzo.isMapped('USER');
                        var pm = wigzo.isMapped('PHONE');

                        iframeSrc = wigzo.APP + '/onsitepush/campaign/render/' + data.message.category + '/' + data.campaign_id
                            + '/' + cookieId + '?_=' + new Date().getTime() + '&_siteid=' + wigzo.ORGANIZATIONID +
                            '&bm=' + bm + '&um=' + um + '&pm=' + pm + '&cu=' + data.canonicalUrl + '&cookieid=' + cookieId +
                            "&t=" + data.uuid + "&r" + Math.floor(Math.random() * 1000);

                        if (ucSessionData && typeof ua !== 'undefined') {
                            try {
                                wigzo.onsitePush.getProfileBlocking(data,iframeSrc,deviceType,ucSessionData);
                            } catch (e) {
                                console.error(e);
                                generateIframe(data,iframeSrc,deviceType);
                            }
                        }else{
                            generateIframe(data,iframeSrc,deviceType);
                        }
                    });
                } else {
                    _module.consoleDebug("Invalid campaign - " + data);
                }
            } else {
                _module.consoleDebug("Not a InAppNotification notification.");
            }
            }
        };

        api.initialiseListener = function (data, deviceType) {

            if (api.hasGlobalMessageListener) {
                if (window.removeEventListener) {
                    /*window.removeEventListener('message', api.initialiseListener);*/
                    window.removeEventListener('message', api.listenerReference);
                } else if (window.detachEvent) {
                    /*window.detachEvent('message', api.initialiseListener);*/
                    window.detachEvent('message', api.listenerReference);
                }
            }

            window.addEventListener('message', api.listenerReference, false);
        }

        api.listenerReference = function(event) {
             var ucSessionData1 = localStorage.getItem('_uc_session_v1');
             var ucProfile;

//            if (ucSessionData) {
//                  ua.profile(JSON.parse(ucSessionData).u_mid).then((res)=>{
//                       ucProfile = JSON.stringify(res.data);
//                  }).catch(error => console.log('uc session not found'))
//            }

            if ("wigzo-onsite-notif-close-popup" == event.data.type) {
                wigzo.$('#wigzo-onsite-notif-iframe-div').fadeOut(500, function () {
                    wigzo.$(this).remove();
                });
            } else if("wigzo-onsite-notif-track-open" === event.data.type) {

                if(api.globalData.settings.urlSettings.redirect.enabled && !! api.globalData.message.track_open_url
                    && api.globalData.message.track_open_url!='') {
                    wigzo.getOrCreateCookie(function(cookieId) {
                        var trackOpenUrl = '';
                        var targetWindowUrl = '';
                        if (typeof api.globalData.settings.urlSettings.redirect.target == undefined || api.globalData.settings.urlSettings.redirect.target == '') {
                            targetWindowUrl = '_blank';
                        } else {
                            targetWindowUrl = api.globalData.settings.urlSettings.redirect.target;
                        }
                        if (api.globalData.message.track_open_url.indexOf('?') < 0) {
                            trackOpenUrl = api.globalData.message.track_open_url + '?deviceType=' + api.globalDeviceType + '&u=' + cookieId + '&uuid=' + api.globalData.uuid;
                        } else {
                            trackOpenUrl = api.globalData.message.track_open_url + '&deviceType=' + api.globalDeviceType + '&u=' + cookieId + '&uuid=' + api.globalData.uuid;
                        }
                        wigzo('track', 'onsitenotificationclicked', api.globalData.uuid);
                        _module.get(trackOpenUrl, function(response) {
                            if(response.hasOwnProperty('redirectEnabled') && response.redirectEnabled == 'true' && response.hasOwnProperty('redirectUrl') && response.redirectUrl) {
                                try{
                                    var win = window.open(response.redirectUrl, targetWindowUrl);
                                    win.focus();
                                } catch (e) {
                                    _module.$("<a href='" + response.redirectUrl + "' target=" + targetWindowUrl + "></a>")[0].click();
                                }
                            }

                        })

                    });
                }
                if (api.globalData.message.track_open_url =='' || typeof (api.globalData.message.track_open_url) === 'undefined') {
                    wigzo.getOrCreateCookie(function(cookieId) {
                        var campaignId = api.globalData.campaign_id;
                        var trackOpenUrl = wigzo.APP + '/onsitepush/track/open/campaign/' + campaignId + '/' + api.globalData.actionUuid + '?deviceType=' + api.globalDeviceType + '&u=' + cookieId + '&uuid=' + api.globalData.uuid;
                        //wigzo('track', 'onsitenotificationclicked', campaignId);
                        wigzo.$.get(trackOpenUrl, function (res) {
                            //hit trackopen to increase click counters
                        });
                    });
                }
            } else if("wigzo-onsite-notif-track-slider" === event.data.type) {
                if(event.data.url && event.data.url!='') {
                    wigzo.getOrCreateCookie(function(cookieId) {
                        var trackOpenUrl = '';
                        var targetWindowUrl = '';
                        targetWindowUrl = event.data.target;

                        if (event.data.url.indexOf('?') < 0) {
                            trackOpenUrl = event.data.url + '?deviceType=' + api.globalDeviceType + '&u=' + cookieId + '&uuid=' + api.globalData.uuid;
                        } else {
                            trackOpenUrl = event.data.url + '&deviceType=' + api.globalDeviceType + '&u=' + cookieId + '&uuid=' + api.globalData.uuid;
                        }
                        var win = window.open(trackOpenUrl, targetWindowUrl);
                        win.focus();
                    });
                }
                if (event.data.url =='' || typeof (event.data.url) === 'undefined') {
                    wigzo.getOrCreateCookie(function(cookieId) {
                        var campaignId = api.globalData.campaign_id;
                        var trackOpenUrl = wigzo.APP + '/onsitepush/track/open/campaign/' + campaignId + '/' + api.globalData.actionUuid + '?deviceType=' + api.globalDeviceType + '&u=' + cookieId + '&uuid=' + api.globalData.uuid;
                        wigzo.$.get(trackOpenUrl, function (res) {
                            //hit trackopen to increase click counters
                        });
                    });
                }

            } else if("wigzo-onsite-submit" === event.data.type) {
                 var dataToMap= event.data.data;
                 dataToMap['onsite_uuid'] = api.globalData.uuid;
                 _module.identify(dataToMap,['email', 'phone','full_name'], function (res) {
                     _module.consoleDebug(res);
                     if (res.status === "success"){
                         wigzo('track', 'onsitenotificationclicked', api.globalData.uuid);
                     }
                 }, 'ONSITENOTIFICATION');
                var postData = {
                    email: dataToMap.email,
                    emailServiceProviders: api.globalData.settings.emailServiceProviders
                };

                if(!!dataToMap.phone){
                    postData.phone = dataToMap.phone;
                }
                if(!!dataToMap.full_name){
                    postData.full_name = dataToMap.full_name;
                }
                if(!!dataToMap.date_of_birth){
                    postData.date_of_birth = dataToMap.date_of_birth;
                }
                if(!!dataToMap.gender){
                    postData.gender = dataToMap.gender;
                }

                ///new code
                if(!!dataToMap.question){
                    postData.question = dataToMap.question;
                }
                if(!!dataToMap.answer){
                    postData.answer = dataToMap.answer;
                }

                // if (dataToMap.hasOwnProperty("answer") && dataToMap.answer) {
                    wigzo.getOrCreateCookie(function(cookieId) {
                        var postHandlerURL = _module.APP + "/api/onsite/data/save/" + _module['ORGANIZATIONID'];
                        postData.cookieId = cookieId;
                        postData.template_name = api.globalData.uuid;
                        function postOnsiteData() {
                            _module.post(postHandlerURL, postData, function(res) {
                                _module.log("[SUCCESS] Response from client endpoint: " + res);
                            }, function(err) {
                                _module.log("[ERROR] Response from client endpoint: " + err);
                            });

                        }
                        if (ucSessionData1 && typeof ua !== 'undefined'){
                            ua.profileCallback(JSON.parse(ucSessionData1).u_mid, function(res) {
                                postData.ucSessionData = res.data;
                                postOnsiteData();
                            }, function(err) {
                                console.log('ua could not get profile');
                                postOnsiteData();
                            });
                         }else{
                            postOnsiteData();
                         }
                    });
                //   }
                ///new code end

                _module.post(_module.APP + '/api/email/provider/onsite/' + _module['ORGANIZATIONID'], postData, function (res) {
                    _module.log(res)
                });
                _module.post(_module.APP + '/api/email/provider/subscribe/' + _module['ORGANIZATIONID'], postData, function (res) {
                    _module.log(res);
                });
            }
            else if("wigzo-onsite-notif-email-phone" === event.data.type) {
                if(!!event.data.email) {
                    _module.identify({email: event.data.email, date_of_birth:event.data.date_of_birth, gender:event.data.gender, 'onsite_uuid':api.globalData.uuid}, ['email'],function (res) {
                        _module.consoleDebug(res);
                        if (res.status === "success"){
                            wigzo('track', 'onsitenotificationclicked', api.globalData.uuid);
                        }
                    }, 'ONSITENOTIFICATION');

                    if (event.data.hasOwnProperty("dataEndPoint") && event.data.dataEndPoint) {
                        var postHandlerURL = _module.APP + "/exitintent/customtemplate/endpointhandler";
                        postData = {'endpoint': event.data.dataEndPoint, 'data': event.data};
                        _module.post(postHandlerURL, postData, function (res) {
                          _module.log("[SUCCESS] Response from client endpoint: " + res);
                        }, function (err) {
                          _module.log("[ERROR] Response from client endpoint: " + err);
                        });
                    }
                }

                if(!!event.data.phone) {
                    _module.identify({phone: event.data.phone,date_of_birth:event.data.date_of_birth, gender:event.data.gender, 'onsiteUuid':api.globalData.uuid}, ['phone'],function (res) {
                        _module.consoleDebug(res);
                        if (res.status === "success"){
                            wigzo('track', 'onsitenotificationclicked', api.globalData.uuid);
                        }
                    },'ONSITENOTIFICATION');
                }
                if(!!event.data.full_name) {
                    _module.identify({full_name: event.data.full_name,date_of_birth:event.data.date_of_birth, gender:event.data.gender, 'onsiteUuid':api.globalData.uuid}, ['full_name'],function (res) {
                        _module.consoleDebug(res);
                        if (res.status === "success"){
                            wigzo('track', 'onsitenotificationclicked', api.globalData.uuid);
                        }
                    },'ONSITENOTIFICATION');
                }

                ///new code
                var postData = {};
                if(!!event.data.email){
                    postData.email = event.data.email;
                }
                if(!!event.data.phone){
                    postData.phone = event.data.phone;
                }
                if(!!event.data.full_name){
                    postData.full_name = event.data.full_name;
                }
                if(!!event.data.question){
                    postData.question = event.data.question;
                }
                if(!!event.data.answer){
                    postData.answer = event.data.answer;
                }
                // if (event.data.hasOwnProperty("answer") && event.data.answer) {
                    wigzo.getOrCreateCookie(function(cookieId) {
                        var postHandlerURL = _module.APP + "/api/onsite/data/save/" + _module['ORGANIZATIONID'];
                        postData.cookieId = cookieId;
                        postData.template_name = api.globalData.uuid;
//                        postData.ucSessionData = ucSessionData1;
                        function postOnsiteData() {
                            _module.post(postHandlerURL, postData, function(res) {
                                _module.log("[SUCCESS] Response from client endpoint: " + res);
                            }, function(err) {
                                _module.log("[ERROR] Response from client endpoint: " + err);
                            });

                        }
                        if (ucSessionData1 && typeof ua !== 'undefined'){
                            ua.profileCallback(JSON.parse(ucSessionData1).u_mid, function(res) {
                                postData.ucSessionData = res.data;
                                postOnsiteData();
                            }, function(err) {
                                console.log('ua could not get profile');
                                postOnsiteData();
                            });
                         }else{
                            postOnsiteData();
                         }
                    });
                //   }
                ///new code end

            }
            else if("wigzo-onsite-notif-email" === event.data.type) {
                _module.identify({email: event.data.email, date_of_birth:event.data.date_of_birth, gender:event.data.gender, 'onsite_uuid':api.globalData.uuid}, ['email'],function (res) {
                    _module.consoleDebug(res);
                    if (res.status === "success"){
                        wigzo('track', 'onsitenotificationclicked', api.globalData.uuid);
                    }
                }, 'ONSITENOTIFICATION');
                 if (event.data.hasOwnProperty("dataEndPoint") && event.data.dataEndPoint) {
                          var postHandlerURL = _module.APP + "/exitintent/customtemplate/endpointhandler";
                          postData = {'endpoint': event.data.dataEndPoint, 'data': event.data};
                          _module.post(postHandlerURL, postData, function (res) {
                            _module.log("[SUCCESS] Response from client endpoint: " + res);
                          }, function (err) {
                            _module.log("[ERROR] Response from client endpoint: " + err);
                          });
                }

                ///new code
                var postData = {};
                if(!!event.data.email){
                    postData.email = event.data.email;
                }
                if(!!event.data.phone){
                    postData.phone = event.data.phone;
                }
                if(!!event.data.full_name){
                    postData.full_name = event.data.full_name;
                }
                if(!!event.data.question){
                    postData.question = event.data.question;
                }
                if(!!event.data.answer){
                    postData.answer = event.data.answer;
                }
                // if (event.data.hasOwnProperty("answer") && event.data.answer) {
                    wigzo.getOrCreateCookie(function(cookieId) {
                        var postHandlerURL = _module.APP + "/api/onsite/data/save/" + _module['ORGANIZATIONID'];
                        postData.cookieId = cookieId;
                        postData.template_name = api.globalData.uuid;
                        function postOnsiteData() {
                            _module.post(postHandlerURL, postData, function(res) {
                                _module.log("[SUCCESS] Response from client endpoint: " + res);
                            }, function(err) {
                                _module.log("[ERROR] Response from client endpoint: " + err);
                            });

                        }
                        if (ucSessionData1 && typeof ua !== 'undefined'){
                            ua.profileCallback(JSON.parse(ucSessionData1).u_mid, function(res) {
                                postData.ucSessionData = res.data;
                                postOnsiteData();
                            }, function(err) {
                                console.log('ua could not get profile');
                                postOnsiteData();
                            });
                         }else{
                            postOnsiteData();
                         }
                    });
                //   }
                ///new code end

            } else if("wigzo-onsite-notif-phone" === event.data.type) {
                if(!!event.data.phone) {
                    _module.identify({phone: event.data.phone,date_of_birth:event.data.date_of_birth, gender:event.data.gender, 'onsiteUuid':api.globalData.uuid}, ['phone'],function (res) {
                        _module.consoleDebug(res);
                        if (res.status === "success"){
                            wigzo('track', 'onsitenotificationclicked', api.globalData.uuid);
                        }
                    },'ONSITENOTIFICATION');
                }

                ///new code
                var postData = {};
                if(!!event.data.email){
                    postData.email = event.data.email;
                }
                if(!!event.data.phone){
                    postData.phone = event.data.phone;
                }
                if(!!event.data.question){
                    postData.question = event.data.question;
                }
                if(!!event.data.answer){
                    postData.answer = event.data.answer;
                }
                // if (event.data.hasOwnProperty("answer") && event.data.answer) {
                    wigzo.getOrCreateCookie(function(cookieId) {
                        var postHandlerURL = _module.APP + "/api/onsite/data/save/" + _module['ORGANIZATIONID'];
                        postData.cookieId = cookieId;
                        postData.template_name = api.globalData.uuid;
//                        postData.ucSessionData = ucSessionData1;
                        function postOnsiteData() {
                            _module.post(postHandlerURL, postData, function(res) {
                                _module.log("[SUCCESS] Response from client endpoint: " + res);
                            }, function(err) {
                                _module.log("[ERROR] Response from client endpoint: " + err);
                            });

                        }
                        if (ucSessionData1 && typeof ua !== 'undefined'){
                            ua.profileCallback(JSON.parse(ucSessionData1).u_mid, function(res) {
                                postData.ucSessionData = res.data;
                                postOnsiteData();
                            }, function(err) {
                                console.log('ua could not get profile');
                                postOnsiteData();
                            });
                         }else{
                            postOnsiteData();
                         }
                    });
                //   }
                ///new code end
                
            }
            else if("wigzo-onsite-notif-name" === event.data.type) {
                if(!!event.data.name) {
                    _module.identify({name: event.data.name,date_of_birth:event.data.date_of_birth, gender:event.data.gender, 'onsiteUuid':api.globalData.uuid}, ['name'],function (res) {
                        _module.consoleDebug(res);
                        if (res.status === "success"){
                            wigzo('track', 'onsitenotificationclicked', api.globalData.uuid);
                        }
                    },'ONSITENOTIFICATION');
                }

                ///new code
                var postData = {};
                if(!!event.data.email){
                    postData.email = event.data.email;
                }
                if(!!event.data.phone){
                    postData.phone = event.data.phone;
                }
                if(!!event.data.name){
                    postData.name = event.data.name;
                }
                if(!!event.data.question){
                    postData.question = event.data.question;
                }
                if(!!event.data.answer){
                    postData.answer = event.data.answer;
                }
                // if (event.data.hasOwnProperty("answer") && event.data.answer) {
                    wigzo.getOrCreateCookie(function(cookieId) {
                        var postHandlerURL = _module.APP + "/api/onsite/data/save/" + _module['ORGANIZATIONID'];
                        postData.cookieId = cookieId;
                        postData.template_name = api.globalData.uuid;
                        function postOnsiteData() {
                            _module.post(postHandlerURL, postData, function(res) {
                                _module.log("[SUCCESS] Response from client endpoint: " + res);
                            }, function(err) {
                                _module.log("[ERROR] Response from client endpoint: " + err);
                            });

                        }
                        if (ucSessionData1 && typeof ua !== 'undefined'){
                            ua.profileCallback(JSON.parse(ucSessionData1).u_mid, function(res) {
                                postData.ucSessionData = res.data;
                                postOnsiteData();
                            }, function(err) {
                                console.log('ua could not get profile');
                                postOnsiteData();
                            });
                         }else{
                            postOnsiteData();
                         }
                    });
                //   }
                ///new code end
                
            }
             else if("wigzo-onsite-notif-dimensions" === event.data.type) {
                    wigzo.$("#wigzo-onsite-notif-iframe-div").css("max-height", event.data.wigzoHolder.height);
                if(window.outerWidth >= 420 )
                    wigzo.$("#wigzo-onsite-notif-iframe-div").css("max-width", event.data.wigzoHolder.width);
                else if(window.outerWidth <= 660 && !!event.data.wigzoHolder.isRibbon)
                    wigzo.$("#wigzo-onsite-notif-iframe-div").css("max-width", "150px");
                else
                    wigzo.$("#wigzo-onsite-notif-iframe-div").css("max-width", "100%");

                if (event.data.wigzoHolder.hasOwnProperty('top'))
                    wigzo.$("#wigzo-onsite-notif-iframe-div").css("top", event.data.wigzoHolder.top);
                if (event.data.wigzoHolder.hasOwnProperty('right'))
                    wigzo.$("#wigzo-onsite-notif-iframe-div").css("right", event.data.wigzoHolder.right);
                if (event.data.wigzoHolder.hasOwnProperty('bottom'))
                    wigzo.$("#wigzo-onsite-notif-iframe-div").css("bottom", event.data.wigzoHolder.bottom);
                if (event.data.wigzoHolder.hasOwnProperty('left'))
                    wigzo.$("#wigzo-onsite-notif-iframe-div").css("left", event.data.wigzoHolder.left);
                wigzo.$("#wigzo-onsite-notif-iframe-div").css("opacity", "1");

            } else if("wigzo-onsite-addToCart" === event.data.type){
                if(!!event.data.addToCartFormData){
                    var formData = event.data.addToCartFormData;
                    _module.$.ajax("/cart/add.js", {
                        method: "POST",
                        data: JSON.stringify(formData),
                        dataType:'json',
                        headers: {
                            'Content-Type': 'application/json'
                        } ,
                        success: function (data) {
                            var onsiteIframe = document.getElementById("wigzo_onsite_temp019");
                            setTimeout(function () {
                                onsiteIframe.contentWindow.postMessage({
                                    type: "add-to-cart-response", responseData: "success"
                                }, "*");
                            },100);
                            return data;
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                    /*fetch('/cart/add.js', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    }).then(response => {
                        let onsiteIframe = document.getElementById("wigzo_onsite_temp019"); // let responseJson = JSON.parse(response.json());

                        setTimeout(function () {
                            onsiteIframe.contentWindow.postMessage({
                                type: "add-to-cart-response",
                                responseData: "success"
                            }, "*");
                        }, 100);
                        return response.json();
                    }).catch(error => {
                        console.error('Error:', error);
                    });*/
                }
            } else if("wigzo-onsite-is-mobile" === event.data.type) {
                 var onsiteIframe = document.getElementById("wigzo_onsite_temp019");
                if(window.innerWidth > 450){
                    setTimeout(function () {
                        onsiteIframe.contentWindow.postMessage({
                            type: "isMobileDevice", isMobile: false
                        }, "*");
                    },100);
                } else {
                    setTimeout(function () {
                        onsiteIframe.contentWindow.postMessage({
                            type: "isMobileDevice", isMobile: true
                        }, "*");
                    }, 100);
                }
            } else if("wigzo-go-to-cart-page" === event.data.type) {
                wigzo.$('#wigzo-onsite-notif-iframe-div').fadeOut(500, function () {
                    wigzo.$(this).remove();
                });
                location.href = "/cart";
            }else if ("wigzo-onsite-coupon-code" == event.data.type) {
                var couponCode = "";
                if(event.data.hasOwnProperty("coupon") && navigator.hasOwnProperty("clipboard")){
                     navigator['clipboard'].writeText(event.data.coupon);
                };
            };
            api.hasGlobalMessageListener = true;
        };
        return api;
    })(_module.onsitePush || {});

    return _module;
}(window.wigzo || {}));



window.wigzo = (function(_module) {

! function(t) {
    _module.io = t ();
    //var e;
    //e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.io = t()
}(function() {
    var t;
    return function e(t, n, r) {
        function o(s, a) {
            if (!n[s]) {
                if (!t[s]) {
                    var c = "function" == typeof require && require;
                    if (!a && c) return c(s, !0);
                    if (i) return i(s, !0);
                    var p = new Error("Cannot find module '" + s + "'");
                    throw p.code = "MODULE_NOT_FOUND", p
                }
                var u = n[s] = {
                    exports: {}
                };
                t[s][0].call(u.exports, function(e) {
                    var n = t[s][1][e];
                    return o(n ? n : e)
                }, u, u.exports, e, t, n, r)
            }
            return n[s].exports
        }
        for (var i = "function" == typeof require && require, s = 0; s < r.length; s++) o(r[s]);
        return o
    }({
        1: [function(t, e, n) {
            e.exports = t("./lib/")
        }, {
            "./lib/": 2
        }],
        2: [function(t, e, n) {
            e.exports = t("./socket"), e.exports.parser = t("engine.io-parser")
        }, {
            "./socket": 3,
            "engine.io-parser": 19
        }],
        3: [function(t, e, n) {
            (function(n) {
                function r(t, e) {
                    if (!(this instanceof r)) return new r(t, e);
                    e = e || {}, t && "object" == typeof t && (e = t, t = null), t ? (t = u(t), e.hostname = t.host, e.secure = "https" == t.protocol || "wss" == t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = u(e.host).host), this.secure = null != e.secure ? e.secure : n.location && "https:" == location.protocol, e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.agent = e.agent || !1, this.hostname = e.hostname || (n.location ? location.hostname : "localhost"), this.port = e.port || (n.location && location.port ? location.port : this.secure ? 443 : 80), this.query = e.query || {}, "string" == typeof this.query && (this.query = h.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam || "t", this.timestampRequests = e.timestampRequests, this.transports = e.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== e.perMessageDeflate ? e.perMessageDeflate || {} : !1, !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = void 0 === e.rejectUnauthorized ? null : e.rejectUnauthorized;
                    var o = "object" == typeof n && n;
                    o.global === o && e.extraHeaders && Object.keys(e.extraHeaders).length > 0 && (this.extraHeaders = e.extraHeaders), this.open()
                }

                function o(t) {
                    var e = {};
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                    return e
                }
                var i = t("./transports"),
                    s = t("component-emitter"),
                    a = t("debug")("engine.io-client:socket"),
                    c = t("indexof"),
                    p = t("engine.io-parser"),
                    u = t("parseuri"),
                    f = t("parsejson"),
                    h = t("parseqs");
                e.exports = r, r.priorWebsocketSuccess = !1, s(r.prototype), r.protocol = p.protocol, r.Socket = r, r.Transport = t("./transport"), r.transports = t("./transports"), r.parser = t("engine.io-parser"), r.prototype.createTransport = function(t) {
                    a('creating transport "%s"', t);
                    var e = o(this.query);
                    e.EIO = p.protocol, e.transport = t, this.id && (e.sid = this.id);
                    var n = new i[t]({
                        agent: this.agent,
                        hostname: this.hostname,
                        port: this.port,
                        secure: this.secure,
                        path: this.path,
                        query: e,
                        forceJSONP: this.forceJSONP,
                        jsonp: this.jsonp,
                        forceBase64: this.forceBase64,
                        enablesXDR: this.enablesXDR,
                        timestampRequests: this.timestampRequests,
                        timestampParam: this.timestampParam,
                        policyPort: this.policyPort,
                        socket: this,
                        pfx: this.pfx,
                        key: this.key,
                        passphrase: this.passphrase,
                        cert: this.cert,
                        ca: this.ca,
                        ciphers: this.ciphers,
                        rejectUnauthorized: this.rejectUnauthorized,
                        perMessageDeflate: this.perMessageDeflate,
                        extraHeaders: this.extraHeaders
                    });
                    return n
                }, r.prototype.open = function() {
                    var t;
                    if (this.rememberUpgrade && r.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) t = "websocket";
                    else {
                        if (0 === this.transports.length) {
                            var e = this;
                            return void setTimeout(function() {
                                e.emit("error", "No transports available")
                            }, 0)
                        }
                        t = this.transports[0]
                    }
                    this.readyState = "opening";
                    try {
                        t = this.createTransport(t)
                    } catch (n) {
                        return this.transports.shift(), void this.open()
                    }
                    t.open(), this.setTransport(t)
                }, r.prototype.setTransport = function(t) {
                    a("setting transport %s", t.name);
                    var e = this;
                    this.transport && (a("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on("drain", function() {
                        e.onDrain()
                    }).on("packet", function(t) {
                        e.onPacket(t)
                    }).on("error", function(t) {
                        e.onError(t)
                    }).on("close", function() {
                        e.onClose("transport close")
                    })
                }, r.prototype.probe = function(t) {
                    function e() {
                        if (h.onlyBinaryUpgrades) {
                            var e = !this.supportsBinary && h.transport.supportsBinary;
                            f = f || e
                        }
                        f || (a('probe transport "%s" opened', t), u.send([{
                            type: "ping",
                            data: "probe"
                        }]), u.once("packet", function(e) {
                            if (!f)
                                if ("pong" == e.type && "probe" == e.data) {
                                    if (a('probe transport "%s" pong', t), h.upgrading = !0, h.emit("upgrading", u), !u) return;
                                    r.priorWebsocketSuccess = "websocket" == u.name, a('pausing current transport "%s"', h.transport.name), h.transport.pause(function() {
                                        f || "closed" != h.readyState && (a("changing transport and sending upgrade packet"), p(), h.setTransport(u), u.send([{
                                            type: "upgrade"
                                        }]), h.emit("upgrade", u), u = null, h.upgrading = !1, h.flush())
                                    })
                                } else {
                                    a('probe transport "%s" failed', t);
                                    var n = new Error("probe error");
                                    n.transport = u.name, h.emit("upgradeError", n)
                                }
                        }))
                    }

                    function n() {
                        f || (f = !0, p(), u.close(), u = null)
                    }

                    function o(e) {
                        var r = new Error("probe error: " + e);
                        r.transport = u.name, n(), a('probe transport "%s" failed because of error: %s', t, e), h.emit("upgradeError", r)
                    }

                    function i() {
                        o("transport closed")
                    }

                    function s() {
                        o("socket closed")
                    }

                    function c(t) {
                        u && t.name != u.name && (a('"%s" works - aborting "%s"', t.name, u.name), n())
                    }

                    function p() {
                        u.removeListener("open", e), u.removeListener("error", o), u.removeListener("close", i), h.removeListener("close", s), h.removeListener("upgrading", c)
                    }
                    a('probing transport "%s"', t);
                    var u = this.createTransport(t, {
                            probe: 1
                        }),
                        f = !1,
                        h = this;
                    r.priorWebsocketSuccess = !1, u.once("open", e), u.once("error", o), u.once("close", i), this.once("close", s), this.once("upgrading", c), u.open()
                }, r.prototype.onOpen = function() {
                    if (a("socket open"), this.readyState = "open", r.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
                        a("starting upgrade probes");
                        for (var t = 0, e = this.upgrades.length; e > t; t++) this.probe(this.upgrades[t])
                    }
                }, r.prototype.onPacket = function(t) {
                    if ("opening" == this.readyState || "open" == this.readyState) switch (a('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
                        case "open":
                            this.onHandshake(f(t.data));
                            break;
                        case "pong":
                            this.setPing(), this.emit("pong");
                            break;
                        case "error":
                            var e = new Error("server error");
                            e.code = t.data, this.onError(e);
                            break;
                        case "message":
                            this.emit("data", t.data), this.emit("message", t.data)
                    } else a('packet received with socket readyState "%s"', this.readyState)
                }, r.prototype.onHandshake = function(t) {
                    this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                }, r.prototype.onHeartbeat = function(t) {
                    clearTimeout(this.pingTimeoutTimer);
                    var e = this;
                    e.pingTimeoutTimer = setTimeout(function() {
                        "closed" != e.readyState && e.onClose("ping timeout")
                    }, t || e.pingInterval + e.pingTimeout)
                }, r.prototype.setPing = function() {
                    var t = this;
                    clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
                        a("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout)
                    }, t.pingInterval)
                }, r.prototype.ping = function() {
                    var t = this;
                    this.sendPacket("ping", function() {
                        t.emit("ping")
                    })
                }, r.prototype.onDrain = function() {
                    this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
                }, r.prototype.flush = function() {
                    "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (a("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                }, r.prototype.write = r.prototype.send = function(t, e, n) {
                    return this.sendPacket("message", t, e, n), this
                }, r.prototype.sendPacket = function(t, e, n, r) {
                    if ("function" == typeof e && (r = e, e = void 0), "function" == typeof n && (r = n, n = null), "closing" != this.readyState && "closed" != this.readyState) {
                        n = n || {}, n.compress = !1 !== n.compress;
                        var o = {
                            type: t,
                            data: e,
                            options: n
                        };
                        this.emit("packetCreate", o), this.writeBuffer.push(o), r && this.once("flush", r), this.flush()
                    }
                }, r.prototype.close = function() {
                    function t() {
                        r.onClose("forced close"), a("socket closing - telling transport to close"), r.transport.close()
                    }

                    function e() {
                        r.removeListener("upgrade", e), r.removeListener("upgradeError", e), t()
                    }

                    function n() {
                        r.once("upgrade", e), r.once("upgradeError", e)
                    }
                    if ("opening" == this.readyState || "open" == this.readyState) {
                        this.readyState = "closing";
                        var r = this;
                        this.writeBuffer.length ? this.once("drain", function() {
                            this.upgrading ? n() : t()
                        }) : this.upgrading ? n() : t()
                    }
                    return this
                }, r.prototype.onError = function(t) {
                    a("socket error %j", t), r.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t)
                }, r.prototype.onClose = function(t, e) {
                    if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                        a('socket close with reason: "%s"', t);
                        var n = this;
                        clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e), n.writeBuffer = [], n.prevBufferLen = 0
                    }
                }, r.prototype.filterUpgrades = function(t) {
                    for (var e = [], n = 0, r = t.length; r > n; n++) ~c(this.transports, t[n]) && e.push(t[n]);
                    return e
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {
            "./transport": 4,
            "./transports": 5,
            "component-emitter": 15,
            debug: 17,
            "engine.io-parser": 19,
            indexof: 23,
            parsejson: 26,
            parseqs: 27,
            parseuri: 28
        }],
        4: [function(t, e, n) {
            function r(t) {
                this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders
            }
            var o = t("engine.io-parser"),
                i = t("component-emitter");
            e.exports = r, i(r.prototype), r.prototype.onError = function(t, e) {
                var n = new Error(t);
                return n.type = "TransportError", n.description = e, this.emit("error", n), this
            }, r.prototype.open = function() {
                return ("closed" == this.readyState || "" == this.readyState) && (this.readyState = "opening", this.doOpen()), this
            }, r.prototype.close = function() {
                return ("opening" == this.readyState || "open" == this.readyState) && (this.doClose(), this.onClose()), this
            }, r.prototype.send = function(t) {
                if ("open" != this.readyState) throw new Error("Transport not open");
                this.write(t)
            }, r.prototype.onOpen = function() {
                this.readyState = "open", this.writable = !0, this.emit("open")
            }, r.prototype.onData = function(t) {
                var e = o.decodePacket(t, this.socket.binaryType);
                this.onPacket(e)
            }, r.prototype.onPacket = function(t) {
                this.emit("packet", t)
            }, r.prototype.onClose = function() {
                this.readyState = "closed", this.emit("close")
            }
        }, {
            "component-emitter": 15,
            "engine.io-parser": 19
        }],
        5: [function(t, e, n) {
            (function(e) {
                function r(t) {
                    var n, r = !1,
                        a = !1,
                        c = !1 !== t.jsonp;
                    if (e.location) {
                        var p = "https:" == location.protocol,
                            u = location.port;
                        u || (u = p ? 443 : 80), r = t.hostname != location.hostname || u != t.port, a = t.secure != p
                    }
                    if (t.xdomain = r, t.xscheme = a, n = new o(t), "open" in n && !t.forceJSONP) return new i(t);
                    if (!c) throw new Error("JSONP disabled");
                    return new s(t)
                }
                var o = t("xmlhttprequest-ssl"),
                    i = t("./polling-xhr"),
                    s = t("./polling-jsonp"),
                    a = t("./websocket");
                n.polling = r, n.websocket = a
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {
            "./polling-jsonp": 6,
            "./polling-xhr": 7,
            "./websocket": 9,
            "xmlhttprequest-ssl": 10
        }],
        6: [function(t, e, n) {
            (function(n) {
                function r() {}

                function o(t) {
                    i.call(this, t), this.query = this.query || {}, a || (n.___eio || (n.___eio = []), a = n.___eio), this.index = a.length;
                    var e = this;
                    a.push(function(t) {
                        e.onData(t)
                    }), this.query.j = this.index, n.document && n.addEventListener && n.addEventListener("beforeunload", function() {
                        e.script && (e.script.onerror = r)
                    }, !1)
                }
                var i = t("./polling"),
                    s = t("component-inherit");
                e.exports = o;
                var a, c = /\n/g,
                    p = /\\n/g;
                s(o, i), o.prototype.supportsBinary = !1, o.prototype.doClose = function() {
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), i.prototype.doClose.call(this)
                }, o.prototype.doPoll = function() {
                    var t = this,
                        e = document.createElement("script");
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), e.async = !0, e.src = this.uri(), e.onerror = function(e) {
                        t.onError("jsonp poll error", e)
                    };
                    var n = document.getElementsByTagName("script")[0];
                    n ? n.parentNode.insertBefore(e, n) : (document.head || document.body).appendChild(e), this.script = e;
                    var r = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                    r && setTimeout(function() {
                        var t = document.createElement("iframe");
                        document.body.appendChild(t), document.body.removeChild(t)
                    }, 100)
                }, o.prototype.doWrite = function(t, e) {
                    function n() {
                        r(), e()
                    }

                    function r() {
                        if (o.iframe) try {
                            o.form.removeChild(o.iframe)
                        } catch (t) {
                            o.onError("jsonp polling iframe removal error", t)
                        }
                        try {
                            var e = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                            i = document.createElement(e)
                        } catch (t) {
                            i = document.createElement("iframe"), i.name = o.iframeId, i.src = "javascript:0"
                        }
                        i.id = o.iframeId, o.form.appendChild(i), o.iframe = i
                    }
                    var o = this;
                    if (!this.form) {
                        var i, s = document.createElement("form"),
                            a = document.createElement("textarea"),
                            u = this.iframeId = "eio_iframe_" + this.index;
                        s.className = "socketio", s.style.position = "absolute", s.style.top = "-1000px", s.style.left = "-1000px", s.target = u, s.method = "POST", s.setAttribute("accept-charset", "utf-8"), a.name = "d", s.appendChild(a), document.body.appendChild(s), this.form = s, this.area = a
                    }
                    this.form.action = this.uri(), r(), t = t.replace(p, "\\\n"), this.area.value = t.replace(c, "\\n");
                    try {
                        this.form.submit()
                    } catch (f) {}
                    this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                        "complete" == o.iframe.readyState && n()
                    } : this.iframe.onload = n
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {
            "./polling": 8,
            "component-inherit": 16
        }],
        7: [function(t, e, n) {
            (function(n) {
                function r() {}

                function o(t) {
                    if (c.call(this, t), n.location) {
                        var e = "https:" == location.protocol,
                            r = location.port;
                        r || (r = e ? 443 : 80), this.xd = t.hostname != n.location.hostname || r != t.port, this.xs = t.secure != e
                    } else this.extraHeaders = t.extraHeaders
                }

                function i(t) {
                    this.method = t.method || "GET", this.uri = t.uri, this.xd = !!t.xd, this.xs = !!t.xs, this.async = !1 !== t.async, this.data = void 0 != t.data ? t.data : null, this.agent = t.agent, this.isBinary = t.isBinary, this.supportsBinary = t.supportsBinary, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders, this.create()
                }

                function s() {
                    for (var t in i.requests) i.requests.hasOwnProperty(t) && i.requests[t].abort()
                }
                var a = t("xmlhttprequest-ssl"),
                    c = t("./polling"),
                    p = t("component-emitter"),
                    u = t("component-inherit"),
                    f = t("debug")("engine.io-client:polling-xhr");
                e.exports = o, e.exports.Request = i, u(o, c), o.prototype.supportsBinary = !0, o.prototype.request = function(t) {
                    return t = t || {}, t.uri = this.uri(), t.xd = this.xd, t.xs = this.xs, t.agent = this.agent || !1, t.supportsBinary = this.supportsBinary, t.enablesXDR = this.enablesXDR, t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, t.extraHeaders = this.extraHeaders, new i(t)
                }, o.prototype.doWrite = function(t, e) {
                    var n = "string" != typeof t && void 0 !== t,
                        r = this.request({
                            method: "POST",
                            data: t,
                            isBinary: n
                        }),
                        o = this;
                    r.on("success", e), r.on("error", function(t) {
                        o.onError("xhr post error", t)
                    }), this.sendXhr = r
                }, o.prototype.doPoll = function() {
                    f("xhr poll");
                    var t = this.request(),
                        e = this;
                    t.on("data", function(t) {
                        e.onData(t)
                    }), t.on("error", function(t) {
                        e.onError("xhr poll error", t)
                    }), this.pollXhr = t
                }, p(i.prototype), i.prototype.create = function() {
                    var t = {
                        agent: this.agent,
                        xdomain: this.xd,
                        xscheme: this.xs,
                        enablesXDR: this.enablesXDR
                    };
                    t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
                    var e = this.xhr = new a(t),
                        r = this;
                    try {
                        f("xhr open %s: %s", this.method, this.uri), e.open(this.method, this.uri, this.async);
                        try {
                            if (this.extraHeaders) {
                                e.setDisableHeaderCheck(!0);
                                for (var o in this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && e.setRequestHeader(o, this.extraHeaders[o])
                            }
                        } catch (s) {}
                        if (this.supportsBinary && (e.responseType = "arraybuffer"), "POST" == this.method) try {
                            this.isBinary ? e.setRequestHeader("Content-type", "application/octet-stream") : e.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                        } catch (s) {}
                        "withCredentials" in e && (e.withCredentials = !0), this.hasXDR() ? (e.onload = function() {
                            r.onLoad()
                        }, e.onerror = function() {
                            r.onError(e.responseText)
                        }) : e.onreadystatechange = function() {
                            4 == e.readyState && (200 == e.status || 1223 == e.status ? r.onLoad() : setTimeout(function() {
                                r.onError(e.status)
                            }, 0))
                        }, f("xhr data %s", this.data), e.send(this.data)
                    } catch (s) {
                        return void setTimeout(function() {
                            r.onError(s)
                        }, 0)
                    }
                    n.document && (this.index = i.requestsCount++, i.requests[this.index] = this)
                }, i.prototype.onSuccess = function() {
                    this.emit("success"), this.cleanup()
                }, i.prototype.onData = function(t) {
                    this.emit("data", t), this.onSuccess()
                }, i.prototype.onError = function(t) {
                    this.emit("error", t), this.cleanup(!0)
                }, i.prototype.cleanup = function(t) {
                    if ("undefined" != typeof this.xhr && null !== this.xhr) {
                        if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = r : this.xhr.onreadystatechange = r, t) try {
                            this.xhr.abort()
                        } catch (e) {}
                        n.document && delete i.requests[this.index], this.xhr = null
                    }
                }, i.prototype.onLoad = function() {
                    var t;
                    try {
                        var e;
                        try {
                            e = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                        } catch (n) {}
                        if ("application/octet-stream" === e) t = this.xhr.response;
                        else if (this.supportsBinary) try {
                            t = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
                        } catch (n) {
                            for (var r = new Uint8Array(this.xhr.response), o = [], i = 0, s = r.length; s > i; i++) o.push(r[i]);
                            t = String.fromCharCode.apply(null, o)
                        } else t = this.xhr.responseText
                    } catch (n) {
                        this.onError(n)
                    }
                    null != t && this.onData(t)
                }, i.prototype.hasXDR = function() {
                    return "undefined" != typeof n.XDomainRequest && !this.xs && this.enablesXDR
                }, i.prototype.abort = function() {
                    this.cleanup()
                }, n.document && (i.requestsCount = 0, i.requests = {}, n.attachEvent ? n.attachEvent("onunload", s) : n.addEventListener && n.addEventListener("beforeunload", s, !1))
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {
            "./polling": 8,
            "component-emitter": 15,
            "component-inherit": 16,
            debug: 17,
            "xmlhttprequest-ssl": 10
        }],
        8: [function(t, e, n) {
            function r(t) {
                var e = t && t.forceBase64;
                (!u || e) && (this.supportsBinary = !1), o.call(this, t)
            }
            var o = t("../transport"),
                i = t("parseqs"),
                s = t("engine.io-parser"),
                a = t("component-inherit"),
                c = t("yeast"),
                p = t("debug")("engine.io-client:polling");
            e.exports = r;
            var u = function() {
                var e = t("xmlhttprequest-ssl"),
                    n = new e({
                        xdomain: !1
                    });
                return null != n.responseType
            }();
            a(r, o), r.prototype.name = "polling", r.prototype.doOpen = function() {
                this.poll()
            }, r.prototype.pause = function(t) {
                function e() {
                    p("paused"), n.readyState = "paused", t()
                }
                var n = this;
                if (this.readyState = "pausing", this.polling || !this.writable) {
                    var r = 0;
                    this.polling && (p("we are currently polling - waiting to pause"), r++, this.once("pollComplete", function() {
                        p("pre-pause polling complete"), --r || e()
                    })), this.writable || (p("we are currently writing - waiting to pause"), r++, this.once("drain", function() {
                        p("pre-pause writing complete"), --r || e()
                    }))
                } else e()
            }, r.prototype.poll = function() {
                p("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
            }, r.prototype.onData = function(t) {
                var e = this;
                p("polling got data %s", t);
                var n = function(t, n, r) {
                    return "opening" == e.readyState && e.onOpen(), "close" == t.type ? (e.onClose(), !1) : void e.onPacket(t)
                };
                s.decodePayload(t, this.socket.binaryType, n), "closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : p('ignoring poll - transport state "%s"', this.readyState))
            }, r.prototype.doClose = function() {
                function t() {
                    p("writing close packet"), e.write([{
                        type: "close"
                    }])
                }
                var e = this;
                "open" == this.readyState ? (p("transport open - closing"), t()) : (p("transport not open - deferring close"), this.once("open", t))
            }, r.prototype.write = function(t) {
                var e = this;
                this.writable = !1;
                var n = function() {
                        e.writable = !0, e.emit("drain")
                    },
                    e = this;
                s.encodePayload(t, this.supportsBinary, function(t) {
                    e.doWrite(t, n)
                })
            }, r.prototype.uri = function() {
                var t = this.query || {},
                    e = this.secure ? "https" : "http",
                    n = "";
                !1 !== this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || t.sid || (t.b64 = 1), t = i.encode(t), this.port && ("https" == e && 443 != this.port || "http" == e && 80 != this.port) && (n = ":" + this.port), t.length && (t = "?" + t);
                var r = -1 !== this.hostname.indexOf(":");
                return e + "://" + (r ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t
            }
        }, {
            "../transport": 4,
            "component-inherit": 16,
            debug: 17,
            "engine.io-parser": 19,
            parseqs: 27,
            "xmlhttprequest-ssl": 10,
            yeast: 30
        }],
        9: [function(t, e, n) {
            (function(n) {
                function r(t) {
                    var e = t && t.forceBase64;
                    e && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, o.call(this, t)
                }
                var o = t("../transport"),
                    i = t("engine.io-parser"),
                    s = t("parseqs"),
                    a = t("component-inherit"),
                    c = t("yeast"),
                    p = t("debug")("engine.io-client:websocket"),
                    u = n.WebSocket || n.MozWebSocket,
                    f = u;
                if (!f && "undefined" == typeof window) try {
                    f = t("ws")
                } catch (h) {}
                e.exports = r, a(r, o), r.prototype.name = "websocket", r.prototype.supportsBinary = !0, r.prototype.doOpen = function() {
                    if (this.check()) {
                        var t = this.uri(),
                            e = void 0,
                            n = {
                                agent: this.agent,
                                perMessageDeflate: this.perMessageDeflate
                            };
                        n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (n.headers = this.extraHeaders), this.ws = u ? new f(t) : new f(t, e, n), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "buffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
                    }
                }, r.prototype.addEventListeners = function() {
                    var t = this;
                    this.ws.onopen = function() {
                        t.onOpen()
                    }, this.ws.onclose = function() {
                        t.onClose()
                    }, this.ws.onmessage = function(e) {
                        t.onData(e.data)
                    }, this.ws.onerror = function(e) {
                        t.onError("websocket error", e)
                    }
                }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (r.prototype.onData = function(t) {
                    var e = this;
                    setTimeout(function() {
                        o.prototype.onData.call(e, t)
                    }, 0)
                }), r.prototype.write = function(t) {
                    function e() {
                        r.emit("flush"), setTimeout(function() {
                            r.writable = !0, r.emit("drain")
                        }, 0)
                    }
                    var r = this;
                    this.writable = !1;
                    for (var o = t.length, s = 0, a = o; a > s; s++) ! function(t) {
                        i.encodePacket(t, r.supportsBinary, function(i) {
                            if (!u) {
                                var s = {};
                                if (t.options && (s.compress = t.options.compress), r.perMessageDeflate) {
                                    var a = "string" == typeof i ? n.Buffer.byteLength(i) : i.length;
                                    a < r.perMessageDeflate.threshold && (s.compress = !1)
                                }
                            }
                            try {
                                u ? r.ws.send(i) : r.ws.send(i, s)
                            } catch (c) {
                                p("websocket closed before onclose event")
                            }--o || e()
                        })
                    }(t[s])
                }, r.prototype.onClose = function() {
                    o.prototype.onClose.call(this)
                }, r.prototype.doClose = function() {
                    "undefined" != typeof this.ws && this.ws.close()
                }, r.prototype.uri = function() {
                    var t = this.query || {},
                        e = this.secure ? "wss" : "ws",
                        n = "";
                    this.port && ("wss" == e && 443 != this.port || "ws" == e && 80 != this.port) && (n = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || (t.b64 = 1), t = s.encode(t), t.length && (t = "?" + t);
                    var r = -1 !== this.hostname.indexOf(":");
                    return e + "://" + (r ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t
                }, r.prototype.check = function() {
                    return !(!f || "__initialize" in f && this.name === r.prototype.name)
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {
            "../transport": 4,
            "component-inherit": 16,
            debug: 17,
            "engine.io-parser": 19,
            parseqs: 27,
            ws: void 0,
            yeast: 30
        }],
        10: [function(t, e, n) {
            var r = t("has-cors");
            e.exports = function(t) {
                var e = t.xdomain,
                    n = t.xscheme,
                    o = t.enablesXDR;
                try {
                    if ("undefined" != typeof XMLHttpRequest && (!e || r)) return new XMLHttpRequest
                } catch (i) {}
                try {
                    if ("undefined" != typeof XDomainRequest && !n && o) return new XDomainRequest
                } catch (i) {}
                if (!e) try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (i) {}
            }
        }, {
            "has-cors": 22
        }],
        11: [function(t, e, n) {
            function r(t, e, n) {
                function r(t, o) {
                    if (r.count <= 0) throw new Error("after called too many times");
                    --r.count, t ? (i = !0, e(t), e = n) : 0 !== r.count || i || e(null, o)
                }
                var i = !1;
                return n = n || o, r.count = t, 0 === t ? e() : r
            }

            function o() {}
            e.exports = r
        }, {}],
        12: [function(t, e, n) {
            e.exports = function(t, e, n) {
                var r = t.byteLength;
                if (e = e || 0, n = n || r, t.slice) return t.slice(e, n);
                if (0 > e && (e += r), 0 > n && (n += r), n > r && (n = r), e >= r || e >= n || 0 === r) return new ArrayBuffer(0);
                for (var o = new Uint8Array(t), i = new Uint8Array(n - e), s = e, a = 0; n > s; s++, a++) i[a] = o[s];
                return i.buffer
            }
        }, {}],
        13: [function(t, e, n) {
            ! function(t) {
                "use strict";
                n.encode = function(e) {
                    var n, r = new Uint8Array(e),
                        o = r.length,
                        i = "";
                    for (n = 0; o > n; n += 3) i += t[r[n] >> 2], i += t[(3 & r[n]) << 4 | r[n + 1] >> 4], i += t[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], i += t[63 & r[n + 2]];
                    return o % 3 === 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 === 1 && (i = i.substring(0, i.length - 2) + "=="), i
                }, n.decode = function(e) {
                    var n, r, o, i, s, a = .75 * e.length,
                        c = e.length,
                        p = 0;
                    "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
                    var u = new ArrayBuffer(a),
                        f = new Uint8Array(u);
                    for (n = 0; c > n; n += 4) r = t.indexOf(e[n]), o = t.indexOf(e[n + 1]), i = t.indexOf(e[n + 2]), s = t.indexOf(e[n + 3]), f[p++] = r << 2 | o >> 4, f[p++] = (15 & o) << 4 | i >> 2, f[p++] = (3 & i) << 6 | 63 & s;
                    return u
                }
            }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
        }, {}],
        14: [function(t, e, n) {
            (function(t) {
                function n(t) {
                    for (var e = 0; e < t.length; e++) {
                        var n = t[e];
                        if (n.buffer instanceof ArrayBuffer) {
                            var r = n.buffer;
                            if (n.byteLength !== r.byteLength) {
                                var o = new Uint8Array(n.byteLength);
                                o.set(new Uint8Array(r, n.byteOffset, n.byteLength)), r = o.buffer
                            }
                            t[e] = r
                        }
                    }
                }

                function r(t, e) {
                    e = e || {};
                    var r = new i;
                    n(t);
                    for (var o = 0; o < t.length; o++) r.append(t[o]);
                    return e.type ? r.getBlob(e.type) : r.getBlob()
                }

                function o(t, e) {
                    return n(t), new Blob(t, e || {})
                }
                var i = t.BlobBuilder || t.WebKitBlobBuilder || t.MSBlobBuilder || t.MozBlobBuilder,
                    s = function() {
                        try {
                            var t = new Blob(["hi"]);
                            return 2 === t.size
                        } catch (e) {
                            return !1
                        }
                    }(),
                    a = s && function() {
                            try {
                                var t = new Blob([new Uint8Array([1, 2])]);
                                return 2 === t.size
                            } catch (e) {
                                return !1
                            }
                        }(),
                    c = i && i.prototype.append && i.prototype.getBlob;
                e.exports = function() {
                    return s ? a ? t.Blob : o : c ? r : void 0
                }()
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {}],
        15: [function(t, e, n) {
            function r(t) {
                return t ? o(t) : void 0
            }

            function o(t) {
                for (var e in r.prototype) t[e] = r.prototype[e];
                return t
            }
            e.exports = r, r.prototype.on = r.prototype.addEventListener = function(t, e) {
                return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
            }, r.prototype.once = function(t, e) {
                function n() {
                    r.off(t, n), e.apply(this, arguments)
                }
                var r = this;
                return this._callbacks = this._callbacks || {}, n.fn = e, this.on(t, n), this
            }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(t, e) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var n = this._callbacks[t];
                if (!n) return this;
                if (1 == arguments.length) return delete this._callbacks[t], this;
                for (var r, o = 0; o < n.length; o++)
                    if (r = n[o], r === e || r.fn === e) {
                        n.splice(o, 1);
                        break
                    }
                return this
            }, r.prototype.emit = function(t) {
                this._callbacks = this._callbacks || {};
                var e = [].slice.call(arguments, 1),
                    n = this._callbacks[t];
                if (n) {
                    n = n.slice(0);
                    for (var r = 0, o = n.length; o > r; ++r) n[r].apply(this, e)
                }
                return this
            }, r.prototype.listeners = function(t) {
                return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
            }, r.prototype.hasListeners = function(t) {
                return !!this.listeners(t).length
            }
        }, {}],
        16: [function(t, e, n) {
            e.exports = function(t, e) {
                var n = function() {};
                n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
            }
        }, {}],
        17: [function(t, e, n) {
            function r() {
                return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
            }

            function o() {
                var t = arguments,
                    e = this.useColors;
                if (t[0] = (e ? "%c" : "") + this.namespace + (e ? " %c" : " ") + t[0] + (e ? "%c " : " ") + "+" + n.humanize(this.diff), !e) return t;
                var r = "color: " + this.color;
                t = [t[0], r, "color: inherit"].concat(Array.prototype.slice.call(t, 1));
                var o = 0,
                    i = 0;
                return t[0].replace(/%[a-z%]/g, function(t) {
                    "%%" !== t && (o++, "%c" === t && (i = o))
                }), t.splice(i, 0, r), t
            }

            function i() {
                return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function s(t) {
                try {
                    null == t ? n.storage.removeItem("debug") : n.storage.debug = t
                } catch (e) {}
            }

            function a() {
                var t;
                try {
                    t = n.storage.debug
                } catch (e) {}
                return t
            }

            function c() {
                try {
                    return window.localStorage
                } catch (t) {}
            }
            n = e.exports = t("./debug"), n.log = i, n.formatArgs = o, n.save = s, n.load = a, n.useColors = r, n.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : c(), n.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], n.formatters.j = function(t) {
                return JSON.stringify(t)
            }, n.enable(a())
        }, {
            "./debug": 18
        }],
        18: [function(t, e, n) {
            function r() {
                return n.colors[u++ % n.colors.length]
            }

            function o(t) {
                function e() {}

                function o() {
                    var t = o,
                        e = +new Date,
                        i = e - (p || e);
                    t.diff = i, t.prev = p, t.curr = e, p = e, null == t.useColors && (t.useColors = n.useColors()), null == t.color && t.useColors && (t.color = r());
                    var s = Array.prototype.slice.call(arguments);
                    s[0] = n.coerce(s[0]), "string" != typeof s[0] && (s = ["%o"].concat(s));
                    var a = 0;
                    s[0] = s[0].replace(/%([a-z%])/g, function(e, r) {
                        if ("%%" === e) return e;
                        a++;
                        var o = n.formatters[r];
                        if ("function" == typeof o) {
                            var i = s[a];
                            e = o.call(t, i), s.splice(a, 1), a--
                        }
                        return e
                    }), "function" == typeof n.formatArgs && (s = n.formatArgs.apply(t, s));
                    var c = o.log || n.log || console.log.bind(console);
                    c.apply(t, s)
                }
                e.enabled = !1, o.enabled = !0;
                var i = n.enabled(t) ? o : e;
                return i.namespace = t, i
            }

            function i(t) {
                n.save(t);
                for (var e = (t || "").split(/[\s,]+/), r = e.length, o = 0; r > o; o++) e[o] && (t = e[o].replace(/\*/g, ".*?"), "-" === t[0] ? n.skips.push(new RegExp("^" + t.substr(1) + "$")) : n.names.push(new RegExp("^" + t + "$")))
            }

            function s() {
                n.enable("")
            }

            function a(t) {
                var e, r;
                for (e = 0, r = n.skips.length; r > e; e++)
                    if (n.skips[e].test(t)) return !1;
                for (e = 0, r = n.names.length; r > e; e++)
                    if (n.names[e].test(t)) return !0;
                return !1
            }

            function c(t) {
                return t instanceof Error ? t.stack || t.message : t
            }
            n = e.exports = o, n.coerce = c, n.disable = s, n.enable = i, n.enabled = a, n.humanize = t("ms"), n.names = [], n.skips = [], n.formatters = {};
            var p, u = 0
        }, {
            ms: 25
        }],
        19: [function(t, e, n) {
            (function(e) {
                function r(t, e) {
                    var r = "b" + n.packets[t.type] + t.data.data;
                    return e(r)
                }

                function o(t, e, r) {
                    if (!e) return n.encodeBase64Packet(t, r);
                    var o = t.data,
                        i = new Uint8Array(o),
                        s = new Uint8Array(1 + o.byteLength);
                    s[0] = m[t.type];
                    for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
                    return r(s.buffer)
                }

                function i(t, e, r) {
                    if (!e) return n.encodeBase64Packet(t, r);
                    var o = new FileReader;
                    return o.onload = function() {
                        t.data = o.result, n.encodePacket(t, e, !0, r)
                    }, o.readAsArrayBuffer(t.data)
                }

                function s(t, e, r) {
                    if (!e) return n.encodeBase64Packet(t, r);
                    if (g) return i(t, e, r);
                    var o = new Uint8Array(1);
                    o[0] = m[t.type];
                    var s = new w([o.buffer, t.data]);
                    return r(s)
                }

                function a(t, e, n) {
                    for (var r = new Array(t.length), o = h(t.length, n), i = function(t, n, o) {
                        e(n, function(e, n) {
                            r[t] = n, o(e, r)
                        })
                    }, s = 0; s < t.length; s++) i(s, t[s], o)
                }
                var c = t("./keys"),
                    p = t("has-binary"),
                    u = t("arraybuffer.slice"),
                    f = t("base64-arraybuffer"),
                    h = t("after"),
                    l = t("utf8"),
                    d = navigator.userAgent.match(/Android/i),
                    y = /PhantomJS/i.test(navigator.userAgent),
                    g = d || y;
                n.protocol = 3;
                var m = n.packets = {
                        open: 0,
                        close: 1,
                        ping: 2,
                        pong: 3,
                        message: 4,
                        upgrade: 5,
                        noop: 6
                    },
                    b = c(m),
                    v = {
                        type: "error",
                        data: "parser error"
                    },
                    w = t("blob");
                n.encodePacket = function(t, n, i, a) {
                    "function" == typeof n && (a = n, n = !1), "function" == typeof i && (a = i, i = null);
                    var c = void 0 === t.data ? void 0 : t.data.buffer || t.data;
                    if (e.ArrayBuffer && c instanceof ArrayBuffer) return o(t, n, a);
                    if (w && c instanceof e.Blob) return s(t, n, a);
                    if (c && c.base64) return r(t, a);
                    var p = m[t.type];
                    return void 0 !== t.data && (p += i ? l.encode(String(t.data)) : String(t.data)), a("" + p)
                }, n.encodeBase64Packet = function(t, r) {
                    var o = "b" + n.packets[t.type];
                    if (w && t.data instanceof e.Blob) {
                        var i = new FileReader;
                        return i.onload = function() {
                            var t = i.result.split(",")[1];
                            r(o + t)
                        }, i.readAsDataURL(t.data)
                    }
                    var s;
                    try {
                        s = String.fromCharCode.apply(null, new Uint8Array(t.data))
                    } catch (a) {
                        for (var c = new Uint8Array(t.data), p = new Array(c.length), u = 0; u < c.length; u++) p[u] = c[u];
                        s = String.fromCharCode.apply(null, p)
                    }
                    return o += e.btoa(s), r(o)
                }, n.decodePacket = function(t, e, r) {
                    if ("string" == typeof t || void 0 === t) {
                        if ("b" == t.charAt(0)) return n.decodeBase64Packet(t.substr(1), e);
                        if (r) try {
                            t = l.decode(t)
                        } catch (o) {
                            return v
                        }
                        var i = t.charAt(0);
                        return Number(i) == i && b[i] ? t.length > 1 ? {
                            type: b[i],
                            data: t.substring(1)
                        } : {
                            type: b[i]
                        } : v
                    }
                    var s = new Uint8Array(t),
                        i = s[0],
                        a = u(t, 1);
                    return w && "blob" === e && (a = new w([a])), {
                        type: b[i],
                        data: a
                    }
                }, n.decodeBase64Packet = function(t, n) {
                    var r = b[t.charAt(0)];
                    if (!e.ArrayBuffer) return {
                        type: r,
                        data: {
                            base64: !0,
                            data: t.substr(1)
                        }
                    };
                    var o = f.decode(t.substr(1));
                    return "blob" === n && w && (o = new w([o])), {
                        type: r,
                        data: o
                    }
                }, n.encodePayload = function(t, e, r) {
                    function o(t) {
                        return t.length + ":" + t
                    }

                    function i(t, r) {
                        n.encodePacket(t, s ? e : !1, !0, function(t) {
                            r(null, o(t))
                        })
                    }
                    "function" == typeof e && (r = e, e = null);
                    var s = p(t);
                    return e && s ? w && !g ? n.encodePayloadAsBlob(t, r) : n.encodePayloadAsArrayBuffer(t, r) : t.length ? void a(t, i, function(t, e) {
                        return r(e.join(""))
                    }) : r("0:")
                }, n.decodePayload = function(t, e, r) {
                    if ("string" != typeof t) return n.decodePayloadAsBinary(t, e, r);
                    "function" == typeof e && (r = e, e = null);
                    var o;
                    if ("" == t) return r(v, 0, 1);
                    for (var i, s, a = "", c = 0, p = t.length; p > c; c++) {
                        var u = t.charAt(c);
                        if (":" != u) a += u;
                        else {
                            if ("" == a || a != (i = Number(a))) return r(v, 0, 1);
                            if (s = t.substr(c + 1, i), a != s.length) return r(v, 0, 1);
                            if (s.length) {
                                if (o = n.decodePacket(s, e, !0), v.type == o.type && v.data == o.data) return r(v, 0, 1);
                                var f = r(o, c + i, p);
                                if (!1 === f) return
                            }
                            c += i, a = ""
                        }
                    }
                    return "" != a ? r(v, 0, 1) : void 0
                }, n.encodePayloadAsArrayBuffer = function(t, e) {
                    function r(t, e) {
                        n.encodePacket(t, !0, !0, function(t) {
                            return e(null, t)
                        })
                    }
                    return t.length ? void a(t, r, function(t, n) {
                        var r = n.reduce(function(t, e) {
                                var n;
                                return n = "string" == typeof e ? e.length : e.byteLength, t + n.toString().length + n + 2
                            }, 0),
                            o = new Uint8Array(r),
                            i = 0;
                        return n.forEach(function(t) {
                            var e = "string" == typeof t,
                                n = t;
                            if (e) {
                                for (var r = new Uint8Array(t.length), s = 0; s < t.length; s++) r[s] = t.charCodeAt(s);
                                n = r.buffer
                            }
                            e ? o[i++] = 0 : o[i++] = 1;
                            for (var a = n.byteLength.toString(), s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                            o[i++] = 255;
                            for (var r = new Uint8Array(n), s = 0; s < r.length; s++) o[i++] = r[s]
                        }), e(o.buffer)
                    }) : e(new ArrayBuffer(0))
                }, n.encodePayloadAsBlob = function(t, e) {
                    function r(t, e) {
                        n.encodePacket(t, !0, !0, function(t) {
                            var n = new Uint8Array(1);
                            if (n[0] = 1, "string" == typeof t) {
                                for (var r = new Uint8Array(t.length), o = 0; o < t.length; o++) r[o] = t.charCodeAt(o);
                                t = r.buffer, n[0] = 0
                            }
                            for (var i = t instanceof ArrayBuffer ? t.byteLength : t.size, s = i.toString(), a = new Uint8Array(s.length + 1), o = 0; o < s.length; o++) a[o] = parseInt(s[o]);
                            if (a[s.length] = 255, w) {
                                var c = new w([n.buffer, a.buffer, t]);
                                e(null, c)
                            }
                        })
                    }
                    a(t, r, function(t, n) {
                        return e(new w(n))
                    })
                }, n.decodePayloadAsBinary = function(t, e, r) {
                    "function" == typeof e && (r = e, e = null);
                    for (var o = t, i = [], s = !1; o.byteLength > 0;) {
                        for (var a = new Uint8Array(o), c = 0 === a[0], p = "", f = 1; 255 != a[f]; f++) {
                            if (p.length > 310) {
                                s = !0;
                                break
                            }
                            p += a[f]
                        }
                        if (s) return r(v, 0, 1);
                        o = u(o, 2 + p.length), p = parseInt(p);
                        var h = u(o, 0, p);
                        if (c) try {
                            h = String.fromCharCode.apply(null, new Uint8Array(h))
                        } catch (l) {
                            var d = new Uint8Array(h);
                            h = "";
                            for (var f = 0; f < d.length; f++) h += String.fromCharCode(d[f])
                        }
                        i.push(h), o = u(o, p)
                    }
                    var y = i.length;
                    i.forEach(function(t, o) {
                        r(n.decodePacket(t, e, !0), o, y)
                    })
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {
            "./keys": 20,
            after: 11,
            "arraybuffer.slice": 12,
            "base64-arraybuffer": 13,
            blob: 14,
            "has-binary": 21,
            utf8: 29
        }],
        20: [function(t, e, n) {
            e.exports = Object.keys || function(t) {
                    var e = [],
                        n = Object.prototype.hasOwnProperty;
                    for (var r in t) n.call(t, r) && e.push(r);
                    return e
                }
        }, {}],
        21: [function(t, e, n) {
            (function(n) {
                function r(t) {
                    function e(t) {
                        if (!t) return !1;
                        if (n.Buffer && n.Buffer.isBuffer(t) || n.ArrayBuffer && t instanceof ArrayBuffer || n.Blob && t instanceof Blob || n.File && t instanceof File) return !0;
                        if (o(t)) {
                            for (var r = 0; r < t.length; r++)
                                if (e(t[r])) return !0
                        } else if (t && "object" == typeof t) {
                            t.toJSON && (t = t.toJSON());
                            for (var i in t)
                                if (Object.prototype.hasOwnProperty.call(t, i) && e(t[i])) return !0
                        }
                        return !1
                    }
                    return e(t)
                }
                var o = t("isarray");
                e.exports = r
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {
            isarray: 24
        }],
        22: [function(t, e, n) {
            try {
                e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
            } catch (r) {
                e.exports = !1
            }
        }, {}],
        23: [function(t, e, n) {
            var r = [].indexOf;
            e.exports = function(t, e) {
                if (r) return t.indexOf(e);
                for (var n = 0; n < t.length; ++n)
                    if (t[n] === e) return n;
                return -1
            }
        }, {}],
        24: [function(t, e, n) {
            e.exports = Array.isArray || function(t) {
                    return "[object Array]" == Object.prototype.toString.call(t)
                }
        }, {}],
        25: [function(t, e, n) {
            function r(t) {
                if (t = "" + t, !(t.length > 1e4)) {
                    var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
                    if (e) {
                        var n = parseFloat(e[1]),
                            r = (e[2] || "ms").toLowerCase();
                        switch (r) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return n * f;
                            case "days":
                            case "day":
                            case "d":
                                return n * u;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return n * p;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return n * c;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return n * a;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return n
                        }
                    }
                }
            }

            function o(t) {
                return t >= u ? Math.round(t / u) + "d" : t >= p ? Math.round(t / p) + "h" : t >= c ? Math.round(t / c) + "m" : t >= a ? Math.round(t / a) + "s" : t + "ms"
            }

            function i(t) {
                return s(t, u, "day") || s(t, p, "hour") || s(t, c, "minute") || s(t, a, "second") || t + " ms"
            }

            function s(t, e, n) {
                return e > t ? void 0 : 1.5 * e > t ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s"
            }
            var a = 1e3,
                c = 60 * a,
                p = 60 * c,
                u = 24 * p,
                f = 365.25 * u;
            e.exports = function(t, e) {
                return e = e || {}, "string" == typeof t ? r(t) : e["long"] ? i(t) : o(t)
            }
        }, {}],
        26: [function(t, e, n) {
            (function(t) {
                var n = /^[\],:{}\s]*$/,
                    r = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    i = /(?:^|:|,)(?:\s*\[)+/g,
                    s = /^\s+/,
                    a = /\s+$/;
                e.exports = function(e) {
                    return "string" == typeof e && e ? (e = e.replace(s, "").replace(a, ""), t.JSON && JSON.parse ? JSON.parse(e) : n.test(e.replace(r, "@").replace(o, "]").replace(i, "")) ? new Function("return " + e)() : void 0) : null
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {}],
        27: [function(t, e, n) {
            n.encode = function(t) {
                var e = "";
                for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
                return e
            }, n.decode = function(t) {
                for (var e = {}, n = t.split("&"), r = 0, o = n.length; o > r; r++) {
                    var i = n[r].split("=");
                    e[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
                }
                return e
            }
        }, {}],
        28: [function(t, e, n) {
            var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            e.exports = function(t) {
                var e = t,
                    n = t.indexOf("["),
                    i = t.indexOf("]"); - 1 != n && -1 != i && (t = t.substring(0, n) + t.substring(n, i).replace(/:/g, ";") + t.substring(i, t.length));
                for (var s = r.exec(t || ""), a = {}, c = 14; c--;) a[o[c]] = s[c] || "";
                return -1 != n && -1 != i && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a
            }
        }, {}],
        29: [function(e, n, r) {
            (function(e) {
                ! function(o) {
                    function i(t) {
                        for (var e, n, r = [], o = 0, i = t.length; i > o;) e = t.charCodeAt(o++), e >= 55296 && 56319 >= e && i > o ? (n = t.charCodeAt(o++), 56320 == (64512 & n) ? r.push(((1023 & e) << 10) + (1023 & n) + 65536) : (r.push(e), o--)) : r.push(e);
                        return r
                    }

                    function s(t) {
                        for (var e, n = t.length, r = -1, o = ""; ++r < n;) e = t[r], e > 65535 && (e -= 65536, o += w(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), o += w(e);
                        return o
                    }

                    function a(t) {
                        if (t >= 55296 && 57343 >= t) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value")
                    }

                    function c(t, e) {
                        return w(t >> e & 63 | 128)
                    }

                    function p(t) {
                        if (0 == (4294967168 & t)) return w(t);
                        var e = "";
                        return 0 == (4294965248 & t) ? e = w(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (a(t), e = w(t >> 12 & 15 | 224), e += c(t, 6)) : 0 == (4292870144 & t) && (e = w(t >> 18 & 7 | 240), e += c(t, 12), e += c(t, 6)), e += w(63 & t | 128)
                    }

                    function u(t) {
                        for (var e, n = i(t), r = n.length, o = -1, s = ""; ++o < r;) e = n[o], s += p(e);
                        return s
                    }

                    function f() {
                        if (v >= b) throw Error("Invalid byte index");
                        var t = 255 & m[v];
                        if (v++, 128 == (192 & t)) return 63 & t;
                        throw Error("Invalid continuation byte")
                    }

                    function h() {
                        var t, e, n, r, o;
                        if (v > b) throw Error("Invalid byte index");
                        if (v == b) return !1;
                        if (t = 255 & m[v], v++, 0 == (128 & t)) return t;
                        if (192 == (224 & t)) {
                            var e = f();
                            if (o = (31 & t) << 6 | e, o >= 128) return o;
                            throw Error("Invalid continuation byte")
                        }
                        if (224 == (240 & t)) {
                            if (e = f(), n = f(), o = (15 & t) << 12 | e << 6 | n, o >= 2048) return a(o), o;
                            throw Error("Invalid continuation byte")
                        }
                        if (240 == (248 & t) && (e = f(), n = f(), r = f(), o = (15 & t) << 18 | e << 12 | n << 6 | r, o >= 65536 && 1114111 >= o)) return o;
                        throw Error("Invalid UTF-8 detected")
                    }

                    function l(t) {
                        m = i(t), b = m.length, v = 0;
                        for (var e, n = [];
                             (e = h()) !== !1;) n.push(e);
                        return s(n)
                    }
                    var d = "object" == typeof r && r,
                        y = "object" == typeof n && n && n.exports == d && n,
                        g = "object" == typeof e && e;
                    (g.global === g || g.window === g) && (o = g);
                    var m, b, v, w = String.fromCharCode,
                        k = {
                            version: "2.0.0",
                            encode: u,
                            decode: l
                        };
                    if ("function" == typeof t && "object" == typeof t.amd && t.amd) t(function() {
                        return k
                    });
                    else if (d && !d.nodeType)
                        if (y) y.exports = k;
                        else {
                            var x = {},
                                A = x.hasOwnProperty;
                            for (var B in k) A.call(k, B) && (d[B] = k[B])
                        } else o.utf8 = k
                }(this)
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {}],
        30: [function(t, e, n) {
            "use strict";

            function r(t) {
                var e = "";
                do e = a[t % c] + e, t = Math.floor(t / c); while (t > 0);
                return e
            }

            function o(t) {
                var e = 0;
                for (f = 0; f < t.length; f++) e = e * c + p[t.charAt(f)];
                return e
            }

            function i() {
                var t = r(+new Date);
                return t !== s ? (u = 0, s = t) : t + "." + r(u++)
            }
            for (var s, a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), c = 64, p = {}, u = 0, f = 0; c > f; f++) p[a[f]] = f;
            i.encode = r, i.decode = o, e.exports = i
        }, {}],
        31: [function(t, e, n) {
            function r(t, e) {
                "object" == typeof t && (e = t, t = void 0), e = e || {};
                var n, r = o(t),
                    i = r.source,
                    p = r.id,
                    u = r.path,
                    f = c[p] && u in c[p].nsps,
                    h = e.forceNew || e["force new connection"] || !1 === e.multiplex || f;
                return h ? (a("ignoring socket cache for %s", i), n = s(i, e)) : (c[p] || (a("new io instance for %s", i), c[p] = s(i, e)), n = c[p]), n.socket(r.path)
            }
            var o = t("./url"),
                i = t("socket.io-parser"),
                s = t("./manager"),
                a = t("debug")("socket.io-client");
            e.exports = n = r;
            var c = n.managers = {};
            n.protocol = i.protocol, n.connect = r, n.Manager = t("./manager"), n.Socket = t("./socket")
        }, {
            "./manager": 32,
            "./socket": 34,
            "./url": 35,
            debug: 39,
            "socket.io-parser": 47
        }],
        32: [function(t, e, n) {
            function r(t, e) {
                return this instanceof r ? (t && "object" == typeof t && (e = t, t = void 0), e = e || {}, e.path = e.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(e.reconnection !== !1), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(e.randomizationFactor || .5), this.backoff = new h({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }), this.timeout(null == e.timeout ? 2e4 : e.timeout), this.readyState = "closed", this.uri = t, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [], this.encoder = new a.Encoder, this.decoder = new a.Decoder, this.autoConnect = e.autoConnect !== !1, void(this.autoConnect && this.open())) : new r(t, e)
            }
            var o = t("engine.io-client"),
                i = t("./socket"),
                s = t("component-emitter"),
                a = t("socket.io-parser"),
                c = t("./on"),
                p = t("component-bind"),
                u = t("debug")("socket.io-client:manager"),
                f = t("indexof"),
                h = t("backo2"),
                l = Object.prototype.hasOwnProperty;
            e.exports = r, r.prototype.emitAll = function() {
                this.emit.apply(this, arguments);
                for (var t in this.nsps) l.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments)
            }, r.prototype.updateSocketIds = function() {
                for (var t in this.nsps) l.call(this.nsps, t) && (this.nsps[t].id = this.engine.id)
            }, s(r.prototype), r.prototype.reconnection = function(t) {
                return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
            }, r.prototype.reconnectionAttempts = function(t) {
                return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts
            }, r.prototype.reconnectionDelay = function(t) {
                return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay
            }, r.prototype.randomizationFactor = function(t) {
                return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) : this._randomizationFactor
            }, r.prototype.reconnectionDelayMax = function(t) {
                return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this._reconnectionDelayMax
            }, r.prototype.timeout = function(t) {
                return arguments.length ? (this._timeout = t, this) : this._timeout
            }, r.prototype.maybeReconnectOnOpen = function() {
                !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
            }, r.prototype.open = r.prototype.connect = function(t) {
                if (u("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
                u("opening %s", this.uri), this.engine = o(this.uri, this.opts);
                var e = this.engine,
                    n = this;
                this.readyState = "opening", this.skipReconnect = !1;
                var r = c(e, "open", function() {
                        n.onopen(), t && t()
                    }),
                    i = c(e, "error", function(e) {
                        if (u("connect_error"), n.cleanup(), n.readyState = "closed", n.emitAll("connect_error", e), t) {
                            var r = new Error("Connection error");
                            r.data = e, t(r)
                        } else n.maybeReconnectOnOpen()
                    });
                if (!1 !== this._timeout) {
                    var s = this._timeout;
                    u("connect attempt will timeout after %d", s);
                    var a = setTimeout(function() {
                        u("connect attempt timed out after %d", s), r.destroy(), e.close(), e.emit("error", "timeout"), n.emitAll("connect_timeout", s)
                    }, s);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(a)
                        }
                    })
                }
                return this.subs.push(r), this.subs.push(i), this
            }, r.prototype.onopen = function() {
                u("open"), this.cleanup(), this.readyState = "open", this.emit("open");
                var t = this.engine;
                this.subs.push(c(t, "data", p(this, "ondata"))), this.subs.push(c(t, "ping", p(this, "onping"))), this.subs.push(c(t, "pong", p(this, "onpong"))), this.subs.push(c(t, "error", p(this, "onerror"))), this.subs.push(c(t, "close", p(this, "onclose"))), this.subs.push(c(this.decoder, "decoded", p(this, "ondecoded")))
            }, r.prototype.onping = function() {
                this.lastPing = new Date, this.emitAll("ping")
            }, r.prototype.onpong = function() {
                this.emitAll("pong", new Date - this.lastPing)
            }, r.prototype.ondata = function(t) {
                this.decoder.add(t)
            }, r.prototype.ondecoded = function(t) {
                this.emit("packet", t)
            }, r.prototype.onerror = function(t) {
                u("error", t), this.emitAll("error", t)
            }, r.prototype.socket = function(t) {
                function e() {
                    ~f(r.connecting, n) || r.connecting.push(n)
                }
                var n = this.nsps[t];
                if (!n) {
                    n = new i(this, t), this.nsps[t] = n;
                    var r = this;
                    n.on("connecting", e), n.on("connect", function() {
                        n.id = r.engine.id
                    }), this.autoConnect && e()
                }
                return n
            }, r.prototype.destroy = function(t) {
                var e = f(this.connecting, t);
                ~e && this.connecting.splice(e, 1), this.connecting.length || this.close()
            }, r.prototype.packet = function(t) {
                u("writing packet %j", t);
                var e = this;
                e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0, this.encoder.encode(t, function(n) {
                    for (var r = 0; r < n.length; r++) e.engine.write(n[r], t.options);
                    e.encoding = !1, e.processPacketQueue()
                }))
            }, r.prototype.processPacketQueue = function() {
                if (this.packetBuffer.length > 0 && !this.encoding) {
                    var t = this.packetBuffer.shift();
                    this.packet(t)
                }
            }, r.prototype.cleanup = function() {
                u("cleanup");
                for (var t; t = this.subs.shift();) t.destroy();
                this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy()
            }, r.prototype.close = r.prototype.disconnect = function() {
                u("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" == this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
            }, r.prototype.onclose = function(t) {
                u("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect()
            }, r.prototype.reconnect = function() {
                if (this.reconnecting || this.skipReconnect) return this;
                var t = this;
                if (this.backoff.attempts >= this._reconnectionAttempts) u("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
                else {
                    var e = this.backoff.duration();
                    u("will wait %dms before reconnect attempt", e), this.reconnecting = !0;
                    var n = setTimeout(function() {
                        t.skipReconnect || (u("attempting reconnect"), t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll("reconnecting", t.backoff.attempts), t.skipReconnect || t.open(function(e) {
                            e ? (u("reconnect attempt error"), t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) : (u("reconnect success"), t.onreconnect())
                        }))
                    }, e);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(n)
                        }
                    })
                }
            }, r.prototype.onreconnect = function() {
                var t = this.backoff.attempts;
                this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t)
            }
        }, {
            "./on": 33,
            "./socket": 34,
            backo2: 36,
            "component-bind": 37,
            "component-emitter": 38,
            debug: 39,
            "engine.io-client": 1,
            indexof: 42,
            "socket.io-parser": 47
        }],
        33: [function(t, e, n) {
            function r(t, e, n) {
                return t.on(e, n), {
                    destroy: function() {
                        t.removeListener(e, n)
                    }
                }
            }
            e.exports = r
        }, {}],
        34: [function(t, e, n) {
            function r(t, e) {
                this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.io.autoConnect && this.open()
            }
            var o = t("socket.io-parser"),
                i = t("component-emitter"),
                s = t("to-array"),
                a = t("./on"),
                c = t("component-bind"),
                p = t("debug")("socket.io-client:socket"),
                u = t("has-binary");
            e.exports = n = r;
            var f = {
                    connect: 1,
                    connect_error: 1,
                    connect_timeout: 1,
                    connecting: 1,
                    disconnect: 1,
                    error: 1,
                    reconnect: 1,
                    reconnect_attempt: 1,
                    reconnect_failed: 1,
                    reconnect_error: 1,
                    reconnecting: 1,
                    ping: 1,
                    pong: 1
                },
                h = i.prototype.emit;
            i(r.prototype), r.prototype.subEvents = function() {
                if (!this.subs) {
                    var t = this.io;
                    this.subs = [a(t, "open", c(this, "onopen")), a(t, "packet", c(this, "onpacket")), a(t, "close", c(this, "onclose"))]
                }
            }, r.prototype.open = r.prototype.connect = function() {
                return this.connected ? this : (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen(), this.emit("connecting"), this)
            }, r.prototype.send = function() {
                var t = s(arguments);
                return t.unshift("message"), this.emit.apply(this, t), this
            }, r.prototype.emit = function(t) {
                if (f.hasOwnProperty(t)) return h.apply(this, arguments), this;
                var e = s(arguments),
                    n = o.EVENT;
                u(e) && (n = o.BINARY_EVENT);
                var r = {
                    type: n,
                    data: e
                };
                return r.options = {}, r.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (p("emitting packet with ack id %d", this.ids), this.acks[this.ids] = e.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), delete this.flags, this
            }, r.prototype.packet = function(t) {
                t.nsp = this.nsp, this.io.packet(t)
            }, r.prototype.onopen = function() {
                p("transport is open - connecting"), "/" != this.nsp && this.packet({
                    type: o.CONNECT
                })
            }, r.prototype.onclose = function(t) {
                p("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t)
            }, r.prototype.onpacket = function(t) {
                if (t.nsp == this.nsp) switch (t.type) {
                    case o.CONNECT:
                        this.onconnect();
                        break;
                    case o.EVENT:
                        this.onevent(t);
                        break;
                    case o.BINARY_EVENT:
                        this.onevent(t);
                        break;
                    case o.ACK:
                        this.onack(t);
                        break;
                    case o.BINARY_ACK:
                        this.onack(t);
                        break;
                    case o.DISCONNECT:
                        this.ondisconnect();
                        break;
                    case o.ERROR:
                        this.emit("error", t.data)
                }
            }, r.prototype.onevent = function(t) {
                var e = t.data || [];
                p("emitting event %j", e), null != t.id && (p("attaching ack callback to event"), e.push(this.ack(t.id))), this.connected ? h.apply(this, e) : this.receiveBuffer.push(e)
            }, r.prototype.ack = function(t) {
                var e = this,
                    n = !1;
                return function() {
                    if (!n) {
                        n = !0;
                        var r = s(arguments);
                        p("sending ack %j", r);
                        var i = u(r) ? o.BINARY_ACK : o.ACK;
                        e.packet({
                            type: i,
                            id: t,
                            data: r
                        })
                    }
                }
            }, r.prototype.onack = function(t) {
                var e = this.acks[t.id];
                "function" == typeof e ? (p("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), delete this.acks[t.id]) : p("bad ack %s", t.id)
            }, r.prototype.onconnect = function() {
                this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
            }, r.prototype.emitBuffered = function() {
                var t;
                for (t = 0; t < this.receiveBuffer.length; t++) h.apply(this, this.receiveBuffer[t]);
                for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
                this.sendBuffer = []
            }, r.prototype.ondisconnect = function() {
                p("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
            }, r.prototype.destroy = function() {
                if (this.subs) {
                    for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
                    this.subs = null
                }
                this.io.destroy(this)
            }, r.prototype.close = r.prototype.disconnect = function() {
                return this.connected && (p("performing disconnect (%s)", this.nsp), this.packet({
                    type: o.DISCONNECT
                })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
            }, r.prototype.compress = function(t) {
                return this.flags = this.flags || {}, this.flags.compress = t, this
            }
        }, {
            "./on": 33,
            "component-bind": 37,
            "component-emitter": 38,
            debug: 39,
            "has-binary": 41,
            "socket.io-parser": 47,
            "to-array": 51
        }],
        35: [function(t, e, n) {
            (function(n) {
                function r(t, e) {
                    var r = t,
                        e = e || n.location;
                    null == t && (t = e.protocol + "//" + e.host), "string" == typeof t && ("/" == t.charAt(0) && (t = "/" == t.charAt(1) ? e.protocol + t : e.host + t), /^(https?|wss?):\/\//.test(t) || (i("protocol-less url %s", t), t = "undefined" != typeof e ? e.protocol + "//" + t : "https://" + t), i("parse %s", t), r = o(t)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
                    var s = -1 !== r.host.indexOf(":"),
                        a = s ? "[" + r.host + "]" : r.host;
                    return r.id = r.protocol + "://" + a + ":" + r.port, r.href = r.protocol + "://" + a + (e && e.port == r.port ? "" : ":" + r.port), r
                }
                var o = t("parseuri"),
                    i = t("debug")("socket.io-client:url");
                e.exports = r
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {
            debug: 39,
            parseuri: 45
        }],
        36: [function(t, e, n) {
            function r(t) {
                t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
            }
            e.exports = r, r.prototype.duration = function() {
                var t = this.ms * Math.pow(this.factor, this.attempts++);
                if (this.jitter) {
                    var e = Math.random(),
                        n = Math.floor(e * this.jitter * t);
                    t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n
                }
                return 0 | Math.min(t, this.max)
            }, r.prototype.reset = function() {
                this.attempts = 0
            }, r.prototype.setMin = function(t) {
                this.ms = t
            }, r.prototype.setMax = function(t) {
                this.max = t
            }, r.prototype.setJitter = function(t) {
                this.jitter = t
            }
        }, {}],
        37: [function(t, e, n) {
            var r = [].slice;
            e.exports = function(t, e) {
                if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");
                var n = r.call(arguments, 2);
                return function() {
                    return e.apply(t, n.concat(r.call(arguments)))
                }
            }
        }, {}],
        38: [function(t, e, n) {
            function r(t) {
                return t ? o(t) : void 0
            }

            function o(t) {
                for (var e in r.prototype) t[e] = r.prototype[e];
                return t
            }
            e.exports = r, r.prototype.on = r.prototype.addEventListener = function(t, e) {
                return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
            }, r.prototype.once = function(t, e) {
                function n() {
                    this.off(t, n), e.apply(this, arguments)
                }
                return n.fn = e, this.on(t, n), this
            }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(t, e) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var n = this._callbacks["$" + t];
                if (!n) return this;
                if (1 == arguments.length) return delete this._callbacks["$" + t], this;
                for (var r, o = 0; o < n.length; o++)
                    if (r = n[o], r === e || r.fn === e) {
                        n.splice(o, 1);
                        break
                    }
                return this
            }, r.prototype.emit = function(t) {
                this._callbacks = this._callbacks || {};
                var e = [].slice.call(arguments, 1),
                    n = this._callbacks["$" + t];
                if (n) {
                    n = n.slice(0);
                    for (var r = 0, o = n.length; o > r; ++r) n[r].apply(this, e)
                }
                return this
            }, r.prototype.listeners = function(t) {
                return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
            }, r.prototype.hasListeners = function(t) {
                return !!this.listeners(t).length
            }
        }, {}],
        39: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            "./debug": 40,
            dup: 17
        }],
        40: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18,
            ms: 44
        }],
        41: [function(t, e, n) {
            (function(n) {
                function r(t) {
                    function e(t) {
                        if (!t) return !1;
                        if (n.Buffer && n.Buffer.isBuffer && n.Buffer.isBuffer(t) || n.ArrayBuffer && t instanceof ArrayBuffer || n.Blob && t instanceof Blob || n.File && t instanceof File) return !0;
                        if (o(t)) {
                            for (var r = 0; r < t.length; r++)
                                if (e(t[r])) return !0
                        } else if (t && "object" == typeof t) {
                            t.toJSON && "function" == typeof t.toJSON && (t = t.toJSON());
                            for (var i in t)
                                if (Object.prototype.hasOwnProperty.call(t, i) && e(t[i])) return !0
                        }
                        return !1
                    }
                    return e(t)
                }
                var o = t("isarray");
                e.exports = r
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {
            isarray: 43
        }],
        42: [function(t, e, n) {
            arguments[4][23][0].apply(n, arguments)
        }, {
            dup: 23
        }],
        43: [function(t, e, n) {
            arguments[4][24][0].apply(n, arguments)
        }, {
            dup: 24
        }],
        44: [function(t, e, n) {
            arguments[4][25][0].apply(n, arguments)
        }, {
            dup: 25
        }],
        45: [function(t, e, n) {
            arguments[4][28][0].apply(n, arguments)
        }, {
            dup: 28
        }],
        46: [function(t, e, n) {
            (function(e) {
                var r = t("isarray"),
                    o = t("./is-buffer");
                n.deconstructPacket = function(t) {
                    function e(t) {
                        if (!t) return t;
                        if (o(t)) {
                            var i = {
                                _placeholder: !0,
                                num: n.length
                            };
                            return n.push(t), i
                        }
                        if (r(t)) {
                            for (var s = new Array(t.length), a = 0; a < t.length; a++) s[a] = e(t[a]);
                            return s
                        }
                        if ("object" == typeof t && !(t instanceof Date)) {
                            var s = {};
                            for (var c in t) s[c] = e(t[c]);
                            return s
                        }
                        return t
                    }
                    var n = [],
                        i = t.data,
                        s = t;
                    return s.data = e(i), s.attachments = n.length, {
                        packet: s,
                        buffers: n
                    }
                }, n.reconstructPacket = function(t, e) {
                    function n(t) {
                        if (t && t._placeholder) {
                            var o = e[t.num];
                            return o
                        }
                        if (r(t)) {
                            for (var i = 0; i < t.length; i++) t[i] = n(t[i]);
                            return t
                        }
                        if (t && "object" == typeof t) {
                            for (var s in t) t[s] = n(t[s]);
                            return t
                        }
                        return t
                    }
                    return t.data = n(t.data), t.attachments = void 0, t
                }, n.removeBlobs = function(t, n) {
                    function i(t, c, p) {
                        if (!t) return t;
                        if (e.Blob && t instanceof Blob || e.File && t instanceof File) {
                            s++;
                            var u = new FileReader;
                            u.onload = function() {
                                p ? p[c] = this.result : a = this.result, --s || n(a)
                            }, u.readAsArrayBuffer(t)
                        } else if (r(t))
                            for (var f = 0; f < t.length; f++) i(t[f], f, t);
                        else if (t && "object" == typeof t && !o(t))
                            for (var h in t) i(t[h], h, t)
                    }
                    var s = 0,
                        a = t;
                    i(a), s || n(a)
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {
            "./is-buffer": 48,
            isarray: 43
        }],
        47: [function(t, e, n) {
            function r() {}

            function o(t) {
                var e = "",
                    r = !1;
                return e += t.type, (n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type) && (e += t.attachments, e += "-"), t.nsp && "/" != t.nsp && (r = !0, e += t.nsp), null != t.id && (r && (e += ",", r = !1), e += t.id), null != t.data && (r && (e += ","), e += f.stringify(t.data)), u("encoded %j as %s", t, e), e
            }

            function i(t, e) {
                function n(t) {
                    var n = l.deconstructPacket(t),
                        r = o(n.packet),
                        i = n.buffers;
                    i.unshift(r), e(i)
                }
                l.removeBlobs(t, n)
            }

            function s() {
                this.reconstructor = null
            }

            function a(t) {
                var e = {},
                    r = 0;
                if (e.type = Number(t.charAt(0)), null == n.types[e.type]) return p();
                if (n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type) {
                    for (var o = "";
                         "-" != t.charAt(++r) && (o += t.charAt(r), r != t.length););
                    if (o != Number(o) || "-" != t.charAt(r)) throw new Error("Illegal attachments");
                    e.attachments = Number(o)
                }
                if ("/" == t.charAt(r + 1))
                    for (e.nsp = ""; ++r;) {
                        var i = t.charAt(r);
                        if ("," == i) break;
                        if (e.nsp += i, r == t.length) break
                    } else e.nsp = "/";
                var s = t.charAt(r + 1);
                if ("" !== s && Number(s) == s) {
                    for (e.id = ""; ++r;) {
                        var i = t.charAt(r);
                        if (null == i || Number(i) != i) {
                            --r;
                            break
                        }
                        if (e.id += t.charAt(r), r == t.length) break
                    }
                    e.id = Number(e.id)
                }
                if (t.charAt(++r)) try {
                    e.data = f.parse(t.substr(r))
                } catch (a) {
                    return p()
                }
                return u("decoded %s as %j", t, e), e
            }

            function c(t) {
                this.reconPack = t, this.buffers = []
            }

            function p(t) {
                return {
                    type: n.ERROR,
                    data: "parser error"
                }
            }
            var u = t("debug")("socket.io-parser"),
                f = t("json3"),
                h = (t("isarray"), t("component-emitter")),
                l = t("./binary"),
                d = t("./is-buffer");
            n.protocol = 4, n.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"], n.CONNECT = 0, n.DISCONNECT = 1, n.EVENT = 2, n.ACK = 3, n.ERROR = 4, n.BINARY_EVENT = 5, n.BINARY_ACK = 6, n.Encoder = r, n.Decoder = s, r.prototype.encode = function(t, e) {
                if (u("encoding packet %j", t), n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type) i(t, e);
                else {
                    var r = o(t);
                    e([r])
                }
            }, h(s.prototype), s.prototype.add = function(t) {
                var e;
                if ("string" == typeof t) e = a(t), n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type ? (this.reconstructor = new c(e), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", e)) : this.emit("decoded", e);
                else {
                    if (!d(t) && !t.base64) throw new Error("Unknown type: " + t);
                    if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                    e = this.reconstructor.takeBinaryData(t), e && (this.reconstructor = null, this.emit("decoded", e))
                }
            }, s.prototype.destroy = function() {
                this.reconstructor && this.reconstructor.finishedReconstruction()
            }, c.prototype.takeBinaryData = function(t) {
                if (this.buffers.push(t), this.buffers.length == this.reconPack.attachments) {
                    var e = l.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(), e
                }
                return null
            }, c.prototype.finishedReconstruction = function() {
                this.reconPack = null, this.buffers = []
            }
        }, {
            "./binary": 46,
            "./is-buffer": 48,
            "component-emitter": 49,
            debug: 39,
            isarray: 43,
            json3: 50
        }],
        48: [function(t, e, n) {
            (function(t) {
                function n(e) {
                    return t.Buffer && t.Buffer.isBuffer(e) || t.ArrayBuffer && e instanceof ArrayBuffer
                }
                e.exports = n
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {}],
        49: [function(t, e, n) {
            arguments[4][15][0].apply(n, arguments)
        }, {
            dup: 15
        }],
        50: [function(e, n, r) {
            (function(e) {
                (function() {
                    function o(t, e) {
                        function n(t) {
                            if (n[t] !== g) return n[t];
                            var o;
                            if ("bug-string-char-index" == t) o = "a" != "a" [0];
                            else if ("json" == t) o = n("json-stringify") && n("json-parse");
                            else {
                                var s, a = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                                if ("json-stringify" == t) {
                                    var c = e.stringify,
                                        u = "function" == typeof c && v;
                                    if (u) {
                                        (s = function() {
                                            return 1
                                        }).toJSON = s;
                                        try {
                                            u = "0" === c(0) && "0" === c(new r) && '""' == c(new i) && c(b) === g && c(g) === g && c() === g && "1" === c(s) && "[1]" == c([s]) && "[null]" == c([g]) && "null" == c(null) && "[null,null,null]" == c([g, b, null]) && c({
                                                    a: [s, !0, !1, null, "\x00\b\n\f\r	"]
                                                }) == a && "1" === c(null, s) && "[\n 1,\n 2\n]" == c([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == c(new p(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == c(new p(864e13)) && '"-000001-01-01T00:00:00.000Z"' == c(new p(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == c(new p(-1))
                                        } catch (f) {
                                            u = !1
                                        }
                                    }
                                    o = u
                                }
                                if ("json-parse" == t) {
                                    var h = e.parse;
                                    if ("function" == typeof h) try {
                                        if (0 === h("0") && !h(!1)) {
                                            s = h(a);
                                            var l = 5 == s.a.length && 1 === s.a[0];
                                            if (l) {
                                                try {
                                                    l = !h('"	"')
                                                } catch (f) {}
                                                if (l) try {
                                                    l = 1 !== h("01")
                                                } catch (f) {}
                                                if (l) try {
                                                    l = 1 !== h("1.")
                                                } catch (f) {}
                                            }
                                        }
                                    } catch (f) {
                                        l = !1
                                    }
                                    o = l
                                }
                            }
                            return n[t] = !!o
                        }
                        t || (t = c.Object()), e || (e = c.Object());
                        var r = t.Number || c.Number,
                            i = t.String || c.String,
                            a = t.Object || c.Object,
                            p = t.Date || c.Date,
                            u = t.SyntaxError || c.SyntaxError,
                            f = t.TypeError || c.TypeError,
                            h = t.Math || c.Math,
                            l = t.JSON || c.JSON;
                        "object" == typeof l && l && (e.stringify = l.stringify, e.parse = l.parse);
                        var d, y, g, m = a.prototype,
                            b = m.toString,
                            v = new p(-0xc782b5b800cec);
                        try {
                            v = -109252 == v.getUTCFullYear() && 0 === v.getUTCMonth() && 1 === v.getUTCDate() && 10 == v.getUTCHours() && 37 == v.getUTCMinutes() && 6 == v.getUTCSeconds() && 708 == v.getUTCMilliseconds()
                        } catch (w) {}
                        if (!n("json")) {
                            var k = "[object Function]",
                                x = "[object Date]",
                                A = "[object Number]",
                                B = "[object String]",
                                C = "[object Array]",
                                S = "[object Boolean]",
                                E = n("bug-string-char-index");
                            if (!v) var _ = h.floor,
                                T = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                                O = function(t, e) {
                                    return T[e] + 365 * (t - 1970) + _((t - 1969 + (e = +(e > 1))) / 4) - _((t - 1901 + e) / 100) + _((t - 1601 + e) / 400)
                                };
                            if ((d = m.hasOwnProperty) || (d = function(t) {
                                    var e, n = {};
                                    return (n.__proto__ = null, n.__proto__ = {
                                        toString: 1
                                    }, n).toString != b ? d = function(t) {
                                        var e = this.__proto__,
                                            n = t in (this.__proto__ = null, this);
                                        return this.__proto__ = e, n
                                    } : (e = n.constructor, d = function(t) {
                                        var n = (this.constructor || e).prototype;
                                        return t in this && !(t in n && this[t] === n[t])
                                    }), n = null, d.call(this, t)
                                }), y = function(t, e) {
                                    var n, r, o, i = 0;
                                    (n = function() {
                                        this.valueOf = 0
                                    }).prototype.valueOf = 0, r = new n;
                                    for (o in r) d.call(r, o) && i++;
                                    return n = r = null, i ? y = 2 == i ? function(t, e) {
                                        var n, r = {},
                                            o = b.call(t) == k;
                                        for (n in t) o && "prototype" == n || d.call(r, n) || !(r[n] = 1) || !d.call(t, n) || e(n)
                                    } : function(t, e) {
                                        var n, r, o = b.call(t) == k;
                                        for (n in t) o && "prototype" == n || !d.call(t, n) || (r = "constructor" === n) || e(n);
                                        (r || d.call(t, n = "constructor")) && e(n)
                                    } : (r = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], y = function(t, e) {
                                        var n, o, i = b.call(t) == k,
                                            a = !i && "function" != typeof t.constructor && s[typeof t.hasOwnProperty] && t.hasOwnProperty || d;
                                        for (n in t) i && "prototype" == n || !a.call(t, n) || e(n);
                                        for (o = r.length; n = r[--o]; a.call(t, n) && e(n));
                                    }), y(t, e)
                                }, !n("json-stringify")) {
                                var j = {
                                        92: "\\\\",
                                        34: '\\"',
                                        8: "\\b",
                                        12: "\\f",
                                        10: "\\n",
                                        13: "\\r",
                                        9: "\\t"
                                    },
                                    P = "000000",
                                    N = function(t, e) {
                                        return (P + (e || 0)).slice(-t)
                                    },
                                    R = "\\u00",
                                    D = function(t) {
                                        for (var e = '"', n = 0, r = t.length, o = !E || r > 10, i = o && (E ? t.split("") : t); r > n; n++) {
                                            var s = t.charCodeAt(n);
                                            switch (s) {
                                                case 8:
                                                case 9:
                                                case 10:
                                                case 12:
                                                case 13:
                                                case 34:
                                                case 92:
                                                    e += j[s];
                                                    break;
                                                default:
                                                    if (32 > s) {
                                                        e += R + N(2, s.toString(16));
                                                        break
                                                    }
                                                    e += o ? i[n] : t.charAt(n)
                                            }
                                        }
                                        return e + '"'
                                    },
                                    U = function(t, e, n, r, o, i, s) {
                                        var a, c, p, u, h, l, m, v, w, k, E, T, j, P, R, q;
                                        try {
                                            a = e[t]
                                        } catch (L) {}
                                        if ("object" == typeof a && a)
                                            if (c = b.call(a), c != x || d.call(a, "toJSON")) "function" == typeof a.toJSON && (c != A && c != B && c != C || d.call(a, "toJSON")) && (a = a.toJSON(t));
                                            else if (a > -1 / 0 && 1 / 0 > a) {
                                                if (O) {
                                                    for (h = _(a / 864e5), p = _(h / 365.2425) + 1970 - 1; O(p + 1, 0) <= h; p++);
                                                    for (u = _((h - O(p, 0)) / 30.42); O(p, u + 1) <= h; u++);
                                                    h = 1 + h - O(p, u), l = (a % 864e5 + 864e5) % 864e5, m = _(l / 36e5) % 24, v = _(l / 6e4) % 60, w = _(l / 1e3) % 60, k = l % 1e3
                                                } else p = a.getUTCFullYear(), u = a.getUTCMonth(), h = a.getUTCDate(), m = a.getUTCHours(), v = a.getUTCMinutes(), w = a.getUTCSeconds(), k = a.getUTCMilliseconds();
                                                a = (0 >= p || p >= 1e4 ? (0 > p ? "-" : "+") + N(6, 0 > p ? -p : p) : N(4, p)) + "-" + N(2, u + 1) + "-" + N(2, h) + "T" + N(2, m) + ":" + N(2, v) + ":" + N(2, w) + "." + N(3, k) + "Z"
                                            } else a = null;
                                        if (n && (a = n.call(e, t, a)), null === a) return "null";
                                        if (c = b.call(a), c == S) return "" + a;
                                        if (c == A) return a > -1 / 0 && 1 / 0 > a ? "" + a : "null";
                                        if (c == B) return D("" + a);
                                        if ("object" == typeof a) {
                                            for (P = s.length; P--;)
                                                if (s[P] === a) throw f();
                                            if (s.push(a), E = [], R = i, i += o, c == C) {
                                                for (j = 0, P = a.length; P > j; j++) T = U(j, a, n, r, o, i, s), E.push(T === g ? "null" : T);
                                                q = E.length ? o ? "[\n" + i + E.join(",\n" + i) + "\n" + R + "]" : "[" + E.join(",") + "]" : "[]"
                                            } else y(r || a, function(t) {
                                                var e = U(t, a, n, r, o, i, s);
                                                e !== g && E.push(D(t) + ":" + (o ? " " : "") + e)
                                            }), q = E.length ? o ? "{\n" + i + E.join(",\n" + i) + "\n" + R + "}" : "{" + E.join(",") + "}" : "{}";
                                            return s.pop(), q
                                        }
                                    };
                                e.stringify = function(t, e, n) {
                                    var r, o, i, a;
                                    if (s[typeof e] && e)
                                        if ((a = b.call(e)) == k) o = e;
                                        else if (a == C) {
                                            i = {};
                                            for (var c, p = 0, u = e.length; u > p; c = e[p++], a = b.call(c), (a == B || a == A) && (i[c] = 1));
                                        }
                                    if (n)
                                        if ((a = b.call(n)) == A) {
                                            if ((n -= n % 1) > 0)
                                                for (r = "", n > 10 && (n = 10); r.length < n; r += " ");
                                        } else a == B && (r = n.length <= 10 ? n : n.slice(0, 10));
                                    return U("", (c = {}, c[""] = t, c), o, i, r, "", [])
                                }
                            }
                            if (!n("json-parse")) {
                                var q, L, M = i.fromCharCode,
                                    I = {
                                        92: "\\",
                                        34: '"',
                                        47: "/",
                                        98: "\b",
                                        116: "	",
                                        110: "\n",
                                        102: "\f",
                                        114: "\r"
                                    },
                                    H = function() {
                                        throw q = L = null, u()
                                    },
                                    z = function() {
                                        for (var t, e, n, r, o, i = L, s = i.length; s > q;) switch (o = i.charCodeAt(q)) {
                                            case 9:
                                            case 10:
                                            case 13:
                                            case 32:
                                                q++;
                                                break;
                                            case 123:
                                            case 125:
                                            case 91:
                                            case 93:
                                            case 58:
                                            case 44:
                                                return t = E ? i.charAt(q) : i[q], q++, t;
                                            case 34:
                                                for (t = "@", q++; s > q;)
                                                    if (o = i.charCodeAt(q), 32 > o) H();
                                                    else if (92 == o) switch (o = i.charCodeAt(++q)) {
                                                        case 92:
                                                        case 34:
                                                        case 47:
                                                        case 98:
                                                        case 116:
                                                        case 110:
                                                        case 102:
                                                        case 114:
                                                            t += I[o], q++;
                                                            break;
                                                        case 117:
                                                            for (e = ++q, n = q + 4; n > q; q++) o = i.charCodeAt(q), o >= 48 && 57 >= o || o >= 97 && 102 >= o || o >= 65 && 70 >= o || H();
                                                            t += M("0x" + i.slice(e, q));
                                                            break;
                                                        default:
                                                            H()
                                                    } else {
                                                        if (34 == o) break;
                                                        for (o = i.charCodeAt(q), e = q; o >= 32 && 92 != o && 34 != o;) o = i.charCodeAt(++q);
                                                        t += i.slice(e, q)
                                                    }
                                                if (34 == i.charCodeAt(q)) return q++, t;
                                                H();
                                            default:
                                                if (e = q, 45 == o && (r = !0, o = i.charCodeAt(++q)), o >= 48 && 57 >= o) {
                                                    for (48 == o && (o = i.charCodeAt(q + 1), o >= 48 && 57 >= o) && H(), r = !1; s > q && (o = i.charCodeAt(q), o >= 48 && 57 >= o); q++);
                                                    if (46 == i.charCodeAt(q)) {
                                                        for (n = ++q; s > n && (o = i.charCodeAt(n), o >= 48 && 57 >= o); n++);
                                                        n == q && H(), q = n
                                                    }
                                                    if (o = i.charCodeAt(q), 101 == o || 69 == o) {
                                                        for (o = i.charCodeAt(++q), (43 == o || 45 == o) && q++, n = q; s > n && (o = i.charCodeAt(n), o >= 48 && 57 >= o); n++);
                                                        n == q && H(), q = n
                                                    }
                                                    return +i.slice(e, q)
                                                }
                                                if (r && H(), "true" == i.slice(q, q + 4)) return q += 4, !0;
                                                if ("false" == i.slice(q, q + 5)) return q += 5, !1;
                                                if ("null" == i.slice(q, q + 4)) return q += 4, null;
                                                H()
                                        }
                                        return "$"
                                    },
                                    J = function(t) {
                                        var e, n;
                                        if ("$" == t && H(), "string" == typeof t) {
                                            if ("@" == (E ? t.charAt(0) : t[0])) return t.slice(1);
                                            if ("[" == t) {
                                                for (e = []; t = z(), "]" != t; n || (n = !0)) n && ("," == t ? (t = z(), "]" == t && H()) : H()), "," == t && H(), e.push(J(t));
                                                return e
                                            }
                                            if ("{" == t) {
                                                for (e = {}; t = z(), "}" != t; n || (n = !0)) n && ("," == t ? (t = z(), "}" == t && H()) : H()), ("," == t || "string" != typeof t || "@" != (E ? t.charAt(0) : t[0]) || ":" != z()) && H(), e[t.slice(1)] = J(z());
                                                return e
                                            }
                                            H()
                                        }
                                        return t
                                    },
                                    X = function(t, e, n) {
                                        var r = F(t, e, n);
                                        r === g ? delete t[e] : t[e] = r
                                    },
                                    F = function(t, e, n) {
                                        var r, o = t[e];
                                        if ("object" == typeof o && o)
                                            if (b.call(o) == C)
                                                for (r = o.length; r--;) X(o, r, n);
                                            else y(o, function(t) {
                                                X(o, t, n)
                                            });
                                        return n.call(t, e, o)
                                    };
                                e.parse = function(t, e) {
                                    var n, r;
                                    return q = 0, L = "" + t, n = J(z()), "$" != z() && H(), q = L = null, e && b.call(e) == k ? F((r = {}, r[""] = n, r), "", e) : n
                                }
                            }
                        }
                        return e.runInContext = o, e
                    }
                    var i = "function" == typeof t && t.amd,
                        s = {
                            "function": !0,
                            object: !0
                        },
                        a = s[typeof r] && r && !r.nodeType && r,
                        c = s[typeof window] && window || this,
                        p = a && s[typeof n] && n && !n.nodeType && "object" == typeof e && e;
                    if (!p || p.global !== p && p.window !== p && p.self !== p || (c = p), a && !i) o(c, a);
                    else {
                        var u = c.JSON,
                            f = c.JSON3,
                            h = !1,
                            l = o(c, c.JSON3 = {
                                noConflict: function() {
                                    return h || (h = !0, c.JSON = u, c.JSON3 = f, u = f = null), l
                                }
                            });
                        c.JSON = {
                            parse: l.parse,
                            stringify: l.stringify
                        }
                    }
                    i && t(function() {
                        return l
                    })
                }).call(this)
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {}],
        51: [function(t, e, n) {
            function r(t, e) {
                var n = [];
                e = e || 0;
                for (var r = e || 0; r < t.length; r++) n[r - e] = t[r];
                return n
            }
            e.exports = r
        }, {}]
    }, {}, [31])(31)
});

    return _module;

}(window.wigzo || {}));


/*

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

// lib/handlebars/browser-prefix.js
window.wigzo = (function(_module) {
var Handlebars = {};

(function(Handlebars, undefined) {
;
// lib/handlebars/base.js

Handlebars.VERSION = "1.0.0";
Handlebars.COMPILER_REVISION = 4;

Handlebars.REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};

Handlebars.helpers  = {};
Handlebars.partials = {};

var toString = Object.prototype.toString,
    functionType = '[object Function]',
    objectType = '[object Object]';

Handlebars.registerHelper = function(name, fn, inverse) {
  if (toString.call(name) === objectType) {
    if (inverse || fn) { throw new Handlebars.Exception('Arg not supported with multiple helpers'); }
    Handlebars.Utils.extend(this.helpers, name);
  } else {
    if (inverse) { fn.not = inverse; }
    this.helpers[name] = fn;
  }
};

Handlebars.registerPartial = function(name, str) {
  if (toString.call(name) === objectType) {
    Handlebars.Utils.extend(this.partials,  name);
  } else {
    this.partials[name] = str;
  }
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Missing helper: '" + arg + "'");
  }
});

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;

  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.logger = {
  DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

  methodMap: {0: 'debug', 1: 'info', 2: 'warn', 3: 'error'},

  // can be overridden in the host environment
  log: function(level, obj) {
    if (Handlebars.logger.level <= level) {
      var method = Handlebars.logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};

Handlebars.log = function(level, obj) { Handlebars.logger.log(level, obj); };

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var i = 0, ret = "", data;

  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && typeof context === 'object') {
    if(context instanceof Array){
      for(var j = context.length; i<j; i++) {
        if (data) { data.index = i; }
        ret = ret + fn(context[i], { data: data });
      }
    } else {
      for(var key in context) {
        if(context.hasOwnProperty(key)) {
          if(data) { data.key = key; }
          ret = ret + fn(context[key], {data: data});
          i++;
        }
      }
    }
  }

  if(i === 0){
    ret = inverse(this);
  }

  return ret;
});

Handlebars.registerHelper('if', function(conditional, options) {
  var type = toString.call(conditional);
  if(type === functionType) { conditional = conditional.call(this); }

  if(!conditional || Handlebars.Utils.isEmpty(conditional)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(conditional, options) {
  return Handlebars.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn});
});

Handlebars.registerHelper('with', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (!Handlebars.Utils.isEmpty(context)) return options.fn(context);
});

Handlebars.registerHelper('log', function(context, options) {
  var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
  Handlebars.log(level, context);
});
;
// lib/handlebars/compiler/parser.js
/* Jison generated parser */
var handlebars = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"simpleInverse":6,"statements":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"inMustache":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"CLOSE_UNESCAPED":24,"OPEN_PARTIAL":25,"partialName":26,"params":27,"hash":28,"dataName":29,"param":30,"STRING":31,"INTEGER":32,"BOOLEAN":33,"hashSegments":34,"hashSegment":35,"ID":36,"EQUALS":37,"DATA":38,"pathSegments":39,"SEP":40,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",31:"STRING",32:"INTEGER",33:"BOOLEAN",36:"ID",37:"EQUALS",38:"DATA",40:"SEP"},
productions_: [0,[3,2],[4,2],[4,3],[4,2],[4,1],[4,1],[4,0],[7,1],[7,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[6,2],[17,3],[17,2],[17,2],[17,1],[17,1],[27,2],[27,1],[30,1],[30,1],[30,1],[30,1],[30,1],[28,1],[34,2],[34,1],[35,3],[35,3],[35,3],[35,3],[35,3],[26,1],[26,1],[26,1],[29,2],[21,1],[39,3],[39,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = new yy.ProgramNode([], $$[$0]); 
break;
case 3: this.$ = new yy.ProgramNode($$[$0-2], $$[$0]); 
break;
case 4: this.$ = new yy.ProgramNode($$[$0-1], []); 
break;
case 5: this.$ = new yy.ProgramNode($$[$0]); 
break;
case 6: this.$ = new yy.ProgramNode([], []); 
break;
case 7: this.$ = new yy.ProgramNode([]); 
break;
case 8: this.$ = [$$[$0]]; 
break;
case 9: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 10: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0]); 
break;
case 11: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0]); 
break;
case 12: this.$ = $$[$0]; 
break;
case 13: this.$ = $$[$0]; 
break;
case 14: this.$ = new yy.ContentNode($$[$0]); 
break;
case 15: this.$ = new yy.CommentNode($$[$0]); 
break;
case 16: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 17: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 18: this.$ = $$[$0-1]; 
break;
case 19:
    // Parsing out the '&' escape token at this level saves ~500 bytes after min due to the removal of one parser node.
    this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], $$[$0-2][2] === '&');
  
break;
case 20: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], true); 
break;
case 21: this.$ = new yy.PartialNode($$[$0-1]); 
break;
case 22: this.$ = new yy.PartialNode($$[$0-2], $$[$0-1]); 
break;
case 23: 
break;
case 24: this.$ = [[$$[$0-2]].concat($$[$0-1]), $$[$0]]; 
break;
case 25: this.$ = [[$$[$0-1]].concat($$[$0]), null]; 
break;
case 26: this.$ = [[$$[$0-1]], $$[$0]]; 
break;
case 27: this.$ = [[$$[$0]], null]; 
break;
case 28: this.$ = [[$$[$0]], null]; 
break;
case 29: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 30: this.$ = [$$[$0]]; 
break;
case 31: this.$ = $$[$0]; 
break;
case 32: this.$ = new yy.StringNode($$[$0]); 
break;
case 33: this.$ = new yy.IntegerNode($$[$0]); 
break;
case 34: this.$ = new yy.BooleanNode($$[$0]); 
break;
case 35: this.$ = $$[$0]; 
break;
case 36: this.$ = new yy.HashNode($$[$0]); 
break;
case 37: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 38: this.$ = [$$[$0]]; 
break;
case 39: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 40: this.$ = [$$[$0-2], new yy.StringNode($$[$0])]; 
break;
case 41: this.$ = [$$[$0-2], new yy.IntegerNode($$[$0])]; 
break;
case 42: this.$ = [$$[$0-2], new yy.BooleanNode($$[$0])]; 
break;
case 43: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 44: this.$ = new yy.PartialNameNode($$[$0]); 
break;
case 45: this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0])); 
break;
case 46: this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0])); 
break;
case 47: this.$ = new yy.DataNode($$[$0]); 
break;
case 48: this.$ = new yy.IdNode($$[$0]); 
break;
case 49: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2]; 
break;
case 50: this.$ = [{part: $$[$0]}]; 
break;
}
},
table: [{3:1,4:2,5:[2,7],6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],22:[1,14],23:[1,15],25:[1,16]},{1:[3]},{5:[1,17]},{5:[2,6],7:18,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,6],22:[1,14],23:[1,15],25:[1,16]},{5:[2,5],6:20,8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,5],22:[1,14],23:[1,15],25:[1,16]},{17:23,18:[1,22],21:24,29:25,36:[1,28],38:[1,27],39:26},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],25:[2,8]},{4:29,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],25:[1,16]},{4:30,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],25:[1,16]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{17:31,21:24,29:25,36:[1,28],38:[1,27],39:26},{17:32,21:24,29:25,36:[1,28],38:[1,27],39:26},{17:33,21:24,29:25,36:[1,28],38:[1,27],39:26},{21:35,26:34,31:[1,36],32:[1,37],36:[1,28],39:26},{1:[2,1]},{5:[2,2],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,2],22:[1,14],23:[1,15],25:[1,16]},{17:23,21:24,29:25,36:[1,28],38:[1,27],39:26},{5:[2,4],7:38,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,4],22:[1,14],23:[1,15],25:[1,16]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{5:[2,23],14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{18:[1,39]},{18:[2,27],21:44,24:[2,27],27:40,28:41,29:48,30:42,31:[1,45],32:[1,46],33:[1,47],34:43,35:49,36:[1,50],38:[1,27],39:26},{18:[2,28],24:[2,28]},{18:[2,48],24:[2,48],31:[2,48],32:[2,48],33:[2,48],36:[2,48],38:[2,48],40:[1,51]},{21:52,36:[1,28],39:26},{18:[2,50],24:[2,50],31:[2,50],32:[2,50],33:[2,50],36:[2,50],38:[2,50],40:[2,50]},{10:53,20:[1,54]},{10:55,20:[1,54]},{18:[1,56]},{18:[1,57]},{24:[1,58]},{18:[1,59],21:60,36:[1,28],39:26},{18:[2,44],36:[2,44]},{18:[2,45],36:[2,45]},{18:[2,46],36:[2,46]},{5:[2,3],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,3],22:[1,14],23:[1,15],25:[1,16]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{18:[2,25],21:44,24:[2,25],28:61,29:48,30:62,31:[1,45],32:[1,46],33:[1,47],34:43,35:49,36:[1,50],38:[1,27],39:26},{18:[2,26],24:[2,26]},{18:[2,30],24:[2,30],31:[2,30],32:[2,30],33:[2,30],36:[2,30],38:[2,30]},{18:[2,36],24:[2,36],35:63,36:[1,64]},{18:[2,31],24:[2,31],31:[2,31],32:[2,31],33:[2,31],36:[2,31],38:[2,31]},{18:[2,32],24:[2,32],31:[2,32],32:[2,32],33:[2,32],36:[2,32],38:[2,32]},{18:[2,33],24:[2,33],31:[2,33],32:[2,33],33:[2,33],36:[2,33],38:[2,33]},{18:[2,34],24:[2,34],31:[2,34],32:[2,34],33:[2,34],36:[2,34],38:[2,34]},{18:[2,35],24:[2,35],31:[2,35],32:[2,35],33:[2,35],36:[2,35],38:[2,35]},{18:[2,38],24:[2,38],36:[2,38]},{18:[2,50],24:[2,50],31:[2,50],32:[2,50],33:[2,50],36:[2,50],37:[1,65],38:[2,50],40:[2,50]},{36:[1,66]},{18:[2,47],24:[2,47],31:[2,47],32:[2,47],33:[2,47],36:[2,47],38:[2,47]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{21:67,36:[1,28],39:26},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,68]},{18:[2,24],24:[2,24]},{18:[2,29],24:[2,29],31:[2,29],32:[2,29],33:[2,29],36:[2,29],38:[2,29]},{18:[2,37],24:[2,37],36:[2,37]},{37:[1,65]},{21:69,29:73,31:[1,70],32:[1,71],33:[1,72],36:[1,28],38:[1,27],39:26},{18:[2,49],24:[2,49],31:[2,49],32:[2,49],33:[2,49],36:[2,49],38:[2,49],40:[2,49]},{18:[1,74]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{18:[2,39],24:[2,39],36:[2,39]},{18:[2,40],24:[2,40],36:[2,40]},{18:[2,41],24:[2,41],36:[2,41]},{18:[2,42],24:[2,42],36:[2,42]},{18:[2,43],24:[2,43],36:[2,43]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]}],
defaultActions: {17:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0: yy_.yytext = "\\"; return 14; 
break;
case 1:
                                   if(yy_.yytext.slice(-1) !== "\\") this.begin("mu");
                                   if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1), this.begin("emu");
                                   if(yy_.yytext) return 14;
                                 
break;
case 2: return 14; 
break;
case 3:
                                   if(yy_.yytext.slice(-1) !== "\\") this.popState();
                                   if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1);
                                   return 14;
                                 
break;
case 4: yy_.yytext = yy_.yytext.substr(0, yy_.yyleng-4); this.popState(); return 15; 
break;
case 5: return 25; 
break;
case 6: return 16; 
break;
case 7: return 20; 
break;
case 8: return 19; 
break;
case 9: return 19; 
break;
case 10: return 23; 
break;
case 11: return 22; 
break;
case 12: this.popState(); this.begin('com'); 
break;
case 13: yy_.yytext = yy_.yytext.substr(3,yy_.yyleng-5); this.popState(); return 15; 
break;
case 14: return 22; 
break;
case 15: return 37; 
break;
case 16: return 36; 
break;
case 17: return 36; 
break;
case 18: return 40; 
break;
case 19: /*ignore whitespace*/ 
break;
case 20: this.popState(); return 24; 
break;
case 21: this.popState(); return 18; 
break;
case 22: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 31; 
break;
case 23: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\'/g,"'"); return 31; 
break;
case 24: return 38; 
break;
case 25: return 33; 
break;
case 26: return 33; 
break;
case 27: return 32; 
break;
case 28: return 36; 
break;
case 29: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 36; 
break;
case 30: return 'INVALID'; 
break;
case 31: return 5; 
break;
}
};
lexer.rules = [/^(?:\\\\(?=(\{\{)))/,/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\{\{>)/,/^(?:\{\{#)/,/^(?:\{\{\/)/,/^(?:\{\{\^)/,/^(?:\{\{\s*else\b)/,/^(?:\{\{\{)/,/^(?:\{\{&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{)/,/^(?:=)/,/^(?:\.(?=[}\/ ]))/,/^(?:\.\.)/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}\}\})/,/^(?:\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=[}\s]))/,/^(?:false(?=[}\s]))/,/^(?:-?[0-9]+(?=[}\s]))/,/^(?:[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.]))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],"inclusive":false},"emu":{"rules":[3],"inclusive":false},"com":{"rules":[4],"inclusive":false},"INITIAL":{"rules":[0,1,2,31],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();;
// lib/handlebars/compiler/base.js

Handlebars.Parser = handlebars;

Handlebars.parse = function(input) {

  // Just return if an already-compile AST was passed in.
  if(input.constructor === Handlebars.AST.ProgramNode) { return input; }

  Handlebars.Parser.yy = Handlebars.AST;
  return Handlebars.Parser.parse(input);
};
;
// lib/handlebars/compiler/ast.js
Handlebars.AST = {};

Handlebars.AST.ProgramNode = function(statements, inverse) {
  this.type = "program";
  this.statements = statements;
  if(inverse) { this.inverse = new Handlebars.AST.ProgramNode(inverse); }
};

Handlebars.AST.MustacheNode = function(rawParams, hash, unescaped) {
  this.type = "mustache";
  this.escaped = !unescaped;
  this.hash = hash;

  var id = this.id = rawParams[0];
  var params = this.params = rawParams.slice(1);

  // a mustache is an eligible helper if:
  // * its id is simple (a single part, not `this` or `..`)
  var eligibleHelper = this.eligibleHelper = id.isSimple;

  // a mustache is definitely a helper if:
  // * it is an eligible helper, and
  // * it has at least one parameter or hash segment
  this.isHelper = eligibleHelper && (params.length || hash);

  // if a mustache is an eligible helper but not a definite
  // helper, it is ambiguous, and will be resolved in a later
  // pass or at runtime.
};

Handlebars.AST.PartialNode = function(partialName, context) {
  this.type         = "partial";
  this.partialName  = partialName;
  this.context      = context;
};

Handlebars.AST.BlockNode = function(mustache, program, inverse, close) {
  var verifyMatch = function(open, close) {
    if(open.original !== close.original) {
      throw new Handlebars.Exception(open.original + " doesn't match " + close.original);
    }
  };

  verifyMatch(mustache.id, close);
  this.type = "block";
  this.mustache = mustache;
  this.program  = program;
  this.inverse  = inverse;

  if (this.inverse && !this.program) {
    this.isInverse = true;
  }
};

Handlebars.AST.ContentNode = function(string) {
  this.type = "content";
  this.string = string;
};

Handlebars.AST.HashNode = function(pairs) {
  this.type = "hash";
  this.pairs = pairs;
};

Handlebars.AST.IdNode = function(parts) {
  this.type = "ID";

  var original = "",
      dig = [],
      depth = 0;

  for(var i=0,l=parts.length; i<l; i++) {
    var part = parts[i].part;
    original += (parts[i].separator || '') + part;

    if (part === ".." || part === "." || part === "this") {
      if (dig.length > 0) { throw new Handlebars.Exception("Invalid path: " + original); }
      else if (part === "..") { depth++; }
      else { this.isScoped = true; }
    }
    else { dig.push(part); }
  }

  this.original = original;
  this.parts    = dig;
  this.string   = dig.join('.');
  this.depth    = depth;

  // an ID is simple if it only has one part, and that part is not
  // `..` or `this`.
  this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

  this.stringModeValue = this.string;
};

Handlebars.AST.PartialNameNode = function(name) {
  this.type = "PARTIAL_NAME";
  this.name = name.original;
};

Handlebars.AST.DataNode = function(id) {
  this.type = "DATA";
  this.id = id;
};

Handlebars.AST.StringNode = function(string) {
  this.type = "STRING";
  this.original =
    this.string =
    this.stringModeValue = string;
};

Handlebars.AST.IntegerNode = function(integer) {
  this.type = "INTEGER";
  this.original =
    this.integer = integer;
  this.stringModeValue = Number(integer);
};

Handlebars.AST.BooleanNode = function(bool) {
  this.type = "BOOLEAN";
  this.bool = bool;
  this.stringModeValue = bool === "true";
};

Handlebars.AST.CommentNode = function(comment) {
  this.type = "comment";
  this.comment = comment;
};
;
// lib/handlebars/utils.js

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

var escapeChar = function(chr) {
  return escape[chr] || "&amp;";
};

Handlebars.Utils = {
  extend: function(obj, value) {
    for(var key in value) {
      if(value.hasOwnProperty(key)) {
        obj[key] = value[key];
      }
    }
  },

  escapeExpression: function(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof Handlebars.SafeString) {
      return string.toString();
    } else if (string == null || string === false) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = string.toString();

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  },

  isEmpty: function(value) {
    if (!value && value !== 0) {
      return true;
    } else if(toString.call(value) === "[object Array]" && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }
};
;
// lib/handlebars/compiler/compiler.js

/*jshint eqnull:true*/
var Compiler = Handlebars.Compiler = function() {};
var JavaScriptCompiler = Handlebars.JavaScriptCompiler = function() {};

// the foundHelper register will disambiguate helper lookup from finding a
// function in a context. This is necessary for mustache compatibility, which
// requires that context functions in blocks are evaluated by blockHelperMissing,
// and then proceed as if the resulting value was provided to blockHelperMissing.

Compiler.prototype = {
  compiler: Compiler,

  disassemble: function() {
    var opcodes = this.opcodes, opcode, out = [], params, param;

    for (var i=0, l=opcodes.length; i<l; i++) {
      opcode = opcodes[i];

      if (opcode.opcode === 'DECLARE') {
        out.push("DECLARE " + opcode.name + "=" + opcode.value);
      } else {
        params = [];
        for (var j=0; j<opcode.args.length; j++) {
          param = opcode.args[j];
          if (typeof param === "string") {
            param = "\"" + param.replace("\n", "\\n") + "\"";
          }
          params.push(param);
        }
        out.push(opcode.opcode + " " + params.join(" "));
      }
    }

    return out.join("\n");
  },
  equals: function(other) {
    var len = this.opcodes.length;
    if (other.opcodes.length !== len) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      var opcode = this.opcodes[i],
          otherOpcode = other.opcodes[i];
      if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
        return false;
      }
      for (var j = 0; j < opcode.args.length; j++) {
        if (opcode.args[j] !== otherOpcode.args[j]) {
          return false;
        }
      }
    }

    len = this.children.length;
    if (other.children.length !== len) {
      return false;
    }
    for (i = 0; i < len; i++) {
      if (!this.children[i].equals(other.children[i])) {
        return false;
      }
    }

    return true;
  },

  guid: 0,

  compile: function(program, options) {
    this.children = [];
    this.depths = {list: []};
    this.options = options;

    // These changes will propagate to the other compiler components
    var knownHelpers = this.options.knownHelpers;
    this.options.knownHelpers = {
      'helperMissing': true,
      'blockHelperMissing': true,
      'each': true,
      'if': true,
      'unless': true,
      'with': true,
      'log': true
    };
    if (knownHelpers) {
      for (var name in knownHelpers) {
        this.options.knownHelpers[name] = knownHelpers[name];
      }
    }

    return this.program(program);
  },

  accept: function(node) {
    return this[node.type](node);
  },

  program: function(program) {
    var statements = program.statements, statement;
    this.opcodes = [];

    for(var i=0, l=statements.length; i<l; i++) {
      statement = statements[i];
      this[statement.type](statement);
    }
    this.isSimple = l === 1;

    this.depths.list = this.depths.list.sort(function(a, b) {
      return a - b;
    });

    return this;
  },

  compileProgram: function(program) {
    var result = new this.compiler().compile(program, this.options);
    var guid = this.guid++, depth;

    this.usePartial = this.usePartial || result.usePartial;

    this.children[guid] = result;

    for(var i=0, l=result.depths.list.length; i<l; i++) {
      depth = result.depths.list[i];

      if(depth < 2) { continue; }
      else { this.addDepth(depth - 1); }
    }

    return guid;
  },

  block: function(block) {
    var mustache = block.mustache,
        program = block.program,
        inverse = block.inverse;

    if (program) {
      program = this.compileProgram(program);
    }

    if (inverse) {
      inverse = this.compileProgram(inverse);
    }

    var type = this.classifyMustache(mustache);

    if (type === "helper") {
      this.helperMustache(mustache, program, inverse);
    } else if (type === "simple") {
      this.simpleMustache(mustache);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('blockValue');
    } else {
      this.ambiguousMustache(mustache, program, inverse);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('ambiguousBlockValue');
    }

    this.opcode('append');
  },

  hash: function(hash) {
    var pairs = hash.pairs, pair, val;

    this.opcode('pushHash');

    for(var i=0, l=pairs.length; i<l; i++) {
      pair = pairs[i];
      val  = pair[1];

      if (this.options.stringParams) {
        if(val.depth) {
          this.addDepth(val.depth);
        }
        this.opcode('getContext', val.depth || 0);
        this.opcode('pushStringParam', val.stringModeValue, val.type);
      } else {
        this.accept(val);
      }

      this.opcode('assignToHash', pair[0]);
    }
    this.opcode('popHash');
  },

  partial: function(partial) {
    var partialName = partial.partialName;
    this.usePartial = true;

    if(partial.context) {
      this.ID(partial.context);
    } else {
      this.opcode('push', 'depth0');
    }

    this.opcode('invokePartial', partialName.name);
    this.opcode('append');
  },

  content: function(content) {
    this.opcode('appendContent', content.string);
  },

  mustache: function(mustache) {
    var options = this.options;
    var type = this.classifyMustache(mustache);

    if (type === "simple") {
      this.simpleMustache(mustache);
    } else if (type === "helper") {
      this.helperMustache(mustache);
    } else {
      this.ambiguousMustache(mustache);
    }

    if(mustache.escaped && !options.noEscape) {
      this.opcode('appendEscaped');
    } else {
      this.opcode('append');
    }
  },

  ambiguousMustache: function(mustache, program, inverse) {
    var id = mustache.id,
        name = id.parts[0],
        isBlock = program != null || inverse != null;

    this.opcode('getContext', id.depth);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    this.opcode('invokeAmbiguous', name, isBlock);
  },

  simpleMustache: function(mustache) {
    var id = mustache.id;

    if (id.type === 'DATA') {
      this.DATA(id);
    } else if (id.parts.length) {
      this.ID(id);
    } else {
      // Simplified ID for `this`
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);
      this.opcode('pushContext');
    }

    this.opcode('resolvePossibleLambda');
  },

  helperMustache: function(mustache, program, inverse) {
    var params = this.setupFullMustacheParams(mustache, program, inverse),
        name = mustache.id.parts[0];

    if (this.options.knownHelpers[name]) {
      this.opcode('invokeKnownHelper', params.length, name);
    } else if (this.options.knownHelpersOnly) {
      throw new Error("You specified knownHelpersOnly, but used the unknown helper " + name);
    } else {
      this.opcode('invokeHelper', params.length, name);
    }
  },

  ID: function(id) {
    this.addDepth(id.depth);
    this.opcode('getContext', id.depth);

    var name = id.parts[0];
    if (!name) {
      this.opcode('pushContext');
    } else {
      this.opcode('lookupOnContext', id.parts[0]);
    }

    for(var i=1, l=id.parts.length; i<l; i++) {
      this.opcode('lookup', id.parts[i]);
    }
  },

  DATA: function(data) {
    this.options.data = true;
    if (data.id.isScoped || data.id.depth) {
      throw new Handlebars.Exception('Scoped data references are not supported: ' + data.original);
    }

    this.opcode('lookupData');
    var parts = data.id.parts;
    for(var i=0, l=parts.length; i<l; i++) {
      this.opcode('lookup', parts[i]);
    }
  },

  STRING: function(string) {
    this.opcode('pushString', string.string);
  },

  INTEGER: function(integer) {
    this.opcode('pushLiteral', integer.integer);
  },

  BOOLEAN: function(bool) {
    this.opcode('pushLiteral', bool.bool);
  },

  comment: function() {},

  // HELPERS
  opcode: function(name) {
    this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
  },

  declare: function(name, value) {
    this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
  },

  addDepth: function(depth) {
    if(isNaN(depth)) { throw new Error("EWOT"); }
    if(depth === 0) { return; }

    if(!this.depths[depth]) {
      this.depths[depth] = true;
      this.depths.list.push(depth);
    }
  },

  classifyMustache: function(mustache) {
    var isHelper   = mustache.isHelper;
    var isEligible = mustache.eligibleHelper;
    var options    = this.options;

    // if ambiguous, we can possibly resolve the ambiguity now
    if (isEligible && !isHelper) {
      var name = mustache.id.parts[0];

      if (options.knownHelpers[name]) {
        isHelper = true;
      } else if (options.knownHelpersOnly) {
        isEligible = false;
      }
    }

    if (isHelper) { return "helper"; }
    else if (isEligible) { return "ambiguous"; }
    else { return "simple"; }
  },

  pushParams: function(params) {
    var i = params.length, param;

    while(i--) {
      param = params[i];

      if(this.options.stringParams) {
        if(param.depth) {
          this.addDepth(param.depth);
        }

        this.opcode('getContext', param.depth || 0);
        this.opcode('pushStringParam', param.stringModeValue, param.type);
      } else {
        this[param.type](param);
      }
    }
  },

  setupMustacheParams: function(mustache) {
    var params = mustache.params;
    this.pushParams(params);

    if(mustache.hash) {
      this.hash(mustache.hash);
    } else {
      this.opcode('emptyHash');
    }

    return params;
  },

  // this will replace setupMustacheParams when we're done
  setupFullMustacheParams: function(mustache, program, inverse) {
    var params = mustache.params;
    this.pushParams(params);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    if(mustache.hash) {
      this.hash(mustache.hash);
    } else {
      this.opcode('emptyHash');
    }

    return params;
  }
};

var Literal = function(value) {
  this.value = value;
};

JavaScriptCompiler.prototype = {
  // PUBLIC API: You can override these methods in a subclass to provide
  // alternative compiled forms for name lookup and buffering semantics
  nameLookup: function(parent, name /* , type*/) {
    if (/^[0-9]+$/.test(name)) {
      return parent + "[" + name + "]";
    } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
      return parent + "." + name;
    }
    else {
      return parent + "['" + name + "']";
    }
  },

  appendToBuffer: function(string) {
    if (this.environment.isSimple) {
      return "return " + string + ";";
    } else {
      return {
        appendToBuffer: true,
        content: string,
        toString: function() { return "buffer += " + string + ";"; }
      };
    }
  },

  initializeBuffer: function() {
    return this.quotedString("");
  },

  namespace: "Handlebars",
  // END PUBLIC API

  compile: function(environment, options, context, asObject) {
    this.environment = environment;
    this.options = options || {};

    Handlebars.log(Handlebars.logger.DEBUG, this.environment.disassemble() + "\n\n");

    this.name = this.environment.name;
    this.isChild = !!context;
    this.context = context || {
      programs: [],
      environments: [],
      aliases: { }
    };

    this.preamble();

    this.stackSlot = 0;
    this.stackVars = [];
    this.registers = { list: [] };
    this.compileStack = [];
    this.inlineStack = [];

    this.compileChildren(environment, options);

    var opcodes = environment.opcodes, opcode;

    this.i = 0;

    for(l=opcodes.length; this.i<l; this.i++) {
      opcode = opcodes[this.i];

      if(opcode.opcode === 'DECLARE') {
        this[opcode.name] = opcode.value;
      } else {
        this[opcode.opcode].apply(this, opcode.args);
      }
    }

    return this.createFunctionContext(asObject);
  },

  nextOpcode: function() {
    var opcodes = this.environment.opcodes;
    return opcodes[this.i + 1];
  },

  eat: function() {
    this.i = this.i + 1;
  },

  preamble: function() {
    var out = [];

    if (!this.isChild) {
      var namespace = this.namespace;

      var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
      if (this.environment.usePartial) { copies = copies + " partials = this.merge(partials, " + namespace + ".partials);"; }
      if (this.options.data) { copies = copies + " data = data || {};"; }
      out.push(copies);
    } else {
      out.push('');
    }

    if (!this.environment.isSimple) {
      out.push(", buffer = " + this.initializeBuffer());
    } else {
      out.push("");
    }

    // track the last context pushed into place to allow skipping the
    // getContext opcode when it would be a noop
    this.lastContext = 0;
    this.source = out;
  },

  createFunctionContext: function(asObject) {
    var locals = this.stackVars.concat(this.registers.list);

    if(locals.length > 0) {
      this.source[1] = this.source[1] + ", " + locals.join(", ");
    }

    // Generate minimizer alias mappings
    if (!this.isChild) {
      for (var alias in this.context.aliases) {
        if (this.context.aliases.hasOwnProperty(alias)) {
          this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
        }
      }
    }

    if (this.source[1]) {
      this.source[1] = "var " + this.source[1].substring(2) + ";";
    }

    // Merge children
    if (!this.isChild) {
      this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
    }

    if (!this.environment.isSimple) {
      this.source.push("return buffer;");
    }

    var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

    for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
      params.push("depth" + this.environment.depths.list[i]);
    }

    // Perform a second pass over the output to merge content when possible
    var source = this.mergeSource();

    if (!this.isChild) {
      var revision = Handlebars.COMPILER_REVISION,
          versions = Handlebars.REVISION_CHANGES[revision];
      source = "this.compilerInfo = ["+revision+",'"+versions+"'];\n"+source;
    }

    if (asObject) {
      params.push(source);

      return Function.apply(this, params);
    } else {
      var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
      Handlebars.log(Handlebars.logger.DEBUG, functionSource + "\n\n");
      return functionSource;
    }
  },
  mergeSource: function() {
    // WARN: We are not handling the case where buffer is still populated as the source should
    // not have buffer append operations as their final action.
    var source = '',
        buffer;
    for (var i = 0, len = this.source.length; i < len; i++) {
      var line = this.source[i];
      if (line.appendToBuffer) {
        if (buffer) {
          buffer = buffer + '\n    + ' + line.content;
        } else {
          buffer = line.content;
        }
      } else {
        if (buffer) {
          source += 'buffer += ' + buffer + ';\n  ';
          buffer = undefined;
        }
        source += line + '\n  ';
      }
    }
    return source;
  },

  // [blockValue]
  //
  // On stack, before: hash, inverse, program, value
  // On stack, after: return value of blockHelperMissing
  //
  // The purpose of this opcode is to take a block of the form
  // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
  // replace it on the stack with the result of properly
  // invoking blockHelperMissing.
  blockValue: function() {
    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    var params = ["depth0"];
    this.setupParams(0, params);

    this.replaceStack(function(current) {
      params.splice(1, 0, current);
      return "blockHelperMissing.call(" + params.join(", ") + ")";
    });
  },

  // [ambiguousBlockValue]
  //
  // On stack, before: hash, inverse, program, value
  // Compiler value, before: lastHelper=value of last found helper, if any
  // On stack, after, if no lastHelper: same as [blockValue]
  // On stack, after, if lastHelper: value
  ambiguousBlockValue: function() {
    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    var params = ["depth0"];
    this.setupParams(0, params);

    var current = this.topStack();
    params.splice(1, 0, current);

    // Use the options value generated from the invocation
    params[params.length-1] = 'options';

    this.source.push("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
  },

  // [appendContent]
  //
  // On stack, before: ...
  // On stack, after: ...
  //
  // Appends the string value of `content` to the current buffer
  appendContent: function(content) {
    this.source.push(this.appendToBuffer(this.quotedString(content)));
  },

  // [append]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Coerces `value` to a String and appends it to the current buffer.
  //
  // If `value` is truthy, or 0, it is coerced into a string and appended
  // Otherwise, the empty string is appended
  append: function() {
    // Force anything that is inlined onto the stack so we don't have duplication
    // when we examine local
    this.flushInline();
    var local = this.popStack();
    this.source.push("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
    if (this.environment.isSimple) {
      this.source.push("else { " + this.appendToBuffer("''") + " }");
    }
  },

  // [appendEscaped]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Escape `value` and append it to the buffer
  appendEscaped: function() {
    this.context.aliases.escapeExpression = 'this.escapeExpression';

    this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
  },

  // [getContext]
  //
  // On stack, before: ...
  // On stack, after: ...
  // Compiler value, after: lastContext=depth
  //
  // Set the value of the `lastContext` compiler value to the depth
  getContext: function(depth) {
    if(this.lastContext !== depth) {
      this.lastContext = depth;
    }
  },

  // [lookupOnContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext[name], ...
  //
  // Looks up the value of `name` on the current context and pushes
  // it onto the stack.
  lookupOnContext: function(name) {
    this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
  },

  // [pushContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext, ...
  //
  // Pushes the value of the current context onto the stack.
  pushContext: function() {
    this.pushStackLiteral('depth' + this.lastContext);
  },

  // [resolvePossibleLambda]
  //
  // On stack, before: value, ...
  // On stack, after: resolved value, ...
  //
  // If the `value` is a lambda, replace it on the stack by
  // the return value of the lambda
  resolvePossibleLambda: function() {
    this.context.aliases.functionType = '"function"';

    this.replaceStack(function(current) {
      return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
    });
  },

  // [lookup]
  //
  // On stack, before: value, ...
  // On stack, after: value[name], ...
  //
  // Replace the value on the stack with the result of looking
  // up `name` on `value`
  lookup: function(name) {
    this.replaceStack(function(current) {
      return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
    });
  },

  // [lookupData]
  //
  // On stack, before: ...
  // On stack, after: data[id], ...
  //
  // Push the result of looking up `id` on the current data
  lookupData: function(id) {
    this.push('data');
  },

  // [pushStringParam]
  //
  // On stack, before: ...
  // On stack, after: string, currentContext, ...
  //
  // This opcode is designed for use in string mode, which
  // provides the string value of a parameter along with its
  // depth rather than resolving it immediately.
  pushStringParam: function(string, type) {
    this.pushStackLiteral('depth' + this.lastContext);

    this.pushString(type);

    if (typeof string === 'string') {
      this.pushString(string);
    } else {
      this.pushStackLiteral(string);
    }
  },

  emptyHash: function() {
    this.pushStackLiteral('{}');

    if (this.options.stringParams) {
      this.register('hashTypes', '{}');
      this.register('hashContexts', '{}');
    }
  },
  pushHash: function() {
    this.hash = {values: [], types: [], contexts: []};
  },
  popHash: function() {
    var hash = this.hash;
    this.hash = undefined;

    if (this.options.stringParams) {
      this.register('hashContexts', '{' + hash.contexts.join(',') + '}');
      this.register('hashTypes', '{' + hash.types.join(',') + '}');
    }
    this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
  },

  // [pushString]
  //
  // On stack, before: ...
  // On stack, after: quotedString(string), ...
  //
  // Push a quoted version of `string` onto the stack
  pushString: function(string) {
    this.pushStackLiteral(this.quotedString(string));
  },

  // [push]
  //
  // On stack, before: ...
  // On stack, after: expr, ...
  //
  // Push an expression onto the stack
  push: function(expr) {
    this.inlineStack.push(expr);
    return expr;
  },

  // [pushLiteral]
  //
  // On stack, before: ...
  // On stack, after: value, ...
  //
  // Pushes a value onto the stack. This operation prevents
  // the compiler from creating a temporary variable to hold
  // it.
  pushLiteral: function(value) {
    this.pushStackLiteral(value);
  },

  // [pushProgram]
  //
  // On stack, before: ...
  // On stack, after: program(guid), ...
  //
  // Push a program expression onto the stack. This takes
  // a compile-time guid and converts it into a runtime-accessible
  // expression.
  pushProgram: function(guid) {
    if (guid != null) {
      this.pushStackLiteral(this.programExpression(guid));
    } else {
      this.pushStackLiteral(null);
    }
  },

  // [invokeHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // Pops off the helper's parameters, invokes the helper,
  // and pushes the helper's return value onto the stack.
  //
  // If the helper is not found, `helperMissing` is called.
  invokeHelper: function(paramSize, name) {
    this.context.aliases.helperMissing = 'helpers.helperMissing';

    var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

    this.push(helper.name + ' || ' + nonHelper);
    this.replaceStack(function(name) {
      return name + ' ? ' + name + '.call(' +
          helper.callParams + ") " + ": helperMissing.call(" +
          helper.helperMissingParams + ")";
    });
  },

  // [invokeKnownHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // This operation is used when the helper is known to exist,
  // so a `helperMissing` fallback is not required.
  invokeKnownHelper: function(paramSize, name) {
    var helper = this.setupHelper(paramSize, name);
    this.push(helper.name + ".call(" + helper.callParams + ")");
  },

  // [invokeAmbiguous]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of disambiguation
  //
  // This operation is used when an expression like `{{foo}}`
  // is provided, but we don't know at compile-time whether it
  // is a helper or a path.
  //
  // This operation emits more code than the other options,
  // and can be avoided by passing the `knownHelpers` and
  // `knownHelpersOnly` flags at compile-time.
  invokeAmbiguous: function(name, helperCall) {
    this.context.aliases.functionType = '"function"';

    this.pushStackLiteral('{}');    // Hash value
    var helper = this.setupHelper(0, name, helperCall);

    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
    var nextStack = this.nextStack();

    this.source.push('if (' + nextStack + ' = ' + helperName + ') { ' + nextStack + ' = ' + nextStack + '.call(' + helper.callParams + '); }');
    this.source.push('else { ' + nextStack + ' = ' + nonHelper + '; ' + nextStack + ' = typeof ' + nextStack + ' === functionType ? ' + nextStack + '.apply(depth0) : ' + nextStack + '; }');
  },

  // [invokePartial]
  //
  // On stack, before: context, ...
  // On stack after: result of partial invocation
  //
  // This operation pops off a context, invokes a partial with that context,
  // and pushes the result of the invocation back.
  invokePartial: function(name) {
    var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

    if (this.options.data) {
      params.push("data");
    }

    this.context.aliases.self = "this";
    this.push("self.invokePartial(" + params.join(", ") + ")");
  },

  // [assignToHash]
  //
  // On stack, before: value, hash, ...
  // On stack, after: hash, ...
  //
  // Pops a value and hash off the stack, assigns `hash[key] = value`
  // and pushes the hash back onto the stack.
  assignToHash: function(key) {
    var value = this.popStack(),
        context,
        type;

    if (this.options.stringParams) {
      type = this.popStack();
      context = this.popStack();
    }

    var hash = this.hash;
    if (context) {
      hash.contexts.push("'" + key + "': " + context);
    }
    if (type) {
      hash.types.push("'" + key + "': " + type);
    }
    hash.values.push("'" + key + "': (" + value + ")");
  },

  // HELPERS

  compiler: JavaScriptCompiler,

  compileChildren: function(environment, options) {
    var children = environment.children, child, compiler;

    for(var i=0, l=children.length; i<l; i++) {
      child = children[i];
      compiler = new this.compiler();

      var index = this.matchExistingProgram(child);

      if (index == null) {
        this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
        index = this.context.programs.length;
        child.index = index;
        child.name = 'program' + index;
        this.context.programs[index] = compiler.compile(child, options, this.context);
        this.context.environments[index] = child;
      } else {
        child.index = index;
        child.name = 'program' + index;
      }
    }
  },
  matchExistingProgram: function(child) {
    for (var i = 0, len = this.context.environments.length; i < len; i++) {
      var environment = this.context.environments[i];
      if (environment && environment.equals(child)) {
        return i;
      }
    }
  },

  programExpression: function(guid) {
    this.context.aliases.self = "this";

    if(guid == null) {
      return "self.noop";
    }

    var child = this.environment.children[guid],
        depths = child.depths.list, depth;

    var programParams = [child.index, child.name, "data"];

    for(var i=0, l = depths.length; i<l; i++) {
      depth = depths[i];

      if(depth === 1) { programParams.push("depth0"); }
      else { programParams.push("depth" + (depth - 1)); }
    }

    return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
  },

  register: function(name, val) {
    this.useRegister(name);
    this.source.push(name + " = " + val + ";");
  },

  useRegister: function(name) {
    if(!this.registers[name]) {
      this.registers[name] = true;
      this.registers.list.push(name);
    }
  },

  pushStackLiteral: function(item) {
    return this.push(new Literal(item));
  },

  pushStack: function(item) {
    this.flushInline();

    var stack = this.incrStack();
    if (item) {
      this.source.push(stack + " = " + item + ";");
    }
    this.compileStack.push(stack);
    return stack;
  },

  replaceStack: function(callback) {
    var prefix = '',
        inline = this.isInline(),
        stack;

    // If we are currently inline then we want to merge the inline statement into the
    // replacement statement via ','
    if (inline) {
      var top = this.popStack(true);

      if (top instanceof Literal) {
        // Literals do not need to be inlined
        stack = top.value;
      } else {
        // Get or create the current stack name for use by the inline
        var name = this.stackSlot ? this.topStackName() : this.incrStack();

        prefix = '(' + this.push(name) + ' = ' + top + '),';
        stack = this.topStack();
      }
    } else {
      stack = this.topStack();
    }

    var item = callback.call(this, stack);

    if (inline) {
      if (this.inlineStack.length || this.compileStack.length) {
        this.popStack();
      }
      this.push('(' + prefix + item + ')');
    } else {
      // Prevent modification of the context depth variable. Through replaceStack
      if (!/^stack/.test(stack)) {
        stack = this.nextStack();
      }

      this.source.push(stack + " = (" + prefix + item + ");");
    }
    return stack;
  },

  nextStack: function() {
    return this.pushStack();
  },

  incrStack: function() {
    this.stackSlot++;
    if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
    return this.topStackName();
  },
  topStackName: function() {
    return "stack" + this.stackSlot;
  },
  flushInline: function() {
    var inlineStack = this.inlineStack;
    if (inlineStack.length) {
      this.inlineStack = [];
      for (var i = 0, len = inlineStack.length; i < len; i++) {
        var entry = inlineStack[i];
        if (entry instanceof Literal) {
          this.compileStack.push(entry);
        } else {
          this.pushStack(entry);
        }
      }
    }
  },
  isInline: function() {
    return this.inlineStack.length;
  },

  popStack: function(wrapped) {
    var inline = this.isInline(),
        item = (inline ? this.inlineStack : this.compileStack).pop();

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      if (!inline) {
        this.stackSlot--;
      }
      return item;
    }
  },

  topStack: function(wrapped) {
    var stack = (this.isInline() ? this.inlineStack : this.compileStack),
        item = stack[stack.length - 1];

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      return item;
    }
  },

  quotedString: function(str) {
    return '"' + str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
      .replace(/\u2029/g, '\\u2029') + '"';
  },

  setupHelper: function(paramSize, name, missingParams) {
    var params = [];
    this.setupParams(paramSize, params, missingParams);
    var foundHelper = this.nameLookup('helpers', name, 'helper');

    return {
      params: params,
      name: foundHelper,
      callParams: ["depth0"].concat(params).join(", "),
      helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
    };
  },

  // the params and contexts arguments are passed in arrays
  // to fill in
  setupParams: function(paramSize, params, useRegister) {
    var options = [], contexts = [], types = [], param, inverse, program;

    options.push("hash:" + this.popStack());

    inverse = this.popStack();
    program = this.popStack();

    // Avoid setting fn and inverse if neither are set. This allows
    // helpers to do a check for `if (options.fn)`
    if (program || inverse) {
      if (!program) {
        this.context.aliases.self = "this";
        program = "self.noop";
      }

      if (!inverse) {
       this.context.aliases.self = "this";
        inverse = "self.noop";
      }

      options.push("inverse:" + inverse);
      options.push("fn:" + program);
    }

    for(var i=0; i<paramSize; i++) {
      param = this.popStack();
      params.push(param);

      if(this.options.stringParams) {
        types.push(this.popStack());
        contexts.push(this.popStack());
      }
    }

    if (this.options.stringParams) {
      options.push("contexts:[" + contexts.join(",") + "]");
      options.push("types:[" + types.join(",") + "]");
      options.push("hashContexts:hashContexts");
      options.push("hashTypes:hashTypes");
    }

    if(this.options.data) {
      options.push("data:data");
    }

    options = "{" + options.join(",") + "}";
    if (useRegister) {
      this.register('options', options);
      params.push('options');
    } else {
      params.push(options);
    }
    return params.join(", ");
  }
};

var reservedWords = (
  "break else new var" +
  " case finally return void" +
  " catch for switch while" +
  " continue function this with" +
  " default if throw" +
  " delete in try" +
  " do instanceof typeof" +
  " abstract enum int short" +
  " boolean export interface static" +
  " byte extends long super" +
  " char final native synchronized" +
  " class float package throws" +
  " const goto private transient" +
  " debugger implements protected volatile" +
  " double import public let yield"
).split(" ");

var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

for(var i=0, l=reservedWords.length; i<l; i++) {
  compilerWords[reservedWords[i]] = true;
}

JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
  if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
    return true;
  }
  return false;
};

Handlebars.precompile = function(input, options) {
  if (input == null || (typeof input !== 'string' && input.constructor !== Handlebars.AST.ProgramNode)) {
    throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }
  var ast = Handlebars.parse(input);
  var environment = new Compiler().compile(ast, options);
  return new JavaScriptCompiler().compile(environment, options);
};

Handlebars.compile = function(input, options) {
  if (input == null || (typeof input !== 'string' && input.constructor !== Handlebars.AST.ProgramNode)) {
    throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }
  var compiled;
  function compile() {
    var ast = Handlebars.parse(input);
    var environment = new Compiler().compile(ast, options);
    var templateSpec = new JavaScriptCompiler().compile(environment, options, undefined, true);
    return Handlebars.template(templateSpec);
  }

  // Template is only compiled on first use and cached after that point.
  return function(context, options) {
    if (!compiled) {
      compiled = compile();
    }
    return compiled.call(this, context, options);
  };
};

;
// lib/handlebars/runtime.js

Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = Handlebars.VM.program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = Handlebars.VM.program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common) {
          ret = {};
          Handlebars.Utils.extend(ret, common);
          Handlebars.Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var result = templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);

      var compilerInfo = container.compilerInfo || [],
          compilerRevision = compilerInfo[0] || 1,
          currentRevision = Handlebars.COMPILER_REVISION;

      if (compilerRevision !== currentRevision) {
        if (compilerRevision < currentRevision) {
          var runtimeVersions = Handlebars.REVISION_CHANGES[currentRevision],
              compilerVersions = Handlebars.REVISION_CHANGES[compilerRevision];
          throw "Template was precompiled with an older version of Handlebars than the current runtime. "+
                "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").";
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw "Template was precompiled with a newer version of Handlebars than the current runtime. "+
                "Please update your runtime to a newer version ("+compilerInfo[1]+").";
        }
      }

      return result;
    };
  },

  programWithDepth: function(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var program = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    program.program = i;
    program.depth = args.length;
    return program;
  },
  program: function(i, fn, data) {
    var program = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    program.program = i;
    program.depth = 0;
    return program;
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;
;
// lib/handlebars/browser-suffix.js
})(Handlebars);

    _module.Handlebars = Handlebars;
    return _module;

}(window.wigzo || {}));


window.wigzo = (function(_module) {

    _module.showNotification = function (data) {
        // console.log("Notification received..");
        // console.log(data);
        /*if (data.type != "InAppNotification") {
         console.log ("Not drawing this type of notification... " + data.type);
         return;
         }*/

        if(!!data.utmParameters) {
            var utmParameters = JSON.parse(data.utmParameters);
            if(utmParameters.enabled) {
                delete utmParameters.enabled;

                var utmParamKeys = Object.keys(utmParameters);
                for(var i=0; i<utmParamKeys.length; i++) {
                    var utmParamValue = _module.getQueryStringParams(utmParamKeys[i]);
                    if(!utmParamValue || utmParamValue!==utmParameters[utmParamKeys[i]]) {
                        wigzo.consoleDebug("UTM params mismatched...");
                        return;
                    }
                }
            }
        }

        data.langAlign = wigzo.getAlignmentByLang();

        var notifcationIframe = document.createElement('iframe');
        notifcationIframe.setAttribute('src',wigzo.APP + '/onsitepush/campaign/render/'+ data.campaign_id + "?_" + new Date().getTime());
        notifcationIframe.setAttribute('id', data.layoutId);
        notifcationIframe.setAttribute('style', "position: fixed; width: 100%; display: block; height: 100vh !important; top: 0; left: 0; right: 0;	bottom: 0; z-index: 93462627999;");
        notifcationIframe.setAttribute('scrolling', "no");
        document.body.appendChild(notifcationIframe);

        var trackOpenUrl = data.message.track_open_url;
        if(data.id) {
            //trackOpenUrl = trackOpenUrl + "?nDRId=" + data.id;
            //trackOpenUrl = wigzo.addQueryParam(trackOpenUrl, "nDRId", data.id);
            wigzo.$("#"+data.id).prop('href', trackOpenUrl);
        } if(data.actionUuid){
            //trackOpenUrl = trackOpenUrl + "?actionUuid=" + data.actionUuid;
            trackOpenUrl = wigzo.addQueryParam(trackOpenUrl, "actionUuid", data.actionUuid);
            wigzo.$(".wigzo-cta").prop('href', trackOpenUrl);
        }
    }

    return _module;

}(window.wigzo || {}));


window.wigzo = (function(_module) {

    _module["notificationtemplates"] = {};
    _module["notificationtemplates"]["WIGZOWEBPUSHTEMP0"] = '<div id="wigzonotify-top-right">\
                                                    <span style="display: none" id="wigzo-action-uuid">{{actionUuid}}</span>\
                                                    <div class="wigzonotify wigzo-removeable" role="alert"> \
                                                    <a id="toastButton" class="wigzo-close-button" role="button"></a> \
                                                      <div class="wigzo-notifylogo"><img src="{{message.icon}}"></div> \
                                                        <div class="wigzo-notifystart"> \
                                                            <div class="wigzo-notifytitle" style="text-align: {{langAlign}}">{{message.title}}</div> \
                                                            <div class="wigzo-notifydesc" style="text-align: {{langAlign}}">{{message.body}}</div> \
                                                        </div> \
                                                        <a class="testLink wigzo-cta wigzo-cta-ui {{actionUuid}}" target="_blank"> \
                                                           <div class="wigzo-notifyurl"><span>{{message.call_to_action_text}}</span></div> \
                                                        </a> \
                                                      </div>\
                                                    </div>';

    _module["notificationtemplates"]["WIGZOWEBPUSHTEMP1"] = '<div id="wigzonotify-top-right">\
                                                    <span style="display: none" id="wigzo-action-uuid">{{actionUuid}}</span>\
                                                    <div class="wigzonotify wigzo-removeable" role="alert"> \
                                                    <a id="toastButton" class="wigzo-close-button" role="button"></a> \
                                                       <div class="wigzo-notifystart" style="margin-left: 10px;"> \
                                                          <div class="wigzo-notifytitle" style="text-align: {{langAlign}}">{{message.title}}</div> \
                                                          <div class="wigzo-notifydesc" style="text-align: {{langAlign}}">{{message.body}}</div> \
                                                       </div> \
                                                       <a class="testLink wigzo-cta wigzo-cta-ui {{actionUuid}}" target="_blank"> \
                                                            <div class="wigzo-notifyurl"><span>{{message.call_to_action_text}}</span></div> \
                                                       </a> \
                                                     </div>\
                                                    </div>';

    _module["notificationtemplates"]["WIGZOWEBPUSHTEMP2"] = '<div id="wigzonotify-bottom-right">\
                                                                <span style="display: none" id="wigzo-action-uuid">{{actionUuid}}</span>\
                                                                <div class="wigzonotify wigzo-removeable" role="alert"> \
                                                                <a id="toastButton" class="wigzo-close-button" role="button"></a> \
                                                                  <div class="wigzo-notifylogo"><img src="{{message.icon}}"></div> \
                                                                      <div class="wigzo-notifystart"> \
                                                                          <div class="wigzo-notifytitle" style="text-align: {{langAlign}}">{{message.title}}</div> \
                                                                          <div class="wigzo-notifydesc" style="text-align: {{langAlign}}">{{message.body}}</div> \
                                                                      </div> \
                                                                      <a class="testLink wigzo-cta wigzo-cta-ui {{actionUuid}}" target="_blank"> \
                                                                            <div class="wigzo-notifyurl"><span>{{message.call_to_action_text}}</span></div> \
                                                                      </a> \
                                                                  </div> \
                                                                </div>';

    _module["notificationtemplates"]["WIGZOWEBPUSHTEMP3"] = '<div id="wigzonotify-bottom-right"> \
                                                                <span style="display: none" id="wigzo-action-uuid">{{actionUuid}}</span>\
                                                                <div class="wigzonotify wigzo-removeable" role="alert"> \
                                                                    <a id="toastButton" class="wigzo-close-button" role="button"></a> \
                                                                      <div class="wigzo-notifystart" style="margin-left: 10px;"> \
                                                                        <div class="wigzo-notifytitle" style="text-align: {{langAlign}}">{{message.title}}</div> \
                                                                        <div class="wigzo-notifydesc" style="text-align: {{langAlign}}">{{message.body}}</div> \
                                                                      </div> \
                                                                      <a class="testLink wigzo-cta wigzo-cta-ui {{actionUuid}}" target="_blank"> \
                                                                            <div class="wigzo-notifyurl"><span>{{message.call_to_action_text}}</span></div> \
                                                                      </a> \
                                                                </div> \
                                                              </div>';

    _module["notificationtemplates"]["WIGZOWEBPUSHTEMP4"] = '<div id="wigzonotify-center-block"> \
                                                                <span style="display: none" id="wigzo-action-uuid">{{actionUuid}}</span>\
                                                                <div class="wigzonotify-center-block-notify wigzo-removeable" role="alert"> \
                                                                    <a id="toastButton" class="wigzo-close-button" role="button"/></a> \
                                                                    <div class="wigzo-notifystart"> \
                                                                        <div class="wigzo-notifytitle" style="text-align: {{langAlign}}">{{message.title}}</div> \
                                                                        <div class="wigzo-notifydesc" style="text-align: {{langAlign}}">{{message.body}}</div> \
                                                                        <a class="wigzo-cta wigzo-cta-ui {{actionUuid}}" target="_blank">{{message.call_to_action_text}}</a> \
                                                                    </div> \
                                                                </div> \
                                                            </div>';

    _module["notificationtemplates"]["WIGZOWEBPUSHTEMP5"] = '<div id="wigzonotify-center-block-withimg"> \
                                                                <span style="display: none" id="wigzo-action-uuid">{{actionUuid}}</span>\
                                                                <div class="wigzonotify-center-block-notify wigzo-removeable" role="alert"> \
                                                                    <a id="toastButton" class="wigzo-close-button" role="button"/></a> \
                                                                    <div class="wigzo-notifystart"> \
                                                                        <div class="wigzo-notifytitle" style="text-align: {{langAlign}}">{{message.title}}</div> \
                                                                    </div> \
                                                                    <div class="wigzo-notifylogo"><img src="{{message.icon}}"></div> \
                                                                    <div class="wigzo-notifystart"> \
                                                                        <div class="wigzo-notifydesc" style="text-align: {{langAlign}}">{{message.body}}</div> \
                                                                        <a class="wigzo-cta wigzo-cta-ui {{actionUuid}}" target="_blank">{{message.call_to_action_text}}</a> \
                                                                    </div> \
                                                                </div> \
                                                            </div>';


    _module["notificationtemplates"]["WIGZOWEBPUSHTEMP6"] = '<div id="wigzonotify-center-block-withlogo"> \
                                                                <span style="display: none" id="wigzo-action-uuid">{{actionUuid}}</span>\
                                                                <div class="wigzonotify-center-block-notify wigzo-removeable" role="alert"> \
                                                                    <a id="toastButton" class="wigzo-close-button" role="button"/></a> \
                                                                    <div class="wigzo-notifylogo"><img src="{{message.icon}}"></div> \
                                                                    <div class="wigzo-notifystart"> \
                                                                        <div class="wigzo-notifytitle" style="text-align: {{langAlign}}">{{message.title}}</div> \
                                                                        <div class="wigzo-notifydesc" style="text-align: {{langAlign}}">{{message.body}}</div> \
                                                                        <a class="wigzo-cta wigzo-cta-ui {{actionUuid}}" target="_blank">{{message.call_to_action_text}}</a> \
                                                                    </div> \
                                                                </div> \
                                                            </div>';

    _module["notificationtemplates"]["WIGZOWEBPUSHTEMP7"] = '<div id="wigzonotify-center-block-withimg"> \
                                                                <span style="display: none" id="wigzo-action-uuid">{{actionUuid}}</span>\
                                                                <div class="wigzonotify-center-block-notify wigzo-removeable" role="alert"> \
                                                                    <a id="toastButton" class="wigzo-close-button" role="button"/></a> \
                                                                    <div class="wigzo-notifylogo">\
                                                                        <a class="wigzo-cta {{actionUuid}}" target="_blank"><img src="{{message.icon}}"></a>\
                                                                    </div> \
                                                                </div> \
                                                            </div>';

    return _module;
}(window.wigzo || {}));


window.wigzo = (function(_module) {
    _module.log = function () {
        var localStorageDebug = false;
        if (!! localStorage && !! localStorage.debug && (localStorage.debug === '*' || localStorage.debug == 'wigzo')) {
            localStorageDebug = true;
        }
        if(_module["DEBUG"] || localStorageDebug) {
            var args = ["wigzo.js"];
            for (var i in arguments) {
                args[args.length] = arguments[i];
            }
            console.debug.apply (console, args);
        }
    }
    _module.consoleDebug = _module.log;

    _module.error = function () {
        var args = ["wigzo.js"];
        for (var i in arguments) {
            args[args.length] = arguments[i];
        }
        console.error.apply (this, args);
    }

    _module.isOpera = function () {
        return !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    }
    _module.isFirefox = function () {
        return typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
    }
    _module.isSafari = function () {
        return (navigator.vendor != null && navigator.vendor.indexOf('Apple') > -1) &&
            (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
    }
    _module.isChrome = function () {
        return !!window.chrome && !_module.isOpera();
    }
    _module.isIE = function () {
        return /*@@cc_on!@@*/false || !!document.documentMode; // At least IE6
    }

    _module.validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    _module.maskPhone = function(e) {
        /*var langName = wigzo.checkLang();
         var x = e.target.value.replace(/\D/g, '').match(_module.helpers.maskPhoneLang[langName].regx);
         e.target.value = _module.helpers.maskPhoneLang[langName].validTxt;*/

        switch (wigzo.checkLang()){

            case "pt-br":
                var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,9})/);
                e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2];
                break;

            case "ar":
                var x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,1})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '');
                break;

            default :
                var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '');
                break;
        }
        return e.target.value;
   /**/ }

    _module.validatePhone = function(phone) {
        /*var re = /^\d{10}$/;*/
        /*var langName = wigzo.checkLang();
         var re = _module.helpers.maskPhoneLang[langName].validRule;*/

        var  globalPhoneRegex = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;


        /*switch (wigzo.checkLang()){
            case "pt-br":
                var re = /^\(?[\d]{2}\)?[\s-]?[\d]{9}$/;
                break;
            case "ar":
                var re = /^\(?[\d]{4}\)?[\s-]?[\d]{1}[\s-]?[\d]{4}$/;
                break;
            case "sr-BA":
            case "sr-SP":
                var re = /^\(?:[0-9] ?\){6,14}[0-9]$/;
                break;

            default :
                var re = /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/;
                break;
        }*/
        return globalPhoneRegex.test(phone);
    }

    _module.getAlignmentByLang = function () {
        var rtlLangs = ["ar", "ur", "fa", "he"];
        var lang = _module.checkLang();
        if(rtlLangs.indexOf(lang)>=0) {
            return "right";
        }
        return "left";
    }

    _module.checkLang = function () {
        var lang = "en-US";
        if(!!document.documentElement.lang) {
            lang = document.documentElement.lang;
        }
        return lang;
    }

    _module.isWigzoScriptDisabled = function () {
        if (!window.hasOwnProperty('WIGZO_ENABLED')) {
            window.WIGZO_ENABLED = true;
        }
        // if disable script return true
        return !window.WIGZO_ENABLED;
    }

    _module.getQueryStringParams = function(sParam, url) {
        if(!url) {
            url = window.location.search.substring(1);
        }
        var sURLVariables = url.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

    _module.hasQueryParam = function(sParam, url) {
        if(!url) {
            url = window.location.search.substring(1);
        }
        var sURLVariables = url.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return true;
            }
        }
        return false;
    }

    _module.addQueryParam = function(url, key, value) {
        var exitingUrl = url;
        var separator = exitingUrl.indexOf('?')<0 ? '?' : '&';
        var newUrl = url + separator + key +'=' + value;
        return newUrl;
    }

    _module.uuid4 = function () {
        var val = _module.getKey("WIGZO_PERSIST_COOKIE");
        if (!! val) {
            return val;
        }

        val = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        _module.setKey ("WIGZO_PERSIST_COOKIE", val);
        return val;
    }

    _module.xhr = function (method, url, successFn, errorFn, dataType, data, headers) {
        url = _module.addQueryParam(url, "_siteid", _module.ORGANIZATIONID);

        var opts = {
            cache: false,
            context: _module,
            success: successFn,
            contentType: "application/json",
            error: errorFn,
            method: method,
            timeout: 5000,
            dataType: dataType
        }
        if(dataType==='jsonp') {
            opts["jsonp"] = "wigzo_callback";
        }
        if (!! data) {
            opts["data"] = JSON.stringify(data);
        }
        if(!!headers) {
            opts["headers"] = headers;
        }
        _module.$.ajax (url, opts);

        return null;
    }

    _module.get = function (url, successFn, errorFn, dataType, headers) {
        dataType = dataType || "json";
        _module.xhr ("GET", url, successFn, errorFn, dataType, null, headers);
    }

    _module.post = function (url, data, successFn, errorFn, dataType, headers) {
        dataType = dataType || "json";
        _module.xhr ("POST", url, successFn, errorFn, dataType, data, headers);
    }

    _module.jsonp = function (url, successFn, errorFn, headers) {
        _module.xhr("GET", url, successFn, errorFn, "jsonp", null, headers);
    }

    _module.popupwindow = function (url, title, w, h) {
        var left = (screen.width-w)/2;
        var top = (screen.height-h)/2;
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    }

    _module.openPopUp = function (url) {
        var newWindow = _module.popupwindow (url, "Subscribe to notifications", 600, 400);
        window.addEventListener('message', function(e) {
            if(e.data && e.data.type === "HTTP_WILDCARD"){
                var message = e.data;
                newWindow.close();
            }
        });
        return newWindow;
    };

    _module.setKey = function (key, val, expiry) {
        var now = new Date() / 1000;
        localStorage.setItem(key, val);
        localStorage.removeItem (key + ":expiry");

        if (!! expiry) {
            var expires = parseInt(now + expiry);
            localStorage.setItem(key + ":expiry", expires);
        }
    };

    _module.getKey = function (key) {
        var item = localStorage.getItem (key);
        var now = parseInt (new Date() / 1000);

        if (! item) {
            return null;
        }
        var expiry = parseInt (localStorage.getItem (key + ":expiry"));
        if (! expiry) {
            return item;
        }

        if (now > expiry) {
            localStorage.removeItem (key);
            localStorage.removeItem (key + ":expiry");
            return null;
        }
        return item;
    };

    _module.saveRegistrationId = function (url, browserType, requestData, success, error) {
        _module.post (_module.APP + url, requestData,function (data) {
            if (!! data.status && data.status === "success") {
                _module.subscribed (true);
                _module.log ("Successfully saved Registration ID!");
                if (data.create) {
                    _module('send', 'pushallowed', requestData);
                }
                if (!! success) {
                    success.call(_module, data.create);
                }
            }
        }, function () {
            _module.log ("Error in Saving Registration ID!");
            if (!! error) {
                error.call (_module);
            }
        });
    }

    _module.exception = function (codeId, reason) {
        var exc = {
            code: codeId,
            reason: reason,
        }
        if (typeof wigzo === "function") {
            wigzo("send", "exception", exc);
        } else {
            _module.send ("exception", exc)
        }
    }

    _module.detectHost = function (encode) {
        encode = typeof ("encode") === "undefined" ? true : false;

        if (encode) {
            return encodeURIComponent(window.location.toString());
        } else {
            return window.location.toString();
        }
    }

    _module.loadjscssfile = function(filename, filetype, mediatag){
        _module.loadedFiles = _module.loadedFiles || new Set();
        if (_module.loadedFiles.has(filename)) {
            return;
        }
        _module.loadedFiles.add(filename);
        if (filetype=="js"){ //if filename is a external JavaScript file
            var fileref=document.createElement('script')
            fileref.setAttribute("type","text/javascript")
            fileref.setAttribute("src", filename)
        }
        else if (filetype=="css"){ //if filename is an external CSS file
            var fileref=document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            if(null != mediatag){
                fileref.setAttribute("media", mediatag)
            }
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref!="undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref)

    }

    _module.getEcommercePlatform = function () {
        var url = document.querySelector('link[rel="shortcut icon"]');
        var via = "";
        if(window.hasOwnProperty("Shopify")){
            via = "shopify";
        }
        if(!!_module.$('meta[name=generator]').attr("content") && _module.$('meta[name=generator]').attr("content") === "PrestaShop"){
            via = "prestashop";
        }
        if(typeof url !== 'undefined' && url !== null && url !== '') {
            var provider = '';
            var a = document.createElement('a');
            a.href = url.href;
            provider = a.hostname.split('.')[1];
            if(provider !== null && typeof provider !== 'undefined' && provider !== '' && provider === "bigcommerce"){
                via = "custom";
            }
        }
        if(window.hasOwnProperty("ms_store")){
            via = "storehippo";
        }
        return via;
    }


    return _module;
}(window.wigzo || {}));


window.wigzo = (function(_module) {

    _module.registerWebPushHelper = function (subscription, method) {
        _module.log ("Registering for WEBPUSH: " + subscription.endpoint);
        var url =  "/rest/v1/push/register-subscription";

        var jsonData = {
            subscription: subscription,
            orgtoken: _module.ORGANIZATIONID,
            method: method,
            cookie: _module.IDENTIFIER
        };


        _module.saveRegistrationId (url, "CHROME", jsonData, function (createdNew) {
            _module.setKey("WIGZO_PUSH_VERSION", "v3", 7 * 24 * 3600);
            _module.mapBrowser(_module.IDENTIFIER, subscription.endpoint, "GCM");
            _module.log ("WEBPUSH Registration Done!");
        }, function (e) {
            _module.log ("WEBPUSH Registration Failed!", e);
        });

        _module.subscribed ("true");
    }

    _module.WebPushHttpsManager = function () {

        this.getPermissionState = function(){
            return Notification.permission;
        }
        this.needSubscription = function () {
            if (window.location.protocol === "https:") {
                _module.log ("HTTPs permission state is default, asking for subscription.");
                return true;
            }

            return false;
        }

        this.pushSubscribe = function (serviceWorkerRegistration) {
            var manager = this;

            /*serviceWorkerRegistration.pushManager.permissionState({userVisibleOnly: true}).then(function(PushMessagingState) {*/
            serviceWorkerRegistration.pushManager.permissionState(_module.subscribeOptions).then(function(PushMessagingState) {
                // Possible states : 'prompt', 'denied', or 'granted'.
                _module.log ("Present permissions: " + Notification.permission);

                if (! serviceWorkerRegistration.showNotification) {
                    _module.subscribed ("block");
                    _module.log ('Notifications aren\'t supported.', null);
                } else if (Notification.permission === 'denied') {
                    _module.subscribed ("block");
                    _module.log ('The user has blocked notifications.', null);
                } else if (!('PushManager' in window)) {
                    _module.subscribed ("block");
                    _module.error ('Push messaging isn\'t supported.', null);
                } else {
                    // Subscribe if all checks valid.
                    _module.log ("Asking for Permission.");
                    /* Lets check if need to use HTTP method becuase of manifest */
                    var presentManifestPath = _module.$ ("link[rel=manifest]").attr ("href");
                    if (!! presentManifestPath) {
                        _module.$ ("link[rel=manifest]").attr ("href", _module.MANIFEST_PATH);
                    } else {
                        var manifest = _module.$('<link rel="manifest" href="' + _module.MANIFEST_PATH + '" /></head>');
                    }
                    _module.$("head").prepend (manifest);

                    //ShowOverlay
                    if (Notification.permission !== 'granted') {
                        _module.showOverlayIfNeeded();
                    }

                    Notification.requestPermission().then(function(permission) {
                        if ('default' == permission) {
                            // If user has cancelled the prompt then do not proceed
                            // Otherwise pushManager.subscribe will prompt again.
                            return
                        }
                        /*serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true}).then(function(pushSubscription) {*/
                        serviceWorkerRegistration.pushManager.subscribe(_module.subscribeOptions).then(function(pushSubscription) {
                            _module.log ("Got permission, getting registration Id");
                            _module.hideOverlay();
                            /*registrationId = pushSubscription.endpoint.split('/').pop();*/
                            _module.registerWebPushHelper(pushSubscription.toJSON(), "HTTPS");
                            _module.exception ("ManifestOK", _module.detectHost (false));
                        })["catch"] (function (e) {
                            //HideOverlay in any case
                            _module.hideOverlay();
                            // Following functionality will unsubscribe the user first if user is subscribed to some other service than wigzo.
                            if (e.name === "InvalidStateError" && e.message.indexOf('resubscribe')) {
                                serviceWorkerRegistration.pushManager.getSubscription().then(
                                    function(pushSubscription) {
                                        pushSubscription.unsubscribe().then(function(successful) {
                                            if (successful) {
                                                manager.pushSubscribe(serviceWorkerRegistration);
                                            }
                                        })
                                    });
                                return;
                            }
                            if (e.name === "NotAllowedError") {
                                /* User blocked the notification prompt, lets just abort everything */
                                _module.log ("User blocked the notification prompt.");
                                _module.subscribed ("block");
                                return;
                            }
                            //Commented as Manifest is not requried anymore
                            /*if (e.toString().indexOf ("manifest empty or missing")) {
                                _module.exception ("Manifest404Exception", _module.detectHost (false));

                                _module.log ("Downgrading to HTTP experience till we find Manifest file..");
                                manager = new _module.WebPushHttpManager(true);
                                manager.initialize ();
                            }*/
                        });
                    });
                }
            });
        }

        this.onServiceWorkerRegistered = function () {
            // This function is no longer needed as we don't need service worker to be ready
            // It won't work get ready at all if scope is different than currently applicable
            // And we don't really need that to do push subscriptions
            _module.log ("Waiting for Service Worker to be ready...");
            var manager = this;
            navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
                _module.log ("WEBPUSH: Service Worker Ready..");
                serviceWorkerRegistration.update();
                manager.pushSubscribe(serviceWorkerRegistration);
            })["catch"] (function (e) {
                _module.error (e.toString());
            });
        }

        this.registerServiceWorker = function () {
            _module.log("WEBPUSH: Service Worker Registering.");
            var manager = this;
            var options = !!_module.SERVICE_WORKER_SCOPE ? {scope: _module.SERVICE_WORKER_SCOPE} : {};

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register (_module.SERVICE_WORKER_PATH, options).then(function (registration) {
                    _module.log ("WEBPUSH: Service Worker Registered!");
                    manager.pushSubscribe(registration);
                    _module.exception ("ServiceWorkerOK", _module.detectHost (false));
                })["catch"] (function (reason) {
                    _module.error("serviceWorker.register failed: ", reason);
                    _module.exception ("ServiceWorker404Exception", _module.detectHost (false));

                    //Do not auto downgrade as code forces HTTP optin in incognito mode. To force HTTP enable through dashboard.
                    /*_module.log ("Downgrading to HTTP experience till we find Service Worker..");
                    manager = new _module.WebPushHttpManager(true);
                    manager.initialize ();*/
                });
            } else {
                _module.error ('Service workers aren\'t supported in this browser.');
            }
        }

        this.initialize = function (successFn) {
            _module.log("WebPushHttp(s)Manager initalizing.");
            successFn ();
        }

        this.subscribe = function () {

            var self = this;
            if (this.getPermissionState() == 'default') {
                // invoke subscription dialog / wait for time delay if required
                _module.invokeSubscriptionDialog( function(isConfirm){
                    if(isConfirm){
                        self.registerServiceWorker();
                    } else {
                        //lets not ask user for next 1 day
                        _module.setPushDelayed();
                        _module.log ("User postponed subscription..");
                    }
                });
            } else if (this.getPermissionState() == 'granted') {
                self.registerServiceWorker();
            }
        }
    }

    _module.WebPushHttpManager = function (bFromHttps) {
        this.invokedFromHttps = bFromHttps;
        this.permissionState = false;

        this.getPermissionState = function(){
            return this.permissionState;
        }

        this.needSubscription = function () {
            if (this.permissionState === "default") {
                _module.log ("HTTPs permission state is default, asking for subscription.");
                return true;
            }
            return false
        }

        this.askToCloseModal = function () {
            var innerHTML = _module.getMarkup (_module.html.POST_HTML_PERMISSION_MODAL);

            var bodyElt = document.getElementsByTagName("body")[0];
            var dialog_div = document.createElement('div');
            dialog_div.className = "http_force_open_dialog";
            dialog_div.innerHTML = innerHTML;
            bodyElt.appendChild(dialog_div);

            _module.$ (".wig-autoremove").click (function () {
                _module.log ("Opening Popup for HTTP Post Permission Subscribe.");
                _module.$ (".http_force_open_dialog").remove ();
                _module.popout = _module.openPopUp (_module.HTTP_PARTIAL + "/jserver/v1/push/popup/" + _module.ORGANIZATIONID + "/" + _module.IDENTIFIER + "?via=" + "WebPush");

                _module.subscribed ("true");
                _module.log ("Done!");
            });

            _module.$ (".wigzologoclickable").click (function (e) {
                var target = _module.ENTITY_SITE_URL;
                _module.$ (this).attr ("href", target);
            });
        }

        this.listenToIFrameEvents = function () {
            _module.log ("Listening to IFrame Events..");

            var context = this;

            window.addEventListener('message', function (event) {
                message = event.data;
                console.log(message);
                if (! message) {
                    _module.error ("Invalid Message Recived by listenToIFrameEvents.");
                    return;
                }

                if (message.type === 'CONSOLE_LOG') {
                    _module.log.apply (this, message.arguments);
                    return;
                }
                else if (message.type == "SHOW_OVERLAY") {
                    var showOrHide = message.status;
                    if (showOrHide) {
                        _module.showOverlayIfNeeded();
                    }else {
                        _module.hideOverlay()
                    }
                }
                else if (message.type == "STATE_INFO") {
                    _module.log ("Current Permissions: " + message.status);
                    context.permissionState = message.status;
                    if (!! context.successFn) {
                        context.successFn();
                    } else {
                        context.subscribe ();
                    }
                }
                else if (message.type === 'HTTP_WILDCARD') {
                    if (message.status === "granted") {
                        _module.log ("Permissions aquired! One more step to finish. Let user close the modal first.");
                        /*if (! _module.isMapped ("BROWSER") || context.permissionState == "default") {
                            context.askToCloseModal ();
                        }*/
                    }
                    else if (message.status == "save") {
                        _module.registerWebPushHelper (message.registrationData, "HTTP_WILDCARD");
                    }
                    else {
                        _module.error ("Permission denied! Aborting...");
                        _module.subscribed ("block");
                    }
                }

                else {
                    _module.log ("Unknown message: ", message);
                }
            });

        }

        this.initialize = function (successFn) {
            /* Load IFrame for HTTP subscription */
            this.successFn = successFn;
            _module.log ("WebPushHttpManager initalizing.");

            /*this.iframe = document.createElement ('iframe');
            this.iframe.style.display = "none";
            this.iframe.src = _module.HTTP_PARTIAL + "/jserver/v1/push/frame/" + _module.ORGANIZATIONID + "/subscribe";
            document.body.appendChild(this.iframe);*/

            this.listenToIFrameEvents ();

            var item = _module.getKey("WIGZO_PUSH_ENABLED");
            _module.log("WIGZO_PUSH_ENABLED:", item);
            if(item === "true" || item === "block"){
                return false;
            }
            if (!! this.successFn) {
                this.successFn();
            } else {
                this.subscribe();
            }

        }

        this.subscribe = function () {
            var self = this;

            if(this.invokedFromHttps === true){ // this http has been invoked from https downgrading
                //self.iframe.contentWindow.postMessage ("askpermission", "*")
                _module.askPopout = _module.openPopUp (_module.HTTP_PARTIAL + "/jserver/v1/push/popup/" + _module.ORGANIZATIONID + "/" + _module.IDENTIFIER + "?via=" + "WebPush&action=askfirst&v=2");
            }else {
                // invoke subscription dialog/ wait for time delay if required
                _module.invokeSubscriptionDialog( function(isConfirm){
                    if(isConfirm){
                        //self.iframe.contentWindow.postMessage ("askpermission", "*")
                        _module.askPopout = _module.openPopUp (_module.HTTP_PARTIAL + "/jserver/v1/push/popup/" + _module.ORGANIZATIONID + "/" + _module.IDENTIFIER + "?via=" + "WebPush&action=askfirst&v=2");
                    } else {
                        //lets not ask user for next 1 day
                        _module.setPushDelayed();
                        //_module.track('pushignored');
                        _module.log ("User postponed subscription..");
                    }
                }, 'HTTP');
            }
        }
    }

    _module.WebPushManager = function (onSuccess, onError) {
        onSuccess = onSuccess || function() {};
        onError = onError || function() {};

        this.manager = null;
        var requestProtocol = window.location.protocol.toString();

        if (requestProtocol.substr(0, 5) === "http:" || _module.HTTP_COHOST != "" || _module.FORCE_HTTP) {
            this.manager = new _module.WebPushHttpManager(false);
        } else if (requestProtocol.substr(0, 5) === "https") {
            this.manager = new _module.WebPushHttpsManager();
        } else {
            _module.error ("Strange Protocol! Cannot subscribe over: " + requestProtocol);
            return;
        }


        this.needSubscription = function () {
            if (! 'ServiceWorker' in window) {
                _module.log ("ServiceWorker is not Supported in this browser");
                return false;
            }

            if(this.manager.getPermissionState() === 'denied'){
                _module.log ("Notification permission is denied for this browser instance");
                return false;
            }

            if(_module.isPushDelayed() || _module.isPushBlocked()){
                _module.log ("Notification permission is delayed/ blocked for a day");
                return false;
            }

            //TODO to be removed after one year of using web push protocol. Remove this after 27th September 2019.
            if (_module.getKey('WIGZO_PUSH_VERSION') === 'v3') {
                return false;
            }

            if (this.manager.needSubscription ()) {
                return true;
            }

            var item = _module.getKey ("WIGZO_PUSH_ENABLED");
            _module.log ("WIGZO_PUSH_ENABLED:", item);
            if (item === "true" || item === "block") {
                return false;
            }
            /*if (_module.isMapped ("BROWSER")) {
                _module.log ("Browser is already Mapped!");
                _module.subscribed ("true");
                return false;
            }*/

            return true;
        }

        this.subscribe = function () {
            return this.manager.subscribe ();
        }

        _module.log ("Subscribing using Web Push Notifications Sub-System");

        var ctx = this;
        this.manager.initialize (function () {
            onSuccess.call (ctx, ctx);
        });

    }

    return _module;

}(window.wigzo|| {}));



window.wigzo = (function(_module) {

    _module.SafariManager = function (successFn) {
        this.successFn = successFn;

        this.subscribe = function () {
            _module.log ("Subscribing using Safari Notifications Sub-System");

            if ('safari' in window && 'pushNotification' in window.safari) {
                var self = this;
                // invoke subscription dialog/ wait for time delay if required
               _module.invokeSubscriptionDialog( function(isConfirm){
                    if(isConfirm){
                        var permissionData = window.safari.pushNotification.permission (_module.SAFARI_WEBPUSH_ID);
                        self.safariCheckOrSubscribe (permissionData);
                    } else {
                        //lets not ask user for next 1 day
                        _module.setPushDelayedSafari();
                        //_module.track('pushignored');
                        _module.log ("User postponed subscription..");
                    }
                },'HTTPS','safari');

            } else {
                _module.log ("Sorry, Your browser can not receive Safari Push Notifications.");
            }
        }

        this.safariCheckOrSubscribe = function (permissionData) {

            if (permissionData.permission === 'default') {
                this.performNewSafariSubscription (permissionData)
            }

            else if (permissionData.permission === 'denied') {
                _module.log ("Safari push subscription denied.");
            }

            else if (permissionData.permission === 'granted') {
                _module.log ("Safari push subscription granted.");
                this.registerDeviceToken (permissionData);
            }

        }

        this.performNewSafariSubscription = function (permissionData){
            var domain = window.location.protocol + "//" + window.location.host;
            //ShowOverlay
            //_module.showOverlayIfNeeded();   //Commented till Safari push is fixed

            var that = this;
            window.safari.pushNotification.requestPermission(
                _module.APP,            // The web service URL.
                _module.SAFARI_WEBPUSH_ID,        // The Website Push ID.
                {
                    orgtoken: _module.ORGANIZATIONID,
                    domain: domain,
                },                     // userInfo - Data that you choose to send to your server to help you in identification.
                function (permissionData) {
                    _module.hideOverlay();
                    that.safariCheckOrSubscribe (permissionData);
                }   // The callback function.
            );

        }

        this.registerDeviceToken = function (permissionData){

            if (permissionData.permission === 'granted' && permissionData.deviceToken) {  //TODO before registering device token check if it is already mapped or registered
                var requestData = {
                    deviceToken: permissionData.deviceToken,
                    orgtoken: _module.ORGANIZATIONID,
                    cookie: _module.IDENTIFIER,
                    websitePushID: _module.SAFARI_WEBPUSH_ID,
                    protocol: "HTTPS"
                };
                var url = "/rest/v1/push/register-devicetoken"
                _module.saveRegistrationId (url, "SAFARI", requestData, function () {
                    _module.mapBrowser(_module.IDENTIFIER, permissionData.deviceToken, "SAFARI");
                    _module.log ("SAFARI Registration Done!");
                }, function (e) {
                    _module.log ("SAFARI Registration Failed!" + e);
                });
            }

        }

        this.needSubscription = function () {
            if( Notification.permission === "denied" ){
                _module.log ("Notification permission is denied for this browser instance.");
                return false;
            }

            if(_module.isPushDelayed()){
                _module.log ("Notification permission is delayed for a day");
                return false;
            }

            var item = _module.getKey ("WIGZO_PUSH_ENABLED");
            _module.log ("WIGZO_PUSH_ENABLED:", item);
            if (item === "true" || item === "block") {
                return false;
            }
            if (_module.isMapped ("BROWSER")) {
                _module.log ("Browser is already Mapped!");
                _module.subscribed ("true");
                return false;
            }

            return true;
        }

        this.successFn.call (this, this);

    }

    return _module;

}(window.wigzo|| {}));



window.wigzo = (function(_module) {
    _module.subscribed = function (val) {
        if (val === "block") {
            _module.log ("Disable wigzo to hop for next 3 days");
            _module.setKey("WIGZO_PUSH_ENABLED", val, 3 * 24 * 3600);     /* Lets recheck after 3 days */
            _module.track('pushblocked');
        } else {
            _module.setKey("WIGZO_PUSH_ENABLED", val, 60 * 24 * 3600);  //Expire in 60 days
        }
    }

    _module.setPushDelayed = function () {
        if (_module.PUSH_SETTINGS && _module.PUSH_SETTINGS.hasOwnProperty('optin') && _module.PUSH_SETTINGS.optin.type === 'DIALOG') {
            // To support old PUSH_SETTINGS already saved, additionaly checking presence of popupInterval key
            if (_module.PUSH_SETTINGS.optin.hasOwnProperty('popupInterval') && _module.PUSH_SETTINGS.optin.popupInterval) {
                duration = _module.PUSH_SETTINGS.optin.popupInterval.duration;
                durationType = _module.PUSH_SETTINGS.optin.popupInterval.durationType;
                if (durationType == 'MINUTES') {
                    duration = duration * 60;
                } else if (durationType == 'HOURS') {
                    duration = duration * 3600;
                } else if (durationType == 'DAYS') {
                    duration = duration * 3600 * 24;
                } else if (durationType == 'WEEKS') {
                    duration = duration * 3600 * 24 * 7;
                }
                _module.setKey("WIGZO_PUSH_STATUS", 'delayed', duration);
                //_module.track('pushignored');
                /* Lets recheck after custom duration */
            }
        } else if (_module.PUSH_SETTINGS && _module.PUSH_SETTINGS.hasOwnProperty('optin') && _module.PUSH_SETTINGS.optin.type === 'BELL') {
                // Dont set delay as bell will be persistent
        } else {
            //_module.track('pushignored');
            _module.setKey("WIGZO_PUSH_STATUS", 'delayed', 24 * 3600);
            /* Lets recheck after 1 day. */
        }

    }

    _module.setPushDelayedSafari = function () {
        _module.setKey("WIGZO_PUSH_STATUS", 'delayed', 90 * 86400);     /* Lets recheck after 3 months when we fix Safari. */
    }
    _module.isPushDelayed = function () {
        return _module.getKey("WIGZO_PUSH_STATUS") === 'delayed';
    }

    _module.isPushBlocked = function () {
        return _module.getKey("WIGZO_PUSH_ENABLED") === 'block';
    }

    _module.setOverlayDisplayed = function () {
        if(_module.PUSH_SETTINGS && _module.PUSH_SETTINGS.hasOwnProperty('optin') && _module.PUSH_SETTINGS.optin.hasOwnProperty('popupInterval') && _module.PUSH_SETTINGS.optin.popupInterval) {
            duration = _module.PUSH_SETTINGS.optin.popupInterval.duration;
            durationType = _module.PUSH_SETTINGS.optin.popupInterval.durationType;
            if(durationType == 'MINUTES') {
                duration = duration * 60;
            }else if(durationType == 'HOURS') {
                duration = duration * 3600;
            }else if(durationType == 'DAYS') {
                duration = duration * 3600 * 24;
            }else if(durationType == 'WEEKS') {
                duration = duration * 3600 * 24 * 7;
            }
            _module.setKey("WIGZO_PUSH_OVERLAY", 'true', duration);     /* Lets recheck after custom duration */
        }else {
            _module.setKey("WIGZO_PUSH_OVERLAY", 'true', 3 * 24 * 3600);     /* Lets recheck after 1 day */
        }
    }

    _module.isOverlayAlreadyShown = function () {
        return _module.getKey("WIGZO_PUSH_OVERLAY") === 'true';
    }

    _module.needSubscription = function () {
        if (! _module.FEATURES.BrowserPushNotification) {
            _module.log ("Skipping Notification Sub-System, because its not enabled in the Features.");
            return false;
        }

        if (!("Notification" in window)) {
            _module.log ("This browser does not support desktop notification");
            return false;
        }

        if (_module.isPushDelayed()) {
            _module.log ("Browser push is delayed for a day.");
            return false;
        }

        _module.helpers.detectPrivateMode(function (inPrivate) {
            if(inPrivate) {
                return false
            }
        });

        return true;

    }

    _module.invokeSubscriptionDialog = function(cb, via, browser){
        browser = browser || 'other';
        if(browser == 'safari'){
            _module.setPushDelayedSafari ();
        }else {
            _module.setPushDelayed ();
        }
        via = via || 'HTTPS';
        var timeOut = 0; // in seconds

        if (_module.PUSH_SETTINGS && _module.PUSH_SETTINGS.hasOwnProperty('optin') && _module.PUSH_SETTINGS.optin.timeDelay) {
            timeOut = _module.PUSH_SETTINGS.optin.timeDelay;
        }

        setTimeout(function(){
            showDialogOptIn(cb, via);
        }, timeOut*1000);
    }

    _module.showOverlayIfNeeded = function () {
        if (_module.PUSH_SETTINGS && _module.PUSH_SETTINGS.hasOwnProperty('overlay') && _module.PUSH_SETTINGS.overlay.isEnabled
            && !_module.isOverlayAlreadyShown() && !navigator.platform.includes("iPhone")) {

            _module.setOverlayDisplayed(); //disable overlay for next 1 day

          _module.helpers.detectPrivateMode( function (isPrivateMode) {
              if(!isPrivateMode) {
                var deviceType = _module.helpers.getDeviceType();

                /*var langAlign = wigzo.getAlignmentByLang();*/
                var brandingUrl = 'https://www.shiprocket.in/engage360/?utm_source=powered&utm_medium=optin_dialog&utm_campaign=app&utm_term=' + _module.ORGANIZATIONID;

                var iframeSrc = _module["pushoverlaymarkup"];
                iframeSrc = iframeSrc.replace('$PUSH_TITLE$', _module.PUSH_SETTINGS.overlay.title || 'Click on Allow to receive notifications');
                iframeSrc = iframeSrc.replace('$PUSH_SUBTITLE$', _module.PUSH_SETTINGS.overlay.subtitle || 'Stay updated with the latest happenings on our site');
                iframeSrc = iframeSrc.replace('$PUSH_BRANDING_URL$', _module.ENTITY_BRANDING_URL);
                iframeSrc = iframeSrc.replace("$POWEREDBYLOGO$", _module.ENTITY_FAV_ICON_LIGHT);

                var bodyElt = document.getElementsByTagName("body")[0];
                var wigzoPushDialogIframeDiv = document.createElement('div');
                wigzoPushDialogIframeDiv.id = "wigzo-push-overlay-iframe-div";
                wigzoPushDialogIframeDiv.innerHTML = iframeSrc;
                // wigzoPushDialogIframeDiv.style= "position: fixed; top:0; left:0; right:0; bottom:0; width: 100% !important; height: 100% !important; outline: 0 !important; border: 0 !important; z-index: 2147483000!important; margin: 0 !important; padding: 0 !important;";
                bodyElt.appendChild(wigzoPushDialogIframeDiv);

                if (_module.isSafari()) {
                  var deskElement = document.getElementById('connectDesktop');
                  if (deskElement !== null) {
                    deskElement.style.display = "none";
                  }
                  var safariElement = document.getElementById('connectSafari');
                  if (safariElement !== null) {
                    safariElement.style.display = "block";
                  }
                }

                if (_module.PUSH_SETTINGS.hideBranding) {
                  if (document.getElementById('wigzo-push-branding')) {
                    document.getElementById('wigzo-push-branding').style.display = "none";
                  }
                }

                if (deviceType === 'mobile') {
                  window.addEventListener("scroll", function () {
                    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                      document.getElementById("wigzo-push-overlay-iframe-div").setAttribute("style", "display: none;")
                    } else {
                      document.getElementById("wigzo-push-overlay-iframe-div").setAttribute("style", "display: block;")
                    }
                  });
                }
              } else {
                _module.consoleDebug("Overlay disabled - private browsing");
              }
          });
        } else {
            _module.consoleDebug("Overlay is disabled");
        }
    }

    _module.hideOverlay = function () {
        if(wigzo.$('#wigzo-push-overlay-iframe-div').length>0) {
            wigzo.$('#wigzo-push-overlay-iframe-div').remove();
        }
    }

    _module.notificationSystemStart = function () {
        if (! _module.needSubscription ()) {
            _module.log ("No need to prompt for Notification. Returning.");
            return;
        }
        var via = _module.getEcommercePlatform();
        if (via == 'bigcommerce') {
          var pushNotificationIframe = document.createElement('iframe');
          pushNotificationIframe.setAttribute('src', '/content/index.html');
          pushNotificationIframe.setAttribute('id', "wigzo-push-notif-iframe-div");
          pushNotificationIframe.style.display = 'none';
          document.body.appendChild(pushNotificationIframe);
          return; // Let iframe handle registration
        }

        _module.log ("Initializing Notification Sub-System");

        // init notification subsystem
        var notificationManager;
        var onSuccess = function (mgr) {
            if (! mgr.needSubscription ()) {
                _module.log ("Manager doesn't require subscription. Returning..");
                return;
            }
            mgr.subscribe ();
        }

        _module.subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: _module.urlBase64ToUint8Array('BHYBAuK3-iy30de4qIoNC0dE4Rew7NbPaTrMnEHjYjc7EkphaqJlhWFUbPXg5Nr4-_9cyml6c77hx5JRWv3vHGk')
        };
        if(_module.ORGANIZATIONID == 'X4FMIYLJRbqMgGB2E6kkOQ'){
            _module.subscribeOptions.applicationServerKey = _module.urlBase64ToUint8Array('BGDy-d_jQo6a-Ju4scmfMeCzoTVtjEI41p7_ZmmrO3JnGs73r_ghVhYEeiCh2wVv6zCJsnL7fpxV27c5RuzjWGE')
        }

        if (_module.isChrome()) {
            /*notificationManager = new _module.ChromeManager (onSuccess);*/
            notificationManager = new _module.WebPushManager (onSuccess);
        } else if (_module.isSafari ()) {
            notificationManager = new _module.SafariManager (onSuccess);
        } else if (_module.isFirefox ()) {
            //Firefox not working thus return till fixed.
            //return;
            notificationManager = new _module.WebPushManager (onSuccess);
        }

        if (! notificationManager) {
            _module.error ("This browser is not supported!");
        }

    }

    _module.urlBase64ToUint8Array = function (base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    function showDialogOptIn(cb, via) {
        if (_module.PUSH_SETTINGS && _module.PUSH_SETTINGS.hasOwnProperty('optin')
                && (_module.PUSH_SETTINGS.optin.type === 'DIALOG' || _module.PUSH_SETTINGS.optin.type === 'BELL'
                || via == 'HTTP')) {

            _module.helpers.detectPrivateMode( function (isPrivateMode) {
                if(!isPrivateMode){
                    var iframeSrc = _module.PUSH_SETTINGS.optin.markup;

                    var bodyElt = document.getElementsByTagName("body")[0];
                    var wigzoPushDialogIframeDiv = document.createElement('div');
                    wigzoPushDialogIframeDiv.id = "wigzo-push-dialog-iframe-div";
                    wigzoPushDialogIframeDiv.innerHTML = iframeSrc;
                    // wigzoPushDialogIframeDiv.style= "position: fixed; top:0; left:0; right:0; bottom:0; width: 100% !important; height: 100% !important; outline: 0 !important; border: 0 !important; z-index: 2147483000!important; margin: 0 !important; padding: 0 !important;";
                    bodyElt.appendChild(wigzoPushDialogIframeDiv);


                    _module.$ (".wig-btn-later").click (function () {
                        cb(false);
                        if(wigzo.$('#wigzo-push-dialog-iframe-div').length>0) {
                            wigzo.$('#wigzo-push-dialog-iframe-div').remove();
                        }
                    });

                    _module.$ (".wig-btn-allow").click (function () {
                        _module.log ("Opening native opt-in for subscription.");
                        wigzo('track','httppushallowed');

                        if(wigzo.$('#wigzo-push-dialog-iframe-div').length>0) {
                            wigzo.$('#wigzo-push-dialog-iframe-div').remove();
                        }
                        cb(true);
                    });
                }
            });
        } else {
            cb(true);
        }
    }

    return _module;

}(window.wigzo|| {}));



window.wigzo = (function(_module) {
    _module["pushoverlaymarkup"] = '<div class="wigzo-push-overlay">\
<style>\
#wigzo-push-overlay {\
font-family: Arial,"Helvetica Neue",Helvetica,sans-serif !important;\
overflow-y: auto !important;\
background: rgba(0, 0, 0, 0.9);\
position: fixed;\
top: 0px;\
left: 0px;\
right: 0px;\
bottom: 0px;\
width: 100% !important;\
height: 100% !important;\
outline: 0px !important;\
border: 0px !important;\
z-index: 2147483000 !important;\
margin: 0px !important;\
padding: 0px !important;\
}\
#wigzo-push-overlay.wigzoHidden{\
display: none;\
}\
#wigzo-push-overlay .wigzo-push-info {\
position: absolute;\
text-align: center;\
display: inline-block;\
width:50%;\
min-width: 300px;\
padding: 20px;\
line-height: normal;\
}\
#wigzo-push-overlay .wigzo-push-title{\
position: relative;\
color: #fff;\
text-align: center;\
font-size: 26px;\
font-weight: 600;\
}\
#wigzo-push-overlay .wigzo-push-desc{\
position: relative;\
color: #fff;\
opacity: 0.7;\
text-align: center;\
font-size: 18px;\
padding-top: 20px;\
margin-bottom:20px\
}\
#wigzo-push-overlay .wigzo-push-branding-text{\
font-size: 11px;\
opacity: 0.5;\
position: relative;\
color: #fff;\
padding-top: 20px;\
text-decoration: none\
}\
#wigzo-push-overlay .wigzo-push-branding-text img{\
display: inline-block;\
vertical-align: middle;\
width: auto;\
height: auto;\
}\
#connectDesktop{\
top: 200px;\
left: 200px;\
position: absolute;\
}\
#connectMobile{	\
position: absolute;\
bottom: 220px;\
height:100px;\
width: 100%;\
}\
#connectSafari{	\
position: absolute;\
top: 200px;\
height:100px;\
width: 100%;\
display: none;\
}\
#connectDesktop .connector, #connectMobile .connector, #connectSafari .connector{\
fill: #ffffff\
}\
@media only screen and (min-width: 426px){\
#wigzo-push-overlay .wigzo-push-info {\
top: 300px;\
left: calc(50% / 2);\
}\
#connectMobile{\
display: none;\
}\
}\
@media only screen and (max-width: 425px){\
#wigzo-push-overlay .wigzo-push-info {\
width: 100%;\
bottom: 350px;\
padding: 0 50px;\
}\
#connectDesktop, #connectSafari{\
display: none;\
}\
}\
</style>\
<div id="wigzo-push-overlay">\
<div id="connectSafari">\
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
width="100%" height="100%" viewBox="0 0 390 270" enable-background="new 0 0 390 270" xml:space="preserve">\
<g>\
	<path class="connector" d="M192.743,30.101c0-0.797,0.963-1.446,2.171-1.446l0,0c1.205,0,2.171,0.649,2.171,1.446v7.658\
		c0,0.798-0.967,1.446-2.171,1.446l0,0c-1.208,0-2.171-0.648-2.171-1.446V30.101z"/>\
	<path class="connector" d="M192.743,3.614c0-1.429,0.963-2.595,2.171-2.595l0,0c1.205,0,2.171,1.166,2.171,2.595v13.761\
		c0,1.429-0.967,2.595-2.171,2.595l0,0c-1.208,0-2.171-1.166-2.171-2.595V3.614z"/>\
	<path class="connector" d="M192.743,49.336c0-0.798,0.963-1.446,2.171-1.446l0,0c1.205,0,2.171,0.648,2.171,1.446v7.658\
		c0,0.797-0.967,1.446-2.171,1.446l0,0c-1.208,0-2.171-0.649-2.171-1.446V49.336z"/>\
	<path class="connector" d="M192.743,68.571c0-0.798,0.963-1.446,2.171-1.446l0,0c1.205,0,2.171,0.648,2.171,1.446v7.658\
		c0,0.797-0.967,1.445-2.171,1.445l0,0c-1.208,0-2.171-0.648-2.171-1.445V68.571z"/>\
	<path class="connector" d="M192.743,87.806c0-0.797,0.963-1.446,2.171-1.446l0,0c1.205,0,2.171,0.649,2.171,1.446v7.658\
		c0,0.798-0.967,1.446-2.171,1.446l0,0c-1.208,0-2.171-0.648-2.171-1.446V87.806z"/>\
	<path class="connector" d="M192.743,107.041c0-0.798,0.963-1.446,2.171-1.446l0,0c1.205,0,2.171,0.648,2.171,1.446v7.658\
		c0,0.797-0.967,1.446-2.171,1.446l0,0c-1.208,0-2.171-0.649-2.171-1.446V107.041z"/>\
	<path class="connector" d="M192.743,126.275c0-0.797,0.963-1.445,2.171-1.445l0,0c1.205,0,2.171,0.648,2.171,1.445v7.659\
		c0,0.797-0.967,1.446-2.171,1.446l0,0c-1.208,0-2.171-0.649-2.171-1.446V126.275z"/>\
	<path class="connector" d="M192.743,145.511c0-0.797,0.963-1.446,2.171-1.446l0,0c1.205,0,2.171,0.649,2.171,1.446v7.658\
		c0,0.797-0.967,1.446-2.171,1.446l0,0c-1.208,0-2.171-0.649-2.171-1.446V145.511z"/>\
	<path class="connector" d="M192.743,164.746c0-0.798,0.963-1.446,2.171-1.446l0,0c1.205,0,2.171,0.648,2.171,1.446v7.658\
		c0,0.797-0.967,1.445-2.171,1.445l0,0c-1.208,0-2.171-0.648-2.171-1.445V164.746z"/>\
	<path class="connector" id="XMLID_1_" d="M192.743,183.98c0-0.797,0.963-1.445,2.171-1.445l0,0c1.205,0,2.171,0.648,2.171,1.445v7.658\
		c0,0.798-0.967,1.446-2.171,1.446l0,0c-1.208,0-2.171-0.648-2.171-1.446V183.98z"/>\
	<path class="connector" id="XMLID_2_" d="M192.743,203.216c0-0.797,0.963-1.446,2.171-1.446l0,0c1.205,0,2.171,0.649,2.171,1.446\
		v7.658c0,0.797-0.967,1.446-2.171,1.446l0,0c-1.208,0-2.171-0.649-2.171-1.446V203.216z"/>\
	<path class="connector" id="XMLID_3_" d="M192.743,222.451c0-0.798,0.963-1.446,2.171-1.446l0,0c1.205,0,2.171,0.648,2.171,1.446\
		v7.658c0,0.797-0.967,1.445-2.171,1.445l0,0c-1.208,0-2.171-0.648-2.171-1.445V222.451z"/>\
	<path class="connector" id="XMLID_4_" d="M192.743,241.686c0-0.797,0.963-1.446,2.171-1.446l0,0c1.205,0,2.171,0.649,2.171,1.446\
		v7.658c0,0.798-0.967,1.446-2.171,1.446l0,0c-1.208,0-2.171-0.648-2.171-1.446V241.686z"/>\
	<path class="connector" id="XMLID_5_" d="M192.743,260.921c0-0.798,0.963-1.446,2.171-1.446l0,0c1.205,0,2.171,0.648,2.171,1.446\
		v7.658c0,0.797-0.967,1.446-2.171,1.446l0,0c-1.208,0-2.171-0.649-2.171-1.446V260.921z"/>\
	<path class="connector" d="M193.715,1.358c0.674-0.674,1.904-0.538,2.761,0.313l0,0c0.848,0.853,0.988,2.087,0.313,2.761l-6.454,6.454\
		c-0.674,0.67-1.908,0.534-2.761-0.31l0,0c-0.853-0.86-0.988-2.09-0.313-2.765L193.715,1.358z"/>\
	<path class="connector" d="M193.248,4.433c-0.67-0.674-0.538-1.903,0.314-2.761l0,0c0.852-0.848,2.086-0.983,2.76-0.313l6.48,6.483\
		c0.674,0.671,0.534,1.904-0.314,2.757l0,0c-0.856,0.853-2.086,0.983-2.761,0.313L193.248,4.433z"/>\
	<path class="connector" d="M181.701,13.329c0.564-0.563,1.705-0.339,2.562,0.514l0,0c0.848,0.853,1.077,1.997,0.513,2.562\
		l-5.415,5.415c-0.563,0.56-1.709,0.335-2.562-0.514l0,0c-0.853-0.856-1.077-1.997-0.513-2.561L181.701,13.329z"/>\
	<path class="connector" d="M171.57,23.702c0.564-0.564,1.705-0.34,2.562,0.513l0,0c0.848,0.853,1.077,1.997,0.513,2.562l-5.415,5.415\
		c-0.563,0.56-1.709,0.335-2.561-0.513l0,0c-0.853-0.857-1.077-1.998-0.514-2.562L171.57,23.702z"/>\
	<path class="connector" d="M207.454,12.062c-0.564-0.564-1.705-0.339-2.562,0.513l0,0c-0.848,0.853-1.077,1.998-0.513,2.562\
		l5.415,5.415c0.563,0.56,1.709,0.335,2.562-0.513l0,0c0.853-0.856,1.077-1.997,0.513-2.562L207.454,12.062z"/>\
	<path class="connector" d="M217.585,22.434c-0.564-0.563-1.705-0.339-2.562,0.514l0,0c-0.848,0.853-1.077,1.997-0.513,2.561\
		l5.415,5.416c0.563,0.56,1.709,0.335,2.561-0.514l0,0c0.853-0.856,1.077-1.997,0.514-2.562L217.585,22.434z"/>\
</g>\
</svg>\
</div>\
<div id="connectDesktop">\
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
width="390px" height="270px" viewBox="0 0 390 270" enable-background="new 0 0 390 270" xml:space="preserve">\
<g>\
<g>\
<g>\
<path class="connector" d="M151.066,70.255c0.132-0.412,0.572-0.64,0.984-0.508l0,0c0.411,0.131,0.639,0.571,0.509,0.983\
l-1.256,3.934c-0.13,0.412-0.57,0.64-0.982,0.509l0,0c-0.412-0.132-0.64-0.573-0.508-0.984L151.066,70.255z"/>\
<path class="connector" d="M148.76,77.365c0.131-0.411,0.571-0.64,0.983-0.508l0,0c0.41,0.132,0.639,0.572,0.509,0.984l-1.254,3.933\
c-0.131,0.412-0.571,0.639-0.984,0.509l0,0c-0.412-0.132-0.638-0.572-0.508-0.984L148.76,77.365z"/>\
<path class="connector" d="M146.378,85.005c0.131-0.411,0.571-0.638,0.983-0.507l0,0c0.411,0.131,0.64,0.571,0.508,0.983\
l-1.253,3.934c-0.131,0.411-0.572,0.638-0.985,0.508l0,0c-0.411-0.132-0.637-0.573-0.507-0.984L146.378,85.005z"/>\
</g>\
<g>\
<path class="connector" d="M152.121,69.465c-0.41-0.132-0.851,0.096-0.98,0.508l0,0c-0.133,0.412,0.097,0.852,0.508,0.983\
l3.933,1.254c0.411,0.131,0.852-0.097,0.982-0.508l0,0c0.132-0.412-0.097-0.852-0.509-0.983L152.121,69.465z"/>\
<path class="connector" d="M159.254,71.699c-0.411-0.13-0.853,0.097-0.983,0.509l0,0c-0.13,0.411,0.096,0.852,0.509,0.984\
l3.934,1.253c0.411,0.131,0.851-0.096,0.982-0.508l0,0c0.131-0.412-0.097-0.852-0.508-0.983L159.254,71.699z"/>\
<path class="connector" d="M166.864,74.179c-0.411-0.13-0.851,0.096-0.984,0.509l0,0c-0.131,0.412,0.097,0.852,0.509,0.983\
l3.934,1.255c0.411,0.13,0.852-0.097,0.984-0.509l0,0c0.13-0.412-0.097-0.853-0.509-0.983L166.864,74.179z"/>\
</g>\
</g>\
<path class="connector" d="M244.293,132.355c0.423,0.09,0.692,0.505,0.602,0.929l0,0c-0.089,0.422-0.505,0.691-0.929,0.602\
l-4.036-0.862c-0.424-0.09-0.693-0.505-0.603-0.928l0,0c0.09-0.423,0.507-0.693,0.927-0.602L244.293,132.355z"/>\
<path class="connector" d="M235.744,130.559c0.42,0.106,0.672,0.533,0.564,0.952l0,0c-0.108,0.418-0.533,0.672-0.952,0.564l-4-1.022\
c-0.42-0.107-0.672-0.533-0.564-0.952l0,0c0.105-0.419,0.534-0.673,0.952-0.565L235.744,130.559z"/>\
<path class="connector" d="M227.292,128.285c0.418,0.112,0.665,0.541,0.552,0.959l0,0c-0.11,0.418-0.538,0.666-0.956,0.555\
l-3.989-1.067c-0.417-0.112-0.666-0.54-0.555-0.958l0,0c0.11-0.417,0.542-0.666,0.96-0.554L227.292,128.285z"/>\
<path class="connector" d="M218.709,125.866c0.41,0.134,0.633,0.576,0.499,0.988l0,0c-0.135,0.411-0.578,0.634-0.989,0.5l-3.922-1.288\
c-0.411-0.135-0.634-0.577-0.5-0.987l0,0c0.137-0.411,0.578-0.635,0.988-0.5L218.709,125.866z"/>\
<path class="connector" d="M210.402,122.663c0.394,0.178,0.567,0.641,0.391,1.036l0,0c-0.177,0.394-0.642,0.569-1.034,0.391\
l-3.764-1.699c-0.395-0.178-0.569-0.642-0.392-1.036l0,0c0.179-0.395,0.643-0.569,1.035-0.391L210.402,122.663z"/>\
<path class="connector" d="M202.252,118.653c0.383,0.202,0.53,0.675,0.329,1.058l0,0c-0.2,0.382-0.675,0.529-1.058,0.328l-3.654-1.922\
c-0.382-0.2-0.529-0.673-0.328-1.056l0,0c0.201-0.384,0.676-0.53,1.058-0.329L202.252,118.653z"/>\
<path class="connector" d="M193.958,114.049c0.36,0.241,0.455,0.727,0.214,1.086l0,0c-0.239,0.36-0.725,0.456-1.085,0.216\
l-3.431-2.296c-0.358-0.24-0.456-0.726-0.217-1.085l0,0c0.241-0.36,0.728-0.457,1.087-0.216L193.958,114.049z"/>\
<path class="connector" d="M186.417,108.435c0.352,0.25,0.436,0.738,0.184,1.092l0,0c-0.25,0.353-0.738,0.436-1.092,0.186\
l-3.366-2.389c-0.355-0.25-0.437-0.737-0.186-1.091l0,0c0.248-0.354,0.738-0.436,1.092-0.186L186.417,108.435z"/>\
<path class="connector" d="M179.056,102.776c0.314,0.295,0.329,0.79,0.033,1.106l0,0c-0.294,0.315-0.791,0.331-1.105,0.036\
l-3.011-2.827c-0.314-0.295-0.331-0.791-0.035-1.106l0,0c0.296-0.315,0.792-0.331,1.105-0.035L179.056,102.776z"/>\
<path class="connector" d="M171.865,96.037c0.285,0.325,0.249,0.82-0.076,1.103l0,0c-0.326,0.286-0.819,0.251-1.103-0.076\
l-2.714-3.113c-0.283-0.326-0.251-0.82,0.076-1.104l0,0c0.326-0.285,0.821-0.25,1.104,0.076L171.865,96.037z"/>\
<path class="connector" d="M165.865,89.295c0.257,0.348,0.185,0.837-0.163,1.096l0,0c-0.345,0.259-0.836,0.187-1.095-0.161\
l-2.464-3.312c-0.259-0.347-0.187-0.837,0.16-1.095l0,0c0.346-0.259,0.838-0.187,1.095,0.161L165.865,89.295z"/>\
<path class="connector" d="M160.588,82.634c0.258,0.348,0.183,0.837-0.166,1.094l0,0c-0.347,0.256-0.837,0.181-1.094-0.167\
l-2.447-3.326c-0.256-0.348-0.182-0.838,0.166-1.094l0,0c0.349-0.257,0.839-0.183,1.095,0.167L160.588,82.634z"/>\
<path class="connector" d="M156.029,75.792c0.241,0.358,0.145,0.844-0.216,1.085l0,0c-0.356,0.242-0.845,0.146-1.084-0.213\
l-2.302-3.428c-0.242-0.359-0.146-0.845,0.213-1.085l0,0c0.357-0.243,0.845-0.146,1.085,0.213L156.029,75.792z"/>\
</g>\
</svg>\
</div>\
<div class="wigzo-push-info">\
<div class="wigzo-push-title">$PUSH_TITLE$</div>\
<div class="wigzo-push-desc">$PUSH_SUBTITLE$</div>		\
<a id="wigzo-push-branding" href=$PUSH_BRANDING_URL$ target="_blank" class="wigzo-push-branding-text">Powered by <img src="$POWEREDBYLOGO$"></a>\
</div>\
<div id="connectMobile">\
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
width="100%" height="100%" viewBox="0 0 390 270" enable-background="new 0 0 390 270" xml:space="preserve">\
<g>\
	<path class="connector" d="M196.412,240.855c0,0.797-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.649-2.171-1.446v-7.658\
		c0-0.798,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.648,2.171,1.446V240.855z"/>\
	<path class="connector" d="M196.412,267.342c0,1.429-0.963,2.595-2.171,2.595l0,0c-1.205,0-2.171-1.166-2.171-2.595v-13.761\
		c0-1.429,0.967-2.595,2.171-2.595l0,0c1.208,0,2.171,1.166,2.171,2.595V267.342z"/>\
	<path class="connector" d="M196.412,221.62c0,0.798-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.648-2.171-1.446v-7.658\
		c0-0.797,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.649,2.171,1.446V221.62z"/>\
	<path class="connector" d="M196.412,202.385c0,0.798-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.648-2.171-1.446v-7.658\
		c0-0.797,0.967-1.445,2.171-1.445l0,0c1.208,0,2.171,0.648,2.171,1.445V202.385z"/>\
	<path class="connector" d="M196.412,183.15c0,0.797-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.649-2.171-1.446v-7.658\
		c0-0.798,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.648,2.171,1.446V183.15z"/>\
	<path class="connector" d="M196.412,163.915c0,0.798-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.648-2.171-1.446v-7.658\
		c0-0.797,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.649,2.171,1.446V163.915z"/>\
	<path class="connector" d="M196.412,144.681c0,0.797-0.963,1.445-2.171,1.445l0,0c-1.205,0-2.171-0.648-2.171-1.445v-7.659\
		c0-0.797,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.649,2.171,1.446V144.681z"/>\
	<path class="connector" d="M196.412,125.445c0,0.797-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.649-2.171-1.446v-7.659\
		c0-0.797,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.649,2.171,1.446V125.445z"/>\
	<path class="connector" d="M196.412,106.21c0,0.797-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.649-2.171-1.446v-7.658\
		c0-0.797,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.648,2.171,1.446V106.21z"/>\
	<path class="connector" id="XMLID_1_" d="M196.412,86.975c0,0.797-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.648-2.171-1.446\
		v-7.658c0-0.797,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.649,2.171,1.446V86.975z"/>\
	<path class="connector" id="XMLID_2_" d="M196.412,67.74c0,0.797-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.649-2.171-1.446\
		v-7.659c0-0.797,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.649,2.171,1.446V67.74z"/>\
	<path class="connector" id="XMLID_3_" d="M196.412,48.505c0,0.797-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.649-2.171-1.446\
		v-7.658c0-0.797,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.648,2.171,1.446V48.505z"/>\
	<path class="connector" id="XMLID_4_" d="M196.412,29.27c0,0.797-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.649-2.171-1.446\
		v-7.658c0-0.797,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.649,2.171,1.446V29.27z"/>\
	<path class="connector" id="XMLID_5_" d="M196.412,10.035c0,0.797-0.963,1.446-2.171,1.446l0,0c-1.205,0-2.171-0.648-2.171-1.446\
		V2.376c0-0.797,0.967-1.446,2.171-1.446l0,0c1.208,0,2.171,0.649,2.171,1.446V10.035z"/>\
	<path class="connector" d="M195.44,269.598c-0.674,0.674-1.904,0.538-2.76-0.313l0,0c-0.848-0.853-0.988-2.087-0.314-2.761\
		l6.454-6.454c0.674-0.67,1.908-0.534,2.761,0.31l0,0c0.853,0.86,0.988,2.09,0.313,2.765L195.44,269.598z"/>\
	<path class="connector" d="M195.907,266.523c0.67,0.674,0.538,1.903-0.314,2.761l0,0c-0.852,0.848-2.086,0.983-2.76,0.313l-6.48-6.483\
		c-0.674-0.671-0.534-1.904,0.314-2.757l0,0c0.856-0.853,2.086-0.983,2.761-0.313L195.907,266.523z"/>\
	<path class="connector" d="M207.454,257.627c-0.564,0.563-1.705,0.339-2.562-0.514l0,0c-0.848-0.853-1.077-1.997-0.513-2.562\
		l5.415-5.415c0.563-0.56,1.709-0.335,2.562,0.514l0,0c0.853,0.856,1.077,1.997,0.513,2.561L207.454,257.627z"/>\
	<path class="connector" d="M217.585,247.254c-0.564,0.564-1.705,0.34-2.562-0.513l0,0c-0.848-0.853-1.077-1.997-0.513-2.562\
		l5.415-5.415c0.563-0.56,1.709-0.335,2.561,0.513l0,0c0.853,0.857,1.077,1.998,0.514,2.562L217.585,247.254z"/>\
	<path class="connector" d="M181.701,258.895c0.564,0.564,1.705,0.339,2.562-0.513l0,0c0.848-0.853,1.077-1.998,0.513-2.562\
		l-5.416-5.415c-0.563-0.56-1.708-0.335-2.561,0.513l0,0c-0.853,0.856-1.077,1.997-0.513,2.562L181.701,258.895z"/>\
	<path class="connector" d="M171.571,248.522c0.564,0.563,1.705,0.339,2.561-0.514l0,0c0.848-0.853,1.077-1.997,0.513-2.561\
		l-5.415-5.416c-0.564-0.56-1.709-0.335-2.561,0.514l0,0c-0.853,0.856-1.077,1.997-0.513,2.562L171.571,248.522z"/>\
</g>\
</svg>\
</div>\
</div>\
</div>';
    return _module;
}(window.wigzo || {}));

window.wigzo = (function (_module) {
    _module.initLiveChat = function () {

        console.log('Initialising Live Chat', _module.IDENTIFIER);
        cretaeLiveChatIframeDiv();
    };
    function cretaeLiveChatIframeDiv() {
        var liveChatIframeContainer = document.createElement('div');
        liveChatIframeContainer.setAttribute('id', "live-chat-iframe-container");
        liveChatIframeContainer.setAttribute("style", "position: fixed; outline: 0 !important; border: 0 !important; z-index: 2147483000!important; margin: 0 !important; padding: 0 !important; width: 100%; height: 100%;right:0;bottom:0;max-width:0;max-height:0");
        document.body.appendChild(liveChatIframeContainer);
        createLiveChatIframe(liveChatIframeContainer);
    }
    function createLiveChatIframe(liveChatIframeContainer) {
        //let cookieId = _module.IDENTIFIER;
        let iframeSrc = _module.APP + "/conversation/widgetmarkup/" + _module.IDENTIFIER + "/" + _module.ORGANIZATIONID;
        var liveChatIframe = document.createElement('iframe');
        liveChatIframe.setAttribute('src', iframeSrc);
        liveChatIframe.setAttribute('id', 'live-chat-iframe');
        liveChatIframe.setAttribute('class', 'WigzoOnsiteNotificationIframe');
        liveChatIframe.setAttribute('style', "position: absolute; top:0; left:0; right:0; bottom:0; width: 100% !important; height: 100% !important; outline: 0 !important; border: 0 !important; z-index: 2147483000!important; margin: 0 !important; padding: 0 !important;");
        liveChatIframe.setAttribute('scrolling', "no");
        liveChatIframeContainer.appendChild(liveChatIframe);
        _module.initialiseListener();
    }
    function handleWlChatDimension(dimension) {
        if(dimension.position === 'left') {
            _module.$("#live-chat-iframe-container").css({"left": "0", "right": "unset"});
        } else {
            _module.$("#live-chat-iframe-container").css({"right": "0", "left": "unset"});
        }
        if(!!dimension.isChatWindowOpen && window.innerWidth <= 430){
            _module.$("#live-chat-iframe-container").css({"max-height": "100%", "max-width": "100%"});
        } else {
            _module.$("#live-chat-iframe-container").css({"max-height": dimension.height, "max-width": dimension.width});
        }
    }
    _module.listenerReference = function(event){
        console.log(event);
        !!(event.data.type === 'wl-chat-notif-dimensions') && (handleWlChatDimension(event.data.holderDimension));
        _module.hasGlobalMessageListener = true
    };
    _module.initialiseListener = function (data, deviceType) {

        if (_module.hasGlobalMessageListener) {
            if (window.removeEventListener) {
                /*window.removeEventListener('message', _module.initialiseListener);*/
                window.removeEventListener('message', _module.listenerReference);
            } else if (window.detachEvent) {
                /*window.detachEvent('message', _module.initialiseListener);*/
                window.detachEvent('message', _module.listenerReference);
            }
        }

        window.addEventListener('message', _module.listenerReference, false);
    };
    return _module
}(window.wigzo || {}));

window.wigzo = (function (_module) {

  function loadScript(src, id, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.onload = function() {
        if (callback) callback(null, script);
    };
    script.onerror = function() {
        if (callback) callback(new Error('Failed to load script ' + src));
    };
    document.head.appendChild(script);
  }
  var isUCAvailable = false;

  if(_module.ORGANIZATIONID != 'y1S5oflcTkuFIdOrVGkPSw'){
    loadScript('https://sr-cdn.shiprocket.in/sr-promise/static/uc.js?channel_id=1', 'uc_shiprocket', function(error, script) {
      if (error) {
          console.error(error);
          isUCAvailable = false;
      } else {
          console.log('Script ' + script.id + ' loaded successfully.');
          isUCAvailable = true;
      }
    });
  }

  var myNav = navigator.userAgent.toLowerCase();
  var ieVer = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  if ((ieVer && ieVer < 10) || _module.isWigzoScriptDisabled()) {
    console.info("Wigzo is Disabled or IE<10 - Aborting.");
    var emptyFun = function () {
    };
    var emptyWigzo = {};
    // Any public API must be listed here...
    emptyWigzo.track = emptyWigzo.identify = emptyWigzo.index = emptyFun;
    return emptyWigzo;
  }

  var docLang = document.documentElement.lang;
  if (document.documentElement.lang === "" || document.documentElement.lang === "zxx" || document.documentElement.lang === "null"){
    docLang = "en";
  }
  /*---------------------------
   * Begin Code for Wigzo.
   *---------------------------*/

  _module["COOKIE_NAME"] = "WIGZO_LEARNER_ID";
  _module["LAST_USER_COOKIENAME"] = "WIGZO_USERID";
  _module["DAILY_ACTIVE_COOKIENAME"] = "WIGZO_DAILYACTIVE";
  _module['CART_UPDATED'] = false;

  /* This will be automatically populated before Wigzo starts to work,
   * or rather, when its main () is called.
   * So don't worry about calling getOrCreateCookie every time.
   * You can rely on this variable.
   */
  _module["IDENTIFIER"] = null;
  _module["_USER_TYPE"] = "returning";


  if (!_module.hasOwnProperty("FEATURES")) {
    _module["FEATURES"] = {
      "OnsitePushNotification": false,
      "PRODUCTINDEXING": true,
      "SITEINDEXING": true
    }
  }

  if (!_module["FEATURES"].hasOwnProperty("OnsitePushNotification")) {
    _module["FEATURES"]["OnsitePushNotification"] = false;
  }
  if (!_module["FEATURES"].hasOwnProperty("BrowserPushNotification")) {
    _module["FEATURES"]["BrowserPushNotification"] = true;
  }
  if (!_module["FEATURES"].hasOwnProperty("ExitIntent")) {
    _module["FEATURES"]["ExitIntent"] = false;
  }
  if (!_module["FEATURES"].hasOwnProperty("EventsTracking")) {
    _module["FEATURES"]["EventsTracking"] = false;
  }
  if (!_module["FEATURES"].hasOwnProperty("SmartBlock")) {
    _module["FEATURES"]["SmartBlock"] = false;
  }
  if (!_module["FEATURES"].hasOwnProperty("PRODUCTINDEXING")) {
    _module["FEATURES"]["PRODUCTINDEXING"] = true;
  }
  if (!_module["FEATURES"].hasOwnProperty("SITEINDEXING")) {
    _module["FEATURES"]["SITEINDEXING"] = true;
  }

  if (!_module.hasOwnProperty("OPTIONS")) {
    _module["OPTIONS"] = {
      "PANELFREE": true,
      "NOTIFBELL": false
    }
  }

  if (!_module.hasOwnProperty("SERVICES")) {
    _module["SERVICES"] = "https://services.wigzopush.com";
  }
  if (!_module.hasOwnProperty("RAY")) {
    _module["RAY"] = "https://ray.wigzopush.com";
  }
  if (!_module.hasOwnProperty("APP")) {
    _module["APP"] = "https://tracker.wigzopush.com";
  }
  if (!_module.hasOwnProperty("CLOUDFLARE")) {
    _module["CLOUDFLARE"] = "https://app.wigzo.com";
  }
  if (!_module.hasOwnProperty("FORCE_CANONICAL_URL")) {
    _module["FORCE_CANONICAL_URL"] = true;
  }


  /* Dont make any more configuration variables here, all the variables are server side controlled now. */

  _module["helpers"] = {

    hashchange: function (e) {
      _module.consoleDebug("hash has changed");
      if (_module.helpers.getSPA() == 'true') {
        if (wigzo.$('#wigzo-onsite-notif-iframe-div').length > 0) {
          wigzo.$('#wigzo-onsite-notif-iframe-div').remove();
        }
        // Intialize exit intent for sites using SPA architecture.
        //_module.getOrCreateCookie(function (cookieId) {
        _module.exitIntent.initExitIntentMouseHandler(_module.IDENTIFIER, 'returning');
        _module.localStorageEventsGC();
        // The below code is for creating view event whenever hash changes i.e. for angularJs pages
        _module.helpers.createEvent('view', {pageuuid: '', eventval: location.href.toString(), source: 'web'});	// We don't have pageuuid, So keep it empty.
        //});
      }
    },

    categoryPageHandler: function (pageUrl) {
      if (pageUrl.includes('collections') && _module.isShopifyStore() == true && !pageUrl.includes('products')) {
        _module.helpers.createEvent('categoryview', {pageuuid: '', eventval: location.href.toString(), source: 'web'});
      }
    },

    productPageHandler: function (pageUrl) {
      if (pageUrl.includes('products') && _module.isShopifyStore() == true) {
        var canonical = wigzo.$(document).find("link[rel=canonical]").attr("href");
        if(!canonical) {
            canonical = location.href.toString();
        }
        _module.helpers.createEvent('productview', {pageuuid: '', eventval: canonical, source: 'web'});
      }
    },

    setCurrentURL: function () {
      localStorage.setItem("WIGZO_CURRENT_URL", location.href);
    },

    handleSpa: function () {
      if (_module.IS_SPA && localStorage.hasOwnProperty('WIGZO_CURRENT_URL')) {
        document.body.addEventListener('click', function () {
          setTimeout(function () {
            var url = localStorage.getItem('WIGZO_CURRENT_URL');
            if (url != location.href) {
              if (_module.$('#wigzo-onsite-notif-iframe-div').length > 0) {
                _module.$('#wigzo-onsite-notif-iframe-div').remove();
              }
              _module.helpers.createEvent('view', {pageuuid: '', eventval: location.href.toString(), source: 'web'});	// We don't have pageuuid, So keep it empty.
              _module.helpers.setCurrentURL();
            }
          }, 1000);
        }, true);
      }
    },


    setPageLoad: function () {
      if (localStorage.hasOwnProperty("PAGE_LOAD")) {
        localStorage.setItem("PAGE_LOAD", 2);
      }
      return;
    },

    forkTemporaryUser: function (cookieId, successFn, errorFn) {
      var params = {};
      params["_"] = new Date();

      if (_module.trackDailyActiveUser()) {
        params["is_active"] = "true";
      }
      if (!params.hasOwnProperty("lang")) {
        params["lang"] = wigzo.$("html").attr("lang") || "en";
      }
      var ucSessionData = localStorage.getItem('_uc_session_v1');
      params["sc_mid"] = !!ucSessionData ?  JSON.parse(ucSessionData).u_mid : null;

      var url = _module.APP + "/jserver/v1/user/fork/" + _module.ORGANIZATIONID + "/" + cookieId + "?" + wigzo.$.param(params);

      _module.jsonp(url, function (data) {
        if (!((!!data.code && data.code == 1200))) {
          _module.error("Error while forking a user, cannot continue, gracefully quitting...");
          _module.consoleDebug(data);
          return;
        }
        _module.$.cookie(_module["COOKIE_NAME"], cookieId, {expires: 80 * 365, path: '/'});
        if (!!successFn) {
          successFn.apply(_module);
        }
      }, function (e) {
        _module.consoleDebug("Error while forking a user, cannot continue, gracefully quitting...");
        if (!!errorFn) {
          errorFn.apply(_module);
        }
      });
    },

    createEvent: function (eventName, params, successFn, errorFn) {
        if(_module.IDENTIFIER == null){
            _module.getOrCreateCookie(function (cookieId) {
                  _module.IDENTIFIER = cookieId;
              }
            )
        }
      if (!_module.FEATURES.EventsTracking) {
        _module.log("EventsTracking feature is either not in plan or disabled.")
        return;
      }

      if(_module.ORGANIZATIONID != 'y1S5oflcTkuFIdOrVGkPSw'){
        //product view event to shiprocket
        if (!!isUCAvailable && eventName == 'productview' && !!window.ShopifyAnalytics && !!window.ShopifyAnalytics.meta.product) {
          var meta = (window.ShopifyAnalytics && window.ShopifyAnalytics.meta) || {};
          var product = meta.product || {};
          var variants = product.variants || [];
          var variant = variants[0] || {};
          var payload = {
              name: product.title || 'Unknown Product',
              mrp: variant.price || '0.00',
              selling_price: variant.price || '0.00',
              product_id: product.id || '',
              variant_id: variant.id || '',
              qty: 1,
              category: product.type || 'Unknown Category',
              out_of_stock: 0,
              image: 'https://d3lnc7yu1ksdj.cloudfront.net/wp-content/uploads/2023/10/RailANC_Black_Hero02_R02_Wireless_5.jpg',
              description: '',
              referrer: 'organic'
          };
          !!isUCAvailable && ua.event("pdp_view", payload);
        }
  
        //page view event to shiprocket
        if (!!isUCAvailable && eventName == 'view') {
          var payload = {
              url: params.eventval,
              page_type:  !!window.ShopifyAnalytics && window.ShopifyAnalytics.meta.page.pageType || '',
              referrer: 'organic'
          };
          !!isUCAvailable && ua.event("page_view", payload);
        }
      }

      if (!_module['CART_UPDATED'] && !!localStorage.getItem('wigzocartid')) {
        params['cart'] = localStorage.getItem('wigzocartid');
      }
      params["e"] = _module.IDENTIFIER;
      params["_"] = new Date();
      params["eventCategory"] = params["eventCategory"] || "EXTERNAL";
      params["referrer"] = !document.referrer ? "organic" : document.referrer;
      if (!params.hasOwnProperty("eventCategory")) {

      }
      if (!params.hasOwnProperty("eventval") || !params.eventval) {
        params["eventval"] = location.href.toString();
      }
      if (!!_module.getKey('WIGZO_PUSH_REFERRER')) {
        params["pushCampaignId"] = _module.getKey("WIGZO_PUSH_REFERRER");
      }
      if (!!_module.getKey('WIGZO_REFERRED_BY')) {
        params["referrer"] = _module.getKey("WIGZO_REFERRED_BY");
      } else {
        params["referrer"] = !document.referrer ? "organic" : document.referrer;
        _module.setKey('WIGZO_REFERRED_BY', !document.referrer ? "organic" : document.referrer, 1800);
      }

      if (!!_module.getKey('WIGZO_SALES_SOURCE') && _module.getKey('WIGZO_SALES_SOURCE') === "BROWSERPUSH") {
        params["pushreferrerid"] = _module.getKey("WIGZO_SALES_BROWSERPUSH");
      }

      if (!!_module.getKey('WIGZO_SALES_SOURCE') && _module.getKey('WIGZO_SALES_SOURCE') === "EMAIL") {
        params["emailreferrerid"] = _module.getKey("WIGZO_SALES_EMAIL");
      }

      if (!!_module.getKey('WIGZO_SALES_SOURCE') && _module.getKey('WIGZO_SALES_SOURCE') === "ONSITEPUSH") {
        params["onsitepushreferrerid"] = _module.getKey("WIGZO_SALES_ONSITEPUSH");
      }

      if (!!_module.getKey('WIGZO_SALES_SOURCE') && _module.getKey('WIGZO_SALES_SOURCE') === "WIGZOFBM") {
        params["fbmreferrerid"] = _module.getKey("WIGZO_SALES_FBM");
      }

      if (!params.hasOwnProperty("lang")) {
        params["lang"] = docLang;
      }
      var url = _module.APP + "/learn/" + _module.ORGANIZATIONID + "/" + eventName + "/" + _module.IDENTIFIER;

      var author = wigzo.$('meta[name=author]').attr("content");
      var type = wigzo.$('meta[property="og:type"]').attr("content");
      if (author === "donotparse" || type === "category" || type === "object" || type === "website") {
        params['wigzo_home'] = author;
      }

      if (_module.trackDailyActiveUser()) {
        params['is_active'] = true;
      }
      var canonical = wigzo.$(document).find("link[rel=canonical]").attr("href");
      if (!!canonical) {
        params['u'] = canonical;
      }

      _module.consoleDebug(url);
      _module.consoleDebug(params);

      //Store events in localstorage
      var events = localStorage.hasOwnProperty('WIGZO_EVENTS') ? JSON.parse(localStorage.getItem('WIGZO_EVENTS')) : {};
      events[eventName] = {created: new Date().getTime()};
      localStorage.setItem("WIGZO_EVENTS", JSON.stringify(events));
      var ucSessionData = localStorage.getItem('_uc_session_v1');
      params["sc_mid"] = !!ucSessionData ?  JSON.parse(ucSessionData).u_mid : null;

      _module.post(url, params, function (res) {
        if (!!res && !!res.update_cart) {
          //update wigzo learner id
          _module.$.cookie(_module["COOKIE_NAME"], res.update_cart, {expires: 80 * 365, path: '/'});
          _module.setKey ("WIGZO_PERSIST_COOKIE", res.update_cart);
          _module['CART_UPDATED'] = true;
        }
        if (!!successFn) {
          successFn(res);
        }
      }, function (err) {
        if (!!errorFn) {
          errorFn(err);
        }
      });
      _module.exitIntent.checkAndInitializeExitIntent(_module.IDENTIFIER, _module._USER_TYPE);
    },




    readShopifyCartId: function (url) {
      if (_module.isShopifyStore() == true) {
        var cartCookie = _module.$.cookie('cart');//Get shopify cart cookie
        if (!!cartCookie && cartCookie !== localStorage.getItem('wigzocartid')) {
          localStorage.setItem('wigzocartid', cartCookie, 24 * 60 * 60);//set cookie for next time comparison
          //Do your action on the event
          var canonicalUrl = url != null ? url : document.querySelector("link[rel='canonical']").getAttribute('href');
          var cartId = _module.$.cookie('cart');
          var eventVal = {"plugin": "shopify", "canonicalUrl": canonicalUrl, "cartId": cartId};
          wigzo('track', 'mapshopifyuser', eventVal);
        }
        return cartCookie;
      }
    },

    viewProduct: function (canonicalURL) {
      var pageuuid = wigzo.$.cookie('PAGE_UUID');
      /*if(!pageuuid) {
       return;
       }*/
      _module.helpers.categoryPageHandler(location.href);
      _module.helpers.productPageHandler(location.href);
      _module.helpers.readShopifyCartId(canonicalURL);
      _module.helpers.createEvent("view", {pageuuid: pageuuid, eventval: canonicalURL, source: 'web', u: canonicalURL});
      //earlier 'item' event was being generated. changed to view event
    },

    checkAgainstUrlCriteria: function (urlTargeting) {
      var currentUrl = document.location.href;
      var urlTargetingResult = false;
      //var index = 0;
      if (urlTargeting.choice == 'ALL') {
        urlTargetingResult = true;
      } else if (urlTargeting.choice === 'UTM') {
        urlTargetingResult = true;
        var utmParamKeys = Object.keys(urlTargeting.utmParameters);
        for (var i = 0; i < utmParamKeys.length; i++) {
          var utmParamValue = _module.getQueryStringParams(utmParamKeys[i]);
          if (!utmParamValue || utmParamValue !== urlTargeting.utmParameters[utmParamKeys[i]]) {
            urlTargetingResult = false;
            break;
          }
        }
      } else if (urlTargeting.choice == 'SPECIFIC') {
        for (var i = 0; i < urlTargeting.criteria.length; i++) {
          var targetCriterion = urlTargeting.criteria[i];
          var evaluatedResult = false;
          if (targetCriterion.operator === 'equals') {
            evaluatedResult = (targetCriterion.value === currentUrl);
          } else if (targetCriterion.operator === 'notequals') {
            evaluatedResult = !(targetCriterion.value === currentUrl);
          } else if (targetCriterion.operator === 'contains') {
            evaluatedResult = (currentUrl.indexOf(targetCriterion.value) >= 0);
          } else if (targetCriterion.operator === 'doesnotcontain') {
            evaluatedResult = (currentUrl.indexOf(targetCriterion.value) < 0);
          }

          urlTargetingResult = evaluatedResult;
          if (urlTargeting.globalOperator === 'AND' && !evaluatedResult) {
            break;
          } else if (urlTargeting.globalOperator === 'OR' && evaluatedResult) {
            break;
          }
        }
      }
      return urlTargetingResult;
    },
    checkAgainstLocationCriteria: function(country, criteria){
        var currentState = _module["state_code"];
        var evaluatedResult = false;
        var selectedCountries = criteria.value;
        var selectedCountryWiseState;
        if(criteria.hasOwnProperty("value2")){
          selectedCountryWiseState = criteria.value2;
        }
        if(criteria.operator === 'in'){
          evaluatedResult = (selectedCountries.indexOf(country) >= 0);
          if(!!selectedCountryWiseState && selectedCountryWiseState.hasOwnProperty(country)){
            evaluatedResult = (selectedCountryWiseState[country].indexOf(currentState) >= 0);
          }
        } else if(criteria.operator === 'notin'){
          evaluatedResult = (selectedCountries.indexOf(country) < 0);
          /*If actual country not in the selected list*/
          if(!evaluatedResult && !!selectedCountryWiseState && selectedCountryWiseState.hasOwnProperty(country)){
            evaluatedResult = (selectedCountryWiseState[country].indexOf(currentState) < 0);
          }
        }
        return evaluatedResult;
    },
    getDeviceType: function () {
      var deviceType = 'desktop';
      if (screen.width > 768) deviceType = 'desktop';
      if (screen.width <= 425) deviceType = 'mobile';
      if (screen.width > 425 && screen.width <= 768) deviceType = 'tablet';
      return deviceType;
    },

    detectPrivateMode: function (cb) {
      var db,
        on = cb.bind(null, true),
        off = cb.bind(null, false)

      function tryls() {
        try {
          localStorage.length ? off() : (localStorage.x = 1, localStorage.removeItem("x"), off());
        } catch (e) {
          // Safari only enables cookie in private mode
          // if cookie is disabled then all client side storage is disabled
          // if all client side storage is disabled, then there is no point
          // in using private mode
          navigator.cookieEnabled ? on() : off();
        }
      }

      // Blink (chrome & opera)
      window.webkitRequestFileSystem ? webkitRequestFileSystem(0, 0, off, on)
        // FF
        : "MozAppearance" in document.documentElement.style ? (db = indexedDB.open("test"), db.onerror = on, db.onsuccess = off)
        // Safari
        : /constructor/i.test(window.HTMLElement) || window.safari ? tryls()
          // IE10+ & edge
          : !window.indexedDB && (window.PointerEvent || window.MSPointerEvent) ? on()
            // Rest
            : off()
    }
  }

  _module.continueBuildIndex = function () {
    //wigzo.$(window).on ("hashchange", _module.helpers.hashchange);
    _module.helpers.handleSpa();
    var queryString = window.location.href.split("?")[1];
    var trackUrl = _module.APP + '/sms/track/open' + '?orgtoken=' + _module.ORGANIZATIONID + "&";
    if (typeof(queryString) != "undefined" && (queryString.includes("w_sms") || queryString.includes("w_email") || queryString.includes("w_fb")
        || queryString.includes("w_exit") || queryString.includes("w_push") || queryString.includes("w_onsite"))) {
      trackUrl = trackUrl + queryString;
      _module.get(trackUrl, function (res) {
        console.log("SMS trackopen");
      });
    }
    if (typeof(queryString) != "undefined" && (queryString.includes("sms_campaign"))){
      var campaignid = new URLSearchParams(queryString).getAll("campaignid").toString();
      var phoneNumber = parseInt(new URLSearchParams(queryString).getAll("p").toString(), 16);
      _module.track('smsclicked', campaignid);
      if (null != phoneNumber || !phoneNumber.isBlankString(phoneNumber)) {
        _module.identify({'phone': phoneNumber.toString()});
      }
    }

    var canonicalURL = wigzo.$(document).find("link[rel=canonical]").attr("href");

    if (!canonicalURL) {
      /* The page doesn't have any canonical URL */
      if (_module["FORCE_CANONICAL_URL"] == true) {
        _module.consoleDebug("Wigzo: Non canonicalized URL, cannot build index for this page, gracefully quitting...");

        // Non canonicalized URL, But still sending "view" event.
        _module.track("view", location.href.toString());
        return;
      }
      canonicalURL = window.location.toString();
    }

    _module.helpers.viewProduct(canonicalURL);
  }

  _module.localStorageEventsGC = function () {
    var eventsExpiryInMs = 20 * 60 * 1000;
    if (localStorage.hasOwnProperty('WIGZO_EVENTS')) {
      var updateEventsStorage = false;
      var events = JSON.parse(localStorage['WIGZO_EVENTS']);
      var eventNames = Object.keys(events);
      for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        var created = events[eventName].created;
        var currentMs = new Date().getTime();
        if ((created + eventsExpiryInMs) <= currentMs) {
          updateEventsStorage = true;
          delete events[eventName];
        }
      }
      if (updateEventsStorage) {
        localStorage.setItem("WIGZO_EVENTS", JSON.stringify(events));
      }
    }
  }

  _module.isShopifyStore = function () {
    return _module["PLUGIN"] == "SHOPIFY" || window.hasOwnProperty("Shopify");
  }

  _module.isSallaStore = function () {
    return _module["PLUGIN"] == "SHOPIFY" || window.hasOwnProperty("Salla");
  }

  _module.isSallaStoreProductPage = function (urlPath) {
    pageUrlId = urlPath.split('/')[urlPath.split('/').length -1]
    if(typeof(pageUrlId) != "undefined" && pageUrlId.startsWith('p')) {
      return true;
    }else {
      return false;
    }
  }

  _module.isSallaStoreCategoryPage = function (urlPath) {
    pageUrlId = urlPath.split('/')[urlPath.split('/').length -1]
    if(typeof(pageUrlId) != "undefined" && pageUrlId.startsWith('c')) {
      return true;
    }else {
      return false;
    }
  }

  _module.main = function () {
    if(_module.IDENTIFIER == null){
        _module.getOrCreateCookie(function (cookieId) {
              _module.IDENTIFIER = cookieId;
          }
        )
    }
    _module.helpers.setCurrentURL();
    _module.localStorageEventsGC();
    if (!!_module.FEATURES.PRODUCTINDEXING) {
      _module.continueBuildIndex();

      var entityviews = wigzo.$("." + _module.ENTITY_VIEW);
      for (var i = 0; i < entityviews.length; i++) {
        _module.showBlock(entityviews[i]);
      }
    }

    if (!!_module.FEATURES.SITEINDEXING) {
      _module.isNewOrReturningUser(_module._USER_TYPE, _module.IDENTIFIER);

      if (document.webkitVisibilityState == 'prerender' || document.visibilityState == 'prerender' ||
        document.visibilityState[0] == 'prerender') {
        /* Someone added this, and I believe this is because we don't want to
            * loadPixel and mapUserInfo if the page was pre-rendered.
            * Chrome can pre-render pages that are followed using:
            * <link rel='prerender'>
            */
        _module.consoleDebug("No pre-rendering.......");
      } else {
        _module.loadPixel(_module.IDENTIFIER, _module._USER_TYPE);
        _module.mapUserInfo(_module.IDENTIFIER);
      }
    }


    if (_module.AUTO_LOADNOTIFICATIONS) {
      wigzo.notificationSystemStart();
    } else {
      _module.log("Not loading Notification Sub-System because AUTO_LOADNOTIFICATIONS is false");
    }


    if (!!_module.FEATURES.OnsitePushNotification) {
      var onMessageReceived = function (data) {   // onMessageReceived
        if (!!_module.FEATURES.OnsitePushNotification) {
          wigzo.onsitePush.showNotification(data);
        }
      }

      var onConnect = function (socket) { // onConnect
        _module.consoleDebug("User joined-" + socket.id);
      }

      var onDisconnect = function () {    // onDisconnect
        _module.consoleDebug("User disconnected.");
      }

      // TODO RAY accepts org_token, so make sure _module.ORGANIZATIONID is org_token.
      var notificationCenter = wigzo.onsitePush.init(_module.RAY, _module.ORGANIZATIONID, _module.IDENTIFIER, onMessageReceived, onConnect, onDisconnect);
      _module.consoleDebug("Notification Center", notificationCenter);
    }

    if (_module["PLUGIN"] == "SHOPIFY" || window.hasOwnProperty("Shopify")) {

      if (!localStorage.getItem('wigzocartid')) {
          _module.checkCartCookie();
      }

      /*if (!!window.document.querySelector("form[action='/cart/add']")) {
        _module.$("form[action='/cart/add'] [name='add']").click(function () {
          setTimeout(function(){
            var cartId = _module.$.cookie('cart');
            _module.shopifyTrackEventAddToCart(cartId); }, 2000);
        });
      }

      if (!!window.document.querySelector("form[action='/cart/add']")) {
        _module.$("form[action='/cart/add']").submit(function () {
          var cartId = _module.$.cookie('cart');
          _module.shopifyTrackEventAddToCart(cartId);
        });
      }*/

      if (!!window.document.querySelector("form[action='/account/login']")) {
        _module.$("form[action='/account/login']").submit(function (event) {
          var email = _module.$("[name='customer[email]']")[0];
          var userInfo = {};
          if (email) {
            userInfo['email'] = email.value;
          }
          if (!!userInfo['email']) {
            _module.identify(userInfo, ['email'], function (res) {
              console.log("User Mapped at login");
            });
          }
        });
      }
      if (!!window.document.querySelector("form[action='/account']")) {
        _module.$("form[action='/account']").submit(function () {
          var email = _module.$("[name='customer[email]']")[0];
          var fullName = _module.$("[name='customer[first_name]']")[0] + " " + _module.$("[name='customer[last_name]']")[0];
          var userInfo = {};
          if (email) {
            userInfo['email'] = email.value;
          }
          if (fullName) {
            userInfo['fullName'] = fullName.value;
          }
          userInfo['phone'] = _module.$("[name='customer[phone]']")[0];
          if (!!userInfo['email'] || !!userInfo['fullName']) {
            _module.identify(userInfo, ['email', 'fullName'], function (res) {
              console.log("User Mapped at registration");
            });
          }
        });
      }
      //Not Requried Buy Event now captured using Shopify Webhooks
      /*if(!!window.document.querySelector("form[action='/cart']")){
          $("form[action='/cart']").submit(function() {
              var arr = new Array(); arr = $("form[action='/cart'] a");
              if(arr!=null){
                  _module.shopifyTrackBuyEvent(arr);
              }else{
                  arr = null;
              }
          });
      }*/
      /*if(!!window.document.querySelector("form[action^='/cart?']")){
          $("form[action^='/cart?']").submit(function() {
              var arr = new Array(); arr = $("form[action^='/cart?'] a");
              if(arr!=null){
                  _module.shopifyTrackBuyEvent(arr);
              }else{
                  arr = null;
              }
          });
      }*/

      // disabling shopify product indexing as all the data can be fetched using APIs and we don't need to store anything
      // _module.shopifyProductindexing();
    }

    if(_module["PLUGIN"] == "Salla" || window.hasOwnProperty("Salla")) {

        let wigzoCurrentPagePath = window.location.pathname;

        if(_module.isSallaStoreCategoryPage(wigzoCurrentPagePath)) {
            _module.sallaTrackEventCategoryView(wigzoCurrentPagePath);
        }

        if(_module.isSallaStoreProductPage(wigzoCurrentPagePath)){
            _module.sallaTrackEventProductView(wigzoCurrentPagePath);
            _module.sallaProductindexing();
        }

        if (!!window.document.getElementsByClassName('add-cart-large')) {
            _module.$(".add-cart-large").click(function () {
                wigzoCartProductId = document.getElementsByClassName('add-cart-large')[0].dataset.productId
                _module.sallaTrackEventAddToCart(wigzoCartProductId);
            });
        }

        if (!!window.document.getElementsByClassName('product-add')) {
            _module.$(".product-add").click(function () {
                wigzoCartProductId = document.getElementsByClassName('product-add')[0].dataset.productId
                _module.sallaTrackEventAddToCart(wigzoCartProductId);
            });
        }

        if (!!window.document.getElementsByClassName('btn--add-to-cart')) {
            _module.$(".product-add").click(function () {
                wigzoCartProductId = window.document.getElementsByClassName('btn--add-to-cart')[0].dataset.id
                _module.sallaTrackEventAddToCart(wigzoCartProductId);
            });
        }


    }

    if (_module.ready && typeof _module.ready === "function") {
      //_module.ready();
    }
    // Push execute loop
    var _push = Array.prototype.push;
    _module._exec = function () {
      while ((variables = _module.q.shift()) != null) {
        _module.dynamicCall.apply(_module, variables);
      }
    }
    _module.q.push = function () {
      var returned = _push.apply(this, arguments);
      _module._exec();
      return returned;
    }
    // execute all the pending events, without waiting for push.
    _module._exec();

    return;
  };

  _module.dynamicCall = function (methodCall, value, data) {
    if (_module.hasOwnProperty(methodCall)) {
      _module[methodCall].apply(_module, [value, data]);
    } else {
      if (methodCall !== "pass") {
        _module.consoleDebug("Wigzo has no method: " + methodCall);
      }
    }
  }

  _module.lazyLoader = function () {
    if (!!window.wigzo && window.wigzo.once == true) {
      (console.warn("Wigzo is already loaded, preventing subsequent calls. Did you load wigzo.js twice?"));
      return;
    }
    window.wigzo.once = true;

    if (_module.isWigzoScriptDisabled()) {
      _module.consoleDebug("Wigzo is Disabled! Returning..");
      return;
    }

    if (!_module.hasOwnProperty("h")) {
      /* The new script defines one variable h, that marks the host for the script and is used accordingly */
      var realHost = _module.APP;
      if (_module.hasOwnProperty("TRACKER")) {
        /* Some people have this overwritten, lets give it priority */
        realHost = _module.TRACKER;
      }
      _module.h = realHost + "/wigzo.js";

      if (_module.h.startsWith("http")) {
        _module.h = _module.h.substr(_module.h.indexOf("://") + 1, _module.h.length);
      }
      if (_module.integrationSource !== "Segment") {
        //In case of Segment.com integration, we don't need to call configure as it is done explicitly in segment app script
        //TODO: fix it in segment script (add _module.h / wigzo.h var) and remove above condition afterwards
        _module.q = [];
        wigzo("configure", _module.ORGANIZATIONID, _module.USER_IDENTIFIER);
      }
    }

    if (_module.h.indexOf("//app.wigzo") == 0 || _module.h.indexOf("//tracker.wigzopush") == 0) {
      /* We have loaded this JS from standard host */
      //_module["SERVICES"] = "https://services.wigzopush.com";
      _module["APP"] = "https://tracker.wigzopush.com";
      _module["CLOUDFLARE"] = "https://app.wigzo.com";
      _module["COMPLETION_PATH"] = ".wigzopush.com";
    } else {

      var splitArr = _module.h.split("/");
      var basePath = '//tracker.wigzopush.com';
      if (splitArr.length > 1) {
        basePath = '//' + splitArr[2]; // assuming _module.h to be of pattern ' //{TRACKER}/wigzo.js' OR '//{TRACKER}/whitelabel.js'
      }

      // var basePath = _module.h.substr(0, _module.h.indexOf(wigzoJsName))
      //_module["SERVICES"] = "https://services.wigzopush.com";
      _module["APP"] = (basePath.indexOf("localhost") == -1 ? "https:" : "http:") + basePath;
      _module["CLOUDFLARE"] = (basePath.indexOf("localhost") == -1 ? "https:" : "http:") + basePath;
    }

    _module.consoleDebug("Loading Wigzo JS.. Starting from: " + _module.APP);

    configureFnDef = _module.q.shift();
    if (null == configureFnDef) {
      _module.error("No configure call, please use wigzo (\"configure\", \"orgtoken\") as the first call to initialize. Gracefully quitting.");
      return;
    }
    if (configureFnDef.length < 2) {
      _module.error("Invalida parameters in configure call. Need 2 arguments atleast. Gracefully quitting.");
    }
    if (configureFnDef[0] !== "configure") {
      _module.error("The first call has to be configure, Gracefully quitting.");
    }
    _module.consoleDebug("Configuring Wigzo..");
    _module.dynamicCall.apply(_module, configureFnDef);

  }

  _module.configure = function (value, mappedInfo) {
    _module.consoleDebug("Using ORGID: " + value);
    _module.ORGANIZATIONID = value;
    _module.USER_IDENTIFIER = mappedInfo || "";
    var h = window.location.protocol + "//" + window.location.host;
    var url = document.querySelector('link[rel="shortcut icon"]');
    var via = _module.getEcommercePlatform();
    _module.jsonp(_module.APP + "/jserver/v1/org/" + value + "?v=" + via + "&s=" + h, function (data) {
      // First push after configuring reciever will cause the loop to begin
      if (data.code == 1604) {
        _module.error("Invalid Organization ID, please check your integration.");
        return;
      }
      if (!!data.features) {
        for (var i in data.features) {
          _module["FEATURES"][i] = data.features[i];
        }
      }
      _module.FORCE_CANONICAL_URL = data.force_canonical_url;
      _module.SLUGGED_DOMAIN = data.slug;
      _module.SERVER_VERSION = data.version;
      _module.FRESHCHATURL = data.freshchaturl;

      _module.SERVICE_WORKER_PATH = _module.SERVICE_WORKER_PATH ? _module.SERVICE_WORKER_PATH : data.swpath;
      _module.SERVICE_WORKER_SCOPE = _module.SERVICE_WORKER_SCOPE ? _module.SERVICE_WORKER_SCOPE : data.swscope;
      _module.MANIFEST_PATH = data.manifestpath;
      _module.SAFARI_WEBPUSH_ID = data.safaripushid;
      _module.SERVICES = data.services_host;
      _module.AUTO_LOADNOTIFICATIONS = data.autoload_notification;
      _module.PUSH_SETTINGS = JSON.parse(data.push_settings);
      _module.FORCE_HTTP = data.force_http;
      _module.ISEXITINTENTCSSENABLED = data.isExitIntentCssEnabled;
      _module.HTTP_COHOST = data.http_cohost;
      _module.IS_SPA = data.isSpa;


      _module.ENTITY_IS_WHITE_LABEL = data.entity_is_white_label;
      _module.ENTITY_VIEW = data.entity_view;
      _module.ENTITY_NAME = data.entity_name;
      if (_module.ENTITY_IS_WHITE_LABEL) {
        _module.ENTITY_SITE_URL = data.entity_site_url;
      } else {
        _module.ENTITY_SITE_URL = data.entity_site_url + window.location.host;
      }
      _module.ENTITY_BRANDING_URL = data.entity_branding_url;
      _module.ENTITY_POWERED_BY_LOGO_LIGHT = data.entity_powered_by_logo_light;
      _module.ENTITY_POWERED_BY_LOGO_DARK = data.entity_powered_by_logo_dark;
      _module.ENTITY_FAV_ICON_LIGHT = data.entity_fav_icon_light;
      _module.ENTITY_FAV_ICON_DARK = data.entity_fav_icon_dark;
      _module.ENTITY_WILDCARD = data.entity_wildcard;
      _module["COMPLETION_PATH"] = "." + _module.ENTITY_WILDCARD;
      _module.WIGZO_ENTITY_DATA = data;
      _module.HAS_LIVE_CHAT = data.has_live_chat;


      if (_module.HTTP_COHOST == "") {
        _module.HTTP_PARTIAL = "https://" + _module.SLUGGED_DOMAIN + _module["COMPLETION_PATH"];
      } else {
        _module.HTTP_PARTIAL = "https://" + data.http_cohost;
      }
      _module.consoleDebug("FeatureSet", _module.FEATURES);
      _module.userInitializer();
      !!_module.HAS_LIVE_CHAT && _module.initLiveChat();
    }, function () {
      _module.consoleDebug("Cannot get Organization Details! Cannot continue.. Aborting;");
      return;
    });
  }

  _module.userInitializer = function () {
    _module.consoleDebug("Loading Cookie..");
    _module.getOrCreateCookie(function (cookieId) {
      _module.IDENTIFIER = cookieId;
      if (window.location.host != 'app.wigzo.com' && !!_module.FRESHCHATURL) {
          var frame = document.createElement("iframe");
          frame.src = atob(_module.FRESHCHATURL) + "/p/"+ _module.IDENTIFIER + "/" + _module.ORGANIZATIONID + "/" + btoa(window.location.host);
          frame.width = "1";
          frame.height = "1";
          frame.id = "freshchatbox"
          frame.style.visibility = "hidden";
          document.body.appendChild(frame);
      }
      _module.main();
      /* Also starts the push execute loop */
    });
  }

  _module.checkCartCookie = function() {
    if (!_module.$.cookie('cart')) {
      setTimeout(_module.checkCartCookie, 100);
    } else {
      console.log('Cart ID changed');
      _module.helpers.readShopifyCartId(_module.canonicalUrl);
    }
  }

  _module.pass = function () {
    _module.consoleDebug("Starting Event Handlers..");
  }

  _module.send = function (params) {
    _module.consoleDebug("send: " + params);
  }

  if ((_module.hasOwnProperty("PLUGIN") && _module["PLUGIN"] == "SHOPIFY") || window.hasOwnProperty("Shopify") ||
    _module.integrationSource === "Segment") {
    /* This is because onLoad is already fired by the time Shopify is loaded */
    setTimeout(wigzo.lazyLoader, 10);
  }
  else {
    window[addEventListener ? 'addEventListener' : 'attachEvent'](addEventListener ? 'load' : 'onload', wigzo.lazyLoader);
  }

  _module.showBlock = function (target) {
    if (!_module.FEATURES.SmartBlock) {
      _module.log("SmartBlock feature is either not in plan or disabled.")
      return;
    }
    _module.consoleDebug(_module.APP);
    var blockId = wigzo.$(target).attr("data-blockid");
    if (!blockId) {
      _module.consoleDebug("Attribute data-blockid missing on wigzo block");
      return;
    }
    _module.consoleDebug("Creating wigzo block within the page..");
    wigzo.$(target).css("display", "none");

    var total = 0;
    var errors = 0;

    _module.jsonp(_module.APP + "/api/v1/getcode/" + blockId + "?cid=" + _module.IDENTIFIER + '&_=' + new Date().getTime(), function (data) {
      if (!data.code) {
        _module.consoleDebug("Didn't get code.. cannot continue.");
        return;
      }
      wigzo.$(target).html(data.code);
      total = target.length;
      wigzo.$(target).find("img").load(function (e) {
        if (this.width > 10) {
          wigzo.$(target).css("display", "block");
        } else {
          _module.consoleDebug("Target is error image");
          errors += 1;
        }
      });
    }, function () {
      _module.consoleDebug("Cannot get code, wigzo Error. 1055")
    });
  }


  //Function to track the events for the shopify. i.e. buy and addtocart

  _module.shopifyTrackEventAddToCart = function (cartId) {
    var url = document.querySelector("link[rel='canonical']").getAttribute('href');
    if (!url && document.querySelector("meta[property='og:url']")) {
      url = document.querySelector("meta[property='og:url']").getAttribute('content');
    }
    if (localStorage.getItem('wigzoStoredUrlOfAddTocart') == null) {
      localStorage.setItem('wigzoStoredUrlOfAddTocart', url);
    } else {
      var temp = localStorage.getItem('wigzoStoredUrlOfAddTocart');
      if (!temp.split(';').indexOf(url) > -1) {
        temp = temp + ';' + url;
        localStorage.setItem('wigzoStoredUrlOfAddTocart', temp);
      }
    }
    var canonicalUrl = url != null ? url : document.querySelector("link[rel='canonical']").getAttribute('href');
    var cartId = _module.$.cookie('cart');
    var eventVal = {"plugin": "shopify", "canonicalUrl": canonicalUrl, "cartId": cartId};
    wigzo('track', 'addtocart', eventVal);
  }

  //Function for the product indexing.

  _module.shopifyProductindexing = function () {
    var canonicalurl = document.querySelector("link[rel='canonical']").getAttribute('href');
    if (!!window.__st && !!__st.p && __st.p == "product" && canonicalurl != null) {
      var price = "0";
      if (!!meta.product && meta.product.variants.length > 0) {
        price = (meta.product.variants[0].price / 100).toFixed(2);
      }
      var imageUrl = _module.getKeywordsByCssSelector("meta[property='og:image:secure_url']", "content");
      if (imageUrl === undefined || imageUrl === null) {
        imageUrl = _module.getKeywordsByCssSelector("meta[property='og:image']", "content");
        if (imageUrl.toLowerCase().startsWith("https")) {
          imageUrl = imageUrl;
        } else if (imageUrl.toLowerCase().startsWith("http")) {
          imageUrl = "https://" + imageUrl.split("http://")[1];
        } else if (imageUrl.toLowerCase().startsWith("//")) {
          imageUrl = "https:" + imageUrl;
        }
      }
      wigzo.index({
        canonicalUrl: canonicalurl,
        title: _module.getKeywordsByCssSelector("meta[property='og:title']", "content"),
        description: _module.getKeywordsByCssSelector("meta[property='og:description']", "content"),
        price: price,
        author: window.meta.product.vendor != null ? window.meta.product.vendor : "",
        productId: __st.rid,
        image: imageUrl,
        language: docLang
      });

    }
  }
  _module.sallaProductindexing = function () {
    var canonicalurl = document.querySelector("link[rel='canonical']").getAttribute('href');
    var imageUrl = _module.getKeywordsByCssSelector("meta[property='og:image']", "content");
    if (imageUrl === 'undefined' || imageUrl === null) {
        imageUrl = _module.getKeywordsByCssSelector("meta[property='og:image']", "content");
        if (imageUrl.toLowerCase().startsWith("https")) {
            imageUrl = imageUrl;
        } else if (imageUrl.toLowerCase().startsWith("http")) {
            imageUrl = "https://" + imageUrl.split("http://")[1];
        } else if (imageUrl.toLowerCase().startsWith("//")) {
            imageUrl = "https:" + imageUrl;
        }
    }
    wigzo.index({
        canonicalUrl: canonicalurl,
        title: _module.getKeywordsByCssSelector("meta[property='og:title']", "content"),
        description: _module.getKeywordsByCssSelector("meta[property='og:description']", "content"),
        price: _module.getKeywordsByCssSelector("meta[property='product:price:amount']", "content"),
        productId: _module.getKeywordsByCssSelector("meta[property='product:retailer_item_id']", "content"),
        image: imageUrl,
        language: docLang,
    });

  }

  _module.sallaTrackEventAddToCart = function (productId) {
    var eventVal = {"plugin": "salla", "productId": productId};
    wigzo('track', 'addtocart', eventVal);
  }

  _module.sallaTrackEventProductView = function () {
    var url = document.querySelector("link[rel='canonical']").getAttribute('href');
    if (!url && document.querySelector("meta[property='og:url']")) {
        url = document.querySelector("meta[property='og:url']").getAttribute('content');
    }

    var canonicalUrl = url != null ? url : document.querySelector("link[rel='canonical']").getAttribute('href');
    var eventVal = {"plugin": "salla", "canonicalUrl": canonicalUrl};
    wigzo('track', 'productview', eventVal);
  }

  _module.sallaTrackEventCategoryView = function () {
    var url = document.querySelector("link[rel='canonical']").getAttribute('href');
    if (!url && document.querySelector("meta[property='og:url']")) {
        url = document.querySelector("meta[property='og:url']").getAttribute('content');
    }

    var canonicalUrl = url != null ? url : document.querySelector("link[rel='canonical']").getAttribute('href');
    var eventVal = {"plugin": "salla", "canonicalUrl": canonicalUrl};
    wigzo('track', 'categoryview', eventVal);
  }



  //Function to fetch the value by using the query selector.
  _module.getKeywordsByCssSelector = function (selector, content) {
    return document.querySelector(selector) != null ? document.querySelector(selector).getAttribute(content) : "";
  }

  // Function to track the buy event of the products.

  _module.shopifyTrackBuyEvent = function (arr) {
    var wigzoStroedUrlsAddToCart;
    if (!!localStorage.getItem('wigzoStoredUrlOfAddTocart'))
      wigzoStroedUrlsAddToCart = localStorage.getItem('wigzoStoredUrlOfAddTocart').split(';');
    if (wigzoStroedUrlsAddToCart == null)
      return;
    for (var i = 0; i < arr.length; i++) {
      var urlFound = arr[i].href.split('?')[0];
      if (wigzoStroedUrlsAddToCart.length > 0 && wigzoStroedUrlsAddToCart.indexOf(urlFound) > -1) {
        var canonicalByparts = urlFound.split("?");
        var params = {
          "e": _module.IDENTIFIER,
          "_": new Date(),
          "eventCategory": "EXTERNAL",
          "eventval": canonicalByparts[0],
          "u": canonicalByparts[0],
          "lang": docLang
        };

        var url = _module.APP + "/learn/" + _module.ORGANIZATIONID + "/buy/" + _module.IDENTIFIER;

        wigzoStroedUrlsAddToCart.splice(wigzoStroedUrlsAddToCart.indexOf(urlFound), 1);
        var ucSessionData = localStorage.getItem('_uc_session_v1');
        params["sc_mid"] = !!ucSessionData ?  JSON.parse(ucSessionData).u_mid : null;

        _module.post(url, params, function (res) {
          _module.log("Successfully bought - " + res);
        }, function (err) {
          _module.log(err);
        });
      }

    }
    localStorage.removeItem('wigzoStoredUrlOfAddTocart');
  }

  //TODO - Change function signature to make it generic
  _module.durationToMilliSec = function (exitIntentCampaign) {
    var multiplier = "SECONDS";
    switch (exitIntentCampaign.actionProps.timeBasedTargeting.durationType) {
      case "MINUTES":
        multiplier = 60 * 1000
        break;
      case "HOURS":
        multiplier = 3600 * 1000
        break;
      default:
        multiplier = 1000
        break;
    }
    var durationInMilliSec = exitIntentCampaign.actionProps.timeBasedTargeting.duration * multiplier || 10 * 60 * 1000;

    return durationInMilliSec;

  }

  _module.trackDailyActiveUser = function () {
    var daily_active_cookie = wigzo.$.cookie(_module["DAILY_ACTIVE_COOKIENAME"]);
    // if daily active cookie is not found create one with expiry and send info to record.
    if (!(!!daily_active_cookie)) {
      //Calculation for expiry of cookie, based on 24 hours of GMT time
      var expiry_date = new Date();
      expiry_date.setTime(expiry_date.getTime() + (24 * 60 * 60 * 1000));  //Adding one day to get correct expiry date
      var date = expiry_date.getDate();
      var month = expiry_date.getMonth();
      var year = expiry_date.getFullYear();

      //var expiry_date = utc_date + 24 * 60 * 100 - (Date());
      wigzo.$.cookie(_module["DAILY_ACTIVE_COOKIENAME"], "Active", {
        expires: new Date(year, month, date, 0, 0, 0, 0),
        path: '/'
      });        //Cookie will expire at GMT midnight
      // Increase counter
      daily_active_cookie = wigzo.$.cookie(_module["DAILY_ACTIVE_COOKIENAME"]);
      return true;
    }
    return false;
  }

  _module.exitIntent = (function (api) {

    api.fire = function (cookieId, exitIntentConfig, callback) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      if (!exitIntentConfig || !exitIntentConfig.hasOwnProperty('actionProps')) {
        _module.consoleDebug('[EXITINTENT] api.fire - No valid campaign found!');
        return;
      }
      _module.consoleDebug('[EXITINTENT] api.fire - ' + exitIntentConfig);
      // var exit_intent_interval = wigzo.$.cookie('EXIT_INTENT_INTERVAL');
      var blockedExitIntents = localStorage.hasOwnProperty('WIGZO_BLOCKED_EXIT_INTENT') ? JSON.parse(localStorage.getItem('WIGZO_BLOCKED_EXIT_INTENT')) : {};
      var blockedExitIntentUuids = Object.keys(blockedExitIntents);
      var milliSec = exitIntentConfig.interval;
      var date = new Date();
      date.setTime(date.getTime() + (milliSec));
      if (blockedExitIntentUuids.indexOf(exitIntentConfig.uuid) < 0 || blockedExitIntentUuids.length == 0) {
        //var eventEvalResult = api.evaluateEventsAgainstCriteria(exitIntentConfig);
        //if(eventEvalResult) {
        setTimeout(function () {
          _module.consoleDebug('[EXITINTENT] api.fire ()setTimeout - ' + exitIntentConfig);
          //wigzo.$.cookie("WIGZO_BLOCKED_EXIT_INTENT_INTERVAL", "BLOCKED", {expires: date, path: '/'});
          var blockedExitIntents = localStorage.hasOwnProperty('WIGZO_BLOCKED_EXIT_INTENT') ? JSON.parse(localStorage.getItem('WIGZO_BLOCKED_EXIT_INTENT')) : {};
          blockedExitIntents[exitIntentConfig.uuid] = {expireAt: date.getTime()};
          //exitIntents[exitIntentConfig.uuid][expireAt] = date.getTime();
          localStorage.setItem("WIGZO_BLOCKED_EXIT_INTENT", JSON.stringify(blockedExitIntents));
          api.showExitIntentPopUp(exitIntentConfig, cookieId, callback);
        }, exitIntentConfig.delay);
        //}
      }
      return api;
    };

    api.initExitIntentMouseHandler = function (cookieId, userType) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      // If hash is getting changed, Then user has already visited a few pages.
      _module.exitIntentMouseLeaveHandler = function () {
        _module.consoleDebug('Not a valid page...');
      };
      document.documentElement.addEventListener('mouseleave', function (e) {
        if (e.clientY < 0) {
          _module.exitIntentMouseLeaveHandler();
        }
      });
      api.checkAndInitializeExitIntent(cookieId, userType);
    }


    api.handleEventBasedExitIntent = function (cookieId, validCampaignsForThisPage) {
      api.fireCampaignByPriority(validCampaignsForThisPage, function (exitIntentCampaign) {
        if (exitIntentCampaign.hasOwnProperty('actionProps')
          && exitIntentCampaign.actionProps.hasOwnProperty('events')
          && exitIntentCampaign.actionProps.events.enabled) {
          var showExitIntent = api.evaluateEventsAgainstCriteria(exitIntentCampaign);
          if (showExitIntent) {
            api.fire(cookieId, exitIntentCampaign);
          }
          return;
        }
      });
    }

    api.initTimeBasedHandler = function (cookieId, validCampaignsForThisPage) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      var fireTimeBasedHandler = function (cookieId, validCampaignsForThisPage) {
        api.fireCampaignByPriority(validCampaignsForThisPage, function (exitIntentCampaign) {
          if (exitIntentCampaign.hasOwnProperty('actionProps')
            && exitIntentCampaign.actionProps.hasOwnProperty('timeBasedTargeting')
            && exitIntentCampaign.actionProps.timeBasedTargeting.status) {
            var durationInMilliSec = _module.durationToMilliSec(exitIntentCampaign);
            setTimeout(function () {
              api.fire(cookieId, exitIntentCampaign);
              fireTimeBasedHandler(cookieId, validCampaignsForThisPage);
            }, durationInMilliSec)
          }
        });
      }
      fireTimeBasedHandler(cookieId, validCampaignsForThisPage);

      /*api.fireCampaignByPriority(validCampaignsForThisPage, function (exitIntentCampaign) {
       if (exitIntentCampaign.hasOwnProperty('actionProps')
       && exitIntentCampaign.actionProps.hasOwnProperty('timeBasedTargeting')
       && exitIntentCampaign.actionProps.timeBasedTargeting.status) {
       var durationInMilliSec = _module.durationToMilliSec(exitIntentCampaign);
       setTimeout(function () {
       api.fire(cookieId, exitIntentCampaign);
       }, durationInMilliSec)
       }
       });*/
    }

    api.filterValidCampaigns = function (validCampaignsForThisPage) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      var filteredValidCampaigns;
      var blockExitIntentsUuids = api.localStorageExitIntentGC();
      if (!!blockExitIntentsUuids && blockExitIntentsUuids.length) {
        filteredValidCampaigns = validCampaignsForThisPage.filter(function (validCampaign) {
          return blockExitIntentsUuids.indexOf(validCampaign.uuid) < 0
        });
      } else {
        filteredValidCampaigns = validCampaignsForThisPage;
      }
      return filteredValidCampaigns;
    }

    api.checkAndInitializeExitIntent = function (cookieId, newOrReturning) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      api.migrateLegacyLocalStorageKey('EXIT_INTENT', 'WIGZO_BLOCKED_EXIT_INTENT');
      var url = _module.APP + '/api/exitintent/' + _module['ORGANIZATIONID'];
      _module.jsonp(url, function (res) {
        var allExitIntentCampaigns = res.data;
        if (!!_module.loadjscssfile && _module.ISEXITINTENTCSSENABLED) {
          _module.loadjscssfile(wigzo.CLOUDFLARE + "/assets/plugins/exitintent/exitintent.css", "css", null); // Dynamically load and add this .css file
        }
        var validCampaignsForThisPage = api.evaluateAgainstEachExitIntentCampaign(allExitIntentCampaigns, newOrReturning);
        if (validCampaignsForThisPage.length) {
          _module.exitIntentMouseLeaveHandler = function () {
            api.fireCampaignByPriority(validCampaignsForThisPage, function (validExitIntentCampaign) {
              _module.consoleDebug("[EXITINTENT] validExitIntentCampaign is ", validExitIntentCampaign);
              api.fire(cookieId, validExitIntentCampaign);
            });
          }
          api.initTimeBasedHandler(cookieId, validCampaignsForThisPage);
          api.handleEventBasedExitIntent(cookieId, validCampaignsForThisPage);
        } else {
          _module.consoleDebug("No valid campaign(s) found for this page...");
        }

        wigzo.$(window).scroll(function (scrlEvnt) {
          var scrollTop = wigzo.$(window).scrollTop();
          var docHeight = wigzo.$(document).height();
          var winHeight = wigzo.$(window).height();
          var scrollPercent = (scrollTop) / (docHeight - winHeight);
          var scrollPercentRounded = Math.round(scrollPercent * 100);

          api.fireCampaignByPriority(validCampaignsForThisPage, function (exitIntentCampaign) {
            if (!!exitIntentCampaign && exitIntentCampaign.hasOwnProperty('actionProps')
              && exitIntentCampaign.actionProps.hasOwnProperty('scroll')
              && exitIntentCampaign.actionProps.scroll.status
              && scrollPercentRounded >= exitIntentCampaign.actionProps.scroll.percentage) {
              api.fire(cookieId, exitIntentCampaign);
            }
          });
          _module.consoleDebug(scrollPercentRounded);
        });
      }, function (e) {
        _module.log("Error occurred ", e);
      }, "json");
    }

    api.evaluateAgainstEachExitIntentCampaign = function (allExitIntentCampaigns, newOrReturning) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      var validCampaignsForThisPage = [];
      allExitIntentCampaigns.forEach(function (exitIntentCampaign) {
        exitIntentCampaign.actionProps.usersTargeting.userType = exitIntentCampaign.actionProps.hasOwnProperty('usersTargeting') ? exitIntentCampaign.actionProps.usersTargeting.userType : 'all';
        var isValidCampaignForPage = (exitIntentCampaign.actionProps.usersTargeting.userType === 'all' || exitIntentCampaign.actionProps.usersTargeting.userType === newOrReturning)
          && (api.evaluateExitIntentAgainstScreenSize(exitIntentCampaign))
          && (api.evaluateExitIntentUrlTargetingOptions(exitIntentCampaign))
          && (api.evaluateLocationAndSystemAgainstCriteria(exitIntentCampaign));

        if (isValidCampaignForPage) {
          validCampaignsForThisPage.push(exitIntentCampaign);
        }
      });
      return validCampaignsForThisPage;
    }

    api.evaluateLocationAndSystemAgainstCriteria = function (exitIntentCampaign) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      var locationAndSystemTargeting = exitIntentCampaign.actionProps.locationAndSystemTargeting;
      if (!!locationAndSystemTargeting && locationAndSystemTargeting.status) {
        return api.evaluateAgainstCriteria(locationAndSystemTargeting.criteria, locationAndSystemTargeting.globalOperator);
      }

      // If location and system targeting is not enabled for this campaign, just return true in order to skip it.
      return true;
    }

    api.evaluateEventsAgainstCriteria = function (exitIntentCampaign) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      var result = false;
      if (!!exitIntentCampaign && Object.keys(exitIntentCampaign).length) {
        var eventsToBeChecked = exitIntentCampaign.actionProps.events.enabled && exitIntentCampaign.actionProps.events;
        if (!eventsToBeChecked || !eventsToBeChecked.enabled) {    // events targeging is disabled. so just return true.
          result = true;
        } else if (localStorage.hasOwnProperty('WIGZO_EVENTS')) {
          var eventsPerformed = JSON.parse(localStorage.getItem('WIGZO_EVENTS')),
            eventNamesToBeChecked = eventsToBeChecked.primaryEvents;
          if (Object.keys(eventsPerformed).length > 0) { // if eventsPerformed != {}
            for (var i = 0; i < eventNamesToBeChecked.length; i++) {
              if (eventsPerformed.hasOwnProperty(eventNamesToBeChecked[i])) {
                result = true;
                break;
              }
            }
          }
        }
      }
      return result;
    }

    api.evaluateExitIntentAgainstScreenSize = function (exitIntentCampaign) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      var deviceScreenConfig = exitIntentCampaign.actionProps.device.screen;
      /*
       screen.width <= 425 mobile
       screen.width > 425 && screen.width <= 768 tablet
       screen.width > 768 desktop
       */
      return (screen.width > 768 && deviceScreenConfig.desktop.show) ||
        (screen.width <= 425 && deviceScreenConfig.mobile.show) ||
        (screen.width > 425 && screen.width <= 768 && deviceScreenConfig.tablet.show);
    }

    api.evaluateExitIntentUrlTargetingOptions = function (exitIntentCampaign) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      return _module.helpers.checkAgainstUrlCriteria(exitIntentCampaign.actionProps.urlTargeting);
    }

    api.evaluateAgainstCriteria = function (criteria, globalOperator) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      var result = false;
      for (var i = 0; i < criteria.length; i++) {
        var targetCriterion = criteria[i];
        var actual = _module[targetCriterion['criterion']];
        var evaluatedResult = false;
        if(targetCriterion['criterion'] === "country"){
            evaluatedResult = _module.helpers.checkAgainstLocationCriteria(actual, criteria[i]);
        } else {
          if (targetCriterion.operator === 'equals') {
            if (targetCriterion.value instanceof Array) {
              evaluatedResult = (targetCriterion.value[0] === actual);
            } else {
              evaluatedResult = (targetCriterion.value === actual);
            }
          } else if (targetCriterion.operator === 'notequals') {
            if (targetCriterion.value instanceof Array) {
              evaluatedResult = (targetCriterion.value[0] !== actual);
            } else {
              evaluatedResult = (targetCriterion.value !== actual);
            }
          } else if (targetCriterion.operator === 'contains') {
            evaluatedResult = (actual.indexOf(targetCriterion.value) >= 0);
          } else if (targetCriterion.operator === 'doesnotcontain') {
            evaluatedResult = (actual.indexOf(targetCriterion.value) < 0);
          } else if (targetCriterion.operator === 'in') {
            evaluatedResult = (targetCriterion.value.indexOf(actual) >= 0);
          } else if (targetCriterion.operator === 'notin') {
            evaluatedResult = (targetCriterion.value.indexOf(actual) < 0);
          } else if (targetCriterion.operator === 'startswith') {
            evaluatedResult = (actual.startsWith(targetCriterion.value[0]));
          }

        }
        result = evaluatedResult;
        if (globalOperator === 'AND' && !evaluatedResult) {
          break;
        } else if (globalOperator === 'OR' && evaluatedResult) {
          break;
        }
      }
      return result;
    }

    //TODO Change function name
    /**
     * Performs GC on exit intent campaigns stored in localStorage.
     * @returns Blocked exit intent campaigns.
     */
    api.localStorageExitIntentGC = function () {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      if (localStorage.hasOwnProperty('WIGZO_BLOCKED_EXIT_INTENT')) {
        var updateExitIntentStorage = false;
        var blockedExitIntents = localStorage.hasOwnProperty('WIGZO_BLOCKED_EXIT_INTENT') ? JSON.parse(localStorage.getItem('WIGZO_BLOCKED_EXIT_INTENT')) : {};
        var blockedExitIntentUuids = Object.keys(blockedExitIntents);
        for (var i = 0; i < blockedExitIntentUuids.length; i++) {
          var blockedExitIntentUuid = blockedExitIntentUuids[i];
          var expireAt = blockedExitIntents[blockedExitIntentUuid].expireAt;
          var currentMs = new Date().getTime();
          if (expireAt <= currentMs) {
            updateExitIntentStorage = true;
            delete blockedExitIntents[blockedExitIntentUuid];
          }
        }
        if (updateExitIntentStorage) {
          localStorage.setItem("WIGZO_BLOCKED_EXIT_INTENT", JSON.stringify(blockedExitIntents));
        }
        return Object.keys(blockedExitIntents); // returns an array of blocked exit intents' uuids;
      }
    }

    api.migrateLegacyLocalStorageKey = function (oldKey, newKey) {
      if (localStorage.hasOwnProperty(oldKey)) {
        var values = localStorage.getItem(oldKey);
        localStorage.setItem(newKey, values);
        localStorage.removeItem(oldKey);
      }
    }

    /**
     * Check & fetch campaign with highest priority.
     * Priority(Asc to Desc) - campaign with specific url criteria, campaign with events criteria enabled
     * @param validCampaignsForThisPage All valid campaigns for this page.
     * @param onSuccess
     */
    api.fireCampaignByPriority = function (validCampaignsForThisPage, onSuccess) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      api.localStorageExitIntentGC();
      var validCampaigns = [], eventsEnabledCampaigns = [], urlSpecificCampaigns = [], otherCampaigns = [];
      var selectedExitIntent = {};
      for (var index = 0; index < validCampaignsForThisPage.length; index++) {
        var exitIntentCampaign = validCampaignsForThisPage[index];
        var showExitIntent = true;

        if (exitIntentCampaign.actionProps.urlTargeting.choice === 'SPECIFIC') {
          showExitIntent = showExitIntent && api.evaluateExitIntentUrlTargetingOptions(exitIntentCampaign);
        }

        if (!!exitIntentCampaign.actionProps.events && exitIntentCampaign.actionProps.events.enabled) {
          showExitIntent = showExitIntent && api.evaluateEventsAgainstCriteria(exitIntentCampaign);
        }

        if (showExitIntent) {
          if (exitIntentCampaign.actionProps.urlTargeting.choice === 'SPECIFIC' && api.evaluateExitIntentUrlTargetingOptions(exitIntentCampaign)) {
            validCampaigns.push(exitIntentCampaign);
            break;
          } else {
            validCampaigns.push(exitIntentCampaign);
          }
        }

      }
      if (!!onSuccess) {
        if (validCampaigns.length)
          onSuccess(validCampaigns[validCampaigns.length - 1]);
      }
    };

    api.closePopUp = function () {
      var closeEvent = new CustomEvent('exit-intent-close-pop-up');
      document.body.dispatchEvent(closeEvent);
    }

    api.populateCustomTemplateMarkup = function (exitIntentConfig, cookieId, cssTemplateId) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      if (window.location.host === "app.wigzo.com") {
        _module.consoleDebug("Do not show template on dashboard");
        return;
      }

      if (wigzo.$('iframe#' + exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId).length > 0) {
        _module.consoleDebug("Same template is already present. So gracefully quitting...");
        return;
      }

      var customExitIntentScriptTag = document.createElement('iframe');
      customExitIntentScriptTag.setAttribute('src', wigzo.APP + '/exitintent/customtemplate/generate/markup/' + wigzo.ORGANIZATIONID + '/' + exitIntentConfig.uuid + "?_" + new Date().getTime() + '&_siteid=' + wigzo.ORGANIZATIONID);
      customExitIntentScriptTag.setAttribute('id', exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId);
      var styleString;
      if(!!cssTemplateId && ['WIGZOEXITINTENTTEMP31', 'WIGZOEXITINTENTTEMP32'].includes(cssTemplateId)){
        styleString = "position: fixed; width: 200px; display: block; height: 100px!important;  left: 10px; bottom: 10px; z-index: 93462627999;border: none";
      } else {
        styleString = "position: fixed; width: 100%; display: block; height: 100vh !important; top: 0; left: 0; right: 0; bottom: 0; z-index: 93462627999;";
      }
      customExitIntentScriptTag.setAttribute('style', styleString);
      customExitIntentScriptTag.setAttribute('scrolling', "no");

      document.body.appendChild(customExitIntentScriptTag);

      if (!api.hasGlobalMessageListener) {
        window.addEventListener('message', function (event) {
          api.customTemplatePostMessageHandler(event, exitIntentConfig, cookieId)
        }, false);
        document.body.addEventListener('exit-intent-close-pop-up', function (event) {
          api.customTemplateClosePopUpHandler(event, exitIntentConfig);
        }, false);
        api.hasGlobalMessageListener = true;
      }
      return;
    };

    api.customTemplateClosePopUpHandler = function (event, exitIntentConfig) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      var isConverted = _module.isMapped('CONVERTED');
      wigzo.$('iframe#' + exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId).fadeOut(500, function () {
        $(this).remove();
      });
      if (!isConverted) {
        // If this user is not converted before, It's a bounced user.
        _module.jsonp(_module.APP + '/api/exitintent/count/bounced/' + _module['ORGANIZATIONID'] + '/' + exitIntentConfig.uuid);
      }
    }

    api.customTemplatePostMessageHandler = function (event, exitIntentConfig, cookieId) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      var isConverted = _module.isMapped('CONVERTED');
      var type = event.data.type || '';
      if (type === 'close') {
        api.closePopUp();
      } else if (type === 'pixel') {
        // Incrementing impression count.
        _module.jsonp(_module.APP + '/api/exitintent/impression/' + _module['ORGANIZATIONID'] + '/' + exitIntentConfig.uuid);
      } else if (type === "couponEvent") {
        _module.track(event.data.eventName, event.data.eventValue);
      } else if (type === 'dispatchEvent') {
        if (typeof wigzo.exitIntentEventListner === 'function') {
          var eventData = {
            eventName: event.data.eventName,
            eventValue: event.data.eventValue
          }
          wigzo.exitIntentEventListner(eventData);
        } else {
          _module.consoleDebug('No listner found for event(s)');
        }
        //return false;
      } else if (type === 'submit') {
        var conversionUrl = _module.APP + '/api/exitintent/count/converted/' + _module['ORGANIZATIONID'] + '/' + exitIntentConfig.uuid + '?converted=' + isConverted;
        // Validating email/phone.
        var isValidEmail = event.data.hasOwnProperty('email') ? _module.validateEmail(event.data.email) : true;
        var isValidPhone = event.data.hasOwnProperty('phone') ? _module.validatePhone(event.data.phone) : true;

        if (isValidEmail && isValidPhone) {
          var userInfo = {};
          userInfo['email'] = event.data.email;
          if (event.data.hasOwnProperty('phone') && event.data.phone != "") {
            userInfo['phone'] = event.data.phone;
          }
          if (event.data.hasOwnProperty('name') && event.data.name != "") {
            userInfo['fullName'] = event.data.name;
          }
          userInfo['exitIntentUuid'] = exitIntentConfig.uuid;
          _module.identify(userInfo, ['email', 'phone', 'exitIntentUuid'], function (res) {
            _module.consoleDebug("Subscribed successfully : " + res);

            // If it's not converted user then update 'IS_MAPPED' cookie, and increment counter for mapped/converted user.
            var isMappedCookie = wigzo.$.cookie("IS_MAPPED") || "";

            if (!!isMappedCookie && isMappedCookie.indexOf('CONVERTED') < 0) {
              var mappedCookieArr = isMappedCookie.split("~");
              mappedCookieArr.push('CONVERTED');
              wigzo.$.cookie("IS_MAPPED", mappedCookieArr.join("~"), {
                expires: 80 * 365,
                path: '/'
              });
            }
            _module.track("exitintent", cookieId);
            _module.track("exitintentCampaignUuid", exitIntentConfig.uuid);

            if (res.hasOwnProperty('email')) {
              conversionUrl += '&email';
            }
            if (res.hasOwnProperty('phone')) {
              conversionUrl += '&phone';
            }
            _module.jsonp(conversionUrl);

            if (exitIntentConfig.actionProps.hasOwnProperty('fireEvents') && exitIntentConfig.actionProps.fireEvents.enabled) {
              var eventName = exitIntentConfig.actionProps.fireEvents.eventName;
              var eventVal = exitIntentConfig.actionProps.fireEvents.eventValue;
              if (!!eventName && !!eventVal)
                _module.track(eventName, eventVal);
            }

            if (Object.keys(res).length > 0) {
              _module.consoleDebug("User mapped from exit intent.");
            }

          }, 'EXITINTENT');
        }
        var redirectUrl;
        if (exitIntentConfig.actionProps.customTemplate.hasOwnProperty('redirect') && exitIntentConfig.actionProps.customTemplate.redirect.status) {
          redirectUrl = exitIntentConfig.actionProps.customTemplate.redirect.url;
        }
        event.data.campaignUrl = window.location.href;
        if (exitIntentConfig.actionProps.customTemplate.hasOwnProperty('endpoint') && exitIntentConfig.actionProps.customTemplate.endpoint != '') {
          postHandlerURL = _module.APP + "/exitintent/customtemplate/endpointhandler";
          postData = {'endpoint': exitIntentConfig.actionProps.customTemplate.endpoint, 'data': event.data};
          _module.post(postHandlerURL, postData, function (res) {
            wigzo.$('iframe#' + exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId).remove();
            _module.log("[SUCCESS] Response from client endpoint: " + res);
            if (!!redirectUrl) {
              document.location.href = redirectUrl;
            }
          }, function (err) {
            _module.log("[ERROR] Response from client endpoint: " + err);
          });
        } else {
          if (exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId !== "WIGZOEXITINTENTTEMP31"
          && exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId !== "WIGZOEXITINTENTTEMP32") {
            wigzo.$('iframe#' + exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId).remove();
          }
          if (!!redirectUrl) {
            document.location.href = redirectUrl;
          }
        }
      } else if(type === 'maximizeWheel'){
          if(event.data.hasOwnProperty("templateId") && ['WIGZOEXITINTENTTEMP31', 'WIGZOEXITINTENTTEMP32'].includes(event.data.templateId)){
            wigzo.$('iframe#'+event.data.templateId).css({"height": "100vh", "top": "0", "bottom": "0", "left": "0", "right": "0", "width": "100%"});
        }
      } else if(type === 'minimizeWheel'){
        if(event.data.hasOwnProperty("templateId") && ['WIGZOEXITINTENTTEMP31', 'WIGZOEXITINTENTTEMP32'].includes(event.data.templateId)) {
            wigzo.$('iframe#'+event.data.templateId).css({"height": "70px", "bottom": "10px", "top": "unset", "right": 'unset', "left": "10px", "width": "200px", "border": "none"});
        }
      }
      window.removeEventListener("message", function () {
        _module.log('Removed iframe message listener.');
      }, false);
    }

    api.showExitIntentPopUp = function (exitIntentConfig, cookieId, callback) {
      var wigzoOSCheck = navigator.userAgent.toLowerCase();
      var redirectURL = exitIntentConfig.actionProps.emailSubscriptionForm.redirect.url;
      if (!exitIntentConfig.actionProps.emailSubscriptionForm.redirect.isURL && redirectURL.includes('sms:')) {
        var isAndroid = wigzoOSCheck.indexOf('android') > -1;
        redirectURL = isAndroid ? redirectURL.replace('&body', '?body') : redirectURL;
        //redirectURL = !!navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/) ? redirectURL : redirectURL.replace("&body=", "?body=");
        exitIntentConfig.actionProps.emailSubscriptionForm.redirect.url = redirectURL;
      }
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      if (window.location.host === "app.wigzo.com") {
        _module.log("Do not show template on dashboard");
        return;
      }

      if (wigzo.$('.' + exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId).length > 0) {
        _module.log("Same template is already present. So gracefully quitting...");
        return;
      }
      var isMapped = wigzo.$.cookie("IS_MAPPED") || "";
      var mappedCookieArr = isMapped.split("~");
      // For custom templates.
      if (exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId === "WIGZOEXITINTENTCUSTOMTEMP") {
        if (exitIntentConfig.actionProps.usersTargeting.showToMappedUsers || (mappedCookieArr.indexOf('USER') < 0 && mappedCookieArr.indexOf('PHONE') < 0)) {
          api.populateCustomTemplateMarkup(exitIntentConfig, cookieId);
          return;
        } else {
          _module.consoleDebug("User is mapped.");
          return;
        }
      }

    if (exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId === "WIGZOEXITINTENTTEMP31"
    || exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId === "WIGZOEXITINTENTTEMP32") {
        api.populateCustomTemplateMarkup(exitIntentConfig, cookieId, exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId);
        return;
    }

      // For pre-definded templates.
      if (exitIntentConfig.actionProps.usersTargeting.showToMappedUsers || !(_module.isMapped('USER') || _module.isMapped('PHONE'))) {
        if (exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId === "WIGZOEXITINTENTTEMP26") {
          wigzo.$("body header").append(wigzo.__(exitIntentConfig.markup)).find('img#wigzo-exit-intent-empty-image').load(function () {
            if (wigzo.getAlignmentByLang() == 'right') {
              wigzo.$("body").find('div.exit-intent-tempalte .exit-intent-title').css('text-align', 'right');
              wigzo.$("body").find('div.exit-intent-tempalte .exit-intent-desc').css('text-align', 'right');
              wigzo.$("body").find('div.exit-intent-tempalte input').css('text-align', 'right');
              wigzo.$("body").find('div#wigzonotify-bottom-right-exitintent .wigzo-notifytitle').css('text-align', 'right');
              wigzo.$("body").find('div#wigzonotify-bottom-right-exitintent .wigzo-notifydesc').css('text-align', 'right');
            }
            wigzo.$("body").find('div.exit-intent-tempalte').removeClass("language-handler");
            wigzo.$("body").find('div#wigzonotify-bottom-right-exitintent').removeClass("language-handler");

            _module.consoleDebug("Template empty image loaded.");
            api.calculateHeightAndWidth(window, '#exit-intent-tempalte');

            // Re-calculate 'top' & 'left' each time window is resized.
            wigzo.$(window).on('resize', function () {
              api.calculateHeightAndWidth(window, '#exit-intent-tempalte');
            });
            if (_module.isMapped('USER')) {
              wigzo.$('#wigzoExitIntentEmailField').remove();
            }
            if (_module.isMapped('PHONE')) {
              wigzo.$('#wigzoExitIntentPhoneField').remove();
            }
            if (!!callback) {
              callback();
            }
            var isConverted = _module.isMapped('CONVERTED');

            // Template input validation...
            wigzo.$("#wigzo_exit_intent_template_form").children('input').each(function (index) {
              var childField = this;
              wigzo.$(childField).on('change keyup', function (event) {
                //console.log($(this).val());
                var fieldVal = wigzo.$(this).val();
                var isValid = false;
                if (wigzo.$(this).attr('name') == 'email') {
                  isValid = _module.validateEmail(fieldVal);
                } else if (wigzo.$(this).attr('name') == 'phone') {
                  var maskNumber = _module.maskPhone(event);
                  isValid = _module.validatePhone(maskNumber);
                } else {
                  isValid = true;
                }

                if (!isValid) {
                  wigzo.$(childField).addClass('wigzo-exit-intent-template-error');
                } else {
                  wigzo.$(childField).removeClass('wigzo-exit-intent-template-error');
                  wigzo.$(childField).next('.exitintent-error-block').html('');
                }
              });
            });


            wigzo.$("#wigzo_exit_intent_template_submit").on('click', function (e) {
              var emailFieldSelector = "#wigzoExitIntentEmailField";
              var phoneFieldSelector = "#wigzoExitIntentPhoneField";
              var nameFieldSelector = "#wigzoExitIntentNameField";
              var genderData = !!wigzo.$('[name = temp23gender]:checked')[0] ? wigzo.$('[name = temp23gender]:checked')[0].value : '';
              var userInfo = {};
              var isStep2Enabled = exitIntentConfig.hasOwnProperty('step2Fields') && exitIntentConfig.step2Fields.enabled;
              if (!!genderData) {
                wigzo('track', genderData);
              }

              var exitIntentSerializedForm = wigzo.$("#wigzo_exit_intent_template_form").serializeArray();
              wigzo.$.each(exitIntentSerializedForm, function (index, field) {
                userInfo[field.name] = field.value;
              });

              // Validating email/phone.
              var isValidEmail = userInfo.hasOwnProperty('email') ? _module.validateEmail(userInfo.email) : true;
              var isValidPhone = userInfo.hasOwnProperty('phone') ? _module.validatePhone(userInfo.phone) : true;
              var phone = '';

              if (isValidEmail && isValidPhone) {

                // step2Fields
                if (isStep2Enabled) {
                  // If it's a two step form, Then show step-2 as soon as user clicks on submit/confirm button under step-1.
                  wigzo.$('.wigzo-step2-form').css('display', 'block');
                  wigzo.$('.wigzo-step1-form').css('opacity', '0');
                } else {
                  // If it's a single step form, Then hide template as soon as user clicks on submit/confirm button.
                  wigzo.$('.' + exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId).parent().remove();
                }

                userInfo['exitIntentUuid'] = exitIntentConfig.uuid;
                var conversionUrl = _module.APP + '/api/exitintent/count/converted/' + _module['ORGANIZATIONID'] + '/' + exitIntentConfig.uuid + '?converted=' + isConverted;
                _module.identify(userInfo, ['email', 'phone', 'exitIntentUuid', 'fullName'], function (res) {
                  _module.consoleDebug("Subscribed successfully : " + res);

                  //if (Object.keys(res).length > 0) {

                  // If it's not converted user then update 'IS_MAPPED' cookie, and increment counter for mapped/converted user.
                  //if(!isConverted) {
                  var isMappedCookie = wigzo.$.cookie("IS_MAPPED") || "";

                  if (!!isMappedCookie && isMappedCookie.indexOf('CONVERTED') < 0) {
                    var mappedCookieArr = isMappedCookie.split("~");
                    mappedCookieArr.push('CONVERTED');
                    wigzo.$.cookie("IS_MAPPED", mappedCookieArr.join("~"), {
                      expires: 80 * 365,
                      path: '/'
                    });
                  }

                  if (res.hasOwnProperty('email')) {
                    conversionUrl += '&email';
                  }
                  if (res.hasOwnProperty('phone')) {
                    conversionUrl += '&phone';
                  }

                  _module.jsonp(conversionUrl, function (response) {
                    _module.track("exitintent", cookieId);
                    _module.track("exitintentCampaignUuid", exitIntentConfig.uuid);
                  });

                  if (exitIntentConfig.actionProps.hasOwnProperty('fireEvents') && exitIntentConfig.actionProps.fireEvents.enabled) {
                    var eventName = exitIntentConfig.actionProps.fireEvents.eventName;
                    var eventVal = exitIntentConfig.actionProps.fireEvents.eventValue;
                    if (!!eventName && !!eventVal)
                      _module.track(eventName, eventVal);
                  }

                  if (Object.keys(res).length > 0) {
                    _module.consoleDebug("User mapped from exit intent.");

                    if (Object.keys(exitIntentConfig.actionProps.integrations).length > 0) {
                      var providerData = {
                        email: userInfo.email,
                        phone: userInfo.hasOwnProperty('phone') ? userInfo.phone : '',
                        emailServiceProviders: exitIntentConfig.actionProps.integrations.emailServiceProviders,
                        exitIntentUuid: exitIntentConfig.uuid
                      };

                      _module.post(_module.APP + '/api/email/provider/subscribe/' + _module['ORGANIZATIONID'], providerData, function (res) {
                        _module.log(res);
                      });
                    }
                  }

                }, 'EXITINTENT');
              } else {
                var invalidFields = [];
                if (!isValidEmail) {
                  invalidFields.push(emailFieldSelector);
                  wigzo.$(emailFieldSelector).next('.exitintent-error-block').html(wigzo.__("__EXITINTENT_INVALIDEMAIL__"));
                }
                if (!isValidPhone) {
                  invalidFields.push(phoneFieldSelector);
                  wigzo.$(phoneFieldSelector).next('.exitintent-error-block').html(wigzo.__("__EXITINTENT_INVALIDPHONE__"));
                }
                wigzo.$(invalidFields.join(',')).addClass('wigzo-exit-intent-template-error');
                //alert("Please provide valid appropriate values.");    // shamail - removing techie aleart, Wed Oct 12 16:41:13 IST 2016
              }

              if (exitIntentConfig.actionProps.emailSubscriptionForm.redirect.status && isValidEmail && isValidPhone) {
                window.open(exitIntentConfig.actionProps.emailSubscriptionForm.redirect.url);
              }
              e.preventDefault();

            });
            wigzo.$(".fullTemplateRedirect").on('click', function (e) {
              if (exitIntentConfig.actionProps.emailSubscriptionForm.redirect.status) {
                window.location.replace(exitIntentConfig.actionProps.emailSubscriptionForm.redirect.url);
              }
              e.preventDefault();
            });
            wigzo.$(".cancel-button").on('click', function () {
              if (!isConverted) {
                // If this user is not converted before, It's a bounced user.
                _module.jsonp(_module.APP + '/api/exitintent/count/bounced/' + _module['ORGANIZATIONID'] + '/' + exitIntentConfig.uuid);
              }
              _module.consoleDebug("Bounced user.");

            });
            if (exitIntentConfig.hasOwnProperty('disappear')) {
              setTimeout(function () {
                wigzo.$('.' + exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId).parent().remove();
                if (!isConverted) {
                  // If this user is not converted before, It's a bounced user.
                  _module.jsonp(_module.APP + '/api/exitintent/count/bounced/' + _module['ORGANIZATIONID'] + '/' + exitIntentConfig.uuid);
                }
              }, exitIntentConfig.disappear);
            }

            // Incrementing impression count.
            _module.jsonp(_module.APP + '/api/exitintent/impression/' + _module['ORGANIZATIONID'] + '/' + exitIntentConfig.uuid);
          });
        }

        else {
          wigzo.$("body").append(wigzo.__(exitIntentConfig.markup)).find('img#wigzo-exit-intent-empty-image').load(function () {
            if (wigzo.getAlignmentByLang() == 'right') {
              wigzo.$("body").find('div.exit-intent-tempalte .exit-intent-title').css('text-align', 'right');
              wigzo.$("body").find('div.exit-intent-tempalte .exit-intent-desc').css('text-align', 'right');
              wigzo.$("body").find('div.exit-intent-tempalte input').css('text-align', 'right');
              wigzo.$("body").find('div#wigzonotify-bottom-right-exitintent .wigzo-notifytitle').css('text-align', 'right');
              wigzo.$("body").find('div#wigzonotify-bottom-right-exitintent .wigzo-notifydesc').css('text-align', 'right');
            }
            wigzo.$("body").find('div.exit-intent-tempalte').removeClass("language-handler");
            wigzo.$("body").find('div#wigzonotify-bottom-right-exitintent').removeClass("language-handler");

            _module.consoleDebug("Template empty image loaded.");
            api.calculateHeightAndWidth(window, '#exit-intent-tempalte');

            // Re-calculate 'top' & 'left' each time window is resized.
            wigzo.$(window).on('resize', function () {
              api.calculateHeightAndWidth(window, '#exit-intent-tempalte');
            });
            if (_module.isMapped('USER')) {
              wigzo.$('#wigzoExitIntentEmailField').remove();
            }
            if (_module.isMapped('PHONE')) {
              wigzo.$('#wigzoExitIntentPhoneField').remove();
            }
            if (!!callback) {
              callback();
            }
            var isConverted = _module.isMapped('CONVERTED');

            // Template input validation...
            wigzo.$("#wigzo_exit_intent_template_form").children('input').each(function (index) {
              var childField = this;
              wigzo.$(childField).on('change keyup', function (event) {
                //console.log($(this).val());
                var fieldVal = wigzo.$(this).val();
                var isValid = false;
                if (wigzo.$(this).attr('name') == 'email') {
                  isValid = _module.validateEmail(fieldVal);
                } else if (wigzo.$(this).attr('name') == 'phone') {
                  var maskNumber = _module.maskPhone(event);
                  isValid = _module.validatePhone(maskNumber);
                } else {
                  isValid = true;
                }

                if (!isValid) {
                  wigzo.$(childField).addClass('wigzo-exit-intent-template-error');
                } else {
                  wigzo.$(childField).removeClass('wigzo-exit-intent-template-error');
                  wigzo.$(childField).next('.exitintent-error-block').html('');
                }
              });
            });
            var errorField; var errorMessage;
            var getValidationStatus = function (userInfo) {
              if(!userInfo.hasOwnProperty('email') && !userInfo.hasOwnProperty('phone')){
                return true
              } else if(userInfo.hasOwnProperty('email') && userInfo.hasOwnProperty('phone')){
                  if(!!userInfo.email && !!userInfo.phone){
                    return (_module.validateEmail(userInfo.email) && _module.validatePhone(userInfo.phone))
                  } else if(!userInfo.email && !userInfo.phone){
                    return false
                  } else if(!!userInfo.email && !userInfo.phone){
                      return (_module.validateEmail(userInfo.email))
                  } else if(!userInfo.email && !!userInfo.phone){
                    return (_module.validatePhone(userInfo.phone))
                  }
              } else if(!userInfo.hasOwnProperty('email') && userInfo.hasOwnProperty('phone')){
                if(!!userInfo.phone){
                  return _module.validatePhone(userInfo.phone)
                } else return false;
              } else if(userInfo.hasOwnProperty('email') && !userInfo.hasOwnProperty('phone')){
                if(!!userInfo.email){
                  return _module.validateEmail(userInfo.email)
                } else return false
              }
            };

            wigzo.$("#wigzo_exit_intent_template_submit").on('click', function (e) {
              var emailFieldSelector = "#wigzoExitIntentEmailField";
              var phoneFieldSelector = "#wigzoExitIntentPhoneField";
              var nameFieldSelector = "#wigzoExitIntentNameField";
              var genderData = !!wigzo.$('[name = temp23gender]:checked')[0] ? wigzo.$('[name = temp23gender]:checked')[0].value : '';
              var userInfo = {};
              var isStep2Enabled = exitIntentConfig.hasOwnProperty('step2Fields') && exitIntentConfig.step2Fields.enabled;
              if (!!genderData) {
                wigzo('track', genderData);
              }

              var exitIntentSerializedForm = wigzo.$("#wigzo_exit_intent_template_form").serializeArray();
              wigzo.$.each(exitIntentSerializedForm, function (index, field) {
                userInfo[field.name] = field.value;
              });

              // Validating email/phone.
              //var isValidEmail = userInfo.hasOwnProperty('email') ? _module.validateEmail(userInfo.email) : true;
              //var isValidPhone = userInfo.hasOwnProperty('phone') ? _module.validatePhone(userInfo.phone) : true;
              //var isValidEmail = !!userInfo.email ? _module.validateEmail(userInfo.email) : true
              //var isValidPhone = !!userInfo.phone ? _module.validatePhone(userInfo.phone) : true;
              var phone = '';
              //if (isValidEmail && isValidPhone && !(!userInfo.email && !userInfo.phone)) {
              if (getValidationStatus(userInfo)) {

                // step2Fields
                if (isStep2Enabled) {
                  // If it's a two step form, Then show step-2 as soon as user clicks on submit/confirm button under step-1.
                  wigzo.$('.wigzo-step2-form').css('display', 'block');
                  wigzo.$('.wigzo-step1-form').css('opacity', '0');
                  wigzo.$('.wigzo-step1-form-29').css('display', 'none');
                } else {
                  // If it's a single step form, Then hide template as soon as user clicks on submit/confirm button.
                  wigzo.$('.' + exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId).parent().remove();
                }

                userInfo['exitIntentUuid'] = exitIntentConfig.uuid;
                var conversionUrl = _module.APP + '/api/exitintent/count/converted/' + _module['ORGANIZATIONID'] + '/' + exitIntentConfig.uuid + '?converted=' + isConverted;
                _module.identify(userInfo, ['email', 'phone', 'exitIntentUuid', 'fullName'], function (res) {
                  _module.consoleDebug("Subscribed successfully : " + res);

                  //if (Object.keys(res).length > 0) {

                  // If it's not converted user then update 'IS_MAPPED' cookie, and increment counter for mapped/converted user.
                  //if(!isConverted) {
                  var isMappedCookie = wigzo.$.cookie("IS_MAPPED") || "";

                  if (!!isMappedCookie && isMappedCookie.indexOf('CONVERTED') < 0) {
                    var mappedCookieArr = isMappedCookie.split("~");
                    mappedCookieArr.push('CONVERTED');
                    wigzo.$.cookie("IS_MAPPED", mappedCookieArr.join("~"), {
                      expires: 80 * 365,
                      path: '/'
                    });
                  }

                  if (res.hasOwnProperty('email')) {
                    conversionUrl += '&email';
                  }
                  if (res.hasOwnProperty('phone')) {
                    conversionUrl += '&phone';
                  }

                  _module.jsonp(conversionUrl, function (response) {
                    _module.track("exitintent", cookieId);
                    _module.track("exitintentCampaignUuid", exitIntentConfig.uuid);
                  });

                  if (exitIntentConfig.actionProps.hasOwnProperty('fireEvents') && exitIntentConfig.actionProps.fireEvents.enabled) {
                    var eventName = exitIntentConfig.actionProps.fireEvents.eventName;
                    var eventVal = exitIntentConfig.actionProps.fireEvents.eventValue;
                    if (!!eventName && !!eventVal)
                      _module.track(eventName, eventVal);
                  }
                  if (exitIntentConfig.actionProps.customTemplate.hasOwnProperty('endpoint') && exitIntentConfig.actionProps.customTemplate.endpoint != '') {
                    postHandlerURL = _module.APP + "/exitintent/customtemplate/endpointhandler";
                    postData = {'endpoint': exitIntentConfig.actionProps.customTemplate.endpoint, 'data': userInfo};
                    _module.post(postHandlerURL, postData, function (res) {
                             wigzo.$('iframe#' + exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId).remove();
                             _module.log("[SUCCESS] Response from client endpoint: " + res);
                             if (!!redirectUrl) {
                               document.location.href = redirectUrl;
                             }
                           }, function (err) {
                             _module.log("[ERROR] Response from client endpoint: " + err);
                           });
                           }
                  if (Object.keys(res).length > 0) {
                    _module.consoleDebug("User mapped from exit intent.");

                    if (Object.keys(exitIntentConfig.actionProps.integrations).length > 0) {
                      var providerData = {
                        email: userInfo.email,
                        phone: userInfo.hasOwnProperty('phone') ? userInfo.phone : '',
                        emailServiceProviders: exitIntentConfig.actionProps.integrations.emailServiceProviders,
                        exitIntentUuid: exitIntentConfig.uuid
                      };

                      _module.post(_module.APP + '/api/email/provider/subscribe/' + _module['ORGANIZATIONID'], providerData, function (res) {
                        _module.log(res);
                      });
                    }
                  }

                }, 'EXITINTENT');
              } else {
                var invalidFields = [];

                if (!userInfo.email && !userInfo.phone) {
                  //  COMBINED ERROR DISPLAY
                  if(userInfo.hasOwnProperty('email')){
                    wigzo.$(emailFieldSelector).next('.exitintent-error-block').html(wigzo.__("Email or Phone is required!"));
                  } else {
                    wigzo.$(phoneFieldSelector).next('.exitintent-error-block').html(wigzo.__("Email or Phone is required!"));
                  }

                }

                if (!!userInfo.email && !_module.validateEmail(userInfo.email) ) {
                  invalidFields.push(emailFieldSelector);
                  wigzo.$(emailFieldSelector).next('.exitintent-error-block').html(wigzo.__("__EXITINTENT_INVALIDEMAIL__"));
                }
                if (!!userInfo.phone && ! _module.validatePhone(userInfo.phone)) {
                  invalidFields.push(phoneFieldSelector);
                  wigzo.$(phoneFieldSelector).next('.exitintent-error-block').html(wigzo.__("__EXITINTENT_INVALIDPHONE__"));
                }
                //wigzo.$(invalidFields.join(',')).addClass('wigzo-exit-intent-template-error');
                //alert("Please provide valid appropriate values.");    // shamail - removing techie aleart, Wed Oct 12 16:41:13 IST 2016
              }


              if (exitIntentConfig.actionProps.emailSubscriptionForm.redirect.status &&
                getValidationStatus(userInfo)) {
                window.open(exitIntentConfig.actionProps.emailSubscriptionForm.redirect.url);
              }
              e.preventDefault();

            });
            wigzo.$(".fullTemplateRedirect").on('click', function (e) {
              if (exitIntentConfig.actionProps.emailSubscriptionForm.redirect.status) {
                window.location.replace(exitIntentConfig.actionProps.emailSubscriptionForm.redirect.url);
              }
              e.preventDefault();
            });
            wigzo.$(".cancel-button").on('click', function () {
              if (!isConverted) {
                // If this user is not converted before, It's a bounced user.
                _module.jsonp(_module.APP + '/api/exitintent/count/bounced/' + _module['ORGANIZATIONID'] + '/' + exitIntentConfig.uuid);
              }
              _module.consoleDebug("Bounced user.");

            });
            if (exitIntentConfig.hasOwnProperty('disappear')) {
              setTimeout(function () {
                wigzo.$('.' + exitIntentConfig.actionProps.emailSubscriptionForm.cssTemplateId).parent().remove();
                if (!isConverted) {
                  // If this user is not converted before, It's a bounced user.
                  _module.jsonp(_module.APP + '/api/exitintent/count/bounced/' + _module['ORGANIZATIONID'] + '/' + exitIntentConfig.uuid);
                }
              }, exitIntentConfig.disappear);
            }

            // Incrementing impression count.
            _module.jsonp(_module.APP + '/api/exitintent/impression/' + _module['ORGANIZATIONID'] + '/' + exitIntentConfig.uuid);
          });
        }
      }
    }

    api.calculateHeightAndWidth = function (parentSelector, tplSelector) {
      if (!_module.FEATURES.ExitIntent) {
        _module.log("EXITINTENT feature is either not in plan or disabled.")
        return;
      }
      var tplRef = wigzo.$(tplSelector);

      // For templates having banner...
      if (tplRef.data("banner")) {
        wigzo.$(".exit-intent-banner img").one('load', function () {
          var tplHeight = tplRef.height();
          //var parentHeight = wigzo.$(parentSelector).height(); old method for calculation parent height. Giving unexpected results that causing alignment issue in the exit intent. Working fine in the website with doctype mentioned.
          var parentHeight = parentSelector.innerHeight;
          var calculatedHeight = (parentHeight - tplHeight) / 2;
          tplRef.css("top", calculatedHeight);
        }).each(function () {
          if (this.complete) {
            wigzo.$(this).trigger('load');
          }
        });
      }
      // For templates without banner...
      else {
        var tplHeight = tplRef.height();
        //var parentHeight = wigzo.$(parentSelector).height();
        var parentHeight = parentSelector.innerHeight;
        var calculatedHeight = (parentHeight - tplHeight) / 2;
        tplRef.css("top", calculatedHeight);
      }

      var tplWidth = tplRef.width();
      //var parentWidth = wigzo.$(parentSelector).width();
      var parentWidth = parentSelector.innerWidth;
      var calculatedWidth = (parentWidth - tplWidth) / 2;
      tplRef.css("left", calculatedWidth);

      // Handle zooming...
      var wigzoua = navigator.userAgent.toLowerCase();
      var isWigzoAndroid = wigzoua.indexOf("android") > -1; // Detect Android and apply the CSS for the same
      if (isWigzoAndroid) {
        wigzo.$(document).on("focus", "#wigzoExitIntentEmailField", function (event) {
          var tplboxheight = wigzo.$(window).height();
          var boxheight = tplboxheight - 25;
          if (wigzo.$('#blankwigzo').length < 1) {
            wigzo.$("#exit-intent-tempalte").append("<div id='blankwigzo' style='height:" + boxheight + "px;'" + "></div>");
          }
          wigzo.$('html, body').animate({scrollTop: wigzo.$('#wigzoExitIntentEmailField').offset().top - 100}, 500);
        });

        wigzo.$(document).on("focusout", "#wigzoExitIntentEmailField", function (event) {
          wigzo.$('#blankwigzo').remove();
        });
      }
      if (parentWidth > 768) { //Disabling zoom if device mobile
        var desiredHeight = (Math.round(parentHeight * 0.95) - 100);
        var zoom = (desiredHeight / tplHeight);
        if (zoom > 0 && zoom < 1) {
          tplRef.css('transform', 'scale(' + zoom + ')');
          tplRef.css('-webkit-transform', 'scale(' + zoom + ')');
          tplRef.css('-moz-transform', 'scale(' + zoom + ')');
          tplRef.css('-o-transform', 'scale(' + zoom + ')');
        }
      }
      tplRef.show();
    }

    return api;
  })(_module.exitIntent || {});

  _module.takeAction = function (templateUuid, actionType, callback) {
    if (!actionType || !templateUuid) {
      console.error("Can't take action, please provide valid actionType and templateUuid. Valid action types are - browserpushaction, onsitepushaction, smsaction, emailaction, httphookaction, tcpipaction")
      return;
    }

    var url = _module.APP + '/api/channels/' + _module['ORGANIZATIONID'] + '/' + actionType.trim() + '/' + _module.IDENTIFIER + '?templateUuid=' + templateUuid;	// /api/channels/:orgIdOrToken/:actionType/:cookieId/:templateUuid
    _module.get(url, function (res) {
      if (callback) {
        callback(res);
      }
    });
  }

  _module.takeActionVanilla = function (data, actionType, callback) {
    if (!actionType || !data) {
      console.error("Can't take action, please provide valid actionType and templateUuid. Valid action types are - browserpushaction, onsitepushaction, smsaction, emailaction, httphookaction, tcpipaction");
      return;
    }
    var url = _module.APP + '/api/channels/' + _module['ORGANIZATIONID'] + '/' + actionType.trim() + '/' + _module.IDENTIFIER;
    _module.post(url, data, function (res) {
      if (callback) {
        callback(res);
      }
    }, function (e) {
      _module.log("Error in posting in takeActionVanilla: " + e);
    });
  }

  /**
   *
   * @type {{onsitepush: {execute: Function}, browserpush: {execute: Function}, sms: {execute: Function}, email: {execute: Function}}}
   */
  _module.actions = {
    onsitepushaction: {
      execute: function (templateUuid, callback) {
        _module.takeAction(templateUuid, 'onsitepushaction', callback);
      }
    },
    browserpushaction: {
      execute: function (templateUuid, callback) {
        _module.takeAction(templateUuid, 'browserpushaction', callback);
      },
      executeVanilla: function (data, callback) {
        _module.takeActionVanilla(data, "browserpushaction", callback);
      }
    },
    smsaction: {
      execute: function (templateUuid, callback) {
        _module.takeAction(templateUuid, 'smsaction', callback);
      }
    },
    emailaction: {
      execute: function (templateUuid, callback) {
        _module.takeAction(templateUuid, 'emailaction', callback);
      }
    },
    httphookaction: {
      execute: function (templateUuid, callback) {
        _module.takeAction(templateUuid, 'httphookaction', callback);
      }
    },
    tcpipaction: {
      execute: function (templateUuid, callback) {
        _module.takeAction(templateUuid, 'tcpipaction', callback);
      }
    },
  }

  /**
   * Checks if user is mapped.
   * @param type USER | PHONE | BROWSER
   */

  _module.getOrCreateCookie = function (successFn, force) {
    if (navigator.userAgent.indexOf('Wigzo/1.0') >= 0) {
      _module.consoleDebug("Skipping wigzo.js for this page due to customized navigator.");
      return false;
    }

    if (!force) {
      force = false;
    }
    _module.consoleDebug("In getOrCreate Cookie. Force: " + force);
    if (force !== true) {
      var userCookie = wigzo.$.cookie(_module["COOKIE_NAME"]);

      if (!!userCookie && userCookie !== "null") {
        _module.consoleDebug("Cookie is present, not reissuing");
        _module.IDENTIFIER = userCookie;
        if (!!successFn) {
          successFn(userCookie, false);
        }
        return userCookie;
      }
    }
    if (!_module.IDENTIFIER) {
      _module.consoleDebug("User Identifier not known, Wigzo continuing as guest..");
    }

    _module.IDENTIFIER = _module.uuid4();
    _module.consoleDebug("Issuing cookie to.." + _module.IDENTIFIER);

    _module.consoleDebug("Fork new user on the server..");
    _module.helpers.forkTemporaryUser(_module.IDENTIFIER, function () {
      _module.consoleDebug("Fork done!");
      wigzo.$.cookie(_module["COOKIE_NAME"], _module.IDENTIFIER, {expires: 80 * 365, path: '/'});
      _module._USER_TYPE = "new";
      if (!!successFn) {
        successFn(_module.IDENTIFIER, true);
      }
    });
    return true;
  }

  /**
   * @deprecated
   * Track and send event to our end-point.
   * @param eventName Name of event that you want to capture.
   * @param eventVal Other information related to event.
   */
  _module.pushEvent = function (eventName, eventVal) {
    console.warn("WARNING !! Don't use this method. Use wigzo.track(eventName, eventVal) instead.");
    _module.track(eventName, eventVal);
  }

  /**
   * Track and send event to our end-point.
   * @param eventName Name of event that you want to capture.
   * @param eventVal Other information related to event.
   */
  _module.track = function (eventName, eventVal) {
    if (_module.isWigzoScriptDisabled()) {
      return;
    }
    var pageuuid = wigzo.$.cookie('PAGE_UUID');
    /*if(!pageuuid) {
     return;
     }*/
    var canonical = wigzo.$(document).find("link[rel=canonical]").attr("href");
    _module.helpers.createEvent(eventName, {pageuuid: pageuuid, eventval: eventVal, source: 'web', u: canonical});
  }

  /**
   * Generic API to map user at any point of time. Client can invoke it.
   * @param userinfo object containing user information, email, phone.
   * @param force An array of string containing keys. Keys can be used to forcefully update mappings.
   * @param callback
   */
  _module.identify = function (userinfo, force, callback, source) {
    if (_module.isWigzoScriptDisabled()) {
      return;
    }
    if(_module.IDENTIFIER == null){
          _module.getOrCreateCookie(function (cookieId) {
                _module.IDENTIFIER = cookieId;
            }
          )
      }

    _module.mapUserInfo(_module.IDENTIFIER, userinfo, force, callback, source);
  }


  /**
   * You can send item/product info in following format -
   * {
            &nbsp; &nbsp; canonicalUrl: 'http://www.yoursite.com/index.php?route=product/product&product_id=40',
            &nbsp; &nbsp; title: 'apple laptop',
            &nbsp; &nbsp; tags: 'system, laptop, computer, apple, mac',
            &nbsp; &nbsp; description: 'Apple Macbook Pro',
            &nbsp; &nbsp; price: '72000',
            &nbsp; &nbsp; author: 'Apple.Inc'
       }
   * Note - 'canonicalUrl' is mandatory.
   * @param itemInfo Contains information of product/item to be indexed.
   */
  _module.index = function (itemInfo) {
    if (_module.isWigzoScriptDisabled()) {
      return;
    }
    if (!!itemInfo && !(itemInfo.hasOwnProperty("canonicalUrl"))) {
      _module.consoleDebug("Please provide canonicalUrl as a part of product info.");
      return;
    }
    var url = _module.APP + '/learn/' + _module['ORGANIZATIONID'] + '/product/push/' + _module.IDENTIFIER + '?e=' + _module['IDENTIFIER'] + '&src=js';
    var ucSessionData = localStorage.getItem('_uc_session_v1');
    itemInfo["sc_mid"] = !!ucSessionData ?  JSON.parse(ucSessionData).u_mid : null;

    _module.post(url, itemInfo, function (res) {
      _module.log("Indexed product : " + res);
    }, function (e) {
      _module.log("Error in indexing product : " + e);
    });

  }
  _module.isMapped = function (type) {
    var isMapped = wigzo.$.cookie("IS_MAPPED") || "";
    return isMapped && isMapped.indexOf(type) >= 0;
  }

  _module.mapUserInfo = function (cookieId, userInfo, force, callback, source) {
    source = source || 'WEB';
    var isMapped = wigzo.$.cookie("IS_MAPPED") || "";
    var user_identifier = _module["USER_IDENTIFIER"];
    var processRequest = false;
    var attemptEmailMapping = false;
    var attemptPhoneMapping = false;

    var userId = "";

    var mapUserInfoUrl = _module.APP + "/user/map/" + cookieId + "?orgId=" + _module["ORGANIZATIONID"] + '&source=' + source;
    +"&userId=" + userId + "&_=" + new Date().getTime();
    var mappedCookieArr = isMapped.split("~");
    var forceQueryParam = _module.hasQueryParam('force');

    if (!userInfo) {
      userInfo = {};
    }

    if (!!isMapped) {
      if (mappedCookieArr.indexOf('USER') < 0 || forceQueryParam || (force && force.indexOf('email') >= 0)) {
        attemptEmailMapping = true;
      }
      if (mappedCookieArr.indexOf('PHONE') < 0 || (force && force.indexOf('phone') >= 0)) {
        attemptPhoneMapping = true;
      }
    } else {
      attemptEmailMapping = true;
      attemptPhoneMapping = true;
    }

    if (attemptEmailMapping) {
      if (!!user_identifier && _module.validateEmail(user_identifier)) {
        userInfo.email = user_identifier;
      } else {
        var wigzo_e = _module.getQueryStringParams('wigzo_e');
        var e = _module.getQueryStringParams('e');
        if (wigzo_e) {
          if (_module.validateEmail(wigzo_e))
            userInfo.email = wigzo_e;
          else if (_module.validateEmail(atob(wigzo_e)))
            userInfo.email = atob(wigzo_e);
        } else if (e && _module.validateEmail(e)) {
          if (_module.validateEmail(e))
            userInfo.email = e;
          else if (_module.validateEmail(btoa(e)))
            userInfo.email = atob(e);
        }
      }
      if (!!userInfo && userInfo.hasOwnProperty('email') && _module.validateEmail(userInfo.email)) {
        // Send request for mapping email.
        processRequest = true;
        //mapUserInfoUrl += "&wigzo_e="+userInfo.email;
        _module.consoleDebug("MAPPED USER/EMAIL : " + userInfo.email);
        if (mappedCookieArr.indexOf("USER") < 0) {
          mappedCookieArr.push("USER");
        }
      } else {
        _module.consoleDebug('EMAIL IS NOT AVAILABLE.');
      }
      if (!!userInfo && userInfo.hasOwnProperty('fullName')) {
        processRequest = true;
        mapUserInfoUrl += "&fullName=" + userInfo.fullName;
        _module.consoleDebug("fullName : " + userInfo.fullName);
      }
    }

    if (attemptPhoneMapping) {
      if (!!user_identifier && _module.validatePhone(user_identifier)) {
        userInfo.phone = user_identifier;
      } else {
        var wigzo_p = _module.getQueryStringParams('wigzo_p');
        var p = _module.getQueryStringParams('p');
        if (wigzo_p && _module.validatePhone(wigzo_p)) {
          userInfo.phone = wigzo_p;
        } else if (p && _module.validatePhone(p)) {
          userInfo.phone = p;
        }
      }

      if (!!userInfo && userInfo.hasOwnProperty('phone') && _module.validatePhone(userInfo.phone)) {
        processRequest = true;
        //mapUserInfoUrl += "&phone="+userInfo.phone;
        _module.consoleDebug("MAPPED USER/PHONE : " + userInfo.phone);
        if (mappedCookieArr.indexOf("PHONE") < 0) {
          mappedCookieArr.push("PHONE");
        }
      } else {
        _module.consoleDebug('PHONE IS NOT AVAILABLE.');
      }
    }

    if (!!userInfo && userInfo.hasOwnProperty('exitIntentUuid')) {
      processRequest = true;
      userInfo['exitIntentUuid'] = userInfo.exitIntentUuid;
      //mapUserInfoUrl += "&exitIntentUuid="+userInfo.exitIntentUuid;
      _module.consoleDebug("Uuid : " + userInfo.exitIntentUuid);
    }
    if (!!userInfo && userInfo.hasOwnProperty('userId')) {
      processRequest = true;
      _module.consoleDebug("UserId : " + userInfo.userId);
    }
    if (!!userInfo && userInfo.hasOwnProperty('phone')) {
      userInfo.phone = userInfo.phone.indexOf(' ') >= 0 ? userInfo.phone.replace(/\s/g, '') : userInfo.phone;
    }
    if (!!userInfo && userInfo.hasOwnProperty('phone')) {
      // added same Condition because do not want to add anycode in working code. 
      !!isUCAvailable && ua.notify("otp_verified", { "mobile": userInfo.phone, "channel_id":"1" });
    } 
    if (!!userInfo && !!userInfo.date_of_birth) {
      userInfo.date_of_birth = userInfo.date_of_birth.indexOf(' ') >= 0 ? userInfo.date_of_birth.replace(/\s/g, '') : userInfo.date_of_birth;
    }
    if (!!userInfo && !!userInfo.gender) {
      userInfo.gender = userInfo.gender.indexOf(' ') >= 0 ? userInfo.gender.replace(/\s/g, '') : userInfo.gender;
    }

    if (processRequest) {
      _module.post(mapUserInfoUrl, userInfo, function (res) {
        wigzo.$.cookie("IS_MAPPED", mappedCookieArr.join("~"), {expires: 80 * 365, path: '/'});
        if (!!userInfo && userInfo.hasOwnProperty('phone')) {
          _module.track("mapphone", userInfo.phone.replace(/\s/g, ''));
          if (!!document.getElementById("freshchatbox")) {
            document.getElementById("freshchatbox").contentWindow.postMessage({t: "mapphone",
            d: userInfo.phone.replace(/\s/g, '')}, "*");
          }
        }
        if (!!userInfo && userInfo.hasOwnProperty('email')) {
          _module.track("mapemail", userInfo.email);
          if (!!document.getElementById("freshchatbox")) {
            document.getElementById("freshchatbox").contentWindow.postMessage({t: "mapemail",
            d: userInfo.email },"*");
            }
        }
        if (!!userInfo && !!userInfo.date_of_birth) {
          _module.track("mapdob", userInfo.date_of_birth);
        }
        if (!!userInfo && !!userInfo.gender) {
          _module.track("mapgender", userInfo.gender);
        }
        _module.consoleDebug(res);
        if (callback)
          callback(res);
      }, function (err) {
        _module.consoleDebug("ERROR : Phone couldn't be mapped.");
        if (callback)
          callback(err);
      });

    } else if (callback) {
      _module.consoleDebug('PHONE CAN NOT BE MAPPED.');
      callback({});
    }

  }

  /**
   * Identifies whether cookie id is mapped against browser id/device token..
   * @param cookieId
   */
  _module.mapBrowser = function (cookieId, browserId, browserPushType, force, extraData, callback) {
    var isMapped = wigzo.$.cookie("IS_MAPPED") || "";
    var isBrowserMapped = false;

    if (!!isMapped) {
      var mappedCookieArr = isMapped.split("~");
      if (mappedCookieArr.indexOf('BROWSER') >= 0) {
        //isBrowserMapped = true;
      }
    }

    if (!isBrowserMapped || force) {
      _module.consoleDebug("MAPPED Browser details : " + " REG_ID/DEVICE_TOKEN->" + browserId + " BROWSER_TYPE->" + browserPushType);
      var orgId = _module["ORGANIZATIONID"];
      // Removing this call in favour of automatic mapping that done in v2 of wigzo.js
      //_module.mapBrowserBeam(orgId, cookieId, browserId, browserPushType, extraData, callback);
      // TODO change url.
      var mapBrowserUrl = _module.APP + "/browser/map/" + cookieId;
      var mapFromUrl = window.location.href;

      _module.post(mapBrowserUrl, {
        _: new Date().getTime(),
        orgId: orgId,
        browserId: browserId,
        browserPushType: browserPushType
      }, function (res) {
        _module.log(res);
        var mappedCookieArr = isMapped.split("~");
        if (mappedCookieArr.indexOf("BROWSER") < 0) {
          mappedCookieArr.push("BROWSER");
          wigzo.track("pushallowed", mapFromUrl);
        }
        wigzo.$.cookie("IS_MAPPED", mappedCookieArr.join("~"), {expires: 80 * 365, path: '/'});
        _module.log("SUCCESS : Browser mapped successfully.");
      }, function (jqXHR, textStatus, errorThrown) {
        _module.log("ERROR : Browser couldn't be mapped.");
      });
    } else {
      _module.log("Browser is already mapped => Browser details : REG_ID/DEVICE_TOKEN->" + browserId + " BROWSER_TYPE->" + browserPushType);
    }
  }

  _module.mapBrowserPushRegistrationId = function (browserId, browserPushType, force, extraData, callback) {
    _module.mapBrowser(_module.IDENTIFIER, browserId, browserPushType, force, extraData, callback);
    return true;
  }

  _module.mapBrowserBeam = function (orgId, cookieId, browserId, browserPushType, extraData, callback) {
    var url = _module.SERVICES + '/push/map/browser';
    var data = {
      orgId: orgId,
      cookieId: cookieId,
      browserId: browserId,
      browserPushType: browserPushType,
      extraData: extraData
    };
    _module.post(url, data, function (res) {
      _module.log("SUCCESS : Browser mapped successfully on BEAM.");
      if (!!callback) {
        callback();
      }
    }, function (e) {
      _module.log("Error in mapping browser token on BEAM: " + e);
    });

  }


  /**
   * To find out whether it's a new user or returning user.
   * @param type <code>'new'</code> or <code>'returning'</code>
   */
  _module.isNewOrReturningUser = function (type, cookieId) {
    var orgId = _module["ORGANIZATIONID"];

    var url = _module.APP + '/user/neworreturning/' + cookieId + '?orgId=' + orgId + '&type=' + type + '&_=' + new Date().getTime();
    _module.jsonp(url, function (res) {
      _module.log(res);
    });
  }

  /**
   * Creates an entry for current page.
   * @param cookieId
   */
  _module.loadPixel = function (cookieId, userType) {
    var orgId = _module["ORGANIZATIONID"];
    var userId = "";
    var url = _module.APP + '/report/track/web?source=web&orgId=' + orgId + '&cookieId=' + cookieId
      + '&userId=' + userId + '&_=' + new Date().getTime();

    _module.jsonp(url, function (res) {
      _module.country = res.country;
      _module.state_name = res.stateName;
      _module.state_code = res.stateCode;
      _module.city = res.city;
      _module.browser = res.browser;
      _module.os = res.os;
      _module.language = wigzo.checkLang();

      _module.exitIntent.initExitIntentMouseHandler(cookieId, userType);

      // Re-calculate 'top' & 'left' each time window is resized.
      wigzo.$(window).on('resize', function () {
        _module.consoleDebug("Window resized");
        _module.exitIntent.calculateHeightAndWidth(window, '#exit-intent-tempalte');
      });
      wigzo.$.cookie('PAGE_UUID', res.uuid, {path: '/'});

      if (wigzo.hasQueryParam('utm_wsource') && wigzo.getQueryStringParams('utm_wsource') === "fbm" && wigzo.hasQueryParam('utm_wref')) {
        var fbmCampaignId = btoa(wigzo.getQueryStringParams('utm_wref'));
        _module.setKey('WIGZO_SALES_FBM', fbmCampaignId, 30 * 24 * 3600); //expiry set to 30days
        _module.setKey('WIGZO_SALES_SOURCE', "WIGZOFBM", 30 * 24 * 3600); //expiry set to 30days
      }

      if (wigzo.hasQueryParam('utm_wsource') && wigzo.getQueryStringParams('utm_wsource') === "browserpush" && wigzo.hasQueryParam('utm_wref')) {
        var pushCampaignId = btoa(wigzo.getQueryStringParams('utm_wref'));
        _module.setKey('WIGZO_SALES_BROWSERPUSH', pushCampaignId, 30 * 24 * 3600); //expiry set to 30days
        _module.setKey('WIGZO_PUSH_REFERRER', pushCampaignId, 30 * 24 * 3600); //expiry set to 30days
        _module.setKey('WIGZO_SALES_SOURCE', "BROWSERPUSH", 30 * 24 * 3600); //expiry set to 30days
      }

      if (wigzo.hasQueryParam('utm_wsource') && wigzo.getQueryStringParams('utm_wsource') === "emailnotification" && wigzo.hasQueryParam('utm_wref')) {
        var emailCampaignId = btoa(wigzo.getQueryStringParams('utm_wref'));
        _module.setKey('WIGZO_SALES_EMAIL', emailCampaignId, 30 * 24 * 3600); //expiry set to 30days
        _module.setKey('WIGZO_SALES_SOURCE', "EMAIL", 30 * 24 * 3600); //expiry set to 30days
      }

      if (wigzo.hasQueryParam('utm_wsource') && wigzo.getQueryStringParams('utm_wsource') === "onsitepush" && wigzo.hasQueryParam('utm_wref')) {
        var onsiteCampaignId = btoa(wigzo.getQueryStringParams('utm_wref'));
        _module.setKey('WIGZO_SALES_ONSITEPUSH', onsiteCampaignId, 30 * 24 * 3600); //expiry set to 30days
        _module.setKey('WIGZO_SALES_SOURCE', "ONSITEPUSH", 30 * 24 * 3600); //expiry set to 30days
      }


      if (!!_module.FEATURES.EventsTracking) {
        _module.jsonp(_module.APP + "/user/actions/selectors?cookieId=" + cookieId + "&orgId=" + _module["ORGANIZATIONID"] + '&_=' + new Date().getTime(), function (data) {
          var eventPrefsJson = data.eventPreferences;
          var eventPrefs = JSON.parse(eventPrefsJson);

          eventPrefs.forEach(function (pref, index) {
            if (pref.selectors) {
              if (pref.triggerType === 'click') {
                wigzo.$(pref.selectors).on('click', function () {
                  _module.helpers.createEvent(pref.eventName, {
                    pageuuid: res.uuid,
                    source: 'web',
                    lang: _module.language
                  });
                });
              } else if (pref.triggerType === 'enter') {
                wigzo.$(pref.selectors).keypress(function () {
                  var keycode = (event.keyCode ? event.keyCode : event.which);
                  if (keycode == '13') {  // ENTER pressed.
                    _module.helpers.createEvent(pref.eventName, {
                      pageuuid: res.uuid,
                      source: 'web',
                      eventval: wigzo.$(pref.selectors).val(),
                      lang: _module.language
                    });
                  }
                });
              } else if (pref.triggerType === 'hover') {
                wigzo.$(pref.selectors).on('hover', function () {
                  _module.helpers.createEvent(pref.eventName, {
                    pageuuid: res.uuid,
                    source: 'web',
                    lang: _module.language
                  });
                });
              }
            }
          });

          //_module.integrationStatus();
          //_module.onPageUnload(res.uuid);
          //_module.calculateEngageIndex(res.uuid, cookieId);
        }, function () {
          _module.consoleDebug("Cannot get selectors.")
        });
      }

    }, function () {
      _module.log("Error occurred.. Recreating cookie.");
      /* Why? */
      //_module.getOrCreateCookie(null, true);
    }, "json");

    if (!!_module.WIGZO_ENTITY_DATA.ev) {
      var appendVariable = '<img height="1" width="1" alt="" src="https://www.facebook.com/tr?id=' + _module.WIGZO_ENTITY_DATA.ev + '&ev=PageView&noscript=1" />';
      _module.$("body").append(appendVariable)
    }
  }


  _module.evaluateLocationAndSystemAgainstCriteria = function (exitIntentCampaign) {
    var locationAndSystemTargeting = exitIntentCampaign.actionProps.locationAndSystemTargeting;
    if (!!locationAndSystemTargeting && locationAndSystemTargeting.status) {
      return _module.evaluateAgainstCriteria(locationAndSystemTargeting.criteria, locationAndSystemTargeting.globalOperator);
    }

    // If location and system targeting is not enabled for this campaign, just return true in order to skip it.
    return true;
  }
  _module.initializeZumigoSession = function() {
    var mobileNumber = _module.$("#input-payment-telephone").val();
    if(mobileNumber.length == 12) {
      _module.get(_module.APP + '/wz/createsessionapi/' + _module.ORGANIZATIONID, function responseFunc(res) {
        _module.authenticateMdn(res.sessionId, mobileNumber);

      });
    }
  }

  _module.verifyOtp = function() {
    var mobileNumber = _module.$("#input-payment-telephone").val();
    var otp = _module.$("#input-otp").val();
    _module.get(_module.APP + '/wz/verifyotp/' + mobileNumber + '/' + otp + '/' + _module.ORGANIZATIONID, function responseFunc(res) {
      if(res.status === 'SUCCESS'){
        document.getElementById('alertSuccess').style.display = 'block';
        document.getElementById('alertDanger').style.display = 'none';
      } else {
        document.getElementById('alertInvalidOtp').style.display = 'block';
        document.getElementById('alertDanger').style.display = 'none';
      }
      return res;
    });
  }

  _module.authenticateMdn = function (sessionId, mobileNumber, requestHeaders) {
    console.log("Image load called....");
    var path = _module.APP + '/wz/identifydevice/' + _module.ORGANIZATIONID + "?sessionId=" + sessionId + "&mdn=" + mobileNumber + "&correlationId=09C5";
    var verify = true;

    // $("#tex").append("<br>....... identifyDevice : " + path);
    var mdnExtract = new Image();
    mdnExtract.onerror = function(data, textStatus, jqXHR){
      console.log("extractMdn complete invoking confirmation")
      console.log("jqXHR : " + jqXHR);
      // Invoke your completion handler
      console.log("data : " + data);
      var dataStr = "action=getIdentity&sessionId=" + sessionId;
      if (verify) {
        dataStr += "&verify=" + verify + "&mdn=" + mobileNumber;
      }
      console.log("dataStr : " + dataStr);

      var requestUrl = _module.APP + '/wz/lineidentity/' + mobileNumber + '/' + sessionId + '/' + _module.ORGANIZATIONID + "?verify=" + verify + "&status=success";
      _module.get(requestUrl, function (res) {
        if(res.status === 'SUCCESS'){
          document.getElementById('alertSuccess').style.display = 'block';
        } else {
          document.getElementById('input-payment-telephone').style.display = 'none';
          document.getElementById('input-otp').style.display = 'block';
          document.getElementById('alertDanger').style.display = 'block';
          document.getElementById('verifyOtpBtn').style.display = 'block';
          document.getElementById('button-guest').style.display = 'none';
        }
        console.log("identity : " + JSON.stringify(data));
      });

    }
    mdnExtract.src = path;
  }
  return _module;

}(window.wigzo || {}));


