import toastr from 'toastr';

class Alert {
  /**
   * success
   * @param {string} [message='']
   * @param {string} title 
   * Show a success event alert
   */
  static success(message, title = undefined) {
    toastr.success(message, title);
  }

  /**
   * error
   * @param {string} message 
   * @param {string} title 
   * Show an error event alert
   */
  static error(message, title = undefined) {
    toastr.error(message, title);
  }

  /**
   * warning
   * @param {string} message 
   * @param {string} title 
   * Show a warning event alert
   */
  static warning(message, title = undefined) {
    toastr.warning(message, title);
  }

  /**
   * info
   * @param {string} message 
   * @param {string} title 
   * Show an info event alert
   */
  static info(message, title = undefined) {
    toastr.info(message, title);
  }
}

export default Alert;