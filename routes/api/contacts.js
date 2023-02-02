const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");
const {
  addContactValidation,
  updateContactValidatoin,
  updateStatusContactValidatoin,
} = require("../../middlewares/validationMiddleware.js");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.post("/", addContactValidation, asyncWrapper(addContactController));

router.put(
  "/:contactId",
  updateContactValidatoin,
  asyncWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  updateStatusContactValidatoin,
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
