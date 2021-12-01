import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'modules/config';
import { Consumer, Event, Message, Provider, User } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getTotalConsumer() {
    const totalConsumer = this.consumerRepository.count();
    return totalConsumer;
  }

  async getTotalProvider() {
    const totalProvider = this.providerRepository.count();
    return totalProvider;
  }

  async getTotalEvent() {
    const totalEvent = this.eventRepository.count();
    return totalEvent;
  }
  async getTotalMessage() {
    const totalMessage = this.messageRepository.count();
    return totalMessage;
  }

  async getTotalUser() {
    return this.userRepository.count();
  }

  async getUserRank(startDate, today, endDate) {
    return this.userRepository.query(
      `SELECT COUNT(*) AS curr,u.name as userName ,u.id as userId,
      IFNULL((SELECT COUNT(*) FROM EVENT AS ie
      LEFT JOIN \`user-mapping\` AS ium on ium.id = ie.user_mapping_id
      LEFT JOIN users AS iu ON iu.id = ium.user_id
          WHERE iu.id = u.id AND ie.issued_at > ? AND ie.issued_at <= ?
        GROUP BY iu.id),0) AS prev
  FROM EVENT as e
    LEFT JOIN \`user-mapping\` AS um on um.id = e.user_mapping_id
    LEFT JOIN users AS u ON u.id = um.user_id
    WHERE e.issued_at > ? AND e.issued_at <= ?
    GROUP BY u.id
    ORDER BY curr desc
  LIMIT 10`,
      [startDate, today, today, endDate],
    );
  }
  async getUserTotalRank() {
    return this.userRepository.query(
      `SELECT 
        COUNT(*) AS curr,
        u.name as userName,
        u.id as userId
          FROM EVENT as e
            LEFT JOIN \`user-mapping\` AS um on um.id = e.user_mapping_id
            LEFT JOIN users AS u ON u.id = um.user_id
          GROUP BY u.id
          ORDER BY curr desc
      LIMIT 10`,
      [],
    );
  }

  async getProviderRank(startDate, today, endDate) {
    return this.userRepository.query(
      `SELECT COUNT(*) AS curr,p.provider_name as providerName, p.id as providerId,
      IFNULL((SELECT COUNT(*) FROM EVENT AS ie
        LEFT JOIN \`provider\` AS ip on ip.id = ie.provider_id
            WHERE ip.id = e.provider_id AND ie.issued_at > ? AND ie.issued_at <= ?
          GROUP BY ip.id),0) AS prev
    FROM EVENT as e
      LEFT JOIN \`provider\` AS p ON p.id = e.provider_id
      WHERE e.issued_at > ? AND e.issued_at <= ?
      GROUP BY p.id
      ORDER BY curr desc
    LIMIT 10`,
      [startDate, today, today, endDate],
    );
  }

  async getProviderTotalRank() {
    return this.userRepository.query(
      `SELECT 
        COUNT(*) AS curr, 
        p.provider_name as providerName,
        p.id as providerId
          FROM EVENT as e
            LEFT JOIN provider AS p ON p.id = e.provider_id
          GROUP BY p.id
          ORDER BY curr desc
      LIMIT 10`,
      [],
    );
  }

  async getConsumerRank(startDate, today, endDate) {
    return this.userRepository.query(
      `SELECT COUNT(*) AS curr,c.consumer_name as consumerName ,c.id as consumerId,
      IFNULL((SELECT COUNT(*) FROM EVENT AS ie
        LEFT JOIN \`user-mapping\` AS ium on ium.id = ie.user_mapping_id
        LEFT JOIN consumer AS ic ON ic.id = ium.consumer_id
            WHERE ic.id = c.id AND ie.issued_at > ? AND ie.issued_at <= ?
          GROUP BY ic.id),0) AS prev
    FROM EVENT as e
      LEFT JOIN \`user-mapping\` AS um on um.id = e.user_mapping_id
      LEFT JOIN consumer AS c ON c.id = um.consumer_id
      WHERE e.issued_at > ? AND e.issued_at <= ?
      GROUP BY c.id
      ORDER BY curr desc
    LIMIT 10`,
      [startDate, today, today, endDate],
    );
  }

  async getConsumerTotalRank() {
    return this.userRepository.query(
      `SELECT 
        COUNT(*) AS curr,
        c.consumer_name as consumerName ,
        c.id as consumerId
        FROM EVENT as e
          LEFT JOIN \`user-mapping\` AS um on um.id = e.user_mapping_id
          LEFT JOIN consumer AS c ON c.id = um.consumer_id
        GROUP BY c.id
        ORDER BY curr desc
      LIMIT 10`,
      [],
    );
  }
}
