import { Router } from "express";
import * as controller from "../controllers/itemsController.ts";

const router = Router();
//mis on router???
//käsitleb navigatsiooni erinevate vaadete vahel

router.get("/", controller.getItems);
router.post("/", controller.createItem);
router.delete("/:id", controller.removeItem);
router.put("/:id", controller.modifyItem);

export default router;
