const axios = require("axios");

module.exports = {
  config: {
    name: "tkinfo",
    version: "2.0",
    author: "SaGor",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Get TikTok user info"
    },
    description: {
      en: "Fetch TikTok profile & stats using LMNx9 API"
    },
    category: "info",
    guide: {
      en: "{p}tkinfo <username>"
    }
  },

  onStart: async function ({ message, args }) {
    if (!args[0]) {
      return message.reply(
        "❌ TikTok username দাও\nExample: tkinfo 11sagor_islam"
      );
    }

    const username = args[0].replace("@", "");
    const apiUrl = `https://lmnx9.appletolha.com/tiktok-info/v2.php?username=${username}`;

    try {
      const res = await axios.get(apiUrl, { timeout: 15000 });
      const d = res.data;

      if (!d || d.success !== true || !d.profile) {
        return message.reply("❌ User info পাওয়া যায়নি");
      }

      const p = d.profile;
      const e = d.engagement_stats || {};
      const v = d.video_stats || {};
      const post = d.posting_activity || {};
      const top = d.top_post || {};

      const text =
`🎵 TikTok User Info

👤 Username: ${p.id}
📛 Nickname: ${p.name}
👥 Followers: ${p.followers}

📊 Engagement Stats
❤️ Likes: ${e.likes || 0}
💬 Comments: ${e.comments || 0}
🔥 Engagement Rate: ${Number(e.engagement_rate_percent || 0).toFixed(2)}%

🎬 Video Stats
👁️ Total Views: ${v.total_views || 0}
📺 Avg Views/Post: ${v.average_views_per_post || 0}
⏱️ Avg Video Length: ${v.average_video_length_seconds || 0}s

📝 Posting Activity
🎞️ Total Posts: ${post.total_posts || 0}
📅 Avg Posts/Day: ${Number(post.average_posts_per_day || 0).toFixed(2)}

🏆 Top Post
❤️ Likes: ${top.likes || 0}
👁️ Views: ${top.views || 0}
🔗 Link:
${top.permalink || "N/A"}

🖼️ Profile Image:
${p.image}
`;

      return message.reply(text);

    } catch (err) {
      console.error(err?.response?.data || err.message);
      return message.reply("❌ API Error / Timeout");
    }
  }
};