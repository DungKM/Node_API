import express from "express";

import { create, get, getAll, remove, update } from "../controller/products";

const router = express.Router();

router.get("/product",getAll);
router.post("/product",create);
router.delete("/product/:id", remove)
router.put("/product/:id", update)
router.get("/product/:id",get)

export default router;
