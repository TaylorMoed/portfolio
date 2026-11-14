"""Builds the three one-page resumes as PDFs.

    python3 resume-src/build.py            # public versions (no phone) -> public/resumes/
    python3 resume-src/build.py --phone    # private versions with phone -> resumes-private/

The phone number is read from resumes-private/phone.txt (not committed), so it never lands in Git.
"""
import html, os, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
WITH_PHONE = "--phone" in sys.argv

# ---------- shared content ----------
EDUCATION = {
    "school": "Prairie View A&M University", "where": "Prairie View, TX",
    "degree": "B.S. in Computer Science, Data Science Concentration", "when": "Expected May 2027",
}

PROJECTS = {
    "astro": {
        "title": "Astronomical Image Classifier", "tech": "Python · scikit-learn",
        "desc": "Image-classification pipeline that preprocesses astronomical images and predicts each image's category "
                "with a confidence score, using a reproducible training and evaluation setup.",
        "impact": "Built a repeatable train-and-evaluate workflow that compares models on both accuracy and processing "
                  "time, so results can be reproduced and improved run to run.",
    },
    "kickelo": {
        "title": "Kickelo — Sneaker Inventory & Reselling Platform", "tech": "React · TypeScript · Node.js · PostgreSQL",
        "desc": "Full-stack inventory platform where resellers scan or type a SKU to auto-fill product details from a "
                "third-party catalog API, stage pairs in an inbound session, and save them to inventory in one batch.",
        "impact": "Built a batched importer for a 278,000-row sneaker price catalog and covered the app with "
                  "127 automated tests across 20,000+ lines of React and TypeScript.",
    },
    "mofish": {
        "title": "MoFish — Computer Vision Chess Analysis", "tech": "Python · OpenCV · python-chess · Stockfish · Qt",
        "desc": "Desktop app that reads a chess game straight off the screen with OpenCV, tracks every move with "
                "python-chess, and shows Stockfish's best move with a plain-English explanation.",
        "impact": "Identified 100% of pieces across 704 squares of real game screenshots and all 448 squares on 7 unseen "
                  "piece sets, rebuilding the board in a median 34 ms with zero silent errors.",
    },
    "blockwise": {
        "title": "Blockwise — Time-Blocking Planner for macOS", "tech": "Swift · SwiftUI",
        "desc": "Native macOS weekly planner with drag-and-resize calendar blocks and a smart scheduler that moves "
                "flexible tasks around fixed classes and shifts.",
        "impact": "Wrote a 15-minute-slot scheduling engine that rebalances any day over an 8-hour limit, verified by "
                  "151 automated regression checks across 7,200+ lines of Swift.",
    },
}

EXPERIENCE = {
    "title": "Sales Floor Associate", "company": "Adidas", "when": "Aug 2023 – Jun 2026",
    "bullets": [
        "Advised customers on footwear and apparel selection in a high-traffic retail environment, matching products "
        "to fit, intended use, and available inventory.",
        "Restocked, organized, and merchandised the sales floor to brand standards, maintaining execution through "
        "product launches and holiday peaks.",
        "Balanced full-time Computer Science coursework alongside nearly three years of consistent part-time employment.",
    ],
}

RESUMES = {
    "Software_Engineer": {
        "summary": "Computer Science student (graduating May 2027) who builds full-stack web and desktop applications "
                   "with React, TypeScript, Node.js, and PostgreSQL, from data model to deployed UI.",
        "coursework": "Data Structures & Algorithms, Software Engineering, Operating Systems, Database Systems, "
                      "Machine Learning, Information Retrieval",
        "skills": [
            ("Languages", "TypeScript, JavaScript, Python, Java, C/C++, SQL, Swift"),
            ("Frameworks & Libraries", "React, Node.js, SwiftUI, Pandas, scikit-learn, OpenCV"),
            ("Backend & Data", "REST APIs, PostgreSQL, Supabase, OCR"),
            ("Tools", "Git, GitHub, Vercel, VS Code, Xcode"),
        ],
        "order": ["summary", "education", "skills", "projects", "personal", "experience"],
        "projects": ["astro"], "personal": ["kickelo", "mofish", "blockwise"],
    },
    "Data_Engineering": {
        "summary": "Computer Science student with a Data Science concentration (graduating May 2027) who works with "
                   "Python, SQL, and PostgreSQL to design data models, integrate APIs, and build machine learning pipelines.",
        "coursework": "Database Systems, Machine Learning, Information Retrieval, Data Structures & Algorithms, "
                      "Operating Systems, Software Engineering",
        "skills": [
            ("Languages", "Python, SQL, Java, JavaScript, TypeScript, C/C++, Swift"),
            ("Data & Backend", "PostgreSQL, Supabase, REST APIs, OCR"),
            ("Data & ML Libraries", "Pandas, scikit-learn, OpenCV"),
            ("Web & App Frameworks", "React, Node.js, SwiftUI"),
            ("Tools", "Git, GitHub, Vercel, VS Code, Xcode"),
        ],
        "order": ["summary", "education", "skills", "projects", "personal", "experience"],
        "projects": ["astro"], "personal": ["kickelo", "mofish", "blockwise"],
    },
    "Internships": {
        "summary": "Computer Science student with a Data Science concentration (graduating May 2027) seeking a software, "
                   "data, or IT internship or co-op. Hands-on project experience in Python, SQL, React, and TypeScript, "
                   "plus nearly three years of customer-facing work balanced with full-time coursework.",
        "coursework": "Data Structures & Algorithms, Operating Systems, Database Systems, Software Engineering, "
                      "Machine Learning, Information Retrieval",
        "skills": [
            ("Languages", "Python, Java, C/C++, SQL, JavaScript, TypeScript, Swift"),
            ("Frameworks & Libraries", "React, Node.js, Pandas, scikit-learn, OpenCV, SwiftUI"),
            ("Data & Backend", "PostgreSQL, Supabase, REST APIs, OCR"),
            ("Tools", "Git, GitHub, Vercel, VS Code, Xcode"),
        ],
        "order": ["summary", "education", "skills", "experience", "projects", "personal"],
        "projects": ["astro"], "personal": ["kickelo", "mofish", "blockwise"],
    },
}

