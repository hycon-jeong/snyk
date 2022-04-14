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
import { Provider } from '.';

@Entity('blocker', { schema: 'mycar' })
export class Blocker {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column({ name: 'provider_id', nullable: true })
  providerId: number;

  @ApiProperty()
  @Column('varchar', { name: 'ip_address', nullable: true, length: 64 })
  ipAddress: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'mac_address', nullable: true, length: 64 })
  MacAddress: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'note', nullable: true, length: 512 })
  note: string | null;

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

  @ManyToOne(() => Provider, (provider) => provider.blockers)
  @JoinColumn({ name: 'provider_id' })
  public provider: Provider;
}
