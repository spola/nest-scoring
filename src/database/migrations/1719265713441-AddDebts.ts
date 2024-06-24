import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDebts1719265713441 implements MigrationInterface {
    name = 'AddDebts1719265713441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`debts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`institution\` varchar(100) NOT NULL, \`amount\` int NOT NULL, \`dueDate\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`version\` int NOT NULL, \`clientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`debts\` ADD CONSTRAINT \`FK_d8ee440220d45a94bf1238b48a0\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`debts\` DROP FOREIGN KEY \`FK_d8ee440220d45a94bf1238b48a0\``);
        await queryRunner.query(`DROP TABLE \`debts\``);
    }

}
