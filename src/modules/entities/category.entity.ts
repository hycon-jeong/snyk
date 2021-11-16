import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from '.';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Provider } from '.';

@Entity('categories', { schema: 'mycar' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => User, (users) => users.id, {})
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  user_id: number;

  @ApiProperty()
  @Column('varchar', { name: 'name', nullable: true })
  name: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'desc', nullable: true })
  desc: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'image_url', nullable: true })
  imageUrl: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @OneToMany(() => Event, (event) => event.category)
  events: Event[];
}
