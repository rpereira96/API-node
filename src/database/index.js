const { Client } = require('pg');

const cliente = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

cliente.connect();

exports.query = async (query, values) => {
  const { rows } = await cliente.query(query, values);
  return rows;
};

// Query('SELECT * FROM contacts').then(console.log);


