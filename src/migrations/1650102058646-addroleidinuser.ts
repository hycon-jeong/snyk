import {MigrationInterface, QueryRunner} from "typeorm";

export class addroleidinuser1650102058646 implements MigrationInterface {
    name = 'addroleidinuser1650102058646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role_id\` enum ('USER', 'ADMIN', 'PROVIDER', 'MANAGER') NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role_id\` enum ('USER', 'ADMIN', 'PROVIDER', 'MANAGER') NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role_id\` \`role\` enum ('USER', 'ADMIN', 'PROVIDER', 'MANAGER') NOT NULL DEFAULT 'USER'`);
    }

}
