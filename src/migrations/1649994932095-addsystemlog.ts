import {MigrationInterface, QueryRunner} from "typeorm";

export class addsystemlog1649994932095 implements MigrationInterface {
    name = 'addsystemlog1649994932095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`system_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`consumer_id\` int NULL, \`provider_id\` int NULL, \`user_id\` int NULL, \`action_message\` varchar(255) NULL, \`action_data\` varchar(2000) NULL, \`date_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`event_type\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`consumer_code\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`provider_code\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`action_message\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`action_data\` varchar(2000) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`date_at\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`date_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('USER', 'ADMIN', 'PROVIDER', 'MANAGER') NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE \`system_log\` ADD CONSTRAINT \`FK_809bb92733d24a97b7d54e97038\` FOREIGN KEY (\`consumer_id\`) REFERENCES \`consumer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`system_log\` ADD CONSTRAINT \`FK_921cb0d00c60680270d0fa71733\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`system_log\` ADD CONSTRAINT \`FK_f86a6c7be94f72fc8211a11b400\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`system_log\` DROP FOREIGN KEY \`FK_f86a6c7be94f72fc8211a11b400\``);
        await queryRunner.query(`ALTER TABLE \`system_log\` DROP FOREIGN KEY \`FK_921cb0d00c60680270d0fa71733\``);
        await queryRunner.query(`ALTER TABLE \`system_log\` DROP FOREIGN KEY \`FK_809bb92733d24a97b7d54e97038\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('USER', 'ADMIN', 'PROVIDER') NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`date_at\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`date_at\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`action_data\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`action_message\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`provider_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`category_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`message\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`consumer_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`event_type\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`system_log\``);
    }

}
