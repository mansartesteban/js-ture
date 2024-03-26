var longTouchTimer = 800;
var doubleTapTimer = 300;

/**
 * Helper composable to attach sugar mobile events on dom elements
 *  
 * @onTouch Triggered when the screen is touched 
 * @onLongTouch Triggered when the screen is touched at least {longTouchTimer} ms
 * @onDoubleTap Triggered when the screen is touched two times in a row spaced by at most {doubleTapTimer} ms
 * @onDragStart Triggered when the longTouch is triggered to enter drag mode
 * @onDragEnd Triggered when the drag mode is enabled and the digit is released
 * @onDrag Triggered when the drag mode is enabled and thje digit is moving
 * @onTap Triggered when the screen is touched and the digit is released
 */

var index = (function (element) {
  var callbacks = {
    onTap: [],
    onTouch: [],
    onDoubleTap: [],
    onDrag: [],
    onDragStart: [],
    onDragEnd: [],
    onLongTouch: []
  };
  var longTouchTrigger = null;
  var touchReleaseTrigger = null;
  var isDragging = false;
  var isTouching = false;
  if (!(element instanceof HTMLElement)) {
    throw "Unable to apply useTouch() composable on a non-dom element";
  }

  // When screen is touched
  element.ontouchstart = function (e) {
    // Always trigger touch event
    trigger(callbacks.onTouch, e);
    isTouching = true;

    // If the screen has already been touched, triggers the doubleTap event
    if (touchReleaseTrigger) {
      trigger(callbacks.onDoubleTap, e);
      touchReleaseTrigger = null;
    }

    // Prepares a function to be called when {longTouchTimer}ms has passed to trigger longTouch and dragStart events 
    longTouchTrigger = setTimeout(function () {
      trigger(callbacks.onLongTouch, e);
      trigger(callbacks.onDragStart, e);

      // Enabling drag mode
      isDragging = true;
    }, longTouchTimer);
  };

  // When user move his digit
  element.ontouchmove = function (e) {
    // If drag mode is enable trigger the drag event
    if (isDragging) {
      trigger(callbacks.onDrag, e);
    }

    // Resets the touching state and clear the longTouch trigger so the touch and longTouch events are not triggered
    isTouching = false;
    clearTimeout(longTouchTrigger);
  };

  // When the user release his digit
  element.ontouchend = function (e) {
    // If drag mode is enable, triggers the dragEnd event
    if (isDragging) {
      trigger(callbacks.onDragEnd, e);
    }

    // If the drag mode has not been triggered and the digit is still touching, triggers the tap event
    if (!isDragging && isTouching) {
      trigger(callbacks.onTap, e);

      // Prepares a trigger which clears himself within a delay of {doubleTapTimer}ms, if a second touch is made within this delay, triggers the doubleTap event
      touchReleaseTrigger = setTimeout(function () {
        return touchReleaseTrigger = null;
      }, doubleTapTimer);
    }

    // Resets the helper variables on release
    isTouching = false;
    isDragging = false;
    clearTimeout(longTouchTrigger);
  };

  /**
   * Trigger an array of callbacks
   * @param {Array} callbacks Callbacks to be called 
   * @param {*} event The DOM event which triggers the callback
   * @param  {...any} params Additionnal parameters
   */
  var trigger = function trigger() {
    var callbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      params[_key - 2] = arguments[_key];
    }
    callbacks.forEach(function (_ref) {
      var callback = _ref.callback,
        options = _ref.options;
      callback.apply(void 0, [event].concat(params));
      if (options !== null && options !== void 0 && options.vibrate) {
        window.navigator.vibrate([30]);
      }
    });
  };

  /**
   * Register a callback to call when the touch event is trigger
   */
  var onTouch = function onTouch(callback, options) {
    if (typeof callback === "function") {
      callbacks.onTouch.push({
        callback: callback,
        options: options
      });
    }
  };

  /**
   * Register a callback to call when the dragStart event is trigger
   */
  var onDragStart = function onDragStart(callback, options) {
    if (typeof callback === "function") {
      callbacks.onDragStart.push({
        callback: callback,
        options: options
      });
    }
  };

  /**
   * Register a callback to call when the drag event is trigger
   */
  var onDrag = function onDrag(callback, options) {
    if (typeof callback === "function") {
      callbacks.onDrag.push({
        callback: callback,
        options: options
      });
    }
  };

  /**
   * Register a callback to call when the dragEnd event is trigger
   */
  var onDragEnd = function onDragEnd(callback, options) {
    if (typeof callback === "function") {
      callbacks.onDragEnd.push({
        callback: callback,
        options: options
      });
    }
  };

  /**
   * Register a callback to call when the doubleTap event is trigger
   */
  var onDoubleTap = function onDoubleTap(callback, options) {
    if (typeof callback === "function") {
      callbacks.onDoubleTap.push({
        callback: callback,
        options: options
      });
    }
  };

  /**
   * Register a callback to call when the longTouch event is trigger
   */
  var onLongTouch = function onLongTouch(callback, options) {
    if (typeof callback === "function") {
      callbacks.onLongTouch.push({
        callback: callback,
        options: options
      });
    }
  };

  /**
   * Register a callback to call when the tap event is trigger
   */
  var onTap = function onTap(callback, options) {
    if (typeof callback === "function") {
      callbacks.onTap.push({
        callback: callback,
        options: options
      });
    }
  };
  return {
    isDragging: isDragging,
    isTouching: isTouching,
    onTouch: onTouch,
    onLongTouch: onLongTouch,
    onDoubleTap: onDoubleTap,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    onDrag: onDrag,
    onTap: onTap
  };
});

// - TODO onSwipeUp + speed/acceleration + fingerCount
// - TODO onSwipeDown + speed/acceleration + fingerCount
// - TODO onSwipeLeft + speed/acceleration + fingerCount
// - TODO onSwipeRight + speed/acceleration + fingerCount
// - TODO onPinch (zoom) + speed/acceleration
// - TODO onStretch (unzoom) + speed/acceleration

export { index as default };
