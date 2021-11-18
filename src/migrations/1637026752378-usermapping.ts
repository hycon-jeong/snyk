import { MigrationInterface, QueryRunner } from 'typeorm';

export class usermapping1637026752378 implements MigrationInterface {
  name = 'usermapping1637026752378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` DROP COLUMN \`mapping_createAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` DROP COLUMN \`mapping_updateat\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` DROP FOREIGN KEY \`FK_5a18d61f2a9375874ddebfea25a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` DROP FOREIGN KEY \`FK_3f71299c42039791a348dd32514\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` DROP FOREIGN KEY \`FK_6cd2207807826603f12fede45de\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` CHANGE \`user_id\` \`user_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` CHANGE \`consumer_id\` \`consumer_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` CHANGE \`provider_id\` \`provider_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` ADD CONSTRAINT \`FK_5a18d61f2a9375874ddebfea25a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` ADD CONSTRAINT \`FK_3f71299c42039791a348dd32514\` FOREIGN KEY (\`consumer_id\`) REFERENCES \`consumer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` ADD CONSTRAINT \`FK_6cd2207807826603f12fede45de\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` DROP FOREIGN KEY \`FK_6cd2207807826603f12fede45de\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` DROP FOREIGN KEY \`FK_3f71299c42039791a348dd32514\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` DROP FOREIGN KEY \`FK_5a18d61f2a9375874ddebfea25a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` CHANGE \`provider_id\` \`provider_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` CHANGE \`consumer_id\` \`consumer_id\` int NULL COMMENT 'Db generic id'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` CHANGE \`user_id\` \`user_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` ADD CONSTRAINT \`FK_6cd2207807826603f12fede45de\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` ADD CONSTRAINT \`FK_3f71299c42039791a348dd32514\` FOREIGN KEY (\`consumer_id\`) REFERENCES \`consumer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` ADD CONSTRAINT \`FK_5a18d61f2a9375874ddebfea25a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` ADD \`mapping_updateat\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-mapping\` ADD \`mapping_createAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }
}
