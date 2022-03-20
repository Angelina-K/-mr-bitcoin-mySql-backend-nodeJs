const DBService = require('./dbService');

function query(criteria = {}) {
  const termPart = criteria.term || '';
  // WHERE name starts with namePart
  const query = `SELECT * FROM contact  WHERE contact.name LIKE '${termPart}%'`;

  return DBService.runSQL(query);
}

async function getById(contactId) {
  var query = `SELECT * FROM contact WHERE contact._id = ${contactId}`;

  var contacts = await DBService.runSQL(query);
  if (contacts.length === 1) return contacts[0];
  throw new Error(`contact id ${contactId} not found`);
}

function add(contact) {
  const { name, email, phone } = contact;
  const sqlCmd = `INSERT INTO contact (_id, name, email, phone)
                VALUES (NULL,
                  "${name}",
                        "${email}",
                        "${phone}")`;

  return DBService.runSQL(sqlCmd);
}

async function update(contact) {
  const query = `UPDATE contact set name = "${contact.name}",
    email = "${contact.email}",
    phone = "${contact.phone}"
                WHERE contact._id = "${contact._id}"`;

  const okPacket = await DBService.runSQL(query);
  if (okPacket.affectedRows !== 0) return okPacket;
  throw new Error(`No contact updated - contact id ${contact._id}`);
}

function remove(id) {
  var query = `DELETE FROM contact WHERE contact._id = ${id}`;

  return DBService.runSQL(query).then((okPacket) =>
    okPacket.affectedRows === 1
      ? okPacket
      : Promise.reject(new Error(`No contact deleted - contact id ${id}`))
  );
}

module.exports = {
  query,
  getById,
  add,
  update,
  remove,
};
