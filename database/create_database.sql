CREATE TABLE IF NOT EXISTS state (
    code VARCHAR(2) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS address (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code INTEGER NOT NULL,
    FOREIGN KEY (state) REFERENCES state(code)
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
    dob DATE,
    FOREIGN KEY (address_id) REFERENCES address(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS teachers (
    teacher_id INTEGER PRIMARY KEY,
    salary REAL,
    FOREIGN KEY (teacher_id) REFERENCES person(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    track_id INTEGER,
    FOREIGN KEY (id) REFERENCES person(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (track_id) REFERENCES degree_track(track_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY,
    code_type VARCHAR(3),
    code_number INTEGER,
    description TEXT,
    season VARCHAR(2)
);

CREATE TABLE IF NOT EXISTS derived_courses(
    course_id INTEGER PRIMARY KEY,
    teacher_id INTEGER,
    location VARCHAR,
    year INT,
    capacity TYPE,
    start_time TYPE,
    end_time TYPE,
    is_active BOOLEAN,
    FOREIGN KEY (course_id) REFERENCES courses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS course_requirements (
    id INTEGER PRIMARY KEY,
    course_id INTEGER NOT NULL,
    pre_req_id INTEGER NOT NULL,
    gpa_minimum REAL,
    FOREIGN KEY (course_id) REFERENCES courses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (pre_req_id) REFERENCES courses(id)
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
    FOREIGN KEY (course_id) REFERENCES courses(id)
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
    FOREIGN KEY (course_id) REFERENCES courses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS waiting (
    student_id INTEGER NOT NULL,
    derived_course_id INTEGER NOT NULL,
    PRIMARY KEY (student_id, derived_course_id),
    FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (derived_course_id) REFERENCES courses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS completed (
    student_id INTEGER NOT NULL,
    derived_course_id INTEGER NOT NULL,
    gpa REAL NOT NULL,
    PRIMARY KEY (student_id, derived_course_id),
    FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (derived_course_id) REFERENCES courses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS degree_track (
    track_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL,
    gpa_minimum REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS degree_track_requirements (
    track_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    gpa_minimum REAL,
    PRIMARY KEY (track_id, course_id),
    FOREIGN KEY (track_id) REFERENCES degree_track(track_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS teacher_users (
    teacher_id INTEGER NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    session_id VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS student_users (
    student_id INTEGER NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    session_id VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS history(
	student_id INTEGER NOT NULL, --Cannot be primary or unique. Need to support multiple entries of the same student
	course_id INTEGER NOT NULL,
	confirmation_number INTEGER NOT NULL PRIMARY KEY,
	date_time DATE NOT NULL,
	action_type VARCHAR(255)
);