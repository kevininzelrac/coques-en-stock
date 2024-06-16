export default function isTouchScreenDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

// var touchEvent = isMobile ? e.changedTouches[0] : e;
// console.log("Mobile: " + isMobile);
// console.log("Touch event: " + touchEvent);

// var x = touchEvent.clientX - element.getBoundingClientRect().left,
//   y = touchEvent.clientY - element.getBoundingClientRect().top;
// var message = JSON.stringify(element.getBoundingClientRect());
// alert("bounding rect: " + message);
