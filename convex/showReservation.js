import { query } from "./_generated/server";

export default query(async ({ db }, {num_people}) => {
  if (num_people === undefined) {
    num_people =0
  }
  return await db.query("avail_reservations").filter(q => q.gte(q.field("max_people"), num_people)).collect();
});
