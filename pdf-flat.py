import pymupdf
doc = pymupdf.open("pdf-flat/input.pdf")

doc.bake(annots=True)

doc.save("pdf-flat/output.pdf")
doc.close()