import { MigrationInterface, QueryRunner } from 'typeorm';

export class eventstatus1637054187951 implements MigrationInterface {
  name = 'eventstatus1637054187951';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`provider\` ADD \`provider_background_url\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`provider\` ADD \`provider_logo_url\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`consumer\` ADD \`consumer_image_url\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`status\` \`status\` enum ('SENDING', 'COMPLETE', 'FAIL') NOT NULL DEFAULT 'SENDING'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`status\` \`status\` enum ('SENDING', 'COMPLETE') NOT NULL DEFAULT 'SENDING'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`consumer\` DROP COLUMN \`consumer_image_url\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`provider\` DROP COLUMN \`provider_logo_url\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`provider\` DROP COLUMN \`provider_background_url\``,
    );
  }
}
