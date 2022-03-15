import {MigrationInterface, QueryRunner} from "typeorm";

export class changuserid1647337904844 implements MigrationInterface {
    name = 'changuserid1647337904844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_key\` \`user_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`user_id\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`user_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_id\` \`user_key\` varchar(255) NOT NULL`);
    }

}
