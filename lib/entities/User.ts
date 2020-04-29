import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";

import Collection from "./Collection";
import Post from "./Post";

@Entity()
export default class User {
  @PrimaryColumn("int", { unique: true })
  id: number;

  @Column("string", { length: 24 })
  username: string;

  @Column("string")
  redditName: string;

  @Column("array")
  @OneToMany(() => Post, (post) => post.id)
  posts: Post[];

  @Column("array")
  @OneToMany(() => Collection, (collection) => collection.id)
  collections: Collection[];

  @Column("timestamp")
  dateCreated: string;
}
