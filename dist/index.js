'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var EventEmitterDOM = function () {
    function EventEmitterDOM() {
        classCallCheck(this, EventEmitterDOM);

        this.subscriptions = [];
    }

    createClass(EventEmitterDOM, [{
        key: "emit",
        value: function emit() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            this.subscriptions.forEach(function (subscription) {
                subscription.apply(undefined, args);
            });
        }
    }, {
        key: "subscribe",
        value: function subscribe(callback) {
            var _this = this;

            var subscription = callback;

            subscription.remove = function () {
                _this.remove(_this.subscriptions.indexOf(subscription));
            };

            this.subscriptions.push(subscription);

            return subscription;
        }
    }, {
        key: "remove",
        value: function remove(index) {
            this.subscriptions.splice(index, 1);
        }
    }]);
    return EventEmitterDOM;
}();
//# sourceMappingURL=index.js.map
