const express = require("express");
// const bcrypt = require("bcrypt");
const cors = require("cors");
const mysql = require("mysql");
const multer = require('multer');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lavanya@123",
    database: "library",
});

con.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database.");
});


//categories
app.get("/categories", (req, res) => {
    const sql = "SELECT * FROM categories";
    con.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching categories:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        return res.status(200).json(results);
    });
});

app.get("/categories/:category_id", (req, res) => {
    const category_id = req.params.category_id;
    const sql = "select * from categories where category_id=?";
    con.query(sql, [category_id], (err, data) => {
        if (err) return res.json("error");
        return res.json(data)
    });
});


app.post("/addcategories", (req, res) => {
    const { category_id, category_name, category_description, category_total_books, category_status } = req.body;

    const sql = `
        INSERT INTO categories 
        (category_id, category_name, category_description, category_total_books, category_status) 
        VALUES (?, ?, ?, ?, ?)
    `;

    con.query(
        sql,
        [category_id, category_name, category_description, category_total_books, category_status],
        (err, data) => {
            if (err) {
                console.error("Error inserting category:", err);
                return res.status(500).json({ error: "Database insertion failed" });
            }

            console.log("Inserted category:", data);
            return res.status(201).json({ message: "Category added successfully", data });
        }
    );
});


app.put('/editcategory/:category_id', (req, res) => {
    const category_id = req.params.category_id;
    const { category_name, category_description, category_total_books, category_status } = req.body;

    const sql = `
    UPDATE categories 
    SET 
      category_name = ?, 
      category_description = ?, 
      category_total_books = ?, 
      category_status = ? 
    WHERE category_id = ?
  `;

    con.query(
        sql,
        [category_name, category_description, category_total_books, category_status, category_id],
        (err, result) => {
            if (err) {
                console.error("Error updating category:", err);
                return res.status(500).json({ message: "Failed to update category" });
            }

            console.log("Updated category:", category_id);
            return res.status(200).json({ message: "Category updated successfully" });
        }
    );
});


app.delete("/deletecategory/:category_id", (req, res) => {
    const category_id = req.params.category_id;
    const sql = "DELETE from categories where category_id=?";
    con.query(sql, [category_id], (err, data) => {
        if (err) return res.json("error");
        console.log("delete category")
        return res.json(data);
    })
});
//categories ended


