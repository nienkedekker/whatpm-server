import express from "express";
import passport from "passport";
import Item from "../models/Item";

require("../authentication/passport")(passport);

const router = express.Router();

/**
 * GET a single item by ID
 * ex: host.com/api/item/123456
 */
router.get("/:id", (req, res, next) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) return next(err);
    res.json(item);
  });
});

export default router;
