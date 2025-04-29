// crispy-toast.js

let CrispyToast = {};
let Timer;
CrispyToast.toasts = [];

CrispyToast.createToast = function(message, options) {
  options = options || {};
  let toast = {
    message: message,
    type: options.type || 'message',
    position: options.position || 'top-right',
    timeout: options.timeout || 1000
  };

  CrispyToast.toasts.push(toast);

  CrispyToast.renderToast(toast);
};
CrispyToast.clearall = function() {
  /* if (Timer !=null) {
    return true;
  } */
  let toastElements = document.querySelectorAll('.crispy-toast');
  if (toastElements.length > 0) {
    toastElements.forEach(function(element) {
      document.body.removeChild(element);
    });
  }
}
CrispyToast.getType = function(toast) {
  return toast.type;
}
CrispyToast.renderToast = function(toast) {
  let toastContainer = document.createElement('div');
  toastContainer.className = 'crispy-toast ' + toast.type + ' ' + toast.position;
  // Create an element for the message
  let messageElement = document.createElement('span');
  messageElement.className = 'toast-message';
  messageElement.textContent = toast.message;

  toastContainer.appendChild(messageElement);

  document.body.appendChild(toastContainer);

  Timer = setTimeout(function() {
    CrispyToast.removeToast(toast);
    Timer=null;
  }, toast.timeout);
};



CrispyToast.removeToast = function(toast) {
  let index = CrispyToast.toasts.indexOf(toast);
  if (index !== -1) {
    CrispyToast.toasts.splice(index, 1);
  }

  let toastElements = document.querySelectorAll('.crispy-toast.' + toast.position);
  if (toastElements.length > 0) {
    toastElements.forEach(function(element) {
      document.body.removeChild(element);
    });
  }
};

CrispyToast.message = function(message, options) {
  CrispyToast.createToast(message, Object.assign({}, options, { type: 'message' }));
};

CrispyToast.success = function(message, options) {
  CrispyToast.createToast(message, Object.assign({}, options, { type: 'success' }));
};

CrispyToast.info = function(message, options) {
  CrispyToast.createToast(message, Object.assign({}, options, { type: 'info' }));
};

CrispyToast.warning = function(message, options) {
  CrispyToast.createToast(message, Object.assign({}, options, { type: 'warning' }));
};

CrispyToast.error = function(message, options) {
  CrispyToast.createToast(message, Object.assign({}, options, { type: 'error' }));
};

// Attach CrispyToast to the global object (window)
window.CrispyToast = CrispyToast;

