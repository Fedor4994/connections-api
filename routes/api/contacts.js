const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  addContactController,
  updateContactController,
} = require("../../controllers/contactsController");
const {
  addContactValidation,
} = require("../../middlewares/validationMiddleware.js");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.post("/", addContactValidation, asyncWrapper(addContactController));

router.put(
  "/:contactId",
  addContactValidation,
  asyncWrapper(updateContactController)
);

module.exports = router;
