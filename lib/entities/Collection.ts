import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";

import Base from "./Base";
import Post from "./Post";
// import Tag from "./Tag";
import User from "./User";

@Entity()
export default class Collection extends Base {
  @ManyToOne(() => User, (user) => user.collections)
  author: number;

  @Column("string", { length: 500 })
  name: string;

  @ManyToMany(() => Post)
  @JoinTable()
  posts: Post[];

  @Column("bool")
  nsfw: boolean;
}
