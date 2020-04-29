import { Entity, Column, ManyToOne, ManyToMany } from "typeorm";

import Base from "./Base";
import Post from "./Post";
import Tag from "./Tag";
import User from "./User";

@Entity()
export default class Collection extends Base {
  @ManyToOne(() => User, (user) => user.collections)
  author: number;

  @Column("string", { length: 24 })
  name: string;

  @ManyToMany(() => Post, (post) => post.id)
  posts: Post[];

  @Column("bool")
  nsfw: boolean;

  @ManyToMany(() => Tag, (tags) => tags.collections)
  tags: Tag[];
}
