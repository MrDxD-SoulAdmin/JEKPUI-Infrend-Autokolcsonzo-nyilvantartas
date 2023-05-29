
import { Controller } from "./Bastion";
import { AppDataSource } from "../data-source";
import VehicleE from "../entity/Vehicle";
import { Customer } from "../entity/Customer";
import Lisense from "../entity/Lisense";
import { License } from "./License";
import { VehicleDTO } from "../../../Models";


export class Vehicle extends Controller {
    repository = AppDataSource.getRepository(VehicleE);
    GetRendszam = async (req, res) => {
        try {
            const entity = await this.repository.findOneByOrFail({ Rendszam: req.params.id });
            if (!entity) {
                return this.handleError(res, null, 404, 'No entity found with this id.');
            }
            res.json([entity]);

        } catch (err) {

            this.handleError(res, err);
        }

    };
    GetTipus = async (req, res) => {
        try {
            const entity = await this.repository.find({ where: { Tipus: req.params.id } });
            if (!entity) {
                return this.handleError(res, null, 404, 'No entity found with this id.');
            }

            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };
    NVRegister = async (req, res) => {
        try {
            if ((await this.repository.exist({ where: { Rendszam: req.body.Rendszam } }) === true)) {

                this.handleError(res, null, 403, 'A Jármű Már létezik!');
            } else {
                const newvehivcle = this.repository.create(req.body as object);
                const result = await this.repository.save(newvehivcle);
                res.json(result);
            }


        } catch (error) {
            this.handleError(res, error);
        }

    };
    update_By_Kolcsonzes = async (req, res) => {
        try {
            let entity = await this.repository.findOneBy({ Rendszam: req.body.Shearch_Data });
            if (!entity || !req.body.Shearch_Data) {
                return this.handleError(res, null, 404, 'Nincs ilyen jármű.');
            }
            entity.status = 'Kölcsönzött';
            entity.The = req.body.The;

            entity = this.repository.create(entity as object);
            const result = await this.repository.save(entity);
            const lic = new Lisense();
            lic.Customer_ID = req.body.The.Customer_ID;
            lic.Vehicle_ID = entity.Vehicle_ID;
            lic.Start_Km = entity.Futott;
            lic.Start_Time = new Date().toLocaleDateString();

            const lice = new License();
            lice.Createnewlicence(lic);


            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    BackVehicles = async (req, res) => {
        let entity = await this.repository.findOneBy({ Rendszam: req.body.Shearch_Data });
        //let entity = await this.repository.createQueryBuilder("VehicleT").innerJoinAndSelect("VehicleT.theCustomerID", "Customer").where("VehicleT.Rendszam = :rsz",{rsz:req.body.Shearch_Data}).getOne() as VehicleE;
        if (!entity || !req.body.Shearch_Data) {
            return this.handleError(res, null, 404, 'Nincs ilyen jármű.');
        }

        const Price = await new License().CalcEndoflicense(req.body.Shearch_Data_km, entity.Vehicle_ID, req.body.The.Customer_ID, req.body.Shearch_Data_damaged, parseInt(entity.Kolcsonzse_Dij));

        entity.status = 'Szabad';
        entity.The = null;
        entity.Futott = req.body.Shearch_Data_km;
        entity = this.repository.create(entity as object);
        const result = await this.repository.save(entity);

        res.json(Price);

    };

    getmyvehicles = async (req, res) => {
        const nc = new Customer;
        nc.Customer_ID = req.params.id;
        try {
            const entity = await this.repository.find({ where: { The: nc } });
            if (!entity) {
                return this.handleError(res, null, 404, 'No entity found with this id.');
            }

            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    }

    SelejtVehicle = async (req, res) => {
        try {
            let entity = await this.repository.findOneBy({ Rendszam: req.body.Rendszam });
            if (!entity) {
                return this.handleError(res, null, 404, 'No entity found with this id.');
            }
            entity.Selejt = true;
            entity = this.repository.create(entity as object);
            await this.repository.save(entity);
            res.json();
        } catch (err) {
            this.handleError(res, err);
        }
    };


}