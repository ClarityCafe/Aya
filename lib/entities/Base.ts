import {
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

export default abstract class Base extends BaseEntity {
  @PrimaryColumn("text", {
    unique: true,
  })
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
