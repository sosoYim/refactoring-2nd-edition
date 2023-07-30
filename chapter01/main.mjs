import { statement } from './complete/statement.js';

import invoices from './invoices.json' assert { type: 'json' };
import plays from './plays.json' assert { type: 'json' };

const result = statement(invoices[0], plays);

console.log('\n\n');
console.log(result);
