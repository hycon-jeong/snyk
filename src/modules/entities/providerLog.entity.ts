import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Provider } from './provider.entity';

@Entity('provider_log', { schema: 'mycar' })
export class ProviderLog {
  @Column('int', { primary: true, name: 'provider_log_id' })
  providerLogId: number;

  @Column('varchar', { name: 'provider_code', length: 255 })
  providerCode: string;

  @Column('datetime', { name: 'date_at', nullable: true })
  dateAt: Date | null;

  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string | null;

  @Column('varchar', { name: 'provider_domain', nullable: true, length: 255 })
  providerDomain: string | null;

  @Column('varchar', {
    name: 'provider_mac_address',
    nullable: true,
    length: 255,
  })
  providerMacAddress: string | null;

  @Column('varchar', {
    name: 'provider_server_type',
    nullable: true,
    length: 255,
  })
  providerServerType: string | null;

  @ManyToOne(() => Provider, (provider) => provider.providerLogs, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'provider_code', referencedColumnName: 'providerCode' }])
  providerCode2: Provider;
}
