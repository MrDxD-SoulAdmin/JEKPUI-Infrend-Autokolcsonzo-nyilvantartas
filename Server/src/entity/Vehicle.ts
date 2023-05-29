import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VehicleDTO } from "../../../Models"
import { Customer } from "./Customer";

@Entity()
export default class Vehicle implements VehicleDTO {
    @PrimaryGeneratedColumn()
    Vehicle_ID: number;

    @Column({type:"text"})
    Tipus: string;

    @Column({type:"text"})
    Gyarto: string;

    @Column({type:"text"})
    Rendszam: string;

    @Column({type:"text"})
    AlvazSzam: string;

    @Column({type:"text"})
    Beszerzes: string;

    @Column({type:"text"})
    Kolcsonzse_Dij: string;

    @Column({type:"text"})
    Futott: string;

    @Column({type:"text"})
    status: string;
    
    @ManyToOne(()=> Customer,(Customer) => Customer.vhc)
    The: Customer;

    @Column({type:"boolean", default:"0"})
    Selejt: boolean;

}