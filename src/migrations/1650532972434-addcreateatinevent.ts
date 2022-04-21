import {MigrationInterface, QueryRunner} from "typeorm";

export class addcreateatinevent1650532972434 implements MigrationInterface {
    name = 'addcreateatinevent1650532972434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`created_at\``);
    }

}
