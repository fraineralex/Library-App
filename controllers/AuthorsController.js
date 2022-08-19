const Authors = require("../models/Authors");
const Books = require("../models/Books");

exports.GetAdminAuthors = (req, res, next) => {
  Authors.findAll({ include: [{ model: Books }] })
    .then((result) => {
      const authors = result.map((result) => result.dataValues);

      res.render("admin/authors/admin-authors", {
        pageTitle: "Autores",
        authorsActive: true,
        authors: authors,
        hasAuthors: authors.length > 0,
      });
    })
    .catch((er) => {
      console.log(err);
    });
};

exports.GetRegisterAuthor = (req, res, next) => {
  res.render("admin/authors/save-author", {
    pageTitle: "Registrar Autor",
    authorsActive: true,
  });
};

exports.PostRegisterAuthor = (req, res, next) => {
  const name = req.body.Name;
  const lastName = req.body.LastName;
  const email = req.body.Email;
  const phone = req.body.Phone;

  Authors.create({
    name: name,
    lastName: lastName,
    email: email,
    phone: phone,
  })
    .then((result) => {
      res.redirect("/admin-authors");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditAuthors = (req, res, next) => {
  const edit = req.query.edit;
  const authorId = req.params.AuthorId;

  if (!edit) {
    return res.redirect("/admin-authors");
  }

  Authors.findOne({ where: { id: authorId } })
    .then((result) => {
      const author = result.dataValues;

      if (!author) {
        return res.redirect("/admin-authors");
      }

      res.render("admin/authors/save-author", {
        pageTitle: "Actualizar Autor",
        authorsActive: true,
        editMode: edit,
        author: author,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditAuthor = (req, res, next) => {
  const authorId = req.body.AuthorId;
  const name = req.body.Name;
  const lastName = req.body.LastName;
  const email = req.body.Email;
  const phone = req.body.Phone;

  Authors.update(
    {
      name: name,
      lastName: lastName,
      email: email,
      phone: phone,
    },
    { where: { id: authorId } }
  )
    .then((result) => {
      res.redirect("/admin-authors");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeleteAuthor = (req, res, next) => {
  const authorId = req.body.AuthorId;

  Authors.destroy({ where: { id: authorId } });

  res.redirect("/admin-authors");
};
