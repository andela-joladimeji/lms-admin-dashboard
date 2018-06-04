import allActionTypes from './actionTypes';
import configs from './configurables';
import envVariables from './envVariables';
import url_addresses from './urls';
import localization from './locales';
import allMessageTypes from './messageTypes';

const constants = {
  actionTypes: allActionTypes,
  configurables: configs,
  envs: envVariables,
  urls: url_addresses,
  locales: localization,
  messageTypes: allActionTypes
};

export const urls = url_addresses;
export const envs = envVariables;
export const configurables = configs;
export const actionTypes = allActionTypes;
export const locales = localization;
export const messageTypes = allMessageTypes;

export default constants;