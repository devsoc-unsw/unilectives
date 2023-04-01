import Snoowrap from "snoowrap"; // https://not-an-aardvark.github.io/snoowrap/

/*
    A simple and clean way to search Reddit via snoowrap, a library for the Reddit API
    Note: can only search posts (i.e. questions), so results aren't as relevant
*/

const course = "COMP6080";

const client = new Snoowrap({
    userAgent: "CSElectives v2",
    accessToken: "-iTeSEp1VGF2J4_4Y6Rb4ovmup1omGw" // https://not-an-aardvark.github.io/reddit-oauth-helper/
});

client
    .search({
        query: course,
        subreddit: "unsw",
        restrictSr: true,
        sort: "top"
    })
    .then((results) => {
        // Logs results in stdout
        results.forEach((result) => {
            console.log(result.url);
            console.log(result.selftext + "\n");
        });
    })
    .catch(error => console.error(error));
