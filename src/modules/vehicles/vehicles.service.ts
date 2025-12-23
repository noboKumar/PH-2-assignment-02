import { pool } from "../../config/db";

const postVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

const getSingleVehicle = async (vehicleId: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);
  return result;
};

const updateVehicle = async (
  payload: Record<string, unknown>,
  vehicleId: string
) => {
  const {
    vehicle_name = null,
    type = null,
    registration_number = null,
    daily_rent_price = null,
    availability_status = null,
  } = payload;
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name= COALESCE($1, vehicle_name), type= COALESCE($2, type), registration_number=COALESCE($3, registration_number), daily_rent_price=COALESCE($4, daily_rent_price), availability_status=COALESCE($5, availability_status) WHERE  id=$6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      vehicleId,
    ]
  );
  return result;
};

const deleteVehicle = async (vehicleId: string) => {
  const result = await pool.query(
    `DELETE FROM vehicles WHERE id=$1 AND availability_status=$2 RETURNING *`,
    [vehicleId, "available"]
  );
  return result;
};

export const vehiclesServices = {
  postVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
