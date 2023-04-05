import { mutation } from "./_generated/server";

export default mutation(async ({ db }, {id, name, restaurant_name, date, time}) => {
  await db.delete(id);
  const res = { date, name, restaurant_name, time };
  console.log("here");
  console.log(res);
  await db.insert("booked", res);
});
