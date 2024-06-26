# JSture

Javascript library to easily handle mobile gestures

## Existing

- **onTouch** Triggered when the screen is touched 
- **onLongTouch** Triggered when the screen is touched at least {longTouchTimer} ms (vibrate option)
- **onDoubleTap** Triggered when the screen is touched two times in a row spaced by at most {doubleTapTimer} ms
- **onDragStart** Triggered when the longTouch is triggered to enter drag mode
- **onDragEnd** Triggered when the drag mode is enabled and the digit is released
- **onDrag** Triggered when the drag mode is enabled and the digit is moving
- **onTap** Triggered when the screen is touched and the digit is released

## Roadmap

- Create a documentation
- Add more gesture handlers
  - onSwipeUp + inertia + fingerCount as option
  - onSwipeDown + inertia + fingerCount as option
  - onSwipeLeft + inertia + fingerCount as option
  - onSwipeRight + inertia + fingerCount as option
  - onPinch (zoom) + inertia
  - onStretch (unzoom) + inertia
- Add the mouse supports on same event than touch ones (could be activated or not)
- Add the possibility to trigger the dragEvent with an option which indicate if the drag has to wait the dragStart event or not (so immediatly drag or hold and drag)
- Add the current states of touch (reactive varaibles) : isTouching, isDragging, isHolding, isSwiping, swipeDirection...
  