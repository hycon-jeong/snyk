import {MigrationInterface, QueryRunner} from "typeorm";

export class addentitycolumn1649408311192 implements MigrationInterface {
    name = 'addentitycolumn1649408311192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`language_code\` varchar(16) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`callback_url\` varchar(500) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`redirect_url\` varchar(500) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`message_title\` varchar(500) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`event_type\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`image_url\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`image_url\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`image_url\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`image_url\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`event_type\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`message_title\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`redirect_url\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`callback_url\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`language_code\``);
    }

}
