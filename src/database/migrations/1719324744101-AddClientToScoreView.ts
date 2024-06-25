import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClientToScoreView1719324744101 implements MigrationInterface {
    name = 'AddClientToScoreView1719324744101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE VIEW \`client_to_score_view\` AS SELECT \`c\`.\`id\` AS \`id\`, \`c\`.\`salary\` AS \`c_salary\`, \`c\`.\`savings\` AS \`c_savings\`, (SELECT count(\`m\`.\`id\`) FROM \`messages\` \`m\` WHERE ( \`m\`.\`clientId\` = \`c\`.\`id\` ) AND ( \`m\`.\`deleted_at\` IS NULL )) AS \`total_messages\`, (SELECT count(\`m\`.\`id\`) FROM \`messages\` \`m\` WHERE ( \`m\`.\`sentAt\` >= DATE_SUB(NOW(), INTERVAL 30 DAY) AND \`m\`.\`clientId\` = \`c\`.\`id\` ) AND ( \`m\`.\`deleted_at\` IS NULL )) AS \`last_messages\`, (SELECT sum(\`d\`.\`amount\`) FROM \`debts\` \`d\` WHERE ( \`d\`.\`clientId\` = \`c\`.\`id\` ) AND ( \`d\`.\`deleted_at\` IS NULL )) AS \`total_debts\`, (SELECT count(1) FROM \`debts\` \`d\` WHERE ( \`d\`.\`clientId\` = \`c\`.\`id\` ) AND ( \`d\`.\`deleted_at\` IS NULL )) AS \`count_debts\` FROM \`clients\` \`c\` WHERE \`c\`.\`deleted_at\` IS NULL`);
        await queryRunner.query(`INSERT INTO \`lidz_scoring\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`, ["lidz_scoring","VIEW","client_to_score_view","SELECT `c`.`id` AS `id`, `c`.`salary` AS `c_salary`, `c`.`savings` AS `c_savings`, (SELECT count(`m`.`id`) FROM `messages` `m` WHERE ( `m`.`clientId` = `c`.`id` ) AND ( `m`.`deleted_at` IS NULL )) AS `total_messages`, (SELECT count(`m`.`id`) FROM `messages` `m` WHERE ( `m`.`sentAt` >= DATE_SUB(NOW(), INTERVAL 30 DAY) AND `m`.`clientId` = `c`.`id` ) AND ( `m`.`deleted_at` IS NULL )) AS `last_messages`, (SELECT sum(`d`.`amount`) FROM `debts` `d` WHERE ( `d`.`clientId` = `c`.`id` ) AND ( `d`.`deleted_at` IS NULL )) AS `total_debts`, (SELECT count(1) FROM `debts` `d` WHERE ( `d`.`clientId` = `c`.`id` ) AND ( `d`.`deleted_at` IS NULL )) AS `count_debts` FROM `clients` `c` WHERE `c`.`deleted_at` IS NULL"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM \`lidz_scoring\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`, ["VIEW","client_to_score_view","lidz_scoring"]);
        await queryRunner.query(`DROP VIEW \`client_to_score_view\``);
    }

}
