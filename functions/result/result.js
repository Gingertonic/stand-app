const faunadb = require('faunadb')
const fauna = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })
const q = faunadb.query

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'PATCH'){
    return { statusCode: 405, body: JSON.stringify({ message: "PATCH IT UP!"})} 
  }

  try {
    console.log('Setting result')
    const { result, id } = JSON.parse(event.body)
    const updated = { correct: result }
    const req = await fauna.query(q.Update(q.Ref(`classes/submissions/${id}`), {data: updated}))

    const reqUpdated = await fauna.query(q.Map(q.Paginate(q.Match(q.Index("all_submissions"))), q.Lambda("attr", q.Get(q.Var("attr")))))

    const allSubmissions = reqUpdated.data 

    const shown = allSubmissions.filter(s => !!s.data.shown)
    const correct = shown.filter(s => !!s.data.correct)

    const overview = {
      totalCorrect: correct.length,
      totalShown: shown.length
    }

    return { statusCode: 200, body: JSON.stringify(overview)}
  } catch (err) {
    return { statusCode: 500, body: err }
  }
}
