import { pool } from "../../config/db";

const postBookings = async (
  payload: Record<string, unknown>,
  userId: string
) => {
  const { vehicleId, rent_start_date, rent_end_date } = payload;
  console.log("post: ", userId);

  const availableVehicle = await pool.query(
    `SELECT * FROM vehicles WHERE id=$1 AND availability_status='available'`,
    [vehicleId]
  );

  if (availableVehicle.rows.length === 0) {
    throw new Error("Vehicle is not available");
  }

  const dailyRate = availableVehicle.rows[0].daily_rent_price;

  const startDate: Date = new Date(rent_start_date as string);
  const endDate: Date = new Date(rent_end_date as string);

  const duration = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const totalPrice = dailyRate * duration;

  const result = await pool.query(
    `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, 'active') RETURNING *`,
    [userId, vehicleId, rent_start_date, rent_end_date, totalPrice]
  );
  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicleId]
  );
  return result;
};

const getBookings = async (userId: number, userRole: string) => {
  let result;

  if (userRole === "admin") {
    result = await pool.query(`
    SELECT * FROM bookings
    `);
  } else {
    result = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [
      userId,
    ]);
  }
  return result;
};

export const bookingsServices = {
  postBookings,
  getBookings,
};
