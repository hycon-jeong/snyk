import {MigrationInterface, QueryRunner} from "typeorm";

export class categroyid1638324890710 implements MigrationInterface {
    name = 'categroyid1638324890710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_log\` CHANGE \`category\` \`category_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`category_id\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`category_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` CHANGE \`category_id\` \`category\` varchar(255) NULL`);
    }

}
