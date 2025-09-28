import {query, validationResult} from "express-validator"

export const getpostsValidator = [
  query("limit")
  .isInt()
  .withMessage("Limit must be an integer")
  .custom((value) => value <= 20)
  .withMessage("Limit cannot be more than 20"),


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });

    }
    next();
}
]
