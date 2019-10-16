(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
	(global = global || self, factory(global['ohu-mobile'] = {}, global.Vue));
}(this, function (exports, vue) { 'use strict';

	vue = vue && vue.hasOwnProperty('default') ? vue['default'] : vue;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var api = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var vue_1 = __importDefault(vue);
	var Component = /** @class */ (function (_super) {
	    __extends(Component, _super);
	    function Component() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return Component;
	}(vue_1.default));
	exports.Component = Component;
	/**
	 * Create component from component options (Compatible with Vue.extend)
	 */
	function createComponent(opts) {
	    return vue_1.default.extend(opts);
	}
	exports.createComponent = createComponent;
	var factoryImpl = {
	    convert: function (c) { return c; },
	    extendFrom: function (c) { return c; }
	};
	/**
	 * Specify Props and Event types of component
	 *
	 * Usage:
	 *  // Get TSX-supported component with props(`name`, `value`) and event(`onInput`)
	 *  const NewComponent = tsx.ofType<{ name: string, value: string }, { onInput: string }>.convert(Component);
	 */
	function ofType() {
	    return factoryImpl;
	}
	exports.ofType = ofType;
	function withNativeOn(componentType) {
	    return componentType;
	}
	exports.withNativeOn = withNativeOn;
	function withHtmlAttrs(componentType) {
	    return componentType;
	}
	exports.withHtmlAttrs = withHtmlAttrs;
	function withUnknownProps(componentType) {
	    return componentType;
	}
	exports.withUnknownProps = withUnknownProps;
	function createComponentFactory(base, mixins) {
	    return {
	        create: function (options) {
	            var mergedMixins = options.mixins
	                ? options.mixins.concat(mixins) : mixins;
	            return base.extend(__assign({}, options, { mixins: mergedMixins }));
	        },
	        mixin: function (mixinObject) {
	            return createComponentFactory(base, mixins.concat([mixinObject]));
	        }
	    };
	}
	function createExtendableComponentFactory() {
	    return {
	        create: function (options) {
	            return vue_1.default.extend(options);
	        },
	        extendFrom: function (base) {
	            return createComponentFactory(base, []);
	        },
	        mixin: function (mixinObject) {
	            return createComponentFactory(vue_1.default, [mixinObject]);
	        }
	    };
	}
	exports.componentFactory = createExtendableComponentFactory();
	function componentFactoryOf() {
	    return exports.componentFactory;
	}
	exports.componentFactoryOf = componentFactoryOf;
	/**
	 * Shorthand of `componentFactory.create`
	 */
	exports.component = exports.componentFactory.create;
	exports.extendFrom = exports.componentFactory.extendFrom;

	});

	unwrapExports(api);
	var api_1 = api.Component;
	var api_2 = api.createComponent;
	var api_3 = api.ofType;
	var api_4 = api.withNativeOn;
	var api_5 = api.withHtmlAttrs;
	var api_6 = api.withUnknownProps;
	var api_7 = api.componentFactory;
	var api_8 = api.componentFactoryOf;
	var api_9 = api.component;
	var api_10 = api.extendFrom;

	var modifiers = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	function handleEvent(event, filters, handler) {
	    for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
	        var filter = filters_1[_i];
	        if (!filter(event)) {
	            return;
	        }
	    }
	    if (handler) {
	        handler(event);
	    }
	}
	var keyCodes = {
	    esc: 27,
	    tab: 9,
	    enter: 13,
	    space: 32,
	    up: 38,
	    down: 40,
	    del: [8, 46],
	    left: 37,
	    right: 39
	};
	function createKeyFilter(keys) {
	    var codes = [];
	    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
	        var key = keys_1[_i];
	        if (typeof key === "number") {
	            codes.push(key);
	        }
	        else {
	            var code = keyCodes[key];
	            if (typeof code === "number") {
	                codes.push(code);
	            }
	            else {
	                codes.push.apply(codes, code);
	            }
	        }
	    }
	    switch (codes.length) {
	        case 0:
	            return function (_) { return false; };
	        case 1:
	            var code_1 = codes[0];
	            return function (e) { return e.keyCode === code_1; };
	        default:
	            return function (e) { return codes.indexOf(e.keyCode) >= 0; };
	    }
	}
	function defineChildModifier(target, currentFilters, name, filter, children) {
	    Object.defineProperty(target, name, {
	        get: function () {
	            // call this getter at most once.
	            // reuse created instance after next time.
	            var ret = createModifier(currentFilters.concat([filter]), children);
	            Object.defineProperty(target, name, {
	                value: ret,
	                enumerable: true
	            });
	            return ret;
	        },
	        enumerable: true,
	        configurable: true
	    });
	}
	function defineKeyCodeModifiers(target, filters, children) {
	    var _loop_1 = function (name_1) {
	        var keyName = name_1;
	        if (keyName === "left" || keyName === "right") {
	            return "continue";
	        }
	        var code = keyCodes[keyName];
	        if (typeof code === "number") {
	            defineChildModifier(target, filters, keyName, function (e) { return e.keyCode === code; }, children);
	        }
	        else {
	            var c1_1 = code[0], c2_1 = code[1];
	            defineChildModifier(target, filters, keyName, function (e) { return e.keyCode === c1_1 || e.keyCode === c2_1; }, children);
	        }
	    };
	    for (var name_1 in keyCodes) {
	        _loop_1(name_1);
	    }
	}
	function defineKeys(target, filters, children) {
	    Object.defineProperty(target, "keys", {
	        get: function () {
	            var _this = this;
	            var keysFunction = function () {
	                var args = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    args[_i] = arguments[_i];
	                }
	                var propName = "keys:" + args.toString();
	                var modifier = _this[propName];
	                if (modifier !== undefined) {
	                    return modifier;
	                }
	                var filter = createKeyFilter(args);
	                defineChildModifier(_this, filters, propName, filter, children);
	                return _this[propName];
	            };
	            Object.defineProperty(this, "keys", {
	                value: keysFunction,
	                enumerable: true
	            });
	            return keysFunction;
	        },
	        enumerable: true,
	        configurable: true
	    });
	}
	function defineExact(target, filters, children) {
	    Object.defineProperty(target, "exact", {
	        get: function () {
	            var _this = this;
	            var exactFunction = function () {
	                var args = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    args[_i] = arguments[_i];
	                }
	                var propName = "exact:" + args.toString();
	                var modifier = _this[propName];
	                if (modifier !== undefined) {
	                    return modifier;
	                }
	                var expected = {
	                    ctrl: false,
	                    shift: false,
	                    alt: false,
	                    meta: false
	                };
	                args.forEach(function (arg) { return (expected[arg] = true); });
	                var filter = function (e) {
	                    return !!e.ctrlKey === expected.ctrl &&
	                        !!e.shiftKey === expected.shift &&
	                        !!e.altKey === expected.alt &&
	                        !!e.metaKey === expected.meta;
	                };
	                defineChildModifier(_this, filters, propName, filter, children);
	                return _this[propName];
	            };
	            Object.defineProperty(this, "exact", {
	                value: exactFunction,
	                enumerable: true
	            });
	            return exactFunction;
	        },
	        enumerable: true,
	        configurable: true
	    });
	}
	function createModifier(filters, children) {
	    function m(arg) {
	        if (arg instanceof Function) {
	            // EventHandler => EventHandler
	            return function (event) { return handleEvent(event, filters, arg); };
	        }
	        else {
	            // Event => void
	            handleEvent(arg, filters);
	            return;
	        }
	    }
	    if (children.keyboard || children.mouse) {
	        var nextChildren = __assign({}, children, { keyboard: false, mouse: false });
	        if (children.keyboard) {
	            defineKeyCodeModifiers(m, filters, nextChildren);
	            defineKeys(m, filters, nextChildren);
	        }
	        if (children.mouse) {
	            defineChildModifier(m, filters, "middle", function (e) { return e.button === 1; }, nextChildren);
	        }
	        defineChildModifier(m, filters, "left", function (e) { return e.keyCode === 37 || e.button === 0; }, nextChildren);
	        defineChildModifier(m, filters, "right", function (e) { return e.keyCode === 39 || e.button === 2; }, nextChildren);
	    }
	    if (children.exact) {
	        var nextChildren = __assign({}, children, { exact: false, modkey: false });
	        defineExact(m, filters, nextChildren);
	    }
	    if (children.modkey) {
	        var nextChildren = __assign({}, children, { exact: false });
	        defineChildModifier(m, filters, "ctrl", function (e) { return e.ctrlKey; }, nextChildren);
	        defineChildModifier(m, filters, "shift", function (e) { return e.shiftKey; }, nextChildren);
	        defineChildModifier(m, filters, "alt", function (e) { return e.altKey; }, nextChildren);
	        defineChildModifier(m, filters, "meta", function (e) { return e.metaKey; }, nextChildren);
	        defineChildModifier(m, filters, "noctrl", function (e) { return !e.ctrlKey; }, nextChildren);
	        defineChildModifier(m, filters, "noshift", function (e) { return !e.shiftKey; }, nextChildren);
	        defineChildModifier(m, filters, "noalt", function (e) { return !e.altKey; }, nextChildren);
	        defineChildModifier(m, filters, "nometa", function (e) { return !e.metaKey; }, nextChildren);
	    }
	    defineChildModifier(m, filters, "stop", function (e) {
	        e.stopPropagation();
	        return true;
	    }, children);
	    defineChildModifier(m, filters, "prevent", function (e) {
	        e.preventDefault();
	        return true;
	    }, children);
	    defineChildModifier(m, filters, "self", function (e) { return e.target === e.currentTarget; }, children);
	    return m;
	}
	exports.modifiers = createModifier([], {
	    keyboard: true,
	    mouse: true,
	    modkey: true,
	    exact: true
	});

	});

	unwrapExports(modifiers);
	var modifiers_1 = modifiers.modifiers;

	var lib = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(api);

	exports.modifiers = modifiers.modifiers;

	});

	unwrapExports(lib);
	var lib_1 = lib.componentFactory;
	var lib_2 = lib.modifiers;

	var lib$1 = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var BuilderClass = /** @class */ (function () {
	    function BuilderClass(opts) {
	        this.opts = opts;
	    }
	    BuilderClass.prototype.default = function (value) {
	        return __assign({}, this.opts, { required: false, default: value });
	    };
	    Object.defineProperty(BuilderClass.prototype, "required", {
	        get: function () {
	            return __assign({}, this.opts, { required: true });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BuilderClass.prototype, "optional", {
	        get: function () {
	            return __assign({}, this.opts, { required: false });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BuilderClass.prototype.validator = function (validator) {
	        return new BuilderClass(__assign({}, this.opts, { validator: validator }));
	    };
	    Object.defineProperty(BuilderClass.prototype, "or", {
	        get: function () {
	            var type = this.opts.type || [];
	            var types = type instanceof Array ? type : [type];
	            return createBuilderCollection(types);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return BuilderClass;
	}());
	function createBuilder(baseTypes) {
	    var types = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        types[_i - 1] = arguments[_i];
	    }
	    var newTypes = baseTypes.concat(types);
	    return new BuilderClass({
	        type: newTypes.length === 1 ? newTypes[0] : newTypes
	    });
	}
	function createBuilderCollection(baseTypes) {
	    var ret = (function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        return createBuilder.apply(void 0, [baseTypes].concat(args));
	    });
	    var namedBuilders = {
	        ofFunction: function () {
	            return createBuilder(baseTypes, Function);
	        },
	        ofArray: function () {
	            return createBuilder(baseTypes, Array);
	        },
	        ofRoArray: function () {
	            return createBuilder(baseTypes, Array);
	        },
	        ofObject: function () {
	            return createBuilder(baseTypes, Object);
	        },
	        ofStringLiterals: function () {
	            var values = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                values[_i] = arguments[_i];
	            }
	            return new BuilderClass({
	                type: String,
	                validator: function (v) { return values.indexOf(v) >= 0; }
	            });
	        },
	        ofAny: function () {
	            return new BuilderClass({});
	        },
	        ofType: function () {
	            return new BuilderClass({});
	        }
	    };
	    return Object.assign(ret, namedBuilders);
	}
	var rootBuilders = createBuilderCollection([]);
	exports.default = rootBuilders;

	});

	var props = unwrapExports(lib$1);

	var Icon = lib_1.create({
	    name: 'icon',
	    props: {
	        type: props(String).required,
	        color: String,
	        theme: props.ofStringLiterals('outlined').default('outlined'),
	        spin: props(Boolean).default(false),
	        rotate: props(Number).default(0),
	    },
	    render: function (h) {
	        return (h("svg", { class: "ohu-icon" },
	            h("use", { xlinkHref: "#" + this.type })));
	    },
	});

	var components = [
	    Icon,
	];
	// global use ui library
	var install = function (Vue) {
	    components.map(function (component) {
	        Vue.component(component.name, component);
	    });
	};
	var index = {
	    install: install,
	};

	exports.Icon = Icon;
	exports.default = index;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
