import knex from '../database/connection';
import {Request,Response, } from 'express';

class UsersController {

    public async store (request: Request, response: Response){

        const {login, password} = request.body;

        try {
           await knex('users').insert({login,password});
            return response.status(201).json({user:login, message: 'Usuário criado com sucesso'});
        } catch (err) {

            let error = {};
            err.code === 'ER_DUP_ENTRY' 
                ? 
                error = response.json('Usuário já cadastrado') 
                : 
                error = response.json(err)
        }
        
    }

    public async destroy (request: Request, response: Response){
        const {user_id} = request.params

        try {
           const test = await knex('users').where('id',user_id).delete();
            return response.status(204).send();
        } catch (err) {
            return response.json(err);
        }
        
    }
}

export default UsersController;