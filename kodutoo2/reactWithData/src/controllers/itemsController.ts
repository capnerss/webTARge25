import type { Request, Response} from "express";
import * as service from "../services/itemsService.ts";

export const getItems = async (_: Request, res: Response) => {
    const items = await service.getItems();
    res.json(items);
};

export const createItem = async (req: Request, res: Response) => {
    await service.addItem(req.body.name);
    res.sendStatus(201);
}

export const removeItem = async (req: Request, res: Response) => {
    await service.deleteItem(Number(req.params.id));
    res.sendStatus(200);
}
export const modifyItem = async (req: Request, res: Response) => {
    await service.modifyItem(Number(req.params.id), String(req.body.name));
    res.sendStatus(200);
}



