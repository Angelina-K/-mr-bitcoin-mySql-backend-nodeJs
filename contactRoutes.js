const CONTACT_URL = '/contact';
const ContactService = require('./contactService');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = (app) => {
  app.get(CONTACT_URL, (req, res, next) => {
    ContactService.query(req.query)
      .then((contacts) => {
        res.json(contacts);
      })
      .catch(next);
  });

  app.post(CONTACT_URL, jsonParser, (req, res) => {
    const contact = req.body;

    ContactService.add(contact).then((addedContact) => res.json(addedContact));
  });

  app.delete(`${CONTACT_URL}/:id`, (req, res, next) => {
    const id = req.params.id;

    ContactService.remove(id)
      .then((_) => {
        // console.log('delete res:', _)
        res.end();
      })
      .catch(next);
  });
  app.get(`${CONTACT_URL}/:id`, (req, res, next) => {
    const id = req.params.id;

    ContactService.getById(id)
      .then((contact) => res.json(contact))
      .catch(next);
  });

  app.put(CONTACT_URL, jsonParser, (req, res, next) => {
    const contact = req.body;
    ContactService.update(contact)
      .then((contact) => res.json(contact))
      .catch(next);
  });
};
