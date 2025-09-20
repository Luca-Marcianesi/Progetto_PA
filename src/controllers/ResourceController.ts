import { IResourceService } from "../services/serviceInterface/IResourceService";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { INTEGER } from "sequelize";

export class ResourceController {
    constructor (private resourceService: IResourceService) { }

    createResource = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description } = req.body;
            const resourceId = await this.resourceService.createResource({ name, description});
            return res.status(StatusCodes.CREATED).json({ message: "Resource created with Id " + resourceId });
        }catch (error) {
            next(error);
        }
    };

    getAllResources = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resources = await this.resourceService.getAllResources();
            return res.status(StatusCodes.OK).json(resources);
        } catch (error) {
            next(error);
        }
    }

    getResourceById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resourceId = Number(req.params.id);
            const resource = await this.resourceService.getResourceById(resourceId);
            return res.status(StatusCodes.OK).json(resource);
        } catch (error) {
            next(error);
        }
    }

    updateResource = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const resourceId = Number(req.params.id);
            const {name , description} = req.body
            await this.resourceService.updateResource(resourceId,{name,description})
            return res.status(StatusCodes.OK).json({message: "Update ok"});
            
        } catch (error) {
            next(error)
            
        }
    }


    
}
