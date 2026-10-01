import json
from datetime import datetime
from backend.database import get_db_connection

def get_marketing_context():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Retrieve Company Profile
    cursor.execute('SELECT * FROM marketing_context WHERE id = 1')
    ctx_row = cursor.fetchone()

    # Retrieve Competitors
    cursor.execute('SELECT * FROM competitors ORDER BY created_at ASC')
    comp_rows = cursor.fetchall()

    conn.close()

    if not ctx_row:
        return {
            "onboarding_completed": False,
            "company": {
                "name": "",
                "description": "",
                "industry": "",
                "target_audience": [],
                "products_services": []
            },
            "competitors": [],
            "research_summary": {
                "articles_analyzed": 0,
                "keywords_discovered": 0,
                "content_gaps_identified": 0,
                "avg_competitor_word_count": 0,
                "last_research_date": None
            }
        }

    company_data = {
        "name": ctx_row["company_name"],
        "description": ctx_row["description"] or "",
        "industry": ctx_row["industry"] or "",
        "target_audience": json.loads(ctx_row["target_audience"]) if ctx_row["target_audience"] else [],
        "products_services": json.loads(ctx_row["products_services"]) if ctx_row["products_services"] else [],
        "brand_tone": ctx_row["brand_tone"] or "Professional"
    }

    competitors_data = []
    for row in comp_rows:
        competitors_data.append({
            "id": row["id"],
            "name": row["name"],
            "url": row["url"] or "",
            "focus_area": row["focus_area"] or "",
            "top_articles": json.loads(row["top_articles"]) if row["top_articles"] else [],
            "last_scraped": row["last_scraped"] or ""
        })

    return {
        "onboarding_completed": bool(ctx_row["onboarding_completed"]),
        "company": company_data,
        "competitors": competitors_data,
        "research_summary": {
            "articles_analyzed": 18,
            "keywords_discovered": 45,
            "content_gaps_identified": 7,
            "avg_competitor_word_count": 2150,
            "last_research_date": ctx_row["updated_at"]
        }
    }

def update_marketing_context(data):
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.now().isoformat()

    company = data.get("company", {})
    onboarding_completed = 1 if data.get("onboarding_completed", True) else 0

    if company:
        name = company.get("name", "CloudScale AI")
        desc = company.get("description", "")
        industry = company.get("industry", "")
        target_aud = json.dumps(company.get("target_audience", []))
        products = json.dumps(company.get("products_services", company.get("products", [])))
        brand_tone = company.get("brand_tone", "Professional")

        cursor.execute('''
            INSERT INTO marketing_context (id, company_name, description, industry, target_audience, products_services, brand_tone, onboarding_completed, updated_at)
            VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                company_name=excluded.company_name,
                description=excluded.description,
                industry=excluded.industry,
                target_audience=excluded.target_audience,
                products_services=excluded.products_services,
                brand_tone=excluded.brand_tone,
                onboarding_completed=excluded.onboarding_completed,
                updated_at=excluded.updated_at
        ''', (name, desc, industry, target_aud, products, brand_tone, onboarding_completed, now))

    competitors = data.get("competitors")
    if competitors is not None:
        # Clear existing competitors and replace
        cursor.execute('DELETE FROM competitors')
        for i, comp in enumerate(competitors):
            comp_id = comp.get("id", f"comp-{i+1}")
            comp_name = comp.get("name", "Competitor")
            url = comp.get("url", "")
            focus = comp.get("focus_area", comp.get("focus", ""))
            top_arts = json.dumps(comp.get("top_articles", []))
            last_scraped = comp.get("last_scraped", now.split("T")[0])

            cursor.execute('''
                INSERT INTO competitors (id, name, url, focus_area, top_articles, last_scraped, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (comp_id, comp_name, url, focus, top_arts, last_scraped, now))

    conn.commit()
    conn.close()

    return get_marketing_context()
