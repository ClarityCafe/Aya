import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm";

import Collection from "./Collection";
import Post from "./Post";

@Entity()
export default class Tag {
  @PrimaryColumn("string", { unique: true })
  name: string;

  @Column("array", { unique: true })
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @Column("array")
  @ManyToMany(() => Collection, (collection) => collection.tags)
  collections: Collection[];

  @Column("bool")
  isNsfw: boolean;
}
