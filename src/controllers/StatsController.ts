import knex from '../database/connection';
import {Request, Response} from 'express';
import { Stats } from 'fs';

class StatsController {
    public async index (request: Request, response: Response){
       const stats = await knex.select(knex.raw('SUM(hit) as hit, COUNT(url) as url'))
        .from('urls')
        .first();

       let top10 = await knex.select()
        .from('urls')
        .orderBy('hit','desc')
        .limit(10);

       top10 = Object.assign({},top10);

       const data = {stats,top10}
 
       response.json(data);
    }

    public async userStats (request: Request, response: Response){
        const id = request.params.user_id;
        const stats = await knex.select(knex.raw('SUM(hit) as hit, COUNT(url) as url'))
            .from('urls')
            .where('user_id', id)
            .first();

        if(!stats.url){
            response.status(400).json('Usuário näo encontrado!!');
        }

        let top10 = await knex.select()
            .from('urls')
            .where('user_id', id)
            .orderBy('hit','desc')
            .limit(10);
 
        top10 = Object.assign({},top10);
 
        const data = {stats,top10}
  
        response.json(data);
    }

    public async urlStats (request: Request, response: Response){
        const req_id = request.params.id;

        let stats = await knex
            .select(
                'urls.id',
                'urls.url',
                'urls.short_url',
                'urls.hit',
                'users.login'
            )
            .join('users', 'users.id', 'urls.user_id')
            .from('urls')
            .where('urls.id', req_id)
            .first();

        stats.short_url = `${process.env.APP_URL}:${process.env.APP_PORT}/${stats.short_url}` 
  
        return response.json(stats);
    }
}

export default StatsController;