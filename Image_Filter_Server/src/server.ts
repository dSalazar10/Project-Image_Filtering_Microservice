import express, { Request, Response, Router } from "express";
import bodyParser from 'body-parser';
import * as EmailValidator from 'email-validator';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Validate URL
  const isImageUrl = require('is-image-url');

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: Request, res:Response ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  // endpoint to filter an image from a public url
  app.get( "/filteredimage", async ( req: Request, res:Response ) => {
    const email = req.body.email;
    const password = req.body.password;
    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
      return res.status(400).send({ auth: false, message: `Failed to authenticate.` });
    }

    // check email password valid
    if (!password) {
      return res.status(400).send({ auth: false, message: `Failed to authenticate.` });
    }
    // VERY BAD - storing a single user/pass in proc env and compare in memory
    // A cheap way to block public access
    // @TODO: upgrade security
    if (email !== process.env.ISERVER_USER) {
      return res.status(400).send({ auth: false, message: `Failed to authenticate.` });
    }
    if (password !== process.env.ISERVER_PASSWORD) {
      return res.status(400).send({ auth: false, message: `Failed to authenticate.` });
    }

    // URL of a publicly accessible image
    const { image_url } = req.query.image_url;

    // validate the image_url query
    if ( !image_url || !isImageUrl(image_url) ) {
      res.status(400).send(`image_url required`);
    }

    // Filter the image
    const filteredImage = await filterImageFromURL(image_url).catch( (err) => {
      if (err) {
        return res.status(400).send(`bad image_url`);
      }
    });
    const data: string = filteredImage as string;
    // Send the resulting file in the response
    res.sendFile(data, {}, function (err) {
      if (err) {
        throw err;
      } else {
        // Deletes any files on the server on finish of the response
        deleteLocalFiles([data]).catch( (err) => {
          if (err) {
            return res.status(400).send(`bad image_url`);
          }
        });
      }

      // End sendFile
    });

  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
