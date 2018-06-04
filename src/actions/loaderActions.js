import types from '../constants/actionTypes';

export function startPageLoad() {
  return { type: types.START_PAGE_LOAD, loader: { pageLoading: true } };
}

export function stopPageLoad() {
  return { type: types.STOP_PAGE_LOAD, loader: { pageLoading: false } };
}

export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL};
}

export function ajaxCallError() {
  return { type: types.AJAX_CALL_ERROR};
}
