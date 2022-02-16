import {MigrationInterface, QueryRunner} from "typeorm";

export class changetimestamp1644978303353 implements MigrationInterface {
    name = 'changetimestamp1644978303353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tv_cert_code\` DROP COLUMN \`expire_dt\``);
        await queryRunner.query(`ALTER TABLE \`tv_cert_code\` ADD \`expire_dt\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tv_cert_code\` DROP COLUMN \`expire_dt\``);
        await queryRunner.query(`ALTER TABLE \`tv_cert_code\` ADD \`expire_dt\` datetime NULL`);
    }

}
