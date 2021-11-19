import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Event } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export default class CrudsEventService extends TypeOrmCrudService<Event> {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {
    super(eventRepository);
  }

  async getProviderApiCalls(): Promise<any> {
    return this.eventRepository
      .createQueryBuilder()
      .select('count(*) as provider_count, provider.provider_name, provider_id')
      .leftJoin('provider', 'provider', 'provider.id = provider_id')
      .groupBy('provider_id')
      .getRawMany();
  }
  async getEventByProvider(provider_id) {
    return this.eventRepository
      .createQueryBuilder()
      .select('count(*) as event_count,category.name')
      .leftJoin('categories', 'category', 'category.id = category_id')
      .where('provider_id = :provider_id', {
        provider_id: provider_id,
      })
      .groupBy('category_id')
      .getRawMany();
  }

  async getqConsumerApiCalls(): Promise<any> {
    return this.eventRepository
      .createQueryBuilder()
      .select(
        'count(*) as consumer_count, consumer.consumer_name, userMapping.consumer_id as consumer_id',
      )
      .leftJoin(
        'user-mapping',
        'userMapping',
        'userMapping.id = user_mapping_id',
      )
      .leftJoin('consumer', 'consumer', 'consumer.id = userMapping.consumer_id')
      .groupBy('userMapping.consumer_id')
      .getRawMany();
  }

  async getEventByConsumer(consumer_id) {
    return this.eventRepository
      .createQueryBuilder()
      .select('count(*) as event_count,category.name')
      .leftJoin('categories', 'category', 'category.id = category_id')
      .leftJoin(
        'user-mapping',
        'userMapping',
        'userMapping.id = user_mapping_id',
      )
      .where('userMapping.consumer_id = :consumer_id', {
        consumer_id: consumer_id,
      })
      .groupBy('category_id')
      .getRawMany();
  }
}
