import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'altrp_customizers'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.dropUnique(['name'])
      table.index('name')

    })
  }

  public async down () {
  }
}
