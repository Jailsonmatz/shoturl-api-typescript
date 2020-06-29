import knex from '../database/connection';
import generate from '../utils/Generate';
import {Request, Response} from 'express';

class UrlsController {
    public async index (request: Request, response: Response){
        const id = request.params.id;

        const data = await knex.select('id','url','hit').from('urls').where('short_url',id).first();
    
        if(!data){
            return response.status(404).send();
        }
            
        const hit = data.hit + 1;
        await knex('urls').where('id', data.id).update('hit',hit);
        return response.status(301).redirect(data.url);

    }

    public async show(request: Request, response: Response){
        const id = request.params.id;

        const data = await knex.select('id','url','hit').from('urls').where('id',id).first();
        
        if(!data){
            return response.status(404).send();
        }

        const hit = data.hit + 1;
        await knex('urls').where('id', data.id).update('hit',hit);
            
        return response.status(301).redirect(data.url);
    }

    public async store (request: Request, response: Response){
        const url: String = String(request.body.url);
        const user_id: Number = Number(request.params.user_id);
        const short_url = await generate.randomCode();

        try {
            const id = (await knex('urls').insert({url,short_url,user_id})).toString();
            return response.json({
                "id": id,
                // "hits": 0,
                "url": url, 
                // "shortUrl": process.env.APP_URL +':'+ process.env.APP_PORT + short_url     
                "shortUrl": `${process.env.APP_URL}:${process.env.APP_PORT}/${short_url}`
            });

        } catch (err) {
            let errorMessage = {};
            err.errno === 1452
                ? 
                errorMessage = response.status(400).json('Usuário não existe') 
                : 
                errorMessage = response.status(500).json(err)

            return errorMessage;
        }
    }

    public async destroy (request: Request, response: Response){
        const id: Number = Number(request.params.id);
        try {
            await knex('urls').where('id',id).delete();
             return response.status(204).send();
         } catch (err) {
             return response.status(500).json(err);
         }
    }
}

export default UrlsController;