import {MigrationInterface, QueryRunner} from "typeorm";

export class changecolumnuserlog1649923220821 implements MigrationInterface {
    name = 'changecolumnuserlog1649923220821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD \`action_message\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD \`action_data\` varchar(2000) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP COLUMN \`action_data\``);
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP COLUMN \`action_message\``);
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD \`message\` varchar(2000) NULL`);
    }

}
