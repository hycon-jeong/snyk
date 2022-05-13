import {MigrationInterface, QueryRunner} from "typeorm";

export class adddatecolumn1652407329701 implements MigrationInterface {
    name = 'adddatecolumn1652407329701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`provider\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`provider\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`provider\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`created_at\``);
    }

}
