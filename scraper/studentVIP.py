from bs4 import BeautifulSoup
import json
import requests

# List of course codes. Eventually get full list of course codes.
course_codes = ["elec2141", "comp1511", "math1081", "fake9999"]
url_prefix = "https://studentvip.com.au/unsw/subjects/"
reviews = []

for course_code in course_codes:
    page = requests.get(url_prefix + course_code)
    soup = BeautifulSoup(page.content, "html.parser")

    try:
        res = soup.find("h3", class_="text-subjects") \
        .find_next(class_="list-group") \
        .find_all(class_="panel-body")

        course_reviews = []

        for review in res:
            review_object = {}
            review_object["rating"] = len(review.find_all("i", class_="fa fa-star"))
            review_object["description"] = review.find("p").get_text(strip=True)

            name, term, year = review.find("small").get_text(strip=True).split(",")
            review_object["authorName"] = name.strip()
            review_object["termTaken"] = term.strip()
            review_object["createdTimestamp"] = year.strip()

            course_reviews.append(review_object)

        reviews.append({
            "course": course_code,
            "reviews": course_reviews
        })
    except:
        print(f"Could not process reviews for {course_code}")

    with open('studentVIP_reviews.json', 'w') as f:
        json.dump(reviews, f, indent=2)
