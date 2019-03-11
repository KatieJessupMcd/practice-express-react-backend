// ROUTES
// starts server, route handlers that use class methods defined in MODEL
const app = express();
app.use(cors());
app.use(express.json());

app.get("/jokes", async function(req, res, next) {
  try {
    const jokes = await Joke.getRandomJokes();
    return res.json({ jokes });
  } catch (e) {
    return next(e);
  }
});

// app.get("/jokes/best", async function(req, res, next) {
//   try {
//     const jokes = await Joke.getTopJokes();
//     return res.json({ jokes });
//   } catch (e) {
//     return next(e);
//   }
// });

// app.get("/jokes/worst", async function(req, res, next) {
//   try {
//     const jokes = await Joke.getBottomJokes();
//     return res.json({ jokes });
//   } catch (e) {
//     return next(e);
//   }
// });

app.listen(3001, () => console.log("Server started on 3001"));