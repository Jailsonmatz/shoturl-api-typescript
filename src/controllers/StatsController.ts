import knex from '../database/connection';
import {Request, Response} from 'express';

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

            console.log('cegou aqui');
            console.log(id);
        if(stats.url === 0){
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
            .select('id', 'url', 'short_url','hit')
            .from('urls')
            .where('urls.id', req_id)
            .first();

        stats.short_url = `${process.env.APP_URL}:${process.env.APP_PORT}/${stats.short_url}` 
  
        return response.json(stats);
    }
}

export default StatsController;