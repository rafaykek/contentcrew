import uuid
import json
import re
from datetime import datetime
from backend.database import get_db_connection

def generate_slug(title):
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', title).strip().lower()
    return re.sub(r'[\s-]+', '-', slug)

def get_all_blogs():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM blogs ORDER BY created_at DESC')
    rows = cursor.fetchall()
    conn.close()

    blogs = []
    for row in rows:
        blogs.append({
            "id": row["id"],
            "title": row["title"],
            "slug": row["slug"],
            "subtitle": row["subtitle"] or "",
            "excerpt": row["excerpt"] or "",
            "category": row["category"] or "Marketing",
            "readTime": row["read_time"] or "5 min read",
            "author": row["author"] or "ContentCrew Generation Agent",
            "seoKeywords": json.loads(row["seo_keywords"]) if row["seo_keywords"] else [],
            "readabilityScore": row["readability_score"] or "90/100",
            "content": row["content"],
            "status": row["status"],
            "date": row["created_at"].split("T")[0] if row["created_at"] else ""
        })
    return blogs

def get_blog_by_id(blog_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM blogs WHERE id = ? OR slug = ?', (blog_id, blog_id))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    return {
        "id": row["id"],
        "title": row["title"],
        "slug": row["slug"],
        "subtitle": row["subtitle"] or "",
        "excerpt": row["excerpt"] or "",
        "category": row["category"] or "Marketing",
        "readTime": row["read_time"] or "5 min read",
        "author": row["author"] or "ContentCrew Generation Agent",
        "seoKeywords": json.loads(row["seo_keywords"]) if row["seo_keywords"] else [],
        "readabilityScore": row["readability_score"] or "90/100",
        "content": row["content"],
        "status": row["status"],
        "date": row["created_at"].split("T")[0] if row["created_at"] else ""
    }

def create_or_publish_blog(data):
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.now().isoformat()

    blog_id = data.get("id") or f"blog-{uuid.uuid4().hex[:8]}"
    title = data.get("title", "Untitled Blog")
    slug = data.get("slug") or generate_slug(title)
    subtitle = data.get("subtitle", "")
    excerpt = data.get("excerpt") or (data.get("content", "")[:150] + "...")
    category = data.get("category", "Agentic AI")
    read_time = data.get("readTime", data.get("read_time", "6 min read"))
    author = data.get("author", "ContentCrew Generation Agent")
    seo_keywords = json.dumps(data.get("seoKeywords", data.get("seo_keywords", [])))
    readability_score = data.get("readabilityScore", "94/100 (Grade 11 Technical)")
    content = data.get("content", "")
    status = data.get("status", "published")

    cursor.execute('''
        INSERT INTO blogs (id, title, slug, subtitle, excerpt, category, read_time, author, seo_keywords, readability_score, content, status, created_at, updated_at, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            title=excluded.title,
            slug=excluded.slug,
            subtitle=excluded.subtitle,
            excerpt=excluded.excerpt,
            category=excluded.category,
            read_time=excluded.read_time,
            author=excluded.author,
            seo_keywords=excluded.seo_keywords,
            readability_score=excluded.readability_score,
            content=excluded.content,
            status=excluded.status,
            updated_at=excluded.updated_at,
            published_at=excluded.published_at
    ''', (blog_id, title, slug, subtitle, excerpt, category, read_time, author, seo_keywords, readability_score, content, status, now, now, now))

    conn.commit()
    conn.close()

    return get_blog_by_id(blog_id)
