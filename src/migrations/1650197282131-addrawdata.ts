import {MigrationInterface, QueryRunner} from "typeorm";

export class addrawdata1650197282131 implements MigrationInterface {
    name = 'addrawdata1650197282131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`system_log\` ADD \`raw_data\` varchar(4096) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`status\` \`status\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`system_log\` DROP COLUMN \`raw_data\``);
    }

}
