import { MigrationInterface, QueryRunner } from 'typeorm';

export class addnullable1652430190728 implements MigrationInterface {
  name = 'addnullable1652430190728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`log_action_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`parent_id\` int NULL, \`name\` varchar(255) NULL, \`code\` varchar(255) NULL, \`status\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event_log\` DROP COLUMN \`reception_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`event_log\` DROP COLUMN \`transmission_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_log\` ADD \`log_type_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event_log\` ADD  \`log_type_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_log\` ADD  \`log_type_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`log_action_type\` ADD CONSTRAINT \`FK_9899b6a58b1f622d9ae50aa5563\` FOREIGN KEY (\`parent_id\`) REFERENCES \`log_action_type\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_log\` ADD CONSTRAINT \`FK_3447e3cc096b09ece7cf25eb3a2\` FOREIGN KEY (\`log_type_id\`) REFERENCES \`log_action_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event_log\` ADD CONSTRAINT \`FK_988fdfd8750b790280378ddf3d8\` FOREIGN KEY (\`log_type_id\`) REFERENCES \`log_action_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_log\` ADD CONSTRAINT \`FK_5d904f6a7b80c4e75e9a3649dcf\` FOREIGN KEY (\`log_type_id\`) REFERENCES \`log_action_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_log\` DROP FOREIGN KEY \`FK_5d904f6a7b80c4e75e9a3649dcf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`event_log\` DROP FOREIGN KEY \`FK_988fdfd8750b790280378ddf3d8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_log\` DROP FOREIGN KEY \`FK_3447e3cc096b09ece7cf25eb3a2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`log_action_type\` DROP FOREIGN KEY \`FK_9899b6a58b1f622d9ae50aa5563\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_log\` DROP \`log_type_id\` \`log_type_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event_log\` DROP \`log_type_id\` \`log_type_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_log\` DROP \`log_type_id\` \`log_type_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event_log\` ADD \`transmission_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event_log\` ADD \`reception_at\` datetime NULL`,
    );
    await queryRunner.query(`DROP TABLE \`log_action_type\``);
  }
}
