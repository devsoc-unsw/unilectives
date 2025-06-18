from bs4 import BeautifulSoup
import re
import requests
import signal
import time

website = "UniNotes"

# Get all course codes from localhost:3030/api/v1/courses/code/all
url = "http://localhost:3030/api/v1/courses/code/all"
response = requests.get(url)
courses = response.json()

# Get latest studentvip review ID
start_id = requests.get(f"http://localhost:3030/api/v1/reviews/scraped/maxId/{website}").json()['maxId']
course_codes = courses
url_prefix = "https://uninotes.com/university-subjects/university-of-new-south-wales-unsw/"
review_values = []
count = 0

# Define a timeout handler
def handler(signum, frame):
    raise TimeoutError("Loop iteration timed out")

# Set the timeout duration (in seconds) in case the scraping takes too long
timeout_duration = 10

for course_code in course_codes:
    signal.signal(signal.SIGALRM, handler)  
    signal.alarm(timeout_duration)         
    
    try:
        page = requests.get(url_prefix + course_code)
        soup = BeautifulSoup(page.content, "html.parser")
        res = soup.find_all(attrs={"id": re.compile(r'^review')})
        for review in res:
            author_name = review.find("h2").get_text(strip=True).replace("'", "''")

            unformattedDesc = '\n'.join(review.find(class_="details").stripped_strings)

            description = re.search(r"Comments\n(.+?)\nContact Hours", unformattedDesc, re.DOTALL)
            description = description.group(1).strip().replace("\n", " ").replace("'", "''") if description else ""

            rating = re.search(r"Overall Rating\n([0-9.]+)/5", unformattedDesc)
            rating = float(rating.group(1)) if rating else 0

            grade = re.search(r"Your Mark / Grade\n([\dA-Z ]+)", unformattedDesc)
            grade = grade.group(1).strip().replace("'", "''") if grade else "Unknown"

            term_taken_match = re.search(r'Year & (Trimester|Semester) Of Completion\n(.+?)\nYour Mark / Grade', unformattedDesc)
            term_taken = term_taken_match.group(2).replace("'", "''") if term_taken_match else "Unknown"

            count += 1
            cur_id = start_id + count
            review_values.append(
                f"('{course_code}', '{website}', '{cur_id}', 'Review #{cur_id}', {rating}, '{description}', '{author_name}', '{term_taken}', '{{}}')"
            )
        if len(res) > 0:
            print(f"Scraped reviews for {course_code}...")
    except TimeoutError:
        print(f"Iteration timed out, moving to next iteration.")
    except Exception as e:
        print(f"Could not process reviews for {course_code}: {str(e)}")
    finally:
        signal.alarm(0)  # Disable the alarm after each iteration

# Write SQL statements to a file
with open('../backend/data/uninotes_reviews.sql', 'w') as f:
    f.write("-- UniNotes Reviews SQL Import\n\n")

    batch_size = 1000
    for i in range(0, len(review_values), batch_size):
        batch = review_values[i:i+batch_size]
        sql = f"INSERT INTO unilectives.reviews_scraped (course_code, source, source_id, title, overall_rating, description, author_name, term_taken, upvotes) VALUES {', '.join(batch)};\n"
        f.write(sql)

print(f"SQL file created with {len(review_values)} reviews in multi-insert statements.")