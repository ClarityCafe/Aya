/*
 *  Copyright (c) 2020 Ayane Satomi, Michael Mitchell, et al.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

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
