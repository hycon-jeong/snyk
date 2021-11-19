import {MigrationInterface, QueryRunner} from "typeorm";

export class userMapping1637307466358 implements MigrationInterface {
    name = 'userMapping1637307466358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e6358bd3df1b2874637dca92bcf\``);
        // await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`user_id\` \`user_mapping_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_5909c68aaa21522907e8b9780d6\` FOREIGN KEY (\`user_mapping_id\`) REFERENCES \`user-mapping\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_5909c68aaa21522907e8b9780d6\``);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`user_mapping_id\` \`user_id\` int NOT NULL`);
        // await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e6358bd3df1b2874637dca92bcf\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
