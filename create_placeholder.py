from PIL import Image, ImageDraw

# Create a 400x400 gray image with "No Photo" text
img = Image.new('RGB', (400, 400), color='#E5E5E5')
draw = ImageDraw.Draw(img)

# Add text
text = "No Photo"
bbox = draw.textbbox((0, 0), text)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
position = ((400 - text_width) // 2, (400 - text_height) // 2)

draw.text(position, text, fill='#52525B')

# Save
img.save('/workspace/public/uploads/default-candidate.jpg')
print("Created default candidate image successfully")
