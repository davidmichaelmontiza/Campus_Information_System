import { Request, Response } from "express";

export abstract class BaseController<T> {
  protected abstract service: any;

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const items = await this.service.getAll();
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving data", error });
    }
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const item = await this.service.getOne(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving item", error });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const newItem = await this.service.create(req.body);
      return res.status(201).json(newItem);
    } catch (error) {
      return res.status(500).json({ message: "Error creating item", error });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedItem = await this.service.update(req.params.id, req.body);
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      return res.status(200).json(updatedItem);
    } catch (error) {
      return res.status(500).json({ message: "Error updating item", error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deletedItem = await this.service.delete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      return res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting item", error });
    }
  }
}
