![logo](logo.png)
-------------------
![pass](https://img.shields.io/badge/build-failing-red.svg)
![GitHub](https://img.shields.io/github/license/dsalazar10/App-Udagram.svg)
![Language](https://img.shields.io/badge/Language-Typescript-blue.svg)
![size](https://img.shields.io/github/repo-size/dsalazar10/App-Udagram.svg)

This repo contains answers to the assignment. If you are currently taking the course, spoilers beware!

![](Main.png)


## Endpoints
Note: Student AWS Credits exausted and endpoints are no longer accessible.

### Rest API

Base URL for Rest API is [http://feed.udagram.me/api/v0](https://udagram-restapi-prod.us-east-2.elasticbeanstalk.com/api/v0)

/feed
  - `GET /` get all images
  - `GET /:id` get a specific image
  - `GET /signed-url/:fileName` (requires auth) get signedURL
  - `GET /` (requires auth) upload an image
  - `PATCH /:id` (requires auth) update a specific image

/user
  - `GET /` reserved
  - `GET /:id` get a specific user
  
 /user/auth
  - `GET /` reserved
  - `GET /verification` (requires auth) verify credentials are valid
  - `POST /` register a new user
  - `POST /login` login

 ### Image Filter
 
 Base URL for Image Filter API is [http://filter.udagram.me/api/v0](https://udagram-image-filter-prod.us-east-2.elasticbeanstalk.com/api/v0)
 
 Postman Collection can be found 
[here](https://github.com/dSalazar10/App-Udagram/blob/master/Image_Filter_Server/Image_Filter_Server.postman_collection.json)

 /filter
   - `GET /` reserved
   - `POST /grey` (requires auth)
   * ![](./Image_Filter_Server/tutorial/grey.jpeg)
   - `POST /sepia` (requires auth)
   * ![](./Image_Filter_Server/tutorial/sepia.jpeg)
   - `POST /blur` (requires auth)
   * ![](./Image_Filter_Server/tutorial/blur.jpeg)
   - `POST /gaussian` (requires auth)
   * ![](./Image_Filter_Server/tutorial/gaussian.jpeg)
   - `POST /mirror` (requires auth)
   * ![](./Image_Filter_Server/tutorial/mirror.jpeg)
   - `POST /invert` (requires auth)
   * ![](./Image_Filter_Server/tutorial/invert.jpeg)
 
  /user
  - `GET /` reserved
  - `GET /:id` get a specific user
  
 /user/auth
  - `GET /` reserved
  - `GET /verification` (requires auth) verify credentials are valid
  - `POST /` register a new user
  - `POST /login` login
