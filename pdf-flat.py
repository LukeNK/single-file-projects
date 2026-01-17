import os, pymupdf, img2pdf

# list all files from windows download directory
downloads_folder = os.path.join(os.path.expanduser("~"), "Downloads")
files = os.listdir(downloads_folder)
files = filter(lambda f: f.endswith("Project.pdf"), files)
files = filter(lambda f: f.startswith("[Physics 12] U"), files)
files = sorted(files)

doc = pymupdf.open(os.path.join(downloads_folder, files[-1]))
for page in doc:
    pix = page.get_pixmap(
        dpi=150,
        annots=True
    )
    pix.save("pdf-flat/page-%i.png" % page.number)

    if page.number == 7:
        break

with open(os.path.join(downloads_folder, files[-1][:-4] + "-flat.pdf"), "wb") as f:
    f.write(img2pdf.convert(
        ["pdf-flat/page-%i.png" % i for i in range(0, 7)]
    ))

for i in range(len(doc)):
    os.remove("pdf-flat/page-%i.png" % i)

doc.close()