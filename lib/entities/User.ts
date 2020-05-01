import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";

import Base from "./Base";
import Collection from "./Collection";
import Post from "./Post";

@Entity()
export default class User extends Base {
  @Column("string", { length: 32 })
  username: string;

  @Column("string", { unique: true })
  redditName: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Collection, (collection) => collection.author)
  collections: Collection[];
}
