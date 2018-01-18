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

        this.subscriptions = {};
        this.count = 0;
    }

    createClass(EventEmitterDOM, [{
        key: "emit",
        value: function emit() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            for (var subscription in this.subscriptions) {
                if (this.subscriptions.hasOwnProperty(subscription)) {
                    this.subscriptions[subscription].apply(null, args);
                }
            }
        }
    }, {
        key: "subscribe",
        value: function subscribe(callback) {
            var index = this.count++;
            var subscriptions = this.subscriptions;
            var subscription = subscriptions[index] = callback;

            subscription.remove = function () {
                delete subscriptions[index];
            };

            return subscription;
        }
    }]);
    return EventEmitterDOM;
}();
//# sourceMappingURL=index.js.map