//Admin Register
app.post("/admin", async (req, res) => {
    const { admin_name, admin_email, password } = req.body;

    if (!admin_name || !admin_email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // const hashPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO admin (admin_name, admin_email, password) VALUES (?, ?, ?)';

        con.query(sql, [admin_name, admin_email, password], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }
            return res.status(201).json({ message: "Admin created successfully", adminId: result.insertId });
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Student Register
app.post("/student", async (req, res) => {
    const { student_name, student_email, password, department, year } = req.body;
    if (!student_name || !student_email || !password || !department || !year) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // const hashPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO student (student_name, student_email, password, department, year) values (?,?,?,?,?)";

        con.query(sql, [student_name, student_email, password, department, year], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }
            return res.status(201).json({ message: "Student created successfully" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

});


//login
app.post("/logincredentials", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    // Check in admin 
    const adminQuery = "SELECT * FROM admin WHERE admin_email = ? AND password = ?";
    con.query(adminQuery, [email, password], (adminErr, adminResults) => {
        if (adminErr) {
            console.error("Admin DB error:", adminErr);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (adminResults.length > 0) {
            const admin = adminResults[0];
            delete admin.password;
            return res.status(200).json({ message: "Login successful", user: admin, role: "admin" });
        }

        // Check in student 
        const studentQuery = "SELECT * FROM student WHERE student_email = ? AND password = ?";
        con.query(studentQuery, [email, password], (studentErr, studentResults) => {
            if (studentErr) {
                console.error("Student DB error:", studentErr);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (studentResults.length > 0) {
                const student = studentResults[0];
                delete student.password;
                return res.status(200).json({ message: "Login successful", user: student, role: "student" });
            } else {
                return res.status(401).json({ message: "Invalid email or password" });
            }
        });
    });
});


//books
app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books";
    con.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching books:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        return res.status(200).json(results);
    });
});

app.get("/books/:book_id", (req, res) => {
    const book_id = req.params.book_id;
    const sql = "select * from books where book_id=?";
    con.query(sql, [book_id], (err, data) => {
        if (err) return res.json("error");
        return res.json(data)
    });
});



app.post("/addbooks", (req, res) => {
    const { book_name, book_author, book_publisher, book_category, book_copies, category_id } = req.body;

    const sql = `
        INSERT INTO books(book_name, book_author, book_publisher, book_category, book_copies, category_id)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    con.query(
        sql,
        [book_name, book_author, book_publisher, book_category, book_copies, category_id],
        (err, data) => {
            if (err) {
                console.error("Error inserting books:", err);
                return res.status(500).json({ error: "Database insertion failed" });
            }
            console.log("Inserted books:", data);
            return res.status(201).json({ message: "Book added successfully", data });
        }
    );
});


app.put("/editbook/:book_id", (req, res) => {
    const book_id = req.params.book_id;
    const { book_name, book_author, book_publisher, book_category, book_copies, category_id } = req.body;

    const sql = `
    UPDATE books
    SET 
    book_name = ?,
     book_author = ?,
     book_publisher = ?, 
     book_category = ?, 
     book_copies = ?, 
     category_id = ?
      WHERE book_id = ?;
    `;

    con.query(
        sql,
        [book_name, book_author, book_publisher, book_category, book_copies, category_id, book_id],
        (err, result) => {
            if (err) {
                console.error("Error updating book:", err);
                return res.status(500).json({ message: "Failed to update Book" });
            }

            console.log("Updated book:", book_id);
            return res.status(200).json({ message: "Book updated successfully" });
        }
    )
});


app.delete("/deletebook/:book_id", (req, res) => {
    const book_id = req.params.book_id;
    const sql = "DELETE FROM books WHERE book_id = ?";
    con.query(sql, [book_id], (err, result) => {
        if (err) {
            console.error("Error deleting book:", err);
            return res.status(500).json({ error: "Failed to delete book" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    });
});


//Membership
app.get("/membership", (req, res) => {
    const sql = "SELECT * FROM membership";
    con.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching membership:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        return res.status(200).json(results);
    });
});


app.get("/membership/:member_id", (req, res) => {
    const member_id = req.params.member_id;
    const sql = "select * from membership where member_id=?";
    con.query(sql, [member_id], (err, data) => {
        if (err) return res.json("error");
        return res.json(data)
    });
});


app.post("/addmember", (req, res) => {
    const { member_name, member_email, member_phone, member_year, member_start_date } = req.body;

    const sql = `
        INSERT INTO membership(member_name, member_email, member_phone, member_year, member_start_date)
        VALUES (?, ?, ?, ?, ?);
    `;

    con.query(
        sql,
        [member_name, member_email, member_phone, member_year, member_start_date],
        (err, data) => {
            if (err) {
                console.error("Error inserting Membership:", err);
                return res.status(500).json({ error: "Database insertion failed" });
            }
            console.log("Inserted membership:", data);
            return res.status(201).json({ message: "Membership added successfully", data });
        }
    );
});


app.put("/editmember/:member_id", (req, res) => {
    const member_id = req.params.member_id;
    const {
        member_name,
        member_email,
        member_phone,
        member_year,
        member_start_date, 
    } = req.body;

   
    const formattedDate = new Date(member_start_date).toISOString().split('T')[0];

    const sql = `
        UPDATE membership
        SET 
            member_name = ?,
            member_email = ?,
            member_phone = ?, 
            member_year = ?, 
            member_start_date = ?
        WHERE member_id = ?;
    `;

    con.query(
        sql,
        [member_name, member_email, member_phone, member_year, formattedDate, member_id],
        (err, result) => {
            if (err) {
                console.error("Error updating membership:", err);
                return res.status(500).json({ message: "Failed to update Membership" });
            }

            console.log("Updated membership:", member_id);
            return res.status(200).json({ message: "Membership updated successfully" });
        }
    );
});



app.delete("/deletemember/:member_id", (req, res) => {
    const member_id = req.params.member_id;
    const sql = "DELETE FROM membership WHERE member_id = ?"; 
    con.query(sql, [member_id], (err, result) => {
        if (err) {
            console.error("Error deleting membership:", err);
            return res.status(500).json({ error: "Failed to delete membership" });
        }
        res.status(200).json({ message: "Membership deleted successfully" });
    });
});



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//browsebook upload image
app.post('/upload', upload.single('image'), (req, res) => {
  const bookId = req.body.book_id;
  const image = req.file.buffer;

  console.log(bookId+" bk id")

  const sql = "INSERT INTO browsebook (image, book_id) VALUES (?, ?)";
  con.query(sql, [image, bookId], (err, result) => {
    if (err) throw err;
    res.send("Image uploaded successfully");
  });
});



app.get("/browseimage", (req, res) => {
    const sql = `
        SELECT 
            browsebook.browse_id,
            browsebook.image,
            browsebook.borrow_date,
            browsebook.return_due_date,
            browsebook.fine,
            books.book_id,
            books.book_name,
            books.book_author,
            books.book_publisher,
            books.book_category,
            books.book_copies,
            books.category_id
        FROM browsebook
        JOIN books ON browsebook.book_id = books.book_id
    `;

    con.query(sql, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error", details: err });
        }
        return res.json(data);
    });
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
