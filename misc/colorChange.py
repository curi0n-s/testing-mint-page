import cv2
import numpy as np

# Load image
im = cv2.imread('../src/pendings.png')

# Make all perfectly green pixels white
im[np.all(im == (0, 0, 0), axis=-1)] = (3,3,3)

# Save result
cv2.imwrite('../src/pendings3.png',im)