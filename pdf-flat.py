# sort scanned pages when using one-sided scanners
import os, pymupdf, img2pdf

downloads_folder = os.path.join(os.path.expanduser("~"), "Downloads")
name = '[Chemistry 12] U8 Project.pdf'
doc = pymupdf.open(os.path.join(downloads_folder, name))

# sort page back similar to the order [0, 2, 4, 6, 8, 9, 7, 5, 3, 1] but for unknown number of pages
order = list(range(0, len(doc)))
order = order[::2] + order[1::2][::-1]
print(order)

for page in doc:
    pix = page.get_pixmap(
        dpi=150,
        annots=True
    )
    pix.save("pdf-flat/page-%i.png" % order[page.number])

with open(os.path.join(downloads_folder, name[:-4] + "-flat.pdf"), "wb") as f:
    f.write(img2pdf.convert(
        ["pdf-flat/page-%i.png" % i for i in range(len(doc))]
    ))

for i in range(len(doc)):
    os.remove("pdf-flat/page-%i.png" % i)

doc.close()