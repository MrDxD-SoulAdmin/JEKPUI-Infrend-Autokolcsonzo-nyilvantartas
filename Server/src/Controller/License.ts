
import { Controller } from "./Bastion";
import { AppDataSource } from "../data-source";
import LicenseE from "../entity/Lisense"

export class License extends Controller {
    repository = AppDataSource.getRepository(LicenseE);

    Createnewlicence(L: LicenseE) {
        this.repository.create(L as Object);
        this.repository.save(L as Object);
    }
    async CalcEndoflicense(kmi: number, vid: number, cid: number, dmg: boolean, kp: number): Promise<Number> {
        let Tempenty = await this.repository.findOne({ where: { Vehicle_ID: vid, Customer_ID: cid } });
        const finalkm = (kmi - parseInt(Tempenty.Start_Km));
        const dif = Math.abs(new Date().getMilliseconds() - new Date(Tempenty.Start_Time).getMilliseconds());
        const days = Math.ceil(dif / 1000 / 60 / 60 / 24);
        this.repository.remove(Tempenty);
        return (kp * days) + (finalkm * 69) + (dmg ? 20000 : 0);
    }
}