import { Entity, ManyToOne, Column, ManyToMany } from "typeorm";

import Base from "./Base";
import Tag from "./Tag";
import User from "./User";

@Entity()
export default class Post extends Base {
  @ManyToOne(() => User, (user) => user.posts)
  author: number;

  @Column("string", { length: 24 })
  caption: string;

  @Column("string")
  cdnUrl: string;

  @Column("bool")
  nsfw: boolean;

  @ManyToMany(() => Tag, (tags) => tags.posts)
  tags: Tag[];
}
