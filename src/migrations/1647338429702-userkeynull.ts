import {MigrationInterface, QueryRunner} from "typeorm";

export class userkeynull1647338429702 implements MigrationInterface {
    name = 'userkeynull1647338429702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_key\` \`user_key\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_key\` \`user_key\` varchar(255) NOT NULL`);
    }

}
