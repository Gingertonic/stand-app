const faunadb = require('faunadb')
const fauna = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })
const q = faunadb.query

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST'){
    return { statusCode: 403, body: JSON.stringify({ message: "POST OR BUST!"})} 
  }

  console.log(fauna)

  try {

    return { statusCode: 200, body: JSON.stringify({ message: "test"})}
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
