from bs4 import BeautifulSoup
import requests

# Get all course codes from localhost:3030/api/v1/courses/code/all
url = "http://localhost:3030/api/v1/courses/code/all"
response = requests.get(url)
courses = response.json()

course_codes = courses
url_prefix = "https://studentvip.com.au/unsw/subjects/"
review_values = []
batch_size = 1000
count = 0

for course_code in course_codes:
    page = requests.get(url_prefix + course_code)
    soup = BeautifulSoup(page.content, "html.parser")

    try:
        res = soup.find("h3", class_="text-subjects") \
            .find_next(class_="list-group") \
            .find_all(class_="panel-body")

        for review in res:
            rating = len(review.find_all("i", class_="fa fa-star"))
            description = review.find("p").get_text(strip=True).replace("'", "''")  # Escape single quotes
            name, term, year = review.find("small").get_text(strip=True).split(",")
            author_name = name.strip().replace("'", "''")  # Escape single quotes
            term_taken = term.split(' ')
            year_taken = year.strip()
            term_taken = year_taken[2:] + term_taken[1][0] + term_taken[2]

            review_values.append(f"('{course_code}', 'StudentVIP', {f"Review #{count}"}, {rating}, '{description}', '{author_name}', '{term_taken}', {[]})")
            count += 1

    except Exception as e:
        print(f"Could not process reviews for {course_code}: {str(e)}")

# Write SQL statements to a file
with open('../backend/data/studentVIP_reviews.sql', 'w') as f:
    f.write("-- StudentVIP Reviews SQL Import\n\n")
    for i in range(0, len(review_values), batch_size):
        batch = review_values[i:i+batch_size]
        sql = f"INSERT INTO reviews_scraped (course_code, source, title, overall_rating, description, author_name, term_taken, upvotes) VALUES {', '.join(batch)};\n"
        f.write(sql)

print(f"SQL file created with {len(review_values)} INSERT statements.")
