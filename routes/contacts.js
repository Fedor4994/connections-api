const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
} = require("../controllers/contactsController");
const {
  addContactValidation,
  updateContactValidatoin,
  updateStatusContactValidatoin,
} = require("../middlewares/validationMiddleware.js");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { uploadMiddleware } = require("../middlewares/filesMiddleware");
const { uploadController } = require("../controllers/filesController");

const router = express.Router();

router.use(authMiddleware);

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

router.patch(
  "/:contactId/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  uploadController
);

module.exports = router;
