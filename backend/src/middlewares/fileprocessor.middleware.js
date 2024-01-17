const fileProcessingMiddleware = (req, res, next) => {
  try {
    console.log("healoo", req.body);
    // if (!req.file) {
    //   return res.status(400).json({ message: "No file uploaded" });
    // }

    // Extracting metadata from the file
    // const metadata = {
    //   originalName: req.file.originalname,
    //   mimeType: req.file.mimetype,
    //   size: req.file.size,
    //   uploadDate: new Date(),
    // };

    // Attaching metadata to the request object
    // req.fileMetadata = metadata;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
module.exports = fileProcessingMiddleware;
