import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  const { data } = req.body;
  const response = await pusher.trigger("chat", "chat-event", {
    data,
  });

  res.json({ message: "completed" });
}