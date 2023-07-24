import { statement } from './01-1/statement.js';

import invoices from './invoices.json' assert { type: 'json' };
import plays from './plays.json' assert { type: 'json' };

const result = statement(invoices[0], plays);

console.log('\n\n');
console.log(result);
