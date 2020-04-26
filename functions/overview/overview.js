const faunadb = require('faunadb')
const fauna = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })
const q = faunadb.query

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET'){
    return { statusCode: 405, body: JSON.stringify({ message: "GET OUTTA HERE!"})} 
  }

  try {
    console.log('Fetching overview')
    const req = await fauna.query(q.Map(q.Paginate(q.Match(q.Index("all_submissions"))), q.Lambda("attr", q.Get(q.Var("attr")))))

    const allSubmissions = req.data
    const shown = allSubmissions.filter(s => !!s.data.shown)
    const correct = shown.filter(s => !!s.data.correct)
    const remaining = allSubmissions.length - shown.length

    const overview = {
      total: allSubmissions.length,
      totalRemaining: remaining,
      totalCorrect: correct.length,
      totalShown: shown.length
    }

    return { statusCode: 200, body: JSON.stringify(overview)}
  } catch (err) {
    return { statusCode: 500, body: err }
  }
}
