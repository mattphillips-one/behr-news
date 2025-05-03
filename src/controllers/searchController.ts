import bhrrcService from '../services/bhrrcService.js';
import filterService from '../services/filterService.js';
import type { Request, Response } from 'express';

interface RequestQuery {
    query: string
}

export const SearchController = {
    async search(req: Request<RequestQuery>, res: Response) {
        const { query } = req;
        const searchTerm = (typeof query.query === "string") ? query.query : "";

        if (searchTerm === "") {
            res.status(400).send({message: "Provide a correct search term"});
        }

        try {
            const bhrrc = await bhrrcService.fetchBHRRC(searchTerm);
            const result = filterService.sortByRecent(bhrrc);
            res.status(200).json(result);
        } catch(error) {
            console.log(error)
            res.status(500).send({message: "Guardian service failed"});
        }
    }
}