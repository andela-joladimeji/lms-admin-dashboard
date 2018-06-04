import dotenv from 'dotenv';
import { chalkSuccess } from './chalkConfig';

dotenv.config({ silent: false });
/* eslint-disable no-console */
console.log(chalkSuccess(`
===================================
=  loaded .env file successfully  =
===================================
`
));
