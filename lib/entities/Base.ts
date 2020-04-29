import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export default class Base {
  @PrimaryColumn("int", { unique: true })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
