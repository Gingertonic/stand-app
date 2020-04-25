const faunadb = require('faunadb')
const fauna = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })
const q = faunadb.query

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST'){
    return { statusCode: 403, body: JSON.stringify({ message: "POST OR BUST!"})} 
  }



  try {
    const { name, imageUrl } = JSON.parse(event.body)

    const submission = { data: {
      name, imageUrl, shown: false
    }}

    const req = await fauna.query(q.Create(q.Ref("classes/submissions"), submission))

    return { statusCode: 200, body: JSON.stringify({ message: 'Yay submitted!' })}
  } catch (err) {
    return { statusCode: 500, body: err }
  }
}
