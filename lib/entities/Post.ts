import { Entity, PrimaryColumn, ManyToOne, Column, ManyToMany } from "typeorm";

import User from "./User";
import Tag from "./Tag";

@Entity()
export default class Post {
  @PrimaryColumn("int", { unique: true })
  id: number;

  @ManyToOne(() => User, (user) => user.posts)
  author: number;

  @Column("string", { length: 24 })
  caption: string;

  @Column("string")
  cdnUrl: string;

  @Column("bool")
  isNsfw: boolean;

  @Column("timestamp")
  dateCreated: string;

  @ManyToMany(() => Tag, (tags) => tags.posts)
  tags: Tag[];
}
