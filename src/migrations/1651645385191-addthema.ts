import {MigrationInterface, QueryRunner} from "typeorm";

export class addthema1651645385191 implements MigrationInterface {
    name = 'addthema1651645385191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider\` ADD \`thema\` enum ('LIGHT', 'DARK', 'CUSTOM') NOT NULL DEFAULT 'DARK'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider\` DROP COLUMN \`thema\``);
    }

}
