const pool = require("../db/connection");

const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM employees ORDER BY id DESC"
    );

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch employees"
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, email, department } = req.body;

    if (!name || !email || !department) {
      return res.status(400).json({
        message: "Name, email and department are required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO employees
       (name, email, department)
       VALUES (?, ?, ?)`,
      [name, email, department]
    );

    res.status(201).json({
      message: "Employee created successfully",
      employeeId: result.insertId
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create employee"
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee
};