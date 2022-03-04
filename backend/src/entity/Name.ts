import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "names" })
export class Name extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string | undefined;

  @Column("text", { name: "name" })
  name: string | undefined;
}
