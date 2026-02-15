import Parser from 'rss-parser'

export const dynamic = "force-dynamic"

const parser = new Parser()

export async function GET() {
    const CHANNEL_ID = 'UCtLkQJdn-nysUBA7nNPR7QA' // replace
    const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

    const feed = await parser.parseURL(RSS_URL)
    const latest = feed.items[0]

    if (!latest) {
        return Response.json({ error: 'No videos found' }, { status: 404 })
    }

    const videoId = latest.id?.split(':').pop()

    return Response.json({
        title: latest.title,
        url: latest.link,
        publishedAt: latest.pubDate,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    })
}
