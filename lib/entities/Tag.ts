import {
  Entity,
  PrimaryColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import Post from "./Post";

@Entity()
export default class Tag {
  @PrimaryColumn("string", { unique: true, length: 32 })
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
