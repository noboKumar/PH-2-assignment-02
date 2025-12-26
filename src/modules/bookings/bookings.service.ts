import { pool } from "../../config/db";

const postBookings = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const availableVehicle = await pool.query(
    `SELECT * FROM vehicles WHERE id=$1 AND availability_status='available'`,
    [vehicle_id]
  );

  if (availableVehicle.rows.length === 0) {
    throw new Error("Vehicle is not available");
  }

  const vehicleInfo = availableVehicle.rows[0];
  const vehicleName = vehicleInfo.vehicle_name;
  const dailyRate = vehicleInfo.daily_rent_price;

  const startDate: Date = new Date(rent_start_date as string);
  const endDate: Date = new Date(rent_end_date as string);

  const duration = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const totalPrice = dailyRate * duration;

  const result = await pool.query(
    `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5,'active') RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
  );
  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );
  const newBooking = result.rows[0];
  return {
    ...newBooking,
    vehicle: {
      vehicle_name: vehicleName,
      daily_rent_price: dailyRate,
    },
  };
};

const getBookings = async (userId: number, userRole: string) => {
  let bookings;
  let result;
  if (userRole === "admin") {
    bookings = await pool.query(`
        SELECT 
        b.id,
        b.customer_id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,

        u.name AS customer_name,
        u.email AS customer_email,

        v.vehicle_name,
        v.registration_number

      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id
    `);

    result = bookings.rows.map((row) => ({
      id: row.id,
      customer_id: row.customer_id,
      vehicle_id: row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: row.total_price,
      status: row.status,
      customer: {
        name: row.customer_name,
        email: row.customer_email,
      },
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
      },
    }));
  } else {
    bookings = await pool.query(
      `SELECT 
        b.id,
        b.customer_id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,

        u.name AS customer_name,
        u.email AS customer_email,

        v.vehicle_name,
        v.registration_number,
        v.type

      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id
      WHERE b.customer_id = $1`,
      [userId]
    );

    result = bookings.rows.map((row) => ({
      id: row.id,
      customer_id: row.customer_id,
      vehicle_id: row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: row.total_price,
      status: row.status,
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
        type: row.type,
      },
    }));
  }

  return result;
};

const updateBooking = async (
  bookingId: string,
  userRole: string,
  userId: number,
  payload: Record<string, unknown>
) => {
  const { status } = payload;

  const bookingData = await pool.query(`SELECT * FROM bookings`);
  const booking = bookingData.rows[0];

  if (userRole === "customer" && status === "cancelled") {
    if (booking.customer_id !== userId) {
      throw new Error("not your booking");
    }

    const today = new Date();
    const startDate = new Date(booking.rent_start_date);

    if (today >= startDate) {
      throw new Error("Can't update after start date");
    }

    const result = await pool.query(
      `UPDATE bookings SET  status='cancelled' WHERE id=$1 RETURNING *`,
      [bookingId]
    );
    return { message: "Booking Cancelled", data: result.rows[0] };
  }

  if (userRole === "admin" && status === "returned") {
    const result = await pool.query(
      `UPDATE bookings SET status='returned' WHERE id=$1`,
      [bookingId]
    );
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );

    const vehicleData = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
      booking.vehicle_id,
    ]);
    return {
      success: true,
      message: "Booking marked as returned. Vehicle is now available",
      data: {
        ...vehicleData.rows[0],
        vehicle: {
          availability_status: vehicleData.rows[0].availability_status,
        },
      },
    };
  }
};

export const bookingsServices = {
  postBookings,
  getBookings,
  updateBooking,
};
