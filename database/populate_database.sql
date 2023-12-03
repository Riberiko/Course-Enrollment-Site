INSERT INTO state (code, name) VALUES
('NY', 'New York'),
('CA', 'California'),
('TX', 'Texas'),
('FL', 'Florida'),
('IL', 'Illinois');

INSERT INTO address (street, city, state_code, zipcode) VALUES
('456 Maple St', 'Villageville', 'NY', 10002),
('789 Birch St', 'Citytown', 'CA', 90211),
('101 Oak St', 'Townsville', 'TX', 75002),
('202 Pine St', 'Villagetown', 'FL', 33101),
('303 Cedar St', 'Countryside', 'IL', 60601),
('404 Elm St', 'Metropolis', 'NY', 10003),
('505 Walnut St', 'Cityville', 'CA', 90212),
('606 Spruce St', 'Townton', 'TX', 75003),
('707 Fir St', 'Villageton', 'FL', 33102),
('808 Redwood St', 'Ruraltown', 'IL', 60602);

INSERT INTO person (first_name, last_name, middle_name, email, phone_number, address_id) VALUES
('Alice', 'Johnson', 'D', 'alice.johnson@email.com', 1234567891, 1),
('Bob', 'Miller', 'E', 'bob.miller@email.com', 9876543211, 2),
('Charlie', 'Williams', 'F', 'charlie.williams@email.com', NULL, 3),
('David', 'Brown', 'G', 'david.brown@email.com', 9876543212, 1),
('Eva', 'Davis', 'H', 'eva.davis@email.com', 1234567892, 2),
('Frank', 'Moore', 'I', 'frank.moore@email.com', NULL, 3),
('Grace', 'Smith', 'J', 'grace.smith@email.com', 9876543213, 1),
('Henry', 'Taylor', 'K', 'henry.taylor@email.com', 1234567893, 2),
('Ivy', 'Martin', 'L', 'ivy.martin@email.com', NULL, 3),
('Jack', 'Anderson', 'M', 'jack.anderson@email.com', 9876543214, 1);

INSERT INTO teachers (id, salary) VALUES
(4, 60000.00),
(5, 70000.00),
(6, 80000.00),
(7, 75000.00),
(8, 90000.00);

-- Add more dummy data to the 'students' table
INSERT INTO students (id, track_id) VALUES
(7, 1),
(8, 2),
(9, 1),
(10, 3);

-- Add more dummy data to the 'course' table
INSERT INTO course (id, code_type, code_number, teacher_id, description, start_time, end_time, location, season, year, capacity) VALUES
(4, 'CSE', 201, 4, 'Data Structures', '10:00', '11:30', 'Room D', 'F', 2023, 40),
(5, 'MAT', 301, 5, 'Linear Algebra', '13:00', '14:30', 'Room E', 'F', 2023, 30),
(6, 'ENG', 401, 6, 'Creative Writing', '15:00', '16:30', 'Room F', 'F', 2023, 20),
(7, 'PHY', 101, 7, 'Introduction to Physics', '08:00', '09:30', 'Room G', 'F', 2023, 45),
(8, 'CHE', 201, 8, 'Organic Chemistry', '10:00', '11:30', 'Room H', 'F', 2023, 35),
(9, 'BIO', 301, 4, 'Genetics', '13:00', '14:30', 'Room I', 'F', 2023, 25),
(10, 'PSY', 401, 5, 'Psychology of Mind', '15:00', '16:30', 'Room J', 'F', 2023, 15),
(11, 'ART', 101, 6, 'Introduction to Art', '08:00', '09:30', 'Room K', 'F', 2023, 30),
(12, 'MUS', 201, 4, 'Music Theory', '10:00', '11:30', 'Room L', 'F', 2023, 25),
(13, 'HIS', 301, 5, 'World History', '13:00', '14:30', 'Room M', 'F', 2023, 20),
(14, 'POL', 401, 6, 'Political Science', '15:00', '16:30', 'Room N', 'F', 2023, 18),
(15, 'ECO', 101, 7, 'Microeconomics', '08:00', '09:30', 'Room O', 'F', 2023, 22),
(16, 'SOC', 201, 8, 'Sociology', '10:00', '11:30', 'Room P', 'F', 2023, 28),
(17, 'ANT', 301, 4, 'Cultural Anthropology', '13:00', '14:30', 'Room Q', 'F', 2023, 24),
(18, 'GEO', 401, 5, 'Geography', '15:00', '16:30', 'Room R', 'F', 2023, 26),
(19, 'LIT', 101, 6, 'American Literature', '08:00', '09:30', 'Room S', 'F', 2023, 32),
(20, 'PHI', 201, 7, 'Philosophy', '10:00', '11:30', 'Room T', 'F', 2023, 19),
(21, 'COM', 301, 8, 'Communication Studies', '13:00', '14:30', 'Room U', 'F', 2023, 16),
(22, 'EDU', 401, 4, 'Education Theory', '15:00', '16:30', 'Room V', 'F', 2023, 14),
(23, 'MKT', 101, 5, 'Marketing Fundamentals', '08:00', '09:30', 'Room W', 'F', 2023, 30),
(24, 'FIN', 201, 6, 'Financial Management', '10:00', '11:30', 'Room X', 'F', 2023, 25),
(25, 'HRM', 301, 7, 'Human Resource Management', '13:00', '14:30', 'Room Y', 'F', 2023, 20);

-- Add more dummy data to the 'active_courses' table
INSERT INTO active_courses (course_id) VALUES
(4),
(5),
(6),
(7);

-- Add more dummy data to the 'course_requirements' table
INSERT INTO course_requirements (course_id, pre_req_id, gpa_minimum) VALUES
(5, 4, 3.0),
(6, 5, 3.2),
(7, 6, 3.5),
(8, 7, 3.0),
(9, 8, 3.2),
(10, 9, 3.5);

-- Add more dummy data to the 'enrolled' table
INSERT INTO enrolled (student_id, course_id) VALUES
(7, 4),
(8, 5),
(9, 6),
(10, 7);

-- Add more dummy data to the 'dropped' table
INSERT INTO dropped (student_id, course_id, reason) VALUES
(7, 4, 'Work commitments'),
(8, 5, 'Health issues'),
(9, 6, 'Travel plans'),
(10, 7, 'Course overload'),
(11, 8, 'Personal reasons'),
(12, 9, 'Change of major'),
(13, 10, 'Time conflict'),
(14, 11, 'Not interested'),
(15, 12, 'Family emergency'),
(16, 13, 'Scheduling conflict');

-- Add more dummy data to the 'waiting' table
INSERT INTO waiting (student_id, course_id) VALUES
(7, 5);
