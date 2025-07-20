'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TYPE priority_enum AS ENUM ('low', 'medium', 'high');
    `);
    await queryInterface.sequelize.query(`
      CREATE TYPE status_enum AS ENUM ('open', 'in_progress', 'closed');
    `);

    await queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    `);

    await queryInterface.createTable('tickets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      priority: {
        type: 'priority_enum',
        allowNull: false,
        defaultValue: 'low',
      },
      status: {
        type: 'status_enum',
        allowNull: false,
        defaultValue: 'open',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      modified_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_modified_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.modified_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER set_modified_timestamp
      BEFORE UPDATE ON tickets
      FOR EACH ROW
      EXECUTE PROCEDURE update_modified_column();
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tickets');
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS set_modified_timestamp ON tickets;`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_modified_column();`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS priority_enum;`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS status_enum;`);
  },
};
