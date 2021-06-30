import app from './lib/app.js';
import pool from './lib/utils/pools.js';

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

process.on('exit', () => {
  console.log('Until we meet again');
  pool.end();
});
