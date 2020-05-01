import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export default abstract class Base {
  @PrimaryColumn("text", {
    unique: true,
  })
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
