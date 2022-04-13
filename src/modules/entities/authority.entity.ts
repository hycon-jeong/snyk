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
import { Event, EventLog } from '.';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Provider } from '.';
import { EventType } from 'modules/api.tvapp/v1/test/tv.test.controller';
import { UserAuthorityMapping } from './userAuthorityMapping.entity';

@Entity('authority', { schema: 'mycar' })
export class Authority {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'name', nullable: true })
  name: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'code', nullable: true })
  code: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'status', default: 'ACTIVE' })
  status: string | null;

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

  @OneToMany(() => UserAuthorityMapping, (map) => map.authority)
  userAuthorityMappings: UserAuthorityMapping[];
}
