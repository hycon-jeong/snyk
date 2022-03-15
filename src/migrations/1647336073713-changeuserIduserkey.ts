import {MigrationInterface, QueryRunner} from "typeorm";

export class changeuserIduserkey1647336073713 implements MigrationInterface {
    name = 'changeuserIduserkey1647336073713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_id\` \`user_key\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_key\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`user_key\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_key\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`user_key\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_key\` \`user_id\` varchar(255) NOT NULL`);
    }

}
