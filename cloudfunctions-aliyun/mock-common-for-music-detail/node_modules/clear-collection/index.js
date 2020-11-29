const db = uniCloud.database()

async function clearTable(table) {
  const clc = db.collection(table)
  const res = await clc.where({ _id: db.command.exists(true) }).remove()
  return res
}

module.exports = clearTable
