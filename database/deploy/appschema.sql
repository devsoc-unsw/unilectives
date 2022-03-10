-- Deploy cselectives:appschema to pg

BEGIN;
CREATE SCHEMA cselectives;

CREATE TABLE cselectives.users (
    zid                 text NOT NULL,
    bookmarked_reviews  text[] NOT NULL,
    bookmarked_courses  text[] NOT NULL,
    is_admin            boolean NOT NULL,
    CONSTRAINT pk_zid PRIMARY KEY ( zid )
);

CREATE TABLE cselectives.courses (
    course_code        text NOT NULL,
    archived           boolean NOT NULL,
    attributes         text[] NOT NULL,
    calender           text NOT NULL,
    campus             text NOT NULL,
    description        text NOT NULL,
    enrolment_rules    text NOT NULL,
    equivalents        text NOT NULL,
    exclusions         text NOT NULL,
    faculty            text NOT NULL,
    field_of_education text NOT NULL,
    gen_ed             boolean NOT NULL,
    level              integer NOT NULL,
    school             text NOT NULL,
    study_level        text NOT NULL,
    terms              text[] NOT NULL,
    title              text NOT NULL,
    uoc                integer NOT NULL,
    CONSTRAINT pk_course_code PRIMARY KEY ( course_code )
);

CREATE TABLE cselectives.reviews (
    review_id          uuid NOT NULL DEFAULT gen_random_uuid(),
    zid                text NOT NULL,
    course_code        text NOT NULL,
    author_name        text NOT NULL,
    description        text NULL,
    grade              integer NULL,
    term_taken         text NOT NULL,
    created_timestamp  timestamp NOT NULL,
    updated_timestamp  timestamp NOT NULL,
    upvotes            text[] NOT NULL,
    CONSTRAINT pk_review_id PRIMARY KEY ( review_id ),
    CONSTRAINT fk_course_code FOREIGN KEY ( course_code ) REFERENCES cselectives.courses(course_code),
    CONSTRAINT fk_zid FOREIGN KEY ( zid ) REFERENCES cselectives.users(zid)
);

CREATE TYPE report_status AS ENUM ('REMOVED', 'UNSEEN', 'SEEN', 'SETTLED');
CREATE TABLE cselectives.reports (
    report_id uuid           NOT NULL DEFAULT gen_random_uuid(),
    review_id uuid           NOT NULL,
    zid       text           NOT NULL,
    status    report_status  NOT NULL,
    reason    text           NOT NULL,
    CONSTRAINT pk_report_id  PRIMARY KEY ( report_id ),
    CONSTRAINT fk_review_id  FOREIGN KEY ( review_id ) REFERENCES cselectives.reviews( review_id ),
    CONSTRAINT fk_zid        FOREIGN KEY ( zid ) REFERENCES cselectives.users(zid)
);

COMMIT;
