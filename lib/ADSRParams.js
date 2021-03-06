"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _EnvelopeBuilder = require("./EnvelopeBuilder");

var _EnvelopeBuilder2 = _interopRequireDefault(_EnvelopeBuilder);

var _EnvelopeValue = require("./EnvelopeValue");

var _EnvelopeValue2 = _interopRequireDefault(_EnvelopeValue);

var _defaultValues = require("./defaultValues");

var _defaultValues2 = _interopRequireDefault(_defaultValues);

var _utilsDefaults = require("./utils/defaults");

var _utilsDefaults2 = _interopRequireDefault(_utilsDefaults);

var _utilsConstrain = require("./utils/constrain");

var _utilsConstrain2 = _interopRequireDefault(_utilsConstrain);

var _utilsIsFiniteNumber = require("./utils/isFiniteNumber");

var _utilsIsFiniteNumber2 = _interopRequireDefault(_utilsIsFiniteNumber);

var _constants = require("./constants");

var EPSILON = 2.220446049250313e-16;

var ADSRParams = (function () {
  function ADSRParams() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ADSRParams);

    this.attackTime = time((0, _utilsDefaults2["default"])(opts.attackTime, _defaultValues2["default"].attackTime));
    this.decayTime = time((0, _utilsDefaults2["default"])(opts.decayTime, _defaultValues2["default"].decayTime));
    this.sustainLevel = level((0, _utilsDefaults2["default"])(opts.sustainLevel, _defaultValues2["default"].sustainLevel));
    this.releaseTime = time((0, _utilsDefaults2["default"])(opts.releaseTime, _defaultValues2["default"].releaseTime));
    this.peakLevel = time((0, _utilsDefaults2["default"])(opts.peakLevel, _defaultValues2["default"].peakLevel));
    this.epsilon = epsilon((0, _utilsDefaults2["default"])(opts.epsilon, _defaultValues2["default"].epsilon));
    this.attackCurve = curve((0, _utilsDefaults2["default"])(opts.attackCurve, _defaultValues2["default"].attackCurve));
    this.decayCurve = curve((0, _utilsDefaults2["default"])(opts.decayCurve, _defaultValues2["default"].decayCurve));
    this.releaseCurve = curve((0, _utilsDefaults2["default"])(opts.releaseCurve, _defaultValues2["default"].releaseCurve));
    this.gateTime = _defaultValues2["default"].gateTime;

    if ((0, _utilsIsFiniteNumber2["default"])(opts.sustainTime)) {
      this.setSustainTime(opts.sustainTime);
    }
    if ((0, _utilsIsFiniteNumber2["default"])(opts.gateTime)) {
      this.setGateTime(opts.gateTime);
    }
    if ((0, _utilsIsFiniteNumber2["default"])(opts.duration)) {
      this.setDuration(opts.duration);
    }

    this.update();
  }

  _createClass(ADSRParams, [{
    key: "valueAt",
    value: function valueAt(time) {
      return _EnvelopeValue2["default"].at(this.envelope, time);
    }
  }, {
    key: "methods",
    value: function methods(playbackTime) {
      return this.envelope.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3);

        var type = _ref2[0];
        var value = _ref2[1];
        var time = _ref2[2];

        return [method(type), value, playbackTime + time];
      });
    }
  }, {
    key: "setDuration",
    value: function setDuration(value) {
      var duration = time(value);

      this.setGateTime(duration - this.releaseTime);
    }
  }, {
    key: "setAttackTime",
    value: function setAttackTime(value) {
      this.attackTime = time(value);
      this.update();
    }
  }, {
    key: "setDecayTime",
    value: function setDecayTime(value) {
      this.decayTime = time(value);
      this.update();
    }
  }, {
    key: "setSustainTime",
    value: function setSustainTime(value) {
      var sustainTime = time(value);

      this.setGateTime(this.attackTime + this.decayTime + sustainTime);
    }
  }, {
    key: "setSustainLevel",
    value: function setSustainLevel(value) {
      this.sustainLevel = level(value);
      this.update();
    }
  }, {
    key: "setReleaseTime",
    value: function setReleaseTime(value) {
      this.releaseTime = time(value);
      this.update();
    }
  }, {
    key: "setGateTime",
    value: function setGateTime(value) {
      this.gateTime = time(value);
      this.update();
    }
  }, {
    key: "setPeakLevel",
    value: function setPeakLevel(value) {
      this.peakLevel = time(value);
      this.update();
    }
  }, {
    key: "setEpsilon",
    value: function setEpsilon(value) {
      this.epsilon = epsilon(value);
      this.update();
    }
  }, {
    key: "setAttackCurve",
    value: function setAttackCurve(value) {
      this.attackCurve = curve(value);
      this.update();
    }
  }, {
    key: "setDecayCurve",
    value: function setDecayCurve(value) {
      this.decayCurve = curve(value);
      this.update();
    }
  }, {
    key: "setReleaseCurve",
    value: function setReleaseCurve(value) {
      this.releaseCurve = curve(value);
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      this.sustainTime = Math.max(0, this.gateTime - this.attackTime - this.decayTime);
      this.duration = this.gateTime + this.releaseTime;
      this.envelope = _EnvelopeBuilder2["default"].build(this);
    }
  }]);

  return ADSRParams;
})();

exports["default"] = ADSRParams;

function time(value) {
  return Math.max(0, value) || 0;
}

function level(value) {
  return value || 0;
}

function epsilon(value) {
  return (0, _utilsConstrain2["default"])(+value, EPSILON, 1e-2) || 1e-3;
}

function curve(type) {
  return type === "exp" ? "exp" : "lin";
}

function method(type) {
  switch (type) {
    case _constants.SET:
      return "setValueAtTime";
    case _constants.LIN:
      return "linearRampToValueAtTime";
    case _constants.EXP:
      return "exponentialRampToValueAtTime";
    default:
    // do nothing
  }
}
module.exports = exports["default"];