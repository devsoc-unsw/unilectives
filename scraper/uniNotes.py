from bs4 import BeautifulSoup
import json
import re
import requests

# Get all course codes from localhost:3030/api/v1/courses/code/all
url = "http://localhost:3030/api/v1/courses/code/all"
response = requests.get(url)
courses = response.json()

course_codes = courses
url_prefix = "https://uninotes.com/university-subjects/university-of-new-south-wales-unsw/"
reviews = []

for course_code in course_codes:
    page = requests.get(url_prefix + course_code)
    soup = BeautifulSoup(page.content, "html.parser")

    try:
        res = soup \
        .find_all(attrs={"id": re.compile(r'^review')})

        course_reviews = []

        for review in res:
            review_object = {}
            review_object["rating"] = len(review.find_all("i", class_="fa-star fas fa-solid inline"))
            review_object["description"] = '\n'.join(review.find(class_="details").stripped_strings)
            review_object["authorName"] = review.find("h2").get_text(strip=True)
            # year = review.find("p", class_="text-sm").get_text(strip=True)

        reviews.append({
            "course": course_code,
            "reviews": course_reviews
        })
    except:
        print(f"Could not process reviews for {course_code}")

    with open('uninotes_reviews.json', 'w') as f:
        json.dump(reviews, f, indent=2)
