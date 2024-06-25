import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClientToFollowUpView1719277502653 implements MigrationInterface {
    name = 'AddClientToFollowUpView1719277502653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE VIEW \`client_to_do_follow_up_view\` AS SELECT \`c\`.\`id\`, \`c\`.\`name\`, \`c\`.\`rut\`, \`c\`.\`salary\`, \`c\`.\`savings\`, MAX(\`m\`.\`sentAt\`) AS \`date\` FROM \`clients\` \`c\` LEFT JOIN \`messages\` \`m\` ON  \`c\`.\`id\` = m.clientid AND \`m\`.\`deleted_at\` IS NULL WHERE \`c\`.\`deleted_at\` IS NULL GROUP BY \`c\`.\`id\`, \`c\`.\`name\`, \`c\`.\`rut\`, \`c\`.\`salary\`, \`c\`.\`savings\`, \`m\`.\`clientId\``);
        await queryRunner.query(`INSERT INTO \`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`, ["lidz_scoring","VIEW","client_to_do_follow_up_view","SELECT `c`.`id`, `c`.`name`, `c`.`rut`, `c`.`salary`, `c`.`savings`, MAX(`m`.`sentAt`) AS `date` FROM `clients` `c` LEFT JOIN `messages` `m` ON  `c`.`id` = m.clientid AND `m`.`deleted_at` IS NULL WHERE `c`.`deleted_at` IS NULL GROUP BY `c`.`id`, `c`.`name`, `c`.`rut`, `c`.`salary`, `c`.`savings`, `m`.`clientId`"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM \`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`, ["VIEW","client_to_do_follow_up_view","lidz_scoring"]);
        await queryRunner.query(`DROP VIEW \`client_to_do_follow_up_view\``);
    }

}
