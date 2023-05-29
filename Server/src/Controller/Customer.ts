import { Controller } from './Bastion';
import { AppDataSource } from '../data-source';
import { Customer } from '../entity/Customer';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CustomerDTO } from '../../../Models';

export class Customair extends Controller {
    repository = AppDataSource.getRepository(Customer);
    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as object);
            entity.Customer_ID = null;

            entity.Passwd = await bcrypt.hash(entity.Passwd, 12);

            const result = await this.repository.save(entity);
            delete result.Passwd;

            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };
    login = async (req, res) => {
        try {
            const user = await this.repository.findOne({
                where: { Email: req.body.email },
                select: ['Customer_ID', 'Passwd']
            });

            if (!user) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }

            const passwordMatches = await bcrypt.compare(req.body.password, user.Passwd);
            if (!passwordMatches) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }

            const token = jwt.sign({ id: user.Customer_ID }, 'mySecretKey', { expiresIn: '2w' });
            res.json({ accessToken: token , userid: user.Customer_ID });
        } catch (err) {
            this.handleError(res, err);
        }
    };
    register = async (req, res) => {
        try {
            if ((await this.repository.exist({where: { Email: req.body.Email }}) === true)) {

                this.handleError(res,null,403,'Email is foglalt!');
            }else{
                const newuser = this.repository.create(req.body as object);
                newuser.Passwd = await bcrypt.hash(newuser.Passwd, 12);
                const result = await this.repository.save(newuser);
                res.json(result);
            }
            
            
        } catch (error) {
            this.handleError(res,error);
        }

    }
}