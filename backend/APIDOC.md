# *Server.js* API Documentation
*These API Endpoints provide the client with information about courses, students and transaction data.*

## */addEnrolledCourse*
**Request Format:** */addEnrolledCourse*

**Request Type:** *Post: Multipart Body (courseId(int))*

**Returned Data Format**: *JSON/Text*

**Description:** *an endpoint to enroll a student in a course. Also removes the course from the dropped courses table if the student is re-enrolling. Makes an entry in the history table as well*

**Example Request:** */addEnrolledCourse*

**Example Response:**

```json
{
	"response": "You have been successfully enrolled in the course",
	"confirmationNumber": "9cecbe38-1f7c-41c8-8e61-69363df33608"
}
```

**Error Handling:**
If the user is already enrolled:
```
{
	"response": "Already enrolled into this course."
}
```

If the user has not compelted the prerequisite course.
```
Prerequisite course not completed.
```
If the user provided invalid kv pairings
```
Unable to retrieve from the database: main
```
If the user is not logged in
```
User not properly LogedIn
```

## */addDroppedCourse*
**Request Format:** */addDroppedCourse*

**Request Type:** *Post: multipart body (courseId (int), reason (string))*

**Returned Data Format**: JSON/text

**Description:** *Allows the student to drop a course. Course is removed from the enrolled table and a transaction entry is entered in the history table*

**Example Request:** */addDroppedCourse*

**Example Response:**

```json
{
	"response": "You have successfully dropped: 4",
	"reason": "I'm too dumb"
}
```

**Error Handling:**
```json
{
	"response": "Not enrolled in that course."
}
```

## */GetEntireCourseList*
**Request Format:** */GetEntireCourseList*

**Request Type:** *Get*

**Returned Data Format**: JSON/text

**Description:** *provides the user a list of all the courses provided*

**Example Request:** */GetEntireCourseList*

**Example Response:**

```json
[
	{
		"id": 1,
		"code_type": "CS",
		"code_number": 101,
		"description": "Introduction to Computer Science",
		"season": "Fall"
	},
	{
		"id": 2,
		"code_type": "CS",
		"code_number": 201,
		"description": "Data Structures and Algorithms",
		"season": "Spring"
	},
	{
		"id": 3,
		"code_type": "CS",
		"code_number": 301,
		"description": "Software Engineering",
		"season": "Summer"
	},
]
```

**Error Handling:**

If the user provided invalid kv pairings
```
Unable to retrieve from the database: main
```
If the user is not logged in
```
User not properly LogedIn
```

## */GetActiveCourseList*
**Request Format:** */GetActiveCourseList*

**Request Type:** *Get*

**Returned Data Format**: JSON/text

**Description:** *provides the user a list of all the courses that are currently 'active'. List includes extra detail about the courses such as remaining capacity and start/end times*

**Example Request:** */GetActiveCourseList*

**Example Response:**

```json
[
	{
		"course_id": 1,
		"teacher_id": 1,
		"location": "Room 101",
		"year": 2024,
		"capacity": 20,
		"start_time": "9:00AM",
		"end_time": "10:00AM",
		"is_active": 1,
		"id": 1,
		"code_type": "CS",
		"code_number": 101,
		"description": "Introduction to Computer Science",
		"season": "Fall"
	},
	{
		"course_id": 2,
		"teacher_id": 2,
		"location": "Room 202",
		"year": 2024,
		"capacity": 15,
		"start_time": "11:00AM",
		"end_time": "12:00PM",
		"is_active": 1,
		"id": 2,
		"code_type": "CS",
		"code_number": 201,
		"description": "Data Structures and Algorithms",
		"season": "Spring"
	},
]
```

**Error Handling:**
If the user is not logged in
```
User not properly LogedIn
```

## */getStudentById*
**Request Format:** */getStudentById*

**Request Type:** *Get: Multipart body (studentId (int))*

**Returned Data Format**: JSON/text

**Description:** *retrieves information about a student user such as their contact information and degree track*

**Example Request:** */getStudentById*

**Example Response:**

```json
[
	{
		"id": 4,
		"first_name": "Mike",
		"last_name": "Johnson",
		"middle_name": "D",
		"email": "mike@example.com",
		"phone_number": 7891234560,
		"address_id": 4,
		"dob": "1993-04-04",
		"track_id": 4
	}
]
```

**Error Handling:**
If the user provided invalid kv pairings
```
Unable to retrieve from the database: main
```
If the user is not logged in
```
User not properly LogedIn
```


## */searchCourses*
**Request Format:** */searchCourses*

**Request Type:** *Get. Multipart body (courseType (string), courseNum (string), courseSeason (string))*

**Returned Data Format**: JSON/text

**Description:** *Retrieves a list of courses filtered by the provided strings*

**Example Request:** */searchCourses* * courseType = ENG , courseNum = "", courseSeason = "Summer"*

**Example Response:**

```json
{
	"filteredCourses": [
		{
			"id": 9,
			"code_type": "ENG",
			"code_number": 301,
			"description": "Creative Writing",
			"season": "Summer"
		}
	]
}
```

**Error Handling:**
If the user provided invalid kv pairings
```
Unable to retrieve from the database: main
```
If the user is not logged in
```
User not properly LogedIn
```


## */getCourseInfo*
**Request Format:** */getCourseInfo*

**Request Type:** *Get. Multipart body (courseId (int))*

**Returned Data Format**: JSON/text

**Description:** *Retrieves detailed information about a course including instructor info and prerequisite information*

**Example Request:** */getCourseInfo* 

**Example Response:**

```json
{
	"courseInfo": [
		{
			"code_type": "MATH",
			"code_number": 201,
			"course_id": 5,
			"teacher_id": 5,
			"location": "Room 505",
			"year": 2024,
			"capacity": 20,
			"start_time": "9:00AM",
			"end_time": "10:00AM",
			"is_active": 1
		}
	],
	"instructorInfo": [
		{
			"id": 5,
			"first_name": "Mary",
			"last_name": "Brown",
			"middle_name": "E",
			"email": "mary@example.com",
			"phone_number": 5678901234,
			"address_id": 5,
			"dob": "1994-05-05"
		}
	],
	"requirementsInfo": [
		{
			"pre_req_id": 4,
			"code_type": "MATH",
			"code_number": 101
		}
	]
}
```

**Error Handling:**
If the user provided invalid kv pairings
```
Unable to retrieve from the database: main
```
If the user is not logged in
```
User not properly LogedIn
```

## */login*
**Request Format:** */login*

**Request Type:** *Post. Multipart body (username (int), password (string), type (string))*

**Returned Data Format**: text

**Description:** *Verifies the user/password information exists in the users table then creates a login session for the user. This accesses the isAuth middleware method, which sets cookie info for the user and allows the user access to all the other endpoints*

**Example Request:** */login* * username = 4 , password = "password123", type = "student_users"*

**Example Response:**

```Text
Login Successful
```

**Error Handling:**

If the user provided invalid kv pairings
```
Unable to retrieve from the database: main
```
If the user did not provide the correct username+password:
```
Invalid credentails.
```

## */logout*
**Request Format:** */logout*

**Request Type:** *Post*

**Returned Data Format**: text

**Description:** *logs out the user and clears the session id*

**Example Request:** */logout* 

**Example Response:**

```Text
Successfully logged out!
```

**Error Handling:**

If the user is not logged in
```
User not properly LogedIn
```


