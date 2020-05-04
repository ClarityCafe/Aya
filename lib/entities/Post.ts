import { Entity, ManyToOne, Column, ManyToMany, JoinTable } from "typeorm";

import Base from "./Base";
import Tag from "./Tag";
import User from "./User";

@Entity()
export default class Post extends Base {
  @ManyToOne(() => User, (user) => user.posts)
  author: string;

  @Column("string", { length: 500 })
  caption: string;

  @Column("string")
  ipfsHash: string;

  @Column("bool")
  nsfw: boolean;

  @ManyToMany(() => Tag, (tags) => tags.posts)
  @JoinTable()
  tags: Tag[];
}
