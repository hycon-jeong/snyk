import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provider_event_type', { schema: 'mycar' })
export class ProviderEventType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'provider_code' })
  providerCode: number;

  @Column('int', { name: 'evnet_type_id' })
  evnetTypeId: number;
}
