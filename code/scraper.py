from requests_html import HTMLSession
import os
import requests

# Target URL
url = "https://www.redbubble.com/shop?query=van%20gogh%20poster&ref=search_box"

# Folder to save the images
target_folder = "RedBubbleVanGogh"
os.makedirs(target_folder, exist_ok=True)

# Start an HTML session
session = HTMLSession()
response = session.get(url)
response.html.render(timeout=20)  # Render JavaScript

# Find all <img> tags inside the relevant <div> tags
img_tags = response.html.find('div.styles_displayFlex__54ba70e3 img')
print(img_tags)
# Extract and save images
for img in img_tags:
    img_url = img.attrs.get("src")  # Get the 'src' attribute of the <img> tag
    if img_url:
        try:
            # Fetch the image data
            img_data = requests.get(img_url).content
            # Generate a clean filename
            img_name = os.path.basename(img_url.split("?")[0])
            # Save the image
            with open(f"{target_folder}/{img_name}", "wb") as img_file:
                img_file.write(img_data)
            print(f"Downloaded: {img_name}")
        except Exception as e:
            print(f"Failed to download {img_url}: {e}")

print("Image scraping complete.")