const Purchase = require("../models/purchase");
const moment = require("moment-timezone");

const ubdateSuscriptcion = async () => {
  const todayMoment = moment();
  const purchases = await Purchase.find({ available: true });
  purchases.forEach(async (purchase) => {
    const createdAt = moment(purchase.createdAt);
    const daysDifference = todayMoment.diff(createdAt, "days");
    if (daysDifference > 30) {
      await Purchase.updateOne(
        { _id: purchase._id },
        { $set: { available: false } }
      );
    }
  });
  console.log(`CronJob realizado dia y horario : ${todayMoment.tz('America/Argentina/Buenos_Aires').format("DD/MM/YYYY, h:mm a")}`);
};

module.exports = { ubdateSuscriptcion };
