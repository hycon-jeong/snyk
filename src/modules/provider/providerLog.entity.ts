import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProviderEntity } from './provider.entity';

@Index('fk_provider_log_provider1', ['providerCode'], {})
@Entity('provider_log', { schema: 'mycar' })
export class ProviderLogEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'provider_code', length: 45 })
  providerCode: string;

  @Column('datetime', { name: 'date_at', nullable: true })
  dateAt: Date | null;

  @Column('varchar', { name: 'status', nullable: true, length: 45 })
  status: string | null;

  @Column('varchar', { name: 'provider_domain', nullable: true, length: 45 })
  providerDomain: string | null;

  @Column('varchar', {
    name: 'provider_mac_address',
    nullable: true,
    length: 45,
  })
  providerMacAddress: string | null;

  @Column('varchar', {
    name: 'provider_server_type',
    nullable: true,
    length: 45,
  })
  providerServerType: string | null;

  @ManyToOne(() => ProviderEntity, (provider) => provider.providerLogs, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id', referencedColumnName: 'id' }])
  providerCode2: ProviderEntity;
}
