from bs4 import BeautifulSoup
import json
import re
import requests
import openai

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
            review_object["authorName"] = review.find("h2").get_text(strip=True)

            unformattedDesc = '\n'.join(review.find(class_="details").stripped_strings)

            # Description is after the title "Comments" and before "Contact Hours"
            review_object["description"] = re.search(r"Comments\n(.+?)\nContact Hours", unformattedDesc, re.DOTALL).group(1).strip().replace("\n", " ")
            review_object["rating"] = float(re.search(r"Overall Rating\n([0-9.]+)/5", unformattedDesc).group(1))
            review_object["grade"] = re.search(r"Your Mark / Grade\n([\dA-Z ]+)", unformattedDesc).group(1).strip()
            term_taken_match = re.search(r'Year & (Trimester|Semester) Of Completion\n(.+?)\nYour Mark / Grade', unformattedDesc)
            if term_taken_match:
                review_object["termTaken"] = term_taken_match.group(2)
            else:
                review_object["termTaken"] = "Unknown"
            course_reviews.append(review_object)

        if course_reviews:
            reviews.append({
                "course": course_code,
                "reviews": course_reviews
            })
    except:
        print(f"Could not process reviews for {course_code}")

    with open('uninotes_reviews.json', 'w') as f:
        json.dump(reviews, f, indent=2)
