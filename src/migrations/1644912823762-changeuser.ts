import {MigrationInterface, QueryRunner} from "typeorm";

export class changeuser1644912823762 implements MigrationInterface {
    name = 'changeuser1644912823762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`provider_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user-mapping\` ADD \`tv_device_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user-mapping\` ADD CONSTRAINT \`FK_858d5082d32df2948b8c184a8ec\` FOREIGN KEY (\`tv_device_id\`) REFERENCES \`tv_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user-mapping\` DROP FOREIGN KEY \`FK_858d5082d32df2948b8c184a8ec\``);
        await queryRunner.query(`ALTER TABLE \`user-mapping\` DROP COLUMN \`tv_device_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`provider_id\``);
    }

}
