import { IResourceService } from "../services/serviceInterface/IResourceService";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateResourceInput } from "../middleware/zodValidator/resource.schema";

export class ResourceController {
    constructor (private resourceService: IResourceService) { }

    createResource = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let input = req.body as unknown as CreateResourceInput
            const resource = await this.resourceService.createResource(input);
            return res.status(StatusCodes.CREATED).json({ message: "Resource created :" + resource.name });
        }catch (error) {
            next(error);
        }
    };
    
}
