import {MigrationInterface, QueryRunner} from "typeorm";

export class changeuserRole1649394598566 implements MigrationInterface {
    name = 'changeuserRole1649394598566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('USER', 'ADMIN', 'PROVIDER') NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER'`);
    }

}
