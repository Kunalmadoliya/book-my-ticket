import express from "express";
import pg from "pg";
import {dirname} from "path";
import {fileURLToPath} from "url";
import cors from "cors";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8080;

const pool = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5433/sql_class_2_db",
  ssl: process.env.DATABASE_URL ? {rejectUnauthorized: false} : false,
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

const app = express();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// GET ALL SEATS
app.get("/seats", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM seats ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to fetch seats"});
  }
});

// BOOK SEAT
app.put("/:id/:name", async (req, res) => {
  const {id, name} = req.params;
  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");

    const check = await conn.query(
      "SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE",
      [id],
    );

    if (check.rowCount === 0) {
      await conn.query("ROLLBACK");
      conn.release();
      return res.json({error: "Seat already booked"});
    }

    const update = await conn.query(
      "UPDATE seats SET isbooked = 1, name = $2 WHERE id = $1 RETURNING *",
      [id, name],
    );

    await conn.query("COMMIT");
    conn.release();

    res.json(update.rows[0]);
  } catch (err) {
    await conn.query("ROLLBACK");
    conn.release();
    console.error(err);
    res.status(500).json({error: "Booking failed"});
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
