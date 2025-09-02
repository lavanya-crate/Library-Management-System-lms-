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


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


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
    const sql = "SELECT * FROM categories WHERE category_id = ?";
    con.query(sql, [category_id], (err, data) => {
        if (err) {
            console.error("Error fetching category by ID:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json(data[0]);
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

    if (!category_name) {
        return res.status(400).json({ error: "Category name is required" });
    }

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
                return res.status(500).json({ message: "Failed to update category", details: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Category not found or no changes made." });
            }

            const fetchSql = "SELECT * FROM categories WHERE category_id = ?";
            con.query(fetchSql, [category_id], (fetchErr, fetchResults) => {
                if (fetchErr) {
                    console.error("Error fetching updated category:", fetchErr);
                    return res.status(200).json({ message: "Category updated successfully, but couldn't retrieve updated data." });
                }
                return res.status(200).json({ message: "Category updated successfully", updatedCategory: fetchResults[0] });
            });
        }
    );
});

app.delete('/deletecategory/:category_id', (req, res) => {
    const category_id = req.params.category_id;
    const sql = "DELETE FROM categories WHERE category_id = ?";
    con.query(sql, [category_id], (err, result) => {
        if (err) {
            console.error("Error deleting category:", err);
            return res.status(500).json({ message: "Failed to delete category", details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found or already deleted." });
        }
        return res.status(200).json({ message: "Category deleted successfully" });
    });
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
    const sql = "SELECT * FROM books WHERE book_id = ?";
    con.query(sql, [book_id], (err, data) => {
        if (err) {
            console.error("Error fetching book by ID:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(data[0]);
    });
});

app.post("/addbooks", (req, res) => {
    const { book_name, book_author, book_publisher, book_copies, book_category_id } = req.body;

    // Check for required fields
    if (!book_name || !book_category_id || book_copies == null) {  
        return res.status(400).json({ error: "Missing required fields: book_name, book_category_id, or book_copies" });
    }

    // Insert book into the books table
    const insertBookSql = `
        INSERT INTO books (book_name, book_author, book_publisher, book_copies, book_category_id)
        VALUES (?, ?, ?, ?, ?);
    `;

    con.query(insertBookSql, [book_name, book_author, book_publisher, book_copies, book_category_id], (err, result) => {
        if (err) {
            console.error("Error adding book:", err);
            return res.status(500).json({ error: "Failed to add book", details: err.message });
        }

        const newBookId = result.insertId;

        // Update total books count in categories table
        const updateCategorySql = `
            UPDATE categories
            SET category_total_books = category_total_books + ?
            WHERE category_id = ?;
        `;
        con.query(updateCategorySql, [book_copies, book_category_id], (updateErr, updateResult) => {
            if (updateErr) {
                console.error("Error updating category:", updateErr);
                return res.status(500).json({ error: "Failed to update category total books" });
            }

            // Fetch the newly added book
            const fetchSql = "SELECT * FROM books WHERE book_id = ?";
            con.query(fetchSql, [newBookId], (fetchErr, fetchResults) => {
                if (fetchErr) {
                    console.error("Error fetching added book:", fetchErr);
                    return res.status(201).json({ message: "Book added, but fetch failed." });
                }

                return res.status(201).json(fetchResults[0]); 
            });
        });
    });
});



app.put("/editbook/:book_id", (req, res) => {
    const book_id = req.params.book_id;
    const { book_name, book_author, book_publisher, book_copies, book_category_id } = req.body;

    if (!book_name || !book_category_id || book_copies == null) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    //  Get old book data
    con.query("SELECT book_copies, book_category_id FROM books WHERE book_id = ?", [book_id], (err, oldData) => {
        if (err || oldData.length === 0) {
            return res.status(404).json({ error: "Book not found" });
        }

        const oldCopies = oldData[0].book_copies;
        const oldCatId = oldData[0].book_category_id;

        //  Update the book
        const updateSql = `
            UPDATE books SET book_name=?, book_author=?, book_publisher=?, book_copies=?, book_category_id=?
            WHERE book_id=?`;
        con.query(updateSql, [book_name, book_author, book_publisher, book_copies, book_category_id, book_id], (err) => {
            if (err) return res.status(500).json({ error: "Failed to update book" });

            // Adjust category counts
            if (oldCatId !== book_category_id) {
                // Category changed
                con.query("UPDATE categories SET category_total_books = GREATEST(0, category_total_books - ?) WHERE category_id = ?", [oldCopies, oldCatId]);
                con.query("UPDATE categories SET category_total_books = category_total_books + ? WHERE category_id = ?", [book_copies, book_category_id]);
            } else if (book_copies !== oldCopies) {
                // Same category, copies changed
                const diff = book_copies - oldCopies;
                con.query("UPDATE categories SET category_total_books = category_total_books + ? WHERE category_id = ?", [diff, book_category_id]);
            }

            // Return updated book
            con.query("SELECT * FROM books WHERE book_id = ?", [book_id], (err, result) => {
                if (err) return res.status(500).json({ message: " fetch failed" });
                res.status(200).json(result[0]);
            });
        });
    });
});



app.delete('/deletebook/:book_id', (req, res) => {
    const book_id = req.params.book_id;

    //Get book data first
    con.query("SELECT book_copies, book_category_id FROM books WHERE book_id = ?", [book_id], (err, bookData) => {
        if (err || bookData.length === 0) {
            return res.status(404).json({ error: "Book not found or fetch failed" });
        }

        const { book_copies, book_category_id } = bookData[0];

        //Delete the book
        con.query("DELETE FROM books WHERE book_id = ?", [book_id], (err, result) => {
            if (err || result.affectedRows === 0) {
                return res.status(500).json({ error: "Failed to delete book" });
            }

            //Update category count if category exists
            if (book_category_id) {
                const updateSql = `
                    UPDATE categories
                    SET category_total_books = GREATEST(0, category_total_books - ?)
                    WHERE category_id = ?;
                `;
                con.query(updateSql, [book_copies, book_category_id], (err) => {
                    if (err) {
                        return res.status(500).json({ error: "Book deleted but category count update failed" });
                    }
                    return res.status(200).json({ message: "Book deleted and category updated" });
                });
            } else {
                // No category, just return success
                return res.status(200).json({ message: "Book deleted successfully" });
            }
        });
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



app.get("/books_with_categories", (req, res) => {
    const sql = `
        SELECT
            b.book_id,
            b.book_name,
            b.book_author,
            b.book_publisher,
            b.book_copies,
            b.book_category_id,
            c.category_name  
        FROM
            books AS b
        LEFT JOIN
            categories AS c ON b.book_category_id = c.category_id;
    `;
    con.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching books with categories:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        return res.status(200).json(results);
    });
});


app.post('/upload', upload.single('image'), (req, res) => {
    const bookId = req.body.book_id;
    const imageBuffer = req.file ? req.file.buffer : null; 

    if (!bookId || !imageBuffer) {
        return res.status(400).json({ error: "Book ID and image are required for upload." });
    }

    console.log(`Uploading image for book ID: ${bookId}`);

    const sql = "INSERT INTO browsebook (image, book_id) VALUES (?, ?)";
    con.query(sql, [imageBuffer, bookId], (err, result) => {
        if (err) {
            console.error("Error inserting image into browsebook:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: "Image already exists for this book ID. Consider updating instead." });
            }
            return res.status(500).json({ error: "Failed to upload image due to database error.", details: err.message });
        }
        console.log(`Image uploaded successfully for book ID: ${bookId}`);
        res.status(201).json({ message: "Image uploaded successfully", browse_id: result.insertId });
    });
});


app.get("/browseimage", (req, res) => {
    const sql = `
        SELECT 
            b.book_id,
            b.book_name,
            b.book_author,
            b.book_publisher,
            b.book_copies,
            b.book_category_id,    
            c.category_name,       
            bb.browse_id,         
            bb.image,             
            bb.borrow_date,       
            bb.return_due_date,    
            bb.fine                
        FROM books AS b
        LEFT JOIN browsebook AS bb ON b.book_id = bb.book_id
        LEFT JOIN categories AS c ON b.book_category_id = c.category_id;
    `;

    con.query(sql, (err, data) => {
        if (err) {
            console.error("Database error fetching browse image data:", err);
            return res.status(500).json({ error: "Database error fetching browse image data", details: err.message });
        }
        return res.status(200).json(data);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
