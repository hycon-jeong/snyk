import { MigrationInterface, QueryRunner } from 'typeorm';

export class changefcmtoken1651552485509 implements MigrationInterface {
  name = 'changefcmtoken1651552485509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`fcm_tokens\` ADD CONSTRAINT \`FK_9fd867cabc75028a5625ce7b24c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`fcm_tokens\` DROP FOREIGN KEY \`FK_9fd867cabc75028a5625ce7b24c\``,
    );
  }
}
