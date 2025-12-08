import { pool } from "../../config/db";

const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const updateUser = async (
  userId: string,
  payload: Record<string, unknown>,
  userRole: string,
  loggedInUserId: number
) => {
  const { name, email, password, phone, role } = payload;
  let result;

  if (userRole !== "admin" && payload.role) {
    throw new Error("Access denied. Customers cannot change their role.");
  }

  if (userRole === "admin") {
    result = await pool.query(
      `UPDATE users SET name=$1, email=$2, password=$3, phone=$4, role=$5 WHERE id=$6 RETURNING *`,
      [name, email, password, phone, role, userId]
    );
  } else if (parseInt(userId) === loggedInUserId) {
    result = await pool.query(
      `UPDATE users SET name=$1, email=$2, password=$3, phone=$4 WHERE id=$5 RETURNING *`,
      [name, email, password, phone, userId]
    );
  }
  return result;
};

export const userServices = {
  getUser,
  updateUser,
};
