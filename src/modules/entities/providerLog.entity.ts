import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from './provider.entity';

@Entity('provider_log', { schema: 'mycar' })
export class ProviderLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @ApiProperty()
  @Column('datetime', { name: 'date_at', nullable: true })
  dateAt: Date | null;
  @ApiProperty()
  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string | null;
  @ApiProperty()
  @Column('varchar', { name: 'provider_domain', nullable: true, length: 255 })
  providerDomain: string | null;
  @ApiProperty()
  @Column('varchar', {
    name: 'provider_mac_address',
    nullable: true,
    length: 255,
  })
  providerMacAddress: string | null;
  @ApiProperty()
  @Column('varchar', {
    name: 'provider_server_type',
    nullable: true,
    length: 255,
  })
  providerServerType: string | null;

  @ManyToOne(() => Provider, (provider) => provider.providerLogs)
  @JoinColumn({ name: 'provider_id' })
  public provider: Provider;
  @ApiProperty()
  @Column({ name: 'provider_id' })
  providerId: number;
}
