import express from "express";
import rateLimit from "express-rate-limit";
import { fetchFile, fetchFiles } from "./utils/file.js";

const app = express();

app.use(
  "/file/*",
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50,
  })
);

app.use(
  "/files/*",
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 25,
  })
);

app.get("/", (req, res) => {
  res.end(
    "Send Get Requests to: \n-`/file/[username]/[slug]`\n-`/files/[username]/[slug]`"
  );
});

app.get("/file/:username/:slug", async (req, res) => {
  const { username, slug } = req.params;
  const { filename, raw } = req.query;
  try {
    const info = await fetchFile(`/@${username}/${slug}`, filename, raw);
    res.end(info);
  } catch (err) {
    console.log(err);
    res.end(
      JSON.stringify({
        error:
          "An Error Occured. This is likely because the Repl does not exist or it does not have files.",
      })
    );
  }
});

// This fails to delete folder, while /file doesn't
app.get("/files/:username/:slug", async (req, res) => {
  const { username, slug } = req.params;
  try {
    const info = await fetchFiles(`/@${username}/${slug}`);
    res.end(JSON.stringify(info));
  } catch (err) {
    console.log(err);
    res.end(
      JSON.stringify({
        error:
          "An Error Occured. This is likely because the Repl does not exist or it does not have files.",
      })
    );
  }
});

app.listen(3000);
