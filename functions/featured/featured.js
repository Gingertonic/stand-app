const faunadb = require('faunadb')
const fauna = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })
const q = faunadb.query

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET'){
    return { statusCode: 405, body: JSON.stringify({ message: "GET OUTTA HERE!"})} 
  }

  try {
    const req = await fauna.query(q.Map(q.Paginate(q.Match(q.Index("all_submissions"))), q.Lambda("attr", q.Get(q.Var("attr")))))

    const remaining = req.data.filter(s => !s.data.shown)
    console.log(remaining)

    const getOne = () => remaining[Math.floor(Math.random() * remaining.length)]

    const featured = remaining.length === 2 ? remaining : [getOne()]

    return { statusCode: 200, body: JSON.stringify({ featured })}
  } catch (err) {
    return { statusCode: 500, body: err }
  }
}
