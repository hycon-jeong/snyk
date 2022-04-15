import {MigrationInterface, QueryRunner} from "typeorm";

export class deletestatus1650013732524 implements MigrationInterface {
    name = 'deletestatus1650013732524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`transmission_at\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`transmission_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`transmission_at\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`transmission_at\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`status\` varchar(45) NULL`);
    }

}
