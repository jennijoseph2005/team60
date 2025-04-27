require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const xlsx = require("xlsx");
const Faculty = require("./models/Faculty");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/admin_mitk";

// Connect MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("📡 MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ======================= AUTH ROUTES =======================

// Register (Admin Setup)
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, "your_secret_key", { expiresIn: "1h" });

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Middleware: Authenticate JWT Token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// ======================= FACULTY ROUTES =======================

app.get("/faculty", async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.json({ data: facultyList });
  } catch (err) {
    res.status(500).json({ message: "Error fetching faculty data" });
  }
});



// ======================= REALTIME SYNC =======================

const EXCEL_FILE = "test.xlsx";
const POLL_INTERVAL = 10000;

const mapRowToFaculty = (row) => ({
  s_no: row["S.No."],
  faculty_unique_id: row["Faculty Unique ID"],
  title: row["Title"],
  middle_name: row["Middle Name"],
  first_name: row["First Name"],
  last_name: row["Last Name"],
  pan: row["PAN"],
  pan_first_name: row["PAN First Name"],
  pan_last_name: row["PAN Last Name"],
  current_age: row["Current Age"],
  email_address: row["Email Address"],
  designation: row["Designation"],
  department: row["Department"],
  course: row["Course"],
  gender: row["Gender"],
});

const readExcel = () => {
  const workbook = xlsx.readFile(EXCEL_FILE);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  return data;
};

const upsertFaculty = async (facultyData) => {
  if (
    !facultyData.faculty_unique_id &&
    !facultyData.email_address &&
    !facultyData.pan
  ) return;

  await Faculty.findOneAndUpdate(
    {
      $or: [
        { faculty_unique_id: facultyData.faculty_unique_id },
        { email_address: facultyData.email_address },
        { pan: facultyData.pan }
      ]
    },
    { $set: facultyData },
    { upsert: true, new: true }
  );
};



const syncExcelToMongo = async () => {
  try {
    const rows = readExcel();
    for (const row of rows) {
      const normalized = mapRowToFaculty(row);
      await upsertFaculty(normalized);
    }
    console.log(`✅ Synced ${rows.length} records @ ${new Date().toLocaleTimeString()}`);
  } catch (error) {
    console.error("❌ Sync error:", error.message);
  }
};

setInterval(syncExcelToMongo, POLL_INTERVAL);
syncExcelToMongo(); // Initial sync

// ======================= START SERVER =======================
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
