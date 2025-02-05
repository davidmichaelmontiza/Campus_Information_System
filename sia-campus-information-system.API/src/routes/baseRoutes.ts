import { Router } from "express";
import { BaseController } from "../controllers/baseController";
import { Request, Response } from "express";

export abstract class BaseRoutes<T> {
  public router: Router;
  protected abstract controller: BaseController<T>;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.controller.getAll.bind(this.controller));
    this.router.get("/:id", this.controller.getOne.bind(this.controller));
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.put("/:id", this.controller.update.bind(this.controller));
    this.router.delete("/:id", this.controller.delete.bind(this.controller));
  }
}