CSS = """
@page { size: Letter; margin: 0.45in 0.6in; }
* { box-sizing: border-box; }
body { font-family: "Times New Roman", Times, serif; font-size: 10.4pt; line-height: 1.22; color: #000; margin: 0; }
h1 { font-size: 20pt; text-align: center; margin: 0; font-weight: bold; }
.contact { text-align: center; font-size: 8.6pt; margin: 2px 0 6px; }
h2 { font-size: 10.6pt; font-variant: small-caps; font-weight: bold; letter-spacing: .02em;
     border-bottom: .8px solid #000; margin: 9px 0 4px; padding-bottom: 1px; }
.row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.indent { padding-left: 14px; }
p { margin: 0; }
.sub { font-style: italic; }
.item { margin-bottom: 5px; break-inside: avoid; }
.tech { font-style: italic; font-size: 9.6pt; white-space: nowrap; }
ul { margin: 1px 0 0; padding-left: 16px; }
li { margin: 1px 0; }
.ph { background: #fff3a8; }
"""

e = html.escape


def project_html(p):
    impact = e(p["impact"])
    for tag in ("[N]", "[K]", "[X]", "[Y]"):
        impact = impact.replace(tag, f'<span class="ph">{tag}</span>')
    return (f'<div class="item indent"><div class="row"><b>{e(p["title"])}</b><span class="tech">{e(p["tech"])}</span></div>'
            f'<p>{e(p["desc"])}</p><ul><li>{impact}</li></ul></div>')


def build(name, r, phone):
    contact = ["Houston, TX", "taylor.moed.dev@gmail.com"] + ([phone] if phone else []) + \
              ["linkedin.com/in/TaylorMoed", "github.com/TaylorMoed", "taylormoed.vercel.app"]
    parts = {
        "summary": f'<h2>Summary</h2><p class="indent">{e(r["summary"])}</p>',
        "education": (f'<h2>Education</h2><div class="indent"><div class="row"><b>{e(EDUCATION["school"])}</b>'
                      f'<span>{e(EDUCATION["where"])}</span></div><div class="row"><span class="sub">{e(EDUCATION["degree"])}</span>'
                      f'<span class="sub">{e(EDUCATION["when"])}</span></div><p>Relevant Coursework: {e(r["coursework"])}</p></div>'),
        "skills": '<h2>Skills</h2><div class="indent">' + "".join(f"<p><b>{e(k)}:</b> {e(v)}</p>" for k, v in r["skills"]) + "</div>",
        "projects": "<h2>Projects</h2>" + "".join(project_html(PROJECTS[k]) for k in r["projects"]),
        "personal": "<h2>Personal Projects</h2>" + "".join(project_html(PROJECTS[k]) for k in r["personal"]),
        "experience": (f'<h2>Experience</h2><div class="item indent"><div class="row"><b>{e(EXPERIENCE["title"])}</b>'
                       f'<span>{e(EXPERIENCE["when"])}</span></div><p class="sub">{e(EXPERIENCE["company"])}</p><ul>'
                       + "".join(f"<li>{e(b)}</li>" for b in EXPERIENCE["bullets"]) + "</ul></div>"),
    }
    body = "".join(parts[s] for s in r["order"])
    return (f'<!doctype html><html><head><meta charset="utf-8"><title>Taylor Moed — {name.replace("_", " ")}</title>'
            f"<style>{CSS}</style></head><body><h1>Taylor Moed</h1><p class=\"contact\">{' | '.join(map(e, contact))}</p>{body}</body></html>")


def main():
    phone = None
    if WITH_PHONE:
        phone = open(os.path.join(ROOT, "resumes-private", "phone.txt")).read().strip()
    out_dir = os.path.join(ROOT, "resumes-private" if WITH_PHONE else os.path.join("public", "resumes"))
    os.makedirs(out_dir, exist_ok=True)
    for name, r in RESUMES.items():
        with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
            f.write(build(name, r, phone))
        pdf = os.path.join(out_dir, f"Taylor_Moed_{name}.pdf")
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                        f"--print-to-pdf={pdf}", f"file://{f.name}"], check=True, capture_output=True)
        os.unlink(f.name)
        print("wrote", pdf)


if __name__ == "__main__":
    main()
