// pages/api/upload.ts (or app/api/upload/route.ts for App Router)

import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = formidable({
    multiples: false,
    uploadDir: "./public/uploads",
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Upload error");
      return;
    }

    res.status(200).json({ message: "File uploaded successfully" });
  });
}
