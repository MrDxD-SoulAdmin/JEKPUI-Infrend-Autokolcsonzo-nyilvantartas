import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Vehicle from "./Vehicle";
import { CustomerDTO } from "../../../Models";

@Entity()
export class Customer implements CustomerDTO {

    @PrimaryGeneratedColumn()
    Customer_ID: number;
    @Column({ type: "text" })
    Nev: string;
    @Column({ type: "text" })
    Telefonszam: string;
    @Column({ type: "text" })
    Address: string;
    @Column({ type: "text" })
    IG_Number: string;
    @Column({ type: "text" })
    Email: string;
    @Column({ type: "text" })
    Passwd: string;
    @OneToMany(() => Vehicle, (vehicle) => vehicle.The)
    vhc: Vehicle[]
}