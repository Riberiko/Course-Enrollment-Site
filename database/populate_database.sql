-- State
INSERT INTO state (code, name) VALUES
('WA', 'Washington'),
('CA', 'California'),
('NY', 'New York'),
('TX', 'Texas'),
('FL', 'Florida'),
('IL', 'Illinois'),
('PA', 'Pennsylvania'),
('OH', 'Ohio'),
('GA', 'Georgia'),
('NC', 'North Carolina');

-- Address
INSERT INTO address (street, city, state, zip_code) VALUES
('123 Main St', 'Seattle', 'WA', 98101),
('456 Elm St', 'San Francisco', 'CA', 94102),
('789 Oak St', 'New York City', 'NY', 10001),
('1011 Maple Ave', 'Austin', 'TX', 78701),
('523 Beach Blvd', 'Miami', 'FL', 33139),
('647 Windy Lane', 'Chicago', 'IL', 60601),
('890 Park Blvd', 'Philadelphia', 'PA', 19104),
('321 Elm St', 'Columbus', 'OH', 43215),
('759 Peachtree St', 'Atlanta', 'GA', 30303),
('123 Pine Ave', 'Charlotte', 'NC', 28202);

-- Person
INSERT INTO person (first_name, last_name, middle_name, email, phone_number, address_id, dob) VALUES
('John', 'Doe', 'A', 'johndoe@example.com', 1234567890, 1, '1990-01-01'),
('Jane', 'Doe', 'B', 'janedoe@example.com', 9876543210, 2, '1991-02-02'),
('Alice', 'Smith', 'C', 'alice@example.com', 0987654321, 3, '1992-03-03'),
('Mike', 'Johnson', 'D', 'mike@example.com', 7891234560, 4, '1993-04-04'),
('Mary', 'Brown', 'E', 'mary@example.com', 5678901234, 5, '1994-05-05'),
('David', 'Miller', 'F', 'david@example.com', 3456789012, 6, '1995-06-06'),
('Lisa', 'Garcia', 'G', 'lisa@example.com', 2345678901, 7, '1996-07-07'),
('James', 'Williams', 'H', 'james@example.com', 9870123456, 8, '1997-08-08'),
('Jennifer', 'Davis', 'I', 'jennifer@example.com', 6789012345, 9, '1998-09-09'),
('Matthew', 'Lopez', 'J', 'matthew@example.com', 5670123456, 10, '1999-10-10');

-- Teachers (Extend Person)
INSERT INTO teachers (teacher_id, salary) VALUES
(1, 50000),
(2, 60000),
(3, 70000),
(4, 80000),
(5, 90000);

-- Students (Extend Person)
INSERT INTO students (id, track_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 1),
(7, 2),
(8, 3),
(9, 4),
(10, 5);

-- Courses
INSERT INTO courses (code_type, code_number, description, season) VALUES
('CS', 101, 'Introduction to Computer Science', 'Fall'),
('CS', 201, 'Data Structures and Algorithms', 'Spring'),
('CS', 301, 'Software Engineering', 'Summer'),
('MATH', 101, 'Calculus I', 'Fall'),
('MATH', 201, 'Calculus II', 'Spring'),
('MATH', 301, 'Linear Algebra', 'Summer'),
('ENG', 101, 'Composition and Rhetoric', 'Fall'),
('ENG', 201, 'Literature', 'Spring'),
('ENG', 301, 'Creative Writing', 'Summer'),
('HIST', 101, 'Western Civilization', 'Fall'),
('HIST', 201, 'US History', 'Spring'),
('HIST', 301, 'Global History', 'Summer');

-- Derived Courses
INSERT INTO derived_courses (course_id, teacher_id, location, year, capacity, start_time, end_time, is_active) VALUES
(1, 1, 'Room 101', 2024, 20, '9:00AM', '10:00AM', true),
(2, 2, 'Room 202', 2024, 15, '11:00AM', '12:00PM', true),
(3, 3, 'Room 303', 2024, 30, '1:00PM', '2:00PM', true),
(4, 4, 'Room 404', 2024, 25, '3:00PM', '4:00PM', true),
(5, 5, 'Room 505', 2024, 20, '9:00AM', '10:00AM', true),
(6, 1, 'Room 101', 2025, 20, '9:00AM', '10:00AM', true),
(7, 2, 'Room 202', 2025, 15, '11:00AM', '12:00PM', true),
(8, 3, 'Room 303', 2025, 30, '1:00PM', '2:00PM', true),
(9, 4, 'Room 404', 2025, 25, '3:00PM', '4:00PM', true),
(10, 5, 'Room 505', 2025, 20, '9:00AM', '10:00AM', true);

-- Course Requirements
INSERT INTO course_requirements (course_id, pre_req_id, gpa_minimum) VALUES
(2, 1, 3.0),
(3, 2, 3.5),
(5, 4, 3.0),
(6, 1, 2.5),
(7, 2, 2.75),
(8, 3, 3.25),
(9, 4, 2.5),
(10, 5, 2.75);

-- Enrolled
INSERT INTO enrolled (student_id, course_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(4, 7),
(4, 8),
(5, 9),
(5, 10);

-- Completed
INSERT INTO completed (student_id, derived_course_id, gpa) VALUES
(1, 1, 4.0),
(2, 3, 3.5),
(3, 5, 4.0),
(4, 7, 3.75),
(5, 9, 3.25);

-- Degree Track
INSERT INTO degree_track (name, gpa_minimum) VALUES
('Computer Science', 3.0),
('Mathematics', 2.5),
('Engineering', 3.25),
('English Literature', 2.75),
('History', 3.0);