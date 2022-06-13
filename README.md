## Getting Started

Firstly you will need to run `npm i` to install all dependencies and then add a `.env` file with the following env-var:
`MONGO_PASSWORD=xxxxxxxx`

The password should have been sent to you separatley. The IP has been whitelisted to be accessed from anywhere.

Run `npm start` to start up the application.

## Details

This application can be tested independently or in conjuction with the React application.

If testing separately it can be accessed at `http//:localhost:3001`

The endpoints are as follows"

- `/courses/all-courses` - Returns a list of all courses
- `/courses/new-course` - Simple UI that allows a new course to be added. This in turn calls `/courses/add-new-course` and saves the course.
- `courses/add-new-course` - This can be run directly with a request body consisting of, `title, price, description, categories`. The `categories` input should an array of comma separated strings. E.g. `["React", "JS"]`
- `courses/delete-courses/:courseId` - This will delete a course based on the unique ID of the course.
- `/courses/:courseId` - This will return a specific course based upon the unique ID of the course.
- `/courses/all-courses?limit=xxx`- Will limit the number of courses returned based on the number passed to the limit.
- `/courses/all-courses?sort=xxx` - Will sort courses in either ascending or descending order. The number `1` will sort in ascending order and `-1` will sort in descending order.
- `courses/all-courses?category=xxx` - Will return courses based on the catergory tag. For example, `..?category=React` will return all courses that have the React tag.
- `courses/all-courses?allCategories=true` - Will return a list of all categories that exist over all the courses.

## With More Time

- Add in unit and integration tests
