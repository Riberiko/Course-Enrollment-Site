CREATE TABLE IF NOT EXISTS state (
    code VARCHAR(2) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS address (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state_code VARCHAR(2) NOT NULL,
    zipcode INTEGER NOT NULL,
    FOREIGN KEY (state_code) REFERENCES state(code)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    middle_name VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    phone_number INTEGER,
    address_id INTEGER,
    FOREIGN KEY (address_id) REFERENCES address(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY,
    salary REAL,
    FOREIGN KEY (id) REFERENCES person(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    track_id INTEGER,
    FOREIGN KEY (id) REFERENCES person(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (track_id) REFERENCES degree_track(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS course (
    id INTEGER PRIMARY KEY,
    code_type VARCHAR(3),
    code_number INTEGER,
    teacher_id INTEGER,
    description TEXT,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    location VARCHAR(20),
    season VARCHAR(1),
    year INTEGER,
    capacity INTEGER NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    confirmation_number VARCHAR(50) NOT NULL,
    datetime DATETIME NOT NULL,
    action TEXT CHECK(action IN ('enroll', 'waiting', 'drop')) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS active_courses (
    course_id INTEGER PRIMARY KEY,
    FOREIGN KEY (course_id) REFERENCES course(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS course_requirements (
    course_id INTEGER NOT NULL,
    pre_req_id INTEGER NOT NULL,
    gpa_minimum REAL,
    PRIMARY KEY (course_id, pre_req_id),
    FOREIGN KEY (course_id) REFERENCES course(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (pre_req_id) REFERENCES course(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS enrolled (
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS dropped (
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    reason TEXT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS waiting (
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS completed (
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    gpa REAL NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS degree_track (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL,
    gpa_minimum REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS degree_track_requirements (
    track_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    gpa_minimum REAL,
    PRIMARY KEY (track_id, course_id),
    FOREIGN KEY (track_id) REFERENCES degree_track(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS teacher_users (
    teacher_id INTEGER NOT NULL PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    session_id VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS student_users (
    student_id INTEGER NOT NULL PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    session_id VARCHAR(255)
);