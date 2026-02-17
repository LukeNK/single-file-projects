import os, pymupdf, img2pdf

# list all files from windows download directory
downloads_folder = os.path.join(os.path.expanduser("~"), "Downloads")
name = '[Chemistry 11] U4 Project.pdf'

doc = pymupdf.open(os.path.join(downloads_folder, name))
for page in doc:
    pix = page.get_pixmap(
        dpi=150,
        annots=True
    )
    pix.save("pdf-flat/page-%i.png" % page.number)

with open(os.path.join(downloads_folder, name[:-4] + "-flat.pdf"), "wb") as f:
    f.write(img2pdf.convert(
        ["pdf-flat/page-%i.png" % i for i in range(0, len(doc))]
    ))

for i in range(len(doc)):
    os.remove("pdf-flat/page-%i.png" % i)

doc.close()