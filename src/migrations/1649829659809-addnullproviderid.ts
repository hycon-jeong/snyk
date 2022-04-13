import {MigrationInterface, QueryRunner} from "typeorm";

export class addnullproviderid1649829659809 implements MigrationInterface {
    name = 'addnullproviderid1649829659809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user-authority-mapping\` DROP FOREIGN KEY \`FK_241de6df6a5ae7767ba276e3732\``);
        await queryRunner.query(`ALTER TABLE \`user-authority-mapping\` CHANGE \`provider_id\` \`provider_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user-authority-mapping\` ADD CONSTRAINT \`FK_241de6df6a5ae7767ba276e3732\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user-authority-mapping\` DROP FOREIGN KEY \`FK_241de6df6a5ae7767ba276e3732\``);
        await queryRunner.query(`ALTER TABLE \`user-authority-mapping\` CHANGE \`provider_id\` \`provider_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user-authority-mapping\` ADD CONSTRAINT \`FK_241de6df6a5ae7767ba276e3732\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
