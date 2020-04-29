import { Entity, PrimaryColumn, Column, ManyToOne, ManyToMany } from "typeorm";

import User from "./User";
import Post from "./Post";
import Tag from "./Tag";

@Entity()
export default class Collection {
  @PrimaryColumn("int", { unique: true })
  id: number;

  @Column("int")
  @ManyToOne(() => User, (user) => user.collections)
  author: number;

  @Column("string", { length: 24 })
  name: string;

  @Column("array")
  @ManyToMany(() => Post, (post) => post.id)
  posts: Post[];

  @Column("bool")
  isNsfw: boolean;

  @ManyToMany(() => Tag, (tags) => tags.collections)
  @Column("array")
  tags: Tag[];
}
