import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LisenseDTO } from "../../../Models";

@Entity()

export default class Lisense implements LisenseDTO {
    
    @PrimaryGeneratedColumn()
    Licens_ID: number;
    @Column({type:"integer"})
    Vehicle_ID: number;
    @Column({type:"integer"})
    Customer_ID: number;
    @Column({type:"text"})
    Start_Time: string;
    @Column({type:"text"})
    Start_Km: string;
}