const Services = [
  {
    title: 'Mão + Pé',
    description: 'Fique linda sem esforço!',
    price_default: 60,
    execution_time_default: 60,
    icon: '',
  },
  {
    title: 'Sobrancelha',
    description: 'Vamos tirar a taturana',
    price_default: 20,
    execution_time_default: 30,
    icon: '',
  },
  {
    title: 'Corte Feminino',
    description: 'Entra cabeluda e sai careca!',
    price_default: 100,
    execution_time_default: 60,
    icon: '',
  },
  {
    title: 'Corte Masculino',
    description: 'Careca cabeludo',
    price_default: 25,
    execution_time_default: 30,
    icon: '',
  },
]

module.exports = {
  async up(db, client) {
    db.collection('services').create(Services)
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    db.collection('services').delete(Services)
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
}
