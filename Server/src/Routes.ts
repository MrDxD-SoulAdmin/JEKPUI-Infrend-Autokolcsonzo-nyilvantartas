import express = require("express");
import { Vehicle } from "./Controller/Vehicle";
import { Customair } from "./Controller/Customer";
import { License } from "./Controller/License";
import { checkUser } from "./protect-routes";

export function getRoutes() {
    const routers = express.Router();

    const vehicleController = new Vehicle();
    routers.get('/Vehicle', vehicleController.getAll);
    routers.get('/Vehicle/:id', vehicleController.getOne);
    routers.post('/Vehicle', checkUser,vehicleController.create);
    routers.put('/Vehicle', checkUser,vehicleController.update);
    routers.delete('/Vehicle/:id', vehicleController.delete);
    routers.get('/vehicle/Tipus/:id',vehicleController.GetTipus);
    routers.get('/vehicle/Rendszam/:id',vehicleController.GetRendszam);
    routers.post('/vehicle/register', vehicleController.NVRegister);
    routers.post('/vehicle/kolcson', vehicleController.update_By_Kolcsonzes);
    routers.get('/vehicle/my/:id' ,vehicleController.getmyvehicles);
    routers.post('/vehicle/back', vehicleController.BackVehicles);
    routers.post('/vehicle/selejt', vehicleController.SelejtVehicle);

    const CustomerController = new Customair();
    routers.get('/Customair', CustomerController.getAll);
    routers.get('/Customair/:id', CustomerController.getOne);
    routers.post('/Customair', CustomerController.create);
    routers.put('/Customair',checkUser, CustomerController.update);
    routers.delete('/Customair/:id', CustomerController.delete);
    routers.post('/Customair/login', CustomerController.login);
    routers.post('/Customair/register', CustomerController.register);

    const LicenseController = new License();
    routers.get('/License', LicenseController.getAll);
    routers.get('/License/:id', LicenseController.getOne);
    routers.post('/License', checkUser,LicenseController.create);
    routers.put('/License',checkUser, LicenseController.update);
    routers.delete('/License/:id', LicenseController.delete);

    return routers;
}