import crypto from 'crypto';

class Generate{
    public async randomCode(){
        return crypto.randomBytes(3).toString('hex');
    }
}

export default new Generate();