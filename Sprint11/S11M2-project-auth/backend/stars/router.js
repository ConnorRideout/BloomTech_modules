const express = require('express')
const protect = require('../auth/tokenMiddleware')

let stars = [
  {
    "id": 1,
    "fullName": "Sigourney Weaver",
    "born": "1949-10-08",
    "bio": "An American actress known for her pioneering roles in science fiction films, notably as Ellen Ripley in the Alien franchise."
  },
  {
    "id": 2,
    "fullName": "Tom Hanks",
    "born": "1956-07-09",
    "bio": "Two-time Academy Award winner known for his versatile performances in films like Forrest Gump and Cast Away."
  },
  {
    "id": 3,
    "fullName": "Meryl Streep",
    "born": "1949-06-22",
    "bio": "Highly acclaimed actress with a record number of Academy Award nominations, celebrated for her roles in Sophie's Choice and The Iron Lady."
  },
  {
    "id": 4,
    "fullName": "Denzel Washington",
    "born": "1954-12-28",
    "bio": "Renowned for his powerful performances in Training Day and Malcolm X, Washington is a multi-Academy Award-winning actor and director."
  },
  {
    "id": 5,
    "fullName": "Viola Davis",
    "born": "1965-08-11",
    "bio": "First Black actress to achieve the Triple Crown of Acting, known for her roles in Fences and How to Get Away with Murder."
  },
  {
    "id": 6,
    "fullName": "Leonardo DiCaprio",
    "born": "1974-11-11",
    "bio": "Environmental activist and actor famous for his roles in Titanic and The Revenant, winning his first Oscar for the latter."
  }
]

const router = express.Router()

router.get('/', protect, (req, res) => {
  res.json(stars)
})

module.exports = router
